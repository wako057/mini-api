#!/bin/bash
if [ "$DC_DEBUG" = "1" ]; then
    set -x
fi

USER_NAME=app
USER_UID=$(id -u app)
USER_GID=$(id -g app)

if [ "$UID" != "$USER_UID" ] && ! id "$UID"; then
    gosu root usermod -u "$UID" "$USER_NAME"
fi

if ! [ -z "$GID" ] && [ "$GID" != "$USER_GID" ] && ! id "$GID"; then
    gosu root groupmod -g "$GID" "$USER_NAME"
fi

gosu $UID "$@"
