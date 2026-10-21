/* 🪟 Okno HA – panel w menu bocznym HA.
   Lista okien z integracji (żywe karty) i kreator z kółkami i obrazkami – ten sam edytor co w karcie.
   Zmiany w edytorze okna z integracji karta sama zapisuje w urządzeniu (okno_ha/zapisz). */

const T = {
  pl: { tytul: 'Okno HA', dodaj: '➕ Dodaj okno', zmien: '✏️ Zmień', wroc: '← Wróć do listy', zapisz: '💾 Utwórz okno',
    puste: 'Nie masz jeszcze żadnego okna. Kliknij „Dodaj okno”, a kreator przeprowadzi Cię krok po kroku.',
    zapisano: 'Zmiany zapisują się same w urządzeniu okna.', nowe: 'Nowe okno – przejdź kreator, a na końcu kliknij „Utwórz okno”.',
    brak: 'Najpierw wybierz roletę w kroku 1.', ok: 'Gotowe – okno dodane jako urządzenie.', laduje: 'Wczytuję kartę Okno HA…' },
  en: { tytul: 'HA Window', dodaj: '➕ Add window', zmien: '✏️ Edit', wroc: '← Back to the list', zapisz: '💾 Create window',
    puste: 'No windows yet. Click “Add window” and the wizard guides you step by step.',
    zapisano: 'Changes are saved to the window device automatically.', nowe: 'New window – go through the wizard, then click “Create window”.',
    brak: 'Pick the blind in step 1 first.', ok: 'Done – the window was added as a device.', laduje: 'Loading the HA Window card…' },
};

class OknoHaPanel extends HTMLElement {
  set hass(h) {
    const pierwszy = !this._hass; this._hass = h;
    if (pierwszy) this._start();
    this.querySelectorAll('okno-ha, okno-ha-editor').forEach(e => { e.hass = h; });
  }
  set narrow(n) { this._narrow = n; }
  set panel(p) { this._panel = p; }
  get L() { return T[(this._hass?.locale?.language || this._hass?.language || 'pl').startsWith('pl') ? 'pl' : 'en']; }

  async _start() {
    this.innerHTML = `<style>
      okno-ha-panel{display:block;background:var(--primary-background-color);min-height:100vh}
      .gora{display:flex;align-items:center;gap:12px;height:56px;padding:0 12px;background:var(--app-header-background-color,var(--primary-color));color:var(--app-header-text-color,#fff);font-size:20px}
      .gora img{width:32px;height:32px}
      .tresc{max-width:1100px;margin:0 auto;padding:16px}
      .pasek{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:16px}
      .pasek button,.okno button{font:inherit;font-size:15px;padding:10px 16px;border-radius:10px;border:0;cursor:pointer;background:var(--primary-color);color:var(--text-primary-color,#fff)}
      .pasek button.drugi{background:var(--secondary-background-color);color:var(--primary-text-color)}
      .siatka{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
      .okno{display:flex;flex-direction:column;gap:8px}
      .info{padding:12px 16px;border-radius:10px;background:var(--card-background-color);color:var(--primary-text-color);border-left:4px solid var(--primary-color)}
    </style>
    <div class="gora"><ha-menu-button></ha-menu-button><img src="/okno_ha/ikona.png" alt=""><span>${this.L.tytul}</span></div>
    <div class="tresc"><p class="info">${this.L.laduje}</p></div>`;
    const mb = this.querySelector('ha-menu-button'); mb.hass = this._hass; mb.narrow = this._narrow;
    if (!customElements.get('okno-ha-editor')) {
      await Promise.race([customElements.whenDefined('okno-ha-editor'), new Promise(r => setTimeout(r, 3000))]);
      if (!customElements.get('okno-ha-editor')) await import(`/okno_ha/okno-ha.js?t=${Date.now()}`);
    }
    const okno = new URLSearchParams(location.search).get('okno');
    await this._lista();
    if (okno) { const w = this._okna.find(x => x.entry_id === okno); if (w) this._edytuj(w); }
  }

  get _tresc() { return this.querySelector('.tresc'); }

  async _lista() {
    this._okna = await this._hass.callWS({ type: 'okno_ha/lista' });
    const t = this._tresc; t.innerHTML = '';
    const pasek = document.createElement('div'); pasek.className = 'pasek';
    const dodaj = document.createElement('button'); dodaj.textContent = this.L.dodaj; dodaj.onclick = () => this._nowe();
    pasek.append(dodaj); t.append(pasek);
    if (!this._okna.length) { t.insertAdjacentHTML('beforeend', `<p class="info">${this.L.puste}</p>`); return; }
    const siatka = document.createElement('div'); siatka.className = 'siatka'; t.append(siatka);
    for (const w of this._okna) {
      if (!w.entity_id) continue;
      const box = document.createElement('div'); box.className = 'okno';
      const karta = document.createElement('okno-ha');
      karta.setConfig({ type: 'custom:okno-ha', entity: w.entity_id }); karta.hass = this._hass;
      const b = document.createElement('button'); b.textContent = `${this.L.zmien} – ${w.nazwa}`; b.onclick = () => this._edytuj(w);
      box.append(karta, b); siatka.append(box);
    }
  }

  _pasekPowrotu(extra) {
    const t = this._tresc; t.innerHTML = '';
    const pasek = document.createElement('div'); pasek.className = 'pasek';
    const wroc = document.createElement('button'); wroc.className = 'drugi'; wroc.textContent = this.L.wroc;
    wroc.onclick = () => { history.replaceState(null, '', location.pathname); this._lista(); };
    pasek.append(wroc, ...(extra || [])); t.append(pasek);
    return t;
  }

  /* okno z integracji: zwykły edytor karty – sam zapisuje każdą zmianę w urządzeniu */
  _edytuj(w) {
    const t = this._pasekPowrotu();
    t.insertAdjacentHTML('beforeend', `<p class="info">${this.L.zapisano}</p>`);
    const ed = document.createElement('okno-ha-editor');
    ed.hass = this._hass; ed.setConfig({ type: 'custom:okno-ha', entity: w.entity_id });
    t.append(ed);
  }

  /* nowe okno: kreator karty od kroku 1, na końcu „Utwórz okno” */
  _nowe() {
    let cfg = { type: 'custom:okno-ha' };
    const zapisz = document.createElement('button'); zapisz.textContent = this.L.zapisz;
    const t = this._pasekPowrotu([zapisz]);
    const info = document.createElement('p'); info.className = 'info'; info.textContent = this.L.nowe; t.append(info);
    const ed = document.createElement('okno-ha-editor');
    ed.hass = this._hass; ed.setConfig(cfg);
    ed.addEventListener('config-changed', e => { cfg = e.detail.config; });
    t.append(ed);
    zapisz.onclick = async () => {
      if (!String(cfg.entity || '').startsWith('cover.')) { info.textContent = this.L.brak; return; }
      zapisz.disabled = true;
      try {
        await this._hass.callWS({ type: 'okno_ha/utworz', karta: cfg });
        info.textContent = this.L.ok; setTimeout(() => this._lista(), 1200);
      } catch (e) { info.textContent = e.message || String(e); zapisz.disabled = false; }
    };
  }
}
if (!customElements.get('okno-ha-panel')) customElements.define('okno-ha-panel', OknoHaPanel);
