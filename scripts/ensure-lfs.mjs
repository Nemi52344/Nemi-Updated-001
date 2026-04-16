#!/usr/bin/env node
/**
 * Ensure Git LFS files are pulled before building.
 *
 * Why: Videos in public/videos/*.mp4 are tracked via Git LFS. On hosts like
 * AWS EC2, Netlify, or generic CI, the initial `git clone` may leave LFS
 * pointer files (~130 bytes of text) in place of the real binaries.
 * If the build ships those pointers, the live site serves broken videos.
 *
 * This script:
 *   1. Detects any file in public/videos/ that is still an LFS pointer.
 *   2. Runs `git lfs pull` to materialize the real binaries.
 *   3. Fails the build early with a clear message if LFS is unavailable.
 *
 * Runs automatically as the `prebuild` npm hook, so every `npm run build`
 * (local or CI) validates LFS state before Next.js runs.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VIDEOS_DIR = path.join(ROOT, "public", "videos");

const LFS_POINTER_PREFIX = "version https://git-lfs.github.com/spec/v1";
const POINTER_MAX_BYTES = 500; // LFS pointer files are ~130 bytes

function isLfsPointer(filePath) {
  try {
    const size = statSync(filePath).size;
    if (size > POINTER_MAX_BYTES) return false;
    const content = readFileSync(filePath, "utf8");
    return content.startsWith(LFS_POINTER_PREFIX);
  } catch {
    return false;
  }
}

function findPointerFiles(dir) {
  let results = [];
  try {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        results = results.concat(findPointerFiles(full));
      } else if (isLfsPointer(full)) {
        results.push(full);
      }
    }
  } catch {
    // Directory may not exist — fine.
  }
  return results;
}

function tryExec(cmd) {
  try {
    execSync(cmd, { cwd: ROOT, stdio: "pipe" });
    return { ok: true };
  } catch (err) {
    return { ok: false, err };
  }
}

const pointers = findPointerFiles(VIDEOS_DIR);

if (pointers.length === 0) {
  console.log("✓ LFS check: all video files are materialized.");
  process.exit(0);
}

console.warn(
  `⚠ Found ${pointers.length} LFS pointer file(s) in public/videos/ — pulling real binaries...`
);
pointers.forEach((p) => console.warn("    • " + path.relative(ROOT, p)));

// First try `git lfs pull` (fastest path if LFS is installed + authenticated).
const pull = tryExec("git lfs pull");
if (pull.ok) {
  const remaining = findPointerFiles(VIDEOS_DIR);
  if (remaining.length === 0) {
    console.log("✓ LFS pull complete. All videos materialized.");
    process.exit(0);
  }
  console.error(
    "✗ `git lfs pull` ran but some pointer files remain:",
    remaining.map((p) => path.relative(ROOT, p))
  );
  process.exit(1);
}

// LFS not installed or auth failed. Print actionable guidance and fail early.
console.error("");
console.error("✗ BUILD BLOCKED: Git LFS files were not pulled.");
console.error("");
console.error(
  "  Cause: public/videos/*.mp4 are tracked with Git LFS, but this"
);
console.error(
  "         checkout contains pointer stubs instead of real binaries."
);
console.error("         Shipping the build will serve broken videos.");
console.error("");
console.error("  Fix on this host — run once:");
console.error("    sudo apt-get install -y git-lfs   # (or: brew install git-lfs)");
console.error("    git lfs install");
console.error("    git lfs pull");
console.error("");
console.error("  Or, if LFS is unavailable in this environment, upload the");
console.error("  locally-built `out/` folder (which already contains real videos)");
console.error("  to the host directly.");
console.error("");
if (pull.err?.stderr) {
  console.error("  Underlying error:");
  console.error("    " + pull.err.stderr.toString().trim().split("\n").join("\n    "));
}
process.exit(1);
