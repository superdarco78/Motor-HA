"""README w 5 językach + ikony i pasek kroków (img/ikony, img/kreator).

Jedno źródło: teksty README (readme_teksty.py), tłumaczenia integracji (teksty/<język>.json) i karty
(karta/tlumaczenia/<język>.json). Dzięki temu nazwy funkcji, kroków i osłon są takie same jak w HA.

Uruchom po każdej zmianie tekstów (Python z Home Assistant):  python narzedzia/readme.py
"""
from __future__ import annotations

import json
import sys
from html import escape
from pathlib import Path
from urllib.parse import quote

KORZEN = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).parent))
sys.path.insert(0, str(KORZEN))
from readme_teksty import T  # noqa: E402
from kroki_teksty import KROKI_ZRZUTY, K  # noqa: E402

MDI = json.loads((Path(__file__).parent / "mdi.json").read_text(encoding="utf-8"))
REPO = "superdarco78/Motor-HA"
GH = f"https://github.com/{REPO}"
RAW = f"https://raw.githubusercontent.com/{REPO}/main/"
HACS = f"https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=Motor-HA&category=integration"
DODAJ = "https://my.home-assistant.io/redirect/config_flow_start/?domain=motor_ha"
GLOWNY, AKCENT, SZARY = "#009AC7", "#FF9800", "#8C8C8C"
JEZYKI = ["pl", "en", "de", "fr", "cs"]

GRUPY = {
    "wew": {"rolety": ["pelna", "kasetowa", "zebra", "zaciemniajaca"], "plisy": ["plisa", "plaster", "rzymska"],
            "zaluzje": ["zaluzja", "drewniana"], "pionowe": ["pionowa", "zaslona"]},
    "zew": {"zrolety": ["natynkowa", "podtynkowa", "zewnetrzna", "perforowana"], "fasadowe": ["fasadowa", "fasadowaz"],
            "taras": ["markiza", "screen"]},
    "brama": {"bramy": ["przesuwna", "skrzydlowa"], "garaze": ["segmentowa", "uchylna", "roletowa"]},
}
IKONY_GRUP = {"wew": "sofa-outline", "zew": "window-shutter", "brama": "gate"}
KAFLE_IKONY = ["auto-fix", "window-shutter", "robot", "help-circle-outline", "weather-partly-cloudy", "bell-ring-outline", "home-outline", "translate"]
KAFLE_CEL = ["kreator", "oslony", "automatyka", "automatyka", "oslony", "powiadomienia", "dom", "licencja"]
DZIALY = {"instalacja": "download", "kreator": "auto-fix", "oslony": "window-shutter", "automatyka": "robot", "bramy": "gate",
          "powiadomienia": "bell-ring-outline", "encje": "format-list-bulleted", "dom": "home-outline", "aktualizacja": "update",
          "pytania": "help-circle", "licencja": "scale-balance"}
FUNKCJE_IKONY = {
    "harmonogram": "calendar-clock", "slonce": "weather-sunny", "blokada": "window-open-variant", "wiatr": "weather-windy",
    "obecnosc": "account-check", "wakacje": "airplane", "licznik": "counter", "reczny": "hand-back-right",
    "posrednia": "arrow-collapse-vertical", "dni": "calendar-week", "wietrzenie": "fan", "drzwi": "door-open",
    "oslepianie": "sunglasses", "zima": "snowflake", "jasnosc": "brightness-5", "temp_pokoj": "home-thermometer",
    "deszcz": "weather-pouring", "mroz": "snowflake-thermometer", "grad": "weather-hail", "drgania": "vibrate",
    "upal": "thermometer-high", "dym": "smoke-detector-variant", "alarm": "shield-home", "nikogo": "home-export-outline",
    "przeszkoda": "alert-octagon-outline", "spie": "sleep", "granice": "arrow-expand-vertical", "drobne": "tune-variant",
    "po_kolei": "format-list-numbered", "cisza": "timer-sand", "proba": "flask-outline",
}
ENCJE = [("cover", "window-shutter"), ("powod", "help-circle-outline"), ("wznow", "play-circle-outline"), ("kalibruj", "timer-cog-outline"),
         ("automatyka", "robot"), ("pauza", "pause-circle-outline"), ("spie", "sleep"), ("ruchy", "counter"),
         ("czas_pracy", "engine-outline"), ("wakacje", "airplane")]
USLUGI = {"wstrzymaj": "pause", "wznow": "play", "przelicz": "refresh", "kalibruj": "timer-cog-outline", "ustaw": "arrow-up-down"}
POWIADOMIENIA = {"nie_odpowiada": "alert-circle-outline", "nie_dojechala": "arrow-up-down", "bateria": "alert-outline",
                 "czujnik": "alert-octagon-outline", "automatyka": "robot", "brama_otwarta": "gate", "brama_niedomknieta": "gate",
                 "przeszkoda": "alert-octagon-outline"}
KROKI_PODST = ["tryb", "mam", "urzadzenie", "rodzaj", "kolory", "okno", "silnik", "automatyka", "powiadomienia", "panel"]
KROKI = ["tryb", "mam", "urzadzenie", "rodzaj", "lamele", "kolory", "okno", "czujniki", "fotokomorka", "silnik", "pogoda",
         "domownicy", "automatyka", "ustawienia", "powiadomienia", "panel"]


# ---------- obrazki ----------

def ikona_svg(sciezka: str) -> str:
    """Jedna obwódka w kolorze akcentu + znak w kolorze głównym (styl ikon z HA), przezroczyste tło."""
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">'
            f'<circle cx="48" cy="48" r="44" fill="none" stroke="{AKCENT}" stroke-width="5"/>'
            f'<path d="{sciezka}" fill="{GLOWNY}" transform="translate(22 22) scale(2.1667)"/></svg>')


def pasek_svg(kroki: list[str], nazwy: dict[str, str], sciezki: dict[str, str]) -> str:
    n, krok, r = len(kroki), 116, 22
    szer, wys = n * krok, 2 * r + 40
    cz = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{szer}" height="{wys}" viewBox="0 0 {szer} {wys}" '
          'font-family="Roboto, Noto Sans, Arial, sans-serif">']
    for i in range(n - 1):
        x1, x2 = i * krok + krok / 2 + r + 4, (i + 1) * krok + krok / 2 - r - 4
        cz.append(f'<line x1="{x1}" y1="{r + 4}" x2="{x2}" y2="{r + 4}" stroke="{GLOWNY}" stroke-width="2.5"/>')
    for i, k in enumerate(kroki):
        cx, cy = i * krok + krok / 2, r + 4
        cz.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{AKCENT}" stroke-width="3"/>')
        s = r * 1.15 / 12
        cz.append(f'<path d="{sciezki[k]}" fill="{GLOWNY}" transform="translate({cx - 12 * s} {cy - 12 * s}) scale({s})"/>')
        cz.append(f'<text x="{cx}" y="{2 * r + 26}" text-anchor="middle" font-size="13" font-weight="500" fill="{SZARY}">'
                  f'{i + 1}. {escape(nazwy.get(k, k))}</text>')
    cz.append("</svg>")
    return "".join(cz)


def zapisz_obrazki() -> None:
    from custom_components.motor_ha.pasek import IKONY as SCIEZKI_KROKOW   # te same ikony co pasek w kreatorze
    kat = KORZEN / "img" / "ikony"
    kat.mkdir(parents=True, exist_ok=True)
    potrzebne = set(KAFLE_IKONY) | set(DZIALY.values()) | set(FUNKCJE_IKONY.values()) | {i for _, i in ENCJE} \
        | set(USLUGI.values()) | set(POWIADOMIENIA.values()) | set(IKONY_GRUP.values())
    for n in sorted(potrzebne):
        (kat / f"{n}.svg").write_text(ikona_svg(MDI[n]), encoding="utf-8")
    for k, d in SCIEZKI_KROKOW.items():
        (kat / f"krok-{k}.svg").write_text(ikona_svg(d), encoding="utf-8")
    (KORZEN / "img" / "kreator").mkdir(exist_ok=True)
    for j in JEZYKI:
        t = json.loads((Path(__file__).parent / "teksty" / f"{j}.json").read_text(encoding="utf-8"))
        (KORZEN / "img" / "kreator" / f"pasek-{j}.svg").write_text(
            pasek_svg(KROKI_PODST, t["selector"]["kroki"], SCIEZKI_KROKOW), encoding="utf-8")


# ---------- README ----------

def odznaka(etykieta: str, wartosc: str, kolor: str, logo: str = "", link: str = "", dynamiczna: str = "") -> str:
    if dynamiczna:
        url = f"https://img.shields.io/{dynamiczna}{'&' if '?' in dynamiczna else '?'}style=for-the-badge&label={quote(etykieta)}&color={kolor}"
    else:
        e = lambda s: quote(s.replace("-", "--").replace("_", "__"))  # noqa: E731
        url = f"https://img.shields.io/badge/{e(etykieta)}-{e(wartosc)}-{kolor}?style=for-the-badge"
    if logo:
        url += f"&logo={logo}&logoColor=white"
    return f'<a href="{link}"><img src="{url}" alt="{escape(etykieta)}"></a>'


def przycisk(tekst: str, kolor: str, logo: str, link: str) -> str:
    """Duży kolorowy przycisk (sama treść, bez szarej etykiety)."""
    e = quote(tekst.replace("-", "--").replace("_", "__"))
    return (f'<a href="{link}"><img src="https://img.shields.io/badge/-{e}-{kolor}?style=for-the-badge&logo={logo}&logoColor=white" '
            f'height="36" alt="{escape(tekst)}"></a>')


def ik(nazwa: str, wys: int = 40) -> str:
    # ikona zawsze w tej samej komórce co tekst: GitHub zwęża komórki z samym obrazkiem do kropki (img max-width:100%)
    return f'<img src="{RAW}img/ikony/{nazwa}.svg" width="{wys}" height="{wys}" align="absmiddle" alt="">'


def obraz(j: str, nazwa: str, szer: int, alt: str) -> str:
    """Zrzut z zaznaczeniami: jasny albo ciemny według motywu (GitHub: <picture>, HA: motor-ha-hacs.js)."""
    u = f"{RAW}img/kroki/{j}/{nazwa}"
    return (f'<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="{u}-ciemny.webp">'
            f'<img src="{u}-jasny.webp" width="{szer}" alt="{escape(alt)}"></picture></p>\n')


def klik(tytul: str, lista: list[str]) -> str:
    return f"<p><b>{escape(tytul)}</b></p>\n<ol>" + "".join(f"<li>{x}</li>" for x in lista) + "</ol>\n" if lista else ""


def naglowek(klucz: str, tekst: str) -> str:
    return f'<a name="{klucz}"></a>\n<h2>{ik(DZIALY[klucz], 34)} {escape(tekst)}</h2>\n'


def readme(j: str) -> str:
    L = T[j]
    t = json.loads((Path(__file__).parent / "teksty" / f"{j}.json").read_text(encoding="utf-8"))
    k = json.loads((KORZEN / "karta" / "tlumaczenia" / f"{j}.json").read_text(encoding="utf-8"))
    o = L["odznaki"]
    gh = GH
    w = []
    # plakietki
    w.append('<p align="center">')
    w += [odznaka(o["wersja"], "", "009AC7", "", f"{gh}/releases/latest", f"github/v/release/{REPO}"),
          odznaka(o["pobrania"], "", "4CAF50", "", f"{gh}/releases", f"github/downloads/{REPO}/total"),
          odznaka(o["gwiazdki"], "", "FF9800", "github", f"{gh}/stargazers", f"github/stars/{REPO}"),
          odznaka("HACS", "Custom", "FF5722", "homeassistantcommunitystore", "https://hacs.xyz"),
          "<br>",
          odznaka("Home Assistant", "2024.12+", "18BCF2", "homeassistant", "https://www.home-assistant.io/"),
          odznaka(o["jezyki"], "14", "8E44AD", "googletranslate", f"{gh}#licencja"),
          odznaka(o["licencja"], "CC BY-NC-SA 4.0", "E53935", "", f"{gh}/blob/main/LICENSE"),
          odznaka(o["zgloszenia"], "", "FFB300", "github", f"{gh}/issues", f"github/issues/{REPO}"),
          "<br>",
          odznaka("HACS", "", "41BDF5", "homeassistantcommunitystore", f"{gh}/actions/workflows/sprawdz.yml",
                  f"github/actions/workflow/status/{REPO}/sprawdz.yml?branch=main&event=push"),
          odznaka(o["forum"], "Home Assistant", "1B9AAA", "discourse", "https://community.home-assistant.io/"),
          odznaka(o["forum_pl"], "arturhome.pl", "D81B60", "discourse", "https://forum.arturhome.pl/")]
    w.append("</p>\n")
    # języki
    w.append('<p align="center">')
    for x in JEZYKI:
        plik = "" if x == "pl" else f"/blob/main/{T[x]['plik']}"
        w.append(f'<a href="{gh}{plik}"><img src="{RAW}img/jezyki/{x}{"-on" if x == j else ""}.svg" height="44" alt="{T[x]["nazwa_jezyka"]}"></a>')
    w.append("</p>\n")
    # baner z przyciskiem HACS
    w.append(f'<p align="center"><a href="{HACS}"><img src="{RAW}img/baner/{j}.svg" width="100%" alt="Motor HA – {escape(L["hacs"])}"></a></p>\n')
    # animacja (w HA zamienia się na żywą symulację)
    w.append(f'<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="{RAW}img/pokaz/{j}-ciemny.webp">'
             f'<img src="{RAW}img/pokaz/{j}-jasny.webp" width="100%" alt="{escape(L["pokaz"])}"></picture><br><sub>{escape(L["pokaz"])}</sub></p>\n')
    w.append(f'<h1 align="center">Motor HA</h1>\n<p align="center"><b>{escape(L["podtytul"])}</b></p>\n')
    w.append(f'<p align="center">{L["wstep"]}</p>\n')
    w.append(f"> [!NOTE]\n> {L['uwaga']}\n")
    # przyciski
    w.append('<p align="center">'
             + przycisk(L["hacs"], "009AC7", "homeassistantcommunitystore", HACS) + " "
             + przycisk(L["dodaj"], "FF9800", "homeassistant", DODAJ) + "</p>\n")
    # kafelki
    # 2 kolumny – czytelne także na telefonie; ikona nad tytułem w tej samej komórce
    w.append('<table width="100%">')
    for r in range(4):
        w.append("<tr>")
        for i in (2 * r, 2 * r + 1):
            ty, op = L["kafle"][i]
            w.append(f'<td align="center" valign="top" width="50%"><a href="{gh}{"" if j == "pl" else "/blob/main/" + L["plik"]}#{KAFLE_CEL[i]}">{ik(KAFLE_IKONY[i], 48)}<br>'
                     f'<b>{escape(ty)}</b></a><br><sub>{escape(op)}</sub></td>')
        w.append("</tr>")
    w.append("</table>\n")
    # spis treści w 2 kolumnach
    dz = list(L["dzialy"].items())
    pol = (len(dz) + 1) // 2
    # jedna pozycja w komórce, wiersz po wierszu – nic się nie skleja ani nie rozjeżdża
    w.append(f"<h2>{ik('format-list-bulleted', 34)} {escape(L['spis'])}</h2>\n<table width=\"100%\">")
    for a, b in zip(dz[:pol], dz[pol:] + [None]):
        w.append("<tr>" + "".join(
            f'<td width="50%">{ik(DZIALY[x[0]], 28)} <a href="{gh}{"" if j == "pl" else "/blob/main/" + L["plik"]}#{x[0]}"><b>{escape(x[1])}</b></a></td>'
            if x else '<td width="50%"></td>' for x in (a, b)) + "</tr>")
    w.append("</table>\n")
    d = L["dzialy"]
    # instalacja
    w.append(naglowek("instalacja", d["instalacja"]))
    kt = K[j]
    for nr, (img, guzik, tytul, lista, uwaga) in enumerate(kt["instalacja"], 1):
        w.append(f'<a name="krok-{nr}"></a>\n<h3>{nr}. {escape(tytul)}</h3>\n')
        if guzik:
            w.append('<p align="center">' + (przycisk(L["hacs"], "009AC7", "homeassistantcommunitystore", HACS) if guzik == "hacs"
                                             else przycisk(L["dodaj"], "FF9800", "homeassistant", DODAJ)) + "</p>\n")
        if img:
            w.append(obraz(j, img, 560 if img == "start" else 860, tytul))
        w.append(klik(kt["co_kliknac"], lista))
        if uwaga:
            w.append(f"<p>ℹ️ {uwaga}</p>\n" if img else f'<p>➡️ <a href="{gh}{"" if j == "pl" else "/blob/main/" + L["plik"]}#kreator-krok">{escape(uwaga)}</a></p>\n')
    w.append(f"<details><summary><b>{escape(L['instalacja_reczna'])}</b></summary>\n<p>{L['instalacja_reczna_tekst'].format(gh=gh)}</p>\n</details>\n")
    # kreator
    w.append(naglowek("kreator", d["kreator"]))
    w.append(f'<p>{L["kreator_wstep"]}</p>\n')
    w.append(f'<p align="center"><img src="{RAW}img/kreator/pasek-{j}.svg" width="100%" alt="{escape(d["kreator"])}"></p>\n')
    kk = L["kreator_kolumny"]
    w.append(f'<table><tr><th align="left">{kk[0]} · {kk[1]}</th><th align="left">{kk[2]}</th></tr>')
    for nr, kr in enumerate(KROKI, 1):
        x = t["kroki"][kr]
        w.append(f'<tr><td>{ik("krok-" + kr, 36)} <b>{nr}. {escape(x["t"])}</b><br>{escape(x["co"])}</td>'
                 f'<td>{escape(x["poco"].split(chr(10))[0])}</td></tr>')
    w.append("</table>\n")
    w.append(f"<p>{L['kreator_dodatkowe']}</p>\n")
    w.append(f'<a name="kreator-krok"></a>\n<h3>{escape(kt["kreator_obrazki"])}</h3>\n')
    for nr, kr in enumerate(KROKI_ZRZUTY, 1):
        x = t["kroki"][kr]
        w.append(f'<a name="kreator-{nr}"></a>\n<h4>{ik("krok-" + kr, 28)} {nr}. {escape(x["t"])}</h4>\n')
        w.append(obraz(j, f"krok-{nr:02d}", 640, x["t"]))
        w.append(klik(kt["co_kliknac"], [escape(x["co"]), f'<b>{kt["zatwierdz" if nr == len(KROKI_ZRZUTY) else "dalej"]}</b>']))
    # osłony
    w.append(naglowek("oslony", d["oslony"]))
    w.append(f"<p>{escape(L['oslony_wstep'])}</p>\n")
    for g, podgrupy in GRUPY.items():
        w.append(f"<h3>{ik(IKONY_GRUP[g], 28)} {escape(k['grupy'][g])}</h3>\n<table>")
        for pg, typy in podgrupy.items():
            w.append(f'<tr><td colspan="4"><b>{escape(k["grupy"][pg])}</b></td></tr><tr>')
            for ty in typy:
                w.append(f'<td align="center" valign="top" width="25%"><img src="{RAW}img/oslony/{ty}.png" width="150" alt="{escape(k["oslony"][ty])}">'
                         f'<br><sub>{escape(k["oslony"][ty])}</sub></td>')
            w.append("</tr>")
        w.append("</table>\n")
    # automatyka
    w.append(naglowek("automatyka", d["automatyka"]))
    w.append(f"<p>{L['automatyka_wstep']}</p>\n")
    from custom_components.motor_ha.const import FUNKCJE   # noqa: PLC0415
    ka = L["automatyka_kolumny"]
    for tytul, zaaw in ((L["automatyka_podst"], False), (L["automatyka_zaaw"], True)):
        w.append(f'<h3>{escape(tytul)}</h3>\n<table><tr><th align="left">{ka[0]}</th><th align="left">{ka[1]}</th></tr>')
        for f, (_, tylko_zaaw) in FUNKCJE.items():
            if tylko_zaaw == zaaw:
                n, op = t["f"][f]
                w.append(f'<tr><td>{ik(FUNKCJE_IKONY[f], 32)} <b>{escape(n)}</b></td><td>{escape(op)}</td></tr>')
        w.append("</table>\n")
    # bramy
    w.append(naglowek("bramy", d["bramy"]))
    w.append("> [!IMPORTANT]\n> " + L["bramy_tekst"][0] + "\n\n")
    w.append(f"<p>{L['bramy_tekst'][1]}</p>\n<p>{L['bramy_tekst'][2]}</p>\n")
    w.append('<p align="center">' + "".join(f'<img src="{RAW}img/oslony/{ty}.png" width="19%" alt="{escape(k["oslony"][ty])}"> '
                                            for ty in GRUPY["brama"]["bramy"] + GRUPY["brama"]["garaze"]) + "</p>\n")
    # powiadomienia
    w.append(naglowek("powiadomienia", d["powiadomienia"]))
    w.append(f"<p>{escape(L['powiadomienia_wstep'])}</p>\n<table>")
    for p, ikona in POWIADOMIENIA.items():
        w.append(f'<tr><td>{ik(ikona, 30)} {escape(t["selector"]["powiadomienia"][p])}</td></tr>')
    w.append("</table>\n")
    # encje i usługi
    w.append(naglowek("encje", d["encje"]))
    w.append(f"<p>{escape(L['encje_wstep'])}</p>\n")
    ke = L["encje_kolumny"]
    w.append(f'<table><tr><th align="left">{ke[0]}</th><th align="left">{ke[1]}</th></tr>')
    for e, ikona in ENCJE:
        nazwa = "Motor HA" if e == "cover" else t["encje"][e]
        w.append(f'<tr><td>{ik(ikona, 30)} <b>{escape(nazwa)}</b></td><td>{escape(L["encje_opisy"][e])}</td></tr>')
    w.append("</table>\n")
    w.append(f"<h3>{escape(L['uslugi_tytul'])}</h3>\n<table>")
    for u, ikona in USLUGI.items():
        n, op, _ = t["uslugi"][u]
        w.append(f'<tr><td>{ik(ikona, 30)} <b>{escape(n)}</b><br><code>motor_ha.{u}</code></td><td>{escape(op)}</td></tr>')
    w.append("</table>\n")
    # karta domu
    w.append(naglowek("dom", d["dom"]))
    w.append(f"<p>{L['dom_tekst']}</p>\n<p><code>type: custom:motor-ha-dom</code></p>\n")
    # aktualizacja
    w.append(naglowek("aktualizacja", d["aktualizacja"]))
    w.append("<ul>" + "".join(f"<li>{x}</li>" for x in L["aktualizacja"]) + "</ul>\n")
    # pytania
    w.append(naglowek("pytania", d["pytania"]))
    for py, od in L["pytania"]:
        w.append(f"<details><summary><b>{escape(py)}</b></summary>\n<p>{od}</p>\n</details>\n")
    # licencja
    w.append(naglowek("licencja", d["licencja"]))
    w.append(f"<p>{L['licencja_tekst'].format(gh=gh)}</p>\n")
    return "\n".join(w)


def main() -> None:
    zapisz_obrazki()
    for j in JEZYKI:
        (KORZEN / T[j]["plik"]).write_text(readme(j), encoding="utf-8")
    print("README:", ", ".join(T[j]["plik"] for j in JEZYKI))


if __name__ == "__main__":
    main()
