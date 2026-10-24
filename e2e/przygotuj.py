"""Pierwsze uruchomienie testowego HA (konto test/test1234) i wypisanie tokenów dla przeglądarki (JSON)."""

import json
import sys
import time
import urllib.parse
import urllib.request

URL = sys.argv[1].rstrip("/")
KLIENT = URL + "/"


def zapytaj(sciezka, dane=None, token=None, formularz=False):
    naglowki = {}
    if token:
        naglowki["Authorization"] = f"Bearer {token}"
    if formularz:
        tresc = urllib.parse.urlencode(dane).encode()
        naglowki["Content-Type"] = "application/x-www-form-urlencoded"
    else:
        tresc = json.dumps(dane or {}).encode()
        naglowki["Content-Type"] = "application/json"
    z = urllib.request.Request(URL + sciezka, data=tresc, headers=naglowki, method="POST")
    with urllib.request.urlopen(z, timeout=60) as o:
        return json.loads(o.read() or b"{}")


kod = zapytaj("/api/onboarding/users", {"client_id": KLIENT, "name": "Test", "username": "test", "password": "test1234", "language": "pl"})["auth_code"]
t = zapytaj("/auth/token", {"grant_type": "authorization_code", "code": kod, "client_id": KLIENT}, formularz=True)
for krok, dane in (("core_config", {}), ("analytics", {}), ("integration", {"client_id": KLIENT, "redirect_uri": KLIENT + "?auth_callback=1"})):
    zapytaj(f"/api/onboarding/{krok}", dane, t["access_token"])
print(json.dumps({"hassUrl": URL, "clientId": KLIENT, "access_token": t["access_token"], "refresh_token": t["refresh_token"],
                  "expires_in": t["expires_in"], "token_type": "Bearer", "expires": int(time.time() * 1000) + t["expires_in"] * 1000}))
