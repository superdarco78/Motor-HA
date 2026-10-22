"""Skan Home Assistanta: co jest w domu i co pasuje do wybranej osłony.

Kreator zaznacza na liście „Co masz w domu” to, co tu znajdzie, i podpowiada encje
z tego samego pomieszczenia co osłona.
"""

from __future__ import annotations

from collections.abc import Iterable
import re

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


def obszar(hass: HomeAssistant, entity_id: str) -> str | None:
    """Pomieszczenie encji: z encji albo z jej urządzenia."""
    wpis = er.async_get(hass).async_get(entity_id)
    if wpis is None:
        return None
    if wpis.area_id:
        return wpis.area_id
    if wpis.device_id and (u := dr.async_get(hass).async_get(wpis.device_id)):
        return u.area_id
    return None


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
