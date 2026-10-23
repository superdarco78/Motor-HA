/* Motor HA – karta okna z osłoną · © superdarco78 · CC BY-NC-SA 4.0 · github.com/superdarco78/Motor-HA
   Źródło: karta/src (npm run build) */
(() => {
  // src/stale.js
  var WERSJA = "2.1.5";
  var GRUPY = {
    wew: {
      rolety: ["pelna", "kasetowa", "zebra", "zaciemniajaca"],
      plisy: ["plisa", "plaster", "rzymska"],
      zaluzje: ["zaluzja", "drewniana"],
      pionowe: ["pionowa", "zaslona"]
    },
    zew: {
      zrolety: ["natynkowa", "podtynkowa", "zewnetrzna", "perforowana"],
      fasadowe: ["fasadowa", "fasadowaz"],
      taras: ["markiza", "screen"]
    },
    brama: {
      bramy: ["przesuwna", "skrzydlowa"],
      garaze: ["segmentowa", "uchylna", "roletowa"]
    }
  };
  var OSLONY = Object.values(GRUPY).flatMap((g) => Object.values(g).flat());
  var BRAMY = Object.values(GRUPY.brama).flat();
  var czyBrama = (t) => BRAMY.includes(t);
  var POZIOME = ["pionowa", "zaslona"];
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
    screen: "mdi:roller-shade",
    pionowa: "mdi:blinds-vertical",
    zaslona: "mdi:curtains",
    przesuwna: "mdi:gate",
    skrzydlowa: "mdi:gate",
    segmentowa: "mdi:garage",
    uchylna: "mdi:garage",
    roletowa: "mdi:garage"
  };
  var IKONY_OTW = {
    przesuwna: "mdi:gate-open",
    skrzydlowa: "mdi:gate-open",
    segmentowa: "mdi:garage-open",
    uchylna: "mdi:garage-open",
    roletowa: "mdi:garage-open",
    pionowa: "mdi:blinds-vertical",
    zaslona: "mdi:curtains"
  };
  var IKONY_GRUP = {
    wew: "mdi:sofa-outline",
    zew: "mdi:home-outline",
    rolety: "mdi:roller-shade",
    plisy: "mdi:blinds",
    zaluzje: "mdi:blinds-horizontal",
    pionowe: "mdi:blinds-vertical",
    brama: "mdi:gate",
    bramy: "mdi:gate",
    garaze: "mdi:garage",
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

  // src/brama.js
  var W = 320;
  var H = 200;
  var ZIEMIA = 172;
  function tlo(noc) {
    const niebo = noc ? ["#1b2540", "#2c3a5c"] : ["#8fc3ea", "#d7ecf8"];
    return `<defs><linearGradient id="mhN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${niebo[0]}"/><stop offset="1" stop-color="${niebo[1]}"/></linearGradient>
  <clipPath id="mhOtw"><rect x="74" y="78" width="172" height="${ZIEMIA - 78}"/></clipPath>
  <clipPath id="mhPrz"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath></defs>
  <rect class="niebo-b" width="${W}" height="${ZIEMIA}" fill="url(#mhN)"/>
  <rect y="${ZIEMIA}" width="${W}" height="${H - ZIEMIA}" fill="${noc ? "#2d3a2a" : "#6fa04f"}"/>
  <path d="M110 ${ZIEMIA}h100l40 ${H - ZIEMIA}H70z" fill="${noc ? "#4a4a4a" : "#9a9a94"}"/>`;
  }
  function przesło(x, y, w, h, k) {
    const prety = Array.from({ length: Math.floor(w / 11) }, (_, i) => `<rect x="${x + 6 + i * 11}" y="${y + 4}" width="3" height="${h - 8}" fill="${k}"/>`).join("");
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="none" stroke="${k}" stroke-width="5"/>
  <rect x="${x}" y="${y + h / 2 - 2}" width="${w}" height="4" fill="${jasniej(k, -0.15)}"/>${prety}`;
  }
  function slupek(x, k) {
    return `<rect x="${x - 7}" y="${ZIEMIA - 98}" width="14" height="98" fill="${jasniej(k, 0.12)}"/><rect x="${x - 9}" y="${ZIEMIA - 102}" width="18" height="6" fill="${jasniej(k, -0.1)}"/>`;
  }
  function fotokomorka() {
    return `<g class="foto"><rect x="62" y="${ZIEMIA - 22}" width="6" height="16" rx="1" fill="#333"/><rect x="252" y="${ZIEMIA - 22}" width="6" height="16" rx="1" fill="#333"/>
  <line class="wiazka" x1="68" y1="${ZIEMIA - 16}" x2="252" y2="${ZIEMIA - 16}" stroke-width="2" stroke-dasharray="5 4"/></g>`;
  }
  function garaz(k, rama, noc) {
    return `<rect x="34" y="40" width="252" height="${ZIEMIA - 40}" fill="${noc ? "#6c675f" : "#e3ddd1"}"/>
  <path d="M24 44L160 8L296 44z" fill="${noc ? "#4c2f28" : "#9c4b37"}"/>
  <rect x="70" y="74" width="180" height="${ZIEMIA - 74}" fill="${rama}"/>
  <rect x="74" y="78" width="172" height="${ZIEMIA - 78}" fill="${noc ? "#3b3128" : "#2b2723"}"/>
  ${noc ? '<rect x="74" y="78" width="172" height="40" fill="rgba(255,200,120,.25)"/>' : ""}`;
  }
  function drzwiGarazu(typ, k) {
    const h = ZIEMIA - 78, x = 74, w = 172;
    let wzor = "";
    if (typ === "segmentowa") wzor = [1, 2, 3].map((i) => `<rect x="${x}" y="${78 + i * h / 4 - 1}" width="${w}" height="2" fill="${jasniej(k, -0.3)}"/>`).join("") + Array.from({ length: 16 }, (_, i) => `<rect x="${x}" y="${78 + i * h / 16}" width="${w}" height="1" fill="${jasniej(k, 0.12)}" opacity=".5"/>`).join("");
    else if (typ === "roletowa") wzor = Array.from({ length: 24 }, (_, i) => `<rect x="${x}" y="${78 + i * h / 24}" width="${w}" height="1.2" fill="${jasniej(k, -0.32)}"/>`).join("");
    else wzor = Array.from({ length: 14 }, (_, i) => `<rect x="${x + 6 + i * 12}" y="80" width="2" height="${h - 4}" fill="${jasniej(k, -0.18)}"/>`).join("");
    return `<g class="drzwi"><rect x="${x}" y="78" width="${w}" height="${h}" fill="${k}"/>${wzor}
  <rect x="${x}" y="${ZIEMIA - 5}" width="${w}" height="5" fill="${jasniej(k, -0.4)}"/>
  ${typ !== "roletowa" ? `<rect x="${x + w / 2 - 12}" y="${ZIEMIA - 34}" width="24" height="5" rx="2" fill="${jasniej(k, -0.45)}"/>` : ""}</g>`;
  }
  function rysunekBramy(typ, k, rama, noc, foto) {
    let t = tlo(noc);
    if (typ === "przesuwna") {
      t += `${slupek(258, rama)}<g clip-path="url(#mhPrz)"><g class="przesuwna">${przesło(64, ZIEMIA - 86, 190, 80, k)}<circle cx="90" cy="${ZIEMIA - 3}" r="4" fill="#222"/><circle cx="230" cy="${ZIEMIA - 3}" r="4" fill="#222"/></g></g>
    <rect x="0" y="${ZIEMIA - 92}" width="56" height="92" fill="${noc ? "#5a5650" : "#cfc8bb"}"/><rect x="0" y="${ZIEMIA - 96}" width="58" height="5" fill="${noc ? "#47443f" : "#b3ab9c"}"/>${slupek(62, rama)}`;
    } else if (typ === "skrzydlowa") {
      t += `${slupek(62, rama)}${slupek(258, rama)}<g class="lewe">${przesło(68, ZIEMIA - 88, 92, 82, k)}</g><g class="prawe">${przesło(160, ZIEMIA - 88, 92, 82, k)}</g>`;
    } else {
      t += garaz(k, rama, noc) + `<g clip-path="url(#mhOtw)">${drzwiGarazu(typ, k)}</g>`;
    }
    if (foto) t += fotokomorka();
    return `<svg class="brama" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${t}</svg>`;
  }
  function ustawBrame(svg2, typ, p) {
    if (!svg2) return;
    const f = Math.max(0, Math.min(100, p)) / 100;
    const g = (s) => svg2.querySelector(s);
    if (typ === "przesuwna") g(".przesuwna")?.setAttribute("transform", `translate(${-f * 186} 0)`);
    else if (typ === "skrzydlowa") {
      const s = Math.cos(f * Math.PI * 0.45);
      g(".lewe")?.setAttribute("transform", `translate(68 0) scale(${s} 1) translate(-68 0)`);
      g(".prawe")?.setAttribute("transform", `translate(252 0) scale(${s} 1) translate(-252 0)`);
    } else if (typ === "uchylna") {
      g(".drzwi")?.setAttribute("transform", `translate(0 ${-f * 6}) translate(0 78) scale(1 ${1 - f * 0.88}) translate(0 -78)`);
    } else g(".drzwi")?.setAttribute("transform", `translate(0 ${-f * (ZIEMIA - 78)})`);
  }
  function ustawFotokomorke(svg2, przeszkoda) {
    const w = svg2?.querySelector(".wiazka");
    if (!w) return;
    w.setAttribute("stroke", przeszkoda ? "#e53935" : "#43a047");
    w.setAttribute("stroke-dasharray", przeszkoda ? "0" : "5 4");
  }

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
      case "pionowa":
        return {
          okres: 24,
          nakladka: `repeating-linear-gradient(90deg,${jasniej(k, 0.2)} 0 2px,${k} 2px 15px,${jasniej(k, -0.28)} 15px 17px,rgba(0,0,0,.35) 17px 18px)`,
          obraz: svg(24, pion("a", [[0, k], [1, jasniej(k, -0.05)]]) + pas("a", 0, 24))
        };
      case "zaslona":
        return {
          okres: 24,
          nakladka: `repeating-linear-gradient(90deg,${jasniej(k, -0.22)} 0,${jasniej(k, 0.14)} 11px,${jasniej(k, -0.1)} 22px,${jasniej(k, -0.22)} 26px),${splot}`,
          obraz: svg(24, pion("a", [[0, k], [1, jasniej(k, -0.08)]]) + pas("a", 0, 24))
        };
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
.pokoj{background:linear-gradient(180deg,rgba(185,215,240,.45),rgba(185,215,240,0) 40%),linear-gradient(180deg,transparent 74%,rgba(0,0,0,.28) 74%),
 radial-gradient(ellipse 60% 50% at 50% 30%,rgba(255,240,215,.35),transparent 70%),linear-gradient(180deg,#9c8e7c,#7d705f)}
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
/* pionowy suwak obok okna (osłony góra-dół, garaże): wypełnienie od dołu, uchwyt u góry wypełnienia */
.scena.zs{gap:12px;align-items:stretch}
.suwak.pion{flex:none;width:var(--feature-height,42px);height:auto;align-self:stretch}
.suwak.pion .wyp{right:0;top:auto;bottom:0;transition:height .1s}
.suwak.pion .wyp::after{right:auto;left:50%;top:6px;width:50%;height:4px;transform:translateX(-50%)}
.suwak .wart{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;
 font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color);mix-blend-mode:normal}
/* „⚙ Zmień ustawienia” jak przycisk tekstowy HA */
.zmien{align-self:flex-start;background:none;border:none;font:inherit;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);
 color:var(--primary-color);cursor:pointer;padding:0 var(--ha-space-2,8px);margin:0 calc(-1 * var(--ha-space-2,8px));line-height:36px;border-radius:var(--ha-border-radius-md,8px)}
.zmien:hover{background:color-mix(in srgb,var(--primary-color) 10%,transparent)}
/* gotowe pozycje jak chipy filtrów HA */
.poz{display:flex;flex-wrap:wrap;gap:8px}
.poz button{flex:1 1 auto;height:32px;padding:0 12px;border-radius:var(--ha-border-radius-md,8px);border:1px solid var(--outline-color,var(--divider-color));background:transparent;
 color:var(--primary-text-color);font:inherit;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);cursor:pointer;-webkit-tap-highlight-color:transparent}
.poz button:hover{background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}
.poz button.on{background:color-mix(in srgb,var(--primary-text-color) 15%,transparent);border-color:transparent}
.poziomo .listwa,.poziomo .prow{display:none}
.poziomo .oslona{will-change:clip-path,mask-image}
.poziomo .skrz,.poziomo .zewo{cursor:pointer}
/* brama i garaż */
.bramaw{position:relative;width:min(100%,420px);border-radius:var(--ha-border-radius-md,8px);overflow:hidden;cursor:pointer;-webkit-tap-highlight-color:transparent}
.bramaw svg{display:block;width:100%;height:auto}
/* automatyka: powód ruchu i pauza – jak wiersz informacji HA */
.auto{display:flex;align-items:center;gap:8px;min-height:32px;padding:0 4px 0 8px;border-radius:var(--ha-border-radius-md,8px);
 background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-text-color);font-size:var(--ha-font-size-s,12px);line-height:16px}
.auto[hidden]{display:none}
.auto ha-icon{--mdc-icon-size:18px;display:flex;color:var(--primary-color);flex:none}
.auto span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.auto.blad{background:color-mix(in srgb,var(--error-color,#db4437) 14%,transparent)}
.auto.blad ha-icon{color:var(--error-color,#db4437)}
.auto button{flex:none;height:28px;padding:0 12px;border:none;border-radius:var(--ha-border-radius-pill,9999px);cursor:pointer;font:inherit;
 font-size:var(--ha-font-size-s,12px);font-weight:var(--ha-font-weight-medium,500);background:var(--primary-color);color:var(--text-primary-color,#fff)}
.auto button[hidden]{display:none}
/* kompas słońca w nagłówku */
.kompas{flex:none;width:36px;height:36px}
.kompas[hidden]{display:none}
.brak{padding:16px;color:var(--secondary-text-color);font-size:var(--ha-font-size-m,14px)}
`;
  function stylOkna({ rama, drewno, kolor, typ, zew }) {
    const t = tekstura(typ, kolor), S = (k) => jasniej(kolor, k), R = (k) => jasniej(rama, k);
    const tlo2 = (drewno ? SLOJE + "," : "") + rama;
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
.okno{background:${tlo2};box-shadow:inset 0 0 0 1px rgba(0,0,0,.18),0 3px 10px rgba(0,0,0,.4)}
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
    return Object.keys(s).filter((k) => k.startsWith("cover.") && !["door", "damper"].includes(s[k].attributes?.device_class)).sort((a, b) => pkt(b) - pkt(a) || a.localeCompare(b));
  }

  // tlumaczenia/pl.json
  var pl_default = {
    nazwa: "Motor HA",
    opis: "Wszystko, co ma silnik: rolety, żaluzje, markizy, zasłony, bramy i garaże. Ruch w tempie silnika, pogoda za szybą, czujniki okna.",
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
      pozycja: "Pozycja",
      przeszkoda: "Przeszkoda w bramie",
      wznow: "Wznów",
      pauza: "Pauza do",
      wolne: "Wolna droga",
      dom: "Motor HA – cały dom",
      domOpis: "Wszystkie urządzenia Motor HA na jednej karcie: stan, powód ruchu i przyciski.",
      domBrak: "Nie ma jeszcze urządzeń Motor HA.",
      wszOtw: "Otwórz wszystkie",
      wszZam: "Zamknij wszystkie"
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
      taras: "Taras",
      pionowe: "Pionowe i zasłony",
      brama: "Brama i garaż",
      bramy: "Bramy wjazdowe",
      garaze: "Bramy garażowe"
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
      screen: "Screen ZIP",
      pionowa: "Żaluzja pionowa",
      zaslona: "Zasłona boczna",
      przesuwna: "Brama przesuwna",
      skrzydlowa: "Brama skrzydłowa",
      segmentowa: "Brama segmentowa",
      uchylna: "Brama uchylna",
      roletowa: "Brama roletowa"
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
    },
    symulator: {
      tytul: "Wypróbuj na żywo",
      pora: "Pora dnia",
      pogoda: "Pogoda",
      rodzaj: "Rodzaj",
      kolor: "Kolor",
      dzien: "Dzień",
      zloto: "Złota godzina",
      zmierzch: "Zmierzch",
      noc: "Noc",
      wskazowka: "Przeciągnij szybę albo użyj przycisków. To tylko podgląd – nic w domu się nie rusza."
    },
    urzadzenie: {
      dodaj: "Dodaj do panelu",
      zmien: "Zmień ustawienia",
      ustawienia: "Ustawienia Motor HA",
      ktory: "Na który panel?",
      dodano: "Dodano na panel",
      brakPaneli: "Nie ma panelu, który można edytować. Utwórz go w Ustawienia → Panele.",
      blad: "Nie udało się. Spróbuj jeszcze raz.",
      rodzaj: "Rodzaj",
      kolor: "Kolor",
      skrzydla: "Skrzydła",
      wysokosc: "Wysokość na karcie",
      czas: "Czas przejazdu",
      auto: "automatycznie",
      automatyka: "Automatyka",
      pauza: "Pauza na dziś",
      powod: "Powód ruchu"
    }
  };

  // tlumaczenia/en.json
  var en_default = {
    nazwa: "Motor HA",
    opis: "Everything with a motor: shutters, blinds, awnings, curtains, gates and garage doors. Moves at motor speed, weather behind the glass, window sensors.",
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
      pozycja: "Position",
      przeszkoda: "Obstacle in the gate",
      wznow: "Resume",
      pauza: "Paused until",
      wolne: "Way clear",
      dom: "Motor HA – whole home",
      domOpis: "All Motor HA devices on one card: state, reason for move and buttons.",
      domBrak: "There are no Motor HA devices yet.",
      wszOtw: "Open all",
      wszZam: "Close all"
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
      taras: "Terrace",
      pionowe: "Vertical and curtains",
      brama: "Gate and garage",
      bramy: "Driveway gates",
      garaze: "Garage doors"
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
      screen: "ZIP screen",
      pionowa: "Vertical blind",
      zaslona: "Side curtain",
      przesuwna: "Sliding gate",
      skrzydlowa: "Swing gate",
      segmentowa: "Sectional door",
      uchylna: "Up-and-over door",
      roletowa: "Roller door"
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
    },
    symulator: {
      tytul: "Try it live",
      pora: "Time of day",
      pogoda: "Weather",
      rodzaj: "Type",
      kolor: "Colour",
      dzien: "Day",
      zloto: "Golden hour",
      zmierzch: "Dusk",
      noc: "Night",
      wskazowka: "Drag the glass or use the buttons. This is only a preview – nothing at home moves."
    },
    urzadzenie: {
      dodaj: "Add to dashboard",
      zmien: "Change settings",
      ustawienia: "Motor HA settings",
      ktory: "Which dashboard?",
      dodano: "Added to dashboard",
      brakPaneli: "There is no editable dashboard. Create one in Settings → Dashboards.",
      blad: "That didn't work. Please try again.",
      rodzaj: "Type",
      kolor: "Colour",
      skrzydla: "Sashes",
      wysokosc: "Height on the card",
      czas: "Travel time",
      auto: "automatic",
      automatyka: "Automation",
      pauza: "Pause for today",
      powod: "Reason for movement"
    }
  };

  // tlumaczenia/de.json
  var de_default = {
    nazwa: "Motor HA",
    opis: "Alles mit Motor: Rollläden, Jalousien, Markisen, Vorhänge, Tore und Garagentore. Bewegung im Motortempo, Wetter hinter dem Glas, Fenstersensoren.",
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
      pozycja: "Position",
      przeszkoda: "Hindernis im Tor",
      wznow: "Fortsetzen",
      pauza: "Pause bis",
      wolne: "Weg frei",
      dom: "Motor HA – ganzes Haus",
      domOpis: "Alle Motor-HA-Geräte auf einer Karte: Zustand, Grund der Bewegung und Tasten.",
      domBrak: "Noch keine Motor-HA-Geräte.",
      wszOtw: "Alle öffnen",
      wszZam: "Alle schließen"
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
      taras: "Terrasse",
      pionowe: "Vertikal und Vorhänge",
      brama: "Tor und Garage",
      bramy: "Einfahrtstore",
      garaze: "Garagentore"
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
      screen: "ZIP-Screen",
      pionowa: "Vertikaljalousie",
      zaslona: "Seitenvorhang",
      przesuwna: "Schiebetor",
      skrzydlowa: "Flügeltor",
      segmentowa: "Sektionaltor",
      uchylna: "Schwingtor",
      roletowa: "Rolltor"
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
    },
    symulator: {
      tytul: "Live ausprobieren",
      pora: "Tageszeit",
      pogoda: "Wetter",
      rodzaj: "Art",
      kolor: "Farbe",
      dzien: "Tag",
      zloto: "Goldene Stunde",
      zmierzch: "Dämmerung",
      noc: "Nacht",
      wskazowka: "Ziehe die Scheibe oder nutze die Tasten. Nur eine Vorschau – zu Hause bewegt sich nichts."
    },
    urzadzenie: {
      dodaj: "Zum Dashboard hinzufügen",
      zmien: "Einstellungen ändern",
      ustawienia: "Motor HA – Einstellungen",
      ktory: "Welches Dashboard?",
      dodano: "Hinzugefügt zu",
      brakPaneli: "Kein bearbeitbares Dashboard. Lege eines unter Einstellungen → Dashboards an.",
      blad: "Das hat nicht geklappt. Bitte erneut versuchen.",
      rodzaj: "Art",
      kolor: "Farbe",
      skrzydla: "Flügel",
      wysokosc: "Höhe auf der Karte",
      czas: "Fahrzeit",
      auto: "automatisch",
      automatyka: "Automatik",
      pauza: "Pause für heute",
      powod: "Grund der Bewegung"
    }
  };

  // tlumaczenia/fr.json
  var fr_default = {
    nazwa: "Motor HA",
    opis: "Tout ce qui a un moteur : volets, stores, bannes, rideaux, portails et portes de garage. Mouvement à la vitesse du moteur, météo derrière la vitre, capteurs de fenêtre.",
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
      pozycja: "Position",
      przeszkoda: "Obstacle dans le portail",
      wznow: "Reprendre",
      pauza: "En pause jusqu'à",
      wolne: "Passage libre",
      dom: "Motor HA – toute la maison",
      domOpis: "Tous les appareils Motor HA sur une carte : état, raison du mouvement et boutons.",
      domBrak: "Aucun appareil Motor HA pour l'instant.",
      wszOtw: "Tout ouvrir",
      wszZam: "Tout fermer"
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
      taras: "Terrasse",
      pionowe: "Verticaux et rideaux",
      brama: "Portail et garage",
      bramy: "Portails",
      garaze: "Portes de garage"
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
      screen: "Screen ZIP",
      pionowa: "Store vertical",
      zaslona: "Rideau latéral",
      przesuwna: "Portail coulissant",
      skrzydlowa: "Portail battant",
      segmentowa: "Porte sectionnelle",
      uchylna: "Porte basculante",
      roletowa: "Porte enroulable"
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
    },
    symulator: {
      tytul: "Essayer en direct",
      pora: "Moment de la journée",
      pogoda: "Météo",
      rodzaj: "Type",
      kolor: "Couleur",
      dzien: "Jour",
      zloto: "Heure dorée",
      zmierzch: "Crépuscule",
      noc: "Nuit",
      wskazowka: "Faites glisser la vitre ou utilisez les boutons. Ce n'est qu'un aperçu – rien ne bouge chez vous."
    },
    urzadzenie: {
      dodaj: "Ajouter au tableau de bord",
      zmien: "Modifier les réglages",
      ustawienia: "Réglages Motor HA",
      ktory: "Quel tableau de bord ?",
      dodano: "Ajouté à",
      brakPaneli: "Aucun tableau de bord modifiable. Créez-en un dans Paramètres → Tableaux de bord.",
      blad: "Échec. Réessayez.",
      rodzaj: "Type",
      kolor: "Couleur",
      skrzydla: "Battants",
      wysokosc: "Hauteur sur la carte",
      czas: "Durée de course",
      auto: "automatique",
      automatyka: "Automatisme",
      pauza: "Pause aujourd’hui",
      powod: "Raison du mouvement"
    }
  };

  // tlumaczenia/cs.json
  var cs_default = {
    nazwa: "Motor HA",
    opis: "Vše s motorem: rolety, žaluzie, markýzy, závěsy, brány a garážová vrata. Pohyb v tempu motoru, počasí za sklem, okenní čidla.",
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
      pozycja: "Poloha",
      przeszkoda: "Překážka v bráně",
      wznow: "Obnovit",
      pauza: "Pauza do",
      wolne: "Volná cesta",
      dom: "Motor HA – celý dům",
      domOpis: "Všechna zařízení Motor HA na jedné kartě: stav, důvod pohybu a tlačítka.",
      domBrak: "Zatím žádná zařízení Motor HA.",
      wszOtw: "Otevřít vše",
      wszZam: "Zavřít vše"
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
      taras: "Terasa",
      pionowe: "Vertikální a závěsy",
      brama: "Brána a garáž",
      bramy: "Vjezdové brány",
      garaze: "Garážová vrata"
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
      screen: "ZIP screen",
      pionowa: "Vertikální žaluzie",
      zaslona: "Boční závěs",
      przesuwna: "Posuvná brána",
      skrzydlowa: "Křídlová brána",
      segmentowa: "Sekční vrata",
      uchylna: "Výklopná vrata",
      roletowa: "Rolovací vrata"
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
    },
    symulator: {
      tytul: "Vyzkoušejte naživo",
      pora: "Denní doba",
      pogoda: "Počasí",
      rodzaj: "Druh",
      kolor: "Barva",
      dzien: "Den",
      zloto: "Zlatá hodinka",
      zmierzch: "Soumrak",
      noc: "Noc",
      wskazowka: "Táhněte sklem nebo použijte tlačítka. Je to jen náhled – doma se nic nepohne."
    },
    urzadzenie: {
      dodaj: "Přidat na panel",
      zmien: "Změnit nastavení",
      ustawienia: "Nastavení Motor HA",
      ktory: "Na který panel?",
      dodano: "Přidáno na panel",
      brakPaneli: "Není panel, který lze upravit. Vytvořte ho v Nastavení → Panely.",
      blad: "Nepodařilo se. Zkuste to znovu.",
      rodzaj: "Druh",
      kolor: "Barva",
      skrzydla: "Křídla",
      wysokosc: "Výška na kartě",
      czas: "Doba jízdy",
      auto: "automaticky",
      automatyka: "Automatika",
      pauza: "Pauza na dnes",
      powod: "Důvod pohybu"
    }
  };

  // tlumaczenia/sk.json
  var sk_default = {
    nazwa: "Motor HA",
    opis: "Všetko s motorom: rolety, žalúzie, markízy, závesy, brány a garážové brány. Pohyb v tempe motora, počasie za sklom, okenné snímače.",
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
      pozycja: "Poloha",
      przeszkoda: "Prekážka v bráne",
      wznow: "Obnoviť",
      pauza: "Pauza do",
      wolne: "Voľná cesta",
      dom: "Motor HA – celý dom",
      domOpis: "Všetky zariadenia Motor HA na jednej karte: stav, dôvod pohybu a tlačidlá.",
      domBrak: "Zatiaľ žiadne zariadenia Motor HA.",
      wszOtw: "Otvoriť všetko",
      wszZam: "Zatvoriť všetko"
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
      taras: "Terasa",
      pionowe: "Vertikálne a závesy",
      brama: "Brána a garáž",
      bramy: "Vjazdové brány",
      garaze: "Garážové brány"
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
      screen: "ZIP screen",
      pionowa: "Vertikálna žalúzia",
      zaslona: "Bočný záves",
      przesuwna: "Posuvná brána",
      skrzydlowa: "Krídlová brána",
      segmentowa: "Sekčná brána",
      uchylna: "Výklopná brána",
      roletowa: "Rolovacia brána"
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
    },
    symulator: {
      tytul: "Vyskúšajte naživo",
      pora: "Denná doba",
      pogoda: "Počasie",
      rodzaj: "Druh",
      kolor: "Farba",
      dzien: "Deň",
      zloto: "Zlatá hodinka",
      zmierzch: "Súmrak",
      noc: "Noc",
      wskazowka: "Potiahnite sklo alebo použite tlačidlá. Je to len náhľad – doma sa nič nepohne."
    },
    urzadzenie: {
      dodaj: "Pridať na panel",
      zmien: "Zmeniť nastavenia",
      ustawienia: "Nastavenia Motor HA",
      ktory: "Na ktorý panel?",
      dodano: "Pridané na panel",
      brakPaneli: "Nie je panel, ktorý sa dá upraviť. Vytvorte ho v Nastavenia → Panely.",
      blad: "Nepodarilo sa. Skúste to znova.",
      rodzaj: "Druh",
      kolor: "Farba",
      skrzydla: "Krídla",
      wysokosc: "Výška na karte",
      czas: "Čas jazdy",
      auto: "automaticky",
      automatyka: "Automatika",
      pauza: "Pauza na dnes",
      powod: "Dôvod pohybu"
    }
  };

  // tlumaczenia/es.json
  var es_default = {
    nazwa: "Motor HA",
    opis: "Todo lo que tiene motor: persianas, estores, toldos, cortinas, portones y puertas de garaje. Movimiento al ritmo del motor, tiempo tras el cristal, sensores de ventana.",
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
      pozycja: "Posición",
      przeszkoda: "Obstáculo en el portón",
      wznow: "Reanudar",
      pauza: "En pausa hasta",
      wolne: "Paso libre",
      dom: "Motor HA – toda la casa",
      domOpis: "Todos los dispositivos Motor HA en una tarjeta: estado, motivo del movimiento y botones.",
      domBrak: "Aún no hay dispositivos Motor HA.",
      wszOtw: "Abrir todo",
      wszZam: "Cerrar todo"
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
      taras: "Terraza",
      pionowe: "Verticales y cortinas",
      brama: "Portón y garaje",
      bramy: "Portones",
      garaze: "Puertas de garaje"
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
      screen: "Screen ZIP",
      pionowa: "Estor vertical",
      zaslona: "Cortina lateral",
      przesuwna: "Portón corredero",
      skrzydlowa: "Portón batiente",
      segmentowa: "Puerta seccional",
      uchylna: "Puerta basculante",
      roletowa: "Puerta enrollable"
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
    },
    symulator: {
      tytul: "Pruébalo en vivo",
      pora: "Momento del día",
      pogoda: "Tiempo",
      rodzaj: "Tipo",
      kolor: "Color",
      dzien: "Día",
      zloto: "Hora dorada",
      zmierzch: "Anochecer",
      noc: "Noche",
      wskazowka: "Arrastra el cristal o usa los botones. Es solo una vista previa: nada se mueve en casa."
    },
    urzadzenie: {
      dodaj: "Añadir al panel",
      zmien: "Cambiar ajustes",
      ustawienia: "Ajustes de Motor HA",
      ktory: "¿En qué panel?",
      dodano: "Añadido a",
      brakPaneli: "No hay ningún panel editable. Crea uno en Ajustes → Paneles.",
      blad: "No ha funcionado. Inténtalo de nuevo.",
      rodzaj: "Tipo",
      kolor: "Color",
      skrzydla: "Hojas",
      wysokosc: "Altura en la tarjeta",
      czas: "Tiempo de recorrido",
      auto: "automático",
      automatyka: "Automatización",
      pauza: "Pausa por hoy",
      powod: "Motivo del movimiento"
    }
  };

  // tlumaczenia/it.json
  var it_default = {
    nazwa: "Motor HA",
    opis: "Tutto ciò che ha un motore: tapparelle, veneziane, tende da sole, tende, cancelli e porte da garage. Movimento alla velocità del motore, meteo dietro il vetro, sensori finestra.",
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
      pozycja: "Posizione",
      przeszkoda: "Ostacolo nel cancello",
      wznow: "Riprendi",
      pauza: "In pausa fino a",
      wolne: "Via libera",
      dom: "Motor HA – tutta la casa",
      domOpis: "Tutti i dispositivi Motor HA in una scheda: stato, motivo del movimento e pulsanti.",
      domBrak: "Ancora nessun dispositivo Motor HA.",
      wszOtw: "Apri tutto",
      wszZam: "Chiudi tutto"
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
      taras: "Terrazza",
      pionowe: "Verticali e tende",
      brama: "Cancello e garage",
      bramy: "Cancelli",
      garaze: "Porte da garage"
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
      screen: "Screen ZIP",
      pionowa: "Tenda verticale",
      zaslona: "Tenda laterale",
      przesuwna: "Cancello scorrevole",
      skrzydlowa: "Cancello a battente",
      segmentowa: "Porta sezionale",
      uchylna: "Porta basculante",
      roletowa: "Porta avvolgibile"
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
    },
    symulator: {
      tytul: "Provalo dal vivo",
      pora: "Momento della giornata",
      pogoda: "Meteo",
      rodzaj: "Tipo",
      kolor: "Colore",
      dzien: "Giorno",
      zloto: "Ora d'oro",
      zmierzch: "Crepuscolo",
      noc: "Notte",
      wskazowka: "Trascina il vetro o usa i pulsanti. È solo un'anteprima: in casa non si muove nulla."
    },
    urzadzenie: {
      dodaj: "Aggiungi alla plancia",
      zmien: "Modifica impostazioni",
      ustawienia: "Impostazioni Motor HA",
      ktory: "Quale plancia?",
      dodano: "Aggiunto a",
      brakPaneli: "Nessuna plancia modificabile. Creane una in Impostazioni → Plance.",
      blad: "Non è riuscito. Riprova.",
      rodzaj: "Tipo",
      kolor: "Colore",
      skrzydla: "Ante",
      wysokosc: "Altezza sulla scheda",
      czas: "Tempo di corsa",
      auto: "automatico",
      automatyka: "Automazione",
      pauza: "Pausa per oggi",
      powod: "Motivo del movimento"
    }
  };

  // tlumaczenia/nl.json
  var nl_default = {
    nazwa: "Motor HA",
    opis: "Alles met een motor: rolluiken, jaloezieën, zonneschermen, gordijnen, poorten en garagedeuren. Beweging in het tempo van de motor, weer achter het glas, raamsensoren.",
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
      pozycja: "Positie",
      przeszkoda: "Obstakel in de poort",
      wznow: "Hervatten",
      pauza: "Gepauzeerd tot",
      wolne: "Weg vrij",
      dom: "Motor HA – hele huis",
      domOpis: "Alle Motor HA-apparaten op één kaart: status, reden van beweging en knoppen.",
      domBrak: "Nog geen Motor HA-apparaten.",
      wszOtw: "Alles openen",
      wszZam: "Alles sluiten"
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
      taras: "Terras",
      pionowe: "Verticaal en gordijnen",
      brama: "Poort en garage",
      bramy: "Opritpoorten",
      garaze: "Garagedeuren"
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
      screen: "ZIP-screen",
      pionowa: "Verticale lamellen",
      zaslona: "Zijgordijn",
      przesuwna: "Schuifpoort",
      skrzydlowa: "Draaipoort",
      segmentowa: "Sectionaaldeur",
      uchylna: "Kanteldeur",
      roletowa: "Roldeur"
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
    },
    symulator: {
      tytul: "Probeer het live",
      pora: "Tijd van de dag",
      pogoda: "Weer",
      rodzaj: "Soort",
      kolor: "Kleur",
      dzien: "Dag",
      zloto: "Gouden uur",
      zmierzch: "Schemering",
      noc: "Nacht",
      wskazowka: "Sleep over het glas of gebruik de knoppen. Dit is alleen een voorbeeld – thuis beweegt niets."
    },
    urzadzenie: {
      dodaj: "Toevoegen aan dashboard",
      zmien: "Instellingen wijzigen",
      ustawienia: "Motor HA-instellingen",
      ktory: "Welk dashboard?",
      dodano: "Toegevoegd aan",
      brakPaneli: "Geen bewerkbaar dashboard. Maak er een in Instellingen → Dashboards.",
      blad: "Dat lukte niet. Probeer het opnieuw.",
      rodzaj: "Soort",
      kolor: "Kleur",
      skrzydla: "Vleugels",
      wysokosc: "Hoogte op de kaart",
      czas: "Looptijd",
      auto: "automatisch",
      automatyka: "Automatisering",
      pauza: "Pauze voor vandaag",
      powod: "Reden van beweging"
    }
  };

  // tlumaczenia/pt.json
  var pt_default = {
    nazwa: "Motor HA",
    opis: "Tudo o que tem motor: estores, persianas, toldos, cortinas, portões e portas de garagem. Movimento ao ritmo do motor, tempo atrás do vidro, sensores de janela.",
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
      pozycja: "Posição",
      przeszkoda: "Obstáculo no portão",
      wznow: "Retomar",
      pauza: "Em pausa até",
      wolne: "Caminho livre",
      dom: "Motor HA – casa inteira",
      domOpis: "Todos os dispositivos Motor HA num cartão: estado, motivo do movimento e botões.",
      domBrak: "Ainda não há dispositivos Motor HA.",
      wszOtw: "Abrir tudo",
      wszZam: "Fechar tudo"
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
      taras: "Terraço",
      pionowe: "Verticais e cortinas",
      brama: "Portão e garagem",
      bramy: "Portões",
      garaze: "Portas de garagem"
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
      screen: "Screen ZIP",
      pionowa: "Persiana vertical",
      zaslona: "Cortina lateral",
      przesuwna: "Portão de correr",
      skrzydlowa: "Portão de batente",
      segmentowa: "Porta seccionada",
      uchylna: "Porta basculante",
      roletowa: "Porta de enrolar"
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
    },
    symulator: {
      tytul: "Experimente ao vivo",
      pora: "Hora do dia",
      pogoda: "Tempo",
      rodzaj: "Tipo",
      kolor: "Cor",
      dzien: "Dia",
      zloto: "Hora dourada",
      zmierzch: "Crepúsculo",
      noc: "Noite",
      wskazowka: "Arraste o vidro ou use os botões. É só uma pré-visualização – nada se mexe em casa."
    },
    urzadzenie: {
      dodaj: "Adicionar ao painel",
      zmien: "Alterar definições",
      ustawienia: "Definições do Motor HA",
      ktory: "Em que painel?",
      dodano: "Adicionado a",
      brakPaneli: "Não há painel editável. Crie um em Definições → Painéis.",
      blad: "Não resultou. Tente novamente.",
      rodzaj: "Tipo",
      kolor: "Cor",
      skrzydla: "Folhas",
      wysokosc: "Altura no cartão",
      czas: "Tempo de percurso",
      auto: "automático",
      automatyka: "Automação",
      pauza: "Pausa por hoje",
      powod: "Motivo do movimento"
    }
  };

  // tlumaczenia/uk.json
  var uk_default = {
    nazwa: "Motor HA",
    opis: "Усе з мотором: ролети, жалюзі, маркізи, штори, ворота й гаражні ворота. Рух у темпі мотора, погода за склом, датчики вікон.",
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
      pozycja: "Положення",
      przeszkoda: "Перешкода у воротах",
      wznow: "Відновити",
      pauza: "Пауза до",
      wolne: "Шлях вільний",
      dom: "Motor HA – увесь дім",
      domOpis: "Усі пристрої Motor HA на одній картці: стан, причина руху й кнопки.",
      domBrak: "Ще немає пристроїв Motor HA.",
      wszOtw: "Відкрити все",
      wszZam: "Закрити все"
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
      taras: "Тераса",
      pionowe: "Вертикальні та штори",
      brama: "Ворота і гараж",
      bramy: "В'їзні ворота",
      garaze: "Гаражні ворота"
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
      screen: "ZIP-скрін",
      pionowa: "Вертикальні жалюзі",
      zaslona: "Бічна штора",
      przesuwna: "Відкатні ворота",
      skrzydlowa: "Розпашні ворота",
      segmentowa: "Секційні ворота",
      uchylna: "Підйомно-поворотні ворота",
      roletowa: "Рулонні ворота"
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
    },
    symulator: {
      tytul: "Спробуйте наживо",
      pora: "Час доби",
      pogoda: "Погода",
      rodzaj: "Вид",
      kolor: "Колір",
      dzien: "День",
      zloto: "Золота година",
      zmierzch: "Сутінки",
      noc: "Ніч",
      wskazowka: "Потягніть скло або скористайтеся кнопками. Це лише попередній перегляд – удома нічого не рухається."
    },
    urzadzenie: {
      dodaj: "Додати на панель",
      zmien: "Змінити налаштування",
      ustawienia: "Налаштування Motor HA",
      ktory: "На яку панель?",
      dodano: "Додано на панель",
      brakPaneli: "Немає панелі, яку можна редагувати. Створіть її в Налаштування → Панелі.",
      blad: "Не вдалося. Спробуйте ще раз.",
      rodzaj: "Тип",
      kolor: "Колір",
      skrzydla: "Стулки",
      wysokosc: "Висота на картці",
      czas: "Час руху",
      auto: "автоматично",
      automatyka: "Автоматика",
      pauza: "Пауза на сьогодні",
      powod: "Причина руху"
    }
  };

  // tlumaczenia/ru.json
  var ru_default = {
    nazwa: "Motor HA",
    opis: "Всё с мотором: рольставни, жалюзи, маркизы, шторы, ворота и гаражные ворота. Движение в темпе мотора, погода за стеклом, датчики окон.",
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
      pozycja: "Положение",
      przeszkoda: "Препятствие в воротах",
      wznow: "Возобновить",
      pauza: "Пауза до",
      wolne: "Путь свободен",
      dom: "Motor HA – весь дом",
      domOpis: "Все устройства Motor HA на одной карточке: состояние, причина движения и кнопки.",
      domBrak: "Пока нет устройств Motor HA.",
      wszOtw: "Открыть все",
      wszZam: "Закрыть все"
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
      taras: "Терраса",
      pionowe: "Вертикальные и шторы",
      brama: "Ворота и гараж",
      bramy: "Въездные ворота",
      garaze: "Гаражные ворота"
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
      screen: "ZIP-скрин",
      pionowa: "Вертикальные жалюзи",
      zaslona: "Боковая штора",
      przesuwna: "Откатные ворота",
      skrzydlowa: "Распашные ворота",
      segmentowa: "Секционные ворота",
      uchylna: "Подъёмно-поворотные ворота",
      roletowa: "Рулонные ворота"
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
    },
    symulator: {
      tytul: "Попробуйте вживую",
      pora: "Время суток",
      pogoda: "Погода",
      rodzaj: "Вид",
      kolor: "Цвет",
      dzien: "День",
      zloto: "Золотой час",
      zmierzch: "Сумерки",
      noc: "Ночь",
      wskazowka: "Потяните стекло или используйте кнопки. Это только предпросмотр – дома ничего не двигается."
    },
    urzadzenie: {
      dodaj: "Добавить на панель",
      zmien: "Изменить настройки",
      ustawienia: "Настройки Motor HA",
      ktory: "На какую панель?",
      dodano: "Добавлено на панель",
      brakPaneli: "Нет панели, которую можно редактировать. Создайте её в Настройки → Панели.",
      blad: "Не удалось. Попробуйте ещё раз.",
      rodzaj: "Тип",
      kolor: "Цвет",
      skrzydla: "Створки",
      wysokosc: "Высота на карточке",
      czas: "Время хода",
      auto: "автоматически",
      automatyka: "Автоматика",
      pauza: "Пауза на сегодня",
      powod: "Причина движения"
    }
  };

  // tlumaczenia/ja.json
  var ja_default = {
    nazwa: "Motor HA",
    opis: "モーター付きのすべて：シャッター、ブラインド、オーニング、カーテン、門扉、ガレージドア。モーターの速さで動き、窓の外に天気、窓センサー。",
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
      pozycja: "位置",
      przeszkoda: "門に障害物",
      wznow: "再開",
      pauza: "一時停止：",
      wolne: "通行可",
      dom: "Motor HA – 家全体",
      domOpis: "すべての Motor HA デバイスを1枚のカードに：状態、動いた理由、ボタン。",
      domBrak: "Motor HA デバイスはまだありません。",
      wszOtw: "すべて開く",
      wszZam: "すべて閉じる"
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
      taras: "テラス",
      pionowe: "縦型とカーテン",
      brama: "門とガレージ",
      bramy: "門扉",
      garaze: "ガレージドア"
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
      screen: "ZIP スクリーン",
      pionowa: "縦型ブラインド",
      zaslona: "サイドカーテン",
      przesuwna: "引き戸式門扉",
      skrzydlowa: "開き戸式門扉",
      segmentowa: "セクショナルドア",
      uchylna: "跳ね上げ式ドア",
      roletowa: "シャッター"
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
    },
    symulator: {
      tytul: "ライブで試す",
      pora: "時間帯",
      pogoda: "天気",
      rodzaj: "種類",
      kolor: "色",
      dzien: "昼",
      zloto: "ゴールデンアワー",
      zmierzch: "夕暮れ",
      noc: "夜",
      wskazowka: "ガラスをドラッグするか、ボタンを使ってください。プレビューなので、家の中の物は動きません。"
    },
    urzadzenie: {
      dodaj: "ダッシュボードに追加",
      zmien: "設定を変更",
      ustawienia: "Motor HA の設定",
      ktory: "どのダッシュボード？",
      dodano: "追加しました：",
      brakPaneli: "編集できるダッシュボードがありません。設定 → ダッシュボードで作成してください。",
      blad: "失敗しました。もう一度お試しください。",
      rodzaj: "種類",
      kolor: "色",
      skrzydla: "窓の数",
      wysokosc: "カードの高さ",
      czas: "移動時間",
      auto: "自動",
      automatyka: "自動化",
      pauza: "今日は一時停止",
      powod: "動いた理由"
    }
  };

  // tlumaczenia/zh-Hans.json
  var zh_Hans_default = {
    nazwa: "Motor HA",
    opis: "一切带电机的设备：卷帘、百叶、遮阳篷、窗帘、大门和车库门。按电机速度移动，窗外显示天气，窗户传感器。",
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
      pozycja: "位置",
      przeszkoda: "大门有障碍物",
      wznow: "恢复",
      pauza: "暂停至",
      wolne: "道路畅通",
      dom: "Motor HA – 全屋",
      domOpis: "一张卡片显示所有 Motor HA 设备：状态、移动原因和按钮。",
      domBrak: "还没有 Motor HA 设备。",
      wszOtw: "全部打开",
      wszZam: "全部关闭"
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
      taras: "露台",
      pionowe: "垂直帘与窗帘",
      brama: "大门与车库",
      bramy: "庭院大门",
      garaze: "车库门"
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
      screen: "ZIP 遮阳帘",
      pionowa: "垂直百叶帘",
      zaslona: "侧拉窗帘",
      przesuwna: "平移门",
      skrzydlowa: "平开门",
      segmentowa: "分节门",
      uchylna: "翻板门",
      roletowa: "卷帘门"
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
    },
    symulator: {
      tytul: "实时试用",
      pora: "时段",
      pogoda: "天气",
      rodzaj: "类型",
      kolor: "颜色",
      dzien: "白天",
      zloto: "黄金时刻",
      zmierzch: "黄昏",
      noc: "夜晚",
      wskazowka: "拖动玻璃或使用按钮。这只是预览，家里的设备不会移动。"
    },
    urzadzenie: {
      dodaj: "添加到仪表盘",
      zmien: "更改设置",
      ustawienia: "Motor HA 设置",
      ktory: "添加到哪个仪表盘？",
      dodano: "已添加到",
      brakPaneli: "没有可编辑的仪表盘。请在 设置 → 仪表盘 中创建。",
      blad: "操作失败，请重试。",
      rodzaj: "类型",
      kolor: "颜色",
      skrzydla: "窗扇",
      wysokosc: "卡片高度",
      czas: "运行时间",
      auto: "自动",
      automatyka: "自动化",
      pauza: "今天暂停",
      powod: "移动原因"
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

  // src/urzadzenie.js
  var esc = (s) => String(s ?? "").replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[z]);
  var STYL = `
:host{display:block;margin-bottom:var(--ha-space-4,16px)}
[hidden]{display:none!important}
.ramka{background:var(--ha-card-background,var(--card-background-color));border-radius:var(--ha-card-border-radius,12px);
 border:var(--ha-card-border-width,1px) solid var(--ha-card-border-color,var(--divider-color));overflow:hidden;color:var(--primary-text-color)}
.karta{--ha-card-border-width:0;--ha-card-box-shadow:none;--ha-card-border-radius:0}
.stopka{border-top:1px solid var(--divider-color);padding:var(--ha-space-2,8px) var(--ha-space-2,8px);display:flex;flex-wrap:wrap;gap:4px;align-items:center}
.link{background:none;border:none;font:inherit;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);
 color:var(--primary-color);cursor:pointer;padding:0 var(--ha-space-2,8px);line-height:36px;border-radius:var(--ha-border-radius-md,8px)}
.link:hover{background:color-mix(in srgb,var(--primary-color) 10%,transparent)}
.panele{display:flex;flex-wrap:wrap;gap:6px;padding:0 var(--ha-space-2,8px) var(--ha-space-2,8px);width:100%}
.panele button{font:inherit;font-size:var(--ha-font-size-s,13px);border:1px solid var(--divider-color);border-radius:18px;padding:6px 12px;cursor:pointer;
 background:none;color:var(--primary-text-color)}
.panele button:hover{border-color:var(--primary-color);color:var(--primary-color)}
.pyt{width:100%;font-size:var(--ha-font-size-s,13px);color:var(--secondary-text-color)}
.info{font-size:var(--ha-font-size-s,13px);color:var(--secondary-text-color);padding:0 var(--ha-space-2,8px) var(--ha-space-2,8px);width:100%}
.ust{padding:var(--ha-space-4,16px) var(--ha-space-4,16px) var(--ha-space-2,8px)}
.ust h2{margin:0 0 var(--ha-space-2,8px);font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500)}
.wiersz{display:flex;justify-content:space-between;gap:12px;font-size:var(--ha-font-size-m,14px);line-height:28px;border-bottom:1px solid var(--divider-color)}
.wiersz:last-child{border-bottom:none}
.wiersz span:first-child{color:var(--secondary-text-color)}
.wiersz span:last-child{text-align:end}
.wiersz.klik{cursor:pointer;margin:0 calc(-1 * var(--ha-space-2,8px));padding:0 var(--ha-space-2,8px);border-radius:var(--ha-border-radius-sm,4px)}
.wiersz.klik span:last-child::after{content:"›";margin-inline-start:8px;color:var(--secondary-text-color)}
.wiersz.klik:hover{background:color-mix(in srgb,var(--primary-text-color) 6%,transparent)}
.wiersz.klik:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px}`;
  var MotorHaUrzadzenie = class extends HTMLElement {
    // cel: { entity: 'cover.x', urzadzenie: 'id', wpis: 'entry_id' } albo { dom: true }
    set cel(c) {
      this._cel = c;
      this._zbudowane = false;
      this._rysuj();
    }
    get cel() {
      return this._cel;
    }
    set hass(h) {
      this._hass = h;
      this._rysuj();
    }
    get hass() {
      return this._hass;
    }
    _rysuj() {
      const h = this._hass, c = this._cel;
      if (!h || !c) return;
      const T2 = TEKSTY[jezyk({}, h)], U = T2.urzadzenie, root = this.shadowRoot || this.attachShadow({ mode: "open" });
      if (!this._zbudowane) {
        this._zbudowane = true;
        root.innerHTML = `<style>${STYL}</style><div class="ramka"><div class="karta"></div>
        <div class="stopka"><button class="link dodaj">${esc(U.dodaj)}</button>${c.wpis ? `<button class="link zmien">⚙ ${esc(U.zmien)}</button>` : ""}
        <div class="panele" hidden></div><div class="info" hidden></div></div>
        ${c.entity ? `<div class="ust" style="border-top:1px solid var(--divider-color)"><h2>${esc(U.ustawienia)}</h2><div class="wiersze"></div></div>` : ""}</div>`;
        const karta = document.createElement(c.entity ? "motor-ha" : "motor-ha-dom");
        karta.bezEdycji = true;
        karta.setConfig(c.entity ? { type: "custom:motor-ha", entity: c.entity } : { type: "custom:motor-ha-dom" });
        root.querySelector(".karta").appendChild(karta);
        this._karta = karta;
        root.querySelector(".dodaj").addEventListener("click", () => this._panele());
        root.querySelector(".zmien")?.addEventListener("click", () => konfiguruj(c.wpis));
      }
      this._karta.hass = h;
      if (c.entity) {
        const st = h.states[c.entity], m = st?.attributes?.motor_ha;
        if (!m) return;
        const wiersze = this._wiersze(h, T2, U, c, m);
        const klucz = JSON.stringify(wiersze);
        if (klucz !== this._ost) {
          this._ost = klucz;
          const lista = root.querySelector(".wiersze");
          lista.innerHTML = wiersze.map(([a, b, cel], i) => {
            const dziala = cel.encja || c.wpis;
            return `<div class="wiersz${dziala ? " klik" : ""}" ${dziala ? `role="button" tabindex="0" data-i="${i}"` : ""}><span>${esc(a)}</span><span>${esc(b)}</span></div>`;
          }).join("");
          lista.querySelectorAll(".klik").forEach((el) => {
            const idz = () => this._edytuj(wiersze[+el.dataset.i][2]);
            el.addEventListener("click", idz);
            el.addEventListener("keydown", (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                idz();
              }
            });
          });
        }
      }
    }
    _wiersze(h, T2, U, c, m) {
      const stan = (e) => e && h.states[e] ? h.formatEntityState ? h.formatEntityState(h.states[e]) : h.states[e].state : null;
      const auto = Object.values(h.entities || {}).find((e) => e.device_id === c.urzadzenie && e.platform === "motor_ha" && e.entity_id.startsWith("switch.") && e.entity_id !== m.encje?.pauza);
      const w = [[U.rodzaj, T2.oslony?.[m.oslona] || m.oslona, { krok: "rodzaj" }]];
      if (m.kolor) w.push([U.kolor, T2.kolory?.[m.kolor] || m.kolor, { krok: "kolory" }]);
      if (m.skrzydla) w.push([U.skrzydla, String(m.skrzydla), { krok: "okno" }]);
      if (m.wysokosc) w.push([U.wysokosc, `${m.wysokosc} px`, { krok: "okno" }]);
      w.push([U.czas, typeof m.czas === "number" && m.czas > 0 ? `${m.czas} s` : U.auto, { krok: "silnik" }]);
      if (auto) w.push([U.automatyka, stan(auto.entity_id), { encja: auto.entity_id }]);
      if (m.encje?.pauza && h.states[m.encje.pauza]) w.push([U.pauza, stan(m.encje.pauza), { encja: m.encje.pauza }]);
      if (m.encje?.powod && h.states[m.encje.powod]) w.push([U.powod, stan(m.encje.powod), { encja: m.encje.powod }]);
      return w;
    }
    async _edytuj(cel) {
      if (cel.encja) {
        this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: cel.encja } }));
        return;
      }
      try {
        await this._hass.callWS({ type: "motor_ha/krok", entry_id: this._cel.wpis, krok: cel.krok });
      } catch (e) {
      }
      konfiguruj(this._cel.wpis);
    }
    async _panele() {
      const r = this.shadowRoot, U = TEKSTY[jezyk({}, this._hass)].urzadzenie, pole = r.querySelector(".panele"), info = r.querySelector(".info");
      if (!pole.hidden) {
        pole.hidden = true;
        return;
      }
      info.hidden = true;
      try {
        const lista = await this._hass.callWS({ type: "motor_ha/panele" });
        if (!lista.length) {
          info.textContent = U.brakPaneli;
          info.hidden = false;
          return;
        }
        pole.innerHTML = `<div class="pyt">${esc(U.ktory)}</div>` + lista.map((p) => `<button data-k="${esc(p.klucz)}">${esc(p.nazwa)}</button>`).join("");
        pole.hidden = false;
        pole.querySelectorAll("button").forEach((b) => b.addEventListener("click", async () => {
          try {
            const w = await this._hass.callWS({ type: "motor_ha/dodaj_karte", panel: b.dataset.k, ...this._cel.entity ? { entity_id: this._cel.entity } : {} });
            pole.hidden = true;
            info.textContent = w.dodano ? `✓ ${U.dodano} ${b.textContent}` : U.blad;
            info.hidden = false;
          } catch (e) {
            info.textContent = U.blad;
            info.hidden = false;
          }
        }));
      } catch (e) {
        info.textContent = U.blad;
        info.hidden = false;
      }
    }
  };
  function konfiguruj(wpis) {
    const skad = location.pathname + location.search;
    const idz = (u) => {
      history.pushState(null, "", u);
      window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
    };
    const szukaj = (k) => {
      for (const x of k.querySelectorAll("*")) {
        if (x.tagName === "HA-CONFIG-ENTRY-ROW" && x.data?.entry?.entry_id === wpis) return x;
        if (x.shadowRoot) {
          const y = szukaj(x.shadowRoot);
          if (y) return y;
        }
      }
      return null;
    };
    const okno = () => document.querySelector("home-assistant")?.shadowRoot?.querySelector("dialog-data-entry-flow");
    idz("/config/integrations/integration/motor_ha");
    let n = 0;
    const t = setInterval(() => {
      const w = szukaj(document);
      if (w && typeof w._showOptions === "function") {
        clearInterval(t);
        w._showOptions();
        let bylo = false, m = 0;
        const p = setInterval(() => {
          const o = okno(), otwarte = !!(o && o._params);
          if (otwarte) bylo = true;
          if (bylo && !otwarte || ++m > 7200) {
            clearInterval(p);
            if (bylo && location.pathname.startsWith("/config/integrations/integration/motor_ha")) idz(skad);
          }
        }, 250);
      } else if (++n > 80) clearInterval(t);
    }, 250);
  }

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
  var esc2 = (s) => String(s ?? "").replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[z]);
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
      const s = this._hass.states, n = +c.skrzydla === 1 || czyBrama(c.oslona) ? 1 : 2;
      const grupa = (s[c.entity]?.attributes?.entity_id || []).filter((e) => s[e]);
      const wybor = [c.roleta_lewa, c.roleta_prawa];
      return Array.from({ length: n }, (_, i) => wybor[i] && s[wybor[i]] ? wybor[i] : grupa.length ? grupa[Math.min(i, grupa.length - 1)] : c.entity);
    }
    _odswiez() {
      if (!this._hass || !this._surowa) return;
      const c = this._cfg = this._ustawienia;
      this._jez = jezyk(c, this._hass);
      const czl = this._skrzydla(c);
      const klucz = JSON.stringify([czl.length, c.oslona, c.kolor, c.rama, c.wysokosc, c.przyciski, c.suwak, c.pozycje, this._jez, c.osobno, !!this._wpis()]);
      if (klucz !== this._klucz) {
        this._klucz = klucz;
        this._zbuduj(c, czl);
      }
      this._aktualizuj(c, czl);
    }
    _zbuduj(c, czl) {
      if (czyBrama(c.oslona)) return this._zbudujBrame(c, czl);
      const T2 = this._T, n = czl.length, zew = czyZew(c.oslona), rama = ramaHex(c.rama), kolor = hex(c.kolor);
      this._brama = false;
      this._poziomo = POZIOME.includes(c.oslona);
      const pion2 = c.suwak !== false && !this._poziomo;
      const H2 = Math.max(140, Math.min(600, +c.wysokosc || 260)) * (n === 1 ? 1.15 : 1), W2 = Math.round(H2 * (n === 1 ? 0.68 : 0.92));
      this._kas = KASETA[c.oslona] ?? 12;
      const root = this.shadowRoot || this.attachShadow({ mode: "open" });
      const skrzydlo = (i) => `<div class="skrz" data-i="${i}"><div class="szyba">
      ${zew ? '<div class="pokoj"></div>' : `<div class="niebo"></div><div class="osiedle-w"></div><div class="pg"></div><i class="promien"></i>
      <div class="oslona"></div><div class="listwa"></div><div class="kaseta"></div><i class="prow l"></i><i class="prow p"></i>`}
      <div class="blask"></div><div class="cel"><span></span></div></div>${n > 1 ? '<i class="klamka"></i>' : ""}</div>`;
      const kolumna = (i) => `<div class="szyba" data-i="${i}"><div class="oslona"></div><div class="listwa"></div><div class="kaseta"></div><i class="prow l"></i><i class="prow p"></i><div class="cel"><span></span></div></div>`;
      const pozycje = String(c.pozycje || "").split(/[,; ]+/).filter((x) => x !== "").map(Number).filter((x) => Number.isFinite(x) && x >= 0 && x <= 100).slice(0, 6);
      root.innerHTML = `<style>${STYL_STALY}${stylOkna({ rama, drewno: czyDrewno(c.rama), kolor, typ: c.oslona, zew })}</style>
<ha-card class="${zew ? "zew" : "wew"}${this._poziomo ? " poziomo" : ""}"><div class="mh">
 ${this._naglowek(c)}
 <div class="scena${pion2 ? " zs" : ""}">${zew ? '<div class="pg pgz"></div>' : ""}
  <div class="okno" style="width:min(${pion2 ? "calc(100% - 54px)" : "100%"},${W2}px);aspect-ratio:${W2}/${Math.round(H2)}">
   ${zew ? "" : czl.map((_, i) => `<div class="za" style="${n > 1 ? `left:${i ? "50%" : "6px"};right:${i ? "6px" : "50%"}` : ""}"></div>`).join("")}
   ${Array.from({ length: n }, (_, i) => skrzydlo(i)).join("")}
   ${zew ? `<div class="zewo">${Array.from({ length: n }, (_, i) => kolumna(i)).join("")}</div>` : ""}
   ${n > 1 && !c.osobno ? `<div class="oba" title="${esc2(T2.karta.oba)}"><ha-icon icon="mdi:arrow-up-down"></ha-icon></div>` : ""}
  </div>${pion2 ? this._suwakHtml(T2, true) : ""}</div>
 ${c.przyciski !== false ? `<div class="przyc">
  <button class="otw" title="${esc2(this._lok("ui.card.cover.open_cover", T2.karta.otworz))}"><ha-icon icon="mdi:arrow-up"></ha-icon></button>
  <button class="stp" title="${esc2(this._lok("ui.card.cover.stop_cover", T2.karta.stop))}"><ha-icon icon="mdi:stop"></ha-icon></button>
  <button class="zam" title="${esc2(this._lok("ui.card.cover.close_cover", T2.karta.zamknij))}"><ha-icon icon="mdi:arrow-down"></ha-icon></button></div>` : ""}
 ${c.suwak !== false && !pion2 ? this._suwakHtml(T2, false) : ""}
 ${pozycje.length ? `<div class="poz">${pozycje.map((p) => `<button data-p="${p}">${p === 100 ? esc2(T2.karta.zwinieta) : p === 0 ? esc2(T2.karta.opuszczona) : p + " %"}</button>`).join("")}</div>` : ""}
 ${this._wpis() ? `<button class="zmien">⚙ ${esc2(T2.urzadzenie.zmien)}</button>` : ""}
</div></ha-card>`;
      const q = (s) => root.querySelector(s), qa = (s) => [...root.querySelectorAll(s)];
      const pola = zew ? qa(".zewo .szyba") : qa(".skrz .szyba");
      this._el = {
        ...this._wspolne(q),
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
      q(".zmien")?.addEventListener("click", () => konfiguruj(this._wpis()));
      this._zbudowana = true;
    }
    // „⚙ Zmień ustawienia” pod oknem na panelu: kreator tego urządzenia, potem powrót na ten sam panel.
    // Nie w podglądzie, nie w edytorze panelu i nie na stronie urządzenia (tam jest własny przycisk).
    _wpis() {
      const h = this._hass, c = this._surowa;
      if (!h || !c || c._podglad || this.preview || this.bezEdycji || h.user?.is_admin === false) return null;
      const e = h.entities?.[c.entity];
      return e?.platform === "motor_ha" ? h.devices?.[e.device_id]?.config_entries?.[0] || null : null;
    }
    // nagłówek jak w kafelku HA + wiersz automatyki (powód ruchu, pauza) – wspólny dla okien i bram
    _naglowek(c) {
      return `<div class="gl" role="button" tabindex="0"><div class="ik"><ha-icon icon="${IKONY[c.oslona] || IKONY.zebra}"></ha-icon></div>
  <div class="opis"><span class="nazwa"></span><span class="stan"></span></div>
  <svg class="kompas" viewBox="-20 -20 40 40" hidden aria-hidden="true"><circle r="17" fill="none" stroke="var(--divider-color)" stroke-width="2"/>
   <path d="M-9 -15h18" stroke="var(--primary-color)" stroke-width="4" stroke-linecap="round"/><circle class="sl" r="4.5" fill="#ffb300"/></svg></div>
 <div class="auto" hidden><ha-icon icon="mdi:robot-outline"></ha-icon><span></span><button class="wzn" hidden>${esc2(this._T.karta.wznow)}</button></div>`;
    }
    _wspolne(q) {
      const el = { auto: q(".auto"), autoT: q(".auto span"), autoI: q(".auto ha-icon"), wzn: q(".wzn"), kompas: q(".kompas"), sl: q(".kompas .sl"), ikona: q(".ik ha-icon") };
      el.wzn?.addEventListener("click", (e) => {
        e.stopPropagation();
        const b = this._cfg?.encje?.wznow;
        if (b && !this._cfg._podglad) this._hass.callService("button", "press", { entity_id: b });
      });
      return el;
    }
    // brama albo garaż: rysunek zamiast okna, dotknięcie = jak przycisk pilota
    _zbudujBrame(c, czl) {
      const T2 = this._T, root = this.shadowRoot || this.attachShadow({ mode: "open" });
      this._brama = true;
      this._poziomo = false;
      this._kas = 0;
      this._brNoc = null;
      const st = this._hass.states[c.entity], zPoz = (st?.attributes?.supported_features ?? 0) & 4;
      root.innerHTML = `<style>${STYL_STALY}</style>
<ha-card class="brama"><div class="mh">
 ${this._naglowek(c)}
 <div class="scena"><div class="bramaw" role="button" tabindex="0"></div></div>
 ${c.przyciski !== false ? `<div class="przyc">
  <button class="otw" title="${esc2(this._lok("ui.card.cover.open_cover", T2.karta.otworz))}"><ha-icon icon="mdi:arrow-up"></ha-icon></button>
  <button class="stp" title="${esc2(this._lok("ui.card.cover.stop_cover", T2.karta.stop))}"><ha-icon icon="mdi:stop"></ha-icon></button>
  <button class="zam" title="${esc2(this._lok("ui.card.cover.close_cover", T2.karta.zamknij))}"><ha-icon icon="mdi:arrow-down"></ha-icon></button></div>` : ""}
 ${c.suwak !== false && zPoz ? this._suwakHtml(T2, false) : ""}
 ${this._wpis() ? `<button class="zmien">⚙ ${esc2(T2.urzadzenie.zmien)}</button>` : ""}
</div></ha-card>`;
      const q = (s) => root.querySelector(s);
      this._el = {
        ...this._wspolne(q),
        karta: q("ha-card"),
        nazwa: q(".nazwa"),
        stan: q(".stan"),
        ik: q(".ik"),
        suwak: q(".suwak"),
        otw: q(".otw"),
        stp: q(".stp"),
        zam: q(".zam"),
        poz: [],
        skrz: [],
        pola: [],
        bramaw: q(".bramaw")
      };
      this._ruchy = [new Ruch(czl[0])];
      this._czl = null;
      this._niebo = null;
      this._zew = false;
      const E = this._el;
      q(".gl").addEventListener("click", () => this._wiecej());
      E.bramaw.addEventListener("click", () => this._dotkniecie(null));
      E.bramaw.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this._dotkniecie(null);
        }
      });
      E.otw?.addEventListener("click", () => this._polecenie(100));
      E.zam?.addEventListener("click", () => this._polecenie(0));
      E.stp?.addEventListener("click", () => this._polecenie(null));
      if (E.suwak) this._suwak(E.suwak);
      q(".zmien")?.addEventListener("click", () => konfiguruj(this._wpis()));
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
      const odwroc = c.odwroc && (ktore || !this._hass.states[c.entity]?.attributes?.motor_ha);
      const dane = usl === "set_cover_position" ? { position: odwroc ? 100 - cel : cel } : {};
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
    _suwakHtml(T2, pion2) {
      return `<div class="suwak${pion2 ? " pion" : ""}" role="slider" tabindex="0" aria-orientation="${pion2 ? "vertical" : "horizontal"}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc2(this._lok("ui.card.cover.position", T2.karta.pozycja))}"><div class="wyp"></div></div>`;
    }
    _suwak(el) {
      let akt = false;
      const pion2 = el.classList.contains("pion");
      const wart = (e) => {
        const r = el.getBoundingClientRect(), u = pion2 ? (r.bottom - e.clientY) / r.height : (e.clientX - r.left) / r.width;
        return Math.round(Math.min(1, Math.max(0, u)) * 100);
      };
      el.addEventListener("pointerdown", (e) => {
        akt = true;
        this._suwakW = wart(e);
        el.setPointerCapture?.(e.pointerId);
        this._rysujSuwak();
      });
      el.addEventListener("pointermove", (e) => {
        if (akt) {
          this._suwakW = wart(e);
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
      if (this._brama) return this._aktualizujBrame(c, czl, st, pora);
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
      this._automatyka(c, h);
      const otwarte = this._ruchy.some((r) => (r.widac ?? 0) > 0);
      E.karta.style.setProperty("--mh-kolor", otwarte ? "var(--primary-color)" : "var(--state-cover-inactive-color,var(--state-inactive-color,var(--disabled-color)))");
      this._animuj();
    }
    // wiersz automatyki: dlaczego osłona stoi tak, jak stoi; przy pauzie przycisk „Wznów”
    _automatyka(c, h) {
      const E = this._el, enc = c.encje || {};
      const ps = enc.powod && h.states[enc.powod], pz = enc.pauza && h.states[enc.pauza];
      const pokaz = ps && !["brak", "wylaczona", "unavailable", "unknown"].includes(ps.state);
      if (E.auto) {
        E.auto.hidden = !pokaz;
        if (pokaz) {
          let t = h.formatEntityState ? h.formatEntityState(ps) : ps.state;
          const pauza = pz?.state === "on" || ["pauza", "reczny"].includes(ps.state);
          const d = pauza && c.pauza_do ? new Date(c.pauza_do) : null;
          if (d && !isNaN(d)) {
            const g = `${this._T.karta.pauza} ${d.toLocaleTimeString(h.locale?.language || void 0, { hour: "2-digit", minute: "2-digit" })}`;
            t = ps.state === "pauza" ? g : `${t} · ${g}`;
          }
          E.autoT.textContent = t;
          E.wzn.hidden = !(pauza && enc.wznow);
          const blad = ["blokada", "przeszkoda"].includes(ps.state);
          E.auto.classList.toggle("blad", blad);
          E.autoI.setAttribute("icon", pauza ? "mdi:pause-circle-outline" : blad ? "mdi:alert-circle-outline" : "mdi:robot-outline");
        }
      }
      const sun = h.states["sun.sun"], az = +sun?.attributes?.azimuth, el = +sun?.attributes?.elevation;
      const widac = typeof c.kompas === "number" && Number.isFinite(az) && el > 0;
      if (E.kompas) {
        E.kompas.toggleAttribute("hidden", !widac);
        if (widac) {
          const k = (az - c.kompas) * Math.PI / 180, r = 13 * (1 - Math.min(1, el / 90) * 0.55);
          E.sl.setAttribute("cx", (Math.sin(k) * r).toFixed(1));
          E.sl.setAttribute("cy", (-Math.cos(k) * r).toFixed(1));
          E.sl.setAttribute("opacity", Math.abs((az - c.kompas + 540) % 360 - 180) < 90 ? 1 : 0.35);
        }
      }
    }
    _aktualizujBrame(c, czl, st, pora) {
      const h = this._hass, T2 = this._T, E = this._el, noc = pora === "noc" || pora === "zmierzch";
      if (noc !== this._brNoc) {
        this._brNoc = noc;
        E.bramaw.innerHTML = rysunekBramy(c.oslona, hex(c.kolor), ramaHex(c.rama), noc, !!c.przeszkoda);
        E.svg = E.bramaw.querySelector("svg");
        E.bramaw.setAttribute("aria-label", T2.oslony[c.oslona] || "");
      }
      const czesci = [h.formatEntityState ? h.formatEntityState(st) : st.state];
      const pos = st.attributes.current_position;
      if (typeof pos === "number" && pos > 0 && pos < 100) czesci.push(`${pos} %`);
      const fs = c.przeszkoda && h.states[c.przeszkoda];
      const przeszkoda = !!fs && String(fs.state) === String(c.foto_stan || "on");
      if (fs) {
        ustawFotokomorke(E.svg, przeszkoda);
        if (przeszkoda) czesci.push(T2.karta.przeszkoda);
      }
      this._opisStanu = czesci;
      this._automatyka(c, h);
      const otwarte = st.state !== "closed";
      E.ikona?.setAttribute("icon", (otwarte ? IKONY_OTW[c.oslona] : IKONY[c.oslona]) || "mdi:gate");
      E.karta.style.setProperty("--mh-kolor", otwarte ? "var(--primary-color)" : "var(--state-cover-inactive-color,var(--state-inactive-color,var(--disabled-color)))");
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
      const w = this._suwakW ?? this._srednia();
      S.querySelector(".wyp").style[S.classList.contains("pion") ? "height" : "width"] = `calc(16px + (100% - 16px) * ${Math.max(0, Math.min(100, w)) / 100})`;
      S.setAttribute("aria-valuenow", Math.round(w));
    }
    _rysuj() {
      const E = this._el, ile = E.pola.length;
      if (this._brama && this._ruchy[0]?.widac !== null) ustawBrame(E.svg, this._cfg.oslona, this._ruchy[0].widac);
      E.pola.forEach((P, i) => {
        const r = this._ruchy[Math.min(i, this._ruchy.length - 1)];
        if (!r || r.widac === null) return;
        const wys = P.p.clientHeight;
        if (!wys) return;
        if (this._poziomo) {
          const z = 100 - r.widac;
          P.oslona.style.top = this._kas - 2 + "px";
          P.oslona.style.height = wys - this._kas + 2 + "px";
          if (this._cfg.oslona === "zaslona") {
            const pol = (z / 2).toFixed(2);
            P.oslona.style.clipPath = "";
            P.oslona.style.maskImage = P.oslona.style.webkitMaskImage = `linear-gradient(90deg,#000 0 calc(${pol}% + 6px),transparent calc(${pol}% + 6px) calc(${100 - pol}% - 6px),#000 calc(${100 - pol}% - 6px))`;
          } else P.oslona.style.clipPath = `inset(0 ${(100 - Math.max(4, z)).toFixed(2)}% 0 0)`;
          if (!this._ciagnie) this._pokazCel(i, r.jedzie && r.komenda ? Math.round(r.cel) : null);
          return;
        }
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
  var esc3 = (s) => String(s ?? "").replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[z]);
  var doHex2 = (v) => Array.isArray(v) && v.length === 3 ? "#" + v.map((x) => (+x).toString(16).padStart(2, "0")).join("") : null;
  var zHex = (h) => {
    const s = String(h).replace("#", "");
    return s.length === 6 ? [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16)) : void 0;
  };
  var STYL2 = `
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
      const LISTA = czyBrama(this._w("oslona")) ? KROKI.filter(([k]) => !["okno", "czujniki", "pogoda"].includes(k)) : KROKI;
      this._krok = Math.min(this._krok ?? 0, LISTA.length - 1);
      const T2 = this._T, n = this._krok, [kl, ik] = LISTA[n], K = T2.kroki[kl];
      const root = this.shadowRoot || this.attachShadow({ mode: "open" });
      root.innerHTML = `<style>${STYL2}</style><div class="ed">
<div class="pasek" role="tablist">${LISTA.map(([k, i], j) => `<button class="kr${j === n ? " on" : j < n ? " zrob" : ""}" data-k="${j}" role="tab" aria-selected="${j === n}" title="${esc3(T2.kroki[k].t)}">
 <span class="k"><ha-icon icon="${i}"></ha-icon></span><span class="p">${esc3(T2.kroki[k].t)}</span></button>`).join("")}</div>
<div class="tyt"><span class="k"><ha-icon icon="${ik}"></ha-icon></span><h3>${esc3(K.t)}<small>${esc3(wstaw(T2.ui.krok, n + 1, LISTA.length))}</small></h3></div>
<p class="cp"><span><b>${esc3(T2.ui.co)}</b> ${esc3(K.co)}</span><span><b>${esc3(T2.ui.poco)}</b> ${esc3(K.poco)}</span></p>
<div class="tresc"></div>
<div class="nav"><button class="bt dr" data-n="-1" ${n ? "" : "hidden"}><ha-icon icon="mdi:chevron-left"></ha-icon>${esc3(T2.ui.wstecz)}</button>
 <button class="bt" data-n="1" ${n < LISTA.length - 1 ? "" : "hidden"}>${esc3(T2.ui.dalej)}<ha-icon icon="mdi:chevron-right"></ha-icon></button></div></div>`;
      root.querySelectorAll("[data-k]").forEach((b) => b.addEventListener("click", () => {
        this._krok = +b.dataset.k;
        this._rysuj();
      }));
      root.querySelectorAll("[data-n]").forEach((b) => b.addEventListener("click", () => {
        this._krok = Math.max(0, Math.min(LISTA.length - 1, n + +b.dataset.n));
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
      box.insertAdjacentHTML("beforeend", `<div class="info"><ha-icon icon="${ikona}"></ha-icon><span>${esc3(txt)}</span></div>`);
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
        box.insertAdjacentHTML("beforeend", `<div class="gr"><ha-icon icon="${IKONY_GRUP[g]}"></ha-icon>${esc3(T2.grupy[g])}</div>`);
        for (const [p, typy] of Object.entries(pod)) {
          box.insertAdjacentHTML("beforeend", `<div class="pg">${esc3(T2.grupy[p])}</div><div class="kafle">${typy.map((t) => `<button class="kaf" data-t="${t}" aria-pressed="${t === wyb}"><span class="i"><ha-icon icon="${IKONY[t]}"></ha-icon></span>${esc3(T2.oslony[t])}</button>`).join("")}</div>`);
        }
      }
      box.querySelectorAll("[data-t]").forEach((b) => b.addEventListener("click", () => this._zmien({ oslona: b.dataset.t })));
    }
    _kolory(box) {
      const T2 = this._T, k = this._w("kolor"), r = ramaHex(this._w("rama"));
      const nazwaK = KOLORY[k] ? T2.kolory[k] : hex(k), nazwaR = RAMY[r] ? T2.ramy[RAMY[r][0]] : r;
      box.insertAdjacentHTML("beforeend", `<h4>${esc3(T2.pola.kolor)}</h4><div class="probki">${Object.entries(KOLORY).map(([kk, h]) => `<button class="pr" data-kolor="${kk}" style="background:${h}" title="${esc3(T2.kolory[kk])}" aria-label="${esc3(T2.kolory[kk])}" aria-pressed="${kk === k}"></button>`).join("")}</div>
      <p class="wyb">${esc3(T2.ui.wybrany)} <b>${esc3(nazwaK)}</b></p>`);
      this._formularz(box, [{ name: "kolor_wlasny", selector: { color_rgb: {} } }], { kolor_wlasny: KOLORY[k] ? void 0 : zHex(hex(k)) });
      box.insertAdjacentHTML("beforeend", `<h4>${esc3(T2.pola.rama)}</h4><div class="probki">${Object.entries(RAMY).map(([h, [kk]]) => `<button class="pr" data-rama="${h}" style="background:${h}" title="${esc3(T2.ramy[kk])}" aria-label="${esc3(T2.ramy[kk])}" aria-pressed="${h === r}"></button>`).join("")}</div>
      <p class="wyb">${esc3(T2.ui.wybrany)} <b>${esc3(nazwaR)}</b></p>`);
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
      box.insertAdjacentHTML("beforeend", `<h4>${esc3(T2.ui.sterowanie)}</h4>`);
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

  // src/dom.js
  var esc4 = (s) => String(s ?? "").replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[z]);
  var STYL3 = `
.lista{display:flex;flex-direction:column;gap:4px}
.wiersz{display:flex;align-items:center;gap:10px;min-height:48px}
.wiersz .opis{cursor:pointer}
.male{display:flex;gap:6px}
.male button{width:36px;height:36px;border:none;border-radius:var(--ha-border-radius-md,8px);cursor:pointer;color:var(--primary-text-color);
 background:color-mix(in srgb,var(--disabled-color,#bdbdbd) 20%,transparent);display:flex;align-items:center;justify-content:center}
.male ha-icon{--mdc-icon-size:20px;display:flex}
.tytul{font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color);padding:4px 4px 0}`;
  var MotorHaDom = class extends HTMLElement {
    setConfig(cfg) {
      this._cfg = cfg || {};
      this._klucz = null;
    }
    static getStubConfig() {
      return {};
    }
    getCardSize() {
      return 1 + (this._ile || 3);
    }
    getGridOptions() {
      return { columns: 12, min_columns: 6, rows: "auto" };
    }
    set hass(h) {
      this._hass = h;
      this._rysuj();
    }
    _urzadzenia() {
      const s = this._hass.states;
      return Object.keys(s).filter((e) => e.startsWith("cover.") && s[e].attributes?.motor_ha && typeof s[e].attributes.motor_ha === "object").filter((e) => !this._cfg.entities || this._cfg.entities.includes(e)).sort((a, b) => String(s[a].attributes.friendly_name).localeCompare(String(s[b].attributes.friendly_name)));
    }
    _rysuj() {
      const h = this._hass;
      if (!h || !this._cfg) return;
      const T2 = TEKSTY[jezyk(this._cfg, h)], lista = this._urzadzenia(), root = this.shadowRoot || this.attachShadow({ mode: "open" });
      this._ile = lista.length;
      const klucz = lista.join() + T2.karta.dom;
      if (klucz !== this._klucz) {
        this._klucz = klucz;
        root.innerHTML = `<style>${STYL_STALY}${STYL3}</style><ha-card><div class="mh">
        <div class="tytul">${esc4(this._cfg.title ?? T2.karta.dom)}</div>
        ${lista.length ? `<div class="lista">${lista.map((e) => `<div class="wiersz" data-e="${e}"><div class="ik"><ha-icon></ha-icon></div>
          <div class="opis"><span class="nazwa"></span><span class="stan"></span></div>
          <div class="male"><button data-u="open_cover" title="${esc4(T2.karta.otworz)}"><ha-icon icon="mdi:arrow-up"></ha-icon></button>
          <button data-u="stop_cover" title="${esc4(T2.karta.stop)}"><ha-icon icon="mdi:stop"></ha-icon></button>
          <button data-u="close_cover" title="${esc4(T2.karta.zamknij)}"><ha-icon icon="mdi:arrow-down"></ha-icon></button></div></div>`).join("")}</div>` : `<div class="brak">${esc4(T2.karta.domBrak)}</div>`}
      </div></ha-card>`;
        root.querySelectorAll(".wiersz").forEach((w) => {
          const e = w.dataset.e;
          w.querySelector(".opis").addEventListener("click", () => this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: e } })));
          w.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => this._hass.callService("cover", b.dataset.u, { entity_id: e })));
        });
      }
      root.querySelectorAll(".wiersz").forEach((w) => {
        const st = h.states[w.dataset.e];
        if (!st) return;
        const m = st.attributes.motor_ha, typ = m.oslona, otw = st.state !== "closed";
        const czesci = [h.formatEntityState ? h.formatEntityState(st) : st.state];
        const p = st.attributes.current_position;
        if (typeof p === "number" && p > 0 && p < 100) czesci.push(`${p} %`);
        const ps = m.encje?.powod && h.states[m.encje.powod];
        if (ps && !["brak", "wylaczona", "unavailable", "unknown"].includes(ps.state)) czesci.push(h.formatEntityState ? h.formatEntityState(ps) : ps.state);
        w.querySelector(".nazwa").textContent = st.attributes.friendly_name || w.dataset.e;
        w.querySelector(".stan").textContent = czesci.join(" · ");
        w.querySelector(".ik ha-icon").setAttribute("icon", (otw ? IKONY_OTW[typ] : null) || IKONY[typ] || "mdi:window-shutter");
        w.querySelector(".ik").style.setProperty("--mh-kolor", otw ? "var(--primary-color)" : "var(--state-cover-inactive-color,var(--state-inactive-color,var(--disabled-color)))");
      });
    }
  };

  // src/ikony_mdi.js
  var MDI = {
    "mdi:alert-circle-outline": "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z",
    "mdi:arrow-down": "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z",
    "mdi:arrow-up": "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",
    "mdi:arrow-up-down": "M17.45,17.55L12,23L6.55,17.55L7.96,16.14L11,19.17V4.83L7.96,7.86L6.55,6.45L12,1L17.45,6.45L16.04,7.86L13,4.83V19.17L16.04,16.14L17.45,17.55Z",
    "mdi:awning-outline": "M5.06 7C4.63 7 4.22 7.14 3.84 7.42C3.46 7.7 3.24 8.06 3.14 8.5L2.11 12.91C1.86 14 2.06 14.92 2.69 15.73C2.81 15.85 2.93 15.97 3.04 16.07C3.63 16.64 4.28 17 5.22 17C6.16 17 6.91 16.59 7.47 16.05C8.1 16.67 8.86 17 9.8 17C10.64 17 11.44 16.63 12 16.07C12.68 16.7 13.45 17 14.3 17C15.17 17 15.91 16.67 16.54 16.05C17.11 16.62 17.86 17 18.81 17C19.76 17 20.43 16.65 21 16.06C21.09 15.97 21.18 15.87 21.28 15.77C21.94 14.95 22.14 14 21.89 12.91L20.86 8.5C20.73 8.06 20.5 7.7 20.13 7.42C19.77 7.14 19.38 7 18.94 7H5.06M18.89 8.97L19.97 13.38C20.06 13.81 19.97 14.2 19.69 14.55C19.44 14.86 19.13 15 18.75 15C18.44 15 18.17 14.9 17.95 14.66C17.73 14.43 17.61 14.16 17.58 13.84L16.97 9L18.89 8.97M5.06 9H7.03L6.42 13.84C6.3 14.63 5.91 15 5.25 15C4.84 15 4.53 14.86 4.31 14.55C4.03 14.2 3.94 13.81 4.03 13.38L5.06 9M9.05 9H11V13.7C11 14.05 10.89 14.35 10.64 14.62C10.39 14.88 10.08 15 9.7 15C9.36 15 9.07 14.88 8.84 14.59C8.61 14.3 8.5 14 8.5 13.66V13.5L9.05 9M13 9H14.95L15.5 13.5C15.58 13.92 15.5 14.27 15.21 14.57C14.95 14.87 14.61 15 14.2 15C13.89 15 13.61 14.88 13.36 14.62C13.11 14.35 13 14.05 13 13.7V9Z",
    "mdi:blinds": "M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z",
    "mdi:blinds-horizontal": "M20 19V3H4V19H2V21H22V19H20M16 9H18V11H16V9M14 11H6V9H14V11M18 7H16V5H18V7M14 5V7H6V5H14M6 19V13H14V14.82C13.55 15.14 13.25 15.66 13.25 16.25C13.25 17.22 14.03 18 15 18S16.75 17.22 16.75 16.25C16.75 15.66 16.45 15.13 16 14.82V13H18V19H6Z",
    "mdi:blinds-horizontal-closed": "M20 19V3H4V19H2V21H13.25C13.25 21.97 14.03 22.75 15 22.75S16.75 21.97 16.75 21H22V19H20M18 11H16V9H18V11M14 11H6V9H14V11M14 13V15H6V13H14M16 13H18V15H16V13M18 7H16V5H18V7M14 5V7H6V5H14M6 19V17H14V19H6M16 19V17H18V19H16Z",
    "mdi:blinds-vertical": "M20 19V3H4V19H2V21H22V19H20M10 19V5H14V19H10Z",
    "mdi:curtains": "M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z",
    "mdi:garage": "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12M8,15H16V17H8V15M16,18V20H8V18H16Z",
    "mdi:garage-open": "M19,20H17V11H7V20H5V9L12,5L19,9V20M8,12H16V14H8V12Z",
    "mdi:gate": "M9 6V11H7V7H5V11H3V9H1V21H3V19H5V21H7V19H9V21H11V19H13V21H15V19H17V21H19V19H21V21H23V9H21V11H19V7H17V11H15V6H13V11H11V6H9M3 13H5V17H3V13M7 13H9V17H7V13M11 13H13V17H11V13M15 13H17V17H15V13M19 13H21V17H19V13Z",
    "mdi:gate-open": "M7 21V7H5V11H3V9H1V21H3V19H5V21H7M3 17V13H5V17H3M21 9V11H19V7H17V21H19V19H21V21H23V9H21M21 17H19V13H21V17Z",
    "mdi:home-outline": "M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22",
    "mdi:palette": "M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A1.5,1.5 0 0,0 13.5,19.5C13.5,19.11 13.35,18.76 13.11,18.5C12.88,18.23 12.73,17.88 12.73,17.5A1.5,1.5 0 0,1 14.23,16H16A5,5 0 0,0 21,11C21,6.58 16.97,3 12,3Z",
    "mdi:pause-circle-outline": "M13,16V8H15V16H13M9,16V8H11V16H9M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z",
    "mdi:robot-outline": "M17.5 15.5C17.5 16.61 16.61 17.5 15.5 17.5S13.5 16.61 13.5 15.5 14.4 13.5 15.5 13.5 17.5 14.4 17.5 15.5M8.5 13.5C7.4 13.5 6.5 14.4 6.5 15.5S7.4 17.5 8.5 17.5 10.5 16.61 10.5 15.5 9.61 13.5 8.5 13.5M23 15V18C23 18.55 22.55 19 22 19H21V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 10.13 6.13 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M21 16H19V14C19 11.24 16.76 9 14 9H10C7.24 9 5 11.24 5 14V16H3V17H5V20H19V17H21V16Z",
    "mdi:roller-shade": "M20 19V3H4V19H2V21H22V19H20M6 19V13H11V14.8C10.6 15.1 10.2 15.6 10.2 16.2C10.2 17.2 11 18 12 18S13.8 17.2 13.8 16.2C13.8 15.6 13.5 15.1 13 14.8V13H18V19H6Z",
    "mdi:roller-shade-closed": "M20 19V3H4V19H2V21H10.25C10.25 21.97 11.03 22.75 12 22.75S13.75 21.97 13.75 21H22V19H20M6 19V17H11V19H6M13 19V17H18V19H13Z",
    "mdi:sofa-outline": "M21 9V7C21 5.35 19.65 4 18 4H14C13.23 4 12.53 4.3 12 4.78C11.47 4.3 10.77 4 10 4H6C4.35 4 3 5.35 3 7V9C1.35 9 0 10.35 0 12V17C0 18.65 1.35 20 3 20V22H5V20H19V22H21V20C22.65 20 24 18.65 24 17V12C24 10.35 22.65 9 21 9M14 6H18C18.55 6 19 6.45 19 7V9.78C18.39 10.33 18 11.12 18 12V14H13V7C13 6.45 13.45 6 14 6M5 7C5 6.45 5.45 6 6 6H10C10.55 6 11 6.45 11 7V14H6V12C6 11.12 5.61 10.33 5 9.78V7M22 17C22 17.55 21.55 18 21 18H3C2.45 18 2 17.55 2 17V12C2 11.45 2.45 11 3 11S4 11.45 4 12V16H20V12C20 11.45 20.45 11 21 11S22 11.45 22 12V17Z",
    "mdi:stop": "M18,18H6V6H18V18Z",
    "mdi:weather-cloudy": "M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z",
    "mdi:weather-fog": "M3,15H13A1,1 0 0,1 14,16A1,1 0 0,1 13,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15M16,15H21A1,1 0 0,1 22,16A1,1 0 0,1 21,17H16A1,1 0 0,1 15,16A1,1 0 0,1 16,15M1,12A5,5 0 0,1 6,7C7,4.65 9.3,3 12,3C15.43,3 18.24,5.66 18.5,9.03L19,9C21.19,9 22.97,10.76 23,13H21A2,2 0 0,0 19,11H17V10A5,5 0 0,0 12,5C9.5,5 7.45,6.82 7.06,9.19C6.73,9.07 6.37,9 6,9A3,3 0 0,0 3,12C3,12.35 3.06,12.69 3.17,13H1.1L1,12M3,19H5A1,1 0 0,1 6,20A1,1 0 0,1 5,21H3A1,1 0 0,1 2,20A1,1 0 0,1 3,19M8,19H21A1,1 0 0,1 22,20A1,1 0 0,1 21,21H8A1,1 0 0,1 7,20A1,1 0 0,1 8,19Z",
    "mdi:weather-lightning-rainy": "M4.5,13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.44 4,15.6 3.5,15.33V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A1,1 0 0,1 18,15A1,1 0 0,1 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59M9.5,11H12.5L10.5,15H12.5L8.75,22L9.5,17H7L9.5,11M17.5,18.67C17.5,19.96 16.5,21 15.25,21C14,21 13,19.96 13,18.67C13,17.12 15.25,14.5 15.25,14.5C15.25,14.5 17.5,17.12 17.5,18.67Z",
    "mdi:weather-night": "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z",
    "mdi:weather-partly-cloudy": "M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z",
    "mdi:weather-rainy": "M6,14.03A1,1 0 0,1 7,15.03C7,15.58 6.55,16.03 6,16.03C3.24,16.03 1,13.79 1,11.03C1,8.27 3.24,6.03 6,6.03C7,3.68 9.3,2.03 12,2.03C15.43,2.03 18.24,4.69 18.5,8.06L19,8.03A4,4 0 0,1 23,12.03C23,14.23 21.21,16.03 19,16.03H18C17.45,16.03 17,15.58 17,15.03C17,14.47 17.45,14.03 18,14.03H19A2,2 0 0,0 21,12.03A2,2 0 0,0 19,10.03H17V9.03C17,6.27 14.76,4.03 12,4.03C9.5,4.03 7.45,5.84 7.06,8.21C6.73,8.09 6.37,8.03 6,8.03A3,3 0 0,0 3,11.03A3,3 0 0,0 6,14.03M12,14.15C12.18,14.39 12.37,14.66 12.56,14.94C13,15.56 14,17.03 14,18C14,19.11 13.1,20 12,20A2,2 0 0,1 10,18C10,17.03 11,15.56 11.44,14.94C11.63,14.66 11.82,14.4 12,14.15M12,11.03L11.5,11.59C11.5,11.59 10.65,12.55 9.79,13.81C8.93,15.06 8,16.56 8,18A4,4 0 0,0 12,22A4,4 0 0,0 16,18C16,16.56 15.07,15.06 14.21,13.81C13.35,12.55 12.5,11.59 12.5,11.59",
    "mdi:weather-snowy": "M6,14A1,1 0 0,1 7,15A1,1 0 0,1 6,16A5,5 0 0,1 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16H18A1,1 0 0,1 17,15A1,1 0 0,1 18,14H19A2,2 0 0,0 21,12A2,2 0 0,0 19,10H17V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11A3,3 0 0,0 6,14M7.88,18.07L10.07,17.5L8.46,15.88C8.07,15.5 8.07,14.86 8.46,14.46C8.85,14.07 9.5,14.07 9.88,14.46L11.5,16.07L12.07,13.88C12.21,13.34 12.76,13.03 13.29,13.17C13.83,13.31 14.14,13.86 14,14.4L13.41,16.59L15.6,16C16.14,15.86 16.69,16.17 16.83,16.71C16.97,17.24 16.66,17.79 16.12,17.93L13.93,18.5L15.54,20.12C15.93,20.5 15.93,21.15 15.54,21.54C15.15,21.93 14.5,21.93 14.12,21.54L12.5,19.93L11.93,22.12C11.79,22.66 11.24,22.97 10.71,22.83C10.17,22.69 9.86,22.14 10,21.6L10.59,19.41L8.4,20C7.86,20.14 7.31,19.83 7.17,19.29C7.03,18.76 7.34,18.21 7.88,18.07Z",
    "mdi:weather-sunny": "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z",
    "mdi:weather-sunset": "M3,12H7A5,5 0 0,1 12,7A5,5 0 0,1 17,12H21A1,1 0 0,1 22,13A1,1 0 0,1 21,14H3A1,1 0 0,1 2,13A1,1 0 0,1 3,12M5,16H19A1,1 0 0,1 20,17A1,1 0 0,1 19,18H5A1,1 0 0,1 4,17A1,1 0 0,1 5,16M17,20A1,1 0 0,1 18,21A1,1 0 0,1 17,22H7A1,1 0 0,1 6,21A1,1 0 0,1 7,20H17M15,12A3,3 0 0,0 12,9A3,3 0 0,0 9,12H15M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7Z",
    "mdi:white-balance-sunny": "M3.55 19.09L4.96 20.5L6.76 18.71L5.34 17.29M12 6C8.69 6 6 8.69 6 12S8.69 18 12 18 18 15.31 18 12C18 8.68 15.31 6 12 6M20 13H23V11H20M17.24 18.71L19.04 20.5L20.45 19.09L18.66 17.29M20.45 5L19.04 3.6L17.24 5.39L18.66 6.81M13 1H11V4H13M6.76 5.39L4.96 3.6L3.55 5L5.34 6.81L6.76 5.39M1 13H4V11H1M13 20H11V23H13",
    "mdi:window-open-variant": "M21 20V2H3V20H1V23H23V20M19 4V11H17V4M5 4H7V11H5M5 20V13H7V20M9 20V4H15V20M17 20V13H19V20Z",
    "mdi:window-shutter": "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9M8 12H16V14H8V12M8 15H16V17H8V15M8 18H16V20H8V18Z",
    "mdi:window-shutter-open": "M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9Z"
  };

  // src/symulator.js
  var ENCJA = "cover.motor_ha_podglad";
  var PORY = ["dzien", "zloto", "zmierzch", "noc"];
  var IKONY_POR = { dzien: "mdi:white-balance-sunny", zloto: "mdi:weather-sunset", zmierzch: "mdi:weather-sunset", noc: "mdi:weather-night" };
  var POGODY = {
    sunny: "mdi:weather-sunny",
    partlycloudy: "mdi:weather-partly-cloudy",
    cloudy: "mdi:weather-cloudy",
    rainy: "mdi:weather-rainy",
    "lightning-rainy": "mdi:weather-lightning-rainy",
    snowy: "mdi:weather-snowy",
    fog: "mdi:weather-fog"
  };
  var POGODY_EN = { sunny: "Sunny", partlycloudy: "Partly cloudy", cloudy: "Cloudy", rainy: "Rainy", "lightning-rainy": "Lightning, rainy", snowy: "Snowy", fog: "Fog" };
  var BARWY = ["grafit", "bialy", "kremowy", "piaskowy", "szary", "mokka", "granat", "morski", "oliwka", "terakota", "bordo"];
  var RAMA = { bialy: "antracyt", kremowy: "antracyt", piaskowy: "antracyt" };
  var esc5 = (s) => String(s ?? "").replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[z]);
  var svgIkony = (n, r = 18) => `<svg viewBox="0 0 24 24" width="${r}" height="${r}" aria-hidden="true"><path d="${MDI[n] || ""}"/></svg>`;
  var ZAMIENNIKI = `ha-card{display:block;background:var(--ha-card-background,var(--card-background-color,#fff));color:var(--primary-text-color);
 border-radius:var(--ha-card-border-radius,12px);border:var(--ha-card-border-width,1px) solid var(--ha-card-border-color,var(--divider-color,#e0e0e0));
 box-shadow:var(--ha-card-box-shadow,none)}
ha-icon{display:inline-flex}ha-icon svg{width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:currentColor;display:block}`;
  var STYL4 = `:host{display:block;font-family:var(--ha-font-family-body,Roboto,sans-serif);color:var(--primary-text-color)}
.s{display:grid;grid-template-columns:minmax(0,400px) minmax(0,1fr);gap:16px;align-items:start}
@media (max-width:640px){.s{grid-template-columns:1fr}}
.k{min-width:0}
.t{margin:0 0 4px;font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500)}
.w{margin:0 0 12px;font-size:var(--ha-font-size-m,14px);line-height:1.5;color:var(--secondary-text-color)}
.r{margin:0 0 12px}
.l{margin:0 0 6px;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500)}
.g{margin:8px 0 4px;font-size:var(--ha-font-size-s,12px);color:var(--secondary-text-color)}
.c{display:flex;flex-wrap:wrap;gap:8px}
button{display:inline-flex;align-items:center;gap:6px;box-sizing:border-box;height:32px;padding:0 12px;margin:0;border-radius:var(--ha-border-radius-md,8px);
 font:inherit;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color);cursor:pointer;
 background:transparent;border:1px solid var(--outline-color,var(--divider-color));-webkit-tap-highlight-color:transparent;outline:0;transition:background-color .15s}
button:hover{background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}
button:focus-visible{box-shadow:0 0 0 2px var(--primary-color)}
button.on{background:color-mix(in srgb,var(--primary-color) 20%,transparent);border-color:transparent}
button svg{fill:var(--primary-color);flex:none}
.p{width:16px;height:16px;border-radius:50%;flex:none;box-shadow:inset 0 0 0 1px rgba(127,127,127,.5)}`;
  var MotorHaSymulator = class extends HTMLElement {
    constructor() {
      super();
      this._s = { typ: "zebra", kolor: "grafit", pora: "dzien", pogoda: "sunny" };
      this._arkusz = null;
      try {
        this._arkusz = new CSSStyleSheet();
        this._arkusz.replaceSync(ZAMIENNIKI);
      } catch (e) {
      }
    }
    set jezyk(j) {
      this._jezykOpisu = j;
      if (this._gora) this._rysuj();
    }
    set hass(h) {
      const pierwszy = !this._gora;
      this._gora = h;
      if (pierwszy) this._rysuj();
    }
    get _jez() {
      return jezyk(this._jezykOpisu ? { jezyk: this._jezykOpisu } : null, this._gora);
    }
    _pogoda(s) {
      const g = this._gora;
      const z = this._jez === jezyk(null, g) ? g?.localize?.(`component.weather.entity_component._.state.${s}`) : "";
      return z || POGODY_EN[s];
    }
    _hass() {
      const g = this._gora, s = this._s, teraz = (/* @__PURE__ */ new Date()).toISOString(), brama = !!GRUPY.brama && Object.values(GRUPY.brama).flat().includes(s.typ);
      const enc = (id, state, attributes) => ({ entity_id: id, state, attributes, last_changed: teraz, last_updated: teraz, context: { id: "" } });
      const st = Object.assign({}, g.states, {
        [ENCJA]: enc(ENCJA, "open", {
          current_position: brama ? 0 : 60,
          friendly_name: this._T.oslony[s.typ] || "Motor HA",
          supported_features: brama ? 3 : 15,
          ...brama ? { device_class: ["przesuwna", "skrzydlowa"].includes(s.typ) ? "gate" : "garage" } : {}
        }),
        "sun.sun": enc("sun.sun", s.pora === "noc" || s.pora === "zmierzch" ? "below_horizon" : "above_horizon", { elevation: { dzien: 40, zloto: 4, zmierzch: -3, noc: -20 }[s.pora], azimuth: 200 })
      });
      if (brama) st[ENCJA].state = "closed";
      return Object.assign({}, g, { states: st, callService: () => Promise.resolve(), callWS: () => Promise.resolve(null) });
    }
    _rysuj() {
      const T2 = this._T = TEKSTY[this._jez], S = T2.symulator, s = this._s;
      const root = this.shadowRoot || this.attachShadow({ mode: "open" });
      const przycisk = (dane, wart, tekst, ikona, kropka) => `<button data-${dane}="${esc5(wart)}"${s[dane] === wart ? ' class="on"' : ""}>${kropka || (ikona ? svgIkony(ikona) : "")}${esc5(tekst)}</button>`;
      const rodzaje = Object.entries(GRUPY).map(([g, pod]) => `<div class="g">${esc5(T2.grupy[g])}</div><div class="c">${Object.values(pod).flat().map((t) => przycisk("typ", t, T2.oslony[t], IKONY[t])).join("")}</div>`).join("");
      root.innerHTML = `<style>${STYL4}</style><div class="s"><div class="k"></div><div>
<p class="t">${esc5(S.tytul)}</p><p class="w">${esc5(S.wskazowka)}</p>
<div class="r"><div class="l">${esc5(S.pora)}</div><div class="c">${PORY.map((p) => przycisk("pora", p, S[p], IKONY_POR[p])).join("")}</div></div>
<div class="r"><div class="l">${esc5(S.pogoda)}</div><div class="c">${Object.entries(POGODY).map(([p, i]) => przycisk("pogoda", p, this._pogoda(p), i)).join("")}</div></div>
<div class="r"><div class="l">${esc5(S.kolor)}</div><div class="c">${BARWY.map((k) => przycisk("kolor", k, T2.kolory[k], null, `<span class="p" style="background:${KOLORY[k]}"></span>`)).join("")}</div></div>
<div class="r"><div class="l">${esc5(S.rodzaj)}</div>${rodzaje}</div></div></div>`;
      root.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        const [k, v] = Object.entries(b.dataset)[0];
        s[k] = v;
        root.querySelectorAll(`[data-${k}]`).forEach((x) => x.classList.toggle("on", x.dataset[k] === v));
        this._karta();
      }));
      this._k = null;
      this._karta();
    }
    _karta() {
      const s = this._s, pole = this.shadowRoot.querySelector(".k");
      if (!this._k) {
        this._k = document.createElement("motor-ha");
        pole.appendChild(this._k);
      }
      this._k.setConfig({
        type: "custom:motor-ha",
        entity: ENCJA,
        oslona: s.typ,
        kolor: s.kolor,
        rama: RAMA[s.kolor] || "biala",
        jezyk: this._jez,
        name: this._T.oslony[s.typ],
        _podglad: { pogoda: s.pogoda, pora: s.pora }
      });
      this._k.hass = this._hass();
      this._zamienniki();
    }
    // ha-card i ha-icon nie istnieją w ramce: styl przez arkusz cienia karty, ikony jako SVG w środku (bez rejestrowania elementów)
    _zamienniki() {
      if (customElements.get("ha-icon")) return;
      const r = this._k.shadowRoot;
      if (!r) return;
      if (this._arkusz && !r.adoptedStyleSheets.includes(this._arkusz)) r.adoptedStyleSheets = [...r.adoptedStyleSheets, this._arkusz];
      const wypelnij = () => r.querySelectorAll("ha-icon").forEach((i) => {
        const n = i.getAttribute("icon") || "";
        if (i.dataset.mh !== n) {
          i.dataset.mh = n;
          i.innerHTML = MDI[n] ? `<svg viewBox="0 0 24 24"><path d="${MDI[n]}"/></svg>` : "";
        }
      });
      wypelnij();
      if (!this._obs || this._obsR !== r) {
        this._obs?.disconnect();
        this._obs = new MutationObserver(wypelnij);
        this._obs.observe(r, { subtree: true, childList: true, attributes: true, attributeFilter: ["icon"] });
        this._obsR = r;
      }
    }
  };

  // src/strona.js
  var WZOR = /^\/config\/devices\/device\/([^/?#]+)/;
  var ZNAK = "data-motor-ha";
  var strona = (k) => {
    for (const x of k.querySelectorAll("*")) {
      if (x.tagName === "HA-CONFIG-DEVICE-PAGE") return x;
      if (x.shadowRoot && x.tagName !== "HA-SIDEBAR") {
        const y = strona(x.shadowRoot);
        if (y) return y;
      }
    }
    return null;
  };
  function cele(h, id) {
    const encje = Object.values(h.entities || {}).filter((e) => e.platform === "motor_ha");
    const urz = h.devices?.[id];
    if (!urz || !encje.some((e) => e.device_id === id)) return null;
    const wpis = urz.config_entries?.[0];
    const okno = encje.find((e) => e.device_id === id && e.entity_id.startsWith("cover."));
    if (okno) return [{ kolumna: 0, cel: { entity: okno.entity_id, urzadzenie: id, wpis } }];
    const okna = encje.filter((e) => e.entity_id.startsWith("cover.") && h.states[e.entity_id]).sort((a, b) => String(h.states[a.entity_id].attributes.friendly_name).localeCompare(String(h.states[b.entity_id].attributes.friendly_name)));
    return [
      { kolumna: 0, cel: { dom: true } },
      ...okna.map((e, i) => ({ kolumna: 1 + i % 2, cel: { entity: e.entity_id, urzadzenie: e.device_id, wpis: h.devices[e.device_id]?.config_entries?.[0] } }))
    ];
  }
  var zgloszone = "";
  var od = 0;
  var powod = "";
  function zglos(id) {
    const h = document.querySelector("home-assistant")?.hass;
    if (zgloszone === id || !powod || Date.now() - od < 15e3 || !h?.callService) return;
    if (!h.devices?.[id]?.identifiers?.some?.((i) => i[0] === "motor_ha")) return;
    zgloszone = id;
    Promise.resolve(h.callService("system_log", "write", {
      logger: "motor_ha.strona",
      level: "warning",
      message: `Motor HA: brak karty na stronie urządzenia (${powod}; ${navigator.userAgent})`
    })).catch(() => {
    });
  }
  function pilnuj(rejestruj2) {
    const m = WZOR.exec(location.pathname);
    if (!m) {
      od = 0;
      return;
    }
    if (!od) {
      od = Date.now();
      zgloszone = "";
    }
    if (!customElements.get("motor-ha-urzadzenie")) rejestruj2?.();
    if (!customElements.get("motor-ha-urzadzenie")) {
      powod = "element niezarejestrowany";
      return;
    }
    const pg = strona(document), r = pg?.shadowRoot, h = pg?.hass;
    if (!r || !h) {
      powod = "brak strony urządzenia";
      return;
    }
    const kolumny = [...r.querySelectorAll("div.column")];
    if (!kolumny.length) {
      powod = "brak kolumn";
      return;
    }
    const nasze = [...r.querySelectorAll(`[${ZNAK}]`)];
    const lista = cele(h, m[1]);
    powod = lista ? "" : `brak encji Motor HA przy urządzeniu (encje: ${Object.keys(h.entities || {}).length})`;
    const klucz = lista ? m[1] + "|" + kolumny.length + "|" + lista.map((x) => x.cel.entity || "dom").join() : "";
    if (nasze.length && nasze[0].getAttribute(ZNAK) !== klucz) {
      nasze.forEach((e) => e.remove());
      nasze.length = 0;
    }
    if (!lista) return;
    if (!nasze.length) {
      const ile = {};
      for (const { kolumna, cel } of lista) {
        const nr = Math.min(kolumna, kolumny.length - 1), k = kolumny[nr], i = ile[nr] || 0;
        const e = document.createElement("motor-ha-urzadzenie");
        e.setAttribute(ZNAK, klucz);
        e.cel = cel;
        e.hass = h;
        k.insertBefore(e, k.children[i] || null);
        ile[nr] = i + 1;
        nasze.push(e);
      }
    }
    for (const e of nasze) if (e.hass !== h) e.hass = h;
    if (!nasze[0]?.getBoundingClientRect().height) powod = "karta wstawiona, ale pusta";
  }
  function strony(rejestruj2) {
    setInterval(() => {
      try {
        pilnuj(rejestruj2);
      } catch (e) {
        powod = String(e?.message || e);
      }
      const m = WZOR.exec(location.pathname);
      if (m) try {
        zglos(m[1]);
      } catch (e) {
      }
    }, 700);
  }

  // src/index.js
  var ELEMENTY = [
    ["motor-ha", MotorHaKarta],
    ["okno-ha", class extends MotorHaKarta {
    }],
    ["motor-ha-editor", MotorHaEdytor],
    ["okno-ha-editor", class extends MotorHaEdytor {
    }],
    ["motor-ha-dom", MotorHaDom],
    ["motor-ha-symulator", MotorHaSymulator],
    // symulator tylko dla opisu w HACS
    ["motor-ha-urzadzenie", MotorHaUrzadzenie],
    // karta na stronie urządzenia w Ustawieniach (strona.js)
    ["roleta-realistyczna", class extends MotorHaKarta {
    }],
    ["roleta-realistyczna-editor", class extends MotorHaEdytor {
    }]
  ];
  var rejestruj = (kopia) => {
    for (const [nazwa2, klasa] of ELEMENTY) {
      if (customElements.get(nazwa2)) continue;
      try {
        customElements.define(nazwa2, kopia ? class extends klasa {
        } : klasa);
      } catch (e) {
        console.warn("Motor HA: nie zarejestrowałem", nazwa2, e);
      }
    }
  };
  rejestruj(false);
  var rejestr = window.customElements;
  var straz = setInterval(() => {
    if (window.customElements !== rejestr || !customElements.get("motor-ha")) {
      rejestr = window.customElements;
      rejestruj(true);
    }
  }, 50);
  setTimeout(() => clearInterval(straz), 3e4);
  var T = TEKSTY[kodJezyka(document.documentElement.lang || navigator.language)];
  window.customCards = window.customCards || [];
  for (let i = window.customCards.length - 1; i >= 0; i--) if (["motor-ha", "motor-ha-dom", "okno-ha", "roleta-realistyczna"].includes(window.customCards[i]?.type)) window.customCards.splice(i, 1);
  window.customCards.push({
    type: "motor-ha",
    name: T.nazwa,
    description: T.opis,
    preview: true,
    documentationURL: "https://github.com/superdarco78/Motor-HA",
    // „Dodaj do panelu” na stronie urządzenia proponuje kartę Motor HA dla okien i osłon
    getEntitySuggestion: (hass, entityId) => String(entityId).startsWith("cover.") ? { label: T.nazwa, config: { type: "custom:motor-ha", entity: entityId } } : null
  });
  window.customCards.push({
    type: "motor-ha-dom",
    name: T.karta.dom,
    description: T.karta.domOpis,
    preview: true,
    documentationURL: "https://github.com/superdarco78/Motor-HA"
  });
  if (!window.__motorHaStrony && !window.frameElement) {
    window.__motorHaStrony = true;
    strony(() => rejestruj(true));
  }
  window.__motorHa = { wersja: WERSJA, grupy: GRUPY, ikony: IKONY, kolory: KOLORY, kroki: KROKI, teksty: TEKSTY };
  console.info(`%c Motor HA %c ${WERSJA} `, "background:#009ac7;color:#fff;border-radius:3px 0 0 3px;padding:1px 4px", "background:#ff9800;color:#fff;border-radius:0 3px 3px 0;padding:1px 4px");
})();
