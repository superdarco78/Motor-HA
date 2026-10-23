"""Powiadomienia o problemach: która osłona albo brama i co się stało, w języku HA.

Każdy rodzaj włącza się osobno. Zawsze trafiają do powiadomień HA, a jeśli wybrano
telefon (usługa notify.*), także tam. Ten sam problem nie przychodzi drugi raz,
dopóki nie minie.
"""

from __future__ import annotations

from collections.abc import Callable
from datetime import datetime, timedelta
import logging
from typing import Any

from homeassistant.components import persistent_notification
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import STATE_CLOSED, STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_call_later, async_track_time_interval
from homeassistant.helpers.translation import async_get_translations
from homeassistant.util import dt as dt_util

from .const import (
    BATERIA_PROG,
    BRAMY,
    CONF_CZAS,
    CONF_CZUJNIK_LEWE,
    CONF_CZUJNIK_PRAWE,
    CONF_FOTO_STAN,
    CONF_OSLONA,
    CONF_POGODA,
    CONF_POWIADOM,
    CONF_POWIADOM_GDZIE,
    CONF_ROLETY,
    CZUJNIKI,
    DOMAIN,
    NAZWA,
    PARAMETRY,
)
from .skan import baterie

_LOGGER = logging.getLogger(__name__)
NIEDOSTEPNA_PO = timedelta(minutes=2)
CZUJNIK_PO = timedelta(minutes=10)


class _Brak(dict):
    """Brakujące dane w tekście powiadomienia = „?” zamiast błędu."""

    def __missing__(self, klucz: str) -> str:
        return "?"


class Powiadomienia:
    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, aktualna: Callable[[], int | None]) -> None:
        self.hass = hass
        self.entry = entry
        o = entry.options
        self.wlaczone: set[str] = set(o.get(CONF_POWIADOM) or [])
        self.gdzie: list[str] = list(o.get(CONF_POWIADOM_GDZIE) or [])
        self.rolety: list[str] = list(o.get(CONF_ROLETY) or [])
        self.brama = o.get(CONF_OSLONA) in BRAMY
        self.czas = float(o.get(CONF_CZAS) or 60)
        self.foto = o.get(CZUJNIKI["foto"])
        self.foto_stan = str(o.get(CONF_FOTO_STAN, "on"))
        self.brama_min = float(o.get("brama_minuty", PARAMETRY["brama_minuty"]))
        self.czujniki = [e for e in [o.get(v) for v in CZUJNIKI.values()]
                         + [o.get(CONF_CZUJNIK_LEWE), o.get(CONF_CZUJNIK_PRAWE), o.get(CONF_POGODA)] if e]
        self.aktualna = aktualna
        self._aktywne: set[str] = set()
        self._od: dict[str, datetime] = {}
        self._zdejmij: list[Callable[[], None]] = []

    @callback
    def async_start(self) -> None:
        if self.wlaczone:
            self._zdejmij.append(async_track_time_interval(self.hass, self._sprawdz, timedelta(minutes=1)))

    @callback
    def async_stop(self) -> None:
        for z in self._zdejmij:
            z()
        self._zdejmij.clear()

    # --- wysyłka ---

    async def _tekst(self, rodzaj: str, dane: dict[str, Any]) -> tuple[str, str]:
        jezyk = self.hass.config.language
        t = await async_get_translations(self.hass, jezyk, "exceptions", {DOMAIN})
        tytul = t.get(f"component.{DOMAIN}.exceptions.tytul.message", "{nazwa}")
        tresc = t.get(f"component.{DOMAIN}.exceptions.{rodzaj}.message", rodzaj)
        powod = dane.get("powod")
        if powod:
            dane = {**dane, "powod": t.get(f"component.{DOMAIN}.exceptions.powod_{powod}.message", powod)}
        dane = {"nazwa": self.entry.title, **{k: v for k, v in dane.items() if v is not None}}
        try:
            return tytul.format(nazwa=NAZWA), tresc.format_map(_Brak(dane))
        except (KeyError, IndexError, ValueError):
            return tytul.format(nazwa=NAZWA), tresc

    @callback
    def zglos(self, rodzaj: str, dane: dict[str, Any] | None = None) -> None:
        """Problem się pojawił (jeden raz, dopóki nie minie)."""
        grupa = "automatyka" if rodzaj == "kalibracja" else rodzaj
        if grupa not in self.wlaczone and rodzaj != "kalibracja":
            return
        klucz = f"{rodzaj}"
        if klucz in self._aktywne and rodzaj != "automatyka":
            return
        self._aktywne.add(klucz)
        self.hass.async_create_task(self._wyslij(rodzaj, dane or {}))

    @callback
    def minal(self, rodzaj: str) -> None:
        if rodzaj in self._aktywne:
            self._aktywne.discard(rodzaj)
            persistent_notification.async_dismiss(self.hass, f"{DOMAIN}_{self.entry.entry_id}_{rodzaj}")

    async def _wyslij(self, rodzaj: str, dane: dict[str, Any]) -> None:
        await self.wyslij(rodzaj, dane, f"{DOMAIN}_{self.entry.entry_id}_{rodzaj}")

    async def wyslij(self, rodzaj: str, dane: dict[str, Any], nid: str, ok: bool = False) -> None:
        """Do HA i na wybrane telefony; ok=True – dobra wiadomość (tytuł bez „problem”)."""
        tytul, tresc = await self._tekst(rodzaj, dane)
        if ok:
            tytul = f"{NAZWA} ✅"
        persistent_notification.async_create(self.hass, tresc, title=tytul, notification_id=nid)
        for usluga in self.gdzie:
            domena, _, nazwa = usluga.partition(".")
            if not nazwa:
                domena, nazwa = "notify", usluga
            try:
                await self.hass.services.async_call(domena, nazwa, {"title": tytul, "message": tresc}, blocking=False)
            except Exception as err:  # noqa: BLE001 – telefon wyłączony albo usunięty
                _LOGGER.warning("Motor HA: nie wysłałem powiadomienia przez %s: %s", usluga, err)

    # --- sprawdzanie co minutę ---

    def _dlugo(self, klucz: str, warunek: bool, ile: timedelta) -> bool:
        teraz = dt_util.now()
        if not warunek:
            self._od.pop(klucz, None)
            return False
        od = self._od.setdefault(klucz, teraz)
        return teraz - od >= ile

    async def _sprawdz(self, _now: datetime) -> None:
        niedostepne = [e for e in self.rolety if (s := self.hass.states.get(e)) is None or s.state == STATE_UNAVAILABLE]
        if self._dlugo("nie_odpowiada", bool(niedostepne), NIEDOSTEPNA_PO):
            self.zglos("nie_odpowiada", {"encje": ", ".join(niedostepne)})
        elif not niedostepne:
            self.minal("nie_odpowiada")

        if "bateria" in self.wlaczone:
            slabe = []
            for e in baterie(self.hass, self.rolety + self.czujniki):
                s = self.hass.states.get(e)
                try:
                    if s and float(s.state) <= BATERIA_PROG:
                        slabe.append(f"{s.name} ({round(float(s.state))} %)")
                except ValueError:
                    continue
            if slabe:
                self.zglos("bateria", {"lista": ", ".join(slabe)})
            else:
                self.minal("bateria")

        zle = [e for e in self.czujniki if (s := self.hass.states.get(e)) is None
               or s.state in (STATE_UNAVAILABLE, STATE_UNKNOWN)]
        if self._dlugo("czujnik", bool(zle), CZUJNIK_PO):
            self.zglos("czujnik", {"lista": ", ".join(zle)})
        elif not zle:
            self.minal("czujnik")

        if self.brama:
            stany = [self.hass.states.get(e) for e in self.rolety]
            otwarta = any(s and s.state not in (STATE_CLOSED, STATE_UNAVAILABLE, STATE_UNKNOWN) for s in stany)
            if self._dlugo("brama_otwarta", otwarta, timedelta(minutes=self.brama_min)):
                self.zglos("brama_otwarta", {"minuty": round(self.brama_min)})
            elif not otwarta:
                self.minal("brama_otwarta")
                self.minal("brama_niedomknieta")
            if self.foto:
                s = self.hass.states.get(self.foto)
                if s is not None and s.state == self.foto_stan:
                    self.zglos("przeszkoda")
                else:
                    self.minal("przeszkoda")

    # --- po ruchu zleconym przez Motor HA ---

    @callback
    def po_ruchu(self, cel: int, _ctx: str) -> None:
        if "nie_dojechala" not in self.wlaczone and not self.brama:
            return

        async def _sprawdz_cel(_now: datetime) -> None:
            akt = self.aktualna()
            if akt is not None and abs(akt - cel) > 5:
                if self.brama and cel == 0:
                    self.zglos("brama_niedomknieta")
                else:
                    self.zglos("nie_dojechala", {"cel": cel, "jest": akt})
            else:
                self.minal("nie_dojechala")

        async_call_later(self.hass, self.czas * 1.5 + 20, _sprawdz_cel)

