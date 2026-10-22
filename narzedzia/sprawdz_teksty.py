"""Sprawdza, czy każdy język w narzedzia/teksty ma te same klucze i te same {miejsca} co angielski."""

import json
import re
import sys
from pathlib import Path

TEKSTY = Path(__file__).resolve().parent / "teksty"


def plaskie(d, p=""):
    if isinstance(d, dict):
        for k, v in d.items():
            yield from plaskie(v, f"{p}.{k}")
    elif isinstance(d, list):
        for i, v in enumerate(d):
            yield from plaskie(v, f"{p}[{i}]")
    else:
        yield p, d


wzor = dict(plaskie(json.loads((TEKSTY / "en.json").read_text(encoding="utf-8"))))
bledy = 0
for plik in sorted(TEKSTY.glob("*.json")):
    t = dict(plaskie(json.loads(plik.read_text(encoding="utf-8"))))
    for k in wzor.keys() - t.keys():
        print(plik.stem, "brak", k); bledy += 1
    for k in t.keys() - wzor.keys():
        print(plik.stem, "nadmiar", k); bledy += 1
    for k in wzor.keys() & t.keys():
        if set(re.findall(r"\{\w+\}", str(wzor[k]))) != set(re.findall(r"\{\w+\}", str(t[k]))):
            print(plik.stem, "miejsca", k); bledy += 1
print("ok" if not bledy else f"{bledy} błędów")
sys.exit(1 if bledy else 0)
