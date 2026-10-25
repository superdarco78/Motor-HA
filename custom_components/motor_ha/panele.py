"""Karty Motor HA same na panelu wybranym w kreatorze albo na pierwszym ekranie (panel, widok i miejsce)."""

from __future__ import annotations

import copy
import logging
from typing import Any

from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)
PRZEGLAD = "lovelace"
NIE = "nie"
NOWY = "nowy"   # widok „Okna” dodany przez Motor HA
KARTA = "custom:motor-ha"
KARTA_DOM = "custom:motor-ha-dom"
USLUGA = "motor_ha.wszystkie"   # skróty dla całego domu
SCIEZKA = "motor-ha"
MIEJSCA = ("sekcja", "gora", "pokoj")
NAPISY = {
    "pl": {"widok": "Okna", "zaslon": "Zasłoń wszystko", "odslon": "Odsłoń wszystko", "pauza": "Pauza automatyki 2 h"},
    "en": {"widok": "Windows", "zaslon": "Close all", "odslon": "Open all", "pauza": "Pause automation 2 h"},
}


def _panele(hass: HomeAssistant) -> dict:
    return getattr(hass.data.get("lovelace"), "dashboards", None) or {}


def _napisy(hass: HomeAssistant) -> dict[str, str]:
    return NAPISY.get(hass.config.language.split("-")[0], NAPISY["en"])


async def _wczytaj(panel: Any) -> dict | None:
    """Tylko panele zapisywane z UI – panele w YAML i automatyczny „Przegląd” zostają nietknięte."""
    if getattr(panel, "mode", None) != "storage":
        return None
    try:
        return await panel.async_load(False)
    except Exception:  # noqa: BLE001 – panel jeszcze nie edytowany
        return None


async def async_lista(hass: HomeAssistant, widoki: bool = False) -> tuple[list, str]:
    """Panele, na które można dodać kartę, i propozycja: ten z kartami Motor HA albo pierwszy.
    widoki=True – każdy panel z listą widoków: (klucz, tytuł, [tytuły widoków])."""
    lista: list = []
    z_karta = None
    for url, panel in _panele(hass).items():
        if url == "map" or (cfg := await _wczytaj(panel)) is None:
            continue
        klucz = url or PRZEGLAD
        tytul = ((getattr(panel, "config", None) or {}).get("title") if url else None) or cfg.get("title") or url or "Overview"
        if widoki:
            lista.append((klucz, tytul, [str(v.get("title") or v.get("path") or i + 1)
                                         for i, v in enumerate(cfg.get("views") or [])]))
        else:
            lista.append((klucz, tytul))
        if z_karta is None and KARTA in str(cfg):
            z_karta = klucz
    return lista, z_karta or (lista[0][0] if lista else NIE)


def _nasza(sekcja: dict) -> bool:
    return KARTA in str(sekcja) or USLUGA in str(sekcja) \
        or any(c.get("heading") == "Motor HA" for c in sekcja.get("cards") or [] if isinstance(c, dict))


def _widok(cfg: dict, widok: Any, napisy: dict[str, str]) -> dict:
    widoki = cfg.setdefault("views", [])
    if widok == NOWY:
        if (v := next((v for v in widoki if v.get("path") == SCIEZKA), None)) is None:
            v = {"title": napisy["widok"], "path": SCIEZKA, "icon": "mdi:window-shutter", "type": "sections", "sections": []}
            widoki.append(v)
        return v
    if not widoki:
        widoki.append({"title": "Motor HA", "path": SCIEZKA, "type": "sections", "sections": []})
    nr = widok if isinstance(widok, int) and 0 <= widok < len(widoki) else 0
    return widoki[nr]


def _sekcje(widok: dict) -> list | None:
    if widok.get("type") == "sections" or "sections" in widok:
        return widok.setdefault("sections", [])
    return None


def _cel(widok: dict, miejsce: str, pokoj: str | None) -> list:
    """Lista kart, do której trafi nowa karta: sekcja pokoju, sekcja „Motor HA” (na końcu albo na górze)
    albo – w zwykłym widoku bez sekcji – sam widok."""
    sekcje = _sekcje(widok)
    if sekcje is None:
        return widok.setdefault("cards", [])
    if miejsce == "pokoj" and pokoj:
        for s in sekcje:
            naglowki = [c.get("heading") for c in s.get("cards") or [] if isinstance(c, dict) and c.get("type") == "heading"]
            if any(str(n or "").strip().lower() == pokoj.strip().lower() for n in naglowki):
                return s.setdefault("cards", [])
    if (s := next((s for s in sekcje if _nasza(s)), None)) is None:
        s = {"type": "grid", "cards": [{"type": "heading", "heading": "Motor HA", "icon": "mdi:window-shutter"}]}
        sekcje.insert(0, s) if miejsce == "gora" else sekcje.append(s)
    return s.setdefault("cards", [])


async def _zmien(hass: HomeAssistant, klucz: str, zmiana) -> bool:
    panel = _panele(hass).get(None if klucz == PRZEGLAD else klucz)
    if panel is None or (cfg := await _wczytaj(panel)) is None:
        return False
    cfg = copy.deepcopy(cfg)
    if zmiana(cfg) is False:
        return True   # już jest – nic do zapisania
    await panel.async_save(cfg)
    return True


async def async_dodaj_karte(hass: HomeAssistant, klucz: str, entity_id: str | None, widok: Any = 0,
                            miejsce: str = "sekcja", pokoj: str | None = None) -> bool:
    """Dokłada kartę okna (albo bez encji – „Motor HA – cały dom”) na wybrany widok i miejsce.
    Niczego nie usuwa ani nie przesuwa; gdy karta już jest na panelu, nic nie robi."""
    def _dodaj(cfg: dict) -> bool:
        if f"'{entity_id}'" in str(cfg) if entity_id else f"'{KARTA_DOM}'" in str(cfg):
            return False
        karta = {"type": KARTA, "entity": entity_id} if entity_id else {"type": KARTA_DOM}
        w = _widok(cfg, widok, _napisy(hass))
        cel = _cel(w, miejsce, pokoj)
        if miejsce == "gora" and _sekcje(w) is None:
            cel.insert(0, karta)
        else:
            cel.append(karta)
        return True

    ok = await _zmien(hass, klucz, _dodaj)
    if ok:
        _LOGGER.info("Motor HA: karta %s na panelu %s", entity_id or KARTA_DOM, klucz)
    return ok


async def async_dodaj_skroty(hass: HomeAssistant, klucz: str, widok: Any = 0, miejsce: str = "sekcja") -> bool:
    """Trzy przyciski dla całego domu nad kartami okien: zasłoń, odsłoń, pauza automatyki na 2 h."""
    n = _napisy(hass)
    przyciski = [{"type": "button", "name": n[a], "icon": i, "show_state": False,
                  "tap_action": {"action": "perform-action", "perform_action": USLUGA, "data": {"akcja": a}},
                  "grid_options": {"columns": 4, "rows": 2}}
                 for a, i in (("zaslon", "mdi:arrow-down-box"), ("odslon", "mdi:arrow-up-box"), ("pauza", "mdi:pause-circle"))]

    def _dodaj(cfg: dict) -> bool:
        if USLUGA in str(cfg):
            return False
        w = _widok(cfg, widok, n)
        if _sekcje(w) is None:
            w.setdefault("cards", []).insert(0, {"type": "horizontal-stack", "cards": przyciski})
            return True
        cel = _cel(w, "gora" if miejsce == "gora" else "sekcja", None)
        nr = 1 if cel and isinstance(cel[0], dict) and cel[0].get("type") == "heading" else 0
        cel[nr:nr] = przyciski
        return True

    return await _zmien(hass, klucz, _dodaj)
