# JUST Lab website

Static site for the JUST Lab (Department of Biotechnology — DEBIQ, EEL/USP),
built with [Astro](https://astro.build). Content lives in this repo as Markdown
and YAML; every change is a commit.

**Preview:** https://molino-algae.github.io/justlab-site/ — rebuilds on every push
to `main`. The live `justlab.com.br` is untouched until cutover.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # type + content check
npm run build      # -> dist/
npm run preview    # serve the production build
```

Requires Node 20+.

## Where things live

| Content | Path |
|---|---|
| Global config (name, nav, address, affiliations) | `src/data/site.yaml` |
| Publications | `src/data/publications.yaml` |
| Former trainees | `src/data/alumni.yaml` |
| Current people | `src/content/people/*.md` (one file each) |
| Research areas | `src/content/research/*.md` |
| Projects | `src/content/projects/*.md` |
| News posts | `src/content/news/YYYY-MM-DD-slug.md` |
| Images | `src/assets/` (optimised at build) |
| Design tokens | `src/styles/tokens.css` |

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to add yourself or a news post.

## Deploy

- **Preview** — `.github/workflows/deploy-pages.yml` builds every push to `main`
  and publishes to GitHub Pages (`GITHUB_PAGES=true` sets the `/justlab-site/`
  base path). Share https://molino-algae.github.io/justlab-site/ with the lab.
- **Production (Hostinger, FTPS)** — `.github/workflows/deploy.yml`. Dormant:
  runs only when triggered by hand from the Actions tab. Needs three repo
  secrets: `FTP_SERVER` (`justlab.com.br`), `FTP_USERNAME` (`u365908489`),
  `FTP_PASSWORD`. At cutover: back up and empty `public_html`, then deploy to
  its root.

## Drive mirror

`npm run sync` mirrors `src/content` and `src/data` to/from the shared Google
Drive folder so lab members can edit without GitHub. Run it on the machine with
`G:` mounted. Set `JL_DRIVE` if the path differs from the default in
`scripts/sync-content.mjs`.
