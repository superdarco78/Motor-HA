"""Karta urządzenia sama na panelu wybranym w kreatorze („Dodaj kartę na panel”)."""

from __future__ import annotations

import copy
import logging
from typing import Any

from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)
PRZEGLAD = "lovelace"
NIE = "nie"
KARTA = "custom:motor-ha"
KARTA_DOM = "custom:motor-ha-dom"


def _panele(hass: HomeAssistant) -> dict:
    return getattr(hass.data.get("lovelace"), "dashboards", None) or {}


async def _wczytaj(panel: Any) -> dict | None:
    """Tylko panele zapisywane z UI – panele w YAML i automatyczny „Przegląd” zostają nietknięte."""
    if getattr(panel, "mode", None) != "storage":
        return None
    try:
        return await panel.async_load(False)
    except Exception:  # noqa: BLE001 – panel jeszcze nie edytowany
        return None


async def async_lista(hass: HomeAssistant) -> tuple[list[tuple[str, str]], str]:
    """Panele, na które można dodać kartę, i propozycja: ten z kartami Motor HA albo pierwszy."""
    lista: list[tuple[str, str]] = []
    z_karta = None
    for url, panel in _panele(hass).items():
        if url == "map" or (cfg := await _wczytaj(panel)) is None:
            continue
        klucz = url or PRZEGLAD
        tytul = ((getattr(panel, "config", None) or {}).get("title") if url else None) or cfg.get("title") or url or "Overview"
        lista.append((klucz, tytul))
        if z_karta is None and KARTA in str(cfg):
            z_karta = klucz
    return lista, z_karta or (lista[0][0] if lista else NIE)


async def async_dodaj_karte(hass: HomeAssistant, klucz: str, entity_id: str | None) -> bool:
    """Dokłada kartę do pierwszego widoku. Niczego nie usuwa; gdy karta już jest, nic nie robi.
    Bez encji – karta „Motor HA – cały dom”."""
    panel = _panele(hass).get(None if klucz == PRZEGLAD else klucz)
    if panel is None or (cfg := await _wczytaj(panel)) is None:
        return False
    cfg = copy.deepcopy(cfg)
    if entity_id is None:
        if f"'{KARTA_DOM}'" in str(cfg):
            return True
        karta = {"type": KARTA_DOM}
    elif f"'{entity_id}'" in str(cfg):
        return True
    else:
        karta = {"type": KARTA, "entity": entity_id}
    widoki = cfg.setdefault("views", [])
    if not widoki:
        widoki.append({"title": "Motor HA", "path": "motor-ha", "type": "sections", "sections": []})
    widok = widoki[0]
    if widok.get("type") == "sections" or "sections" in widok:
        sekcje = widok.setdefault("sections", [])
        sekcja = next((s for s in sekcje if KARTA in str(s)), None)
        if sekcja is None:
            sekcja = {"type": "grid", "cards": [{"type": "heading", "heading": "Motor HA", "icon": "mdi:window-shutter"}]}
            sekcje.append(sekcja)
        sekcja.setdefault("cards", []).append(karta)
    else:
        widok.setdefault("cards", []).append(karta)
    await panel.async_save(cfg)
    _LOGGER.info("Motor HA: karta %s dodana na panel %s", entity_id or KARTA_DOM, klucz)
    return True
