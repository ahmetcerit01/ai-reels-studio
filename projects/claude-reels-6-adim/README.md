# Claude ile Animasyonlu Reels: 6 Adım (Remotion)

1080×1920 · 30 fps · 44,7 sn · her zamanki tema (koyu zemin + bakır vurgu). Ücretsiz araçlar: Remotion, React, FFmpeg. Ses efektleri kodla sentezlendi.

| Çıktı | Açıklama |
|---|---|
| `out/claude_reels_6_adim.mp4` | Yayına hazır video (altyazılı, ses efektli) |
| `out/claude_reels_6_adim_cover.png` | Kapak: "Claude ile ANİMASYONLU reels · 6 ADIMDA" |
| `out/ses_efektleri.wav` | Ayrı ses efekti kanalı |
| `docs/seslendirme.md` / `.srt` | Seslendirme metni ve zaman kodları |
| `docs/instagram_aciklama.md` | Açıklama |

```bash
npm install
npm run studio
npm run fit && npm run all     # public/vo/l01..l16.wav ile senin sesine göre yeniden zamanla ve render al
```

Kancadaki telefonlarda kanalın önceki reels'lerinden kareler kullanıldı (`public/img/`). Uygulama, klasör ve sohbet ekranları temsilî çizimlerdir; gerçek ekran görüntüsü değildir.
