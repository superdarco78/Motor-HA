"""Kreator, „Konfiguruj” i encja okna."""

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.setup import async_setup_component
from pytest_homeassistant_custom_component.common import async_mock_service

from custom_components.okno_ha.const import DOMAIN

ROLETY = ["cover.lewa", "cover.prawa"]


def _rolety(hass: HomeAssistant, lewa=40, prawa=60) -> None:
    hass.states.async_set("cover.lewa", "open", {"current_position": lewa})
    hass.states.async_set("cover.prawa", "open", {"current_position": prawa})


async def _dodaj(hass: HomeAssistant):
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert r["type"] is FlowResultType.FORM and r["step_id"] == "user"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"name": "Salon", "rolety": ["cover.lewa", "cover.lewa", "cover.prawa"]})
    assert r["errors"] == {"rolety": "rolety"}            # najwyżej dwie rolety
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"name": "Salon", "rolety": ROLETY})
    assert r["step_id"] == "okno"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"skrzydla": "2", "czujnik_lewe": "binary_sensor.okno", "tryb_lewe": "otworz", "tryb_prawe": "uchyl"})
    assert r["step_id"] == "silnik"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"czas": 0})
    assert r["step_id"] == "pogoda"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {})
    assert r["step_id"] == "wyglad"
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"oslona": "natynkowa", "kolor": "grafit", "rama": "antracyt", "wysokosc": 300})
    assert r["type"] is FlowResultType.CREATE_ENTRY and r["title"] == "Salon"
    await hass.async_block_till_done()
    return r["result"]


async def test_kreator_i_encja(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    await _dodaj(hass)
    st = hass.states.get("cover.okno_salon")
    assert st is not None
    assert st.attributes["current_position"] == 50
    assert st.attributes["entity_id"] == ROLETY
    k = st.attributes["okno_ha"]
    assert k["roleta_lewa"] == "cover.lewa" and k["roleta_prawa"] == "cover.prawa"
    assert k["oslona"] == "natynkowa" and k["kolor"] == "grafit" and k["rama"] == "#3b3f45"
    assert k["czujnik_lewe"] == "binary_sensor.okno" and k["tryb_lewe"] == "otworz"
    assert k["czas"] == "auto" and k["pogoda"] == "auto" and k["skrzydla"] == 2 and k["wysokosc"] == 300
    assert "predkosc_lewa" not in k
    # pozycja śledzi skrzydła
    _rolety(hass, 0, 0)
    await hass.async_block_till_done()
    assert hass.states.get("cover.okno_salon").state == "closed"


async def test_polecenia_ida_do_skrzydel(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    await _dodaj(hass)
    wywolania = async_mock_service(hass, "cover", "set_cover_position")   # po starcie: zastępuje prawdziwą usługę
    okno = hass.data["entity_components"]["cover"].get_entity("cover.okno_salon")
    await okno.async_set_cover_position(position=30)
    assert wywolania[-1].data == {"entity_id": ROLETY, "position": 30}


async def test_konfiguruj(hass: HomeAssistant) -> None:
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    wpis = await _dodaj(hass)
    r = await hass.config_entries.options.async_init(wpis.entry_id)
    assert r["type"] is FlowResultType.MENU and r["menu_options"] == ["obrazki", "user"]
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"next_step_id": "user"})
    assert r["step_id"] == "user"
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"rolety": ROLETY})
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"skrzydla": "2", "tryb_lewe": "uchyl", "tryb_prawe": "uchyl"})   # czujnik wyczyszczony
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"czas": 25})
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"pogoda": "weather.dom"})
    r = await hass.config_entries.options.async_configure(r["flow_id"], {"oslona": "screen", "kolor": "#123456", "rama": "biala", "wysokosc": 260})
    assert r["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    k = hass.states.get("cover.okno_salon").attributes["okno_ha"]
    assert k["oslona"] == "screen" and k["kolor"] == "#123456" and k["czas"] == 25 and k["pogoda"] == "weather.dom"
    assert "czujnik_lewe" not in k


def test_numer_wersji():
    from custom_components.okno_ha.nowosci import numer
    assert numer("v29") > numer("v28.1") > numer("v28")
    assert numer("1.1.0") > numer("1.0.1")
    assert numer(None) == (0,)



async def test_aktualizacje(hass, aioclient_mock):
    """Nowa wersja z GitHuba → encja aktualizacji karty; „Zainstaluj” pobiera kartę."""
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    aioclient_mock.get("https://api.github.com/repos/superdarco78/roleta-realistyczna/releases/latest",
                       json={"tag_name": "v99", "body": "nowości", "html_url": "https://x/v99"})
    aioclient_mock.get("https://api.github.com/repos/superdarco78/okno-ha-integracja/releases/latest",
                       json={"tag_name": "v0.0.1"})
    aioclient_mock.get("https://github.com/superdarco78/roleta-realistyczna/releases/download/v99/roleta-realistyczna.js",
                       text="// karta v99")
    await _dodaj(hass)
    await hass.data[DOMAIN].async_sprawdz()
    await hass.async_block_till_done()
    karta = hass.states.get("update.okno_ha_karta_okno_ha")
    integracja = hass.states.get("update.okno_ha_integracja_okno_ha")
    assert karta.state == "on" and karta.attributes["latest_version"] == "v99"
    assert integracja.state == "off"
    assert "roleta-realistyczna" in karta.attributes["release_url"] or karta.attributes["release_url"] == "https://x/v99"
    await hass.services.async_call("update", "install", {"entity_id": karta.entity_id}, blocking=True)
    assert hass.states.get(karta.entity_id).state == "off"
    plik = hass.data[DOMAIN].katalog / "okno-ha.js"
    assert plik.read_text() == "// karta v99"
    assert "Date.now()" in (hass.data[DOMAIN].katalog / "okno-ha-loader.js").read_text()


async def test_predkosc_kolory_i_kalibracja(hass, monkeypatch):
    """Prędkość silnika sama z rolety, własne kolory z próbnika, przycisk „Kalibruj”."""
    import custom_components.okno_ha.cover as okno_cover
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    hass.states.async_set("number.lewa_motor_speed", "40")
    r = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"name": "Kuchnia", "rolety": ["cover.lewa"]})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"skrzydla": "1"})
    assert r["step_id"] == "silnik"
    assert r["description_placeholders"]["czas"] == "30.0 s"          # 20,2 + 394 / 40
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {"predkosc_lewa": "number.lewa_motor_speed", "czas": 0})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {})
    r = await hass.config_entries.flow.async_configure(r["flow_id"], {
        "oslona": "plisa", "kolor": "grafit", "kolor_wlasny": [255, 0, 16], "rama": "zloty_dab", "wysokosc": 260})
    await hass.async_block_till_done()
    wpis = r["result"]
    okno = hass.states.get("cover.okno_kuchnia")
    karta = okno.attributes["okno_ha"]
    assert karta["kolor"] == "#ff0010" and karta["rama"] == "#8a5a3b" and karta["predkosc_lewa"] == "number.lewa_motor_speed"
    assert hass.states.get("button.okno_kuchnia_calibrate")

    # kalibracja: roleta „jedzie” i dojeżdża po 2 s
    monkeypatch.setattr(okno_cover.asyncio, "sleep", lambda s: _szybko())
    czasy = iter([0, 0.5, 2.5, 3, 3.5, 5.5, 6, 6.5, 8.5, 9, 9.5])
    monkeypatch.setattr(okno_cover, "monotonic", lambda: next(czasy))
    ruch = iter(["opening", "open", "closing", "closed", "opening", "open"])

    async def usluga(call):
        pass
    hass.services.async_register("cover", "open_cover", usluga)
    hass.services.async_register("cover", "close_cover", usluga)
    stan = {"v": None}

    def pozycje(self):
        s = next(ruch, "open")
        return s in ("opening", "closing"), [0 if s == "closed" else 100]
    monkeypatch.setattr(okno_cover.OknoCover, "_pozycje", pozycje)
    await hass.services.async_call("button", "press", {"entity_id": "button.okno_kuchnia_calibrate"}, blocking=True)
    await hass.async_block_till_done()
    assert wpis.options["czas"] > 0 and "kalibruj" not in wpis.options


async def _szybko():
    return None


async def test_edytor_karty_zapisuje_w_urzadzeniu(hass, hass_ws_client):
    """Panel / edytor karty: nowe okno z kreatora karty i zapis zmian w urządzeniu."""
    await async_setup_component(hass, "http", {})
    _rolety(hass)
    hass.states.async_set("cover.grupa", "open", {"current_position": 50, "entity_id": ROLETY})
    await async_setup_component(hass, DOMAIN, {})
    ws = await hass_ws_client(hass)
    await ws.send_json({"id": 1, "type": "okno_ha/utworz", "karta": {
        "type": "custom:okno-ha", "entity": "cover.grupa", "name": "Sypialnia", "oslona": "rzymska", "rama": "#8a5a3b", "czas": 18}})
    r = await ws.receive_json()
    assert r["success"], r
    await hass.async_block_till_done()
    okno = r["result"]["entity_id"]
    wpis = hass.config_entries.async_entries(DOMAIN)[0]
    assert wpis.title == "Sypialnia" and wpis.options["rolety"] == ROLETY and wpis.options["rama"] == "zloty_dab"
    assert hass.states.get(okno).attributes["okno_ha"]["oslona"] == "rzymska"

    await ws.send_json({"id": 2, "type": "okno_ha/zapisz", "entity_id": okno, "karta": {
        "type": "custom:okno-ha", "entity": okno, "name": "Sypialnia", "oslona": "plisa", "kolor": "mietowy"}})
    r = await ws.receive_json()
    assert r["success"], r
    await hass.async_block_till_done()
    k = hass.states.get(okno).attributes["okno_ha"]
    assert k["oslona"] == "plisa" and k["kolor"] == "mietowy" and "entity" not in k

    await ws.send_json({"id": 3, "type": "okno_ha/lista"})
    r = await ws.receive_json()
    assert r["result"][0]["entity_id"] == okno


async def test_napraw_restart(hass: HomeAssistant) -> None:
    """„Napraw” po aktualizacji integracji uruchamia ponownie HA."""
    from homeassistant.helpers import issue_registry as ir
    from custom_components.okno_ha.repairs import RESTART, async_create_fix_flow

    assert await async_setup_component(hass, "repairs", {})
    ir.async_create_issue(hass, DOMAIN, RESTART, is_fixable=True, severity=ir.IssueSeverity.WARNING,
                          translation_key=RESTART, translation_placeholders={"wersja": "v9.9.9"})
    wywolania = async_mock_service(hass, "homeassistant", "restart")
    flow = await async_create_fix_flow(hass, RESTART, None)
    flow.hass = hass
    flow.issue_id = RESTART
    flow.handler = DOMAIN
    wynik = await flow.async_step_init()
    assert wynik["step_id"] == "confirm"
    wynik = await flow.async_step_confirm({})
    assert wynik["type"] == "create_entry"
    await hass.async_block_till_done()
    assert len(wywolania) == 1
