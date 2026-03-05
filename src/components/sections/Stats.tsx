"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const stats = [
  { id: 1, value: "17", suffix: "+", label: "Projets délivrés" },
  { id: 2, value: "98", suffix: "%", label: "Taux de satisfaction" },
  { id: 3, value: "3", suffix: "+", label: "Pays d'intervention" },
  { id: 4, value: "24", suffix: "/7", label: "Support technique" },
];

// Sous-composant intelligent pour gérer le comptage individuel
const StatCounter = ({ stat, index }: { stat: typeof stats[0], index: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // 1. Détecte quand l'élément entre dans l'écran
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Ne s'anime qu'une seule fois
        }
      },
      { threshold: 0.5 } // Se déclenche quand 50% de la carte est visible
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. Animation de comptage fluide (ease-out)
  useEffect(() => {
    if (!isVisible) return;

    const target = parseInt(stat.value, 10);
    if (isNaN(target)) return;

    const duration = 2000; // Durée de l'animation en millisecondes (2 secondes)
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Courbe de Bézier (Ease-out Expo) : démarre vite et ralentit à la fin
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, stat.value]);

  return (
    <div 
      ref={elementRef}
      className={cn(
        "relative flex flex-col items-center text-center group transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Ligne de séparation verticale (visible uniquement sur Desktop) */}
      {index !== 0 && (
        <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-200 group-hover:bg-[#81B4C9] transition-colors duration-500" />
      )}

      {/* Chiffre animé et Suffixe */}
      <div className="flex items-baseline justify-center mb-3">
        <span className="text-5xl md:text-6xl lg:text-7xl font-black text-[#4F5B93] tracking-tighter tabular-nums">
          {count}
        </span>
        {/* Le suffixe (+ ou %) qui palpite doucement avec une aura lumineuse sur mobile */}
        <span className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold text-[#81B4C9] ml-1 transition-all duration-700",
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
          "animate-[pulse_3s_ease-in-out_infinite] lg:animate-none drop-shadow-[0_0_8px_rgba(129,180,201,0.4)]"
        )}
        style={{ transitionDelay: `${index * 150 + 800}ms` }}
        >
          {stat.suffix}
        </span>
      </div>
      
      {/* Label très épuré */}
      <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.2em] group-hover:text-[#4F5B93] transition-colors duration-500">
        {stat.label}
      </div>
    </div>
  );
};

export function StatsSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* Conteneur principal avec effet de lévitation */}
        <div className="relative bg-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 relative">
            {stats.map((stat, index) => (
              <StatCounter key={stat.id} stat={stat} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}