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

async function shot(name, path, { scrollTo = 0, full = false, delay = 1500 } = {}) {
  await page.goto(BASE + path, { waitUntil: "networkidle0" });
  await wait(delay); // let fonts + canvas + reveal animations settle
  if (scrollTo) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
    await wait(900);
  }
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  console.log(`  ${name}.png`);
}

await shot("01-hero", "/", { delay: 2600 });
await shot("02-home-research", "/", { scrollTo: 760 });
await shot("03-home-full", "/", { full: true, delay: 2600 });
await shot("04-research", "/research", { scrollTo: 420 });
await shot("05-publications", "/publications", { scrollTo: 240 });
await shot("06-people", "/people", { scrollTo: 120 });
await shot("07-footer", "/", { scrollTo: 99999 });

await browser.close();
console.log("done -> shots/");
