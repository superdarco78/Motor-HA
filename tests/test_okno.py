"""Kreator, „Konfiguruj” i encja okna."""

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import async_mock_service

from custom_components.okno_ha.const import DOMAIN

ROLETY = ["cover.lewa", "cover.prawa"]


def _rolety(hass: HomeAssistant, lewa=40, prawa=60) -> None:
    hass.states.async_set("cover.lewa", "open", {"current_position": lewa})
    hass.states.async_set("cover.prawa", "open", {"current_position": prawa})


async def _dodaj(hass: HomeAssistant):
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert r["type"] is FlowResultType.FORM and r["step_id"] == "user"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"name": "Salon", "rolety": ["cover.lewa", "cover.lewa", "cover.prawa"]})
    assert r["errors"] == {"rolety": "rolety"}            # najwyżej dwie rolety
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"name": "Salon", "rolety": ROLETY})
    assert r["step_id"] == "okno"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"skrzydla": "2", "czujnik_lewe": "binary_sensor.okno", "tryb_lewe": "otworz", "tryb_prawe": "uchyl"})
    assert r["step_id"] == "silnik"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"czas": 0})
    assert r["step_id"] == "pogoda"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {})
    assert r["step_id"] == "wyglad"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"oslona": "natynkowa", "kolor": "grafit", "rama": "antracyt", "wysokosc": 300})
    assert r["type"] is FlowResultType.CREATE_ENTRY and r["title"] == "Salon"
    await hass.async_block_till_done()
    return r["result"]


async def test_kreator_i_encja(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    await _dodaj(hass)
    st = hass.states.get("cover.okno_salon")
    assert st is not None
    assert st.attributes["current_position"] == 50
    assert st.attributes["entity_id"] == ROLETY
    k = st.attributes["okno_ha"]
    assert k["roleta_lewa"] == "cover.lewa" and k["roleta_prawa"] == "cover.prawa"
    assert k["oslona"] == "natynkowa" and k["kolor"] == "grafit" and k["rama"] == "#3b3f45"
    assert k["czujnik_lewe"] == "binary_sensor.okno" and k["tryb_lewe"] == "otworz"
    assert k["czas"] == "auto" and k["pogoda"] == "auto" and k["skrzydla"] == 2 and k["wysokosc"] == 300
    assert "predkosc_lewa" not in k
    # pozycja śledzi skrzydła
    _rolety(hass, 0, 0)
    await hass.async_block_till_done()
    assert hass.states.get("cover.okno_salon").state == "closed"


async def test_polecenia_ida_do_skrzydel(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    await _dodaj(hass)
    wywolania = async_mock_service(hass, "cover", "set_cover_position")   # po starcie: zastępuje prawdziwą usługę
    okno = hass.data["entity_components"]["cover"].get_entity("cover.okno_salon")
    await okno.async_set_cover_position(position=30)
    assert wywolania[-1].data == {"entity_id": ROLETY, "position": 30}


async def test_konfiguruj(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    wpis = await _dodaj(hass)
    r = await hass.config_entries.options.async_init(wpis.entry_id)
    assert r["step_id"] == "user"
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"rolety": ROLETY})
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"skrzydla": "2", "tryb_lewe": "uchyl", "tryb_prawe": "uchyl"})   # czujnik wyczyszczony
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"czas": 25})
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"pogoda": "weather.dom"})
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"oslona": "screen", "kolor": "#123456", "rama": "biala", "wysokosc": 260})
    assert r["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    k = hass.states.get("cover.okno_salon").attributes["okno_ha"]
    assert k["oslona"] == "screen" and k["kolor"] == "#123456" and k["czas"] == 25 and k["pogoda"] == "weather.dom"
    assert "czujnik_lewe" not in k


def test_numer_wersji():
    from custom_components.okno_ha.nowosci import numer
    assert numer("v29") > numer("v28.1") > numer("v28")
    assert numer("1.1.0") > numer("1.0.1")
    assert numer(None) == (0,)


async def test_powiadomienie_o_nowej_wersji(hass, aioclient_mock):
    from datetime import timedelta
    from homeassistant.util import dt as dt_util
    from pytest_homeassistant_custom_component.common import async_fire_time_changed
    from custom_components.okno_ha.nowosci import async_start_nowosci

    aioclient_mock.get("https://api.github.com/repos/superdarco78/roleta-realistyczna/releases/latest",
                       json={"tag_name": "v99"})
    aioclient_mock.get("https://api.github.com/repos/superdarco78/okno-ha-integracja/releases/latest",
                       json={"tag_name": "0.0.1"})
    async_start_nowosci(hass)
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=130))
    await hass.async_block_till_done()
    from homeassistant.components.persistent_notification import _async_get_or_create_notifications
    ids = set(_async_get_or_create_notifications(hass))
    assert "okno_ha_roleta-realistyczna" in ids
    assert "okno_ha_okno-ha-integracja" not in ids
