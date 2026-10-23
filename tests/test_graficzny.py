"""Kreator graficzny 2.2.0: układ okna z polami, zapis przez zwykły krok kreatora, dane dla kroków."""

import json

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.helpers import area_registry as ar, entity_registry as er
from homeassistant.setup import async_setup_component

from custom_components.motor_ha.const import DOMAIN, PARAMETRY
from custom_components.motor_ha.cover import ustawienia_karty
from custom_components.motor_ha.graficzny import dane_kreatora
from custom_components.motor_ha.logika import Warunki, decyduj
from custom_components.motor_ha.uklad import czujniki_okna, pola, popraw, prostokaty, silniki, uklad

# pokój dzieci: dwa naświetla u góry, pod nimi okno nad kaloryferem i wyższe drzwi balkonowe
DZIECI = {"kol": [{"w": .55, "r": [.22, .5], "dol": .28}, {"w": .45, "r": [.22, .78], "dol": 0}]}


def _silniki(hass: HomeAssistant) -> None:
    for e in ("cover.naswietle_l", "cover.naswietle_p", "cover.okno", "cover.drzwi"):
        hass.states.async_set(e, "open", {"current_position": 100, "supported_features": 15})
    hass.states.async_set("binary_sensor.okno_dzieci", "off", {"device_class": "window"})
    hass.states.async_set("binary_sensor.drzwi_dzieci", "off", {"device_class": "window"})


def _wynik() -> dict:
    return {"tytul": "Dzieci", "opcje": {
        "oslona": "zebra", "kolor": "piaskowy", "rama": "#123456", "uklad": DZIECI,
        "pola": [{"silnik": "cover.naswietle_l"}, {"silnik": "cover.okno", "czujnik": "binary_sensor.okno_dzieci"},
                 {"silnik": "cover.naswietle_p"},
                 {"silnik": "cover.drzwi", "czujnik": "binary_sensor.drzwi_dzieci", "tryb": "otworz"}],
        "f_harmonogram": True, "harm_otwieraj": False, "otworz": "07:00:00", "czas": 31.5, "na_panel": "nie"}}


def test_uklad_prostokaty_i_pola() -> None:
    u = popraw(DZIECI)
    r = prostokaty(u)
    assert len(r) == 4
    assert r[0] == (0, 0, .55, .22) and r[1] == (0, .22, .55, .5)
    assert r[3] == (.55, .22, .45, .78)
    # za dużo kolumn i pól – przycięte do 4 × 3, złe liczby poprawione
    zly = popraw({"kol": [{"w": "x", "r": [1, 1, 1, 1], "dol": 5}] * 6})
    assert len(zly["kol"]) == 4 and len(zly["kol"][0]["r"]) == 3 and zly["kol"][0]["dol"] == .6
    assert popraw({"kol": []}) is None
    # starsze urządzenie: dwa skrzydła z czujnikami lewe/prawe
    o = {"rolety": ["cover.a", "cover.b"], "skrzydla": "2", "czujnik_prawe": "binary_sensor.p", "tryb_prawe": "otworz"}
    assert len(prostokaty(uklad(o))) == 2
    assert [p["silnik"] for p in pola(o)] == ["cover.a", "cover.b"]
    assert czujniki_okna(o) == [("binary_sensor.p", "otworz")]


async def test_zapis_z_kreatora_nowe_urzadzenie(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    _silniki(hass)
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert r["step_id"] == "tryb"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"tryb": "podstawowy",
                                                                     "kreator": json.dumps(_wynik())})
    await hass.async_block_till_done()
    assert r["type"] is FlowResultType.CREATE_ENTRY and r["title"] == "Dzieci"
    o = r["result"].options
    assert o["rolety"] == ["cover.naswietle_l", "cover.okno", "cover.naswietle_p", "cover.drzwi"]
    assert silniki(o) == o["rolety"]
    assert o["rama_wlasna"] == [0x12, 0x34, 0x56] and o["kolor"] == "piaskowy"
    assert o["czujnik_prawe"] == "binary_sensor.okno_dzieci" and "okno" in o["mam"]
    assert czujniki_okna(o) == [("binary_sensor.okno_dzieci", "uchyl"), ("binary_sensor.drzwi_dzieci", "otworz")]
    k = hass.states.get("cover.dzieci").attributes["motor_ha"]
    assert k["skrzydla"] == 4 and len(k["pola"]) == 4
    assert k["pola"][3]["silnik"] == "cover.drzwi" and k["pola"][3]["h"] == .78
    assert k["czas"] == 31.5


async def test_zapis_z_kreatora_konfiguruj_i_bledy(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    _silniki(hass)
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"tryb": "podstawowy",
                                                                     "kreator": json.dumps(_wynik())})
    await hass.async_block_till_done()
    wpis = r["result"]
    # „Konfiguruj”: jedno skrzydło, nowa nazwa; ustawienia spoza kreatora zostają
    hass.config_entries.async_update_entry(wpis, options={**wpis.options, "f_zima": True})
    r = await hass.config_entries.options.async_init(wpis.entry_id)
    w = _wynik()
    w["tytul"] = "Pokój Kuby"
    w["opcje"].update(uklad={"kol": [{"w": 1, "r": [1], "dol": 0}]}, pola=[{"silnik": "cover.okno"}])
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"tryb": "podstawowy", "kreator": json.dumps(w)})
    await hass.async_block_till_done()
    assert r["type"] is FlowResultType.CREATE_ENTRY
    assert wpis.title == "Pokój Kuby" and wpis.options["rolety"] == ["cover.okno"] and wpis.options["f_zima"] is True
    assert wpis.options["skrzydla"] == "1" and "czujnik_lewe" not in wpis.options
    # bez silnika: przerwane z jasnym powodem, nic się nie zapisuje
    r = await hass.config_entries.options.async_init(wpis.entry_id)
    w["opcje"]["pola"] = [{"silnik": "cover.nie_ma"}]
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"tryb": "podstawowy", "kreator": json.dumps(w)})
    assert r["type"] is FlowResultType.ABORT and r["reason"] == "brak_rolety"
    assert wpis.options["rolety"] == ["cover.okno"]


async def test_dane_dla_kreatora(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    pokoj = ar.async_get(hass).async_create("Dzieci")
    rej = er.async_get(hass)
    for e in ("cover.okno", "binary_sensor.okno_dzieci"):
        d, nazwa = e.split(".")
        w = rej.async_get_or_create(d, "test", nazwa, suggested_object_id=nazwa)
        rej.async_update_entity(w.entity_id, area_id=pokoj.id)
    _silniki(hass)
    d = await dane_kreatora(hass, None, ["cover.okno"])
    assert d["nowy"] and {o["id"] for o in d["oslony"]} >= {"cover.okno", "cover.drzwi"}
    assert d["pokoj"]["nazwa"] == "Dzieci"
    okna = d["czujniki"]["okno"]
    # oba czujniki z pokoju dzieci (drzwi przypisane po nazwie) na górze listy
    assert {x["id"] for x in okna["lista"] if x["tu"]} == {"binary_sensor.okno_dzieci", "binary_sensor.drzwi_dzieci"}
    assert okna["podpowiedz"] == okna["lista"][0]["id"]
    assert len(d["opcje"]["pola"]) == 2   # nowe urządzenie: domyślnie dwa skrzydła


def test_harmonogram_tylko_zamyka() -> None:
    from datetime import datetime
    w = Warunki(teraz=datetime(2026, 6, 1, 9, 0))
    p = {**PARAMETRY, "harm_tryb": "godziny", "otworz": "07:00:00", "zamknij": "21:00:00"}
    assert decyduj(w, "zebra", {"harmonogram"}, p).poz == 100
    assert decyduj(w, "zebra", {"harmonogram"}, {**p, "harm_otwieraj": False}).poz is None
    w = Warunki(teraz=datetime(2026, 6, 1, 22, 0))
    assert decyduj(w, "zebra", {"harmonogram"}, {**p, "harm_otwieraj": False}).poz == 0
    assert decyduj(w, "zebra", {"harmonogram"}, {**p, "harm_zamykaj": False}).poz is None


def test_karta_bez_ukladu_bez_pol() -> None:
    assert "pola" not in ustawienia_karty("x", {"rolety": ["cover.a"], "skrzydla": "1"})


def test_wiatr_i_deszcz_pozycja_z_ustawien() -> None:
    from datetime import datetime
    n = datetime(2026, 6, 1, 12, 0)
    p = {**PARAMETRY, "wiatr_prog": 50, "wiatr_poz": 60}
    assert decyduj(Warunki(teraz=n, wiatr=45), "markiza", {"wiatr"}, p).poz != 60
    assert decyduj(Warunki(teraz=n, wiatr=55), "markiza", {"wiatr"}, p).poz == 60
    assert decyduj(Warunki(teraz=n, wiatr=55), "markiza", {"wiatr"}, PARAMETRY | {"wiatr_prog": 50}).poz == 100
