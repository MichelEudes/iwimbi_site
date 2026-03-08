"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { NeuralBackground } from "@/components/ui/NeuralBackground";

export function HeroPremium() {
  const [mounted, setMounted] = useState(false);
  
  // ÉTAT POUR LE TEXTE ROTATIF
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimatingWord, setIsAnimatingWord] = useState(false);
  const rotatingWords = [
    "votre vision", 
    "votre réussite", 
    "votre ambition", 
    "votre impact"
  ];

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setIsAnimatingWord(true);
      setTimeout(() => {
        setWordIndex((current) => (current + 1) % rotatingWords.length);
        setIsAnimatingWord(false);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const getAnimationDelay = (index: number) => {
    return mounted ? { animationDelay: `${index * 150}ms` } : { opacity: 0 };
  };

  return (
    <section className="relative w-full px-4 pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden flex flex-col items-center min-h-[100svh] bg-transparent isolate z-0">
      
      <NeuralBackground />

      {/* =========================================
          1. CARTES FLOTTANTES (VERSION MOBILE) 
          Ingénierie spatiale : Placées dans les "Safe Zones"
          ========================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 lg:hidden">
        
        {/* CARTE GAUCHE : Caleée en haut à gauche, à côté du badge */}
        <div className="flex absolute top-[8%] sm:top-[12%] left-[-5%] sm:left-[2%] flex-col gap-2 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-[float_6s_ease-in-out_infinite] rotate-[-6deg] origin-left scale-[0.80] sm:scale-100 transition-all duration-500">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-brand-primary/10 rounded-xl">
              <Code2 className="w-5 h-5 text-brand-primary" />
            </div>
            <div className="pr-3">
              <p className="text-[10px] font-black text-brand-primary/80 uppercase tracking-[0.2em] mb-0.5">Architecture</p>
              <p className="text-sm font-extrabold text-gray-900 leading-none">Code & IA</p>
            </div>
          </div>
        </div>

        {/* CARTE DROITE : Calée en bas à droite, entre les boutons et le scroll */}
        <div className="flex absolute bottom-[10%] sm:bottom-[15%] right-[-5%] sm:right-[2%] flex-col gap-3 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)] animate-[float_7s_ease-in-out_infinite_reverse] rotate-[6deg] origin-right scale-[0.80] sm:scale-100 transition-all duration-500">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-amber-500/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div className="pr-3">
              <p className="text-[10px] font-black text-amber-600/80 uppercase tracking-[0.2em] mb-0.5">Performance</p>
              <p className="text-sm font-extrabold text-gray-900 leading-none">+120% ROI</p>
            </div>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-gradient-to-r from-brand-primary to-amber-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* =========================================
          2. CARTES FLOTTANTES (VERSION ORDINATEUR)
          Glassmorphism premium avec beaucoup d'espace
          ========================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 hidden lg:block">
        
        {/* CARTE GAUCHE */}
        <div className="absolute top-[20%] left-[5%] flex flex-col gap-3 p-5 rounded-[1.5rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.06)] animate-[float_6s_ease-in-out_infinite] rotate-[-4deg] transition-transform hover:scale-105 duration-500">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-primary/15 rounded-xl">
              <Code2 className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black text-brand-primary/80 uppercase tracking-[0.2em] mb-0.5">Architecture</p>
              <p className="text-base font-extrabold text-gray-900 tracking-tight">Code & IA</p>
            </div>
          </div>
        </div>

        {/* CARTE DROITE */}
        <div className="absolute bottom-[25%] right-[5%] flex flex-col gap-4 p-5 rounded-[1.5rem] bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_20px_40px_rgba(0,0,0,0.06)] animate-[float_7s_ease-in-out_infinite_reverse] rotate-[3deg] transition-transform hover:scale-105 duration-500">
          <div className="flex items-center gap-4 mb-1">
            <div className="p-3 bg-amber-500/15 rounded-xl">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] font-black text-amber-600/80 uppercase tracking-[0.2em] mb-0.5">Performance</p>
              <p className="text-base font-extrabold text-gray-900 tracking-tight">+120% ROI</p>
            </div>
          </div>
          <div className="w-40 h-2 bg-gray-200/60 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-gradient-to-r from-brand-primary to-amber-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* =========================================
          CONTENU PRINCIPAL DU HERO (z-10)
          ========================================= */}
      <div className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-6xl relative z-10 pointer-events-none px-2 mt-8 md:mt-0">
        
        <div 
          className={cn(
            "pointer-events-auto relative inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-6 md:mb-10 opacity-0 overflow-hidden",
            "bg-surface-light/30 backdrop-blur-md border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
            mounted && "animate-fade-in-up-blur animate-[pulse_4s_ease-in-out_infinite]" 
          )}
          style={getAnimationDelay(1)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"></div>
          <Sparkles size={16} className="text-brand-accent animate-pulse" />
          <span className="text-sm font-semibold text-text-muted tracking-wide z-10">
            L'excellence technologique pour <span className="text-brand-primary font-bold">l'Afrique</span>
          </span>
        </div>

        <div className="relative mb-6 md:mb-10 w-full flex justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-brand-primary/20 blur-[60px] md:blur-[80px] -z-10 rounded-full animate-[pulse_6s_ease-in-out_infinite]"></div>
          
          <h1 
            className={cn(
              "max-w-5xl text-4xl md:text-6xl lg:text-[4.5rem] font-heading font-extrabold text-text-main tracking-tighter leading-[1.1] md:leading-[1.05] opacity-0",
              mounted && "animate-fade-in-up-blur"
            )}
            style={getAnimationDelay(2)}
          >
            L'innovation digitale <br className="hidden md:block" />
            au service de{" "}
            <span className="relative inline-flex flex-col h-[1.1em] overflow-hidden align-top">
              <span 
                className={cn(
                  "block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary selection:text-brand-primary drop-shadow-sm animate-text-gradient transition-all duration-500 ease-in-out",
                  isAnimatingWord ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
                )}
              >
                {rotatingWords[wordIndex]}
              </span>
            </span>
          </h1>
        </div>

        <p 
          className={cn(
            "max-w-3xl text-lg md:text-xl lg:text-2xl text-text-muted mb-10 md:mb-12 font-light leading-relaxed opacity-0 mt-4 md:mt-2",
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
          <Button variant="primary" size="lg" className="w-full sm:w-auto relative overflow-hidden border-t border-white/20 shadow-[0_0_20px_rgba(0,86,210,0.3)] animate-[pulse_3s_ease-in-out_infinite] active:scale-95 transition-all duration-300" asChild>
            <Link href="/contact">
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-100%)] animate-[shimmer_4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <span className="relative z-10 flex items-center gap-2.5">
                Démarrer votre projet
                <ArrowRight className="w-5 h-5 animate-[bounce-x_2s_infinite]" strokeWidth={2.5} />
              </span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="lg" className="w-full sm:w-auto text-text-main border border-gray-200 bg-white/50 backdrop-blur-md active:bg-gray-50 active:scale-95 transition-all duration-300" asChild>
            <Link href="/services">
              Voir nos domaines d'expertise
            </Link>
          </Button>
        </div>

      </div>

      {/* =========================================
          INDICATEUR DE SCROLL
          ========================================= */}
      <div 
        className={cn(
          "relative flex flex-col items-center gap-2 md:gap-3 opacity-0 pointer-events-none mt-12 shrink-0 z-10 mb-8 md:mb-0",
          mounted && "animate-fade-in-up-blur"
        )}
        style={getAnimationDelay(6)}
      >
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-text-muted/60 font-medium">
          Découvrir
        </span>
        <div className="w-[2px] h-8 md:h-12 bg-gray-200/50 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-brand-primary to-transparent animate-scroll-light"></div>
        </div>
      </div>

      {/* =========================================
          SÉPARATEUR : VAGUE MINIMALISTE "ULTRA PREMIUM"
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] z-20 pointer-events-none">
        <svg 
          className="relative block w-full h-[40px] md:h-[80px] lg:h-[100px]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 100" 
          preserveAspectRatio="none"
        >
          <path 
            className="fill-white" 
            d="M0,50 C360,150 1080,-50 1440,50 L1440,100 L0,100 Z"
          ></path>
        </svg>
      </div>

    </section>
  );
}