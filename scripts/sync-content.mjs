#!/usr/bin/env node
/**
 * Two-way content mirror between this repo and the shared Google Drive folder.
 *
 *   Repo (source of truth):  src/content/  +  src/data/
 *   Drive (lab members edit): <DRIVE>/content/  +  <DRIVE>/data/
 *
 * Lab members edit the Markdown / YAML files in the Drive folder. Run this on
 * the machine that has G: mounted:
 *
 *   npm run sync            # pull Drive -> repo, then push repo -> Drive
 *   npm run sync -- --pull  # only Drive -> repo
 *   npm run sync -- --push  # only repo -> Drive
 *
 * "Newer file wins" per path. It never deletes; a removed file must be removed
 * in git by hand. Review `git status` after a pull before committing.
 *
 * Set the Drive path here or via the JL_DRIVE env var.
 */
import { readdir, stat, mkdir, copyFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const DRIVE =
  process.env.JL_DRIVE ||
  "G:/My Drive/3_Pesquisa/EEL_JUSTLAB/Agora_Vai_JustLab_SITE";

const PAIRS = [
  ["src/content", join(DRIVE, "content")],
  ["src/data", join(DRIVE, "data")],
];

const args = process.argv.slice(2);
const pull = args.includes("--pull") || !args.includes("--push");
const push = args.includes("--push") || !args.includes("--pull");

async function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function mirror(from, to, label) {
  let copied = 0;
  for (const src of await walk(from)) {
    const rel = relative(from, src);
    const dst = join(to, rel);
    const [a, b] = [await stat(src), existsSync(dst) ? await stat(dst) : null];
    if (b && b.mtimeMs >= a.mtimeMs) continue;
    if (b && (await readFile(src)).equals(await readFile(dst))) continue;
    await mkdir(dirname(dst), { recursive: true });
    await copyFile(src, dst);
    console.log(`  ${label}  ${rel}`);
    copied++;
  }
  return copied;
}

if (!existsSync(DRIVE)) {
  console.error(`Drive folder not found: ${DRIVE}\nSet JL_DRIVE to the right path.`);
  process.exit(1);
}

let total = 0;
for (const [repoDir, driveDir] of PAIRS) {
  if (pull) total += await mirror(driveDir, repoDir, "Drive → repo ");
  if (push) total += await mirror(repoDir, driveDir, "repo  → Drive");
}
console.log(total ? `\n${total} file(s) synced. Review \`git status\`.` : "Nothing to sync.");
