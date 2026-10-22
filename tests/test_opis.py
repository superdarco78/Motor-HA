"""Opis w HA (www/opis/*.html) musi być zbudowany z aktualnych README."""
import subprocess
import sys
from pathlib import Path

KORZEN = Path(__file__).resolve().parent.parent


def test_opis_aktualny():
    r = subprocess.run([sys.executable, str(KORZEN / "narzedzia" / "opis_ha.py"), "--sprawdz"], capture_output=True, text=True)
    assert r.returncode == 0, r.stdout + r.stderr


def test_opis_wszystkie_jezyki():
    for jez in ["pl", "en", "de", "fr", "cs"]:
        html = (KORZEN / "custom_components" / "okno_ha" / "www" / "opis" / f"{jez}.html").read_text(encoding="utf-8")
        assert html.count('class="m-klik"') >= 10 and "kroki7b" in html
