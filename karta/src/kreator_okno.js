// Kreator graficzny Motor HA (2.2.0): dziesięć kroków z obrazkami zamiast list, żywy podgląd okna,
// układ okna jako siatka pól (do 4 × 3) edytowana palcem. Otwiera się nad okienkiem „Dodaj urządzenie”
// i „Konfiguruj” (kreator.js), a gotowe ustawienia wysyła jak zwykłą odpowiedź kroku integracji (pole „kreator”).
import { KOLORY, RAMA_Z_KLUCZA, GRUPY, BRAMY, czyBrama, czyZew } from './stale.js';
import { TEKSTY, jezyk, wstaw } from './jezyk.js';
import { rysunekBramy } from './brama.js';

const MDI = {
  silnik: 'M3 4h18v3H3zm2 4h14v9h2v2H3v-2h2zm2 0v9h10V8z',
  uklad: 'M3 3h18v18H3zm2 2v6h6V5zm8 0v6h6V5zm-8 8v6h6v-6zm8 0v6h6v-6z',
  rodzaj: 'M4 3h16v2H4zm1 3h14v8H5zm6 9h2v3.3a2 2 0 1 1-2 0z',
  kolory: 'M12 3a9 9 0 0 0 0 18c.8 0 1.5-.7 1.5-1.5 0-.4-.1-.7-.4-1-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8m-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3',
  przypisz: 'M17 7h-4v2h4a3 3 0 0 1 0 6h-4v2h4a5 5 0 0 0 0-10m-6 8H7a3 3 0 0 1 0-6h4V7H7a5 5 0 0 0 0 10h4zm-3-4h8v2H8z',
  czujniki: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8m0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6m0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4m0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2',
  auto: 'M12 2a2 2 0 0 1 2 2c0 .7-.4 1.4-1 1.7V7h1a7 7 0 0 1 7 7h1v3h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2v-3h1a7 7 0 0 1 7-7h1V5.7A2 2 0 0 1 12 2M7.5 13a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m9 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5',
  stoper: 'M15 1H9v2h6zm-4 13h2V8h-2zm8-6.6 1.4-1.4c-.4-.5-.9-1-1.4-1.4L17.6 6A9 9 0 1 0 19 7.4M12 20a7 7 0 1 1 7-7 7 7 0 0 1-7 7',
  dzwonek: 'M21 19v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4a2 2 0 0 1 4 0v.3c3 .9 5 3.6 5 6.7v6zm-7 2a2 2 0 0 1-4 0',
  gotowe: 'M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z',
  okno: 'M6 2h12a2 2 0 0 1 2 2v16H4V4a2 2 0 0 1 2-2m0 2v7h5V4zm7 0v7h5V4zm-7 9v5h5v-5zm7 0v5h5v-5z',
  slonce: 'M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10M2 11h3v2H2zm17 0h3v2h-3zM11 2h2v3h-2zm0 17h2v3h-2zM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4zm12.1 12.1 1.4-1.4 2.1 2.1-1.4 1.4zm2.1-13.5 1.4 1.4-2.1 2.1-1.4-1.4zM6.3 16.3l1.4 1.4-2.1 2.1-1.4-1.4z',
  termo: 'M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0m-3-9a1 1 0 0 1 1 1v3h-2V5a1 1 0 0 1 1-1',
  pogoda: 'M6 19a5 5 0 0 1-.7-10A7 7 0 0 1 18.6 8 5.5 5.5 0 0 1 18 19z',
  wiatr: 'M4 10a1 1 0 0 1 0-2h10a2 2 0 1 0-2-2 1 1 0 0 1-2 0 4 4 0 1 1 4 4zm15 2a3 3 0 1 1-3 3 1 1 0 0 1 2 0 1 1 0 1 0 1-1H4a1 1 0 0 1 0-2zm-7 4a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z',
  deszcz: 'M6 14a4 4 0 0 1-.6-8A6 6 0 0 1 17 6.6 4 4 0 0 1 18 14zm1 2 1.5 1-2 3-1.5-1zm5 0 1.5 1-2 3-1.5-1zm5 0 1.5 1-2 3-1.5-1z',
  osoba: 'M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 10c4.4 0 8 1.8 8 4v2H4v-2c0-2.2 3.6-4 8-4',
  wschod: 'M3 13h18v2H3zm9-8 3 3h-2v3h-2V8H9zM6.3 9.3l1.4 1.4-1.4 1.4-1.4-1.4zm11.4 0 1.4 1.4-1.4 1.4-1.4-1.4z',
  zachod: 'M3 13h18v2H3zm9 0-3-3h2V5h2v5h2zM6.3 9.3l1.4 1.4-1.4 1.4-1.4-1.4zm11.4 0 1.4 1.4-1.4 1.4-1.4-1.4z',
  tarcza: 'M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5zm-1 6h2v6h-2zm0 8h2v2h-2z',
  telefon: 'M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2m0 18H7V5h10z',
  bateria: 'M16 4h-1V2H9v2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 16H8V6h8zm-7-6h6v5H9z',
  ostrz: 'M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z',
  robot: 'M12 2a2 2 0 0 1 2 2c0 .7-.4 1.4-1 1.7V7h1a7 7 0 0 1 7 7h1v3h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2v-3h1a7 7 0 0 1 7-7h1V5.7A2 2 0 0 1 12 2',
  foto: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m0-5C7 4 2.7 7.1 1 12c1.7 4.9 6 8 11 8s9.3-3.1 11-8c-1.7-4.9-6-8-11-8',
  x: 'M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
};
const ik = (n, r = 18) => `<svg viewBox="0 0 24 24" width="${r}" height="${r}" aria-hidden="true"><path d="${MDI[n]}"/></svg>`;
const esc = s => String(s ?? '').replace(/[&<>"]/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]);
const okr = v => Math.round(v * 1000) / 1000;
// suwaki ustawień automatyki (klucze jak w PARAMETRY integracji); pozycja: 100 = osłona zwinięta / otwarta
const PROC = v => v + ' %';
const PAR = {
  wiatr_prog: { mn: 20, mx: 90, krok: 5, dom: 40, fmt: v => v + ' km/h' },
  wiatr_poz: { mn: 0, mx: 100, krok: 10, dom: 100, fmt: PROC },
  deszcz_poz: { mn: 0, mx: 100, krok: 10, dom: 100, fmt: PROC },
  wietrzenie_poz: { mn: 10, mx: 100, krok: 10, dom: 50, fmt: PROC },
  slonce_temp: { mn: 15, mx: 35, krok: 1, dom: 24, fmt: v => v + ' °C' },
  przes_otw: { mn: -120, mx: 120, krok: 5, dom: 0, fmt: v => (v > 0 ? '+' : '') + v + ' min' },
  przes_zam: { mn: -120, mx: 120, krok: 5, dom: 0, fmt: v => (v > 0 ? '+' : '') + v + ' min' }
};
// długie słowo w wąskim kafelku: miękki dzielnik po samogłosce blisko środka („wolnowi-sząca”), bez łamania w dowolnym miejscu
const SAMO = /[aeiouyąęóаеиоуыэюяіїєáéíóúýěůäöüàèìòù]/i;
export const dziel = s => String(s ?? '').replace(/\S{11,}/g, w => {
  const sr = Math.floor(w.length / 2);
  for (let d = 0; d < sr - 2; d++) for (const i of [sr + d, sr - d]) if (SAMO.test(w[i - 1]) && !SAMO.test(w[i])) return w.slice(0, i) + '\u00ad' + w.slice(i);
  return w.slice(0, sr) + '\u00ad' + w.slice(sr);
});

const KROKI_OKNA = ['silnik', 'uklad', 'rodzaj', 'kolory', 'przypisz', 'czujniki', 'auto', 'stoper', 'dzwonek', 'gotowe'];
const KROKI_BRAMY = ['silnik', 'rodzaj', 'kolory', 'czujniki', 'stoper', 'dzwonek', 'gotowe'];
// krok klasycznego kreatora (skrót z karty i strony urządzenia) → krok kreatora graficznego
// telefon: mały rysunek okna na górze w każdym kroku (stały, zmienia się od razu); „Pola” mają własny duży, „Gotowe” – kartę
const BEZ_PODGLADU = ['przypisz', 'gotowe'];
// szablony układów: pola (x, y, szer., wys.) w ułamkach okna; trzeci element – drzwi do podłogi
export const UKLADY = [
  ['u1', [[0, 0, 1, 1]]],
  ['u2', [[0, 0, .5, 1], [.5, 0, .5, 1]]],
  ['u3', [[0, 0, 1 / 3, 1], [1 / 3, 0, 1 / 3, 1], [2 / 3, 0, 1 / 3, 1]]],
  ['u4', [[0, 0, .5, .28], [.5, 0, .5, .28], [0, .28, .5, .72], [.5, .28, .5, .72]]],
  ['u5', [[0, 0, .55, .22], [.55, 0, .45, .22], [0, .22, .55, .5], [.55, .22, .45, .78]]],
  ['u6', [[0, 0, .5, 1], [.5, 0, .5, 1]], true],
  ['u7', [[0, 0, .25, 1], [.25, 0, .5, 1], [.75, 0, .25, 1]]],
  ['u8', [[0, 0, .5, .5], [.5, 0, .5, .5], [0, .5, .5, .5], [.5, .5, .5, .5]]],
];
const KOLORY_TAB = Object.keys(KOLORY);
const RAMY_TAB = Object.keys(RAMA_Z_KLUCZA);
const STRONY = [['n', 0], ['e', 90], ['s', 180], ['w', 270]];
const AUTO_ZEW = ['markiza', 'fasadowa', 'fasadowaz', 'screen'];   // zwijane przy deszczu

// --- model układu: kolumny od lewej, w kolumnie pola od góry (r), puste miejsce pod oknem (dol) ---
// mur: odstęp ściany za kolumną (osobne okna obok siebie na jednej karcie)
const sumaKol = K => K.reduce((a, k, i) => a + k.w + (i < K.length - 1 ? +k.mur || 0 : 0), 0) || 1;
// belki: poziome odstępy pod polami kolumny (bel[j] pod polem j), w jednostkach wysokości pól
const sumaWierszy = k => k.r.reduce((a, h, j) => a + h + (j < k.r.length - 1 ? +k.bel?.[j] || 0 : 0), 0) || 1;
// słupki/mury i belki jako prostokąty (ułamki okna): [x, y, w, h, 'mur' | 'bel']
export function przerwy(u) {
  const K = u.kol, suma = sumaKol(K), out = [];
  let x = 0;
  K.forEach((k, c) => {
    const w = k.w / suma, wys = 1 - k.dol, sr = sumaWierszy(k);
    let y = 0;
    k.r.forEach((h, j) => { y += h / sr * wys; const b = j < k.r.length - 1 ? (+k.bel?.[j] || 0) / sr * wys : 0; if (b > 0) out.push([x, y, w, b, 'bel', c, j]); y += b; });
    x += w;
    const m = c < K.length - 1 ? (+k.mur || 0) / suma : 0;
    if (m > 0) out.push([x, 0, m, 1, 'mur', c]);
    x += m;
  });
  return out;
}
export function prostokaty(u) {
  const K = u.kol, suma = sumaKol(K), out = [];
  let x = 0;
  K.forEach(k => {
    const w = k.w / suma, wys = 1 - k.dol, sr = sumaWierszy(k);
    let y = 0;
    k.r.forEach((h, j) => { const hh = h / sr * wys; out.push([okr(x), okr(y), okr(w), okr(hh)]); y += hh + (+k.bel?.[j] || 0) / sr * wys; });
    x += w + (+k.mur || 0) / suma;   // mur za ostatnią kolumną nie liczy się (sumaKol)
  });
  return out;
}
// szablon (lista prostokątów) → model do dalszego dopasowania palcem
export function zSzablonu(P) {
  const xs = [...new Set(P.map(p => okr(p[0])))].sort((a, b) => a - b);
  const kol = xs.map(x => {
    const w = P.filter(p => okr(p[0]) === x).sort((a, b) => a[1] - b[1]);
    const dol = 1 - Math.max(...w.map(p => p[1] + p[3]));
    return { w: w[0][2], r: w.map(p => p[3]), dol: Math.max(0, Math.round(dol * 100) / 100) };
  });
  return { kol: kol.length ? kol : [{ w: 1, r: [1], dol: 0 }] };
}
const kopia = u => ({ kol: u.kol.map(k => ({ w: +k.w, r: k.r.map(Number), dol: +k.dol || 0, mur: +k.mur || 0, bel: (k.bel || []).map(Number) })) });
const takiSam = (a, b) => JSON.stringify(prostokaty(a)) === JSON.stringify(prostokaty(b));
export const szablon = u => { const i = UKLADY.findIndex(([, P]) => takiSam(zSzablonu(P), u)); return i < 0 ? 'w' : i; };
const godz = m => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const minuty = t => { const [h, m] = String(t || '').split(':').map(Number); return (h || 0) * 60 + (m || 0); };

// wynik kreatora → dane dla integracji (graficzny.py)
export function wynik(S) {
  const o = { ...S.o };
  if (!S.brama) { o.uklad = kopia(S.u); o.pola = S.pola.slice(0, prostokaty(S.u).length).map(p => ({ ...p })); }
  else { o.rolety = [...S.rolety]; delete o.uklad; delete o.pola; }
  return { tytul: S.tytul, opcje: o };
}

const STYL = `
:host{--bg:var(--primary-background-color,#f0f2f4);--surface:var(--ha-dialog-surface-background,var(--mdc-theme-surface,var(--card-background-color,#fff)));
 --fg:var(--primary-text-color,#212121);--fg2:var(--secondary-text-color,#6f7377);--line:var(--divider-color,rgba(0,0,0,.12));
 --primary:var(--primary-color,#009ac7);--accent:var(--accent-color,#ff9800);--on:var(--text-primary-color,#fff);
 --tile:color-mix(in srgb,var(--fg) 6%,var(--surface));--primary-soft:color-mix(in srgb,var(--primary) 16%,transparent);--ok:var(--success-color,#2e9e5b);
 display:flex;flex-direction:column;height:100%;background:var(--surface);color:var(--fg);font-family:var(--ha-font-family-body,Roboto,"Noto Sans",system-ui,sans-serif);font-size:14px;position:relative;overflow:hidden}
*{box-sizing:border-box}
button{font:inherit;-webkit-tap-highlight-color:transparent}
[hidden]{display:none!important}
.gora{flex:none;z-index:5;background:var(--surface);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-top:calc(10px + env(safe-area-inset-top,0px));padding-bottom:6px;border-bottom:1px solid var(--line)}
.tytul{display:flex;align-items:center;gap:14px;font-size:20px;font-weight:500;min-height:40px}
.tytul .x{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:var(--fg);background:none;border:0;cursor:pointer;flex:none}
.tytul .x svg{fill:currentColor}
.tytul small{display:block;font-size:12px;color:var(--fg2);font-weight:400}
.kroki{display:flex;align-items:center;justify-content:space-between;margin-top:8px;gap:2px}
.krok{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;background:none;border:0;cursor:pointer;padding:2px 0 14px;color:var(--fg2);position:relative}
.krok .k{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;border:2px solid var(--line);background:var(--surface)}
.krok svg{width:18px;height:18px;fill:currentColor}
.krok.zrob{color:var(--primary)} .krok.zrob .k{border-color:var(--primary)}
.krok.teraz{color:var(--primary)} .krok.teraz .k{border-color:var(--accent);background:var(--primary);color:var(--on)}
.krok .n{position:absolute;bottom:0;left:50%;transform:translateX(-50%);font-size:10px;line-height:1;white-space:nowrap;visibility:hidden}
.krok.teraz .n{visibility:visible;font-weight:700}
.krok:first-child.teraz .n{left:0;transform:none}.krok:last-child.teraz .n{left:auto;right:0;transform:none}
.krok:focus-visible .k{box-shadow:0 0 0 3px var(--accent)}
.podglad{display:flex;justify-content:center;padding-top:8px}
.podglad svg{width:150px;height:auto;max-width:100%;max-height:min(150px,18vh);display:block}
.cialo{flex:1;display:flex;min-height:0}
.scena{display:none}
:host([szeroko]) .scena{display:flex;order:2;flex:0 0 50%;min-width:0;align-items:center;justify-content:center;padding:16px;border-left:1px solid var(--line);background:var(--bg);overflow:auto}
:host([szeroko]) .krok .k{width:46px;height:46px;border-width:3px} :host([szeroko]) .krok svg{width:26px;height:26px} :host([szeroko]) .krok .n{font-size:12px} :host([szeroko]) .krok{padding-bottom:18px}
:host([szeroko]) .scena[hidden]{display:none}
.scena > div, .scena > svg{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.scena > div > svg, .scena #duzeOkno svg{width:100%;height:100%;max-height:100%}
:host([szeroko]) .wybpol{position:static}
.scena > .edscena{display:block;height:auto;max-width:560px}
.edscena #edytor{display:flex;justify-content:center} .edscena #edSvg{width:100%;height:auto;max-height:calc(100dvh - 420px)}
:host([szeroko]) .krok .n{visibility:visible;color:var(--fg)} :host([szeroko]) .krok.teraz .n{color:var(--primary)}
:host([szeroko]) .krok:not(.zrob):not(.teraz) .k{border-color:color-mix(in srgb,var(--primary) 45%,var(--line));color:var(--fg)}
:host([szeroko]) .krok:hover .k{border-color:var(--accent)}
.tresc{flex:1;min-width:0;overflow:auto;overscroll-behavior:contain;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-top:14px;padding-bottom:24px}
h2{margin:0 0 4px;font-size:18px;font-weight:500;text-wrap:balance}
.pod{margin:0 0 14px;color:var(--fg2);font-size:13px}
.siatka{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.chwyt{flex:none;width:28px;height:40px;display:grid;place-items:center;color:var(--fg2);font-size:20px;cursor:grab;touch-action:none;margin:-8px 0 -8px -6px}
.wiersz.cel{outline:3px solid var(--accent);outline-offset:-3px} g.cel rect:first-child{fill:rgba(255,152,0,.35);stroke:#ff9800;stroke-width:3}
#duzeOkno svg{touch-action:none}
.wybpol{margin:-4px 0 14px;padding:8px 0 12px;border-bottom:1px solid var(--line);position:sticky;top:-14px;z-index:3;background:var(--surface)}
.wybpol #duzeOkno svg{max-height:30vh;width:auto;max-width:100%}
.linia{grid-column:1/-1;display:flex;align-items:center;gap:8px;color:var(--fg2);font-size:12px;margin:4px 0}
.linia::before,.linia::after{content:"";flex:1;border-top:1px solid var(--line)}
.kaf.caly{grid-column:1/-1;border:1.5px dashed var(--accent)} .kaf.caly .miejsce{white-space:normal;text-align:center;max-width:100%} .kaf.caly.wyb{border-style:solid}
.siatka.k4{grid-template-columns:repeat(4,minmax(0,1fr))} .siatka.k2{grid-template-columns:repeat(2,minmax(0,1fr))}
.kaf{position:relative;background:var(--tile);border:2px solid transparent;border-radius:14px;padding:8px 6px 7px;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;color:var(--fg);text-align:center;min-width:0;transition:transform .12s}
.kaf:active{transform:scale(.97)}
.kaf svg{width:100%;height:auto;max-height:84px}
.kaf b{font-size:11px;font-weight:400;line-height:1.2;color:var(--fg2);overflow-wrap:break-word;hyphens:manual;max-width:100%}
.kaf.wyb{border-color:var(--accent);background:var(--primary-soft)} .kaf.wyb b{color:var(--fg);font-weight:500}
.kaf:focus-visible{outline:3px solid var(--primary);outline-offset:1px}
.kaf.zajeta{opacity:.5}
.zn{position:absolute;top:5px;right:5px;width:18px;height:18px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-size:11px;font-weight:700}
.miejsce{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;color:var(--primary);background:var(--primary-soft);border-radius:10px;padding:2px 7px;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sek{margin:18px 0 8px;font-size:13px;font-weight:500;color:var(--fg2);letter-spacing:.02em}
.probki{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 8px;scrollbar-width:thin}
.probka{flex:0 0 auto;width:56px;display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:0;cursor:pointer;color:var(--fg2);font-size:10.5px;text-align:center;line-height:1.15}
.probka i{width:40px;height:40px;border-radius:50%;border:1px solid var(--line);display:block}
.probka.wyb i{outline:3px solid var(--accent);outline-offset:2px} .probka.wyb{color:var(--fg);font-weight:500}
.wiersz{display:flex;align-items:center;gap:12px;background:var(--tile);border-radius:14px;padding:10px 12px;margin-bottom:8px;cursor:pointer;border:2px solid transparent;width:100%;color:var(--fg);text-align:left}
.wiersz .ik{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:var(--primary-soft);color:var(--primary);flex:0 0 auto;font-weight:700}
.wiersz .ik svg{width:22px;height:22px;fill:currentColor}
.wiersz .t{flex:1;min-width:0} .wiersz .t b{display:block;font-weight:500;font-size:14px} .wiersz .t small{display:block;color:var(--fg2);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wiersz.wyl .ik{background:var(--tile);color:var(--fg2);border:1px solid var(--line)} .wiersz.wyl .t b{color:var(--fg2)}
.wiersz.brak{cursor:default}
.przel{width:40px;height:22px;border-radius:11px;background:var(--line);position:relative;flex:0 0 auto;transition:background .15s}
.przel::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .15s;box-shadow:0 1px 2px rgba(0,0,0,.3)}
.wiersz:not(.wyl) .przel{background:var(--primary)} .wiersz:not(.wyl) .przel::after{left:21px}
.suw{display:flex;align-items:center;gap:10px;padding:0 12px 10px 64px;margin-top:-6px;margin-bottom:8px;color:var(--fg2);font-size:12px}
.suw input{flex:1;min-width:0;accent-color:var(--primary)}
.suw span{min-width:44px;text-align:end}
.okw{margin:4px 0 10px 52px;padding:8px 10px;border-radius:10px;background:var(--tile);font-size:13px}
.okw .et{display:flex;align-items:center;gap:6px;font-weight:500;margin-bottom:4px}.okw .et svg{fill:var(--accent);width:16px!important;height:16px;flex:none}
.okw .ow{display:flex;gap:8px;align-items:baseline;margin:3px 0}.okw .nr{flex:none;width:18px;height:18px;border-radius:50%;background:var(--accent);color:#3a2600;font-size:11px;font-weight:700;display:grid;place-items:center}
.okw .pod{margin-top:6px}
.suw.chipy{gap:6px;flex-wrap:wrap}
.suw .et{min-width:64px;text-align:start;color:var(--fg2)}
.chipy{display:flex;flex-wrap:wrap;gap:8px}
.chip{border:1px solid var(--line);background:var(--surface);color:var(--fg);border-radius:8px;min-height:32px;padding:0 12px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;max-width:100%}
.chip svg{fill:currentColor}
.chip.wyb{background:var(--primary-soft);border-color:var(--primary);color:var(--fg)}
.chip .p{font-size:10px;color:var(--ok);font-weight:700;text-transform:uppercase}
.chip:disabled{opacity:.45;cursor:default}
.dol{flex:none;display:flex;justify-content:space-between;align-items:center;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-top:12px;padding-bottom:calc(12px + env(safe-area-inset-bottom,0px));background:var(--surface);border-top:1px solid var(--line)}
.btn{height:44px;padding:0 22px;border-radius:22px;border:0;background:var(--primary);color:var(--on);font-size:15px;font-weight:500;cursor:pointer}
.btn.plaski{background:none;color:var(--primary)}
.btn:disabled{opacity:.5;cursor:default}
.btn:focus-visible,.chip:focus-visible,.wiersz:focus-visible,.probka:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.duzy{display:flex;flex-direction:column;align-items:center;gap:14px;padding:6px 0}
.duzy svg{width:180px;height:auto;max-width:100%}
.zegar{font-size:40px;font-weight:300;font-variant-numeric:tabular-nums}
.blad{color:var(--error-color,#db4437);font-size:13px;text-align:center}
.arkusz{position:absolute;inset:auto 0 0 0;max-height:80%;overflow:auto;background:var(--surface);border-radius:20px 20px 0 0;box-shadow:0 -8px 30px rgba(0,0,0,.25);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-top:10px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:8}
.arkusz .uchwyt{width:36px;height:4px;border-radius:2px;background:var(--line);margin:0 auto 12px}
.tlo{position:absolute;inset:0;background:rgba(0,0,0,.35);z-index:7}
.karta{display:block}
.nazwa{width:100%;height:44px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--fg);font:inherit;font-size:15px;padding:0 12px;margin-bottom:12px}
.nazwa:focus{outline:2px solid var(--primary);border-color:transparent}
#edytor{display:flex;justify-content:center;touch-action:none}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important}}`;

export class MotorHaKreator extends HTMLElement {
  // start({ hass, flow_id, entry_id, krok, wyslij(dane), zamknij() })
  async start(p) {
    this._p = p;
    this._hass = p.hass;
    this.T = TEKSTY[jezyk({}, p.hass)];
    this.t = this.T.kreator;
    const d = await p.hass.callWS({ type: 'motor_ha/kreator/dane', ...(p.entry_id ? { entry_id: p.entry_id } : {}) });
    this.dane = d;
    const o = { ...d.opcje };
    const S = this.S = { o, tytul: d.tytul || '', rolety: [...(o.rolety || [])], u: kopia(o.uklad), pola: (o.pola || []).map(x => ({ ...x })),
      krok: 0, arkusz: null, wyb: 0, recznie: { uklad: !d.nowy, rodzaj: !d.nowy, tytul: !d.nowy }, panel: !!d.nowy && d.panel !== 'nie',
      wykryty: null, pomiar: null };
    delete o.uklad; delete o.pola;
    S.brama = czyBrama(o.oslona) || this._oslona(S.rolety[0])?.brama;
    S.szablon = szablon(S.u);
    if (d.nowy) this._podpowiedzi();
    const kroki = this.kroki();
    const k = kroki.indexOf(p.krok);
    S.krok = k < 0 ? 0 : k;
    this._zbuduj();
    this.rysuj();
  }
  set hass(h) {
    this._hass = h;
    if (this.S?.pomiar?.trwa || this.kroki()[this.S?.krok] === 'stoper') this._odswiezPomiar();
    if (this._kartaEl) this._kartaEl.hass = this._hassKarty();
  }

  kroki() { return this.S?.brama ? KROKI_BRAMY.filter(k => k !== 'czujniki' || this._czujnik('foto').lista.length) : KROKI_OKNA; }
  _oslona(id) { return this.dane?.oslony.find(x => x.id === id); }
  _czujnik(r) { return this.dane?.czujniki?.[r] || { lista: [], podpowiedz: null }; }
  _dark() { return !!this._hass?.themes?.darkMode; }
  _nieba() { return this._dark() ? ['#4f88ad', '#9cc6de'] : ['#9fd3f2', '#e3f3fc']; }
  _kolor() { const k = this.S.o.kolor_wlasny; return Array.isArray(k) ? '#' + k.map(x => (+x).toString(16).padStart(2, '0')).join('') : KOLORY[this.S.o.kolor] || this.S.o.kolor || '#888'; }
  _rama() { const k = this.S.o.rama_wlasna; return Array.isArray(k) ? '#' + k.map(x => (+x).toString(16).padStart(2, '0')).join('') : RAMA_Z_KLUCZA[this.S.o.rama] || this.S.o.rama || '#f4f4f2'; }

  // --- podpowiedzi po wyborze osłon: układ, rodzaj, pola z silnikami i czujnikami okien, czujniki domu ---
  _podpowiedzi() {
    const S = this.S, d = this.dane, n = S.rolety.length;
    const pierwsza = this._oslona(S.rolety[0]);
    S.brama = !!pierwsza?.brama;
    if (!S.recznie.rodzaj && pierwsza) {
      const k = pierwsza.klasa;
      S.o.oslona = S.brama ? (k === 'garage' ? 'segmentowa' : 'przesuwna') : k === 'awning' ? 'markiza' : k === 'shutter' ? 'natynkowa'
        : pierwsza.lamele ? 'zaluzja' : czyBrama(S.o.oslona) ? 'zebra' : S.o.oslona || 'zebra';
    }
    if (!S.recznie.uklad && !S.brama) {
      if (n <= 4) S.u = zSzablonu(UKLADY[n === 4 ? 7 : n === 3 ? 2 : n === 2 ? 1 : 0][1]);
      else {   // więcej rolet: do 4 kolumn, w każdej po kilka pól – razem dokładnie tyle pól, ile rolet
        const c = Math.min(4, Math.ceil(n / (n > 8 ? 3 : 2))), m = Math.min(n, 12);
        S.u = { kol: Array.from({ length: c }, (_, i) => ({ w: 1, r: Array(Math.floor(m / c) + (i < m % c ? 1 : 0)).fill(1), dol: 0, mur: 0, bel: [] })) };
      }
      S.szablon = szablon(S.u);
    }
    if (!S.recznie.tytul) {
      const pokoje = new Set(S.rolety.map(e => this._oslona(e)?.pokoj));
      S.tytul = pokoje.size === 1 && [...pokoje][0] && n > 1 ? [...pokoje][0] : pierwsza?.nazwa || '';
    }
    this._dopasujPola(true);
    if (d.nowy) for (const [r, klucz] of [['pogoda', 'pogoda'], ['temp', 'czujnik_temp'], ['obecnosc', 'czujnik_obecnosc'], ['wiatr', 'czujnik_wiatr'],
      ['deszcz', 'czujnik_deszcz'], ['foto', 'czujnik_foto']]) {
      const c = this._czujnik(r);
      if (!S.o[klucz] && c.podpowiedz) S.o[klucz] = c.podpowiedz;
    }
  }
  // liczba pól = układ; nowe pola dostają kolejne silniki i czujniki okien z pokoju
  _dopasujPola(podpowiedz) {
    const S = this.S, ile = prostokaty(S.u).length, R = S.rolety;
    const okna = this._czujnik('okno').lista.filter(x => x.tu).map(x => x.id);
    const kolejne = [...new Set([...(this.dane.okna || []), ...okna])];
    S.pola = Array.from({ length: ile }, (_, i) => {
      const p = { ...(S.pola[i] || {}) };
      if ((podpowiedz || !p.silnik) && R.length) p.silnik = R[Math.min(i, R.length - 1)];
      if (podpowiedz && !p.czujnik && kolejne[i] && !S.pola.some((q, j) => j !== i && q?.czujnik === kolejne[i])) p.czujnik = kolejne[i];
      p.tryb ||= 'uchyl';
      return p;
    });
  }

  // --- rysunki ---
  oslona(typ, x, y, w, h, poz, kolor) {
    const z = h * (1 - poz / 100), k = kolor, d = [];
    const t = { plaster: 'plisa', natynkowa: 'zewnetrzna', podtynkowa: 'zewnetrzna', perforowana: 'zewnetrzna', fasadowaz: 'fasadowa' }[typ] || typ;
    if (t === 'zaslona') {
      const s = w * (.18 + .32 * (1 - poz / 100));
      return `<path d="M${x} ${y}h${s}q${-s * .25} ${h / 2} 0 ${h}h${-s}z" fill="${k}"/><path d="M${x + w} ${y}h${-s}q${s * .25} ${h / 2} 0 ${h}h${s}z" fill="${k}"/>`;
    }
    if (t === 'pionowa') {
      const n = 7, s = w / n;
      for (let i = 0; i < n; i++) d.push(`<rect x="${x + i * s + s * .1}" y="${y}" width="${s * (.15 + .7 * (1 - poz / 100))}" height="${h}" fill="${k}" opacity=".9"/>`);
      return d.join('');
    }
    if (z < 1) return `<rect x="${x}" y="${y}" width="${w}" height="2.5" fill="${k}"/>`;
    if (t === 'zebra') {
      for (let yy = 0; yy < z; yy += 6) d.push(`<rect x="${x}" y="${y + yy}" width="${w}" height="${Math.min(3.4, z - yy)}" fill="${k}"/><rect x="${x}" y="${y + yy + 3.4}" width="${w}" height="${Math.max(0, Math.min(2.6, z - yy - 3.4))}" fill="${k}" opacity=".35"/>`);
    } else if (t === 'plisa') {
      d.push(`<rect x="${x}" y="${y}" width="${w}" height="${z}" fill="${k}"/>`);
      for (let yy = 3; yy < z; yy += 4) d.push(`<line x1="${x}" x2="${x + w}" y1="${y + yy}" y2="${y + yy}" stroke="#000" stroke-opacity=".18" stroke-width=".8"/>`);
    } else if (t === 'zaluzja' || t === 'drewniana' || t === 'fasadowa') {
      for (let yy = 0; yy < z; yy += 4) d.push(`<rect x="${x}" y="${y + yy}" width="${w}" height="2.6" fill="${k}" rx=".6"/>`);
    } else if (t === 'zewnetrzna') {
      d.push(`<rect x="${x}" y="${y}" width="${w}" height="${z}" fill="${k}"/>`);
      for (let yy = 3; yy < z; yy += 3.5) d.push(`<line x1="${x}" x2="${x + w}" y1="${y + yy}" y2="${y + yy}" stroke="#000" stroke-opacity=".25" stroke-width=".7"/>`);
    } else if (t === 'rzymska') {
      d.push(`<rect x="${x}" y="${y}" width="${w}" height="${z}" fill="${k}"/>`);
      for (let yy = z - 4; yy > 6; yy -= 9) d.push(`<path d="M${x} ${y + yy - 3}q${w / 2} 6 ${w} 0" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="1.2"/>`);
    } else if (t === 'markiza') {
      d.push(`<rect x="${x}" y="${y}" width="${w}" height="${z}" fill="${k}" opacity=".92"/>`);
      for (let xx = 0; xx < w; xx += 8) d.push(`<rect x="${x + xx}" y="${y}" width="4" height="${z}" fill="#fff" opacity=".35"/>`);
    } else d.push(`<rect x="${x}" y="${y}" width="${w}" height="${z}" fill="${k}" opacity="${t === 'zaciemniajaca' ? 1 : t === 'screen' ? .8 : .96}"/>`);
    d.push(`<rect x="${x}" y="${y + z - 2}" width="${w}" height="2.4" fill="#000" opacity=".45"/>`);
    return d.join('');
  }

  // całe okno: rama (dla każdej kolumny), szyby z widokiem, osłony, numery pól
  okno(opt = {}) {
    const S = this.S, W = opt.w || 160, H = opt.h || 150, pad = 6, pl = prostokaty(S.u), rama = this._rama(), kol = this._kolor(), [n1, n2] = this._nieba();
    const iw = W - 2 * pad, ih = H - 2 * pad, id = opt.id || 'p';
    const d = [`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:100%;height:auto" role="img" aria-label="${esc(this.t.kroki.uklad)}">`];
    d.push(`<defs><linearGradient id="n${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${n1}"/><stop offset="1" stop-color="${n2}"/></linearGradient></defs>`);
    for (const [x, y, w, h, typ] of przerwy(S.u)) if (typ === 'mur') d.push(this._przerwa(pad + x * iw - 1, 1, w * iw + 2, H - 2, 'mur'));
    const xs = [...new Set(pl.map(p => p[0]))];
    for (const x of xs) {
      const k = pl.filter(p => p[0] === x), dol = Math.max(...k.map(p => p[1] + p[3]));
      d.push(`<rect x="${x * iw + 1}" y="1" width="${k[0][2] * iw + 2 * pad - 2}" height="${dol * ih + 2 * pad - 2}" rx="4" fill="${rama}" stroke="#000" stroke-opacity=".25"/>`);
    }
    pl.forEach((p, i) => {
      const x = pad + p[0] * iw + 2, y = pad + p[1] * ih + 2, w = p[2] * iw - 4, h = p[3] * ih - 4;
      d.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#n${id})"/>`);
      d.push(`<path d="M${x} ${y + h * .78}l${w * .25} ${-h * .14} ${w * .2} ${h * .08} ${w * .3} ${-h * .16} ${w * .25} ${h * .1}V${y + h}H${x}z" fill="#000" opacity=".12"/>`);
      const poz = opt.poz ? opt.poz(i) : 60;
      const pp = S.pola[i] || {};   // pole może mieć własny rodzaj i kolor osłony
      d.push(this.oslona(pp.oslona || S.o.oslona, x, y, w, h, poz, pp.kolor ? KOLORY[pp.kolor] || pp.kolor : kol));
      if (opt.numery) {
        const on = opt.wybrane === i;
        d.push(`<g data-pole="${i}" style="cursor:pointer"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${on ? 'rgba(255,152,0,.25)' : 'transparent'}" stroke="${on ? '#ff9800' : 'none'}" stroke-width="3"/>
          <circle cx="${x + w / 2}" cy="${y + h / 2}" r="11" fill="#009ac7" stroke="#fff" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 + 4.5}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${i + 1}</text>${this._znakCzujnika(i, x + w / 2, y + h / 2 + 22)}</g>`);
      }
    });
    d.push('</svg>');
    return d.join('');
  }
  // znaczek pod numerem pola: pomarańczowy z oknem = czujnik przypisany (ukośna kreska = uchylone), przerywany „+” = brak czujnika
  _znakCzujnika(i, cx, cy) {
    const p = this.S.pola[i] || {};
    if (!p.czujnik) return `<circle cx="${cx}" cy="${cy}" r="8" fill="rgba(255,255,255,.75)" stroke="#ff9800" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M${cx - 4} ${cy}h8M${cx} ${cy - 4}v8" stroke="#ff9800" stroke-width="2"/>`;
    return `<circle cx="${cx}" cy="${cy}" r="9" fill="#ff9800" stroke="#fff" stroke-width="1.6"/><rect x="${cx - 4.5}" y="${cy - 5}" width="9" height="10" fill="none" stroke="#3a2600" stroke-width="1.5"/>`
      + (p.tryb === 'otworz' ? `<path d="M${cx - 4.5} ${cy - 5}l4 1.6v10l-4-1.6z" fill="#3a2600"/>` : `<path d="M${cx - 4.5} ${cy + 5}l2.4-7h4.2" fill="none" stroke="#3a2600" stroke-width="1.4"/>`);
  }
  _brama(typ) { return rysunekBramy(typ, this._kolor(), this._rama(), false, false); }
  // stały rysunek: duży z boku (szeroki ekran) albo mały na górze (telefon); woła się też przy suwakach, bez rysowania całego kroku
  _odswiezScene(k = this.kroki()[this.S.krok], jedenDuzy = ['rodzaj', 'kolory'].includes(k) && !this.S.brama && prostokaty(this.S.u).length > 1) {
    const r = this.shadowRoot, S = this.S;
    if (k === 'uklad' && this._szeroko && r.getElementById('edSvg') && this._bezSceny) return;
    const sc = this._szeroko ? this._scena(k) : '';
    r.getElementById('scena').innerHTML = sc; r.getElementById('scena').hidden = !sc;
    r.getElementById('podglad').innerHTML = !this._szeroko && !BEZ_PODGLADU.includes(k) && !(k === 'uklad' && S.szablon === 'w') && !jedenDuzy ? this._podgladMaly() : '';
  }
  // duży rysunek w kolumnie z boku (szeroki ekran); w Rodzaj, Kolory i Pola można na nim dotykać pól
  _scena(k) {
    const S = this.S;
    if (k === 'gotowe') return '<div class="karta" id="karta" style="display:block;width:100%;max-width:420px;zoom:1.3"></div>';
    if (S.brama) return `<div>${this._brama(S.o.oslona)}</div>`;
    const n = prostokaty(S.u).length;
    if (k === 'uklad') return `<div class="edscena">${this._edytorCaly()}</div>`;
    if (k === 'przypisz') return `<div id="duzeOkno">${this.okno({ w: 440, h: 400, numery: true, id: 'd', wybrane: S.arkusz })}</div>`;
    if (['rodzaj', 'kolory'].includes(k) && n > 1) return `<div id="duzeOkno">${this.okno({ w: 440, h: 400, numery: true, id: 'r', wybrane: this._wybR() })}</div>`;
    return `<div>${this.okno({ w: 440, h: 400, id: 's' })}</div>`;
  }
  _podgladMaly() { return this.S.brama ? `<div style="width:170px;max-width:100%">${this._brama(this.S.o.oslona)}</div>` : this.okno({ id: 'p' }); }

  kafelRodzaju(typ) {
    if (czyBrama(typ)) return `<div style="width:100%;pointer-events:none">${this._brama(typ)}</div>`;
    const [n1] = this._nieba();
    return `<svg viewBox="0 0 64 60" aria-hidden="true"><rect x="8" y="4" width="48" height="52" rx="2" fill="${this._rama()}" stroke="#000" stroke-opacity=".25"/>
      <rect x="11" y="7" width="42" height="46" fill="${n1}"/>${this.oslona(typ, 11, 7, 42, 46, 40, this._kolor())}</svg>`;
  }
  kafelUkladu(P, drzwi) {
    const [n1] = this._nieba(), d = ['<svg viewBox="0 0 64 60" aria-hidden="true">'];
    P.forEach(([x, y, w, h]) => d.push(`<rect x="${6 + x * 52}" y="${4 + y * 50}" width="${w * 52}" height="${h * 50}" fill="${n1}" stroke="var(--fg2)" stroke-width="1.4"/>
      <rect x="${7 + x * 52}" y="${5 + y * 50}" width="${Math.max(0, w * 52 - 2)}" height="${h * 50 * .45}" fill="var(--fg2)" opacity=".55"/>`));
    if (drzwi) d.push('<line x1="2" x2="62" y1="55" y2="55" stroke="var(--fg2)"/>');
    d.push('</svg>');
    return d.join('');
  }

  // --- kroki ---
  str_silnik() {
    const S = this.S, t = this.t, d = this.dane;
    if (!d.oslony.length) return `<p class="pod">${esc(t.brakOslon)}</p>`;
    const [n1] = this._nieba(), pierwszy = this._oslona(S.rolety[0])?.area;
    // pokój, w którym „Cały pokój” obejmuje dokładnie wybrane silniki – wtedy ta sama grupa nie świeci się drugi raz
    const calyPokoj = a => { const poj = d.oslony.filter(o => o.area === a && !o.grupa && !o.brama); return !!a && poj.length > 1 && poj.length === S.rolety.length && poj.every(o => S.rolety.includes(o.id)); };
    const kafel = o => {
      const czl = (o.czlonkowie || []).filter(e => this._oslona(e));
      const grWyb = czl.length > 1 && czl.length === S.rolety.length && czl.every(e => S.rolety.includes(e))
        && (S.wybSkad ? S.wybSkad === 'grupa:' + o.id : !calyPokoj(o.area));
      const nr = S.rolety.indexOf(o.id), poz = typeof o.poz === 'number' ? o.poz : o.stan === 'closed' ? 0 : 100;
      return `<button class="kaf ${nr >= 0 || grWyb ? 'wyb' : ''}" data-oslona="${esc(o.id)}" aria-pressed="${nr >= 0}">${nr >= 0 ? `<span class="zn">${nr + 1}</span>` : ''}
        ${o.brama ? `<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M8 40V14h48v26" fill="none" stroke="var(--fg2)" stroke-width="2"/>${Array.from({ length: 8 }, (_, i) => `<line x1="${12 + i * 5.5}" x2="${12 + i * 5.5}" y1="14" y2="40" stroke="var(--fg2)"/>`).join('')}</svg>`
        : `<svg viewBox="0 0 64 44" aria-hidden="true"><rect x="9" y="3" width="46" height="38" rx="2" fill="${this._rama()}" stroke="#000" stroke-opacity=".25"/>
        <rect x="12" y="6" width="40" height="32" fill="${n1}"/>${this.oslona(this._typOslony(o), 12, 6, 40, 32, Math.max(poz, 8), this._kolor())}</svg>`}
        <b>${esc(o.nazwa)}</b><span class="miejsce">${esc(`${poz} %`)}</span>${o.zajeta && nr < 0 ? `<span class="miejsce" style="color:var(--accent)">${esc(wstaw(t.wUrzadzeniu, o.zajeta))}</span>` : o.grupa ? `<span class="miejsce">${esc(czl.length > 1 ? wstaw(t.grupaIle, czl.length) : t.grupa)}</span>` : ''}</button>`;
    };
    // pokoje: na górze podpowiedź „cały pokój” (wszystkie pojedyncze silniki naraz), niżej grupy i pojedyncze osłony
    const pokoje = [...new Set(d.oslony.map(o => o.area || ''))]
      .sort((a, b) => (b === pierwszy) - (a === pierwszy) || !a - !b || (this._nazwaPokoju(a) || '').localeCompare(this._nazwaPokoju(b) || ''));
    const w = pokoje.map(a => {
      const tu = d.oslony.filter(o => (o.area || '') === a).sort((x, y) => !!y.grupa - !!x.grupa || x.nazwa.localeCompare(y.nazwa));
      const poj = tu.filter(o => !o.grupa && !o.brama), caly = calyPokoj(a) && (!S.wybSkad || S.wybSkad === 'pokoj:' + a);
      // każdy silnik pokoju jako małe okno z jego prawdziwą osłoną
      const okienko = (o, i) => { const x = 4 + i * 44, poz = typeof o.poz === 'number' ? o.poz : o.stan === 'closed' ? 0 : 100;
        return `<rect x="${x}" y="3" width="40" height="38" rx="2" fill="${this._rama()}" stroke="#000" stroke-opacity=".25"/><rect x="${x + 3}" y="6" width="34" height="32" fill="${n1}"/>${this.oslona(this._typOslony(o), x + 3, 6, 34, 32, Math.max(poz, 8), this._kolor())}`; };
      const podp = a && poj.length > 1 ? `<button class="kaf caly ${caly ? 'wyb' : ''}" data-pokojcaly="${esc(a)}" aria-pressed="${caly}">
        <svg viewBox="0 0 ${4 + poj.length * 44} 44" aria-hidden="true">${poj.map(okienko).join('')}</svg>
        <b>${esc(wstaw(t.calyPokoj, this._nazwaPokoju(a)))}</b><span class="miejsce">${esc(poj.map(o => o.nazwa).join(' + '))}</span></button>` : '';
      const grupy = tu.filter(o => o.grupa), reszta = tu.filter(o => !o.grupa);
      const linia = grupy.length && reszta.length ? `<div class="linia"><span>${esc(t.pojedyncze)}</span></div>` : '';
      return `<div class="sek">${esc(a ? this._nazwaPokoju(a) : t.bezPokoju)}</div><div class="siatka k2">${podp}${grupy.map(kafel).join('')}${linia}${reszta.map(kafel).join('')}</div>`;
    });
    return w.join('') + (S.wykryty ? `<p class="pod" style="margin-top:12px">${esc(wstaw(t.wykryty, S.wykryty))}</p>` : '');
  }
  // rysunek kafelka: rodzaj osłony zgadnięty z klasy, lamel albo nazwy
  _typOslony(o) {
    if (o.klasa === 'awning') return 'markiza';
    if (o.klasa === 'shutter') return 'natynkowa';
    if (o.lamele || /żaluzj|zaluzj|jalous|blind/i.test(o.nazwa)) return 'zaluzja';
    if (/rolet|roller|shutter/i.test(o.nazwa)) return 'pelna';
    return this.S.o.oslona && !czyBrama(this.S.o.oslona) ? this.S.o.oslona : 'zebra';
  }
  _nazwaPokoju(a) { return this.dane.oslony.find(o => o.area === a)?.pokoj || a; }
  // edytor układu: rysunek z uchwytami, przyciski podziału i suwaki słupka / belki
  _edytorCaly() {
    const t = this.t;
    return `<div id="edytor">${this.edytor()}</div>
      <div class="chipy" style="justify-content:center;margin:10px 0 4px">
        <button class="chip" data-op="poz">${ik('uklad', 16)} ${esc(t.wPoprzek)}</button><button class="chip" data-op="pion">${ik('uklad', 16)} ${esc(t.wzdluz)}</button>
        <button class="chip" data-op="usun">${esc(t.usun)}</button></div>
      <div id="przerwy">${this._suwakiPrzerw()}</div>
      <p class="pod" style="text-align:center">${esc(t.wlasnyPodpis)}</p>`;
  }
  str_uklad() {
    const S = this.S, t = this.t;
    // szeroki ekran: edytuje się prosto na dużym rysunku z boku, tu zostają szablony
    const ed = S.szablon === 'w' && !this._szeroko ? `<div class="sek" style="margin-top:0">${esc(t.wlasnyTytul)}</div>
      ${this._edytorCaly()}<div class="sek">${esc(t.zSzablonu)}</div>` : '';
    return ed + `<div class="siatka k4">${UKLADY.map(([k, P, drzwi], i) => `<button class="kaf ${S.szablon === i ? 'wyb' : ''}" data-uklad="${i}">${this.kafelUkladu(P, drzwi)}<b>${esc(dziel(t.uklady[k]))}</b></button>`).join('')}
      <button class="kaf ${S.szablon === 'w' ? 'wyb' : ''}" data-wlasny="1">${this.kafelUkladu(prostokaty(S.u))}<b>${esc(t.uklady.wlasny)}</b></button></div>`;
  }
  str_rodzaj() {
    const S = this.S, T = this.T;
    let lista;
    if (S.brama) lista = BRAMY;
    else {
      const wew = Object.values(GRUPY.wew).flat(), zew = Object.values(GRUPY.zew).flat(), k = this._oslona(S.rolety[0])?.klasa;
      lista = ['shutter', 'awning'].includes(k) || czyZew(S.o.oslona) ? [...zew, ...wew] : [...wew, ...zew];
    }
    const wr = this._wybR(), akt = wr === null ? S.o.oslona : S.pola[wr]?.oslona || S.o.oslona;
    if (wr !== null) lista = lista.filter(k => !czyBrama(k) && !!czyZew(k) === !!czyZew(S.o.oslona) && !['pionowa', 'zaslona'].includes(k));
    return this._wyborPola() + `<div class="siatka k4">${lista.map(k => `<button class="kaf ${akt === k ? 'wyb' : ''}" data-rodzaj="${k}">${this.kafelRodzaju(k)}<b>${esc(dziel(T.oslony[k] || k))}</b></button>`).join('')}</div>`;
  }
  str_kolory() {
    const S = this.S, T = this.T, t = this.t;
    const wr = this._wybR(), wybrany = (co, k) => co === 'kolor' && wr !== null ? (S.pola[wr]?.kolor || S.o.kolor) === k : S.o[co] === k && !S.o[co === 'kolor' ? 'kolor_wlasny' : 'rama_wlasna'];
    const rzad = (co, lista, hexy, nazwy) => `<div class="probki">${lista.map(k => `<button class="probka ${wybrany(co, k) ? 'wyb' : ''}" data-${co}="${k}"><i style="background:${hexy(k)}"></i>${esc(dziel(nazwy[k] || k))}</button>`).join('')}</div>`;
    return this._wyborPola() + `<div class="sek">${esc(t.oslona)}</div>${rzad('kolor', KOLORY_TAB, k => KOLORY[k], T.kolory)}<div class="sek">${esc(t.rama)}</div>${rzad('rama', RAMY_TAB, k => RAMA_Z_KLUCZA[k], T.ramy)}`;
  }
  // „Rodzaj” i „Kolory”: całe okno albo jedno pole (dotknij pola na rysunku)
  _wybR() { const S = this.S; return S.brama || S.wybR == null || S.wybR >= prostokaty(S.u).length ? null : S.wybR; }
  _wyborPola() {
    const S = this.S, t = this.t, n = prostokaty(S.u).length, wr = this._wybR();
    if (S.brama || n < 2) return '';
    return `<div class="wybpol">${this._szeroko ? '' : `<div id="duzeOkno" style="display:flex;justify-content:center">${this.okno({ w: 320, h: 280, numery: true, id: 'r', wybrane: wr })}</div>`}
      <div class="chipy" style="justify-content:center;margin-top:8px"><button class="chip ${wr === null ? 'wyb' : ''}" data-calosc="1">${esc(t.caleOkno)}</button>
      ${Array.from({ length: n }, (_, i) => `<button class="chip ${wr === i ? 'wyb' : ''}" data-pole="${i}">${esc(wstaw(t.pole, i + 1))}${S.pola[i]?.oslona || S.pola[i]?.kolor ? ' ✎' : ''}</button>`).join('')}</div>
      <p class="pod" style="text-align:center;margin:6px 0 0">${esc(wr === null ? t.rodzajCalosc : wstaw(t.rodzajPole, wr + 1))}</p></div>`;
  }
  str_przypisz() {
    const S = this.S, t = this.t;
    return `<p class="pod" style="text-align:center;margin:0 0 8px">${esc(t.przypiszPodpis)}</p>${this._szeroko ? '' : `<div style="display:flex;justify-content:center" id="duzeOkno">${this.okno({ w: 230, h: 210, numery: true, id: 'd', wybrane: S.arkusz })}</div>`}
      <p class="pod" style="text-align:center;margin:8px 0 0">${esc(t.zamienPodpis)}</p>
      <div style="margin-top:10px">${prostokaty(S.u).map((_, i) => {
        const p = S.pola[i] || {}, o = this._oslona(p.silnik);
        const c = p.czujnik && this._nazwa(p.czujnik);
        return `<button class="wiersz" data-pole="${i}"><span class="chwyt" title="${esc(t.przeciagnij)}" aria-hidden="true">⠿</span><span class="ik">${i + 1}</span><span class="t"><b>${esc(o ? o.nazwa : t.wybierzSilnik)}</b>
          <small>${c ? `✓ ${esc(c)} · ${esc(p.tryb === 'otworz' ? t.otworz : t.uchyl)}` : `<span style="color:var(--accent)">+ ${esc(t.czujnikPola)}</span>`}</small></span></button>`;
      }).join('')}</div>`;
  }
  _nazwa(e) { const s = this._hass?.states?.[e]; return s?.attributes?.friendly_name || this._czujnik('okno').lista.find(x => x.id === e)?.nazwa || e; }
  _stan(e) { const s = this._hass?.states?.[e]; return s ? (this._hass.formatEntityState ? this._hass.formatEntityState(s) : s.state) : ''; }
  // czujniki domu: [rodzaj, ikona, klucz w ustawieniach]
  _listaCzujnikow() {
    if (this.S.brama) return [['foto', 'foto', 'czujnik_foto']];
    return [['pogoda', 'pogoda', 'pogoda'], ['temp', 'termo', 'czujnik_temp'], ['obecnosc', 'osoba', 'czujnik_obecnosc'],
      ['wiatr', 'wiatr', 'czujnik_wiatr'], ['deszcz', 'deszcz', 'czujnik_deszcz']];
  }
  str_czujniki() {
    const S = this.S, t = this.t, w = [];
    if (!S.brama) {
      const okna = [...new Set(S.pola.map(p => p.czujnik).filter(Boolean))];
      w.push(`<button class="wiersz ${okna.length ? '' : 'wyl'}" data-idz="przypisz"><span class="ik">${ik('okno', 22)}</span><span class="t"><b>${esc(t.czujniki.okno)}</b><small>${esc(okna.length ? okna.map(e => this._nazwa(e)).join(', ') : t.okienBrak)}</small></span><span class="przel"></span></button>`);
      if (this.dane.slonce) w.push(`<button class="wiersz ${S.o.bez_slonca ? 'wyl' : ''}" data-slonce="1"><span class="ik">${ik('slonce', 22)}</span><span class="t"><b>${esc(t.czujniki.slonce)}</b><small>${esc(t.slonceOpis)}</small></span><span class="przel"></span></button>`);
    }
    for (const [r, i, klucz] of this._listaCzujnikow()) {
      const c = this._czujnik(r), e = S.o[klucz];
      if (!c.lista.length && !e) { w.push(`<div class="wiersz wyl brak"><span class="ik">${ik(i, 22)}</span><span class="t"><b>${esc(t.czujniki[r])}</b><small>${esc(t.nieZnalazlem)}</small></span></div>`); continue; }
      const st = e && this._stan(e);
      w.push(`<button class="wiersz ${e ? '' : 'wyl'}" data-czujnik="${r}"><span class="ik">${ik(i, 22)}</span><span class="t"><b>${esc(t.czujniki[r])}</b><small>${esc(e ? this._nazwa(e) + (st ? ' · ' + st : '') : t.nieUzywaj)}</small></span><span class="przel"></span></button>`);
    }
    return w.join('');
  }
  // automatyka: [klucz, ikona, włączona?, opis, suwak]
  str_auto() {
    const S = this.S, o = S.o, t = this.t;
    const okna = S.pola.some(p => p.czujnik), w = [];
    const harm = !!o.f_harmonogram;
    const wiersz = (k, i, on, tyt, opis, extra = '') => w.push(`<button class="wiersz ${on ? '' : 'wyl'}" data-auto="${k}"><span class="ik">${ik(i, 22)}</span><span class="t"><b>${esc(tyt)}</b><small>${esc(opis)}</small></span><span class="przel"></span></button>${on ? extra : ''}`);
    const rano = harm && o.harm_otwieraj !== false, wieczor = harm && o.harm_zamykaj !== false;
    const suwak = (g, mn, mx, wart, tekst, krok = 15) => `<div class="suw">${g === 'slonce' ? `<span class="et">${esc(t.pozycja)}</span>` : ''}<input type="range" min="${mn}" max="${mx}" step="${krok}" value="${wart}" data-suw="${g}" aria-label="${esc(tekst)}"><span>${esc(g === 'slonce' ? 100 - wart + ' %' : godz(wart))}</span></div>`;
    // rano i wieczór osobno: wschód/zachód słońca z przesunięciem albo stała godzina
    const pora = (k, ikona, on, tyt, klucz, godzKlucz, dom, mn, mx, slonceTekst) => {
      const sl = this._harm(k) === 'slonce';
      const tryby = `<div class="suw chipy"><button class="chip ${sl ? 'wyb' : ''}" data-harm="${k}" data-v="slonce">${ik(ikona, 16)} ${esc(slonceTekst)}</button><button class="chip ${sl ? '' : 'wyb'}" data-harm="${k}" data-v="godziny">${ik('stoper', 16)} ${esc(t.godzina)}</button></div>`;
      wiersz(k, ikona, on, tyt, this._opisPory(k), tryby + (sl ? this._par(klucz, t.przesuniecie) : suwak(godzKlucz, mn, mx, minuty(o[godzKlucz] || dom), tyt)));
    };
    pora('rano', 'wschod', rano, t.auto.rano, 'przes_otw', 'otworz', '07:00', 300, 660, t.wschodSlonca);
    pora('wieczor', 'zachod', wieczor, t.auto.wieczor, 'przes_zam', 'zamknij', '21:00', 1020, 1410, t.zachodSlonca);
    if (okna && wieczor) w.push(this._oknaWieczorem());
    if (!o.bez_slonca) {
      const poz = 100 - (+o.slonce_poz || 20);
      wiersz('slonce', 'slonce', !!o.f_slonce, t.auto.slonce, wstaw(t.zaslon, poz), suwak('slonce', 0, 70, +o.slonce_poz || 20, t.auto.slonce, 5)
        + (o.czujnik_temp || o.pogoda ? this._par('slonce_temp', t.odTemp) : '') + `<div class="suw chipy"><span style="min-width:auto">${esc(t.strona)}</span>${STRONY.map(([k, a]) => `<button class="chip ${+(o.azymut ?? 180) === a ? 'wyb' : ''}" data-azymut="${a}">${esc(t.strony[k])}</button>`).join('')}</div>`);
    }
    if (okna) {
      wiersz('blokada', 'tarcza', !!o.f_blokada, t.auto.blokada, t.okienne);
      wiersz('wietrzenie', 'okno', !!o.f_wietrzenie, t.auto.wietrzenie, t.okienne, this._par('wietrzenie_poz', t.pozycja));
    }
    const zew = czyZew(o.oslona);
    if (zew && (o.pogoda || o.czujnik_wiatr)) wiersz('wiatr', 'wiatr', !!o.f_wiatr, t.auto.wiatr, wstaw(t.wiatrOpis, o.wiatr_prog ?? 40),
      this._zrodlo('wiatr', 'czujnik_wiatr') + this._par('wiatr_prog', t.prog) + this._par('wiatr_poz', t.pozycja));
    if (AUTO_ZEW.includes(o.oslona) && (o.pogoda || o.czujnik_deszcz)) wiersz('deszcz', 'deszcz', !!o.f_deszcz, t.auto.deszcz, t.deszczOpis,
      this._zrodlo('deszcz', 'czujnik_deszcz') + this._par('deszcz_poz', t.pozycja));
    if (!zew || !(o.pogoda || o.czujnik_wiatr)) w.push(`<p class="pod" style="margin-top:6px">${esc(t.autoPodpis)}</p>`);
    return w.join('');
  }
  _harm(k) { const o = this.S.o; return o[k === 'rano' ? 'harm_rano' : 'harm_wieczor'] || o.harm_tryb || 'godziny'; }
  _opisPory(k) {
    const o = this.S.o, t = this.t, rano = k === 'rano';
    if (this._harm(k) !== 'slonce') return wstaw(t.oGodz, godz(minuty(o[rano ? 'otworz' : 'zamknij'] || (rano ? '07:00' : '21:00'))));
    const m = +(o[rano ? 'przes_otw' : 'przes_zam'] ?? 0);
    if (!m) return rano ? t.oWschodzie : t.oZachodzie;
    return wstaw(t[(m > 0 ? 'po' : 'przed') + (rano ? 'Wsch' : 'Zach')], Math.abs(m));
  }
  // co wieczorne zamykanie zrobi przy każdym skrzydle z czujnikiem okna
  _oknaWieczorem() {
    const S = this.S, o = S.o, t = this.t;
    const wiersze = S.pola.map((p, i) => [p, i]).filter(([p]) => p.czujnik).map(([p, i]) => {
      const uch = p.tryb !== 'otworz';
      const co = uch && o.f_wietrzenie ? wstaw(t.zjedzieDo, o.wietrzenie_poz ?? PAR.wietrzenie_poz.dom) : o.f_blokada ? t.nieZjedzie : t.zjedzieNormalnie;
      return `<div class="ow"><span class="nr">${i + 1}</span><span><b>${esc(this._nazwa(p.czujnik))}</b> · ${esc(uch ? t.uchyl : t.otworz)} → ${esc(co)}</span></div>`;
    });
    return `<div class="okw"><div class="et">${ik('okno', 16)} ${esc(t.oknaWieczorem)}</div>${wiersze.join('')}<div class="pod">${esc(t.pozniej)}</div></div>`;
  }
  // ustawienia włączonej automatyki: z czego bierze dane, próg i pozycja (suwaki pod wierszem)
  _par(k, etykieta) {
    const d = PAR[k], v = +(this.S.o[k] ?? d.dom);
    return `<div class="suw"><span class="et">${esc(etykieta)}</span><input type="range" min="${d.mn}" max="${d.mx}" step="${d.krok}" value="${v}" data-par="${k}" aria-label="${esc(etykieta)}"><span>${esc(d.fmt(v))}</span></div>`;
  }
  _zrodlo(r, klucz) {
    const o = this.S.o, t = this.t, lista = this._czujnik(r).lista;
    const opcje = [...lista.map(x => [x.id, x.nazwa]), ...(o.pogoda ? [['', this._nazwa(o.pogoda)]] : [])];
    if (opcje.length < 2) return '';
    return `<div class="suw chipy"><span class="et">${esc(t.zrodlo)}</span>${opcje.map(([id, n]) => `<button class="chip ${(o[klucz] || '') === id ? 'wyb' : ''}" data-zrodlo="${esc(id)}" data-klucz="${klucz}">${esc(n)}</button>`).join('')}</div>`;
  }
  str_stoper() {
    const S = this.S, t = this.t, p = S.pomiar || {};
    const czas = p.czas ?? (+S.o.czas || 0);
    return `<div class="duzy"><div id="okKal">${this._oknoNaZywo()}</div>
      <div class="zegar" id="zegar">${p.trwa ? this._sekundy() : czas ? `${String(czas).replace('.', this._przecinek())} s${p.czas ? ' ✓' : ''}` : '— s'}</div>
      <button class="btn" id="mierz" ${p.trwa || !S.rolety.length ? 'disabled' : ''}>${esc(p.trwa ? t.mierze : czas ? t.zmierzZnow : t.zmierz)}</button>
      ${p.silniki?.length > 1 ? `<div class="okw" style="margin:0;align-self:stretch"><div class="et">${ik('stoper', 16)} ${esc(t.kazdy)}</div>${p.silniki.map((x, i) => `<div class="ow"><span class="nr">${i + 1}</span><span style="flex:1">${esc(x.nazwa)}</span><b>${String(x.czas).replace('.', this._przecinek())} s</b></div>`).join('')}</div>` : ''}
      ${p.blad ? `<p class="blad">${esc(p.blad)}</p>` : ''}
      <p class="pod" style="text-align:center">${esc(t.pomin)}</p></div>`;
  }
  _przecinek() { return (1.5).toLocaleString(this._hass?.locale?.language || undefined).includes(',') ? ',' : '.'; }
  _sekundy() { const p = this.S.pomiar; return ((performance.now() - p.od) / 1000).toFixed(1).replace('.', this._przecinek()) + ' s'; }
  _pozycja(e) { const s = this._hass?.states?.[e]; const p = s?.attributes?.current_position; return typeof p === 'number' ? p : s?.state === 'closed' ? 0 : 100; }
  _oknoNaZywo() {
    const S = this.S;
    if (S.brama) return `<div style="width:200px;max-width:100%">${this._brama(S.o.oslona)}</div>`;
    return this.okno({ w: 180, h: 165, id: 'k', poz: i => this._pozycja(S.pola[i]?.silnik || S.rolety[0]) });
  }
  _odswiezPomiar() {
    const r = this.shadowRoot; if (!r) return;
    const o = r.getElementById('okKal'); if (o && !this.S.brama) o.innerHTML = this._oknoNaZywo();
    const z = r.getElementById('zegar'); if (z && this.S.pomiar?.trwa) z.textContent = this._sekundy();
  }
  async _mierz() {
    const S = this.S, t = this.t;
    const rolety = S.brama ? S.rolety : [...new Set(S.pola.map(p => p.silnik).filter(Boolean))];
    S.pomiar = { trwa: true, od: performance.now() };
    this.rysuj();
    const tik = setInterval(() => { if (!S.pomiar?.trwa) clearInterval(tik); else this._odswiezPomiar(); }, 100);
    try {
      const w = await this._hass.callWS({ type: 'motor_ha/kreator/mierz', rolety });
      if (w.czas) { S.o.czas = w.czas; S.pomiar = { czas: w.czas, silniki: w.silniki || [] }; }
      else S.pomiar = { blad: w.brak?.length ? wstaw(t.nieOdp, w.brak.join(', ')) : w.wynik === 'kalibracja_od_razu' ? t.odRazu : t.bladPomiaru };
    } catch (e) { S.pomiar = { blad: t.bladPomiaru }; }
    clearInterval(tik);
    if (this.kroki()[S.krok] === 'stoper') this.rysuj();
  }
  str_dzwonek() {
    const S = this.S, o = S.o, t = this.t, w = [];
    const gdzie = new Set(o.powiadom_gdzie || []), co = new Set(o.powiadom || []);
    for (const tel of this.dane.telefony) w.push(`<button class="wiersz ${gdzie.has(tel.id) ? '' : 'wyl'}" data-tel="${esc(tel.id)}"><span class="ik">${ik(tel.telefon ? 'telefon' : 'dzwonek', 22)}</span><span class="t"><b>${esc(tel.telefon ? t.telefon : tel.nazwa)}</b><small>${esc(tel.telefon ? tel.nazwa : tel.id)}</small></span><span class="przel"></span></button>`);
    if (!this.dane.telefony.length) w.push(`<p class="pod">${esc(t.brakTelefonu)}</p>`);
    const rodzaje = S.brama ? ['nie_odpowiada', 'brama_otwarta', 'brama_niedomknieta', ...(o.czujnik_foto ? ['przeszkoda'] : []), 'bateria']
      : ['nie_odpowiada', 'nie_dojechala', 'bateria', 'automatyka'];
    const ikony = { nie_odpowiada: 'ostrz', nie_dojechala: 'stoper', bateria: 'bateria', automatyka: 'robot', brama_otwarta: 'ostrz', brama_niedomknieta: 'stoper', przeszkoda: 'foto' };
    for (const r of rodzaje) w.push(`<button class="wiersz ${co.has(r) ? '' : 'wyl'}" data-powiadom="${r}"><span class="ik">${ik(ikony[r], 22)}</span><span class="t"><b>${esc(t.powiadom[r])}</b><small>${esc(t.powiadomOpis[r])}</small></span><span class="przel"></span></button>`);
    return w.join('');
  }
  str_gotowe() {
    const S = this.S, t = this.t, d = this.dane;
    const panel = d.panele.find(p => p.klucz === d.panel);
    return `<input class="nazwa" id="nazwa" value="${esc(S.tytul)}" aria-label="${esc(t.nazwa)}" placeholder="${esc(t.nazwa)}">
      ${this._szeroko ? '' : '<div class="karta" id="karta"></div>'}
      ${d.nowy && panel ? `<button class="wiersz ${S.panel ? '' : 'wyl'}" data-panel="1" style="margin-top:12px"><span class="ik">${ik('uklad', 22)}</span><span class="t"><b>${esc(t.naPanel)}</b><small>${esc(panel.nazwa)}</small></span><span class="przel"></span></button>` : ''}`;
  }
  // karta na udawanej encji: dokładnie to, co pokaże panel
  _konfigKarty() {
    const S = this.S, o = S.o;
    const pl = S.brama ? null : prostokaty(S.u).map(([x, y, w, h], i) => ({ x, y, w, h, ...(S.pola[i] || {}) }));
    return { type: 'custom:motor-ha', entity: 'cover.motor_ha_kreator', name: S.tytul || ' ', oslona: o.oslona, kolor: this._kolor(), rama: this._rama(),
      wysokosc: +o.wysokosc || 260, czas: +o.czas || 'auto', odwroc: !!o.odwroc, ...(pl ? { pola: pl, skrzydla: pl.length } : { skrzydla: 1 }),
      _podglad: { pogoda: 'sunny', pora: 'dzien' } };
  }
  _hassKarty() {
    const h = this._hass, S = this.S, teraz = new Date().toISOString();
    const R = S.brama ? S.rolety : [...new Set(S.pola.map(p => p.silnik).filter(Boolean))];
    const poz = R.length ? Math.round(R.reduce((a, e) => a + this._pozycja(e), 0) / R.length) : 60;
    const stan = { entity_id: 'cover.motor_ha_kreator', state: poz > 0 ? 'open' : 'closed', last_changed: teraz, last_updated: teraz, context: { id: '' },
      attributes: { current_position: poz, friendly_name: S.tytul, supported_features: 15, entity_id: R } };
    return { ...h, states: { ...h.states, 'cover.motor_ha_kreator': stan }, callService: () => Promise.resolve(), callWS: () => Promise.resolve(null) };
  }

  // --- edytor własnego układu: duże okno z uchwytami do przeciągania i wybieranym polem ---
  edytor() {
    const duzy = this._szeroko, EW = duzy ? 440 : 260, EH = duzy ? 390 : 230, EP = 10, S = this.S, P = prostokaty(S.u), K = S.u.kol, suma = sumaKol(K), iw = EW - 2 * EP, ih = EH - 2 * EP;
    const [n1, n2] = this._nieba(), d = [], kol = this._kolor();
    d.push(`<svg id="edSvg" viewBox="0 0 ${EW} ${EH + 14}" width="${EW}" height="${EH + 14}" style="max-width:100%;height:auto;touch-action:none" role="img" aria-label="${esc(this.t.wlasnyTytul)}">`);
    d.push(`<defs><linearGradient id="nE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${n1}"/><stop offset="1" stop-color="${n2}"/></linearGradient></defs>`);
    d.push(`<line x1="0" x2="${EW}" y1="${EH - EP + 1}" y2="${EH - EP + 1}" stroke="var(--fg2)" stroke-width="1.5"/>`);
    // słupki i mury między oknami, belki między polami
    for (const [x, y, w, h, typ] of przerwy(S.u)) d.push(this._przerwa(EP + x * iw, EP + y * ih, w * iw, h * ih, typ));
    P.forEach((p, i) => {
      const x = EP + p[0] * iw, y = EP + p[1] * ih, w = p[2] * iw, h = p[3] * ih, on = S.wyb === i;
      const pp = S.pola[i] || {}, wi = Math.max(0, w - 8), hi = Math.max(0, h - 8);
      d.push(`<g data-ep="${i}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${this._rama()}" stroke="#000" stroke-opacity=".3"/>
        ${duzy ? `<rect x="${x + 4}" y="${y + 4}" width="${wi}" height="${hi}" fill="url(#nE)"/><path d="M${x + 4} ${y + 4 + hi * .78}l${wi * .25} ${-hi * .14} ${wi * .2} ${hi * .08} ${wi * .3} ${-hi * .16} ${wi * .25} ${hi * .1}V${y + 4 + hi}H${x + 4}z" fill="#000" opacity=".12"/>${this.oslona(pp.oslona || S.o.oslona, x + 4, y + 4, wi, hi, 60, pp.kolor ? KOLORY[pp.kolor] || pp.kolor : kol)}`
          : `<rect x="${x + 3}" y="${y + 3}" width="${Math.max(0, w - 6)}" height="${Math.max(0, h - 6)}" fill="${n1}"/>`}
        ${on ? `<rect x="${x + 1.5}" y="${y + 1.5}" width="${Math.max(0, w - 3)}" height="${Math.max(0, h - 3)}" fill="none" stroke="#ff9800" stroke-width="3"/>` : ''}
        ${duzy ? `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="12" fill="${on ? '#ff9800' : '#009ac7'}" stroke="#fff" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${i + 1}</text>`
          : `<text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="${on ? '#e65100' : '#1c3a4a'}">${i + 1}</text>`}</g>`);
    });
    const uchwyt = (typ, id, x, y, poziomy) => `<g data-uch="${typ}:${id}" style="cursor:${poziomy ? 'ns' : 'ew'}-resize"><circle cx="${x}" cy="${y}" r="16" fill="transparent"/>
      <rect x="${x - (poziomy ? 14 : 4)}" y="${y - (poziomy ? 4 : 14)}" width="${poziomy ? 28 : 8}" height="${poziomy ? 8 : 28}" rx="4" fill="#009ac7" stroke="#fff" stroke-width="1.5"/></g>`;
    let x = 0;
    K.forEach((k, c) => {
      const w = k.w / suma, X = EP + x * iw, W = w * iw, wys = 1 - k.dol, sr = sumaWierszy(k);
      let y = 0;
      k.r.forEach((h, j) => {
        y += h / sr * wys;
        if (j < k.r.length - 1) { const b = (+k.bel?.[j] || 0) / sr * wys; d.push(uchwyt('r', `${c}-${j}`, X + W / 2, EP + (y + b / 2) * ih, true)); y += b; }
      });
      // puste miejsce pod podniesioną kolumną: dotknięcie dokłada tam pole (np. drzwi pod naświetlem)
      if (k.dol >= .08 && k.r.length < 3) d.push(`<g data-dodaj="${c}" style="cursor:pointer"><rect x="${X + 4}" y="${EP + wys * ih + 10}" width="${Math.max(0, W - 8)}" height="${Math.max(0, k.dol * ih - 14)}" rx="4" fill="transparent" stroke="var(--fg2)" stroke-dasharray="5 4"/>
        <text x="${X + W / 2}" y="${EP + (wys + k.dol / 2) * ih + 11}" text-anchor="middle" font-size="22" fill="var(--fg2)">+</text></g>`);
      d.push(uchwyt('d', c, X + W / 2, EP + wys * ih, true));
      x += w;
      const m = c < K.length - 1 ? (+k.mur || 0) / suma : 0;
      if (c < K.length - 1) d.push(uchwyt('k', c, EP + (x + m / 2) * iw, EP + ih * .5, false));
      x += m;
    });
    d.push('</svg>');
    this._ed = { EW, EH, EP };
    return d.join('');
  }
  // wąski odstęp = słupek w kolorze ramy, szeroki = kawałek ściany (cegły)
  _przerwa(x, y, w, h, typ) {
    const wasko = Math.min(w, h) < 12;
    if (wasko) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${this._rama()}" stroke="#000" stroke-opacity=".3"/>`;
    const d = [`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#c9bfb2" stroke="#000" stroke-opacity=".25"/>`];
    for (let yy = y + 7, n = 0; yy < y + h; yy += 7, n++) {
      d.push(`<line x1="${x}" x2="${x + w}" y1="${yy}" y2="${yy}" stroke="#000" stroke-opacity=".12"/>`);
      for (let xx = x + (n % 2 ? 6 : 12); xx < x + w; xx += 12) d.push(`<line x1="${xx}" x2="${xx}" y1="${yy - 7}" y2="${yy}" stroke="#000" stroke-opacity=".12"/>`);
    }
    return `<g>${d.join('')}</g>`;
  }
  // gdzie jest wybrane pole: kolumna c i wiersz j
  _gdzie(i) { const K = this.S.u.kol; let c = 0; while (c < K.length - 1 && i >= K[c].r.length) { i -= K[c].r.length; c++; } return [c, i]; }
  // suwaki grubości: słupek/mur obok wybranego pola i belka pod nim
  _suwakiPrzerw() {
    const S = this.S, t = this.t, K = S.u.kol, [c, j] = this._gdzie(Math.min(S.wyb, prostokaty(S.u).length - 1)), w = [];
    const cm = c < K.length - 1 ? c : c - 1, k = K[c];
    const sw = K.reduce((a, x) => a + x.w, 0), sr = k.r.reduce((a, b) => a + b, 0);
    if (cm >= 0) { const v = Math.round((+K[cm].mur || 0) / sw * 100); w.push(`<div class="suw"><span class="et">${esc(t.slupek)}</span><input type="range" min="0" max="40" step="1" value="${v}" data-przerwa="mur:${cm}" aria-label="${esc(t.slupek)}"><span>${v ? v + ' %' : esc(t.brak)}</span></div>`); }
    const jb = j < k.r.length - 1 ? j : j - 1;
    if (jb >= 0) { const v = Math.round((+k.bel?.[jb] || 0) / sr * 100); w.push(`<div class="suw"><span class="et">${esc(t.belka)}</span><input type="range" min="0" max="30" step="1" value="${v}" data-przerwa="bel:${c}:${jb}" aria-label="${esc(t.belka)}"><span>${v ? v + ' %' : esc(t.brak)}</span></div>`); }
    return w.join('');
  }
  _odswiezUklad(bezSuwakow) {
    this._dopasujPola(false);
    const r = this.shadowRoot, e = r.getElementById('edytor');
    if (e) e.innerHTML = this.edytor();
    const pz = r.getElementById('przerwy'); if (pz && !bezSuwakow) pz.innerHTML = this._suwakiPrzerw();
    this._bezSceny = true; this._odswiezScene(); this._bezSceny = false;
    const k = r.querySelector('[data-wlasny]'); if (k) k.firstElementChild.outerHTML = this.kafelUkladu(prostokaty(this.S.u));
  }
  operacja(op) {
    const S = this.S, K = S.u.kol, P = prostokaty(S.u);
    let i = op === 'dodaj' ? arguments[1] : Math.min(S.wyb, P.length - 1), c = 0;
    if (op !== 'dodaj') while (i >= K[c].r.length) { i -= K[c].r.length; c++; }
    const k = K[c];
    if (op === 'dodaj') {   // pole w pustym miejscu pod kolumną nr i
      const kd = K[i], wys = 1 - kd.dol, sr = kd.r.reduce((a, b) => a + b, 0);
      kd.r = [...kd.r.map(h => h / sr * wys), kd.dol]; kd.dol = 0; kd.bel = [...(kd.bel || []).map(b => b / sr * wys), 0];
      S.wyb = K.slice(0, i).reduce((a, x) => a + x.r.length, 0) + kd.r.length - 1;
      this._dopasujPola(false); return this.rysuj();
    }
    if (op === 'poz' && k.r.length < 3) { const h = k.r[i] / 2; k.r.splice(i, 1, h, h); (k.bel = k.bel || []).splice(i, 0, 0); }
    if (op === 'pion' && K.length < 4) { k.w /= 2; K.splice(c + 1, 0, { w: k.w, r: [...k.r], dol: k.dol, bel: [...(k.bel || [])], mur: k.mur || 0 }); k.mur = 0; }
    if (op === 'usun' && P.length > 1) {
      if (k.r.length > 1) { const h = k.r.splice(i, 1)[0]; k.r[Math.max(0, i - 1)] += h + (+k.bel?.[Math.min(i, k.r.length - 1)] || 0); k.bel?.splice(Math.min(i, k.r.length - 1), 1); }
      else { const u = K.splice(c, 1)[0]; K[Math.max(0, c - 1)].w += u.w + (+u.mur || 0); if (c >= K.length && K.length) K[K.length - 1].mur = 0; }
      S.wyb = 0;
    }
    this._dopasujPola(false);
    this.rysuj();
  }
  _ciagnij(e) {
    const svg = this.shadowRoot.getElementById('edSvg'); if (!svg || !this._uch) return;
    const { EW, EH, EP } = this._ed, r = svg.getBoundingClientRect(), sk = EW / r.width;
    const fx = Math.min(1, Math.max(0, ((e.clientX - r.left) * sk - EP) / (EW - 2 * EP))), fy = Math.min(1, Math.max(0, ((e.clientY - r.top) * sk - EP) / (EH - 2 * EP)));
    const K = this.S.u.kol, suma = sumaKol(K), [typ, id] = this._uch.split(':');
    if (typ === 'k') {   // środek słupka między kolumną c i c+1
      const c = +id, przed = K.slice(0, c).reduce((a, k) => a + k.w + (+k.mur || 0), 0) / suma, m = (+K[c].mur || 0) / suma, para = (K[c].w + K[c + 1].w) / suma;
      const lewa = Math.min(para - .08, Math.max(.08, fx - przed - m / 2));
      K[c].w = lewa * suma; K[c + 1].w = (para - lewa) * suma;
    } else if (typ === 'd') {   // dół kolumny: okno nad kaloryferem
      K[+id].dol = Math.min(.6, Math.max(0, Math.round((1 - fy) * 50) / 50));
    } else {   // środek belki między polami w kolumnie
      const [c, j] = id.split('-').map(Number), k = K[c], wys = 1 - k.dol, sr = sumaWierszy(k), bel = k.bel || [];
      const gora = k.r.slice(0, j).reduce((a, b, i) => a + b + (+bel[i] || 0), 0) / sr * wys, b = (+bel[j] || 0) / sr * wys, para = (k.r[j] + k.r[j + 1]) / sr * wys;
      const g = Math.min(para - .06, Math.max(.06, fy - gora - b / 2));
      k.r[j] = g / wys * sr; k.r[j + 1] = (para - g) / wys * sr;
    }
    this._odswiezUklad();
  }

  // listy w arkuszach: najpierw tylko to, co jest w pokoju osłony (i to, co już wybrane); reszta domu po „Pokaż wszystkie”
  _polePod(e) {
    const el = this.shadowRoot.elementsFromPoint?.(e.clientX, e.clientY).find(x => x.closest?.('[data-pole]'))?.closest('[data-pole]');
    return el ? +el.dataset.pole : null;
  }
  _tylkoTu(lista, tu, wybrane) {
    if (this.S.wszystkie || !lista.some(tu)) return { lista, wiecej: '' };
    return { lista: lista.filter(x => tu(x) || wybrane.includes(x.id)),
      wiecej: `<button class="chip" data-wszystkie="1">${esc(this.t.wszystkie)}</button>` };
  }
  arkusz() {
    const S = this.S, t = this.t, i = S.arkusz, p = S.pola[i] || (S.pola[i] = { tryb: 'uchyl' });
    const pokoj = this._oslona(S.rolety[0])?.area;
    const sil = this._tylkoTu(this.dane.oslony.filter(o => !o.brama && (!o.grupa || S.rolety.includes(o.id)))
      .sort((a, b) => (pokoj ? (b.area === pokoj) - (a.area === pokoj) : 0) || a.nazwa.localeCompare(b.nazwa)), o => pokoj && o.area === pokoj, [p.silnik, ...S.rolety]);
    const silniki = sil.lista;
    const ok = this._tylkoTu(this._czujnik('okno').lista, c => c.tu, [p.czujnik]), okna = ok.lista;
    return `<div class="tlo" data-zamknij="1"></div><div class="arkusz" role="dialog" aria-label="${esc(wstaw(t.pole, i + 1))}"><div class="uchwyt"></div><h2>${esc(wstaw(t.pole, i + 1))}</h2>
      <div class="sek">${esc(t.silnikPola)}</div><div class="chipy">${silniki.map(o => `<button class="chip ${p.silnik === o.id ? 'wyb' : ''}" data-silnik="${esc(o.id)}">${esc(o.nazwa)}${pokoj && o.area === pokoj && o.pokoj ? `<span class="p">${esc(o.pokoj)}</span>` : ''}</button>`).join('')}${sil.wiecej}</div>
      <div class="sek">${esc(t.czujnikPola)}</div><div class="chipy">${okna.map(c => `<button class="chip ${p.czujnik === c.id ? 'wyb' : ''}" data-czuj="${esc(c.id)}">${esc(c.nazwa)}${c.tu && c.pokoj ? `<span class="p">${esc(c.pokoj)}</span>` : ''}</button>`).join('')}
      ${ok.wiecej}<button class="chip ${!p.czujnik ? 'wyb' : ''}" data-czuj="">${esc(t.bezCzujnika)}</button></div>
      ${p.czujnik ? `<div class="sek">${esc(t.gdyOtwarte)}</div><div class="chipy">${['uchyl', 'otworz'].map(k => `<button class="chip ${p.tryb === k ? 'wyb' : ''}" data-tryb="${k}">${esc(t[k])}</button>`).join('')}</div>` : ''}
      <div style="display:flex;justify-content:flex-end;margin-top:16px"><button class="btn" data-zamknij="1">${esc(t.gotowe)}</button></div></div>`;
  }
  arkuszCzujnika(r) {
    const S = this.S, t = this.t, klucz = this._listaCzujnikow().find(x => x[0] === r)[2], c = this._tylkoTu(this._czujnik(r).lista, x => x.tu, [S.o[klucz]]);
    return `<div class="tlo" data-zamknij="1"></div><div class="arkusz" role="dialog" aria-label="${esc(t.czujniki[r])}"><div class="uchwyt"></div><h2>${esc(t.czujniki[r])}</h2>
      <div class="chipy" style="margin-top:12px">${c.lista.map(x => `<button class="chip ${S.o[klucz] === x.id ? 'wyb' : ''}" data-wybierz="${esc(x.id)}" data-klucz="${klucz}">${esc(x.nazwa)}${x.pokoj ? `<span class="p">${esc(x.pokoj)}</span>` : ''}</button>`).join('')}
      ${c.wiecej}<button class="chip ${!S.o[klucz] ? 'wyb' : ''}" data-wybierz="" data-klucz="${klucz}">${esc(t.nieUzywaj)}</button></div>
      <div style="display:flex;justify-content:flex-end;margin-top:16px"><button class="btn" data-zamknij="1">${esc(t.gotowe)}</button></div></div>`;
  }

  // --- budowa i rysowanie ---
  _zbuduj() {
    const r = this.shadowRoot || this.attachShadow({ mode: 'open' }), t = this.t;
    this.lang = jezyk({}, this._hass);   // dzielenie długich nazw („wolno-wisząca”) w języku kreatora
    r.innerHTML = `<style>${STYL}</style>
      <div class="gora"><div class="tytul"><button class="x" data-x="1" aria-label="${esc(t.zamknij)}">${ik('x', 22)}</button>
        <div><span id="nazwaKroku"></span><small id="ktory"></small></div></div>
        <div class="kroki" id="kroki"></div><div class="podglad" id="podglad"></div></div>
      <div class="cialo"><div class="scena" id="scena"></div><div class="tresc" id="tresc"></div></div>
      <div class="dol"><button class="btn plaski" id="wstecz">${esc(t.wstecz)}</button><button class="btn" id="dalej">${esc(t.dalej)}</button></div>`;
    r.addEventListener('click', e => this._klik(e));
    // szerokie okno (komputer) → dwie kolumny; po zmianie szerokości rysujemy od nowa
    this._ro?.disconnect();
    this._ro = new ResizeObserver(() => { if (this.S && (this.clientWidth >= 760) !== !!this._szeroko) this.rysuj(); });
    this._ro.observe(this);
    r.addEventListener('input', e => this._wpis(e));
    r.addEventListener('pointerdown', e => {
      // Pola: złap pole na rysunku albo uchwyt wiersza i upuść na innym polu – zamiana miejscami
      const zp = this.kroki()[this.S.krok] === 'przypisz' && (e.target.closest?.('#duzeOkno g[data-pole]') || e.target.closest?.('.chwyt')?.closest('[data-pole]'));
      if (zp) { this._zamiana = { z: +zp.dataset.pole, x: e.clientX, y: e.clientY, jedzie: false }; try { e.target.setPointerCapture(e.pointerId); } catch (x) { /* bez przechwycenia */ } }
      const u = e.target.closest?.('[data-uch]'), p = e.target.closest?.('[data-ep]');
      if (u) { this._uch = u.dataset.uch; e.preventDefault(); try { r.getElementById('edytor').setPointerCapture(e.pointerId); } catch (x) { /* bez przechwycenia */ } return; }
      if (p) { this.S.wyb = +p.dataset.ep; this._odswiezUklad(); }
    });
    r.addEventListener('pointermove', e => {
      if (this._uch) this._ciagnij(e);
      const z = this._zamiana; if (!z) return;
      if (!z.jedzie && Math.hypot(e.clientX - z.x, e.clientY - z.y) > 8) z.jedzie = true;
      if (z.jedzie) { const cel = this._polePod(e); z.do = cel; r.querySelectorAll('[data-pole]').forEach(el => el.classList.toggle('cel', +el.dataset.pole === cel && cel !== z.z)); }
    });
    r.addEventListener('pointerup', e => {
      const z = this._zamiana; this._zamiana = null; if (!z?.jedzie) return;
      this._poZamianie = true; setTimeout(() => { this._poZamianie = false; }, 50);
      const cel = this._polePod(e) ?? z.do ?? null, S = this.S;
      if (cel !== null && cel !== z.z) { const a = S.pola[z.z] || {}; S.pola[z.z] = S.pola[cel] || {}; S.pola[cel] = a; }
      this.rysuj();
    });
    const koniec = () => { if (this._uch) { this._uch = null; this.S.szablon = szablon(this.S.u) === 'w' ? 'w' : this.S.szablon; } };
    r.addEventListener('pointerup', koniec);
    r.addEventListener('pointercancel', koniec);
  }

  rysuj() {
    const S = this.S, t = this.t, r = this.shadowRoot, kroki = this.kroki();
    S.krok = Math.min(S.krok, kroki.length - 1);
    const k = kroki[S.krok];
    r.getElementById('nazwaKroku').textContent = t.kroki[k];
    r.getElementById('ktory').textContent = wstaw(t.krok, S.krok + 1, kroki.length);
    r.getElementById('kroki').innerHTML = kroki.map((kk, i) =>
      `<button class="krok ${i === S.krok ? 'teraz' : i < S.krok ? 'zrob' : ''}" data-krok="${i}" aria-label="${esc(t.kroki[kk])}"${i === S.krok ? ' aria-current="step"' : ''}><span class="k">${ik(kk)}</span><span class="n">${esc(t.kroki[kk])}</span></button>`).join('');
    // w „Rodzaj” i „Kolory” przy kilku polach jest jeden duży rysunek do wyboru pola – bez drugiego, małego na górze
    const jedenDuzy = ['rodzaj', 'kolory'].includes(k) && !S.brama && prostokaty(S.u).length > 1;
    // szeroki ekran: z lewej duży rysunek okna (zawsze widoczny), z prawej ustawienia kroku
    this._szeroko = this.clientWidth >= 760;
    this.toggleAttribute('szeroko', this._szeroko);
    this._odswiezScene(k, jedenDuzy);
    const pyt = k === 'rodzaj' && S.brama ? t.pytania.rodzajBrama : t.pytania[k], pod = t.podpisy[k];
    this._kartaEl = null;
    r.getElementById('tresc').innerHTML = `<h2>${esc(pyt)}</h2>${pod ? `<p class="pod">${esc(pod)}</p>` : ''}${this['str_' + k]()}`
      + (S.arkusz !== null && k === 'przypisz' ? this.arkusz() : '') + (S.arkuszC && k === 'czujniki' ? this.arkuszCzujnika(S.arkuszC) : '');
    r.getElementById('wstecz').style.visibility = S.krok ? 'visible' : 'hidden';
    const dalej = r.getElementById('dalej');
    dalej.textContent = S.krok === kroki.length - 1 ? t.zapisz : t.dalej;
    dalej.disabled = !S.rolety.length && !S.pola.some(p => p.silnik);
    if (k === 'gotowe' && customElements.get('motor-ha')) {
      const el = document.createElement('motor-ha');
      el.setConfig(this._konfigKarty());
      el.hass = this._hassKarty();
      r.getElementById('karta').appendChild(el);
      this._kartaEl = el;
    }
  }

  _idz(nr) {
    this.S.krok = nr; this.S.arkusz = null; this.S.arkuszC = null;
    this.rysuj();
    this.shadowRoot.getElementById('tresc').scrollTop = 0;
  }

  async _klik(e) {
    if (this._poZamianie) return;
    const b = e.target.closest('button, g[data-pole], g[data-dodaj], [data-zamknij]');
    if (!b) return;
    const S = this.S, o = S.o, d = b.dataset, kroki = this.kroki();
    if (d.x) return this._p.zamknij();
    if (d.krok !== undefined) return this._idz(+d.krok);
    if (b.id === 'wstecz') return this._idz(Math.max(0, S.krok - 1));
    if (b.id === 'dalej') return S.krok < kroki.length - 1 ? this._idz(S.krok + 1) : this._zapisz(b);
    if (b.id === 'mierz') return this._mierz();
    if (d.idz) return this._idz(kroki.indexOf(d.idz));
    if (d.oslona || d.pokojcaly) {
      const i = S.rolety.indexOf(d.oslona), x = this._oslona(d.oslona);
      const czl = (x?.czlonkowie || []).filter(e => this._oslona(e));
      if (d.pokojcaly) {   // cały pokój jednym dotknięciem: wszystkie pojedyncze silniki z tego pokoju
        const kol = n => /lew|left/i.test(n) ? 0 : /środ|srod|mid/i.test(n) ? 1 : /praw|right/i.test(n) ? 2 : 3;   // od lewej do prawej
        S.rolety = this.dane.oslony.filter(o => o.area === d.pokojcaly && !o.grupa && !o.brama)
          .sort((x, y) => kol(x.nazwa) - kol(y.nazwa) || x.nazwa.localeCompare(y.nazwa)).map(o => o.id).slice(0, 12);
        S.wykryty = null; S.wybSkad = 'pokoj:' + d.pokojcaly;
      } else if (czl.length > 1 && i < 0) {   // grupa: tyle skrzydeł, ile w niej silników, każdy w swoim polu
        S.rolety = czl.slice(0, 12); S.zGrupy = x.nazwa;
        S.wykryty = null; S.wybSkad = 'grupa:' + x.id;
      } else if (i >= 0) { S.rolety.splice(i, 1); S.wybSkad = null; }
      else {
        S.wybSkad = null;
        // brama i okno to osobne urządzenia
        if (S.rolety.some(e => !!this._oslona(e)?.brama !== !!x?.brama)) S.rolety = [];
        S.rolety.push(d.oslona);
        S.wykryty = null;
        if (S.rolety.length === 1 && x?.area && !x.brama && this.dane.nowy) {
          const reszta = this.dane.oslony.filter(o2 => o2.area === x.area && o2.id !== x.id && !o2.zajeta && !o2.grupa && !o2.brama).map(o2 => o2.id);
          if (reszta.length) { S.rolety.push(...reszta.slice(0, 11)); S.wykryty = x.pokoj; }
        }
      }
      // tyle skrzydeł, ile wybranych rolet – także w „Konfiguruj”, gdy zmienia się wybór
      if (S.rolety.length && prostokaty(S.u).length !== S.rolety.length) { S.recznie.uklad = false; S.pola = []; }
      try { this.dane = { ...this.dane, ...(await this._hass.callWS({ type: 'motor_ha/kreator/dane', rolety: S.rolety, ...(this._p.entry_id ? { entry_id: this._p.entry_id } : {}) })), opcje: this.dane.opcje, nowy: this.dane.nowy }; } catch (x2) { /* zostają stare podpowiedzi */ }
      this._podpowiedzi();
    } else if (d.uklad !== undefined) { S.u = zSzablonu(UKLADY[+d.uklad][1]); S.szablon = +d.uklad; S.recznie.uklad = true; this._dopasujPola(false); }
    else if (d.wlasny) { S.szablon = 'w'; S.recznie.uklad = true; S.wyb = 0; }
    else if (d.op) return this.operacja(d.op);
    else if (d.dodaj !== undefined) return this.operacja('dodaj', +d.dodaj);
    else if (d.rodzaj && this._wybR() !== null) { const p = S.pola[this._wybR()] ||= {}; if (d.rodzaj === o.oslona) delete p.oslona; else p.oslona = d.rodzaj; }
    else if (d.rodzaj) { o.oslona = d.rodzaj; S.recznie.rodzaj = true; }
    else if (d.kolor && this._wybR() !== null) { const p = S.pola[this._wybR()] ||= {}; if (d.kolor === o.kolor) delete p.kolor; else p.kolor = d.kolor; }
    else if (d.kolor) { o.kolor = d.kolor; delete o.kolor_wlasny; }
    else if (d.calosc) S.wybR = null;
    else if (d.rama) { o.rama = d.rama; delete o.rama_wlasna; }
    else if (d.pole !== undefined && ['rodzaj', 'kolory'].includes(kroki[S.krok])) S.wybR = this._wybR() === +d.pole ? null : +d.pole;
    else if (d.pole !== undefined) { S.arkusz = +d.pole; S.wszystkie = false; }
    else if (d.zamknij) { S.arkusz = null; S.arkuszC = null; S.wszystkie = false; }
    else if (d.wszystkie) S.wszystkie = true;
    else if (d.silnik) { S.pola[S.arkusz].silnik = d.silnik; if (!S.rolety.includes(d.silnik)) S.rolety.push(d.silnik); }
    else if (d.czuj !== undefined) S.pola[S.arkusz].czujnik = d.czuj || undefined;
    else if (d.tryb) S.pola[S.arkusz].tryb = d.tryb;
    else if (d.slonce) { o.bez_slonca = !o.bez_slonca; if (o.bez_slonca) o.f_slonce = false; }
    else if (d.czujnik) { S.arkuszC = d.czujnik; S.wszystkie = false; }
    else if (d.zrodlo !== undefined) { if (d.zrodlo) o[d.klucz] = d.zrodlo; else delete o[d.klucz]; }
    else if (d.wybierz !== undefined) { if (d.wybierz) o[d.klucz] = d.wybierz; else delete o[d.klucz]; S.arkuszC = null; S.wszystkie = false; }
    else if (d.auto) this._przelacz(d.auto);
    else if (d.harm) o[d.harm === 'rano' ? 'harm_rano' : 'harm_wieczor'] = d.v;
    else if (d.azymut) o.azymut = +d.azymut;
    else if (d.tel) { const g = new Set(o.powiadom_gdzie || []); g.has(d.tel) ? g.delete(d.tel) : g.add(d.tel); o.powiadom_gdzie = [...g]; }
    else if (d.powiadom) { const g = new Set(o.powiadom || []); g.has(d.powiadom) ? g.delete(d.powiadom) : g.add(d.powiadom); o.powiadom = [...g]; }
    else if (d.panel) S.panel = !S.panel;
    else return;
    const y = this.shadowRoot.getElementById('tresc').scrollTop;
    this.rysuj();
    this.shadowRoot.getElementById('tresc').scrollTop = y;
  }
  _przelacz(k) {
    const o = this.S.o;
    if (k === 'rano' || k === 'wieczor') {
      let rano = !!o.f_harmonogram && o.harm_otwieraj !== false, wieczor = !!o.f_harmonogram && o.harm_zamykaj !== false;
      if (k === 'rano') rano = !rano; else wieczor = !wieczor;
      o.f_harmonogram = rano || wieczor;
      o.harm_otwieraj = rano || !wieczor;
      o.harm_zamykaj = wieczor || !rano;
      if (o.f_harmonogram && !o.harm_tryb) o.harm_tryb = 'godziny';
      if (o.f_harmonogram && o.harm_tryb === 'slonce' && !this._zmienionyTryb) { o.harm_tryb = 'godziny'; this._zmienionyTryb = true; }
      if (!o.otworz) o.otworz = '07:00:00';
      if (!o.zamknij) o.zamknij = '21:00:00';
      return;
    }
    o['f_' + k] = !o['f_' + k];
    if (k === 'wietrzenie' && o.f_wietrzenie) o.wietrzenie_poz = 50;
  }
  _wpis(e) {
    const el = e.target, S = this.S;
    if (el.id === 'nazwa') { S.tytul = el.value; S.recznie.tytul = true; if (this._kartaEl) { this._kartaEl.setConfig(this._konfigKarty()); this._kartaEl.hass = this._hassKarty(); } return; }
    if (el.dataset?.przerwa) {   // grubość słupka/muru albo belki
      const [typ, c, j] = el.dataset.przerwa.split(':'), K = S.u.kol, v = +el.value, k = K[+c];
      if (typ === 'mur') k.mur = v / 100 * K.reduce((a, x) => a + x.w, 0);
      else { k.bel = k.bel || []; k.bel[+j] = v / 100 * k.r.reduce((a, b) => a + b, 0); }
      el.nextElementSibling.textContent = v ? v + ' %' : this.t.brak;
      S.szablon = 'w';
      return this._odswiezUklad(true);
    }
    if (el.dataset?.par) {
      const k = el.dataset.par, v = +el.value;
      S.o[k] = v; el.nextElementSibling.textContent = PAR[k].fmt(v);
      if (k === 'przes_otw' || k === 'przes_zam') { const r = k === 'przes_otw' ? 'rano' : 'wieczor', sm = el.closest('.suw').parentElement.querySelector(`[data-auto="${r}"] small`); if (sm) sm.textContent = this._opisPory(r); }
      if (k === 'wiatr_prog') { const sm = el.closest('.suw').parentElement.querySelector('[data-auto="wiatr"] small'); if (sm) sm.textContent = wstaw(this.t.wiatrOpis, v); }
      return;
    }
    const g = el.dataset?.suw; if (!g) return;
    const v = +el.value;
    if (g === 'slonce') S.o.slonce_poz = v; else S.o[g] = godz(v) + ':00';
    el.nextElementSibling.textContent = g === 'slonce' ? 100 - v + ' %' : godz(v);
    const sm = g === 'slonce' ? el.closest('.suw').previousElementSibling.querySelector('small')
      : el.closest('.suw').parentElement.querySelector(`[data-auto="${g === 'otworz' ? 'rano' : 'wieczor'}"] small`);
    if (sm) sm.textContent = g === 'slonce' ? wstaw(this.t.zaslon, 100 - v) : this._opisPory(g === 'otworz' ? 'rano' : 'wieczor');
  }
  _zapisz(b) {
    const S = this.S;
    S.o.na_panel = this.dane.nowy && S.panel ? this.dane.panel : 'nie';
    if (!S.recznie.tytul && !S.tytul) S.tytul = this._oslona(S.rolety[0])?.nazwa || '';
    b.disabled = true;
    this._p.wyslij(wynik(S));
  }
}
