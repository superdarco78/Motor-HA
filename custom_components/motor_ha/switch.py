"""Przełączniki: automatyka wł./wył., „Pauza na dziś”, „Śpię” i (wspólny dla domu) tryb wakacyjny."""

from __future__ import annotations

from typing import Any

from homeassistant.components.switch import SwitchEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.dispatcher import async_dispatcher_connect, async_dispatcher_send
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.restore_state import RestoreEntity
from homeassistant.util import dt as dt_util

from .const import DOMAIN, SYGNAL_ZMIANA
from .urzadzenie import info_hub, info_urzadzenia

SYGNAL_WAKACJE = f"{DOMAIN}_wakacje"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    w = hass.data[DOMAIN]["wpisy"][entry.entry_id]
    encje: list[SwitchEntity] = []
    if w.auto and not w.brama:
        encje += [Automatyka(entry), Pauza(entry)]
        if "spie" in w.auto.funkcje:
            encje.append(Spie(entry))
        if "wakacje" in w.auto.funkcje and "wakacje" not in hass.data[DOMAIN]:
            hass.data[DOMAIN]["wakacje"] = wak = Wakacje()
            encje.append(wak)
    async_add_entities(encje)


class _Przelacznik(SwitchEntity):
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


class Automatyka(_Przelacznik):
    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, entry: ConfigEntry) -> None:
        super().__init__(entry, "automatyka")

    @property
    def is_on(self) -> bool:
        return self._a.wlaczona

    async def async_turn_on(self, **kwargs: Any) -> None:
        await self._a.async_wlacz(True)

    async def async_turn_off(self, **kwargs: Any) -> None:
        await self._a.async_wlacz(False)


class Pauza(_Przelacznik):
    def __init__(self, entry: ConfigEntry) -> None:
        super().__init__(entry, "pauza")

    @property
    def is_on(self) -> bool:
        return bool(self._a.pauza_do and self._a.pauza_do > dt_util.now())

    async def async_turn_on(self, **kwargs: Any) -> None:
        await self._a.async_pauza(None)

    async def async_turn_off(self, **kwargs: Any) -> None:
        await self._a.async_pauza(0)


class Spie(_Przelacznik):
    def __init__(self, entry: ConfigEntry) -> None:
        super().__init__(entry, "spie")

    @property
    def is_on(self) -> bool:
        return self._a.spie

    async def async_turn_on(self, **kwargs: Any) -> None:
        await self._a.async_spie(True)

    async def async_turn_off(self, **kwargs: Any) -> None:
        await self._a.async_spie(False)


class Wakacje(SwitchEntity, RestoreEntity):
    """Jeden przełącznik dla całego domu, na urządzeniu „Motor HA”."""

    _attr_has_entity_name = True
    _attr_translation_key = "wakacje"
    _attr_unique_id = f"{DOMAIN}_wakacje"
    _attr_should_poll = False

    def __init__(self) -> None:
        self._attr_device_info = info_hub()
        self._attr_is_on = False

    async def async_added_to_hass(self) -> None:
        if (s := await self.async_get_last_state()) is not None:
            self._attr_is_on = s.state == "on"

    async def async_will_remove_from_hass(self) -> None:
        if self.hass.data.get(DOMAIN, {}).get("wakacje") is self:
            self.hass.data[DOMAIN].pop("wakacje")

    async def _ustaw(self, wl: bool) -> None:
        self._attr_is_on = wl
        self.async_write_ha_state()
        async_dispatcher_send(self.hass, SYGNAL_WAKACJE)
        for w in self.hass.data[DOMAIN]["wpisy"].values():
            if w.auto:
                w.auto.cel = None
                await w.auto.async_przelicz()

    async def async_turn_on(self, **kwargs: Any) -> None:
        await self._ustaw(True)

    async def async_turn_off(self, **kwargs: Any) -> None:
        await self._ustaw(False)
