"""Automatyka jednego urządzenia: zbiera warunki z HA, pyta logika.decyduj() i rusza osłoną.

Rusza tylko przy zmianie decyzji (nie walczy z ręcznym ruchem), pamięta pauzę, liczy ruchy
silnika i zapisuje powód ostatniego ruchu. Bramy nigdy nie ruszają się same.
"""

from __future__ import annotations

import asyncio
from collections.abc import Callable
from datetime import datetime, timedelta
import hashlib
import logging
from typing import Any

from homeassistant.components.cover import ATTR_CURRENT_POSITION, ATTR_CURRENT_TILT_POSITION, CoverEntityFeature
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import (
    ATTR_ENTITY_ID,
    ATTR_SUPPORTED_FEATURES,
    ATTR_UNIT_OF_MEASUREMENT,
    STATE_CLOSED,
    STATE_CLOSING,
    STATE_ON,
    STATE_OPENING,
    STATE_UNAVAILABLE,
    STATE_UNKNOWN,
)
from homeassistant.core import Context, Event, EventStateChangedData, HomeAssistant, State, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_state_change_event, async_track_time_change
from homeassistant.helpers.storage import Store
from homeassistant.helpers.sun import get_astral_event_date
from homeassistant.util import dt as dt_util

from .const import (
    BRAMY,
    CONF_ODWROC,
    CONF_OSLONA,
    CONF_OSOBY,
    CONF_POGODA,
    CONF_ROLETY,
    CONF_SWIETA,
    CZUJNIKI,
    DOMAIN,
    DOMYSLNE,
    FUNKCJE,
    FUNKCJE_BRAMY,
    PARAMETRY,
    SYGNAL_ZMIANA,
)
from .logika import Decyzja, Warunki, decyduj
from .uklad import czujniki_okna

_LOGGER = logging.getLogger(__name__)
DESZCZOWE = {"rainy", "pouring", "lightning-rainy", "snowy-rainy", "hail"}
KALIBRACJA_CO = 500          # przypomnienie o kalibracji co tyle ruchów
_KOLEJKA = asyncio.Lock()    # „po kolei, nie naraz” – wspólna dla całego domu


def funkcje_wlaczone(o: dict[str, Any]) -> set[str]:
    f = {k for k in FUNKCJE if o.get(f"f_{k}")}
    if o.get(CONF_OSLONA) in BRAMY:
        f &= set(FUNKCJE_BRAMY)
    return f


def parametry(o: dict[str, Any]) -> dict[str, Any]:
    return {k: o.get(k, v) for k, v in PARAMETRY.items()}


def _liczba(s: State | None) -> float | None:
    if s is None or s.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
        return None
    try:
        return float(s.state)
    except ValueError:
        return None


def _wl(s: State | None) -> bool:
    if s is None:
        return False
    if s.domain == "alarm_control_panel":
        return s.state.startswith("armed")
    if s.domain == "sensor":
        return (_liczba(s) or 0) > 0 or s.state.lower() in ("on", "yes", "true", "alarm", "warning")
    return s.state == STATE_ON


class Automatyka:
    """Jedno urządzenie Motor HA: stan automatyki, pauza, licznik i powód ruchu."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass = hass
        self.entry = entry
        self.o: dict[str, Any] = {**DOMYSLNE, **entry.options}
        self.funkcje = funkcje_wlaczone(self.o)
        self.p = parametry(self.o)
        self.typ = self.o.get(CONF_OSLONA)
        self.brama = self.typ in BRAMY
        self.rolety: list[str] = list(self.o.get(CONF_ROLETY) or [])
        self.store: Store = Store(hass, 1, f"{DOMAIN}.{entry.entry_id}")
        self.dane: dict[str, Any] = {"ruchy": 0, "sekundy": 0.0, "od_kalibracji": 0}
        self.powod: str = "brak"
        self.powod_dane: dict[str, Any] = {}
        self.cel: tuple[int | None, int | None] | None = None   # ostatnia decyzja
        self.pauza_do: datetime | None = None
        self.wlaczona = True
        self.spie = False
        self.start = dt_util.now()
        self.byl_od: datetime | None = None
        self._nasze: set[str] = set()
        self._blokada: str | None = None
        self._ruch_od: dict[str, datetime] = {}
        self._sluchacze: list[Callable[[], None]] = []
        self._zdejmij: list[Callable[[], None]] = []
        self.na_problem: Callable[[str, dict[str, Any]], None] | None = None   # powiadomienia
        self.na_ruch: Callable[[int, str], None] | None = None

    # --- start i stop ---

    async def async_start(self) -> None:
        self.dane.update(await self.store.async_load() or {})
        if (p := self.dane.get("pauza_do")) and (d := dt_util.parse_datetime(p)) and d > dt_util.now():
            self.pauza_do = d
        self.wlaczona = self.dane.get("wlaczona", True)
        self.spie = self.dane.get("spie", False)
        sledz = set(self.rolety) | {e for e in self._czujniki() if e}
        if sledz:
            self._zdejmij.append(async_track_state_change_event(self.hass, list(sledz), self._zmiana))
        self._zdejmij.append(async_track_time_change(self.hass, self._co_minute, second=0))
        if "upal" in self.funkcje:
            self._zdejmij.append(async_track_time_change(self.hass, self._prognoza, hour=20, minute=5, second=0))
            self.hass.async_create_task(self._prognoza(None))
        self.hass.async_create_task(self.async_przelicz())

    @callback
    def async_stop(self) -> None:
        for z in self._zdejmij:
            z()
        self._zdejmij.clear()

    def _czujniki(self) -> list[str | None]:
        lista = [self.o.get(v) for v in CZUJNIKI.values()]
        lista += [c for c, _ in czujniki_okna(self.o)] + [self.o.get(CONF_POGODA),
                  self.o.get(CONF_SWIETA), "sun.sun"]
        lista += list(self.o.get(CONF_OSOBY) or [])
        return lista

    @callback
    def sluchaj(self, f: Callable[[], None]) -> Callable[[], None]:
        self._sluchacze.append(f)
        return lambda: self._sluchacze.remove(f)

    @callback
    def _powiadom(self) -> None:
        async_dispatcher_send(self.hass, SYGNAL_ZMIANA.format(self.entry.entry_id))
        for f in list(self._sluchacze):
            f()

    async def _zapisz(self) -> None:
        self.dane["pauza_do"] = self.pauza_do.isoformat() if self.pauza_do else None
        self.dane["wlaczona"] = self.wlaczona
        self.dane["spie"] = self.spie
        await self.store.async_save(self.dane)

    # --- sterowanie z encji (przełączniki, przyciski, akcje) ---

    async def async_pauza(self, minuty: float | None) -> None:
        """minuty=None → do końca dnia; 0 → wznów."""
        if minuty == 0:
            self.pauza_do = None
        elif minuty is None:
            self.pauza_do = dt_util.start_of_local_day() + timedelta(days=1)
        else:
            self.pauza_do = dt_util.now() + timedelta(minutes=minuty)
        await self._zapisz()
        self.cel = None   # po wznowieniu decyzja wykona się od nowa
        await self.async_przelicz()

    async def async_wlacz(self, wl: bool) -> None:
        self.wlaczona = wl
        self.cel = None
        await self._zapisz()
        await self.async_przelicz()

    async def async_spie(self, wl: bool) -> None:
        self.spie = wl
        self.cel = None
        await self._zapisz()
        await self.async_przelicz()

    # --- warunki ---

    def _stan(self, klucz: str) -> State | None:
        e = self.o.get(CZUJNIKI.get(klucz, klucz))
        return self.hass.states.get(e) if e else None

    def _pogoda(self) -> State | None:
        e = self.o.get(CONF_POGODA)
        if e:
            return self.hass.states.get(e)
        return next(iter(self.hass.states.async_all("weather")), None)

    def aktualna(self) -> int | None:
        poz = []
        for e in self.rolety:
            s = self.hass.states.get(e)
            if s is None or s.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
                continue
            p = s.attributes.get(ATTR_CURRENT_POSITION)
            poz.append(p if isinstance(p, (int, float)) else 0 if s.state == STATE_CLOSED else 100)
        if not poz:
            return None
        sr = round(sum(poz) / len(poz))
        return 100 - sr if self.o.get(CONF_ODWROC) else sr

    def _okno(self) -> str:
        wynik = "zam"
        for e, tryb in czujniki_okna(self.o):   # każde pole okna ze swoim czujnikiem
            if _wl(self.hass.states.get(e)):
                if tryb == "otworz":
                    return "otw"
                wynik = "uch"
        return wynik

    def _los(self, dzien: str) -> int:
        r = int(self.p["wakacje_rozrzut"])
        h = int(hashlib.sha256(f"{self.entry.entry_id}{dzien}".encode()).hexdigest()[:8], 16)
        return (h % (2 * r + 1)) - r if r else 0

    def warunki(self) -> Warunki:
        teraz = dt_util.now()
        slonce = self.hass.states.get("sun.sun")
        pogoda = self._pogoda()
        w = Warunki(teraz=teraz)
        dzis = teraz.date()
        try:
            wsch = get_astral_event_date(self.hass, "sunrise", dzis)
            zach = get_astral_event_date(self.hass, "sunset", dzis)
            w.wschod = dt_util.as_local(wsch) if wsch else None
            w.zachod = dt_util.as_local(zach) if zach else None
        except Exception:  # noqa: BLE001 – biegun albo brak lokalizacji
            pass
        if slonce:
            w.azymut = slonce.attributes.get("azimuth")
            w.wysokosc = slonce.attributes.get("elevation")
        w.temp = _liczba(self._stan("temp"))
        if w.temp is None and pogoda:
            w.temp = pogoda.attributes.get("temperature")
        w.temp_pokoj = _liczba(self._stan("temp_pokoj"))
        w.jasnosc = _liczba(self._stan("jasnosc"))
        wiatr = self._stan("wiatr")
        if (v := _liczba(wiatr)) is not None:
            w.wiatr = v * 3.6 if wiatr.attributes.get(ATTR_UNIT_OF_MEASUREMENT) == "m/s" else v
        elif pogoda and isinstance(pogoda.attributes.get("wind_speed"), (int, float)):
            v = float(pogoda.attributes["wind_speed"])
            jedn = pogoda.attributes.get("wind_speed_unit", "km/h")
            w.wiatr = v * 3.6 if jedn == "m/s" else v * 1.609 if jedn == "mph" else v
        w.deszcz = _wl(self._stan("deszcz")) if self.o.get(CZUJNIKI["deszcz"]) else bool(pogoda and pogoda.state in DESZCZOWE)
        w.grad = _wl(self._stan("ostrzezenia")) or bool(pogoda and pogoda.state == "hail")
        w.drgania = _wl(self._stan("drgania"))
        w.dym = _wl(self._stan("dym"))
        w.alarm = _wl(self._stan("alarm"))
        osoby = [self.hass.states.get(e) for e in self.o.get(CONF_OSOBY) or []]
        osoby = [s for s in osoby if s]
        w.nikogo = bool(osoby) and all(s.state != "home" for s in osoby)
        w.obecnosc = _wl(self._stan("obecnosc")) or _wl(self._stan("ruch"))
        if w.obecnosc and self.byl_od is None:
            self.byl_od = teraz
        if self.byl_od and self.byl_od.date() != dzis:
            self.byl_od = teraz if w.obecnosc else None
        w.byl_rano = self.byl_od is not None
        w.okno = self._okno()
        w.drzwi = _wl(self._stan("drzwi"))
        w.przeszkoda = _wl(self._stan("przeszkoda"))
        w.upal = self.dane.get("upal") == dzis.isoformat()
        if (sw := self.o.get(CONF_SWIETA)) and (s := self.hass.states.get(sw)):
            w.wolne = s.state == "off"
        else:
            w.wolne = teraz.weekday() >= 5
        wak = self.hass.data.get(DOMAIN, {}).get("wakacje")
        w.wakacje = bool(wak and wak.is_on)
        w.spie = self.spie
        w.pauza_do = self.pauza_do
        w.cisza_do = self.start + timedelta(minutes=float(self.p["cisza_min"]))
        w.aktualna = self.aktualna()
        w.los = self._los(dzis.isoformat())
        return w

    # --- decyzja i ruch ---

    def decyzja(self) -> Decyzja:
        return decyduj(self.warunki(), self.typ, self.funkcje, self.p)

    async def async_przelicz(self, *_args: Any) -> None:
        if self.brama or not self.wlaczona or not self.funkcje - {"licznik"}:
            nowy = "wylaczona" if not self.wlaczona else "brak"
            if self.powod != nowy and self.powod not in ("reczny",):
                self.powod, self.powod_dane = nowy, {}
                self._powiadom()
            return
        try:
            d = self.decyzja()
        except Exception:  # noqa: BLE001 – automatyka nie może zepsuć HA
            _LOGGER.exception("Motor HA: błąd automatyki %s", self.entry.title)
            if self.na_problem:
                self.na_problem("automatyka", {"blad": "logika"})
            return
        klucz = f"{d.powod}:{d.blokada}" if d.blokada else None
        if klucz and self.na_problem and klucz != self._blokada:
            self.na_problem("automatyka", {"powod": d.powod, "blokada": d.blokada, **d.dane})
        self._blokada = klucz
        cel = (d.poz, d.kat)
        zmiana_powodu = d.powod != self.powod
        if d.poz is None:
            if zmiana_powodu and d.powod in ("pauza", "cisza", "mroz", "blokada", "przeszkoda", "drzwi"):
                self.powod, self.powod_dane = d.powod, d.dane
                self._powiadom()
            return
        if cel == self.cel:
            return
        self.cel = cel
        akt = self.aktualna()
        drobne = ("drobne" in self.funkcje and akt is not None and abs(akt - d.poz) < float(self.p["drobne_prog"])
                  and d.poz not in (0, 100))
        if drobne:
            return
        self.powod, self.powod_dane = d.powod, d.dane
        if "proba" in self.funkcje:
            self.powod_dane = {**d.dane, "proba": d.poz}
            self._powiadom()
            return
        self._powiadom()
        await self.async_jedz(d.poz, d.kat)

    async def async_jedz(self, poz: int, kat: int | None = None) -> None:
        """Ruch zlecony przez automatykę (oznaczony kontekstem, żeby nie wziąć go za ręczny)."""
        if not self.rolety:
            return
        ctx = Context()
        self._nasze.add(ctx.id)
        cel = 100 - poz if self.o.get(CONF_ODWROC) else poz
        if "po_kolei" in self.funkcje:
            async with _KOLEJKA:
                await self._wyslij(ctx, cel, kat)
                await asyncio.sleep(float(self.p["po_kolei_s"]))
        else:
            await self._wyslij(ctx, cel, kat)
        if self.na_ruch:
            self.na_ruch(poz, ctx.id)

    async def _wyslij(self, ctx: Context, cel: int, kat: int | None) -> None:
        z_poz = [e for e in self.rolety if (s := self.hass.states.get(e))
                 and int(s.attributes.get(ATTR_SUPPORTED_FEATURES, 0)) & CoverEntityFeature.SET_POSITION]
        reszta = [e for e in self.rolety if e not in z_poz]
        if z_poz:
            await self.hass.services.async_call("cover", "set_cover_position", {ATTR_ENTITY_ID: z_poz, "position": cel},
                                                blocking=False, context=ctx)
        if reszta:
            await self.hass.services.async_call("cover", "open_cover" if cel >= 50 else "close_cover",
                                                {ATTR_ENTITY_ID: reszta}, blocking=False, context=ctx)
        if kat is not None:
            z_lam = [e for e in self.rolety if (s := self.hass.states.get(e))
                     and int(s.attributes.get(ATTR_SUPPORTED_FEATURES, 0)) & CoverEntityFeature.SET_TILT_POSITION]
            if z_lam:
                await self.hass.services.async_call("cover", "set_cover_tilt_position",
                                                    {ATTR_ENTITY_ID: z_lam, "tilt_position": kat}, blocking=False, context=ctx)

    # --- zdarzenia ---

    @callback
    def _zmiana(self, event: Event[EventStateChangedData]) -> None:
        e = event.data["entity_id"]
        if e in self.rolety:
            self._ruch_silnika(event)
        self.hass.async_create_task(self.async_przelicz())

    @callback
    def _ruch_silnika(self, event: Event[EventStateChangedData]) -> None:
        nowy, stary = event.data["new_state"], event.data["old_state"]
        if nowy is None or stary is None:
            return
        e = event.data["entity_id"]
        teraz = dt_util.now()
        jedzie = nowy.state in (STATE_OPENING, STATE_CLOSING)
        jechala = stary.state in (STATE_OPENING, STATE_CLOSING)
        if jedzie and not jechala:
            self._ruch_od[e] = teraz
            self.dane["ruchy"] = int(self.dane.get("ruchy", 0)) + 1
            self.dane["od_kalibracji"] = int(self.dane.get("od_kalibracji", 0)) + 1
            if self.dane["od_kalibracji"] == KALIBRACJA_CO and self.na_problem:
                self.na_problem("kalibracja", {"ruchy": KALIBRACJA_CO})
        elif jechala and not jedzie and (od := self._ruch_od.pop(e, None)):
            self.dane["sekundy"] = float(self.dane.get("sekundy", 0)) + (teraz - od).total_seconds()
            self.hass.async_create_task(self._zapisz())
            self._powiadom()
        # ręczny ruch: zmiana pozycji, której nie zleciła automatyka
        p_nowa, p_stara = nowy.attributes.get(ATTR_CURRENT_POSITION), stary.attributes.get(ATTR_CURRENT_POSITION)
        ruszyla = jedzie and not jechala or (p_nowa != p_stara and p_nowa is not None and p_stara is not None)
        if not ruszyla or nowy.context.id in self._nasze or (nowy.context.parent_id in self._nasze):
            return
        if "reczny" in self.funkcje and not self.brama:
            self.pauza_do = teraz + timedelta(minutes=float(self.p["reczny_min"]))
            self.powod, self.powod_dane = "reczny", {"do": self.pauza_do.strftime("%H:%M")}
            self.hass.async_create_task(self._zapisz())
            self._powiadom()

    async def _co_minute(self, _now: datetime) -> None:
        if self.pauza_do and dt_util.now() >= self.pauza_do:
            self.pauza_do = None
            self.cel = None
            await self._zapisz()
        await self.async_przelicz()

    async def _prognoza(self, _now: datetime | None) -> None:
        """Wieczorem sprawdza prognozę: upał jutro → rano osłona zjedzie, zanim pokój się nagrzeje."""
        pogoda = self._pogoda()
        if pogoda is None:
            return
        try:
            wynik = await self.hass.services.async_call(
                "weather", "get_forecasts", {ATTR_ENTITY_ID: pogoda.entity_id, "type": "daily"},
                blocking=True, return_response=True)
        except Exception as err:  # noqa: BLE001
            _LOGGER.debug("Motor HA: brak prognozy: %s", err)
            return
        dni = (wynik or {}).get(pogoda.entity_id, {}).get("forecast") or []
        teraz = dt_util.now()
        for d in dni[:3]:
            kiedy = dt_util.parse_datetime(str(d.get("datetime", "")))
            if kiedy is None or d.get("temperature") is None:
                continue
            dzien = dt_util.as_local(kiedy).date()
            if dzien >= teraz.date() and float(d["temperature"]) >= float(self.p["upal_prog"]):
                if dzien == teraz.date() and teraz.hour >= 12:
                    continue
                self.dane["upal"] = dzien.isoformat()
                await self._zapisz()
                return

    async def async_kalibracja_zrobiona(self) -> None:
        self.dane["od_kalibracji"] = 0
        await self._zapisz()
        self._powiadom()

    @property
    def tilt(self) -> int | None:
        for e in self.rolety:
            if (s := self.hass.states.get(e)) and isinstance(t := s.attributes.get(ATTR_CURRENT_TILT_POSITION), (int, float)):
                return int(t)
        return None
