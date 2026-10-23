"""Wspólne dla encji jednego urządzenia: opis urządzenia i obiekty działające w tle."""

from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING, Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo

from .const import BRAMY, CONF_OSLONA, DOMAIN, NAZWA, VERSION

if TYPE_CHECKING:
    from .automatyka import Automatyka
    from .powiadomienia import Powiadomienia

HUB = (DOMAIN, "motor_ha")   # urządzenie „Motor HA” (aktualizacja, tryb wakacyjny)


@dataclass
class Wpis:
    entry: ConfigEntry
    auto: Automatyka | None = None
    powiadomienia: Powiadomienia | None = None
    okno: Any = None

    @property
    def brama(self) -> bool:
        return self.entry.options.get(CONF_OSLONA) in BRAMY


# przetłumaczone nazwy rodzajów osłon (język HA) – model urządzenia to „Żaluzja dzień-noc”, nie „zebra”;
# wypełnia async_setup_entry przed utworzeniem urządzenia
NAZWY_OSLON: dict[str, str] = {}


def info_urzadzenia(entry: ConfigEntry) -> DeviceInfo:
    # urządzenie łączy się z „Motor HA” w __init__ (via_device_id) – via_device jest przestarzałe
    return DeviceInfo(
        identifiers={(DOMAIN, entry.entry_id)},
        name=entry.title,
        manufacturer=NAZWA,
        model=NAZWY_OSLON.get(oslona := str(entry.options.get(CONF_OSLONA) or ""), oslona),
        sw_version=VERSION,
    )


def info_hub() -> DeviceInfo:
    return DeviceInfo(identifiers={HUB}, name=NAZWA, manufacturer=NAZWA, model=NAZWA,
                      sw_version=VERSION, entry_type=DeviceEntryType.SERVICE)
