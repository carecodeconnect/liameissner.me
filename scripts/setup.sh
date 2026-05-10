#!/usr/bin/env bash
# First-time setup on a fresh Mac. Idempotent — safe to re-run.
# Installs Homebrew (if missing), Node, then `npm ci`.

set -euo pipefail

cd "$(dirname "$0")/.."

echo "→ Checking Homebrew…"
if ! command -v brew >/dev/null 2>&1; then
  echo "  Homebrew not found. Installing — you'll be prompted for your macOS password."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  if [[ -x /opt/homebrew/bin/brew ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [[ -x /usr/local/bin/brew ]]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
else
  echo "  ✓ $(brew --version | head -1)"
fi

echo "→ Checking Node ≥22…"
node_ok=0
if command -v node >/dev/null 2>&1; then
  node_major=$(node --version | sed -E 's/^v([0-9]+).*/\1/')
  if [[ "$node_major" -ge 22 ]]; then
    node_ok=1
    echo "  ✓ node $(node --version)"
  fi
fi
if [[ "$node_ok" -eq 0 ]]; then
  echo "  Installing Node via Homebrew…"
  brew install node
fi

echo "→ Installing npm dependencies…"
npm ci

echo
echo "✓ Setup complete."
echo
echo "Next:"
echo "  npm run dev                                  # preview at http://localhost:4321"
echo "  ./scripts/publish.sh \"your commit message\"  # build, commit, push (auto-deploys)"
