# Ücretsiz animasyonlu video: 3 adım

AI video aracına abonelik yok, kredi yok. Videoyu Claude kodla yazar, senin bilgisayarın render eder.

## 1. Programları kur (ücretsiz)
- **Node.js 22 veya üstü:** nodejs.org → LTS sürümünü indir, kur.
- **FFmpeg:**
  - Mac: `brew install ffmpeg`
  - Windows: `winget install Gyan.FFmpeg`
  - Linux: `sudo apt install ffmpeg`
- Kontrol: terminalde `node -v` ve `ffmpeg -version` çalışıyorsa tamam.

## 2. Skill'i Claude'a ekle (ücretsiz plan yeterli)
1. claude.ai → **Ayarlar → Yetenekler**: "Kod çalıştırma ve dosya oluşturma" açık olsun (ücretsiz planda varsayılan olarak açık).
2. **Özelleştir → Skills → Skill yükle**: `animasyon-skill.zip` dosyasını seç.
   - Zip'i açma, olduğu gibi yükle. İçinde `animasyon/SKILL.md` var.

## 3. Konunu tek cümleyle yaz
Yeni sohbet aç ve şöyle yaz:

```
Animasyon skill'ini kullan: Yağmurda çay neden daha güzel? Kısa bir animasyon yap.
```

Claude önce kısa bir sahne planı yazar, sonra sana indirilebilir tek bir **index.html** dosyası verir.

## 4. Tek komutla videoya çevir
1. Boş bir klasör aç (ör. `video`) ve `index.html`'i içine koy.
2. O klasörde terminali aç ve şunu çalıştır:

```
npx hyperframes render -o video.mp4
```

İlk seferde gerekli paketleri indirir, bu yüzden birkaç dakika sürebilir. Bittiğinde `video.mp4` klasörde olur.

İstersen önce önizle ve düzenle: `npx hyperframes preview`

## Düzeltmek için Claude'a yazabileceklerin
- `Daha hızlı olsun, sahneleri 2 saniyeye indir.`
- `İlk sahnedeki başlığı büyüt.`
- `Son sahnede "Yorumlara ÇAY yaz" olsun.`
- `Şu sahneyi çıkar, yerine bir karşılaştırma kartı koy.`

Sonra yeni `index.html` ile aynı komutu tekrar çalıştır.

## Bilmen gerekenler
- Pixar kalitesi değil: 2D, kodla çizilmiş hareketli grafikler. Ama ücretsiz ve dosyalar tamamen senin.
- HyperFrames açık kaynaktır (Apache 2.0). Render senin bilgisayarında olur; ilk kurulum için internet gerekir.
- Ses ve müzik eklemek istersen videoyu herhangi bir uygulamada üstüne ekleyebilirsin.
