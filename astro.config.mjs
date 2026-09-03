// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import yaml from "@rollup/plugin-yaml";

// Production site. Deploy targets:
//  - Cloudflare Pages preview (auto, every push) — shareable while we build
//  - Hostinger via FTPS (dormant until cutover — see .github/workflows/deploy.yml)
export default defineConfig({
  site: "https://justlab.com.br",
  integrations: [sitemap()],
  vite: {
    plugins: [yaml()],
  },
});
