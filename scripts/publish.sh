#!/usr/bin/env bash
# Build, commit, and push site changes. Push triggers the Pages deploy via Actions.
# Usage: ./scripts/publish.sh "your commit message"

set -euo pipefail

cd "$(dirname "$0")/.."

if [[ $# -lt 1 || -z "${1:-}" ]]; then
  echo "Usage: $0 \"commit message\"" >&2
  exit 1
fi
msg="$1"

echo "→ Verifying build…"
npm run build

echo "→ Staging changes…"
git add -A

if git diff --cached --quiet; then
  echo "  Nothing to commit."
  exit 0
fi

echo "→ Committing…"
git commit -m "$msg"

echo "→ Pushing to main…"
git push origin main

echo
echo "✓ Pushed. Deploy progress:"
echo "  https://github.com/heartfeltfutures/liameissner.me/actions"
echo "  Live: https://liameissner.me"
