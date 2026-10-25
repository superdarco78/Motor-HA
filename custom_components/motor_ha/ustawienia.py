"""Pierwszy ekran Motor HA: co integracja dodaje do Home Assistanta.

Ustawienia całego Motor HA (.storage/motor_ha.ustawienia) – karta okna na panelu (panel, widok, miejsce),
karta „Cały dom”, skróty, panel w pasku bocznym, Assist, powiadomienia, automatyka ze scenariuszami
i ekran po aktualizacji. Ekran pokazuje się przy instalacji i po każdej aktualizacji (gdy włączone).

Karta okna, powiadomienia i automatyka to ustawienia dla nowych okien. Istniejące okna zmieniają się
tylko po zaznaczeniu „Zastosuj też do moich okien”. Dopóki ekran nie został zapisany, nic się nie zmienia.
"""

from __future__ import annotations

from datetime import datetime, timedelta
import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.storage import Store
from homeassistant.helpers.translation import async_get_translations

from . import panele
from .const import (
    BRAMY,
    CONF_OSLONA,
    CONF_POWIADOM,
    CONF_POWIADOM_GDZIE,
    CONF_ROLETY,
    CONF_UKRYJ_ZRODLO,
    DOMAIN,
    FUNKCJE,
    KARTA_PLIK,
    MAM,
    OSLONY_ZEW,
    VERSION,
)
from .logika import Warunki, decyduj
from .urzadzenie import assist

_LOGGER = logging.getLogger(__name__)
KLUCZ = f"{DOMAIN}.ustawienia"
PANEL = "motor-ha"   # panel w pasku bocznym

# scenariusze w kolejności ważności (logika.py) → funkcje automatyki, które włączają
SCENARIUSZE: dict[str, tuple[str, ...]] = {
    "cisza": ("cisza",),
    "dym": ("dym",),
    "wiatr": ("wiatr", "drgania", "grad"),
    "deszcz": ("deszcz",),
    "mroz": ("mroz",),
    "pauza": ("reczny",),
    "alarm": ("alarm",),
    "spie": ("spie",),
    "nikogo": ("nikogo", "wakacje"),
    "rano": ("harmonogram",),
    "wieczor": ("harmonogram",),
    "obecnosc": ("obecnosc",),
    "posrednia": ("posrednia",),
    "slonce": ("slonce", "upal"),
    "oslepianie": ("oslepianie",),
    "pokoj": ("temp_pokoj",),
    "zima": ("zima",),
    "okno": ("blokada", "wietrzenie", "drzwi"),
    "przeszkoda": ("przeszkoda",),
    "granice": ("granice",),
}
FUNKCJE_SCENARIUSZY = {f for v in SCENARIUSZE.values() for f in v}
TRYBY = ("pelny", "samo", "wlasny")
DOMYSLNE: dict[str, Any] = {
    "tryb": "pelny", "karta": True, "panel": None, "widok": 0, "miejsce": "sekcja",
    "dom": False, "skroty": True, "pasek": True, "assist": True, "ukryj": False,
    "powiadom": True, "telefon": True, "auto": True, "scenariusze": list(SCENARIUSZE),
    "nowa_wersja": True, "widziana": None,
}
POWIADOM = ["nie_odpowiada", "nie_dojechala", "bateria", "automatyka"]
SCHEMAT = vol.Schema({
    vol.Optional("tryb"): vol.In(TRYBY),
    vol.Optional("karta"): bool,
    vol.Optional("panel"): vol.Any(None, str),
    vol.Optional("widok"): vol.Any(vol.Coerce(int), panele.NOWY),
    vol.Optional("miejsce"): vol.In(panele.MIEJSCA),
    **{vol.Optional(k): bool for k in ("dom", "skroty", "pasek", "assist", "ukryj", "powiadom", "telefon", "auto",
                                        "nowa_wersja")},
    vol.Optional("scenariusze"): [vol.In(list(SCENARIUSZE))],
}, extra=vol.REMOVE_EXTRA)


def u(hass: HomeAssistant) -> dict[str, Any]:
    return hass.data.get(DOMAIN, {}).get("ustawienia") or dict(DOMYSLNE)


def zapisane(hass: HomeAssistant) -> bool:
    return bool(u(hass).get("widziana"))


async def async_wczytaj(hass: HomeAssistant) -> None:
    sklep = Store(hass, 1, KLUCZ)
    dane = await sklep.async_load() or {}
    hass.data[DOMAIN]["ustawienia"] = {**DOMYSLNE, **{k: v for k, v in dane.items() if k in DOMYSLNE}}
    hass.data[DOMAIN]["ustawienia_sklep"] = sklep


# --- dla nowych okien ---

def _mam(o: dict[str, Any]) -> set[str]:
    return set(o.get(MAM) or []) | ({"zew"} if o.get(CONF_OSLONA) in OSLONY_ZEW else set())


def spelnia(funkcja: str, o: dict[str, Any]) -> bool:
    """Czy okno ma to, czego funkcja wymaga (np. czujnik okna dla blokady). Bez tego scenariusz się pomija."""
    mam = _mam(o)
    return all(any(x in mam for x in w.split("|")) for w in FUNKCJE[funkcja][0])


def _funkcje(ust: dict[str, Any]) -> dict[str, Any]:
    wybrane = set(ust.get("scenariusze") or []) if ust.get("auto") else set()
    wl = {f for s in wybrane for f in SCENARIUSZE[s]}
    o: dict[str, Any] = {f"f_{f}": f in wl for f in FUNKCJE_SCENARIUSZY}
    if "harmonogram" in wl:
        o["harm_otwieraj"], o["harm_zamykaj"] = "rano" in wybrane, "wieczor" in wybrane
    return o


def domyslne_okna(hass: HomeAssistant) -> dict[str, Any]:
    """Opcje nowego okna z pierwszego ekranu (puste, dopóki ekranu nie zapisano)."""
    if not zapisane(hass):
        return {}
    ust = u(hass)
    o = _funkcje(ust)
    o[CONF_UKRYJ_ZRODLO] = bool(ust.get("ukryj"))
    o[CONF_POWIADOM] = list(POWIADOM) if ust.get("powiadom") else []
    o[CONF_POWIADOM_GDZIE] = _telefony(hass) if ust.get("powiadom") and ust.get("telefon") else []
    return o


def popraw_funkcje(hass: HomeAssistant, o: dict[str, Any]) -> dict[str, Any]:
    """Przy zapisie nowego okna: scenariusz bez potrzebnego czujnika wyłączony (np. obecność bez czujnika
    obecności nie trzyma osłony zamkniętej do 10:00)."""
    if not zapisane(hass):
        return o
    return {**o, **{f"f_{f}": False for f in FUNKCJE_SCENARIUSZY if o.get(f"f_{f}") and not spelnia(f, o)}}


def panel_domyslny(hass: HomeAssistant, propozycja: str) -> str:
    if not zapisane(hass):
        return propozycja
    ust = u(hass)
    if not ust.get("karta"):
        return panele.NIE
    return ust.get("panel") or propozycja


def _telefony(hass: HomeAssistant) -> list[str]:
    return sorted(f"notify.{x}" for x in hass.services.async_services_for_domain("notify") if x.startswith("mobile_app_"))


# --- stosowanie ---

def _okna_motor(hass: HomeAssistant) -> list[str]:
    return [e.entity_id for e in er.async_get(hass).entities.values() if e.platform == DOMAIN and e.domain == "cover"]


@callback
def pasek(hass: HomeAssistant) -> None:
    """Panel „Motor HA” w pasku bocznym (po zapisaniu pierwszego ekranu)."""
    from homeassistant.components import frontend
    if "frontend" not in hass.config.components:
        return
    wl = zapisane(hass) and u(hass).get("pasek")
    jest = PANEL in hass.data.get("frontend_panels", {})
    if wl and not jest:
        frontend.async_register_built_in_panel(
            hass, "custom", sidebar_title="Motor HA", sidebar_icon="mdi:window-shutter-auto", frontend_url_path=PANEL,
            require_admin=False, config={"_panel_custom": {"name": "motor-ha-panel", "embed_iframe": False,
                                                            "trust_external": False,
                                                            "module_url": f"/{DOMAIN}/{KARTA_PLIK}?v={VERSION}"}})
    elif not wl and jest:
        frontend.async_remove_panel(hass, PANEL)


@callback
def assist_okien(hass: HomeAssistant, encje: list[str] | None = None) -> None:
    """Okna Motor HA widoczne (albo nie) dla Assist – tylko po zapisaniu pierwszego ekranu."""
    if zapisane(hass):
        assist(hass, encje if encje is not None else _okna_motor(hass), bool(u(hass).get("assist")))


async def _karty(hass: HomeAssistant, ust: dict[str, Any], wpisy: list[ConfigEntry]) -> int:
    from .skan import nazwa_obszaru, obszar
    if not ust.get("karta") or not (panel := ust.get("panel")) or panel == panele.NIE:
        return 0
    rej, ile = er.async_get(hass), 0
    for w in wpisy:
        if (e := rej.async_get_entity_id("cover", DOMAIN, w.entry_id)) is None:
            continue
        pokoj = nazwa_obszaru(hass, obszar(hass, e))
        if await panele.async_dodaj_karte(hass, panel, e, ust.get("widok", 0), ust.get("miejsce", "sekcja"), pokoj):
            ile += 1
    return ile


async def async_zastosuj(hass: HomeAssistant, istniejace: bool) -> list[str]:
    """Po „Zapisz” na pierwszym ekranie. Zwraca, co zrobiono (klucze tekstów w karcie)."""
    ust = u(hass)
    zrobione: list[str] = []
    pasek(hass)
    assist_okien(hass)
    wpisy = [w for w in hass.config_entries.async_entries(DOMAIN) if w.options.get(CONF_ROLETY)]
    panel = ust.get("panel") if ust.get("karta") else None
    if panel and panel != panele.NIE:
        if ust.get("skroty") and await panele.async_dodaj_skroty(hass, panel, ust.get("widok", 0), ust.get("miejsce", "sekcja")):
            zrobione.append("skroty")
        if ust.get("dom") and await panele.async_dodaj_karte(hass, panel, None, ust.get("widok", 0), ust.get("miejsce", "sekcja")):
            zrobione.append("dom")
    elif ust.get("dom"):
        _, propozycja = await panele.async_lista(hass)
        if propozycja != panele.NIE and await panele.async_dodaj_karte(hass, propozycja, None):
            zrobione.append("dom")
    if istniejace and await _karty(hass, ust, wpisy):
        zrobione.append("karty")
    telefony = _telefony(hass)
    for w in wpisy:
        o = dict(w.options)
        o[CONF_UKRYJ_ZRODLO] = bool(ust.get("ukryj"))
        if istniejace and o.get(CONF_OSLONA) not in BRAMY:
            o |= {k: v and spelnia(k[2:], o) if k.startswith("f_") else v for k, v in _funkcje(ust).items()}
            o[CONF_POWIADOM] = list(POWIADOM) if ust.get("powiadom") else []
            o[CONF_POWIADOM_GDZIE] = telefony if ust.get("powiadom") and ust.get("telefon") else []
        if o != dict(w.options):
            if not o[CONF_UKRYJ_ZRODLO] and w.options.get(CONF_UKRYJ_ZRODLO):
                assist(hass, list(o.get(CONF_ROLETY) or []), True)   # silnik znów widoczny dla Assist
            hass.config_entries.async_update_entry(w, options=o)   # urządzenie wczytuje się od nowa
            if "okna" not in zrobione:
                zrobione.append("okna")
    return zrobione


# --- symulacja „co wygrywa” na prawdziwej logice ---

PORY = {"rano": (7, 30), "dzien": (14, 0), "wieczor": (19, 15), "noc": (23, 0)}
WARUNKI = ("slonce", "upal", "wiatr", "deszcz", "okno", "dym", "alarm", "spie", "nikogo", "reka")
# po czym poznać, że warunek zadziałał (powód w logice)
SLONCE = {"slonce", "oslepianie", "temp_pokoj", "zima_slonce", "upal"}
POWODY = {"slonce": SLONCE, "upal": SLONCE,
          "wiatr": {"wiatr"}, "deszcz": {"deszcz"}, "okno": {"wietrzenie", "blokada"}, "dym": {"dym"},
          "alarm": {"alarm"}, "spie": {"spie"}, "nikogo": {"nikogo"}, "reka": {"pauza"}}
OGRANICZA = ("wietrzenie", "blokada", "drzwi", "przeszkoda")


def symuluj(pora: str, warunki: set[str], scenariusze: set[str], typ: str = "natynkowa") -> dict[str, Any]:
    funkcje = {f for s in scenariusze for f in SCENARIUSZE[s]}
    p = {"harm_otwieraj": "rano" in scenariusze, "harm_zamykaj": "wieczor" in scenariusze}
    dzien = datetime(2026, 7, 15)
    h, m = PORY.get(pora, PORY["dzien"])
    teraz = dzien.replace(hour=h, minute=m)

    def _w(war: set[str]) -> Warunki:
        noc = pora in ("wieczor", "noc")
        return Warunki(
            teraz=teraz, wschod=dzien.replace(hour=5, minute=0), zachod=dzien.replace(hour=19, minute=0),
            azymut=180 if "slonce" in war and not noc else 0, wysokosc=35 if "slonce" in war and not noc else -10,
            temp=30 if "upal" in war else 18, temp_pokoj=27 if "upal" in war else 22, upal="upal" in war,
            wiatr=60 if "wiatr" in war else 5, deszcz="deszcz" in war, okno="uch" if "okno" in war else "zam",
            dym="dym" in war, alarm="alarm" in war, spie="spie" in war, nikogo="nikogo" in war,
            pauza_do=teraz + timedelta(hours=2) if "reka" in war and "pauza" in scenariusze else None, aktualna=100)

    d = decyduj(_w(warunki), typ, funkcje, p)
    baza = decyduj(_w(warunki - {"okno"}), typ, funkcje, p) if d.powod in OGRANICZA else None
    zwyciezca = baza.powod if baza else d.powod
    lista = []
    for k in WARUNKI:
        if k not in warunki:
            continue
        grupa = {k} | ({"slonce", "upal"} & warunki if k in ("slonce", "upal") else set())   # słońce i upał razem
        sam = decyduj(_w(grupa), typ, funkcje, p)
        if k == "okno" and d.powod in OGRANICZA:
            stan = "ogranicza"
        elif zwyciezca in POWODY[k]:
            stan = "wygrywa"
        elif sam.powod in POWODY[k] or (k == "okno" and sam.powod in OGRANICZA):
            stan = "przegrywa"
        else:
            stan = "nie_dziala"
        lista.append({"warunek": k, "stan": stan})
    return {"poz": d.poz, "powod": d.powod, "baza": baza.powod if baza else None,
            "baza_poz": baza.poz if baza else None, "lista": lista}


# --- połączenie z kartą ---

@callback
def async_rejestruj(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_ustawienia)
    websocket_api.async_register_command(hass, ws_zapisz)
    websocket_api.async_register_command(hass, ws_symuluj)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/ustawienia"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_ustawienia(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    ust = u(hass)
    lista, propozycja = await panele.async_lista(hass, widoki=True)
    widziana = ust.get("widziana")
    conn.send_result(msg["id"], {
        "ustawienia": {**ust, "panel": ust.get("panel") or propozycja}, "wersja": VERSION,
        "pokaz": widziana != VERSION and (not widziana or bool(ust.get("nowa_wersja"))),
        "pierwszy": not widziana,
        "panele": [{"klucz": k, "nazwa": n, "widoki": w} for k, n, w in lista],
        "okna": len([w for w in hass.config_entries.async_entries(DOMAIN) if w.options.get(CONF_ROLETY)]),
        "telefony": len(_telefony(hass)), "scenariusze": list(SCENARIUSZE),
    })


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/ustawienia/zapisz", vol.Required("ustawienia"): dict,
                                  vol.Optional("istniejace", default=False): bool})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_zapisz(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    try:
        nowe = SCHEMAT(msg["ustawienia"])
    except vol.Invalid as err:
        conn.send_error(msg["id"], "zle_dane", str(err))
        return
    ust = {**u(hass), **nowe, "widziana": VERSION}
    hass.data[DOMAIN]["ustawienia"] = ust
    await hass.data[DOMAIN]["ustawienia_sklep"].async_save(ust)
    zrobione: list[str] = []
    try:
        zrobione = await async_zastosuj(hass, msg["istniejace"])
    except Exception:  # noqa: BLE001 – panel albo encja niedostępne; ustawienia i tak zapisane
        _LOGGER.exception("Motor HA: nie wszystko z pierwszego ekranu się udało")
        zrobione.append("blad")
    conn.send_result(msg["id"], {"zrobione": zrobione})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/symuluj", vol.Required("pora"): vol.In(list(PORY)),
                                  vol.Optional("warunki", default=[]): [vol.In(WARUNKI)],
                                  vol.Optional("scenariusze", default=[]): [vol.In(list(SCENARIUSZE))]})
@websocket_api.async_response
async def ws_symuluj(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    wynik = symuluj(msg["pora"], set(msg["warunki"]), set(msg["scenariusze"]))
    t = await async_get_translations(hass, hass.config.language, "entity", {DOMAIN})
    nazwa = lambda p: t.get(f"component.{DOMAIN}.entity.sensor.powod.state.{p}", p) if p else None  # noqa: E731
    conn.send_result(msg["id"], {**wynik, "powod_nazwa": nazwa(wynik["powod"]), "baza_nazwa": nazwa(wynik["baza"])})
