FROM debian:stretch-20190610-slim
ENV GOSU_VERSION 1.11
ENV NODE_VERSION 12.16.3
ENV PROJECT_NAME "mini-api-node"

# System tools
RUN apt-get update && apt-get install --no-install-recommends -y \
    bash \
    git \
    unzip \
    locales \
    build-essential \
    ca-certificates \
    apt-transport-https \
    lsb-release \
    curl \
    wget \
    gnupg \
    htop \
    lsof \
    strace \
    mtr-tiny \
    gettext-base \
    && rm -rf /var/lib/apt/lists/* && \
    wget https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz && \
    tar --extract --verbose --strip-components=1 --directory /usr/local --file node-v${NODE_VERSION}-linux-x64.tar.xz && \
    rm node-v${NODE_VERSION}-linux-x64.tar.xz

# Test node installation
RUN echo "NodeJS and NPM versions :" && node -v && npm -v

# Create application user
RUN useradd -ms /bin/bash app

# System localisation
RUN echo "fr_FR.UTF-8 UTF-8" > /etc/locale.gen && dpkg-reconfigure --frontend=noninteractive locales
RUN ln -sf /usr/share/zoneinfo/Europe/Paris /etc/localtime && \
    echo Europe/Paris >/etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

# Install gosu
RUN wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$(dpkg --print-architecture)"
RUN chmod +x /usr/local/bin/gosu && chmod +s /usr/local/bin/gosu


# Install wait-for-it
COPY wait-for-it /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Install entrypoint
COPY ./entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/entrypoint.sh


USER root
COPY ./run.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/run.sh

RUN mkdir -p /var/nodejs/mini-api-node

RUN apt-get update && apt-get install --no-install-recommends -y \
    python \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/nodejs/mini-api-node

USER app
SHELL [ "/bin/bash", "-c" ]
CMD [ "run.sh" ]
