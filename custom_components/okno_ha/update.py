"""Ustawienia → Aktualizacje: karta Okno HA i integracja Okno HA, z przyciskiem „Zainstaluj”."""

from __future__ import annotations

from typing import Any

from homeassistant.components import persistent_notification
from homeassistant.components.update import UpdateEntity, UpdateEntityFeature
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, VERSION
from .nowosci import REPO_INTEGRACJA, REPO_KARTA, WLASCICIEL, Nowosci, numer


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    # jedna para encji na całą integrację – przy pierwszym oknie
    pierwszy = min(e.entry_id for e in hass.config_entries.async_entries(DOMAIN))
    if entry.entry_id != pierwszy:
        return
    nowosci: Nowosci = hass.data[DOMAIN]
    async_add_entities([AktualizacjaKarty(nowosci), AktualizacjaIntegracji(nowosci)])


class _Aktualizacja(UpdateEntity):
    _attr_has_entity_name = True
    _attr_should_poll = False
    _attr_supported_features = (UpdateEntityFeature.INSTALL | UpdateEntityFeature.RELEASE_NOTES
                                 | UpdateEntityFeature.PROGRESS | UpdateEntityFeature.BACKUP)
    repo: str

    def __init__(self, nowosci: Nowosci) -> None:
        self._n = nowosci
        self._attr_unique_id = f"{DOMAIN}_{self.repo}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, "okno_ha")}, name="Okno HA", manufacturer="Okno HA",
            model="Karta i integracja", sw_version=VERSION, entry_type=DeviceEntryType.SERVICE)

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self._n.sluchaj(self.async_write_ha_state))

    @property
    def _wydanie(self) -> dict:
        return self._n.wydania.get(self.repo, {})

    @property
    def latest_version(self) -> str | None:
        return self._wydanie.get("wersja") or self.installed_version

    @property
    def release_url(self) -> str:
        return self._wydanie.get("url") or f"https://github.com/{WLASCICIEL}/{self.repo}/releases"

    @property
    def release_summary(self) -> str | None:
        return self._wydanie.get("tytul")

    def version_is_newer(self, latest_version: str, installed_version: str) -> bool:
        return numer(latest_version) > numer(installed_version)

    async def async_release_notes(self) -> str | None:
        return self._wydanie.get("opis")

    def _postep(self, procent: int | None) -> None:
        self._attr_in_progress = procent is not None
        self._attr_update_percentage = procent
        self.async_write_ha_state()

    async def _kopia(self, backup: bool) -> None:
        """„Utwórz kopię zapasową” w oknie aktualizacji – kopia HA przed instalacją."""
        if backup and self.hass.services.has_service("backup", "create_automatic"):
            await self.hass.services.async_call("backup", "create_automatic", blocking=True)


class AktualizacjaKarty(_Aktualizacja):
    repo = REPO_KARTA
    _attr_name = "Karta Okno HA"

    @property
    def installed_version(self) -> str | None:
        return self._n.karta_wersja

    async def async_install(self, version: str | None, backup: bool, **kwargs: Any) -> None:
        self._postep(0)
        try:
            await self._kopia(backup)
            self._postep(40)
            await self._n.async_zainstaluj_karte(version or self.latest_version)
        finally:
            self._postep(None)


class AktualizacjaIntegracji(_Aktualizacja):
    repo = REPO_INTEGRACJA
    _attr_name = "Integracja Okno HA"

    def __init__(self, nowosci: Nowosci) -> None:
        super().__init__(nowosci)
        self._zainstalowana = f"v{VERSION}"

    @property
    def installed_version(self) -> str | None:
        return self._zainstalowana

    async def async_install(self, version: str | None, backup: bool, **kwargs: Any) -> None:
        wersja = version or self.latest_version
        self._postep(0)
        try:
            await self._kopia(backup)
            self._postep(40)
            hacs = next((s.entity_id for s in self.hass.states.async_all("update")
                         if REPO_INTEGRACJA in str(s.attributes.get("release_url", ""))
                         and s.entity_id != self.entity_id), None)
            if hacs:   # zainstalowana przez HACS – niech HACS ją zaktualizuje, żeby wiedział o nowej wersji
                await self.hass.services.async_call("update", "install", {"entity_id": hacs, "version": wersja}, blocking=True)
            else:
                await self._n.async_zainstaluj_integracje(wersja)
            self._zainstalowana = wersja
            persistent_notification.async_create(
                self.hass,
                f"Integracja Okno HA {wersja} jest pobrana. Uruchom ponownie Home Assistanta, żeby zaczęła działać.\n\n"
                "[Uruchom ponownie](https://my.home-assistant.io/redirect/server_controls/)",
                title="🪟 Okno HA – potrzebny restart", notification_id=f"{DOMAIN}_restart")
        finally:
            self._postep(None)
