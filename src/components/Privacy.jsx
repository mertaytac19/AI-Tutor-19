// src/components/Privacy.jsx
import React from "react";
import { useStore } from "../store";
import TutorChat from "./TutorChat";

export default function Privacy() {
  const { addDecision, goToPhase } = useStore();

  const handleDecision = (label) => {
    addDecision({ adim: "gizlilik", secim: label });
    goToPhase("ending");
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-5">
      {/* Başlık */}
      <div>
        <div className="text-xs font-mono text-purple-400 tracking-widest uppercase">Adım 3 / 3 · Gizlilik & KVKK</div>
        <h2 className="text-xl font-bold text-white mt-1">Gizlilik Kararı</h2>
        <p className="text-sm text-slate-400 mt-1">GPS loglarını paylaşmadan önce nasıl işlem yapacaksınız?</p>
      </div>

      {/* Uyarı Banner */}
      <div className="bg-purple-950/40 border border-purple-800/60 rounded-xl p-3 text-xs text-purple-300">
        ⚠️ Ham GPS koordinatları kişisel veri olarak KVKK/GDPR kapsamındadır. Hatalı paylaşım ciddi idari para cezasına yol açabilir.
      </div>

      {/* Seçenekler */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Karar 3 · Veri Gizliliği</p>
        <div className="flex flex-col gap-2">
          <button
            id="btn-anonimize"
            onClick={() => handleDecision("Loglardaki koordinatları maskele (Enlem/Boylam kaldır)")}
            className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all border border-emerald-500 text-left"
          >
            A) Loglardaki koordinatları maskele (Enlem/Boylam kaldır)
          </button>
          <button
            id="btn-ham-log"
            onClick={() => handleDecision("Ham logları doğrudan analiz ekibine aktar")}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-red-950 text-slate-200 text-sm font-semibold rounded-xl transition-all border border-slate-600 hover:border-red-700 text-left"
          >
            B) Ham logları doğrudan analiz ekibine aktar
          </button>
        </div>
      </div>

      <TutorChat />
    </div>
  );
}
