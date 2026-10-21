"""Ustawienia → Aktualizacje: jedna pozycja „Motor HA” (integracja z kartą w środku), z przyciskiem „Zainstaluj”."""

from __future__ import annotations

from datetime import timedelta
from typing import Any

from homeassistant.components.update import UpdateEntity, UpdateEntityFeature
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers import entity_registry as er, issue_registry as ir
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_time_interval

from .const import DOMAIN, VERSION
from .repairs import RESTART
from .nowosci import REPO_INTEGRACJA, REPO_KARTA, WLASCICIEL, Nowosci, numer


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    # jedna encja na całą integrację – przy pierwszym oknie
    pierwszy = min(e.entry_id for e in hass.config_entries.async_entries(DOMAIN))
    if entry.entry_id != pierwszy:
        return
    # do v1.4.4 karta miała osobną aktualizację – teraz jest w środku integracji
    rejestr = er.async_get(hass)
    if stara := rejestr.async_get_entity_id("update", DOMAIN, f"{DOMAIN}_{REPO_KARTA}"):
        rejestr.async_remove(stara)
    async_add_entities([Aktualizacja(hass.data[DOMAIN])])


class Aktualizacja(UpdateEntity):
    """Jedna pozycja „Motor HA” w Aktualizacjach, jeden numer wersji: karta jest w środku integracji."""

    _attr_has_entity_name = True
    _attr_name = None   # = nazwa urządzenia „Motor HA”
    _attr_title = "Motor HA"
    _attr_should_poll = False
    _attr_entity_picture = f"/{DOMAIN}/ikona.png"
    # bez „Utwórz kopię zapasową” – Motor HA podmienia tylko swoje pliki, aktualizacja trwa kilka sekund
    _attr_supported_features = (UpdateEntityFeature.INSTALL | UpdateEntityFeature.RELEASE_NOTES
                                 | UpdateEntityFeature.PROGRESS)

    def __init__(self, nowosci: Nowosci) -> None:
        self._n = nowosci
        self._zainstalowana = f"v{VERSION}"
        self._attr_unique_id = f"{DOMAIN}_{REPO_INTEGRACJA}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, "okno_ha")}, name="Motor HA", manufacturer="Motor HA",
            model="Integracja z kartą", sw_version=VERSION, entry_type=DeviceEntryType.SERVICE)

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self._n.sluchaj(self.async_write_ha_state))
        # HACS może wystartować później – co minutę sprawdź, czy to on już pokazuje aktualizację
        self.async_on_remove(async_track_time_interval(
            self.hass, callback(lambda _now: self.async_write_ha_state()), timedelta(minutes=1)))   # w pętli zdarzeń, nie w wątku

    @property
    def _wydanie(self) -> dict:
        return self._n.wydania.get(REPO_INTEGRACJA, {})

    @property
    def installed_version(self) -> str | None:
        return self._zainstalowana

    @property
    def latest_version(self) -> str | None:
        if self._hacs():   # HACS sam pokazuje tę aktualizację – bez drugiej, takiej samej pozycji
            return self._zainstalowana
        return self._wydanie.get("wersja") or self._zainstalowana

    def _hacs(self) -> str | None:
        """Encja aktualizacji HACS dla Motoru HA (gdy Motor HA jest zainstalowane przez HACS)."""
        if self.hass is None:
            return None
        return next((s.entity_id for s in self.hass.states.async_all("update")
                     if REPO_INTEGRACJA in str(s.attributes.get("release_url", ""))
                     and s.entity_id != self.entity_id), None)

    def version_is_newer(self, latest_version: str, installed_version: str) -> bool:
        return numer(latest_version) > numer(installed_version)

    @property
    def release_url(self) -> str:
        return self._wydanie.get("url") or f"https://github.com/{WLASCICIEL}/{REPO_INTEGRACJA}/releases"

    @property
    def release_summary(self) -> str | None:
        return self._wydanie.get("tytul")

    async def async_release_notes(self) -> str | None:
        return self._wydanie.get("opis")

    def _postep(self, procent: int | None) -> None:
        self._attr_in_progress = procent is not None
        self._attr_update_percentage = procent
        self.async_write_ha_state()

    async def async_install(self, version: str | None, backup: bool, **kwargs: Any) -> None:
        self._postep(0)
        try:
            self._postep(40)
            await self._zainstaluj_integracje(version or self._wydanie.get("wersja") or self._zainstalowana)
            self._postep(100)
        finally:
            self._postep(None)

    async def _zainstaluj_integracje(self, wersja: str) -> None:
        hacs = self._hacs()
        zrobione = False
        if hacs:   # zainstalowana przez HACS – niech HACS ją zaktualizuje, żeby wiedział o nowej wersji
            try:
                await self.hass.services.async_call("update", "install", {"entity_id": hacs, "version": wersja}, blocking=True)
                zrobione = True
            except Exception:  # noqa: BLE001 – HACS jeszcze nie zna tej wersji: pobieramy sami
                pass
        if not zrobione:
            await self._n.async_zainstaluj_integracje(wersja)
        self._zainstalowana = wersja
        # „Napraw” w Ustawieniach: restart jednym kliknięciem, po polsku
        ir.async_create_issue(self.hass, DOMAIN, RESTART, is_fixable=True, is_persistent=False,
                              severity=ir.IssueSeverity.WARNING, translation_key=RESTART,
                              translation_placeholders={"wersja": wersja})
