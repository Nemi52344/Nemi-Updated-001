import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// PPTX file path (PPTX is a ZIP file)
const PPTX_PATH = "C:/Users/tanav/OneDrive/Desktop/BNC Groups - Structure and Team - Copy for claude '.pptx";
const OUTPUT_DIR = "C:/Users/tanav/Downloads/physical-ai-renaissance-main/physical-ai-renaissance-main/public/Images/team";

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Read the entire ZIP file
const zipData = fs.readFileSync(PPTX_PATH);

/**
 * Parse a ZIP file buffer and extract files matching a prefix.
 * Returns an array of { name, data } objects.
 */
function parseZip(buffer) {
  const files = [];
  let offset = 0;

  while (offset < buffer.length - 4) {
    // Look for local file header signature: 0x04034b50
    const sig = buffer.readUInt32LE(offset);

    if (sig === 0x04034b50) {
      // Local file header
      const versionNeeded = buffer.readUInt16LE(offset + 4);
      const flags = buffer.readUInt16LE(offset + 6);
      const compression = buffer.readUInt16LE(offset + 8);
      const compressedSize = buffer.readUInt32LE(offset + 18);
      const uncompressedSize = buffer.readUInt32LE(offset + 22);
      const fileNameLen = buffer.readUInt16LE(offset + 26);
      const extraFieldLen = buffer.readUInt16LE(offset + 28);

      const fileNameStart = offset + 30;
      const fileName = buffer.slice(fileNameStart, fileNameStart + fileNameLen).toString('utf8');

      const dataStart = fileNameStart + fileNameLen + extraFieldLen;
      const dataEnd = dataStart + compressedSize;

      if (dataEnd <= buffer.length) {
        const compressedData = buffer.slice(dataStart, dataEnd);

        files.push({
          name: fileName,
          compression,
          compressedData,
          compressedSize,
          uncompressedSize,
        });
      }

      offset = dataStart + compressedSize;
    } else if (sig === 0x02014b50) {
      // Central directory header — we're done with local entries
      break;
    } else {
      offset++;
    }
  }

  return files;
}

function extractFile(entry) {
  if (entry.compression === 0) {
    // Stored (no compression)
    return entry.compressedData;
  } else if (entry.compression === 8) {
    // Deflate
    return zlib.inflateRawSync(entry.compressedData);
  } else {
    throw new Error(`Unsupported compression method: ${entry.compression}`);
  }
}

console.log(`Reading ZIP file: ${PPTX_PATH}`);
const entries = parseZip(zipData);

console.log(`\nTotal entries found: ${entries.length}`);

// Filter to ppt/media/ entries
const mediaEntries = entries.filter(e => e.name.startsWith('ppt/media/') && !e.name.endsWith('/'));

console.log(`\nMedia files found: ${mediaEntries.length}`);
console.log('');

const extracted = [];

for (const entry of mediaEntries) {
  try {
    const data = extractFile(entry);
    const baseName = path.basename(entry.name);
    const outPath = path.join(OUTPUT_DIR, baseName);
    fs.writeFileSync(outPath, data);
    extracted.push({ name: baseName, size: data.length, path: outPath });
    console.log(`  Extracted: ${baseName} (${data.length} bytes)`);
  } catch (err) {
    console.error(`  ERROR extracting ${entry.name}: ${err.message}`);
  }
}

console.log(`\n=== EXTRACTION COMPLETE ===`);
console.log(`Extracted ${extracted.length} files to: ${OUTPUT_DIR}`);
console.log('');
console.log('File list with sizes:');
extracted.sort((a, b) => b.size - a.size);
for (const f of extracted) {
  console.log(`  ${f.name.padEnd(30)} ${(f.size / 1024).toFixed(1)} KB`);
}
