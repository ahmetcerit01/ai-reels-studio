# AI Reels Studio

Claude + [HyperFrames](https://github.com/heygen-com/hyperframes) (v0.9.44) ile HTML/CSS/GSAP'tan üretilen videolar.

| Dosya | İçerik |
| --- | --- |
| `output/demo.mp4` | Gece okyanusta deniz feneri animasyonu — 1080×1920, 30 fps, 14 sn |
| `output/reels-final.mp4` | Instagram Reels tanıtımı — 1080×1920, 30 fps, 23 sn, müzikli |
| `lighthouse/` | Animasyonun HyperFrames kaynağı (`index.html`) |
| `reels/` | Reels montajının kaynağı; `assets/music.m4a` ffmpeg ile sentezlenmiş telifsiz müzik |
| `.claude/skills/` | HyperFrames çekirdek skill'leri (Apache-2.0) |

## Yeniden render

```bash
cd lighthouse && npx hyperframes@0.9.44 render -o ../output/demo.mp4 -f 30 -q high
cp ../output/demo.mp4 ../reels/assets/demo.mp4
cd ../reels && npx hyperframes@0.9.44 render -o ../output/reels-final.mp4 -f 30 -q high
```

Önizleme/düzenleme: proje klasöründe `npx hyperframes@0.9.44 preview`.
