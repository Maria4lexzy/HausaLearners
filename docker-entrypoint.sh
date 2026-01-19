#!/bin/sh
set -e

if [ "$SKIP_MIGRATIONS" != "true" ]; then
  echo "Running database migrations..."
  npm run db:push || echo "Migration warning: db:push may have failed, continuing..."
fi

echo "Starting application..."
exec "$@"
