# SE Primer — Proje Spesifikasyonu (Türkçe)

## Versiyon: 1.0 | Tarih: Ekim 2026

---

## 1. Problem Tanımı

**Senaryo:** 03:42 AM — Acil tıbbi malzeme taşıyan otonom dron lojistik ağı yüksek eşzamanlı yük altında kritik hatalar üretiyor.

**Teknik Sorunlar:**

### 1.1 Yarış Durumu (Race Condition)
Dron tahsis servisi, aynı paketi birden fazla drona atayan çift dağıtım istekleri üretiyor. İki eşzamanlı istek aynı anda `is_available = true` durumunu kontrol edip aynı dronu rezerve ediyor. Bu durum:
- Batarya tükenmesine yol açıyor (aynı rota için iki dron uçuyor)
- Teslimatlarda gecikmeye ve başarısızlığa neden oluyor
- Yüksek hata oranı (%8) ile kendini gösteriyor

### 1.2 Bellek Sızıntısı Riski (Memory Leak)
Canlı sistemde test edilmemiş yama (hot-patch) uygulanması, event listener temizlenmeden kümülatif bellek birikimi ve nihayetinde sistem çöküşüne yol açıyor.

### 1.3 KVKK/GDPR Veri İhlali
Ham GPS log dosyaları, kullanıcıların kesin konumlarını (enlem/boylam) içeriyor. Bu verilerin üçüncü taraf analiz araçlarına ham haliyle aktarılması:
- KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında kişisel veri ihlali sayılıyor
- İdari para cezası ve itibar kaybı riski oluşturuyor

---

## 2. Kapsam Dışı (Bu Projede Yapılmıyor)

| Özellik | Gerekçe |
|---------|---------|
| Native mobil uygulama (iOS/Android) | Proje browser tabanlı simülasyon; SDK entegrasyonu kapsam dışı |
| Gerçek kullanıcı kimlik doğrulama | Eğitim simülasyonu için oturum yönetimi gerekmiyor |
| Gerçek dron donanımı SDK'ları | Gerçek donanım entegrasyonu üretim mühendisliği kapsamında |
| Yeniden başlatmada kalıcılık | Zustand in-memory state kullanılıyor; veri yeniden başlatmada sıfırlanıyor |
| Çok oyunculu liderlik tablosu | v2 özelliği olarak değerlendiriliyor |

---

## 3. Kabul Kriterleri (5 Kriter)

| # | Kriter | Doğrulama Yöntemi |
|---|--------|------------------|
| AC1 | Kullanıcı 3 profil sorusunu yanıtlamadan "Krize Gir" butonu devre dışı kalır | Cypress: `#btn-devam-et` disabled kontrolü |
| AC2 | Rollback → Mutex → Koordinat maskeleme yolu "BAŞARILI" sonucunu üretir | Cypress: İyi Son E2E testi |
| AC3 | Ham log paylaşımı "İHLAL" (KVKK) sonucunu üretir | Cypress: KVKK Yolu E2E testi |
| AC4 | Hot-patch seçimi "KRİZ" (çöküş) sonucunu üretir | Cypress: Bellek Sızıntısı E2E testi |
| AC5 | "Yeniden Oyna" butonu sayfa yenilemesi olmadan 1. ekrana döner | Cypress: `resetGame()` çağrısı doğrulaması |

---

## 4. Durum Akış Şeması

```
┌─────────────────────────────────────────────────┐
│              ONBOARDING (Ekran 1)                │
│  Deneyim + Rol + Hedef seç → Devam Et           │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│           KRİZ ODASI (Ekran 2)                  │
│  A) Rollback ─────────────────────────────────► │─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│  B) Hot-patch → KRİZ Sonucu (doğrudan Ending)  │                      │
└──────────────────┬──────────────────────────────┘                      │
                   │ (Rollback seçilirse)                                 │
                   ▼                                                      │
┌─────────────────────────────────────────────────┐                      │
│          EŞZAMANLILIk (Ekran 3)                 │                      │
│  A) Mutex / Redis Kilit                         │                      │
│  B) Kuyruk İzolasyonu                           │                      │
└──────────────────┬──────────────────────────────┘                      │
                   │                                                      │
                   ▼                                                      │
┌─────────────────────────────────────────────────┐                      │
│           GİZLİLİK / KVKK (Ekran 4)            │                      │
│  A) Koordinatları maskele → BAŞARILI ────────── │──────────────────────┤
│  B) Ham logları aktar → KVKK İHLALİ ────────── │──────────────────────┤
└──────────────────┬──────────────────────────────┘                      │
                   │                                                      │
                   ▼                                                      │
┌─────────────────────────────────────────────────┐◄─────────────────────┘
│              SONUÇ (Ekran 5)                    │
│  Sonuç metni + Karar Geçmişi + Yeniden Oyna    │
└─────────────────────────────────────────────────┘
```

---

## 5. Teknik Mimari

| Katman | Teknoloji | Detay |
|--------|-----------|-------|
| Frontend | React 18 + Vite | Bileşen tabanlı SPA |
| Durum | Zustand | `resetGame()` ile tam sıfırlama |
| Stil | Tailwind CSS (CDN) | Koyu cyberpunk teması |
| Test | Cypress E2E | 7 senaryo, video kaydı |
| AI Tutor | Kural tabanlı Sokratik yanıtlar | Anahtar kelime eşleştirme |
