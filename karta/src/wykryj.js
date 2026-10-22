// Samo-wykrywanie: prędkość silnika, czujniki okna z tego samego pomieszczenia, encja pogody, pogoda z internetu.

const obszar = (h, id) => { const e = h?.entities?.[id]; return e?.area_id || h?.devices?.[e?.device_id]?.area_id || null; };
const nazwa = (h, id) => `${id} ${h?.states?.[id]?.attributes?.friendly_name || ''}`.toLowerCase();
const PREDKOSC = /speed|predkos|prędkoś|rpm|obrot/i;

// encja prędkości silnika (obr/min): wybrana, z tego samego urządzenia albo number.<nazwa>_motor_speed
export function encjaPredkosci(h, roleta, wybrana) {
  if (wybrana) return wybrana;
  const dev = h?.entities?.[roleta]?.device_id;
  if (dev) {
    const z = Object.keys(h.entities).find(k => k.startsWith('number.') && h.entities[k].device_id === dev && PREDKOSC.test(k));
    if (z) return z;
  }
  const g = String(roleta).replace('cover.', 'number.') + '_motor_speed';
  return h?.states?.[g] ? g : null;
}
export const obroty = (h, roleta, wybrana) => parseFloat(h?.states?.[encjaPredkosci(h, roleta, wybrana)]?.state) || 0;

// czujniki okna (lewe, prawe) z pomieszczenia osłony
export function czujnikiOkna(h, roleta) {
  const a = obszar(h, roleta);
  if (!a || !h?.entities) return [];
  const lista = Object.keys(h.entities).filter(k => k.startsWith('binary_sensor.') && obszar(h, k) === a &&
    ['window', 'door', 'opening'].includes(h.states[k]?.attributes?.device_class)).sort();
  const l = lista.find(k => /lew|left/.test(nazwa(h, k))), p = lista.find(k => /praw|right/.test(nazwa(h, k)));
  if (l || p) return [l || lista.find(k => k !== p), p || lista.find(k => k !== l)];
  return lista.slice(0, 2);
}

export function encjaPogody(h, wybrana) {
  if (wybrana && wybrana !== 'auto') return wybrana;
  const s = h?.states || {};
  return ['weather.forecast_home', 'weather.home', 'weather.dom'].find(k => s[k]) || Object.keys(s).find(k => k.startsWith('weather.')) || null;
}

// pogoda z internetu (Open-Meteo) dla lokalizacji domu, gdy w HA nie ma encji pogody – jedna kopia na stronę, co 15 min
const NET = { t: 0, dane: null, trwa: false, czeka: new Set() };
const zWmo = (k, dzien, wiatr) => {
  const s = k === 0 ? (dzien ? 'sunny' : 'clear-night') : k <= 2 ? 'partlycloudy' : k === 3 ? 'cloudy' : k <= 48 ? 'fog'
    : k <= 63 || k === 80 || k === 81 ? 'rainy' : k === 65 || k === 82 ? 'pouring' : k <= 67 ? 'snowy-rainy'
    : k <= 77 || k === 85 || k === 86 ? 'snowy' : k === 95 ? 'lightning-rainy' : k >= 96 ? 'hail' : 'cloudy';
  return wiatr > 40 && ['sunny', 'partlycloudy', 'cloudy'].includes(s) ? 'windy' : s;
};
export function pogodaZInternetu(h, gotowe) {
  const lat = h?.config?.latitude, lon = h?.config?.longitude;
  if (lat == null || lon == null) return null;
  if (Date.now() - NET.t < 15 * 60000) return NET.dane;
  NET.czeka.add(gotowe);
  if (!NET.trwa) {
    NET.trwa = true;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,is_day,wind_speed_10m`)
      .then(r => r.json()).then(j => {
        const c = j.current;
        NET.dane = { state: zWmo(c.weather_code, c.is_day, c.wind_speed_10m), attributes: { temperature: c.temperature_2m, temperature_unit: '°C' } };
      }).catch(() => {}).finally(() => { NET.t = Date.now(); NET.trwa = false; NET.czeka.forEach(f => f()); NET.czeka.clear(); });
  }
  return NET.dane;
}

// najlepsze osłony do kreatora: najpierw okna z integracji, potem grupy (2 skrzydła), potem rolety z pozycją
export function oslonyDoWyboru(h) {
  const s = h?.states || {};
  const pkt = id => (s[id].attributes?.okno_ha ? 100 : 0) + ((s[id].attributes?.entity_id || []).length > 1 ? 40 : 0) + (s[id].attributes?.supported_features & 4 ? 10 : 0);
  return Object.keys(s).filter(k => k.startsWith('cover.') && !['garage', 'gate', 'door', 'damper'].includes(s[k].attributes?.device_class))
    .sort((a, b) => pkt(b) - pkt(a) || a.localeCompare(b));
}
