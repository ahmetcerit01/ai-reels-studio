# Seslendirme Metni ve Zaman Kodları (43 sn)

Videodaki animasyonlu altyazılar bu metinle birebir aynı ve aynı zamanlara oturuyor. Seslendirme olmadan da video eksiksiz anlaşılır.
SRT sürümü: `seslendirme.srt` (Premiere, CapCut ve DaVinci gibi programlarda zaman çizelgesi rehberi olarak kullanabilirsin).

| Zaman | Bölüm | Metin |
|---|---|---|
| 00:00.0 | Giriş | GTA 6'ya 4.000 TL vermek saçmalık mı? |
| 00:01.9 | Giriş | Bir hesap yapalım. |
| 00:03.1 | Hesap 1 | Diyelim ki oyunu toplam 80 saat oynadın. |
| 00:05.6 | Hesap 1 | Bu, saat başına sadece 50 lira demek. |
| 00:09.1 | Hesap 2 | Her gün 2 saat oynarsan, |
| 00:11.4 | Hesap 2 | tam 40 gün boyunca eğlenmiş oluyorsun. |
| 00:15.1 | Kahve | Peki 40 gün boyunca her gün 200 liralık kahve içsen? |
| 00:19.6 | Kahve | Tam 8.000 lira! |
| 00:24.1 | Hamburger | Her gün 450 liralık hamburger yesen? |
| 00:27.6 | Hamburger | Tam 18.000 lira! |
| 00:31.1 | Sonuç | Tabii dışarı çıkmakla oyun oynamak aynı şey değil. |
| 00:34.3 | Sonuç | Ama bir oyunun fiyatını, kaç saat eğlendirdiğiyle |
| 00:36.6 | Sonuç | değerlendirmek gerekmez mi? |
| 00:39.1 | Etkileşim | Peki sen, GTA 6'ya 4.000 TL verir misin? |

**Okuma ipuçları**
- Sayıları açık söyle: "dört bin", "seksen", "elli", "kırk", "sekiz bin", "on sekiz bin".
- "Tam 8.000 lira!" ve "Tam 18.000 lira!" cümleleri ekrandaki sayı patlamasıyla aynı anda gelsin; bu anlarda güçlü bir vuruş efekti var.
- Kayıt 43 saniyeyi geçmesin. Gerekirse cümle aralarındaki boşlukları kısalt.

## Kendi sesini ekleme

```bash
# Ses efektleri korunur, seslendirme -16 LUFS'a normalize edilir; konuşurken efektler hafifçe kısılır (ducking)
bash vo_ekle.sh benim_sesim.wav            # → out/gta6_fiyat_analizi_vo.mp4
```

Ayrı kanallar: `out/video_sessiz.mp4` (yalnızca görüntü) ve `out/sfx.wav` (yalnızca ses efektleri). Kurgu programında üçüncü kanal olarak kendi sesini ekleyebilirsin.

## Klon sesle üretilen seslendirme (Chatterbox, 2. sürüm: seri akış)

`out/gta6_fiyat_analizi_sesli.mp4` (28,95 sn) senin ses örneğinden klonlanan sesle hazırlandı:
- **Model:** Chatterbox Multilingual (MIT lisansı), yerelde ve CPU üzerinde çalıştırıldı.
- **Ayarlar:** Senin sesine en yakın ayar ölçülerek seçildi: referans 8,0–18,85 sn, ifade gücü 0.8, cfg 0.3. Konuşmacı benzerliği yaklaşık 0,89–0,90, perde ~150 Hz (sende 153 Hz).
- **Okunuş:** "GTA" kelimesi "Ge Te A" diye okutuldu.
- **Seçim:** Her cümleden 3 deneme üretildi; metin uyumu, benzerlik ve perdeye göre en iyisi seçildi.
- **Akış:**
  - Her cümle Whisper'ın kelime sınırlarından kesildi; modelin sonda bıraktığı mırıltı kuyrukları atıldı.
  - Tempo %12 hızlandırıldı, cümle içi duraklamalar 0,04 sn'ye indirildi.
  - Cümle aralarında 0,03 sn, bölüm aralarında 0,08 sn boşluk var.
- **Video zamanlaması:** Video sese göre yeniden zamanlandı (`out/timing.json`). Bölüm süreleri ve sayı patlamaları cümlelere bağlı. Tek uzun sessizlik, sondaki 1,5 sn'lik soru ekranı.
- **Dosyalar:**
  - `ses/cumleler/` (ham cümleler) ve `ses/cumleler_kesik/` (kesilmiş cümleler)
  - `out/vo.wav` (tam seslendirme kanalı)
- **Not:** Chatterbox ürettiği sese duyulmayan bir filigran (Perth) ekler.

**Yeniden üretim:**
`python3 vo_yerlestir.py ses/cumleler_kesik && NODE_PATH=$(npm root -g) node render.js out/video_sessiz.mp4 && python3 sfx.py && bash vo_ekle.sh out/vo.wav out/gta6_fiyat_analizi_sesli.mp4`

**Kendi kaydınla:** Metni tek seferde oku, dosyayı cümlelere böl (`l00.wav` … `l13.wav`, sıra yukarıdaki tabloyla aynı), sonra aynı komutları çalıştır. Video senin konuşma hızına göre kendini ayarlar.
