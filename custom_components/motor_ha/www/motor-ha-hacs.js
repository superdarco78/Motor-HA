// Motor HA – ikona w HACS i w okienku „Aktualizacja” oraz opis Motor HA w HACS.
// 1) HACS szuka ikony motor_ha tylko na brands.home-assistant.io, a tam jej nie ma (własne integracje nie są tam
//    przyjmowane). Ten skrypt podmienia wyłącznie adresy z „motor_ha” na logo z samej integracji.
// 2) Opis Motor HA w HACS: obrazki z zainstalowanej wersji, jasne/ciemne według motywu HA, język opisu zmienia się
//    na miejscu, spis treści przewija stronę, przyciski My Home Assistant otwierają strony tego HA, a zamiast animacji
//    stoi żywa symulacja karty we własnej ramce. Skrypt nie rejestruje żadnych elementów i rusza tylko opis Motor HA;
//    przy jakimkolwiek błędzie opis zostaje taki, jak go narysował HACS.
(() => {
  if (window.__motorHaIkona) return;
  window.__motorHaIkona = true;
  const WZOR = /https:\/\/brands\.home-assistant\.io\/(?:_\/|marketplace\/)?motor_ha\/[a-z_@0-9]+\.png/g;
  const LOGO = "/motor_ha/ikona.png";
  const zamien = (v) => (typeof v === "string" && v.includes("motor_ha") ? v.replace(WZOR, LOGO) : v);

  const popraw = (w) => {
    if (!w || w.__motorHaIkona) return;
    try {
      w.__motorHaIkona = true;
      const img = w.HTMLImageElement.prototype;
      const src = Object.getOwnPropertyDescriptor(img, "src");
      Object.defineProperty(img, "src", { ...src, set(v) { src.set.call(this, zamien(v)); } });
      const ustaw = w.Element.prototype.setAttribute;
      w.Element.prototype.setAttribute = function (n, v) {
        return ustaw.call(this, n, n === "src" || n === "style" ? zamien(v) : v);
      };
      // okienko „Aktualizacja” i lista aktualizacji: obrazek encji rysuje state-badge
      w.customElements.whenDefined("state-badge").then(() => {
        const k = w.customElements.get("state-badge").prototype;
        if (typeof k._resolveImageUrl === "function" && !k.__motorHa) {
          const stara = k._resolveImageUrl;
          k._resolveImageUrl = function (...a) { return zamien(stara.apply(this, a)); };
          k.__motorHa = true;
        }
      });
      // panel HACS bywa w ramce (iframe) – popraw też jej okno
      const ramka = Object.getOwnPropertyDescriptor(w.HTMLIFrameElement.prototype, "contentWindow");
      Object.defineProperty(w.HTMLIFrameElement.prototype, "contentWindow", {
        ...ramka,
        get() {
          const o = ramka.get.call(this);
          try { if (o && o.location.origin === w.location.origin) popraw(o); } catch (e) { /* inna domena */ }
          return o;
        },
      });
    } catch (e) {
      console.warn("Motor HA: nie podmieniłem ikony w HACS", e);
    }
  };
  popraw(window);

  // ── opis Motor HA w HACS ──
  const RAW = "https://raw.githubusercontent.com/superdarco78/Motor-HA/";
  const GH = "https://github.com/superdarco78/Motor-HA";
  const JEZYKI = { "": "pl", EN: "en", DE: "de", FR: "fr", CS: "cs" };
  let wersja = "";   // zainstalowana wersja → obrazki z tego wydania (opis zmienia się dopiero po aktualizacji)
  fetch(`/motor_ha/wersja.txt?t=${Date.now()}`, { cache: "no-store" }).then((r) => (r.ok ? r.text() : "")).then((w) => { wersja = w.trim(); }).catch(() => {});
  const ha = () => document.querySelector("home-assistant")?.hass;
  const ciemny = () => { const h = ha(); return h?.themes ? !!h.themes.darkMode : matchMedia("(prefers-color-scheme: dark)").matches; };
  const zWersji = (u) => (wersja && u.startsWith(RAW + "main/") ? u.replace(RAW + "main/", `${RAW}v${wersja}/`) : u);

  // obrazek: z wydania (gdy go tam nie ma – z main), animacja jasna/ciemna według motywu HA, a nie ustawień systemu
  const obrazek = (el) => {
    const org = el.dataset.mhOrg || el.getAttribute("src") || "";
    if (!org.startsWith(RAW)) return;
    let cel = zWersji(org);
    if (/-(jasny|ciemny)\.webp$/.test(cel)) cel = cel.replace(/-(jasny|ciemny)\.webp$/, ciemny() ? "-ciemny.webp" : "-jasny.webp");
    if (el.dataset.mhCel === cel) return;
    el.dataset.mhOrg = org; el.dataset.mhCel = cel;
    if (cel !== org) el.addEventListener("error", () => { if (el.getAttribute("src") !== org) el.setAttribute("src", org); }, { once: true });
    el.setAttribute("src", cel);
  };
  const zrodlo = (el) => {   // <source media="(prefers-color-scheme: dark)"> w <picture>: obrazek już wybiera <img> wyżej
    if ((el.getAttribute("srcset") || "").startsWith(RAW) && el.getAttribute("media") !== "not all") el.setAttribute("media", "not all");
  };

  // przyciski My Home Assistant → strona w tym HA; języki → opis na miejscu; spis treści → przewinięcie
  const MY = /^https:\/\/my\.home-assistant\.io\/redirect\/([a-z_]+)\/?(\?.*)?$/;
  const JEZYK = /^https:\/\/github\.com\/superdarco78\/Motor-HA(?:\/blob\/main\/README(?:_([A-Z]{2}))?\.md)?\/?$/;
  const KOTWICA = /^https:\/\/github\.com\/superdarco78\/Motor-HA(?:\/blob\/main\/README(?:_[A-Z]{2})?\.md)?#(.+)$/;
  const opisy = new Map();   // kod języka → treść opisu
  const pokazJezyk = (md, kod) => {
    const plik = kod ? `README_${kod}.md` : "README.md";
    const t = opisy.get(plik) || fetch(zWersji(`${RAW}main/${plik}`)).then((r) => (r.ok ? r.text() : fetch(`${RAW}main/${plik}`).then((x) => (x.ok ? x.text() : Promise.reject()))));
    opisy.set(plik, t);
    t.then((tekst) => { md.content = tekst; md.__mhJezyk = kod; md.__mhTekst = kod ? tekst : null; setTimeout(skanuj, 50); }).catch(() => { opisy.delete(plik); window.open(`${GH}/blob/main/${plik}`, "_blank"); });
  };
  const naglowek = (md, kotwica) => {
    const tekst = String(md.content || ""), i = tekst.indexOf(`<a name="${kotwica}"></a>`);
    if (i < 0) return null;
    // po kotwicy stoi nagłówek albo pogrubiony tytuł kroku (galeria kreatora)
    const m = /<(h[1-4]|b)[^>]*>([\s\S]*?)<\/\1>/.exec(tekst.slice(i));
    const tytul = m && m[2].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim();
    return tytul && [...wnetrze(md).querySelectorAll(m[1] === "b" ? "b" : "h1,h2,h3,h4")].find((h) => h.textContent.trim() === tytul);
  };
  const wnetrze = (md) => md.shadowRoot || md;
  const klik = (e) => {
    const droga = e.composedPath(), a = droga.find((n) => n.tagName === "A"), md = droga.find((n) => n.tagName === "HA-MARKDOWN");
    const h = a && a.getAttribute("href");
    if (!h || !md || !md.__mhNasz) return;
    let m;
    // przyciski „w HA” otwierają się w nowej karcie – opis zostaje tam, gdzie był
    if ((m = MY.exec(h))) window.open(`${m[1].startsWith("hacs_") ? "/hacs" : ""}/_my_redirect/${m[1]}${m[2] || ""}`, "_blank", "noopener");
    else if ((m = JEZYK.exec(h))) pokazJezyk(md, m[1] || "");
    else if ((m = KOTWICA.exec(h))) { const cel = naglowek(md, decodeURIComponent(m[1])); if (!cel) return; cel.scrollIntoView({ behavior: "smooth", block: "start" }); }
    else return;
    e.preventDefault(); e.stopPropagation();
  };

  // żywa symulacja zamiast animacji: własna ramka z kartą Motor HA (HACS jej nie widzi, przy błędzie zostaje animacja)
  const symulacja = (img, md) => {
    const miejsce = img.closest("picture") || img;
    if (miejsce.__mhSym) return;
    miejsce.__mhSym = true;
    const doc = miejsce.ownerDocument, f = doc.createElement("iframe");
    f.setAttribute("title", "Motor HA");
    f.setAttribute("scrolling", "no");
    Object.assign(f.style, { display: "block", width: "100%", height: "0", border: "0", margin: "8px 0", background: "transparent", colorScheme: "normal" });
    let koniec = false;
    const zle = () => { if (!koniec) { koniec = true; f.remove(); } };
    f.__mh = {
      gotowe: () => {
        if (koniec) return;
        koniec = true;
        // animacja i jej podpis znikają – symulacja mówi sama za siebie
        for (let e = miejsce; e && (e === miejsce || /^(BR|SUB)$/.test(e.tagName)); e = e.nextElementSibling) e.style.display = "none";
      },
      zle, hass: ha, jezyk: () => JEZYKI[md.__mhJezyk || ""] || "pl",
    };
    setTimeout(() => { if (!koniec) zle(); }, 30000);
    f.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}body{padding:2px}</style></head><body>
<script type="module">import("/motor_ha/motor-ha-hacs-ramka.js?v=${encodeURIComponent(wersja)}").catch(() => frameElement.__mh.zle())<\/script></body></html>`;
    miejsce.parentNode.insertBefore(f, miejsce);
  };

  // wygląd opisu w HA (tylko nasz opis): ikony w jednej linii z napisem, tabele z liniami HA, pasek kroków w karcie HA
  const wyglad = (md, w) => {
    if (w.querySelector("style[data-mh]")) return;
    const p = w === md ? "[data-mh-opis]" : ":host";
    if (w === md) md.setAttribute("data-mh-opis", "");
    const s = document.createElement("style");
    s.setAttribute("data-mh", "");
    s.textContent = `
${p} img[src*="/img/ikony/"]:not([src*="/w-"]):not([src*="/linia-"]){display:inline-block!important;vertical-align:middle!important;margin:0 6px 2px 0!important}
${p} img[src*="/img/ikony/w-"]{display:block!important;margin:0 auto!important}
${p} table{border-collapse:collapse!important;width:100%!important;margin:8px 0 16px!important}
${p} th,${p} td{border:1px solid var(--divider-color,rgba(127,127,127,.25))!important;padding:8px 10px!important;vertical-align:middle!important}
${p} th{background:var(--secondary-background-color,transparent)!important}
${p} p:has(> a > img[src*="/img/kreator/pasek-"]){display:flex!important;flex-wrap:nowrap!important;justify-content:space-between!important;gap:0!important;
  padding:10px 8px!important;border-radius:var(--ha-card-border-radius,12px)!important;background:var(--card-background-color,transparent)!important;
  border:1px solid var(--divider-color,rgba(127,127,127,.25))!important}
${p} p:has(> a > img[src*="/img/kreator/pasek-"]) > a{flex:1 1 0!important;min-width:0!important}
${p} img[src*="/img/kreator/pasek-"]{display:block!important;width:100%!important;height:auto!important;margin:0!important}
${p} p:has(> img),${p} p:has(> a > img){text-align:center!important}
${p} img[src*="/img/kroki/"],${p} img[src*="/img/oslony-rzedy/"]{display:block!important;margin:8px auto!important;width:auto!important;max-width:min(100%,880px)!important}
${p} img[src*="/img/kroki/"][src*="/krok-"]{max-width:min(100%,640px)!important}`;
    w.prepend(s);
  };
  const nasz = (md) => typeof md.content === "string" && md.content.includes("superdarco78/Motor-HA/main/img/");
  const opis = (md) => {
    md.__mhNasz = true;
    // pierwszy raz: opis w języku HA (polski, angielski, niemiecki, francuski, czeski; inne → angielski)
    if (md.__mhJezyk === undefined) {
      md.__mhJezyk = "";
      const j = String(ha()?.locale?.language || ha()?.language || "pl").slice(0, 2).toUpperCase();
      if (j !== "PL") return pokazJezyk(md, JEZYKI[j] ? j : "EN");
    }
    // HACS narysował opis od nowa (np. po odświeżeniu danych) – zostaje wybrany język
    if (md.__mhTekst && md.content !== md.__mhTekst) { md.content = md.__mhTekst; return; }
    const w = wnetrze(md);
    wyglad(md, w);
    for (const el of w.querySelectorAll("img")) {
      obrazek(el);
      if (/\/img\/pokaz\//.test(el.dataset.mhOrg || "") && el.isConnected) symulacja(el, md);
    }
    for (const el of w.querySelectorAll("source")) zrodlo(el);
  };
  const sluchaj = (d) => { if (!d.__mhKlik) { d.__mhKlik = true; d.addEventListener("click", klik, true); } };
  const przejdz = (korzen, ile) => {
    for (const el of korzen.querySelectorAll("*")) {
      if (++ile.n > 100000) return;
      try {
        if (el.tagName === "HA-MARKDOWN" && nasz(el)) { opis(el); sluchaj(el.ownerDocument); }
        else if (el.tagName === "IMG") { const a = el.getAttribute("src") || ""; if (a.includes("motor_ha") && zamien(a) !== a) el.setAttribute("src", zamien(a)); }
        else if (el.tagName === "IFRAME" && !el.__mh) { const d = el.contentDocument; if (d && d.documentElement) { popraw(el.contentWindow); przejdz(d, ile); } }
        if (el.shadowRoot) przejdz(el.shadowRoot, ile);
      } catch (e) { /* inna domena albo ramka w trakcie wczytywania */ }
    }
  };
  // ── przycisk „Wstecz” w kreatorze Motor HA ──
  // Kreator ma pole „wstecz” (przełącznik). Tutaj przełącznik znika, a obok „Dalej” po lewej stoi przycisk „Wstecz”,
  // który wysyła krok z wstecz = tak. Używa gotowego ha-button z HA (nic nie rejestruje); przy błędzie zostaje przełącznik.
  const WSTECZ = { pl: "Wstecz", en: "Back", de: "Zurück", fr: "Retour", cs: "Zpět" };
  const wsteczKreator = () => {
    try {
      const r = document.querySelector("home-assistant")?.shadowRoot?.querySelector("dialog-data-entry-flow")?.shadowRoot;
      if (!r) return;
      const form = r.querySelector("step-flow-form"), stopka = r.querySelector("ha-dialog-footer");
      const jest = !!form?.step?.data_schema?.some((p) => p.name === "wstecz");
      let b = stopka?.querySelector("[data-mh-wstecz]");
      if (!jest || !stopka) { b?.remove(); return; }
      for (const el of form.shadowRoot?.querySelector("ha-form")?.shadowRoot?.querySelectorAll("*") || []) {
        if (el.schema?.name === "wstecz" && el.style.display !== "none") el.style.display = "none";
      }
      if (b) return;
      b = document.createElement("ha-button");
      b.dataset.mhWstecz = "1";
      b.slot = "secondaryAction";
      b.style.marginInlineEnd = "auto";   // po lewej stronie okienka
      b.textContent = WSTECZ[String(ha()?.language || "en").slice(0, 2)] || WSTECZ.en;
      b.addEventListener("click", () => {
        const f = r.querySelector("step-flow-form");
        if (!f) return;
        f._stepData = { ...(f._stepDataProcessed || {}), wstecz: true };
        f.submit();
      });
      stopka.prepend(b);
    } catch (e) { /* okienko w trakcie rysowania */ }
  };
  setInterval(wsteczKreator, 500);

  const skanuj = () => { if (/^\/(hacs|config)/.test(location.pathname)) try { przejdz(document, { n: 0 }); } catch (e) { /* strona w trakcie rysowania */ } };
  setTimeout(skanuj, 300);
  setInterval(skanuj, 1500);
  window.addEventListener("location-changed", () => setTimeout(skanuj, 300));
})();
