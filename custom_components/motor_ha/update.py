"""Jedna pozycja „Motor HA” w Ustawienia → Aktualizacje (integracja i karta razem, jeden numer).

Co 2 minuty pyta GitHuba o najnowsze wydanie (z ETag, nie zjada limitu). Gdy HACS sam pokazuje
aktualizację Motor HA, ta encja się chowa (nie ma dwóch takich samych pozycji), a HACS dostaje
sygnał, żeby odświeżył tylko repozytorium Motor HA.
"""

from __future__ import annotations

from datetime import timedelta
import io
import logging
from pathlib import Path
import re
from typing import Any
import zipfile

from homeassistant.components.update import UpdateEntity, UpdateEntityFeature
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_time_interval

from .const import DOMAIN, NAZWA, PACZKA, REPO, VERSION, WLASCICIEL
from .urzadzenie import info_hub

_LOGGER = logging.getLogger(__name__)
CO_ILE = timedelta(minutes=2)
RESTART = "restart"


@callback
def prosba_o_restart(hass: HomeAssistant, wersja: str) -> None:
    """Jedna prośba o restart w „Naprawach”: gdy HACS już ma swoją („Restart required”), nasza znika."""
    if any(d == "hacs" and (i.startswith("restart_required") or p.translation_key == "restart_required") and p.active
           and not p.dismissed_version for (d, i), p in ir.async_get(hass).issues.items()):
        ir.async_delete_issue(hass, DOMAIN, RESTART)
        return
    ir.async_create_issue(hass, DOMAIN, RESTART, is_fixable=True, is_persistent=False,
                          severity=ir.IssueSeverity.WARNING, translation_key=RESTART,
                          translation_placeholders={"wersja": wersja})


def numer(wersja: str | None) -> tuple[int, ...]:
    return tuple(int(x) for x in re.findall(r"\d+", str(wersja or ""))) or (0,)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    if hass.data[DOMAIN].get("aktualizacja"):
        return
    hass.data[DOMAIN]["aktualizacja"] = encja = Aktualizacja(entry.entry_id)
    async_add_entities([encja])


class Aktualizacja(UpdateEntity):
    _attr_has_entity_name = True
    _attr_name = None
    _attr_title = NAZWA
    _attr_should_poll = False
    _attr_entity_picture = f"/{DOMAIN}/ikona.png"
    _attr_supported_features = (UpdateEntityFeature.INSTALL | UpdateEntityFeature.RELEASE_NOTES
                                 | UpdateEntityFeature.PROGRESS)

    def __init__(self, entry_id: str) -> None:
        self._entry_id = entry_id
        self._attr_unique_id = f"{DOMAIN}_{REPO}"
        self._attr_device_info = info_hub()
        self._zainstalowana = f"v{VERSION}"
        self._wydanie: dict[str, Any] = {}
        self._etag: str | None = None
        self._hacs_znane: str | None = None

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(async_track_time_interval(self.hass, self._sprawdz, CO_ILE))
        self.async_on_remove(async_track_time_interval(
            self.hass, callback(lambda _n: self.async_write_ha_state()), timedelta(minutes=1)))
        self.hass.async_create_task(self._sprawdz())

    async def async_will_remove_from_hass(self) -> None:
        if self.hass.data.get(DOMAIN, {}).get("aktualizacja") is self:
            self.hass.data[DOMAIN].pop("aktualizacja")

    # --- GitHub ---

    async def _sprawdz(self, *_args: Any) -> None:
        naglowki = {"Accept": "application/vnd.github+json"}
        if self._etag:
            naglowki["If-None-Match"] = self._etag
        try:
            async with async_get_clientsession(self.hass).get(
                    f"https://api.github.com/repos/{WLASCICIEL}/{REPO}/releases/latest", headers=naglowki, timeout=15) as r:
                if r.status != 200:
                    return
                d = await r.json()
                self._etag = r.headers.get("ETag")
        except Exception as err:  # noqa: BLE001 – brak sieci nie może psuć HA
            _LOGGER.debug("Motor HA: nie sprawdzę GitHuba: %s", err)
            return
        if d.get("tag_name"):
            self._wydanie = {"wersja": d["tag_name"], "opis": d.get("body") or "", "url": d.get("html_url"),
                             "tytul": d.get("name") or d["tag_name"]}
            self.async_write_ha_state()
            await self._odswiez_hacs()

    async def _odswiez_hacs(self) -> None:
        """HACS sam sprawdza co 48 h – przy nowym wydaniu odświeża tylko repozytorium Motor HA."""
        nowa = self._wydanie.get("wersja")
        hacs = self.hass.data.get("hacs")
        if not nowa or hacs is None or nowa == self._hacs_znane:
            return
        try:
            repo = hacs.repositories.get_by_full_name(f"{WLASCICIEL}/{REPO}")
            if repo is None or repo.display_available_version == nowa:
                return
            self._hacs_znane = nowa
            await repo.update_repository(ignore_issues=True, force=True)
            await hacs.data.async_write()
            if (k := hacs.coordinators.get(repo.data.category)) is not None:
                k.async_update_listeners()
            for e in list(getattr(self.hass.data.get("update"), "entities", []) or []):
                if getattr(e, "repository", None) is repo and e.hass is not None:
                    e.async_write_ha_state()
        except Exception as err:  # noqa: BLE001 – inna wersja HACS: zostaje jego własne sprawdzanie
            _LOGGER.debug("Motor HA: nie odświeżyłem HACS: %s", err)

    # --- encja ---

    def _hacs(self) -> str | None:
        if self.hass is None:
            return None
        return next((s.entity_id for s in self.hass.states.async_all("update")
                     if REPO in str(s.attributes.get("release_url", "")) and s.entity_id != self.entity_id), None)

    @property
    def installed_version(self) -> str:
        return self._zainstalowana

    @property
    def latest_version(self) -> str:
        if self._hacs():
            return self._zainstalowana
        return self._wydanie.get("wersja") or self._zainstalowana

    def version_is_newer(self, latest_version: str, installed_version: str) -> bool:
        return numer(latest_version) > numer(installed_version)

    @property
    def release_url(self) -> str:
        return self._wydanie.get("url") or f"https://github.com/{WLASCICIEL}/{REPO}/releases"

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
        wersja = version or self._wydanie.get("wersja") or self._zainstalowana
        self._postep(10)
        try:
            if (hacs := self._hacs()):
                await self.hass.services.async_call("update", "install", {"entity_id": hacs, "version": wersja},
                                                    blocking=True)
                if Path(__file__).parent.name != DOMAIN:
                    # HA wczytuje Motor HA z innego folderu niż ten, do którego pisze HACS – ten też dostaje nową wersję
                    await self._pobierz(wersja)
            else:
                self._postep(40)
                await self._pobierz(wersja)
            self._zainstalowana = wersja
            prosba_o_restart(self.hass, wersja)
        finally:
            self._postep(None)

    async def _pobierz(self, wersja: str) -> None:
        async with async_get_clientsession(self.hass).get(
                f"https://github.com/{WLASCICIEL}/{REPO}/releases/download/{wersja}/{PACZKA}", timeout=120) as r:
            r.raise_for_status()
            tresc = await r.read()
        tu = Path(__file__).parent

        def _rozpakuj() -> None:
            with zipfile.ZipFile(io.BytesIO(tresc)) as z:
                for nazwa in z.namelist():
                    if nazwa.endswith("/"):
                        continue
                    cel = (tu / nazwa).resolve()
                    if tu.resolve() not in cel.parents:
                        continue
                    cel.parent.mkdir(parents=True, exist_ok=True)
                    cel.write_bytes(z.read(nazwa))

        await self.hass.async_add_executor_job(_rozpakuj)
