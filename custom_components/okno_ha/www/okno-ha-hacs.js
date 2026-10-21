// Okno HA: lista HACS i okienko „Update” szukają ikony okno_ha tylko na brands.home-assistant.io.
// Tutaj przeglądarka dostaje zamiast tego logo z samej integracji. Dotyczy wyłącznie adresów z okno_ha.
(() => {
  if (window.__oknoHaHacs) return;   // skrypt wczytany drugi raz (np. po restarcie HA) – działa już pierwszy
  window.__oknoHaHacs = true;
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
  // obrazki już narysowane (np. panel HACS otwarty, zanim ten skrypt się wczytał, albo ramka HACS wczytana od nowa po restarcie)
  const przejdz = (korzen, ile = { n: 0 }) => {
    for (const el of korzen.querySelectorAll("*")) {
      if (++ile.n > 200000) return;
      try {
        if (el.tagName === "IMG") obrazek(el);
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
  const naHacs = () => location.pathname.startsWith("/hacs");
  const skanuj = () => { if (naHacs()) przejdz(document); };
  // po restarcie HA i ponownym połączeniu: kilka prób, aż HACS i Okno HA wstaną
  let serie = [];
  const seria = () => {
    serie.forEach(clearTimeout);
    serie = [0, 300, 1000, 2500, 5000, 10000, 20000, 40000].map((t) => setTimeout(skanuj, t));
  };
  popraw(window);
  // tylko na stronie HACS: co 2 s poprawia obrazki narysowane przed wczytaniem skryptu
  setInterval(skanuj, 2000);
  window.addEventListener("connection-status", seria);   // HA zgłasza „connected” po restarcie
  window.addEventListener("location-changed", seria);    // przejście do HACS w panelu
  document.addEventListener("visibilitychange", () => { if (!document.hidden) seria(); });
  seria();
})();
