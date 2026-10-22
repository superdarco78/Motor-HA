// Motor HA – wnętrze ramki z żywą symulacją w opisie HACS (ramkę stawia motor-ha-hacs.js).
// Ramka ma własny rejestr elementów, więc karta Motor HA wczytana tutaj nie trafia ani do HA, ani do HACS.
// Kolory, czcionki i jasny/ciemny motyw bierze z miejsca w opisie, w którym stoi ramka.
const FE = window.frameElement, Z = FE && FE.__mh;
if (Z) {
  const host = FE.ownerDocument.defaultView;
  let znak = "";
  const motyw = () => {
    try {
      const cs = host.getComputedStyle(FE), pary = [];
      for (let i = 0; i < cs.length; i++) { const n = cs[i]; if (n.startsWith("--")) pary.push([n, cs.getPropertyValue(n)]); }
      const z = pary.map((p) => p.join(":")).join(";") + cs.fontFamily + cs.color;
      if (z === znak) return;
      znak = z;
      const r = document.documentElement.style;
      for (const [n, v] of pary) r.setProperty(n, v);
      r.fontFamily = cs.fontFamily; r.color = cs.color; r.fontSize = cs.fontSize;
      r.colorScheme = Z.hass()?.themes?.darkMode ? "dark" : "light";
    } catch (e) { /* ramka odpięta */ }
  };
  const wysokosc = () => { try { FE.style.height = Math.ceil(document.documentElement.getBoundingClientRect().height) + "px"; } catch (e) { /* ramka odpięta */ } };
  motyw();
  const v = new URL(import.meta.url).searchParams.get("v") || Date.now();
  import(`/motor_ha/motor-ha.js?v=${encodeURIComponent(v)}`)
    .then(() => customElements.whenDefined("motor-ha-symulator"))
    .then(() => {
      const h = Z.hass();
      if (!h) throw new Error("brak hass");
      const s = document.createElement("motor-ha-symulator");
      s.jezyk = Z.jezyk();
      s.hass = h;
      document.body.appendChild(s);
      new ResizeObserver(wysokosc).observe(document.documentElement);
      setInterval(motyw, 1500);
      setTimeout(() => { wysokosc(); Z.gotowe(); }, 300);
    })
    .catch((e) => { console.warn("Motor HA: symulacja w opisie niedostępna", e); Z.zle(); });
}
