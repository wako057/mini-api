FROM postgres:11.7

RUN apt-get update && apt-get install -y python3-pip sudo
RUN echo 'postgres ALL=(ALL) NOPASSWD: /bin/chown -R postgres.postgres /tmp/dumps' >> /etc/sudoers
COPY ./postgresql.conf /var/lib/postgresql/postgresql.conf

COPY ./import.sh /docker-entrypoint-initdb.d/
COPY ./healthcheck.sh /usr/local/bin
RUN chmod +x /usr/local/bin/healthcheck.sh && chmod +r /var/lib/postgresql/postgresql.conf
COPY ./sql /docker-entrypoint-initdb.d/sql/

USER postgres

HEALTHCHECK --interval=5s --timeout=20s --retries=1 CMD healthcheck.sh
ENTRYPOINT [ "docker-entrypoint.sh", "postgres" ]
