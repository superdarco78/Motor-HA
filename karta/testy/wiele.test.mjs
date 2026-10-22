// Stały test: kilka urządzeń Motor HA naraz (różne osłony i brama). Każda strona urządzenia pokazuje kartę
// właśnie tego urządzenia, urządzenie „Motor HA” – cały dom i wszystkie okna, panel – wszystkie karty.
// ZRZUTY=katalog zapisuje zrzuty z telefonu (aplikacja HA na Androida).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const KARTA = await readFile(new URL('../../custom_components/motor_ha/www/motor-ha.js', import.meta.url), 'utf8');
const ADRES = 'http://ha.test';
const ZRZUTY = process.env.ZRZUTY;
const TELEFON = { viewport: { width: 384, height: 832 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
  userAgent: 'Mozilla/5.0 (Linux; Android 16; SM-S928B Build/BP2A.250605.031; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/141.0.7390.122 Mobile Safari/537.36 Home Assistant/2026.10.1-12345 (Android 16; SM-S928B)' };

// [id urządzenia, nazwa, rodzaj, skrzydła, pozycja]
const URZ = [
  ['d1', 'Żaluzja lewa dzieci', 'zebra', 2, 0],
  ['d2', 'Roleta salon', 'natynkowa', 1, 40],
  ['d3', 'Żaluzja fasadowa biuro', 'fasadowa', 1, 100],
  ['d4', 'Plisa kuchnia', 'plisa', 1, 70],
  ['d5', 'Zasłona sypialnia', 'zaslona', 1, 50],
  ['d6', 'Brama wjazdowa', 'przesuwna', 1, 0]
];

const STRONA = `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;font-family:sans-serif;background:#111;color:#e1e1e1;--primary-color:#009ac7;--primary-text-color:#e1e1e1;
--secondary-text-color:#9b9b9b;--divider-color:rgba(225,225,225,.12);--card-background-color:#1c1c1c;--ha-card-background:#1c1c1c}
.panel{display:flex;flex-direction:column;gap:8px;padding:8px}</style></head><body><home-assistant></home-assistant><script>
const URZ = ${JSON.stringify(URZ)};
window.zapisy = [];
const hass = { language: 'pl', locale: { language: 'pl' }, themes: { darkMode: true }, user: { is_admin: true }, states: {}, entities: {},
  devices: { hub: { id: 'hub', config_entries: ['w1'], identifiers: [['motor_ha', 'motor_ha']] } },
  callService: async (d, s, dane) => { window.zapisy.push([d, s, dane]); }, callWS: async () => [], connection: { subscribeMessage: async () => () => {} } };
hass.entities['update.motor_ha'] = { entity_id: 'update.motor_ha', device_id: 'hub', platform: 'motor_ha' };
for (const [id, nazwa, oslona, skrzydla, poz] of URZ) {
  const e = 'cover.' + id;
  hass.devices[id] = { id, name: nazwa, config_entries: ['w' + id], identifiers: [['motor_ha', 'w' + id]] };
  hass.entities[e] = { entity_id: e, device_id: id, platform: 'motor_ha' };
  hass.states[e] = { entity_id: e, state: poz ? 'open' : 'closed', attributes: { friendly_name: nazwa, current_position: poz, supported_features: 15,
    motor_ha: { oslona, kolor: 'bialy', skrzydla, czas: 20, encje: {} } }, last_changed: new Date().toISOString() };
}
class HaApp extends HTMLElement { constructor() { super(); this.hass = hass; this.attachShadow({ mode: 'open' }); } }
class HaPage extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML =
  '<style>.container{display:flex;gap:8px;padding:8px}.column{flex:1;min-width:0}</style><div class="container">' +
  '<div class="column"><div>Urządzenie</div></div>'.repeat(innerWidth > 900 ? 2 : 1) + '</div>'; } }
customElements.define('home-assistant', HaApp);
customElements.define('ha-config-device-page', HaPage);
if (location.pathname.startsWith('/config/devices/')) setTimeout(() => {
  const pg = document.createElement('ha-config-device-page'); pg.hass = hass;
  document.querySelector('home-assistant').shadowRoot.appendChild(pg);
}, 500);
</script><script type="module" src="/motor_ha/motor-ha.js"></script></body></html>`;

let przegladarka;
before(async () => { przegladarka = await chromium.launch(); if (ZRZUTY) await mkdir(ZRZUTY, { recursive: true }); });
after(async () => { await przegladarka?.close(); });

async function otworz(sciezka, ustawienia = TELEFON) {
  const ctx = await przegladarka.newContext({ ...ustawienia, colorScheme: 'dark' });
  const page = await ctx.newPage();
  const bledy = [];
  page.on('pageerror', e => bledy.push(String(e)));
  await page.route(`${ADRES}/**`, r => new URL(r.request().url()).pathname === '/motor_ha/motor-ha.js'
    ? r.fulfill({ contentType: 'text/javascript', body: KARTA }) : r.fulfill({ contentType: 'text/html', body: STRONA }));
  await page.goto(ADRES + sciezka);
  return { ctx, page, bledy };
}

const kartyStrony = (page) => page.evaluate(() => {
  const pg = document.querySelector('home-assistant').shadowRoot.querySelector('ha-config-device-page');
  return [...(pg?.shadowRoot.querySelectorAll('motor-ha-urzadzenie') || [])].map(e => {
    const okno = e.shadowRoot?.querySelector('motor-ha, motor-ha-dom');
    return { encja: e.cel?.entity || 'dom', h: e.getBoundingClientRect().height, w: e.getBoundingClientRect().width,
      rysunek: okno?.shadowRoot?.querySelectorAll('.szyba, svg').length || 0 };
  });
});

for (const [id, nazwa, oslona] of URZ) {
  test(`strona urządzenia „${nazwa}” (${oslona}): karta tego urządzenia`, async () => {
    const { ctx, page, bledy } = await otworz(`/config/devices/device/${id}`);
    try {
      await page.waitForFunction(() => document.querySelector('home-assistant').shadowRoot
        .querySelector('ha-config-device-page')?.shadowRoot.querySelector('motor-ha-urzadzenie'), null, { timeout: 8000 });
      await page.waitForTimeout(900);
      const k = await kartyStrony(page);
      assert.equal(k.length, 1, 'jedna karta');
      assert.equal(k[0].encja, `cover.${id}`, 'karta właśnie tego urządzenia');
      assert.ok(k[0].h > 200 && k[0].rysunek > 0, `karta narysowana (${k[0].h})`);
      assert.ok(k[0].w <= TELEFON.viewport.width, 'mieści się na ekranie telefonu');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth) <= TELEFON.viewport.width, 'nic nie wychodzi w bok');
      assert.deepEqual(bledy, []);
      if (ZRZUTY) await page.screenshot({ path: `${ZRZUTY}/urzadzenie-${id}.png`, fullPage: true });
    } finally { await ctx.close(); }
  });
}

test('urządzenie „Motor HA”: cały dom i wszystkie okna', async () => {
  const { ctx, page, bledy } = await otworz('/config/devices/device/hub');
  try {
    await page.waitForFunction((n) => document.querySelector('home-assistant').shadowRoot
      .querySelector('ha-config-device-page')?.shadowRoot.querySelectorAll('motor-ha-urzadzenie').length === n, URZ.length + 1, { timeout: 8000 });
    await page.waitForTimeout(900);
    const k = await kartyStrony(page);
    assert.deepEqual(k.map(x => x.encja).sort(), ['dom', ...URZ.map(u => `cover.${u[0]}`)].sort());
    assert.ok(k.every(x => x.h > 100), 'wszystkie karty widoczne');
    assert.deepEqual(bledy, []);
    if (ZRZUTY) await page.screenshot({ path: `${ZRZUTY}/motor-ha-caly-dom.png`, fullPage: true });
  } finally { await ctx.close(); }
});

test('panel z kilkoma kartami: każda narysowana, każda ma „Zmień ustawienia”', async () => {
  const { ctx, page, bledy } = await otworz('/lovelace/okna');
  try {
    await page.waitForFunction(() => customElements.get('motor-ha'));
    const w = await page.evaluate(async (urz) => {
      const hass = document.querySelector('home-assistant').hass, panel = document.createElement('div');
      panel.className = 'panel'; document.body.appendChild(panel);
      const karty = urz.map(([id]) => { const k = document.createElement('motor-ha');
        k.setConfig({ type: 'custom:motor-ha', entity: 'cover.' + id }); k.hass = hass; panel.appendChild(k); return k; });
      await new Promise(r => setTimeout(r, 900));
      return karty.map(k => ({ h: k.getBoundingClientRect().height, zmien: !!k.shadowRoot.querySelector('.zmien'),
        suwak: k.shadowRoot.querySelector('.suwak .wyp')?.getBoundingClientRect().width ?? -1 }));
    }, URZ);
    assert.equal(w.length, URZ.length);
    w.forEach((k, i) => {
      assert.ok(k.h > 200, `${URZ[i][1]}: karta narysowana (${k.h})`);
      assert.ok(k.zmien, `${URZ[i][1]}: „Zmień ustawienia”`);
      assert.ok(k.suwak === -1 || k.suwak >= 12, `${URZ[i][1]}: suwak z uchwytem (${k.suwak})`);
    });
    assert.deepEqual(bledy, []);
    if (ZRZUTY) await page.screenshot({ path: `${ZRZUTY}/panel.png`, fullPage: true });
  } finally { await ctx.close(); }
});
