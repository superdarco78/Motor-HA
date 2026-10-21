"""Stałe integracji Okno HA."""

from __future__ import annotations

DOMAIN = "okno_ha"
VERSION = "1.4.10"
OKNA = f"{DOMAIN}_okna"   # hass.data: entry_id → encja okna (dla przycisku „Kalibruj”)
KARTA_WERSJA = "v32"   # wersja karty w www/okno-ha.js

# Karta Okno HA wbudowana w integrację (www/) – kopiowana do /config/.okno_ha i stamtąd ładowana
KARTA_PLIK = "okno-ha.js"

# Klucze ustawień (te same nazwy co w karcie, żeby karta mogła je wziąć bez tłumaczenia)
CONF_ROLETY = "rolety"
CONF_SKRZYDLA = "skrzydla"
CONF_CZUJNIK_LEWE = "czujnik_lewe"
CONF_CZUJNIK_PRAWE = "czujnik_prawe"
CONF_TRYB_LEWE = "tryb_lewe"
CONF_TRYB_PRAWE = "tryb_prawe"
CONF_PREDKOSC_LEWA = "predkosc_lewa"
CONF_PREDKOSC_PRAWA = "predkosc_prawa"
CONF_CZAS = "czas"
CONF_POGODA = "pogoda"
CONF_OSLONA = "oslona"
CONF_KOLOR = "kolor"
CONF_RAMA = "rama"
CONF_WYSOKOSC = "wysokosc"
CONF_KOLOR_WLASNY = "kolor_wlasny"
CONF_RAMA_WLASNA = "rama_wlasna"
CONF_KALIBRUJ = "kalibruj"
CONF_NA_PANEL = "na_panel"
CONF_WSTECZ = "wstecz"

TRYBY = ["uchyl", "otworz"]

# Rodzaje osłon – te same co w karcie (v27)
OSLONY_WEW = ["zebra", "pelna", "zaciemniajaca", "plisa", "plaster", "rzymska", "zaluzja", "drewniana"]
OSLONY_ZEW = ["zewnetrzna", "natynkowa", "podtynkowa", "perforowana", "fasadowa", "fasadowaz", "screen"]
OSLONY = OSLONY_WEW + OSLONY_ZEW

# kolory tkanin (te same nazwy co w karcie)
KOLORY = {
    "czarny": "#232427",
    "grafit": "#3a3d42",
    "szary": "#6d7076",
    "bezowy": "#bfae94",
    "kremowy": "#e6dcc8",
    "bialy": "#efefec",
    "braz": "#5a4030",
    "granat": "#25324d",
    "pomaranczowy": "#fc9907",
    "piaskowy": "#d9c7a4",
    "cappuccino": "#a88c72",
    "mokka": "#6f5544",
    "wenge": "#3d2f28",
    "popiel": "#a9aaa6",
    "srebrny": "#c4c6c8",
    "stalowy": "#4f5a66",
    "lawendowy": "#b9a8d6",
    "pudrowy": "#e4b9b9",
    "mietowy": "#a9dcc6",
    "blekitny": "#9cc6e6",
    "morski": "#1d6f7a",
    "butelkowy": "#1f4d3a",
    "musztardowy": "#c99a1a",
    "terakota": "#b9583a",
    "sliwkowy": "#5b2c4a",
    "czerwony": "#e02424",
    "bordo": "#7a1f2b",
    "rozowy": "#ff4f9a",
    "fiolet": "#8a3ffc",
    "niebieski": "#1e6ff2",
    "turkus": "#00b3b3",
    "zielony": "#22a447",
    "limonka": "#9bd426",
    "zolty": "#ffd000",
    "oliwka": "#6b7a3a",
}

# kolory i okleiny ram (te same co w karcie); okleiny drewnopodobne karta rysuje ze słojami
RAMY = {
    "biala": "#f4f4f2",
    "kremowa": "#d8d2c6",
    "jasnoszara": "#c9cbcc",
    "srebrna": "#b9bdc1",
    "szary_agat": "#a3a6a8",
    "szara": "#6e7378",
    "szary_kwarc": "#6d6c66",
    "bazaltowa": "#4a4d50",
    "antracyt": "#3b3f45",
    "czarna": "#1f2124",
    "zielona": "#28402f",
    "granatowa": "#2b3a55",
    "bordowa": "#5d1f23",
    "braz": "#6b4a32",
    "sosna": "#c49a5c",
    "dab_jasny": "#b39370",
    "dab_sheffield": "#9d8064",
    "winchester": "#a26a43",
    "oregon": "#9b6a3c",
    "zloty_dab": "#8a5a3b",
    "siena": "#6d4a33",
    "orzech": "#5a3a26",
    "mahon": "#6a2e22",
    "dab_bagienny": "#3e3830",
}

DOMYSLNE = {
    CONF_SKRZYDLA: "2",
    CONF_TRYB_LEWE: "uchyl",
    CONF_TRYB_PRAWE: "uchyl",
    CONF_CZAS: 0,
    CONF_OSLONA: "zebra",
    CONF_KOLOR: "czarny",
    CONF_RAMA: "biala",
    CONF_WYSOKOSC: 260,
}
