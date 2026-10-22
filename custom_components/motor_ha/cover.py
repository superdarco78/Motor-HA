"""Urządzenie Motor HA jako jedna encja cover: rusza silnikami skrzydeł i niesie ustawienia karty."""

from __future__ import annotations

import asyncio
from time import monotonic
from typing import Any

from homeassistant.components import persistent_notification
from homeassistant.components.cover import (
    ATTR_CURRENT_POSITION,
    ATTR_CURRENT_TILT_POSITION,
    ATTR_POSITION,
    ATTR_TILT_POSITION,
    CoverDeviceClass,
    CoverEntity,
    CoverEntityFeature,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    ATTR_ENTITY_ID,
    ATTR_SUPPORTED_FEATURES,
    STATE_CLOSED,
    STATE_CLOSING,
    STATE_OPENING,
    STATE_UNAVAILABLE,
    STATE_UNKNOWN,
)
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_state_change_event

from .const import (
    BRAMY,
    CONF_CZAS,
    CONF_KALIBRUJ,
    CONF_KARTA,
    CONF_KOLOR,
    CONF_KOLOR_WLASNY,
    CONF_ODWROC,
    CONF_OSLONA,
    CONF_POGODA,
    CONF_RAMA,
    CONF_RAMA_WLASNA,
    CONF_ROLETY,
    CONF_SKRZYDLA,
    CONF_WYSOKOSC,
    CZUJNIKI,
    DOMAIN,
    DOMYSLNE,
    GARAZE,
    OSLONY_ZEW,
    RAMY,
    SYGNAL_ZMIANA,
    Z_LAMELAMI,
)
from .urzadzenie import Wpis, info_urzadzenia

# klucze przekazywane karcie bez zmian
PROSTE = ["czujnik_lewe", "czujnik_prawe", "tryb_lewe", "tryb_prawe", "predkosc_lewa", "predkosc_prawa",
          CONF_OSLONA, CONF_KOLOR, CONF_ODWROC, "rodzaj_pokoju", "foto_stan"]
SLONECZNE = ("f_slonce", "f_oslepianie", "f_upal", "f_zima", "f_jasnosc", "f_temp_pokoj")
KALIBRACJA_MAKS = 240   # s na jeden przejazd


def _hex(rgb: Any) -> str | None:
    if isinstance(rgb, (list, tuple)) and len(rgb) == 3:
        return "#" + "".join(f"{int(x):02x}" for x in rgb)
    return None


def ustawienia_karty(nazwa: str, o: dict[str, Any]) -> dict[str, Any]:
    """Ustawienia z kreatora integracji w formacie karty (atrybut motor_ha)."""
    rolety = list(o.get(CONF_ROLETY) or [])
    k: dict[str, Any] = {"name": nazwa, "skrzydla": int(o.get(CONF_SKRZYDLA, DOMYSLNE[CONF_SKRZYDLA]))}
    if len(rolety) == 2:
        k["roleta_lewa"], k["roleta_prawa"] = rolety
    for klucz in PROSTE:
        if o.get(klucz) not in (None, ""):
            k[klucz] = o[klucz]
    if hexy := _hex(o.get(CONF_KOLOR_WLASNY)):
        k[CONF_KOLOR] = hexy
    rama = o.get(CONF_RAMA, DOMYSLNE[CONF_RAMA])
    k["rama"] = _hex(o.get(CONF_RAMA_WLASNA)) or RAMY.get(rama, rama)
    k["wysokosc"] = int(o.get(CONF_WYSOKOSC, DOMYSLNE[CONF_WYSOKOSC]))
    czas = float(o.get(CONF_CZAS) or 0)
    k["czas"] = czas if czas > 0 else "auto"
    k["pogoda"] = o.get(CONF_POGODA) or "auto"
    if o.get(CZUJNIKI["foto"]):
        k["przeszkoda"] = o[CZUJNIKI["foto"]]
    if any(o.get(f) for f in SLONECZNE):
        k["kompas"] = float(o.get("azymut", 180))   # kierunek okna – karta rysuje słońce względem okna
    return k


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    async_add_entities([MotorCover(entry)])


class MotorCover(CoverEntity):
    """Pozycja = średnia skrzydeł, polecenia idą do silników skrzydeł."""

    _attr_has_entity_name = True
    _attr_name = None
    _attr_should_poll = False

    def __init__(self, entry: ConfigEntry) -> None:
        o = entry.options
        self._entry = entry
        self._kalibracja: asyncio.Task | None = None
        self._rolety: list[str] = list(o.get(CONF_ROLETY) or [])
        typ = (o.get(CONF_KARTA) or {}).get(CONF_OSLONA) or o.get(CONF_OSLONA, DOMYSLNE[CONF_OSLONA])
        self._typ = typ
        self._odwroc = bool(o.get(CONF_ODWROC))
        self._attr_unique_id = entry.entry_id
        self._attr_device_class = (
            CoverDeviceClass.GARAGE if typ in GARAZE else CoverDeviceClass.GATE if typ in BRAMY
            else CoverDeviceClass.AWNING if typ == "markiza" else CoverDeviceClass.SHUTTER if typ in OSLONY_ZEW
            else CoverDeviceClass.CURTAIN if typ == "zaslona" else CoverDeviceClass.BLIND if typ in Z_LAMELAMI
            else CoverDeviceClass.SHADE)
        self._attr_device_info = info_urzadzenia(entry)
        self._karta = {**ustawienia_karty(entry.title, o), **(o.get(CONF_KARTA) or {})}

    @property
    def _w(self) -> Wpis:
        return self.hass.data[DOMAIN]["wpisy"][self._entry.entry_id]

    async def async_added_to_hass(self) -> None:
        self._w.okno = self
        self.async_on_remove(async_track_state_change_event(self.hass, self._rolety, self._zmiana))
        self.async_on_remove(async_dispatcher_connect(
            self.hass, SYGNAL_ZMIANA.format(self._entry.entry_id), self.async_write_ha_state))
        self._przelicz()
        if self._entry.options.get(CONF_KALIBRUJ):
            self.kalibruj()

    # --- stan ---

    def _stany(self):
        return [s for e in self._rolety if (s := self.hass.states.get(e)) and s.state not in (STATE_UNAVAILABLE,)]

    @staticmethod
    def _poz(s) -> float:
        p = s.attributes.get(ATTR_CURRENT_POSITION)
        return p if isinstance(p, (int, float)) else 0 if s.state == STATE_CLOSED else 100

    @callback
    def _zmiana(self, _event: Event[EventStateChangedData]) -> None:
        self._przelicz()
        self.async_write_ha_state()

    @callback
    def _przelicz(self) -> None:
        stany = self._stany()
        self._attr_available = bool(stany)
        poz = [self._poz(s) for s in stany if s.state != STATE_UNKNOWN]
        sr = round(sum(poz) / len(poz)) if poz else None
        if sr is not None and self._odwroc:
            sr = 100 - sr
        self._attr_current_cover_position = sr
        self._attr_is_closed = sr is not None and sr <= 0
        otw, zam = (STATE_CLOSING, STATE_OPENING) if self._odwroc else (STATE_OPENING, STATE_CLOSING)
        self._attr_is_opening = any(s.state == otw for s in stany)
        self._attr_is_closing = any(s.state == zam for s in stany)
        tilty = [t for s in stany if isinstance(t := s.attributes.get(ATTR_CURRENT_TILT_POSITION), (int, float))]
        self._attr_current_cover_tilt_position = round(sum(tilty) / len(tilty)) if tilty else None
        cechy = CoverEntityFeature(0)
        for s in stany:
            cechy |= CoverEntityFeature(int(s.attributes.get(ATTR_SUPPORTED_FEATURES, 0)))
        if not stany:
            cechy = CoverEntityFeature.OPEN | CoverEntityFeature.CLOSE | CoverEntityFeature.STOP
        self._attr_supported_features = cechy | CoverEntityFeature.OPEN | CoverEntityFeature.CLOSE | (
            CoverEntityFeature.SET_POSITION if any(int(s.attributes.get(ATTR_SUPPORTED_FEATURES, 0))
                                                   & CoverEntityFeature.SET_POSITION for s in stany) else 0)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        w = self.hass.data.get(DOMAIN, {}).get("wpisy", {}).get(self._entry.entry_id)
        karta = dict(self._karta)
        if w and w.auto:
            a = w.auto
            karta["powod"] = a.powod
            karta["pauza_do"] = a.pauza_do.isoformat() if a.pauza_do else None
            rej = er.async_get(self.hass)
            karta["encje"] = {k: e for k in ("powod", "wznow", "pauza")
                              if (e := rej.async_get_entity_id(
                                  {"powod": "sensor", "wznow": "button", "pauza": "switch"}[k], DOMAIN,
                                  f"{self._entry.entry_id}_{k}"))}
        return {ATTR_ENTITY_ID: self._rolety, "motor_ha": karta}

    # --- polecenia ---

    async def _wyslij(self, usluga: str, **dane: Any) -> None:
        await self.hass.services.async_call("cover", usluga, {ATTR_ENTITY_ID: self._rolety, **dane},
                                            blocking=True, context=self._context)
        if (w := self.hass.data[DOMAIN]["wpisy"].get(self._entry.entry_id)) and w.powiadomienia and w.brama:
            cel = 100 if usluga == "open_cover" else 0 if usluga == "close_cover" else dane.get(ATTR_POSITION)
            if cel is not None:
                w.powiadomienia.po_ruchu(int(cel), "")

    async def async_open_cover(self, **kwargs: Any) -> None:
        await self._wyslij("close_cover" if self._odwroc else "open_cover")

    async def async_close_cover(self, **kwargs: Any) -> None:
        await self._wyslij("open_cover" if self._odwroc else "close_cover")

    async def async_stop_cover(self, **kwargs: Any) -> None:
        await self._wyslij("stop_cover")

    async def async_set_cover_position(self, **kwargs: Any) -> None:
        p = int(kwargs[ATTR_POSITION])
        await self._wyslij("set_cover_position", position=100 - p if self._odwroc else p)

    async def async_set_cover_tilt_position(self, **kwargs: Any) -> None:
        await self._wyslij("set_cover_tilt_position", tilt_position=kwargs[ATTR_TILT_POSITION])

    async def async_open_cover_tilt(self, **kwargs: Any) -> None:
        await self._wyslij("open_cover_tilt")

    async def async_close_cover_tilt(self, **kwargs: Any) -> None:
        await self._wyslij("close_cover_tilt")

    async def async_stop_cover_tilt(self, **kwargs: Any) -> None:
        await self._wyslij("stop_cover_tilt")

    # --- kalibracja: góra → dół (mierzone) → góra (mierzone) ---

    @callback
    def kalibruj(self) -> None:
        if self._kalibracja and not self._kalibracja.done():
            return
        self._kalibracja = self.hass.async_create_background_task(self._kalibruj(), f"{DOMAIN} kalibracja")

    def _pozycje(self) -> tuple[bool, list[float]]:
        stany = self._stany()
        return any(s.state in (STATE_OPENING, STATE_CLOSING) for s in stany), [self._poz(s) for s in stany]

    async def _jedz(self, usluga: str, cel: int, pierwszy: bool) -> float | None:
        t0 = monotonic()
        await self.hass.services.async_call("cover", usluga, {ATTR_ENTITY_ID: self._rolety}, blocking=True)
        jechala = False
        while (el := monotonic() - t0) < KALIBRACJA_MAKS:
            await asyncio.sleep(0.5)
            ruch, poz = self._pozycje()
            jechala |= ruch
            na_miejscu = bool(poz) and all(abs(p - cel) <= 1 for p in poz)
            if (jechala and not ruch and el > 1) or (not jechala and na_miejscu and el > (1 if pierwszy else 4)):
                return el
        return None

    async def _kalibruj(self) -> None:
        wyniki = []
        nid = f"{DOMAIN}_kal_{self._entry.entry_id}"
        for n, (usluga, cel) in enumerate((("open_cover", 100), ("close_cover", 0), ("open_cover", 100))):
            el = await self._jedz(usluga, cel, n == 0)
            if el is None:
                persistent_notification.async_create(
                    self.hass, f"{self._entry.title}: > {KALIBRACJA_MAKS} s", title="Motor HA ⚠️", notification_id=nid)
                self._zapisz_kalibracje(None)
                return
            if n:
                wyniki.append(el)
        czas = round(sum(wyniki) / len(wyniki), 1)
        persistent_notification.async_create(self.hass, f"{self._entry.title}: {czas} s", title="Motor HA ✅",
                                             notification_id=nid)
        self._zapisz_kalibracje(czas)
        if w := self.hass.data[DOMAIN]["wpisy"].get(self._entry.entry_id):
            if w.auto:
                await w.auto.async_kalibracja_zrobiona()

    @callback
    def _zapisz_kalibracje(self, czas: float | None) -> None:
        o = {k: v for k, v in self._entry.options.items() if k != CONF_KALIBRUJ}
        if czas:
            o[CONF_CZAS] = czas
        self.hass.config_entries.async_update_entry(self._entry, options=o)
