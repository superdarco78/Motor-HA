// Ruch osłony na ekranie w tempie prawdziwego silnika.
// Silniki często meldują pozycję dopiero po dojechaniu albo podają w trakcie stare 0/100 –
// dlatego po komendzie karta jedzie sama i przyjmuje meldunek dopiero, gdy jest wiarygodny.

const PAMIEC = 'motor-ha-czas:';

// czas pełnego przejazdu (s): ustawiony ręcznie, z prędkości silnika (obr/min) albo nauczony z prawdziwych ruchów
export function czasPrzejazdu(ustawiony, obroty, encja) {
  if (+ustawiony > 0) return Math.max(3, +ustawiony);
  if (obroty > 0) return 20.2 + 394 / obroty;   // silniki rurowe Moes/Tuya: zmierzony związek prędkości i czasu
  const n = nauczony(encja);
  return n > 0 ? n : 30;
}
export function nauczony(encja) { try { return +localStorage.getItem(PAMIEC + encja) || 0; } catch (e) { return 0; } }
function zapamietaj(encja, s) { try { localStorage.setItem(PAMIEC + encja, s.toFixed(1)); } catch (e) { /* bez pamięci przeglądarki */ } }

export class Ruch {
  constructor(encja) {
    this.encja = encja;
    this.widac = null;   // pozycja na ekranie (0 = zamknięta, 100 = otwarta)
    this.cel = null;
    this.czas = 30;
    this.komenda = null; // { cel, od, do } – do = kiedy silnik powinien dojechać
    this.dociagnij = false;
    this.nauka = null;
    this.stan = null;
  }

  get jedzie() { return this.widac !== null && this.cel !== null && Math.abs(this.cel - this.widac) > 0.3; }

  // użytkownik wydał polecenie (null = stop)
  polecenie(cel, teraz) {
    if (this.widac === null) return;
    if (cel === null) { this.cel = this.widac; this.komenda = { cel: Math.round(this.widac), od: teraz, do: teraz + 2500, stop: true }; return; }
    const trwa = Math.abs(cel - this.widac) / 100 * this.czas * 1000;
    this.cel = cel; this.dociagnij = false;
    this.komenda = { cel, od: teraz, do: teraz + trwa + 3000, koniec: teraz + trwa * 2 + 10000 };
  }

  // nowy stan encji osłony z Home Assistanta
  meldunek(st, teraz, odwroc) {
    if (!st) return;
    let p = st.attributes?.current_position;
    if (typeof p === 'number' && odwroc) p = 100 - p;
    const s = st.state, poprzedni = this.stan;
    this.stan = s;
    if (typeof p !== 'number') p = s === 'closed' ? 0 : s === 'open' ? 100 : null;
    if (this.widac === null) { this.widac = this.cel = p ?? 0; return; }

    // nauka czasu przejazdu: od „otwiera/zamyka się” do zatrzymania
    if ((s === 'opening' || s === 'closing') && !this.nauka) this.nauka = { t: teraz, p: this.widac };
    if (s !== 'opening' && s !== 'closing' && this.nauka) {
      const dp = typeof p === 'number' ? Math.abs(p - this.nauka.p) : 0, dt = (teraz - this.nauka.t) / 1000;
      if (dp >= 30 && dt > 2) { const v = dt * 100 / dp, n = nauczony(this.encja); zapamietaj(this.encja, n ? n * .6 + v * .4 : v); }
      this.nauka = null;
    }

    // Zigbee (np. Moes przez Zigbee2MQTT): stan zmienia się od razu po komendzie, a pozycja przychodzi dopiero
    // po dojechaniu. „Zamknięta” przy 100 % albo „otwarta” przy 0 % = właśnie ruszyła – jedziemy z nią od razu
    const surowa = st.attributes?.current_position;
    if (typeof surowa === 'number' && poprzedni && s !== poprzedni && ((s === 'closed' && surowa >= 99) || (s === 'open' && surowa <= 1))) {
      const cel = (s === 'open') !== !!odwroc ? 100 : 0;
      if (!this.nauka) this.nauka = { t: teraz, p: this.widac };
      if (!this.komenda || this.komenda.stop) { this.cel = cel; this.komenda = null; this.dociagnij = false; }
      return;
    }
    if (s === 'opening' || s === 'closing') {   // silnik mówi, że jedzie – jedziemy z nim do końca
      if (!this.komenda || this.komenda.stop) { this.cel = s === 'opening' ? 100 : 0; this.komenda = null; }
      return;
    }
    if (p === null) return;
    const k = this.komenda;
    if (k) {
      const zatrzymal = poprzedni === 'opening' || poprzedni === 'closing';
      // za wcześnie na prawdziwy meldunek: to stara pozycja z chwili ruszenia (np. „open 0%” w trakcie jazdy)
      if (!zatrzymal && teraz < k.do && Math.abs(p - k.cel) > 2) return;
      this.komenda = null;
    }
    // ruch spoza karty (pilot, automatyka, kalibracja): wiele silników melduje cel od razu po ruszeniu,
    // więc duża zmiana jedzie w tempie silnika; małą poprawkę dociągamy szybko
    if (Math.abs(p - this.widac) > 0.5) { this.cel = p; this.dociagnij = !k && Math.abs(p - this.widac) <= 3; } else this.cel = p;
  }

  // jedna klatka animacji; zwraca true, gdy jeszcze się rusza
  krok(dt, teraz) {
    if (this.widac === null) return false;
    if (this.komenda && this.komenda.koniec && teraz > this.komenda.koniec) this.komenda = null;   // brak meldunku – wierzymy komendzie
    if (this.komenda?.stop && teraz > this.komenda.do) this.komenda = null;
    const d = this.cel - this.widac;
    if (Math.abs(d) < 0.2) { this.widac = this.cel; this.dociagnij = false; return false; }
    const v = 100 / this.czas, szybko = this.dociagnij ? Math.max(v, Math.abs(d) * 4) : v;
    this.widac += Math.sign(d) * Math.min(Math.abs(d), szybko * dt);
    return true;
  }
}
