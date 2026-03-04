"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function NeuralBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-auto z-0 isolate bg-surface-light">
      
      {/* 1. 🌅 LA LUMIÈRE "AUBE AFRICAINE" (Au lieu d'un motif, on utilise un éclairage magistral) */}
      {/* Aura ambrée/dorée qui monte du bas (La Terre/Le Soleil) */}
      <div className="absolute -bottom-[40%] left-1/2 -translate-x-1/2 w-[120%] h-[80%] rounded-[100%] bg-gradient-to-t from-[#F59E0B]/15 via-[#F59E0B]/5 to-transparent blur-[80px] pointer-events-none"></div>
      
      {/* Aura bleue technologique qui descend du haut (Le Cloud/L'Innovation) */}
      <div className="absolute -top-[30%] -left-[10%] w-[80%] h-[80%] rounded-full bg-brand-primary/10 blur-[130px] animate-blob pointer-events-none"></div>
      <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/5 blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* 2. LE RÉSEAU DE NEURONES (Épuré et ultra-fluide) */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 h-full w-full z-10"
        options={{
          fullScreen: { enable: false, zIndex: 0 },
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
            },
            modes: {
              grab: {
                distance: 300,
                // Le lien avec la souris est un dégradé implicite (or vif)
                links: { opacity: 0.8, color: "#F59E0B" }, 
              },
            },
          },
          particles: {
            // Mélange de couleurs : Bleu Tech, Or, et Ambre foncé
            color: { value: ["#0056D2", "#F59E0B", "#B45309", "#1E293B"] }, 
            links: {
              color: "#9CA3AF", // Gris très doux pour ne pas surcharger
              distance: 160,
              enable: true,
              opacity: 0.25,
              width: 1.2,
            },
            move: {
              enable: true,
              speed: 0.6, // Mouvement très majestueux
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "bounce" },
            },
            number: {
              density: { enable: true, area: 800 },
              value: 70, 
            },
            opacity: { value: 0.6 },
            shape: { type: "circle" },
            size: { value: { min: 1.5, max: 3.5 } },
          },
          detectRetina: true,
        }}
      />
      
      {/* 3. TEXTURE (Grain photographique pour casser le côté "plastique" du digital) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-20"></div>
    </div>
  );
}