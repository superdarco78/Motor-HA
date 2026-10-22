// Materiał każdej osłony jako mały obrazek SVG powtarzany w pionie (co „okres” pikseli).
// Obrazek jest przyklejony do dolnej listwy (background-position: 0 100%), więc pasy jadą razem z osłoną.
import { jasniej as J, rgba } from './kolor.js';

const svg = (h, tresc, w = 8) =>
  `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'>${tresc}</svg>`)}")`;
const pion = (id, stopy) => `<defs><linearGradient id='${id}' x1='0' y1='0' x2='0' y2='1'>${stopy.map(([o, c, a = 1]) => `<stop offset='${o}' stop-color='${c}' stop-opacity='${a}'/>`).join('')}</linearGradient></defs>`;
const pas = (id, y, h) => `<rect x='0' y='${y}' width='8' height='${h}' fill='url(#${id})'/>`;

// Zwraca { obraz, okres, nakladka? } – nakladka = dodatkowe tło CSS na całą szerokość (sznurki, pasy markizy, splot)
export function tekstura(typ, k) {
  const splot = 'repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px 3px)';
  const cien = 'linear-gradient(90deg,rgba(0,0,0,.18),rgba(0,0,0,0) 12%,rgba(0,0,0,0) 88%,rgba(0,0,0,.18))';
  const sznurki = (c, w) => `linear-gradient(90deg,transparent calc(22% - ${w / 2}px),${c} calc(22% - ${w / 2}px) calc(22% + ${w / 2}px),transparent calc(22% + ${w / 2}px) calc(78% - ${w / 2}px),${c} calc(78% - ${w / 2}px) calc(78% + ${w / 2}px),transparent calc(78% + ${w / 2}px))`;
  switch (typ) {
    case 'zebra': // dzień-noc: pas pełny 16 px + pas siatki 10 px, przez siatkę widać niebo
      return { okres: 26, nakladka: `${cien},${splot}`, obraz: svg(26,
        pion('a', [[0, J(k, .1)], [0.12, k], [0.85, k], [1, J(k, -.22)]]) + pion('b', [[0, J(k, .35), .5], [1, J(k, .45), .42]]) +
        pas('a', 0, 16) + pas('b', 16, 10)) };
    case 'pelna': case 'kasetowa':
      return { okres: 24, nakladka: `${cien},${splot}`, obraz: svg(24, pion('a', [[0, k], [0.5, J(k, -.05)], [1, k]]) + pas('a', 0, 24)) };
    case 'zaciemniajaca':
      return { okres: 24, nakladka: `${cien},linear-gradient(90deg,transparent 25%,rgba(255,255,255,.07) 45%,transparent 65%)`,
        obraz: svg(24, pion('a', [[0, J(k, .03)], [0.5, k], [1, J(k, .03)]]) + pas('a', 0, 24)) };
    case 'plisa': // fałdy: jasna krawędź u góry, cień u dołu
      return { okres: 12, nakladka: cien, obraz: svg(12, pion('a', [[0, J(k, .22), .95], [0.4, k, .94], [1, J(k, -.26), .96]]) + pas('a', 0, 12)) };
    case 'plaster': // komórkowa: dwie fałdy z widocznym szwem komórki
      return { okres: 14, nakladka: cien, obraz: svg(14, pion('a', [[0, J(k, .24), .96], [0.45, k, .94], [0.48, J(k, -.3), .97], [0.52, J(k, .08), .94], [1, J(k, -.28), .96]]) + pas('a', 0, 14)) };
    case 'rzymska': // miękkie, szerokie fałdy z cieniem pod każdą
      return { okres: 34, nakladka: `${cien},${splot}`, obraz: svg(34, pion('a', [[0, J(k, .02), .95], [0.55, J(k, .12), .95], [0.92, J(k, -.25), .97], [1, J(k, -.4), .97]]) + pas('a', 0, 34)) };
    case 'zaluzja': // lamele aluminiowe 10 px, prześwit 3 px
      return { okres: 13, nakladka: sznurki('rgba(240,240,240,.7)', 1), obraz: svg(13, pion('a', [[0, J(k, .35)], [0.35, k], [1, J(k, -.3)]]) + pas('a', 0, 10) + `<rect x='0' y='10' width='8' height='1' fill='rgba(0,0,0,.3)'/>`) };
    case 'drewniana': // szerokie lamele z drewna, taśmy drabinkowe
      return { okres: 22, nakladka: `${sznurki(rgba(J(k, -.2), .95), 6)},repeating-linear-gradient(90deg,rgba(0,0,0,.06) 0 1px,transparent 1px 6px,rgba(255,255,255,.05) 6px 7px,transparent 7px 12px)`,
        obraz: svg(22, pion('a', [[0, J(k, .22)], [0.3, k], [1, J(k, -.32)]]) + pas('a', 0, 18) + `<rect x='0' y='18' width='8' height='1.5' fill='rgba(0,0,0,.35)'/>`) };
    case 'zewnetrzna': case 'podtynkowa': // pancerz rolety: profil 12 px + szczelina
      return { okres: 14, nakladka: cien, obraz: svg(14, pion('a', [[0, J(k, .28)], [0.25, k], [0.75, k], [1, J(k, -.35)]]) + pas('a', 0, 12) + `<rect x='0' y='12' width='8' height='2' fill='rgba(0,0,0,.6)'/>`) };
    case 'natynkowa': // profil aluminiowy z rowkiem
      return { okres: 14, nakladka: cien, obraz: svg(14, pion('a', [[0, J(k, .3)], [0.2, k], [0.46, J(k, .08)], [0.5, J(k, -.22)], [0.56, k], [1, J(k, -.38)]]) + pas('a', 0, 12) + `<rect x='0' y='12' width='8' height='2' fill='rgba(0,0,0,.6)'/>`) };
    case 'perforowana': // pancerz z rzędem otworów przepuszczających światło
      return { okres: 14, nakladka: cien, obraz: svg(14, pion('a', [[0, J(k, .28)], [0.25, k], [1, J(k, -.35)]]) + pas('a', 0, 12) +
        `<rect x='0' y='12' width='8' height='2' fill='rgba(0,0,0,.6)'/><ellipse cx='4' cy='6' rx='1.3' ry='.8' fill='rgba(255,244,210,.95)'/>`) };
    case 'fasadowa': // C80: wygięte lamele, taśmy podnoszące
      return { okres: 16, nakladka: sznurki('rgba(25,25,25,.55)', 2), obraz: svg(16, pion('a', [[0, J(k, -.3)], [0.2, J(k, .28)], [0.5, J(k, .08)], [1, J(k, -.28)]]) + pas('a', 0, 12) + `<rect x='0' y='12' width='8' height='4' fill='rgba(0,0,0,.45)'/>`) };
    case 'fasadowaz': // Z90: płaskie lamele z czarną uszczelką
      return { okres: 16, nakladka: sznurki('rgba(25,25,25,.45)', 2), obraz: svg(16, pion('a', [[0, J(k, .16)], [0.15, k], [0.85, k], [1, J(k, -.22)]]) + pas('a', 0, 11) + `<rect x='0' y='11' width='8' height='1.5' fill='#1b1b1b'/><rect x='0' y='12.5' width='8' height='3.5' fill='${J(k, -.45)}'/>`) };
    case 'screen': // tkanina z siatki – trochę widać przez nią
      return { okres: 6, nakladka: 'repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 1px,transparent 1px 2px)', obraz: svg(6, pion('a', [[0, k, .8], [1, J(k, .06), .78]]) + pas('a', 0, 6)) };
    case 'markiza': // pasy markizy w poprzek, lekkie fałdy
      return { okres: 30, nakladka: `repeating-linear-gradient(90deg,${k} 0 14px,${rgba('#f3efe6', .97)} 14px 28px)`, obraz: svg(30, pion('a', [[0, '#ffffff', .12], [0.5, '#000000', .12], [1, '#ffffff', .12]]) + pas('a', 0, 30)) };
    default:
      return tekstura('zebra', k);
  }
}
