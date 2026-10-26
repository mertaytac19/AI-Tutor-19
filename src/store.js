// src/store.js
import create from 'zustand';

const initialState = {
  phase: 'onboarding',
  profile: { experience: null, role: null, goal: null },
  decisions: [],
  timer: null,
};

export const useStore = create((set, get) => ({
  ...initialState,

  // Reset — Yeniden Oyna butonu bunu çağırır
  resetGame: () => set({ ...initialState, timer: null }),

  // Sayacı başlat (60 saniye)
  startTimer: () => {
    set({ timer: 60 });
    const tick = () => {
      const current = get().timer;
      if (current > 0) {
        set({ timer: current - 1 });
        setTimeout(tick, 1000);
      }
    };
    tick();
  },

  // Faz geçişi
  goToPhase: (newPhase) => set({ phase: newPhase }),

  // Profil kaydet
  setProfile: (profile) => set({ profile }),

  // Karar ekle
  addDecision: (decision) =>
    set({ decisions: [...get().decisions, decision] }),
}));
