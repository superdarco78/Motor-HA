"""Urządzenie Motor HA jako jedna encja cover: rusza silnikami skrzydeł i niesie ustawienia karty."""

from __future__ import annotations

import asyncio
from collections.abc import Callable
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
    STATE_OPEN,
    STATE_OPENING,
    STATE_UNAVAILABLE,
    STATE_UNKNOWN,
)
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_call_later, async_track_state_change_event

from .const import (
    BRAMY,
    CONF_CZAS,
    CONF_KALIBRACJA_50,
    CONF_KALIBRUJ,
    CONF_KARTA,
    CONF_KOLOR,
    CONF_KOLOR_WLASNY,
    CONF_ODWROC,
    CONF_OSOBNO,
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
    KARTA_Z_KREATORA,
    OSLONY_ZEW,
    RAMY,
    SYGNAL_ZMIANA,
    Z_LAMELAMI,
)
from .urzadzenie import Wpis, info_urzadzenia

# klucze przekazywane karcie bez zmian
PROSTE = ["czujnik_lewe", "czujnik_prawe", "tryb_lewe", "tryb_prawe", "predkosc_lewa", "predkosc_prawa",
          CONF_OSLONA, CONF_KOLOR, CONF_ODWROC, "rodzaj_pokoju", "foto_stan", CONF_OSOBNO]
SLONECZNE = ("f_slonce", "f_oslepianie", "f_upal", "f_zima", "f_jasnosc", "f_temp_pokoj")
KALIBRACJA_MAKS = 240   # s na jeden przejazd
MIN_PRZEJAZD = 5        # s – krótszy „pełny przejazd” to meldunek celu zaraz po ruszeniu, nie pomiar


def _ruszyla(s: Any) -> str | None:
    """Kierunek, gdy stan przeczy pozycji: zamknięta przy 100 % jedzie w dół, otwarta przy 0 % – w górę."""
    p = s.attributes.get(ATTR_CURRENT_POSITION)
    if not isinstance(p, (int, float)):
        return None
    if s.state == STATE_CLOSED and p >= 99:
        return STATE_CLOSING
    if s.state == STATE_OPEN and p <= 1:
        return STATE_OPENING
    return None


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
        self._ruszyla: dict[str, tuple[str, float]] = {}   # encja → (kierunek, kiedy) z meldunku „ruszyła”
        self._odswiez_ruch: Callable[[], None] | None = None
        self._rolety: list[str] = list(o.get(CONF_ROLETY) or [])
        typ = o.get(CONF_OSLONA) or (o.get(CONF_KARTA) or {}).get(CONF_OSLONA) or DOMYSLNE[CONF_OSLONA]
        self._typ = typ
        self._odwroc = bool(o.get(CONF_ODWROC))
        self._attr_unique_id = entry.entry_id
        self._attr_device_class = (
            CoverDeviceClass.GARAGE if typ in GARAZE else CoverDeviceClass.GATE if typ in BRAMY
            else CoverDeviceClass.AWNING if typ == "markiza" else CoverDeviceClass.SHUTTER if typ in OSLONY_ZEW
            else CoverDeviceClass.CURTAIN if typ == "zaslona" else CoverDeviceClass.BLIND if typ in Z_LAMELAMI
            else CoverDeviceClass.SHADE)
        self._attr_device_info = info_urzadzenia(entry)
        # kreator (i zmierzony czas kalibracji) ma pierwszeństwo przed starym zapisem z edytora karty
        z_kreatora = ustawienia_karty(entry.title, o)
        self._karta = {**z_kreatora, **{k: v for k, v in (o.get(CONF_KARTA) or {}).items()
                                        if k not in KARTA_Z_KREATORA or k not in z_kreatora}}

    @property
    def _w(self) -> Wpis:
        return self.hass.data[DOMAIN]["wpisy"][self._entry.entry_id]

    async def async_added_to_hass(self) -> None:
        self._w.okno = self
        self.async_on_remove(async_track_state_change_event(self.hass, self._rolety, self._zmiana))
        self.async_on_remove(lambda: self._odswiez_ruch() if self._odswiez_ruch else None)
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
    def _zmiana(self, event: Event[EventStateChangedData]) -> None:
        e, stary, nowy = event.data["entity_id"], event.data["old_state"], event.data["new_state"]
        # Zigbee (np. Moes): stan zmienia się od razu po komendzie, pozycja przychodzi po dojechaniu.
        # „Zamknięta przy 100 %” / „otwarta przy 0 %” po zmianie stanu = właśnie ruszyła
        if nowy and stary and nowy.state != stary.state and (kier := _ruszyla(nowy)):
            self._ruszyla[e] = (kier, monotonic())
            if self._odswiez_ruch:
                self._odswiez_ruch()
            self._odswiez_ruch = async_call_later(self.hass, self._limit_ruchu() + 0.5, self._po_ruchu)
        elif nowy and stary and nowy.attributes.get(ATTR_CURRENT_POSITION) != stary.attributes.get(ATTR_CURRENT_POSITION):
            self._ruszyla.pop(e, None)
        self._przelicz()
        self.async_write_ha_state()

    def _limit_ruchu(self) -> float:
        czas = float(self._entry.options.get(CONF_CZAS) or 0) or 60.0
        return czas * 1.5 + 10

    @callback
    def _po_ruchu(self, _teraz: Any) -> None:
        self._odswiez_ruch = None
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
        teraz, limit = monotonic(), self._limit_ruchu()
        jedzie = [s.state if s.state in (STATE_OPENING, STATE_CLOSING) else
                  k[0] if (k := self._ruszyla.get(s.entity_id)) and teraz - k[1] < limit else None for s in stany]
        self._attr_is_opening = otw in jedzie
        self._attr_is_closing = zam in jedzie
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

    def _nazwa(self, encja: str) -> str:
        s = self.hass.states.get(encja)
        return str(s.attributes.get("friendly_name") or encja) if s else encja

    async def _jedz(self, usluga: str, cel: int, pierwszy: bool) -> tuple[float | None, list[str], float]:
        """Jeden przejazd; zwraca (czas, osłony bez odpowiedzi, start). Każdą osłonę śledzi osobno."""
        przed = {e: (s.last_updated if (s := self.hass.states.get(e)) else None) for e in self._rolety}
        t0 = monotonic()
        await self.hass.services.async_call("cover", usluga, {ATTR_ENTITY_ID: self._rolety}, blocking=True)
        dojechala: dict[str, float] = {}
        odezwala: set[str] = set()
        jechala: set[str] = set()
        while (el := monotonic() - t0) < KALIBRACJA_MAKS:
            await asyncio.sleep(0.5)
            for e in self._rolety:
                s = self.hass.states.get(e)
                if e in dojechala or not s or s.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
                    continue
                if s.last_updated != przed[e]:
                    odezwala.add(e)
                if s.state in (STATE_OPENING, STATE_CLOSING):
                    jechala.add(e)
                    continue
                na_miejscu = abs(self._poz(s) - cel) <= 1
                # silniki bez „otwiera się”: Zigbee (np. Moes) zmienia stan od razu, a pozycję melduje na końcu
                if (e in jechala and el > 1) or (na_miejscu and (e in odezwala or el > (1 if pierwszy else 4))):
                    dojechala[e] = el
            if len(dojechala) == len(self._rolety):
                break
            # inne już dojechały, a ta od komendy milczy – nie czekamy pełnych KALIBRACJA_MAKS
            if dojechala and el > max(60.0, 3 * max(dojechala.values())) and \
                    all(e in dojechala or e not in odezwala for e in self._rolety):
                break
        brak = [e for e in self._rolety if e not in dojechala]
        return (max(dojechala.values()) if dojechala and not brak else None), brak, t0

    def _czas_z_predkosci(self) -> float | None:
        """Czas przejazdu z prędkości silnika (obr/min) – ten sam wzór co w karcie."""
        czasy = []
        for klucz in ("predkosc_lewa", "predkosc_prawa"):
            if (e := self._entry.options.get(klucz)) and (s := self.hass.states.get(e)):
                try:
                    obroty = float(s.state)
                except ValueError:
                    continue
                if obroty > 0:
                    czasy.append(20.2 + 394 / obroty)
        return round(max(czasy), 1) if czasy else None

    async def _czas_od_razu(self, t0: float) -> float | None:
        """Silnik zameldował cel zaraz po ruszeniu: czas z prędkości albo z pierwszego meldunku po zatrzymaniu."""
        if czas := self._czas_z_predkosci():
            await asyncio.sleep(max(0.0, czas - (monotonic() - t0)))   # niech naprawdę dojedzie przed kolejnym przejazdem
            return czas
        przed = {e: (s.last_updated if (s := self.hass.states.get(e)) else None) for e in self._rolety}
        ostatni = None
        while monotonic() - t0 < KALIBRACJA_MAKS:
            await asyncio.sleep(0.5)
            nowe = [e for e in self._rolety if (s := self.hass.states.get(e)) and s.last_updated != przed[e]]
            if nowe:
                ostatni = monotonic() - t0
                przed.update({e: self.hass.states.get(e).last_updated for e in nowe})
            elif ostatni is not None and monotonic() - t0 - ostatni > 5:
                break
        return round(ostatni, 1) if ostatni and ostatni >= MIN_PRZEJAZD else None

    async def _kalibruj(self) -> None:
        wyniki = []
        nid = f"{DOMAIN}_kal_{self._entry.entry_id}"
        for n, (usluga, cel) in enumerate((("open_cover", 100), ("close_cover", 0), ("open_cover", 100))):
            el, brak, t0 = await self._jedz(usluga, cel, n == 0)
            if brak:
                lista = ", ".join(self._nazwa(e) for e in brak)
                await self._koniec_kalibracji(nid, "kalibracja_brak", {"lista": lista, "maks": KALIBRACJA_MAKS})
                self._zapisz_kalibracje(None)
                return
            if n and el is not None and el < MIN_PRZEJAZD:
                el = await self._czas_od_razu(t0)
                if el is None:
                    await self._koniec_kalibracji(nid, "kalibracja_od_razu", {})
                    self._zapisz_kalibracje(None)
                    return
            if n and el is not None:
                wyniki.append(el)
        czas = round(sum(wyniki) / len(wyniki), 1)
        await self._koniec_kalibracji(nid, "kalibracja_ok", {"czas": f"{czas:g}"})
        if self._entry.options.get(CONF_KALIBRACJA_50) and self._typ not in BRAMY \
                and self.supported_features & CoverEntityFeature.SET_POSITION:
            await self.async_set_cover_position(position=50)   # widać, że kalibracja się skończyła
        self._zapisz_kalibracje(czas)
        if w := self.hass.data[DOMAIN]["wpisy"].get(self._entry.entry_id):
            if w.auto:
                await w.auto.async_kalibracja_zrobiona()

    async def _koniec_kalibracji(self, nid: str, rodzaj: str, dane: dict[str, Any]) -> None:
        """Powiadomienie po kalibracji: w HA i na telefon (jeśli wybrany w „Powiadomieniach”)."""
        w = self.hass.data[DOMAIN]["wpisy"].get(self._entry.entry_id)
        if w and w.powiadomienia:
            await w.powiadomienia.wyslij(rodzaj, dane, nid, ok=rodzaj == "kalibracja_ok")
            return
        tresc = f"{dane['czas']} s" if "czas" in dane else f"⚠️ {dane.get('lista', '')}".strip()
        persistent_notification.async_create(self.hass, f"{self._entry.title}: {tresc}",
                                             title="Motor HA", notification_id=nid)

    @callback
    def _zapisz_kalibracje(self, czas: float | None) -> None:
        o = {k: v for k, v in self._entry.options.items() if k != CONF_KALIBRUJ}
        if czas:
            o[CONF_CZAS] = czas
            if isinstance(karta := o.get(CONF_KARTA), dict) and "czas" in karta:   # zmierzony czas ważniejszy od starej karty
                o[CONF_KARTA] = {k: v for k, v in karta.items() if k != "czas"}
        self.hass.config_entries.async_update_entry(self._entry, options=o)
