# SE Primer — Yazılım Mühendisliği Interaktif Öğrenme Simülasyonu

> **Senaryo:** 03:42 AM — Acil tıbbi malzeme taşıyan otonom dron lojistik ağında yüksek yük altında yarış durumu (race condition) oluştu.

## Hızlı Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# Geliştirici sunucusunu başlat
npm run dev
# → http://localhost:5173

# E2E testleri çalıştır (60 sn video kaydıyla)
npx cypress run --spec "cypress/e2e/se_primer_spec.cy.js" --video

# Tutor değerlendirme betiğini çalıştır
node --experimental-vm-modules evaluate.js
```

## Proje Yapısı

```
hafta.6/
├── index.html              # Tailwind CDN + Inter font
├── src/
│   ├── App.jsx             # Faz yönlendirici
│   ├── store.js            # Zustand durumu + resetGame()
│   ├── index.css           # Tailwind direktifleri
│   ├── tutor_prompt.ts     # Sokratik AI Tutor promptu
│   └── components/
│       ├── Onboarding.jsx  # Ekran 1: Profil seçimi
│       ├── CrisisRoom.jsx  # Ekran 2: Kriz + Mimari karar
│       ├── Concurrency.jsx # Ekran 3: Eşzamanlılık kararı
│       ├── Privacy.jsx     # Ekran 4: Gizlilik/KVKK kararı
│       ├── Ending.jsx      # Ekran 5: Sonuç + Yeniden Oyna
│       └── TutorChat.jsx   # AI Tutor sohbet widget'ı
├── cypress/e2e/
│   └── se_primer_spec.cy.js  # 7 E2E test senaryosu
├── eval_dataset.json       # 20 Türkçe değerlendirme girdisi
├── evaluate.js             # Tutor değerlendirme betiği
└── spec.md                 # Proje spesifikasyonu
```

## Oyun Akışı

```
Onboarding → Kriz Odası → Eşzamanlılık → Gizlilik → Sonuç
                ↓ (Hot-patch)                          ↑
                └──────────────────────────────────────┘
```

### Sonuç Yolları

| Karar | Sonuç |
|-------|-------|
| Rollback → Mutex/Kuyruk → Koordinat maskele | ✅ BAŞARILI |
| Rollback → Mutex/Kuyruk → Ham log paylaş | ⚠️ KVKK İHLALİ |
| Hot-patch seç | 💥 KRİZ / Çöküş |

## Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| UI Çerçevesi | React 18 + Vite |
| Durum Yönetimi | Zustand |
| Stil | Tailwind CSS (CDN) |
| Test | Cypress E2E |
| Yazım | TypeScript (tutor_prompt.ts) |

---

## Ürün Kararları — Yapılmayan Özellikler

Bu bölüm, bilinçli olarak kapsam dışında bırakılan 3 özelliği açıklamaktadır:

1. **Gerçek LLM Entegrasyonu Yok:** Tutor yanıtları, harici bir AI API'sine bağlanmak yerine anahtar kelime eşleştirmesiyle üretilir; bu sayede internet bağlantısı olmadan da çalışır ve API maliyeti oluşmaz.

2. **Oturum Kalıcılığı Yok:** Kullanıcı kararları yalnızca Zustand belleğinde tutulur; sayfa yenilenmesinde veri kaybolur — gerçek bir öğrenme yönetim sistemi (LMS) entegrasyonu kapsam dışı bırakıldı.

3. **Çoklu Kullanıcı / Skor Tablosu Yok:** Farklı öğrencilerin kararlarını karşılaştıran bir liderlik tablosu veya çok oyunculu mod tasarlanmadı; bu özellik potansiyel bir v2 genişlemesi olarak değerlendirilmektedir.
