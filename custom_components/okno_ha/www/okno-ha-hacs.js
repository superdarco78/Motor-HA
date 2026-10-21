// Okno HA: lista HACS i okienko „Update” szukają ikony okno_ha tylko na brands.home-assistant.io.
// Tutaj przeglądarka dostaje zamiast tego logo z samej integracji. Dotyczy wyłącznie adresów z okno_ha.
(() => {
  if (window.__oknoHaHacs2) return;   // skrypt wczytany drugi raz (np. po restarcie HA) – działa już pierwszy
  window.__oknoHaHacs2 = true;
  const WZOR = /https:\/\/brands\.home-assistant\.io\/(?:_\/|marketplace\/)?okno_ha\/[a-z_@0-9]+\.png/g;
  const LOGO = "/okno_ha/ikona.png";
  const zamien = (v) => (typeof v === "string" && v.includes("okno_ha") ? v.replace(WZOR, LOGO) : v);

  const popraw = (w) => {
    if (!w || w.__oknoHaIkona) return;
    try {
      w.__oknoHaIkona = true;
      const img = w.HTMLImageElement.prototype;
      const src = Object.getOwnPropertyDescriptor(img, "src");
      Object.defineProperty(img, "src", { ...src, set(v) { src.set.call(this, zamien(v)); } });
      const ustaw = w.Element.prototype.setAttribute;
      w.Element.prototype.setAttribute = function (n, v) {
        return ustaw.call(this, n, (n === "src" || n === "style") ? zamien(v) : v);
      };
      // okienko „Update” i lista Aktualizacji: obrazek encji rysuje state-badge
      w.customElements.whenDefined("state-badge").then(() => {
        const k = w.customElements.get("state-badge").prototype;
        if (typeof k._resolveImageUrl === "function" && !k.__oknoHa) {
          const stara = k._resolveImageUrl;
          k._resolveImageUrl = function (...a) { return zamien(stara.apply(this, a)); };
          k.__oknoHa = true;
        }
      });
      // panel HACS bywa w ramce (iframe) – popraw też jej okno
      const ramka = Object.getOwnPropertyDescriptor(w.HTMLIFrameElement.prototype, "contentWindow");
      Object.defineProperty(w.HTMLIFrameElement.prototype, "contentWindow", {
        ...ramka, get() { const o = ramka.get.call(this); try { if (o && o.location.origin === w.location.origin) popraw(o); } catch (e) { /* inna domena */ } return o; },
      });
    } catch (e) {
      console.warn("Okno HA: nie podmieniłem ikony w HACS", e);
    }
  };

  // jeden obrazek: adres z brands → logo; logo, które nie wczytało się w czasie restartu HA → wczytaj jeszcze raz
  const obrazek = (el) => {
    const a = el.getAttribute("src") || "";
    if (!a.includes("okno_ha")) return;
    const nowy = zamien(a);
    if (nowy !== a) el.setAttribute("src", nowy);
    else if (a.startsWith(LOGO) && el.complete && !el.naturalWidth && !el.__oknoHaPonow) {
      el.__oknoHaPonow = true;
      setTimeout(() => { el.__oknoHaPonow = false; el.setAttribute("src", `${LOGO}?r=${Date.now()}`); }, 1500);
    }
  };
  // obrazki Okna HA (opis w HACS, kreator integracji) w kolorze motywu: niebieski HA → --primary-color użytkownika
  const NASZE = /^https:\/\/raw\.githubusercontent\.com\/superdarco78\/(okno-ha-integracja|roleta-realistyczna)\//;
  const POMIN = /icon|ikona|logo|baner|banner|avatar|\.webp|\/po-[a-z]+\.svg|\/(pl|en|de|fr|cs)\.png/i;
  const hsv = (r, g, b) => {
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let h = 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [(h * 60 + 360) % 360, mx ? d / mx : 0, mx / 255];
  };
  const PROBNIK = document.createElement("canvas").getContext("2d");
  const kolorMotywu = (el) => {
    const v = (el.ownerDocument.defaultView || window).getComputedStyle(el).getPropertyValue("--primary-color").trim();
    if (!v) return null;
    PROBNIK.fillStyle = "#000"; PROBNIK.fillStyle = v;
    const m = /^#([0-9a-f]{6})$/i.exec(PROBNIK.fillStyle);
    return m ? "#" + m[1].toLowerCase() : null;
  };
  const gotowe = new Map();   // adres + kolor → przemalowany obrazek
  const przemalujPlik = (adres, kol) => {
    const klucz = adres + kol;
    if (!gotowe.has(klucz)) gotowe.set(klucz, new Promise((ok, zle) => {
      const i = new Image();
      i.crossOrigin = "anonymous";
      i.onload = () => {
        const skala = /\.svg/i.test(adres) ? 2 : 1, c = document.createElement("canvas");
        c.width = i.naturalWidth * skala; c.height = i.naturalHeight * skala;
        const x = c.getContext("2d"); x.drawImage(i, 0, 0, c.width, c.height);
        const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
        // piksel = a·niebieski HA + w·biały/szary (wygładzanie, jasne tła, ciemny motyw) → a·kolor motywu + w
        // dwa niebieskie HA: obecny domyślny #009ac7 i dawny #03a9f4 (starsze obrazki)
        const K = [1, 3, 5].map((k) => parseInt(kol.slice(k, k + 2), 16));
        const baza = (B) => { const bb = B[0] * B[0] + B[1] * B[1] + B[2] * B[2], b1 = B[0] + B[1] + B[2]; return { B, bb, b1, wyz: bb * 3 - b1 * b1 }; };
        const NOWY = baza([0, 154, 199]), DAWNY = baza([3, 169, 244]);
        for (let k = 0; k < p.length; k += 4) {
          if (!p[k + 3]) continue;
          const [h, s, v] = hsv(p[k], p[k + 1], p[k + 2]);
          if (h < 188 || h > 205 || s < 0.05 || v < 0.15) continue;   // tylko odcienie niebieskiego HA i ich jasne tła
          const { B, bb, b1, wyz } = h < 196.5 ? NOWY : DAWNY;
          const bp = B[0] * p[k] + B[1] * p[k + 1] + B[2] * p[k + 2], sp = p[k] + p[k + 1] + p[k + 2];
          const a = (3 * bp - b1 * sp) / wyz, w = (bb * sp - b1 * bp) / wyz;
          for (let c = 0; c < 3; c++) p[k + c] = Math.max(0, Math.min(255, Math.round(a * K[c] + w)));
        }
        x.putImageData(d, 0, 0);
        c.toBlob((b) => (b ? ok(URL.createObjectURL(b)) : zle()));
      };
      i.onerror = zle;
      i.src = adres;
    }));
    return gotowe.get(klucz);
  };
  const przemaluj = (el) => {
    const org = el.dataset.oknoOrg || el.getAttribute("src") || "";
    if (!NASZE.test(org) || POMIN.test(org)) return;
    const kol = kolorMotywu(el);
    if (!kol) return;
    if (el.dataset.oknoKol === kol) return;
    el.dataset.oknoKol = kol; el.dataset.oknoOrg = org;
    przemalujPlik(org, kol).then((u) => { if (el.dataset.oknoKol === kol) el.setAttribute("src", u); }, () => {});
  };

  // obrazki już narysowane (np. panel HACS otwarty, zanim ten skrypt się wczytał, albo ramka HACS wczytana od nowa po restarcie)
  const przejdz = (korzen, ile = { n: 0 }) => {
    for (const el of korzen.querySelectorAll("*")) {
      if (++ile.n > 200000) return;
      try {
        if (el.tagName === "IMG") { obrazek(el); przemaluj(el); }
        else if (el.tagName === "IFRAME") {
          if (!el.__oknoHaRamka) {   // ramka HACS przeładowana (np. po restarcie) – popraw od razu po wczytaniu
            el.__oknoHaRamka = true;
            el.addEventListener("load", () => seria());
          }
          const w = el.contentWindow;
          if (w && w.location.origin === location.origin && w.document.documentElement) { popraw(w); przejdz(w.document, ile); }
        }
        if (el.shadowRoot) przejdz(el.shadowRoot, ile);
      } catch (e) { /* inna domena albo ramka w trakcie wczytywania */ }
    }
  };
  const naHacs = () => /^\/(hacs|config)/.test(location.pathname);   // HACS i okna konfiguracji (kreator integracji)
  const skanuj = () => { if (naHacs()) przejdz(document); };
  // po restarcie HA i ponownym połączeniu: kilka prób, aż HACS i Okno HA wstaną
  let serie = [];
  const seria = () => {
    serie.forEach(clearTimeout);
    serie = [0, 300, 1000, 2500, 5000, 10000, 20000, 40000].map((t) => setTimeout(skanuj, t));
  };
  popraw(window);
  // tylko w HACS i w Ustawieniach: co 2 s poprawia obrazki (ikona, kolor motywu)
  setInterval(skanuj, 2000);
  window.addEventListener("connection-status", seria);   // HA zgłasza „connected” po restarcie
  window.addEventListener("location-changed", seria);    // przejście do HACS w panelu
  document.addEventListener("visibilitychange", () => { if (!document.hidden) seria(); });
  seria();
})();
