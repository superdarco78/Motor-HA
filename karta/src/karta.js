// Karta Motor HA: okno z osłoną. Osłona jedzie w tempie silnika, za szybą pogoda i pora dnia, czujniki pokazują otwarte okno.
import { DOMYSLNE, IKONY, IKONY_OTW, POZIOME, czyBrama, czyZew, hex, ramaHex, czyDrewno } from './stale.js';
import { rysunekBramy, ustawBrame, ustawFotokomorke } from './brama.js';
import { STYL_STALY, stylOkna } from './styl.js';
import { kolorNieba, poraDnia, pogoda, widokSvg, NIEBO_Z_POGODY } from './scena.js';
import { Ruch, czasPrzejazdu } from './ruch.js';
import { obroty, czujnikiOkna, encjaPogody, pogodaZInternetu, oslonyDoWyboru } from './wykryj.js';
import { TEKSTY, jezyk } from './jezyk.js';

// klucze, które zostają w karcie na panelu, gdy ustawienia trzyma urządzenie Motor HA
export const KLUCZE_PANELU = ['type', 'entity', 'grid_options', 'view_layout', 'visibility', 'layout_options'];
// wysokość kasety (px) – od niej zaczyna się osłona
const KASETA = { pelna: 10, plisa: 8, plaster: 8, rzymska: 8, zaluzja: 9, drewniana: 9, zewnetrzna: 16, perforowana: 16, natynkowa: 20, podtynkowa: 12,
  fasadowa: 14, fasadowaz: 14, screen: 16, markiza: 16 };
const LISTWA = 5, POD_LISTWA = 8;
const esc = s => String(s ?? '').replace(/[&<>"]/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]);

export class MotorHaKarta extends HTMLElement {
  static getConfigElement() { return document.createElement('motor-ha-editor'); }
  static getStubConfig(hass) { return { entity: oslonyDoWyboru(hass)[0] || 'cover.okno' }; }

  setConfig(cfg) {
    if (!cfg || !cfg.entity) throw new Error('entity');
    this._surowa = cfg;
    this._klucz = null;
    if (this._hass) this._odswiez();
  }
  set hass(h) { this._hass = h; this._odswiez(); }
  getCardSize() { return Math.ceil((+this._cfg?.wysokosc || 260) / 50) + 2; }
  getGridOptions() { return { columns: 12, min_columns: 6, rows: 'auto' }; }
  connectedCallback() { if (this._zbudowana) this._animuj(); }
  disconnectedCallback() { cancelAnimationFrame(this._raf); this._raf = null; }

  // ustawienia: domyślne ← urządzenie Motor HA (atrybut motor_ha) ← karta na panelu
  get _ustawienia() {
    const urz = this._hass?.states?.[this._surowa.entity]?.attributes?.motor_ha;
    return Object.assign({}, DOMYSLNE, urz && typeof urz === 'object' ? urz : {}, this._surowa, this._surowa._podglad || {});
  }
  get _T() { return TEKSTY[this._jez]; }

  // encje skrzydeł: wybrane ręcznie, członkowie grupy (okno z integracji to też grupa) albo sama encja
  _skrzydla(c) {
    const s = this._hass.states, n = +c.skrzydla === 1 || czyBrama(c.oslona) ? 1 : 2;
    const grupa = (s[c.entity]?.attributes?.entity_id || []).filter(e => s[e]);
    const wybor = [c.roleta_lewa, c.roleta_prawa];
    return Array.from({ length: n }, (_, i) => wybor[i] && s[wybor[i]] ? wybor[i] : grupa.length ? grupa[Math.min(i, grupa.length - 1)] : c.entity);
  }

  _odswiez() {
    if (!this._hass || !this._surowa) return;
    const c = this._cfg = this._ustawienia;
    this._jez = jezyk(c, this._hass);
    const czl = this._skrzydla(c);
    const klucz = JSON.stringify([czl.length, c.oslona, c.kolor, c.rama, c.wysokosc, c.przyciski, c.suwak, c.pozycje, this._jez, c.osobno]);
    if (klucz !== this._klucz) { this._klucz = klucz; this._zbuduj(c, czl); }
    this._aktualizuj(c, czl);
  }

  _zbuduj(c, czl) {
    if (czyBrama(c.oslona)) return this._zbudujBrame(c, czl);
    const T = this._T, n = czl.length, zew = czyZew(c.oslona), rama = ramaHex(c.rama), kolor = hex(c.kolor);
    this._brama = false; this._poziomo = POZIOME.includes(c.oslona);
    const H = Math.max(140, Math.min(600, +c.wysokosc || 260)) * (n === 1 ? 1.15 : 1), W = Math.round(H * (n === 1 ? .68 : .92));
    this._kas = KASETA[c.oslona] ?? 12;
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    const skrzydlo = i => `<div class="skrz" data-i="${i}"><div class="szyba">
      ${zew ? '<div class="pokoj"></div>' : `<div class="niebo"></div><div class="osiedle-w"></div><div class="pg"></div><i class="promien"></i>
      <div class="oslona"></div><div class="listwa"></div><div class="kaseta"></div><i class="prow l"></i><i class="prow p"></i>`}
      <div class="blask"></div><div class="cel"><span></span></div></div>${n > 1 ? '<i class="klamka"></i>' : ''}</div>`;
    const kolumna = i => `<div class="szyba" data-i="${i}"><div class="oslona"></div><div class="listwa"></div><div class="kaseta"></div><i class="prow l"></i><i class="prow p"></i><div class="cel"><span></span></div></div>`;
    const pozycje = String(c.pozycje || '').split(/[,; ]+/).filter(x => x !== '').map(Number).filter(x => Number.isFinite(x) && x >= 0 && x <= 100).slice(0, 6);
    root.innerHTML = `<style>${STYL_STALY}${stylOkna({ rama, drewno: czyDrewno(c.rama), kolor, typ: c.oslona, zew })}</style>
<ha-card class="${zew ? 'zew' : 'wew'}${this._poziomo ? ' poziomo' : ''}"><div class="mh">
 ${this._naglowek(c)}
 <div class="scena">${zew ? '<div class="pg pgz"></div>' : ''}
  <div class="okno" style="width:min(100%,${W}px);aspect-ratio:${W}/${Math.round(H)}">
   ${zew ? '' : czl.map((_, i) => `<div class="za" style="${n > 1 ? `left:${i ? '50%' : '6px'};right:${i ? '6px' : '50%'}` : ''}"></div>`).join('')}
   ${Array.from({ length: n }, (_, i) => skrzydlo(i)).join('')}
   ${zew ? `<div class="zewo">${Array.from({ length: n }, (_, i) => kolumna(i)).join('')}</div>` : ''}
   ${n > 1 && !c.osobno ? `<div class="oba" title="${esc(T.karta.oba)}"><ha-icon icon="mdi:arrow-up-down"></ha-icon></div>` : ''}
  </div></div>
 ${c.przyciski !== false ? `<div class="przyc">
  <button class="otw" title="${esc(this._lok('ui.card.cover.open_cover', T.karta.otworz))}"><ha-icon icon="mdi:arrow-up"></ha-icon></button>
  <button class="stp" title="${esc(this._lok('ui.card.cover.stop_cover', T.karta.stop))}"><ha-icon icon="mdi:stop"></ha-icon></button>
  <button class="zam" title="${esc(this._lok('ui.card.cover.close_cover', T.karta.zamknij))}"><ha-icon icon="mdi:arrow-down"></ha-icon></button></div>` : ''}
 ${c.suwak !== false ? `<div class="suwak" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(this._lok('ui.card.cover.position', T.karta.pozycja))}"><div class="wyp"></div></div>` : ''}
 ${pozycje.length ? `<div class="poz">${pozycje.map(p => `<button data-p="${p}">${p === 100 ? esc(T.karta.zwinieta) : p === 0 ? esc(T.karta.opuszczona) : p + ' %'}</button>`).join('')}</div>` : ''}
</div></ha-card>`;
    const q = s => root.querySelector(s), qa = s => [...root.querySelectorAll(s)];
    const pola = zew ? qa('.zewo .szyba') : qa('.skrz .szyba');
    this._el = {
      ...this._wspolne(q),
      karta: q('ha-card'), nazwa: q('.nazwa'), stan: q('.stan'), ik: q('.ik'), oba: q('.oba'), suwak: q('.suwak'), pgz: q('.pgz'),
      otw: q('.otw'), stp: q('.stp'), zam: q('.zam'), poz: qa('.poz button'),
      skrz: qa('.skrz').map((s, i) => ({ s, niebo: s.querySelector('.niebo'), osiedle: s.querySelector('.osiedle-w'), pg: s.querySelector('.pg'), za: qa('.za')[i] })),
      pola: pola.map(p => ({ p, oslona: p.querySelector('.oslona'), listwa: p.querySelector('.listwa'), cel: p.querySelector('.cel'), celT: p.querySelector('.cel span') }))
    };
    this._ruchy = czl.map(e => new Ruch(e));
    this._czl = null; this._niebo = null; this._zew = zew;
    const E = this._el;
    q('.gl').addEventListener('click', () => this._wiecej());
    q('.gl').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') this._wiecej(); });
    E.otw?.addEventListener('click', () => this._polecenie(100));
    E.zam?.addEventListener('click', () => this._polecenie(0));
    E.stp?.addEventListener('click', () => this._polecenie(null));
    E.poz.forEach(b => b.addEventListener('click', () => this._polecenie(+b.dataset.p)));
    E.pola.forEach((P, i) => this._ciagnij(zew ? P.p : E.skrz[i].s, [i]));
    if (E.oba) this._ciagnij(E.oba, czl.map((_, i) => i), true);
    if (E.suwak) this._suwak(E.suwak);
    this._zbudowana = true;
  }

  // nagłówek jak w kafelku HA + wiersz automatyki (powód ruchu, pauza) – wspólny dla okien i bram
  _naglowek(c) {
    return `<div class="gl" role="button" tabindex="0"><div class="ik"><ha-icon icon="${IKONY[c.oslona] || IKONY.zebra}"></ha-icon></div>
  <div class="opis"><span class="nazwa"></span><span class="stan"></span></div>
  <svg class="kompas" viewBox="-20 -20 40 40" hidden aria-hidden="true"><circle r="17" fill="none" stroke="var(--divider-color)" stroke-width="2"/>
   <path d="M-9 -15h18" stroke="var(--primary-color)" stroke-width="4" stroke-linecap="round"/><circle class="sl" r="4.5" fill="#ffb300"/></svg></div>
 <div class="auto" hidden><ha-icon icon="mdi:robot-outline"></ha-icon><span></span><button class="wzn" hidden>${esc(this._T.karta.wznow)}</button></div>`;
  }
  _wspolne(q) {
    const el = { auto: q('.auto'), autoT: q('.auto span'), autoI: q('.auto ha-icon'), wzn: q('.wzn'), kompas: q('.kompas'), sl: q('.kompas .sl'), ikona: q('.ik ha-icon') };
    el.wzn?.addEventListener('click', e => {
      e.stopPropagation();
      const b = this._cfg?.encje?.wznow;
      if (b && !this._cfg._podglad) this._hass.callService('button', 'press', { entity_id: b });
    });
    return el;
  }

  // brama albo garaż: rysunek zamiast okna, dotknięcie = jak przycisk pilota
  _zbudujBrame(c, czl) {
    const T = this._T, root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    this._brama = true; this._poziomo = false; this._kas = 0; this._brNoc = null;
    const st = this._hass.states[c.entity], zPoz = (st?.attributes?.supported_features ?? 0) & 4;
    root.innerHTML = `<style>${STYL_STALY}</style>
<ha-card class="brama"><div class="mh">
 ${this._naglowek(c)}
 <div class="scena"><div class="bramaw" role="button" tabindex="0"></div></div>
 ${c.przyciski !== false ? `<div class="przyc">
  <button class="otw" title="${esc(this._lok('ui.card.cover.open_cover', T.karta.otworz))}"><ha-icon icon="mdi:arrow-up"></ha-icon></button>
  <button class="stp" title="${esc(this._lok('ui.card.cover.stop_cover', T.karta.stop))}"><ha-icon icon="mdi:stop"></ha-icon></button>
  <button class="zam" title="${esc(this._lok('ui.card.cover.close_cover', T.karta.zamknij))}"><ha-icon icon="mdi:arrow-down"></ha-icon></button></div>` : ''}
 ${c.suwak !== false && zPoz ? `<div class="suwak" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(this._lok('ui.card.cover.position', T.karta.pozycja))}"><div class="wyp"></div></div>` : ''}
</div></ha-card>`;
    const q = s => root.querySelector(s);
    this._el = { ...this._wspolne(q), karta: q('ha-card'), nazwa: q('.nazwa'), stan: q('.stan'), ik: q('.ik'), suwak: q('.suwak'),
      otw: q('.otw'), stp: q('.stp'), zam: q('.zam'), poz: [], skrz: [], pola: [], bramaw: q('.bramaw') };
    this._ruchy = [new Ruch(czl[0])];
    this._czl = null; this._niebo = null; this._zew = false;
    const E = this._el;
    q('.gl').addEventListener('click', () => this._wiecej());
    E.bramaw.addEventListener('click', () => this._dotkniecie(null));
    E.bramaw.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._dotkniecie(null); } });
    E.otw?.addEventListener('click', () => this._polecenie(100));
    E.zam?.addEventListener('click', () => this._polecenie(0));
    E.stp?.addEventListener('click', () => this._polecenie(null));
    if (E.suwak) this._suwak(E.suwak);
    this._zbudowana = true;
  }

  _lok(klucz, zapas) { return this._hass?.localize?.(klucz) || zapas; }
  _wiecej() { this.dispatchEvent(new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: this._cfg.entity } })); }

  // polecenie dla wszystkich (albo wybranych) skrzydeł; cel null = stop
  _polecenie(cel, ktore) {
    const c = this._cfg, teraz = performance.now(), czl = this._czl || [];
    const idx = ktore || czl.map((_, i) => i);
    idx.forEach(i => this._ruchy[i]?.polecenie(cel, teraz));
    this._animuj();
    if (c.wibracja !== false) try { navigator.vibrate?.(10); } catch (e) { /* bez wibracji */ }
    if (c._podglad) return;   // podgląd w opisie – bez prawdziwego silnika
    const encje = ktore ? [...new Set(idx.map(i => czl[i]))] : [c.entity];
    const usl = cel === null ? 'stop_cover' : cel === 100 ? 'open_cover' : cel === 0 ? 'close_cover' : 'set_cover_position';
    const odwroc = c.odwroc && (ktore || !this._hass.states[c.entity]?.attributes?.motor_ha);
    const dane = usl === 'set_cover_position' ? { position: odwroc ? 100 - cel : cel } : {};
    this._hass.callService('cover', usl, { entity_id: encje, ...dane });
  }

  // pozycja z wysokości palca na szybie
  _pozycjaZ(pole, y) {
    const r = pole.getBoundingClientRect(), gora = this._kas, zakres = r.height - gora - LISTWA - POD_LISTWA;
    return Math.round(100 - Math.min(1, Math.max(0, (y - r.top - gora) / zakres)) * 100);
  }
  _gornaListwy(wys, p) { return this._kas - 2 + (wys - this._kas - LISTWA - POD_LISTWA + 2) * (100 - p) / 100; }

  _ciagnij(el, idx, srodek) {
    let start = null, wart = null;
    const pole = i => this._el.pola[i].p;
    el.addEventListener('pointerdown', e => { start = e.clientY; wart = null; this._ciagnie = true; el.setPointerCapture?.(e.pointerId); e.stopPropagation(); });
    el.addEventListener('pointermove', e => {
      if (start === null || (wart === null && Math.abs(e.clientY - start) < 6)) return;
      wart = this._pozycjaZ(pole(idx[0]), e.clientY);
      const ktore = srodek || this._cfg.osobno || this._czl?.length < 2 ? idx : this._el.pola.map((_, i) => i);
      ktore.forEach(i => this._pokazCel(i, wart, true));
    });
    const koniec = () => {
      if (start === null) return;
      start = null; this._ciagnie = false;
      this._el.pola.forEach((_, i) => this._pokazCel(i, null));
      const ktore = srodek || !(this._cfg.osobno && this._czl?.length > 1) ? null : idx;
      if (wart !== null) this._polecenie(wart, ktore);
      else if (!srodek) this._dotkniecie(ktore);
    };
    el.addEventListener('pointerup', koniec);
    el.addEventListener('pointercancel', koniec);
  }

  // dotknięcie jak przycisk pilota: jedzie → stop; stoi → w drugą stronę
  _dotkniecie(ktore) {
    const r = this._ruchy[ktore ? ktore[0] : 0]; if (!r || r.widac === null) return;
    if (r.jedzie) { this._kier = r.cel > r.widac ? 1 : -1; this._polecenie(null, ktore); return; }
    const w = r.widac >= 99.5 ? -1 : r.widac <= .5 ? 1 : -(this._kier || -1);
    this._kier = w;
    this._polecenie(w > 0 ? 100 : 0, ktore);
  }

  _suwak(el) {
    let akt = false;
    const wart = x => { const r = el.getBoundingClientRect(); return Math.round(Math.min(1, Math.max(0, (x - r.left) / r.width)) * 100); };
    el.addEventListener('pointerdown', e => { akt = true; this._suwakW = wart(e.clientX); el.setPointerCapture?.(e.pointerId); this._rysujSuwak(); });
    el.addEventListener('pointermove', e => { if (akt) { this._suwakW = wart(e.clientX); this._rysujSuwak(); } });
    const koniec = () => { if (!akt) return; akt = false; const w = this._suwakW; this._suwakW = null; this._polecenie(w); };
    el.addEventListener('pointerup', koniec); el.addEventListener('pointercancel', koniec);
    el.addEventListener('keydown', e => {
      const d = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5, PageUp: 10, PageDown: -10 }[e.key];
      if (d) { e.preventDefault(); this._polecenie(Math.max(0, Math.min(100, Math.round(this._srednia() + d)))); }
    });
  }

  _srednia(cel) { const r = this._ruchy.filter(x => x.widac !== null); return r.length ? r.reduce((a, x) => a + (cel ? x.cel : x.widac), 0) / r.length : 0; }

  _aktualizuj(c, czl) {
    const h = this._hass, T = this._T, E = this._el, st = h.states[c.entity], teraz = performance.now();
    if (!st) { E.nazwa.textContent = c.name || c.entity; E.stan.textContent = this._lok('ui.panel.lovelace.warning.entity_not_found', T.karta.brak); return; }
    this._czl = czl;
    E.nazwa.textContent = c.name || st.attributes.friendly_name || c.entity;
    // ruch: meldunki silników i czas przejazdu
    czl.forEach((e, i) => {
      const r = this._ruchy[i];
      r.czas = czasPrzejazdu(c.czas, obroty(h, e, c[i ? 'predkosc_prawa' : 'predkosc_lewa']), e);
      const s = h.states[e] || st;
      if (s !== r._ost) { r._ost = s; r.meldunek(s, teraz, c.odwroc); }
    });
    // pogoda i pora dnia
    const pg = c._podglad || {};
    const wid = c.pogoda === 'brak' ? null : encjaPogody(h, c.pogoda);
    const ws = pg.pogoda ? { state: pg.pogoda, attributes: {} } : c.niebo === false || c.pogoda === 'brak' ? null
      : wid && h.states[wid] ? h.states[wid] : pogodaZInternetu(h, () => this._odswiez());
    const pora = pg.pora || poraDnia(h), rodzaj = ws ? NIEBO_Z_POGODY[ws.state] || 'chmury' : 'slonce';
    const kn = rodzaj + pora + (c.widok !== false);
    if (kn !== this._niebo) {
      this._niebo = kn;
      E.karta.classList.toggle('noc', pora === 'noc' || pora === 'zmierzch');
      const bg = kolorNieba(rodzaj, pora);
      E.skrz.forEach((S, i) => {
        if (S.niebo) S.niebo.style.background = bg;
        if (S.za) S.za.style.background = bg;
        if (S.osiedle) S.osiedle.innerHTML = c.widok !== false ? widokSvg(rodzaj, pora, i, czl.length) : '';
        if (S.pg) S.pg.innerHTML = pogoda(rodzaj, pora, i, czl.length);
        S.s.classList.toggle('slonecznie', pora === 'dzien' && (rodzaj === 'slonce' || rodzaj === 'chmurki'));
      });
      if (E.pgz) E.pgz.innerHTML = ['deszcz', 'ulewa', 'burza', 'snieg', 'deszczsnieg', 'mgla'].includes(rodzaj) ? pogoda(rodzaj, pora, 0, 1).replace(/<i class="(slonce|ksiezyc|chm|gw)[^>]*><\/i>/g, '') : '';
    }
    if (this._brama) return this._aktualizujBrame(c, czl, st, pora);
    // czujniki okna
    const auto = c.auto_czujniki !== false ? czujnikiOkna(h, czl[0]) : [];
    const okno = [0, 1].map(k => {
      const id = c[k ? 'czujnik_prawe' : 'czujnik_lewe'] || auto[k], s = id && h.states[id];
      return s?.state === 'on' ? (c[k ? 'tryb_prawe' : 'tryb_lewe'] === 'otworz' ? 'otw' : 'uch') : '';
    });
    E.skrz.forEach((S, i) => { S.s.classList.toggle('uch', okno[i] === 'uch'); S.s.classList.toggle('otw', okno[i] === 'otw'); if (S.za) S.za.classList.toggle('widac', !!okno[i]); });
    // opis stanu: stan · pozycja · pogoda · okno
    const czesci = [];
    const pos = st.attributes.current_position;
    czesci.push(h.formatEntityState ? h.formatEntityState(st) : st.state);
    if (typeof pos === 'number' && pos > 0 && pos < 100) czesci.push(`${c.odwroc ? 100 - pos : pos} %`);
    if (ws && !pg.pogoda) {
      const t = ws.attributes?.temperature;
      const opisPg = ws.entity_id && h.formatEntityState ? h.formatEntityState(ws) : this._lok(`component.weather.entity_component._.state.${ws.state}`, '');
      if (opisPg) czesci.push(opisPg + (typeof t === 'number' ? ` ${Math.round(t)} ${ws.attributes.temperature_unit || '°C'}` : ''));
    }
    okno.forEach((o, k) => { if (o && k < czl.length) czesci.push(`${T.karta.okno}${czl.length > 1 ? ' ' + (k ? T.karta.prawe : T.karta.lewe) : ''} ${o === 'otw' ? T.karta.otwarte : T.karta.uchylone}`); });
    this._opisStanu = czesci;
    this._automatyka(c, h);
    const otwarte = this._ruchy.some(r => (r.widac ?? 0) > 0);
    E.karta.style.setProperty('--mh-kolor', otwarte ? 'var(--state-cover-active-color,var(--state-active-color,var(--primary-color)))' : 'var(--state-cover-inactive-color,var(--state-inactive-color,var(--disabled-color)))');
    this._animuj();
  }

  // wiersz automatyki: dlaczego osłona stoi tak, jak stoi; przy pauzie przycisk „Wznów”
  _automatyka(c, h) {
    const E = this._el, enc = c.encje || {};
    const ps = enc.powod && h.states[enc.powod], pz = enc.pauza && h.states[enc.pauza];
    const pokaz = ps && !['brak', 'wylaczona', 'unavailable', 'unknown'].includes(ps.state);
    if (E.auto) {
      E.auto.hidden = !pokaz;
      if (pokaz) {
        let t = h.formatEntityState ? h.formatEntityState(ps) : ps.state;
        const pauza = pz?.state === 'on' || ['pauza', 'reczny'].includes(ps.state);
        const d = pauza && c.pauza_do ? new Date(c.pauza_do) : null;
        if (d && !isNaN(d)) {
          const g = `${this._T.karta.pauza} ${d.toLocaleTimeString(h.locale?.language || undefined, { hour: '2-digit', minute: '2-digit' })}`;
          t = ps.state === 'pauza' ? g : `${t} · ${g}`;
        }
        E.autoT.textContent = t;
        E.wzn.hidden = !(pauza && enc.wznow);
        const blad = ['blokada', 'przeszkoda'].includes(ps.state);
        E.auto.classList.toggle('blad', blad);
        E.autoI.setAttribute('icon', pauza ? 'mdi:pause-circle-outline' : blad ? 'mdi:alert-circle-outline' : 'mdi:robot-outline');
      }
    }
    // kompas: kierunek okna u góry, słońce tam, gdzie jest względem okna
    const sun = h.states['sun.sun'], az = +sun?.attributes?.azimuth, el = +sun?.attributes?.elevation;
    const widac = typeof c.kompas === 'number' && Number.isFinite(az) && el > 0;
    if (E.kompas) {
      E.kompas.toggleAttribute('hidden', !widac);   // <svg> nie ma właściwości hidden
      if (widac) {
        const k = (az - c.kompas) * Math.PI / 180, r = 13 * (1 - Math.min(1, el / 90) * .55);
        E.sl.setAttribute('cx', (Math.sin(k) * r).toFixed(1)); E.sl.setAttribute('cy', (-Math.cos(k) * r).toFixed(1));
        E.sl.setAttribute('opacity', Math.abs(((az - c.kompas + 540) % 360) - 180) < 90 ? 1 : .35);
      }
    }
  }

  _aktualizujBrame(c, czl, st, pora) {
    const h = this._hass, T = this._T, E = this._el, noc = pora === 'noc' || pora === 'zmierzch';
    if (noc !== this._brNoc) {
      this._brNoc = noc;
      E.bramaw.innerHTML = rysunekBramy(c.oslona, hex(c.kolor), ramaHex(c.rama), noc, !!c.przeszkoda);
      E.svg = E.bramaw.querySelector('svg');
      E.bramaw.setAttribute('aria-label', T.oslony[c.oslona] || '');
    }
    const czesci = [h.formatEntityState ? h.formatEntityState(st) : st.state];
    const pos = st.attributes.current_position;
    if (typeof pos === 'number' && pos > 0 && pos < 100) czesci.push(`${pos} %`);
    const fs = c.przeszkoda && h.states[c.przeszkoda];
    const przeszkoda = !!fs && String(fs.state) === String(c.foto_stan || 'on');
    if (fs) { ustawFotokomorke(E.svg, przeszkoda); if (przeszkoda) czesci.push(T.karta.przeszkoda); }
    this._opisStanu = czesci;
    this._automatyka(c, h);
    const otwarte = st.state !== 'closed';
    E.ikona?.setAttribute('icon', (otwarte ? IKONY_OTW[c.oslona] : IKONY[c.oslona]) || 'mdi:gate');
    E.karta.style.setProperty('--mh-kolor', otwarte ? 'var(--state-cover-active-color,var(--state-active-color,var(--primary-color)))' : 'var(--state-cover-inactive-color,var(--state-inactive-color,var(--disabled-color)))');
    this._animuj();
  }

  _pokazCel(i, p, ciagnie) {
    const P = this._el.pola[i]; if (!P) return;
    if (p === null || p === undefined) { P.cel.style.display = 'none'; return; }
    const wys = P.p.clientHeight;
    P.cel.style.display = 'block';
    P.cel.style.top = (this._gornaListwy(wys, p) + LISTWA) + 'px';
    P.celT.textContent = (ciagnie ? '' : '→ ') + p + ' %';
  }

  _rysujSuwak() {
    const S = this._el.suwak; if (!S) return;
    const w = this._suwakW ?? this._srednia(true);
    S.querySelector('.wyp').style.width = Math.max(0, Math.min(100, w)) + '%';
    S.setAttribute('aria-valuenow', Math.round(w));
  }

  _rysuj() {
    const E = this._el, ile = E.pola.length;
    if (this._brama && this._ruchy[0]?.widac !== null) ustawBrame(E.svg, this._cfg.oslona, this._ruchy[0].widac);
    E.pola.forEach((P, i) => {
      const r = this._ruchy[Math.min(i, this._ruchy.length - 1)]; if (!r || r.widac === null) return;
      const wys = P.p.clientHeight; if (!wys) return;
      if (this._poziomo) {
        // zasłania od boku: żaluzja pionowa zjeżdża w prawo, zasłona rozsuwa się na dwie strony
        const z = (100 - r.widac);
        P.oslona.style.top = (this._kas - 2) + 'px';
        P.oslona.style.height = (wys - this._kas + 2) + 'px';
        if (this._cfg.oslona === 'zaslona') {
          const pol = (z / 2).toFixed(2);
          P.oslona.style.clipPath = '';
          P.oslona.style.maskImage = P.oslona.style.webkitMaskImage =
            `linear-gradient(90deg,#000 0 calc(${pol}% + 6px),transparent calc(${pol}% + 6px) calc(${100 - pol}% - 6px),#000 calc(${100 - pol}% - 6px))`;
        } else P.oslona.style.clipPath = `inset(0 ${(100 - Math.max(4, z)).toFixed(2)}% 0 0)`;
        if (!this._ciagnie) this._pokazCel(i, r.jedzie && r.komenda ? Math.round(r.cel) : null);
        return;
      }
      const gora = this._gornaListwy(wys, r.widac);
      P.oslona.style.height = Math.max(0, gora - (this._kas - 2) + 1) + 'px';
      P.oslona.style.top = (this._kas - 2) + 'px';
      P.listwa.style.transform = `translateY(${gora}px)`;
      if (!this._ciagnie) this._pokazCel(i, r.jedzie && r.komenda ? Math.round(r.cel) : null);
      P._dol = P.p.offsetTop + (P.p.parentElement?.offsetTop || 0) + gora + LISTWA / 2;
    });
    if (E.oba && ile > 1) {
      const y = E.pola.reduce((a, P) => a + (P._dol || 0), 0) / ile;
      E.oba.style.transform = `translateY(${y + 6 + 8}px)`;
    }
    // stan w nagłówku: gdzie jest teraz i dokąd jedzie
    const teraz = Math.round(this._srednia()), cel = Math.round(this._srednia(true)), jedzie = this._ruchy.some(r => r.jedzie);
    if (this._opisStanu) {
      const cz = [...this._opisStanu];
      if (jedzie) cz.splice(1, 0, `${teraz} % → ${cel} %`);
      E.stan.textContent = cz.join(' · ');
    }
    E.poz.forEach(b => b.classList.toggle('on', !jedzie && +b.dataset.p === teraz));
    if (E.otw) E.otw.disabled = teraz >= 100 && !jedzie;
    if (E.zam) E.zam.disabled = teraz <= 0 && !jedzie;
    this._rysujSuwak();
  }

  _animuj() {
    this._rysuj();
    if (this._raf || !this.isConnected) return;
    let ost = performance.now();
    const klatka = t => {
      const dt = Math.min(.1, (t - ost) / 1000); ost = t;
      let ruch = false;
      this._ruchy.forEach(r => { ruch = r.krok(dt, t) || ruch; });
      this._rysuj();
      this._raf = ruch ? requestAnimationFrame(klatka) : null;
    };
    this._raf = requestAnimationFrame(klatka);
  }
}
