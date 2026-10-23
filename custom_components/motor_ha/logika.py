"""Mózg automatyki: z warunków (pogoda, słońce, czujniki, godzina) wylicza, gdzie ma być osłona i dlaczego.

Czysta funkcja bez Home Assistanta, żeby dało się ją łatwo sprawdzić testami.
Pozycje jak w HA: 100 = otwarta (zwinięta), 0 = zamknięta (opuszczona).

Kolejność ważności (pierwsza pasująca wygrywa albo ogranicza następne):
 1. cisza po starcie HA            7. „Śpię”
 2. czujnik dymu (otwórz)           8. nikogo w domu
 3. wiatr, drgania, grad, deszcz    9. harmonogram, tryb wakacyjny, pozycja pośrednia, obecność
 4. mróz (bez ruchu)               10. słońce, oślepianie, upał, temperatura w pokoju, zima
 5. pauza (ręczny ruch, na dziś)   11. przeszkoda, drzwi, wietrzenie, blokada okna (tylko nie niżej)
 6. alarm                          12. granice ruchu, lamele
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, time, timedelta
import math
from typing import Any

from .const import OSLONY_ZEW, PARAMETRY, Z_LAMELAMI, ZWIJA_DESZCZ

ZIMA = (11, 12, 1, 2, 3)


@dataclass
class Warunki:
    """Wszystko, co automatyka wie o świecie w tej chwili. None = nie wiadomo (brak czujnika)."""

    teraz: datetime
    wschod: datetime | None = None
    zachod: datetime | None = None
    azymut: float | None = None
    wysokosc: float | None = None
    temp: float | None = None
    temp_pokoj: float | None = None
    jasnosc: float | None = None
    wiatr: float | None = None
    deszcz: bool = False
    grad: bool = False
    drgania: bool = False
    dym: bool = False
    alarm: bool = False
    nikogo: bool = False
    obecnosc: bool = False          # ktoś jest teraz (obecność albo ruch przed chwilą)
    byl_rano: bool = False          # ktoś był w pokoju od otwarcia w harmonogramie
    okno: str = "zam"               # zam / uch / otw
    drzwi: bool = False
    przeszkoda: bool = False
    upal: bool = False              # prognoza upału na dziś
    wolne: bool = False             # weekend albo święto
    wakacje: bool = False
    spie: bool = False
    pauza_do: datetime | None = None
    cisza_do: datetime | None = None
    aktualna: int | None = None
    los: int = 0                    # minuty przesunięcia w trybie wakacyjnym (inne co dzień)


@dataclass
class Decyzja:
    poz: int | None                 # None = nie ruszaj
    powod: str
    kat: int | None = None
    blokada: str | None = None      # coś zatrzymało ruch (do powiadomienia)
    dane: dict[str, Any] = field(default_factory=dict)


def _godz(tekst: Any) -> time:
    try:
        return time.fromisoformat(str(tekst))
    except ValueError:
        return time(7)


def _o(dzien: datetime, godzina: time) -> datetime:
    return dzien.replace(hour=godzina.hour, minute=godzina.minute, second=godzina.second, microsecond=0)


def slonce_w_oknie(w: Warunki, p: dict[str, Any]) -> bool:
    if w.azymut is None or w.wysokosc is None or w.wysokosc < float(p["min_wys_slonca"]):
        return False
    roznica = abs((w.azymut - float(p["azymut"]) + 180) % 360 - 180)
    return roznica <= float(p["szer_slonca"])


def pozycja_oslepiania(w: Warunki, p: dict[str, Any]) -> int:
    """Słońce ma wpadać najwyżej obiekt_odl_m w głąb pokoju: dolna krawędź osłony = odległość × tg(wysokości)."""
    if not w.wysokosc or w.wysokosc <= 0:
        return 100
    h = float(p["obiekt_odl_m"]) * math.tan(math.radians(w.wysokosc))
    return max(0, min(100, round(100 * h / max(0.1, float(p["okno_wys_m"])))))


def godziny(w: Warunki, p: dict[str, Any], funkcje: set[str]) -> tuple[datetime, datetime]:
    """Kiedy dziś otworzyć i zamknąć."""
    if p["harm_tryb"] == "slonce" and w.wschod and w.zachod:
        przes = timedelta(minutes=float(p["przesuniecie"]))
        otw, zam = w.wschod + przes, w.zachod - przes
    elif "dni" in funkcje and w.wolne:
        otw, zam = _o(w.teraz, _godz(p["otworz_weekend"])), _o(w.teraz, _godz(p["zamknij_weekend"]))
    else:
        otw, zam = _o(w.teraz, _godz(p["otworz"])), _o(w.teraz, _godz(p["zamknij"]))
    if w.wakacje and "wakacje" in funkcje:
        los = timedelta(minutes=w.los)
        otw, zam = otw + los, zam - los
    return otw, zam


def decyduj(w: Warunki, typ: str, funkcje: set[str], parametry: dict[str, Any] | None = None) -> Decyzja:
    p = {**PARAMETRY, **(parametry or {})}
    f = funkcje
    zew = typ in OSLONY_ZEW
    lam = typ in Z_LAMELAMI

    if "cisza" in f and w.cisza_do and w.teraz < w.cisza_do:
        return Decyzja(None, "cisza", dane={"do": w.cisza_do.strftime("%H:%M")})
    if "dym" in f and w.dym:
        return Decyzja(100, "dym", kat=100 if lam else None)

    # bezpieczeństwo osłon zewnętrznych – ważniejsze niż pauza
    if zew:
        if "wiatr" in f and w.wiatr is not None and w.wiatr >= float(p["wiatr_prog"]):
            return Decyzja(100, "wiatr", dane={"wiatr": round(w.wiatr), "prog": p["wiatr_prog"]})
        if "drgania" in f and w.drgania:
            return Decyzja(100, "drgania")
        if "grad" in f and w.grad:
            # markizy i żaluzje zwijamy, rolety zamykamy – chronią szybę
            return Decyzja(100 if typ in ZWIJA_DESZCZ else 0, "grad")
        if "deszcz" in f and w.deszcz and typ in ZWIJA_DESZCZ:
            return Decyzja(100, "deszcz")
        if "mroz" in f and w.temp is not None and w.temp <= float(p["mroz_prog"]):
            return Decyzja(None, "mroz", dane={"temp": round(w.temp, 1)})

    if w.pauza_do and w.teraz < w.pauza_do:
        return Decyzja(None, "pauza", dane={"do": w.pauza_do.strftime("%H:%M")})
    if "alarm" in f and w.alarm:
        return _ogranicz(Decyzja(int(p["alarm_poz"]), "alarm"), w, p, f, lam)
    if "spie" in f and w.spie:
        return _ogranicz(Decyzja(int(p["spie_poz"]), "spie", kat=int(p["lamele_noc"]) if lam else None), w, p, f, lam)
    if "nikogo" in f and w.nikogo and not (w.wakacje and "wakacje" in f):
        return _ogranicz(Decyzja(int(p["nikogo_poz"]), "nikogo"), w, p, f, lam)

    # harmonogram dnia
    otw, zam = godziny(w, p, f)
    dzien = otw <= w.teraz < zam
    d = Decyzja(None, "brak")
    if "harmonogram" in f or (w.wakacje and "wakacje" in f):
        wak = w.wakacje and "wakacje" in f
        d = Decyzja(100 if dzien else 0, ("wakacje" if wak else "harm_dzien") if dzien else ("wakacje_noc" if wak else "harm_noc"),
                    dane={"otw": otw.strftime("%H:%M"), "zam": zam.strftime("%H:%M")})
        if not wak and not (p["harm_otwieraj"] if dzien else p["harm_zamykaj"]):
            d = Decyzja(None, "brak")   # tylko otwieranie albo tylko zamykanie
        elif dzien and not wak:
            if "posrednia" in f and w.teraz >= _o(w.teraz, _godz(p["posrednia_godz"])):
                d = Decyzja(int(p["posrednia_poz"]), "posrednia", dane={"godz": str(p["posrednia_godz"])[:5]})
            if "obecnosc" in f and w.teraz < _o(w.teraz, _godz(p["obecnosc_rano"])):
                d = (Decyzja(100, "obecnosc") if (w.obecnosc or w.byl_rano)
                     else Decyzja(0, "czeka_obecnosc", dane={"do": str(p["obecnosc_rano"])[:5]}))
    elif "zima" in f and not dzien and w.wschod and w.zachod:
        d = Decyzja(0, "zima_noc")

    # słońce i komfort – tylko w dzień i tylko w dół (zasłanianie)
    jasno = w.wschod is None or w.zachod is None or w.wschod <= w.teraz < w.zachod
    if jasno and d.powod not in ("czeka_obecnosc", "wakacje", "wakacje_noc") and (d.poz is None or d.poz > 0):
        w_oknie = slonce_w_oknie(w, p)
        if "zima" in f and w.teraz.month in ZIMA:
            if w_oknie:
                d = Decyzja(100, "zima_slonce", kat=100 if lam else None)
        else:
            kandydaci: list[Decyzja] = []
            goraco = w.temp is None or w.temp >= float(p["slonce_temp"])
            jasnosc_ok = "jasnosc" not in f or (w.jasnosc is not None and w.jasnosc >= float(p["jasnosc_prog"]))
            if "slonce" in f and w_oknie and goraco and jasnosc_ok:
                kandydaci.append(Decyzja(int(p["slonce_poz"]) if not lam else 0, "slonce",
                                         kat=int(p["lamele_kat"]) if lam else None,
                                         dane={"temp": None if w.temp is None else round(w.temp)}))
            elif "jasnosc" in f and "slonce" not in f and w_oknie and jasnosc_ok:
                kandydaci.append(Decyzja(int(p["slonce_poz"]), "jasnosc", dane={"lux": round(w.jasnosc or 0)}))
            if "temp_pokoj" in f and w_oknie and w.temp_pokoj is not None and w.temp_pokoj >= float(p["temp_pokoj_prog"]):
                kandydaci.append(Decyzja(int(p["slonce_poz"]), "temp_pokoj", kat=int(p["lamele_kat"]) if lam else None,
                                         dane={"temp": round(w.temp_pokoj, 1)}))
            if "upal" in f and w.upal and w_oknie:
                kandydaci.append(Decyzja(int(p["slonce_poz"]), "upal", kat=int(p["lamele_kat"]) if lam else None))
            if "oslepianie" in f and w_oknie:
                kandydaci.append(Decyzja(pozycja_oslepiania(w, p), "oslepianie"))
            if kandydaci:
                najnizsza = min(kandydaci, key=lambda k: k.poz if k.poz is not None else 100)
                if d.poz is None or najnizsza.poz < d.poz:
                    d = najnizsza

    return _ogranicz(d, w, p, f, lam)


def _ogranicz(d: Decyzja, w: Warunki, p: dict[str, Any], f: set[str], lam: bool) -> Decyzja:
    """Przeszkoda, drzwi, wietrzenie i blokada okna: osłona nie zjedzie niżej, niż wolno."""
    if d.poz is None:
        return _lamele(d, w, p, f, lam)
    akt = w.aktualna if w.aktualna is not None else 100
    if "przeszkoda" in f and w.przeszkoda and d.poz < akt:
        return Decyzja(None, "przeszkoda", blokada="przeszkoda", dane={"chciala": d.poz})
    if "drzwi" in f and w.drzwi and d.poz < int(p["drzwi_min"]):
        minimum = int(p["drzwi_min"])
        d = Decyzja(minimum if akt >= minimum else None, "drzwi", dane={"chciala": d.poz, "min": minimum}, blokada="drzwi")
        if d.poz is None:
            return d
    if w.okno != "zam":
        if "wietrzenie" in f and w.okno == "uch" and d.poz < int(p["wietrzenie_poz"]):
            d = Decyzja(int(p["wietrzenie_poz"]), "wietrzenie", dane={"chciala": d.poz})
        elif "blokada" in f and d.poz < akt:
            d = Decyzja(None, "blokada", blokada="okno", dane={"chciala": d.poz, "okno": w.okno})
            return d
    if "granice" in f and d.poz is not None:
        d.poz = max(int(p["granica_min"]), min(int(p["granica_max"]), d.poz))
    return _lamele(d, w, p, f, lam)


def _lamele(d: Decyzja, w: Warunki, p: dict[str, Any], f: set[str], lam: bool) -> Decyzja:
    if not lam or d.poz is None or d.kat is not None:
        return d
    tryb = p["lamele_tryb"]
    if tryb == "staly":
        d.kat = int(p["lamele_kat"])
    elif d.poz == 0 and d.powod in ("harm_noc", "wakacje_noc", "zima_noc", "spie"):
        d.kat = int(p["lamele_noc"])
    elif tryb == "auto" and d.poz > 0:
        d.kat = 100
    return d
