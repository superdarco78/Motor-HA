"""Kreator Motor HA: najpierw „Co masz w domu” (zaznaczone po skanie), potem tylko pasujące kroki.

Ten sam kreator działa przy dodawaniu urządzenia i w „Konfiguruj”. Tryb Podstawowy ma kilka
prostych pytań, Zaawansowany pokazuje wszystkie opcje. Każda funkcja, która może sama ruszyć
osłoną, jest domyślnie wyłączona.
"""

from __future__ import annotations

import time
from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import selector as sel
from homeassistant.helpers.translation import async_get_translations

from .const import (
    LINK_KREATORA,
    START,
    BRAMY,
    OKNA,
    CONF_CZAS,
    CONF_CZUJNIK_LEWE,
    CONF_CZUJNIK_PRAWE,
    CONF_FOTO_STAN,
    CONF_KALIBRACJA_50,
    CONF_KALIBRUJ,
    CONF_KOLOR,
    CONF_KOLOR_WLASNY,
    CONF_NA_PANEL,
    CONF_NAZWA,
    CONF_KARTA,
    KARTA_Z_KREATORA,
    CONF_ODWROC,
    CONF_OSOBNO,
    CONF_OSLONA,
    CONF_OSOBY,
    CONF_POGODA,
    CONF_POKOJ,
    CONF_POWIADOM,
    CONF_POWIADOM_GDZIE,
    CONF_PREDKOSC_LEWA,
    CONF_PREDKOSC_PRAWA,
    CONF_RAMA,
    CONF_RAMA_WLASNA,
    CONF_RODZAJ_POKOJU,
    CONF_ROLETY,
    CONF_SKRZYDLA,
    CONF_SWIETA,
    CONF_TRYB_LEWE,
    CONF_TRYB_PRAWE,
    CONF_UKRYJ_ZRODLO,
    CONF_WYSOKOSC,
    CZUJNIKI,
    DOMAIN,
    DOMYSLNE,
    FUNKCJE,
    KOLORY,
    MAM,
    OSLONY_WEW,
    OSLONY_ZEW,
    PARAMETRY,
    PODSTAWOWY,
    POKOJE,
    POWIADOMIENIA,
    RAMY,
    TRYB,
    TRYBY_SKRZYDLA,
    URZADZENIA,
    Z_LAMELAMI,
    ZAAWANSOWANY,
    BRAMY as RODZAJE_BRAM,
)
from . import galeria, skan, ustawienia
from .graficzny import KREATOR, ZleDane, opcje_z_kreatora
from .uklad import CONF_UKLAD, MAX_POL
from .pasek import async_obrazek
from .urzadzenie import assist

WSTECZ = "wstecz"
IDZ = "idz_do"
# kroki z żywym podglądem okna (wygląd)
PODGLAD = ("rodzaj", "lamele", "kolory", "okno")
KOPIUJ = "kopiuj_z"

# które parametry pokazać przy włączonej funkcji (tryb podstawowy: tylko pierwsze z listy)
PARAMETRY_FUNKCJI: dict[str, list[str]] = {
    "harmonogram": ["harm_tryb", "przesuniecie", "otworz", "zamknij"],
    "dni": ["otworz_weekend", "zamknij_weekend"],
    "slonce": ["azymut", "slonce_temp", "slonce_poz", "szer_slonca", "min_wys_slonca"],
    "oslepianie": ["azymut", "obiekt_odl_m", "okno_wys_m"],
    "upal": ["azymut", "upal_prog"],
    "temp_pokoj": ["azymut", "temp_pokoj_prog"],
    "jasnosc": ["azymut", "jasnosc_prog"],
    "zima": ["azymut"],
    "wiatr": ["wiatr_prog"],
    "mroz": ["mroz_prog"],
    "posrednia": ["posrednia_godz", "posrednia_poz"],
    "obecnosc": ["obecnosc_rano"],
    "wakacje": ["wakacje_rozrzut"],
    "wietrzenie": ["wietrzenie_poz"],
    "drzwi": ["drzwi_min"],
    "granice": ["granica_min", "granica_max"],
    "drobne": ["drobne_prog"],
    "reczny": ["reczny_min"],
    "po_kolei": ["po_kolei_s"],
    "cisza": ["cisza_min"],
    "spie": ["spie_poz"],
    "alarm": ["alarm_poz"],
    "nikogo": ["nikogo_poz"],
}
GODZINY = {"otworz", "zamknij", "otworz_weekend", "zamknij_weekend", "posrednia_godz", "obecnosc_rano"}
PROCENTY = {"slonce_poz", "posrednia_poz", "wietrzenie_poz", "drzwi_min", "granica_min", "granica_max",
            "spie_poz", "alarm_poz", "nikogo_poz", "drobne_prog", "lamele_kat", "lamele_noc"}
JEDNOSTKI = {"azymut": "°", "szer_slonca": "°", "min_wys_slonca": "°", "slonce_temp": "°C", "upal_prog": "°C",
             "temp_pokoj_prog": "°C", "mroz_prog": "°C", "wiatr_prog": "km/h", "jasnosc_prog": "lx",
             "przesuniecie": "min", "reczny_min": "min", "cisza_min": "min", "wakacje_rozrzut": "min",
             "po_kolei_s": "s", "obiekt_odl_m": "m", "okno_wys_m": "m", "brama_minuty": "min"}
ZAKRESY = {"azymut": (0, 359, 1), "szer_slonca": (10, 90, 5), "min_wys_slonca": (0, 30, 1), "slonce_temp": (-10, 40, 1),
           "upal_prog": (20, 45, 1), "temp_pokoj_prog": (18, 35, 0.5), "mroz_prog": (-10, 5, 1), "wiatr_prog": (10, 100, 5),
           "jasnosc_prog": (0, 120000, 1000), "przesuniecie": (-120, 120, 5), "reczny_min": (10, 720, 10),
           "cisza_min": (0, 60, 1), "wakacje_rozrzut": (0, 90, 5), "po_kolei_s": (1, 60, 1),
           "obiekt_odl_m": (0.2, 8, 0.1), "okno_wys_m": (0.4, 4, 0.1), "brama_minuty": (1, 120, 1)}


def _lista(opcje: list[str], klucz: str, wiele: bool = False, lista: bool = False) -> sel.SelectSelector:
    return sel.SelectSelector(sel.SelectSelectorConfig(
        options=opcje, translation_key=klucz, multiple=wiele,
        mode=sel.SelectSelectorMode.LIST if lista or wiele else sel.SelectSelectorMode.DROPDOWN))


def _encja(domena: str | list[str], wiele: bool = False, klasa: str | list[str] | None = None,
           wyklucz: list[str] | None = None, tylko: list[str] | None = None) -> sel.EntitySelector:
    cfg: dict[str, Any] = {"domain": domena, "multiple": wiele}
    if tylko:
        cfg["include_entities"] = tylko   # sama lista pasujących (klasa niepotrzebna, a odcięłaby czujniki bez klasy)
    elif klasa:
        cfg["device_class"] = klasa
    if wyklucz:
        cfg["exclude_entities"] = wyklucz
    return sel.EntitySelector(sel.EntitySelectorConfig(**cfg))


def _liczba(klucz: str) -> sel.NumberSelector:
    if klucz in PROCENTY:
        return sel.NumberSelector(sel.NumberSelectorConfig(min=0, max=100, step=5, unit_of_measurement="%",
                                                           mode=sel.NumberSelectorMode.SLIDER))
    mn, mx, krok = ZAKRESY.get(klucz, (0, 1000, 1))
    return sel.NumberSelector(sel.NumberSelectorConfig(min=mn, max=mx, step=krok, unit_of_measurement=JEDNOSTKI.get(klucz),
                                                       mode=sel.NumberSelectorMode.BOX))


def _dom(o: dict[str, Any], klucz: str) -> dict[str, Any]:
    """Domyślna wartość pola z dotychczasowych ustawień."""
    v = o.get(klucz)
    return {} if v in (None, "", []) else {"default": v}


def _sug(v: Any) -> dict[str, Any]:
    return {} if v in (None, "", []) else {"description": {"suggested_value": v}}


class Kreator:
    """Wspólne kroki dla dodawania urządzenia i „Konfiguruj”."""

    hass: HomeAssistant
    o: dict[str, Any]
    tytul: str
    _znalezione: dict[str, list[str]]
    _historia: list[str]
    konfiguracja: bool = False

    # --- pomocnicze ---

    @property
    def mam(self) -> set[str]:
        return set(self.o.get(MAM) or [])

    @property
    def zaaw(self) -> bool:
        return self.o.get(TRYB) == ZAAWANSOWANY

    @property
    def brama(self) -> bool:
        """To urządzenie jest bramą: silnik ma klasę bramy/garażu albo wybrano rodzaj bramy.

        „Brama” na liście „Co masz w domu” znaczy tylko, że w domu jest brama – okno w salonie
        nie staje się przez to bramą."""
        stany = [s for e in self.o.get(CONF_ROLETY) or [] if (s := self.hass.states.get(e))]
        if any(skan.czy_brama(s) for s in stany):
            return True
        if any(s.attributes.get("device_class") for s in stany):
            return False
        return self.o.get(CONF_OSLONA) in BRAMY

    @property
    def roleta(self) -> str | None:
        r = self.o.get(CONF_ROLETY) or []
        return r[0] if r else None

    def dostepne_funkcje(self) -> list[str]:
        if self.brama:
            return []
        mam = self.mam | ({"zew"} if self.o.get(CONF_OSLONA) in OSLONY_ZEW else set())
        wynik = []
        for k, (wymaga, tylko_zaaw) in FUNKCJE.items():
            if tylko_zaaw and not self.zaaw or k == "licznik":
                continue
            if all(any(x in mam for x in w.split("|")) for w in wymaga):
                wynik.append(k)
        return wynik

    def kroki(self) -> list[str]:
        mam, zaaw, brama = self.mam, self.zaaw, self.brama
        k = ["tryb", "mam", "urzadzenie", "rodzaj"]
        if "lamele" in mam and not brama:
            k.append("lamele")
        if not brama:
            k += ["kolory", "okno"]
        if not brama and ({"okno"} & mam or zaaw and {"drzwi", "przeszkoda"} & mam):
            k.append("czujniki")
        if brama and "foto" in mam:
            k.append("fotokomorka")
        k.append("silnik")
        if not brama and {"pogoda", "temp", "temp_pokoj", "jasnosc", "wiatr", "deszcz", "drgania", "ostrzezenia"} & mam:
            k.append("pogoda")
        if not brama and ({"obecnosc", "ruch"} & mam or zaaw and {"osoby", "dym", "alarm"} & mam):
            k.append("domownicy")
        if not brama:
            k.append("automatyka")
            if self._z_parametrami():
                k.append("ustawienia")
        k.append("powiadomienia")
        if not self.konfiguracja:
            k.append("panel")
        return k

    def _z_parametrami(self) -> list[str]:
        f = [k for k in FUNKCJE if self.o.get(f"f_{k}")]
        return [k for k in f if k in PARAMETRY_FUNKCJI]

    async def _porada(self, krok: str) -> str:
        jezyk = self.hass.config.language
        t = await async_get_translations(self.hass, jezyk, "selector", {DOMAIN})
        pokoj = self.o.get(CONF_RODZAJ_POKOJU, "inny")
        for klucz in (f"{pokoj}_{krok}", f"ogolne_{krok}"):
            if v := t.get(f"component.{DOMAIN}.selector.porady.options.{klucz}"):
                return f"\n\n💡 {v}"
        return ""

    async def _formularz(self, krok: str, schemat: dict, bledy: dict[str, str] | None = None,
                         dodatki: dict[str, str] | None = None) -> ConfigFlowResult:
        lista = self.kroki()
        nr = lista.index(krok) if krok in lista else 0
        if nr > 0:
            schemat[vol.Optional(WSTECZ, default=False)] = sel.BooleanSelector()
        pasek = await async_obrazek(self.hass, lista, nr, self.hass.config.language,
                                    self._podglad() if krok in PODGLAD else None)
        # IDZ: kliknięcie w pasek kroków (karta dokłada je do danych formularza) – pole niewidoczne w formularzu
        return self.async_show_form(  # type: ignore[attr-defined]
            step_id=krok, data_schema=vol.Schema(schemat, extra=vol.ALLOW_EXTRA), errors=bledy or {}, last_step=krok == lista[-1] or getattr(self, "_jeden", None) == krok,
            description_placeholders={"pasek": f"![]({pasek}){self._link_kreatora()}", "nr": str(nr + 1),
                                      "z": str(len(lista)), "porada": await self._porada(krok),
                                      "nazwa": self.tytul or "", "galeria": "", **(dodatki or {})})

    def _link_kreatora(self) -> str:
        """Link widoczny tylko w zwykłym formularzu HA, czyli gdy strona nie ma skryptów Motor HA (np. przeglądarka
        wzięła z pamięci stronę HA zapisaną w trakcie restartu, zanim Motor HA wystartował). Kreator graficzny zasłania go."""
        napis = LINK_KREATORA.get(self.hass.config.language.split("-")[0], LINK_KREATORA["en"])
        wroc = "/config/integrations/dashboard/add?domain=motor_ha" if not self.konfiguracja \
            else "/config/integrations/integration/motor_ha"
        return f"\n\n**[🪄 {napis}](/{START}?do={wroc})**"

    def _podglad(self) -> dict[str, Any]:
        """Ustawienia wyglądu dla żywego podglądu okna w kreatorze (karta/src/kreator.js)."""
        return {k: self.o[k] for k in (CONF_OSLONA, CONF_KOLOR, CONF_RAMA, CONF_SKRZYDLA, CONF_OSOBNO, CONF_ODWROC,
                                       "wysokosc", CONF_KOLOR_WLASNY, CONF_RAMA_WLASNA) if self.o.get(k) not in (None, "")}

    async def _dalej(self, krok: str, dane: dict[str, Any] | None) -> ConfigFlowResult | None:
        """Zapisuje odpowiedzi i przechodzi do następnego (albo poprzedniego) kroku."""
        if dane is None:
            return None
        if KREATOR in dane:   # kreator graficzny (karta) wysłał gotowe ustawienia – od razu zapis
            try:
                self.o, tytul = opcje_z_kreatora(self.hass, self.o, dane[KREATOR])
            except ZleDane as err:
                return self.async_abort(reason=str(err))  # type: ignore[attr-defined]
            self.tytul = tytul or self.tytul
            return await self._koniec()
        wstecz = dane.pop(WSTECZ, False)
        idz = dane.pop(IDZ, None)
        self.o.update({k: v for k, v in dane.items() if not k.startswith("_")})
        lista = self.kroki()
        # pasek kroków: przy „Konfiguruj” od razu dowolny krok („Dalej” zapisuje), przy dodawaniu – tylko wstecz
        if idz in lista and idz != krok and (self.konfiguracja or lista.index(idz) < lista.index(krok)):
            if self.konfiguracja:
                self._jeden = idz
            return await getattr(self, f"async_step_{idz}")()
        if getattr(self, "_jeden", None) == krok and not wstecz:
            return await self._koniec()
        self._jeden = None
        lista = self.kroki()
        nr = lista.index(krok)
        cel = lista[max(0, nr - 1)] if wstecz else (lista[nr + 1] if nr + 1 < len(lista) else None)
        if cel is None:
            return await self._koniec()
        return await getattr(self, f"async_step_{cel}")()

    async def _koniec(self) -> ConfigFlowResult:
        raise NotImplementedError

    # --- kroki ---

    async def async_step_tryb(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if dane is not None:
            if (z := dane.pop(KOPIUJ, None)) and (wpis := self.hass.config_entries.async_get_entry(z)):
                self.o.update({k: v for k, v in wpis.options.items() if k not in (CONF_ROLETY, CONF_NAZWA, "karta")})
        if (w := await self._dalej("tryb", dane)) is not None:
            return w
        schemat: dict = {vol.Required(TRYB, default=self.o.get(TRYB, PODSTAWOWY)):
                         _lista([PODSTAWOWY, ZAAWANSOWANY], "tryb", lista=True)}
        inne = [e for e in self.hass.config_entries.async_entries(DOMAIN)
                if not self.konfiguracja or e.entry_id != getattr(self, "_entry_id", None)]
        if inne:
            schemat[vol.Optional(KOPIUJ)] = sel.SelectSelector(sel.SelectSelectorConfig(
                options=[sel.SelectOptionDict(value=e.entry_id, label=e.title) for e in inne],
                mode=sel.SelectSelectorMode.DROPDOWN))
        return await self._formularz("tryb", schemat)

    async def async_step_mam(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if (w := await self._dalej("mam", dane)) is not None:
            return w
        self._znalezione = await self._skan()
        domyslne = self.o.get(MAM)
        if domyslne is None:
            domyslne = skan.zaznaczone(self._znalezione)
        opcje = [k for k, tylko_zaaw in URZADZENIA.items() if self.zaaw or not tylko_zaaw]
        domyslne = [k for k in domyslne if k in opcje]
        t = await async_get_translations(self.hass, self.hass.config.language, "selector", {DOMAIN})
        nazwa = lambda k: t.get(f"component.{DOMAIN}.selector.{MAM}.options.{k}", k)  # noqa: E731
        znalezione = ", ".join(f"{nazwa(k)} ({len(v)})" for k, v in self._znalezione.items() if v and k in opcje)
        # silniki rolet i żaluzji (wybiera się je w następnym kroku) – też na liście znalezionych, na początku
        if n := len(self._znalezione.get("oslony", [])):
            rolety = "Silniki rolet i żaluzji" if self.hass.config.language.startswith("pl") else "Blind and shade motors"
            znalezione = f"{rolety} ({n})" + (", " + znalezione if znalezione else "")
        return await self._formularz("mam", {vol.Optional(MAM, default=domyslne): _lista(opcje, MAM, wiele=True)},
                                     dodatki={"znalezione": znalezione or "—"})

    async def _skan(self) -> dict[str, list[str]]:
        return skan.znajdz(self.hass)

    async def async_step_urzadzenie(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        bledy: dict[str, str] = {}
        if dane is not None and KREATOR in dane:
            return await self._dalej("urzadzenie", dane)
        if dane is not None:
            rolety = dane.get(CONF_ROLETY) or []
            if not dane.get(WSTECZ) and not rolety:
                bledy[CONF_ROLETY] = "brak_rolety"
            elif not dane.get(WSTECZ) and len(rolety) > (MAX_POL if self.o.get(CONF_UKLAD) else 2):
                bledy[CONF_ROLETY] = "za_duzo"
            else:
                if nazwa := str(dane.get(CONF_NAZWA) or "").strip():
                    self.tytul = nazwa
                elif rolety and (s := self.hass.states.get(rolety[0])):
                    self.tytul = s.name
                self._uzupelnij(rolety)
                if (w := await self._dalej("urzadzenie", dane)) is not None:
                    return w
        nasze = [w.entity_id for w in skan.er.async_get(self.hass).entities.values() if w.platform == DOMAIN]
        klasa = ["gate", "garage"] if self.brama else None
        schemat = {
            vol.Required(CONF_ROLETY, **_dom(self.o, CONF_ROLETY)): _encja("cover", True, klasa, nasze),
            vol.Optional(CONF_NAZWA, **_sug(self.tytul)): sel.TextSelector(),
            vol.Optional(CONF_POKOJ, **_sug(self.o.get(CONF_POKOJ) or self._pokoj()[0])): sel.AreaSelector(),
        }
        if not self.brama:
            # puste = rozpoznaj z pomieszczenia albo nazwy silnika (po „Dalej”)
            schemat[vol.Optional(CONF_RODZAJ_POKOJU, **_sug(self.o.get(CONF_RODZAJ_POKOJU) or self._pokoj()[1]))] = \
                _lista(POKOJE, "pokoje")
        schemat[vol.Optional(CONF_UKRYJ_ZRODLO, default=bool(self.o.get(CONF_UKRYJ_ZRODLO)))] = sel.BooleanSelector()
        return await self._formularz("urzadzenie", schemat, bledy)

    def _pokoj(self) -> tuple[str | None, str | None]:
        """(pomieszczenie, rodzaj) wybranego już silnika – podpowiedź w formularzu."""
        if not (r := self.roleta):
            return None, None
        s = self.hass.states.get(r)
        a = skan.obszar(self.hass, r)
        return a, skan.rodzaj_pokoju(self.hass, a, s.name if s else r)

    def _wybor(self, klucz: str, rodzaj: str, domena: str | list[str], wiele: bool = False,
               klasa: str | list[str] | None = None, wymagane: bool = False) -> tuple[Any, sel.EntitySelector]:
        """Pole encji z listą tylko tego, co pasuje (z pokoju osłony na górze), i samą podpowiedzią."""
        zn = getattr(self, "_znalezione", None) or skan.znajdz(self.hass)
        lista = skan.pasujace(self.hass, rodzaj, self.roleta, zn)
        teraz = self.o.get(klucz)
        for e in teraz if isinstance(teraz, list) else [teraz] if teraz else []:
            if lista and e not in lista:
                lista.append(e)   # wybrana wcześniej ręcznie zostaje na liście
        wartosc = teraz or (lista if wiele and rodzaj == "osoby" else skan.podpowiedz(self.hass, rodzaj, self.roleta, lista))
        pole = (vol.Required if wymagane else vol.Optional)(klucz, **_sug(wartosc))
        return pole, _encja(domena, wiele=wiele, klasa=klasa, tylko=lista or None)

    def _uzupelnij(self, rolety: list[str]) -> None:
        """Podpowiedzi po wyborze osłony: rodzaj, czujniki okna, prędkość silnika, pomieszczenie."""
        if not rolety:
            return
        pierwsza = rolety[0]
        s = self.hass.states.get(pierwsza)
        if list(self.o.get(CONF_ROLETY) or []) != list(rolety):
            # inny silnik (albo kopia ustawień z innego okna): podpowiedzi z poprzedniego pokoju nie pasują
            for k in (CONF_CZUJNIK_LEWE, CONF_CZUJNIK_PRAWE, CONF_PREDKOSC_LEWA, CONF_PREDKOSC_PRAWA):
                self.o.pop(k, None)
        if not self.o.get(CONF_POKOJ) and (a := skan.obszar(self.hass, pierwsza)):
            self.o[CONF_POKOJ] = a
        if not self.o.get(CONF_RODZAJ_POKOJU) and (r := skan.rodzaj_pokoju(self.hass, self.o.get(CONF_POKOJ),
                                                                            s.name if s else pierwsza)):
            self.o[CONF_RODZAJ_POKOJU] = r
        if CONF_OSLONA not in self.o or (self.brama and self.o[CONF_OSLONA] not in BRAMY):
            klasa = s.attributes.get("device_class") if s else None
            self.o[CONF_OSLONA] = ("segmentowa" if klasa == "garage" else "przesuwna" if self.brama
                                   else "markiza" if klasa == "awning" else "natynkowa" if klasa == "shutter"
                                   else "fasadowa" if "lamele" in self.mam and "zew" in self.mam
                                   else "zaluzja" if "lamele" in self.mam else DOMYSLNE[CONF_OSLONA])
        if CONF_SKRZYDLA not in self.o:
            self.o[CONF_SKRZYDLA] = "2" if len(rolety) == 2 else DOMYSLNE[CONF_SKRZYDLA]
        if "okno" in self.mam and not self.o.get(CONF_CZUJNIK_LEWE) and not self.o.get(CONF_CZUJNIK_PRAWE):
            lewe, prawe = skan.czujniki_okna(self.hass, pierwsza)
            if lewe:
                self.o[CONF_CZUJNIK_LEWE] = lewe
            if prawe:
                self.o[CONF_CZUJNIK_PRAWE] = prawe
        for i, klucz in enumerate((CONF_PREDKOSC_LEWA, CONF_PREDKOSC_PRAWA)):
            if i < len(rolety) and not self.o.get(klucz) and (p := skan.predkosc(self.hass, rolety[i])):
                self.o[klucz] = p
        # czujniki z listy „Co masz” – najpierw z pomieszczenia osłony
        zn = getattr(self, "_znalezione", None) or skan.znajdz(self.hass)
        for k, pole in CZUJNIKI.items():
            if k in self.mam and not self.o.get(pole) and zn.get(k) and k not in ("obecnosc", "ruch"):
                self.o[pole] = skan.najblizsze(self.hass, zn[k], pierwsza)[0]
        for k in ("obecnosc", "ruch"):
            pole = CZUJNIKI[k]
            if k in self.mam and not self.o.get(pole) and zn.get(k):
                pokoj = skan.obszar(self.hass, pierwsza)
                w_pokoju = [e for e in zn[k] if pokoj and skan.obszar(self.hass, e) == pokoj]
                if w_pokoju:
                    self.o[pole] = w_pokoju[0]
        if "pogoda" in self.mam and not self.o.get(CONF_POGODA) and zn.get("pogoda"):
            self.o[CONF_POGODA] = zn["pogoda"][0]
        if "osoby" in self.mam and not self.o.get(CONF_OSOBY):
            self.o[CONF_OSOBY] = zn.get("osoby", [])

    async def async_step_rodzaj(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if (w := await self._dalej("rodzaj", dane)) is not None:
            return w
        stany = [s for e in self.o.get(CONF_ROLETY) or [] if (s := self.hass.states.get(e))]
        bez_klasy = not any(s.attributes.get("device_class") for s in stany)
        if self.brama and not bez_klasy:
            opcje = RODZAJE_BRAM
        elif "zew" in self.mam:
            opcje = OSLONY_ZEW + OSLONY_WEW + OKNA
        else:
            opcje = OSLONY_WEW + OSLONY_ZEW + OKNA
        if "lamele" in self.mam and not self.brama:   # z lamelami na początku, reszta dalej – nic nie znika
            opcje = [k for k in Z_LAMELAMI if k in opcje] + [k for k in opcje if k not in Z_LAMELAMI]
        if bez_klasy and "brama" in self.mam:   # silnik bez klasy: bramy też do wyboru (bramy pierwsze, gdy to brama)
            opcje = RODZAJE_BRAM + opcje if self.brama else opcje + RODZAJE_BRAM
        domyslny = self.o.get(CONF_OSLONA) if self.o.get(CONF_OSLONA) in opcje else opcje[0]
        return await self._formularz("rodzaj", {vol.Required(CONF_OSLONA, default=domyslny): _lista(opcje, "oslony")},
                                     dodatki={"galeria": await galeria.async_obrazek(
                                         self.hass, "rodzaj", CONF_OSLONA, opcje, domyslny, "oslony")})

    async def async_step_lamele(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if (w := await self._dalej("lamele", dane)) is not None:
            return w
        schemat: dict = {vol.Required("lamele_kat", default=self.o.get("lamele_kat", PARAMETRY["lamele_kat"])): _liczba("lamele_kat")}
        if self.zaaw:
            schemat[vol.Required("lamele_tryb", default=self.o.get("lamele_tryb", "auto"))] = \
                _lista(["auto", "staly", "nocny"], "lamele_tryb", lista=True)
            schemat[vol.Required("lamele_noc", default=self.o.get("lamele_noc", 0))] = _liczba("lamele_noc")
        return await self._formularz("lamele", schemat)

    async def async_step_kolory(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if dane is not None:
            for k in (CONF_KOLOR_WLASNY, CONF_RAMA_WLASNA):
                if k not in dane:
                    self.o.pop(k, None)
        if (w := await self._dalej("kolory", dane)) is not None:
            return w
        schemat: dict = {
            vol.Required(CONF_KOLOR, default=self.o.get(CONF_KOLOR, DOMYSLNE[CONF_KOLOR])): _lista(list(KOLORY), "kolory"),
            vol.Required(CONF_RAMA, default=self.o.get(CONF_RAMA, DOMYSLNE[CONF_RAMA])): _lista(list(RAMY), "ramy"),
        }
        if self.zaaw:
            schemat[vol.Optional(CONF_KOLOR_WLASNY, **_sug(self.o.get(CONF_KOLOR_WLASNY)))] = sel.ColorRGBSelector()
            schemat[vol.Optional(CONF_RAMA_WLASNA, **_sug(self.o.get(CONF_RAMA_WLASNA)))] = sel.ColorRGBSelector()
        palety = (await galeria.async_obrazek(self.hass, "kolory", CONF_KOLOR, list(KOLORY),
                                              self.o.get(CONF_KOLOR, DOMYSLNE[CONF_KOLOR]), "kolory", "kolor")
                  + await galeria.async_obrazek(self.hass, "kolory", CONF_RAMA, list(RAMY),
                                                self.o.get(CONF_RAMA, DOMYSLNE[CONF_RAMA]), "ramy", "kolor"))
        return await self._formularz("kolory", schemat, dodatki={"galeria": palety})

    async def async_step_okno(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if (w := await self._dalej("okno", dane)) is not None:
            return w
        schemat: dict = {
            vol.Required(CONF_SKRZYDLA, default=str(self.o.get(CONF_SKRZYDLA, "2"))): _lista(["1", "2"], "skrzydla", lista=True),
            vol.Required(CONF_WYSOKOSC, default=self.o.get(CONF_WYSOKOSC, DOMYSLNE[CONF_WYSOKOSC])):
                sel.NumberSelector(sel.NumberSelectorConfig(min=160, max=480, step=10, unit_of_measurement="px",
                                                            mode=sel.NumberSelectorMode.SLIDER)),
        }
        karta = self.o.get(CONF_KARTA) or {}
        schemat[vol.Required(CONF_OSOBNO, default=bool(self.o.get(CONF_OSOBNO, karta.get(CONF_OSOBNO, False))))] = \
            sel.BooleanSelector()
        if self.zaaw:
            schemat[vol.Required(CONF_ODWROC, default=bool(self.o.get(CONF_ODWROC)))] = sel.BooleanSelector()
        return await self._formularz("okno", schemat)

    async def async_step_czujniki(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if dane is not None:
            for k in (CONF_CZUJNIK_LEWE, CONF_CZUJNIK_PRAWE, CZUJNIKI["drzwi"], CZUJNIKI["przeszkoda"]):
                if k not in dane:
                    self.o.pop(k, None)
        if (w := await self._dalej("czujniki", dane)) is not None:
            return w
        schemat: dict = {}
        if "okno" in self.mam:
            dwa = str(self.o.get(CONF_SKRZYDLA, "2")) == "2"
            for czujnik, tryb, jest in ((CONF_CZUJNIK_LEWE, CONF_TRYB_LEWE, True), (CONF_CZUJNIK_PRAWE, CONF_TRYB_PRAWE, dwa)):
                if not jest:
                    continue
                pole, wybor = self._wybor(czujnik, "okno", "binary_sensor")
                if czujnik == CONF_CZUJNIK_PRAWE and not self.o.get(czujnik):
                    pole = vol.Optional(czujnik)   # ten sam czujnik nie może być podpowiedziany dwa razy
                schemat[pole] = wybor
                schemat[vol.Required(tryb, default=self.o.get(tryb, "uchyl"))] = _lista(TRYBY_SKRZYDLA, "tryby", lista=True)
        if self.zaaw and "drzwi" in self.mam:
            schemat.__setitem__(*self._wybor(CZUJNIKI["drzwi"], "drzwi", "binary_sensor"))
        if self.zaaw and "przeszkoda" in self.mam:
            schemat.__setitem__(*self._wybor(CZUJNIKI["przeszkoda"], "przeszkoda", "binary_sensor"))
        return await self._formularz("czujniki", schemat)

    async def async_step_fotokomorka(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if (w := await self._dalej("fotokomorka", dane)) is not None:
            return w
        pole = CZUJNIKI["foto"]
        if not self.o.get(pole):
            zn = getattr(self, "_znalezione", None) or skan.znajdz(self.hass)
            if zn.get("foto"):
                self.o[pole] = skan.najblizsze(self.hass, zn["foto"], self.roleta)[0]
        schemat = {
            **dict([self._wybor(pole, "foto", ["binary_sensor", "sensor"])]),
            vol.Required(CONF_FOTO_STAN, default=self.o.get(CONF_FOTO_STAN, "on")): sel.TextSelector(),
        }
        return await self._formularz("fotokomorka", schemat)

    async def async_step_silnik(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if (w := await self._dalej("silnik", dane)) is not None:
            return w
        schemat: dict = {
            vol.Required(CONF_CZAS, default=self.o.get(CONF_CZAS, 0)):
                sel.NumberSelector(sel.NumberSelectorConfig(min=0, max=240, step=0.5, unit_of_measurement="s",
                                                            mode=sel.NumberSelectorMode.BOX)),
            vol.Required(CONF_KALIBRUJ, default=False): sel.BooleanSelector(),
        }
        if not self.brama:   # brama nie rusza się sama
            schemat[vol.Required(CONF_KALIBRACJA_50, default=bool(self.o.get(CONF_KALIBRACJA_50)))] = sel.BooleanSelector()
        if self.zaaw and not self.brama:
            for k in (CONF_PREDKOSC_LEWA, CONF_PREDKOSC_PRAWA):
                schemat.__setitem__(*self._wybor(k, "predkosc", ["number", "sensor"]))
        if self.brama and "brama_otwarta" in POWIADOMIENIA:
            schemat[vol.Required("brama_minuty", default=self.o.get("brama_minuty", PARAMETRY["brama_minuty"]))] = \
                _liczba("brama_minuty")
        return await self._formularz("silnik", schemat)

    async def async_step_pogoda(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        pola = {"pogoda": (CONF_POGODA, "weather", None), "temp": (CZUJNIKI["temp"], "sensor", "temperature"),
                "temp_pokoj": (CZUJNIKI["temp_pokoj"], "sensor", "temperature"),
                "jasnosc": (CZUJNIKI["jasnosc"], "sensor", ["illuminance", "power"]),
                "wiatr": (CZUJNIKI["wiatr"], "sensor", None),
                "deszcz": (CZUJNIKI["deszcz"], ["binary_sensor", "sensor"], None),
                "drgania": (CZUJNIKI["drgania"], "binary_sensor", None),
                "ostrzezenia": (CZUJNIKI["ostrzezenia"], ["binary_sensor", "sensor"], None)}
        widoczne = [k for k in pola if k in self.mam and (self.zaaw or not URZADZENIA.get(k, False))]
        if dane is not None:
            for k in widoczne:
                if pola[k][0] not in dane:
                    self.o.pop(pola[k][0], None)
        if (w := await self._dalej("pogoda", dane)) is not None:
            return w
        schemat = dict(self._wybor(pola[k][0], k, pola[k][1], klasa=pola[k][2]) for k in widoczne)
        return await self._formularz("pogoda", schemat)

    async def async_step_domownicy(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        pola = {"obecnosc": (CZUJNIKI["obecnosc"], "binary_sensor"), "ruch": (CZUJNIKI["ruch"], "binary_sensor"),
                "osoby": (CONF_OSOBY, "person"), "dym": (CZUJNIKI["dym"], "binary_sensor"),
                "alarm": (CZUJNIKI["alarm"], "alarm_control_panel")}
        widoczne = [k for k in pola if k in self.mam and (self.zaaw or not URZADZENIA.get(k, False))]
        if dane is not None:
            for k in widoczne:
                if pola[k][0] not in dane:
                    self.o.pop(pola[k][0], None)
        if (w := await self._dalej("domownicy", dane)) is not None:
            return w
        schemat = dict(self._wybor(pola[k][0], k, pola[k][1], wiele=k == "osoby") for k in widoczne)
        if self.zaaw:
            schemat.__setitem__(*self._wybor(CONF_SWIETA, "swieta", "binary_sensor"))
        return await self._formularz("domownicy", schemat)

    async def async_step_automatyka(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if (w := await self._dalej("automatyka", dane)) is not None:
            return w
        schemat = {vol.Required(f"f_{k}", default=bool(self.o.get(f"f_{k}", False))): sel.BooleanSelector()
                   for k in self.dostepne_funkcje()}
        schemat[vol.Required("f_licznik", default=bool(self.o.get("f_licznik", True)))] = sel.BooleanSelector()
        return await self._formularz("automatyka", schemat)

    async def async_step_ustawienia(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if (w := await self._dalej("ustawienia", dane)) is not None:
            return w
        pola: list[str] = []
        for f in self._z_parametrami():
            lista = PARAMETRY_FUNKCJI[f]
            for p in lista if self.zaaw else lista[:1] if f != "harmonogram" else lista:
                if p not in pola:
                    pola.append(p)
        schemat: dict = {}
        for p in pola:
            dom = self.o.get(p, PARAMETRY[p])
            if p in GODZINY:
                schemat[vol.Required(p, default=dom)] = sel.TimeSelector()
            elif p == "harm_tryb":
                schemat[vol.Required(p, default=dom)] = _lista(["slonce", "godziny"], "harm_tryb", lista=True)
            else:
                schemat[vol.Required(p, default=dom)] = _liczba(p)
        return await self._formularz("ustawienia", schemat)

    async def async_step_powiadomienia(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        if (w := await self._dalej("powiadomienia", dane)) is not None:
            return w
        rodzaje = [r for r in POWIADOMIENIA if (r.startswith("brama") or r == "przeszkoda") == self.brama
                   or r in ("nie_odpowiada", "bateria", "czujnik")]
        if self.brama and "foto" not in self.mam:
            rodzaje = [r for r in rodzaje if r != "przeszkoda"]
        if not self.zaaw:
            rodzaje = [r for r in rodzaje if r not in ("czujnik",)]
        # telefony (aplikacja HA) na górze listy
        uslugi = sorted((f"notify.{u}" for u in self.hass.services.async_services_for_domain("notify")
                         if u not in ("send_message", "persistent_notification")),
                        key=lambda u: (not u.startswith("notify.mobile_app_"), u))
        schemat: dict = {vol.Optional(CONF_POWIADOM, default=[r for r in self.o.get(CONF_POWIADOM, []) if r in rodzaje]):
                         _lista(rodzaje, "powiadomienia", wiele=True)}
        if uslugi:
            schemat[vol.Optional(CONF_POWIADOM_GDZIE, default=[u for u in self.o.get(CONF_POWIADOM_GDZIE, []) if u in uslugi])] = \
                sel.SelectSelector(sel.SelectSelectorConfig(options=uslugi, multiple=True, mode=sel.SelectSelectorMode.LIST))
        return await self._formularz("powiadomienia", schemat)


class MotorHaFlow(Kreator, ConfigFlow, domain=DOMAIN):
    VERSION = 2

    def __init__(self) -> None:
        self.o = dict(DOMYSLNE)
        self.tytul = ""
        self._historia = []

    @staticmethod
    @callback
    def async_get_options_flow(entry: ConfigEntry) -> OptionsFlow:
        return MotorHaOpcje(entry)

    async def async_step_user(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        # pierwsze urządzenie po instalacji: integracja jeszcze nie działa, więc przeglądarka nie ma kreatora graficznego
        # (wczytuje się razem z integracją). Wczytaj ją teraz i poproś o odświeżenie strony zamiast pokazywać zwykłe pola.
        if DOMAIN not in self.hass.data:
            from homeassistant.setup import async_setup_component
            await async_setup_component(self.hass, DOMAIN, {})
            return self.async_abort(reason="odswiez")
        self.o.update(ustawienia.domyslne_okna(self.hass))   # z pierwszego ekranu Motor HA
        return await self.async_step_tryb()

    async def async_step_import(self, dane: dict[str, Any]) -> ConfigFlowResult:
        """Okno przeniesione z Motor HA 1.x (migracja.py)."""
        return self.async_create_entry(title=dane["tytul"], data={}, options=dane["opcje"])

    async def async_step_panel(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        from .panele import NIE, async_lista
        if (w := await self._dalej("panel", dane)) is not None:
            return w
        lista, propozycja = await async_lista(self.hass)
        propozycja = ustawienia.panel_domyslny(self.hass, propozycja)
        opcje = [sel.SelectOptionDict(value=NIE, label="—")] + [sel.SelectOptionDict(value=k, label=n) for k, n in lista]
        return await self._formularz("panel", {vol.Required(CONF_NA_PANEL, default=propozycja): sel.SelectSelector(
            sel.SelectSelectorConfig(options=opcje, mode=sel.SelectSelectorMode.DROPDOWN))})

    async def _koniec(self) -> ConfigFlowResult:
        o = ustawienia.popraw_funkcje(self.hass, {k: v for k, v in self.o.items() if k != CONF_NAZWA})
        return self.async_create_entry(title=self.tytul or "Motor HA", data={}, options=o)


class MotorHaOpcje(Kreator, OptionsFlow):
    konfiguracja = True

    def __init__(self, entry: ConfigEntry) -> None:
        self._entry_id = entry.entry_id
        self.o = {**DOMYSLNE, **entry.options}
        self.tytul = entry.title
        self._historia = []

    async def async_step_init(self, dane: dict[str, Any] | None = None) -> ConfigFlowResult:
        # wiersz na stronie urządzenia (motor_ha/krok): od razu ten jeden krok, „Dalej” zapisuje
        krok, kiedy = self.hass.data.get(DOMAIN, {}).get("krok", {}).pop(self._entry_id, (None, 0.0))
        if krok in self.kroki() and time.monotonic() - kiedy < 60:
            self._jeden = krok
            return await getattr(self, f"async_step_{krok}")()
        return await self.async_step_tryb()

    async def _koniec(self) -> ConfigFlowResult:
        entry = self.hass.config_entries.async_get_entry(self._entry_id)
        if entry and self.tytul and self.tytul != entry.title:
            self.hass.config_entries.async_update_entry(entry, title=self.tytul)
        if entry and entry.options.get(CONF_UKRYJ_ZRODLO):   # wyłączone albo zmieniony silnik: pokaż go znów
            teraz = set(self.o.get(CONF_ROLETY) or []) if self.o.get(CONF_UKRYJ_ZRODLO) else set()
            assist(self.hass, [e for e in entry.options.get(CONF_ROLETY) or [] if e not in teraz], True)
        if isinstance(karta := self.o.get(CONF_KARTA), dict):
            self.o[CONF_KARTA] = {k: v for k, v in karta.items() if k not in KARTA_Z_KREATORA}
        return self.async_create_entry(title="", data={k: v for k, v in self.o.items() if k != CONF_NAZWA})
