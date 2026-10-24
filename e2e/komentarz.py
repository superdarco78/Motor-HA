"""Komentarz do PR: zrzuty kreatora „przed” (main) i „po” (ten PR) obok siebie, krok po kroku.

Użycie: python3 e2e/komentarz.py <folder przed> <folder po> <adres obrazków> <adres przebiegu Actions>
Obrazki muszą już leżeć pod <adres obrazków>/przed/… i <adres obrazków>/po/… (wysyła je workflow).
"""

import json
from pathlib import Path
import sys

ZNACZNIK = "<!-- motor-ha-przed-po -->"


def kroki(folder: Path) -> list[dict]:
    plik = folder / "kroki.json"
    if not plik.exists():
        return []
    return [k for k in json.loads(plik.read_text(encoding="utf-8")) if "plik" in k]


def main() -> None:
    przed, po, adres, przebieg = Path(sys.argv[1]), Path(sys.argv[2]), sys.argv[3].rstrip("/"), sys.argv[4]
    kp, ko = kroki(przed), kroki(po)
    w = [ZNACZNIK, "## 📱 Kreator Motor HA na telefonie: przed i po", ""]
    if not ko:
        w.append("⚠️ Kreator z tego PR nie doszedł do końca. Zobacz zrzut `ostatni-widok.png` w wynikach poniżej.")
    w += [
        "Prawdziwy Home Assistant w Dockerze, profil aplikacji HA na Galaxy S24 Ultra, udawane rolety z integracji Demo.",
        "**Przed** = obecna wersja (main), **Po** = ten PR.",
        "",
        "| Krok | Przed | Po |",
        "|:--|:--:|:--:|",
    ]
    for i in range(max(len(kp), len(ko))):
        a = kp[i] if i < len(kp) else None
        b = ko[i] if i < len(ko) else None
        nazwa = (b or a)["naglowek"].split("·")[0].strip() or f"Krok {i + 1}"
        ka = f'<img src="{adres}/przed/{a["plik"]}?raw=true" width="220">' if a else "—"
        kb = f'<img src="{adres}/po/{b["plik"]}?raw=true" width="220">' if b else "—"
        w.append(f"| {nazwa} | {ka} | {kb} |")
    w += ["", f"🎬 Film z przejścia kreatora i wszystkie zrzuty: [wyniki testu]({przebieg}) → „Artifacts” na dole strony."]
    print("\n".join(w))


main()
