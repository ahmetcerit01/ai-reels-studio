# Google Haritalar'ın 5 Gizli Özelliği: Remotion Reels Projesi

1080×1920 · 30 fps · H.264 MP4 · React + TypeScript + Remotion 4. Ücretli API ya da yapay ses kullanılmıyor; ses efektleri kodla sentezleniyor (`scripts/make-sfx.py`).

## Çıktılar (`out/`)

| Dosya | İçerik |
|---|---|
| `tam-onizleme.mp4` | Seslendirmesiz tam önizleme (34 sn, ses efektli) |
| `ozellik-1-park.mp4` … `ozellik-5-zaman.mp4` | Her özellik ayrı bir video |
| `qa/Full-sheet.jpg` | Saniyede bir karelik kalite kontrol sayfası |

Dokümanlar: `docs/analiz.md` (referans analizi ve storyboard), `docs/seslendirme.md` (Türkçe VO metni), `docs/ekran-kayitlari.md` (senden gereken kayıtlar).

## Kurulum

```bash
npm install
npm run studio          # tarayıcıda canlı düzenleme (Remotion Studio)
```

## Klasör yapısı

```
public/
  camera/      giris.mp4, kapanis.mp4         ← senin kamera kayıtların
  recordings/  park.mp4, mesafe.mp4, cevrimdisi.mp4, paylas.mp4, zaman.mp4   ← ekran kayıtları
  streetview/  eski.jpg, yeni.jpg             ← Street View karşılaştırma görselleri
  vo/          park.wav, mesafe.wav, ...      ← bölüm bölüm seslendirme
  sfx/         whoosh, pop, tap, tick, success, shimmer, rise (.wav, özgün)
src/
  data/timeline.json   ← TEK ZAMANLAMA KAYNAĞI (süreler, altyazılar, adımlar, dokunmalar, zoomlar)
  theme.ts             ← renkler, fontlar, yerleşim, easing
  components/ui.tsx    ← altyazı, adım kartları, telefon + zoom, dokunma halkası, ses efektleri
  components/illustrations.tsx ← kayıt gelene kadar gösterilen özgün çizimler
  scenes/scenes.tsx    ← Giriş, Özellik, Zaman Yolculuğu, Kapanış sahneleri
  Video.tsx / Root.tsx ← kurgu ve kompozisyonlar (Full + Ozellik-1..5)
```

## Kendi kayıtlarını ekleme (birleştirme akışı)

```bash
# 1) Dosyaları yukarıdaki adlarla public/ altına koy
# 2) Süreleri ve altyazıları seslendirme/kamera uzunluklarına göre otomatik ayarla
npm run fit
# 3) Tam video + 5 özellik videosunu render et (ses ve kamera dahil)
npm run render:all
```

`npm run fit` her sahne için şunları yapar:
- `public/vo/<sahne>.wav|mp3|m4a` varsa sahne süresini *seslendirme + 0,35 sn* yapar.
- `public/camera/giris|kapanis.mp4` varsa giriş ve kapanış süresini kamera kaydına eşitler (sesi kameradan gelir).
- Ekran kayıtlarını ve Street View görsellerini otomatik bağlar.
- Adım, dokunma, zoom ve altyazı zamanlarını yeni süreye orantılı olarak ölçekler. Yedek: `src/data/timeline.backup.json`.

**Tek parça seslendirme** kullanırsan:

```bash
npm run render:full
bash scripts/merge.sh out/tam-onizleme.mp4 seslendirme.wav out/final.mp4   # ses efektleri korunur, VO -14 LUFS'a normalize edilir
```

## İnce ayar (`src/data/timeline.json`)

- `captions[].at`: Altyazı vuruşunun başladığı saniye. Boş bırakılırsa kelime sayısına göre otomatik dağıtılır.
- `steps[].at`: Adım kartının vurgulandığı an (seslendirmede adımı söylediğin an).
- `taps[]`: Ekran kaydındaki dokunma anı ve konumu (`x`, `y` ekranın 0–1 oranı). Halka ve tık sesi buradan çıkar; `hold: true` uzun basma demek.
- `zooms[]`: Telefon kamerası (`s` yakınlık, `x`, `y` odak noktası). Easing tek tip expo-out.
- `recordingStart`: Ekran kaydının kaçıncı saniyesinden başlanacağı (kırpma).
- `sfxVolume`, `voVolume`: Genel ses seviyeleri.

Ekran kaydını ekledikten sonra dokunma ve zoom zamanlarını kendi kaydına göre ayarla. Bunu en kolay `npm run studio` içinde kare kare ilerleyerek yaparsın.

## Kalite kontrol

```bash
npm run stills -- Full 1        # out/qa/Full-sheet.jpg  (her 1 sn'de bir kare)
```

## Notlar

- Fontlar (Inter, Inter Tight, Instrument Serif, JetBrains Mono) yerel `@fontsource` paketlerinden yükleniyor; render için internet gerekmez.
- Telefon içindeki çizimler Google arayüzünün kopyası değil. Ekran kaydı eklenince otomatik kaybolur ve "ÖRNEK ANİMASYON" etiketi de kalkar.
- Uygulamadaki Türkçe menü adlarını ("Park yeri olarak kaydet", "Daha fazla tarih" vb.) kendi kaydınla karşılaştır; farklıysa `timeline.json` içindeki `steps` ve `captions` metinlerini düzelt.
