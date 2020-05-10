#!/usr/bin/bash

for file in `find tests/scripts/ -type f -name "*.sql" | sort`; do echo "exec $file";psql --host=$DB_HOST --port=$DB_PORT --username=$DB_USER --dbname=mini_api_test < $file 2>&1 /dev/null; done
echo 'Finish DB reset';
