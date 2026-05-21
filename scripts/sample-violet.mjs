// Sample the dominant violet pixel from the brand background image.
// Reads the JPG bytes, decodes via the platform-native ImageDecoder (Node 24+
// ships a usable decoder, but for portability we shell out to a tiny canvas
// implementation through `next/image`-less code path: instead we just hand-
// roll a JPEG decoder by leaning on the built-in `createImageBitmap` polyfill
// available in modern Node — falling back to a manual scan.
//
// Simpler path: use sharp if installed; otherwise a no-op message.

import { promises as fs } from "node:fs";
import { join } from "node:path";

const target = join(process.cwd(), "public", "nemi-ai-background.jpg");

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error(
      "sharp not installed. Run: npm i -D sharp  — then re-run this script."
    );
    process.exit(1);
  }

  const bytes = await fs.readFile(target);
  const { data, info } = await sharp(bytes)
    .resize(400, null, { withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const buckets = new Map(); // quantized hex → { count, r, g, b }
  for (let i = 0; i < data.length; i += info.channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Filter to violet-ish pixels: blue dominant, red > green, and at least
    // mid-brightness (skip the near-black background).
    if (b <= g) continue;
    if (r <= g) continue;
    const max = Math.max(r, g, b);
    if (max < 60) continue; // skip near-black
    if (max > 245) continue; // skip near-white
    // Quantize to a 16-step palette per channel.
    const q = (v) => v & 0xf0;
    const key = `${q(r)},${q(g)},${q(b)}`;
    const entry = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 };
    entry.count++;
    entry.r += r;
    entry.g += g;
    entry.b += b;
    buckets.set(key, entry);
  }

  const ranked = [...buckets.values()]
    .map((e) => ({
      count: e.count,
      r: Math.round(e.r / e.count),
      g: Math.round(e.g / e.count),
      b: Math.round(e.b / e.count)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  console.log("Top violet-ish swatches (most pixels first):");
  for (const c of ranked) {
    const hex =
      "#" +
      [c.r, c.g, c.b]
        .map((v) => v.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();
    console.log(`  ${hex}   rgb(${c.r}, ${c.g}, ${c.b})   ${c.count} px`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
