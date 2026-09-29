# kmworks website

The kmworks ecosystem site and documentation hub, served at <https://kmworks.date>.

- The landing pages live in this repo; docs live at `/server/` (kmrs) and `/reader/` (kmreader), authored as plain markdown in `docs/server/` and `docs/reader/`.

## Develop

```sh
npm install
npm start        # docusaurus start
npm run build    # production build in build/
npm run typecheck
```

## Deploy

Cloudflare Workers Builds: pushes to `main` build the site (`npm ci && npm run build`) and deploy the `kmworks` Worker (static assets + the `kmworks.date` / `www.kmworks.date` custom domains from `cloudflare.config.ts`). To deploy a local build manually:

```sh
cf deploy
```
