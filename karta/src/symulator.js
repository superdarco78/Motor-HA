// Żywa symulacja w opisie w HACS: jedna karta Motor HA na udawanej osłonie i przyciski pory dnia, pogody, rodzaju i koloru.
// Działa tylko we własnej ramce (iframe) postawionej przez motor-ha-hacs.js. Nic nie rusza prawdziwych urządzeń.
// W ramce nie ma elementów HA (ha-card, ha-icon) – karta dostaje styl przez arkusz cienia, a ikony rysuje ten plik sam
// jako SVG, bez rejestrowania jakichkolwiek elementów ha-*.
import { GRUPY, IKONY, KOLORY } from './stale.js';
import { TEKSTY, jezyk as jezykZ } from './jezyk.js';
import { MDI } from './ikony_mdi.js';
import { ikUI, STYL_IKU } from './ikony_ui.js';

const ENCJA = 'cover.motor_ha_podglad';
const PORY = ['dzien', 'zloto', 'zmierzch', 'noc'];
const IKONY_POR = { dzien: 'mdi:white-balance-sunny', zloto: 'mdi:weather-sunset', zmierzch: 'mdi:weather-sunset', noc: 'mdi:weather-night' };
const POGODY = { sunny: 'mdi:weather-sunny', partlycloudy: 'mdi:weather-partly-cloudy', cloudy: 'mdi:weather-cloudy', rainy: 'mdi:weather-rainy',
  'lightning-rainy': 'mdi:weather-lightning-rainy', snowy: 'mdi:weather-snowy', fog: 'mdi:weather-fog' };
const POGODY_EN = { sunny: 'Sunny', partlycloudy: 'Partly cloudy', cloudy: 'Cloudy', rainy: 'Rainy', 'lightning-rainy': 'Lightning, rainy', snowy: 'Snowy', fog: 'Fog' };
const BARWY = ['grafit', 'bialy', 'kremowy', 'piaskowy', 'szary', 'mokka', 'granat', 'morski', 'oliwka', 'terakota', 'bordo'];
const RAMA = { bialy: 'antracyt', kremowy: 'antracyt', piaskowy: 'antracyt' };
const esc = s => String(s ?? '').replace(/[&<>"]/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]);
export const svgIkony = (n, r = 18) => `<svg viewBox="0 0 24 24" width="${r}" height="${r}" aria-hidden="true"><path d="${MDI[n] || ''}"/></svg>`;

const ZAMIENNIKI = `ha-card{display:block;background:var(--ha-card-background,var(--card-background-color,#fff));color:var(--primary-text-color);
 border-radius:var(--ha-card-border-radius,12px);border:var(--ha-card-border-width,1px) solid var(--ha-card-border-color,var(--divider-color,#e0e0e0));
 box-shadow:var(--ha-card-box-shadow,none)}
ha-icon{display:inline-flex}ha-icon svg{width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:currentColor;display:block}`;

const STYL = `:host{display:block;font-family:var(--ha-font-family-body,Roboto,sans-serif);color:var(--primary-text-color)}
.s{display:grid;grid-template-columns:minmax(0,400px) minmax(0,1fr);gap:16px;align-items:start}
@media (max-width:640px){.s{grid-template-columns:1fr}}
.k{min-width:0}
.t{margin:0 0 4px;font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500)}
.w{margin:0 0 12px;font-size:var(--ha-font-size-m,14px);line-height:1.5;color:var(--secondary-text-color)}
.r{margin:0 0 12px}
.l{margin:0 0 6px;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500)}
.g{margin:8px 0 4px;font-size:var(--ha-font-size-s,12px);color:var(--secondary-text-color)}
.c{display:flex;flex-wrap:wrap;gap:8px}
button{display:inline-flex;align-items:center;gap:6px;box-sizing:border-box;height:32px;padding:0 12px;margin:0;border-radius:var(--ha-border-radius-md,8px);
 font:inherit;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color);cursor:pointer;
 background:transparent;border:1px solid var(--outline-color,var(--divider-color));-webkit-tap-highlight-color:transparent;outline:0;transition:background-color .15s}
button:hover{background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}
button:focus-visible{box-shadow:0 0 0 2px var(--primary-color)}
button.on{background:color-mix(in srgb,var(--primary-color) 20%,transparent);border-color:transparent}
button svg{fill:var(--primary-color);flex:none}
button .iku{--iku:20px}
.p{width:16px;height:16px;border-radius:50%;flex:none;box-shadow:inset 0 0 0 1px rgba(127,127,127,.5)}`;

export class MotorHaSymulator extends HTMLElement {
  constructor() {
    super();
    this._s = { typ: 'zebra', kolor: 'grafit', pora: 'dzien', pogoda: 'sunny' };
    this._arkusz = null;
    try { this._arkusz = new CSSStyleSheet(); this._arkusz.replaceSync(ZAMIENNIKI); } catch (e) { /* stara przeglądarka – karta bez ramki */ }
  }
  set jezyk(j) { this._jezykOpisu = j; if (this._gora) this._rysuj(); }
  set hass(h) { const pierwszy = !this._gora; this._gora = h; if (pierwszy) this._rysuj(); }

  get _jez() { return jezykZ(this._jezykOpisu ? { jezyk: this._jezykOpisu } : null, this._gora); }

  _pogoda(s) {
    const g = this._gora;
    // nazwy pogody jak w HA, gdy opis jest w języku HA; w innym języku opisu – z zapasu po angielsku
    const z = this._jez === jezykZ(null, g) ? g?.localize?.(`component.weather.entity_component._.state.${s}`) : '';
    return z || POGODY_EN[s];
  }

  _hass() {
    const g = this._gora, s = this._s, teraz = new Date().toISOString(), brama = !!GRUPY.brama && Object.values(GRUPY.brama).flat().includes(s.typ);
    const enc = (id, state, attributes) => ({ entity_id: id, state, attributes, last_changed: teraz, last_updated: teraz, context: { id: '' } });
    const st = Object.assign({}, g.states, {
      [ENCJA]: enc(ENCJA, 'open', { current_position: brama ? 0 : 60, friendly_name: this._T.oslony[s.typ] || 'Motor HA', supported_features: brama ? 3 : 15,
        ...(brama ? { device_class: ['przesuwna', 'skrzydlowa'].includes(s.typ) ? 'gate' : 'garage' } : {}) }),
      'sun.sun': enc('sun.sun', s.pora === 'noc' || s.pora === 'zmierzch' ? 'below_horizon' : 'above_horizon', { elevation: { dzien: 40, zloto: 4, zmierzch: -3, noc: -20 }[s.pora], azimuth: 200 })
    });
    if (brama) st[ENCJA].state = 'closed';
    return Object.assign({}, g, { states: st, callService: () => Promise.resolve(), callWS: () => Promise.resolve(null) });
  }

  _rysuj() {
    const T = this._T = TEKSTY[this._jez], S = T.symulator, s = this._s;
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    const przycisk = (dane, wart, tekst, ikona, kropka) => `<button data-${dane}="${esc(wart)}"${s[dane] === wart ? ' class="on"' : ''}>${kropka || (ikona ? (dane === 'pora' || dane === 'pogoda' ? ikUI(wart, svgIkony(ikona)) : svgIkony(ikona)) : '')}${esc(tekst)}</button>`;
    const rodzaje = Object.entries(GRUPY).map(([g, pod]) => `<div class="g">${esc(T.grupy[g])}</div><div class="c">${Object.values(pod).flat()
      .map(t => przycisk('typ', t, T.oslony[t], IKONY[t])).join('')}</div>`).join('');
    root.innerHTML = `<style>${STYL}${STYL_IKU}</style><div class="s${this._gora?.themes?.darkMode ? ' ciemny' : ''}"><div class="k"></div><div>
<p class="t">${esc(S.tytul)}</p><p class="w">${esc(S.wskazowka)}</p>
<div class="r"><div class="l">${esc(S.pora)}</div><div class="c">${PORY.map(p => przycisk('pora', p, S[p], IKONY_POR[p])).join('')}</div></div>
<div class="r"><div class="l">${esc(S.pogoda)}</div><div class="c">${Object.entries(POGODY).map(([p, i]) => przycisk('pogoda', p, this._pogoda(p), i)).join('')}</div></div>
<div class="r"><div class="l">${esc(S.kolor)}</div><div class="c">${BARWY.map(k => przycisk('kolor', k, T.kolory[k], null, `<span class="p" style="background:${KOLORY[k]}"></span>`)).join('')}</div></div>
<div class="r"><div class="l">${esc(S.rodzaj)}</div>${rodzaje}</div></div></div>`;
    root.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      const [k, v] = Object.entries(b.dataset)[0];
      s[k] = v;
      root.querySelectorAll(`[data-${k}]`).forEach(x => x.classList.toggle('on', x.dataset[k] === v));
      this._karta();
    }));
    this._k = null;
    this._karta();
  }

  _karta() {
    const s = this._s, pole = this.shadowRoot.querySelector('.k');
    if (!this._k) {
      this._k = document.createElement('motor-ha');
      pole.appendChild(this._k);
    }
    this._k.setConfig({ type: 'custom:motor-ha', entity: ENCJA, oslona: s.typ, kolor: s.kolor, rama: RAMA[s.kolor] || 'biala', jezyk: this._jez,
      name: this._T.oslony[s.typ], _podglad: { pogoda: s.pogoda, pora: s.pora } });
    this._k.hass = this._hass();
    this._zamienniki();
  }

  // ha-card i ha-icon nie istnieją w ramce: styl przez arkusz cienia karty, ikony jako SVG w środku (bez rejestrowania elementów)
  _zamienniki() {
    if (customElements.get('ha-icon')) return;
    const r = this._k.shadowRoot;
    if (!r) return;
    if (this._arkusz && !r.adoptedStyleSheets.includes(this._arkusz)) r.adoptedStyleSheets = [...r.adoptedStyleSheets, this._arkusz];
    const wypelnij = () => r.querySelectorAll('ha-icon').forEach(i => {
      const n = i.getAttribute('icon') || '';
      if (i.dataset.mh !== n) { i.dataset.mh = n; i.innerHTML = MDI[n] ? `<svg viewBox="0 0 24 24"><path d="${MDI[n]}"/></svg>` : ''; }
    });
    wypelnij();
    if (!this._obs || this._obsR !== r) {
      this._obs?.disconnect();
      this._obs = new MutationObserver(wypelnij);
      this._obs.observe(r, { subtree: true, childList: true, attributes: true, attributeFilter: ['icon'] });
      this._obsR = r;
    }
  }
}
