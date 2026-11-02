# Algae Farm on JUST Lab

Visitors find the game under **Resources → Educational games**. The introduction lives at `/resources/algae-farm/`; the standalone game at `/games/algae-farm/`. The site's `href()` helper adds `/justlab-site/` on GitHub Pages. The game owns its viewport and keeps its daylight design and mobile controls.

The current snapshot is **1.0.1**, model **0.5.0**. The original game continues at https://candidomolino.github.io/algae-farm/. The mirror includes five releases: 0.8.1, 1.0.0-rc.1, 1.0.0-rc.2, 1.0.0 and 1.0.1. Their HTML and artwork ZIPs are byte-identical to the verified originals. Metadata and SHA256 records are in `public/games/algae-farm/versions/manifest.json`.

## Updating the mirror

First build, verify and archive a new release in the original Algae Farm project. Then run:

```sh
node scripts/sync-algae-farm.mjs --source /absolute/path/to/algae-farm
npm run check
GITHUB_PAGES=true npm run build
```

The helper checks the source archive manifest, copies only public HTML/artwork and a preview image, and refuses to replace an existing version with different bytes. It also checks that the current game matches its stable archive. Full source ZIPs, class notes, email, local saves and credentials are not included. Update the introduction's current-version label and release links when publishing a new game version.

GitHub Pages deployment continues through the existing `deploy-pages.yml` workflow. The separate Hostinger workflow remains manually triggered.

## Progress and teaching

Progress stays in browser-local storage. Saves from `candidomolino.github.io` do not automatically transfer to `molino-algae.github.io`; the introduction offers the original address for returning players. Path changes within one host do not isolate the campaign's main storage keys. Archived 1.0 releases explicitly isolate their keys by version path; the classic 0.8.1 uses its original legacy keys.

The game is in Brazilian Portuguese, with free play by default. It uses fictional yields, costs and biological probabilities to support discussion, rather than predict industrial performance. The alkaline protection of C. pacifica covers the game's common contamination events and does not assert universal biological immunity.

## Checks for a release

- Type/content check and the production GitHub Pages build pass.
- Resources card → introduction → full-screen game works with the Pages base path.
- All five archived games, artwork ZIPs and current build match their SHA256 records.
- Introduction and game fit a 390px mobile viewport; resources remain visible in a game decision.
- The game's Versions and Professor links stay under `/games/algae-farm/`.
- The original game remains available and unchanged.
