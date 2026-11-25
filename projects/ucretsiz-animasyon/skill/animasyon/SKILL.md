---
name: animasyon
description: Tek cümlelik bir konudan dikey (9:16) animasyonlu kısa video yazar ve HyperFrames ile render edilecek TEK bir index.html dosyası olarak teslim eder. Kullanıcı "animasyon yap", "bunun videosunu yap", "reels/short yap" dediğinde kullan.
---

# Animasyon skill'i (HyperFrames için tek dosya)

Görevin: kullanıcının verdiği konudan 20–40 saniyelik dikey bir animasyon tasarlamak ve bunu **tek bir `index.html` dosyası** olarak vermek. Kullanıcı bu dosyayı boş bir klasöre koyup terminalde şunu çalıştıracak:

```
npx hyperframes render -o video.mp4
```

(Gerekenler: Node.js 22+ ve FFmpeg. İkisi de ücretsiz.)

## 1. Önce kısa plan (sohbette, 5–8 satır)
- Kanca (ilk 2 sn), 4–6 sahne, kapanış. Her sahne tek fikir.
- Her sahnenin süresini saniye olarak yaz. Toplam 20–40 sn.
- Kullanıcı "direkt yap" dediyse planı gösterip hemen dosyayı yaz.

## 2. Dosya kuralları (HyperFrames sözleşmesi — bozma)
Bu iskeletten başla:

```html
<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #06070c; }
      #root { position: relative; width: 100%; height: 100%; font-family: Inter, sans-serif; color: #fff; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="30" data-width="1080" data-height="1920">
      <!-- sahneler: <div id="s1" class="clip" data-start="0" data-duration="4" data-track-index="0">…</div> -->
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
      // tl.fromTo("#s1-baslik", { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, 0.1);
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
```

- Tek dosya: `index.html`. Harici resim, video, ses ya da ağ isteği yok (yalnızca yukarıdaki GSAP betiği); her şey HTML/CSS/SVG ile çizilir.
- Kök öğe:
  `<div id="root" data-composition-id="main" data-start="0" data-duration="TOPLAM" data-width="1080" data-height="1920">`
- Zamanlı her öğe: `class="clip"`, benzersiz `id`, `data-start` ve `data-duration` (saniye), `data-track-index`. Öğe `[start, start+duration)` aralığında görünür; son hâlini bitişten biraz önce yerleştir.
- Animasyon GSAP ile: tek bir duraklatılmış zaman çizelgesi kur, bütün tween'leri ekle, en sonda `window.__timelines["main"] = tl;` ile kaydet.
- Sahneler arka arkaya aynı şeritte (`data-track-index="0"`); üstteki kartlar ve altyazılar sonraki şeritlerde. Üst üste binen iki öğe aynı şeritte olmasın.
- `fromTo` kullan (`from` değil). `.clip` öğesinin kendisini değil, içindeki çocuğu canlandır. GSAP'in dönüştürdüğü öğeye CSS `transform` verme; `left/top/width/height` yerine `x/y/scale` canlandır.
- Yasak: `Date.now()`, tohumsuz `Math.random()`, `setTimeout/setInterval`, `repeat: -1`, `fetch`. Rastgelelik gerekiyorsa sabit tohumlu basit bir üreteç yaz.
- Fontlar: yalnızca HyperFrames'in hazır fontları. Başlık ve metin için **Inter** (700/900), vurgu için **Playfair Display** italik, kod/sayı için **JetBrains Mono**.
- Güvenli alan: bütün yazılar y 288–1248 px ve x 120–888 px aralığında kalsın (Instagram/TikTok/Shorts arayüzü kapatmasın).
- Video sessiz olabilir; ses istenirse kullanıcı sonradan ekler. Kendi başına müzik dosyası ekleme.

## 3. Görsel tema (değişmez — konu ne olursa olsun bunu koru)
- Zemin `#06070c`; birkaç soluk halka ve sabit konumlu küçük yıldız noktaları; ortada çok hafif mor-gri radyal ışık.
- Vurgu rengi bakır: `#e8875c` ve `#f2a679`; bakır zemin üstünde koyu metin `#160d08`. Neon, lacivert veya elektrik mavisi kullanma.
- Başlık sistemi: üstte küçük, harf aralıklı bakır etiket (✳ ile), altında büyük kalın beyaz başlık (Inter 900) ve yanında italik bakır vurgu kelimesi (Playfair Display italik).
- Kartlar: koyu cam — `rgba(255,255,255,.045)` dolgu, `rgba(255,255,255,.10)` kenar, 28–36 px köşe.
- Altyazı: ekranın alt-ortasında iki satır; üst satır kalın beyaz, alt satır italik bakır. Kelimeler sırayla belirir.
- Son sahnede yorum hapı: "Yorumlara [KELİME] yaz" — kelime daktilo efektiyle yazılır. Final kararmaz, son kare tam görünür kalır.

## 4. Ritim
- İlk 2 saniyede güçlü görsel: büyük başlık "çarpma" (ölçek 1.3→1, 0.25 sn, `back.out`), ardından içerik.
- Her 2–3 saniyede anlamlı bir değişim: kart açılması, sayı sayacı, tik işareti, karşılaştırma.
- Geçişler 0.3–0.5 sn; giriş `power3.out`, çıkış `power2.in`.

## 5. Doğruluk
- Fiyat, tarih, istatistik gibi bilgileri uydurma. Emin değilsen ekranda "örnek" diye etiketle ya da kullanıcıya sor.
- Telifli karakter, logo veya marka görseli çizme; marka adları düz metin olarak geçebilir.

## 6. Teslim
1. Kısa plan (madde madde).
2. `index.html` dosyası (indirilebilir dosya olarak oluştur).
3. Kullanıcıya şu üç satırı yaz:
   - Boş bir klasör aç, `index.html`'i içine koy.
   - O klasörde terminali aç: `npx hyperframes render -o video.mp4`
   - Önizleme ve düzenleme için: `npx hyperframes preview`
4. Teslimden önce kendi kontrolün: her `.clip` öğesinin id/start/duration değerleri var mı, en geç biten öğe kökün `data-duration` değerini aşıyor mu, zaman çizelgesi `window.__timelines["main"]` olarak kaydedildi mi?
