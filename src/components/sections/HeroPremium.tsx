"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

import { NeuralBackground } from "@/components/ui/NeuralBackground";

export function HeroPremium() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAnimationDelay = (index: number) => {
    return mounted ? { animationDelay: `${index * 150}ms` } : { opacity: 0 };
  };

  return (
    <section className="relative w-full px-4 pt-24 pb-6 md:pt-32 md:pb-8 overflow-hidden flex flex-col items-center min-h-[100svh] bg-transparent isolate z-0">
      
      <NeuralBackground />

      <div className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-6xl relative z-10 pointer-events-none">
        
        {/* BADGE : Ajout de animate-[pulse_4s_ease-in-out_infinite] pour qu'il respire tout seul */}
        <div 
          className={cn(
            "pointer-events-auto relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 md:mb-10 opacity-0 overflow-hidden",
            "bg-surface-light/30 backdrop-blur-md border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
            mounted && "animate-fade-in-up-blur animate-[pulse_4s_ease-in-out_infinite]"
          )}
          style={getAnimationDelay(1)}
        >
          {/* L'éclair d'argent passe maintenant en continu (animate-[shimmer_3s_infinite]) au lieu d'attendre le hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"></div>
          <Sparkles size={16} className="text-brand-accent animate-pulse" />
          <span className="text-sm font-semibold text-text-muted tracking-wide z-10">
            L'excellence technologique pour <span className="text-brand-primary font-bold">l'Afrique</span>
          </span>
        </div>

        <div className="relative mb-6 md:mb-10 w-full flex justify-center">
          {/* Le Halo derrière le titre est maintenant pulsant sur mobile pour donner de la vie */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-brand-primary/20 blur-[60px] md:blur-[80px] -z-10 rounded-full animate-[pulse_6s_ease-in-out_infinite]"></div>
          
          <h1 
            className={cn(
              "max-w-5xl text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-extrabold text-text-main tracking-tighter leading-[1.05] md:leading-[0.92] opacity-0",
              mounted && "animate-fade-in-up-blur"
            )}
            style={getAnimationDelay(2)}
          >
            L'innovation digitale <br className="hidden md:block" />
            au service de <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary selection:text-brand-primary drop-shadow-sm animate-text-gradient">votre croissance</span>
          </h1>
        </div>

        <p 
          className={cn(
            "max-w-3xl text-lg md:text-xl lg:text-2xl text-text-muted mb-10 md:mb-12 font-light leading-relaxed opacity-0",
            mounted && "animate-fade-in-up-blur"
          )}
          style={getAnimationDelay(3)}
        >
          Iwimbi Group propulse les PME, startups et institutions africaines vers le leadership numérique grâce au <span className="font-medium text-text-main">développement sur-mesure</span> et à l'Intelligence Artificielle.
        </p>

        <div 
          className={cn(
            "pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto opacity-0",
            mounted && "animate-fade-in-up-blur"
          )}
          style={getAnimationDelay(4)}
        >
          {/* BOUTON PRINCIPAL : Ajout d'une ombre qui respire sur mobile et "active:scale-95" pour l'effet de clic physique */}
          <Button variant="primary" size="lg" className="w-full sm:w-auto relative overflow-hidden border-t border-white/20 shadow-[0_0_20px_rgba(0,86,210,0.3)] animate-[pulse_3s_ease-in-out_infinite] active:scale-95 transition-all duration-300" asChild>
            <Link href="/contact">
              {/* Le reflet sur le bouton passe en boucle lente */}
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-100%)] animate-[shimmer_4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="relative z-10 flex items-center gap-2.5">
                Démarrer votre projet
                {/* La flèche fait de petits à-coups continus pour inviter au clic */}
                <ArrowRight className="w-5 h-5 animate-[bounce-x_2s_infinite]" strokeWidth={2.5} />
              </span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="lg" className="w-full sm:w-auto text-text-main border border-gray-200 bg-white/50 backdrop-blur-md active:bg-gray-50 active:scale-95 transition-all duration-300" asChild>
            <Link href="/realisations">
              Voir nos réalisations
            </Link>
          </Button>
        </div>

      </div>

      <div 
        className={cn(
          "relative flex flex-col items-center gap-2 md:gap-3 opacity-0 pointer-events-none mt-8 shrink-0",
          mounted && "animate-fade-in-up-blur"
        )}
        style={getAnimationDelay(6)}
      >
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-text-muted/60 font-medium">
          Découvrir
        </span>
        {/* J'ai épaissi un peu la ligne (w-[2px]) pour qu'elle soit plus visible sur les écrans très denses (Retina) */}
        <div className="w-[2px] h-8 md:h-12 bg-gray-200/50 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-brand-primary to-transparent animate-scroll-light"></div>
        </div>
      </div>

    </section>
  );
}