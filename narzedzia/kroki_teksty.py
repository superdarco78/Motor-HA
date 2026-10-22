"""Teksty instrukcji „krok po kroku” z obrazkami (instalacja i kreator) w 5 językach README.

Obrazki: img/kroki/<język>/<nazwa>-jasny.webp i -ciemny.webp (zrzuty z HA z pomarańczowymi zaznaczeniami).
Każdy krok instalacji: (obrazek, przycisk My HA albo None, tytuł, co kliknąć – lista, uwaga albo "").
"""
from __future__ import annotations

# kroki kreatora na obrazkach (tryb podstawowy; okno z czujnikiem i pogodą) – w tej kolejności są zrzuty krok-01…12
KROKI_ZRZUTY = ["tryb", "mam", "urzadzenie", "rodzaj", "kolory", "okno", "czujniki", "silnik", "pogoda",
                "automatyka", "powiadomienia", "panel"]

K = {
    "pl": {
        "co_kliknac": "Co kliknąć:",
        "dalej": "Dalej", "zatwierdz": "Zatwierdź",
        "instalacja": [
            ("hacs-1", "hacs", "Kliknij przycisk, potem „Otwórz link”", ["<b>Otwórz link</b>"],
             "Za pierwszym razem strona zapyta o adres Twojego Home Assistant."),
            ("hacs-2", None, "Dodaj repozytorium do HACS", ["<b>Dodaj</b>"], ""),
            ("hacs-3", None, "Pobierz Motor HA", ["<b>Pobierz</b> na dole po prawej", "<b>Pobierz</b> w okienku"], ""),
            ("restart", None, "Uruchom ponownie Home Assistant",
             ["Ikona <b>⏻</b> w prawym górnym rogu (<b>Ustawienia → System</b>)", "<b>Uruchom ponownie Home Assistanta</b> i potwierdź"],
             "Odczekaj 1–2 minuty."),
            ("start", "dodaj", "Kliknij przycisk i zacznij kreator", ["<b>OK</b>"], ""),
            (None, None, "Przejdź kreator", [], "Każdy krok kreatora z obrazkiem jest niżej, w części „Kreator krok po kroku”."),
            ("panel", None, "Gotowe: karta jest na panelu", [], "Karta Motor HA sama pojawia się na panelu wybranym w ostatnim kroku."),
        ],
        "kreator_obrazki": "Każdy krok z obrazkiem",
        "kreator_klik": "Wybierz albo wpisz to, o co pyta krok",
    },
    "en": {
        "co_kliknac": "What to click:",
        "dalej": "Next", "zatwierdz": "Submit",
        "instalacja": [
            ("hacs-1", "hacs", "Click the button, then “Open link”", ["<b>Open link</b>"],
             "The first time, the page asks for the address of your Home Assistant."),
            ("hacs-2", None, "Add the repository to HACS", ["<b>Add</b>"], ""),
            ("hacs-3", None, "Download Motor HA", ["<b>Download</b> at the bottom right", "<b>Download</b> in the dialog"], ""),
            ("restart", None, "Restart Home Assistant",
             ["The <b>⏻</b> icon in the top right corner (<b>Settings → System</b>)", "<b>Restart Home Assistant</b> and confirm"],
             "Wait 1–2 minutes."),
            ("start", "dodaj", "Click the button and start the wizard", ["<b>OK</b>"], ""),
            (None, None, "Go through the wizard", [], "Every wizard step with a picture is below, in “Wizard step by step”."),
            ("panel", None, "Done: the card is on the dashboard", [], "The Motor HA card appears by itself on the dashboard chosen in the last step."),
        ],
        "kreator_obrazki": "Every step with a picture",
        "kreator_klik": "Choose or type what the step asks for",
    },
    "de": {
        "co_kliknac": "Was klicken:",
        "dalej": "Weiter", "zatwierdz": "OK",
        "instalacja": [
            ("hacs-1", "hacs", "Auf den Button klicken, dann „Link öffnen”", ["<b>Link öffnen</b>"],
             "Beim ersten Mal fragt die Seite nach der Adresse deines Home Assistant."),
            ("hacs-2", None, "Repository zu HACS hinzufügen", ["<b>Hinzufügen</b>"], ""),
            ("hacs-3", None, "Motor HA herunterladen", ["<b>Herunterladen</b> unten rechts", "<b>Herunterladen</b> im Dialog"], ""),
            ("restart", None, "Home Assistant neu starten",
             ["Das Symbol <b>⏻</b> oben rechts (<b>Einstellungen → System</b>)", "<b>Home Assistant neu starten</b> und bestätigen"],
             "1–2 Minuten warten."),
            ("start", "dodaj", "Auf den Button klicken und den Assistenten starten", ["<b>OK</b>"], ""),
            (None, None, "Den Assistenten durchgehen", [], "Jeder Schritt mit Bild steht weiter unten unter „Assistent Schritt für Schritt”."),
            ("panel", None, "Fertig: die Karte ist im Dashboard", [], "Die Motor-HA-Karte erscheint von selbst im Dashboard aus dem letzten Schritt."),
        ],
        "kreator_obrazki": "Jeder Schritt mit Bild",
        "kreator_klik": "Auswählen oder eingeben, was der Schritt fragt",
    },
    "fr": {
        "co_kliknac": "Où cliquer :",
        "dalej": "Suivant", "zatwierdz": "Valider",
        "instalacja": [
            ("hacs-1", "hacs", "Cliquez sur le bouton, puis « Ouvrir le lien »", ["<b>Ouvrir le lien</b>"],
             "La première fois, la page demande l’adresse de votre Home Assistant."),
            ("hacs-2", None, "Ajoutez le dépôt à HACS", ["<b>Ajouter</b>"], ""),
            ("hacs-3", None, "Téléchargez Motor HA", ["<b>Télécharger</b> en bas à droite", "<b>Télécharger</b> dans la fenêtre"], ""),
            ("restart", None, "Redémarrez Home Assistant",
             ["L’icône <b>⏻</b> en haut à droite (<b>Paramètres → Système</b>)", "<b>Redémarrer Home Assistant</b> et confirmer"],
             "Attendez 1 à 2 minutes."),
            ("start", "dodaj", "Cliquez sur le bouton et lancez l’assistant", ["<b>OK</b>"], ""),
            (None, None, "Suivez l’assistant", [], "Chaque étape avec une image se trouve plus bas, dans « L’assistant pas à pas »."),
            ("panel", None, "Terminé : la carte est sur le tableau de bord", [], "La carte Motor HA apparaît toute seule sur le tableau de bord choisi à la dernière étape."),
        ],
        "kreator_obrazki": "Chaque étape en image",
        "kreator_klik": "Choisissez ou saisissez ce que demande l’étape",
    },
    "cs": {
        "co_kliknac": "Co kliknout:",
        "dalej": "Další", "zatwierdz": "Odeslat",
        "instalacja": [
            ("hacs-1", "hacs", "Klikněte na tlačítko, pak „Otevřít odkaz”", ["<b>Otevřít odkaz</b>"],
             "Poprvé se stránka zeptá na adresu vašeho Home Assistantu."),
            ("hacs-2", None, "Přidejte repozitář do HACS", ["<b>Přidat</b>"], ""),
            ("hacs-3", None, "Stáhněte Motor HA", ["<b>Stáhnout</b> vpravo dole", "<b>Stáhnout</b> v okně"], ""),
            ("restart", None, "Restartujte Home Assistant",
             ["Ikona <b>⏻</b> vpravo nahoře (<b>Nastavení → Systém</b>)", "<b>Restartovat Home Assistanta</b> a potvrdit"],
             "Počkejte 1–2 minuty."),
            ("start", "dodaj", "Klikněte na tlačítko a spusťte průvodce", ["<b>OK</b>"], ""),
            (None, None, "Projděte průvodce", [], "Každý krok s obrázkem je níže v části „Průvodce krok za krokem”."),
            ("panel", None, "Hotovo: karta je na panelu", [], "Karta Motor HA se sama objeví na panelu vybraném v posledním kroku."),
        ],
        "kreator_obrazki": "Každý krok s obrázkem",
        "kreator_klik": "Vyberte nebo zadejte, na co se krok ptá",
    },
}
