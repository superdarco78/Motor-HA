"""Skan Home Assistanta: co jest w domu i co pasuje do wybranej osłony.

Kreator zaznacza na liście „Co masz w domu” to, co tu znajdzie, i podpowiada encje
z tego samego pomieszczenia co osłona.
"""

from __future__ import annotations

from collections.abc import Iterable
import re
import unicodedata

from homeassistant.components.cover import CoverDeviceClass, CoverEntityFeature
from homeassistant.const import ATTR_DEVICE_CLASS, ATTR_SUPPORTED_FEATURES, ATTR_UNIT_OF_MEASUREMENT
from homeassistant.core import HomeAssistant, State
from homeassistant.helpers import area_registry as ar, device_registry as dr, entity_registry as er

from .const import DOMAIN

BRAMY_KLASY = {CoverDeviceClass.GATE, CoverDeviceClass.GARAGE}
ZEW_KLASY = {CoverDeviceClass.SHUTTER, CoverDeviceClass.AWNING}
SLOWA_PRZESZKODY = re.compile(r"obstruct|obstacle|photo.?cell|fotokom|przeszk|safety|lichtschranke|hindernis", re.I)
SLOWA_DRZWI = re.compile(r"taras|balkon|patio|terrace|balcony|door|drzwi", re.I)
SLOWA_PV = re.compile(r"pv|solar|fotowolt|photovolt|inverter|falownik", re.I)


def _klasa(s: State) -> str | None:
    return s.attributes.get(ATTR_DEVICE_CLASS)


def _proste(tekst: str) -> str:
    """Małe litery bez ogonków, same słowa: „Żaluzja lewa SALON” → „ zaluzja lewa salon ”."""
    t = unicodedata.normalize("NFKD", str(tekst).lower().replace("ł", "l"))
    t = "".join(c for c in t if not unicodedata.combining(c))
    return " " + re.sub(r"[^a-z0-9]+", " ", t).strip() + " "


def obszar_z_nazwy(hass: HomeAssistant, tekst: str) -> str | None:
    """Pomieszczenie, którego nazwa (albo alias) jest w nazwie encji, np. „Żaluzja lewa salon” → Salon."""
    t, najlepszy = _proste(tekst), (0, None)
    for a in ar.async_get(hass).async_list_areas():
        for n in [a.name, *(a.aliases or [])]:
            n = _proste(n)
            if len(n) > 3 and n in t and len(n) > najlepszy[0]:
                najlepszy = (len(n), a.id)
    return najlepszy[1]


def obszar(hass: HomeAssistant, entity_id: str) -> str | None:
    """Pomieszczenie encji: z encji, z jej urządzenia, a gdy nigdzie nie ustawiono – z nazwy."""
    wpis = er.async_get(hass).async_get(entity_id)
    if wpis and wpis.area_id:
        return wpis.area_id
    if wpis and wpis.device_id and (u := dr.async_get(hass).async_get(wpis.device_id)) and u.area_id:
        return u.area_id
    s = hass.states.get(entity_id)
    return obszar_z_nazwy(hass, f"{entity_id.split('.', 1)[-1]} {s.name if s else ''}")


# rodzaj pomieszczenia (porady w kreatorze) z nazwy pomieszczenia albo encji
RODZAJE_POKOI = (
    ("lazienka", r"lazien|bath|bad |wc|toalet"), ("kuchnia", r"kuch|kitchen|kuche"),
    ("sypialnia", r"sypial|bedroom|schlaf"), ("dziecko", r"dziec|dzieck|kid|child|kinder|nursery"),
    ("gabinet", r"gabinet|biur|office|buero|arbeits"), ("jadalnia", r"jadal|dining|ess"),
    ("przedpokoj", r"przedpok|korytarz|hall|flur|wiatrol"), ("salon", r"salon|living|wohn|pokoj dzienny|lounge"),
)


def rodzaj_pokoju(hass: HomeAssistant, area_id: str | None, tekst: str = "") -> str | None:
    t = _proste(f"{nazwa_obszaru(hass, area_id) or ''} {tekst}")
    return next((k for k, wzor in RODZAJE_POKOI if re.search(wzor, t)), None)


def nazwa_obszaru(hass: HomeAssistant, area_id: str | None) -> str | None:
    if area_id and (a := ar.async_get(hass).async_get_area(area_id)):
        return a.name
    return None


def _nasze(hass: HomeAssistant) -> set[str]:
    return {w.entity_id for w in er.async_get(hass).entities.values() if w.platform == DOMAIN}


def oslony(hass: HomeAssistant) -> list[State]:
    nasze = _nasze(hass)
    return [s for s in hass.states.async_all("cover") if s.entity_id not in nasze]


def czy_brama(s: State | None) -> bool:
    return s is not None and _klasa(s) in BRAMY_KLASY


def czy_lamele(s: State | None) -> bool:
    if s is None:
        return False
    return bool(int(s.attributes.get(ATTR_SUPPORTED_FEATURES, 0)) & CoverEntityFeature.SET_TILT_POSITION) \
        or _klasa(s) == CoverDeviceClass.BLIND and "tilt" in str(s.attributes)


def znajdz(hass: HomeAssistant) -> dict[str, list[str]]:
    """Wszystko, co pasuje do listy „Co masz w domu”: klucz → encje."""
    w: dict[str, list[str]] = {k: [] for k in (
        "oslony", "zew", "lamele", "brama", "foto", "okno", "drzwi", "obecnosc", "ruch", "pogoda", "temp",
        "temp_pokoj", "jasnosc", "wiatr", "deszcz", "drgania", "ostrzezenia", "dym", "alarm", "osoby", "przeszkoda")}
    for s in oslony(hass):
        w["brama" if czy_brama(s) else "oslony"].append(s.entity_id)
        if _klasa(s) in ZEW_KLASY:
            w["zew"].append(s.entity_id)
        if czy_lamele(s):
            w["lamele"].append(s.entity_id)
    for s in hass.states.async_all("binary_sensor"):
        k, n = _klasa(s), f"{s.entity_id} {s.name}"
        if k in ("window", "opening"):
            w["okno"].append(s.entity_id)
        elif k == "door" and SLOWA_DRZWI.search(n) and "garage" not in n:
            w["drzwi"].append(s.entity_id)
        if k in ("occupancy", "presence"):
            w["obecnosc"].append(s.entity_id)
        elif k == "motion":
            w["ruch"].append(s.entity_id)
        if k == "moisture" and re.search(r"rain|deszcz|regen", n, re.I):
            w["deszcz"].append(s.entity_id)
        if k == "vibration":
            w["drgania"].append(s.entity_id)
        if k in ("smoke", "gas", "carbon_monoxide"):
            w["dym"].append(s.entity_id)
        if k in ("problem", "safety", "occupancy", None) and SLOWA_PRZESZKODY.search(n):
            (w["foto"] if re.search(r"gate|brama|garage|gara", n, re.I) else w["przeszkoda"]).append(s.entity_id)
        if k == "safety" and re.search(r"warn|ostrz|alert|meteo|imgw|hail|grad", n, re.I):
            w["ostrzezenia"].append(s.entity_id)
    for s in hass.states.async_all("sensor"):
        k, n, j = _klasa(s), f"{s.entity_id} {s.name}", s.attributes.get(ATTR_UNIT_OF_MEASUREMENT)
        if k == "temperature":
            (w["temp"] if re.search(r"out|zewn|outside|aussen|ogród|garden|balkon|weather|pogod", n, re.I)
             else w["temp_pokoj"]).append(s.entity_id)
        elif k == "illuminance" or (k == "power" and SLOWA_PV.search(n)):
            w["jasnosc"].append(s.entity_id)
        elif k == "wind_speed" or re.search(r"wind.?speed|wiatr", n, re.I) and j in ("km/h", "m/s", "mph", "kn"):
            w["wiatr"].append(s.entity_id)
        elif k == "precipitation_intensity" or k == "precipitation":
            w["deszcz"].append(s.entity_id)
        elif re.search(r"imgw|meteoalarm|ostrzez|warning", n, re.I):
            w["ostrzezenia"].append(s.entity_id)
        elif SLOWA_PRZESZKODY.search(n):
            w["foto"].append(s.entity_id)
    w["pogoda"] = [s.entity_id for s in hass.states.async_all("weather")]
    w["osoby"] = [s.entity_id for s in hass.states.async_all("person")]
    w["alarm"] = [s.entity_id for s in hass.states.async_all("alarm_control_panel")]
    return w


def zaznaczone(znalezione: dict[str, list[str]], roleta: str | None = None, hass: HomeAssistant | None = None) -> list[str]:
    """Pozycje do zaznaczenia na liście „Co masz w domu”."""
    mam = [k for k, v in znalezione.items() if v and k not in ("oslony",)]
    if len(znalezione.get("oslony", [])) + len(znalezione.get("brama", [])) >= 2:
        mam.append("grupy")
    if hass and roleta:
        s = hass.states.get(roleta)
        for k, f in (("brama", czy_brama), ("lamele", czy_lamele)):
            if k in mam and not f(s):
                mam.remove(k)
        if "zew" in mam and (s is None or _klasa(s) not in ZEW_KLASY):
            mam.remove("zew")
    return sorted(set(mam))


def najblizsze(hass: HomeAssistant, kandydaci: Iterable[str], roleta: str | None) -> list[str]:
    """Kandydaci posortowani: najpierw z pomieszczenia osłony."""
    pokoj = obszar(hass, roleta) if roleta else None
    lista = list(kandydaci)
    return sorted(lista, key=lambda e: (0 if pokoj and obszar(hass, e) == pokoj else 1, e))


def czujniki_okna(hass: HomeAssistant, roleta: str | None) -> tuple[str | None, str | None]:
    """Czujniki okna z pomieszczenia osłony: (lewe, prawe) wg nazwy, inaczej kolejno."""
    pokoj = obszar(hass, roleta) if roleta else None
    if not pokoj:
        return None, None
    lista = [s for s in hass.states.async_all("binary_sensor")
             if _klasa(s) in ("window", "opening") and obszar(hass, s.entity_id) == pokoj]
    lewe = next((s.entity_id for s in lista if re.search(r"lew|left|links|gauche", f"{s.entity_id} {s.name}", re.I)), None)
    prawe = next((s.entity_id for s in lista if re.search(r"praw|right|rechts|droit", f"{s.entity_id} {s.name}", re.I)), None)
    reszta = [s.entity_id for s in lista if s.entity_id not in (lewe, prawe)]
    lewe = lewe or (reszta.pop(0) if reszta else None)
    prawe = prawe or (reszta.pop(0) if reszta else None)
    return lewe, prawe


def predkosc(hass: HomeAssistant, roleta: str) -> str | None:
    """Encja prędkości silnika z tego samego urządzenia (np. Moes, Tuya: number.*motor_speed)."""
    wpis = er.async_get(hass).async_get(roleta)
    if not wpis or not wpis.device_id:
        return None
    return next((e.entity_id for e in er.async_entries_for_device(er.async_get(hass), wpis.device_id)
                 if e.domain == "number" and re.search(r"speed|predkos|rpm", e.entity_id)), None)


def baterie(hass: HomeAssistant, encje: Iterable[str]) -> list[str]:
    """Czujniki baterii urządzeń, z których korzysta okno."""
    rej = er.async_get(hass)
    urzadzenia = {w.device_id for e in encje if e and (w := rej.async_get(e)) and w.device_id}
    return [w.entity_id for w in rej.entities.values()
            if w.device_id in urzadzenia and w.domain == "sensor"
            and (w.original_device_class == "battery" or w.device_class == "battery")]


# pola kreatora → co z listy znajdz() do nich pasuje; True = szukamy w pomieszczeniu osłony
POLA_W_POKOJU = {"okno": True, "drzwi": True, "przeszkoda": True, "foto": False, "temp_pokoj": True, "obecnosc": True,
                 "ruch": True, "dym": True, "drgania": True, "pogoda": False, "temp": False, "jasnosc": False,
                 "wiatr": False, "deszcz": False, "ostrzezenia": False, "alarm": False, "osoby": False}
SLOWA_OKNA = re.compile(r"okn|window|fenster|fenetre|kontakt|contact|otwar|opening", re.I)
SLOWA_SWIETA = re.compile(r"holiday|swiet|swiat|feiertag|workday|dzien.?wolny|urlop|vacation", re.I)


def pasujace(hass: HomeAssistant, rodzaj: str, roleta: str | None,
             znalezione: dict[str, list[str]] | None = None) -> list[str]:
    """Encje pasujące do pola kreatora: najpierw z pomieszczenia osłony, potem reszta wg pomieszczeń.

    Pusta lista = nic nie pasuje i pole pokazuje wszystko (żeby nie zablokować nietypowego czujnika).
    """
    zn = znalezione if znalezione is not None else znajdz(hass)
    lista = list(zn.get(rodzaj, []))
    if rodzaj == "okno":
        # kontaktrony bez klasy, nazwane „okno/window/kontakt”
        lista += [s.entity_id for s in hass.states.async_all("binary_sensor")
                  if _klasa(s) is None and SLOWA_OKNA.search(_proste(f"{s.entity_id} {s.name}"))]
    elif rodzaj == "predkosc":
        lista = [s.entity_id for d in ("number", "sensor") for s in hass.states.async_all(d)
                 if re.search(r"speed|predkos|rpm|obroty", _proste(f"{s.entity_id} {s.name}"))]
    elif rodzaj == "swieta":
        lista = [s.entity_id for d in ("binary_sensor",) for s in hass.states.async_all(d)
                 if SLOWA_SWIETA.search(_proste(f"{s.entity_id} {s.name}"))]
    pokoj = obszar(hass, roleta) if roleta else None
    pokoje = {e: obszar(hass, e) for e in dict.fromkeys(lista)}
    return sorted(pokoje, key=lambda e: (0 if pokoj and pokoje[e] == pokoj else 1,
                                         nazwa_obszaru(hass, pokoje[e]) or "~", e))


def podpowiedz(hass: HomeAssistant, rodzaj: str, roleta: str | None, lista: list[str]) -> str | None:
    """Sama podpowiedź do pola: dla rzeczy z pokoju tylko czujnik z tego pomieszczenia, dla reszty pierwszy."""
    if not lista:
        return None
    if POLA_W_POKOJU.get(rodzaj, rodzaj == "predkosc"):
        pokoj = obszar(hass, roleta) if roleta else None
        return lista[0] if pokoj and obszar(hass, lista[0]) == pokoj else None
    return lista[0] if rodzaj in ("pogoda", "alarm") or len(lista) == 1 else None
