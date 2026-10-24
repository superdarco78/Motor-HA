# 📝 Historia zmian

## v2.2.16 – Podgląd po lewej, ustawienia po prawej
- 🪟 Osłona na szybie wygląda jak na kafelku: zdjęcie w swoich proporcjach, bez rozciągania (paski dzień-noc, plisy i lamele w tej samej gęstości co na kafelku), w kreatorze i na karcie
- 🔄 Aplikacja HA na telefonie: po aktualizacji sama wczytuje nową wersję przy powrocie do aplikacji, także gdy kreator był otwarty (wcześniej mogła zostać stara karta z rysunkami)

- ↔️ Kreator na komputerze: duże zdjęcie okna po lewej stronie, wybór i ustawienia po prawej

## v2.2.15 – Wszystko ze zdjęć z Canvy

- 🪟 Kreator: od kroku „Układ” do „Gotowe” podgląd to zdjęcie wybranego układu, a na każdej szybie wybrany rodzaj osłony w wybranym kolorze (1:1 z kafelkami); w „Rodzaj”, „Kolory” i „Pola” pola dotyka się na zdjęciu
- 🏠 Karta na panelu: to samo okno ze zdjęć, osłona zjeżdża i wyjeżdża na żywo; za szybą zdjęcie widoku według pory dnia (słońce) i pogody z HA (słonecznie, chmury, deszcz, burza, śnieg, mgła)
- ✏️ „Własny” układ: kafelek i edytor też ze zdjęć
- 🚪 Bramy, garaże i szlaban ze zdjęć: skrzydło wycięte ze zdjęcia odjeżdża w bok, unosi się, otwiera albo podnosi ramię – na karcie i w kreatorze
- 🔼 Karta: przyciski „W górę”, „Stop”, „W dół” i wiersz automatyki (automat, pauza, uwaga) z ikonami z Canvy, w jasnym i ciemnym motywie
- 🧭 Edytor karty: ikony kroków z Canvy (jak w kreatorze)
- 🌤️ Symulator w opisie HACS: ikony pory dnia i pogody z Canvy
- 🖼️ README: nowe banery z Canvy (PL, EN, DE, FR, CS), osobno dla jasnego i ciemnego motywu GitHuba

## v2.2.14 – Podgląd = to samo zdjęcie co kafelek

- 🖼️ „Osłona”: miniatury i duży podgląd to zdjęcia z Canvy (rodzaj zgadnięty po osłonie, np. dzień-noc dla żaluzji bez lameli)
- 🪟 „Układ”: duży podgląd to zdjęcie wybranego kafelka; edytor pól tylko przy „Własny”
- 🎨 „Rodzaj” i „Kolory”: duży podgląd to zdjęcie wybranego rodzaju w wybranym kolorze, 1:1 jak kafelek; pola okna jako przyciski 1, 2… pod zdjęciem, zawsze widoczne

## v2.2.13 – Kreator graficzny od pierwszego urządzenia

- 🪄 Po świeżej instalacji pierwsze „Dodaj urządzenie” wczytuje integrację i prosi o odświeżenie strony; potem od razu otwiera się kreator graficzny (z roletami w kroku „Osłona”, nowymi ikonami i zdjęciami) zamiast starego kreatora z polami wyboru
- 🔎 Stary kreator (gdyby się pokazał): w „Znalezione” są też silniki rolet i żaluzji z liczbą

## v2.2.12 – Zdjęcia w wybranym kolorze i grafiki kreatora

- 🎨 Zdjęcia rodzajów w kroku „Rodzaj” mają kolor wybrany w „Kolory” (tkanina, pancerz, lamele); rama i cień zostają z oryginału
- 🪟 Nowe kafelki Układu (zdjęcia z Canvy) i nowe ikony paska kroków, osobne na jasny i ciemny motyw
- 🧩 Edytor karty: kafelki rodzajów pokazują miniaturę zdjęcia zamiast ikony

## v2.2.11 – Podgląd 1:1 dla każdego rodzaju

- 🪟 Kroki „Rodzaj” i „Kolory”: podgląd zawsze rysuje dokładnie wybrany rodzaj, także rolety SK, SKO, SP, SKN, bambusowe, plisy i inne podstawowe (wcześniej pokazywały wspólne okno)
- 🔢 Okno z kilkoma polami: duży podgląd pokazuje rodzaj i kolor zaznaczonego pola, pod nim małe okno do wybrania pola
- 🖼️ Zdjęcia (wygenerowane przez AI w Canvie) dla wszystkich 79 rodzajów, także bram i garaży

## v2.2.10 – Nowa ikona

- 🏠 Nowa ikona Motor HA (dom z roletą, garażem i bramą) w HA, HACS i na stronie integracji

## v2.2.9 – Podgląd na żywo i zdjęcia prawie wszystkich rodzajów

- 🎨 Kolor osłony i kolor ramy od razu zmieniają podgląd przy każdym z 79 rodzajów (okna dachowe, markizy, pergole, bramy, moskitiery, okiennice…); okna z napędem mają tylko kolor ramy
- 🪟 Kroki „Rodzaj” i „Kolory”: podgląd pokazuje dokładnie wybrany rodzaj (np. markiza koszowa, okno dachowe), także przy oknie z kilkoma polami
- 🖼️ Zdjęcia (wygenerowane przez AI w Canvie) dla 71 z 79 rodzajów, także w klasycznym kreatorze; bramy i garaże dostaną zdjęcia w następnej wersji

## v2.2.8 – Animacje każdego rodzaju i zdjęcia w kreatorze

- 🎬 Każdy rodzaj otwiera się po swojemu: markizy wysuwają się na ramionach, okna dachowe i z siłownikiem się uchylają, świetlik podnosi kopułę, parasol i żagiel się rozkładają, szlaban podnosi ramię, furtka i bramy garażowe boczne/dwuskrzydłowe jadą jak w rzeczywistości
- 🃏 Karta: tarasy, okna z napędem i nowe bramy mają własny rysunek, który jedzie razem z silnikiem (rolety i żaluzje w oknie bez zmian)
- 🖼️ Krok „Rodzaj”: zdjęcia rodzajów (wygenerowane przez AI w Canvie); rodzaje bez zdjęcia mają dalej rysunek
- ▶️ Kreator: przy nowych rodzajach podgląd pokazuje w kółko otwieranie i zamykanie

## v2.2.7 – Katalog rodzajów jak u producentów

- 🖼️ Krok „Rodzaj”: realistyczne obrazki i nazwy w grupach jak w katalogach (wewnątrz, na zewnątrz, okna dachowe, taras i ogród, okna z napędem, moskitiery, brama i garaż)
- ➕ 55 nowych rodzajów, razem 79: m.in. osłony okien dachowych (DKL, SSL, ARZ, FHB, MSL/MHL, AMZ, PAL, FHL, dzień/noc), markizy (otwarta, półkasetowa, kasetowa, z falbaną, koszowa, wolnostojąca, na ogród zimowy, balkonowe), pergole, żagiel, parasol, okiennice, rolety SK/SKO/SP/SKN, antywłamaniowa, na drzwi tarasowe, moskitiery, okna z siłownikiem, świetlik, wyłaz, furtka, szlaban, bramy garażowe boczne i dwuskrzydłowe
- 🃏 Karta: nowe rodzaje rysuje i animuje jak najbliższy rodzaj (osobne animacje w następnej wersji); ikony i klasy urządzeń w HA dopasowane (markiza, okno, zasłona, garaż, brama)
- 🌍 Nazwy we wszystkich 14 językach

## v2.2.6 – Przegrody, ściana w kolorze i „Ustaw jak zaleca”

- 🧱 Krok „Układ”: przy każdej przerwie między polami wybór „Brak / Słupek / Ściana” (w poziomie „Brak / Belka / Ściana”), osobno dla każdej przerwy, pokazuje się sam przy 2 i więcej polach; szerokość ściany suwakiem
- 🎨 Krok „Kolory”: kolor ściany między oknami (biała, beżowa, szara, cegła, grafit) – na rysunku i na karcie; słupek ma kolor ramy
- ✨ Krok „Pola”: przycisk „Ustaw jak zaleca” – lewy silnik w lewe pola, prawy w prawe, czujnik okna przy każdym silniku
- 🔕 Nowe urządzenie: powiadomienia i telefony domyślnie wyłączone

## v2.2.5 – Układ na dużym rysunku, przeciąganie pól i podpisy kroków

- 🪟 Krok „Układ” na komputerze: słupki, belki i podziały ustawia się wprost na dużym rysunku z prawdziwymi osłonami
- 🏷️ Pod każdą ikoną kroku jest jej nazwa, ikony nie są szare; na telefonie pasek kroków przesuwa się palcem
- ✋ Krok „Pola”: przeciąganie pola na rysunku albo całego wiersza (palcem za ⠿) – za kursorem idzie podpis pola, zamiana trafia dokładnie w pole, na którym je upuszczono
- ⚙️ Podpowiedź silników rozkłada je po szerokości okna: lewy silnik w lewych polach, prawy w prawych (także po zmianie liczby pól)

## v2.2.4 – Stały rysunek w każdym kroku kreatora

- 🖼️ Rysunek okna stoi w miejscu w każdym kroku kreatora i zmienia się od razu przy każdym ustawieniu (także przy suwakach słupka, muru i belki); na telefonie mały rysunek na górze w każdym kroku
- 🪪 Na komputerze w kroku „Gotowe” w miejscu rysunku jest powiększona karta – dokładnie tak, jak będzie na panelu

## v2.2.3 – Kreator na komputerze w dwóch kolumnach

- 🖥️ Na komputerze kreator jest szeroki i podzielony na pół: z lewej ustawienia kroku, z prawej duży rysunek okna, który zajmuje całą połowę i zmienia się od razu. Na górze duże ikony kroków. W „Rodzaj”, „Kolory” i „Pola” pola wybiera się na dużym rysunku
- 📱 Na telefonie rysunek dopasowuje się do ekranu i stoi na górze, a lista rodzajów i kolorów przewija się pod nim; jeden rysunek zamiast dwóch
- 🎯 Krok „Osłona”: pomarańczowa ramka tylko na dotkniętym kafelku – „Cały pokój” i grupa z tymi samymi roletami nie świecą się już naraz
- 🪟 „Cały pokój” pokazuje każdą roletę pokoju jako małe okno z jej prawdziwą osłoną

## v2.2.2 – Każde pole ze swoją osłoną

- 🪟 Rodzaj i kolor osłony osobno dla każdego pola okna: w krokach „Rodzaj” i „Kolory” na górze rysunek okna – „Całe okno” jak dotąd albo dotknięcie pola (lub „Pole 2”) i wybór tylko dla niego, np. wolnowisząca w oknie, plisa w drzwiach. Pole z własnym ustawieniem ma ✎, karta rysuje każde pole po swojemu
- 📦 HACS pobiera integrację plik po pliku zamiast paczki zip z wydania – instalacja działa także wtedy, gdy GitHub odrzuca pobieranie paczek z wydań

## v2.2.1 – Kreator: pokoje, grupy, słupki, czujniki przy skrzydłach

- 🏠 Krok „Osłona”: wszystkie osłony z Home Assistanta pogrupowane według pokoi; na górze pokoju „Cały pokój” – jednym dotknięciem wszystkie silniki z pokoju. Niżej grupy, linia „Pojedyncze” i pojedyncze osłony z rysunkiem. Osłony użyte już w innym urządzeniu są widoczne z podpisem „też w: …”
- 🔢 Ile rolet, tyle skrzydeł: wybór grupy (np. 2 rolety) albo całego pokoju od razu ustawia tyle pól, a w każdym polu swój silnik – także w „Konfiguruj”
- 🧱 Układ: suwaki „Słupek / mur” (odstęp między oknami – wąski słupek albo kawałek ściany) i „Belka” (odstęp pod polem). Karta rysuje mur między oknami. Zaznaczone pole ma pomarańczową ramkę
- ➕ Pusta przestrzeń pod podniesioną kolumną: dotknięcie przerywanego „+” dokłada tam pole
- 🔗 Krok „Pola”: znaczek czujnika okna na każdym skrzydle (pomarańczowy = przypisany, przerywany „+” = brak) i podpowiedź „Dotknij skrzydła”. Silnik i czujnik można zamienić między polami przeciąganiem (myszką albo palcem)
- 🧹 Listy w arkuszach: najpierw tylko to, co jest w pokoju osłony (plus to, co już wybrane); reszta domu po „Pokaż wszystkie”. Grupy osłon nie trafiają do pól
- ⏰ Rano i wieczorem osobno: wschód / zachód słońca z przesunięciem w minutach albo stała godzina. Wieczorem przy każdym skrzydle z czujnikiem widać, co się stanie (otwarte → nie zjedzie, uchylone → zjedzie do ustawionej pozycji, po zamknięciu okna dojedzie sama)
- 🌬️ Automatyka z ustawieniami: wiatr – źródło, próg i pozycja; deszcz – źródło i pozycja; słońce – od jakiej temperatury; uchylone okno – na ile podnieść osłonę. Opcje okna, wiatru i deszczu pojawiają się tylko, gdy jest taki czujnik albo pogoda
- ⏱️ Krok „Czas” (ten sam pomiar co „Kalibruj”): widać czas każdego silnika osobno
- 🪟 Karta: „Okno uchylone” bez numeru, gdy czujnik jest tylko jeden; nic nie wystaje poza szybę

## v2.2.0 – Kreator graficzny i okna z wieloma polami

- 🧭 Nowy kreator graficzny przy „Dodaj urządzenie” i „Konfiguruj”: obrazki zamiast list, żywy podgląd okna w każdym kroku, na telefonie na cały ekran
- 🪟 Układ okna jako siatka do 4 × 3 pól różnej wielkości: gotowe szablony (np. 2 skrzydła + naświetla, okno + drzwi balkonowe) albo „Własny” – przeciąganie linii i dolnej krawędzi palcem, dzielenie w poprzek i wzdłuż, usuwanie pola
- 🔗 Każde pole ma swój silnik i swój czujnik okna (uchylone / otwarte); podpowiedzi czujników najpierw z pokoju osłony
- 🖼️ Karta rysuje okno z polami dokładnie jak w kreatorze, a każde pole jeździ swoją osłoną
- ⏰ Harmonogram: osobno „Rano otwórz” i „Wieczorem zamknij” – można włączyć tylko jedno
- ⏱️ Pomiar czasu przejazdu od razu w kreatorze („Zmierz teraz”), jeszcze przed zapisaniem urządzenia
- 🧹 Log: ostrzeżenie „brak karty na stronie urządzenia” nie pojawia się już na zwykłych stronach (np. przy otwartej karcie w tle w przeglądarce)

## v2.1.7 – Kreator z obrazkami i podglądem okna, rysunek jedzie razem z prawdziwą osłoną

- 🪟 Silniki Zigbee (np. Moes przez Zigbee2MQTT), które po komendzie od razu zmieniają stan, a pozycję podają dopiero po dojechaniu: rysunek rusza od razu i jedzie razem z osłoną, zamiast czekać do końca ruchu. Urządzenie Motor HA pokazuje wtedy też „otwiera się” / „zamyka się”
- 🧭 Kalibracja przy dwóch skrzydłach: gdy jedna osłona nie odpowiada, powiadomienie podaje jej nazwę – i nie czeka już 4 minuty, gdy druga dawno dojechała
- ⏱️ Kalibracja silnika, który melduje cel zaraz po ruszeniu: czas przejazdu z prędkości silnika (albo z meldunku po zatrzymaniu) zamiast fałszywych 1–4 s. Gdy nie da się zmierzyć – jasne powiadomienie, co wpisać
- 🪟 Kreator: brama na liście „Co masz w domu” nie zamienia okna w bramę – w kroku „Rodzaj” są wszystkie osłony (bramy na końcu listy)
- 👆 Kreator: pasek kroków u góry zostaje przyklejony przy przewijaniu, a dotknięcie kroku przenosi od razu do niego. Przy „Zmień ustawienia” do każdego kroku („Dalej” zapisuje), przy dodawaniu – do już przejściowych
- 🎚️ Nowa opcja w kroku „Okno”: „Dwa skrzydła sterowane osobno” – suwak lewej osłony po lewej stronie okna, prawej po prawej (także przy osłonach zewnętrznych)
- 🎨 Na karcie obok „Zmień ustawienia” przycisk „Wygląd” – od razu kolory i rama, a paskiem kroków dalej
- 🔁 Ustawienia z kreatora i zmierzony czas kalibracji wygrywają ze starymi ustawieniami karty (wcześniej np. kolor zmieniony w kreatorze mógł nie zadziałać)
- 🔤 Podpis „Powiadomienia” na pasku kroków nie jest już ucięty
- 🖼️ Kreator: w kroku „Rodzaj” każda osłona ma obrazek, a w „Kolorach” są próbki kolorów osłony i ramy – wystarczy dotknąć
- 👀 Kreator: żywy podgląd okna u góry (razem z paskiem kroków) zmienia się od razu przy wyborze rodzaju, koloru, ramy i skrzydeł
- 🏠 Kreator: po wyborze silnika pomieszczenie i rodzaj pomieszczenia uzupełniają się same (z obszaru w HA albo z nazwy, np. „Żaluzja lewa salon” → Salon)
- 🧠 Kreator: pola czujników pokazują tylko to, co pasuje (np. przy oknie same czujniki okien), te z pokoju osłony są na górze i od razu podpowiedziane. Tak samo pogoda, domownicy, fotokomórka i prędkość silnika. W „Powiadomieniach” telefony są na górze listy
- 🔄 Kreator: po zmianie silnika czujniki i prędkość z poprzedniego pokoju nie zostają przypadkiem w ustawieniach

## v2.1.6 – Suwak po każdej stronie okna, rysunek jedzie razem z osłoną

- 🎚️ Dwa skrzydła sterowane osobno („Osobno”): suwak lewej osłony stoi z lewej strony okna, prawej – z prawej. Każdy jeździ tylko swoją roletą i pokazuje jej pozycję
- ↕️ Przyciski ▲ ■ ▼ nadal sterują oboma naraz
- 🪟 Gdy osłona rusza sama (pilot, automatyka, kalibracja), a silnik od razu melduje pozycję docelową, rysunek jedzie w tempie silnika zamiast przeskoczyć na koniec w ułamku sekundy

## v2.1.5 – Widać koniec kalibracji

- ✅ Po kalibracji przychodzi jasne powiadomienie „kalibracja zakończona” z czasem pełnego przejazdu – w Home Assistant i na telefon, jeśli wybrano go w „Powiadomieniach”. Gdy się nie uda, powiadomienie mówi, co sprawdzić
- ↕️ Nowa opcja w kroku „Silnik”: „Po kalibracji ustaw osłonę na 50 %” (domyślnie wyłączona). Osłona staje w połowie, więc od razu widać, że kalibracja się skończyła. Bramy i garaże tej opcji nie mają

## v2.1.4 – Suwak w kierunku ruchu, Assist po nazwie urządzenia

- ↕️ Rolety, żaluzje, plisy, markizy i inne osłony jadące w górę i w dół mają pionowy suwak obok okna: góra = otwarte, dół = zamknięte
- ↔️ Zasłony na boki, żaluzje pionowe oraz bramy i garaże zostają z poziomym suwakiem na dole
- 🗣️ Kreator nie obiecuje już „zasłoń salon” – do Assist mów nazwą urządzenia, np. „zamknij Plisa kuchnia”
- 🙈 Nowa opcja w kroku „Urządzenie”: „Ukryj silnik przed Assist” (domyślnie wyłączona). Assist widzi wtedy tylko urządzenie Motor HA, więc nie mówi, że jest kilka urządzeń o tej samej nazwie. Po wyłączeniu opcji albo usunięciu urządzenia silnik znów jest widoczny

## v2.1.3 – „Zmień ustawienia” na panelu, suwak z uchwytem

- ⚙️ Pod oknem na panelu „Zmień ustawienia”: otwiera kreator tego urządzenia, a po zamknięciu wraca na ten sam panel
- 👆 Na stronie urządzenia każdy wiersz „Ustawienia Motor HA” da się dotknąć: Rodzaj, Kolor, Skrzydła, Wysokość i Czas otwierają od razu właściwy krok kreatora („Dalej” zapisuje), a Automatyka, Pauza i Powód – okienko tej encji
- 🚪 „Zmień ustawienia” na panelu także przy bramach i garażach
- 🎚️ Suwak przy zamkniętej osłonie nie jest już pustym paskiem – zawsze widać uchwyt, jak w Home Assistancie
- 🎚️ W trakcie jazdy suwak przesuwa się razem z osłoną na rysunku, zamiast od razu skakać do celu
- 🎨 Suwaki i ikony otwartych osłon w kolorze głównym Home Assistanta zamiast fioletu; podgląd w opisie też
- 🌍 Kreator po angielsku (i w innych językach): „Znaleziono” i model urządzenia pokazują nazwy zamiast wewnętrznych słów (np. „Day-night blind” zamiast „zebra”)
- 🧹 Gdy Home Assistant wczytuje Motor HA z innego folderu niż ten, do którego pisze HACS, aktualizacja trafia też tam, a w dzienniku jest o tym wpis

## v2.1.2 – Karta zawsze na stronie urządzenia, też w aplikacji

- 🪟 Karta na stronie urządzenia pokazuje się zawsze – także w aplikacji Home Assistant na Androida, w Chrome na telefonie i na komputerze (sprawdza to stały test przy każdej zmianie)
- 🧹 Stara kopia po wersji 1.x (folder custom_components/okno_ha) jest usuwana sama – przez nią Home Assistant wczytywał starą wersję zamiast nowej
- 🔄 Po aktualizacji strona sama się odświeża, gdy wracasz do aplikacji – bez zamykania aplikacji i czyszczenia pamięci
- 📝 Gdyby karta się nie pokazała, w Ustawienia → System → Dzienniki zapisuje się powód

## v2.1.1 – Restart we właściwej chwili, ładniejszy podgląd

- 🔄 Po pobraniu nowej wersji (także przez HACS) w Ustawieniach pojawia się „Motor HA … – uruchom ponownie” z przyciskiem – dopiero gdy nowe pliki są już na dysku, więc restart nigdy nie wypada za wcześnie
- 🏠 Osłony zewnętrzne (żaluzje fasadowe, markizy, rolety): za szybą widać jasny pokój zamiast czerni
- 🎞️ Podgląd w opisie: wszystkie karty równej wysokości, brama zawsze widoczna i z suwakiem
- 🧰 Zgodność z nowszym Home Assistantem (rejestr urządzeń 2026.10+)

## v2.1.0 – Karta na stronie urządzenia

- 🪟 Na górze strony urządzenia (Ustawienia → Urządzenia → Twoje okno) żywa karta okna z przyciskami ↑ ■ ↓ – zawsze w tym samym miejscu
- ➕ Pod kartą „Dodaj do panelu”: wybierasz panel i karta sama się na nim pojawia
- ⚙️ „Zmień ustawienia” otwiera kreator tego urządzenia, a po „Zakończ” wraca na stronę urządzenia; zmiany (np. kolor) od razu widać na karcie
- 📋 Opis ustawień pod kartą: rodzaj, kolor, skrzydła, wysokość, czas przejazdu, automatyka, pauza i powód ruchu
- 🏠 Urządzenie „Motor HA” pokazuje kartę „Motor HA – cały dom” i karty wszystkich urządzeń naraz
- 🧹 Jedno urządzenie „Motor HA” zamiast pustych kopii po jednej na każde okno
- 🔍 Zrzuty w instrukcji są mniejsze, cały krok widać naraz; po kliknięciu zrzut wyskakuje duży ze szczegółami (w HA na środku ekranu, na GitHubie w nowej karcie)
- ✨ Gładkie, zaokrąglone brzegi zrzutów – bez czarnych schodków na jasnym i ciemnym tle

## v2.0.3 – Opis jak w HA, kroki jeden pod drugim

- 🧙 Każdy krok kreatora z obrazkiem jeden pod drugim, na całą szerokość – nic się nie rozjeżdża, czytelne też na telefonie
- 👆 Klikana instrukcja: spis kroków instalacji, pod każdym krokiem „Poprzedni · Spis treści · Następny”, tytuły kroków w tabeli kreatora prowadzą do ich obrazków
- 🎨 Według zasad wyglądu: plakietki tylko w kolorze HA, ikona przy każdym kroku instalacji, „Instalacja ręczna” i „Pytania” bez rozwijanych list
- 🏠 Opis w HA (HACS) jak reszta HA: ikony w jednej linii z napisem, tabele z liniami, pasek kroków cały w karcie HA, zrzuty przycięte bez czarnych pasów
- 🪟 Rodzaje osłon i bram w równych rzędach – wszystkie obrazki tej samej wielkości, bez pustych miejsc
- 🛠️ „Jak to zrobić” w działach Automatyka, Powiadomienia, Encje, Karta domu i Aktualizacja: przycisk do właściwego miejsca w HA i kroki

## v2.0.2 – Opis na całą szerokość i klikana instrukcja

- ↔️ Opis na GitHubie wypełnia całą szerokość: kafelki, spis treści, tabele i obrazki, bez pustych miejsc z boku
- 🌐 Przyciski języków w jednym rzędzie, równej wielkości
- 👆 Pasek kroków kreatora jest klikany: każdy krok przenosi do swojego obrazka z instrukcją
- 🏠 Instrukcja klikana: przyciski otwierają właściwe miejsce w Twoim Home Assistant (HACS, System, Dodaj integrację, Panele), a pasek kroków i obrazki prowadzą po opisie
- ⬅️ Kreator: przycisk „Wstecz” po lewej, obok „Dalej”, zamiast przełącznika „Wróć do poprzedniego kroku”
- 🧙 Kroki kreatora po dwa w rzędzie, większe i czytelne
- 🌙 Zrzuty z HA na GitHubie zawsze w ciemnym motywie (w HA obrazki same idą za motywem HA)
- 🗂 Przyciski „w HA” w opisie w HACS otwierają się w nowej karcie, opis zostaje na miejscu
- 🟧 Nagłówki tabel z kreską w kolorze akcentu, wszystkie tabele równe

## v2.0.1 – Instrukcja krok po kroku z obrazkami

- 🖼 Instalacja krok po kroku z obrazkami: Otwórz link, Dodaj, Pobierz, Uruchom ponownie, Dodaj integrację, gotowa karta
- 🧙 Każdy krok kreatora z prawdziwym zrzutem z Home Assistant i zaznaczeniem, gdzie kliknąć (5 języków, jasny i ciemny motyw)
- 📑 Spis treści na GitHubie: jedna pozycja w kratce, nic się nie skleja
- 🔲 Kafelki na GitHubie: ikona nad tytułem zamiast malutkiej kropki
- ✅ Plakietka „HACS” pokazuje stan sprawdzenia głównej gałęzi

## v2.0.0 – Motor HA od nowa

- 🆕 Całość zbudowana od nowa: integracja, karta, edytor karty, kreator, opis i instrukcja
- 🔄 Twoje okna z wersji 1.x przenoszą się same, z tymi samymi ustawieniami i nazwami encji. Stare wpisy są tylko wyłączone – możesz je potem usunąć
- 🧙 Kreator: najpierw „Co masz w domu” (zaznaczone samo po przejrzeniu HA), potem tylko pasujące kroki, porada dla pokoju, tryb podstawowy i zaawansowany
- 🤖 Automatyka: 31 funkcji (harmonogram, słońce, blokada przy otwartym oknie, wiatr, obecność, wakacje i inne), każda osobno i na start wyłączona
- ❓ Czujnik „Powód ruchu”, przycisk „Wznów”, pauza na dziś, tryb „Śpię” i tryb wakacyjny
- 🚪 Bramy i garaże: przesuwna, skrzydłowa, segmentowa, uchylna, roletowa. Motor HA nigdy sam nimi nie rusza; fotokomórka pokazuje przeszkodę
- 🪟 Nowe osłony: żaluzja pionowa i zasłona boczna (razem 24 rodzaje)
- 🔔 Powiadomienia: brak odpowiedzi, nie dojechała, bateria, czujnik, automatyka, otwarta lub niedomknięta brama, przeszkoda – każde osobno
- 🏠 Nowa karta „Motor HA – cały dom”: wszystkie osłony na jednej liście
- 🌍 Integracja w 14 językach, opis i instrukcja w 5 językach
- 🎮 Opis w HACS: żywa symulacja karty (pora dnia, pogoda, kolor, rodzaj), opis sam w języku HA, spis treści i przyciski działają na miejscu
- 🛠 Karta nie pokazuje już czasem „Błąd konfiguracji” zaraz po otwarciu strony (HA podmieniał rejestr elementów)
- 🏷 Nazwa Motor HA wszędzie, także w środku (domena motor_ha, karta custom:motor-ha). Repozytorium: superdarco78/Motor-HA
- 🧹 Porządek w repozytorium: obrazki 1,5 GB → 14 MB

## v1.4.54 – Nowy opis w HA

- 📖 Opis w HACS zbudowany od nowa w stylu Home Assistanta: te same rozmiary czcionek, ikon i odstępów co w HA, kolory z Twojego motywu (jasny i ciemny), czytelny na telefonie, tablecie i komputerze
- 🎞 Żywe karty zamiast obrazków: „Rodzaje osłon”, „Przed i po” (zwykła karta HA obok Motor HA) i inne przykłady – wszystkie w jednym, czytelnym rozmiarze
- 🧭 Kliknięcia w opisie (spis treści, kafelki, języki, przyciski) zostają na stronie – już nie wyrzucają do listy HACS
- 📸 Kreator „Dodaj integrację”: prawdziwe zrzuty z HA 2026.10 w 5 językach, z ramkami i numerami w kolorze akcentu, a pod każdym krokiem „Co kliknąć” i krótka wskazówka
- 🌍 Pasek kroków w kreatorze integracji po niemiecku, francusku, czesku i w 9 innych językach (wcześniej po angielsku)
- 🎨 Krok „Wygląd”: kolory i okleiny ram pokazują nazwę (np. „⚫ Czarny”), a nie skrót („czarny”)
- 🛟 Gdyby nowy opis się nie wczytał, HACS pokazuje zwykły opis – strona nigdy się nie psuje
- 🔘 Przyciski w opisie (Otwórz w HACS, Dodaj integrację, Otwórz Motor HA, Aktualizacje) to prawdziwe przyciski w stylu HA – rozmiar i kolory z Twojego motywu, czytelne na telefonie
- 🔘 Przyciski w panelu Motor HA jak przyciski HA (40 px, zaokrąglone)
- 📝 Tytuł wydania bez podwójnego numeru wersji

## v1.4.53 – Opis: plakietki i etykiety w stylu HA

- 🏷 Plakietki małe, zwykłymi literami i równej wysokości – w HACS i na GitHubie
- 🎨 „Co kliknąć:” w kolorze akcentu HA (we wszystkich 5 językach)
- 🧩 Kafelki spisu treści i ikony nagłówków większe, ikony równo z tekstem

## v1.4.52 – Opis w stylu HA i bezpieczna symulacja

- 🧩 Spis treści w HACS jako kafelki równej wielkości (jak w HA), na telefonie jedna kolumna, na komputerze kilka
- 🏷 Plakietki w HA małe i zaokrąglone, zwykłymi literami
- 🔤 Nagłówki i tekst w rozmiarach czcionek HA, linki bez podkreśleń
- 🎞 Żywa symulacja wraca – każda w osobnej, odizolowanej ramce: HACS jej nie widzi, więc nie może zepsuć strony; przy błędzie zostają obrazki

## v1.4.51 – Strona w HACS zawsze się otwiera

- 🛠 Żywa galeria w opisie wyłączona – opis pokazuje obrazki; strona Motor HA w HACS nie może już pokazać „Error while loading page repository”

## v1.4.50 – Poprawka strony w HACS

- 🛠 Naprawiony błąd „Error while loading page repository” w HACS (1.4.48–1.4.49): galeria w opisie nie zastępuje już kart HA w oknie HA
- 🔄 Samo przeładowanie strony po aktualizacji dopiero, gdy HA i HACS są w pełni gotowe

## v1.4.49 – Nowy opis

- 📖 Opis czytelny jeszcze przed instalacją: jedna animacja dla jasnego i ciemnego motywu, zrzuty w jednej skali, przyciski 52 px jak w HA, dopasowanie do telefonu, tabletu i komputera
- 📖 Nagłówki jak w HA, uwagi jako natywne ramki HA, 17 rodzajów osłon w opisie

## v1.4.48 – Jedna duża aktualizacja

- ✅ Na liście „Dodaj do panelu” zawsze jedna karta „Motor HA” w nowej wersji: plik karty podmienia się przy każdym starcie, a strona HA po aktualizacji sama przeładuje się raz, w spokojnym momencie (bez otwartego okienka, bez edycji panelu, bez pisania)
- 🪄 Edytor karty zaczyna od kreatora w 7 krokach
- 🎞 Galeria w HACS: zamiast obrazków jedna duża żywa karta na sekcję – przyciski pogody, pory dnia i okna, rodzaju osłony i wyglądu; kartą można ruszać jak prawdziwą roletą (nic w domu się nie rusza). Na GitHubie zostają obrazki
- 🏠 Osłony zewnętrzne widać od strony elewacji (tynk, parapet, za szybą pokój, wieczorem zapalone światło), wewnętrzne – z pokoju
- ➕ Nowe rodzaje: roleta w kasecie z prowadnicami, markiza tarasowa; rodzaje w grupach (rolety, plisy i rzymskie, żaluzje / rolety zewnętrzne, żaluzje fasadowe, taras)
- 🐞 Opisy pod rodzajami osłon nie są już przesunięte
- 🎨 Karta, edytor i kreator 1:1 jak HA: kolory, zaokrąglenia i cienie ze zmiennych motywu HA, rozmiary przycisków jak w HA
- 📱 Panel Motor HA na telefonie: wrócił przycisk menu ☰
- 📖 Opis: tabele jako prawdziwe tabele HA, spis treści w 2 kolumnach, makieta My Home Assistant, podpisy pod kółkami kreatora

## v1.4.47 – Czytelniej

- 🔤 „Co:” i „Po co:” w kreatorze w kolorze akcentu, opis jaśniejszy; większe małe napisy i ikony w karcie, edytorze i kreatorze
- 📖 Opis: nazwa Motor HA na wszystkich zrzutach, przyciski w stylu kafelków, większe podpisy pod obrazkami

## v1.4.46 – Edytor karty = kreator, nowy wygląd

- 🪄 Edytor karty („Dodaj do panelu” i ✏️) zaczyna zawsze od kreatora w 7 krokach – tego samego co „Dodaj okno” w integracji. Po „Gotowe” albo ✕ – wszystkie ustawienia
- 🎨 Edytor i kreator w stylu kafelków z opisu: tło w kolorze motywu, zaokrąglona ramka, cień; zaznaczone rzeczy w kolorze akcentu
- 📖 Opis: spis treści w 3 kolumnach, większe litery

## v1.4.45 – Poprawki opisu

- 🎨 Opis: ikony w „Jak sterować” naprawione, ikony nagłówków w kolorach motywu, spis treści obok siebie, pasek kroków mieści się na szerokość

## v1.4.44 – Jedna karta Motor HA w „Dodaj do panelu”

- 🪟 Po każdej aktualizacji karta jest zawsze z tej samej wersji co integracja. Wcześniej mogła zostać stara karta („Okno HA v32”) i stary edytor
- 🔎 W „Dodaj do panelu” → „Według karty” jedna pozycja „Motor HA” (bez podwójnej)
- 🪄 Nowa karta otwiera kreator w 7 krokach, ten sam co w integracji

## v1.4.43 – 14 języków

- 🌍 Karta, kreator, panel i okna integracji mówią językiem z Twojego profilu HA: polski, angielski, niemiecki, francuski, hiszpański, włoski, niderlandzki, czeski, słowacki, ukraiński, rosyjski, portugalski, chiński (uproszczony) i japoński. Inne języki – po angielsku. Tłumaczenia są maszynowe – poprawki mile widziane
- 🎨 Nowe ikony w opisie: kółko tematu w kolorze akcentu

## v1.4.42 – Nowa animacja w opisie

- 🎞️ Animacja „Jedna karta – każda osłona” w opisie: przezroczyste tło (pasuje do jasnego i ciemnego motywu), nazwa tylko raz

## v1.4.41 – Motor HA w opisie

- 📖 Opis w HACS we wszystkich 5 językach i baner z nazwą **Motor HA** i przyciskiem „Otwórz w HACS”

## v1.4.40 – Motor HA w każdym języku, prawdziwy licznik pobrań

- 🏷️ Nazwa **Motor HA** w każdym języku (także po angielsku)
- 📥 Każde wydanie ma paczkę `okno_ha.zip` – HACS pobiera ją przy instalacji i aktualizacji, więc plakietka „pobrania” liczy prawdziwe pobrania (od tej wersji; wcześniejsze instalacje nie były liczone)

## v1.4.39 – Nowa nazwa: Motor HA

- 🏷️ Nowa nazwa: **Motor HA** (EN **HA Motor**) – w integracji, karcie, Aktualizacjach i opisie. Bez zmian: domena `okno_ha`, encje, typ karty `custom:okno-ha`, Twoje panele
- 🖱️ Baner bez ramki z przyciskiem „Otwórz w HACS” między logo a oknem; w HA otwiera HACS na miejscu
- 🧭 Pasek kroków nad obrazkami kreatora jest klikalny – każda ikona przewija do swojego kroku
- 📌 Obrazki w opisie w HACS pochodzą z zainstalowanej wersji – zmieniają się dopiero po aktualizacji

## v1.4.38 – Dawny baner

- 🖼️ W opisie wrócił dawny baner (domek na tle zachodu słońca, bez ramki); domek, litery HA i uchwyt w kolorach Twojego motywu

## v1.4.37 – Ładowacz bez numeru w Zasobach

- 📦 Wpis w Zasobach to zawsze `/local/okno-ha-loader.js` bez numeru wersji, jak ładowacze innych kart. Plik i tak przy każdym otwarciu strony bierze świeże skrypty

## v1.4.36 – Ładowacz w folderze www

- 📦 Plik ładowacza leży teraz w `/config/www/okno-ha-loader.js` (widać go w File editor), a w Zasobach jest jako `/local/okno-ha-loader.js` – tak jak ładowacze innych kart. Integracja kładzie go i aktualizuje sama, stary wpis zamienia na nowy, bez dubli

## v1.4.35 – Ładowacz w Zasobach

- 📦 Ładowacz `okno-ha-loader.js` dodaje się sam do Ustawienia → Panele → Zasoby przy instalacji i każdej aktualizacji (z numerem wersji). Przy każdym otwarciu strony wczytuje świeże skrypty Okna HA, a otwarta strona sama podmienia skrypt po aktualizacji – bez czyszczenia przeglądarki. Po usunięciu ostatniego okna znika sam

## v1.4.34 – Szybsza zmiana języka opisu

- ⚡ Po zmianie języka opisu w HACS najpierw przemalowują się obrazki widoczne na ekranie, kilka naraz – strona nie zostaje pusta

## v1.4.33 – Linki w HA bez odświeżania, nowy baner

- 🔗 W opisie w HACS linki spisu treści, języków i przycisków My Home Assistant wskazują teraz adresy Twojego HA (także po najechaniu myszą). „Otwórz w HACS” otwiera stronę integracji w HACS
- 🔄 Po aktualizacji i restarcie HA otwarta strona sama wczytuje nowy skrypt Okna HA – bez odświeżania przeglądarki
- 🖼️ Nowy baner: logo osobno z odstępem, scena z zachodem słońca w ramce kafelka

## v1.4.32 – Języki i linki w opisie działają w HACS

- 🔗 Opis w HACS jest w osobnej ramce i kliknięcia nie docierały do Okna HA. Teraz przyciski języków zmieniają opis na miejscu, spis treści i kafelki przewijają do sekcji, a „Otwórz w HACS”, „Dodaj integrację” i „Aktualizacje” otwierają strony Twojego HA. Na GitHubie bez zmian

## v1.4.31 – Opis działa w HA, baner z zachodem słońca

- 🔗 Linki w opisie w HACS zostają w Home Assistancie: spis treści i kafelki przewijają do sekcji, języki zmieniają opis na miejscu, przyciski „Otwórz w HACS”, „Dodaj integrację” i „Aktualizacje” otwierają strony Twojego HA. Na GitHubie wszystko działa jak dotąd
- 🌅 Baner z zachodem słońca, domami i światłami, w ramce jak kafelki. Domek, „HA” i uchwyt w kolorze z Twojego profilu
- 🔔 Gdy pojawi się nowa wersja, pozycja w Ustawieniach → Aktualizacje zmienia się od razu

## v1.4.30 – Opis bez kodu, linki zostają w HA

- 🐞 Pod banerem w HACS nie ma już kawałka kodu („picture…”). Animacje mają wersję jasną i ciemną, HA pokazuje tę według swojego motywu
- 🔗 Spis treści w HACS przewija do sekcji na tej samej stronie, zamiast otwierać GitHuba
- 🪟 Animacja karty w neutralnych kolorach, pasuje do każdego motywu
- 🎨 Kreator karty w opisie: spokojne pola informacji, ikony kroków w ciemnym motywie na ciemnym tle

## v1.4.29 – Spokojny baner

- 🖼️ Baner w opisie bez zachodu słońca: neutralne tło jak kafelki (jasne albo ciemne według motywu), domek i „HA” w kolorze z Twojego profilu
- 🔔 Pierwsza wersja, która pojawia się w Aktualizacjach sama, bez klikania w HACS

## v1.4.28 – Aktualizacje pojawiają się same

- 🔔 Nowa wersja Okna HA pokazuje się w Ustawieniach → Aktualizacje po kilku minutach, bez klikania „Aktualizuj informacje” w HACS (HACS sam sprawdza tylko co 48 godzin). Okno HA prosi HACS o odświeżenie tylko swojego repozytorium, raz na każde nowe wydanie. Dalej jedna pozycja w Aktualizacjach

## v1.4.27 – Nowy wygląd opisu

- 🎨 Opis w HACS w jednym spokojnym stylu jak kafelki: ciemne tła w ciemnym motywie, delikatne ramki, wszystko w kolorach z Twojego profilu
- 🔘 Własny przycisk „Otwórz w HACS” w Twoim kolorze zamiast niebieskiego przycisku My Home Assistant
- 🌐 Pasek języków: wybrany w kolorze akcentu, pozostałe w kolorach motywu
- 🖼️ Nowy baner, galeria osłon, „Przed i po” i makiety kroków – zdjęcia i próbki kolorów bez zmian, przyciski i ramki w Twoich kolorach

## v1.4.26 – Wszystkie obrazki opisu w Twoich kolorach, za każdym razem

- 🎨 Każdy obrazek opisu w HACS przemalowuje się na kolory z Twojego profilu, także przy wielu obrazkach naraz (wcześniej pojedyncze kafelki czasem zostawały niebieskie)
- 🪟 Przyciski i uchwyt na obrazkach karty (np. „Zwinięta”, „50%”) znów w Twoim kolorze
- ⚡ Po odświeżeniu strony wszystkie obrazki od razu w Twoich kolorach (poprawiona pamięć przemalowanych obrazków)
- 🏷️ Plakietki na górze opisu w kolorze głównym i akcencie z Twojego profilu
- 🖼️ Baner i logo w formacie SVG też biorą Twoje kolory

## v1.4.25 – Logo w okienku aktualizacji zawsze

- 🖼️ Logo Okna HA w okienku „Update” od HACS wraca zawsze, także gdy HACS wstaje po Oknie HA (wcześniej czasem zostawał pusty obrazek do następnego restartu)
- 🧹 Bez ostrzeżeń w dzienniku HA o zapisie stanu z innego wątku

## v1.4.24 – Dokładne kolory motywu w opisie

- 🎯 Obrazki opisu w HACS przemalowane dokładnie: tylko przyciski, ramki, numery i ikony biorą kolor główny i akcent z Twojego profilu. Zdjęcia osłon, próbki kolorów, drewno i niebo zostają bez zmian
- 🌗 Animacja karty w opisie: jedna, jasna albo ciemna według motywu Home Assistanta
- 🧹 Animacja karty bez starego numeru wersji
- 🖼️ Obrazek „Przed i po” też w Twoich kolorach i w wersji jasnej albo ciemnej

## v1.4.23 – Czytelność przy każdym kolorze i motywie

- 🌗 Obrazki opisu w HACS biorą wersję jasną albo ciemną z motywu Home Assistanta, a nie z ustawień systemu, więc tekst w kafelkach i nagłówkach jest zawsze czytelny
- 🌤️ Przemalowanie nie rusza nieba na zdjęciach okien
- 🔤 Karta v37: napisy na przyciskach w kolorze motywu są białe albo czarne, zależnie od jasności Twojego koloru
- 🐞 Naprawiony pierwszy krok kreatora karty (błąd przy sprawdzaniu wersji)

## v1.4.22 – Twoje kolory od razu, bez mignięcia

- ⚡ Przemalowane obrazki opisu zostają zapamiętane w przeglądarce. Po odświeżeniu strony od razu są w Twoich kolorach, bez mignięcia domyślnych. Przemalowanie robi się od nowa tylko wtedy, gdy zmienisz kolor w profilu
- 🙈 Obrazki w domyślnych kolorach nie pokazują się na chwilę przed przemalowaniem
- 🟠 Ujednolicony pomarańcz zaznaczeń w ciemnych obrazkach, nagłówki kroków bez niebieskich emoji-cyfr

## v1.4.21 – Kolory motywu w opisie zawsze i w ciemnym motywie

- 🌙 Obrazki opisu w HACS po przemalowaniu zostają ciemne w ciemnym motywie (jasna i ciemna wersja dalej przełączają się same), napisy w nagłówkach są czytelne
- 🟣 Zaznaczenia „gdzie kliknąć” zawsze w kolorze akcentu z Twojego profilu, także w ciemnej wersji obrazków
- 🔁 Przemalowanie działa za każdym razem: gdy obrazek nie wczyta się od razu (sieć, restart HA), skrypt próbuje ponownie sam

## v1.4.20 – Opis w domyślnych kolorach Home Assistanta

- 🎨 Wszystkie obrazki opisu w 5 językach i obu motywach: kolor główny HA #009AC7, zaznaczenia „gdzie kliknąć” w kolorze akcentu #FF9800 (zamiast czerwieni). W HACS przemalowują się na kolory z Twojego profilu
- 🏷️ Plakietki w kolorach HA
- 🖼️ Dokładniejsze rozpoznawanie zaznaczeń przy przemalowaniu (słońce i dachy na zdjęciach zostają)

## v1.4.19 – Kreator w kolorach Twojego motywu

- 🎨 Karta v36: podsumowanie i podpowiedzi kreatora karty mają ikony i ramki w kolorze głównym Twojego motywu HA, zamiast zielonych ✅ i zielonych ramek. Zmienia się na żywo z profilem
- 🔢 Komunikaty o wersji bez numeru karty

## v1.4.18 – Zaznaczenia w kolorze akcentu

- 🟠 Zaznaczenia „gdzie kliknąć” w obrazkach (ramki, numery, strzałki) są w kolorze akcentu HA: na GitHubie pomarańczowe #FF9800, w HACS i w kreatorze integracji w akcencie z Twojego profilu, na żywo

## v1.4.17 – Domyślne kolory Home Assistanta

- 🎨 Karta v35: gdy motyw nie podaje kolorów, używa domyślnych kolorów HA (główny #009AC7, akcent #FF9800). Kolory z Twojego profilu mają pierwszeństwo, na żywo
- 🖼️ Obrazki w HACS i w kreatorze integracji zawsze w Twoim kolorze głównym, także w starszych obrazkach z dawnym niebieskim

## v1.4.16 – Kolory z Twojego motywu Home Assistanta

- 🎨 Karta, kreator i edytor biorą kolor główny i kolor akcentu z profilu HA, na żywo: zmiana koloru w profilu od razu zmienia kartę
- 🖼️ Obrazki w opisie w HACS i w kreatorze integracji przemalowują się w przeglądarce z niebieskiego HA na Twój kolor główny (czerwone zaznaczenia i zdjęcia zostają). Na GitHubie zostają niebieskie
- 🔢 Jeden numer wersji: bez plakietki wersji karty, w edytorze wersja integracji
- 🎞️ Animacja w opisie bez plakietki wersji

## v1.4.15 – Dowolny kolor z palety, ikona HACS po restarcie

- 🎨 Karta v33: w kreatorze z kółkami (krok „Wygląd”) dowolny kolor osłony i ramy z palety, podgląd na żywo
- 🔤 Podpisy pod kółkami kolorów większe i wyraźniejsze w obu motywach
- 🖼️ Ikona Okna HA w HACS pojawia się sama po restarcie Home Assistanta, bez odświeżania strony (F5)
- 📖 Opis: większe ikony w nagłówkach, równo z tekstem; kroki kreatora bez urwanej ramki; nowa animacja z wyraźnymi przyciskami

## v1.4.14 – Czytelniejszy opis w obu motywach

- 🔴 Zaznaczenia „gdzie kliknąć” (ramki, numery, strzałki) w czerwieni Home Assistanta, jeden styl
- 🖼️ Makiety bez szarego tła, nic nie jest ucięte, dobrze widać je w motywie jasnym i ciemnym
- 📋 Tabele ikon bez kresek, ikony równo z tekstem

## v1.4.13 – Jednolity opis w kolorach HA

- 🎨 Cały opis w jednym stylu Home Assistanta, w 5 językach: niebieskie ramki, numery i plakietki zamiast czerwonych, prawdziwe ikony w makietach, aktualne logo i wersja, większy podgląd „Dodaj kartę”, podpisy pod obrazkami
- 🌗 Obrazki w opisie przełączają się z jasnym i ciemnym motywem
- 🧭 Jasno opisane dwa kreatory: z kółkami (7 kroków) i „Dodaj integrację” (5 kroków)
- 🪟 Tytuły kreatora i komunikaty bez emoji okna, które Windows rysował jako brązowe okno. Sekcja na panelu nazywa się „Okna” z ikoną rolety

## v1.4.12 – Sprzątanie po usunięciu

- 🧹 Po usunięciu ostatniego okna Okno HA samo kasuje swoje pliki karty z /config/.okno_ha i zapisane dane. Po restarcie HA nie zostaje skrypt karty ani podmiana ikony
- ℹ️ Karty Okno HA dodane na panele zostają na miejscu, bo to Twoje panele. Można je usunąć w edycji panelu

## v1.4.11 – Jedna aktualizacja zamiast dwóch

- 🔄 Gdy Okno HA jest zainstalowane przez HACS, nową wersję pokazuje tylko HACS. Nasza pozycja „Okno HA” w Aktualizacjach się wtedy chowa, więc nie ma już dwóch takich samych pozycji

## v1.4.10 – Logo w HACS bez odświeżania

- 🖼️ Logo Okna HA na liście HACS pojawia się też wtedy, gdy strona HACS była otwarta przed wczytaniem Okna HA (np. odświeżenie na stronie HACS). Nie trzeba niczego klikać ani czyścić pamięci przeglądarki
- 🖥️ Okienko „Update” od HACS dostaje logo Okna HA prosto z serwera HA, u każdego użytkownika, zaraz po instalacji

## v1.4.9 – Logo Okna HA w HACS

- 🖼️ Lista HACS i okienko „Update” pokazują logo Okna HA zamiast „icon not available”. HACS szuka ikony tylko na serwerze ikon Home Assistanta, więc Okno HA samo podaje przeglądarce swoje logo z integracji. Dotyczy tylko Okna HA, inne dodatki zostają bez zmian

## v1.4.8 – Opis po niemiecku, francusku i czesku

- 🌍 Pełny opis i instrukcja także po niemiecku, francusku i czesku, z obrazkami w tych językach. Na górze opisu jest 5 flag języków
- 🏷️ W HACS nazwa to teraz po prostu „Okno HA”

## v1.4.7 – Plakietki na samej górze

- 🏷️ W HACS plakietki, przycisk HACS i flagi języków są teraz na samej górze opisu, nad banerem

## v1.4.6 – Nowy opis w HACS

- 📖 Strona Okna HA w HACS ma nowy opis: plakietki i flagi języków na górze, „Dlaczego Okno HA”, „Przed i po” i galerię
- 🔄 Karta dalej odświeża się sama po każdej aktualizacji i zmianie ustawień, bez Ctrl+F5

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
