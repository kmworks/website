---
slug: /
title: Introduction
---

# kmweb

kmweb is the web interface for [kmrs](/kmrs/), the Komga-compatible media server in Rust. It is built with React 19, Vite, Tailwind CSS v4, TanStack Query and Zustand, and follows the same design language as [KMReader](/kmreader/).

## Features

- Dashboard with a configurable library scope: Keep Reading, On Deck, Recently Released/Added Books, Recently Added/Updated Series, Recently Read
- Browse series, books, collections and read lists with facet filters (read status, genres, tags, publishers, authors, age rating, language, release years), sort options and infinite scroll
- Series and book detail pages with metadata, progress and quick actions
- Full-text search across series, books, collections and read lists
- Comic reader: single/double page spreads with cover handling, LTR/RTL, vertical and webtoon modes, fit/original scaling, keyboard shortcuts, swipe, thumbnail explorer, per-series direction override, read-progress sync and continuous reading across books
- Account pages in the sidebar: profile, security (password change, login activity), API keys, appearance and reader defaults
- Live updates over SSE: lists refresh and covers reload when the server changes them

## Getting it

The kmrs Docker image bundles kmweb and serves it at `/` out of the box — see [installation](/kmrs/installation). To serve a development build instead, point `webui.dir` (env `KOMGA_WEBUI_DIR`) at the kmweb `dist/` folder; see [configuration](/kmrs/configuration).

The source lives at [github.com/kmworks/kmweb](https://github.com/kmworks/kmweb).
