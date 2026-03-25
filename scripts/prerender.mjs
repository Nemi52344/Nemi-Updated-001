/**
 * NEMI AI — Static Site Generation (Pre-render) Script
 *
 * Flow:
 *   1. vite build          → client bundle  → dist/
 *   2. vite build --ssr    → SSR bundle     → dist-server/
 *   3. Import SSR bundle, renderToString each route
 *   4. Inject rendered HTML + Helmet head tags into dist/index.html
 *   5. Write per-route index.html files
 *   6. Clean up dist-server/
 */

import { build } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const ROUTES = ["/", "/services", "/technology", "/about", "/careers"];

// ─── Step 1: Client build ────────────────────────────────────────────────────
console.log("\n🔨 [1/3] Building client bundle...");
await build({ root: ROOT });

// ─── Step 2: SSR bundle ──────────────────────────────────────────────────────
console.log("\n🔨 [2/3] Building SSR bundle...");
await build({
  root: ROOT,
  build: {
    ssr: path.resolve(ROOT, "src/entry-server.tsx"),
    outDir: path.resolve(ROOT, "dist-server"),
    rollupOptions: {
      output: { format: "esm" },
    },
  },
  ssr: {
    // Bundle all deps into the SSR bundle — avoids ESM resolution issues on Windows/Node 24
    noExternal: /.*/,
  },
});

// ─── Step 3: Pre-render each route ──────────────────────────────────────────
console.log("\n🔨 [3/3] Pre-rendering routes...");

const { render } = await import(
  pathToFileURL(path.resolve(ROOT, "dist-server/entry-server.js")).href
);

const template = fs.readFileSync(
  path.resolve(ROOT, "dist/index.html"),
  "utf-8"
);

for (const route of ROUTES) {
  let appHtml = "";
  let headTags = "";

  try {
    const result = render(route);
    appHtml = result.html || "";

    const { helmet } = result;
    if (helmet) {
      headTags = [
        helmet.title?.toString() || "",
        helmet.meta?.toString() || "",
        helmet.link?.toString() || "",
        helmet.script?.toString() || "",
      ]
        .filter(Boolean)
        .join("\n    ");
    }
  } catch (err) {
    console.warn(`  ⚠️  Failed to render ${route}:`, err.message);
  }

  const finalHtml = template
    .replace("<!--app-head-->", headTags)
    .replace("<!--app-html-->", appHtml);

  // Write to dist/<route>/index.html
  const outputDir =
    route === "/"
      ? path.resolve(ROOT, "dist")
      : path.resolve(ROOT, "dist", route.slice(1));

  fs.mkdirSync(outputDir, { recursive: true });
  const outputFile = path.resolve(outputDir, "index.html");
  fs.writeFileSync(outputFile, finalHtml);

  console.log(`  ✅ ${route} → ${path.relative(ROOT, outputFile)}`);
}

// ─── Step 4: Cleanup ─────────────────────────────────────────────────────────
fs.rmSync(path.resolve(ROOT, "dist-server"), { recursive: true, force: true });

console.log("\n🎉 Pre-rendering complete! All routes have server-rendered HTML.\n");
