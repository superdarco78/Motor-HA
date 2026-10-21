# 📝 Historia zmian

## v1.3.0 – Kreator z obrazkami, kalibracja, ikona

- 🏠 Ikona z logo Okno HA w „Dodaj integrację” i na liście integracji (Home Assistant 2026.3 i nowszy)
- 🖼️ Krok „Wygląd”: kafelki wszystkich 15 rodzajów osłon, próbki kolorów tkanin oraz kolory i okleiny ram. Do tego próbnik koloru na własny kolor osłony i ramy
- ⚙️ Krok „Silnik”: prędkość silnika wybiera się sama z urządzenia rolety, lista pokazuje tylko prędkości, a pod spodem widać wyliczony czas przejazdu
- 🤖 „Kalibruj teraz” w kreatorze i w „Konfiguruj” oraz przycisk **Kalibruj** na urządzeniu okna. Roleta jedzie w górę, w dół i w górę, a zmierzony czas zapisuje się sam
- 📝 Pod każdym polem jest krótki opis, co ono robi

## v1.2.1 – Okno aktualizacji jak w dodatkach HA

- 📊 W oknie aktualizacji widać „Zainstalowana wersja” i „Ostatnia wersja”, opis zmian, pasek postępu i kręcące się kółko na przycisku
- 💾 Opcja **Utwórz kopię zapasową** przed instalacją
- ✅ Po instalacji obie wersje są takie same, a przycisk znika. Strona z kartą sama przeładowuje się na nową wersję

## v1.2.0 – Aktualizacje w Ustawieniach, jednym kliknięciem

- 🔔 Nowe urządzenie **Okno HA** z dwiema aktualizacjami: karta i integracja. Nowa wersja pokazuje się sama w **Ustawienia → Aktualizacje** najpóźniej po 2 minutach od wydania
- ⬇️ Przycisk **Zainstaluj**: karta aktualizuje się od razu, bez restartu; integracja prosi tylko o restart HA
- 🔄 Karta ładuje się przez mały plik startowy, więc przeglądarka zawsze bierze nową wersję. Bez Ctrl+F5 i czyszczenia pamięci
- 🎴 Karta Okno HA v30 w środku

## v1.1.0 – Powiadomienie o nowej wersji

- 🔔 Gdy wyjdzie nowa wersja karty albo integracji, w HA samo pojawia się powiadomienie z przyciskiem do HACS (sprawdza co 30 minut, bez wchodzenia w HACS)
- 🔄 Karta v29 w środku: po aktualizacji wczytuje się sama, bez Ctrl+F5

## v1.0.1 – Karta v29: nowa wersja wczytuje się sama

- 🔄 Wbudowana karta Okno HA v29: po aktualizacji przeglądarka sama bierze nową wersję, bez Ctrl+F5 i czyszczenia pamięci
- 🔔 Nowe wersje integracji pokazują się w **Ustawienia → Aktualizacje** (przez HACS)
- ✅ Poprawione sprawdzenie HACS

## v1.0.0 – Pierwsza wersja

- 🪄 Kreator w **Ustawienia → Integracje → Dodaj integrację → Okno HA**: roleta, okno i czujniki, silnik, pogoda, wygląd
- 🪟 Każde okno to osobne urządzenie „Okno …” z jedną encją rolety (rusza oboma skrzydłami)
- ✏️ **Konfiguruj** zmienia każdą opcję później, a karta od razu to pokazuje
- 🎴 Karta Okno HA (v29) jest w środku – nie trzeba jej instalować osobno
