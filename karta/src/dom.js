// Karta „Motor HA – cały dom”: wszystkie urządzenia Motor HA w jednym miejscu (jak lista kafelków HA).
import { IKONY, IKONY_OTW } from './stale.js';
import { STYL_STALY } from './styl.js';
import { TEKSTY, jezyk } from './jezyk.js';

const esc = s => String(s ?? '').replace(/[&<>"]/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]);
const STYL = `
.lista{display:flex;flex-direction:column;gap:4px}
.wiersz{display:flex;align-items:center;gap:10px;min-height:48px}
.wiersz .opis{cursor:pointer}
.male{display:flex;gap:6px}
.male button{width:36px;height:36px;border:none;border-radius:var(--ha-border-radius-md,8px);cursor:pointer;color:var(--primary-text-color);
 background:color-mix(in srgb,var(--disabled-color,#bdbdbd) 20%,transparent);display:flex;align-items:center;justify-content:center}
.male ha-icon{--mdc-icon-size:20px;display:flex}
.tytul{font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color);padding:4px 4px 0}`;

export class MotorHaDom extends HTMLElement {
  setConfig(cfg) { this._cfg = cfg || {}; this._klucz = null; }
  static getStubConfig() { return {}; }
  getCardSize() { return 1 + (this._ile || 3); }
  getGridOptions() { return { columns: 12, min_columns: 6, rows: 'auto' }; }
  set hass(h) { this._hass = h; this._rysuj(); }

  _urzadzenia() {
    const s = this._hass.states;
    return Object.keys(s).filter(e => e.startsWith('cover.') && s[e].attributes?.motor_ha && typeof s[e].attributes.motor_ha === 'object')
      .filter(e => !this._cfg.entities || this._cfg.entities.includes(e))
      .sort((a, b) => String(s[a].attributes.friendly_name).localeCompare(String(s[b].attributes.friendly_name)));
  }

  _rysuj() {
    const h = this._hass; if (!h || !this._cfg) return;
    const T = TEKSTY[jezyk(this._cfg, h)], lista = this._urzadzenia(), root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    this._ile = lista.length;
    const klucz = lista.join() + T.karta.dom;
    if (klucz !== this._klucz) {
      this._klucz = klucz;
      root.innerHTML = `<style>${STYL_STALY}${STYL}</style><ha-card><div class="mh">
        <div class="tytul">${esc(this._cfg.title ?? T.karta.dom)}</div>
        ${lista.length ? `<div class="lista">${lista.map(e => `<div class="wiersz" data-e="${e}"><div class="ik"><ha-icon></ha-icon></div>
          <div class="opis"><span class="nazwa"></span><span class="stan"></span></div>
          <div class="male"><button data-u="open_cover" title="${esc(T.karta.otworz)}"><ha-icon icon="mdi:arrow-up"></ha-icon></button>
          <button data-u="stop_cover" title="${esc(T.karta.stop)}"><ha-icon icon="mdi:stop"></ha-icon></button>
          <button data-u="close_cover" title="${esc(T.karta.zamknij)}"><ha-icon icon="mdi:arrow-down"></ha-icon></button></div></div>`).join('')}</div>`
          : `<div class="brak">${esc(T.karta.domBrak)}</div>`}
      </div></ha-card>`;
      root.querySelectorAll('.wiersz').forEach(w => {
        const e = w.dataset.e;
        w.querySelector('.opis').addEventListener('click', () => this.dispatchEvent(new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: e } })));
        w.querySelectorAll('button').forEach(b => b.addEventListener('click', () => this._hass.callService('cover', b.dataset.u, { entity_id: e })));
      });
    }
    root.querySelectorAll('.wiersz').forEach(w => {
      const st = h.states[w.dataset.e]; if (!st) return;
      const m = st.attributes.motor_ha, typ = m.oslona, otw = st.state !== 'closed';
      const czesci = [h.formatEntityState ? h.formatEntityState(st) : st.state];
      const p = st.attributes.current_position;
      if (typeof p === 'number' && p > 0 && p < 100) czesci.push(`${p} %`);
      const ps = m.encje?.powod && h.states[m.encje.powod];
      if (ps && !['brak', 'wylaczona', 'unavailable', 'unknown'].includes(ps.state)) czesci.push(h.formatEntityState ? h.formatEntityState(ps) : ps.state);
      w.querySelector('.nazwa').textContent = st.attributes.friendly_name || w.dataset.e;
      w.querySelector('.stan').textContent = czesci.join(' · ');
      w.querySelector('.ik ha-icon').setAttribute('icon', (otw ? IKONY_OTW[typ] : null) || IKONY[typ] || 'mdi:window-shutter');
      w.querySelector('.ik').style.setProperty('--mh-kolor', otw ? 'var(--state-cover-active-color,var(--state-active-color,var(--primary-color)))' : 'var(--state-cover-inactive-color,var(--state-inactive-color,var(--disabled-color)))');
    });
  }
}
