// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import yaml from "@rollup/plugin-yaml";

// Deploy targets:
//  - GitHub Pages preview: molino-algae.github.io/justlab-site/  (GITHUB_PAGES=true)
//  - Hostinger via FTPS at cutover: justlab.com.br  (default — dormant workflow)
const PAGES = process.env.GITHUB_PAGES === "true";

// Keep internal notes written as HTML comments in Markdown out of the published pages.
function removeHtmlComments() {
  return (/** @type {any} */ tree) => {
    const walk = (/** @type {any} */ node) => {
      if (!node.children) return;
      node.children = node.children.filter(
        (/** @type {any} */ c) => !(c.type === "html" && /^\s*<!--/.test(c.value)),
      );
      node.children.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  markdown: { remarkPlugins: [removeHtmlComments] },
  site: PAGES ? "https://molino-algae.github.io" : "https://justlab.com.br",
  base: PAGES ? "/justlab-site/" : undefined,
  integrations: [sitemap()],
  vite: {
    plugins: [yaml()],
  },
});
