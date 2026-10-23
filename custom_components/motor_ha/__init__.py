"""Motor HA – wszystko, co ma silnik: rolety, żaluzje, markizy, zasłony, bramy i garaże.

Każde urządzenie = jeden wpis z własną kartą, kreatorem, automatyką i powiadomieniami.
"""

from __future__ import annotations

import importlib
import json
import logging
import shutil
from datetime import timedelta
from pathlib import Path

import voluptuous as vol

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import ATTR_ENTITY_ID, EVENT_COMPONENT_LOADED, EVENT_HOMEASSISTANT_STARTED, Platform
from homeassistant.core import CoreState, HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv, device_registry as dr, entity_registry as er
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.translation import async_get_translations
from homeassistant.helpers.typing import ConfigType

from .automatyka import Automatyka
from .const import CONF_NA_PANEL, DOMAIN, KARTA_PLIK, MAM, PODSTAWOWY, TRYB, VERSION
from .migracja import async_przenies
from .pasek import PasekKrokow
from .pliki import (
    async_dodaj_zasob,
    async_ikona_hacs,
    async_przygotuj,
    async_sprzatnij_stara,
    async_usun_pliki,
    async_usun_zasob,
)
from .powiadomienia import Powiadomienia
from .update import RESTART
from .urzadzenie import HUB, NAZWY_OSLON, Wpis, info_hub, info_urzadzenia
from .ws import async_rejestruj

_LOGGER = logging.getLogger(__name__)
PLATFORMS = [Platform.COVER, Platform.BUTTON, Platform.SENSOR, Platform.SWITCH, Platform.UPDATE]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

USLUGI = {
    "wstrzymaj": vol.Schema({vol.Required(ATTR_ENTITY_ID): cv.entity_ids,
                             vol.Optional("minuty"): vol.All(vol.Coerce(float), vol.Range(min=0))}),
    "wznow": vol.Schema({vol.Required(ATTR_ENTITY_ID): cv.entity_ids}),
    "przelicz": vol.Schema({vol.Required(ATTR_ENTITY_ID): cv.entity_ids}),
    "kalibruj": vol.Schema({vol.Required(ATTR_ENTITY_ID): cv.entity_ids}),
    "ustaw": vol.Schema({vol.Required(ATTR_ENTITY_ID): cv.entity_ids,
                         vol.Required("pozycja"): vol.All(vol.Coerce(int), vol.Range(min=0, max=100)),
                         vol.Optional("lamele"): vol.All(vol.Coerce(int), vol.Range(min=0, max=100))}),
}


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    hass.data[DOMAIN] = {"wpisy": {}}
    katalog = await async_przygotuj(hass)
    await hass.http.async_register_static_paths([StaticPathConfig(f"/{DOMAIN}", str(katalog), False)])
    hass.http.register_view(PasekKrokow(hass))
    @callback
    def _skrypty(_e=None) -> bool:
        if "frontend" not in hass.config.components:
            return False
        add_extra_js_url(hass, f"/{DOMAIN}/{KARTA_PLIK}?v={VERSION}")
        add_extra_js_url(hass, f"/{DOMAIN}/motor-ha-hacs.js?v={VERSION}")
        return True

    if not _skrypty():   # frontend jeszcze się nie wczytał – karta na stronie urządzenia musi być zawsze
        @callback
        def _po_frontendzie(e) -> None:
            if e.data.get("component") == "frontend":
                _skrypty()
                koniec()
        koniec = hass.bus.async_listen(EVENT_COMPONENT_LOADED, _po_frontendzie)
    async def _zasoby() -> None:
        await async_przenies(hass)
        await async_sprzatnij_stara(hass)
        await async_dodaj_zasob(hass)

    if hass.state is CoreState.running:
        hass.async_create_task(_zasoby())
    else:
        async def _po_starcie(_e) -> None:
            await _zasoby()
        hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, _po_starcie)
    async_rejestruj(hass)
    async_ikona_hacs(hass)
    _uslugi(hass)
    ir.async_delete_issue(hass, DOMAIN, RESTART)
    _pilnuj_plikow(hass)
    await _usun_stary_folder(hass)
    return True


async def _usun_stary_folder(hass: HomeAssistant) -> None:
    """Po zmianie nazwy z 1.x HACS potrafił pobrać Motor HA do starego folderu custom_components/okno_ha.
    HA wczytuje wtedy ten folder zamiast motor_ha i nowe wersje „nie działają”. Usuwamy kopię i prosimy o restart."""
    tu = Path(__file__).parent
    if tu.name != DOMAIN:
        _LOGGER.warning("Motor HA %s działa z folderu %s (powinien być custom_components/%s)", VERSION, tu, DOMAIN)

    def _usun() -> bool:
        cc = tu.parent
        stary, nowy = cc / "okno_ha", cc / DOMAIN
        if not stary.is_dir() or not (nowy / "manifest.json").is_file():
            return False
        if not (stary / "manifest.json").is_file():   # resztka z poprzedniego startu (same tłumaczenia)
            shutil.rmtree(stary, ignore_errors=True)
            return False
        try:
            if json.loads((stary / "manifest.json").read_text(encoding="utf-8")).get("domain") != DOMAIN:
                return False   # prawdziwe Okno HA 1.x – zostaje (migracja)
        except (OSError, ValueError):
            return False
        if tu == stary:
            # działamy właśnie z tej kopii: najpierw wczytujemy wszystkie moduły, żeby do restartu wszystko działało
            for plik in tu.glob("*.py"):
                if plik.stem != "__init__":
                    importlib.import_module(f"{__package__}.{plik.stem}")
        for x in stary.iterdir():
            if x.name != "translations":   # teksty (np. „uruchom ponownie”) potrzebne do restartu
                shutil.rmtree(x, ignore_errors=True) if x.is_dir() else x.unlink(missing_ok=True)
        return True

    if await hass.async_add_executor_job(_usun):
        _LOGGER.warning("Motor HA: usunąłem starą kopię w custom_components/okno_ha")
        ir.async_create_issue(hass, DOMAIN, RESTART, is_fixable=True, is_persistent=False,
                              severity=ir.IssueSeverity.WARNING, translation_key=RESTART,
                              translation_placeholders={"wersja": VERSION})


@callback
def _pilnuj_plikow(hass: HomeAssistant) -> None:
    """Nowa wersja pobrana (HACS albo nasza aktualizacja), a działa jeszcze stara: w Ustawieniach pojawia się
    „Motor HA … – restart” z przyciskiem. Prośba o restart przychodzi dopiero, gdy pliki są już na dysku."""
    plik = Path(__file__).parent / "manifest.json"

    def _wersja() -> str | None:
        try:
            return json.loads(plik.read_text(encoding="utf-8")).get("version")
        except (OSError, ValueError):
            return None

    async def _sprawdz(_t=None) -> None:
        if (nowa := await hass.async_add_executor_job(_wersja)) and nowa != VERSION:
            ir.async_create_issue(hass, DOMAIN, RESTART, is_fixable=True, is_persistent=False,
                                  severity=ir.IssueSeverity.WARNING, translation_key=RESTART,
                                  translation_placeholders={"wersja": nowa})

    async_track_time_interval(hass, _sprawdz, timedelta(seconds=30), cancel_on_shutdown=True)


@callback
def _uslugi(hass: HomeAssistant) -> None:
    """Akcje do własnych automatyzacji: wstrzymaj, wznów, przelicz, kalibruj, ustaw."""

    def _wpisy(call: ServiceCall) -> list[Wpis]:
        rej = er.async_get(hass)
        wynik = []
        for e in call.data[ATTR_ENTITY_ID]:
            w = rej.async_get(e)
            if w and w.platform == DOMAIN and (wp := hass.data[DOMAIN]["wpisy"].get(w.config_entry_id)):
                wynik.append(wp)
        if not wynik:
            raise ServiceValidationError(translation_domain=DOMAIN, translation_key="nie_motor_ha")
        return wynik

    async def wstrzymaj(call: ServiceCall) -> None:
        for w in _wpisy(call):
            if w.auto:
                await w.auto.async_pauza(call.data.get("minuty"))

    async def wznow(call: ServiceCall) -> None:
        for w in _wpisy(call):
            if w.auto:
                await w.auto.async_pauza(0)

    async def przelicz(call: ServiceCall) -> None:
        for w in _wpisy(call):
            if w.auto:
                w.auto.cel = None
                await w.auto.async_przelicz()

    async def kalibruj(call: ServiceCall) -> None:
        for w in _wpisy(call):
            if w.okno:
                w.okno.kalibruj()

    async def ustaw(call: ServiceCall) -> None:
        for w in _wpisy(call):
            if w.auto and not w.brama:
                await w.auto.async_jedz(call.data["pozycja"], call.data.get("lamele"))

    for nazwa, f in (("wstrzymaj", wstrzymaj), ("wznow", wznow), ("przelicz", przelicz),
                     ("kalibruj", kalibruj), ("ustaw", ustaw)):
        hass.services.async_register(DOMAIN, nazwa, f, schema=USLUGI[nazwa])


async def async_migrate_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """1.x → 2.0: dotychczasowe okno działa dalej, dostaje tryb podstawowy i listę „Co masz”."""
    if entry.version < 2:
        o = dict(entry.options)
        o.setdefault(TRYB, PODSTAWOWY)
        mam = []
        if o.get("czujnik_lewe") or o.get("czujnik_prawe"):
            mam.append("okno")
        if o.get("pogoda"):
            mam.append("pogoda")
        o.setdefault(MAM, mam)
        o.setdefault("f_licznik", True)
        hass.config_entries.async_update_entry(entry, options=o, version=2)
    return True


def _urzadzenie(rej: dr.DeviceRegistry, ident: tuple[str, str]) -> dr.DeviceEntry | None:
    """Urządzenie po identyfikatorze – HA 2026.10+ (async_get_devices) i starsze (async_get_device)."""
    if (wszystkie := getattr(rej, "async_get_devices", None)) is not None:
        return next(iter(wszystkie(identifiers={ident})), None)
    return rej.async_get_device(identifiers={ident})


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    if not await hass.async_add_executor_job(Path(hass.config.path(".motor_ha")).is_dir):
        await async_przygotuj(hass)   # wszystkie urządzenia usunięto i dodano znów bez restartu
    rej = dr.async_get(hass)
    # jedno urządzenie „Motor HA” dla wszystkich wpisów (HA tworzyłby osobne, puste – po jednym na wpis)
    hub = _urzadzenie(rej, HUB) or rej.async_get_or_create(config_entry_id=entry.entry_id, **info_hub())
    encje = er.async_get(hass)
    for d in dr.async_entries_for_config_entry(rej, entry.entry_id):   # puste kopie „Motor HA” z 2.0.x
        if HUB in d.identifiers and d.id != hub.id \
                and not er.async_entries_for_device(encje, d.id, include_disabled_entities=True):
            rej.async_update_device(d.id, remove_config_entry_id=entry.entry_id)
    t = await async_get_translations(hass, hass.config.language, "selector", {DOMAIN})
    przed = f"component.{DOMAIN}.selector.oslony.options."
    NAZWY_OSLON.update({k[len(przed):]: v for k, v in t.items() if k.startswith(przed)})
    u = rej.async_get_or_create(config_entry_id=entry.entry_id, **info_urzadzenia(entry))
    if u.via_device_id != hub.id:
        rej.async_update_device(u.id, via_device_id=hub.id)
    w = Wpis(entry)
    w.auto = Automatyka(hass, entry)
    w.powiadomienia = Powiadomienia(hass, entry, w.auto.aktualna)
    w.auto.na_problem = w.powiadomienia.zglos
    w.auto.na_ruch = w.powiadomienia.po_ruchu
    hass.data[DOMAIN]["wpisy"][entry.entry_id] = w
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    await w.auto.async_start()
    w.powiadomienia.async_start()
    if (pokoj := entry.options.get("pokoj")) and (u := _urzadzenie(dr.async_get(hass), (DOMAIN, entry.entry_id))):
        if not u.area_id:
            dr.async_get(hass).async_update_device(u.id, area_id=pokoj)
    if (panel := entry.options.get(CONF_NA_PANEL)):
        from .panele import NIE, async_dodaj_karte
        if panel != NIE and (encja := er.async_get(hass).async_get_entity_id("cover", DOMAIN, entry.entry_id)):
            try:
                await async_dodaj_karte(hass, panel, encja)
            except Exception:  # noqa: BLE001 – panel nie może zepsuć urządzenia
                _LOGGER.exception("Motor HA: nie dodałem karty na panel %s", panel)
        hass.config_entries.async_update_entry(entry, options={k: v for k, v in entry.options.items()
                                                               if k != CONF_NA_PANEL})
    entry.async_on_unload(entry.add_update_listener(_po_zmianie))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    w: Wpis | None = hass.data[DOMAIN]["wpisy"].get(entry.entry_id)
    if w:
        if w.auto:
            w.auto.async_stop()
        if w.powiadomienia:
            w.powiadomienia.async_stop()
    ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if ok:
        hass.data[DOMAIN]["wpisy"].pop(entry.entry_id, None)
        # aktualizacja i tryb wakacyjny siedzą na pierwszym urządzeniu – przenieś je na inne
        inne = [e for e in hass.config_entries.async_entries(DOMAIN)
                if e.entry_id != entry.entry_id and e.entry_id in hass.data[DOMAIN]["wpisy"]]
        if inne and ("aktualizacja" not in hass.data[DOMAIN] or "wakacje" not in hass.data[DOMAIN]):
            hass.async_create_task(hass.config_entries.async_reload(inne[0].entry_id))
    return ok


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Usunięto ostatnie urządzenie: sprzątnij pliki, ładowacz i wpisy po Motor HA."""
    if any(e.entry_id != entry.entry_id for e in hass.config_entries.async_entries(DOMAIN)):
        return
    await async_usun_pliki(hass)
    await async_usun_zasob(hass)
    ir.async_delete_issue(hass, DOMAIN, RESTART)
    if u := _urzadzenie(dr.async_get(hass), HUB):
        dr.async_get(hass).async_remove_device(u.id)


async def _po_zmianie(hass: HomeAssistant, entry: ConfigEntry) -> None:
    await hass.config_entries.async_reload(entry.entry_id)
