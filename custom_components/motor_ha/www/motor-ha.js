/* Motor HA – karta okna z osłoną · © superdarco78 · CC BY-NC-SA 4.0 · github.com/superdarco78/okno-ha-integracja
   Źródło: karta/src (npm run build) */
(() => {
  // src/stale.js
  var WERSJA = "2.0.0";
  var GRUPY = {
    wew: {
      rolety: ["pelna", "kasetowa", "zebra", "zaciemniajaca"],
      plisy: ["plisa", "plaster", "rzymska"],
      zaluzje: ["zaluzja", "drewniana"]
    },
    zew: {
      zrolety: ["natynkowa", "podtynkowa", "zewnetrzna", "perforowana"],
      fasadowe: ["fasadowa", "fasadowaz"],
      taras: ["markiza", "screen"]
    }
  };
  var OSLONY = Object.values(GRUPY).flatMap((g) => Object.values(g).flat());
  var ZEWNETRZNE = Object.values(GRUPY.zew).flat();
  var czyZew = (t) => ZEWNETRZNE.includes(t);
  var IKONY = {
    pelna: "mdi:roller-shade",
    kasetowa: "mdi:roller-shade",
    zebra: "mdi:roller-shade",
    zaciemniajaca: "mdi:roller-shade-closed",
    plisa: "mdi:blinds",
    plaster: "mdi:blinds",
    rzymska: "mdi:curtains",
    zaluzja: "mdi:blinds-horizontal",
    drewniana: "mdi:blinds-horizontal",
    natynkowa: "mdi:window-shutter",
    podtynkowa: "mdi:window-shutter",
    zewnetrzna: "mdi:window-shutter",
    perforowana: "mdi:window-shutter-open",
    fasadowa: "mdi:blinds-horizontal-closed",
    fasadowaz: "mdi:blinds-horizontal-closed",
    markiza: "mdi:awning-outline",
    screen: "mdi:roller-shade"
  };
  var IKONY_GRUP = {
    wew: "mdi:sofa-outline",
    zew: "mdi:home-outline",
    rolety: "mdi:roller-shade",
    plisy: "mdi:blinds",
    zaluzje: "mdi:blinds-horizontal",
    zrolety: "mdi:window-shutter",
    fasadowe: "mdi:blinds-horizontal-closed",
    taras: "mdi:awning-outline"
  };
  var KOLORY = {
    czarny: "#232427",
    grafit: "#3a3d42",
    szary: "#6d7076",
    popiel: "#a9aaa6",
    srebrny: "#c4c6c8",
    bialy: "#efefec",
    kremowy: "#e6dcc8",
    piaskowy: "#d9c7a4",
    bezowy: "#bfae94",
    cappuccino: "#a88c72",
    mokka: "#6f5544",
    braz: "#5a4030",
    wenge: "#3d2f28",
    stalowy: "#4f5a66",
    granat: "#25324d",
    blekitny: "#9cc6e6",
    niebieski: "#1e6ff2",
    morski: "#1d6f7a",
    turkus: "#00b3b3",
    mietowy: "#a9dcc6",
    zielony: "#22a447",
    butelkowy: "#1f4d3a",
    oliwka: "#6b7a3a",
    limonka: "#9bd426",
    zolty: "#ffd000",
    musztardowy: "#c99a1a",
    pomaranczowy: "#fc9907",
    terakota: "#b9583a",
    czerwony: "#e02424",
    bordo: "#7a1f2b",
    pudrowy: "#e4b9b9",
    rozowy: "#ff4f9a",
    lawendowy: "#b9a8d6",
    fiolet: "#8a3ffc",
    sliwkowy: "#5b2c4a"
  };
  var RAMY = {
    "#f4f4f2": ["biala"],
    "#d8d2c6": ["kremowa"],
    "#c9cbcc": ["jasnoszara"],
    "#b9bdc1": ["srebrna"],
    "#a3a6a8": ["szary_agat"],
    "#6e7378": ["szara"],
    "#6d6c66": ["szary_kwarc"],
    "#4a4d50": ["bazaltowa"],
    "#3b3f45": ["antracyt"],
    "#1f2124": ["czarna"],
    "#28402f": ["zielona"],
    "#2b3a55": ["granatowa"],
    "#5d1f23": ["bordowa"],
    "#6b4a32": ["braz"],
    "#c49a5c": ["sosna", 1],
    "#b39370": ["dab_jasny", 1],
    "#9d8064": ["dab_sheffield", 1],
    "#a26a43": ["winchester", 1],
    "#9b6a3c": ["oregon", 1],
    "#8a5a3b": ["zloty_dab", 1],
    "#6d4a33": ["siena", 1],
    "#5a3a26": ["orzech", 1],
    "#6a2e22": ["mahon", 1],
    "#3e3830": ["dab_bagienny", 1]
  };
  var RAMA_Z_KLUCZA = Object.fromEntries(Object.entries(RAMY).map(([hex2, [k]]) => [k, hex2]));
  var DOMYSLNE = {
    oslona: "zebra",
    kolor: "czarny",
    rama: "#f4f4f2",
    skrzydla: 2,
    wysokosc: 260,
    czas: "auto",
    pogoda: "auto",
    niebo: true,
    widok: true,
    czujnik_lewe: "",
    czujnik_prawe: "",
    tryb_lewe: "uchyl",
    tryb_prawe: "uchyl",
    auto_czujniki: true,
    roleta_lewa: "",
    roleta_prawa: "",
    predkosc_lewa: "",
    predkosc_prawa: "",
    przyciski: true,
    suwak: true,
    pozycje: "",
    odwroc: false,
    osobno: false,
    wibracja: true,
    jezyk: "auto"
  };
  var hex = (k) => KOLORY[k] || (/^#[0-9a-f]{3,8}$/i.test(String(k || "")) ? k : KOLORY.czarny);
  var ramaHex = (r) => RAMA_Z_KLUCZA[r] || (/^#[0-9a-f]{3,8}$/i.test(String(r || "")) ? String(r).toLowerCase() : "#f4f4f2");
  var czyDrewno = (r) => !!RAMY[ramaHex(r)]?.[1];

  // src/kolor.js
  var rgb = (h) => {
    let s = String(h || "").replace("#", "");
    if (s.length === 3) s = [...s].map((x) => x + x).join("");
    const n = parseInt(s.slice(0, 6), 16);
    return Number.isNaN(n) ? [35, 36, 39] : [n >> 16, n >> 8 & 255, n & 255];
  };
  var doHex = (a) => "#" + a.map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("");
  var jasniej = (h, t) => {
    const c = rgb(h), d = t < 0 ? 0 : 255;
    return doHex(c.map((x) => x + (d - x) * Math.abs(t)));
  };
  var rgba = (h, a) => `rgba(${rgb(h).join(",")},${a})`;

  // src/tekstury.js
  var svg = (h, tresc, w = 8) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'>${tresc}</svg>`)}")`;
  var pion = (id, stopy) => `<defs><linearGradient id='${id}' x1='0' y1='0' x2='0' y2='1'>${stopy.map(([o, c, a = 1]) => `<stop offset='${o}' stop-color='${c}' stop-opacity='${a}'/>`).join("")}</linearGradient></defs>`;
  var pas = (id, y, h) => `<rect x='0' y='${y}' width='8' height='${h}' fill='url(#${id})'/>`;
  function tekstura(typ, k) {
    const splot = "repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px 3px)";
    const cien = "linear-gradient(90deg,rgba(0,0,0,.18),rgba(0,0,0,0) 12%,rgba(0,0,0,0) 88%,rgba(0,0,0,.18))";
    const sznurki = (c, w) => `linear-gradient(90deg,transparent calc(22% - ${w / 2}px),${c} calc(22% - ${w / 2}px) calc(22% + ${w / 2}px),transparent calc(22% + ${w / 2}px) calc(78% - ${w / 2}px),${c} calc(78% - ${w / 2}px) calc(78% + ${w / 2}px),transparent calc(78% + ${w / 2}px))`;
    switch (typ) {
      case "zebra":
        return { okres: 26, nakladka: `${cien},${splot}`, obraz: svg(
          26,
          pion("a", [[0, jasniej(k, 0.1)], [0.12, k], [0.85, k], [1, jasniej(k, -0.22)]]) + pion("b", [[0, jasniej(k, 0.35), 0.5], [1, jasniej(k, 0.45), 0.42]]) + pas("a", 0, 16) + pas("b", 16, 10)
        ) };
      case "pelna":
      case "kasetowa":
        return { okres: 24, nakladka: `${cien},${splot}`, obraz: svg(24, pion("a", [[0, k], [0.5, jasniej(k, -0.05)], [1, k]]) + pas("a", 0, 24)) };
      case "zaciemniajaca":
        return {
          okres: 24,
          nakladka: `${cien},linear-gradient(90deg,transparent 25%,rgba(255,255,255,.07) 45%,transparent 65%)`,
          obraz: svg(24, pion("a", [[0, jasniej(k, 0.03)], [0.5, k], [1, jasniej(k, 0.03)]]) + pas("a", 0, 24))
        };
      case "plisa":
        return { okres: 12, nakladka: cien, obraz: svg(12, pion("a", [[0, jasniej(k, 0.22), 0.95], [0.4, k, 0.94], [1, jasniej(k, -0.26), 0.96]]) + pas("a", 0, 12)) };
      case "plaster":
        return { okres: 14, nakladka: cien, obraz: svg(14, pion("a", [[0, jasniej(k, 0.24), 0.96], [0.45, k, 0.94], [0.48, jasniej(k, -0.3), 0.97], [0.52, jasniej(k, 0.08), 0.94], [1, jasniej(k, -0.28), 0.96]]) + pas("a", 0, 14)) };
      case "rzymska":
        return { okres: 34, nakladka: `${cien},${splot}`, obraz: svg(34, pion("a", [[0, jasniej(k, 0.02), 0.95], [0.55, jasniej(k, 0.12), 0.95], [0.92, jasniej(k, -0.25), 0.97], [1, jasniej(k, -0.4), 0.97]]) + pas("a", 0, 34)) };
      case "zaluzja":
        return { okres: 13, nakladka: sznurki("rgba(240,240,240,.7)", 1), obraz: svg(13, pion("a", [[0, jasniej(k, 0.35)], [0.35, k], [1, jasniej(k, -0.3)]]) + pas("a", 0, 10) + `<rect x='0' y='10' width='8' height='1' fill='rgba(0,0,0,.3)'/>`) };
      case "drewniana":
        return {
          okres: 22,
          nakladka: `${sznurki(rgba(jasniej(k, -0.2), 0.95), 6)},repeating-linear-gradient(90deg,rgba(0,0,0,.06) 0 1px,transparent 1px 6px,rgba(255,255,255,.05) 6px 7px,transparent 7px 12px)`,
          obraz: svg(22, pion("a", [[0, jasniej(k, 0.22)], [0.3, k], [1, jasniej(k, -0.32)]]) + pas("a", 0, 18) + `<rect x='0' y='18' width='8' height='1.5' fill='rgba(0,0,0,.35)'/>`)
        };
      case "zewnetrzna":
      case "podtynkowa":
        return { okres: 14, nakladka: cien, obraz: svg(14, pion("a", [[0, jasniej(k, 0.28)], [0.25, k], [0.75, k], [1, jasniej(k, -0.35)]]) + pas("a", 0, 12) + `<rect x='0' y='12' width='8' height='2' fill='rgba(0,0,0,.6)'/>`) };
      case "natynkowa":
        return { okres: 14, nakladka: cien, obraz: svg(14, pion("a", [[0, jasniej(k, 0.3)], [0.2, k], [0.46, jasniej(k, 0.08)], [0.5, jasniej(k, -0.22)], [0.56, k], [1, jasniej(k, -0.38)]]) + pas("a", 0, 12) + `<rect x='0' y='12' width='8' height='2' fill='rgba(0,0,0,.6)'/>`) };
      case "perforowana":
        return { okres: 14, nakladka: cien, obraz: svg(14, pion("a", [[0, jasniej(k, 0.28)], [0.25, k], [1, jasniej(k, -0.35)]]) + pas("a", 0, 12) + `<rect x='0' y='12' width='8' height='2' fill='rgba(0,0,0,.6)'/><ellipse cx='4' cy='6' rx='1.3' ry='.8' fill='rgba(255,244,210,.95)'/>`) };
      case "fasadowa":
        return { okres: 16, nakladka: sznurki("rgba(25,25,25,.55)", 2), obraz: svg(16, pion("a", [[0, jasniej(k, -0.3)], [0.2, jasniej(k, 0.28)], [0.5, jasniej(k, 0.08)], [1, jasniej(k, -0.28)]]) + pas("a", 0, 12) + `<rect x='0' y='12' width='8' height='4' fill='rgba(0,0,0,.45)'/>`) };
      case "fasadowaz":
        return { okres: 16, nakladka: sznurki("rgba(25,25,25,.45)", 2), obraz: svg(16, pion("a", [[0, jasniej(k, 0.16)], [0.15, k], [0.85, k], [1, jasniej(k, -0.22)]]) + pas("a", 0, 11) + `<rect x='0' y='11' width='8' height='1.5' fill='#1b1b1b'/><rect x='0' y='12.5' width='8' height='3.5' fill='${jasniej(k, -0.45)}'/>`) };
      case "screen":
        return { okres: 6, nakladka: "repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 1px,transparent 1px 2px)", obraz: svg(6, pion("a", [[0, k, 0.8], [1, jasniej(k, 0.06), 0.78]]) + pas("a", 0, 6)) };
      case "markiza":
        return { okres: 30, nakladka: `repeating-linear-gradient(90deg,${k} 0 14px,${rgba("#f3efe6", 0.97)} 14px 28px)`, obraz: svg(30, pion("a", [[0, "#ffffff", 0.12], [0.5, "#000000", 0.12], [1, "#ffffff", 0.12]]) + pas("a", 0, 30)) };
      default:
        return tekstura("zebra", k);
    }
  }

  // src/styl.js
  var SLOJE = "repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 1px,transparent 1px 4px,rgba(255,255,255,.05) 4px 5px,transparent 5px 9px),repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0 1px,transparent 1px 5px,rgba(255,255,255,.04) 5px 6px,transparent 6px 11px)";
  var STYL_STALY = `
:host{display:block}
ha-card{overflow:hidden;height:100%;box-sizing:border-box}
.mh{padding:var(--ha-space-3,12px);display:flex;flex-direction:column;gap:var(--ha-space-3,12px);user-select:none;-webkit-user-select:none}
/* nagłówek jak w kafelku HA: ikona 36 px w kółku, nazwa 14 px, stan 12 px */
.gl{display:flex;align-items:center;gap:10px;min-height:40px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.ik{flex:none;display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:var(--ha-tile-icon-border-radius,50%);
 color:var(--mh-kolor);background:color-mix(in srgb,var(--mh-kolor) 20%,transparent);transition:background .2s,color .2s}
.ik ha-icon{--mdc-icon-size:24px;display:flex}
.opis{min-width:0;flex:1;display:flex;flex-direction:column}
.nazwa{font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);line-height:var(--ha-line-height-condensed,20px);color:var(--primary-text-color);
 white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.1px}
.stan{font-size:var(--ha-font-size-s,12px);line-height:var(--ha-line-height-condensed,16px);color:var(--primary-text-color);
 white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:.4px}
/* scena */
.scena{position:relative;display:flex;justify-content:center;touch-action:none}
.zew .scena{margin:0 calc(-1 * var(--ha-space-3,12px));padding:20px 16px 22px}
.okno{position:relative;display:flex;box-sizing:border-box;padding:6px;border-radius:3px}
.skrz{position:relative;flex:1;min-width:0;box-sizing:border-box;padding:7px;border-radius:2px;cursor:ns-resize;
 box-shadow:inset 0 0 0 1px rgba(0,0,0,.16),0 1px 2px rgba(0,0,0,.22);transition:transform 1.2s cubic-bezier(.4,.1,.2,1)}
.skrz+.skrz{margin-left:8px}
.za{position:absolute;inset:6px;border-radius:2px;overflow:hidden;background:#2b3138;visibility:hidden}
.za.widac{visibility:visible}
.szyba{position:relative;height:100%;overflow:hidden;border-radius:1px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.2),inset 0 3px 8px rgba(0,0,0,.28)}
.niebo,.pg,.osiedle,.osiedle-w,.blask,.pokoj{position:absolute;inset:0}
.osiedle{width:100%;height:100%}
.pg{overflow:hidden;pointer-events:none}
.pg i{position:absolute;display:block}
.blask{background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.14) 38%,transparent 46%);pointer-events:none;z-index:5}
.oslona{position:absolute;left:0;right:0;top:0;height:0;z-index:3;background-repeat:repeat-y,repeat,repeat;will-change:height}
.listwa{position:absolute;left:0;right:0;height:5px;top:0;z-index:4;border-radius:1px;will-change:transform}
.listwa::after{content:"";position:absolute;left:50%;top:100%;width:22px;height:8px;transform:translateX(-50%);border-radius:0 0 7px 7px;
 background:linear-gradient(180deg,#ececec,#a9a9a9);box-shadow:0 2px 3px rgba(0,0,0,.45)}
.kaseta{position:absolute;left:-1px;right:-1px;top:0;height:12px;z-index:6;border-radius:0 0 4px 4px}
.prow{position:absolute;top:10px;bottom:0;width:5px;z-index:5;pointer-events:none;box-shadow:0 0 2px rgba(0,0,0,.45)}
.prow.l{left:0}.prow.p{right:0}
.klamka{position:absolute;top:55%;width:8px;height:18px;margin-top:-9px;border-radius:4px;z-index:9;
 background:linear-gradient(90deg,#8d9297,#f4f5f6 45%,#6f7479);box-shadow:0 0 0 1px rgba(0,0,0,.45),0 1px 3px rgba(0,0,0,.5)}
.klamka::after{content:"";position:absolute;left:.5px;top:4px;width:7px;height:30px;border-radius:3.5px;transform-origin:3.5px 5px;
 background:linear-gradient(90deg,#7d8287,#fff 45%,#5f6469);box-shadow:0 0 0 1px rgba(0,0,0,.5),0 2px 4px rgba(0,0,0,.5);transition:transform .5s 1s}
.skrz[data-i="0"] .klamka{right:0}.skrz[data-i="1"] .klamka{left:0}
.skrz.otw[data-i="0"] .klamka::after{transform:rotate(90deg);transition-delay:0s}
.skrz.otw[data-i="1"] .klamka::after{transform:rotate(-90deg);transition-delay:0s}
.skrz.uch .klamka::after{transform:rotate(180deg);transition-delay:0s}
.skrz.uch{transform-origin:50% 100%;transform:perspective(700px) rotateX(-14deg) scaleY(.9);box-shadow:0 6px 14px rgba(0,0,0,.5)}
.skrz.otw[data-i="0"]{transform-origin:0 50%;transform:perspective(700px) rotateY(-42deg);z-index:8}
.skrz.otw[data-i="1"]{transform-origin:100% 50%;transform:perspective(700px) rotateY(42deg);z-index:8}
.skrz.otw,.skrz.uch{transition-delay:.4s}
.slup{position:absolute;top:0;bottom:0;left:50%;width:0}
/* środkowy uchwyt: obie osłony naraz */
.oba{position:absolute;left:50%;top:0;z-index:12;width:32px;height:32px;margin:-16px 0 0 -16px;border-radius:50%;cursor:grab;touch-action:none;
 display:flex;align-items:center;justify-content:center;color:var(--primary-text-color);background:var(--ha-card-background,var(--card-background-color,#fff));
 box-shadow:0 0 0 2px var(--accent-color),0 2px 6px rgba(0,0,0,.45);will-change:transform}
.oba ha-icon{--mdc-icon-size:20px;display:flex}
/* linia celu podczas przeciągania i jazdy */
.cel{position:absolute;left:0;right:0;height:0;border-top:2px dashed var(--accent-color);z-index:10;display:none;pointer-events:none}
.cel span{position:absolute;left:50%;transform:translateX(-50%);top:-24px;padding:2px 8px;border-radius:var(--ha-border-radius-pill,9999px);white-space:nowrap;
 background:var(--accent-color);color:var(--text-accent-color,var(--text-primary-color,#fff));font-size:var(--ha-font-size-s,12px);font-weight:var(--ha-font-weight-medium,500)}
/* pogoda */
.slonce{top:12%;right:12%;width:24%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fffbe0 0 30%,#ffd84d 45%,rgba(255,216,77,.35) 58%,rgba(255,216,77,0) 70%);animation:mhSl 5s ease-in-out infinite}
.slonce.nisko{top:46%;background:radial-gradient(circle,#fff0c0 0 28%,#ff9a3c 46%,rgba(255,120,50,.35) 60%,rgba(255,120,50,0) 72%)}
@keyframes mhSl{50%{transform:scale(1.07)}}
.ksiezyc{top:12%;right:18%;width:14%;aspect-ratio:1;border-radius:50%;box-shadow:inset -6px 3px 0 0 #f1edcf;filter:drop-shadow(0 0 5px rgba(241,237,207,.55))}
.gw{width:2px;height:2px;border-radius:50%;background:#fff;animation:mhGw 3s ease-in-out infinite}
@keyframes mhGw{50%{opacity:.15}}
.chm{left:-60%;aspect-ratio:3.2;border-radius:999px;filter:blur(.6px);animation:mhChm 60s linear infinite}
.chm::before,.chm::after{content:"";position:absolute;border-radius:50%;background:inherit}
.chm::before{left:14%;bottom:30%;width:38%;aspect-ratio:1}.chm::after{left:42%;bottom:22%;width:44%;aspect-ratio:1}
@keyframes mhChm{to{left:110%}}
.mg{left:-50%;width:200%;height:20%;background:linear-gradient(90deg,transparent,rgba(236,239,241,.75) 30%,rgba(236,239,241,.55) 70%,transparent);filter:blur(5px);animation:mhMg 18s ease-in-out infinite alternate}
@keyframes mhMg{to{transform:translateX(22%)}}
.kr{top:-14%;width:1.5px;height:12%;background:linear-gradient(rgba(225,236,247,0),rgba(225,236,247,.85));transform:skewX(-12deg);animation:mhKr .8s linear infinite}
@keyframes mhKr{to{transform:translate(-14px,1000%) skewX(-12deg)}}
.pl{top:-5%;border-radius:50%;background:#fff;opacity:.92;animation:mhPl 7s linear infinite}
@keyframes mhPl{0%{top:-5%;transform:translateX(0)}25%{transform:translateX(7px)}75%{transform:translateX(-7px)}100%{top:105%;transform:translateX(0)}}
.bl{inset:0;background:#fff;opacity:0;animation:mhBl 7s linear infinite}
@keyframes mhBl{0%,88%,91%,93%,100%{opacity:0}89%,92%{opacity:.55}}
.drz{animation:mhDrz 2.4s ease-in-out infinite alternate}
@keyframes mhDrz{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
.promien{position:absolute;inset:0;z-index:4;pointer-events:none;opacity:0;transition:opacity 1.5s;mix-blend-mode:screen;filter:blur(2px);
 background:linear-gradient(115deg,rgba(255,214,120,0) 15%,rgba(255,214,120,.24) 40%,rgba(255,214,120,0) 62%)}
.slonecznie .promien{opacity:1}
/* widok z zewnątrz: okno w ścianie, za szybą pokój */
.zew .scena{background:radial-gradient(circle at 20% 30%,rgba(255,255,255,.08),transparent 40%),repeating-linear-gradient(45deg,rgba(0,0,0,.018) 0 2px,transparent 2px 5px),linear-gradient(180deg,#e2ddd3,#d3cdc1)}
.zew.noc .scena{background:repeating-linear-gradient(45deg,rgba(0,0,0,.03) 0 2px,transparent 2px 5px),linear-gradient(180deg,#5d5953,#4f4b46)}
.zew .okno{box-shadow:0 0 0 5px #c4bdb0,0 0 0 6px rgba(0,0,0,.08),-4px 4px 10px 6px rgba(0,0,0,.28)}
.zew .okno::after{content:"";position:absolute;left:-14px;right:-14px;bottom:-12px;height:9px;z-index:20;border-radius:1px 1px 2px 2px;
 background:linear-gradient(180deg,#f2f3f4,#b9bec3 55%,#8a9096);box-shadow:0 4px 5px rgba(0,0,0,.35)}
.pokoj{background:linear-gradient(180deg,rgba(150,185,215,.3),rgba(150,185,215,0) 45%),linear-gradient(180deg,#3a332d,#2a2420)}
.noc .pokoj{background:radial-gradient(ellipse 70% 45% at 50% 22%,rgba(255,206,130,.7),rgba(96,66,38,.9) 70%,#2a1d12)}
.zew .skrz{cursor:default}
.zew .zewo{position:absolute;inset:0;z-index:15;display:flex;cursor:ns-resize}
.zewo .szyba{flex:1;box-shadow:none;overflow:visible;border-radius:0;background:transparent}
.zewo .szyba+.szyba{margin-left:0}
/* przyciski jak w kafelku HA (funkcje osłony): 42 px, zaokrąglenie 12 px */
.przyc{display:flex;gap:var(--ha-space-3,12px)}
.przyc button{flex:1;min-width:0;height:var(--feature-height,42px);border:none;border-radius:var(--ha-card-features-border-radius,var(--ha-border-radius-lg,12px));
 cursor:pointer;color:var(--primary-text-color);background:color-mix(in srgb,var(--disabled-color,#bdbdbd) 20%,transparent);
 display:flex;align-items:center;justify-content:center;transition:background .18s;-webkit-tap-highlight-color:transparent;outline:none}
.przyc button:hover{background:color-mix(in srgb,var(--disabled-color,#bdbdbd) 32%,transparent)}
.przyc button:focus-visible{box-shadow:0 0 0 2px var(--secondary-text-color)}
.przyc button:disabled{cursor:default;color:var(--disabled-text-color);background:color-mix(in srgb,var(--disabled-color,#bdbdbd) 20%,transparent)}
.przyc ha-icon{--mdc-icon-size:24px;display:flex}
/* suwak pozycji jak ha-control-slider */
.suwak{position:relative;height:var(--feature-height,42px);border-radius:var(--ha-card-features-border-radius,var(--ha-border-radius-lg,12px));overflow:hidden;cursor:pointer;
 background:color-mix(in srgb,var(--mh-kolor) 20%,transparent);touch-action:none;outline:none}
.suwak:focus-visible{box-shadow:0 0 0 2px var(--mh-kolor)}
.suwak .wyp{position:absolute;left:0;top:0;bottom:0;background:var(--mh-kolor);transition:width .1s}
.suwak .wyp::after{content:"";position:absolute;right:6px;top:50%;width:4px;height:50%;transform:translateY(-50%);border-radius:2px;background:var(--white-color,#fff)}
.suwak .wart{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;
 font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color);mix-blend-mode:normal}
/* gotowe pozycje jak chipy filtrów HA */
.poz{display:flex;flex-wrap:wrap;gap:8px}
.poz button{flex:1 1 auto;height:32px;padding:0 12px;border-radius:var(--ha-border-radius-md,8px);border:1px solid var(--outline-color,var(--divider-color));background:transparent;
 color:var(--primary-text-color);font:inherit;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);cursor:pointer;-webkit-tap-highlight-color:transparent}
.poz button:hover{background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}
.poz button.on{background:color-mix(in srgb,var(--primary-text-color) 15%,transparent);border-color:transparent}
.brak{padding:16px;color:var(--secondary-text-color);font-size:var(--ha-font-size-m,14px)}
`;
  function stylOkna({ rama, drewno, kolor, typ, zew }) {
    const t = tekstura(typ, kolor), S = (k) => jasniej(kolor, k), R = (k) => jasniej(rama, k);
    const tlo = (drewno ? SLOJE + "," : "") + rama;
    const alu = `linear-gradient(90deg,${S(-0.4)},${S(0.22)} 40%,${S(-0.05)} 70%,${S(-0.45)})`;
    let kaseta = `background:linear-gradient(180deg,#fff,#f1f1f1 55%,#cfcfcf);box-shadow:0 2px 3px rgba(0,0,0,.35)`;
    let listwa = `background:linear-gradient(180deg,#fafafa,#bdbdbd);box-shadow:0 2px 3px rgba(0,0,0,.4)`;
    let prow = "";
    switch (typ) {
      case "pelna":
        kaseta = `left:3px;right:3px;height:10px;border-radius:10px;background:linear-gradient(180deg,${S(0.3)},${kolor} 50%,${S(-0.38)});box-shadow:0 1px 2px rgba(0,0,0,.4)`;
        break;
      case "kasetowa":
        kaseta = `background:linear-gradient(180deg,${R(0.06)},${rama} 50%,${R(-0.18)});box-shadow:0 2px 3px rgba(0,0,0,.35)`;
        prow = `linear-gradient(90deg,${R(-0.2)},${R(0.06)} 45%,${R(-0.14)})`;
        break;
      case "zaciemniajaca":
        prow = "linear-gradient(90deg,#c9c9c9,#fafafa 45%,#b5b5b5)";
        break;
      case "plisa":
      case "plaster":
        kaseta = `height:8px;background:linear-gradient(180deg,#f4f4f4,#c9c9c9);box-shadow:0 1px 2px rgba(0,0,0,.35)`;
        listwa = `background:linear-gradient(180deg,#f4f4f4,#bcbcbc);box-shadow:0 2px 3px rgba(0,0,0,.35)`;
        break;
      case "rzymska":
        kaseta = `height:8px;background:linear-gradient(180deg,${S(0.25)},${S(-0.1)});box-shadow:0 1px 2px rgba(0,0,0,.35)`;
        listwa = `background:linear-gradient(180deg,${S(0.05)},${S(-0.35)});box-shadow:0 3px 4px rgba(0,0,0,.3)`;
        break;
      case "zaluzja":
      case "drewniana":
        kaseta = `height:9px;background:linear-gradient(180deg,${S(0.3)},${kolor} 55%,${S(-0.35)});box-shadow:0 2px 3px rgba(0,0,0,.35)`;
        listwa = `background:linear-gradient(180deg,${S(0.3)},${kolor} 50%,${S(-0.3)});box-shadow:0 2px 2px rgba(0,0,0,.35)`;
        break;
      case "zewnetrzna":
      case "perforowana":
        kaseta = `height:16px;background:linear-gradient(180deg,${R(0.05)},${rama} 45%,${R(-0.16)});border-radius:0;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12),0 2px 3px rgba(0,0,0,.35)`;
        prow = alu;
        break;
      case "natynkowa":
        kaseta = `height:20px;background:linear-gradient(180deg,${S(0.36)},${S(0.18)} 50%,${S(-0.3)} 51%,${S(-0.05)});border-radius:0;box-shadow:0 3px 5px rgba(0,0,0,.5)`;
        prow = alu;
        break;
      case "podtynkowa":
        kaseta = `height:12px;background:linear-gradient(180deg,#ebe7de,#d6d1c6 58%,#3a3a3a 60%,#151515);border-radius:0;box-shadow:none`;
        prow = alu;
        break;
      case "fasadowa":
      case "fasadowaz":
        kaseta = `height:14px;background:linear-gradient(180deg,${S(0.3)},${S(0.05)} 70%,${S(-0.3)});border-radius:0;box-shadow:0 2px 3px rgba(0,0,0,.4)`;
        prow = alu;
        break;
      case "screen":
        kaseta = `height:16px;background:linear-gradient(180deg,${S(0.3)},${S(0.08)} 60%,${S(-0.35)});border-radius:0;box-shadow:0 2px 3px rgba(0,0,0,.4)`;
        prow = `linear-gradient(90deg,${S(-0.45)},${S(0.15)} 35%,#111 50%,${S(0.15)} 65%,${S(-0.45)})`;
        break;
      case "markiza":
        kaseta = `height:16px;background:linear-gradient(180deg,#e8eaec,#c3c7cb 60%,#8d9297);border-radius:0;box-shadow:0 3px 5px rgba(0,0,0,.45)`;
        listwa = `height:6px;background:linear-gradient(180deg,#eef0f2,#a7acb1);box-shadow:0 2px 2px rgba(0,0,0,.35)`;
        break;
    }
    if (["zewnetrzna", "perforowana", "natynkowa", "podtynkowa", "fasadowa", "fasadowaz", "screen"].includes(typ))
      listwa = `background:linear-gradient(180deg,${S(0.35)},${S(0.05)} 55%,${S(-0.4)});box-shadow:0 2px 0 rgba(20,20,20,.85),0 3px 3px rgba(0,0,0,.4)`;
    const markiza = typ === "markiza" ? `.listwa::before{content:"";position:absolute;left:0;right:0;top:100%;height:10px;background:radial-gradient(circle at 7px 0,${kolor} 6.5px,transparent 7px) 0 0/14px 10px repeat-x}` : "";
    return `
.okno{background:${tlo};box-shadow:inset 0 0 0 1px rgba(0,0,0,.18),0 3px 10px rgba(0,0,0,.4)}
.skrz{background:${(drewno ? SLOJE + "," : "") + R(-0.03)}}
.oslona{background-image:${t.nakladka ? t.nakladka + "," : ""}${t.obraz};background-size:${t.nakladka ? "100% 100%," : ""}100% ${t.okres}px;background-position:${t.nakladka ? "0 0," : ""}0 100%;background-repeat:${t.nakladka ? "no-repeat," : ""}repeat-y}
.kaseta{${kaseta}}
.listwa{${listwa}}
${prow ? `.prow{background:${prow}}` : ".prow{display:none}"}
${markiza}
${zew ? `.zewo .oslona{box-shadow:0 2px 6px rgba(0,0,0,.35)}` : ""}
.mhr{--mh-rama:${rama};--mh-materialu:${rgba(kolor, 1)}}`;
  }

  // src/scena.js
  var NIEBO_Z_POGODY = {
    sunny: "slonce",
    "clear-night": "slonce",
    partlycloudy: "chmurki",
    cloudy: "chmury",
    exceptional: "chmury",
    windy: "wiatr",
    "windy-variant": "wiatr",
    fog: "mgla",
    rainy: "deszcz",
    pouring: "ulewa",
    hail: "ulewa",
    lightning: "burza",
    "lightning-rainy": "burza",
    snowy: "snieg",
    "snowy-rainy": "deszczsnieg"
  };
  var NIEBA = {
    dzien: {
      slonce: ["#3d8fdc", "#bfe1f7"],
      chmurki: ["#5b9bd6", "#cfe3f1"],
      wiatr: ["#7095b8", "#cbd8e3"],
      chmury: ["#8794a0", "#c9d0d6"],
      mgla: ["#a6afb6", "#dde1e3"],
      deszcz: ["#5a6670", "#939da6"],
      ulewa: ["#454f58", "#76808a"],
      burza: ["#2c333b", "#5c656e"],
      snieg: ["#a2aeb9", "#e6ebee"],
      deszczsnieg: ["#7a858f", "#b8c0c7"]
    },
    zloto: { jasno: ["#4b62a6", "#f6a86b"], ciemno: ["#59606b", "#b88d79"] },
    zmierzch: { jasno: ["#15204c", "#c46f73"], ciemno: ["#1c2134", "#6d5866"] },
    noc: { jasno: ["#07102a", "#1d2b55"], ciemno: ["#0d1119", "#252b36"] }
  };
  var JASNE = ["slonce", "chmurki", "wiatr"];
  function kolorNieba(rodzaj, pora) {
    const [g, d] = pora === "dzien" ? NIEBA.dzien[rodzaj] || NIEBA.dzien.slonce : NIEBA[pora][JASNE.includes(rodzaj) ? "jasno" : "ciemno"];
    return `linear-gradient(180deg,${g},${d})`;
  }
  function poraDnia(hass) {
    const s = hass?.states?.["sun.sun"], el = s?.attributes?.elevation;
    if (typeof el === "number") return s.state === "below_horizon" ? el > -6 ? "zmierzch" : "noc" : el < 7 ? "zloto" : "dzien";
    const h = (/* @__PURE__ */ new Date()).getHours();
    return h >= 22 || h < 5 ? "noc" : h < 7 || h >= 20 ? "zmierzch" : h < 8 || h >= 19 ? "zloto" : "dzien";
  }
  var los = (n) => {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  var DOMY = [
    // x, szerokość, wysokość ściany, kolor ściany, kolor dachu, rodzaj dachu
    [6, 26, 22, "#d9c4a5", "#9c4a36", "dwu"],
    [36, 20, 30, "#c9cfd4", "#4b5661", "plaski"],
    [60, 30, 20, "#e6d8bc", "#7b4d36", "dwu"],
    [106, 24, 26, "#cdb59a", "#8e3f30", "dwu"],
    [134, 18, 34, "#b9c3c9", "#3f4a55", "plaski"],
    [156, 32, 21, "#e1d3b5", "#6a5143", "dwu"]
  ];
  var DRZEWA = [[3, 13, "k"], [33, 11, "i"], [56, 12, "k"], [94, 15, "k"], [101, 10, "i"], [131, 12, "k"], [153, 10, "i"], [193, 14, "k"]];
  var LAMPY = [84, 118];
  function osiedle(rodzaj, pora) {
    const snieg = rodzaj === "snieg" || rodzaj === "deszczsnieg", mokro = ["deszcz", "ulewa", "burza", "deszczsnieg"].includes(rodzaj);
    const wiatr = ["wiatr", "burza", "ulewa"].includes(rodzaj), ciemno = pora === "noc" || pora === "zmierzch";
    const szarosc = { chmury: 0.85, mgla: 0.88, deszcz: 0.74, ulewa: 0.64, burza: 0.55, deszczsnieg: 0.74, wiatr: 0.92, snieg: 0.95 }[rodzaj] || 1;
    const filtr = pora === "noc" ? "brightness(.36) saturate(.55) hue-rotate(12deg)" : pora === "zmierzch" ? "brightness(.55) saturate(.7) hue-rotate(-10deg)" : pora === "zloto" ? `brightness(${szarosc * 0.95}) sepia(.28) saturate(1.2)` : `brightness(${szarosc}) saturate(${szarosc})`;
    const g = [], okna = [];
    g.push(`<path d="M0 58 C25 46 45 52 70 49 S120 42 150 50 S185 47 200 52 V100 H0Z" fill="${snieg ? "#dfe7ec" : "#8db07a"}" opacity=".85"/>`);
    g.push(`<path d="M0 66 C40 58 80 64 110 61 S170 60 200 64 V100 H0Z" fill="${snieg ? "#eef3f6" : "#6f9d5c"}"/>`);
    for (const [x, w, h, sc, da, typ] of DOMY) {
      const y = 80 - h;
      g.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${sc}"/>`);
      if (typ === "dwu") {
        g.push(`<path d="M${x - 2.5} ${y + 0.5} L${x + w / 2} ${y - w * 0.42} L${x + w + 2.5} ${y + 0.5}Z" fill="${da}"/>`);
        if (snieg) g.push(`<path d="M${x - 2.5} ${y + 0.5} L${x + w / 2} ${y - w * 0.42} L${x + w + 2.5} ${y + 0.5} L${x + w} ${y - 1.2} L${x + w / 2} ${y - w * 0.42 + 2.2} L${x} ${y - 1.2}Z" fill="#fbfdff"/>`);
        g.push(`<rect x="${x + w * 0.68}" y="${y - w * 0.38}" width="3" height="${w * 0.2}" fill="${da}"/>`);
      } else {
        g.push(`<rect x="${x - 1}" y="${y - 2}" width="${w + 2}" height="2.5" fill="${snieg ? "#fbfdff" : da}"/>`);
      }
      let n = 0;
      for (let r = y + 4; r < 74; r += 8) for (let c = x + 3; c < x + w - 4; c += 7) {
        g.push(`<rect x="${c}" y="${r}" width="4" height="4.6" rx=".4" fill="#9eb6c8"/>`);
        if (ciemno && los(x * 13 + n) < 0.55) okna.push(`<rect x="${c}" y="${r}" width="4" height="4.6" rx=".4" fill="#ffd47e"/>`);
        n++;
      }
      g.push(`<rect x="${x + w / 2 - 2.5}" y="${74}" width="5" height="6" fill="${da}" opacity=".9"/>`);
    }
    for (const [x, r, typ] of DRZEWA) {
      const kor = `<rect x="${x - 0.9}" y="${80 - r * 0.45}" width="1.8" height="${r * 0.45}" fill="#5b4030"/>`;
      const k1 = snieg ? "#e3ebe7" : "#3f7d3b", k2 = snieg ? "#cfdcd5" : "#33702f";
      const korona = typ === "i" ? `<path d="M${x} ${80 - r * 1.25} L${x + r * 0.38} ${80 - r * 0.4} L${x - r * 0.38} ${80 - r * 0.4}Z" fill="${k2}"/>` : `<circle cx="${x}" cy="${80 - r * 0.7}" r="${r * 0.45}" fill="${k1}"/><circle cx="${x - r * 0.28}" cy="${80 - r * 0.5}" r="${r * 0.32}" fill="${k2}"/>`;
      g.push(`<g class="${wiatr ? "drz" : ""}" style="transform-origin:${x}px 80px;animation-delay:-${x % 9 / 3}s">${kor}${korona}</g>`);
    }
    g.push(`<rect x="0" y="80" width="200" height="4" fill="${snieg ? "#f2f5f7" : "#a4a29c"}"/>`);
    g.push(`<rect x="0" y="84" width="200" height="16" fill="${snieg ? "#e4e9ec" : mokro ? "#3a4046" : "#5d6166"}"/>`);
    for (let k = 0; k < 9; k++) g.push(`<rect x="${k * 24 + 4}" y="91.5" width="12" height="1" fill="#e8e6dc" opacity="${snieg ? 0.2 : 0.55}"/>`);
    if (mokro) for (let k = 0; k < 14; k++) g.push(`<rect x="${k * 15 + 3}" y="${86 + k % 4 * 3}" width="7" height=".6" fill="#a9bccb" opacity=".55"/>`);
    for (const x of LAMPY) g.push(`<rect x="${x - 0.6}" y="58" width="1.2" height="26" fill="#2e3238"/><rect x="${x - 3.2}" y="57" width="6.4" height="1.6" rx=".8" fill="#2e3238"/>`);
    const swiatla = [...okna];
    if (ciemno) for (const x of LAMPY) swiatla.push(`<circle cx="${x}" cy="59" r="10" fill="url(#mhLampa)"/><circle cx="${x}" cy="58.8" r="1.6" fill="#fff4c8"/><ellipse cx="${x}" cy="86" rx="16" ry="3" fill="#ffd27a" opacity="${mokro ? 0.45 : 0.22}"/>`);
    return { tlo: g.join(""), filtr, swiatla: swiatla.join("") };
  }
  function pogoda(rodzaj, pora, skrzydlo, ile) {
    const h = [], noc = pora === "noc" || pora === "zmierzch", jasno = JASNE.includes(rodzaj), ciemne = ["deszcz", "ulewa", "burza", "deszczsnieg"].includes(rodzaj);
    const L = (a, b, n) => a + los(n + skrzydlo * 97) * (b - a);
    if (noc && jasno) for (let k = 0; k < 14; k++) h.push(`<i class="gw" style="left:${L(3, 97, k)}%;top:${L(4, 45, k + 30)}%;animation-delay:-${L(0, 4, k + 60)}s"></i>`);
    if (jasno && (ile < 2 || skrzydlo === 1)) h.push(noc && pora === "noc" ? '<i class="ksiezyc"></i>' : pora === "noc" ? "" : `<i class="slonce${pora === "dzien" ? "" : " nisko"}"></i>`);
    const nc = { chmurki: 2, wiatr: 3, chmury: 4, mgla: 2, deszcz: 4, ulewa: 5, burza: 5, snieg: 4, deszczsnieg: 4 }[rodzaj] || 0;
    const kol = noc ? ciemne ? "#262b34" : "#39404f" : rodzaj === "burza" ? "#4a5159" : rodzaj === "ulewa" ? "#69727a" : ciemne ? "#8a939b" : jasno ? "#ffffff" : "#e3e7ea";
    for (let k = 0; k < nc; k++) {
      const t = rodzaj === "wiatr" ? L(10, 16, k + 5) : L(45, 80, k + 5);
      h.push(`<i class="chm" style="top:${L(-3, 32, k + 9)}%;width:${L(45, 75, k + 3)}%;background:${kol};opacity:${L(0.82, 0.97, k).toFixed(2)};animation-duration:${t.toFixed(1)}s;animation-delay:-${L(0, t, k + 7).toFixed(1)}s"></i>`);
    }
    if (rodzaj === "mgla") for (let k = 0; k < 4; k++) h.push(`<i class="mg" style="top:${12 + k * 22}%;animation-duration:${L(14, 24, k)}s;animation-delay:-${L(0, 10, k + 2)}s"></i>`);
    const krople = { deszcz: 22, ulewa: 40, burza: 34, deszczsnieg: 14 }[rodzaj] || 0;
    for (let k = 0; k < krople; k++) h.push(`<i class="kr" style="left:${L(-5, 105, k)}%;animation-duration:${L(rodzaj === "ulewa" ? 0.45 : 0.6, rodzaj === "ulewa" ? 0.65 : 0.9, k + 40).toFixed(2)}s;animation-delay:-${L(0, 1, k + 80).toFixed(2)}s"></i>`);
    const platki = { snieg: 26, deszczsnieg: 10 }[rodzaj] || 0;
    for (let k = 0; k < platki; k++) {
      const r = L(2, 4.6, k + 3).toFixed(1);
      h.push(`<i class="pl" style="left:${L(0, 100, k)}%;width:${r}px;height:${r}px;animation-duration:${L(5, 10, k + 9).toFixed(1)}s;animation-delay:-${L(0, 10, k + 19).toFixed(1)}s"></i>`);
    }
    if (rodzaj === "burza") h.push('<i class="bl"></i>');
    return h.join("");
  }
  function widokSvg(rodzaj, pora, skrzydlo, ile) {
    const o = osiedle(rodzaj, pora);
    const vb = ile > 1 ? `${skrzydlo ? 100 : 0} 0 100 100` : "0 0 200 100";
    const pa = `${ile > 1 ? skrzydlo ? "xMinYMax" : "xMaxYMax" : "xMidYMax"} slice`;
    return `<svg class="osiedle" viewBox="${vb}" preserveAspectRatio="${pa}" aria-hidden="true"><g style="filter:${o.filtr}">${o.tlo}</g>` + (o.swiatla ? `<defs><radialGradient id="mhLampa"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient></defs>${o.swiatla}` : "") + "</svg>";
  }

  // src/ruch.js
  var PAMIEC = "motor-ha-czas:";
  function czasPrzejazdu(ustawiony, obroty2, encja) {
    if (+ustawiony > 0) return Math.max(3, +ustawiony);
    if (obroty2 > 0) return 20.2 + 394 / obroty2;
    const n = nauczony(encja);
    return n > 0 ? n : 30;
  }
  function nauczony(encja) {
    try {
      return +localStorage.getItem(PAMIEC + encja) || 0;
    } catch (e) {
      return 0;
    }
  }
  function zapamietaj(encja, s) {
    try {
      localStorage.setItem(PAMIEC + encja, s.toFixed(1));
    } catch (e) {
    }
  }
  var Ruch = class {
    constructor(encja) {
      this.encja = encja;
      this.widac = null;
      this.cel = null;
      this.czas = 30;
      this.komenda = null;
      this.dociagnij = false;
      this.nauka = null;
      this.stan = null;
    }
    get jedzie() {
      return this.widac !== null && this.cel !== null && Math.abs(this.cel - this.widac) > 0.3;
    }
    // użytkownik wydał polecenie (null = stop)
    polecenie(cel, teraz) {
      if (this.widac === null) return;
      if (cel === null) {
        this.cel = this.widac;
        this.komenda = { cel: Math.round(this.widac), od: teraz, do: teraz + 2500, stop: true };
        return;
      }
      const trwa = Math.abs(cel - this.widac) / 100 * this.czas * 1e3;
      this.cel = cel;
      this.dociagnij = false;
      this.komenda = { cel, od: teraz, do: teraz + trwa + 3e3, koniec: teraz + trwa * 2 + 1e4 };
    }
    // nowy stan encji osłony z Home Assistanta
    meldunek(st, teraz, odwroc) {
      if (!st) return;
      let p = st.attributes?.current_position;
      if (typeof p === "number" && odwroc) p = 100 - p;
      const s = st.state, poprzedni = this.stan;
      this.stan = s;
      if (typeof p !== "number") p = s === "closed" ? 0 : s === "open" ? 100 : null;
      if (this.widac === null) {
        this.widac = this.cel = p ?? 0;
        return;
      }
      if ((s === "opening" || s === "closing") && !this.nauka) this.nauka = { t: teraz, p: this.widac };
      if (s !== "opening" && s !== "closing" && this.nauka) {
        const dp = typeof p === "number" ? Math.abs(p - this.nauka.p) : 0, dt = (teraz - this.nauka.t) / 1e3;
        if (dp >= 30 && dt > 2) {
          const v = dt * 100 / dp, n = nauczony(this.encja);
          zapamietaj(this.encja, n ? n * 0.6 + v * 0.4 : v);
        }
        this.nauka = null;
      }
      if (s === "opening" || s === "closing") {
        if (!this.komenda || this.komenda.stop) {
          this.cel = s === "opening" ? 100 : 0;
          this.komenda = null;
        }
        return;
      }
      if (p === null) return;
      const k = this.komenda;
      if (k) {
        const zatrzymal = poprzedni === "opening" || poprzedni === "closing";
        if (!zatrzymal && teraz < k.do && Math.abs(p - k.cel) > 2) return;
        this.komenda = null;
      }
      if (Math.abs(p - this.widac) > 0.5) {
        this.cel = p;
        this.dociagnij = !k;
      } else this.cel = p;
    }
    // jedna klatka animacji; zwraca true, gdy jeszcze się rusza
    krok(dt, teraz) {
      if (this.widac === null) return false;
      if (this.komenda && this.komenda.koniec && teraz > this.komenda.koniec) this.komenda = null;
      if (this.komenda?.stop && teraz > this.komenda.do) this.komenda = null;
      const d = this.cel - this.widac;
      if (Math.abs(d) < 0.2) {
        this.widac = this.cel;
        this.dociagnij = false;
        return false;
      }
      const v = 100 / this.czas, szybko = this.dociagnij ? Math.max(v, Math.abs(d) * 4) : v;
      this.widac += Math.sign(d) * Math.min(Math.abs(d), szybko * dt);
      return true;
    }
  };

  // src/wykryj.js
  var obszar = (h, id) => {
    const e = h?.entities?.[id];
    return e?.area_id || h?.devices?.[e?.device_id]?.area_id || null;
  };
  var nazwa = (h, id) => `${id} ${h?.states?.[id]?.attributes?.friendly_name || ""}`.toLowerCase();
  var PREDKOSC = /speed|predkos|prędkoś|rpm|obrot/i;
  function encjaPredkosci(h, roleta, wybrana) {
    if (wybrana) return wybrana;
    const dev = h?.entities?.[roleta]?.device_id;
    if (dev) {
      const z = Object.keys(h.entities).find((k) => k.startsWith("number.") && h.entities[k].device_id === dev && PREDKOSC.test(k));
      if (z) return z;
    }
    const g = String(roleta).replace("cover.", "number.") + "_motor_speed";
    return h?.states?.[g] ? g : null;
  }
  var obroty = (h, roleta, wybrana) => parseFloat(h?.states?.[encjaPredkosci(h, roleta, wybrana)]?.state) || 0;
  function czujnikiOkna(h, roleta) {
    const a = obszar(h, roleta);
    if (!a || !h?.entities) return [];
    const lista = Object.keys(h.entities).filter((k) => k.startsWith("binary_sensor.") && obszar(h, k) === a && ["window", "door", "opening"].includes(h.states[k]?.attributes?.device_class)).sort();
    const l = lista.find((k) => /lew|left/.test(nazwa(h, k))), p = lista.find((k) => /praw|right/.test(nazwa(h, k)));
    if (l || p) return [l || lista.find((k) => k !== p), p || lista.find((k) => k !== l)];
    return lista.slice(0, 2);
  }
  function encjaPogody(h, wybrana) {
    if (wybrana && wybrana !== "auto") return wybrana;
    const s = h?.states || {};
    return ["weather.forecast_home", "weather.home", "weather.dom"].find((k) => s[k]) || Object.keys(s).find((k) => k.startsWith("weather.")) || null;
  }
  var NET = { t: 0, dane: null, trwa: false, czeka: /* @__PURE__ */ new Set() };
  var zWmo = (k, dzien, wiatr) => {
    const s = k === 0 ? dzien ? "sunny" : "clear-night" : k <= 2 ? "partlycloudy" : k === 3 ? "cloudy" : k <= 48 ? "fog" : k <= 63 || k === 80 || k === 81 ? "rainy" : k === 65 || k === 82 ? "pouring" : k <= 67 ? "snowy-rainy" : k <= 77 || k === 85 || k === 86 ? "snowy" : k === 95 ? "lightning-rainy" : k >= 96 ? "hail" : "cloudy";
    return wiatr > 40 && ["sunny", "partlycloudy", "cloudy"].includes(s) ? "windy" : s;
  };
  function pogodaZInternetu(h, gotowe) {
    const lat = h?.config?.latitude, lon = h?.config?.longitude;
    if (lat == null || lon == null) return null;
    if (Date.now() - NET.t < 15 * 6e4) return NET.dane;
    NET.czeka.add(gotowe);
    if (!NET.trwa) {
      NET.trwa = true;
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,is_day,wind_speed_10m`).then((r) => r.json()).then((j) => {
        const c = j.current;
        NET.dane = { state: zWmo(c.weather_code, c.is_day, c.wind_speed_10m), attributes: { temperature: c.temperature_2m, temperature_unit: "°C" } };
      }).catch(() => {
      }).finally(() => {
        NET.t = Date.now();
        NET.trwa = false;
        NET.czeka.forEach((f) => f());
        NET.czeka.clear();
      });
    }
    return NET.dane;
  }
  function oslonyDoWyboru(h) {
    const s = h?.states || {};
    const pkt = (id) => (s[id].attributes?.motor_ha ? 100 : 0) + ((s[id].attributes?.entity_id || []).length > 1 ? 40 : 0) + (s[id].attributes?.supported_features & 4 ? 10 : 0);
    return Object.keys(s).filter((k) => k.startsWith("cover.") && !["garage", "gate", "door", "damper"].includes(s[k].attributes?.device_class)).sort((a, b) => pkt(b) - pkt(a) || a.localeCompare(b));
  }

  // tlumaczenia/pl.json
  var pl_default = {
    nazwa: "Motor HA",
    opis: "Okno z osłoną: ruch w tempie silnika, pogoda i pora dnia za szybą, czujniki okna.",
    karta: {
      oba: "Przeciągnij, żeby przesunąć obie osłony",
      otworz: "Otwórz",
      stop: "Stop",
      zamknij: "Zamknij",
      zwinieta: "Zwinięta",
      opuszczona: "Opuszczona",
      brak: "Nie ma takiej encji",
      okno: "Okno",
      lewe: "lewe",
      prawe: "prawe",
      otwarte: "otwarte",
      uchylone: "uchylone",
      pozycja: "Pozycja"
    },
    kroki: {
      urzadzenie: {
        t: "Urządzenie",
        co: "Wybierz osłonę z Home Assistanta i nadaj oknu nazwę.",
        poco: "Karta steruje tą osłoną i pokazuje jej prawdziwą pozycję."
      },
      oslona: {
        t: "Osłona",
        co: "Wybierz rodzaj osłony, taki jak masz w domu.",
        poco: "Karta narysuje ten materiał. Osłony zewnętrzne widać od strony elewacji."
      },
      kolory: {
        t: "Kolory",
        co: "Wybierz kolor osłony i kolor ramy okna.",
        poco: "Okno na ekranie wygląda jak Twoje prawdziwe okno."
      },
      okno: {
        t: "Okno",
        co: "Ustaw liczbę skrzydeł, wysokość i przyciski.",
        poco: "Każde skrzydło może mieć własną osłonę i jeździć osobno."
      },
      czujniki: {
        t: "Czujniki",
        co: "Wybierz czujniki otwarcia okna (kontaktrony).",
        poco: "Karta pokaże skrzydło uchylone albo otwarte."
      },
      silnik: {
        t: "Silnik",
        co: "Podaj prędkość silnika albo czas pełnego przejazdu.",
        poco: "Osłona na ekranie jedzie tak szybko jak prawdziwa."
      },
      pogoda: {
        t: "Pogoda",
        co: "Wybierz pogodę za oknem i język karty.",
        poco: "Za szybą widać słońce, deszcz, śnieg, mgłę, dzień i noc."
      }
    },
    ui: {
      krok: "Krok {0} z {1}",
      co: "Co:",
      poco: "Po co:",
      wstecz: "Wstecz",
      dalej: "Dalej",
      wUrzadzeniu: "To okno z integracji Motor HA. Zmiany zapisują się od razu w urządzeniu okna, więc każda karta tego okna wygląda tak samo.",
      bezUrzadzenia: "Możesz wybrać dowolną osłonę. Okno dodane w integracji Motor HA ma też kalibrację i zapisuje ustawienia w urządzeniu.",
      wybrany: "Wybrano:",
      jedno: "Jedno skrzydło",
      dwa: "Dwa skrzydła",
      sterowanie: "Sterowanie",
      uchyl: "Uchyla się",
      otworz: "Otwiera się",
      znalezione: "Znalezione same w tym pomieszczeniu: {0}",
      brakCzujnikow: "W pomieszczeniu tej osłony nie ma czujników okna. Możesz wybrać je ręcznie.",
      czasReczny: "Pełny przejazd: {0} s (ustawione ręcznie).",
      czasZPredkosci: "Pełny przejazd: {0} s (z prędkości silnika {1} obr/min).",
      czasNauczony: "Pełny przejazd: {0} s (karta nauczyła się z prawdziwych ruchów).",
      czasDomyslny: "Pełny przejazd: {0} s. Karta sama nauczy się prawdziwego czasu po kilku ruchach.",
      jezykAuto: "Jak w profilu Home Assistanta",
      pogodaZ: "Pogoda z: {0}",
      pogodaInternet: "W Home Assistancie nie ma encji pogody. Karta weźmie pogodę z internetu (Open-Meteo) dla lokalizacji domu."
    },
    pola: {
      entity: "Osłona",
      name: "Nazwa okna",
      kolor: "Kolor osłony",
      rama: "Kolor ramy",
      kolor_wlasny: "Własny kolor osłony",
      rama_wlasna: "Własny kolor ramy",
      skrzydla: "Skrzydła",
      wysokosc: "Wysokość okna",
      roleta_lewa: "Osłona lewego skrzydła",
      roleta_prawa: "Osłona prawego skrzydła",
      odwroc: "Odwróć pozycję",
      osobno: "Każde skrzydło osobno",
      przyciski: "Przyciski",
      suwak: "Suwak pozycji",
      pozycje: "Gotowe pozycje",
      wibracja: "Wibracja przy dotyku",
      auto_czujniki: "Szukaj czujników samemu",
      czujnik_lewe: "Czujnik lewego skrzydła",
      tryb_lewe: "Lewe skrzydło",
      czujnik_prawe: "Czujnik prawego skrzydła",
      tryb_prawe: "Prawe skrzydło",
      predkosc_lewa: "Prędkość silnika (lewa)",
      predkosc_prawa: "Prędkość silnika (prawa)",
      czas: "Czas przejazdu",
      niebo: "Pogoda za oknem",
      pogoda: "Encja pogody",
      widok: "Widok za oknem",
      jezyk: "Język karty"
    },
    pomoc: {
      entity: "Okno z Motor HA, grupa dwóch rolet albo jedna roleta.",
      roleta_lewa: "Puste = sama z okna albo grupy.",
      odwroc: "Gdy silnik melduje 100 % przy zamkniętej osłonie.",
      osobno: "Przeciąganie szyby rusza tylko to skrzydło.",
      pozycje: "Np. 100, 75, 50, 25, 0. Puste = bez przycisków pozycji.",
      auto_czujniki: "Czujniki okna z tego samego pomieszczenia.",
      predkosc_lewa: "Encja number z obrotami silnika (np. Moes, Tuya). Puste = sama z urządzenia.",
      czas: "0 = automatycznie.",
      pogoda: "Puste = pierwsza encja pogody w HA, a bez niej pogoda z internetu.",
      widok: "Rysowane osiedle, drzewa i latarnie."
    },
    grupy: {
      wew: "Wewnątrz pomieszczenia",
      zew: "Na zewnątrz",
      rolety: "Rolety",
      plisy: "Plisy i rzymskie",
      zaluzje: "Żaluzje",
      zrolety: "Rolety zewnętrzne",
      fasadowe: "Żaluzje fasadowe",
      taras: "Taras"
    },
    oslony: {
      pelna: "Roleta wolnowisząca",
      kasetowa: "Roleta w kasecie",
      zebra: "Dzień-noc",
      zaciemniajaca: "Zaciemniająca",
      plisa: "Plisa",
      plaster: "Plaster miodu",
      rzymska: "Rzymska",
      zaluzja: "Żaluzja aluminiowa",
      drewniana: "Żaluzja drewniana",
      natynkowa: "Roleta natynkowa",
      podtynkowa: "Roleta podtynkowa",
      zewnetrzna: "Roleta nadstawna",
      perforowana: "Roleta z perforacją",
      fasadowa: "Żaluzja fasadowa C80",
      fasadowaz: "Żaluzja fasadowa Z90",
      markiza: "Markiza tarasowa",
      screen: "Screen ZIP"
    },
    kolory: {
      czarny: "czarny",
      grafit: "grafit",
      szary: "szary",
      popiel: "popiel",
      srebrny: "srebrny",
      bialy: "biały",
      kremowy: "kremowy",
      piaskowy: "piaskowy",
      bezowy: "beżowy",
      cappuccino: "cappuccino",
      mokka: "mokka",
      braz: "brąz",
      wenge: "wenge",
      stalowy: "stalowy",
      granat: "granat",
      blekitny: "błękitny",
      niebieski: "niebieski",
      morski: "morski",
      turkus: "turkus",
      mietowy: "miętowy",
      zielony: "zielony",
      butelkowy: "butelkowa zieleń",
      oliwka: "oliwka",
      limonka: "limonka",
      zolty: "żółty",
      musztardowy: "musztardowy",
      pomaranczowy: "pomarańczowy",
      terakota: "terakota",
      czerwony: "czerwony",
      bordo: "bordo",
      pudrowy: "pudrowy róż",
      rozowy: "różowy",
      lawendowy: "lawendowy",
      fiolet: "fiolet",
      sliwkowy: "śliwkowy"
    },
    ramy: {
      biala: "biała",
      kremowa: "kremowa",
      jasnoszara: "jasnoszara",
      srebrna: "srebrna",
      szary_agat: "szary agat",
      szara: "szara",
      szary_kwarc: "szary kwarc",
      bazaltowa: "bazaltowa",
      antracyt: "antracyt",
      czarna: "czarna",
      zielona: "zielona",
      granatowa: "granatowa",
      bordowa: "bordowa",
      braz: "brąz",
      sosna: "sosna",
      dab_jasny: "dąb jasny",
      dab_sheffield: "dąb sheffield",
      winchester: "winchester",
      oregon: "oregon",
      zloty_dab: "złoty dąb",
      siena: "siena",
      orzech: "orzech",
      mahon: "mahoń",
      dab_bagienny: "dąb bagienny"
    }
  };

  // tlumaczenia/en.json
  var en_default = {
    nazwa: "Motor HA",
    opis: "A window with its shade: moves at your motor's speed, real weather and time of day outside, window sensors.",
    karta: {
      oba: "Drag to move both shades",
      otworz: "Open",
      stop: "Stop",
      zamknij: "Close",
      zwinieta: "Open",
      opuszczona: "Closed",
      brak: "Entity not found",
      okno: "Window",
      lewe: "left",
      prawe: "right",
      otwarte: "open",
      uchylone: "tilted",
      pozycja: "Position"
    },
    kroki: {
      urzadzenie: {
        t: "Device",
        co: "Pick a shade from Home Assistant and name the window.",
        poco: "The card controls this shade and shows its real position."
      },
      oslona: {
        t: "Shade",
        co: "Pick the shade type you have at home.",
        poco: "The card draws this material. Outdoor shades are shown from the facade."
      },
      kolory: {
        t: "Colours",
        co: "Pick the shade colour and the window frame colour.",
        poco: "The window on screen looks like your real one."
      },
      okno: {
        t: "Window",
        co: "Set the number of sashes, the height and the buttons.",
        poco: "Each sash can have its own shade and move on its own."
      },
      czujniki: {
        t: "Sensors",
        co: "Pick the window opening sensors (contact sensors).",
        poco: "The card shows a tilted or open sash."
      },
      silnik: {
        t: "Motor",
        co: "Enter the motor speed or the full travel time.",
        poco: "The shade on screen moves as fast as the real one."
      },
      pogoda: {
        t: "Weather",
        co: "Pick the weather outside and the card language.",
        poco: "Sun, rain, snow, fog, day and night behind the glass."
      }
    },
    ui: {
      krok: "Step {0} of {1}",
      co: "What:",
      poco: "Why:",
      wstecz: "Back",
      dalej: "Next",
      wUrzadzeniu: "This window comes from the Motor HA integration. Changes are saved straight to the window device, so every card of this window looks the same.",
      bezUrzadzenia: "You can pick any shade. A window added in the Motor HA integration also has calibration and keeps its settings in the device.",
      wybrany: "Selected:",
      jedno: "One sash",
      dwa: "Two sashes",
      sterowanie: "Controls",
      uchyl: "Tilts",
      otworz: "Opens",
      znalezione: "Found automatically in this room: {0}",
      brakCzujnikow: "There are no window sensors in this shade's room. You can pick them yourself.",
      czasReczny: "Full travel: {0} s (set manually).",
      czasZPredkosci: "Full travel: {0} s (from motor speed {1} rpm).",
      czasNauczony: "Full travel: {0} s (learned from real moves).",
      czasDomyslny: "Full travel: {0} s. The card learns the real time after a few moves.",
      jezykAuto: "As in the Home Assistant profile",
      pogodaZ: "Weather from: {0}",
      pogodaInternet: "There is no weather entity in Home Assistant. The card will get the weather from the internet (Open-Meteo) for your home location."
    },
    pola: {
      entity: "Shade",
      name: "Window name",
      kolor: "Shade colour",
      rama: "Frame colour",
      kolor_wlasny: "Custom shade colour",
      rama_wlasna: "Custom frame colour",
      skrzydla: "Sashes",
      wysokosc: "Window height",
      roleta_lewa: "Left sash shade",
      roleta_prawa: "Right sash shade",
      odwroc: "Invert position",
      osobno: "Each sash separately",
      przyciski: "Buttons",
      suwak: "Position slider",
      pozycje: "Preset positions",
      wibracja: "Vibrate on touch",
      auto_czujniki: "Find sensors automatically",
      czujnik_lewe: "Left sash sensor",
      tryb_lewe: "Left sash",
      czujnik_prawe: "Right sash sensor",
      tryb_prawe: "Right sash",
      predkosc_lewa: "Motor speed (left)",
      predkosc_prawa: "Motor speed (right)",
      czas: "Travel time",
      niebo: "Weather outside",
      pogoda: "Weather entity",
      widok: "View outside",
      jezyk: "Card language"
    },
    pomoc: {
      entity: "A Motor HA window, a group of two blinds or a single blind.",
      roleta_lewa: "Empty = taken from the window or group.",
      odwroc: "When the motor reports 100 % with the shade closed.",
      osobno: "Dragging the glass moves only this sash.",
      pozycje: "E.g. 100, 75, 50, 25, 0. Empty = no position buttons.",
      auto_czujniki: "Window sensors from the same room.",
      predkosc_lewa: "A number entity with the motor speed (e.g. Moes, Tuya). Empty = found on the device.",
      czas: "0 = automatic.",
      pogoda: "Empty = the first weather entity in HA, otherwise weather from the internet.",
      widok: "Drawn houses, trees and street lamps."
    },
    grupy: {
      wew: "Indoor",
      zew: "Outdoor",
      rolety: "Roller blinds",
      plisy: "Pleated and Roman",
      zaluzje: "Venetian blinds",
      zrolety: "Roller shutters",
      fasadowe: "External venetian blinds",
      taras: "Terrace"
    },
    oslony: {
      pelna: "Free-hanging roller blind",
      kasetowa: "Cassette roller blind",
      zebra: "Day-night blind",
      zaciemniajaca: "Blackout blind",
      plisa: "Pleated blind",
      plaster: "Honeycomb blind",
      rzymska: "Roman blind",
      zaluzja: "Aluminium venetian",
      drewniana: "Wooden venetian",
      natynkowa: "Surface-mounted shutter",
      podtynkowa: "Concealed shutter",
      zewnetrzna: "Top-mounted shutter",
      perforowana: "Perforated shutter",
      fasadowa: "External venetian C80",
      fasadowaz: "External venetian Z90",
      markiza: "Terrace awning",
      screen: "ZIP screen"
    },
    kolory: {
      czarny: "black",
      grafit: "graphite",
      szary: "grey",
      popiel: "ash",
      srebrny: "silver",
      bialy: "white",
      kremowy: "cream",
      piaskowy: "sand",
      bezowy: "beige",
      cappuccino: "cappuccino",
      mokka: "mocha",
      braz: "brown",
      wenge: "wenge",
      stalowy: "steel",
      granat: "navy",
      blekitny: "sky blue",
      niebieski: "blue",
      morski: "sea green",
      turkus: "turquoise",
      mietowy: "mint",
      zielony: "green",
      butelkowy: "bottle green",
      oliwka: "olive",
      limonka: "lime",
      zolty: "yellow",
      musztardowy: "mustard",
      pomaranczowy: "orange",
      terakota: "terracotta",
      czerwony: "red",
      bordo: "burgundy",
      pudrowy: "powder pink",
      rozowy: "pink",
      lawendowy: "lavender",
      fiolet: "violet",
      sliwkowy: "plum"
    },
    ramy: {
      biala: "white",
      kremowa: "cream",
      jasnoszara: "light grey",
      srebrna: "silver",
      szary_agat: "agate grey",
      szara: "grey",
      szary_kwarc: "quartz grey",
      bazaltowa: "basalt grey",
      antracyt: "anthracite",
      czarna: "black",
      zielona: "green",
      granatowa: "navy",
      bordowa: "burgundy",
      braz: "brown",
      sosna: "pine",
      dab_jasny: "light oak",
      dab_sheffield: "Sheffield oak",
      winchester: "Winchester",
      oregon: "Oregon",
      zloty_dab: "golden oak",
      siena: "Siena",
      orzech: "walnut",
      mahon: "mahogany",
      dab_bagienny: "bog oak"
    }
  };

  // tlumaczenia/de.json
  var de_default = {
    nazwa: "Motor HA",
    opis: "Ein Fenster mit Behang: fährt im Tempo des Motors, echtes Wetter und Tageszeit draußen, Fenstersensoren.",
    karta: {
      oba: "Ziehen, um beide Behänge zu bewegen",
      otworz: "Öffnen",
      stop: "Stopp",
      zamknij: "Schließen",
      zwinieta: "Offen",
      opuszczona: "Geschlossen",
      brak: "Entität nicht gefunden",
      okno: "Fenster",
      lewe: "links",
      prawe: "rechts",
      otwarte: "offen",
      uchylone: "gekippt",
      pozycja: "Position"
    },
    kroki: {
      urzadzenie: {
        t: "Gerät",
        co: "Wähle einen Behang aus Home Assistant und gib dem Fenster einen Namen.",
        poco: "Die Karte steuert diesen Behang und zeigt seine echte Position."
      },
      oslona: {
        t: "Behang",
        co: "Wähle die Art des Behangs, die du zu Hause hast.",
        poco: "Die Karte zeichnet dieses Material. Außenbehänge werden von der Fassade aus gezeigt."
      },
      kolory: {
        t: "Farben",
        co: "Wähle die Farbe des Behangs und des Fensterrahmens.",
        poco: "Das Fenster auf dem Bildschirm sieht aus wie dein echtes."
      },
      okno: {
        t: "Fenster",
        co: "Lege Anzahl der Flügel, Höhe und Tasten fest.",
        poco: "Jeder Flügel kann einen eigenen Behang haben und einzeln fahren."
      },
      czujniki: {
        t: "Sensoren",
        co: "Wähle die Fensterkontakte.",
        poco: "Die Karte zeigt einen gekippten oder offenen Flügel."
      },
      silnik: {
        t: "Motor",
        co: "Gib die Motorgeschwindigkeit oder die volle Fahrzeit an.",
        poco: "Der Behang auf dem Bildschirm fährt so schnell wie der echte."
      },
      pogoda: {
        t: "Wetter",
        co: "Wähle das Wetter draußen und die Sprache der Karte.",
        poco: "Sonne, Regen, Schnee, Nebel, Tag und Nacht hinter der Scheibe."
      }
    },
    ui: {
      krok: "Schritt {0} von {1}",
      co: "Was:",
      poco: "Wozu:",
      wstecz: "Zurück",
      dalej: "Weiter",
      wUrzadzeniu: "Dieses Fenster stammt aus der Integration Motor HA. Änderungen werden sofort im Fenstergerät gespeichert, daher sieht jede Karte dieses Fensters gleich aus.",
      bezUrzadzenia: "Du kannst jeden Behang wählen. Ein in der Integration Motor HA hinzugefügtes Fenster hat zusätzlich eine Kalibrierung und speichert seine Einstellungen im Gerät.",
      wybrany: "Gewählt:",
      jedno: "Ein Flügel",
      dwa: "Zwei Flügel",
      sterowanie: "Bedienung",
      uchyl: "Kippt",
      otworz: "Öffnet",
      znalezione: "Automatisch in diesem Raum gefunden: {0}",
      brakCzujnikow: "Im Raum dieses Behangs gibt es keine Fenstersensoren. Du kannst sie selbst auswählen.",
      czasReczny: "Volle Fahrt: {0} s (manuell eingestellt).",
      czasZPredkosci: "Volle Fahrt: {0} s (aus der Motorgeschwindigkeit {1} U/min).",
      czasNauczony: "Volle Fahrt: {0} s (aus echten Fahrten gelernt).",
      czasDomyslny: "Volle Fahrt: {0} s. Die Karte lernt die echte Zeit nach einigen Fahrten.",
      jezykAuto: "Wie im Home-Assistant-Profil",
      pogodaZ: "Wetter von: {0}",
      pogodaInternet: "In Home Assistant gibt es keine Wetter-Entität. Die Karte holt das Wetter aus dem Internet (Open-Meteo) für deinen Standort."
    },
    pola: {
      entity: "Behang",
      name: "Name des Fensters",
      kolor: "Farbe des Behangs",
      rama: "Rahmenfarbe",
      kolor_wlasny: "Eigene Behangfarbe",
      rama_wlasna: "Eigene Rahmenfarbe",
      skrzydla: "Flügel",
      wysokosc: "Fensterhöhe",
      roleta_lewa: "Behang linker Flügel",
      roleta_prawa: "Behang rechter Flügel",
      odwroc: "Position umkehren",
      osobno: "Jeder Flügel einzeln",
      przyciski: "Tasten",
      suwak: "Positionsregler",
      pozycje: "Feste Positionen",
      wibracja: "Vibration bei Berührung",
      auto_czujniki: "Sensoren automatisch suchen",
      czujnik_lewe: "Sensor linker Flügel",
      tryb_lewe: "Linker Flügel",
      czujnik_prawe: "Sensor rechter Flügel",
      tryb_prawe: "Rechter Flügel",
      predkosc_lewa: "Motorgeschwindigkeit (links)",
      predkosc_prawa: "Motorgeschwindigkeit (rechts)",
      czas: "Fahrzeit",
      niebo: "Wetter draußen",
      pogoda: "Wetter-Entität",
      widok: "Aussicht",
      jezyk: "Sprache der Karte"
    },
    pomoc: {
      entity: "Ein Fenster aus Motor HA, eine Gruppe aus zwei Rollos oder ein einzelnes Rollo.",
      roleta_lewa: "Leer = aus dem Fenster oder der Gruppe.",
      odwroc: "Wenn der Motor bei geschlossenem Behang 100 % meldet.",
      osobno: "Ziehen an der Scheibe bewegt nur diesen Flügel.",
      pozycje: "Z. B. 100, 75, 50, 25, 0. Leer = keine Positionstasten.",
      auto_czujniki: "Fenstersensoren aus demselben Raum.",
      predkosc_lewa: "Eine Number-Entität mit der Motordrehzahl (z. B. Moes, Tuya). Leer = vom Gerät.",
      czas: "0 = automatisch.",
      pogoda: "Leer = erste Wetter-Entität in HA, sonst Wetter aus dem Internet.",
      widok: "Gezeichnete Häuser, Bäume und Laternen."
    },
    grupy: {
      wew: "Innen",
      zew: "Außen",
      rolety: "Rollos",
      plisy: "Plissees und Raffrollos",
      zaluzje: "Jalousien",
      zrolety: "Rollläden",
      fasadowe: "Raffstores",
      taras: "Terrasse"
    },
    oslony: {
      pelna: "Freihängendes Rollo",
      kasetowa: "Kassettenrollo",
      zebra: "Doppelrollo",
      zaciemniajaca: "Verdunkelungsrollo",
      plisa: "Plissee",
      plaster: "Wabenplissee",
      rzymska: "Raffrollo",
      zaluzja: "Aluminium-Jalousie",
      drewniana: "Holzjalousie",
      natynkowa: "Vorbaurollladen",
      podtynkowa: "Unterputz-Rollladen",
      zewnetrzna: "Aufsatzrollladen",
      perforowana: "Lochrollladen",
      fasadowa: "Raffstore C80",
      fasadowaz: "Raffstore Z90",
      markiza: "Terrassenmarkise",
      screen: "ZIP-Screen"
    },
    kolory: {
      czarny: "schwarz",
      grafit: "graphit",
      szary: "grau",
      popiel: "aschgrau",
      srebrny: "silber",
      bialy: "weiß",
      kremowy: "creme",
      piaskowy: "sand",
      bezowy: "beige",
      cappuccino: "cappuccino",
      mokka: "mokka",
      braz: "braun",
      wenge: "wenge",
      stalowy: "stahlblau",
      granat: "marineblau",
      blekitny: "himmelblau",
      niebieski: "blau",
      morski: "petrol",
      turkus: "türkis",
      mietowy: "mint",
      zielony: "grün",
      butelkowy: "flaschengrün",
      oliwka: "oliv",
      limonka: "limette",
      zolty: "gelb",
      musztardowy: "senf",
      pomaranczowy: "orange",
      terakota: "terrakotta",
      czerwony: "rot",
      bordo: "bordeaux",
      pudrowy: "puderrosa",
      rozowy: "pink",
      lawendowy: "lavendel",
      fiolet: "violett",
      sliwkowy: "pflaume"
    },
    ramy: {
      biala: "weiß",
      kremowa: "cremeweiß",
      jasnoszara: "lichtgrau",
      srebrna: "silber",
      szary_agat: "achatgrau",
      szara: "grau",
      szary_kwarc: "quarzgrau",
      bazaltowa: "basaltgrau",
      antracyt: "anthrazit",
      czarna: "schwarz",
      zielona: "grün",
      granatowa: "stahlblau",
      bordowa: "weinrot",
      braz: "braun",
      sosna: "Kiefer",
      dab_jasny: "Eiche hell",
      dab_sheffield: "Sheffield Oak",
      winchester: "Winchester",
      oregon: "Oregon",
      zloty_dab: "Golden Oak",
      siena: "Siena",
      orzech: "Nussbaum",
      mahon: "Mahagoni",
      dab_bagienny: "Mooreiche"
    }
  };

  // tlumaczenia/fr.json
  var fr_default = {
    nazwa: "Motor HA",
    opis: "Une fenêtre avec son store : il bouge à la vitesse du moteur, vraie météo et moment de la journée dehors, capteurs de fenêtre.",
    karta: {
      oba: "Glisser pour déplacer les deux stores",
      otworz: "Ouvrir",
      stop: "Stop",
      zamknij: "Fermer",
      zwinieta: "Ouvert",
      opuszczona: "Fermé",
      brak: "Entité introuvable",
      okno: "Fenêtre",
      lewe: "gauche",
      prawe: "droite",
      otwarte: "ouverte",
      uchylone: "entrouverte",
      pozycja: "Position"
    },
    kroki: {
      urzadzenie: {
        t: "Appareil",
        co: "Choisis un store dans Home Assistant et donne un nom à la fenêtre.",
        poco: "La carte pilote ce store et montre sa vraie position."
      },
      oslona: {
        t: "Store",
        co: "Choisis le type de store que tu as chez toi.",
        poco: "La carte dessine ce matériau. Les stores extérieurs sont vus depuis la façade."
      },
      kolory: {
        t: "Couleurs",
        co: "Choisis la couleur du store et celle du cadre.",
        poco: "La fenêtre à l'écran ressemble à ta vraie fenêtre."
      },
      okno: {
        t: "Fenêtre",
        co: "Règle le nombre de vantaux, la hauteur et les boutons.",
        poco: "Chaque vantail peut avoir son propre store et bouger seul."
      },
      czujniki: {
        t: "Capteurs",
        co: "Choisis les capteurs d'ouverture de fenêtre.",
        poco: "La carte montre un vantail entrouvert ou ouvert."
      },
      silnik: {
        t: "Moteur",
        co: "Indique la vitesse du moteur ou le temps de course complet.",
        poco: "Le store à l'écran bouge aussi vite que le vrai."
      },
      pogoda: {
        t: "Météo",
        co: "Choisis la météo dehors et la langue de la carte.",
        poco: "Soleil, pluie, neige, brouillard, jour et nuit derrière la vitre."
      }
    },
    ui: {
      krok: "Étape {0} sur {1}",
      co: "Quoi :",
      poco: "Pourquoi :",
      wstecz: "Retour",
      dalej: "Suivant",
      wUrzadzeniu: "Cette fenêtre vient de l'intégration Motor HA. Les changements sont enregistrés tout de suite dans l'appareil de la fenêtre, donc chaque carte de cette fenêtre est identique.",
      bezUrzadzenia: "Tu peux choisir n'importe quel store. Une fenêtre ajoutée dans l'intégration Motor HA a en plus l'étalonnage et garde ses réglages dans l'appareil.",
      wybrany: "Choisi :",
      jedno: "Un vantail",
      dwa: "Deux vantaux",
      sterowanie: "Commandes",
      uchyl: "S'entrouvre",
      otworz: "S'ouvre",
      znalezione: "Trouvés automatiquement dans cette pièce : {0}",
      brakCzujnikow: "Il n'y a pas de capteur de fenêtre dans la pièce de ce store. Tu peux les choisir toi-même.",
      czasReczny: "Course complète : {0} s (réglée à la main).",
      czasZPredkosci: "Course complète : {0} s (d'après la vitesse du moteur {1} tr/min).",
      czasNauczony: "Course complète : {0} s (apprise des vrais mouvements).",
      czasDomyslny: "Course complète : {0} s. La carte apprend le vrai temps après quelques mouvements.",
      jezykAuto: "Comme dans le profil Home Assistant",
      pogodaZ: "Météo de : {0}",
      pogodaInternet: "Il n'y a pas d'entité météo dans Home Assistant. La carte prendra la météo sur internet (Open-Meteo) pour l'emplacement de la maison."
    },
    pola: {
      entity: "Store",
      name: "Nom de la fenêtre",
      kolor: "Couleur du store",
      rama: "Couleur du cadre",
      kolor_wlasny: "Couleur de store personnalisée",
      rama_wlasna: "Couleur de cadre personnalisée",
      skrzydla: "Vantaux",
      wysokosc: "Hauteur de la fenêtre",
      roleta_lewa: "Store du vantail gauche",
      roleta_prawa: "Store du vantail droit",
      odwroc: "Inverser la position",
      osobno: "Chaque vantail séparément",
      przyciski: "Boutons",
      suwak: "Curseur de position",
      pozycje: "Positions prédéfinies",
      wibracja: "Vibration au toucher",
      auto_czujniki: "Chercher les capteurs automatiquement",
      czujnik_lewe: "Capteur du vantail gauche",
      tryb_lewe: "Vantail gauche",
      czujnik_prawe: "Capteur du vantail droit",
      tryb_prawe: "Vantail droit",
      predkosc_lewa: "Vitesse du moteur (gauche)",
      predkosc_prawa: "Vitesse du moteur (droite)",
      czas: "Temps de course",
      niebo: "Météo dehors",
      pogoda: "Entité météo",
      widok: "Vue dehors",
      jezyk: "Langue de la carte"
    },
    pomoc: {
      entity: "Une fenêtre Motor HA, un groupe de deux stores ou un seul store.",
      roleta_lewa: "Vide = pris de la fenêtre ou du groupe.",
      odwroc: "Quand le moteur indique 100 % avec le store fermé.",
      osobno: "Glisser sur la vitre ne déplace que ce vantail.",
      pozycje: "Par ex. 100, 75, 50, 25, 0. Vide = pas de boutons de position.",
      auto_czujniki: "Capteurs de fenêtre de la même pièce.",
      predkosc_lewa: "Une entité number avec la vitesse du moteur (par ex. Moes, Tuya). Vide = trouvée sur l'appareil.",
      czas: "0 = automatique.",
      pogoda: "Vide = la première entité météo dans HA, sinon la météo d'internet.",
      widok: "Maisons, arbres et lampadaires dessinés."
    },
    grupy: {
      wew: "Intérieur",
      zew: "Extérieur",
      rolety: "Stores enrouleurs",
      plisy: "Plissés et bateaux",
      zaluzje: "Stores vénitiens",
      zrolety: "Volets roulants",
      fasadowe: "Brise-soleil orientables",
      taras: "Terrasse"
    },
    oslony: {
      pelna: "Store enrouleur libre",
      kasetowa: "Store enrouleur à coffre",
      zebra: "Store jour-nuit",
      zaciemniajaca: "Store occultant",
      plisa: "Store plissé",
      plaster: "Store nid d'abeille",
      rzymska: "Store bateau",
      zaluzja: "Store vénitien alu",
      drewniana: "Store vénitien bois",
      natynkowa: "Volet roulant en applique",
      podtynkowa: "Volet roulant encastré",
      zewnetrzna: "Volet roulant coffre tunnel",
      perforowana: "Volet roulant ajouré",
      fasadowa: "Brise-soleil C80",
      fasadowaz: "Brise-soleil Z90",
      markiza: "Store banne",
      screen: "Screen ZIP"
    },
    kolory: {
      czarny: "noir",
      grafit: "graphite",
      szary: "gris",
      popiel: "cendre",
      srebrny: "argent",
      bialy: "blanc",
      kremowy: "crème",
      piaskowy: "sable",
      bezowy: "beige",
      cappuccino: "cappuccino",
      mokka: "moka",
      braz: "marron",
      wenge: "wengé",
      stalowy: "acier",
      granat: "marine",
      blekitny: "bleu ciel",
      niebieski: "bleu",
      morski: "bleu canard",
      turkus: "turquoise",
      mietowy: "menthe",
      zielony: "vert",
      butelkowy: "vert bouteille",
      oliwka: "olive",
      limonka: "citron vert",
      zolty: "jaune",
      musztardowy: "moutarde",
      pomaranczowy: "orange",
      terakota: "terre cuite",
      czerwony: "rouge",
      bordo: "bordeaux",
      pudrowy: "rose poudré",
      rozowy: "rose",
      lawendowy: "lavande",
      fiolet: "violet",
      sliwkowy: "prune"
    },
    ramy: {
      biala: "blanc",
      kremowa: "crème",
      jasnoszara: "gris clair",
      srebrna: "argent",
      szary_agat: "gris agate",
      szara: "gris",
      szary_kwarc: "gris quartz",
      bazaltowa: "gris basalte",
      antracyt: "anthracite",
      czarna: "noir",
      zielona: "vert",
      granatowa: "bleu marine",
      bordowa: "bordeaux",
      braz: "marron",
      sosna: "pin",
      dab_jasny: "chêne clair",
      dab_sheffield: "chêne Sheffield",
      winchester: "Winchester",
      oregon: "Oregon",
      zloty_dab: "chêne doré",
      siena: "Sienne",
      orzech: "noyer",
      mahon: "acajou",
      dab_bagienny: "chêne des marais"
    }
  };

  // tlumaczenia/cs.json
  var cs_default = {
    nazwa: "Motor HA",
    opis: "Okno se stíněním: jede rychlostí motoru, za sklem skutečné počasí a denní doba, okenní senzory.",
    karta: {
      oba: "Táhni pro posun obou stínění",
      otworz: "Otevřít",
      stop: "Stop",
      zamknij: "Zavřít",
      zwinieta: "Vytažená",
      opuszczona: "Stažená",
      brak: "Entita nenalezena",
      okno: "Okno",
      lewe: "levé",
      prawe: "pravé",
      otwarte: "otevřené",
      uchylone: "vyklopené",
      pozycja: "Poloha"
    },
    kroki: {
      urzadzenie: {
        t: "Zařízení",
        co: "Vyber stínění z Home Assistantu a pojmenuj okno.",
        poco: "Karta ovládá toto stínění a ukazuje jeho skutečnou polohu."
      },
      oslona: {
        t: "Stínění",
        co: "Vyber druh stínění, jaký máš doma.",
        poco: "Karta nakreslí tento materiál. Venkovní stínění je vidět z fasády."
      },
      kolory: {
        t: "Barvy",
        co: "Vyber barvu stínění a barvu rámu okna.",
        poco: "Okno na obrazovce vypadá jako tvoje skutečné."
      },
      okno: {
        t: "Okno",
        co: "Nastav počet křídel, výšku a tlačítka.",
        poco: "Každé křídlo může mít vlastní stínění a jezdit samostatně."
      },
      czujniki: {
        t: "Senzory",
        co: "Vyber senzory otevření okna (kontakty).",
        poco: "Karta ukáže vyklopené nebo otevřené křídlo."
      },
      silnik: {
        t: "Motor",
        co: "Zadej rychlost motoru nebo dobu celého pojezdu.",
        poco: "Stínění na obrazovce jede stejně rychle jako skutečné."
      },
      pogoda: {
        t: "Počasí",
        co: "Vyber počasí za oknem a jazyk karty.",
        poco: "Za sklem je vidět slunce, déšť, sníh, mlha, den a noc."
      }
    },
    ui: {
      krok: "Krok {0} z {1}",
      co: "Co:",
      poco: "Proč:",
      wstecz: "Zpět",
      dalej: "Další",
      wUrzadzeniu: "Toto okno pochází z integrace Motor HA. Změny se hned ukládají do zařízení okna, takže každá karta tohoto okna vypadá stejně.",
      bezUrzadzenia: "Můžeš vybrat jakékoli stínění. Okno přidané v integraci Motor HA má navíc kalibraci a ukládá nastavení v zařízení.",
      wybrany: "Vybráno:",
      jedno: "Jedno křídlo",
      dwa: "Dvě křídla",
      sterowanie: "Ovládání",
      uchyl: "Vyklápí se",
      otworz: "Otevírá se",
      znalezione: "Nalezeno automaticky v této místnosti: {0}",
      brakCzujnikow: "V místnosti tohoto stínění nejsou okenní senzory. Můžeš je vybrat sám.",
      czasReczny: "Celý pojezd: {0} s (nastaveno ručně).",
      czasZPredkosci: "Celý pojezd: {0} s (z rychlosti motoru {1} ot/min).",
      czasNauczony: "Celý pojezd: {0} s (naučeno ze skutečných pohybů).",
      czasDomyslny: "Celý pojezd: {0} s. Karta se po několika pohybech naučí skutečný čas.",
      jezykAuto: "Podle profilu Home Assistantu",
      pogodaZ: "Počasí z: {0}",
      pogodaInternet: "V Home Assistantu není entita počasí. Karta vezme počasí z internetu (Open-Meteo) pro polohu domu."
    },
    pola: {
      entity: "Stínění",
      name: "Název okna",
      kolor: "Barva stínění",
      rama: "Barva rámu",
      kolor_wlasny: "Vlastní barva stínění",
      rama_wlasna: "Vlastní barva rámu",
      skrzydla: "Křídla",
      wysokosc: "Výška okna",
      roleta_lewa: "Stínění levého křídla",
      roleta_prawa: "Stínění pravého křídla",
      odwroc: "Obrátit polohu",
      osobno: "Každé křídlo zvlášť",
      przyciski: "Tlačítka",
      suwak: "Posuvník polohy",
      pozycje: "Pevné polohy",
      wibracja: "Vibrace při dotyku",
      auto_czujniki: "Hledat senzory automaticky",
      czujnik_lewe: "Senzor levého křídla",
      tryb_lewe: "Levé křídlo",
      czujnik_prawe: "Senzor pravého křídla",
      tryb_prawe: "Pravé křídlo",
      predkosc_lewa: "Rychlost motoru (levý)",
      predkosc_prawa: "Rychlost motoru (pravý)",
      czas: "Doba pojezdu",
      niebo: "Počasí za oknem",
      pogoda: "Entita počasí",
      widok: "Výhled z okna",
      jezyk: "Jazyk karty"
    },
    pomoc: {
      entity: "Okno z Motor HA, skupina dvou rolet nebo jedna roleta.",
      roleta_lewa: "Prázdné = z okna nebo skupiny.",
      odwroc: "Když motor hlásí 100 % při zavřeném stínění.",
      osobno: "Tažení po skle posune jen toto křídlo.",
      pozycje: "Např. 100, 75, 50, 25, 0. Prázdné = bez tlačítek poloh.",
      auto_czujniki: "Okenní senzory ze stejné místnosti.",
      predkosc_lewa: "Entita number s otáčkami motoru (např. Moes, Tuya). Prázdné = ze zařízení.",
      czas: "0 = automaticky.",
      pogoda: "Prázdné = první entita počasí v HA, jinak počasí z internetu.",
      widok: "Nakreslené domy, stromy a lampy."
    },
    grupy: {
      wew: "Uvnitř",
      zew: "Venku",
      rolety: "Rolety",
      plisy: "Plisé a římské",
      zaluzje: "Žaluzie",
      zrolety: "Venkovní rolety",
      fasadowe: "Venkovní žaluzie",
      taras: "Terasa"
    },
    oslony: {
      pelna: "Volně visící roleta",
      kasetowa: "Kazetová roleta",
      zebra: "Roleta den a noc",
      zaciemniajaca: "Zatemňovací roleta",
      plisa: "Plisé",
      plaster: "Plisé voština",
      rzymska: "Římská roleta",
      zaluzja: "Hliníková žaluzie",
      drewniana: "Dřevěná žaluzie",
      natynkowa: "Předokenní roleta",
      podtynkowa: "Podomítková roleta",
      zewnetrzna: "Nadokenní roleta",
      perforowana: "Perforovaná roleta",
      fasadowa: "Venkovní žaluzie C80",
      fasadowaz: "Venkovní žaluzie Z90",
      markiza: "Terasová markýza",
      screen: "ZIP screen"
    },
    kolory: {
      czarny: "černá",
      grafit: "grafit",
      szary: "šedá",
      popiel: "popelavá",
      srebrny: "stříbrná",
      bialy: "bílá",
      kremowy: "krémová",
      piaskowy: "písková",
      bezowy: "béžová",
      cappuccino: "cappuccino",
      mokka: "moka",
      braz: "hnědá",
      wenge: "wenge",
      stalowy: "ocelová",
      granat: "námořnická modř",
      blekitny: "blankytná",
      niebieski: "modrá",
      morski: "mořská",
      turkus: "tyrkysová",
      mietowy: "mátová",
      zielony: "zelená",
      butelkowy: "lahvově zelená",
      oliwka: "olivová",
      limonka: "limetková",
      zolty: "žlutá",
      musztardowy: "hořčicová",
      pomaranczowy: "oranžová",
      terakota: "terakota",
      czerwony: "červená",
      bordo: "bordó",
      pudrowy: "pudrově růžová",
      rozowy: "růžová",
      lawendowy: "levandulová",
      fiolet: "fialová",
      sliwkowy: "švestková"
    },
    ramy: {
      biala: "bílá",
      kremowa: "krémová",
      jasnoszara: "světle šedá",
      srebrna: "stříbrná",
      szary_agat: "achátově šedá",
      szara: "šedá",
      szary_kwarc: "křemenně šedá",
      bazaltowa: "čedičově šedá",
      antracyt: "antracit",
      czarna: "černá",
      zielona: "zelená",
      granatowa: "tmavě modrá",
      bordowa: "vínová",
      braz: "hnědá",
      sosna: "borovice",
      dab_jasny: "světlý dub",
      dab_sheffield: "dub Sheffield",
      winchester: "Winchester",
      oregon: "Oregon",
      zloty_dab: "zlatý dub",
      siena: "Siena",
      orzech: "ořech",
      mahon: "mahagon",
      dab_bagienny: "bahenní dub"
    }
  };

  // tlumaczenia/sk.json
  var sk_default = {
    nazwa: "Motor HA",
    opis: "Okno s tienením: ide rýchlosťou motora, za sklom skutočné počasie a denná doba, okenné senzory.",
    karta: {
      oba: "Ťahaj na posun oboch tienení",
      otworz: "Otvoriť",
      stop: "Stop",
      zamknij: "Zavrieť",
      zwinieta: "Vytiahnutá",
      opuszczona: "Stiahnutá",
      brak: "Entita sa nenašla",
      okno: "Okno",
      lewe: "ľavé",
      prawe: "pravé",
      otwarte: "otvorené",
      uchylone: "vyklopené",
      pozycja: "Poloha"
    },
    kroki: {
      urzadzenie: {
        t: "Zariadenie",
        co: "Vyber tienenie z Home Assistantu a pomenuj okno.",
        poco: "Karta ovláda toto tienenie a ukazuje jeho skutočnú polohu."
      },
      oslona: {
        t: "Tienenie",
        co: "Vyber druh tienenia, aký máš doma.",
        poco: "Karta nakreslí tento materiál. Vonkajšie tienenie je vidieť z fasády."
      },
      kolory: {
        t: "Farby",
        co: "Vyber farbu tienenia a farbu rámu okna.",
        poco: "Okno na obrazovke vyzerá ako tvoje skutočné."
      },
      okno: {
        t: "Okno",
        co: "Nastav počet krídel, výšku a tlačidlá.",
        poco: "Každé krídlo môže mať vlastné tienenie a ísť samostatne."
      },
      czujniki: {
        t: "Senzory",
        co: "Vyber senzory otvorenia okna (kontakty).",
        poco: "Karta ukáže vyklopené alebo otvorené krídlo."
      },
      silnik: {
        t: "Motor",
        co: "Zadaj rýchlosť motora alebo čas celého pojazdu.",
        poco: "Tienenie na obrazovke ide rovnako rýchlo ako skutočné."
      },
      pogoda: {
        t: "Počasie",
        co: "Vyber počasie za oknom a jazyk karty.",
        poco: "Za sklom je vidieť slnko, dážď, sneh, hmlu, deň a noc."
      }
    },
    ui: {
      krok: "Krok {0} z {1}",
      co: "Čo:",
      poco: "Prečo:",
      wstecz: "Späť",
      dalej: "Ďalej",
      wUrzadzeniu: "Toto okno pochádza z integrácie Motor HA. Zmeny sa hneď ukladajú do zariadenia okna, takže každá karta tohto okna vyzerá rovnako.",
      bezUrzadzenia: "Môžeš vybrať akékoľvek tienenie. Okno pridané v integrácii Motor HA má navyše kalibráciu a ukladá nastavenia v zariadení.",
      wybrany: "Vybrané:",
      jedno: "Jedno krídlo",
      dwa: "Dve krídla",
      sterowanie: "Ovládanie",
      uchyl: "Vyklápa sa",
      otworz: "Otvára sa",
      znalezione: "Nájdené automaticky v tejto miestnosti: {0}",
      brakCzujnikow: "V miestnosti tohto tienenia nie sú okenné senzory. Môžeš ich vybrať sám.",
      czasReczny: "Celý pojazd: {0} s (nastavené ručne).",
      czasZPredkosci: "Celý pojazd: {0} s (z rýchlosti motora {1} ot/min).",
      czasNauczony: "Celý pojazd: {0} s (naučené zo skutočných pohybov).",
      czasDomyslny: "Celý pojazd: {0} s. Karta sa po niekoľkých pohyboch naučí skutočný čas.",
      jezykAuto: "Podľa profilu Home Assistantu",
      pogodaZ: "Počasie z: {0}",
      pogodaInternet: "V Home Assistante nie je entita počasia. Karta vezme počasie z internetu (Open-Meteo) pre polohu domu."
    },
    pola: {
      entity: "Tienenie",
      name: "Názov okna",
      kolor: "Farba tienenia",
      rama: "Farba rámu",
      kolor_wlasny: "Vlastná farba tienenia",
      rama_wlasna: "Vlastná farba rámu",
      skrzydla: "Krídla",
      wysokosc: "Výška okna",
      roleta_lewa: "Tienenie ľavého krídla",
      roleta_prawa: "Tienenie pravého krídla",
      odwroc: "Obrátiť polohu",
      osobno: "Každé krídlo zvlášť",
      przyciski: "Tlačidlá",
      suwak: "Posuvník polohy",
      pozycje: "Pevné polohy",
      wibracja: "Vibrácia pri dotyku",
      auto_czujniki: "Hľadať senzory automaticky",
      czujnik_lewe: "Senzor ľavého krídla",
      tryb_lewe: "Ľavé krídlo",
      czujnik_prawe: "Senzor pravého krídla",
      tryb_prawe: "Pravé krídlo",
      predkosc_lewa: "Rýchlosť motora (ľavý)",
      predkosc_prawa: "Rýchlosť motora (pravý)",
      czas: "Čas pojazdu",
      niebo: "Počasie za oknom",
      pogoda: "Entita počasia",
      widok: "Výhľad z okna",
      jezyk: "Jazyk karty"
    },
    pomoc: {
      entity: "Okno z Motor HA, skupina dvoch roliet alebo jedna roleta.",
      roleta_lewa: "Prázdne = z okna alebo skupiny.",
      odwroc: "Keď motor hlási 100 % pri zatvorenom tienení.",
      osobno: "Ťahanie po skle posunie iba toto krídlo.",
      pozycje: "Napr. 100, 75, 50, 25, 0. Prázdne = bez tlačidiel polôh.",
      auto_czujniki: "Okenné senzory z tej istej miestnosti.",
      predkosc_lewa: "Entita number s otáčkami motora (napr. Moes, Tuya). Prázdne = zo zariadenia.",
      czas: "0 = automaticky.",
      pogoda: "Prázdne = prvá entita počasia v HA, inak počasie z internetu.",
      widok: "Nakreslené domy, stromy a lampy."
    },
    grupy: {
      wew: "Vnútri",
      zew: "Vonku",
      rolety: "Rolety",
      plisy: "Plisé a rímske",
      zaluzje: "Žalúzie",
      zrolety: "Vonkajšie rolety",
      fasadowe: "Vonkajšie žalúzie",
      taras: "Terasa"
    },
    oslony: {
      pelna: "Voľne visiaca roleta",
      kasetowa: "Kazetová roleta",
      zebra: "Roleta deň a noc",
      zaciemniajaca: "Zatemňovacia roleta",
      plisa: "Plisé",
      plaster: "Plisé včelí plást",
      rzymska: "Rímska roleta",
      zaluzja: "Hliníková žalúzia",
      drewniana: "Drevená žalúzia",
      natynkowa: "Predokenná roleta",
      podtynkowa: "Podomietková roleta",
      zewnetrzna: "Nadokenná roleta",
      perforowana: "Perforovaná roleta",
      fasadowa: "Vonkajšia žalúzia C80",
      fasadowaz: "Vonkajšia žalúzia Z90",
      markiza: "Terasová markíza",
      screen: "ZIP screen"
    },
    kolory: {
      czarny: "čierna",
      grafit: "grafit",
      szary: "sivá",
      popiel: "popolavá",
      srebrny: "strieborná",
      bialy: "biela",
      kremowy: "krémová",
      piaskowy: "piesková",
      bezowy: "béžová",
      cappuccino: "cappuccino",
      mokka: "moka",
      braz: "hnedá",
      wenge: "wenge",
      stalowy: "oceľová",
      granat: "námornícka modrá",
      blekitny: "blankytná",
      niebieski: "modrá",
      morski: "morská",
      turkus: "tyrkysová",
      mietowy: "mätová",
      zielony: "zelená",
      butelkowy: "fľašovo zelená",
      oliwka: "olivová",
      limonka: "limetková",
      zolty: "žltá",
      musztardowy: "horčicová",
      pomaranczowy: "oranžová",
      terakota: "terakota",
      czerwony: "červená",
      bordo: "bordová",
      pudrowy: "púdrovo ružová",
      rozowy: "ružová",
      lawendowy: "levanduľová",
      fiolet: "fialová",
      sliwkowy: "slivková"
    },
    ramy: {
      biala: "biela",
      kremowa: "krémová",
      jasnoszara: "svetlosivá",
      srebrna: "strieborná",
      szary_agat: "achátovo sivá",
      szara: "sivá",
      szary_kwarc: "kremenno sivá",
      bazaltowa: "čadičovo sivá",
      antracyt: "antracit",
      czarna: "čierna",
      zielona: "zelená",
      granatowa: "tmavomodrá",
      bordowa: "vínová",
      braz: "hnedá",
      sosna: "borovica",
      dab_jasny: "svetlý dub",
      dab_sheffield: "dub Sheffield",
      winchester: "Winchester",
      oregon: "Oregon",
      zloty_dab: "zlatý dub",
      siena: "Siena",
      orzech: "orech",
      mahon: "mahagón",
      dab_bagienny: "bahenný dub"
    }
  };

  // tlumaczenia/es.json
  var es_default = {
    nazwa: "Motor HA",
    opis: "Una ventana con su estor: se mueve a la velocidad del motor, tiempo real y hora del día fuera, sensores de ventana.",
    karta: {
      oba: "Arrastra para mover ambos estores",
      otworz: "Abrir",
      stop: "Parar",
      zamknij: "Cerrar",
      zwinieta: "Abierto",
      opuszczona: "Cerrado",
      brak: "Entidad no encontrada",
      okno: "Ventana",
      lewe: "izquierda",
      prawe: "derecha",
      otwarte: "abierta",
      uchylone: "abatida",
      pozycja: "Posición"
    },
    kroki: {
      urzadzenie: {
        t: "Dispositivo",
        co: "Elige un estor de Home Assistant y pon nombre a la ventana.",
        poco: "La tarjeta controla este estor y muestra su posición real."
      },
      oslona: {
        t: "Estor",
        co: "Elige el tipo de estor que tienes en casa.",
        poco: "La tarjeta dibuja este material. Los exteriores se ven desde la fachada."
      },
      kolory: {
        t: "Colores",
        co: "Elige el color del estor y el del marco.",
        poco: "La ventana en pantalla se parece a la tuya."
      },
      okno: {
        t: "Ventana",
        co: "Ajusta el número de hojas, la altura y los botones.",
        poco: "Cada hoja puede tener su propio estor y moverse sola."
      },
      czujniki: {
        t: "Sensores",
        co: "Elige los sensores de apertura de la ventana.",
        poco: "La tarjeta muestra una hoja abatida o abierta."
      },
      silnik: {
        t: "Motor",
        co: "Indica la velocidad del motor o el tiempo de recorrido completo.",
        poco: "El estor en pantalla se mueve tan rápido como el real."
      },
      pogoda: {
        t: "Tiempo",
        co: "Elige el tiempo fuera y el idioma de la tarjeta.",
        poco: "Sol, lluvia, nieve, niebla, día y noche tras el cristal."
      }
    },
    ui: {
      krok: "Paso {0} de {1}",
      co: "Qué:",
      poco: "Para qué:",
      wstecz: "Atrás",
      dalej: "Siguiente",
      wUrzadzeniu: "Esta ventana viene de la integración Motor HA. Los cambios se guardan al instante en el dispositivo de la ventana, así que todas sus tarjetas se ven igual.",
      bezUrzadzenia: "Puedes elegir cualquier estor. Una ventana añadida en la integración Motor HA tiene además calibración y guarda sus ajustes en el dispositivo.",
      wybrany: "Elegido:",
      jedno: "Una hoja",
      dwa: "Dos hojas",
      sterowanie: "Controles",
      uchyl: "Se abate",
      otworz: "Se abre",
      znalezione: "Encontrados automáticamente en esta habitación: {0}",
      brakCzujnikow: "No hay sensores de ventana en la habitación de este estor. Puedes elegirlos tú.",
      czasReczny: "Recorrido completo: {0} s (ajustado a mano).",
      czasZPredkosci: "Recorrido completo: {0} s (según la velocidad del motor {1} rpm).",
      czasNauczony: "Recorrido completo: {0} s (aprendido de movimientos reales).",
      czasDomyslny: "Recorrido completo: {0} s. La tarjeta aprende el tiempo real tras unos movimientos.",
      jezykAuto: "Como en el perfil de Home Assistant",
      pogodaZ: "Tiempo de: {0}",
      pogodaInternet: "No hay entidad de tiempo en Home Assistant. La tarjeta tomará el tiempo de internet (Open-Meteo) para la ubicación de casa."
    },
    pola: {
      entity: "Estor",
      name: "Nombre de la ventana",
      kolor: "Color del estor",
      rama: "Color del marco",
      kolor_wlasny: "Color de estor propio",
      rama_wlasna: "Color de marco propio",
      skrzydla: "Hojas",
      wysokosc: "Altura de la ventana",
      roleta_lewa: "Estor de la hoja izquierda",
      roleta_prawa: "Estor de la hoja derecha",
      odwroc: "Invertir posición",
      osobno: "Cada hoja por separado",
      przyciski: "Botones",
      suwak: "Control deslizante",
      pozycje: "Posiciones fijas",
      wibracja: "Vibrar al tocar",
      auto_czujniki: "Buscar sensores automáticamente",
      czujnik_lewe: "Sensor de la hoja izquierda",
      tryb_lewe: "Hoja izquierda",
      czujnik_prawe: "Sensor de la hoja derecha",
      tryb_prawe: "Hoja derecha",
      predkosc_lewa: "Velocidad del motor (izq.)",
      predkosc_prawa: "Velocidad del motor (der.)",
      czas: "Tiempo de recorrido",
      niebo: "Tiempo fuera",
      pogoda: "Entidad de tiempo",
      widok: "Vista exterior",
      jezyk: "Idioma de la tarjeta"
    },
    pomoc: {
      entity: "Una ventana de Motor HA, un grupo de dos estores o un solo estor.",
      roleta_lewa: "Vacío = de la ventana o del grupo.",
      odwroc: "Cuando el motor indica 100 % con el estor cerrado.",
      osobno: "Arrastrar en el cristal mueve solo esta hoja.",
      pozycje: "P. ej. 100, 75, 50, 25, 0. Vacío = sin botones de posición.",
      auto_czujniki: "Sensores de ventana de la misma habitación.",
      predkosc_lewa: "Una entidad number con la velocidad del motor (p. ej. Moes, Tuya). Vacío = del dispositivo.",
      czas: "0 = automático.",
      pogoda: "Vacío = la primera entidad de tiempo en HA; si no, el tiempo de internet.",
      widok: "Casas, árboles y farolas dibujados."
    },
    grupy: {
      wew: "Interior",
      zew: "Exterior",
      rolety: "Estores enrollables",
      plisy: "Plisados y paqueto",
      zaluzje: "Venecianas",
      zrolety: "Persianas",
      fasadowe: "Lamas orientables",
      taras: "Terraza"
    },
    oslony: {
      pelna: "Estor enrollable libre",
      kasetowa: "Estor con cajón",
      zebra: "Estor noche y día",
      zaciemniajaca: "Estor opaco",
      plisa: "Estor plisado",
      plaster: "Estor nido de abeja",
      rzymska: "Estor paqueto",
      zaluzja: "Veneciana de aluminio",
      drewniana: "Veneciana de madera",
      natynkowa: "Persiana de superficie",
      podtynkowa: "Persiana empotrada",
      zewnetrzna: "Persiana monoblock",
      perforowana: "Persiana microperforada",
      fasadowa: "Lama orientable C80",
      fasadowaz: "Lama orientable Z90",
      markiza: "Toldo de terraza",
      screen: "Screen ZIP"
    },
    kolory: {
      czarny: "negro",
      grafit: "grafito",
      szary: "gris",
      popiel: "ceniza",
      srebrny: "plata",
      bialy: "blanco",
      kremowy: "crema",
      piaskowy: "arena",
      bezowy: "beige",
      cappuccino: "capuchino",
      mokka: "moca",
      braz: "marrón",
      wenge: "wengué",
      stalowy: "acero",
      granat: "azul marino",
      blekitny: "celeste",
      niebieski: "azul",
      morski: "verde azulado",
      turkus: "turquesa",
      mietowy: "menta",
      zielony: "verde",
      butelkowy: "verde botella",
      oliwka: "oliva",
      limonka: "lima",
      zolty: "amarillo",
      musztardowy: "mostaza",
      pomaranczowy: "naranja",
      terakota: "terracota",
      czerwony: "rojo",
      bordo: "burdeos",
      pudrowy: "rosa empolvado",
      rozowy: "rosa",
      lawendowy: "lavanda",
      fiolet: "violeta",
      sliwkowy: "ciruela"
    },
    ramy: {
      biala: "blanco",
      kremowa: "crema",
      jasnoszara: "gris claro",
      srebrna: "plata",
      szary_agat: "gris ágata",
      szara: "gris",
      szary_kwarc: "gris cuarzo",
      bazaltowa: "gris basalto",
      antracyt: "antracita",
      czarna: "negro",
      zielona: "verde",
      granatowa: "azul marino",
      bordowa: "burdeos",
      braz: "marrón",
      sosna: "pino",
      dab_jasny: "roble claro",
      dab_sheffield: "roble Sheffield",
      winchester: "Winchester",
      oregon: "Oregón",
      zloty_dab: "roble dorado",
      siena: "Siena",
      orzech: "nogal",
      mahon: "caoba",
      dab_bagienny: "roble de pantano"
    }
  };

  // tlumaczenia/it.json
  var it_default = {
    nazwa: "Motor HA",
    opis: "Una finestra con la sua tenda: si muove alla velocità del motore, meteo reale e ora del giorno fuori, sensori finestra.",
    karta: {
      oba: "Trascina per muovere entrambe le tende",
      otworz: "Apri",
      stop: "Stop",
      zamknij: "Chiudi",
      zwinieta: "Aperta",
      opuszczona: "Chiusa",
      brak: "Entità non trovata",
      okno: "Finestra",
      lewe: "sinistra",
      prawe: "destra",
      otwarte: "aperta",
      uchylone: "a ribalta",
      pozycja: "Posizione"
    },
    kroki: {
      urzadzenie: {
        t: "Dispositivo",
        co: "Scegli una tenda di Home Assistant e dai un nome alla finestra.",
        poco: "La scheda comanda questa tenda e mostra la sua posizione reale."
      },
      oslona: {
        t: "Tenda",
        co: "Scegli il tipo di tenda che hai in casa.",
        poco: "La scheda disegna questo materiale. Le schermature esterne si vedono dalla facciata."
      },
      kolory: {
        t: "Colori",
        co: "Scegli il colore della tenda e del telaio.",
        poco: "La finestra sullo schermo somiglia alla tua."
      },
      okno: {
        t: "Finestra",
        co: "Imposta numero di ante, altezza e pulsanti.",
        poco: "Ogni anta può avere la sua tenda e muoversi da sola."
      },
      czujniki: {
        t: "Sensori",
        co: "Scegli i sensori di apertura della finestra.",
        poco: "La scheda mostra un'anta a ribalta o aperta."
      },
      silnik: {
        t: "Motore",
        co: "Indica la velocità del motore o il tempo di corsa completo.",
        poco: "La tenda sullo schermo si muove veloce come quella vera."
      },
      pogoda: {
        t: "Meteo",
        co: "Scegli il meteo fuori e la lingua della scheda.",
        poco: "Sole, pioggia, neve, nebbia, giorno e notte dietro il vetro."
      }
    },
    ui: {
      krok: "Passo {0} di {1}",
      co: "Cosa:",
      poco: "Perché:",
      wstecz: "Indietro",
      dalej: "Avanti",
      wUrzadzeniu: "Questa finestra viene dall'integrazione Motor HA. Le modifiche si salvano subito nel dispositivo della finestra, quindi ogni sua scheda è uguale.",
      bezUrzadzenia: "Puoi scegliere qualsiasi tenda. Una finestra aggiunta nell'integrazione Motor HA ha anche la calibrazione e salva le impostazioni nel dispositivo.",
      wybrany: "Scelto:",
      jedno: "Un'anta",
      dwa: "Due ante",
      sterowanie: "Comandi",
      uchyl: "Si apre a ribalta",
      otworz: "Si apre",
      znalezione: "Trovati automaticamente in questa stanza: {0}",
      brakCzujnikow: "Nella stanza di questa tenda non ci sono sensori finestra. Puoi sceglierli tu.",
      czasReczny: "Corsa completa: {0} s (impostata a mano).",
      czasZPredkosci: "Corsa completa: {0} s (dalla velocità del motore {1} giri/min).",
      czasNauczony: "Corsa completa: {0} s (imparata dai movimenti reali).",
      czasDomyslny: "Corsa completa: {0} s. La scheda impara il tempo reale dopo alcuni movimenti.",
      jezykAuto: "Come nel profilo di Home Assistant",
      pogodaZ: "Meteo da: {0}",
      pogodaInternet: "In Home Assistant non c'è un'entità meteo. La scheda prenderà il meteo da internet (Open-Meteo) per la posizione di casa."
    },
    pola: {
      entity: "Tenda",
      name: "Nome della finestra",
      kolor: "Colore della tenda",
      rama: "Colore del telaio",
      kolor_wlasny: "Colore tenda personalizzato",
      rama_wlasna: "Colore telaio personalizzato",
      skrzydla: "Ante",
      wysokosc: "Altezza della finestra",
      roleta_lewa: "Tenda anta sinistra",
      roleta_prawa: "Tenda anta destra",
      odwroc: "Inverti posizione",
      osobno: "Ogni anta separata",
      przyciski: "Pulsanti",
      suwak: "Cursore posizione",
      pozycje: "Posizioni preimpostate",
      wibracja: "Vibrazione al tocco",
      auto_czujniki: "Cerca i sensori da solo",
      czujnik_lewe: "Sensore anta sinistra",
      tryb_lewe: "Anta sinistra",
      czujnik_prawe: "Sensore anta destra",
      tryb_prawe: "Anta destra",
      predkosc_lewa: "Velocità motore (sinistra)",
      predkosc_prawa: "Velocità motore (destra)",
      czas: "Tempo di corsa",
      niebo: "Meteo fuori",
      pogoda: "Entità meteo",
      widok: "Vista fuori",
      jezyk: "Lingua della scheda"
    },
    pomoc: {
      entity: "Una finestra di Motor HA, un gruppo di due tende o una sola tenda.",
      roleta_lewa: "Vuoto = dalla finestra o dal gruppo.",
      odwroc: "Quando il motore indica 100 % con la tenda chiusa.",
      osobno: "Trascinare sul vetro muove solo questa anta.",
      pozycje: "Es. 100, 75, 50, 25, 0. Vuoto = nessun pulsante di posizione.",
      auto_czujniki: "Sensori finestra della stessa stanza.",
      predkosc_lewa: "Un'entità number con la velocità del motore (es. Moes, Tuya). Vuoto = dal dispositivo.",
      czas: "0 = automatico.",
      pogoda: "Vuoto = la prima entità meteo in HA, altrimenti meteo da internet.",
      widok: "Case, alberi e lampioni disegnati."
    },
    grupy: {
      wew: "Interno",
      zew: "Esterno",
      rolety: "Tende a rullo",
      plisy: "Plissettate e a pacchetto",
      zaluzje: "Veneziane",
      zrolety: "Tapparelle",
      fasadowe: "Frangisole",
      taras: "Terrazza"
    },
    oslony: {
      pelna: "Tenda a rullo libera",
      kasetowa: "Tenda a rullo con cassonetto",
      zebra: "Tenda giorno-notte",
      zaciemniajaca: "Tenda oscurante",
      plisa: "Tenda plissettata",
      plaster: "Tenda a nido d'ape",
      rzymska: "Tenda a pacchetto",
      zaluzja: "Veneziana in alluminio",
      drewniana: "Veneziana in legno",
      natynkowa: "Tapparella esterna a vista",
      podtynkowa: "Tapparella a scomparsa",
      zewnetrzna: "Tapparella con cassonetto",
      perforowana: "Tapparella forata",
      fasadowa: "Frangisole C80",
      fasadowaz: "Frangisole Z90",
      markiza: "Tenda da sole",
      screen: "Screen ZIP"
    },
    kolory: {
      czarny: "nero",
      grafit: "grafite",
      szary: "grigio",
      popiel: "cenere",
      srebrny: "argento",
      bialy: "bianco",
      kremowy: "crema",
      piaskowy: "sabbia",
      bezowy: "beige",
      cappuccino: "cappuccino",
      mokka: "moka",
      braz: "marrone",
      wenge: "wengé",
      stalowy: "acciaio",
      granat: "blu navy",
      blekitny: "azzurro",
      niebieski: "blu",
      morski: "verde petrolio",
      turkus: "turchese",
      mietowy: "menta",
      zielony: "verde",
      butelkowy: "verde bottiglia",
      oliwka: "oliva",
      limonka: "lime",
      zolty: "giallo",
      musztardowy: "senape",
      pomaranczowy: "arancione",
      terakota: "terracotta",
      czerwony: "rosso",
      bordo: "bordeaux",
      pudrowy: "rosa cipria",
      rozowy: "rosa",
      lawendowy: "lavanda",
      fiolet: "viola",
      sliwkowy: "prugna"
    },
    ramy: {
      biala: "bianco",
      kremowa: "crema",
      jasnoszara: "grigio chiaro",
      srebrna: "argento",
      szary_agat: "grigio agata",
      szara: "grigio",
      szary_kwarc: "grigio quarzo",
      bazaltowa: "grigio basalto",
      antracyt: "antracite",
      czarna: "nero",
      zielona: "verde",
      granatowa: "blu",
      bordowa: "bordeaux",
      braz: "marrone",
      sosna: "pino",
      dab_jasny: "rovere chiaro",
      dab_sheffield: "rovere Sheffield",
      winchester: "Winchester",
      oregon: "Oregon",
      zloty_dab: "rovere dorato",
      siena: "Siena",
      orzech: "noce",
      mahon: "mogano",
      dab_bagienny: "rovere di palude"
    }
  };

  // tlumaczenia/nl.json
  var nl_default = {
    nazwa: "Motor HA",
    opis: "Een raam met zonwering: beweegt op de snelheid van de motor, echt weer en tijd van de dag buiten, raamsensoren.",
    karta: {
      oba: "Sleep om beide zonweringen te bewegen",
      otworz: "Openen",
      stop: "Stop",
      zamknij: "Sluiten",
      zwinieta: "Open",
      opuszczona: "Dicht",
      brak: "Entiteit niet gevonden",
      okno: "Raam",
      lewe: "links",
      prawe: "rechts",
      otwarte: "open",
      uchylone: "op kiep",
      pozycja: "Positie"
    },
    kroki: {
      urzadzenie: {
        t: "Apparaat",
        co: "Kies een zonwering uit Home Assistant en geef het raam een naam.",
        poco: "De kaart bedient deze zonwering en toont de echte positie."
      },
      oslona: {
        t: "Zonwering",
        co: "Kies het soort zonwering dat je thuis hebt.",
        poco: "De kaart tekent dit materiaal. Buitenzonwering zie je vanaf de gevel."
      },
      kolory: {
        t: "Kleuren",
        co: "Kies de kleur van de zonwering en van het kozijn.",
        poco: "Het raam op het scherm lijkt op je echte raam."
      },
      okno: {
        t: "Raam",
        co: "Stel het aantal vleugels, de hoogte en de knoppen in.",
        poco: "Elke vleugel kan een eigen zonwering hebben en apart bewegen."
      },
      czujniki: {
        t: "Sensoren",
        co: "Kies de raamcontacten.",
        poco: "De kaart toont een vleugel op kiep of open."
      },
      silnik: {
        t: "Motor",
        co: "Geef de motorsnelheid of de volledige looptijd op.",
        poco: "De zonwering op het scherm beweegt even snel als de echte."
      },
      pogoda: {
        t: "Weer",
        co: "Kies het weer buiten en de taal van de kaart.",
        poco: "Zon, regen, sneeuw, mist, dag en nacht achter het glas."
      }
    },
    ui: {
      krok: "Stap {0} van {1}",
      co: "Wat:",
      poco: "Waarom:",
      wstecz: "Terug",
      dalej: "Volgende",
      wUrzadzeniu: "Dit raam komt uit de integratie Motor HA. Wijzigingen worden meteen in het raamapparaat opgeslagen, dus elke kaart van dit raam ziet er hetzelfde uit.",
      bezUrzadzenia: "Je kunt elke zonwering kiezen. Een raam uit de integratie Motor HA heeft ook kalibratie en bewaart de instellingen in het apparaat.",
      wybrany: "Gekozen:",
      jedno: "Eén vleugel",
      dwa: "Twee vleugels",
      sterowanie: "Bediening",
      uchyl: "Kantelt",
      otworz: "Gaat open",
      znalezione: "Automatisch gevonden in deze ruimte: {0}",
      brakCzujnikow: "In de ruimte van deze zonwering zijn geen raamsensoren. Je kunt ze zelf kiezen.",
      czasReczny: "Volledige loop: {0} s (handmatig ingesteld).",
      czasZPredkosci: "Volledige loop: {0} s (uit motorsnelheid {1} tpm).",
      czasNauczony: "Volledige loop: {0} s (geleerd uit echte bewegingen).",
      czasDomyslny: "Volledige loop: {0} s. De kaart leert de echte tijd na een paar bewegingen.",
      jezykAuto: "Zoals in het Home Assistant-profiel",
      pogodaZ: "Weer van: {0}",
      pogodaInternet: "Er is geen weerentiteit in Home Assistant. De kaart haalt het weer van internet (Open-Meteo) voor de locatie van je huis."
    },
    pola: {
      entity: "Zonwering",
      name: "Naam van het raam",
      kolor: "Kleur zonwering",
      rama: "Kleur kozijn",
      kolor_wlasny: "Eigen kleur zonwering",
      rama_wlasna: "Eigen kleur kozijn",
      skrzydla: "Vleugels",
      wysokosc: "Hoogte van het raam",
      roleta_lewa: "Zonwering linker vleugel",
      roleta_prawa: "Zonwering rechter vleugel",
      odwroc: "Positie omkeren",
      osobno: "Elke vleugel apart",
      przyciski: "Knoppen",
      suwak: "Positieschuif",
      pozycje: "Vaste posities",
      wibracja: "Trillen bij aanraken",
      auto_czujniki: "Sensoren zelf zoeken",
      czujnik_lewe: "Sensor linker vleugel",
      tryb_lewe: "Linker vleugel",
      czujnik_prawe: "Sensor rechter vleugel",
      tryb_prawe: "Rechter vleugel",
      predkosc_lewa: "Motorsnelheid (links)",
      predkosc_prawa: "Motorsnelheid (rechts)",
      czas: "Looptijd",
      niebo: "Weer buiten",
      pogoda: "Weerentiteit",
      widok: "Uitzicht",
      jezyk: "Taal van de kaart"
    },
    pomoc: {
      entity: "Een Motor HA-raam, een groep van twee rolgordijnen of één rolgordijn.",
      roleta_lewa: "Leeg = uit het raam of de groep.",
      odwroc: "Als de motor 100 % meldt bij een gesloten zonwering.",
      osobno: "Slepen over het glas beweegt alleen deze vleugel.",
      pozycje: "Bijv. 100, 75, 50, 25, 0. Leeg = geen positieknoppen.",
      auto_czujniki: "Raamsensoren uit dezelfde ruimte.",
      predkosc_lewa: "Een number-entiteit met de motorsnelheid (bijv. Moes, Tuya). Leeg = van het apparaat.",
      czas: "0 = automatisch.",
      pogoda: "Leeg = de eerste weerentiteit in HA, anders het weer van internet.",
      widok: "Getekende huizen, bomen en lantaarns."
    },
    grupy: {
      wew: "Binnen",
      zew: "Buiten",
      rolety: "Rolgordijnen",
      plisy: "Plissé en vouwgordijnen",
      zaluzje: "Jaloezieën",
      zrolety: "Rolluiken",
      fasadowe: "Buitenjaloezieën",
      taras: "Terras"
    },
    oslony: {
      pelna: "Vrijhangend rolgordijn",
      kasetowa: "Cassetterolgordijn",
      zebra: "Duo-rolgordijn",
      zaciemniajaca: "Verduisterend rolgordijn",
      plisa: "Plissé",
      plaster: "Dupli-plissé",
      rzymska: "Vouwgordijn",
      zaluzja: "Aluminium jaloezie",
      drewniana: "Houten jaloezie",
      natynkowa: "Opbouwrolluik",
      podtynkowa: "Inbouwrolluik",
      zewnetrzna: "Opzetrolluik",
      perforowana: "Geperforeerd rolluik",
      fasadowa: "Buitenjaloezie C80",
      fasadowaz: "Buitenjaloezie Z90",
      markiza: "Terrasscherm",
      screen: "ZIP-screen"
    },
    kolory: {
      czarny: "zwart",
      grafit: "grafiet",
      szary: "grijs",
      popiel: "asgrijs",
      srebrny: "zilver",
      bialy: "wit",
      kremowy: "crème",
      piaskowy: "zand",
      bezowy: "beige",
      cappuccino: "cappuccino",
      mokka: "mokka",
      braz: "bruin",
      wenge: "wengé",
      stalowy: "staal",
      granat: "marineblauw",
      blekitny: "hemelsblauw",
      niebieski: "blauw",
      morski: "petrol",
      turkus: "turquoise",
      mietowy: "mint",
      zielony: "groen",
      butelkowy: "flessengroen",
      oliwka: "olijf",
      limonka: "limoen",
      zolty: "geel",
      musztardowy: "mosterd",
      pomaranczowy: "oranje",
      terakota: "terracotta",
      czerwony: "rood",
      bordo: "bordeaux",
      pudrowy: "poederroze",
      rozowy: "roze",
      lawendowy: "lavendel",
      fiolet: "violet",
      sliwkowy: "pruim"
    },
    ramy: {
      biala: "wit",
      kremowa: "crèmewit",
      jasnoszara: "lichtgrijs",
      srebrna: "zilver",
      szary_agat: "agaatgrijs",
      szara: "grijs",
      szary_kwarc: "kwartsgrijs",
      bazaltowa: "basaltgrijs",
      antracyt: "antraciet",
      czarna: "zwart",
      zielona: "groen",
      granatowa: "staalblauw",
      bordowa: "wijnrood",
      braz: "bruin",
      sosna: "grenen",
      dab_jasny: "licht eiken",
      dab_sheffield: "Sheffield eiken",
      winchester: "Winchester",
      oregon: "Oregon",
      zloty_dab: "golden oak",
      siena: "Siena",
      orzech: "noten",
      mahon: "mahonie",
      dab_bagienny: "moeraseiken"
    }
  };

  // tlumaczenia/pt.json
  var pt_default = {
    nazwa: "Motor HA",
    opis: "Uma janela com a sua proteção: move-se à velocidade do motor, tempo real e hora do dia lá fora, sensores de janela.",
    karta: {
      oba: "Arraste para mover as duas proteções",
      otworz: "Abrir",
      stop: "Parar",
      zamknij: "Fechar",
      zwinieta: "Aberta",
      opuszczona: "Fechada",
      brak: "Entidade não encontrada",
      okno: "Janela",
      lewe: "esquerda",
      prawe: "direita",
      otwarte: "aberta",
      uchylone: "basculada",
      pozycja: "Posição"
    },
    kroki: {
      urzadzenie: {
        t: "Dispositivo",
        co: "Escolha uma proteção do Home Assistant e dê um nome à janela.",
        poco: "O cartão controla esta proteção e mostra a posição real."
      },
      oslona: {
        t: "Proteção",
        co: "Escolha o tipo de proteção que tem em casa.",
        poco: "O cartão desenha este material. As exteriores veem-se da fachada."
      },
      kolory: {
        t: "Cores",
        co: "Escolha a cor da proteção e a cor do caixilho.",
        poco: "A janela no ecrã parece a sua janela real."
      },
      okno: {
        t: "Janela",
        co: "Defina o número de folhas, a altura e os botões.",
        poco: "Cada folha pode ter a sua proteção e mover-se sozinha."
      },
      czujniki: {
        t: "Sensores",
        co: "Escolha os sensores de abertura da janela.",
        poco: "O cartão mostra uma folha basculada ou aberta."
      },
      silnik: {
        t: "Motor",
        co: "Indique a velocidade do motor ou o tempo de curso completo.",
        poco: "A proteção no ecrã move-se tão rápido como a real."
      },
      pogoda: {
        t: "Tempo",
        co: "Escolha o tempo lá fora e o idioma do cartão.",
        poco: "Sol, chuva, neve, nevoeiro, dia e noite atrás do vidro."
      }
    },
    ui: {
      krok: "Passo {0} de {1}",
      co: "O quê:",
      poco: "Para quê:",
      wstecz: "Voltar",
      dalej: "Seguinte",
      wUrzadzeniu: "Esta janela vem da integração Motor HA. As alterações ficam logo guardadas no dispositivo da janela, por isso todos os cartões desta janela são iguais.",
      bezUrzadzenia: "Pode escolher qualquer proteção. Uma janela adicionada na integração Motor HA tem também calibração e guarda as definições no dispositivo.",
      wybrany: "Escolhido:",
      jedno: "Uma folha",
      dwa: "Duas folhas",
      sterowanie: "Controlos",
      uchyl: "Bascula",
      otworz: "Abre",
      znalezione: "Encontrados automaticamente nesta divisão: {0}",
      brakCzujnikow: "Não há sensores de janela na divisão desta proteção. Pode escolhê-los.",
      czasReczny: "Curso completo: {0} s (definido à mão).",
      czasZPredkosci: "Curso completo: {0} s (pela velocidade do motor {1} rpm).",
      czasNauczony: "Curso completo: {0} s (aprendido com movimentos reais).",
      czasDomyslny: "Curso completo: {0} s. O cartão aprende o tempo real após alguns movimentos.",
      jezykAuto: "Como no perfil do Home Assistant",
      pogodaZ: "Tempo de: {0}",
      pogodaInternet: "Não há entidade de tempo no Home Assistant. O cartão vai buscar o tempo à internet (Open-Meteo) para a localização da casa."
    },
    pola: {
      entity: "Proteção",
      name: "Nome da janela",
      kolor: "Cor da proteção",
      rama: "Cor do caixilho",
      kolor_wlasny: "Cor de proteção personalizada",
      rama_wlasna: "Cor de caixilho personalizada",
      skrzydla: "Folhas",
      wysokosc: "Altura da janela",
      roleta_lewa: "Proteção da folha esquerda",
      roleta_prawa: "Proteção da folha direita",
      odwroc: "Inverter posição",
      osobno: "Cada folha em separado",
      przyciski: "Botões",
      suwak: "Controlo deslizante",
      pozycje: "Posições fixas",
      wibracja: "Vibrar ao tocar",
      auto_czujniki: "Procurar sensores automaticamente",
      czujnik_lewe: "Sensor da folha esquerda",
      tryb_lewe: "Folha esquerda",
      czujnik_prawe: "Sensor da folha direita",
      tryb_prawe: "Folha direita",
      predkosc_lewa: "Velocidade do motor (esq.)",
      predkosc_prawa: "Velocidade do motor (dir.)",
      czas: "Tempo de curso",
      niebo: "Tempo lá fora",
      pogoda: "Entidade de tempo",
      widok: "Vista exterior",
      jezyk: "Idioma do cartão"
    },
    pomoc: {
      entity: "Uma janela Motor HA, um grupo de dois estores ou um só estore.",
      roleta_lewa: "Vazio = da janela ou do grupo.",
      odwroc: "Quando o motor indica 100 % com a proteção fechada.",
      osobno: "Arrastar no vidro move só esta folha.",
      pozycje: "Ex. 100, 75, 50, 25, 0. Vazio = sem botões de posição.",
      auto_czujniki: "Sensores de janela da mesma divisão.",
      predkosc_lewa: "Uma entidade number com a velocidade do motor (ex. Moes, Tuya). Vazio = do dispositivo.",
      czas: "0 = automático.",
      pogoda: "Vazio = a primeira entidade de tempo no HA, senão o tempo da internet.",
      widok: "Casas, árvores e candeeiros desenhados."
    },
    grupy: {
      wew: "Interior",
      zew: "Exterior",
      rolety: "Estores de rolo",
      plisy: "Plissados e romanos",
      zaluzje: "Venezianas",
      zrolety: "Estores exteriores",
      fasadowe: "Lâminas orientáveis",
      taras: "Terraço"
    },
    oslony: {
      pelna: "Estore de rolo livre",
      kasetowa: "Estore de rolo com caixa",
      zebra: "Estore dia-noite",
      zaciemniajaca: "Estore opaco",
      plisa: "Estore plissado",
      plaster: "Estore favo de mel",
      rzymska: "Estore romano",
      zaluzja: "Veneziana de alumínio",
      drewniana: "Veneziana de madeira",
      natynkowa: "Estore exterior à vista",
      podtynkowa: "Estore embutido",
      zewnetrzna: "Estore com caixa",
      perforowana: "Estore perfurado",
      fasadowa: "Lâmina orientável C80",
      fasadowaz: "Lâmina orientável Z90",
      markiza: "Toldo de terraço",
      screen: "Screen ZIP"
    },
    kolory: {
      czarny: "preto",
      grafit: "grafite",
      szary: "cinzento",
      popiel: "cinza",
      srebrny: "prateado",
      bialy: "branco",
      kremowy: "creme",
      piaskowy: "areia",
      bezowy: "bege",
      cappuccino: "cappuccino",
      mokka: "moca",
      braz: "castanho",
      wenge: "wengé",
      stalowy: "aço",
      granat: "azul-marinho",
      blekitny: "azul-céu",
      niebieski: "azul",
      morski: "verde-mar",
      turkus: "turquesa",
      mietowy: "menta",
      zielony: "verde",
      butelkowy: "verde-garrafa",
      oliwka: "azeitona",
      limonka: "lima",
      zolty: "amarelo",
      musztardowy: "mostarda",
      pomaranczowy: "laranja",
      terakota: "terracota",
      czerwony: "vermelho",
      bordo: "bordô",
      pudrowy: "rosa-pó",
      rozowy: "rosa",
      lawendowy: "lavanda",
      fiolet: "violeta",
      sliwkowy: "ameixa"
    },
    ramy: {
      biala: "branco",
      kremowa: "creme",
      jasnoszara: "cinzento-claro",
      srebrna: "prateado",
      szary_agat: "cinzento ágata",
      szara: "cinzento",
      szary_kwarc: "cinzento quartzo",
      bazaltowa: "cinzento basalto",
      antracyt: "antracite",
      czarna: "preto",
      zielona: "verde",
      granatowa: "azul-marinho",
      bordowa: "bordô",
      braz: "castanho",
      sosna: "pinho",
      dab_jasny: "carvalho claro",
      dab_sheffield: "carvalho Sheffield",
      winchester: "Winchester",
      oregon: "Oregon",
      zloty_dab: "carvalho dourado",
      siena: "Siena",
      orzech: "nogueira",
      mahon: "mogno",
      dab_bagienny: "carvalho de pântano"
    }
  };

  // tlumaczenia/uk.json
  var uk_default = {
    nazwa: "Motor HA",
    opis: "Вікно із захистом від сонця: рухається зі швидкістю мотора, справжня погода й пора доби за склом, датчики вікна.",
    karta: {
      oba: "Потягніть, щоб посунути обидві штори",
      otworz: "Відкрити",
      stop: "Стоп",
      zamknij: "Закрити",
      zwinieta: "Піднята",
      opuszczona: "Опущена",
      brak: "Сутність не знайдено",
      okno: "Вікно",
      lewe: "ліве",
      prawe: "праве",
      otwarte: "відчинене",
      uchylone: "на провітрюванні",
      pozycja: "Положення"
    },
    kroki: {
      urzadzenie: {
        t: "Пристрій",
        co: "Виберіть штору з Home Assistant і назвіть вікно.",
        poco: "Картка керує цією шторою і показує її справжнє положення."
      },
      oslona: {
        t: "Штора",
        co: "Виберіть тип штори, як у вас удома.",
        poco: "Картка намалює цей матеріал. Зовнішні штори видно з фасаду."
      },
      kolory: {
        t: "Кольори",
        co: "Виберіть колір штори та колір рами.",
        poco: "Вікно на екрані схоже на ваше справжнє."
      },
      okno: {
        t: "Вікно",
        co: "Задайте кількість стулок, висоту та кнопки.",
        poco: "Кожна стулка може мати власну штору й рухатися окремо."
      },
      czujniki: {
        t: "Датчики",
        co: "Виберіть датчики відчинення вікна (геркони).",
        poco: "Картка покаже стулку на провітрюванні або відчинену."
      },
      silnik: {
        t: "Мотор",
        co: "Вкажіть швидкість мотора або час повного ходу.",
        poco: "Штора на екрані рухається так само швидко, як справжня."
      },
      pogoda: {
        t: "Погода",
        co: "Виберіть погоду за вікном і мову картки.",
        poco: "Сонце, дощ, сніг, туман, день і ніч за склом."
      }
    },
    ui: {
      krok: "Крок {0} з {1}",
      co: "Що:",
      poco: "Навіщо:",
      wstecz: "Назад",
      dalej: "Далі",
      wUrzadzeniu: "Це вікно з інтеграції Motor HA. Зміни одразу зберігаються в пристрої вікна, тож кожна картка цього вікна виглядає однаково.",
      bezUrzadzenia: "Можна вибрати будь-яку штору. Вікно, додане в інтеграції Motor HA, має ще калібрування і зберігає налаштування в пристрої.",
      wybrany: "Вибрано:",
      jedno: "Одна стулка",
      dwa: "Дві стулки",
      sterowanie: "Керування",
      uchyl: "Відкидається",
      otworz: "Відчиняється",
      znalezione: "Знайдено автоматично в цій кімнаті: {0}",
      brakCzujnikow: "У кімнаті цієї штори немає датчиків вікна. Можна вибрати їх вручну.",
      czasReczny: "Повний хід: {0} с (задано вручну).",
      czasZPredkosci: "Повний хід: {0} с (зі швидкості мотора {1} об/хв).",
      czasNauczony: "Повний хід: {0} с (вивчено зі справжніх рухів).",
      czasDomyslny: "Повний хід: {0} с. Картка сама вивчить справжній час після кількох рухів.",
      jezykAuto: "Як у профілі Home Assistant",
      pogodaZ: "Погода з: {0}",
      pogodaInternet: "У Home Assistant немає сутності погоди. Картка візьме погоду з інтернету (Open-Meteo) для розташування дому."
    },
    pola: {
      entity: "Штора",
      name: "Назва вікна",
      kolor: "Колір штори",
      rama: "Колір рами",
      kolor_wlasny: "Власний колір штори",
      rama_wlasna: "Власний колір рами",
      skrzydla: "Стулки",
      wysokosc: "Висота вікна",
      roleta_lewa: "Штора лівої стулки",
      roleta_prawa: "Штора правої стулки",
      odwroc: "Обернути положення",
      osobno: "Кожна стулка окремо",
      przyciski: "Кнопки",
      suwak: "Повзунок положення",
      pozycje: "Готові положення",
      wibracja: "Вібрація при дотику",
      auto_czujniki: "Шукати датчики автоматично",
      czujnik_lewe: "Датчик лівої стулки",
      tryb_lewe: "Ліва стулка",
      czujnik_prawe: "Датчик правої стулки",
      tryb_prawe: "Права стулка",
      predkosc_lewa: "Швидкість мотора (ліва)",
      predkosc_prawa: "Швидкість мотора (права)",
      czas: "Час ходу",
      niebo: "Погода за вікном",
      pogoda: "Сутність погоди",
      widok: "Краєвид за вікном",
      jezyk: "Мова картки"
    },
    pomoc: {
      entity: "Вікно з Motor HA, група з двох штор або одна штора.",
      roleta_lewa: "Порожньо = з вікна або групи.",
      odwroc: "Коли мотор показує 100 % при закритій шторі.",
      osobno: "Перетягування по склу рухає лише цю стулку.",
      pozycje: "Напр. 100, 75, 50, 25, 0. Порожньо = без кнопок положень.",
      auto_czujniki: "Датчики вікна з тієї самої кімнати.",
      predkosc_lewa: "Сутність number зі швидкістю мотора (напр. Moes, Tuya). Порожньо = з пристрою.",
      czas: "0 = автоматично.",
      pogoda: "Порожньо = перша сутність погоди в HA, інакше погода з інтернету.",
      widok: "Намальовані будинки, дерева й ліхтарі."
    },
    grupy: {
      wew: "Усередині",
      zew: "Ззовні",
      rolety: "Рулонні штори",
      plisy: "Плісе та римські",
      zaluzje: "Жалюзі",
      zrolety: "Ролети",
      fasadowe: "Фасадні жалюзі",
      taras: "Тераса"
    },
    oslony: {
      pelna: "Відкрита рулонна штора",
      kasetowa: "Касетна рулонна штора",
      zebra: "Штора день-ніч",
      zaciemniajaca: "Блекаут",
      plisa: "Плісе",
      plaster: "Плісе стільники",
      rzymska: "Римська штора",
      zaluzja: "Алюмінієві жалюзі",
      drewniana: "Дерев'яні жалюзі",
      natynkowa: "Накладна ролета",
      podtynkowa: "Прихована ролета",
      zewnetrzna: "Надвіконна ролета",
      perforowana: "Перфорована ролета",
      fasadowa: "Фасадні жалюзі C80",
      fasadowaz: "Фасадні жалюзі Z90",
      markiza: "Терасна маркіза",
      screen: "ZIP-скрін"
    },
    kolory: {
      czarny: "чорний",
      grafit: "графіт",
      szary: "сірий",
      popiel: "попелястий",
      srebrny: "сріблястий",
      bialy: "білий",
      kremowy: "кремовий",
      piaskowy: "пісочний",
      bezowy: "бежевий",
      cappuccino: "капучино",
      mokka: "мокко",
      braz: "коричневий",
      wenge: "венге",
      stalowy: "сталевий",
      granat: "темно-синій",
      blekitny: "блакитний",
      niebieski: "синій",
      morski: "морський",
      turkus: "бірюзовий",
      mietowy: "м'ятний",
      zielony: "зелений",
      butelkowy: "пляшково-зелений",
      oliwka: "оливковий",
      limonka: "лаймовий",
      zolty: "жовтий",
      musztardowy: "гірчичний",
      pomaranczowy: "помаранчевий",
      terakota: "теракотовий",
      czerwony: "червоний",
      bordo: "бордовий",
      pudrowy: "пудрово-рожевий",
      rozowy: "рожевий",
      lawendowy: "лавандовий",
      fiolet: "фіолетовий",
      sliwkowy: "сливовий"
    },
    ramy: {
      biala: "біла",
      kremowa: "кремова",
      jasnoszara: "світло-сіра",
      srebrna: "срібляста",
      szary_agat: "агатово-сіра",
      szara: "сіра",
      szary_kwarc: "кварцово-сіра",
      bazaltowa: "базальтово-сіра",
      antracyt: "антрацит",
      czarna: "чорна",
      zielona: "зелена",
      granatowa: "темно-синя",
      bordowa: "бордова",
      braz: "коричнева",
      sosna: "сосна",
      dab_jasny: "світлий дуб",
      dab_sheffield: "дуб Шеффілд",
      winchester: "вінчестер",
      oregon: "орегон",
      zloty_dab: "золотий дуб",
      siena: "сієна",
      orzech: "горіх",
      mahon: "махагон",
      dab_bagienny: "морений дуб"
    }
  };

  // tlumaczenia/ru.json
  var ru_default = {
    nazwa: "Motor HA",
    opis: "Окно со шторой: движется со скоростью мотора, настоящая погода и время суток за стеклом, датчики окна.",
    karta: {
      oba: "Потяните, чтобы сдвинуть обе шторы",
      otworz: "Открыть",
      stop: "Стоп",
      zamknij: "Закрыть",
      zwinieta: "Поднята",
      opuszczona: "Опущена",
      brak: "Объект не найден",
      okno: "Окно",
      lewe: "левое",
      prawe: "правое",
      otwarte: "открыто",
      uchylone: "на проветривании",
      pozycja: "Положение"
    },
    kroki: {
      urzadzenie: {
        t: "Устройство",
        co: "Выберите штору из Home Assistant и назовите окно.",
        poco: "Карточка управляет этой шторой и показывает её настоящее положение."
      },
      oslona: {
        t: "Штора",
        co: "Выберите тип шторы, как у вас дома.",
        poco: "Карточка нарисует этот материал. Наружные шторы видны с фасада."
      },
      kolory: {
        t: "Цвета",
        co: "Выберите цвет шторы и цвет рамы.",
        poco: "Окно на экране похоже на ваше настоящее."
      },
      okno: {
        t: "Окно",
        co: "Задайте число створок, высоту и кнопки.",
        poco: "Каждая створка может иметь свою штору и двигаться отдельно."
      },
      czujniki: {
        t: "Датчики",
        co: "Выберите датчики открытия окна (герконы).",
        poco: "Карточка покажет створку на проветривании или открытую."
      },
      silnik: {
        t: "Мотор",
        co: "Укажите скорость мотора или время полного хода.",
        poco: "Штора на экране движется так же быстро, как настоящая."
      },
      pogoda: {
        t: "Погода",
        co: "Выберите погоду за окном и язык карточки.",
        poco: "Солнце, дождь, снег, туман, день и ночь за стеклом."
      }
    },
    ui: {
      krok: "Шаг {0} из {1}",
      co: "Что:",
      poco: "Зачем:",
      wstecz: "Назад",
      dalej: "Далее",
      wUrzadzeniu: "Это окно из интеграции Motor HA. Изменения сразу сохраняются в устройстве окна, поэтому каждая карточка этого окна выглядит одинаково.",
      bezUrzadzenia: "Можно выбрать любую штору. Окно, добавленное в интеграции Motor HA, имеет ещё калибровку и хранит настройки в устройстве.",
      wybrany: "Выбрано:",
      jedno: "Одна створка",
      dwa: "Две створки",
      sterowanie: "Управление",
      uchyl: "Откидывается",
      otworz: "Открывается",
      znalezione: "Найдено автоматически в этой комнате: {0}",
      brakCzujnikow: "В комнате этой шторы нет датчиков окна. Их можно выбрать вручную.",
      czasReczny: "Полный ход: {0} с (задано вручную).",
      czasZPredkosci: "Полный ход: {0} с (по скорости мотора {1} об/мин).",
      czasNauczony: "Полный ход: {0} с (выучено по настоящим движениям).",
      czasDomyslny: "Полный ход: {0} с. Карточка сама выучит настоящее время после нескольких движений.",
      jezykAuto: "Как в профиле Home Assistant",
      pogodaZ: "Погода из: {0}",
      pogodaInternet: "В Home Assistant нет объекта погоды. Карточка возьмёт погоду из интернета (Open-Meteo) для местоположения дома."
    },
    pola: {
      entity: "Штора",
      name: "Название окна",
      kolor: "Цвет шторы",
      rama: "Цвет рамы",
      kolor_wlasny: "Свой цвет шторы",
      rama_wlasna: "Свой цвет рамы",
      skrzydla: "Створки",
      wysokosc: "Высота окна",
      roleta_lewa: "Штора левой створки",
      roleta_prawa: "Штора правой створки",
      odwroc: "Обратить положение",
      osobno: "Каждая створка отдельно",
      przyciski: "Кнопки",
      suwak: "Ползунок положения",
      pozycje: "Готовые положения",
      wibracja: "Вибрация при касании",
      auto_czujniki: "Искать датчики автоматически",
      czujnik_lewe: "Датчик левой створки",
      tryb_lewe: "Левая створка",
      czujnik_prawe: "Датчик правой створки",
      tryb_prawe: "Правая створка",
      predkosc_lewa: "Скорость мотора (левая)",
      predkosc_prawa: "Скорость мотора (правая)",
      czas: "Время хода",
      niebo: "Погода за окном",
      pogoda: "Объект погоды",
      widok: "Вид за окном",
      jezyk: "Язык карточки"
    },
    pomoc: {
      entity: "Окно из Motor HA, группа из двух штор или одна штора.",
      roleta_lewa: "Пусто = из окна или группы.",
      odwroc: "Когда мотор сообщает 100 % при закрытой шторе.",
      osobno: "Перетаскивание по стеклу двигает только эту створку.",
      pozycje: "Напр. 100, 75, 50, 25, 0. Пусто = без кнопок положений.",
      auto_czujniki: "Датчики окна из той же комнаты.",
      predkosc_lewa: "Объект number со скоростью мотора (напр. Moes, Tuya). Пусто = из устройства.",
      czas: "0 = автоматически.",
      pogoda: "Пусто = первый объект погоды в HA, иначе погода из интернета.",
      widok: "Нарисованные дома, деревья и фонари."
    },
    grupy: {
      wew: "Внутри",
      zew: "Снаружи",
      rolety: "Рулонные шторы",
      plisy: "Плиссе и римские",
      zaluzje: "Жалюзи",
      zrolety: "Рольставни",
      fasadowe: "Фасадные жалюзи",
      taras: "Терраса"
    },
    oslony: {
      pelna: "Открытая рулонная штора",
      kasetowa: "Кассетная рулонная штора",
      zebra: "Штора день-ночь",
      zaciemniajaca: "Блэкаут",
      plisa: "Плиссе",
      plaster: "Плиссе соты",
      rzymska: "Римская штора",
      zaluzja: "Алюминиевые жалюзи",
      drewniana: "Деревянные жалюзи",
      natynkowa: "Накладная рольставня",
      podtynkowa: "Скрытая рольставня",
      zewnetrzna: "Надоконная рольставня",
      perforowana: "Перфорированная рольставня",
      fasadowa: "Фасадные жалюзи C80",
      fasadowaz: "Фасадные жалюзи Z90",
      markiza: "Террасная маркиза",
      screen: "ZIP-скрин"
    },
    kolory: {
      czarny: "чёрный",
      grafit: "графит",
      szary: "серый",
      popiel: "пепельный",
      srebrny: "серебристый",
      bialy: "белый",
      kremowy: "кремовый",
      piaskowy: "песочный",
      bezowy: "бежевый",
      cappuccino: "капучино",
      mokka: "мокко",
      braz: "коричневый",
      wenge: "венге",
      stalowy: "стальной",
      granat: "тёмно-синий",
      blekitny: "голубой",
      niebieski: "синий",
      morski: "морской",
      turkus: "бирюзовый",
      mietowy: "мятный",
      zielony: "зелёный",
      butelkowy: "бутылочно-зелёный",
      oliwka: "оливковый",
      limonka: "лаймовый",
      zolty: "жёлтый",
      musztardowy: "горчичный",
      pomaranczowy: "оранжевый",
      terakota: "терракотовый",
      czerwony: "красный",
      bordo: "бордовый",
      pudrowy: "пудрово-розовый",
      rozowy: "розовый",
      lawendowy: "лавандовый",
      fiolet: "фиолетовый",
      sliwkowy: "сливовый"
    },
    ramy: {
      biala: "белая",
      kremowa: "кремовая",
      jasnoszara: "светло-серая",
      srebrna: "серебристая",
      szary_agat: "агатовый серый",
      szara: "серая",
      szary_kwarc: "кварцевый серый",
      bazaltowa: "базальтовый серый",
      antracyt: "антрацит",
      czarna: "чёрная",
      zielona: "зелёная",
      granatowa: "тёмно-синяя",
      bordowa: "бордовая",
      braz: "коричневая",
      sosna: "сосна",
      dab_jasny: "светлый дуб",
      dab_sheffield: "дуб Шеффилд",
      winchester: "винчестер",
      oregon: "орегон",
      zloty_dab: "золотой дуб",
      siena: "сиена",
      orzech: "орех",
      mahon: "махагон",
      dab_bagienny: "морёный дуб"
    }
  };

  // tlumaczenia/ja.json
  var ja_default = {
    nazwa: "Motor HA",
    opis: "シェード付きの窓：モーターの速さで動き、外の天気と時間帯、窓センサーを表示します。",
    karta: {
      oba: "ドラッグして両方のシェードを動かす",
      otworz: "開く",
      stop: "停止",
      zamknij: "閉じる",
      zwinieta: "全開",
      opuszczona: "全閉",
      brak: "エンティティが見つかりません",
      okno: "窓",
      lewe: "左",
      prawe: "右",
      otwarte: "開",
      uchylone: "換気",
      pozycja: "位置"
    },
    kroki: {
      urzadzenie: {
        t: "デバイス",
        co: "Home Assistant のシェードを選び、窓に名前を付けます。",
        poco: "カードはこのシェードを操作し、実際の位置を表示します。"
      },
      oslona: {
        t: "シェード",
        co: "家にあるシェードの種類を選びます。",
        poco: "カードがこの素材を描きます。屋外用は外壁側から表示します。"
      },
      kolory: {
        t: "色",
        co: "シェードの色と窓枠の色を選びます。",
        poco: "画面の窓が本物そっくりになります。"
      },
      okno: {
        t: "窓",
        co: "窓の枚数、高さ、ボタンを設定します。",
        poco: "窓ごとに別のシェードを付けて個別に動かせます。"
      },
      czujniki: {
        t: "センサー",
        co: "窓の開閉センサーを選びます。",
        poco: "カードが換気中や開いた窓を表示します。"
      },
      silnik: {
        t: "モーター",
        co: "モーターの速度か全開閉の時間を入力します。",
        poco: "画面のシェードが本物と同じ速さで動きます。"
      },
      pogoda: {
        t: "天気",
        co: "外の天気とカードの言語を選びます。",
        poco: "ガラスの向こうに晴れ、雨、雪、霧、昼と夜が見えます。"
      }
    },
    ui: {
      krok: "ステップ {0} / {1}",
      co: "内容：",
      poco: "目的：",
      wstecz: "戻る",
      dalej: "次へ",
      wUrzadzeniu: "この窓は Motor HA 統合のものです。変更はすぐに窓のデバイスに保存され、この窓のどのカードも同じ見た目になります。",
      bezUrzadzenia: "どのシェードでも選べます。Motor HA 統合で追加した窓にはキャリブレーションがあり、設定をデバイスに保存します。",
      wybrany: "選択中：",
      jedno: "片開き",
      dwa: "両開き",
      sterowanie: "操作",
      uchyl: "内倒し",
      otworz: "開き",
      znalezione: "この部屋で自動検出：{0}",
      brakCzujnikow: "このシェードの部屋に窓センサーがありません。手動で選べます。",
      czasReczny: "全開閉：{0} 秒（手動設定）。",
      czasZPredkosci: "全開閉：{0} 秒（モーター速度 {1} rpm から）。",
      czasNauczony: "全開閉：{0} 秒（実際の動きから学習）。",
      czasDomyslny: "全開閉：{0} 秒。数回動かすと実際の時間を学習します。",
      jezykAuto: "Home Assistant のプロフィールと同じ",
      pogodaZ: "天気の取得元：{0}",
      pogodaInternet: "Home Assistant に天気エンティティがありません。自宅の位置の天気をインターネット（Open-Meteo）から取得します。"
    },
    pola: {
      entity: "シェード",
      name: "窓の名前",
      kolor: "シェードの色",
      rama: "窓枠の色",
      kolor_wlasny: "シェードの任意色",
      rama_wlasna: "窓枠の任意色",
      skrzydla: "窓の枚数",
      wysokosc: "窓の高さ",
      roleta_lewa: "左側のシェード",
      roleta_prawa: "右側のシェード",
      odwroc: "位置を反転",
      osobno: "左右を個別に",
      przyciski: "ボタン",
      suwak: "位置スライダー",
      pozycje: "プリセット位置",
      wibracja: "タッチで振動",
      auto_czujniki: "センサーを自動で探す",
      czujnik_lewe: "左側のセンサー",
      tryb_lewe: "左側",
      czujnik_prawe: "右側のセンサー",
      tryb_prawe: "右側",
      predkosc_lewa: "モーター速度（左）",
      predkosc_prawa: "モーター速度（右）",
      czas: "開閉時間",
      niebo: "外の天気",
      pogoda: "天気エンティティ",
      widok: "外の景色",
      jezyk: "カードの言語"
    },
    pomoc: {
      entity: "Motor HA の窓、2 つのブラインドのグループ、または 1 つのブラインド。",
      roleta_lewa: "空欄 = 窓またはグループから。",
      odwroc: "閉じているのにモーターが 100 % と報告する場合。",
      osobno: "ガラスをドラッグするとこの窓だけ動きます。",
      pozycje: "例：100, 75, 50, 25, 0。空欄 = 位置ボタンなし。",
      auto_czujniki: "同じ部屋の窓センサー。",
      predkosc_lewa: "モーター速度の number エンティティ（例：Moes、Tuya）。空欄 = デバイスから。",
      czas: "0 = 自動。",
      pogoda: "空欄 = HA の最初の天気エンティティ、なければインターネットの天気。",
      widok: "描かれた家、木、街灯。"
    },
    grupy: {
      wew: "室内",
      zew: "屋外",
      rolety: "ロールスクリーン",
      plisy: "プリーツ・ローマン",
      zaluzje: "ブラインド",
      zrolety: "シャッター",
      fasadowe: "外付けブラインド",
      taras: "テラス"
    },
    oslony: {
      pelna: "オープン型ロールスクリーン",
      kasetowa: "カセット型ロールスクリーン",
      zebra: "調光ロールスクリーン",
      zaciemniajaca: "遮光ロールスクリーン",
      plisa: "プリーツスクリーン",
      plaster: "ハニカムスクリーン",
      rzymska: "ローマンシェード",
      zaluzja: "アルミブラインド",
      drewniana: "木製ブラインド",
      natynkowa: "外付けシャッター",
      podtynkowa: "埋込シャッター",
      zewnetrzna: "上置きシャッター",
      perforowana: "採光シャッター",
      fasadowa: "外付けブラインド C80",
      fasadowaz: "外付けブラインド Z90",
      markiza: "テラスオーニング",
      screen: "ZIP スクリーン"
    },
    kolory: {
      czarny: "黒",
      grafit: "グラファイト",
      szary: "グレー",
      popiel: "アッシュ",
      srebrny: "シルバー",
      bialy: "白",
      kremowy: "クリーム",
      piaskowy: "サンド",
      bezowy: "ベージュ",
      cappuccino: "カプチーノ",
      mokka: "モカ",
      braz: "ブラウン",
      wenge: "ウェンジ",
      stalowy: "スチール",
      granat: "ネイビー",
      blekitny: "スカイブルー",
      niebieski: "ブルー",
      morski: "シーグリーン",
      turkus: "ターコイズ",
      mietowy: "ミント",
      zielony: "グリーン",
      butelkowy: "ボトルグリーン",
      oliwka: "オリーブ",
      limonka: "ライム",
      zolty: "イエロー",
      musztardowy: "マスタード",
      pomaranczowy: "オレンジ",
      terakota: "テラコッタ",
      czerwony: "レッド",
      bordo: "ボルドー",
      pudrowy: "パウダーピンク",
      rozowy: "ピンク",
      lawendowy: "ラベンダー",
      fiolet: "バイオレット",
      sliwkowy: "プラム"
    },
    ramy: {
      biala: "ホワイト",
      kremowa: "クリーム",
      jasnoszara: "ライトグレー",
      srebrna: "シルバー",
      szary_agat: "アゲートグレー",
      szara: "グレー",
      szary_kwarc: "クォーツグレー",
      bazaltowa: "バサルトグレー",
      antracyt: "アンスラサイト",
      czarna: "ブラック",
      zielona: "グリーン",
      granatowa: "ネイビー",
      bordowa: "ボルドー",
      braz: "ブラウン",
      sosna: "パイン",
      dab_jasny: "ライトオーク",
      dab_sheffield: "シェフィールドオーク",
      winchester: "ウィンチェスター",
      oregon: "オレゴン",
      zloty_dab: "ゴールデンオーク",
      siena: "シエナ",
      orzech: "ウォールナット",
      mahon: "マホガニー",
      dab_bagienny: "ボグオーク"
    }
  };

  // tlumaczenia/zh-Hans.json
  var zh_Hans_default = {
    nazwa: "Motor HA",
    opis: "带遮阳的窗户：按电机速度移动，窗外显示真实天气和时段，并显示窗户传感器。",
    karta: {
      oba: "拖动以同时移动两个遮阳",
      otworz: "打开",
      stop: "停止",
      zamknij: "关闭",
      zwinieta: "全开",
      opuszczona: "全关",
      brak: "未找到实体",
      okno: "窗户",
      lewe: "左",
      prawe: "右",
      otwarte: "已打开",
      uchylone: "已内倒",
      pozycja: "位置"
    },
    kroki: {
      urzadzenie: {
        t: "设备",
        co: "从 Home Assistant 选择一个遮阳并为窗户命名。",
        poco: "卡片控制这个遮阳并显示其真实位置。"
      },
      oslona: {
        t: "遮阳",
        co: "选择家中遮阳的类型。",
        poco: "卡片会画出这种材质。室外遮阳从外墙一侧显示。"
      },
      kolory: {
        t: "颜色",
        co: "选择遮阳颜色和窗框颜色。",
        poco: "屏幕上的窗户看起来和真实的一样。"
      },
      okno: {
        t: "窗户",
        co: "设置窗扇数量、高度和按钮。",
        poco: "每个窗扇可以有自己的遮阳并单独移动。"
      },
      czujniki: {
        t: "传感器",
        co: "选择窗户开合传感器（门磁）。",
        poco: "卡片会显示内倒或打开的窗扇。"
      },
      silnik: {
        t: "电机",
        co: "输入电机速度或完整行程时间。",
        poco: "屏幕上的遮阳和真实的一样快。"
      },
      pogoda: {
        t: "天气",
        co: "选择窗外天气和卡片语言。",
        poco: "玻璃后可见晴、雨、雪、雾、白天和夜晚。"
      }
    },
    ui: {
      krok: "第 {0} 步，共 {1} 步",
      co: "内容：",
      poco: "目的：",
      wstecz: "上一步",
      dalej: "下一步",
      wUrzadzeniu: "此窗户来自 Motor HA 集成。更改会立即保存到窗户设备中，因此该窗户的每张卡片看起来都一样。",
      bezUrzadzenia: "可以选择任何遮阳。在 Motor HA 集成中添加的窗户还有校准功能，并把设置保存在设备中。",
      wybrany: "已选择：",
      jedno: "单扇",
      dwa: "双扇",
      sterowanie: "控制",
      uchyl: "内倒",
      otworz: "内开",
      znalezione: "已在此房间自动找到：{0}",
      brakCzujnikow: "此遮阳所在房间没有窗户传感器。你可以手动选择。",
      czasReczny: "完整行程：{0} 秒（手动设置）。",
      czasZPredkosci: "完整行程：{0} 秒（根据电机速度 {1} 转/分）。",
      czasNauczony: "完整行程：{0} 秒（从真实动作学习）。",
      czasDomyslny: "完整行程：{0} 秒。移动几次后卡片会学会真实时间。",
      jezykAuto: "与 Home Assistant 个人资料相同",
      pogodaZ: "天气来源：{0}",
      pogodaInternet: "Home Assistant 中没有天气实体。卡片将从互联网（Open-Meteo）获取家所在位置的天气。"
    },
    pola: {
      entity: "遮阳",
      name: "窗户名称",
      kolor: "遮阳颜色",
      rama: "窗框颜色",
      kolor_wlasny: "自定义遮阳颜色",
      rama_wlasna: "自定义窗框颜色",
      skrzydla: "窗扇",
      wysokosc: "窗户高度",
      roleta_lewa: "左扇遮阳",
      roleta_prawa: "右扇遮阳",
      odwroc: "反转位置",
      osobno: "每扇单独",
      przyciski: "按钮",
      suwak: "位置滑块",
      pozycje: "预设位置",
      wibracja: "触摸振动",
      auto_czujniki: "自动查找传感器",
      czujnik_lewe: "左扇传感器",
      tryb_lewe: "左扇",
      czujnik_prawe: "右扇传感器",
      tryb_prawe: "右扇",
      predkosc_lewa: "电机速度（左）",
      predkosc_prawa: "电机速度（右）",
      czas: "行程时间",
      niebo: "窗外天气",
      pogoda: "天气实体",
      widok: "窗外景色",
      jezyk: "卡片语言"
    },
    pomoc: {
      entity: "Motor HA 窗户、两个卷帘的组或单个卷帘。",
      roleta_lewa: "留空 = 取自窗户或组。",
      odwroc: "当遮阳关闭时电机却报告 100 %。",
      osobno: "在玻璃上拖动只移动这一扇。",
      pozycje: "例如 100, 75, 50, 25, 0。留空 = 不显示位置按钮。",
      auto_czujniki: "同一房间的窗户传感器。",
      predkosc_lewa: "表示电机转速的 number 实体（如 Moes、Tuya）。留空 = 从设备获取。",
      czas: "0 = 自动。",
      pogoda: "留空 = HA 中第一个天气实体，否则使用互联网天气。",
      widok: "画出的房屋、树木和路灯。"
    },
    grupy: {
      wew: "室内",
      zew: "室外",
      rolety: "卷帘",
      plisy: "百褶帘和罗马帘",
      zaluzje: "百叶帘",
      zrolety: "卷帘门窗",
      fasadowe: "外遮阳百叶",
      taras: "露台"
    },
    oslony: {
      pelna: "开放式卷帘",
      kasetowa: "盒式卷帘",
      zebra: "日夜帘",
      zaciemniajaca: "遮光卷帘",
      plisa: "百褶帘",
      plaster: "蜂巢帘",
      rzymska: "罗马帘",
      zaluzja: "铝百叶帘",
      drewniana: "木百叶帘",
      natynkowa: "明装卷帘窗",
      podtynkowa: "暗装卷帘窗",
      zewnetrzna: "窗上卷帘窗",
      perforowana: "透光卷帘窗",
      fasadowa: "外遮阳百叶 C80",
      fasadowaz: "外遮阳百叶 Z90",
      markiza: "露台遮阳篷",
      screen: "ZIP 遮阳帘"
    },
    kolory: {
      czarny: "黑色",
      grafit: "石墨色",
      szary: "灰色",
      popiel: "灰白色",
      srebrny: "银色",
      bialy: "白色",
      kremowy: "奶油色",
      piaskowy: "沙色",
      bezowy: "米色",
      cappuccino: "卡布奇诺色",
      mokka: "摩卡色",
      braz: "棕色",
      wenge: "鸡翅木色",
      stalowy: "钢蓝色",
      granat: "藏青色",
      blekitny: "天蓝色",
      niebieski: "蓝色",
      morski: "海青色",
      turkus: "绿松石色",
      mietowy: "薄荷色",
      zielony: "绿色",
      butelkowy: "墨绿色",
      oliwka: "橄榄色",
      limonka: "青柠色",
      zolty: "黄色",
      musztardowy: "芥末黄",
      pomaranczowy: "橙色",
      terakota: "陶土色",
      czerwony: "红色",
      bordo: "酒红色",
      pudrowy: "粉红色",
      rozowy: "玫红色",
      lawendowy: "薰衣草色",
      fiolet: "紫色",
      sliwkowy: "梅子色"
    },
    ramy: {
      biala: "白色",
      kremowa: "奶油色",
      jasnoszara: "浅灰色",
      srebrna: "银色",
      szary_agat: "玛瑙灰",
      szara: "灰色",
      szary_kwarc: "石英灰",
      bazaltowa: "玄武岩灰",
      antracyt: "炭灰色",
      czarna: "黑色",
      zielona: "绿色",
      granatowa: "藏青色",
      bordowa: "酒红色",
      braz: "棕色",
      sosna: "松木",
      dab_jasny: "浅橡木",
      dab_sheffield: "谢菲尔德橡木",
      winchester: "温彻斯特木纹",
      oregon: "俄勒冈木纹",
      zloty_dab: "金橡木",
      siena: "锡耶纳木纹",
      orzech: "胡桃木",
      mahon: "桃花心木",
      dab_bagienny: "沼泽橡木"
    }
  };

  // src/jezyk.js
  var SUROWE = { pl: pl_default, en: en_default, de: de_default, fr: fr_default, cs: cs_default, sk: sk_default, es: es_default, it: it_default, nl: nl_default, pt: pt_default, uk: uk_default, ru: ru_default, ja: ja_default, "zh-Hans": zh_Hans_default };
  var NAZWY_JEZYKOW = {
    pl: "Polski",
    en: "English",
    de: "Deutsch",
    fr: "Français",
    cs: "Čeština",
    sk: "Slovenčina",
    es: "Español",
    it: "Italiano",
    nl: "Nederlands",
    pt: "Português",
    uk: "Українська",
    ru: "Русский",
    ja: "日本語",
    "zh-Hans": "简体中文"
  };
  var scal = (baza, x) => baza && typeof baza === "object" && !Array.isArray(baza) ? Object.fromEntries(Object.entries(baza).map(([k, v]) => [k, scal(v, x?.[k])])) : typeof x === typeof baza ? x : baza;
  var TEKSTY = Object.fromEntries(Object.entries(SUROWE).map(([k, v]) => [k, k === "en" ? en_default : scal(en_default, v)]));
  function kodJezyka(s) {
    const k = String(s || "").replace("_", "-");
    if (TEKSTY[k]) return k;
    const p = k.split("-")[0].toLowerCase();
    if (p === "zh") return "zh-Hans";
    return TEKSTY[p] ? p : "en";
  }
  var jezyk = (cfg, hass) => cfg?.jezyk && cfg.jezyk !== "auto" && TEKSTY[cfg.jezyk] ? cfg.jezyk : kodJezyka(hass?.locale?.language || hass?.language || navigator.language);
  var wstaw = (t, ...a) => String(t ?? "").replace(/\{(\d)\}/g, (_, i) => a[i] ?? "");

  // src/karta.js
  var KLUCZE_PANELU = ["type", "entity", "grid_options", "view_layout", "visibility", "layout_options"];
  var KASETA = {
    pelna: 10,
    plisa: 8,
    plaster: 8,
    rzymska: 8,
    zaluzja: 9,
    drewniana: 9,
    zewnetrzna: 16,
    perforowana: 16,
    natynkowa: 20,
    podtynkowa: 12,
    fasadowa: 14,
    fasadowaz: 14,
    screen: 16,
    markiza: 16
  };
  var LISTWA = 5;
  var POD_LISTWA = 8;
  var esc = (s) => String(s ?? "").replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[z]);
  var MotorHaKarta = class extends HTMLElement {
    static getConfigElement() {
      return document.createElement("motor-ha-editor");
    }
    static getStubConfig(hass) {
      return { entity: oslonyDoWyboru(hass)[0] || "cover.okno" };
    }
    setConfig(cfg) {
      if (!cfg || !cfg.entity) throw new Error("entity");
      this._surowa = cfg;
      this._klucz = null;
      if (this._hass) this._odswiez();
    }
    set hass(h) {
      this._hass = h;
      this._odswiez();
    }
    getCardSize() {
      return Math.ceil((+this._cfg?.wysokosc || 260) / 50) + 2;
    }
    getGridOptions() {
      return { columns: 12, min_columns: 6, rows: "auto" };
    }
    connectedCallback() {
      if (this._zbudowana) this._animuj();
    }
    disconnectedCallback() {
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
    // ustawienia: domyślne ← urządzenie Motor HA (atrybut motor_ha) ← karta na panelu
    get _ustawienia() {
      const urz = this._hass?.states?.[this._surowa.entity]?.attributes?.motor_ha;
      return Object.assign({}, DOMYSLNE, urz && typeof urz === "object" ? urz : {}, this._surowa, this._surowa._podglad || {});
    }
    get _T() {
      return TEKSTY[this._jez];
    }
    // encje skrzydeł: wybrane ręcznie, członkowie grupy (okno z integracji to też grupa) albo sama encja
    _skrzydla(c) {
      const s = this._hass.states, n = +c.skrzydla === 1 ? 1 : 2;
      const grupa = (s[c.entity]?.attributes?.entity_id || []).filter((e) => s[e]);
      const wybor = [c.roleta_lewa, c.roleta_prawa];
      return Array.from({ length: n }, (_, i) => wybor[i] && s[wybor[i]] ? wybor[i] : grupa.length ? grupa[Math.min(i, grupa.length - 1)] : c.entity);
    }
    _odswiez() {
      if (!this._hass || !this._surowa) return;
      const c = this._cfg = this._ustawienia;
      this._jez = jezyk(c, this._hass);
      const czl = this._skrzydla(c);
      const klucz = JSON.stringify([czl.length, c.oslona, c.kolor, c.rama, c.wysokosc, c.przyciski, c.suwak, c.pozycje, this._jez, c.osobno]);
      if (klucz !== this._klucz) {
        this._klucz = klucz;
        this._zbuduj(c, czl);
      }
      this._aktualizuj(c, czl);
    }
    _zbuduj(c, czl) {
      const T2 = this._T, n = czl.length, zew = czyZew(c.oslona), rama = ramaHex(c.rama), kolor = hex(c.kolor);
      const H = Math.max(140, Math.min(600, +c.wysokosc || 260)) * (n === 1 ? 1.15 : 1), W = Math.round(H * (n === 1 ? 0.68 : 0.92));
      this._kas = KASETA[c.oslona] ?? 12;
      const root = this.shadowRoot || this.attachShadow({ mode: "open" });
      const skrzydlo = (i) => `<div class="skrz" data-i="${i}"><div class="szyba">
      ${zew ? '<div class="pokoj"></div>' : `<div class="niebo"></div><div class="osiedle-w"></div><div class="pg"></div><i class="promien"></i>
      <div class="oslona"></div><div class="listwa"></div><div class="kaseta"></div><i class="prow l"></i><i class="prow p"></i>`}
      <div class="blask"></div><div class="cel"><span></span></div></div>${n > 1 ? '<i class="klamka"></i>' : ""}</div>`;
      const kolumna = (i) => `<div class="szyba" data-i="${i}"><div class="oslona"></div><div class="listwa"></div><div class="kaseta"></div><i class="prow l"></i><i class="prow p"></i><div class="cel"><span></span></div></div>`;
      const pozycje = String(c.pozycje || "").split(/[,; ]+/).filter((x) => x !== "").map(Number).filter((x) => Number.isFinite(x) && x >= 0 && x <= 100).slice(0, 6);
      root.innerHTML = `<style>${STYL_STALY}${stylOkna({ rama, drewno: czyDrewno(c.rama), kolor, typ: c.oslona, zew })}</style>
<ha-card class="${zew ? "zew" : "wew"}"><div class="mh">
 <div class="gl" role="button" tabindex="0"><div class="ik"><ha-icon icon="${IKONY[c.oslona] || IKONY.zebra}"></ha-icon></div>
  <div class="opis"><span class="nazwa"></span><span class="stan"></span></div></div>
 <div class="scena">${zew ? '<div class="pg pgz"></div>' : ""}
  <div class="okno" style="width:min(100%,${W}px);aspect-ratio:${W}/${Math.round(H)}">
   ${zew ? "" : czl.map((_, i) => `<div class="za" style="${n > 1 ? `left:${i ? "50%" : "6px"};right:${i ? "6px" : "50%"}` : ""}"></div>`).join("")}
   ${Array.from({ length: n }, (_, i) => skrzydlo(i)).join("")}
   ${zew ? `<div class="zewo">${Array.from({ length: n }, (_, i) => kolumna(i)).join("")}</div>` : ""}
   ${n > 1 && !c.osobno ? `<div class="oba" title="${esc(T2.karta.oba)}"><ha-icon icon="mdi:arrow-up-down"></ha-icon></div>` : ""}
  </div></div>
 ${c.przyciski !== false ? `<div class="przyc">
  <button class="otw" title="${esc(this._lok("ui.card.cover.open_cover", T2.karta.otworz))}"><ha-icon icon="mdi:arrow-up"></ha-icon></button>
  <button class="stp" title="${esc(this._lok("ui.card.cover.stop_cover", T2.karta.stop))}"><ha-icon icon="mdi:stop"></ha-icon></button>
  <button class="zam" title="${esc(this._lok("ui.card.cover.close_cover", T2.karta.zamknij))}"><ha-icon icon="mdi:arrow-down"></ha-icon></button></div>` : ""}
 ${c.suwak !== false ? `<div class="suwak" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(this._lok("ui.card.cover.position", T2.karta.pozycja))}"><div class="wyp"></div></div>` : ""}
 ${pozycje.length ? `<div class="poz">${pozycje.map((p) => `<button data-p="${p}">${p === 100 ? esc(T2.karta.zwinieta) : p === 0 ? esc(T2.karta.opuszczona) : p + " %"}</button>`).join("")}</div>` : ""}
</div></ha-card>`;
      const q = (s) => root.querySelector(s), qa = (s) => [...root.querySelectorAll(s)];
      const pola = zew ? qa(".zewo .szyba") : qa(".skrz .szyba");
      this._el = {
        karta: q("ha-card"),
        nazwa: q(".nazwa"),
        stan: q(".stan"),
        ik: q(".ik"),
        oba: q(".oba"),
        suwak: q(".suwak"),
        pgz: q(".pgz"),
        otw: q(".otw"),
        stp: q(".stp"),
        zam: q(".zam"),
        poz: qa(".poz button"),
        skrz: qa(".skrz").map((s, i) => ({ s, niebo: s.querySelector(".niebo"), osiedle: s.querySelector(".osiedle-w"), pg: s.querySelector(".pg"), za: qa(".za")[i] })),
        pola: pola.map((p) => ({ p, oslona: p.querySelector(".oslona"), listwa: p.querySelector(".listwa"), cel: p.querySelector(".cel"), celT: p.querySelector(".cel span") }))
      };
      this._ruchy = czl.map((e) => new Ruch(e));
      this._czl = null;
      this._niebo = null;
      this._zew = zew;
      const E = this._el;
      q(".gl").addEventListener("click", () => this._wiecej());
      q(".gl").addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") this._wiecej();
      });
      E.otw?.addEventListener("click", () => this._polecenie(100));
      E.zam?.addEventListener("click", () => this._polecenie(0));
      E.stp?.addEventListener("click", () => this._polecenie(null));
      E.poz.forEach((b) => b.addEventListener("click", () => this._polecenie(+b.dataset.p)));
      E.pola.forEach((P, i) => this._ciagnij(zew ? P.p : E.skrz[i].s, [i]));
      if (E.oba) this._ciagnij(E.oba, czl.map((_, i) => i), true);
      if (E.suwak) this._suwak(E.suwak);
      this._zbudowana = true;
    }
    _lok(klucz, zapas) {
      return this._hass?.localize?.(klucz) || zapas;
    }
    _wiecej() {
      this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: this._cfg.entity } }));
    }
    // polecenie dla wszystkich (albo wybranych) skrzydeł; cel null = stop
    _polecenie(cel, ktore) {
      const c = this._cfg, teraz = performance.now(), czl = this._czl || [];
      const idx = ktore || czl.map((_, i) => i);
      idx.forEach((i) => this._ruchy[i]?.polecenie(cel, teraz));
      this._animuj();
      if (c.wibracja !== false) try {
        navigator.vibrate?.(10);
      } catch (e) {
      }
      if (c._podglad) return;
      const encje = ktore ? [...new Set(idx.map((i) => czl[i]))] : [c.entity];
      const usl = cel === null ? "stop_cover" : cel === 100 ? "open_cover" : cel === 0 ? "close_cover" : "set_cover_position";
      const dane = usl === "set_cover_position" ? { position: c.odwroc ? 100 - cel : cel } : {};
      this._hass.callService("cover", usl, { entity_id: encje, ...dane });
    }
    // pozycja z wysokości palca na szybie
    _pozycjaZ(pole, y) {
      const r = pole.getBoundingClientRect(), gora = this._kas, zakres = r.height - gora - LISTWA - POD_LISTWA;
      return Math.round(100 - Math.min(1, Math.max(0, (y - r.top - gora) / zakres)) * 100);
    }
    _gornaListwy(wys, p) {
      return this._kas - 2 + (wys - this._kas - LISTWA - POD_LISTWA + 2) * (100 - p) / 100;
    }
    _ciagnij(el, idx, srodek) {
      let start = null, wart = null;
      const pole = (i) => this._el.pola[i].p;
      el.addEventListener("pointerdown", (e) => {
        start = e.clientY;
        wart = null;
        this._ciagnie = true;
        el.setPointerCapture?.(e.pointerId);
        e.stopPropagation();
      });
      el.addEventListener("pointermove", (e) => {
        if (start === null || wart === null && Math.abs(e.clientY - start) < 6) return;
        wart = this._pozycjaZ(pole(idx[0]), e.clientY);
        const ktore = srodek || this._cfg.osobno || this._czl?.length < 2 ? idx : this._el.pola.map((_, i) => i);
        ktore.forEach((i) => this._pokazCel(i, wart, true));
      });
      const koniec = () => {
        if (start === null) return;
        start = null;
        this._ciagnie = false;
        this._el.pola.forEach((_, i) => this._pokazCel(i, null));
        const ktore = srodek || !(this._cfg.osobno && this._czl?.length > 1) ? null : idx;
        if (wart !== null) this._polecenie(wart, ktore);
        else if (!srodek) this._dotkniecie(ktore);
      };
      el.addEventListener("pointerup", koniec);
      el.addEventListener("pointercancel", koniec);
    }
    // dotknięcie jak przycisk pilota: jedzie → stop; stoi → w drugą stronę
    _dotkniecie(ktore) {
      const r = this._ruchy[ktore ? ktore[0] : 0];
      if (!r || r.widac === null) return;
      if (r.jedzie) {
        this._kier = r.cel > r.widac ? 1 : -1;
        this._polecenie(null, ktore);
        return;
      }
      const w = r.widac >= 99.5 ? -1 : r.widac <= 0.5 ? 1 : -(this._kier || -1);
      this._kier = w;
      this._polecenie(w > 0 ? 100 : 0, ktore);
    }
    _suwak(el) {
      let akt = false;
      const wart = (x) => {
        const r = el.getBoundingClientRect();
        return Math.round(Math.min(1, Math.max(0, (x - r.left) / r.width)) * 100);
      };
      el.addEventListener("pointerdown", (e) => {
        akt = true;
        this._suwakW = wart(e.clientX);
        el.setPointerCapture?.(e.pointerId);
        this._rysujSuwak();
      });
      el.addEventListener("pointermove", (e) => {
        if (akt) {
          this._suwakW = wart(e.clientX);
          this._rysujSuwak();
        }
      });
      const koniec = () => {
        if (!akt) return;
        akt = false;
        const w = this._suwakW;
        this._suwakW = null;
        this._polecenie(w);
      };
      el.addEventListener("pointerup", koniec);
      el.addEventListener("pointercancel", koniec);
      el.addEventListener("keydown", (e) => {
        const d = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5, PageUp: 10, PageDown: -10 }[e.key];
        if (d) {
          e.preventDefault();
          this._polecenie(Math.max(0, Math.min(100, Math.round(this._srednia() + d))));
        }
      });
    }
    _srednia(cel) {
      const r = this._ruchy.filter((x) => x.widac !== null);
      return r.length ? r.reduce((a, x) => a + (cel ? x.cel : x.widac), 0) / r.length : 0;
    }
    _aktualizuj(c, czl) {
      const h = this._hass, T2 = this._T, E = this._el, st = h.states[c.entity], teraz = performance.now();
      if (!st) {
        E.nazwa.textContent = c.name || c.entity;
        E.stan.textContent = this._lok("ui.panel.lovelace.warning.entity_not_found", T2.karta.brak);
        return;
      }
      this._czl = czl;
      E.nazwa.textContent = c.name || st.attributes.friendly_name || c.entity;
      czl.forEach((e, i) => {
        const r = this._ruchy[i];
        r.czas = czasPrzejazdu(c.czas, obroty(h, e, c[i ? "predkosc_prawa" : "predkosc_lewa"]), e);
        const s = h.states[e] || st;
        if (s !== r._ost) {
          r._ost = s;
          r.meldunek(s, teraz, c.odwroc);
        }
      });
      const pg = c._podglad || {};
      const wid = c.pogoda === "brak" ? null : encjaPogody(h, c.pogoda);
      const ws = pg.pogoda ? { state: pg.pogoda, attributes: {} } : c.niebo === false || c.pogoda === "brak" ? null : wid && h.states[wid] ? h.states[wid] : pogodaZInternetu(h, () => this._odswiez());
      const pora = pg.pora || poraDnia(h), rodzaj = ws ? NIEBO_Z_POGODY[ws.state] || "chmury" : "slonce";
      const kn = rodzaj + pora + (c.widok !== false);
      if (kn !== this._niebo) {
        this._niebo = kn;
        E.karta.classList.toggle("noc", pora === "noc" || pora === "zmierzch");
        const bg = kolorNieba(rodzaj, pora);
        E.skrz.forEach((S, i) => {
          if (S.niebo) S.niebo.style.background = bg;
          if (S.za) S.za.style.background = bg;
          if (S.osiedle) S.osiedle.innerHTML = c.widok !== false ? widokSvg(rodzaj, pora, i, czl.length) : "";
          if (S.pg) S.pg.innerHTML = pogoda(rodzaj, pora, i, czl.length);
          S.s.classList.toggle("slonecznie", pora === "dzien" && (rodzaj === "slonce" || rodzaj === "chmurki"));
        });
        if (E.pgz) E.pgz.innerHTML = ["deszcz", "ulewa", "burza", "snieg", "deszczsnieg", "mgla"].includes(rodzaj) ? pogoda(rodzaj, pora, 0, 1).replace(/<i class="(slonce|ksiezyc|chm|gw)[^>]*><\/i>/g, "") : "";
      }
      const auto = c.auto_czujniki !== false ? czujnikiOkna(h, czl[0]) : [];
      const okno = [0, 1].map((k) => {
        const id = c[k ? "czujnik_prawe" : "czujnik_lewe"] || auto[k], s = id && h.states[id];
        return s?.state === "on" ? c[k ? "tryb_prawe" : "tryb_lewe"] === "otworz" ? "otw" : "uch" : "";
      });
      E.skrz.forEach((S, i) => {
        S.s.classList.toggle("uch", okno[i] === "uch");
        S.s.classList.toggle("otw", okno[i] === "otw");
        if (S.za) S.za.classList.toggle("widac", !!okno[i]);
      });
      const czesci = [];
      const pos = st.attributes.current_position;
      czesci.push(h.formatEntityState ? h.formatEntityState(st) : st.state);
      if (typeof pos === "number" && pos > 0 && pos < 100) czesci.push(`${c.odwroc ? 100 - pos : pos} %`);
      if (ws && !pg.pogoda) {
        const t = ws.attributes?.temperature;
        const opisPg = ws.entity_id && h.formatEntityState ? h.formatEntityState(ws) : this._lok(`component.weather.entity_component._.state.${ws.state}`, "");
        if (opisPg) czesci.push(opisPg + (typeof t === "number" ? ` ${Math.round(t)} ${ws.attributes.temperature_unit || "°C"}` : ""));
      }
      okno.forEach((o, k) => {
        if (o && k < czl.length) czesci.push(`${T2.karta.okno}${czl.length > 1 ? " " + (k ? T2.karta.prawe : T2.karta.lewe) : ""} ${o === "otw" ? T2.karta.otwarte : T2.karta.uchylone}`);
      });
      this._opisStanu = czesci;
      const otwarte = this._ruchy.some((r) => (r.widac ?? 0) > 0);
      E.karta.style.setProperty("--mh-kolor", otwarte ? "var(--state-cover-active-color,var(--state-active-color,var(--primary-color)))" : "var(--state-cover-inactive-color,var(--state-inactive-color,var(--disabled-color)))");
      this._animuj();
    }
    _pokazCel(i, p, ciagnie) {
      const P = this._el.pola[i];
      if (!P) return;
      if (p === null || p === void 0) {
        P.cel.style.display = "none";
        return;
      }
      const wys = P.p.clientHeight;
      P.cel.style.display = "block";
      P.cel.style.top = this._gornaListwy(wys, p) + LISTWA + "px";
      P.celT.textContent = (ciagnie ? "" : "→ ") + p + " %";
    }
    _rysujSuwak() {
      const S = this._el.suwak;
      if (!S) return;
      const w = this._suwakW ?? this._srednia(true);
      S.querySelector(".wyp").style.width = Math.max(0, Math.min(100, w)) + "%";
      S.setAttribute("aria-valuenow", Math.round(w));
    }
    _rysuj() {
      const E = this._el, ile = E.pola.length;
      E.pola.forEach((P, i) => {
        const r = this._ruchy[Math.min(i, this._ruchy.length - 1)];
        if (!r || r.widac === null) return;
        const wys = P.p.clientHeight;
        if (!wys) return;
        const gora = this._gornaListwy(wys, r.widac);
        P.oslona.style.height = Math.max(0, gora - (this._kas - 2) + 1) + "px";
        P.oslona.style.top = this._kas - 2 + "px";
        P.listwa.style.transform = `translateY(${gora}px)`;
        if (!this._ciagnie) this._pokazCel(i, r.jedzie && r.komenda ? Math.round(r.cel) : null);
        P._dol = P.p.offsetTop + (P.p.parentElement?.offsetTop || 0) + gora + LISTWA / 2;
      });
      if (E.oba && ile > 1) {
        const y = E.pola.reduce((a, P) => a + (P._dol || 0), 0) / ile;
        E.oba.style.transform = `translateY(${y + 6 + 8}px)`;
      }
      const teraz = Math.round(this._srednia()), cel = Math.round(this._srednia(true)), jedzie = this._ruchy.some((r) => r.jedzie);
      if (this._opisStanu) {
        const cz = [...this._opisStanu];
        if (jedzie) cz.splice(1, 0, `${teraz} % → ${cel} %`);
        E.stan.textContent = cz.join(" · ");
      }
      E.poz.forEach((b) => b.classList.toggle("on", !jedzie && +b.dataset.p === teraz));
      if (E.otw) E.otw.disabled = teraz >= 100 && !jedzie;
      if (E.zam) E.zam.disabled = teraz <= 0 && !jedzie;
      this._rysujSuwak();
    }
    _animuj() {
      this._rysuj();
      if (this._raf || !this.isConnected) return;
      let ost = performance.now();
      const klatka = (t) => {
        const dt = Math.min(0.1, (t - ost) / 1e3);
        ost = t;
        let ruch = false;
        this._ruchy.forEach((r) => {
          ruch = r.krok(dt, t) || ruch;
        });
        this._rysuj();
        this._raf = ruch ? requestAnimationFrame(klatka) : null;
      };
      this._raf = requestAnimationFrame(klatka);
    }
  };

  // src/edytor.js
  var KROKI = [
    ["urzadzenie", "mdi:window-shutter-cog"],
    ["oslona", "mdi:roller-shade"],
    ["kolory", "mdi:palette"],
    ["okno", "mdi:window-closed-variant"],
    ["czujniki", "mdi:window-open-variant"],
    ["silnik", "mdi:speedometer"],
    ["pogoda", "mdi:weather-partly-cloudy"]
  ];
  var esc2 = (s) => String(s ?? "").replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[z]);
  var doHex2 = (v) => Array.isArray(v) && v.length === 3 ? "#" + v.map((x) => (+x).toString(16).padStart(2, "0")).join("") : null;
  var zHex = (h) => {
    const s = String(h).replace("#", "");
    return s.length === 6 ? [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16)) : void 0;
  };
  var STYL = `
:host{display:block}
.ed{display:flex;flex-direction:column;gap:var(--ha-space-4,16px)}
/* pasek kroków: kółka 40 px, podpisy pod spodem */
.pasek{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));position:relative;padding-top:2px}
.pasek::before{content:"";position:absolute;left:7%;right:7%;top:22px;height:2px;background:var(--divider-color)}
.kr{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;border:0;background:none;padding:0;cursor:pointer;font:inherit;
 color:var(--secondary-text-color);-webkit-tap-highlight-color:transparent}
.kr .k{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;box-sizing:border-box;
 background:var(--card-background-color,var(--ha-card-background));box-shadow:inset 0 0 0 1px var(--divider-color);color:var(--secondary-text-color);transition:background .15s}
.kr .k ha-icon{--mdc-icon-size:22px;display:flex}
.kr.zrob .k{background:color-mix(in srgb,var(--primary-color) 20%,var(--card-background-color,#fff));box-shadow:none;color:var(--primary-color)}
.kr.on .k{background:var(--primary-color);box-shadow:none;color:var(--text-primary-color,#fff)}
.kr .p{font-size:var(--ha-font-size-s,12px);line-height:1.25;text-align:center;max-width:100%;overflow-wrap:anywhere}
.kr.on .p{color:var(--primary-color);font-weight:var(--ha-font-weight-medium,500)}
.kr:focus-visible .k{outline:2px solid var(--primary-color);outline-offset:2px}
/* tytuł kroku */
.tyt{display:flex;align-items:center;gap:12px}
.tyt .k{flex:none;display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;box-sizing:border-box;
 border:2px solid var(--accent-color);color:var(--primary-color)}
.tyt .k ha-icon{--mdc-icon-size:24px;display:flex}
.tyt h3{margin:0;font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color);line-height:1.3}
.tyt small{display:block;font-size:var(--ha-font-size-s,12px);color:var(--secondary-text-color);font-weight:var(--ha-font-weight-normal,400)}
.cp{margin:0;display:flex;flex-direction:column;gap:4px;font-size:var(--ha-font-size-m,14px);line-height:1.45;
 color:color-mix(in srgb,var(--primary-text-color) 80%,var(--secondary-text-color))}
.cp b{color:var(--accent-color);font-weight:var(--ha-font-weight-medium,500)}
/* ramka informacji jak ha-alert info */
.info{display:flex;gap:12px;align-items:flex-start;padding:8px 12px;border-radius:var(--ha-border-radius-sm,4px);font-size:var(--ha-font-size-m,14px);line-height:1.4;
 background:color-mix(in srgb,var(--info-color,#039be5) 12%,transparent);color:var(--primary-text-color)}
.info ha-icon{flex:none;color:var(--info-color,#039be5);--mdc-icon-size:22px;display:flex}
/* rodzaje osłon: kafelki jak w HA */
.gr{display:flex;align-items:center;gap:8px;margin:8px 0 4px;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color)}
.gr ha-icon{--mdc-icon-size:20px;color:var(--primary-color);display:flex}
.pg{margin:8px 0 6px;font-size:var(--ha-font-size-s,12px);color:var(--secondary-text-color);text-transform:uppercase;letter-spacing:.6px}
.kafle{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.kaf{display:flex;align-items:center;gap:10px;min-height:48px;padding:6px 10px;box-sizing:border-box;text-align:left;cursor:pointer;font:inherit;
 font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);line-height:1.25;color:var(--primary-text-color);
 background:var(--card-background-color,var(--ha-card-background));border:1px solid var(--divider-color);border-radius:var(--ha-card-border-radius,12px)}
.kaf:hover{background:color-mix(in srgb,var(--primary-text-color) 4%,var(--card-background-color,#fff))}
.kaf .i{flex:none;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;
 background:color-mix(in srgb,var(--primary-color) 20%,transparent);color:var(--primary-color)}
.kaf .i ha-icon{--mdc-icon-size:20px;display:flex}
.kaf[aria-pressed="true"]{border:2px solid var(--primary-color);padding:5px 9px;background:color-mix(in srgb,var(--primary-color) 10%,var(--card-background-color,#fff))}
/* próbki kolorów */
.probki{display:grid;grid-template-columns:repeat(auto-fill,minmax(40px,1fr));gap:8px;justify-items:center}
.pr{width:36px;height:36px;border-radius:50%;border:0;padding:0;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.pr[aria-pressed="true"]{box-shadow:0 0 0 2px var(--card-background-color,#fff),0 0 0 4px var(--accent-color)}
.wyb{margin:6px 0 0;font-size:var(--ha-font-size-m,14px);color:var(--secondary-text-color)}
.wyb b{color:var(--primary-text-color);font-weight:var(--ha-font-weight-medium,500)}
h4{margin:8px 0 0;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color)}
/* przyciski jak ha-button */
.nav{display:flex;justify-content:space-between;gap:8px}
.bt{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:40px;padding:0 16px;border-radius:var(--ha-border-radius-pill,9999px);border:0;cursor:pointer;
 font:inherit;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);-webkit-tap-highlight-color:transparent;
 background:var(--ha-color-fill-primary-loud-resting,var(--primary-color));color:var(--ha-color-on-primary-loud,var(--text-primary-color,#fff))}
.bt:hover{filter:brightness(1.08)}
.bt.dr{background:transparent;color:var(--primary-color)}
.bt.dr:hover{background:color-mix(in srgb,var(--primary-color) 8%,transparent);filter:none}
.bt[hidden]{visibility:hidden}
.bt ha-icon{--mdc-icon-size:18px;display:flex}
`;
  var MotorHaEdytor = class extends HTMLElement {
    setConfig(c) {
      this._cfg = { ...c };
      this._rysuj();
    }
    set hass(h) {
      const pierwszy = !this._hass;
      this._hass = h;
      if (pierwszy) this._rysuj();
      else this._forma?.forEach((f) => {
        f.hass = h;
      });
    }
    get _T() {
      return TEKSTY[this._jez];
    }
    _urz() {
      return this._hass?.states?.[this._cfg?.entity]?.attributes?.motor_ha;
    }
    _w(k) {
      return this._cfg[k] ?? DOMYSLNE[k];
    }
    // zmiana: karta na panelu dostaje tylko encję, a ustawienia okna z integracji zapisują się w urządzeniu
    _zmien(zmiany, przerysuj = true) {
      const c = { ...this._cfg };
      for (const [k, v] of Object.entries(zmiany)) {
        if (v === void 0 || v === "" || v === null || v === DOMYSLNE[k] && !this._urz()) delete c[k];
        else c[k] = v;
      }
      this._cfg = c;
      const urz = this._urz();
      const doPanelu = urz ? Object.fromEntries(Object.entries(c).filter(([k]) => KLUCZE_PANELU.includes(k))) : c;
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: doPanelu }, bubbles: true, composed: true }));
      if (urz) {
        clearTimeout(this._zapis);
        this._zapis = setTimeout(() => this._hass.callWS({ type: "motor_ha/zapisz", entity_id: c.entity, karta: c }).catch((e) => console.warn("Motor HA: nie zapisałem ustawień w urządzeniu", e)), 500);
      }
      if (przerysuj) this._rysuj();
    }
    _rysuj() {
      if (!this._hass || !this._cfg) return;
      const urz = this._urz();
      if (urz && this._wczytane !== this._cfg.entity) {
        this._wczytane = this._cfg.entity;
        this._cfg = { ...urz, ...this._cfg };
        delete this._cfg.type;
        this._cfg.type = "custom:motor-ha";
      }
      this._jez = jezyk(this._cfg, this._hass);
      const T2 = this._T, n = this._krok ?? 0, [kl, ik] = KROKI[n], K = T2.kroki[kl];
      const root = this.shadowRoot || this.attachShadow({ mode: "open" });
      root.innerHTML = `<style>${STYL}</style><div class="ed">
<div class="pasek" role="tablist">${KROKI.map(([k, i], j) => `<button class="kr${j === n ? " on" : j < n ? " zrob" : ""}" data-k="${j}" role="tab" aria-selected="${j === n}" title="${esc2(T2.kroki[k].t)}">
 <span class="k"><ha-icon icon="${i}"></ha-icon></span><span class="p">${esc2(T2.kroki[k].t)}</span></button>`).join("")}</div>
<div class="tyt"><span class="k"><ha-icon icon="${ik}"></ha-icon></span><h3>${esc2(K.t)}<small>${esc2(wstaw(T2.ui.krok, n + 1, KROKI.length))}</small></h3></div>
<p class="cp"><span><b>${esc2(T2.ui.co)}</b> ${esc2(K.co)}</span><span><b>${esc2(T2.ui.poco)}</b> ${esc2(K.poco)}</span></p>
<div class="tresc"></div>
<div class="nav"><button class="bt dr" data-n="-1" ${n ? "" : "hidden"}><ha-icon icon="mdi:chevron-left"></ha-icon>${esc2(T2.ui.wstecz)}</button>
 <button class="bt" data-n="1" ${n < KROKI.length - 1 ? "" : "hidden"}>${esc2(T2.ui.dalej)}<ha-icon icon="mdi:chevron-right"></ha-icon></button></div></div>`;
      root.querySelectorAll("[data-k]").forEach((b) => b.addEventListener("click", () => {
        this._krok = +b.dataset.k;
        this._rysuj();
      }));
      root.querySelectorAll("[data-n]").forEach((b) => b.addEventListener("click", () => {
        this._krok = Math.max(0, Math.min(KROKI.length - 1, n + +b.dataset.n));
        this._rysuj();
      }));
      this._forma = [];
      this["_" + kl](root.querySelector(".tresc"));
    }
    // pole formularza Home Assistanta
    _formularz(box, schemat, dane) {
      const f = document.createElement("ha-form");
      f.hass = this._hass;
      f.schema = schemat;
      f.data = dane;
      f.computeLabel = (s) => this._T.pola[s.name] ?? s.name;
      f.computeHelper = (s) => this._T.pomoc[s.name];
      f.addEventListener("value-changed", (e) => {
        const v = e.detail.value, zm = {};
        for (const s of schemat.flatMap((x) => x.schema || [x])) if (s.name) zm[s.name] = v[s.name];
        this._zmianaFormularza(zm);
      });
      box.appendChild(f);
      this._forma.push(f);
      return f;
    }
    _zmianaFormularza(zm) {
      if ("kolor_wlasny" in zm) {
        const h = doHex2(zm.kolor_wlasny);
        delete zm.kolor_wlasny;
        if (h) zm.kolor = h;
      }
      if ("rama_wlasna" in zm) {
        const h = doHex2(zm.rama_wlasna);
        delete zm.rama_wlasna;
        if (h) zm.rama = h;
      }
      if ("skrzydla" in zm) zm.skrzydla = +zm.skrzydla;
      if ("czas" in zm) zm.czas = +zm.czas > 0 ? +zm.czas : "auto";
      if ("pogoda" in zm && !zm.pogoda) zm.pogoda = "auto";
      const struktura = ["entity", "skrzydla", "auto_czujniki", "jezyk", "kolor", "rama"].some((k) => k in zm && zm[k] !== this._cfg[k]);
      this._zmien(zm, struktura);
    }
    _info(box, txt, ikona = "mdi:information-outline") {
      box.insertAdjacentHTML("beforeend", `<div class="info"><ha-icon icon="${ikona}"></ha-icon><span>${esc2(txt)}</span></div>`);
    }
    // ── kroki ──
    _urzadzenie(box) {
      this._formularz(
        box,
        [{ name: "entity", required: true, selector: { entity: { domain: "cover" } } }, { name: "name", selector: { text: {} } }],
        { entity: this._cfg.entity, name: this._cfg.name }
      );
      this._info(box, this._urz() ? this._T.ui.wUrzadzeniu : this._T.ui.bezUrzadzenia, this._urz() ? "mdi:check-circle-outline" : "mdi:information-outline");
    }
    _oslona(box) {
      const T2 = this._T, wyb = this._w("oslona");
      for (const [g, pod] of Object.entries(GRUPY)) {
        box.insertAdjacentHTML("beforeend", `<div class="gr"><ha-icon icon="${IKONY_GRUP[g]}"></ha-icon>${esc2(T2.grupy[g])}</div>`);
        for (const [p, typy] of Object.entries(pod)) {
          box.insertAdjacentHTML("beforeend", `<div class="pg">${esc2(T2.grupy[p])}</div><div class="kafle">${typy.map((t) => `<button class="kaf" data-t="${t}" aria-pressed="${t === wyb}"><span class="i"><ha-icon icon="${IKONY[t]}"></ha-icon></span>${esc2(T2.oslony[t])}</button>`).join("")}</div>`);
        }
      }
      box.querySelectorAll("[data-t]").forEach((b) => b.addEventListener("click", () => this._zmien({ oslona: b.dataset.t })));
    }
    _kolory(box) {
      const T2 = this._T, k = this._w("kolor"), r = ramaHex(this._w("rama"));
      const nazwaK = KOLORY[k] ? T2.kolory[k] : hex(k), nazwaR = RAMY[r] ? T2.ramy[RAMY[r][0]] : r;
      box.insertAdjacentHTML("beforeend", `<h4>${esc2(T2.pola.kolor)}</h4><div class="probki">${Object.entries(KOLORY).map(([kk, h]) => `<button class="pr" data-kolor="${kk}" style="background:${h}" title="${esc2(T2.kolory[kk])}" aria-label="${esc2(T2.kolory[kk])}" aria-pressed="${kk === k}"></button>`).join("")}</div>
      <p class="wyb">${esc2(T2.ui.wybrany)} <b>${esc2(nazwaK)}</b></p>`);
      this._formularz(box, [{ name: "kolor_wlasny", selector: { color_rgb: {} } }], { kolor_wlasny: KOLORY[k] ? void 0 : zHex(hex(k)) });
      box.insertAdjacentHTML("beforeend", `<h4>${esc2(T2.pola.rama)}</h4><div class="probki">${Object.entries(RAMY).map(([h, [kk]]) => `<button class="pr" data-rama="${h}" style="background:${h}" title="${esc2(T2.ramy[kk])}" aria-label="${esc2(T2.ramy[kk])}" aria-pressed="${h === r}"></button>`).join("")}</div>
      <p class="wyb">${esc2(T2.ui.wybrany)} <b>${esc2(nazwaR)}</b></p>`);
      this._formularz(box, [{ name: "rama_wlasna", selector: { color_rgb: {} } }], { rama_wlasna: RAMY[r] ? void 0 : zHex(r) });
      box.querySelectorAll("[data-kolor]").forEach((b) => b.addEventListener("click", () => this._zmien({ kolor: b.dataset.kolor })));
      box.querySelectorAll("[data-rama]").forEach((b) => b.addEventListener("click", () => this._zmien({ rama: b.dataset.rama })));
    }
    _okno(box) {
      const T2 = this._T, dwa = +this._w("skrzydla") !== 1;
      const opcje = (o) => ({ select: { mode: "dropdown", options: o.map(([value, label]) => ({ value, label })) } });
      this._formularz(box, [
        { name: "skrzydla", selector: opcje([["1", T2.ui.jedno], ["2", T2.ui.dwa]]) },
        { name: "wysokosc", selector: { number: { min: 140, max: 460, step: 10, mode: "slider", unit_of_measurement: "px" } } },
        ...dwa ? [{ type: "grid", name: "", schema: [{ name: "roleta_lewa", selector: { entity: { domain: "cover" } } }, { name: "roleta_prawa", selector: { entity: { domain: "cover" } } }] }] : [{ name: "roleta_lewa", selector: { entity: { domain: "cover" } } }],
        { name: "odwroc", selector: { boolean: {} } },
        ...dwa ? [{ name: "osobno", selector: { boolean: {} } }] : []
      ], { skrzydla: String(dwa ? 2 : 1), wysokosc: +this._w("wysokosc"), roleta_lewa: this._cfg.roleta_lewa, roleta_prawa: this._cfg.roleta_prawa, odwroc: !!this._w("odwroc"), osobno: !!this._w("osobno") });
      box.insertAdjacentHTML("beforeend", `<h4>${esc2(T2.ui.sterowanie)}</h4>`);
      this._formularz(box, [
        { name: "przyciski", selector: { boolean: {} } },
        { name: "suwak", selector: { boolean: {} } },
        { name: "pozycje", selector: { text: {} } },
        { name: "wibracja", selector: { boolean: {} } }
      ], { przyciski: this._w("przyciski") !== false, suwak: this._w("suwak") !== false, pozycje: this._cfg.pozycje || "", wibracja: this._w("wibracja") !== false });
    }
    _czujniki(box) {
      const T2 = this._T, h = this._hass, dwa = +this._w("skrzydla") !== 1, auto = this._w("auto_czujniki") !== false ? czujnikiOkna(h, this._cfg.roleta_lewa || this._cfg.entity) : [];
      const tryb = { select: { mode: "dropdown", options: [{ value: "uchyl", label: T2.ui.uchyl }, { value: "otworz", label: T2.ui.otworz }] } };
      const czujnik = { entity: { domain: "binary_sensor", device_class: ["window", "door", "opening"] } };
      this._formularz(box, [
        { name: "auto_czujniki", selector: { boolean: {} } },
        { type: "grid", name: "", schema: [{ name: "czujnik_lewe", selector: czujnik }, { name: "tryb_lewe", selector: tryb }] },
        ...dwa ? [{ type: "grid", name: "", schema: [{ name: "czujnik_prawe", selector: czujnik }, { name: "tryb_prawe", selector: tryb }] }] : []
      ], { auto_czujniki: this._w("auto_czujniki") !== false, czujnik_lewe: this._cfg.czujnik_lewe, czujnik_prawe: this._cfg.czujnik_prawe, tryb_lewe: this._w("tryb_lewe"), tryb_prawe: this._w("tryb_prawe") });
      const znalezione = auto.filter(Boolean).map((e) => h.states[e]?.attributes?.friendly_name || e);
      this._info(box, znalezione.length ? wstaw(T2.ui.znalezione, znalezione.join(", ")) : T2.ui.brakCzujnikow);
    }
    _silnik(box) {
      const T2 = this._T, h = this._hass, e = this._cfg.roleta_lewa || (h.states[this._cfg.entity]?.attributes?.entity_id || [])[0] || this._cfg.entity;
      const liczba = { entity: { domain: "number" } };
      this._formularz(box, [
        { type: "grid", name: "", schema: [{ name: "predkosc_lewa", selector: liczba }, ...+this._w("skrzydla") !== 1 ? [{ name: "predkosc_prawa", selector: liczba }] : []] },
        { name: "czas", selector: { number: { min: 0, max: 120, step: 1, mode: "slider", unit_of_measurement: "s" } } }
      ], { predkosc_lewa: this._cfg.predkosc_lewa, predkosc_prawa: this._cfg.predkosc_prawa, czas: +this._cfg.czas > 0 ? +this._cfg.czas : 0 });
      const rpm = obroty(h, e, this._cfg.predkosc_lewa), s = czasPrzejazdu(this._cfg.czas, rpm, e).toFixed(1);
      this._info(box, +this._cfg.czas > 0 ? wstaw(T2.ui.czasReczny, s) : rpm > 0 ? wstaw(T2.ui.czasZPredkosci, s, rpm) : nauczony(e) ? wstaw(T2.ui.czasNauczony, s) : wstaw(T2.ui.czasDomyslny, s));
    }
    _pogoda(box) {
      const T2 = this._T, h = this._hass;
      this._formularz(box, [
        { name: "niebo", selector: { boolean: {} } },
        { name: "pogoda", selector: { entity: { domain: "weather" } } },
        { name: "widok", selector: { boolean: {} } },
        { name: "jezyk", selector: { select: { mode: "dropdown", options: [{ value: "auto", label: T2.ui.jezykAuto }, ...Object.entries(NAZWY_JEZYKOW).map(([value, label]) => ({ value, label }))] } } }
      ], { niebo: this._w("niebo") !== false, pogoda: this._cfg.pogoda && this._cfg.pogoda !== "auto" ? this._cfg.pogoda : void 0, widok: this._w("widok") !== false, jezyk: this._w("jezyk") });
      const w = encjaPogody(h, this._cfg.pogoda);
      this._info(box, w ? wstaw(T2.ui.pogodaZ, h.states[w]?.attributes?.friendly_name || w) : T2.ui.pogodaInternet);
    }
  };

  // src/index.js
  var rejestruj = (nazwa2, klasa) => {
    if (!customElements.get(nazwa2)) customElements.define(nazwa2, klasa);
  };
  rejestruj("motor-ha", MotorHaKarta);
  rejestruj("okno-ha", class extends MotorHaKarta {
  });
  rejestruj("motor-ha-editor", MotorHaEdytor);
  rejestruj("okno-ha-editor", class extends MotorHaEdytor {
  });
  rejestruj("roleta-realistyczna", class extends MotorHaKarta {
  });
  rejestruj("roleta-realistyczna-editor", class extends MotorHaEdytor {
  });
  var T = TEKSTY[kodJezyka(document.documentElement.lang || navigator.language)];
  window.customCards = window.customCards || [];
  for (let i = window.customCards.length - 1; i >= 0; i--) if (["motor-ha", "okno-ha", "roleta-realistyczna"].includes(window.customCards[i]?.type)) window.customCards.splice(i, 1);
  window.customCards.push({
    type: "motor-ha",
    name: T.nazwa,
    description: T.opis,
    preview: true,
    documentationURL: "https://github.com/superdarco78/okno-ha-integracja",
    // „Dodaj do panelu” na stronie urządzenia proponuje kartę Motor HA dla okien i osłon
    getEntitySuggestion: (hass, entityId) => String(entityId).startsWith("cover.") ? { label: T.nazwa, config: { type: "custom:motor-ha", entity: entityId } } : null
  });
  window.__motorHa = { wersja: WERSJA, grupy: GRUPY, ikony: IKONY, kolory: KOLORY, kroki: KROKI, teksty: TEKSTY };
  console.info(`%c Motor HA %c ${WERSJA} `, "background:#009ac7;color:#fff;border-radius:3px 0 0 3px;padding:1px 4px", "background:#ff9800;color:#fff;border-radius:0 3px 3px 0;padding:1px 4px");
})();
