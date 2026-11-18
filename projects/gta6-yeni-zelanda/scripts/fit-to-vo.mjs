// Kendi seslendirmeni bağlar ve videoyu senin konuşma hızına göre yeniden zamanlar.
// 1) Cümleleri public/vo/l01.wav … l13.wav olarak kaydet (sıra: docs/seslendirme.md)
// 2) node scripts/fit-to-vo.mjs   → timeline.json'daki dur/voFile güncellenir, docs/seslendirme.srt yeniden yazılır
// 3) npm run all                  → video + kapak + ses kanalı yeniden render edilir
import fs from 'node:fs'; import { execSync } from 'node:child_process';
const P = 'src/data/timeline.json'; const tl = JSON.parse(fs.readFileSync(P, 'utf8'));
const dur = (f) => parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "public/${f}"`).toString());
for (const l of tl.lines) {
  const f = ['wav', 'mp3', 'm4a'].map((e) => `vo/${l.id}.${e}`).find((x) => fs.existsSync(`public/${x}`));
  if (f) { l.voFile = f; l.dur = +dur(f).toFixed(2); console.log(`${l.id}: ${l.dur} sn ← ${f}`); }
}
fs.writeFileSync(P, JSON.stringify(tl, null, 2));
// zamanlama (src/theme.ts computeTiming ile aynı mantık) → SRT
let t = 0; const rows = [];
tl.scenes.forEach((s, k) => {
  const s0 = t; let cur = s0 + (k === 0 ? 0.05 : tl.lead); const ls = tl.lines.filter((l) => l.scene === s.id);
  ls.forEach((l, j) => { rows.push([cur, cur + l.dur, l.vo]); cur += l.dur + (j < ls.length - 1 ? tl.gapLine : 0); });
  t = Math.max(cur + (k === tl.scenes.length - 1 ? tl.ctaHold : tl.tail), s0 + s.min);
});
const ts = (x) => { const ms = Math.round(x * 1000); return `00:${String(Math.floor(ms / 60000)).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
fs.writeFileSync('docs/seslendirme.srt', rows.map(([a, b, v], i) => `${i + 1}\n${ts(a)} --> ${ts(b)}\n${v}\n`).join('\n'));
console.log('Toplam:', t.toFixed(2), 'sn · docs/seslendirme.srt yazıldı');
