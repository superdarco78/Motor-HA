"""Buduje strings.json i translations/<język>.json integracji z narzedzia/teksty/<język>.json.

Nazwy osłon, kolorów i ram bierze z tłumaczeń karty (karta/tlumaczenia), żeby karta i kreator
mówiły tymi samymi słowami. Uruchom: python3 narzedzia/tlumaczenia.py
"""

from __future__ import annotations

import json
from pathlib import Path

KORZEN = Path(__file__).resolve().parent.parent
TEKSTY = KORZEN / "narzedzia" / "teksty"
KARTA = KORZEN / "karta" / "tlumaczenia"
CEL = KORZEN / "custom_components" / "motor_ha"

POLA_KROKU = {
    "tryb": ["tryb", "kopiuj_z"],
    "mam": ["mam"],
    "urzadzenie": ["rolety", "name", "pokoj", "rodzaj_pokoju"],
    "rodzaj": ["oslona"],
    "lamele": ["lamele_kat", "lamele_tryb", "lamele_noc"],
    "kolory": ["kolor", "rama", "kolor_wlasny", "rama_wlasna"],
    "okno": ["skrzydla", "wysokosc", "odwroc"],
    "czujniki": ["czujnik_lewe", "tryb_lewe", "czujnik_prawe", "tryb_prawe", "czujnik_drzwi", "czujnik_przeszkoda"],
    "fotokomorka": ["czujnik_foto", "foto_stan"],
    "silnik": ["czas", "kalibruj", "predkosc_lewa", "predkosc_prawa", "brama_minuty"],
    "pogoda": ["pogoda", "czujnik_temp", "czujnik_temp_pokoj", "czujnik_jasnosc", "czujnik_wiatr", "czujnik_deszcz",
               "czujnik_drgania", "czujnik_ostrzezenia"],
    "domownicy": ["czujnik_obecnosc", "czujnik_ruch", "osoby", "czujnik_dym", "czujnik_alarm", "czujnik_swieta"],
    "automatyka": [],
    "ustawienia": [],
    "powiadomienia": ["powiadom", "powiadom_gdzie"],
    "panel": ["na_panel"],
}
# języki HA → plik karty
KARTA_PLIK = {"zh-Hans": "zh-Hans"}


def zbuduj(jezyk: str, t: dict, karta: dict) -> dict:
    kroki = {}
    for krok, pola in POLA_KROKU.items():
        k = t["kroki"][krok]
        opis = f"{{pasek}}\n\n**{t['co']}** {k['co']}\n\n**{t['poco']}** {k['poco']}{{porada}}"
        data, pomoc = {}, {}
        for p in pola:
            data[p] = t["pola"][p]
            if p in t["pomoc"]:
                pomoc[p] = t["pomoc"][p]
        if krok == "automatyka":
            for f, (nazwa, o) in t["f"].items():
                data[f"f_{f}"] = nazwa
                pomoc[f"f_{f}"] = o
        if krok == "ustawienia":
            for p, (nazwa, o) in t["parametry"].items():
                data[p] = nazwa
                if o:
                    pomoc[p] = o
        data["wstecz"] = t["pola"]["wstecz"]
        pomoc["wstecz"] = t["pomoc"]["wstecz"]
        kroki[krok] = {"title": f"{t['krok']}: {k['t']}", "description": opis, "data": data, "data_description": pomoc}
    s = t["selector"]
    oslony = {**karta["oslony"], **t["oslony_nowe"], **t["bramy"]}
    selektory = {k: {"options": v} for k, v in s.items()}
    selektory["oslony"] = {"options": oslony}
    selektory["kolory"] = {"options": karta["kolory"]}
    selektory["ramy"] = {"options": karta["ramy"]}
    e = t["encje"]
    wyjatki = {k: {"message": v} for k, v in t["komunikaty"].items()}
    wyjatki.update({f"powod_{k}": {"message": v} for k, v in t["powody"].items()})
    uslugi = {}
    for nazwa, (n, o, pola) in t["uslugi"].items():
        uslugi[nazwa] = {"name": n, "description": o,
                         "fields": {p: {"name": a, "description": b} for p, (a, b) in pola.items()}}
    bledy = dict(t["bledy"])
    opcje = {k: v for k, v in kroki.items() if k != "panel"}
    return {
        "title": "Motor HA",
        "config": {"step": kroki, "error": bledy},
        "options": {"step": opcje, "error": bledy},
        "selector": selektory,
        "entity": {
            "button": {"kalibruj": {"name": e["kalibruj"]}, "wznow": {"name": e["wznow"]}},
            "sensor": {"powod": {"name": e["powod"], "state": t["powody"]},
                       "ruchy": {"name": e["ruchy"]}, "czas_pracy": {"name": e["czas_pracy"]}},
            "switch": {k: {"name": e[k]} for k in ("automatyka", "pauza", "spie", "wakacje")},
        },
        "exceptions": wyjatki,
        "issues": {"restart": {"title": t["naprawa"]["t"], "fix_flow": {"step": {"confirm": {
            "title": t["naprawa"]["t"], "description": t["naprawa"]["o"]}}}}},
        "services": uslugi,
    }


def main() -> None:
    (CEL / "translations").mkdir(exist_ok=True)
    for plik in sorted(TEKSTY.glob("*.json")):
        jezyk = plik.stem
        t = json.loads(plik.read_text(encoding="utf-8"))
        karta = json.loads((KARTA / f"{KARTA_PLIK.get(jezyk, jezyk)}.json").read_text(encoding="utf-8"))
        wynik = json.dumps(zbuduj(jezyk, t, karta), ensure_ascii=False, indent=2) + "\n"
        (CEL / "translations" / f"{jezyk}.json").write_text(wynik, encoding="utf-8")
        if jezyk == "en":
            (CEL / "strings.json").write_text(wynik, encoding="utf-8")
        print(jezyk, "ok")


if __name__ == "__main__":
    main()
