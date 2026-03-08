"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const detailedServices = [
  {
    id: "ia",
    number: "01",
    title: "Intelligence Artificielle",
    description: "Nous intégrons la puissance des modèles LLM et de l'automatisation intelligente au cœur de vos processus métier.",
    features: ["Agents conversationnels", "Automation workflows", "Analyse prédictive", "Fine-tuning IA"],
    accent: "text-[#81B4C9]"
  },
  {
    id: "dev",
    number: "02",
    title: "Web & Mobile",
    description: "Des architectures modernes, scalables et ultra-rapides conçues avec les meilleures technologies du marché.",
    features: ["Next.js & React", "E-commerce Premium", "React Native", "Cloud & API"],
    accent: "text-[#4F5B93]"
  },
  {
    id: "design",
    number: "03",
    title: "UI/UX & Branding",
    description: "Nous créons des interfaces qui ne sont pas seulement belles, mais qui convertissent vos visiteurs en clients fidèles.",
    features: ["Design System", "Prototypage HD", "Identité Visuelle", "Audits UX"],
    accent: "text-[#4F5B93]"
  },
  {
    id: "communication",
    number: "04",
    title: "Communication Stratégique",
    description: "Nous façonnons des narratifs puissants pour aligner votre vision technologique avec les attentes de votre marché.",
    features: ["Storytelling Tech", "Stratégie de Contenu", "Personal Branding", "Relations Médias"],
    accent: "text-[#81B4C9]"
  }
];

// 🚨 COMPOSANT REVEAL ULTRA PREMIUM (Gère les directions et les délais)
const Reveal = ({ 
  children, 
  direction = "up", 
  delay = 0,
  className
}: { 
  children: React.ReactNode, 
  direction?: "up" | "left" | "right",
  delay?: number,
  className?: string
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Déclenchement unique
      }
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Définition des classes de départ selon la direction
  let hiddenClasses = "opacity-0 translate-y-16 scale-[0.95]";
  if (direction === "left") hiddenClasses = "opacity-0 -translate-x-16 scale-[0.98]";
  if (direction === "right") hiddenClasses = "opacity-0 translate-x-16 scale-[0.98]";

  return (
    <div 
      ref={ref}
      className={cn(
        "transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1)",
        isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hiddenClasses,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="w-full bg-white selection:bg-[#4F5B93] selection:text-white pt-[104px] md:pt-[120px] overflow-hidden">
      
      {/* 🚨 INJECTION CSS : Animations continues pour un effet "vivant" */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.05); opacity: 0.25; }
        }
        .anim-breathe { animation: breathe 8s ease-in-out infinite; }
        .anim-float { animation: float-slow 6s ease-in-out infinite; }
      `}} />

      <Header />

      {/* 1. HERO : ENTRÉE EN CASCADE (STAGGER) */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col">
            
            {/* Sourcil animé */}
            <div className={cn(
              "flex items-center gap-4 mb-12 transition-all duration-1000 delay-100 cubic-bezier(0.16, 1, 0.3, 1)",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4F5B93]">
                Iwimbi Group
              </span>
              <div className="h-px w-8 bg-gray-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
                Services
              </span>
            </div>

            {/* Grand titre animé */}
            <h1 className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] mb-12 max-w-4xl text-[#4F5B93] transition-all duration-[1.5s] delay-300 cubic-bezier(0.16, 1, 0.3, 1)",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              Des solutions pensées <br />
              <span className="text-gray-400 font-light italic">pour l'ère de l'intelligence.</span>
            </h1>

            {/* Paragraphe et Meta animés */}
            <div className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-10 transition-all duration-[1.5s] delay-500 cubic-bezier(0.16, 1, 0.3, 1)",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-md">
                Notre approche fusionne rigueur méthodologique et innovation technologique pour transformer vos ambitions en actifs numériques.
              </p>
              <div className="flex justify-start md:justify-end items-end">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest md:text-right">
                  Expertises Tech <br /> & Design Studio
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION CENTRALE : MANIFESTE SOMBRE AVEC ORBE */}
      <section className="bg-[#0B1221] py-24 md:py-32 relative overflow-hidden isolate">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none z-10"></div>
        
        {/* Orbe lumineux subtil */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F5B93] rounded-full blur-[180px] anim-breathe pointer-events-none z-0"></div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center relative z-20">
            <Reveal direction="up">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-snug tracking-tight max-w-3xl mx-auto">
                  Nous ne nous contentons pas de livrer du code. Nous bâtissons des <span className="text-[#81B4C9] font-medium">infrastructures de croissance.</span>
                </h2>
            </Reveal>
        </div>
      </section>

      {/* 3. LISTE DES SERVICES : ANIMATIONS LATÉRALES ET FLOTTAISON */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="space-y-32 md:space-y-48">
            {detailedServices.map((service, index) => {
              const isReverse = index % 2 !== 0; // Alterne la disposition (gauche/droite)
              
              return (
                <section key={service.id} id={service.id} className="scroll-mt-32 w-full">
                  <div className={cn(
                    "flex flex-col md:flex-row items-center gap-12 md:gap-16",
                    isReverse && "md:flex-row-reverse"
                  )}>
                    
                    {/* Bloc Visuel Abstrait (Animation venant du côté) */}
                    <Reveal direction={isReverse ? "left" : "right"} className="w-full md:w-1/2">
                      <div className="aspect-[4/3] md:aspect-video bg-gray-50 rounded-[2rem] flex items-center justify-center relative overflow-hidden group border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:bg-white">
                         <span 
                           className="text-[8rem] md:text-[12rem] font-black text-gray-200 anim-float group-hover:text-[#4F5B93]/10 group-hover:scale-110 transition-all duration-1000 select-none"
                           style={{ animationDelay: `${index * 0.5}s` }} // Désynchronise la flottaison de chaque chiffre
                         >
                           {service.number}
                         </span>
                      </div>
                    </Reveal>

                    {/* Contenu (Animation venant du bas, retardée) */}
                    <Reveal direction="up" delay={200} className="w-full md:w-1/2">
                      <div className="flex items-center gap-3 mb-6">
                          <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", service.id === 'ia' || service.id === 'communication' ? "bg-[#81B4C9]" : "bg-[#4F5B93]")} />
                          <span className={cn("text-[10px] font-bold uppercase tracking-[0.3em]", service.accent)}>Expertise {service.number}</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#4F5B93] tracking-tight">{service.title}</h3>
                      <p className="text-gray-500 font-light leading-relaxed mb-10 text-base md:text-lg italic">
                        "{service.description}"
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                          {service.features.map((f, i) => (
                              <div key={i} className="flex items-center gap-3 group/feature">
                                  <CheckCircle2 size={16} className={cn("transition-transform duration-300 group-hover/feature:scale-125", service.id === 'ia' || service.id === 'communication' ? "text-[#81B4C9]" : "text-[#4F5B93]")} />
                                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wider group-hover/feature:text-[#4F5B93] transition-colors">{f}</span>
                              </div>
                          ))}
                      </div>
                    </Reveal>

                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA : MAGNÉTIQUE ET ROTATIF */}
      <section className="py-24 md:py-32 bg-white border-t border-gray-100 relative overflow-hidden">
        {/* Cercles décoratifs inspirés de AboutPage */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-50 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-50 rounded-full animate-[spin_30s_linear_infinite_reverse] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center text-[#4F5B93] relative z-10">
          <Reveal direction="up">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
              Un projet qui nécessite <br className="hidden md:block"/> une main d'expert ?
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] group text-[#4F5B93] hover:text-[#81B4C9] transition-colors duration-300">
              <span className="group-hover:-translate-x-2 transition-transform duration-500">Initialiser la demande</span>
              <div className="w-12 h-12 rounded-full border border-[#4F5B93]/20 flex items-center justify-center group-hover:bg-[#81B4C9] group-hover:border-[#81B4C9] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#81B4C9]/20 transition-all duration-500">
                <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}