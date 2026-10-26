// src/components/CrisisRoom.jsx
import React from "react";
import { useStore } from "../store";
import TutorChat from "./TutorChat";

export default function CrisisRoom() {
  const { profile, addDecision, goToPhase, timer } = useStore();

  const handleDecision = (label, sonrakiFaz) => {
    addDecision({ adim: "mimari", secim: label });
    if (sonrakiFaz === "ending") {
      addDecision({ adim: "sonuc", sonuc: "bellek_sizintisi" });
    }
    goToPhase(sonrakiFaz);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-5">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-red-400 tracking-widest uppercase animate-pulse">● Canlı Kriz</div>
          <h2 className="text-xl font-bold text-white">Kriz Kontrol Paneli</h2>
        </div>
        {profile?.experience === "high" && timer !== null && (
          <div className={`px-3 py-1 rounded-lg text-sm font-mono font-bold border ${timer > 20 ? "border-green-600 text-green-400 bg-green-900/30" : "border-red-600 text-red-400 bg-red-900/30 animate-pulse"}`}>
            ⏱ {timer}s
          </div>
        )}
      </div>

      {/* Dashboard */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
          <div className="text-xs text-slate-400">Aktif Dron</div>
          <div className="text-2xl font-bold text-cyan-400">12</div>
        </div>
        <div className="bg-slate-800 border border-red-900 rounded-xl p-3 text-center">
          <div className="text-xs text-slate-400">Hata Oranı</div>
          <div className="text-2xl font-bold text-red-400">8%</div>
        </div>
      </div>

      {/* Senaryo açıklaması */}
      <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-4 text-sm text-red-200 leading-relaxed">
        <span className="font-mono text-red-400">03:42 AM —</span> Acil tıbbi malzeme taşıyan otonom dron lojistik ağında yüksek yük altında yarış durumu (race condition) oluştu. Çift dağıtım istekleri bataryaları tüketiyor ve ham GPS logları müşteri konumlarını sızdırıyor.
      </div>

      {/* Karar 1: Mimari */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Karar 1 · Mimari Yaklaşım</p>
        <div className="flex flex-col gap-2">
          <button
            id="btn-rollback"
            onClick={() => handleDecision("Eski kararlı sürüme geri dön (Rollback)", "concurrency")}
            className="w-full py-3 px-4 bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all border border-indigo-500 text-left"
          >
            A) Eski kararlı sürüme geri dön (Rollback)
          </button>
          <button
            id="btn-hotpatch"
            onClick={() => handleDecision("Canlı sistemde anlık yama uygula (Hot-patch)", "ending")}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-all border border-slate-600 text-left"
          >
            B) Canlı sistemde anlık yama uygula (Hot-patch)
          </button>
        </div>
      </div>

      <TutorChat />
    </div>
  );
}
