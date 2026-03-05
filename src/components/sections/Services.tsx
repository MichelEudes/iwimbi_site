"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Code2, Cpu, Palette, TrendingUp, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { 
    id: "dev", 
    title: "Web & Mobile", 
    icon: Code2, 
    accent: "hover:shadow-blue-500/10", 
    desc: "Applications sur-mesure et robustes (React, Flutter, Node.js, Python...)." 
  },
  { id: "ia", title: "Intelligence Artificielle", icon: Cpu, accent: "hover:shadow-amber-500/10", desc: "IA générative et automatisation avancée." },
  { id: "design", title: "Design UI/UX", icon: Palette, accent: "hover:shadow-purple-500/10", desc: "Interfaces pixel-perfect et identités fortes." },
  { id: "com", title: "Communication", icon: TrendingUp, accent: "hover:shadow-emerald-500/10", desc: "SEO et stratégies de croissance digitale." },
];

export function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      if (index >= services.length) return; 
      
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

  // Initialisation au chargement (comme sur les témoignages)
  useEffect(() => {
    if (scrollRef.current && window.innerWidth < 1024) {
      setTimeout(() => {
        handleScroll();
      }, 100);
    }
  }, []);

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
          
          {/* CONTENEUR SCROLLABLE - Alignement exact sur les Témoignages (px-[9vw], gap-4) */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto pb-10 pt-4 px-[9vw] gap-4 md:gap-8 snap-x snap-mandatory no-scrollbar lg:grid lg:grid-cols-4 lg:px-12 lg:overflow-visible relative z-0 scroll-smooth"
          >
            {services.map((s, index) => {
              const isActive = index === activeIndex;

              return (
                <Link 
                  key={s.id} 
                  href={`/services#${s.id}`} // 🚨 MODIFICATION ICI : Création dynamique de l'ancre
                  className={cn(
                    // min-w-[82vw] pour le léger aperçu
                    "min-w-[82vw] md:min-w-0 snap-center group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] transition-all duration-700 ease-out origin-center",
                    "bg-white border shadow-xl",
                    
                    // DESKTOP : Comportement classique au survol
                    "lg:hover:-translate-y-4 lg:hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] lg:scale-100 lg:opacity-100 lg:blur-0 lg:brightness-100 lg:border-gray-100 lg:translate-y-0 lg:z-10",
                    
                    // MOBILE : Animation Ultra Premium (Profondeur de champ)
                    isActive 
                      ? "scale-100 opacity-100 blur-0 brightness-100 border-brand-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.08)] translate-y-0 z-10" 
                      : "scale-[0.92] opacity-40 blur-[3px] brightness-90 border-transparent shadow-none translate-y-4 z-0",
                    
                    s.accent
                  )}
                >
                  {/* ICÔNE */}
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 md:mb-10 transition-all duration-700",
                    isActive ? "bg-brand-primary/10 text-brand-primary" : "bg-gray-100 text-gray-300",
                    "lg:bg-brand-primary/10 lg:text-brand-primary lg:group-hover:bg-brand-primary lg:group-hover:text-white"
                  )}>
                    <s.icon size={28} strokeWidth={1.5} />
                  </div>
                  
                  {/* TITRE */}
                  <h4 className={cn(
                    "text-2xl font-bold mb-4 transition-colors duration-700",
                    isActive ? "text-gray-900" : "text-gray-400",
                    "lg:text-gray-900 lg:group-hover:text-brand-primary"
                  )}>
                    {s.title}
                  </h4>
                  
                  {/* PARAGRAPHE */}
                  <p className={cn(
                    "text-sm md:text-base leading-relaxed mb-10 flex-grow font-medium transition-colors duration-700",
                    isActive ? "text-gray-600" : "text-gray-400",
                    "lg:text-gray-600"
                  )}>
                    {s.desc}
                  </p>
                  
                  {/* BOUTON EXPLORER */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className={cn(
                      "text-[10px] font-black tracking-widest uppercase transition-colors duration-700",
                      isActive ? "text-gray-400" : "text-gray-200",
                      "lg:text-gray-400 lg:group-hover:text-brand-primary"
                    )}>
                      Explorer
                    </span>
                    <ArrowRight size={20} className={cn(
                      "transition-all duration-700",
                      isActive ? "text-gray-400" : "text-gray-200",
                      "lg:text-gray-400 lg:group-hover:text-brand-primary lg:group-hover:translate-x-2"
                    )} />
                  </div>
                </Link>
              );
            })}
            
            {/* Espace vide final pour scroller jusqu'au bout sur mobile */}
            <div className="min-w-[24px] shrink-0 lg:hidden" />
          </div>

          {/* POINTS DE PAGINATION */}
          <div className="flex justify-center items-center gap-2 mt-4 lg:hidden">
            {services.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-700 ease-out",
                  activeIndex === index 
                    ? "w-8 bg-brand-primary" 
                    : "w-1.5 bg-gray-200" 
                )}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}