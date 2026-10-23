"""Obrazki do wyboru w kreatorze: rodzaje osłon (mały rysunek każdej) i palety kolorów tkaniny i ramy.

HA pokazuje w liście wyboru tylko tekst, więc nad polem jest obrazek SVG z kafelkami. Karta w przeglądarce
(karta/src/kreator.js) robi z kafelków przyciski: dotknięcie wybiera tę pozycję w polu poniżej.
"""

from __future__ import annotations

from base64 import b64encode
from html import escape

from homeassistant.core import HomeAssistant
from homeassistant.helpers.translation import async_get_translations

from .const import DOMAIN, KOLORY, RAMY

GLOWNY = "#009ac7"
AKCENT = "#ff9800"
SZARY = "#8c8c8c"
NIEBO = "#bfe0f5"
RAMA = "#f4f4f2"
TKANINA = "#6b7380"


def _okno(x: float, y: float) -> str:
    return (f'<rect x="{x + 10}" y="{y + 8}" width="44" height="50" rx="2" fill="{NIEBO}" stroke="{SZARY}" stroke-width="1.2"/>'
            f'<line x1="{x + 32}" y1="{y + 8}" x2="{x + 32}" y2="{y + 58}" stroke="{SZARY}" stroke-width="1"/>')


def _paski(x0: float, y0: float, x1: float, y1: float, krok: float, kolor: str, grubosc: float) -> str:
    out, y = [], y0
    while y <= y1:
        out.append(f'<line x1="{x0}" y1="{y:.1f}" x2="{x1}" y2="{y:.1f}" stroke="{kolor}" stroke-width="{grubosc}"/>')
        y += krok
    return "".join(out)


def rysunek(typ: str, x: float, y: float) -> str:
    """Rysunek 64×60 osłony danego rodzaju w punkcie (x, y)."""
    o = _okno(x, y)
    L, P, G, D = x + 11, x + 53, y + 9, y + 57      # wnętrze okna
    if typ in ("pelna", "kasetowa", "zaciemniajaca", "screen"):
        kolor = "#2d3036" if typ == "zaciemniajaca" else "#8a9099" if typ == "screen" else TKANINA
        szyba = f'<rect x="{L}" y="{G}" width="{P - L}" height="30" fill="{kolor}" opacity="{0.6 if typ == "screen" else 1}"/>'
        dol = f'<rect x="{L}" y="{G + 30}" width="{P - L}" height="2.5" fill="#444"/>'
        gora = f'<rect x="{x + 8}" y="{y + 3}" width="48" height="7" rx="2" fill="#d6d6d6" stroke="{SZARY}"/>' \
            if typ in ("kasetowa", "screen") else f'<rect x="{x + 9}" y="{y + 5}" width="46" height="4" rx="2" fill="#bbb"/>'
        return o + szyba + dol + gora
    if typ == "zebra":
        pasy = "".join(f'<rect x="{L}" y="{G + i * 6}" width="{P - L}" height="3.2" fill="{TKANINA}"/>' for i in range(6))
        pasy += "".join(f'<rect x="{L}" y="{G + i * 6 + 3.2}" width="{P - L}" height="2.8" fill="{TKANINA}" opacity=".3"/>'
                        for i in range(6))
        return o + pasy + f'<rect x="{L}" y="{G + 36}" width="{P - L}" height="2.5" fill="#444"/>' \
            f'<rect x="{x + 9}" y="{y + 5}" width="46" height="4" rx="2" fill="#bbb"/>'
    if typ in ("plisa", "plaster"):
        pts = " ".join(f"{L if i % 2 else P},{G + i * 3.4:.1f}" for i in range(10))
        dod = _paski(L, G + 1.7, P, G + 31, 6.8, "#ffffff", 0.6) if typ == "plaster" else ""
        return o + f'<rect x="{L}" y="{G}" width="{P - L}" height="31" fill="#d9cdb8"/>' \
            f'<polyline points="{pts}" fill="none" stroke="#a8977a" stroke-width="1"/>{dod}' \
            f'<rect x="{L}" y="{G + 31}" width="{P - L}" height="2.5" fill="#777"/>'
    if typ == "rzymska":
        fale = "".join(f'<path d="M{L} {G + 18 + i * 5} Q{(L + P) / 2} {G + 23 + i * 5} {P} {G + 18 + i * 5}" '
                       f'fill="none" stroke="#7a6a55" stroke-width="1.2"/>' for i in range(3))
        return o + f'<rect x="{L}" y="{G}" width="{P - L}" height="32" fill="#c9b79a"/>{fale}'
    if typ in ("zaluzja", "drewniana"):
        kolor = "#9a6a42" if typ == "drewniana" else "#c4c6c8"
        return o + _paski(L, G + 2, P, D - 2, 3.6, kolor, 2.4) + \
            f'<line x1="{L + 10}" y1="{G}" x2="{L + 10}" y2="{D}" stroke="#666" stroke-width=".6"/>' \
            f'<line x1="{P - 10}" y1="{G}" x2="{P - 10}" y2="{D}" stroke="#666" stroke-width=".6"/>'
    if typ == "pionowa":
        return o + "".join(f'<rect x="{L + 1 + i * 5.2:.1f}" y="{G}" width="3.6" height="{D - G}" fill="#d9d4c7" '
                           f'stroke="#a8a294" stroke-width=".5"/>' for i in range(8)) + \
            f'<rect x="{x + 9}" y="{y + 5}" width="46" height="4" rx="1" fill="#bbb"/>'
    if typ == "zaslona":
        return o + f'<rect x="{x + 6}" y="{y + 4}" width="52" height="2.5" fill="#888"/>' \
            f'<path d="M{x + 7} {y + 6} H{x + 22} Q{x + 18} {y + 34} {x + 20} {y + 60} H{x + 7} Z" fill="#b5473a"/>' \
            f'<path d="M{x + 57} {y + 6} H{x + 42} Q{x + 46} {y + 34} {x + 44} {y + 60} H{x + 57} Z" fill="#b5473a"/>'
    if typ in ("natynkowa", "podtynkowa", "zewnetrzna", "perforowana"):
        pancerz = _paski(L, G + 2, P, G + 34, 3.4, "#7c838c", 2.6)
        if typ == "perforowana":
            pancerz += "".join(f'<circle cx="{L + 3 + i * 5}" cy="{G + 4 + j * 6.8}" r=".7" fill="{NIEBO}"/>'
                               for i in range(9) for j in range(5))
        kaseta = "" if typ == "podtynkowa" else \
            f'<rect x="{x + 7}" y="{y + 1}" width="50" height="9" rx="1.5" fill="#9ca3ab" stroke="{SZARY}"/>'
        prow = f'<rect x="{x + 8}" y="{y + 8}" width="2.5" height="50" fill="#9ca3ab"/>' \
            f'<rect x="{x + 53.5}" y="{y + 8}" width="2.5" height="50" fill="#9ca3ab"/>' if typ == "zewnetrzna" else ""
        return o + pancerz + kaseta + prow
    if typ in ("fasadowa", "fasadowaz"):
        lamele = "".join(
            (f'<path d="M{L} {G + 2 + i * 5} l{P - L} 0 l0 2.4 l-{P - L} 0 z" fill="#8c939b"/>' if typ == "fasadowa" else
             f'<path d="M{L} {G + 2 + i * 5} l{P - L} 0 l-1.5 2.8 l-{P - L - 3} 0 z" fill="#8c939b"/>') for i in range(8))
        return o + lamele + f'<rect x="{x + 8}" y="{y + 4}" width="48" height="5" fill="#9ca3ab"/>'
    if typ == "markiza":
        return f'<rect x="{x + 6}" y="{y + 30}" width="52" height="28" fill="#e9e3d8" stroke="{SZARY}"/>' \
            f'<rect x="{x + 22}" y="{y + 38}" width="20" height="20" fill="{NIEBO}" stroke="{SZARY}"/>' \
            f'<path d="M{x + 6} {y + 12} H{x + 58} L{x + 62} {y + 28} H{x + 2} Z" fill="#c0392b"/>' \
            + "".join(f'<path d="M{x + 2 + i * 10} {y + 28} h5 l-2.5 4 z" fill="#c0392b"/>' for i in range(6)) \
            + "".join(f'<line x1="{x + 10 + i * 11}" y1="{y + 12}" x2="{x + 7 + i * 12}" y2="{y + 28}" stroke="#fff" '
                      f'stroke-width="2.4"/>' for i in range(5))
    if typ == "przesuwna":
        return f'<line x1="{x}" y1="{y + 56}" x2="{x + 64}" y2="{y + 56}" stroke="{SZARY}" stroke-width="1.5"/>' \
            f'<rect x="{x + 4}" y="{y + 22}" width="46" height="32" fill="none" stroke="#555" stroke-width="2"/>' \
            + "".join(f'<line x1="{x + 9 + i * 6}" y1="{y + 22}" x2="{x + 9 + i * 6}" y2="{y + 54}" stroke="#555" '
                      f'stroke-width="1.4"/>' for i in range(7)) \
            + f'<path d="M{x + 54} {y + 38} h8 m-3 -3 l3 3 l-3 3" fill="none" stroke="{GLOWNY}" stroke-width="1.6"/>'
    if typ == "skrzydlowa":
        return f'<line x1="{x}" y1="{y + 56}" x2="{x + 64}" y2="{y + 56}" stroke="{SZARY}" stroke-width="1.5"/>' \
            f'<path d="M{x + 6} {y + 24} Q{x + 19} {y + 18} {x + 31} {y + 22} V{y + 54} H{x + 6} Z" fill="none" stroke="#555" stroke-width="2"/>' \
            f'<path d="M{x + 33} {y + 22} Q{x + 45} {y + 18} {x + 58} {y + 24} V{y + 54} H{x + 33} Z" fill="none" stroke="#555" stroke-width="2"/>' \
            + "".join(f'<line x1="{x + 11 + i * 5}" y1="{y + 22}" x2="{x + 11 + i * 5}" y2="{y + 54}" stroke="#555" stroke-width="1"/>'
                      for i in range(10) if i != 4)
    if typ in ("segmentowa", "uchylna", "roletowa"):
        dom = f'<path d="M{x + 4} {y + 22} L{x + 32} {y + 6} L{x + 60} {y + 22} V{y + 58} H{x + 4} Z" fill="#e9e3d8" stroke="{SZARY}"/>'
        brama = f'<rect x="{x + 13}" y="{y + 28}" width="38" height="30" fill="#b8bec5" stroke="#777"/>'
        if typ == "segmentowa":
            brama += _paski(x + 13, y + 35, x + 51, y + 52, 7.5, "#777", 1)
        elif typ == "roletowa":
            brama += _paski(x + 13, y + 31, x + 51, y + 56, 2.5, "#888", .8)
        return dom + brama
    return o


def _podpis(tekst: str, cx: float, y: float, kolor: str, waga: int, szer: float = 80) -> str:
    """Podpis pod kafelkiem, w razie potrzeby w dwóch wierszach."""
    slowa, wiersze = tekst.split(), [""]
    for s in slowa:
        if wiersze[-1] and (len(wiersze[-1]) + 1 + len(s)) * 5.6 > szer:
            wiersze.append(s)
        else:
            wiersze[-1] = f"{wiersze[-1]} {s}".strip()
    # za długie słowo ściśnięte do szerokości kafelka (nic nie wychodzi poza kafelek)
    return "".join(f'<text x="{cx}" y="{y + i * 12}" text-anchor="middle" font-size="10.5" font-weight="{waga}" '
                   + (f'textLength="{szer:.0f}" lengthAdjust="spacingAndGlyphs" ' if len(w) * 5.6 > szer else "")
                   + f'fill="{kolor}">{escape(w)}</text>' for i, w in enumerate(wiersze[:2]))


def svg(pole: str, opcje: list[str], wybrany: str | None, nazwy: dict[str, str], rodzaj: str = "rysunek") -> str:
    """Kafelki: rysunek osłony albo próbka koloru i podpis; wybrany w ramce koloru akcentu (data-on – karta ją przenosi)."""
    kol, w, h = (4, 88, 96) if rodzaj == "rysunek" else (5, 70, 68)
    wiersze = (len(opcje) + kol - 1) // kol
    szer, wys = kol * w, wiersze * h
    czesci = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{szer}" height="{wys}" viewBox="0 0 {szer} {wys}" '
              f'data-motor-ha-wybor="{pole}" data-opcje="{",".join(opcje)}" data-kol="{kol}" data-w="{w}" data-h="{h}" '
              'font-family="Roboto, Noto Sans, sans-serif">']
    for i, k in enumerate(opcje):
        x, y = (i % kol) * w, (i // kol) * h
        czesci.append(f'<rect x="{x + 2}" y="{y + 2}" width="{w - 4}" height="{h - 4}" rx="10" fill="{SZARY}" fill-opacity=".1"/>')
        if k == wybrany:
            czesci.append(f'<rect data-on="1" x="{x + 2}" y="{y + 2}" width="{w - 4}" height="{h - 4}" rx="10" '
                          f'fill="{GLOWNY}" fill-opacity=".14" stroke="{AKCENT}" stroke-width="3"/>')
        if rodzaj == "rysunek":
            czesci.append(rysunek(k, x + (w - 64) / 2, y + 4))
            czesci.append(_podpis(nazwy.get(k, k), x + w / 2, y + 76, SZARY, 500, w - 8))
        else:
            hexy = KOLORY.get(k) or RAMY.get(k) or "#888"
            czesci.append(f'<circle cx="{x + w / 2}" cy="{y + 23}" r="16" fill="{hexy}" stroke="{SZARY}" stroke-width="1"/>')
            czesci.append(_podpis(nazwy.get(k, k), x + w / 2, y + 52, SZARY, 500, w - 8))
    czesci.append("</svg>")
    return "".join(czesci)


async def async_obrazek(hass: HomeAssistant, krok: str, pole: str, opcje: list[str], wybrany: str | None, klucz: str,
                        rodzaj: str = "rysunek") -> str:
    """Markdown z obrazkiem (data:) do opisu kroku, z nazwą pola nad nim; klucz = selektor z nazwami opcji."""
    t = await async_get_translations(hass, hass.config.language, "selector", {DOMAIN})
    nazwy = {k: t.get(f"component.{DOMAIN}.selector.{klucz}.options.{k}", k) for k in opcje}
    c = await async_get_translations(hass, hass.config.language, "config", {DOMAIN})
    tytul = c.get(f"component.{DOMAIN}.config.step.{krok}.data.{pole}", "")
    dane = b64encode(svg(pole, opcje, wybrany, nazwy, rodzaj).encode()).decode()
    return f"\n\n**{tytul}**\n\n![](data:image/svg+xml;base64,{dane})" if tytul else \
        f"\n\n![](data:image/svg+xml;base64,{dane})"
