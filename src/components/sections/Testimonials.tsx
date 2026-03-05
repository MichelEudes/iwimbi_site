"use client";

import React, { useRef, useState } from "react";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

// Données factices (à remplacer par vos vrais clients)
const testimonials = [
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

  // Gestion intelligente du scroll pour l'effet Focus sur mobile
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

  return (
    <section id="temoignages" className="w-full pt-20 pb-16 md:pt-32 md:pb-24 bg-[#F8FAFC] overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de la section */}
        <div className="px-6 lg:px-12 mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-brand-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-4">Paroles de clients</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter leading-tight max-w-2xl text-gray-900">
              Ils ont transformé leur vision en <span className="text-brand-primary">réalité.</span>
            </h3>
          </div>
        </div>

        <div className="relative w-full">
          
          {/* Masque de fondu pour le swipe mobile (Effet Premium) */}
          <div className="absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent z-10 pointer-events-none lg:hidden" />

          {/* CONTENEUR SCROLLABLE */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            // Ajout de pt-4 pour laisser de la place à l'animation de translation
            className="flex overflow-x-auto pb-10 pt-4 px-6 gap-6 md:gap-8 snap-x snap-mandatory no-scrollbar lg:grid lg:grid-cols-3 lg:px-12 lg:overflow-visible relative z-0 scroll-smooth"
          >
            {testimonials.map((t, index) => {
              const isActive = index === activeIndex;

              return (
                <div 
                  key={t.id} 
                  className={cn(
                    "min-w-[85vw] md:min-w-0 snap-center relative flex flex-col p-8 md:p-10 rounded-[2.5rem] transition-all duration-700 ease-out origin-bottom",
                    "bg-white border shadow-xl",
                    
                    // DESKTOP : Comportement classique au survol
                    "lg:hover:-translate-y-4 lg:hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] lg:scale-100 lg:opacity-100 lg:blur-0 lg:brightness-100 lg:border-gray-100 lg:translate-y-0",
                    
                    // MOBILE : Animation Ultra Premium (Profondeur de champ)
                    isActive 
                      ? "scale-100 opacity-100 blur-0 brightness-100 border-brand-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.08)] translate-y-0" 
                      : "scale-[0.85] opacity-40 blur-[3px] brightness-90 border-transparent shadow-none translate-y-4"
                  )}
                >
                  {/* L'icône guillemet géante en filigrane */}
                  <Quote className={cn(
                    "absolute top-8 right-8 w-16 h-16 md:w-20 md:h-20 rotate-180 pointer-events-none transition-colors duration-700",
                    isActive ? "text-brand-primary/5" : "text-gray-100",
                    "lg:text-brand-primary/5"
                  )} />
                  
                  {/* Les 5 étoiles dorées (Désaturées si inactives) */}
                  <div className="flex items-center gap-1 mb-6 md:mb-8 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={cn(
                        "transition-colors duration-700",
                        isActive ? "fill-amber-400 text-amber-400" : "fill-gray-300 text-gray-300",
                        "lg:fill-amber-400 lg:text-amber-400"
                      )} />
                    ))}
                  </div>
                  
                  {/* Le Texte du témoignage */}
                  <p className={cn(
                    "text-base md:text-lg leading-relaxed mb-10 flex-grow relative z-10 font-medium transition-colors duration-700",
                    isActive ? "text-gray-700" : "text-gray-400",
                    "lg:text-gray-700"
                  )}>
                    "{t.quote}"
                  </p>
                  
                  {/* L'auteur et l'entreprise */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50 relative z-10">
                    
                    {/* Avatar : Gris si inactif, Coloré si actif */}
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-700 border",
                      isActive 
                        ? "bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 text-brand-primary border-brand-primary/10" 
                        : "bg-gray-50 text-gray-400 border-transparent",
                      "lg:bg-gradient-to-br lg:from-brand-primary/10 lg:to-brand-primary/5 lg:text-brand-primary lg:border-brand-primary/10"
                    )}>
                      {t.initials}
                    </div>
                    
                    <div>
                      <h4 className={cn(
                        "font-bold text-sm md:text-base transition-colors duration-700",
                        isActive ? "text-gray-900" : "text-gray-400",
                        "lg:text-gray-900"
                      )}>
                        {t.name}
                      </h4>
                      <p className={cn(
                        "text-xs font-medium mt-0.5 transition-colors duration-700",
                        isActive ? "text-gray-500" : "text-gray-300",
                        "lg:text-gray-500"
                      )}>
                        {t.role}, <span className={cn(
                          "transition-colors duration-700",
                          isActive ? "text-brand-primary" : "text-gray-400",
                          "lg:text-brand-primary"
                        )}>{t.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Espace vide final pour scroller hors du brouillard sur mobile */}
            <div className="min-w-[24px] shrink-0 lg:hidden" />
          </div>

          {/* 👇 LES POINTS DE PAGINATION (Visibles uniquement sur mobile) 👇 */}
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