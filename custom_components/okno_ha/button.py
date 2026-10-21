"""Przycisk „Kalibruj” na urządzeniu okna: zmierz prawdziwy czas przejazdu rolety."""

from __future__ import annotations

from homeassistant.components.button import ButtonEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, OKNA


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_add_entities([Kalibruj(entry)])


class Kalibruj(ButtonEntity):
    _attr_has_entity_name = True
    _attr_translation_key = "kalibruj"
    _attr_icon = "mdi:timer-cog-outline"
    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, entry: ConfigEntry) -> None:
        self._entry_id = entry.entry_id
        self._attr_unique_id = f"{entry.entry_id}_kalibruj"
        self._attr_device_info = DeviceInfo(identifiers={(DOMAIN, entry.entry_id)}, name=f"Okno {entry.title}", manufacturer="Okno HA")

    async def async_press(self) -> None:
        if okno := self.hass.data.get(OKNA, {}).get(self._entry_id):
            okno.kalibruj()
