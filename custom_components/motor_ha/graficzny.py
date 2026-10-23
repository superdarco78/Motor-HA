"""Kreator graficzny (karta/src/kreator_okno.js): dane z HA dla kroków i zapis jego wyniku.

Kreator rysuje się w przeglądarce nad okienkiem „Dodaj urządzenie” / „Konfiguruj”. Gotowe ustawienia
wysyła jak zwykłą odpowiedź kroku (pole ``kreator``), więc urządzenie powstaje i zapisuje się tak samo
jak w klasycznym kreatorze – ten zostaje, gdy karta nie jest wczytana.
"""

from __future__ import annotations

import json
import re
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.util import slugify

from . import panele, skan
from .const import (
    BRAMY,
    CONF_CZAS,
    CONF_CZUJNIK_LEWE,
    CONF_CZUJNIK_PRAWE,
    CONF_FOTO_STAN,
    CONF_KALIBRACJA_50,
    CONF_KALIBRUJ,
    CONF_KOLOR,
    CONF_KOLOR_WLASNY,
    CONF_NA_PANEL,
    CONF_ODWROC,
    CONF_OSLONA,
    CONF_OSOBNO,
    CONF_OSOBY,
    CONF_POGODA,
    CONF_POKOJ,
    CONF_POWIADOM,
    CONF_POWIADOM_GDZIE,
    CONF_PREDKOSC_LEWA,
    CONF_PREDKOSC_PRAWA,
    CONF_RAMA,
    CONF_RAMA_WLASNA,
    CONF_RODZAJ_POKOJU,
    CONF_ROLETY,
    CONF_SKRZYDLA,
    CONF_SWIETA,
    CONF_TRYB_LEWE,
    CONF_TRYB_PRAWE,
    CONF_UKRYJ_ZRODLO,
    CONF_WYSOKOSC,
    CZUJNIKI,
    DOMAIN,
    DOMYSLNE,
    FUNKCJE,
    KOLORY,
    MAM,
    OSLONY_ZEW,
    PARAMETRY,
    POKOJE,
    POWIADOMIENIA,
    RAMY,
    RODZAJE,
    TRYB,
    TRYBY_SKRZYDLA,
    Z_LAMELAMI,
)
from .pomiar import Pomiar
from .uklad import CONF_POLA, CONF_UKLAD, MAX_POL, pola, popraw, prostokaty, uklad

KREATOR = "kreator"   # pole odpowiedzi kroku z wynikiem kreatora graficznego (JSON)
HEX = re.compile(r"^#[0-9a-fA-F]{6}$")
# czujniki pokazywane w kroku „Czujniki” (rodzaj ze skan.pasujace → pole w ustawieniach)
POLA_CZUJNIKOW = {"pogoda": CONF_POGODA, "temp": CZUJNIKI["temp"], "obecnosc": CZUJNIKI["obecnosc"],
                  "ruch": CZUJNIKI["ruch"], "wiatr": CZUJNIKI["wiatr"], "deszcz": CZUJNIKI["deszcz"],
                  "jasnosc": CZUJNIKI["jasnosc"], "temp_pokoj": CZUJNIKI["temp_pokoj"], "foto": CZUJNIKI["foto"],
                  "drzwi": CZUJNIKI["drzwi"]}
# rano i wieczór osobno: o wschodzie/zachodzie (z przesunięciem w minutach, + = później) albo o godzinie
HARMONOGRAM_KREATORA = ("harm_rano", "harm_wieczor", "przes_otw", "przes_zam")
PROSTE = {TRYB, MAM, CONF_POKOJ, CONF_RODZAJ_POKOJU, CONF_WYSOKOSC, CONF_OSOBNO, CONF_ODWROC, CONF_CZAS,
          CONF_KALIBRUJ, CONF_KALIBRACJA_50, CONF_POGODA, CONF_OSOBY, CONF_POWIADOM, CONF_POWIADOM_GDZIE,
          CONF_NA_PANEL, CONF_FOTO_STAN, CONF_UKRYJ_ZRODLO, CONF_SWIETA, *CZUJNIKI.values(),
          *(f"f_{k}" for k in FUNKCJE), *PARAMETRY, *HARMONOGRAM_KREATORA}


class ZleDane(ValueError):
    """Wynik kreatora nie nadaje się do zapisu (klucz błędu w tłumaczeniach)."""


def _encja(hass: HomeAssistant, e: Any, domeny: tuple[str, ...]) -> str | None:
    return e if isinstance(e, str) and e.split(".", 1)[0] in domeny and hass.states.get(e) is not None else None


def _mam(o: dict[str, Any]) -> list[str]:
    """Lista „Co masz w domu” z tego, co wybrano w kreatorze (klasyczny kreator i automatyka z niej korzystają)."""
    mam = set(o.get(MAM) or [])
    jest = {"okno": any(p.get("czujnik") for p in o.get(CONF_POLA) or []) or o.get(CONF_CZUJNIK_LEWE),
            "pogoda": o.get(CONF_POGODA), "zew": o.get(CONF_OSLONA) in OSLONY_ZEW,
            "lamele": o.get(CONF_OSLONA) in Z_LAMELAMI, "brama": o.get(CONF_OSLONA) in BRAMY,
            "osoby": o.get(CONF_OSOBY)}
    jest |= {k: o.get(CZUJNIKI[k]) for k in ("temp", "obecnosc", "ruch", "wiatr", "deszcz", "jasnosc",
                                              "temp_pokoj", "foto", "drzwi")}
    for k, v in jest.items():
        (mam.add if v else mam.discard)(k)
    return sorted(mam)


def opcje_z_kreatora(hass: HomeAssistant, stare: dict[str, Any], dane: Any) -> tuple[dict[str, Any], str]:
    """Wynik kreatora graficznego → (opcje urządzenia, nazwa). Ustawień, których kreator nie pokazuje, nie rusza."""
    if isinstance(dane, str):
        try:
            dane = json.loads(dane)
        except ValueError as err:
            raise ZleDane("zle_dane") from err
    if not isinstance(dane, dict) or not isinstance(dane.get("opcje"), dict):
        raise ZleDane("zle_dane")
    nowe: dict[str, Any] = dane["opcje"]
    o = dict(stare)
    for k in PROSTE & nowe.keys():
        if nowe[k] in (None, "", []) and k not in (CONF_POWIADOM, CONF_POWIADOM_GDZIE, CONF_OSOBY, MAM):
            o.pop(k, None)
        else:
            o[k] = nowe[k]
    if (t := nowe.get(CONF_OSLONA)) in RODZAJE:
        o[CONF_OSLONA] = t
    for klucz, wlasny, paleta in ((CONF_KOLOR, CONF_KOLOR_WLASNY, KOLORY), (CONF_RAMA, CONF_RAMA_WLASNA, RAMY)):
        if (k := nowe.get(klucz)) in paleta:
            o[klucz] = k
            o.pop(wlasny, None)
        elif isinstance(k, str) and HEX.match(k):
            o[wlasny] = [int(k[i:i + 2], 16) for i in (1, 3, 5)]
    if o.get(CONF_RODZAJ_POKOJU) not in (None, *POKOJE):
        o.pop(CONF_RODZAJ_POKOJU)

    brama = o.get(CONF_OSLONA) in BRAMY
    u = None if brama else popraw(nowe.get(CONF_UKLAD))
    if u:
        ile = len(prostokaty(u))
        lista = [p if isinstance(p, dict) else {} for p in (nowe.get(CONF_POLA) or [])][:ile]
        lista += [{} for _ in range(ile - len(lista))]
        wynik = []
        for p in lista:
            pole = {"silnik": _encja(hass, p.get("silnik"), ("cover",)),
                    "czujnik": _encja(hass, p.get("czujnik"), ("binary_sensor",)),
                    "tryb": p.get("tryb") if p.get("tryb") in TRYBY_SKRZYDLA else "uchyl",
                    # rodzaj i kolor osłony tylko tego pola (2.2.2); brak = jak całe okno
                    "oslona": p.get("oslona") if p.get("oslona") in RODZAJE and p.get("oslona") not in BRAMY else None,
                    "kolor": p.get("kolor") if p.get("kolor") in KOLORY or (isinstance(p.get("kolor"), str) and HEX.match(p["kolor"])) else None}
            wynik.append({k: v for k, v in pole.items() if v})
        if not any(p.get("silnik") for p in wynik):
            raise ZleDane("brak_rolety")
        pierwszy = next(p["silnik"] for p in wynik if p.get("silnik"))
        for p in wynik:   # pole bez wybranego silnika rusza się z pierwszym
            p.setdefault("silnik", pierwszy)
        o[CONF_UKLAD], o[CONF_POLA] = u, wynik
        rolety = list(dict.fromkeys(p["silnik"] for p in wynik))
        o[CONF_SKRZYDLA] = "1" if ile == 1 else "2"
        for i, (czujnik, tryb) in enumerate(((CONF_CZUJNIK_LEWE, CONF_TRYB_LEWE), (CONF_CZUJNIK_PRAWE, CONF_TRYB_PRAWE))):
            if i < len(wynik) and wynik[i].get("czujnik"):
                o[czujnik], o[tryb] = wynik[i]["czujnik"], wynik[i]["tryb"]
            else:
                o.pop(czujnik, None)
    else:
        o.pop(CONF_UKLAD, None)
        o.pop(CONF_POLA, None)
        rolety = [e for x in nowe.get(CONF_ROLETY) or [] if (e := _encja(hass, x, ("cover",)))][:2]
        if not rolety:
            raise ZleDane("brak_rolety")
        o[CONF_SKRZYDLA] = "1" if len(rolety) == 1 else "2"
    if len(rolety) > MAX_POL:
        raise ZleDane("za_duzo")
    if list(stare.get(CONF_ROLETY) or []) != rolety:
        for i, klucz in enumerate((CONF_PREDKOSC_LEWA, CONF_PREDKOSC_PRAWA)):
            o.pop(klucz, None)
            if i < len(rolety) and (p := skan.predkosc(hass, rolety[i])):
                o[klucz] = p
    o[CONF_ROLETY] = rolety
    o[MAM] = _mam(o)
    o.pop("name", None)
    tytul = str(dane.get("tytul") or "").strip()
    if not tytul and (s := hass.states.get(rolety[0])):
        tytul = s.name
    return o, tytul


@callback
def async_rejestruj(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_dane)
    websocket_api.async_register_command(hass, ws_mierz)


def _nazwa(hass: HomeAssistant, e: str) -> str:
    s = hass.states.get(e)
    return str(s.name) if s else e


def _telefony(hass: HomeAssistant) -> list[dict[str, str]]:
    """Usługi notify: telefony z aplikacją HA na górze, z nazwą telefonu."""
    nazwy = {}
    for w in hass.config_entries.async_entries("mobile_app"):
        if n := w.data.get("device_name"):
            nazwy[f"notify.mobile_app_{slugify(n)}"] = n
    uslugi = sorted((f"notify.{u}" for u in hass.services.async_services_for_domain("notify")
                     if u not in ("send_message", "persistent_notification")),
                    key=lambda u: (not u.startswith("notify.mobile_app_"), u))
    return [{"id": u, "nazwa": nazwy.get(u) or u.split(".", 1)[1].removeprefix("mobile_app_").replace("_", " "),
             "telefon": u.startswith("notify.mobile_app_")} for u in uslugi]


async def dane_kreatora(hass: HomeAssistant, entry_id: str | None, rolety: list[str] | None) -> dict[str, Any]:
    wpis = hass.config_entries.async_get_entry(entry_id) if entry_id else None
    o = {**DOMYSLNE, **(wpis.options if wpis else {})}
    rolety = [e for e in (rolety if rolety is not None else o.get(CONF_ROLETY) or []) if hass.states.get(e)]
    zajete = {e: w.title for w in hass.config_entries.async_entries(DOMAIN) if not wpis or w.entry_id != wpis.entry_id
              for e in w.options.get(CONF_ROLETY) or []}
    oslony = []
    for s in skan.oslony(hass):
        a = skan.obszar(hass, s.entity_id)
        oslony.append({"id": s.entity_id, "nazwa": s.name, "pokoj": skan.nazwa_obszaru(hass, a), "area": a,
                       "poz": s.attributes.get("current_position"), "stan": s.state, "brama": skan.czy_brama(s),
                       "lamele": skan.czy_lamele(s), "klasa": s.attributes.get("device_class"),
                       "zajeta": zajete.get(s.entity_id),
                       # grupa osłon (np. „Żaluzje salon”) – w polu wybiera się pojedynczy silnik
                       "grupa": isinstance(s.attributes.get("entity_id"), (list, tuple)),
                       # silniki w grupie: wybór grupy w kreatorze daje tyle skrzydeł, ile w niej osłon
                       "czlonkowie": [e for e in s.attributes.get("entity_id") or [] if isinstance(e, str) and e.startswith("cover.")]
                       if isinstance(s.attributes.get("entity_id"), (list, tuple)) else []})
    pierwsza = rolety[0] if rolety else None
    zn = skan.znajdz(hass)
    pokoj = skan.obszar(hass, pierwsza) if pierwsza else None
    czujniki = {}
    for rodzaj in ("okno", *POLA_CZUJNIKOW):
        lista = skan.pasujace(hass, rodzaj, pierwsza, zn)
        czujniki[rodzaj] = {
            "lista": [{"id": e, "nazwa": _nazwa(hass, e), "pokoj": skan.nazwa_obszaru(hass, a := skan.obszar(hass, e)),
                       "tu": bool(pokoj and a == pokoj)} for e in lista],
            "podpowiedz": skan.podpowiedz(hass, rodzaj, pierwsza, lista)}
    lewe, prawe = skan.czujniki_okna(hass, pierwsza)
    s = hass.states.get(pierwsza) if pierwsza else None
    lista_paneli, propozycja = await panele.async_lista(hass)
    return {
        "nowy": wpis is None, "tytul": wpis.title if wpis else (s.name if s else ""),
        "opcje": {**o, CONF_UKLAD: uklad(o), CONF_POLA: pola(o)}, "jest_uklad": bool(o.get(CONF_UKLAD)),
        "oslony": oslony, "pokoj": {"id": pokoj, "nazwa": skan.nazwa_obszaru(hass, pokoj),
                                    "rodzaj": skan.rodzaj_pokoju(hass, pokoj, s.name if s else "")},
        "okna": [e for e in (lewe, prawe) if e], "czujniki": czujniki, "slonce": hass.states.get("sun.sun") is not None,
        "osoby": zn.get("osoby", []), "telefony": _telefony(hass),
        "panele": [{"klucz": k, "nazwa": n} for k, n in lista_paneli], "panel": propozycja,
        "funkcje": list(FUNKCJE), "powiadomienia": POWIADOMIENIA, "max_pol": MAX_POL,
    }


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/kreator/dane", vol.Optional("entry_id"): str,
                                  vol.Optional("rolety"): [str]})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_dane(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    conn.send_result(msg["id"], await dane_kreatora(hass, msg.get("entry_id"), msg.get("rolety")))


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/kreator/mierz", vol.Required("rolety"): [str]})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_mierz(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """„Zmierz teraz” w kroku Czas: osłony jadą góra → dół → góra, wynik wraca do kreatora (jeszcze bez zapisu)."""
    rej = er.async_get(hass)
    rolety = [e for e in dict.fromkeys(msg["rolety"]) if e.startswith("cover.") and hass.states.get(e)
              and ((w := rej.async_get(e)) is None or w.platform != DOMAIN)]
    if not rolety:
        conn.send_error(msg["id"], "brak_rolety", "No cover")
        return
    pomiar = Pomiar(hass, rolety, [skan.predkosc(hass, e) for e in rolety], context=conn.context(msg))
    czas, rodzaj, dane = await pomiar.async_zmierz()
    conn.send_result(msg["id"], {"czas": czas, "wynik": rodzaj, "brak": [_nazwa(hass, e) for e in dane.get("brak", [])],
                                 "silniki": [{"nazwa": _nazwa(hass, e), "czas": c} for e, c in pomiar.czasy.items()] if czas else []})
