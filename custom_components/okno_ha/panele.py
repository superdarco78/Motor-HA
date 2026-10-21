"""Karta okna sama na panelu – ten, który wybrano w kreatorze („Dodaj kartę na panel”)."""

from __future__ import annotations

import copy
import logging
from typing import Any

from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)
DOMYSLNY = "lovelace"   # panel „Przegląd”
NIE = "nie"
KARTA = "custom:okno-ha"


def _panele(hass: HomeAssistant) -> dict:
    dane = hass.data.get("lovelace")
    return getattr(dane, "dashboards", None) or {}


async def _wczytaj(panel: Any) -> dict | None:
    """Zapisany panel (tryb UI). Panel YAML albo „Przegląd” tworzony automatycznie → None (nie ruszamy go)."""
    if getattr(panel, "mode", None) != "storage":
        return None
    try:
        return await panel.async_load(False)
    except Exception:  # noqa: BLE001 – ConfigNotFound: panel jeszcze nie edytowany
        return None


def _ma_karte(cfg: dict) -> bool:
    return KARTA in str(cfg)


async def async_lista(hass: HomeAssistant) -> tuple[list[tuple[str, str]], str]:
    """[(klucz, nazwa)] paneli, na które można dodać kartę, i propozycja: panel z oknami albo pierwszy."""
    lista, z_oknem = [], None
    for url, panel in _panele(hass).items():
        if url == "map" or (cfg := await _wczytaj(panel)) is None:
            continue
        klucz = url or DOMYSLNY
        nazwa = ((getattr(panel, "config", None) or {}).get("title") if url else None) or cfg.get("title") or ("Przegląd" if not url else url)
        lista.append((klucz, nazwa))
        if z_oknem is None and _ma_karte(cfg):
            z_oknem = klucz
    return lista, z_oknem or (lista[0][0] if lista else NIE)


async def async_dodaj_karte(hass: HomeAssistant, klucz: str, entity_id: str) -> bool:
    """Dokłada kartę okna do pierwszego widoku panelu. Nic nie usuwa; gdy karta już jest – nic nie robi."""
    panel = _panele(hass).get(None if klucz == DOMYSLNY else klucz)
    if panel is None or (cfg := await _wczytaj(panel)) is None:
        return False
    cfg = copy.deepcopy(cfg)
    if f"'{entity_id}'" in str(cfg):
        return True
    karta = {"type": KARTA, "entity": entity_id}
    widoki = cfg.setdefault("views", [])
    if not widoki:
        widoki.append({"title": "Okna", "path": "okna", "type": "sections", "sections": []})
    widok = widoki[0]
    if widok.get("type") == "sections" or "sections" in widok:
        sekcje = widok.setdefault("sections", [])
        sekcja = next((s for s in sekcje if _ma_karte(s)), None)
        if sekcja is None:
            sekcja = {"type": "grid", "cards": [{"type": "heading", "heading": "🪟 Okna"}]}
            sekcje.append(sekcja)
        sekcja.setdefault("cards", []).append(karta)
    else:
        widok.setdefault("cards", []).append(karta)
    await panel.async_save(cfg)
    _LOGGER.info("Okno HA: karta %s dodana na panel %s", entity_id, klucz)
    return True
