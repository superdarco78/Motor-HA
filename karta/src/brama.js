// Rysunki bram i garaży. Jeden obrazek SVG na rodzaj; ruch to tylko przesunięcia i skale grup,
// więc brama jedzie płynnie w tempie silnika jak osłona w oknie.
import { jasniej as J } from './kolor.js';

const W = 320, H = 200, ZIEMIA = 172;

// tło: niebo wg pory, trawa i podjazd
function tlo(noc) {
  const niebo = noc ? ['#1b2540', '#2c3a5c'] : ['#8fc3ea', '#d7ecf8'];
  return `<defs><linearGradient id="mhN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${niebo[0]}"/><stop offset="1" stop-color="${niebo[1]}"/></linearGradient>
  <clipPath id="mhOtw"><rect x="74" y="78" width="172" height="${ZIEMIA - 78}"/></clipPath>
  <clipPath id="mhPrz"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath></defs>
  <rect class="niebo-b" width="${W}" height="${ZIEMIA}" fill="url(#mhN)"/>
  <rect y="${ZIEMIA}" width="${W}" height="${H - ZIEMIA}" fill="${noc ? '#2d3a2a' : '#6fa04f'}"/>
  <path d="M110 ${ZIEMIA}h100l40 ${H - ZIEMIA}H70z" fill="${noc ? '#4a4a4a' : '#9a9a94'}"/>`;
}

// skrzydło bramy z prętów; szer. w, wys. h, kolor k
function przesło(x, y, w, h, k) {
  const prety = Array.from({ length: Math.floor(w / 11) }, (_, i) => `<rect x="${x + 6 + i * 11}" y="${y + 4}" width="3" height="${h - 8}" fill="${k}"/>`).join('');
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="none" stroke="${k}" stroke-width="5"/>
  <rect x="${x}" y="${y + h / 2 - 2}" width="${w}" height="4" fill="${J(k, -.15)}"/>${prety}`;
}

function slupek(x, k) {
  return `<rect x="${x - 7}" y="${ZIEMIA - 98}" width="14" height="98" fill="${J(k, .12)}"/><rect x="${x - 9}" y="${ZIEMIA - 102}" width="18" height="6" fill="${J(k, -.1)}"/>`;
}

function fotokomorka() {
  return `<g class="foto"><rect x="62" y="${ZIEMIA - 22}" width="6" height="16" rx="1" fill="#333"/><rect x="252" y="${ZIEMIA - 22}" width="6" height="16" rx="1" fill="#333"/>
  <line class="wiazka" x1="68" y1="${ZIEMIA - 16}" x2="252" y2="${ZIEMIA - 16}" stroke-width="2" stroke-dasharray="5 4"/></g>`;
}

// elewacja garażu z otworem
function garaz(k, rama, noc) {
  return `<rect x="34" y="40" width="252" height="${ZIEMIA - 40}" fill="${noc ? '#6c675f' : '#e3ddd1'}"/>
  <path d="M24 44L160 8L296 44z" fill="${noc ? '#4c2f28' : '#9c4b37'}"/>
  <rect x="70" y="74" width="180" height="${ZIEMIA - 74}" fill="${rama}"/>
  <rect x="74" y="78" width="172" height="${ZIEMIA - 78}" fill="${noc ? '#3b3128' : '#2b2723'}"/>
  ${noc ? '<rect x="74" y="78" width="172" height="40" fill="rgba(255,200,120,.25)"/>' : ''}`;
}

function drzwiGarazu(typ, k) {
  const h = ZIEMIA - 78, x = 74, w = 172;
  let wzor = '';
  if (typ === 'segmentowa') wzor = [1, 2, 3].map(i => `<rect x="${x}" y="${78 + i * h / 4 - 1}" width="${w}" height="2" fill="${J(k, -.3)}"/>`).join('') +
    Array.from({ length: 16 }, (_, i) => `<rect x="${x}" y="${78 + i * h / 16}" width="${w}" height="1" fill="${J(k, .12)}" opacity=".5"/>`).join('');
  else if (typ === 'roletowa') wzor = Array.from({ length: 24 }, (_, i) => `<rect x="${x}" y="${78 + i * h / 24}" width="${w}" height="1.2" fill="${J(k, -.32)}"/>`).join('');
  else wzor = Array.from({ length: 14 }, (_, i) => `<rect x="${x + 6 + i * 12}" y="80" width="2" height="${h - 4}" fill="${J(k, -.18)}"/>`).join('');
  return `<g class="drzwi"><rect x="${x}" y="78" width="${w}" height="${h}" fill="${k}"/>${wzor}
  <rect x="${x}" y="${ZIEMIA - 5}" width="${w}" height="5" fill="${J(k, -.4)}"/>
  ${typ !== 'roletowa' ? `<rect x="${x + w / 2 - 12}" y="${ZIEMIA - 34}" width="24" height="5" rx="2" fill="${J(k, -.45)}"/>` : ''}</g>`;
}

// cały obrazek dla rodzaju bramy
export function rysunekBramy(typ, k, rama, noc, foto) {
  let t = tlo(noc);
  if (typ === 'przesuwna') {
    // brama chowa się za murek po lewej
    t += `${slupek(258, rama)}<g clip-path="url(#mhPrz)"><g class="przesuwna">${przesło(64, ZIEMIA - 86, 190, 80, k)}<circle cx="90" cy="${ZIEMIA - 3}" r="4" fill="#222"/><circle cx="230" cy="${ZIEMIA - 3}" r="4" fill="#222"/></g></g>
    <rect x="0" y="${ZIEMIA - 92}" width="56" height="92" fill="${noc ? '#5a5650' : '#cfc8bb'}"/><rect x="0" y="${ZIEMIA - 96}" width="58" height="5" fill="${noc ? '#47443f' : '#b3ab9c'}"/>${slupek(62, rama)}`;
  } else if (typ === 'skrzydlowa') {
    t += `${slupek(62, rama)}${slupek(258, rama)}<g class="lewe">${przesło(68, ZIEMIA - 88, 92, 82, k)}</g><g class="prawe">${przesło(160, ZIEMIA - 88, 92, 82, k)}</g>`;
  } else {
    t += garaz(k, rama, noc) + `<g clip-path="url(#mhOtw)">${drzwiGarazu(typ, k)}</g>`;
  }
  if (foto) t += fotokomorka();
  return `<svg class="brama" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${t}</svg>`;
}

// ustawia rysunek dla pozycji p (0 = zamknięta, 100 = otwarta)
export function ustawBrame(svg, typ, p) {
  if (!svg) return;
  const f = Math.max(0, Math.min(100, p)) / 100;
  const g = s => svg.querySelector(s);
  if (typ === 'przesuwna') g('.przesuwna')?.setAttribute('transform', `translate(${-f * 186} 0)`);
  else if (typ === 'skrzydlowa') {
    const s = Math.cos(f * Math.PI * .45);    // skrzydła otwierają się do środka posesji
    g('.lewe')?.setAttribute('transform', `translate(68 0) scale(${s} 1) translate(-68 0)`);
    g('.prawe')?.setAttribute('transform', `translate(252 0) scale(${s} 1) translate(-252 0)`);
  } else if (typ === 'uchylna') {
    // płyta unosi się i kładzie pod sufitem: widać ją coraz krótszą przy górze otworu
    g('.drzwi')?.setAttribute('transform', `translate(0 ${-f * 6}) translate(0 78) scale(1 ${1 - f * .88}) translate(0 -78)`);
  } else g('.drzwi')?.setAttribute('transform', `translate(0 ${-f * (ZIEMIA - 78)})`);
}

// wiązka fotokomórki: zielona = wolna droga, czerwona = przeszkoda
export function ustawFotokomorke(svg, przeszkoda) {
  const w = svg?.querySelector('.wiazka'); if (!w) return;
  w.setAttribute('stroke', przeszkoda ? '#e53935' : '#43a047');
  w.setAttribute('stroke-dasharray', przeszkoda ? '0' : '5 4');
}
