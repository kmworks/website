# kmworks website

The kmworks ecosystem site and documentation hub, served at <https://kmworks.date>.

- The landing page and the kmweb docs live in this repo.
- The kmrs and KMReader docs are authored in their own repos (`website/docs/`) and mirrored here at build time by `scripts/sync-docs.mjs` — edit them there, never in `synced/`.

## Develop

```sh
npm install
npm start        # syncs docs, then docusaurus start
npm run build    # sync + production build in build/
npm run typecheck
```

## Deploy

Cloudflare Pages, project `kmworks`. Pushes to `main` build and deploy via `.github/workflows/deploy.yml`. To deploy a local build manually:

```sh
cf pages deploy build --project-name kmworks
```
