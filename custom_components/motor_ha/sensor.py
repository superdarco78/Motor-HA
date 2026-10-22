"""Czujniki urządzenia: dlaczego się ruszyło, ile razy i jak długo pracował silnik."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity, SensorStateClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EntityCategory, UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, SYGNAL_ZMIANA
from .urzadzenie import info_urzadzenia

POWODY = ["brak", "wylaczona", "cisza", "dym", "wiatr", "drgania", "grad", "deszcz", "mroz", "pauza", "reczny",
          "alarm", "spie", "nikogo", "wakacje", "wakacje_noc", "harm_dzien", "harm_noc", "posrednia", "obecnosc",
          "czeka_obecnosc", "zima_noc", "zima_slonce", "slonce", "jasnosc", "temp_pokoj", "upal", "oslepianie",
          "przeszkoda", "drzwi", "wietrzenie", "blokada"]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    w = hass.data[DOMAIN]["wpisy"][entry.entry_id]
    if not w.auto:
        return
    encje: list[SensorEntity] = [Ruchy(entry), CzasPracy(entry)]
    if not w.brama:
        encje.insert(0, Powod(entry))
    async_add_entities(encje)


class _Czujnik(SensorEntity):
    _attr_has_entity_name = True
    _attr_should_poll = False

    def __init__(self, entry: ConfigEntry, klucz: str) -> None:
        self._entry_id = entry.entry_id
        self._attr_translation_key = klucz
        self._attr_unique_id = f"{entry.entry_id}_{klucz}"
        self._attr_device_info = info_urzadzenia(entry)

    @property
    def _a(self):
        return self.hass.data[DOMAIN]["wpisy"][self._entry_id].auto

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(async_dispatcher_connect(
            self.hass, SYGNAL_ZMIANA.format(self._entry_id), self.async_write_ha_state))


class Powod(_Czujnik):
    """„Dlaczego się ruszyła?” – stan przetłumaczony przez HA, szczegóły w atrybutach."""

    _attr_device_class = SensorDeviceClass.ENUM
    _attr_options = POWODY

    def __init__(self, entry: ConfigEntry) -> None:
        super().__init__(entry, "powod")

    @property
    def native_value(self) -> str:
        return self._a.powod if self._a.powod in POWODY else "brak"

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        a = self._a
        return {**a.powod_dane, "pauza_do": a.pauza_do.isoformat() if a.pauza_do else None}


class Ruchy(_Czujnik):
    _attr_state_class = SensorStateClass.TOTAL_INCREASING
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, entry: ConfigEntry) -> None:
        super().__init__(entry, "ruchy")

    @property
    def native_value(self) -> int:
        return int(self._a.dane.get("ruchy", 0))

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        return {"od_kalibracji": int(self._a.dane.get("od_kalibracji", 0))}


class CzasPracy(_Czujnik):
    _attr_device_class = SensorDeviceClass.DURATION
    _attr_native_unit_of_measurement = UnitOfTime.MINUTES
    _attr_state_class = SensorStateClass.TOTAL_INCREASING
    _attr_entity_category = EntityCategory.DIAGNOSTIC
    _attr_suggested_display_precision = 1

    def __init__(self, entry: ConfigEntry) -> None:
        super().__init__(entry, "czas_pracy")

    @property
    def native_value(self) -> float:
        return round(float(self._a.dane.get("sekundy", 0)) / 60, 2)
