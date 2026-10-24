/* Motor HA – karta okna z osłoną · © superdarco78 · CC BY-NC-SA 4.0 · github.com/superdarco78/Motor-HA
   Źródło: karta/src (npm run build) */
(() => {
  // src/kafle.js
  var P = "k0";
  var nr = 0;
  var rgb = (h) => {
    h = String(h).replace("#", "");
    if (h.length === 3) h = [...h].map((c) => c + c).join("");
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) || 0);
  };
  var mix = (a, b, t) => "#" + rgb(a).map((x, i) => Math.round(x + (rgb(b)[i] - x) * t).toString(16).padStart(2, "0")).join("");
  var ciem = (h, t = 0.3) => mix(h, "#000000", t);
  var jas = (h, t = 0.3) => mix(h, "#ffffff", t);
  var u = (n) => `url(#${P}${n})`;
  var CIEN = "rgba(0,0,0,.22)";
  function defs(k, r) {
    return `<defs>
  <linearGradient id="${P}tyn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efebe5"/><stop offset="1" stop-color="#d9d2c7"/></linearGradient>
  <linearGradient id="${P}nb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb8e0"/><stop offset=".65" stop-color="#cfe9f8"/><stop offset="1" stop-color="#e8f5fc"/></linearGradient>
  <linearGradient id="${P}bl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".45" stop-color="#fff" stop-opacity=".35"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <linearGradient id="${P}met" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${jas(k, 0.35)}"/><stop offset=".45" stop-color="${k}"/><stop offset="1" stop-color="${ciem(k, 0.35)}"/></linearGradient>
  <linearGradient id="${P}metp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${ciem(k, 0.25)}"/><stop offset=".5" stop-color="${jas(k, 0.2)}"/><stop offset="1" stop-color="${ciem(k, 0.3)}"/></linearGradient>
  <linearGradient id="${P}alu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${jas(r, 0.4)}"/><stop offset=".5" stop-color="${ciem(r, 0.08)}"/><stop offset="1" stop-color="${ciem(r, 0.3)}"/></linearGradient>
  <linearGradient id="${P}alup" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${ciem(r, 0.28)}"/><stop offset=".5" stop-color="${jas(r, 0.2)}"/><stop offset="1" stop-color="${ciem(r, 0.3)}"/></linearGradient>
  <linearGradient id="${P}rm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${jas(r, 0.25)}"/><stop offset="1" stop-color="${ciem(r, 0.12)}"/></linearGradient>
  <linearGradient id="${P}tk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${ciem(k, 0.12)}"/><stop offset=".3" stop-color="${jas(k, 0.08)}"/><stop offset=".7" stop-color="${k}"/><stop offset="1" stop-color="${ciem(k, 0.15)}"/></linearGradient>
  <linearGradient id="${P}tkv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ciem(k, 0.2)}"/><stop offset="1" stop-color="${jas(k, 0.12)}"/></linearGradient>
  <linearGradient id="${P}ks" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9b2a6"/><stop offset="1" stop-color="#8f887c"/></linearGradient>
  <linearGradient id="${P}dh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a3553c"/><stop offset="1" stop-color="#6f3424"/></linearGradient>
  <pattern id="${P}lam" width="10" height="3.6" patternUnits="userSpaceOnUse"><rect width="10" height="3.6" fill="${k}"/><rect width="10" height="1.1" fill="${jas(k, 0.28)}"/><rect y="2.8" width="10" height=".8" fill="${ciem(k, 0.45)}"/></pattern>
  <pattern id="${P}sia" width="1.6" height="1.6" patternUnits="userSpaceOnUse"><path d="M0 0h1.6M0 0v1.6" stroke="${ciem(k, 0.15)}" stroke-width=".35" opacity=".75"/></pattern>
  <filter id="${P}fk" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .09 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
  <linearGradient id="${P}cr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>
  <pattern id="${P}lamg" width="10" height="5" patternUnits="userSpaceOnUse"><rect width="10" height="5" fill="${k}"/><rect width="10" height="1.6" fill="${jas(k, 0.32)}"/><rect y="3.8" width="10" height="1.2" fill="${ciem(k, 0.5)}"/></pattern>
  <filter id="${P}cn" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="1.4" stdDeviation="1.2" flood-opacity=".35"/></filter>
  </defs>`;
  }
  function okno(x, y, w, h) {
    const r = 4.5, gx = x + r, gy = y + r, gw = w - 2 * r, gh = h - 2 * r;
    return `<path d="M${x - 5} ${y - 5}h${w + 10}l-5 5H${x}v${h}l-5 5z" fill="#cfc6b8"/><path d="M${x + w + 5} ${y - 5}v${h + 10}l-5-5V${y}z" fill="#e2dbd0"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${u("rm")}" stroke="${CIEN}" stroke-width=".6"/>
    <rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="${u("nb")}"/>
    <path d="M${gx} ${gy + gh * 0.78}c${gw * 0.2} ${-gh * 0.14} ${gw * 0.32} ${-gh * 0.1} ${gw * 0.5} ${-gh * 0.02}s${gw * 0.35} ${-gh * 0.12} ${gw * 0.5} ${-gh * 0.06}V${gy + gh}H${gx}z" fill="#7da889"/>
    <path d="M${gx} ${gy + gh * 0.88}c${gw * 0.3} ${-gh * 0.08} ${gw * 0.6} ${-gh * 0.02} ${gw} ${-gh * 0.07}V${gy + gh}H${gx}z" fill="#5e8f6b"/>
    <rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" fill="${u("bl")}"/>
    ${w > 50 ? `<rect x="${x + w / 2 - 2}" y="${y}" width="4" height="${h}" fill="${u("rm")}" stroke="${CIEN}" stroke-width=".5"/>` : ""}
    <path d="M${x - 7} ${y + h}h${w + 14}l-2 4H${x - 5}z" fill="#f4f2ee" stroke="${CIEN}" stroke-width=".5"/><rect x="${x - 5}" y="${y + h + 4}" width="${w + 10}" height="1.6" fill="rgba(0,0,0,.18)"/>`;
  }
  var tlo = () => `<rect width="120" height="100" fill="${u("tyn")}"/><rect width="120" height="100" fill="#fff" filter="${u("fk")}"/>`;
  var cienR = (x, y, w, h = 8) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${u("cr")}"/>`;
  var svg = (s) => `<svg viewBox="0 0 120 100" aria-hidden="true" style="display:block;width:100%;height:auto;border-radius:6px">${s}</svg>`;
  var skrzynka = (x, y, w, h, sk = 4) => `<g filter="${u("cn")}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${u("met")}"/>
  <path d="M${x} ${y + h}h${w}l-${sk} ${sk}H${x + sk}z" fill="${u("metp")}" opacity=".9"/><path d="M${x + w} ${y}l${sk} ${sk * 0.6}v${h}l-${sk} ${sk * 0.4}z" fill="${u("metp")}"/></g>`;
  var prowadnice = (x, y, w, h, met = "metp") => `<rect x="${x - 3.5}" y="${y}" width="4.5" height="${h}" fill="${u(met)}" stroke="${CIEN}" stroke-width=".4"/><rect x="${x + w - 1}" y="${y}" width="4.5" height="${h}" fill="${u(met)}" stroke="${CIEN}" stroke-width=".4"/>`;
  var pancerz = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${u("lam")}"/><rect x="${x}" y="${y + h - 2.6}" width="${w}" height="2.6" fill="${u("met")}"/>
  <rect x="${x}" y="${y + h}" width="${w}" height="2" fill="rgba(0,0,0,.18)"/>`;
  var kaseta = () => `<rect x="31" y="13" width="58" height="8" rx="2" fill="${u("rm")}" filter="${u("cn")}"/>`;
  var WEW = {
    pelna: (k) => tlo() + okno(32, 18, 56, 66) + `<rect x="27" y="11" width="66" height="6" rx="3" fill="${u("alu")}" filter="${u("cn")}"/><rect x="29" y="16" width="62" height="40" fill="${u("tk")}"/>
    <rect x="28.5" y="55" width="63" height="3" rx="1.5" fill="${u("alu")}"/><path d="M86 17v34" stroke="#bbb" stroke-width=".6" stroke-dasharray=".8 .8"/>`,
    kasetowa: () => tlo() + okno(32, 18, 56, 66) + kaseta() + `<rect x="32.5" y="21" width="2.5" height="62" fill="${u("rm")}"/><rect x="85" y="21" width="2.5" height="62" fill="${u("rm")}"/><rect x="35" y="21" width="50" height="34" fill="${u("tk")}"/><rect x="35" y="55" width="50" height="2.6" fill="${u("rm")}"/>`,
    zebra: (k) => {
      const d = [];
      for (let y = 21; y < 57; y += 7) d.push(`<rect x="35" y="${y}" width="50" height="3.6" fill="${u("tk")}"/><rect x="35" y="${y + 3.6}" width="50" height="3.4" fill="#fff" opacity=".25"/><path d="M35 ${y + 3.6}h50" stroke="${ciem(k, 0.35)}" stroke-width=".4"/>`);
      return tlo() + okno(32, 18, 56, 66) + kaseta() + d.join("") + `<rect x="35" y="55" width="50" height="2.6" fill="${u("rm")}"/>`;
    },
    zaciemniajaca: (k) => tlo() + okno(32, 18, 56, 66) + kaseta() + `<rect x="31" y="21" width="4" height="63" fill="${u("rm")}"/><rect x="85" y="21" width="4" height="63" fill="${u("rm")}"/><rect x="35" y="21" width="50" height="46" fill="${ciem(k, 0.35)}"/><rect x="35" y="21" width="50" height="46" fill="${u("tk")}" opacity=".35"/><rect x="35" y="67" width="50" height="2.6" fill="${u("rm")}"/>`,
    plisa: (k) => {
      const d = [];
      for (let y = 25; y < 57; y += 2.6) d.push(`<rect x="36" y="${y}" width="48" height="1.3" fill="${jas(k, 0.18)}"/><rect x="36" y="${y + 1.3}" width="48" height="1.3" fill="${ciem(k, 0.18)}"/>`);
      return tlo() + okno(32, 18, 56, 66) + `<rect x="34" y="22" width="52" height="3" rx="1" fill="${u("alu")}"/>${d.join("")}<rect x="34" y="57" width="52" height="3" rx="1" fill="${u("alu")}"/><path d="M35 25v57M85 25v57" stroke="#555" stroke-width=".4"/><path d="M36 25${[...Array(12)].map((_, i) => `l${i % 2 ? 1.4 : -1.4} 2.6`).join("")}M84 25${[...Array(12)].map((_, i) => `l${i % 2 ? -1.4 : 1.4} 2.6`).join("")}" stroke="${ciem(k, 0.4)}" stroke-width=".5" fill="none"/>`;
    },
    plaster: (k) => {
      const d = [];
      for (let y = 25; y < 55; y += 4) for (let x = 36 + y / 4 % 2 * 2.5; x < 81; x += 5) d.push(`<path d="M${x} ${y + 2}l1.2-2h2.6l1.2 2-1.2 2h-2.6z" fill="${jas(k, 0.1)}" stroke="${ciem(k, 0.3)}" stroke-width=".4"/>`);
      return tlo() + okno(32, 18, 56, 66) + `<rect x="34" y="22" width="52" height="3" rx="1" fill="${u("alu")}"/><rect x="36" y="25" width="48" height="32" fill="${k}"/>${d.join("")}<rect x="34" y="57" width="52" height="3" rx="1" fill="${u("alu")}"/>`;
    },
    rzymska: (k) => tlo() + okno(32, 18, 56, 66) + `<rect x="28" y="12" width="64" height="4" rx="1" fill="${u("alu")}" filter="${u("cn")}"/><rect x="29" y="16" width="62" height="22" fill="${u("tk")}"/>
    ${[0, 1, 2].map((i) => `<path d="M29 ${38 + i * 6}q31 ${6 - i} 62 0v-6q-31 ${5 - i} -62 0z" fill="${ciem(k, 0.1 + i * 0.07)}"/><path d="M29 ${38 + i * 6}q31 ${6 - i} 62 0" stroke="${jas(k, 0.25)}" stroke-width=".6" fill="none"/>`).join("")}`,
    zaluzja: (k) => {
      const d = [];
      for (let y = 20; y < 63; y += 3) d.push(`<path d="M33 ${y}h54l-1 1.8H34z" fill="${jas(k, 0.2)}"/><path d="M34 ${y + 1.8}h52" stroke="${ciem(k, 0.35)}" stroke-width=".5"/>`);
      return tlo() + okno(32, 18, 56, 66) + `<rect x="32" y="15" width="56" height="5" rx="1" fill="${u("met")}" filter="${u("cn")}"/>${d.join("")}<path d="M46 20v44M74 20v44" stroke="#e8e8e8" stroke-width=".5"/><rect x="32" y="63" width="56" height="3" rx="1" fill="${u("met")}"/>`;
    },
    drewniana: (k) => {
      const dr = "#9a6a3f", d = [];
      for (let y = 20; y < 63; y += 4.4) d.push(`<path d="M32 ${y}h56l-1 3.4H33z" fill="${jas(dr, 0.12)}"/><path d="M33 ${y + 3.4}h54" stroke="#5b3a20" stroke-width=".6"/><path d="M36 ${y + 1.5}q20 -.8 44 0" stroke="#7d5330" stroke-width=".35" fill="none"/>`);
      return tlo() + okno(32, 18, 56, 66) + `<rect x="31" y="15" width="58" height="5" rx="1" fill="${ciem(dr, 0.1)}" filter="${u("cn")}"/>${d.join("")}<rect x="44" y="20" width="3.4" height="46" fill="${k}" opacity=".9"/><rect x="73" y="20" width="3.4" height="46" fill="${k}" opacity=".9"/>`;
    },
    pionowa: (k) => {
      const d = [];
      for (let x = 24; x < 96; x += 6) d.push(`<rect x="${x}" y="15" width="5.2" height="72" fill="${u("tk")}"/><rect x="${x}" y="15" width="1" height="72" fill="${ciem(k, 0.3)}" opacity=".6"/>`);
      return tlo() + okno(32, 18, 56, 66) + `<rect x="22" y="11" width="76" height="4" rx="1" fill="${u("alu")}" filter="${u("cn")}"/>${d.join("")}`;
    },
    zaslona: (k) => {
      const pan = (x0) => `<path d="M${x0} 12h22l3 76H${x0 - 2}z" fill="${u("tk")}"/>` + [0, 1, 2, 3].map((i) => `<path d="M${x0 + 3 + i * 5.5} 12l${i % 2 ? 1 : -1} 76" stroke="${ciem(k, 0.35)}" stroke-width="1.6" opacity=".45"/><path d="M${x0 + 5 + i * 5.5} 12l${i % 2 ? 1 : -1} 76" stroke="${jas(k, 0.3)}" stroke-width="1" opacity=".5"/>`).join("");
      return tlo() + okno(32, 18, 56, 66) + `<rect x="12" y="9" width="96" height="2.6" rx="1.3" fill="${u("alu")}"/><circle cx="12" cy="10.3" r="2.6" fill="#8a8f96"/><circle cx="108" cy="10.3" r="2.6" fill="#8a8f96"/>${pan(14)}${pan(84)}`;
    },
    firana: (k) => tlo() + okno(32, 18, 56, 66) + `<rect x="18" y="10" width="84" height="3.4" rx="1" fill="${u("alu")}" filter="${u("cn")}"/><rect x="20" y="13" width="80" height="76" fill="${k}" opacity=".55"/>` + [...Array(16)].map((_, i) => `<path d="M${21 + i * 5} 13q${i % 2 ? 1.5 : -1.5} 38 0 76" stroke="${jas(k, 0.3)}" stroke-width="2.2" opacity=".8" fill="none"/><path d="M${23.5 + i * 5} 13q${i % 2 ? 1.5 : -1.5} 38 0 76" stroke="#c9c3b8" stroke-width=".6" opacity=".7" fill="none"/>`).join("") + [...Array(14)].map((_, i) => `<circle cx="${21 + i * 6}" cy="13" r=".9" fill="#7d8389"/>`).join(""),
    panel: (k) => tlo() + okno(32, 18, 56, 66) + `<rect x="14" y="9" width="92" height="4" rx="1" fill="${u("alu")}" filter="${u("cn")}"/>` + [[16, 0], [36, 0.06], [62, 0.12], [84, 0]].map(([x, t]) => `<g filter="${u("cn")}"><rect x="${x}" y="13" width="21" height="76" fill="${u("tkv")}"/><rect x="${x}" y="13" width="21" height="76" fill="#000" opacity="${t}"/><rect x="${x}" y="86" width="21" height="3" fill="${u("alu")}"/></g>`).join(""),
    roleta_zip_wew: () => tlo() + okno(32, 18, 56, 66) + `<rect x="30" y="13" width="60" height="7" rx="1.5" fill="${u("rm")}" filter="${u("cn")}"/><rect x="30" y="20" width="4" height="64" fill="${u("rm")}"/><rect x="86" y="20" width="4" height="64" fill="${u("rm")}"/>
    <rect x="34" y="20" width="52" height="40" fill="${u("tk")}"/><rect x="34" y="60" width="52" height="3" fill="${u("rm")}"/><path d="M34 20v40M86 20v40" stroke="#333" stroke-width=".9" stroke-dasharray=".7 .7"/>`,
    plisa_gora_dol: (k) => {
      const d = [];
      for (let y = 38; y < 62; y += 2.6) d.push(`<rect x="36" y="${y}" width="48" height="1.3" fill="${jas(k, 0.18)}"/><rect x="36" y="${y + 1.3}" width="48" height="1.3" fill="${ciem(k, 0.18)}"/>`);
      return tlo() + okno(32, 18, 56, 66) + `<rect x="34" y="35" width="52" height="3" rx="1" fill="${u("alu")}"/>${d.join("")}<rect x="34" y="62" width="52" height="3" rx="1" fill="${u("alu")}"/><path d="M35 22v60M85 22v60" stroke="#555" stroke-width=".4"/><path d="M52 24v-4l-2 2M52 20l2 2M68 76v4l-2-2M68 80l2-2" stroke="#ff9800" stroke-width=".9" fill="none"/>`;
    },
    bambusowa: (k) => {
      const b = k, d = [];
      for (let y = 20; y < 56; y += 1.6) d.push(`<rect x="34" y="${y}" width="52" height="1.2" fill="${y * 10 % 3 > 1.5 ? jas(b, 0.12) : b}"/>`);
      return tlo() + okno(32, 18, 56, 66) + `<rect x="31" y="14" width="58" height="5" rx="1" fill="${ciem(b, 0.3)}" filter="${u("cn")}"/>${d.join("")}<path d="M46 19v38M74 19v38" stroke="#6b4a24" stroke-width=".8"/><rect x="33" y="55" width="54" height="3" rx="1.5" fill="${ciem(b, 0.25)}"/>`;
    },
    zaslona_wave: (k) => tlo() + okno(32, 18, 56, 66) + `<rect x="10" y="9" width="100" height="3" rx="1" fill="${u("alu")}" filter="${u("cn")}"/>` + [8, 82].map((x0) => `<path d="M${x0} 12${[...Array(5)].map(() => "q3 4 6 0").join("")}V89${[...Array(5)].map(() => "q-3 -2 -6 0").join("").replace(/^/, "")}H${x0}z" fill="${u("tk")}"/>` + [...Array(5)].map((_, i) => `<path d="M${x0 + 3 + i * 6} 14v75" stroke="${ciem(k, 0.3)}" stroke-width="2" opacity=".5"/><path d="M${x0 + 1 + i * 6} 13v76" stroke="${jas(k, 0.3)}" stroke-width="1" opacity=".5"/>`).join("")).join(""),
    ekran: (k, r) => `<rect width="120" height="100" fill="${u("tyn")}"/><rect y="86" width="120" height="14" fill="#a68b6b"/><path d="M0 86h120" stroke="rgba(0,0,0,.2)"/>
    <g filter="${u("cn")}"><rect x="14" y="8" width="92" height="7" rx="3.5" fill="${u("met")}"/></g><rect x="18" y="15" width="84" height="54" fill="${ciem(r, 0.7)}"/><rect x="21" y="18" width="78" height="44" fill="#fbfbfa"/>
    <path d="M21 18h78v44z" fill="#000" opacity=".04"/><rect x="18" y="69" width="84" height="2.4" fill="${u("met")}"/><path d="M32 52l14-14 10 9 8-6 16 11z" fill="#cfe1ee" opacity=".7"/>`
  };
  var ZEW = {
    natynkowa: () => tlo() + okno(32, 26, 56, 60) + cienR(26, 26, 68) + skrzynka(26, 8, 68, 16, 4) + prowadnice(32, 26, 56, 60) + pancerz(32.5, 26, 55, 36),
    natynkowa_okragla: () => tlo() + okno(32, 26, 56, 60) + cienR(26, 26, 68) + `<g filter="${u("cn")}"><path d="M26 8h58a10 10 0 0 1 10 10v6H26z" fill="${u("met")}"/><path d="M94 8.6l3 1.6v14l-3-.2z" fill="${u("metp")}"/></g>` + prowadnice(32, 26, 56, 60) + pancerz(32.5, 26, 55, 36),
    ekstrudowana: () => tlo() + okno(32, 26, 56, 60) + cienR(25, 27, 70) + skrzynka(25, 6, 70, 20, 4) + prowadnice(32, 26, 56, 60) + `<rect x="32.5" y="26" width="55" height="44" fill="${u("lamg")}"/><rect x="32.5" y="67" width="55" height="3.4" fill="${u("met")}"/><rect x="32.5" y="70.4" width="55" height="2" fill="rgba(0,0,0,.2)"/>
    <rect x="55" y="62" width="10" height="2" rx="1" fill="#1a1a1a"/>`,
    roleta_drzwi: () => tlo() + `<path d="M17 21h86l-5 5H22v62l-5 0z" fill="#cfc6b8"/><rect x="22" y="26" width="76" height="62" fill="${u("rm")}"/><rect x="25" y="29" width="34" height="59" fill="${u("nb")}"/><rect x="61" y="29" width="34" height="59" fill="${u("nb")}"/><rect x="25" y="29" width="70" height="59" fill="${u("bl")}"/>
    <path d="M25 76q20-6 70-2V88H25z" fill="#7da889"/>` + cienR(16, 22, 88) + skrzynka(16, 6, 88, 16, 4) + prowadnice(22, 22, 76, 66) + pancerz(22.5, 22, 75, 34) + `<rect y="88" width="120" height="12" fill="${u("ks")}"/>`,
    podtynkowa: () => tlo() + `<rect x="27" y="12" width="66" height="13" fill="#d6cec2"/><path d="M27 25h66" stroke="rgba(0,0,0,.25)"/><path d="M27 12h66" stroke="rgba(0,0,0,.12)" stroke-dasharray="2 1.5"/>` + okno(32, 26, 56, 60) + `<rect x="31" y="23" width="58" height="3" fill="${u("met")}"/>` + prowadnice(32, 24, 56, 62) + pancerz(32.5, 24, 55, 38),
    zewnetrzna: () => tlo() + okno(32, 26, 56, 60) + `<rect x="32" y="12" width="56" height="14" fill="${u("rm")}" filter="${u("cn")}"/><rect x="33" y="24" width="54" height="2" fill="rgba(0,0,0,.15)"/>` + prowadnice(32, 26, 56, 60, "rm") + pancerz(32.5, 26, 55, 34),
    adaptacyjna: () => tlo() + okno(32, 14, 56, 72) + `<g filter="${u("cn")}"><rect x="32" y="14" width="56" height="12" fill="${u("met")}"/><path d="M32 26h56l-3 3H35z" fill="${u("metp")}"/></g><rect x="34" y="28" width="3.6" height="58" fill="${u("metp")}"/><rect x="82.4" y="28" width="3.6" height="58" fill="${u("metp")}"/>` + pancerz(37.6, 28, 44.8, 30),
    perforowana: () => {
      const d = [];
      for (let y = 27.5; y < 70; y += 3.6) for (let x = 34; x < 87; x += 2.6) d.push(`<rect x="${x}" y="${y}" width=".9" height=".9" fill="#cfe9f8" opacity=".85"/>`);
      return tlo() + okno(32, 26, 56, 60) + skrzynka(26, 8, 68, 16, 4) + prowadnice(32, 26, 56, 60) + pancerz(32.5, 26, 55, 46) + d.join("");
    },
    roleta_moskitiera: () => tlo() + okno(32, 26, 56, 60) + skrzynka(26, 8, 68, 16, 4) + prowadnice(32, 26, 56, 60) + pancerz(32.5, 26, 55, 20) + `<rect x="32.5" y="48" width="55" height="22" fill="${u("sia")}"/><rect x="32.5" y="48" width="55" height="22" fill="#1d2329" opacity=".18"/><rect x="32.5" y="70" width="55" height="2.4" fill="${u("alu")}"/>`,
    fasadowa: (k) => {
      const d = [];
      for (let y = 25; y < 66; y += 4.2) d.push(`<path d="M31 ${y + 2.6}q29 -3.4 58 0v-1q-29 -3.6 -58 0z" fill="${jas(k, 0.25)}"/><path d="M31 ${y + 2.6}q29 -3.4 58 0v1.2q-29 -3.2 -58 0z" fill="${ciem(k, 0.2)}"/>`);
      return tlo() + okno(32, 26, 56, 60) + `<rect x="27" y="15" width="66" height="9" fill="${u("alu")}" filter="${u("cn")}"/>${d.join("")}<rect x="27" y="22" width="3.4" height="64" fill="${u("alup")}"/><rect x="90" y="22" width="3.4" height="64" fill="${u("alup")}"/>
      <path d="M45 24v44M75 24v44" stroke="#222" stroke-width=".45"/><rect x="30" y="68" width="60" height="3.2" fill="${u("met")}"/>`;
    },
    fasadowa_f80: (k) => {
      const d = [];
      for (let y = 25; y < 66; y += 4.2) d.push(`<rect x="31" y="${y}" width="58" height="3" fill="${u("met")}"/><path d="M31 ${y + 3}h58" stroke="${ciem(k, 0.5)}" stroke-width=".5"/>`);
      return tlo() + okno(32, 26, 56, 60) + cienR(27, 24, 66) + `<rect x="27" y="15" width="66" height="9" fill="${u("alu")}" filter="${u("cn")}"/>${d.join("")}<rect x="27" y="22" width="3.4" height="64" fill="${u("alup")}"/><rect x="90" y="22" width="3.4" height="64" fill="${u("alup")}"/><rect x="30" y="68" width="60" height="3.2" fill="${u("met")}"/>`;
    },
    fasadowaz: (k) => {
      const d = [];
      for (let y = 25; y < 66; y += 4.2) d.push(`<path d="M31 ${y}h58v1.8l-2 1.6H31z" fill="${jas(k, 0.2)}"/><path d="M31 ${y + 3.4}h56l2-1.6" stroke="${ciem(k, 0.45)}" stroke-width=".6" fill="none"/>`);
      return tlo() + okno(32, 26, 56, 60) + `<rect x="27" y="15" width="66" height="9" fill="${u("alu")}" filter="${u("cn")}"/>${d.join("")}<rect x="27" y="22" width="3.4" height="64" fill="${u("alup")}"/><rect x="90" y="22" width="3.4" height="64" fill="${u("alup")}"/><rect x="30" y="68" width="60" height="3.2" fill="${u("met")}"/>`;
    },
    screen: () => tlo() + okno(32, 26, 56, 60) + `<g filter="${u("cn")}"><rect x="27" y="12" width="66" height="13" rx="3" fill="${u("met")}"/></g>
    <rect x="32" y="25" width="56" height="44" fill="${u("tkv")}" opacity=".88"/><rect x="32" y="25" width="56" height="44" fill="${u("sia")}" opacity=".5"/>
    <rect x="27" y="25" width="5" height="61" fill="${u("metp")}"/><rect x="88" y="25" width="5" height="61" fill="${u("metp")}"/><rect x="31" y="69" width="58" height="3" fill="${u("met")}"/>
    <path d="M32 25v44M88 25v44" stroke="#111" stroke-width="1.2" stroke-dasharray=".7 .7"/>`,
    okiennice_przesuwne: (k) => {
      const dr = k, sk = (x) => `<rect x="${x}" y="22" width="27" height="64" fill="${dr}" stroke="${ciem(dr, 0.4)}" stroke-width="1"/>` + [...Array(13)].map((_, i) => `<path d="M${x + 2} ${25 + i * 4.6}h23l-1 2.4H${x + 3}z" fill="${jas(dr, 0.18)}"/>`).join("");
      return tlo() + okno(32, 22, 56, 64) + `<rect x="6" y="16" width="108" height="3" fill="${u("met")}"/><g filter="${u("cn")}">${sk(8)}${sk(62)}</g><path d="M8 19h106" stroke="#222" stroke-width=".5"/>`;
    },
    markizoleta: (k) => tlo() + okno(32, 26, 56, 60) + cienR(26, 26, 68) + `<g filter="${u("cn")}"><rect x="26" y="12" width="68" height="12" rx="3" fill="${u("met")}"/></g><rect x="27" y="24" width="4" height="34" fill="${u("metp")}"/><rect x="89" y="24" width="4" height="34" fill="${u("metp")}"/>
    <rect x="31" y="24" width="58" height="34" fill="${u("tkv")}" opacity=".9"/><path d="M31 58h58l12 18H19z" fill="${u("tkv")}"/>${pasyM(31, 89, 58, 76, 12, k)}<rect x="18" y="76" width="84" height="3" fill="${u("met")}"/><path d="M29 58l-10 18M91 58l10 18" stroke="${u("alup")}" stroke-width="2"/>`,
    okiennice: (k) => {
      const dr = k, sk = (x, w) => `<rect x="${x}" y="22" width="${w}" height="64" fill="${dr}" stroke="${ciem(dr, 0.4)}" stroke-width="1.2"/>` + [...Array(13)].map((_, i) => `<path d="M${x + 2} ${25 + i * 4.6}h${w - 4}l-1 2.4H${x + 3}z" fill="${jas(dr, 0.2)}"/><path d="M${x + 2} ${27.4 + i * 4.6}h${w - 4}" stroke="${ciem(dr, 0.45)}" stroke-width=".5"/>`).join("") + `<rect x="${x}" y="52" width="${w}" height="3" fill="${ciem(dr, 0.2)}"/>`;
      return tlo() + okno(32, 22, 56, 64) + `<g filter="${u("cn")}">${sk(14, 18)}${sk(88, 18)}</g><circle cx="33" cy="30" r="1" fill="#222"/><circle cx="33" cy="78" r="1" fill="#222"/><circle cx="87" cy="30" r="1" fill="#222"/><circle cx="87" cy="78" r="1" fill="#222"/>
      <path d="M32 52h8M80 52h8" stroke="#666" stroke-width="1.6"/>`;
    }
  };
  var dach = (s) => `<rect width="120" height="100" fill="${u("dh")}"/>${[...Array(12)].map((_, i) => `<path d="M0 ${4 + i * 8.4}h120" stroke="#5c2a1d" stroke-width="1.6"/><path d="M0 ${5.4 + i * 8.4}h120" stroke="#b9694c" stroke-width=".6"/>`).join("")}
  <path d="M28 12h64l7 80H21z" fill="#3b3f45"/><path d="M31 15h58l6 74H25z" fill="${u("rm")}"/><path d="M35 19h50l5 66H30z" fill="${u("nb")}"/><path d="M35 19h50l5 66H30z" fill="${u("bl")}"/>${s}`;
  var oknoD = (fr, drewno) => {
    const g = `<linearGradient id="${P}od" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${jas(fr, 0.22)}"/><stop offset=".55" stop-color="${fr}"/><stop offset="1" stop-color="${ciem(fr, 0.2)}"/></linearGradient>
    <filter id="${P}sl" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .9" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .13  0 0 0 0 .02  0 0 0 .55 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
    <pattern id="${P}spl" width="1.4" height="1.4" patternUnits="userSpaceOnUse"><path d="M0 .35h1.4M.35 0v1.4" stroke="#fff" stroke-width=".35" opacity=".18"/><path d="M0 1.05h1.4M1.05 0v1.4" stroke="#000" stroke-width=".35" opacity=".14"/></pattern>`;
    const sl = drewno ? `<rect x="22" y="6" width="76" height="90" fill="#fff" filter="${u("sl")}"/>` : "";
    return tlo() + `<defs>${g}</defs><path d="M10 0h100l-12 6H22z" fill="#d5ccbf"/><path d="M10 0l12 6v90l-12 4z" fill="#e4ddd2"/><path d="M110 0l-12 6v90l12 4z" fill="#cfc6b8"/><path d="M10 100l12-4h76l12 4z" fill="#c6bdaf"/>
    <g filter="${u("cn")}"><rect x="22" y="6" width="76" height="90" fill="${u("od")}"/>${sl}<rect x="22" y="6" width="76" height="90" fill="none" stroke="${ciem(fr, 0.35)}" stroke-width=".6"/>
    <rect x="28" y="12" width="64" height="78" fill="${ciem(fr, 0.1)}"/><rect x="29" y="13" width="62" height="76" fill="${u("od")}"/>${drewno ? `<rect x="29" y="13" width="62" height="76" fill="#fff" filter="${u("sl")}"/>` : ""}</g>
    <rect x="33" y="17" width="54" height="68" fill="${u("nb")}"/><path d="M33 64q14-7 30-4t24-2V85H33z" fill="#86ad8f"/><path d="M33 74q22-5 54-1V85H33z" fill="#5e8f6b"/><rect x="33" y="17" width="54" height="68" fill="${u("bl")}"/>
    <rect x="33" y="17" width="54" height="1.6" fill="rgba(0,0,0,.25)"/><rect x="48" y="9" width="24" height="2.6" rx="1.3" fill="#d4d8dc" stroke="${CIEN}" stroke-width=".4"/>`;
  };
  var prowD = (c = "#e6e7e8") => `<rect x="31" y="17" width="2.4" height="68" fill="${c}" stroke="${CIEN}" stroke-width=".3"/><rect x="86.6" y="17" width="2.4" height="68" fill="${c}" stroke="${CIEN}" stroke-width=".3"/>`;
  var belkaD = (y, c = "#e6e7e8") => `<rect x="31" y="${y}" width="58" height="3.2" rx=".8" fill="${c}" stroke="${CIEN}" stroke-width=".3"/><rect x="56" y="${y + 3.2}" width="8" height="1.6" rx=".8" fill="#9aa1a9"/>`;
  var SOSNA = "#d29b55";
  var BIALA = "#f3f3f1";
  var SZARA = "#7e858c";
  var ORZECH = "#734322";
  var DACH = {
    // zaciemniająca: granatowa tkanina na całej szybie, prowadnice, kaseta
    dach_dkl: (k, r) => oknoD(r, 0) + `<rect x="31" y="14" width="58" height="5" rx="1" fill="${r}" stroke="${CIEN}" stroke-width=".3"/>${prowD(r)}
    <rect x="33.4" y="19" width="53.2" height="52" fill="${k}"/><rect x="33.4" y="19" width="53.2" height="52" fill="url(#${P}spl)"/><path d="M33.4 19h53.2v52H33.4z" fill="${u("bl")}" opacity=".35"/>${belkaD(71, r)}`,
    // solarna zewnętrzna: kaseta z panelem fotowoltaicznym, metalowe lamele na zewnątrz, widoczna przez szybę
    dach_ssl: (k, r) => oknoD(r, 0) + `<g filter="${u("cn")}"><rect x="18" y="0" width="84" height="14" rx="1.5" fill="${u("met")}"/><rect x="24" y="2" width="72" height="8.4" fill="#0f1d36"/>
    ${[...Array(12)].map((_, i) => `<path d="M${24 + i * 6} 2v8.4" stroke="#3d5d8f" stroke-width=".45"/>`).join("")}<path d="M24 6.2h72" stroke="#3d5d8f" stroke-width=".45"/><path d="M24 2l20 8.4" stroke="#fff" stroke-width="1.2" opacity=".18"/></g>
    ${[...Array(12)].map((_, i) => `<rect x="33" y="${17 + i * 3.6}" width="54" height="3.6" fill="${u("met")}"/><path d="M33 ${20.6 + i * 3.6}h54" stroke="#1f2226" stroke-width=".5"/>`).join("")}<rect x="33" y="60" width="54" height="2.4" fill="#2a2d31"/>`,
    // rzymska: lniane fałdy z cieniem między nimi
    dach_fhb: (k, r) => {
      const len = k;
      return oknoD(r, 0) + `<rect x="31" y="14" width="58" height="4" rx="1" fill="${r}"/><rect x="32" y="18" width="56" height="14" fill="${len}"/><rect x="32" y="18" width="56" height="14" fill="url(#${P}spl)"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M32 ${32 + i * 6}q28 ${6 - i} 56 0v-6.4q-28 ${5 - i} -56 0z" fill="${ciem(len, 0.05 + i * 0.06)}"/><path d="M32 ${32 + i * 6}q28 ${6 - i} 56 0v-6.4q-28 ${5 - i} -56 0z" fill="url(#${P}spl)"/>
      <path d="M32 ${32 + i * 6}q28 ${6 - i} 56 0" stroke="${jas(len, 0.35)}" stroke-width=".8" fill="none"/><path d="M32 ${33.2 + i * 6}q28 ${5 - i} 56 0" stroke="rgba(0,0,0,.25)" stroke-width=".8" fill="none"/>`).join("")}`;
    },
    // markiza solarna: siatka na zewnątrz, odsunięta od szyby na ramionach, panel w kasecie
    dach_msl: (k, r) => oknoD(r, 0) + `<path d="M33 17h54v40H33z" fill="#000" opacity=".22"/><g filter="${u("cn")}"><rect x="16" y="0" width="88" height="8" rx="2" fill="#2a2d31"/><rect x="20" y="1.6" width="26" height="4.4" fill="#0f1d36"/>${[...Array(5)].map((_, i) => `<path d="M${20 + i * 5.2} 1.6v4.4" stroke="#3d5d8f" stroke-width=".4"/>`).join("")}
    <path d="M20 8h80l10 40H10z" fill="${k}" opacity=".86"/><path d="M20 8h80l10 40H10z" fill="${u("sia")}"/><rect x="9" y="48" width="102" height="3" rx="1" fill="#2a2d31"/></g><path d="M18 8L9 48M102 8l9 40" stroke="#3a3e43" stroke-width="2.4"/>`,
    // żaluzja: białe lamele 3D z drabinkami
    dach_pal: (k, r) => oknoD(r, 0) + `<rect x="31" y="14" width="58" height="4" rx="1" fill="${u("alu")}"/>${prowD(r)}${[...Array(19)].map((_, i) => `<path d="M33.4 ${18.6 + i * 3.4}h53.2l-1 2.2H34.4z" fill="${k}"/><path d="M34.4 ${20.8 + i * 3.4}h51.2" stroke="#a9adb2" stroke-width=".55"/><path d="M33.4 ${18.6 + i * 3.4}h53.2" stroke="#fff" stroke-width=".4"/>`).join("")}
    <path d="M46 18v66M74 18v66" stroke="#d9d9d9" stroke-width=".5"/>${belkaD(82, r)}`,
    // plisowana: kremowa plisa w środku szyby, wyraźny zygzak i linki
    dach_fhl: (k, r) => {
      const c = k;
      return oknoD(r, 0) + prowD(r) + belkaD(36, r) + [...Array(11)].map((_, i) => `<path d="M33.4 ${39.2 + i * 2.8}h53.2v1.4H33.4z" fill="${c}"/><path d="M33.4 ${40.6 + i * 2.8}h53.2v1.4H33.4z" fill="${ciem(c, 0.14)}"/>`).join("") + `<path d="M34.6 39.2${[...Array(11)].map((_, i) => `l${i % 2 ? 1.2 : -1.2} 2.8`).join("")}M85.4 39.2${[...Array(11)].map((_, i) => `l${i % 2 ? -1.2 : 1.2} 2.8`).join("")}" stroke="${ciem(c, 0.35)}" stroke-width=".5" fill="none"/>
    <path d="M44 39v31M76 39v31" stroke="#9b968c" stroke-width=".3"/>${belkaD(70, r)}`;
    },
    // dzień/noc w kasecie: pasy pełne i przezroczyste w dwóch warstwach
    dach_dn: (k, r) => {
      const c = k;
      return oknoD(r, 0) + `<rect x="31" y="13" width="58" height="6.4" rx="1.6" fill="${u("alu")}" filter="${u("cn")}"/>${prowD(r)}` + [...Array(7)].map((_, i) => `<rect x="33.4" y="${19.4 + i * 7.6}" width="53.2" height="4.2" fill="${c}"/><rect x="33.4" y="${19.4 + i * 7.6}" width="53.2" height="4.2" fill="url(#${P}spl)"/><rect x="33.4" y="${23.6 + i * 7.6}" width="53.2" height="3.4" fill="#fff" opacity=".35"/>`).join("") + belkaD(72, r);
    },
    dachowa: () => dach(`<g filter="${u("cn")}"><path d="M29 7h62l2 9H27z" fill="${u("met")}"/></g><path d="M33 16h54l3.8 46H29.2z" fill="${u("lam")}"/><path d="M29.2 62h61.6l.4 3H28.8z" fill="${u("met")}"/>
    <path d="M33 16l-3.8 46M87 16l3.8 46" stroke="#2a2d31" stroke-width="2.2"/>`),
    markizeta_dach: () => dach(`<path d="M30 13h60v4H30z" fill="${u("alu")}"/><path d="M33 17h54l4 50H29z" fill="${u("tkv")}" opacity=".85"/><path d="M33 17h54l4 50H29z" fill="${u("sia")}" opacity=".6"/><path d="M28.6 67h62.8v2.6H28.6z" fill="${u("alu")}"/>`),
    dachowa_plisa: (k) => `<rect width="120" height="100" fill="#f1ece4"/><path d="M0 0h120v20L0 34z" fill="#e3dccf"/><path d="M26 10h68l9 84H17z" fill="#d6cdbe"/><path d="M30 14h60l8 76H22z" fill="${u("rm")}" filter="${u("cn")}"/><path d="M34 18h52l7 68H27z" fill="${u("nb")}"/>
    ${[...Array(14)].map((_, i) => `<path d="M${33.6 - i * 0.26} ${30 + i * 2.6}h${52.8 + i * 0.52}l-.1 1.3H${33.5 - i * 0.26}z" fill="${jas(k, 0.2)}"/><path d="M${33.4 - i * 0.26} ${31.3 + i * 2.6}h${53.2 + i * 0.52}" stroke="${ciem(k, 0.25)}" stroke-width="1.2"/>`).join("")}
    <path d="M33 28h54v2H33z" fill="${u("alu")}"/><path d="M29.6 66.4h60.8v2.4H29.6z" fill="${u("alu")}"/><path d="M32 18l-4.6 68M88 18l4.6 68" stroke="#9aa1a9" stroke-width="1.6"/>`,
    dachowa_zaluzja: (k) => `<rect width="120" height="100" fill="#f1ece4"/><path d="M0 0h120v20L0 34z" fill="#e3dccf"/><path d="M26 10h68l9 84H17z" fill="#d6cdbe"/><path d="M30 14h60l8 76H22z" fill="${u("rm")}" filter="${u("cn")}"/><path d="M34 18h52l7 68H27z" fill="${u("nb")}"/>
    ${[...Array(19)].map((_, i) => `<path d="M${34 - i * 0.37} ${20 + i * 3.4}h${52 + i * 0.74}l-.6 1.8H${34.6 - i * 0.37}z" fill="${jas(k, 0.35)}"/><path d="M${34.6 - i * 0.37} ${21.8 + i * 3.4}h${50.8 + i * 0.74}" stroke="${ciem(k, 0.3)}" stroke-width=".4"/>`).join("")}
    <path d="M32 18l-4.6 68M88 18l4.6 68" stroke="#9aa1a9" stroke-width="1.6"/>`,
    dachowa_wew: () => `<rect width="120" height="100" fill="#f1ece4"/><path d="M0 0h120v20L0 34z" fill="#e3dccf"/><path d="M26 10h68l9 84H17z" fill="#d6cdbe"/><path d="M30 14h60l8 76H22z" fill="${u("rm")}" filter="${u("cn")}"/><path d="M34 18h52l7 68H27z" fill="${u("nb")}"/>
    <path d="M34 18h52l3.6 36H30.4z" fill="${u("tk")}"/><path d="M30 54h60v3H30z" fill="${u("alu")}"/><path d="M32 18l-4.6 68M88 18l4.6 68" stroke="#9aa1a9" stroke-width="1.6"/>`
  };
  var elewacja = (niebo = false) => `<rect width="120" height="100" fill="${niebo ? "#cfe8f6" : u("tyn")}"/>${niebo ? `<rect width="120" height="62" fill="${u("nb")}"/>` : ""}
  <path d="M0 80h120v20H0z" fill="${u("ks")}"/>${[...Array(9)].map((_, i) => `<path d="M${i * 15 - 6} 100l${8 + i} -20" stroke="#7d766b" stroke-width=".6"/>`).join("")}<path d="M0 86h120M0 93h120" stroke="#7d766b" stroke-width=".5"/>`;
  var drzwi = (x = 34, w = 52) => `<rect x="${x}" y="40" width="${w}" height="40" fill="${u("rm")}"/><rect x="${x + 2}" y="42" width="${w / 2 - 3}" height="38" fill="${u("nb")}"/><rect x="${x + w / 2 + 1}" y="42" width="${w / 2 - 3}" height="38" fill="${u("nb")}"/><rect x="${x + 2}" y="42" width="${w - 4}" height="38" fill="${u("bl")}"/>`;
  var pasyM = (x1, x2, y1, y2, d, k) => [...Array(10)].map((_, i) => `<path d="M${x1 + i * (x2 - x1) / 10} ${y1}L${x1 - d + i * (x2 - x1 + 2 * d) / 10} ${y2}" stroke="${ciem(k, 0.2)}" stroke-width=".5"/>`).join("");
  var balustrada = () => `<rect x="0" y="62" width="120" height="3" fill="#8a8f96"/>${[...Array(14)].map((_, i) => `<path d="M${4 + i * 8.5} 65v15" stroke="#8a8f96" stroke-width="1.4"/>`).join("")}`;
  var TARAS = {
    markiza: (k) => elewacja() + drzwi() + cienR(4, 58, 112, 12) + `<g filter="${u("cn")}"><rect x="12" y="16" width="96" height="7" rx="3.5" fill="${u("alu")}"/></g><path d="M14 23h92l10 28H4z" fill="${u("tkv")}"/>${pasyM(14, 106, 23, 51, 10, k)}
    <path d="M4 51h112v4H4z" fill="${ciem(k, 0.15)}"/>${[...Array(19)].map((_, i) => `<path d="M${4 + i * 6} 55q3 3 6 0" fill="${ciem(k, 0.15)}"/>`).join("")}
    <path d="M26 23l14 20 10 -16M94 23l-14 20-10 -16" stroke="#e1e4e8" stroke-width="1.8" fill="none" opacity=".85"/><path d="M4 82h112" stroke="rgba(0,0,0,.12)" stroke-width="8"/>`,
    markiza_otwarta: (k) => elewacja() + drzwi() + cienR(4, 56, 112, 12) + `<g filter="${u("cn")}"><rect x="12" y="14" width="96" height="3" fill="${u("alu")}"/><rect x="14" y="17" width="92" height="6" rx="3" fill="${u("tk")}"/><rect x="14" y="17" width="92" height="2" rx="1" fill="#fff" opacity=".25"/></g>
    <path d="M14 23h92l10 28H4z" fill="${u("tkv")}"/>${pasyM(14, 106, 23, 51, 10, k)}<rect x="4" y="51" width="112" height="3" rx="1" fill="${u("alu")}"/><path d="M26 23l14 20 10 -16M94 23l-14 20-10 -16" stroke="#e1e4e8" stroke-width="1.8" fill="none" opacity=".85"/>`,
    markiza_polkasetowa: (k) => elewacja() + drzwi() + cienR(4, 56, 112, 12) + `<g filter="${u("cn")}"><path d="M10 12h100v6l-4 6H14l-4-6z" fill="${u("alu")}"/></g><rect x="14" y="20" width="92" height="5" rx="2.5" fill="${u("tk")}"/>
    <path d="M14 24h92l10 27H4z" fill="${u("tkv")}"/>${pasyM(14, 106, 24, 51, 10, k)}<rect x="4" y="51" width="112" height="3.4" rx="1" fill="${u("alu")}"/>`,
    markiza_volant: (k) => elewacja() + drzwi() + `<g filter="${u("cn")}"><path d="M10 12h100v9l-5 4H15l-5-4z" fill="${u("alu")}"/></g><path d="M15 25h90l10 22H5z" fill="${u("tkv")}"/>${pasyM(15, 105, 25, 47, 10, k)}
    <rect x="4" y="47" width="112" height="4" rx="1.2" fill="${u("alu")}"/><rect x="6" y="51" width="108" height="16" fill="${u("tk")}" opacity=".92"/><rect x="6" y="51" width="108" height="16" fill="${u("sia")}" opacity=".3"/><rect x="6" y="67" width="108" height="2" fill="${u("alu")}"/>`,
    markiza_wolnostojaca: (k) => `<rect width="120" height="100" fill="${u("nb")}"/><path d="M0 58q30-8 60-4t60-2V100H0z" fill="#7da889"/><path d="M0 74q40-6 120-2V100H0z" fill="#5e8f6b"/>
    <g filter="${u("cn")}"><rect x="56" y="14" width="8" height="8" rx="2" fill="${u("alu")}"/><path d="M60 22L14 40h92z" fill="${u("tkv")}"/></g>${pasyM(58, 62, 22, 40, 46, k)}<rect x="12" y="40" width="96" height="3" rx="1" fill="${u("alu")}"/>
    <rect x="22" y="40" width="3" height="44" fill="${u("alup")}"/><rect x="95" y="40" width="3" height="44" fill="${u("alup")}"/><rect x="58.5" y="22" width="3" height="62" fill="${u("alup")}"/><path d="M16 85h88" stroke="rgba(0,0,0,.2)" stroke-width="3"/>`,
    markiza_koszowa: (k) => elewacja() + `<rect x="36" y="38" width="48" height="42" fill="${u("rm")}"/><rect x="38" y="40" width="44" height="40" fill="${u("nb")}"/><rect x="38" y="40" width="44" height="40" fill="${u("bl")}"/>` + cienR(28, 52, 64, 10) + `<g filter="${u("cn")}"><path d="M28 50V34a32 22 0 0 1 64 0v16z" fill="${u("tkv")}"/></g>${[0, 1, 2, 3, 4].map((i) => `<path d="M60 12q${-32 + i * 16} 6 ${-32 + i * 16} 38" stroke="${ciem(k, 0.3)}" stroke-width=".8" fill="none"/>`).join("")}
    <path d="M28 50h64" stroke="${ciem(k, 0.3)}" stroke-width="1.6"/>${[...Array(11)].map((_, i) => `<path d="M${28 + i * 5.8} 50q2.9 3 5.8 0" fill="${ciem(k, 0.15)}"/>`).join("")}`,
    markiza_zimowa: (k) => elewacja(true) + `<path d="M0 30h22v52H0z" fill="${u("tyn")}"/><path d="M22 30l90 18v34H22z" fill="#d6ecf7" opacity=".55"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${22 + i * 22.5} ${30 + i * 4.5}v${52 - i * 4.5}" stroke="#eef0f2" stroke-width="1.6"/>`).join("")}
    <g filter="${u("cn")}"><path d="M22 26l90 18v4L22 30z" fill="${u("alu")}"/><path d="M24 28.4l86 17.2-8 -1.6-78 -15.6z" fill="${u("tk")}"/><path d="M22 30.4l84 16.8 0 2.4-84-16.8z" fill="${u("tk")}"/></g><path d="M112 44v40" stroke="${u("alup")}" stroke-width="3"/>`,
    markiza_kasetowa: (k) => elewacja() + drzwi() + `<g filter="${u("cn")}"><path d="M10 13h100v9l-5 4H15l-5-4z" fill="${u("alu")}"/></g><path d="M15 26h90l10 26H5z" fill="${u("tkv")}"/>${pasyM(15, 105, 26, 52, 10, k)}
    <rect x="4" y="52" width="112" height="4.4" rx="1.2" fill="${u("alu")}"/><path d="M4 82h112" stroke="rgba(0,0,0,.12)" stroke-width="8"/>`,
    markizeta: (k) => elewacja() + `<rect x="36" y="36" width="48" height="40" fill="${u("rm")}"/><rect x="38" y="38" width="44" height="38" fill="${u("nb")}"/><rect x="38" y="38" width="44" height="38" fill="${u("bl")}"/>
    <g filter="${u("cn")}"><rect x="34" y="28" width="52" height="6" rx="2" fill="${u("alu")}"/></g><path d="M35 34h50l9 20H26z" fill="${u("tkv")}"/>${pasyM(35, 85, 34, 54, 9, k)}<rect x="25" y="54" width="70" height="3" fill="${u("alu")}"/>
    <path d="M37 64l-11-10M83 64l11-10" stroke="#9aa1a9" stroke-width="1.8"/><circle cx="37" cy="64" r="1.6" fill="#555"/><circle cx="83" cy="64" r="1.6" fill="#555"/>`,
    markiza_balkonowa: (k) => elewacja(true) + balustrada() + `<rect x="16.3" y="6" width="3.4" height="76" fill="${u("alup")}"/><rect x="100.3" y="6" width="3.4" height="76" fill="${u("alup")}"/><rect x="16" y="14" width="88" height="5" rx="2" fill="${u("alu")}"/><path d="M18 19h84l10 20H8z" fill="${u("tkv")}"/>${pasyM(18, 102, 19, 39, 10, k)}<rect x="8" y="39" width="104" height="3" fill="${ciem(k, 0.15)}"/>`,
    markiza_pionowa: () => elewacja(true) + balustrada() + `<g filter="${u("cn")}"><rect x="18" y="8" width="84" height="7" rx="3.5" fill="${u("alu")}"/></g><rect x="20" y="15" width="80" height="50" fill="${u("tk")}"/><rect x="19" y="65" width="82" height="3.4" rx="1.4" fill="${u("alu")}"/><path d="M23 68l-2 8M97 68l2 8" stroke="#555" stroke-width=".8"/>`,
    markiza_boczna: () => elewacja(true) + `<rect x="0" y="10" width="16" height="70" fill="${u("tyn")}"/><g filter="${u("cn")}"><rect x="14" y="22" width="7" height="56" rx="3.5" fill="${u("alu")}"/></g>
    <path d="M21 26h82v46H21z" fill="${u("tk")}"/><rect x="101" y="24" width="4.4" height="54" rx="1" fill="${u("alu")}"/><path d="M99 79h10" stroke="#333" stroke-width="2"/>`,
    pergola: (k) => elewacja(true) + `<g filter="${u("cn")}"><path d="M6 24h108v6H6z" fill="${u("alu")}"/></g>${[...Array(14)].map((_, i) => `<path d="M${9 + i * 7.6} 30l3.4 7" stroke="${jas(k, 0.3)}" stroke-width="2.4"/><path d="M${10.5 + i * 7.6} 30l3.4 7" stroke="${ciem(k, 0.3)}" stroke-width=".8"/>`).join("")}
    <path d="M8 30h104l-2 8H10z" fill="${ciem(k, 0.2)}" opacity=".45"/><rect x="9" y="30" width="6" height="52" fill="${u("alup")}"/><rect x="105" y="30" width="6" height="52" fill="${u("alup")}"/><rect x="15" y="38" width="90" height="42" fill="#e8f2f7" opacity=".25"/>
    <path d="M4 83h112" stroke="rgba(0,0,0,.15)" stroke-width="4"/>`,
    pergola_tkanina: (k) => elewacja(true) + `<g filter="${u("cn")}"><path d="M6 24h108v6H6z" fill="${u("alu")}"/></g>${[...Array(6)].map((_, i) => `<path d="M${10 + i * 17} 30q8.5 7 17 0" fill="${jas(k, i % 2 ? 0.1 : 0.25)}" stroke="${ciem(k, 0.25)}" stroke-width=".5"/>`).join("")}
    <rect x="9" y="30" width="6" height="52" fill="${u("alup")}"/><rect x="105" y="30" width="6" height="52" fill="${u("alup")}"/><rect x="15" y="40" width="90" height="40" fill="#e8f2f7" opacity=".2"/><path d="M4 83h112" stroke="rgba(0,0,0,.15)" stroke-width="4"/>`,
    zagiel: (k) => `<rect width="120" height="100" fill="${u("nb")}"/><path d="M0 66q40-6 120-2V100H0z" fill="#7da889"/><rect y="80" width="120" height="20" fill="${u("ks")}"/>
    <rect x="6" y="14" width="3" height="70" fill="${u("alup")}"/><rect x="110" y="24" width="3" height="60" fill="${u("alup")}"/><rect x="58" y="10" width="3" height="74" fill="${u("alup")}"/>
    <g filter="${u("cn")}"><path d="M8 18L60 12L111 28L60 40z" fill="${u("tkv")}"/><path d="M8 18q26 10 52 22q26-6 51-12" stroke="${ciem(k, 0.25)}" stroke-width=".7" fill="none"/></g><rect x="4" y="16" width="7" height="5" rx="2" fill="#333"/>`,
    parasol: (k) => `<rect width="120" height="100" fill="${u("nb")}"/><path d="M0 66q40-6 120-2V100H0z" fill="#7da889"/><rect y="82" width="120" height="18" fill="${u("ks")}"/>
    <g filter="${u("cn")}"><path d="M10 34Q60 0 110 34z" fill="${u("tkv")}"/>${[...Array(8)].map((_, i) => `<path d="M60 14L${10 + i * 14.3} 34" stroke="${ciem(k, 0.25)}" stroke-width=".8"/>`).join("")}${[...Array(8)].map((_, i) => `<path d="M${10 + i * 12.5} 34q3.1 3 6.2 0" fill="${ciem(k, 0.15)}"/>`).join("")}</g>
    <rect x="58.6" y="14" width="2.8" height="68" fill="${u("alup")}"/><path d="M44 86h32l-4-4H48z" fill="#555"/><rect x="56" y="58" width="8" height="6" rx="1" fill="#333"/>`,
    zadaszenie: () => elewacja() + drzwi() + `<path d="M6 20h108l-10 16H16z" fill="#d6ecf7" opacity=".85"/><path d="M6 20h108l-10 16H16z" fill="${u("tkv")}" opacity=".55"/>${[...Array(7)].map((_, i) => `<path d="M${8 + i * 17.3} 20l${5 - i * 1.6} 16" stroke="#c3c8ce" stroke-width="1.6"/>`).join("")}
    <rect x="15" y="36" width="90" height="2.6" fill="${u("alu")}"/><rect x="17" y="38" width="3.4" height="44" fill="${u("alup")}"/><rect x="100" y="38" width="3.4" height="44" fill="${u("alup")}"/>`,
    screen_taras: () => elewacja() + drzwi() + `<g filter="${u("cn")}"><rect x="6" y="20" width="108" height="7" rx="2" fill="${u("alu")}"/></g><rect x="6" y="27" width="5" height="55" fill="${u("alup")}"/><rect x="109" y="27" width="5" height="55" fill="${u("alup")}"/>
    <rect x="11" y="27" width="98" height="40" fill="${u("tkv")}" opacity=".85"/><rect x="11" y="27" width="98" height="40" fill="${u("sia")}" opacity=".45"/><rect x="11" y="67" width="98" height="3" fill="${u("alu")}"/>`
  };
  var OKNA = {
    okno_silownik: () => tlo() + `<path d="M27 13h66l-5 5H32v68l-5 5z" fill="#cfc6b8"/><rect x="32" y="18" width="56" height="68" fill="${u("rm")}"/><rect x="36" y="22" width="48" height="60" fill="#5c6670"/>
    <g filter="${u("cn")}"><path d="M35 21h50l6 52H29z" fill="${u("rm")}"/><path d="M39 25h42l5 44H34z" fill="${u("nb")}"/><path d="M39 25h42l5 44H34z" fill="${u("bl")}"/></g>
    <rect x="52" y="78" width="16" height="5" rx="1" fill="#9aa1a9"/><path d="M60 78v-8" stroke="#555" stroke-width="2" stroke-dasharray="1.2 .6"/><path d="M25 86h70l-2 4H27z" fill="#f4f2ee"/>`,
    okno_dachowe: () => `<rect width="120" height="100" fill="${u("dh")}"/>${[...Array(12)].map((_, i) => `<path d="M0 ${4 + i * 8.4}h120" stroke="#5c2a1d" stroke-width="1.6"/><path d="M0 ${5.4 + i * 8.4}h120" stroke="#b9694c" stroke-width=".6"/>`).join("")}
    <path d="M28 20h64l7 72H21z" fill="${u("rm")}"/><path d="M32 24h56l6 64H26z" fill="#25282c"/><g filter="${u("cn")}"><path d="M30 8h60l8 60H22z" fill="${u("rm")}"/><path d="M34 12h52l6.6 52H27.4z" fill="${u("nb")}"/><path d="M34 12h52l6.6 52H27.4z" fill="${u("bl")}"/></g>
    <path d="M60 68v14" stroke="#9aa1a9" stroke-width="2.4"/>`,
    okno_plaskie: () => `<rect width="120" height="100" fill="${u("nb")}"/><path d="M0 50h120v50H0z" fill="#8f949a"/>${[...Array(6)].map((_, i) => `<path d="M0 ${58 + i * 7}h120" stroke="#9ea3a8" stroke-width=".4"/>`).join("")}
    <path d="M26 62h68l-4 18H30z" fill="${u("rm")}" stroke="${CIEN}"/><g filter="${u("cn")}"><path d="M30 60l34 -18 32 14 -2 4z" fill="${u("rm")}"/><path d="M33 59l31 -15 28 12.4z" fill="${u("nb")}"/><path d="M33 59l31 -15 28 12.4z" fill="${u("bl")}"/></g><path d="M58 62l4 -14" stroke="#555" stroke-width="2"/>`,
    wylaz: () => dach(`<path d="M34 30h52l6 48H28z" fill="#2c2f33"/><g filter="${u("cn")}"><path d="M34 30h52l-6 -22H40z" fill="${u("rm")}"/><path d="M37 28h46l-5 -18H42z" fill="${u("rm")}"/></g><path d="M48 30l-4 -16" stroke="#9aa1a9" stroke-width="2"/><path d="M40 34h40M40 42h40M40 50h40M40 58h40M40 66h40" stroke="#777" stroke-width="1.4"/>`),
    swietlik: () => `<rect width="120" height="100" fill="${u("nb")}"/><path d="M0 52h120v48H0z" fill="#8f949a"/><path d="M0 52h120" stroke="#6d7277" stroke-width="1.4"/>${[...Array(6)].map((_, i) => `<path d="M0 ${60 + i * 7}h120" stroke="#9ea3a8" stroke-width=".4"/>`).join("")}
    <path d="M28 70h64l-6 12H34z" fill="${u("rm")}" stroke="${CIEN}"/><g filter="${u("cn")}"><path d="M34 70q26 -46 58 -18z" fill="#dcecf6" opacity=".9"/><path d="M34 70q26 -46 58 -18" stroke="#fff" stroke-width="2" fill="none"/></g>
    <path d="M44 72l18 -16" stroke="#555" stroke-width="2.2"/><path d="M40 47q12 -10 24 -6" stroke="#fff" stroke-width="1.6" opacity=".8" fill="none"/>`
  };
  var MOSK = {
    moskitiera_plisa_okno: () => tlo() + okno(32, 18, 56, 66) + `<rect x="31" y="18" width="3" height="66" fill="${u("rm")}"/><rect x="86" y="18" width="3" height="66" fill="${u("rm")}"/><rect x="31" y="16" width="58" height="3" fill="${u("rm")}"/>
    <rect x="34" y="19" width="34" height="64" fill="${u("sia")}"/>${[...Array(9)].map((_, i) => `<path d="M${68 + i % 2 * 1.6} ${19 + i * 7.1}l${i % 2 ? -1.6 : 1.6} 7.1" stroke="#9aa1a9" stroke-width="1.6"/>`).join("")}<rect x="66" y="19" width="2.6" height="64" fill="${u("rm")}"/>`,
    moskitiera_zip_drzwi: () => tlo() + `<rect x="30" y="4" width="60" height="8" rx="2" fill="${u("rm")}" filter="${u("cn")}"/><rect x="30" y="12" width="4" height="80" fill="${u("rm")}"/><rect x="86" y="12" width="4" height="80" fill="${u("rm")}"/>
    <rect x="34" y="12" width="52" height="80" fill="${u("nb")}"/><rect x="34" y="12" width="52" height="56" fill="${u("sia")}"/><rect x="34" y="12" width="52" height="56" fill="#1d2329" opacity=".12"/><rect x="34" y="68" width="52" height="2.6" fill="${u("rm")}"/><rect x="24" y="92" width="72" height="4" fill="#f4f2ee"/>
    <path d="M34 12v56M86 12v56" stroke="#333" stroke-width=".9" stroke-dasharray=".7 .7"/>`,
    moskitiera: () => tlo() + okno(32, 18, 56, 66) + `<g filter="${u("cn")}"><rect x="29" y="12" width="62" height="7" rx="2" fill="${u("rm")}"/></g><rect x="29" y="19" width="3" height="65" fill="${u("rm")}"/><rect x="88" y="19" width="3" height="65" fill="${u("rm")}"/>
    <rect x="32" y="19" width="56" height="44" fill="${u("sia")}"/><rect x="32" y="19" width="56" height="44" fill="#1d2329" opacity=".12"/><rect x="32" y="63" width="56" height="3" fill="${u("rm")}"/>`,
    moskitiera_drzwi: () => tlo() + `<rect x="33" y="8" width="54" height="80" fill="${u("rm")}" filter="${u("cn")}"/><rect x="37" y="12" width="46" height="76" fill="${u("nb")}"/><rect x="37" y="12" width="46" height="76" fill="${u("bl")}"/>
    <rect x="37" y="12" width="28" height="76" fill="${u("sia")}"/>${[...Array(10)].map((_, i) => `<path d="M${65 + i % 2 * 2} ${12 + i * 7.6}l${i % 2 ? -2 : 2} 7.6" stroke="#9aa1a9" stroke-width="1.8"/>`).join("")}<rect x="62" y="12" width="3" height="76" fill="${u("alup")}"/><rect x="28" y="88" width="64" height="4" fill="#f4f2ee"/>`
  };
  var plac = () => `<rect width="120" height="100" fill="${u("nb")}"/><path d="M0 70q30-8 60-3t60-4V80H0z" fill="#7da889"/><rect y="80" width="120" height="20" fill="${u("ks")}"/>`;
  var sztachety = (x, y, w, h) => `<rect x="${x}" y="${y + 4}" width="${w}" height="3" fill="${u("alu")}"/><rect x="${x}" y="${y + h - 7}" width="${w}" height="3" fill="${u("alu")}"/>` + [...Array(Math.floor(w / 4.5))].map((_, i) => `<rect x="${x + 1 + i * 4.5}" y="${y}" width="3" height="${h}" fill="${u("metp")}"/>`).join("");
  var garaz = (s) => `<rect width="120" height="100" fill="${u("tyn")}"/><rect y="88" width="120" height="12" fill="${u("ks")}"/><rect x="14" y="18" width="92" height="70" fill="${u("rm")}"/><path d="M14 18h92l-4 4H18v66l-4 0z" fill="#000" opacity=".15"/>${s}`;
  var slupek = (x) => `<rect x="${x}" y="36" width="10" height="46" fill="#b4ada1"/><rect x="${x - 1}" y="33" width="12" height="3.4" fill="#8f887c"/><rect x="${x + 7}" y="36" width="3" height="46" fill="rgba(0,0,0,.12)"/>`;
  var BRAMY = {
    przesuwna: (k) => plac() + slupek(0) + slupek(110) + `<g filter="${u("cn")}">${sztachety(10, 44, 78, 36)}</g><circle cx="20" cy="81" r="2.4" fill="#333"/><circle cx="78" cy="81" r="2.4" fill="#333"/>
    <path d="M90 62h16" stroke="${k}" stroke-dasharray="3 2" stroke-width="1.2"/><path d="M104 59l3 3-3 3" stroke="${k}" fill="none"/>`,
    skrzydlowa: () => plac() + slupek(2) + slupek(108) + `<g filter="${u("cn")}">${sztachety(13, 44, 46, 36)}${sztachety(61, 44, 46, 36)}</g>`,
    segmentowa: (k) => garaz([...Array(4)].map((_, i) => `<rect x="18" y="${22 + i * 16.5}" width="84" height="16" fill="${u("met")}"/><path d="M18 ${38 + i * 16.5}h84" stroke="${ciem(k, 0.5)}" stroke-width=".8"/>${[...Array(3)].map((_2, j) => `<path d="M20 ${26 + i * 16.5 + j * 4}h80" stroke="${jas(k, 0.2)}" stroke-width=".5"/>`).join("")}`).join("") + `<rect x="55" y="80" width="10" height="2" rx="1" fill="#333"/>`),
    uchylna: (k) => garaz(`<rect x="18" y="22" width="84" height="66" fill="${u("met")}"/>${[...Array(14)].map((_, i) => `<path d="M${22 + i * 6} 24v62" stroke="${ciem(k, 0.3)}" stroke-width=".9"/><path d="M${23 + i * 6} 24v62" stroke="${jas(k, 0.25)}" stroke-width=".4"/>`).join("")}<rect x="54" y="52" width="12" height="3" rx="1.5" fill="#333"/>`),
    furtka: () => plac() + `<rect x="0" y="44" width="38" height="38" fill="${u("ks")}" opacity=".0"/><rect x="30" y="34" width="10" height="48" fill="#b4ada1"/><rect x="80" y="34" width="10" height="48" fill="#b4ada1"/><g filter="${u("cn")}">${sztachety(41, 42, 38, 40)}</g>
    <rect x="72" y="60" width="5" height="3" rx="1" fill="#222"/><rect x="82.5" y="48" width="5" height="7" rx="1" fill="#333"/><circle cx="85" cy="51" r="1.2" fill="#4caf50"/>${sztachety(0, 46, 29, 36)}${sztachety(91, 46, 29, 36)}`,
    garaz_skrzydlowa: (k) => garaz(`<rect x="18" y="22" width="42" height="66" fill="${u("met")}"/><rect x="60" y="22" width="42" height="66" fill="${u("met")}"/><path d="M60 22v66" stroke="${ciem(k, 0.5)}" stroke-width="1"/>
    ${[...Array(7)].map((_, i) => `<path d="M${22 + i * 5.6} 24v62M${64 + i * 5.6} 24v62" stroke="${ciem(k, 0.3)}" stroke-width=".8"/>`).join("")}<rect x="55" y="52" width="2" height="8" rx="1" fill="#222"/><rect x="63" y="52" width="2" height="8" rx="1" fill="#222"/>`),
    garaz_boczna: (k) => garaz([...Array(10)].map((_, i) => `<rect x="${18 + i * 6}" y="22" width="5.6" height="66" fill="${u("metp")}"/>`).join("") + `<path d="M78 22v66" stroke="#222" stroke-width=".8"/><rect x="78" y="22" width="24" height="66" fill="#2d3035"/><rect x="18" y="20" width="84" height="2" fill="#555"/>
    <path d="M84 54h12M93 51l3 3-3 3" stroke="#ff9800" stroke-width="1" fill="none"/>`),
    szlaban: () => plac() + `<rect x="10" y="50" width="12" height="32" rx="1.5" fill="${u("met")}" filter="${u("cn")}"/><rect x="12" y="54" width="8" height="2" fill="#ffb300"/>
    <g filter="${u("cn")}"><rect x="20" y="54" width="94" height="4" rx="2" fill="${u("alu")}"/>${[...Array(8)].map((_, i) => `<rect x="${26 + i * 11}" y="54" width="5.5" height="4" fill="#e53935"/>`).join("")}</g><rect x="108" y="58" width="2" height="24" fill="#888"/>`,
    roletowa: () => garaz(`<g filter="${u("cn")}"><rect x="14" y="10" width="92" height="12" fill="${u("met")}"/></g><rect x="16" y="22" width="4" height="66" fill="${u("metp")}"/><rect x="100" y="22" width="4" height="66" fill="${u("metp")}"/>${pancerz(20, 22, 80, 64)}`)
  };
  var GRUPY_KAFLI = [
    ["wew", [["rolety", ["pelna", "kasetowa", "zebra", "zaciemniajaca", "roleta_zip_wew", "bambusowa"]], ["plisy", ["plisa", "plisa_gora_dol", "plaster", "rzymska"]], ["zaluzje", ["zaluzja", "drewniana"]], ["pionowe", ["pionowa", "panel", "zaslona", "zaslona_wave", "firana"]], ["ekrany", ["ekran"]]]],
    ["zew", [["zrolety", ["natynkowa", "natynkowa_okragla", "podtynkowa", "zewnetrzna", "adaptacyjna", "perforowana", "roleta_moskitiera", "ekstrudowana", "roleta_drzwi"]], ["fasadowe", ["fasadowa", "fasadowaz", "fasadowa_f80"]], ["zscreen", ["screen", "markizoleta"]], ["okiennice", ["okiennice", "okiennice_przesuwne"]]]],
    ["dach", [["dachowe", ["dach_dkl", "dach_ssl", "dachowa", "dach_fhb", "dach_msl", "markizeta_dach", "dach_pal", "dach_fhl", "dach_dn"]]]],
    ["taras", [["markizy", ["markiza_otwarta", "markiza", "markiza_polkasetowa", "markiza_kasetowa", "markiza_volant", "markiza_koszowa", "markiza_wolnostojaca", "markiza_zimowa", "markizeta", "markiza_balkonowa", "markiza_pionowa", "markiza_boczna"]], ["pergole", ["zagiel", "parasol", "pergola", "pergola_tkanina", "zadaszenie", "screen_taras"]]]],
    ["okna", [["okna", ["okno_silownik", "okno_dachowe", "okno_plaskie", "swietlik", "wylaz"]]]],
    ["moskitiery", [["moskitiery", ["moskitiera", "moskitiera_plisa_okno", "moskitiera_drzwi", "moskitiera_zip_drzwi"]]]],
    ["brama", [["bramy", ["przesuwna", "skrzydlowa", "furtka"]], ["garaze", ["segmentowa", "garaz_boczna", "uchylna", "roletowa", "garaz_skrzydlowa"]], ["szlabany", ["szlaban"]]]]
  ];
  function kafel(typ, kolor = "#3b3f45", rama = "#f4f4f2") {
    const f = WEW[typ] || ZEW[typ] || OKNA[typ] || MOSK[typ] || TARAS[typ] || DACH[typ] || BRAMY[typ];
    if (!f) return "";
    P = "k" + ++nr + "_";
    return svg(defs(kolor, rama) + f(kolor, rama));
  }
  function poczatek(kolor = "#3b3f45", rama = "#f4f4f2") {
    P = "k" + ++nr + "_";
    return defs(kolor, rama);
  }
  var R = {
    ciem,
    jas,
    u,
    CIEN,
    okno,
    tlo,
    cienR,
    svg,
    skrzynka,
    prowadnice,
    pancerz,
    kaseta,
    dach,
    oknoD,
    prowD,
    belkaD,
    SOSNA,
    BIALA,
    SZARA,
    ORZECH,
    elewacja,
    drzwi,
    pasyM,
    balustrada,
    plac,
    sztachety,
    garaz,
    slupek
  };

  // src/stale.js
  var WERSJA = "2.2.22";
  var GRUPY = Object.fromEntries(GRUPY_KAFLI.map(([g, pod]) => [g, Object.fromEntries(pod)]));
  var OSLONY = Object.values(GRUPY).flatMap((g) => Object.values(g).flat());
  var BRAMY2 = Object.values(GRUPY.brama).flat();
  var czyBrama = (t) => BRAMY2.includes(t);
  var GARAZE = [...GRUPY.brama.garaze];
  var BAZA = { roleta_zip_wew: "kasetowa", bambusowa: "pelna", plisa_gora_dol: "plisa", zaslona_wave: "zaslona", firana: "zaslona", panel: "pionowa", ekran: "pelna", dach_dkl: "zaciemniajaca", dach_ssl: "natynkowa", dachowa: "natynkowa", dach_fhb: "rzymska", dach_msl: "screen", markizeta_dach: "screen", dach_pal: "zaluzja", dach_fhl: "plisa", dach_dn: "zebra", natynkowa_okragla: "natynkowa", adaptacyjna: "zewnetrzna", roleta_moskitiera: "natynkowa", ekstrudowana: "natynkowa", roleta_drzwi: "natynkowa", fasadowa_f80: "fasadowaz", markizoleta: "screen", okiennice: "zewnetrzna", okiennice_przesuwne: "zewnetrzna", markiza_otwarta: "markiza", markiza_polkasetowa: "markiza", markiza_kasetowa: "markiza", markiza_volant: "markiza", markiza_koszowa: "markiza", markiza_wolnostojaca: "markiza", markiza_zimowa: "markiza", markizeta: "markiza", markiza_balkonowa: "markiza", markiza_pionowa: "markiza", markiza_boczna: "markiza", zagiel: "markiza", parasol: "markiza", pergola: "fasadowaz", pergola_tkanina: "markiza", zadaszenie: "markiza", screen_taras: "screen", okno_silownik: "screen", okno_dachowe: "screen", okno_plaskie: "screen", swietlik: "screen", wylaz: "screen", moskitiera: "screen", moskitiera_plisa_okno: "screen", moskitiera_drzwi: "screen", moskitiera_zip_drzwi: "screen", furtka: "skrzydlowa", garaz_boczna: "segmentowa", garaz_skrzydlowa: "uchylna", szlaban: "przesuwna" };
  var baza = (t) => BAZA[t] || t;
  var Z_SCENA = new Set(["taras", "okna"].flatMap((g) => Object.values(GRUPY[g]).flat()));
  var OKNA_NAPED = Object.values(GRUPY.okna).flat();
  var wlasnyRuch = (t) => !!t && t !== baza(t) && (Z_SCENA.has(t) || czyBrama(t));
  var POZIOME = ["pionowa", "zaslona"];
  var SCIANY = { biala: "#efebe4", bezowa: "#d6c4a6", szara: "#a5a4a0", cegla: "#a65a3a", grafit: "#56595c" };
  var ZEWNETRZNE = [
    "natynkowa",
    "podtynkowa",
    "zewnetrzna",
    "perforowana",
    "fasadowa",
    "fasadowaz",
    "markiza",
    "screen",
    "dach_ssl",
    "dachowa",
    "dach_msl",
    "markizeta_dach",
    "natynkowa_okragla",
    "adaptacyjna",
    "roleta_moskitiera",
    "ekstrudowana",
    "roleta_drzwi",
    "fasadowa_f80",
    "markizoleta",
    "okiennice",
    "okiennice_przesuwne",
    "markiza_otwarta",
    "markiza_polkasetowa",
    "markiza_kasetowa",
    "markiza_volant",
    "markiza_koszowa",
    "markiza_wolnostojaca",
    "markiza_zimowa",
    "markizeta",
    "markiza_balkonowa",
    "markiza_pionowa",
    "markiza_boczna",
    "zagiel",
    "parasol",
    "pergola",
    "pergola_tkanina",
    "zadaszenie",
    "screen_taras",
    "okno_silownik",
    "okno_dachowe",
    "okno_plaskie",
    "swietlik",
    "wylaz",
    "moskitiera",
    "moskitiera_plisa_okno",
    "moskitiera_drzwi",
    "moskitiera_zip_drzwi"
  ];
  var czyZew = (t) => ZEWNETRZNE.includes(t);
  var WEWNETRZNE = OSLONY.filter((t) => !czyBrama(t) && !czyZew(t));
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
  for (const [t, b] of Object.entries(BAZA)) IKONY[t] || (IKONY[t] = IKONY[b]);
  Object.assign(IKONY, {
    okno_silownik: "mdi:window-open-variant",
    okno_dachowe: "mdi:window-open-variant",
    okno_plaskie: "mdi:window-open-variant",
    swietlik: "mdi:dome-light",
    wylaz: "mdi:window-open-variant",
    parasol: "mdi:umbrella-outline",
    szlaban: "mdi:boom-gate",
    furtka: "mdi:gate",
    pergola: "mdi:blinds-horizontal",
    ekran: "mdi:projector-screen-outline",
    okiennice: "mdi:window-shutter",
    okiennice_przesuwne: "mdi:window-shutter"
  });
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
    taras: "mdi:awning-outline",
    dach: "mdi:home-roof",
    dachowe: "mdi:home-roof",
    markizy: "mdi:awning-outline",
    pergole: "mdi:greenhouse",
    okna: "mdi:window-open-variant",
    moskitiery: "mdi:grid",
    zscreen: "mdi:roller-shade",
    okiennice: "mdi:window-shutter",
    ekrany: "mdi:projector-screen-outline",
    szlabany: "mdi:boom-gate"
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
  var RAMA_Z_KLUCZA = Object.fromEntries(Object.entries(RAMY).map(([hex3, [k]]) => [k, hex3]));
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
  var rgb2 = (h) => {
    let s = String(h || "").replace("#", "");
    if (s.length === 3) s = [...s].map((x) => x + x).join("");
    const n = parseInt(s.slice(0, 6), 16);
    return Number.isNaN(n) ? [35, 36, 39] : [n >> 16, n >> 8 & 255, n & 255];
  };
  var doHex = (a) => "#" + a.map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("");
  var jasniej = (h, t) => {
    const c = rgb2(h), d = t < 0 ? 0 : 255;
    return doHex(c.map((x) => x + (d - x) * Math.abs(t)));
  };
  var rgba = (h, a) => `rgba(${rgb2(h).join(",")},${a})`;

  // src/brama.js
  var W = 320;
  var H = 200;
  var ZIEMIA = 172;
  function tlo2(noc) {
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
  function slupek2(x, k) {
    return `<rect x="${x - 7}" y="${ZIEMIA - 98}" width="14" height="98" fill="${jasniej(k, 0.12)}"/><rect x="${x - 9}" y="${ZIEMIA - 102}" width="18" height="6" fill="${jasniej(k, -0.1)}"/>`;
  }
  function fotokomorka() {
    return `<g class="foto"><rect x="62" y="${ZIEMIA - 22}" width="6" height="16" rx="1" fill="#333"/><rect x="252" y="${ZIEMIA - 22}" width="6" height="16" rx="1" fill="#333"/>
  <line class="wiazka" x1="68" y1="${ZIEMIA - 16}" x2="252" y2="${ZIEMIA - 16}" stroke-width="2" stroke-dasharray="5 4"/></g>`;
  }
  function garaz2(k, rama, noc) {
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
    let t = tlo2(noc);
    if (typ === "przesuwna") {
      t += `${slupek2(258, rama)}<g clip-path="url(#mhPrz)"><g class="przesuwna">${przesło(64, ZIEMIA - 86, 190, 80, k)}<circle cx="90" cy="${ZIEMIA - 3}" r="4" fill="#222"/><circle cx="230" cy="${ZIEMIA - 3}" r="4" fill="#222"/></g></g>
    <rect x="0" y="${ZIEMIA - 92}" width="56" height="92" fill="${noc ? "#5a5650" : "#cfc8bb"}"/><rect x="0" y="${ZIEMIA - 96}" width="58" height="5" fill="${noc ? "#47443f" : "#b3ab9c"}"/>${slupek2(62, rama)}`;
    } else if (typ === "skrzydlowa") {
      t += `${slupek2(62, rama)}${slupek2(258, rama)}<g class="lewe">${przesło(68, ZIEMIA - 88, 92, 82, k)}</g><g class="prawe">${przesło(160, ZIEMIA - 88, 92, 82, k)}</g>`;
    } else {
      t += garaz2(k, rama, noc) + `<g clip-path="url(#mhOtw)">${drzwiGarazu(typ, k)}</g>`;
    }
    if (foto) t += fotokomorka();
    return `<svg class="brama" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">${t}</svg>`;
  }
  function ustawBrame(svg4, typ, p) {
    if (!svg4) return;
    const f = Math.max(0, Math.min(100, p)) / 100;
    const g = (s) => svg4.querySelector(s);
    if (typ === "przesuwna") g(".przesuwna")?.setAttribute("transform", `translate(${-f * 186} 0)`);
    else if (typ === "skrzydlowa") {
      const s = Math.cos(f * Math.PI * 0.45);
      g(".lewe")?.setAttribute("transform", `translate(68 0) scale(${s} 1) translate(-68 0)`);
      g(".prawe")?.setAttribute("transform", `translate(252 0) scale(${s} 1) translate(-252 0)`);
    } else if (typ === "uchylna") {
      g(".drzwi")?.setAttribute("transform", `translate(0 ${-f * 6}) translate(0 78) scale(1 ${1 - f * 0.88}) translate(0 -78)`);
    } else g(".drzwi")?.setAttribute("transform", `translate(0 ${-f * (ZIEMIA - 78)})`);
  }
  function ustawFotokomorke(svg4, przeszkoda) {
    const w = svg4?.querySelector(".wiazka");
    if (!w) return;
    w.setAttribute("stroke", przeszkoda ? "#e53935" : "#43a047");
    w.setAttribute("stroke-dasharray", przeszkoda ? "0" : "5 4");
  }

  // src/kafle_ruch.js
  var {
    ciem: ciem2,
    jas: jas2,
    u: u2,
    CIEN: CIEN2,
    okno: okno2,
    tlo: tlo3,
    cienR: cienR2,
    svg: svg2,
    skrzynka: skrzynka2,
    prowadnice: prowadnice2,
    pancerz: pancerz2,
    kaseta: kaseta2,
    dach: dach2,
    oknoD: oknoD2,
    prowD: prowD2,
    belkaD: belkaD2,
    SOSNA: SOSNA2,
    BIALA: BIALA2,
    SZARA: SZARA2,
    ORZECH: ORZECH2,
    elewacja: elewacja2,
    drzwi: drzwi2,
    pasyM: pasyM2,
    balustrada: balustrada2,
    plac: plac2,
    sztachety: sztachety2,
    garaz: garaz3,
    slupek: slupek3
  } = R;
  var lin = (a, b, t) => a + (b - a) * t;
  var zakres = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
  var rolWew = (k, z, opt = {}) => {
    const h = lin(2, opt.h ?? 60, z), x = opt.x ?? 35, w = opt.w ?? 50, y = opt.y ?? 21;
    const tk = opt.tk ? opt.tk(x, y, w, h) : `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${opt.fill || u2("tk")}"/>`;
    return tk + `<rect x="${x - 0.5}" y="${y + h}" width="${w + 1}" height="2.6" rx="1" fill="${opt.listwa || u2("rm")}"/><rect x="${x}" y="${y + h + 2.6}" width="${w}" height="1.2" fill="rgba(0,0,0,.12)"/>`;
  };
  var rolZew = (z, x = 32.5, y = 26, w = 55, h = 58) => `<rect x="${x}" y="${y}" width="${w}" height="${lin(1, h, z)}" fill="${u2("lam")}"/><rect x="${x}" y="${y + lin(1, h, z) - 2.6}" width="${w}" height="2.6" fill="${u2("met")}"/>
  <rect x="${x}" y="${y + lin(1, h, z)}" width="${w}" height="1.6" fill="rgba(0,0,0,.18)"/>`;
  var lamele = (k, z, x, y, w, h, n, opt = {}) => {
    const zj = zakres(z, 0, 0.7), obr = zakres(z, 0.7, 1), ile = Math.max(1, Math.round(n * zj)), krok = h / n;
    const gr = lin(0.6, krok * 0.92, obr);
    let s = "";
    for (let i = 0; i < ile; i++) {
      const yy = y + (zj < 1 ? i * lin(1.1, krok, zj) : i * krok);
      s += `<rect x="${x}" y="${yy}" width="${w}" height="${Math.max(0.6, gr)}" fill="${opt.fill || jas2(k, 0.2)}"/><rect x="${x}" y="${yy + Math.max(0.6, gr)}" width="${w}" height=".5" fill="${ciem2(k, 0.4)}"/>`;
    }
    return s + (opt.drabinki ? `<path d="M${x + w * 0.25} ${y}v${ile * (zj < 1 ? lin(1.1, krok, zj) : krok)}M${x + w * 0.75} ${y}v${ile * (zj < 1 ? lin(1.1, krok, zj) : krok)}" stroke="${opt.drabinki}" stroke-width=".5"/>` : "") + `<rect x="${x - 0.5}" y="${y + ile * (zj < 1 ? lin(1.1, krok, zj) : krok)}" width="${w + 1}" height="2.4" fill="${opt.dol || u2("met")}"/>`;
  };
  var plisa = (c, z, x, y, w, h, opt = {}) => {
    const hh = lin(3, h, z), n = 12, kr = hh / n;
    let s = "";
    for (let i = 0; i < n; i++) s += `<rect x="${x}" y="${y + i * kr}" width="${w}" height="${kr / 2}" fill="${jas2(c, 0.15)}"/><rect x="${x}" y="${y + i * kr + kr / 2}" width="${w}" height="${kr / 2}" fill="${ciem2(c, 0.16)}"/>`;
    return `<rect x="${x - 1}" y="${y - 3}" width="${w + 2}" height="3" rx="1" fill="${opt.belka || u2("alu")}"/>` + s + `<rect x="${x - 1}" y="${y + hh}" width="${w + 2}" height="3" rx="1" fill="${opt.belka || u2("alu")}"/>`;
  };
  var rzymska = (c, z, x, y, w, h) => {
    const hh = lin(10, h, z), fal = Math.round(lin(4, 1, z));
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${hh}" fill="${u2("tk")}"/>`;
    for (let i = 0; i < fal; i++) {
      const yy = y + hh - i * 5;
      s += `<path d="M${x} ${yy}q${w / 2} 5 ${w} 0v-5q-${w / 2} 4 -${w} 0z" fill="${ciem2(c, 0.08 + i * 0.06)}"/><path d="M${x} ${yy}q${w / 2} 5 ${w} 0" stroke="${jas2(c, 0.3)}" stroke-width=".6" fill="none"/>`;
    }
    return s;
  };
  var naBoki = (k, z, rodzaj) => {
    const sz = lin(10, 46, z), L = 14, P3 = 106;
    let s = "";
    if (rodzaj === "pionowa") {
      const n = 12, kr = lin(1.4, 6, z);
      for (let i = 0; i < n; i++) s += `<rect x="${L + 10 + i * kr}" y="15" width="${lin(1.2, 5.2, z)}" height="72" fill="${u2("tk")}"/>`;
      return s;
    }
    if (rodzaj === "panel") {
      for (let i = 0; i < 4; i++) {
        const x = L + 2 + i * lin(2.5, 22, z);
        s += `<g filter="${u2("cn")}"><rect x="${x}" y="13" width="21" height="76" fill="${u2("tkv")}"/><rect x="${x}" y="86" width="21" height="3" fill="${u2("alu")}"/></g>`;
      }
      return s;
    }
    const pan = (x0, w, lewy) => {
      const f = Math.max(3, Math.round(w / 5));
      let p = `<path d="M${x0} 12h${w}l${lewy ? 2 : -2} 77H${x0 + (lewy ? -2 : 2)}z" fill="${rodzaj === "firana" ? k : u2("tk")}" opacity="${rodzaj === "firana" ? 0.6 : 1}"/>`;
      for (let i = 0; i < f; i++) p += `<path d="M${x0 + (i + 0.5) * w / f} 12v77" stroke="${rodzaj === "firana" ? ciem2(k, 0.2) : ciem2(k, 0.3)}" stroke-width="${rodzaj === "firana" ? 0.6 : 1.4}" opacity=".5"/>`;
      return p;
    };
    return pan(L, sz, true) + pan(P3 - sz, sz, false);
  };
  var W2 = (s) => tlo3() + okno2(32, 18, 56, 66) + s;
  var Z = (s) => tlo3() + okno2(32, 26, 56, 60) + s;
  var D = (fr, drewno, s) => oknoD2(fr, drewno) + s;
  var RUCH = {
    // wewnątrz
    pelna: (k, r, z) => W2(`<rect x="27" y="11" width="66" height="6" rx="3" fill="${u2("alu")}" filter="${u2("cn")}"/>` + rolWew(k, z, { x: 29, w: 62, y: 17, h: 64, listwa: u2("alu") })),
    kasetowa: (k, r, z) => W2(kaseta2() + `<rect x="32.5" y="21" width="2.5" height="62" fill="${u2("rm")}"/><rect x="85" y="21" width="2.5" height="62" fill="${u2("rm")}"/>` + rolWew(k, z)),
    zebra: (k, r, z) => W2(kaseta2() + rolWew(k, z, { tk: (x, y, w, h) => {
      let s = "";
      for (let yy = 0; yy < h; yy += 7) s += `<rect x="${x}" y="${y + yy}" width="${w}" height="${Math.min(3.6, h - yy)}" fill="${u2("tk")}"/><rect x="${x}" y="${y + yy + 3.6}" width="${w}" height="${Math.max(0, Math.min(3.4, h - yy - 3.6))}" fill="#fff" opacity=".25"/>`;
      return s;
    } })),
    zaciemniajaca: (k, r, z) => W2(kaseta2() + `<rect x="31" y="21" width="4" height="63" fill="${u2("rm")}"/><rect x="85" y="21" width="4" height="63" fill="${u2("rm")}"/>` + rolWew(k, z, { fill: ciem2(k, 0.35) })),
    roleta_zip_wew: (k, r, z) => W2(`<rect x="30" y="13" width="60" height="7" rx="1.5" fill="${u2("rm")}" filter="${u2("cn")}"/><rect x="30" y="20" width="4" height="64" fill="${u2("rm")}"/><rect x="86" y="20" width="4" height="64" fill="${u2("rm")}"/>` + rolWew(k, z, { x: 34, w: 52, y: 20 })),
    bambusowa: (k, r, z) => {
      const b = k;
      return W2(`<rect x="31" y="14" width="58" height="5" rx="1" fill="${ciem2(b, 0.3)}" filter="${u2("cn")}"/>` + rolWew(b, z, { x: 34, w: 52, y: 19, tk: (x, y, w, h) => {
        let s = "";
        for (let yy = 0; yy < h; yy += 1.6) s += `<rect x="${x}" y="${y + yy}" width="${w}" height="1.2" fill="${yy * 10 % 3 > 1.5 ? jas2(b, 0.12) : b}"/>`;
        return s;
      }, listwa: ciem2(b, 0.25) }));
    },
    ekran: (k, r, z) => `<rect width="120" height="100" fill="${u2("tyn")}"/><rect y="86" width="120" height="14" fill="#a68b6b"/><g filter="${u2("cn")}"><rect x="14" y="8" width="92" height="7" rx="3.5" fill="${u2("met")}"/></g><rect x="18" y="15" width="84" height="${lin(1, 54, z)}" fill="${ciem2(r, 0.7)}"/><rect x="21" y="15" width="78" height="${Math.max(0, lin(1, 54, z) - 10)}" fill="#fbfbfa"/><rect x="18" y="${15 + lin(1, 54, z)}" width="84" height="2.4" fill="${u2("met")}"/>`,
    plisa: (k, r, z) => W2(plisa(k, z, 36, 25, 48, 32)),
    plaster: (k, r, z) => W2(plisa(k, z, 36, 25, 48, 32)),
    plisa_gora_dol: (k, r, z) => W2(plisa(k, z, 36, lin(25, 38, 0.6), 48, 24)),
    rzymska: (k, r, z) => W2(`<rect x="28" y="12" width="64" height="4" rx="1" fill="${u2("alu")}" filter="${u2("cn")}"/>` + rzymska(k, z, 29, 16, 62, 52)),
    zaluzja: (k, r, z) => W2(`<rect x="32" y="15" width="56" height="5" rx="1" fill="${u2("met")}" filter="${u2("cn")}"/>` + lamele(k, z, 33, 20, 54, 44, 15, { drabinki: "#e8e8e8" })),
    drewniana: (k, r, z) => W2(`<rect x="31" y="15" width="58" height="5" rx="1" fill="#8a5f38" filter="${u2("cn")}"/>` + lamele("#9a6a3f", z, 32, 20, 56, 44, 10, { fill: "#a87a4e", drabinki: k, dol: "#7d5330" })),
    pionowa: (k, r, z) => W2(`<rect x="22" y="11" width="76" height="4" rx="1" fill="${u2("alu")}" filter="${u2("cn")}"/>` + naBoki(k, z, "pionowa")),
    panel: (k, r, z) => W2(`<rect x="14" y="9" width="92" height="4" rx="1" fill="${u2("alu")}" filter="${u2("cn")}"/>` + naBoki(k, z, "panel")),
    zaslona: (k, r, z) => W2(`<rect x="12" y="9" width="96" height="2.6" rx="1.3" fill="${u2("alu")}"/>` + naBoki(k, z, "zaslona")),
    zaslona_wave: (k, r, z) => W2(`<rect x="10" y="9" width="100" height="3" rx="1" fill="${u2("alu")}"/>` + naBoki(k, z, "zaslona")),
    firana: (k, r, z) => W2(`<rect x="18" y="10" width="84" height="3.4" rx="1" fill="${u2("alu")}"/>` + naBoki(k, z, "firana")),
    // na zewnątrz
    natynkowa: (k, r, z) => Z(cienR2(26, 26, 68) + prowadnice2(32, 26, 56, 60) + rolZew(z) + skrzynka2(26, 8, 68, 16, 4)),
    natynkowa_okragla: (k, r, z) => Z(cienR2(26, 26, 68) + prowadnice2(32, 26, 56, 60) + rolZew(z) + `<g filter="${u2("cn")}"><path d="M26 8h58a10 10 0 0 1 10 10v6H26z" fill="${u2("met")}"/></g>`),
    podtynkowa: (k, r, z) => tlo3() + `<rect x="27" y="12" width="66" height="13" fill="#d6cec2"/>` + okno2(32, 26, 56, 60) + `<rect x="31" y="23" width="58" height="3" fill="${u2("met")}"/>` + prowadnice2(32, 24, 56, 62) + rolZew(z, 32.5, 24, 55, 60),
    zewnetrzna: (k, r, z) => Z(`<rect x="32" y="12" width="56" height="14" fill="${u2("rm")}" filter="${u2("cn")}"/>` + prowadnice2(32, 26, 56, 60, "rm") + rolZew(z)),
    adaptacyjna: (k, r, z) => tlo3() + okno2(32, 14, 56, 72) + `<g filter="${u2("cn")}"><rect x="32" y="14" width="56" height="12" fill="${u2("met")}"/></g><rect x="34" y="26" width="3.6" height="60" fill="${u2("metp")}"/><rect x="82.4" y="26" width="3.6" height="60" fill="${u2("metp")}"/>` + rolZew(z, 37.6, 26, 44.8, 58),
    perforowana: (k, r, z) => {
      let d = "";
      const h = lin(1, 58, z);
      for (let y = 27.5; y < 26 + h - 3; y += 3.6) for (let x = 34; x < 87; x += 2.6) d += `<rect x="${x}" y="${y}" width=".9" height=".9" fill="#cfe9f8" opacity=".85"/>`;
      return Z(prowadnice2(32, 26, 56, 60) + rolZew(z) + d + skrzynka2(26, 8, 68, 16, 4));
    },
    roleta_moskitiera: (k, r, z) => Z(prowadnice2(32, 26, 56, 60) + `<rect x="32.5" y="26" width="55" height="58" fill="${u2("sia")}" opacity=".8"/>` + rolZew(z) + skrzynka2(26, 8, 68, 16, 4)),
    ekstrudowana: (k, r, z) => Z(prowadnice2(32, 26, 56, 60) + rolZew(z) + skrzynka2(25, 6, 70, 20, 4)),
    roleta_drzwi: (k, r, z) => tlo3() + `<rect x="22" y="26" width="76" height="62" fill="${u2("rm")}"/><rect x="25" y="29" width="70" height="59" fill="${u2("nb")}"/><rect x="25" y="29" width="70" height="59" fill="${u2("bl")}"/>` + prowadnice2(22, 22, 76, 66) + rolZew(z, 22.5, 22, 75, 66) + skrzynka2(16, 6, 88, 16, 4) + `<rect y="88" width="120" height="12" fill="${u2("ks")}"/>`,
    fasadowa: (k, r, z) => Z(`<rect x="27" y="15" width="66" height="9" fill="${u2("alu")}" filter="${u2("cn")}"/><rect x="27" y="22" width="3.4" height="64" fill="${u2("alup")}"/><rect x="90" y="22" width="3.4" height="64" fill="${u2("alup")}"/>` + lamele(k, z, 31, 24, 58, 44, 11, { drabinki: "#222" })),
    fasadowaz: (k, r, z) => RUCH.fasadowa(k, r, z),
    fasadowa_f80: (k, r, z) => RUCH.fasadowa(k, r, z),
    screen: (k, r, z) => Z(`<rect x="27" y="25" width="5" height="61" fill="${u2("metp")}"/><rect x="88" y="25" width="5" height="61" fill="${u2("metp")}"/><rect x="32" y="25" width="56" height="${lin(1, 50, z)}" fill="${u2("tkv")}" opacity=".88"/><rect x="32" y="25" width="56" height="${lin(1, 50, z)}" fill="${u2("sia")}" opacity=".5"/><rect x="31" y="${25 + lin(1, 50, z)}" width="58" height="3" fill="${u2("met")}"/><g filter="${u2("cn")}"><rect x="27" y="12" width="66" height="13" rx="3" fill="${u2("met")}"/></g>`),
    markizoleta: (k, r, z) => {
      const a = zakres(z, 0, 0.6), b = zakres(z, 0.6, 1), h = lin(1, 34, a);
      return Z(`<rect x="27" y="24" width="4" height="34" fill="${u2("metp")}"/><rect x="89" y="24" width="4" height="34" fill="${u2("metp")}"/><rect x="31" y="24" width="58" height="${h}" fill="${u2("tkv")}" opacity=".9"/>` + (b > 0 ? `<path d="M31 58h58l${12 * b} ${18 * b}H${31 - 12 * b}z" fill="${u2("tkv")}"/>` : "") + `<rect x="${31 - 12 * b}" y="${24 + h + 18 * b}" width="${58 + 24 * b}" height="3" fill="${u2("met")}"/><g filter="${u2("cn")}"><rect x="26" y="12" width="68" height="12" rx="3" fill="${u2("met")}"/></g>`);
    },
    okiennice: (k, r, z) => {
      const dr = k, sk = (x0, lewy) => {
        const w = lin(4, 26, z), x = lewy ? x0 : x0 - w;
        return `<rect x="${x}" y="22" width="${w}" height="64" fill="${dr}" stroke="${ciem2(dr, 0.4)}"/>` + [...Array(13)].map((_, i) => `<rect x="${x + 1}" y="${25 + i * 4.6}" width="${Math.max(0, w - 2)}" height="2.4" fill="${jas2(dr, 0.2)}"/>`).join("");
      };
      return tlo3() + okno2(32, 22, 56, 64) + `<g filter="${u2("cn")}">${sk(32, true)}${sk(88, false)}</g>`;
    },
    okiennice_przesuwne: (k, r, z) => {
      const dr = k, sk = (x) => `<rect x="${x}" y="22" width="27" height="64" fill="${dr}" stroke="${ciem2(dr, 0.4)}"/>` + [...Array(13)].map((_, i) => `<rect x="${x + 2}" y="${25 + i * 4.6}" width="23" height="2.4" fill="${jas2(dr, 0.18)}"/>`).join("");
      return tlo3() + okno2(32, 22, 56, 64) + `<rect x="6" y="16" width="108" height="3" fill="${u2("met")}"/><g filter="${u2("cn")}">${sk(lin(4, 33, z))}${sk(lin(89, 60, z))}</g>`;
    },
    // okna dachowe
    dach_dkl: (k, r, z) => D(r, 0, `<rect x="31" y="14" width="58" height="5" rx="1" fill="${r}"/>${prowD2(r)}` + rolWew(k, z, { x: 33.4, w: 53.2, y: 19, h: 64, fill: k, listwa: r })),
    dach_dn: (k, r, z) => D(r, 0, `<rect x="31" y="13" width="58" height="6.4" rx="1.6" fill="${u2("alu")}"/>${prowD2(r)}` + rolWew(k, z, { x: 33.4, w: 53.2, y: 19.4, h: 62, listwa: r, tk: (x, y, w, h) => {
      let s = "";
      for (let yy = 0; yy < h; yy += 7.6) s += `<rect x="${x}" y="${y + yy}" width="${w}" height="${Math.min(4.2, h - yy)}" fill="${k}"/>`;
      return s;
    } })),
    dach_fhb: (k, r, z) => D(r, 0, `<rect x="31" y="14" width="58" height="4" rx="1" fill="${r}"/>` + rzymska(k, z, 32, 18, 56, 56)),
    dach_pal: (k, r, z) => D(r, 0, `<rect x="31" y="14" width="58" height="4" rx="1" fill="${u2("alu")}"/>${prowD2(r)}` + lamele(k, z, 33.4, 18.6, 53.2, 63, 19, { fill: k, drabinki: "#d9d9d9", dol: r })),
    dach_fhl: (k, r, z) => D(r, 0, prowD2(r) + plisa(k, z, 33.4, 39, 53.2, 31, { belka: r })),
    dach_ssl: (k, r, z) => D(r, 0, `<rect x="28" y="18" width="3" height="66" fill="${u2("metp")}"/><rect x="89" y="18" width="3" height="66" fill="${u2("metp")}"/>` + rolZew(z, 31, 18, 58, 66) + `<g filter="${u2("cn")}"><rect x="18" y="0" width="84" height="14" rx="1.5" fill="${u2("met")}"/><rect x="24" y="2" width="72" height="8.4" fill="#0f1d36"/></g>`),
    dach_msl: (k, r, z) => D(r, 0, `<path d="M20 8h80l${10 * z} ${40 * z}H${20 - 10 * z}z" fill="${k}" opacity=".86"/><path d="M20 8h80l${10 * z} ${40 * z}H${20 - 10 * z}z" fill="${u2("sia")}"/><rect x="${19 - 10 * z}" y="${8 + 40 * z}" width="${82 + 20 * z}" height="3" fill="#2a2d31"/><g filter="${u2("cn")}"><rect x="16" y="0" width="88" height="8" rx="2" fill="#2a2d31"/></g>`),
    dachowa: (k, r, z) => dach2(`<path d="M33 16h54l${3.8 * z} ${46 * z}H${33 - 3.8 * z}z" fill="${u2("lam")}"/><path d="M${33 - 3.8 * z} ${16 + 46 * z}h${54 + 7.6 * z}v3H${33 - 3.8 * z}z" fill="${u2("met")}"/><g filter="${u2("cn")}"><path d="M29 7h62l2 9H27z" fill="${u2("met")}"/></g>`),
    markizeta_dach: (k, r, z) => dach2(`<path d="M33 17h54l${4 * z} ${50 * z}H${33 - 4 * z}z" fill="${u2("tkv")}" opacity=".85"/><path d="M${33 - 4 * z} ${17 + 50 * z}h${54 + 8 * z}v2.6H${33 - 4 * z}z" fill="${u2("alu")}"/><path d="M30 13h60v4H30z" fill="${u2("alu")}"/>`)
  };
  var markiza = (opt = {}) => (k, r, z) => {
    const d = lin(0, 28, z), szer = lin(0, 10, z), y0 = opt.y0 ?? 23;
    let s = (opt.tlo || (() => elewacja2() + drzwi2()))() + (z > 0.05 ? cienR2(4, y0 + d + 6, 112, 12 * z) : "");
    s += `<path d="M14 ${y0}h92l${szer} ${d}H${14 - szer}z" fill="${u2("tkv")}"/>` + (z > 0.05 ? pasyM2(14, 106, y0, y0 + d, szer, k) : "");
    if (opt.ramiona !== false && z > 0.05) s += `<path d="M26 ${y0}l${14 * z} ${d * 0.7} ${10 * z} ${-d * 0.6}M94 ${y0}l${-14 * z} ${d * 0.7} ${-10 * z} ${-d * 0.6}" stroke="#e1e4e8" stroke-width="1.8" fill="none" opacity=".85"/>`;
    s += `<rect x="${4 + 10 - szer}" y="${y0 + d}" width="${92 + 2 * szer}" height="3.4" rx="1" fill="${u2("alu")}"/>`;
    if (opt.volant && z > 0.9) s += `<rect x="${14 - szer}" y="${y0 + d + 3.4}" width="${92 + 2 * szer}" height="${16 * zakres(z, 0.9, 1)}" fill="${u2("tk")}" opacity=".9"/>`;
    return s + (opt.kaseta || (() => `<g filter="${u2("cn")}"><path d="M10 13h100v9l-5 4H15l-5-4z" fill="${u2("alu")}"/></g>`))();
  };
  Object.assign(RUCH, {
    markiza: markiza({ kaseta: () => `<g filter="${u2("cn")}"><rect x="12" y="16" width="96" height="7" rx="3.5" fill="${u2("alu")}"/></g>` }),
    markiza_otwarta: markiza({ kaseta: () => `<g filter="${u2("cn")}"><rect x="12" y="14" width="96" height="3" fill="${u2("alu")}"/><rect x="14" y="17" width="92" height="6" rx="3" fill="${u2("tk")}"/></g>` }),
    markiza_polkasetowa: markiza({ kaseta: () => `<g filter="${u2("cn")}"><path d="M10 12h100v6l-4 6H14l-4-6z" fill="${u2("alu")}"/></g>` }),
    markiza_kasetowa: markiza({ y0: 26 }),
    markiza_volant: markiza({ y0: 25, volant: true }),
    markiza_koszowa: (k, r, z) => elewacja2() + `<rect x="36" y="38" width="48" height="42" fill="${u2("rm")}"/><rect x="38" y="40" width="44" height="40" fill="${u2("nb")}"/><g filter="${u2("cn")}"><path d="M28 50V${50 - 16 * z}a32 ${22 * z} 0 0 1 64 0V50z" fill="${u2("tkv")}"/></g><path d="M28 50h64" stroke="${ciem2(k, 0.3)}" stroke-width="1.6"/>`,
    markiza_wolnostojaca: (k, r, z) => `<rect width="120" height="100" fill="${u2("nb")}"/><path d="M0 58q30-8 60-4t60-2V100H0z" fill="#7da889"/><g filter="${u2("cn")}"><rect x="56" y="14" width="8" height="8" rx="2" fill="${u2("alu")}"/>
    <path d="M60 22L${60 - 46 * z} 40h${92 * z}z" fill="${u2("tkv")}"/></g><rect x="${60 - 48 * z}" y="40" width="${96 * z}" height="3" rx="1" fill="${u2("alu")}"/><rect x="58.5" y="22" width="3" height="62" fill="${u2("alup")}"/>`,
    markiza_zimowa: (k, r, z) => elewacja2(true) + `<path d="M0 30h22v52H0z" fill="${u2("tyn")}"/><path d="M22 30l90 18v34H22z" fill="#d6ecf7" opacity=".55"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${22 + i * 22.5} ${30 + i * 4.5}v${52 - i * 4.5}" stroke="${u2("alup")}" stroke-width="1.6"/>`).join("")}<path d="M22 30.4l${84 * z} ${16.8 * z} 0 2.4-${84 * z}-${16.8 * z}z" fill="${u2("tk")}"/><g filter="${u2("cn")}"><path d="M22 26l6 1.2v4L22 30z" fill="${u2("alu")}"/></g>`,
    markizeta: (k, r, z) => elewacja2() + `<rect x="36" y="36" width="48" height="40" fill="${u2("rm")}"/><rect x="38" y="38" width="44" height="38" fill="${u2("nb")}"/><path d="M35 34h50l${9 * z} ${20 * z}H${35 - 9 * z}z" fill="${u2("tkv")}"/><rect x="${35 - 10 * z}" y="${34 + 20 * z}" width="${50 + 20 * z}" height="3" fill="${u2("alu")}"/><g filter="${u2("cn")}"><rect x="34" y="28" width="52" height="6" rx="2" fill="${u2("alu")}"/></g>`,
    markiza_balkonowa: markiza({ tlo: () => elewacja2(true) + balustrada2(), y0: 19, ramiona: false, kaseta: () => `<rect x="16" y="14" width="88" height="5" rx="2" fill="${u2("alu")}"/><rect x="16.3" y="6" width="3.4" height="76" fill="${u2("alup")}"/><rect x="100.3" y="6" width="3.4" height="76" fill="${u2("alup")}"/>` }),
    markiza_pionowa: (k, r, z) => elewacja2(true) + balustrada2() + `<rect x="20" y="15" width="80" height="${lin(1, 50, z)}" fill="${u2("tk")}"/><rect x="19" y="${15 + lin(1, 50, z)}" width="82" height="3.4" rx="1.4" fill="${u2("alu")}"/><g filter="${u2("cn")}"><rect x="18" y="8" width="84" height="7" rx="3.5" fill="${u2("alu")}"/></g>`,
    markiza_boczna: (k, r, z) => elewacja2(true) + `<rect x="0" y="10" width="16" height="70" fill="${u2("tyn")}"/><path d="M21 26h${82 * z}v46H21z" fill="${u2("tk")}"/><rect x="${19 + 82 * z}" y="24" width="4.4" height="54" rx="1" fill="${u2("alu")}"/><g filter="${u2("cn")}"><rect x="14" y="22" width="7" height="56" rx="3.5" fill="${u2("alu")}"/></g>`,
    zagiel: (k, r, z) => `<rect width="120" height="100" fill="${u2("nb")}"/><path d="M0 66q40-6 120-2V100H0z" fill="#7da889"/><rect y="80" width="120" height="20" fill="${u2("ks")}"/><rect x="6" y="14" width="3" height="70" fill="${u2("alup")}"/><rect x="110" y="24" width="3" height="60" fill="${u2("alup")}"/>
    <g filter="${u2("cn")}"><path d="M8 18L${lin(8, 60, z)} ${lin(18, 12, z)}L${lin(8, 111, z)} ${lin(18, 28, z)}L${lin(8, 60, z)} ${lin(18, 40, z)}z" fill="${u2("tkv")}"/></g><rect x="4" y="16" width="7" height="5" rx="2" fill="#333"/>`,
    parasol: (k, r, z) => {
      const w = lin(4, 50, z), h = lin(30, 20, z);
      return `<rect width="120" height="100" fill="${u2("nb")}"/><path d="M0 66q40-6 120-2V100H0z" fill="#7da889"/><rect y="82" width="120" height="18" fill="${u2("ks")}"/><rect x="58.6" y="14" width="2.8" height="68" fill="${u2("alup")}"/>
    <g filter="${u2("cn")}"><path d="M${60 - w} ${14 + h}Q60 ${14 - 6 * z} ${60 + w} ${14 + h}z" fill="${u2("tkv")}"/></g><path d="M44 86h32l-4-4H48z" fill="#555"/>`;
    },
    pergola: (k, r, z) => {
      let s = "";
      for (let i = 0; i < 14; i++) {
        const x = 9 + i * 7.6, a = lin(7, 1.2, z);
        s += `<path d="M${x} 30l3.4 ${a}" stroke="${jas2(k, 0.3)}" stroke-width="${lin(2.4, 1, z)}"/><path d="M${x + 1.5} 30l3.4 ${a}" stroke="${ciem2(k, 0.3)}" stroke-width=".8"/>`;
      }
      return elewacja2(true) + `<g filter="${u2("cn")}"><path d="M6 24h108v6H6z" fill="${u2("alu")}"/></g>` + s + `<rect x="9" y="30" width="6" height="52" fill="${u2("alup")}"/><rect x="105" y="30" width="6" height="52" fill="${u2("alup")}"/><rect x="15" y="38" width="90" height="42" fill="#000" opacity="${lin(0.25, 0.05, z)}"/>`;
    },
    pergola_tkanina: (k, r, z) => {
      let s = "";
      const n = 6, sz = lin(4, 17, z);
      for (let i = 0; i < n; i++) s += `<path d="M${10 + i * sz} 30q${sz / 2} ${7 * z} ${sz} 0" fill="${jas2(k, i % 2 ? 0.1 : 0.25)}" stroke="${ciem2(k, 0.25)}" stroke-width=".5"/>`;
      return elewacja2(true) + `<g filter="${u2("cn")}"><path d="M6 24h108v6H6z" fill="${u2("alu")}"/></g>` + s + `<rect x="9" y="30" width="6" height="52" fill="${u2("alup")}"/><rect x="105" y="30" width="6" height="52" fill="${u2("alup")}"/>`;
    },
    zadaszenie: (k, r, z) => elewacja2() + drzwi2() + `<path d="M6 20h108l-10 16H16z" fill="#d6ecf7" opacity=".85"/><path d="M6 20h${108 * z}l-${10 * z} 16H${6 + 10 * z}z" fill="${u2("tkv")}" opacity=".7"/><rect x="15" y="36" width="90" height="2.6" fill="${u2("alu")}"/><rect x="17" y="38" width="3.4" height="44" fill="${u2("alup")}"/><rect x="100" y="38" width="3.4" height="44" fill="${u2("alup")}"/>`,
    screen_taras: (k, r, z) => elewacja2() + drzwi2() + `<rect x="6" y="27" width="5" height="55" fill="${u2("alup")}"/><rect x="109" y="27" width="5" height="55" fill="${u2("alup")}"/><rect x="11" y="27" width="98" height="${lin(1, 52, z)}" fill="${u2("tkv")}" opacity=".85"/><rect x="11" y="${27 + lin(1, 52, z)}" width="98" height="3" fill="${u2("alu")}"/><g filter="${u2("cn")}"><rect x="6" y="20" width="108" height="7" rx="2" fill="${u2("alu")}"/></g>`,
    // okna z napędem: skrzydło uchyla się
    okno_silownik: (k, r, z) => tlo3() + `<path d="M27 13h66l-5 5H32v68l-5 5z" fill="#cfc6b8"/><rect x="32" y="18" width="56" height="68" fill="${u2("rm")}"/><rect x="36" y="22" width="48" height="60" fill="#5c6670"/>
    <g filter="${u2("cn")}"><path d="M35 21h50l${6 * z} ${lin(60, 52, z)}H${35 - 6 * z}z" fill="${u2("rm")}"/><path d="M39 25h42l${5 * z} ${lin(52, 44, z)}H${39 - 5 * z}z" fill="${u2("nb")}"/></g><path d="M60 ${lin(81, 78, z)}v${-8 * z}" stroke="#555" stroke-width="2"/>`,
    okno_dachowe: (k, r, z) => dach2(`<path d="M32 24h56l6 64H26z" fill="#25282c"/><g filter="${u2("cn")}"><path d="M30 ${lin(20, 8, z)}h60l${lin(2, 8, z)} ${lin(68, 60, z)}H${lin(28, 22, z)}z" fill="${u2("rm")}"/><path d="M34 ${lin(24, 12, z)}h52l${lin(1.6, 6.6, z)} ${lin(60, 52, z)}H${lin(32.4, 27.4, z)}z" fill="${u2("nb")}"/></g>`),
    okno_plaskie: (k, r, z) => `<rect width="120" height="100" fill="${u2("nb")}"/><path d="M0 50h120v50H0z" fill="#8f949a"/><path d="M26 62h68l-4 18H30z" fill="${u2("rm")}"/><g filter="${u2("cn")}"><path d="M30 60l34 ${-18 * z} 32 ${14 * z}${z < 0.05 ? "" : " -2 4"}z" fill="${u2("rm")}"/><path d="M33 59l31 ${-15 * z} 28 ${12.4 * z}z" fill="${u2("nb")}"/></g>`,
    swietlik: (k, r, z) => `<rect width="120" height="100" fill="${u2("nb")}"/><path d="M0 52h120v48H0z" fill="#8f949a"/><path d="M28 70h64l-6 12H34z" fill="${u2("rm")}"/><g filter="${u2("cn")}" transform="rotate(${-28 * z} 34 70)"><path d="M34 70q26 -28 58 0z" fill="#dcecf6" opacity=".9"/></g>`,
    wylaz: (k, r, z) => dach2(`<path d="M34 30h52l6 48H28z" fill="#2c2f33"/><g filter="${u2("cn")}"><path d="M34 30h52l${lin(6, -6, z)} ${lin(48, -22, z)}H${lin(28, 40, z)}z" fill="${u2("rm")}"/></g>`),
    // moskitiery
    moskitiera: (k, r, z) => W2(`<rect x="29" y="19" width="3" height="65" fill="${u2("rm")}"/><rect x="88" y="19" width="3" height="65" fill="${u2("rm")}"/><rect x="32" y="19" width="56" height="${lin(1, 60, z)}" fill="${u2("sia")}"/><rect x="32" y="${19 + lin(1, 60, z)}" width="56" height="3" fill="${u2("rm")}"/><g filter="${u2("cn")}"><rect x="29" y="12" width="62" height="7" rx="2" fill="${u2("rm")}"/></g>`),
    moskitiera_plisa_okno: (k, r, z) => {
      const x = lin(36, 84, 1 - z);
      return W2(`<rect x="31" y="18" width="3" height="66" fill="${u2("rm")}"/><rect x="86" y="18" width="3" height="66" fill="${u2("rm")}"/><rect x="34" y="19" width="${x - 34}" height="64" fill="${u2("sia")}"/><rect x="${x}" y="19" width="2.6" height="64" fill="${u2("rm")}"/>`);
    },
    moskitiera_drzwi: (k, r, z) => {
      const x = lin(39, 82, z);
      return tlo3() + `<rect x="33" y="8" width="54" height="80" fill="${u2("rm")}"/><rect x="37" y="12" width="46" height="76" fill="${u2("nb")}"/><rect x="37" y="12" width="${x - 37}" height="76" fill="${u2("sia")}"/><rect x="${x}" y="12" width="3" height="76" fill="${u2("alup")}"/>`;
    },
    moskitiera_zip_drzwi: (k, r, z) => tlo3() + `<rect x="30" y="12" width="4" height="80" fill="${u2("rm")}"/><rect x="86" y="12" width="4" height="80" fill="${u2("rm")}"/><rect x="34" y="12" width="52" height="80" fill="${u2("nb")}"/><rect x="34" y="12" width="52" height="${lin(1, 78, z)}" fill="${u2("sia")}"/><rect x="34" y="${12 + lin(1, 78, z)}" width="52" height="2.6" fill="${u2("rm")}"/><rect x="30" y="4" width="60" height="8" rx="2" fill="${u2("rm")}"/>`,
    // bramy (z = zamknięcie)
    przesuwna: (k, r, z) => plac2() + slupek3(0) + slupek3(110) + `<g filter="${u2("cn")}" transform="translate(${lin(80, 0, z)} 0)">${sztachety2(10, 44, 78, 36)}</g>`,
    skrzydlowa: (k, r, z) => plac2() + slupek3(2) + slupek3(108) + `<g filter="${u2("cn")}"><g transform="translate(13 0) scale(${lin(0.08, 1, z)} 1) translate(-13 0)">${sztachety2(13, 44, 46, 36)}</g><g transform="translate(107 0) scale(${lin(0.08, 1, z)} 1) translate(-107 0)">${sztachety2(61, 44, 46, 36)}</g></g>`,
    furtka: (k, r, z) => plac2() + `<rect x="30" y="34" width="10" height="48" fill="#b4ada1"/><rect x="80" y="34" width="10" height="48" fill="#b4ada1"/><g filter="${u2("cn")}" transform="translate(41 0) scale(${lin(0.1, 1, z)} 1) translate(-41 0)">${sztachety2(41, 42, 38, 40)}</g>${sztachety2(0, 46, 29, 36)}${sztachety2(91, 46, 29, 36)}`,
    // segmenty jadą w górę pod sufit: dolna krawędź bramy podnosi się, widać tylko część poniżej nadproża
    segmentowa: (k, r, z) => {
      const dol = 22 + 66 * z;
      return garaz3(`<rect x="18" y="22" width="84" height="66" fill="#2d3035"/><clipPath id="sg${Math.round(z * 1e3)}"><rect x="18" y="22" width="84" height="66"/></clipPath><g clip-path="url(#sg${Math.round(z * 1e3)})">` + [...Array(4)].map((_, i) => `<rect x="18" y="${dol - (i + 1) * 16.5}" width="84" height="16" fill="${u2("met")}"/><path d="M18 ${dol - i * 16.5 - 0.5}h84" stroke="${ciem2(k, 0.5)}" stroke-width=".8"/>`).join("") + "</g>");
    },
    garaz_boczna: (k, r, z) => garaz3(`<rect x="18" y="22" width="84" height="66" fill="#2d3035"/>` + [...Array(Math.max(1, Math.round(14 * z)))].map((_, i) => `<rect x="${18 + i * 6}" y="22" width="5.6" height="66" fill="${u2("metp")}"/>`).join("")),
    uchylna: (k, r, z) => garaz3(`<rect x="18" y="22" width="84" height="66" fill="#2d3035"/><rect x="18" y="22" width="84" height="${lin(4, 66, z)}" fill="${u2("met")}"/>`),
    roletowa: (k, r, z) => garaz3(`<rect x="18" y="22" width="84" height="66" fill="#2d3035"/><rect x="16" y="22" width="4" height="66" fill="${u2("metp")}"/><rect x="100" y="22" width="4" height="66" fill="${u2("metp")}"/>` + rolZew(z, 20, 22, 80, 64) + `<g filter="${u2("cn")}"><rect x="14" y="10" width="92" height="12" fill="${u2("met")}"/></g>`),
    garaz_skrzydlowa: (k, r, z) => garaz3(`<rect x="18" y="22" width="84" height="66" fill="#2d3035"/><rect x="18" y="22" width="${42 * z}" height="66" fill="${u2("met")}"/><rect x="${102 - 42 * z}" y="22" width="${42 * z}" height="66" fill="${u2("met")}"/>`),
    szlaban: (k, r, z) => plac2() + `<rect x="10" y="50" width="12" height="32" rx="1.5" fill="${u2("met")}" filter="${u2("cn")}"/><g transform="rotate(${lin(-80, 0, z)} 16 56)"><rect x="16" y="54" width="94" height="4" rx="2" fill="${u2("alu")}"/>${[...Array(8)].map((_, i) => `<rect x="${22 + i * 11}" y="54" width="5.5" height="4" fill="#e53935"/>`).join("")}</g>`
  });
  var WYSUWANE = (t) => t.startsWith("markiz") || ["dach_msl", "markizeta_dach", "zagiel", "parasol", "pergola", "pergola_tkanina", "zadaszenie", "okno_silownik", "okno_dachowe", "okno_plaskie", "swietlik", "wylaz", "markizoleta"].includes(t) && !["markiza_pionowa", "markiza_boczna"].includes(t);
  function kafelRuch(typ, o, kolor = "#3b3f45", rama = "#f4f4f2") {
    const f = RUCH[typ];
    if (!f) return "";
    const z = WYSUWANE(typ) ? o : 1 - o;
    return svg2(poczatek(kolor, rama) + f(kolor, rama, Math.min(1, Math.max(0, z))));
  }
  var RODZAJE_RUCHU = Object.keys(RUCH);

  // src/tekstury.js
  var svg3 = (h, tresc, w = 8) => `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'>${tresc}</svg>`)}")`;
  var pion = (id, stopy) => `<defs><linearGradient id='${id}' x1='0' y1='0' x2='0' y2='1'>${stopy.map(([o, c, a = 1]) => `<stop offset='${o}' stop-color='${c}' stop-opacity='${a}'/>`).join("")}</linearGradient></defs>`;
  var pas = (id, y, h) => `<rect x='0' y='${y}' width='8' height='${h}' fill='url(#${id})'/>`;
  function tekstura(typ, k) {
    const splot = "repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px 3px)";
    const cien = "linear-gradient(90deg,rgba(0,0,0,.18),rgba(0,0,0,0) 12%,rgba(0,0,0,0) 88%,rgba(0,0,0,.18))";
    const sznurki = (c, w) => `linear-gradient(90deg,transparent calc(22% - ${w / 2}px),${c} calc(22% - ${w / 2}px) calc(22% + ${w / 2}px),transparent calc(22% + ${w / 2}px) calc(78% - ${w / 2}px),${c} calc(78% - ${w / 2}px) calc(78% + ${w / 2}px),transparent calc(78% + ${w / 2}px))`;
    switch (typ) {
      case "zebra":
        return { okres: 26, nakladka: `${cien},${splot}`, obraz: svg3(
          26,
          pion("a", [[0, jasniej(k, 0.1)], [0.12, k], [0.85, k], [1, jasniej(k, -0.22)]]) + pion("b", [[0, jasniej(k, 0.35), 0.5], [1, jasniej(k, 0.45), 0.42]]) + pas("a", 0, 16) + pas("b", 16, 10)
        ) };
      case "pelna":
      case "kasetowa":
        return { okres: 24, nakladka: `${cien},${splot}`, obraz: svg3(24, pion("a", [[0, k], [0.5, jasniej(k, -0.05)], [1, k]]) + pas("a", 0, 24)) };
      case "zaciemniajaca":
        return {
          okres: 24,
          nakladka: `${cien},linear-gradient(90deg,transparent 25%,rgba(255,255,255,.07) 45%,transparent 65%)`,
          obraz: svg3(24, pion("a", [[0, jasniej(k, 0.03)], [0.5, k], [1, jasniej(k, 0.03)]]) + pas("a", 0, 24))
        };
      case "plisa":
        return { okres: 12, nakladka: cien, obraz: svg3(12, pion("a", [[0, jasniej(k, 0.22), 0.95], [0.4, k, 0.94], [1, jasniej(k, -0.26), 0.96]]) + pas("a", 0, 12)) };
      case "plaster":
        return { okres: 14, nakladka: cien, obraz: svg3(14, pion("a", [[0, jasniej(k, 0.24), 0.96], [0.45, k, 0.94], [0.48, jasniej(k, -0.3), 0.97], [0.52, jasniej(k, 0.08), 0.94], [1, jasniej(k, -0.28), 0.96]]) + pas("a", 0, 14)) };
      case "rzymska":
        return { okres: 34, nakladka: `${cien},${splot}`, obraz: svg3(34, pion("a", [[0, jasniej(k, 0.02), 0.95], [0.55, jasniej(k, 0.12), 0.95], [0.92, jasniej(k, -0.25), 0.97], [1, jasniej(k, -0.4), 0.97]]) + pas("a", 0, 34)) };
      case "zaluzja":
        return { okres: 13, nakladka: sznurki("rgba(240,240,240,.7)", 1), obraz: svg3(13, pion("a", [[0, jasniej(k, 0.35)], [0.35, k], [1, jasniej(k, -0.3)]]) + pas("a", 0, 10) + `<rect x='0' y='10' width='8' height='1' fill='rgba(0,0,0,.3)'/>`) };
      case "drewniana":
        return {
          okres: 22,
          nakladka: `${sznurki(rgba(jasniej(k, -0.2), 0.95), 6)},repeating-linear-gradient(90deg,rgba(0,0,0,.06) 0 1px,transparent 1px 6px,rgba(255,255,255,.05) 6px 7px,transparent 7px 12px)`,
          obraz: svg3(22, pion("a", [[0, jasniej(k, 0.22)], [0.3, k], [1, jasniej(k, -0.32)]]) + pas("a", 0, 18) + `<rect x='0' y='18' width='8' height='1.5' fill='rgba(0,0,0,.35)'/>`)
        };
      case "zewnetrzna":
      case "podtynkowa":
        return { okres: 14, nakladka: cien, obraz: svg3(14, pion("a", [[0, jasniej(k, 0.28)], [0.25, k], [0.75, k], [1, jasniej(k, -0.35)]]) + pas("a", 0, 12) + `<rect x='0' y='12' width='8' height='2' fill='rgba(0,0,0,.6)'/>`) };
      case "natynkowa":
        return { okres: 14, nakladka: cien, obraz: svg3(14, pion("a", [[0, jasniej(k, 0.3)], [0.2, k], [0.46, jasniej(k, 0.08)], [0.5, jasniej(k, -0.22)], [0.56, k], [1, jasniej(k, -0.38)]]) + pas("a", 0, 12) + `<rect x='0' y='12' width='8' height='2' fill='rgba(0,0,0,.6)'/>`) };
      case "perforowana":
        return { okres: 14, nakladka: cien, obraz: svg3(14, pion("a", [[0, jasniej(k, 0.28)], [0.25, k], [1, jasniej(k, -0.35)]]) + pas("a", 0, 12) + `<rect x='0' y='12' width='8' height='2' fill='rgba(0,0,0,.6)'/><ellipse cx='4' cy='6' rx='1.3' ry='.8' fill='rgba(255,244,210,.95)'/>`) };
      case "fasadowa":
        return { okres: 16, nakladka: sznurki("rgba(25,25,25,.55)", 2), obraz: svg3(16, pion("a", [[0, jasniej(k, -0.3)], [0.2, jasniej(k, 0.28)], [0.5, jasniej(k, 0.08)], [1, jasniej(k, -0.28)]]) + pas("a", 0, 12) + `<rect x='0' y='12' width='8' height='4' fill='rgba(0,0,0,.45)'/>`) };
      case "fasadowaz":
        return { okres: 16, nakladka: sznurki("rgba(25,25,25,.45)", 2), obraz: svg3(16, pion("a", [[0, jasniej(k, 0.16)], [0.15, k], [0.85, k], [1, jasniej(k, -0.22)]]) + pas("a", 0, 11) + `<rect x='0' y='11' width='8' height='1.5' fill='#1b1b1b'/><rect x='0' y='12.5' width='8' height='3.5' fill='${jasniej(k, -0.45)}'/>`) };
      case "screen":
        return { okres: 6, nakladka: "repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 1px,transparent 1px 2px)", obraz: svg3(6, pion("a", [[0, k, 0.8], [1, jasniej(k, 0.06), 0.78]]) + pas("a", 0, 6)) };
      case "markiza":
        return { okres: 30, nakladka: `repeating-linear-gradient(90deg,${k} 0 14px,${rgba("#f3efe6", 0.97)} 14px 28px)`, obraz: svg3(30, pion("a", [[0, "#ffffff", 0.12], [0.5, "#000000", 0.12], [1, "#ffffff", 0.12]]) + pas("a", 0, 30)) };
      case "pionowa":
        return {
          okres: 24,
          nakladka: `repeating-linear-gradient(90deg,${jasniej(k, 0.2)} 0 2px,${k} 2px 15px,${jasniej(k, -0.28)} 15px 17px,rgba(0,0,0,.35) 17px 18px)`,
          obraz: svg3(24, pion("a", [[0, k], [1, jasniej(k, -0.05)]]) + pas("a", 0, 24))
        };
      case "zaslona":
        return {
          okres: 24,
          nakladka: `repeating-linear-gradient(90deg,${jasniej(k, -0.22)} 0,${jasniej(k, 0.14)} 11px,${jasniej(k, -0.1)} 22px,${jasniej(k, -0.22)} 26px),${splot}`,
          obraz: svg3(24, pion("a", [[0, k], [1, jasniej(k, -0.08)]]) + pas("a", 0, 24))
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
.fotw{position:absolute;top:0;height:100%;max-width:none;object-fit:cover;pointer-events:none;user-select:none}
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
.skrz[data-s="l"] .klamka{right:0}.skrz[data-s="p"] .klamka{left:0}
.skrz.otw[data-s="l"] .klamka::after{transform:rotate(90deg);transition-delay:0s}
.skrz.otw[data-s="p"] .klamka::after{transform:rotate(-90deg);transition-delay:0s}
.skrz.uch .klamka::after{transform:rotate(180deg);transition-delay:0s}
.skrz.uch{transform-origin:50% 100%;transform:perspective(700px) rotateX(-14deg) scaleY(.9);box-shadow:0 6px 14px rgba(0,0,0,.5)}
.skrz.otw[data-s="l"]{transform-origin:0 50%;transform:perspective(700px) rotateY(-42deg);z-index:8}
.skrz.otw[data-s="p"]{transform-origin:100% 50%;transform:perspective(700px) rotateY(42deg);z-index:8}
/* układ z polami (2.2.0): każde pole w swoim miejscu, rama osobno dla każdej kolumny (np. okno nad kaloryferem) */
.okno.uk{background:none!important;box-shadow:none!important;padding:0}
.uk .kolr{position:absolute;border-radius:3px}
.uk .mur{position:absolute;top:0;bottom:0;background:repeating-linear-gradient(0deg,transparent 0 9px,rgba(0,0,0,.12) 9px 10px),color-mix(in srgb,var(--secondary-text-color,#888) 30%,var(--card-background-color,#fff));border-radius:2px}
.uk .skrz{position:absolute;flex:none;margin:0;padding:5px;overflow:hidden}
.uk .za{inset:auto}
.uk .wid{position:absolute}
.uk .zewo .szyba{position:absolute;flex:none}
.zew .uk .kolr{box-shadow:0 0 0 5px #c4bdb0,0 0 0 6px rgba(0,0,0,.08),-4px 4px 10px 6px rgba(0,0,0,.28)}
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
.przyc button{--iku:26px}.przyc button:disabled .iku{opacity:.4;filter:grayscale(1)}
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
.stopka{display:flex;flex-wrap:wrap;gap:var(--ha-space-2,8px);margin:0 calc(-1 * var(--ha-space-2,8px))}
.stopka .zmien{margin:0}
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
/* okno ze zdjęć (Canva): zdjęcie układu, szyby w miejscach szyb na zdjęciu, osłona = wycinek zdjęcia rodzaju */
.foto .okno{padding:0;display:block;background:#d9dadb!important;box-shadow:none!important;border-radius:var(--ha-border-radius-md,8px);overflow:hidden}
.foto .okno .ftlo{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;user-select:none}
.foto .skrz{position:absolute;padding:0;margin:0;background:none!important;border-radius:0;box-shadow:none}
.foto .szyba{border-radius:0}
.foto .oslona{background:none!important;overflow:hidden;box-shadow:none}
.foto .oslona .ftkp{position:absolute;inset:0;overflow:hidden;container-type:size}
.foto .oslona .ftki{position:absolute;max-width:none;max-height:none;-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
.foto .listwa,.foto .klamka{display:none}
.foto.noc .okno .ftlo,.foto.noc .oslona .ftki{filter:brightness(.62) saturate(.85);transition:filter 1.5s}
.poziomo .skrz,.poziomo .zewo{cursor:pointer}
/* brama i garaż */
.bramaw{position:relative;width:min(100%,420px);border-radius:var(--ha-border-radius-md,8px);overflow:hidden;cursor:pointer;-webkit-tap-highlight-color:transparent}
.bramaw svg{display:block;width:100%;height:auto}
/* automatyka: powód ruchu i pauza – jak wiersz informacji HA */
.auto{display:flex;align-items:center;gap:8px;min-height:32px;padding:0 4px 0 8px;border-radius:var(--ha-border-radius-md,8px);
 background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-text-color);font-size:var(--ha-font-size-s,12px);line-height:16px}
.auto[hidden]{display:none}
.auto ha-icon{--mdc-icon-size:18px;display:flex;color:var(--primary-color);flex:none}
.auto .aik{--iku:22px;display:flex;flex:none;font-style:normal}
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
  function stylPola(sel, o) {
    return stylOkna(o).split("\n").filter((l) => /^\.(oslona|kaseta|listwa|prow)/.test(l)).map((l) => `${sel} ${l}`).join("\n");
  }
  function stylOkna({ rama, drewno, kolor, typ, zew }) {
    const t = tekstura(typ, kolor), S = (k) => jasniej(kolor, k), R2 = (k) => jasniej(rama, k);
    const tlo4 = (drewno ? SLOJE + "," : "") + rama;
    const alu = `linear-gradient(90deg,${S(-0.4)},${S(0.22)} 40%,${S(-0.05)} 70%,${S(-0.45)})`;
    let kaseta3 = `background:linear-gradient(180deg,#fff,#f1f1f1 55%,#cfcfcf);box-shadow:0 2px 3px rgba(0,0,0,.35)`;
    let listwa = `background:linear-gradient(180deg,#fafafa,#bdbdbd);box-shadow:0 2px 3px rgba(0,0,0,.4)`;
    let prow = "";
    switch (typ) {
      case "pelna":
        kaseta3 = `left:3px;right:3px;height:10px;border-radius:10px;background:linear-gradient(180deg,${S(0.3)},${kolor} 50%,${S(-0.38)});box-shadow:0 1px 2px rgba(0,0,0,.4)`;
        break;
      case "kasetowa":
        kaseta3 = `background:linear-gradient(180deg,${R2(0.06)},${rama} 50%,${R2(-0.18)});box-shadow:0 2px 3px rgba(0,0,0,.35)`;
        prow = `linear-gradient(90deg,${R2(-0.2)},${R2(0.06)} 45%,${R2(-0.14)})`;
        break;
      case "zaciemniajaca":
        prow = "linear-gradient(90deg,#c9c9c9,#fafafa 45%,#b5b5b5)";
        break;
      case "plisa":
      case "plaster":
        kaseta3 = `height:8px;background:linear-gradient(180deg,#f4f4f4,#c9c9c9);box-shadow:0 1px 2px rgba(0,0,0,.35)`;
        listwa = `background:linear-gradient(180deg,#f4f4f4,#bcbcbc);box-shadow:0 2px 3px rgba(0,0,0,.35)`;
        break;
      case "rzymska":
        kaseta3 = `height:8px;background:linear-gradient(180deg,${S(0.25)},${S(-0.1)});box-shadow:0 1px 2px rgba(0,0,0,.35)`;
        listwa = `background:linear-gradient(180deg,${S(0.05)},${S(-0.35)});box-shadow:0 3px 4px rgba(0,0,0,.3)`;
        break;
      case "zaluzja":
      case "drewniana":
        kaseta3 = `height:9px;background:linear-gradient(180deg,${S(0.3)},${kolor} 55%,${S(-0.35)});box-shadow:0 2px 3px rgba(0,0,0,.35)`;
        listwa = `background:linear-gradient(180deg,${S(0.3)},${kolor} 50%,${S(-0.3)});box-shadow:0 2px 2px rgba(0,0,0,.35)`;
        break;
      case "zewnetrzna":
      case "perforowana":
        kaseta3 = `height:16px;background:linear-gradient(180deg,${R2(0.05)},${rama} 45%,${R2(-0.16)});border-radius:0;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12),0 2px 3px rgba(0,0,0,.35)`;
        prow = alu;
        break;
      case "natynkowa":
        kaseta3 = `height:20px;background:linear-gradient(180deg,${S(0.36)},${S(0.18)} 50%,${S(-0.3)} 51%,${S(-0.05)});border-radius:0;box-shadow:0 3px 5px rgba(0,0,0,.5)`;
        prow = alu;
        break;
      case "podtynkowa":
        kaseta3 = `height:12px;background:linear-gradient(180deg,#ebe7de,#d6d1c6 58%,#3a3a3a 60%,#151515);border-radius:0;box-shadow:none`;
        prow = alu;
        break;
      case "fasadowa":
      case "fasadowaz":
        kaseta3 = `height:14px;background:linear-gradient(180deg,${S(0.3)},${S(0.05)} 70%,${S(-0.3)});border-radius:0;box-shadow:0 2px 3px rgba(0,0,0,.4)`;
        prow = alu;
        break;
      case "screen":
        kaseta3 = `height:16px;background:linear-gradient(180deg,${S(0.3)},${S(0.08)} 60%,${S(-0.35)});border-radius:0;box-shadow:0 2px 3px rgba(0,0,0,.4)`;
        prow = `linear-gradient(90deg,${S(-0.45)},${S(0.15)} 35%,#111 50%,${S(0.15)} 65%,${S(-0.45)})`;
        break;
      case "markiza":
        kaseta3 = `height:16px;background:linear-gradient(180deg,#e8eaec,#c3c7cb 60%,#8d9297);border-radius:0;box-shadow:0 3px 5px rgba(0,0,0,.45)`;
        listwa = `height:6px;background:linear-gradient(180deg,#eef0f2,#a7acb1);box-shadow:0 2px 2px rgba(0,0,0,.35)`;
        break;
    }
    if (["zewnetrzna", "perforowana", "natynkowa", "podtynkowa", "fasadowa", "fasadowaz", "screen"].includes(typ))
      listwa = `background:linear-gradient(180deg,${S(0.35)},${S(0.05)} 55%,${S(-0.4)});box-shadow:0 2px 0 rgba(20,20,20,.85),0 3px 3px rgba(0,0,0,.4)`;
    const markiza2 = typ === "markiza" ? `.listwa::before{content:"";position:absolute;left:0;right:0;top:100%;height:10px;background:radial-gradient(circle at 7px 0,${kolor} 6.5px,transparent 7px) 0 0/14px 10px repeat-x}` : "";
    return `
.okno,.kolr{background:${tlo4};box-shadow:inset 0 0 0 1px rgba(0,0,0,.18),0 3px 10px rgba(0,0,0,.4)}
.skrz{background:${(drewno ? SLOJE + "," : "") + R2(-0.03)}}
.oslona{background-image:${t.nakladka ? t.nakladka + "," : ""}${t.obraz};background-size:${t.nakladka ? "100% 100%," : ""}100% ${t.okres}px;background-position:${t.nakladka ? "0 0," : ""}0 100%;background-repeat:${t.nakladka ? "no-repeat," : ""}repeat-y}
.kaseta{${kaseta3}}
.listwa{${listwa}}
${prow ? `.prow{background:${prow}}` : ".prow{display:none}"}
${markiza2}
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
  var POGODA_ZDJ = {
    slonce: "sunny",
    chmurki: "partlycloudy",
    wiatr: "partlycloudy",
    chmury: "cloudy",
    mgla: "fog",
    deszcz: "rainy",
    ulewa: "rainy",
    burza: "lightning-rainy",
    snieg: "snowy",
    deszczsnieg: "snowy"
  };
  var FILTR_PORY = { zloto: "brightness(.85) sepia(.35) saturate(1.3)", zmierzch: "brightness(.5) saturate(.8) hue-rotate(-10deg)", noc: "brightness(.28) saturate(.55)" };
  function zdjecieWidoku(widoki, rodzaj, pora) {
    const p = POGODA_ZDJ[rodzaj] || "cloudy";
    for (const [k, f] of [[`${pora}-${p}`, ""], [`dzien-${p}`, FILTR_PORY[pora] || ""], [`${pora}-cloudy`, ""], ["dzien-cloudy", FILTR_PORY[pora] || ""]])
      if (widoki.has(k)) return { plik: k, filtr: f };
    return null;
  }

  // src/zdjecia.js
  var ZDJECIA = /* @__PURE__ */ new Set(["adaptacyjna", "bambusowa", "dach_dkl", "dach_dn", "dach_fhb", "dach_fhl", "dach_msl", "dach_pal", "dach_ssl", "dachowa", "drewniana", "ekran", "ekstrudowana", "fasadowa", "fasadowa_f80", "fasadowaz", "firana", "furtka", "garaz_boczna", "garaz_skrzydlowa", "kasetowa", "markiza", "markiza_balkonowa", "markiza_boczna", "markiza_kasetowa", "markiza_koszowa", "markiza_otwarta", "markiza_pionowa", "markiza_polkasetowa", "markiza_volant", "markiza_wolnostojaca", "markiza_zimowa", "markizeta", "markizeta_dach", "markizoleta", "moskitiera", "moskitiera_drzwi", "moskitiera_plisa_okno", "moskitiera_zip_drzwi", "natynkowa", "natynkowa_okragla", "okiennice", "okiennice_przesuwne", "okno_dachowe", "okno_plaskie", "okno_silownik", "panel", "parasol", "pelna", "perforowana", "pergola", "pergola_tkanina", "pionowa", "plaster", "plisa", "plisa_gora_dol", "podtynkowa", "przesuwna", "roleta_drzwi", "roleta_moskitiera", "roleta_zip_wew", "roletowa", "rzymska", "screen", "screen_taras", "segmentowa", "skrzydlowa", "swietlik", "szlaban", "uchylna", "wylaz", "zaciemniajaca", "zadaszenie", "zagiel", "zaluzja", "zaslona", "zaslona_wave", "zebra", "zewnetrzna"]);
  var UI = /* @__PURE__ */ new Set(["auto-ciemny.png", "auto.png", "automat-ciemny.png", "automat.png", "cloudy-ciemny.png", "cloudy.png", "czas-ciemny.png", "czas.png", "czujniki-ciemny.png", "czujniki.png", "dach-ciemny.png", "dach.png", "dalej-ciemny.png", "dalej.png", "dol-ciemny.png", "dol.png", "dzien-ciemny.png", "dzien.png", "fog-ciemny.png", "fog.png", "gora-ciemny.png", "gora.png", "gotowe-ciemny.png", "gotowe.png", "info-ciemny.png", "info.png", "kolory-ciemny.png", "kolory.png", "lightning-rainy-ciemny.png", "lightning-rainy.png", "noc-ciemny.png", "noc.png", "ok-ciemny.png", "ok.png", "oslona-ciemny.png", "oslona.png", "partlycloudy-ciemny.png", "partlycloudy.png", "pauza-ciemny.png", "pauza.png", "pogoda-ciemny.png", "pogoda.png", "pola-ciemny.png", "pola.png", "powiadomienia-ciemny.png", "powiadomienia.png", "rainy-ciemny.png", "rainy.png", "rodzaj-ciemny.png", "rodzaj.png", "silnik-ciemny.png", "silnik.png", "snowy-ciemny.png", "snowy.png", "stop-ciemny.png", "stop.png", "sunny-ciemny.png", "sunny.png", "u1.webp", "u2.webp", "u3.webp", "u4.webp", "u5.webp", "u6.webp", "u7.webp", "u8.webp", "uklad-ciemny.png", "uklad.png", "urzadzenie-ciemny.png", "urzadzenie.png", "uwaga-ciemny.png", "uwaga.png", "wew-ciemny.png", "wew.png", "wlasny.webp", "wstecz-ciemny.png", "wstecz.png", "zew-ciemny.png", "zew.png", "zloto-ciemny.png", "zloto.png", "zmierzch-ciemny.png", "zmierzch.png"]);
  var MASKI = /* @__PURE__ */ new Set(["adaptacyjna", "bambusowa", "dach_dkl", "dach_dn", "dach_fhb", "dach_fhl", "dach_msl", "dach_pal", "dach_ssl", "dachowa", "drewniana", "ekran", "ekstrudowana", "fasadowa", "fasadowa_f80", "fasadowaz", "furtka", "garaz_boczna", "garaz_skrzydlowa", "kasetowa", "markiza", "markiza_balkonowa", "markiza_boczna", "markiza_kasetowa", "markiza_koszowa", "markiza_otwarta", "markiza_pionowa", "markiza_polkasetowa", "markiza_volant", "markiza_wolnostojaca", "markiza_zimowa", "markizeta", "markizeta_dach", "markizoleta", "moskitiera", "moskitiera_drzwi", "moskitiera_plisa_okno", "moskitiera_zip_drzwi", "natynkowa", "natynkowa_okragla", "okiennice", "okiennice_przesuwne", "panel", "parasol", "pelna", "perforowana", "pergola", "pergola_tkanina", "pionowa", "plaster", "plisa", "plisa_gora_dol", "podtynkowa", "przesuwna", "roleta_drzwi", "roleta_moskitiera", "roleta_zip_wew", "roletowa", "rzymska", "screen", "screen_taras", "segmentowa", "skrzydlowa", "szlaban", "uchylna", "zaciemniajaca", "zadaszenie", "zagiel", "zaluzja", "zaslona", "zaslona_wave", "zebra", "zewnetrzna"]);
  var RAMY2 = /* @__PURE__ */ new Set(["adaptacyjna", "bambusowa", "dach_dkl", "dach_dn", "dach_fhb", "dach_fhl", "dach_pal", "dach_ssl", "dachowa", "drewniana", "ekran", "fasadowa", "fasadowa_f80", "kasetowa", "markiza_boczna", "markiza_koszowa", "markiza_zimowa", "markizeta", "moskitiera", "moskitiera_drzwi", "moskitiera_plisa_okno", "moskitiera_zip_drzwi", "natynkowa", "natynkowa_okragla", "okiennice", "okiennice_przesuwne", "okno_dachowe", "okno_silownik", "panel", "pelna", "pergola_tkanina", "pionowa", "plaster", "plisa", "plisa_gora_dol", "podtynkowa", "roleta_drzwi", "roleta_moskitiera", "roleta_zip_wew", "rzymska", "screen", "screen_taras", "wylaz", "zaciemniajaca", "zagiel", "zaluzja", "zaslona", "zaslona_wave", "zebra", "zewnetrzna"]);
  var WIDOK = /* @__PURE__ */ new Set(["dzien-cloudy", "dzien-fog", "dzien-lightning-rainy", "dzien-partlycloudy", "dzien-rainy", "dzien-snowy", "dzien-sunny", "noc-cloudy", "noc-fog", "noc-lightning-rainy", "noc-partlycloudy", "noc-rainy", "noc-snowy", "noc-sunny", "zloto-cloudy", "zloto-fog", "zloto-lightning-rainy", "zloto-partlycloudy", "zloto-rainy", "zloto-snowy", "zloto-sunny", "zmierzch-cloudy", "zmierzch-fog", "zmierzch-lightning-rainy", "zmierzch-partlycloudy", "zmierzch-rainy", "zmierzch-snowy", "zmierzch-sunny"]);

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
      const surowa = st.attributes?.current_position;
      if (typeof surowa === "number" && poprzedni && s !== poprzedni && (s === "closed" && surowa >= 99 || s === "open" && surowa <= 1)) {
        const cel = s === "open" !== !!odwroc ? 100 : 0;
        if (!this.nauka) this.nauka = { t: teraz, p: this.widac };
        if (!this.komenda || this.komenda.stop) {
          this.cel = cel;
          this.komenda = null;
          this.dociagnij = false;
        }
        return;
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
        this.dociagnij = !k && Math.abs(p - this.widac) <= 3;
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
  function pogodaZInternetu(h, gotowe2) {
    const lat = h?.config?.latitude, lon = h?.config?.longitude;
    if (lat == null || lon == null) return null;
    if (Date.now() - NET.t < 15 * 6e4) return NET.dane;
    NET.czeka.add(gotowe2);
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
      taras: "Taras i ogród",
      pionowe: "Pionowe i zasłony",
      brama: "Brama i garaż",
      bramy: "Bramy wjazdowe",
      garaze: "Bramy garażowe",
      dach: "Okna dachowe",
      dachowe: "Osłony okien dachowych",
      markizy: "Markizy",
      pergole: "Pergole i zadaszenia",
      okna: "Okna i świetliki z napędem",
      moskitiery: "Moskitiery",
      zscreen: "Screeny",
      okiennice: "Okiennice",
      ekrany: "Ekrany",
      szlabany: "Szlabany"
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
      natynkowa: "Roleta natynkowa (SK)",
      podtynkowa: "Roleta podtynkowa (SP)",
      zewnetrzna: "Roleta nadstawna (SKN)",
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
      roletowa: "Brama roletowa",
      roleta_zip_wew: "Roleta z prowadnicami",
      bambusowa: "Roleta bambusowa",
      plisa_gora_dol: "Plisa góra-dół",
      zaslona_wave: "Zasłona fala (wave)",
      firana: "Firana na szynie",
      panel: "Panele japońskie",
      ekran: "Ekran projekcyjny",
      dach_dkl: "Roleta zaciemniająca (DKL)",
      dach_ssl: "Roleta zewnętrzna solarna (SSL)",
      dachowa: "Roleta zewnętrzna (ARZ)",
      dach_fhb: "Roleta rzymska (FHB)",
      dach_msl: "Markiza solarna (MSL / MHL)",
      markizeta_dach: "Markiza zewnętrzna (AMZ)",
      dach_pal: "Żaluzja (PAL)",
      dach_fhl: "Roleta plisowana (FHL)",
      dach_dn: "Roleta dzień/noc w kasecie",
      natynkowa_okragla: "Roleta natynkowa okrągła (SKO)",
      adaptacyjna: "Roleta adaptacyjna (na ramę)",
      roleta_moskitiera: "Roleta z moskitierą",
      ekstrudowana: "Roleta antywłamaniowa",
      roleta_drzwi: "Roleta na drzwi tarasowe",
      fasadowa_f80: "Żaluzja fasadowa F80 (płaska)",
      markizoleta: "Markizoleta (screen z wysięgiem)",
      okiennice: "Okiennice",
      okiennice_przesuwne: "Okiennice przesuwne",
      markiza_otwarta: "Markiza otwarta (bez kasety)",
      markiza_polkasetowa: "Markiza półkasetowa",
      markiza_kasetowa: "Markiza kasetowa",
      markiza_volant: "Markiza z opuszczaną falbaną (volant)",
      markiza_koszowa: "Markiza koszowa",
      markiza_wolnostojaca: "Markiza wolnostojąca (ogrodowa)",
      markiza_zimowa: "Markiza na ogród zimowy",
      markizeta: "Markiza okienna (markizeta)",
      markiza_balkonowa: "Markiza balkonowa zaciskowa",
      markiza_pionowa: "Markiza pionowa balkonowa",
      markiza_boczna: "Markiza boczna (parawan)",
      zagiel: "Żagiel zwijany",
      parasol: "Parasol ogrodowy",
      pergola: "Pergola bioklimatyczna (lamele)",
      pergola_tkanina: "Pergola z dachem z tkaniny",
      zadaszenie: "Zadaszenie tarasu",
      screen_taras: "Screen tarasowy",
      okno_silownik: "Okno z siłownikiem",
      okno_dachowe: "Okno dachowe otwierane",
      okno_plaskie: "Okno do dachu płaskiego",
      swietlik: "Świetlik / klapa dachowa",
      wylaz: "Wyłaz dachowy",
      moskitiera: "Moskitiera rolowana",
      moskitiera_plisa_okno: "Moskitiera plisowana okienna",
      moskitiera_drzwi: "Moskitiera plisowana drzwiowa",
      moskitiera_zip_drzwi: "Moskitiera rolowana drzwiowa",
      furtka: "Furtka",
      garaz_boczna: "Brama segmentowa boczna",
      garaz_skrzydlowa: "Brama garażowa dwuskrzydłowa",
      szlaban: "Szlaban"
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
      powod: "Powód ruchu",
      wyglad: "Wygląd"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Krok {0} z {1}",
      zamknij: "Zamknij",
      wstecz: "Wstecz",
      dalej: "Dalej",
      zapisz: "Zapisz",
      gotowe: "Gotowe",
      kroki: {
        silnik: "Urządzenie",
        uklad: "Układ",
        rodzaj: "Rodzaj",
        kolory: "Kolory",
        przypisz: "Pola",
        czujniki: "Czujniki",
        auto: "Automatyka",
        stoper: "Czas",
        dzwonek: "Powiadomienia",
        gotowe: "Gotowe"
      },
      pytania: {
        silnik: "Którą osłonę dodajesz?",
        uklad: "Jak wygląda okno?",
        rodzaj: "Co wisi na oknie?",
        rodzajBrama: "Jaka to brama?",
        kolory: "Kolory",
        przypisz: "Dotknij pole okna",
        czujniki: "Co Motor HA wie o domu",
        auto: "Co ma się dziać samo",
        stoper: "Czas przejazdu",
        dzwonek: "Gdzie i o czym powiadamiać",
        gotowe: "Gotowe"
      },
      podpisy: {
        silnik: "Wszystkie osłony z Home Assistanta. Użyte już w innym urządzeniu mają podpis.",
        uklad: "Dotknij najbliższy układ.",
        przypisz: "Każde pole: silnik i czujnik. Podpowiedzi są już wpisane.",
        czujniki: "Znalezione w pokoju i w domu. Dotknij, żeby wyłączyć albo zmienić.",
        auto: "Nic nie rusza samo, dopóki nie włączysz.",
        stoper: "Osłony wyjadą, zjadą i wyjadą jeszcze raz. Rysunek będzie jechał w tym tempie.",
        gotowe: "Tak będzie wyglądać karta na panelu."
      },
      wykryty: "{0} wykryty. Pozostałe osłony z tego pokoju zaznaczone same.",
      brakOslon: "Nie znalazłem wolnych osłon. Dodaj silnik do Home Assistanta.",
      uklady: {
        u1: "1 skrzydło",
        u2: "2 skrzydła",
        u3: "3 skrzydła",
        u4: "2 + naświetla",
        u5: "Okno + drzwi",
        u6: "Drzwi tarasowe",
        u7: "Duże środek",
        u8: "Siatka 2 × 2",
        wlasny: "Własny"
      },
      wlasnyTytul: "Własny układ · przeciągnij linie i dół okna",
      wPoprzek: "Podziel w poprzek",
      wzdluz: "Podziel wzdłuż",
      usun: "Usuń pole",
      wlasnyPodpis: "Dotknij pole, potem podziel albo usuń. Do 4 kolumn i 3 pól w kolumnie.",
      zSzablonu: "Albo zacznij od szablonu",
      oslona: "Osłona",
      rama: "Rama",
      pole: "Pole {0}",
      silnikPola: "Silnik",
      czujnikPola: "Czujnik okna",
      bezCzujnika: "bez czujnika",
      bezCzujnikaOkna: "bez czujnika okna",
      wybierzSilnik: "Dotknij, żeby wybrać silnik",
      gdyOtwarte: "Gdy czujnik pokazuje otwarte",
      uchyl: "uchylone",
      otworz: "otwarte",
      czujniki: {
        okno: "Czujniki okna",
        slonce: "Słońce",
        pogoda: "Pogoda",
        temp: "Temperatura na zewnątrz",
        obecnosc: "Ktoś w pokoju",
        wiatr: "Wiatr",
        deszcz: "Deszcz",
        foto: "Fotokomórka bramy"
      },
      slonceOpis: "Pozycja słońca z Home Assistanta",
      nieZnalazlem: "Nie znalazłem w domu",
      nieUzywaj: "Nie używaj",
      okienBrak: "Dotknij, żeby przypisać do pól",
      auto: {
        rano: "Rano otwórz",
        wieczor: "Wieczorem zamknij",
        slonce: "Chroń przed słońcem",
        blokada: "Nie zamykaj na otwarte okno",
        wietrzenie: "Uchylone okno = podnieś osłonę",
        wiatr: "Silny wiatr = zwiń",
        deszcz: "Deszcz = zwiń"
      },
      oGodz: "o {0}",
      oWschodzie: "o wschodzie słońca",
      oZachodzie: "o zachodzie słońca",
      zeSloncem: "Według słońca",
      zaslon: "zasłoń do {0} % w upał",
      okienne: "czujniki okna",
      wiatrOpis: "od {0} km/h",
      deszczOpis: "markiza i żaluzje fasadowe",
      strona: "Okno patrzy na",
      strony: {
        n: "północ",
        e: "wschód",
        s: "południe",
        w: "zachód"
      },
      autoPodpis: "Wiatr i deszcz pojawią się tu, gdy dodasz takie czujniki albo pogodę.",
      zmierz: "Zmierz teraz",
      zmierzZnow: "Zmierz jeszcze raz",
      mierze: "Mierzę…",
      pomin: "Możesz pominąć i zmierzyć później przyciskiem „Kalibruj” przy urządzeniu.",
      nieOdp: "Nie odpowiada: {0}",
      odRazu: "Silnik melduje koniec od razu. Wpisz prędkość silnika albo pomiń.",
      bladPomiaru: "Pomiar się nie udał. Spróbuj jeszcze raz.",
      powiadom: {
        nie_odpowiada: "Osłona nie odpowiada",
        nie_dojechala: "Nie dojechała do końca",
        bateria: "Słaba bateria",
        czujnik: "Czujnik nie odpowiada",
        automatyka: "Automatyka ruszyła osłonę",
        brama_otwarta: "Brama otwarta za długo",
        brama_niedomknieta: "Brama niedomknięta",
        przeszkoda: "Przeszkoda w bramie"
      },
      powiadomOpis: {
        nie_odpowiada: "np. silnik bez zasilania",
        nie_dojechala: "stanęła w połowie",
        bateria: "silnik albo czujnik okna",
        czujnik: "czujnik z kreatora",
        automatyka: "z powodem ruchu",
        brama_otwarta: "po kilku minutach",
        brama_niedomknieta: "stanęła w połowie",
        przeszkoda: "fotokomórka"
      },
      telefon: "Telefon (aplikacja HA)",
      brakTelefonu: "Bez telefonu powiadomienia są tylko w Home Assistancie.",
      naPanel: "Dodaj na panel",
      nazwa: "Nazwa",
      zapisano: "Zapisano ✓",
      wszystkie: "Pokaż wszystkie",
      prog: "Próg",
      pozycja: "Pozycja",
      odTemp: "od temp.",
      zrodlo: "Źródło",
      przypiszPodpis: "Dotknij skrzydła na rysunku: wybierz silnik i czujnik okna.",
      wschodSlonca: "Wschód słońca",
      zachodSlonca: "Zachód słońca",
      godzina: "Godzina",
      przesuniecie: "Przesunięcie",
      poWsch: "{0} min po wschodzie",
      przedWsch: "{0} min przed wschodem",
      poZach: "{0} min po zachodzie",
      przedZach: "{0} min przed zachodem",
      oknaWieczorem: "Wieczorem przy czujnikach okien",
      nieZjedzie: "nie zjedzie",
      zjedzieDo: "zjedzie do {0} %",
      zjedzieNormalnie: "zjedzie normalnie",
      pozniej: "Gdy zamkniesz okno, osłona dojedzie sama.",
      kazdy: "Każdy silnik osobno",
      slupek: "Słupek / mur",
      przegPion: "Przegroda pionowa",
      przegPoz: "Przegroda pozioma",
      obokPola: "obok pola {0}",
      podPolem: "pod polem {0}",
      przegRodzaj: {
        brak: "Brak",
        slupek: "Słupek",
        belka: "Belka",
        sciana: "Ściana"
      },
      szerokosc: "Szerokość",
      dodajSciane: "🧱 Ściana między oknami",
      sciana: "Ściana",
      sciany: {
        biala: "biała",
        bezowa: "beżowa",
        szara: "szara",
        cegla: "cegła",
        grafit: "grafit"
      },
      belka: "Belka",
      brak: "brak",
      wUrzadzeniu: "też w: {0}",
      grupa: "grupa",
      calyPokoj: "Cały pokój: {0}",
      bezPokoju: "Bez pokoju",
      pojedyncze: "Pojedyncze",
      grupaIle: "grupa · {0} skrzydła",
      przeciagnij: "Przeciągnij, żeby zamienić",
      zamienPodpis: "Złap skrzydło na rysunku albo ⠿ przy wierszu i upuść na innym – zamienią się miejscami.",
      jakZaleca: "Ustaw jak zaleca",
      caleOkno: "Całe okno",
      rodzajCalosc: "Wybierz pole, żeby dać mu inny rodzaj albo kolor.",
      rodzajPole: "Teraz ustawiasz tylko pole {0}."
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
      taras: "Patio and garden",
      pionowe: "Vertical and curtains",
      brama: "Gate and garage",
      bramy: "Driveway gates",
      garaze: "Garage doors",
      dach: "Roof windows",
      dachowe: "Roof window covers",
      markizy: "Awnings",
      pergole: "Pergolas and roofs",
      okna: "Motorised windows and skylights",
      moskitiery: "Insect screens",
      zscreen: "Screens",
      okiennice: "Shutters",
      ekrany: "Screens",
      szlabany: "Barriers"
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
      roletowa: "Roller door",
      roleta_zip_wew: "Roller blind with side guides",
      bambusowa: "Bamboo blind",
      plisa_gora_dol: "Top-down pleated blind",
      zaslona_wave: "Wave curtain",
      firana: "Sheer curtain on track",
      panel: "Japanese panels",
      ekran: "Projection screen",
      dach_dkl: "Blackout blind (DKL)",
      dach_ssl: "Solar roller shutter (SSL)",
      dachowa: "Roof roller shutter (ARZ)",
      dach_fhb: "Roman blind (FHB)",
      dach_msl: "Solar awning blind (MSL / MHL)",
      markizeta_dach: "Roof awning blind (AMZ)",
      dach_pal: "Venetian blind (PAL)",
      dach_fhl: "Pleated blind (FHL)",
      dach_dn: "Day/night blind in cassette",
      natynkowa_okragla: "Surface shutter, round box (SKO)",
      adaptacyjna: "Frame-mounted shutter",
      roleta_moskitiera: "Shutter with insect screen",
      ekstrudowana: "Security roller shutter",
      roleta_drzwi: "Patio door shutter",
      fasadowa_f80: "External venetian F80 (flat)",
      markizoleta: "Drop-arm screen",
      okiennice: "Shutters",
      okiennice_przesuwne: "Sliding shutters",
      markiza_otwarta: "Open awning (no cassette)",
      markiza_polkasetowa: "Semi-cassette awning",
      markiza_kasetowa: "Full-cassette awning",
      markiza_volant: "Awning with drop valance",
      markiza_koszowa: "Dome awning",
      markiza_wolnostojaca: "Freestanding garden awning",
      markiza_zimowa: "Conservatory awning",
      markizeta: "Window awning",
      markiza_balkonowa: "Clamp-on balcony awning",
      markiza_pionowa: "Vertical balcony awning",
      markiza_boczna: "Side awning",
      zagiel: "Retractable shade sail",
      parasol: "Garden umbrella",
      pergola: "Bioclimatic louvred pergola",
      pergola_tkanina: "Fabric-roof pergola",
      zadaszenie: "Patio roof",
      screen_taras: "Patio screen",
      okno_silownik: "Window with actuator",
      okno_dachowe: "Opening roof window",
      okno_plaskie: "Flat-roof window",
      swietlik: "Skylight dome",
      wylaz: "Roof hatch",
      moskitiera: "Roller insect screen",
      moskitiera_plisa_okno: "Pleated window insect screen",
      moskitiera_drzwi: "Pleated door insect screen",
      moskitiera_zip_drzwi: "Roller door insect screen",
      furtka: "Garden gate",
      garaz_boczna: "Side sectional door",
      garaz_skrzydlowa: "Side-hinged garage door",
      szlaban: "Barrier gate"
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
      powod: "Reason for movement",
      wyglad: "Appearance"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Step {0} of {1}",
      zamknij: "Close",
      wstecz: "Back",
      dalej: "Next",
      zapisz: "Save",
      gotowe: "Done",
      kroki: {
        silnik: "Device",
        uklad: "Layout",
        rodzaj: "Type",
        kolory: "Colours",
        przypisz: "Panes",
        czujniki: "Sensors",
        auto: "Automation",
        stoper: "Time",
        dzwonek: "Notifications",
        gotowe: "Done"
      },
      pytania: {
        silnik: "Which cover are you adding?",
        uklad: "What does the window look like?",
        rodzaj: "What hangs on the window?",
        rodzajBrama: "What kind of gate is it?",
        kolory: "Colours",
        przypisz: "Tap a pane of the window",
        czujniki: "What Motor HA knows about the home",
        auto: "What should happen on its own",
        stoper: "Travel time",
        dzwonek: "Where and what to notify about",
        gotowe: "Done"
      },
      podpisy: {
        silnik: "All covers from Home Assistant. Ones already used in another device are labelled.",
        uklad: "Tap the closest layout.",
        przypisz: "Each pane: a motor and a sensor. Suggestions are already filled in.",
        czujniki: "Found in the room and in the home. Tap to turn off or change.",
        auto: "Nothing moves on its own until you turn it on.",
        stoper: "The covers go up, down and up again. The drawing will move at this pace.",
        gotowe: "This is how the card will look on the dashboard."
      },
      wykryty: "{0} detected. The other covers in this room are selected automatically.",
      brakOslon: "No free covers found. Add a motor to Home Assistant.",
      uklady: {
        u1: "1 sash",
        u2: "2 sashes",
        u3: "3 sashes",
        u4: "2 + transoms",
        u5: "Window + door",
        u6: "Patio door",
        u7: "Large middle",
        u8: "2 × 2 grid",
        wlasny: "Custom"
      },
      wlasnyTytul: "Custom layout · drag the lines and the bottom of the window",
      wPoprzek: "Split across",
      wzdluz: "Split lengthwise",
      usun: "Remove pane",
      wlasnyPodpis: "Tap a pane, then split or remove it. Up to 4 columns and 3 panes in a column.",
      zSzablonu: "Or start from a template",
      oslona: "Cover",
      rama: "Frame",
      pole: "Pane {0}",
      silnikPola: "Motor",
      czujnikPola: "Window sensor",
      bezCzujnika: "no sensor",
      bezCzujnikaOkna: "no window sensor",
      wybierzSilnik: "Tap to choose a motor",
      gdyOtwarte: "When the sensor shows open",
      uchyl: "tilted",
      otworz: "open",
      czujniki: {
        okno: "Window sensors",
        slonce: "Sun",
        pogoda: "Weather",
        temp: "Outdoor temperature",
        obecnosc: "Someone in the room",
        wiatr: "Wind",
        deszcz: "Rain",
        foto: "Gate photocell"
      },
      slonceOpis: "Sun position from Home Assistant",
      nieZnalazlem: "Not found in the home",
      nieUzywaj: "Don’t use",
      okienBrak: "Tap to assign to panes",
      auto: {
        rano: "Open in the morning",
        wieczor: "Close in the evening",
        slonce: "Protect from the sun",
        blokada: "Don’t close on an open window",
        wietrzenie: "Tilted window = raise the cover",
        wiatr: "Strong wind = retract",
        deszcz: "Rain = retract"
      },
      oGodz: "at {0}",
      oWschodzie: "at sunrise",
      oZachodzie: "at sunset",
      zeSloncem: "Follow the sun",
      zaslon: "cover {0} % in hot weather",
      okienne: "window sensors",
      wiatrOpis: "from {0} km/h",
      deszczOpis: "awning and external venetian blinds",
      strona: "Window faces",
      strony: {
        n: "north",
        e: "east",
        s: "south",
        w: "west"
      },
      autoPodpis: "Wind and rain appear here when you add such sensors or weather.",
      zmierz: "Measure now",
      zmierzZnow: "Measure again",
      mierze: "Measuring…",
      pomin: "You can skip this and measure later with the device’s “Calibrate” button.",
      nieOdp: "Not responding: {0}",
      odRazu: "The motor reports the end right away. Set the motor speed or skip.",
      bladPomiaru: "The measurement failed. Try again.",
      powiadom: {
        nie_odpowiada: "Cover not responding",
        nie_dojechala: "Didn’t reach the end",
        bateria: "Low battery",
        czujnik: "Sensor not responding",
        automatyka: "Automation moved the cover",
        brama_otwarta: "Gate open too long",
        brama_niedomknieta: "Gate not fully closed",
        przeszkoda: "Obstacle in the gate"
      },
      powiadomOpis: {
        nie_odpowiada: "e.g. motor without power",
        nie_dojechala: "stopped halfway",
        bateria: "motor or window sensor",
        czujnik: "sensor from the wizard",
        automatyka: "with the reason",
        brama_otwarta: "after a few minutes",
        brama_niedomknieta: "stopped halfway",
        przeszkoda: "photocell"
      },
      telefon: "Phone (HA app)",
      brakTelefonu: "Without a phone, notifications appear only in Home Assistant.",
      naPanel: "Add to dashboard",
      nazwa: "Name",
      zapisano: "Saved ✓",
      wszystkie: "Show all",
      prog: "Threshold",
      pozycja: "Position",
      odTemp: "from temp.",
      zrodlo: "Source",
      przypiszPodpis: "Tap a sash in the drawing to pick its motor and window sensor.",
      wschodSlonca: "Sunrise",
      zachodSlonca: "Sunset",
      godzina: "Time",
      przesuniecie: "Offset",
      poWsch: "{0} min after sunrise",
      przedWsch: "{0} min before sunrise",
      poZach: "{0} min after sunset",
      przedZach: "{0} min before sunset",
      oknaWieczorem: "In the evening, with window sensors",
      nieZjedzie: "won't close",
      zjedzieDo: "closes to {0} %",
      zjedzieNormalnie: "closes as usual",
      pozniej: "Once you close the window, the cover finishes on its own.",
      kazdy: "Each motor separately",
      slupek: "Mullion / wall",
      przegPion: "Vertical divider",
      przegPoz: "Horizontal divider",
      obokPola: "next to pane {0}",
      podPolem: "below pane {0}",
      przegRodzaj: {
        brak: "None",
        slupek: "Mullion",
        belka: "Transom",
        sciana: "Wall"
      },
      szerokosc: "Width",
      dodajSciane: "🧱 Wall between windows",
      sciana: "Wall",
      sciany: {
        biala: "white",
        bezowa: "beige",
        szara: "grey",
        cegla: "brick",
        grafit: "graphite"
      },
      belka: "Transom",
      brak: "none",
      wUrzadzeniu: "also in: {0}",
      grupa: "group",
      calyPokoj: "Whole room: {0}",
      bezPokoju: "No room",
      pojedyncze: "Single",
      grupaIle: "group · {0} sashes",
      przeciagnij: "Drag to swap",
      zamienPodpis: "Grab a sash in the drawing or ⠿ on a row and drop it on another to swap them.",
      jakZaleca: "Set as recommended",
      caleOkno: "Whole window",
      rodzajCalosc: "Choose a pane to give it a different type or colour.",
      rodzajPole: "You are now setting pane {0} only."
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
      taras: "Terrasse und Garten",
      pionowe: "Vertikal und Vorhänge",
      brama: "Tor und Garage",
      bramy: "Einfahrtstore",
      garaze: "Garagentore",
      dach: "Dachfenster",
      dachowe: "Dachfenster-Beschattung",
      markizy: "Markisen",
      pergole: "Pergolen und Überdachungen",
      okna: "Fenster und Lichtkuppeln mit Antrieb",
      moskitiery: "Insektenschutz",
      zscreen: "Screens",
      okiennice: "Fensterläden",
      ekrany: "Leinwände",
      szlabany: "Schranken"
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
      roletowa: "Rolltor",
      roleta_zip_wew: "Rollo mit Seitenführung",
      bambusowa: "Bambusrollo",
      plisa_gora_dol: "Plissee von oben und unten",
      zaslona_wave: "Wellenvorhang",
      firana: "Gardine auf Schiene",
      panel: "Flächenvorhang",
      ekran: "Leinwand",
      dach_dkl: "Verdunkelungsrollo (DKL)",
      dach_ssl: "Solar-Rollladen (SSL)",
      dachowa: "Dach-Rollladen (ARZ)",
      dach_fhb: "Raffrollo (FHB)",
      dach_msl: "Solar-Hitzeschutz (MSL / MHL)",
      markizeta_dach: "Hitzeschutz-Markise (AMZ)",
      dach_pal: "Jalousie (PAL)",
      dach_fhl: "Plissee (FHL)",
      dach_dn: "Doppelrollo in Kassette",
      natynkowa_okragla: "Vorbaurollladen rund (SKO)",
      adaptacyjna: "Aufsatz-Rollladen am Rahmen",
      roleta_moskitiera: "Rollladen mit Insektenschutz",
      ekstrudowana: "Einbruchschutz-Rollladen",
      roleta_drzwi: "Terrassentür-Rollladen",
      fasadowa_f80: "Raffstore F80 (flach)",
      markizoleta: "Markisolette",
      okiennice: "Fensterläden",
      okiennice_przesuwne: "Schiebeläden",
      markiza_otwarta: "Offene Markise",
      markiza_polkasetowa: "Halbkassettenmarkise",
      markiza_kasetowa: "Kassettenmarkise",
      markiza_volant: "Markise mit Volant-Rollo",
      markiza_koszowa: "Korbmarkise",
      markiza_wolnostojaca: "Freistehende Markise",
      markiza_zimowa: "Wintergartenmarkise",
      markizeta: "Fenstermarkise",
      markiza_balkonowa: "Klemmmarkise",
      markiza_pionowa: "Senkrechtmarkise",
      markiza_boczna: "Seitenmarkise",
      zagiel: "Aufrollbares Sonnensegel",
      parasol: "Sonnenschirm",
      pergola: "Lamellen-Pergola",
      pergola_tkanina: "Pergola mit Stoffdach",
      zadaszenie: "Terrassendach",
      screen_taras: "Terrassen-Screen",
      okno_silownik: "Fenster mit Antrieb",
      okno_dachowe: "Dachfenster mit Antrieb",
      okno_plaskie: "Flachdachfenster",
      swietlik: "Lichtkuppel",
      wylaz: "Dachausstieg",
      moskitiera: "Insektenschutzrollo",
      moskitiera_plisa_okno: "Plissee-Insektenschutz Fenster",
      moskitiera_drzwi: "Plissee-Insektenschutz Tür",
      moskitiera_zip_drzwi: "Insektenschutzrollo Tür",
      furtka: "Gartentor",
      garaz_boczna: "Seiten-Sectionaltor",
      garaz_skrzydlowa: "Flügel-Garagentor",
      szlaban: "Schranke"
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
      powod: "Grund der Bewegung",
      wyglad: "Aussehen"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Schritt {0} von {1}",
      zamknij: "Schließen",
      wstecz: "Zurück",
      dalej: "Weiter",
      zapisz: "Speichern",
      gotowe: "Fertig",
      kroki: {
        silnik: "Gerät",
        uklad: "Aufteilung",
        rodzaj: "Art",
        kolory: "Farben",
        przypisz: "Felder",
        czujniki: "Sensoren",
        auto: "Automatik",
        stoper: "Zeit",
        dzwonek: "Benachrichtigungen",
        gotowe: "Fertig"
      },
      pytania: {
        silnik: "Welchen Behang fügst du hinzu?",
        uklad: "Wie sieht das Fenster aus?",
        rodzaj: "Was hängt am Fenster?",
        rodzajBrama: "Welche Art von Tor ist es?",
        kolory: "Farben",
        przypisz: "Tippe auf ein Fensterfeld",
        czujniki: "Was Motor HA über das Zuhause weiß",
        auto: "Was von selbst passieren soll",
        stoper: "Fahrzeit",
        dzwonek: "Wohin und worüber benachrichtigen",
        gotowe: "Fertig"
      },
      podpisy: {
        silnik: "Alle Beschattungen aus Home Assistant. Bereits in einem anderen Gerät genutzte sind markiert.",
        uklad: "Tippe auf die ähnlichste Aufteilung.",
        przypisz: "Jedes Feld: ein Motor und ein Sensor. Vorschläge sind schon eingetragen.",
        czujniki: "Im Raum und im Zuhause gefunden. Tippe zum Ausschalten oder Ändern.",
        auto: "Nichts bewegt sich von selbst, bis du es einschaltest.",
        stoper: "Die Behänge fahren hoch, runter und wieder hoch. Die Zeichnung bewegt sich in diesem Tempo.",
        gotowe: "So sieht die Karte im Dashboard aus."
      },
      wykryty: "{0} erkannt. Die anderen Behänge in diesem Raum sind automatisch ausgewählt.",
      brakOslon: "Keine freien Behänge gefunden. Füge einen Motor zu Home Assistant hinzu.",
      uklady: {
        u1: "1 Flügel",
        u2: "2 Flügel",
        u3: "3 Flügel",
        u4: "2 + Oberlichter",
        u5: "Fenster + Tür",
        u6: "Terrassentür",
        u7: "Groß in der Mitte",
        u8: "Raster 2 × 2",
        wlasny: "Eigene"
      },
      wlasnyTytul: "Eigene Aufteilung · ziehe die Linien und den unteren Fensterrand",
      wPoprzek: "Quer teilen",
      wzdluz: "Längs teilen",
      usun: "Feld entfernen",
      wlasnyPodpis: "Tippe auf ein Feld, dann teile oder entferne es. Bis zu 4 Spalten und 3 Felder pro Spalte.",
      zSzablonu: "Oder starte mit einer Vorlage",
      oslona: "Behang",
      rama: "Rahmen",
      pole: "Feld {0}",
      silnikPola: "Motor",
      czujnikPola: "Fenstersensor",
      bezCzujnika: "ohne Sensor",
      bezCzujnikaOkna: "ohne Fenstersensor",
      wybierzSilnik: "Tippe, um einen Motor zu wählen",
      gdyOtwarte: "Wenn der Sensor offen zeigt",
      uchyl: "gekippt",
      otworz: "offen",
      czujniki: {
        okno: "Fenstersensoren",
        slonce: "Sonne",
        pogoda: "Wetter",
        temp: "Außentemperatur",
        obecnosc: "Jemand im Raum",
        wiatr: "Wind",
        deszcz: "Regen",
        foto: "Lichtschranke des Tors"
      },
      slonceOpis: "Sonnenstand aus Home Assistant",
      nieZnalazlem: "Im Zuhause nicht gefunden",
      nieUzywaj: "Nicht verwenden",
      okienBrak: "Tippe, um Feldern zuzuweisen",
      auto: {
        rano: "Morgens öffnen",
        wieczor: "Abends schließen",
        slonce: "Vor Sonne schützen",
        blokada: "Bei offenem Fenster nicht schließen",
        wietrzenie: "Gekipptes Fenster = Behang anheben",
        wiatr: "Starker Wind = einfahren",
        deszcz: "Regen = einfahren"
      },
      oGodz: "um {0}",
      oWschodzie: "bei Sonnenaufgang",
      oZachodzie: "bei Sonnenuntergang",
      zeSloncem: "Nach der Sonne",
      zaslon: "bei Hitze {0} % schließen",
      okienne: "Fenstersensoren",
      wiatrOpis: "ab {0} km/h",
      deszczOpis: "Markise und Raffstores",
      strona: "Fenster zeigt nach",
      strony: {
        n: "Norden",
        e: "Osten",
        s: "Süden",
        w: "Westen"
      },
      autoPodpis: "Wind und Regen erscheinen hier, wenn du solche Sensoren oder Wetter hinzufügst.",
      zmierz: "Jetzt messen",
      zmierzZnow: "Erneut messen",
      mierze: "Messung läuft…",
      pomin: "Du kannst das überspringen und später mit der Taste „Kalibrieren“ des Geräts messen.",
      nieOdp: "Antwortet nicht: {0}",
      odRazu: "Der Motor meldet das Ende sofort. Stelle die Motorgeschwindigkeit ein oder überspringe.",
      bladPomiaru: "Die Messung ist fehlgeschlagen. Versuche es erneut.",
      powiadom: {
        nie_odpowiada: "Behang antwortet nicht",
        nie_dojechala: "Ende nicht erreicht",
        bateria: "Batterie schwach",
        czujnik: "Sensor antwortet nicht",
        automatyka: "Automatik hat den Behang bewegt",
        brama_otwarta: "Tor zu lange offen",
        brama_niedomknieta: "Tor nicht ganz geschlossen",
        przeszkoda: "Hindernis im Tor"
      },
      powiadomOpis: {
        nie_odpowiada: "z. B. Motor ohne Strom",
        nie_dojechala: "auf halbem Weg stehen geblieben",
        bateria: "Motor oder Fenstersensor",
        czujnik: "Sensor aus dem Assistenten",
        automatyka: "mit dem Grund",
        brama_otwarta: "nach einigen Minuten",
        brama_niedomknieta: "auf halbem Weg stehen geblieben",
        przeszkoda: "Lichtschranke"
      },
      telefon: "Telefon (HA-App)",
      brakTelefonu: "Ohne Telefon erscheinen Benachrichtigungen nur in Home Assistant.",
      naPanel: "Zum Dashboard hinzufügen",
      nazwa: "Name",
      zapisano: "Gespeichert ✓",
      wszystkie: "Alle anzeigen",
      prog: "Schwelle",
      pozycja: "Position",
      odTemp: "ab Temp.",
      zrodlo: "Quelle",
      przypiszPodpis: "Tippe auf einen Flügel in der Zeichnung: Motor und Fenstersensor wählen.",
      wschodSlonca: "Sonnenaufgang",
      zachodSlonca: "Sonnenuntergang",
      godzina: "Uhrzeit",
      przesuniecie: "Versatz",
      poWsch: "{0} Min. nach Sonnenaufgang",
      przedWsch: "{0} Min. vor Sonnenaufgang",
      poZach: "{0} Min. nach Sonnenuntergang",
      przedZach: "{0} Min. vor Sonnenuntergang",
      oknaWieczorem: "Abends mit Fenstersensoren",
      nieZjedzie: "fährt nicht zu",
      zjedzieDo: "fährt auf {0} %",
      zjedzieNormalnie: "fährt normal zu",
      pozniej: "Sobald das Fenster zu ist, fährt der Behang von selbst weiter.",
      kazdy: "Jeder Motor einzeln",
      slupek: "Pfosten / Wand",
      przegPion: "Senkrechte Trennung",
      przegPoz: "Waagerechte Trennung",
      obokPola: "neben Feld {0}",
      podPolem: "unter Feld {0}",
      przegRodzaj: {
        brak: "Keine",
        slupek: "Pfosten",
        belka: "Kämpfer",
        sciana: "Wand"
      },
      szerokosc: "Breite",
      dodajSciane: "🧱 Wand zwischen Fenstern",
      sciana: "Wand",
      sciany: {
        biala: "weiß",
        bezowa: "beige",
        szara: "grau",
        cegla: "Ziegel",
        grafit: "Graphit"
      },
      belka: "Kämpfer",
      brak: "keiner",
      wUrzadzeniu: "auch in: {0}",
      grupa: "Gruppe",
      calyPokoj: "Ganzer Raum: {0}",
      bezPokoju: "Ohne Raum",
      pojedyncze: "Einzeln",
      grupaIle: "Gruppe · {0} Flügel",
      przeciagnij: "Ziehen zum Tauschen",
      zamienPodpis: "Flügel in der Zeichnung oder ⠿ an einer Zeile greifen und auf einem anderen ablegen – sie tauschen die Plätze.",
      jakZaleca: "Wie empfohlen einstellen",
      caleOkno: "Ganzes Fenster",
      rodzajCalosc: "Wähle ein Feld, um ihm eine andere Art oder Farbe zu geben.",
      rodzajPole: "Du stellst jetzt nur Feld {0} ein."
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
      taras: "Terrasse et jardin",
      pionowe: "Verticaux et rideaux",
      brama: "Portail et garage",
      bramy: "Portails",
      garaze: "Portes de garage",
      dach: "Fenêtres de toit",
      dachowe: "Occultations de fenêtres de toit",
      markizy: "Stores bannes",
      pergole: "Pergolas et toitures",
      okna: "Fenêtres et lanterneaux motorisés",
      moskitiery: "Moustiquaires",
      zscreen: "Screens",
      okiennice: "Volets",
      ekrany: "Écrans",
      szlabany: "Barrières"
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
      roletowa: "Porte enroulable",
      roleta_zip_wew: "Store à guidage latéral",
      bambusowa: "Store en bambou",
      plisa_gora_dol: "Store plissé haut-bas",
      zaslona_wave: "Rideau à vague",
      firana: "Voilage sur rail",
      panel: "Panneaux japonais",
      ekran: "Écran de projection",
      dach_dkl: "Store occultant (DKL)",
      dach_ssl: "Volet roulant solaire (SSL)",
      dachowa: "Volet roulant de toit (ARZ)",
      dach_fhb: "Store bateau (FHB)",
      dach_msl: "Store extérieur solaire (MSL / MHL)",
      markizeta_dach: "Store extérieur (AMZ)",
      dach_pal: "Store vénitien (PAL)",
      dach_fhl: "Store plissé (FHL)",
      dach_dn: "Store jour/nuit à cassette",
      natynkowa_okragla: "Volet en applique arrondi (SKO)",
      adaptacyjna: "Volet adapté sur cadre",
      roleta_moskitiera: "Volet avec moustiquaire",
      ekstrudowana: "Volet anti-effraction",
      roleta_drzwi: "Volet de baie vitrée",
      fasadowa_f80: "Brise-soleil F80 (plat)",
      markizoleta: "Store à projection (markisolette)",
      okiennice: "Volets battants",
      okiennice_przesuwne: "Volets coulissants",
      markiza_otwarta: "Store banne ouvert",
      markiza_polkasetowa: "Store banne semi-coffre",
      markiza_kasetowa: "Store banne coffre",
      markiza_volant: "Store banne à lambrequin",
      markiza_koszowa: "Marquise corbeille",
      markiza_wolnostojaca: "Store banne autoportant",
      markiza_zimowa: "Store de véranda",
      markizeta: "Store à l'italienne",
      markiza_balkonowa: "Store de balcon à pince",
      markiza_pionowa: "Store vertical de balcon",
      markiza_boczna: "Store latéral",
      zagiel: "Voile d'ombrage enroulable",
      parasol: "Parasol de jardin",
      pergola: "Pergola bioclimatique",
      pergola_tkanina: "Pergola à toile",
      zadaszenie: "Toiture de terrasse",
      screen_taras: "Screen de terrasse",
      okno_silownik: "Fenêtre motorisée",
      okno_dachowe: "Fenêtre de toit motorisée",
      okno_plaskie: "Fenêtre pour toit plat",
      swietlik: "Lanterneau",
      wylaz: "Trappe de toit",
      moskitiera: "Moustiquaire enroulable",
      moskitiera_plisa_okno: "Moustiquaire plissée fenêtre",
      moskitiera_drzwi: "Moustiquaire plissée porte",
      moskitiera_zip_drzwi: "Moustiquaire enroulable porte",
      furtka: "Portillon",
      garaz_boczna: "Porte sectionnelle latérale",
      garaz_skrzydlowa: "Porte de garage battante",
      szlaban: "Barrière levante"
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
      powod: "Raison du mouvement",
      wyglad: "Apparence"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Étape {0} sur {1}",
      zamknij: "Fermer",
      wstecz: "Retour",
      dalej: "Suivant",
      zapisz: "Enregistrer",
      gotowe: "Terminé",
      kroki: {
        silnik: "Appareil",
        uklad: "Disposition",
        rodzaj: "Type",
        kolory: "Couleurs",
        przypisz: "Vantaux",
        czujniki: "Capteurs",
        auto: "Automatisme",
        stoper: "Durée",
        dzwonek: "Notifications",
        gotowe: "Terminé"
      },
      pytania: {
        silnik: "Quel store ajoutes-tu ?",
        uklad: "À quoi ressemble la fenêtre ?",
        rodzaj: "Qu’y a-t-il sur la fenêtre ?",
        rodzajBrama: "Quel type de portail ?",
        kolory: "Couleurs",
        przypisz: "Touche un vantail de la fenêtre",
        czujniki: "Ce que Motor HA sait de la maison",
        auto: "Ce qui doit se faire tout seul",
        stoper: "Durée de course",
        dzwonek: "Où et à propos de quoi notifier",
        gotowe: "Terminé"
      },
      podpisy: {
        silnik: "Tous les volets de Home Assistant. Ceux déjà utilisés dans un autre appareil sont signalés.",
        uklad: "Touche la disposition la plus proche.",
        przypisz: "Chaque vantail : un moteur et un capteur. Les suggestions sont déjà remplies.",
        czujniki: "Trouvé dans la pièce et dans la maison. Touche pour désactiver ou changer.",
        auto: "Rien ne bouge tout seul tant que tu ne l’actives pas.",
        stoper: "Les stores montent, descendent et remontent. Le dessin bougera à ce rythme.",
        gotowe: "Voici la carte telle qu’elle apparaîtra sur le tableau de bord."
      },
      wykryty: "{0} détecté. Les autres stores de cette pièce sont choisis automatiquement.",
      brakOslon: "Aucun store libre trouvé. Ajoute un moteur à Home Assistant.",
      uklady: {
        u1: "1 vantail",
        u2: "2 vantaux",
        u3: "3 vantaux",
        u4: "2 + impostes",
        u5: "Fenêtre + porte",
        u6: "Porte-fenêtre",
        u7: "Grand au milieu",
        u8: "Grille 2 × 2",
        wlasny: "Personnalisée"
      },
      wlasnyTytul: "Disposition perso · fais glisser les lignes et le bas de la fenêtre",
      wPoprzek: "Diviser en travers",
      wzdluz: "Diviser en long",
      usun: "Supprimer le vantail",
      wlasnyPodpis: "Touche un vantail, puis divise-le ou supprime-le. Jusqu’à 4 colonnes et 3 vantaux par colonne.",
      zSzablonu: "Ou pars d’un modèle",
      oslona: "Store",
      rama: "Cadre",
      pole: "Vantail {0}",
      silnikPola: "Moteur",
      czujnikPola: "Capteur de fenêtre",
      bezCzujnika: "sans capteur",
      bezCzujnikaOkna: "sans capteur de fenêtre",
      wybierzSilnik: "Touche pour choisir un moteur",
      gdyOtwarte: "Quand le capteur indique ouvert",
      uchyl: "oscillo-battant",
      otworz: "ouvert",
      czujniki: {
        okno: "Capteurs de fenêtre",
        slonce: "Soleil",
        pogoda: "Météo",
        temp: "Température extérieure",
        obecnosc: "Quelqu’un dans la pièce",
        wiatr: "Vent",
        deszcz: "Pluie",
        foto: "Cellule du portail"
      },
      slonceOpis: "Position du soleil depuis Home Assistant",
      nieZnalazlem: "Introuvable dans la maison",
      nieUzywaj: "Ne pas utiliser",
      okienBrak: "Touche pour attribuer aux vantaux",
      auto: {
        rano: "Ouvrir le matin",
        wieczor: "Fermer le soir",
        slonce: "Protéger du soleil",
        blokada: "Ne pas fermer si la fenêtre est ouverte",
        wietrzenie: "Fenêtre basculée = remonter le store",
        wiatr: "Vent fort = remonter",
        deszcz: "Pluie = remonter"
      },
      oGodz: "à {0}",
      oWschodzie: "au lever du soleil",
      oZachodzie: "au coucher du soleil",
      zeSloncem: "Selon le soleil",
      zaslon: "couvrir {0} % par forte chaleur",
      okienne: "capteurs de fenêtre",
      wiatrOpis: "dès {0} km/h",
      deszczOpis: "banne et brise-soleil",
      strona: "La fenêtre donne au",
      strony: {
        n: "nord",
        e: "est",
        s: "sud",
        w: "ouest"
      },
      autoPodpis: "Le vent et la pluie apparaissent ici quand tu ajoutes ces capteurs ou la météo.",
      zmierz: "Mesurer maintenant",
      zmierzZnow: "Mesurer à nouveau",
      mierze: "Mesure en cours…",
      pomin: "Tu peux passer et mesurer plus tard avec le bouton « Calibrer » de l’appareil.",
      nieOdp: "Ne répond pas : {0}",
      odRazu: "Le moteur signale la fin tout de suite. Règle la vitesse du moteur ou passe.",
      bladPomiaru: "La mesure a échoué. Réessaie.",
      powiadom: {
        nie_odpowiada: "Le store ne répond pas",
        nie_dojechala: "N’est pas allé au bout",
        bateria: "Batterie faible",
        czujnik: "Le capteur ne répond pas",
        automatyka: "L’automatisme a bougé le store",
        brama_otwarta: "Portail ouvert trop longtemps",
        brama_niedomknieta: "Portail mal fermé",
        przeszkoda: "Obstacle dans le portail"
      },
      powiadomOpis: {
        nie_odpowiada: "p. ex. moteur sans courant",
        nie_dojechala: "arrêté à mi-course",
        bateria: "moteur ou capteur de fenêtre",
        czujnik: "capteur de l’assistant",
        automatyka: "avec la raison",
        brama_otwarta: "après quelques minutes",
        brama_niedomknieta: "arrêté à mi-course",
        przeszkoda: "cellule photoélectrique"
      },
      telefon: "Téléphone (app HA)",
      brakTelefonu: "Sans téléphone, les notifications n’apparaissent que dans Home Assistant.",
      naPanel: "Ajouter au tableau de bord",
      nazwa: "Nom",
      zapisano: "Enregistré ✓",
      wszystkie: "Tout afficher",
      prog: "Seuil",
      pozycja: "Position",
      odTemp: "dès temp.",
      zrodlo: "Source",
      przypiszPodpis: "Touchez un vantail sur le dessin pour choisir son moteur et son capteur de fenêtre.",
      wschodSlonca: "Lever du soleil",
      zachodSlonca: "Coucher du soleil",
      godzina: "Heure",
      przesuniecie: "Décalage",
      poWsch: "{0} min après le lever",
      przedWsch: "{0} min avant le lever",
      poZach: "{0} min après le coucher",
      przedZach: "{0} min avant le coucher",
      oknaWieczorem: "Le soir, avec les capteurs de fenêtre",
      nieZjedzie: "ne descend pas",
      zjedzieDo: "descend à {0} %",
      zjedzieNormalnie: "descend normalement",
      pozniej: "Une fois la fenêtre fermée, le volet finit seul.",
      kazdy: "Chaque moteur séparément",
      slupek: "Meneau / mur",
      przegPion: "Séparation verticale",
      przegPoz: "Séparation horizontale",
      obokPola: "à côté du panneau {0}",
      podPolem: "sous le panneau {0}",
      przegRodzaj: {
        brak: "Aucune",
        slupek: "Meneau",
        belka: "Traverse",
        sciana: "Mur"
      },
      szerokosc: "Largeur",
      dodajSciane: "🧱 Mur entre les fenêtres",
      sciana: "Mur",
      sciany: {
        biala: "blanc",
        bezowa: "beige",
        szara: "gris",
        cegla: "brique",
        grafit: "graphite"
      },
      belka: "Traverse",
      brak: "aucun",
      wUrzadzeniu: "aussi dans : {0}",
      grupa: "groupe",
      calyPokoj: "Toute la pièce : {0}",
      bezPokoju: "Sans pièce",
      pojedyncze: "Individuels",
      grupaIle: "groupe · {0} vantaux",
      przeciagnij: "Glisser pour échanger",
      zamienPodpis: "Saisissez un vantail du dessin ou ⠿ d'une ligne et déposez-le sur un autre pour les échanger.",
      jakZaleca: "Régler comme recommandé",
      caleOkno: "Fenêtre entière",
      rodzajCalosc: "Choisissez un panneau pour lui donner un autre type ou une autre couleur.",
      rodzajPole: "Vous réglez maintenant le panneau {0} seulement."
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
      taras: "Terasa a zahrada",
      pionowe: "Vertikální a závěsy",
      brama: "Brána a garáž",
      bramy: "Vjezdové brány",
      garaze: "Garážová vrata",
      dach: "Střešní okna",
      dachowe: "Stínění střešních oken",
      markizy: "Markýzy",
      pergole: "Pergoly a zastřešení",
      okna: "Okna a světlíky s pohonem",
      moskitiery: "Sítě proti hmyzu",
      zscreen: "Screeny",
      okiennice: "Okenice",
      ekrany: "Plátna",
      szlabany: "Závory"
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
      roletowa: "Rolovací vrata",
      roleta_zip_wew: "Roleta s vodicími lištami",
      bambusowa: "Bambusová roleta",
      plisa_gora_dol: "Plisé shora i zdola",
      zaslona_wave: "Vlnový závěs",
      firana: "Záclona na kolejnici",
      panel: "Japonské stěny",
      ekran: "Promítací plátno",
      dach_dkl: "Zatemňovací roleta (DKL)",
      dach_ssl: "Solární venkovní roleta (SSL)",
      dachowa: "Venkovní roleta střešní (ARZ)",
      dach_fhb: "Římská roleta (FHB)",
      dach_msl: "Solární markýza (MSL / MHL)",
      markizeta_dach: "Venkovní markýza (AMZ)",
      dach_pal: "Žaluzie (PAL)",
      dach_fhl: "Plisé roleta (FHL)",
      dach_dn: "Roleta den/noc v kazetě",
      natynkowa_okragla: "Předokenní roleta oblá (SKO)",
      adaptacyjna: "Adaptační roleta na rám",
      roleta_moskitiera: "Roleta se sítí proti hmyzu",
      ekstrudowana: "Bezpečnostní roleta",
      roleta_drzwi: "Roleta na terasové dveře",
      fasadowa_f80: "Venkovní žaluzie F80 (plochá)",
      markizoleta: "Markýzoleta",
      okiennice: "Okenice",
      okiennice_przesuwne: "Posuvné okenice",
      markiza_otwarta: "Otevřená markýza",
      markiza_polkasetowa: "Polokazetová markýza",
      markiza_kasetowa: "Kazetová markýza",
      markiza_volant: "Markýza s volánem",
      markiza_koszowa: "Košová markýza",
      markiza_wolnostojaca: "Volně stojící markýza",
      markiza_zimowa: "Markýza na zimní zahradu",
      markizeta: "Okenní markýza",
      markiza_balkonowa: "Balkonová upínací markýza",
      markiza_pionowa: "Svislá balkonová markýza",
      markiza_boczna: "Boční markýza",
      zagiel: "Svinovací stínicí plachta",
      parasol: "Zahradní slunečník",
      pergola: "Bioklimatická pergola",
      pergola_tkanina: "Pergola s látkovou střechou",
      zadaszenie: "Zastřešení terasy",
      screen_taras: "Terasový screen",
      okno_silownik: "Okno s pohonem",
      okno_dachowe: "Střešní okno s pohonem",
      okno_plaskie: "Okno do ploché střechy",
      swietlik: "Světlík",
      wylaz: "Střešní výlez",
      moskitiera: "Rolovací síť proti hmyzu",
      moskitiera_plisa_okno: "Plisé síť do okna",
      moskitiera_drzwi: "Plisé síť do dveří",
      moskitiera_zip_drzwi: "Rolovací síť do dveří",
      furtka: "Branka",
      garaz_boczna: "Boční sekční vrata",
      garaz_skrzydlowa: "Křídlová garážová vrata",
      szlaban: "Závora"
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
      powod: "Důvod pohybu",
      wyglad: "Vzhled"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Krok {0} z {1}",
      zamknij: "Zavřít",
      wstecz: "Zpět",
      dalej: "Další",
      zapisz: "Uložit",
      gotowe: "Hotovo",
      kroki: {
        silnik: "Zařízení",
        uklad: "Rozvržení",
        rodzaj: "Druh",
        kolory: "Barvy",
        przypisz: "Pole",
        czujniki: "Senzory",
        auto: "Automatika",
        stoper: "Čas",
        dzwonek: "Oznámení",
        gotowe: "Hotovo"
      },
      pytania: {
        silnik: "Které stínění přidáváš?",
        uklad: "Jak vypadá okno?",
        rodzaj: "Co visí na okně?",
        rodzajBrama: "Jaký je to druh brány?",
        kolory: "Barvy",
        przypisz: "Klepni na pole okna",
        czujniki: "Co Motor HA ví o domově",
        auto: "Co se má dít samo",
        stoper: "Doba jízdy",
        dzwonek: "Kam a o čem oznamovat",
        gotowe: "Hotovo"
      },
      podpisy: {
        silnik: "Všechna stínění z Home Assistantu. Ta už použitá v jiném zařízení jsou označená.",
        uklad: "Klepni na nejpodobnější rozvržení.",
        przypisz: "Každé pole: motor a senzor. Návrhy jsou už vyplněné.",
        czujniki: "Nalezeno v místnosti a v domě. Klepnutím vypneš nebo změníš.",
        auto: "Nic se samo nepohne, dokud to nezapneš.",
        stoper: "Stínění vyjede nahoru, dolů a znovu nahoru. Kresba se bude pohybovat tímto tempem.",
        gotowe: "Takto bude karta vypadat na panelu."
      },
      wykryty: "Rozpoznáno: {0}. Ostatní stínění v této místnosti jsou vybraná automaticky.",
      brakOslon: "Nenašel jsem volné stínění. Přidej motor do Home Assistantu.",
      uklady: {
        u1: "1 křídlo",
        u2: "2 křídla",
        u3: "3 křídla",
        u4: "2 + nadsvětlíky",
        u5: "Okno + dveře",
        u6: "Balkonové dveře",
        u7: "Velké uprostřed",
        u8: "Mřížka 2 × 2",
        wlasny: "Vlastní"
      },
      wlasnyTytul: "Vlastní rozvržení · táhni čáry a spodní okraj okna",
      wPoprzek: "Rozdělit napříč",
      wzdluz: "Rozdělit podélně",
      usun: "Odebrat pole",
      wlasnyPodpis: "Klepni na pole, pak ho rozděl nebo odeber. Až 4 sloupce a 3 pole ve sloupci.",
      zSzablonu: "Nebo začni ze šablony",
      oslona: "Stínění",
      rama: "Rám",
      pole: "Pole {0}",
      silnikPola: "Motor",
      czujnikPola: "Okenní senzor",
      bezCzujnika: "bez senzoru",
      bezCzujnikaOkna: "bez okenního senzoru",
      wybierzSilnik: "Klepnutím vyber motor",
      gdyOtwarte: "Když senzor ukazuje otevřeno",
      uchyl: "vyklopené",
      otworz: "otevřené",
      czujniki: {
        okno: "Okenní senzory",
        slonce: "Slunce",
        pogoda: "Počasí",
        temp: "Venkovní teplota",
        obecnosc: "Někdo v místnosti",
        wiatr: "Vítr",
        deszcz: "Déšť",
        foto: "Fotobuňka brány"
      },
      slonceOpis: "Poloha slunce z Home Assistantu",
      nieZnalazlem: "V domě nenalezeno",
      nieUzywaj: "Nepoužívat",
      okienBrak: "Klepnutím přiřadíš k polím",
      auto: {
        rano: "Ráno otevřít",
        wieczor: "Večer zavřít",
        slonce: "Chránit před sluncem",
        blokada: "Nezavírat při otevřeném okně",
        wietrzenie: "Vyklopené okno = zvednout stínění",
        wiatr: "Silný vítr = zatáhnout",
        deszcz: "Déšť = zatáhnout"
      },
      oGodz: "v {0}",
      oWschodzie: "při východu slunce",
      oZachodzie: "při západu slunce",
      zeSloncem: "Podle slunce",
      zaslon: "v horku zakrýt {0} %",
      okienne: "okenní senzory",
      wiatrOpis: "od {0} km/h",
      deszczOpis: "markýza a venkovní žaluzie",
      strona: "Okno směřuje na",
      strony: {
        n: "sever",
        e: "východ",
        s: "jih",
        w: "západ"
      },
      autoPodpis: "Vítr a déšť se tu objeví, když přidáš takové senzory nebo počasí.",
      zmierz: "Změřit teď",
      zmierzZnow: "Změřit znovu",
      mierze: "Měřím…",
      pomin: "Můžeš to přeskočit a změřit později tlačítkem zařízení „Kalibrovat“.",
      nieOdp: "Neodpovídá: {0}",
      odRazu: "Motor hlásí konec hned. Nastav rychlost motoru nebo přeskoč.",
      bladPomiaru: "Měření se nepovedlo. Zkus to znovu.",
      powiadom: {
        nie_odpowiada: "Stínění neodpovídá",
        nie_dojechala: "Nedojelo do konce",
        bateria: "Slabá baterie",
        czujnik: "Senzor neodpovídá",
        automatyka: "Automatika pohnula stíněním",
        brama_otwarta: "Brána otevřená příliš dlouho",
        brama_niedomknieta: "Brána nedovřená",
        przeszkoda: "Překážka v bráně"
      },
      powiadomOpis: {
        nie_odpowiada: "např. motor bez napájení",
        nie_dojechala: "zastavilo se v půli",
        bateria: "motor nebo okenní senzor",
        czujnik: "senzor z průvodce",
        automatyka: "s důvodem",
        brama_otwarta: "po několika minutách",
        brama_niedomknieta: "zastavila se v půli",
        przeszkoda: "fotobuňka"
      },
      telefon: "Telefon (aplikace HA)",
      brakTelefonu: "Bez telefonu se oznámení zobrazí jen v Home Assistantu.",
      naPanel: "Přidat na panel",
      nazwa: "Název",
      zapisano: "Uloženo ✓",
      wszystkie: "Zobrazit vše",
      prog: "Práh",
      pozycja: "Poloha",
      odTemp: "od teploty",
      zrodlo: "Zdroj",
      przypiszPodpis: "Klepněte na křídlo v nákresu: vyberte motor a čidlo okna.",
      wschodSlonca: "Východ slunce",
      zachodSlonca: "Západ slunce",
      godzina: "Čas",
      przesuniecie: "Posun",
      poWsch: "{0} min po východu",
      przedWsch: "{0} min před východem",
      poZach: "{0} min po západu",
      przedZach: "{0} min před západem",
      oknaWieczorem: "Večer u čidel oken",
      nieZjedzie: "nesjede",
      zjedzieDo: "sjede na {0} %",
      zjedzieNormalnie: "sjede normálně",
      pozniej: "Když okno zavřete, stínění dojede samo.",
      kazdy: "Každý motor zvlášť",
      slupek: "Sloupek / zeď",
      przegPion: "Svislá příčka",
      przegPoz: "Vodorovná příčka",
      obokPola: "vedle pole {0}",
      podPolem: "pod polem {0}",
      przegRodzaj: {
        brak: "Žádná",
        slupek: "Sloupek",
        belka: "Příčník",
        sciana: "Zeď"
      },
      szerokosc: "Šířka",
      dodajSciane: "🧱 Zeď mezi okny",
      sciana: "Zeď",
      sciany: {
        biala: "bílá",
        bezowa: "béžová",
        szara: "šedá",
        cegla: "cihla",
        grafit: "grafit"
      },
      belka: "Příčník",
      brak: "žádný",
      wUrzadzeniu: "také v: {0}",
      grupa: "skupina",
      calyPokoj: "Celá místnost: {0}",
      bezPokoju: "Bez místnosti",
      pojedyncze: "Jednotlivé",
      grupaIle: "skupina · {0} křídla",
      przeciagnij: "Přetáhněte pro záměnu",
      zamienPodpis: "Chyťte křídlo v nákresu nebo ⠿ u řádku a pusťte na jiné – vymění se.",
      jakZaleca: "Nastavit podle doporučení",
      caleOkno: "Celé okno",
      rodzajCalosc: "Vyberte pole a dejte mu jiný druh nebo barvu.",
      rodzajPole: "Teď nastavujete jen pole {0}."
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
      taras: "Terasa a záhrada",
      pionowe: "Vertikálne a závesy",
      brama: "Brána a garáž",
      bramy: "Vjazdové brány",
      garaze: "Garážové brány",
      dach: "Strešné okná",
      dachowe: "Tienenie strešných okien",
      markizy: "Markízy",
      pergole: "Pergoly a zastrešenia",
      okna: "Okná a svetlíky s pohonom",
      moskitiery: "Siete proti hmyzu",
      zscreen: "Screeny",
      okiennice: "Okenice",
      ekrany: "Plátna",
      szlabany: "Závory"
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
      roletowa: "Rolovacia brána",
      roleta_zip_wew: "Roleta s vodiacimi lištami",
      bambusowa: "Bambusová roleta",
      plisa_gora_dol: "Plisé zhora aj zdola",
      zaslona_wave: "Vlnový záves",
      firana: "Záclona na koľajnici",
      panel: "Japonské steny",
      ekran: "Premietacie plátno",
      dach_dkl: "Zatemňovacia roleta (DKL)",
      dach_ssl: "Solárna vonkajšia roleta (SSL)",
      dachowa: "Vonkajšia strešná roleta (ARZ)",
      dach_fhb: "Rímska roleta (FHB)",
      dach_msl: "Solárna markíza (MSL / MHL)",
      markizeta_dach: "Vonkajšia markíza (AMZ)",
      dach_pal: "Žalúzia (PAL)",
      dach_fhl: "Plisé roleta (FHL)",
      dach_dn: "Roleta deň/noc v kazete",
      natynkowa_okragla: "Predokenná roleta oblá (SKO)",
      adaptacyjna: "Adaptačná roleta na rám",
      roleta_moskitiera: "Roleta so sieťkou proti hmyzu",
      ekstrudowana: "Bezpečnostná roleta",
      roleta_drzwi: "Roleta na terasové dvere",
      fasadowa_f80: "Vonkajšia žalúzia F80 (plochá)",
      markizoleta: "Markízoleta",
      okiennice: "Okenice",
      okiennice_przesuwne: "Posuvné okenice",
      markiza_otwarta: "Otvorená markíza",
      markiza_polkasetowa: "Polokazetová markíza",
      markiza_kasetowa: "Kazetová markíza",
      markiza_volant: "Markíza s volánom",
      markiza_koszowa: "Košová markíza",
      markiza_wolnostojaca: "Voľne stojaca markíza",
      markiza_zimowa: "Markíza na zimnú záhradu",
      markizeta: "Okenná markíza",
      markiza_balkonowa: "Balkónová upínacia markíza",
      markiza_pionowa: "Zvislá balkónová markíza",
      markiza_boczna: "Bočná markíza",
      zagiel: "Zvinovacia tieniaca plachta",
      parasol: "Záhradný slnečník",
      pergola: "Bioklimatická pergola",
      pergola_tkanina: "Pergola s látkovou strechou",
      zadaszenie: "Zastrešenie terasy",
      screen_taras: "Terasový screen",
      okno_silownik: "Okno s pohonom",
      okno_dachowe: "Strešné okno s pohonom",
      okno_plaskie: "Okno do plochej strechy",
      swietlik: "Svetlík",
      wylaz: "Strešný výlez",
      moskitiera: "Rolovacia sieť proti hmyzu",
      moskitiera_plisa_okno: "Plisé sieť do okna",
      moskitiera_drzwi: "Plisé sieť do dverí",
      moskitiera_zip_drzwi: "Rolovacia sieť do dverí",
      furtka: "Bránka",
      garaz_boczna: "Bočná sekčná brána",
      garaz_skrzydlowa: "Krídlová garážová brána",
      szlaban: "Závora"
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
      powod: "Dôvod pohybu",
      wyglad: "Vzhľad"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Krok {0} z {1}",
      zamknij: "Zavrieť",
      wstecz: "Späť",
      dalej: "Ďalej",
      zapisz: "Uložiť",
      gotowe: "Hotovo",
      kroki: {
        silnik: "Zariadenie",
        uklad: "Rozloženie",
        rodzaj: "Druh",
        kolory: "Farby",
        przypisz: "Polia",
        czujniki: "Senzory",
        auto: "Automatika",
        stoper: "Čas",
        dzwonek: "Upozornenia",
        gotowe: "Hotovo"
      },
      pytania: {
        silnik: "Ktoré tienenie pridávaš?",
        uklad: "Ako vyzerá okno?",
        rodzaj: "Čo visí na okne?",
        rodzajBrama: "Aký je to druh brány?",
        kolory: "Farby",
        przypisz: "Ťukni na pole okna",
        czujniki: "Čo Motor HA vie o domove",
        auto: "Čo sa má diať samo",
        stoper: "Čas jazdy",
        dzwonek: "Kam a o čom upozorňovať",
        gotowe: "Hotovo"
      },
      podpisy: {
        silnik: "Všetky tienenia z Home Assistanta. Tie už použité v inom zariadení sú označené.",
        uklad: "Ťukni na najpodobnejšie rozloženie.",
        przypisz: "Každé pole: motor a senzor. Návrhy sú už vyplnené.",
        czujniki: "Nájdené v miestnosti a v dome. Ťuknutím vypneš alebo zmeníš.",
        auto: "Nič sa samo nepohne, kým to nezapneš.",
        stoper: "Tienenie vyjde hore, dole a znova hore. Kresba sa bude hýbať týmto tempom.",
        gotowe: "Takto bude karta vyzerať na paneli."
      },
      wykryty: "Rozpoznané: {0}. Ostatné tienenia v tejto miestnosti sú vybrané automaticky.",
      brakOslon: "Nenašiel som voľné tienenie. Pridaj motor do Home Assistantu.",
      uklady: {
        u1: "1 krídlo",
        u2: "2 krídla",
        u3: "3 krídla",
        u4: "2 + nadsvetlíky",
        u5: "Okno + dvere",
        u6: "Balkónové dvere",
        u7: "Veľké v strede",
        u8: "Mriežka 2 × 2",
        wlasny: "Vlastné"
      },
      wlasnyTytul: "Vlastné rozloženie · ťahaj čiary a spodný okraj okna",
      wPoprzek: "Rozdeliť naprieč",
      wzdluz: "Rozdeliť pozdĺžne",
      usun: "Odobrať pole",
      wlasnyPodpis: "Ťukni na pole, potom ho rozdeľ alebo odober. Až 4 stĺpce a 3 polia v stĺpci.",
      zSzablonu: "Alebo začni zo šablóny",
      oslona: "Tienenie",
      rama: "Rám",
      pole: "Pole {0}",
      silnikPola: "Motor",
      czujnikPola: "Okenný senzor",
      bezCzujnika: "bez senzora",
      bezCzujnikaOkna: "bez okenného senzora",
      wybierzSilnik: "Ťuknutím vyber motor",
      gdyOtwarte: "Keď senzor ukazuje otvorené",
      uchyl: "vyklopené",
      otworz: "otvorené",
      czujniki: {
        okno: "Okenné senzory",
        slonce: "Slnko",
        pogoda: "Počasie",
        temp: "Vonkajšia teplota",
        obecnosc: "Niekto v miestnosti",
        wiatr: "Vietor",
        deszcz: "Dážď",
        foto: "Fotobunka brány"
      },
      slonceOpis: "Poloha slnka z Home Assistantu",
      nieZnalazlem: "V dome nenájdené",
      nieUzywaj: "Nepoužívať",
      okienBrak: "Ťuknutím priradíš k poliam",
      auto: {
        rano: "Ráno otvoriť",
        wieczor: "Večer zatvoriť",
        slonce: "Chrániť pred slnkom",
        blokada: "Nezatvárať pri otvorenom okne",
        wietrzenie: "Vyklopené okno = zdvihnúť tienenie",
        wiatr: "Silný vietor = zatiahnuť",
        deszcz: "Dážď = zatiahnuť"
      },
      oGodz: "o {0}",
      oWschodzie: "pri východe slnka",
      oZachodzie: "pri západe slnka",
      zeSloncem: "Podľa slnka",
      zaslon: "v horúčave zakryť {0} %",
      okienne: "okenné senzory",
      wiatrOpis: "od {0} km/h",
      deszczOpis: "markíza a vonkajšie žalúzie",
      strona: "Okno smeruje na",
      strony: {
        n: "sever",
        e: "východ",
        s: "juh",
        w: "západ"
      },
      autoPodpis: "Vietor a dážď sa tu objavia, keď pridáš také senzory alebo počasie.",
      zmierz: "Zmerať teraz",
      zmierzZnow: "Zmerať znova",
      mierze: "Meriam…",
      pomin: "Môžeš to preskočiť a zmerať neskôr tlačidlom zariadenia „Kalibrovať“.",
      nieOdp: "Neodpovedá: {0}",
      odRazu: "Motor hlási koniec hneď. Nastav rýchlosť motora alebo preskoč.",
      bladPomiaru: "Meranie sa nepodarilo. Skús to znova.",
      powiadom: {
        nie_odpowiada: "Tienenie neodpovedá",
        nie_dojechala: "Nedošlo do konca",
        bateria: "Slabá batéria",
        czujnik: "Senzor neodpovedá",
        automatyka: "Automatika pohla tienením",
        brama_otwarta: "Brána otvorená príliš dlho",
        brama_niedomknieta: "Brána nedovretá",
        przeszkoda: "Prekážka v bráne"
      },
      powiadomOpis: {
        nie_odpowiada: "napr. motor bez napájania",
        nie_dojechala: "zastavilo sa v polovici",
        bateria: "motor alebo okenný senzor",
        czujnik: "senzor zo sprievodcu",
        automatyka: "s dôvodom",
        brama_otwarta: "po niekoľkých minútach",
        brama_niedomknieta: "zastavila sa v polovici",
        przeszkoda: "fotobunka"
      },
      telefon: "Telefón (aplikácia HA)",
      brakTelefonu: "Bez telefónu sa upozornenia zobrazia len v Home Assistante.",
      naPanel: "Pridať na panel",
      nazwa: "Názov",
      zapisano: "Uložené ✓",
      wszystkie: "Zobraziť všetko",
      prog: "Prah",
      pozycja: "Poloha",
      odTemp: "od teploty",
      zrodlo: "Zdroj",
      przypiszPodpis: "Ťuknite na krídlo na nákrese: vyberte motor a snímač okna.",
      wschodSlonca: "Východ slnka",
      zachodSlonca: "Západ slnka",
      godzina: "Čas",
      przesuniecie: "Posun",
      poWsch: "{0} min po východe",
      przedWsch: "{0} min pred východom",
      poZach: "{0} min po západe",
      przedZach: "{0} min pred západom",
      oknaWieczorem: "Večer pri snímačoch okien",
      nieZjedzie: "nezíde",
      zjedzieDo: "zíde na {0} %",
      zjedzieNormalnie: "zíde normálne",
      pozniej: "Keď okno zatvoríte, tienenie dôjde samo.",
      kazdy: "Každý motor zvlášť",
      slupek: "Stĺpik / múr",
      przegPion: "Zvislá priečka",
      przegPoz: "Vodorovná priečka",
      obokPola: "vedľa poľa {0}",
      podPolem: "pod poľom {0}",
      przegRodzaj: {
        brak: "Žiadna",
        slupek: "Stĺpik",
        belka: "Priečnik",
        sciana: "Stena"
      },
      szerokosc: "Šírka",
      dodajSciane: "🧱 Stena medzi oknami",
      sciana: "Stena",
      sciany: {
        biala: "biela",
        bezowa: "béžová",
        szara: "sivá",
        cegla: "tehla",
        grafit: "grafit"
      },
      belka: "Priečnik",
      brak: "žiadny",
      wUrzadzeniu: "aj v: {0}",
      grupa: "skupina",
      calyPokoj: "Celá miestnosť: {0}",
      bezPokoju: "Bez miestnosti",
      pojedyncze: "Jednotlivé",
      grupaIle: "skupina · {0} krídla",
      przeciagnij: "Potiahnite na výmenu",
      zamienPodpis: "Chyťte krídlo na nákrese alebo ⠿ pri riadku a pustite na iné – vymenia sa.",
      jakZaleca: "Nastaviť podľa odporúčania",
      caleOkno: "Celé okno",
      rodzajCalosc: "Vyberte pole a dajte mu iný druh alebo farbu.",
      rodzajPole: "Teraz nastavujete len pole {0}."
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
      taras: "Terraza y jardín",
      pionowe: "Verticales y cortinas",
      brama: "Portón y garaje",
      bramy: "Portones",
      garaze: "Puertas de garaje",
      dach: "Ventanas de tejado",
      dachowe: "Cortinas para ventanas de tejado",
      markizy: "Toldos",
      pergole: "Pérgolas y techos",
      okna: "Ventanas y lucernarios motorizados",
      moskitiery: "Mosquiteras",
      zscreen: "Screens",
      okiennice: "Contraventanas",
      ekrany: "Pantallas",
      szlabany: "Barreras"
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
      roletowa: "Puerta enrollable",
      roleta_zip_wew: "Estor con guías laterales",
      bambusowa: "Estor de bambú",
      plisa_gora_dol: "Plisado arriba-abajo",
      zaslona_wave: "Cortina ondulada",
      firana: "Visillo en riel",
      panel: "Paneles japoneses",
      ekran: "Pantalla de proyección",
      dach_dkl: "Estor opaco (DKL)",
      dach_ssl: "Persiana solar (SSL)",
      dachowa: "Persiana de tejado (ARZ)",
      dach_fhb: "Estor romano (FHB)",
      dach_msl: "Toldo solar (MSL / MHL)",
      markizeta_dach: "Toldo exterior (AMZ)",
      dach_pal: "Veneciana (PAL)",
      dach_fhl: "Estor plisado (FHL)",
      dach_dn: "Estor noche/día en cofre",
      natynkowa_okragla: "Persiana de cajón redondo (SKO)",
      adaptacyjna: "Persiana adaptable al marco",
      roleta_moskitiera: "Persiana con mosquitera",
      ekstrudowana: "Persiana de seguridad",
      roleta_drzwi: "Persiana para puerta de terraza",
      fasadowa_f80: "Celosía exterior F80 (plana)",
      markizoleta: "Toldo de brazo con screen",
      okiennice: "Contraventanas",
      okiennice_przesuwne: "Contraventanas correderas",
      markiza_otwarta: "Toldo abierto",
      markiza_polkasetowa: "Toldo semicofre",
      markiza_kasetowa: "Toldo cofre",
      markiza_volant: "Toldo con faldón",
      markiza_koszowa: "Toldo capota",
      markiza_wolnostojaca: "Toldo independiente",
      markiza_zimowa: "Toldo para invernadero",
      markizeta: "Toldo de ventana",
      markiza_balkonowa: "Toldo de balcón a presión",
      markiza_pionowa: "Toldo vertical de balcón",
      markiza_boczna: "Toldo lateral",
      zagiel: "Vela de sombra enrollable",
      parasol: "Sombrilla de jardín",
      pergola: "Pérgola bioclimática",
      pergola_tkanina: "Pérgola de lona",
      zadaszenie: "Techo de terraza",
      screen_taras: "Screen de terraza",
      okno_silownik: "Ventana con motor",
      okno_dachowe: "Ventana de tejado motorizada",
      okno_plaskie: "Ventana para cubierta plana",
      swietlik: "Lucernario",
      wylaz: "Escotilla de tejado",
      moskitiera: "Mosquitera enrollable",
      moskitiera_plisa_okno: "Mosquitera plisada de ventana",
      moskitiera_drzwi: "Mosquitera plisada de puerta",
      moskitiera_zip_drzwi: "Mosquitera enrollable de puerta",
      furtka: "Puerta peatonal",
      garaz_boczna: "Puerta seccional lateral",
      garaz_skrzydlowa: "Puerta de garaje batiente",
      szlaban: "Barrera"
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
      powod: "Motivo del movimiento",
      wyglad: "Apariencia"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Paso {0} de {1}",
      zamknij: "Cerrar",
      wstecz: "Atrás",
      dalej: "Siguiente",
      zapisz: "Guardar",
      gotowe: "Listo",
      kroki: {
        silnik: "Dispositivo",
        uklad: "Distribución",
        rodzaj: "Tipo",
        kolory: "Colores",
        przypisz: "Paños",
        czujniki: "Sensores",
        auto: "Automatización",
        stoper: "Tiempo",
        dzwonek: "Notificaciones",
        gotowe: "Listo"
      },
      pytania: {
        silnik: "¿Qué estor añades?",
        uklad: "¿Cómo es la ventana?",
        rodzaj: "¿Qué cuelga en la ventana?",
        rodzajBrama: "¿Qué tipo de puerta es?",
        kolory: "Colores",
        przypisz: "Toca un paño de la ventana",
        czujniki: "Lo que Motor HA sabe de la casa",
        auto: "Qué debe pasar solo",
        stoper: "Tiempo de recorrido",
        dzwonek: "Dónde y de qué avisar",
        gotowe: "Listo"
      },
      podpisy: {
        silnik: "Todas las persianas de Home Assistant. Las ya usadas en otro dispositivo están marcadas.",
        uklad: "Toca la distribución más parecida.",
        przypisz: "Cada paño: un motor y un sensor. Las sugerencias ya están puestas.",
        czujniki: "Encontrado en la habitación y en la casa. Toca para desactivar o cambiar.",
        auto: "Nada se mueve solo hasta que lo actives.",
        stoper: "Los estores suben, bajan y vuelven a subir. El dibujo se moverá a este ritmo.",
        gotowe: "Así se verá la tarjeta en el panel."
      },
      wykryty: "Detectado: {0}. Los demás estores de esta habitación se seleccionan solos.",
      brakOslon: "No hay estores libres. Añade un motor a Home Assistant.",
      uklady: {
        u1: "1 hoja",
        u2: "2 hojas",
        u3: "3 hojas",
        u4: "2 + montantes",
        u5: "Ventana + puerta",
        u6: "Puerta de terraza",
        u7: "Grande en medio",
        u8: "Cuadrícula 2 × 2",
        wlasny: "Propia"
      },
      wlasnyTytul: "Distribución propia · arrastra las líneas y el borde inferior",
      wPoprzek: "Dividir a lo ancho",
      wzdluz: "Dividir a lo largo",
      usun: "Quitar paño",
      wlasnyPodpis: "Toca un paño y divídelo o quítalo. Hasta 4 columnas y 3 paños por columna.",
      zSzablonu: "O empieza con una plantilla",
      oslona: "Estor",
      rama: "Marco",
      pole: "Paño {0}",
      silnikPola: "Motor",
      czujnikPola: "Sensor de ventana",
      bezCzujnika: "sin sensor",
      bezCzujnikaOkna: "sin sensor de ventana",
      wybierzSilnik: "Toca para elegir un motor",
      gdyOtwarte: "Cuando el sensor indica abierto",
      uchyl: "abatida",
      otworz: "abierta",
      czujniki: {
        okno: "Sensores de ventana",
        slonce: "Sol",
        pogoda: "Tiempo",
        temp: "Temperatura exterior",
        obecnosc: "Alguien en la habitación",
        wiatr: "Viento",
        deszcz: "Lluvia",
        foto: "Fotocélula de la puerta"
      },
      slonceOpis: "Posición del sol de Home Assistant",
      nieZnalazlem: "No encontrado en la casa",
      nieUzywaj: "No usar",
      okienBrak: "Toca para asignar a los paños",
      auto: {
        rano: "Abrir por la mañana",
        wieczor: "Cerrar por la tarde",
        slonce: "Proteger del sol",
        blokada: "No cerrar con la ventana abierta",
        wietrzenie: "Ventana abatida = subir el estor",
        wiatr: "Viento fuerte = recoger",
        deszcz: "Lluvia = recoger"
      },
      oGodz: "a las {0}",
      oWschodzie: "al amanecer",
      oZachodzie: "al atardecer",
      zeSloncem: "Según el sol",
      zaslon: "cubrir {0} % con calor",
      okienne: "sensores de ventana",
      wiatrOpis: "desde {0} km/h",
      deszczOpis: "toldo y celosías exteriores",
      strona: "La ventana da al",
      strony: {
        n: "norte",
        e: "este",
        s: "sur",
        w: "oeste"
      },
      autoPodpis: "El viento y la lluvia aparecen aquí cuando añades esos sensores o el tiempo.",
      zmierz: "Medir ahora",
      zmierzZnow: "Medir de nuevo",
      mierze: "Midiendo…",
      pomin: "Puedes saltarlo y medir después con el botón «Calibrar» del dispositivo.",
      nieOdp: "No responde: {0}",
      odRazu: "El motor informa del final enseguida. Ajusta la velocidad del motor o salta este paso.",
      bladPomiaru: "La medición falló. Inténtalo de nuevo.",
      powiadom: {
        nie_odpowiada: "El estor no responde",
        nie_dojechala: "No llegó al final",
        bateria: "Batería baja",
        czujnik: "El sensor no responde",
        automatyka: "La automatización movió el estor",
        brama_otwarta: "Puerta abierta demasiado tiempo",
        brama_niedomknieta: "Puerta no cerrada del todo",
        przeszkoda: "Obstáculo en la puerta"
      },
      powiadomOpis: {
        nie_odpowiada: "p. ej. motor sin corriente",
        nie_dojechala: "se paró a medio camino",
        bateria: "motor o sensor de ventana",
        czujnik: "sensor del asistente",
        automatyka: "con el motivo",
        brama_otwarta: "tras unos minutos",
        brama_niedomknieta: "se paró a medio camino",
        przeszkoda: "fotocélula"
      },
      telefon: "Teléfono (app de HA)",
      brakTelefonu: "Sin teléfono, los avisos solo aparecen en Home Assistant.",
      naPanel: "Añadir al panel",
      nazwa: "Nombre",
      zapisano: "Guardado ✓",
      wszystkie: "Mostrar todo",
      prog: "Umbral",
      pozycja: "Posición",
      odTemp: "desde temp.",
      zrodlo: "Fuente",
      przypiszPodpis: "Toca una hoja en el dibujo para elegir su motor y sensor de ventana.",
      wschodSlonca: "Amanecer",
      zachodSlonca: "Atardecer",
      godzina: "Hora",
      przesuniecie: "Desfase",
      poWsch: "{0} min después del amanecer",
      przedWsch: "{0} min antes del amanecer",
      poZach: "{0} min después del atardecer",
      przedZach: "{0} min antes del atardecer",
      oknaWieczorem: "Por la noche, con sensores de ventana",
      nieZjedzie: "no baja",
      zjedzieDo: "baja al {0} %",
      zjedzieNormalnie: "baja con normalidad",
      pozniej: "Al cerrar la ventana, la persiana termina sola.",
      kazdy: "Cada motor por separado",
      slupek: "Parteluz / muro",
      przegPion: "Separación vertical",
      przegPoz: "Separación horizontal",
      obokPola: "junto al panel {0}",
      podPolem: "bajo el panel {0}",
      przegRodzaj: {
        brak: "Ninguna",
        slupek: "Parteluz",
        belka: "Travesaño",
        sciana: "Pared"
      },
      szerokosc: "Anchura",
      dodajSciane: "🧱 Pared entre ventanas",
      sciana: "Pared",
      sciany: {
        biala: "blanca",
        bezowa: "beige",
        szara: "gris",
        cegla: "ladrillo",
        grafit: "grafito"
      },
      belka: "Travesaño",
      brak: "ninguno",
      wUrzadzeniu: "también en: {0}",
      grupa: "grupo",
      calyPokoj: "Toda la habitación: {0}",
      bezPokoju: "Sin habitación",
      pojedyncze: "Individuales",
      grupaIle: "grupo · {0} hojas",
      przeciagnij: "Arrastra para cambiar",
      zamienPodpis: "Arrastra una hoja del dibujo o ⠿ de una fila y suéltala sobre otra para intercambiarlas.",
      jakZaleca: "Ajustar como se recomienda",
      caleOkno: "Ventana entera",
      rodzajCalosc: "Elige un panel para darle otro tipo o color.",
      rodzajPole: "Ahora solo ajustas el panel {0}."
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
      taras: "Terrazza e giardino",
      pionowe: "Verticali e tende",
      brama: "Cancello e garage",
      bramy: "Cancelli",
      garaze: "Porte da garage",
      dach: "Finestre per tetti",
      dachowe: "Tende per finestre da tetto",
      markizy: "Tende da sole",
      pergole: "Pergole e coperture",
      okna: "Finestre e lucernari motorizzati",
      moskitiery: "Zanzariere",
      zscreen: "Screen",
      okiennice: "Persiane",
      ekrany: "Schermi",
      szlabany: "Barriere"
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
      roletowa: "Porta avvolgibile",
      roleta_zip_wew: "Tenda a rullo con guide",
      bambusowa: "Tenda in bambù",
      plisa_gora_dol: "Plissettata alto-basso",
      zaslona_wave: "Tenda a onda",
      firana: "Tenda velata su binario",
      panel: "Pannelli giapponesi",
      ekran: "Schermo per proiezione",
      dach_dkl: "Tenda oscurante (DKL)",
      dach_ssl: "Tapparella solare (SSL)",
      dachowa: "Tapparella per tetto (ARZ)",
      dach_fhb: "Tenda a pacchetto (FHB)",
      dach_msl: "Tenda esterna solare (MSL / MHL)",
      markizeta_dach: "Tenda esterna (AMZ)",
      dach_pal: "Veneziana (PAL)",
      dach_fhl: "Tenda plissettata (FHL)",
      dach_dn: "Tenda giorno/notte in cassonetto",
      natynkowa_okragla: "Tapparella con cassonetto tondo (SKO)",
      adaptacyjna: "Tapparella su telaio",
      roleta_moskitiera: "Tapparella con zanzariera",
      ekstrudowana: "Tapparella antieffrazione",
      roleta_drzwi: "Tapparella per portafinestra",
      fasadowa_f80: "Frangisole F80 (piatto)",
      markizoleta: "Tenda a caduta con braccetti",
      okiennice: "Persiane a battente",
      okiennice_przesuwne: "Persiane scorrevoli",
      markiza_otwarta: "Tenda aperta",
      markiza_polkasetowa: "Tenda semicassonata",
      markiza_kasetowa: "Tenda cassonata",
      markiza_volant: "Tenda con mantovana",
      markiza_koszowa: "Tenda a cappottina",
      markiza_wolnostojaca: "Tenda autoportante",
      markiza_zimowa: "Tenda per giardino d'inverno",
      markizeta: "Tenda da finestra",
      markiza_balkonowa: "Tenda da balcone a pressione",
      markiza_pionowa: "Tenda verticale da balcone",
      markiza_boczna: "Tenda laterale",
      zagiel: "Vela ombreggiante avvolgibile",
      parasol: "Ombrellone",
      pergola: "Pergola bioclimatica",
      pergola_tkanina: "Pergola con telo",
      zadaszenie: "Copertura per terrazza",
      screen_taras: "Screen per terrazza",
      okno_silownik: "Finestra motorizzata",
      okno_dachowe: "Finestra per tetti motorizzata",
      okno_plaskie: "Finestra per tetto piano",
      swietlik: "Lucernario a cupola",
      wylaz: "Botola per tetto",
      moskitiera: "Zanzariera avvolgibile",
      moskitiera_plisa_okno: "Zanzariera plissé per finestra",
      moskitiera_drzwi: "Zanzariera plissé per porta",
      moskitiera_zip_drzwi: "Zanzariera avvolgibile per porta",
      furtka: "Cancelletto",
      garaz_boczna: "Portone sezionale laterale",
      garaz_skrzydlowa: "Portone a battente",
      szlaban: "Barriera"
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
      powod: "Motivo del movimento",
      wyglad: "Aspetto"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Passo {0} di {1}",
      zamknij: "Chiudi",
      wstecz: "Indietro",
      dalej: "Avanti",
      zapisz: "Salva",
      gotowe: "Fatto",
      kroki: {
        silnik: "Dispositivo",
        uklad: "Disposizione",
        rodzaj: "Tipo",
        kolory: "Colori",
        przypisz: "Ante",
        czujniki: "Sensori",
        auto: "Automazione",
        stoper: "Tempo",
        dzwonek: "Notifiche",
        gotowe: "Fatto"
      },
      pytania: {
        silnik: "Quale tenda aggiungi?",
        uklad: "Com’è la finestra?",
        rodzaj: "Cosa c’è sulla finestra?",
        rodzajBrama: "Che tipo di cancello è?",
        kolory: "Colori",
        przypisz: "Tocca un’anta della finestra",
        czujniki: "Cosa sa Motor HA della casa",
        auto: "Cosa deve succedere da solo",
        stoper: "Tempo di corsa",
        dzwonek: "Dove e di cosa avvisare",
        gotowe: "Fatto"
      },
      podpisy: {
        silnik: "Tutte le tapparelle di Home Assistant. Quelle già usate in un altro dispositivo sono indicate.",
        uklad: "Tocca la disposizione più simile.",
        przypisz: "Ogni anta: un motore e un sensore. I suggerimenti sono già inseriti.",
        czujniki: "Trovato nella stanza e in casa. Tocca per disattivare o cambiare.",
        auto: "Niente si muove da solo finché non lo attivi.",
        stoper: "Le tende salgono, scendono e risalgono. Il disegno si muoverà a questo ritmo.",
        gotowe: "Ecco come apparirà la scheda nella dashboard."
      },
      wykryty: "Rilevato: {0}. Le altre tende di questa stanza sono scelte in automatico.",
      brakOslon: "Nessuna tenda libera trovata. Aggiungi un motore a Home Assistant.",
      uklady: {
        u1: "1 anta",
        u2: "2 ante",
        u3: "3 ante",
        u4: "2 + sopraluce",
        u5: "Finestra + porta",
        u6: "Portafinestra",
        u7: "Grande al centro",
        u8: "Griglia 2 × 2",
        wlasny: "Personalizzata"
      },
      wlasnyTytul: "Disposizione personalizzata · trascina le linee e il bordo inferiore",
      wPoprzek: "Dividi in larghezza",
      wzdluz: "Dividi in lunghezza",
      usun: "Rimuovi anta",
      wlasnyPodpis: "Tocca un’anta, poi dividila o rimuovila. Fino a 4 colonne e 3 ante per colonna.",
      zSzablonu: "Oppure parti da un modello",
      oslona: "Tenda",
      rama: "Telaio",
      pole: "Anta {0}",
      silnikPola: "Motore",
      czujnikPola: "Sensore finestra",
      bezCzujnika: "senza sensore",
      bezCzujnikaOkna: "senza sensore finestra",
      wybierzSilnik: "Tocca per scegliere un motore",
      gdyOtwarte: "Quando il sensore indica aperto",
      uchyl: "a ribalta",
      otworz: "aperta",
      czujniki: {
        okno: "Sensori finestra",
        slonce: "Sole",
        pogoda: "Meteo",
        temp: "Temperatura esterna",
        obecnosc: "Qualcuno nella stanza",
        wiatr: "Vento",
        deszcz: "Pioggia",
        foto: "Fotocellula del cancello"
      },
      slonceOpis: "Posizione del sole da Home Assistant",
      nieZnalazlem: "Non trovato in casa",
      nieUzywaj: "Non usare",
      okienBrak: "Tocca per assegnare alle ante",
      auto: {
        rano: "Apri al mattino",
        wieczor: "Chiudi la sera",
        slonce: "Proteggi dal sole",
        blokada: "Non chiudere con la finestra aperta",
        wietrzenie: "Finestra a ribalta = alza la tenda",
        wiatr: "Vento forte = ritira",
        deszcz: "Pioggia = ritira"
      },
      oGodz: "alle {0}",
      oWschodzie: "all’alba",
      oZachodzie: "al tramonto",
      zeSloncem: "Secondo il sole",
      zaslon: "copri {0} % con il caldo",
      okienne: "sensori finestra",
      wiatrOpis: "da {0} km/h",
      deszczOpis: "tenda da sole e frangisole",
      strona: "La finestra guarda a",
      strony: {
        n: "nord",
        e: "est",
        s: "sud",
        w: "ovest"
      },
      autoPodpis: "Vento e pioggia compaiono qui quando aggiungi questi sensori o il meteo.",
      zmierz: "Misura ora",
      zmierzZnow: "Misura di nuovo",
      mierze: "Misurazione…",
      pomin: "Puoi saltare e misurare più tardi con il pulsante «Calibra» del dispositivo.",
      nieOdp: "Non risponde: {0}",
      odRazu: "Il motore segnala subito la fine. Imposta la velocità del motore o salta.",
      bladPomiaru: "Misurazione non riuscita. Riprova.",
      powiadom: {
        nie_odpowiada: "La tenda non risponde",
        nie_dojechala: "Non è arrivata in fondo",
        bateria: "Batteria scarica",
        czujnik: "Il sensore non risponde",
        automatyka: "L’automazione ha mosso la tenda",
        brama_otwarta: "Cancello aperto troppo a lungo",
        brama_niedomknieta: "Cancello non chiuso del tutto",
        przeszkoda: "Ostacolo nel cancello"
      },
      powiadomOpis: {
        nie_odpowiada: "es. motore senza corrente",
        nie_dojechala: "fermata a metà",
        bateria: "motore o sensore finestra",
        czujnik: "sensore della procedura",
        automatyka: "con il motivo",
        brama_otwarta: "dopo alcuni minuti",
        brama_niedomknieta: "fermato a metà",
        przeszkoda: "fotocellula"
      },
      telefon: "Telefono (app HA)",
      brakTelefonu: "Senza telefono, le notifiche appaiono solo in Home Assistant.",
      naPanel: "Aggiungi alla dashboard",
      nazwa: "Nome",
      zapisano: "Salvato ✓",
      wszystkie: "Mostra tutto",
      prog: "Soglia",
      pozycja: "Posizione",
      odTemp: "da temp.",
      zrodlo: "Fonte",
      przypiszPodpis: "Tocca un'anta nel disegno per sceglierne motore e sensore finestra.",
      wschodSlonca: "Alba",
      zachodSlonca: "Tramonto",
      godzina: "Ora",
      przesuniecie: "Scostamento",
      poWsch: "{0} min dopo l'alba",
      przedWsch: "{0} min prima dell'alba",
      poZach: "{0} min dopo il tramonto",
      przedZach: "{0} min prima del tramonto",
      oknaWieczorem: "La sera, con i sensori finestra",
      nieZjedzie: "non scende",
      zjedzieDo: "scende al {0} %",
      zjedzieNormalnie: "scende normalmente",
      pozniej: "Chiusa la finestra, la tapparella finisce da sola.",
      kazdy: "Ogni motore separatamente",
      slupek: "Montante / muro",
      przegPion: "Divisione verticale",
      przegPoz: "Divisione orizzontale",
      obokPola: "accanto al pannello {0}",
      podPolem: "sotto il pannello {0}",
      przegRodzaj: {
        brak: "Nessuna",
        slupek: "Montante",
        belka: "Traverso",
        sciana: "Muro"
      },
      szerokosc: "Larghezza",
      dodajSciane: "🧱 Muro tra le finestre",
      sciana: "Muro",
      sciany: {
        biala: "bianco",
        bezowa: "beige",
        szara: "grigio",
        cegla: "mattone",
        grafit: "grafite"
      },
      belka: "Traverso",
      brak: "nessuno",
      wUrzadzeniu: "anche in: {0}",
      grupa: "gruppo",
      calyPokoj: "Tutta la stanza: {0}",
      bezPokoju: "Senza stanza",
      pojedyncze: "Singole",
      grupaIle: "gruppo · {0} ante",
      przeciagnij: "Trascina per scambiare",
      zamienPodpis: "Afferra un'anta nel disegno o ⠿ su una riga e rilasciala su un'altra per scambiarle.",
      jakZaleca: "Imposta come consigliato",
      caleOkno: "Finestra intera",
      rodzajCalosc: "Scegli un riquadro per dargli un altro tipo o colore.",
      rodzajPole: "Ora imposti solo il riquadro {0}."
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
      taras: "Terras en tuin",
      pionowe: "Verticaal en gordijnen",
      brama: "Poort en garage",
      bramy: "Opritpoorten",
      garaze: "Garagedeuren",
      dach: "Dakramen",
      dachowe: "Dakraamzonwering",
      markizy: "Zonneschermen",
      pergole: "Pergola's en overkappingen",
      okna: "Ramen en lichtkoepels met motor",
      moskitiery: "Horren",
      zscreen: "Screens",
      okiennice: "Luiken",
      ekrany: "Schermen",
      szlabany: "Slagbomen"
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
      roletowa: "Roldeur",
      roleta_zip_wew: "Rolgordijn met zijgeleiding",
      bambusowa: "Bamboe rolgordijn",
      plisa_gora_dol: "Plissé boven-onder",
      zaslona_wave: "Wave-gordijn",
      firana: "Vitrage op rail",
      panel: "Paneelgordijn",
      ekran: "Projectiescherm",
      dach_dkl: "Verduisterend rolgordijn (DKL)",
      dach_ssl: "Zonne-rolluik (SSL)",
      dachowa: "Dakrolluik (ARZ)",
      dach_fhb: "Vouwgordijn (FHB)",
      dach_msl: "Zonne-buitenzonwering (MSL / MHL)",
      markizeta_dach: "Buitenzonwering (AMZ)",
      dach_pal: "Jaloezie (PAL)",
      dach_fhl: "Plisségordijn (FHL)",
      dach_dn: "Duo-rolgordijn in cassette",
      natynkowa_okragla: "Opbouwrolluik rond (SKO)",
      adaptacyjna: "Rolluik op het kozijn",
      roleta_moskitiera: "Rolluik met horscherm",
      ekstrudowana: "Inbraakwerend rolluik",
      roleta_drzwi: "Rolluik voor terrasdeur",
      fasadowa_f80: "Buitenjaloezie F80 (vlak)",
      markizoleta: "Markisolette",
      okiennice: "Luiken",
      okiennice_przesuwne: "Schuifluiken",
      markiza_otwarta: "Open knikarmscherm",
      markiza_polkasetowa: "Halfcassettescherm",
      markiza_kasetowa: "Cassettescherm",
      markiza_volant: "Knikarmscherm met volant",
      markiza_koszowa: "Uitvalscherm korf",
      markiza_wolnostojaca: "Vrijstaand scherm",
      markiza_zimowa: "Serrezonwering",
      markizeta: "Uitvalscherm",
      markiza_balkonowa: "Klembalkonscherm",
      markiza_pionowa: "Verticaal balkonscherm",
      markiza_boczna: "Zijscherm",
      zagiel: "Oprolbaar schaduwdoek",
      parasol: "Parasol",
      pergola: "Lamellenoverkapping",
      pergola_tkanina: "Pergola met doek",
      zadaszenie: "Terrasoverkapping",
      screen_taras: "Terrasscreen",
      okno_silownik: "Raam met motor",
      okno_dachowe: "Dakraam met motor",
      okno_plaskie: "Platdakraam",
      swietlik: "Lichtkoepel",
      wylaz: "Dakluik",
      moskitiera: "Rolhor",
      moskitiera_plisa_okno: "Plissé hor voor raam",
      moskitiera_drzwi: "Plissé hordeur",
      moskitiera_zip_drzwi: "Rolhor voor deur",
      furtka: "Poortje",
      garaz_boczna: "Zijwaartse sectionaaldeur",
      garaz_skrzydlowa: "Openslaande garagedeur",
      szlaban: "Slagboom"
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
      powod: "Reden van beweging",
      wyglad: "Uiterlijk"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Stap {0} van {1}",
      zamknij: "Sluiten",
      wstecz: "Terug",
      dalej: "Volgende",
      zapisz: "Opslaan",
      gotowe: "Klaar",
      kroki: {
        silnik: "Apparaat",
        uklad: "Indeling",
        rodzaj: "Soort",
        kolory: "Kleuren",
        przypisz: "Vakken",
        czujniki: "Sensoren",
        auto: "Automatisering",
        stoper: "Tijd",
        dzwonek: "Meldingen",
        gotowe: "Klaar"
      },
      pytania: {
        silnik: "Welke zonwering voeg je toe?",
        uklad: "Hoe ziet het raam eruit?",
        rodzaj: "Wat hangt er aan het raam?",
        rodzajBrama: "Wat voor poort is het?",
        kolory: "Kleuren",
        przypisz: "Tik op een vak van het raam",
        czujniki: "Wat Motor HA over het huis weet",
        auto: "Wat vanzelf moet gebeuren",
        stoper: "Looptijd",
        dzwonek: "Waar en waarover melden",
        gotowe: "Klaar"
      },
      podpisy: {
        silnik: "Alle zonwering uit Home Assistant. Al in een ander apparaat gebruikte zijn gemarkeerd.",
        uklad: "Tik op de indeling die het meest lijkt.",
        przypisz: "Elk vak: een motor en een sensor. Suggesties zijn al ingevuld.",
        czujniki: "Gevonden in de kamer en in huis. Tik om uit te zetten of te wijzigen.",
        auto: "Niets beweegt vanzelf tot je het aanzet.",
        stoper: "De zonwering gaat omhoog, omlaag en weer omhoog. De tekening beweegt in dit tempo.",
        gotowe: "Zo ziet de kaart eruit op het dashboard."
      },
      wykryty: "{0} herkend. De andere zonwering in deze kamer is automatisch gekozen.",
      brakOslon: "Geen vrije zonwering gevonden. Voeg een motor toe aan Home Assistant.",
      uklady: {
        u1: "1 vleugel",
        u2: "2 vleugels",
        u3: "3 vleugels",
        u4: "2 + bovenlichten",
        u5: "Raam + deur",
        u6: "Terrasdeur",
        u7: "Groot in het midden",
        u8: "Raster 2 × 2",
        wlasny: "Eigen"
      },
      wlasnyTytul: "Eigen indeling · sleep de lijnen en de onderkant van het raam",
      wPoprzek: "Dwars splitsen",
      wzdluz: "In de lengte splitsen",
      usun: "Vak verwijderen",
      wlasnyPodpis: "Tik op een vak en splits of verwijder het. Tot 4 kolommen en 3 vakken per kolom.",
      zSzablonu: "Of begin met een sjabloon",
      oslona: "Zonwering",
      rama: "Kozijn",
      pole: "Vak {0}",
      silnikPola: "Motor",
      czujnikPola: "Raamsensor",
      bezCzujnika: "zonder sensor",
      bezCzujnikaOkna: "zonder raamsensor",
      wybierzSilnik: "Tik om een motor te kiezen",
      gdyOtwarte: "Als de sensor open toont",
      uchyl: "op kiepstand",
      otworz: "open",
      czujniki: {
        okno: "Raamsensoren",
        slonce: "Zon",
        pogoda: "Weer",
        temp: "Buitentemperatuur",
        obecnosc: "Iemand in de kamer",
        wiatr: "Wind",
        deszcz: "Regen",
        foto: "Fotocel van de poort"
      },
      slonceOpis: "Zonnestand uit Home Assistant",
      nieZnalazlem: "Niet gevonden in huis",
      nieUzywaj: "Niet gebruiken",
      okienBrak: "Tik om aan vakken toe te wijzen",
      auto: {
        rano: "’s Ochtends openen",
        wieczor: "’s Avonds sluiten",
        slonce: "Beschermen tegen zon",
        blokada: "Niet sluiten bij open raam",
        wietrzenie: "Raam op kiepstand = zonwering omhoog",
        wiatr: "Harde wind = intrekken",
        deszcz: "Regen = intrekken"
      },
      oGodz: "om {0}",
      oWschodzie: "bij zonsopkomst",
      oZachodzie: "bij zonsondergang",
      zeSloncem: "Volgens de zon",
      zaslon: "bij hitte {0} % dicht",
      okienne: "raamsensoren",
      wiatrOpis: "vanaf {0} km/u",
      deszczOpis: "zonnescherm en screens",
      strona: "Raam ligt op het",
      strony: {
        n: "noorden",
        e: "oosten",
        s: "zuiden",
        w: "westen"
      },
      autoPodpis: "Wind en regen verschijnen hier als je zulke sensoren of het weer toevoegt.",
      zmierz: "Nu meten",
      zmierzZnow: "Opnieuw meten",
      mierze: "Meten…",
      pomin: "Je kunt dit overslaan en later meten met de knop „Kalibreren” van het apparaat.",
      nieOdp: "Reageert niet: {0}",
      odRazu: "De motor meldt het einde meteen. Stel de motorsnelheid in of sla over.",
      bladPomiaru: "Het meten is mislukt. Probeer het opnieuw.",
      powiadom: {
        nie_odpowiada: "Zonwering reageert niet",
        nie_dojechala: "Einde niet bereikt",
        bateria: "Batterij bijna leeg",
        czujnik: "Sensor reageert niet",
        automatyka: "Automatisering bewoog de zonwering",
        brama_otwarta: "Poort te lang open",
        brama_niedomknieta: "Poort niet helemaal dicht",
        przeszkoda: "Obstakel in de poort"
      },
      powiadomOpis: {
        nie_odpowiada: "bijv. motor zonder stroom",
        nie_dojechala: "halverwege gestopt",
        bateria: "motor of raamsensor",
        czujnik: "sensor uit de wizard",
        automatyka: "met de reden",
        brama_otwarta: "na een paar minuten",
        brama_niedomknieta: "halverwege gestopt",
        przeszkoda: "fotocel"
      },
      telefon: "Telefoon (HA-app)",
      brakTelefonu: "Zonder telefoon verschijnen meldingen alleen in Home Assistant.",
      naPanel: "Toevoegen aan dashboard",
      nazwa: "Naam",
      zapisano: "Opgeslagen ✓",
      wszystkie: "Alles tonen",
      prog: "Drempel",
      pozycja: "Positie",
      odTemp: "vanaf temp.",
      zrodlo: "Bron",
      przypiszPodpis: "Tik op een vleugel in de tekening om motor en raamsensor te kiezen.",
      wschodSlonca: "Zonsopkomst",
      zachodSlonca: "Zonsondergang",
      godzina: "Tijd",
      przesuniecie: "Verschuiving",
      poWsch: "{0} min na zonsopkomst",
      przedWsch: "{0} min voor zonsopkomst",
      poZach: "{0} min na zonsondergang",
      przedZach: "{0} min voor zonsondergang",
      oknaWieczorem: "'s Avonds met raamsensoren",
      nieZjedzie: "gaat niet dicht",
      zjedzieDo: "gaat naar {0} %",
      zjedzieNormalnie: "gaat normaal dicht",
      pozniej: "Zodra het raam dicht is, gaat het scherm vanzelf verder.",
      kazdy: "Elke motor apart",
      slupek: "Stijl / muur",
      przegPion: "Verticale scheiding",
      przegPoz: "Horizontale scheiding",
      obokPola: "naast vak {0}",
      podPolem: "onder vak {0}",
      przegRodzaj: {
        brak: "Geen",
        slupek: "Stijl",
        belka: "Kalf",
        sciana: "Muur"
      },
      szerokosc: "Breedte",
      dodajSciane: "🧱 Muur tussen ramen",
      sciana: "Muur",
      sciany: {
        biala: "wit",
        bezowa: "beige",
        szara: "grijs",
        cegla: "baksteen",
        grafit: "grafiet"
      },
      belka: "Kalf",
      brak: "geen",
      wUrzadzeniu: "ook in: {0}",
      grupa: "groep",
      calyPokoj: "Hele ruimte: {0}",
      bezPokoju: "Geen ruimte",
      pojedyncze: "Los",
      grupaIle: "groep · {0} vleugels",
      przeciagnij: "Sleep om te wisselen",
      zamienPodpis: "Pak een vleugel in de tekening of ⠿ bij een rij en zet hem op een andere om te wisselen.",
      jakZaleca: "Instellen zoals aanbevolen",
      caleOkno: "Hele raam",
      rodzajCalosc: "Kies een vak om het een ander soort of andere kleur te geven.",
      rodzajPole: "Je stelt nu alleen vak {0} in."
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
      taras: "Terraço e jardim",
      pionowe: "Verticais e cortinas",
      brama: "Portão e garagem",
      bramy: "Portões",
      garaze: "Portas de garagem",
      dach: "Janelas de telhado",
      dachowe: "Proteções para janelas de telhado",
      markizy: "Toldos",
      pergole: "Pérgolas e coberturas",
      okna: "Janelas e claraboias motorizadas",
      moskitiery: "Mosquiteiras",
      zscreen: "Screens",
      okiennice: "Portadas",
      ekrany: "Telas",
      szlabany: "Cancelas"
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
      roletowa: "Porta de enrolar",
      roleta_zip_wew: "Estore com guias laterais",
      bambusowa: "Estore de bambu",
      plisa_gora_dol: "Plissado cima-baixo",
      zaslona_wave: "Cortina ondulada",
      firana: "Cortinado em calha",
      panel: "Painéis japoneses",
      ekran: "Tela de projeção",
      dach_dkl: "Estore blackout (DKL)",
      dach_ssl: "Estore exterior solar (SSL)",
      dachowa: "Estore de telhado (ARZ)",
      dach_fhb: "Estore romano (FHB)",
      dach_msl: "Toldo solar (MSL / MHL)",
      markizeta_dach: "Toldo exterior (AMZ)",
      dach_pal: "Persiana veneziana (PAL)",
      dach_fhl: "Estore plissado (FHL)",
      dach_dn: "Estore dia/noite em caixa",
      natynkowa_okragla: "Estore de caixa redonda (SKO)",
      adaptacyjna: "Estore adaptado ao caixilho",
      roleta_moskitiera: "Estore com rede mosquiteira",
      ekstrudowana: "Estore de segurança",
      roleta_drzwi: "Estore para porta de terraço",
      fasadowa_f80: "Estore veneziano F80 (plano)",
      markizoleta: "Toldo com braço projetante",
      okiennice: "Portadas",
      okiennice_przesuwne: "Portadas de correr",
      markiza_otwarta: "Toldo aberto",
      markiza_polkasetowa: "Toldo semicofre",
      markiza_kasetowa: "Toldo cofre",
      markiza_volant: "Toldo com sanefa",
      markiza_koszowa: "Toldo capota",
      markiza_wolnostojaca: "Toldo independente",
      markiza_zimowa: "Toldo para jardim de inverno",
      markizeta: "Toldo de janela",
      markiza_balkonowa: "Toldo de varanda de pressão",
      markiza_pionowa: "Toldo vertical de varanda",
      markiza_boczna: "Toldo lateral",
      zagiel: "Vela de sombra enrolável",
      parasol: "Guarda-sol",
      pergola: "Pérgola bioclimática",
      pergola_tkanina: "Pérgola com toldo",
      zadaszenie: "Cobertura de terraço",
      screen_taras: "Screen de terraço",
      okno_silownik: "Janela motorizada",
      okno_dachowe: "Janela de telhado motorizada",
      okno_plaskie: "Janela para cobertura plana",
      swietlik: "Claraboia",
      wylaz: "Escotilha de telhado",
      moskitiera: "Mosquiteira de enrolar",
      moskitiera_plisa_okno: "Mosquiteira plissada de janela",
      moskitiera_drzwi: "Mosquiteira plissada de porta",
      moskitiera_zip_drzwi: "Mosquiteira de enrolar de porta",
      furtka: "Portão pedonal",
      garaz_boczna: "Porta seccionada lateral",
      garaz_skrzydlowa: "Porta de garagem de batente",
      szlaban: "Cancela"
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
      powod: "Motivo do movimento",
      wyglad: "Aparência"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Passo {0} de {1}",
      zamknij: "Fechar",
      wstecz: "Voltar",
      dalej: "Seguinte",
      zapisz: "Guardar",
      gotowe: "Concluído",
      kroki: {
        silnik: "Dispositivo",
        uklad: "Disposição",
        rodzaj: "Tipo",
        kolory: "Cores",
        przypisz: "Folhas",
        czujniki: "Sensores",
        auto: "Automação",
        stoper: "Tempo",
        dzwonek: "Notificações",
        gotowe: "Concluído"
      },
      pytania: {
        silnik: "Que proteção está a adicionar?",
        uklad: "Como é a janela?",
        rodzaj: "O que está na janela?",
        rodzajBrama: "Que tipo de portão é?",
        kolory: "Cores",
        przypisz: "Toque numa folha da janela",
        czujniki: "O que o Motor HA sabe da casa",
        auto: "O que deve acontecer sozinho",
        stoper: "Tempo de percurso",
        dzwonek: "Onde e sobre o que notificar",
        gotowe: "Concluído"
      },
      podpisy: {
        silnik: "Todas as persianas do Home Assistant. As já usadas noutro dispositivo estão assinaladas.",
        uklad: "Toque na disposição mais parecida.",
        przypisz: "Cada folha: um motor e um sensor. As sugestões já estão preenchidas.",
        czujniki: "Encontrado na divisão e na casa. Toque para desligar ou alterar.",
        auto: "Nada se move sozinho até o ligar.",
        stoper: "As proteções sobem, descem e voltam a subir. O desenho vai mover-se a este ritmo.",
        gotowe: "Assim ficará o cartão no painel."
      },
      wykryty: "Detetado: {0}. As outras proteções desta divisão são escolhidas automaticamente.",
      brakOslon: "Nenhuma proteção livre encontrada. Adicione um motor ao Home Assistant.",
      uklady: {
        u1: "1 folha",
        u2: "2 folhas",
        u3: "3 folhas",
        u4: "2 + bandeiras",
        u5: "Janela + porta",
        u6: "Porta de varanda",
        u7: "Grande ao meio",
        u8: "Grelha 2 × 2",
        wlasny: "Própria"
      },
      wlasnyTytul: "Disposição própria · arraste as linhas e o fundo da janela",
      wPoprzek: "Dividir na largura",
      wzdluz: "Dividir no comprimento",
      usun: "Remover folha",
      wlasnyPodpis: "Toque numa folha e divida-a ou remova-a. Até 4 colunas e 3 folhas por coluna.",
      zSzablonu: "Ou comece por um modelo",
      oslona: "Proteção",
      rama: "Caixilho",
      pole: "Folha {0}",
      silnikPola: "Motor",
      czujnikPola: "Sensor da janela",
      bezCzujnika: "sem sensor",
      bezCzujnikaOkna: "sem sensor da janela",
      wybierzSilnik: "Toque para escolher um motor",
      gdyOtwarte: "Quando o sensor indica aberto",
      uchyl: "basculada",
      otworz: "aberta",
      czujniki: {
        okno: "Sensores de janela",
        slonce: "Sol",
        pogoda: "Tempo",
        temp: "Temperatura exterior",
        obecnosc: "Alguém na divisão",
        wiatr: "Vento",
        deszcz: "Chuva",
        foto: "Fotocélula do portão"
      },
      slonceOpis: "Posição do sol do Home Assistant",
      nieZnalazlem: "Não encontrado na casa",
      nieUzywaj: "Não usar",
      okienBrak: "Toque para atribuir às folhas",
      auto: {
        rano: "Abrir de manhã",
        wieczor: "Fechar à noite",
        slonce: "Proteger do sol",
        blokada: "Não fechar com a janela aberta",
        wietrzenie: "Janela basculada = subir a proteção",
        wiatr: "Vento forte = recolher",
        deszcz: "Chuva = recolher"
      },
      oGodz: "às {0}",
      oWschodzie: "ao nascer do sol",
      oZachodzie: "ao pôr do sol",
      zeSloncem: "Segundo o sol",
      zaslon: "cobrir {0} % com calor",
      okienne: "sensores de janela",
      wiatrOpis: "a partir de {0} km/h",
      deszczOpis: "toldo e estores exteriores",
      strona: "A janela está virada a",
      strony: {
        n: "norte",
        e: "leste",
        s: "sul",
        w: "oeste"
      },
      autoPodpis: "O vento e a chuva aparecem aqui quando adicionar esses sensores ou o tempo.",
      zmierz: "Medir agora",
      zmierzZnow: "Medir de novo",
      mierze: "A medir…",
      pomin: "Pode saltar e medir mais tarde com o botão «Calibrar» do dispositivo.",
      nieOdp: "Não responde: {0}",
      odRazu: "O motor indica o fim logo. Defina a velocidade do motor ou salte.",
      bladPomiaru: "A medição falhou. Tente de novo.",
      powiadom: {
        nie_odpowiada: "A proteção não responde",
        nie_dojechala: "Não chegou ao fim",
        bateria: "Bateria fraca",
        czujnik: "O sensor não responde",
        automatyka: "A automação moveu a proteção",
        brama_otwarta: "Portão aberto demasiado tempo",
        brama_niedomknieta: "Portão mal fechado",
        przeszkoda: "Obstáculo no portão"
      },
      powiadomOpis: {
        nie_odpowiada: "p. ex. motor sem energia",
        nie_dojechala: "parou a meio",
        bateria: "motor ou sensor da janela",
        czujnik: "sensor do assistente",
        automatyka: "com o motivo",
        brama_otwarta: "após alguns minutos",
        brama_niedomknieta: "parou a meio",
        przeszkoda: "fotocélula"
      },
      telefon: "Telemóvel (app HA)",
      brakTelefonu: "Sem telemóvel, as notificações só aparecem no Home Assistant.",
      naPanel: "Adicionar ao painel",
      nazwa: "Nome",
      zapisano: "Guardado ✓",
      wszystkie: "Mostrar tudo",
      prog: "Limite",
      pozycja: "Posição",
      odTemp: "a partir de temp.",
      zrodlo: "Fonte",
      przypiszPodpis: "Toque numa folha no desenho para escolher o motor e o sensor de janela.",
      wschodSlonca: "Nascer do sol",
      zachodSlonca: "Pôr do sol",
      godzina: "Hora",
      przesuniecie: "Desvio",
      poWsch: "{0} min após o nascer do sol",
      przedWsch: "{0} min antes do nascer do sol",
      poZach: "{0} min após o pôr do sol",
      przedZach: "{0} min antes do pôr do sol",
      oknaWieczorem: "À noite, com sensores de janela",
      nieZjedzie: "não desce",
      zjedzieDo: "desce até {0} %",
      zjedzieNormalnie: "desce normalmente",
      pozniej: "Ao fechar a janela, a persiana termina sozinha.",
      kazdy: "Cada motor separadamente",
      slupek: "Pilar / parede",
      przegPion: "Divisória vertical",
      przegPoz: "Divisória horizontal",
      obokPola: "ao lado do painel {0}",
      podPolem: "abaixo do painel {0}",
      przegRodzaj: {
        brak: "Nenhuma",
        slupek: "Montante",
        belka: "Travessa",
        sciana: "Parede"
      },
      szerokosc: "Largura",
      dodajSciane: "🧱 Parede entre janelas",
      sciana: "Parede",
      sciany: {
        biala: "branca",
        bezowa: "bege",
        szara: "cinza",
        cegla: "tijolo",
        grafit: "grafite"
      },
      belka: "Travessa",
      brak: "nenhum",
      wUrzadzeniu: "também em: {0}",
      grupa: "grupo",
      calyPokoj: "Divisão inteira: {0}",
      bezPokoju: "Sem divisão",
      pojedyncze: "Individuais",
      grupaIle: "grupo · {0} folhas",
      przeciagnij: "Arraste para trocar",
      zamienPodpis: "Agarre uma folha no desenho ou ⠿ numa linha e largue noutra para as trocar.",
      jakZaleca: "Definir como recomendado",
      caleOkno: "Janela inteira",
      rodzajCalosc: "Escolha um painel para lhe dar outro tipo ou cor.",
      rodzajPole: "Agora está a ajustar só o painel {0}."
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
      taras: "Тераса і сад",
      pionowe: "Вертикальні та штори",
      brama: "Ворота і гараж",
      bramy: "В'їзні ворота",
      garaze: "Гаражні ворота",
      dach: "Мансардні вікна",
      dachowe: "Захист мансардних вікон",
      markizy: "Маркізи",
      pergole: "Перголи та навіси",
      okna: "Вікна та світлові люки з приводом",
      moskitiery: "Москітні сітки",
      zscreen: "Скріни",
      okiennice: "Віконниці",
      ekrany: "Екрани",
      szlabany: "Шлагбауми"
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
      roletowa: "Рулонні ворота",
      roleta_zip_wew: "Ролета з напрямними",
      bambusowa: "Бамбукова ролета",
      plisa_gora_dol: "Плісе вгору-вниз",
      zaslona_wave: "Штора хвиля",
      firana: "Тюль на карнизі",
      panel: "Японські панелі",
      ekran: "Проекційний екран",
      dach_dkl: "Затемнювальна ролета (DKL)",
      dach_ssl: "Сонячна зовнішня ролета (SSL)",
      dachowa: "Зовнішня ролета (ARZ)",
      dach_fhb: "Римська штора (FHB)",
      dach_msl: "Сонячна маркіза (MSL / MHL)",
      markizeta_dach: "Зовнішня маркіза (AMZ)",
      dach_pal: "Жалюзі (PAL)",
      dach_fhl: "Плісе (FHL)",
      dach_dn: "Ролета день/ніч у касеті",
      natynkowa_okragla: "Накладна ролета кругла (SKO)",
      adaptacyjna: "Адаптаційна ролета на раму",
      roleta_moskitiera: "Ролета з москітною сіткою",
      ekstrudowana: "Протизламна ролета",
      roleta_drzwi: "Ролета на терасні двері",
      fasadowa_f80: "Фасадні жалюзі F80 (пласкі)",
      markizoleta: "Маркізолета",
      okiennice: "Віконниці",
      okiennice_przesuwne: "Розсувні віконниці",
      markiza_otwarta: "Відкрита маркіза",
      markiza_polkasetowa: "Напівкасетна маркіза",
      markiza_kasetowa: "Касетна маркіза",
      markiza_volant: "Маркіза з воланом",
      markiza_koszowa: "Купольна маркіза",
      markiza_wolnostojaca: "Окремостояча маркіза",
      markiza_zimowa: "Маркіза для зимового саду",
      markizeta: "Віконна маркіза",
      markiza_balkonowa: "Балконна розпірна маркіза",
      markiza_pionowa: "Вертикальна балконна маркіза",
      markiza_boczna: "Бічна маркіза",
      zagiel: "Згортальний тіньовий парус",
      parasol: "Садова парасоля",
      pergola: "Біокліматична пергола",
      pergola_tkanina: "Пергола з тканинним дахом",
      zadaszenie: "Навіс над терасою",
      screen_taras: "Терасний скрін",
      okno_silownik: "Вікно з приводом",
      okno_dachowe: "Мансардне вікно з приводом",
      okno_plaskie: "Вікно для пласкої покрівлі",
      swietlik: "Світловий купол",
      wylaz: "Дахова ляда",
      moskitiera: "Рулонна москітна сітка",
      moskitiera_plisa_okno: "Плісе-сітка на вікно",
      moskitiera_drzwi: "Плісе-сітка на двері",
      moskitiera_zip_drzwi: "Рулонна сітка на двері",
      furtka: "Хвіртка",
      garaz_boczna: "Бічні секційні ворота",
      garaz_skrzydlowa: "Розпашні гаражні ворота",
      szlaban: "Шлагбаум"
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
      powod: "Причина руху",
      wyglad: "Вигляд"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Крок {0} з {1}",
      zamknij: "Закрити",
      wstecz: "Назад",
      dalej: "Далі",
      zapisz: "Зберегти",
      gotowe: "Готово",
      kroki: {
        silnik: "Пристрій",
        uklad: "Схема",
        rodzaj: "Тип",
        kolory: "Кольори",
        przypisz: "Стулки",
        czujniki: "Датчики",
        auto: "Автоматика",
        stoper: "Час",
        dzwonek: "Сповіщення",
        gotowe: "Готово"
      },
      pytania: {
        silnik: "Яку штору ви додаєте?",
        uklad: "Який вигляд має вікно?",
        rodzaj: "Що висить на вікні?",
        rodzajBrama: "Який це тип воріт?",
        kolory: "Кольори",
        przypisz: "Торкніться стулки вікна",
        czujniki: "Що Motor HA знає про дім",
        auto: "Що має відбуватися саме",
        stoper: "Час ходу",
        dzwonek: "Куди і про що сповіщати",
        gotowe: "Готово"
      },
      podpisy: {
        silnik: "Усі штори з Home Assistant. Уже використані в іншому пристрої підписані.",
        uklad: "Торкніться найсхожішої схеми.",
        przypisz: "Кожна стулка: мотор і датчик. Підказки вже заповнено.",
        czujniki: "Знайдено в кімнаті та вдома. Торкніться, щоб вимкнути або змінити.",
        auto: "Ніщо не рухається саме, доки ви це не ввімкнете.",
        stoper: "Штори піднімуться, опустяться й знову піднімуться. Малюнок рухатиметься в цьому темпі.",
        gotowe: "Так картка виглядатиме на панелі."
      },
      wykryty: "Знайдено: {0}. Інші штори цієї кімнати вибрано автоматично.",
      brakOslon: "Вільних штор не знайдено. Додайте мотор до Home Assistant.",
      uklady: {
        u1: "1 стулка",
        u2: "2 стулки",
        u3: "3 стулки",
        u4: "2 + фрамуги",
        u5: "Вікно + двері",
        u6: "Балконні двері",
        u7: "Велика посередині",
        u8: "Сітка 2 × 2",
        wlasny: "Своя"
      },
      wlasnyTytul: "Своя схема · перетягуйте лінії та низ вікна",
      wPoprzek: "Поділити впоперек",
      wzdluz: "Поділити вздовж",
      usun: "Видалити стулку",
      wlasnyPodpis: "Торкніться стулки, потім поділіть або видаліть її. До 4 стовпців і 3 стулок у стовпці.",
      zSzablonu: "Або почніть із шаблону",
      oslona: "Штора",
      rama: "Рама",
      pole: "Стулка {0}",
      silnikPola: "Мотор",
      czujnikPola: "Датчик вікна",
      bezCzujnika: "без датчика",
      bezCzujnikaOkna: "без датчика вікна",
      wybierzSilnik: "Торкніться, щоб вибрати мотор",
      gdyOtwarte: "Коли датчик показує «відчинено»",
      uchyl: "відкинуто",
      otworz: "відчинено",
      czujniki: {
        okno: "Датчики вікон",
        slonce: "Сонце",
        pogoda: "Погода",
        temp: "Температура надворі",
        obecnosc: "Хтось у кімнаті",
        wiatr: "Вітер",
        deszcz: "Дощ",
        foto: "Фотоелемент воріт"
      },
      slonceOpis: "Положення сонця з Home Assistant",
      nieZnalazlem: "Вдома не знайдено",
      nieUzywaj: "Не використовувати",
      okienBrak: "Торкніться, щоб призначити стулкам",
      auto: {
        rano: "Відкривати вранці",
        wieczor: "Закривати ввечері",
        slonce: "Захищати від сонця",
        blokada: "Не закривати при відчиненому вікні",
        wietrzenie: "Відкинуте вікно = підняти штору",
        wiatr: "Сильний вітер = прибрати",
        deszcz: "Дощ = прибрати"
      },
      oGodz: "о {0}",
      oWschodzie: "на світанку",
      oZachodzie: "на заході сонця",
      zeSloncem: "За сонцем",
      zaslon: "у спеку закрити на {0} %",
      okienne: "датчики вікон",
      wiatrOpis: "від {0} км/год",
      deszczOpis: "маркіза та фасадні жалюзі",
      strona: "Вікно виходить на",
      strony: {
        n: "північ",
        e: "схід",
        s: "південь",
        w: "захід"
      },
      autoPodpis: "Вітер і дощ з’являться тут, коли ви додасте такі датчики або погоду.",
      zmierz: "Виміряти зараз",
      zmierzZnow: "Виміряти знову",
      mierze: "Вимірюю…",
      pomin: "Можна пропустити й виміряти пізніше кнопкою пристрою «Калібрувати».",
      nieOdp: "Не відповідає: {0}",
      odRazu: "Мотор одразу повідомляє про кінець ходу. Вкажіть швидкість мотора або пропустіть.",
      bladPomiaru: "Вимірювання не вдалося. Спробуйте ще раз.",
      powiadom: {
        nie_odpowiada: "Штора не відповідає",
        nie_dojechala: "Не дійшла до кінця",
        bateria: "Низький заряд батареї",
        czujnik: "Датчик не відповідає",
        automatyka: "Автоматика зрушила штору",
        brama_otwarta: "Ворота відчинені занадто довго",
        brama_niedomknieta: "Ворота зачинені не до кінця",
        przeszkoda: "Перешкода у воротах"
      },
      powiadomOpis: {
        nie_odpowiada: "напр. мотор без живлення",
        nie_dojechala: "зупинилася на півдорозі",
        bateria: "мотор або датчик вікна",
        czujnik: "датчик із майстра",
        automatyka: "з причиною",
        brama_otwarta: "через кілька хвилин",
        brama_niedomknieta: "зупинилися на півдорозі",
        przeszkoda: "фотоелемент"
      },
      telefon: "Телефон (застосунок HA)",
      brakTelefonu: "Без телефона сповіщення з’являються лише в Home Assistant.",
      naPanel: "Додати на панель",
      nazwa: "Назва",
      zapisano: "Збережено ✓",
      wszystkie: "Показати все",
      prog: "Поріг",
      pozycja: "Положення",
      odTemp: "від темп.",
      zrodlo: "Джерело",
      przypiszPodpis: "Торкніться стулки на малюнку: виберіть мотор і датчик вікна.",
      wschodSlonca: "Схід сонця",
      zachodSlonca: "Захід сонця",
      godzina: "Час",
      przesuniecie: "Зсув",
      poWsch: "через {0} хв після сходу",
      przedWsch: "за {0} хв до сходу",
      poZach: "через {0} хв після заходу",
      przedZach: "за {0} хв до заходу",
      oknaWieczorem: "Увечері з датчиками вікон",
      nieZjedzie: "не опуститься",
      zjedzieDo: "опуститься до {0} %",
      zjedzieNormalnie: "опуститься як завжди",
      pozniej: "Коли закриєте вікно, штора доїде сама.",
      kazdy: "Кожен мотор окремо",
      slupek: "Імпост / стіна",
      przegPion: "Вертикальна перегородка",
      przegPoz: "Горизонтальна перегородка",
      obokPola: "біля поля {0}",
      podPolem: "під полем {0}",
      przegRodzaj: {
        brak: "Немає",
        slupek: "Імпост",
        belka: "Перемичка",
        sciana: "Стіна"
      },
      szerokosc: "Ширина",
      dodajSciane: "🧱 Стіна між вікнами",
      sciana: "Стіна",
      sciany: {
        biala: "біла",
        bezowa: "бежева",
        szara: "сіра",
        cegla: "цегла",
        grafit: "графіт"
      },
      belka: "Перемичка",
      brak: "немає",
      wUrzadzeniu: "також у: {0}",
      grupa: "група",
      calyPokoj: "Уся кімната: {0}",
      bezPokoju: "Без кімнати",
      pojedyncze: "Окремі",
      grupaIle: "група · стулок: {0}",
      przeciagnij: "Перетягніть, щоб поміняти",
      zamienPodpis: "Візьміть стулку на малюнку або ⠿ біля рядка й відпустіть на іншій – вони поміняються місцями.",
      jakZaleca: "Налаштувати як рекомендовано",
      caleOkno: "Усе вікно",
      rodzajCalosc: "Виберіть поле, щоб задати йому інший вид або колір.",
      rodzajPole: "Зараз налаштовується лише поле {0}."
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
      taras: "Терраса и сад",
      pionowe: "Вертикальные и шторы",
      brama: "Ворота и гараж",
      bramy: "Въездные ворота",
      garaze: "Гаражные ворота",
      dach: "Мансардные окна",
      dachowe: "Защита мансардных окон",
      markizy: "Маркизы",
      pergole: "Перголы и навесы",
      okna: "Окна и световые люки с приводом",
      moskitiery: "Москитные сетки",
      zscreen: "Скрины",
      okiennice: "Ставни",
      ekrany: "Экраны",
      szlabany: "Шлагбаумы"
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
      roletowa: "Рулонные ворота",
      roleta_zip_wew: "Рулонная штора с направляющими",
      bambusowa: "Бамбуковая штора",
      plisa_gora_dol: "Плиссе сверху и снизу",
      zaslona_wave: "Штора волна",
      firana: "Тюль на карнизе",
      panel: "Японские панели",
      ekran: "Проекционный экран",
      dach_dkl: "Затемняющая штора (DKL)",
      dach_ssl: "Солнечная наружная ролета (SSL)",
      dachowa: "Наружная ролета (ARZ)",
      dach_fhb: "Римская штора (FHB)",
      dach_msl: "Солнечная маркиза (MSL / MHL)",
      markizeta_dach: "Наружная маркиза (AMZ)",
      dach_pal: "Жалюзи (PAL)",
      dach_fhl: "Плиссе (FHL)",
      dach_dn: "Штора день/ночь в кассете",
      natynkowa_okragla: "Накладная ролета круглая (SKO)",
      adaptacyjna: "Адаптационная ролета на раму",
      roleta_moskitiera: "Ролета с москитной сеткой",
      ekstrudowana: "Противовзломная ролета",
      roleta_drzwi: "Ролета на террасную дверь",
      fasadowa_f80: "Фасадные жалюзи F80 (плоские)",
      markizoleta: "Маркизолета",
      okiennice: "Ставни",
      okiennice_przesuwne: "Раздвижные ставни",
      markiza_otwarta: "Открытая маркиза",
      markiza_polkasetowa: "Полукассетная маркиза",
      markiza_kasetowa: "Кассетная маркиза",
      markiza_volant: "Маркиза с воланом",
      markiza_koszowa: "Купольная маркиза",
      markiza_wolnostojaca: "Отдельностоящая маркиза",
      markiza_zimowa: "Маркиза для зимнего сада",
      markizeta: "Оконная маркиза",
      markiza_balkonowa: "Балконная распорная маркиза",
      markiza_pionowa: "Вертикальная балконная маркиза",
      markiza_boczna: "Боковая маркиза",
      zagiel: "Сворачиваемый теневой парус",
      parasol: "Садовый зонт",
      pergola: "Биоклиматическая пергола",
      pergola_tkanina: "Пергола с тканевой крышей",
      zadaszenie: "Навес над террасой",
      screen_taras: "Террасный скрин",
      okno_silownik: "Окно с приводом",
      okno_dachowe: "Мансардное окно с приводом",
      okno_plaskie: "Окно для плоской кровли",
      swietlik: "Световой купол",
      wylaz: "Кровельный люк",
      moskitiera: "Рулонная москитная сетка",
      moskitiera_plisa_okno: "Плиссе-сетка на окно",
      moskitiera_drzwi: "Плиссе-сетка на дверь",
      moskitiera_zip_drzwi: "Рулонная сетка на дверь",
      furtka: "Калитка",
      garaz_boczna: "Боковые секционные ворота",
      garaz_skrzydlowa: "Распашные гаражные ворота",
      szlaban: "Шлагбаум"
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
      powod: "Причина движения",
      wyglad: "Внешний вид"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "Шаг {0} из {1}",
      zamknij: "Закрыть",
      wstecz: "Назад",
      dalej: "Далее",
      zapisz: "Сохранить",
      gotowe: "Готово",
      kroki: {
        silnik: "Устройство",
        uklad: "Схема",
        rodzaj: "Тип",
        kolory: "Цвета",
        przypisz: "Створки",
        czujniki: "Датчики",
        auto: "Автоматика",
        stoper: "Время",
        dzwonek: "Уведомления",
        gotowe: "Готово"
      },
      pytania: {
        silnik: "Какую штору вы добавляете?",
        uklad: "Как выглядит окно?",
        rodzaj: "Что висит на окне?",
        rodzajBrama: "Какой это тип ворот?",
        kolory: "Цвета",
        przypisz: "Нажмите на створку окна",
        czujniki: "Что Motor HA знает о доме",
        auto: "Что должно происходить само",
        stoper: "Время хода",
        dzwonek: "Куда и о чём уведомлять",
        gotowe: "Готово"
      },
      podpisy: {
        silnik: "Все шторы из Home Assistant. Уже используемые в другом устройстве подписаны.",
        uklad: "Нажмите на самую похожую схему.",
        przypisz: "Каждая створка: мотор и датчик. Подсказки уже заполнены.",
        czujniki: "Найдено в комнате и в доме. Нажмите, чтобы выключить или изменить.",
        auto: "Ничего не движется само, пока вы это не включите.",
        stoper: "Шторы поднимутся, опустятся и снова поднимутся. Рисунок будет двигаться в этом темпе.",
        gotowe: "Так карточка будет выглядеть на панели."
      },
      wykryty: "Найдено: {0}. Остальные шторы этой комнаты выбраны автоматически.",
      brakOslon: "Свободных штор не найдено. Добавьте мотор в Home Assistant.",
      uklady: {
        u1: "1 створка",
        u2: "2 створки",
        u3: "3 створки",
        u4: "2 + фрамуги",
        u5: "Окно + дверь",
        u6: "Балконная дверь",
        u7: "Большая в центре",
        u8: "Сетка 2 × 2",
        wlasny: "Своя"
      },
      wlasnyTytul: "Своя схема · перетаскивайте линии и низ окна",
      wPoprzek: "Разделить поперёк",
      wzdluz: "Разделить вдоль",
      usun: "Удалить створку",
      wlasnyPodpis: "Нажмите на створку, затем разделите или удалите её. До 4 столбцов и 3 створок в столбце.",
      zSzablonu: "Или начните с шаблона",
      oslona: "Штора",
      rama: "Рама",
      pole: "Створка {0}",
      silnikPola: "Мотор",
      czujnikPola: "Датчик окна",
      bezCzujnika: "без датчика",
      bezCzujnikaOkna: "без датчика окна",
      wybierzSilnik: "Нажмите, чтобы выбрать мотор",
      gdyOtwarte: "Когда датчик показывает «открыто»",
      uchyl: "откинуто",
      otworz: "открыто",
      czujniki: {
        okno: "Датчики окон",
        slonce: "Солнце",
        pogoda: "Погода",
        temp: "Температура на улице",
        obecnosc: "Кто-то в комнате",
        wiatr: "Ветер",
        deszcz: "Дождь",
        foto: "Фотоэлемент ворот"
      },
      slonceOpis: "Положение солнца из Home Assistant",
      nieZnalazlem: "В доме не найдено",
      nieUzywaj: "Не использовать",
      okienBrak: "Нажмите, чтобы назначить створкам",
      auto: {
        rano: "Открывать утром",
        wieczor: "Закрывать вечером",
        slonce: "Защищать от солнца",
        blokada: "Не закрывать при открытом окне",
        wietrzenie: "Откинутое окно = поднять штору",
        wiatr: "Сильный ветер = убрать",
        deszcz: "Дождь = убрать"
      },
      oGodz: "в {0}",
      oWschodzie: "на рассвете",
      oZachodzie: "на закате",
      zeSloncem: "По солнцу",
      zaslon: "в жару закрыть на {0} %",
      okienne: "датчики окон",
      wiatrOpis: "от {0} км/ч",
      deszczOpis: "маркиза и фасадные жалюзи",
      strona: "Окно выходит на",
      strony: {
        n: "север",
        e: "восток",
        s: "юг",
        w: "запад"
      },
      autoPodpis: "Ветер и дождь появятся здесь, когда вы добавите такие датчики или погоду.",
      zmierz: "Измерить сейчас",
      zmierzZnow: "Измерить снова",
      mierze: "Измеряю…",
      pomin: "Можно пропустить и измерить позже кнопкой устройства «Калибровать».",
      nieOdp: "Не отвечает: {0}",
      odRazu: "Мотор сразу сообщает о конце хода. Укажите скорость мотора или пропустите.",
      bladPomiaru: "Измерение не удалось. Попробуйте ещё раз.",
      powiadom: {
        nie_odpowiada: "Штора не отвечает",
        nie_dojechala: "Не дошла до конца",
        bateria: "Низкий заряд батареи",
        czujnik: "Датчик не отвечает",
        automatyka: "Автоматика сдвинула штору",
        brama_otwarta: "Ворота открыты слишком долго",
        brama_niedomknieta: "Ворота закрыты не до конца",
        przeszkoda: "Препятствие в воротах"
      },
      powiadomOpis: {
        nie_odpowiada: "например, мотор без питания",
        nie_dojechala: "остановилась на полпути",
        bateria: "мотор или датчик окна",
        czujnik: "датчик из мастера",
        automatyka: "с причиной",
        brama_otwarta: "через несколько минут",
        brama_niedomknieta: "остановились на полпути",
        przeszkoda: "фотоэлемент"
      },
      telefon: "Телефон (приложение HA)",
      brakTelefonu: "Без телефона уведомления появляются только в Home Assistant.",
      naPanel: "Добавить на панель",
      nazwa: "Название",
      zapisano: "Сохранено ✓",
      wszystkie: "Показать все",
      prog: "Порог",
      pozycja: "Положение",
      odTemp: "от темп.",
      zrodlo: "Источник",
      przypiszPodpis: "Нажмите на створку на рисунке: выберите мотор и датчик окна.",
      wschodSlonca: "Восход",
      zachodSlonca: "Закат",
      godzina: "Время",
      przesuniecie: "Сдвиг",
      poWsch: "через {0} мин после восхода",
      przedWsch: "за {0} мин до восхода",
      poZach: "через {0} мин после заката",
      przedZach: "за {0} мин до заката",
      oknaWieczorem: "Вечером с датчиками окон",
      nieZjedzie: "не опустится",
      zjedzieDo: "опустится до {0} %",
      zjedzieNormalnie: "опустится как обычно",
      pozniej: "Когда закроете окно, штора доедет сама.",
      kazdy: "Каждый мотор отдельно",
      slupek: "Импост / стена",
      przegPion: "Вертикальная перегородка",
      przegPoz: "Горизонтальная перегородка",
      obokPola: "рядом с полем {0}",
      podPolem: "под полем {0}",
      przegRodzaj: {
        brak: "Нет",
        slupek: "Импост",
        belka: "Перемычка",
        sciana: "Стена"
      },
      szerokosc: "Ширина",
      dodajSciane: "🧱 Стена между окнами",
      sciana: "Стена",
      sciany: {
        biala: "белая",
        bezowa: "бежевая",
        szara: "серая",
        cegla: "кирпич",
        grafit: "графит"
      },
      belka: "Перемычка",
      brak: "нет",
      wUrzadzeniu: "также в: {0}",
      grupa: "группа",
      calyPokoj: "Вся комната: {0}",
      bezPokoju: "Без комнаты",
      pojedyncze: "Отдельные",
      grupaIle: "группа · створок: {0}",
      przeciagnij: "Перетащите, чтобы поменять",
      zamienPodpis: "Возьмите створку на рисунке или ⠿ у строки и отпустите на другой – они поменяются местами.",
      jakZaleca: "Настроить как рекомендовано",
      caleOkno: "Всё окно",
      rodzajCalosc: "Выберите поле, чтобы задать ему другой вид или цвет.",
      rodzajPole: "Сейчас настраивается только поле {0}."
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
      taras: "テラスと庭",
      pionowe: "縦型とカーテン",
      brama: "門とガレージ",
      bramy: "門扉",
      garaze: "ガレージドア",
      dach: "天窓",
      dachowe: "天窓用シェード",
      markizy: "オーニング",
      pergole: "パーゴラと屋根",
      okna: "電動窓と天窓",
      moskitiery: "網戸",
      zscreen: "スクリーン",
      okiennice: "よろい戸",
      ekrany: "スクリーン",
      szlabany: "遮断機"
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
      roletowa: "シャッター",
      roleta_zip_wew: "サイドガイド付きロールスクリーン",
      bambusowa: "竹製ロールスクリーン",
      plisa_gora_dol: "上下開閉プリーツ",
      zaslona_wave: "ウェーブカーテン",
      firana: "レースカーテン",
      panel: "パネルスクリーン",
      ekran: "プロジェクタースクリーン",
      dach_dkl: "遮光ブラインド (DKL)",
      dach_ssl: "ソーラー外付けシャッター (SSL)",
      dachowa: "外付けシャッター (ARZ)",
      dach_fhb: "シェード (FHB)",
      dach_msl: "ソーラー外付けスクリーン (MSL / MHL)",
      markizeta_dach: "外付けスクリーン (AMZ)",
      dach_pal: "ベネチアンブラインド (PAL)",
      dach_fhl: "プリーツスクリーン (FHL)",
      dach_dn: "カセット付き調光ロールスクリーン",
      natynkowa_okragla: "丸型ボックスシャッター (SKO)",
      adaptacyjna: "窓枠取付シャッター",
      roleta_moskitiera: "網戸付きシャッター",
      ekstrudowana: "防犯シャッター",
      roleta_drzwi: "テラスドア用シャッター",
      fasadowa_f80: "外付けブラインド F80（平型）",
      markizoleta: "マーキソレット",
      okiennice: "よろい戸",
      okiennice_przesuwne: "引き戸式よろい戸",
      markiza_otwarta: "オープン型オーニング",
      markiza_polkasetowa: "セミカセットオーニング",
      markiza_kasetowa: "フルカセットオーニング",
      markiza_volant: "バランス付きオーニング",
      markiza_koszowa: "ドーム型オーニング",
      markiza_wolnostojaca: "自立式オーニング",
      markiza_zimowa: "サンルーム用オーニング",
      markizeta: "窓用オーニング",
      markiza_balkonowa: "突っ張り式バルコニーオーニング",
      markiza_pionowa: "縦型バルコニーオーニング",
      markiza_boczna: "サイドオーニング",
      zagiel: "巻き取り式シェードセイル",
      parasol: "ガーデンパラソル",
      pergola: "ルーバーパーゴラ",
      pergola_tkanina: "布屋根パーゴラ",
      zadaszenie: "テラス屋根",
      screen_taras: "テラススクリーン",
      okno_silownik: "電動窓",
      okno_dachowe: "電動天窓",
      okno_plaskie: "陸屋根用天窓",
      swietlik: "ドーム型天窓",
      wylaz: "屋根ハッチ",
      moskitiera: "ロール網戸",
      moskitiera_plisa_okno: "窓用プリーツ網戸",
      moskitiera_drzwi: "ドア用プリーツ網戸",
      moskitiera_zip_drzwi: "ドア用ロール網戸",
      furtka: "門扉",
      garaz_boczna: "横引き式セクショナルドア",
      garaz_skrzydlowa: "観音開きガレージドア",
      szlaban: "遮断機"
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
      powod: "動いた理由",
      wyglad: "外観"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "ステップ {0} / {1}",
      zamknij: "閉じる",
      wstecz: "戻る",
      dalej: "次へ",
      zapisz: "保存",
      gotowe: "完了",
      kroki: {
        silnik: "デバイス",
        uklad: "レイアウト",
        rodzaj: "種類",
        kolory: "色",
        przypisz: "窓枠",
        czujniki: "センサー",
        auto: "自動化",
        stoper: "時間",
        dzwonek: "通知",
        gotowe: "完了"
      },
      pytania: {
        silnik: "どのシェードを追加しますか？",
        uklad: "窓はどんな形ですか？",
        rodzaj: "窓に何が付いていますか？",
        rodzajBrama: "どの種類のゲートですか？",
        kolory: "色",
        przypisz: "窓の区画をタップ",
        czujniki: "Motor HA が家について知っていること",
        auto: "自動で行うこと",
        stoper: "移動時間",
        dzwonek: "通知先と通知内容",
        gotowe: "完了"
      },
      podpisy: {
        silnik: "Home Assistant のすべてのカバー。ほかのデバイスで使用中のものには表示があります。",
        uklad: "いちばん近いレイアウトをタップします。",
        przypisz: "各区画にモーターとセンサー。候補は入力済みです。",
        czujniki: "部屋と家の中で見つかりました。タップでオフまたは変更。",
        auto: "オンにするまで何も自動では動きません。",
        stoper: "シェードが上、下、また上へ動きます。図はこの速さで動きます。",
        gotowe: "ダッシュボードのカードはこう見えます。"
      },
      wykryty: "{0} を検出しました。この部屋の他のシェードは自動で選ばれます。",
      brakOslon: "空いているシェードがありません。Home Assistant にモーターを追加してください。",
      uklady: {
        u1: "1 枚窓",
        u2: "2 枚窓",
        u3: "3 枚窓",
        u4: "2 + 欄間",
        u5: "窓 + ドア",
        u6: "テラスドア",
        u7: "中央が大きい",
        u8: "2 × 2 格子",
        wlasny: "カスタム"
      },
      wlasnyTytul: "カスタム · 線と窓の下端をドラッグ",
      wPoprzek: "横に分割",
      wzdluz: "縦に分割",
      usun: "区画を削除",
      wlasnyPodpis: "区画をタップして分割または削除。最大 4 列、1 列に 3 区画まで。",
      zSzablonu: "またはテンプレートから",
      oslona: "シェード",
      rama: "窓枠",
      pole: "区画 {0}",
      silnikPola: "モーター",
      czujnikPola: "窓センサー",
      bezCzujnika: "センサーなし",
      bezCzujnikaOkna: "窓センサーなし",
      wybierzSilnik: "タップしてモーターを選択",
      gdyOtwarte: "センサーが「開」のとき",
      uchyl: "内倒し",
      otworz: "全開",
      czujniki: {
        okno: "窓センサー",
        slonce: "太陽",
        pogoda: "天気",
        temp: "外気温",
        obecnosc: "部屋に人がいる",
        wiatr: "風",
        deszcz: "雨",
        foto: "ゲートの光電センサー"
      },
      slonceOpis: "Home Assistant の太陽の位置",
      nieZnalazlem: "家の中に見つかりません",
      nieUzywaj: "使わない",
      okienBrak: "タップして区画に割り当て",
      auto: {
        rano: "朝に開ける",
        wieczor: "夜に閉める",
        slonce: "日差しから守る",
        blokada: "窓が開いていたら閉めない",
        wietrzenie: "内倒しの窓 = シェードを上げる",
        wiatr: "強風 = 収納",
        deszcz: "雨 = 収納"
      },
      oGodz: "{0} に",
      oWschodzie: "日の出に",
      oZachodzie: "日没に",
      zeSloncem: "太陽に合わせる",
      zaslon: "暑い日は {0} % 閉める",
      okienne: "窓センサー",
      wiatrOpis: "{0} km/h から",
      deszczOpis: "オーニングと外付けブラインド",
      strona: "窓の向き",
      strony: {
        n: "北",
        e: "東",
        s: "南",
        w: "西"
      },
      autoPodpis: "風と雨は、該当するセンサーや天気を追加するとここに表示されます。",
      zmierz: "今すぐ測定",
      zmierzZnow: "もう一度測定",
      mierze: "測定中…",
      pomin: "スキップして、後でデバイスの「校正」ボタンで測定できます。",
      nieOdp: "応答なし: {0}",
      odRazu: "モーターがすぐに終点を報告します。モーター速度を設定するかスキップしてください。",
      bladPomiaru: "測定に失敗しました。もう一度お試しください。",
      powiadom: {
        nie_odpowiada: "シェードが応答しない",
        nie_dojechala: "終点に届かない",
        bateria: "電池残量低下",
        czujnik: "センサーが応答しない",
        automatyka: "自動化がシェードを動かした",
        brama_otwarta: "ゲートが長く開いている",
        brama_niedomknieta: "ゲートが閉まりきらない",
        przeszkoda: "ゲートに障害物"
      },
      powiadomOpis: {
        nie_odpowiada: "例: モーターの電源なし",
        nie_dojechala: "途中で停止",
        bateria: "モーターまたは窓センサー",
        czujnik: "ウィザードのセンサー",
        automatyka: "理由つき",
        brama_otwarta: "数分後",
        brama_niedomknieta: "途中で停止",
        przeszkoda: "光電センサー"
      },
      telefon: "スマホ (HA アプリ)",
      brakTelefonu: "スマホがない場合、通知は Home Assistant にのみ表示されます。",
      naPanel: "ダッシュボードに追加",
      nazwa: "名前",
      zapisano: "保存しました ✓",
      wszystkie: "すべて表示",
      prog: "しきい値",
      pozycja: "位置",
      odTemp: "気温から",
      zrodlo: "ソース",
      przypiszPodpis: "図のサッシをタップして、モーターと窓センサーを選びます。",
      wschodSlonca: "日の出",
      zachodSlonca: "日の入り",
      godzina: "時刻",
      przesuniecie: "ずらし",
      poWsch: "日の出の{0}分後",
      przedWsch: "日の出の{0}分前",
      poZach: "日の入りの{0}分後",
      przedZach: "日の入りの{0}分前",
      oknaWieczorem: "夜、窓センサーとの連動",
      nieZjedzie: "閉まりません",
      zjedzieDo: "{0} %まで閉まります",
      zjedzieNormalnie: "通常どおり閉まります",
      pozniej: "窓を閉めると、カバーは自動で閉まりきります。",
      kazdy: "モーターごと",
      slupek: "方立 / 壁",
      przegPion: "縦の仕切り",
      przegPoz: "横の仕切り",
      obokPola: "パネル{0}の横",
      podPolem: "パネル{0}の下",
      przegRodzaj: {
        brak: "なし",
        slupek: "方立",
        belka: "無目",
        sciana: "壁"
      },
      szerokosc: "幅",
      dodajSciane: "🧱 窓の間の壁",
      sciana: "壁",
      sciany: {
        biala: "白",
        bezowa: "ベージュ",
        szara: "グレー",
        cegla: "レンガ",
        grafit: "グラファイト"
      },
      belka: "無目",
      brak: "なし",
      wUrzadzeniu: "{0} でも使用",
      grupa: "グループ",
      calyPokoj: "部屋全体：{0}",
      bezPokoju: "部屋なし",
      pojedyncze: "単独",
      grupaIle: "グループ · {0} 枚",
      przeciagnij: "ドラッグで入れ替え",
      zamienPodpis: "図のサッシか行の ⠿ をつかんで別の上で放すと入れ替わります。",
      jakZaleca: "おすすめ通りに設定",
      caleOkno: "窓全体",
      rodzajCalosc: "区画を選ぶと、別の種類や色にできます。",
      rodzajPole: "今は区画 {0} だけを設定しています。"
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
      taras: "露台与花园",
      pionowe: "垂直帘与窗帘",
      brama: "大门与车库",
      bramy: "庭院大门",
      garaze: "车库门",
      dach: "天窗",
      dachowe: "天窗遮阳",
      markizy: "遮阳篷",
      pergole: "凉亭与雨棚",
      okna: "电动窗与天窗",
      moskitiery: "纱窗",
      zscreen: "卷帘屏",
      okiennice: "百叶窗扇",
      ekrany: "幕布",
      szlabany: "道闸"
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
      roletowa: "卷帘门",
      roleta_zip_wew: "带侧导轨卷帘",
      bambusowa: "竹帘",
      plisa_gora_dol: "上下双开百褶帘",
      zaslona_wave: "波浪窗帘",
      firana: "纱帘",
      panel: "日式推拉帘",
      ekran: "投影幕",
      dach_dkl: "遮光卷帘 (DKL)",
      dach_ssl: "太阳能外卷帘 (SSL)",
      dachowa: "外卷帘 (ARZ)",
      dach_fhb: "罗马帘 (FHB)",
      dach_msl: "太阳能遮阳篷 (MSL / MHL)",
      markizeta_dach: "外遮阳篷 (AMZ)",
      dach_pal: "百叶帘 (PAL)",
      dach_fhl: "百褶帘 (FHL)",
      dach_dn: "盒式日夜帘",
      natynkowa_okragla: "圆形外装卷帘 (SKO)",
      adaptacyjna: "窗框式卷帘",
      roleta_moskitiera: "带纱窗卷帘",
      ekstrudowana: "防盗卷帘",
      roleta_drzwi: "露台门卷帘",
      fasadowa_f80: "外遮阳百叶 F80（平板）",
      markizoleta: "外推式遮阳帘",
      okiennice: "百叶窗扇",
      okiennice_przesuwne: "推拉百叶窗",
      markiza_otwarta: "开放式遮阳篷",
      markiza_polkasetowa: "半盒式遮阳篷",
      markiza_kasetowa: "全盒式遮阳篷",
      markiza_volant: "带垂帘遮阳篷",
      markiza_koszowa: "半圆遮阳篷",
      markiza_wolnostojaca: "独立式遮阳篷",
      markiza_zimowa: "阳光房遮阳篷",
      markizeta: "窗户遮阳篷",
      markiza_balkonowa: "阳台夹式遮阳篷",
      markiza_pionowa: "垂直阳台遮阳篷",
      markiza_boczna: "侧面遮阳帘",
      zagiel: "可收卷遮阳帆",
      parasol: "庭院遮阳伞",
      pergola: "百叶凉亭",
      pergola_tkanina: "布顶凉亭",
      zadaszenie: "露台雨棚",
      screen_taras: "露台卷帘",
      okno_silownik: "电动窗",
      okno_dachowe: "电动天窗",
      okno_plaskie: "平屋顶窗",
      swietlik: "采光穹顶",
      wylaz: "屋顶检修口",
      moskitiera: "卷式纱窗",
      moskitiera_plisa_okno: "窗用折叠纱窗",
      moskitiera_drzwi: "门用折叠纱窗",
      moskitiera_zip_drzwi: "门用卷式纱窗",
      furtka: "小门",
      garaz_boczna: "侧开分节门",
      garaz_skrzydlowa: "对开车库门",
      szlaban: "道闸"
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
      powod: "移动原因",
      wyglad: "外观"
    },
    kreator: {
      tytul: "Motor HA",
      krok: "第 {0} 步，共 {1} 步",
      zamknij: "关闭",
      wstecz: "返回",
      dalej: "下一步",
      zapisz: "保存",
      gotowe: "完成",
      kroki: {
        silnik: "设备",
        uklad: "布局",
        rodzaj: "类型",
        kolory: "颜色",
        przypisz: "窗格",
        czujniki: "传感器",
        auto: "自动化",
        stoper: "时间",
        dzwonek: "通知",
        gotowe: "完成"
      },
      pytania: {
        silnik: "要添加哪个遮阳？",
        uklad: "窗户是什么样的？",
        rodzaj: "窗上挂的是什么？",
        rodzajBrama: "是哪种大门？",
        kolory: "颜色",
        przypisz: "点击窗户的一个窗格",
        czujniki: "Motor HA 了解的家中信息",
        auto: "应自动执行的操作",
        stoper: "运行时间",
        dzwonek: "通知到哪里、通知什么",
        gotowe: "完成"
      },
      podpisy: {
        silnik: "Home Assistant 中的所有遮阳。已在其他设备中使用的会标注。",
        uklad: "点击最接近的布局。",
        przypisz: "每个窗格：一个电机和一个传感器。建议已填好。",
        czujniki: "在房间和家中找到。点击可关闭或更改。",
        auto: "在你开启之前，什么都不会自动移动。",
        stoper: "遮阳会上升、下降再上升。图示会按这个速度移动。",
        gotowe: "卡片在仪表板上会是这样。"
      },
      wykryty: "已检测到 {0}。此房间的其他遮阳已自动选中。",
      brakOslon: "没有找到空闲的遮阳。请在 Home Assistant 中添加电机。",
      uklady: {
        u1: "1 扇",
        u2: "2 扇",
        u3: "3 扇",
        u4: "2 扇 + 气窗",
        u5: "窗 + 门",
        u6: "阳台门",
        u7: "中间大扇",
        u8: "2 × 2 网格",
        wlasny: "自定义"
      },
      wlasnyTytul: "自定义布局 · 拖动分隔线和窗户底边",
      wPoprzek: "横向分割",
      wzdluz: "纵向分割",
      usun: "删除窗格",
      wlasnyPodpis: "点击窗格，然后分割或删除。最多 4 列，每列 3 个窗格。",
      zSzablonu: "或从模板开始",
      oslona: "遮阳",
      rama: "窗框",
      pole: "窗格 {0}",
      silnikPola: "电机",
      czujnikPola: "窗户传感器",
      bezCzujnika: "无传感器",
      bezCzujnikaOkna: "无窗户传感器",
      wybierzSilnik: "点击选择电机",
      gdyOtwarte: "当传感器显示打开时",
      uchyl: "内倒",
      otworz: "打开",
      czujniki: {
        okno: "窗户传感器",
        slonce: "太阳",
        pogoda: "天气",
        temp: "室外温度",
        obecnosc: "房间有人",
        wiatr: "风",
        deszcz: "雨",
        foto: "大门光电传感器"
      },
      slonceOpis: "来自 Home Assistant 的太阳位置",
      nieZnalazlem: "家中未找到",
      nieUzywaj: "不使用",
      okienBrak: "点击分配到窗格",
      auto: {
        rano: "早上打开",
        wieczor: "晚上关闭",
        slonce: "防晒",
        blokada: "窗户打开时不关闭",
        wietrzenie: "内倒窗 = 升起遮阳",
        wiatr: "大风 = 收起",
        deszcz: "下雨 = 收起"
      },
      oGodz: "{0}",
      oWschodzie: "日出时",
      oZachodzie: "日落时",
      zeSloncem: "跟随太阳",
      zaslon: "炎热时遮挡 {0} %",
      okienne: "窗户传感器",
      wiatrOpis: "从 {0} km/h 起",
      deszczOpis: "遮阳篷和外遮阳百叶",
      strona: "窗户朝向",
      strony: {
        n: "北",
        e: "东",
        s: "南",
        w: "西"
      },
      autoPodpis: "添加相应传感器或天气后，风和雨会显示在这里。",
      zmierz: "立即测量",
      zmierzZnow: "重新测量",
      mierze: "测量中…",
      pomin: "可以跳过，稍后用设备的“校准”按钮测量。",
      nieOdp: "无响应：{0}",
      odRazu: "电机立即报告到位。请设置电机速度或跳过。",
      bladPomiaru: "测量失败。请重试。",
      powiadom: {
        nie_odpowiada: "遮阳无响应",
        nie_dojechala: "未到达终点",
        bateria: "电量低",
        czujnik: "传感器无响应",
        automatyka: "自动化移动了遮阳",
        brama_otwarta: "大门打开太久",
        brama_niedomknieta: "大门未完全关闭",
        przeszkoda: "大门有障碍物"
      },
      powiadomOpis: {
        nie_odpowiada: "例如电机断电",
        nie_dojechala: "中途停止",
        bateria: "电机或窗户传感器",
        czujnik: "向导中的传感器",
        automatyka: "附带原因",
        brama_otwarta: "几分钟后",
        brama_niedomknieta: "中途停止",
        przeszkoda: "光电传感器"
      },
      telefon: "手机（HA 应用）",
      brakTelefonu: "没有手机时，通知只显示在 Home Assistant 中。",
      naPanel: "添加到仪表板",
      nazwa: "名称",
      zapisano: "已保存 ✓",
      wszystkie: "显示全部",
      prog: "阈值",
      pozycja: "位置",
      odTemp: "起始温度",
      zrodlo: "来源",
      przypiszPodpis: "点按图中的窗扇，选择电机和窗户传感器。",
      wschodSlonca: "日出",
      zachodSlonca: "日落",
      godzina: "时间",
      przesuniecie: "偏移",
      poWsch: "日出后 {0} 分钟",
      przedWsch: "日出前 {0} 分钟",
      poZach: "日落后 {0} 分钟",
      przedZach: "日落前 {0} 分钟",
      oknaWieczorem: "晚上与窗户传感器联动",
      nieZjedzie: "不会关闭",
      zjedzieDo: "关到 {0} %",
      zjedzieNormalnie: "正常关闭",
      pozniej: "关窗后，遮阳会自动关完。",
      kazdy: "每个电机单独",
      slupek: "竖梃 / 墙",
      przegPion: "竖向隔断",
      przegPoz: "横向隔断",
      obokPola: "窗格{0}旁",
      podPolem: "窗格{0}下方",
      przegRodzaj: {
        brak: "无",
        slupek: "竖框",
        belka: "横框",
        sciana: "墙"
      },
      szerokosc: "宽度",
      dodajSciane: "🧱 窗户之间的墙",
      sciana: "墙",
      sciany: {
        biala: "白色",
        bezowa: "米色",
        szara: "灰色",
        cegla: "砖",
        grafit: "石墨"
      },
      belka: "横档",
      brak: "无",
      wUrzadzeniu: "也在：{0}",
      grupa: "组",
      calyPokoj: "整个房间：{0}",
      bezPokoju: "无房间",
      pojedyncze: "单个",
      grupaIle: "组 · {0} 扇",
      przeciagnij: "拖动以交换",
      zamienPodpis: "拖住图中的窗扇或行旁的 ⠿，放到另一个上即可交换。",
      jakZaleca: "按推荐设置",
      caleOkno: "整扇窗",
      rodzajCalosc: "选择一个格子，可为它设置其他类型或颜色。",
      rodzajPole: "现在只设置第 {0} 格。"
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
  var scal = (baza2, x) => baza2 && typeof baza2 === "object" && !Array.isArray(baza2) ? Object.fromEntries(Object.entries(baza2).map(([k, v]) => [k, scal(v, x?.[k])])) : typeof x === typeof baza2 ? x : baza2;
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
        const klucz2 = JSON.stringify(wiersze);
        if (klucz2 !== this._ost) {
          this._ost = klucz2;
          const lista = root.querySelector(".wiersze");
          lista.innerHTML = wiersze.map(([a, b, cel], i) => {
            const dziala = cel.encja || c.wpis;
            return `<div class="wiersz${dziala ? " klik" : ""}" ${dziala ? `role="button" tabindex="0" data-i="${i}"` : ""}><span>${esc(a)}</span><span>${esc(b)}</span></div>`;
          }).join("");
          lista.querySelectorAll(".klik").forEach((el) => {
            const idz2 = () => this._edytuj(wiersze[+el.dataset.i][2]);
            el.addEventListener("click", idz2);
            el.addEventListener("keydown", (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                idz2();
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
    const idz2 = (u3) => {
      history.pushState(null, "", u3);
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
    const okno3 = () => document.querySelector("home-assistant")?.shadowRoot?.querySelector("dialog-data-entry-flow");
    idz2("/config/integrations/integration/motor_ha");
    let n = 0;
    const t = setInterval(() => {
      const w = szukaj(document);
      if (w && typeof w._showOptions === "function") {
        clearInterval(t);
        w._showOptions();
        let bylo = false, m = 0;
        const p = setInterval(() => {
          const o = okno3(), otwarte = !!(o && o._params);
          if (otwarte) bylo = true;
          if (bylo && !otwarte || ++m > 7200) {
            clearInterval(p);
            if (bylo && location.pathname.startsWith("/config/integrations/integration/motor_ha")) idz2(skad);
          }
        }, 250);
      } else if (++n > 80) clearInterval(t);
    }, 250);
  }

  // src/ikony_ui.js
  var ikUI = (n, zapas = "") => {
    if (!UI.has(n + ".png")) return zapas;
    const c = UI.has(n + "-ciemny.png");
    return `<img class="iku${c ? " jas" : ""}" src="/motor_ha/ui/${n}.png?v=${WERSJA}" alt="" draggable="false">${c ? `<img class="iku ciem" src="/motor_ha/ui/${n}-ciemny.png?v=${WERSJA}" alt="" draggable="false">` : ""}`;
  };
  var STYL_IKU = `.iku{display:block;width:var(--iku,24px);height:var(--iku,24px);object-fit:contain;pointer-events:none}
.iku.ciem,.ciemny .iku.jas{display:none}.ciemny .iku.ciem{display:block}`;

  // src/ramki.js
  var RAMKI = { "adaptacyjna": [0.2176, 0.0994, 0.5596, 0.3478], "bambusowa": [0.2332, 0.1056, 0.5389, 0.4472], "dach_dkl": [0.2746, 0.1366, 0.456, 0.3354], "dach_dn": [0.2487, 0.1118, 0.5078, 0.2795], "dach_fhb": [0.2176, 0.0807, 0.5855, 0.7702], "dach_fhl": [0.2383, 0.0994, 0.5181, 0.559], "dach_msl": [0.1088, 0.0311, 0.7876, 0.9068], "dach_pal": [0.2383, 0.118, 0.5181, 0.3975], "dach_ssl": [0.1347, 0.0497, 0.7461, 0.8758], "dachowa": [0.1192, 0.0559, 0.8446, 0.8758], "drewniana": [0.2176, 0.0994, 0.5699, 0.5093], "ekran": [0.1347, 0.2484, 0.7409, 0.472], "ekstrudowana": [0.1088, 0.0559, 0.7876, 0.882], "fasadowa": [0.1658, 0.0559, 0.6736, 0.8696], "fasadowa_f80": [0.1451, 0.118, 0.7047, 0.4286], "fasadowaz": [0.1762, 0.0559, 0.6528, 0.882], "furtka": [0.2487, 0.0311, 0.5026, 0.8696], "garaz_boczna": [0.0622, 0.1118, 0.8912, 0.7453], "garaz_skrzydlowa": [0.2694, 0.1429, 0.3938, 0.5404], "kasetowa": [0.2435, 0.1739, 0.5181, 0.6335], "markiza": [0.057, 0.2112, 0.9275, 0.3727], "markiza_balkonowa": [0.1451, 0.0497, 0.7979, 0.8447], "markiza_boczna": [0.228, 0.1118, 0.658, 0.7019], "markiza_kasetowa": [0.0984, 0.3292, 0.8549, 0.3602], "markiza_koszowa": [0.171, 0.0745, 0.7047, 0.8012], "markiza_otwarta": [0.1036, 0.1988, 0.8653, 0.4348], "markiza_pionowa": [0.1969, 0.0435, 0.6114, 0.6398], "markiza_polkasetowa": [0.1503, 0.2733, 0.7979, 0.3106], "markiza_volant": [0.1192, 0.236, 0.8187, 0.559], "markiza_wolnostojaca": [0.1347, 0.1366, 0.8135, 0.205], "markiza_zimowa": [0.2642, 0.0621, 0.658, 0.3292], "markizeta": [0.2228, 0.1429, 0.6943, 0.2422], "markizeta_dach": [0.1295, 0.0497, 0.7617, 0.8944], "markizoleta": [0.2021, 0.0373, 0.6477, 0.9068], "moskitiera": [0.228, 0.1242, 0.5492, 0.3913], "moskitiera_drzwi": [0.3264, 0.0621, 0.1917, 0.8696], "moskitiera_plisa_okno": [0.1606, 0.1366, 0.3679, 0.7205], "moskitiera_zip_drzwi": [0.342, 0.0683, 0.3212, 0.3851], "natynkowa": [0.1762, 0.1056, 0.658, 0.8137], "natynkowa_okragla": [0.1813, 0.0311, 0.6373, 0.913], "okiennice": [0.1295, 0.0745, 0.7461, 0.8137], "okiennice_przesuwne": [0.0881, 0.1304, 0.829, 0.7391], "panel": [0.0984, 0.1118, 0.8135, 0.764], "parasol": [0.2746, 0.1615, 0.4249, 0.7702], "pelna": [0.2073, 0.087, 0.5907, 0.441], "perforowana": [0.1865, 0.0497, 0.6321, 0.8882], "pergola": [0.0674, 0.0621, 0.8705, 0.8634], "pergola_tkanina": [0.1606, 0.118, 0.7565, 0.2671], "pionowa": [0.2902, 0.0807, 0.4249, 0.8447], "plaster": [0.2591, 0.0994, 0.4767, 0.3354], "plisa": [0.2383, 0.0994, 0.5181, 0.3354], "plisa_gora_dol": [0.2383, 0.2671, 0.5181, 0.3106], "podtynkowa": [0.2539, 0.1615, 0.4974, 0.6708], "przesuwna": [0.0259, 0.2547, 0.9585, 0.4099], "roleta_drzwi": [0.3161, 0.0311, 0.3679, 0.9193], "roleta_moskitiera": [0.2176, 0.0559, 0.5699, 0.8758], "roleta_zip_wew": [0.1917, 0.0621, 0.6166, 0.8571], "roletowa": [0.1451, 0.1739, 0.7047, 0.4224], "rzymska": [0.2383, 0.1056, 0.5285, 0.5031], "screen": [0.1762, 0.0621, 0.6528, 0.8696], "screen_taras": [0.0363, 0.1056, 0.9326, 0.7702], "segmentowa": [0.0984, 0.1491, 0.8083, 0.4348], "skrzydlowa": [0.0466, 0.1366, 0.9171, 0.6584], "szlaban": [0.2176, 0.4161, 0.1606, 0.4783], "uchylna": [0.0674, 0.087, 0.9016, 0.795], "zaciemniajaca": [0.2073, 0.1491, 0.5855, 0.677], "zadaszenie": [0.0881, 0.0807, 0.772, 0.2795], "zagiel": [0.114, 0.0497, 0.7358, 0.559], "zaluzja": [0.2176, 0.0994, 0.5596, 0.3789], "zaslona": [0.0622, 0.1304, 0.886, 0.7391], "zaslona_wave": [0.0829, 0.1615, 0.5233, 0.6646], "zebra": [0.1969, 0.0745, 0.601, 0.3727], "zewnetrzna": [0.228, 0.0559, 0.5492, 0.8696] };

  // src/przekolor.js
  var gotowe = /* @__PURE__ */ new Map();
  var wToku = /* @__PURE__ */ new Map();
  var wczytaj = (src) => new Promise((ok, zle) => {
    const i = new Image();
    i.onload = () => ok(i);
    i.onerror = zle;
    i.src = src;
  });
  var rgb3 = (h) => {
    const m = /^#?([0-9a-f]{6})$/i.exec(h || "");
    if (!m) return null;
    const n = parseInt(m[1], 16);
    return [n >> 16, n >> 8 & 255, n & 255];
  };
  var UKLAD = /^u[1-8]$/;
  var klucz = (typ, kolor, rama = "") => typ + "|" + (kolor || "") + "|" + (rama || "");
  var zKolorem = (typ, kolor, rama) => gotowe.get(klucz(typ, kolor, rama));
  function warstwy(typ, kolor, rama, wersja) {
    const w = [], k = rgb3(kolor), r = rgb3(rama);
    if (UKLAD.test(typ)) {
      if (r) w.push([`/motor_ha/ui/ramy/${typ}.png?v=${wersja}`, r, 1.2, true]);
      return w;
    }
    if (k && MASKI.has(typ)) w.push([`/motor_ha/rodzaje/maski/${typ}.png?v=${wersja}`, k, 1.8]);
    if (r && RAMY2.has(typ)) w.push([`/motor_ha/rodzaje/ramy/${typ}.png?v=${wersja}`, r, 1.2, true]);
    return w;
  }
  var daSie = (typ, kolor, rama) => warstwy(typ, kolor, rama, "").length > 0;
  function przekoloruj(typ, kolor, wersja, rama) {
    const k = klucz(typ, kolor, rama), W3 = warstwy(typ, kolor, rama, wersja);
    if (gotowe.has(k)) return Promise.resolve(gotowe.get(k));
    if (!W3.length) return Promise.resolve(null);
    if (wToku.has(k)) return wToku.get(k);
    const src = UKLAD.test(typ) ? `/motor_ha/ui/${typ}.webp?v=${wersja}` : `/motor_ha/rodzaje/${typ}.webp?v=${wersja}`;
    const p = Promise.all([wczytaj(src), ...W3.map((x) => wczytaj(x[0]))]).then(([z, ...maski]) => {
      const w = z.naturalWidth, h = z.naturalHeight, cv = document.createElement("canvas");
      cv.width = w;
      cv.height = h;
      const x = cv.getContext("2d", { willReadFrequently: true });
      const mk = maski.map((m) => {
        x.clearRect(0, 0, w, h);
        x.drawImage(m, 0, 0, w, h);
        return x.getImageData(0, 0, w, h).data;
      });
      x.clearRect(0, 0, w, h);
      x.drawImage(z, 0, 0, w, h);
      const im = x.getImageData(0, 0, w, h), d = im.data, org = d.slice();
      W3.forEach(([, c, sila, rama2], n) => {
        const m = mk[n];
        let s = 0, l = 0;
        for (let i = 0; i < d.length; i += 4) {
          const a = m[i] / 255;
          s += a * (org[i] + org[i + 1] + org[i + 2]) / 3;
          l += a;
        }
        const sr = l ? s / l : 128;
        for (let i = 0; i < d.length; i += 4) {
          const a = m[i] / 255;
          if (!a) continue;
          let g = 1 + sila * ((org[i] + org[i + 1] + org[i + 2]) / 3 - sr) / Math.max(sr, 1);
          if (rama2) g = Math.max(0.7, Math.min(1.15, g));
          for (let j = 0; j < 3; j++) d[i + j] = d[i + j] * (1 - a) + Math.max(0, Math.min(255, c[j] * g)) * a;
        }
      });
      x.putImageData(im, 0, 0);
      const url = cv.toDataURL("image/webp", 0.92);
      gotowe.set(k, url);
      wToku.delete(k);
      return url;
    }).catch(() => {
      wToku.delete(k);
      return null;
    });
    wToku.set(k, p);
    return p;
  }

  // src/foto_okno.js
  var UKLADY = [
    ["u1", [[0, 0, 1, 1]]],
    ["u2", [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]]],
    ["u3", [[0, 0, 1 / 3, 1], [1 / 3, 0, 1 / 3, 1], [2 / 3, 0, 1 / 3, 1]]],
    ["u4", [[0, 0, 0.5, 0.28], [0.5, 0, 0.5, 0.28], [0, 0.28, 0.5, 0.72], [0.5, 0.28, 0.5, 0.72]]],
    ["u5", [[0, 0, 0.55, 0.22], [0.55, 0, 0.45, 0.22], [0, 0.22, 0.55, 0.5], [0.55, 0.22, 0.45, 0.78]]],
    ["u6", [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]], true],
    ["u7", [[0, 0, 0.25, 1], [0.25, 0, 0.5, 1], [0.75, 0, 0.25, 1]]],
    ["u8", [[0, 0, 0.5, 0.5], [0.5, 0, 0.5, 0.5], [0, 0.5, 0.5, 0.5], [0.5, 0.5, 0.5, 0.5]]]
  ];
  var SZYBY = {
    u1: [[0.302, 0.125, 0.401, 0.693]],
    u2: [[0.176, 0.15, 0.257, 0.667], [0.567, 0.15, 0.257, 0.667]],
    u3: [[0.117, 0.214, 0.194, 0.517], [0.4, 0.214, 0.198, 0.517], [0.681, 0.214, 0.2, 0.517]],
    u4: [[0.153, 0.068, 0.346, 0.127], [0.499, 0.068, 0.346, 0.127], [0.195, 0.303, 0.244, 0.545], [0.561, 0.303, 0.243, 0.545]],
    u5: [[0.224, 0.06, 0.199, 0.27], [0.532, 0.053, 0.244, 0.13], [0.224, 0.35, 0.199, 0.566], [0.532, 0.19, 0.244, 0.265]],
    u6: [[0.233, 0.025, 0.218, 0.916], [0.544, 0.025, 0.223, 0.916]],
    u7: [[0.111, 0.165, 0.111, 0.612], [0.295, 0.151, 0.408, 0.635], [0.777, 0.165, 0.106, 0.612]],
    u8: [[0.202, 0.109, 0.266, 0.335], [0.534, 0.107, 0.264, 0.339], [0.203, 0.52, 0.263, 0.325], [0.535, 0.52, 0.263, 0.326]]
  };
  function nazwaUkladu(pola) {
    if (!pola?.length) return null;
    const blisko = (a, b) => Math.abs(a - b) < 0.02;
    const u3 = UKLADY.find(([, P3]) => P3.length === pola.length && P3.every((r, i) => r.every((v, j) => blisko(v, pola[i][j]))));
    return u3 && UI.has(u3[0] + ".webp") && SZYBY[u3[0]] ? u3[0] : null;
  }
  function tkanina(typ, kolor) {
    const rk = RAMKI[typ];
    if (!rk || !ZDJECIA.has(typ)) return "";
    const [bx, by, bw, bh] = rk, src = `/motor_ha/rodzaje/${typ}.webp?v=${WERSJA}`, mk = `url(/motor_ha/rodzaje/maski/${typ}.png?v=${WERSJA})`;
    const A = +(bw * 193 / (bh * 161)).toFixed(4), W3 = `max(100cqw, 100cqh * ${A})`, H2 = `(${W3} / ${A})`;
    const n = (v) => +v.toFixed(4);
    return `<img class="ftki" data-przek="${typ}" data-kol="${kolor}" src="${zKolorem(typ, kolor) || src}" alt="" draggable="false" style="width:calc(${W3} * ${n(1 / bw)});height:calc(${H2} * ${n(1 / bh)});left:calc((100cqw - ${W3}) / 2 - ${W3} * ${n(bx / bw)});top:calc((100cqh - ${H2}) / 2 - ${H2} * ${n(by / bh)});-webkit-mask-image:${mk};mask-image:${mk}">`;
  }

  // src/okno3d_uklad.js
  var RAMA = 0.07;
  function polaNaObrazku(pola, W3, H2, m = 0) {
    const iW = W3 - 2 * RAMA, iH = H2 - 2 * RAMA, s = 1 - 2 * m;
    return pola.map(([x, y, w, h]) => [m + s * (RAMA + x * iW) / W3, m + s * (RAMA + y * iH) / H2, s * w * iW / W3, s * h * iH / H2]);
  }
  var wymiary = (proporcja2) => ({ W: +(1.5 * proporcja2).toFixed(3), H: 1.5 });
  var NA_BOKI = ["pionowa", "panel", "zaslona", "zaslona_wave", "firana", "okiennice", "okiennice_przesuwne", "markiza_boczna"];
  var gl3 = null;
  var moze3d = () => {
    if (gl3 === null) try {
      const c = document.createElement("canvas");
      gl3 = !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) {
      gl3 = false;
    }
    return gl3;
  };
  var mod = null;
  var okno3d = (wersja) => mod || (mod = import(`/motor_ha/okno3d.js?v=${wersja}`));
  var JASNOSC = { dzien: 1, zloto: 0.85, swit: 0.8, zmierzch: 0.55, noc: 0.3 };
  var proporcja = (pola) => {
    const kol = new Set(pola.map((p) => +(+p[0]).toFixed(3))).size, rz = new Set(pola.map((p) => +(+p[1]).toFixed(3))).size;
    return Math.max(0.6, Math.min(2.4, (kol === 1 ? 0.78 : kol === 2 ? 1.12 : 0.55 * kol) * (rz > 2 ? 0.85 : 1)));
  };

  // src/bramy_zdj.js
  var BRAMY_ZDJ = { "furtka": [0.2758, 0.124, 0.4425, 0.7615], "garaz_boczna": [0.0992, 0.1917, 0.8017, 0.6281], "garaz_skrzydlowa": [0.1142, 0.124, 0.7708, 0.7438], "przesuwna": [0.0958, 0.1615, 0.8033, 0.6344], "roletowa": [0.1617, 0.201, 0.6742, 0.699], "segmentowa": [0.12, 0.1615, 0.76, 0.751], "skrzydlowa": [0.1008, 0.1271, 0.7983, 0.701], "szlaban": [0.1992, 0.3302, 0.76, 0.0823], "uchylna": [0.1292, 0.1427, 0.7417, 0.7062] };

  // src/brama_foto.js
  var maZdjecieBramy = (t) => !!BRAMY_ZDJ[t];
  var P2 = (v) => +(v * 100).toFixed(3) + "%";
  var DWA = ["skrzydlowa", "garaz_skrzydlowa"];
  var W_OTWORZE = ["segmentowa", "roletowa", "uchylna", "garaz_boczna"];
  function bramaZdjecie(t, noc) {
    const [x, y, w, h] = BRAMY_ZDJ[t], u3 = (n) => `/motor_ha/bramy/${t}-${n}.webp?v=${WERSJA}`;
    const img = `<img src="${u3("skrzydlo")}" alt="" draggable="false">`;
    const czesci = DWA.includes(t) ? `<div class="fbs" data-c="l" style="clip-path:inset(0 ${P2(1 - x - w / 2)} 0 0);transform-origin:${P2(x)} 50%">${img}</div><div class="fbs" data-c="p" style="clip-path:inset(0 0 0 ${P2(x + w / 2)});transform-origin:${P2(x + w)} 50%">${img}</div>` : `<div class="fbs" style="transform-origin:${t === "szlaban" ? `${P2(x)} ${P2(y + h / 2)}` : t === "furtka" ? `${P2(x + w)} 50%` : t === "uchylna" ? `50% ${P2(y)}` : "50% 50%"}">${img}</div>`;
    const otwor = W_OTWORZE.includes(t) ? ` style="clip-path:inset(${P2(y)} ${P2(1 - x - w)} ${P2(1 - y - h)} ${P2(x)})"` : "";
    return `<div class="fbr${noc ? " noc" : ""}" data-typ="${t}"><img class="ftlo" src="${u3("tlo")}" alt="" draggable="false"><div class="fbo"${otwor}>${czesci}</div></div>`;
  }
  function ustawBrameZdj(el, t, p) {
    if (!el || !BRAMY_ZDJ[t]) return;
    const f = Math.max(0, Math.min(100, p)) / 100, [, , w, h] = BRAMY_ZDJ[t];
    el.querySelectorAll(".fbs").forEach((s) => {
      s.style.transform = t === "przesuwna" ? `translateX(${P2(-f * w * 0.97)})` : t === "garaz_boczna" ? `translateX(${P2(f * w)})` : t === "segmentowa" || t === "roletowa" ? `translateY(${P2(-f * h)})` : t === "uchylna" ? `scaleY(${1 - f * 0.92})` : t === "szlaban" ? `rotate(${-f * 82}deg)` : `scaleX(${1 - f * 0.82})`;
    });
  }
  var STYL_BRAMY = `.fbr{position:relative;width:100%;aspect-ratio:5/4;border-radius:var(--ha-border-radius-md,8px);overflow:hidden;background:#d9dadb}
.fbr img{position:absolute;inset:0;width:100%;height:100%;max-width:none;pointer-events:none;user-select:none}
.fbr .fbo,.fbr .fbs{position:absolute;inset:0}
.fbr.noc img{filter:brightness(.62) saturate(.85)}`;

  // src/karta.js
  var polaOkna = (c) => Array.isArray(c.pola) && c.pola.length && !czyBrama(c.oslona) && c.pola.every((p) => [p?.x, p?.y, p?.w, p?.h].every(Number.isFinite)) ? c.pola : null;
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
      const c = Object.assign({}, DOMYSLNE, urz && typeof urz === "object" ? urz : {}, this._surowa, this._surowa._podglad || {});
      c.rodzaj = c.oslona;
      c.oslona = baza(c.oslona);
      if (Array.isArray(c.pola)) c.pola = c.pola.map((p) => p?.oslona ? { ...p, rodzaj: p.oslona, oslona: baza(p.oslona) } : p);
      return c;
    }
    get _T() {
      return TEKSTY[this._jez];
    }
    // encje skrzydeł: wybrane ręcznie, członkowie grupy (okno z integracji to też grupa) albo sama encja
    _skrzydla(c) {
      const s = this._hass.states;
      if (polaOkna(c)) {
        const grupa2 = (s[c.entity]?.attributes?.entity_id || []).filter((e) => s[e]);
        return c.pola.map((p) => p.silnik && s[p.silnik] ? p.silnik : grupa2[0] || c.entity);
      }
      const n = +c.skrzydla === 1 || czyBrama(c.oslona) ? 1 : 2;
      const grupa = (s[c.entity]?.attributes?.entity_id || []).filter((e) => s[e]);
      const wybor = [c.roleta_lewa, c.roleta_prawa];
      return Array.from({ length: n }, (_, i) => wybor[i] && s[wybor[i]] ? wybor[i] : grupa.length ? grupa[Math.min(i, grupa.length - 1)] : c.entity);
    }
    _odswiez() {
      if (!this._hass || !this._surowa) return;
      const c = this._cfg = this._ustawienia;
      this._jez = jezyk(c, this._hass);
      const czl = this._skrzydla(c);
      const klucz2 = JSON.stringify([czl.length, polaOkna(c) && c.pola.map((p) => [p.x, p.y, p.w, p.h, p.rodzaj, p.kolor]), c.sciana, c.oslona, c.rodzaj, c.kolor, c.rama, c.wysokosc, c.przyciski, c.suwak, c.pozycje, this._jez, c.osobno, !!this._wpis()]);
      if (klucz2 !== this._klucz) {
        this._klucz = klucz2;
        this._zbuduj(c, czl);
      }
      this._aktualizuj(c, czl);
    }
    _zbuduj(c, czl) {
      this._d3 = false;
      this._o3?.zniszcz();
      this._o3 = null;
      if (!czyBrama(c.oslona) && !czyBrama(c.rodzaj) && !this.bez3d && moze3d()) return this._zbuduj3d(c, czl);
      if (czyBrama(c.oslona) || wlasnyRuch(c.rodzaj) && !polaOkna(c)) return this._zbudujBrame(c, czl);
      const T2 = this._T, n = czl.length, zew = czyZew(c.oslona), rama = ramaHex(c.rama), kolor = hex(c.kolor);
      this._brama = false;
      this._poziomo = POZIOME.includes(c.oslona);
      const pion2 = c.suwak !== false && !this._poziomo;
      const dwaSuwaki = pion2 && !!c.osobno && n > 1;
      const P3 = polaOkna(c), kol = P3 ? new Set(P3.map((p) => p.x)).size : n;
      this._uk = !!P3;
      const typP = (i) => {
        const t = P3?.[i]?.oslona;
        return t && !!czyZew(t) === !!zew && !POZIOME.includes(t) && !POZIOME.includes(c.oslona) ? t : c.oslona;
      };
      const fotUk = POZIOME.includes(c.oslona) ? null : P3 ? nazwaUkladu(P3.map((p) => [p.x, p.y, p.w, p.h])) : n === 1 ? "u1" : n === 2 ? "u2" : null;
      const foto = this._foto = !!fotUk && Array.from({ length: n }, (_, i) => tkanina(typP(i), "#000")).every(Boolean);
      const zw = zew && !foto;
      const H2 = Math.max(140, Math.min(600, +c.wysokosc || 260)) * (kol === 1 ? 1.15 : 1), W3 = foto ? Math.round(H2 * 193 / 161) : Math.round(H2 * (kol === 1 ? 0.68 : kol === 2 ? 0.92 : Math.min(1.5, 0.46 * kol)));
      const miejsce = (i, wciecie = 4) => foto ? ` style="left:${SZYBY[fotUk][i][0] * 100}%;top:${SZYBY[fotUk][i][1] * 100}%;width:${SZYBY[fotUk][i][2] * 100}%;height:${SZYBY[fotUk][i][3] * 100}%"` : P3 ? ` style="left:calc(${P3[i].x * 100}% + ${wciecie}px);top:calc(${P3[i].y * 100}% + ${wciecie}px);width:calc(${P3[i].w * 100}% - ${2 * wciecie}px);height:calc(${P3[i].h * 100}% - ${2 * wciecie}px)"` : "";
      const strona2 = (i) => P3 ? P3[i].x + P3[i].w / 2 <= 0.5 ? "l" : "p" : i ? "p" : "l";
      const wid = (i) => P3 ? ` class="wid" style="left:${-P3[i].x / P3[i].w * 100}%;top:${-P3[i].y / P3[i].h * 100}%;width:${100 / P3[i].w}%;height:${100 / P3[i].h}%"` : ' style="position:absolute;inset:0"';
      const ramy = foto ? `<img class="ftlo" data-przek="${fotUk}" data-kol="" data-ram="${rama}" src="${zKolorem(fotUk, "", rama) || `/motor_ha/ui/${fotUk}.webp?v=${WERSJA}`}" alt="" draggable="false">` : P3 ? [...new Set(P3.map((p) => p.x))].map((x) => {
        const k = P3.filter((p) => p.x === x), dol = Math.max(...k.map((p) => p.y + p.h));
        return `<div class="kolr" style="left:${x * 100}%;top:0;width:${k[0].w * 100}%;height:${dol * 100}%"></div>`;
      }).join("") : "";
      const xs = P3 ? [...new Set(P3.map((p) => p.x))].sort((a, b) => a - b) : [];
      const sc = SCIANY[c.sciana], tloMuru = !sc ? "" : c.sciana === "cegla" ? `;background:repeating-linear-gradient(0deg,transparent 0 9px,rgba(240,232,220,.75) 9px 10px),${sc}` : `;background:repeating-linear-gradient(0deg,transparent 0 9px,rgba(0,0,0,.1) 9px 10px),${sc}`;
      const mury = foto ? "" : xs.slice(1).map((x, i) => {
        const pk = P3.find((p) => p.x === xs[i]), od2 = pk.x + pk.w;
        return x - od2 > 4e-3 ? `<div class="mur" style="left:${od2 * 100}%;width:${(x - od2) * 100}%${x - od2 < 0.035 ? `;background:${rama}` : tloMuru}"></div>` : "";
      }).join("");
      this._kas = KASETA[c.oslona] ?? 12;
      const typPola = (i) => {
        const t = P3?.[i]?.oslona;
        return t && !!czyZew(t) === !!zew && !POZIOME.includes(t) && !this._poziomo ? t : c.oslona;
      };
      const warianty = [], wariant = (i) => {
        if (!P3) return 0;
        const t = typPola(i), k = P3[i].kolor ? hex(P3[i].kolor) : kolor;
        if (t === c.oslona && k === kolor) return 0;
        let w = warianty.findIndex((x) => x.t === t && x.k === k);
        if (w < 0) {
          warianty.push({ t, k });
          w = warianty.length - 1;
        }
        return w + 1;
      };
      const wPol = P3 ? P3.map((_, i) => wariant(i)) : [];
      this._kasy = P3 ? P3.map((_, i) => KASETA[typPola(i)] ?? 12) : null;
      const root = this.shadowRoot || this.attachShadow({ mode: "open" });
      const skrzydlo = (i) => `<div class="skrz" data-i="${i}" data-s="${strona2(i)}"${miejsce(i)}><div class="szyba"${wPol[i] ? ` data-w="${wPol[i]}"` : ""}>
      ${zw ? '<div class="pokoj"></div>' : `<div${wid(i)}><div class="niebo"></div><div class="osiedle-w"></div><div class="pg"></div></div><i class="promien"></i>
      ${foto ? `<div class="oslona"><div class="ftkp">${tkanina(typP(i), P3?.[i]?.kolor ? hex(P3[i].kolor) : kolor)}</div></div><div class="listwa"></div>` : '<div class="oslona"></div><div class="listwa"></div><div class="kaseta"></div><i class="prow l"></i><i class="prow p"></i>'}`}
      <div class="blask"></div><div class="cel"><span></span></div></div>${n > 1 && (!P3 || P3[i].h >= 0.4) ? '<i class="klamka"></i>' : ""}</div>`;
      const kolumna = (i) => `<div class="szyba" data-i="${i}"${wPol[i] ? ` data-w="${wPol[i]}"` : ""}${miejsce(i, 0)}><div class="oslona"></div><div class="listwa"></div><div class="kaseta"></div><i class="prow l"></i><i class="prow p"></i><div class="cel"><span></span></div></div>`;
      const pozycje = String(c.pozycje || "").split(/[,; ]+/).filter((x) => x !== "").map(Number).filter((x) => Number.isFinite(x) && x >= 0 && x <= 100).slice(0, 6);
      root.innerHTML = `<style>${STYL_STALY}${STYL_IKU}${stylOkna({ rama, drewno: czyDrewno(c.rama), kolor, typ: c.oslona, zew })}${warianty.map((x, w) => stylPola(`.szyba[data-w="${w + 1}"]`, { rama, drewno: czyDrewno(c.rama), kolor: x.k, typ: x.t, zew })).join("\n")}</style>
<ha-card class="${zw ? "zew" : "wew"}${this._poziomo ? " poziomo" : ""}${foto ? " foto" : ""}"><div class="mh">
 ${this._naglowek(c)}
 <div class="scena${pion2 ? " zs" : ""}">${zw ? '<div class="pg pgz"></div>' : ""}
  ${dwaSuwaki ? this._suwakHtml(T2, true, 0) : ""}<div class="okno${P3 || foto ? " uk" : ""}" style="width:min(${pion2 ? dwaSuwaki ? "calc(100% - 108px)" : "calc(100% - 54px)" : "100%"},${W3}px);aspect-ratio:${W3}/${Math.round(H2)}">
   ${mury}${ramy}${zw || foto ? "" : czl.map((_, i) => P3 ? `<div class="za"${miejsce(i)}></div>` : `<div class="za" style="${n > 1 ? `left:${i ? "50%" : "6px"};right:${i ? "6px" : "50%"}` : ""}"></div>`).join("")}
   ${Array.from({ length: n }, (_, i) => skrzydlo(i)).join("")}
   ${zw ? `<div class="zewo">${Array.from({ length: n }, (_, i) => kolumna(i)).join("")}</div>` : ""}
   ${n > 1 && !c.osobno && !P3 ? `<div class="oba" title="${esc2(T2.karta.oba)}"><ha-icon icon="mdi:arrow-up-down"></ha-icon></div>` : ""}
  </div>${pion2 ? this._suwakHtml(T2, true, dwaSuwaki ? 1 : null) : ""}</div>
 ${c.przyciski !== false ? `<div class="przyc">
  <button class="otw" title="${esc2(this._lok("ui.card.cover.open_cover", T2.karta.otworz))}">${ikUI("gora", '<ha-icon icon="mdi:arrow-up"></ha-icon>')}</button>
  <button class="stp" title="${esc2(this._lok("ui.card.cover.stop_cover", T2.karta.stop))}">${ikUI("stop", '<ha-icon icon="mdi:stop"></ha-icon>')}</button>
  <button class="zam" title="${esc2(this._lok("ui.card.cover.close_cover", T2.karta.zamknij))}">${ikUI("dol", '<ha-icon icon="mdi:arrow-down"></ha-icon>')}</button></div>` : ""}
 ${c.suwak !== false && !pion2 ? this._suwakHtml(T2, false) : ""}
 ${pozycje.length ? `<div class="poz">${pozycje.map((p) => `<button data-p="${p}">${p === 100 ? esc2(T2.karta.zwinieta) : p === 0 ? esc2(T2.karta.opuszczona) : p + " %"}</button>`).join("")}</div>` : ""}
 ${this._wpis() ? `<div class="stopka"><button class="zmien">⚙ ${esc2(T2.urzadzenie.zmien)}</button><button class="zmien wyg">🎨 ${esc2(T2.urzadzenie.wyglad)}</button></div>` : ""}
</div></ha-card>`;
      const q = (s) => root.querySelector(s), qa = (s) => [...root.querySelectorAll(s)];
      const pola = zw ? qa(".zewo .szyba") : qa(".skrz .szyba");
      this._el = {
        ...this._wspolne(q),
        karta: q("ha-card"),
        nazwa: q(".nazwa"),
        stan: q(".stan"),
        ik: q(".ik"),
        oba: q(".oba"),
        suwak: q(".suwak"),
        suwaki: qa(".suwak"),
        pgz: q(".pgz"),
        otw: q(".otw"),
        stp: q(".stp"),
        zam: q(".zam"),
        poz: qa(".poz button"),
        skrz: qa(".skrz").map((s, i) => ({ s, niebo: s.querySelector(".niebo"), osiedle: s.querySelector(".osiedle-w"), pg: s.querySelector(".pg"), za: qa(".za")[i] })),
        pola: pola.map((p, i) => ({ p, kas: this._kasy?.[i] ?? this._kas, oslona: p.querySelector(".oslona"), listwa: p.querySelector(".listwa"), cel: p.querySelector(".cel"), celT: p.querySelector(".cel span") }))
      };
      this._ruchy = czl.map((e) => new Ruch(e));
      this._czl = null;
      this._niebo = null;
      this._zew = zw;
      const E = this._el;
      q(".gl").addEventListener("click", () => this._wiecej());
      q(".gl").addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") this._wiecej();
      });
      E.otw?.addEventListener("click", () => this._polecenie(100));
      E.zam?.addEventListener("click", () => this._polecenie(0));
      E.stp?.addEventListener("click", () => this._polecenie(null));
      E.poz.forEach((b) => b.addEventListener("click", () => this._polecenie(+b.dataset.p)));
      E.pola.forEach((P4, i) => this._ciagnij(zw ? P4.p : E.skrz[i].s, [i]));
      if (E.oba) this._ciagnij(E.oba, czl.map((_, i) => i), true);
      E.suwaki.forEach((S) => this._suwak(S));
      q(".zmien:not(.wyg)")?.addEventListener("click", () => konfiguruj(this._wpis()));
      q(".wyg")?.addEventListener("click", () => this._wyglad());
      root.querySelectorAll("img[data-przek]").forEach((im) => przekoloruj(im.dataset.przek, im.dataset.kol, WERSJA, im.dataset.ram).then((u3) => {
        if (u3 && im.isConnected) im.src = u3;
      }));
      this._zbudowana = true;
    }
    // okno 3D (okno3d.js): budowane z układu, rodzaju na każdym polu i kolorów; na nim przezroczyste pola do przeciągania
    _zbuduj3d(c, czl) {
      const T2 = this._T, n = czl.length, rama = ramaHex(c.rama), kolor = hex(c.kolor);
      this._brama = false;
      this._foto = false;
      this._zew = false;
      this._d3 = true;
      this._kas = 0;
      this._kasy = null;
      const P3 = polaOkna(c);
      this._uk = !!P3;
      this._poziomo = NA_BOKI.includes(c.rodzaj) && !P3;
      const pion2 = c.suwak !== false && !this._poziomo, dwaSuwaki = pion2 && !!c.osobno && n > 1;
      const pola = P3 ? P3.map((p) => [p.x, p.y, p.w, p.h]) : n === 1 ? [[0, 0, 1, 1]] : [[0, 0, 0.5, 1], [0.5, 0, 0.5, 1]];
      const prop = proporcja(pola);
      const { W: W3, H: H2 } = wymiary(prop), Hp = Math.max(140, Math.min(600, +c.wysokosc || 260)) * 1.1, Wp = Math.round(Hp * prop);
      const R2 = polaNaObrazku(pola, W3, H2, 0), pr = (v) => (v * 100).toFixed(3) + "%";
      this._o3cfg = {
        pola,
        typy: pola.map((_, i) => P3?.[i]?.rodzaj || c.rodzaj),
        kolory: pola.map((_, i) => P3?.[i]?.kolor ? hex(P3[i].kolor) : kolor),
        rama,
        drewno: czyDrewno(c.rama),
        W: W3,
        H: H2,
        margines: 0
      };
      const strona2 = (i) => pola[i][0] + pola[i][2] / 2 <= 0.5 ? "l" : "p";
      const root = this.shadowRoot || this.attachShadow({ mode: "open" });
      const pozycje = String(c.pozycje || "").split(/[,; ]+/).filter((x) => x !== "").map(Number).filter((x) => Number.isFinite(x) && x >= 0 && x <= 100).slice(0, 6);
      root.innerHTML = `<style>${STYL_STALY}${STYL_IKU}${stylOkna({ rama, drewno: czyDrewno(c.rama), kolor, typ: c.oslona, zew: false })}
.okno.o3{display:block;padding:0;background:none!important;box-shadow:none!important;border-radius:0}.o3h{position:absolute;inset:0}
.o3 .skrz{position:absolute;padding:0;margin:0;background:none!important;box-shadow:none!important;transform:none!important;border-radius:0}.o3 .skrz+.skrz{margin:0}
.o3 .szyba{background:none;box-shadow:none;overflow:visible}.poziomo .o3 .skrz{cursor:pointer}</style>
<ha-card class="wew${this._poziomo ? " poziomo" : ""}"><div class="mh">
 ${this._naglowek(c)}
 <div class="scena${pion2 ? " zs" : ""}">
  ${dwaSuwaki ? this._suwakHtml(T2, true, 0) : ""}<div class="okno o3" style="width:min(${pion2 ? dwaSuwaki ? "calc(100% - 108px)" : "calc(100% - 54px)" : "100%"},${Wp}px);aspect-ratio:${W3}/${H2}">
   <div class="o3h"></div>
   ${czl.map((_, i) => `<div class="skrz" data-i="${i}" data-s="${strona2(i)}" style="left:${pr(R2[i][0])};top:${pr(R2[i][1])};width:${pr(R2[i][2])};height:${pr(R2[i][3])}"><div class="szyba"><div class="cel"><span></span></div></div></div>`).join("")}
  </div>${pion2 ? this._suwakHtml(T2, true, dwaSuwaki ? 1 : null) : ""}</div>
 ${c.przyciski !== false ? `<div class="przyc">
  <button class="otw" title="${esc2(this._lok("ui.card.cover.open_cover", T2.karta.otworz))}">${ikUI("gora", '<ha-icon icon="mdi:arrow-up"></ha-icon>')}</button>
  <button class="stp" title="${esc2(this._lok("ui.card.cover.stop_cover", T2.karta.stop))}">${ikUI("stop", '<ha-icon icon="mdi:stop"></ha-icon>')}</button>
  <button class="zam" title="${esc2(this._lok("ui.card.cover.close_cover", T2.karta.zamknij))}">${ikUI("dol", '<ha-icon icon="mdi:arrow-down"></ha-icon>')}</button></div>` : ""}
 ${c.suwak !== false && !pion2 ? this._suwakHtml(T2, false) : ""}
 ${pozycje.length ? `<div class="poz">${pozycje.map((p) => `<button data-p="${p}">${p === 100 ? esc2(T2.karta.zwinieta) : p === 0 ? esc2(T2.karta.opuszczona) : p + " %"}</button>`).join("")}</div>` : ""}
 ${this._wpis() ? `<div class="stopka"><button class="zmien">⚙ ${esc2(T2.urzadzenie.zmien)}</button><button class="zmien wyg">🎨 ${esc2(T2.urzadzenie.wyglad)}</button></div>` : ""}
</div></ha-card>`;
      const q = (s) => root.querySelector(s), qa = (s) => [...root.querySelectorAll(s)];
      const E = this._el = {
        ...this._wspolne(q),
        karta: q("ha-card"),
        nazwa: q(".nazwa"),
        stan: q(".stan"),
        ik: q(".ik"),
        oba: null,
        suwak: q(".suwak"),
        suwaki: qa(".suwak"),
        pgz: null,
        otw: q(".otw"),
        stp: q(".stp"),
        zam: q(".zam"),
        poz: qa(".poz button"),
        skrz: qa(".skrz").map((s) => ({ s, niebo: null, osiedle: null, pg: null, za: null })),
        pola: qa(".skrz .szyba").map((p) => ({ p, kas: 0, oslona: null, listwa: null, cel: p.querySelector(".cel"), celT: p.querySelector(".cel span") }))
      };
      this._ruchy = czl.map((e) => new Ruch(e));
      this._czl = null;
      this._niebo = null;
      q(".gl").addEventListener("click", () => this._wiecej());
      q(".gl").addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") this._wiecej();
      });
      E.otw?.addEventListener("click", () => this._polecenie(100));
      E.zam?.addEventListener("click", () => this._polecenie(0));
      E.stp?.addEventListener("click", () => this._polecenie(null));
      E.poz.forEach((b) => b.addEventListener("click", () => this._polecenie(+b.dataset.p)));
      E.skrz.forEach((S, i) => this._ciagnij(S.s, [i]));
      E.suwaki.forEach((S) => this._suwak(S));
      q(".zmien:not(.wyg)")?.addEventListener("click", () => konfiguruj(this._wpis()));
      q(".wyg")?.addEventListener("click", () => this._wyglad());
      okno3d(WERSJA).then((m) => {
        if (this._el !== E) return;
        this._o3 = new m.Okno3D(q(".o3h"), { ...this._o3cfg, pozycje: this._poz3d() });
        this._o3.widokZ(this._o3url);
        this._o3.swiatlo(this._o3jas ?? 1);
      }).catch((e) => console.error("Motor HA: okno 3D", e));
      this._zbudowana = true;
    }
    _poz3d() {
      return this._el.pola.map((_, i) => this._ruchy[Math.min(i, this._ruchy.length - 1)]?.widac ?? 100);
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
      return `<div class="gl" role="button" tabindex="0"><div class="ik"><ha-icon icon="${IKONY[c.rodzaj] || IKONY[c.oslona] || IKONY.zebra}"></ha-icon></div>
  <div class="opis"><span class="nazwa"></span><span class="stan"></span></div>
  <svg class="kompas" viewBox="-20 -20 40 40" hidden aria-hidden="true"><circle r="17" fill="none" stroke="var(--divider-color)" stroke-width="2"/>
   <path d="M-9 -15h18" stroke="var(--primary-color)" stroke-width="4" stroke-linecap="round"/><circle class="sl" r="4.5" fill="#ffb300"/></svg></div>
 <div class="auto" hidden><i class="aik"></i><span></span><button class="wzn" hidden>${esc2(this._T.karta.wznow)}</button></div>`;
    }
    _wspolne(q) {
      const el = { auto: q(".auto"), autoT: q(".auto span"), aik: q(".auto .aik"), wzn: q(".wzn"), kompas: q(".kompas"), sl: q(".kompas .sl"), ikona: q(".ik ha-icon") };
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
      this._uk = false;
      this._poziomo = false;
      this._kas = 0;
      this._brNoc = null;
      this._brTyp = maZdjecieBramy(c.rodzaj) ? c.rodzaj : c.oslona;
      this._scenaRuchu = wlasnyRuch(c.rodzaj) && !maZdjecieBramy(this._brTyp) ? c.rodzaj : null;
      this._ostO = null;
      const st = this._hass.states[c.entity], zPoz = (st?.attributes?.supported_features ?? 0) & 4;
      root.innerHTML = `<style>${STYL_STALY}${STYL_IKU}${STYL_BRAMY}</style>
<ha-card class="brama"><div class="mh">
 ${this._naglowek(c)}
 <div class="scena"><div class="bramaw" role="button" tabindex="0"></div></div>
 ${c.przyciski !== false ? `<div class="przyc">
  <button class="otw" title="${esc2(this._lok("ui.card.cover.open_cover", T2.karta.otworz))}">${ikUI("gora", '<ha-icon icon="mdi:arrow-up"></ha-icon>')}</button>
  <button class="stp" title="${esc2(this._lok("ui.card.cover.stop_cover", T2.karta.stop))}">${ikUI("stop", '<ha-icon icon="mdi:stop"></ha-icon>')}</button>
  <button class="zam" title="${esc2(this._lok("ui.card.cover.close_cover", T2.karta.zamknij))}">${ikUI("dol", '<ha-icon icon="mdi:arrow-down"></ha-icon>')}</button></div>` : ""}
 ${c.suwak !== false && zPoz ? this._suwakHtml(T2, false) : ""}
 ${this._wpis() ? `<div class="stopka"><button class="zmien">⚙ ${esc2(T2.urzadzenie.zmien)}</button><button class="zmien wyg">🎨 ${esc2(T2.urzadzenie.wyglad)}</button></div>` : ""}
</div></ha-card>`;
      const q = (s) => root.querySelector(s);
      this._el = {
        ...this._wspolne(q),
        karta: q("ha-card"),
        nazwa: q(".nazwa"),
        stan: q(".stan"),
        ik: q(".ik"),
        suwak: q(".suwak"),
        suwaki: [...root.querySelectorAll(".suwak")],
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
      q(".zmien:not(.wyg)")?.addEventListener("click", () => konfiguruj(this._wpis()));
      q(".wyg")?.addEventListener("click", () => this._wyglad());
      this._zbudowana = true;
    }
    _lok(klucz2, zapas) {
      return this._hass?.localize?.(klucz2) || zapas;
    }
    _wiecej() {
      this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: true, composed: true, detail: { entityId: this._cfg.entity } }));
    }
    // „Wygląd”: kreator od razu na kroku kolorów; pasek kroków u góry przenosi do innych kroków
    async _wyglad() {
      const wpis = this._wpis();
      try {
        await this._hass.callWS({ type: "motor_ha/krok", entry_id: wpis, krok: this._brama ? "rodzaj" : "kolory" });
      } catch (e) {
      }
      konfiguruj(wpis);
    }
    // polecenie dla wszystkich (albo wybranych) skrzydeł; cel null = stop
    _polecenie(cel, ktore) {
      const c = this._cfg, teraz = performance.now(), czl = this._czl || [];
      const idx = ktore ? czl.map((_, i) => i).filter((i) => ktore.some((k) => czl[k] === czl[i])) : czl.map((_, i) => i);
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
      const r = pole.getBoundingClientRect(), gora = this._el.pola.find((x) => x.p === pole)?.kas ?? this._kas, zakres2 = r.height - gora - LISTWA - POD_LISTWA;
      return Math.round(100 - Math.min(1, Math.max(0, (y - r.top - gora) / zakres2)) * 100);
    }
    _gornaListwy(wys, p, kas = this._kas) {
      return kas - 2 + (wys - kas - LISTWA - POD_LISTWA + 2) * (100 - p) / 100;
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
        const ktore = srodek || this._cfg.osobno || this._uk || this._czl?.length < 2 ? idx : this._el.pola.map((_, i) => i);
        ktore.forEach((i) => this._pokazCel(i, wart, true));
      });
      const koniec = () => {
        if (start === null) return;
        start = null;
        this._ciagnie = false;
        this._el.pola.forEach((_, i) => this._pokazCel(i, null));
        const ktore = srodek || !((this._cfg.osobno || this._uk) && this._czl?.length > 1) ? null : idx;
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
    _suwakHtml(T2, pion2, i = null) {
      return `<div class="suwak${pion2 ? " pion" : ""}"${i === null ? "" : ` data-i="${i}"`} role="slider" tabindex="0" aria-orientation="${pion2 ? "vertical" : "horizontal"}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc2(this._lok("ui.card.cover.position", T2.karta.pozycja))}"><div class="wyp"></div></div>`;
    }
    _suwak(el) {
      let akt = false;
      const pion2 = el.classList.contains("pion");
      const ktore = el.dataset.i === void 0 ? void 0 : [+el.dataset.i];
      const wart = (e) => {
        const r = el.getBoundingClientRect(), u3 = pion2 ? (r.bottom - e.clientY) / r.height : (e.clientX - r.left) / r.width;
        return Math.round(Math.min(1, Math.max(0, u3)) * 100);
      };
      el.addEventListener("pointerdown", (e) => {
        akt = true;
        this._suwakW = wart(e);
        this._suwakEl = el;
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
        this._suwakEl = null;
        this._polecenie(w, ktore);
      };
      el.addEventListener("pointerup", koniec);
      el.addEventListener("pointercancel", koniec);
      el.addEventListener("keydown", (e) => {
        const d = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5, PageUp: 10, PageDown: -10 }[e.key];
        if (d) {
          e.preventDefault();
          this._polecenie(Math.max(0, Math.min(100, Math.round(this._wartSuwaka(el) + d))), ktore);
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
        r.czas = czasPrzejazdu(c.czas, obroty(h, e, this._uk ? c.pola[i]?.predkosc : c[i ? "predkosc_prawa" : "predkosc_lewa"]), e);
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
        const fot = c.widok !== false ? zdjecieWidoku(WIDOK, rodzaj, pora) : null;
        if (this._d3) {
          this._o3url = fot ? `/motor_ha/widok/${fot.plik}.webp?v=${WERSJA}` : null;
          this._o3jas = JASNOSC[pora] ?? 1;
          this._o3?.widokZ(this._o3url);
          this._o3?.swiatlo(this._o3jas);
        }
        const bezNieba = (h2) => h2.replace(/<i class="(slonce|ksiezyc|chm|gw)[^>]*><\/i>/g, "");
        E.skrz.forEach((S, i) => {
          if (S.niebo) S.niebo.style.background = bg;
          if (S.za) S.za.style.background = bg;
          const [nr2, ile] = this._uk ? [0, 1] : [i, czl.length];
          if (S.osiedle) S.osiedle.innerHTML = fot ? `<img class="fotw" src="/motor_ha/widok/${fot.plik}.webp?v=${WERSJA}" alt="" draggable="false" style="width:${ile * 100}%;left:${-nr2 * 100}%${fot.filtr ? ";filter:" + fot.filtr : ""}">` : c.widok !== false ? widokSvg(rodzaj, pora, nr2, ile) : "";
          if (S.pg) S.pg.innerHTML = fot ? bezNieba(pogoda(rodzaj, pora, nr2, ile)) : pogoda(rodzaj, pora, nr2, ile);
          S.s.classList.toggle("slonecznie", pora === "dzien" && (rodzaj === "slonce" || rodzaj === "chmurki"));
        });
        if (E.pgz) E.pgz.innerHTML = ["deszcz", "ulewa", "burza", "snieg", "deszczsnieg", "mgla"].includes(rodzaj) ? pogoda(rodzaj, pora, 0, 1).replace(/<i class="(slonce|ksiezyc|chm|gw)[^>]*><\/i>/g, "") : "";
      }
      if (this._brama) return this._aktualizujBrame(c, czl, st, pora);
      const auto = c.auto_czujniki !== false && !this._uk ? czujnikiOkna(h, czl[0]) : [];
      const okno3 = this._uk ? c.pola.map((p) => h.states[p.czujnik]?.state === "on" ? p.tryb === "otworz" ? "otw" : "uch" : "") : [0, 1].map((k) => {
        const id = c[k ? "czujnik_prawe" : "czujnik_lewe"] || auto[k], s = id && h.states[id];
        return s?.state === "on" ? c[k ? "tryb_prawe" : "tryb_lewe"] === "otworz" ? "otw" : "uch" : "";
      });
      E.skrz.forEach((S, i) => {
        S.s.classList.toggle("uch", okno3[i] === "uch");
        S.s.classList.toggle("otw", okno3[i] === "otw");
        if (S.za) S.za.classList.toggle("widac", !!okno3[i]);
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
      const ileCz = this._uk ? c.pola.filter((p) => p.czujnik).length : czl.length;
      okno3.forEach((o, k) => {
        if (o && k < czl.length) czesci.push(`${T2.karta.okno}${ileCz > 1 ? " " + (this._uk ? k + 1 : k ? T2.karta.prawe : T2.karta.lewe) : ""} ${o === "otw" ? T2.karta.otwarte : T2.karta.uchylone}`);
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
      E.karta.classList.toggle("ciemny", !!h.themes?.darkMode);
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
          const ik2 = pauza ? "pauza" : blad ? "uwaga" : "automat";
          if (E.aik.dataset.n !== ik2) {
            E.aik.dataset.n = ik2;
            E.aik.innerHTML = ikUI(ik2, `<ha-icon icon="${{ pauza: "mdi:pause-circle-outline", uwaga: "mdi:alert-circle-outline", automat: "mdi:robot-outline" }[ik2]}"></ha-icon>`);
          }
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
      if (this._scenaRuchu) E.bramaw.setAttribute("aria-label", T2.oslony[c.rodzaj] || "");
      else if (noc !== this._brNoc) {
        this._brNoc = noc;
        this._brZdj = maZdjecieBramy(this._brTyp);
        E.bramaw.innerHTML = this._brZdj ? bramaZdjecie(this._brTyp, noc) : rysunekBramy(c.oslona, hex(c.kolor), ramaHex(c.rama), noc, !!c.przeszkoda);
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
      E.ikona?.setAttribute("icon", otwarte && IKONY_OTW[c.rodzaj === c.oslona || czyBrama(c.rodzaj) ? c.oslona : ""] || IKONY[c.rodzaj] || IKONY[c.oslona] || "mdi:gate");
      E.karta.style.setProperty("--mh-kolor", otwarte ? "var(--primary-color)" : "var(--state-cover-inactive-color,var(--state-inactive-color,var(--disabled-color)))");
      this._animuj();
    }
    _pokazCel(i, p, ciagnie) {
      const P3 = this._el.pola[i];
      if (!P3) return;
      if (p === null || p === void 0) {
        P3.cel.style.display = "none";
        return;
      }
      const wys = P3.p.clientHeight;
      P3.cel.style.display = "block";
      if (this._d3) {
        P3.cel.style.top = 100 - p + "%";
        P3.celT.textContent = (ciagnie ? "" : "→ ") + p + " %";
        return;
      }
      P3.cel.style.top = this._gornaListwy(wys, p, P3.kas) + LISTWA + "px";
      P3.celT.textContent = (ciagnie ? "" : "→ ") + p + " %";
    }
    // pozycja pokazywana na suwaku: jego osłona (osobne skrzydła) albo średnia wszystkich
    _wartSuwaka(S) {
      const i = S.dataset.i, r = i === void 0 ? null : this._ruchy[+i];
      return r && r.widac !== null ? r.widac : this._srednia();
    }
    _rysujSuwak() {
      (this._el.suwaki || []).forEach((S) => {
        const w = (this._suwakEl === S ? this._suwakW : null) ?? this._wartSuwaka(S);
        S.querySelector(".wyp").style[S.classList.contains("pion") ? "height" : "width"] = `calc(16px + (100% - 16px) * ${Math.max(0, Math.min(100, w)) / 100})`;
        S.setAttribute("aria-valuenow", Math.round(w));
      });
    }
    _rysuj() {
      const E = this._el, ile = E.pola.length;
      if (this._brama && this._ruchy[0]?.widac !== null) {
        const w = this._ruchy[0].widac;
        if (this._brZdj) ustawBrameZdj(E.bramaw, this._brTyp, w);
        else if (!this._scenaRuchu) ustawBrame(E.svg, this._cfg.oslona, w);
        else if (this._ostO === null || Math.abs(w - this._ostO) >= 0.4 || w !== this._ostO && (w === 0 || w === 100)) {
          this._ostO = w;
          E.bramaw.innerHTML = kafelRuch(this._scenaRuchu, w / 100, hex(this._cfg.kolor), ramaHex(this._cfg.rama));
        }
      }
      if (this._d3) this._o3?.pozycje(this._poz3d());
      E.pola.forEach((P3, i) => {
        const r = this._ruchy[Math.min(i, this._ruchy.length - 1)];
        if (!r || r.widac === null) return;
        if (this._d3) {
          if (!this._ciagnie) this._pokazCel(i, r.jedzie && r.komenda ? Math.round(r.cel) : null);
          return;
        }
        const wys = P3.p.clientHeight;
        if (!wys) return;
        if (this._poziomo) {
          const z = 100 - r.widac;
          P3.oslona.style.top = this._kas - 2 + "px";
          P3.oslona.style.height = wys - this._kas + 2 + "px";
          if (this._cfg.oslona === "zaslona") {
            const pol = (z / 2).toFixed(2);
            P3.oslona.style.clipPath = "";
            P3.oslona.style.maskImage = P3.oslona.style.webkitMaskImage = `linear-gradient(90deg,#000 0 calc(${pol}% + 6px),transparent calc(${pol}% + 6px) calc(${100 - pol}% - 6px),#000 calc(${100 - pol}% - 6px))`;
          } else P3.oslona.style.clipPath = `inset(0 ${(100 - Math.max(4, z)).toFixed(2)}% 0 0)`;
          if (!this._ciagnie) this._pokazCel(i, r.jedzie && r.komenda ? Math.round(r.cel) : null);
          return;
        }
        if (this._foto) {
          P3.oslona.style.top = "0";
          P3.oslona.style.height = (100 - r.widac).toFixed(2) + "%";
          if (!this._ciagnie) this._pokazCel(i, r.jedzie && r.komenda ? Math.round(r.cel) : null);
          P3._dol = P3.p.offsetTop + (P3.p.parentElement?.offsetTop || 0) + wys * (100 - r.widac) / 100;
          return;
        }
        const kas = P3.kas ?? this._kas, gora = this._gornaListwy(wys, r.widac, kas);
        P3.oslona.style.height = Math.max(0, gora - (kas - 2) + 1) + "px";
        P3.oslona.style.top = kas - 2 + "px";
        P3.listwa.style.transform = `translateY(${gora}px)`;
        if (!this._ciagnie) this._pokazCel(i, r.jedzie && r.komenda ? Math.round(r.cel) : null);
        P3._dol = P3.p.offsetTop + (P3.p.parentElement?.offsetTop || 0) + gora + LISTWA / 2;
      });
      if (E.oba && ile > 1) {
        const y = E.pola.reduce((a, P3) => a + (P3._dol || 0), 0) / ile;
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
  var PLIK_KROKU = { okno: "uklad" };
  var ikKroku = (k, mdi, ciem3) => {
    const n = PLIK_KROKU[k] || k, f = [ciem3 ? n + "-ciemny.png" : null, n + ".png"].find((x) => x && UI.has(x));
    return f ? `<img class="ikk" src="/motor_ha/ui/${f}?v=${WERSJA}" alt="">` : `<ha-icon icon="${mdi}"></ha-icon>`;
  };
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
.k img.ikk{width:72%;height:72%;object-fit:contain;pointer-events:none}
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
.kaf .i img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.gr img.ikg{width:24px;height:24px;border-radius:50%;vertical-align:middle}
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
      const T2 = this._T, n = this._krok, [kl, ik2] = LISTA[n], K = T2.kroki[kl];
      const root = this.shadowRoot || this.attachShadow({ mode: "open" }), ciem3 = !!this._hass?.themes?.darkMode;
      root.innerHTML = `<style>${STYL2}</style><div class="ed">
<div class="pasek" role="tablist">${LISTA.map(([k, i], j) => `<button class="kr${j === n ? " on" : j < n ? " zrob" : ""}" data-k="${j}" role="tab" aria-selected="${j === n}" title="${esc3(T2.kroki[k].t)}">
 <span class="k">${ikKroku(k, i, ciem3 || j === n)}</span><span class="p">${esc3(T2.kroki[k].t)}</span></button>`).join("")}</div>
<div class="tyt"><span class="k">${ikKroku(kl, ik2, ciem3)}</span><h3>${esc3(K.t)}<small>${esc3(wstaw(T2.ui.krok, n + 1, LISTA.length))}</small></h3></div>
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
        box.insertAdjacentHTML("beforeend", `<div class="gr">${UI.has(g + ".png") ? `<img class="ikg" src="/motor_ha/ui/${g}.png?v=${WERSJA}" alt="">` : `<ha-icon icon="${IKONY_GRUP[g]}"></ha-icon>`}${esc3(T2.grupy[g])}</div>`);
        for (const [p, typy] of Object.entries(pod)) {
          box.insertAdjacentHTML("beforeend", `<div class="pg">${esc3(T2.grupy[p])}</div><div class="kafle">${typy.map((t) => `<button class="kaf" data-t="${t}" aria-pressed="${t === wyb}"><span class="i">${ZDJECIA.has(t) ? `<img src="/motor_ha/rodzaje/${t}.webp?v=${WERSJA}" alt="" loading="lazy">` : `<ha-icon icon="${IKONY[t]}"></ha-icon>`}</span>${esc3(T2.oslony[t])}</button>`).join("")}</div>`);
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
      const klucz2 = lista.join() + T2.karta.dom;
      if (klucz2 !== this._klucz) {
        this._klucz = klucz2;
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
  var RAMA2 = { bialy: "antracyt", kremowy: "antracyt", piaskowy: "antracyt" };
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
button .iku{--iku:20px}
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
      const przycisk = (dane, wart, tekst, ikona, kropka) => `<button data-${dane}="${esc5(wart)}"${s[dane] === wart ? ' class="on"' : ""}>${kropka || (ikona ? dane === "pora" || dane === "pogoda" ? ikUI(wart, svgIkony(ikona)) : svgIkony(ikona) : "")}${esc5(tekst)}</button>`;
      const rodzaje = Object.entries(GRUPY).map(([g, pod]) => `<div class="g">${esc5(T2.grupy[g])}</div><div class="c">${Object.values(pod).flat().map((t) => przycisk("typ", t, T2.oslony[t], IKONY[t])).join("")}</div>`).join("");
      root.innerHTML = `<style>${STYL4}${STYL_IKU}</style><div class="s${this._gora?.themes?.darkMode ? " ciemny" : ""}"><div class="k"></div><div>
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
        rama: RAMA2[s.kolor] || "biala",
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

  // src/kreator_okno.js
  var MDI2 = {
    silnik: "M3 4h18v3H3zm2 4h14v9h2v2H3v-2h2zm2 0v9h10V8z",
    uklad: "M3 3h18v18H3zm2 2v6h6V5zm8 0v6h6V5zm-8 8v6h6v-6zm8 0v6h6v-6z",
    rodzaj: "M4 3h16v2H4zm1 3h14v8H5zm6 9h2v3.3a2 2 0 1 1-2 0z",
    kolory: "M12 3a9 9 0 0 0 0 18c.8 0 1.5-.7 1.5-1.5 0-.4-.1-.7-.4-1-.2-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.4-4-8-9-8m-5.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3",
    przypisz: "M17 7h-4v2h4a3 3 0 0 1 0 6h-4v2h4a5 5 0 0 0 0-10m-6 8H7a3 3 0 0 1 0-6h4V7H7a5 5 0 0 0 0 10h4zm-3-4h8v2H8z",
    czujniki: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8m0-14a6 6 0 1 0 6 6 6 6 0 0 0-6-6m0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4m0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2",
    auto: "M12 2a2 2 0 0 1 2 2c0 .7-.4 1.4-1 1.7V7h1a7 7 0 0 1 7 7h1v3h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2v-3h1a7 7 0 0 1 7-7h1V5.7A2 2 0 0 1 12 2M7.5 13a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5m9 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5",
    stoper: "M15 1H9v2h6zm-4 13h2V8h-2zm8-6.6 1.4-1.4c-.4-.5-.9-1-1.4-1.4L17.6 6A9 9 0 1 0 19 7.4M12 20a7 7 0 1 1 7-7 7 7 0 0 1-7 7",
    dzwonek: "M21 19v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4a2 2 0 0 1 4 0v.3c3 .9 5 3.6 5 6.7v6zm-7 2a2 2 0 0 1-4 0",
    gotowe: "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z",
    okno: "M6 2h12a2 2 0 0 1 2 2v16H4V4a2 2 0 0 1 2-2m0 2v7h5V4zm7 0v7h5V4zm-7 9v5h5v-5zm7 0v5h5v-5z",
    slonce: "M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10M2 11h3v2H2zm17 0h3v2h-3zM11 2h2v3h-2zm0 17h2v3h-2zM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4zm12.1 12.1 1.4-1.4 2.1 2.1-1.4 1.4zm2.1-13.5 1.4 1.4-2.1 2.1-1.4-1.4zM6.3 16.3l1.4 1.4-2.1 2.1-1.4-1.4z",
    termo: "M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0m-3-9a1 1 0 0 1 1 1v3h-2V5a1 1 0 0 1 1-1",
    pogoda: "M6 19a5 5 0 0 1-.7-10A7 7 0 0 1 18.6 8 5.5 5.5 0 0 1 18 19z",
    wiatr: "M4 10a1 1 0 0 1 0-2h10a2 2 0 1 0-2-2 1 1 0 0 1-2 0 4 4 0 1 1 4 4zm15 2a3 3 0 1 1-3 3 1 1 0 0 1 2 0 1 1 0 1 0 1-1H4a1 1 0 0 1 0-2zm-7 4a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z",
    deszcz: "M6 14a4 4 0 0 1-.6-8A6 6 0 0 1 17 6.6 4 4 0 0 1 18 14zm1 2 1.5 1-2 3-1.5-1zm5 0 1.5 1-2 3-1.5-1zm5 0 1.5 1-2 3-1.5-1z",
    osoba: "M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8m0 10c4.4 0 8 1.8 8 4v2H4v-2c0-2.2 3.6-4 8-4",
    wschod: "M3 13h18v2H3zm9-8 3 3h-2v3h-2V8H9zM6.3 9.3l1.4 1.4-1.4 1.4-1.4-1.4zm11.4 0 1.4 1.4-1.4 1.4-1.4-1.4z",
    zachod: "M3 13h18v2H3zm9 0-3-3h2V5h2v5h2zM6.3 9.3l1.4 1.4-1.4 1.4-1.4-1.4zm11.4 0 1.4 1.4-1.4 1.4-1.4-1.4z",
    tarcza: "M12 1 3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5zm-1 6h2v6h-2zm0 8h2v2h-2z",
    telefon: "M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2m0 18H7V5h10z",
    bateria: "M16 4h-1V2H9v2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 16H8V6h8zm-7-6h6v5H9z",
    ostrz: "M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z",
    robot: "M12 2a2 2 0 0 1 2 2c0 .7-.4 1.4-1 1.7V7h1a7 7 0 0 1 7 7h1v3h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2v-3h1a7 7 0 0 1 7-7h1V5.7A2 2 0 0 1 12 2",
    foto: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m0-5C7 4 2.7 7.1 1 12c1.7 4.9 6 8 11 8s9.3-3.1 11-8c-1.7-4.9-6-8-11-8",
    x: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
  };
  var ik = (n, r = 18) => `<svg viewBox="0 0 24 24" width="${r}" height="${r}" aria-hidden="true"><path d="${MDI2[n]}"/></svg>`;
  var esc6 = (s) => String(s ?? "").replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[z]);
  var okr = (v) => Math.round(v * 1e3) / 1e3;
  var PROC = (v) => v + " %";
  var PAR = {
    wiatr_prog: { mn: 20, mx: 90, krok: 5, dom: 40, fmt: (v) => v + " km/h" },
    wiatr_poz: { mn: 0, mx: 100, krok: 10, dom: 100, fmt: PROC },
    deszcz_poz: { mn: 0, mx: 100, krok: 10, dom: 100, fmt: PROC },
    wietrzenie_poz: { mn: 10, mx: 100, krok: 10, dom: 50, fmt: PROC },
    slonce_temp: { mn: 15, mx: 35, krok: 1, dom: 24, fmt: (v) => v + " °C" },
    przes_otw: { mn: -120, mx: 120, krok: 5, dom: 0, fmt: (v) => (v > 0 ? "+" : "") + v + " min" },
    przes_zam: { mn: -120, mx: 120, krok: 5, dom: 0, fmt: (v) => (v > 0 ? "+" : "") + v + " min" }
  };
  var SAMO = /[aeiouyąęóаеиоуыэюяіїєáéíóúýěůäöüàèìòù]/i;
  var dziel = (s) => String(s ?? "").replace(/\S{11,}/g, (w) => {
    const sr = Math.floor(w.length / 2);
    for (let d = 0; d < sr - 2; d++) for (const i of [sr + d, sr - d]) if (SAMO.test(w[i - 1]) && !SAMO.test(w[i])) return w.slice(0, i) + "­" + w.slice(i);
    return w.slice(0, sr) + "­" + w.slice(sr);
  });
  var KROKI_OKNA = ["silnik", "uklad", "rodzaj", "kolory", "przypisz", "czujniki", "auto", "stoper", "dzwonek", "gotowe"];
  var KROKI_BRAMY = ["silnik", "rodzaj", "kolory", "czujniki", "stoper", "dzwonek", "gotowe"];
  var BEZ_PODGLADU = ["przypisz", "gotowe"];
  var KROKI_ZESTAWU = ["silnik", "uklad", "rodzaj", "kolory"];
  var KAFLE3D = /* @__PURE__ */ new Map();
  var PUSTY = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  var UL = (v) => +(v * 100).toFixed(3) + "%";
  var KOLORY_TAB = Object.keys(KOLORY);
  var RAMY_TAB = Object.keys(RAMA_Z_KLUCZA);
  var STRONY = [["n", 0], ["e", 90], ["s", 180], ["w", 270]];
  var AUTO_ZEW = ["markiza", "fasadowa", "fasadowaz", "screen"];
  var sumaKol = (K) => K.reduce((a, k, i) => a + k.w + (i < K.length - 1 ? +k.mur || 0 : 0), 0) || 1;
  var sumaWierszy = (k) => k.r.reduce((a, h, j) => a + h + (j < k.r.length - 1 ? +k.bel?.[j] || 0 : 0), 0) || 1;
  function przerwy(u3) {
    const K = u3.kol, suma = sumaKol(K), out = [];
    let x = 0;
    K.forEach((k, c) => {
      const w = k.w / suma, wys = 1 - k.dol, sr = sumaWierszy(k);
      let y = 0;
      k.r.forEach((h, j) => {
        y += h / sr * wys;
        const b = j < k.r.length - 1 ? (+k.bel?.[j] || 0) / sr * wys : 0;
        if (b > 0) out.push([x, y, w, b, "bel", c, j]);
        y += b;
      });
      x += w;
      const m = c < K.length - 1 ? (+k.mur || 0) / suma : 0;
      if (m > 0) out.push([x, 0, m, 1, "mur", c]);
      x += m;
    });
    return out;
  }
  function prostokaty(u3) {
    const K = u3.kol, suma = sumaKol(K), out = [];
    let x = 0;
    K.forEach((k) => {
      const w = k.w / suma, wys = 1 - k.dol, sr = sumaWierszy(k);
      let y = 0;
      k.r.forEach((h, j) => {
        const hh = h / sr * wys;
        out.push([okr(x), okr(y), okr(w), okr(hh)]);
        y += hh + (+k.bel?.[j] || 0) / sr * wys;
      });
      x += w + (+k.mur || 0) / suma;
    });
    return out;
  }
  function zSzablonu(P3) {
    const xs = [...new Set(P3.map((p) => okr(p[0])))].sort((a, b) => a - b);
    const kol = xs.map((x) => {
      const w = P3.filter((p) => okr(p[0]) === x).sort((a, b) => a[1] - b[1]);
      const dol = 1 - Math.max(...w.map((p) => p[1] + p[3]));
      return { w: w[0][2], r: w.map((p) => p[3]), dol: Math.max(0, Math.round(dol * 100) / 100) };
    });
    return { kol: kol.length ? kol : [{ w: 1, r: [1], dol: 0 }] };
  }
  var kopia = (u3) => ({ kol: u3.kol.map((k) => ({ w: +k.w, r: k.r.map(Number), dol: +k.dol || 0, mur: +k.mur || 0, bel: (k.bel || []).map(Number) })) });
  var takiSam = (a, b) => JSON.stringify(prostokaty(a)) === JSON.stringify(prostokaty(b));
  var szablon = (u3) => {
    const i = UKLADY.findIndex(([, P3]) => takiSam(zSzablonu(P3), u3));
    return i < 0 ? "w" : i;
  };
  var godz = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  var minuty = (t) => {
    const [h, m] = String(t || "").split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };
  function wynik(S) {
    const o = { ...S.o };
    if (!S.brama) {
      o.uklad = kopia(S.u);
      o.pola = S.pola.slice(0, prostokaty(S.u).length).map((p) => ({ ...p }));
    } else {
      o.rolety = [...S.rolety];
      delete o.uklad;
      delete o.pola;
    }
    return { tytul: S.tytul, opcje: o };
  }
  var STYL5 = `
:host{--bg:var(--primary-background-color,#f0f2f4);--surface:var(--ha-dialog-surface-background,var(--mdc-theme-surface,var(--card-background-color,#fff)));
 --fg:var(--primary-text-color,#212121);--fg2:var(--secondary-text-color,#6f7377);--line:var(--divider-color,rgba(0,0,0,.12));
 --primary:var(--primary-color,#009ac7);--accent:var(--accent-color,#ff9800);--on:var(--text-primary-color,#fff);
 --tile:color-mix(in srgb,var(--fg) 6%,var(--surface));--primary-soft:color-mix(in srgb,var(--primary) 16%,transparent);--ok:var(--success-color,#2e9e5b);
 display:flex;flex-direction:column;height:100%;background:var(--surface);color:var(--fg);font-family:var(--ha-font-family-body,Roboto,"Noto Sans",system-ui,sans-serif);font-size:14px;position:relative;overflow:hidden}
*{box-sizing:border-box}
button{font:inherit;-webkit-tap-highlight-color:transparent}
[hidden]{display:none!important}
.gora{flex:none;z-index:5;background:var(--surface);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-top:calc(10px + env(safe-area-inset-top,0px));padding-bottom:6px;border-bottom:1px solid var(--line)}
.tytul{display:flex;align-items:center;gap:14px;font-size:20px;font-weight:500;min-height:40px}
.tytul .x{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;color:var(--fg);background:none;border:0;cursor:pointer;flex:none}
.tytul .x svg{fill:currentColor}
.tytul small{display:block;font-size:12px;color:var(--fg2);font-weight:400}
.kroki{display:flex;align-items:center;justify-content:space-between;margin-top:8px;gap:2px}
.krok{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;background:none;border:0;cursor:pointer;padding:2px 0 14px;color:var(--fg2);position:relative}
.krok .k{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;border:2px solid var(--line);background:var(--surface)}
.krok svg{width:18px;height:18px;fill:currentColor}
.krok.zrob{color:var(--primary)} .krok.zrob .k{border-color:var(--primary)}
.krok.teraz{color:var(--primary)} .krok.teraz .k{border-color:var(--accent);background:var(--primary);color:var(--on)}
.krok .n{position:absolute;bottom:0;left:50%;transform:translateX(-50%);font-size:10px;line-height:1;white-space:nowrap;color:var(--fg)}
.krok.teraz .n{font-weight:700;color:var(--primary)}
:host(:not([szeroko])) .kroki{overflow-x:auto;scrollbar-width:none;justify-content:flex-start;padding:0 4px} :host(:not([szeroko])) .kroki::-webkit-scrollbar{display:none}
:host(:not([szeroko])) .krok{flex:0 0 auto;min-width:64px}
.krok:not(.zrob):not(.teraz) .k{border-color:color-mix(in srgb,var(--primary) 45%,var(--line));color:var(--fg)}
.krok:focus-visible .k{box-shadow:0 0 0 3px var(--accent)}
.podglad{display:flex;justify-content:center;padding-top:8px}
.podglad svg{width:150px;height:auto;max-width:100%;max-height:min(150px,18vh);display:block}
.cialo{flex:1;display:flex;min-height:0}
.scena{display:none}
:host([szeroko]) .scena{display:flex;order:-1;flex:0 0 50%;min-width:0;align-items:center;justify-content:center;padding:16px;border-right:1px solid var(--line);background:var(--bg);overflow:auto}
:host([szeroko]) .krok .k{width:46px;height:46px;border-width:3px} :host([szeroko]) .krok svg{width:26px;height:26px} :host([szeroko]) .krok .n{font-size:12px} :host([szeroko]) .krok{padding-bottom:18px}
:host([szeroko]) .scena[hidden]{display:none}
.scena > div, .scena > svg{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.scena > div > svg, .scena #duzeOkno > svg{width:100%;height:100%;max-height:100%}
:host([szeroko]) .wybpol{position:static}
.scena > .edscena{display:block;height:auto;max-width:560px}
.scena{container-type:size}.scena .fokno{width:min(100%,calc((100cqh - 24px) * 193 / 161));margin:0 auto}
.edscena #edytor{display:flex;justify-content:center} .edscena #edSvg{width:100%;height:auto;max-height:calc(100dvh - 420px)}
:host([szeroko]) .krok .n{visibility:visible;color:var(--fg)} :host([szeroko]) .krok.teraz .n{color:var(--primary)}
:host([szeroko]) .krok:not(.zrob):not(.teraz) .k{border-color:color-mix(in srgb,var(--primary) 45%,var(--line));color:var(--fg)}
:host([szeroko]) .krok:hover .k{border-color:var(--accent)}
.tresc{flex:1;min-width:0;overflow:auto;overscroll-behavior:contain;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-top:14px;padding-bottom:24px}
h2{margin:0 0 4px;font-size:18px;font-weight:500;text-wrap:balance}
.pod{margin:0 0 14px;color:var(--fg2);font-size:13px}
.siatka{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.chwyt{flex:none;width:28px;height:40px;display:grid;place-items:center;color:var(--fg2);font-size:20px;cursor:grab;touch-action:none;margin:-8px 0 -8px -6px}
.wiersz.cel{outline:3px solid var(--accent);outline-offset:-3px} .fsz.cel{background:rgba(255,152,0,.35);box-shadow:inset 0 0 0 3px #ff9800}
.wiersz.zrod{opacity:.45} .fsz.zrod{opacity:.5} #duzeOkno .fsz[data-pole]{touch-action:none;cursor:grab} .wiersz{user-select:none;-webkit-user-select:none}
.cialo{position:relative} .duch{position:absolute;left:0;top:0;z-index:20;pointer-events:none;display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:12px;background:var(--surface);color:var(--fg);border:2px solid var(--accent);box-shadow:0 6px 18px rgba(0,0,0,.3);font-size:14px;white-space:nowrap}
.duch .ik{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:var(--accent);color:#fff;font-weight:700}
#duzeOkno svg{touch-action:none}
.wybpol{margin:-4px 0 14px;padding:8px 0 12px;border-bottom:1px solid var(--line);position:sticky;top:-14px;z-index:3;background:var(--surface)}
.wybpol #duzeOkno .fokno{width:min(100%,36vh)}
.fbr{position:relative;width:100%;aspect-ratio:5/4;border-radius:12px;overflow:hidden;background:#d9dadb}
.fbr img{position:absolute;inset:0;width:100%;height:100%;max-width:none;pointer-events:none;user-select:none}
.fbr .fbo,.fbr .fbs{position:absolute;inset:0}
.fokno{position:relative;width:100%;max-width:100%;border-radius:12px;overflow:hidden;background:#d9dadb;user-select:none;-webkit-user-select:none}
.fokno .ftlo{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;pointer-events:none}
.fzest{position:relative;width:100%;max-width:100%;user-select:none;-webkit-user-select:none}
.fzest .fzp{position:absolute;padding:3px;box-sizing:border-box;margin:0;border:0;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center}
.fzest .fzp img{max-width:100%;max-height:100%;width:auto;height:auto;border-radius:10px;pointer-events:none;display:block}
.fzest .fzp.wyb img{outline:3px solid #ff9800;outline-offset:-1px}
.fzest .fzp .fnr{position:absolute;left:8px;top:8px;width:22px;height:22px;border-radius:50%;background:#009ac7;color:#fff;border:2px solid #fff;box-sizing:border-box;display:flex;align-items:center;justify-content:center;font:700 12px/1 var(--ha-font-family-body,Roboto,sans-serif);pointer-events:none}
.fsz{position:absolute;overflow:hidden}
.o3k{position:relative;background:none!important}.o3k .o3h{position:absolute;inset:0;border-radius:12px;overflow:hidden}.scena .fokno.o3k{width:min(100%,calc((100cqh - 24px) * var(--a)))}
.o3k .fzp{position:absolute;padding:0;border:0;background:none;cursor:pointer}.o3k .fzp.wyb{box-shadow:inset 0 0 0 3px #ff9800}.o3k .fsz{background:none}
.fsz .obsz{position:absolute;inset:0}
.ftk{position:absolute;left:0;right:0;top:0;overflow:hidden;pointer-events:none;transition:height .25s linear}
.ftkp{position:absolute;inset:0;overflow:hidden;container-type:size}
.ftki{position:absolute;max-width:none;max-height:none;-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
.fsz.wyb::after{content:"";position:absolute;inset:0;box-shadow:inset 0 0 0 3px #ff9800;pointer-events:none;z-index:3}
.fsz .fnr{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:26px;height:26px;border-radius:50%;background:#009ac7;color:#fff;border:2px solid #fff;
 box-sizing:border-box;display:flex;align-items:center;justify-content:center;font:700 13px/1 var(--ha-font-family-body,Roboto,sans-serif);pointer-events:none}
.fsz .fcz{width:24px;height:24px;position:absolute;left:50%;top:calc(50% + 24px);transform:translate(-50%,-50%);pointer-events:none}
.linia{grid-column:1/-1;display:flex;align-items:center;gap:8px;color:var(--fg2);font-size:12px;margin:4px 0}
.linia::before,.linia::after{content:"";flex:1;border-top:1px solid var(--line)}
.kaf.caly{grid-column:1/-1;border:1.5px dashed var(--accent)} .kaf.caly .miejsce{white-space:normal;text-align:center;max-width:100%} .kaf.caly.wyb{border-style:solid}
.siatka.k4{grid-template-columns:repeat(4,minmax(0,1fr))} .siatka.k2{grid-template-columns:repeat(2,minmax(0,1fr))}
.kaf{position:relative;background:var(--tile);border:2px solid transparent;border-radius:14px;padding:8px 6px 7px;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;color:var(--fg);text-align:center;min-width:0;transition:transform .12s}
.kaf:active{transform:scale(.97)}
.kaf svg{width:100%;height:auto;max-height:84px}
.polaP{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}.probkaP{min-width:44px;height:44px;border-radius:22px;border:2px solid var(--line);background:var(--surface);color:var(--fg);font:600 16px/1 inherit;cursor:pointer}.probkaP.wyb{border-color:var(--accent);background:var(--primary);color:var(--on)}
.zdjRzad{display:flex;gap:6px;justify-content:center}.zdjRzad img.zdj{width:84px!important;flex:none}
.kaf img.zdj{display:block;width:100%;height:auto;max-height:84px;aspect-ratio:6/5;object-fit:contain;border-radius:6px;pointer-events:none}
.ruchP svg{display:block;width:100%;height:auto}
.krok .k img.ikk{width:72%;height:72%;object-fit:contain;display:block}
.kaf b{font-size:11px;font-weight:400;line-height:1.2;color:var(--fg2);overflow-wrap:break-word;hyphens:manual;max-width:100%}
.kaf.wyb{border-color:var(--accent);background:var(--primary-soft)} .kaf.wyb b{color:var(--fg);font-weight:500}
.kaf:focus-visible{outline:3px solid var(--primary);outline-offset:1px}
.kaf.zajeta{opacity:.5}
.zn{position:absolute;top:5px;right:5px;width:18px;height:18px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-size:11px;font-weight:700}
.miejsce{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;color:var(--primary);background:var(--primary-soft);border-radius:10px;padding:2px 7px;max-width:100%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sek{margin:18px 0 8px;font-size:13px;font-weight:500;color:var(--fg2);letter-spacing:.02em}
.grupaR{margin:20px 0 2px;font-size:16px;font-weight:500;color:var(--primary)} .grupaR:first-child{margin-top:4px}
.probki{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 8px;scrollbar-width:thin}
.probka{flex:0 0 auto;width:56px;display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:0;cursor:pointer;color:var(--fg2);font-size:10.5px;text-align:center;line-height:1.15}
.probka i{width:40px;height:40px;border-radius:50%;border:1px solid var(--line);display:block}
.probka.wyb i{outline:3px solid var(--accent);outline-offset:2px} .probka.wyb{color:var(--fg);font-weight:500}
.wiersz{display:flex;align-items:center;gap:12px;background:var(--tile);border-radius:14px;padding:10px 12px;margin-bottom:8px;cursor:pointer;border:2px solid transparent;width:100%;color:var(--fg);text-align:left}
.wiersz .ik{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:var(--primary-soft);color:var(--primary);flex:0 0 auto;font-weight:700}
.wiersz .ik svg{width:22px;height:22px;fill:currentColor}
.wiersz .t{flex:1;min-width:0} .wiersz .t b{display:block;font-weight:500;font-size:14px} .wiersz .t small{display:block;color:var(--fg2);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wiersz.wyl .ik{background:var(--tile);color:var(--fg2);border:1px solid var(--line)} .wiersz.wyl .t b{color:var(--fg2)}
.wiersz.brak{cursor:default}
.przel{width:40px;height:22px;border-radius:11px;background:var(--line);position:relative;flex:0 0 auto;transition:background .15s}
.przel::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .15s;box-shadow:0 1px 2px rgba(0,0,0,.3)}
.wiersz:not(.wyl) .przel{background:var(--primary)} .wiersz:not(.wyl) .przel::after{left:21px}
.przeg{margin-top:6px} .przeg .sek{margin:8px 0 6px} .przeg .sek small{font-weight:400;color:var(--fg2)} .przeg .suw{padding:8px 4px 0;margin:0}
.suw{display:flex;align-items:center;gap:10px;padding:0 12px 10px 64px;margin-top:-6px;margin-bottom:8px;color:var(--fg2);font-size:12px}
.suw input{flex:1;min-width:0;accent-color:var(--primary)}
.suw span{min-width:44px;text-align:end}
.okw{margin:4px 0 10px 52px;padding:8px 10px;border-radius:10px;background:var(--tile);font-size:13px}
.okw .et{display:flex;align-items:center;gap:6px;font-weight:500;margin-bottom:4px}.okw .et svg{fill:var(--accent);width:16px!important;height:16px;flex:none}
.okw .ow{display:flex;gap:8px;align-items:baseline;margin:3px 0}.okw .nr{flex:none;width:18px;height:18px;border-radius:50%;background:var(--accent);color:#3a2600;font-size:11px;font-weight:700;display:grid;place-items:center}
.okw .pod{margin-top:6px}
.suw.chipy{gap:6px;flex-wrap:wrap}
.suw .et{min-width:64px;text-align:start;color:var(--fg2)}
.chipy{display:flex;flex-wrap:wrap;gap:8px}
.chip{border:1px solid var(--line);background:var(--surface);color:var(--fg);border-radius:8px;min-height:32px;padding:0 12px;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;max-width:100%}
.chip svg{fill:currentColor}
.chip.wyb{background:var(--primary-soft);border-color:var(--primary);color:var(--fg)}
.chip .p{font-size:10px;color:var(--ok);font-weight:700;text-transform:uppercase}
.chip:disabled{opacity:.45;cursor:default}
.dol{flex:none;display:flex;justify-content:space-between;align-items:center;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-top:12px;padding-bottom:calc(12px + env(safe-area-inset-bottom,0px));background:var(--surface);border-top:1px solid var(--line)}
.btn{height:44px;padding:0 22px;border-radius:22px;border:0;background:var(--primary);color:var(--on);font-size:15px;font-weight:500;cursor:pointer}
.btn.plaski{background:none;color:var(--primary)}
.btn:disabled{opacity:.5;cursor:default}
.btn:focus-visible,.chip:focus-visible,.wiersz:focus-visible,.probka:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.duzy{display:flex;flex-direction:column;align-items:center;gap:14px;padding:6px 0}
.duzy svg{width:180px;height:auto;max-width:100%}
.zegar{font-size:40px;font-weight:300;font-variant-numeric:tabular-nums}
.blad{color:var(--error-color,#db4437);font-size:13px;text-align:center}
.arkusz{position:absolute;inset:auto 0 0 0;max-height:80%;overflow:auto;background:var(--surface);border-radius:20px 20px 0 0;box-shadow:0 -8px 30px rgba(0,0,0,.25);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));padding-top:10px;padding-bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:8}
.arkusz .uchwyt{width:36px;height:4px;border-radius:2px;background:var(--line);margin:0 auto 12px}
.tlo{position:absolute;inset:0;background:rgba(0,0,0,.35);z-index:7}
.karta{display:block}
.nazwa{width:100%;height:44px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--fg);font:inherit;font-size:15px;padding:0 12px;margin-bottom:12px}
.nazwa:focus{outline:2px solid var(--primary);border-color:transparent}
#edytor{display:flex;justify-content:center;touch-action:none}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important}}`;
  var MotorHaKreator = class extends HTMLElement {
    // start({ hass, flow_id, entry_id, krok, wyslij(dane), zamknij() })
    async start(p) {
      this._p = p;
      this._hass = p.hass;
      this.T = TEKSTY[jezyk({}, p.hass)];
      this.t = this.T.kreator;
      const d = await p.hass.callWS({ type: "motor_ha/kreator/dane", ...p.entry_id ? { entry_id: p.entry_id } : {} });
      this.dane = d;
      const o = { ...d.opcje };
      const S = this.S = {
        o,
        tytul: d.tytul || "",
        rolety: [...o.rolety || []],
        u: kopia(o.uklad),
        pola: (o.pola || []).map((x) => ({ ...x })),
        krok: 0,
        arkusz: null,
        wyb: 0,
        recznie: { uklad: !d.nowy, rodzaj: !d.nowy, tytul: !d.nowy },
        panel: !!d.nowy && d.panel !== "nie",
        wykryty: null,
        pomiar: null
      };
      delete o.uklad;
      delete o.pola;
      S.brama = czyBrama(o.oslona) || this._oslona(S.rolety[0])?.brama;
      S.szablon = szablon(S.u);
      if (d.nowy) {
        o.powiadom = [];
        o.powiadom_gdzie = [];
        this._podpowiedzi();
      }
      const kroki = this.kroki();
      const k = kroki.indexOf(p.krok);
      S.krok = k < 0 ? 0 : k;
      this._zbuduj();
      this.rysuj();
    }
    set hass(h) {
      this._hass = h;
      if (this.S?.pomiar?.trwa || this.kroki()[this.S?.krok] === "stoper") this._odswiezPomiar();
      if (this._kartaEl) this._kartaEl.hass = this._hassKarty();
    }
    kroki() {
      return this.S?.brama ? KROKI_BRAMY.filter((k) => k !== "czujniki" || this._czujnik("foto").lista.length) : KROKI_OKNA;
    }
    _oslona(id) {
      return this.dane?.oslony.find((x) => x.id === id);
    }
    _czujnik(r) {
      return this.dane?.czujniki?.[r] || { lista: [], podpowiedz: null };
    }
    _dark() {
      return !!this._hass?.themes?.darkMode;
    }
    _nieba() {
      return this._dark() ? ["#4f88ad", "#9cc6de"] : ["#9fd3f2", "#e3f3fc"];
    }
    _kolor() {
      const k = this.S.o.kolor_wlasny;
      return Array.isArray(k) ? "#" + k.map((x) => (+x).toString(16).padStart(2, "0")).join("") : KOLORY[this.S.o.kolor] || this.S.o.kolor || "#888";
    }
    _rama() {
      const k = this.S.o.rama_wlasna;
      return Array.isArray(k) ? "#" + k.map((x) => (+x).toString(16).padStart(2, "0")).join("") : RAMA_Z_KLUCZA[this.S.o.rama] || this.S.o.rama || "#f4f4f2";
    }
    // --- podpowiedzi po wyborze osłon: układ, rodzaj, pola z silnikami i czujnikami okien, czujniki domu ---
    _podpowiedzi() {
      const S = this.S, d = this.dane, n = S.rolety.length;
      const pierwsza = this._oslona(S.rolety[0]);
      S.brama = !!pierwsza?.brama;
      if (!S.recznie.rodzaj && pierwsza) {
        const k = pierwsza.klasa;
        S.o.oslona = S.brama ? k === "garage" ? "segmentowa" : "przesuwna" : this._typOslony(pierwsza);
      }
      if (!S.recznie.uklad && !S.brama) {
        if (n <= 4) S.u = zSzablonu(UKLADY[n === 4 ? 7 : n === 3 ? 2 : n === 2 ? 1 : 0][1]);
        else {
          const c = Math.min(4, Math.ceil(n / (n > 8 ? 3 : 2))), m = Math.min(n, 12);
          S.u = { kol: Array.from({ length: c }, (_, i) => ({ w: 1, r: Array(Math.floor(m / c) + (i < m % c ? 1 : 0)).fill(1), dol: 0, mur: 0, bel: [] })) };
        }
        S.szablon = szablon(S.u);
      }
      if (!S.recznie.tytul) {
        const pokoje = new Set(S.rolety.map((e) => this._oslona(e)?.pokoj));
        S.tytul = pokoje.size === 1 && [...pokoje][0] && n > 1 ? [...pokoje][0] : pierwsza?.nazwa || "";
      }
      this._dopasujPola(true);
      if (d.nowy) for (const [r, klucz2] of [
        ["pogoda", "pogoda"],
        ["temp", "czujnik_temp"],
        ["obecnosc", "czujnik_obecnosc"],
        ["wiatr", "czujnik_wiatr"],
        ["deszcz", "czujnik_deszcz"],
        ["foto", "czujnik_foto"]
      ]) {
        const c = this._czujnik(r);
        if (!S.o[klucz2] && c.podpowiedz) S.o[klucz2] = c.podpowiedz;
      }
    }
    // liczba pól = układ; nowe pola dostają kolejne silniki i czujniki okien z pokoju
    _dopasujPola(podpowiedz) {
      const S = this.S, ile = prostokaty(S.u).length, R2 = S.rolety;
      const okna = this._czujnik("okno").lista.filter((x) => x.tu).map((x) => x.id);
      const kolejne = [.../* @__PURE__ */ new Set([...this.dane.okna || [], ...okna])];
      const strona2 = (id) => {
        const n = (this._oslona(id)?.nazwa || id).toLowerCase();
        return /lew|left|links|gauche/.test(n) ? 0 : /praw|right|rechts|droite/.test(n) ? 2 : 1;
      };
      const Rs = [...R2].sort((a, b) => strona2(a) - strona2(b)), P3 = prostokaty(S.u);
      const silnikPola = (i) => Rs.length >= ile ? Rs[i] : Rs[Math.min(Rs.length - 1, Math.floor((P3[i][0] + P3[i][2] / 2) * Rs.length))];
      const nowyUklad = S.pola.length !== ile;
      S.pola = Array.from({ length: ile }, (_, i) => {
        const p = { ...S.pola[i] || {} };
        if ((podpowiedz || nowyUklad || !p.silnik) && R2.length) p.silnik = silnikPola(i);
        p.tryb || (p.tryb = "uchyl");
        return p;
      });
      if (podpowiedz) {
        const kolejnosc = [...S.pola.map((p, i) => i).filter((i, _, a) => a.findIndex((j) => S.pola[j].silnik === S.pola[i].silnik) === i), ...S.pola.map((p, i) => i)];
        const wolne = kolejne.filter((c) => !S.pola.some((q) => q.czujnik === c));
        for (const i of [...new Set(kolejnosc)]) if (!S.pola[i].czujnik && wolne.length) S.pola[i].czujnik = wolne.shift();
      }
    }
    // --- rysunki ---
    oslona(typ, x, y, w, h, poz, kolor) {
      const z = h * (1 - poz / 100), k = kolor, d = [];
      typ = baza(typ);
      const t = { plaster: "plisa", natynkowa: "zewnetrzna", podtynkowa: "zewnetrzna", perforowana: "zewnetrzna", fasadowaz: "fasadowa" }[typ] || typ;
      if (t === "zaslona") {
        const s = w * (0.18 + 0.32 * (1 - poz / 100));
        return `<path d="M${x} ${y}h${s}q${-s * 0.25} ${h / 2} 0 ${h}h${-s}z" fill="${k}"/><path d="M${x + w} ${y}h${-s}q${s * 0.25} ${h / 2} 0 ${h}h${s}z" fill="${k}"/>`;
      }
      if (t === "pionowa") {
        const n = 7, s = w / n;
        for (let i = 0; i < n; i++) d.push(`<rect x="${x + i * s + s * 0.1}" y="${y}" width="${s * (0.15 + 0.7 * (1 - poz / 100))}" height="${h}" fill="${k}" opacity=".9"/>`);
        return d.join("");
      }
      if (z < 1) return `<rect x="${x}" y="${y}" width="${w}" height="2.5" fill="${k}"/>`;
      if (t === "zebra") {
        for (let yy = 0; yy < z; yy += 6) d.push(`<rect x="${x}" y="${y + yy}" width="${w}" height="${Math.min(3.4, z - yy)}" fill="${k}"/><rect x="${x}" y="${y + yy + 3.4}" width="${w}" height="${Math.max(0, Math.min(2.6, z - yy - 3.4))}" fill="${k}" opacity=".35"/>`);
      } else if (t === "plisa") {
        d.push(`<rect x="${x}" y="${y}" width="${w}" height="${z}" fill="${k}"/>`);
        for (let yy = 3; yy < z; yy += 4) d.push(`<line x1="${x}" x2="${x + w}" y1="${y + yy}" y2="${y + yy}" stroke="#000" stroke-opacity=".18" stroke-width=".8"/>`);
      } else if (t === "zaluzja" || t === "drewniana" || t === "fasadowa") {
        for (let yy = 0; yy < z; yy += 4) d.push(`<rect x="${x}" y="${y + yy}" width="${w}" height="2.6" fill="${k}" rx=".6"/>`);
      } else if (t === "zewnetrzna") {
        d.push(`<rect x="${x}" y="${y}" width="${w}" height="${z}" fill="${k}"/>`);
        for (let yy = 3; yy < z; yy += 3.5) d.push(`<line x1="${x}" x2="${x + w}" y1="${y + yy}" y2="${y + yy}" stroke="#000" stroke-opacity=".25" stroke-width=".7"/>`);
      } else if (t === "rzymska") {
        d.push(`<rect x="${x}" y="${y}" width="${w}" height="${z}" fill="${k}"/>`);
        for (let yy = z - 4; yy > 6; yy -= 9) d.push(`<path d="M${x} ${y + yy - 3}q${w / 2} 6 ${w} 0" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="1.2"/>`);
      } else if (t === "markiza") {
        d.push(`<rect x="${x}" y="${y}" width="${w}" height="${z}" fill="${k}" opacity=".92"/>`);
        for (let xx = 0; xx < w; xx += 8) d.push(`<rect x="${x + xx}" y="${y}" width="4" height="${z}" fill="#fff" opacity=".35"/>`);
      } else d.push(`<rect x="${x}" y="${y}" width="${w}" height="${z}" fill="${k}" opacity="${t === "zaciemniajaca" ? 1 : t === "screen" ? 0.8 : 0.96}"/>`);
      d.push(`<rect x="${x}" y="${y + z - 2}" width="${w}" height="2.4" fill="#000" opacity=".45"/>`);
      return d.join("");
    }
    // całe okno ze zdjęć (Canva): zdjęcie wybranego układu, a na każdej szybie osłona pola (wycinek zdjęcia rodzaju spod maski,
    // w kolorze pola), opuszczona do poz. Własny układ: każde pole to zdjęcie jednego skrzydła (u1) rozciągnięte na pole.
    okno(opt = {}) {
      if (moze3d() && !this.bez3d) return this._okno3d({ ...opt, klasa: "fokno", pole: "fsz", tag: "div", wybor: opt.numery, numery: opt.numery });
      const S = this.S, pl = prostokaty(S.u), id = opt.id || "p";
      const nazwa2 = typeof S.szablon === "number" && UKLADY[S.szablon] && UKLADY[S.szablon][1].length === pl.length ? UKLADY[S.szablon][0] : null;
      const gotowy = nazwa2 && UI.has(nazwa2 + ".webp") && SZYBY[nazwa2];
      const proporcja2 = "193/161";
      const d = [`<div class="fokno" data-id="${id}" role="img" aria-label="${esc6(this.t.kroki.uklad)}" style="aspect-ratio:${proporcja2}${opt.w ? `;width:${opt.w}px` : ""}">`];
      if (gotowy) d.push(this._img("ftlo", nazwa2, `/motor_ha/ui/${nazwa2}.webp?v=${WERSJA}`, "", this._rama()));
      const u1 = SZYBY.u1[0];
      pl.forEach((p, i) => {
        const pp = S.pola[i] || {}, typ = pp.oslona || S.o.oslona, kol = pp.kolor ? KOLORY[pp.kolor] || pp.kolor : this._kolor();
        const poz = opt.poz ? opt.poz(i) : 40, zakryte = Math.max(0, Math.min(100, 100 - poz));
        let sz;
        if (gotowy) sz = SZYBY[nazwa2][i];
        else {
          d.push(this._img("ftlo", "u1", `/motor_ha/ui/u1.webp?v=${WERSJA}`, "", this._rama(), `left:${UL(p[0])};top:${UL(p[1])};width:${UL(p[2])};height:${UL(p[3])}`));
          sz = [p[0] + u1[0] * p[2], p[1] + u1[1] * p[3], u1[2] * p[2], u1[3] * p[3]];
        }
        const [x, y, w, h] = sz, rk = RAMKI[typ], on = opt.wybrane === i;
        let tk = "";
        if (rk && ZDJECIA.has(typ) && zakryte > 0)
          tk = `<div class="ftk" style="height:${zakryte}%"><div class="ftkp">${tkanina(typ, kol)}</div></div>`;
        const nr2 = opt.numery ? `<span class="fnr">${i + 1}</span><svg class="fcz" viewBox="0 0 24 24" width="24" height="24">${this._znakCzujnika(i, 12, 12)}</svg>` : "";
        d.push(`<div class="fsz${on ? " wyb" : ""}"${opt.numery ? ` data-pole="${i}"` : ""} style="left:${UL(x)};top:${UL(y)};width:${UL(w)};height:${UL(h)}"><i class="obsz"></i>${tk}${nr2}</div>`);
      });
      d.push("</div>");
      return d.join("");
    }
    // okno 3D (okno3d.js) z układu, rodzaju i koloru każdego pola i koloru ramy; na nim przezroczyste pola (numer, wybór, czujnik)
    _okno3d(opt) {
      const S = this.S, P3 = prostokaty(S.u), pola = P3.map((p) => p.slice(0, 4)), prop = proporcja(pola), { W: W3, H: H2 } = wymiary(prop), m = 0.06;
      const cfg = {
        pola,
        typy: P3.map((_, i) => S.pola[i]?.oslona || S.o.oslona),
        kolory: P3.map((_, i) => {
          const k = S.pola[i]?.kolor;
          return k ? KOLORY[k] || k : this._kolor();
        }),
        rama: this._rama(),
        W: W3,
        H: H2,
        margines: m,
        sciana: S.sciana && SCIANY[S.sciana] || null,
        pozycje: P3.map((_, i) => opt.poz ? opt.poz(i) : 35)
      };
      const R2 = polaNaObrazku(pola, W3, H2, m), id = opt.id || opt.klasa;
      const d = [`<div class="${opt.klasa} o3k" data-id="${id}" data-o3="${esc6(JSON.stringify(cfg))}"${opt.ruch ? ' data-ruch="1"' : ""} role="${opt.wybor ? "group" : "img"}" aria-label="${esc6(this.t.kroki.uklad)}" style="aspect-ratio:${W3}/${H2};--a:${(W3 / H2).toFixed(4)}${opt.w ? `;width:${opt.w}px` : ""}"><div class="o3h"></div>`];
      R2.forEach(([x, y, w, h], i) => {
        const on = opt.wybrane === i, nr2 = opt.numery && P3.length > 1 || opt.klasa === "fokno" && opt.numery ? `<span class="fnr">${i + 1}</span>` : "";
        const cz = opt.klasa === "fokno" && opt.numery ? `<svg class="fcz" viewBox="0 0 24 24" width="24" height="24">${this._znakCzujnika(i, 12, 12)}</svg>` : "";
        d.push(`<${opt.tag} class="${opt.pole}${on ? " wyb" : ""}"${opt.wybor ? ` data-pole="${i}" aria-label="${esc6(wstaw(this.t.pole, i + 1))}"` : ""} style="left:${UL(x)};top:${UL(y)};width:${UL(w)};height:${UL(h)}">${opt.pole === "fsz" ? '<i class="obsz"></i>' : ""}${nr2}${cz}</${opt.tag}>`);
      });
      d.push("</div>");
      return d.join("");
    }
    // kafelki rodzajów: po jednym na klatkę, żeby telefon nie przycinał
    _kafle3d(m) {
      const widok = new URL(`/motor_ha/widok/dzien-sunny.webp?v=${WERSJA}`, location.href).href;
      m.widokKafli(widok);
      const krok = () => {
        const im = [...this.shadowRoot?.querySelectorAll("img.k3d") || []].filter((i) => !KAFLE3D.has(i.dataset.k3d));
        if (!im.length) {
          this._kafleRaf = null;
          return;
        }
        const [t, k, r] = im[0].dataset.k3d.split("|"), u3 = m.kafel(t, k, r, widok);
        if (u3) {
          KAFLE3D.set(im[0].dataset.k3d, u3);
          this.shadowRoot.querySelectorAll(`img.k3d[data-k3d="${CSS.escape(im[0].dataset.k3d)}"]`).forEach((i) => {
            i.src = u3;
          });
        }
        this._kafleRaf = requestAnimationFrame(krok);
      };
      if (!this._kafleRaf) this._kafleRaf = requestAnimationFrame(krok);
    }
    // po narysowaniu kroku: okna 3D w nowych miejscach (to samo okno o tym samym id tylko się przenosi)
    _montuj3d() {
      const r = this.shadowRoot;
      if (!r) return;
      if (r.querySelector("img.k3d")) okno3d(WERSJA).then((m) => this._kafle3d(m)).catch((e) => console.error("Motor HA: kafelki 3D", e));
      const hosty = [...r.querySelectorAll(".o3k")];
      this._o3 || (this._o3 = /* @__PURE__ */ new Map());
      for (const [id, o] of this._o3) if (!hosty.some((h) => h.dataset.id === id)) {
        o.zniszcz();
        this._o3.delete(id);
      }
      if (!hosty.length) return;
      okno3d(WERSJA).then((m) => {
        hosty.forEach((h) => {
          if (!h.isConnected) return;
          const cfg = JSON.parse(h.dataset.o3), id = h.dataset.id, host = h.querySelector(".o3h");
          let o = this._o3.get(id);
          if (o) {
            o.przenies(host);
            o.ustaw(cfg);
          } else {
            o = new m.Okno3D(host, cfg);
            this._o3.set(id, o);
          }
          o.widokZ(`/motor_ha/widok/dzien-sunny.webp?v=${WERSJA}`);
          o._ruch = !!h.dataset.ruch;
          o._cfgPoz = cfg.pozycje;
        });
        this._ruch3d();
      }).catch((e) => console.error("Motor HA: okno 3D", e));
    }
    // w „Rodzaj” i „Kolory” osłony jadą w górę i w dół w kółko, żeby było widać, jak pracują
    _ruch3d() {
      if (this._petla3d) return;
      const t0 = performance.now();
      const klatka = () => {
        const ruchome = [...this._o3?.values() || []].filter((o2) => o2._ruch && o2.host.isConnected);
        if (!ruchome.length || !this.isConnected) {
          this._petla3d = null;
          return;
        }
        const t = (performance.now() - t0) / 1e3 % 7, o = t < 1.5 ? 0 : t < 3.5 ? (t - 1.5) / 2 : t < 5 ? 1 : 1 - (t - 5) / 2, g = o * o * (3 - 2 * o);
        ruchome.forEach((x) => x.pozycje(x._cfgPoz.map(() => Math.round((35 + 65 * g) * 10) / 10)));
        this._petla3d = requestAnimationFrame(klatka);
      };
      this._petla3d = requestAnimationFrame(klatka);
    }
    // znaczek pod numerem pola: pomarańczowy z oknem = czujnik przypisany (ukośna kreska = uchylone), przerywany „+” = brak czujnika
    _znakCzujnika(i, cx, cy) {
      const p = this.S.pola[i] || {};
      if (!p.czujnik) return `<circle cx="${cx}" cy="${cy}" r="8" fill="rgba(255,255,255,.75)" stroke="#ff9800" stroke-width="1.6" stroke-dasharray="3 2"/><path d="M${cx - 4} ${cy}h8M${cx} ${cy - 4}v8" stroke="#ff9800" stroke-width="2"/>`;
      return `<circle cx="${cx}" cy="${cy}" r="9" fill="#ff9800" stroke="#fff" stroke-width="1.6"/><rect x="${cx - 4.5}" y="${cy - 5}" width="9" height="10" fill="none" stroke="#3a2600" stroke-width="1.5"/>` + (p.tryb === "otworz" ? `<path d="M${cx - 4.5} ${cy - 5}l4 1.6v10l-4-1.6z" fill="#3a2600"/>` : `<path d="M${cx - 4.5} ${cy + 5}l2.4-7h4.2" fill="none" stroke="#3a2600" stroke-width="1.4"/>`);
    }
    _brama(typ) {
      return rysunekBramy(baza(typ), this._kolor(), this._rama(), false, false);
    }
    // stały rysunek: duży z boku (szeroki ekran) albo mały na górze (telefon); woła się też przy suwakach, bez rysowania całego kroku
    _odswiezScene(k = this.kroki()[this.S.krok], jedenDuzy = ["rodzaj", "kolory"].includes(k) && !this.S.brama && prostokaty(this.S.u).length > 1) {
      const r = this.shadowRoot, S = this.S;
      if (k === "uklad" && this._szeroko && r.getElementById("edSvg") && this._bezSceny) return;
      const sc = this._szeroko ? this._scena(k) : "";
      r.getElementById("scena").innerHTML = sc;
      r.getElementById("scena").hidden = !sc;
      r.getElementById("podglad").innerHTML = !this._szeroko && !BEZ_PODGLADU.includes(k) && !(k === "uklad" && S.szablon === "w") && !jedenDuzy ? this._podgladMaly() : "";
      this._petlaRuchu();
      this._przekolorujZdj();
    }
    // zdjęcie rodzaju z Canvy w wybranym kolorze (barwienie maską po wczytaniu), albo null, gdy rodzaj nie ma zdjęcia
    _zdj(typ, kolor = this._kolor(), styl = "", rama = this._rama()) {
      if (!ZDJECIA.has(typ)) return null;
      return this._img("zdj", typ, `/motor_ha/rodzaje/${typ}.webp?v=${WERSJA}`, kolor, rama, styl);
    }
    // zdjęcie z Canvy w kolorze osłony i ramy: od razu z pamięci, a gdy jeszcze się liczy – oryginał, podmieniany po chwili
    _img(klasa, typ, src, kolor, rama, styl = "") {
      const st = styl ? ` style="${styl}"` : "";
      return daSie(typ, kolor, rama) ? `<img class="${klasa}" data-przek="${typ}" data-kol="${kolor || ""}" data-ram="${rama || ""}" src="${zKolorem(typ, kolor, rama) || src}" alt="" draggable="false"${st}>` : `<img class="${klasa}" src="${src}" alt="" draggable="false"${st}>`;
    }
    _przekolorujZdj() {
      this._montuj3d();
      this.shadowRoot.querySelectorAll("img[data-przek]").forEach((im) => {
        const t = im.dataset.przek, k = im.dataset.kol, r = im.dataset.ram;
        przekoloruj(t, k, WERSJA, r).then((u3) => {
          if (u3 && im.dataset.przek === t && im.dataset.kol === k && im.dataset.ram === r && im.src !== u3) im.src = u3;
        });
      });
    }
    // całe okno jak w wybranym układzie: na miejscu każdego skrzydła oryginalne zdjęcie kafelka jego osłony (Canva),
    // w kolorze osłony pola i ramy okna – nic nie wycinane. Dotknięcie skrzydła wybiera pole (Rodzaj, Kolory).
    _zestaw(opt = {}) {
      if (moze3d() && !this.bez3d) return this._okno3d({ ...opt, klasa: "fzest", pole: "fzp", tag: opt.wybor ? "button" : "div", poz: () => 35, ruch: ["rodzaj", "kolory"].includes(this.kroki()[this.S.krok]) });
      const S = this.S, P3 = prostokaty(S.u), rama = this._rama();
      const A = Math.max(0.8, Math.min(3, P3.map(([, , w, h]) => 1.2 * h / w).sort((a, b) => a - b)[Math.floor(P3.length / 2)]));
      const d = [`<div class="fzest" role="group" aria-label="${esc6(this.t.kroki.uklad)}" style="aspect-ratio:${+A.toFixed(3)}">`];
      P3.forEach(([x, y, w, h], i) => {
        const pp = S.pola[i] || {}, typ = pp.oslona || S.o.oslona, kol = pp.kolor ? KOLORY[pp.kolor] || pp.kolor : this._kolor();
        const zdj = this._zdj(typ, kol, "", rama) || `<div style="width:100%;height:100%">${this.kafelRodzaju(typ, kol, rama)}</div>`;
        const nr2 = opt.numery && P3.length > 1 ? `<span class="fnr">${i + 1}</span>` : "";
        const tag = opt.wybor ? "button" : "div";
        d.push(`<${tag} class="fzp${opt.wybor && opt.wybrane === i ? " wyb" : ""}"${opt.wybor ? ` data-pole="${i}" aria-label="${esc6(wstaw(this.t.pole, i + 1))}"` : ""} style="left:${UL(x)};top:${UL(y)};width:${UL(w)};height:${UL(h)}">${zdj}${nr2}</${tag}>`);
      });
      d.push("</div>");
      return d.join("");
    }
    // duży podgląd w kolumnie z boku (szeroki ekran): zawsze oryginalne zdjęcia z Canvy (kafelek rodzaju albo układu)
    _scena(k) {
      const S = this.S;
      if (k === "gotowe") return '<div class="karta" id="karta" style="display:block;width:100%;max-width:420px;zoom:1.3"></div>';
      const duze = (html) => `<div style="display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;max-width:480px">${html}</div>`;
      const zdjecie = (t) => duze(this._zdj(t, t === this._akt() ? this._aktKolor() : this._kolor(), "max-height:none;width:100%;border-radius:12px"));
      if (S.brama) return ZDJECIA.has(S.o.oslona) ? zdjecie(S.o.oslona) : maZdjecieBramy(S.o.oslona) ? duze(bramaZdjecie(S.o.oslona)) : `<div>${this._brama(S.o.oslona)}</div>`;
      if (k === "uklad" && S.szablon === "w") return `<div class="edscena">${this._edytorCaly()}</div>`;
      if (KROKI_ZESTAWU.includes(k)) return duze(`<div style="width:100%">${this._zestaw({ numery: true, wybor: ["rodzaj", "kolory"].includes(k), wybrane: this._wybR() })}</div>`);
      if (k === "przypisz") return duze(`<div id="duzeOkno" style="width:100%">${this.okno({ numery: true, id: "d", wybrane: S.arkusz, poz: () => 100 })}</div>`);
      return duze(this.okno({ id: "s", poz: () => 100 }));
    }
    _podgladMaly() {
      const k = this.kroki()[this.S.krok], S = this.S;
      const zdj = (t) => `<div style="width:200px;max-width:100%">${this._zdj(t, this._aktKolor(), "max-height:none;width:100%;border-radius:8px")}</div>`;
      if (S.brama) return ZDJECIA.has(S.o.oslona) ? zdj(S.o.oslona) : maZdjecieBramy(S.o.oslona) ? `<div style="width:220px;max-width:100%">${bramaZdjecie(S.o.oslona)}</div>` : `<div style="width:170px;max-width:100%">${this._brama(S.o.oslona)}</div>`;
      if (KROKI_ZESTAWU.includes(k)) return `<div style="width:${prostokaty(S.u).length > 1 ? 280 : 200}px;max-width:100%">${this._zestaw({ numery: true })}</div>`;
      return `<div style="width:220px;max-width:100%">${this.okno({ id: "p", poz: () => 100 })}</div>`;
    }
    // nowe rodzaje (markizy, okna, nowe bramy) – w karcie mają własny rysunek, więc i tu: otwiera się i zamyka w kółko
    // w „Rodzaj” i „Kolory” każdy rodzaj pokazuje własny rysunek jak na kafelku (1:1), także rolety SK/SKO/SP/SKN, a nie wspólne okno
    _zRuchem(n, k) {
      const t = this._akt();
      if (!RODZAJE_RUCHU.includes(t)) return false;
      if (["rodzaj", "kolory"].includes(k)) return true;
      return wlasnyRuch(t) && (this.S.brama || n <= 1);
    }
    // rodzaj i kolor, które teraz widać: wybranego pola (Rodzaj/Kolory) albo całego okna
    _akt() {
      const S = this.S, wr = ["rodzaj", "kolory"].includes(this.kroki()[S.krok]) ? this._wybR() : null;
      return wr === null ? S.o.oslona : S.pola[wr]?.oslona || S.o.oslona;
    }
    _aktKolor() {
      const S = this.S, wr = ["rodzaj", "kolory"].includes(this.kroki()[S.krok]) ? this._wybR() : null, k = wr === null ? null : S.pola[wr]?.kolor;
      return k ? KOLORY[k] || k : this._kolor();
    }
    _ruchSvg(o) {
      return kafelRuch(this._akt(), o, this._aktKolor(), this._rama());
    }
    _petlaRuchu() {
      if (this._petla) return;
      const t0 = performance.now();
      this._petla = setInterval(() => {
        const el = [...this.shadowRoot.querySelectorAll(".ruchP")];
        if (!el.length || !this.isConnected) {
          clearInterval(this._petla);
          this._petla = null;
          return;
        }
        const t = (performance.now() - t0) / 1e3 % 6, o = t < 1 ? 0 : t < 3 ? (t - 1) / 2 : t < 4 ? 1 : 1 - (t - 4) / 2;
        const g = o * o * (3 - 2 * o), svg4 = this._ruchSvg(g);
        el.forEach((e) => {
          e.innerHTML = svg4;
        });
      }, 70);
    }
    kafelRodzaju(typ, kolor = this._kolor(), rama = this._rama()) {
      if (moze3d() && !this.bez3d && !czyBrama(typ)) return `<img class="zdj k3d" data-k3d="${esc6([typ, kolor, rama].join("|"))}" src="${KAFLE3D.get([typ, kolor, rama].join("|")) || PUSTY}" alt="" draggable="false">`;
      if (ZDJECIA.has(typ)) return this._zdj(typ, kolor, "", rama);
      return kafel(typ, kolor, rama) || this._kafelProsty(typ);
    }
    _kafelProsty(typ) {
      if (czyBrama(typ)) return `<div style="width:100%;pointer-events:none">${this._brama(typ)}</div>`;
      const [n1] = this._nieba();
      return `<svg viewBox="0 0 64 60" aria-hidden="true"><rect x="8" y="4" width="48" height="52" rx="2" fill="${this._rama()}" stroke="#000" stroke-opacity=".25"/>
      <rect x="11" y="7" width="42" height="46" fill="${n1}"/>${this.oslona(typ, 11, 7, 42, 46, 40, this._kolor())}</svg>`;
    }
    // ikona kroku: grafika z Canvy (www/ui, osobna dla ciemnego motywu), a gdy jej nie ma – ikona mdi
    _ikKroku(kk, teraz) {
      const n = { silnik: "oslona", przypisz: "pola", stoper: "czas", dzwonek: "powiadomienia" }[kk] || kk;
      const f = [this._dark() || teraz ? n + "-ciemny.png" : null, n + ".png"].find((x) => x && UI.has(x));
      return f ? `<img class="ikk" src="/motor_ha/ui/${f}?v=${WERSJA}" alt="">` : ik(kk);
    }
    kafelUkladu(P3, drzwi3, klucz2) {
      const f = klucz2 && [klucz2 + ".webp", klucz2 + ".png"].find((x) => UI.has(x));
      if (f) return this._img("zdj", klucz2, `/motor_ha/ui/${f}?v=${WERSJA}`, "", f.endsWith(".webp") ? this._rama() : "");
      const [n1] = this._nieba(), d = ['<svg viewBox="0 0 64 60" aria-hidden="true">'];
      P3.forEach(([x, y, w, h]) => d.push(`<rect x="${6 + x * 52}" y="${4 + y * 50}" width="${w * 52}" height="${h * 50}" fill="${n1}" stroke="var(--fg2)" stroke-width="1.4"/>
      <rect x="${7 + x * 52}" y="${5 + y * 50}" width="${Math.max(0, w * 52 - 2)}" height="${h * 50 * 0.45}" fill="var(--fg2)" opacity=".55"/>`));
      if (drzwi3) d.push('<line x1="2" x2="62" y1="55" y2="55" stroke="var(--fg2)"/>');
      d.push("</svg>");
      return d.join("");
    }
    // --- kroki ---
    str_silnik() {
      const S = this.S, t = this.t, d = this.dane;
      if (!d.oslony.length) return `<p class="pod">${esc6(t.brakOslon)}</p>`;
      const [n1] = this._nieba(), pierwszy = this._oslona(S.rolety[0])?.area;
      const calyPokoj = (a) => {
        const poj = d.oslony.filter((o) => o.area === a && !o.grupa && !o.brama);
        return !!a && poj.length > 1 && poj.length === S.rolety.length && poj.every((o) => S.rolety.includes(o.id));
      };
      const kafel2 = (o) => {
        const czl = (o.czlonkowie || []).filter((e) => this._oslona(e));
        const grWyb = czl.length > 1 && czl.length === S.rolety.length && czl.every((e) => S.rolety.includes(e)) && (S.wybSkad ? S.wybSkad === "grupa:" + o.id : !calyPokoj(o.area));
        const nr2 = S.rolety.indexOf(o.id), poz = typeof o.poz === "number" ? o.poz : o.stan === "closed" ? 0 : 100;
        return `<button class="kaf ${nr2 >= 0 || grWyb ? "wyb" : ""}" data-oslona="${esc6(o.id)}" aria-pressed="${nr2 >= 0}">${nr2 >= 0 ? `<span class="zn">${nr2 + 1}</span>` : ""}
        ${this._zdj(o.brama ? czyBrama(S.o.oslona) ? S.o.oslona : "przesuwna" : this._typKafla(o)) || (o.brama ? `<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M8 40V14h48v26" fill="none" stroke="var(--fg2)" stroke-width="2"/>${Array.from({ length: 8 }, (_, i) => `<line x1="${12 + i * 5.5}" x2="${12 + i * 5.5}" y1="14" y2="40" stroke="var(--fg2)"/>`).join("")}</svg>` : `<svg viewBox="0 0 64 44" aria-hidden="true"><rect x="9" y="3" width="46" height="38" rx="2" fill="${this._rama()}" stroke="#000" stroke-opacity=".25"/>
        <rect x="12" y="6" width="40" height="32" fill="${n1}"/>${this.oslona(this._typOslony(o), 12, 6, 40, 32, Math.max(poz, 8), this._kolor())}</svg>`)}
        <b>${esc6(o.nazwa)}</b><span class="miejsce">${esc6(`${poz} %`)}</span>${o.zajeta && nr2 < 0 ? `<span class="miejsce" style="color:var(--accent)">${esc6(wstaw(t.wUrzadzeniu, o.zajeta))}</span>` : o.grupa ? `<span class="miejsce">${esc6(czl.length > 1 ? wstaw(t.grupaIle, czl.length) : t.grupa)}</span>` : ""}</button>`;
      };
      const pokoje = [...new Set(d.oslony.map((o) => o.area || ""))].sort((a, b) => (b === pierwszy) - (a === pierwszy) || !a - !b || (this._nazwaPokoju(a) || "").localeCompare(this._nazwaPokoju(b) || ""));
      const w = pokoje.map((a) => {
        const tu = d.oslony.filter((o) => (o.area || "") === a).sort((x, y) => !!y.grupa - !!x.grupa || x.nazwa.localeCompare(y.nazwa));
        const poj = tu.filter((o) => !o.grupa && !o.brama), caly = calyPokoj(a) && (!S.wybSkad || S.wybSkad === "pokoj:" + a);
        const okienko = (o, i) => {
          const x = 4 + i * 44, poz = typeof o.poz === "number" ? o.poz : o.stan === "closed" ? 0 : 100;
          return `<rect x="${x}" y="3" width="40" height="38" rx="2" fill="${this._rama()}" stroke="#000" stroke-opacity=".25"/><rect x="${x + 3}" y="6" width="34" height="32" fill="${n1}"/>${this.oslona(this._typOslony(o), x + 3, 6, 34, 32, Math.max(poz, 8), this._kolor())}`;
        };
        const podp = a && poj.length > 1 ? `<button class="kaf caly ${caly ? "wyb" : ""}" data-pokojcaly="${esc6(a)}" aria-pressed="${caly}">
        ${poj.every((o) => ZDJECIA.has(this._typKafla(o))) ? `<div class="zdjRzad">${poj.map((o) => this._zdj(this._typKafla(o))).join("")}</div>` : `<svg viewBox="0 0 ${4 + poj.length * 44} 44" aria-hidden="true">${poj.map(okienko).join("")}</svg>`}
        <b>${esc6(wstaw(t.calyPokoj, this._nazwaPokoju(a)))}</b><span class="miejsce">${esc6(poj.map((o) => o.nazwa).join(" + "))}</span></button>` : "";
        const grupy = tu.filter((o) => o.grupa), reszta = tu.filter((o) => !o.grupa);
        const linia = grupy.length && reszta.length ? `<div class="linia"><span>${esc6(t.pojedyncze)}</span></div>` : "";
        return `<div class="sek">${esc6(a ? this._nazwaPokoju(a) : t.bezPokoju)}</div><div class="siatka k2">${podp}${grupy.map(kafel2).join("")}${linia}${reszta.map(kafel2).join("")}</div>`;
      });
      return w.join("") + (S.wykryty ? `<p class="pod" style="margin-top:12px">${esc6(wstaw(t.wykryty, S.wykryty))}</p>` : "");
    }
    // rysunek kafelka: rodzaj osłony zgadnięty z klasy, lamel albo nazwy
    _typOslony(o) {
      if (o.klasa === "awning") return "markiza";
      if (o.klasa === "shutter") return "natynkowa";
      if (o.lamele) return "zaluzja";
      if (/żaluzj|zaluzj|jalous|blind/i.test(o.nazwa)) return "zebra";
      if (/rolet|roller|shutter/i.test(o.nazwa)) return "pelna";
      return this.S.o.oslona && !czyBrama(this.S.o.oslona) ? this.S.o.oslona : "zebra";
    }
    // wybrana osłona pokazuje rodzaj ustawiony w urządzeniu (ten sam co w podglądzie), reszta – zgadnięty
    _typKafla(o) {
      const S = this.S;
      if (!S.rolety.includes(o.id)) return this._typOslony(o);
      return S.pola.find((p) => p.silnik === o.id && p.oslona)?.oslona || S.o.oslona;
    }
    _nazwaPokoju(a) {
      return this.dane.oslony.find((o) => o.area === a)?.pokoj || a;
    }
    // edytor układu: rysunek z uchwytami, przyciski podziału i suwaki słupka / belki
    _edytorCaly() {
      const t = this.t;
      return `<div id="edytor">${this.edytor()}</div>
      <div class="chipy" style="justify-content:center;margin:10px 0 4px">
        <button class="chip" data-op="poz">${ik("uklad", 16)} ${esc6(t.wPoprzek)}</button><button class="chip" data-op="pion">${ik("uklad", 16)} ${esc6(t.wzdluz)}</button>
        <button class="chip" data-op="usun">${esc6(t.usun)}</button></div>
      <div id="przerwy">${this._suwakiPrzerw()}</div>
      <p class="pod" style="text-align:center">${esc6(t.wlasnyPodpis)}</p>`;
    }
    str_uklad() {
      const S = this.S, t = this.t;
      const ed = S.szablon === "w" && !this._szeroko ? `<div class="sek" style="margin-top:0">${esc6(t.wlasnyTytul)}</div>
      ${this._edytorCaly()}<div class="sek">${esc6(t.zSzablonu)}</div>` : "";
      return ed + `<div class="siatka k4">${UKLADY.map(([k, P3, drzwi3], i) => `<button class="kaf ${S.szablon === i ? "wyb" : ""}" data-uklad="${i}">${this.kafelUkladu(P3, drzwi3, k)}<b>${esc6(dziel(t.uklady[k]))}</b></button>`).join("")}
      <button class="kaf ${S.szablon === "w" ? "wyb" : ""}" data-wlasny="1">${this.kafelUkladu(prostokaty(S.u), false, "wlasny")}<b>${esc6(t.uklady.wlasny)}</b></button></div>`;
    }
    // „Rodzaj”: grupy jak w katalogach producentów, realistyczny obrazek i nazwa (z kodem modelu) pod każdym
    str_rodzaj() {
      const S = this.S, T2 = this.T, k = this._oslona(S.rolety[0])?.klasa;
      const wr = this._wybR(), akt = wr === null ? S.o.oslona : S.pola[wr]?.oslona || S.o.oslona;
      const zewPierwsze = ["shutter", "awning"].includes(k) || czyZew(S.o.oslona);
      let grupy = GRUPY_KAFLI.filter(([g]) => S.brama ? g === "brama" : g !== "brama");
      if (zewPierwsze) grupy = [...grupy.filter(([g]) => g !== "wew"), ...grupy.filter(([g]) => g === "wew")];
      const pasuje = (t) => wr === null || !czyBrama(t) && !!czyZew(t) === !!czyZew(S.o.oslona) && !POZIOME.includes(baza(t));
      const kolor = this._kolor(), rama = this._rama();
      return this._wyborPola() + grupy.map(([g, pod]) => {
        const sek = pod.map(([p, typy]) => [p, typy.filter(pasuje)]).filter(([, typy]) => typy.length);
        if (!sek.length) return "";
        return `<div class="grupaR">${esc6(T2.grupy[g] || g)}</div>` + sek.map(([p, typy]) => (p !== g ? `<div class="sek">${esc6(T2.grupy[p] || p)}</div>` : "") + `<div class="siatka k4">${typy.map((t) => `<button class="kaf ${akt === t ? "wyb" : ""}" data-rodzaj="${t}">${this.kafelRodzaju(t, kolor, rama)}<b>${esc6(dziel(T2.oslony[t] || t))}</b></button>`).join("")}</div>`).join("");
      }).join("");
    }
    str_kolory() {
      const S = this.S, T2 = this.T, t = this.t;
      const wr = this._wybR(), wybrany = (co, k) => co === "kolor" && wr !== null ? (S.pola[wr]?.kolor || S.o.kolor) === k : S.o[co] === k && !S.o[co === "kolor" ? "kolor_wlasny" : co + "_wlasna"];
      const rzad = (co, lista, hexy, nazwy) => `<div class="probki">${lista.map((k) => `<button class="probka ${wybrany(co, k) ? "wyb" : ""}" data-${co}="${k}"><i style="background:${hexy(k)}"></i>${esc6(dziel(nazwy[k] || k))}</button>`).join("")}</div>`;
      const bezOslony = wr === null && OKNA_NAPED.includes(S.o.oslona);
      return this._wyborPola() + (bezOslony ? "" : `<div class="sek">${esc6(t.oslona)}</div>${rzad("kolor", KOLORY_TAB, (k) => KOLORY[k], T2.kolory)}`) + `<div class="sek">${esc6(t.rama)}</div>${rzad("rama", RAMY_TAB, (k) => RAMA_Z_KLUCZA[k], T2.ramy)}${wr === null && przerwy(S.u).some((p) => p[4] === "mur") ? `<div class="sek">${esc6(t.sciana)}</div>${rzad("sciana", Object.keys(SCIANY), (k) => SCIANY[k], t.sciany)}` : ""}`;
    }
    // „Rodzaj” i „Kolory”: całe okno albo jedno pole (przyciski pól; podgląd = zdjęcie kafelka wybranego rodzaju)
    _wybR() {
      const S = this.S;
      return S.brama || S.wybR == null || S.wybR >= prostokaty(S.u).length ? null : S.wybR;
    }
    _wyborPola() {
      const S = this.S, t = this.t, n = prostokaty(S.u).length, wr = this._wybR();
      if (S.brama || n < 2) return "";
      return `<div class="wybpol">${this._szeroko ? "" : `<div style="display:flex;justify-content:center"><div style="width:min(100%,340px)">${this._zestaw({ numery: true, wybor: true, wybrane: wr })}</div></div>`}
      <div class="chipy" style="justify-content:center;margin-top:8px"><button class="chip ${wr === null ? "wyb" : ""}" data-calosc="1">${esc6(t.caleOkno)}</button>
      ${Array.from({ length: n }, (_, i) => `<button class="chip ${wr === i ? "wyb" : ""}" data-pole="${i}">${esc6(wstaw(t.pole, i + 1))}${S.pola[i]?.oslona || S.pola[i]?.kolor ? " ✎" : ""}</button>`).join("")}</div>
      <p class="pod" style="text-align:center;margin:6px 0 0">${esc6(wr === null ? t.rodzajCalosc : wstaw(t.rodzajPole, wr + 1))}</p></div>`;
    }
    str_przypisz() {
      const S = this.S, t = this.t;
      return `<p class="pod" style="text-align:center;margin:0 0 8px">${esc6(t.przypiszPodpis)}</p>${this._szeroko ? "" : `<div style="display:flex;justify-content:center" id="duzeOkno">${this.okno({ w: 230, h: 210, numery: true, id: "d", wybrane: S.arkusz, poz: () => 100 })}</div>`}
      <p class="pod" style="text-align:center;margin:8px 0 0">${esc6(t.zamienPodpis)}</p>
      ${S.rolety.length > 1 ? `<div style="display:flex;justify-content:center;margin-top:8px"><button class="chip" data-zaleca="1">✨ ${esc6(t.jakZaleca)}</button></div>` : ""}
      <div style="margin-top:10px">${prostokaty(S.u).map((_, i) => {
        const p = S.pola[i] || {}, o = this._oslona(p.silnik);
        const c = p.czujnik && this._nazwa(p.czujnik);
        return `<button class="wiersz" data-pole="${i}"><span class="chwyt" title="${esc6(t.przeciagnij)}" aria-hidden="true">⠿</span><span class="ik">${i + 1}</span><span class="t"><b>${esc6(o ? o.nazwa : t.wybierzSilnik)}</b>
          <small>${c ? `✓ ${esc6(c)} · ${esc6(p.tryb === "otworz" ? t.otworz : t.uchyl)}` : `<span style="color:var(--accent)">+ ${esc6(t.czujnikPola)}</span>`}</small></span></button>`;
      }).join("")}</div>`;
    }
    _nazwa(e) {
      const s = this._hass?.states?.[e];
      return s?.attributes?.friendly_name || this._czujnik("okno").lista.find((x) => x.id === e)?.nazwa || e;
    }
    _stan(e) {
      const s = this._hass?.states?.[e];
      return s ? this._hass.formatEntityState ? this._hass.formatEntityState(s) : s.state : "";
    }
    // czujniki domu: [rodzaj, ikona, klucz w ustawieniach]
    _listaCzujnikow() {
      if (this.S.brama) return [["foto", "foto", "czujnik_foto"]];
      return [
        ["pogoda", "pogoda", "pogoda"],
        ["temp", "termo", "czujnik_temp"],
        ["obecnosc", "osoba", "czujnik_obecnosc"],
        ["wiatr", "wiatr", "czujnik_wiatr"],
        ["deszcz", "deszcz", "czujnik_deszcz"]
      ];
    }
    str_czujniki() {
      const S = this.S, t = this.t, w = [];
      if (!S.brama) {
        const okna = [...new Set(S.pola.map((p) => p.czujnik).filter(Boolean))];
        w.push(`<button class="wiersz ${okna.length ? "" : "wyl"}" data-idz="przypisz"><span class="ik">${ik("okno", 22)}</span><span class="t"><b>${esc6(t.czujniki.okno)}</b><small>${esc6(okna.length ? okna.map((e) => this._nazwa(e)).join(", ") : t.okienBrak)}</small></span><span class="przel"></span></button>`);
        if (this.dane.slonce) w.push(`<button class="wiersz ${S.o.bez_slonca ? "wyl" : ""}" data-slonce="1"><span class="ik">${ik("slonce", 22)}</span><span class="t"><b>${esc6(t.czujniki.slonce)}</b><small>${esc6(t.slonceOpis)}</small></span><span class="przel"></span></button>`);
      }
      for (const [r, i, klucz2] of this._listaCzujnikow()) {
        const c = this._czujnik(r), e = S.o[klucz2];
        if (!c.lista.length && !e) {
          w.push(`<div class="wiersz wyl brak"><span class="ik">${ik(i, 22)}</span><span class="t"><b>${esc6(t.czujniki[r])}</b><small>${esc6(t.nieZnalazlem)}</small></span></div>`);
          continue;
        }
        const st = e && this._stan(e);
        w.push(`<button class="wiersz ${e ? "" : "wyl"}" data-czujnik="${r}"><span class="ik">${ik(i, 22)}</span><span class="t"><b>${esc6(t.czujniki[r])}</b><small>${esc6(e ? this._nazwa(e) + (st ? " · " + st : "") : t.nieUzywaj)}</small></span><span class="przel"></span></button>`);
      }
      return w.join("");
    }
    // automatyka: [klucz, ikona, włączona?, opis, suwak]
    str_auto() {
      const S = this.S, o = S.o, t = this.t;
      const okna = S.pola.some((p) => p.czujnik), w = [];
      const harm = !!o.f_harmonogram;
      const wiersz = (k, i, on, tyt, opis, extra = "") => w.push(`<button class="wiersz ${on ? "" : "wyl"}" data-auto="${k}"><span class="ik">${ik(i, 22)}</span><span class="t"><b>${esc6(tyt)}</b><small>${esc6(opis)}</small></span><span class="przel"></span></button>${on ? extra : ""}`);
      const rano = harm && o.harm_otwieraj !== false, wieczor = harm && o.harm_zamykaj !== false;
      const suwak = (g, mn, mx, wart, tekst, krok = 15) => `<div class="suw">${g === "slonce" ? `<span class="et">${esc6(t.pozycja)}</span>` : ""}<input type="range" min="${mn}" max="${mx}" step="${krok}" value="${wart}" data-suw="${g}" aria-label="${esc6(tekst)}"><span>${esc6(g === "slonce" ? 100 - wart + " %" : godz(wart))}</span></div>`;
      const pora = (k, ikona, on, tyt, klucz2, godzKlucz, dom, mn, mx, slonceTekst) => {
        const sl = this._harm(k) === "slonce";
        const tryby = `<div class="suw chipy"><button class="chip ${sl ? "wyb" : ""}" data-harm="${k}" data-v="slonce">${ik(ikona, 16)} ${esc6(slonceTekst)}</button><button class="chip ${sl ? "" : "wyb"}" data-harm="${k}" data-v="godziny">${ik("stoper", 16)} ${esc6(t.godzina)}</button></div>`;
        wiersz(k, ikona, on, tyt, this._opisPory(k), tryby + (sl ? this._par(klucz2, t.przesuniecie) : suwak(godzKlucz, mn, mx, minuty(o[godzKlucz] || dom), tyt)));
      };
      pora("rano", "wschod", rano, t.auto.rano, "przes_otw", "otworz", "07:00", 300, 660, t.wschodSlonca);
      pora("wieczor", "zachod", wieczor, t.auto.wieczor, "przes_zam", "zamknij", "21:00", 1020, 1410, t.zachodSlonca);
      if (okna && wieczor) w.push(this._oknaWieczorem());
      if (!o.bez_slonca) {
        const poz = 100 - (+o.slonce_poz || 20);
        wiersz("slonce", "slonce", !!o.f_slonce, t.auto.slonce, wstaw(t.zaslon, poz), suwak("slonce", 0, 70, +o.slonce_poz || 20, t.auto.slonce, 5) + (o.czujnik_temp || o.pogoda ? this._par("slonce_temp", t.odTemp) : "") + `<div class="suw chipy"><span style="min-width:auto">${esc6(t.strona)}</span>${STRONY.map(([k, a]) => `<button class="chip ${+(o.azymut ?? 180) === a ? "wyb" : ""}" data-azymut="${a}">${esc6(t.strony[k])}</button>`).join("")}</div>`);
      }
      if (okna) {
        wiersz("blokada", "tarcza", !!o.f_blokada, t.auto.blokada, t.okienne);
        wiersz("wietrzenie", "okno", !!o.f_wietrzenie, t.auto.wietrzenie, t.okienne, this._par("wietrzenie_poz", t.pozycja));
      }
      const zew = czyZew(o.oslona);
      if (zew && (o.pogoda || o.czujnik_wiatr)) wiersz(
        "wiatr",
        "wiatr",
        !!o.f_wiatr,
        t.auto.wiatr,
        wstaw(t.wiatrOpis, o.wiatr_prog ?? 40),
        this._zrodlo("wiatr", "czujnik_wiatr") + this._par("wiatr_prog", t.prog) + this._par("wiatr_poz", t.pozycja)
      );
      if (AUTO_ZEW.includes(o.oslona) && (o.pogoda || o.czujnik_deszcz)) wiersz(
        "deszcz",
        "deszcz",
        !!o.f_deszcz,
        t.auto.deszcz,
        t.deszczOpis,
        this._zrodlo("deszcz", "czujnik_deszcz") + this._par("deszcz_poz", t.pozycja)
      );
      if (!zew || !(o.pogoda || o.czujnik_wiatr)) w.push(`<p class="pod" style="margin-top:6px">${esc6(t.autoPodpis)}</p>`);
      return w.join("");
    }
    _harm(k) {
      const o = this.S.o;
      return o[k === "rano" ? "harm_rano" : "harm_wieczor"] || o.harm_tryb || "godziny";
    }
    _opisPory(k) {
      const o = this.S.o, t = this.t, rano = k === "rano";
      if (this._harm(k) !== "slonce") return wstaw(t.oGodz, godz(minuty(o[rano ? "otworz" : "zamknij"] || (rano ? "07:00" : "21:00"))));
      const m = +(o[rano ? "przes_otw" : "przes_zam"] ?? 0);
      if (!m) return rano ? t.oWschodzie : t.oZachodzie;
      return wstaw(t[(m > 0 ? "po" : "przed") + (rano ? "Wsch" : "Zach")], Math.abs(m));
    }
    // co wieczorne zamykanie zrobi przy każdym skrzydle z czujnikiem okna
    _oknaWieczorem() {
      const S = this.S, o = S.o, t = this.t;
      const wiersze = S.pola.map((p, i) => [p, i]).filter(([p]) => p.czujnik).map(([p, i]) => {
        const uch = p.tryb !== "otworz";
        const co = uch && o.f_wietrzenie ? wstaw(t.zjedzieDo, o.wietrzenie_poz ?? PAR.wietrzenie_poz.dom) : o.f_blokada ? t.nieZjedzie : t.zjedzieNormalnie;
        return `<div class="ow"><span class="nr">${i + 1}</span><span><b>${esc6(this._nazwa(p.czujnik))}</b> · ${esc6(uch ? t.uchyl : t.otworz)} → ${esc6(co)}</span></div>`;
      });
      return `<div class="okw"><div class="et">${ik("okno", 16)} ${esc6(t.oknaWieczorem)}</div>${wiersze.join("")}<div class="pod">${esc6(t.pozniej)}</div></div>`;
    }
    // ustawienia włączonej automatyki: z czego bierze dane, próg i pozycja (suwaki pod wierszem)
    _par(k, etykieta) {
      const d = PAR[k], v = +(this.S.o[k] ?? d.dom);
      return `<div class="suw"><span class="et">${esc6(etykieta)}</span><input type="range" min="${d.mn}" max="${d.mx}" step="${d.krok}" value="${v}" data-par="${k}" aria-label="${esc6(etykieta)}"><span>${esc6(d.fmt(v))}</span></div>`;
    }
    _zrodlo(r, klucz2) {
      const o = this.S.o, t = this.t, lista = this._czujnik(r).lista;
      const opcje = [...lista.map((x) => [x.id, x.nazwa]), ...o.pogoda ? [["", this._nazwa(o.pogoda)]] : []];
      if (opcje.length < 2) return "";
      return `<div class="suw chipy"><span class="et">${esc6(t.zrodlo)}</span>${opcje.map(([id, n]) => `<button class="chip ${(o[klucz2] || "") === id ? "wyb" : ""}" data-zrodlo="${esc6(id)}" data-klucz="${klucz2}">${esc6(n)}</button>`).join("")}</div>`;
    }
    str_stoper() {
      const S = this.S, t = this.t, p = S.pomiar || {};
      const czas = p.czas ?? (+S.o.czas || 0);
      return `<div class="duzy"><div id="okKal">${this._oknoNaZywo()}</div>
      <div class="zegar" id="zegar">${p.trwa ? this._sekundy() : czas ? `${String(czas).replace(".", this._przecinek())} s${p.czas ? " ✓" : ""}` : "— s"}</div>
      <button class="btn" id="mierz" ${p.trwa || !S.rolety.length ? "disabled" : ""}>${esc6(p.trwa ? t.mierze : czas ? t.zmierzZnow : t.zmierz)}</button>
      ${p.silniki?.length > 1 ? `<div class="okw" style="margin:0;align-self:stretch"><div class="et">${ik("stoper", 16)} ${esc6(t.kazdy)}</div>${p.silniki.map((x, i) => `<div class="ow"><span class="nr">${i + 1}</span><span style="flex:1">${esc6(x.nazwa)}</span><b>${String(x.czas).replace(".", this._przecinek())} s</b></div>`).join("")}</div>` : ""}
      ${p.blad ? `<p class="blad">${esc6(p.blad)}</p>` : ""}
      <p class="pod" style="text-align:center">${esc6(t.pomin)}</p></div>`;
    }
    _przecinek() {
      return 1.5.toLocaleString(this._hass?.locale?.language || void 0).includes(",") ? "," : ".";
    }
    _sekundy() {
      const p = this.S.pomiar;
      return ((performance.now() - p.od) / 1e3).toFixed(1).replace(".", this._przecinek()) + " s";
    }
    _pozycja(e) {
      const s = this._hass?.states?.[e];
      const p = s?.attributes?.current_position;
      return typeof p === "number" ? p : s?.state === "closed" ? 0 : 100;
    }
    _oknoNaZywo() {
      const S = this.S;
      if (S.brama) return `<div style="width:200px;max-width:100%">${this._brama(S.o.oslona)}</div>`;
      return this.okno({ w: 180, h: 165, id: "k", poz: (i) => this._pozycja(S.pola[i]?.silnik || S.rolety[0]) });
    }
    _odswiezPomiar() {
      const r = this.shadowRoot;
      if (!r) return;
      const o = r.getElementById("okKal");
      if (o && !this.S.brama) o.innerHTML = this._oknoNaZywo();
      const z = r.getElementById("zegar");
      if (z && this.S.pomiar?.trwa) z.textContent = this._sekundy();
    }
    async _mierz() {
      const S = this.S, t = this.t;
      const rolety = S.brama ? S.rolety : [...new Set(S.pola.map((p) => p.silnik).filter(Boolean))];
      S.pomiar = { trwa: true, od: performance.now() };
      this.rysuj();
      const tik = setInterval(() => {
        if (!S.pomiar?.trwa) clearInterval(tik);
        else this._odswiezPomiar();
      }, 100);
      try {
        const w = await this._hass.callWS({ type: "motor_ha/kreator/mierz", rolety });
        if (w.czas) {
          S.o.czas = w.czas;
          S.pomiar = { czas: w.czas, silniki: w.silniki || [] };
        } else S.pomiar = { blad: w.brak?.length ? wstaw(t.nieOdp, w.brak.join(", ")) : w.wynik === "kalibracja_od_razu" ? t.odRazu : t.bladPomiaru };
      } catch (e) {
        S.pomiar = { blad: t.bladPomiaru };
      }
      clearInterval(tik);
      if (this.kroki()[S.krok] === "stoper") this.rysuj();
    }
    str_dzwonek() {
      const S = this.S, o = S.o, t = this.t, w = [];
      const gdzie = new Set(o.powiadom_gdzie || []), co = new Set(o.powiadom || []);
      for (const tel of this.dane.telefony) w.push(`<button class="wiersz ${gdzie.has(tel.id) ? "" : "wyl"}" data-tel="${esc6(tel.id)}"><span class="ik">${ik(tel.telefon ? "telefon" : "dzwonek", 22)}</span><span class="t"><b>${esc6(tel.telefon ? t.telefon : tel.nazwa)}</b><small>${esc6(tel.telefon ? tel.nazwa : tel.id)}</small></span><span class="przel"></span></button>`);
      if (!this.dane.telefony.length) w.push(`<p class="pod">${esc6(t.brakTelefonu)}</p>`);
      const rodzaje = S.brama ? ["nie_odpowiada", "brama_otwarta", "brama_niedomknieta", ...o.czujnik_foto ? ["przeszkoda"] : [], "bateria"] : ["nie_odpowiada", "nie_dojechala", "bateria", "automatyka"];
      const ikony = { nie_odpowiada: "ostrz", nie_dojechala: "stoper", bateria: "bateria", automatyka: "robot", brama_otwarta: "ostrz", brama_niedomknieta: "stoper", przeszkoda: "foto" };
      for (const r of rodzaje) w.push(`<button class="wiersz ${co.has(r) ? "" : "wyl"}" data-powiadom="${r}"><span class="ik">${ik(ikony[r], 22)}</span><span class="t"><b>${esc6(t.powiadom[r])}</b><small>${esc6(t.powiadomOpis[r])}</small></span><span class="przel"></span></button>`);
      return w.join("");
    }
    str_gotowe() {
      const S = this.S, t = this.t, d = this.dane;
      const panel = d.panele.find((p) => p.klucz === d.panel);
      return `<input class="nazwa" id="nazwa" value="${esc6(S.tytul)}" aria-label="${esc6(t.nazwa)}" placeholder="${esc6(t.nazwa)}">
      ${this._szeroko ? "" : '<div class="karta" id="karta"></div>'}
      ${d.nowy && panel ? `<button class="wiersz ${S.panel ? "" : "wyl"}" data-panel="1" style="margin-top:12px"><span class="ik">${ik("uklad", 22)}</span><span class="t"><b>${esc6(t.naPanel)}</b><small>${esc6(panel.nazwa)}</small></span><span class="przel"></span></button>` : ""}`;
    }
    // karta na udawanej encji: dokładnie to, co pokaże panel
    _konfigKarty() {
      const S = this.S, o = S.o;
      const pl = S.brama ? null : prostokaty(S.u).map(([x, y, w, h], i) => ({ x, y, w, h, ...S.pola[i] || {} }));
      return {
        type: "custom:motor-ha",
        entity: "cover.motor_ha_kreator",
        name: S.tytul || " ",
        oslona: o.oslona,
        kolor: this._kolor(),
        rama: this._rama(),
        sciana: o.sciana,
        wysokosc: +o.wysokosc || 260,
        czas: +o.czas || "auto",
        odwroc: !!o.odwroc,
        ...pl ? { pola: pl, skrzydla: pl.length } : { skrzydla: 1 },
        _podglad: { pogoda: "sunny", pora: "dzien" }
      };
    }
    _hassKarty() {
      const h = this._hass, S = this.S, teraz = (/* @__PURE__ */ new Date()).toISOString();
      const R2 = S.brama ? S.rolety : [...new Set(S.pola.map((p) => p.silnik).filter(Boolean))];
      const poz = R2.length ? Math.round(R2.reduce((a, e) => a + this._pozycja(e), 0) / R2.length) : 60;
      const stan = {
        entity_id: "cover.motor_ha_kreator",
        state: poz > 0 ? "open" : "closed",
        last_changed: teraz,
        last_updated: teraz,
        context: { id: "" },
        attributes: { current_position: poz, friendly_name: S.tytul, supported_features: 15, entity_id: R2 }
      };
      return { ...h, states: { ...h.states, "cover.motor_ha_kreator": stan }, callService: () => Promise.resolve(), callWS: () => Promise.resolve(null) };
    }
    // --- edytor własnego układu: duże okno z uchwytami do przeciągania i wybieranym polem ---
    edytor() {
      const duzy = this._szeroko, EW = duzy ? 440 : 260, EH = duzy ? 390 : 230, EP = 10, S = this.S, P3 = prostokaty(S.u), K = S.u.kol, suma = sumaKol(K), iw = EW - 2 * EP, ih = EH - 2 * EP;
      const [n1, n2] = this._nieba(), d = [], kol = this._kolor();
      d.push(`<svg id="edSvg" viewBox="0 0 ${EW} ${EH + 14}" width="${EW}" height="${EH + 14}" style="max-width:100%;height:auto;touch-action:none" role="img" aria-label="${esc6(this.t.wlasnyTytul)}">`);
      d.push(`<defs><linearGradient id="nE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${n1}"/><stop offset="1" stop-color="${n2}"/></linearGradient></defs>`);
      d.push(`<line x1="0" x2="${EW}" y1="${EH - EP + 1}" y2="${EH - EP + 1}" stroke="var(--fg2)" stroke-width="1.5"/>`);
      for (const [x2, y, w, h, typ] of przerwy(S.u)) d.push(this._przerwa(EP + x2 * iw, EP + y * ih, w * iw, h * ih, typ));
      P3.forEach((p, i) => {
        const x2 = EP + p[0] * iw, y = EP + p[1] * ih, w = p[2] * iw, h = p[3] * ih, on = S.wyb === i;
        const pp = S.pola[i] || {}, wi = Math.max(0, w - 8), hi = Math.max(0, h - 8);
        d.push(`<g data-ep="${i}"><rect x="${x2}" y="${y}" width="${w}" height="${h}" fill="${this._rama()}" stroke="#000" stroke-opacity=".3"/>
        ${this._poleZdj(x2, y, w, h, pp.oslona || S.o.oslona, pp.kolor ? KOLORY[pp.kolor] || pp.kolor : kol, i)}
        ${on ? `<rect x="${x2 + 1.5}" y="${y + 1.5}" width="${Math.max(0, w - 3)}" height="${Math.max(0, h - 3)}" fill="none" stroke="#ff9800" stroke-width="3"/>` : ""}
        ${duzy ? `<circle cx="${x2 + w / 2}" cy="${y + h / 2}" r="12" fill="${on ? "#ff9800" : "#009ac7"}" stroke="#fff" stroke-width="2"/><text x="${x2 + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${i + 1}</text>` : `<text x="${x2 + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="${on ? "#e65100" : "#1c3a4a"}">${i + 1}</text>`}</g>`);
      });
      const uchwyt = (typ, id, x2, y, poziomy) => `<g data-uch="${typ}:${id}" style="cursor:${poziomy ? "ns" : "ew"}-resize"><circle cx="${x2}" cy="${y}" r="16" fill="transparent"/>
      <rect x="${x2 - (poziomy ? 14 : 4)}" y="${y - (poziomy ? 4 : 14)}" width="${poziomy ? 28 : 8}" height="${poziomy ? 8 : 28}" rx="4" fill="#009ac7" stroke="#fff" stroke-width="1.5"/></g>`;
      let x = 0;
      K.forEach((k, c) => {
        const w = k.w / suma, X = EP + x * iw, W3 = w * iw, wys = 1 - k.dol, sr = sumaWierszy(k);
        let y = 0;
        k.r.forEach((h, j) => {
          y += h / sr * wys;
          if (j < k.r.length - 1) {
            const b = (+k.bel?.[j] || 0) / sr * wys;
            d.push(uchwyt("r", `${c}-${j}`, X + W3 / 2, EP + (y + b / 2) * ih, true));
            y += b;
          }
        });
        if (k.dol >= 0.08 && k.r.length < 3) d.push(`<g data-dodaj="${c}" style="cursor:pointer"><rect x="${X + 4}" y="${EP + wys * ih + 10}" width="${Math.max(0, W3 - 8)}" height="${Math.max(0, k.dol * ih - 14)}" rx="4" fill="transparent" stroke="var(--fg2)" stroke-dasharray="5 4"/>
        <text x="${X + W3 / 2}" y="${EP + (wys + k.dol / 2) * ih + 11}" text-anchor="middle" font-size="22" fill="var(--fg2)">+</text></g>`);
        d.push(uchwyt("d", c, X + W3 / 2, EP + wys * ih, true));
        x += w;
        const m = c < K.length - 1 ? (+k.mur || 0) / suma : 0;
        if (c < K.length - 1) d.push(uchwyt("k", c, EP + (x + m / 2) * iw, EP + ih * 0.5, false));
        x += m;
      });
      d.push("</svg>");
      this._ed = { EW, EH, EP };
      return d.join("");
    }
    // pole w edytorze własnego układu: zdjęcie skrzydła (u1) rozciągnięte na pole, a na szybie osłona ze zdjęcia rodzaju (maska)
    _poleZdj(x, y, w, h, typ, kol, i) {
      const [gx, gy, gw, gh] = SZYBY.u1[0], X = x + gx * w, Y = y + gy * h, W3 = gw * w, H2 = gh * h, rk = RAMKI[typ];
      let tk = "";
      if (rk && ZDJECIA.has(typ)) {
        const [bx, by, bw, bh] = rk, z = 0.6, f = (n) => +n.toFixed(2);
        tk = `<defs><mask id="em${i}" maskUnits="userSpaceOnUse" x="0" y="0" width="193" height="161"><image href="/motor_ha/rodzaje/maski/${typ}.png?v=${WERSJA}" x="0" y="0" width="193" height="161" preserveAspectRatio="none"/></mask></defs>
        <svg x="${X}" y="${Y}" width="${W3}" height="${H2 * z}" viewBox="${f(bx * 193)} ${f(by * 161)} ${f(bw * 193)} ${f(bh * 161)}" preserveAspectRatio="xMidYMid slice" overflow="hidden">
        <image href="${zKolorem(typ, kol) || `/motor_ha/rodzaje/${typ}.webp?v=${WERSJA}`}" x="0" y="0" width="193" height="161" preserveAspectRatio="none" mask="url(#em${i})"/></svg>`;
      }
      return `<image href="/motor_ha/ui/u1.webp?v=${WERSJA}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="none"/>${tk}`;
    }
    // wąski odstęp = słupek w kolorze ramy, szeroki = kawałek ściany (cegły)
    _przerwa(x, y, w, h, typ) {
      const wasko = Math.min(w, h) < 12;
      if (wasko) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${this._rama()}" stroke="#000" stroke-opacity=".3"/>`;
      const sc = this.S.o.sciana, cegla = sc === "cegla", fuga = cegla ? 'stroke="#e9e1d6" stroke-opacity=".7"' : 'stroke="#000" stroke-opacity=".12"';
      const d = [`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${SCIANY[sc] || "#c9bfb2"}" stroke="#000" stroke-opacity=".25"/>`];
      for (let yy = y + 7, n = 0; yy < y + h; yy += 7, n++) {
        d.push(`<line x1="${x}" x2="${x + w}" y1="${yy}" y2="${yy}" ${fuga}/>`);
        for (let xx = x + (n % 2 ? 6 : 12); xx < x + w; xx += 12) d.push(`<line x1="${xx}" x2="${xx}" y1="${yy - 7}" y2="${yy}" ${fuga}/>`);
      }
      return `<g>${d.join("")}</g>`;
    }
    // gdzie jest wybrane pole: kolumna c i wiersz j
    _gdzie(i) {
      const K = this.S.u.kol;
      let c = 0;
      while (c < K.length - 1 && i >= K[c].r.length) {
        i -= K[c].r.length;
        c++;
      }
      return [c, i];
    }
    // suwaki grubości: słupek/mur obok wybranego pola i belka pod nim
    _suwakiPrzerw() {
      const S = this.S, t = this.t, K = S.u.kol, [c, j] = this._gdzie(Math.min(S.wyb, prostokaty(S.u).length - 1)), w = [];
      const cm = c < K.length - 1 ? c : c - 1, k = K[c];
      const sw = K.reduce((a, x) => a + x.w, 0), sr = k.r.reduce((a, b) => a + b, 0);
      const blok = (tytul, gdzie, typ, id, v, waski) => {
        const rodzaj = !v ? "brak" : v <= 3 ? "waski" : "sciana", nz = t.przegRodzaj;
        return `<div class="przeg"><div class="sek">${esc6(tytul)} <small>· ${esc6(gdzie)}</small></div><div class="chipy">${[["brak", nz.brak], ["waski", nz[waski]], ["sciana", nz.sciana]].map(([r, n]) => `<button class="chip ${rodzaj === r ? "wyb" : ""}" data-przeg="${typ}:${id}:${r}">${esc6(n)}</button>`).join("")}</div>
        ${rodzaj === "sciana" ? `<div class="suw"><span class="et">${esc6(t.szerokosc)}</span><input type="range" min="4" max="${typ.startsWith("mur") ? 40 : 30}" step="1" value="${v}" data-przerwa="${typ}:${id}" aria-label="${esc6(t.szerokosc)}"><span>${v} %</span></div>` : ""}</div>`;
      };
      const nr2 = Math.min(S.wyb, prostokaty(S.u).length - 1) + 1;
      if (cm >= 0) w.push(blok(t.przegPion, wstaw(t.obokPola, nr2), "mur", `${cm}:0`, Math.round((+K[cm].mur || 0) / sw * 100), "slupek"));
      const jb = j < k.r.length - 1 ? j : j - 1;
      if (jb >= 0) w.push(blok(t.przegPoz, wstaw(t.podPolem, nr2), "bel", `${c}:${jb}`, Math.round((+k.bel?.[jb] || 0) / sr * 100), "belka"));
      return w.join("");
    }
    _odswiezUklad(bezSuwakow) {
      this._dopasujPola(false);
      const r = this.shadowRoot, e = r.getElementById("edytor");
      if (e) e.innerHTML = this.edytor();
      const pz = r.getElementById("przerwy");
      if (pz && !bezSuwakow) pz.innerHTML = this._suwakiPrzerw();
      this._bezSceny = true;
      this._odswiezScene();
      this._bezSceny = false;
      const k = r.querySelector("[data-wlasny]");
      if (k) k.firstElementChild.outerHTML = this.kafelUkladu(prostokaty(this.S.u));
    }
    operacja(op) {
      const S = this.S, K = S.u.kol, P3 = prostokaty(S.u);
      let i = op === "dodaj" ? arguments[1] : Math.min(S.wyb, P3.length - 1), c = 0;
      if (op !== "dodaj") while (i >= K[c].r.length) {
        i -= K[c].r.length;
        c++;
      }
      const k = K[c];
      if (op === "dodaj") {
        const kd = K[i], wys = 1 - kd.dol, sr = kd.r.reduce((a, b) => a + b, 0);
        kd.r = [...kd.r.map((h) => h / sr * wys), kd.dol];
        kd.dol = 0;
        kd.bel = [...(kd.bel || []).map((b) => b / sr * wys), 0];
        S.wyb = K.slice(0, i).reduce((a, x) => a + x.r.length, 0) + kd.r.length - 1;
        this._dopasujPola(false);
        return this.rysuj();
      }
      if (op === "poz" && k.r.length < 3) {
        const h = k.r[i] / 2;
        k.r.splice(i, 1, h, h);
        (k.bel = k.bel || []).splice(i, 0, 0);
      }
      if (op === "pion" && K.length < 4) {
        k.w /= 2;
        K.splice(c + 1, 0, { w: k.w, r: [...k.r], dol: k.dol, bel: [...k.bel || []], mur: k.mur || 0 });
        k.mur = 0;
      }
      if (op === "sciana" && K.length > 1) {
        const cm = c < K.length - 1 ? c : c - 1, sw = K.reduce((a, x) => a + x.w, 0);
        K[cm].mur = +K[cm].mur > 0 ? 0 : sw * 0.12;
        if (K[cm].mur && !this.S.o.sciana) this.S.o.sciana = "biala";
      }
      if (op === "usun" && P3.length > 1) {
        if (k.r.length > 1) {
          const h = k.r.splice(i, 1)[0];
          k.r[Math.max(0, i - 1)] += h + (+k.bel?.[Math.min(i, k.r.length - 1)] || 0);
          k.bel?.splice(Math.min(i, k.r.length - 1), 1);
        } else {
          const u3 = K.splice(c, 1)[0];
          K[Math.max(0, c - 1)].w += u3.w + (+u3.mur || 0);
          if (c >= K.length && K.length) K[K.length - 1].mur = 0;
        }
        S.wyb = 0;
      }
      this._dopasujPola(false);
      this.rysuj();
    }
    _ciagnij(e) {
      const svg4 = this.shadowRoot.getElementById("edSvg");
      if (!svg4 || !this._uch) return;
      const { EW, EH, EP } = this._ed, r = svg4.getBoundingClientRect(), sk = EW / r.width;
      const fx = Math.min(1, Math.max(0, ((e.clientX - r.left) * sk - EP) / (EW - 2 * EP))), fy = Math.min(1, Math.max(0, ((e.clientY - r.top) * sk - EP) / (EH - 2 * EP)));
      const K = this.S.u.kol, suma = sumaKol(K), [typ, id] = this._uch.split(":");
      if (typ === "k") {
        const c = +id, przed = K.slice(0, c).reduce((a, k) => a + k.w + (+k.mur || 0), 0) / suma, m = (+K[c].mur || 0) / suma, para = (K[c].w + K[c + 1].w) / suma;
        const lewa = Math.min(para - 0.08, Math.max(0.08, fx - przed - m / 2));
        K[c].w = lewa * suma;
        K[c + 1].w = (para - lewa) * suma;
      } else if (typ === "d") {
        K[+id].dol = Math.min(0.6, Math.max(0, Math.round((1 - fy) * 50) / 50));
      } else {
        const [c, j] = id.split("-").map(Number), k = K[c], wys = 1 - k.dol, sr = sumaWierszy(k), bel = k.bel || [];
        const gora = k.r.slice(0, j).reduce((a, b2, i) => a + b2 + (+bel[i] || 0), 0) / sr * wys, b = (+bel[j] || 0) / sr * wys, para = (k.r[j] + k.r[j + 1]) / sr * wys;
        const g = Math.min(para - 0.06, Math.max(0.06, fy - gora - b / 2));
        k.r[j] = g / wys * sr;
        k.r[j + 1] = (para - g) / wys * sr;
      }
      this._odswiezUklad();
    }
    // listy w arkuszach: najpierw tylko to, co jest w pokoju osłony (i to, co już wybrane); reszta domu po „Pokaż wszystkie”
    // „duch” przeciąganego pola: numer i silnik idą za palcem / myszką
    _duch(i) {
      const o = this._oslona(this.S.pola[i]?.silnik), d = document.createElement("div");
      d.id = "duch";
      d.className = "duch";
      d.innerHTML = `<span class="ik">${i + 1}</span><b>${esc6(o ? o.nazwa : this.t.wybierzSilnik)}</b>`;
      this.shadowRoot.querySelector(".cialo").append(d);
    }
    _polePod(e) {
      let naj = null, pole = Infinity;
      for (const el of this.shadowRoot.querySelectorAll("#duzeOkno .fsz[data-pole] > .obsz, .wiersz[data-pole]")) {
        const b = el.getBoundingClientRect();
        if (e.clientX >= b.left && e.clientX <= b.right && e.clientY >= b.top && e.clientY <= b.bottom && b.width * b.height < pole) {
          pole = b.width * b.height;
          naj = el.closest("[data-pole]");
        }
      }
      return naj ? +naj.dataset.pole : null;
    }
    _tylkoTu(lista, tu, wybrane) {
      if (this.S.wszystkie || !lista.some(tu)) return { lista, wiecej: "" };
      return {
        lista: lista.filter((x) => tu(x) || wybrane.includes(x.id)),
        wiecej: `<button class="chip" data-wszystkie="1">${esc6(this.t.wszystkie)}</button>`
      };
    }
    arkusz() {
      const S = this.S, t = this.t, i = S.arkusz, p = S.pola[i] || (S.pola[i] = { tryb: "uchyl" });
      const pokoj = this._oslona(S.rolety[0])?.area;
      const sil = this._tylkoTu(this.dane.oslony.filter((o) => !o.brama && (!o.grupa || S.rolety.includes(o.id))).sort((a, b) => (pokoj ? (b.area === pokoj) - (a.area === pokoj) : 0) || a.nazwa.localeCompare(b.nazwa)), (o) => pokoj && o.area === pokoj, [p.silnik, ...S.rolety]);
      const silniki = sil.lista;
      const ok = this._tylkoTu(this._czujnik("okno").lista, (c) => c.tu, [p.czujnik]), okna = ok.lista;
      return `<div class="tlo" data-zamknij="1"></div><div class="arkusz" role="dialog" aria-label="${esc6(wstaw(t.pole, i + 1))}"><div class="uchwyt"></div><h2>${esc6(wstaw(t.pole, i + 1))}</h2>
      <div class="sek">${esc6(t.silnikPola)}</div><div class="chipy">${silniki.map((o) => `<button class="chip ${p.silnik === o.id ? "wyb" : ""}" data-silnik="${esc6(o.id)}">${esc6(o.nazwa)}${pokoj && o.area === pokoj && o.pokoj ? `<span class="p">${esc6(o.pokoj)}</span>` : ""}</button>`).join("")}${sil.wiecej}</div>
      <div class="sek">${esc6(t.czujnikPola)}</div><div class="chipy">${okna.map((c) => `<button class="chip ${p.czujnik === c.id ? "wyb" : ""}" data-czuj="${esc6(c.id)}">${esc6(c.nazwa)}${c.tu && c.pokoj ? `<span class="p">${esc6(c.pokoj)}</span>` : ""}</button>`).join("")}
      ${ok.wiecej}<button class="chip ${!p.czujnik ? "wyb" : ""}" data-czuj="">${esc6(t.bezCzujnika)}</button></div>
      ${p.czujnik ? `<div class="sek">${esc6(t.gdyOtwarte)}</div><div class="chipy">${["uchyl", "otworz"].map((k) => `<button class="chip ${p.tryb === k ? "wyb" : ""}" data-tryb="${k}">${esc6(t[k])}</button>`).join("")}</div>` : ""}
      <div style="display:flex;justify-content:flex-end;margin-top:16px"><button class="btn" data-zamknij="1">${esc6(t.gotowe)}</button></div></div>`;
    }
    arkuszCzujnika(r) {
      const S = this.S, t = this.t, klucz2 = this._listaCzujnikow().find((x) => x[0] === r)[2], c = this._tylkoTu(this._czujnik(r).lista, (x) => x.tu, [S.o[klucz2]]);
      return `<div class="tlo" data-zamknij="1"></div><div class="arkusz" role="dialog" aria-label="${esc6(t.czujniki[r])}"><div class="uchwyt"></div><h2>${esc6(t.czujniki[r])}</h2>
      <div class="chipy" style="margin-top:12px">${c.lista.map((x) => `<button class="chip ${S.o[klucz2] === x.id ? "wyb" : ""}" data-wybierz="${esc6(x.id)}" data-klucz="${klucz2}">${esc6(x.nazwa)}${x.pokoj ? `<span class="p">${esc6(x.pokoj)}</span>` : ""}</button>`).join("")}
      ${c.wiecej}<button class="chip ${!S.o[klucz2] ? "wyb" : ""}" data-wybierz="" data-klucz="${klucz2}">${esc6(t.nieUzywaj)}</button></div>
      <div style="display:flex;justify-content:flex-end;margin-top:16px"><button class="btn" data-zamknij="1">${esc6(t.gotowe)}</button></div></div>`;
    }
    // --- budowa i rysowanie ---
    _zbuduj() {
      const r = this.shadowRoot || this.attachShadow({ mode: "open" }), t = this.t;
      this.lang = jezyk({}, this._hass);
      r.innerHTML = `<style>${STYL5}</style>
      <div class="gora"><div class="tytul"><button class="x" data-x="1" aria-label="${esc6(t.zamknij)}">${ik("x", 22)}</button>
        <div><span id="nazwaKroku"></span><small id="ktory"></small></div></div>
        <div class="kroki" id="kroki"></div><div class="podglad" id="podglad"></div></div>
      <div class="cialo"><div class="scena" id="scena"></div><div class="tresc" id="tresc"></div></div>
      <div class="dol"><button class="btn plaski" id="wstecz">${esc6(t.wstecz)}</button><button class="btn" id="dalej">${esc6(t.dalej)}</button></div>`;
      r.addEventListener("click", (e) => this._klik(e));
      this._ro?.disconnect();
      this._ro = new ResizeObserver(() => {
        if (this.S && this.clientWidth >= 760 !== !!this._szeroko) this.rysuj();
      });
      this._ro.observe(this);
      r.addEventListener("input", (e) => this._wpis(e));
      r.addEventListener("pointerdown", (e) => {
        const zp = this.kroki()[this.S.krok] === "przypisz" && (e.target.closest?.("#duzeOkno .fsz[data-pole]") || e.target.closest?.(".chwyt")?.closest("[data-pole]") || (e.pointerType === "mouse" ? e.target.closest?.(".wiersz[data-pole]") : null));
        if (zp && e.button === 0) {
          e.preventDefault();
          this._zamiana = { z: +zp.dataset.pole, x: e.clientX, y: e.clientY, jedzie: false, id: e.pointerId };
          try {
            r.querySelector(".cialo").setPointerCapture(e.pointerId);
          } catch (x) {
          }
        }
        const u3 = e.target.closest?.("[data-uch]"), p = e.target.closest?.("[data-ep]");
        if (u3) {
          this._uch = u3.dataset.uch;
          e.preventDefault();
          try {
            r.getElementById("edytor").setPointerCapture(e.pointerId);
          } catch (x) {
          }
          return;
        }
        if (p) {
          this.S.wyb = +p.dataset.ep;
          this._odswiezUklad();
        }
      });
      r.addEventListener("pointermove", (e) => {
        if (this._uch) this._ciagnij(e);
        const z = this._zamiana;
        if (!z || e.pointerId !== z.id) return;
        if (!z.jedzie && Math.hypot(e.clientX - z.x, e.clientY - z.y) > 6) {
          z.jedzie = true;
          this._duch(z.z);
        }
        if (!z.jedzie) return;
        e.preventDefault();
        const cel = this._polePod(e);
        z.do = cel;
        r.querySelectorAll("[data-pole]").forEach((el) => {
          el.classList.toggle("cel", +el.dataset.pole === cel && cel !== z.z);
          el.classList.toggle("zrod", +el.dataset.pole === z.z);
        });
        const d = r.getElementById("duch"), c = r.querySelector(".cialo").getBoundingClientRect();
        if (d) d.style.transform = `translate(${Math.max(0, Math.min(c.width - d.offsetWidth - 4, e.clientX - c.left + 12))}px,${e.clientY - c.top + 12}px)`;
      });
      r.addEventListener("pointerup", (e) => {
        const z = this._zamiana;
        if (!z || e.pointerId !== z.id) return;
        this._zamiana = null;
        r.getElementById("duch")?.remove();
        if (!z.jedzie) {
          r.querySelectorAll(".zrod").forEach((el) => el.classList.remove("zrod"));
          return;
        }
        this._poZamianie = true;
        setTimeout(() => {
          this._poZamianie = false;
        }, 80);
        const cel = this._polePod(e) ?? z.do ?? null, S = this.S;
        if (cel !== null && cel !== z.z) {
          const a = S.pola[z.z] || {};
          S.pola[z.z] = S.pola[cel] || {};
          S.pola[cel] = a;
        }
        this.rysuj();
      });
      r.addEventListener("pointercancel", () => {
        if (!this._zamiana) return;
        this._zamiana = null;
        r.getElementById("duch")?.remove();
        this.rysuj();
      });
      const koniec = () => {
        if (this._uch) {
          this._uch = null;
          this.S.szablon = szablon(this.S.u) === "w" ? "w" : this.S.szablon;
        }
      };
      r.addEventListener("pointerup", koniec);
      r.addEventListener("pointercancel", koniec);
    }
    rysuj() {
      const S = this.S, t = this.t, r = this.shadowRoot, kroki = this.kroki();
      S.krok = Math.min(S.krok, kroki.length - 1);
      const k = kroki[S.krok];
      r.getElementById("nazwaKroku").textContent = t.kroki[k];
      r.getElementById("ktory").textContent = `${wstaw(t.krok, S.krok + 1, kroki.length)} · v${WERSJA}`;
      r.getElementById("kroki").innerHTML = kroki.map((kk, i) => `<button class="krok ${i === S.krok ? "teraz" : i < S.krok ? "zrob" : ""}" data-krok="${i}" aria-label="${esc6(t.kroki[kk])}"${i === S.krok ? ' aria-current="step"' : ""}><span class="k">${this._ikKroku(kk, i === S.krok)}</span><span class="n">${esc6(t.kroki[kk])}</span></button>`).join("");
      {
        const kr = r.getElementById("kroki"), a = kr.querySelector(".teraz");
        if (a && kr.scrollWidth > kr.clientWidth) kr.scrollLeft = a.offsetLeft - (kr.clientWidth - a.offsetWidth) / 2;
      }
      const jedenDuzy = ["rodzaj", "kolory"].includes(k) && !S.brama && prostokaty(S.u).length > 1;
      this._szeroko = this.clientWidth >= 760;
      this.toggleAttribute("szeroko", this._szeroko);
      this._odswiezScene(k, jedenDuzy);
      const pyt = k === "rodzaj" && S.brama ? t.pytania.rodzajBrama : t.pytania[k], pod = t.podpisy[k];
      this._kartaEl = null;
      r.getElementById("tresc").innerHTML = `<h2>${esc6(pyt)}</h2>${pod ? `<p class="pod">${esc6(pod)}</p>` : ""}${this["str_" + k]()}` + (S.arkusz !== null && k === "przypisz" ? this.arkusz() : "") + (S.arkuszC && k === "czujniki" ? this.arkuszCzujnika(S.arkuszC) : "");
      this._przekolorujZdj();
      r.getElementById("wstecz").style.visibility = S.krok ? "visible" : "hidden";
      const dalej = r.getElementById("dalej");
      dalej.textContent = S.krok === kroki.length - 1 ? t.zapisz : t.dalej;
      dalej.disabled = !S.rolety.length && !S.pola.some((p) => p.silnik);
      if (k === "gotowe" && customElements.get("motor-ha")) {
        const el = document.createElement("motor-ha");
        el.setConfig(this._konfigKarty());
        el.hass = this._hassKarty();
        r.getElementById("karta").appendChild(el);
        this._kartaEl = el;
      }
    }
    _idz(nr2) {
      this.S.krok = nr2;
      this.S.arkusz = null;
      this.S.arkuszC = null;
      this.rysuj();
      this.shadowRoot.getElementById("tresc").scrollTop = 0;
    }
    async _klik(e) {
      var _a, _b, _c, _d;
      if (this._poZamianie) return;
      const b = e.target.closest("button, .fsz[data-pole], g[data-dodaj], [data-zamknij]");
      if (!b) return;
      const S = this.S, o = S.o, d = b.dataset, kroki = this.kroki();
      if (d.x) return this._p.zamknij();
      if (d.krok !== void 0) return this._idz(+d.krok);
      if (d.zaleca) {
        S.pola = S.pola.map((p) => ({ ...p, silnik: void 0, czujnik: void 0 }));
        this._dopasujPola(true);
        return this.rysuj();
      }
      if (b.id === "wstecz") return this._idz(Math.max(0, S.krok - 1));
      if (b.id === "dalej") return S.krok < kroki.length - 1 ? this._idz(S.krok + 1) : this._zapisz(b);
      if (b.id === "mierz") return this._mierz();
      if (d.idz) return this._idz(kroki.indexOf(d.idz));
      if (d.oslona || d.pokojcaly) {
        const i = S.rolety.indexOf(d.oslona), x = this._oslona(d.oslona);
        const czl = (x?.czlonkowie || []).filter((e2) => this._oslona(e2));
        if (d.pokojcaly) {
          const kol = (n) => /lew|left/i.test(n) ? 0 : /środ|srod|mid/i.test(n) ? 1 : /praw|right/i.test(n) ? 2 : 3;
          S.rolety = this.dane.oslony.filter((o2) => o2.area === d.pokojcaly && !o2.grupa && !o2.brama).sort((x2, y2) => kol(x2.nazwa) - kol(y2.nazwa) || x2.nazwa.localeCompare(y2.nazwa)).map((o2) => o2.id).slice(0, 12);
          S.wykryty = null;
          S.wybSkad = "pokoj:" + d.pokojcaly;
        } else if (czl.length > 1 && i < 0) {
          S.rolety = czl.slice(0, 12);
          S.zGrupy = x.nazwa;
          S.wykryty = null;
          S.wybSkad = "grupa:" + x.id;
        } else if (i >= 0) {
          S.rolety.splice(i, 1);
          S.wybSkad = null;
        } else {
          S.wybSkad = null;
          if (S.rolety.some((e2) => !!this._oslona(e2)?.brama !== !!x?.brama)) S.rolety = [];
          S.rolety.push(d.oslona);
          S.wykryty = null;
          if (S.rolety.length === 1 && x?.area && !x.brama && this.dane.nowy) {
            const reszta = this.dane.oslony.filter((o2) => o2.area === x.area && o2.id !== x.id && !o2.zajeta && !o2.grupa && !o2.brama).map((o2) => o2.id);
            if (reszta.length) {
              S.rolety.push(...reszta.slice(0, 11));
              S.wykryty = x.pokoj;
            }
          }
        }
        if (S.rolety.length && prostokaty(S.u).length !== S.rolety.length) {
          S.recznie.uklad = false;
          S.pola = [];
        }
        try {
          this.dane = { ...this.dane, ...await this._hass.callWS({ type: "motor_ha/kreator/dane", rolety: S.rolety, ...this._p.entry_id ? { entry_id: this._p.entry_id } : {} }), opcje: this.dane.opcje, nowy: this.dane.nowy };
        } catch (x2) {
        }
        this._podpowiedzi();
      } else if (d.uklad !== void 0) {
        S.u = zSzablonu(UKLADY[+d.uklad][1]);
        S.szablon = +d.uklad;
        S.recznie.uklad = true;
        this._dopasujPola(false);
      } else if (d.wlasny) {
        S.szablon = "w";
        S.recznie.uklad = true;
        S.wyb = 0;
      } else if (d.op) return this.operacja(d.op);
      else if (d.dodaj !== void 0) return this.operacja("dodaj", +d.dodaj);
      else if (d.rodzaj && this._wybR() !== null) {
        const p = (_a = S.pola)[_b = this._wybR()] || (_a[_b] = {});
        if (d.rodzaj === o.oslona) delete p.oslona;
        else p.oslona = d.rodzaj;
      } else if (d.rodzaj) {
        o.oslona = d.rodzaj;
        S.recznie.rodzaj = true;
      } else if (d.kolor && this._wybR() !== null) {
        const p = (_c = S.pola)[_d = this._wybR()] || (_c[_d] = {});
        if (d.kolor === o.kolor) delete p.kolor;
        else p.kolor = d.kolor;
      } else if (d.kolor) {
        o.kolor = d.kolor;
        delete o.kolor_wlasny;
      } else if (d.calosc) S.wybR = null;
      else if (d.rama) {
        o.rama = d.rama;
        delete o.rama_wlasna;
      } else if (d.sciana) o.sciana = d.sciana;
      else if (d.przeg) {
        const [typ, c, j, r] = d.przeg.split(":"), K = S.u.kol, mur = typ === "mur", k = K[+c];
        const v = r === "brak" ? 0 : r === "waski" ? 2 : mur ? 12 : 10, cal = mur ? K.reduce((a, x) => a + x.w, 0) : k.r.reduce((a, b2) => a + b2, 0);
        if (mur) k.mur = v / 100 * cal;
        else {
          k.bel = k.bel || [];
          k.bel[+j] = v / 100 * cal;
        }
        if (r === "sciana" && !o.sciana) o.sciana = "biala";
        S.szablon = "w";
        return this._odswiezUklad();
      } else if (d.pole !== void 0 && ["rodzaj", "kolory"].includes(kroki[S.krok])) S.wybR = this._wybR() === +d.pole ? null : +d.pole;
      else if (d.pole !== void 0) {
        S.arkusz = +d.pole;
        S.wszystkie = false;
      } else if (d.zamknij) {
        S.arkusz = null;
        S.arkuszC = null;
        S.wszystkie = false;
      } else if (d.wszystkie) S.wszystkie = true;
      else if (d.silnik) {
        S.pola[S.arkusz].silnik = d.silnik;
        if (!S.rolety.includes(d.silnik)) S.rolety.push(d.silnik);
      } else if (d.czuj !== void 0) S.pola[S.arkusz].czujnik = d.czuj || void 0;
      else if (d.tryb) S.pola[S.arkusz].tryb = d.tryb;
      else if (d.slonce) {
        o.bez_slonca = !o.bez_slonca;
        if (o.bez_slonca) o.f_slonce = false;
      } else if (d.czujnik) {
        S.arkuszC = d.czujnik;
        S.wszystkie = false;
      } else if (d.zrodlo !== void 0) {
        if (d.zrodlo) o[d.klucz] = d.zrodlo;
        else delete o[d.klucz];
      } else if (d.wybierz !== void 0) {
        if (d.wybierz) o[d.klucz] = d.wybierz;
        else delete o[d.klucz];
        S.arkuszC = null;
        S.wszystkie = false;
      } else if (d.auto) this._przelacz(d.auto);
      else if (d.harm) o[d.harm === "rano" ? "harm_rano" : "harm_wieczor"] = d.v;
      else if (d.azymut) o.azymut = +d.azymut;
      else if (d.tel) {
        const g = new Set(o.powiadom_gdzie || []);
        g.has(d.tel) ? g.delete(d.tel) : g.add(d.tel);
        o.powiadom_gdzie = [...g];
      } else if (d.powiadom) {
        const g = new Set(o.powiadom || []);
        g.has(d.powiadom) ? g.delete(d.powiadom) : g.add(d.powiadom);
        o.powiadom = [...g];
      } else if (d.panel) S.panel = !S.panel;
      else return;
      const y = this.shadowRoot.getElementById("tresc").scrollTop;
      this.rysuj();
      this.shadowRoot.getElementById("tresc").scrollTop = y;
    }
    _przelacz(k) {
      const o = this.S.o;
      if (k === "rano" || k === "wieczor") {
        let rano = !!o.f_harmonogram && o.harm_otwieraj !== false, wieczor = !!o.f_harmonogram && o.harm_zamykaj !== false;
        if (k === "rano") rano = !rano;
        else wieczor = !wieczor;
        o.f_harmonogram = rano || wieczor;
        o.harm_otwieraj = rano || !wieczor;
        o.harm_zamykaj = wieczor || !rano;
        if (o.f_harmonogram && !o.harm_tryb) o.harm_tryb = "godziny";
        if (o.f_harmonogram && o.harm_tryb === "slonce" && !this._zmienionyTryb) {
          o.harm_tryb = "godziny";
          this._zmienionyTryb = true;
        }
        if (!o.otworz) o.otworz = "07:00:00";
        if (!o.zamknij) o.zamknij = "21:00:00";
        return;
      }
      o["f_" + k] = !o["f_" + k];
      if (k === "wietrzenie" && o.f_wietrzenie) o.wietrzenie_poz = 50;
    }
    _wpis(e) {
      const el = e.target, S = this.S;
      if (el.id === "nazwa") {
        S.tytul = el.value;
        S.recznie.tytul = true;
        if (this._kartaEl) {
          this._kartaEl.setConfig(this._konfigKarty());
          this._kartaEl.hass = this._hassKarty();
        }
        return;
      }
      if (el.dataset?.przerwa) {
        const [typ, c, j] = el.dataset.przerwa.split(":"), K = S.u.kol, v2 = +el.value, k = K[+c];
        if (typ === "mur") k.mur = v2 / 100 * K.reduce((a, x) => a + x.w, 0);
        else {
          k.bel = k.bel || [];
          k.bel[+j] = v2 / 100 * k.r.reduce((a, b) => a + b, 0);
        }
        el.nextElementSibling.textContent = v2 ? v2 + " %" : this.t.brak;
        S.szablon = "w";
        return this._odswiezUklad(true);
      }
      if (el.dataset?.par) {
        const k = el.dataset.par, v2 = +el.value;
        S.o[k] = v2;
        el.nextElementSibling.textContent = PAR[k].fmt(v2);
        if (k === "przes_otw" || k === "przes_zam") {
          const r = k === "przes_otw" ? "rano" : "wieczor", sm2 = el.closest(".suw").parentElement.querySelector(`[data-auto="${r}"] small`);
          if (sm2) sm2.textContent = this._opisPory(r);
        }
        if (k === "wiatr_prog") {
          const sm2 = el.closest(".suw").parentElement.querySelector('[data-auto="wiatr"] small');
          if (sm2) sm2.textContent = wstaw(this.t.wiatrOpis, v2);
        }
        return;
      }
      const g = el.dataset?.suw;
      if (!g) return;
      const v = +el.value;
      if (g === "slonce") S.o.slonce_poz = v;
      else S.o[g] = godz(v) + ":00";
      el.nextElementSibling.textContent = g === "slonce" ? 100 - v + " %" : godz(v);
      const sm = g === "slonce" ? el.closest(".suw").previousElementSibling.querySelector("small") : el.closest(".suw").parentElement.querySelector(`[data-auto="${g === "otworz" ? "rano" : "wieczor"}"] small`);
      if (sm) sm.textContent = g === "slonce" ? wstaw(this.t.zaslon, 100 - v) : this._opisPory(g === "otworz" ? "rano" : "wieczor");
    }
    _zapisz(b) {
      const S = this.S;
      S.o.na_panel = this.dane.nowy && S.panel ? this.dane.panel : "nie";
      if (!S.recznie.tytul && !S.tytul) S.tytul = this._oslona(S.rolety[0])?.nazwa || "";
      b.disabled = true;
      this._p.wyslij(wynik(S));
    }
  };

  // src/kreator.js
  var Z_KLASYCZNEGO = {
    rodzaj: "rodzaj",
    lamele: "rodzaj",
    kolory: "kolory",
    okno: "uklad",
    czujniki: "przypisz",
    silnik: "stoper",
    automatyka: "auto",
    ustawienia: "auto",
    powiadomienia: "dzwonek",
    panel: "gotowe"
  };
  var ZNAK = "data-motor-ha-pasek";
  var GAL = "data-motor-ha-galeria";
  var PODGLAD = "data-motor-ha-podglad";
  var PREFIKS = "data:image/svg+xml;base64,";
  var ENCJA2 = "cover.motor_ha_podglad";
  var AKCENT = "#ff9800";
  var WYGLAD = ["oslona", "kolor", "rama", "skrzydla", "osobno", "odwroc", "wysokosc", "kolor_wlasny", "rama_wlasna"];
  function wszystkie(korzen, szukaj, wynik2 = [], n = 0) {
    if (!korzen || n > 12) return wynik2;
    wynik2.push(...korzen.querySelectorAll(szukaj));
    for (const e of korzen.querySelectorAll("*")) if (e.shadowRoot) wszystkie(e.shadowRoot, szukaj, wynik2, n + 1);
    return wynik2;
  }
  var glebiej = (korzen, szukaj) => wszystkie(korzen, szukaj)[0] || null;
  var odkoduj = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));
  var zakoduj = (txt) => btoa(String.fromCharCode(...new TextEncoder().encode(txt)));
  function svgZ(img) {
    try {
      const src = img.getAttribute("src") || "";
      return src.startsWith(PREFIKS) ? odkoduj(src.slice(PREFIKS.length)) : "";
    } catch (e) {
      return "";
    }
  }
  function danePaska(svg4) {
    const m = /data-motor-ha-kroki="([^"]*)"[^>]*data-krok="(\d+)"[^>]*data-aktywny="(\d+)"/.exec(svg4);
    if (!m) return null;
    let podglad = null;
    const p = /data-podglad="([^"]*)"/.exec(svg4);
    if (p) try {
      podglad = JSON.parse(odkoduj(p[1]));
    } catch (e) {
    }
    return { kroki: m[1].split(","), krok: +m[2], aktywny: +m[3], podglad };
  }
  function daneGalerii(svg4) {
    const a = (n) => (new RegExp(`${n}="([^"]*)"`).exec(svg4) || [])[1];
    const pole = a("data-motor-ha-wybor");
    return pole ? { pole, opcje: (a("data-opcje") || "").split(","), kol: +a("data-kol") || 4 } : null;
  }
  function ustaw(form, zmiany) {
    form._stepData = { ...form._stepData || {}, ...zmiany };
    form.requestUpdate?.();
  }
  async function idz(form, krok) {
    ustaw(form, { idz_do: krok });
    if (typeof form._submitStep === "function") await form._submitStep();
  }
  var hex2 = (v) => Array.isArray(v) && v.length === 3 ? "#" + v.map((x) => Math.max(0, Math.min(255, +x || 0)).toString(16).padStart(2, "0")).join("") : null;
  function wygladPodgladu(podglad, odpowiedzi) {
    const c = { ...podglad || {} };
    for (const k of WYGLAD) if (odpowiedzi && odpowiedzi[k] !== void 0 && odpowiedzi[k] !== null && odpowiedzi[k] !== "") c[k] = odpowiedzi[k];
    const kw = hex2(c.kolor_wlasny), rw = hex2(c.rama_wlasna);
    delete c.kolor_wlasny;
    delete c.rama_wlasna;
    if (kw) c.kolor = kw;
    if (rw) c.rama = rw;
    return c;
  }
  function pasek(form, img) {
    const d = danePaska(svgZ(img));
    if (!d) return null;
    img.setAttribute(ZNAK, "");
    const klik = (el2) => (e) => {
      const r = el2.getBoundingClientRect();
      if (!r.width) return;
      const i = Math.floor((e.clientX - r.left) / r.width * d.kroki.length);
      const k = d.kroki[Math.max(0, Math.min(d.kroki.length - 1, i))];
      if (k && i !== d.aktywny) idz(form, k);
    };
    let el = img, nad = img.parentElement;
    while (nad && nad.tagName !== "HA-MARKDOWN-ELEMENT" && nad.tagName !== "HA-MARKDOWN") {
      el = nad;
      nad = nad.parentElement;
    }
    const md = img.getRootNode()?.host?.closest?.("ha-markdown") || img.closest("ha-markdown") || el;
    const blok = md.tagName === "HA-MARKDOWN" ? md : el;
    if (!blok.parentNode) {
      img.style.cursor = "pointer";
      img.addEventListener("click", klik(img));
      return d;
    }
    blok.parentNode.querySelectorAll(`[${ZNAK}="kopia"],[${PODGLAD}]`).forEach((x) => x.remove());
    const kopia2 = document.createElement("div");
    kopia2.setAttribute(ZNAK, "kopia");
    kopia2.style.cssText = "position:sticky;top:0;z-index:5;padding:4px 0;background:var(--mdc-theme-surface,var(--ha-dialog-surface-background,var(--card-background-color,#fff)))";
    const nowy = img.cloneNode(true);
    nowy.setAttribute(ZNAK, "");
    nowy.style.cssText = "display:block;max-width:100%;height:auto;margin:0 auto;cursor:pointer";
    nowy.addEventListener("click", klik(nowy));
    kopia2.appendChild(nowy);
    blok.parentNode.insertBefore(kopia2, blok);
    img.style.display = "none";
    if (d.podglad && customElements.get("motor-ha")) {
      const box = document.createElement("div");
      box.setAttribute(PODGLAD, "");
      box.style.cssText = "position:relative;z-index:0;isolation:isolate;max-width:170px;margin:4px auto 0;pointer-events:none";
      kopia2.appendChild(box);
      form.__motorHaPodglad = { box, podglad: d.podglad, klucz: "" };
    } else form.__motorHaPodglad = null;
    return d;
  }
  function galeria(form, img) {
    const svg4 = svgZ(img), d = daneGalerii(svg4);
    if (!d) return;
    img.setAttribute(GAL, "");
    img.setAttribute("src", PREFIKS + zakoduj(svg4.replace(/<rect data-on="1"[^>]*\/>/, "")));
    const opak = document.createElement("span");
    opak.style.cssText = "position:relative;display:inline-block;max-width:100%;line-height:0";
    img.parentNode.insertBefore(opak, img);
    opak.appendChild(img);
    img.style.cssText = "display:block;max-width:100%;height:auto;cursor:pointer";
    const ramka = document.createElement("span");
    ramka.style.cssText = `position:absolute;box-sizing:border-box;border:3px solid ${AKCENT};border-radius:10px;pointer-events:none;display:none;transition:left .15s,top .15s`;
    opak.appendChild(ramka);
    const wiersze = Math.ceil(d.opcje.length / d.kol);
    img.addEventListener("click", (e) => {
      const r = img.getBoundingClientRect();
      if (!r.width) return;
      const x = Math.floor((e.clientX - r.left) / r.width * d.kol), y = Math.floor((e.clientY - r.top) / r.height * wiersze);
      const k = d.opcje[y * d.kol + x];
      if (k) {
        ustaw(form, { [d.pole]: k });
        odswiez(form);
      }
    });
    (form.__motorHaGalerie || (form.__motorHaGalerie = [])).push({ ...d, img, ramka, wiersze });
  }
  function odswiez(form) {
    const dane = form._stepData || {};
    for (const g of form.__motorHaGalerie || []) {
      if (!g.img.isConnected) continue;
      const i = g.opcje.indexOf(dane[g.pole]);
      if (i < 0) {
        g.ramka.style.display = "none";
        continue;
      }
      const w = 100 / g.kol, h = 100 / g.wiersze;
      Object.assign(g.ramka.style, {
        display: "block",
        left: `calc(${i % g.kol * w}% + 2px)`,
        top: `calc(${Math.floor(i / g.kol) * h}% + 2px)`,
        width: `calc(${w}% - 4px)`,
        height: `calc(${h}% - 4px)`
      });
    }
    const p = form.__motorHaPodglad;
    if (!p || !p.box.isConnected) return;
    const ha = document.querySelector("home-assistant")?.hass;
    if (!ha) return;
    const c = wygladPodgladu(p.podglad, dane), klucz2 = JSON.stringify(c);
    if (klucz2 === p.klucz) return;
    p.klucz = klucz2;
    let k = p.box.firstElementChild;
    if (!k) {
      k = document.createElement("motor-ha");
      p.box.appendChild(k);
    }
    const brama = czyBrama(c.oslona);
    const teraz = (/* @__PURE__ */ new Date()).toISOString();
    const stan = {
      entity_id: ENCJA2,
      state: brama ? "closed" : "open",
      last_changed: teraz,
      last_updated: teraz,
      context: { id: "" },
      attributes: {
        current_position: brama ? 0 : 60,
        friendly_name: " ",
        supported_features: 15,
        ...brama ? { device_class: GARAZE.includes(c.oslona) ? "garage" : "gate" } : {}
      }
    };
    k.setConfig({
      type: "custom:motor-ha",
      entity: ENCJA2,
      name: " ",
      ...c,
      przyciski: false,
      suwak: !!c.osobno,
      _podglad: { pogoda: "sunny", pora: "dzien" }
    });
    k.hass = { ...ha, states: { ...ha.states, [ENCJA2]: stan }, callService: () => Promise.resolve(), callWS: () => Promise.resolve(null) };
  }
  var GRAFICZNE = /* @__PURE__ */ new Set();
  function czyMotorHa(okno3, form) {
    const p = okno3._params || {}, k = okno3._step || {};
    return k.handler === "motor_ha" || p.domain === "motor_ha" || p.manifest?.domain === "motor_ha" || !!(form && wszystkie(form.shadowRoot, `img[${ZNAK}],img[src^="${PREFIKS}"]`).some((i) => i.hasAttribute(ZNAK) || danePaska(svgZ(i))));
  }
  function graficzny(okno3, form) {
    const krok = okno3._step;
    if (!krok?.flow_id || krok.type !== "form" || GRAFICZNE.has(krok.flow_id) || !customElements.get("motor-ha-kreator")) return;
    if (!czyMotorHa(okno3, form)) return;
    const ha = document.querySelector("home-assistant");
    if (!ha?.hass) return;
    GRAFICZNE.add(krok.flow_id);
    const dlg = document.createElement("dialog");
    dlg.setAttribute("data-motor-ha-kreator", "");
    dlg.style.cssText = "padding:0;border:0;margin:auto;width:min(100vw,430px);height:min(100dvh,880px);max-width:100vw;max-height:100dvh;border-radius:var(--ha-dialog-border-radius,28px);overflow:hidden;background:var(--card-background-color,#fff)";
    if (innerWidth < 600) Object.assign(dlg.style, { width: "100vw", height: "100dvh", borderRadius: "0" });
    else if (innerWidth >= 900) Object.assign(dlg.style, { width: "min(96vw,1400px)", height: "min(94dvh,1000px)" });
    const tlo4 = document.createElement("style");
    tlo4.textContent = "dialog[data-motor-ha-kreator]::backdrop{background:rgba(0,0,0,.45)}";
    dlg.appendChild(tlo4);
    const k = document.createElement("motor-ha-kreator");
    dlg.appendChild(k);
    document.body.appendChild(dlg);
    let zegar = null;
    const sprzatnij = () => {
      clearInterval(zegar);
      if (dlg.open) dlg.close();
      dlg.remove();
    };
    const zamknij = () => {
      sprzatnij();
      okno3.closeDialog?.();
    };
    dlg.addEventListener("cancel", (e) => {
      e.preventDefault();
      zamknij();
    });
    const wyslij = (dane) => {
      const f = glebiej(okno3.shadowRoot, "step-flow-form");
      sprzatnij();
      if (!f) return;
      ustaw(f, { kreator: JSON.stringify(dane) });
      if (typeof f._submitStep === "function") f._submitStep();
    };
    const opcje = krok.handler !== "motor_ha";
    dlg.showModal();
    k.start({ hass: ha.hass, flow_id: krok.flow_id, entry_id: opcje ? krok.handler : null, krok: Z_KLASYCZNEGO[krok.step_id], wyslij, zamknij }).then(() => {
      zegar = setInterval(() => {
        if (!okno3._params || !okno3.isConnected) return sprzatnij();
        if (ha.hass !== k._hass) k.hass = ha.hass;
      }, 400);
    }).catch((e) => {
      console.warn("Motor HA: kreator graficzny niedostępny, zostaje klasyczny", e);
      sprzatnij();
    });
  }
  function pilnujKreatora() {
    const okno3 = document.querySelector("home-assistant")?.shadowRoot?.querySelector("dialog-data-entry-flow");
    if (!okno3?._params) return;
    const form = glebiej(okno3.shadowRoot, "step-flow-form");
    if (!form) return;
    try {
      graficzny(okno3, form);
    } catch (e) {
    }
    const img = glebiej(form.shadowRoot, `img[src^="${PREFIKS}"]:not([${ZNAK}]):not([${GAL}])`);
    if (img && danePaska(svgZ(img))) {
      form.__motorHaGalerie = [];
      pasek(form, img);
    }
    for (const g of wszystkie(form.shadowRoot, `img[src^="${PREFIKS}"]:not([${ZNAK}]):not([${GAL}])`)) galeria(form, g);
    if (!form.__motorHaSluch) {
      form.__motorHaSluch = true;
      form.addEventListener("value-changed", () => requestAnimationFrame(() => {
        try {
          odswiez(form);
        } catch (e) {
        }
      }));
    }
    odswiez(form);
  }

  // src/strona.js
  var WZOR = /^\/config\/devices\/device\/([^/?#]+)/;
  var ZNAK2 = "data-motor-ha";
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
    const okno3 = encje.find((e) => e.device_id === id && e.entity_id.startsWith("cover."));
    if (okno3) return [{ kolumna: 0, cel: { entity: okno3.entity_id, urzadzenie: id, wpis } }];
    const okna = encje.filter((e) => e.entity_id.startsWith("cover.") && h.states[e.entity_id]).sort((a, b) => String(h.states[a.entity_id].attributes.friendly_name).localeCompare(String(h.states[b.entity_id].attributes.friendly_name)));
    return [
      { kolumna: 0, cel: { dom: true } },
      ...okna.map((e, i) => ({ kolumna: 1 + i % 2, cel: { entity: e.entity_id, urzadzenie: e.device_id, wpis: h.devices[e.device_id]?.config_entries?.[0] } }))
    ];
  }
  var zgloszone = "";
  var od = 0;
  var powod = "";
  var BEZ_STRONY = "brak strony urządzenia";
  function zglos(id) {
    const h = document.querySelector("home-assistant")?.hass;
    if (zgloszone === id || !powod || Date.now() - od < 15e3 || !h?.callService) return;
    if (document.hidden || powod === BEZ_STRONY) return;
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
    if (!m || document.hidden) {
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
      powod = BEZ_STRONY;
      return;
    }
    const kolumny = [...r.querySelectorAll("div.column")];
    if (!kolumny.length) {
      powod = "brak kolumn";
      return;
    }
    const nasze = [...r.querySelectorAll(`[${ZNAK2}]`)];
    const lista = cele(h, m[1]);
    powod = lista ? "" : `brak encji Motor HA przy urządzeniu (encje: ${Object.keys(h.entities || {}).length})`;
    const klucz2 = lista ? m[1] + "|" + kolumny.length + "|" + lista.map((x) => x.cel.entity || "dom").join() : "";
    if (nasze.length && nasze[0].getAttribute(ZNAK2) !== klucz2) {
      nasze.forEach((e) => e.remove());
      nasze.length = 0;
    }
    if (!lista) return;
    if (!nasze.length) {
      const ile = {};
      for (const { kolumna, cel } of lista) {
        const nr2 = Math.min(kolumna, kolumny.length - 1), k = kolumny[nr2], i = ile[nr2] || 0;
        const e = document.createElement("motor-ha-urzadzenie");
        e.setAttribute(ZNAK2, klucz2);
        e.cel = cel;
        e.hass = h;
        k.insertBefore(e, k.children[i] || null);
        ile[nr2] = i + 1;
        nasze.push(e);
      }
    }
    for (const e of nasze) if (e.hass !== h) e.hass = h;
    if (!nasze[0]?.getBoundingClientRect().height) powod = "karta wstawiona, ale pusta";
  }
  function strony(rejestruj2) {
    setInterval(() => {
      try {
        pilnujKreatora();
      } catch (e) {
      }
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
  var MotorHaStart = class extends HTMLElement {
    connectedCallback() {
      history.replaceState(null, "", "/config/integrations/dashboard/add?domain=motor_ha");
      window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: true } }));
    }
  };
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
    ["motor-ha-kreator", MotorHaKreator],
    // kreator graficzny nad okienkiem HA (kreator.js)
    ["motor-ha-start", MotorHaStart],
    // ukryta strona /motor-ha-start (pierwsze urządzenie po instalacji)
    ["roleta-realistyczna", class extends MotorHaKarta {
    }],
    ["roleta-realistyczna-editor", class extends MotorHaEdytor {
    }]
  ];
  var rejestruj = (kopia2) => {
    for (const [nazwa2, klasa] of ELEMENTY) {
      if (customElements.get(nazwa2)) continue;
      try {
        customElements.define(nazwa2, kopia2 ? class extends klasa {
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
  window.__motorHaDziala ?? (window.__motorHaDziala = WERSJA);
  if (window.__motorHaDziala !== WERSJA) {
    let juz = null;
    try {
      juz = sessionStorage.getItem("motorHaPrzeladowanie");
      sessionStorage.setItem("motorHaPrzeladowanie", WERSJA);
    } catch (e) {
    }
    if (juz !== WERSJA) location.reload();
  }
  window.__motorHa = { wersja: WERSJA, grupy: GRUPY, ikony: IKONY, kolory: KOLORY, kroki: KROKI, teksty: TEKSTY };
  console.info(`%c Motor HA %c ${WERSJA} `, "background:#009ac7;color:#fff;border-radius:3px 0 0 3px;padding:1px 4px", "background:#ff9800;color:#fff;border-radius:0 3px 3px 0;padding:1px 4px");
})();
