"""Tłumaczenia: każdy język ma te same teksty co angielski (bez braków, nadmiarów, pustych pól i zgubionych {miejsc})."""

import json
from pathlib import Path
import re
import subprocess
import sys

import pytest

REPO = Path(__file__).resolve().parent.parent
FOLDERY = {
    "integracja": REPO / "custom_components/motor_ha/translations",
    "karta": REPO / "karta/tlumaczenia",
    "readme": REPO / "narzedzia/teksty",
}


def _plaskie(d, p=""):
    if isinstance(d, dict):
        for k, v in d.items():
            yield from _plaskie(v, f"{p}.{k}")
    elif isinstance(d, list):
        for i, v in enumerate(d):
            yield from _plaskie(v, f"{p}[{i}]")
    else:
        yield p, d


def _wczytaj(plik: Path) -> dict:
    return dict(_plaskie(json.loads(plik.read_text(encoding="utf-8"))))


def _miejsca(tekst) -> set[str]:
    return set(re.findall(r"\{\w+\}", str(tekst)))


@pytest.mark.parametrize(
    ("co", "plik"),
    [(co, p) for co, f in FOLDERY.items() for p in sorted(f.glob("*.json")) if p.stem != "en"],
    ids=lambda x: x.stem if isinstance(x, Path) else x,
)
def test_jezyk_zgodny_z_angielskim(co: str, plik: Path) -> None:
    wzor = _wczytaj(FOLDERY[co] / "en.json")
    t = _wczytaj(plik)
    assert not sorted(wzor.keys() - t.keys()), "brakujące teksty"
    assert not sorted(t.keys() - wzor.keys()), "teksty, których nie ma po angielsku"
    assert not [k for k, v in t.items() if isinstance(v, str) and not v.strip() and str(wzor[k]).strip()], "puste teksty"
    assert not [k for k in wzor if _miejsca(wzor[k]) != _miejsca(t[k])], "inne {miejsca} niż po angielsku"


def test_jezyki_wszedzie_te_same() -> None:
    jezyki = {co: {p.stem for p in f.glob("*.json")} for co, f in FOLDERY.items()}
    assert len({frozenset(j) for j in jezyki.values()}) == 1, jezyki


def test_strings_json_w_en() -> None:
    """Każdy tekst ze strings.json (źródło HA) musi być w translations/en.json (HA pokazuje teksty z translations)."""
    assert not sorted(_wczytaj(REPO / "custom_components/motor_ha/strings.json").keys() - _wczytaj(FOLDERY["integracja"] / "en.json").keys())


def test_narzedzie_sprawdz_teksty() -> None:
    w = subprocess.run([sys.executable, str(REPO / "narzedzia/sprawdz_teksty.py")], capture_output=True, text=True, check=False)
    assert w.returncode == 0, w.stdout + w.stderr
