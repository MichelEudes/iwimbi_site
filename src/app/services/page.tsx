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

// Composant de révélation chirurgicale
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
    <main className="w-full bg-white selection:bg-[#4F5B93] selection:text-white">
      <Header />

      {/* 1. HERO : STYLE CHIRURGICAL */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "flex flex-col opacity-0 translate-y-4 transition-all duration-1000",
            mounted && "opacity-100 translate-y-0"
          )}>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4F5B93]">
                Iwimbi Group
              </span>
              <div className="h-px w-8 bg-gray-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
                Services
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] mb-12 max-w-4xl text-[#4F5B93]">
              Des solutions pensées <br />
              <span className="text-gray-400 font-light italic">pour l'ère de l'intelligence.</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-10">
              <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-md">
                Notre approche fusionne rigueur méthodologique et innovation technologique pour transformer vos ambitions en actifs numériques.
              </p>
              <div className="flex justify-end items-end">
                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest text-right">
                  Expertises Tech <br /> & Design Studio
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION CENTRALE : MANIFESTE SOMBRE */}
      <section className="bg-[#0B1221] py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
            <Reveal>
                <h2 className="text-2xl md:text-4xl font-light text-white leading-snug tracking-tight max-w-3xl mx-auto">
                    Nous ne nous contentons pas de livrer du code. Nous bâtissons des <span className="text-[#81B4C9]">infrastructures de croissance.</span>
                </h2>
            </Reveal>
        </div>
      </section>

      {/* 3. LISTE DES SERVICES : ÉPURÉE ET NUMÉROTÉE */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="space-y-32 md:space-y-48">
            {detailedServices.map((service, index) => (
              
              <section key={service.id} id={service.id} className="scroll-mt-32">
                <Reveal>
                  <div className={cn(
                    "flex flex-col md:flex-row gap-16 items-start",
                    index % 2 !== 0 && "md:flex-row-reverse"
                  )}>
                    {/* Visuel Abstrait / Chiffre */}
                    <div className="w-full md:w-1/2 aspect-video bg-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden group">
                        <span className="text-9xl font-black text-gray-100 group-hover:text-gray-200 transition-colors duration-700 select-none">
                          {service.number}
                        </span>
                        <div className="absolute inset-0 border border-gray-100 rounded-2xl" />
                    </div>

                    {/* Contenu */}
                    <div className="w-full md:w-1/2">
                      <div className="flex items-center gap-3 mb-6">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#81B4C9]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#81B4C9]">Expertise {service.number}</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-6 text-[#4F5B93] tracking-tight">{service.title}</h3>
                      <p className="text-gray-500 font-light leading-relaxed mb-10 text-base italic">
                        "{service.description}"
                      </p>
                      
                      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                          {service.features.map((f, i) => (
                              <div key={i} className="flex items-center gap-3">
                                  <CheckCircle2 size={14} className="text-gray-300" />
                                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">{f}</span>
                              </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>

            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA : ÉPURÉ (DÉSORMAIS EN BLANC) */}
      <section className="py-24 md:py-32 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 text-[#4F5B93]">
              Un projet qui nécessite <br /> une main d'expert ?
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] group text-[#4F5B93]">
              Initialiser la demande
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#4F5B93] group-hover:border-[#4F5B93] group-hover:text-white transition-all duration-500">
                <ArrowUpRight size={16} />
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}