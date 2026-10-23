// Składa kartę (src/ + tlumaczenia/) w jeden plik custom_components/motor_ha/www/motor-ha.js.
import * as esbuild from 'esbuild';

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
