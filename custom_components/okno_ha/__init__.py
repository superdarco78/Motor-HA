"""Okno HA – okno z roletą jako urządzenie, z kreatorem w Ustawienia → Integracje."""

from __future__ import annotations

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from .const import DOMAIN, VERSION
from .nowosci import LOADER, Nowosci

PLATFORMS = [Platform.COVER, Platform.UPDATE]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Udostępnij kartę Okno HA (wbudowaną albo pobraną nowszą) i sprawdzaj nowe wersje."""
    nowosci = hass.data[DOMAIN] = Nowosci(hass)
    await nowosci.async_przygotuj_karte()
    await hass.http.async_register_static_paths([StaticPathConfig(f"/{DOMAIN}", str(nowosci.katalog), False)])
    add_extra_js_url(hass, f"/{DOMAIN}/{LOADER}?v={VERSION}")
    nowosci.async_start()
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Jedno okno = jeden wpis = jedno urządzenie."""
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(_po_zmianie))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def _po_zmianie(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Po „Konfiguruj” przeładuj okno, żeby karta od razu dostała nowe ustawienia."""
    await hass.config_entries.async_reload(entry.entry_id)
