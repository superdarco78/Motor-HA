// Okno ze zdjęć (Canva): zdjęcie układu z www/ui/u1…u8.webp i osłona na każdej szybie – wycinek zdjęcia rodzaju spod maski
// (www/rodzaje/maski), w kolorze pola. Wspólne dla kreatora i karty.
import { RAMKI } from './ramki.js';
import { ZDJECIA, UI } from './zdjecia.js';
import { WERSJA } from './stale.js';
import { zKolorem } from './przekolor.js';

// szablony układów: pola (x, y, szer., wys.) w ułamkach okna; trzeci element – drzwi do podłogi
export const UKLADY = [
  ['u1', [[0, 0, 1, 1]]],
  ['u2', [[0, 0, .5, 1], [.5, 0, .5, 1]]],
  ['u3', [[0, 0, 1 / 3, 1], [1 / 3, 0, 1 / 3, 1], [2 / 3, 0, 1 / 3, 1]]],
  ['u4', [[0, 0, .5, .28], [.5, 0, .5, .28], [0, .28, .5, .72], [.5, .28, .5, .72]]],
  ['u5', [[0, 0, .55, .22], [.55, 0, .45, .22], [0, .22, .55, .5], [.55, .22, .45, .78]]],
  ['u6', [[0, 0, .5, 1], [.5, 0, .5, 1]], true],
  ['u7', [[0, 0, .25, 1], [.25, 0, .5, 1], [.75, 0, .25, 1]]],
  ['u8', [[0, 0, .5, .5], [.5, 0, .5, .5], [0, .5, .5, .5], [.5, .5, .5, .5]]],
];

// szyby na zdjęciach układów (www/ui/u1…u8.webp, Canva): [x, y, szer., wys.] w ułamkach zdjęcia, w kolejności pól z UKLADY
export const SZYBY = {
  u1: [[.302, .125, .401, .693]],
  u2: [[.176, .15, .257, .667], [.567, .15, .257, .667]],
  u3: [[.117, .214, .194, .517], [.4, .214, .198, .517], [.681, .214, .2, .517]],
  u4: [[.153, .068, .346, .127], [.499, .068, .346, .127], [.195, .303, .244, .545], [.561, .303, .243, .545]],
  u5: [[.224, .06, .199, .27], [.532, .053, .244, .13], [.224, .35, .199, .566], [.532, .19, .244, .265]],
  u6: [[.233, .025, .218, .916], [.544, .025, .223, .916]],
  u7: [[.111, .165, .111, .612], [.295, .151, .408, .635], [.777, .165, .106, .612]],
  u8: [[.202, .109, .266, .335], [.534, .107, .264, .339], [.203, .52, .263, .325], [.535, .52, .263, .326]]
};

const UL = v => +(v * 100).toFixed(3) + '%';

// który gotowy układ (u1…u8) ma takie pola – albo null (własny układ)
export function nazwaUkladu(pola) {
  if (!pola?.length) return null;
  const blisko = (a, b) => Math.abs(a - b) < .02;
  const u = UKLADY.find(([, P]) => P.length === pola.length && P.every((r, i) => r.every((v, j) => blisko(v, pola[i][j]))));
  return u && UI.has(u[0] + '.webp') && SZYBY[u[0]] ? u[0] : null;
}

// osłona do nałożenia na szybę: zdjęcie rodzaju (w kolorze, gdy już przeliczone) przycięte do maski i rozciągnięte na szybę
export function tkanina(typ, kolor) {
  const rk = RAMKI[typ];
  if (!rk || !ZDJECIA.has(typ)) return '';
  const [bx, by, bw, bh] = rk, src = `/motor_ha/rodzaje/${typ}.webp?v=${WERSJA}`, mk = `url(/motor_ha/rodzaje/maski/${typ}.png?v=${WERSJA})`;
  // osłona ze zdjęcia w proporcjach zdjęcia (jak kafelek), bez rozciągania: wypełnia zasłoniętą część szyby
  // jak object-fit:cover – kaseta u góry, dolna listwa na dole, lamele i paski w tej samej gęstości co na kafelku
  const A = +(bw * 193 / (bh * 161)).toFixed(4), W = `max(100cqw, 100cqh * ${A})`, H = `(${W} / ${A})`;
  const n = v => +v.toFixed(4);
  return `<img class="ftki" data-przek="${typ}" data-kol="${kolor}" src="${zKolorem(typ, kolor) || src}" alt="" draggable="false" style="width:calc(${W} * ${n(1 / bw)});height:calc(${H} * ${n(1 / bh)});left:calc((100cqw - ${W}) / 2 - ${W} * ${n(bx / bw)});top:calc((100cqh - ${H}) / 2 - ${H} * ${n(by / bh)});-webkit-mask-image:${mk};mask-image:${mk}">`;
}
