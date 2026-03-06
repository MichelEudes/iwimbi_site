"use client";

import React, { useRef, useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

// L'interface stricte
interface TestimonialData {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

// Données factices
const testimonials: TestimonialData[] = [
  { 
    id: 1, 
    quote: "Une équipe brillante qui a su transformer notre vision complexe en une plateforme fluide et ultra-performante. Leur maîtrise technique est tout simplement impressionnante.", 
    name: "Aminata Diallo", 
    role: "Directrice Innovation", 
    company: "FinTech Africa",
    initials: "AD"
  },
  { 
    id: 2, 
    quote: "L'intégration de l'IA dans nos processus a décuplé notre productivité. Iwimbi n'est pas qu'un simple prestataire, c'est un véritable partenaire stratégique pour notre croissance.", 
    name: "Jean-Marc Laurent", 
    role: "CEO", 
    company: "LogisTech Solutions",
    initials: "JL"
  },
  { 
    id: 3, 
    quote: "Design premium, code impeccable et respect strict des délais. C'est de loin la meilleure agence tech avec laquelle nous avons eu l'occasion de collaborer cette année.", 
    name: "Sarah Koné", 
    role: "Fondatrice", 
    company: "E-Health App",
    initials: "SK"
  }
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      if (index >= testimonials.length) return;
      
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

  useEffect(() => {
    if (scrollRef.current && window.innerWidth < 1024) {
      setTimeout(() => {
        handleScroll();
      }, 100);
    }
  }, []);

  return (
    <section id="temoignages" className="w-full pt-20 pb-16 md:pt-32 md:pb-24 bg-[#F8FAFC] overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="px-6 lg:px-12 mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-brand-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-4">Paroles de clients</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter leading-tight max-w-2xl text-gray-900">
              Ils ont transformé leur vision en <span className="text-brand-primary">réalité.</span>
            </h3>
          </div>
        </div>

        <div className="relative w-full">
          
          <div className="absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-10 pointer-events-none lg:hidden" />

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto pb-10 pt-4 px-6 gap-6 md:gap-8 snap-x snap-mandatory no-scrollbar lg:grid lg:grid-cols-3 lg:px-12 lg:overflow-visible relative z-0 scroll-smooth"
          >
            {testimonials.map((t, index) => {
              const isActive = index === activeIndex;

              return (
                <div 
                  key={t.id} 
                  className={cn(
                    "min-w-[85vw] md:min-w-0 snap-center relative flex flex-col p-8 md:p-10 rounded-[2.5rem] transition-all duration-700 ease-out origin-bottom bg-white border",
                    "lg:shadow-xl lg:scale-100 lg:opacity-100 lg:border-gray-100 lg:translate-y-0",
                    "lg:hover:-translate-y-4 lg:hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]",
                    isActive 
                      ? "max-lg:scale-100 max-lg:opacity-100 max-lg:blur-none max-lg:brightness-100 max-lg:border-brand-primary/20 max-lg:shadow-[0_20px_40px_rgba(0,0,0,0.08)] max-lg:translate-y-0" 
                      : "max-lg:scale-[0.85] max-lg:opacity-40 max-lg:blur-[3px] max-lg:brightness-90 max-lg:border-transparent max-lg:shadow-none max-lg:translate-y-4"
                  )}
                >
                  <Quote className={cn(
                    "absolute top-8 right-8 w-16 h-16 md:w-20 md:h-20 rotate-180 pointer-events-none transition-colors duration-700",
                    "lg:text-brand-primary/5",
                    isActive ? "max-lg:text-brand-primary/5" : "max-lg:text-gray-100"
                  )} />
                  
                  <div className="flex items-center gap-1 mb-6 md:mb-8 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={cn(
                        "transition-colors duration-700",
                        "lg:fill-amber-400 lg:text-amber-400",
                        isActive ? "max-lg:fill-amber-400 max-lg:text-amber-400" : "max-lg:fill-gray-300 max-lg:text-gray-300"
                      )} />
                    ))}
                  </div>
                  
                  <p className={cn(
                    "text-base md:text-lg leading-relaxed mb-10 flex-grow relative z-10 font-medium transition-colors duration-700",
                    "lg:text-gray-700",
                    isActive ? "max-lg:text-gray-700" : "max-lg:text-gray-400"
                  )}>
                    "{t.quote}"
                  </p>
                  
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50 relative z-10">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-700 border",
                      "lg:bg-gradient-to-br lg:from-brand-primary/10 lg:to-brand-primary/5 lg:text-brand-primary lg:border-brand-primary/10",
                      isActive 
                        ? "max-lg:bg-gradient-to-br max-lg:from-brand-primary/10 max-lg:to-brand-primary/5 max-lg:text-brand-primary max-lg:border-brand-primary/10" 
                        : "max-lg:bg-gray-50 max-lg:text-gray-400 max-lg:border-transparent"
                    )}>
                      {t.initials}
                    </div>
                    
                    <div>
                      <h4 className={cn(
                        "font-bold text-sm md:text-base transition-colors duration-700",
                        "lg:text-gray-900",
                        isActive ? "max-lg:text-gray-900" : "max-lg:text-gray-400"
                      )}>
                        {t.name}
                      </h4>
                      <p className={cn(
                        "text-xs font-medium mt-0.5 transition-colors duration-700",
                        "lg:text-gray-500",
                        isActive ? "max-lg:text-gray-500" : "max-lg:text-gray-300"
                      )}>
                        {t.role}, <span className={cn(
                          "transition-colors duration-700",
                          "lg:text-brand-primary",
                          isActive ? "max-lg:text-brand-primary" : "max-lg:text-gray-400"
                        )}>
                          {/* 🚨 LA LIGNE MAGIQUE POUR VERCEL */}
                          {/* @ts-ignore */}
                          {t.company}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="min-w-[24px] shrink-0 lg:hidden" />
          </div>

          <div className="flex justify-center items-center gap-2 mt-4 lg:hidden">
            {testimonials.map((_, index) => (
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