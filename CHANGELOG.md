# 📝 Historia zmian

## v1.4.5 – Jedna aktualizacja i krok wstecz

- 🔄 W Ustawieniach → Aktualizacje jest już tylko jedna pozycja **Okno HA** z jednym numerem wersji. Karta jest w środku integracji i aktualizuje się razem z nią. Stara osobna pozycja „v32” znika sama
- ⬅️ Kreator ma na każdym kroku (od drugiego) przełącznik **Wróć do poprzedniego kroku**. Wpisane wartości zostają
- 🎨 Obrazki w kreatorze (pasek kroków, kolory, ramy, osłony) mają przezroczyste tło, więc pasują do ciemnego i jasnego motywu

## v1.4.4 – Szybka aktualizacja i duży podgląd

- ⚡ Aktualizacja Okna HA nie ma już przełącznika „Utwórz kopię zapasową”. Okno HA podmienia tylko swoje pliki, więc instaluje się od razu
- 🔁 Po pobraniu nowej wersji integracji w Ustawieniach pojawia się po polsku „Okno HA pobrane – uruchom ponownie HA” z przyciskiem **Napraw**, który robi restart
- 🖥️ Karta Okno HA v32 w środku: edytor na szerokim ekranie ma dwie kolumny z dużym, przyklejonym podglądem, a kółka kolorów pokazują prawdziwe kolory, bez suwaka

## v1.4.3 – Karta sama na panelu

- 📋 Ostatni krok kreatora „Dodaj integrację” ma pole **Dodaj kartę okna na panel**. Karta okna sama pojawia się na wybranym panelu, w sekcji „🪟 Okna”, z wszystkimi ustawieniami z kreatora. Podpowiada panel, na którym już są okna
- 🛡️ Nic na panelu nie jest usuwane ani zmieniane, karta jest tylko dokładana. Panele YAML i automatyczny „Przegląd” zostają nietknięte

## v1.4.2 – Bez dodatkowej pozycji w menu bocznym

- 🧹 Kreator okna nie dodaje już pozycji „Okno HA” w menu bocznym
- ⚙️ Na stronie urządzenia okna jest link **Ustawienia okna**. Otwiera kreator z 7 kółkami dla tego okna. „Konfiguruj” → kreator z kółkami działa jak dotąd
- 🎴 Karta Okno HA na panelu potrzebuje tylko wybrania okna. Wszystkie ustawienia bierze z integracji

## v1.4.1 – Aktualizacja nie czeka na chmurę

- ⏱️ Z włączoną kopią zapasową aktualizacja czeka najwyżej 4 minuty. Kopia na dysku jest wtedy gotowa, a wysyłanie jej do chmury (OneDrive, Nabu Casa) kończy się w tle. Wcześniej pasek mógł stać bardzo długo

## v1.4.0 – Kreator z kółkami jak w karcie

- 🪟 Nowy panel **Okno HA** w menu bocznym. Są w nim wszystkie okna jako żywe karty, a „Dodaj okno” i „Zmień” otwierają ten sam kreator z 7 kółkami co w karcie
- 🪄 **Konfiguruj** pyta: kreator z kółkami i obrazkami albo zwykłe pola
- 🔗 Zmiany w edytorze karty okna zapisują się same w urządzeniu
- ➕ „Dodaj do panelu” na stronie urządzenia proponuje kartę Okno HA (HA 2026.6+)
- 🧭 Zwykły kreator „Dodaj integrację” ma na każdym kroku pasek z kółkami jak w karcie
- 🏠 Ikona Okno HA także przy aktualizacjach
- 📊 Pasek postępu aktualizacji przesuwa się w trakcie kopii zapasowej; gdy HACS nie zna jeszcze nowej wersji, integracja pobiera ją sama
- 🎴 Karta Okno HA v31 w środku

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
