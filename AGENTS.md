# Working in this repo

Nimbus (Astro) docs site, deployed to Cloudflare Workers as `kmworks`, served at <https://kmworks.date>.

Read and follow [AGENT.md](./AGENT.md) — the canonical guide for the Nimbus machinery (content collections, MDX components, lint, upgrades). This file only covers what AGENT.md does not.

## Verify before calling work done

```sh
pnpm typecheck && pnpm build && pnpm exec nimbus-docs check && pnpm lint:docs
```

Then confirm `dist/` still serves every public route: `/`, `/server/`, `/reader/`, `/faq/`, `/compare/`, `/architecture/`, `/server/{intro,installation,configuration,webui,search,compatibility,enhancements,limitations,development,migration}/`, `/server/enhancements/{webhooks,history-events,epub2-metadata,natural-sort,komf,thumbnail-storage,komga-riir}/`, `/reader/{intro,privacy}/`.

## Content conventions

- Internal links are absolute (`/server/webui`); the build does not rewrite relative `./x.md` links.
- `reader/privacy` keeps `sidebar.hidden: true` — rendered, but not in the sidebar tree.
- Landing pages (`src/pages/index.astro`, `src/pages/{server,reader}/index.astro`) carry their design in scoped styles plus `src/styles/landing.css`; landing-only selectors use the `.km-landing` prefix and `--km-*` tokens; dark mode is `[data-mode="dark"]`.

## Deploy

Pushes to `main` auto-deploy via Workers Builds (`pnpm install --frozen-lockfile && pnpm run build`, then `pnpm exec wrangler deploy` with `wrangler.jsonc`). Local manual deploy: `pnpm deploy`. Both ship to production — only deploy when the user asks. Inspect pipeline state with `cf builds list --external-script-id "$(cf workers get kmworks | jq -r .id)"`.
