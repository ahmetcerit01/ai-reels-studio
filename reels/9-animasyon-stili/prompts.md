# 9 Animasyon Stili: Promptlar

Her promptu olduğu gibi Claude'a yapıştır. Çıktı, tarayıcıda açınca kendi kendine oynayan tek bir HTML dosyası olur.
Ekran kaydı alıp reels'e koyabilirsin. Her promptta yatay video için 9:16 yerine 16:9 (1920x1080) yazman yeterli.

---

## 01 · İzometrik

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 8 saniyelik, döngüsel bir anlatım animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Konu: "İnternet nasıl çalışır? Bölüm 1: Altyapı".
Stil: temiz izometrik çizim. Krem rengi zemin (#efe6d2), 30 derecelik izometrik izdüşüm, her kutunun üst, sağ ve sol yüzü üç ayrı tonda boyanmış; yumuşak, pastel, minimal.
Sahne: krem bir platformun üzerinde, cam duvarlı bir veri merkezi. İçinde 6 koyu gri sunucu rafı var, raflar sırayla yerden yükselerek beliriyor ve ön yüzlerinde yeşil LED'ler yanıp sönüyor. Soldaki bir kuleden çıkan mavi fiber kablo veri merkezine bağlanıyor ve kablo boyunca turuncu, parlayan veri darbeleri akıyor. Etrafta birkaç küçük küp yavaşça yüzüyor.
Etiketler: ince çizgilerle bağlanmış, monospace yazılmış "FİBER OPTİK KABLO ~200.000 km" ve "VERİ MERKEZİ · 6 sunucu rafı". Sol üstte kalın bir başlık.
Hareket: requestAnimationFrame ile akıcı; hafif yukarı aşağı salınım, her an bir şey hareket etsin, kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```

## 02 · Kâğıt Kesme

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 8 saniyelik, döngüsel bir animasyon oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Stil: katmanlı kâğıt kesme (paper-cut) diorama. Her katman, altındaki katmana yumuşak bir gölge düşüren düz renkli bir kâğıt parçası; hafif kâğıt dokusu; lacivert ve krem tonlar, küçük kırmızı vurgular.
Sahne: gece. Yıldızlı lacivert bir gökyüzü, kâğıttan dolunay ve yavaşça kayan kâğıt bulutlar. Solda kayalık bir uçurumun üzerinde kırmızı-beyaz çizgili bir deniz feneri var; tepesindeki lamba parlıyor ve ışık hüzmesi sağa sola dönerek denizi tarıyor. Alt yarıda 5 kat dalga, her biri farklı hız ve genlikte sinüs eğrisiyle dalgalanıyor. Ortadaki dalganın üstünde kırmızı yelkenli küçük bir tekne, dalgayla birlikte iniş çıkış yapıp yalpalıyor.
Hareket: requestAnimationFrame ile akıcı, katmanlar arası paralaks, kusursuz döngü. Ekranda yazı olmasın. Yalnızca HTML dosyasıyla yanıt ver.
```

## 03 · 3D Veri Grafiği

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, döngüsel bir veri animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok. İstersen three.js'i cdnjs.cloudflare.com'dan yükleyebilirsin; bunun dışında dış kaynak yok.

Konu: "Yıllara göre gelir" (milyon ₺). 2021: 1,2 · 2022: 1,8 · 2023: 2,6 · 2024: 3,1 · 2025: 4,4.
Stil: koyu lacivert-antrasit stüdyo zemini üzerinde, 3 boyutlu ve hacimli sütunlar. Sütunlar krem renkli, üst üste dizilmiş banknot destesi gibi katmanlı ve aralarında ince turuncu şeritler var. Yan yüzleri koyu turuncu, üst yüzleri açık. Zeminde hafif yansıma, arkada soluk yatay kılavuz çizgileri.
Hareket: sütunlar soldan sağa sırayla, yumuşak bir easing ile yerden büyüsün; üstlerindeki değer etiketleri 0'dan sayarak gerçek değere ulaşsın. Ardından sağ altta yeşil bir "▲ %267 büyüme" rozeti belirsin. Kamera hafifçe sağa sola süzülsün. Sonra her şey sıfırlanıp kusursuz şekilde baştan başlasın. Yalnızca HTML dosyasıyla yanıt ver.
```

## 04 · Synthwave

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, döngüsel bir animasyon oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Stil: 80'ler synthwave / retrowave. Mor ve laciverten ufukta pembeye dönen bir gökyüzü, titreşen yıldızlar. Ufkun tam ortasında sarıdan turuncuya, oradan pembeye geçen dev bir güneş var; alt yarısında aşağı doğru kayan yatay şeritler.
Sahne: ufka doğru uzanan, perspektifli neon bir tel kafes (wireframe) arazi. Yatay çizgiler pembe, derinlik çizgileri camgöbeği. Ortada düz bir vadi, iki yanda yükselen tel kafes dağlar. Kamera sürekli ileri doğru akıyor. Çizgilerin altı siyahla dolu ki arkadaki dağlar gizlensin. Ufuk çizgisinde pembe bir parlama.
Hareket: requestAnimationFrame ile akıcı, kesintisiz ileri akış, kusursuz döngü. Ekranda yazı olmasın. Yalnızca HTML dosyasıyla yanıt ver.
```

## 05 · 3D Anlatım

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 8 saniyelik, döngüsel bir anlatım animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok. three.js'i cdnjs.cloudflare.com'dan yükleyebilirsin; bunun dışında dış kaynak yok.

Konu: "Güneş paneli nasıl elektrik üretir? Işıktan elektriğe, adım adım."
Stil: Apple ürün tanıtımı havasında, karanlık stüdyo. Tepeden vuran tek bir spot ışığı, parlak siyah zemin, yumuşak gölgeler, sinematik ve sade.
Sahne: ortada ayakların üzerinde eğik duran, mavi hücreli ve gümüş çerçeveli bir güneş paneli. Sol üstten sarı ışık çizgileri (fotonlar) panele yağıyor; çarptıkları hücreler bir dalga halinde aydınlanıyor. Panelden çıkan kablo boyunca camgöbeği, parlayan elektronlar akıyor ve bir bataryaya ulaşıyor. Bataryanın yeşil şarj göstergesi doluyor ve yüzdesi artıyor.
Altta ilerleme çubuklu, sırayla değişen adım yazıları: "01 · Işık hücreye çarpar", "02 · Elektronlar serbest kalır", "03 · Akım bataryayı doldurur". Üstte ortalanmış, kalın bir başlık.
Hareket: kamera yavaşça yörüngede dönsün, kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```

## 06 · Matematik Diyagramı

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 8 saniyelik, döngüsel bir matematik anlatım animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Konu: Öklid'in asalların sonsuzluğu ispatı. Başlık: "BİR ASAL ÇARPAN EKSİK." Üstünde küçük harflerle "TEOREM · ÖKLİD".
Stil: 3Blue1Brown ile teknik çizim karışımı. Krem kareli kâğıt zemin, siyah ince çizgiler, monospace rakamlar, tek vurgu rengi olarak turuncu; sarı-siyah uyarı şeridi detayı.
Sahne: 2, 3, 5, 7, 11, 13 asal sayıları çemberler içinde. Her çemberin etrafında turuncu bir halka sırayla dolsun, aralarında "×" işaretleri belirsin. Ardından "2·3·5·7·11·13 + 1" ifadesi yazılsın, bir kutunun içinde "= 30031" sayısı 0'dan sayarak gelsin. Son olarak turuncu bir kutuda "= 59 × 509" ortaya çıksın ve altta "Listede olmayan yeni asallar → asallar sonsuzdur" notu belirsin.
Hareket: adımlar yumuşak easing ile, sonunda kısa bir bekleme ve kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```

## 07 · Çizgi Film Anlatım

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, döngüsel bir anlatım animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Konu: "Dünya yüzeyinin %71'i su."
Stil: Kurzgesagt ile sevimli çizgi film karışımı. Bej zemin, kalın siyah dış hatlar, düz renkler, yuvarlak ve dostane şekiller.
Sahne: üstte siyah çerçeveli, beyaz, yuvarlak köşeli bir kart. İçinde "Dünya yüzeyinin" başlığı ve mavi bir halka (donut) grafik var; grafik %0'dan %71'e dolarken ortadaki yüzde sayısı da artıyor. Mavi dolgunun içinde dalgalanan ince su çizgileri olsun. Altta kırmızı-turuncu, kare gövdeli sevimli bir karakter var: büyük gözlü, gözleri parıltılı, ağzı açık, ince kolları ve bacakları olan. Karakter ezilip uzayarak (squash & stretch) zıplıyor, bir kolunu sallıyor ve ara sıra göz kırpıyor. Yanında "Çoğu su!" yazan bir konuşma balonu esnek bir pop efektiyle beliriyor.
Hareket: requestAnimationFrame ile akıcı, kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```

## 08 · Domino Yazı

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, döngüsel bir animasyon oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok. İstersen three.js'i cdnjs.cloudflare.com'dan yükleyebilirsin; bunun dışında dış kaynak yok.

Stil: sıcak bej bir masa yüzeyi, yumuşak stüdyo ışığı, kenarlarda vinyet; fotoğraf gerçekçiliğine yakın, minimal.
Sahne: "FİZİK" kelimesinin harf hatları boyunca dizilmiş yüzlerce kırmızı domino taşı ayakta duruyor. Küçük bir top ilk taşa çarpıyor ve zincirleme tepkiyle taşlar sırayla, yol yönünde devriliyor. Devrilen her taş krem/beyaz rengine dönüyor, böylece kelime devrilen taşlarla adım adım ortaya çıkıyor. Taşların altında yumuşak gölgeler var. Tüm kelime belirince altta kırmızı "FİZİK" yazısı ve "her şey bir itişle başlar" alt yazısı beliriyor. Üstte "Bir dokunuş, zincirleme tepki." başlığı.
Hareket: devrilme ritmi hızlı ama okunaklı olsun; sonda kısa bir bekleme, ardından taşlar ayağa kalkıp kusursuzca baştan başlasın. Yalnızca HTML dosyasıyla yanıt ver.
```

## 09 · Parlayan Atom

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, döngüsel bir bilim anlatım animasyonu oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Konu: Sodyum atomu. Sol üstte "Sodyum", altında "Na · atom numarası 11".
Stil: koyu lacivert, ortası hafif aydınlık bir uzay zemini; ışık saçan (glow) elektronlar ve ince yörüngeler; bilimsel ama sinematik.
Sahne: ortada kırmızı protonlar ve beyaz-gri nötronlardan oluşan, hafifçe titreşen bir çekirdek. Etrafında hafif eğik 3 yörünge var: ilkinde 2, ikincisinde 8 mavi parlayan elektron dönüyor; en dıştaki altın renkli yörüngede tek bir turuncu, daha büyük ve daha parlak değerlik elektronu dönüyor. Bu elektronu ince bir çizgiyle "Değerlik elektronu" etiketi takip ediyor. Altta "ELEKTRON DİZİLİMİ" başlığı ve "2 · 8 · 1" yazısı var; buradaki 1 turuncu. Açılışta yörüngeler merkezden büyüyerek beliriyor.
Hareket: requestAnimationFrame ile, her kabuk farklı hızda dönsün; kusursuz döngü. Yalnızca HTML dosyasıyla yanıt ver.
```
