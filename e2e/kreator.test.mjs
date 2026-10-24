// Test w PRAWDZIWYM Home Assistancie (Docker, uruchamia e2e/uruchom.sh): dodanie osłony kreatorem Motor HA
// na telefonie (profil aplikacji HA na Galaxy S24 Ultra), krok po kroku, z filmem i zrzutem każdego kroku.
// Wyniki: e2e/wyniki/ albo folder z WYNIKI (krok-NN.png, film .webm, log-ha.txt). Uruchom: node --test e2e/kreator.test.mjs
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { chromium } from '../karta/node_modules/playwright/index.mjs';

const TU = new URL('.', import.meta.url).pathname;
const WYNIKI = (process.env.WYNIKI || TU + 'wyniki').replace(/\/?$/, '/');
const TOKENY = JSON.parse(readFileSync(TU + '.tokeny.json', 'utf8'));
const HA = TOKENY.hassUrl;
const TELEFON = {
  viewport: { width: 384, height: 832 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: 'pl-PL',
  userAgent: 'Mozilla/5.0 (Linux; Android 16; SM-S928B Build/BP2A.250605.031; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/141.0.7390.122 Mobile Safari/537.36 Home Assistant/2026.10.1-12345 (Android 16; SM-S928B)'
};
const PRZYCISKI = ['Dalej', 'Zapisz'];

let przegladarka, kontekst, strona;
const bledyStrony = [];
const kroki = [];

async function api(sciezka) {
  const o = await fetch(HA + sciezka, { headers: { Authorization: `Bearer ${TOKENY.access_token}` } });
  return o.json();
}

// widoczny przycisk o danym napisie (także w cieniu komponentów HA)
// (w kreatorze szukamy tylko w motor-ha-kreator – pod spodem leży ukryty, nieklikalny przycisk HA o tym samym napisie)
async function przycisk(napisy, gdzie = strona) {
  for (const n of napisy) {
    const l = gdzie.getByText(n, { exact: true });
    for (let i = (await l.count()) - 1; i >= 0; i--) if (await l.nth(i).isVisible()) return { napis: n, el: l.nth(i) };
  }
  return null;
}

async function czekajNaPrzycisk(napisy, sekundy = 20, gdzie = strona) {
  for (let i = 0; i < sekundy; i++) {
    const p = await przycisk(napisy, gdzie);
    if (p) return p;
    await strona.waitForTimeout(1000);
  }
  return null;
}

before(async () => {
  rmSync(WYNIKI, { recursive: true, force: true });
  mkdirSync(WYNIKI, { recursive: true });
  przegladarka = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  kontekst = await przegladarka.newContext({ ...TELEFON, recordVideo: { dir: WYNIKI, size: { width: 384, height: 832 } } });
  await kontekst.addInitScript((t) => localStorage.setItem('hassTokens', t), JSON.stringify(TOKENY));
  strona = await kontekst.newPage();
  strona.on('pageerror', (e) => bledyStrony.push(e.message));
});

after(async () => {
  await strona?.screenshot({ path: WYNIKI + 'ostatni-widok.png' }).catch(() => {});
  const film = strona && (await strona.video()?.path().catch(() => null));
  await kontekst?.close();
  await przegladarka?.close();
  if (film) renameSync(film, WYNIKI + 'kreator-telefon.webm');
  writeFileSync(WYNIKI + 'log-ha.txt', execFileSync('docker', ['logs', 'ha-test'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
  writeFileSync(WYNIKI + 'kroki.json', JSON.stringify(kroki, null, 1));
});

test('Motor HA wczytuje się w Home Assistancie bez błędów', async () => {
  const wpisy = await api('/api/config/config_entries/entry');
  assert.ok(Array.isArray(wpisy), 'HA odpowiada');
  const log = execFileSync('docker', ['logs', 'ha-test'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const zle = log.split('\n').filter((w) => /ERROR|Traceback/.test(w) && /motor_ha/.test(w));
  assert.deepEqual(zle, [], 'błędy Motor HA w logu HA');
});

test('kreator na telefonie: dodanie osłony od początku do końca', { timeout: 300_000 }, async () => {
  // pierwsze wejście: karta Motor HA może raz sama odświeżyć stronę (nowa wersja) – czekamy, aż się uspokoi
  await strona.goto(HA + '/config/integrations/dashboard');
  await strona.waitForTimeout(15_000);
  // pierwsze „Dodaj” po instalacji uruchamia integrację i pokazuje link „Otwórz kreator graficzny” (strona HA nie ma
  // jeszcze skryptów Motor HA) – klikamy go jak użytkownik; druga próba musi już dać kreator graficzny
  const kreator = strona.locator('motor-ha-kreator');
  let graficzny = false;
  for (let proba = 1; proba <= 2 && !graficzny; proba++) {
    await strona.goto(HA + '/config/integrations/dashboard/add?domain=motor_ha');
    const ok = await czekajNaPrzycisk(['OK']);
    assert.ok(ok, 'pytanie „Czy chcesz skonfigurować Motor HA?”');
    await ok.el.click();
    graficzny = !!(await czekajNaPrzycisk(['Dalej'], 15, kreator));
    const link = graficzny ? null : await przycisk(['Otwórz kreator graficzny']);
    const widok = graficzny ? 'kreator graficzny' : link ? 'link do kreatora' : 'zwykły formularz HA';
    kroki.push({ proba, widok });
    if (!graficzny) {
      await strona.screenshot({ path: WYNIKI + `proba-${proba}.png` });
      if (!link) break;
      await link.el.click();
      const ok2 = await czekajNaPrzycisk(['OK']);
      assert.ok(ok2, 'po linku: pytanie „Czy chcesz skonfigurować Motor HA?”');
      await ok2.el.click();
      graficzny = !!(await czekajNaPrzycisk(['Dalej'], 25, kreator));
      kroki.push({ proba, widok: graficzny ? 'kreator graficzny po linku' : 'brak kreatora po linku' });
    }
  }
  assert.ok(graficzny, 'kreator graficzny Motor HA nie pojawił się po 2 próbach');
  await strona.waitForTimeout(3000);
  // krok 1: pierwsza udawana roleta z integracji demo
  await strona.getByText('Hall Window', { exact: true }).click();
  for (let n = 1; n <= 20; n++) {
    await strona.waitForTimeout(2500);
    const naglowek = await strona.getByText(/Krok \d+ z \d+ ·/).first().innerText().catch(() => '');
    const plik = `krok-${String(n).padStart(2, '0')}.png`;
    await strona.screenshot({ path: WYNIKI + plik });
    const p = await czekajNaPrzycisk(PRZYCISKI, 10, strona.locator('motor-ha-kreator'));
    assert.ok(p, `krok ${n} (${naglowek}): brak przycisku Dalej/Zapisz`);
    kroki.push({ n, naglowek, plik, przycisk: p.napis });
    await p.el.click();
    if (p.napis !== 'Dalej') break;
    assert.ok(n < 20, 'kreator się zapętlił');
  }
  assert.equal(kroki.at(-1).przycisk, 'Zapisz', 'kreator kończy się przyciskiem Zapisz');
  await strona.waitForTimeout(5000);
  await strona.screenshot({ path: WYNIKI + 'po-zapisaniu.png' });
  const wpisy = await api('/api/config/config_entries/entry');
  assert.ok(wpisy.some((w) => w.domain === 'motor_ha' && w.state === 'loaded'), 'urządzenie Motor HA dodane i działa');
});

test('brak błędów JavaScript na stronie', () => {
  assert.deepEqual(bledyStrony, []);
});

test('brak nowych błędów Motor HA w logu po dodaniu urządzenia', () => {
  const log = execFileSync('docker', ['logs', 'ha-test'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const zle = log.split('\n').filter((w) => /ERROR|Traceback/.test(w) && /motor_ha/.test(w));
  assert.deepEqual(zle, []);
  assert.ok(readdirSync(WYNIKI).some((f) => f.startsWith('krok-')));
});
