// Ikony z Canvy (www/ui) zamiast ikon mdi: jasna i ciemna wersja naraz, styl pokazuje tę dla motywu (.ciemny na karcie).
// Gdy obrazka nie ma, zostaje zapas (zwykle ha-icon).
import { UI } from './zdjecia.js';
import { WERSJA } from './stale.js';

export const ikUI = (n, zapas = '') => {
  if (!UI.has(n + '.png')) return zapas;
  const c = UI.has(n + '-ciemny.png');
  return `<img class="iku${c ? ' jas' : ''}" src="/motor_ha/ui/${n}.png?v=${WERSJA}" alt="" draggable="false">${c ? `<img class="iku ciem" src="/motor_ha/ui/${n}-ciemny.png?v=${WERSJA}" alt="" draggable="false">` : ''}`;
};

export const STYL_IKU = `.iku{display:block;width:var(--iku,24px);height:var(--iku,24px);object-fit:contain;pointer-events:none}
.iku.ciem,.ciemny .iku.jas{display:none}.ciemny .iku.ciem{display:block}`;
