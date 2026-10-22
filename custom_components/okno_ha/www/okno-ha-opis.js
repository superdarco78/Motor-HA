// Motor HA: opis w HACS jako strona w stylu HA (v1.4.54).
// Działa tylko we WŁASNEJ ramce (iframe) wstawionej przez okno-ha-hacs.js w miejsce opisu z GitHuba – HACS jej nie widzi,
// więc nic stąd nie może zepsuć strony HACS. Treść: opis/<język>.html (generowany z README przez narzedzia/opis_ha.py).
// Jeden zestaw elementów HA: rozmiary i kolory tylko z motywu HA (zmienne CSS), żywe karty Motor HA zamiast obrazków kart.
// Przy każdym błędzie ramka znika i zostaje zwykły opis z GitHuba.
(() => {
  const FE = (() => { try { return window.frameElement; } catch (e) { return null; } })();
  const ZAD = FE && FE.__oknoHaOpis;
  if (!ZAD || window.__oknoHaOpisStrona) return;
  window.__oknoHaOpisStrona = true;
  const host = FE.ownerDocument.defaultView, gora = window.top;

  // ── jeden zestaw elementów HA (wszystkie rozmiary i kolory ze zmiennych motywu HA) ──
  const STYL = `
:root{color-scheme:light dark}
html,body{margin:0;padding:0;background:transparent;overflow:hidden}
body{font-family:var(--ha-font-family-body,Roboto,Noto,sans-serif);font-size:var(--ha-font-size-m,14px);line-height:var(--ha-line-height-normal,1.5);
 color:var(--primary-text-color);-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;text-size-adjust:100%}
.m-opis{padding:0 0 16px;overflow-wrap:break-word}
a{color:var(--primary-color);text-decoration:none}
a:hover{text-decoration:underline}
b,strong{font-weight:var(--ha-font-weight-medium,500)}
code{font-family:var(--ha-font-family-code,monospace);font-size:.92em;background:var(--secondary-background-color);border-radius:var(--ha-border-radius-sm,4px);padding:1px 4px}
.m-kod{font-family:var(--ha-font-family-code,monospace);font-size:var(--ha-font-size-s,12px);background:var(--secondary-background-color);border-radius:var(--ha-border-radius-md,8px);padding:12px;overflow:auto}
.m-kod code{background:none;padding:0}
.m-p,.m-opis p{margin:8px 0}
.m-srodek{text-align:center}
.m-podpis,.m-fig figcaption{text-align:center;color:var(--secondary-text-color);font-size:var(--ha-font-size-m,14px);margin:4px 0 16px}
.m-hr{border:0;border-top:1px solid var(--divider-color);margin:32px 0}
.m-kotwica{display:block}
[id]{scroll-margin-top:16px}
/* nagłówki: jedna obwódka w kolorze akcentu + znak w kolorze głównym */
.m-tytul,.m-h1,.m-h2,.m-h3,.m-h4{display:flex;align-items:center;gap:12px;color:var(--primary-text-color);margin:32px 0 12px;line-height:1.3}
.m-tytul{justify-content:center;font-size:var(--ha-font-size-3xl,28px);font-weight:var(--ha-font-weight-normal,400);margin:24px 0 8px}
.m-logo{width:44px;height:44px;border-radius:var(--ha-border-radius-lg,12px)}
.m-h1{font-size:var(--ha-font-size-2xl,24px);font-weight:var(--ha-font-weight-normal,400)}
.m-h2{font-size:var(--ha-font-size-xl,20px);font-weight:var(--ha-font-weight-medium,500)}
.m-h3,.m-h4{font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500);margin:24px 0 8px}
.m-ik{flex:none;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:40px;height:40px;border-radius:50%;
 border:2px solid var(--accent-color);color:var(--primary-color)}
.m-ik svg{width:24px;height:24px;fill:currentColor}
.m-h1 .m-ik{width:44px;height:44px}
.m-h3 .m-ik,.m-h4 .m-ik{width:36px;height:36px}
.m-h3 .m-ik svg,.m-h4 .m-ik svg{width:20px;height:20px}
/* ramka informacji jak ha-alert (info) */
.m-info{display:flex;gap:12px;align-items:flex-start;margin:16px 0;padding:8px 12px;border-radius:var(--ha-border-radius-sm,4px);
 background:color-mix(in srgb,var(--info-color,#039be5) 12%,transparent);color:var(--primary-text-color)}
.m-info-ik{flex:none;color:var(--info-color,#039be5);display:flex;padding-top:2px}
.m-info-ik svg{width:24px;height:24px;fill:currentColor}
.m-info p{margin:2px 0}
.m-uwaga{display:flex;gap:8px;align-items:flex-start;color:var(--secondary-text-color);margin:8px 0}
.m-uwaga-ik{flex:none;display:flex;padding-top:1px;color:var(--secondary-text-color)}
.m-uwaga-ik svg{width:20px;height:20px;fill:currentColor}
/* karty (jak ha-card) */
.m-kafel,.m-spis-k{background:var(--ha-card-background,var(--card-background-color));border:var(--ha-card-border-width,1px) solid var(--ha-card-border-color,var(--divider-color));
 border-radius:var(--ha-card-border-radius,12px);color:var(--primary-text-color);text-decoration:none!important;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
.m-kafel:hover,.m-spis-k:hover{background:color-mix(in srgb,var(--primary-text-color) 4%,var(--ha-card-background,var(--card-background-color)))}
.m-kafle{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,160px),1fr));gap:8px;margin:16px 0}
.m-kafel{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;padding:16px 12px}
.m-kafel-ik{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;margin-bottom:4px;
 background:color-mix(in srgb,var(--primary-color) 20%,transparent);color:var(--primary-color)}
.m-kafel-ik svg{width:24px;height:24px;fill:currentColor}
.m-kafel-t{font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500);line-height:1.3}
.m-kafel-o{color:var(--secondary-text-color);line-height:1.4}
/* spis treści: kafelki tej samej wielkości */
.m-spis{margin:16px 0 24px}
.m-spis-t{display:grid;grid-template-columns:auto 1fr;align-items:center;column-gap:12px;color:var(--primary-text-color)!important;font-size:var(--ha-font-size-xl,20px);font-weight:var(--ha-font-weight-medium,500);margin:0 0 12px;text-decoration:none!important}
.m-spis-t .m-ik{grid-row:span 2}
.m-spis-sub{font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-normal,400);color:var(--secondary-text-color)}
.m-spis-kafle{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));grid-auto-rows:1fr;gap:8px}
.m-spis-k{display:flex;align-items:center;gap:12px;min-height:56px;padding:8px 12px;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);line-height:1.3}
.m-spis-k .m-ik{width:36px;height:36px}
.m-spis-k .m-ik svg{width:20px;height:20px}
/* pasek kroków kreatora: kółka jak w kreatorze Motor HA */
.m-kroki{display:flex;justify-content:space-between;margin:8px 0 16px;position:relative}
.m-kroki::before{content:"";position:absolute;left:24px;right:24px;top:18px;height:2px;background:var(--divider-color)}
.m-krok{position:relative;flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:4px;text-decoration:none!important;color:var(--secondary-text-color);-webkit-tap-highlight-color:transparent}
.m-krok-k{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;
 background:var(--ha-card-background,var(--card-background-color));box-shadow:inset 0 0 0 1px var(--divider-color);color:var(--secondary-text-color)}
.m-krok-k svg{width:20px;height:20px;fill:currentColor}
.m-krok.zrobione .m-krok-k{background:color-mix(in srgb,var(--primary-color) 20%,var(--ha-card-background,var(--card-background-color)));box-shadow:none;color:var(--primary-color)}
.m-krok.on .m-krok-k{background:var(--primary-color);box-shadow:none;color:var(--text-primary-color,#fff)}
.m-krok.on{color:var(--primary-color);font-weight:var(--ha-font-weight-medium,500)}
.m-krok-t{font-size:var(--ha-font-size-s,12px);line-height:1.25;text-align:center;max-width:100%;overflow-wrap:anywhere}
/* zrzuty ekranu: 1:1 jak w HA, na węższym ekranie do szerokości */
.m-fig{margin:16px 0 8px;text-align:center}
.m-img{max-width:100%;height:auto;vertical-align:middle}
.m-fig .m-img{display:block;margin:0 auto}
.m-baner{margin:0 0 8px;text-align:center}
.m-baner .m-img{width:100%}
img.m-czeka{visibility:hidden}
/* „Co kliknąć”: etykieta w kolorze akcentu, numery jak zaznaczenia na zrzutach */
.m-klik{margin:12px 0}
.m-klik-t{color:var(--accent-color);font-size:var(--ha-font-size-l,16px);font-weight:var(--ha-font-weight-medium,500);margin-bottom:8px}
.m-numery{list-style:none;counter-reset:n;margin:0;padding:0}
.m-numery li{counter-increment:n;position:relative;padding-left:36px;margin:0 0 8px;line-height:24px;min-height:24px}
.m-numery li::before{content:counter(n);position:absolute;left:0;top:0;display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;
 background:var(--accent-color);color:var(--text-accent-color,#fff);font-size:var(--ha-font-size-s,12px);font-weight:var(--ha-font-weight-bold,700)}
.m-lista{margin:8px 0;padding-left:24px}
.m-lista li{margin:4px 0}
/* przyciski jak ha-button */
.m-przyciski{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:16px 0}
.m-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;box-sizing:border-box;height:var(--ha-button-height,40px);padding:0 16px;
 border-radius:var(--ha-border-radius-pill,9999px);background:var(--ha-color-fill-primary-loud-resting,var(--primary-color));color:var(--ha-color-on-primary-loud,var(--text-primary-color,#fff))!important;
 font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);text-decoration:none!important;-webkit-tap-highlight-color:transparent;white-space:nowrap;max-width:100%}
.m-btn:hover{background:var(--ha-color-fill-primary-loud-hover,var(--primary-color));filter:brightness(1.08)}
.m-btn-obrys{background:transparent;color:var(--primary-color)!important;box-shadow:inset 0 0 0 1px var(--outline-color,var(--divider-color))}
.m-btn-obrys:hover{background:var(--ha-color-fill-primary-normal-hover,color-mix(in srgb,var(--primary-color) 8%,transparent));filter:none}
.m-btn-ik{display:flex}
.m-btn-ik svg{width:20px;height:20px;fill:currentColor}
/* chipy jak ha-filter-chip */
.m-chipy,.m-jezyki{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:8px 0 16px}
.m-chip{display:inline-flex;align-items:center;gap:6px;box-sizing:border-box;height:32px;padding:0 12px;border-radius:var(--ha-border-radius-xl,16px);
 border:1px solid var(--outline-color,var(--divider-color));color:var(--primary-text-color)!important;font-size:var(--ha-font-size-m,14px);font-weight:var(--ha-font-weight-medium,500);
 text-decoration:none!important;white-space:nowrap;-webkit-tap-highlight-color:transparent}
.m-chip:hover{background:color-mix(in srgb,var(--primary-text-color) 8%,transparent)}
.m-chip.on{background:color-mix(in srgb,var(--primary-text-color) 15%,transparent);border-color:transparent}
.m-chip-ik{display:flex;color:var(--primary-color)}
.m-chip-ik svg{width:18px;height:18px;fill:currentColor}
.m-flaga{font-size:var(--ha-font-size-xs,11px);font-weight:var(--ha-font-weight-bold,700);color:var(--primary-color);letter-spacing:.5px}
/* tabele jak w HA: wiersze z linią, bez ramek */
.m-tabela{margin:16px 0;overflow-x:auto;-webkit-overflow-scrolling:touch}
.m-tabela table{width:100%;border-collapse:collapse}
.m-tabela th{text-align:left;font-weight:var(--ha-font-weight-medium,500);color:var(--secondary-text-color);padding:8px 12px;border-bottom:1px solid var(--divider-color);vertical-align:bottom}
.m-tabela td{padding:8px 12px;border-bottom:1px solid var(--divider-color);vertical-align:middle}
.m-tabela tr:last-child td{border-bottom:0}
.m-tabela td:has(> .m-ik-t:only-child),.m-tabela th:empty{width:40px;padding-right:0}
.m-ik-t{width:36px;height:36px}
.m-ik-t svg{width:20px;height:20px}
/* żywe karty */
.m-sym{margin:16px 0;min-height:40px}
@media (max-width:450px){.m-h2{font-size:var(--ha-font-size-l,18px)}.m-tytul{font-size:var(--ha-font-size-2xl,24px)}.m-tabela th,.m-tabela td{padding:8px 6px}}
`;

  // ── motyw HA z miejsca, gdzie stoi ramka (jasny/ciemny, kolor główny i akcent) ──
  let znak = "";
  const motyw = () => {
    try {
      const cs = host.getComputedStyle(FE), pary = [];
      for (let i = 0; i < cs.length; i++) { const n = cs[i]; if (n.startsWith("--")) pary.push([n, cs.getPropertyValue(n)]); }
      const z = pary.map((p) => p.join(":")).join(";") + cs.fontFamily + cs.color;
      if (z === znak) return false;
      znak = z;
      const r = document.documentElement.style;
      for (const [n, v] of pary) r.setProperty(n, v);
      r.fontFamily = cs.fontFamily; r.color = cs.color;
      r.colorScheme = /dark/.test(cs.colorScheme) ? "dark" : "light";
      return true;
    } catch (e) { return false; }
  };
  const wysokosc = () => { try { FE.style.height = Math.ceil(document.documentElement.getBoundingClientRect().height) + "px"; } catch (e) { /* ramka odpięta */ } };

  // ── obrazki: przemalowane na kolory motywu przez okno-ha-hacs.js, zrzuty 1:1 jak w HA ──
  const obrazki = () => {
    const przemaluj = gora.__oknoHaPrzemaluj;
    for (const el of document.querySelectorAll("img[data-src]")) {
      if (!el.dataset.oknoStart) {
        el.dataset.oknoStart = "1";
        const sk = +el.dataset.skala || 1;
        el.addEventListener("load", () => {
          if (el.naturalWidth && !el.style.width) el.style.width = `min(100%, ${Math.round(el.naturalWidth / sk)}px)`;
          if (!/^https:\/\/raw\./.test(el.getAttribute("src") || "") || !przemaluj) el.classList.remove("m-czeka");
        });
        if (przemaluj && /\.(svg|png)(\?|#|$)/.test(el.dataset.src) && !/icon\.png|logo|ikona/.test(el.dataset.src)) {
          el.classList.add("m-czeka");
          setTimeout(() => el.classList.remove("m-czeka"), 20000);   // przemalowanie bardzo długo – pokaż w domyślnych kolorach
        }
        el.setAttribute("src", el.dataset.src);
      }
      try { if (przemaluj) przemaluj(el); } catch (e) { el.classList.remove("m-czeka"); }
      if (el.complete && !/^https:\/\/raw\./.test(el.getAttribute("src") || "")) el.classList.remove("m-czeka");
    }
  };

  // ── żywe karty Motor HA (z okno-ha-galeria.js w trybie biblioteki, w tej samej ramce) ──
  let bib = null;
  const biblioteka = () => bib || (bib = (window.__oknoHaBiblioteka = { t: ZAD.t },
    import(`/okno_ha/okno-ha-galeria.js?t=${ZAD.t}`).then(() => window.__oknoHaZbuduj)));
  const karta = (el) => {
    if (el.dataset.gotowa) return;
    el.dataset.gotowa = "1";
    let d;
    try { d = JSON.parse(el.dataset.sym); } catch (e) { return; }
    biblioteka().then((zb) => zb(d.sceny, d.start || {}, el)).catch(() => { el.style.display = "none"; });
  };
  let widz = null;
  const karty = () => {
    const wszystkie = document.querySelectorAll(".m-sym:not([data-gotowa])");
    if (!("IntersectionObserver" in window)) { wszystkie.forEach(karta); return; }
    widz = widz || new IntersectionObserver((w) => w.forEach((x) => { if (x.isIntersecting) { widz.unobserve(x.target); karta(x.target); } }), { rootMargin: "800px 0px" });
    wszystkie.forEach((el) => widz.observe(el));
  };

  // ── linki: wszystko na miejscu (spis treści, języki, przyciski HA); zewnętrzne w nowej karcie ──
  const mojAdres = (h) => {
    const m = /^https:\/\/my\.home-assistant\.io\/redirect\/([a-z_]+)\/?(\?.*)?$/.exec(h);
    return m ? `${m[1].startsWith("hacs_") ? "/hacs" : ""}/_my_redirect/${m[1]}${m[2] || ""}` : null;
  };
  let jezyk = ZAD.jez;
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a");
    if (!a) return;
    const h = a.getAttribute("href") || "";
    if (a.dataset.kotwica !== undefined) {
      e.preventDefault();
      const k = a.dataset.kotwica, cel = document.getElementById(k) || document.querySelector(`[name="${CSS.escape(k)}"]`);
      if (cel && cel !== a) cel.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (a.dataset.jezyk) {
      e.preventDefault();
      if (a.dataset.jezyk !== jezyk) wczytaj(a.dataset.jezyk, true);
      return;
    }
    if (a.dataset.my) {
      e.preventDefault();
      const u = mojAdres(h);
      if (!u) { window.open(h, "_blank", "noopener"); return; }
      gora.history.pushState(null, "", u);
      gora.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
      return;
    }
    if (/^https?:\/\//.test(h)) { e.preventDefault(); window.open(h, "_blank", "noopener"); }
  });

  // ── treść ──
  const tresc = document.createElement("div");
  const wczytaj = (jez, przewin) => fetch(`/okno_ha/opis/${jez}.html?t=${ZAD.t}`).then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.status)))).then((t) => {
    jezyk = jez;
    tresc.innerHTML = t;
    const baner = tresc.querySelector(".m-baner"), opis = tresc.querySelector(".m-opis");
    if (baner && opis) opis.prepend(baner);   // w HA najpierw baner, potem języki i informacje
    for (const c of tresc.querySelectorAll("[data-wersja] span:last-child")) if (ZAD.wersja) c.textContent = `${c.textContent} ${ZAD.wersja}`;
    for (const c of tresc.querySelectorAll(".m-jezyki [data-jezyk]")) c.classList.toggle("on", c.dataset.jezyk === jez);
    obrazki(); karty(); wysokosc();
    if (przewin) tresc.querySelector(".m-jezyki")?.scrollIntoView({ block: "start" });
    try { ZAD.zapisz && ZAD.zapisz(jez); } catch (e) { /* bez pamięci */ }
  });

  const st = document.createElement("style"); st.textContent = STYL; document.head.appendChild(st);
  motyw();
  document.body.appendChild(tresc);
  new ResizeObserver(wysokosc).observe(document.documentElement);
  wczytaj(jezyk).then(() => {
    setTimeout(() => { wysokosc(); FE.__oknoHaGotowe?.(); }, 200);
    setInterval(() => { if (motyw()) obrazki(); else obrazki(); }, 2000);
  }).catch((e) => FE.__oknoHaBlad?.(e));
})();
