// Okno z klocków: każdy element (rama, skrzydło, klamka, skrzynka, pancerz, kaseta, tkanina, prowadnice, markiza…)
// jest wyrenderowany w Blenderze (karta/narzedzia/blender, 800 px/m, światło z lewej u góry, cień i maska koloru),
// a tutaj składany w całe okno: dowolny układ pól, na każdym polu swój rodzaj i kolor, wybrany kolor ramy.
// Pliki: www/klocki/{nazwa}.webp (obraz) i {nazwa}-m.webp (maska: biały = przemalować na kolor osłony / ramy).
import { RAMA } from './okno3d_uklad.js';
import { przepis } from './klocki_przepisy.js';

export const KLOCKI = ['c80', 'c80_pak', 'dach_klamka', 'f80', 'fas_listwa', 'fas_prowadnica', 'fas_skrzynka', 'har_szyna', 'karnisz', 'kas_kaseta', 'kas_listwa', 'kas_prowadnica', 'kas_tkanina', 'klamka', 'kopula', 'mark_kaseta', 'mark_kosz', 'mark_listwa', 'mark_rura', 'mark_tk', 'mark_volant', 'nad_klapa', 'nat_listwa', 'nat_pancerz', 'nat_prowadnica', 'nat_skrzynka', 'okien_poprzeczka', 'okien_skrz', 'okr_skrzynka', 'oscieznica', 'pancerz_ext', 'panel_tk', 'parasol', 'pergola_lam', 'pion_lamela', 'pion_szyna', 'plaster', 'plisa', 'rol_bambus', 'rol_belka', 'rol_blackout', 'rol_kaseta_dach', 'rol_kwadrat', 'rol_listwa', 'rol_listwa_ciezka', 'rol_listwa_dach', 'rol_prow_dach', 'rol_prow_u', 'rol_prow_zip', 'rol_rura', 'rol_screen', 'rzymska_faldy', 'silownik', 'skrzydlo', 'slup', 'z90', 'z90_pak', 'zadaszenie', 'zagiel', 'zal25', 'zal25_pak', 'zal50', 'zal50_pak', 'zal_szyna', 'zas_tk', 'zas_wave'];
const A = {};
let SZUM = null, ladowanie = null;
const obraz = src => new Promise((ok, zle) => { const i = new Image(); i.onload = () => ok(i); i.onerror = zle; i.src = src; });
// wczytanie wszystkich klocków (raz na stronę)
export function laduj(wersja) {
  return ladowanie ||= Promise.all(KLOCKI.map(async n => {
    const u = k => new URL(`/motor_ha/klocki/${k}.webp?v=${wersja}`, location.href).href;
    A[n] = { img: await obraz(u(n)), m: await obraz(u(n + '-m')) };
  })).then(() => {
    SZUM = document.createElement('canvas'); SZUM.width = SZUM.height = 256; const z = SZUM.getContext('2d');
    let los = 7; const r = () => (los = (los * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 9000; i++) { z.fillStyle = r() < .5 ? '#000' : '#fff'; z.fillRect(r() * 256, r() * 256, 1.5, 1.5); }
    return true;
  });
}
export const gotowe = () => !!SZUM;
const PX = 800;
const cache = new Map();
function barw(n, hex) {
  const k = n + '|' + hex; if (cache.has(k)) return cache.get(k);
  const a = A[n]; if (!a) throw new Error('brak klocka ' + n);
  const c = document.createElement('canvas'); c.width = a.img.width; c.height = a.img.height;
  const x = c.getContext('2d'); x.drawImage(a.img, 0, 0);
  if (hex) {
    const d = x.getImageData(0, 0, c.width, c.height), mc = document.createElement('canvas'); mc.width = c.width; mc.height = c.height;
    const mx = mc.getContext('2d'); mx.drawImage(a.m, 0, 0); const m = mx.getImageData(0, 0, c.width, c.height).data;
    let sum = 0, n2 = 0; for (let i = 0; i < d.data.length; i += 4) if (m[i] > 150 && m[i + 3] > 200) { sum += (d.data[i] + d.data[i + 1] + d.data[i + 2]) / 3; n2++; }
    const REF = Math.max(60, (n2 ? sum / n2 : 186) * 1.05), rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
    for (let i = 0; i < d.data.length; i += 4) {
      const w = Math.min(1, m[i] / 185) * (m[i + 3] / 255); if (w < .02) continue;
      for (let j = 0; j < 3; j++) { const v = d.data[i + j], t = v * rgb[j] / REF + Math.max(0, v - REF) * 1.6; d.data[i + j] = Math.min(255, t * w + v * (1 - w)); }
    }
    x.putImageData(d, 0, 0);
  }
  cache.set(k, c); return c;
}
const OBJ = { silownik: .36, okien_poprzeczka: .45, karnisz: .66, mark_volant: .8, nat_skrzynka: .612, okr_skrzynka: .612, mark_kaseta: .612, kas_kaseta: .616, zadaszenie: .6 };

// rysownik: skala s (px/m), wszystkie współrzędne w m
function Rys(x, s) {
  const R = {
    x, s,
    // klocek w całości w prostokąt
    img(n, kol, X, Y, W, H, a = 1) { const c = barw(n, kol); x.globalAlpha = a; x.drawImage(c, X * s, Y * s, W * s, H * s); x.globalAlpha = 1; },
    // 3 części w poziomie: końce kon (m) stałe, środek rozciągnięty; wysokość jak w klocku (lub H)
    // X, W = zasięg samego elementu (bez marginesu cienia w klocku)
    trzy(n, kol, X, Y, W, kon = .06, H) {
      const pad = Math.max(0, (A[n].img.width / PX - (OBJ[n] || .6)) / 2); X -= pad; W += 2 * pad; kon = Math.max(kon, pad + .012);
      const c = barw(n, kol), K = kon * PX, h = (H ?? c.height / PX) * s, k = kon * s;
      x.drawImage(c, 0, 0, K, c.height, X * s, Y * s, k, h); x.drawImage(c, K, 0, c.width - 2 * K, c.height, X * s + k, Y * s, W * s - 2 * k, h); x.drawImage(c, c.width - K, 0, K, c.height, X * s + W * s - k, Y * s, k, h);
    },
    // 9 części
    dziewiec(n, kol, X, Y, W, H, pad, rog) {
      const c = barw(n, kol), Rr = rog * PX, sw = c.width, sh = c.height, dx = (X - pad) * s, dy = (Y - pad) * s, dw = (W + 2 * pad) * s, dh = (H + 2 * pad) * s, r = rog * s;
      const sx = [0, Rr, sw - Rr, sw], sy = [0, Rr, sh - Rr, sh], tx = [dx, dx + r, dx + dw - r, dx + dw], ty = [dy, dy + r, dy + dh - r, dy + dh];
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (i !== 1 || j !== 1) x.drawImage(c, sx[i], sy[j], sx[i + 1] - sx[i], sy[j + 1] - sy[j], tx[i], ty[j], tx[i + 1] - tx[i], ty[j + 1] - ty[j]);
    },
    // płat powtarzany w pionie (od dołu lub od góry), rozciągnięty na szerokość; sc = skala pionowa (ściśnięcie plisy)
    pion(n, kol, X, Y, W, H, odDolu = true, sc = 1, a = 1) {
      if (H <= 0) return; const c = barw(n, kol), th = c.height / PX * sc * s;
      x.save(); x.beginPath(); x.rect(X * s, Y * s, W * s, H * s); x.clip(); x.globalAlpha = a;
      if (odDolu) for (let y = (Y + H) * s - th; y > Y * s - th; y -= th) x.drawImage(c, X * s, y, W * s, th);
      else for (let y = Y * s; y < (Y + H) * s; y += th) x.drawImage(c, X * s, y, W * s, th);
      x.restore();
    },
    // prowadnica (pionowy klocek .3 m) rozciągnięta na wysokość, lustro dla prawej strony
    prow(n, kol, X, Y, H, prawa) {
      const c = barw(n, kol), w = c.width / PX * s;
      if (!prawa) x.drawImage(c, X * s - w / 2, Y * s, w, H * s);
      else { x.save(); x.translate(X * s + w / 2, 0); x.scale(-1, 1); x.drawImage(c, 0, Y * s, w, H * s); x.restore(); }
    },
    prost(kol, X, Y, W, H, a = 1) { x.globalAlpha = a; x.fillStyle = kol; x.fillRect(X * s, Y * s, W * s, H * s); x.globalAlpha = 1; },
    clip(X, Y, W, H, f) { x.save(); x.beginPath(); x.rect(X * s, Y * s, W * s, H * s); x.clip(); f(); x.restore(); }
  };
  return R;
}

const MUR = { wew: '#efece6', dach: '#f3f1ec', sufit: '#f3f1ec', zew: '#e3ddd1' };

// ---------- wnętrze: roleta na skrzydle ----------
function rol(r, p, [X, Y, w, h], zak, kol, dach) {
  const L = X + .055, R = X + w - .055, top = Y + .07 + (dach ? .05 : 0), dol = Y + h - .07, pl = top + .01 + (dol - top - .01) * zak;
  const gH = { rol_rura: .12, kas_kaseta: .12, rol_kwadrat: .14, rol_belka: .09, rol_kaseta_dach: .12 }[p.gora] || .12;
  const kolT = p.ekran ? '#f7f7f5' : kol;
  r.clip(L + .01, top, R - L - .02, pl - top, () => {
    if (!p.zebra) r.pion(p.tk, kolT, L + .01, top, R - L - .02, pl - top, false, 1, 1);
    const x = r.x, s = r.s;
    if (p.przesw) { x.globalCompositeOperation = 'screen'; x.globalAlpha = .16; x.fillStyle = '#fffbe8'; x.fillRect((L + .01) * s, top * s, (R - L - .02) * s, (pl - top) * s); }
    if (p.ekran) { x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1; x.fillStyle = '#151515'; const b = .04; x.fillRect((L + .01) * s, top * s, (R - L - .02) * s, b * s); x.fillRect((L + .01) * s, top * s, b * .6 * s, (pl - top) * s); x.fillRect((R - .01 - b * .6) * s, top * s, b * .6 * s, (pl - top) * s); }
  });
  if (p.zebra) r.clip(L + .01, top, R - L - .02, pl - top, () => { for (let y = pl; y > top - .1; y -= .1) { r.pion(p.tk, kol, L + .01, y - .055, R - L - .02, .055, false); r.pion(p.tk, kol, L + .01, y - .1, R - L - .02, .045, false, 1, .38); } });   // dzień‑noc: pas pełny i woal na przemian
  if (p.duo) { const ph = Math.min(.18, (dol - pl) * .6); r.pion('plisa', '#f2efe8', L + .01, pl + .02, R - L - .02, ph, false, .7); r.trzy('rol_listwa_dach', null, L - .005, pl + .02 + ph - .02, R - L + .01); }
  if (p.prow) { r.prow(p.prow, dach ? null : kol, L - .006, top, dol - top, false); r.prow(p.prow, dach ? null : kol, R + .006, top, dol - top, true); }
  const dolK = p.drewno ? null : dach ? null : kol;
  if (p.drewno) r.trzy(p.dol, null, L - .005, pl - .02, R - L + .01, .05, .05);
  else r.trzy(p.dol, dolK, L - .005, pl - .025, R - L + .01);
  r.trzy(p.gora, p.gora === 'rol_belka' || p.gora === 'rol_kaseta_dach' ? null : kol, L - .012, top - gH + .03, R - L + .024);
}
// plisa: stała liczba fałd, przy podnoszeniu ściska się
function har(r, p, [X, Y, w, h], zak, kol, dach) {
  const L = X + .055, R = X + w - .055, top0 = Y + .07 + (dach ? .05 : 0), dol = Y + h - .07, top = p.gd ? top0 + (dol - top0) * .18 * (1 - zak) : top0;
  const pl = top + .01 + (dol - top - .01) * zak, pelne = dol - top0, sc = Math.max(.12, (pl - top) / pelne);
  if (p.prow) { r.prow(p.prow, null, L - .006, top0, dol - top0, false); r.prow(p.prow, null, R + .006, top0, dol - top0, true); }
  r.pion(p.tk, kol, L + .005, top + .02, R - L - .01, pl - top - .02, false, sc);
  r.trzy(p.dolL || 'har_szyna', dach ? null : kol, L, pl - .02, R - L);
  r.trzy('har_szyna', dach ? null : kol, L, top - .02, R - L);
}
// rzymska: płaska tkanina, przy podnoszeniu fałdy zbierają się nad dolną listwą
function rzym(r, p, [X, Y, w, h], zak, kol, dach) {
  const L = X + .045 + (dach ? .01 : 0), R = X + w - .045 - (dach ? .01 : 0), top = Y + .06 + (dach ? .06 : 0), dol = Y + h - .07, pl = top + .02 + (dol - top - .02) * zak;
  const fh = Math.min(.32, (1 - zak) * .38 + .04);
  if (p.prow) { r.prow(p.prow, null, L - .006, top, dol - top, false); r.prow(p.prow, null, R + .006, top, dol - top, true); }
  r.pion('kas_tkanina', kol, L, top, R - L, Math.max(0, pl - top - fh), false);
  r.pion('rzymska_faldy', kol, L, Math.max(top, pl - fh), R - L, Math.min(fh, pl - top), true, 1);
  r.trzy('rol_listwa', kol, L, pl - .02, R - L);
  r.trzy(dach ? 'rol_kaseta_dach' : 'kas_kaseta', dach ? null : kol, L - .012, top - .09, R - L + .024);
}
// żaluzja: pakiet u góry, lamele na drabinkach
function lam(r, p, [X, Y, w, h], zak, kol, dach) {
  const L = X + .05, R = X + w - .05, top = Y + .07 + (dach ? .05 : 0), dol = Y + h - .07, H = dol - top;
  const pk = A[p.pak].img.height / PX, krok = A[p.tk].img.height / PX / 8, nCal = H / krok, nOp = Math.round(nCal * zak), pakH = (nCal - nOp) / 12 * pk;
  if (p.prow) { r.prow(p.prow, null, L - .006, top, H, false); r.prow(p.prow, null, R + .006, top, H, true); }
  r.pion(p.pak, kol, L + .005, top + .015, R - L - .01, pakH, true);
  const yl = top + .015 + pakH; r.pion(p.tk, kol, L + .005, yl, R - L - .01, nOp * krok, false);
  r.trzy(p.dolL || 'zal_szyna', dach ? null : kol, L, yl + nOp * krok - .015, R - L);
  r.trzy(p.szyna, dach ? null : kol, L - .005, top - .035, R - L + .01);
}
function pion(r, p, ox, oy, W, H, zak, kol) {   // żaluzja pionowa / panele: zsuwają się w lewo i obracają
  const top = oy - .08, L = ox - .08, Wc = W + .16, dl = H + .2;
  if (p.panel) {
    const n = Math.max(2, Math.round(Wc / .34)), pw = Wc / n + .02;
    for (let i = n - 1; i >= 0; i--) { const xs = L + i * .03, xe = L + i * (Wc - pw) / (n - 1); r.pion('panel_tk', kol, xs + (xe - xs) * zak, top + .04, pw, dl, false); }
  } else {
    const lw = .089, n = Math.round(Wc / (lw * .9)), kat = (1 - zak) * 80 * Math.PI / 180, sx = Math.max(.12, Math.cos(kat));
    for (let i = 0; i < n; i++) { const xs = L + i * .02, xe = L + i * (Wc - lw) / (n - 1), xx = xs + (xe - xs) * zak; r.pion('pion_lamela', kol, xx + lw * (1 - sx) / 2, top + .04, lw * sx * 1.2, dl, false); }
  }
  r.trzy('pion_szyna', kol, L - .02, top - .02, Wc + .04);
}
function zas(r, p, ox, oy, W, H, zak, kol) {   // zasłony: dwa skrzydła na karniszu, fałdy się ściskają
  const top = oy - .2, L = ox - .25, Wc = W + .5, dl = H + .5, pol = Wc / 2;
  const kolZ = p.firana ? '#fbfaf6' : kol, a = p.firana ? .55 : 1;
  if (p.firana) { r.pion('zas_tk', kolZ, L, top + .02, Wc, dl, false, 1, a); }
  else for (const st of [0, 1]) {
    const sz = pol * (.22 + .78 * zak), X = st ? L + Wc - sz : L, sc = .6 * (sz / pol);
    r.clip(X, top + .02, sz, dl, () => { for (let xx = X; xx < X + sz; xx += sc) r.pion(p.tk, kolZ, xx, top + .02, sc + .002, dl, false); });
  }
  r.trzy('karnisz', null, L - .08, top - .03, Wc + .16);
}
// ---------- zewnątrz ----------
function rolz(r, p, ox, oy, W, H, zak, kol) {
  const L = ox + .012, R = ox + W - .012, top = oy - .03, dol = oy + H - .005, pl = top + (dol - top) * zak, x = r.x, s = r.s;
  const pan = p.pan || 'nat_pancerz';
  if (p.siatka) r.clip(L, top, R - L, dol - top, () => { siatkaRys(r, L, top, R - L, dol - top); });
  r.pion(pan, kol, L, top, R - L, pl - top, true);
  if (p.perf) r.clip(L, top, R - L, pl - top, () => { x.fillStyle = 'rgba(20,22,24,.75)'; const ph = .039; for (let y = pl - ph; y > top; y -= ph) for (let xx = L + .012; xx < R - .012; xx += .012) x.fillRect(xx * s, (y - .002) * s, .006 * s, Math.max(1, .0028 * s)); });
  r.prow('nat_prowadnica', kol, ox + .012, top, dol - top, false); r.prow('nat_prowadnica', kol, ox + W - .012, top, dol - top, true);
  r.trzy(p.pan === 'pancerz_ext' ? 'rol_listwa_ciezka' : 'nat_listwa', kol, L - .01, pl - .045, R - L + .02);
  if (p.skrz === 'nat') r.trzy('nat_skrzynka', kol, L - .045, top - .215, R - L + .09);
  else if (p.skrz === 'okr') r.trzy('okr_skrzynka', kol, L - .045, top - .2, R - L + .09);
  else if (p.skrz === 'nad') r.trzy('nad_klapa', kol, L - .045, top - .07, R - L + .09);
  else if (p.skrz === 'adapt') r.trzy('rol_kwadrat', kol, L - .02, top - .1, R - L + .04);   // adaptacyjna: kanciasta skrzynka na ramie, w świetle otworu
  else { r.prost('#000', L - .02, top - .012, R - L + .04, .01, .55); r.prost('#fff', L - .03, top - .024, R - L + .06, .012, .25); }   // podtynkowa: szczelina w nadprożu
}
function siatkaRys(r, X, Y, W, H, a = .32) {
  const x = r.x, s = r.s; x.save(); x.globalAlpha = a; x.strokeStyle = '#111'; x.lineWidth = Math.max(.5, .0012 * s);
  const k = Math.max(.004, 2 / s); x.beginPath();
  for (let xx = X; xx < X + W; xx += k) { x.moveTo(xx * s, Y * s); x.lineTo(xx * s, (Y + H) * s); }
  for (let yy = Y; yy < Y + H; yy += k) { x.moveTo(X * s, yy * s); x.lineTo((X + W) * s, yy * s); }
  x.stroke(); x.restore(); r.prost('#000', X, Y, W, H, .12);
}
function fas(r, p, ox, oy, W, H, zak, kol) {   // żaluzja fasadowa: skrzynka/osłonka, prowadnice, pakiet i lamele
  const L = ox - .01, R = ox + W + .01, top = oy - .03, dol = oy + H, Hc = dol - top;
  const pk = A[p.pak].img.height / PX, krok = A[p.tk].img.height / PX / 8, nCal = Hc / krok, nOp = Math.round(nCal * zak), pakH = (nCal - nOp) / 12 * pk;
  r.pion(p.pak, kol, L, top, R - L, pakH, true);
  r.pion(p.tk, kol, L, top + pakH, R - L, nOp * krok, false);
  r.trzy('fas_listwa', kol, L, top + pakH + nOp * krok - .02, R - L);
  r.prow('fas_prowadnica', kol, L - .005, top, Hc, false); r.prow('fas_prowadnica', kol, R + .005, top, Hc, true);
  r.trzy('fas_skrzynka', kol, L - .03, top - .125, R - L + .06);
}
function scr(r, p, ox, oy, W, H, zak, kol) {   // screen / moskitiera: tkanina przezierna w kasecie, prowadnice
  const L = ox + .015, R = ox + W - .015, top = oy - .02, dol = oy + H - .005, wys = p.wysieg ? .3 : 0, pl = top + (dol - top - wys) * zak;
  if (p.siatka) siatkaRys(r, L, top, R - L, pl - top, .4);
  else { r.pion('rol_screen', kol, L, top, R - L, pl - top, false, 1, .88); }
  if (p.wysieg && zak > .05) {   // markizoleta: dół wysunięty na ramionach (skrót perspektywy)
    const hw = wys * zak; r.pion('rol_screen', kol, L, pl, R - L, hw, false, .5, .95); r.prost('#000', L, pl, R - L, hw, .12);
    r.trzy('rol_listwa_ciezka', kol, L, pl + hw - .02, R - L);
    for (const xs of [L - .01, R + .01]) { r.x.strokeStyle = '#9a9ea2'; r.x.lineWidth = .012 * r.s; r.x.beginPath(); r.x.moveTo(xs * r.s, pl * r.s); r.x.lineTo(xs * r.s, (pl + hw) * r.s); r.x.stroke(); }
  } else r.trzy(p.siatka ? 'kas_listwa' : 'rol_listwa_ciezka', kol, L, pl - .02, R - L);
  if (p.prow) { r.prow(p.prow, kol, L - .005, top, dol - top, false); r.prow(p.prow, kol, R + .005, top, dol - top, true); }
  const g = p.gora || (p.mark ? 'mark_kaseta' : 'rol_kwadrat'), gh = A[g].img.height / PX;
  r.trzy(g, g === 'mark_kaseta' ? null : kol, L - .03, top - gh + .02, R - L + .06);
}
function mplisa(r, p, ox, oy, W, H, zak, kol) {
  if (p.bok) {   // moskitiera plisowana drzwiowa: siatka w pionowe fałdy, przesuwana w bok po progu
    const L = ox + .02, R = ox + W - .02, top = oy + .005, dol = oy + H - .01, pr = L + .03 + (R - L - .03) * zak;
    r.clip(L, top, pr - L, dol - top, () => { siatkaRys(r, L, top, pr - L, dol - top, .35); const k = Math.max(.008, .022 * zak); for (let xx = L; xx < pr; xx += k) { r.prost('#000', xx, top, k / 2, dol - top, .12); r.prost('#fff', xx + k / 2, top, k / 2, dol - top, .06); } });
    r.prow('kas_prowadnica', kol, pr, top - .01, dol - top + .02, true);
    r.prost('#b9bcbf', L, top - .03, R - L, .03); r.prost('#9a9ea2', L, dol - .005, R - L, .02);
    r.prow('kas_prowadnica', kol, L, top - .01, dol - top + .02, false); return;
  }
  const L = ox + .02, R = ox + W - .02, top = oy + .0, dol = oy + H - .01, pl = top + (dol - top) * zak, sc = Math.max(.1, zak);
  r.clip(L, top, R - L, pl - top, () => { siatkaRys(r, L, top, R - L, pl - top, .35); r.pion('plisa', '#3a3b3d', L, top, R - L, pl - top, false, sc, .35); });
  r.trzy('har_szyna', kol, L, pl - .02, R - L); r.trzy('har_szyna', kol, L, top - .04, R - L);
  r.prow('kas_prowadnica', kol, L - .004, top, dol - top, false); r.prow('kas_prowadnica', kol, R + .004, top, dol - top, true);
}
function okien(r, p, ox, oy, W, H, zak, kol) {   // okiennice: dwa skrzydła, otwarte leżą na murze
  const wl = W / 2, hh = H + .02, top = oy - .01;
  if (p.przesuw) r.trzy('okien_poprzeczka', kol, ox - wl - .03, top - .07, W + 2 * wl + .06);
  for (const st of [0, 1]) {
    let X, w, cien = 0;
    if (p.przesuw) { const z = st ? 1 : -1; X = ox + (st ? wl : 0) + z * wl * (1 - zak) * 1.02; w = wl; }
    else { const k = Math.cos((1 - zak) * Math.PI); w = wl * Math.abs(k); X = st ? (k >= 0 ? ox + W - w : ox + W) : (k >= 0 ? ox : ox - w); cien = 1 - Math.abs(k); }
    if (w < .01) continue;
    r.pion('okien_skrz', kol, X, top, w, hh, false);
    r.trzy('okien_poprzeczka', kol, X, top + hh / 2 - .045, w, .02);
    r.trzy('okien_poprzeczka', kol, X, top - .04, w, .02); r.trzy('okien_poprzeczka', kol, X, top + hh - .05, w, .02);
    if (cien) r.prost('#000', X, top, w, hh, cien * .25);
  }
}
function markizy(r, p, ox, oy, W, H, zak, kol, CW, CH) {
  const x = r.x, s = r.s, L = ox - .12, R = ox + W + .12, top = oy - .42;
  const alu = (x1, y1, x2, y2, g = .022) => { x.strokeStyle = '#c9ccce'; x.lineWidth = g * s; x.lineCap = 'round'; x.beginPath(); x.moveTo(x1 * s, y1 * s); x.lineTo(x2 * s, y2 * s); x.stroke(); x.strokeStyle = 'rgba(0,0,0,.25)'; x.lineWidth = g * s * .3; x.beginPath(); x.moveTo(x1 * s + g * s * .3, y1 * s + g * s * .3); x.lineTo(x2 * s + g * s * .3, y2 * s + g * s * .3); x.stroke(); };
  const slupy = (y0) => { for (const xs of [L - .02, R + .02]) r.pion('slup', null, xs - .04, y0, .08, CH - y0, false); };
  if (p.f === 'mark') {
    const gh = A[p.gora].img.height / PX, gy = top - gh / 2;
    if (p.slupy) slupy(p.slupy === 2 ? 0 : top + .02);
    // płachta: od kasety do listwy przedniej (z dołu widać spód; im dalej wysunięta, tym niżej listwa)
    const ext = p.markizeta ? .05 + zak * .7 : .04 + zak * .62, by = top + .04 + ext;
    if (p.markizeta) { r.pion('mark_tk', kol, L + .05, top + .03, R - L - .1, ext * .55, false); r.pion('mark_tk', kol, L + .05, top + .03 + ext * .55, R - L - .1, ext * .45, false, 1, 1); r.prost('#000', L + .05, top + .03 + ext * .55, R - L - .1, ext * .45, .15); }
    else { r.pion('mark_tk', kol, L + .05, top + .03, R - L - .1, ext, false); r.prost('#000', L + .05, top + .03, R - L - .1, ext, .1 + zak * .12); }
    if (zak > .02) {   // ramiona łamane od muru do listwy
      for (const [xs, z] of [[L + .1, 1], [R - .1, -1]]) { const ex = xs + z * (R - L) * .18; alu(xs, top + .05, ex, top + .05 + ext * .55); alu(ex, top + .05 + ext * .55, xs + z * .05, by); }
      if (!p.slupy && !p.markizeta) { /* cień płachty na murze/oknie */ r.prost('#000', L + .1, by + .04, R - L - .1, Math.min(H * .7, ext * 1.4), .12); }
    }
    if (p.volant) r.trzy('mark_volant', kol, L + .05, by - .005, R - L - .1, .02);
    else if (p.pol) r.pion('mark_tk', kol, L + .05, by + .01, R - L - .1, .08, false, 1, .95);
    r.trzy('mark_listwa', null, L + .02, by - .035, R - L - .04);
    if (p.polk) r.trzy('mark_rura', kol, L + .02, gy + .06, R - L - .04);   // półkaseta: od dołu widać nawiniętą płachtę
    r.trzy(p.gora, p.gora === 'mark_kaseta' ? null : kol, L - .02, gy, R - L + .04);
    if (p.daszek) r.trzy('nad_klapa', null, L - .04, gy - .04, R - L + .08);   // daszek nad wałkiem
    if (p.ogrod) for (const xs of [L + .03, R - .03]) r.pion('slup', null, xs - .03, top - .02, .06, ext + .1, false);   // prowadnice na dachu ogrodu zimowego
  } else if (p.f === 'kosz') {
    const hh = .2 + zak * .55, c = barw('mark_kosz', kol);
    x.drawImage(c, 0, 0, c.width, c.height, (L - .1) * s, (top - .05) * s, (R - L + .2) * s, hh * s * 1.2);
  } else if (p.f === 'bok') {   // markiza boczna: kaseta pionowa przy murze, płachta wyciągana w bok do słupka
    const X0 = ox - .5, X1 = ox + W + .45, w = (X1 - X0) * zak, y0 = oy - .25, y1 = oy + H + .22;
    r.pion('panel_tk', kol, X0 + .06, y0 + .1, w, y1 - y0 - .1, false); r.prost('#000', X0 + .06, y0 + .1, w, y1 - y0 - .1, .06);
    r.pion('slup', null, X0 - .02, y0, .1, y1 - y0 + .2, false); if (zak > .05) r.pion('slup', null, X0 + .02 + w, y0 + .1, .08, y1 - y0 + .1, false);
  } else if (p.f === 'zagiel') {
    const c = barw('zagiel', kol), w = (R - L + .5), k = .55 + .45 * zak;
    x.save(); x.translate((ox + W / 2) * s, (top - .1) * s); x.scale(k, k); x.drawImage(c, -w / 2 * s, 0, w * s, w * .64 * s); x.restore();
  } else if (p.f === 'parasol') {
    const c = barw('parasol', kol), k = .25 + .75 * zak, w = Math.min(1.6, W + .6);
    r.pion('slup', null, ox + W / 2 - .02, top + .2, .04, CH - top, false);
    x.save(); x.translate((ox + W / 2) * s, (top + .15) * s); x.scale(k, 1); x.drawImage(c, 0, 0, c.width, c.height * .45, -w / 2 * s, -.15 * s, w * s, w * .9 * .45 * s); x.restore();
  } else if (p.f === 'pergola') {
    slupy(top - .05);
    if (p.lam) { r.pion('z90', kol, L, top + .12, R - L, (oy + H - top) * zak, false); r.prost('#000', L, top + .12, R - L, (oy + H - top) * zak, .08); }
    else { const ext = .05 + zak * .3; r.pion('mark_tk', kol, L, top + .1, R - L, ext, false); r.prost('#000', L, top + .1, R - L, ext, .2); }
    r.trzy('fas_skrzynka', null, L - .06, top, R - L + .12);
  } else if (p.f === 'zadaszenie') {
    r.trzy('zadaszenie', null, L - .05, top + .25, R - L + .1); r.prost('#000', L, top + .33, R - L, .25, .06);
  }
}
// ---------- okna z napędem ----------
function rysujOknoNaped(r, p, sk, zak, rama) {
  const otw = 1 - zak, x = r.x, s = r.s;   // pozycja 0 = otwarte
  sk.forEach(([X, Y, w, h]) => {
    if (p.sufit) {   // okno w dachu płaskim: wnęka, niebo, (kopuła)
      if (p.kopula) { const c = barw('kopula', null); x.globalAlpha = .55; x.drawImage(c, (X - .1) * s, (Y + .05) * s, (w + .2) * s, (h * .5) * s); x.globalAlpha = 1; }
      if (p.bok) { const sx = Math.cos(otw * 1.2); r.prost('#000', X, Y, w, h, otw * .05); x.save(); x.translate(X * s, 0); x.scale(Math.max(.05, sx), 1); r.dziewiec('skrzydlo', rama, 0, Y, w, h, .03, .17); x.restore(); return; }
      const sy = Math.cos(otw * .9); x.save(); x.translate(0, Y * s); x.scale(1, Math.max(.1, sy)); r.dziewiec('skrzydlo', rama, X, 0, w, h, .03, .17); x.restore();
      r.trzy('silownik', null, X + w / 2 - .18, Y + h - .03, .36); return;
    }
    if (p.srodek) {   // okno dachowe obrotowe: skrzydło obraca się wokół środka
      const sy = Math.cos(otw * .7); x.save(); x.translate(0, (Y + h / 2) * s); x.scale(1, sy); r.dziewiec('skrzydlo', rama, X, -h / 2, w, h, .03, .17); r.trzy('dach_klamka', rama, X + .03, -h / 2 - .01, w - .06, .07); x.restore();
      return;
    }
    // uchylne na zewnątrz (u góry zawiasy): dół odchodzi od ramy, widać szparę i ramię siłownika
    const sy = Math.cos(otw * .55); r.prost('#000', X, Y + h * sy, w, h * (1 - sy), .05);
    x.save(); x.translate(0, Y * s); x.scale(1, sy); r.dziewiec('skrzydlo', rama, X, 0, w, h, .03, .17); x.restore();
    r.trzy('silownik', null, X + w / 2 - .18, Y + h - .02, .36);
    if (otw > .02) { x.strokeStyle = '#8d9093'; x.lineWidth = .008 * s; x.beginPath(); x.moveTo((X + w / 2) * s, (Y + h) * s); x.lineTo((X + w / 2) * s, (Y + h * sy) * s); x.stroke(); }
  });
}

// ---------- całe okno ----------
export const MUR_KAFLA = MUR;
const NA_POLU = { rol, har, rzym, lam };   // rodziny rysowane na każdym skrzydle osobno
const NA_OKNIE = { pion, zas, rolz, fas, scr, mplisa, okien };   // rodziny na całym otworze (grupa pól z tym samym rodzajem)
const MARKIZY = ['mark', 'kosz', 'bok', 'zagiel', 'parasol', 'pergola', 'zadaszenie'];
// widok całego okna: dachowe od środka, w dachu płaskim z dołu, same zewnętrzne od ulicy, inaczej od pokoju
export function widokOkna(typy) {
  const v = typy.map(t => przepis(t).v);
  return v.includes('dach') ? 'dach' : v.includes('sufit') ? 'sufit' : v.length && v.every(x => x === 'zew') ? 'zew' : 'wew';
}
// o: { pola [[x,y,w,h] w ułamkach otworu], typy, kolory, zak [0 odsłonięte … 1 zasłonięte], rama, W, H (m),
//      ox, oy (lewy górny róg okna na obrazku, m), CW, CH (rozmiar obrazka, m), sciana (kolor muru lub null), widok (zdjęcie), jas }
export function rysujOkno(x, s, o) {
  const r = Rys(x, s), { W, H, ox, oy, CW, CH, rama } = o, pola = o.pola;
  const v = widokOkna(o.typy), zew = v === 'zew', F = RAMA, SL = .08, iW = W - 2 * F, iH = H - 2 * F, WID = o.widok;
  x.clearRect(0, 0, CW * s, CH * s);
  // ściana: wybrany kolor, a od ulicy i przy oknach dachowych zawsze (osłona na murze / we wnęce)
  const mur = o.sciana || (v !== 'wew' ? MUR[v] : null);
  if (mur) {
    r.prost(mur, 0, 0, CW, CH); if (SZUM) { x.globalAlpha = zew ? .07 : .035; x.drawImage(SZUM, 0, 0, CW * s, CH * s); x.globalAlpha = 1; }
    if (v === 'dach' || v === 'sufit') {   // skos / sufit: głęboka wnęka rozjaśniona od okna
      const g = x.createRadialGradient((ox + W / 2) * s, (oy + H / 2) * s, Math.min(W, H) * .4 * s, (ox + W / 2) * s, (oy + H / 2) * s, Math.max(CW, CH) * .7 * s);
      g.addColorStop(0, 'rgba(255,255,255,.6)'); g.addColorStop(1, 'rgba(120,110,100,.18)'); x.fillStyle = g; x.fillRect(0, 0, CW * s, CH * s);
      x.strokeStyle = 'rgba(0,0,0,.08)'; x.lineWidth = 1;
      for (const [px, py, qx, qy] of [[0, 0, ox, oy], [CW, 0, ox + W, oy], [0, CH, ox, oy + H], [CW, CH, ox + W, oy + H]]) { x.beginPath(); x.moveTo(px * s, py * s); x.lineTo(qx * s, qy * s); x.stroke(); }
    }
  }
  // szyba: od ulicy ciemna z odbiciem nieba, od środka widok za oknem
  const gx = ox * s, gy = oy * s, gw = W * s, gh = H * s;
  if (zew) {
    const g = x.createLinearGradient(gx, gy, gx + gw * .6, gy + gh); g.addColorStop(0, '#5a6c7d'); g.addColorStop(.45, '#2e3338'); g.addColorStop(1, '#24272a');
    x.fillStyle = g; x.fillRect(gx, gy, gw, gh);
    if (WID) r.clip(ox, oy, W, H, () => { x.globalAlpha = .22; x.translate(gx + gw, gy); x.scale(-1, 1); x.drawImage(WID, 0, 0, gw, gw / 1.5); });
    const g2 = x.createLinearGradient(0, gy, 0, gy + gh); g2.addColorStop(0, 'rgba(36,39,42,0)'); g2.addColorStop(1, 'rgba(36,39,42,.7)'); x.fillStyle = g2; x.fillRect(gx, gy, gw, gh);
  } else if (WID) {
    const iw = WID.naturalWidth || WID.width, ih = (WID.naturalHeight || WID.height) * (v === 'sufit' ? .375 : 1), k = Math.max(gw / iw, gh / ih);
    r.clip(ox, oy, W, H, () => x.drawImage(WID, 0, 0, iw, ih, gx + gw / 2 - iw * k / 2, gy + gh / 2 - ih * k / 2, iw * k, ih * k));
  } else {
    const g = x.createLinearGradient(0, gy, 0, gy + gh); g.addColorStop(0, '#bcd6ea'); g.addColorStop(1, '#e4eef4'); x.fillStyle = g; x.fillRect(gx, gy, gw, gh);
  }
  // pola w metrach: skrzydło (bez słupków między polami) i zasięg pola na całym oknie
  const P = pola.map(([px, py, pw, ph], i) => {
    const l = px > .001, pr = px + pw < .999, g = py > .001, d = py + ph < .999;
    const X = ox + F + px * iW, Y = oy + F + py * iH, w = pw * iW, h = ph * iH;
    const sk = [X + (l ? SL / 2 : 0), Y + (g ? SL / 2 : 0), w - (l ? SL / 2 : 0) - (pr ? SL / 2 : 0), h - (g ? SL / 2 : 0) - (d ? SL / 2 : 0)];
    const ok = [l ? sk[0] : ox, g ? sk[1] : oy, 0, 0]; ok[2] = (pr ? sk[0] + sk[2] : ox + W) - ok[0]; ok[3] = (d ? sk[1] + sk[3] : oy + H) - ok[1];
    const typ = o.typy[i] || 'pelna';
    return { i, sk, ok, pr, d, typ, p: przepis(typ), kol: o.kolory[i] || '#e6dcc8', zak: o.zak[i] ?? o.zak[0] ?? .4, srodek: px + pw / 2 };
  });
  // grupy pól z tym samym rodzajem i kolorem obok siebie: osłona na całe okno (np. jedna roleta zewnętrzna na dwa skrzydła)
  const grupy = [];
  for (const q of P) {
    const g = grupy.find(g => g.typ === q.typ && g.kol === q.kol && Math.abs(g.zak - q.zak) < .01);
    if (g) { const [a, b, c, d] = g.ok, X2 = Math.max(a + c, q.ok[0] + q.ok[2]), Y2 = Math.max(b + d, q.ok[1] + q.ok[3]); g.ok = [Math.min(a, q.ok[0]), Math.min(b, q.ok[1]), 0, 0]; g.ok[2] = X2 - g.ok[0]; g.ok[3] = Y2 - g.ok[1]; }
    else grupy.push({ ...q, ok: [...q.ok] });
  }
  const calosc = (g, f) => NA_OKNIE[g.p.f] ? NA_OKNIE[g.p.f](r, g.p, ...g.ok, g.zak, g.kol) : f?.(g);
  // osłona po drugiej stronie szyby (np. roleta zewnętrzna przy widoku od pokoju): przez szybę, przyciemniona
  const zaSzyba = g => r.clip(g.ok[0], g.ok[1], g.ok[2], g.ok[3], () => { calosc(g, g2 => NA_POLU[g2.p.f] && P.filter(q => q.typ === g2.typ).forEach(q => NA_POLU[q.p.f](r, q.p, q.sk, q.zak, q.kol, false))); r.prost('#000', ...g.ok, .18); });
  for (const g of grupy) {
    if (g.p.f === 'zaSzyba') {   // osłona zewnętrzna okna dachowego, widziana przez szybę
      const [X, , w] = g.ok, top = oy + .05, pl = top + (H - .1) * g.zak, p = g.p;
      if (p.pan) r.pion(p.pan, g.kol, X, top, w, pl - top, true, 1, .92); else r.pion(p.tk, g.kol, X, top, w, pl - top, true, 1, .82);
      r.prost('#000', X, top, w, pl - top, .18);
      if (p.haki) for (const hx of [X + .02, X + w - .05]) r.prost('#2a2b2d', hx, pl - .01, .03, .045);
    } else if ((v === 'wew' || v === 'dach') && g.p.v === 'zew' && !MARKIZY.includes(g.p.f)) zaSzyba(g);
    else if (zew && g.p.v === 'wew') zaSzyba(g);
  }
  // parapet
  if (zew) { r.prost('#9fa4a8', ox - .05, oy + H - .005, W + .1, .03); r.prost('#000', ox - .05, oy + H + .025, W + .1, .012, .25); }
  else if (v === 'wew' && mur) { r.prost('#fbfaf8', ox - .06, oy + H, W + .12, .04); r.prost('#000', ox - .06, oy + H + .04, W + .12, .012, .12); }
  // rama: ościeżnica, słupki i ślemiona między polami, skrzydła z klamką
  r.dziewiec('oscieznica', rama, ox, oy, W, H, .04, .2);
  const oc = barw('oscieznica', rama);
  for (const q of P) {
    const [X, Y, w, h] = q.sk;
    if (q.pr) x.drawImage(oc, 32, 300, 70, 200, (X + w) * s, (Y - (Y > oy + F + .001 ? SL / 2 : 0)) * s, (SL + .012) * s, (h + (Y > oy + F + .001 ? SL / 2 : 0) + SL / 2) * s);
    if (q.d) x.drawImage(oc, 300, 32, 200, 70, (X - (X > ox + F + .001 ? SL / 2 : 0)) * s, (Y + h) * s, (w + (X > ox + F + .001 ? SL / 2 : 0) + SL / 2) * s, (SL + .012) * s);
  }
  for (const q of P) {
    const [X, Y, w, h] = q.sk;
    if (q.p.f === 'okno') { rysujOknoNaped(r, q.p, [q.sk], q.zak, rama); continue; }
    r.dziewiec('skrzydlo', rama, X, Y, w, h, .03, .17);
    if (v === 'dach') r.trzy('dach_klamka', rama, X + .03, Y - .01, w - .06, .07);
    else if (v === 'wew' && h > .5 && w > .25) { const kx = q.srodek <= .5 ? X + w - .031 : X + .031; r.img('klamka', null, kx - .06, Y + h / 2 - .13, .12, .26); }
  }
  // osłony po tej stronie szyby: na skrzydle, na całym otworze albo nad oknem (markizy)
  const strona = v === 'zew' ? 'zew' : 'wew';
  for (const g of grupy) {
    const pv = g.p.v === 'dach' || g.p.v === 'sufit' ? 'wew' : g.p.v;
    if (pv !== strona || g.p.f === 'zaSzyba' || g.p.f === 'okno') continue;
    if (NA_POLU[g.p.f]) P.filter(q => q.typ === g.typ && q.kol === g.kol).forEach(q => NA_POLU[q.p.f](r, q.p, q.sk, q.zak, q.kol, g.p.v === 'dach'));
    else if (MARKIZY.includes(g.p.f)) markizy(r, g.p, ...g.ok, g.zak, g.kol, CW, CH);
    else calosc(g);
  }
  // pora dnia: przyciemnienie całego obrazu (tło zostaje przezroczyste)
  const j = o.jas ?? 1;
  if (j < .99) { x.save(); x.globalCompositeOperation = 'source-atop'; x.fillStyle = `rgba(12,16,28,${Math.min(.7, (1 - j) * .75)})`; x.fillRect(0, 0, CW * s, CH * s); x.restore(); }
}
