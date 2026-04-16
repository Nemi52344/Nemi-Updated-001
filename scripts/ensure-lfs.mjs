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

function tryExec(cmd, opts = {}) {
  try {
    const out = execSync(cmd, { cwd: ROOT, stdio: "pipe", ...opts });
    return { ok: true, out: out.toString().trim() };
  } catch (err) {
    return { ok: false, err };
  }
}

function ensureLfsRemote() {
  // Vercel and some other CI hosts do a shallow clone that leaves the
  // lfs.url config empty, producing `batch request: missing protocol: ""`.
  // Reconstruct the GitHub LFS endpoint from available signals so
  // `git lfs fetch` has something to talk to.
  //
  // Priority: existing origin URL > Vercel env vars > GitHub Actions env vars.
  let repoSlug = "";
  const origin = tryExec("git remote get-url origin");
  if (origin.ok) {
    const m = origin.out.match(/github\.com[:/]([^/]+\/[^/.]+)(?:\.git)?$/);
    if (m) repoSlug = m[1];
  }
  if (!repoSlug && process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG) {
    repoSlug = `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`;
  }
  if (!repoSlug && process.env.GITHUB_REPOSITORY) {
    repoSlug = process.env.GITHUB_REPOSITORY;
  }
  if (!repoSlug) return false;

  const lfsUrl = `https://github.com/${repoSlug}.git/info/lfs`;
  tryExec(`git config lfs.url "${lfsUrl}"`);
  // Make sure origin exists and points somewhere usable for fetch.
  if (!origin.ok) {
    tryExec(`git remote add origin https://github.com/${repoSlug}.git`);
  }
  return true;
}

function pullLfs() {
  // Try the straightforward path first.
  let attempt = tryExec("git lfs pull");
  if (attempt.ok && findPointerFiles(VIDEOS_DIR).length === 0) return { ok: true };

  // On CI (Vercel, etc.), `git lfs pull` often fails with "missing protocol"
  // because the shallow clone didn't copy lfs.url config. Rebuild the config
  // from known signals and retry with an explicit fetch + checkout.
  ensureLfsRemote();
  attempt = tryExec("git lfs fetch --all origin");
  if (!attempt.ok) attempt = tryExec("git lfs fetch origin");
  tryExec("git lfs checkout");

  if (findPointerFiles(VIDEOS_DIR).length === 0) return { ok: true };
  return { ok: false, err: attempt.err };
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

const pull = pullLfs();
if (pull.ok) {
  console.log("✓ LFS pull complete. All videos materialized.");
  process.exit(0);
}

// LFS not installed, or auth failed, or CI shallow-clone stripped config.
// If we are on Vercel, skip the build rather than fail — Vercel is preview-only
// for this repo; the real production deploy is AWS. Without LFS, a Vercel deploy
// would ship broken videos, but failing the build blocks every PR preview. By
// explicitly no-op'ing here we let Vercel publish a preview where videos simply
// 404 (surfaced by the browser), while AWS — which runs `git lfs pull` during
// deploy — stays protected.
if (process.env.VERCEL) {
  console.warn("");
  console.warn(
    "⚠ Vercel environment detected and LFS pull failed. Continuing build so"
  );
  console.warn(
    "  preview deployments still succeed. Videos will be missing on this"
  );
  console.warn(
    "  preview. For working videos on Vercel, add env var GIT_LFS=1 in the"
  );
  console.warn("  Vercel project settings (Settings → Environment Variables).");
  console.warn("");
  process.exit(0);
}

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
