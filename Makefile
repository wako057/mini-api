CONFIG_FILE ?= config.json

all: build config pre-symlink post-symlink

build:
	npm ci --only=production

config:
	envsubst < config-template.json > ${CONFIG_FILE}

pre-symlink:

post-symlink:
