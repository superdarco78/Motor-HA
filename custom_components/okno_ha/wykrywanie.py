"""Podpowiedzi dla kreatora: prędkość silnika z urządzenia rolety (jak w karcie)."""

from __future__ import annotations

import re

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

SZYBKOSC = re.compile(r"speed|predkos|rpm", re.I)


def kandydaci_predkosci(hass: HomeAssistant) -> list[str]:
    """Wszystkie encje number, które wyglądają na prędkość silnika."""
    return sorted(s.entity_id for s in hass.states.async_all("number") if SZYBKOSC.search(s.entity_id))


def predkosc_rolety(hass: HomeAssistant, roleta: str | None) -> str | None:
    """Prędkość z tego samego urządzenia co roleta, a gdy nie ma – number.<nazwa>_motor_speed (Moes/Tuya)."""
    if not roleta:
        return None
    reg = er.async_get(hass)
    wpis = reg.async_get(roleta)
    if wpis and wpis.device_id:
        for e in er.async_entries_for_device(reg, wpis.device_id):
            if e.domain == "number" and SZYBKOSC.search(e.entity_id):
                return e.entity_id
    zgadniety = roleta.replace("cover.", "number.", 1) + "_motor_speed"
    return zgadniety if hass.states.get(zgadniety) else None


def czas_z_predkosci(hass: HomeAssistant, encja: str | None) -> float | None:
    """Ten sam wzór co w karcie: 20,2 s + 394 / obr/min."""
    try:
        rpm = float(hass.states.get(encja).state) if encja else 0
    except (AttributeError, ValueError):
        return None
    return round(20.2 + 394 / rpm, 1) if rpm > 0 else None
