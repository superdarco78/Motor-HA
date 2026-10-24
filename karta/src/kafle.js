// Motor HA – realistyczne obrazki rodzajów osłon do kafelków kreatora: ściana z ościeżem, okno z parapetem i produkt
// w lekkiej perspektywie, z cieniami i metalicznymi przejściami. viewBox 120×100, kolor osłony i ramy z ustawień.

let P = 'k0', nr = 0;
// mieszanie kolorów w JS (bez color-mix – działa też w starszych WebView aplikacji HA)
const rgb = h => { h = String(h).replace('#', ''); if (h.length === 3) h = [...h].map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) || 0); };
const mix = (a, b, t) => '#' + rgb(a).map((x, i) => Math.round(x + (rgb(b)[i] - x) * t).toString(16).padStart(2, '0')).join('');
const ciem = (h, t = .3) => mix(h, '#000000', t), jas = (h, t = .3) => mix(h, '#ffffff', t);
const u = n => `url(#${P}${n})`;
const CIEN = 'rgba(0,0,0,.22)';

// wspólne przejścia i wzory jednego obrazka
function defs(k, r) {
  return `<defs>
  <linearGradient id="${P}tyn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efebe5"/><stop offset="1" stop-color="#d9d2c7"/></linearGradient>
  <linearGradient id="${P}nb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb8e0"/><stop offset=".65" stop-color="#cfe9f8"/><stop offset="1" stop-color="#e8f5fc"/></linearGradient>
  <linearGradient id="${P}bl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="${P}met" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${jas(k, .35)}"/><stop offset=".45" stop-color="${k}"/><stop offset="1" stop-color="${ciem(k, .35)}"/></linearGradient>
  <linearGradient id="${P}metp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${ciem(k, .25)}"/><stop offset=".5" stop-color="${jas(k, .2)}"/><stop offset="1" stop-color="${ciem(k, .3)}"/></linearGradient>
  <linearGradient id="${P}alu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${jas(r, .4)}"/><stop offset=".5" stop-color="${ciem(r, .08)}"/><stop offset="1" stop-color="${ciem(r, .3)}"/></linearGradient>
  <linearGradient id="${P}alup" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${ciem(r, .28)}"/><stop offset=".5" stop-color="${jas(r, .2)}"/><stop offset="1" stop-color="${ciem(r, .3)}"/></linearGradient>
  <linearGradient id="${P}rm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${jas(r, .25)}"/><stop offset="1" stop-color="${ciem(r, .12)}"/></linearGradient>
  <linearGradient id="${P}tk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${ciem(k, .12)}"/><stop offset=".3" stop-color="${jas(k, .08)}"/><stop offset=".7" stop-color="${k}"/><stop offset="1" stop-color="${ciem(k, .15)}"/></linearGradient>
  <linearGradient id="${P}tkv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ciem(k, .2)}"/><stop offset="1" stop-color="${jas(k, .12)}"/></linearGradient>
  <linearGradient id="${P}ks" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9b2a6"/><stop offset="1" stop-color="#8f887c"/></linearGradient>
  <linearGradient id="${P}dh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3553c"/><stop offset="1" stop-color="#6f3424"/></linearGradient>
  <pattern id="${P}lam" width="10" height="3.6" patternUnits="userSpaceOnUse"><rect width="10" height="3.6" fill="${k}"/><rect width="10" height="1.1" fill="${jas(k, .28)}"/><rect y="2.8" width="10" height=".8" fill="${ciem(k, .45)}"/></pattern>
  <pattern id="${P}sia" width="1.6" height="1.6" patternUnits="userSpaceOnUse"><path d="M0 0h1.6M0 0v1.6" stroke="${ciem(k, .15)}" stroke-width=".35" opacity=".75"/></pattern>
  <filter id="${P}fk" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .09 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
  <linearGradient id="${P}cr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
  <pattern id="${P}lamg" width="10" height="5" patternUnits="userSpaceOnUse"><rect width="10" height="5" fill="${k}"/><rect width="10" height="1.6" fill="${jas(k, .32)}"/><rect y="3.8" width="10" height="1.2" fill="${ciem(k, .5)}"/></pattern>
  <filter id="${P}cn" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="1.4" stdDeviation="1.2" flood-opacity=".35"/></filter>
  </defs>`;
}

// ściana z ościeżem, okno (rama, szyba z odblaskiem, krajobraz) i parapet
function okno(x, y, w, h) {
  const r = 4.5, gx = x + r, gy = y + r, gw = w - 2 * r, gh = h - 2 * r;
  return `<path d="M${x - 5} ${y - 5}h${w + 10}l-5 5H${x}v${h}l-5 5z" fill="#cfc6b8"/><path d="M${x + w + 5} ${y - 5}v${h + 10}l-5-5V${y}z" fill="#e2dbd0"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${u('rm')}" stroke="${CIEN}" stroke-width=".6"/>
    <rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="${u('nb')}"/>
    <path d="M${gx} ${gy + gh * .78}c${gw * .2} ${-gh * .14} ${gw * .32} ${-gh * .1} ${gw * .5} ${-gh * .02}s${gw * .35} ${-gh * .12} ${gw * .5} ${-gh * .06}V${gy + gh}H${gx}z" fill="#7da889"/>
    <path d="M${gx} ${gy + gh * .88}c${gw * .3} ${-gh * .08} ${gw * .6} ${-gh * .02} ${gw} ${-gh * .07}V${gy + gh}H${gx}z" fill="#5e8f6b"/>
    <rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="${u('bl')}"/>
    ${w > 50 ? `<rect x="${x + w / 2 - 2}" y="${y}" width="4" height="${h}" fill="${u('rm')}" stroke="${CIEN}" stroke-width=".5"/>` : ''}
    <path d="M${x - 7} ${y + h}h${w + 14}l-2 4H${x - 5}z" fill="#f4f2ee" stroke="${CIEN}" stroke-width=".5"/><rect x="${x - 5}" y="${y + h + 4}" width="${w + 10}" height="1.6" fill="rgba(0,0,0,.18)"/>`;
}
const tlo = () => `<rect width="120" height="100" fill="${u('tyn')}"/><rect width="120" height="100" fill="#fff" filter="${u('fk')}"/>`;
// miękki cień rzucany na ścianę pod osłoną
const cienR = (x, y, w, h = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${u('cr')}"/>`;
const svg = s => `<svg viewBox="0 0 120 100" aria-hidden="true" style="display:block;width:100%;height:auto;border-radius:6px">${s}</svg>`;
// skrzynka rolety w perspektywie: front, skos od spodu, zaślepka z boku
const skrzynka = (x, y, w, h, sk = 4) => `<g filter="${u('cn')}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${u('met')}"/>
  <path d="M${x} ${y + h}h${w}l-${sk} ${sk}H${x + sk}z" fill="${u('metp')}" opacity=".9"/><path d="M${x + w} ${y}l${sk} ${sk * .6}v${h}l-${sk} ${sk * .4}z" fill="${u('metp')}"/></g>`;
const prowadnice = (x, y, w, h, met = 'metp') => `<rect x="${x - 3.5}" y="${y}" width="4.5" height="${h}" fill="${u(met)}" stroke="${CIEN}" stroke-width=".4"/><rect x="${x + w - 1}" y="${y}" width="4.5" height="${h}" fill="${u(met)}" stroke="${CIEN}" stroke-width=".4"/>`;
const pancerz = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${u('lam')}"/><rect x="${x}" y="${y + h - 2.6}" width="${w}" height="2.6" fill="${u('met')}"/>
  <rect x="${x}" y="${y + h}" width="${w}" height="2" fill="rgba(0,0,0,.18)"/>`;
const kaseta = () => `<rect x="31" y="13" width="58" height="8" rx="2" fill="${u('rm')}" filter="${u('cn')}"/>`;

// --- wewnątrz pomieszczenia (widok z pokoju) ---
const WEW = {
  pelna: k => tlo() + okno(32, 18, 56, 66) + `<rect x="27" y="11" width="66" height="6" rx="3" fill="${u('alu')}" filter="${u('cn')}"/><rect x="29" y="16" width="62" height="40" fill="${u('tk')}"/>
    <rect x="28.5" y="55" width="63" height="3" rx="1.5" fill="${u('alu')}"/><path d="M86 17v34" stroke="#bbb" stroke-width=".6" stroke-dasharray=".8 .8"/>`,
  kasetowa: () => tlo() + okno(32, 18, 56, 66) + kaseta()
    + `<rect x="32.5" y="21" width="2.5" height="62" fill="${u('rm')}"/><rect x="85" y="21" width="2.5" height="62" fill="${u('rm')}"/><rect x="35" y="21" width="50" height="34" fill="${u('tk')}"/><rect x="35" y="55" width="50" height="2.6" fill="${u('rm')}"/>`,
  zebra: k => { const d = []; for (let y = 21; y < 57; y += 7) d.push(`<rect x="35" y="${y}" width="50" height="3.6" fill="${u('tk')}"/><rect x="35" y="${y + 3.6}" width="50" height="3.4" fill="#fff" opacity=".25"/><path d="M35 ${y + 3.6}h50" stroke="${ciem(k, .35)}" stroke-width=".4"/>`);
    return tlo() + okno(32, 18, 56, 66) + kaseta() + d.join('') + `<rect x="35" y="55" width="50" height="2.6" fill="${u('rm')}"/>`; },
  zaciemniajaca: k => tlo() + okno(32, 18, 56, 66) + kaseta()
    + `<rect x="31" y="21" width="4" height="63" fill="${u('rm')}"/><rect x="85" y="21" width="4" height="63" fill="${u('rm')}"/><rect x="35" y="21" width="50" height="46" fill="${ciem(k, .35)}"/><rect x="35" y="21" width="50" height="46" fill="${u('tk')}" opacity=".35"/><rect x="35" y="67" width="50" height="2.6" fill="${u('rm')}"/>`,
  plisa: k => { const d = []; for (let y = 25; y < 57; y += 2.6) d.push(`<rect x="36" y="${y}" width="48" height="1.3" fill="${jas(k, .18)}"/><rect x="36" y="${y + 1.3}" width="48" height="1.3" fill="${ciem(k, .18)}"/>`);
    return tlo() + okno(32, 18, 56, 66) + `<rect x="34" y="22" width="52" height="3" rx="1" fill="${u('alu')}"/>${d.join('')}<rect x="34" y="57" width="52" height="3" rx="1" fill="${u('alu')}"/><path d="M35 25v57M85 25v57" stroke="#555" stroke-width=".4"/><path d="M36 25${[...Array(12)].map((_, i) => `l${i % 2 ? 1.4 : -1.4} 2.6`).join('')}M84 25${[...Array(12)].map((_, i) => `l${i % 2 ? -1.4 : 1.4} 2.6`).join('')}" stroke="${ciem(k, .4)}" stroke-width=".5" fill="none"/>`; },
  plaster: k => { const d = []; for (let y = 25; y < 55; y += 4) for (let x = 36 + ((y / 4) % 2) * 2.5; x < 81; x += 5) d.push(`<path d="M${x} ${y + 2}l1.2-2h2.6l1.2 2-1.2 2h-2.6z" fill="${jas(k, .1)}" stroke="${ciem(k, .3)}" stroke-width=".4"/>`);
    return tlo() + okno(32, 18, 56, 66) + `<rect x="34" y="22" width="52" height="3" rx="1" fill="${u('alu')}"/><rect x="36" y="25" width="48" height="32" fill="${k}"/>${d.join('')}<rect x="34" y="57" width="52" height="3" rx="1" fill="${u('alu')}"/>`; },
  rzymska: k => tlo() + okno(32, 18, 56, 66) + `<rect x="28" y="12" width="64" height="4" rx="1" fill="${u('alu')}" filter="${u('cn')}"/><rect x="29" y="16" width="62" height="22" fill="${u('tk')}"/>
    ${[0, 1, 2].map(i => `<path d="M29 ${38 + i * 6}q31 ${6 - i} 62 0v-6q-31 ${5 - i} -62 0z" fill="${ciem(k, .1 + i * .07)}"/><path d="M29 ${38 + i * 6}q31 ${6 - i} 62 0" stroke="${jas(k, .25)}" stroke-width=".6" fill="none"/>`).join('')}`,
  zaluzja: k => { const d = []; for (let y = 20; y < 63; y += 3) d.push(`<path d="M33 ${y}h54l-1 1.8H34z" fill="${jas(k, .2)}"/><path d="M34 ${y + 1.8}h52" stroke="${ciem(k, .35)}" stroke-width=".5"/>`);
    return tlo() + okno(32, 18, 56, 66) + `<rect x="32" y="15" width="56" height="5" rx="1" fill="${u('met')}" filter="${u('cn')}"/>${d.join('')}<path d="M46 20v44M74 20v44" stroke="#e8e8e8" stroke-width=".5"/><rect x="32" y="63" width="56" height="3" rx="1" fill="${u('met')}"/>`; },
  drewniana: k => { const dr = '#9a6a3f', d = []; for (let y = 20; y < 63; y += 4.4) d.push(`<path d="M32 ${y}h56l-1 3.4H33z" fill="${jas(dr, .12)}"/><path d="M33 ${y + 3.4}h54" stroke="#5b3a20" stroke-width=".6"/><path d="M36 ${y + 1.5}q20 -.8 44 0" stroke="#7d5330" stroke-width=".35" fill="none"/>`);
    return tlo() + okno(32, 18, 56, 66) + `<rect x="31" y="15" width="58" height="5" rx="1" fill="${ciem(dr, .1)}" filter="${u('cn')}"/>${d.join('')}<rect x="44" y="20" width="3.4" height="46" fill="${k}" opacity=".9"/><rect x="73" y="20" width="3.4" height="46" fill="${k}" opacity=".9"/>`; },
  pionowa: k => { const d = []; for (let x = 24; x < 96; x += 6) d.push(`<rect x="${x}" y="15" width="5.2" height="72" fill="${u('tk')}"/><rect x="${x}" y="15" width="1" height="72" fill="${ciem(k, .3)}" opacity=".6"/>`);
    return tlo() + okno(32, 18, 56, 66) + `<rect x="22" y="11" width="76" height="4" rx="1" fill="${u('alu')}" filter="${u('cn')}"/>${d.join('')}`; },
  zaslona: k => { const pan = x0 => `<path d="M${x0} 12h22l3 76H${x0 - 2}z" fill="${u('tk')}"/>` + [0, 1, 2, 3].map(i => `<path d="M${x0 + 3 + i * 5.5} 12l${i % 2 ? 1 : -1} 76" stroke="${ciem(k, .35)}" stroke-width="1.6" opacity=".45"/><path d="M${x0 + 5 + i * 5.5} 12l${i % 2 ? 1 : -1} 76" stroke="${jas(k, .3)}" stroke-width="1" opacity=".5"/>`).join('');
    return tlo() + okno(32, 18, 56, 66) + `<rect x="12" y="9" width="96" height="2.6" rx="1.3" fill="${u('alu')}"/><circle cx="12" cy="10.3" r="2.6" fill="#8a8f96"/><circle cx="108" cy="10.3" r="2.6" fill="#8a8f96"/>${pan(14)}${pan(84)}`; },
  firana: k => tlo() + okno(32, 18, 56, 66) + `<rect x="18" y="10" width="84" height="3.4" rx="1" fill="${u('alu')}" filter="${u('cn')}"/><rect x="20" y="13" width="80" height="76" fill="${k}" opacity=".55"/>`
    + [...Array(16)].map((_, i) => `<path d="M${21 + i * 5} 13q${i % 2 ? 1.5 : -1.5} 38 0 76" stroke="${jas(k, .3)}" stroke-width="2.2" opacity=".8" fill="none"/><path d="M${23.5 + i * 5} 13q${i % 2 ? 1.5 : -1.5} 38 0 76" stroke="#c9c3b8" stroke-width=".6" opacity=".7" fill="none"/>`).join('')
    + [...Array(14)].map((_, i) => `<circle cx="${21 + i * 6}" cy="13" r=".9" fill="#7d8389"/>`).join(''),
  panel: k => tlo() + okno(32, 18, 56, 66) + `<rect x="14" y="9" width="92" height="4" rx="1" fill="${u('alu')}" filter="${u('cn')}"/>`
    + [[16, 0], [36, .06], [62, .12], [84, 0]].map(([x, t]) => `<g filter="${u('cn')}"><rect x="${x}" y="13" width="21" height="76" fill="${u('tkv')}"/><rect x="${x}" y="13" width="21" height="76" fill="#000" opacity="${t}"/><rect x="${x}" y="86" width="21" height="3" fill="${u('alu')}"/></g>`).join(''),
  roleta_zip_wew: () => tlo() + okno(32, 18, 56, 66) + `<rect x="30" y="13" width="60" height="7" rx="1.5" fill="${u('rm')}" filter="${u('cn')}"/><rect x="30" y="20" width="4" height="64" fill="${u('rm')}"/><rect x="86" y="20" width="4" height="64" fill="${u('rm')}"/>
    <rect x="34" y="20" width="52" height="40" fill="${u('tk')}"/><rect x="34" y="60" width="52" height="3" fill="${u('rm')}"/><path d="M34 20v40M86 20v40" stroke="#333" stroke-width=".9" stroke-dasharray=".7 .7"/>`,
  plisa_gora_dol: k => { const d = []; for (let y = 38; y < 62; y += 2.6) d.push(`<rect x="36" y="${y}" width="48" height="1.3" fill="${jas(k, .18)}"/><rect x="36" y="${y + 1.3}" width="48" height="1.3" fill="${ciem(k, .18)}"/>`);
    return tlo() + okno(32, 18, 56, 66) + `<rect x="34" y="35" width="52" height="3" rx="1" fill="${u('alu')}"/>${d.join('')}<rect x="34" y="62" width="52" height="3" rx="1" fill="${u('alu')}"/><path d="M35 22v60M85 22v60" stroke="#555" stroke-width=".4"/><path d="M52 24v-4l-2 2M52 20l2 2M68 76v4l-2-2M68 80l2-2" stroke="#ff9800" stroke-width=".9" fill="none"/>`; },
  bambusowa: k => { const b = k, d = []; for (let y = 20; y < 56; y += 1.6) d.push(`<rect x="34" y="${y}" width="52" height="1.2" fill="${(y * 10) % 3 > 1.5 ? jas(b, .12) : b}"/>`);
    return tlo() + okno(32, 18, 56, 66) + `<rect x="31" y="14" width="58" height="5" rx="1" fill="${ciem(b, .3)}" filter="${u('cn')}"/>${d.join('')}<path d="M46 19v38M74 19v38" stroke="#6b4a24" stroke-width=".8"/><rect x="33" y="55" width="54" height="3" rx="1.5" fill="${ciem(b, .25)}"/>`; },
  zaslona_wave: k => tlo() + okno(32, 18, 56, 66) + `<rect x="10" y="9" width="100" height="3" rx="1" fill="${u('alu')}" filter="${u('cn')}"/>`
    + [8, 82].map(x0 => `<path d="M${x0} 12${[...Array(5)].map(() => 'q3 4 6 0').join('')}V89${[...Array(5)].map(() => 'q-3 -2 -6 0').join('').replace(/^/, '')}H${x0}z" fill="${u('tk')}"/>` + [...Array(5)].map((_, i) => `<path d="M${x0 + 3 + i * 6} 14v75" stroke="${ciem(k, .3)}" stroke-width="2" opacity=".5"/><path d="M${x0 + 1 + i * 6} 13v76" stroke="${jas(k, .3)}" stroke-width="1" opacity=".5"/>`).join('')).join(''),
  ekran: (k, r) => `<rect width="120" height="100" fill="${u('tyn')}"/><rect y="86" width="120" height="14" fill="#a68b6b"/><path d="M0 86h120" stroke="rgba(0,0,0,.2)"/>
    <g filter="${u('cn')}"><rect x="14" y="8" width="92" height="7" rx="3.5" fill="${u('met')}"/></g><rect x="18" y="15" width="84" height="54" fill="${ciem(r, .7)}"/><rect x="21" y="18" width="78" height="44" fill="#fbfbfa"/>
    <path d="M21 18h78v44z" fill="#000" opacity=".04"/><rect x="18" y="69" width="84" height="2.4" fill="${u('met')}"/><path d="M32 52l14-14 10 9 8-6 16 11z" fill="#cfe1ee" opacity=".7"/>`
};

// --- na zewnątrz (widok z elewacji) ---
const ZEW = {
  natynkowa: () => tlo() + okno(32, 26, 56, 60) + cienR(26, 26, 68) + skrzynka(26, 8, 68, 16, 4) + prowadnice(32, 26, 56, 60) + pancerz(32.5, 26, 55, 36),
  natynkowa_okragla: () => tlo() + okno(32, 26, 56, 60) + cienR(26, 26, 68) + `<g filter="${u('cn')}"><path d="M26 8h58a10 10 0 0 1 10 10v6H26z" fill="${u('met')}"/><path d="M94 8.6l3 1.6v14l-3-.2z" fill="${u('metp')}"/></g>` + prowadnice(32, 26, 56, 60) + pancerz(32.5, 26, 55, 36),
  ekstrudowana: () => tlo() + okno(32, 26, 56, 60) + cienR(25, 27, 70) + skrzynka(25, 6, 70, 20, 4) + prowadnice(32, 26, 56, 60) + `<rect x="32.5" y="26" width="55" height="44" fill="${u('lamg')}"/><rect x="32.5" y="67" width="55" height="3.4" fill="${u('met')}"/><rect x="32.5" y="70.4" width="55" height="2" fill="rgba(0,0,0,.2)"/>
    <rect x="55" y="62" width="10" height="2" rx="1" fill="#1a1a1a"/>`,
  roleta_drzwi: () => tlo() + `<path d="M17 21h86l-5 5H22v62l-5 0z" fill="#cfc6b8"/><rect x="22" y="26" width="76" height="62" fill="${u('rm')}"/><rect x="25" y="29" width="34" height="59" fill="${u('nb')}"/><rect x="61" y="29" width="34" height="59" fill="${u('nb')}"/><rect x="25" y="29" width="70" height="59" fill="${u('bl')}"/>
    <path d="M25 76q20-6 70-2V88H25z" fill="#7da889"/>` + cienR(16, 22, 88) + skrzynka(16, 6, 88, 16, 4) + prowadnice(22, 22, 76, 66) + pancerz(22.5, 22, 75, 34) + `<rect y="88" width="120" height="12" fill="${u('ks')}"/>`,
  podtynkowa: () => tlo() + `<rect x="27" y="12" width="66" height="13" fill="#d6cec2"/><path d="M27 25h66" stroke="rgba(0,0,0,.25)"/><path d="M27 12h66" stroke="rgba(0,0,0,.12)" stroke-dasharray="2 1.5"/>`
    + okno(32, 26, 56, 60) + `<rect x="31" y="23" width="58" height="3" fill="${u('met')}"/>` + prowadnice(32, 24, 56, 62) + pancerz(32.5, 24, 55, 38),
  zewnetrzna: () => tlo() + okno(32, 26, 56, 60) + `<rect x="32" y="12" width="56" height="14" fill="${u('rm')}" filter="${u('cn')}"/><rect x="33" y="24" width="54" height="2" fill="rgba(0,0,0,.15)"/>` + prowadnice(32, 26, 56, 60, 'rm') + pancerz(32.5, 26, 55, 34),
  adaptacyjna: () => tlo() + okno(32, 14, 56, 72) + `<g filter="${u('cn')}"><rect x="32" y="14" width="56" height="12" fill="${u('met')}"/><path d="M32 26h56l-3 3H35z" fill="${u('metp')}"/></g>`
    + `<rect x="34" y="28" width="3.6" height="58" fill="${u('metp')}"/><rect x="82.4" y="28" width="3.6" height="58" fill="${u('metp')}"/>` + pancerz(37.6, 28, 44.8, 30),
  perforowana: () => { const d = []; for (let y = 27.5; y < 70; y += 3.6) for (let x = 34; x < 87; x += 2.6) d.push(`<rect x="${x}" y="${y}" width=".9" height=".9" fill="#cfe9f8" opacity=".85"/>`);
    return tlo() + okno(32, 26, 56, 60) + skrzynka(26, 8, 68, 16, 4) + prowadnice(32, 26, 56, 60) + pancerz(32.5, 26, 55, 46) + d.join(''); },
  roleta_moskitiera: () => tlo() + okno(32, 26, 56, 60) + skrzynka(26, 8, 68, 16, 4) + prowadnice(32, 26, 56, 60) + pancerz(32.5, 26, 55, 20)
    + `<rect x="32.5" y="48" width="55" height="22" fill="${u('sia')}"/><rect x="32.5" y="48" width="55" height="22" fill="#1d2329" opacity=".18"/><rect x="32.5" y="70" width="55" height="2.4" fill="${u('alu')}"/>`,
  fasadowa: k => { const d = []; for (let y = 25; y < 66; y += 4.2) d.push(`<path d="M31 ${y + 2.6}q29 -3.4 58 0v-1q-29 -3.6 -58 0z" fill="${jas(k, .25)}"/><path d="M31 ${y + 2.6}q29 -3.4 58 0v1.2q-29 -3.2 -58 0z" fill="${ciem(k, .2)}"/>`);
    return tlo() + okno(32, 26, 56, 60) + `<rect x="27" y="15" width="66" height="9" fill="${u('alu')}" filter="${u('cn')}"/>${d.join('')}<rect x="27" y="22" width="3.4" height="64" fill="${u('alup')}"/><rect x="90" y="22" width="3.4" height="64" fill="${u('alup')}"/>
      <path d="M45 24v44M75 24v44" stroke="#222" stroke-width=".45"/><rect x="30" y="68" width="60" height="3.2" fill="${u('met')}"/>`; },
  fasadowa_f80: k => { const d = []; for (let y = 25; y < 66; y += 4.2) d.push(`<rect x="31" y="${y}" width="58" height="3" fill="${u('met')}"/><path d="M31 ${y + 3}h58" stroke="${ciem(k, .5)}" stroke-width=".5"/>`);
    return tlo() + okno(32, 26, 56, 60) + cienR(27, 24, 66) + `<rect x="27" y="15" width="66" height="9" fill="${u('alu')}" filter="${u('cn')}"/>${d.join('')}<rect x="27" y="22" width="3.4" height="64" fill="${u('alup')}"/><rect x="90" y="22" width="3.4" height="64" fill="${u('alup')}"/><rect x="30" y="68" width="60" height="3.2" fill="${u('met')}"/>`; },
  fasadowaz: k => { const d = []; for (let y = 25; y < 66; y += 4.2) d.push(`<path d="M31 ${y}h58v1.8l-2 1.6H31z" fill="${jas(k, .2)}"/><path d="M31 ${y + 3.4}h56l2-1.6" stroke="${ciem(k, .45)}" stroke-width=".6" fill="none"/>`);
    return tlo() + okno(32, 26, 56, 60) + `<rect x="27" y="15" width="66" height="9" fill="${u('alu')}" filter="${u('cn')}"/>${d.join('')}<rect x="27" y="22" width="3.4" height="64" fill="${u('alup')}"/><rect x="90" y="22" width="3.4" height="64" fill="${u('alup')}"/><rect x="30" y="68" width="60" height="3.2" fill="${u('met')}"/>`; },
  screen: () => tlo() + okno(32, 26, 56, 60) + `<g filter="${u('cn')}"><rect x="27" y="12" width="66" height="13" rx="3" fill="${u('met')}"/></g>
    <rect x="32" y="25" width="56" height="44" fill="${u('tkv')}" opacity=".88"/><rect x="32" y="25" width="56" height="44" fill="${u('sia')}" opacity=".5"/>
    <rect x="27" y="25" width="5" height="61" fill="${u('metp')}"/><rect x="88" y="25" width="5" height="61" fill="${u('metp')}"/><rect x="31" y="69" width="58" height="3" fill="${u('met')}"/>
    <path d="M32 25v44M88 25v44" stroke="#111" stroke-width="1.2" stroke-dasharray=".7 .7"/>`,
  okiennice_przesuwne: k => { const dr = k, sk = x => `<rect x="${x}" y="22" width="27" height="64" fill="${dr}" stroke="${ciem(dr, .4)}" stroke-width="1"/>` + [...Array(13)].map((_, i) => `<path d="M${x + 2} ${25 + i * 4.6}h23l-1 2.4H${x + 3}z" fill="${jas(dr, .18)}"/>`).join('');
    return tlo() + okno(32, 22, 56, 64) + `<rect x="6" y="16" width="108" height="3" fill="${u('met')}"/><g filter="${u('cn')}">${sk(8)}${sk(62)}</g><path d="M8 19h106" stroke="#222" stroke-width=".5"/>`; },
  markizoleta: k => tlo() + okno(32, 26, 56, 60) + cienR(26, 26, 68) + `<g filter="${u('cn')}"><rect x="26" y="12" width="68" height="12" rx="3" fill="${u('met')}"/></g><rect x="27" y="24" width="4" height="34" fill="${u('metp')}"/><rect x="89" y="24" width="4" height="34" fill="${u('metp')}"/>
    <rect x="31" y="24" width="58" height="34" fill="${u('tkv')}" opacity=".9"/><path d="M31 58h58l12 18H19z" fill="${u('tkv')}"/>${pasyM(31, 89, 58, 76, 12, k)}<rect x="18" y="76" width="84" height="3" fill="${u('met')}"/><path d="M29 58l-10 18M91 58l10 18" stroke="${u('alup')}" stroke-width="2"/>`,
  okiennice: k => { const dr = k, sk = (x, w) => `<rect x="${x}" y="22" width="${w}" height="64" fill="${dr}" stroke="${ciem(dr, .4)}" stroke-width="1.2"/>` + [...Array(13)].map((_, i) => `<path d="M${x + 2} ${25 + i * 4.6}h${w - 4}l-1 2.4H${x + 3}z" fill="${jas(dr, .2)}"/><path d="M${x + 2} ${27.4 + i * 4.6}h${w - 4}" stroke="${ciem(dr, .45)}" stroke-width=".5"/>`).join('') + `<rect x="${x}" y="52" width="${w}" height="3" fill="${ciem(dr, .2)}"/>`;
    return tlo() + okno(32, 22, 56, 64) + `<g filter="${u('cn')}">${sk(14, 18)}${sk(88, 18)}</g><circle cx="33" cy="30" r="1" fill="#222"/><circle cx="33" cy="78" r="1" fill="#222"/><circle cx="87" cy="30" r="1" fill="#222"/><circle cx="87" cy="78" r="1" fill="#222"/>
      <path d="M32 52h8M80 52h8" stroke="#666" stroke-width="1.6"/>`; }
};

// --- okna dachowe (dach z dachówką, okno w skosie) ---
const dach = s => `<rect width="120" height="100" fill="${u('dh')}"/>${[...Array(12)].map((_, i) => `<path d="M0 ${4 + i * 8.4}h120" stroke="#5c2a1d" stroke-width="1.6"/><path d="M0 ${5.4 + i * 8.4}h120" stroke="#b9694c" stroke-width=".6"/>`).join('')}
  <path d="M28 12h64l7 80H21z" fill="#3b3f45"/><path d="M31 15h58l6 74H25z" fill="${u('rm')}"/><path d="M35 19h50l5 66H30z" fill="${u('nb')}"/><path d="M35 19h50l5 66H30z" fill="${u('bl')}"/>${s}`;
// okno dachowe od środka jak na ekspozycji Velux / Roto / Fakro: ościeże w głąb, rama ze słojami drewna lub lakierowana,
// skrzydło z cieniem, szyba z widokiem i klamka u góry; produkt rysowany na szybie z fakturą tkaniny
const oknoD = (fr, drewno) => {
  const g = `<linearGradient id="${P}od" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${jas(fr, .22)}"/><stop offset=".55" stop-color="${fr}"/><stop offset="1" stop-color="${ciem(fr, .2)}"/></linearGradient>
    <filter id="${P}sl" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .9" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .13  0 0 0 0 .02  0 0 0 .55 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
    <pattern id="${P}spl" width="1.4" height="1.4" patternUnits="userSpaceOnUse"><path d="M0 .35h1.4M.35 0v1.4" stroke="#fff" stroke-width=".35" opacity=".18"/><path d="M0 1.05h1.4M1.05 0v1.4" stroke="#000" stroke-width=".35" opacity=".14"/></pattern>`;
  const sl = drewno ? `<rect x="22" y="6" width="76" height="90" fill="#fff" filter="${u('sl')}"/>` : '';
  return tlo() + `<defs>${g}</defs><path d="M10 0h100l-12 6H22z" fill="#d5ccbf"/><path d="M10 0l12 6v90l-12 4z" fill="#e4ddd2"/><path d="M110 0l-12 6v90l12 4z" fill="#cfc6b8"/><path d="M10 100l12-4h76l12 4z" fill="#c6bdaf"/>
    <g filter="${u('cn')}"><rect x="22" y="6" width="76" height="90" fill="${u('od')}"/>${sl}<rect x="22" y="6" width="76" height="90" fill="none" stroke="${ciem(fr, .35)}" stroke-width=".6"/>
    <rect x="28" y="12" width="64" height="78" fill="${ciem(fr, .1)}"/><rect x="29" y="13" width="62" height="76" fill="${u('od')}"/>${drewno ? `<rect x="29" y="13" width="62" height="76" fill="#fff" filter="${u('sl')}"/>` : ''}</g>
    <rect x="33" y="17" width="54" height="68" fill="${u('nb')}"/><path d="M33 64q14-7 30-4t24-2V85H33z" fill="#86ad8f"/><path d="M33 74q22-5 54-1V85H33z" fill="#5e8f6b"/><rect x="33" y="17" width="54" height="68" fill="${u('bl')}"/>
    <rect x="33" y="17" width="54" height="1.6" fill="rgba(0,0,0,.25)"/><rect x="48" y="9" width="24" height="2.6" rx="1.3" fill="#d4d8dc" stroke="${CIEN}" stroke-width=".4"/>`;
};
// prowadnice boczne i belka dolna rolet wewnętrznych do okien dachowych
const prowD = (c = '#e6e7e8') => `<rect x="31" y="17" width="2.4" height="68" fill="${c}" stroke="${CIEN}" stroke-width=".3"/><rect x="86.6" y="17" width="2.4" height="68" fill="${c}" stroke="${CIEN}" stroke-width=".3"/>`;
const belkaD = (y, c = '#e6e7e8') => `<rect x="31" y="${y}" width="58" height="3.2" rx=".8" fill="${c}" stroke="${CIEN}" stroke-width=".3"/><rect x="56" y="${y + 3.2}" width="8" height="1.6" rx=".8" fill="#9aa1a9"/>`;
const SOSNA = '#d29b55', BIALA = '#f3f3f1', SZARA = '#7e858c', ORZECH = '#734322';
const DACH = {
  // zaciemniająca: granatowa tkanina na całej szybie, prowadnice, kaseta
  dach_dkl: (k, r) => oknoD(r, 0) + `<rect x="31" y="14" width="58" height="5" rx="1" fill="${r}" stroke="${CIEN}" stroke-width=".3"/>${prowD(r)}
    <rect x="33.4" y="19" width="53.2" height="52" fill="${k}"/><rect x="33.4" y="19" width="53.2" height="52" fill="url(#${P}spl)"/><path d="M33.4 19h53.2v52H33.4z" fill="${u('bl')}" opacity=".35"/>${belkaD(71, r)}`,
  // solarna zewnętrzna: kaseta z panelem fotowoltaicznym, metalowe lamele na zewnątrz, widoczna przez szybę
  dach_ssl: (k, r) => oknoD(r, 0) + `<g filter="${u('cn')}"><rect x="18" y="0" width="84" height="14" rx="1.5" fill="${u('met')}"/><rect x="24" y="2" width="72" height="8.4" fill="#0f1d36"/>
    ${[...Array(12)].map((_, i) => `<path d="M${24 + i * 6} 2v8.4" stroke="#3d5d8f" stroke-width=".45"/>`).join('')}<path d="M24 6.2h72" stroke="#3d5d8f" stroke-width=".45"/><path d="M24 2l20 8.4" stroke="#fff" stroke-width="1.2" opacity=".18"/></g>
    ${[...Array(12)].map((_, i) => `<rect x="33" y="${17 + i * 3.6}" width="54" height="3.6" fill="${u('met')}"/><path d="M33 ${20.6 + i * 3.6}h54" stroke="#1f2226" stroke-width=".5"/>`).join('')}<rect x="33" y="60" width="54" height="2.4" fill="#2a2d31"/>`,
  // rzymska: lniane fałdy z cieniem między nimi
  dach_fhb: (k, r) => { const len = k;
    return oknoD(r, 0) + `<rect x="31" y="14" width="58" height="4" rx="1" fill="${r}"/><rect x="32" y="18" width="56" height="14" fill="${len}"/><rect x="32" y="18" width="56" height="14" fill="url(#${P}spl)"/>
    ${[0, 1, 2, 3].map(i => `<path d="M32 ${32 + i * 6}q28 ${6 - i} 56 0v-6.4q-28 ${5 - i} -56 0z" fill="${ciem(len, .05 + i * .06)}"/><path d="M32 ${32 + i * 6}q28 ${6 - i} 56 0v-6.4q-28 ${5 - i} -56 0z" fill="url(#${P}spl)"/>
      <path d="M32 ${32 + i * 6}q28 ${6 - i} 56 0" stroke="${jas(len, .35)}" stroke-width=".8" fill="none"/><path d="M32 ${33.2 + i * 6}q28 ${5 - i} 56 0" stroke="rgba(0,0,0,.25)" stroke-width=".8" fill="none"/>`).join('')}`; },
  // markiza solarna: siatka na zewnątrz, odsunięta od szyby na ramionach, panel w kasecie
  dach_msl: (k, r) => oknoD(r, 0) + `<path d="M33 17h54v40H33z" fill="#000" opacity=".22"/><g filter="${u('cn')}"><rect x="16" y="0" width="88" height="8" rx="2" fill="#2a2d31"/><rect x="20" y="1.6" width="26" height="4.4" fill="#0f1d36"/>${[...Array(5)].map((_, i) => `<path d="M${20 + i * 5.2} 1.6v4.4" stroke="#3d5d8f" stroke-width=".4"/>`).join('')}
    <path d="M20 8h80l10 40H10z" fill="${k}" opacity=".86"/><path d="M20 8h80l10 40H10z" fill="${u('sia')}"/><rect x="9" y="48" width="102" height="3" rx="1" fill="#2a2d31"/></g><path d="M18 8L9 48M102 8l9 40" stroke="#3a3e43" stroke-width="2.4"/>`,
  // żaluzja: białe lamele 3D z drabinkami
  dach_pal: (k, r) => oknoD(r, 0) + `<rect x="31" y="14" width="58" height="4" rx="1" fill="${u('alu')}"/>${prowD(r)}${[...Array(19)].map((_, i) => `<path d="M33.4 ${18.6 + i * 3.4}h53.2l-1 2.2H34.4z" fill="${k}"/><path d="M34.4 ${20.8 + i * 3.4}h51.2" stroke="#a9adb2" stroke-width=".55"/><path d="M33.4 ${18.6 + i * 3.4}h53.2" stroke="#fff" stroke-width=".4"/>`).join('')}
    <path d="M46 18v66M74 18v66" stroke="#d9d9d9" stroke-width=".5"/>${belkaD(82, r)}`,
  // plisowana: kremowa plisa w środku szyby, wyraźny zygzak i linki
  dach_fhl: (k, r) => { const c = k; return oknoD(r, 0) + prowD(r) + belkaD(36, r) + [...Array(11)].map((_, i) => `<path d="M33.4 ${39.2 + i * 2.8}h53.2v1.4H33.4z" fill="${c}"/><path d="M33.4 ${40.6 + i * 2.8}h53.2v1.4H33.4z" fill="${ciem(c, .14)}"/>`).join('')
    + `<path d="M34.6 39.2${[...Array(11)].map((_, i) => `l${i % 2 ? 1.2 : -1.2} 2.8`).join('')}M85.4 39.2${[...Array(11)].map((_, i) => `l${i % 2 ? -1.2 : 1.2} 2.8`).join('')}" stroke="${ciem(c, .35)}" stroke-width=".5" fill="none"/>
    <path d="M44 39v31M76 39v31" stroke="#9b968c" stroke-width=".3"/>${belkaD(70, r)}`; },
  // dzień/noc w kasecie: pasy pełne i przezroczyste w dwóch warstwach
  dach_dn: (k, r) => { const c = k; return oknoD(r, 0) + `<rect x="31" y="13" width="58" height="6.4" rx="1.6" fill="${u('alu')}" filter="${u('cn')}"/>${prowD(r)}`
    + [...Array(7)].map((_, i) => `<rect x="33.4" y="${19.4 + i * 7.6}" width="53.2" height="4.2" fill="${c}"/><rect x="33.4" y="${19.4 + i * 7.6}" width="53.2" height="4.2" fill="url(#${P}spl)"/><rect x="33.4" y="${23.6 + i * 7.6}" width="53.2" height="3.4" fill="#fff" opacity=".35"/>`).join('') + belkaD(72, r); },
  dachowa: () => dach(`<g filter="${u('cn')}"><path d="M29 7h62l2 9H27z" fill="${u('met')}"/></g><path d="M33 16h54l3.8 46H29.2z" fill="${u('lam')}"/><path d="M29.2 62h61.6l.4 3H28.8z" fill="${u('met')}"/>
    <path d="M33 16l-3.8 46M87 16l3.8 46" stroke="#2a2d31" stroke-width="2.2"/>`),
  markizeta_dach: () => dach(`<path d="M30 13h60v4H30z" fill="${u('alu')}"/><path d="M33 17h54l4 50H29z" fill="${u('tkv')}" opacity=".85"/><path d="M33 17h54l4 50H29z" fill="${u('sia')}" opacity=".6"/><path d="M28.6 67h62.8v2.6H28.6z" fill="${u('alu')}"/>`),
  dachowa_plisa: k => `<rect width="120" height="100" fill="#f1ece4"/><path d="M0 0h120v20L0 34z" fill="#e3dccf"/><path d="M26 10h68l9 84H17z" fill="#d6cdbe"/><path d="M30 14h60l8 76H22z" fill="${u('rm')}" filter="${u('cn')}"/><path d="M34 18h52l7 68H27z" fill="${u('nb')}"/>
    ${[...Array(14)].map((_, i) => `<path d="M${33.6 - i * .26} ${30 + i * 2.6}h${52.8 + i * .52}l-.1 1.3H${33.5 - i * .26}z" fill="${jas(k, .2)}"/><path d="M${33.4 - i * .26} ${31.3 + i * 2.6}h${53.2 + i * .52}" stroke="${ciem(k, .25)}" stroke-width="1.2"/>`).join('')}
    <path d="M33 28h54v2H33z" fill="${u('alu')}"/><path d="M29.6 66.4h60.8v2.4H29.6z" fill="${u('alu')}"/><path d="M32 18l-4.6 68M88 18l4.6 68" stroke="#9aa1a9" stroke-width="1.6"/>`,
  dachowa_zaluzja: k => `<rect width="120" height="100" fill="#f1ece4"/><path d="M0 0h120v20L0 34z" fill="#e3dccf"/><path d="M26 10h68l9 84H17z" fill="#d6cdbe"/><path d="M30 14h60l8 76H22z" fill="${u('rm')}" filter="${u('cn')}"/><path d="M34 18h52l7 68H27z" fill="${u('nb')}"/>
    ${[...Array(19)].map((_, i) => `<path d="M${34 - i * .37} ${20 + i * 3.4}h${52 + i * .74}l-.6 1.8H${34.6 - i * .37}z" fill="${jas(k, .35)}"/><path d="M${34.6 - i * .37} ${21.8 + i * 3.4}h${50.8 + i * .74}" stroke="${ciem(k, .3)}" stroke-width=".4"/>`).join('')}
    <path d="M32 18l-4.6 68M88 18l4.6 68" stroke="#9aa1a9" stroke-width="1.6"/>`,
  dachowa_wew: () => `<rect width="120" height="100" fill="#f1ece4"/><path d="M0 0h120v20L0 34z" fill="#e3dccf"/><path d="M26 10h68l9 84H17z" fill="#d6cdbe"/><path d="M30 14h60l8 76H22z" fill="${u('rm')}" filter="${u('cn')}"/><path d="M34 18h52l7 68H27z" fill="${u('nb')}"/>
    <path d="M34 18h52l3.6 36H30.4z" fill="${u('tk')}"/><path d="M30 54h60v3H30z" fill="${u('alu')}"/><path d="M32 18l-4.6 68M88 18l4.6 68" stroke="#9aa1a9" stroke-width="1.6"/>`
};

// --- taras i ogród (elewacja domu, drzwi tarasowe, kostka) ---
const elewacja = (niebo = false) => `<rect width="120" height="100" fill="${niebo ? '#cfe8f6' : u('tyn')}"/>${niebo ? `<rect width="120" height="62" fill="${u('nb')}"/>` : ''}
  <path d="M0 80h120v20H0z" fill="${u('ks')}"/>${[...Array(9)].map((_, i) => `<path d="M${i * 15 - 6} 100l${8 + i} -20" stroke="#7d766b" stroke-width=".6"/>`).join('')}<path d="M0 86h120M0 93h120" stroke="#7d766b" stroke-width=".5"/>`;
const drzwi = (x = 34, w = 52) => `<rect x="${x}" y="40" width="${w}" height="40" fill="${u('rm')}"/><rect x="${x + 2}" y="42" width="${w / 2 - 3}" height="38" fill="${u('nb')}"/><rect x="${x + w / 2 + 1}" y="42" width="${w / 2 - 3}" height="38" fill="${u('nb')}"/><rect x="${x + 2}" y="42" width="${w - 4}" height="38" fill="${u('bl')}"/>`;
const pasyM = (x1, x2, y1, y2, d, k) => [...Array(10)].map((_, i) => `<path d="M${x1 + i * (x2 - x1) / 10} ${y1}L${x1 - d + i * (x2 - x1 + 2 * d) / 10} ${y2}" stroke="${ciem(k, .2)}" stroke-width=".5"/>`).join('');
const balustrada = () => `<rect x="0" y="62" width="120" height="3" fill="#8a8f96"/>${[...Array(14)].map((_, i) => `<path d="M${4 + i * 8.5} 65v15" stroke="#8a8f96" stroke-width="1.4"/>`).join('')}`;
const TARAS = {
  markiza: k => elewacja() + drzwi() + cienR(4, 58, 112, 12) + `<g filter="${u('cn')}"><rect x="12" y="16" width="96" height="7" rx="3.5" fill="${u('alu')}"/></g><path d="M14 23h92l10 28H4z" fill="${u('tkv')}"/>${pasyM(14, 106, 23, 51, 10, k)}
    <path d="M4 51h112v4H4z" fill="${ciem(k, .15)}"/>${[...Array(19)].map((_, i) => `<path d="M${4 + i * 6} 55q3 3 6 0" fill="${ciem(k, .15)}"/>`).join('')}
    <path d="M26 23l14 20 10 -16M94 23l-14 20-10 -16" stroke="#e1e4e8" stroke-width="1.8" fill="none" opacity=".85"/><path d="M4 82h112" stroke="rgba(0,0,0,.12)" stroke-width="8"/>`,
  markiza_otwarta: k => elewacja() + drzwi() + cienR(4, 56, 112, 12) + `<g filter="${u('cn')}"><rect x="12" y="14" width="96" height="3" fill="${u('alu')}"/><rect x="14" y="17" width="92" height="6" rx="3" fill="${u('tk')}"/><rect x="14" y="17" width="92" height="2" rx="1" fill="#fff" opacity=".25"/></g>
    <path d="M14 23h92l10 28H4z" fill="${u('tkv')}"/>${pasyM(14, 106, 23, 51, 10, k)}<rect x="4" y="51" width="112" height="3" rx="1" fill="${u('alu')}"/><path d="M26 23l14 20 10 -16M94 23l-14 20-10 -16" stroke="#e1e4e8" stroke-width="1.8" fill="none" opacity=".85"/>`,
  markiza_polkasetowa: k => elewacja() + drzwi() + cienR(4, 56, 112, 12) + `<g filter="${u('cn')}"><path d="M10 12h100v6l-4 6H14l-4-6z" fill="${u('alu')}"/></g><rect x="14" y="20" width="92" height="5" rx="2.5" fill="${u('tk')}"/>
    <path d="M14 24h92l10 27H4z" fill="${u('tkv')}"/>${pasyM(14, 106, 24, 51, 10, k)}<rect x="4" y="51" width="112" height="3.4" rx="1" fill="${u('alu')}"/>`,
  markiza_volant: k => elewacja() + drzwi() + `<g filter="${u('cn')}"><path d="M10 12h100v9l-5 4H15l-5-4z" fill="${u('alu')}"/></g><path d="M15 25h90l10 22H5z" fill="${u('tkv')}"/>${pasyM(15, 105, 25, 47, 10, k)}
    <rect x="4" y="47" width="112" height="4" rx="1.2" fill="${u('alu')}"/><rect x="6" y="51" width="108" height="16" fill="${u('tk')}" opacity=".92"/><rect x="6" y="51" width="108" height="16" fill="${u('sia')}" opacity=".3"/><rect x="6" y="67" width="108" height="2" fill="${u('alu')}"/>`,
  markiza_wolnostojaca: k => `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 58q30-8 60-4t60-2V100H0z" fill="#7da889"/><path d="M0 74q40-6 120-2V100H0z" fill="#5e8f6b"/>
    <g filter="${u('cn')}"><rect x="56" y="14" width="8" height="8" rx="2" fill="${u('alu')}"/><path d="M60 22L14 40h92z" fill="${u('tkv')}"/></g>${pasyM(58, 62, 22, 40, 46, k)}<rect x="12" y="40" width="96" height="3" rx="1" fill="${u('alu')}"/>
    <rect x="22" y="40" width="3" height="44" fill="${u('alup')}"/><rect x="95" y="40" width="3" height="44" fill="${u('alup')}"/><rect x="58.5" y="22" width="3" height="62" fill="${u('alup')}"/><path d="M16 85h88" stroke="rgba(0,0,0,.2)" stroke-width="3"/>`,
  markiza_koszowa: k => elewacja() + `<rect x="36" y="38" width="48" height="42" fill="${u('rm')}"/><rect x="38" y="40" width="44" height="40" fill="${u('nb')}"/><rect x="38" y="40" width="44" height="40" fill="${u('bl')}"/>` + cienR(28, 52, 64, 10)
    + `<g filter="${u('cn')}"><path d="M28 50V34a32 22 0 0 1 64 0v16z" fill="${u('tkv')}"/></g>${[0, 1, 2, 3, 4].map(i => `<path d="M60 12q${-32 + i * 16} 6 ${-32 + i * 16} 38" stroke="${ciem(k, .3)}" stroke-width=".8" fill="none"/>`).join('')}
    <path d="M28 50h64" stroke="${ciem(k, .3)}" stroke-width="1.6"/>${[...Array(11)].map((_, i) => `<path d="M${28 + i * 5.8} 50q2.9 3 5.8 0" fill="${ciem(k, .15)}"/>`).join('')}`,
  markiza_zimowa: k => elewacja(true) + `<path d="M0 30h22v52H0z" fill="${u('tyn')}"/><path d="M22 30l90 18v34H22z" fill="#d6ecf7" opacity=".55"/>${[0, 1, 2, 3, 4].map(i => `<path d="M${22 + i * 22.5} ${30 + i * 4.5}v${52 - i * 4.5}" stroke="#eef0f2" stroke-width="1.6"/>`).join('')}
    <g filter="${u('cn')}"><path d="M22 26l90 18v4L22 30z" fill="${u('alu')}"/><path d="M24 28.4l86 17.2-8 -1.6-78 -15.6z" fill="${u('tk')}"/><path d="M22 30.4l84 16.8 0 2.4-84-16.8z" fill="${u('tk')}"/></g><path d="M112 44v40" stroke="${u('alup')}" stroke-width="3"/>`,
  markiza_kasetowa: k => elewacja() + drzwi() + `<g filter="${u('cn')}"><path d="M10 13h100v9l-5 4H15l-5-4z" fill="${u('alu')}"/></g><path d="M15 26h90l10 26H5z" fill="${u('tkv')}"/>${pasyM(15, 105, 26, 52, 10, k)}
    <rect x="4" y="52" width="112" height="4.4" rx="1.2" fill="${u('alu')}"/><path d="M4 82h112" stroke="rgba(0,0,0,.12)" stroke-width="8"/>`,
  markizeta: k => elewacja() + `<rect x="36" y="36" width="48" height="40" fill="${u('rm')}"/><rect x="38" y="38" width="44" height="38" fill="${u('nb')}"/><rect x="38" y="38" width="44" height="38" fill="${u('bl')}"/>
    <g filter="${u('cn')}"><rect x="34" y="28" width="52" height="6" rx="2" fill="${u('alu')}"/></g><path d="M35 34h50l9 20H26z" fill="${u('tkv')}"/>${pasyM(35, 85, 34, 54, 9, k)}<rect x="25" y="54" width="70" height="3" fill="${u('alu')}"/>
    <path d="M37 64l-11-10M83 64l11-10" stroke="#9aa1a9" stroke-width="1.8"/><circle cx="37" cy="64" r="1.6" fill="#555"/><circle cx="83" cy="64" r="1.6" fill="#555"/>`,
  markiza_balkonowa: k => elewacja(true) + balustrada()
    + `<rect x="16.3" y="6" width="3.4" height="76" fill="${u('alup')}"/><rect x="100.3" y="6" width="3.4" height="76" fill="${u('alup')}"/><rect x="16" y="14" width="88" height="5" rx="2" fill="${u('alu')}"/><path d="M18 19h84l10 20H8z" fill="${u('tkv')}"/>${pasyM(18, 102, 19, 39, 10, k)}<rect x="8" y="39" width="104" height="3" fill="${ciem(k, .15)}"/>`,
  markiza_pionowa: () => elewacja(true) + balustrada()
    + `<g filter="${u('cn')}"><rect x="18" y="8" width="84" height="7" rx="3.5" fill="${u('alu')}"/></g><rect x="20" y="15" width="80" height="50" fill="${u('tk')}"/><rect x="19" y="65" width="82" height="3.4" rx="1.4" fill="${u('alu')}"/><path d="M23 68l-2 8M97 68l2 8" stroke="#555" stroke-width=".8"/>`,
  markiza_boczna: () => elewacja(true) + `<rect x="0" y="10" width="16" height="70" fill="${u('tyn')}"/><g filter="${u('cn')}"><rect x="14" y="22" width="7" height="56" rx="3.5" fill="${u('alu')}"/></g>
    <path d="M21 26h82v46H21z" fill="${u('tk')}"/><rect x="101" y="24" width="4.4" height="54" rx="1" fill="${u('alu')}"/><path d="M99 79h10" stroke="#333" stroke-width="2"/>`,
  pergola: k => elewacja(true) + `<g filter="${u('cn')}"><path d="M6 24h108v6H6z" fill="${u('alu')}"/></g>${[...Array(14)].map((_, i) => `<path d="M${9 + i * 7.6} 30l3.4 7" stroke="${jas(k, .3)}" stroke-width="2.4"/><path d="M${10.5 + i * 7.6} 30l3.4 7" stroke="${ciem(k, .3)}" stroke-width=".8"/>`).join('')}
    <path d="M8 30h104l-2 8H10z" fill="${ciem(k, .2)}" opacity=".45"/><rect x="9" y="30" width="6" height="52" fill="${u('alup')}"/><rect x="105" y="30" width="6" height="52" fill="${u('alup')}"/><rect x="15" y="38" width="90" height="42" fill="#e8f2f7" opacity=".25"/>
    <path d="M4 83h112" stroke="rgba(0,0,0,.15)" stroke-width="4"/>`,
  pergola_tkanina: k => elewacja(true) + `<g filter="${u('cn')}"><path d="M6 24h108v6H6z" fill="${u('alu')}"/></g>${[...Array(6)].map((_, i) => `<path d="M${10 + i * 17} 30q8.5 7 17 0" fill="${jas(k, i % 2 ? .1 : .25)}" stroke="${ciem(k, .25)}" stroke-width=".5"/>`).join('')}
    <rect x="9" y="30" width="6" height="52" fill="${u('alup')}"/><rect x="105" y="30" width="6" height="52" fill="${u('alup')}"/><rect x="15" y="40" width="90" height="40" fill="#e8f2f7" opacity=".2"/><path d="M4 83h112" stroke="rgba(0,0,0,.15)" stroke-width="4"/>`,
  zagiel: k => `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 66q40-6 120-2V100H0z" fill="#7da889"/><rect y="80" width="120" height="20" fill="${u('ks')}"/>
    <rect x="6" y="14" width="3" height="70" fill="${u('alup')}"/><rect x="110" y="24" width="3" height="60" fill="${u('alup')}"/><rect x="58" y="10" width="3" height="74" fill="${u('alup')}"/>
    <g filter="${u('cn')}"><path d="M8 18L60 12L111 28L60 40z" fill="${u('tkv')}"/><path d="M8 18q26 10 52 22q26-6 51-12" stroke="${ciem(k, .25)}" stroke-width=".7" fill="none"/></g><rect x="4" y="16" width="7" height="5" rx="2" fill="#333"/>`,
  parasol: k => `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 66q40-6 120-2V100H0z" fill="#7da889"/><rect y="82" width="120" height="18" fill="${u('ks')}"/>
    <g filter="${u('cn')}"><path d="M10 34Q60 0 110 34z" fill="${u('tkv')}"/>${[...Array(8)].map((_, i) => `<path d="M60 14L${10 + i * 14.3} 34" stroke="${ciem(k, .25)}" stroke-width=".8"/>`).join('')}${[...Array(8)].map((_, i) => `<path d="M${10 + i * 12.5} 34q3.1 3 6.2 0" fill="${ciem(k, .15)}"/>`).join('')}</g>
    <rect x="58.6" y="14" width="2.8" height="68" fill="${u('alup')}"/><path d="M44 86h32l-4-4H48z" fill="#555"/><rect x="56" y="58" width="8" height="6" rx="1" fill="#333"/>`,
  zadaszenie: () => elewacja() + drzwi() + `<path d="M6 20h108l-10 16H16z" fill="#d6ecf7" opacity=".85"/><path d="M6 20h108l-10 16H16z" fill="${u('tkv')}" opacity=".55"/>${[...Array(7)].map((_, i) => `<path d="M${8 + i * 17.3} 20l${5 - i * 1.6} 16" stroke="#c3c8ce" stroke-width="1.6"/>`).join('')}
    <rect x="15" y="36" width="90" height="2.6" fill="${u('alu')}"/><rect x="17" y="38" width="3.4" height="44" fill="${u('alup')}"/><rect x="100" y="38" width="3.4" height="44" fill="${u('alup')}"/>`,
  screen_taras: () => elewacja() + drzwi() + `<g filter="${u('cn')}"><rect x="6" y="20" width="108" height="7" rx="2" fill="${u('alu')}"/></g><rect x="6" y="27" width="5" height="55" fill="${u('alup')}"/><rect x="109" y="27" width="5" height="55" fill="${u('alup')}"/>
    <rect x="11" y="27" width="98" height="40" fill="${u('tkv')}" opacity=".85"/><rect x="11" y="27" width="98" height="40" fill="${u('sia')}" opacity=".45"/><rect x="11" y="67" width="98" height="3" fill="${u('alu')}"/>`
};

// --- okna i świetliki z napędem ---
const OKNA = {
  okno_silownik: () => tlo() + `<path d="M27 13h66l-5 5H32v68l-5 5z" fill="#cfc6b8"/><rect x="32" y="18" width="56" height="68" fill="${u('rm')}"/><rect x="36" y="22" width="48" height="60" fill="#5c6670"/>
    <g filter="${u('cn')}"><path d="M35 21h50l6 52H29z" fill="${u('rm')}"/><path d="M39 25h42l5 44H34z" fill="${u('nb')}"/><path d="M39 25h42l5 44H34z" fill="${u('bl')}"/></g>
    <rect x="52" y="78" width="16" height="5" rx="1" fill="#9aa1a9"/><path d="M60 78v-8" stroke="#555" stroke-width="2" stroke-dasharray="1.2 .6"/><path d="M25 86h70l-2 4H27z" fill="#f4f2ee"/>`,
  okno_dachowe: () => `<rect width="120" height="100" fill="${u('dh')}"/>${[...Array(12)].map((_, i) => `<path d="M0 ${4 + i * 8.4}h120" stroke="#5c2a1d" stroke-width="1.6"/><path d="M0 ${5.4 + i * 8.4}h120" stroke="#b9694c" stroke-width=".6"/>`).join('')}
    <path d="M28 20h64l7 72H21z" fill="${u('rm')}"/><path d="M32 24h56l6 64H26z" fill="#25282c"/><g filter="${u('cn')}"><path d="M30 8h60l8 60H22z" fill="${u('rm')}"/><path d="M34 12h52l6.6 52H27.4z" fill="${u('nb')}"/><path d="M34 12h52l6.6 52H27.4z" fill="${u('bl')}"/></g>
    <path d="M60 68v14" stroke="#9aa1a9" stroke-width="2.4"/>`,
  okno_plaskie: () => `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 50h120v50H0z" fill="#8f949a"/>${[...Array(6)].map((_, i) => `<path d="M0 ${58 + i * 7}h120" stroke="#9ea3a8" stroke-width=".4"/>`).join('')}
    <path d="M26 62h68l-4 18H30z" fill="${u('rm')}" stroke="${CIEN}"/><g filter="${u('cn')}"><path d="M30 60l34 -18 32 14 -2 4z" fill="${u('rm')}"/><path d="M33 59l31 -15 28 12.4z" fill="${u('nb')}"/><path d="M33 59l31 -15 28 12.4z" fill="${u('bl')}"/></g><path d="M58 62l4 -14" stroke="#555" stroke-width="2"/>`,
  wylaz: () => dach(`<path d="M34 30h52l6 48H28z" fill="#2c2f33"/><g filter="${u('cn')}"><path d="M34 30h52l-6 -22H40z" fill="${u('rm')}"/><path d="M37 28h46l-5 -18H42z" fill="${u('rm')}"/></g><path d="M48 30l-4 -16" stroke="#9aa1a9" stroke-width="2"/><path d="M40 34h40M40 42h40M40 50h40M40 58h40M40 66h40" stroke="#777" stroke-width="1.4"/>`),
  swietlik: () => `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 52h120v48H0z" fill="#8f949a"/><path d="M0 52h120" stroke="#6d7277" stroke-width="1.4"/>${[...Array(6)].map((_, i) => `<path d="M0 ${60 + i * 7}h120" stroke="#9ea3a8" stroke-width=".4"/>`).join('')}
    <path d="M28 70h64l-6 12H34z" fill="${u('rm')}" stroke="${CIEN}"/><g filter="${u('cn')}"><path d="M34 70q26 -46 58 -18z" fill="#dcecf6" opacity=".9"/><path d="M34 70q26 -46 58 -18" stroke="#fff" stroke-width="2" fill="none"/></g>
    <path d="M44 72l18 -16" stroke="#555" stroke-width="2.2"/><path d="M40 47q12 -10 24 -6" stroke="#fff" stroke-width="1.6" opacity=".8" fill="none"/>`
};

// --- moskitiery ---
const MOSK = {
  moskitiera_plisa_okno: () => tlo() + okno(32, 18, 56, 66) + `<rect x="31" y="18" width="3" height="66" fill="${u('rm')}"/><rect x="86" y="18" width="3" height="66" fill="${u('rm')}"/><rect x="31" y="16" width="58" height="3" fill="${u('rm')}"/>
    <rect x="34" y="19" width="34" height="64" fill="${u('sia')}"/>${[...Array(9)].map((_, i) => `<path d="M${68 + (i % 2) * 1.6} ${19 + i * 7.1}l${i % 2 ? -1.6 : 1.6} 7.1" stroke="#9aa1a9" stroke-width="1.6"/>`).join('')}<rect x="66" y="19" width="2.6" height="64" fill="${u('rm')}"/>`,
  moskitiera_zip_drzwi: () => tlo() + `<rect x="30" y="4" width="60" height="8" rx="2" fill="${u('rm')}" filter="${u('cn')}"/><rect x="30" y="12" width="4" height="80" fill="${u('rm')}"/><rect x="86" y="12" width="4" height="80" fill="${u('rm')}"/>
    <rect x="34" y="12" width="52" height="80" fill="${u('nb')}"/><rect x="34" y="12" width="52" height="56" fill="${u('sia')}"/><rect x="34" y="12" width="52" height="56" fill="#1d2329" opacity=".12"/><rect x="34" y="68" width="52" height="2.6" fill="${u('rm')}"/><rect x="24" y="92" width="72" height="4" fill="#f4f2ee"/>
    <path d="M34 12v56M86 12v56" stroke="#333" stroke-width=".9" stroke-dasharray=".7 .7"/>`,
  moskitiera: () => tlo() + okno(32, 18, 56, 66) + `<g filter="${u('cn')}"><rect x="29" y="12" width="62" height="7" rx="2" fill="${u('rm')}"/></g><rect x="29" y="19" width="3" height="65" fill="${u('rm')}"/><rect x="88" y="19" width="3" height="65" fill="${u('rm')}"/>
    <rect x="32" y="19" width="56" height="44" fill="${u('sia')}"/><rect x="32" y="19" width="56" height="44" fill="#1d2329" opacity=".12"/><rect x="32" y="63" width="56" height="3" fill="${u('rm')}"/>`,
  moskitiera_drzwi: () => tlo() + `<rect x="33" y="8" width="54" height="80" fill="${u('rm')}" filter="${u('cn')}"/><rect x="37" y="12" width="46" height="76" fill="${u('nb')}"/><rect x="37" y="12" width="46" height="76" fill="${u('bl')}"/>
    <rect x="37" y="12" width="28" height="76" fill="${u('sia')}"/>${[...Array(10)].map((_, i) => `<path d="M${65 + (i % 2) * 2} ${12 + i * 7.6}l${i % 2 ? -2 : 2} 7.6" stroke="#9aa1a9" stroke-width="1.8"/>`).join('')}<rect x="62" y="12" width="3" height="76" fill="${u('alup')}"/><rect x="28" y="88" width="64" height="4" fill="#f4f2ee"/>`
};

// --- bramy i garaże ---
const plac = () => `<rect width="120" height="100" fill="${u('nb')}"/><path d="M0 70q30-8 60-3t60-4V80H0z" fill="#7da889"/><rect y="80" width="120" height="20" fill="${u('ks')}"/>`;
const sztachety = (x, y, w, h) => `<rect x="${x}" y="${y + 4}" width="${w}" height="3" fill="${u('alu')}"/><rect x="${x}" y="${y + h - 7}" width="${w}" height="3" fill="${u('alu')}"/>` + [...Array(Math.floor(w / 4.5))].map((_, i) => `<rect x="${x + 1 + i * 4.5}" y="${y}" width="3" height="${h}" fill="${u('metp')}"/>`).join('');
const garaz = s => `<rect width="120" height="100" fill="${u('tyn')}"/><rect y="88" width="120" height="12" fill="${u('ks')}"/><rect x="14" y="18" width="92" height="70" fill="${u('rm')}"/><path d="M14 18h92l-4 4H18v66l-4 0z" fill="#000" opacity=".15"/>${s}`;
const slupek = x => `<rect x="${x}" y="36" width="10" height="46" fill="#b4ada1"/><rect x="${x - 1}" y="33" width="12" height="3.4" fill="#8f887c"/><rect x="${x + 7}" y="36" width="3" height="46" fill="rgba(0,0,0,.12)"/>`;
const BRAMY = {
  przesuwna: k => plac() + slupek(0) + slupek(110) + `<g filter="${u('cn')}">${sztachety(10, 44, 78, 36)}</g><circle cx="20" cy="81" r="2.4" fill="#333"/><circle cx="78" cy="81" r="2.4" fill="#333"/>
    <path d="M90 62h16" stroke="${k}" stroke-dasharray="3 2" stroke-width="1.2"/><path d="M104 59l3 3-3 3" stroke="${k}" fill="none"/>`,
  skrzydlowa: () => plac() + slupek(2) + slupek(108) + `<g filter="${u('cn')}">${sztachety(13, 44, 46, 36)}${sztachety(61, 44, 46, 36)}</g>`,
  segmentowa: k => garaz([...Array(4)].map((_, i) => `<rect x="18" y="${22 + i * 16.5}" width="84" height="16" fill="${u('met')}"/><path d="M18 ${38 + i * 16.5}h84" stroke="${ciem(k, .5)}" stroke-width=".8"/>${[...Array(3)].map((_, j) => `<path d="M20 ${26 + i * 16.5 + j * 4}h80" stroke="${jas(k, .2)}" stroke-width=".5"/>`).join('')}`).join('') + `<rect x="55" y="80" width="10" height="2" rx="1" fill="#333"/>`),
  uchylna: k => garaz(`<rect x="18" y="22" width="84" height="66" fill="${u('met')}"/>${[...Array(14)].map((_, i) => `<path d="M${22 + i * 6} 24v62" stroke="${ciem(k, .3)}" stroke-width=".9"/><path d="M${23 + i * 6} 24v62" stroke="${jas(k, .25)}" stroke-width=".4"/>`).join('')}<rect x="54" y="52" width="12" height="3" rx="1.5" fill="#333"/>`),
  furtka: () => plac() + `<rect x="0" y="44" width="38" height="38" fill="${u('ks')}" opacity=".0"/>` + `<rect x="30" y="34" width="10" height="48" fill="#b4ada1"/><rect x="80" y="34" width="10" height="48" fill="#b4ada1"/><g filter="${u('cn')}">${sztachety(41, 42, 38, 40)}</g>
    <rect x="72" y="60" width="5" height="3" rx="1" fill="#222"/><rect x="82.5" y="48" width="5" height="7" rx="1" fill="#333"/><circle cx="85" cy="51" r="1.2" fill="#4caf50"/>${sztachety(0, 46, 29, 36)}${sztachety(91, 46, 29, 36)}`,
  garaz_skrzydlowa: k => garaz(`<rect x="18" y="22" width="42" height="66" fill="${u('met')}"/><rect x="60" y="22" width="42" height="66" fill="${u('met')}"/><path d="M60 22v66" stroke="${ciem(k, .5)}" stroke-width="1"/>
    ${[...Array(7)].map((_, i) => `<path d="M${22 + i * 5.6} 24v62M${64 + i * 5.6} 24v62" stroke="${ciem(k, .3)}" stroke-width=".8"/>`).join('')}<rect x="55" y="52" width="2" height="8" rx="1" fill="#222"/><rect x="63" y="52" width="2" height="8" rx="1" fill="#222"/>`),
  garaz_boczna: k => garaz([...Array(10)].map((_, i) => `<rect x="${18 + i * 6}" y="22" width="5.6" height="66" fill="${u('metp')}"/>`).join('') + `<path d="M78 22v66" stroke="#222" stroke-width=".8"/><rect x="78" y="22" width="24" height="66" fill="#2d3035"/><rect x="18" y="20" width="84" height="2" fill="#555"/>
    <path d="M84 54h12M93 51l3 3-3 3" stroke="#ff9800" stroke-width="1" fill="none"/>`),
  szlaban: () => plac() + `<rect x="10" y="50" width="12" height="32" rx="1.5" fill="${u('met')}" filter="${u('cn')}"/><rect x="12" y="54" width="8" height="2" fill="#ffb300"/>
    <g filter="${u('cn')}"><rect x="20" y="54" width="94" height="4" rx="2" fill="${u('alu')}"/>${[...Array(8)].map((_, i) => `<rect x="${26 + i * 11}" y="54" width="5.5" height="4" fill="#e53935"/>`).join('')}</g><rect x="108" y="58" width="2" height="24" fill="#888"/>`,
  roletowa: () => garaz(`<g filter="${u('cn')}"><rect x="14" y="10" width="92" height="12" fill="${u('met')}"/></g><rect x="16" y="22" width="4" height="66" fill="${u('metp')}"/><rect x="100" y="22" width="4" height="66" fill="${u('metp')}"/>${pancerz(20, 22, 80, 64)}`)
};

// grupy rodzajów w kreatorze; NOWE – rodzaje dodane w 2.2.7
export const GRUPY_KAFLI = [
  ['wew', [['rolety', ['pelna', 'kasetowa', 'zebra', 'zaciemniajaca', 'roleta_zip_wew', 'bambusowa']], ['plisy', ['plisa', 'plisa_gora_dol', 'plaster', 'rzymska']], ['zaluzje', ['zaluzja', 'drewniana']], ['pionowe', ['pionowa', 'panel', 'zaslona', 'zaslona_wave', 'firana']], ['ekrany', ['ekran']]]],
  ['zew', [['zrolety', ['natynkowa', 'natynkowa_okragla', 'podtynkowa', 'zewnetrzna', 'adaptacyjna', 'perforowana', 'roleta_moskitiera', 'ekstrudowana', 'roleta_drzwi']], ['fasadowe', ['fasadowa', 'fasadowaz', 'fasadowa_f80']], ['zscreen', ['screen', 'markizoleta']], ['okiennice', ['okiennice', 'okiennice_przesuwne']]]],
  ['dach', [['dachowe', ['dach_dkl', 'dach_ssl', 'dachowa', 'dach_fhb', 'dach_msl', 'markizeta_dach', 'dach_pal', 'dach_fhl', 'dach_dn']]]],
  ['taras', [['markizy', ['markiza_otwarta', 'markiza', 'markiza_polkasetowa', 'markiza_kasetowa', 'markiza_volant', 'markiza_koszowa', 'markiza_wolnostojaca', 'markiza_zimowa', 'markizeta', 'markiza_balkonowa', 'markiza_pionowa', 'markiza_boczna']], ['pergole', ['zagiel', 'parasol', 'pergola', 'pergola_tkanina', 'zadaszenie', 'screen_taras']]]],
  ['okna', [['okna', ['okno_silownik', 'okno_dachowe', 'okno_plaskie', 'swietlik', 'wylaz']]]],
  ['moskitiery', [['moskitiery', ['moskitiera', 'moskitiera_plisa_okno', 'moskitiera_drzwi', 'moskitiera_zip_drzwi']]]],
  ['brama', [['bramy', ['przesuwna', 'skrzydlowa', 'furtka']], ['garaze', ['segmentowa', 'garaz_boczna', 'uchylna', 'roletowa', 'garaz_skrzydlowa']], ['szlabany', ['szlaban']]]]
];
export const NOWE = ['adaptacyjna', 'roleta_moskitiera', 'markiza_kasetowa', 'markiza_balkonowa', 'markiza_pionowa', 'markiza_boczna', 'dachowa', 'markizeta_dach',
  'markizeta', 'pergola', 'zadaszenie', 'screen_taras', 'moskitiera', 'moskitiera_drzwi', 'okiennice', 'firana', 'ekran', 'pergola_tkanina', 'okno_silownik', 'okno_dachowe', 'swietlik', 'szlaban',
  'panel', 'natynkowa_okragla', 'ekstrudowana', 'roleta_drzwi', 'fasadowa_f80', 'dach_dkl', 'dach_ssl', 'dach_fhb', 'dach_msl', 'dach_pal', 'dach_fhl', 'dach_dn', 'markiza_otwarta', 'markiza_polkasetowa', 'markiza_volant', 'markiza_koszowa', 'markiza_wolnostojaca', 'markiza_zimowa',
  'roleta_zip_wew', 'bambusowa', 'plisa_gora_dol', 'zaslona_wave', 'markizoleta', 'okiennice_przesuwne', 'okno_plaskie', 'wylaz', 'zagiel', 'parasol', 'moskitiera_plisa_okno', 'moskitiera_zip_drzwi', 'furtka', 'garaz_skrzydlowa', 'garaz_boczna'];

export function kafel(typ, kolor = '#3b3f45', rama = '#f4f4f2') {
  const f = WEW[typ] || ZEW[typ] || OKNA[typ] || MOSK[typ] || TARAS[typ] || DACH[typ] || BRAMY[typ];
  if (!f) return '';
  P = 'k' + (++nr) + '_';
  return svg(defs(kolor, rama) + f(kolor, rama));
}

// pomocnicze rysunki dla animacji (kafle_ruch.js): ten sam styl, tło i przejścia co obrazki kreatora
export function poczatek(kolor = '#3b3f45', rama = '#f4f4f2') { P = 'k' + (++nr) + '_'; return defs(kolor, rama); }
export const R = { ciem, jas, u, CIEN, okno, tlo, cienR, svg, skrzynka, prowadnice, pancerz, kaseta, dach, oknoD, prowD, belkaD, SOSNA, BIALA, SZARA, ORZECH,
  elewacja, drzwi, pasyM, balustrada, plac, sztachety, garaz, slupek };
