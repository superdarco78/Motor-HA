"""Stałe integracji Okno HA."""

from __future__ import annotations

DOMAIN = "okno_ha"
VERSION = "1.1.0"
KARTA_WERSJA = "v29"   # wersja karty w www/okno-ha.js

# Plik karty Okno HA wbudowany w integrację – ładuje się sam, bez osobnej instalacji karty
KARTA_PLIK = "okno-ha.js"
KARTA_URL = f"/{DOMAIN}/{KARTA_PLIK}"

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

TRYBY = ["uchyl", "otworz"]

# Rodzaje osłon – te same co w karcie (v27)
OSLONY_WEW = ["zebra", "pelna", "zaciemniajaca", "plisa", "plaster", "rzymska", "zaluzja", "drewniana"]
OSLONY_ZEW = ["zewnetrzna", "natynkowa", "podtynkowa", "perforowana", "fasadowa", "fasadowaz", "screen"]
OSLONY = OSLONY_WEW + OSLONY_ZEW

KOLORY = ["czarny", "grafit", "szary", "bezowy", "kremowy", "bialy", "braz", "granat", "pomaranczowy"]

RAMY = {
    "biala": "#f4f4f2",
    "kremowa": "#d8d2c6",
    "srebrna": "#b9bdc1",
    "szara": "#6e7378",
    "antracyt": "#3b3f45",
    "czarna": "#1f2124",
    "zloty_dab": "#8a5a3b",
    "dab_jasny": "#b39370",
    "winchester": "#a26a43",
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
