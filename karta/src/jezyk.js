// Teksty karty i edytora w 14 językach (tlumaczenia/<kod>.json). Brakujący tekst bierze się z angielskiego.
import pl from '../tlumaczenia/pl.json';
import en from '../tlumaczenia/en.json';
import de from '../tlumaczenia/de.json';
import fr from '../tlumaczenia/fr.json';
import cs from '../tlumaczenia/cs.json';
import sk from '../tlumaczenia/sk.json';
import es from '../tlumaczenia/es.json';
import it from '../tlumaczenia/it.json';
import nl from '../tlumaczenia/nl.json';
import pt from '../tlumaczenia/pt.json';
import uk from '../tlumaczenia/uk.json';
import ru from '../tlumaczenia/ru.json';
import ja from '../tlumaczenia/ja.json';
import zh from '../tlumaczenia/zh-Hans.json';

const SUROWE = { pl, en, de, fr, cs, sk, es, it, nl, pt, uk, ru, ja, 'zh-Hans': zh };
export const NAZWY_JEZYKOW = { pl: 'Polski', en: 'English', de: 'Deutsch', fr: 'Français', cs: 'Čeština', sk: 'Slovenčina', es: 'Español', it: 'Italiano',
  nl: 'Nederlands', pt: 'Português', uk: 'Українська', ru: 'Русский', ja: '日本語', 'zh-Hans': '简体中文' };

const scal = (baza, x) => baza && typeof baza === 'object' && !Array.isArray(baza)
  ? Object.fromEntries(Object.entries(baza).map(([k, v]) => [k, scal(v, x?.[k])]))
  : typeof x === typeof baza ? x : baza;
export const TEKSTY = Object.fromEntries(Object.entries(SUROWE).map(([k, v]) => [k, k === 'en' ? en : scal(en, v)]));

// „pl-PL”, „zh-Hans”, „de_AT” → kod pliku; język bez tłumaczenia → angielski
export function kodJezyka(s) {
  const k = String(s || '').replace('_', '-');
  if (TEKSTY[k]) return k;
  const p = k.split('-')[0].toLowerCase();
  if (p === 'zh') return 'zh-Hans';
  return TEKSTY[p] ? p : 'en';
}
export const jezyk = (cfg, hass) => cfg?.jezyk && cfg.jezyk !== 'auto' && TEKSTY[cfg.jezyk] ? cfg.jezyk
  : kodJezyka(hass?.locale?.language || hass?.language || navigator.language);

// „Krok {0} z {1}” → wstawia wartości
export const wstaw = (t, ...a) => String(t ?? '').replace(/\{(\d)\}/g, (_, i) => a[i] ?? '');
