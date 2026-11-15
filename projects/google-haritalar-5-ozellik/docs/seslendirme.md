# Türkçe Seslendirme Metni

Toplam hedef: **30–34 sn.** Cümleler, ekrandaki altyazı vuruşlarıyla eşleşecek şekilde kısa tutuldu.
`/` işareti doğal bir nefes ya da vurgu yerini gösterir. Hız: rahat ama enerjik (yaklaşık 2,8–3 kelime/sn).

**Kayıt ipucu:** Her bölümü ayrı dosya olarak kaydet ve `public/vo/` içine aşağıdaki adlarla koy. Ardından `npm run fit` sahne sürelerini ve altyazıları kendi sesine göre ayarlar.

| Dosya | Sahne | Hedef | Metin |
|---|---|---|---|
| `camera/giris.mp4` (kamera, sesli) | Giriş | ~4 sn | Google Haritalar'ı her gün kullanıyorsun / ama bu **beş** özelliği / büyük ihtimalle hiç denemedin. |
| `vo/park.wav` | 01 Park | ~5 sn | Arabanı park edince / **mavi noktaya** dokun / ve park yeri olarak kaydet. Dönüşte aramazsın. |
| `vo/mesafe.wav` | 02 Mesafe | ~5 sn | İki nokta arası **kuş uçuşu** mesafe mi lazım? / Haritaya basılı tut, / "Mesafeyi ölç"e dokun ve kaydır. |
| `vo/cevrimdisi.wav` | 03 Çevrimdışı | ~5 sn | İnternet çekmeyecek mi? / Profilinden **çevrimdışı haritalara** gir, / bölgeni seç ve indir. |
| `vo/paylas.wav` | 04 Paylaş | ~5 sn | Navigasyon açıkken / "**Yolculuk ilerlemesini paylaş**"a dokun; / nerede olduğunu ve varış saatini canlı görsünler. |
| `vo/zaman.wav` | 05 Zaman | ~7 sn | Ve en sevdiğim: / Street View'de ekrana dokun, "**Daha fazla tarih**"i seç. / Aynı sokağın yıllar önceki hâlini gör. |
| `camera/kapanis.mp4` (kamera, sesli) | Kapanış | ~3 sn | Kaydet, yorumlara **HARİTA** yaz, / listeyi DM'den göndereyim. |

## Tek parça kayıt tercih edersen

Aynı metni tek seferde oku (bölümler arasında yarım saniye boşluk bırak) ve render'dan sonra şu komutla birleştir:

```bash
bash scripts/merge.sh out/tam-onizleme.mp4 seslendirme.wav out/final.mp4
```

## Alternatif kancalar (A/B testi için)

- "Google Haritalar'da 5 gizli özellik var / ve sonuncusu seni zamanda yolculuğa çıkaracak."
- "Bunu bilseydim / park yerimi hiç kaybetmezdim. / İşte Google Haritalar'ın 5 gizli özelliği."
