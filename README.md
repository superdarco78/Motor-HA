<p align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/hero2/baner-pl.png" width="100%" alt="Okno HA"></p>

<p align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/pokaz4-pl.webp" alt="Animacja: cztery osłony, dzień i noc, pogoda, ruch" width="100%"></p>

<h1 align="center">🪟 Okno HA – integracja</h1>

<p align="center">Każde okno z roletą to <b>urządzenie</b> w Home Assistancie. Kreator w 5 krokach, zmiana ustawień przyciskiem <b>Konfiguruj</b>, karta Okno HA w środku.</p>

<p align="center">
  <a href="https://github.com/superdarco78/okno-ha-integracja/releases"><img src="https://img.shields.io/github/v/release/superdarco78/okno-ha-integracja?style=for-the-badge&label=wersja&color=0288d1" alt="wersja"></a>
  <a href="https://hacs.xyz"><img src="https://img.shields.io/badge/HACS-custom-41BDF5?style=for-the-badge&logo=homeassistantcommunitystore&logoColor=white" alt="HACS"></a>
  <a href="https://www.home-assistant.io/"><img src="https://img.shields.io/badge/Home%20Assistant-2024.12%2B-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white" alt="Home Assistant"></a>
  <a href="https://github.com/superdarco78/okno-ha-integracja/blob/main/LICENSE"><img src="https://img.shields.io/badge/licencja-CC%20BY--NC--SA%204.0-green?style=for-the-badge" alt="licencja"></a>
</p>

> ℹ️ Działa z każdym silnikiem rolet w Home Assistant (`cover.*`): Zigbee, Z-Wave, Tuya, Shelly, Somfy i inne. Okno z jednym albo dwoma skrzydłami.

<p align="center">
<a href="https://github.com/superdarco78/okno-ha-integracja#wyglad-karty"><img width="24%" src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-kafelki2-pl-1.svg" alt="Pogoda"></a>
<a href="https://github.com/superdarco78/okno-ha-integracja#jak-sterowac"><img width="24%" src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-kafelki2-pl-2.svg" alt="Sterowanie palcem"></a>
<a href="https://github.com/superdarco78/okno-ha-integracja#kreator"><img width="24%" src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-kafelki2-pl-3.svg" alt="Kreator"></a>
<a href="https://github.com/superdarco78/okno-ha-integracja#kreator-2"><img width="24%" src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-kafelki2-pl-4.svg" alt="Czujnik okna"></a>
<a href="https://github.com/superdarco78/okno-ha-integracja#kreator-3"><img width="24%" src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-kafelki2-pl-5.svg" alt="Prędkość silnika"></a>
<a href="https://github.com/superdarco78/okno-ha-integracja#kreator-5"><img width="24%" src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-kafelki2-pl-6.svg" alt="Kolory"></a>
<a href="https://github.com/superdarco78/okno-ha-integracja#wyglad-karty"><img width="24%" src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-kafelki2-pl-7.svg" alt="Jasny i ciemny"></a>
<a href="https://github.com/superdarco78/okno-ha-integracja#tlumaczenia"><img width="24%" src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-kafelki2-pl-8.svg" alt="Polski i angielski"></a>
</p>

<a name="rodzaje-oslon"></a>
## <a name="j1" href="#j1"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/window-shutter.png" height="36" align="absmiddle"></a> Rodzaje osłon

15 rodzajów do wyboru: 8 w pokoju i 7 na zewnątrz. Wybierasz w kreatorze (krok 5) albo później w **Konfiguruj**.

<a name="j2"></a>
<p align="center"><a href="#j2"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/rodzaje-oslon-pl.png" width="100%" alt="15 rodzajów osłon"></a></p>

<a name="spis-tresci"></a>
## <a name="j3" href="#j3"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/format-list-bulleted.png" height="36" align="absmiddle"></a> Spis treści

**<img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/rocket-launch.png" height="26" align="absmiddle"> [Część 1. Dla początkujących](https://github.com/superdarco78/okno-ha-integracja#dla-poczatkujacych)** · wystarczy to
- [Instalacja krok po kroku](https://github.com/superdarco78/okno-ha-integracja#instalacja)
- [Kreator: 5 kroków](https://github.com/superdarco78/okno-ha-integracja#kreator)
- [Zmiana ustawień: Konfiguruj](https://github.com/superdarco78/okno-ha-integracja#konfiguruj)
- [Kolejne okno: Dodaj wpis](https://github.com/superdarco78/okno-ha-integracja#kolejne-okno)
- [Jak sterować](https://github.com/superdarco78/okno-ha-integracja#jak-sterowac)
- [Aktualizacja](https://github.com/superdarco78/okno-ha-integracja#aktualizacja)
- [Słowniczek: co znaczą te słowa?](https://github.com/superdarco78/okno-ha-integracja#slowniczek)
- [Pytania i problemy](https://github.com/superdarco78/okno-ha-integracja#pytania-i-problemy)

**<img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/wrench.png" height="26" align="absmiddle"> [Część 2. Dla zaawansowanych](https://github.com/superdarco78/okno-ha-integracja#dla-zaawansowanych)** · nie musisz
- [Co tworzy integracja](https://github.com/superdarco78/okno-ha-integracja#co-tworzy)
- [Wszystkie ustawienia](https://github.com/superdarco78/okno-ha-integracja#wszystkie-ustawienia)
- [Okno w automatyzacjach](https://github.com/superdarco78/okno-ha-integracja#automatyzacje)
- [Karta Okno HA w środku](https://github.com/superdarco78/okno-ha-integracja#wyglad-karty)
- [Instalacja bez HACS (ręcznie)](https://github.com/superdarco78/okno-ha-integracja#recznie)
- [Usuwanie](https://github.com/superdarco78/okno-ha-integracja#usuwanie)
- [Tłumaczenia](https://github.com/superdarco78/okno-ha-integracja#tlumaczenia)
- [Licencja](https://github.com/superdarco78/okno-ha-integracja#licencja)

**🇬🇧 [English](https://github.com/superdarco78/okno-ha-integracja#english)**

---

<a name="dla-poczatkujacych"></a>
# <a name="j4" href="#j4"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/rocket-launch.png" height="46" align="absmiddle"></a> Część 1. Dla początkujących

> ℹ️ **To wszystko, czego potrzebujesz.** 7 kroków, kilka minut. Część 2 możesz pominąć.

<a name="instalacja"></a>
## <a name="j5" href="#j5"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/download.png" height="36" align="absmiddle"></a> Instalacja krok po kroku

<a name="krok-1"></a>
<h3 align="center">1️⃣ Kliknij ten przycisk, potem <b>Otwórz link</b></h3>

<p align="center"><a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=okno-ha-integracja&category=integration"><img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Otwórz w HACS" height="80"></a></p>

<a name="j6"></a>
<p align="center"><a href="#j6"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/krok-1.svg" width="100%" alt="Krok 1"></a></p>

<a name="krok-2"></a>
<h3 align="center">2️⃣ Kliknij <b>Dodaj</b></h3>

<a name="j7"></a>
<p align="center"><a href="#j7"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/krok-2.svg" width="100%" alt="Krok 2"></a></p>

<a name="krok-3"></a>
<h3 align="center">3️⃣ Kliknij <b>Pobierz</b>, potem jeszcze raz <b>Pobierz</b></h3>

<a name="j8"></a>
<p align="center"><a href="#j8"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/krok-3.svg" width="100%" alt="Krok 3"></a></p>

<a name="krok-4"></a>
<h3 align="center">4️⃣ Uruchom HA ponownie i odczekaj 1–2 minuty</h3>

<a name="j9"></a>
<p align="center"><a href="#j9"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/krok-4.svg" width="100%" alt="Krok 4"></a></p>

<a name="krok-5"></a>
<h3 align="center">5️⃣ Kliknij ten przycisk i przejdź kreator</h3>

<p align="center"><a href="https://my.home-assistant.io/redirect/config_flow_start/?domain=okno_ha"><img src="https://my.home-assistant.io/badges/config_flow_start.svg" alt="Dodaj integrację Okno HA" height="80"></a></p>

<a name="j10"></a>
<p align="center"><a href="#j10"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/krok-5.svg" width="100%" alt="Krok 5"></a></p>

<a name="krok-6"></a>
<h3 align="center">6️⃣ Gotowe: okno jest urządzeniem</h3>

<a name="j11"></a>
<p align="center"><a href="#j11"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/krok-6.svg" width="100%" alt="Krok 6"></a></p>

<a name="krok-7"></a>
<h3 align="center">7️⃣ Dodaj kartę na pulpit</h3>

<p align="center">Ołówek → <b>＋ Dodaj kartę</b> → wpisz <b>Okno</b>. Karta sama wybierze okno z integracji.</p>

<a name="j12"></a>
<p align="center"><a href="#j12"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-zrzuty2-pl-dodaj-karte.svg" width="100%" alt="Krok 7"></a></p>

> ℹ️ Przyciski otwierają Twój Home Assistant. Za pierwszym razem strona zapyta o adres Twojego HA.

---

<a name="kreator"></a>
## <a name="j13" href="#j13"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/auto-fix.png" height="36" align="absmiddle"></a> Kreator: 5 kroków

Kreator otwiera się po kliknięciu **Dodaj integrację** (krok 5 instalacji). Ten sam kreator otwiera **Konfiguruj**.

<table>
<tr><th align="center"><a name="j14" href="#j14"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="90" height="0"></a><br>Krok</th><th align="left"><a name="j15" href="#j15"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="330" height="0"></a><br>Co wybierasz</th><th align="left"><a name="j16" href="#j16"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="480" height="0"></a><br>Po co</th></tr>
<tr><td align="center">1</td><td align="left"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/window-shutter.png" height="28" align="absmiddle" alt=""> <b>Roleta</b></td><td align="left">Nazwa okna i roleta (jedna albo dwie: lewa, prawa)</td></tr>
<tr><td align="center">2</td><td align="left"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/window-open-variant.png" height="28" align="absmiddle" alt=""> <b>Okno i czujniki</b></td><td align="left">Ile skrzydeł i czujniki otwarcia okna</td></tr>
<tr><td align="center">3</td><td align="left"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/speedometer.png" height="28" align="absmiddle" alt=""> <b>Silnik</b></td><td align="left">Żeby animacja jechała tak szybko jak prawdziwa roleta</td></tr>
<tr><td align="center">4</td><td align="left"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/weather-partly-cloudy.png" height="28" align="absmiddle" alt=""> <b>Pogoda</b></td><td align="left">Żeby za szybą było widać prawdziwą pogodę</td></tr>
<tr><td align="center">5</td><td align="left"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/palette.png" height="28" align="absmiddle" alt=""> <b>Wygląd</b></td><td align="left">Rodzaj osłony, kolor, rama i wysokość karty</td></tr>
</table>

> ℹ️ Nie wiesz, co wybrać? Kroki 2–4 możesz zostawić puste. Wszystko zmienisz później w **Konfiguruj**.

<a name="kreator-1"></a>
#### <a name="j17" href="#j17"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/window-shutter.png" height="32" align="absmiddle"></a> Krok 1: Roleta

<a name="j18"></a>
<p align="center"><a href="#j18"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/kreator-1.svg" width="100%" alt="Krok 1: Roleta"></a></p>

<a name="kreator-2"></a>
#### <a name="j19" href="#j19"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/window-open-variant.png" height="32" align="absmiddle"></a> Krok 2: Okno i czujniki

<a name="j20"></a>
<p align="center"><a href="#j20"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/kreator-2.svg" width="100%" alt="Krok 2: Okno i czujniki"></a></p>

<a name="kreator-3"></a>
#### <a name="j21" href="#j21"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/speedometer.png" height="32" align="absmiddle"></a> Krok 3: Silnik

<a name="j22"></a>
<p align="center"><a href="#j22"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/kreator-3.svg" width="100%" alt="Krok 3: Silnik"></a></p>

<a name="kreator-4"></a>
#### <a name="j23" href="#j23"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/weather-partly-cloudy.png" height="32" align="absmiddle"></a> Krok 4: Pogoda

<a name="j24"></a>
<p align="center"><a href="#j24"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/kreator-4.svg" width="100%" alt="Krok 4: Pogoda"></a></p>

<a name="kreator-5"></a>
#### <a name="j25" href="#j25"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/palette.png" height="32" align="absmiddle"></a> Krok 5: Wygląd

<a name="j26"></a>
<p align="center"><a href="#j26"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/kreator-5.svg" width="100%" alt="Krok 5: Wygląd"></a></p>

> ℹ️ ✅ **Gotowe.** Po **Zatwierdź** okno pojawi się jako urządzenie „Okno …”.

---

<a name="konfiguruj"></a>
## <a name="j27" href="#j27"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/tune.png" height="36" align="absmiddle"></a> Zmiana ustawień: Konfiguruj

Każde okno zmienisz w dowolnej chwili. Kliknij **Konfiguruj** przy oknie. Otworzy się ten sam kreator z obecnymi ustawieniami. Po zapisaniu karta od razu pokazuje zmiany.

<p align="center"><a href="https://my.home-assistant.io/redirect/integration/?domain=okno_ha"><img src="https://my.home-assistant.io/badges/integration.svg" alt="Otwórz Okno HA" height="56"></a></p>

<a name="j28"></a>
<p align="center"><a href="#j28"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/konfiguruj.svg" width="100%" alt="Konfiguruj"></a></p>

<a name="kolejne-okno"></a>
## <a name="j29" href="#j29"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/window-open-variant.png" height="36" align="absmiddle"></a> Kolejne okno: Dodaj wpis

Masz więcej okien? Na tej samej stronie kliknij **＋ Dodaj wpis** (punkt 2 na obrazku wyżej) albo jeszcze raz przycisk **Dodaj integrację**. Każde okno to osobne urządzenie z własną kartą.

<p align="center"><a href="https://my.home-assistant.io/redirect/config_flow_start/?domain=okno_ha"><img src="https://my.home-assistant.io/badges/config_flow_start.svg" alt="Dodaj kolejne okno" height="80"></a></p>

---

<a name="jak-sterowac"></a>
## <a name="j30" href="#j30"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/gesture-tap.png" height="36" align="absmiddle"></a> Jak sterować

<table>
<tr><th align="center"><a name="j31" href="#j31"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="90" height="0"></a><br>Ikona</th><th align="left"><a name="j32" href="#j32"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="330" height="0"></a><br>Co robisz</th><th align="left"><a name="j33" href="#j33"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="480" height="0"></a><br>Co się dzieje</th></tr>
<tr><td align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/drag-horizontal-variant.png" height="48" alt=""></td><td align="left">Ciągniesz uchwyt na dole jednego skrzydła</td><td align="left">Rusza się tylko to jedno skrzydło</td></tr>
<tr><td align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/swap-vertical-circle-outline.png" height="48" alt=""></td><td align="left">Ciągniesz okrągły uchwyt na środku</td><td align="left">Ruszają się oba skrzydła</td></tr>
<tr><td align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/gesture-swipe-vertical.png" height="48" alt=""></td><td align="left">Ciągniesz palcem po szybie</td><td align="left">Ruszają się oba skrzydła</td></tr>
<tr><td align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/stop.png" height="48" alt=""></td><td align="left">Klikasz STOP albo dotykasz okna w czasie ruchu</td><td align="left">Wszystko staje</td></tr>
<tr><td align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/arrow-up.png" height="48" alt=""></td><td align="left">Klikasz strzałkę w górę</td><td align="left">Jedzie na samą górę: okno odsłonięte</td></tr>
<tr><td align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/arrow-down.png" height="48" alt=""></td><td align="left">Klikasz strzałkę w dół</td><td align="left">Jedzie na sam dół: okno zasłonięte</td></tr>
<tr><td align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/unfold-more-horizontal.png" height="48" alt=""></td><td align="left">Klikasz ▲ 5% albo ▼ 5%</td><td align="left">Jedzie trochę w górę albo w dół</td></tr>
<tr><td align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/kafle/percent-outline.png" height="48" alt=""></td><td align="left">Klikasz gotową pozycję, np. 75%</td><td align="left">Jedzie do tej pozycji</td></tr>
</table>

<a name="j34"></a>
<p align="center"><a href="#j34"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-opis-elementow.svg" width="100%" alt="Uchwyty i przyciski"></a></p>

Okno możesz też otworzyć i zamknąć jak każdą roletę: na stronie urządzenia, głosem albo w automatyzacji. Rusza wtedy oboma skrzydłami naraz.

---

<a name="aktualizacja"></a>
## <a name="j35" href="#j35"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/update.png" height="36" align="absmiddle"></a> Aktualizacja

> ℹ️ Aktualizacja **nie zmienia** Twoich ustawień. Okna i karty działają dalej.

Gdy wyjdzie nowa wersja, HA sam ją pokaże w **Ustawieniach**, najpóźniej po 2 minutach. Osobno karta i osobno integracja.

<p align="center"><a href="https://my.home-assistant.io/redirect/updates/"><img src="https://my.home-assistant.io/badges/updates.svg" alt="Aktualizacje" height="56"></a></p>

<a name="j36"></a>
<p align="center"><a href="#j36"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/aktualizacja-1.svg" width="100%" alt="Aktualizacje"></a></p>

Kliknij **Zainstaluj**. Karta działa od razu, bez restartu. Po aktualizacji integracji HA poprosi o ponowne uruchomienie.

<a name="j37"></a>
<p align="center"><a href="#j37"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/aktualizacja-2.svg" width="100%" alt="Zainstaluj"></a></p>

Co nowego w każdej wersji: [📝 Historia zmian](https://github.com/superdarco78/okno-ha-integracja/blob/main/CHANGELOG.md) i [wydania](https://github.com/superdarco78/okno-ha-integracja/releases).

---

<a name="slowniczek"></a>
## <a name="j38" href="#j38"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/book-open-variant.png" height="36" align="absmiddle"></a> Słowniczek: co znaczą te słowa?

<table>
<tr><th align="left"><a name="j39" href="#j39"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="260" height="0"></a><br>Słowo</th><th align="left"><a name="j40" href="#j40"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="640" height="0"></a><br>Po ludzku</th></tr>
<tr><td align="left"><b>Home Assistant (HA)</b></td><td align="left">Program, który steruje Twoim domem.</td></tr>
<tr><td align="left"><b>HACS</b></td><td align="left">„Sklep” z dodatkami do HA. Stąd pobierasz integrację.</td></tr>
<tr><td align="left"><b>Integracja</b></td><td align="left">Dodatek, który dodaje do HA nowe urządzenia. Tu: okna.</td></tr>
<tr><td align="left"><b>Urządzenie</b></td><td align="left">Jedno okno, np. „Okno Salon”. Widać je w Ustawienia → Urządzenia oraz usługi.</td></tr>
<tr><td align="left"><b>Encja</b></td><td align="left">Jedna rzecz urządzenia, którą HA widzi i którą steruje. Okno ma encję rolety.</td></tr>
<tr><td align="left"><b>Wpis</b></td><td align="left">Jedno dodane okno na stronie integracji. Kolejne okno = <b>Dodaj wpis</b>.</td></tr>
<tr><td align="left"><b>Konfiguruj</b></td><td align="left">Przycisk przy oknie: zmienia jego ustawienia.</td></tr>
<tr><td align="left"><b>Karta</b></td><td align="left">Okienko na ekranie HA. Tu: realistyczne okno z roletą.</td></tr>
<tr><td align="left"><b>Pulpit</b></td><td align="left">Ekran w HA, na którym leżą karty.</td></tr>
<tr><td align="left"><b>Czujnik okna</b></td><td align="left">Czujnik na oknie: wie, czy okno jest zamknięte, uchylone czy otwarte.</td></tr>
<tr><td align="left"><b>Zwinięta / 100%</b></td><td align="left">Roleta na samej górze, okno odsłonięte.</td></tr>
<tr><td align="left"><b>Opuszczona / 0%</b></td><td align="left">Roleta na samym dole, okno zasłonięte.</td></tr>
</table>

---

<a name="pytania-i-problemy"></a>
## <a name="j41" href="#j41"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/help-circle.png" height="36" align="absmiddle"></a> Pytania i problemy

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/alert-circle-outline.png" height="26" align="absmiddle"> Nie ma „Okno HA” na liście integracji

Po pobraniu z HACS trzeba uruchomić HA ponownie (krok 4). Potem odśwież stronę: <b>Ctrl + Shift + R</b>. W telefonie zamknij i otwórz aplikację.

<a name="j42"></a>
<p align="center"><a href="#j42"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/krok-4.svg" width="100%" alt="Nie ma „Okno HA” na liście integracji"></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/alert-circle-outline.png" height="26" align="absmiddle"> Nie ma karty na liście „Dodaj kartę”

Odśwież stronę: <b>Ctrl + Shift + R</b>. W telefonie zamknij i otwórz aplikację HA. Potem ołówek, <b>Dodaj kartę</b> i wpisz <b>Okno</b>.

<a name="j43"></a>
<p align="center"><a href="#j43"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-faq-pl-karta.svg" width="100%" alt="Nie ma karty na liście „Dodaj kartę”"></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/alert-circle-outline.png" height="26" align="absmiddle"> Animacja jedzie szybciej albo wolniej niż roleta

<b>Konfiguruj</b> → krok 3: wybierz prędkość silnika albo wpisz czas pełnego przejazdu w sekundach.

<a name="j44"></a>
<p align="center"><a href="#j44"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/kreator-3.svg" width="100%" alt="Animacja jedzie szybciej albo wolniej niż roleta"></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/alert-circle-outline.png" height="26" align="absmiddle"> Nie widać pogody za oknem

<b>Konfiguruj</b> → krok 4: wybierz swoją pogodę albo zostaw puste. Puste = pogoda z internetu dla Twojego domu.

<a name="j45"></a>
<p align="center"><a href="#j45"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/kreator-4.svg" width="100%" alt="Nie widać pogody za oknem"></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/alert-circle-outline.png" height="26" align="absmiddle"> Czujnik okna nie działa

<b>Konfiguruj</b> → krok 2: wybierz czujnik i to, jak okno się otwiera: uchylone albo otwarte na zawiasach.

<a name="j46"></a>
<p align="center"><a href="#j46"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/kreator-2.svg" width="100%" alt="Czujnik okna nie działa"></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/alert-circle-outline.png" height="26" align="absmiddle"> Skrzydła są zamienione (lewe to prawe)

<b>Konfiguruj</b> → krok 1: usuń obie rolety i wybierz je jeszcze raz: najpierw lewą, potem prawą.

<a name="j47"></a>
<p align="center"><a href="#j47"><img src="https://raw.githubusercontent.com/superdarco78/okno-ha-integracja/main/img/kroki/kreator-1.svg" width="100%" alt="Skrzydła są zamienione (lewe to prawe)"></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/alert-circle-outline.png" height="26" align="absmiddle"> Roleta skacze do 0% albo 100% w trakcie jazdy

To złe meldunki silnika. Karta je pomija. Jeśli dalej skacze, <a href="https://github.com/superdarco78/okno-ha-integracja/issues/new">zgłoś błąd</a> i podaj nazwę silnika.

<a name="j48"></a>
<p align="center"><a href="#j48"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-faq-pl-blad.svg" width="100%" alt="Roleta skacze do 0% albo 100% w trakcie jazdy"></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/alert-circle-outline.png" height="26" align="absmiddle"> Karta jest po angielsku, a chcę po polsku

Karta bierze język z Twojego profilu HA. Możesz też w edytorze karty otworzyć <b>Zaawansowane</b> i w polu <b>Język karty</b> wybrać <b>Polski</b>.

<a name="j49"></a>
<p align="center"><a href="#j49"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/auto/z3-faq-pl-jezyk.svg" width="100%" alt="Karta jest po angielsku, a chcę po polsku"></a></p>

Nie ma tu odpowiedzi? [Zgłoś błąd](https://github.com/superdarco78/okno-ha-integracja/issues/new) albo napisz na [forum HA](https://community.home-assistant.io/) / [forum arturhome.pl](https://forum.arturhome.pl/).

---

<a name="dla-zaawansowanych"></a>
# <a name="j50" href="#j50"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/wrench.png" height="46" align="absmiddle"></a> Część 2. Dla zaawansowanych

> ℹ️ **Nie musisz tego czytać.** Kreator ustawił już wszystko. Tu są szczegóły.

<a name="co-tworzy"></a>
## <a name="j51" href="#j51"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/puzzle.png" height="36" align="absmiddle"></a> Co tworzy integracja

<table>
<tr><th align="left"><a name="j52" href="#j52"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="260" height="0"></a><br>Co</th><th align="left"><a name="j53" href="#j53"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="640" height="0"></a><br>Opis</th></tr>
<tr><td align="left"><b>Urządzenie „Okno …”</b></td><td align="left">Jedno na każde okno (każdy wpis). Producent: Okno HA, model: rodzaj osłony.</td></tr>
<tr><td align="left"><b>Encja <code>cover.okno_…</code></b></td><td align="left">Roleta okna. Pozycja = średnia skrzydeł. Otwórz, zamknij, stop i pozycja idą do obu rolet skrzydeł naraz. Typ: roleta, żaluzja albo okiennica, zależnie od osłony.</td></tr>
<tr><td align="left"><b>Atrybut <code>okno_ha</code></b></td><td align="left">Ustawienia z kreatora dla karty. Karta czyta je sama, więc nie trzeba nic wpisywać w karcie.</td></tr>
<tr><td align="left"><b>Urządzenie „Okno HA”</b></td><td align="left">Jedno na całą integrację: dwie encje aktualizacji, <b>Karta Okno HA</b> i <b>Integracja Okno HA</b>. Sprawdzają GitHub co około 2 minuty.</td></tr>
<tr><td align="left"><b>Karta Okno HA</b></td><td align="left">Wbudowana. Ładuje się sama na każdym pulpicie, bez dodawania zasobu.</td></tr>
</table>

<a name="wszystkie-ustawienia"></a>
## <a name="j54" href="#j54"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/cog.png" height="36" align="absmiddle"></a> Wszystkie ustawienia

<table>
<tr><th align="center"><a name="j55" href="#j55"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="90" height="0"></a><br>Krok</th><th align="left"><a name="j56" href="#j56"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="300" height="0"></a><br>Pole</th><th align="left"><a name="j57" href="#j57"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="510" height="0"></a><br>Co wpisać</th></tr>
<tr><td align="center">1</td><td align="left">Nazwa okna</td><td align="left">Np. Salon. Urządzenie: „Okno Salon”. Tylko przy dodawaniu.</td></tr>
<tr><td align="center">1</td><td align="left">Roleta (jedna albo dwie)</td><td align="left">1 albo 2 encje <code>cover.*</code>. Dwie = lewa, potem prawa. Może być też grupa.</td></tr>
<tr><td align="center">2</td><td align="left">Liczba skrzydeł</td><td align="left">1 albo 2. Domyślnie tyle, ile rolet.</td></tr>
<tr><td align="center">2</td><td align="left">Czujnik lewego / prawego skrzydła</td><td align="left">Encja <code>binary_sensor.*</code>. Nieobowiązkowe.</td></tr>
<tr><td align="center">2</td><td align="left">Skrzydło po otwarciu</td><td align="left"><b>uchylone</b> albo <b>otwarte na zawiasach</b>.</td></tr>
<tr><td align="center">3</td><td align="left">Prędkość silnika – lewa / prawa</td><td align="left">Encja <code>number.*</code> z prędkością (np. Moes). Nieobowiązkowe.</td></tr>
<tr><td align="center">3</td><td align="left">Czas pełnego przejazdu</td><td align="left">0–120 s. 0 = automatycznie (z prędkości silnika albo 30 s).</td></tr>
<tr><td align="center">4</td><td align="left">Pogoda</td><td align="left">Encja <code>weather.*</code>. Puste = pogoda z internetu (Open-Meteo) dla Twojego domu.</td></tr>
<tr><td align="center">5</td><td align="left">Rodzaj osłony</td><td align="left">W pokoju: Dzień-noc, Materiałowa, Zaciemniająca, Plisa, Plaster miodu, Rzymska, Żaluzja aluminiowa, Żaluzja drewniana. Na zewnątrz: Roleta nadstawna, natynkowa, podtynkowa, z perforacją, Żaluzja fasadowa C80 i Z90, Screen ZIP.</td></tr>
<tr><td align="center">5</td><td align="left">Kolor osłony</td><td align="left">Czarny, Grafit, Szary, Beżowy, Kremowy, Biały, Brąz, Granat, Pomarańczowy albo własny, np. <code>#3a3d42</code>.</td></tr>
<tr><td align="center">5</td><td align="left">Kolor ramy okna</td><td align="left">Biała, Kremowa, Srebrna, Szara, Antracyt, Czarna, Złoty dąb, Dąb jasny, Winchester albo własny, np. <code>#f4f4f2</code>.</td></tr>
<tr><td align="center">5</td><td align="left">Wysokość okna na karcie</td><td align="left">140–460 px. Domyślnie 260.</td></tr>
</table>

<a name="automatyzacje"></a>
## <a name="j58" href="#j58"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/flask-outline.png" height="36" align="absmiddle"></a> Okno w automatyzacjach

Okno to zwykła roleta w HA. W automatyzacji wybierz akcję **Roleta: ustaw pozycję** (albo otwórz / zamknij) i encję okna, np. **Okno Salon**. Obie rolety skrzydeł ruszą razem.

<a name="wyglad-karty"></a>
## <a name="j59" href="#j59"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/theme-light-dark.png" height="36" align="absmiddle"></a> Karta Okno HA w środku

Integracja ma w sobie kartę Okno HA. Nie trzeba jej instalować osobno ani dodawać zasobu. Karta ma jasny i ciemny wygląd, pogodę za oknem, dzień i noc.

<p align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/animacja.webp" width="49%" alt="Animacja rolety">&nbsp;<img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/animacja-ciemna.webp" width="49%" alt="Animacja rolety"></p>

Pełny opis karty (edytor, wszystkie opcje, przykłady): [superdarco78/roleta-realistyczna](https://github.com/superdarco78/roleta-realistyczna).

> ℹ️ Masz już kartę Okno HA z HACS? Nic nie szkodzi. Obie mogą być zainstalowane.

<a name="recznie"></a>
## <a name="j60" href="#j60"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/toolbox.png" height="36" align="absmiddle"></a> Instalacja bez HACS (ręcznie)

1. Pobierz [najnowsze wydanie](https://github.com/superdarco78/okno-ha-integracja/releases/latest) (Source code, zip).
2. Skopiuj folder `custom_components/okno_ha` do folderu `config/custom_components/` w HA (np. dodatkiem **File editor** albo **Samba**).
3. Uruchom HA ponownie i kliknij **Dodaj integrację** (krok 5 instalacji).

<a name="usuwanie"></a>
## <a name="j61" href="#j61"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/alert-circle-outline.png" height="36" align="absmiddle"></a> Usuwanie

Jedno okno: **Ustawienia → Urządzenia oraz usługi → Okno HA**, przy oknie **⋮ → Usuń**. Całą integrację: usuń wszystkie okna, potem w HACS **⋮ → Usuń** i uruchom HA ponownie. Twoje prawdziwe rolety zostają bez zmian.

<a name="tlumaczenia"></a>
## <a name="j62" href="#j62"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/translate.png" height="36" align="absmiddle"></a> Tłumaczenia

<table>
<tr><th align="left"><a name="j63" href="#j63"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="260" height="0"></a><br>Język</th><th align="left"><a name="j64" href="#j64"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/odstep.png" width="640" height="0"></a><br>Stan</th></tr>
<tr><td align="left">🇵🇱 Polski</td><td align="left">✅ 100%</td></tr>
<tr><td align="left">🇬🇧 English</td><td align="left">✅ 100%</td></tr>
</table>

Chcesz dodać swój język? Skopiuj [`translations/en.json`](https://github.com/superdarco78/okno-ha-integracja/blob/main/custom_components/okno_ha/translations/en.json), przetłumacz teksty i wyślij w [zgłoszeniu](https://github.com/superdarco78/okno-ha-integracja/issues/new).

---

<a name="english"></a>
## 🇬🇧 English

Each window with a shade becomes a **device** in Home Assistant. The Okno HA (HA Window) card is bundled.

1. Click the button below, then **Open link**, then **Add** and **Download** in HACS.

<p align="center"><a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=okno-ha-integracja&category=integration"><img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Open in HACS" height="80"></a></p>

2. Restart Home Assistant (**Settings → System → ⏻ → Restart**) and wait 1–2 minutes.
3. Click this button and follow the 5-step wizard: shade, window and sensors, motor, weather, look.

<p align="center"><a href="https://my.home-assistant.io/redirect/config_flow_start/?domain=okno_ha"><img src="https://my.home-assistant.io/badges/config_flow_start.svg" alt="Add integration" height="80"></a></p>

4. The window appears in **Settings → Devices & services** as a device „Okno …” with one cover entity.
5. Dashboard: pencil → **+ Add card** → type **Okno**. The card picks the window by itself.

Change anything later with **Configure**. Add more windows with **Add entry**. Updates appear in **Settings → Updates** (card and integration separately).

<a name="licencja"></a>
## <a name="j65" href="#j65"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/z3/ikony-ha3/scale-balance.png" height="36" align="absmiddle"></a> Licencja

CC BY-NC-SA 4.0 – zobacz [LICENSE](https://github.com/superdarco78/okno-ha-integracja/blob/main/LICENSE). Karta: [superdarco78/roleta-realistyczna](https://github.com/superdarco78/roleta-realistyczna).
