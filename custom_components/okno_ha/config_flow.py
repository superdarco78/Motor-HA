"""Kreator Okno HA: roleta → okno → silnik → pogoda → wygląd. Ten sam kreator w „Konfiguruj”."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow
from homeassistant.const import CONF_NAME
from homeassistant.core import callback
from homeassistant.helpers import selector as sel

from .const import (
    CONF_CZAS,
    CONF_CZUJNIK_LEWE,
    CONF_CZUJNIK_PRAWE,
    CONF_KOLOR,
    CONF_OSLONA,
    CONF_POGODA,
    CONF_PREDKOSC_LEWA,
    CONF_PREDKOSC_PRAWA,
    CONF_RAMA,
    CONF_ROLETY,
    CONF_SKRZYDLA,
    CONF_TRYB_LEWE,
    CONF_TRYB_PRAWE,
    CONF_WYSOKOSC,
    DOMAIN,
    DOMYSLNE,
    KOLORY,
    OSLONY,
    RAMY,
    TRYBY,
)

KROKI = ["user", "okno", "silnik", "pogoda", "wyglad"]
# pola, które można zostawić puste (wtedy karta sama szuka albo ich nie używa)
OPCJONALNE = {CONF_CZUJNIK_LEWE, CONF_CZUJNIK_PRAWE, CONF_PREDKOSC_LEWA, CONF_PREDKOSC_PRAWA, CONF_POGODA}


def _wybor(opcje: list[str], klucz: str, wlasna: bool = False) -> sel.SelectSelector:
    return sel.SelectSelector(sel.SelectSelectorConfig(
        options=opcje, translation_key=klucz, mode=sel.SelectSelectorMode.DROPDOWN, custom_value=wlasna))


def _encja(domena: str, wiele: bool = False, klasa: list[str] | None = None) -> sel.EntitySelector:
    cfg = sel.EntitySelectorConfig(domain=domena, multiple=wiele)
    if klasa:
        cfg = sel.EntitySelectorConfig(domain=domena, multiple=wiele, device_class=klasa)
    return sel.EntitySelector(cfg)


def _pole(klucz: str, v: dict[str, Any], wymagane: bool = False):
    """Pole z podpowiedzią obecnej wartości – puste opcjonalne pole można wyczyścić."""
    if klucz in OPCJONALNE:
        return vol.Optional(klucz, description={"suggested_value": v.get(klucz)})
    return (vol.Required if wymagane else vol.Optional)(klucz, default=v.get(klucz, DOMYSLNE.get(klucz)))


def schemat(krok: str, v: dict[str, Any], z_nazwa: bool) -> vol.Schema:
    if krok == "user":
        pola = {}
        if z_nazwa:
            pola[vol.Required(CONF_NAME, default=v.get(CONF_NAME, ""))] = sel.TextSelector()
        pola[vol.Required(CONF_ROLETY, default=v.get(CONF_ROLETY, []))] = _encja("cover", True)
        return vol.Schema(pola)
    if krok == "okno":
        return vol.Schema({
            _pole(CONF_SKRZYDLA, v): _wybor(["1", "2"], "skrzydla"),
            _pole(CONF_CZUJNIK_LEWE, v): _encja("binary_sensor"),
            _pole(CONF_TRYB_LEWE, v): _wybor(TRYBY, "tryb"),
            _pole(CONF_CZUJNIK_PRAWE, v): _encja("binary_sensor"),
            _pole(CONF_TRYB_PRAWE, v): _wybor(TRYBY, "tryb"),
        })
    if krok == "silnik":
        return vol.Schema({
            _pole(CONF_PREDKOSC_LEWA, v): _encja("number"),
            _pole(CONF_PREDKOSC_PRAWA, v): _encja("number"),
            _pole(CONF_CZAS, v): sel.NumberSelector(sel.NumberSelectorConfig(
                min=0, max=120, step=1, unit_of_measurement="s", mode=sel.NumberSelectorMode.SLIDER)),
        })
    if krok == "pogoda":
        return vol.Schema({_pole(CONF_POGODA, v): _encja("weather")})
    return vol.Schema({
        _pole(CONF_OSLONA, v): _wybor(OSLONY, "oslona"),
        _pole(CONF_KOLOR, v): _wybor(KOLORY, "kolor", True),
        _pole(CONF_RAMA, v): _wybor(list(RAMY), "rama", True),
        _pole(CONF_WYSOKOSC, v): sel.NumberSelector(sel.NumberSelectorConfig(
            min=140, max=460, step=10, unit_of_measurement="px", mode=sel.NumberSelectorMode.SLIDER)),
    })


def _sprawdz(krok: str, dane: dict[str, Any]) -> dict[str, str]:
    if krok == "user" and not 1 <= len(dane.get(CONF_ROLETY) or []) <= 2:
        return {CONF_ROLETY: "rolety"}
    return {}


class _Kreator:
    """Wspólne kroki dla dodawania i „Konfiguruj”."""

    _v: dict[str, Any]

    def _nastepny(self, krok: str) -> str | None:
        i = KROKI.index(krok) + 1
        return KROKI[i] if i < len(KROKI) else None

    async def _krok(self, krok: str, dane: dict[str, Any] | None, z_nazwa: bool) -> ConfigFlowResult:
        bledy: dict[str, str] = {}
        if dane is not None:
            bledy = _sprawdz(krok, dane)
            if not bledy:
                for k in OPCJONALNE:   # wyczyszczone pole = brak klucza
                    if k in schemat(krok, {}, z_nazwa).schema and k not in dane:
                        self._v.pop(k, None)
                self._v.update(dane)
                if krok == "user" and CONF_SKRZYDLA not in self._v:
                    self._v[CONF_SKRZYDLA] = "2" if len(dane[CONF_ROLETY]) == 2 else "1"
                nast = self._nastepny(krok)
                if nast:
                    return await getattr(self, f"async_step_{nast}")()
                return self._koniec()
        return self.async_show_form(step_id=krok, data_schema=schemat(krok, self._v, z_nazwa), errors=bledy,
                                    last_step=krok == KROKI[-1])

    def _koniec(self) -> ConfigFlowResult:
        raise NotImplementedError


class OknoHaConfigFlow(_Kreator, ConfigFlow, domain=DOMAIN):
    """Ustawienia → Integracje → Dodaj integrację → Okno HA."""

    VERSION = 1

    def __init__(self) -> None:
        self._v = {}

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self._krok("user", user_input, True)

    async def async_step_okno(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self._krok("okno", user_input, True)

    async def async_step_silnik(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self._krok("silnik", user_input, True)

    async def async_step_pogoda(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self._krok("pogoda", user_input, True)

    async def async_step_wyglad(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self._krok("wyglad", user_input, True)

    def _koniec(self) -> ConfigFlowResult:
        nazwa = self._v.pop(CONF_NAME).strip() or "Okno"
        return self.async_create_entry(title=nazwa, data={}, options=self._v)

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        return OknoHaOptionsFlow()


class OknoHaOptionsFlow(_Kreator, OptionsFlow):
    """„Konfiguruj” – te same kroki, z obecnymi ustawieniami."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        self._v = dict(self.config_entry.options)
        return await self.async_step_user()

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self._krok("user", user_input, False)

    async def async_step_okno(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self._krok("okno", user_input, False)

    async def async_step_silnik(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self._krok("silnik", user_input, False)

    async def async_step_pogoda(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self._krok("pogoda", user_input, False)

    async def async_step_wyglad(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        return await self._krok("wyglad", user_input, False)

    def _koniec(self) -> ConfigFlowResult:
        return self.async_create_entry(data=self._v)
