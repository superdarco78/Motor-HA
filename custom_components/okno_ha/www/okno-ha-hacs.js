// Motor HA: lista HACS i okienko „Update” szukają ikony okno_ha tylko na brands.home-assistant.io.
// Tutaj przeglądarka dostaje zamiast tego logo z samej integracji. Dotyczy wyłącznie adresów z okno_ha.
(() => {
  // skrypt wczytany drugi raz działa tylko, gdy to nowa wersja integracji – wtedy przejmuje pracę po starym
  const JA = {};
  if (window.__oknoHaHacs3 && !window.__oknoHaNowy) return;
  const poAktualizacji = !!window.__oknoHaNowy;   // wczytany przez stary skrypt po aktualizacji Motoru HA
  window.__oknoHaHacs2 = true; window.__oknoHaHacs3 = JA; window.__oknoHaNowy = false;
  const zywy = () => window.__oknoHaHacs3 === JA;
  const WZOR = /https:\/\/brands\.home-assistant\.io\/(?:_\/|marketplace\/)?okno_ha\/[a-z_@0-9]+\.png/g;
  const LOGO = "/okno_ha/ikona.png";
  const zamien = (v) => (typeof v === "string" && v.includes("okno_ha") ? v.replace(WZOR, LOGO) : v);

  const popraw = (w) => {
    if (!w || w.__oknoHaIkona) return;
    try {
      w.__oknoHaIkona = true;
      const img = w.HTMLImageElement.prototype;
      const src = Object.getOwnPropertyDescriptor(img, "src");
      Object.defineProperty(img, "src", { ...src, set(v) { src.set.call(this, zPamieci(this, zamien(v))); } });
      const ustaw = w.Element.prototype.setAttribute;
      w.Element.prototype.setAttribute = function (n, v) {
        return ustaw.call(this, n, n === "src" ? (this.tagName === "IMG" ? zPamieci(this, zamien(v)) : zamien(v)) : n === "style" ? zamien(v) : v);
      };
      // obrazki z opisu w domyślnych kolorach są niewidoczne, aż pojawią się w Twoich (bez mignięcia) – także w cieniu komponentów
      const arkusz = new w.CSSStyleSheet();
      arkusz.replaceSync(UKRYJ);
      w.document.adoptedStyleSheets = [...w.document.adoptedStyleSheets, arkusz];
      const arkusze = Object.getOwnPropertyDescriptor(w.ShadowRoot.prototype, "adoptedStyleSheets");
      Object.defineProperty(w.ShadowRoot.prototype, "adoptedStyleSheets", {
        ...arkusze, set(v) { arkusze.set.call(this, v.includes(arkusz) ? v : [...v, arkusz]); },
      });
      const cien = w.Element.prototype.attachShadow;
      w.Element.prototype.attachShadow = function (...a) { const r = cien.apply(this, a); try { r.adoptedStyleSheets = []; } catch (e) { /* stara przeglądarka */ } return r; };
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
      console.warn("Motor HA: nie podmieniłem ikony w HACS", e);
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
  // obrazki Motoru HA (opis w HACS, kreator integracji) w kolorze motywu: niebieski HA → --primary-color użytkownika
  const UKRYJ = ["okno-ha-integracja", "roleta-realistyczna"].map((r) => `img[src^="https://raw.githubusercontent.com/superdarco78/${r}/"]`
    + ["icon.png", "ikona.png", "logo", "baner-", "banner", "avatar", ".webp", "/pl.png", "/en.png", "/de.png", "/fr.png", "/cs.png"].map((x) => `:not([src*="${x}"])`).join("")).join(",")
    + "{visibility:hidden}";
  const NASZE = /^https:\/\/raw\.githubusercontent\.com\/superdarco78\/(okno-ha-integracja|roleta-realistyczna)\//;
  // obrazki opisu z zainstalowanej wersji (tag wydania), nie z main – opis w HA zmienia się dopiero po aktualizacji
  let PRZYPNIJ = null;
  const przypnij = (u) => (!PRZYPNIJ || typeof u !== "string" ? u
    : u.replace(/^(https:\/\/raw\.githubusercontent\.com\/superdarco78\/)(okno-ha-integracja|roleta-realistyczna)\/main\//,
      (m, p, r) => { const t = r === "okno-ha-integracja" ? PRZYPNIJ.integ : PRZYPNIJ.karta; return t ? `${p}${r}/${t}/` : m; }));
  const POMIN = /(icon|ikona|logo|baner|banner|avatar)[^/]*\.png|\.webp|\/(pl|en|de|fr|cs)\.png/i;   // SVG (także baner i logo) przemalowane – z maską dokładnie
  const hsv = (r, g, b) => {
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let h = 0;
    if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [(h * 60 + 360) % 360, mx ? d / mx : 0, mx / 255];
  };
  const PROBNIK = document.createElement("canvas").getContext("2d");
  const kolorMotywu = (el, zmienna = "--primary-color") => {
    const v = (el.ownerDocument.defaultView || window).getComputedStyle(el).getPropertyValue(zmienna).trim();
    if (!v) return null;
    PROBNIK.fillStyle = "#000"; PROBNIK.fillStyle = v;
    const m = /^#([0-9a-f]{6})$/i.exec(PROBNIK.fillStyle);
    return m ? "#" + m[1].toLowerCase() : null;
  };
  // obrazki bez maski: piksel = a·kolor HA + w·biały/szary (wygładzanie, jasne tła, ciemny motyw) → a·kolor użytkownika + w
  // niebieskie HA: #009ac7 (194°) i dawny #03a9f4 (199°, rysunki karty) oraz akcent #ff9800 (36°) – niebo (203°+), drewno, beże zostają
  const baza = (B) => { const bb = B[0] * B[0] + B[1] * B[1] + B[2] * B[2], b1 = B[0] + B[1] + B[2]; return { B, bb, b1, wyz: bb * 3 - b1 * b1 }; };
  const NOWY = baza([0, 154, 199]), DAWNY = baza([3, 169, 244]), POM = baza([255, 152, 0]);
  const rgbZ = (hex) => [1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16));
  const piksele = (p, K, A) => {
    for (let k = 0; k < p.length; k += 4) {
      if (!p[k + 3]) continue;
      const [h, s, v] = hsv(p[k], p[k + 1], p[k + 2]);
      const akcent = A && h >= 33 && h <= 38.5 && s >= 0.3 && v >= 0.3;   // zaznaczenia „gdzie kliknąć” w akcencie HA (#ff9800)
      if (!akcent && (h < 188 || h > 201 || s < 0.05 || v < 0.15)) continue;
      const { B, bb, b1, wyz } = akcent ? POM : h < 196.5 ? NOWY : DAWNY, C = akcent ? A : K;
      const bp = B[0] * p[k] + B[1] * p[k + 1] + B[2] * p[k + 2], sp = p[k] + p[k + 1] + p[k + 2];
      const a = (3 * bp - b1 * sp) / wyz, w = (bb * sp - b1 * bp) / wyz;
      if (akcent && a < 0.3) continue;   // blady beż o tej samej barwie to nie zaznaczenie
      for (let c = 0; c < 3; c++) p[k + c] = Math.max(0, Math.min(255, Math.round(a * C[c] + w)));
    }
  };
  // obrazki z maską (dokładnie): baza (kolory HA czarne) + R maski·kolor główny + G maski·akcent; zdjęcia i próbki mają maskę 0
  const zMaska = (b, m, K, A) => {
    const c = document.createElement("canvas"); c.width = b.naturalWidth; c.height = b.naturalHeight;
    const x = c.getContext("2d"); x.drawImage(b, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
    x.clearRect(0, 0, c.width, c.height); x.drawImage(m, 0, 0, c.width, c.height);
    const q = x.getImageData(0, 0, c.width, c.height).data, Z = A || [255, 152, 0];
    for (let k = 0; k < p.length; k += 4) {
      const r = q[k] / 255, g = q[k + 1] / 255;
      if (r || g) for (let j = 0; j < 3; j++) p[k + j] = Math.min(255, Math.round(p[k + j] + r * K[j] + g * Z[j]));
    }
    x.putImageData(d, 0, 0);
    return c.toDataURL("image/png");
  };
  const obrazSvg = (svg, klasa) => {   // <image class="…" … href="data:…"> → adres danych
    const m = new RegExp(`<image[^>]*class="${klasa}"[^>]*>`).exec(svg);
    const h = m && /href="(data:image\/png;base64,[^"]+)"/.exec(m[0]);
    return h ? h[1] : null;
  };
  // obrazek (PNG albo osadzony w SVG) → przemalowany canvas
  const wczytaj = (src) => new Promise((ok, zle) => { const i = new Image(); i.crossOrigin = "anonymous"; i.onload = () => ok(i); i.onerror = zle; i.src = src; });
  const plotno = (i, K, A) => {
    const c = document.createElement("canvas"); c.width = i.naturalWidth; c.height = i.naturalHeight;
    const x = c.getContext("2d"); x.drawImage(i, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height); piksele(d.data, K, A); x.putImageData(d, 0, 0);
    return c;
  };
  // przemalowane obrazki zostają w przeglądarce (IndexedDB) – po odświeżeniu strony od razu Twoje kolory, bez mignięcia domyślnych
  const BAZA = new Promise((ok) => {
    try {
      const r = indexedDB.open("okno-ha-kolory", 1);
      r.onupgradeneeded = () => r.result.createObjectStore("obrazki");
      r.onsuccess = () => ok(r.result); r.onerror = () => ok(null);
    } catch (e) { ok(null); }
  });
  const gotowe = new Map();   // adres + kolory → adres przemalowanego obrazka (blob:)
  const gotoweTeraz = new Map();   // to samo, już gotowe – do podmiany od ręki
  const pamiec = BAZA.then((db) => new Promise((ok) => {
    if (!db) return ok();
    try {
      const s = db.transaction("obrazki").objectStore("obrazki"), q = s.openCursor();
      q.onsuccess = () => { const c = q.result; if (!c) return ok(); const u = URL.createObjectURL(c.value); gotowe.set(c.key, Promise.resolve(u)); gotoweTeraz.set(c.key, u); c.continue(); };
      q.onerror = () => ok();
    } catch (e) { ok(); }
  }));
  const zapisz = (klucz, blob, kolory) => BAZA.then((db) => {
    if (!db) return;
    try {
      const s = db.transaction("obrazki", "readwrite").objectStore("obrazki");
      s.put(blob, klucz);
      // inne kolory niepotrzebne – zostaje tylko komplet dla obecnych kolorów
      const q = s.openCursor();
      q.onsuccess = () => { const c = q.result; if (!c) return; if (!String(c.key).endsWith(kolory)) c.delete(); c.continue(); };
    } catch (e) { /* bez pamięci – przemaluje przy następnym wejściu */ }
  });
  let ostatnie = "";   // ostatnie kolory (główny + akcent) – do natychmiastowej podmiany przy rysowaniu
  try { ostatnie = localStorage.getItem("okno-ha-kolory") || ""; } catch (e) { /* tryb prywatny */ }
  const akcentDla = (adres, akc) => (/\/(kolory|ramy|oslony)-/.test(adres) ? "" : akc);   // próbki kolorów i oklein bez akcentu
  // kolejka: kilka obrazków naraz, najpierw te na ekranie (np. zaraz po zmianie języka opisu)
  let wToku = 0; const czeka = [];
  const NARAZ = Math.min(6, Math.max(2, (navigator.hardwareConcurrency || 4) - 1));
  const kolejka = (f, waga) => new Promise((ok, zle) => {
    const start = () => {
      wToku++;
      f().then(ok, zle).finally(() => {
        wToku--;
        if (!czeka.length) return;
        let i = 0;
        czeka.forEach((z, k) => { if (z.waga() < czeka[i].waga()) i = k; });
        czeka.splice(i, 1)[0].start();
      });
    };
    if (wToku < NARAZ) start(); else czeka.push({ start, waga });
  });
  const policz = (adres, kol, akc, waga = () => 1e9) => kolejka(() => liczTeraz(adres, kol, akc), waga);
  const liczTeraz = (adres, kol, akc) => {
    const K = rgbZ(kol), A = akc ? rgbZ(akc) : null, ciemny = kol[7] === "d";
    return /\.svg/i.test(adres)
      // SVG zostaje SVG-iem: jasna i ciemna wersja dalej przełączają się z motywem, przemalowane są tylko obrazki w środku
      ? fetch(adres).then((r) => r.text()).then(async (svg) => {
        // wersja jasna albo ciemna według motywu HA (nie ustawień systemu) – tekst zawsze czytelny
        svg = svg.replace("</style>", ciemny ? ".l{display:none!important}.d{display:inline!important}</style>" : ".d{display:none!important}.l{display:inline!important}</style>");
        if (obrazSvg(svg, "lm") || obrazSvg(svg, "dm")) {
          // obrazek z maską: przelicz wariant l i d, bazy i maski usuń (mniejszy plik)
          for (const w of ["l", "d"]) {
            const b = obrazSvg(svg, w + "b"), m = obrazSvg(svg, w + "m"), n = obrazSvg(svg, w);
            if (b && m && n) { const nowy = zMaska(await wczytaj(b), await wczytaj(m), K, A); svg = svg.split(n).join(nowy); }
          }
          svg = svg.replace(/<image[^>]*class="[ld][bm]"[^>]*>(\s*<\/image>)?/g, "");
          return new Blob([svg], { type: "image/svg+xml" });
        }
        const czesci = svg.split(/(data:image\/png;base64,[A-Za-z0-9+/=]+)/);
        for (let k = 1; k < czesci.length; k += 2) czesci[k] = plotno(await wczytaj(czesci[k]), K, A).toDataURL("image/png");
        return new Blob([czesci.join("")], { type: "image/svg+xml" });
      })
      : wczytaj(adres).then((i) => new Promise((ok, zle) => plotno(i, K, A).toBlob((b) => (b ? ok(b) : zle()))));
  };
  const odswiezone = new Set();
  const przemalujPlik = (adres, kol, akcG, waga) => {
    const akc = akcentDla(adres, akcG), klucz = adres + "|" + kol + "|" + akcG, kolory = "|" + kol + "|" + akcG;
    if (gotowe.has(klucz)) {
      // z pamięci: od razu; w tle sprawdź raz, czy obrazek na GitHubie się nie zmienił
      if (!odswiezone.has(klucz)) {
        odswiezone.add(klucz);
        setTimeout(() => policz(adres, kol, akc).then((b) => zapisz(klucz, b, kolory)).catch(() => {}), 5000);
      }
      return gotowe.get(klucz);
    }
    odswiezone.add(klucz);
    const zadanie = policz(adres, kol, akc, waga).then((b) => { zapisz(klucz, b, kolory); const u = URL.createObjectURL(b); gotoweTeraz.set(klucz, u); return u; });
    gotowe.set(klucz, zadanie);
    zadanie.catch(() => gotowe.delete(klucz));   // nie wyszło (sieć, restart HA) – następne skanowanie spróbuje jeszcze raz
    return zadanie;
  };
  // motyw HA (nie ustawienia systemu): ciemne tło = ciemny motyw
  const ciemny = (el) => {
    const tlo = kolorMotywu(el, "--primary-background-color") || kolorMotywu(el, "--card-background-color");
    return tlo ? rgbZ(tlo).reduce((s, c, i) => s + c * [0.299, 0.587, 0.114][i], 0) < 128 : matchMedia("(prefers-color-scheme: dark)").matches;
  };
  // <picture> z jasną i ciemną wersją (np. animacja karty): wersja według motywu HA
  const zrodlo = (el) => {
    const s = el.getAttribute("srcset") || "", m = el.dataset.oknoMedia || el.getAttribute("media") || "";
    if (!NASZE.test(s) || !/prefers-color-scheme/.test(m)) return;
    el.dataset.oknoMedia = m;
    const nowe = /dark/.test(m) === ciemny(el) ? "all" : "not all";
    if (el.getAttribute("media") !== nowe) el.setAttribute("media", nowe);
  };
  // jasna i ciemna wersja obok siebie (#gh-light-mode-only / #gh-dark-mode-only, na GitHubie jedna z nich): w HA tylko ta z motywu HA
  const wariant = (el) => {
    const a = el.dataset.oknoOrg || el.getAttribute("src") || "";
    const m = /#gh-(light|dark)-mode-only/.exec(a);
    if (!m) return;
    const widac = (m[1] === "dark") === ciemny(el);
    if (el.style.display !== (widac ? "" : "none")) el.style.display = widac ? "" : "none";
  };
  const pokaz = (el) => el.style.setProperty("visibility", "visible", "important");   // gdy przemalowanie się nie uda – obrazek w domyślnych kolorach
  // plakietki shields.io w opisie Motoru HA: kolor z adresu → kolor główny (pomarańczowe/żółte → akcent)
  const AKCENTOWE = /^(ff9800|f9a825|orange|yellow)$/i;
  const plakietka = (el) => {
    const a = el.dataset.oknoPlak || el.getAttribute("src") || "";
    if (!a.startsWith("https://img.shields.io/")) return;
    const korzen = el.getRootNode();
    if (!a.includes("superdarco78") && !(korzen.querySelector && korzen.querySelector('img[data-okno-org],img[src*="raw.githubusercontent.com/superdarco78/"]'))) return;
    const glowny = kolorMotywu(el), akc = kolorMotywu(el, "--accent-color") || glowny;
    if (!glowny) return;
    const kolor = (stary) => (AKCENTOWE.test(stary) ? akc : glowny).slice(1);
    let u = new URL(a);
    if (u.searchParams.has("color")) u.searchParams.set("color", kolor(u.searchParams.get("color")));
    else if (/^\/badge\//.test(u.pathname)) u.pathname = u.pathname.replace(/-([^-/]+)$/, (_m, c) => "-" + kolor(c));
    else u.searchParams.set("color", glowny.slice(1));
    u.searchParams.set("style", "flat");   // w HA małe, zaokrąglone, zwykłe litery (na GitHubie zostają duże)
    const nowy = u.toString();
    el.dataset.oknoPlak = a;
    if (el.getAttribute("src") !== nowy) el.setAttribute("src", nowy);
  };
  // wygląd opisu w HA (v1.4.52): sam CSS w miejscu opisu – bez żadnych elementów HA, nic nie może zepsuć strony.
  // Spis treści jako kafelki równej wielkości, nagłówki i czcionki w rozmiarach HA, linki bez podkreśleń.
  const STYL_OPISU = `
.okno-spis{display:block!important;width:100%!important;border:0!important;margin:8px 0 16px!important}
.okno-spis>tbody{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr));grid-auto-rows:1fr;gap:8px}
.okno-spis tr{display:contents}
.okno-spis td{display:flex;width:auto!important;padding:0!important;border:0!important;background:none!important}
.okno-spis td h3{display:flex;margin:0!important;width:100%;font-size:inherit!important}
.okno-spis td a{display:flex;align-items:center;box-sizing:border-box;width:100%;min-height:56px;padding:12px 16px;border-radius:var(--ha-card-border-radius,12px);
 border:1px solid var(--divider-color);background:var(--ha-card-background,var(--card-background-color));color:var(--primary-text-color)!important;text-decoration:none!important;
 font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);line-height:var(--ha-line-height-condensed,1.3);transition:background-color .15s}
.okno-spis td a:hover{background:color-mix(in srgb,var(--primary-text-color) 6%,var(--ha-card-background,var(--card-background-color)))}
.okno-opis h1{font-size:var(--ha-font-size-2xl,24px)!important;font-weight:var(--ha-font-weight-normal,400);line-height:1.3}
.okno-opis h2{font-size:var(--ha-font-size-xl,20px)!important;font-weight:var(--ha-font-weight-medium,500);line-height:1.3}
.okno-opis h3{font-size:var(--ha-font-size-l,16px)!important;font-weight:var(--ha-font-weight-medium,500);line-height:1.4}
.okno-opis h1 a,.okno-opis h2 a,.okno-opis h3 a{color:inherit!important;text-decoration:none!important}
.okno-opis h1 sub,.okno-opis h2 sub,.okno-opis h3 sub{font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-normal,400);color:var(--secondary-text-color);vertical-align:baseline}
.okno-opis p,.okno-opis li,.okno-opis td{font-size:var(--ha-font-size-m,14px);line-height:var(--ha-line-height-normal,1.5)}
.okno-opis a{text-decoration:none}
.okno-opis a:hover{text-decoration:underline}`;
  const SPIS = /^https:\/\/github\.com\/superdarco78\/okno-ha-integracja(?:\/blob\/main\/README[^#]*)?#/;
  const wyglad = (el) => {
    const korzen = el.getRootNode();
    if (!korzen || !korzen.querySelector) return;
    const kontener = el.closest("ha-markdown-element, .markdown-body, ha-markdown") || korzen.firstElementChild;
    if (kontener && !kontener.classList.contains("okno-opis")) kontener.classList.add("okno-opis");
    if (!korzen.querySelector(".okno-ha-styl-opisu")) {
      const st = (korzen.ownerDocument || korzen).createElement("style");
      st.className = "okno-ha-styl-opisu"; st.textContent = STYL_OPISU;
      (korzen.head || korzen).appendChild(st);
    }
    for (const t of korzen.querySelectorAll("table:not(.okno-spis)")) {
      const linki = t.querySelectorAll("td > h3 > a");
      if (linki.length >= 2 && [...linki].every((a) => SPIS.test(a.dataset.oknoHref || a.getAttribute("href") || "") || /^#/.test(a.getAttribute("href") || ""))
        && t.querySelectorAll("td").length === linki.length) t.classList.add("okno-spis");
    }
  };
  // obrazki bez przemalowania (zdjęcia, animacje, flagi): adres z wersji; gdyby go nie było – zostaje main
  const przypnijZwykly = (el) => {
    const s = el.getAttribute("src") || "";
    if (!NASZE.test(s) || !POMIN.test(s) || el.dataset.oknoMain) return;
    const p = przypnij(s);
    if (p === s) return;
    el.dataset.oknoMain = s;
    el.addEventListener("error", () => el.setAttribute("src", el.dataset.oknoMain), { once: true });
    el.setAttribute("src", p);
  };
  const przemaluj = (el) => {
    const teraz = el.getAttribute("src") || "";
    if (NASZE.test(teraz) && el.dataset.oknoOrg && teraz !== el.dataset.oknoOrg) delete el.dataset.oknoKol;   // HACS podał nowy obrazek w tym samym miejscu
    const org = NASZE.test(teraz) ? teraz : el.dataset.oknoOrg || teraz;
    if (!NASZE.test(org) || POMIN.test(org)) return;
    if (NASZE.test(teraz)) {   // schowany (CSS wyżej) – gdyby przemalowanie trwało bardzo długo, pokaż w domyślnych kolorach
      el.dataset.oknoOd = el.dataset.oknoOd || Date.now();
      if (Date.now() - el.dataset.oknoOd > 30000) pokaz(el);
    }
    const glowny = kolorMotywu(el);
    if (!glowny) return;
    const kol = glowny + (ciemny(el) ? "d" : "j");   // kolor główny + motyw (jasny/ciemny)
    const akcG = kolorMotywu(el, "--accent-color") || "";
    if (ostatnie !== kol + "|" + akcG) { ostatnie = kol + "|" + akcG; try { localStorage.setItem("okno-ha-kolory", ostatnie); } catch (e) { /* tryb prywatny */ } }
    const znak = kol + "|" + akcG + "|" + (PRZYPNIJ ? PRZYPNIJ.integ : "");
    if (el.dataset.oknoKol === znak) return;
    el.dataset.oknoKol = znak; el.dataset.oknoOrg = org;
    // odległość od ekranu – im bliżej, tym wcześniej (liczona przy wyborze następnego obrazka)
    const waga = () => { const p = el.isConnected ? el.getBoundingClientRect() : null, h = el.ownerDocument.defaultView.innerHeight || 800;
      return !p ? 1e8 : p.bottom < 0 ? -p.bottom + h : p.top > h ? p.top : 0; };
    przemalujPlik(przypnij(org), kol, akcG, waga).then(
      (u) => { if (el.dataset.oknoKol === znak) el.setAttribute("src", u); },
      () => { pokaz(el); if (el.dataset.oknoKol === znak) delete el.dataset.oknoKol; });   // spróbuj ponownie przy następnym skanowaniu
  };
  // HACS rysuje obrazek: od razu wersja z pamięci w ostatnich kolorach (bez czekania na skanowanie)
  const zPamieci = (el, v) => {
    if (typeof v !== "string" || !NASZE.test(v) || POMIN.test(v)) return v;
    const u = ostatnie && gotoweTeraz.get(przypnij(v) + "|" + ostatnie);
    if (!u) { setTimeout(seria, 0); return przypnij(v); }   // jeszcze nie przemalowany: od razu wersja z tagu, nie z main
    el.dataset.oknoOrg = v; el.dataset.oknoKol = ostatnie;
    return u;
  };

  // obrazki już narysowane (np. panel HACS otwarty, zanim ten skrypt się wczytał, albo ramka HACS wczytana od nowa po restarcie)
  let sluchaj = () => {};
  const przejdz = (korzen, ile = { n: 0 }) => {
    for (const el of korzen.querySelectorAll("*")) {
      if (++ile.n > 200000) return;
      try {
        if (el.tagName === "IMG") { obrazek(el); przemaluj(el); plakietka(el); wariant(el); przypnijZwykly(el); if (NASZE.test(el.dataset.oknoOrg || el.getAttribute("src") || "")) wyglad(el); }
        else if (el.tagName === "SOURCE") zrodlo(el);
        else if (el.tagName === "A" && naHacs()) link(el);
        else if (el.tagName === "IFRAME") {
          if (!el.__oknoHaRamka) {   // ramka HACS przeładowana (np. po restarcie) – popraw od razu po wczytaniu
            el.__oknoHaRamka = true;
            el.addEventListener("load", () => seria());
          }
          const w = el.contentWindow;
          if (w && w.location.origin === location.origin && w.document.documentElement) { popraw(w); sluchaj(w.document); przejdz(w.document, ile); }
        }
        if (el.shadowRoot) przejdz(el.shadowRoot, ile);
      } catch (e) { /* inna domena albo ramka w trakcie wczytywania */ }
    }
  };
  // żywa symulacja w opisie (v1.4.52): okno-ha-galeria.js wczytywany TYLKO tu, w oknie HA, i sam niczego nie rejestruje –
  // każdą symulację stawia we własnej, osobnej ramce obok obrazków (HACS jej nie widzi; przy błędzie zostają obrazki)
  let galeriaW = false;
  const galeria = () => {
    if (galeriaW || !/^\/hacs\//.test(location.pathname)) return;
    galeriaW = true;
    import(`/okno_ha/okno-ha-galeria.js?t=${Date.now()}`).catch(() => { galeriaW = false; });
  };
  const naHacs = () => /^\/(hacs|config)/.test(location.pathname);   // HACS i okna konfiguracji (kreator integracji)
  const skanuj = () => { if (zywy() && naHacs()) { galeria(); przejdz(document); } };
  // adresy w HA: przyciski My Home Assistant, języki opisu i spis treści – na GitHubie linki zostają bez zmian
  const mojAdres = (nazwa, zapytanie) => `${nazwa.startsWith("hacs_") ? "/hacs" : ""}/_my_redirect/${nazwa}${zapytanie || ""}`;
  const MY = /^https:\/\/my\.home-assistant\.io\/redirect\/([a-z_]+)\/?(\?.*)?$/;
  const JEZYK = /^https:\/\/github\.com\/superdarco78\/okno-ha-integracja(?:\/blob\/main\/(README(?:_([A-Z]{2}))?\.md))?\/?$/;
  const KOTWICA = /^https:\/\/github\.com\/superdarco78\/(okno-ha-integracja|roleta-realistyczna)(\/blob\/main\/README[^#]*)?#/;
  const lokalny = (h) => {
    let m;
    if ((m = MY.exec(h))) return mojAdres(m[1], m[2]);
    if ((m = JEZYK.exec(h))) return `${location.pathname}?jezyk=${m[2] || "PL"}`;
    if (KOTWICA.test(h)) return `${location.pathname}#${h.split("#")[1]}`;
    return null;
  };
  const link = (a) => {
    if (a.dataset.oknoHref) return;
    const h = a.getAttribute("href"), lok = h && lokalny(h);
    if (lok) { a.dataset.oknoHref = h; a.setAttribute("href", lok); }
  };
  // po restarcie HA i ponownym połączeniu: kilka prób, aż HACS i Motor HA wstaną
  let serie = [];
  const seria = () => {
    serie.forEach(clearTimeout);
    serie = [0, 300, 1000, 2500, 5000, 10000, 20000, 40000].map((t) => setTimeout(skanuj, t));
  };
  // linki spisu treści prowadzą do GitHuba (HACS usuwa kotwice) – w HA przewiń do nagłówka na tej samej stronie
  const klik = (e) => {
    if (!zywy() || !naHacs()) return;
    const droga = e.composedPath(), a = droga.find((n) => n.tagName === "A");
    const h = a && (a.dataset.oknoHref || a.getAttribute("href"));
    // przyciski My Home Assistant (Otwórz w HACS, Dodaj integrację, Aktualizacje…): w HA od razu właściwa strona tego HA
    const my = h && MY.exec(h);
    if (my) {
      e.preventDefault(); e.stopPropagation();
      history.pushState(null, "", mojAdres(my[1], my[2]));
      window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
      return;
    }
    // język opisu (README_EN.md itd.): w HA podmień opis na miejscu, zamiast otwierać GitHuba
    const jezyk = h && JEZYK.exec(h);
    const opis = jezyk && droga.find((n) => n.tagName === "HA-MARKDOWN");
    if (opis) {
      e.preventDefault(); e.stopPropagation();
      fetch(`https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/${PRZYPNIJ ? PRZYPNIJ.integ : "main"}/${jezyk[1] || "README.md"}`)
        .then((r) => (r.ok ? r.text() : Promise.reject()))
        .then((t) => { opis.content = t; opis.scrollIntoView({ block: "start" }); seria(); })
        .catch(() => window.open(h, "_blank"));
      return;
    }
    if (!h || !KOTWICA.test(h)) return;
    // nagłówek sekcji: z kotwicy (<a name> w opisie → alt obrazka nagłówka) albo z tekstu linku
    const kotwica = decodeURIComponent(h.split("#")[1] || ""), md = (droga.find((n) => n.tagName === "HA-MARKDOWN") || {}).content || "";
    const zKotwicy = new RegExp(`<a name="${kotwica.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"></a>\\s*<h[1-4]>.*?alt="([^"]+)"`).exec(md);
    const tekst = zKotwicy ? zKotwicy[1] : a.textContent.trim(), korzen = a.getRootNode();
    const cel = [...korzen.querySelectorAll("h1 img[alt],h2 img[alt],h3 img[alt],h4 img[alt]")].find((i) => i.alt.trim() === tekst)
      || [...korzen.querySelectorAll("h1,h2,h3,h4")].find((n) => n.textContent.trim() === tekst);
    if (!cel) return;
    e.preventDefault(); e.stopPropagation();
    cel.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  // panel HACS jest w ramce (iframe) – kliknięcia w opisie nie wychodzą z niej, więc słuchaj też w ramce
  sluchaj = (d) => { if (d.__oknoHaKlik !== JA) { d.__oknoHaKlik = JA; d.addEventListener("click", klik, true); } };
  sluchaj(document);
  popraw(window);
  pamiec.then(seria);   // pamięć wczytana – od razu podmień to, co już narysowane
  // tylko w HACS i w Ustawieniach: co 2 s poprawia obrazki (ikona, kolor motywu)
  setInterval(skanuj, 2000);
  // nowa wersja integracji (po aktualizacji i restarcie HA): wczytaj nowy skrypt bez odświeżania strony
  let wersja = null;
  const sprawdzWersje = () => {
    if (!zywy() || document.hidden) return;
    fetch(`/okno_ha/wersja.txt?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.text() : "")).then((w) => {
        w = w.trim();
        if (!w || !zywy()) return;
        if (wersja === null) {
          wersja = w;
          const [integ, karta] = w.split("|");
          PRZYPNIJ = { integ: `v${integ}`, karta: karta || "" };
          seria();
          return;
        }
        if (w === wersja) return;
        wersja = w; window.__oknoHaNowy = true;
        import(`/okno_ha/okno-ha-hacs.js?t=${Date.now()}`).catch(() => { window.__oknoHaNowy = false; });
      }).catch(() => {});
  };
  // po aktualizacji: karta wczytana wcześniej zostaje w pamięci strony aż do jej przeładowania (przeglądarka nie podmieni
  // raz zarejestrowanej karty) – stąd stara karta w „Dodaj do panelu”. Strona sama przeładuje się raz, w spokojnym momencie:
  // karta widoczna, bez otwartego okna dialogowego, bez trybu edycji panelu i bez pisania w polu tekstowym.
  const otwarteOkno = (r, g = 0) => {
    if (!r || g > 3) return false;
    for (const e of r.children || []) {
      if (/^(HA-DIALOG|HA-MD-DIALOG|HA-ADAPTIVE-DIALOG|HA-WA-DIALOG|DIALOG)$/.test(e.tagName) && (e.open || e.hasAttribute("open"))) return true;
      if ((e.shadowRoot && otwarteOkno(e.shadowRoot, g + 1)) || otwarteOkno(e, g + 1)) return true;
    }
    return false;
  };
  const pisze = () => { let a = document.activeElement; while (a && a.shadowRoot && a.shadowRoot.activeElement) a = a.shadowRoot.activeElement; return !!a && /^(INPUT|TEXTAREA)$/.test(a.tagName); };
  const spokojnie = () => !document.hidden && !/[?&]edit=1/.test(location.search) && !pisze() && !otwarteOkno(document.querySelector("home-assistant")?.shadowRoot);
  // po restarcie HA strona przeładuje się dopiero, gdy HA i HACS są w pełni gotowe (połączenie + HACS wczytany),
  // i nie wcześniej niż 90 s po wykryciu nowej wersji – inaczej HACS pokazuje pustą stronę / „błąd wczytywania”
  const haGotowy = () => { const h = document.querySelector("home-assistant")?.hass; return !!h && h.connected !== false && !!h.config && h.config.state === "RUNNING" && (h.config.components || []).includes("hacs"); };
  let przeladuj = null;
  const przeladujPozniej = () => {
    if (przeladuj || !customElements.get("okno-ha")) return;
    const od = Date.now();
    przeladuj = setInterval(() => { if (zywy() && Date.now() - od > 90000 && haGotowy() && spokojnie()) { clearInterval(przeladuj); location.reload(); } }, 5000);
  };
  if (poAktualizacji) przeladujPozniej();
  sprawdzWersje();
  setInterval(sprawdzWersje, 30000);
  window.addEventListener("connection-status", () => setTimeout(sprawdzWersje, 3000));
  window.addEventListener("connection-status", seria);   // HA zgłasza „connected” po restarcie
  window.addEventListener("location-changed", seria);    // przejście do HACS w panelu
  document.addEventListener("visibilitychange", () => { if (!document.hidden) seria(); });
  seria();
})();
