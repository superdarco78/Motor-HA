"""Pomiar czasu przejazdu: góra → dół (mierzone) → góra (mierzone).

Ten sam pomiar robi przycisk „Kalibruj” urządzenia i krok „Czas” w kreatorze (jeszcze przed zapisaniem urządzenia).
"""

from __future__ import annotations

import asyncio
from time import monotonic
from typing import Any

from homeassistant.components.cover import ATTR_CURRENT_POSITION
from homeassistant.const import (
    ATTR_ENTITY_ID,
    STATE_CLOSED,
    STATE_CLOSING,
    STATE_OPENING,
    STATE_UNAVAILABLE,
    STATE_UNKNOWN,
)
from homeassistant.core import Context, HomeAssistant

KALIBRACJA_MAKS = 240   # s na jeden przejazd
MIN_PRZEJAZD = 5        # s – krótszy „pełny przejazd” to meldunek celu zaraz po ruszeniu, nie pomiar


def poz(s: Any) -> float:
    p = s.attributes.get(ATTR_CURRENT_POSITION)
    return p if isinstance(p, (int, float)) else 0 if s.state == STATE_CLOSED else 100


def nazwa(hass: HomeAssistant, encja: str) -> str:
    s = hass.states.get(encja)
    return str(s.attributes.get("friendly_name") or encja) if s else encja


def czas_z_predkosci(hass: HomeAssistant, predkosci: list[str | None]) -> float | None:
    """Czas przejazdu z prędkości silnika (obr/min) – ten sam wzór co w karcie."""
    czasy = []
    for e in predkosci:
        if e and (s := hass.states.get(e)):
            try:
                obroty = float(s.state)
            except ValueError:
                continue
            if obroty > 0:
                czasy.append(20.2 + 394 / obroty)
    return round(max(czasy), 1) if czasy else None


class Pomiar:
    """Trzy przejazdy wszystkich silników naraz; każdy silnik śledzony osobno."""

    def __init__(self, hass: HomeAssistant, rolety: list[str], predkosci: list[str | None] | None = None,
                 context: Context | None = None) -> None:
        self.hass = hass
        self.rolety = list(rolety)
        self.predkosci = list(predkosci or [])
        self.context = context
        self.czasy: dict[str, float] = {}   # czas każdego silnika osobno (średnia z przejazdów po pierwszym)
        self._ostatnie: dict[str, float] = {}

    async def _jedz(self, usluga: str, cel: int, pierwszy: bool) -> tuple[float | None, list[str], float]:
        """Jeden przejazd; zwraca (czas, osłony bez odpowiedzi, start)."""
        przed = {e: (s.last_updated if (s := self.hass.states.get(e)) else None) for e in self.rolety}
        t0 = monotonic()
        await self.hass.services.async_call("cover", usluga, {ATTR_ENTITY_ID: self.rolety}, blocking=True,
                                            context=self.context)
        dojechala: dict[str, float] = {}
        odezwala: set[str] = set()
        jechala: set[str] = set()
        while (el := monotonic() - t0) < KALIBRACJA_MAKS:
            await asyncio.sleep(0.5)
            for e in self.rolety:
                s = self.hass.states.get(e)
                if e in dojechala or not s or s.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
                    continue
                if s.last_updated != przed[e]:
                    odezwala.add(e)
                if s.state in (STATE_OPENING, STATE_CLOSING):
                    jechala.add(e)
                    continue
                na_miejscu = abs(poz(s) - cel) <= 1
                # silniki bez „otwiera się”: Zigbee (np. Moes) zmienia stan od razu, a pozycję melduje na końcu
                if (e in jechala and el > 1) or (na_miejscu and (e in odezwala or el > (1 if pierwszy else 4))):
                    dojechala[e] = el
            if len(dojechala) == len(self.rolety):
                break
            # inne już dojechały, a ta od komendy milczy – nie czekamy pełnych KALIBRACJA_MAKS
            if dojechala and el > max(60.0, 3 * max(dojechala.values())) and \
                    all(e in dojechala or e not in odezwala for e in self.rolety):
                break
        self._ostatnie = dojechala
        brak = [e for e in self.rolety if e not in dojechala]
        return (max(dojechala.values()) if dojechala and not brak else None), brak, t0

    async def _czas_od_razu(self, t0: float) -> float | None:
        """Silnik zameldował cel zaraz po ruszeniu: czas z prędkości albo z pierwszego meldunku po zatrzymaniu."""
        if czas := czas_z_predkosci(self.hass, self.predkosci):
            await asyncio.sleep(max(0.0, czas - (monotonic() - t0)))   # niech naprawdę dojedzie przed kolejnym przejazdem
            return czas
        przed = {e: (s.last_updated if (s := self.hass.states.get(e)) else None) for e in self.rolety}
        ostatni = None
        while monotonic() - t0 < KALIBRACJA_MAKS:
            await asyncio.sleep(0.5)
            nowe = [e for e in self.rolety if (s := self.hass.states.get(e)) and s.last_updated != przed[e]]
            if nowe:
                ostatni = monotonic() - t0
                przed.update({e: self.hass.states.get(e).last_updated for e in nowe})
            elif ostatni is not None and monotonic() - t0 - ostatni > 5:
                break
        return round(ostatni, 1) if ostatni and ostatni >= MIN_PRZEJAZD else None

    async def async_zmierz(self) -> tuple[float | None, str, dict[str, Any]]:
        """(czas albo None, rodzaj wyniku do powiadomienia, dane do powiadomienia)."""
        wyniki = []
        osobno: dict[str, list[float]] = {}
        for n, (usluga, cel) in enumerate((("open_cover", 100), ("close_cover", 0), ("open_cover", 100))):
            el, brak, t0 = await self._jedz(usluga, cel, n == 0)
            if brak:
                return None, "kalibracja_brak", {"lista": ", ".join(nazwa(self.hass, e) for e in brak),
                                                  "maks": KALIBRACJA_MAKS, "brak": brak}
            if n and el is not None and el < MIN_PRZEJAZD:
                el = await self._czas_od_razu(t0)
                if el is None:
                    return None, "kalibracja_od_razu", {}
            elif n:
                for e, c in self._ostatnie.items():
                    osobno.setdefault(e, []).append(c)
            if n and el is not None:
                wyniki.append(el)
        czas = round(sum(wyniki) / len(wyniki), 1)
        self.czasy = {e: round(sum(c) / len(c), 1) for e, c in osobno.items()}
        return czas, "kalibracja_ok", {"czas": f"{czas:g}"}
