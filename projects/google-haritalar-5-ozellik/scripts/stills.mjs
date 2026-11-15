// Kalite kontrol: belirli saniyelerde kare alır ve tek bir "contact sheet" üretir.
// Kullanım: node scripts/stills.mjs [kompozisyon] [aralık_sn]   ör: node scripts/stills.mjs Full 1
import { bundle } from '@remotion/bundler';
import { getCompositions, renderStill } from '@remotion/renderer';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const comp = process.argv[2] || 'Full';
const step = parseFloat(process.argv[3] || '1');
const outDir = path.resolve('out/qa', comp);
fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const c = (await getCompositions(serveUrl)).find((x) => x.id === comp);
const frames = [];
for (let t = 0.3; t < c.durationInFrames / c.fps; t += step) frames.push(Math.round(t * c.fps));
for (const f of frames) {
  await renderStill({ serveUrl, composition: c, frame: f, output: path.join(outDir, `f${String(f).padStart(4, '0')}.png`), imageFormat: 'png', scale: 0.5 });
  process.stdout.write('.');
}
const cols = 6;
execSync(`ffmpeg -v error -y -pattern_type glob -i '${outDir}/f*.png' -vf "scale=270:-1,drawtext=text='%{n}':x=8:y=8:fontsize=22:fontcolor=red,tile=${cols}x${Math.ceil(frames.length / cols)}" -frames:v 1 ${outDir}/../${comp}-sheet.jpg`);
console.log(`\nHazır: out/qa/${comp}-sheet.jpg (${frames.length} kare, her ${step} sn)`);
