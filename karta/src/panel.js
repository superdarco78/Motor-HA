// Panel „Motor HA” w pasku bocznym (włączany na pierwszym ekranie): wszystkie okna z kartami, powód ostatniego ruchu,
// link do historii ruchów i przycisk do ustawień Motor HA (pierwszy ekran).
import { TEKSTY, jezyk } from './jezyk.js';
import { otworzEkran } from './ekran.js';

const esc = s => String(s ?? '').replace(/[&<>"]/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]);
const STYL = `
:host{display:block;min-height:100%;background:var(--primary-background-color);color:var(--primary-text-color);font-family:var(--ha-font-family-body,Roboto,Noto,sans-serif)}
.pasek{display:flex;align-items:center;gap:4px;height:var(--header-height,56px);padding:0 12px 0 4px;background:var(--app-header-background-color,var(--primary-color));
 color:var(--app-header-text-color,#fff);border-bottom:var(--app-header-border-bottom,none);position:sticky;top:0;z-index:2}
.pasek h1{font-size:var(--ha-font-size-xl,20px);font-weight:var(--ha-font-weight-normal,400);margin:0 0 0 12px;flex:1}
.pasek button{font:inherit;font-size:14px;font-weight:500;border:0;border-radius:18px;padding:8px 14px;cursor:pointer;background:rgba(255,255,255,.16);color:inherit}
.siatka{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:16px;padding:16px;max-width:1500px;margin:0 auto}
.okno{display:grid;gap:6px;align-content:start}
.info{display:flex;justify-content:space-between;gap:8px;font-size:13px;color:var(--secondary-text-color);padding:0 4px}
.info a{color:var(--primary-color);text-decoration:none;font-weight:500;white-space:nowrap}
.pusto{padding:32px 16px;text-align:center;display:grid;gap:12px;justify-items:center;color:var(--secondary-text-color)}
.pusto button{font:inherit;font-size:14px;font-weight:500;border:0;border-radius:20px;padding:10px 20px;cursor:pointer;background:var(--primary-color);color:var(--text-primary-color,#fff)}`;

export class MotorHaPanel extends HTMLElement {
  set hass(h) { this._hass = h; this._rysuj(); }
  get hass() { return this._hass; }
  set narrow(n) { this._narrow = n; if (this._menu) this._menu.narrow = n; }
  set panel(p) { this._panel = p; }

  _okna() {
    const h = this._hass;
    return Object.values(h.entities || {}).filter(e => e.platform === 'motor_ha' && e.entity_id.startsWith('cover.') && h.states[e.entity_id])
      .map(e => e.entity_id)
      .sort((a, b) => String(h.states[a].attributes.friendly_name).localeCompare(String(h.states[b].attributes.friendly_name)));
  }

  _rysuj() {
    const h = this._hass; if (!h) return;
    const T = TEKSTY[jezyk({}, h)], P = T.panel, root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    const okna = this._okna(), klucz = okna.join() + P.tytul;
    if (klucz !== this._klucz) {
      this._klucz = klucz;
      root.innerHTML = `<style>${STYL}</style><div class="pasek"><span id="menu"></span><h1>Motor HA</h1>
        ${h.user?.is_admin ? `<button id="ust">⚙ ${esc(P.ustawienia)}</button>` : ''}</div>
        ${okna.length ? `<div class="siatka">${okna.map(e => `<div class="okno" data-e="${e}"><div class="k"></div>
          <div class="info"><span class="powod"></span><a href="/logbook?entity_id=${encodeURIComponent(e)}">${esc(P.historia)}</a></div></div>`).join('')}</div>`
          : `<div class="pusto"><span>${esc(P.brak)}</span>${h.user?.is_admin ? `<button id="dodaj">${esc(P.dodaj)}</button>` : ''}</div>`}`;
      if (customElements.get('ha-menu-button')) {
        this._menu = document.createElement('ha-menu-button');
        this._menu.narrow = this._narrow; root.querySelector('#menu').appendChild(this._menu);
      }
      root.querySelector('#ust')?.addEventListener('click', () => otworzEkran(this._hass));
      root.querySelector('#dodaj')?.addEventListener('click', () => {
        history.pushState(null, '', '/config/integrations/dashboard/add?domain=motor_ha');
        window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } }));
      });
      this._karty = [...root.querySelectorAll('.okno')].map(o => {
        const k = document.createElement('motor-ha');
        k.setConfig({ type: 'custom:motor-ha', entity: o.dataset.e });
        o.querySelector('.k').appendChild(k);
        return [o, k];
      });
    }
    if (this._menu) this._menu.hass = h;
    for (const [o, k] of this._karty || []) {
      k.hass = h;
      const m = h.states[o.dataset.e]?.attributes?.motor_ha, ps = m?.encje?.powod && h.states[m.encje.powod];
      o.querySelector('.powod').textContent = ps ? `${P.powod}: ${h.formatEntityState ? h.formatEntityState(ps) : ps.state}` : '';
    }
  }
}
