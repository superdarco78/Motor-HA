"""Pierwsze urządzenie po instalacji z HACS: integracja jeszcze nie działa, więc kreator graficzny nie jest wczytany."""
from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResultType

from custom_components.motor_ha.const import DOMAIN


async def test_pierwsze_dodanie_wczytuje_i_prosi_o_odswiezenie(hass):
    hass.data.pop(DOMAIN, None)
    w = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert w["type"] is FlowResultType.ABORT and w["reason"] == "odswiez"
    assert DOMAIN in hass.config.components
    # po odświeżeniu kreator działa normalnie
    w = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert w["type"] is FlowResultType.FORM
