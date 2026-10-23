"""Kreator wizualny: obrazki rodzajów i palety kolorów, podgląd okna, mądre listy czujników z pokoju osłony."""

from base64 import b64decode
import json
import re

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.helpers import area_registry as ar
from homeassistant.setup import async_setup_component

from custom_components.motor_ha import galeria, skan
from custom_components.motor_ha.const import DOMAIN, KOLORY, RODZAJE


def _svg(opis: str, znacznik: str) -> str:
    for b in re.findall(r"data:image/svg\+xml;base64,([A-Za-z0-9+/=]+)", opis):
        s = b64decode(b).decode()
        if znacznik in s:
            return s
    raise AssertionError(f"brak obrazka {znacznik}")


def test_kafelki_kazdy_rodzaj_ma_rysunek() -> None:
    s = galeria.svg("oslona", RODZAJE, "zebra", {})
    assert s.count('data-on="1"') == 1 and f'data-opcje="{",".join(RODZAJE)}"' in s
    rysunki = {k: galeria.rysunek(k, 0, 0) for k in RODZAJE}   # każdy rodzaj ma własny rysunek, nie puste okno
    assert galeria._okno(0, 0) not in rysunki.values() and len(set(rysunki.values())) == len(RODZAJE)
    p = galeria.svg("kolor", list(KOLORY), "czarny", {"pomaranczowy": "pomarańczowy"}, "kolor")
    assert KOLORY["czarny"] in p and 'data-kol="5"' in p


async def _do_kroku(hass: HomeAssistant, krok: str, mam: list[str], tryb: str = "podstawowy"):
    await async_setup_component(hass, "http", {})
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"tryb": tryb})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"mam": mam})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"rolety": ["cover.zaluzja_lewa_salon"]})
    while r["step_id"] != krok:
        r = await hass.config_entries.flow.async_configure(r["flow_id"], {})
    return r


async def test_rodzaj_i_kolory_z_obrazkami_i_podgladem(hass: HomeAssistant) -> None:
    hass.states.async_set("cover.zaluzja_lewa_salon", "open", {"current_position": 50, "supported_features": 15})
    r = await _do_kroku(hass, "rodzaj", [])
    opis = r["description_placeholders"]
    assert "data-motor-ha-wybor" in _svg(opis["galeria"], "data-motor-ha-wybor")
    pasek = _svg(opis["pasek"], "data-motor-ha-kroki")
    podglad = json.loads(b64decode(re.search(r'data-podglad="([^"]+)"', pasek).group(1)))
    assert podglad["oslona"] and podglad["kolor"]
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"oslona": "zebra"})
    assert r["step_id"] == "kolory"
    assert _svg(r["description_placeholders"]["galeria"], 'data-motor-ha-wybor="kolor"')
    assert _svg(r["description_placeholders"]["galeria"], 'data-motor-ha-wybor="rama"')
    assert '"zebra"' in b64decode(re.search(r'data-podglad="([^"]+)"', _svg(
        r["description_placeholders"]["pasek"], "data-motor-ha-kroki")).group(1)).decode()


async def test_czujniki_tylko_pasujace_z_pokoju(hass: HomeAssistant) -> None:
    ar.async_get(hass).async_create("Salon")
    ar.async_get(hass).async_create("Kuchnia")
    hass.states.async_set("cover.zaluzja_lewa_salon", "open", {"current_position": 50, "supported_features": 15})
    hass.states.async_set("binary_sensor.okno_kuchnia", "off", {"device_class": "window"})
    hass.states.async_set("binary_sensor.okno_salon_lewe", "off", {"device_class": "window"})
    hass.states.async_set("binary_sensor.kontaktron_okno_salon_prawe", "off", {})   # bez klasy, ale nazwa „okno”
    hass.states.async_set("binary_sensor.ducato_android_auto", "off", {})
    hass.states.async_set("binary_sensor.wodomierz_alarm", "on", {"device_class": "problem"})
    lista = skan.pasujace(hass, "okno", "cover.zaluzja_lewa_salon")
    assert lista[:2] == ["binary_sensor.kontaktron_okno_salon_prawe", "binary_sensor.okno_salon_lewe"]
    assert set(lista) == {"binary_sensor.okno_kuchnia", "binary_sensor.okno_salon_lewe",
                          "binary_sensor.kontaktron_okno_salon_prawe"}
    assert skan.podpowiedz(hass, "okno", "cover.zaluzja_lewa_salon", lista) in lista[:2]
    # czujnik z innego pokoju nie jest podpowiadany sam
    assert skan.podpowiedz(hass, "okno", "cover.zaluzja_lewa_salon", ["binary_sensor.okno_kuchnia"]) is None

    r = await _do_kroku(hass, "czujniki", ["okno"])
    pola = {str(k): v for k, v in r["data_schema"].schema.items()}
    wybor = pola["czujnik_lewe"].config
    assert "binary_sensor.ducato_android_auto" not in wybor["include_entities"]
    assert "binary_sensor.okno_salon_lewe" in wybor["include_entities"]
