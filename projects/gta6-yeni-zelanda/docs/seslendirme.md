# Seslendirme Metni ve Zaman Kodları (30,5 sn)

Videodaki altyazılar bu metinle birebir aynı ve aynı zamanlara oturuyor. Seslendirme olmasa da video altyazılarla eksiksiz anlaşılıyor.
SRT: `docs/seslendirme.srt`

| # | Zaman | Sahne | Metin |
|---|---|---|---|
| l01 | 00:00.05 | Kanca | GTA 6 Türkiye’de daha çıkmadı |
| l02 | 00:01.86 | Kanca | ama Türk yayıncılar çoktan oynamaya başladı! |
| l03 | 00:04.02 | Kanca | Nasıl mı? |
| l04 | 00:05.00 | Sır | İşin sırrı Yeni Zelanda! |
| l05 | 00:06.46 | Sır | Oyun orada Türkiye’den tam 10 saat önce açıldı. |
| l06 | 00:09.34 | Yöntem | Türk hesabının bölgesi değiştirilemiyor. |
| l07 | 00:11.50 | Yöntem | Bu yüzden bazı oyuncular Yeni Zelanda bölgesinde |
| l08 | 00:13.96 | Yöntem | yeni bir PlayStation hesabı açıp |
| l09 | 00:15.62 | Yöntem | GTA 6’yı oradan satın aldı. |
| l10 | 00:17.18 | Yöntem | Böylece oyun Türkiye’de açılmadan oynayabildiler! |
| l11 | 00:19.96 | Dikkat | Ama sadece PlayStation’ın saatini değiştirmek yetmiyor. |
| l12 | 00:22.62 | Dikkat | Üstelik farklı bölgeden hesap açmak risk taşıyabiliyor. |
| l13 | 00:25.60 | Final | Peki sen GTA 6’yı 10 saat erken oynamak için yeni hesap açar mıydın? |

Kesin değerler `docs/seslendirme.srt` dosyasında.

**Okuma:** "GTA 6"yı "Ge Te A altı" diye oku. Hızlı ve enerjik konuş, cümle aralarında bekleme yapma.

## Kendi sesini ekleme

**Önerilen yol (tam senkron):**
1. Her satırı ayrı dosya olarak kaydet ve `public/vo/l01.wav … l13.wav` adlarıyla koy.
2. `npm run fit` çalıştır. Sahne süreleri, sayı patlamaları ve altyazılar senin konuşma hızına göre kendini ayarlar.
3. `npm run all` ile video, kapak ve ses kanalını yeniden render et.

**Tek parça kayıt:** `bash scripts/sesi-ekle.sh seslendirme.wav` komutu `out/gta6_yeni_zelanda_reels_sesli.mp4` dosyasını üretir. Ses efektleri sen konuşurken otomatik kısılır ve karışım -14 LUFS'a ayarlanır.

**Ayrı ses kanalı:** `out/ses_efektleri.wav` yalnızca ses efektlerini içerir; kurgu programında seslendirmeni bunun yanına ikinci kanal olarak koyabilirsin.

## Senin klonlanan sesinle sürüm (`out/gta6_yeni_zelanda_reels_sesli.mp4`, 32,4 sn)

- **Model:** Chatterbox Multilingual (MIT lisansı), yerelde çalıştırıldı. Referans: senin ses örneğin (8,0–18,85 sn), ifade gücü 0.8, cfg 0.3.
- **Okunuş:** Metin okunuşuna göre yazıldı: "Ge Te A altı", "on saat", "Pleysteyşın".
- **Seçim:** Her cümleden 3 deneme üretildi; metin uyumu, konuşmacı benzerliği ve perdeye göre en iyisi seçildi.
- **Düzeltmeler:**
  - 10. cümle, "oynayabildiler" doğru okunan denemeyle değiştirildi.
  - Final sorusu iki parçada (4'er deneme) üretilip birleştirildi.
- **İşleme:**
  - Her cümle Whisper'ın kelime sınırlarından kesildi.
  - %5 hızlandırma uygulandı. Hızlanınca bozulan cümlelerde (l01, l07, l12) hızlandırılmamış hal kullanıldı.
  - Video sese göre yeniden zamanlandı (`npm run fit`). Seslendirme varken efektler 0.3 seviyesinde; karışım -14 LUFS.
- **Dosyalar:** `public/vo/l01–l13.wav` (videoda kullanılan) · `ses/cumleler_ham/` (ham üretim) · `out/seslendirme_ve_efektler.wav` (karışık ses).
- **Kontrol edilmesi gerekenler:** l12'deki "risk" ve l01'deki "Ge Te A altı" Whisper'a göre biraz yumuşak duyuluyor. Beğenmezsen sadece o cümleleri yeniden üretmek yeterli.
- **Not:** Chatterbox ürettiği sese duyulmayan bir filigran (Perth) ekler.
