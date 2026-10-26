// src/components/TutorChat.jsx
import React, { useState, useRef, useEffect } from "react";
import { useStore } from "../store";

const SOKRATIK_YANIT = async (msg, experience) => {
  const low = experience === "low";
  const m = msg.toLowerCase();

  if (m.includes("kilit") || m.includes("mutex") || m.includes("lock")) {
    return low
      ? "Peki, tek seferde yalnızca bir isteğin durumu değiştirmesini nasıl sağlarsın?"
      : "İnce taneli (fine-grained) ve kaba taneli (coarse-grained) kilitleme arasındaki farkı düşün. Hangisi bu senaryoya daha uygun?";
  }
  if (m.includes("kuyruk") || m.includes("queue") || m.includes("sıra")) {
    return low
      ? "Bir mesaj kuyruğu, dağıtım isteklerini nasıl sıraya sokabilir?"
      : "Kuyruk izolasyonu sana kilit mekanizmasına kıyasla hangi garantileri verir?";
  }
  if (m.includes("log") || m.includes("gps") || m.includes("konum") || m.includes("veri")) {
    return low
      ? "Ham GPS koordinatlarını dış servislere göndermek neden riskli olabilir?"
      : "KVKK/GDPR uyumluluğu için hangi veri maskeleme tekniği uygulanabilir?";
  }
  if (m.includes("rollback") || m.includes("geri dön")) {
    return low
      ? "Bir önceki sürüme geri dönmek sistemdeki mevcut aktif istekleri nasıl etkiler?"
      : "Rollback sırasında in-flight request'lerin tutarlılığını nasıl sağlarsın?";
  }
  if (m.includes("hot") || m.includes("patch") || m.includes("yama")) {
    return low
      ? "Canlı sistemde yama yaparken hangi ek riskler ortaya çıkabilir?"
      : "Hot-patch sırasında graceful degradation stratejin ne olurdu?";
  }
  return low
    ? "Bu noktada sistemin hangi bileşeninin en kırılgan olduğunu düşünüyorsun?"
    : "Mimarinin en zayıf halkası hangisi? Kanıtını gözlemleyerek yürüt.";
};

export default function TutorChat() {
  const { profile } = useStore();
  const [mesajlar, setMesajlar] = useState([
    { kaynak: "tutor", metin: "Çift dağıtım isteklerinin neden kaynaklandığını düşünüyorsun? 🤔" },
  ]);
  const [girdi, setGirdi] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const altRef = useRef(null);

  useEffect(() => {
    altRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mesajlar]);

  const gonder = async () => {
    if (!girdi.trim() || yukleniyor) return;
    const kullaniciMesaj = { kaynak: "kullanici", metin: girdi };
    setMesajlar((prev) => [...prev, kullaniciMesaj]);
    setGirdi("");
    setYukleniyor(true);
    const yanit = await SOKRATIK_YANIT(girdi, profile?.experience);
    setTimeout(() => {
      setMesajlar((prev) => [...prev, { kaynak: "tutor", metin: yanit }]);
      setYukleniyor(false);
    }, 600);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); gonder(); }
  };

  return (
    <div className="mt-5 border-t border-slate-700 pt-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">🧠</span>
        <h3 className="text-sm font-bold text-cyan-400">Sokratik Yapay Zekâ Eğitmeni</h3>
      </div>
      <p className="text-xs text-slate-500">Tutor doğrudan cevabı vermez, yönlendirici sorular sorar.</p>

      {/* Mesaj alanı */}
      <div className="h-40 overflow-y-auto bg-slate-950 rounded-xl p-3 space-y-2 border border-slate-800">
        {mesajlar.map((m, i) => (
          <div key={i} className={`flex ${m.kaynak === "kullanici" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-snug ${
                m.kaynak === "tutor"
                  ? "bg-indigo-900 text-indigo-100 rounded-tl-none"
                  : "bg-slate-700 text-slate-100 rounded-tr-none"
              }`}
            >
              {m.kaynak === "tutor" && <span className="text-xs text-cyan-400 font-semibold block mb-0.5">Tutor</span>}
              {m.metin}
            </div>
          </div>
        ))}
        {yukleniyor && (
          <div className="flex justify-start">
            <div className="bg-indigo-900 text-indigo-300 px-3 py-2 rounded-xl text-sm rounded-tl-none animate-pulse">
              Düşünüyor...
            </div>
          </div>
        )}
        <div ref={altRef} />
      </div>

      {/* Input alanı */}
      <div className="flex gap-2">
        <input
          id="tutor-input"
          value={girdi}
          onChange={(e) => setGirdi(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Soru sor veya kararını gerekçelendir..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          id="tutor-gonder"
          onClick={gonder}
          disabled={!girdi.trim() || yukleniyor}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Gönder
        </button>
      </div>
    </div>
  );
}
