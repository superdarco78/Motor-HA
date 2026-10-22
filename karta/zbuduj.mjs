// Składa kartę (src/ + tlumaczenia/) w jeden plik custom_components/okno_ha/www/okno-ha.js.
import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.js'],
  outfile: '../custom_components/okno_ha/www/okno-ha.js',
  bundle: true,
  format: 'iife',
  target: 'es2020',
  charset: 'utf8',
  minify: process.argv.includes('--min'),
  legalComments: 'none',
  banner: { js: '/* Motor HA – karta okna z osłoną · © superdarco78 · CC BY-NC-SA 4.0 · github.com/superdarco78/okno-ha-integracja\n   Źródło: karta/src (npm run build) */' },
  logLevel: 'info'
});
