# GTA VI Türkiye Fiyat Analizi: Reels Projesi

1080×1920 · 30 fps · 43 sn. HTML/Canvas animasyonu, Playwright ile kare kare kayıt ve FFmpeg ile kodlama. Ücretli API ve telifli müzik yok; ses efektleri kodla sentezleniyor.

| Dosya | Ne işe yarar |
|---|---|
| `out/gta6_fiyat_analizi.mp4` | Yayına hazır video (ses efektli, seslendirmesiz) |
| `out/gta6_cover.png` | Kapak: "GTA VI 4.000 TL değer mi?" |
| `out/video_sessiz.mp4`, `out/sfx.wav` | Ayrı görüntü ve ses efekti kanalları |
| `index.html` | Düzenlenebilir animasyon. Tarayıcıda açınca canlı oynar. Metinler `CAPS`/`NOTES` dizilerinde, sahneler `sHook…sCTA` fonksiyonlarında. |
| `render.js` | Render: `NODE_PATH=$(npm root -g) node render.js out/video_sessiz.mp4` · kapak: `node render.js --cover` |
| `sfx.py` | Ses efekti kanalını üretir (`python3 sfx.py`). Olay zamanları `EVENTS` bölümünde. |
| `vo_ekle.sh` | Kendi seslendirmeni ekler: `bash vo_ekle.sh sesim.wav` |
| `seslendirme.md`, `seslendirme.srt` | Seslendirme metni ve zaman kodları |
| `instagram_aciklama.md` | Açıklama ve 5 hashtag |

**Tam yeniden üretim:**

```bash
NODE_PATH=$(npm root -g) node render.js out/video_sessiz.mp4
NODE_PATH=$(npm root -g) node render.js --cover
python3 sfx.py
ffmpeg -y -i out/video_sessiz.mp4 -i out/sfx.wav -filter_complex "[1:a]aformat=channel_layouts=stereo,loudnorm=I=-18:TP=-1.5:LRA=11[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart out/gta6_fiyat_analizi.mp4
```

**Veri notları:**
- 3.999 TL (PS5 Standart, Türkiye) ve 19 Kasım 2026 çıkış tarihi Türk haber sitelerinde tutarlı. Kesin teyit için PlayStation Store Türkiye sayfası kontrol edilmeli.
- 80 saat bir varsayım; kahve ve hamburger fiyatları varsayımsal örnek. Videoda bunlar ekranda dipnot olarak belirtiliyor.

**Görseller:** Rockstar'ın resmî medyası ve GTA logosu kullanılmadı, çünkü sosyal medyada yeniden kullanım izni yok. "GTA VI" düz metin olarak geçiyor; geri kalan her şey özgün motion graphics.
