"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Code2, Cpu, Palette, TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { id: "dev", title: "Web & Mobile", icon: Code2, accent: "hover:shadow-blue-500/10", desc: "Applications scalables avec Next.js et React Native." },
  { id: "ia", title: "Intelligence Artificielle", icon: Cpu, accent: "hover:shadow-amber-500/10", desc: "IA générative et automatisation avancée." },
  { id: "design", title: "Design UI/UX", icon: Palette, accent: "hover:shadow-purple-500/10", desc: "Interfaces pixel-perfect et identités fortes." },
  { id: "com", title: "Communication", icon: TrendingUp, accent: "hover:shadow-emerald-500/10", desc: "SEO et stratégies de croissance digitale." },
];

export function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fonction intelligente qui calcule quelle carte est au centre de l'écran lors du scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    // On analyse la position de chaque carte
    Array.from(container.children).forEach((child, index) => {
      if (index >= services.length) return; // On ignore l'espace vide à la fin
      
      const childElement = child as HTMLElement;
      const childCenter = childElement.offsetLeft + childElement.clientWidth / 2;
      const distance = Math.abs(scrollCenter - childCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <section id="services" className="w-full pt-20 pb-12 md:pt-32 md:pb-20 bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="px-6 lg:px-12 mb-10 md:mb-16">
          <h2 className="text-brand-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-4">Nos Expertises</h2>
          <h3 className="text-3xl md:text-6xl font-heading font-extrabold tracking-tighter leading-tight max-w-3xl">
            Des solutions conçues pour <span className="text-brand-primary">l'excellence.</span>
          </h3>
        </div>

        <div className="relative w-full">
          
          {/* L'Astuce Premium : Un dégradé blanc sur le bord droit (uniquement sur mobile) */}
          <div className="absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none lg:hidden" />

          {/* CONTENEUR SCROLLABLE */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto pb-6 px-6 gap-6 snap-x snap-mandatory no-scrollbar lg:grid lg:grid-cols-4 lg:px-12 lg:overflow-visible relative z-0 scroll-smooth"
          >
            {services.map((s) => (
              <Link 
                key={s.id} 
                href={`/services/${s.id}`} 
                className={cn(
                  "min-w-[85vw] md:min-w-0 snap-center group relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500",
                  "bg-white border border-gray-100 shadow-xl shadow-black/[0.02]",
                  "hover:-translate-y-3 hover:shadow-2xl", s.accent
                )}
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-10 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <s.icon size={28} strokeWidth={1.5} />
                </div>
                
                <h4 className="text-2xl font-bold text-text-main mb-4 group-hover:text-brand-primary transition-colors">{s.title}</h4>
                <p className="text-text-muted text-sm leading-relaxed mb-10 flex-grow">{s.desc}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 group-hover:text-brand-primary transition-colors">Explorer</span>
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-brand-primary group-hover:translate-x-2 transition-all" />
                </div>
              </Link>
            ))}
            
            {/* Espace vide final pour scroller hors du brouillard sur mobile */}
            <div className="min-w-[24px] shrink-0 lg:hidden" />
          </div>

          {/* 👇 LES POINTS DE PAGINATION (Visibles uniquement sur mobile) 👇 */}
          <div className="flex justify-center items-center gap-2 mt-2 lg:hidden">
            {services.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-out",
                  activeIndex === index 
                    ? "w-8 bg-brand-primary" // Point actif : s'allonge et prend la couleur de la marque
                    : "w-1.5 bg-gray-200"    // Point inactif : petit et gris clair
                )}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}