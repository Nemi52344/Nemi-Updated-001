// Generates NEMI-branded favicons from the infinity mark.
// White mark (src/assets/nemi-logo.webp) centered on brand navy (#0a0d1a).
// Outputs: public/favicon.ico (16/32/48 multi-res) + PNG icons for modern UAs.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const SRC = "src/assets/nemi-logo.webp";
const BG = { r: 10, g: 13, b: 26, alpha: 1 }; // #0a0d1a — matches themeColor

async function render(size) {
  const pad = Math.round(size * 0.16);
  const inner = size - pad * 2;
  const mark = await sharp(SRC)
    .trim()
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

function pngsToIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(count, 4);
  const entries = [];
  const datas = [];
  let offset = 6 + count * 16;
  for (const { size, buffer } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 == 256)
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2);  // palette colors
    e.writeUInt8(0, 3);  // reserved
    e.writeUInt16LE(1, 4);   // color planes
    e.writeUInt16LE(32, 6);  // bits per pixel
    e.writeUInt32LE(buffer.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buffer.length;
    entries.push(e);
    datas.push(buffer);
  }
  return Buffer.concat([header, ...entries, ...datas]);
}

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(
  icoSizes.map(async (size) => ({ size, buffer: await render(size) }))
);
const ico = pngsToIco(icoImages);
writeFileSync("public/favicon.ico", ico);
writeFileSync("out/favicon.ico", ico); // keep the static export in sync

writeFileSync("public/icon-192.png", await render(192));
writeFileSync("public/icon-512.png", await render(512));
writeFileSync("public/apple-touch-icon.png", await render(180));

console.log("favicon.ico", ico.length, "bytes (", icoSizes.join("/"), ") + PNG icons written");
