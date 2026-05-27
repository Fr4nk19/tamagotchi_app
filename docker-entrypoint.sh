#!/bin/sh
set -e
PORT=${PORT:-8080}
sed -i "s/NGINX_PORT/$PORT/g" /etc/nginx/conf.d/default.conf
exec "$@"
