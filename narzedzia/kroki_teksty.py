"""Teksty instrukcji „krok po kroku” z obrazkami (instalacja i kreator) w 5 językach README.

Obrazki: img/kroki/<język>/<nazwa>-jasny.webp i -ciemny.webp (zrzuty z HA z pomarańczowymi zaznaczeniami).
Każdy krok instalacji: (obrazek, przycisk My HA (hacs/dodaj/restart/panel) albo None, tytuł, co kliknąć – lista, uwaga albo "").
"""
from __future__ import annotations

# kroki kreatora na obrazkach (tryb podstawowy; okno z czujnikiem i pogodą) – w tej kolejności są zrzuty krok-01…12
KROKI_ZRZUTY = ["tryb", "mam", "urzadzenie", "rodzaj", "kolory", "okno", "czujniki", "silnik", "pogoda",
                "automatyka", "powiadomienia", "panel"]

K = {
    "pl": {
        "poprzedni": "Poprzedni", "nastepny": "Następny",
        "guzik_restart": "Otwórz System w HA", "guzik_panel": "Otwórz panele w HA",
        "co_kliknac": "Co kliknąć:",
        "dalej": "Dalej", "zatwierdz": "Zatwierdź",
        "instalacja": [
            ("hacs-1", "hacs", "Kliknij przycisk, potem „Otwórz link”", ["<b>Otwórz link</b>"],
             "Za pierwszym razem strona zapyta o adres Twojego Home Assistant."),
            ("hacs-2", None, "Dodaj repozytorium do HACS", ["<b>Dodaj</b>"], ""),
            ("hacs-3", None, "Pobierz Motor HA", ["<b>Pobierz</b> na dole po prawej", "<b>Pobierz</b> w okienku"], ""),
            ("restart", "restart", "Uruchom ponownie Home Assistant",
             ["Ikona <b>⏻</b> w prawym górnym rogu (<b>Ustawienia → System</b>)", "<b>Uruchom ponownie Home Assistanta</b> i potwierdź"],
             "Odczekaj 1–2 minuty."),
            ("start", "dodaj", "Kliknij przycisk i zacznij kreator", ["<b>OK</b>"], ""),
            (None, None, "Przejdź kreator", [], "Każdy krok kreatora z obrazkiem jest niżej, w części „Kreator krok po kroku”."),
            ("panel", "panel", "Gotowe: karta jest na panelu", [], "Karta Motor HA sama pojawia się na panelu wybranym w ostatnim kroku."),
        ],
        "kreator_obrazki": "Każdy krok z obrazkiem",
        "kreator_klik": "Wybierz albo wpisz to, o co pyta krok",
    },
    "en": {
        "poprzedni": "Previous", "nastepny": "Next",
        "guzik_restart": "Open System in HA", "guzik_panel": "Open dashboards in HA",
        "co_kliknac": "What to click:",
        "dalej": "Next", "zatwierdz": "Submit",
        "instalacja": [
            ("hacs-1", "hacs", "Click the button, then “Open link”", ["<b>Open link</b>"],
             "The first time, the page asks for the address of your Home Assistant."),
            ("hacs-2", None, "Add the repository to HACS", ["<b>Add</b>"], ""),
            ("hacs-3", None, "Download Motor HA", ["<b>Download</b> at the bottom right", "<b>Download</b> in the dialog"], ""),
            ("restart", "restart", "Restart Home Assistant",
             ["The <b>⏻</b> icon in the top right corner (<b>Settings → System</b>)", "<b>Restart Home Assistant</b> and confirm"],
             "Wait 1–2 minutes."),
            ("start", "dodaj", "Click the button and start the wizard", ["<b>OK</b>"], ""),
            (None, None, "Go through the wizard", [], "Every wizard step with a picture is below, in “Wizard step by step”."),
            ("panel", "panel", "Done: the card is on the dashboard", [], "The Motor HA card appears by itself on the dashboard chosen in the last step."),
        ],
        "kreator_obrazki": "Every step with a picture",
        "kreator_klik": "Choose or type what the step asks for",
    },
    "de": {
        "poprzedni": "Zurück", "nastepny": "Weiter",
        "guzik_restart": "System in HA öffnen", "guzik_panel": "Dashboards in HA öffnen",
        "co_kliknac": "Was klicken:",
        "dalej": "Weiter", "zatwierdz": "OK",
        "instalacja": [
            ("hacs-1", "hacs", "Auf den Button klicken, dann „Link öffnen”", ["<b>Link öffnen</b>"],
             "Beim ersten Mal fragt die Seite nach der Adresse deines Home Assistant."),
            ("hacs-2", None, "Repository zu HACS hinzufügen", ["<b>Hinzufügen</b>"], ""),
            ("hacs-3", None, "Motor HA herunterladen", ["<b>Herunterladen</b> unten rechts", "<b>Herunterladen</b> im Dialog"], ""),
            ("restart", "restart", "Home Assistant neu starten",
             ["Das Symbol <b>⏻</b> oben rechts (<b>Einstellungen → System</b>)", "<b>Home Assistant neu starten</b> und bestätigen"],
             "1–2 Minuten warten."),
            ("start", "dodaj", "Auf den Button klicken und den Assistenten starten", ["<b>OK</b>"], ""),
            (None, None, "Den Assistenten durchgehen", [], "Jeder Schritt mit Bild steht weiter unten unter „Assistent Schritt für Schritt”."),
            ("panel", "panel", "Fertig: die Karte ist im Dashboard", [], "Die Motor-HA-Karte erscheint von selbst im Dashboard aus dem letzten Schritt."),
        ],
        "kreator_obrazki": "Jeder Schritt mit Bild",
        "kreator_klik": "Auswählen oder eingeben, was der Schritt fragt",
    },
    "fr": {
        "poprzedni": "Précédent", "nastepny": "Suivant",
        "guzik_restart": "Ouvrir Système dans HA", "guzik_panel": "Ouvrir les tableaux de bord dans HA",
        "co_kliknac": "Où cliquer :",
        "dalej": "Suivant", "zatwierdz": "Valider",
        "instalacja": [
            ("hacs-1", "hacs", "Cliquez sur le bouton, puis « Ouvrir le lien »", ["<b>Ouvrir le lien</b>"],
             "La première fois, la page demande l’adresse de votre Home Assistant."),
            ("hacs-2", None, "Ajoutez le dépôt à HACS", ["<b>Ajouter</b>"], ""),
            ("hacs-3", None, "Téléchargez Motor HA", ["<b>Télécharger</b> en bas à droite", "<b>Télécharger</b> dans la fenêtre"], ""),
            ("restart", "restart", "Redémarrez Home Assistant",
             ["L’icône <b>⏻</b> en haut à droite (<b>Paramètres → Système</b>)", "<b>Redémarrer Home Assistant</b> et confirmer"],
             "Attendez 1 à 2 minutes."),
            ("start", "dodaj", "Cliquez sur le bouton et lancez l’assistant", ["<b>OK</b>"], ""),
            (None, None, "Suivez l’assistant", [], "Chaque étape avec une image se trouve plus bas, dans « L’assistant pas à pas »."),
            ("panel", "panel", "Terminé : la carte est sur le tableau de bord", [], "La carte Motor HA apparaît toute seule sur le tableau de bord choisi à la dernière étape."),
        ],
        "kreator_obrazki": "Chaque étape en image",
        "kreator_klik": "Choisissez ou saisissez ce que demande l’étape",
    },
    "cs": {
        "poprzedni": "Předchozí", "nastepny": "Další",
        "guzik_restart": "Otevřít Systém v HA", "guzik_panel": "Otevřít panely v HA",
        "co_kliknac": "Co kliknout:",
        "dalej": "Další", "zatwierdz": "Odeslat",
        "instalacja": [
            ("hacs-1", "hacs", "Klikněte na tlačítko, pak „Otevřít odkaz”", ["<b>Otevřít odkaz</b>"],
             "Poprvé se stránka zeptá na adresu vašeho Home Assistantu."),
            ("hacs-2", None, "Přidejte repozitář do HACS", ["<b>Přidat</b>"], ""),
            ("hacs-3", None, "Stáhněte Motor HA", ["<b>Stáhnout</b> vpravo dole", "<b>Stáhnout</b> v okně"], ""),
            ("restart", "restart", "Restartujte Home Assistant",
             ["Ikona <b>⏻</b> vpravo nahoře (<b>Nastavení → Systém</b>)", "<b>Restartovat Home Assistanta</b> a potvrdit"],
             "Počkejte 1–2 minuty."),
            ("start", "dodaj", "Klikněte na tlačítko a spusťte průvodce", ["<b>OK</b>"], ""),
            (None, None, "Projděte průvodce", [], "Každý krok s obrázkem je níže v části „Průvodce krok za krokem”."),
            ("panel", "panel", "Hotovo: karta je na panelu", [], "Karta Motor HA se sama objeví na panelu vybraném v posledním kroku."),
        ],
        "kreator_obrazki": "Každý krok s obrázkem",
        "kreator_klik": "Vyberte nebo zadejte, na co se krok ptá",
    },
}

# „Jak to zrobić” przy działach README: przycisk My HA + kroki klik po kroku (dla kogoś, kto nie zna HA)
JAK = {
    "pl": {
        "tytul": "Jak to zrobić",
        "motor": "Otwórz Motor HA w HA", "aktualizacje": "Otwórz Aktualizacje w HA", "panele": "Otwórz panele w HA",
        "konfiguruj": ["Kliknij przycisk wyżej.", "Przy swoim urządzeniu kliknij <b>⚙ Konfiguruj</b>.",
                       "Przejdź kroki tak jak w kreatorze i na końcu kliknij <b>Zatwierdź</b>."],
        "automatyka": "Funkcje włączasz w kroku <b>Automatyka</b>, a godziny i progi zmieniasz w kroku <b>Ustawienia</b> (tryb zaawansowany). "
                      "W trybie podstawowym wszystko ma gotowe wartości.",
        "powiadomienia": "Rodzaje powiadomień wybierasz w kroku <b>Powiadomienia</b>.",
        "encje": "Kliknij urządzenie na liście Motor HA. Na górze jego strony jest żywa karta okna, pod nią <b>Dodaj do panelu</b>, <b>⚙ Zmień ustawienia</b> (otwiera kreator tego urządzenia) i opis ustawień. Urządzenie <b>Motor HA</b> pokazuje karty wszystkich urządzeń naraz.",
        "dom": ["Kliknij przycisk i otwórz swój panel.", "Kliknij <b>✏️ Edytuj panel</b>, potem <b>+ Dodaj kartę</b>.",
                "Wpisz „Motor HA” i wybierz <b>Motor HA – cały dom</b>, potem <b>Zapisz</b>."],
        "aktualizacja": ["Kliknij przycisk.", "Kliknij <b>Motor HA</b>, potem <b>Aktualizuj</b>.", "Po aktualizacji kliknij <b>Uruchom ponownie</b>."],
    },
    "en": {
        "tytul": "How to do it",
        "motor": "Open Motor HA in HA", "aktualizacje": "Open Updates in HA", "panele": "Open dashboards in HA",
        "konfiguruj": ["Click the button above.", "Next to your device, click <b>⚙ Configure</b>.",
                       "Go through the steps like in the wizard and click <b>Submit</b> at the end."],
        "automatyka": "You turn functions on in the <b>Automation</b> step and change times and limits in the <b>Settings</b> step (advanced mode). "
                      "In basic mode everything has ready values.",
        "powiadomienia": "You choose the kinds of notifications in the <b>Notifications</b> step.",
        "encje": "Click the device in the Motor HA list. At the top of its page there is a live window card, below it <b>Add to dashboard</b>, <b>⚙ Change settings</b> (opens the wizard of this device) and a summary of the settings. The <b>Motor HA</b> device shows the cards of all devices at once.",
        "dom": ["Click the button and open your dashboard.", "Click <b>✏️ Edit dashboard</b>, then <b>+ Add card</b>.",
                "Type “Motor HA”, choose <b>Motor HA – whole home</b>, then <b>Save</b>."],
        "aktualizacja": ["Click the button.", "Click <b>Motor HA</b>, then <b>Update</b>.", "After the update click <b>Restart</b>."],
    },
    "de": {
        "tytul": "So geht’s",
        "motor": "Motor HA in HA öffnen", "aktualizacje": "Updates in HA öffnen", "panele": "Dashboards in HA öffnen",
        "konfiguruj": ["Auf den Button oben klicken.", "Beim Gerät auf <b>⚙ Konfigurieren</b> klicken.",
                       "Die Schritte wie im Assistenten durchgehen und am Ende auf <b>OK</b> klicken."],
        "automatyka": "Funktionen schaltest du im Schritt <b>Automatik</b> ein, Zeiten und Grenzwerte änderst du im Schritt <b>Einstellungen</b> (erweiterter Modus). "
                      "Im Basismodus hat alles fertige Werte.",
        "powiadomienia": "Die Arten von Benachrichtigungen wählst du im Schritt <b>Benachrichtigungen</b>.",
        "encje": "Klicke in der Motor-HA-Liste auf das Gerät. Oben auf seiner Seite ist eine Live-Karte des Fensters, darunter <b>Zum Dashboard hinzufügen</b>, <b>⚙ Einstellungen ändern</b> (öffnet den Assistenten dieses Geräts) und eine Übersicht der Einstellungen. Das Gerät <b>Motor HA</b> zeigt die Karten aller Geräte auf einmal.",
        "dom": ["Auf den Button klicken und dein Dashboard öffnen.", "<b>✏️ Dashboard bearbeiten</b>, dann <b>+ Karte hinzufügen</b>.",
                "„Motor HA“ eingeben, <b>Motor HA – ganzes Haus</b> wählen, dann <b>Speichern</b>."],
        "aktualizacja": ["Auf den Button klicken.", "Auf <b>Motor HA</b> klicken, dann auf <b>Aktualisieren</b>.", "Nach dem Update auf <b>Neu starten</b> klicken."],
    },
    "fr": {
        "tytul": "Comment faire",
        "motor": "Ouvrir Motor HA dans HA", "aktualizacje": "Ouvrir les mises à jour dans HA", "panele": "Ouvrir les tableaux de bord dans HA",
        "konfiguruj": ["Cliquez sur le bouton ci-dessus.", "À côté de votre appareil, cliquez sur <b>⚙ Configurer</b>.",
                       "Suivez les étapes comme dans l’assistant et cliquez sur <b>Valider</b> à la fin."],
        "automatyka": "Vous activez les fonctions à l’étape <b>Automatisme</b> et modifiez les heures et les seuils à l’étape <b>Réglages</b> (mode avancé). "
                      "En mode simple, tout a des valeurs prêtes.",
        "powiadomienia": "Vous choisissez les types de notifications à l’étape <b>Notifications</b>.",
        "encje": "Cliquez sur l’appareil dans la liste Motor HA. En haut de sa page se trouve une carte vivante de la fenêtre, en dessous <b>Ajouter au tableau de bord</b>, <b>⚙ Modifier les réglages</b> (ouvre l’assistant de cet appareil) et un résumé des réglages. L’appareil <b>Motor HA</b> montre les cartes de tous les appareils à la fois.",
        "dom": ["Cliquez sur le bouton et ouvrez votre tableau de bord.", "Cliquez sur <b>✏️ Modifier le tableau de bord</b>, puis <b>+ Ajouter une carte</b>.",
                "Tapez « Motor HA », choisissez <b>Motor HA – toute la maison</b>, puis <b>Enregistrer</b>."],
        "aktualizacja": ["Cliquez sur le bouton.", "Cliquez sur <b>Motor HA</b>, puis <b>Mettre à jour</b>.", "Après la mise à jour, cliquez sur <b>Redémarrer</b>."],
    },
    "cs": {
        "tytul": "Jak na to",
        "motor": "Otevřít Motor HA v HA", "aktualizacje": "Otevřít Aktualizace v HA", "panele": "Otevřít panely v HA",
        "konfiguruj": ["Klikněte na tlačítko výše.", "U svého zařízení klikněte na <b>⚙ Nastavit</b>.",
                       "Projděte kroky jako v průvodci a na konci klikněte na <b>Odeslat</b>."],
        "automatyka": "Funkce zapnete v kroku <b>Automatika</b>, časy a limity změníte v kroku <b>Nastavení</b> (pokročilý režim). "
                      "V základním režimu má vše připravené hodnoty.",
        "powiadomienia": "Druhy oznámení vyberete v kroku <b>Oznámení</b>.",
        "encje": "Klikněte na zařízení v seznamu Motor HA. Nahoře na jeho stránce je živá karta okna, pod ní <b>Přidat na panel</b>, <b>⚙ Změnit nastavení</b> (otevře průvodce tohoto zařízení) a přehled nastavení. Zařízení <b>Motor HA</b> ukazuje karty všech zařízení najednou.",
        "dom": ["Klikněte na tlačítko a otevřete svůj panel.", "Klikněte na <b>✏️ Upravit panel</b>, pak <b>+ Přidat kartu</b>.",
                "Napište „Motor HA“, vyberte <b>Motor HA – celý dům</b>, pak <b>Uložit</b>."],
        "aktualizacja": ["Klikněte na tlačítko.", "Klikněte na <b>Motor HA</b>, pak na <b>Aktualizovat</b>.", "Po aktualizaci klikněte na <b>Restartovat</b>."],
    },
}
