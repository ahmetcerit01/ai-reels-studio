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

## Klon sesle üretilen seslendirme (Chatterbox)

`out/gta6_fiyat_analizi_sesli.mp4` senin ses örneğinden klonlanan sesle hazırlandı:
- **Model:** Chatterbox Multilingual (Resemble AI, MIT lisansı; ticari kullanıma açık), yerelde ve CPU üzerinde çalıştırıldı. Ücretli API kullanılmadı.
- **Referans:** Senin kendi reels kaydının 10 saniyelik temiz bir bölümü (8,0–18,85 sn).
- Her cümleden 2 deneme üretildi ve Whisper ile metne en çok uyan seçildi. "GTA" doğru okunsun diye metin "Ce Te A altı" şeklinde yazıldı.
- `vo_yerlestir.py` cümleleri ekrandaki anlara yerleştirdi ve altyazıları sesin zamanlarına eşitledi. Giriş cümleleri 3 saniyeye sığsın diye %24 hızlandırıldı.
- **Dosyalar:** `ses/cumleler/l00–l13.wav` (tek tek cümleler) · `out/vo.wav` (tam seslendirme kanalı) · `out/vo_plan.json` (cümlelerin yerleşimi).
- **Not:** Chatterbox ürettiği sese duyulmayan bir filigran (Perth) ekler; bu, sesin yapay zekâyla üretildiğini işaretler.

**Başka bir cümleyi değiştirmek için:** Cümleyi yeniden üret, `ses/cumleler/lNN.wav` dosyasını değiştir, sonra şunları çalıştır:
`python3 vo_yerlestir.py ses/cumleler && NODE_PATH=$(npm root -g) node render.js out/video_sessiz.mp4 && bash vo_ekle.sh out/vo.wav out/gta6_fiyat_analizi_sesli.mp4`
