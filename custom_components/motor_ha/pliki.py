"""Pliki przeglądarki: karta, ładowacz w Zasobach paneli i ikona Motor HA w HACS.

Pliki z www/ trafiają przy starcie do /config/.motor_ha i stamtąd są podawane pod /motor_ha/.
Dzięki temu po aktualizacji przez HACS przeglądarka dostaje nowe pliki dopiero razem z nową
integracją (po restarcie), a nie wcześniej.
"""

from __future__ import annotations

from datetime import timedelta
import logging
from pathlib import Path
import shutil

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_interval

from .const import DOMAIN, KARTA_PLIK, LOADER, VERSION

_LOGGER = logging.getLogger(__name__)
ADRES = f"/local/{LOADER}"                     # /config/www/motor-ha-loader.js
STARE_ADRESY = (f"/{DOMAIN}/{LOADER}", ADRES)
LOGO = f"/{DOMAIN}/ikona.png"
# po wersjach 1.x (nazwa „okno_ha”) – sprzątane, gdy starej integracji już nie ma
STARA = "okno_ha"
STARE_ZASOBY = ("/local/okno-ha-loader.js", "/okno_ha/okno-ha-loader.js", "/okno_ha/okno-ha.js")

LADOWACZ = f"""// Motor HA – ładowacz. Przy każdym otwarciu strony bierze świeże skrypty (?t=), a po aktualizacji
// Motor HA raz sam odświeża stronę: po powrocie do aplikacji/karty albo gdy nikt jej nie dotyka przez minutę.
if (!window.__motorHaLoader) {{
  window.__motorHaLoader = true;
  const t = Date.now();
  import(`/{DOMAIN}/motor-ha-hacs.js?v={VERSION}&t=${{t}}`).catch(() => {{}});
  import(`/{DOMAIN}/{KARTA_PLIK}?v={VERSION}&t=${{t}}`).catch((e) => console.error("Motor HA: nie wczytałem karty", e));
  let wersja = null, ruch = Date.now();
  ["pointerdown", "keydown", "wheel", "touchstart"].forEach((n) => addEventListener(n, () => {{ ruch = Date.now(); }}, {{ passive: true }}));
  const sprawdz = async () => {{
    try {{
      const w = (await (await fetch(`/{DOMAIN}/wersja.txt?t=${{Date.now()}}`, {{ cache: "no-store" }})).text()).trim();
      if (wersja === null) wersja = w;
      // porównanie z kodem, który działa na stronie: aplikacja HA potrafi przetrwać restart HA ze starą kartą w pamięci
      const dziala = window.__motorHaDziala || wersja;
      if (w && w !== dziala && (teraz || (Date.now() - ruch > 60000 && !document.querySelector("home-assistant")?.shadowRoot?.querySelector("dialog-data-entry-flow")))) location.reload();
    }} catch (e) {{ /* HA w trakcie restartu */ }}
  }};
  let teraz = false;
  sprawdz();
  setInterval(sprawdz, 60000);
  // aplikacja HA (Android/iOS) trzyma stronę otwartą tygodniami: po powrocie do aplikacji nowa wersja wczytuje się od razu
  document.addEventListener("visibilitychange", () => {{
    if (document.visibilityState === "visible") {{ teraz = true; sprawdz().finally(() => {{ teraz = false; }}); }}
  }});
}}
"""


def _kopiuj(hass_config_path: str, zrodlo: Path) -> None:
    cel = Path(hass_config_path) / ".motor_ha"
    shutil.rmtree(cel, ignore_errors=True)   # pliki starszych wersji (panel, opis 1.x) znikają
    cel.mkdir()
    shutil.copytree(zrodlo, cel, dirs_exist_ok=True)
    (cel / "wersja.txt").write_text(VERSION, encoding="utf-8")
    (cel / LOADER).write_text(LADOWACZ, encoding="utf-8")
    www = Path(hass_config_path) / "www"
    www.mkdir(exist_ok=True)
    (www / LOADER).write_text(LADOWACZ, encoding="utf-8")


async def async_przygotuj(hass: HomeAssistant) -> Path:
    """Kopiuje pliki tej wersji do /config/.motor_ha i zwraca ten katalog."""
    zrodlo = Path(__file__).parent / "www"
    # HA podaje /local/ tylko wtedy, gdy folder www był już przy starcie – inaczej ładowacz do restartu idzie z /motor_ha/
    lokalny = await hass.async_add_executor_job(Path(hass.config.path("www")).is_dir)
    hass.data.setdefault(DOMAIN, {})["adres"] = ADRES if lokalny else f"/{DOMAIN}/{LOADER}"
    await hass.async_add_executor_job(_kopiuj, hass.config.path(), zrodlo)
    return Path(hass.config.path(".motor_ha"))


async def async_usun_pliki(hass: HomeAssistant) -> None:
    def _usun() -> None:
        shutil.rmtree(hass.config.path(".motor_ha"), ignore_errors=True)
        Path(hass.config.path("www", LOADER)).unlink(missing_ok=True)
    await hass.async_add_executor_job(_usun)


def _bez_starej(hass: HomeAssistant) -> bool:
    # stare wpisy po przeniesieniu są wyłączone – liczą się tylko włączone
    return not any(e.disabled_by is None for e in hass.config_entries.async_entries(STARA))


async def async_sprzatnij_stara(hass: HomeAssistant) -> None:
    """Pliki i ładowacz po Motor HA 1.x (okno_ha) – tylko gdy tamtej integracji już nie ma."""
    if not _bez_starej(hass):
        return

    def _usun() -> None:
        shutil.rmtree(hass.config.path(".okno_ha"), ignore_errors=True)
        Path(hass.config.path("www", "okno-ha-loader.js")).unlink(missing_ok=True)
    await hass.async_add_executor_job(_usun)
    try:
        if (zasoby := _zasoby(hass)) is None:
            return
        if not zasoby.loaded:
            await zasoby.async_load()
            zasoby.loaded = True
        for z in [z for z in zasoby.async_items() if str(z.get("url", "")).split("?")[0] in STARE_ZASOBY]:
            await zasoby.async_delete_item(z["id"])
    except Exception:  # noqa: BLE001
        _LOGGER.exception("Motor HA: nie usunąłem starego ładowacza z Zasobów")


# --- Zasoby paneli (Ustawienia → Panele → Zasoby) ---

def _zasoby(hass: HomeAssistant):
    zasoby = getattr(hass.data.get("lovelace"), "resources", None)
    # tylko zasoby z UI (panele w YAML mają zasoby w YAML – tam nic nie ruszamy)
    return zasoby if zasoby is not None and hasattr(zasoby, "async_create_item") else None


async def async_dodaj_zasob(hass: HomeAssistant) -> None:
    try:
        if (zasoby := _zasoby(hass)) is None:
            return
        if not zasoby.loaded:
            await zasoby.async_load()
            zasoby.loaded = True
        # adres z numerem wersji: po aktualizacji przeglądarka i aplikacja HA nie wezmą starego ładowacza z pamięci
        adres = f'{hass.data.get(DOMAIN, {}).get("adres", ADRES)}?v={VERSION}'
        nasze = [z for z in zasoby.async_items() if str(z.get("url", "")).split("?")[0] in STARE_ADRESY]
        if not nasze:
            await zasoby.async_create_item({"res_type": "module", "url": adres})
            return
        if nasze[0].get("url") != adres:
            await zasoby.async_update_item(nasze[0]["id"], {"res_type": "module", "url": adres})
        for z in nasze[1:]:
            await zasoby.async_delete_item(z["id"])
    except Exception:  # noqa: BLE001 – zasób nie może zepsuć HA; karta i tak wczytuje się przez add_extra_js_url
        _LOGGER.exception("Motor HA: nie dodałem ładowacza do Zasobów")


async def async_usun_zasob(hass: HomeAssistant) -> None:
    try:
        if (zasoby := _zasoby(hass)) is None:
            return
        if not zasoby.loaded:
            await zasoby.async_load()
            zasoby.loaded = True
        for z in [z for z in zasoby.async_items() if str(z.get("url", "")).split("?")[0] in STARE_ADRESY]:
            await zasoby.async_delete_item(z["id"])
    except Exception:  # noqa: BLE001
        _LOGGER.exception("Motor HA: nie usunąłem ładowacza z Zasobów")


# --- ikona w okienku „Aktualizacja” od HACS (po stronie serwera) ---

@callback
def _ikona_hacs(hass: HomeAssistant) -> None:
    """Encja aktualizacji HACS dla Motor HA dostaje logo z integracji zamiast pustego obrazka z brands."""
    for encja in list(getattr(hass.data.get("update"), "entities", []) or []):
        if not getattr(encja, "_motor_ha_logo", False):
            try:
                obrazek = encja.entity_picture
            except Exception:  # noqa: BLE001 – cudza encja
                continue
            if not isinstance(obrazek, str) or "brands.home-assistant.io" not in obrazek or f"/{DOMAIN}/" not in obrazek:
                continue
            klasa = type(encja)
            encja.__class__ = type(klasa.__name__, (klasa,), {"entity_picture": property(lambda _s: LOGO),
                                                              "_motor_ha_logo": True})
        if encja.hass is None or not encja.entity_id:
            continue
        stan = hass.states.get(encja.entity_id)
        if stan is None or stan.attributes.get("entity_picture") != LOGO:
            try:
                encja.async_write_ha_state()
            except Exception:  # noqa: BLE001 – HACS w trakcie startu
                continue


@callback
def async_ikona_hacs(hass: HomeAssistant) -> None:
    _ikona_hacs(hass)
    async_track_time_interval(hass, callback(lambda _now: _ikona_hacs(hass)), timedelta(minutes=1),
                              cancel_on_shutdown=True)
