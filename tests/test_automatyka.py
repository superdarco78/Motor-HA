"""Automatyka w działającym HA: słońce, blokada okna, ręczny ruch i powiadomienia."""

from homeassistant.core import HomeAssistant
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_mock_service

from custom_components.motor_ha.const import DOMAIN, DOMYSLNE

ROLETY = ["cover.lewa", "cover.prawa"]


async def _wpis(hass: HomeAssistant, **opcje) -> MockConfigEntry:
    await async_setup_component(hass, "http", {})
    for e in ROLETY:
        hass.states.async_set(e, "open", {"current_position": 100, "supported_features": 15})
    hass.states.async_set("sun.sun", "above_horizon", {"azimuth": 180, "elevation": 50})
    hass.states.async_set("weather.dom", "sunny", {"temperature": 30})
    wpis = MockConfigEntry(domain=DOMAIN, version=2, title="Salon",
                           options={**DOMYSLNE, "rolety": ROLETY, "pogoda": "weather.dom", "mam": ["pogoda"],
                                    "cisza_min": 0, **opcje})
    wpis.add_to_hass(hass)
    assert await hass.config_entries.async_setup(wpis.entry_id)
    await hass.async_block_till_done()
    return wpis


async def test_slonce_opuszcza(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "cover", {})
    ruchy = async_mock_service(hass, "cover", "set_cover_position")
    await _wpis(hass, f_slonce=True, f_cisza=False)
    await hass.services.async_call(DOMAIN, "przelicz", {"entity_id": "cover.salon"}, blocking=True)
    await hass.async_block_till_done()
    assert ruchy, "osłona powinna zjechać"
    assert {c.data["position"] for c in ruchy} == {20}
    assert hass.states.get("sensor.salon_reason_for_move").state == "slonce"


async def test_blokada_okna(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "cover", {})
    ruchy = async_mock_service(hass, "cover", "set_cover_position")
    hass.states.async_set("binary_sensor.okno", "on")
    await _wpis(hass, f_slonce=True, f_blokada=True, czujnik_lewe="binary_sensor.okno", mam=["pogoda", "okno"])
    await hass.services.async_call(DOMAIN, "przelicz", {"entity_id": "cover.salon"}, blocking=True)
    await hass.async_block_till_done()
    assert not ruchy
    assert hass.states.get("sensor.salon_reason_for_move").state == "blokada"


async def test_nic_bez_funkcji(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "cover", {})
    ruchy = async_mock_service(hass, "cover", "set_cover_position")
    await _wpis(hass)
    await hass.services.async_call(DOMAIN, "przelicz", {"entity_id": "cover.salon"}, blocking=True)
    await hass.async_block_till_done()
    assert not ruchy


async def test_proba_na_sucho(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "cover", {})
    ruchy = async_mock_service(hass, "cover", "set_cover_position")
    await _wpis(hass, f_slonce=True, f_proba=True)
    await hass.services.async_call(DOMAIN, "przelicz", {"entity_id": "cover.salon"}, blocking=True)
    await hass.async_block_till_done()
    assert not ruchy
    assert hass.states.get("sensor.salon_reason_for_move").state == "slonce"
