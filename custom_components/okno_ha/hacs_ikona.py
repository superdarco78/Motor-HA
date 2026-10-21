"""Logo Okna HA w okienku „Update” od HACS – po stronie serwera, u każdego, bez klikania.

HACS ustawia obrazek swojej encji aktualizacji na brands.home-assistant.io/_/okno_ha/icon.png,
a tam Okna HA nie ma. Tu ta jedna encja dostaje logo z integracji. Inne dodatki zostają bez zmian.
"""

from __future__ import annotations

from datetime import timedelta

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_interval

from .const import DOMAIN

LOGO = f"/{DOMAIN}/ikona.png"


@callback
def _podmien(hass: HomeAssistant, *_args) -> None:
    komponent = hass.data.get("update")
    for encja in list(getattr(komponent, "entities", []) or []):
        if getattr(encja, "_okno_ha_logo", False):
            continue
        try:
            obrazek = encja.entity_picture
        except Exception:  # noqa: BLE001 – cudza encja, nic nie ruszamy
            continue
        if not isinstance(obrazek, str) or "brands.home-assistant.io" not in obrazek or f"/{DOMAIN}/" not in obrazek:
            continue
        klasa = type(encja)
        encja.__class__ = type(klasa.__name__, (klasa,), {"entity_picture": property(lambda _s: LOGO), "_okno_ha_logo": True})
        if encja.hass is not None:
            encja.async_write_ha_state()


@callback
def async_start(hass: HomeAssistant) -> None:
    """Sprawdza od razu i co minutę (HACS może wystartować po Oknie HA albo się przeładować)."""
    _podmien(hass)
    async_track_time_interval(hass, lambda now: _podmien(hass), timedelta(minutes=1))
