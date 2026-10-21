"""Powiadomienie o nowej wersji karty i integracji – samo, bez wchodzenia w HACS."""

from __future__ import annotations

from datetime import timedelta
import logging
import re

from homeassistant.components import persistent_notification
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.event import async_call_later, async_track_time_interval
from homeassistant.helpers.storage import Store

from .const import DOMAIN, KARTA_WERSJA, VERSION

_LOGGER = logging.getLogger(__name__)
CO_ILE = timedelta(minutes=30)
PIERWSZE_PO = 120   # sekund po starcie HA

# repozytorium, zainstalowana wersja (gdy HACS jej nie zna), nazwa w powiadomieniu
REPO = {
    "roleta-realistyczna": (KARTA_WERSJA, "karty Okno HA", "plugin"),
    "okno-ha-integracja": (VERSION, "integracji Okno HA", "integration"),
}


def numer(wersja: str | None) -> tuple[int, ...]:
    """„v29.1” → (29, 1); „1.0.1” → (1, 0, 1)."""
    return tuple(int(x) for x in re.findall(r"\d+", str(wersja or ""))) or (0,)


def zainstalowana(hass: HomeAssistant, repo: str, domyslna: str) -> str:
    """Wersja z encji aktualizacji HACS, a gdy jej nie ma – ta, którą znamy z integracji."""
    for s in hass.states.async_all("update"):
        if repo in str(s.attributes.get("release_url", "")) and s.attributes.get("installed_version"):
            return s.attributes["installed_version"]
    return domyslna


@callback
def async_start_nowosci(hass: HomeAssistant) -> None:
    store: Store = Store(hass, 1, f"{DOMAIN}.nowosci")

    async def sprawdz(_=None) -> None:
        zapisane = await store.async_load() or {}
        sesja = async_get_clientsession(hass)
        for repo, (domyslna, nazwa, kategoria) in REPO.items():
            try:
                async with sesja.get(f"https://api.github.com/repos/superdarco78/{repo}/releases/latest",
                                     timeout=15) as r:
                    if r.status != 200:
                        continue
                    najnowsza = (await r.json()).get("tag_name")
            except Exception as err:  # noqa: BLE001 – brak sieci nie może psuć HA
                _LOGGER.debug("Okno HA: nie sprawdzę %s: %s", repo, err)
                continue
            if not najnowsza or zapisane.get(repo) == najnowsza:
                continue
            if numer(najnowsza) <= numer(zainstalowana(hass, repo, domyslna)):
                continue
            link = f"https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository={repo}&category={kategoria}"
            persistent_notification.async_create(
                hass,
                f"Jest nowa wersja {nazwa}: **{najnowsza}**.\n\n"
                f"[Otwórz w HACS i kliknij Pobierz]({link})\n\n"
                f"[Co nowego](https://github.com/superdarco78/{repo}/releases/tag/{najnowsza})",
                title=f"🪟 Nowa wersja {nazwa}",
                notification_id=f"{DOMAIN}_{repo}",
            )
            zapisane[repo] = najnowsza
            await store.async_save(zapisane)

    async_call_later(hass, PIERWSZE_PO, sprawdz)
    async_track_time_interval(hass, sprawdz, CO_ILE)
