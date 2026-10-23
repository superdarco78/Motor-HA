// Motor HA 2 – stałe karty: rodzaje osłon, kolory tkanin, kolory ram, ustawienia domyślne.
// Klucze (nazwy rodzajów, kolorów i ustawień) są takie same jak w wersjach 1.x, żeby zapisane okna działały dalej.

export const WERSJA = '2.1.7';

// Rodzaje osłon w grupach: wewnątrz (widok z pokoju) i na zewnątrz (widok z elewacji).
export const GRUPY = {
  wew: {
    rolety: ['pelna', 'kasetowa', 'zebra', 'zaciemniajaca'],
    plisy: ['plisa', 'plaster', 'rzymska'],
    zaluzje: ['zaluzja', 'drewniana'],
    pionowe: ['pionowa', 'zaslona']
  },
  zew: {
    zrolety: ['natynkowa', 'podtynkowa', 'zewnetrzna', 'perforowana'],
    fasadowe: ['fasadowa', 'fasadowaz'],
    taras: ['markiza', 'screen']
  },
  brama: {
    bramy: ['przesuwna', 'skrzydlowa'],
    garaze: ['segmentowa', 'uchylna', 'roletowa']
  }
};
export const OSLONY = Object.values(GRUPY).flatMap(g => Object.values(g).flat());
export const BRAMY = Object.values(GRUPY.brama).flat();
export const czyBrama = t => BRAMY.includes(t);
// osłony, które zasuwają się w bok (żaluzja pionowa, zasłona), a nie w dół
export const POZIOME = ['pionowa', 'zaslona'];
export const ZEWNETRZNE = Object.values(GRUPY.zew).flat();
export const czyZew = t => ZEWNETRZNE.includes(t);

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
// ikona otwartego urządzenia (bramy i garaże zmieniają ikonę jak w HA)
export const IKONY_OTW = { przesuwna: 'mdi:gate-open', skrzydlowa: 'mdi:gate-open', segmentowa: 'mdi:garage-open', uchylna: 'mdi:garage-open',
  roletowa: 'mdi:garage-open', pionowa: 'mdi:blinds-vertical', zaslona: 'mdi:curtains' };
export const IKONY_GRUP = { wew: 'mdi:sofa-outline', zew: 'mdi:home-outline', rolety: 'mdi:roller-shade', plisy: 'mdi:blinds',
  zaluzje: 'mdi:blinds-horizontal', pionowe: 'mdi:blinds-vertical', brama: 'mdi:gate', bramy: 'mdi:gate', garaze: 'mdi:garage', zrolety: 'mdi:window-shutter', fasadowe: 'mdi:blinds-horizontal-closed', taras: 'mdi:awning-outline' };

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
