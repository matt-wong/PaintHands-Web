# PaintHands

A reference board for painters: search Unsplash and Pixabay for reference
images. It's a web app that runs on Cloudflare.

## How it's put together

- `src/` — the page you see (React + TypeScript, served by Vite).
- `worker/` — the small server. It calls Unsplash and Pixabay, so the API keys
  stay on the server and never reach the page. The page asks it for images at
  `/api/search?q=...` (or `/api/search` alone for random images).
- `src/types.ts` — the shape of an image result, shared by both.
- `wrangler.jsonc` — Cloudflare's settings for the app.

## First-time setup

1. Install the packages (downloads everything listed in `package.json` into
   `node_modules/`):

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and paste in your API keys. `.env` is listed in
   `.gitignore`, so it's never committed.

## Run it on your computer

```sh
npm run dev
```

Then open the address it prints (normally http://localhost:5173). This runs the
page and the server together, and reloads the page as you edit files.

## Check for mistakes

```sh
npm run build
```

Checks the TypeScript types, then builds the finished files into `dist/`.

## Putting it online (later)

Don't do this until there's a login, or anyone could use up your API limits.
When it's time:

```sh
npx wrangler login                              # connect to your Cloudflare account
npx wrangler secret put UNSPLASH_ACCESS_KEY     # store each key on Cloudflare
npx wrangler secret put PIXABAY_API_KEY
npm run deploy                                  # build and upload
```
