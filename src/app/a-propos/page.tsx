"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Petit composant interne pour animer les sections au scroll sans librairie lourde
const FadeInSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    });
    
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      ref={domRef}
      className={cn(
        "transition-all duration-[1200px] ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        className
      )}
    >
      {children}
    </div>
  );
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="w-full bg-white selection:bg-brand-primary selection:text-white overflow-x-hidden">
      <Header />

      {/* 1. HERO : RAFFINEMENT ET SOBRIÉTÉ */}
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
                A-Propos
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] mb-12 max-w-4xl text-[#4F5B93]">
              Nous concevons des systèmes <br />
              <span className="text-gray-400 font-light italic">intelligents et durables.</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-10">
              <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-md">
                Iwimbi est un studio de stratégie technologique. Nous aidons les leaders à naviguer dans l'ère de l'IA par le design et l'ingénierie de précision.
              </p>
              <div className="flex flex-col justify-between items-end">
                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest text-right">
                  Cotonou — Bénin <br /> Bureau de Création
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHIE : CONTRASTE ET ÉPURE */}
      <section className="bg-[#0B1221] py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <FadeInSection className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 flex items-start">
              <div className="w-2 h-2 rounded-full bg-[#81B4C9] mt-1 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white ml-4">
                Manifeste
              </span>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-2xl md:text-4xl font-light text-white leading-snug tracking-tight max-w-3xl">
                La technologie n'est pas une fin, mais un langage. Nous l'utilisons pour traduire vos ambitions en <span className="text-[#81B4C9]">réalités tangibles.</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
                <div className="group cursor-default">
                  <p className="text-[10px] text-[#81B4C9] font-bold mb-4 tracking-[0.2em]">01 / VISION</p>
                  <h4 className="text-white font-bold text-lg mb-3 group-hover:text-[#81B4C9] transition-colors">IA Générative</h4>
                  <p className="text-gray-400 font-light text-sm leading-relaxed border-l border-white/10 pl-4 group-hover:border-[#81B4C9] transition-all">
                    Intégration de modèles avancés pour transformer les flux de travail traditionnels.
                  </p>
                </div>
                <div className="group cursor-default">
                  <p className="text-[10px] text-[#81B4C9] font-bold mb-4 tracking-[0.2em]">02 / IMPACT</p>
                  <h4 className="text-white font-bold text-lg mb-3 group-hover:text-[#81B4C9] transition-colors">Ingénierie de Valeur</h4>
                  <p className="text-gray-400 font-light text-sm leading-relaxed border-l border-white/10 pl-4 group-hover:border-[#81B4C9] transition-all">
                    Chaque développement est mesuré par son retour sur investissement et sa scalabilité.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 3. PROCESSUS : L'ESTHÉTIQUE DE LA LIGNE */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="space-y-32">
            
            {/* Étape 1 */}
            <FadeInSection className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-3xl bg-gray-50 aspect-[4/3] relative group">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-200/50 font-black text-9xl group-hover:text-[#81B4C9]/20 transition-colors duration-700">01</div>
                 <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-6 tracking-tight text-[#4F5B93]">Analyse Stratégique</h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base max-w-sm">
                  Nous déconstruisons vos besoins pour identifier les opportunités de rupture technologique à travers une phase d'immersion profonde.
                </p>
              </div>
            </FadeInSection>

            {/* Étape 2 */}
            <FadeInSection className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-3xl bg-gray-50 aspect-[4/3] relative group">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-200/50 font-black text-9xl group-hover:text-[#81B4C9]/20 transition-colors duration-700">02</div>
                 <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="w-full md:w-1/2 md:pr-12">
                <h3 className="text-2xl font-bold mb-6 tracking-tight text-[#4F5B93]">Artisanat Digital</h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base max-w-sm">
                  Le design et le code fusionnent pour créer des interfaces fluides et des backends robustes, conçus pour durer.
                </p>
              </div>
            </FadeInSection>

            {/* Étape 3 */}
            <FadeInSection className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-3xl bg-gray-50 aspect-[4/3] relative group">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-200/50 font-black text-9xl group-hover:text-[#81B4C9]/20 transition-colors duration-700">03</div>
                 <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-6 tracking-tight text-[#4F5B93]">Déploiement & Scalabilité</h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base max-w-sm">
                  Nous propulsons votre solution sur des infrastructures cloud de pointe, garantissant des performances optimales même lors des pics de charge.
                </p>
              </div>
            </FadeInSection>

            {/* Étape 4 */}
            <FadeInSection className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-3xl bg-gray-50 aspect-[4/3] relative group">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-200/50 font-black text-9xl group-hover:text-[#81B4C9]/20 transition-colors duration-700">04</div>
                 <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="w-full md:w-1/2 md:pr-12">
                <h3 className="text-2xl font-bold mb-6 tracking-tight text-[#4F5B93]">Intelligence Continue</h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base max-w-sm">
                  Le lancement n'est que le début. Nous optimisons vos systèmes en continu via l'analyse de données et le fine-tuning de modèles IA pour une croissance soutenue.
                </p>
              </div>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* 4. CTA : ÉPURÉ ET PUISSANT */}
      <section className="py-20 md:py-32 bg-white">
        <FadeInSection className="max-w-4xl mx-auto px-6 text-center border-t border-gray-100 pt-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-10 text-[#4F5B93]">
            Collaborons sur votre <br /> prochain chapitre.
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] group text-[#4F5B93]">
            Initialiser le contact
            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#4F5B93] group-hover:border-[#4F5B93] group-hover:text-white transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#4F5B93]/20">
              <ArrowUpRight size={18} />
            </div>
          </Link>
        </FadeInSection>
      </section>

      <Footer />
    </main>
  );
}