// Seslendirme / kamera kayıtlarına göre sahne sürelerini ve altyazı zamanlarını otomatik ayarlar.
// 1) Seslendirmeleri public/vo/<sahne-id>.wav (veya .mp3/.m4a) olarak koy: giris, park, mesafe, cevrimdisi, paylas, zaman, kapanis
// 2) Kamera kayıtlarını public/camera/giris.mp4 ve public/camera/kapanis.mp4 olarak koy
// 3) Ekran kayıtlarını public/recordings/<sahne-id>.mp4, Street View görsellerini public/streetview/eski.jpg & yeni.jpg olarak koy
// 4) node scripts/fit-to-vo.mjs   → src/data/timeline.json güncellenir (yedek: timeline.backup.json)
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
const P = path.resolve('src/data/timeline.json');
const tl = JSON.parse(fs.readFileSync(P, 'utf8'));
fs.writeFileSync(P.replace('.json', '.backup.json'), JSON.stringify(tl, null, 2));
const pub = (f) => path.resolve('public', f);
const find = (dir, id, exts) => exts.map((e) => `${dir}/${id}.${e}`).find((f) => fs.existsSync(pub(f))) ?? null;
const dur = (f) => parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${pub(f)}"`).toString());
const PAD = 0.35; // seslendirme bitince sahnenin nefes payı
for (const s of tl.scenes) {
  const old = s.duration;
  const vo = find('vo', s.id, ['wav', 'mp3', 'm4a', 'aac']);
  if (vo) s.voFile = vo;
  if (s.kind === 'camera' || s.kind === 'outro') {
    const cam = find('camera', s.id, ['mp4', 'mov', 'm4v']);
    if (cam) { s.cameraFile = cam; s.duration = +dur(cam).toFixed(2); s.voFile = null; }
    else if (vo) s.duration = +(dur(vo) + PAD).toFixed(2);
  } else {
    const rec = find('recordings', s.id, ['mp4', 'mov', 'm4v', 'webm']);
    if (rec) s.recordingFile = rec;
    if (vo) s.duration = +(Math.max(3, dur(vo) + PAD)).toFixed(2);
  }
  if (s.kind === 'timetravel') {
    const o = ['jpg', 'jpeg', 'png', 'webp'].map((e) => `streetview/eski.${e}`).find((f) => fs.existsSync(pub(f)));
    const n = ['jpg', 'jpeg', 'png', 'webp'].map((e) => `streetview/yeni.${e}`).find((f) => fs.existsSync(pub(f)));
    if (o) s.imageOld = o; if (n) s.imageNew = n;
  }
  const k = s.duration / old;
  if (Math.abs(k - 1) > 0.001) {
    const sc = (v) => +(v * k).toFixed(2);
    for (const arr of [s.steps, s.taps, s.zooms]) (arr ?? []).forEach((e) => (e.at = sc(e.at)));
    (s.captions ?? []).forEach((c) => { if (typeof c.at === 'number') c.at = sc(c.at); });
    if (s.phoneUntil) s.phoneUntil = sc(s.phoneUntil);
  }
  console.log(`${s.id.padEnd(11)} ${old.toFixed(2)}s → ${s.duration.toFixed(2)}s ${vo ? '(vo: ' + vo + ')' : ''}`);
}
fs.writeFileSync(P, JSON.stringify(tl, null, 2));
console.log('Toplam:', tl.scenes.reduce((a, s) => a + s.duration, 0).toFixed(2), 'sn → src/data/timeline.json güncellendi');
