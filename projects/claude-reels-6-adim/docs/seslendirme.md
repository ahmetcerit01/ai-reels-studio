# Seslendirme Metni ve Zaman Kodları (47,5 sn)

Ekrandaki altyazılar bu metinle birebir aynı. SRT: `docs/seslendirme.srt`

| # | Zaman | Metin |
|---|---|---|
| l01 | 00:00.05 | Herkes şu an Claude ile animasyonlu reels yapıyor. |
| l02 | 00:03.09 | Ama kimse nasıl yapıldığını göstermiyor. |
| l03 | 00:05.03 | Bu reels’ler de tam olarak böyle yapıldı. |
| l04 | 00:07.64 | Birinci adım: Claude masaüstü uygulamasını indir. |
| l05 | 00:10.16 | Tarayıcıdaki sürüm değil, uygulama. |
| l06 | 00:12.28 | İkinci adım: bir klasör aç, adını AI Video Editörü koy. |
| l07 | 00:15.16 | Bütün dosyalar ve reels’ler burada duracak. |
| l08 | 00:17.78 | Üçüncü adım: yeni bir Claude Code sohbeti aç, Yerel’i seç ve o klasörü göster. |
| l09 | 00:21.60 | Artık Claude dosyalarını okuyup yazabiliyor. |
| l10 | 00:24.54 | Dördüncü adım: kurulumumu kontrol et yaz. |
| l11 | 00:26.88 | Eksik bir araç varsa, Claude senin onayınla kendisi kurar. |
| l12 | 00:30.24 | Beşinci adım, en eğlencelisi: tek bir satır yaz. |
| l13 | 00:32.75 | Mesela: yağmurda çay neden daha güzel, bunun videosunu yap. |
| l14 | 00:35.72 | Senaryo, seslendirme, animasyon ve altyazı otomatik gelir. |
| l15 | 00:39.11 | Altıncı adım: beğenmediğin yeri söyle, Claude düzeltip videoyu çıkarsın. |
| l16 | 00:43.11 | Kullandığım prompt ve ayarlar için yorumlara REELS yaz. |

## Kendi sesini ekleme

- **Cümle cümle kayıt (tam senkron):** Kayıtları `public/vo/l01.wav … l16.wav` olarak koy, sonra `npm run fit && npm run all` çalıştır. Video senin konuşma hızına göre kendini ayarlar.
- **Tek parça kayıt:** `bash scripts/sesi-ekle.sh kayit.wav` komutuyla ekle.
- **Ayrı ses kanalı:** `out/ses_efektleri.wav`

## Klon sesli sürüm (`out/claude_reels_6_adim_sesli.mp4`, 47,5 sn)

- **Model ve ses:** Chatterbox Multilingual (MIT lisansı, yerelde çalıştırıldı), senin ses örneğinin klonu.
- **Ayar:** Yapmacık olmasın diye ifade gücü 0.55–0.65 (önceki videolarda 0.8'di).
- **Yazım:** Marka adları İngilizce yazıldı (Claude, Claude Code, reels). "render" kelimesi "blender" diye okunduğu için cümle "videoyu çıkarsın" yapıldı.
- **İşleme:** Cümleler kelime sınırlarından kesildi. %5 hızlandırma, bozulan cümlelerde normal hız kullanıldı. Karışım -14 LUFS.
- **Bilinen küçük kusurlar:** "tek bir satır" sonundaki r zayıf; "kurar" sonu ve "AI" okunuşu yumuşak. Gerekirse sadece o cümleler yeniden üretilir.
- **Not:** Chatterbox duyulmayan bir filigran (Perth) ekler.
