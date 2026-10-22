"""1.x → 2.0: okno z okno_ha przenosi się samo, stary wpis zostaje wyłączony."""

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.motor_ha.const import DOMAIN
from custom_components.motor_ha.migracja import Z_1X, async_przenies


async def test_przenies_okno(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    hass.states.async_set("cover.lewa", "open", {"current_position": 40, "supported_features": 15})
    hass.states.async_set("cover.prawa", "open", {"current_position": 60, "supported_features": 15})
    stary = MockConfigEntry(domain="okno_ha", title="Salon", data={}, options={
        "rolety": ["cover.lewa", "cover.prawa"], "skrzydla": "2", "oslona": "zebra", "kolor": "grafit", "czujnik_lewe": ""})
    stary.add_to_hass(hass)
    rej = er.async_get(hass)
    rej.async_get_or_create("cover", "okno_ha", "salon", suggested_object_id="salon", config_entry=stary)

    assert await async_przenies(hass) == 1
    await hass.async_block_till_done()
    nowe = hass.config_entries.async_entries(DOMAIN)
    assert len(nowe) == 1 and nowe[0].title == "Salon" and nowe[0].options[Z_1X] == stary.entry_id
    assert nowe[0].options["oslona"] == "zebra" and nowe[0].options["rolety"] == ["cover.lewa", "cover.prawa"]
    assert not nowe[0].options.get("f_slonce")
    assert stary.disabled_by is not None
    assert rej.async_get("cover.salon_1x") is not None
    assert hass.states.get("cover.salon") is not None   # nowe urządzenie ma tę samą nazwę encji
    # drugi raz nic nie przenosi
    assert await async_przenies(hass) == 0
