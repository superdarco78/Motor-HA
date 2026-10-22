// Motor HA – ikona w HACS i w okienku „Aktualizacja”.
// HACS szuka ikony motor_ha tylko na brands.home-assistant.io, a tam jej nie ma (własne integracje nie są tam
// przyjmowane). Ten skrypt podmienia wyłącznie adresy z „motor_ha” na logo z samej integracji.
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
  // obrazki, które już są na stronie (także w cieniu komponentów)
  const przejdz = (korzen) => {
    korzen.querySelectorAll?.("img").forEach((i) => {
      const a = i.getAttribute("src") || "";
      if (a.includes("motor_ha") && zamien(a) !== a) i.setAttribute("src", zamien(a));
    });
    korzen.querySelectorAll?.("*").forEach((e) => e.shadowRoot && przejdz(e.shadowRoot));
  };
  setTimeout(() => przejdz(document), 1500);
})();
