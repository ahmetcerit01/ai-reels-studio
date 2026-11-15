# Tek Bilye, 10 Dünya: Promptlar

İki kullanım şekli var:
- **A) Ana prompt:** Tek bir promptla, 10 dünyadan geçen kesintisiz zincirleme tepki animasyonu.
- **B) Tek stil:** Ortak şablonu yapıştır, `[STİL]` kısmına aşağıdaki 10 stilden birini koy; o dünyanın tek başına 6 saniyelik döngüsünü alırsın.

Çıktı her zaman, tarayıcıda açınca kendi kendine oynayan tek bir HTML dosyası olur. Ekran kaydıyla videoya çevirebilirsin.

---

## A) Ana prompt (10 dünya, tek zincir)

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) yaklaşık 18 saniyelik bir animasyon oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok.

Senaryo: Turuncu, üzerinde beyaz bir şerit olan parlak bir bilye, tek bir kesintisiz zincirleme tepkiyle (Rube Goldberg makinesi gibi) 10 farklı dünyadan geçiyor. Her dünya yaklaşık 1,6 saniye sürüyor. Bilye dünyanın sağ kenarından çıkarken kamera yumuşak bir easing ile sağa kayıyor ve bilye aynı yükseklikten bir sonraki dünyaya giriyor. Bilye her dünyada aynı kalıyor (renk, boyut, yuvarlanma dönüşü); yalnızca dünyalar değişiyor. Bilye her dünyada o dünyaya özgü bir düzenekle etkileşime giriyor:

1. Çöp Adam: çizgili defter kâğıdı, titrek kalem çizgileri. Bilye bir rampadan iner, domino taşlarını tek tek devirir; çöp adam kollarını kaldırıp sevinçle zıplar.
2. Hamur Animasyon: parlak hamur dokulu yeşil tepeler ve renkli çiçekler. Bilye kırmızı benekli bir mantara çarpıp sekiyor; direklerin üstündeki renkli hamur pedlere ezilip uzayarak zıplıyor.
3. Anime Suluboya: suluboya gökyüzü, yumuşak bulutlar, nehir. Bilye kırmızı kemerli bir köprünün üstünden geçiyor; köprünün yansıması suda titriyor, pembe yapraklar uçuşuyor.
4. ASCII Sanatı: siyah ekranda yeşil monospace karakterler, matrix yağmuru. Bilye karakterlerden oluşuyor ("@%*"); bir rampadan sıçrayıp havada süzülüyor.
5. Kâğıt Kesik: gökkuşağı şeritli kâğıt zemin, gölgeli kâğıt ağaçlar ve ev. Bilye bir boruya düşüp kayboluyor, ilerideki ikinci borudan fırlayarak çıkıyor.
6. Kurzgesagt tarzı: düz vektör uzay, halkalı gezegen, yıldızlar. Bilye parlayan bir çizgi üzerinde yuvarlanıp bir gezegenin etrafında tam bir döngü (loop) yapıyor.
7. Mürekkep (sumi-e): sisli, katmanlı mürekkep dağlar, uçan kuşlar, kırmızı mühür. Bilye kalın bir fırça darbesinden oluşan yarım boruda inip çıkıyor.
8. Voksel: bloklardan oluşan çimen ve toprak, küp ağaçlar. Bilye bir blok aşağı düşüyor, su bloğunun yanından geçip tahta bir rampadan çıkıyor.
9. 1930'lar Çizgi Film: siyah-beyaz, film greni ve titreme. Bilye renkli kalıyor; bir yaya basıp yüksek bir yay çiziyor. Gözleri bilyeyi takip eden fincan karakterler izliyor.
10. 3D Film: oyuncak bloklar, ahşap zemin, bulanık pastel arka plan. Bilye kırmızı bir topun içine yuvarlanıyor; top geri tepiyor ve bilyeyi bir konfeti patlamasıyla havaya fırlatıyor.

Her dünyanın üst kısmında kendi stiline uygun yazılmış stil adı ve küçük bir "n/10" ilerleme göstergesi olsun.
Hareket: requestAnimationFrame ile akıcı; gerçekçi yuvarlanma (dönüş = yol / yarıçap), sekmelerde ezilip uzama, her dünyada en az iki katman paralaks ve sürekli hareket eden küçük detaylar. Yalnızca HTML dosyasıyla yanıt ver.
```

---

## B) Tek stil şablonu

```
9:16 kadrajda (1080x1920 tuval, pencereye sığacak şekilde ölçeklenmiş, dışı siyah) 6 saniyelik, kusursuz döngü yapan bir animasyon oynatan tek parça bir HTML dosyası oluştur. Her şeyi kodla çiz; görsel ya da harici dosya yok. 3D bir stil için three.js'i cdnjs.cloudflare.com'dan yükleyebilirsin; bunun dışında dış kaynak yok.

Senaryo: Turuncu, üzerinde beyaz bir şerit olan parlak bir bilye soldan girip yuvarlanıyor, bir zincirleme tepki düzeneğinden geçiyor ve sağdan çıkıyor. Ardından sahne kesintisiz biçimde başa dönüyor.
Stil: [STİL]. Bu stile tamamen bağlı kal: palet, şekiller, çizgi, doku, ışık ve hareketin hissi tamamen ona uysun; yalnızca bilye her stilde turuncu kalsın.
Hareket: requestAnimationFrame ile akıcı; gerçekçi yuvarlanma, sekmelerde ezilip uzama, en az iki katman paralaks. Ekranda yazı olmasın. Yalnızca HTML dosyasıyla yanıt ver.
```

`[STİL]` yerine yazılacaklar:

1. **Çöp Adam:** çizgili defter kâğıdı üstünde titrek siyah kalem çizgileri; rampa, devrilen dominolar ve sevinen bir çöp adam
2. **Hamur Animasyon:** parlak, parmak izi dokulu hamur figürler; yeşil tepeler, benekli mantar, ezilip uzayan renkli pedler
3. **Anime Suluboya:** Ghibli esintili suluboya gökyüzü ve nehir; kırmızı kemerli köprü, suda yansıma, uçuşan pembe yapraklar
4. **ASCII Sanatı:** siyah ekranda yeşil monospace karakterler ve matrix yağmuru; bilye "@%*" karakterlerinden oluşuyor, rampadan sıçrıyor
5. **Kâğıt Kesik:** gölgeli katmanlı kâğıt, gökkuşağı şeritli zemin, kâğıt ağaçlar ve ev; bilye bir boruya girip diğerinden fırlıyor
6. **Kurzgesagt tarzı:** düz vektör uzay, halkalı gezegen, parlayan yörünge çizgisi; bilye bir gezegenin etrafında döngü yapıyor
7. **Mürekkep (sumi-e):** sisli katmanlı mürekkep dağlar, kuşlar, kırmızı mühür; kalın fırça darbesinden yarım boru
8. **Voksel:** Minecraft benzeri bloklar, küp ağaçlar, su bloğu, tahta rampa
9. **1930'lar Çizgi Film:** siyah-beyaz, film greni, titreme ve çizikler; yay, gözleri bilyeyi takip eden fincan karakterler
10. **3D Film:** Pixar havasında oyuncak odası, ahşap zemin, bulanık arka plan; bilyeyi konfetiyle fırlatan kırmızı bir top
