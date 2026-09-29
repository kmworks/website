# kmworks website

The kmworks ecosystem site and documentation hub, served at <https://kmworks.date>.

- The landing page lives in this repo; docs live at `/server/` (kmrs) and `/reader/` (KMReader).
- Docs are authored as plain markdown in the source repos (`docs/` in kmrs and kmreader) and mirrored here at build time by `scripts/sync-docs.mjs` — edit them there, never in `synced/`.

## Develop

```sh
npm install
npm start        # syncs docs, then docusaurus start
npm run build    # sync + production build in build/
npm run typecheck
```

## Deploy

Cloudflare Workers Builds: pushes to `main` build the site (`npm ci && npm run build`) and deploy the `kmworks` Worker (static assets + the `kmworks.date` / `www.kmworks.date` custom domains from `cloudflare.config.ts`). To deploy a local build manually:

```sh
cf deploy
```
