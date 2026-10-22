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
from kroki_teksty import JAK, KROKI_ZRZUTY, K  # noqa: E402

MDI = json.loads((Path(__file__).parent / "mdi.json").read_text(encoding="utf-8"))
REPO = "superdarco78/Motor-HA"
GH = f"https://github.com/{REPO}"
RAW = f"https://raw.githubusercontent.com/{REPO}/main/"
HACS = f"https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=Motor-HA&category=integration"
DODAJ = "https://my.home-assistant.io/redirect/config_flow_start/?domain=motor_ha"
RESTART = "https://my.home-assistant.io/redirect/system_dashboard/"
PANELE = "https://my.home-assistant.io/redirect/lovelace_dashboards/"
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


def ikona_szeroka_svg(sciezka: str) -> str:
    """Ta sama ikona, ale obrazek ma 2000 px „szerokości własnej”: z width=100% rozpycha komórkę tabeli na GitHubie
    (tabela ma tam width:max-content), a ikona zostaje na środku w swojej wysokości."""
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="96" viewBox="0 0 96 96">'
            f'<circle cx="48" cy="48" r="44" fill="none" stroke="{AKCENT}" stroke-width="5"/>'
            f'<path d="{sciezka}" fill="{GLOWNY}" transform="translate(22 22) scale(2.1667)"/></svg>')


def linia_svg(szer: int) -> str:
    """Kreska pod nagłówkiem kolumny w kolorze akcentu – jednocześnie rozpycha tabelę na całą szerokość."""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{szer}" height="4" viewBox="0 0 {szer} 4" preserveAspectRatio="none">'
            f'<rect width="{szer}" height="4" rx="2" fill="{AKCENT}"/></svg>')


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


def pasek_kawalek_svg(i: int, n: int, nazwa: str, sciezka: str) -> str:
    """Jeden krok paska jako osobny obrazek – w README każdy jest linkiem do swojego kroku z obrazkiem."""
    krok, r = 116, 22
    wys, cx, cy = 2 * r + 40, krok / 2, r + 4
    cz = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{krok}" height="{wys}" viewBox="0 0 {krok} {wys}" '
          'font-family="Roboto, Noto Sans, Arial, sans-serif">']
    if i > 0:
        cz.append(f'<line x1="0" y1="{cy}" x2="{cx - r - 4}" y2="{cy}" stroke="{GLOWNY}" stroke-width="2.5"/>')
    if i < n - 1:
        cz.append(f'<line x1="{cx + r + 4}" y1="{cy}" x2="{krok}" y2="{cy}" stroke="{GLOWNY}" stroke-width="2.5"/>')
    s = r * 1.15 / 12
    cz.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{AKCENT}" stroke-width="3"/>'
              f'<path d="{sciezka}" fill="{GLOWNY}" transform="translate({cx - 12 * s} {cy - 12 * s}) scale({s})"/>'
              f'<text x="{cx}" y="{2 * r + 26}" text-anchor="middle" font-size="13" font-weight="500" fill="{SZARY}">'
              f'{i + 1}. {escape(nazwa)}</text></svg>')
    return "".join(cz)


# ikona przy każdym kroku instalacji (według obrazka; krok bez obrazka = przejście kreatora)
IKONY_INSTALACJI = {"hacs-1": "link-variant", "hacs-2": "plus-box", "hacs-3": "download", "restart": "restart",
                    "start": "auto-fix", None: "gesture-tap", "panel": "view-dashboard"}


def zapisz_obrazki() -> None:
    from custom_components.motor_ha.pasek import IKONY as SCIEZKI_KROKOW   # te same ikony co pasek w kreatorze
    kat = KORZEN / "img" / "ikony"
    kat.mkdir(parents=True, exist_ok=True)
    potrzebne = set(KAFLE_IKONY) | set(DZIALY.values()) | set(FUNKCJE_IKONY.values()) | {i for _, i in ENCJE} \
        | set(USLUGI.values()) | set(POWIADOMIENIA.values()) | set(IKONY_GRUP.values()) | set(IKONY_INSTALACJI.values()) \
        | {"wrench", "help-circle"}
    for n in sorted(potrzebne):
        (kat / f"{n}.svg").write_text(ikona_svg(MDI[n]), encoding="utf-8")
        (kat / f"w-{n}.svg").write_text(ikona_szeroka_svg(MDI[n]), encoding="utf-8")
    (kat / "puste-440.svg").write_text('<svg xmlns="http://www.w3.org/2000/svg" width="440" height="1"/>', encoding="utf-8")
    for szer in (1000, 2000):
        (kat / f"linia-{szer}.svg").write_text(linia_svg(szer), encoding="utf-8")
    for k, d in SCIEZKI_KROKOW.items():
        (kat / f"krok-{k}.svg").write_text(ikona_svg(d), encoding="utf-8")
    (KORZEN / "img" / "kreator").mkdir(exist_ok=True)
    for j in JEZYKI:
        t = json.loads((Path(__file__).parent / "teksty" / f"{j}.json").read_text(encoding="utf-8"))
        (KORZEN / "img" / "kreator" / f"pasek-{j}.svg").write_text(
            pasek_svg(KROKI_PODST, t["selector"]["kroki"], SCIEZKI_KROKOW), encoding="utf-8")
        for i, k in enumerate(KROKI_PODST):
            (KORZEN / "img" / "kreator" / f"pasek-{j}-{i + 1}.svg").write_text(
                pasek_kawalek_svg(i, len(KROKI_PODST), t["selector"]["kroki"].get(k, k), SCIEZKI_KROKOW[k]), encoding="utf-8")


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


def wik(nazwa: str, wys: int) -> str:
    """Ikona na środku komórki, która rozpycha kolumnę (patrz ikona_szeroka_svg)."""
    return f'<img src="{RAW}img/ikony/w-{nazwa}.svg" width="100%" height="{wys}" alt="">'


def glowka(*kolumny: tuple[str, int]) -> str:
    """Wiersz nagłówka: tekst + kreska akcentu; kreski 1000/2000 px dzielą szerokość tabeli 1:2."""
    return "<tr>" + "".join(f'<th align="left">{escape(t)}<br><img src="{RAW}img/ikony/linia-{sz}.svg" width="100%" height="4" alt=""></th>'
                            for t, sz in kolumny) + "</tr>"


def zrzut(j: str, u: str, szer: str, alt: str, link: str = "") -> str:
    """Zrzut z HA: na GitHubie zawsze ciemny; w HA motor-ha-hacs.js dobiera jasny/ciemny według motywu HA.
    Link (np. kotwica kroku) zamiast otwierania samego obrazka."""
    i = f'<img src="{u}-ciemny.webp" width="{szer}" alt="{escape(alt)}">'
    return f'<a href="{link}">{i}</a>' if link else i


def obraz(j: str, nazwa: str, szer: str, alt: str, link: str = "") -> str:
    return f'<p align="center">{zrzut(j, f"{RAW}img/kroki/{j}/{nazwa}", szer, alt, link)}</p>\n'


# przyciski My Home Assistant w krokach instalacji: (link, kolor, logo)
GUZIKI = {"hacs": (HACS, "009AC7", "homeassistantcommunitystore"), "dodaj": (DODAJ, "FF9800", "homeassistant"),
          "restart": (RESTART, "009AC7", "homeassistant"), "panel": (PANELE, "009AC7", "homeassistant")}


def nawigacja(baza: str, kt: dict, spis: str, wstecz: str | None, dalej: str | None) -> str:
    """Linki pod krokiem: poprzedni · spis treści · następny (w HA przewijają opis na miejscu)."""
    cz = []
    if wstecz:
        cz.append(f'<a href="{baza}#{wstecz}">⬅️ {escape(kt["poprzedni"])}</a>')
    cz.append(f'<a href="{baza}#spis">📑 {escape(spis)}</a>')
    if dalej:
        cz.append(f'<a href="{baza}#{dalej}">{escape(kt["nastepny"])} ➡️</a>')
    return '<p align="center"><sub>' + " · ".join(cz) + "</sub></p>\n"


def klik(tytul: str, lista: list[str]) -> str:
    return f"<p><b>{escape(tytul)}</b></p>\n<ol>" + "".join(f"<li>{x}</li>" for x in lista) + "</ol>\n" if lista else ""


MOTOR = "https://my.home-assistant.io/redirect/integration/?domain=motor_ha"
AKTUALIZACJE = "https://my.home-assistant.io/redirect/updates/"


def jak(tj: dict, guzik: str, link: str, kroki: list[str], rada: str = "") -> str:
    """„Jak to zrobić”: przycisk do właściwego miejsca w HA, kroki i porada."""
    w = f'<h3>{ik("gesture-tap", 28)} {escape(tj["tytul"])}</h3>\n<p align="center">{przycisk(tj[guzik], "009AC7", "homeassistant", link)}</p>\n'
    if kroki:
        w += "<ol>" + "".join(f"<li>{x}</li>" for x in kroki) + "</ol>\n"
    if rada:
        w += f"<p>💡 {rada}</p>\n"
    return w


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
          odznaka(o["pobrania"], "", "009AC7", "", f"{gh}/releases", f"github/downloads/{REPO}/total"),
          odznaka(o["gwiazdki"], "", "009AC7", "github", f"{gh}/stargazers", f"github/stars/{REPO}"),
          odznaka("HACS", "Custom", "009AC7", "homeassistantcommunitystore", "https://hacs.xyz"),
          "<br>",
          odznaka("Home Assistant", "2024.12+", "009AC7", "homeassistant", "https://www.home-assistant.io/"),
          odznaka(o["jezyki"], "14", "009AC7", "googletranslate", f"{gh}#licencja"),
          odznaka(o["licencja"], "CC BY-NC-SA 4.0", "009AC7", "", f"{gh}/blob/main/LICENSE"),
          odznaka(o["zgloszenia"], "", "009AC7", "github", f"{gh}/issues", f"github/issues/{REPO}"),
          "<br>",
          odznaka("HACS", "", "009AC7", "homeassistantcommunitystore", f"{gh}/actions/workflows/sprawdz.yml",
                  f"github/actions/workflow/status/{REPO}/sprawdz.yml?branch=main&event=push"),
          odznaka(o["forum"], "Home Assistant", "009AC7", "discourse", "https://community.home-assistant.io/"),
          odznaka(o["forum_pl"], "arturhome.pl", "009AC7", "discourse", "https://forum.arturhome.pl/")]
    w.append("</p>\n")
    # języki
    w.append('<p align="center">')
    for x in JEZYKI:
        plik = "" if x == "pl" else f"/blob/main/{T[x]['plik']}"
        w.append(f'<a href="{gh}{plik}"><img src="{RAW}img/jezyki/{x}{"-on" if x == j else ""}.svg" width="19%" alt="{T[x]["nazwa_jezyka"]}"></a>')
    w.append("</p>\n")
    # baner z przyciskiem HACS
    w.append(f'<p align="center"><a href="{HACS}"><img src="{RAW}img/baner/{j}.svg" width="100%" alt="Motor HA – {escape(L["hacs"])}"></a></p>\n')
    # animacja (w HA zamienia się na żywą symulację)
    w.append(f'<p align="center">{zrzut(j, f"{RAW}img/pokaz/{j}", "100%", L["pokaz"])}<sub>{escape(L["pokaz"])}</sub></p>\n')
    w.append(f'<h1 align="center">Motor HA</h1>\n<p align="center"><b>{escape(L["podtytul"])}</b></p>\n')
    w.append(f'<p align="center">{L["wstep"]}</p>\n')
    w.append(f"> [!NOTE]\n> {L['uwaga']}\n")
    # przyciski
    w.append('<p align="center">'
             + przycisk(L["hacs"], "009AC7", "homeassistantcommunitystore", HACS) + " "
             + przycisk(L["dodaj"], "FF9800", "homeassistant", DODAJ) + "</p>\n")
    # kafelki
    # 2 kolumny – czytelne także na telefonie; ikona nad tytułem w tej samej komórce
    w.append('<table>')
    for r in range(4):
        w.append("<tr>")
        for i in (2 * r, 2 * r + 1):
            ty, op = L["kafle"][i]
            w.append(f'<td align="center" valign="top" width="50%"><a href="{gh}{"" if j == "pl" else "/blob/main/" + L["plik"]}#{KAFLE_CEL[i]}">{wik(KAFLE_IKONY[i], 56)}<br>'
                     f'<b>{escape(ty)}</b></a><br><sub>{escape(op)}</sub></td>')
        w.append("</tr>")
    w.append("</table>\n")
    # spis treści w 2 kolumnach
    dz = list(L["dzialy"].items())
    # kafelki po 3 w rzędzie: ikona nad nazwą, jedna pozycja w komórce, cała szerokość strony
    w.append(f"<a name=\"spis\"></a>\n<h2>{ik('format-list-bulleted', 34)} {escape(L['spis'])}</h2>\n<table>")
    for i in range(0, len(dz), 3):
        rzad = dz[i:i + 3]
        w.append("<tr>" + "".join(
            f'<td align="center" valign="top"><a href="{gh}{"" if j == "pl" else "/blob/main/" + L["plik"]}#{kl}">{wik(DZIALY[kl], 40)}<br><b>{escape(n)}</b></a></td>'
            for kl, n in rzad) + '<td></td>' * (3 - len(rzad)) + "</tr>")
    w.append("</table>\n")
    d = L["dzialy"]
    # instalacja
    w.append(naglowek("instalacja", d["instalacja"]))
    kt = K[j]
    baza = f'{gh}{"" if j == "pl" else "/blob/main/" + L["plik"]}'
    ile = len(kt["instalacja"])
    # klikany spis kroków instalacji
    w.append("<ol>" + "".join(f'<li><a href="{baza}#krok-{n}">{escape(x[2])}</a></li>' for n, x in enumerate(kt["instalacja"], 1)) + "</ol>\n")
    for nr, (img, guzik, tytul, lista, uwaga) in enumerate(kt["instalacja"], 1):
        w.append(f'<a name="krok-{nr}"></a>\n<h3>{ik(IKONY_INSTALACJI[img], 28)} {nr}. {escape(tytul)}</h3>\n')
        # przycisk i obrazek prowadzą do tego samego miejsca w Twoim HA (obrazki HACS – do repozytorium w HACS)
        link = f'{gh}{"" if j == "pl" else "/blob/main/" + L["plik"]}#krok-{nr}'
        if guzik:
            g = GUZIKI[guzik]
            napis = {"hacs": L["hacs"], "dodaj": L["dodaj"]}.get(guzik) or kt["guzik_" + guzik]
            w.append(f'<p align="center">{przycisk(napis, g[1], g[2], g[0])}</p>\n')
        if img:
            # mały zrzut, po kliknięciu duży (GitHub otwiera obrazek, w HA wyskakuje – motor-ha-hacs.js)
            w.append(obraz(j, img, "50%" if img == "start" else "70%", tytul))
        w.append(klik(kt["co_kliknac"], lista))
        if uwaga:
            w.append(f"<p>ℹ️ {uwaga}</p>\n" if img else f'<p>➡️ <a href="{gh}{"" if j == "pl" else "/blob/main/" + L["plik"]}#kreator-krok">{escape(uwaga)}</a></p>\n')
        w.append(nawigacja(baza, kt, L["spis"], f"krok-{nr - 1}" if nr > 1 else None, f"krok-{nr + 1}" if nr < ile else "kreator"))
    w.append(f"<h3>{ik('wrench', 28)} {escape(L['instalacja_reczna'])}</h3>\n<p>{L['instalacja_reczna_tekst'].format(gh=gh)}</p>\n")
    # kreator
    w.append(naglowek("kreator", d["kreator"]))
    w.append(f'<p>{L["kreator_wstep"]}</p>\n')
    # pasek kroków: każdy krok to link do swojego kroku z obrazkiem niżej (bez odstępów – nic się nie zawija)
    w.append('<p align="center">' + "".join(
        f'<a href="{gh}{"" if j == "pl" else "/blob/main/" + L["plik"]}#kreator-{KROKI_ZRZUTY.index(k) + 1}">'
        f'<img src="{RAW}img/kreator/pasek-{j}-{i + 1}.svg" width="10%" alt="{i + 1}. {escape(t["selector"]["kroki"].get(k, k))}"></a>'
        for i, k in enumerate(KROKI_PODST)) + "</p>\n")
    kk = L["kreator_kolumny"]
    w.append("<table>" + glowka((f"{kk[0]} · {kk[1]}", 1000), (kk[2], 1000)))
    for nr, kr in enumerate(KROKI, 1):
        x = t["kroki"][kr]
        tyt = f'<b>{nr}. {escape(x["t"])}</b>'
        if kr in KROKI_ZRZUTY:   # krok z obrazkiem niżej – tytuł jest linkiem do niego
            tyt = f'<a href="{baza}#kreator-{KROKI_ZRZUTY.index(kr) + 1}">{tyt}</a>'
        w.append(f'<tr><td>{ik("krok-" + kr, 36)} {tyt}<br>{escape(x["co"])}</td>'
                 f'<td>{escape(x["poco"].split(chr(10))[0])}</td></tr>')
    w.append("</table>\n")
    w.append(f"<p>{L['kreator_dodatkowe']}</p>\n")
    w.append(f'<a name="kreator-krok"></a>\n<h3>{escape(kt["kreator_obrazki"])}</h3>\n')
    # kroki jeden pod drugim: tytuł, obrazek na całą szerokość, co kliknąć – czytelne też na telefonie
    for nr, kr in enumerate(KROKI_ZRZUTY, 1):
        x = t["kroki"][kr]
        w.append(f'<a name="kreator-{nr}"></a>\n<h4>{ik("krok-" + kr, 28)} {nr}. {escape(x["t"])}</h4>\n')
        w.append(obraz(j, f"krok-{nr:02d}", "50%", x["t"]))
        w.append(klik(kt["co_kliknac"], [escape(x["co"]), f'<b>{kt["zatwierdz" if nr == len(KROKI_ZRZUTY) else "dalej"]}</b>']))
        w.append(nawigacja(baza, kt, L["spis"], f"kreator-{nr - 1}" if nr > 1 else "kreator", f"kreator-{nr + 1}" if nr < len(KROKI_ZRZUTY) else "oslony"))
    # osłony
    w.append(naglowek("oslony", d["oslony"]))
    w.append(f"<p>{escape(L['oslony_wstep'])}</p>\n")
    for g, podgrupy in GRUPY.items():
        # każda podgrupa to jeden obrazek na całą szerokość: tytuł i kafelki tej samej wielkości, równo rozłożone
        # (img/oslony-rzedy, robione z img/oslony-kafle; na GitHubie ciemne, w HA według motywu – motor-ha-hacs.js)
        w.append(f"<h3>{ik(IKONY_GRUP[g], 28)} {escape(k['grupy'][g])}</h3>\n")
        for pg, typy in podgrupy.items():
            opis = ", ".join(k["oslony"][ty] for ty in typy)
            w.append(f'<p><img src="{RAW}img/oslony-rzedy/{j}-{pg}-ciemny.webp" width="100%" alt="{escape(k["grupy"][pg])}: {escape(opis)}"></p>\n')
    # automatyka
    w.append(naglowek("automatyka", d["automatyka"]))
    w.append(f"<p>{L['automatyka_wstep']}</p>\n")
    from custom_components.motor_ha.const import FUNKCJE   # noqa: PLC0415
    ka = L["automatyka_kolumny"]
    for tytul, zaaw in ((L["automatyka_podst"], False), (L["automatyka_zaaw"], True)):
        w.append(f'<h3>{escape(tytul)}</h3>\n<table>' + glowka((ka[0], 1000), (ka[1], 2000)))
        for f, (_, tylko_zaaw) in FUNKCJE.items():
            if tylko_zaaw == zaaw:
                n, op = t["f"][f]
                w.append(f'<tr><td>{ik(FUNKCJE_IKONY[f], 32)} <b>{escape(n)}</b></td><td>{escape(op)}</td></tr>')
        w.append("</table>\n")
    w.append(jak(JAK[j], "motor", MOTOR, JAK[j]["konfiguruj"], JAK[j]["automatyka"]))
    # bramy
    w.append(naglowek("bramy", d["bramy"]))
    w.append("> [!IMPORTANT]\n> " + L["bramy_tekst"][0] + "\n\n")
    w.append(f"<p>{L['bramy_tekst'][1]}</p>\n<p>{L['bramy_tekst'][2]}</p>\n")
    for pg, typy in GRUPY["brama"].items():
        opis = ", ".join(k["oslony"][ty] for ty in typy)
        w.append(f'<p><img src="{RAW}img/oslony-rzedy/{j}-{pg}-ciemny.webp" width="100%" alt="{escape(k["grupy"][pg])}: {escape(opis)}"></p>\n')
    # powiadomienia
    w.append(naglowek("powiadomienia", d["powiadomienia"]))
    tr = json.loads((KORZEN / "custom_components" / "motor_ha" / "translations" / f"{j}.json").read_text(encoding="utf-8"))
    w.append(f"<p>{escape(L['powiadomienia_wstep'])}</p>\n<table>" + glowka((tr["config"]["step"]["powiadomienia"]["data"]["powiadom"], 2000)))
    for p, ikona in POWIADOMIENIA.items():
        w.append(f'<tr><td>{ik(ikona, 30)} {escape(t["selector"]["powiadomienia"][p])}</td></tr>')
    w.append("</table>\n")
    w.append(jak(JAK[j], "motor", MOTOR, JAK[j]["konfiguruj"], JAK[j]["powiadomienia"]))
    # encje i usługi
    w.append(naglowek("encje", d["encje"]))
    w.append(f"<p>{escape(L['encje_wstep'])}</p>\n")
    ke = L["encje_kolumny"]
    w.append("<table>" + glowka((ke[0], 1000), (ke[1], 2000)))
    for e, ikona in ENCJE:
        nazwa = "Motor HA" if e == "cover" else t["encje"][e]
        w.append(f'<tr><td>{ik(ikona, 30)} <b>{escape(nazwa)}</b></td><td>{escape(L["encje_opisy"][e])}</td></tr>')
    w.append("</table>\n")
    w.append(jak(JAK[j], "motor", MOTOR, [], JAK[j]["encje"]))
    w.append(f"<h3>{escape(L['uslugi_tytul'])}</h3>\n<table>" + glowka((ka[0], 1000), (ka[1], 2000)))
    for u, ikona in USLUGI.items():
        n, op, _ = t["uslugi"][u]
        w.append(f'<tr><td>{ik(ikona, 30)} <b>{escape(n)}</b><br><code>motor_ha.{u}</code></td><td>{escape(op)}</td></tr>')
    w.append("</table>\n")
    # karta domu
    w.append(naglowek("dom", d["dom"]))
    w.append(f"<p>{L['dom_tekst']}</p>\n<p><code>type: custom:motor-ha-dom</code></p>\n")
    w.append(jak(JAK[j], "panele", PANELE, JAK[j]["dom"]))
    # aktualizacja
    w.append(naglowek("aktualizacja", d["aktualizacja"]))
    w.append("<ul>" + "".join(f"<li>{x}</li>" for x in L["aktualizacja"]) + "</ul>\n")
    w.append(jak(JAK[j], "aktualizacje", AKTUALIZACJE, JAK[j]["aktualizacja"]))
    # pytania
    w.append(naglowek("pytania", d["pytania"]))
    for py, od in L["pytania"]:
        w.append(f"<h3>{ik('help-circle', 28)} {escape(py)}</h3>\n<p>{od}</p>\n")
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
