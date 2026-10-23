"""Układ okna: kolumny i pola (do 4 × 3), każde pole z własnym silnikiem i czujnikiem okna.

W opcjach urządzenia:
- ``uklad``: ``{"kol": [{"w": 1, "r": [0.3, 0.7], "dol": 0}, ...]}`` – kolumny od lewej, ``w`` – względna szerokość,
  ``r`` – względne wysokości pól od góry, ``dol`` – puste miejsce pod oknem (0–0.6, np. okno nad kaloryferem),
- ``pola``: ``[{"silnik": "cover.x", "czujnik": "binary_sensor.y", "tryb": "uchyl"}, ...]`` w kolejności pól
  (kolumnami od lewej, w kolumnie od góry).

Starsze urządzenia (1 albo 2 skrzydła, czujnik_lewe/prawe) działają dalej – brak ``uklad`` = jedno albo dwa skrzydła.
"""

from __future__ import annotations

from typing import Any

from .const import (
    CONF_CZUJNIK_LEWE,
    CONF_CZUJNIK_PRAWE,
    CONF_ROLETY,
    CONF_SKRZYDLA,
    CONF_TRYB_LEWE,
    CONF_TRYB_PRAWE,
)

CONF_UKLAD = "uklad"
CONF_POLA = "pola"
MAX_KOLUMN = 4
MAX_W_KOLUMNIE = 3
MAX_POL = MAX_KOLUMN * MAX_W_KOLUMNIE


def _liczba(v: Any, d: float, mn: float, mx: float) -> float:
    try:
        x = float(v)
    except (TypeError, ValueError):
        return d
    return min(mx, max(mn, x))


def popraw(uklad: Any) -> dict[str, Any] | None:
    """Układ z kreatora po sprawdzeniu: najwyżej 4 kolumny po 3 pola, rozsądne liczby; zły = None."""
    if not isinstance(uklad, dict) or not isinstance(uklad.get("kol"), list) or not uklad["kol"]:
        return None
    kol = []
    for k in uklad["kol"][:MAX_KOLUMN]:
        if not isinstance(k, dict):
            return None
        r = [_liczba(h, 1, 0.02, 100) for h in (k.get("r") or [1])][:MAX_W_KOLUMNIE] or [1.0]
        bel = [_liczba(b, 0, 0, 50) for b in (k.get("bel") or [])][:len(r) - 1]
        kol.append({"w": _liczba(k.get("w"), 1, 0.02, 100), "r": r, "dol": _liczba(k.get("dol"), 0, 0, 0.6),
                    "mur": _liczba(k.get("mur"), 0, 0, 50), "bel": bel + [0.0] * (len(r) - 1 - len(bel))})
    kol[-1]["mur"] = 0.0   # mur (odstęp ściany) tylko między oknami, nie za ostatnim
    return {"kol": kol}


def domyslny(ile: int) -> dict[str, Any]:
    """Układ dla starszych urządzeń: jedno skrzydło albo dwa obok siebie."""
    return {"kol": [{"w": 1, "r": [1], "dol": 0} for _ in range(max(1, min(MAX_KOLUMN, ile)))]}


def uklad(o: dict[str, Any]) -> dict[str, Any]:
    if u := popraw(o.get(CONF_UKLAD)):
        return u
    return domyslny(1 if str(o.get(CONF_SKRZYDLA, "2")) == "1" else 2)


def prostokaty(u: dict[str, Any]) -> list[tuple[float, float, float, float]]:
    """Pola jako (x, y, szer., wys.) w ułamkach całego okna."""
    # mur: kawałek ściany za kolumną, w tych samych jednostkach co szerokość kolumny
    suma = sum(k["w"] + k.get("mur", 0) for k in u["kol"][:-1]) + u["kol"][-1]["w"] or 1
    wynik, x = [], 0.0
    for k in u["kol"]:
        bel = list(k.get("bel") or [])   # belki (poziome odstępy) pod polami, w jednostkach wysokości pól
        w, wys, sr, y = k["w"] / suma, 1 - k["dol"], (sum(k["r"]) + sum(bel[:len(k["r"]) - 1])) or 1, 0.0
        for j, h in enumerate(k["r"]):
            hh = h / sr * wys
            wynik.append((round(x, 4), round(y, 4), round(w, 4), round(hh, 4)))
            y += hh + (bel[j] / sr * wys if j < len(bel) else 0)
        x += w + k.get("mur", 0) / suma
    return wynik


def pola(o: dict[str, Any]) -> list[dict[str, Any]]:
    """Pola okna z silnikiem, czujnikiem i trybem; starsze ustawienia przepisane na pola."""
    ile = len(prostokaty(uklad(o)))
    rolety = list(o.get(CONF_ROLETY) or [])
    zapis = o.get(CONF_POLA)
    if isinstance(zapis, list) and zapis:
        wynik = [dict(p) if isinstance(p, dict) else {} for p in zapis[:ile]]
    else:
        wynik = [{"czujnik": o.get(CONF_CZUJNIK_LEWE), "tryb": o.get(CONF_TRYB_LEWE, "uchyl")},
                 {"czujnik": o.get(CONF_CZUJNIK_PRAWE), "tryb": o.get(CONF_TRYB_PRAWE, "uchyl")}][:ile]
        for i, p in enumerate(wynik):
            if rolety:
                p["silnik"] = rolety[min(i, len(rolety) - 1)]
    wynik += [{} for _ in range(ile - len(wynik))]
    for p in wynik:
        p.setdefault("tryb", "uchyl")
        if not p.get("silnik") and rolety:
            p["silnik"] = rolety[0]
    return wynik


def czujniki_okna(o: dict[str, Any]) -> list[tuple[str, str]]:
    """(czujnik, tryb) wszystkich pól, bez powtórzeń."""
    wynik: dict[str, str] = {}
    for p in pola(o):
        if (c := p.get("czujnik")) and c not in wynik:
            wynik[c] = p.get("tryb") or "uchyl"
    return list(wynik.items())


def silniki(o: dict[str, Any]) -> list[str]:
    """Silniki z pól (bez powtórzeń, w kolejności) – to są „rolety” urządzenia."""
    wynik: list[str] = []
    for p in pola(o):
        if (s := p.get("silnik")) and s not in wynik:
            wynik.append(s)
    return wynik or list(o.get(CONF_ROLETY) or [])
