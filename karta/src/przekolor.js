// Zdjęcie z Canvy w wybranych kolorach: maska osłony (www/rodzaje/maski/{typ}.png) i maska ramy (www/rodzaje/ramy/{typ}.png,
// dla układów www/ui/ramy/u1…u8.png; biały = co przemalować). Jasność zdjęcia zostaje, więc widać fałdy, lamele i fakturę.
import { MASKI, RAMY } from './zdjecia.js';
const gotowe = new Map(), wToku = new Map();
const wczytaj = src => new Promise((ok, zle) => { const i = new Image(); i.onload = () => ok(i); i.onerror = zle; i.src = src; });
const rgb = h => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ''); if (!m) return null; const n = parseInt(m[1], 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
const UKLAD = /^u[1-8]$/;
export const klucz = (typ, kolor, rama = '') => typ + '|' + (kolor || '') + '|' + (rama || '');
export const zKolorem = (typ, kolor, rama) => gotowe.get(klucz(typ, kolor, rama));
// co da się przemalować na tym zdjęciu: [maska, kolor, siła cieniowania, czy rama]
function warstwy(typ, kolor, rama, wersja) {
  const w = [], k = rgb(kolor), r = rgb(rama);
  if (UKLAD.test(typ)) { if (r) w.push([`/motor_ha/ui/ramy/${typ}.png?v=${wersja}`, r, 1.2, true]); return w; }
  if (k && MASKI.has(typ)) w.push([`/motor_ha/rodzaje/maski/${typ}.png?v=${wersja}`, k, 1.8]);
  if (r && RAMY.has(typ)) w.push([`/motor_ha/rodzaje/ramy/${typ}.png?v=${wersja}`, r, 1.2, true]);
  return w;
}
export const daSie = (typ, kolor, rama) => warstwy(typ, kolor, rama, '').length > 0;
// zdjęcie rodzaju (typ) albo układu (u1…u8) w kolorze osłony i ramy → data: URL (albo null, gdy nie ma czego barwić)
export function przekoloruj(typ, kolor, wersja, rama) {
  const k = klucz(typ, kolor, rama), W = warstwy(typ, kolor, rama, wersja);
  if (gotowe.has(k)) return Promise.resolve(gotowe.get(k));
  if (!W.length) return Promise.resolve(null);
  if (wToku.has(k)) return wToku.get(k);
  const src = UKLAD.test(typ) ? `/motor_ha/ui/${typ}.webp?v=${wersja}` : `/motor_ha/rodzaje/${typ}.webp?v=${wersja}`;
  const p = Promise.all([wczytaj(src), ...W.map(x => wczytaj(x[0]))]).then(([z, ...maski]) => {
    const w = z.naturalWidth, h = z.naturalHeight, cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const x = cv.getContext('2d', { willReadFrequently: true });
    const mk = maski.map(m => { x.clearRect(0, 0, w, h); x.drawImage(m, 0, 0, w, h); return x.getImageData(0, 0, w, h).data; });
    x.clearRect(0, 0, w, h); x.drawImage(z, 0, 0, w, h);
    const im = x.getImageData(0, 0, w, h), d = im.data, org = d.slice();
    W.forEach(([, c, sila, rama], n) => {   // rama: cieniowanie przycięte, żeby ciemna rama na białą nie dawała prążków
      const m = mk[n];
      let s = 0, l = 0;
      for (let i = 0; i < d.length; i += 4) { const a = m[i] / 255; s += a * (org[i] + org[i + 1] + org[i + 2]) / 3; l += a; }
      const sr = l ? s / l : 128;
      for (let i = 0; i < d.length; i += 4) {
        const a = m[i] / 255; if (!a) continue;
        let g = 1 + sila * ((org[i] + org[i + 1] + org[i + 2]) / 3 - sr) / Math.max(sr, 1);
        if (rama) g = Math.max(.7, Math.min(1.15, g));
        for (let j = 0; j < 3; j++) d[i + j] = d[i + j] * (1 - a) + Math.max(0, Math.min(255, c[j] * g)) * a;
      }
    });
    x.putImageData(im, 0, 0);
    const url = cv.toDataURL('image/webp', .92); gotowe.set(k, url); wToku.delete(k); return url;
  }).catch(() => { wToku.delete(k); return null; });
  wToku.set(k, p); return p;
}
