# Claude ile 1 Saatlik Çizgi Film: Tutarlı Prompt Seti

**Seri:** *Fındık ve Kayıp Ay Feneri*, çocuklar için sakin bir uyku masalı.
Videodaki her kare bu setle aynı karakteri, aynı paleti ve aynı stili kullanıyor.

## Tutarlılığın anahtarı

1. **Prompt 1'i (Seri Kitabı) yalnızca bir kez çalıştır.** Çıkan `seri-kitabi.md` ve `findik.js` dosyalarını sakla.
2. Sonraki **her** prompta bu iki dosyayı ekle (Claude Projects kullanıyorsan proje dosyası olarak yükle). Karakteri asla yeniden tarif ettirme; hep aynı `findik.js` içindeki `drawFox()` fonksiyonu kullanılsın.
3. Renkleri, ölçüleri ve stil kurallarını promptlarda **değiştirme**. Değişen tek şey sahnenin içeriği olsun.
4. Her sahne aynı tuval boyutunda (1920×1080), aynı kâğıt dokusuyla ve aynı ışık mantığıyla üretilsin.

---

## 1) Seri Kitabı + Karakter (bir kez)

```
Çocuklar için sakin bir uyku masalı çizgi film serisi hazırlıyoruz. Serinin adı "Fındık ve Kayıp Ay Feneri". Önce bir SERİ KİTABI ve tek bir karakter dosyası oluştur; sonraki tüm sahneler bunlara birebir uyacak.

KARAKTER: Fındık, meraklı ve nazik küçük bir tilki.
- Renkler (değişmez): gövde #e8743b, gölge #c95d29, göğüs/ağız/kuyruk ucu krem #fff1dd, kulak uçları ve patiler koyu kahve #4a2a1c, göz #2a1a14, hardal atkı #f2bd3e (kıvrımı #d99a1f), fener ışığı #f6c453.
- Oranlar: kafa gövdeden büyük (yaklaşık 1:1,1), iri ve yuvarlak gözler, büyük üçgen kulaklar, gövde kadar büyük ve kabarık bir kuyruk.
- Ayırt edici öğeler: hardal atkısı ve elinde taşıdığı küçük pirinç fener. Her sahnede ikisi de görünür.
- Pozlar: ön, 3/4, yan (yürüme döngüsü), arka, mutlu (gözler kapalı gülümseme, kollar havada), oturma, uyuma (kıvrılmış).

STİL (değişmez): düz renkli masal kitabı çizimi, kontur çizgisi yok, yumuşak geçişli gökyüzleri, tüm karenin üstünde %7 opaklıkta sıcak kâğıt dokusu (multiply), ışık kaynakları (ay, fener, pencere) yumuşak radyal parıltıyla.
PALET: lila gece #1b2150 → #4b4f96, sonbahar turuncuları #e9a35a / #d9812f / #c2601f, krem #fff1dd, ay #fff3d0.
HAREKET: yavaş ve sakin; nefes alma sallanması, kuyruk salınımı, göz kırpma, ani hareket yok.

ÇIKTILAR:
1) seri-kitabi.md: karakter, palet, stil kuralları, yasaklar ("kontur çizme", "palet dışı renk kullanma", "karakter oranını değiştirme").
2) findik.js: canvas 2D ile drawFox(ctx, x, y, olcek, { poz, t, fener, parilti }) fonksiyonu. Yukarıdaki tüm pozları çizsin; t zamanına göre nefes, kuyruk ve göz kırpma animasyonu olsun.
3) karakter-sayfasi.html: 5 pozu (Ön, 3/4, Yan, Arka, Mutlu) yan yana gösteren, findik.js kullanan bir karakter sayfası.
```

---

## 2) Bölüm Senaryosu ve Sahne Listesi

```
Ekteki seri-kitabi.md'ye birebir uyarak 60 dakikalık 1. bölümün senaryosunu yaz: "Fındık ve Kayıp Ay Feneri".

Konu: Fındık, ormandaki yuvasının penceresinden ayın her gece biraz daha soluklaştığını fark eder. Ay fenerini bulmak için önce sonbahar ormanından geçer, sonra gece denizinde küçük bir tekneyle yol alır, yıldızlı tepeye çıkar ve sonunda yuvasına dönüp uyur.
Ton: sakin, sıcak, çatışmasız; tekrar eden yumuşak cümleler, çocuğun uykuya dalmasına yardım eden ritim.

ÇIKTI (sahneler.json): 120 sahne. Her sahne için:
- id (sahne-001 …), mekân (yalnızca: yuva, sonbahar-ormani, gece-denizi, yildizli-tepe), gün/gece, süre (saniye; toplam 3600 sn)
- kamera (sabit / yavaş kaydırma / yavaş yakınlaşma), Fındık'ın pozu ve hareketi, fener açık/kapalı
- anlatıcı metni (Türkçe, sakin), ortam sesi notu
Mekân ve pozlar seri kitabındaki listenin dışına çıkmasın.
```

---

## 3) Sahneyi Kodla Çiz (her sahne için aynı şablon)

```
Ekteki seri-kitabi.md ve findik.js'i kullanarak sahneler.json içindeki [SAHNE-ID] sahnesini tek parça bir HTML dosyası olarak çiz.

Kurallar:
- 1920×1080 tuval; pencereye sığacak şekilde ölçeklensin, dışı siyah. Her şey canvas 2D ile kodla çizilsin; görsel ya da harici dosya yok.
- Fındık'ı YALNIZCA findik.js içindeki drawFox() ile çiz; renk, oran ya da şekil değiştirme.
- Mekânı seri kitabındaki palet ve stil kurallarıyla çiz: düz renk, kontur yok, %7 kâğıt dokusu, ışık kaynaklarında radyal parıltı.
- En az 3 katman paralaks; her an hareket eden küçük detaylar (yaprak, yıldız, dalga, ateşböceği).
- Sahne süresi sahneler.json'daki süreye eşit olsun; requestAnimationFrame ile, ve window.renderAt(saniye) fonksiyonu ile her karesi deterministik çizilebilsin (kare kare kayıt için).
Yalnızca HTML dosyasıyla yanıt ver.
```

> İpucu: `[SAHNE-ID]` kısmını değiştirerek sahneleri sırayla üret. Aynı mekândaki sahneler için bir öncekinin HTML'ini de ekle ve "aynı mekân çizimini koru" de.

---

## 4) Anlatıcı ve Ses

```
Ekteki sahneler.json'a göre 1. bölümün ses planını hazırla.

1) anlatim.srt: her sahnenin anlatıcı metni, sahne sürelerine oturan zaman kodlarıyla.
2) ses-plani.md: üç katman.
   - Anlatıcı: sakin, sıcak, masal okuyan bir ses; dakikada yaklaşık 120 kelime; cümle aralarında 0,6 sn nefes.
   - Müzik: yumuşak ninni; piyano ve çelesta, 60–70 BPM; sahne geçişlerinde 2 sn crossfade.
   - Ortam: her mekân için ayrı döngü (orman: rüzgâr + yaprak, deniz: dalga + gıcırdayan tekne, tepe: cırcır böceği, yuva: çıtırdayan lamba).
3) Ses seviyeleri: anlatıcı -16 LUFS, müzik anlatıcının 14 dB altında, ortam 18 dB altında.
Seslendirmeyi kendi sesimle kaydedeceğim; yapay ses üretme, yalnızca metin ve plan ver.
```

---

## 5) Düzenleme: "gece yap"

```
Ekteki [SAHNE-ID].html sahnesini değiştir: gece yap.
Kompozisyon, kamera, Fındık'ın pozu ve hareketi birebir aynı kalsın. Yalnızca şunlar değişsin:
- Gökyüzü #1c2150 → #3a3572 gradyanına geçsin, yıldızlar ve ay belirsin.
- Ağaç tonları seri kitabındaki gece paletine kaysın (#2e2a5a / #272350 / #211d45).
- Düşen yapraklar yerine yanıp sönen ateşböcekleri gelsin.
- Ağaç evin penceresi ve Fındık'ın feneri sıcak #f6c453 ışıkla yansın.
Gece ve gündüz arasında 1 saniyelik yumuşak bir geçiş isteğe bağlı olarak açılıp kapatılabilsin.
```

---

## 6) Birleştir ve Dışa Aktar

```
Ekteki sahne HTML dosyalarını ve sahneler.json'u kullanarak 1. bölümü tek bir videoya dönüştürecek bir Node.js betiği yaz.

- Her sahneyi Playwright ile aç, window.renderAt(saniye) ile 30 fps kare kare kaydet (1920×1080).
- Kareleri ffmpeg ile H.264 MP4'e çevir; sahne aralarına 0,5 sn çapraz geçiş koy.
- anlatim.srt'yi isteğe bağlı altyazı olarak göm; ses dosyalarını (anlatim.wav, muzik.wav, ortam.wav) ses-plani.md'deki seviyelerle karıştır.
- Çıktı: findik-bolum-1.mp4 (60:00) ve YouTube için kapak görseli (1280×720; Fındık feneriyle gece denizinde, başlık "Fındık ve Kayıp Ay Feneri · Bölüm 1").
```
