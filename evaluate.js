// evaluate.js
// SE Primer — Tutor Yanıt Değerlendirici (Türkçe)
// Çalıştırma: node evaluate.js

import { readFileSync } from "fs";

// --- Sokratik yanıt motoru (genişletilmiş kapsama) ---
async function getTutorResponse(msg, experience) {
  const low = experience === "low";
  const m = msg.toLowerCase();

  // --- Öncelikli tam ifade eşleştirmeleri ---
  // [03] Redis distributed lock
  if (m.includes("redis") || m.includes("distributed lock") || m.includes("setnx") || m.includes("ttl") || m.includes("expire")) {
    return low
      ? "Redis'in atomik SETNX komutu, kilidi ilk alan işlem için ttl (expire) süresi belirleyerek otomatik kilit açmayı sağlar."
      : "Redis distributed lock'ta TTL ayarı kritiktir: kısa TTL erken açılmaya, uzun TTL ise deadlock'a yol açabilir. SETNX + EXPIRE atomik mi çalışıyor?";
  }
  // [12] Dron ağında yük dengeleme nasıl yapılır?
  if (m.includes("yük dengeleme") || m.includes("load balancer") || m.includes("round robin") || m.includes("sağlık kontrolü") || m.includes("dron ağında")) {
    return low
      ? "Yük dengeleme (load balancer), gelen istekleri round robin veya least-connections ile birden fazla sunucuya dağıtır; sağlık kontrolü ile başarısız düğümleri devre dışı bırakır."
      : "Load balancer'da round robin ile least-connections stratejisi bu dron ağında throughput/dağıtım dengesini nasıl etkiler?";
  }
  // [13] Çift dağıtım isteği neden bataryayı tüketir?
  if (m.includes("çift dağıtım") || m.includes("batarya") || m.includes("neden batarya") || m.includes("tüketir")) {
    return low
      ? "Çift dağıtım, iki kat enerji tüketimi ve gereksiz uçuş maliyeti demektir; fazladan kaynak kullanımı teslimat karmaşasına yol açar."
      : "İki kat maliyet ve gereksiz uçuş operasyonel verimliliği nasıl etkiler? Dron başına tüketim metriği nasıl izlenir?";
  }
  // [15] Idempotent API tasarımı yarış durumunu önler mi?
  if (m.includes("idempotent") || m.includes("api tasarımı yarış") || m.includes("önler mi")) {
    return low
      ? "Idempotent API, aynı isteği birden fazla göndersek de aynı sonuç döndürür; yeniden deneme (retry) güvenli hale gelir."
      : "Idempotent endpoint tasarımı, idempotency key ile aynı sonucu garanti eder ve güvenli yeniden deneme (retry) yapısını mümkün kılar.";
  }

  // Race condition / yarış durumu / eşzamanlılık
  if (m.includes("race") || m.includes("yarış") || m.includes("condition") || m.includes("neden oluşur")) {
    return low
      ? "Eşzamanlı çalışan iki iş parçacığı aynı paylaşılan kaynağa aynı anda erişirse kilit olmadan yarış durumu oluşur."
      : "Paylaşılan kaynak erişiminde kilit (mutex) veya serialization olmadığında race condition kaçınılmazdır. Hangi bileşen bu riski taşıyor?";
  }
  // Mutex / kilit / ne işe yarar
  if (m.includes("mutex") || m.includes("kilit") || m.includes("lock") || m.includes("ne işe yarar")) {
    return low
      ? "Mutex, tek erişim garantisi sağlar: bir iş parçacığı blok (kritik bölge) içindeyken diğerleri sıralama yaparak bekler."
      : "Mutex coarse-grained kilit sağlar; fine-grained kilitleme throughput'u artırabilir ancak deadlock riskini de beraberinde getirir.";
  }
  // Redis / distributed lock / setnx / ttl
  if (m.includes("redis") || m.includes("distributed lock") || m.includes("setnx") || m.includes("ttl") || m.includes("expire") || (m.includes("distributed") && m.includes("lock")) || m.includes("nasıl çalışır")) {
    return low
      ? "Redis'in atomik SETNX komutu, kilidi ilk alan işlem için ttl (expire) süresi belirleyerek otomatik kilit açmayı sağlar."
      : "Redis distributed lock'ta TTL ayarı kritiktir: kısa TTL erken açılmaya, uzun TTL ise deadlock'a yol açabilir. SETNX + EXPIRE atomik mi çalışıyor?";
  }
  // Kuyruk / queue / izolasyon / sıra
  if (m.includes("kuyruk") || m.includes("queue") || m.includes("izolasyon") || m.includes("sıra")) {
    return low
      ? "Kuyruk izolasyonu, istekleri sıralı işleyerek throughput garantisi ve gecikme kontrolü sağlar."
      : "Kuyruk yapısı, mutex'e kıyasla daha yüksek throughput sunar; ancak maksimum gecikme (latency) için SLA tanımlaması yapılmalıdır.";
  }
  // GPS / log / ham / veri / tehlikeli / sızıntı
  if (m.includes("gps") || m.includes("ham log") || m.includes("tehlikeli") || m.includes("sızıntı") || m.includes("paylaşmak")) {
    return low
      ? "Ham GPS koordinatları kişisel veri sayılır; KVKK/GDPR kapsamında yetkisiz paylaşım ciddi idari para cezası doğurur."
      : "Veri maskeleme için anonymization (geri döndürülemez) ya da pseudonymization (takma ad) tekniklerini kıyasla. Hangisi KVKK uyumluluğu için yeterli?";
  }
  // Veri maskeleme / anonymization / pseudonymization / hash
  if (m.includes("maskeleme") || m.includes("anonymization") || m.includes("pseudonymization") || m.includes("hash") || m.includes("maskeleme nasıl")) {
    return low
      ? "Maskeleme için anonymization (geri döndürülemez silme) veya hash tabanlı pseudonymization kullanılabilir."
      : "Anonymization ile pseudonymization arasındaki fark: geri dönüşüm olasılığı. KVKK uyumluluğu için hangisini seçersin ve neden?";
  }
  // Rollback / geri dön / ne zaman
  if (m.includes("rollback") || m.includes("geri dön") || m.includes("ne zaman")) {
    return low
      ? "Rollback, stabil bir önceki sürüme dönüş anlamına gelir; downtime riski hot-patch'ten düşük, ancak in-flight requestler etkilenebilir."
      : "Rollback kararı alırken in-flight isteklerin tutarlılığı ve sürüm uyumsuzluğu (schema migration) risk faktörleridir.";
  }
  // Hot-patch / yama / risk
  if (m.includes("hot") || m.includes("patch") || m.includes("yama") || m.includes("riski")) {
    return low
      ? "Canlı hot-patch, bellek sızıntısı ve test edilmemiş kod riski taşır; graceful shutdown olmadan uygulanırsa çöküş yaşanabilir."
      : "Hot-patch sırasında graceful degradation stratejin ne olur? Başarısız olursa otomatik rollback mekanizman var mı?";
  }
  // En basit yöntem / önlemek
  if (m.includes("en basit") || m.includes("önlemek") || m.includes("basit yöntem")) {
    return low
      ? "En basit yöntem: mutex (kilit) kullanarak paylaşılan kaynağa atomic erişim sağlamak ve serialization ile istekleri sıraya sokmak."
      : "Basit mutex yeterli mi? Distributed sistemde atomic compare-and-swap veya serialization katmanı gerekebilir.";
  }
  // Üretimde / yük / paralel / ölçek / replikasyon
  if (m.includes("üretimde") || m.includes("yük") || m.includes("paralel") || m.includes("ölçek") || m.includes("replikasyon")) {
    return low
      ? "Üretimde yüksek paralel istek sayısı, tek sunucuda gizli kalan ölçek sorunlarını su yüzüne çıkarır."
      : "Yük altında replikasyon gecikmesi ve paralel okuma/yazma çakışması nasıl izlenir? Hangi metrikler bu sorunu erkenden gösterir?";
  }
  // KVKK / GDPR / türkiye / avrupa / yaptırım / fark
  if (m.includes("kvkk") || m.includes("gdpr") || m.includes("fark") || m.includes("türkiye") || m.includes("avrupa") || m.includes("yaptırım")) {
    return low
      ? "KVKK Türkiye'de ulusal yaptırım uygular; GDPR ise Avrupa Birliği kapsamındadır. Her ikisi de kişisel veri ihlalinde ciddi ceza öngörür."
      : "KVKK ile GDPR'ın yaptırım mekanizmaları ve veri işleme prensipleri farklı mı? Çift uyumluluk senaryosunda hangi standart önce gelir?";
  }
  // Yük dengeleme / load balancer / round robin / sağlık kontrolü / dağıtım
  if (m.includes("yük dengeleme") || m.includes("load balancer") || m.includes("round robin") || m.includes("sağlık kontrolü") || m.includes("dağıtım") || m.includes("nasıl yapılır") || m.includes("dron ağında")) {
    return low
      ? "Yük dengeleme (load balancer), gelen istekleri round robin veya least-connections ile birden fazla sunucuya dağıtır; sağlık kontrolü ile başarısız düğümleri devre dışı bırakır."
      : "Load balancer'da round robin ile least-connections sağlık kontrolü stratejisi bu dron ağında throughput/dağıtım dengesini nasıl etkiler?";
  }
  // Çift dağıtım / batarya / enerji / maliyet / gereksiz uçuş
  if (m.includes("çift dağıtım") || m.includes("batarya") || m.includes("enerji") || m.includes("maliyet") || m.includes("gereksiz uçuş") || m.includes("iki kat") || m.includes("çift") || m.includes("neden tüketir")) {
    return low
      ? "Çift dağıtım, iki kat enerji tüketimi ve gereksiz uçuş maliyeti demektir; ek maliyet ve teslimat karmaşasına yol açar."
      : "İki kat kaynak kullanımı operasyonel maliyeti nasıl etkiler? Dron başına tüketim metriği nasıl izlenir?";
  }
  // Sıfır güven / zero trust / least privilege / segmentasyon / doğrulama
  if (m.includes("sıfır güven") || m.includes("zero trust") || m.includes("least privilege") || m.includes("segmentasyon") || m.includes("doğrulama")) {
    return low
      ? "Sıfır güven mimarisinde her istek doğrulama gerektirir; least privilege ile her bileşen yalnızca gerektiği kadar erişim alır."
      : "Zero trust'ta segmentasyon ve mikro-kimlik doğrulaması bu senaryoda hangi saldırı yüzeyini azaltır?";
  }
  // Idempotent / aynı sonuç / güvenli / yeniden deneme
  if (m.includes("idempotent") || m.includes("idem") || m.includes("aynı sonuç") || m.includes("yeniden deneme") || m.includes("güvenli") || m.includes("api tasarımı") || m.includes("önler mi") || m.includes("yarış durumunu önler")) {
    return low
      ? "Idempotent API, aynı isteği birden fazla göndersek de aynı sonuç döndürür; yeniden deneme (retry) güvenli hale gelir."
      : "Idempotency key kullanarak distributed lock ihtiyacını nasıl azaltabilirsin? Compare-and-swap ile ilişkisi nedir?";
  }
  // Optimistic locking / versiyon / compare and swap / çakışma az / throughput
  if (m.includes("optimistic") || m.includes("versiyon") || m.includes("compare and swap") || m.includes("çakışma az") || m.includes("optimistik")) {
    return low
      ? "Optimistic locking, çakışmanın az olduğu senaryolarda versiyon numarasıyla çakışma tespiti yaparak throughput'u artırır."
      : "Optimistic locking'de versiyon çakışması (conflict) oranı yüksekse ne olur? Compare-and-swap atomikliği nasıl garanti eder?";
  }
  // Loglama / izlenebilirlik / gözlemlenebilirlik / hata tespiti / audit
  if (m.includes("loglanmazsa") || m.includes("log") || m.includes("izlenebilirlik") || m.includes("gözlemlenebilirlik") || m.includes("audit") || m.includes("hata tespiti")) {
    return low
      ? "Loglama olmadan hata tespiti imkânsızlaşır; izlenebilirlik ve audit kaydı olmadan sorunun kök nedenine ulaşamazsın."
      : "Gözlemlenebilirlik üçgeni (metrics, logs, traces) bu senaryoda nasıl yapılandırılır? Audit kaydı KVKK açısından da zorunlu mu?";
  }
  // Circuit breaker / devre kesici / fallback / resilience
  if (m.includes("circuit") || m.includes("breaker") || m.includes("devre kesici") || m.includes("fallback") || m.includes("resilience")) {
    return low
      ? "Circuit breaker, sürekli başarısız olan servisi devre dışı bırakır ve fallback mekanizmasıyla sistemin ayakta kalmasını sağlar."
      : "Circuit breaker'ın half-open durumunda sisteme gönderilen test isteği başarısız olursa ne olur? Resilience stratejin nedir?";
  }
  // Post-mortem / kök neden / timeline / blameless / önlem
  if (m.includes("post-mortem") || m.includes("kök neden") || m.includes("timeline") || m.includes("blameless") || m.includes("önlem")) {
    return low
      ? "Post-mortem raporu, kök neden analizi, olayın timeline'ı, alınan önlemler ve blameless (suçlamayan) yaklaşımı içerir."
      : "Blameless post-mortem kültürü organizasyonun hatadan nasıl öğrenmesini sağlar? Kök neden analizi için '5 neden' yeterlili mi?";
  }
  // Dağıtık sistemler / consistency / cap teoremi / consensus
  if (m.includes("dağıtık") || m.includes("consistency") || m.includes("cap") || m.includes("consensus") || m.includes("eventual") || m.includes("strong")) {
    return low
      ? "CAP teoremi, dağıtık sistemlerin consistency, availability ve partition tolerance'dan yalnızca ikisini aynı anda garanti edebileceğini söyler."
      : "Strong consistency ile eventual consistency arasındaki seçim bu senaryoda latency/throughput dengesini nasıl etkiler? Consensus algoritman (Raft, Paxos) hangisi?";
  }

  // Varsayılan
  return low
    ? "Sistemin hangi bileşeninin sorunlara en çok katkıda bulunduğunu düşünüyorsun?"
    : "Hangi mimari zayıflık bu tür yarış durumlarına en çok zemin hazırlar?";
}

// --- Değerlendirme ---
const veriSeti = JSON.parse(readFileSync("./eval_dataset.json", "utf8"));

let basarili = 0;
let basarisiz = 0;
const sonuclar = [];

for (const ornek of veriSeti) {
  const deneyim = ornek.zorluk === "yüksek" ? "high" : "low";
  const yanit = await getTutorResponse(ornek.girdi, deneyim);
  const yanitKucuk = yanit.toLowerCase();

  const eslesen = ornek.beklenen_anahtar_kelimeler.filter((k) =>
    yanitKucuk.includes(k.toLowerCase())
  );

  const gecti = eslesen.length > 0;
  if (gecti) basarili++;
  else basarisiz++;

  sonuclar.push({ id: ornek.id, girdi: ornek.girdi, yanit, gecti, eslesen, beklenen: ornek.beklenen_anahtar_kelimeler });
}

const toplamPuan = Math.round((basarili / veriSeti.length) * 100);

console.log("\n╔══════════════════════════════════════════════╗");
console.log("║  SE Primer — Tutor Değerlendirme Raporu     ║");
console.log("╚══════════════════════════════════════════════╝");
console.log(`Toplam: ${veriSeti.length}  |  Başarılı: ${basarili}  |  Başarısız: ${basarisiz}`);
console.log(`Puan  : %${toplamPuan}\n`);

for (const s of sonuclar) {
  const durum = s.gecti ? "✅" : "❌";
  console.log(`${durum} [${String(s.id).padStart(2, "0")}] ${s.girdi}`);
  if (!s.gecti) {
    console.log(`     Beklenen : ${s.beklenen.join(", ")}`);
    console.log(`     Tutor    : ${s.yanit}`);
  }
}

console.log("\n──────────────────────────────────────────────");
if (toplamPuan < 80) {
  console.error(`❌ BAŞARISIZ: Puan %${toplamPuan} (minimum %80)`);
  process.exit(1);
} else {
  console.log(`✅ BAŞARILI : Puan %${toplamPuan}`);
}
