// Brama ze zdjęć (Canva): tło bez skrzydła ({typ}-tlo.webp) i wycięte skrzydło ({typ}-skrzydlo.webp, z przezroczystością),
// które przesuwa się, unosi albo obraca. Ramka skrzydła z narzedzia/bramy.py.
import { BRAMY_ZDJ } from './bramy_zdj.js';
import { WERSJA } from './stale.js';

export const maZdjecieBramy = t => !!BRAMY_ZDJ[t];
const P = v => +(v * 100).toFixed(3) + '%';
const DWA = ['skrzydlowa', 'garaz_skrzydlowa'];
const W_OTWORZE = ['segmentowa', 'roletowa', 'uchylna', 'garaz_boczna'];   // drzwi garażu chowają się w otworze

export function bramaZdjecie(t, noc) {
  const [x, y, w, h] = BRAMY_ZDJ[t], u = n => `/motor_ha/bramy/${t}-${n}.webp?v=${WERSJA}`;
  const img = `<img src="${u('skrzydlo')}" alt="" draggable="false">`;
  const czesci = DWA.includes(t)
    ? `<div class="fbs" data-c="l" style="clip-path:inset(0 ${P(1 - x - w / 2)} 0 0);transform-origin:${P(x)} 50%">${img}</div><div class="fbs" data-c="p" style="clip-path:inset(0 0 0 ${P(x + w / 2)});transform-origin:${P(x + w)} 50%">${img}</div>`
    : `<div class="fbs" style="transform-origin:${t === 'szlaban' ? `${P(x)} ${P(y + h / 2)}` : t === 'furtka' ? `${P(x + w)} 50%` : t === 'uchylna' ? `50% ${P(y)}` : '50% 50%'}">${img}</div>`;
  const otwor = W_OTWORZE.includes(t) ? ` style="clip-path:inset(${P(y)} ${P(1 - x - w)} ${P(1 - y - h)} ${P(x)})"` : '';
  return `<div class="fbr${noc ? ' noc' : ''}" data-typ="${t}"><img class="ftlo" src="${u('tlo')}" alt="" draggable="false"><div class="fbo"${otwor}>${czesci}</div></div>`;
}

// p: 0 zamknięta … 100 otwarta
export function ustawBrameZdj(el, t, p) {
  if (!el || !BRAMY_ZDJ[t]) return;
  const f = Math.max(0, Math.min(100, p)) / 100, [, , w, h] = BRAMY_ZDJ[t];
  el.querySelectorAll('.fbs').forEach(s => {
    s.style.transform = t === 'przesuwna' ? `translateX(${P(-f * w * .97)})`
      : t === 'garaz_boczna' ? `translateX(${P(f * w)})`
      : t === 'segmentowa' || t === 'roletowa' ? `translateY(${P(-f * h)})`
      : t === 'uchylna' ? `scaleY(${1 - f * .92})`
      : t === 'szlaban' ? `rotate(${-f * 82}deg)`
      : `scaleX(${1 - f * .82})`;
  });
}

export const STYL_BRAMY = `.fbr{position:relative;width:100%;aspect-ratio:5/4;border-radius:var(--ha-border-radius-md,8px);overflow:hidden;background:#d9dadb}
.fbr img{position:absolute;inset:0;width:100%;height:100%;max-width:none;pointer-events:none;user-select:none}
.fbr .fbo,.fbr .fbs{position:absolute;inset:0}
.fbr.noc img{filter:brightness(.62) saturate(.85)}`;
