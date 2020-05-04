#! /bin/bash

echo "Container is starting..." 1>&2

echo "[TaskStart][Init] Npm ci" 1>&2
npm ci
echo "[TaskEnd][Init] Npm ci" 1>&2

echo "[TaskStart][Init] Use config-template.json to generate config.json" 1>&2
make config
echo "[TaskEnd][Init] Use config-template.json to generate config.json" 1>&2

#node app.js
npm run server:dev
