"""„Pobierz diagnostykę” na urządzeniu: ustawienia, stan automatyki i decyzja – do zgłoszenia błędu."""

from __future__ import annotations

from dataclasses import asdict
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN, VERSION


async def async_get_config_entry_diagnostics(hass: HomeAssistant, entry: ConfigEntry) -> dict[str, Any]:
    w = hass.data.get(DOMAIN, {}).get("wpisy", {}).get(entry.entry_id)
    wynik: dict[str, Any] = {"wersja": VERSION, "tytul": entry.title, "opcje": dict(entry.options)}
    if w and w.auto:
        a = w.auto
        wynik["automatyka"] = {
            "funkcje": sorted(a.funkcje), "powod": a.powod, "powod_dane": a.powod_dane,
            "pauza_do": a.pauza_do.isoformat() if a.pauza_do else None, "wlaczona": a.wlaczona,
            "licznik": {k: v for k, v in a.dane.items() if k in ("ruchy", "sekundy", "od_kalibracji")},
        }
        try:
            war = asdict(a.warunki())
            wynik["warunki"] = {k: (v.isoformat() if hasattr(v, "isoformat") else v) for k, v in war.items()}
            d = a.decyzja()
            wynik["decyzja"] = {"poz": d.poz, "kat": d.kat, "powod": d.powod, "blokada": d.blokada}
        except Exception as err:  # noqa: BLE001
            wynik["blad"] = str(err)
    for e in list(entry.options.get("rolety") or []):
        if s := hass.states.get(e):
            wynik.setdefault("silniki", {})[e] = {"stan": s.state, **{k: str(v) for k, v in s.attributes.items()}}
    return wynik
