# Seslendirme Metni ve Zaman Kodları (44,7 sn)

Ekrandaki altyazılar bu metinle birebir aynı. SRT: `docs/seslendirme.srt`

| # | Zaman | Metin |
|---|---|---|
| l01 | 00:00.05 | Herkes şu an Claude ile animasyonlu reels yapıyor. |
| l02 | 00:02.71 | Ama kimse nasıl yapıldığını göstermiyor. |
| l03 | 00:04.87 | Bu reels’ler de tam olarak böyle yapıldı. |
| l04 | 00:07.17 | Birinci adım: Claude masaüstü uygulamasını indir. |
| l05 | 00:09.73 | Tarayıcıdaki sürüm değil, uygulama. |
| l06 | 00:11.83 | İkinci adım: bir klasör aç, adını AI Video Editörü koy. |
| l07 | 00:14.69 | Bütün dosyalar ve reels’ler burada duracak. |
| l08 | 00:16.99 | Üçüncü adım: yeni bir Claude Code sohbeti aç, Yerel’i seç ve o klasörü göster. |
| l09 | 00:20.45 | Artık Claude dosyalarını okuyup yazabiliyor. |
| l10 | 00:22.75 | Dördüncü adım: kurulumumu kontrol et yaz. |
| l11 | 00:24.91 | Eksik araç varsa Claude senin onayınla kendisi kurar. |
| l12 | 00:27.71 | Beşinci adım, en eğlencelisi: tek bir satır yaz. |
| l13 | 00:30.17 | Mesela: yağmurda çay neden daha güzel, bunun reels’ini yap. |
| l14 | 00:33.03 | Senaryo, seslendirme, animasyon ve altyazı otomatik gelir. |
| l15 | 00:36.23 | Altıncı adım: beğenmediğin yeri söyle, Claude düzeltip render alsın. |
| l16 | 00:40.23 | Kullandığım prompt ve ayarlar için yorumlara REELS yaz. |

## Kendi sesini ekleme

- **Cümle cümle kayıt (tam senkron):** Kayıtları `public/vo/l01.wav … l16.wav` olarak koy, sonra `npm run fit && npm run all` çalıştır. Video senin konuşma hızına göre kendini ayarlar.
- **Tek parça kayıt:** `bash scripts/sesi-ekle.sh kayit.wav` komutuyla ekle.
- **Ayrı ses kanalı:** `out/ses_efektleri.wav`
