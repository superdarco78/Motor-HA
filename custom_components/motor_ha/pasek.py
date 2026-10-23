"""Pasek kroków kreatora jako obrazek SVG: /motor_ha/pasek.svg?k=mam,urzadzenie,...&a=2&j=pl

Kreator ma różną liczbę kroków (zależnie od tego, co jest w domu), więc pasek rysuje się na bieżąco.
Jeden pasek, bez drugiego w środku zrzutu. Kolory jak w domyślnym motywie HA, tło przezroczyste.
"""

from __future__ import annotations

from base64 import b64encode
import json
from html import escape

from aiohttp import web

from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant
from homeassistant.helpers.translation import async_get_translations

from .const import DOMAIN

IKONY = {
    "tryb": "M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z",
    "mam": "M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M7.5,13.5L9,12L11,14L15.5,9.5L17,11L11,17L7.5,13.5Z",
    "urzadzenie": "M21.7 18.6V17.6L22.8 16.8C22.9 16.7 23 16.6 22.9 16.5L21.9 14.8C21.9 14.7 21.7 14.7 21.6 14.7L20.4 15.2C20.1 15 19.8 14.8 19.5 14.7L19.3 13.4C19.3 13.3 19.2 13.2 19.1 13.2H17.1C16.9 13.2 16.8 13.3 16.8 13.4L16.6 14.7C16.3 14.9 16.1 15 15.8 15.2L14.6 14.7C14.5 14.7 14.4 14.7 14.3 14.8L13.3 16.5C13.3 16.6 13.3 16.7 13.4 16.8L14.5 17.6V18.6L13.4 19.4C13.3 19.5 13.2 19.6 13.3 19.7L14.3 21.4C14.4 21.5 14.5 21.5 14.6 21.5L15.8 21C16 21.2 16.3 21.4 16.6 21.5L16.8 22.8C16.9 22.9 17 23 17.1 23H19.1C19.2 23 19.3 22.9 19.3 22.8L19.5 21.5C19.8 21.3 20 21.2 20.3 21L21.5 21.4C21.6 21.4 21.7 21.4 21.8 21.3L22.8 19.6C22.9 19.5 22.9 19.4 22.8 19.4L21.7 18.6M18 19.5C17.2 19.5 16.5 18.8 16.5 18S17.2 16.5 18 16.5 19.5 17.2 19.5 18 18.8 19.5 18 19.5M8 9H16V11H8V9M17 8H7V20H5V8H3V4H21V8H19V11.1C18.7 11.1 18.3 11 18 11S17.3 11 17 11.1V8M11.3 20H8V18H11C11 18.7 11.1 19.4 11.3 20M8 12H14.4C13.6 12.5 12.8 13.2 12.3 14H8V12M8 15H11.7C11.4 15.6 11.2 16.3 11.1 17H8V15Z",
    "rodzaj": "M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z",
    "lamele": "M20,19H4.09L14.18,4.43L15.82,5.57L11.28,12.13C12.89,12.96 14,14.62 14,16.54C14,16.7 14,16.85 13.97,17H20V19M7.91,17H11.96C12,16.85 12,16.7 12,16.54C12,15.28 11.24,14.22 10.14,13.78L7.91,17Z",
    "kolory": "M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",
    "okno": "M21 20V2H3V20H1V23H23V20M19 4V11H13V4M5 4H11V11H5M5 20V13H11V20M13 20V13H19V20Z",
    "czujniki": "M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z",
    "fotokomorka": "M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z",
    "silnik": "M7,4V6H10V8H7L5,10V13H3V10H1V18H3V15H5V18H8L10,20H18V16H20V19H23V9H20V12H18V8H12V6H15V4H7Z",
    "pogoda": "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z",
    "domownicy": "M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z",
    "automatyka": "M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z",
    "ustawienia": "M8 13C6.14 13 4.59 14.28 4.14 16H2V18H4.14C4.59 19.72 6.14 21 8 21S11.41 19.72 11.86 18H22V16H11.86C11.41 14.28 9.86 13 8 13M8 19C6.9 19 6 18.1 6 17C6 15.9 6.9 15 8 15S10 15.9 10 17C10 18.1 9.1 19 8 19M19.86 6C19.41 4.28 17.86 3 16 3S12.59 4.28 12.14 6H2V8H12.14C12.59 9.72 14.14 11 16 11S19.41 9.72 19.86 8H22V6H19.86M16 9C14.9 9 14 8.1 14 7C14 5.9 14.9 5 16 5S18 5.9 18 7C18 8.1 17.1 9 16 9Z",
    "powiadomienia": "M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z",
    "panel": "M19,5V7H15V5H19M9,5V11H5V5H9M19,13V19H15V13H19M9,17V19H5V17H9M21,3H13V9H21V3M11,3H3V13H11V3M21,11H13V21H21V11M11,15H3V21H11V15Z",
}
GLOWNY = "#009ac7"
AKCENT = "#ff9800"
SZARY = "#8c8c8c"


class PasekKrokow(HomeAssistantView):
    url = f"/{DOMAIN}/pasek.svg"
    name = f"{DOMAIN}:pasek"
    requires_auth = False   # obrazek w opisie kreatora ładuje się bez tokenu

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass

    async def get(self, request: web.Request) -> web.Response:
        kroki = [k for k in request.query.get("k", "").split(",") if k in IKONY][:16]
        try:
            aktywny = max(0, min(len(kroki) - 1, int(request.query.get("a", "0"))))
        except ValueError:
            aktywny = 0
        jezyk = request.query.get("j", self.hass.config.language)[:10]
        t = await async_get_translations(self.hass, jezyk, "selector", {DOMAIN})
        nazwy = {k: t.get(f"component.{DOMAIN}.selector.kroki.options.{k}", k) for k in kroki}
        return web.Response(body=rysuj(kroki, aktywny, nazwy), content_type="image/svg+xml",
                            headers={"Cache-Control": "public, max-age=86400"})


def rysuj(kroki: list[str], aktywny: int, nazwy: dict[str, str]) -> str:
    n = max(1, len(kroki))
    # szerokość kroku: podpisy (ok. 7 px na znak) nie mogą wychodzić poza obrazek, np. „Powiadomienia”
    najdluzszy = max((len(nazwy.get(k, k)) for k in kroki), default=0)
    krok = max(76, round(najdluzszy * 7 + 8)) if n <= 8 else 58
    szer, wys = n * krok, 70 if n <= 8 else 74
    r = 18 if n <= 8 else 15
    # data-motor-ha-kroki: karta w przeglądarce robi z paska klikalne kroki (karta/src/kreator.js)
    czesci = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{szer}" height="{wys}" viewBox="0 0 {szer} {wys}" '
              f'data-motor-ha-kroki="{",".join(kroki)}" data-krok="{krok}" data-aktywny="{aktywny}" '
              'font-family="Roboto, Noto Sans, sans-serif">']
    for i in range(n - 1):
        x1, x2 = i * krok + krok / 2 + r + 3, (i + 1) * krok + krok / 2 - r - 3
        kolor = GLOWNY if i < aktywny else SZARY
        czesci.append(f'<line x1="{x1}" y1="{r + 4}" x2="{x2}" y2="{r + 4}" stroke="{kolor}" stroke-width="2" '
                      f'stroke-opacity="{1 if i < aktywny else 0.45}"/>')
    for i, k in enumerate(kroki):
        cx, cy = i * krok + krok / 2, r + 4
        if i == aktywny:
            czesci.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{GLOWNY}" stroke="{AKCENT}" stroke-width="3"/>')
            kolor = "#ffffff"
        elif i < aktywny:
            czesci.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{GLOWNY}" stroke-width="2"/>')
            kolor = GLOWNY
        else:
            czesci.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{SZARY}" stroke-width="2" stroke-opacity="0.6"/>')
            kolor = SZARY
        s = r * 1.1 / 12
        czesci.append(f'<path d="{IKONY[k]}" fill="{kolor}" transform="translate({cx - 12 * s} {cy - 12 * s}) scale({s})"/>')
        if n <= 8 or i == aktywny:
            waga = 700 if i == aktywny else 400
            pol = len(nazwy.get(k, k)) * 3.5   # podpis aktywnego kroku przy brzegu nie może być ucięty
            tx = min(max(cx, pol + 2), szer - pol - 2)
            czesci.append(f'<text x="{tx}" y="{2 * r + 22}" text-anchor="middle" font-size="12" font-weight="{waga}" '
                          f'fill="{GLOWNY if i == aktywny else SZARY}">{escape(nazwy.get(k, k))}</text>')
    czesci.append("</svg>")
    return "".join(czesci)


async def async_obrazek(hass: HomeAssistant, kroki: list[str], aktywny: int, jezyk: str,
                        podglad: dict | None = None) -> str:
    """Pasek jako obrazek w treści kreatora (data:), bo przy pierwszym dodaniu integracja nie podaje jeszcze plików."""
    kroki = [k for k in kroki if k in IKONY][:16]
    t = await async_get_translations(hass, jezyk, "selector", {DOMAIN})
    nazwy = {k: t.get(f"component.{DOMAIN}.selector.kroki.options.{k}", k) for k in kroki}
    svg = rysuj(kroki, max(0, min(len(kroki) - 1, aktywny)), nazwy)
    if podglad:   # wygląd okna dla żywego podglądu (karta/src/kreator.js)
        dane = b64encode(json.dumps(podglad, ensure_ascii=False).encode()).decode()
        svg = svg.replace("<svg ", f'<svg data-podglad="{dane}" ', 1)
    return "data:image/svg+xml;base64," + b64encode(svg.encode()).decode()
