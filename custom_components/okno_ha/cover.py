"""Okno jako urządzenie: jedna encja cover, która rusza roletami skrzydeł i niesie ustawienia karty."""

from __future__ import annotations

from typing import Any

from homeassistant.components.cover import (
    ATTR_CURRENT_POSITION,
    ATTR_POSITION,
    CoverDeviceClass,
    CoverEntity,
    CoverEntityFeature,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import ATTR_ENTITY_ID, STATE_CLOSED, STATE_CLOSING, STATE_OPENING, STATE_UNAVAILABLE
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_state_change_event

from .const import (
    CONF_CZAS,
    CONF_KOLOR,
    CONF_OSLONA,
    CONF_POGODA,
    CONF_RAMA,
    CONF_ROLETY,
    CONF_SKRZYDLA,
    CONF_WYSOKOSC,
    DOMAIN,
    DOMYSLNE,
    OSLONY_ZEW,
    RAMY,
    VERSION,
)

# klucze przekazywane karcie bez zmian
PROSTE = ["czujnik_lewe", "czujnik_prawe", "tryb_lewe", "tryb_prawe", "predkosc_lewa", "predkosc_prawa", CONF_OSLONA, CONF_KOLOR]


def ustawienia_karty(nazwa: str, o: dict[str, Any]) -> dict[str, Any]:
    """Ustawienia z kreatora integracji w formacie karty Okno HA (atrybut okno_ha)."""
    rolety = list(o.get(CONF_ROLETY) or [])
    k: dict[str, Any] = {"name": nazwa, "skrzydla": int(o.get(CONF_SKRZYDLA, DOMYSLNE[CONF_SKRZYDLA]))}
    if len(rolety) == 2:
        k["roleta_lewa"], k["roleta_prawa"] = rolety
    for klucz in PROSTE:
        if o.get(klucz):
            k[klucz] = o[klucz]
    rama = o.get(CONF_RAMA, DOMYSLNE[CONF_RAMA])
    k["rama"] = RAMY.get(rama, rama)
    k["wysokosc"] = int(o.get(CONF_WYSOKOSC, DOMYSLNE[CONF_WYSOKOSC]))
    czas = int(o.get(CONF_CZAS) or 0)
    k["czas"] = czas if czas > 0 else "auto"
    k["pogoda"] = o.get(CONF_POGODA) or "auto"
    return k


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_add_entities([OknoCover(entry)])


class OknoCover(CoverEntity):
    """Okno z roletą: pozycja = średnia skrzydeł, polecenia idą do rolet skrzydeł."""

    _attr_has_entity_name = True
    _attr_name = None
    _attr_should_poll = False
    _attr_supported_features = (CoverEntityFeature.OPEN | CoverEntityFeature.CLOSE
                                 | CoverEntityFeature.STOP | CoverEntityFeature.SET_POSITION)

    def __init__(self, entry: ConfigEntry) -> None:
        o = entry.options
        self._rolety: list[str] = list(o.get(CONF_ROLETY) or [])
        oslona = o.get(CONF_OSLONA, DOMYSLNE[CONF_OSLONA])
        self._attr_unique_id = entry.entry_id
        self._attr_device_class = (CoverDeviceClass.SHUTTER if oslona in OSLONY_ZEW
                                   else CoverDeviceClass.BLIND if oslona in ("zaluzja", "drewniana") else CoverDeviceClass.SHADE)
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)}, name=f"Okno {entry.title}",
            manufacturer="Okno HA", model=oslona, sw_version=VERSION)
        self._karta = ustawienia_karty(entry.title, o)

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(async_track_state_change_event(self.hass, self._rolety, self._zmiana))
        self._przelicz()

    @callback
    def _zmiana(self, event: Event[EventStateChangedData]) -> None:
        self._przelicz()
        self.async_write_ha_state()

    @callback
    def _przelicz(self) -> None:
        stany = [s for e in self._rolety if (s := self.hass.states.get(e)) and s.state != STATE_UNAVAILABLE]
        self._attr_available = bool(stany)
        poz = []
        for s in stany:
            p = s.attributes.get(ATTR_CURRENT_POSITION)
            poz.append(p if isinstance(p, (int, float)) else 0 if s.state == STATE_CLOSED else 100)
        self._attr_current_cover_position = round(sum(poz) / len(poz)) if poz else None
        self._attr_is_closed = bool(stany) and all(p <= 0 for p in poz)
        self._attr_is_opening = any(s.state == STATE_OPENING for s in stany)
        self._attr_is_closing = any(s.state == STATE_CLOSING for s in stany)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        # entity_id = skrzydła (karta traktuje okno jak grupę), okno_ha = ustawienia karty z kreatora
        return {ATTR_ENTITY_ID: self._rolety, "okno_ha": self._karta}

    async def _wyslij(self, usluga: str, **dane: Any) -> None:
        await self.hass.services.async_call("cover", usluga, {ATTR_ENTITY_ID: self._rolety, **dane}, blocking=True)

    async def async_open_cover(self, **kwargs: Any) -> None:
        await self._wyslij("open_cover")

    async def async_close_cover(self, **kwargs: Any) -> None:
        await self._wyslij("close_cover")

    async def async_stop_cover(self, **kwargs: Any) -> None:
        await self._wyslij("stop_cover")

    async def async_set_cover_position(self, **kwargs: Any) -> None:
        await self._wyslij("set_cover_position", position=kwargs[ATTR_POSITION])
