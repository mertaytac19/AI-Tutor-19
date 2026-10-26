// src/App.jsx
import React from "react";
import { useStore } from "./store";
import Onboarding from "./components/Onboarding";
import CrisisRoom from "./components/CrisisRoom";
import Concurrency from "./components/Concurrency";
import Privacy from "./components/Privacy";
import Ending from "./components/Ending";

function App() {
  const { phase } = useStore();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-4">
      <div className="w-full max-w-md">
        {phase === "onboarding" && <Onboarding />}
        {phase === "crisis"     && <CrisisRoom />}
        {phase === "concurrency"&& <Concurrency />}
        {phase === "privacy"    && <Privacy />}
        {phase === "ending"     && <Ending />}
      </div>
    </div>
  );
}

export default App;
