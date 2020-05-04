#!/bin/bash

set -e

nbBdd=$(PGPASSWORD=miniapi psql -tAc --host=localhost --username=miniapi --dbname=miniapi -c "SELECT COUNT(*) AS nbBdd FROM pg_database WHERE datname IN ('miniapi', 'bbddup');")
if [ "$nbBdd" != "2" ];
then
  exit 1
fi

exit 0


