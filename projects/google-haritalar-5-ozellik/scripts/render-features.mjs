// 5 özelliği ayrı ayrı MP4 olarak dışa aktarır: out/ozellik-<n>-<id>.mp4
import { execSync } from 'node:child_process';
import fs from 'node:fs';
const tl = JSON.parse(fs.readFileSync('src/data/timeline.json', 'utf8'));
for (const s of tl.scenes.filter((x) => x.kind === 'feature' || x.kind === 'timetravel')) {
  const id = `Ozellik-${s.index}-${s.id}`;
  console.log('▶', id);
  execSync(`npx remotion render ${id} out/ozellik-${s.index}-${s.id}.mp4 --log=error`, { stdio: 'inherit' });
}
