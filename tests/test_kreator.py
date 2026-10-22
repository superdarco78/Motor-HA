"""Kreator 2.0: „Co masz w domu”, tylko pasujące kroki, urządzenie i encje."""

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.setup import async_setup_component

from custom_components.motor_ha.const import DOMAIN

ROLETY = ["cover.lewa", "cover.prawa"]


def _rolety(hass: HomeAssistant, lewa=40, prawa=60) -> None:
    hass.states.async_set("cover.lewa", "open", {"current_position": lewa, "supported_features": 15})
    hass.states.async_set("cover.prawa", "open", {"current_position": prawa, "supported_features": 15})


async def _przejdz(hass: HomeAssistant, odpowiedzi: dict, tryb="podstawowy", mam=None):
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert r["type"] is FlowResultType.FORM and r["step_id"] == "tryb"
    kroki = []
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"tryb": tryb})
    assert r["step_id"] == "mam"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"mam": mam or []})
    while r["type"] is FlowResultType.FORM:
        kroki.append(r["step_id"])
        assert not r.get("errors"), r
        r = await hass.config_entries.flow.async_configure(r["flow_id"], odpowiedzi.get(r["step_id"], {}))
    await hass.async_block_till_done()
    return r, kroki


async def test_podstawowy(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    r, kroki = await _przejdz(hass, {"urzadzenie": {"rolety": ROLETY, "name": "Salon", "rodzaj_pokoju": "salon"},
                                     "panel": {"na_panel": "nie"}})
    assert r["type"] is FlowResultType.CREATE_ENTRY and r["title"] == "Salon"
    assert kroki == ["urzadzenie", "rodzaj", "kolory", "okno", "silnik", "automatyka", "powiadomienia", "panel"]
    st = hass.states.get("cover.salon")
    assert st is not None and st.attributes["current_position"] == 50
    k = st.attributes["motor_ha"]
    assert k["roleta_lewa"] == "cover.lewa" and k["roleta_prawa"] == "cover.prawa"
    # nic nie rusza samo: wszystkie funkcje wyłączone poza licznikiem
    assert not [x for x, v in r["result"].options.items() if x.startswith("f_") and v and x != "f_licznik"]
    assert hass.states.get("sensor.salon_reason_for_move") is not None


async def test_wstecz_i_bledy(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"tryb": "zaawansowany"})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"mam": ["okno", "pogoda"]})
    assert r["step_id"] == "urzadzenie"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"rolety": ["cover.lewa", "cover.prawa", "cover.lewa"],
                                                                     "rodzaj_pokoju": "salon"})
    assert r["errors"] == {"rolety": "za_duzo"}
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"rolety": ROLETY, "rodzaj_pokoju": "sypialnia"})
    assert r["step_id"] == "rodzaj"
    assert "💡" in r["description_placeholders"]["porada"]
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"oslona": "zebra", "wstecz": True})
    assert r["step_id"] == "urzadzenie"


async def test_funkcje_i_brama(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    hass.states.async_set("cover.brama", "closed", {"device_class": "gate", "supported_features": 3})
    r, kroki = await _przejdz(hass, {"urzadzenie": {"rolety": ["cover.brama"], "name": "Brama"},
                                     "panel": {"na_panel": "nie"}}, mam=["brama"])
    assert r["type"] is FlowResultType.CREATE_ENTRY
    assert "automatyka" not in kroki and "kolory" not in kroki
    assert r["result"].options["oslona"] == "przesuwna"


async def test_zaawansowany_wszystko(hass: HomeAssistant) -> None:
    """Tryb zaawansowany, wszystko zaznaczone, wszystkie funkcje włączone – każdy krok musi się otworzyć."""
    from custom_components.motor_ha.const import FUNKCJE, URZADZENIA
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    hass.states.async_set("weather.dom", "sunny", {"temperature": 25})
    hass.states.async_set("binary_sensor.okno_salon", "off", {"device_class": "window"})
    wszystko = [k for k in URZADZENIA if k != "brama" and k != "foto"]
    funkcje = {f"f_{k}": True for k in FUNKCJE}
    r, kroki = await _przejdz(hass, {"urzadzenie": {"rolety": ROLETY, "name": "Salon", "rodzaj_pokoju": "salon"},
                                     "automatyka": funkcje, "panel": {"na_panel": "nie"}},
                              tryb="zaawansowany", mam=wszystko)
    assert r["type"] is FlowResultType.CREATE_ENTRY, r
    assert kroki == ["urzadzenie", "rodzaj", "lamele", "kolory", "okno", "czujniki", "silnik", "pogoda", "domownicy",
                     "automatyka", "ustawienia", "powiadomienia", "panel"]
    assert hass.states.get("switch.salon_sleeping") is not None
    assert hass.states.get("switch.motor_ha_vacation_mode") is not None
    # „Konfiguruj” – ten sam kreator, bez panelu
    r = await hass.config_entries.options.async_init(r["result"].entry_id)
    assert r["step_id"] == "tryb"
    n = 0
    while r["type"] is FlowResultType.FORM:
        n += 1
        r = await hass.config_entries.options.async_configure(r["flow_id"], {})
    assert r["type"] is FlowResultType.CREATE_ENTRY and n == 14
    await hass.async_block_till_done()


async def test_wiersz_otwiera_jeden_krok(hass: HomeAssistant) -> None:
    """Dotknięcie wiersza „Kolor” na stronie urządzenia: kreator od razu na kroku kolorów, „Dalej” zapisuje."""
    import time
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    r, _ = await _przejdz(hass, {"urzadzenie": {"rolety": ROLETY, "name": "Salon", "rodzaj_pokoju": "salon"},
                                 "panel": {"na_panel": "nie"}})
    wpis = r["result"]
    hass.data[DOMAIN]["krok"] = {wpis.entry_id: ("kolory", time.monotonic())}
    r = await hass.config_entries.options.async_init(wpis.entry_id)
    assert r["step_id"] == "kolory" and r["last_step"]
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"kolor": "czarny"})
    assert r["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    assert wpis.options["kolor"] == "czarny"
    # następny „Konfiguruj” znowu cały kreator
    r = await hass.config_entries.options.async_init(wpis.entry_id)
    assert r["step_id"] == "tryb"
