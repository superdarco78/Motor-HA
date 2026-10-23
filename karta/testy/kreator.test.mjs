// Kreator w okienku HA: dane z obrazków integracji (pasek kroków, galerie) i wygląd żywego podglądu.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { danePaska, daneGalerii, wygladPodgladu } from '../src/kreator.js';

const b64 = s => Buffer.from(s, 'utf8').toString('base64');

test('pasek: kroki, aktywny i wygląd do podglądu (polskie znaki)', () => {
  const svg = `<svg data-podglad="${b64(JSON.stringify({ oslona: 'zebra', kolor: 'błękitny' }))}" xmlns="x" data-motor-ha-kroki="tryb,mam,rodzaj" data-krok="76" data-aktywny="2">`;
  const d = danePaska(svg);
  assert.deepEqual(d.kroki, ['tryb', 'mam', 'rodzaj']);
  assert.equal(d.aktywny, 2);
  assert.deepEqual(d.podglad, { oslona: 'zebra', kolor: 'błękitny' });
});

test('galeria: pole, opcje i kolumny', () => {
  const d = daneGalerii('<svg data-motor-ha-wybor="kolor" data-opcje="czarny,grafit,szary" data-kol="5">');
  assert.deepEqual(d, { pole: 'kolor', opcje: ['czarny', 'grafit', 'szary'], kol: 5 });
  assert.equal(daneGalerii('<svg data-motor-ha-kroki="a">'), null);
});

test('podgląd: wybór w formularzu wygrywa, własny kolor RGB zamienia się na hex', () => {
  const c = wygladPodgladu({ oslona: 'pelna', kolor: 'czarny', rama: 'biala' },
    { oslona: 'zebra', kolor_wlasny: [255, 0, 16], czujnik_lewe: 'binary_sensor.x', rama: '' });
  assert.deepEqual(c, { oslona: 'zebra', kolor: '#ff0010', rama: 'biala' });
});
