"""Połączenie z edytorem karty i panelem „Motor HA”: lista okien, zapis zmian, nowe okno."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er

from .const import DOMAIN
from .cover import opcje_z_karty


@callback
def async_rejestruj(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_lista)
    websocket_api.async_register_command(hass, ws_zapisz)
    websocket_api.async_register_command(hass, ws_utworz)


def _okno(hass: HomeAssistant, entry_id: str) -> str | None:
    return next((e.entity_id for e in er.async_entries_for_config_entry(er.async_get(hass), entry_id)
                 if e.domain == "cover"), None)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/lista"})
@callback
def ws_lista(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    conn.send_result(msg["id"], [{"entry_id": e.entry_id, "nazwa": e.title, "entity_id": _okno(hass, e.entry_id)}
                                 for e in hass.config_entries.async_entries(DOMAIN)])


@websocket_api.require_admin
@websocket_api.websocket_command({
    vol.Required("type"): f"{DOMAIN}/zapisz",
    vol.Required("entity_id"): str,
    vol.Required("karta"): dict,
})
@callback
def ws_zapisz(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Zmiana w edytorze karty okna z integracji → zapis w urządzeniu (to samo, co „Konfiguruj”)."""
    wpis = er.async_get(hass).async_get(msg["entity_id"])
    entry = hass.config_entries.async_get_entry(wpis.config_entry_id) if wpis and wpis.platform == DOMAIN else None
    if not entry:
        conn.send_error(msg["id"], "nie_okno", "To nie jest okno z integracji Motor HA")
        return
    karta = dict(msg["karta"])
    nazwa = str(karta.get("name") or "").strip()
    hass.config_entries.async_update_entry(entry, options=opcje_z_karty(karta, dict(entry.options), hass),
                                           title=nazwa or entry.title)
    conn.send_result(msg["id"], {"entry_id": entry.entry_id})


@websocket_api.require_admin
@websocket_api.websocket_command({
    vol.Required("type"): f"{DOMAIN}/utworz",
    vol.Required("karta"): dict,
})
@websocket_api.async_response
async def ws_utworz(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Nowe okno z kreatora karty (panel „Motor HA”)."""
    karta = dict(msg["karta"])
    if not str(karta.get("entity", "")).startswith("cover."):
        conn.send_error(msg["id"], "brak_rolety", "Wybierz roletę")
        return
    karta["_roleta"] = karta["entity"]
    wynik = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "panel"}, data=karta)
    entry = wynik.get("result")
    conn.send_result(msg["id"], {"entry_id": entry.entry_id if entry else None,
                                 "entity_id": _okno(hass, entry.entry_id) if entry else None})


