// Kullanım: node render.js [çıktı.mp4]   |   node render.js --stills 1,3.2,15  (kontrol kareleri)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');

const FPS = 30, DURATION = 18;
const args = process.argv.slice(2);
const stillsIdx = args.indexOf('--stills');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, 'index.html') + '?capture=1');
  await page.evaluate(() => window.FONTS_READY || document.fonts.ready);
  await page.waitForTimeout(500);

  if (stillsIdx >= 0){
    const times = args[stillsIdx + 1].split(',').map(Number);
    for (const t of times){
      await page.evaluate(t => window.renderAt(t), t);
      await page.screenshot({ path: path.join(args[stillsIdx + 2] || '.', `still_${t}.jpg`), type: 'jpeg', quality: 85 });
    }
    await browser.close(); return;
  }

  const out = args[0] || path.join(__dirname, 'out', 'reel.mp4');
  require('fs').mkdirSync(path.dirname(out), { recursive: true });
  const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', '17', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = FPS * DURATION;
  for (let i = 0; i < N; i++){
    await page.evaluate(t => window.renderAt(t), i / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 60 === 0) process.stdout.write(`kare ${i}/${N}\n`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('Hazır:', out);
})();
