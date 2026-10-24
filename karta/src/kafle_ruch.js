// Motor HA – animacje otwierania każdego rodzaju: ten sam obrazek co w kreatorze, ale z ruchem.
// o = otwarcie jak w HA (0 zamknięte … 1 otwarte): roleta zwija się do skrzynki, żaluzja najpierw obraca lamele, potem jedzie
// w górę, plisa składa się w harmonijkę, zasłona rozsuwa na boki, markiza wysuwa na ramionach, okno uchyla, brama odjeżdża.
import { poczatek, R } from './kafle.js';

const { ciem, jas, u, CIEN, okno, tlo, cienR, svg, skrzynka, prowadnice, pancerz, kaseta, dach, oknoD, prowD, belkaD, SOSNA, BIALA, SZARA, ORZECH,
  elewacja, drzwi, pasyM, balustrada, plac, sztachety, garaz, slupek } = R;
const lin = (a, b, t) => a + (b - a) * t;
const zakres = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));

// --- rodziny ruchu ---
// roleta wewnętrzna: tkanina z wałka (kaseta u góry), dolna listwa
const rolWew = (k, z, opt = {}) => { const h = lin(2, opt.h ?? 60, z), x = opt.x ?? 35, w = opt.w ?? 50, y = opt.y ?? 21;
  const tk = opt.tk ? opt.tk(x, y, w, h) : `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${opt.fill || u('tk')}"/>`;
  return tk + `<rect x="${x - .5}" y="${y + h}" width="${w + 1}" height="2.6" rx="1" fill="${opt.listwa || u('rm')}"/><rect x="${x}" y="${y + h + 2.6}" width="${w}" height="1.2" fill="rgba(0,0,0,.12)"/>`; };
// pancerz rolety zewnętrznej z prowadnicami
const rolZew = (z, x = 32.5, y = 26, w = 55, h = 58) => `<rect x="${x}" y="${y}" width="${w}" height="${lin(1, h, z)}" fill="${u('lam')}"/><rect x="${x}" y="${y + lin(1, h, z) - 2.6}" width="${w}" height="2.6" fill="${u('met')}"/>
  <rect x="${x}" y="${y + lin(1, h, z)}" width="${w}" height="1.6" fill="rgba(0,0,0,.18)"/>`;
// lamele żaluzji: od o=1 do .3 jadą w dół, od .3 do 0 obracają się do zamknięcia
const lamele = (k, z, x, y, w, h, n, opt = {}) => { const zj = zakres(z, 0, .7), obr = zakres(z, .7, 1), ile = Math.max(1, Math.round(n * zj)), krok = h / n;
  const gr = lin(.6, krok * .92, obr); let s = '';
  for (let i = 0; i < ile; i++) { const yy = y + (zj < 1 ? i * lin(1.1, krok, zj) : i * krok);
    s += `<rect x="${x}" y="${yy}" width="${w}" height="${Math.max(.6, gr)}" fill="${opt.fill || jas(k, .2)}"/><rect x="${x}" y="${yy + Math.max(.6, gr)}" width="${w}" height=".5" fill="${ciem(k, .4)}"/>`; }
  return s + (opt.drabinki ? `<path d="M${x + w * .25} ${y}v${ile * (zj < 1 ? lin(1.1, krok, zj) : krok)}M${x + w * .75} ${y}v${ile * (zj < 1 ? lin(1.1, krok, zj) : krok)}" stroke="${opt.drabinki}" stroke-width=".5"/>` : '')
    + `<rect x="${x - .5}" y="${y + ile * (zj < 1 ? lin(1.1, krok, zj) : krok)}" width="${w + 1}" height="2.4" fill="${opt.dol || u('met')}"/>`; };
// plisa: harmonijka ściskana do górnej belki
const plisa = (c, z, x, y, w, h, opt = {}) => { const hh = lin(3, h, z), n = 12, kr = hh / n; let s = '';
  for (let i = 0; i < n; i++) s += `<rect x="${x}" y="${y + i * kr}" width="${w}" height="${kr / 2}" fill="${jas(c, .15)}"/><rect x="${x}" y="${y + i * kr + kr / 2}" width="${w}" height="${kr / 2}" fill="${ciem(c, .16)}"/>`;
  return `<rect x="${x - 1}" y="${y - 3}" width="${w + 2}" height="3" rx="1" fill="${opt.belka || u('alu')}"/>` + s + `<rect x="${x - 1}" y="${y + hh}" width="${w + 2}" height="3" rx="1" fill="${opt.belka || u('alu')}"/>`; };
// rzymska: płaska część zjeżdża, fałdy zbierają się nad dolną listwą
const rzymska = (c, z, x, y, w, h) => { const hh = lin(10, h, z), fal = Math.round(lin(4, 1, z)); let s = `<rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="${u('tk')}"/>`;
  for (let i = 0; i < fal; i++) { const yy = y + hh - i * 5; s += `<path d="M${x} ${yy}q${w / 2} 5 ${w} 0v-5q-${w / 2} 4 -${w} 0z" fill="${ciem(c, .08 + i * .06)}"/><path d="M${x} ${yy}q${w / 2} 5 ${w} 0" stroke="${jas(c, .3)}" stroke-width=".6" fill="none"/>`; }
  return s; };
// zasłona / panele / lamele pionowe rozsuwane na boki
const naBoki = (k, z, rodzaj) => { const sz = lin(10, 46, z), L = 14, P = 106; let s = '';
  if (rodzaj === 'pionowa') { const n = 12, kr = lin(1.4, 6, z); for (let i = 0; i < n; i++) s += `<rect x="${L + 10 + i * kr}" y="15" width="${lin(1.2, 5.2, z)}" height="72" fill="${u('tk')}"/>`; return s; }
  if (rodzaj === 'panel') { for (let i = 0; i < 4; i++) { const x = L + 2 + i * lin(2.5, 22, z); s += `<g filter="${u('cn')}"><rect x="${x}" y="13" width="21" height="76" fill="${u('tkv')}"/><rect x="${x}" y="86" width="21" height="3" fill="${u('alu')}"/></g>`; } return s; }
  const pan = (x0, w, lewy) => { const f = Math.max(3, Math.round(w / 5)); let p = `<path d="M${x0} 12h${w}l${lewy ? 2 : -2} 77H${x0 + (lewy ? -2 : 2)}z" fill="${rodzaj === 'firana' ? k : u('tk')}" opacity="${rodzaj === 'firana' ? .6 : 1}"/>`;
    for (let i = 0; i < f; i++) p += `<path d="M${x0 + (i + .5) * w / f} 12v77" stroke="${rodzaj === 'firana' ? ciem(k, .2) : ciem(k, .3)}" stroke-width="${rodzaj === 'firana' ? .6 : 1.4}" opacity=".5"/>`;
    return p; };
  return pan(L, sz, true) + pan(P - sz, sz, false); };

// --- sceny ---
const W = s => tlo() + okno(32, 18, 56, 66) + s;
const Z = s => tlo() + okno(32, 26, 56, 60) + s;
const D = (fr, drewno, s) => oknoD(fr, drewno) + s;

const RUCH = {
  // wewnątrz
  pelna: (k, r, z) => W(`<rect x="27" y="11" width="66" height="6" rx="3" fill="${u('alu')}" filter="${u('cn')}"/>` + rolWew(k, z, { x: 29, w: 62, y: 17, h: 64, listwa: u('alu') })),
  kasetowa: (k, r, z) => W(kaseta() + `<rect x="32.5" y="21" width="2.5" height="62" fill="${u('rm')}"/><rect x="85" y="21" width="2.5" height="62" fill="${u('rm')}"/>` + rolWew(k, z)),
  zebra: (k, r, z) => W(kaseta() + rolWew(k, z, { tk: (x, y, w, h) => { let s = ''; for (let yy = 0; yy < h; yy += 7) s += `<rect x="${x}" y="${y + yy}" width="${w}" height="${Math.min(3.6, h - yy)}" fill="${u('tk')}"/><rect x="${x}" y="${y + yy + 3.6}" width="${w}" height="${Math.max(0, Math.min(3.4, h - yy - 3.6))}" fill="#fff" opacity=".25"/>`; return s; } })),
  zaciemniajaca: (k, r, z) => W(kaseta() + `<rect x="31" y="21" width="4" height="63" fill="${u('rm')}"/><rect x="85" y="21" width="4" height="63" fill="${u('rm')}"/>` + rolWew(k, z, { fill: ciem(k, .35) })),
  roleta_zip_wew: (k, r, z) => W(`<rect x="30" y="13" width="60" height="7" rx="1.5" fill="${u('rm')}" filter="${u('cn')}"/><rect x="30" y="20" width="4" height="64" fill="${u('rm')}"/><rect x="86" y="20" width="4" height="64" fill="${u('rm')}"/>` + rolWew(k, z, { x: 34, w: 52, y: 20 })),
  bambusowa: (k, r, z) => { const b = k; return W(`<rect x="31" y="14" width="58" height="5" rx="1" fill="${ciem(b, .3)}" filter="${u('cn')}"/>` + rolWew(b, z, { x: 34, w: 52, y: 19, tk: (x, y, w, h) => { let s = ''; for (let yy = 0; yy < h; yy += 1.6) s += `<rect x="${x}" y="${y + yy}" width="${w}" height="1.2" fill="${(yy * 10) % 3 > 1.5 ? jas(b, .12) : b}"/>`; return s; }, listwa: ciem(b, .25) })); },
  ekran: (k, r, z) => `<rect width="120" height="100" fill="${u('tyn')}"/><rect y="86" width="120" height="14" fill="#a68b6b"/><g filter="${u('cn')}"><rect x="14" y="8" width="92" height="7" rx="3.5" fill="${u('met')}"/></g>`
    + `<rect x="18" y="15" width="84" height="${lin(1, 54, z)}" fill="${ciem(r, .7)}"/><rect x="21" y="15" width="78" height="${Math.max(0, lin(1, 54, z) - 10)}" fill="#fbfbfa"/><rect x="18" y="${15 + lin(1, 54, z)}" width="84" height="2.4" fill="${u('met')}"/>`,
  plisa: (k, r, z) => W(plisa(k, z, 36, 25, 48, 32)),
  plaster: (k, r, z) => W(plisa(k, z, 36, 25, 48, 32)),
  plisa_gora_dol: (k, r, z) => W(plisa(k, z, 36, lin(25, 38, .6), 48, 24)),
  rzymska: (k, r, z) => W(`<rect x="28" y="12" width="64" height="4" rx="1" fill="${u('alu')}" filter="${u('cn')}"/>` + rzymska(k, z, 29, 16, 62, 52)),
  zaluzja: (k, r, z) => W(`<rect x="32" y="15" width="56" height="5" rx="1" fill="${u('met')}" filter="${u('cn')}"/>` + lamele(k, z, 33, 20, 54, 44, 15, { drabinki: '#e8e8e8' })),
  drewniana: (k, r, z) => W(`<rect x="31" y="15" width="58" height="5" rx="1" fill="#8a5f38" filter="${u('cn')}"/>` + lamele('#9a6a3f', z, 32, 20, 56, 44, 10, { fill: '#a87a4e', drabinki: k, dol: '#7d5330' })),
  pionowa: (k, r, z) => W(`<rect x="22" y="11" width="76" height="4" rx="1" fill="${u('alu')}" filter="${u('cn')}"/>` + naBoki(k, z, 'pionowa')),
  panel: (k, r, z) => W(`<rect x="14" y="9" width="92" height="4" rx="1" fill="${u('alu')}" filter="${u('cn')}"/>` + naBoki(k, z, 'panel')),
  zaslona: (k, r, z) => W(`<rect x="12" y="9" width="96" height="2.6" rx="1.3" fill="${u('alu')}"/>` + naBoki(k, z, 'zaslona')),
  zaslona_wave: (k, r, z) => W(`<rect x="10" y="9" width="100" height="3" rx="1" fill="${u('alu')}"/>` + naBoki(k, z, 'zaslona')),
  firana: (k, r, z) => W(`<rect x="18" y="10" width="84" height="3.4" rx="1" fill="${u('alu')}"/>` + naBoki(k, z, 'firana')),
  // na zewnątrz
  natynkowa: (k, r, z) => Z(cienR(26, 26, 68) + prowadnice(32, 26, 56, 60) + rolZew(z) + skrzynka(26, 8, 68, 16, 4)),
  natynkowa_okragla: (k, r, z) => Z(cienR(26, 26, 68) + prowadnice(32, 26, 56, 60) + rolZew(z) + `<g filter="${u('cn')}"><path d="M26 8h58a10 10 0 0 1 10 10v6H26z" fill="${u('met')}"/></g>`),
  podtynkowa: (k, r, z) => tlo() + `<rect x="27" y="12" width="66" height="13" fill="#d6cec2"/>` + okno(32, 26, 56, 60) + `<rect x="31" y="23" width="58" height="3" fill="${u('met')}"/>` + prowadnice(32, 24, 56, 62) + rolZew(z, 32.5, 24, 55, 60),
  zewnetrzna: (k, r, z) => Z(`<rect x="32" y="12" width="56" height="14" fill="${u('rm')}" filter="${u('cn')}"/>` + prowadnice(32, 26, 56, 60, 'rm') + rolZew(z)),
  adaptacyjna: (k, r, z) => tlo() + okno(32, 14, 56, 72) + `<g filter="${u('cn')}"><rect x="32" y="14" width="56" height="12" fill="${u('met')}"/></g><rect x="34" y="26" width="3.6" height="60" fill="${u('metp')}"/><rect x="82.4" y="26" width="3.6" height="60" fill="${u('metp')}"/>` + rolZew(z, 37.6, 26, 44.8, 58),
  perforowana: (k, r, z) => { let d = ''; const h = lin(1, 58, z); for (let y = 27.5; y < 26 + h - 3; y += 3.6) for (let x = 34; x < 87; x += 2.6) d += `<rect x="${x}" y="${y}" width=".9" height=".9" fill="#cfe9f8" opacity=".85"/>`;
    return Z(prowadnice(32, 26, 56, 60) + rolZew(z) + d + skrzynka(26, 8, 68, 16, 4)); },
  roleta_moskitiera: (k, r, z) => Z(prowadnice(32, 26, 56, 60) + `<rect x="32.5" y="26" width="55" height="58" fill="${u('sia')}" opacity=".8"/>` + rolZew(z) + skrzynka(26, 8, 68, 16, 4)),
  ekstrudowana: (k, r, z) => Z(prowadnice(32, 26, 56, 60) + rolZew(z) + skrzynka(25, 6, 70, 20, 4)),
  roleta_drzwi: (k, r, z) => tlo() + `<rect x="22" y="26" width="76" height="62" fill="${u('rm')}"/><rect x="25" y="29" width="70" height="59" fill="${u('nb')}"/><rect x="25" y="29" width="70" height="59" fill="${u('bl')}"/>` + prowadnice(22, 22, 76, 66) + rolZew(z, 22.5, 22, 75, 66) + skrzynka(16, 6, 88, 16, 4) + `<rect y="88" width="120" height="12" fill="${u('ks')}"/>`,
  fasadowa: (k, r, z) => Z(`<rect x="27" y="15" width="66" height="9" fill="${u('alu')}" filter="${u('cn')}"/><rect x="27" y="22" width="3.4" height="64" fill="${u('alup')}"/><rect x="90" y="22" width="3.4" height="64" fill="${u('alup')}"/>` + lamele(k, z, 31, 24, 58, 44, 11, { drabinki: '#222' })),
  fasadowaz: (k, r, z) => RUCH.fasadowa(k, r, z),
  fasadowa_f80: (k, r, z) => RUCH.fasadowa(k, r, z),
  screen: (k, r, z) => Z(`<rect x="27" y="25" width="5" height="61" fill="${u('metp')}"/><rect x="88" y="25" width="5" height="61" fill="${u('metp')}"/>` + `<rect x="32" y="25" width="56" height="${lin(1, 50, z)}" fill="${u('tkv')}" opacity=".88"/><rect x="32" y="25" width="56" height="${lin(1, 50, z)}" fill="${u('sia')}" opacity=".5"/><rect x="31" y="${25 + lin(1, 50, z)}" width="58" height="3" fill="${u('met')}"/>` + `<g filter="${u('cn')}"><rect x="27" y="12" width="66" height="13" rx="3" fill="${u('met')}"/></g>`),
  markizoleta: (k, r, z) => { const a = zakres(z, 0, .6), b = zakres(z, .6, 1), h = lin(1, 34, a);
    return Z(`<rect x="27" y="24" width="4" height="34" fill="${u('metp')}"/><rect x="89" y="24" width="4" height="34" fill="${u('metp')}"/><rect x="31" y="24" width="58" height="${h}" fill="${u('tkv')}" opacity=".9"/>`
      + (b > 0 ? `<path d="M31 58h58l${12 * b} ${18 * b}H${31 - 12 * b}z" fill="${u('tkv')}"/>` : '') + `<rect x="${31 - 12 * b}" y="${24 + h + 18 * b}" width="${58 + 24 * b}" height="3" fill="${u('met')}"/><g filter="${u('cn')}"><rect x="26" y="12" width="68" height="12" rx="3" fill="${u('met')}"/></g>`); },
  okiennice: (k, r, z) => { const dr = k, sk = (x0, lewy) => { const w = lin(4, 26, z), x = lewy ? x0 : x0 - w; return `<rect x="${x}" y="22" width="${w}" height="64" fill="${dr}" stroke="${ciem(dr, .4)}"/>` + [...Array(13)].map((_, i) => `<rect x="${x + 1}" y="${25 + i * 4.6}" width="${Math.max(0, w - 2)}" height="2.4" fill="${jas(dr, .2)}"/>`).join(''); };
    return tlo() + okno(32, 22, 56, 64) + `<g filter="${u('cn')}">${sk(32, true)}${sk(88, false)}</g>`; },
  okiennice_przesuwne: (k, r, z) => { const dr = k, sk = x => `<rect x="${x}" y="22" width="27" height="64" fill="${dr}" stroke="${ciem(dr, .4)}"/>` + [...Array(13)].map((_, i) => `<rect x="${x + 2}" y="${25 + i * 4.6}" width="23" height="2.4" fill="${jas(dr, .18)}"/>`).join('');
    return tlo() + okno(32, 22, 56, 64) + `<rect x="6" y="16" width="108" height="3" fill="${u('met')}"/><g filter="${u('cn')}">${sk(lin(4, 33, z))}${sk(lin(89, 60, z))}</g>`; },
  // okna dachowe
  dach_dkl: (k, r, z) => D(r, 0, `<rect x="31" y="14" width="58" height="5" rx="1" fill="${r}"/>${prowD(r)}` + rolWew(k, z, { x: 33.4, w: 53.2, y: 19, h: 64, fill: k, listwa: r })),
  dach_dn: (k, r, z) => D(r, 0, `<rect x="31" y="13" width="58" height="6.4" rx="1.6" fill="${u('alu')}"/>${prowD(r)}` + rolWew(k, z, { x: 33.4, w: 53.2, y: 19.4, h: 62, listwa: r, tk: (x, y, w, h) => { let s = ''; for (let yy = 0; yy < h; yy += 7.6) s += `<rect x="${x}" y="${y + yy}" width="${w}" height="${Math.min(4.2, h - yy)}" fill="${k}"/>`; return s; } })),
  dach_fhb: (k, r, z) => D(r, 0, `<rect x="31" y="14" width="58" height="4" rx="1" fill="${r}"/>` + rzymska(k, z, 32, 18, 56, 56)),
  dach_pal: (k, r, z) => D(r, 0, `<rect x="31" y="14" width="58" height="4" rx="1" fill="${u('alu')}"/>${prowD(r)}` + lamele(k, z, 33.4, 18.6, 53.2, 63, 19, { fill: k, drabinki: '#d9d9d9', dol: r })),
  dach_fhl: (k, r, z) => D(r, 0, prowD(r) + plisa(k, z, 33.4, 39, 53.2, 31, { belka: r })),
  dach_ssl: (k, r, z) => D(r, 0, `<rect x="28" y="18" width="3" height="66" fill="${u('metp')}"/><rect x="89" y="18" width="3" height="66" fill="${u('metp')}"/>` + rolZew(z, 31, 18, 58, 66) + `<g filter="${u('cn')}"><rect x="18" y="0" width="84" height="14" rx="1.5" fill="${u('met')}"/><rect x="24" y="2" width="72" height="8.4" fill="#0f1d36"/></g>`),
  dach_msl: (k, r, z) => D(r, 0, `<path d="M20 8h80l${10 * z} ${40 * z}H${20 - 10 * z}z" fill="${k}" opacity=".86"/><path d="M20 8h80l${10 * z} ${40 * z}H${20 - 10 * z}z" fill="${u('sia')}"/><rect x="${19 - 10 * z}" y="${8 + 40 * z}" width="${82 + 20 * z}" height="3" fill="#2a2d31"/><g filter="${u('cn')}"><rect x="16" y="0" width="88" height="8" rx="2" fill="#2a2d31"/></g>`),
  dachowa: (k, r, z) => dach(`<path d="M33 16h54l${3.8 * z} ${46 * z}H${33 - 3.8 * z}z" fill="${u('lam')}"/><path d="M${33 - 3.8 * z} ${16 + 46 * z}h${54 + 7.6 * z}v3H${33 - 3.8 * z}z" fill="${u('met')}"/><g filter="${u('cn')}"><path d="M29 7h62l2 9H27z" fill="${u('met')}"/></g>`),
  markizeta_dach: (k, r, z) => dach(`<path d="M33 17h54l${4 * z} ${50 * z}H${33 - 4 * z}z" fill="${u('tkv')}" opacity=".85"/><path d="M${33 - 4 * z} ${17 + 50 * z}h${54 + 8 * z}v2.6H${33 - 4 * z}z" fill="${u('alu')}"/><path d="M30 13h60v4H30z" fill="${u('alu')}"/>`),
};

// markizy tarasowe: tkanina wysuwa się na ramionach od kasety
const markiza = (opt = {}) => (k, r, z) => { const d = lin(0, 28, z), szer = lin(0, 10, z), y0 = opt.y0 ?? 23;
  let s = (opt.tlo || (() => elewacja() + drzwi()))() + (z > .05 ? cienR(4, y0 + d + 6, 112, 12 * z) : '');
  s += `<path d="M14 ${y0}h92l${szer} ${d}H${14 - szer}z" fill="${u('tkv')}"/>` + (z > .05 ? pasyM(14, 106, y0, y0 + d, szer, k) : '');
  if (opt.ramiona !== false && z > .05) s += `<path d="M26 ${y0}l${14 * z} ${d * .7} ${10 * z} ${-d * .6}M94 ${y0}l${-14 * z} ${d * .7} ${-10 * z} ${-d * .6}" stroke="#e1e4e8" stroke-width="1.8" fill="none" opacity=".85"/>`;
  s += `<rect x="${4 + 10 - szer}" y="${y0 + d}" width="${92 + 2 * szer}" height="3.4" rx="1" fill="${u('alu')}"/>`;
  if (opt.volant && z > .9) s += `<rect x="${14 - szer}" y="${y0 + d + 3.4}" width="${92 + 2 * szer}" height="${16 * zakres(z, .9, 1)}" fill="${u('tk')}" opacity=".9"/>`;
  return s + (opt.kaseta || (() => `<g filter="${u('cn')}"><path d="M10 13h100v9l-5 4H15l-5-4z" fill="${u('alu')}"/></g>`))(); };
Object.assign(RUCH, {
  markiza: markiza({ kaseta: () => `<g filter="${u('cn')}"><rect x="12" y="16" width="96" height="7" rx="3.5" fill="${u('alu')}"/></g>` }),
  markiza_otwarta: markiza({ kaseta: () => `<g filter="${u('cn')}"><rect x="12" y="14" width="96" height="3" fill="${u('alu')}"/><rect x="14" y="17" width="92" height="6" rx="3" fill="${u('tk')}"/></g>` }),
  markiza_polkasetowa: markiza({ kaseta: () => `<g filter="${u('cn')}"><path d="M10 12h100v6l-4 6H14l-4-6z" fill="${u('alu')}"/></g>` }),
  markiza_kasetowa: markiza({ y0: 26 }),
  markiza_volant: markiza({ y0: 25, volant: true }),
  markiza_koszowa: (k, r, z) => elewacja() + `<rect x="36" y="38" width="48" height="42" fill="${u('rm')}"/><rect x="38" y="40" width="44" height="40" fill="${u('nb')}"/>`
    + `<g filter="${u('cn')}"><path d="M28 50V${50 - 16 * z}a32 ${22 * z} 0 0 1 64 0V50z" fill="${u('tkv')}"/></g><path d="M28 50h64" stroke="${ciem(k, .3)}" stroke-width="1.6"/>`,
  markiza_wolnostojaca: (k, r, z) => `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 58q30-8 60-4t60-2V100H0z" fill="#7da889"/><g filter="${u('cn')}"><rect x="56" y="14" width="8" height="8" rx="2" fill="${u('alu')}"/>
    <path d="M60 22L${60 - 46 * z} 40h${92 * z}z" fill="${u('tkv')}"/></g><rect x="${60 - 48 * z}" y="40" width="${96 * z}" height="3" rx="1" fill="${u('alu')}"/><rect x="58.5" y="22" width="3" height="62" fill="${u('alup')}"/>`,
  markiza_zimowa: (k, r, z) => elewacja(true) + `<path d="M0 30h22v52H0z" fill="${u('tyn')}"/><path d="M22 30l90 18v34H22z" fill="#d6ecf7" opacity=".55"/>${[0, 1, 2, 3, 4].map(i => `<path d="M${22 + i * 22.5} ${30 + i * 4.5}v${52 - i * 4.5}" stroke="${u('alup')}" stroke-width="1.6"/>`).join('')}<path d="M22 30.4l${84 * z} ${16.8 * z} 0 2.4-${84 * z}-${16.8 * z}z" fill="${u('tk')}"/><g filter="${u('cn')}"><path d="M22 26l6 1.2v4L22 30z" fill="${u('alu')}"/></g>`,
  markizeta: (k, r, z) => elewacja() + `<rect x="36" y="36" width="48" height="40" fill="${u('rm')}"/><rect x="38" y="38" width="44" height="38" fill="${u('nb')}"/><path d="M35 34h50l${9 * z} ${20 * z}H${35 - 9 * z}z" fill="${u('tkv')}"/><rect x="${35 - 10 * z}" y="${34 + 20 * z}" width="${50 + 20 * z}" height="3" fill="${u('alu')}"/><g filter="${u('cn')}"><rect x="34" y="28" width="52" height="6" rx="2" fill="${u('alu')}"/></g>`,
  markiza_balkonowa: markiza({ tlo: () => elewacja(true) + balustrada(), y0: 19, ramiona: false, kaseta: () => `<rect x="16" y="14" width="88" height="5" rx="2" fill="${u('alu')}"/><rect x="16.3" y="6" width="3.4" height="76" fill="${u('alup')}"/><rect x="100.3" y="6" width="3.4" height="76" fill="${u('alup')}"/>` }),
  markiza_pionowa: (k, r, z) => elewacja(true) + balustrada() + `<rect x="20" y="15" width="80" height="${lin(1, 50, z)}" fill="${u('tk')}"/><rect x="19" y="${15 + lin(1, 50, z)}" width="82" height="3.4" rx="1.4" fill="${u('alu')}"/><g filter="${u('cn')}"><rect x="18" y="8" width="84" height="7" rx="3.5" fill="${u('alu')}"/></g>`,
  markiza_boczna: (k, r, z) => elewacja(true) + `<rect x="0" y="10" width="16" height="70" fill="${u('tyn')}"/><path d="M21 26h${82 * z}v46H21z" fill="${u('tk')}"/><rect x="${19 + 82 * z}" y="24" width="4.4" height="54" rx="1" fill="${u('alu')}"/><g filter="${u('cn')}"><rect x="14" y="22" width="7" height="56" rx="3.5" fill="${u('alu')}"/></g>`,
  zagiel: (k, r, z) => `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 66q40-6 120-2V100H0z" fill="#7da889"/><rect y="80" width="120" height="20" fill="${u('ks')}"/><rect x="6" y="14" width="3" height="70" fill="${u('alup')}"/><rect x="110" y="24" width="3" height="60" fill="${u('alup')}"/>
    <g filter="${u('cn')}"><path d="M8 18L${lin(8, 60, z)} ${lin(18, 12, z)}L${lin(8, 111, z)} ${lin(18, 28, z)}L${lin(8, 60, z)} ${lin(18, 40, z)}z" fill="${u('tkv')}"/></g><rect x="4" y="16" width="7" height="5" rx="2" fill="#333"/>`,
  parasol: (k, r, z) => { const w = lin(4, 50, z), h = lin(30, 20, z); return `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 66q40-6 120-2V100H0z" fill="#7da889"/><rect y="82" width="120" height="18" fill="${u('ks')}"/><rect x="58.6" y="14" width="2.8" height="68" fill="${u('alup')}"/>
    <g filter="${u('cn')}"><path d="M${60 - w} ${14 + h}Q60 ${14 - 6 * z} ${60 + w} ${14 + h}z" fill="${u('tkv')}"/></g><path d="M44 86h32l-4-4H48z" fill="#555"/>`; },
  pergola: (k, r, z) => { let s = ''; for (let i = 0; i < 14; i++) { const x = 9 + i * 7.6, a = lin(7, 1.2, z); s += `<path d="M${x} 30l3.4 ${a}" stroke="${jas(k, .3)}" stroke-width="${lin(2.4, 1, z)}"/><path d="M${x + 1.5} 30l3.4 ${a}" stroke="${ciem(k, .3)}" stroke-width=".8"/>`; }
    return elewacja(true) + `<g filter="${u('cn')}"><path d="M6 24h108v6H6z" fill="${u('alu')}"/></g>` + s + `<rect x="9" y="30" width="6" height="52" fill="${u('alup')}"/><rect x="105" y="30" width="6" height="52" fill="${u('alup')}"/><rect x="15" y="38" width="90" height="42" fill="#000" opacity="${lin(.25, .05, z)}"/>`; },
  pergola_tkanina: (k, r, z) => { let s = ''; const n = 6, sz = lin(4, 17, z); for (let i = 0; i < n; i++) s += `<path d="M${10 + i * sz} 30q${sz / 2} ${7 * z} ${sz} 0" fill="${jas(k, i % 2 ? .1 : .25)}" stroke="${ciem(k, .25)}" stroke-width=".5"/>`;
    return elewacja(true) + `<g filter="${u('cn')}"><path d="M6 24h108v6H6z" fill="${u('alu')}"/></g>` + s + `<rect x="9" y="30" width="6" height="52" fill="${u('alup')}"/><rect x="105" y="30" width="6" height="52" fill="${u('alup')}"/>`; },
  zadaszenie: (k, r, z) => elewacja() + drzwi() + `<path d="M6 20h108l-10 16H16z" fill="#d6ecf7" opacity=".85"/><path d="M6 20h${108 * z}l-${10 * z} 16H${6 + 10 * z}z" fill="${u('tkv')}" opacity=".7"/><rect x="15" y="36" width="90" height="2.6" fill="${u('alu')}"/><rect x="17" y="38" width="3.4" height="44" fill="${u('alup')}"/><rect x="100" y="38" width="3.4" height="44" fill="${u('alup')}"/>`,
  screen_taras: (k, r, z) => elewacja() + drzwi() + `<rect x="6" y="27" width="5" height="55" fill="${u('alup')}"/><rect x="109" y="27" width="5" height="55" fill="${u('alup')}"/><rect x="11" y="27" width="98" height="${lin(1, 52, z)}" fill="${u('tkv')}" opacity=".85"/><rect x="11" y="${27 + lin(1, 52, z)}" width="98" height="3" fill="${u('alu')}"/><g filter="${u('cn')}"><rect x="6" y="20" width="108" height="7" rx="2" fill="${u('alu')}"/></g>`,
  // okna z napędem: skrzydło uchyla się
  okno_silownik: (k, r, z) => tlo() + `<path d="M27 13h66l-5 5H32v68l-5 5z" fill="#cfc6b8"/><rect x="32" y="18" width="56" height="68" fill="${u('rm')}"/><rect x="36" y="22" width="48" height="60" fill="#5c6670"/>
    <g filter="${u('cn')}"><path d="M35 21h50l${6 * z} ${lin(60, 52, z)}H${35 - 6 * z}z" fill="${u('rm')}"/><path d="M39 25h42l${5 * z} ${lin(52, 44, z)}H${39 - 5 * z}z" fill="${u('nb')}"/></g><path d="M60 ${lin(81, 78, z)}v${-8 * z}" stroke="#555" stroke-width="2"/>`,
  okno_dachowe: (k, r, z) => dach(`<path d="M32 24h56l6 64H26z" fill="#25282c"/><g filter="${u('cn')}"><path d="M30 ${lin(20, 8, z)}h60l${lin(2, 8, z)} ${lin(68, 60, z)}H${lin(28, 22, z)}z" fill="${u('rm')}"/><path d="M34 ${lin(24, 12, z)}h52l${lin(1.6, 6.6, z)} ${lin(60, 52, z)}H${lin(32.4, 27.4, z)}z" fill="${u('nb')}"/></g>`),
  okno_plaskie: (k, r, z) => `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 50h120v50H0z" fill="#8f949a"/><path d="M26 62h68l-4 18H30z" fill="${u('rm')}"/><g filter="${u('cn')}"><path d="M30 60l34 ${-18 * z} 32 ${14 * z}${z < .05 ? '' : ' -2 4'}z" fill="${u('rm')}"/><path d="M33 59l31 ${-15 * z} 28 ${12.4 * z}z" fill="${u('nb')}"/></g>`,
  swietlik: (k, r, z) => `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 52h120v48H0z" fill="#8f949a"/><path d="M28 70h64l-6 12H34z" fill="${u('rm')}"/><g filter="${u('cn')}" transform="rotate(${-28 * z} 34 70)"><path d="M34 70q26 -28 58 0z" fill="#dcecf6" opacity=".9"/></g>`,
  wylaz: (k, r, z) => dach(`<path d="M34 30h52l6 48H28z" fill="#2c2f33"/><g filter="${u('cn')}"><path d="M34 30h52l${lin(6, -6, z)} ${lin(48, -22, z)}H${lin(28, 40, z)}z" fill="${u('rm')}"/></g>`),
  // moskitiery
  moskitiera: (k, r, z) => W(`<rect x="29" y="19" width="3" height="65" fill="${u('rm')}"/><rect x="88" y="19" width="3" height="65" fill="${u('rm')}"/><rect x="32" y="19" width="56" height="${lin(1, 60, z)}" fill="${u('sia')}"/><rect x="32" y="${19 + lin(1, 60, z)}" width="56" height="3" fill="${u('rm')}"/><g filter="${u('cn')}"><rect x="29" y="12" width="62" height="7" rx="2" fill="${u('rm')}"/></g>`),
  moskitiera_plisa_okno: (k, r, z) => { const x = lin(36, 84, 1 - z); return W(`<rect x="31" y="18" width="3" height="66" fill="${u('rm')}"/><rect x="86" y="18" width="3" height="66" fill="${u('rm')}"/><rect x="34" y="19" width="${x - 34}" height="64" fill="${u('sia')}"/><rect x="${x}" y="19" width="2.6" height="64" fill="${u('rm')}"/>`); },
  moskitiera_drzwi: (k, r, z) => { const x = lin(39, 82, z); return tlo() + `<rect x="33" y="8" width="54" height="80" fill="${u('rm')}"/><rect x="37" y="12" width="46" height="76" fill="${u('nb')}"/><rect x="37" y="12" width="${x - 37}" height="76" fill="${u('sia')}"/><rect x="${x}" y="12" width="3" height="76" fill="${u('alup')}"/>`; },
  moskitiera_zip_drzwi: (k, r, z) => tlo() + `<rect x="30" y="12" width="4" height="80" fill="${u('rm')}"/><rect x="86" y="12" width="4" height="80" fill="${u('rm')}"/><rect x="34" y="12" width="52" height="80" fill="${u('nb')}"/><rect x="34" y="12" width="52" height="${lin(1, 78, z)}" fill="${u('sia')}"/><rect x="34" y="${12 + lin(1, 78, z)}" width="52" height="2.6" fill="${u('rm')}"/><rect x="30" y="4" width="60" height="8" rx="2" fill="${u('rm')}"/>`,
  // bramy (z = zamknięcie)
  przesuwna: (k, r, z) => plac() + slupek(0) + slupek(110) + `<g filter="${u('cn')}" transform="translate(${lin(80, 0, z)} 0)">${sztachety(10, 44, 78, 36)}</g>`,
  skrzydlowa: (k, r, z) => plac() + slupek(2) + slupek(108) + `<g filter="${u('cn')}"><g transform="translate(13 0) scale(${lin(.08, 1, z)} 1) translate(-13 0)">${sztachety(13, 44, 46, 36)}</g><g transform="translate(107 0) scale(${lin(.08, 1, z)} 1) translate(-107 0)">${sztachety(61, 44, 46, 36)}</g></g>`,
  furtka: (k, r, z) => plac() + `<rect x="30" y="34" width="10" height="48" fill="#b4ada1"/><rect x="80" y="34" width="10" height="48" fill="#b4ada1"/><g filter="${u('cn')}" transform="translate(41 0) scale(${lin(.1, 1, z)} 1) translate(-41 0)">${sztachety(41, 42, 38, 40)}</g>${sztachety(0, 46, 29, 36)}${sztachety(91, 46, 29, 36)}`,
  // segmenty jadą w górę pod sufit: dolna krawędź bramy podnosi się, widać tylko część poniżej nadproża
  segmentowa: (k, r, z) => { const dol = 22 + 66 * z; return garaz(`<rect x="18" y="22" width="84" height="66" fill="#2d3035"/><clipPath id="sg${Math.round(z * 1e3)}"><rect x="18" y="22" width="84" height="66"/></clipPath><g clip-path="url(#sg${Math.round(z * 1e3)})">`
    + [...Array(4)].map((_, i) => `<rect x="18" y="${dol - (i + 1) * 16.5}" width="84" height="16" fill="${u('met')}"/><path d="M18 ${dol - i * 16.5 - .5}h84" stroke="${ciem(k, .5)}" stroke-width=".8"/>`).join('') + '</g>'); },
  garaz_boczna: (k, r, z) => garaz(`<rect x="18" y="22" width="84" height="66" fill="#2d3035"/>` + [...Array(Math.max(1, Math.round(14 * z)))].map((_, i) => `<rect x="${18 + i * 6}" y="22" width="5.6" height="66" fill="${u('metp')}"/>`).join('')),
  uchylna: (k, r, z) => garaz(`<rect x="18" y="22" width="84" height="66" fill="#2d3035"/><rect x="18" y="22" width="84" height="${lin(4, 66, z)}" fill="${u('met')}"/>`),
  roletowa: (k, r, z) => garaz(`<rect x="18" y="22" width="84" height="66" fill="#2d3035"/><rect x="16" y="22" width="4" height="66" fill="${u('metp')}"/><rect x="100" y="22" width="4" height="66" fill="${u('metp')}"/>` + rolZew(z, 20, 22, 80, 64) + `<g filter="${u('cn')}"><rect x="14" y="10" width="92" height="12" fill="${u('met')}"/></g>`),
  garaz_skrzydlowa: (k, r, z) => garaz(`<rect x="18" y="22" width="84" height="66" fill="#2d3035"/><rect x="18" y="22" width="${42 * z}" height="66" fill="${u('met')}"/><rect x="${102 - 42 * z}" y="22" width="${42 * z}" height="66" fill="${u('met')}"/>`),
  szlaban: (k, r, z) => plac() + `<rect x="10" y="50" width="12" height="32" rx="1.5" fill="${u('met')}" filter="${u('cn')}"/><g transform="rotate(${lin(-80, 0, z)} 16 56)"><rect x="16" y="54" width="94" height="4" rx="2" fill="${u('alu')}"/>${[...Array(8)].map((_, i) => `<rect x="${22 + i * 11}" y="54" width="5.5" height="4" fill="#e53935"/>`).join('')}</g>`
});

// o: otwarcie jak w HA (1 = otwarte); dla markiz, pergoli i okien „otwarte” = wysunięte / uchylone, dla bram = otwarta
const WYSUWANE = t => t.startsWith('markiz') || ['dach_msl', 'markizeta_dach', 'zagiel', 'parasol', 'pergola', 'pergola_tkanina', 'zadaszenie', 'okno_silownik', 'okno_dachowe', 'okno_plaskie', 'swietlik', 'wylaz', 'markizoleta'].includes(t)
  && !['markiza_pionowa', 'markiza_boczna'].includes(t);
export function kafelRuch(typ, o, kolor = '#3b3f45', rama = '#f4f4f2') {
  const f = RUCH[typ];
  if (!f) return '';
  const z = WYSUWANE(typ) ? o : 1 - o;
  return svg(poczatek(kolor, rama) + f(kolor, rama, Math.min(1, Math.max(0, z))));
}
export const RODZAJE_RUCHU = Object.keys(RUCH);
