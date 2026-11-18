# GTA VI: Türk Yayıncılar Nasıl Erken Oynuyor? (Remotion Reels)

1080×1920 · 30 fps · 30,5 sn · Remotion 4 + React + TypeScript + FFmpeg. Ücretli API kullanılmadı; ses efektleri kodla sentezlendi (`scripts/make-sfx.py`). Fontlar yerel paketlerden yükleniyor, render için internet gerekmez.

| Çıktı | Açıklama |
|---|---|
| `out/gta6_yeni_zelanda_reels.mp4` | Yayına hazır video (ses efektli, seslendirme kanalı boş) |
| `out/gta6_yeni_zelanda_cover.png` | Kapak: "GTA VI ÇIKTI! / TÜRK YAYINCILAR NASIL OYNUYOR?" (turuncu ışık solda, sol hizalı) |
| `out/ses_efektleri.wav` | Yalnızca ses efektleri (ayrı kanal) |
| `docs/seslendirme.md`, `docs/seslendirme.srt` | Seslendirme metni ve zaman kodları |
| `docs/instagram_aciklama.md` | Hashtag'siz Instagram açıklaması |

## Komutlar

```bash
npm install
npm run studio        # canlı düzenleme
npm run fit           # public/vo/l01..l13.wav → zamanlamayı sese göre ayarla
npm run all           # video + kapak + ses kanalı
node scripts/stills.mjs 0.5,5,12,20,28   # kalite kontrol sayfası (out/qa/sheet.jpg)
```

## Yapı

- `src/data/timeline.json`: Tek zamanlama kaynağı. Cümleler, altyazı satırları ve sahne başlıkları burada.
- `src/theme.ts`: Renkler (her zamanki tema), fontlar ve zamanlama hesabı. Sahneler cümlelerden hesaplanır.
- `src/components.tsx`: Arka plan (bakır tonlu palmiye ve şehir silüeti), başlık, altyazı, yorum pill'i, bayraklar.
- `src/scenes.tsx`: Kanca, Saat farkı, Yöntem, Dikkat, Final.
- `src/Video.tsx`: Kurgu (`Reels`) ve kapak (`Kapak`).

## Bilgi doğrulama (18 Kasım 2026)

- Çıkış 19 Kasım 2026'da, her bölgede yerel saatle 00:00. Yeni Zelanda 00:00 (NZDT) = 18 Kasım 11:00 UTC = Türkiye 14:00, yani Türkiye'den 10 saat önce.
- PlayStation Destek'e göre hesabın ülke/bölgesi oluşturulduktan sonra değiştirilemez.
- Yöntem: Yeni Zelanda bölgeli yeni bir PSN hesabı açıp YZ mağazasından satın almak (genelde YZ hediye kartıyla). Konsol saatini değiştirmek işe yaramıyor.
- Risk: PlayStation koşulları, yaşamadığın ülkede hesap kullanmayı yasaklıyor. Askıya alma iddiaları sosyal medyada geçiyor ama resmî olarak doğrulanmadı; videoda "risk taşıyabiliyor" diye ölçülü anlatıldı.
- Türk yayıncıların bu yöntemle oynadığına dair bağımsız bir kaynak bulunamadı; bu bilgi içerik sahibinin.

## Görseller

Rockstar'ın fragman ve medya görselleri kullanılmadı. "GTA VI" logo olarak değil, düz metin olarak geçiyor. Yayın kartı, konsol ekranı ve saatler temsilî motion graphics; gerçek oynanış görüntüsü olarak sunulmuyor.
