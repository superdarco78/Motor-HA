"""Okno HA – okno z roletą jako urządzenie, z kreatorem w Ustawienia → Integracje."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from .const import DOMAIN, KARTA_PLIK, KARTA_URL, VERSION

PLATFORMS = [Platform.COVER]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Udostępnij wbudowaną kartę Okno HA, żeby działała bez osobnej instalacji."""
    plik = Path(__file__).parent / "www" / KARTA_PLIK
    if plik.is_file():
        await hass.http.async_register_static_paths([StaticPathConfig(KARTA_URL, str(plik), False)])
        add_extra_js_url(hass, f"{KARTA_URL}?v={VERSION}")
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
