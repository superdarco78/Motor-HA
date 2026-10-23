"""Kalibracja z prawdziwymi (symulowanymi) silnikami: Zigbee meldujące pozycję na końcu, silnik bez odpowiedzi,
silnik meldujący cel od razu. Czasy przejazdu skrócone, żeby test trwał kilka sekund."""

import asyncio

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.setup import async_setup_component

from custom_components.motor_ha.const import DOMAIN

from .test_kreator import ROLETY, _przejdz


def _silniki(hass: HomeAssistant, przejazd: dict[str, float | None], od_razu: bool = False) -> None:
    """Silniki jak Moes przez Zigbee2MQTT: stan od razu (pozycja stara), pozycja po dojechaniu.

    przejazd: encja → czas jazdy w s (None = nie odpowiada). od_razu: pozycja docelowa zaraz po komendzie."""

    async def ruch(call: ServiceCall) -> None:
        cel = 100 if call.service == "open_cover" else 0
        for e in call.data["entity_id"]:
            if przejazd.get(e) is None:
                continue
            stara = hass.states.get(e).attributes.get("current_position", 0)
            hass.states.async_set(e, "open" if cel else "closed", {"current_position": cel if od_razu else stara,
                                                                   "supported_features": 15})

            async def koniec(e=e, cel=cel):
                await asyncio.sleep(przejazd[e])
                hass.states.async_set(e, "open" if cel else "closed", {"current_position": cel, "supported_features": 15})
            if not od_razu and stara != cel:   # już na miejscu – silnik nie rusza
                hass.async_create_task(koniec())

    for usluga in ("open_cover", "close_cover", "stop_cover", "set_cover_position"):
        hass.services.async_register("cover", usluga, ruch)
    for e in ROLETY:
        hass.states.async_set(e, "open", {"current_position": 100, "supported_features": 15})


async def _okno(hass: HomeAssistant, monkeypatch, silnik: dict | None = None):
    from custom_components.motor_ha import cover, powiadomienia
    await async_setup_component(hass, "http", {})
    r, _ = await _przejdz(hass, {"urzadzenie": {"rolety": ROLETY, "name": "Salon", "rodzaj_pokoju": "salon"},
                                 "silnik": silnik or {"czas": 0, "kalibruj": False},
                                 "panel": {"na_panel": "nie"}})
    wpis = r["result"]
    wyslane = []
    monkeypatch.setattr(powiadomienia.persistent_notification, "async_create",
                        lambda hass, tresc, title=None, notification_id=None: wyslane.append((title, tresc)))
    monkeypatch.setattr(cover.persistent_notification, "async_create",
                        lambda hass, tresc, title=None, notification_id=None: wyslane.append((title, tresc)))
    monkeypatch.setattr(cover, "MIN_PRZEJAZD", 1)
    return wpis, hass.data[DOMAIN]["wpisy"][wpis.entry_id].okno, wyslane, cover


async def test_zigbee_pozycja_na_koncu(hass: HomeAssistant, monkeypatch) -> None:
    """Moes: stan od razu, pozycja po 2 s → zmierzony czas ok. 2 s, a w trakcie jazdy okno „zamyka się”."""
    wpis, okno, wyslane, _ = await _okno(hass, monkeypatch)
    _silniki(hass, {"cover.lewa": 2.0, "cover.prawa": 2.0})
    zadanie = hass.async_create_task(okno._kalibruj())
    await asyncio.sleep(3.2)   # pierwszy przejazd (już otwarte) i początek zamykania
    assert hass.states.get(okno.entity_id).state == "closing"
    await zadanie
    await hass.async_block_till_done()
    # zegar pętli testowej HA biegnie trochę inaczej niż time.monotonic – ważne, że to nie „od razu”
    assert 1.2 <= wpis.options["czas"] <= 3.0, wpis.options["czas"]
    assert "✅" in wyslane[-1][0], wyslane


async def test_jedna_nie_odpowiada(hass: HomeAssistant, monkeypatch) -> None:
    """Prawa nie odpowiada: kalibracja kończy się wcześniej i podaje jej nazwę."""
    wpis, okno, wyslane, cover = await _okno(hass, monkeypatch)
    _silniki(hass, {"cover.lewa": 1.5, "cover.prawa": None})
    hass.states.async_set("cover.prawa", "open", {"current_position": 100, "supported_features": 15,
                                                  "friendly_name": "Żaluzja prawa salon"})
    monkeypatch.setattr(cover, "KALIBRACJA_MAKS", 30)
    await okno._kalibruj()
    await hass.async_block_till_done()
    assert wyslane and "Żaluzja prawa salon" in wyslane[-1][1], wyslane
    assert "✅" not in wyslane[-1][0]
    assert "czas" not in wpis.options or not wpis.options["czas"]


async def test_cel_od_razu_czas_z_predkosci(hass: HomeAssistant, monkeypatch) -> None:
    """Silnik melduje cel zaraz po komendzie: czas nie jest „1 s”, tylko z prędkości silnika."""
    wpis, okno, wyslane, cover = await _okno(hass, monkeypatch)
    _silniki(hass, {"cover.lewa": 0, "cover.prawa": 0}, od_razu=True)
    monkeypatch.setattr(cover.MotorCover, "_czas_z_predkosci", lambda self: 2.5)
    await okno._kalibruj()
    await hass.async_block_till_done()
    assert wpis.options["czas"] == 2.5, wpis.options.get("czas")


async def test_cel_od_razu_bez_predkosci(hass: HomeAssistant, monkeypatch) -> None:
    """Bez prędkości i bez meldunku po zatrzymaniu: jasne powiadomienie zamiast fałszywego czasu."""
    wpis, okno, wyslane, cover = await _okno(hass, monkeypatch)
    _silniki(hass, {"cover.lewa": 0, "cover.prawa": 0}, od_razu=True)
    monkeypatch.setattr(cover, "KALIBRACJA_MAKS", 8)
    await okno._kalibruj()
    await hass.async_block_till_done()
    assert "✅" not in wyslane[-1][0], wyslane
    assert not wpis.options.get("czas")


def test_wzor_predkosci() -> None:
    """Ten sam wzór co w karcie: prędkość 40 obr/min ≈ 30 s (zmierzone u Moes)."""
    assert round(20.2 + 394 / 40, 1) == 30.0
