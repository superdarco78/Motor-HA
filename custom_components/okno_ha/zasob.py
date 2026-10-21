"""Ładowacz Okna HA widoczny w Ustawienia → Panele → Zasoby (jak ładowacze kart).

Dodaje się sam przy instalacji i po każdej aktualizacji,
a znika razem z ostatnim oknem.
"""

from __future__ import annotations

import logging

from homeassistant.core import HomeAssistant

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)
ADRES = "/local/okno-ha-loader.js"            # plik /config/www/okno-ha-loader.js
STARE = (f"/{DOMAIN}/okno-ha-loader.js", ADRES)


def _zasoby(hass: HomeAssistant):
    dane = hass.data.get("lovelace")
    zasoby = getattr(dane, "resources", None)
    # tylko zasoby zapisywane z UI (panele w YAML mają zasoby w YAML – tam nic nie ruszamy)
    return zasoby if zasoby is not None and hasattr(zasoby, "async_create_item") else None


async def async_dodaj(hass: HomeAssistant) -> None:
    try:
        if (zasoby := _zasoby(hass)) is None:
            return
        if not zasoby.loaded:
            await zasoby.async_load()
            zasoby.loaded = True
        nowy = ADRES   # bez numeru – jak ładowacze innych kart; plik i tak bierze świeże skrypty (?t=)
        nasze = [z for z in zasoby.async_items() if str(z.get("url", "")).split("?")[0] in STARE]
        if not nasze:
            await zasoby.async_create_item({"res_type": "module", "url": nowy})
            return
        if nasze[0].get("url") != nowy:   # stary adres /okno_ha/… albo z numerem – jeden wpis /local/okno-ha-loader.js
            await zasoby.async_update_item(nasze[0]["id"], {"res_type": "module", "url": nowy})
        for z in nasze[1:]:
            await zasoby.async_delete_item(z["id"])
    except Exception:  # noqa: BLE001 – zasób nie może zepsuć okna; karta i tak wczytuje się sama
        _LOGGER.exception("Okno HA: nie dodałem ładowacza do zasobów")


async def async_usun(hass: HomeAssistant) -> None:
    try:
        if (zasoby := _zasoby(hass)) is None:
            return
        if not zasoby.loaded:
            await zasoby.async_load()
            zasoby.loaded = True
        for z in [z for z in zasoby.async_items() if str(z.get("url", "")).split("?")[0] in STARE]:
            await zasoby.async_delete_item(z["id"])
    except Exception:  # noqa: BLE001
        _LOGGER.exception("Okno HA: nie usunąłem ładowacza z zasobów")
