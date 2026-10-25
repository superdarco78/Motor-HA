// Okno z klocków z Blendera (klocki.js) z tym samym wejściem co dawne okno 3D: karta i kreator wczytują ten plik
// dopiero przy pierwszym oknie (import z /motor_ha/okno2d.js) i kładą na nim przezroczyste pola do klikania i przeciągania.
import { laduj, gotowe, rysujOkno, widokOkna, MUR_KAFLA } from './klocki.js';
import { polaNaObrazku } from './okno3d_uklad.js';
import { przepis, miejsce } from './klocki_przepisy.js';

const WERSJA = new URL(import.meta.url).searchParams.get('v') || '0';
const ZDJ = new Map();   // zdjęcia widoku za oknem (adres → obraz), wspólne dla wszystkich okien
function zdjecie(url, gotowy) {
  let z = ZDJ.get(url);
  if (!z) { z = { img: new Image(), ok: false, czeka: [] }; ZDJ.set(url, z); z.img.onload = () => { z.ok = true; z.czeka.splice(0).forEach(f => f()); }; z.img.src = url; }
  if (z.ok) return z.img;
  z.czeka.push(gotowy); return null;
}

// całe okno (opt jak w Okno3D.ustaw) wpasowane w prostokąt w × h na środku
function narysuj(x, w, h, o, poz, widok, jas) {
  const m = o.margines || 0, CW = o.W / (1 - 2 * m), CH = o.H / (1 - 2 * m), s = Math.min(w / CW, h / CH);
  x.clearRect(0, 0, w, h); x.imageSmoothingQuality = 'high'; x.save();
  x.translate((w - CW * s) / 2, (h - CH * s) / 2);
  const pola = o.pola || [[0, 0, 1, 1]];
  rysujOkno(x, s, { pola, typy: pola.map((_, i) => o.typy?.[i] || 'pelna'), kolory: pola.map((_, i) => o.kolory?.[i] || '#e6dcc8'),
    zak: pola.map((_, i) => 1 - Math.max(0, Math.min(100, +(poz[i] ?? poz[0] ?? 100))) / 100),
    rama: o.rama || '#f4f4f2', W: o.W, H: o.H, ox: m * CW, oy: m * CH, CW, CH, sciana: o.sciana || null, widok, jas });
  x.restore();
}

export class Okno3D {
  constructor(host, opt = {}) {
    this.host = host; this.cv = document.createElement('canvas');
    this.cv.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
    host.prepend(this.cv); this.ctx = this.cv.getContext('2d');
    this.opt = {}; this._poz = []; this._jas = 1;
    this._ro = new ResizeObserver(() => this.rysuj()); this._ro.observe(host);
    if (opt) this.ustaw(opt);
    laduj(WERSJA).then(() => this.rysuj()).catch(e => console.error('Motor HA: klocki okna', e));
  }
  // opt: { pola, typy, kolory, rama, W, H, margines, sciana, pozycje, jasnosc }
  ustaw(opt) { this.opt = opt; this._poz = opt.pozycje || []; this._jas = opt.jasnosc ?? 1; this.rysuj(); }
  // pozycje 0–100 (100 = osłona zwinięta / okno otwarte), po jednej na pole
  pozycje(p) { if (JSON.stringify(p) === JSON.stringify(this._poz)) return; this._poz = p; this.rysuj(); }
  // zdjęcie widoku za oknem i jasność pory dnia (1 dzień … .3 noc)
  widokZ(url) { if (url === this._url) return; this._url = url; this.rysuj(); }
  swiatlo(j) { if (j === this._jas) return; this._jas = j; this.rysuj(); }
  prostokaty() { const o = this.opt; return polaNaObrazku(o.pola || [[0, 0, 1, 1]], o.W, o.H, o.margines || 0); }
  rysuj() {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => { this._raf = null; this._klatka(); });
  }
  _klatka() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h || !this.opt.W || !gotowe()) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (this.cv.width !== Math.round(w * dpr) || this.cv.height !== Math.round(h * dpr)) { this.cv.width = Math.round(w * dpr); this.cv.height = Math.round(h * dpr); }
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    narysuj(this.ctx, w, h, this.opt, this._poz, this._url ? zdjecie(this._url, () => this.rysuj()) : null, this._jas);
  }
  // nowy element strony (kreator rysuje krok od nowa): ten sam obraz w nowym miejscu
  przenies(host) {
    if (host === this.host) return; this._ro.disconnect(); this.host = host; host.prepend(this.cv); this._ro.observe(host); this.rysuj();
  }
  zniszcz() { this._ro.disconnect(); cancelAnimationFrame(this._raf); this.cv.remove(); }
}

// obrazek kafelka (lista rodzajów w kreatorze): całe okno z osłoną w wybranych kolorach → data: URL, raz na rodzaj i kolor
const KAFLE = new Map();
let widokK = null, startKafli = 0;
export function widokKafli(url) { if (!startKafli) startKafli = performance.now(); widokK = url; }
export function kafel(typ, kolor, rama, widok, w = 240, h = 200) {
  const k = [typ, kolor, rama].join('|');
  if (KAFLE.has(k)) return KAFLE.get(k);
  if (!gotowe()) { laduj(WERSJA); return null; }
  const zdj = widokK || widok ? zdjecie(widokK || widok, () => {}) : null;
  if ((widokK || widok) && !zdj && performance.now() - startKafli < 4000) return null;   // najpierw zdjęcie widoku, potem kafelki
  const p = przepis(typ), v = widokOkna([typ]), dach = v === 'dach', drzwi = p.drzwi;
  const W = dach ? .82 : drzwi ? 1.05 : 1.22, H = dach ? 1.35 : drzwi ? 2.15 : 1.4, [mg, mbok, md] = miejsce(typ, W);
  const ml = Math.max(.12, mbok + .05), mt = Math.max(.12, mg + .04), mb = Math.max(.12, md + .05);
  let CW = W + 2 * ml, CH = H + mt + mb, ox = ml, oy = mt;
  if (CW / CH < w / h) { const d = CH * w / h - CW; CW += d; ox += d / 2; } else { const d = CW * h / w - CH; CH += d; oy += d / 2; }
  const cv = document.createElement('canvas'); cv.width = w * 2; cv.height = h * 2;
  const x = cv.getContext('2d'), s = cv.width / CW; x.imageSmoothingQuality = 'high';
  const zak = p.f === 'okno' ? .2 : .55;
  rysujOkno(x, s, { pola: [[0, 0, 1, 1]], typy: [typ], kolory: [kolor], zak: [zak], rama, W, H, ox, oy, CW, CH, sciana: MUR_KAFLA[v], widok: zdj, jas: 1 });
  const url = cv.toDataURL('image/webp', .9); KAFLE.set(k, url); return url;
}

// obrazek całego okna (kafelki układów, edytor własnego układu) → data: URL; null, dopóki klocki i widok się wczytują
export function obrazOkna(opt, w = 240, h = 200, widok) {
  if (!gotowe()) { laduj(WERSJA); return null; }
  const url = widokK || widok, zdj = url ? zdjecie(url, () => {}) : null;
  if (url && !zdj && performance.now() - startKafli < 4000) return null;
  const cv = document.createElement('canvas'); cv.width = Math.round(w * 2); cv.height = Math.round(h * 2);
  const x = cv.getContext('2d'); x.scale(2, 2);
  narysuj(x, w, h, opt, opt.pozycje || [], zdj, 1);
  return cv.toDataURL('image/webp', .9);
}
