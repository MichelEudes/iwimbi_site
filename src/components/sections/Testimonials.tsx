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

  // Gestion intelligente du scroll pour les points de pagination sur mobile
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
            className="flex overflow-x-auto pb-8 px-6 gap-6 md:gap-8 snap-x snap-mandatory no-scrollbar lg:grid lg:grid-cols-3 lg:px-12 lg:overflow-visible relative z-0 scroll-smooth"
          >
            {testimonials.map((t) => (
              <div 
                key={t.id} 
                className={cn(
                  "min-w-[85vw] md:min-w-0 snap-center relative flex flex-col p-8 md:p-10 rounded-[2.5rem] transition-all duration-500",
                  "bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                  "hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
                )}
              >
                {/* L'icône guillemet géante en filigrane (Élégance Éditoriale) */}
                <Quote className="absolute top-8 right-8 text-brand-primary/5 w-16 h-16 md:w-20 md:h-20 rotate-180 pointer-events-none" />
                
                {/* Les 5 étoiles dorées */}
                <div className="flex items-center gap-1 mb-6 md:mb-8 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                {/* Le Texte du témoignage */}
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-10 flex-grow relative z-10 font-medium">
                  "{t.quote}"
                </p>
                
                {/* L'auteur et l'entreprise */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-50 relative z-10">
                  {/* Avatar (Généré avec les initiales pour un look propre) */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 flex items-center justify-center text-brand-primary font-bold text-sm border border-brand-primary/10 shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base">{t.name}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{t.role}, <span className="text-brand-primary">{t.company}</span></p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Espace vide final pour scroller hors du brouillard sur mobile */}
            <div className="min-w-[24px] shrink-0 lg:hidden" />
          </div>

          {/* 👇 LES POINTS DE PAGINATION (Visibles uniquement sur mobile) 👇 */}
          <div className="flex justify-center items-center gap-2 mt-2 lg:hidden">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-out",
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