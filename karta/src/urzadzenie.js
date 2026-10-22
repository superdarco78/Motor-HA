// Karta Motor HA na stronie urządzenia (Ustawienia → Urządzenia): żywe okno, „Dodaj do panelu”, opis ustawień
// i „Zmień ustawienia”, które otwiera kreator „Konfiguruj” tego urządzenia. Wstawia ją strona.js.
import { TEKSTY, jezyk } from './jezyk.js';

const esc = s => String(s ?? '').replace(/[&<>"]/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]);
const STYL = `
:host{display:block;margin-bottom:var(--ha-space-4,16px)}
[hidden]{display:none!important}
.ramka{background:var(--ha-card-background,var(--card-background-color));border-radius:var(--ha-card-border-radius,12px);
 border:var(--ha-card-border-width,1px) solid var(--ha-card-border-color,var(--divider-color));overflow:hidden;color:var(--primary-text-color)}
.karta{--ha-card-border-width:0;--ha-card-box-shadow:none;--ha-card-border-radius:0}
.stopka{border-top:1px solid var(--divider-color);padding:var(--ha-space-2,8px) var(--ha-space-2,8px);display:flex;flex-wrap:wrap;gap:4px;align-items:center}
.link{background:none;border:none;font:inherit;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);
 color:var(--primary-color);cursor:pointer;padding:0 var(--ha-space-2,8px);line-height:36px;border-radius:var(--ha-border-radius-md,8px)}
.link:hover{background:color-mix(in srgb,var(--primary-color) 10%,transparent)}
.panele{display:flex;flex-wrap:wrap;gap:6px;padding:0 var(--ha-space-2,8px) var(--ha-space-2,8px);width:100%}
.panele button{font:inherit;font-size:var(--ha-font-size-s,13px);border:1px solid var(--divider-color);border-radius:18px;padding:6px 12px;cursor:pointer;
 background:none;color:var(--primary-text-color)}
.panele button:hover{border-color:var(--primary-color);color:var(--primary-color)}
.pyt{width:100%;font-size:var(--ha-font-size-s,13px);color:var(--secondary-text-color)}
.info{font-size:var(--ha-font-size-s,13px);color:var(--secondary-text-color);padding:0 var(--ha-space-2,8px) var(--ha-space-2,8px);width:100%}
.ust{padding:var(--ha-space-4,16px) var(--ha-space-4,16px) var(--ha-space-2,8px)}
.ust h2{margin:0 0 var(--ha-space-2,8px);font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500)}
.wiersz{display:flex;justify-content:space-between;gap:12px;font-size:var(--ha-font-size-m,14px);line-height:28px;border-bottom:1px solid var(--divider-color)}
.wiersz:last-child{border-bottom:none}
.wiersz span:first-child{color:var(--secondary-text-color)}
.wiersz span:last-child{text-align:end}`;

export class MotorHaUrzadzenie extends HTMLElement {
  // cel: { entity: 'cover.x', urzadzenie: 'id', wpis: 'entry_id' } albo { dom: true }
  set cel(c) { this._cel = c; this._zbudowane = false; this._rysuj(); }
  get cel() { return this._cel; }
  set hass(h) { this._hass = h; this._rysuj(); }
  get hass() { return this._hass; }

  _rysuj() {
    const h = this._hass, c = this._cel; if (!h || !c) return;
    const T = TEKSTY[jezyk({}, h)], U = T.urzadzenie, root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    if (!this._zbudowane) {
      this._zbudowane = true;
      root.innerHTML = `<style>${STYL}</style><div class="ramka"><div class="karta"></div>
        <div class="stopka"><button class="link dodaj">${esc(U.dodaj)}</button>${c.wpis ? `<button class="link zmien">⚙ ${esc(U.zmien)}</button>` : ''}
        <div class="panele" hidden></div><div class="info" hidden></div></div>
        ${c.entity ? `<div class="ust" style="border-top:1px solid var(--divider-color)"><h2>${esc(U.ustawienia)}</h2><div class="wiersze"></div></div>` : ''}</div>`;
      const karta = document.createElement(c.entity ? 'motor-ha' : 'motor-ha-dom');
      karta.setConfig(c.entity ? { type: 'custom:motor-ha', entity: c.entity } : { type: 'custom:motor-ha-dom' });
      root.querySelector('.karta').appendChild(karta);
      this._karta = karta;
      root.querySelector('.dodaj').addEventListener('click', () => this._panele());
      root.querySelector('.zmien')?.addEventListener('click', () => konfiguruj(c.wpis));
    }
    this._karta.hass = h;
    if (c.entity) {
      const st = h.states[c.entity], m = st?.attributes?.motor_ha;
      if (!m) return;
      const wiersze = this._wiersze(h, T, U, c, m);
      const klucz = JSON.stringify(wiersze);
      if (klucz !== this._ost) {
        this._ost = klucz;
        root.querySelector('.wiersze').innerHTML = wiersze.map(([a, b]) => `<div class="wiersz"><span>${esc(a)}</span><span>${esc(b)}</span></div>`).join('');
      }
    }
  }

  _wiersze(h, T, U, c, m) {
    const stan = e => (e && h.states[e] ? (h.formatEntityState ? h.formatEntityState(h.states[e]) : h.states[e].state) : null);
    const auto = Object.values(h.entities || {}).find(e => e.device_id === c.urzadzenie && e.platform === 'motor_ha'
      && e.entity_id.startsWith('switch.') && e.entity_id !== m.encje?.pauza);
    const w = [[U.rodzaj, T.oslony?.[m.oslona] || m.oslona]];
    if (m.kolor) w.push([U.kolor, T.kolory?.[m.kolor] || m.kolor]);
    if (m.skrzydla) w.push([U.skrzydla, String(m.skrzydla)]);
    if (m.wysokosc) w.push([U.wysokosc, `${m.wysokosc} px`]);
    w.push([U.czas, typeof m.czas === 'number' && m.czas > 0 ? `${m.czas} s` : U.auto]);
    if (auto) w.push([U.automatyka, stan(auto.entity_id)]);
    if (m.encje?.pauza && h.states[m.encje.pauza]) w.push([U.pauza, stan(m.encje.pauza)]);
    if (m.encje?.powod && h.states[m.encje.powod]) w.push([U.powod, stan(m.encje.powod)]);
    return w;
  }

  async _panele() {
    const r = this.shadowRoot, U = TEKSTY[jezyk({}, this._hass)].urzadzenie, pole = r.querySelector('.panele'), info = r.querySelector('.info');
    if (!pole.hidden) { pole.hidden = true; return; }
    info.hidden = true;
    try {
      const lista = await this._hass.callWS({ type: 'motor_ha/panele' });
      if (!lista.length) { info.textContent = U.brakPaneli; info.hidden = false; return; }
      pole.innerHTML = `<div class="pyt">${esc(U.ktory)}</div>` + lista.map(p => `<button data-k="${esc(p.klucz)}">${esc(p.nazwa)}</button>`).join('');
      pole.hidden = false;
      pole.querySelectorAll('button').forEach(b => b.addEventListener('click', async () => {
        try {
          const w = await this._hass.callWS({ type: 'motor_ha/dodaj_karte', panel: b.dataset.k, ...(this._cel.entity ? { entity_id: this._cel.entity } : {}) });
          pole.hidden = true;
          info.textContent = w.dodano ? `✓ ${U.dodano} ${b.textContent}` : U.blad;
          info.hidden = false;
        } catch (e) { info.textContent = U.blad; info.hidden = false; }
      }));
    } catch (e) { info.textContent = U.blad; info.hidden = false; }
  }
}

// „Zmień ustawienia”: kreator „Konfiguruj” tego urządzenia. HA otwiera go tylko ze strony integracji,
// więc na chwilę przechodzimy tam, otwieramy kreator i po jego zamknięciu wracamy na stronę urządzenia.
export function konfiguruj(wpis) {
  const skad = location.pathname + location.search;
  const idz = (u) => { history.pushState(null, '', u); window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } })); };
  const szukaj = (k) => {
    for (const x of k.querySelectorAll('*')) {
      if (x.tagName === 'HA-CONFIG-ENTRY-ROW' && x.data?.entry?.entry_id === wpis) return x;
      if (x.shadowRoot) { const y = szukaj(x.shadowRoot); if (y) return y; }
    }
    return null;
  };
  const okno = () => document.querySelector('home-assistant')?.shadowRoot?.querySelector('dialog-data-entry-flow');
  idz('/config/integrations/integration/motor_ha');
  let n = 0;
  const t = setInterval(() => {
    const w = szukaj(document);
    if (w && typeof w._showOptions === 'function') {
      clearInterval(t);
      w._showOptions();
      // powrót po zamknięciu okienka kreatora
      let bylo = false, m = 0;
      const p = setInterval(() => {
        const o = okno(), otwarte = !!(o && o._params);   // HA czyści _params przy zamknięciu okienka
        if (otwarte) bylo = true;
        if ((bylo && !otwarte) || ++m > 7200) {
          clearInterval(p);
          if (bylo && location.pathname.startsWith('/config/integrations/integration/motor_ha')) idz(skad);
        }
      }, 250);
    } else if (++n > 80) clearInterval(t);   // 20 s – strona integracji się nie pokazała
  }, 250);
}
