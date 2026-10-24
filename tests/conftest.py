import pytest

from custom_components.motor_ha.const import DOMAIN


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    yield


@pytest.fixture(autouse=True)
def integracja_wczytana(hass):
    """Jak po dodaniu pierwszego urządzenia: kreator graficzny jest już w przeglądarce (test_pierwsze_dodanie sprawdza stan bez tego)."""
    hass.data.setdefault(DOMAIN, {"wpisy": {}})
    yield
