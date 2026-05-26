#!/bin/bash
# Despliegue en la VM: reconstruye la imagen con los archivos actuales
set -euo pipefail

cd "$(dirname "$0")"

echo ">> Actualizando código..."
git pull

echo ">> Reconstruyendo imagen Docker (sin caché)..."
docker compose build --no-cache

echo ">> Reiniciando contenedor..."
docker compose down
docker compose up -d

echo ">> Estado:"
docker compose ps

echo ""
echo "Listo. Si la web sigue viéndose mal:"
echo "  1. Purga caché en Cloudflare (Caching → Purge Everything)"
echo "  2. Recarga forzada en el navegador (Ctrl+Shift+R)"
echo "  3. Comprueba que Tailwind cargue (F12 → Network → cdn.tailwindcss.com)"
