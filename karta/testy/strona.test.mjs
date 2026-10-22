// Stały test: karta Motor HA na stronie urządzenia (Ustawienia → Urządzenia) w aplikacji HA na Androida,
// w Chrome na telefonie i na komputerze. Strona HA jest tu udawana (home-assistant → ha-config-device-page → div.column),
// a wczytujemy prawdziwy, zbudowany plik karty – ten sam, który dostaje HA.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const KARTA = await readFile(new URL('../../custom_components/motor_ha/www/motor-ha.js', import.meta.url), 'utf8');
const ADRES = 'http://ha.test';
const OKNO = 'abc123', HUB = 'hub1';

const URZADZENIA = [
  ['aplikacja HA na Androida (Galaxy S24 Ultra)', { viewport: { width: 384, height: 832 }, deviceScaleFactor: 3.75, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 16; SM-S928B Build/BP2A.250605.031; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/141.0.7390.122 Mobile Safari/537.36 Home Assistant/2026.10.1-12345 (Android 16; SM-S928B)' }],
  ['Chrome na telefonie', { viewport: { width: 412, height: 915 }, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (Linux; Android 16; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36' }],
  ['komputer', { viewport: { width: 1400, height: 900 } }]
];

// udawany HA: ten sam układ co ha-config-device-page w HA 2026.10 (kolumny div.column w cieniu strony)
const STRONA = (opoznienie, kolumny) => `<!doctype html><html lang="pl"><head><meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;font-family:sans-serif;--primary-color:#009ac7;--primary-text-color:#212121;--secondary-text-color:#727272;
--divider-color:#e0e0e0;--card-background-color:#fff}</style></head><body><home-assistant></home-assistant><script>
window.zapisy = [];
const stan = (p) => ({ entity_id: 'cover.okno', state: 'open', attributes: { friendly_name: 'Okno', current_position: p, supported_features: 15,
  motor_ha: { oslona: 'zaluzja', kolor: 'bialy', skrzydla: 2, czas: 20, encje: {} } }, last_changed: new Date().toISOString() });
const hass = {
  language: 'pl', locale: { language: 'pl' }, themes: { darkMode: false }, user: { is_admin: true },
  states: { 'cover.okno': stan(0) },
  entities: { 'cover.okno': { entity_id: 'cover.okno', device_id: '${OKNO}', platform: 'motor_ha' },
              'switch.okno_auto': { entity_id: 'switch.okno_auto', device_id: '${OKNO}', platform: 'motor_ha' },
              'update.motor_ha': { entity_id: 'update.motor_ha', device_id: '${HUB}', platform: 'motor_ha' } },
  devices: { '${OKNO}': { id: '${OKNO}', config_entries: ['wpis1'], identifiers: [['motor_ha', 'wpis1']] },
             '${HUB}': { id: '${HUB}', config_entries: ['wpis1'], identifiers: [['motor_ha', 'motor_ha']] } },
  callService: async (d, s, dane) => { window.zapisy.push([d, s, dane]); },
  callWS: async () => [], connection: { subscribeMessage: async () => () => {} }
};
class HaApp extends HTMLElement { constructor() { super(); this.hass = hass; this.attachShadow({ mode: 'open' }); } }
class HaPage extends HTMLElement { constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML =
  '<style>.container{display:flex;gap:8px}.column{flex:1;min-width:0}</style><div class="container">' +
  ${JSON.stringify('<div class="column"><div class="karta-ha">Urządzenie</div></div>')}.repeat(${kolumny}) + '</div>'; } }
customElements.define('home-assistant', HaApp);
customElements.define('ha-config-device-page', HaPage);
setTimeout(() => {   // HA pokazuje stronę urządzenia dopiero po wczytaniu danych
  const app = document.querySelector('home-assistant');
  const pg = document.createElement('ha-config-device-page'); pg.hass = hass;
  app.shadowRoot.appendChild(pg);
}, ${opoznienie});
</script><script type="module" src="/motor_ha/motor-ha.js"></script></body></html>`;

let przegladarka;
before(async () => { przegladarka = await chromium.launch(); });
after(async () => { await przegladarka?.close(); });

async function otworz(ustawienia, urzadzenie, { opoznienie = 1500, kolumny = 1 } = {}) {
  const ctx = await przegladarka.newContext(ustawienia);
  const page = await ctx.newPage();
  const bledy = [];
  page.on('pageerror', e => bledy.push(String(e)));
  await page.route(`${ADRES}/**`, r => {
    const u = new URL(r.request().url());
    if (u.pathname === '/motor_ha/motor-ha.js') return r.fulfill({ contentType: 'text/javascript', body: KARTA });
    if (u.pathname.startsWith('/lovelace')) return r.fulfill({ contentType: 'text/html', body: STRONA(999999, 1) });
    return r.fulfill({ contentType: 'text/html', body: STRONA(opoznienie, kolumny) });
  });
  await page.goto(urzadzenie.startsWith('/') ? ADRES + urzadzenie : `${ADRES}/config/devices/device/${urzadzenie}`);
  return { ctx, page, bledy };
}

const karty = (page) => page.evaluate(() => {
  const pg = document.querySelector('home-assistant').shadowRoot.querySelector('ha-config-device-page');
  return [...(pg?.shadowRoot.querySelectorAll('motor-ha-urzadzenie') || [])].map(e => {
    const r = e.getBoundingClientRect(), okno = e.shadowRoot?.querySelector('motor-ha, motor-ha-dom');
    return { w: r.width, h: r.height, pierwsza: e.parentElement.firstElementChild === e,
      okno: okno ? okno.getBoundingClientRect().height : 0, szyby: okno?.shadowRoot?.querySelectorAll('.szyba').length || 0,
      dodaj: !!e.shadowRoot?.querySelector('.dodaj'), zmien: !!e.shadowRoot?.querySelector('.zmien'),
      zmienWKarcie: !!okno?.shadowRoot?.querySelector('.zmien'),
      suwak: okno?.shadowRoot?.querySelector('.suwak .wyp')?.getBoundingClientRect().width || 0 };
  });
});

for (const [nazwa, ustawienia] of URZADZENIA) {
  test(`${nazwa}: karta okna na górze strony urządzenia`, async () => {
    const { ctx, page, bledy } = await otworz(ustawienia, OKNO);
    try {
      await page.waitForFunction(() => document.querySelector('home-assistant').shadowRoot
        .querySelector('ha-config-device-page')?.shadowRoot.querySelector('motor-ha-urzadzenie'), null, { timeout: 8000 });
      await page.waitForTimeout(800);
      const [k, ...reszta] = await karty(page);
      assert.equal(reszta.length, 0, 'jedna karta');
      assert.ok(k.pierwsza, 'karta na górze kolumny');
      assert.ok(k.h > 200 && k.okno > 150, `karta ma wysokość (${k.h}/${k.okno})`);
      assert.ok(k.w <= ustawienia.viewport.width, 'karta mieści się na szerokość ekranu');
      assert.ok(k.szyby > 0, 'okno narysowane');
      assert.ok(k.dodaj && k.zmien, 'przyciski „Dodaj do panelu” i „Zmień ustawienia”');
      assert.ok(!k.zmienWKarcie, 'na stronie urządzenia jeden „Zmień ustawienia”');
      assert.ok(k.suwak >= 12, `suwak ma uchwyt także przy 0 % (${k.suwak})`);
      const szer = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.ok(szer <= ustawienia.viewport.width, `nic nie wychodzi poza ekran (${szer})`);
      assert.deepEqual(bledy, []);
      assert.deepEqual(await page.evaluate(() => window.zapisy), [], 'brak wpisu o problemie w dzienniku');
    } finally { await ctx.close(); }
  });
}

test('urządzenie „Motor HA”: cały dom i okna (dwie kolumny)', async () => {
  const { ctx, page } = await otworz(URZADZENIA[2][1], HUB, { kolumny: 2 });
  try {
    await page.waitForFunction(() => document.querySelector('home-assistant').shadowRoot
      .querySelector('ha-config-device-page')?.shadowRoot.querySelectorAll('motor-ha-urzadzenie').length === 2, null, { timeout: 8000 });
    await page.waitForTimeout(800);
    const k = await karty(page);
    assert.ok(k.every(x => x.h > 100), 'obie karty widoczne');
  } finally { await ctx.close(); }
});

test('strona wczytana późno (wolny telefon) – karta i tak się pojawia', async () => {
  const { ctx, page } = await otworz(URZADZENIA[0][1], OKNO, { opoznienie: 6000 });
  try {
    await page.waitForFunction(() => document.querySelector('home-assistant').shadowRoot
      .querySelector('ha-config-device-page')?.shadowRoot.querySelector('motor-ha-urzadzenie'), null, { timeout: 12000 });
  } finally { await ctx.close(); }
});

for (const [nazwa, ustawienia] of URZADZENIA.slice(0, 2)) {
  test(`${nazwa}: karta na panelu ma „Zmień ustawienia” i suwak z uchwytem`, async () => {
    const { ctx, page, bledy } = await otworz(ustawienia, '/lovelace/okna');
    try {
      await page.waitForFunction(() => customElements.get('motor-ha'));
      const w = await page.evaluate(async () => {
        const hass = document.querySelector('home-assistant').hass;
        const k = document.createElement('motor-ha');
        k.setConfig({ type: 'custom:motor-ha', entity: 'cover.okno' });
        k.hass = hass;
        document.body.appendChild(k);
        await new Promise(r => setTimeout(r, 600));
        const z = k.shadowRoot.querySelector('.zmien');
        const wynik = { zmien: z?.textContent || '', wys: z?.getBoundingClientRect().height || 0,
          suwak: k.shadowRoot.querySelector('.suwak .wyp')?.getBoundingClientRect().width || 0 };
        k.preview = true; k.hass = { ...hass };   // edytor panelu: bez przycisku
        wynik.wPodgladzie = !!k.shadowRoot.querySelector('.zmien');
        return wynik;
      });
      assert.match(w.zmien, /Zmień ustawienia/);
      assert.ok(w.wys >= 30, 'przycisk da się nacisnąć palcem');
      assert.ok(w.suwak >= 12, `suwak ma uchwyt przy 0 % (${w.suwak})`);
      assert.ok(!w.wPodgladzie, 'w edytorze panelu nie ma przycisku');
      assert.deepEqual(bledy, []);
    } finally { await ctx.close(); }
  });
}
