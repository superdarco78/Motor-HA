"""Decyzje automatyki – czysta funkcja, bez HA."""

from datetime import datetime

from custom_components.motor_ha.logika import Warunki, decyduj
from custom_components.motor_ha.const import PARAMETRY


def _w(**k) -> Warunki:
    baza = dict(teraz=datetime(2026, 7, 1, 12, 0), wschod=datetime(2026, 7, 1, 4, 30),
                zachod=datetime(2026, 7, 1, 21, 0), azymut=180.0, wysokosc=55.0, temp=30.0)
    baza.update(k)
    return Warunki(**baza)


def test_nic_wlaczone() -> None:
    assert decyduj(_w(), "natynkowa", set(), dict(PARAMETRY)).poz is None


def test_slonce_i_blokada() -> None:
    d = decyduj(_w(), "natynkowa", {"slonce"}, dict(PARAMETRY))
    assert d.poz == PARAMETRY["slonce_poz"] and d.powod == "slonce"
    d = decyduj(_w(okno="otw"), "natynkowa", {"slonce", "blokada"}, dict(PARAMETRY))
    assert d.poz is None and d.blokada


def test_wiatr_wygrywa() -> None:
    d = decyduj(_w(wiatr=80.0), "markiza", {"slonce", "wiatr"}, dict(PARAMETRY))
    assert d.powod == "wiatr"


def test_dym_otwiera() -> None:
    d = decyduj(_w(dym=True, alarm=True), "natynkowa", {"dym", "alarm"}, dict(PARAMETRY))
    assert d.poz == 100 and d.powod == "dym"


def test_harmonogram_noc() -> None:
    d = decyduj(_w(teraz=datetime(2026, 7, 1, 23, 0), wysokosc=-10.0), "natynkowa", {"harmonogram"}, dict(PARAMETRY))
    assert d.poz == 0 and d.powod == "harm_noc"
