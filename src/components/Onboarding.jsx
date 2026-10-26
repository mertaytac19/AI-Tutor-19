// src/components/Onboarding.jsx
import React, { useState } from "react";
import { useStore } from "../store";

const SORULAR = [
  {
    id: "experience",
    label: "Deneyim Seviyesi",
    options: [
      { value: "low",  label: "🟢 Yeni Başlayan" },
      { value: "high", label: "🔴 Deneyimli" },
    ],
  },
  {
    id: "role",
    label: "Mevcut Rol",
    options: [
      { value: "devops", label: "⚙️ DevOps Mühendisi" },
      { value: "sre",    label: "🛡️ SRE (Site Güvenilirlik)" },
      { value: "infra",  label: "🏗️ Altyapı Mühendisi" },
    ],
  },
  {
    id: "goal",
    label: "Öğrenme Hedefi",
    options: [
      { value: "fix",   label: "🔧 Race Condition Çözmek" },
      { value: "opt",   label: "📈 Sistem Optimizasyonu" },
      { value: "learn", label: "📚 Eşzamanlılık Desenleri" },
    ],
  },
];

export default function Onboarding() {
  const { setProfile, goToPhase, startTimer } = useStore();
  const [answers, setAnswers] = useState({});

  const handleSelect = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const canProceed = SORULAR.every((q) => answers[q.id]);

  const handleContinue = () => {
    const profile = {
      experience: answers.experience,
      role: answers.role,
      goal: answers.goal,
    };
    setProfile(profile);
    if (profile.experience === "high") startTimer();
    goToPhase("crisis");
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-6">
      {/* Başlık */}
      <div className="text-center space-y-1">
        <div className="text-xs font-mono text-cyan-400 tracking-widest uppercase">03:42 AM · Acil Kriz</div>
        <h1 className="text-2xl font-bold text-white">Hoş Geldin, Nöbetçi Mühendis</h1>
        <p className="text-sm text-slate-400">03:42 AM krizini yönetmek için uzmanlık seviyeni ve hedefini seç.</p>
      </div>

      {/* Sorular */}
      {SORULAR.map((q) => (
        <div key={q.id} className="space-y-2">
          <p className="text-sm font-semibold text-slate-300">{q.label}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((o) => {
              const isSelected = answers[q.id] === o.value;
              return (
                <button
                  key={o.value}
                  onClick={() => handleSelect(q.id, o.value)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
                    isSelected
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/40"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-white"
                  }`}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Devam Et */}
      <button
        id="btn-devam-et"
        disabled={!canProceed}
        onClick={handleContinue}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
          canProceed
            ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/40"
            : "bg-slate-700 text-slate-500 cursor-not-allowed"
        }`}
      >
        {canProceed ? "Krize Gir →" : "Devam Et (3 seçim gerekli)"}
      </button>
    </div>
  );
}
