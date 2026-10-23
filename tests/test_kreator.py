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


async def test_nazwy_po_angielsku(hass: HomeAssistant) -> None:
    """Model urządzenia i lista „Znaleziono” – przetłumaczone nazwy, nie wewnętrzne klucze (np. „zebra”, „brama”)."""
    from homeassistant.helpers import device_registry as dr
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    hass.states.async_set("binary_sensor.okno_salon", "off", {"device_class": "window"})
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"tryb": "podstawowy"})
    znalezione = r["description_placeholders"]["znalezione"]
    assert "okno (" not in znalezione and "(1)" in znalezione, znalezione
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"mam": []})
    odp = {"urzadzenie": {"rolety": ROLETY, "name": "Salon", "rodzaj_pokoju": "salon"}, "panel": {"na_panel": "nie"}}
    while r["type"] is FlowResultType.FORM:
        r = await hass.config_entries.flow.async_configure(r["flow_id"], odp.get(r["step_id"], {}))
    await hass.async_block_till_done()
    from custom_components.motor_ha import _urzadzenie   # działa na starszym i nowszym HA
    u = _urzadzenie(dr.async_get(hass), (DOMAIN, r["result"].entry_id))
    assert u.model and u.model != r["result"].options["oslona"], u.model


async def test_ukryj_silnik_przed_assist(hass: HomeAssistant) -> None:
    """Opcja domyślnie wyłączona; włączona chowa silnik przed Assist, wyłączona pokazuje go znowu."""
    import time
    from homeassistant.components.homeassistant.exposed_entities import async_should_expose
    await async_setup_component(hass, "homeassistant", {})
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    r, _ = await _przejdz(hass, {"urzadzenie": {"rolety": ROLETY, "name": "Salon", "rodzaj_pokoju": "salon"},
                                 "panel": {"na_panel": "nie"}})
    wpis = r["result"]
    assert not wpis.options.get("ukryj_zrodlo")
    assert async_should_expose(hass, "conversation", "cover.lewa")
    for wlacz in (True, False):
        hass.data[DOMAIN]["krok"] = {wpis.entry_id: ("urzadzenie", time.monotonic())}
        r = await hass.config_entries.options.async_init(wpis.entry_id)
        assert r["step_id"] == "urzadzenie"
        r = await hass.config_entries.options.async_configure(
            r["flow_id"], {"rolety": ROLETY, "rodzaj_pokoju": "salon", "ukryj_zrodlo": wlacz})
        assert r["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done()
        for e in ROLETY:
            assert async_should_expose(hass, "conversation", e) is not wlacz, (e, wlacz)


async def test_po_kalibracji(hass: HomeAssistant, monkeypatch) -> None:
    """Koniec kalibracji: powiadomienie z czasem; z opcją „50 %” osłona staje w połowie."""
    from custom_components.motor_ha import cover, pomiar, powiadomienia
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    r, _ = await _przejdz(hass, {"urzadzenie": {"rolety": ROLETY, "name": "Salon", "rodzaj_pokoju": "salon"},
                                 "silnik": {"czas": 0, "kalibruj": False, "kalibracja_50": True},
                                 "panel": {"na_panel": "nie"}})
    wpis = r["result"]
    assert wpis.options["kalibracja_50"] is True
    wyslane, ruchy, czasy = [], [], [12.0, 14.0, 12.0]

    async def jedz(self, usluga, cel, pierwszy):
        return (czasy.pop(0), [], 0.0) if czasy else (None, ["cover.lewa"], 0.0)

    async def pozycja(self, **kw):
        ruchy.append(kw["position"])

    monkeypatch.setattr(pomiar.Pomiar, "_jedz", jedz)
    monkeypatch.setattr(cover.MotorCover, "async_set_cover_position", pozycja)
    monkeypatch.setattr(powiadomienia.persistent_notification, "async_create",
                        lambda hass, tresc, title=None, notification_id=None: wyslane.append((title, tresc)))
    okno = hass.data[DOMAIN]["wpisy"][wpis.entry_id].okno
    await okno._kalibruj()
    await hass.async_block_till_done()
    assert ruchy == [50], ruchy
    assert wyslane and "✅" in wyslane[-1][0] and " 13 s" in wyslane[-1][1], wyslane
    assert wpis.options["czas"] == 13.0
    # nieudana: bez jazdy na 50 %, powiadomienie o błędzie
    ruchy.clear()
    okno = hass.data[DOMAIN]["wpisy"][wpis.entry_id].okno
    await okno._kalibruj()
    await hass.async_block_till_done()
    assert ruchy == [] and "✅" not in wyslane[-1][0], wyslane


async def test_okno_w_domu_z_brama(hass: HomeAssistant) -> None:
    """W domu jest brama („Co masz”: brama), ale silnik okna (Zigbee, bez klasy) to nie brama:
    „Rodzaj” pokazuje osłony (bramy na końcu), a kroki okna są na miejscu."""
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    hass.states.async_set("cover.brama", "closed", {"device_class": "gate", "supported_features": 3})
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"tryb": "podstawowy"})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"mam": ["brama", "okno"]})
    assert r["step_id"] == "urzadzenie"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"rolety": ROLETY, "name": "Salon",
                                                                      "rodzaj_pokoju": "salon"})
    assert r["step_id"] == "rodzaj"
    opcje = r["data_schema"].schema["oslona"].config["options"]
    assert opcje[0] != "przesuwna" and "zebra" in opcje and "przesuwna" in opcje, opcje
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"oslona": "zebra"})
    assert r["step_id"] == "kolory"


async def test_pasek_skok_i_osobno(hass: HomeAssistant) -> None:
    """„Konfiguruj”: kliknięcie w pasek (idz_do) od razu na wybrany krok, „Dalej” zapisuje.
    Opcja „osobno” w kroku „Okno” trafia do karty i wygrywa ze starym ustawieniem karty."""
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    r, _ = await _przejdz(hass, {"urzadzenie": {"rolety": ROLETY, "name": "Salon", "rodzaj_pokoju": "salon"},
                                 "panel": {"na_panel": "nie"}})
    wpis = r["result"]
    hass.config_entries.async_update_entry(wpis, options={**wpis.options, "karta": {"osobno": False, "kolor": "bialy",
                                                                                     "przyciski": True}})
    await hass.async_block_till_done()
    r = await hass.config_entries.options.async_init(wpis.entry_id)
    assert r["step_id"] == "tryb"
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"tryb": "podstawowy", "idz_do": "okno"})
    assert r["step_id"] == "okno" and r["last_step"], r
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"skrzydla": "2", "wysokosc": 260,
                                                                         "osobno": True, "idz_do": "kolory"})
    assert r["step_id"] == "kolory"
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"kolor": "czarny", "rama": "biala"})
    assert r["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    assert wpis.options["osobno"] is True and wpis.options["kolor"] == "czarny"
    assert wpis.options["karta"] == {"przyciski": True}   # stara karta nie nadpisuje kreatora
    okno = [s for s in hass.states.async_all("cover") if s.attributes.get("motor_ha")][0]
    assert okno.attributes["motor_ha"]["osobno"] is True and okno.attributes["motor_ha"]["kolor"] == "czarny"


async def test_dodawanie_pasek_tylko_wstecz(hass: HomeAssistant) -> None:
    """Przy dodawaniu pasek przenosi tylko do już przejściowych kroków."""
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"tryb": "podstawowy"})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"mam": [], "idz_do": "silnik"})
    assert r["step_id"] == "urzadzenie"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"rolety": ROLETY, "rodzaj_pokoju": "salon",
                                                                      "idz_do": "tryb"})
    assert r["step_id"] == "tryb"
