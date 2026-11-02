// Import only the public, verified game artifacts from an Algae Farm checkout.
// Existing archived games are immutable; private source ZIPs are never copied.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceArg = process.argv.indexOf('--source');
if (sourceArg < 0 || !process.argv[sourceArg + 1]) {
  throw new Error('Usage: node scripts/sync-algae-farm.mjs --source /path/to/algae-farm');
}
const source = path.resolve(process.argv[sourceArg + 1]);
const destination = path.join(root, 'public', 'games', 'algae-farm');
const manifest = JSON.parse(await fs.readFile(path.join(source, 'releases', 'manifest.json'), 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex').toUpperCase();
const versionPattern = /^\d+\.\d+\.\d+(?:-[\da-z]+(?:[.-][\da-z]+)*)?$/i;
const readOptional = async file => {
  try { return await fs.readFile(file); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
};
const operations = [];
const versions = [];
const seen = new Set();
const original = 'https://candidomolino.github.io/algae-farm/';

for (const release of manifest.versions) {
  if (!versionPattern.test(release.version) || seen.has(release.version)) throw new Error('Invalid or duplicate release version');
  seen.add(release.version);
  const folder = `v${release.version}`;
  const artifacts = [];
  for (const name of ['index.html', 'Algae_Farm_Art_Source.zip']) {
    const record = release.files.find(file => file.path === `${folder}/${name}` && file.visibility === 'archive');
    if (!record) throw new Error(`Missing public-artifact record: ${folder}/${name}`);
    const bytes = await fs.readFile(path.join(source, 'releases', folder, name));
    if (hash(bytes) !== record.sha256.toUpperCase() || bytes.length !== record.bytes) throw new Error(`Source checksum mismatch: ${folder}/${name}`);
    const target = path.join(destination, 'versions', folder, name);
    const existing = await readOptional(target);
    if (existing && !existing.equals(bytes)) throw new Error(`Archived release is immutable: ${folder}/${name}`);
    operations.push({ target, bytes });
    artifacts.push({ path: name, bytes: bytes.length, sha256: hash(bytes) });
  }
  const metadata = {
    version: release.version,
    modelVersion: release.modelVersion,
    path: `${folder}/`,
    originalUrl: `${original}versions/${folder}/`,
    sourceBuildMatchesOriginal: release.sourceBuildMatchesOriginal === true,
    automatedChecksPassed: release.automatedChecksPassed,
    files: artifacts,
  };
  const bytes = Buffer.from(JSON.stringify(metadata, null, 2) + '\n');
  const target = path.join(destination, 'versions', folder, 'release.json');
  const existing = await readOptional(target);
  if (existing && !existing.equals(bytes)) throw new Error(`Archived metadata is immutable: ${folder}`);
  operations.push({ target, bytes });
  versions.push(metadata);
}

const stable = versions.find(release => release.version === manifest.stableVersion);
if (!stable) throw new Error('Stable release is missing');
for (const name of ['index.html', 'Algae_Farm_Art_Source.zip']) {
  const bytes = await fs.readFile(path.join(source, 'dist', name));
  if (hash(bytes) !== stable.files.find(file => file.path === name).sha256) throw new Error(`Current build differs from stable archive: ${name}`);
  operations.push({ target: path.join(destination, name), bytes });
}
const metadata = { version: stable.version, originalUrl: original, files: stable.files };
operations.push({ target: path.join(destination, 'release.json'), bytes: Buffer.from(JSON.stringify(metadata, null, 2) + '\n') });
operations.push({ target: path.join(destination, 'versions', 'manifest.json'), bytes: Buffer.from(JSON.stringify({ format: 'algae-farm-justlab-mirror', stableVersion: stable.version, versions }, null, 2) + '\n') });
const readme = `# Algae Farm versions\n\n[Current game](../) · [JUST Lab introduction](../../../resources/algae-farm/)\n\n${versions.map(release => `- [${release.version}](./v${release.version}/) — model ${release.modelVersion}, ${release.automatedChecksPassed} automated checks`).join('\n')}\n\nEach game and artwork ZIP matches its original verified release byte for byte. New releases use their own version folder; existing versions are never replaced. Full source archives and classroom records remain in the original project and are not copied to this public mirror.\n\nProgress is local to this browser and host. Saved progress at the original game address is separate from this mirror.\n`;
operations.push({ target: path.join(destination, 'versions', 'README.md'), bytes: Buffer.from(readme) });
operations.push({ target: path.join(destination, 'preview.jpg'), bytes: await fs.readFile(path.join(source, 'classroom', 'V1_Campaign_Final.jpg')) });

// Validate all archive inputs and existing snapshots before writing anything.
for (const operation of operations) {
  await fs.mkdir(path.dirname(operation.target), { recursive: true });
  await fs.writeFile(operation.target, operation.bytes);
  if (hash(await fs.readFile(operation.target)) !== hash(operation.bytes)) throw new Error('Copy verification failed');
}
console.log(`Mirrored Algae Farm ${stable.version}: ${versions.length} preserved versions, ${operations.length} public files; checksums verified.`);
