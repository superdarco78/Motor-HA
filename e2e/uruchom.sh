#!/usr/bin/env bash
# Uruchamia czysty Home Assistant w Dockerze z Motor HA z tego repozytorium i przechodzi pierwsze uruchomienie.
# Użycie: e2e/uruchom.sh [stable|beta|dev]   (domyślnie stable)
# MOTOR_HA_SRC=ścieżka/do/custom_components/motor_ha – inna wersja integracji (np. z main do zrzutów „przed”)
set -euo pipefail
WERSJA="${1:-stable}"
TU="$(cd "$(dirname "$0")" && pwd)"
CONF="$TU/.config"
docker rm -f ha-test >/dev/null 2>&1 || true
# pliki zostawione przez HA w Dockerze należą do roota
rm -rf -- "${CONF:?}" 2>/dev/null || sudo rm -rf -- "${CONF:?}"
mkdir -p "$CONF/custom_components"
cp "$TU/config/configuration.yaml" "$CONF/"
cp -r "${MOTOR_HA_SRC:-$TU/../custom_components/motor_ha}" "$CONF/custom_components/motor_ha"
docker run -d --name ha-test -p 8123:8123 -e TZ=Europe/Warsaw -v "$CONF:/config" "homeassistant/home-assistant:$WERSJA" >/dev/null
for i in $(seq 1 120); do
  curl -sf http://localhost:8123/api/onboarding >/dev/null 2>&1 && break
  sleep 2
done
docker exec ha-test python -c "import homeassistant.const as c; print('Home Assistant', c.__version__)"
python3 "$TU/przygotuj.py" http://localhost:8123 > "$TU/.tokeny.json"
echo "HA gotowy: http://localhost:8123 (login: test / test1234)"
