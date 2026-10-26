// src/tutor_prompt.ts
/**
 * SE Primer — Sokratik AI Tutor Sistem Promptu (Türkçe)
 *
 * Bu prompt, öğrenciye doğrudan cevap vermeden Sokratik yöntemle
 * yönlendirici sorular sormayı amaçlar.
 */

export const TUTOR_SYSTEM_PROMPT = `
Sen "SE Primer" adlı eğitim simülasyonunun Sokratik AI Tutor'usun.
Senaryo: 03:42 AM — Acil tıbbi malzeme taşıyan otonom dron lojistik ağında yüksek yük altında yarış durumu (race condition) oluştu.

GÖREV KURALLARI:
1. Asla doğrudan cevap verme. Öğrencinin kendi çözümüne ulaşmasını sağla.
2. Yalnızca yönlendirici, açık uçlu sorular sor.
3. Öğrencinin deneyim seviyesine göre dil karmaşıklığını ayarla:
   - Yeni Başlayan: Basit, somut metafor tabanlı sorular.
   - Deneyimli: Teknik trade-off'lar, mimari zayıflıklar, ölçeklenebilirlik soruları.
4. Konular: Race condition, Mutex, Redis kilit, kuyruk izolasyonu, KVKK/GDPR, GPS veri maskeleme, rollback vs hot-patch.
5. Yanıt uzunluğu en fazla 2 cümle olsun.
6. Türkçe yaz. Teknik terimler parantez içinde İngilizce verilebilir.

ÖRNEK SORULAR:
- "Aynı anda iki isteğin aynı dronu seçmesini engellemek için sistemde ne gibi bir mekanizma olmalı?"
- "Redis'i kilit mekanizması olarak kullanmak, doğrudan veritabanı kilidi kullanmaktan nasıl farklıdır?"
- "Ham GPS koordinatlarını paylaşmak neden sadece bir teknik sorun değil, aynı zamanda yasal bir risk?"
- "Hot-patch kararı verdiysen, bu sırada uçuşta olan dronların durumu ne olur?"
`;

export const getTutorResponse = async (
  studentMessage: string,
  experience: "low" | "high"
): Promise<string> => {
  // Gerçek LLM entegrasyonu için bu fonksiyon genişletilecektir.
  // Şimdilik anahtar kelime bazlı Sokratik yanıtlar döndürür.
  const msg = studentMessage.toLowerCase();
  const low = experience === "low";

  if (msg.includes("kilit") || msg.includes("mutex")) {
    return low
      ? "Aynı anda iki isteğin aynı kaynağa erişmesini engellemek için sistemde ne olması gerekir?"
      : "İnce taneli (fine-grained) kilit ile kaba taneli (coarse-grained) kilit arasındaki gecikme farkını nasıl değerlendirirsin?";
  }
  if (msg.includes("kuyruk") || msg.includes("queue")) {
    return low
      ? "Bir bekleme kuyruğu, taleplerin sırayla işlenmesini nasıl garanti eder?"
      : "Kuyruk izolasyonu kullanırken maksimum gecikme (latency) nasıl sınırlanabilir?";
  }
  if (msg.includes("gps") || msg.includes("log") || msg.includes("veri")) {
    return low
      ? "Bu verilerin kişisel veri sayılması neden önemli? Sonuçları ne olabilir?"
      : "Pseudonymization ile anonymization arasındaki fark KVKK uyumluluğunu nasıl etkiler?";
  }
  return low
    ? "Şu ana kadar sistemin hangi parçasının sorunlara en çok katkıda bulunduğunu düşünüyorsun?"
    : "Hangi mimari zayıflık bu tür yarış durumlarına en çok zemin hazırlar?";
};
