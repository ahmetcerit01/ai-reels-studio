# Fable 5.2 ile 9 Motion Grafik: Rehber ve Promptlar

## Nasıl kullanılır? (3 adım)

1. **Modeli seç:** Claude'da model olarak **Fable 5.2**'yi seç.
2. **Promptu yapıştır:** Aşağıdaki promptlardan birini olduğu gibi gönder. Claude sana tek bir HTML dosyası verecek.
3. **Aç ve kaydet:** Dosyayı tarayıcıda aç; animasyon kendi kendine döngüde oynar. Ekran kaydıyla videoya çevir.

**İpuçları**
- Yatay video için "9:16 (1080x1920)" yazan yeri "16:9 (1920x1080)" yap.
- Kendi konunu anlatmak için "Konu" satırını ve ekrandaki yazıları değiştirmen yeterli; stil satırlarına dokunma.
- Sonuç tam istediğin gibi değilse aynı sohbette düzeltme iste: "daha yavaş", "renkleri daha sıcak yap", "başlığı büyüt" gibi.

---

## 01 · Kâğıt Kesme

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 8 saniyelik, döngüsel bir animasyon oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Stil: katmanlı kâğıt kesme (paper-cut) diorama. Her katman, altındaki katmana yumuşak bir gölge düşüren düz renkli bir kâğıt parçası; hafif kâğıt dokusu; lacivert ve krem tonlar, küçük kırmızı vurgular.
Sahne: gece. Yıldızlı lacivert gökyüzü, parlayan kâğıttan dolunay ve yavaşça kayan kâğıt bulutlar. Solda kayalık bir uçurumun üstünde kırmızı-beyaz çizgili bir deniz feneri; tepesindeki lamba parlıyor ve ışık hüzmesi sağa sola dönerek denizi tarıyor. Alt yarıda 5 kat kâğıt dalga, her biri farklı hız ve genlikte dalgalanıyor. Ortadaki dalganın üstünde kırmızı yelkenli küçük bir tekne, dalgayla birlikte iniş çıkış yapıp yalpalıyor.
Hareket: requestAnimationFrame ile akıcı, katmanlar arası paralaks, kusursuz döngü. Ekranda yazı olmasın. Yalnızca HTML dosyasıyla yanıt ver.
```

## 02 · 3D Veri Grafiği

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, döngüsel bir veri animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok. İstersen three.js'i cdnjs.cloudflare.com'dan yükleyebilirsin; bunun dışında dış kaynak yok.

Konu: "Yıllara göre gelir" (milyon ₺). 2021: 1,2 · 2022: 1,8 · 2023: 2,6 · 2024: 3,1 · 2025: 4,4.
Stil: koyu antrasit stüdyo zemini üzerinde 3 boyutlu, gerçekçi banknot desteleri. Her banknot açık yeşil-krem renkte, ortasında yeşil bir şerit ve altın bir mühür var. Zeminde hafif yeşil yansıma.
Hareket: banknotlar yukarıdan tek tek düşüp hafifçe sallanarak yerine otursun; her yılın destesi, değeriyle orantılı yüksekliğe ulaşana kadar üst üste yığılsın. Desteler soldan sağa sırayla oluşsun. Bir deste tamamlanınca üstünde değer etiketi belirsin ("4,4 Mn"). Arka planda birkaç banknot havada süzülsün. Sonda kısa bir bekleme, ardından kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```

## 03 · İzometrik

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 8 saniyelik, döngüsel bir anlatım animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Konu: "Çekirdekten fincana: bir kahvenin yolculuğu".
Stil: sıcak, minimal izometrik çizim. Krem zemin, 30 derecelik izometrik izdüşüm, kahverengi ve turuncu tonlar; her kutunun üç yüzü üç ayrı tonda.
Sahne: zikzak şekilde yukarıdan aşağı dizilmiş üç izometrik platform. (1) ÇİFTLİK: kırmızı kahve meyveleri yanıp sönen dört yeşil ağaç. (2) KAVURMA: turuncu silindir bir kavurma makinesi, tepesinden yükselen duman ve yanıp sönen küçük bir lamba. (3) FİNCAN: tabağın üstünde beyaz bir fincan, içinde köpüklü espresso ve kıvrılarak yükselen buhar. Platformları kesik çizgili bir yol birbirine bağlıyor ve bu yol boyunca kahve çekirdekleri dönerek akıyor.
Etiketler (monospace): "ÇİFTLİK · Etiyopya · 2.000 m", "KAVURMA · 220°C · 12 dk", "FİNCAN · 1 espresso · 30 ml". Platformlar sırayla esnek bir pop efektiyle belirsin. Üstte "Çekirdekten fincana" başlığı.
Hareket: requestAnimationFrame ile akıcı, kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```

## 04 · Synthwave

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, döngüsel bir animasyon oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Stil: 80'ler synthwave / retrowave. Mordan pembeye dönen bir gökyüzü ve titreşen yıldızlar.
Sahne: iki yanda yükselen neon bir kanyon koridoru. Duvarlar siyah; üzerlerinde ufka doğru uzanan pembe yatay çizgiler ve kameraya doğru akan camgöbeği dikey çizgiler var, hafif neon parlamalı. Koridorun tam sonunda, iki duvarın arasından görünen, sarıdan turuncuya ve pembeye geçen dev bir güneş var; alt yarısında aşağı kayan yatay şeritler. Zeminde perspektifli neon bir ızgara kameraya doğru akıyor. Ufuk çizgisinde pembe bir parlama.
Hareket: requestAnimationFrame ile, kesintisiz ileri akış hissi, kusursuz döngü. Ekranda yazı olmasın. Yalnızca HTML dosyasıyla yanıt ver.
```

## 05 · 3D Anlatım

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 8 saniyelik, döngüsel bir anlatım animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok. three.js'i cdnjs.cloudflare.com'dan yükleyebilirsin; bunun dışında dış kaynak yok.

Konu: "Güneş hücresi nasıl elektrik üretir?"
Stil: koyu lacivert, ortası hafif aydınlık bir stüdyo; sinematik, temiz, Apple tarzı ürün anlatımı.
Sahne: bir güneş hücresi, katmanlarına ayrılarak (patlatılmış görünüm) havada asılı duruyor. Yukarıdan aşağı katmanlar: yarı saydam Cam, parlak mavi N-tipi silikon, koyu mavi P-tipi silikon ve gümüş Arka kontak. Katmanlar önce bitişik duruyor, sonra yumuşakça birbirinden ayrılıyor. Her katmanın solunda ince bir çizgiyle bağlı bir etiket var. Yukarıdan sarı, parlayan fotonlar yağıp N-tipi katmana çarpıyor. N-tipi katmandan arka kontağa uzanan turuncu bir devre çizgisi var ve bu çizgi boyunca camgöbeği elektronlar akıyor. Devrenin altındaki ampul, elektronlar ulaştığında sıcak bir ışıkla yanıyor.
Hareket: kamera hafifçe dönsün, kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```

## 06 · Matematik Diyagramı

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 8 saniyelik, döngüsel bir matematik anlatım animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Konu: Pisagor teoremi. Başlık "PİSAGOR", alt başlık "İki küçük karenin alanı, büyüğüne eşittir".
Stil: 3Blue1Brown ile teknik çizim karışımı. Krem kareli kâğıt zemin, siyah net çizgiler, monospace rakamlar; küçük kareler turuncu, büyük kare açık gri.
Sahne: kenarları 3, 4 ve 5 birim olan, dik açısı işaretli beyaz bir dik üçgen. Sırayla şunlar olsun: 4'lük kenardan dışarı doğru turuncu bir kare büyüsün ve içi 4x4 birim kareli ızgarayla dolsun, ortasında "16" yazsın. Ardından 3'lük kenardan turuncu bir kare büyüsün ("9"). Son olarak hipotenüsten dışarı, 5x5 ızgaralı gri bir kare büyüsün ("25"). En sonda altta büyük harflerle "3² + 4² = 5²", altında turuncu "9 + 16 = 25" belirsin.
Hareket: her adım yumuşak easing ile, sonunda kısa bir bekleme ve kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```

## 07 · Çizgi Film Anlatım

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, döngüsel bir anlatım animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Konu: "Her gece ne kadar uyumalısın?" Bebek 15 sa · Çocuk 10 sa · Genç 9 sa · Yetişkin 8 sa.
Stil: Kurzgesagt ile sevimli çizgi film karışımı. Bej zemin, kalın siyah dış hatlar, düz ve canlı renkler, yuvarlak köşeler.
Sahne: üstte siyah çerçeveli, beyaz, yuvarlak köşeli bir kart; içinde kalın bir başlık ve dört renkli sütundan (mavi, yeşil, mor, turuncu-kırmızı) oluşan bir grafik. Sütunlar sırayla esnek bir zıplamayla yükseliyor, üstlerinde saat değerleri, altlarında yaş grupları yazıyor. Kartın altında kırmızı-turuncu, kare gövdeli uykulu bir karakter var: gözleri kapalı, yanakları pembe, başında ponponlu mavi bir gece şapkası. Karakter nefes alıp veriyor (gövdesi hafifçe şişip iniyor) ve başının üstünden mavi "z" harfleri süzülerek yükseliyor.
Hareket: requestAnimationFrame ile akıcı, kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```

## 08 · Domino Yazı

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, döngüsel bir animasyon oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok. İstersen three.js'i cdnjs.cloudflare.com'dan yükleyebilirsin; bunun dışında dış kaynak yok.

Konu: Newton'un 2. yasası. Üstte küçük "NEWTON · 2. YASA", altında "Her şey bir itişle başlar."
Stil: sıcak bej bir masa yüzeyi, yumuşak stüdyo ışığı, kenarlarda vinyet; minimal ve fotoğraf gerçekçiliğine yakın.
Sahne: "KUVVET" kelimesinin harf hatları boyunca dizilmiş yüzlerce kırmızı domino taşı ayakta duruyor. Küçük bir top ilk taşa çarpıyor ve zincirleme tepkiyle taşlar sırayla, yol yönünde devriliyor. Devrilen her taş krem/beyaz rengine dönüyor, böylece kelime adım adım ortaya çıkıyor. Taşların altında yumuşak gölgeler var. Kelime tamamlanınca altta kırmızı, monospace "F = m · a" ve "kuvvet = kütle × ivme" yazıları belirsin.
Hareket: hızlı ama okunaklı bir devrilme ritmi; sonda kısa bir bekleme, ardından taşlar ayağa kalkıp kusursuzca baştan başlasın. Yalnızca HTML dosyasıyla yanıt ver.
```

## 09 · Parlayan Atom

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, döngüsel bir bilim anlatım animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Konu: Magnezyum atomu. Sol üstte "Magnezyum", altında "Mg · atom numarası 12".
Stil: koyu lacivert, ortası hafif aydınlık bir uzay zemini; ışık saçan (glow) elektronlar ve ince yörüngeler; bilimsel ama sinematik.
Sahne: ortada kırmızı protonlar ve beyaz-gri nötronlardan oluşan, hafifçe titreşen bir çekirdek. Etrafında hafif eğik 3 yörünge var: ilkinde 2, ikincisinde 8 mavi parlayan elektron dönüyor; en dıştaki altın renkli yörüngede, birbirinin tam karşısında 2 turuncu, daha büyük ve daha parlak değerlik elektronu dönüyor. Bunlardan birini ince bir çizgiyle "2 değerlik elektronu" etiketi takip ediyor. Altta "ELEKTRON DİZİLİMİ" başlığı ve "2 · 8 · 2" yazısı var; son 2 turuncu. Açılışta yörüngeler merkezden büyüyerek beliriyor.
Hareket: requestAnimationFrame ile, her kabuk farklı hızda dönsün; kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```
