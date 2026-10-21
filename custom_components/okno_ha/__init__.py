"""Motor HA – okno z roletą jako urządzenie, z kreatorem w Ustawienia → Integracje."""

from __future__ import annotations

import logging

from homeassistant.components import panel_custom
from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.core import CoreState, HomeAssistant
from homeassistant.helpers import config_validation as cv, entity_registry as er, issue_registry as ir
from homeassistant.helpers.typing import ConfigType

from .const import CONF_NA_PANEL, DOMAIN, VERSION
from .hacs_ikona import async_start as async_logo_w_hacs
from .nowosci import LOADER, Nowosci
from .panele import NIE, async_dodaj_karte
from .repairs import RESTART
from .ws import async_rejestruj
from .zasob import async_dodaj as async_dodaj_zasob, async_usun as async_usun_zasob

PLATFORMS = [Platform.COVER, Platform.BUTTON, Platform.UPDATE]
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)
_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Udostępnij kartę Motor HA (wbudowaną albo pobraną nowszą) i sprawdzaj nowe wersje."""
    nowosci = hass.data[DOMAIN] = Nowosci(hass)
    await nowosci.async_przygotuj_karte()
    await hass.http.async_register_static_paths([StaticPathConfig(f"/{DOMAIN}", str(nowosci.katalog), False)])
    add_extra_js_url(hass, f"/{DOMAIN}/{LOADER}?v={VERSION}")
    # ten sam ładowacz widać też w Zasobach paneli – dodaje się i odświeża sam przy każdej wersji
    if hass.state is CoreState.running:
        hass.async_create_task(async_dodaj_zasob(hass))
    else:
        async def _po_starcie(_e) -> None:
            await async_dodaj_zasob(hass)
        hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STARTED, _po_starcie)
    nowosci.async_start()
    async_rejestruj(hass)
    async_logo_w_hacs(hass)   # logo Motoru HA w okienku „Update” od HACS
    # strona „Motor HA”: kreator z kółkami i obrazkami, ten sam co w karcie
    await panel_custom.async_register_panel(
        hass, frontend_url_path="okno-ha", webcomponent_name="okno-ha-panel",
        module_url=f"/{DOMAIN}/okno-ha-panel.js?v={VERSION}", require_admin=True)
    # bez wpisu w menu bocznym – kreator otwiera się z urządzenia okna („Ustawienia okna”) i z „Konfiguruj”
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Jedno okno = jeden wpis = jedno urządzenie."""
    nowosci = hass.data[DOMAIN]
    if not await hass.async_add_executor_job(nowosci.katalog.is_dir):   # okna usunięto i dodano znów bez restartu
        await nowosci.async_przygotuj_karte()
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    if panel := entry.options.get(CONF_NA_PANEL):   # „Dodaj kartę na panel” z kreatora – raz, przy dodaniu okna
        if panel != NIE and (encja := er.async_get(hass).async_get_entity_id("cover", DOMAIN, entry.entry_id)):
            try:
                await async_dodaj_karte(hass, panel, encja)
            except Exception:  # noqa: BLE001 – panel nie może zepsuć okna
                _LOGGER.exception("Motor HA: nie dodałem karty na panel %s", panel)
        hass.config_entries.async_update_entry(
            entry, options={k: v for k, v in entry.options.items() if k != CONF_NA_PANEL})
    entry.async_on_unload(entry.add_update_listener(_po_zmianie))
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Usunięto okno. Gdy to było ostatnie – sprzątnij pliki karty i zapisane dane Motoru HA."""
    if any(e.entry_id != entry.entry_id for e in hass.config_entries.async_entries(DOMAIN)):
        return
    nowosci = hass.data.get(DOMAIN)
    if nowosci is not None:
        await nowosci.async_usun_wszystko()
    await async_usun_zasob(hass)
    ir.async_delete_issue(hass, DOMAIN, RESTART)
    _LOGGER.info("Motor HA: usunięto ostatnie okno – pliki karty i dane Motoru HA skasowane")


async def _po_zmianie(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Po „Konfiguruj” przeładuj okno, żeby karta od razu dostała nowe ustawienia."""
    await hass.config_entries.async_reload(entry.entry_id)
