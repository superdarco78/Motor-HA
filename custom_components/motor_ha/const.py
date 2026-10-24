"""Stałe Motor HA 2.0: nazwy, klucze ustawień, rodzaje urządzeń i funkcje automatyki."""

from __future__ import annotations

DOMAIN = "motor_ha"
NAZWA = "Motor HA"
VERSION = "2.2.20"
WLASCICIEL = "superdarco78"
REPO = "Motor-HA"
KARTA_PLIK = "motor-ha.js"
LOADER = "motor-ha-loader.js"
PACZKA = "motor_ha.zip"

# --- tryb kreatora ---
TRYB = "tryb"
PODSTAWOWY = "podstawowy"
ZAAWANSOWANY = "zaawansowany"

# --- co masz w domu (pierwszy ekran kreatora) ---
MAM = "mam"
# klucz → czy tylko w trybie zaawansowanym
URZADZENIA: dict[str, bool] = {
    "zew": False,        # osłona zewnętrzna
    "lamele": False,     # osłona z obracanymi lamelami
    "brama": False,      # brama wjazdowa lub garaż
    "foto": False,       # fotokomórka bramy w HA
    "okno": False,       # czujnik okna
    "drzwi": True,       # drzwi tarasowe / balkonowe (czujnik)
    "obecnosc": False,   # czujnik obecności (mmWave)
    "ruch": False,       # czujnik ruchu (PIR)
    "pogoda": False,     # encja pogody
    "temp": False,       # temperatura na zewnątrz
    "grupy": False,      # kilka osłon w domu
    "temp_pokoj": True,  # temperatura w pokoju
    "jasnosc": True,     # luksomierz / fotowoltaika
    "wiatr": True,       # wiatromierz
    "deszcz": True,      # czujnik deszczu
    "drgania": True,     # czujnik drgań markizy
    "ostrzezenia": True, # ostrzeżenia pogodowe (IMGW, Meteoalarm)
    "dym": True,         # czujnik dymu
    "alarm": True,       # centrala alarmowa
    "osoby": True,       # telefony domowników (person)
    "przeszkoda": True,  # czujnik przeszkody przy drzwiach balkonowych
}

# --- urządzenie ---
CONF_ROLETY = "rolety"
CONF_NAZWA = "name"
CONF_POKOJ = "pokoj"            # obszar HA (area_id)
CONF_RODZAJ_POKOJU = "rodzaj_pokoju"
CONF_UKRYJ_ZRODLO = "ukryj_zrodlo"   # silnik źródłowy niewidoczny dla Assist (domyślnie nie)
CONF_OSLONA = "oslona"
CONF_KOLOR = "kolor"
CONF_RAMA = "rama"
CONF_KOLOR_WLASNY = "kolor_wlasny"
CONF_RAMA_WLASNA = "rama_wlasna"
CONF_SKRZYDLA = "skrzydla"
CONF_WYSOKOSC = "wysokosc"
CONF_CZUJNIK_LEWE = "czujnik_lewe"
CONF_CZUJNIK_PRAWE = "czujnik_prawe"
CONF_TRYB_LEWE = "tryb_lewe"
CONF_TRYB_PRAWE = "tryb_prawe"
CONF_PREDKOSC_LEWA = "predkosc_lewa"
CONF_PREDKOSC_PRAWA = "predkosc_prawa"
CONF_CZAS = "czas"
CONF_KALIBRUJ = "kalibruj"
CONF_KALIBRACJA_50 = "kalibracja_50"   # po udanej kalibracji osłona staje na 50 % (domyślnie nie)
CONF_POGODA = "pogoda"
CONF_ODWROC = "odwroc"
CONF_OSOBNO = "osobno"   # dwa skrzydła sterowane osobno: suwak każdej osłony po jej stronie okna
CONF_NA_PANEL = "na_panel"
CONF_KARTA = "karta"            # ustawienia z edytora karty
# klucze karty, które ustawia też kreator: po „Dalej”/„Zapisz” w kreatorze liczy się kreator, nie stara karta
KARTA_Z_KREATORA = ("oslona", "kolor", "rama", "wysokosc", "skrzydla", "czas", "pogoda", "tryb_lewe", "tryb_prawe",
                    "czujnik_lewe", "czujnik_prawe", "predkosc_lewa", "predkosc_prawa", "odwroc", "osobno",
                    "roleta_lewa", "roleta_prawa", "rodzaj_pokoju", "foto_stan", "przeszkoda", "pola", "sciana")

TRYBY_SKRZYDLA = ["uchyl", "otworz"]
POKOJE = ["salon", "sypialnia", "kuchnia", "dziecko", "gabinet", "lazienka", "jadalnia", "przedpokoj", "inny"]

# czujniki (klucze = nazwy pól w kreatorze)
CZUJNIKI = {
    "temp": "czujnik_temp",
    "temp_pokoj": "czujnik_temp_pokoj",
    "jasnosc": "czujnik_jasnosc",
    "wiatr": "czujnik_wiatr",
    "deszcz": "czujnik_deszcz",
    "drgania": "czujnik_drgania",
    "ostrzezenia": "czujnik_ostrzezenia",
    "dym": "czujnik_dym",
    "alarm": "czujnik_alarm",
    "drzwi": "czujnik_drzwi",
    "przeszkoda": "czujnik_przeszkoda",
    "foto": "czujnik_foto",
    "obecnosc": "czujnik_obecnosc",
    "ruch": "czujnik_ruch",
}
CONF_OSOBY = "osoby"
CONF_SWIETA = "czujnik_swieta"      # binary_sensor workday
CONF_FOTO_STAN = "foto_stan"        # który stan czujnika = przeszkoda

# --- rodzaje urządzeń (te same klucze co w karcie) ---
OSLONY_WEW = ["pelna", "kasetowa", "zebra", "zaciemniajaca", "plisa", "plaster", "rzymska",
              "zaluzja", "drewniana", "pionowa", "zaslona",
              # 2.2.7: katalog jak u producentów (Velux, Fakro, Roto, Anwis)
              "roleta_zip_wew", "bambusowa", "plisa_gora_dol", "zaslona_wave", "firana", "panel", "ekran", "dach_dkl", "dach_fhb", "dach_pal", "dach_fhl", "dach_dn"]
OSLONY_ZEW = ["natynkowa", "podtynkowa", "zewnetrzna", "perforowana", "fasadowa", "fasadowaz", "markiza", "screen",
              "dach_ssl", "dachowa", "dach_msl", "markizeta_dach", "natynkowa_okragla", "adaptacyjna", "roleta_moskitiera", "ekstrudowana", "roleta_drzwi", "fasadowa_f80", "markizoleta", "okiennice", "okiennice_przesuwne", "markiza_otwarta", "markiza_polkasetowa", "markiza_kasetowa", "markiza_volant", "markiza_koszowa", "markiza_wolnostojaca", "markiza_zimowa", "markizeta", "markiza_balkonowa", "markiza_pionowa", "markiza_boczna", "zagiel", "parasol", "pergola", "pergola_tkanina", "zadaszenie", "screen_taras", "moskitiera", "moskitiera_plisa_okno", "moskitiera_drzwi", "moskitiera_zip_drzwi"]
# okna, świetliki i wyłazy z napędem – tylko ręcznie i licznik, bez automatyk słońca
OKNA = ["okno_silownik", "okno_dachowe", "okno_plaskie", "swietlik", "wylaz"]
BRAMY = ["przesuwna", "skrzydlowa", "segmentowa", "uchylna", "roletowa", "furtka", "garaz_boczna", "garaz_skrzydlowa", "szlaban"]
OSLONY = OSLONY_WEW + OSLONY_ZEW + OKNA
RODZAJE = OSLONY + BRAMY
Z_LAMELAMI = ["zaluzja", "drewniana", "fasadowa", "fasadowaz", "pionowa", "fasadowa_f80", "dach_pal", "pergola"]
MARKIZY = ["markiza"] + [k for k in OSLONY_ZEW if k.startswith("markiz")] + ["pergola_tkanina", "zadaszenie", "zagiel", "parasol"]
ZWIJA_DESZCZ = MARKIZY + ["fasadowa", "fasadowaz", "fasadowa_f80", "screen", "screen_taras", "dach_msl"]   # deszcz szkodzi
ZASLONY = ["zaslona", "zaslona_wave", "firana", "panel"]
GARAZE = ["segmentowa", "uchylna", "roletowa", "garaz_boczna", "garaz_skrzydlowa"]

# --- funkcje automatyki: klucz → (wymagane urządzenia z MAM, tylko zaawansowany) ---
# "zew" oznacza osłonę zewnętrzną (albo żaluzję fasadową), "!brama" – nie dla bram.
FUNKCJE: dict[str, tuple[tuple[str, ...], bool]] = {
    "harmonogram": ((), False),
    "slonce": ((), False),
    "blokada": (("okno",), False),
    "wiatr": (("zew", "pogoda|wiatr"), False),
    "obecnosc": (("obecnosc|ruch",), False),
    "wakacje": (("obecnosc|ruch|osoby",), False),
    "licznik": ((), False),
    "reczny": ((), True),
    "posrednia": ((), True),
    "dni": ((), True),
    "wietrzenie": (("okno",), True),
    "drzwi": (("drzwi",), True),
    "oslepianie": ((), True),
    "zima": ((), True),
    "jasnosc": (("jasnosc",), True),
    "temp_pokoj": (("temp_pokoj",), True),
    "deszcz": (("zew", "pogoda|deszcz"), True),
    "mroz": (("zew", "temp|pogoda"), True),
    "grad": (("zew", "ostrzezenia"), True),
    "drgania": (("drgania",), True),
    "upal": (("pogoda",), True),
    "dym": (("dym",), True),
    "alarm": (("alarm",), True),
    "nikogo": (("osoby",), True),
    "przeszkoda": (("przeszkoda",), True),
    "spie": ((), True),
    "granice": ((), True),
    "drobne": ((), True),
    "po_kolei": ((), True),
    "cisza": ((), True),
    "proba": ((), True),
}
# funkcje, które działają też dla bram (bramy nigdy nie ruszają się same)
FUNKCJE_BRAMY: tuple[str, ...] = ("licznik",)

# --- parametry funkcji i ich domyślne wartości ---
PARAMETRY: dict[str, object] = {
    "azymut": 180,            # gdzie patrzy okno (°): 90 wschód, 180 południe, 270 zachód
    "szer_slonca": 60,        # ± stopni od azymutu, w których słońce świeci w okno
    "min_wys_slonca": 5,      # słońce niżej niż tyle stopni się nie liczy
    "slonce_temp": 24,        # °C na zewnątrz, od których chronić
    "slonce_poz": 20,         # pozycja przy słońcu
    "lamele_kat": 45,         # kąt lameli przy słońcu
    "lamele_noc": 0,          # kąt lameli w nocy
    "lamele_tryb": "auto",    # auto / staly / nocny
    "harm_tryb": "slonce",    # slonce / godziny
    "harm_otwieraj": True,    # harmonogram rano otwiera (kreator graficzny: „Rano otwórz”)
    "harm_zamykaj": True,     # harmonogram wieczorem zamyka („Wieczorem zamknij”)
    "otworz": "07:00:00",
    "zamknij": "21:00:00",
    "otworz_weekend": "08:30:00",
    "zamknij_weekend": "22:00:00",
    "przesuniecie": 0,        # min względem wschodu i zachodu
    "posrednia_godz": "13:00:00",
    "posrednia_poz": 50,
    "wiatr_prog": 40,         # km/h
    "wiatr_poz": 100,         # pozycja przy silnym wietrze (100 = zwinięta)
    "deszcz_poz": 100,        # pozycja przy deszczu
    "mroz_prog": 1,           # °C
    "upal_prog": 28,          # °C jutro
    "temp_pokoj_prog": 25,    # °C w pokoju
    "jasnosc_prog": 30000,    # lx (lub W dla fotowoltaiki)
    "wietrzenie_poz": 20,
    "drzwi_min": 80,
    "granica_min": 0,
    "granica_max": 100,
    "drobne_prog": 5,         # % – mniejsze zmiany są pomijane
    "reczny_min": 120,        # min wstrzymania po ręcznym ruchu
    "po_kolei_s": 5,          # s odstępu między osłonami
    "cisza_min": 5,           # min bez ruchu po starcie HA
    "obecnosc_rano": "10:00:00",
    "wakacje_rozrzut": 30,    # ± minut w trybie wakacyjnym
    "spie_poz": 0,
    "alarm_poz": 0,
    "nikogo_poz": 0,
    "okno_wys_m": 1.5,        # oślepianie: wysokość okna (m)
    "obiekt_wys_m": 1.0,      # wysokość telewizora lub biurka (m)
    "obiekt_odl_m": 3.0,      # odległość od okna (m)
    "brama_minuty": 10,       # brama otwarta za długo
}

# --- powiadomienia ---
POWIADOMIENIA = ["nie_odpowiada", "nie_dojechala", "bateria", "czujnik", "automatyka",
                 "brama_otwarta", "brama_niedomknieta", "przeszkoda"]
CONF_POWIADOM = "powiadom"          # lista włączonych rodzajów
CONF_POWIADOM_GDZIE = "powiadom_gdzie"   # lista usług notify.*
CONF_SCIANA = "sciana"   # kolor ściany (muru) między oknami
SCIANY = ["biala", "bezowa", "szara", "cegla", "grafit"]
BATERIA_PROG = 20

# --- pamięć ---
DANE = f"{DOMAIN}_dane"             # hass.data: wspólne obiekty
SYGNAL_ZMIANA = f"{DOMAIN}_zmiana_{{}}"   # dispatcher: entry_id

KOLORY = {
    "czarny": "#232427", "grafit": "#3a3d42", "szary": "#6d7076", "popiel": "#a9aaa6", "srebrny": "#c4c6c8",
    "bialy": "#efefec", "kremowy": "#e6dcc8", "piaskowy": "#d9c7a4", "bezowy": "#bfae94", "cappuccino": "#a88c72",
    "mokka": "#6f5544", "braz": "#5a4030", "wenge": "#3d2f28", "stalowy": "#4f5a66", "granat": "#25324d",
    "blekitny": "#9cc6e6", "niebieski": "#1e6ff2", "morski": "#1d6f7a", "turkus": "#00b3b3", "mietowy": "#a9dcc6",
    "zielony": "#22a447", "butelkowy": "#1f4d3a", "oliwka": "#6b7a3a", "limonka": "#9bd426", "zolty": "#ffd000",
    "musztardowy": "#c99a1a", "pomaranczowy": "#fc9907", "terakota": "#b9583a", "czerwony": "#e02424",
    "bordo": "#7a1f2b", "pudrowy": "#e4b9b9", "rozowy": "#ff4f9a", "lawendowy": "#b9a8d6", "fiolet": "#8a3ffc",
    "sliwkowy": "#5b2c4a",
}
RAMY = {
    "biala": "#f4f4f2", "kremowa": "#d8d2c6", "jasnoszara": "#c9cbcc", "srebrna": "#b9bdc1", "szary_agat": "#a3a6a8",
    "szara": "#6e7378", "szary_kwarc": "#6d6c66", "bazaltowa": "#4a4d50", "antracyt": "#3b3f45", "czarna": "#1f2124",
    "zielona": "#28402f", "granatowa": "#2b3a55", "bordowa": "#5d1f23", "braz": "#6b4a32", "sosna": "#c49a5c",
    "dab_jasny": "#b39370", "dab_sheffield": "#9d8064", "winchester": "#a26a43", "oregon": "#9b6a3c",
    "zloty_dab": "#8a5a3b", "siena": "#6d4a33", "orzech": "#5a3a26", "mahon": "#6a2e22", "dab_bagienny": "#3e3830",
}

DOMYSLNE = {
    TRYB: PODSTAWOWY,
    CONF_SKRZYDLA: "2",
    CONF_TRYB_LEWE: "uchyl",
    CONF_TRYB_PRAWE: "uchyl",
    CONF_CZAS: 0,
    CONF_OSLONA: "zebra",
    CONF_KOLOR: "czarny",
    CONF_RAMA: "biala",
    CONF_WYSOKOSC: 260,
    CONF_RODZAJ_POKOJU: "salon",
    CONF_FOTO_STAN: "on",
}
