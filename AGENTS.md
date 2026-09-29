# Working in this repo

Nimbus (Astro) docs site, deployed to Cloudflare Workers as `kmworks`, served at <https://kmworks.date>.

Read and follow [AGENT.md](./AGENT.md) — the canonical guide for the Nimbus machinery (content collections, MDX components, lint, upgrades). This file only covers what AGENT.md does not.

## Package manager is npm

AGENT.md's examples use `pnpm`. Translate: `pnpm exec nimbus-docs <cmd>` → `npx nimbus-docs <cmd>`.

## Verify before calling work done

```sh
npm run typecheck && npm run build && npx nimbus-docs check && npm run lint:docs
```

Then confirm `dist/` still serves every public route: `/`, `/server/`, `/reader/`, `/server/{intro,installation,configuration,webui,search,compatibility,enhancements,limitations,development}/`, `/reader/{intro,privacy}/`.

## Content conventions

- Internal links are absolute (`/server/webui`); the build does not rewrite relative `./x.md` links.
- `reader/privacy` keeps `sidebar.hidden: true` — rendered, but not in the sidebar tree.
- Landing pages (`src/pages/index.astro`, `src/pages/{server,reader}/index.astro`) carry their design in scoped styles plus `src/styles/landing.css`; landing-only selectors use the `.km-landing` prefix and `--km-*` tokens; dark mode is `[data-mode="dark"]`.

## Deploy

Pushes to `main` auto-deploy via Workers Builds (`npm ci && npm run build`, then `npx wrangler deploy` with `wrangler.jsonc`). Local manual deploy: `npm run deploy`. Both ship to production — only deploy when the user asks. Inspect pipeline state with `cf builds list --external-script-id 82bd11b0ebca4fc4872cc43d16e9d9b6`.
