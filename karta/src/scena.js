// Widok za oknem: niebo, pora dnia, pogoda i rysowane osiedle.
// Cały widok ma 200 × 100 jednostek; przy dwóch skrzydłach lewe pokazuje lewą połowę, prawe prawą, więc obraz jest ciągły.

// stan pogody z Home Assistanta → rodzaj nieba
export const NIEBO_Z_POGODY = {
  sunny: 'slonce', 'clear-night': 'slonce', partlycloudy: 'chmurki', cloudy: 'chmury', exceptional: 'chmury', windy: 'wiatr', 'windy-variant': 'wiatr',
  fog: 'mgla', rainy: 'deszcz', pouring: 'ulewa', hail: 'ulewa', lightning: 'burza', 'lightning-rainy': 'burza', snowy: 'snieg', 'snowy-rainy': 'deszczsnieg'
};

// kolory nieba [góra, dół] dla pory dnia
const NIEBA = {
  dzien: { slonce: ['#3d8fdc', '#bfe1f7'], chmurki: ['#5b9bd6', '#cfe3f1'], wiatr: ['#7095b8', '#cbd8e3'], chmury: ['#8794a0', '#c9d0d6'], mgla: ['#a6afb6', '#dde1e3'],
    deszcz: ['#5a6670', '#939da6'], ulewa: ['#454f58', '#76808a'], burza: ['#2c333b', '#5c656e'], snieg: ['#a2aeb9', '#e6ebee'], deszczsnieg: ['#7a858f', '#b8c0c7'] },
  zloto: { jasno: ['#4b62a6', '#f6a86b'], ciemno: ['#59606b', '#b88d79'] },
  zmierzch: { jasno: ['#15204c', '#c46f73'], ciemno: ['#1c2134', '#6d5866'] },
  noc: { jasno: ['#07102a', '#1d2b55'], ciemno: ['#0d1119', '#252b36'] }
};
const JASNE = ['slonce', 'chmurki', 'wiatr'];

export function kolorNieba(rodzaj, pora) {
  const [g, d] = pora === 'dzien' ? NIEBA.dzien[rodzaj] || NIEBA.dzien.slonce : NIEBA[pora][JASNE.includes(rodzaj) ? 'jasno' : 'ciemno'];
  return `linear-gradient(180deg,${g},${d})`;
}

// pora dnia z wysokości słońca (sun.sun), a bez niego z zegara
export function poraDnia(hass) {
  const s = hass?.states?.['sun.sun'], el = s?.attributes?.elevation;
  if (typeof el === 'number') return s.state === 'below_horizon' ? (el > -6 ? 'zmierzch' : 'noc') : el < 7 ? 'zloto' : 'dzien';
  const h = new Date().getHours();
  return h >= 22 || h < 5 ? 'noc' : h < 7 || h >= 20 ? 'zmierzch' : h < 8 || h >= 19 ? 'zloto' : 'dzien';
}

// stała „losowość” – ta sama scena przy każdym rysowaniu
const los = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

const DOMY = [ // x, szerokość, wysokość ściany, kolor ściany, kolor dachu, rodzaj dachu
  [6, 26, 22, '#d9c4a5', '#9c4a36', 'dwu'], [36, 20, 30, '#c9cfd4', '#4b5661', 'plaski'], [60, 30, 20, '#e6d8bc', '#7b4d36', 'dwu'],
  [106, 24, 26, '#cdb59a', '#8e3f30', 'dwu'], [134, 18, 34, '#b9c3c9', '#3f4a55', 'plaski'], [156, 32, 21, '#e1d3b5', '#6a5143', 'dwu']
];
const DRZEWA = [[3, 13, 'k'], [33, 11, 'i'], [56, 12, 'k'], [94, 15, 'k'], [101, 10, 'i'], [131, 12, 'k'], [153, 10, 'i'], [193, 14, 'k']];
const LAMPY = [84, 118];

export function osiedle(rodzaj, pora) {
  const snieg = rodzaj === 'snieg' || rodzaj === 'deszczsnieg', mokro = ['deszcz', 'ulewa', 'burza', 'deszczsnieg'].includes(rodzaj);
  const wiatr = ['wiatr', 'burza', 'ulewa'].includes(rodzaj), ciemno = pora === 'noc' || pora === 'zmierzch';
  const szarosc = { chmury: .85, mgla: .88, deszcz: .74, ulewa: .64, burza: .55, deszczsnieg: .74, wiatr: .92, snieg: .95 }[rodzaj] || 1;
  const filtr = pora === 'noc' ? 'brightness(.36) saturate(.55) hue-rotate(12deg)' : pora === 'zmierzch' ? 'brightness(.55) saturate(.7) hue-rotate(-10deg)'
    : pora === 'zloto' ? `brightness(${szarosc * .95}) sepia(.28) saturate(1.2)` : `brightness(${szarosc}) saturate(${szarosc})`;
  const g = [], okna = [];
  // wzgórza w oddali i łąka
  g.push(`<path d="M0 58 C25 46 45 52 70 49 S120 42 150 50 S185 47 200 52 V100 H0Z" fill="${snieg ? '#dfe7ec' : '#8db07a'}" opacity=".85"/>`);
  g.push(`<path d="M0 66 C40 58 80 64 110 61 S170 60 200 64 V100 H0Z" fill="${snieg ? '#eef3f6' : '#6f9d5c'}"/>`);
  for (const [x, w, h, sc, da, typ] of DOMY) {
    const y = 80 - h;
    g.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${sc}"/>`);
    if (typ === 'dwu') {
      g.push(`<path d="M${x - 2.5} ${y + .5} L${x + w / 2} ${y - w * .42} L${x + w + 2.5} ${y + .5}Z" fill="${da}"/>`);
      if (snieg) g.push(`<path d="M${x - 2.5} ${y + .5} L${x + w / 2} ${y - w * .42} L${x + w + 2.5} ${y + .5} L${x + w} ${y - 1.2} L${x + w / 2} ${y - w * .42 + 2.2} L${x} ${y - 1.2}Z" fill="#fbfdff"/>`);
      g.push(`<rect x="${x + w * .68}" y="${y - w * .38}" width="3" height="${w * .2}" fill="${da}"/>`);
    } else {
      g.push(`<rect x="${x - 1}" y="${y - 2}" width="${w + 2}" height="2.5" fill="${snieg ? '#fbfdff' : da}"/>`);
    }
    let n = 0;
    for (let r = y + 4; r < 74; r += 8) for (let c = x + 3; c < x + w - 4; c += 7) {
      g.push(`<rect x="${c}" y="${r}" width="4" height="4.6" rx=".4" fill="#9eb6c8"/>`);
      if (ciemno && los(x * 13 + n) < .55) okna.push(`<rect x="${c}" y="${r}" width="4" height="4.6" rx=".4" fill="#ffd47e"/>`);
      n++;
    }
    g.push(`<rect x="${x + w / 2 - 2.5}" y="${74}" width="5" height="6" fill="${da}" opacity=".9"/>`);
  }
  for (const [x, r, typ] of DRZEWA) {
    const kor = `<rect x="${x - .9}" y="${80 - r * .45}" width="1.8" height="${r * .45}" fill="#5b4030"/>`;
    const k1 = snieg ? '#e3ebe7' : '#3f7d3b', k2 = snieg ? '#cfdcd5' : '#33702f';
    const korona = typ === 'i'
      ? `<path d="M${x} ${80 - r * 1.25} L${x + r * .38} ${80 - r * .4} L${x - r * .38} ${80 - r * .4}Z" fill="${k2}"/>`
      : `<circle cx="${x}" cy="${80 - r * .7}" r="${r * .45}" fill="${k1}"/><circle cx="${x - r * .28}" cy="${80 - r * .5}" r="${r * .32}" fill="${k2}"/>`;
    g.push(`<g class="${wiatr ? 'drz' : ''}" style="transform-origin:${x}px 80px;animation-delay:-${(x % 9) / 3}s">${kor}${korona}</g>`);
  }
  // chodnik i ulica
  g.push(`<rect x="0" y="80" width="200" height="4" fill="${snieg ? '#f2f5f7' : '#a4a29c'}"/>`);
  g.push(`<rect x="0" y="84" width="200" height="16" fill="${snieg ? '#e4e9ec' : mokro ? '#3a4046' : '#5d6166'}"/>`);
  for (let k = 0; k < 9; k++) g.push(`<rect x="${k * 24 + 4}" y="91.5" width="12" height="1" fill="#e8e6dc" opacity="${snieg ? .2 : .55}"/>`);
  if (mokro) for (let k = 0; k < 14; k++) g.push(`<rect x="${k * 15 + 3}" y="${86 + (k % 4) * 3}" width="7" height=".6" fill="#a9bccb" opacity=".55"/>`);
  for (const x of LAMPY) g.push(`<rect x="${x - .6}" y="58" width="1.2" height="26" fill="#2e3238"/><rect x="${x - 3.2}" y="57" width="6.4" height="1.6" rx=".8" fill="#2e3238"/>`);
  const swiatla = [...okna];
  if (ciemno) for (const x of LAMPY) swiatla.push(`<circle cx="${x}" cy="59" r="10" fill="url(#mhLampa)"/><circle cx="${x}" cy="58.8" r="1.6" fill="#fff4c8"/>` +
    `<ellipse cx="${x}" cy="86" rx="16" ry="3" fill="#ffd27a" opacity="${mokro ? .45 : .22}"/>`);
  return { tlo: g.join(''), filtr, swiatla: swiatla.join('') };
}

// pogoda na niebie: słońce/księżyc, gwiazdy, chmury, opady, mgła, błyskawica (warstwa HTML nad niebem)
export function pogoda(rodzaj, pora, skrzydlo, ile) {
  const h = [], noc = pora === 'noc' || pora === 'zmierzch', jasno = JASNE.includes(rodzaj), ciemne = ['deszcz', 'ulewa', 'burza', 'deszczsnieg'].includes(rodzaj);
  const L = (a, b, n) => a + los(n + skrzydlo * 97) * (b - a);
  if (noc && jasno) for (let k = 0; k < 14; k++) h.push(`<i class="gw" style="left:${L(3, 97, k)}%;top:${L(4, 45, k + 30)}%;animation-delay:-${L(0, 4, k + 60)}s"></i>`);
  // jedno słońce albo księżyc na całe okno – w prawym skrzydle (albo w jedynym)
  if (jasno && (ile < 2 || skrzydlo === 1)) h.push(noc && pora === 'noc' ? '<i class="ksiezyc"></i>' : pora === 'noc' ? '' : `<i class="slonce${pora === 'dzien' ? '' : ' nisko'}"></i>`);
  const nc = { chmurki: 2, wiatr: 3, chmury: 4, mgla: 2, deszcz: 4, ulewa: 5, burza: 5, snieg: 4, deszczsnieg: 4 }[rodzaj] || 0;
  const kol = noc ? (ciemne ? '#262b34' : '#39404f') : rodzaj === 'burza' ? '#4a5159' : rodzaj === 'ulewa' ? '#69727a' : ciemne ? '#8a939b' : jasno ? '#ffffff' : '#e3e7ea';
  for (let k = 0; k < nc; k++) {
    const t = rodzaj === 'wiatr' ? L(10, 16, k + 5) : L(45, 80, k + 5);
    h.push(`<i class="chm" style="top:${L(-3, 32, k + 9)}%;width:${L(45, 75, k + 3)}%;background:${kol};opacity:${L(.82, .97, k).toFixed(2)};animation-duration:${t.toFixed(1)}s;animation-delay:-${L(0, t, k + 7).toFixed(1)}s"></i>`);
  }
  if (rodzaj === 'mgla') for (let k = 0; k < 4; k++) h.push(`<i class="mg" style="top:${12 + k * 22}%;animation-duration:${L(14, 24, k)}s;animation-delay:-${L(0, 10, k + 2)}s"></i>`);
  const krople = { deszcz: 22, ulewa: 40, burza: 34, deszczsnieg: 14 }[rodzaj] || 0;
  for (let k = 0; k < krople; k++) h.push(`<i class="kr" style="left:${L(-5, 105, k)}%;animation-duration:${L(rodzaj === 'ulewa' ? .45 : .6, rodzaj === 'ulewa' ? .65 : .9, k + 40).toFixed(2)}s;animation-delay:-${L(0, 1, k + 80).toFixed(2)}s"></i>`);
  const platki = { snieg: 26, deszczsnieg: 10 }[rodzaj] || 0;
  for (let k = 0; k < platki; k++) { const r = L(2, 4.6, k + 3).toFixed(1); h.push(`<i class="pl" style="left:${L(0, 100, k)}%;width:${r}px;height:${r}px;animation-duration:${L(5, 10, k + 9).toFixed(1)}s;animation-delay:-${L(0, 10, k + 19).toFixed(1)}s"></i>`); }
  if (rodzaj === 'burza') h.push('<i class="bl"></i>');
  return h.join('');
}

// SVG osiedla dla jednego skrzydła
export function widokSvg(rodzaj, pora, skrzydlo, ile) {
  const o = osiedle(rodzaj, pora);
  const vb = ile > 1 ? `${skrzydlo ? 100 : 0} 0 100 100` : '0 0 200 100';
  const pa = `${ile > 1 ? (skrzydlo ? 'xMinYMax' : 'xMaxYMax') : 'xMidYMax'} slice`;
  return `<svg class="osiedle" viewBox="${vb}" preserveAspectRatio="${pa}" aria-hidden="true"><g style="filter:${o.filtr}">${o.tlo}</g>` +
    (o.swiatla ? `<defs><radialGradient id="mhLampa"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient></defs>${o.swiatla}` : '') + '</svg>';
}

// Zdjęcie widoku z Canvy (www/widok/{pora}-{pogoda}.webp) zamiast rysunku. Brakująca pora: zdjęcie dnia z tą samą pogodą,
// przyciemnione filtrem. Bez zdjęcia → null (zostaje rysunek).
const POGODA_ZDJ = { slonce: 'sunny', chmurki: 'partlycloudy', wiatr: 'partlycloudy', chmury: 'cloudy', mgla: 'fog', deszcz: 'rainy', ulewa: 'rainy',
  burza: 'lightning-rainy', snieg: 'snowy', deszczsnieg: 'snowy' };
const FILTR_PORY = { zloto: 'brightness(.85) sepia(.35) saturate(1.3)', zmierzch: 'brightness(.5) saturate(.8) hue-rotate(-10deg)', noc: 'brightness(.28) saturate(.55)' };
export function zdjecieWidoku(widoki, rodzaj, pora) {
  const p = POGODA_ZDJ[rodzaj] || 'cloudy';
  for (const [k, f] of [[`${pora}-${p}`, ''], [`dzien-${p}`, FILTR_PORY[pora] || ''], [`${pora}-cloudy`, ''], ['dzien-cloudy', FILTR_PORY[pora] || '']])
    if (widoki.has(k)) return { plik: k, filtr: f };
  return null;
}
