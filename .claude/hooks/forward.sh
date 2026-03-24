#!/bin/bash
# Forward AskUserQuestion hook events to Electric Agent studio.
# Blocks until the user answers in the web UI.
BODY="$(cat)"
RESPONSE=$(curl -s -X POST "http://host.docker.internal:4400/api/sessions/453b5f12-86b0-445b-92ea-a5efaabcce68/hook-event" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 4a5929c62b574c63c9f23d9dd2dffa58ad359760290db0291c38b229962660a0" \
  -d "${BODY}" \
  --max-time 360 \
  --connect-timeout 5 \
  2>/dev/null)
if echo "${RESPONSE}" | grep -q '"hookSpecificOutput"'; then
  echo "${RESPONSE}"
fi
exit 0