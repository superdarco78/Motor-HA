"""Połączenie z edytorem karty: lista urządzeń, zapis zmian z edytora, eksport ustawień."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.const import ATTR_ENTITY_ID
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er

from .const import (
    CONF_CZAS,
    CONF_KARTA,
    CONF_KOLOR,
    CONF_KOLOR_WLASNY,
    CONF_POGODA,
    CONF_RAMA,
    CONF_RAMA_WLASNA,
    CONF_ROLETY,
    CONF_SKRZYDLA,
    DOMAIN,
    RAMY,
)

# ustawienia karty, które zna też kreator integracji – zapisywane w obu miejscach
Z_KARTY = ["czujnik_lewe", "czujnik_prawe", "tryb_lewe", "tryb_prawe", "predkosc_lewa", "predkosc_prawa",
           "oslona", "wysokosc", "odwroc"]
POMIJANE = {"type", "entity", "grid_options", "view_layout", "visibility", "layout_options"}


def opcje_z_karty(karta: dict[str, Any], stare: dict[str, Any], hass: HomeAssistant) -> dict[str, Any]:
    """Zmiany z edytora karty → opcje urządzenia. Pełne ustawienia karty idą w „karta”."""
    karta = {k: v for k, v in karta.items() if k not in POMIJANE}
    o = {k: v for k, v in stare.items() if k not in Z_KARTY and k not in (CONF_KOLOR_WLASNY, CONF_RAMA_WLASNA)}
    o.update({k: karta[k] for k in Z_KARTY if karta.get(k) not in (None, "")})
    if karta.get("roleta_lewa") and karta.get("roleta_prawa"):
        o[CONF_ROLETY] = [karta["roleta_lewa"], karta["roleta_prawa"]]
    if "skrzydla" in karta:
        o[CONF_SKRZYDLA] = str(karta["skrzydla"])
    if isinstance(kolor := karta.get(CONF_KOLOR), str):
        o[CONF_KOLOR] = kolor
    if isinstance(rama := karta.get(CONF_RAMA), str):
        o[CONF_RAMA] = next((k for k, v in RAMY.items() if v == rama.lower()), rama)
    czas = karta.get(CONF_CZAS)
    o[CONF_CZAS] = czas if isinstance(czas, (int, float)) else 0
    if karta.get(CONF_POGODA) and karta[CONF_POGODA] != "auto":
        o[CONF_POGODA] = karta[CONF_POGODA]
    for k in ("powod", "pauza_do", "encje", "name"):
        karta.pop(k, None)
    o[CONF_KARTA] = karta
    return o


@callback
def async_rejestruj(hass: HomeAssistant) -> None:
    websocket_api.async_register_command(hass, ws_lista)
    websocket_api.async_register_command(hass, ws_zapisz)
    websocket_api.async_register_command(hass, ws_eksport)


def _okno(hass: HomeAssistant, entry_id: str) -> str | None:
    return er.async_get(hass).async_get_entity_id("cover", DOMAIN, entry_id)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/lista"})
@callback
def ws_lista(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    conn.send_result(msg["id"], [{"entry_id": e.entry_id, "nazwa": e.title, "entity_id": _okno(hass, e.entry_id),
                                  "oslona": e.options.get("oslona")}
                                 for e in hass.config_entries.async_entries(DOMAIN)])


def _wpis(hass: HomeAssistant, entity_id: str):
    w = er.async_get(hass).async_get(entity_id)
    return hass.config_entries.async_get_entry(w.config_entry_id) if w and w.platform == DOMAIN and w.config_entry_id else None


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/zapisz", vol.Required(ATTR_ENTITY_ID): str,
                                  vol.Required("karta"): dict})
@callback
def ws_zapisz(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Zmiana w edytorze karty urządzenia Motor HA → zapis w urządzeniu (jak „Konfiguruj”)."""
    if (entry := _wpis(hass, msg[ATTR_ENTITY_ID])) is None:
        conn.send_error(msg["id"], "nie_motor_ha", "Not a Motor HA device")
        return
    karta = dict(msg["karta"])
    nazwa = str(karta.get("name") or "").strip()
    hass.config_entries.async_update_entry(entry, options=opcje_z_karty(karta, dict(entry.options), hass),
                                           title=nazwa or entry.title)
    conn.send_result(msg["id"], {"entry_id": entry.entry_id})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/eksport", vol.Required(ATTR_ENTITY_ID): str})
@callback
def ws_eksport(hass: HomeAssistant, conn: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    if (entry := _wpis(hass, msg[ATTR_ENTITY_ID])) is None:
        conn.send_error(msg["id"], "nie_motor_ha", "Not a Motor HA device")
        return
    conn.send_result(msg["id"], {"nazwa": entry.title, "opcje": dict(entry.options)})
