// Kalite kontrol: belirli saniyelerde kare alıp tek sayfada birleştirir. Kullanım: node scripts/stills.mjs 0.5,2,3.9 ...
import { bundle } from '@remotion/bundler';
import { getCompositions, renderStill } from '@remotion/renderer';
import { execSync } from 'node:child_process';
import fs from 'node:fs'; import path from 'node:path';
const times = (process.argv[2] || '').split(',').filter(Boolean).map(Number);
const out = path.resolve('out/qa'); fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const c = (await getCompositions(serveUrl)).find((x) => x.id === 'Reels');
console.log('Süre:', (c.durationInFrames / c.fps).toFixed(2), 'sn');
for (const [i, t] of times.entries()) await renderStill({ serveUrl, composition: c, frame: Math.min(c.durationInFrames - 1, Math.round(t * c.fps)), output: `${out}/f${String(i).padStart(2, '0')}.png`, scale: 0.5 });
execSync(`ffmpeg -v error -y -pattern_type glob -i '${out}/f*.png' -vf "scale=270:-1,tile=${Math.min(7, times.length)}x${Math.ceil(times.length / 7)}" -frames:v 1 ${out}/sheet.jpg`);
console.log('out/qa/sheet.jpg');
