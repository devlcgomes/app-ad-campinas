import React, { useState } from "react";
import { Onboarding } from "./components/Onboarding/Onboarding";
import { Dashboard } from "./components/Dashboard/Dashboard";
import "./App.css";

const App: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Verifica se já viu o onboarding
    return !localStorage.getItem("hasSeenOnboarding");
  });

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  return (
    <div>
      {showOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;
