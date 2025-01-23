import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Onboarding.css";

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Gerencie Sua Banda",
      description:
        "Organize ensaios, eventos e apresentações de forma simples e eficiente",
      icon: "/images/band-management.svg",
      features: [
        { icon: "🎵", text: "Agenda compartilhada" },
        { icon: "🎸", text: "Setlists" },
        { icon: "🎼", text: "Repertório" },
      ],
    },
    {
      title: "Compartilhe Partituras",
      description:
        "Mantenha todo o material musical organizado e acessível para sua equipe",
      icon: "/images/sheet-music.svg",
      features: [
        { icon: "📱", text: "Acesso offline" },
        { icon: "🎹", text: "Cifras e tablaturas" },
        { icon: "📝", text: "Anotações" },
      ],
    },
    {
      title: "Comunique-se",
      description: "Mantenha todos alinhados com comunicação em tempo real",
      icon: "/images/team-chat.svg",
      features: [
        { icon: "💬", text: "Chat em grupo" },
        { icon: "📅", text: "Confirmação de presença" },
        { icon: "🎯", text: "Metas" },
      ],
    },
  ];

  return (
    <div className="onboarding-container">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          className="onboarding-step"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={slides[step].icon}
            alt={slides[step].title}
            className="onboarding-image"
          />

          <h1>{slides[step].title}</h1>
          <p>{slides[step].description}</p>

          <div className="features-list">
            {slides[step].features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-text">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="navigation">
            <div className="dots">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === step ? "active" : ""}`}
                />
              ))}
            </div>
            <button
              className="next-button"
              onClick={() => {
                if (step === slides.length - 1) {
                  onComplete();
                } else {
                  setStep(step + 1);
                }
              }}
            >
              Próximo
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
