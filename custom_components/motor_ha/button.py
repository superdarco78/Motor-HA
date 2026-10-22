"""Przyciski urządzenia: „Kalibruj” (zmierz prawdziwy czas przejazdu) i „Wznów automatykę”."""

from __future__ import annotations

from homeassistant.components.button import ButtonEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .urzadzenie import info_urzadzenia


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    w = hass.data[DOMAIN]["wpisy"][entry.entry_id]
    encje: list[ButtonEntity] = [Kalibruj(entry)]
    if w.auto and not w.brama:
        encje.append(Wznow(entry))
    async_add_entities(encje)


class _Przycisk(ButtonEntity):
    _attr_has_entity_name = True

    def __init__(self, entry: ConfigEntry, klucz: str) -> None:
        self._entry_id = entry.entry_id
        self._attr_translation_key = klucz
        self._attr_unique_id = f"{entry.entry_id}_{klucz}"
        self._attr_device_info = info_urzadzenia(entry)

    @property
    def _w(self):
        return self.hass.data[DOMAIN]["wpisy"][self._entry_id]


class Kalibruj(_Przycisk):
    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, entry: ConfigEntry) -> None:
        super().__init__(entry, "kalibruj")

    async def async_press(self) -> None:
        if self._w.okno:
            self._w.okno.kalibruj()


class Wznow(_Przycisk):
    def __init__(self, entry: ConfigEntry) -> None:
        super().__init__(entry, "wznow")

    async def async_press(self) -> None:
        await self._w.auto.async_pauza(0)
