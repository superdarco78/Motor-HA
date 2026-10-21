/* 🪟 Motor HA – panel w menu bocznym HA.
   Lista okien z integracji (żywe karty) i kreator z kółkami i obrazkami – ten sam edytor co w karcie.
   Zmiany w edytorze okna z integracji karta sama zapisuje w urządzeniu (okno_ha/zapisz). */

const T = {
  pl: { tytul: 'Motor HA', dodaj: '➕ Dodaj okno', zmien: '✏️ Zmień', wroc: '← Wróć do listy', zapisz: '💾 Utwórz okno',
    puste: 'Nie masz jeszcze żadnego okna. Kliknij „Dodaj okno”, a kreator przeprowadzi Cię krok po kroku.',
    zapisano: 'Zmiany zapisują się same w urządzeniu okna.', nowe: 'Nowe okno – przejdź kreator, a na końcu kliknij „Utwórz okno”.',
    brak: 'Najpierw wybierz roletę w kroku 1.', ok: 'Gotowe – okno dodane jako urządzenie.', laduje: 'Wczytuję kartę Motor HA…' },
  en: { tytul: 'Motor HA', dodaj: '➕ Add window', zmien: '✏️ Edit', wroc: '← Back to the list', zapisz: '💾 Create window',
    puste: 'No windows yet. Click “Add window” and the wizard guides you step by step.',
    zapisano: 'Changes are saved to the window device automatically.', nowe: 'New window – go through the wizard, then click “Create window”.',
    brak: 'Pick the blind in step 1 first.', ok: 'Done – the window was added as a device.', laduje: 'Loading the Motor HA card…' },
  'de': {"tytul": "Motor HA", "dodaj": "➕ Fenster hinzufügen", "zmien": "✏️ Bearbeiten", "wroc": "← Zurück zur Liste", "zapisz": "💾 Fenster erstellen", "puste": "Noch keine Fenster. Klicke auf „Fenster hinzufügen“ – der Assistent führt dich Schritt für Schritt.", "zapisano": "Änderungen werden automatisch im Fenstergerät gespeichert.", "nowe": "Neues Fenster – geh den Assistenten durch und klicke am Ende auf „Fenster erstellen“.", "brak": "Wähle zuerst in Schritt 1 den Rollladen.", "ok": "Fertig – das Fenster wurde als Gerät hinzugefügt.", "laduje": "Motor HA-Karte wird geladen…"},
  'fr': {"tytul": "Motor HA", "dodaj": "➕ Ajouter une fenêtre", "zmien": "✏️ Modifier", "wroc": "← Retour à la liste", "zapisz": "💾 Créer la fenêtre", "puste": "Aucune fenêtre pour l’instant. Cliquez sur « Ajouter une fenêtre » et l’assistant vous guide pas à pas.", "zapisano": "Les modifications sont enregistrées automatiquement dans l’appareil de la fenêtre.", "nowe": "Nouvelle fenêtre – suivez l’assistant, puis cliquez sur « Créer la fenêtre ».", "brak": "Choisissez d’abord le volet à l’étape 1.", "ok": "Terminé – la fenêtre a été ajoutée comme appareil.", "laduje": "Chargement de la carte Motor HA…"},
  'es': {"tytul": "Motor HA", "dodaj": "➕ Añadir ventana", "zmien": "✏️ Editar", "wroc": "← Volver a la lista", "zapisz": "💾 Crear ventana", "puste": "Aún no hay ventanas. Pulsa «Añadir ventana» y el asistente te guía paso a paso.", "zapisano": "Los cambios se guardan automáticamente en el dispositivo de la ventana.", "nowe": "Ventana nueva – sigue el asistente y al final pulsa «Crear ventana».", "brak": "Primero elige la persiana en el paso 1.", "ok": "Listo – la ventana se añadió como dispositivo.", "laduje": "Cargando la tarjeta Motor HA…"},
  'it': {"tytul": "Motor HA", "dodaj": "➕ Aggiungi finestra", "zmien": "✏️ Modifica", "wroc": "← Torna all’elenco", "zapisz": "💾 Crea finestra", "puste": "Nessuna finestra ancora. Clicca «Aggiungi finestra» e la procedura guidata ti accompagna passo per passo.", "zapisano": "Le modifiche vengono salvate automaticamente nel dispositivo della finestra.", "nowe": "Nuova finestra – segui la procedura guidata e alla fine clicca «Crea finestra».", "brak": "Prima scegli la tapparella al passo 1.", "ok": "Fatto – la finestra è stata aggiunta come dispositivo.", "laduje": "Caricamento della scheda Motor HA…"},
  'nl': {"tytul": "Motor HA", "dodaj": "➕ Raam toevoegen", "zmien": "✏️ Bewerken", "wroc": "← Terug naar de lijst", "zapisz": "💾 Raam aanmaken", "puste": "Nog geen ramen. Klik op ‘Raam toevoegen’ en de wizard helpt je stap voor stap.", "zapisano": "Wijzigingen worden automatisch in het raamapparaat opgeslagen.", "nowe": "Nieuw raam – doorloop de wizard en klik aan het eind op ‘Raam aanmaken’.", "brak": "Kies eerst het rolluik in stap 1.", "ok": "Klaar – het raam is als apparaat toegevoegd.", "laduje": "Motor HA-kaart wordt geladen…"},
  'cs': {"tytul": "Motor HA", "dodaj": "➕ Přidat okno", "zmien": "✏️ Upravit", "wroc": "← Zpět na seznam", "zapisz": "💾 Vytvořit okno", "puste": "Zatím žádná okna. Klikni na „Přidat okno“ a průvodce tě provede krok za krokem.", "zapisano": "Změny se ukládají do zařízení okna automaticky.", "nowe": "Nové okno – projdi průvodce a na konci klikni na „Vytvořit okno“.", "brak": "Nejdřív v kroku 1 vyber roletu.", "ok": "Hotovo – okno bylo přidáno jako zařízení.", "laduje": "Načítám kartu Motor HA…"},
  'sk': {"tytul": "Motor HA", "dodaj": "➕ Pridať okno", "zmien": "✏️ Upraviť", "wroc": "← Späť na zoznam", "zapisz": "💾 Vytvoriť okno", "puste": "Zatiaľ žiadne okná. Klikni na „Pridať okno“ a sprievodca ťa prevedie krok za krokom.", "zapisano": "Zmeny sa ukladajú do zariadenia okna automaticky.", "nowe": "Nové okno – prejdi sprievodcu a na konci klikni na „Vytvoriť okno“.", "brak": "Najprv v kroku 1 vyber roletu.", "ok": "Hotovo – okno bolo pridané ako zariadenie.", "laduje": "Načítavam kartu Motor HA…"},
  'uk': {"tytul": "Motor HA", "dodaj": "➕ Додати вікно", "zmien": "✏️ Змінити", "wroc": "← Назад до списку", "zapisz": "💾 Створити вікно", "puste": "Вікон ще немає. Натисніть «Додати вікно», і майстер проведе вас крок за кроком.", "zapisano": "Зміни зберігаються в пристрої вікна автоматично.", "nowe": "Нове вікно – пройдіть майстер і наприкінці натисніть «Створити вікно».", "brak": "Спершу виберіть ролету на кроці 1.", "ok": "Готово – вікно додано як пристрій.", "laduje": "Завантаження картки Motor HA…"},
  'ru': {"tytul": "Motor HA", "dodaj": "➕ Добавить окно", "zmien": "✏️ Изменить", "wroc": "← Назад к списку", "zapisz": "💾 Создать окно", "puste": "Окон пока нет. Нажмите «Добавить окно», и мастер проведёт вас шаг за шагом.", "zapisano": "Изменения сохраняются в устройстве окна автоматически.", "nowe": "Новое окно – пройдите мастер и в конце нажмите «Создать окно».", "brak": "Сначала выберите рольставню на шаге 1.", "ok": "Готово – окно добавлено как устройство.", "laduje": "Загрузка карточки Motor HA…"},
  'pt': {"tytul": "Motor HA", "dodaj": "➕ Adicionar janela", "zmien": "✏️ Editar", "wroc": "← Voltar à lista", "zapisz": "💾 Criar janela", "puste": "Ainda não há janelas. Clique em «Adicionar janela» e o assistente guia você passo a passo.", "zapisano": "As alterações são guardadas automaticamente no dispositivo da janela.", "nowe": "Nova janela – siga o assistente e no fim clique em «Criar janela».", "brak": "Primeiro escolha a persiana no passo 1.", "ok": "Pronto – a janela foi adicionada como dispositivo.", "laduje": "A carregar o cartão Motor HA…"},
  'zh-hans': {"tytul": "Motor HA", "dodaj": "➕ 添加窗户", "zmien": "✏️ 编辑", "wroc": "← 返回列表", "zapisz": "💾 创建窗户", "puste": "还没有窗户。点击“添加窗户”，向导会一步一步带你完成。", "zapisano": "更改会自动保存到窗户设备。", "nowe": "新窗户 – 完成向导，最后点击“创建窗户”。", "brak": "请先在第 1 步选择卷帘。", "ok": "完成 – 窗户已作为设备添加。", "laduje": "正在加载 Motor HA 卡片…"},
  'ja': {"tytul": "Motor HA", "dodaj": "➕ 窓を追加", "zmien": "✏️ 編集", "wroc": "← 一覧に戻る", "zapisz": "💾 窓を作成", "puste": "まだ窓がありません。「窓を追加」をクリックすると、ウィザードが一歩ずつ案内します。", "zapisano": "変更は窓のデバイスに自動で保存されます。", "nowe": "新しい窓 – ウィザードを進め、最後に「窓を作成」をクリックしてください。", "brak": "まずステップ 1 でシャッターを選んでください。", "ok": "完了 – 窓をデバイスとして追加しました。", "laduje": "Motor HA カードを読み込み中…"},
};

class OknoHaPanel extends HTMLElement {
  set hass(h) {
    const pierwszy = !this._hass; this._hass = h;
    if (pierwszy) this._start();
    this.querySelectorAll('okno-ha, okno-ha-editor, ha-menu-button').forEach(e => { e.hass = h; });
  }
  set narrow(n) { this._narrow = n; const mb = this.querySelector('ha-menu-button'); if (mb) mb.narrow = n; }
  set panel(p) { this._panel = p; }
  get L() {
    // język z profilu HA; brak tłumaczenia → angielski
    const k = String(this._hass?.locale?.language || this._hass?.language || 'pl').toLowerCase().replace('_', '-'), p = k.split('-')[0];
    return T[k] || T[p] || (p === 'zh' && T['zh-hans']) || T.en;
  }

  async _start() {
    this.innerHTML = `<style>
      okno-ha-panel{display:block;background:var(--primary-background-color);min-height:100vh}
      .gora{display:flex;align-items:center;gap:12px;height:56px;padding:0 12px;background:var(--app-header-background-color,var(--primary-color));color:var(--app-header-text-color,#fff);font-size:20px}
      .gora img{width:32px;height:32px}
      .tresc{max-width:1100px;margin:0 auto;padding:16px}
      .pasek{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:16px}
      .pasek button,.okno button{font:inherit;font-size:15px;padding:10px 16px;border-radius:var(--ha-card-border-radius,12px);border:0;cursor:pointer;background:var(--primary-color);color:var(--text-primary-color,#fff)}
      .pasek button.drugi{background:var(--secondary-background-color);color:var(--primary-text-color)}
      .siatka{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
      .okno{display:flex;flex-direction:column;gap:8px}
      .info{padding:12px 16px;border-radius:var(--ha-card-border-radius,12px);background:var(--card-background-color);color:var(--primary-text-color);border-left:4px solid var(--primary-color)}
    </style>
    <div class="gora"><ha-menu-button></ha-menu-button><img src="/okno_ha/ikona.png" alt=""><span>${this.L.tytul}</span></div>
    <div class="tresc"><p class="info">${this.L.laduje}</p></div>`;
    const mb = this.querySelector('ha-menu-button'); mb.hass = this._hass; mb.narrow = this._narrow;
    if (!customElements.get('okno-ha-editor')) {
      await Promise.race([customElements.whenDefined('okno-ha-editor'), new Promise(r => setTimeout(r, 3000))]);
      if (!customElements.get('okno-ha-editor')) await import(`/okno_ha/okno-ha.js?t=${Date.now()}`);
    }
    const okno = new URLSearchParams(location.search).get('okno');
    await this._lista();
    if (okno) { const w = this._okna.find(x => x.entry_id === okno); if (w) this._edytuj(w); }
  }

  get _tresc() { return this.querySelector('.tresc'); }

  async _lista() {
    this._okna = await this._hass.callWS({ type: 'okno_ha/lista' });
    const t = this._tresc; t.innerHTML = '';
    const pasek = document.createElement('div'); pasek.className = 'pasek';
    const dodaj = document.createElement('button'); dodaj.textContent = this.L.dodaj; dodaj.onclick = () => this._nowe();
    pasek.append(dodaj); t.append(pasek);
    if (!this._okna.length) { t.insertAdjacentHTML('beforeend', `<p class="info">${this.L.puste}</p>`); return; }
    const siatka = document.createElement('div'); siatka.className = 'siatka'; t.append(siatka);
    for (const w of this._okna) {
      if (!w.entity_id) continue;
      const box = document.createElement('div'); box.className = 'okno';
      const karta = document.createElement('okno-ha');
      karta.setConfig({ type: 'custom:okno-ha', entity: w.entity_id }); karta.hass = this._hass;
      const b = document.createElement('button'); b.textContent = `${this.L.zmien} – ${w.nazwa}`; b.onclick = () => this._edytuj(w);
      box.append(karta, b); siatka.append(box);
    }
  }

  _pasekPowrotu(extra) {
    const t = this._tresc; t.innerHTML = '';
    const pasek = document.createElement('div'); pasek.className = 'pasek';
    const wroc = document.createElement('button'); wroc.className = 'drugi'; wroc.textContent = this.L.wroc;
    wroc.onclick = () => { history.replaceState(null, '', location.pathname); this._lista(); };
    pasek.append(wroc, ...(extra || [])); t.append(pasek);
    return t;
  }

  /* okno z integracji: zwykły edytor karty – sam zapisuje każdą zmianę w urządzeniu */
  _edytuj(w) {
    const t = this._pasekPowrotu();
    t.insertAdjacentHTML('beforeend', `<p class="info">${this.L.zapisano}</p>`);
    const ed = document.createElement('okno-ha-editor');
    ed.hass = this._hass; ed.setConfig({ type: 'custom:okno-ha', entity: w.entity_id });
    t.append(ed);
  }

  /* nowe okno: kreator karty od kroku 1, na końcu „Utwórz okno” */
  _nowe() {
    let cfg = { type: 'custom:okno-ha' };
    const zapisz = document.createElement('button'); zapisz.textContent = this.L.zapisz;
    const t = this._pasekPowrotu([zapisz]);
    const info = document.createElement('p'); info.className = 'info'; info.textContent = this.L.nowe; t.append(info);
    const ed = document.createElement('okno-ha-editor');
    ed.hass = this._hass; ed.setConfig(cfg);
    ed.addEventListener('config-changed', e => { cfg = e.detail.config; });
    t.append(ed);
    zapisz.onclick = async () => {
      if (!String(cfg.entity || '').startsWith('cover.')) { info.textContent = this.L.brak; return; }
      zapisz.disabled = true;
      try {
        await this._hass.callWS({ type: 'okno_ha/utworz', karta: cfg });
        info.textContent = this.L.ok; setTimeout(() => this._lista(), 1200);
      } catch (e) { info.textContent = e.message || String(e); zapisz.disabled = false; }
    };
  }
}
if (!customElements.get('okno-ha-panel')) customElements.define('okno-ha-panel', OknoHaPanel);
