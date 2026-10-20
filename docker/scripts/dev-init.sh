#!/bin/sh
set -e

echo "=== Dev environment initialization ==="

# --- Postgres: create n8n database ---
echo "Waiting for Postgres..."
until pg_isready -h "${PGHOST:-db}" -U "${PGUSER}" 2>/dev/null; do
  sleep 1
done

echo "Creating n8n database if not exists..."
psql -h "${PGHOST:-db}" -U "${PGUSER}" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'n8n'" | grep -q 1 \
  || psql -h "${PGHOST:-db}" -U "${PGUSER}" -d postgres -c "CREATE DATABASE n8n"
echo "Postgres initialization complete."

# --- MinIO: create buckets ---
echo "Waiting for MinIO..."
sleep 5

echo "Configuring MinIO client alias..."
mc alias set local "http://${MINIO_HOST:-minio}:9000" "${MINIO_ROOT_USER}" "${MINIO_ROOT_PASSWORD}"

# Buckets to create on first boot. Customise per client by editing this list
# (e.g. add `vehicle-images` for a car-rental app).
DEFAULT_BUCKETS="${INIT_BUCKETS:-uploads avatars}"

echo "Creating default buckets if missing..."
for bucket in ${DEFAULT_BUCKETS}; do
  mc ls "local/${bucket}" >/dev/null 2>&1 || mc mb "local/${bucket}"
  mc anonymous set download "local/${bucket}"
done

echo "=== Initialization complete ==="
