// Kreator Motor HA w okienku HA (Ustawienia → Urządzenia i usługi). Integracja wkłada do opisu kroku obrazki SVG
// (pasek.py, galeria.py), a ten plik robi z nich rzeczy do dotykania:
// – pasek kroków przyklejony u góry; dotknięcie kroku przenosi od razu do niego (formularz wysyła ukryte pole idz_do),
// – kafelki rodzajów osłon i próbki kolorów: dotknięcie wybiera pozycję w polu poniżej,
// – żywy podgląd okna (prawdziwa karta Motor HA na udawanej osłonie), który zmienia się od razu przy wyborze.
// Gdy HA zmieni okienko i czegoś nie znajdziemy – zostają zwykłe obrazki i listy, nic się nie psuje.
// krok klasycznego kreatora → krok kreatora graficznego (otwarcie „od razu przy kroku”)
export const Z_KLASYCZNEGO = { rodzaj: 'rodzaj', lamele: 'rodzaj', kolory: 'kolory', okno: 'uklad', czujniki: 'przypisz',
  silnik: 'stoper', automatyka: 'auto', ustawienia: 'auto', powiadomienia: 'dzwonek', panel: 'gotowe' };

const ZNAK = 'data-motor-ha-pasek';
const GAL = 'data-motor-ha-galeria';
const PODGLAD = 'data-motor-ha-podglad';
const PREFIKS = 'data:image/svg+xml;base64,';
const ENCJA = 'cover.motor_ha_podglad';
const AKCENT = '#ff9800';
// pola formularza, które zmieniają wygląd okna w podglądzie
const WYGLAD = ['oslona', 'kolor', 'rama', 'skrzydla', 'osobno', 'odwroc', 'wysokosc', 'kolor_wlasny', 'rama_wlasna'];

function wszystkie(korzen, szukaj, wynik = [], n = 0) {
  if (!korzen || n > 12) return wynik;
  wynik.push(...korzen.querySelectorAll(szukaj));
  for (const e of korzen.querySelectorAll('*')) if (e.shadowRoot) wszystkie(e.shadowRoot, szukaj, wynik, n + 1);
  return wynik;
}
const glebiej = (korzen, szukaj) => wszystkie(korzen, szukaj)[0] || null;

const odkoduj = b64 => new TextDecoder().decode(Uint8Array.from(atob(b64), c => c.charCodeAt(0)));
const zakoduj = txt => btoa(String.fromCharCode(...new TextEncoder().encode(txt)));

function svgZ(img) {
  try {
    const src = img.getAttribute('src') || '';
    return src.startsWith(PREFIKS) ? odkoduj(src.slice(PREFIKS.length)) : '';
  } catch (e) { return ''; }
}

export function danePaska(svg) {
  const m = /data-motor-ha-kroki="([^"]*)"[^>]*data-krok="(\d+)"[^>]*data-aktywny="(\d+)"/.exec(svg);
  if (!m) return null;
  let podglad = null;
  const p = /data-podglad="([^"]*)"/.exec(svg);
  if (p) try { podglad = JSON.parse(odkoduj(p[1])); } catch (e) { /* bez podglądu */ }
  return { kroki: m[1].split(','), krok: +m[2], aktywny: +m[3], podglad };
}

export function daneGalerii(svg) {
  const a = n => (new RegExp(`${n}="([^"]*)"`).exec(svg) || [])[1];
  const pole = a('data-motor-ha-wybor');
  return pole ? { pole, opcje: (a('data-opcje') || '').split(','), kol: +a('data-kol') || 4 } : null;
}

// zmiana wartości w formularzu HA (step-flow-form trzyma odpowiedzi w _stepData i przerysowuje się po podmianie)
function ustaw(form, zmiany) {
  form._stepData = { ...(form._stepData || {}), ...zmiany };
  form.requestUpdate?.();
}

async function idz(form, krok) {
  ustaw(form, { idz_do: krok });
  if (typeof form._submitStep === 'function') await form._submitStep();
}

const hex = v => Array.isArray(v) && v.length === 3 ? '#' + v.map(x => Math.max(0, Math.min(255, +x || 0)).toString(16).padStart(2, '0')).join('') : null;

export function wygladPodgladu(podglad, odpowiedzi) {
  const c = { ...(podglad || {}) };
  for (const k of WYGLAD) if (odpowiedzi && odpowiedzi[k] !== undefined && odpowiedzi[k] !== null && odpowiedzi[k] !== '') c[k] = odpowiedzi[k];
  const kw = hex(c.kolor_wlasny), rw = hex(c.rama_wlasna);
  delete c.kolor_wlasny; delete c.rama_wlasna;
  if (kw) c.kolor = kw;
  if (rw) c.rama = rw;
  return c;
}

function pasek(form, img) {
  const d = danePaska(svgZ(img));
  if (!d) return null;
  img.setAttribute(ZNAK, '');
  const klik = (el) => (e) => {
    const r = el.getBoundingClientRect();
    if (!r.width) return;
    const i = Math.floor((e.clientX - r.left) / r.width * d.kroki.length);
    const k = d.kroki[Math.max(0, Math.min(d.kroki.length - 1, i))];
    if (k && i !== d.aktywny) idz(form, k);
  };
  // blok opisu (ha-markdown), przed który wstawiamy przyklejony pasek i podgląd
  let el = img, nad = img.parentElement;
  while (nad && nad.tagName !== 'HA-MARKDOWN-ELEMENT' && nad.tagName !== 'HA-MARKDOWN') { el = nad; nad = nad.parentElement; }
  const md = img.getRootNode()?.host?.closest?.('ha-markdown') || img.closest('ha-markdown') || el;
  const blok = md.tagName === 'HA-MARKDOWN' ? md : el;
  if (!blok.parentNode) { img.style.cursor = 'pointer'; img.addEventListener('click', klik(img)); return d; }
  blok.parentNode.querySelectorAll(`[${ZNAK}="kopia"],[${PODGLAD}]`).forEach(x => x.remove());   // z poprzedniego kroku
  // pasek wyjmujemy przed opis: kopia przyklejona, oryginał ukryty (opis „Co / Po co” przewija się normalnie)
  const kopia = document.createElement('div');
  kopia.setAttribute(ZNAK, 'kopia');
  kopia.style.cssText = 'position:sticky;top:0;z-index:5;padding:4px 0;background:var(--mdc-theme-surface,var(--ha-dialog-surface-background,var(--card-background-color,#fff)))';
  const nowy = img.cloneNode(true);
  nowy.setAttribute(ZNAK, '');
  nowy.style.cssText = 'display:block;max-width:100%;height:auto;margin:0 auto;cursor:pointer';
  nowy.addEventListener('click', klik(nowy));
  kopia.appendChild(nowy);
  blok.parentNode.insertBefore(kopia, blok);
  img.style.display = 'none';
  if (d.podglad && customElements.get('motor-ha')) {
    const box = document.createElement('div');
    box.setAttribute(PODGLAD, '');
    // podgląd przyklejony razem z paskiem: widać go także przy wyborze koloru na dole listy
    box.style.cssText = 'position:relative;z-index:0;isolation:isolate;max-width:170px;margin:4px auto 0;pointer-events:none';
    kopia.appendChild(box);
    form.__motorHaPodglad = { box, podglad: d.podglad, klucz: '' };
  } else form.__motorHaPodglad = null;
  return d;
}

function galeria(form, img) {
  const svg = svgZ(img), d = daneGalerii(svg);
  if (!d) return;
  img.setAttribute(GAL, '');
  // ramkę wybranego rysuje dalej karta (ruchoma), więc ze stałego obrazka ją zdejmujemy
  img.setAttribute('src', PREFIKS + zakoduj(svg.replace(/<rect data-on="1"[^>]*\/>/, '')));
  const opak = document.createElement('span');
  opak.style.cssText = 'position:relative;display:inline-block;max-width:100%;line-height:0';
  img.parentNode.insertBefore(opak, img);
  opak.appendChild(img);
  img.style.cssText = 'display:block;max-width:100%;height:auto;cursor:pointer';
  const ramka = document.createElement('span');
  ramka.style.cssText = `position:absolute;box-sizing:border-box;border:3px solid ${AKCENT};border-radius:10px;pointer-events:none;display:none;transition:left .15s,top .15s`;
  opak.appendChild(ramka);
  const wiersze = Math.ceil(d.opcje.length / d.kol);
  img.addEventListener('click', (e) => {
    const r = img.getBoundingClientRect();
    if (!r.width) return;
    const x = Math.floor((e.clientX - r.left) / r.width * d.kol), y = Math.floor((e.clientY - r.top) / r.height * wiersze);
    const k = d.opcje[y * d.kol + x];
    if (k) { ustaw(form, { [d.pole]: k }); odswiez(form); }
  });
  (form.__motorHaGalerie ||= []).push({ ...d, img, ramka, wiersze });
}

function odswiez(form) {
  const dane = form._stepData || {};
  for (const g of form.__motorHaGalerie || []) {
    if (!g.img.isConnected) continue;
    const i = g.opcje.indexOf(dane[g.pole]);
    if (i < 0) { g.ramka.style.display = 'none'; continue; }
    const w = 100 / g.kol, h = 100 / g.wiersze;
    Object.assign(g.ramka.style, { display: 'block', left: `calc(${(i % g.kol) * w}% + 2px)`, top: `calc(${Math.floor(i / g.kol) * h}% + 2px)`,
      width: `calc(${w}% - 4px)`, height: `calc(${h}% - 4px)` });
  }
  const p = form.__motorHaPodglad;
  if (!p || !p.box.isConnected) return;
  const ha = document.querySelector('home-assistant')?.hass;
  if (!ha) return;
  const c = wygladPodgladu(p.podglad, dane), klucz = JSON.stringify(c);
  if (klucz === p.klucz) return;
  p.klucz = klucz;
  let k = p.box.firstElementChild;
  if (!k) { k = document.createElement('motor-ha'); p.box.appendChild(k); }
  const brama = ['przesuwna', 'skrzydlowa', 'segmentowa', 'uchylna', 'roletowa'].includes(c.oslona);
  const teraz = new Date().toISOString();
  const stan = { entity_id: ENCJA, state: brama ? 'closed' : 'open', last_changed: teraz, last_updated: teraz, context: { id: '' },
    attributes: { current_position: brama ? 0 : 60, friendly_name: ' ', supported_features: 15,
      ...(brama ? { device_class: ['przesuwna', 'skrzydlowa'].includes(c.oslona) ? 'gate' : 'garage' } : {}) } };
  // sam rysunek okna (suwaki tylko przy „osobno”, żeby było widać oba po bokach)
  k.setConfig({ type: 'custom:motor-ha', entity: ENCJA, name: ' ', ...c, przyciski: false, suwak: !!c.osobno,
    _podglad: { pogoda: 'sunny', pora: 'dzien' } });
  k.hass = { ...ha, states: { ...ha.states, [ENCJA]: stan }, callService: () => Promise.resolve(), callWS: () => Promise.resolve(null) };
}

// kreator graficzny (2.2.0) nad okienkiem HA: raz na każdy kreator Motor HA; gotowe ustawienia idą jak odpowiedź kroku
const GRAFICZNE = new Set();
export function czyMotorHa(okno, form) {
  const p = okno._params || {}, k = okno._step || {};
  return k.handler === 'motor_ha' || p.domain === 'motor_ha' || p.manifest?.domain === 'motor_ha'
    || !!(form && wszystkie(form.shadowRoot, `img[${ZNAK}],img[src^="${PREFIKS}"]`).some(i => i.hasAttribute(ZNAK) || danePaska(svgZ(i))));
}

function graficzny(okno, form) {
  const krok = okno._step;
  if (!krok?.flow_id || krok.type !== 'form' || GRAFICZNE.has(krok.flow_id) || !customElements.get('motor-ha-kreator')) return;
  if (!czyMotorHa(okno, form)) return;
  const ha = document.querySelector('home-assistant');
  if (!ha?.hass) return;
  GRAFICZNE.add(krok.flow_id);
  const dlg = document.createElement('dialog');
  dlg.setAttribute('data-motor-ha-kreator', '');
  dlg.style.cssText = 'padding:0;border:0;margin:auto;width:min(100vw,430px);height:min(100dvh,880px);max-width:100vw;max-height:100dvh;border-radius:var(--ha-dialog-border-radius,28px);overflow:hidden;background:var(--card-background-color,#fff)';
  if (innerWidth < 600) Object.assign(dlg.style, { width: '100vw', height: '100dvh', borderRadius: '0' });
  else if (innerWidth >= 900) Object.assign(dlg.style, { width: 'min(96vw,1400px)', height: 'min(94dvh,1000px)' });   // komputer: rysunek z lewej, ustawienia z prawej
  const tlo = document.createElement('style');
  tlo.textContent = 'dialog[data-motor-ha-kreator]::backdrop{background:rgba(0,0,0,.45)}';
  dlg.appendChild(tlo);
  const k = document.createElement('motor-ha-kreator');
  dlg.appendChild(k);
  document.body.appendChild(dlg);
  let zegar = null;
  const sprzatnij = () => { clearInterval(zegar); if (dlg.open) dlg.close(); dlg.remove(); };
  const zamknij = () => { sprzatnij(); okno.closeDialog?.(); };
  dlg.addEventListener('cancel', e => { e.preventDefault(); zamknij(); });
  const wyslij = (dane) => {
    const f = glebiej(okno.shadowRoot, 'step-flow-form');
    sprzatnij();
    if (!f) return;
    ustaw(f, { kreator: JSON.stringify(dane) });
    if (typeof f._submitStep === 'function') f._submitStep();
  };
  const opcje = krok.handler !== 'motor_ha';   // „Konfiguruj”: kreator wpisu (handler = entry_id)
  dlg.showModal();
  k.start({ hass: ha.hass, flow_id: krok.flow_id, entry_id: opcje ? krok.handler : null, krok: Z_KLASYCZNEGO[krok.step_id], wyslij, zamknij })
    .then(() => {
      zegar = setInterval(() => {
        if (!okno._params || !okno.isConnected) return sprzatnij();   // okienko HA zamknięte – nasze też
        if (ha.hass !== k._hass) k.hass = ha.hass;
      }, 400);
    })
    .catch((e) => { console.warn('Motor HA: kreator graficzny niedostępny, zostaje klasyczny', e); sprzatnij(); });
}

export function pilnujKreatora() {
  const okno = document.querySelector('home-assistant')?.shadowRoot?.querySelector('dialog-data-entry-flow');
  if (!okno?._params) return;
  const form = glebiej(okno.shadowRoot, 'step-flow-form');
  if (!form) return;
  try { graficzny(okno, form); } catch (e) { /* zostaje klasyczny kreator */ }
  const img = glebiej(form.shadowRoot, `img[src^="${PREFIKS}"]:not([${ZNAK}]):not([${GAL}])`);
  if (img && danePaska(svgZ(img))) { form.__motorHaGalerie = []; pasek(form, img); }
  for (const g of wszystkie(form.shadowRoot, `img[src^="${PREFIKS}"]:not([${ZNAK}]):not([${GAL}])`)) galeria(form, g);
  if (!form.__motorHaSluch) {   // zmiana w liście – podgląd i ramka od razu, nie po chwili
    form.__motorHaSluch = true;
    form.addEventListener('value-changed', () => requestAnimationFrame(() => { try { odswiez(form); } catch (e) { /* */ } }));
  }
  odswiez(form);
}
