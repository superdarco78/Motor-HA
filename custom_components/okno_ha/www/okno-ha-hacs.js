// Okno HA: lista HACS i okienko „Update” szukają ikony okno_ha tylko na brands.home-assistant.io.
// Tutaj przeglądarka dostaje zamiast tego logo z samej integracji. Dotyczy wyłącznie adresów z okno_ha.
(() => {
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
  popraw(window);
})();
