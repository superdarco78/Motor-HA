// Edytor karty Motor HA: 7 kroków z kółkami (te same co w kreatorze integracji), w każdym „Co” i „Po co”.
// Pola to zwykłe pola Home Assistanta (ha-form), więc wyglądają i działają jak w HA.
import { DOMYSLNE, GRUPY, IKONY, IKONY_GRUP, KOLORY, RAMY, hex, ramaHex } from './stale.js';
import { KLUCZE_PANELU } from './karta.js';
import { TEKSTY, NAZWY_JEZYKOW, jezyk, wstaw } from './jezyk.js';
import { czasPrzejazdu, nauczony } from './ruch.js';
import { obroty, czujnikiOkna, encjaPogody } from './wykryj.js';

export const KROKI = [
  ['urzadzenie', 'mdi:window-shutter-cog'], ['oslona', 'mdi:roller-shade'], ['kolory', 'mdi:palette'], ['okno', 'mdi:window-closed-variant'],
  ['czujniki', 'mdi:window-open-variant'], ['silnik', 'mdi:speedometer'], ['pogoda', 'mdi:weather-partly-cloudy']
];
const esc = s => String(s ?? '').replace(/[&<>"]/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]);
const doHex = v => Array.isArray(v) && v.length === 3 ? '#' + v.map(x => (+x).toString(16).padStart(2, '0')).join('') : null;
const zHex = h => { const s = String(h).replace('#', ''); return s.length === 6 ? [0, 2, 4].map(i => parseInt(s.slice(i, i + 2), 16)) : undefined; };

const STYL = `
:host{display:block}
.ed{display:flex;flex-direction:column;gap:var(--ha-space-4,16px)}
/* pasek kroków: kółka 40 px, podpisy pod spodem */
.pasek{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));position:relative;padding-top:2px}
.pasek::before{content:"";position:absolute;left:7%;right:7%;top:22px;height:2px;background:var(--divider-color)}
.kr{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;border:0;background:none;padding:0;cursor:pointer;font:inherit;
 color:var(--secondary-text-color);-webkit-tap-highlight-color:transparent}
.kr .k{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;box-sizing:border-box;
 background:var(--card-background-color,var(--ha-card-background));box-shadow:inset 0 0 0 1px var(--divider-color);color:var(--secondary-text-color);transition:background .15s}
.kr .k ha-icon{--mdc-icon-size:22px;display:flex}
.kr.zrob .k{background:color-mix(in srgb,var(--primary-color) 20%,var(--card-background-color,#fff));box-shadow:none;color:var(--primary-color)}
.kr.on .k{background:var(--primary-color);box-shadow:none;color:var(--text-primary-color,#fff)}
.kr .p{font-size:var(--ha-font-size-s,12px);line-height:1.25;text-align:center;max-width:100%;overflow-wrap:anywhere}
.kr.on .p{color:var(--primary-color);font-weight:var(--ha-font-weight-medium,500)}
.kr:focus-visible .k{outline:2px solid var(--primary-color);outline-offset:2px}
/* tytuł kroku */
.tyt{display:flex;align-items:center;gap:12px}
.tyt .k{flex:none;display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;box-sizing:border-box;
 border:2px solid var(--accent-color);color:var(--primary-color)}
.tyt .k ha-icon{--mdc-icon-size:24px;display:flex}
.tyt h3{margin:0;font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color);line-height:1.3}
.tyt small{display:block;font-size:var(--ha-font-size-s,12px);color:var(--secondary-text-color);font-weight:var(--ha-font-weight-normal,400)}
.cp{margin:0;display:flex;flex-direction:column;gap:4px;font-size:var(--ha-font-size-m,14px);line-height:1.45;
 color:color-mix(in srgb,var(--primary-text-color) 80%,var(--secondary-text-color))}
.cp b{color:var(--accent-color);font-weight:var(--ha-font-weight-medium,500)}
/* ramka informacji jak ha-alert info */
.info{display:flex;gap:12px;align-items:flex-start;padding:8px 12px;border-radius:var(--ha-border-radius-sm,4px);font-size:var(--ha-font-size-m,14px);line-height:1.4;
 background:color-mix(in srgb,var(--info-color,#039be5) 12%,transparent);color:var(--primary-text-color)}
.info ha-icon{flex:none;color:var(--info-color,#039be5);--mdc-icon-size:22px;display:flex}
/* rodzaje osłon: kafelki jak w HA */
.gr{display:flex;align-items:center;gap:8px;margin:8px 0 4px;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color)}
.gr ha-icon{--mdc-icon-size:20px;color:var(--primary-color);display:flex}
.pg{margin:8px 0 6px;font-size:var(--ha-font-size-s,12px);color:var(--secondary-text-color);text-transform:uppercase;letter-spacing:.6px}
.kafle{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.kaf{display:flex;align-items:center;gap:10px;min-height:48px;padding:6px 10px;box-sizing:border-box;text-align:left;cursor:pointer;font:inherit;
 font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);line-height:1.25;color:var(--primary-text-color);
 background:var(--card-background-color,var(--ha-card-background));border:1px solid var(--divider-color);border-radius:var(--ha-card-border-radius,12px)}
.kaf:hover{background:color-mix(in srgb,var(--primary-text-color) 4%,var(--card-background-color,#fff))}
.kaf .i{flex:none;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;
 background:color-mix(in srgb,var(--primary-color) 20%,transparent);color:var(--primary-color)}
.kaf .i ha-icon{--mdc-icon-size:20px;display:flex}
.kaf[aria-pressed="true"]{border:2px solid var(--primary-color);padding:5px 9px;background:color-mix(in srgb,var(--primary-color) 10%,var(--card-background-color,#fff))}
/* próbki kolorów */
.probki{display:grid;grid-template-columns:repeat(auto-fill,minmax(40px,1fr));gap:8px;justify-items:center}
.pr{width:36px;height:36px;border-radius:50%;border:0;padding:0;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.pr[aria-pressed="true"]{box-shadow:0 0 0 2px var(--card-background-color,#fff),0 0 0 4px var(--accent-color)}
.wyb{margin:6px 0 0;font-size:var(--ha-font-size-m,14px);color:var(--secondary-text-color)}
.wyb b{color:var(--primary-text-color);font-weight:var(--ha-font-weight-medium,500)}
h4{margin:8px 0 0;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color)}
/* przyciski jak ha-button */
.nav{display:flex;justify-content:space-between;gap:8px}
.bt{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:40px;padding:0 16px;border-radius:var(--ha-border-radius-pill,9999px);border:0;cursor:pointer;
 font:inherit;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);-webkit-tap-highlight-color:transparent;
 background:var(--ha-color-fill-primary-loud-resting,var(--primary-color));color:var(--ha-color-on-primary-loud,var(--text-primary-color,#fff))}
.bt:hover{filter:brightness(1.08)}
.bt.dr{background:transparent;color:var(--primary-color)}
.bt.dr:hover{background:color-mix(in srgb,var(--primary-color) 8%,transparent);filter:none}
.bt[hidden]{visibility:hidden}
.bt ha-icon{--mdc-icon-size:18px;display:flex}
`;

export class MotorHaEdytor extends HTMLElement {
  setConfig(c) { this._cfg = { ...c }; this._rysuj(); }
  set hass(h) {
    const pierwszy = !this._hass;
    this._hass = h;
    if (pierwszy) this._rysuj(); else this._forma?.forEach(f => { f.hass = h; });
  }
  get _T() { return TEKSTY[this._jez]; }
  _urz() { return this._hass?.states?.[this._cfg?.entity]?.attributes?.okno_ha; }
  _w(k) { return this._cfg[k] ?? DOMYSLNE[k]; }

  // zmiana: karta na panelu dostaje tylko encję, a ustawienia okna z integracji zapisują się w urządzeniu
  _zmien(zmiany, przerysuj = true) {
    const c = { ...this._cfg };
    for (const [k, v] of Object.entries(zmiany)) {
      if (v === undefined || v === '' || v === null || (v === DOMYSLNE[k] && !this._urz())) delete c[k]; else c[k] = v;
    }
    this._cfg = c;
    const urz = this._urz();
    const doPanelu = urz ? Object.fromEntries(Object.entries(c).filter(([k]) => KLUCZE_PANELU.includes(k))) : c;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: doPanelu }, bubbles: true, composed: true }));
    if (urz) {
      clearTimeout(this._zapis);
      this._zapis = setTimeout(() => this._hass.callWS({ type: 'okno_ha/zapisz', entity_id: c.entity, karta: c })
        .catch(e => console.warn('Motor HA: nie zapisałem ustawień w urządzeniu', e)), 500);
    }
    if (przerysuj) this._rysuj();
  }

  _rysuj() {
    if (!this._hass || !this._cfg) return;
    // okno z integracji: edytor startuje z ustawieniami zapisanymi w urządzeniu
    const urz = this._urz();
    if (urz && this._wczytane !== this._cfg.entity) {
      this._wczytane = this._cfg.entity;
      this._cfg = { ...urz, ...this._cfg };
      delete this._cfg.type; this._cfg.type = 'custom:okno-ha';
    }
    this._jez = jezyk(this._cfg, this._hass);
    const T = this._T, n = this._krok ?? 0, [kl, ik] = KROKI[n], K = T.kroki[kl];
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${STYL}</style><div class="ed">
<div class="pasek" role="tablist">${KROKI.map(([k, i], j) => `<button class="kr${j === n ? ' on' : j < n ? ' zrob' : ''}" data-k="${j}" role="tab" aria-selected="${j === n}" title="${esc(T.kroki[k].t)}">
 <span class="k"><ha-icon icon="${i}"></ha-icon></span><span class="p">${esc(T.kroki[k].t)}</span></button>`).join('')}</div>
<div class="tyt"><span class="k"><ha-icon icon="${ik}"></ha-icon></span><h3>${esc(K.t)}<small>${esc(wstaw(T.ui.krok, n + 1, KROKI.length))}</small></h3></div>
<p class="cp"><span><b>${esc(T.ui.co)}</b> ${esc(K.co)}</span><span><b>${esc(T.ui.poco)}</b> ${esc(K.poco)}</span></p>
<div class="tresc"></div>
<div class="nav"><button class="bt dr" data-n="-1" ${n ? '' : 'hidden'}><ha-icon icon="mdi:chevron-left"></ha-icon>${esc(T.ui.wstecz)}</button>
 <button class="bt" data-n="1" ${n < KROKI.length - 1 ? '' : 'hidden'}>${esc(T.ui.dalej)}<ha-icon icon="mdi:chevron-right"></ha-icon></button></div></div>`;
    root.querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => { this._krok = +b.dataset.k; this._rysuj(); }));
    root.querySelectorAll('[data-n]').forEach(b => b.addEventListener('click', () => { this._krok = Math.max(0, Math.min(KROKI.length - 1, n + +b.dataset.n)); this._rysuj(); }));
    this._forma = [];
    this['_' + kl](root.querySelector('.tresc'));
  }

  // pole formularza Home Assistanta
  _formularz(box, schemat, dane) {
    const f = document.createElement('ha-form');
    f.hass = this._hass; f.schema = schemat; f.data = dane;
    f.computeLabel = s => this._T.pola[s.name] ?? s.name;
    f.computeHelper = s => this._T.pomoc[s.name];
    f.addEventListener('value-changed', e => {
      const v = e.detail.value, zm = {};
      for (const s of schemat.flatMap(x => x.schema || [x])) if (s.name) zm[s.name] = v[s.name];
      this._zmianaFormularza(zm);
    });
    box.appendChild(f); this._forma.push(f);
    return f;
  }
  _zmianaFormularza(zm) {
    if ('kolor_wlasny' in zm) { const h = doHex(zm.kolor_wlasny); delete zm.kolor_wlasny; if (h) zm.kolor = h; }
    if ('rama_wlasna' in zm) { const h = doHex(zm.rama_wlasna); delete zm.rama_wlasna; if (h) zm.rama = h; }
    if ('skrzydla' in zm) zm.skrzydla = +zm.skrzydla;
    if ('czas' in zm) zm.czas = +zm.czas > 0 ? +zm.czas : 'auto';
    if ('pogoda' in zm && !zm.pogoda) zm.pogoda = 'auto';
    const struktura = ['entity', 'skrzydla', 'auto_czujniki', 'jezyk', 'kolor', 'rama'].some(k => k in zm && zm[k] !== this._cfg[k]);
    this._zmien(zm, struktura);
  }
  _info(box, txt, ikona = 'mdi:information-outline') {
    box.insertAdjacentHTML('beforeend', `<div class="info"><ha-icon icon="${ikona}"></ha-icon><span>${esc(txt)}</span></div>`);
  }

  // ── kroki ──
  _urzadzenie(box) {
    this._formularz(box, [{ name: 'entity', required: true, selector: { entity: { domain: 'cover' } } }, { name: 'name', selector: { text: {} } }],
      { entity: this._cfg.entity, name: this._cfg.name });
    this._info(box, this._urz() ? this._T.ui.wUrzadzeniu : this._T.ui.bezUrzadzenia, this._urz() ? 'mdi:check-circle-outline' : 'mdi:information-outline');
  }

  _oslona(box) {
    const T = this._T, wyb = this._w('oslona');
    for (const [g, pod] of Object.entries(GRUPY)) {
      box.insertAdjacentHTML('beforeend', `<div class="gr"><ha-icon icon="${IKONY_GRUP[g]}"></ha-icon>${esc(T.grupy[g])}</div>`);
      for (const [p, typy] of Object.entries(pod)) {
        box.insertAdjacentHTML('beforeend', `<div class="pg">${esc(T.grupy[p])}</div><div class="kafle">${typy.map(t =>
          `<button class="kaf" data-t="${t}" aria-pressed="${t === wyb}"><span class="i"><ha-icon icon="${IKONY[t]}"></ha-icon></span>${esc(T.oslony[t])}</button>`).join('')}</div>`);
      }
    }
    box.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => this._zmien({ oslona: b.dataset.t })));
  }

  _kolory(box) {
    const T = this._T, k = this._w('kolor'), r = ramaHex(this._w('rama'));
    const nazwaK = KOLORY[k] ? T.kolory[k] : hex(k), nazwaR = RAMY[r] ? T.ramy[RAMY[r][0]] : r;
    box.insertAdjacentHTML('beforeend', `<h4>${esc(T.pola.kolor)}</h4><div class="probki">${Object.entries(KOLORY).map(([kk, h]) =>
      `<button class="pr" data-kolor="${kk}" style="background:${h}" title="${esc(T.kolory[kk])}" aria-label="${esc(T.kolory[kk])}" aria-pressed="${kk === k}"></button>`).join('')}</div>
      <p class="wyb">${esc(T.ui.wybrany)} <b>${esc(nazwaK)}</b></p>`);
    this._formularz(box, [{ name: 'kolor_wlasny', selector: { color_rgb: {} } }], { kolor_wlasny: KOLORY[k] ? undefined : zHex(hex(k)) });
    box.insertAdjacentHTML('beforeend', `<h4>${esc(T.pola.rama)}</h4><div class="probki">${Object.entries(RAMY).map(([h, [kk]]) =>
      `<button class="pr" data-rama="${h}" style="background:${h}" title="${esc(T.ramy[kk])}" aria-label="${esc(T.ramy[kk])}" aria-pressed="${h === r}"></button>`).join('')}</div>
      <p class="wyb">${esc(T.ui.wybrany)} <b>${esc(nazwaR)}</b></p>`);
    this._formularz(box, [{ name: 'rama_wlasna', selector: { color_rgb: {} } }], { rama_wlasna: RAMY[r] ? undefined : zHex(r) });
    box.querySelectorAll('[data-kolor]').forEach(b => b.addEventListener('click', () => this._zmien({ kolor: b.dataset.kolor })));
    box.querySelectorAll('[data-rama]').forEach(b => b.addEventListener('click', () => this._zmien({ rama: b.dataset.rama })));
  }

  _okno(box) {
    const T = this._T, dwa = +this._w('skrzydla') !== 1;
    const opcje = o => ({ select: { mode: 'dropdown', options: o.map(([value, label]) => ({ value, label })) } });
    this._formularz(box, [
      { name: 'skrzydla', selector: opcje([['1', T.ui.jedno], ['2', T.ui.dwa]]) },
      { name: 'wysokosc', selector: { number: { min: 140, max: 460, step: 10, mode: 'slider', unit_of_measurement: 'px' } } },
      ...(dwa ? [{ type: 'grid', name: '', schema: [{ name: 'roleta_lewa', selector: { entity: { domain: 'cover' } } }, { name: 'roleta_prawa', selector: { entity: { domain: 'cover' } } }] }]
        : [{ name: 'roleta_lewa', selector: { entity: { domain: 'cover' } } }]),
      { name: 'odwroc', selector: { boolean: {} } },
      ...(dwa ? [{ name: 'osobno', selector: { boolean: {} } }] : [])
    ], { skrzydla: String(dwa ? 2 : 1), wysokosc: +this._w('wysokosc'), roleta_lewa: this._cfg.roleta_lewa, roleta_prawa: this._cfg.roleta_prawa, odwroc: !!this._w('odwroc'), osobno: !!this._w('osobno') });
    box.insertAdjacentHTML('beforeend', `<h4>${esc(T.ui.sterowanie)}</h4>`);
    this._formularz(box, [
      { name: 'przyciski', selector: { boolean: {} } }, { name: 'suwak', selector: { boolean: {} } },
      { name: 'pozycje', selector: { text: {} } }, { name: 'wibracja', selector: { boolean: {} } }
    ], { przyciski: this._w('przyciski') !== false, suwak: this._w('suwak') !== false, pozycje: this._cfg.pozycje || '', wibracja: this._w('wibracja') !== false });
  }

  _czujniki(box) {
    const T = this._T, h = this._hass, dwa = +this._w('skrzydla') !== 1, auto = this._w('auto_czujniki') !== false ? czujnikiOkna(h, this._cfg.roleta_lewa || this._cfg.entity) : [];
    const tryb = { select: { mode: 'dropdown', options: [{ value: 'uchyl', label: T.ui.uchyl }, { value: 'otworz', label: T.ui.otworz }] } };
    const czujnik = { entity: { domain: 'binary_sensor', device_class: ['window', 'door', 'opening'] } };
    this._formularz(box, [
      { name: 'auto_czujniki', selector: { boolean: {} } },
      { type: 'grid', name: '', schema: [{ name: 'czujnik_lewe', selector: czujnik }, { name: 'tryb_lewe', selector: tryb }] },
      ...(dwa ? [{ type: 'grid', name: '', schema: [{ name: 'czujnik_prawe', selector: czujnik }, { name: 'tryb_prawe', selector: tryb }] }] : [])
    ], { auto_czujniki: this._w('auto_czujniki') !== false, czujnik_lewe: this._cfg.czujnik_lewe, czujnik_prawe: this._cfg.czujnik_prawe, tryb_lewe: this._w('tryb_lewe'), tryb_prawe: this._w('tryb_prawe') });
    const znalezione = auto.filter(Boolean).map(e => h.states[e]?.attributes?.friendly_name || e);
    this._info(box, znalezione.length ? wstaw(T.ui.znalezione, znalezione.join(', ')) : T.ui.brakCzujnikow);
  }

  _silnik(box) {
    const T = this._T, h = this._hass, e = this._cfg.roleta_lewa || (h.states[this._cfg.entity]?.attributes?.entity_id || [])[0] || this._cfg.entity;
    const liczba = { entity: { domain: 'number' } };
    this._formularz(box, [
      { type: 'grid', name: '', schema: [{ name: 'predkosc_lewa', selector: liczba }, ...(+this._w('skrzydla') !== 1 ? [{ name: 'predkosc_prawa', selector: liczba }] : [])] },
      { name: 'czas', selector: { number: { min: 0, max: 120, step: 1, mode: 'slider', unit_of_measurement: 's' } } }
    ], { predkosc_lewa: this._cfg.predkosc_lewa, predkosc_prawa: this._cfg.predkosc_prawa, czas: +this._cfg.czas > 0 ? +this._cfg.czas : 0 });
    const rpm = obroty(h, e, this._cfg.predkosc_lewa), s = czasPrzejazdu(this._cfg.czas, rpm, e).toFixed(1);
    this._info(box, +this._cfg.czas > 0 ? wstaw(T.ui.czasReczny, s) : rpm > 0 ? wstaw(T.ui.czasZPredkosci, s, rpm) : nauczony(e) ? wstaw(T.ui.czasNauczony, s) : wstaw(T.ui.czasDomyslny, s));
  }

  _pogoda(box) {
    const T = this._T, h = this._hass;
    this._formularz(box, [
      { name: 'niebo', selector: { boolean: {} } },
      { name: 'pogoda', selector: { entity: { domain: 'weather' } } },
      { name: 'widok', selector: { boolean: {} } },
      { name: 'jezyk', selector: { select: { mode: 'dropdown', options: [{ value: 'auto', label: T.ui.jezykAuto }, ...Object.entries(NAZWY_JEZYKOW).map(([value, label]) => ({ value, label }))] } } }
    ], { niebo: this._w('niebo') !== false, pogoda: this._cfg.pogoda && this._cfg.pogoda !== 'auto' ? this._cfg.pogoda : undefined, widok: this._w('widok') !== false, jezyk: this._w('jezyk') });
    const w = encjaPogody(h, this._cfg.pogoda);
    this._info(box, w ? wstaw(T.ui.pogodaZ, h.states[w]?.attributes?.friendly_name || w) : T.ui.pogodaInternet);
  }
}
