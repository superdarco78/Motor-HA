"""Nowe wersje karty i integracji prosto z GitHuba – bez czekania na HACS.

Co 2 minuty pyta GitHuba (z ETag, więc nie zjada limitu) o najnowsze wydanie.
Encje aktualizacji (update.py) pokazują to w Ustawienia → Aktualizacje.
"""

from __future__ import annotations

from collections.abc import Callable
from datetime import timedelta
import io
import logging
from pathlib import Path
import re
import shutil
import zipfile

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_call_later, async_track_time_interval
from homeassistant.helpers.storage import Store

from .const import DOMAIN, KARTA_OBRAZKI, KARTA_PLIK, KARTA_WERSJA, VERSION

_LOGGER = logging.getLogger(__name__)
CO_ILE = timedelta(minutes=2)
PIERWSZE_PO = 30   # sekund po starcie HA
WLASCICIEL = "superdarco78"
REPO_KARTA = "roleta-realistyczna"
REPO_INTEGRACJA = "okno-ha-integracja"
ZASOB_KARTY = "roleta-realistyczna.js"
LOADER = "okno-ha-loader.js"
PACZKA = "okno_ha.zip"   # paczka integracji w każdym wydaniu (HACS: zip_release)


def numer(wersja: str | None) -> tuple[int, ...]:
    """„v29.1” → (29, 1); „1.0.1” → (1, 0, 1)."""
    return tuple(int(x) for x in re.findall(r"\d+", str(wersja or ""))) or (0,)


class Nowosci:
    """Najnowsze wydania obu repozytoriów + zainstalowana wersja karty."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.katalog = Path(hass.config.path(".okno_ha"))
        self._store: Store = Store(hass, 1, f"{DOMAIN}.karta")
        self.karta_wersja = KARTA_WERSJA
        self.wydania: dict[str, dict] = {}
        self._etag: dict[str, str] = {}
        self._sluchacze: list[Callable[[], None]] = []

    # --- karta w /config/.okno_ha (wbudowana albo pobrana nowsza) ---

    async def async_przygotuj_karte(self) -> None:
        dane = await self._store.async_load() or {}
        zapisana = dane.get("wersja")
        wbudowana = Path(__file__).parent / "www" / KARTA_PLIK

        def _kopiuj(nadpisz: bool) -> None:
            self.katalog.mkdir(exist_ok=True)
            cel = self.katalog / KARTA_PLIK
            if nadpisz or not cel.is_file():
                shutil.copyfile(wbudowana, cel)
            for plik in ("okno-ha-panel.js", "okno-ha-hacs.js", "okno-ha-galeria.js", "okno-ha-opis.js", "ikona.png"):   # panel i ikona zawsze z tej wersji integracji
                shutil.copyfile(wbudowana.parent / plik, self.katalog / plik)
            # opis Motor HA w HACS (strona w stylu HA, 5 języków) – z tej wersji integracji
            shutil.copytree(wbudowana.parent / "opis", self.katalog / "opis", dirs_exist_ok=True)
            # otwarta strona HA porównuje ten numer i sama wczytuje nowy okno-ha-hacs.js po aktualizacji;
            # obrazki opisu w HACS biorą się z tej wersji (tag integracji | stan repo karty), nie z main
            (self.katalog / "wersja.txt").write_text(f"{VERSION}|{KARTA_OBRAZKI}", encoding="utf-8")
            # loader zawsze bierze świeży plik karty – przeglądarka nie poda starej kopii
            (self.katalog / LOADER).write_text(
                "// Motor HA – ładowacz: przy każdym otwarciu strony bierze świeże skrypty (znacznik czasu ?t=)\n"
                "if (!window.__oknoHaLoader) {\n  window.__oknoHaLoader = true;\n"
                f"  import(`/{DOMAIN}/okno-ha-hacs.js?t=${{Date.now()}}`).catch(() => {{}});\n"
                f"  import(`/{DOMAIN}/{KARTA_PLIK}?t=${{Date.now()}}`).catch(e => "
                f"console.error('Motor HA: nie wczytałem karty', e));\n}}\n", encoding="utf-8")
            # ta sama kopia ładowacza widoczna w /config/www (File editor), w Zasobach jako /local/okno-ha-loader.js
            www = Path(self.hass.config.path("www"))
            www.mkdir(exist_ok=True)
            shutil.copyfile(self.katalog / LOADER, www / LOADER)

        # 1.4.44: karta zawsze z tej wersji integracji (jedna aktualizacja „2 w 1”) – wcześniej stary plik
        # mógł zostać, gdy numer karty się nie zmienił, i w „Dodaj do panelu” była stara karta
        await self.hass.async_add_executor_job(_kopiuj, True)
        self.karta_wersja = KARTA_WERSJA
        if zapisana != KARTA_WERSJA:
            await self._store.async_save({"wersja": KARTA_WERSJA})

    async def async_usun_wszystko(self) -> None:
        """Po usunięciu ostatniego okna: kasuje /config/.okno_ha i zapisaną wersję karty."""
        await self._store.async_remove()
        await self.hass.async_add_executor_job(shutil.rmtree, self.katalog, True)
        await self.hass.async_add_executor_job(
            lambda: Path(self.hass.config.path("www", LOADER)).unlink(missing_ok=True))

    async def async_zainstaluj_karte(self, wersja: str) -> None:
        url = f"https://github.com/{WLASCICIEL}/{REPO_KARTA}/releases/download/{wersja}/{ZASOB_KARTY}"
        async with async_get_clientsession(self.hass).get(url, timeout=60) as r:
            r.raise_for_status()
            tresc = await r.read()
        cel = self.katalog / KARTA_PLIK
        await self.hass.async_add_executor_job(cel.write_bytes, tresc)
        self.karta_wersja = wersja
        await self._store.async_save({"wersja": wersja})
        self._powiadom()

    async def async_zainstaluj_integracje(self, wersja: str) -> None:
        sesja = async_get_clientsession(self.hass)
        # najpierw paczka z wydania (liczy się w plakietce pobrań), starsze wydania jej nie mają → całe repozytorium
        paczka = True
        async with sesja.get(f"https://github.com/{WLASCICIEL}/{REPO_INTEGRACJA}/releases/download/{wersja}/{PACZKA}",
                             timeout=120) as r:
            tresc = await r.read() if r.status == 200 else None
        if tresc is None:
            paczka = False
            url = f"https://api.github.com/repos/{WLASCICIEL}/{REPO_INTEGRACJA}/zipball/{wersja}"
            async with sesja.get(url, timeout=120) as r:
                r.raise_for_status()
                tresc = await r.read()
        tu = Path(__file__).parent

        def _rozpakuj() -> None:
            with zipfile.ZipFile(io.BytesIO(tresc)) as z:
                for nazwa in z.namelist():
                    if nazwa.endswith("/"):
                        continue
                    if paczka:
                        sciezka = nazwa
                    else:
                        czesci = nazwa.split("/", 1)
                        if len(czesci) < 2 or not czesci[1].startswith(f"custom_components/{DOMAIN}/"):
                            continue
                        sciezka = czesci[1][len(f"custom_components/{DOMAIN}/"):]
                    cel = (tu / sciezka).resolve()
                    if tu.resolve() not in cel.parents:
                        continue
                    cel.parent.mkdir(parents=True, exist_ok=True)
                    cel.write_bytes(z.read(nazwa))

        await self.hass.async_add_executor_job(_rozpakuj)

    # --- sprawdzanie GitHuba ---

    @callback
    def sluchaj(self, f: Callable[[], None]) -> Callable[[], None]:
        self._sluchacze.append(f)
        return lambda: self._sluchacze.remove(f)

    @callback
    def _powiadom(self) -> None:
        for f in list(self._sluchacze):
            f()

    async def async_sprawdz(self, _=None) -> None:
        sesja = async_get_clientsession(self.hass)
        zmiana = False
        for repo in (REPO_KARTA, REPO_INTEGRACJA):
            naglowki = {"Accept": "application/vnd.github+json"}
            if repo in self._etag:
                naglowki["If-None-Match"] = self._etag[repo]
            try:
                async with sesja.get(f"https://api.github.com/repos/{WLASCICIEL}/{repo}/releases/latest",
                                     headers=naglowki, timeout=15) as r:
                    if r.status != 200:
                        continue
                    d = await r.json()
                    if r.headers.get("ETag"):
                        self._etag[repo] = r.headers["ETag"]
            except Exception as err:  # noqa: BLE001 – brak sieci nie może psuć HA
                _LOGGER.debug("Motor HA: nie sprawdzę %s: %s", repo, err)
                continue
            if d.get("tag_name"):
                self.wydania[repo] = {"wersja": d["tag_name"], "opis": d.get("body") or "",
                                      "url": d.get("html_url"), "tytul": d.get("name") or d["tag_name"]}
                zmiana = True
        if zmiana:
            self._powiadom()
            await self._odswiez_hacs()

    async def _odswiez_hacs(self) -> None:
        """Nowe wydanie na GitHubie, a HACS (sam sprawdza co 48 h) go nie zna → HACS odświeża tylko Motor HA.

        To samo, co przycisk „Aktualizuj informacje” w HACS – raz na każde nowe wydanie.
        """
        nowa = self.wydania.get(REPO_INTEGRACJA, {}).get("wersja")
        hacs = self.hass.data.get("hacs")
        if not nowa or hacs is None or nowa == getattr(self, "_hacs_odswiezone", None):
            return
        try:
            repo = hacs.repositories.get_by_full_name(f"{WLASCICIEL}/{REPO_INTEGRACJA}")
            if repo is None or repo.display_available_version == nowa:
                return
            self._hacs_odswiezone = nowa
            await repo.update_repository(ignore_issues=True, force=True)
            await hacs.data.async_write()
            if (k := hacs.coordinators.get(repo.data.category)) is not None:
                k.async_update_listeners()
            # encja aktualizacji HACS nie zawsze zapisuje stan po odświeżeniu (sprawdza last_fetched) – zapisz ją wprost
            komponent = self.hass.data.get("update")
            for encja in list(getattr(komponent, "entities", []) or []):
                if getattr(encja, "repository", None) is repo and encja.hass is not None:
                    encja.async_write_ha_state()
            _LOGGER.info("Motor HA: HACS zna już wydanie %s", nowa)
        except Exception as err:  # noqa: BLE001 – inna wersja HACS: zostaje jego własne sprawdzanie
            _LOGGER.debug("Motor HA: nie odświeżyłem HACS: %s", err)

    @callback
    def async_start(self) -> None:
        async_call_later(self.hass, PIERWSZE_PO, self.async_sprawdz)
        async_track_time_interval(self.hass, self.async_sprawdz, CO_ILE)
