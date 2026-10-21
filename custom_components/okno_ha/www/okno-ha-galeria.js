// Motor HA: galeria w opisie w HACS – zamiast obrazków jedna żywa karta Motor HA na sekcję z udawaną roletą i przyciskami (scena, rodzaj osłony, wygląd).
// Działa w ramce opisu HACS; na GitHubie zostają obrazki. Kliknięcia nie ruszają żadnej prawdziwej rolety.
(() => {
  if (window.__oknoHaGaleria) return;
  window.__oknoHaGaleria = true;
  const gora = () => { try { return window.parent.document.querySelector("home-assistant")?.hass || document.querySelector("home-assistant")?.hass; } catch (e) { return null; } };
  // ramka opisu HACS nie zna ikon i kart HA – proste zamienniki w stylu HA (ikony mdi jako SVG)
  const IKONY = {"mdi:arrow-up":"M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z","mdi:arrow-down":"M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z","mdi:stop":"M18,18H6V6H18V18Z","mdi:roller-shade":"M20 19V3H4V19H2V21H22V19H20M6 19V13H11V14.8C10.6 15.1 10.2 15.6 10.2 16.2C10.2 17.2 11 18 12 18S13.8 17.2 13.8 16.2C13.8 15.6 13.5 15.1 13 14.8V13H18V19H6Z","mdi:roller-shade-closed":"M20 19V3H4V19H2V21H10.25C10.25 21.97 11.03 22.75 12 22.75S13.75 21.97 13.75 21H22V19H20M6 19V17H11V19H6M13 19V17H18V19H13Z","mdi:blinds":"M3,2H21A1,1 0 0,1 22,3V5A1,1 0 0,1 21,6H20V13A1,1 0 0,1 19,14H13V16.17C14.17,16.58 15,17.69 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.69 9.83,16.58 11,16.17V14H5A1,1 0 0,1 4,13V6H3A1,1 0 0,1 2,5V3A1,1 0 0,1 3,2M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z","mdi:curtains":"M23 3H1V1H23V3M2 22H6C6 19 4 17 4 17C10 13 11 4 11 4H2V22M22 4H13C13 4 14 13 20 17C20 17 18 19 18 22H22V4Z","mdi:blinds-horizontal":"M20 19V3H4V19H2V21H22V19H20M16 9H18V11H16V9M14 11H6V9H14V11M18 7H16V5H18V7M14 5V7H6V5H14M6 19V13H14V14.82C13.55 15.14 13.25 15.66 13.25 16.25C13.25 17.22 14.03 18 15 18S16.75 17.22 16.75 16.25C16.75 15.66 16.45 15.13 16 14.82V13H18V19H6Z","mdi:window-shutter":"M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9M8 12H16V14H8V12M8 15H16V17H8V15M8 18H16V20H8V18Z","mdi:window-shutter-open":"M3 4H21V8H19V20H17V8H7V20H5V8H3V4M8 9H16V11H8V9Z","mdi:blinds-horizontal-closed":"M20 19V3H4V19H2V21H13.25C13.25 21.97 14.03 22.75 15 22.75S16.75 21.97 16.75 21H22V19H20M18 11H16V9H18V11M14 11H6V9H14V11M14 13V15H6V13H14M16 13H18V15H16V13M18 7H16V5H18V7M14 5V7H6V5H14M6 19V17H14V19H6M16 19V17H18V19H16Z","mdi:awning-outline":"M5.06 7C4.63 7 4.22 7.14 3.84 7.42C3.46 7.7 3.24 8.06 3.14 8.5L2.11 12.91C1.86 14 2.06 14.92 2.69 15.73C2.81 15.85 2.93 15.97 3.04 16.07C3.63 16.64 4.28 17 5.22 17C6.16 17 6.91 16.59 7.47 16.05C8.1 16.67 8.86 17 9.8 17C10.64 17 11.44 16.63 12 16.07C12.68 16.7 13.45 17 14.3 17C15.17 17 15.91 16.67 16.54 16.05C17.11 16.62 17.86 17 18.81 17C19.76 17 20.43 16.65 21 16.06C21.09 15.97 21.18 15.87 21.28 15.77C21.94 14.95 22.14 14 21.89 12.91L20.86 8.5C20.73 8.06 20.5 7.7 20.13 7.42C19.77 7.14 19.38 7 18.94 7H5.06M18.89 8.97L19.97 13.38C20.06 13.81 19.97 14.2 19.69 14.55C19.44 14.86 19.13 15 18.75 15C18.44 15 18.17 14.9 17.95 14.66C17.73 14.43 17.61 14.16 17.58 13.84L16.97 9L18.89 8.97M5.06 9H7.03L6.42 13.84C6.3 14.63 5.91 15 5.25 15C4.84 15 4.53 14.86 4.31 14.55C4.03 14.2 3.94 13.81 4.03 13.38L5.06 9M9.05 9H11V13.7C11 14.05 10.89 14.35 10.64 14.62C10.39 14.88 10.08 15 9.7 15C9.36 15 9.07 14.88 8.84 14.59C8.61 14.3 8.5 14 8.5 13.66V13.5L9.05 9M13 9H14.95L15.5 13.5C15.58 13.92 15.5 14.27 15.21 14.57C14.95 14.87 14.61 15 14.2 15C13.89 15 13.61 14.88 13.36 14.62C13.11 14.35 13 14.05 13 13.7V9Z","mdi:chevron-double-up":"M7.41,18.41L6,17L12,11L18,17L16.59,18.41L12,13.83L7.41,18.41M7.41,12.41L6,11L12,5L18,11L16.59,12.41L12,7.83L7.41,12.41Z","mdi:chevron-double-down":"M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z"};
  if (!customElements.get("ha-icon")) {
    customElements.define("ha-icon", class extends HTMLElement {
      static get observedAttributes() { return ["icon"]; }
      connectedCallback() { this.rysuj(); }
      attributeChangedCallback() { this.rysuj(); }
      set icon(v) { this.setAttribute("icon", v); }
      get icon() { return this.getAttribute("icon"); }
      rysuj() {
        const d = IKONY[this.getAttribute("icon")] || "";
        this.style.display = "inline-flex";
        this.innerHTML = d ? `<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:currentColor;display:block"><path d="${d}"/></svg>` : "";
      }
    });
  }
  if (!customElements.get("ha-card")) {
    customElements.define("ha-card", class extends HTMLElement {
      connectedCallback() {
        Object.assign(this.style, { display: "block", background: "var(--ha-card-background,var(--card-background-color,#fff))",
          borderRadius: "var(--ha-card-border-radius,12px)", border: "var(--ha-card-border-width,1px) solid var(--ha-card-border-color,var(--divider-color,#e0e0e0))",
          boxShadow: "var(--ha-card-box-shadow,none)", color: "var(--primary-text-color)", position: "relative" });
      }
    });
  }
  // sceny – nazwa z pliku obrazka (img/auto/z3-stany-<jasne|ciemne>-<scena>.svg albo img/zywe/<scena>.svg)
  const SCENY = {
    dzien: { wx: "sunny", poz: 40 }, deszcz: { wx: "rainy", poz: 40, t: 12 }, snieg: { wx: "snowy", poz: 40, t: -2 },
    zwinieta: { wx: "sunny", poz: 100, t: 22 }, zachod: { wx: "partlycloudy", poz: 50, el: 3, t: 15 }, noc: { wx: "clear-night", poz: 80, el: -20, t: 8 },
    uchylone: { wx: "cloudy", poz: 100, l: "uchyl" }, otwarte: { wx: "sunny", poz: 100, p: "otworz" }, okno: { wx: "sunny", poz: 100, l: "uchyl", p: "otworz" },
  };
  const WZOR = /\/img\/(?:auto\/z3-stany-(?:jasne|ciemne)-|zywe\/)([a-z0-9_-]+)\.svg/;
  const scena = (nazwa) => {
    const s = Object.assign({ wx: "sunny", poz: 40, t: 16, el: 40 }, SCENY[nazwa] || {}), k = {};
    for (const cz of nazwa.split("_")) {
      const m = /^(oslona|kolor|rama|skrzydla)-(.+)$/.exec(cz);
      if (m) k[m[1]] = m[1] === "skrzydla" ? +m[2] : m[2];
      else if (SCENY[cz]) Object.assign(s, SCENY[cz]);
    }
    return { s, k };
  };
  let karta = null;
  const wczytaj = () => karta || (karta = customElements.get("okno-ha") ? Promise.resolve()
    : import(`/okno_ha/okno-ha.js?t=${Date.now()}`).then(() => customElements.whenDefined("okno-ha")));
  // v1.4.48: jedna duża żywa karta na sekcję (jak dawny symulator) + przyciski pod nią: scena z sekcji, rodzaj osłony, wygląd
  const WZOR_OSL = /\/img\/maski\/oslony\d*-[a-z]+\.svg/;
  const STYL = `.okno-ha-zywa{max-width:520px;margin:8px auto 4px;text-align:left}
.okno-ha-zywa .ow{margin-top:12px}
.okno-ha-zywa .ol{font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);color:var(--primary-text-color);margin:0 0 6px}
.okno-ha-zywa .og{font-size:var(--ha-font-size-s,12px);color:var(--secondary-text-color);margin:8px 0 4px}
.okno-ha-zywa .oc{display:flex;flex-wrap:wrap;gap:8px}
.okno-ha-zywa .oc button{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 12px;border-radius:var(--ha-border-radius-xl,16px);font-family:var(--ha-font-family-body,inherit);font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);cursor:pointer;
 color:var(--primary-text-color);background:transparent;border:1px solid var(--outline-color,var(--divider-color));transition:background-color .15s;-webkit-tap-highlight-color:transparent;outline:0}
.okno-ha-zywa .oc button:hover{background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}
.okno-ha-zywa .oc button:focus-visible{box-shadow:0 0 0 2px var(--secondary-text-color)}
.okno-ha-zywa .oc button.on{background:color-mix(in srgb,var(--primary-text-color) 15%,transparent);border-color:transparent}
.okno-ha-zywa .oc button ha-icon{--mdc-icon-size:18px;color:var(--primary-color,#009ac7)}
.okno-ha-zywa .sw{width:16px;height:16px;border-radius:50%;box-shadow:0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}`;
  const zbuduj = (grupa, sceny, start) => {
    const h = gora();
    if (!h) return;
    const D = window.__oknoHaDane, L = D?.teksty(h.locale?.language || h.language || "pl");
    const rk = grupa.getRootNode(), cel = rk.head || rk;
    if (cel && !cel.querySelector?.(":scope > style.okno-ha-zywa-styl")) {
      const st = document.createElement("style"); st.className = "okno-ha-zywa-styl"; st.textContent = STYL; cel.appendChild(st);
    }
    const pole = document.createElement("div");
    pole.className = "okno-ha-zywa";
    const el = document.createElement("okno-ha");
    let wyb = 0, wyg = Object.assign({}, start), poz = 0, cel2 = 0, ruch = null, s = null, cfg = null;
    const stan = () => {
      const st = cel2 > poz ? "opening" : cel2 < poz ? "closing" : poz <= 0 ? "closed" : "open", teraz = new Date().toISOString();
      const enc = (id, state, attributes) => ({ entity_id: id, state, attributes, last_changed: teraz, last_updated: teraz, context: { id: "" } });
      const g = gora() || h, st2 = Object.assign({}, g.states, {
        "cover.podglad": enc("cover.podglad", st, { current_position: Math.round(poz), friendly_name: cfg.name, supported_features: 15 }),
        "weather.podglad": enc("weather.podglad", s.wx, { temperature: s.t, temperature_unit: "°C", friendly_name: "Pogoda" }),
        "sun.sun": enc("sun.sun", s.el < 0 ? "below_horizon" : "above_horizon", { elevation: s.el }),
        "binary_sensor.podglad_l": enc("binary_sensor.podglad_l", s.l ? "on" : "off", {}),
        "binary_sensor.podglad_p": enc("binary_sensor.podglad_p", s.p ? "on" : "off", {}),
      });
      return Object.assign({}, g, { states: st2, callService: (dom, usl, dane) => {
        cel2 = usl === "open_cover" ? 100 : usl === "close_cover" ? 0 : usl === "stop_cover" ? poz : Math.max(0, Math.min(100, +(dane?.position ?? poz)));
        clearInterval(ruch);
        ruch = setInterval(() => {   // jak prawdziwy silnik: meldunek co pół sekundy, 10 s na cały przejazd
          poz = cel2 > poz ? Math.min(cel2, poz + 5) : Math.max(cel2, poz - 5);
          if (poz === cel2) clearInterval(ruch);
          el.hass = stan();
        }, 500);
        el.hass = stan();
        return Promise.resolve();
      } });
    };
    const pokaz = (nowaScena) => {
      const sc = scena(sceny[wyb].nazwa);
      s = sc.s;
      if (nowaScena) { clearInterval(ruch); poz = cel2 = s.poz; }
      const k = Object.assign({}, sc.k, wyg);
      const nazwa = sceny.length > 1 || !L ? sceny[wyb].podpis : (L.nazwa(k.oslona) || sceny[wyb].podpis);
      cfg = Object.assign({ type: "custom:okno-ha", entity: "cover.podglad", name: String(nazwa || "Motor HA").replace(/^[^\p{L}]+/u, ""), pogoda: "weather.podglad", zrodlo: "auto", czas: 10, auto_czujniki: false }, k);
      if (s.l) Object.assign(cfg, { czujnik_lewe: "binary_sensor.podglad_l", tryb_lewe: s.l });
      if (s.p) Object.assign(cfg, { czujnik_prawe: "binary_sensor.podglad_p", tryb_prawe: s.p });
      el.setConfig(cfg);
      el.hass = stan();
      pole.querySelectorAll("[data-sc]").forEach((b) => b.classList.toggle("on", +b.dataset.sc === wyb));
      pole.querySelectorAll("[data-os]").forEach((b) => b.classList.toggle("on", b.dataset.os === (cfg.oslona || "zebra")));
      pole.querySelectorAll("[data-pr]").forEach((b) => { const p = D.presety[+b.dataset.pr]; b.classList.toggle("on", p.rama === cfg.rama && p.kolor === cfg.kolor); });
    };
    pole.appendChild(el);
    const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const rzad = (tytul, html) => { const d = document.createElement("div"); d.className = "ow"; d.innerHTML = (tytul ? `<div class="ol">${esc(tytul)}</div>` : "") + html; pole.appendChild(d); return d; };
    if (sceny.length > 1) rzad("", `<div class="oc">${sceny.map((x, i) => `<button data-sc="${i}">${esc(x.podpis)}</button>`).join("")}</div>`)
      .querySelectorAll("[data-sc]").forEach((b) => b.onclick = () => { wyb = +b.dataset.sc; pokaz(true); });
    if (D && L) {
      rzad(L.osl, Object.entries(D.podgrupy).map(([g, pod]) => `<div class="og">${esc(g === "wew" ? L.osw : L.osz)}</div><div class="oc">${Object.values(pod).flat()
        .map((t) => `<button data-os="${t}"><ha-icon icon="${D.ikony[t]}"></ha-icon>${esc(L.nazwa(t))}</button>`).join("")}</div>`).join(""))
        .querySelectorAll("[data-os]").forEach((b) => b.onclick = () => { wyg.oslona = b.dataset.os; pokaz(false); });
      rzad("", `<div class="oc">${D.presety.map((p, i) => `<button data-pr="${i}"><span class="sw" style="background:linear-gradient(135deg,${p.rama} 50%,${p.hex} 50%)"></span>${esc(L.pre[i])}</button>`).join("")}</div>`)
        .querySelectorAll("[data-pr]").forEach((b) => b.onclick = () => { const p = D.presety[+b.dataset.pr]; Object.assign(wyg, { rama: p.rama, kolor: p.kolor, siatka: p.siatka || "" }); pokaz(false); });
    }
    pokaz(true);
    grupa.replaceWith(pole);
  };
  const przejdz = (korzen) => {
    for (const e of korzen.querySelectorAll("*")) {
      if (e.tagName === "IMG") {
        const src = e.dataset.oknoOrg || e.getAttribute("src") || "", m = WZOR.exec(src), osl = !m && WZOR_OSL.test(src);
        if (!(m || osl) || !e.isConnected) continue;
        const grupa = (m && e.closest("table")) || e.closest("p") || e.closest("a") || e;
        if (grupa.__oknoHa) continue;
        grupa.__oknoHa = true;
        const sceny = osl ? [{ nazwa: "dzien", podpis: "" }] : [...grupa.querySelectorAll("img")].map((i) => {
          const n = WZOR.exec(i.dataset.oknoOrg || i.getAttribute("src") || "");
          return n && { nazwa: n[1], podpis: (i.closest("td")?.querySelector("b")?.textContent || "").trim() };
        }).filter(Boolean);
        wczytaj().then(() => { if (grupa.isConnected) zbuduj(grupa, sceny, osl ? { oslona: "natynkowa" } : {}); }).catch(() => { grupa.__oknoHa = false; });
      } else if (e.shadowRoot) przejdz(e.shadowRoot);
    }
  };
  const naHacs = () => { try { return /^\/hacs\//.test(window.parent.location.pathname); } catch (e) { return false; } };
  const skanuj = () => { if (!naHacs()) return; try { przejdz(document); } catch (e) { /* opis w trakcie rysowania */ } };
  skanuj();
  setInterval(skanuj, 1500);
})();
