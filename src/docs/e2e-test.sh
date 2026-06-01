#!/usr/bin/env bash
set -euo pipefail
PORT=${PORT:-3007}
BASE_API="http://localhost:${PORT}/api"
RESOURCE="integrators"
BASE_URL="${BASE_API}/${RESOURCE}"
wait_for(){ until curl -sSf ${BASE_API}/${RESOURCE}/query >/dev/null 2>&1; do printf "."; sleep 1; done }
echo "Waiting for integrator-service on ${BASE_URL}..."
wait_for
echo "Ping"
curl -sSf ${BASE_API}/${RESOURCE}/ping >/dev/null || true
echo "Create mapping"
CREATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST ${BASE_API}/${RESOURCE}/mappings -H 'Content-Type: application/json' -d '{"source":"A","target":"B"}')
HTTP=$(echo "$CREATE_RESPONSE" | tail -n1)
BODY=$(echo "$CREATE_RESPONSE" | sed '$d')
if [[ "$HTTP" != "201" && "$HTTP" != "200" ]]; then echo "Create failed: $HTTP"; exit 1; fi
ID=$(echo "$BODY" | jq -r '.id // empty')
curl -sSf ${BASE_API}/${RESOURCE}/mappings/${ID} >/dev/null
curl -sSf ${BASE_API}/${RESOURCE}/mappings | jq . >/dev/null
curl -s -X DELETE ${BASE_API}/${RESOURCE}/mappings/${ID} >/dev/null
echo "integrator-service e2e: OK"
