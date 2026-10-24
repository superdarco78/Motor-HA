// Karta Motor HA: okno z osłoną. Osłona jedzie w tempie silnika, za szybą pogoda i pora dnia, czujniki pokazują otwarte okno.
import { DOMYSLNE, IKONY, IKONY_OTW, POZIOME, czyBrama, czyZew, hex, ramaHex, czyDrewno, SCIANY, baza, wlasnyRuch, WERSJA } from './stale.js';
import { rysunekBramy, ustawBrame, ustawFotokomorke } from './brama.js';
import { kafelRuch } from './kafle_ruch.js';
import { STYL_STALY, stylOkna, stylPola } from './styl.js';
import { kolorNieba, poraDnia, pogoda, widokSvg, zdjecieWidoku, NIEBO_Z_POGODY } from './scena.js';
import { WIDOK } from './zdjecia.js';
import { Ruch, czasPrzejazdu } from './ruch.js';
import { obroty, czujnikiOkna, encjaPogody, pogodaZInternetu, oslonyDoWyboru } from './wykryj.js';
import { TEKSTY, jezyk } from './jezyk.js';
import { konfiguruj } from './urzadzenie.js';
import { ikUI, STYL_IKU } from './ikony_ui.js';
import { SZYBY, nazwaUkladu, tkanina } from './foto_okno.js';
import { przekoloruj, zKolorem } from './przekolor.js';
import { maZdjecieBramy, bramaZdjecie, ustawBrameZdj, STYL_BRAMY } from './brama_foto.js';

// klucze, które zostają w karcie na panelu, gdy ustawienia trzyma urządzenie Motor HA
// pola układu okna (2.2.0) z urządzenia: [{ x, y, w, h, silnik, czujnik, tryb }] albo null (1–2 skrzydła)
export const polaOkna = c => Array.isArray(c.pola) && c.pola.length && !czyBrama(c.oslona)
  && c.pola.every(p => [p?.x, p?.y, p?.w, p?.h].every(Number.isFinite)) ? c.pola : null;
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
    const c = Object.assign({}, DOMYSLNE, urz && typeof urz === 'object' ? urz : {}, this._surowa, this._surowa._podglad || {});
    // rodzaj z katalogu (np. markiza koszowa) rysuje się jak rodzaj bazowy (markiza); ikona zostaje własna
    c.rodzaj = c.oslona; c.oslona = baza(c.oslona);
    if (Array.isArray(c.pola)) c.pola = c.pola.map(p => p?.oslona ? { ...p, oslona: baza(p.oslona) } : p);
    return c;
  }
  get _T() { return TEKSTY[this._jez]; }

  // encje skrzydeł: wybrane ręcznie, członkowie grupy (okno z integracji to też grupa) albo sama encja
  _skrzydla(c) {
    const s = this._hass.states;
    if (polaOkna(c)) {   // układ z polami: każde pole ze swoim silnikiem
      const grupa = (s[c.entity]?.attributes?.entity_id || []).filter(e => s[e]);
      return c.pola.map(p => p.silnik && s[p.silnik] ? p.silnik : grupa[0] || c.entity);
    }
    const n = +c.skrzydla === 1 || czyBrama(c.oslona) ? 1 : 2;
    const grupa = (s[c.entity]?.attributes?.entity_id || []).filter(e => s[e]);
    const wybor = [c.roleta_lewa, c.roleta_prawa];
    return Array.from({ length: n }, (_, i) => wybor[i] && s[wybor[i]] ? wybor[i] : grupa.length ? grupa[Math.min(i, grupa.length - 1)] : c.entity);
  }

  _odswiez() {
    if (!this._hass || !this._surowa) return;
    const c = this._cfg = this._ustawienia;
    this._jez = jezyk(c, this._hass);
    const czl = this._skrzydla(c);
    const klucz = JSON.stringify([czl.length, polaOkna(c) && c.pola.map(p => [p.x, p.y, p.w, p.h, p.oslona, p.kolor]), c.sciana, c.oslona, c.rodzaj, c.kolor, c.rama, c.wysokosc, c.przyciski, c.suwak, c.pozycje, this._jez, c.osobno, !!this._wpis()]);
    if (klucz !== this._klucz) { this._klucz = klucz; this._zbuduj(c, czl); }
    this._aktualizuj(c, czl);
  }

  _zbuduj(c, czl) {
    if (czyBrama(c.oslona) || (wlasnyRuch(c.rodzaj) && !polaOkna(c))) return this._zbudujBrame(c, czl);
    const T = this._T, n = czl.length, zew = czyZew(c.oslona), rama = ramaHex(c.rama), kolor = hex(c.kolor);
    this._brama = false; this._poziomo = POZIOME.includes(c.oslona);
    // suwak w kierunku ruchu: góra-dół – pionowy obok okna, na boki (i bramy) – poziomy pod przyciskami
    const pion = c.suwak !== false && !this._poziomo;
    // osobne sterowanie dwóch skrzydeł: suwak lewej osłony z lewej, prawej z prawej strony okna
    const dwaSuwaki = pion && !!c.osobno && n > 1;
    const P = polaOkna(c), kol = P ? new Set(P.map(p => p.x)).size : n;
    this._uk = !!P;
    // okno ze zdjęć (Canva): zdjęcie układu, a na szybach osłona wycięta ze zdjęcia rodzaju – gdy jest zdjęcie układu i każdego rodzaju
    const typP = i => { const t = P?.[i]?.oslona; return t && !!czyZew(t) === !!zew && !POZIOME.includes(t) && !POZIOME.includes(c.oslona) ? t : c.oslona; };
    const fotUk = POZIOME.includes(c.oslona) ? null : P ? nazwaUkladu(P.map(p => [p.x, p.y, p.w, p.h])) : n === 1 ? 'u1' : n === 2 ? 'u2' : null;
    const foto = this._foto = !!fotUk && Array.from({ length: n }, (_, i) => tkanina(typP(i), '#000')).every(Boolean);
    const zw = zew && !foto;   // na zdjęciu osłona zewnętrzna też jest na szybie – bez widoku z ulicy
    const H = Math.max(140, Math.min(600, +c.wysokosc || 260)) * (kol === 1 ? 1.15 : 1),
      W = foto ? Math.round(H * 193 / 161) : Math.round(H * (kol === 1 ? .68 : kol === 2 ? .92 : Math.min(1.5, .46 * kol)));
    // pole układu: położenie w procentach okna (4 px ramy dookoła każdego pola)
    const miejsce = (i, wciecie = 4) => foto ? ` style="left:${SZYBY[fotUk][i][0] * 100}%;top:${SZYBY[fotUk][i][1] * 100}%;width:${SZYBY[fotUk][i][2] * 100}%;height:${SZYBY[fotUk][i][3] * 100}%"` : P ? ` style="left:calc(${P[i].x * 100}% + ${wciecie}px);top:calc(${P[i].y * 100}% + ${wciecie}px);width:calc(${P[i].w * 100}% - ${2 * wciecie}px);height:calc(${P[i].h * 100}% - ${2 * wciecie}px)"` : '';
    const strona = i => P ? (P[i].x + P[i].w / 2 <= .5 ? 'l' : 'p') : i ? 'p' : 'l';
    // widok za szybą jeden na całe okno: każde pole pokazuje swój kawałek
    const wid = i => P ? ` class="wid" style="left:${-P[i].x / P[i].w * 100}%;top:${-P[i].y / P[i].h * 100}%;width:${100 / P[i].w}%;height:${100 / P[i].h}%"` : ' style="position:absolute;inset:0"';
    // zdjęcie układu z ramą w kolorze z ustawień (maska ramy, przekolor.js)
    const ramy = foto ? `<img class="ftlo" data-przek="${fotUk}" data-kol="" data-ram="${rama}" src="${zKolorem(fotUk, '', rama) || `/motor_ha/ui/${fotUk}.webp?v=${WERSJA}`}" alt="" draggable="false">` : P ? [...new Set(P.map(p => p.x))].map(x => {
      const k = P.filter(p => p.x === x), dol = Math.max(...k.map(p => p.y + p.h));
      return `<div class="kolr" style="left:${x * 100}%;top:0;width:${k[0].w * 100}%;height:${dol * 100}%"></div>`;
    }).join('') : '';
    // słupek albo mur między osobnymi oknami: odstęp między kolumnami pól
    const xs = P ? [...new Set(P.map(p => p.x))].sort((a, b) => a - b) : [];
    // kolor ściany z kreatora; cegła z jasnymi fugami
    const sc = SCIANY[c.sciana], tloMuru = !sc ? '' : c.sciana === 'cegla'
      ? `;background:repeating-linear-gradient(0deg,transparent 0 9px,rgba(240,232,220,.75) 9px 10px),${sc}` : `;background:repeating-linear-gradient(0deg,transparent 0 9px,rgba(0,0,0,.1) 9px 10px),${sc}`;
    const mury = foto ? '' : xs.slice(1).map((x, i) => { const pk = P.find(p => p.x === xs[i]), od = pk.x + pk.w; return x - od > .004 ? `<div class="mur" style="left:${od * 100}%;width:${(x - od) * 100}%${x - od < .035 ? `;background:${rama}` : tloMuru}"></div>` : ''; }).join('');
    this._kas = KASETA[c.oslona] ?? 12;
    // pola z własnym rodzajem/kolorem osłony (z kreatora 2.2.2); rodzaj musi pasować do okna (wewnątrz/na zewnątrz, góra-dół)
    const typPola = i => { const t = P?.[i]?.oslona; return t && !!czyZew(t) === !!zew && !POZIOME.includes(t) && !this._poziomo ? t : c.oslona; };
    const warianty = [], wariant = i => {
      if (!P) return 0;
      const t = typPola(i), k = P[i].kolor ? hex(P[i].kolor) : kolor;
      if (t === c.oslona && k === kolor) return 0;
      let w = warianty.findIndex(x => x.t === t && x.k === k);
      if (w < 0) { warianty.push({ t, k }); w = warianty.length - 1; }
      return w + 1;
    };
    const wPol = P ? P.map((_, i) => wariant(i)) : [];
    this._kasy = P ? P.map((_, i) => KASETA[typPola(i)] ?? 12) : null;
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    const skrzydlo = i => `<div class="skrz" data-i="${i}" data-s="${strona(i)}"${miejsce(i)}><div class="szyba"${wPol[i] ? ` data-w="${wPol[i]}"` : ''}>
      ${zw ? '<div class="pokoj"></div>' : `<div${wid(i)}><div class="niebo"></div><div class="osiedle-w"></div><div class="pg"></div></div><i class="promien"></i>
      ${foto ? `<div class="oslona"><div class="ftkp">${tkanina(typP(i), P?.[i]?.kolor ? hex(P[i].kolor) : kolor)}</div></div><div class="listwa"></div>` : '<div class="oslona"></div><div class="listwa"></div><div class="kaseta"></div><i class="prow l"></i><i class="prow p"></i>'}`}
      <div class="blask"></div><div class="cel"><span></span></div></div>${n > 1 && (!P || P[i].h >= .4) ? '<i class="klamka"></i>' : ''}</div>`;
    const kolumna = i => `<div class="szyba" data-i="${i}"${wPol[i] ? ` data-w="${wPol[i]}"` : ''}${miejsce(i, 0)}><div class="oslona"></div><div class="listwa"></div><div class="kaseta"></div><i class="prow l"></i><i class="prow p"></i><div class="cel"><span></span></div></div>`;
    const pozycje = String(c.pozycje || '').split(/[,; ]+/).filter(x => x !== '').map(Number).filter(x => Number.isFinite(x) && x >= 0 && x <= 100).slice(0, 6);
    root.innerHTML = `<style>${STYL_STALY}${STYL_IKU}${stylOkna({ rama, drewno: czyDrewno(c.rama), kolor, typ: c.oslona, zew })}${warianty.map((x, w) => stylPola(`.szyba[data-w="${w + 1}"]`, { rama, drewno: czyDrewno(c.rama), kolor: x.k, typ: x.t, zew })).join('\n')}</style>
<ha-card class="${zw ? 'zew' : 'wew'}${this._poziomo ? ' poziomo' : ''}${foto ? ' foto' : ''}"><div class="mh">
 ${this._naglowek(c)}
 <div class="scena${pion ? ' zs' : ''}">${zw ? '<div class="pg pgz"></div>' : ''}
  ${dwaSuwaki ? this._suwakHtml(T, true, 0) : ''}<div class="okno${P || foto ? ' uk' : ''}" style="width:min(${pion ? (dwaSuwaki ? 'calc(100% - 108px)' : 'calc(100% - 54px)') : '100%'},${W}px);aspect-ratio:${W}/${Math.round(H)}">
   ${mury}${ramy}${zw || foto ? '' : czl.map((_, i) => P ? `<div class="za"${miejsce(i)}></div>` : `<div class="za" style="${n > 1 ? `left:${i ? '50%' : '6px'};right:${i ? '6px' : '50%'}` : ''}"></div>`).join('')}
   ${Array.from({ length: n }, (_, i) => skrzydlo(i)).join('')}
   ${zw ? `<div class="zewo">${Array.from({ length: n }, (_, i) => kolumna(i)).join('')}</div>` : ''}
   ${n > 1 && !c.osobno && !P ? `<div class="oba" title="${esc(T.karta.oba)}"><ha-icon icon="mdi:arrow-up-down"></ha-icon></div>` : ''}
  </div>${pion ? this._suwakHtml(T, true, dwaSuwaki ? 1 : null) : ''}</div>
 ${c.przyciski !== false ? `<div class="przyc">
  <button class="otw" title="${esc(this._lok('ui.card.cover.open_cover', T.karta.otworz))}">${ikUI('gora', '<ha-icon icon="mdi:arrow-up"></ha-icon>')}</button>
  <button class="stp" title="${esc(this._lok('ui.card.cover.stop_cover', T.karta.stop))}">${ikUI('stop', '<ha-icon icon="mdi:stop"></ha-icon>')}</button>
  <button class="zam" title="${esc(this._lok('ui.card.cover.close_cover', T.karta.zamknij))}">${ikUI('dol', '<ha-icon icon="mdi:arrow-down"></ha-icon>')}</button></div>` : ''}
 ${c.suwak !== false && !pion ? this._suwakHtml(T, false) : ''}
 ${pozycje.length ? `<div class="poz">${pozycje.map(p => `<button data-p="${p}">${p === 100 ? esc(T.karta.zwinieta) : p === 0 ? esc(T.karta.opuszczona) : p + ' %'}</button>`).join('')}</div>` : ''}
 ${this._wpis() ? `<div class="stopka"><button class="zmien">⚙ ${esc(T.urzadzenie.zmien)}</button><button class="zmien wyg">🎨 ${esc(T.urzadzenie.wyglad)}</button></div>` : ''}
</div></ha-card>`;
    const q = s => root.querySelector(s), qa = s => [...root.querySelectorAll(s)];
    const pola = zw ? qa('.zewo .szyba') : qa('.skrz .szyba');
    this._el = {
      ...this._wspolne(q),
      karta: q('ha-card'), nazwa: q('.nazwa'), stan: q('.stan'), ik: q('.ik'), oba: q('.oba'), suwak: q('.suwak'), suwaki: qa('.suwak'), pgz: q('.pgz'),
      otw: q('.otw'), stp: q('.stp'), zam: q('.zam'), poz: qa('.poz button'),
      skrz: qa('.skrz').map((s, i) => ({ s, niebo: s.querySelector('.niebo'), osiedle: s.querySelector('.osiedle-w'), pg: s.querySelector('.pg'), za: qa('.za')[i] })),
      pola: pola.map((p, i) => ({ p, kas: this._kasy?.[i] ?? this._kas, oslona: p.querySelector('.oslona'), listwa: p.querySelector('.listwa'), cel: p.querySelector('.cel'), celT: p.querySelector('.cel span') }))
    };
    this._ruchy = czl.map(e => new Ruch(e));
    this._czl = null; this._niebo = null; this._zew = zw;
    const E = this._el;
    q('.gl').addEventListener('click', () => this._wiecej());
    q('.gl').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') this._wiecej(); });
    E.otw?.addEventListener('click', () => this._polecenie(100));
    E.zam?.addEventListener('click', () => this._polecenie(0));
    E.stp?.addEventListener('click', () => this._polecenie(null));
    E.poz.forEach(b => b.addEventListener('click', () => this._polecenie(+b.dataset.p)));
    E.pola.forEach((P, i) => this._ciagnij(zw ? P.p : E.skrz[i].s, [i]));
    if (E.oba) this._ciagnij(E.oba, czl.map((_, i) => i), true);
    E.suwaki.forEach(S => this._suwak(S));
    q('.zmien:not(.wyg)')?.addEventListener('click', () => konfiguruj(this._wpis()));
    q('.wyg')?.addEventListener('click', () => this._wyglad());
    root.querySelectorAll('img[data-przek]').forEach(im => przekoloruj(im.dataset.przek, im.dataset.kol, WERSJA, im.dataset.ram).then(u => { if (u && im.isConnected) im.src = u; }));
    this._zbudowana = true;
  }

  // „⚙ Zmień ustawienia” pod oknem na panelu: kreator tego urządzenia, potem powrót na ten sam panel.
  // Nie w podglądzie, nie w edytorze panelu i nie na stronie urządzenia (tam jest własny przycisk).
  _wpis() {
    const h = this._hass, c = this._surowa;
    if (!h || !c || c._podglad || this.preview || this.bezEdycji || h.user?.is_admin === false) return null;
    const e = h.entities?.[c.entity];
    return e?.platform === 'motor_ha' ? h.devices?.[e.device_id]?.config_entries?.[0] || null : null;
  }

  // nagłówek jak w kafelku HA + wiersz automatyki (powód ruchu, pauza) – wspólny dla okien i bram
  _naglowek(c) {
    return `<div class="gl" role="button" tabindex="0"><div class="ik"><ha-icon icon="${IKONY[c.rodzaj] || IKONY[c.oslona] || IKONY.zebra}"></ha-icon></div>
  <div class="opis"><span class="nazwa"></span><span class="stan"></span></div>
  <svg class="kompas" viewBox="-20 -20 40 40" hidden aria-hidden="true"><circle r="17" fill="none" stroke="var(--divider-color)" stroke-width="2"/>
   <path d="M-9 -15h18" stroke="var(--primary-color)" stroke-width="4" stroke-linecap="round"/><circle class="sl" r="4.5" fill="#ffb300"/></svg></div>
 <div class="auto" hidden><i class="aik"></i><span></span><button class="wzn" hidden>${esc(this._T.karta.wznow)}</button></div>`;
  }
  _wspolne(q) {
    const el = { auto: q('.auto'), autoT: q('.auto span'), aik: q('.auto .aik'), wzn: q('.wzn'), kompas: q('.kompas'), sl: q('.kompas .sl'), ikona: q('.ik ha-icon') };
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
    this._brama = true; this._uk = false; this._poziomo = false; this._kas = 0; this._brNoc = null;
    // nowy rodzaj (markiza koszowa, okno dachowe, szlaban…): własny rysunek z kafle_ruch.js, jedzie razem z silnikiem
    this._brTyp = maZdjecieBramy(c.rodzaj) ? c.rodzaj : c.oslona;
    this._scenaRuchu = wlasnyRuch(c.rodzaj) && !maZdjecieBramy(this._brTyp) ? c.rodzaj : null; this._ostO = null;
    const st = this._hass.states[c.entity], zPoz = (st?.attributes?.supported_features ?? 0) & 4;
    root.innerHTML = `<style>${STYL_STALY}${STYL_IKU}${STYL_BRAMY}</style>
<ha-card class="brama"><div class="mh">
 ${this._naglowek(c)}
 <div class="scena"><div class="bramaw" role="button" tabindex="0"></div></div>
 ${c.przyciski !== false ? `<div class="przyc">
  <button class="otw" title="${esc(this._lok('ui.card.cover.open_cover', T.karta.otworz))}">${ikUI('gora', '<ha-icon icon="mdi:arrow-up"></ha-icon>')}</button>
  <button class="stp" title="${esc(this._lok('ui.card.cover.stop_cover', T.karta.stop))}">${ikUI('stop', '<ha-icon icon="mdi:stop"></ha-icon>')}</button>
  <button class="zam" title="${esc(this._lok('ui.card.cover.close_cover', T.karta.zamknij))}">${ikUI('dol', '<ha-icon icon="mdi:arrow-down"></ha-icon>')}</button></div>` : ''}
 ${c.suwak !== false && zPoz ? this._suwakHtml(T, false) : ''}
 ${this._wpis() ? `<div class="stopka"><button class="zmien">⚙ ${esc(T.urzadzenie.zmien)}</button><button class="zmien wyg">🎨 ${esc(T.urzadzenie.wyglad)}</button></div>` : ''}
</div></ha-card>`;
    const q = s => root.querySelector(s);
    this._el = { ...this._wspolne(q), karta: q('ha-card'), nazwa: q('.nazwa'), stan: q('.stan'), ik: q('.ik'), suwak: q('.suwak'), suwaki: [...root.querySelectorAll('.suwak')],
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
    q('.zmien:not(.wyg)')?.addEventListener('click', () => konfiguruj(this._wpis()));
    q('.wyg')?.addEventListener('click', () => this._wyglad());
    this._zbudowana = true;
  }

  _lok(klucz, zapas) { return this._hass?.localize?.(klucz) || zapas; }
  _wiecej() { this.dispatchEvent(new CustomEvent('hass-more-info', { bubbles: true, composed: true, detail: { entityId: this._cfg.entity } })); }

  // „Wygląd”: kreator od razu na kroku kolorów; pasek kroków u góry przenosi do innych kroków
  async _wyglad() {
    const wpis = this._wpis();
    try { await this._hass.callWS({ type: 'motor_ha/krok', entry_id: wpis, krok: this._brama ? 'rodzaj' : 'kolory' }); } catch (e) { /* starszy Motor HA – cały kreator */ }
    konfiguruj(wpis);
  }

  // polecenie dla wszystkich (albo wybranych) skrzydeł; cel null = stop
  _polecenie(cel, ktore) {
    const c = this._cfg, teraz = performance.now(), czl = this._czl || [];
    // pola na tym samym silniku jadą razem
    const idx = ktore ? czl.map((_, i) => i).filter(i => ktore.some(k => czl[k] === czl[i])) : czl.map((_, i) => i);
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
    const r = pole.getBoundingClientRect(), gora = this._el.pola.find(x => x.p === pole)?.kas ?? this._kas, zakres = r.height - gora - LISTWA - POD_LISTWA;
    return Math.round(100 - Math.min(1, Math.max(0, (y - r.top - gora) / zakres)) * 100);
  }
  _gornaListwy(wys, p, kas = this._kas) { return kas - 2 + (wys - kas - LISTWA - POD_LISTWA + 2) * (100 - p) / 100; }

  _ciagnij(el, idx, srodek) {
    let start = null, wart = null;
    const pole = i => this._el.pola[i].p;
    el.addEventListener('pointerdown', e => { start = e.clientY; wart = null; this._ciagnie = true; el.setPointerCapture?.(e.pointerId); e.stopPropagation(); });
    el.addEventListener('pointermove', e => {
      if (start === null || (wart === null && Math.abs(e.clientY - start) < 6)) return;
      wart = this._pozycjaZ(pole(idx[0]), e.clientY);
      const ktore = srodek || this._cfg.osobno || this._uk || this._czl?.length < 2 ? idx : this._el.pola.map((_, i) => i);
      ktore.forEach(i => this._pokazCel(i, wart, true));
    });
    const koniec = () => {
      if (start === null) return;
      start = null; this._ciagnie = false;
      this._el.pola.forEach((_, i) => this._pokazCel(i, null));
      const ktore = srodek || !((this._cfg.osobno || this._uk) && this._czl?.length > 1) ? null : idx;
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

  _suwakHtml(T, pion, i = null) {
    return `<div class="suwak${pion ? ' pion' : ''}"${i === null ? '' : ` data-i="${i}"`} role="slider" tabindex="0" aria-orientation="${pion ? 'vertical' : 'horizontal'}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(this._lok('ui.card.cover.position', T.karta.pozycja))}"><div class="wyp"></div></div>`;
  }

  _suwak(el) {
    let akt = false;
    const pion = el.classList.contains('pion');
    // suwak z data-i steruje tylko swoją osłoną (osobne skrzydła), bez – wszystkimi
    const ktore = el.dataset.i === undefined ? undefined : [+el.dataset.i];
    const wart = e => {
      const r = el.getBoundingClientRect(), u = pion ? (r.bottom - e.clientY) / r.height : (e.clientX - r.left) / r.width;
      return Math.round(Math.min(1, Math.max(0, u)) * 100);
    };
    el.addEventListener('pointerdown', e => { akt = true; this._suwakW = wart(e); this._suwakEl = el; el.setPointerCapture?.(e.pointerId); this._rysujSuwak(); });
    el.addEventListener('pointermove', e => { if (akt) { this._suwakW = wart(e); this._rysujSuwak(); } });
    const koniec = () => { if (!akt) return; akt = false; const w = this._suwakW; this._suwakW = null; this._suwakEl = null; this._polecenie(w, ktore); };
    el.addEventListener('pointerup', koniec); el.addEventListener('pointercancel', koniec);
    el.addEventListener('keydown', e => {
      const d = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5, PageUp: 10, PageDown: -10 }[e.key];
      if (d) { e.preventDefault(); this._polecenie(Math.max(0, Math.min(100, Math.round(this._wartSuwaka(el) + d))), ktore); }
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
      r.czas = czasPrzejazdu(c.czas, obroty(h, e, this._uk ? c.pola[i]?.predkosc : c[i ? 'predkosc_prawa' : 'predkosc_lewa']), e);
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
      // zdjęcie z Canvy (pora × pogoda); na nim tylko żywe krople, płatki, mgła i błysk – słońce, chmury i gwiazdy są już na zdjęciu
      const fot = c.widok !== false ? zdjecieWidoku(WIDOK, rodzaj, pora) : null;
      const bezNieba = h => h.replace(/<i class="(slonce|ksiezyc|chm|gw)[^>]*><\/i>/g, '');
      E.skrz.forEach((S, i) => {
        if (S.niebo) S.niebo.style.background = bg;
        if (S.za) S.za.style.background = bg;
        const [nr, ile] = this._uk ? [0, 1] : [i, czl.length];   // pola: jeden widok na całe okno
        if (S.osiedle) S.osiedle.innerHTML = fot
          ? `<img class="fotw" src="/motor_ha/widok/${fot.plik}.webp?v=${WERSJA}" alt="" draggable="false" style="width:${ile * 100}%;left:${-nr * 100}%${fot.filtr ? ';filter:' + fot.filtr : ''}">`
          : c.widok !== false ? widokSvg(rodzaj, pora, nr, ile) : '';
        if (S.pg) S.pg.innerHTML = fot ? bezNieba(pogoda(rodzaj, pora, nr, ile)) : pogoda(rodzaj, pora, nr, ile);
        S.s.classList.toggle('slonecznie', pora === 'dzien' && (rodzaj === 'slonce' || rodzaj === 'chmurki'));
      });
      if (E.pgz) E.pgz.innerHTML = ['deszcz', 'ulewa', 'burza', 'snieg', 'deszczsnieg', 'mgla'].includes(rodzaj) ? pogoda(rodzaj, pora, 0, 1).replace(/<i class="(slonce|ksiezyc|chm|gw)[^>]*><\/i>/g, '') : '';
    }
    if (this._brama) return this._aktualizujBrame(c, czl, st, pora);
    // czujniki okna
    const auto = c.auto_czujniki !== false && !this._uk ? czujnikiOkna(h, czl[0]) : [];
    const okno = this._uk ? c.pola.map(p => h.states[p.czujnik]?.state === 'on' ? (p.tryb === 'otworz' ? 'otw' : 'uch') : '')
      : [0, 1].map(k => {
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
    // numer pola tylko wtedy, gdy czujników okna jest kilka (jeden czujnik w polu 9 = po prostu „Okno uchylone”)
    const ileCz = this._uk ? c.pola.filter(p => p.czujnik).length : czl.length;
    okno.forEach((o, k) => { if (o && k < czl.length) czesci.push(`${T.karta.okno}${ileCz > 1 ? ' ' + (this._uk ? k + 1 : k ? T.karta.prawe : T.karta.lewe) : ''} ${o === 'otw' ? T.karta.otwarte : T.karta.uchylone}`); });
    this._opisStanu = czesci;
    this._automatyka(c, h);
    const otwarte = this._ruchy.some(r => (r.widac ?? 0) > 0);
    E.karta.style.setProperty('--mh-kolor', otwarte ? 'var(--primary-color)' : 'var(--state-cover-inactive-color,var(--state-inactive-color,var(--disabled-color)))');
    this._animuj();
  }

  // wiersz automatyki: dlaczego osłona stoi tak, jak stoi; przy pauzie przycisk „Wznów”
  _automatyka(c, h) {
    const E = this._el, enc = c.encje || {};
    E.karta.classList.toggle('ciemny', !!h.themes?.darkMode);
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
        const ik = pauza ? 'pauza' : blad ? 'uwaga' : 'automat';
        if (E.aik.dataset.n !== ik) { E.aik.dataset.n = ik; E.aik.innerHTML = ikUI(ik, `<ha-icon icon="${{ pauza: 'mdi:pause-circle-outline', uwaga: 'mdi:alert-circle-outline', automat: 'mdi:robot-outline' }[ik]}"></ha-icon>`); }
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
    if (this._scenaRuchu) E.bramaw.setAttribute('aria-label', T.oslony[c.rodzaj] || '');
    else if (noc !== this._brNoc) {
      this._brNoc = noc;
      this._brZdj = maZdjecieBramy(this._brTyp);
      E.bramaw.innerHTML = this._brZdj ? bramaZdjecie(this._brTyp, noc) : rysunekBramy(c.oslona, hex(c.kolor), ramaHex(c.rama), noc, !!c.przeszkoda);
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
    E.ikona?.setAttribute('icon', (otwarte && IKONY_OTW[c.rodzaj === c.oslona || czyBrama(c.rodzaj) ? c.oslona : '']) || IKONY[c.rodzaj] || IKONY[c.oslona] || 'mdi:gate');
    E.karta.style.setProperty('--mh-kolor', otwarte ? 'var(--primary-color)' : 'var(--state-cover-inactive-color,var(--state-inactive-color,var(--disabled-color)))');
    this._animuj();
  }

  _pokazCel(i, p, ciagnie) {
    const P = this._el.pola[i]; if (!P) return;
    if (p === null || p === undefined) { P.cel.style.display = 'none'; return; }
    const wys = P.p.clientHeight;
    P.cel.style.display = 'block';
    P.cel.style.top = (this._gornaListwy(wys, p, P.kas) + LISTWA) + 'px';
    P.celT.textContent = (ciagnie ? '' : '→ ') + p + ' %';
  }

  // pozycja pokazywana na suwaku: jego osłona (osobne skrzydła) albo średnia wszystkich
  _wartSuwaka(S) {
    const i = S.dataset.i, r = i === undefined ? null : this._ruchy[+i];
    return r && r.widac !== null ? r.widac : this._srednia();
  }

  _rysujSuwak() {
    (this._el.suwaki || []).forEach(S => {
      // w trakcie jazdy suwak idzie razem z osłoną na rysunku; cel widać tylko przy przeciąganiu
      const w = (this._suwakEl === S ? this._suwakW : null) ?? this._wartSuwaka(S);
      // jak ha-control-slider: przy 0 % zostaje pasek z uchwytem, żeby było widać, że to suwak
      S.querySelector('.wyp').style[S.classList.contains('pion') ? 'height' : 'width'] = `calc(16px + (100% - 16px) * ${Math.max(0, Math.min(100, w)) / 100})`;
      S.setAttribute('aria-valuenow', Math.round(w));
    });
  }

  _rysuj() {
    const E = this._el, ile = E.pola.length;
    if (this._brama && this._ruchy[0]?.widac !== null) {
      const w = this._ruchy[0].widac;
      if (this._brZdj) ustawBrameZdj(E.bramaw, this._brTyp, w);
      else if (!this._scenaRuchu) ustawBrame(E.svg, this._cfg.oslona, w);
      else if (this._ostO === null || Math.abs(w - this._ostO) >= .4 || (w !== this._ostO && (w === 0 || w === 100))) {
        this._ostO = w;
        E.bramaw.innerHTML = kafelRuch(this._scenaRuchu, w / 100, hex(this._cfg.kolor), ramaHex(this._cfg.rama));
      }
    }
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
      if (this._foto) {   // zdjęcie osłony: odsłania się od dołu, dolna listwa jest na zdjęciu
        P.oslona.style.top = '0'; P.oslona.style.height = (100 - r.widac).toFixed(2) + '%';
        if (!this._ciagnie) this._pokazCel(i, r.jedzie && r.komenda ? Math.round(r.cel) : null);
        P._dol = P.p.offsetTop + (P.p.parentElement?.offsetTop || 0) + wys * (100 - r.widac) / 100;
        return;
      }
      const kas = P.kas ?? this._kas, gora = this._gornaListwy(wys, r.widac, kas);
      P.oslona.style.height = Math.max(0, gora - (kas - 2) + 1) + 'px';
      P.oslona.style.top = (kas - 2) + 'px';
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
