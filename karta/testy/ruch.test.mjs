// Ruch rysunku względem prawdziwych meldunków silnika. Sekwencje jak z Zigbee2MQTT (Moes AM43, Salon 23.10):
// po komendzie od razu zmienia się stan (pozycja stara), a pozycja przychodzi dopiero po ~30 s.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Ruch } from '../src/ruch.js';

const st = (state, current_position) => ({ state, attributes: { current_position } });

function jedz(r, od, do_, krok = 100) {   // klatki animacji co 100 ms
  for (let t = od; t < do_; t += krok) r.krok(krok / 1000, t);
}

test('pilot/kalibracja: „zamknięta przy 100 %” = rusza w dół, rysunek jedzie od razu', () => {
  const r = new Ruch('cover.lewa'); r.czas = 30;
  r.meldunek(st('open', 100), 0);
  r.meldunek(st('closed', 100), 1000);          // komenda: stan od razu, pozycja stara
  jedz(r, 1000, 16000);
  assert.ok(r.widac > 40 && r.widac < 60, `po 15 s w połowie, jest ${r.widac}`);
  r.meldunek(st('closed', 0), 31000);           // dojechała
  jedz(r, 16000, 32000);
  assert.equal(Math.round(r.widac), 0);
});

test('„otwarta przy 0 %” = rusza w górę', () => {
  const r = new Ruch('cover.prawa'); r.czas = 30;
  r.meldunek(st('closed', 0), 0);
  r.meldunek(st('open', 0), 500);
  jedz(r, 500, 15500);
  assert.ok(r.widac > 40 && r.widac < 60, `po 15 s w połowie, jest ${r.widac}`);
});

test('zatrzymanie w połowie („otwarta przy 65 %”) nie rusza rysunku', () => {
  const r = new Ruch('cover.prawa'); r.czas = 30;
  r.meldunek(st('closed', 65), 0);
  r.meldunek(st('open', 65), 500);
  jedz(r, 500, 5500);
  assert.equal(Math.round(r.widac), 65);
});

test('ten sam stan przy kolejnym meldunku nie rusza drugi raz', () => {
  const r = new Ruch('cover.lewa'); r.czas = 30;
  r.meldunek(st('closed', 100), 0);              // tak zostało po starcie – bez zmiany stanu nic nie robimy
  r.meldunek({ ...st('closed', 100), x: 1 }, 1000);
  jedz(r, 1000, 6000);
  assert.equal(Math.round(r.widac), 100);
});

test('komenda z karty: rysunek nie czeka na meldunek', () => {
  const r = new Ruch('cover.lewa'); r.czas = 30;
  r.meldunek(st('open', 100), 0);
  r.polecenie(0, 0);
  r.meldunek(st('closed', 100), 300);
  jedz(r, 0, 15000);
  assert.ok(r.widac > 40 && r.widac < 60, `po 15 s w połowie, jest ${r.widac}`);
});
