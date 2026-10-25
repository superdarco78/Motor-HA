// Przepisy okna z klocków (klocki.js): z czego złożyć każdy rodzaj i skąd na niego patrzeć.
// Osobny plik, bo karta i kreator liczą z nich margines wokół okna (okno3d_uklad.js), a same klocki wczytują się dopiero przy rysowaniu.
// ---------- rodzaje: przepisy ----------
// v: widok ('wew' od pokoju, 'zew' od ulicy, 'dach' okno dachowe od środka); f: rodzina rysowania
const P = (v, f, o = {}) => ({ v, f, ...o });
export const PRZEPISY = {
  pelna: P('wew', 'rol', { gora: 'rol_rura', tk: 'kas_tkanina', dol: 'kas_listwa', przesw: 1 }),
  kasetowa: P('wew', 'rol', { gora: 'kas_kaseta', tk: 'kas_tkanina', prow: 'kas_prowadnica', dol: 'kas_listwa', przesw: 1 }),
  zebra: P('wew', 'rol', { gora: 'kas_kaseta', tk: 'kas_tkanina', dol: 'rol_listwa', zebra: 1 }),
  zaciemniajaca: P('wew', 'rol', { gora: 'kas_kaseta', tk: 'rol_blackout', prow: 'rol_prow_u', dol: 'kas_listwa' }),
  roleta_zip_wew: P('wew', 'rol', { gora: 'rol_kwadrat', tk: 'kas_tkanina', prow: 'rol_prow_zip', dol: 'rol_listwa_ciezka', przesw: 1 }),
  bambusowa: P('wew', 'rol', { gora: 'rol_belka', tk: 'rol_bambus', dol: 'rol_belka', drewno: 1 }),
  ekran: P('wew', 'rol', { gora: 'kas_kaseta', tk: 'kas_tkanina', dol: 'rol_listwa', ekran: 1 }),
  plisa: P('wew', 'har', { tk: 'plisa' }), plisa_gora_dol: P('wew', 'har', { tk: 'plisa', gd: 1 }), plaster: P('wew', 'har', { tk: 'plaster' }),
  rzymska: P('wew', 'rzym'),
  zaluzja: P('wew', 'lam', { tk: 'zal25', pak: 'zal25_pak', szyna: 'zal_szyna' }), drewniana: P('wew', 'lam', { tk: 'zal50', pak: 'zal50_pak', szyna: 'zal_szyna' }),
  pionowa: P('wew', 'pion'), panel: P('wew', 'pion', { panel: 1 }),
  zaslona: P('wew', 'zas', { tk: 'zas_tk' }), zaslona_wave: P('wew', 'zas', { tk: 'zas_wave' }), firana: P('wew', 'zas', { tk: 'zas_tk', firana: 1 }),
  natynkowa: P('zew', 'rolz', { skrz: 'nat' }), natynkowa_okragla: P('zew', 'rolz', { skrz: 'okr' }), podtynkowa: P('zew', 'rolz', { skrz: 'pod' }),
  zewnetrzna: P('zew', 'rolz', { skrz: 'nad' }), adaptacyjna: P('zew', 'rolz', { skrz: 'adapt' }), perforowana: P('zew', 'rolz', { skrz: 'nat', perf: 1 }),
  roleta_moskitiera: P('zew', 'rolz', { skrz: 'nat', siatka: 1 }), ekstrudowana: P('zew', 'rolz', { skrz: 'nat', pan: 'pancerz_ext' }),
  roleta_drzwi: P('zew', 'rolz', { skrz: 'nat', pan: 'pancerz_ext', drzwi: 1 }),
  fasadowa: P('zew', 'fas', { tk: 'c80', pak: 'c80_pak' }), fasadowaz: P('zew', 'fas', { tk: 'z90', pak: 'z90_pak' }), fasadowa_f80: P('zew', 'fas', { tk: 'f80', pak: 'c80_pak' }),
  screen: P('zew', 'scr', { prow: 'rol_prow_zip' }), markizoleta: P('zew', 'scr', { wysieg: 1 }), screen_taras: P('zew', 'scr', { prow: 'rol_prow_zip', drzwi: 1 }),
  markiza_pionowa: P('zew', 'scr', { prow: 'fas_prowadnica', mark: 1 }),
  okiennice: P('zew', 'okien'), okiennice_przesuwne: P('zew', 'okien', { przesuw: 1 }),
  dach_dkl: P('dach', 'rol', { gora: 'rol_kaseta_dach', tk: 'rol_blackout', prow: 'rol_prow_dach', dol: 'rol_listwa_dach' }),
  dach_fhb: P('dach', 'rzym', { prow: 'rol_prow_dach' }),
  dach_dn: P('dach', 'rol', { gora: 'rol_kaseta_dach', tk: 'kas_tkanina', prow: 'rol_prow_dach', dol: 'rol_listwa_dach', zebra: 1 }),
  dach_pal: P('dach', 'lam', { tk: 'zal25', pak: 'zal25_pak', szyna: 'rol_kaseta_dach', prow: 'rol_prow_dach', dolL: 'rol_listwa_dach' }),
  dach_fhl: P('dach', 'har', { tk: 'plisa', prow: 'rol_prow_dach', dolL: 'rol_listwa_dach' }),
  dach_ssl: P('dach', 'zaSzyba', { pan: 'nat_pancerz' }), dachowa: P('dach', 'zaSzyba', { pan: 'pancerz_ext' }),
  dach_msl: P('dach', 'zaSzyba', { tk: 'rol_screen' }), markizeta_dach: P('dach', 'zaSzyba', { tk: 'rol_screen', haki: 1 }),
  markiza_otwarta: P('zew', 'mark', { gora: 'mark_rura' }), markiza: P('zew', 'mark', { gora: 'mark_rura', daszek: 1 }), markiza_polkasetowa: P('zew', 'mark', { gora: 'mark_kaseta', polk: 1 }),
  markiza_kasetowa: P('zew', 'mark', { gora: 'mark_kaseta' }), markiza_volant: P('zew', 'mark', { gora: 'mark_rura', volant: 1 }),
  markiza_koszowa: P('zew', 'kosz'), markiza_wolnostojaca: P('zew', 'mark', { gora: 'mark_rura', slupy: 1 }), markiza_zimowa: P('zew', 'mark', { gora: 'mark_kaseta', ogrod: 1 }),
  markizeta: P('zew', 'mark', { gora: 'mark_kaseta', markizeta: 1 }), markiza_balkonowa: P('zew', 'mark', { gora: 'mark_rura', slupy: 2 }),
  markiza_boczna: P('zew', 'bok'), zagiel: P('zew', 'zagiel'), parasol: P('zew', 'parasol'),
  pergola: P('zew', 'pergola', { lam: 1 }), pergola_tkanina: P('zew', 'pergola'), zadaszenie: P('zew', 'zadaszenie'),
  okno_silownik: P('wew', 'okno'), okno_dachowe: P('dach', 'okno', { srodek: 1 }), okno_plaskie: P('sufit', 'okno', { sufit: 1 }), swietlik: P('sufit', 'okno', { sufit: 1, kopula: 1 }),
  wylaz: P('sufit', 'okno', { sufit: 1, bok: 1 }),
  moskitiera: P('zew', 'scr', { siatka: 1, prow: 'kas_prowadnica', gora: 'kas_kaseta' }), moskitiera_plisa_okno: P('zew', 'mplisa'),
  moskitiera_drzwi: P('zew', 'mplisa', { bok: 1, drzwi: 1 }), moskitiera_zip_drzwi: P('zew', 'scr', { siatka: 1, prow: 'rol_prow_zip', gora: 'rol_kwadrat', drzwi: 1 })
};
export const przepis = t => PRZEPISY[t] || PRZEPISY.pelna;
// ile miejsca (m) wokół okna zajmuje osłona: [góra, bok, dół]
const MIEJSCE = { rolz: [.29, .06, .04], fas: [.19, .06, .03], scr: [.24, .06, .03], mplisa: [.08, .04, .03], zas: [.26, .36, .34], pion: [.12, .12, .2],
  mark: [.62, .2, .05], kosz: [.5, .25, .05], bok: [.32, .58, .3], zagiel: [.55, .4, .05], parasol: [.5, .35, .05], pergola: [.58, .28, .05], zadaszenie: [.3, .22, .05] };
export function miejsce(typ, W) {
  const p = przepis(typ);
  if (p.f === 'okien') return [.1, W / 2 + .05, .04];
  const m = MIEJSCE[p.f] || [0, 0, 0];
  return p.slupy ? [m[0], .3, m[2]] : m;
}
