# bc1pzzfnxl-blog

The blog at https://bc1pzzfnxl.com, now running the **pzz-cms** engine: Astro
server-rendered on Cloudflare Workers, with articles in D1 and images in R2.

The engine's source is developed in the open at
[bc1pzzfnxl/pzz-cms](https://github.com/bc1pzzfnxl/pzz-cms) and merged here for
deployment.

## Content

Articles live in the `articles` table (D1), not as files. The Markdown sources
were imported from `src/content/*.md` (kept in git history) with
`bun run migrate`. Images live in the `pzz-cms-media` R2 bucket.

## Commands

```bash
bun install
bun run dev          # Astro dev (workerd)
bun run build
bun run deploy       # astro build && wrangler deploy
bun run check        # Biome + astro check + Vitest
bun run e2e          # Playwright (needs a running server)
```

## Admin

`/admin` is behind Cloudflare Access (allow-policy on the owner's email).

## Migration and parity

```bash
bun run migrate <contentDir>     # writes migration-output/ (gitignored)
bun run parity https://bc1pzzfnxl.com https://pzz-cms.bc1pzzfnxl.workers.dev /sitemap-index.xml
```

## Configuration

`wrangler.jsonc` holds the real D1 and R2 bindings. This repository is private,
so that is fine; the public CMS repository keeps placeholders.

See `PLAN.md` for the full plan and decisions.
