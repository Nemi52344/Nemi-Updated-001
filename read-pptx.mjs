import fs from 'fs';
import zlib from 'zlib';

const filePath = "C:/Users/tanav/OneDrive/Desktop/BNC Groups - Structure and Team - Copy for claude '.pptx";
const buf = fs.readFileSync(filePath);
console.log('File size:', buf.length, 'bytes');

// Parse ZIP manually
let offset = 0;
const files = [];
while (offset < buf.length - 4) {
  const sig = buf.readUInt32LE(offset);
  if (sig === 0x04034b50) {
    const fnLen = buf.readUInt16LE(offset + 26);
    const extraLen = buf.readUInt16LE(offset + 28);
    const compSize = buf.readUInt32LE(offset + 18);
    const method = buf.readUInt16LE(offset + 8);
    const fn = buf.slice(offset+30, offset+30+fnLen).toString('utf8');
    const dataStart = offset + 30 + fnLen + extraLen;
    files.push({name: fn, method, compSize, dataStart});
    offset = dataStart + compSize;
  } else { offset++; }
}

// Extract all slides
const slideFiles = files
  .filter(f => f.name.match(/ppt\/slides\/slide[0-9]+\.xml$/) && !f.name.includes('_rels'))
  .sort((a,b) => {
    const na = parseInt(a.name.match(/(\d+)/)[1]);
    const nb = parseInt(b.name.match(/(\d+)/)[1]);
    return na - nb;
  });

console.log('Slides found:', slideFiles.length);

slideFiles.forEach(f => {
  let data = buf.slice(f.dataStart, f.dataStart + f.compSize);
  if (f.method === 8) data = zlib.inflateRawSync(data);
  const xml = data.toString('utf8');

  // Extract paragraphs (group runs within each paragraph)
  const paragraphs = [];
  const paraRe = /<a:p[\s>]([\s\S]*?)<\/a:p>/g;
  let pm;
  while ((pm = paraRe.exec(xml)) !== null) {
    const paraXml = pm[1];
    const runs = [];
    const runRe = /<a:t[^>]*>([^<]*)<\/a:t>/g;
    let rm;
    while ((rm = runRe.exec(paraXml)) !== null) {
      const t = rm[1].trim();
      if (t) runs.push(t);
    }
    if (runs.length) paragraphs.push(runs.join(''));
  }

  console.log('\n=== ' + f.name + ' ===');
  paragraphs.forEach(p => console.log('  ' + p));
});
