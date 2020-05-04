#!/bin/bash

set -e

createdb () {
    echo "Creating database and user $1" 1>&2
    # Create database
    psql -c "CREATE DATABASE $1;"
    # Create user
    psql -c "CREATE ROLE $1 LOGIN PASSWORD '$1';"
    psql -c "GRANT ALL PRIVILEGES ON DATABASE $1 TO $1;"
    psql -c "ALTER DATABASE $1 OWNER TO $1;"
    psql -c "ALTER ROLE $1 SUPERUSER;"
    psql $1 -c "CREATE SCHEMA extensions;"
    psql $1 -c "CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA extensions;"
}

# Copy PG Conf
cp /var/lib/postgresql/postgresql.conf /var/lib/postgresql/data/postgresql.conf
# Reload PG conf
psql -c "SELECT pg_reload_conf();"





echo "###################################################" 1>&2
echo "#                       Mini-Api                  #" 1>&2
echo "###################################################" 1>&2
# Create database and user
createdb 'miniapi'
# Download and import latest data dump
psql --dbname miniapi -f /docker-entrypoint-initdb.d/sql/001-structure.sql
psql --dbname miniapi -c 'ANALYZE'


echo "###################################################" 1>&2
echo "#                       Finalization              #" 1>&2
echo "###################################################" 1>&2
createdb 'bbddup'
