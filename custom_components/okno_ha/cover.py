"""Okno jako urządzenie: jedna encja cover, która rusza roletami skrzydeł i niesie ustawienia karty."""

from __future__ import annotations

import asyncio
from time import monotonic
from typing import Any

from homeassistant.components import persistent_notification
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
    CONF_KALIBRUJ,
    CONF_KOLOR,
    CONF_KOLOR_WLASNY,
    CONF_OSLONA,
    CONF_POGODA,
    CONF_RAMA,
    CONF_RAMA_WLASNA,
    CONF_ROLETY,
    CONF_SKRZYDLA,
    CONF_WYSOKOSC,
    DOMAIN,
    DOMYSLNE,
    OKNA,
    OSLONY_ZEW,
    RAMY,
    VERSION,
)

# klucze przekazywane karcie bez zmian
PROSTE = ["czujnik_lewe", "czujnik_prawe", "tryb_lewe", "tryb_prawe", "predkosc_lewa", "predkosc_prawa", CONF_OSLONA, CONF_KOLOR]


def _hex(rgb: Any) -> str | None:
    """[r, g, b] z próbnika kolorów → #rrggbb."""
    if isinstance(rgb, (list, tuple)) and len(rgb) == 3:
        return "#" + "".join(f"{int(x):02x}" for x in rgb)
    return None


def ustawienia_karty(nazwa: str, o: dict[str, Any]) -> dict[str, Any]:
    """Ustawienia z kreatora integracji w formacie karty Okno HA (atrybut okno_ha)."""
    rolety = list(o.get(CONF_ROLETY) or [])
    k: dict[str, Any] = {"name": nazwa, "skrzydla": int(o.get(CONF_SKRZYDLA, DOMYSLNE[CONF_SKRZYDLA]))}
    if len(rolety) == 2:
        k["roleta_lewa"], k["roleta_prawa"] = rolety
    for klucz in PROSTE:
        if o.get(klucz):
            k[klucz] = o[klucz]
    if hexy := _hex(o.get(CONF_KOLOR_WLASNY)):   # własny kolor z próbnika ma pierwszeństwo
        k[CONF_KOLOR] = hexy
    rama = o.get(CONF_RAMA, DOMYSLNE[CONF_RAMA])
    k["rama"] = _hex(o.get(CONF_RAMA_WLASNA)) or RAMY.get(rama, rama)
    k["wysokosc"] = int(o.get(CONF_WYSOKOSC, DOMYSLNE[CONF_WYSOKOSC]))
    czas = int(o.get(CONF_CZAS) or 0)
    k["czas"] = czas if czas > 0 else "auto"
    k["pogoda"] = o.get(CONF_POGODA) or "auto"
    return k


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_add_entities([OknoCover(entry)])


KALIBRACJA_MAKS = 240   # s na jeden przejazd


class OknoCover(CoverEntity):
    """Okno z roletą: pozycja = średnia skrzydeł, polecenia idą do rolet skrzydeł."""

    _attr_has_entity_name = True
    _attr_name = None
    _attr_should_poll = False
    _attr_supported_features = (CoverEntityFeature.OPEN | CoverEntityFeature.CLOSE
                                 | CoverEntityFeature.STOP | CoverEntityFeature.SET_POSITION)

    def __init__(self, entry: ConfigEntry) -> None:
        o = entry.options
        self._entry = entry
        self._kalibracja: asyncio.Task | None = None
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
        self.hass.data.setdefault(OKNA, {})[self._entry.entry_id] = self
        self.async_on_remove(lambda: self.hass.data[OKNA].pop(self._entry.entry_id, None))
        self.async_on_remove(async_track_state_change_event(self.hass, self._rolety, self._zmiana))
        self._przelicz()
        if self._entry.options.get(CONF_KALIBRUJ):   # „Kalibruj teraz” zaznaczone w kreatorze
            self.kalibruj()

    @callback
    def kalibruj(self) -> None:
        """Góra → dół (mierzone) → góra (mierzone); średnia zapisana jako czas przejazdu."""
        if self._kalibracja and not self._kalibracja.done():
            return
        self._kalibracja = self.hass.async_create_background_task(self._kalibruj(), f"{DOMAIN} kalibracja")

    def _pozycje(self) -> tuple[bool, list[float]]:
        stany = [s for e in self._rolety if (s := self.hass.states.get(e))]
        ruch = any(s.state in (STATE_OPENING, STATE_CLOSING) for s in stany)
        poz = [p if isinstance(p := s.attributes.get(ATTR_CURRENT_POSITION), (int, float))
               else 0 if s.state == STATE_CLOSED else 100 for s in stany]
        return ruch, poz

    async def _jedz(self, usluga: str, cel: int, pierwszy: bool) -> float | None:
        t0 = monotonic()
        await self._wyslij(usluga)
        jechala = False
        while (el := monotonic() - t0) < KALIBRACJA_MAKS:
            await asyncio.sleep(0.5)
            ruch, poz = self._pozycje()
            jechala |= ruch
            na_miejscu = bool(poz) and all(abs(p - cel) <= 1 for p in poz)
            # koniec: przestała meldować „jedzie”, albo (silnik bez tego stanu) jest na miejscu
            if (jechala and not ruch and el > 1) or (not jechala and na_miejscu and el > (1 if pierwszy else 4)):
                return el
        return None

    async def _kalibruj(self) -> None:
        wyniki = []
        for n, (usluga, cel) in enumerate((("open_cover", 100), ("close_cover", 0), ("open_cover", 100))):
            el = await self._jedz(usluga, cel, n == 0)
            if el is None:
                persistent_notification.async_create(
                    self.hass, f"Roleta okna {self._entry.title} nie dojechała w {KALIBRACJA_MAKS} s. Spróbuj jeszcze raz.",
                    title="🤖 Okno HA – kalibracja przerwana", notification_id=f"{DOMAIN}_kal_{self._entry.entry_id}")
                self._zapisz_kalibracje(None)
                return
            if n:
                wyniki.append(el)
        czas = round(sum(wyniki) / len(wyniki), 1)
        persistent_notification.async_create(
            self.hass, f"Okno {self._entry.title}: pełny przejazd trwa **{czas} s**. Zapisałem to, karta jedzie teraz w tym tempie.",
            title="🤖 Okno HA – kalibracja gotowa", notification_id=f"{DOMAIN}_kal_{self._entry.entry_id}")
        self._zapisz_kalibracje(czas)

    @callback
    def _zapisz_kalibracje(self, czas: float | None) -> None:
        o = {k: v for k, v in self._entry.options.items() if k != CONF_KALIBRUJ}
        if czas:
            o[CONF_CZAS] = czas
        self.hass.config_entries.async_update_entry(self._entry, options=o)

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
