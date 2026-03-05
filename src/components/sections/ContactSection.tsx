"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Détection du scroll pour déclencher l'animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // On arrête d'observer une fois l'animation déclenchée
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.2 } // Se déclenche quand 20% de la section est visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="w-full pt-20 pb-20 md:pt-32 md:pb-32 bg-white relative overflow-hidden border-t border-gray-100"
    >
      
      {/* Halo lumineux en arrière-plan (Respiration très lente) */}
      <div className="absolute top-0 right-0 w-full md:w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 animate-[pulse_8s_ease-in-out_infinite]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* COLONNE GAUCHE : Textes et Informations (Apparition en cascade) */}
          <div className="flex flex-col">
            <h2 className={cn(
              "text-brand-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-4 transition-all duration-1000 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              Prêt à innover ?
            </h2>
            
            <h3 className={cn(
              "text-4xl md:text-6xl font-heading font-extrabold tracking-tighter leading-tight text-gray-900 mb-6 transition-all duration-1000 delay-100 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              Discutons de votre prochain <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-[#81B4C9]">projet.</span>
            </h3>
            
            <p className={cn(
              "text-gray-500 text-lg md:text-xl leading-relaxed mb-12 max-w-md font-light transition-all duration-1000 delay-200 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              Notre équipe d'experts est prête à transformer votre vision en une solution digitale performante et sur-mesure.
            </p>

            {/* Cartes d'informations de contact */}
            <div className={cn(
              "flex flex-col gap-8 transition-all duration-1000 delay-300 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <a href="mailto:contact@iwimbigroup.com" className="group flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:-translate-y-1 shadow-sm group-hover:shadow-brand-primary/20 transition-all duration-500">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-widest">Email</h4>
                  <p className="text-gray-500 group-hover:text-brand-primary transition-colors font-medium">contact@iwimbigroup.com</p>
                </div>
              </a>

              <a href="tel:+22900000000" className="group flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:-translate-y-1 shadow-sm group-hover:shadow-brand-primary/20 transition-all duration-500">
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-widest">Téléphone</h4>
                  <p className="text-gray-500 group-hover:text-brand-primary transition-colors font-medium">+229 01 40 27 40 87</p>
                </div>
              </a>

              <div className="group flex items-start gap-5 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:-translate-y-1 shadow-sm group-hover:shadow-brand-primary/20 transition-all duration-500">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-widest">Bureaux</h4>
                  <p className="text-gray-500 font-medium">Cotonou, Bénin</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : Le Formulaire Premium (Apparition globale avec délai) */}
          <div className={cn(
            "relative transition-all duration-[1.2s] delay-500 cubic-bezier(0.16, 1, 0.3, 1)",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          )}>
            {/* Ombre décorative derrière la carte */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-transparent blur-2xl rounded-[3rem] -z-10 translate-y-4 translate-x-4" />
            
            <form className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col gap-6 relative overflow-hidden group/form hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-shadow duration-700">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-gray-900 uppercase tracking-wider pl-1 transition-colors group-focus-within/form:text-brand-primary">Nom complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Jean Dupont"
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 hover:bg-gray-50"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-gray-900 uppercase tracking-wider pl-1 transition-colors group-focus-within/form:text-brand-primary">Email professionnel</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="jean@entreprise.com"
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 hover:bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-xs font-bold text-gray-900 uppercase tracking-wider pl-1 transition-colors group-focus-within/form:text-brand-primary">Sujet du projet</label>
                <input 
                  type="text" 
                  id="subject" 
                  placeholder="Création d'une application mobile, Refonte IA..."
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 hover:bg-gray-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold text-gray-900 uppercase tracking-wider pl-1 transition-colors group-focus-within/form:text-brand-primary">Votre message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  placeholder="Parlez-nous de vos objectifs, de vos contraintes et de votre vision..."
                  className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-4 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 resize-none hover:bg-gray-50"
                />
              </div>

              <button 
                type="button"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative w-full bg-brand-primary text-white py-5 rounded-2xl font-bold text-sm overflow-hidden mt-2 hover:shadow-[0_0_40px_rgba(0,86,210,0.3)] transition-all duration-500 active:scale-[0.98]"
              >
                {/* Reflet lumineux au survol */}
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-100%)] group-hover:[transform:skew(-15deg)_translateX(100%)] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent z-0"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-2.5">
                  Envoyer le message
                  {/* Transition fluide entre l'icône Envoyer et la flèche au survol */}
                  <div className="relative w-5 h-5 overflow-hidden flex items-center justify-center">
                    <Send 
                      size={18} 
                      className={cn("absolute transition-all duration-300", isHovered ? "translate-x-8 opacity-0" : "translate-x-0 opacity-100")} 
                    />
                    <ArrowRight 
                      size={20} 
                      className={cn("absolute transition-all duration-300", isHovered ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0")} 
                    />
                  </div>
                </span>
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}