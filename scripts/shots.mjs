// Dev-only: capture screenshots of key views for review. Not part of the build.
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.SHOT_BASE || "http://localhost:4321";
const OUT = "shots";
await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--force-color-profile=srgb", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(name, path, { scrollTo = 0, height, delay = 1200 } = {}) {
  if (height) await page.setViewport({ width: 1440, height, deviceScaleFactor: 1.5 });
  await page.goto(BASE + path, { waitUntil: "networkidle0" });
  await wait(delay);
  if (scrollTo) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
    await wait(500);
  }
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`  ${name}.png`);
}

await shot("resources-hardware", "/resources", { height: 780, scrollTo: 260 });
await shot("home-phototaxis-video", "/", { height: 820, scrollTo: 900 });
await shot("home-hero", "/", { height: 900 });

await browser.close();
console.log("done -> shots/");
