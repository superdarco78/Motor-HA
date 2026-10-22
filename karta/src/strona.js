// Strona urządzenia Motor HA w Ustawieniach: na górze żywa karta (okno) albo „Motor HA – cały dom” z kartami
// wszystkich urządzeń (urządzenie „Motor HA”). HA nie ma na to miejsca, więc karty dokładamy do jej kolumn;
// gdy HA zmieni stronę i kolumn nie będzie, po prostu nic się nie pokaże.
const WZOR = /^\/config\/devices\/device\/([^/?#]+)/;
const ZNAK = 'data-motor-ha';

const strona = (k) => {
  for (const x of k.querySelectorAll('*')) {
    if (x.tagName === 'HA-CONFIG-DEVICE-PAGE') return x;
    if (x.shadowRoot && x.tagName !== 'HA-SIDEBAR') { const y = strona(x.shadowRoot); if (y) return y; }
  }
  return null;
};

function cele(h, id) {
  const encje = Object.values(h.entities || {}).filter(e => e.platform === 'motor_ha');
  const urz = h.devices?.[id];
  if (!urz || !encje.some(e => e.device_id === id)) return null;
  const wpis = urz.config_entries?.[0];
  const okno = encje.find(e => e.device_id === id && e.entity_id.startsWith('cover.'));
  if (okno) return [{ kolumna: 0, cel: { entity: okno.entity_id, urzadzenie: id, wpis } }];
  // urządzenie „Motor HA” (aktualizacja): cały dom + każde urządzenie osobno
  const okna = encje.filter(e => e.entity_id.startsWith('cover.') && h.states[e.entity_id])
    .sort((a, b) => String(h.states[a.entity_id].attributes.friendly_name).localeCompare(String(h.states[b.entity_id].attributes.friendly_name)));
  return [{ kolumna: 0, cel: { dom: true } },
    ...okna.map((e, i) => ({ kolumna: 1 + (i % 2), cel: { entity: e.entity_id, urzadzenie: e.device_id, wpis: h.devices[e.device_id]?.config_entries?.[0] } }))];
}

function pilnuj() {
  const m = WZOR.exec(location.pathname);
  if (!m || !customElements.get('motor-ha-urzadzenie')) return;
  const pg = strona(document), r = pg?.shadowRoot, h = pg?.hass;
  if (!r || !h) return;
  const kolumny = [...r.querySelectorAll('div.column')];
  if (!kolumny.length) return;
  const nasze = [...r.querySelectorAll(`[${ZNAK}]`)];
  const lista = cele(h, m[1]);
  const klucz = lista ? m[1] + '|' + kolumny.length + '|' + lista.map(x => x.cel.entity || 'dom').join() : '';
  if (nasze.length && nasze[0].getAttribute(ZNAK) !== klucz) { nasze.forEach(e => e.remove()); nasze.length = 0; }
  if (!lista) return;
  if (!nasze.length) {
    const ile = {};
    for (const { kolumna, cel } of lista) {
      const nr = Math.min(kolumna, kolumny.length - 1), k = kolumny[nr], i = ile[nr] || 0;
      const e = document.createElement('motor-ha-urzadzenie');
      e.setAttribute(ZNAK, klucz);
      e.cel = cel;
      e.hass = h;
      k.insertBefore(e, k.children[i] || null);
      ile[nr] = i + 1;
      nasze.push(e);
    }
  }
  for (const e of nasze) if (e.hass !== h) e.hass = h;
}

export function strony() {
  setInterval(() => { try { pilnuj(); } catch (e) { /* strona w trakcie rysowania */ } }, 700);
}
