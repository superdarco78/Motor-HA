// Składa kartę (src/ + tlumaczenia/) w jeden plik custom_components/motor_ha/www/motor-ha.js.
import * as esbuild from 'esbuild';
import { readdirSync, writeFileSync, existsSync } from 'node:fs';

// zdjęcia rodzajów (www/rodzaje/{klucz}.webp, wygenerowane w Canvie): karta bierze tylko te, które są – reszta to rysunki z kafle.js
const ZDJ = '../custom_components/motor_ha/www/rodzaje';
const maski = existsSync(ZDJ + '/maski') ? readdirSync(ZDJ + '/maski').filter(f => f.endsWith('.png')).map(f => f.slice(0, -4)).sort() : [];
const zdjecia = existsSync(ZDJ) ? readdirSync(ZDJ).filter(f => f.endsWith('.webp')).map(f => f.slice(0, -5)).sort() : [];
// grafiki kreatora (www/ui: kafelki Układu u1…u8/wlasny, ikony kroków {krok}.png i {krok}-ciemny.png, Canva)
const UI = '../custom_components/motor_ha/www/ui';
const ui = existsSync(UI) ? readdirSync(UI).filter(f => /\.(webp|png)$/.test(f)).sort() : [];
// widok za oknem (www/widok/{pora}-{pogoda}.webp, Canva): zdjęcia pory dnia × pogody
const WID = '../custom_components/motor_ha/www/widok';
const widok = existsSync(WID) ? readdirSync(WID).filter(f => f.endsWith('.webp')).map(f => f.slice(0, -5)).sort() : [];
writeFileSync('src/zdjecia.js', `// Wygenerowane przez zbuduj.mjs – rodzaje, które mają zdjęcie w www/rodzaje/, grafiki z www/ui/ i widoki z www/widok/\nexport const ZDJECIA = new Set(${JSON.stringify(zdjecia)});\nexport const UI = new Set(${JSON.stringify(ui)});\nexport const MASKI = new Set(${JSON.stringify(maski)});\nexport const WIDOK = new Set(${JSON.stringify(widok)});\n`);

await esbuild.build({
  entryPoints: ['src/index.js'],
  outfile: '../custom_components/motor_ha/www/motor-ha.js',
  bundle: true,
  format: 'iife',
  target: 'es2020',
  charset: 'utf8',
  minify: process.argv.includes('--min'),
  legalComments: 'none',
  banner: { js: '/* Motor HA – karta okna z osłoną · © superdarco78 · CC BY-NC-SA 4.0 · github.com/superdarco78/Motor-HA\n   Źródło: karta/src (npm run build) */' },
  logLevel: 'info'
});

// Te same obrazki rodzajów dla klasycznego kreatora w Pythonie (galeria.py): kafle.json z gotowymi SVG.
const { kafel, GRUPY_KAFLI } = await import('./src/kafle.js');
const fs = await import('node:fs');
const KOLOR = { wew: '#cbbba0', zew: '#43474d', dach: '#cbbba0', taras: '#8d8474', okna: '#3a3d42', moskitiery: '#3a3d42', brama: '#3a3d42' };
const WLASNY = { dach_ssl: '#43474d', dachowa: '#43474d', markizeta_dach: '#55595f', dach_msl: '#8d8474' };
const kafle = {};
for (const [g, pod] of GRUPY_KAFLI) for (const [, typy] of pod) for (const t of typy) kafle[t] = kafel(t, WLASNY[t] || KOLOR[g], '#f4f4f2');
fs.writeFileSync('../custom_components/motor_ha/kafle.json', JSON.stringify(kafle) + '\n');
