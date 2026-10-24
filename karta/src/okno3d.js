// Okno 3D: okno budowane na żywo z ustawień (układ, rodzaj osłony na każdym polu, kolory), osłony jadą naprawdę.
// Osobny plik (www/okno3d.js, three.js w środku), wczytywany przez kartę i kreator dopiero wtedy, gdy jest potrzebny.
// Jeden wspólny WebGL na całą stronę: każde okno ma swoją scenę i zwykły <canvas>, na który kopiuje się gotowy obraz
// (dzięki temu panel z wieloma kartami nie wyczerpie limitu kontekstów WebGL w telefonie).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { WebGLPathTracer, GradientEquirectTexture } from 'three-gpu-pathtracer';
import { RAMA, polaNaObrazku } from './okno3d_uklad.js';

// ---------- rodzaje: każdy z 79 rodzajów to rodzina (jak jest zbudowana i jak jedzie) + szczegóły ----------
const R = (f, o = {}) => ({ f, ...o });
export const MODELE = {
  // wewnątrz: rolety
  pelna: R('rol', { mat: 'tkanina' }), kasetowa: R('rol', { mat: 'tkanina', kas: 'kaseta', prow: 1 }), zebra: R('rol', { mat: 'zebra', kas: 'kaseta' }),
  zaciemniajaca: R('rol', { mat: 'blackout', kas: 'kaseta', prow: 1 }), roleta_zip_wew: R('rol', { mat: 'tkanina', kas: 'kaseta', prow: 2 }),
  bambusowa: R('rol', { mat: 'bambus', kas: 'belka' }), ekran: R('rol', { mat: 'ekran', kas: 'kaseta' }),
  // plisy
  plisa: R('har', { faldy: .03, gl: .015 }), plisa_gora_dol: R('har', { faldy: .03, gl: .015, gd: 1 }), plaster: R('har', { faldy: .04, gl: .022, plaster: 1 }),
  rzymska: R('har', { faldy: .17, gl: .075, miekka: 1 }),
  // żaluzje
  zaluzja: R('lam', { lam: .025, mat: 'alu' }), drewniana: R('lam', { lam: .05, mat: 'drewno', tasma: 1 }),
  // na boki
  pionowa: R('pion', { lam: .089 }), panel: R('pion', { lam: .3, panel: 1 }),
  zaslona: R('zas'), zaslona_wave: R('zas', { wave: 1 }), firana: R('zas', { firana: 1 }),
  // na zewnątrz: rolety
  natynkowa: R('rolz', { skrz: 'natynk' }), natynkowa_okragla: R('rolz', { skrz: 'okragla' }), podtynkowa: R('rolz', { skrz: 'brak' }),
  zewnetrzna: R('rolz', { skrz: 'nadstawna' }), adaptacyjna: R('rolz', { skrz: 'natynk' }), perforowana: R('rolz', { skrz: 'natynk', perf: 1 }),
  roleta_moskitiera: R('rolz', { skrz: 'natynk', siatka: 1 }), ekstrudowana: R('rolz', { skrz: 'natynk', prof: .045 }), roleta_drzwi: R('rolz', { skrz: 'natynk', prof: .045 }),
  // żaluzje fasadowe
  fasadowa: R('lam', { lam: .08, mat: 'alu', zew: 1, prow: 1 }), fasadowaz: R('lam', { lam: .09, mat: 'alu', zew: 1, prow: 1, z: 1 }), fasadowa_f80: R('lam', { lam: .08, mat: 'alu', zew: 1, prow: 1, plaska: 1 }),
  // screeny
  screen: R('rol', { mat: 'screen', kas: 'zew', prow: 2, zew: 1 }), markizoleta: R('rol', { mat: 'screen', kas: 'zew', zew: 1, wysieg: 1 }),
  okiennice: R('okien'), okiennice_przesuwne: R('okien', { przesuw: 1 }),
  // okna dachowe (od środka)
  dach_dkl: R('rol', { mat: 'blackout', kas: 'kaseta', prow: 2 }), dach_ssl: R('rolz', { skrz: 'natynk' }), dachowa: R('rolz', { skrz: 'natynk' }),
  dach_fhb: R('rol', { mat: 'tkanina', kas: 'kaseta', prow: 2 }), dach_msl: R('rol', { mat: 'screen', kas: 'zew', zew: 1, prow: 2 }),
  markizeta_dach: R('rol', { mat: 'screen', kas: 'zew', zew: 1, prow: 2 }), dach_pal: R('lam', { lam: .025, mat: 'alu', prow: 1 }),
  dach_fhl: R('har', { faldy: .03, gl: .015, prow: 1 }), dach_dn: R('rol', { mat: 'blackout', kas: 'kaseta', prow: 2, pod: 'har' }),
  // taras (widok z pokoju: markiza nad oknem na zewnątrz)
  markiza_otwarta: R('mark'), markiza: R('mark', { kas: 1 }), markiza_polkasetowa: R('mark', { kas: 1 }), markiza_kasetowa: R('mark', { kas: 1 }),
  markiza_volant: R('mark', { volant: 1 }), markiza_koszowa: R('mark', { kosz: 1 }), markiza_wolnostojaca: R('mark'), markiza_zimowa: R('mark', { kas: 1 }),
  markizeta: R('mark', { kas: 1 }), markiza_balkonowa: R('mark'), markiza_pionowa: R('rol', { mat: 'screen', kas: 'zew', zew: 1 }),
  markiza_boczna: R('pion', { lam: .5, panel: 1, zew: 1, tkan: 1 }), zagiel: R('mark', { zagiel: 1 }), parasol: R('mark', { zagiel: 1 }),
  pergola: R('lam', { lam: .16, mat: 'alu', zew: 1, prow: 1 }), pergola_tkanina: R('mark'), zadaszenie: R('mark', { szklo: 1 }), screen_taras: R('rol', { mat: 'screen', kas: 'zew', prow: 2, zew: 1 }),
  // okna z napędem: skrzydło się uchyla
  okno_silownik: R('okno'), okno_dachowe: R('okno'), okno_plaskie: R('okno'), swietlik: R('okno', { kopula: 1 }), wylaz: R('okno'),
  // moskitiery
  moskitiera: R('rol', { mat: 'siatka', kas: 'zew', prow: 1, zew: 1 }), moskitiera_plisa_okno: R('har', { faldy: .02, gl: .01, siatka: 1, zew: 1 }),
  moskitiera_drzwi: R('rol', { mat: 'siatka', kas: 'zew', prow: 1, zew: 1 }), moskitiera_zip_drzwi: R('rol', { mat: 'siatka', kas: 'zew', prow: 2, zew: 1 })
};
export const model = t => MODELE[t] || MODELE.pelna;
export const naBoki = t => ['pion', 'zas', 'okien'].includes(model(t).f);

// ---------- wspólny WebGL ----------
let GL = null;
function gl() {
  if (GL) return GL;
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap;
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05; r.outputColorSpace = THREE.SRGBColorSpace;
  r.setClearColor(0x000000, 0);
  const env = new THREE.PMREMGenerator(r).fromScene(new RoomEnvironment(), .04).texture;
  return GL = { r, env };
}
export const dziala = () => { try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; } };

// ---------- tekstury (rysowane raz, przebarwiane kolorem materiału) ----------
const TX = {};
function tex(nazwa, w, h, rys, powtarzaj = true) {
  if (TX[nazwa]) return TX[nazwa];
  const c = document.createElement('canvas'); c.width = w; c.height = h; rys(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); if (powtarzaj) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4; return TX[nazwa] = t;
}
const losuj = (s => () => (s = (s * 16807) % 2147483647) / 2147483647)(7);
const splot = () => tex('splot', 128, 128, (x, w, h) => {   // tkanina: jasna, z delikatnym splotem (kolor daje materiał)
  x.fillStyle = '#d0d0d0'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 3200; i++) { x.fillStyle = `rgba(${losuj() < .5 ? '255,255,255' : '0,0,0'},.07)`; x.fillRect(losuj() * w, losuj() * h, 1, 2); }
  for (let y = 0; y < h; y += 2) { x.fillStyle = 'rgba(0,0,0,.035)'; x.fillRect(0, y, w, 1); }
});
const paski = () => tex('paski', 4, 64, (x) => { x.fillStyle = '#fff'; x.fillRect(0, 0, 4, 36); x.fillStyle = '#4a4a4a'; x.fillRect(0, 36, 4, 28); });
const perfor = () => tex('perfor', 32, 32, (x) => { x.fillStyle = '#fff'; x.fillRect(0, 0, 32, 32); x.fillStyle = '#000'; for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) x.fillRect(4 + i * 8, 8 + j * 14, 3, 2); });
const oczka = () => tex('oczka', 16, 16, (x) => { x.fillStyle = '#222'; x.fillRect(0, 0, 16, 16); x.fillStyle = '#fff'; x.fillRect(0, 0, 16, 2); x.fillRect(0, 0, 2, 16); });
const screenTx = () => tex('screen', 16, 16, (x) => { x.fillStyle = '#aaa'; x.fillRect(0, 0, 16, 16); x.fillStyle = '#fff'; for (let i = 0; i < 16; i += 4) { x.fillRect(i, 0, 2, 16); x.fillRect(0, i, 16, 2); } });
const bambus = () => tex('bambus', 64, 64, (x, w, h) => {
  for (let y = 0; y < h; y += 4) { const j = 190 + losuj() * 50; x.fillStyle = `rgb(${j},${j * .93},${j * .78})`; x.fillRect(0, y, w, 3); x.fillStyle = 'rgba(60,40,20,.45)'; x.fillRect(0, y + 3, w, 1); }
  for (let i = 0; i < 6; i++) { x.fillStyle = 'rgba(80,60,30,.35)'; x.fillRect(losuj() * w, 0, 1, h); }
});
const slojeTx = () => tex('sloje', 256, 32, (x, w, h) => {
  x.fillStyle = '#c8c8c8'; x.fillRect(0, 0, w, h);
  for (let i = 0; i < 40; i++) { x.strokeStyle = `rgba(0,0,0,${.04 + losuj() * .08})`; x.beginPath(); const y = losuj() * h; x.moveTo(0, y); x.bezierCurveTo(w * .3, y + losuj() * 6 - 3, w * .6, y + losuj() * 6 - 3, w, y + losuj() * 4 - 2); x.stroke(); }
});
const ekranTx = () => tex('ekran', 64, 64, (x) => { x.fillStyle = '#111'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#fff'; x.fillRect(5, 5, 54, 54); }, false);
const markTx = () => tex('mark', 64, 4, (x) => { x.fillStyle = '#fff'; x.fillRect(0, 0, 64, 4); x.fillStyle = '#c8c8c8'; for (let i = 0; i < 64; i += 16) x.fillRect(i, 0, 8, 4); });

// ---------- materiały ----------
const MAT = new Map();
function mat(klucz, f) { if (!MAT.has(klucz)) MAT.set(klucz, f()); return MAT.get(klucz); }
const std = o => {   // fizyczny materiał: tkaniny dostają połysk włókien (sheen), widoczny w obrazie dokładnym
  const m = new THREE.MeshPhysicalMaterial(o);
  if (o.map && TX.splot && o.map === TX.splot) { m.sheen = .45; m.sheenRoughness = .7; m.sheenColor.set('#ffffff'); }
  return m;
};
const metal = kol => mat('metal' + kol, () => std({ color: kol, roughness: .32, metalness: .55, envMapIntensity: 1 }));
function tkanina(rodz, kol) {   // każdy kawałek tkaniny ma własną kopię tekstury (własna skala splotu)
  const m = (() => {
    const D = THREE.DoubleSide;
    switch (rodz) {
      case 'blackout': return std({ color: kol, roughness: .95, map: splot(), side: D });
      case 'bambus': return std({ color: kol, roughness: .8, map: bambus(), side: D });
      case 'ekran': return std({ color: '#ffffff', roughness: .9, map: ekranTx(), side: D });
      case 'screen': return std({ color: kol, roughness: .9, map: screenTx(), transparent: true, opacity: .8, side: D, depthWrite: false });
      case 'siatka': return std({ color: '#444', roughness: .9, alphaMap: oczka(), transparent: true, opacity: .55, side: D, depthWrite: false });
      case 'firana': return std({ color: kol, roughness: 1, map: splot(), transparent: true, opacity: .42, side: D, depthWrite: false });
      case 'mark': return std({ color: kol, roughness: .9, map: markTx(), side: D });
      default: return std({ color: kol, roughness: .92, map: splot(), side: D });
    }
  })();
  if (m.map) { m.map = m.map.clone(); m.map.needsUpdate = true; }
  if (m.alphaMap) { m.alphaMap = m.alphaMap.clone(); m.alphaMap.needsUpdate = true; }
  return m;
}
const zebraMat = kol => { const m = std({ color: kol, roughness: .93, map: splot().clone(), alphaMap: paski().clone(), alphaTest: .4, side: THREE.DoubleSide }); m.alphaMap.needsUpdate = true; return m; };

// ---------- geometria ----------
const GEO = new Map();
const zaokr = (w, h, d, r = .004) => { const k = [w, h, d, r].map(v => v.toFixed(4)).join(); if (!GEO.has(k)) GEO.set(k, new RoundedBoxGeometry(w, h, d, 2, Math.max(.0005, Math.min(r, w / 2.2, h / 2.2, d / 2.2)))); return GEO.get(k); };
function klocek(w, h, d, m, r) { const o = new THREE.Mesh(zaokr(w, h, d, r), m); o.castShadow = o.receiveShadow = true; return o; }
const ust = (o, x, y, z) => { o.position.set(x, y, z); return o; };
const PLASZ = new THREE.PlaneGeometry(1, 1);
// lamela rolety zewnętrznej: wypukły profil z zamkiem (przekrój wyciągnięty na szerokość osłony)
function profilRolety(sw, ph) {
  const k = 'prof' + sw.toFixed(4) + ph; if (GEO.has(k)) return GEO.get(k);
  const s = new THREE.Shape(), d = ph * .22, h = ph * .96;
  s.moveTo(0, -h / 2); for (let i = 1; i <= 10; i++) { const t = i / 10; s.lineTo(d * Math.sin(t * Math.PI), -h / 2 + h * t); }
  s.lineTo(-.002, h / 2); s.lineTo(-.002, h / 2 - .005); s.lineTo(-.006, h / 2 - .005); s.lineTo(-.006, -h / 2 + .005); s.lineTo(-.002, -h / 2 + .005); s.lineTo(-.002, -h / 2);
  const g = new THREE.ExtrudeGeometry(s, { depth: sw, bevelEnabled: false, curveSegments: 4 });
  g.rotateY(-Math.PI / 2); g.translate(sw / 2, 0, 0); g.computeVertexNormals(); GEO.set(k, g); return g;
}
// harmonijka (plisa, plaster, rzymska): stała liczba fałd, przy podnoszeniu fałdy się zagęszczają
function harmonijka(w, dl, pelna, faldy, gl, miekka) {
  const n = Math.max(2, Math.round(pelna / faldy)), fh = dl / n, d = Math.sqrt(Math.max(0, (faldy / 2) ** 2 - (fh / 2) ** 2)) * (gl / (faldy / 2)) + .0015;
  const kr = miekka ? 6 : 1, pos = [], idx = [];
  for (let i = 0; i <= n * kr; i++) {
    const t = i / kr, y = -t * fh, z = miekka ? d * Math.sin(Math.PI * (t % 1)) ** .8 : (i % 2 ? d : 0);
    pos.push(-w / 2, y, z, w / 2, y, z);
  }
  for (let i = 0; i < n * kr; i++) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx);
  const uv = []; for (let i = 0; i <= n * kr; i++) uv.push(0, i / kr / n, 1, i / kr / n); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals(); return g;
}
// zasłona: fale w poprzek, ściśnięte do boku
function fale(w, h, nf, amp) {
  const s = Math.max(24, nf * 8), pos = [], idx = [], uv = [];
  for (let i = 0; i <= s; i++) { const t = i / s, x = -w / 2 + t * w, z = amp * Math.sin(t * nf * Math.PI * 2); pos.push(x, 0, z, x, -h, z); uv.push(t * nf / 2, 1, t * nf / 2, 0); }
  for (let i = 0; i < s; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 2, a + 1, a + 3); }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx); g.computeVertexNormals(); return g;
}

// ---------- osłony: każda rodzina buduje się raz, a ustaw(zak) przesuwa ją (zak 0 = odsłonięte, 1 = zasłonięte) ----------
// p: { w, h szkła skrzydła, sw szer. osłony, kol, rama, typ } – układ współrzędnych: środek szyby, z = 0 szyba, +z pokój
function oslona(g, p) {
  const M = model(p.typ), kol = p.kol, zew = M.zew || M.f === 'rolz' || M.f === 'okien' || M.f === 'mark';
  const z = zew ? -.075 : .085, top = p.gh / 2 + .015, L = p.gh + .03, sw = p.gw + .03;
  const bialy = metal(p.kas || '#e9e9e7'), listwa = metal(M.mat === 'drewno' ? '#6b5440' : p.kas || '#e9e9e7');
  const guide = (szer) => { for (const s of [-1, 1]) g.add(ust(klocek(.014, L + .02, szer, bialy, .003), s * (sw / 2 + .006), top - L / 2 - .01, z)); };

  if (M.f === 'rol') {
    const zz = M.zew ? -.075 : .085;
    if (M.kas === 'kaseta' || M.kas === 'zew') g.add(ust(klocek(sw + .03, .06, .055, bialy, .012), 0, top + .03, zz));
    else if (M.kas === 'belka') g.add(ust(klocek(sw + .02, .03, .04, mat('belka' + kol, () => std({ color: '#8a6a45', roughness: .7, map: slojeTx() })), .006), 0, top + .015, zz));
    else g.add(ust(new THREE.Mesh(new THREE.CylinderGeometry(.022, .022, sw, 20).rotateZ(Math.PI / 2), bialy), 0, top + .015, zz));
    if (M.prow) guide(M.prow === 2 ? .03 : .018);
    const zebra = M.mat === 'zebra', m = zebra ? zebraMat(kol) : tkanina(M.mat, kol);
    const tk = new THREE.Mesh(PLASZ, m); tk.castShadow = M.mat !== 'siatka' && M.mat !== 'screen'; tk.receiveShadow = true; g.add(tk);
    let tyl = null; if (zebra) { tyl = new THREE.Mesh(PLASZ, zebraMat(kol)); g.add(tyl); }
    const bar = ust(klocek(sw, .02, .022, M.mat === 'bambus' ? mat('belka' + kol, () => std({ color: '#8a6a45', roughness: .7 })) : listwa, .007), 0, 0, zz);
    if (M.mat !== 'ekran') g.add(bar);
    const rep = m.map?.repeat;
    return zak => {
      const dl = Math.max(.002, L * zak);
      tk.scale.set(sw, dl, 1); tk.position.set(0, top - dl / 2, zz);
      if (zebra) {
        for (const [o, dz, przes] of [[tk, 0, 0], [tyl, -.008, .08]]) { o.material.alphaMap.repeat.set(1, dl / .09); o.material.alphaMap.offset.y = przes; o.scale.set(sw, dl, 1); o.position.set(0, top - dl / 2, zz + dz); }
      }
      if (rep) { const s = M.mat === 'ekran' ? 1 : 1 / (M.mat === 'bambus' ? .25 : .12); rep.set(M.mat === 'ekran' ? 1 : sw * s, M.mat === 'ekran' ? 1 : dl * s); }
      bar.position.y = top - dl - .01;
    };
  }
  if (M.f === 'har') {
    const zz = M.zew ? -.06 : .085, m = M.siatka ? tkanina('siatka', kol) : std({ color: kol, roughness: M.plaster ? .97 : .88, map: splot().clone(), side: THREE.DoubleSide });
    const gorna = klocek(sw, .022, .03, bialy, .006), dolna = klocek(sw, .022, .03, bialy, .006);
    g.add(ust(gorna, 0, top + .011, zz)); g.add(dolna);
    if (M.prow) guide(.018);
    let mesh = null;
    return zak => {
      const dl = Math.max(.004, L * zak);
      if (mesh) { g.remove(mesh); mesh.geometry.dispose(); }
      mesh = new THREE.Mesh(harmonijka(sw - .004, dl, L, M.faldy, M.gl, M.miekka), m);
      if (m.map) m.map.repeat.set(sw * 6, L * 6);
      mesh.position.set(0, top, zz - .01); mesh.castShadow = !M.siatka; mesh.receiveShadow = true; g.add(mesh);
      dolna.position.set(0, top - dl - .011, zz);
    };
  }
  if (M.f === 'lam') {   // żaluzja: lamele w pakiecie u góry, opuszczone – na drabinkach, pochylone
    const zz = M.zew ? -.09 : .085, glebL = M.lam, n = Math.max(3, Math.round(L / (glebL * .85))), krok = L / n;
    const m = M.mat === 'drewno' ? mat('drewno' + kol, () => std({ color: kol, roughness: .62, map: slojeTx() })) : mat('lam' + kol, () => std({ color: kol, roughness: .35, metalness: .45, envMapIntensity: 1.1 }));
    const geo = M.z ? zaokr(sw, glebL, .004, .0015) : new THREE.CylinderGeometry(glebL * 1.6, glebL * 1.6, sw, 24, 1, true, -Math.asin(.31), 2 * Math.asin(.31)).rotateZ(Math.PI / 2).translate(0, 0, -glebL * 1.52);
    const lam = new THREE.InstancedMesh(M.plaska || M.mat === 'drewno' ? zaokr(sw, glebL, M.mat === 'drewno' ? .005 : .003, .0015) : geo, m, n);
    lam.castShadow = lam.receiveShadow = true; g.add(lam);
    if (M.mat === 'alu' && !M.plaska && !M.z) lam.material.side = THREE.DoubleSide;
    g.add(ust(klocek(sw + .01, M.zew ? .1 : .03, M.zew ? .12 : .035, bialy, .006), 0, top + (M.zew ? .05 : .015), zz));
    const dol = ust(klocek(sw, .018, glebL * .9, listwa, .005), 0, 0, zz); g.add(dol);
    if (M.prow) guide(.02);
    const sznur = mat(M.tasma ? 'tasma' + kol : 'sznur', () => std({ color: M.tasma ? kol : '#e8e8e4', roughness: .9 }));
    const drab = [-1, 1].map(s => { const o = new THREE.Mesh(PLASZ, sznur); o.position.x = s * sw * .32; o.position.z = zz + glebL * .5; g.add(o); return o; });
    const o = new THREE.Object3D();
    return zak => {
      const k = Math.round(n * zak), pak = M.mat === 'drewno' ? .007 : M.zew ? .012 : .0035;
      const nach = M.zew ? .9 : 1.15 - .25 * zak;   // pochylenie lameli
      for (let i = 0; i < n; i++) {
        if (i < n - k) { o.position.set(0, top - .03 - i * pak, zz); o.rotation.set(0, 0, 0); }
        else { const j = i - (n - k); o.position.set(0, top - .03 - (n - k) * pak - (j + .5) * krok, zz); o.rotation.set(nach, 0, 0); }
        o.updateMatrix(); lam.setMatrixAt(i, o.matrix);
      }
      lam.instanceMatrix.needsUpdate = true;
      const yd = top - .03 - (n - k) * pak - k * krok - .012; dol.position.y = yd;
      drab.forEach(d => { const hh = Math.max(.002, top - yd); d.scale.set(M.tasma ? .025 : .003, hh, 1); d.position.y = top - hh / 2; d.visible = k > 0; });
    };
  }
  if (M.f === 'rolz') {   // roleta zewnętrzna za szybą: pancerz z profili, prowadnice, skrzynka
    const ph = M.prof || .039, n = Math.ceil(L / ph) + 1;
    const m = M.perf ? std({ color: kol, roughness: .4, metalness: .3, alphaMap: perfor().clone(), alphaTest: .5, side: THREE.DoubleSide }) : mat('prof' + kol, () => std({ color: kol, roughness: .42, metalness: .35 }));
    if (M.perf) m.alphaMap.repeat.set(sw / .06, 1);
    const pr = new THREE.InstancedMesh(profilRolety(sw, ph), m, n); pr.castShadow = pr.receiveShadow = true; g.add(pr);
    const skrM = mat('skrz' + kol, () => std({ color: kol, roughness: .45, metalness: .3 }));
    if (M.skrz === 'natynk') g.add(ust(klocek(sw + .05, .17, .17, skrM, .01), 0, top + .085, z - .03));
    if (M.skrz === 'okragla') g.add(ust(new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, sw + .05, 32).rotateZ(Math.PI / 2), skrM), 0, top + .07, z - .04));
    if (M.skrz === 'nadstawna') g.add(ust(klocek(sw + .05, .05, .2, skrM, .01), 0, top + .025, z));
    for (const s of [-1, 1]) g.add(ust(klocek(.04, L + .06, .05, skrM, .006), s * (sw / 2 + .012), top - L / 2 + .03, z));
    const dol = ust(klocek(sw, .03, .022, skrM, .006), 0, 0, z); g.add(dol);
    let siatka = null;
    if (M.siatka) { siatka = new THREE.Mesh(PLASZ, tkanina('siatka', kol)); siatka.scale.set(sw, L, 1); siatka.position.set(0, top - L / 2, z + .02); g.add(siatka); }
    const o = new THREE.Object3D();
    return zak => {
      const dl = L * zak;
      for (let j = 0; j < n; j++) {
        const y = top - dl + (j + .5) * ph;
        o.position.set(0, y, z); o.scale.setScalar(y < top + ph * .5 ? 1 : 0); o.updateMatrix(); pr.setMatrixAt(j, o.matrix);
      }
      pr.instanceMatrix.needsUpdate = true; dol.position.y = top - dl;
    };
  }
  if (M.f === 'pion') {   // żaluzja pionowa / panele: lamele przesuwają się do boku i obracają
    const zz = M.zew ? -.09 : .1, n = Math.max(2, Math.round(sw / (M.lam * .85))), dl = L + .02;
    const m = M.tkan ? tkanina('tkanina', kol) : std({ color: kol, roughness: .9, map: splot().clone(), side: THREE.DoubleSide });
    const lm = new THREE.InstancedMesh(zaokr(M.lam, dl, .003, .001), m, n); lm.castShadow = lm.receiveShadow = true; g.add(lm);
    g.add(ust(klocek(sw + .03, .035, .05, bialy, .006), 0, top + .02, zz));
    const o = new THREE.Object3D(), x0 = -sw / 2 + M.lam / 2, odst = (sw - M.lam) / (n - 1);
    return zak => {
      for (let i = 0; i < n; i++) {
        const xs = x0 + i * (M.panel ? .02 : .016);
        o.position.set(xs + (x0 + i * odst - xs) * zak, top - dl / 2, zz + (M.panel ? i * .012 : 0));
        o.rotation.set(0, M.panel ? 0 : (1 - zak) * 1.35 + .12, 0); o.updateMatrix(); lm.setMatrixAt(i, o.matrix);
      }
      lm.instanceMatrix.needsUpdate = true;
    };
  }
  if (M.f === 'zas') {   // zasłona: dwa skrzydła rozsuwane na boki, fałdy się ściskają
    const zz = .16, hh = p.gh + .2, pol = sw / 2, nf = Math.max(3, Math.round(pol / (M.wave ? .12 : .09)));
    const m = M.firana ? tkanina('firana', kol) : std({ color: kol, roughness: .95, map: splot().clone(), side: THREE.DoubleSide });
    g.add(ust(new THREE.Mesh(new THREE.CylinderGeometry(.012, .012, sw + .3, 16).rotateZ(Math.PI / 2), metal('#9a9a98')), 0, top + .12, zz));
    const sk = [null, null];
    return zak => {
      const sz = Math.max(.1, pol * (.18 + .82 * zak)), amp = Math.min(.06, (M.wave ? .028 : .02) * pol / sz);
      sk.forEach((o, s) => {
        if (o) { g.remove(o); o.geometry.dispose(); }
        const n = new THREE.Mesh(fale(sz, hh, nf, amp), m); n.castShadow = !M.firana; n.receiveShadow = true;
        if (m.map) m.map.repeat.set(4, hh * 6);
        n.position.set(s ? (sw / 2 - sz / 2) : -(sw / 2 - sz / 2), top + .1, zz); g.add(n); sk[s] = n;
      });
    };
  }
  if (M.f === 'okien') {   // okiennice: dwa skrzydła z lamelkami za szybą, otwierają się na zewnątrz
    const zz = -.1, ww = sw / 2 + .02, hh = L + .06, m = mat('okien' + kol, () => std({ color: kol, roughness: .55, map: slojeTx() }));
    const skrz = [-1, 1].map(s => {
      const piv = new THREE.Group(); piv.position.set(s * (sw / 2 + .03), top - L / 2, zz); g.add(piv);
      const l = new THREE.Group(); l.position.x = -s * ww / 2; piv.add(l);
      for (const [w, h, x, y] of [[ww, .06, 0, hh / 2 - .03], [ww, .06, 0, -hh / 2 + .03], [.06, hh, -ww / 2 + .03, 0], [.06, hh, ww / 2 - .03, 0], [ww, .05, 0, 0]]) l.add(ust(klocek(w, h, .03, m, .005), x, y, 0));
      const k = Math.floor((hh - .12) / .045);
      for (let i = 0; i < k; i++) { const s2 = klocek(ww - .1, .05, .006, m, .002); s2.rotation.x = .7; l.add(ust(s2, 0, -hh / 2 + .07 + i * .045, 0)); }
      return piv;
    });
    return zak => skrz.forEach((piv, i) => {
      const s = i ? 1 : -1;
      if (M.przesuw) { piv.rotation.y = 0; piv.position.x = s * (sw / 2 + .03) + s * ww * (1 - zak) * 1.05; }
      else piv.rotation.y = s * (1 - zak) * 2.6;
    });
  }
  if (M.f === 'mark') {   // markiza nad oknem, na zewnątrz: płachta wysuwa się i opada
    const zz = -.2, m = M.szklo ? std({ color: '#cfe3ea', roughness: .05, transparent: true, opacity: .25 }) : tkanina('mark', kol);
    if (m.map) m.map.repeat.set(sw * 3, 1);
    const os = new THREE.Group(); os.position.set(0, top + .05, zz); g.add(os);
    if (M.kas) g.add(ust(klocek(sw + .1, .12, .14, metal('#e9e9e7'), .02), 0, top + .1, zz));
    const pl = new THREE.Mesh(PLASZ, m); pl.castShadow = true; os.add(pl);
    const fr = klocek(sw + .06, .04, .05, metal('#e9e9e7'), .01); os.add(fr);
    const wol = M.volant ? new THREE.Mesh(PLASZ, m) : null; if (wol) os.add(wol);
    return zak => {
      const d = .05 + 1.5 * zak, kat = .35 + .45 * zak;
      os.rotation.x = -kat; pl.scale.set(sw + .04, d, 1); pl.position.set(0, 0, -d / 2); pl.rotation.x = -Math.PI / 2;
      fr.position.set(0, 0, -d);
      if (wol) { wol.scale.set(sw + .04, .18, 1); wol.position.set(0, -.09, -d); wol.rotation.x = kat; }
    };
  }
  return () => {};
}

// ---------- okno ----------
export class Okno3D {
  constructor(host, opt = {}) {
    this.host = host; this.cv = document.createElement('canvas');
    this.cv.style.cssText = 'display:block;width:100%;height:100%;pointer-events:none';
    host.prepend(this.cv); this.ctx = this.cv.getContext('2d');
    this.scena = new THREE.Scene(); this.scena.environment = gl().env;
    this.cam = new THREE.PerspectiveCamera(24, 1, .05, 60);
    const sl = this.slonce = new THREE.DirectionalLight('#fff6ea', 2.3); sl.position.set(-2.4, 3.2, 4.2); sl.castShadow = true;
    sl.shadow.mapSize.set(1536, 1536); sl.shadow.radius = 5; sl.shadow.bias = -.0004; sl.shadow.normalBias = .01;
    Object.assign(sl.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: .5, far: 15 });
    this.nieboL = new THREE.HemisphereLight('#ffffff', '#b9b2a8', .55);
    this.scena.add(sl, this.nieboL);
    this.widokM = new THREE.MeshBasicMaterial({ color: '#cfe0ea', toneMapped: false });
    this.ruchy = []; this.opt = {};
    this._ro = new ResizeObserver(() => this.rysuj()); this._ro.observe(host);
    if (opt) this.ustaw(opt);
  }
  // opt: { pola, typy, kolory, rama, W, H, margines, sciana, pozycje, jasnosc }
  ustaw(opt) {
    const klucz = JSON.stringify([opt.pola, opt.typy, opt.kolory, opt.rama, opt.W, opt.H, opt.margines, opt.sciana, opt.kas, opt.uchyl]);
    this.opt = opt;
    if (klucz !== this._klucz) { this._klucz = klucz; this._zbuduj(); }
    this.pozycje(opt.pozycje || []);
    this.swiatlo(opt.jasnosc ?? 1);
  }
  _zbuduj() {
    const o = this.opt, W = o.W, H = o.H, F = RAMA, SZ = .06, m = o.margines || 0;
    if (this.grupa) { this.scena.remove(this.grupa); }
    const gr = this.grupa = new THREE.Group(); this.scena.add(gr);
    const rama = o.rama || '#f4f4f2';
    const mR = mat('rama' + rama + !!o.drewno, () => std({ color: rama, roughness: o.drewno ? .6 : .36, metalness: 0, envMapIntensity: .8, map: o.drewno ? slojeTx() : null }));
    const mSz = mat('szyba', () => new THREE.MeshPhysicalMaterial({ color: '#dfeef6', roughness: .02, transparent: true, opacity: .1, envMapIntensity: 1.6, depthWrite: false }));
    // ściana z otworem, ościeże i parapet (widać tylko z marginesem)
    // bez wybranego koloru ściany tło zostaje przezroczyste (motyw HA, jasny i ciemny)
    if (m > 0 && o.sciana) {
      const sh = new THREE.Shape([new THREE.Vector2(-W * 3, -H * 3), new THREE.Vector2(W * 3, -H * 3), new THREE.Vector2(W * 3, H * 3), new THREE.Vector2(-W * 3, H * 3)]);
      sh.holes.push(new THREE.Path([new THREE.Vector2(-W / 2, -H / 2), new THREE.Vector2(-W / 2, H / 2), new THREE.Vector2(W / 2, H / 2), new THREE.Vector2(W / 2, -H / 2)]));
      const sc = new THREE.Mesh(new THREE.ShapeGeometry(sh), std({ color: o.sciana || '#ebe8e3', roughness: .95 })); sc.position.z = .14; sc.receiveShadow = true; gr.add(sc);
      const mO = std({ color: o.sciana || '#e4e1dc', roughness: .95 });
      for (const [w, h, x, y] of [[W, .002, 0, H / 2], [.002, H, -W / 2, 0], [.002, H, W / 2, 0]]) { const s = ust(new THREE.Mesh(new THREE.BoxGeometry(w, h, .22), mO), x, y, .03); s.receiveShadow = true; gr.add(s); }
    }
    if (m > 0) gr.add(ust(klocek(W + .14, .03, .2, std({ color: '#f2f1ee', roughness: .4 }), .008), 0, -H / 2 - .015, .1));
    // widok za oknem: zdjęcie daleko za szybą
    // widok za oknem: zdjęcie za szybą, dokładnie na tyle duże, żeby było go widać tylko przez okno (tło dookoła przezroczyste)
    const S0 = H / (1 - 2 * m), D = S0 / 2 / Math.tan(THREE.MathUtils.degToRad(this.cam.fov / 2)), ZW = 1.4, k = (D + .04 + ZW) / (D + .04);
    const ww = (W - .02) * k, wh = (H - .02) * k, img = Math.max(ww / 1.5, wh);   // zdjęcie 3:2, przycięte do okna
    const pg = new THREE.PlaneGeometry(ww, wh), uv = pg.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, .5 + (uv.getX(i) - .5) * ww / (img * 1.5), .5 + (uv.getY(i) - .5) * wh / img);
    this.widok = ust(new THREE.Mesh(pg, this.widokM), 0, 0, -ZW); gr.add(this.widok);
    // ościeżnica
    gr.add(ust(klocek(W, F, .08, mR), 0, H / 2 - F / 2, 0), ust(klocek(W, F, .08, mR), 0, -H / 2 + F / 2, 0), ust(klocek(F, H, .08, mR), -W / 2 + F / 2, 0, 0), ust(klocek(F, H, .08, mR), W / 2 - F / 2, 0, 0));
    const iW = W - 2 * F, iH = H - 2 * F;
    this.ruchy = []; this.skrz = [];
    (o.pola || [[0, 0, 1, 1]]).forEach(([px, py, pw, ph], i) => {
      const x0 = -iW / 2 + px * iW, y0 = iH / 2 - py * iH, w = pw * iW, h = ph * iH;
      const piv = new THREE.Group(); piv.position.set(x0 + w / 2, y0, .005); gr.add(piv);   // oś u góry (uchylanie okna z napędem)
      const g = new THREE.Group(); g.position.y = -h / 2; piv.add(g);
      g.add(ust(klocek(w, SZ, .07, mR), 0, h / 2 - SZ / 2, 0), ust(klocek(w, SZ, .07, mR), 0, -h / 2 + SZ / 2, 0), ust(klocek(SZ, h, .07, mR), -w / 2 + SZ / 2, 0, 0), ust(klocek(SZ, h, .07, mR), w / 2 - SZ / 2, 0, 0));
      const gw = w - 2 * SZ, gh = h - 2 * SZ;
      const sz = new THREE.Mesh(PLASZ, mSz); sz.scale.set(gw, gh, 1); g.add(sz);
      if (h > .8 && w > .3) g.add(ust(klocek(.024, .14, .03, metal(rama === '#f4f4f2' ? '#f4f4f2' : '#b8b8b8'), .008), (px + pw / 2 <= .5 ? 1 : -1) * (w / 2 - SZ / 2), -.04, .05));
      const typ = o.typy?.[i] || 'pelna';
      this.skrz.push({ piv, typ });
      this.ruchy.push(oslona(g, { gw, gh, typ, kol: o.kolory?.[i] || '#e6dcc8', kas: o.kas }));
    });
    this.cam.position.set(0, 0, .04 + D);
    this.cam.lookAt(0, 0, 0);
    this._poz = null;
  }
  // pozycje 0–100 (100 = osłona zwinięta/otwarta), po jednej na pole
  pozycje(p) {
    const k = JSON.stringify(p); if (k === this._poz) return; this._poz = k;
    this.ruchy.forEach((f, i) => {
      const v = Math.max(0, Math.min(100, +(p[i] ?? p[0] ?? 100))), s = this.skrz[i];
      if (model(s.typ).f === 'okno') { s.piv.rotation.x = (v / 100) * .45; f(0); }
      else { s.piv.rotation.x = 0; f(1 - v / 100); }
    });
    this.rysuj();
  }
  // zdjęcie widoku (adres) i jasność pory dnia (1 dzień … .25 noc)
  widokZ(url) {
    if (url === this._url) return; this._url = url;
    if (!url) { this.widokM.map = null; this.widokM.needsUpdate = true; return this.rysuj(); }
    new THREE.TextureLoader().load(url, t => { if (this._url !== url) return; t.colorSpace = THREE.SRGBColorSpace; this.widokM.map = t; this.widokM.color.set('#ffffff').multiplyScalar(this._jas ?? 1); this.widokM.needsUpdate = true; this.rysuj(); });
  }
  swiatlo(j) {
    if (j === this._jas) return; this._jas = j;
    this.slonce.intensity = 2.3 * Math.max(.25, j); this.nieboL.intensity = .55 * Math.max(.4, j);
    if (this.widokM.map) this.widokM.color.set('#ffffff').multiplyScalar(j); else this.widokM.color.set('#cfe0ea').multiplyScalar(j);
    this.rysuj();
  }
  prostokaty() { const o = this.opt; return polaNaObrazku(o.pola || [[0, 0, 1, 1]], o.W, o.H, o.margines || 0); }
  rysuj() {
    if (this._raf) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = null;
      const w = this.host.clientWidth, h = this.host.clientHeight; if (!w || !h || !this.grupa) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      this._klatka(Math.round(w * dpr), Math.round(h * dpr));
      dokladnie(this);
    });
  }
  _klatka(W, H) {
    const { r } = gl();
    r.setPixelRatio(1); r.setSize(W, H, false);
    this.cam.aspect = W / H; this.cam.updateProjectionMatrix();
    r.render(this.scena, this.cam);
    if (this.cv.width !== W || this.cv.height !== H) { this.cv.width = W; this.cv.height = H; }
    this.ctx.clearRect(0, 0, W, H); this.ctx.drawImage(r.domElement, 0, 0);
  }
  // nowy element strony (kreator rysuje krok od nowa): ten sam obraz, bez budowania okna od zera
  przenies(host) {
    if (host === this.host) return; this._ro.disconnect(); this.host = host; host.prepend(this.cv); this._ro.observe(host); this.rysuj();
  }
  zniszcz() { this._ro.disconnect(); cancelAnimationFrame(this._raf); this.cv.remove(); if (PT.okno === this) PT.okno = null; }
}

// obrazek kafelka (lista rodzajów w kreatorze): jedno okno z osłoną w wybranych kolorach → data: URL, raz na rodzaj i kolor
const KAFLE = new Map();
let kafelOkno = null;
export function kafel(typ, kolor, rama, widok, w = 240, h = 200) {
  const k = [typ, kolor, rama].join('|');
  if (KAFLE.has(k)) return KAFLE.get(k);
  const f = model(typ).f, poz = f === 'okno' ? 80 : ['pion', 'zas', 'okien'].includes(f) ? 45 : f === 'mark' ? 30 : 30;
  kafelOkno ||= new Okno3D(document.createElement('div'), null);
  kafelOkno.ustaw({ pola: [[0, 0, 1, 1]], typy: [typ], kolory: [kolor], rama, W: 1.32, H: 1.1, margines: .07, pozycje: [poz] });
  if (widok && !kafelOkno.widokM.map && performance.now() - startKafli < 4000) return null;   // najpierw zdjęcie widoku (widokZ), potem kafelki
  kafelOkno._klatka(w * 2, h * 2);
  const url = kafelOkno.cv.toDataURL('image/webp', .9); KAFLE.set(k, url); return url;
}
let startKafli = 0;
export function widokKafli(url) { if (!startKafli) startKafli = performance.now(); kafelOkno ||= new Okno3D(document.createElement('div'), null); kafelOkno.widokZ(url); }

// ---------- obraz dokładny: światło liczone fizycznie (path tracing, jak Blender Cycles) ----------
// Po każdej zmianie karta od razu pokazuje zwykły obraz 3D, a gdy okno stoi (0,4 s), liczy w tle obraz dokładny:
// odbicia, miękkie cienie, światło odbite od ściany i osłon. Liczy się jedno okno naraz, aż obraz będzie gładki.
// Telefon, który nie da rady (brak WebGL2, błąd albo za wolno), zostaje przy zwykłym obrazie 3D.
const PT = { pt: null, okno: null, kolejka: [], wyl: false, t: 0, start: 0, raf: 0, gotowe: new WeakSet() };
const CEL = 40, OPOZNIENIE = 400;
try { PT.wyl = localStorage.getItem('motor_ha_dokladny') === '0'; } catch (e) { /* bez pamięci przeglądarki */ }
// three-gpu-pathtracer czyta obrót nieba ze sceny (pola nowszego three.js, w 0.160 ich nie ma)
for (const k of ['environmentRotation', 'backgroundRotation']) if (!(k in THREE.Scene.prototype) && !(k in new THREE.Scene())) THREE.Scene.prototype[k] = new THREE.Euler();
let NIEBO = null;
const niebo = () => { if (NIEBO) return NIEBO; NIEBO = new GradientEquirectTexture(); NIEBO.topColor.set('#dfe9f3'); NIEBO.bottomColor.set('#8f8a82'); NIEBO.update(); return NIEBO; };
function dokladnie(okno) {
  if (PT.wyl || !okno.host.isConnected || okno === kafelOkno) return;
  PT.gotowe.delete(okno);
  if (PT.okno === okno) PT.okno = null;
  clearTimeout(okno._ptT);
  okno._ptT = setTimeout(() => { if (!PT.kolejka.includes(okno)) PT.kolejka.push(okno); dalej(); }, OPOZNIENIE);
}
function dalej() {
  if (PT.okno || PT.raf) return;
  while (PT.kolejka.length && !PT.kolejka[0].host.isConnected) PT.kolejka.shift();
  const okno = PT.kolejka.shift(); if (!okno) return;
  if (!przygotuj(okno)) return;
  PT.okno = okno; PT.start = performance.now(); PT.raf = requestAnimationFrame(krok);
}
// three-gpu-pathtracer nie zna InstancedMesh, HemisphereLight i MeshBasicMaterial: na czas wczytania sceny
// lamele zamieniają się w zwykłą siatkę, a zdjęcie widoku w świecący materiał
function przygotuj(okno) {
  const { r } = gl();
  try {
    if (!r.capabilities.isWebGL2) throw new Error('brak WebGL2');
    PT.pt ||= Object.assign(new WebGLPathTracer(r), { renderDelay: 0, minSamples: 1, fadeDuration: 0, rasterizeScene: false, dynamicLowRes: false });
    PT.pt.tiles.set(2, 2); PT.pt.bounces = 5; PT.pt.filterGlossyFactor = .5;
    const sc = okno.scena, zmiany = [], dodane = [];
    sc.updateMatrixWorld(true);
    sc.traverse(o => {
      if (o.isInstancedMesh && o.visible) {
        const geos = [], m = new THREE.Matrix4();
        for (let i = 0; i < o.count; i++) { o.getMatrixAt(i, m); if (Math.abs(m.determinant()) < 1e-12) continue; const g = o.geometry.clone(); g.applyMatrix4(m); geos.push(g.index ? g.toNonIndexed() : g); }
        if (geos.length) { const z = new THREE.Mesh(mergeGeometries(geos), o.material); o.parent.add(z); z.position.copy(o.position); z.quaternion.copy(o.quaternion); z.scale.copy(o.scale); dodane.push(z); }
        zmiany.push(() => { o.visible = true; }); o.visible = false;
      } else if (o.isMesh && o.material?.isMeshBasicMaterial) {
        const b = o.material; o.material = new THREE.MeshStandardMaterial({ color: '#000', emissive: b.color, emissiveMap: b.map, emissiveIntensity: 1.1 });
        zmiany.push(() => { o.material.dispose(); o.material = b; });
      } else if (o.isHemisphereLight) { zmiany.push(() => { o.visible = true; }); o.visible = false; }
    });
    const env = sc.environment; sc.environment = niebo(); sc.environmentIntensity = .9;
    const W = okno.cv.width, H = okno.cv.height; if (!W || !H) return false; r.setSize(W, H, false); okno.cam.aspect = W / H; okno.cam.updateProjectionMatrix();
    PT.pt.setScene(sc, okno.cam);
    sc.environment = env; sc.environmentIntensity = 1;
    dodane.forEach(z => { z.parent.remove(z); z.geometry.dispose(); }); zmiany.forEach(f => f());
    PT.rozmiar = [W, H];
    return true;
  } catch (e) { wylacz(e); return false; }
}
function krok() {
  PT.raf = 0;
  const okno = PT.okno; if (!okno) return dalej();
  if (!okno.host.isConnected) { PT.okno = null; return dalej(); }
  const { r } = gl(), [W, H] = PT.rozmiar;
  try {
    if (r.domElement.width !== W || r.domElement.height !== H) { r.setSize(W, H, false); PT.pt.reset(); }
    PT.pt.renderSample();
  } catch (e) { return wylacz(e); }
  const n = PT.pt.samples, czas = performance.now() - PT.start;
  if (n < 2 && czas > 8000) return wylacz(new Error('za wolno'));   // słaby telefon: zostaje zwykły obraz 3D
  if (n >= 4 && Number.isInteger(n) && okno.cv.width === W && okno.cv.height === H) { okno.ctx.clearRect(0, 0, W, H); okno.ctx.drawImage(r.domElement, 0, 0); }
  if (n >= CEL) { PT.gotowe.add(okno); PT.okno = null; return dalej(); }
  PT.raf = requestAnimationFrame(krok);
}
function wylacz(e) {
  console.warn('Motor HA: obraz dokładny wyłączony, zostaje zwykłe 3D –', e?.message || e, e?.stack);
  PT.wyl = true; PT.okno = null; PT.kolejka.length = 0;
}
export const dokladny = () => !PT.wyl;
