// Motor HA 2 – stałe karty: rodzaje osłon, kolory tkanin, kolory ram, ustawienia domyślne.
// Klucze (nazwy rodzajów, kolorów i ustawień) są takie same jak w wersjach 1.x, żeby zapisane okna działały dalej.

import { GRUPY_KAFLI } from './kafle.js';

export const WERSJA = '2.2.20';

// Rodzaje osłon w grupach jak w katalogach producentów (te same grupy i obrazki co w kreatorze, kafle.js).
export const GRUPY = Object.fromEntries(GRUPY_KAFLI.map(([g, pod]) => [g, Object.fromEntries(pod)]));
export const OSLONY = Object.values(GRUPY).flatMap(g => Object.values(g).flat());
export const BRAMY = Object.values(GRUPY.brama).flat();
export const czyBrama = t => BRAMY.includes(t);
export const GARAZE = [...GRUPY.brama.garaze];
// rodzaje z 2.2.7 rysowane i animowane w karcie jak najbliższy rodzaj bazowy (osobne animacje w następnej wersji)
export const BAZA = { roleta_zip_wew: 'kasetowa', bambusowa: 'pelna', plisa_gora_dol: 'plisa', zaslona_wave: 'zaslona', firana: 'zaslona', panel: 'pionowa', ekran: 'pelna', dach_dkl: 'zaciemniajaca', dach_ssl: 'natynkowa', dachowa: 'natynkowa', dach_fhb: 'rzymska', dach_msl: 'screen', markizeta_dach: 'screen', dach_pal: 'zaluzja', dach_fhl: 'plisa', dach_dn: 'zebra', natynkowa_okragla: 'natynkowa', adaptacyjna: 'zewnetrzna', roleta_moskitiera: 'natynkowa', ekstrudowana: 'natynkowa', roleta_drzwi: 'natynkowa', fasadowa_f80: 'fasadowaz', markizoleta: 'screen', okiennice: 'zewnetrzna', okiennice_przesuwne: 'zewnetrzna', markiza_otwarta: 'markiza', markiza_polkasetowa: 'markiza', markiza_kasetowa: 'markiza', markiza_volant: 'markiza', markiza_koszowa: 'markiza', markiza_wolnostojaca: 'markiza', markiza_zimowa: 'markiza', markizeta: 'markiza', markiza_balkonowa: 'markiza', markiza_pionowa: 'markiza', markiza_boczna: 'markiza', zagiel: 'markiza', parasol: 'markiza', pergola: 'fasadowaz', pergola_tkanina: 'markiza', zadaszenie: 'markiza', screen_taras: 'screen', okno_silownik: 'screen', okno_dachowe: 'screen', okno_plaskie: 'screen', swietlik: 'screen', wylaz: 'screen', moskitiera: 'screen', moskitiera_plisa_okno: 'screen', moskitiera_drzwi: 'screen', moskitiera_zip_drzwi: 'screen', furtka: 'skrzydlowa', garaz_boczna: 'segmentowa', garaz_skrzydlowa: 'uchylna', szlaban: 'przesuwna' };
export const baza = t => BAZA[t] || t;
// rodzaje z własnym rysunkiem i ruchem w karcie (kafle_ruch.js): tarasy, okna i nowe bramy – bez rysowania okna
const Z_SCENA = new Set(['taras', 'okna'].flatMap(g => Object.values(GRUPY[g]).flat()));
// okna z napędem nie mają osłony – w kreatorze tylko kolor ramy
export const OKNA_NAPED = Object.values(GRUPY.okna).flat();
export const wlasnyRuch = t => !!t && t !== baza(t) && (Z_SCENA.has(t) || czyBrama(t));
// osłony, które zasuwają się w bok (żaluzja pionowa, zasłona), a nie w dół
export const POZIOME = ['pionowa', 'zaslona'];
// kolor ściany (muru) między oknami
export const SCIANY = { biala: '#efebe4', bezowa: '#d6c4a6', szara: '#a5a4a0', cegla: '#a65a3a', grafit: '#56595c' };
export const ZEWNETRZNE = ['natynkowa', 'podtynkowa', 'zewnetrzna', 'perforowana', 'fasadowa', 'fasadowaz', 'markiza', 'screen',
  'dach_ssl', 'dachowa', 'dach_msl', 'markizeta_dach', 'natynkowa_okragla', 'adaptacyjna', 'roleta_moskitiera', 'ekstrudowana', 'roleta_drzwi', 'fasadowa_f80', 'markizoleta', 'okiennice', 'okiennice_przesuwne', 'markiza_otwarta', 'markiza_polkasetowa', 'markiza_kasetowa', 'markiza_volant', 'markiza_koszowa', 'markiza_wolnostojaca', 'markiza_zimowa', 'markizeta', 'markiza_balkonowa', 'markiza_pionowa', 'markiza_boczna', 'zagiel', 'parasol', 'pergola', 'pergola_tkanina', 'zadaszenie', 'screen_taras', 'okno_silownik', 'okno_dachowe', 'okno_plaskie', 'swietlik', 'wylaz', 'moskitiera', 'moskitiera_plisa_okno', 'moskitiera_drzwi', 'moskitiera_zip_drzwi'];
export const czyZew = t => ZEWNETRZNE.includes(t);
export const WEWNETRZNE = OSLONY.filter(t => !czyBrama(t) && !czyZew(t));

export const IKONY = {
  pelna: 'mdi:roller-shade', kasetowa: 'mdi:roller-shade', zebra: 'mdi:roller-shade', zaciemniajaca: 'mdi:roller-shade-closed',
  plisa: 'mdi:blinds', plaster: 'mdi:blinds', rzymska: 'mdi:curtains',
  zaluzja: 'mdi:blinds-horizontal', drewniana: 'mdi:blinds-horizontal',
  natynkowa: 'mdi:window-shutter', podtynkowa: 'mdi:window-shutter', zewnetrzna: 'mdi:window-shutter', perforowana: 'mdi:window-shutter-open',
  fasadowa: 'mdi:blinds-horizontal-closed', fasadowaz: 'mdi:blinds-horizontal-closed',
  markiza: 'mdi:awning-outline', screen: 'mdi:roller-shade',
  pionowa: 'mdi:blinds-vertical', zaslona: 'mdi:curtains',
  przesuwna: 'mdi:gate', skrzydlowa: 'mdi:gate', segmentowa: 'mdi:garage', uchylna: 'mdi:garage', roletowa: 'mdi:garage'
};
for (const [t, b] of Object.entries(BAZA)) IKONY[t] ||= IKONY[b];
Object.assign(IKONY, { okno_silownik: 'mdi:window-open-variant', okno_dachowe: 'mdi:window-open-variant', okno_plaskie: 'mdi:window-open-variant',
  swietlik: 'mdi:dome-light', wylaz: 'mdi:window-open-variant', parasol: 'mdi:umbrella-outline', szlaban: 'mdi:boom-gate', furtka: 'mdi:gate',
  pergola: 'mdi:blinds-horizontal', ekran: 'mdi:projector-screen-outline', okiennice: 'mdi:window-shutter', okiennice_przesuwne: 'mdi:window-shutter' });
// ikona otwartego urządzenia (bramy i garaże zmieniają ikonę jak w HA)
export const IKONY_OTW = { przesuwna: 'mdi:gate-open', skrzydlowa: 'mdi:gate-open', segmentowa: 'mdi:garage-open', uchylna: 'mdi:garage-open',
  roletowa: 'mdi:garage-open', pionowa: 'mdi:blinds-vertical', zaslona: 'mdi:curtains' };
export const IKONY_GRUP = { wew: 'mdi:sofa-outline', zew: 'mdi:home-outline', rolety: 'mdi:roller-shade', plisy: 'mdi:blinds',
  zaluzje: 'mdi:blinds-horizontal', pionowe: 'mdi:blinds-vertical', brama: 'mdi:gate', bramy: 'mdi:gate', garaze: 'mdi:garage', zrolety: 'mdi:window-shutter', fasadowe: 'mdi:blinds-horizontal-closed', taras: 'mdi:awning-outline',
  dach: 'mdi:home-roof', dachowe: 'mdi:home-roof', markizy: 'mdi:awning-outline', pergole: 'mdi:greenhouse', okna: 'mdi:window-open-variant', moskitiery: 'mdi:grid',
  zscreen: 'mdi:roller-shade', okiennice: 'mdi:window-shutter', ekrany: 'mdi:projector-screen-outline', szlabany: 'mdi:boom-gate' };

// Kolory tkanin i pancerzy (klucz → kolor).
export const KOLORY = {
  czarny: '#232427', grafit: '#3a3d42', szary: '#6d7076', popiel: '#a9aaa6', srebrny: '#c4c6c8', bialy: '#efefec', kremowy: '#e6dcc8',
  piaskowy: '#d9c7a4', bezowy: '#bfae94', cappuccino: '#a88c72', mokka: '#6f5544', braz: '#5a4030', wenge: '#3d2f28',
  stalowy: '#4f5a66', granat: '#25324d', blekitny: '#9cc6e6', niebieski: '#1e6ff2', morski: '#1d6f7a', turkus: '#00b3b3',
  mietowy: '#a9dcc6', zielony: '#22a447', butelkowy: '#1f4d3a', oliwka: '#6b7a3a', limonka: '#9bd426', zolty: '#ffd000',
  musztardowy: '#c99a1a', pomaranczowy: '#fc9907', terakota: '#b9583a', czerwony: '#e02424', bordo: '#7a1f2b',
  pudrowy: '#e4b9b9', rozowy: '#ff4f9a', lawendowy: '#b9a8d6', fiolet: '#8a3ffc', sliwkowy: '#5b2c4a'
};

// Kolory i okleiny ram okien PCV (kolor → [klucz, okleina drewnopodobna]).
export const RAMY = {
  '#f4f4f2': ['biala'], '#d8d2c6': ['kremowa'], '#c9cbcc': ['jasnoszara'], '#b9bdc1': ['srebrna'], '#a3a6a8': ['szary_agat'],
  '#6e7378': ['szara'], '#6d6c66': ['szary_kwarc'], '#4a4d50': ['bazaltowa'], '#3b3f45': ['antracyt'], '#1f2124': ['czarna'],
  '#28402f': ['zielona'], '#2b3a55': ['granatowa'], '#5d1f23': ['bordowa'], '#6b4a32': ['braz'],
  '#c49a5c': ['sosna', 1], '#b39370': ['dab_jasny', 1], '#9d8064': ['dab_sheffield', 1], '#a26a43': ['winchester', 1],
  '#9b6a3c': ['oregon', 1], '#8a5a3b': ['zloty_dab', 1], '#6d4a33': ['siena', 1], '#5a3a26': ['orzech', 1],
  '#6a2e22': ['mahon', 1], '#3e3830': ['dab_bagienny', 1]
};
export const RAMA_Z_KLUCZA = Object.fromEntries(Object.entries(RAMY).map(([hex, [k]]) => [k, hex]));

// Ustawienia domyślne karty.
export const DOMYSLNE = {
  oslona: 'zebra', kolor: 'czarny', rama: '#f4f4f2', skrzydla: 2, wysokosc: 260,
  czas: 'auto', pogoda: 'auto', niebo: true, widok: true,
  czujnik_lewe: '', czujnik_prawe: '', tryb_lewe: 'uchyl', tryb_prawe: 'uchyl', auto_czujniki: true,
  roleta_lewa: '', roleta_prawa: '', predkosc_lewa: '', predkosc_prawa: '',
  przyciski: true, suwak: true, pozycje: '', odwroc: false, osobno: false, wibracja: true, jezyk: 'auto'
};

// Kolor: klucz z KOLORY albo #rrggbb.
export const hex = k => KOLORY[k] || (/^#[0-9a-f]{3,8}$/i.test(String(k || '')) ? k : KOLORY.czarny);
export const ramaHex = r => RAMA_Z_KLUCZA[r] || (/^#[0-9a-f]{3,8}$/i.test(String(r || '')) ? String(r).toLowerCase() : '#f4f4f2');
export const czyDrewno = r => !!RAMY[ramaHex(r)]?.[1];
