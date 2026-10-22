// Operacje na kolorach #rrggbb.

const rgb = h => {
  let s = String(h || '').replace('#', '');
  if (s.length === 3) s = [...s].map(x => x + x).join('');
  const n = parseInt(s.slice(0, 6), 16);
  return Number.isNaN(n) ? [35, 36, 39] : [n >> 16, (n >> 8) & 255, n & 255];
};
const doHex = a => '#' + a.map(x => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('');

// t > 0 rozjaśnia (do bieli), t < 0 przyciemnia (do czerni)
export const jasniej = (h, t) => { const c = rgb(h), d = t < 0 ? 0 : 255; return doHex(c.map(x => x + (d - x) * Math.abs(t))); };
export const mieszaj = (a, b, t) => { const x = rgb(a), y = rgb(b); return doHex(x.map((v, i) => v + (y[i] - v) * t)); };
export const rgba = (h, a) => `rgba(${rgb(h).join(',')},${a})`;
export const jasnosc = h => { const [r, g, b] = rgb(h); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };
