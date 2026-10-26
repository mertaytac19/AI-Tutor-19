// src/components/Concurrency.jsx
import React from "react";
import { useStore } from "../store";
import TutorChat from "./TutorChat";

export default function Concurrency() {
  const { addDecision, goToPhase } = useStore();

  const handleDecision = (label) => {
    addDecision({ adim: "eszamanlilik", secim: label });
    goToPhase("privacy");
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-5">
      {/* Başlık */}
      <div>
        <div className="text-xs font-mono text-amber-400 tracking-widest uppercase">Adım 2 / 3 · Eşzamanlılık</div>
        <h2 className="text-xl font-bold text-white mt-1">Eşzamanlılık Kararı</h2>
        <p className="text-sm text-slate-400 mt-1">Çift dağıtım isteklerini önlemek için bir strateji seç.</p>
      </div>

      {/* Seçenekler */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Karar 2 · Eşzamanlılık Yönetimi</p>
        <div className="flex flex-col gap-2">
          <button
            id="btn-mutex"
            onClick={() => handleDecision("Mutex / Redis Kilit mekanizması ekle")}
            className="w-full py-3 px-4 bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all border border-indigo-500 text-left"
          >
            A) Mutex / Redis Kilit mekanizması ekle
          </button>
          <button
            id="btn-kuyruk"
            onClick={() => handleDecision("İstekleri kuyruk izolasyonu ile sıraya al")}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-all border border-slate-600 text-left"
          >
            B) İstekleri kuyruk izolasyonu ile sıraya al
          </button>
        </div>
      </div>

      <TutorChat />
    </div>
  );
}
