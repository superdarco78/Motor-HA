"""Przejście z Motor HA 1.x (domena okno_ha) na 2.0 (motor_ha): okna przenoszą się same.

Stary wpis zostaje, tylko wyłączony (można go włączyć z powrotem albo usunąć). Jego encje dostają
końcówkę „_1x”, żeby nowe urządzenie miało te same nazwy encji co wcześniej.
"""

from __future__ import annotations

import logging

from homeassistant.config_entries import SOURCE_IMPORT, ConfigEntryDisabler
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr, entity_registry as er, issue_registry as ir

from .const import CONF_POKOJ, DOMAIN, DOMYSLNE, MAM, PODSTAWOWY, TRYB

_LOGGER = logging.getLogger(__name__)
STARA = "okno_ha"
Z_1X = "z_okno_ha"          # w opcjach nowego wpisu: id starego wpisu (żeby nie przenieść dwa razy)
PRZENIESIONE = "przeniesione"
KLUCZE_1X = ("rolety", "skrzydla", "czujnik_lewe", "czujnik_prawe", "tryb_lewe", "tryb_prawe", "predkosc_lewa",
             "predkosc_prawa", "czas", "pogoda", "oslona", "kolor", "rama", "wysokosc", "kolor_wlasny", "rama_wlasna")


def opcje_z_1x(stare: dict) -> dict:
    """Ustawienia okna z 1.x → 2.0. Automatyka zostaje wyłączona, jak w każdym nowym urządzeniu."""
    o = dict(DOMYSLNE)
    o.update({k: v for k, v in stare.items() if k in KLUCZE_1X and v not in (None, "")})
    mam = []
    if o.get("czujnik_lewe") or o.get("czujnik_prawe"):
        mam.append("okno")
    if o.get("pogoda"):
        mam.append("pogoda")
    o[TRYB] = PODSTAWOWY
    o[MAM] = mam
    return o


async def async_przenies(hass: HomeAssistant) -> int:
    stare = [e for e in hass.config_entries.async_entries(STARA) if e.disabled_by is None]
    juz = {e.options.get(Z_1X) for e in hass.config_entries.async_entries(DOMAIN)}
    rej_e, rej_u = er.async_get(hass), dr.async_get(hass)
    ile = 0
    for e in stare:
        if e.entry_id in juz:
            continue
        o = opcje_z_1x(dict(e.options))
        o[Z_1X] = e.entry_id
        pokoj = next((u.area_id for u in dr.async_entries_for_config_entry(rej_u, e.entry_id) if u.area_id), None)
        if pokoj:
            o[CONF_POKOJ] = pokoj
        try:
            await hass.config_entries.async_set_disabled_by(e.entry_id, ConfigEntryDisabler.USER)
            for w in er.async_entries_for_config_entry(rej_e, e.entry_id):
                nowe = f"{w.entity_id}_1x"
                if rej_e.async_get(nowe) is None:
                    rej_e.async_update_entity(w.entity_id, new_entity_id=nowe)
            await hass.config_entries.flow.async_init(
                DOMAIN, context={"source": SOURCE_IMPORT}, data={"tytul": e.title, "opcje": o})
            ile += 1
        except Exception:  # noqa: BLE001 – jedno okno nie może zatrzymać reszty
            _LOGGER.exception("Motor HA: nie przeniosłem okna „%s” z wersji 1.x", e.title)
    if ile:
        ir.async_create_issue(hass, DOMAIN, PRZENIESIONE, is_fixable=False, is_persistent=True,
                              severity=ir.IssueSeverity.WARNING, translation_key=PRZENIESIONE,
                              translation_placeholders={"ile": str(ile)})
    return ile
