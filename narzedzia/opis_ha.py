"""Opis Motor HA w HACS: README (5 języków) → strona w stylu HA (custom_components/okno_ha/www/opis/<język>.html).

Na GitHubie zostaje README. W HACS integracja pokazuje tę stronę w osobnej ramce: te same elementy co w HA
(nagłówki, tekst, kafelki, karty, przyciski, tabele, ramki informacji), kolory i rozmiary z motywu HA.
Treść bierze się z README, więc nic nie ginie i wszystkie języki są zawsze takie same jak na GitHubie.

Uruchom po każdej zmianie README:  python3 narzedzia/opis_ha.py
Test tests/test_opis.py pilnuje, żeby wygenerowane pliki były aktualne.
"""
from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

import markdown
from urllib.parse import unquote

KORZEN = Path(__file__).resolve().parent.parent
WYJSCIE = KORZEN / "custom_components" / "okno_ha" / "www" / "opis"
MDI = json.loads((Path(__file__).parent / "mdi.json").read_text(encoding="utf-8"))
JEZYKI = {"pl": "README.md", "en": "README_EN.md", "de": "README_DE.md", "fr": "README_FR.md", "cs": "README_CS.md"}
GH = "https://github.com/superdarco78/Motor-HA"
RAW = "https://raw.githubusercontent.com/superdarco78/"

# 8 kafelków funkcji (na GitHubie obrazki z tekstem) – w HA prawdziwe kafelki z tekstem HA
KAFLE_IKONY = ["weather-partly-cloudy", "gesture-swipe-vertical", "auto-fix", "window-open-variant",
               "timer-outline", "palette", "theme-light-dark", "translate"]
KAFLE = {
    "pl": [["Pogoda", "Prawdziwa pogoda za oknem: słońce, deszcz, śnieg, noc"], ["Sterowanie palcem", "Przeciągnij roletę w górę albo w dół"], ["Kreator", "7 prostych kroków, wszystko ustawi sam"], ["Czujnik okna", "Pokazuje okno uchylone i otwarte"], ["Prędkość silnika", "Roleta na ekranie jedzie jak prawdziwa"], ["Kolory", "Ponad 30 kolorów i okleiny drewna"], ["Jasny i ciemny", "Pasuje do motywu Home Assistanta"], ["Polski i angielski", "Język sam z Twojego profilu HA"]],
    "en": [["Real weather", "Sun, rain, snow and night outside the window"], ["Swipe to move", "Drag the blind up or down"], ["Setup wizard", "7 easy steps, sets up everything"], ["Window sensor", "Shows a tilted or open window"], ["Motor speed", "Moves just like your real blind"], ["Colours", "30+ colours and wood finishes"], ["Light and dark", "Matches your Home Assistant theme"], ["Polish and English", "Language from your HA profile"]],
    "de": [["Wetter", "Sonne, Regen, Schnee und Nacht vor dem Fenster"], ["Wischen", "Rollo mit dem Finger hoch oder runter ziehen"], ["Assistent", "7 einfache Schritte, stellt alles selbst ein"], ["Fenstersensor", "Zeigt gekippte und offene Fenster"], ["Motortempo", "Fährt wie dein echtes Rollo"], ["Farben", "Über 30 Farben und Holzdekore"], ["Hell und dunkel", "Passt zu deinem Home-Assistant-Design"], ["Polnisch und Englisch", "Sprache aus deinem HA-Profil"]],
    "fr": [["Météo", "Soleil, pluie, neige et nuit derrière la fenêtre"], ["Glisser", "Monte ou descends le store avec un doigt"], ["Assistant", "7 étapes simples, il règle tout"], ["Capteur de fenêtre", "Montre une fenêtre entrouverte ou ouverte"], ["Vitesse du moteur", "Bouge comme ton vrai store"], ["Couleurs", "Plus de 30 couleurs et finitions bois"], ["Clair et sombre", "Suit le thème de Home Assistant"], ["Polonais et anglais", "Langue de ton profil HA"]],
    "cs": [["Počasí", "Slunce, déšť, sníh a noc za oknem"], ["Tažení prstem", "Roletu táhni prstem nahoru nebo dolů"], ["Průvodce", "7 jednoduchých kroků, vše nastaví sám"], ["Okenní senzor", "Ukáže vyklopené i otevřené okno"], ["Rychlost motoru", "Jede jako tvoje skutečná roleta"], ["Barvy", "Přes 30 barev a dřevodekorů"], ["Světlý a tmavý", "Ladí s motivem Home Assistant"], ["Polština a angličtina", "Jazyk podle tvého profilu HA"]],
}
CHIPY_W_HA = ("/v/release/", "/badge/HACS", "/badge/Home%20Assistant", "/LICENSE", "/issues", "logo=discourse")
CHIP_IKONY = [("/downloads/", "download"), ("/stars/", "star-outline"), ("commit-activity", "chart-line"), ("logo=homeassistantcommunitystore", "store"),
              ("logo=homeassistant", "home-assistant"), ("googletranslate", "translate"), ("licen", "scale-balance"), ("/actions/", "check-circle-outline"),
              ("/issues/", "bug"), ("maintainer", "github"), ("discourse", "forum")]
# przyciski My Home Assistant (na GitHubie obrazki) → przyciski HA z ikoną
PRZYCISKI_IKONY = {"hacs_repository": "store", "config_flow_start": "puzzle", "config_flow_start2": "puzzle",
                   "integration": "puzzle", "updates": "update"}
# „Jedna karta – każda osłona” i galeria: żywa karta Motor HA (sceny jak w okno-ha-galeria.js)
POKAZ_SCENY = ["deszcz_oslona-zebra", "noc_oslona-plisa", "dzien_oslona-zewnetrzna", "zachod_oslona-zaluzja"]
# zrzuty okienek HA są rysowane ok. 2,45× większe (2370 px ≈ 967 px w HA); w HA pokazane 1:1
SKALA_ZRZUTOW = 2.45


def ikona(nazwa: str, klasa: str = "m-ik") -> str:
    d = MDI.get(nazwa)
    if d is None:
        raise SystemExit(f"brak ikony mdi:{nazwa} w narzedzia/mdi.json")
    return f'<span class="{klasa}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="{d}"/></svg></span>'


def tekst(s: str) -> str:
    """Tekst z HTML (do etykiet) – bez znaczników, z encjami."""
    return html.unescape(re.sub(r"<[^>]+>", "", s)).strip()


def kolo(s: str) -> str | None:
    m = re.search(r"img/kolo/([a-z0-9-]+)\.svg", s)
    return m.group(1) if m else None


class Opis:
    def __init__(self, jez: str, md: str) -> None:
        self.jez = jez
        self.linie = md.splitlines()
        self.i = 0
        self.wyj: list[str] = []
        self.kotwice: list[str] = []          # <a name> czekające na następny element
        self.ikony_sekcji: dict[str, str] = {}   # kotwica → ikona nagłówka (spis treści, pasek kroków)
        self.naglowki: dict[str, str] = {}       # kotwica → tekst nagłówka
        self.ostatni_naglowek = ""
        # najpierw ikony i teksty wszystkich nagłówków (spis treści jest przed sekcjami)
        oczekujace: list[str] = []
        for ln in self.linie:
            for k in re.findall(r'<a name="([^"]+)"></a>', ln):
                oczekujace.append(k)
            if re.match(r"<h[1-4]", ln):
                ik = kolo(ln)
                for k in oczekujace:
                    if ik:
                        self.ikony_sekcji[k] = ik
                    self.naglowki[k] = tekst(re.sub(r"<img[^>]*>", "", ln))
                oczekujace = []

    # --- linki: na GitHubie do GitHuba, w HA na miejscu ---
    def linki(self, s: str) -> str:
        def zamien(m: re.Match) -> str:
            h = html.unescape(m.group(1))
            if re.match(rf"^{re.escape(GH)}(/blob/main/README[^#]*)?#", h):
                return f'href="#{h.split("#", 1)[1]}" data-kotwica="{h.split("#", 1)[1]}"'
            jm = re.match(rf"^{re.escape(GH)}(?:/blob/main/README(?:_([A-Z]{{2}}))?\.md)?/?$", h)
            if jm:
                return f'href="{h}" data-jezyk="{(jm.group(1) or "PL").lower()}"'
            if h.startswith("https://my.home-assistant.io/redirect/"):
                return f'href="{h}" data-my="1"'
            if h.startswith("#"):
                return f'href="{h}" data-kotwica="{h[1:]}"'
            return f'href="{h}" target="_blank" rel="noopener"'
        return re.sub(r'href="([^"]*)"', zamien, s)

    def id_attr(self) -> str:
        if not self.kotwice:
            return ""
        pierwsza, *reszta = self.kotwice
        self.kotwice = []
        dodatkowe = "".join(f'<span id="{k}" class="m-kotwica"></span>' for k in reszta)
        self.wyj.append(dodatkowe) if dodatkowe else None
        return f' id="{pierwsza}"'

    def daj(self, s: str) -> None:
        self.wyj.append(s)

    # --- bloki ---
    def blok_html(self, koniec: str) -> str:
        """Linie od bieżącej do tej z `koniec` (włącznie)."""
        zebrane = []
        while self.i < len(self.linie):
            ln = self.linie[self.i]
            zebrane.append(ln)
            self.i += 1
            if koniec in ln:
                break
        return "\n".join(zebrane)

    def md_akapit(self) -> str:
        zebrane = []
        while self.i < len(self.linie) and self.linie[self.i].strip() and not self.linie[self.i].startswith("<") \
                and not self.linie[self.i].startswith(">") and not re.match(r"^-{3,}\s*$", self.linie[self.i]):
            zebrane.append(self.linie[self.i])
            self.i += 1
        return "\n".join(zebrane)

    def md(self, s: str) -> str:
        h = markdown.markdown(s, extensions=["fenced_code"])
        h = h.replace("<p>", '<p class="m-p">').replace("<ol>", '<ol class="m-lista">').replace("<ul>", '<ul class="m-lista">')
        h = h.replace("<pre>", '<pre class="m-kod">')
        return self.linki(h)

    def naglowek(self, ln: str) -> None:
        poziom = int(ln[2])
        ik = kolo(ln)
        tresc = re.sub(r"<img[^>]*>", "", ln)
        tresc = re.sub(r'<a name="[^"]*" href="[^"]*">\s*</a>', "", tresc)
        t = tekst(re.sub(r"<sub>.*?</sub>", "", tresc))
        self.ostatni_naglowek = t
        if "icon.png" in ln:   # tytuł strony
            self.daj(f'<h1 class="m-tytul"{self.id_attr()}><img class="m-logo" data-src="{RAW}Motor-HA/main/custom_components/okno_ha/brand/icon.png" alt=""><span>{html.escape(t)}</span></h1>')
            return
        tag = {1: "h1", 2: "h2", 3: "h3", 4: "h4"}[poziom]
        self.daj(f'<{tag} class="m-{tag}"{self.id_attr()}>{ikona(ik) if ik else ""}<span>{html.escape(t)}</span></{tag}>')

    def spis(self, ln: str) -> None:
        """Spis treści: dwie części, każda jako kafelki HA prowadzące do sekcji."""
        ik = kolo(ln)
        gm = re.search(r'<a href="([^"]+)">(.*?)</a>', ln)
        sub = re.search(r"<sub>(.*?)</sub>", ln)
        cel = gm.group(1).split("#", 1)[1]
        self.i += 1
        tabela = self.blok_html("</table>")
        kafle = []
        for href, t in re.findall(r'<a href="([^"]+)">(.*?)</a>', tabela):
            k = href.split("#", 1)[1]
            kafle.append(f'<a class="m-spis-k" href="#{k}" data-kotwica="{k}">{ikona(self.ikony_sekcji.get(k, "chevron-right"))}<span>{html.escape(tekst(t))}</span></a>')
        podpis = f'<span class="m-spis-sub">{html.escape(tekst(sub.group(1)).lstrip("· "))}</span>' if sub else ""
        self.daj(f'<div class="m-spis"><a class="m-spis-t" href="#{cel}" data-kotwica="{cel}">{ikona(ik) if ik else ""}<span>{html.escape(tekst(gm.group(2)))}</span>{podpis}</a>'
                 f'<div class="m-spis-kafle">{"".join(kafle)}</div></div>')

    def obrazek_figura(self, blok: str) -> None:
        img = re.search(r'<img [^>]*src="([^"]+)"[^>]*>', blok)
        src = img.group(1)
        alt = re.search(r'alt="([^"]*)"', img.group(0))
        alt = html.unescape(alt.group(1)) if alt else ""
        podpis = re.search(r"<br>\s*(?:<b>|<sub>)(.*?)(?:</b>|</sub>)", blok, re.S)
        podpis = tekst(podpis.group(1)) if podpis else ""
        if podpis.startswith("Kreator z kółkami: "):
            podpis = ""
        if podpis and (podpis == self.ostatni_naglowek or podpis in self.ostatni_naglowek):
            podpis = ""   # bez powtórzonego nagłówka pod obrazkiem
        skala = SKALA_ZRZUTOW if re.search(r"/img/(kroki\d+b?|kroki7b)/", src) else 1
        self.daj(f'<figure class="m-fig"{self.id_attr()}><img class="m-img" data-src="{src}" data-skala="{skala}" alt="{html.escape(alt)}" loading="lazy">'
                 + (f'<figcaption>{html.escape(podpis)}</figcaption>' if podpis else "") + "</figure>")

    def akapit_html(self, blok: str) -> None:
        tresc = re.sub(r"^<p[^>]*>|</p>$", "", blok.strip(), flags=re.S).strip()
        if tresc in ("&nbsp;", ""):
            return
        if "img.shields.io" in tresc:
            if tresc.count("img.shields.io") == 1 and "stargazers" in tresc:   # „Daj gwiazdkę” → zwykły przycisk HA (obrys)
                lab = re.search(r"label=([^&\"]+)", tresc)
                t = unquote(lab.group(1)).replace("⭐", "").strip() if lab else "GitHub"
                self.daj(f'<div class="m-przyciski"><a class="m-btn m-btn-obrys" href="{GH}/stargazers" target="_blank" rel="noopener">{ikona("star-outline", "m-btn-ik")}<span>{html.escape(t)}</span></a></div>')
                return
            # plakietki na górze: w HA chipy jak w HA (ikona + tekst), bez obrazków i bez liczb z zewnątrz
            chipy = []
            for href, src, alt in re.findall(r'<a href="([^"]+)"><img src="([^"]+)" alt="([^"]+)"', tresc):
                src = html.unescape(src)
                if not any(k in src + href for k in CHIPY_W_HA):   # w HA tylko najważniejsze (HACS sam pokazuje pobrania i gwiazdki)
                    continue
                st = re.search(r"/badge/(.+?)-(.+)-[0-9A-Fa-f]{6}\?", src)
                napis = f"{unquote(st.group(1))} {unquote(st.group(2)).replace('--', '-')}" if st else html.unescape(alt)
                if "/v/release/" in src:
                    napis, ik = html.unescape(alt), "tag"
                    napis = napis[:1].upper() + napis[1:]
                    chipy.append(f'<a class="m-chip" href="{href}" data-wersja="1">{ikona(ik, "m-chip-ik")}<span>{html.escape(napis)}</span></a>')
                    continue
                ik = next((i for k, i in CHIP_IKONY if k in src), "open-in-new")
                napis = napis[:1].upper() + napis[1:]
                chipy.append(f'<a class="m-chip" href="{href}">{ikona(ik, "m-chip-ik")}<span>{html.escape(napis)}</span></a>')
            self.daj(self.linki(f'<nav class="m-chipy">{"".join(chipy)}</nav>'))
            return
        if "/img/jezyki/" in tresc:
            chipy = []
            for href, src, alt in re.findall(r'<a href="([^"]+)"><img src="([^"]+)" alt="([^"]+)"', tresc):
                jm = re.search(r"README_([A-Z]{2})", href)
                kod = (jm.group(1) if jm else "PL").lower()
                chipy.append(f'<a class="m-chip" href="{href}" data-jezyk="{kod}"><span class="m-flaga">{kod.upper()}</span>{html.escape(alt)}</a>')
            self.daj(f'<nav class="m-jezyki">{"".join(chipy)}</nav>')
            return
        if "/img/maski/baner" in tresc:
            src = re.search(r'src="([^"]+)"', tresc).group(1)
            self.daj(f'<div class="m-baner"><img class="m-img" data-src="{src}" alt="Motor HA"></div>')
            return
        if "/img/pokaz7/" in tresc:
            podpis = re.search(r"<sub>(.*?)</sub>", tresc)
            self.daj(f'<div class="m-sym" data-sym="{html.escape(json.dumps({"sceny": [{"nazwa": n, "podpis": ""} for n in POKAZ_SCENY], "start": {"proste": True}}))}"></div>'
                     + (f'<p class="m-podpis">{html.escape(tekst(podpis.group(1)))}</p>' if podpis else ""))
            return
        if "z3-kafelki5-" in tresc:
            kafle = []
            for n, (href, _src) in enumerate(re.findall(r'<a href="([^"]+)"><img [^>]*src="([^"]+)"', tresc)):
                t, o = KAFLE[self.jez][n]
                k = href.split("#", 1)[1]
                kafle.append(f'<a class="m-kafel" href="#{k}" data-kotwica="{k}">{ikona(KAFLE_IKONY[n], "m-kafel-ik")}'
                             f'<span class="m-kafel-t">{html.escape(t)}</span><span class="m-kafel-o">{html.escape(o)}</span></a>')
            self.daj(f'<div class="m-kafle">{"".join(kafle)}</div>')
            return
        if "/img/maski/przed-" in tresc:
            alty = re.findall(r'alt="([^"]+)"', tresc)
            self.daj(f'<div class="m-sym"{self.id_attr()} data-sym="{html.escape(json.dumps({"sceny": [{"nazwa": "dzien_oslona-zebra", "podpis": ""}], "start": {"proste": True, "przed": [alty[0], alty[1] if len(alty) > 1 else ""]}}))}"></div>')
            return
        if "/img/maski/oslony" in tresc:
            self.daj(f'<div class="m-sym"{self.id_attr()} data-sym="{html.escape(json.dumps({"sceny": [{"nazwa": "dzien", "podpis": ""}], "start": {"oslona": "natynkowa"}}))}"></div>')
            return
        if re.search(r"/img/z3/animacja[a-z-]*\.webp", tresc):
            podpis = re.search(r"<sub>(.*?)</sub>", tresc)
            self.daj(f'<div class="m-sym"{self.id_attr()} data-sym="{html.escape(json.dumps({"sceny": [{"nazwa": "zachod_oslona-zebra", "podpis": ""}], "start": {"proste": True}}))}"></div>'
                     + (f'<p class="m-podpis">{html.escape(tekst(podpis.group(1)))}</p>' if podpis else ""))
            return
        if re.search(r"/img/kroki7/(?:[a-z]{2}/)?pasek[0-9a-z]+/", tresc):
            kroki = re.findall(r'<a href="([^"]+)"><img src="[^"]*/(\d)-(\d)\.svg"[^>]*alt="([^"]*)"', tresc)
            el = []
            for href, akt, nr, alt in kroki:
                k = href.split("#", 1)[1]
                stan = " on" if akt == nr else (" zrobione" if int(nr) < int(akt) else "")
                etykieta = re.sub(r"^[^:]*:\s*", "", html.unescape(alt))
                el.append(f'<a class="m-krok{stan}" href="#{k}" data-kotwica="{k}">{ikona(self.ikony_sekcji.get(k, "numeric-1"), "m-krok-k")}<span class="m-krok-t">{html.escape(etykieta)}</span></a>')
            self.daj(f'<nav class="m-kroki">{"".join(el)}</nav>')
            return
        if "/img/przyciski" in tresc:
            btn = []
            for href, src, alt in re.findall(r'<a href="([^"]+)"><img src="([^"]+)" alt="([^"]+)"', tresc):
                nm = re.search(r"/img/przyciski\d*/([a-z_0-9]+)-[a-z]{2}\.svg", src)
                ik = PRZYCISKI_IKONY.get(nm.group(1) if nm else "", "open-in-new")
                btn.append(f'<a class="m-btn" href="{href}" data-my="1">{ikona(ik, "m-btn-ik")}<span>{html.escape(html.unescape(alt))}</span></a>')
            self.daj(f'<div class="m-przyciski">{"".join(btn)}</div>')
            return
        if "<img" in tresc and re.search(r'<img [^>]*src="https://raw', tresc):
            self.obrazek_figura(tresc)
            return
        if tresc.startswith("ℹ️"):
            self.daj(f'<p class="m-uwaga">{ikona("information-outline", "m-uwaga-ik")}<span>{self.linki(tresc[2:].strip())}</span></p>')
            return
        klasa = "m-p m-srodek" if 'align="center"' in blok[:30] else "m-p"
        if re.fullmatch(r"(<b>[^<]*</b>\s*·?\s*)+", tresc):   # „⬅️ Przed · Po ➡️” – w HA karty są jedna pod drugą
            return
        self.daj(f'<p class="{klasa}"{self.id_attr()}>{self.linki(tresc)}</p>')

    def tabela(self, blok: str) -> None:
        if "z3-stany-" in blok:   # galeria → żywa karta, przyciski scen pod nią
            sceny = []
            for b, src in re.findall(r"<b>(.*?)</b>.*?<img src=\"[^\"]*z3-stany-(?:jasne|ciemne)-([a-z0-9_-]+)\.svg", blok, re.S):
                sceny.append({"nazwa": src, "podpis": tekst(b)})
            self.daj(f'<div class="m-sym"{self.id_attr()} data-sym="{html.escape(json.dumps({"sceny": sceny, "start": {"proste": True}}, ensure_ascii=False))}"></div>')
            return
        t = re.sub(r'<a name="[^"]*" href="[^"]*"><img [^>]*odstep\.png[^>]*></a>\s*(<br>)?', "", blok)
        t = re.sub(r"<img [^>]*odstep\.png[^>]*>\s*(<br>)?", "", t)
        t = re.sub(r'\s(width|align|border|role)="[^"]*"', "", t)

        def ik(m: re.Match) -> str:
            n = kolo(m.group(0))
            return ikona(n, "m-ik m-ik-t") if n else ""
        t = re.sub(r'<img [^>]*img/kolo/[^>]*>', ik, t)
        t = re.sub(r"<table[^>]*>", '<table>', t)
        self.daj(f'<div class="m-tabela"{self.id_attr()}>{self.linki(t)}</div>')

    def cytat(self) -> None:
        zebrane = []
        while self.i < len(self.linie) and self.linie[self.i].startswith(">"):
            zebrane.append(re.sub(r"^>\s?", "", self.linie[self.i]))
            self.i += 1
        zebrane = [z for z in zebrane if not re.match(r"^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$", z)]
        tresc = self.md("\n".join(zebrane))
        tresc = tresc.replace('<p class="m-p">', "<p>")
        self.daj(f'<div class="m-info"{self.id_attr()}>{ikona("information-outline", "m-info-ik")}<div>{tresc}</div></div>')

    def przetworz(self) -> str:
        L = self.linie
        while self.i < len(L):
            ln = L[self.i]
            s = ln.strip()
            if not s:
                self.i += 1
                continue
            kotw = re.fullmatch(r'<a name="([^"]+)"></a>', s)
            if kotw:
                self.kotwice.append(kotw.group(1))
                self.i += 1
                continue
            if re.match(r"^-{3,}$", s):
                self.daj('<hr class="m-hr">')
                self.i += 1
                continue
            if s.startswith(">"):
                self.cytat()
                continue
            if re.match(r"<h2><img [^>]*align=\"absmiddle\"", s):
                self.spis(s)
                continue
            if re.match(r"<h[1-4]", s):
                self.naglowek(s)
                self.i += 1
                continue
            if s.startswith("<table"):
                self.tabela(self.blok_html("</table>"))
                continue
            if s.startswith("<p"):
                self.akapit_html(self.blok_html("</p>"))
                continue
            if s.startswith("<b>") and s.endswith(":</b>"):   # „Co kliknąć:” – etykieta w kolorze akcentu, lista z numerami jak na zrzutach
                self.i += 1
                while self.i < len(L) and not L[self.i].strip():
                    self.i += 1
                lista = ""
                if self.i < len(L) and L[self.i].strip().startswith("<ol>"):
                    lista = self.blok_html("</ol>").replace("<ol>", '<ol class="m-numery">')
                self.daj(f'<div class="m-klik"><div class="m-klik-t">{html.escape(tekst(s))}</div>{self.linki(lista)}</div>')
                continue
            if s.startswith("<ol>") or s.startswith("<ul>"):
                self.daj(self.linki(self.blok_html("</" + s[1:3] + ">").replace("<ol>", '<ol class="m-lista">').replace("<ul>", '<ul class="m-lista">')))
                continue
            if s.startswith("<br>"):
                self.i += 1
                continue
            if s.startswith("```"):
                zebrane = [ln]
                self.i += 1
                while self.i < len(L):
                    zebrane.append(L[self.i])
                    self.i += 1
                    if L[self.i - 1].strip().startswith("```"):
                        break
                self.daj(self.md("\n".join(zebrane)))
                continue
            if s.startswith("<"):
                # inny pojedynczy HTML – jak akapit
                self.daj(f'<div class="m-p"{self.id_attr()}>{self.linki(s)}</div>')
                self.i += 1
                continue
            akapit = self.md_akapit()
            h = self.md(akapit)
            if self.kotwice:
                h = h.replace('<p class="m-p">', f'<p class="m-p"{self.id_attr()}>', 1)
            self.daj(h)
        return "\n".join(self.wyj)


def zbuduj(jez: str) -> str:
    md = (KORZEN / JEZYKI[jez]).read_text(encoding="utf-8")
    tresc = Opis(jez, md).przetworz()
    return f'<!-- Motor HA: opis w HA, wygenerowany z {JEZYKI[jez]} przez narzedzia/opis_ha.py – nie edytuj ręcznie -->\n<div class="m-opis" lang="{jez}">\n{tresc}\n</div>\n'


def main() -> int:
    WYJSCIE.mkdir(parents=True, exist_ok=True)
    sprawdz = "--sprawdz" in sys.argv
    zle = []
    for jez in JEZYKI:
        nowy = zbuduj(jez)
        plik = WYJSCIE / f"{jez}.html"
        if sprawdz:
            if not plik.is_file() or plik.read_text(encoding="utf-8") != nowy:
                zle.append(plik.name)
        else:
            plik.write_text(nowy, encoding="utf-8")
    if zle:
        print("Nieaktualne (uruchom python3 narzedzia/opis_ha.py):", ", ".join(zle))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
