#!/bin/sh
set -eu

if [ ! -s /certificates/localhost-key.pem ] || [ ! -s /certificates/localhost.pem ]; then
  umask 077
  openssl req -x509 -newkey rsa:2048 -sha256 -nodes -days 365 \
    -keyout /certificates/localhost-key.pem -out /certificates/localhost.pem \
    -subj '/CN=localhost' \
    -addext 'subjectAltName=DNS:localhost,DNS:app,IP:127.0.0.1'
fi

exec yarn dev --hostname 0.0.0.0 --port 3000 \
  --experimental-https-key /certificates/localhost-key.pem \
  --experimental-https-cert /certificates/localhost.pem
