// src/components/Ending.jsx
import React from "react";
import { useStore } from "../store";

const SONUCLAR = {
  basarili: {
    emoji: "✅",
    renk: "text-emerald-400",
    sinir: "border-emerald-700",
    arkaplan: "bg-emerald-950/40",
    metin: "BAŞARILI: Yarış durumunu engellediniz ve KVKK verilerini korudunuz. Sistem saatlerce sorunsuz çalıştı.",
  },
  kvkk_ihlali: {
    emoji: "⚠️",
    renk: "text-amber-400",
    sinir: "border-amber-700",
    arkaplan: "bg-amber-950/40",
    metin: "İHLAL: Sistem çalışıyor ancak ham GPS verileri sızdırıldığı için KVKK cezası kesildi.",
  },
  bellek_sizintisi: {
    emoji: "💥",
    renk: "text-red-400",
    sinir: "border-red-700",
    arkaplan: "bg-red-950/40",
    metin: "KRİZ: Canlıda kilit mekanizmasız yama yapıldığı için bellek sızıntısı ve sistem çöküşü yaşandı.",
  },
};

const ADIM_ETIKETLERI = {
  mimari: "Mimari Karar",
  eszamanlilik: "Eşzamanlılık",
  gizlilik: "Gizlilik",
  sonuc: "Sonuç",
};

export default function Ending() {
  const { decisions, resetGame } = useStore();

  // Sonucu belirle
  const sonucKarari = decisions.find((d) => d.adim === "sonuc");
  const gizlilikKarari = decisions.find((d) => d.adim === "gizlilik");

  let sonucKodu = "basarili";
  if (sonucKarari?.sonuc === "bellek_sizintisi") {
    sonucKodu = "bellek_sizintisi";
  } else if (
    gizlilikKarari?.secim &&
    gizlilikKarari.secim.includes("Ham logları")
  ) {
    sonucKodu = "kvkk_ihlali";
  }

  const { emoji, renk, sinir, arkaplan, metin } = SONUCLAR[sonucKodu];

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-5">
      {/* Başlık */}
      <div className="text-center space-y-1">
        <div className="text-4xl">{emoji}</div>
        <h2 className="text-2xl font-bold text-white">Senaryo Tamamlandı</h2>
      </div>

      {/* Sonuç */}
      <div className={`${arkaplan} border ${sinir} rounded-xl p-4 text-sm leading-relaxed ${renk} font-medium`}>
        {metin}
      </div>

      {/* Karar Geçmişi */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Karar Geçmişi</h3>
        <ul className="space-y-1.5">
          {decisions
            .filter((d) => d.adim !== "sonuc")
            .map((d, i) => (
              <li key={i} className="text-sm text-slate-300 flex gap-2">
                <span className="text-slate-500 font-mono min-w-[6rem] shrink-0">{ADIM_ETIKETLERI[d.adim] ?? d.adim}</span>
                <span className="text-slate-200">{d.secim}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Yeniden Oyna */}
      <button
        id="btn-yeniden-oyna"
        onClick={resetGame}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-indigo-900/40"
      >
        🔄 Yeniden Oyna
      </button>
    </div>
  );
}
