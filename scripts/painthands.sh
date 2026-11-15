#!/bin/sh
# Starts PaintHands at http://localhost:5173 and opens it in your browser.
# Works from any folder: type `painthands` in a terminal. Press Ctrl+C to stop.
#
# Pinned images are saved in the browser, which keeps them separately for each
# address. This always uses the same address, so they're there every time.

URL="http://localhost:5173"

# Is PaintHands answering at that address? (Checks the page's title, so some
# other app on the same port doesn't count.)
running() {
  curl -s "$URL" | grep -q "<title>PaintHands</title>"
}

# Go to the project folder: the one above this script's folder. realpath
# follows the `painthands` link back to where this script really is.
cd "$(dirname "$(realpath "$0")")/.." || exit 1

# Already running (say, in another terminal window)? Just open it.
if running; then
  echo "PaintHands is already running at $URL"
  open "$URL"
  exit 0
fi

# The first time after downloading the project, install its packages
if [ ! -d node_modules ]; then
  echo "Installing packages (first run only)..."
  npm install || exit 1
fi

# Once the server is answering, open the browser. This waits in the
# background while the server starts below.
(
  until running; do sleep 0.5; done
  open "$URL"
) &
WAITING=$!
# If the server stops (Ctrl+C, or the port is busy), stop waiting too
trap 'kill $WAITING 2>/dev/null' EXIT INT TERM

echo "Starting PaintHands at $URL (press Ctrl+C to stop)"
npm run dev
