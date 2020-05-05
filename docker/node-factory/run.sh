#! /bin/bash

echo "Container is starting..." 1>&2

# Index data
echo "Waiting for mini-api" 1>&2
MINI_API="mini-api.back.wako057.net:8080"
wait-for-it $MINI_API -t 60 -- echo "Mini-up is up"

npm run poller:dev
