// Wymiary okna 3D bez three.js (karta i kreator kładą na nim przyciski pól): pola układu w ułamkach całego obrazka.
export const RAMA = .07;   // ościeżnica (m)
// pola [[x, y, w, h], …] w ułamkach światła okna → prostokąty skrzydeł w ułamkach obrazka (margines m wokół okna)
export function polaNaObrazku(pola, W, H, m = 0) {
  const iW = W - 2 * RAMA, iH = H - 2 * RAMA, s = 1 - 2 * m;
  return pola.map(([x, y, w, h]) => [m + s * (RAMA + x * iW) / W, m + s * (RAMA + y * iH) / H, s * w * iW / W, s * h * iH / H]);
}
// rozmiar okna (m): wysokość 1,5 m, szerokość z proporcji szer./wys.
export const wymiary = proporcja => ({ W: +(1.5 * proporcja).toFixed(3), H: 1.5 });
// rodzaje, które zasłaniają w bok (suwak poziomy)
export const NA_BOKI = ['pionowa', 'panel', 'zaslona', 'zaslona_wave', 'firana', 'okiennice', 'okiennice_przesuwne', 'markiza_boczna'];
// WebGL w tej przeglądarce (bez niego zostaje stary rysunek)
let gl3 = null;
export const moze3d = () => {
  if (gl3 === null) try { const c = document.createElement('canvas'); gl3 = !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch (e) { gl3 = false; }
  return gl3;
};
// moduł z three.js: jeden plik www/okno3d.js, wczytywany raz, przy pierwszym oknie
let mod = null;
export const okno3d = wersja => mod ||= import(`/motor_ha/okno3d.js?v=${wersja}`);
// jasność widoku i światła o danej porze
export const JASNOSC = { dzien: 1, zloto: .85, swit: .8, zmierzch: .55, noc: .3 };
// proporcja okna (szer./wys.) z układu: liczba kolumn i rzędów pól
export const proporcja = pola => {
  const kol = new Set(pola.map(p => +(+p[0]).toFixed(3))).size, rz = new Set(pola.map(p => +(+p[1]).toFixed(3))).size;
  return Math.max(.6, Math.min(2.4, (kol === 1 ? .78 : kol === 2 ? 1.12 : .55 * kol) * (rz > 2 ? .85 : 1)));
};
