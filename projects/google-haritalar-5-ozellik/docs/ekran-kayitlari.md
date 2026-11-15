# Senden Gereken Kayıtlar (çekim listesi)

Bu ortamdan Google Haritalar uygulamasını kontrol edemiyorum. Google'ın web arayüzü de otomasyon tarayıcısına izin vermiyor ve bu engeli aşmadım. Bu yüzden önizlemede telefonun içinde **"ÖRNEK ANİMASYON"** etiketli, özgün stilize çizimler var; Google arayüzünü taklit etmiyorlar. Aşağıdaki kayıtları ekleyince çizimlerin yerini otomatik olarak gerçek ekranların alır.

## Genel ayarlar

- **Telefon:** Dikey ekran kaydı (iOS: Denetim Merkezi → Ekran Kaydı · Android: Hızlı Ayarlar → Ekran kaydedici)
- **Format:** MP4 veya MOV, mümkünse 1080p ve 60 fps. Proje kaydı otomatik olarak 30 fps'e uyarlar.
- **Temizlik:** Bildirimleri kapat (Rahatsız Etme), pil yüzdesi yüksek olsun, saat 09:41 gibi temiz bir değer olabilir.
- **Uygulama:** Google Haritalar dili Türkçe ve uygulama güncel sürüm olsun.
- **Hareket:** Her dokunuştan önce yarım saniye bekle; hızlı ama sakin hareket et (kurgu zaten hızlandırıyor).
- **Gizlilik:** Ev ya da iş adresin görünmesin; konum olarak halka açık bir yer seç (ör. Kadıköy, Taksim).

| Dosya adı (`public/recordings/`) | Süre | Çekilecek adımlar |
|---|---|---|
| `park.mp4` | 6–8 sn | Haritada mavi konum noktası görünür → **mavi noktaya dokun** → **"Park yeri olarak kaydet"** (iOS'ta "Park yeri olarak ayarla" olabilir) → haritada P işareti → P'ye dokunup not/süre ekranını göster |
| `mesafe.mp4` | 6–8 sn | Boş bir noktaya **basılı tut** (kırmızı raptiye) → alttaki kartı yukarı kaydır → **"Mesafeyi ölç"** → haritayı kaydırarak ikinci noktaya götür → **"+"** ile bir nokta ekle → alttaki toplam mesafe |
| `cevrimdisi.mp4` | 7–9 sn | Sağ üstte **profil fotoğrafı** → **"Çevrimdışı haritalar"** → **"Kendi haritanı seç"** → mavi çerçeveyi ayarla → **"İndir"** → indirme başladı ekranı |
| `paylas.mp4` | 7–9 sn | Bir hedefe **navigasyonu başlat** → alttaki paneli yukarı çek → **"Yolculuk ilerlemesini paylaş"** → bir kişi seç (gerçek kişi istemiyorsan seçim ekranında bekle) |
| `zaman.mp4` | 5–7 sn | Street View'i aç (konum fotoğrafına ya da sarı adama) → **ekrana dokun** → bilgi kartında **"Daha fazla tarih"** (ya da "Daha fazla tarih göster") → yıl şeridini göster |

## Zamanda yolculuk görselleri (`public/streetview/`)

- **Aday konum:** **Taksim Meydanı, AKM cephesi** (İstanbul). 2013–2019 arasında AKM yıkıldı ve yeniden yapıldı, Taksim Camii inşa edildi; fark çok belirgin olur.
- **Doğrulama (zorunlu):** Kayıt sırasında **"Daha fazla tarih"** şeridinde eski yılların gerçekten listelendiğini kontrol et. Bu ortamdan Google'a otomatik erişimim olmadığı için ben doğrulayamadım. Konum ve yıllar `timeline.json` içinde değiştirilebilir.
- **Ekran görüntüleri:** Aynı noktadan, aynı açıyla iki görüntü al:
  - `eski.jpg`: en eski yıl (ör. 2014)
  - `yeni.jpg`: en güncel yıl (ör. 2024)
  - Görüntüleri dikeyde çekip üstteki ve alttaki arayüz şeritlerini kırpman yeterli; karşılaştırma kartı görseli `cover` olarak yerleştirir.
- Yılları `src/data/timeline.json` içindeki `yearOld` / `yearNew` alanlarına, konum adını `location` alanına yaz.

## Kamera kayıtları (`public/camera/`)

| Dosya | Süre | Not |
|---|---|---|
| `giris.mp4` | ~4 sn | Dikey 1080×1920, yüz kadrajın üst yarısında olsun (alt üçte bir altyazıya ayrılıyor). Kancayı bu kayıtta söyle. |
| `kapanis.mp4` | ~3 sn | Yüz üst yarıda olsun; alt yarıya "YORUMLARA YAZ / HARİTA" kartı biniyor. |

Dosyaları koyduktan sonra şunları çalıştır: `npm run fit && npm run render:all`.
