// Motor HA – karta okna z osłoną. Rejestruje kartę i edytor (typ custom:motor-ha; stare typy z dawnych paneli działają dalej, ale nie ma ich na liście kart).
import { WERSJA, GRUPY, IKONY, KOLORY } from './stale.js';
import { MotorHaKarta } from './karta.js';
import { MotorHaEdytor, KROKI } from './edytor.js';
import { TEKSTY, kodJezyka } from './jezyk.js';
import { MotorHaDom } from './dom.js';
import { MotorHaSymulator } from './symulator.js';

const ELEMENTY = [
  ['motor-ha', MotorHaKarta], ['okno-ha', class extends MotorHaKarta {}],
  ['motor-ha-editor', MotorHaEdytor], ['okno-ha-editor', class extends MotorHaEdytor {}],
  ['motor-ha-dom', MotorHaDom], ['motor-ha-symulator', MotorHaSymulator],   // symulator tylko dla opisu w HACS
  ['roleta-realistyczna', class extends MotorHaKarta {}], ['roleta-realistyczna-editor', class extends MotorHaEdytor {}]
];
// HA w trakcie startu potrafi podmienić rejestr elementów (window.customElements). Karta wczytana wcześniej
// zniknęłaby wtedy z nowego rejestru („Błąd konfiguracji”), więc przez pierwsze 30 s pilnujemy, czy nadal tam jest.
const rejestruj = (kopia) => {
  for (const [nazwa, klasa] of ELEMENTY) {
    if (customElements.get(nazwa)) continue;
    try { customElements.define(nazwa, kopia ? class extends klasa {} : klasa); } catch (e) { console.warn('Motor HA: nie zarejestrowałem', nazwa, e); }
  }
};
rejestruj(false);
let rejestr = window.customElements;
const straz = setInterval(() => { if (window.customElements !== rejestr || !customElements.get('motor-ha')) { rejestr = window.customElements; rejestruj(true); } }, 50);
setTimeout(() => clearInterval(straz), 30000);

const T = TEKSTY[kodJezyka(document.documentElement.lang || navigator.language)];
window.customCards = window.customCards || [];
// plik może się wczytać dwa razy (ładowacz + opis w HACS) – na liście „Dodaj kartę” zawsze jedna pozycja
for (let i = window.customCards.length - 1; i >= 0; i--) if (['motor-ha', 'motor-ha-dom', 'okno-ha', 'roleta-realistyczna'].includes(window.customCards[i]?.type)) window.customCards.splice(i, 1);
window.customCards.push({
  type: 'motor-ha', name: T.nazwa, description: T.opis, preview: true,
  documentationURL: 'https://github.com/superdarco78/Motor-HA',
  // „Dodaj do panelu” na stronie urządzenia proponuje kartę Motor HA dla okien i osłon
  getEntitySuggestion: (hass, entityId) => String(entityId).startsWith('cover.') ? { label: T.nazwa, config: { type: 'custom:motor-ha', entity: entityId } } : null
});
window.customCards.push({ type: 'motor-ha-dom', name: T.karta.dom, description: T.karta.domOpis, preview: true,
  documentationURL: 'https://github.com/superdarco78/Motor-HA' });

// dane dla opisu w HACS (żywa symulacja): rodzaje osłon, kroki i teksty w każdym języku
window.__motorHa = { wersja: WERSJA, grupy: GRUPY, ikony: IKONY, kolory: KOLORY, kroki: KROKI, teksty: TEKSTY };

console.info(`%c Motor HA %c ${WERSJA} `, 'background:#009ac7;color:#fff;border-radius:3px 0 0 3px;padding:1px 4px', 'background:#ff9800;color:#fff;border-radius:0 3px 3px 0;padding:1px 4px');
