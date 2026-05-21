/**
 * One-shot script: convert the heavy PNGs/JPGs that are actively loaded by
 * the site into WebP, then delete the originals. Run with:
 *
 *   node scripts/convert-images-to-webp.mjs
 *
 * Why: on slow mobile networks the original LMM-flow PNGs (8 MB sketch,
 * 6.9 MB CAD, etc.) take a full minute+ to load each. WebP at quality 90
 * typically lands 80–90% smaller with no visible quality loss.
 *
 * Files are listed explicitly (not a recursive glob) so this script is
 * idempotent and won't accidentally re-encode WebP files that already exist.
 */

import sharp from "sharp";
import { readFile, writeFile, unlink, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const targets = [
  "public/Images/lmm-flow/01-sketch.png",
  "public/Images/lmm-flow/02-render.png",
  "public/Images/lmm-flow/03-cad.png",
  "public/Images/lmm-flow/04-simulation.png",
  "public/Images/lmm-flow/05-bom.png",
  "public/Images/lmm-flow/06-tooling.png",
  "public/Images/lmm-flow/07-production.png",
  "public/Images/lmm-flow/08-dashboard.png",
  "public/Images/Aerospace machined parts.png",
];

const fmt = (bytes) =>
  bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(0)} KB`;

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;

for (const relPath of targets) {
  const absPath = path.join(root, relPath);
  const outPath = absPath.replace(/\.(png|jpe?g)$/i, ".webp");

  if (!existsSync(absPath)) {
    console.log(`SKIP (missing): ${relPath}`);
    continue;
  }
  if (existsSync(outPath)) {
    console.log(`SKIP (webp exists): ${relPath}`);
    continue;
  }

  const before = (await stat(absPath)).size;
  const input = await readFile(absPath);

  // quality 88 is a strong default for technical illustrations and photos.
  // effort 6 spends more CPU at convert time for tighter output (one-shot
  // script, so we don't care about throughput here).
  const output = await sharp(input)
    .webp({ quality: 88, effort: 6 })
    .toBuffer();

  await writeFile(outPath, output);
  const after = output.byteLength;

  await unlink(absPath);

  const saved = before - after;
  const pct = ((saved / before) * 100).toFixed(1);
  console.log(
    `${fmt(before).padStart(8)} → ${fmt(after).padStart(8)}  (-${pct}%)  ${relPath}`,
  );

  totalBefore += before;
  totalAfter += after;
  converted += 1;
}

console.log("\n---");
console.log(`Converted: ${converted} file(s)`);
console.log(
  `Total:     ${fmt(totalBefore)} → ${fmt(totalAfter)}  (-${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`,
);
console.log(`Saved:     ${fmt(totalBefore - totalAfter)}`);
