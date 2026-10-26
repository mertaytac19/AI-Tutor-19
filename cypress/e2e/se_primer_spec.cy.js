// cypress/e2e/se_primer_spec.cy.js
// SE Primer — E2E Test Paketi (Türkçe)
// Komut: npx cypress run --spec "cypress/e2e/se_primer_spec.cy.js" --video

describe("SE Primer — İyi Son Yolu", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("1. Profil ekranı görünür ve devam butonu devre dışıdır", () => {
    cy.contains("Hoş Geldin, Nöbetçi Mühendis").should("be.visible");
    cy.get("#btn-devam-et").should("be.disabled");
    cy.wait(1000);
  });

  it("2. Tüm seçimler yapılınca devam butonu aktif olur", () => {
    // Deneyim seçimi
    cy.contains("Yeni Başlayan").click();
    cy.wait(600);
    // Rol seçimi
    cy.contains("DevOps Mühendisi").click();
    cy.wait(600);
    // Hedef seçimi
    cy.contains("Race Condition Çözmek").click();
    cy.wait(600);
    cy.get("#btn-devam-et").should("not.be.disabled");
    cy.wait(1000);
  });

  it("3. İyi Son yolu: Rollback → Mutex → Koordinat maskeleme", () => {
    // Onboarding
    cy.contains("Yeni Başlayan").click();
    cy.wait(600);
    cy.contains("DevOps Mühendisi").click();
    cy.wait(600);
    cy.contains("Race Condition Çözmek").click();
    cy.wait(600);
    cy.get("#btn-devam-et").click();
    cy.wait(1000);

    // Kriz Odası — Rollback seçimi
    cy.contains("Kriz Kontrol Paneli").should("be.visible");
    cy.wait(1000);
    cy.get("#btn-rollback").click();
    cy.wait(1000);

    // Eşzamanlılık — Mutex seçimi
    cy.contains("Eşzamanlılık Kararı").should("be.visible");
    cy.wait(1000);
    cy.get("#btn-mutex").click();
    cy.wait(1000);

    // Gizlilik — Anonimleştirme seçimi
    cy.contains("Gizlilik Kararı").should("be.visible");
    cy.wait(1000);
    cy.get("#btn-anonimize").click();
    cy.wait(1000);

    // Sonuç ekranı (İyi Son: 2 saniye net bekleme)
    cy.contains("Senaryo Tamamlandı").should("be.visible");
    cy.contains("BAŞARILI").should("be.visible");
    cy.wait(2000);
  });

  it("4. Yeniden Oyna butonu oyunu 1. ekrana döndürür", () => {
    // Hızlı geçiş ile ending ekranına ulaş
    cy.contains("Yeni Başlayan").click();
    cy.contains("DevOps Mühendisi").click();
    cy.contains("Race Condition Çözmek").click();
    cy.get("#btn-devam-et").click();
    cy.get("#btn-rollback").click();
    cy.get("#btn-mutex").click();
    cy.get("#btn-anonimize").click();

    // Sonuç ekranı kontrolü
    cy.contains("Senaryo Tamamlandı").should("be.visible");
    cy.wait(1000);

    // Yeniden Oyna butonuna tıklama
    cy.get("#btn-yeniden-oyna").click();
    cy.wait(1000);

    // Yeniden Oyna sonucu: 1. Onboarding ekranında 2 saniye net bekleme
    cy.contains("Hoş Geldin, Nöbetçi Mühendis").should("be.visible");
    cy.wait(2000);
  });
});

describe("SE Primer — KVKK İhlal Yolu", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("5. Ham log paylaşımı KVKK ihlali sonucunu verir", () => {
    cy.contains("Deneyimli").click();
    cy.wait(600);
    cy.contains("SRE (Site Güvenilirlik)").click();
    cy.wait(600);
    cy.contains("Sistem Optimizasyonu").click();
    cy.wait(600);
    cy.get("#btn-devam-et").click();
    cy.wait(1000);

    cy.get("#btn-rollback").click();
    cy.wait(1000);
    cy.get("#btn-kuyruk").click();
    cy.wait(1000);
    cy.get("#btn-ham-log").click();
    cy.wait(1000);

    // Sonuç ekranı (KVKK İhlali: 2 saniye net bekleme)
    cy.contains("Senaryo Tamamlandı").should("be.visible");
    cy.contains("İHLAL").should("be.visible");
    cy.wait(2000);
  });
});

describe("SE Primer — Bellek Sızıntısı Yolu", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("6. Hot-patch seçimi bellek sızıntısı / çöküş sonucunu verir", () => {
    cy.contains("Yeni Başlayan").click();
    cy.wait(600);
    cy.contains("Altyapı Mühendisi").click();
    cy.wait(600);
    cy.contains("Eşzamanlılık Desenleri").click();
    cy.wait(600);
    cy.get("#btn-devam-et").click();
    cy.wait(1000);

    // Hot-patch seçimi doğrudan ending tetikler
    cy.get("#btn-hotpatch").click();
    cy.wait(1000);

    // Sonuç ekranı (Kriz / Bellek Sızıntısı: 2 saniye net bekleme)
    cy.contains("Senaryo Tamamlandı").should("be.visible");
    cy.contains("KRİZ").should("be.visible");
    cy.wait(2000);
  });
});

describe("SE Primer — AI Tutor", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.contains("Yeni Başlayan").click();
    cy.contains("DevOps Mühendisi").click();
    cy.contains("Race Condition Çözmek").click();
    cy.get("#btn-devam-et").click();
    cy.wait(1000);
  });

  it("7. Tutor mesaja yanıt verir", () => {
    // Sohbet kutusuna yavaş daktilo efekti ile yazma ({ delay: 50 })
    cy.get("#tutor-input").type("mutex nedir?", { delay: 50 });
    cy.wait(1000);
    cy.get("#tutor-gonder").click();
    cy.wait(1000);

    // Tutor cevabını doğrula ve ekranda 2 saniye okunacak şekilde bekle
    cy.get(".bg-indigo-900").should("have.length.gte", 2);
    cy.wait(2000);
  });
});
