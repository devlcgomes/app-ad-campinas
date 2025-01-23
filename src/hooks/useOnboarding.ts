import { useState } from "react";

export const useOnboarding = () => {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    // Verifica no localStorage se já viu o onboarding
    return localStorage.getItem("hasSeenOnboarding") === "true";
  });

  const completeOnboarding = () => {
    // Marca como visto no localStorage
    localStorage.setItem("hasSeenOnboarding", "true");
    setHasSeenOnboarding(true);
  };

  const resetOnboarding = () => {
    // Remove a marcação (útil para testes ou reset)
    localStorage.removeItem("hasSeenOnboarding");
    setHasSeenOnboarding(false);
  };

  return {
    hasSeenOnboarding,
    completeOnboarding,
    resetOnboarding,
  };
};
