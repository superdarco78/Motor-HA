// Pierwszy ekran Motor HA (przy instalacji i po aktualizacji): co nowego i co Motor HA dodaje do Home Assistanta –
// karta okna na wybranym panelu, widoku i miejscu, karta „Cały dom”, skróty, panel w pasku bocznym, Assist,
// powiadomienia i automatyka ze wszystkimi scenariuszami. „Co wygrywa” liczy prawdziwa logika integracji (motor_ha/symuluj).
import { TEKSTY, jezyk, wstaw } from './jezyk.js';
import { WERSJA } from './stale.js';
import { okno3d, marginesDla } from './okno3d_uklad.js';

const esc = s => String(s ?? '').replace(/[&<>"]/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]);
const IK = {
  karta: 'M3 3h8v8H3V3m10 0h8v5h-8V3M3 13h8v8H3v-8m10-3h8v11h-8V10Z',
  dom: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z',
  skroty: 'M13 3 4 14h7l-1 7 9-11h-7l1-7Z',
  pasek: 'M4 4h16v2H4V4m0 4h10v2H4V8m0 4h16v2H4v-2m0 4h10v2H4v-2Z',
  assist: 'M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3m7 9c0 3.5-2.6 6.4-6 6.9V21h-2v-3.1c-3.4-.5-6-3.4-6-6.9h2a5 5 0 0 0 10 0h2Z',
  ukryj: 'M2 4.27 3.27 3 21 20.73 19.73 22l-3.35-3.35c-1.35.54-2.83.85-4.38.85-5 0-9.27-3.11-11-7.5a11.9 11.9 0 0 1 3.73-5L2 4.27M12 7a5 5 0 0 1 4.64 6.82l2.93 2.93A11.9 11.9 0 0 0 23 12c-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7L10.17 7.4C10.74 7.13 11.35 7 12 7Z',
  powiadom: 'M21 19v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4a2 2 0 0 1 4 0v.3c3 .9 5 3.6 5 6.7v6l2 2m-7 2a2 2 0 0 1-4 0',
  auto: 'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0-5 2.4 3.3L12 5 9.6 5.3 12 2M2 12l3.3-2.4L5 12l.3 2.4L2 12m20 0-3.3 2.4.3-2.4-.3-2.4L22 12',
  nowa_wersja: 'M12 4V1L8 5l4 4V6a6 6 0 0 1 6 6c0 1-.25 1.97-.7 2.8l1.46 1.46A7.9 7.9 0 0 0 20 12a8 8 0 0 0-8-8m0 14a6 6 0 0 1-6-6c0-1 .25-1.97.7-2.8L5.24 7.74A7.9 7.9 0 0 0 4 12a8 8 0 0 0 8 8v3l4-4-4-4v3Z'
};
const OPCJE = ['karta', 'dom', 'skroty', 'pasek', 'assist', 'ukryj', 'powiadom', 'auto', 'nowa_wersja'];
// tryby: Wszystko – wszystko poza kartą „Cały dom” i ukrywaniem silników; Samo urządzenie – tylko Assist i ten ekran
const TRYB = { pelny: k => !['dom', 'ukryj'].includes(k), samo: k => ['assist', 'nowa_wersja'].includes(k) };
const WARUNKI = ['slonce', 'upal', 'wiatr', 'deszcz', 'okno', 'dym', 'alarm', 'spie', 'nikogo', 'reka'];
const LOGO = '/motor_ha/ikona.png';

const STYL = `
:host{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:rgba(0,0,0,.45);font-family:var(--ha-font-family-body,Roboto,Noto,sans-serif);
 --k:var(--card-background-color,#fff);--k2:var(--secondary-background-color,#f2f4f5);--t:var(--primary-text-color,#212121);--d:var(--secondary-text-color,#727272);
 --g:var(--primary-color,#009ac7);--a:var(--accent-color,#ff9800);--l:var(--divider-color,#e0e0e0);--w:var(--disabled-color,#bdbdbd)}
*{box-sizing:border-box}
.dlg{background:var(--k);color:var(--t);border-radius:var(--ha-dialog-border-radius,24px);width:min(560px,calc(100vw - 32px));max-height:calc(100vh - 48px);display:flex;flex-direction:column;box-shadow:0 8px 28px rgba(0,0,0,.28);overflow:hidden}
@media (max-width:600px){.dlg{width:100vw;max-height:100vh;height:100%;border-radius:0}}
header{display:flex;gap:14px;align-items:center;padding:20px 22px 8px}
header img{width:52px;height:52px;border-radius:12px}
h2{font-size:var(--ha-font-size-xl,20px);font-weight:var(--ha-font-weight-normal,400);margin:0}
.wer{font-size:13px;color:var(--d)}
.x{margin-left:auto;border:0;background:none;color:var(--d);width:40px;height:40px;border-radius:50%;cursor:pointer;display:grid;place-items:center}
.x svg{width:24px;height:24px;fill:currentColor}
.tresc{padding:6px 22px 8px;display:grid;gap:12px;overflow:auto;flex:1}
.nowe{background:var(--k2);border-radius:12px;padding:10px 14px}
.nowe b,.tyt{font-weight:500}
.nowe ul{margin:6px 0 0;padding-left:18px;font-size:14px}
.opcja2{display:grid;background:var(--k2);border-radius:12px}
.opcja{display:grid;grid-template-columns:40px 1fr auto;gap:12px;align-items:center;padding:10px 12px;cursor:pointer}
.ik{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--g) 16%,transparent);color:var(--g)}
.ik svg{width:22px;height:22px;fill:currentColor}
.opcja b{display:block;font-weight:500;font-size:15px}
.opcja span span{display:block;font-size:13px;color:var(--d)}
.tg{position:relative;width:46px;height:26px;flex:none}
.tg input{position:absolute;inset:0;opacity:0;margin:0;cursor:pointer}
.tg i{position:absolute;inset:0;border-radius:13px;background:var(--w);transition:background .15s}
.tg i::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .15s}
.tg input:checked+i{background:var(--g)}.tg input:checked+i::after{transform:translateX(20px)}
.tg input:focus-visible+i,button:focus-visible,select:focus-visible{outline:3px solid var(--a);outline-offset:2px}
.jak{margin:0;padding:0 12px 10px 64px;font-size:13px}.jak b{font-weight:500;color:var(--g)}.jak.wyl b{color:var(--d)}
.pod{padding:0 12px 12px 64px;display:grid;gap:8px}
@media (max-width:520px){.pod,.jak{padding-left:12px}}
.siatka2{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
label.p{display:grid;gap:3px;font-size:12.5px;color:var(--d)}
select{font-size:14px;font-family:inherit;padding:7px 8px;border-radius:8px;border:1px solid var(--l);background:var(--k);color:var(--t);width:100%}
.mini{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;background:var(--k);border:1px solid var(--l);border-radius:10px;padding:8px}
.mini .h{grid-column:1/-1;font-size:11.5px;color:var(--d);font-weight:500;letter-spacing:.04em;text-transform:uppercase}
.mini .c{height:30px;border-radius:6px;background:var(--l)}
.mini .c.nowa{background:var(--a);color:#fff;font-size:11px;display:grid;place-items:center;font-weight:500}
.podpis{font-size:13px;color:var(--d);margin:0}
.rzadek{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:13.5px}
.rzadek label{display:flex;gap:6px;align-items:center}
.chip{font-size:13px;padding:5px 10px;border-radius:14px;background:var(--k);border:1px solid var(--l)}
.tryby{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}
.tryby button{font:inherit;text-align:left;padding:10px 12px;border-radius:12px;border:2px solid var(--l);background:var(--k2);color:var(--t);cursor:pointer;display:grid;gap:2px}
.tryby button b{font-weight:500}.tryby button span{font-size:12.5px;color:var(--d)}
.tryby button[aria-checked="true"]{border-color:var(--g)}
.reg{display:grid;gap:6px}
.reg label{display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:start;background:var(--k);border:1px solid var(--l);border-radius:10px;padding:8px 10px;font-size:13.5px}
.reg label span span{display:block;font-size:12.5px;color:var(--d)}
.reg em{font-style:normal;font-size:12px;color:var(--g);display:block}
details{background:var(--k);border:1px solid var(--l);border-radius:10px;padding:8px 10px}
summary{cursor:pointer}
.symA{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:10px;margin-top:8px}
@media (max-width:520px){.symA{grid-template-columns:1fr}}
.symL,.symP{display:grid;gap:6px;align-content:start}
.war{display:grid;gap:4px;font-size:13.5px}.war label{display:flex;gap:6px;align-items:center}
.oknoS{position:relative;width:100%;aspect-ratio:1.4/1}
.werdykt{font-size:14px;background:var(--k2);border-radius:8px;padding:8px 10px}.werdykt b{color:var(--g)}
.kolej{margin:6px 0 0;padding-left:0;list-style:none;display:grid;gap:3px;font-size:13px;color:var(--d)}
.kolej li span{font-size:12px;margin-left:6px;padding:1px 7px;border-radius:9px;background:var(--w);color:#fff}
.kolej li.wygrywa{color:var(--t);font-weight:500}.kolej li.wygrywa span{background:var(--a)}
.kolej li.ogranicza{color:var(--t)}.kolej li.ogranicza span{background:var(--g)}
.ist{display:flex;gap:8px;align-items:flex-start;font-size:13.5px;background:color-mix(in srgb,var(--a) 12%,transparent);border-radius:12px;padding:10px 12px}
footer{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 22px 18px;flex-wrap:wrap;border-top:1px solid var(--l)}
footer .maly{font-size:12.5px;color:var(--d);flex:1 1 220px}
.przyc{display:flex;gap:8px;flex-wrap:wrap}
.btn{font-size:14px;font-weight:500;font-family:inherit;padding:10px 20px;border-radius:20px;border:0;background:var(--g);color:var(--text-primary-color,#fff);cursor:pointer}
.btn.txt{background:none;color:var(--g);padding:10px 12px}
.btn:disabled{opacity:.6;cursor:default}
.wynik{font-size:13.5px;color:var(--g)}
[hidden]{display:none!important}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}`;

export class MotorHaEkran extends HTMLElement {
  set hass(h) { this._hass = h; }
  get hass() { return this._hass; }

  async otworz(dane) {
    this.dane = dane;
    const h = this._hass, T = TEKSTY[jezyk({}, h)], E = this.E = T.ekran;
    const u = this.u = { ...dane.ustawienia };
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    const opcja = (k, pod = '') => `<div class="opcja2"><label class="opcja"><span class="ik"><svg viewBox="0 0 24 24"><path d="${IK[k]}"/></svg></span>
      <span><b>${esc(E.opcje[k][0])}</b><span>${esc(E.opcje[k][1])}</span></span><span class="tg"><input type="checkbox" data-o="${k}" ${u[k] ? 'checked' : ''}><i></i></span></label>
      <p class="jak" data-jak="${k}"></p>${pod ? `<div class="pod" data-dla="${k}">${pod}</div>` : ''}</div>`;
    const panele = dane.panele.map(p => `<option value="${esc(p.klucz)}" ${p.klucz === u.panel ? 'selected' : ''}>${esc(p.nazwa)}</option>`).join('');
    const karta = dane.panele.length ? `<div class="siatka2">
        <label class="p">${esc(E.panel)}<select id="panel">${panele}</select></label>
        <label class="p">${esc(E.widok)}<select id="widok"></select></label>
        <label class="p" style="grid-column:1/-1">${esc(E.miejsce)}<select id="miejsce">${Object.entries(E.miejsca).map(([k, n]) => `<option value="${k}" ${k === u.miejsce ? 'selected' : ''}>${esc(n)}${k === 'sekcja' ? ` (${esc(E.proponowane)})` : ''}</option>`).join('')}</select></label>
      </div><div class="mini" id="mini" aria-hidden="true"></div><p class="podpis" id="miniOpis"></p>` : `<p class="podpis">${esc(E.brakPanelu)}</p>`;
    const skroty = `<div class="rzadek">${E.skroty.map(s => `<span class="chip">${esc(s)}</span>`).join('')}</div><p class="podpis">${esc(E.skrotyOpis)}</p>`;
    const powiadom = `<div class="rzadek"><label><input type="checkbox" data-o="telefon" ${u.telefon ? 'checked' : ''}> ${esc(E.telefon)}</label></div>
      <p class="podpis">${esc(dane.telefony ? E.wHa : E.brakTelefonu)}</p>`;
    const auto = `<p class="podpis">${esc(E.scenOpis)}</p>
      <div class="reg">${dane.scenariusze.map((k, i) => `<label><input type="checkbox" data-s="${k}" ${u.scenariusze.includes(k) ? 'checked' : ''}><span><b>${i + 1}. ${esc(E.scen[k][0])}</b><span>${esc(E.scen[k][1])}</span><em>${esc(E.skad)}: ${esc(E.scen[k][2])}</em></span></label>`).join('')}</div>
      <details><summary><b>${esc(E.sprawdz)}</b></summary><p class="podpis" style="margin-top:6px">${esc(E.przyklad)}</p>
      <div class="symA"><div class="symL"><div class="podpis">${esc(E.zaznacz)}</div>
        <label class="p">${esc(E.pora)}<select id="pora">${Object.entries(E.pory).map(([k, n]) => `<option value="${k}" ${k === 'dzien' ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
        <div class="war" id="war">${WARUNKI.map(k => `<label><input type="checkbox" data-w="${k}" ${['slonce', 'upal', 'okno'].includes(k) ? 'checked' : ''}> ${esc(E.warunki[k])}</label>`).join('')}</div></div>
      <div class="symP"><div class="oknoS" id="oknoS"></div><div class="werdykt" id="werdykt" aria-live="polite"></div></div></div>
      <ul class="kolej" id="kolej"></ul></details>`;
    root.innerHTML = `<style>${STYL}</style><div class="dlg" role="dialog" aria-modal="true" aria-labelledby="tyt">
      <header><img src="${LOGO}" alt=""><div><h2 id="tyt">${esc(dane.pierwszy ? E.witaj : E.nowaWersja)}</h2><div class="wer">${esc(wstaw(E.wersja, dane.wersja))}</div></div>
        <button class="x" id="x" aria-label="${esc(E.pozniej)}"><svg viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/></svg></button></header>
      <div class="tresc">
        <div class="nowe"><b>${esc(wstaw(E.coNowego, dane.wersja))}</b><ul>${E.nowe.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>
        <div class="tyt">${esc(E.jak)}</div>
        <div class="tryby" role="radiogroup" id="tryb">${Object.entries(E.tryby).map(([k, [n, o]]) => `<button role="radio" aria-checked="${u.tryb === k}" data-t="${k}"><b>${esc(n)}</b><span>${esc(o)}</span></button>`).join('')}</div>
        <div class="tyt">${esc(E.co)}</div>
        ${opcja('karta', karta)}${opcja('dom')}${opcja('skroty', skroty)}${opcja('pasek')}${opcja('assist')}${opcja('ukryj')}${opcja('powiadom', powiadom)}${opcja('auto', auto)}${opcja('nowa_wersja')}
        ${dane.okna ? `<label class="ist"><input type="checkbox" id="ist"> <span>${esc(wstaw(E.istniejace, dane.okna))}</span></label>` : ''}
      </div>
      <footer><span class="maly" id="stopka">${esc(E.stopka)}</span>
        <div class="przyc"><button class="btn txt" id="pozniej">${esc(E.pozniej)}</button>
        <button class="btn" id="zapisz">${esc(dane.okna ? E.zapisz : E.zapiszDodaj)}</button></div></footer></div>`;
    const $ = s => root.querySelector(s);
    this.$ = $;
    $('#x').onclick = $('#pozniej').onclick = () => this.zamknij(true);
    this.addEventListener('keydown', e => { if (e.key === 'Escape') this.zamknij(true); });
    $('#tryb').onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      const t = b.dataset.t; this._tryb(t);
      if (TRYB[t]) root.querySelectorAll('.opcja input[data-o]').forEach(i => { i.checked = TRYB[t](i.dataset.o); });
      this._pokaz();
    };
    root.querySelectorAll('.opcja input[data-o]').forEach(i => i.addEventListener('change', () => { this._tryb('wlasny'); this._pokaz(); }));
    if ($('#panel')) { $('#panel').onchange = () => { this._widoki(); this._mini(); }; $('#widok').onchange = $('#miejsce').onchange = () => this._mini(); this._widoki(); }
    root.addEventListener('change', e => { if (e.target.closest('#war,.reg') || e.target.id === 'pora') this._licz(); });
    $('#zapisz').onclick = () => this.zapisz();
    this._pokaz();
    this._licz();
    $('#zapisz').focus();
  }

  _tryb(t) { this.$('#tryb').querySelectorAll('button').forEach(x => x.setAttribute('aria-checked', x.dataset.t === t)); }

  _pokaz() {
    const r = this.shadowRoot, E = this.E;
    for (const k of OPCJE) {
      const on = r.querySelector(`input[data-o="${k}"]`).checked, j = r.querySelector(`[data-jak="${k}"]`);
      j.innerHTML = `<b>${esc(on ? E.jakDziala : E.gdyWyl)}:</b> ${esc(E.opisy[k][on ? 0 : 1])}`;
      j.classList.toggle('wyl', !on);
      r.querySelector(`[data-dla="${k}"]`)?.toggleAttribute('hidden', !on);
    }
    // skróty i karta „Cały dom” lądują na panelu wybranym przy karcie okna
    if (!r.querySelector('input[data-o="karta"]').checked) r.querySelector('[data-dla="skroty"]')?.setAttribute('hidden', '');
  }

  _widoki() {
    const p = this.dane.panele.find(x => x.klucz === this.$('#panel').value), E = this.E;
    const w = (p?.widoki || []).map((n, i) => `<option value="${i}">${esc(n)}${i === 0 ? ` (${esc(E.proponowane)})` : ''}</option>`);
    this.$('#widok').innerHTML = w.join('') + `<option value="nowy">${esc(E.nowyWidok)}</option>`;
    const u = this.u.widok;
    this.$('#widok').value = p?.klucz === this.dane.ustawienia.panel && (u === 'nowy' || +u < w.length) ? String(u) : (w.length ? '0' : 'nowy');
    this._mini();
  }

  _mini() {
    const E = this.E, m = this.$('#miejsce').value, wid = this.$('#widok').value;
    const p = this.$('#panel').selectedOptions[0]?.textContent || '', vs = this.$('#widok').selectedOptions[0]?.textContent || '';
    const c = n => '<div class="c"></div>'.repeat(n), N = `<div class="c nowa">${esc(E.oknoMini)}</div>`;
    const nazwa = wid === 'nowy' ? E.nowyWidok : `${p} · ${vs.replace(/ \(.*\)$/, '')}`;
    this.$('#mini').innerHTML = m === 'gora' ? `<div class="h">Motor HA</div>${N}${c(2)}<div class="h">${esc(nazwa)}</div>${c(3)}`
      : m === 'pokoj' ? `<div class="h">${esc(E.salon)}</div>${c(2)}${N}<div class="h">${esc(E.kuchnia)}</div>${c(3)}`
        : `<div class="h">${esc(nazwa)}</div>${wid === 'nowy' ? '' : c(5)}<div class="h">Motor HA</div>${N}`;
    this.$('#miniOpis').textContent = E.miniOpis[m] + (wid === 'nowy' ? ' ' + E.miniNowy : '');
  }

  _zbierz() {
    const r = this.shadowRoot, u = { ...this.u };
    r.querySelectorAll('input[data-o]').forEach(i => { u[i.dataset.o] = i.checked; });
    u.tryb = r.querySelector('#tryb [aria-checked="true"]')?.dataset.t || 'wlasny';
    u.scenariusze = [...r.querySelectorAll('input[data-s]')].filter(i => i.checked).map(i => i.dataset.s);
    if (this.$('#panel')) {
      u.panel = this.$('#panel').value; u.miejsce = this.$('#miejsce').value;
      u.widok = this.$('#widok').value === 'nowy' ? 'nowy' : +this.$('#widok').value;
    }
    delete u.widziana;
    return u;
  }

  async _licz() {
    const r = this.shadowRoot, E = this.E;
    const warunki = [...r.querySelectorAll('#war input')].filter(i => i.checked).map(i => i.dataset.w);
    const scenariusze = [...r.querySelectorAll('input[data-s]')].filter(i => i.checked).map(i => i.dataset.s);
    const nr = (this._nr = (this._nr || 0) + 1);
    let w;
    try { w = await this._hass.callWS({ type: 'motor_ha/symuluj', pora: this.$('#pora').value, warunki, scenariusze }); } catch (e) { return; }
    if (nr !== this._nr) return;   // kliknięto dalej – liczy się najnowsze
    const poz = w.poz ?? (w.baza_poz ?? 100);
    const glowny = w.baza ? w.baza_nazwa : w.powod_nazwa;
    let t = `<b>${esc(w.poz === null ? E.stoi : wstaw(E.oslona, w.poz))}</b><br>${esc(wstaw(E.wygrywa, ['brak', 'harm_dzien'].includes(w.baza || w.powod) && !warunki.length ? E.nic : glowny))}`;
    if (w.baza) t += `<br>${esc(w.poz === null ? wstaw(E.ogrStoi, w.baza_poz) : wstaw(E.ogranicza, w.baza_poz, w.poz))}`;
    this.$('#werdykt').innerHTML = t;
    this.$('#kolej').innerHTML = `<li class="podpis">${esc(E.kolejnosc)}</li>` + w.lista.map(x => `<li class="${x.stan}">${esc(E.warunki[x.warunek])}<span>${esc(E.stany[x.stan])}</span></li>`).join('');
    // podgląd: roleta zewnętrzna w tej pozycji (okno z klocków)
    try {
      const m = await okno3d(WERSJA), host = this.$('#oknoS');
      const cfg = { pola: [[0, 0, .5, 1], [.5, 0, .5, 1]], typy: ['natynkowa', 'natynkowa'], kolory: ['#3b3f45', '#3b3f45'], rama: '#f4f4f2',
        W: 1.68, H: 1.5, margines: marginesDla(['natynkowa'], 1.68, 1.5, .04), sciana: null, pozycje: [poz, poz] };
      if (this._ok) this._ok.ustaw(cfg); else this._ok = new m.Okno3D(host, cfg);
    } catch (e) { /* bez podglądu okna – werdykt zostaje */ }
  }

  async zapisz() {
    const E = this.E, b = this.$('#zapisz'), u = this._zbierz();
    b.disabled = true;
    try {
      const w = await this._hass.callWS({ type: 'motor_ha/ustawienia/zapisz', ustawienia: u, istniejace: !!this.$('#ist')?.checked });
      this.$('#stopka').className = 'wynik';
      this.$('#stopka').textContent = [E.zapisano, ...w.zrobione.map(z => E.zrobione[z]).filter(Boolean)].join(' ');
      setTimeout(() => {
        this.zamknij(false);
        if (!this.dane.okna && !okienkoHa()) {
          history.pushState(null, '', '/config/integrations/dashboard/add?domain=motor_ha');
          window.dispatchEvent(new CustomEvent('location-changed', { detail: { replace: false } }));
        }
      }, 1800);
    } catch (e) {
      b.disabled = false;
      this.$('#stopka').textContent = `${E.blad} ${e?.message || ''}`;
    }
  }

  zamknij(pozniej) {
    if (pozniej) try { sessionStorage.setItem('motorHaEkranPozniej', WERSJA); } catch (e) { /* bez pamięci sesji */ }
    this._ok?.zniszcz?.();
    this.remove();
  }
}

// otwiera ekran (na żądanie albo sam po instalacji / aktualizacji)
export async function otworzEkran(h, sam = false) {
  if (!h?.user?.is_admin || document.querySelector('motor-ha-ekran') || !customElements.get('motor-ha-ekran')) return false;
  const dane = await h.callWS({ type: 'motor_ha/ustawienia' });
  if (sam && !dane.pokaz) return false;
  const e = document.createElement('motor-ha-ekran');
  e.hass = h;
  document.body.appendChild(e);
  await e.otworz(dane);
  return true;
}

// okienko HA (dodawanie urządzenia) leży nad wszystkim – ekran czeka, aż się zamknie
// (element okienka zostaje w stronie po zamknięciu – otwarte ma parametry i <ha-dialog open>)
const okienkoHa = () => {
  const d = document.querySelector('home-assistant')?.shadowRoot?.querySelector('dialog-data-entry-flow');
  return !!(d && (d._params || d.shadowRoot?.querySelector('[open]')));
};

let sprawdzone = false, spokoj = 0;
export function pilnujEkranu() {
  if (sprawdzone || window.frameElement || location.pathname.startsWith('/motor-ha-start')) return;
  // dopiero gdy przez 3 sprawdzenia z rzędu nie ma okienka HA (po „Dodaj” okienko otwiera się chwilę po wejściu na stronę)
  spokoj = okienkoHa() ? 0 : spokoj + 1;
  if (spokoj < 3) return;
  const h = document.querySelector('home-assistant')?.hass;
  if (!h?.user || !h.connection) return;
  sprawdzone = true;
  if (!h.user.is_admin) return;
  try { if (sessionStorage.getItem('motorHaEkranPozniej') === WERSJA) return; } catch (e) { /* bez pamięci sesji */ }
  otworzEkran(h, true).catch(() => { sprawdzone = false; });
}
