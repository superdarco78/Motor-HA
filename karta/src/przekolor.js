// Zdjęcie rodzaju (Canva) w wybranym kolorze: maska (www/rodzaje/maski/{typ}.png, biały = tkanina/pancerz)
// mówi, co przemalować; jasność zdjęcia zostaje, więc widać fałdy, lamele i fakturę.
const gotowe = new Map(), wToku = new Map();
const wczytaj = src => new Promise((ok, zle) => { const i = new Image(); i.onload = () => ok(i); i.onerror = zle; i.src = src; });
const rgb = h => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ''); if (!m) return null; const n = parseInt(m[1], 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
export const klucz = (typ, kolor) => typ + '|' + kolor;
export const zKolorem = (typ, kolor) => gotowe.get(klucz(typ, kolor));
export function przekoloruj(typ, kolor, wersja) {
  const k = klucz(typ, kolor), c = rgb(kolor);
  if (gotowe.has(k)) return Promise.resolve(gotowe.get(k));
  if (!c) return Promise.resolve(null);
  if (wToku.has(k)) return wToku.get(k);
  const p = Promise.all([wczytaj(`/motor_ha/rodzaje/${typ}.webp?v=${wersja}`), wczytaj(`/motor_ha/rodzaje/maski/${typ}.png?v=${wersja}`)]).then(([z, m]) => {
    const w = z.naturalWidth, h = z.naturalHeight, cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const x = cv.getContext('2d', { willReadFrequently: true });
    x.drawImage(m, 0, 0, w, h); const mk = x.getImageData(0, 0, w, h).data;
    x.clearRect(0, 0, w, h); x.drawImage(z, 0, 0, w, h); const im = x.getImageData(0, 0, w, h), d = im.data;
    let s = 0, n = 0;
    for (let i = 0; i < d.length; i += 4) { const a = mk[i] / 255; s += a * (d[i] + d[i + 1] + d[i + 2]) / 3; n += a; }
    const sr = n ? s / n : 128;
    for (let i = 0; i < d.length; i += 4) {
      const a = mk[i] / 255; if (!a) continue;
      const g = 1 + 1.8 * ((d[i] + d[i + 1] + d[i + 2]) / 3 - sr) / Math.max(sr, 1);
      for (let j = 0; j < 3; j++) d[i + j] = d[i + j] * (1 - a) + Math.max(0, Math.min(255, c[j] * g)) * a;
    }
    x.putImageData(im, 0, 0);
    const url = cv.toDataURL('image/webp', .9); gotowe.set(k, url); wToku.delete(k); return url;
  }).catch(() => { wToku.delete(k); return null; });
  wToku.set(k, p); return p;
}
