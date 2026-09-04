// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import yaml from "@rollup/plugin-yaml";

// Deploy targets:
//  - GitHub Pages preview: molino-algae.github.io/justlab-site/  (GITHUB_PAGES=true)
//  - Hostinger via FTPS at cutover: justlab.com.br  (default — dormant workflow)
const PAGES = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  site: PAGES ? "https://molino-algae.github.io" : "https://justlab.com.br",
  base: PAGES ? "/justlab-site/" : undefined,
  integrations: [sitemap()],
  vite: {
    plugins: [yaml()],
  },
});
