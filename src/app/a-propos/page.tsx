"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Composant interne Ultra Premium (Correction de la durée et ajout du scale)
const FadeInSection = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target); // Ne s'anime qu'une seule fois au scroll
          }
        });
      },
      { threshold: 0.15 } // Déclenche quand 15% de l'élément est visible
    );
    
    const current = domRef.current;
    if (current) observer.observe(current);
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      ref={domRef}
      className={cn(
        // 🚨 NOUVELLE ANIMATION : Translation + Opacité + Dézoom léger (style Apple)
        "transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1)",
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-[0.95]",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
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
    <main className="w-full bg-white selection:bg-[#4F5B93] selection:text-white overflow-x-hidden pt-[104px] md:pt-[120px]">
      <Header />

      {/* 1. HERO : RAFFINEMENT ET SOBRIÉTÉ */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className={cn(
            "flex flex-col opacity-0 translate-y-8 scale-[0.98] transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1)",
            mounted && "opacity-100 translate-y-0 scale-100"
          )}>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4F5B93]">
                Iwimbi Group
              </span>
              <div className="h-px w-8 bg-gray-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
                À-Propos
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
              <div className="flex flex-col justify-between items-start md:items-end">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest md:text-right">
                  Cotonou — Bénin <br /> Bureau de Création
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHIE : CONTRASTE ET ÉPURE */}
      <section className="bg-[#0B1221] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
          <FadeInSection className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4 flex items-start">
              <div className="w-2 h-2 rounded-full bg-[#81B4C9] mt-1 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white ml-4">
                Manifeste
              </span>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-snug tracking-tight max-w-3xl">
                La technologie n'est pas une fin, mais un langage. Nous l'utilisons pour traduire vos ambitions en <span className="text-[#81B4C9] font-medium">réalités tangibles.</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mt-16 md:mt-20">
                <div className="group cursor-default">
                  <p className="text-[10px] text-[#81B4C9] font-bold mb-4 tracking-[0.2em]">01 / VISION</p>
                  <h4 className="text-white font-bold text-lg md:text-xl mb-3 group-hover:text-[#81B4C9] transition-colors duration-500">IA Générative</h4>
                  <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed border-l border-white/10 pl-4 group-hover:border-[#81B4C9] transition-all duration-500">
                    Intégration de modèles avancés pour transformer les flux de travail traditionnels.
                  </p>
                </div>
                <div className="group cursor-default">
                  <p className="text-[10px] text-[#81B4C9] font-bold mb-4 tracking-[0.2em]">02 / IMPACT</p>
                  <h4 className="text-white font-bold text-lg md:text-xl mb-3 group-hover:text-[#81B4C9] transition-colors duration-500">Ingénierie de Valeur</h4>
                  <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed border-l border-white/10 pl-4 group-hover:border-[#81B4C9] transition-all duration-500">
                    Chaque développement est mesuré par son retour sur investissement et sa scalabilité.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 3. PROCESSUS : L'ESTHÉTIQUE DE LA LIGNE */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="space-y-32 md:space-y-48">
            
            {/* Étape 1 */}
            <FadeInSection className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-[2rem] bg-gray-50 aspect-[4/3] relative group border border-gray-100 transition-colors duration-500 hover:bg-white hover:shadow-2xl hover:shadow-black/5">
                 {/* 🚨 CORRECTION DES CHIFFRES : Plus sombres, plus gros, animés au survol */}
                 <div className="absolute inset-0 flex items-center justify-center text-gray-200 font-black text-[8rem] md:text-[12rem] group-hover:text-[#81B4C9]/30 group-hover:scale-110 transition-all duration-1000 select-none">01</div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#81B4C9]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#81B4C9]">Phase 1</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-[#4F5B93]">Analyse Stratégique</h3>
                <p className="text-gray-500 font-light leading-relaxed text-base md:text-lg max-w-md">
                  Nous déconstruisons vos besoins pour identifier les opportunités de rupture technologique à travers une phase d'immersion profonde.
                </p>
              </div>
            </FadeInSection>

            {/* Étape 2 */}
            <FadeInSection className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-[2rem] bg-gray-50 aspect-[4/3] relative group border border-gray-100 transition-colors duration-500 hover:bg-white hover:shadow-2xl hover:shadow-black/5">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-200 font-black text-[8rem] md:text-[12rem] group-hover:text-[#4F5B93]/10 group-hover:scale-110 transition-all duration-1000 select-none">02</div>
              </div>
              <div className="w-full md:w-1/2 md:pr-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4F5B93]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4F5B93]">Phase 2</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-[#4F5B93]">Artisanat Digital</h3>
                <p className="text-gray-500 font-light leading-relaxed text-base md:text-lg max-w-md">
                  Le design et le code fusionnent pour créer des interfaces fluides et des backends robustes, conçus pour durer.
                </p>
              </div>
            </FadeInSection>

            {/* Étape 3 */}
            <FadeInSection className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-[2rem] bg-gray-50 aspect-[4/3] relative group border border-gray-100 transition-colors duration-500 hover:bg-white hover:shadow-2xl hover:shadow-black/5">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-200 font-black text-[8rem] md:text-[12rem] group-hover:text-[#81B4C9]/30 group-hover:scale-110 transition-all duration-1000 select-none">03</div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#81B4C9]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#81B4C9]">Phase 3</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-[#4F5B93]">Déploiement & Cloud</h3>
                <p className="text-gray-500 font-light leading-relaxed text-base md:text-lg max-w-md">
                  Nous propulsons votre solution sur des infrastructures de pointe, garantissant des performances optimales même lors des pics de charge.
                </p>
              </div>
            </FadeInSection>

            {/* Étape 4 */}
            <FadeInSection className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
              <div className="w-full md:w-1/2 overflow-hidden rounded-[2rem] bg-gray-50 aspect-[4/3] relative group border border-gray-100 transition-colors duration-500 hover:bg-white hover:shadow-2xl hover:shadow-black/5">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-200 font-black text-[8rem] md:text-[12rem] group-hover:text-[#4F5B93]/10 group-hover:scale-110 transition-all duration-1000 select-none">04</div>
              </div>
              <div className="w-full md:w-1/2 md:pr-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4F5B93]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4F5B93]">Phase 4</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-[#4F5B93]">Intelligence Continue</h3>
                <p className="text-gray-500 font-light leading-relaxed text-base md:text-lg max-w-md">
                  Le lancement n'est que le début. Nous optimisons vos systèmes en continu via l'analyse de données et le fine-tuning de modèles IA.
                </p>
              </div>
            </FadeInSection>

          </div>
        </div>
      </section>

      {/* 4. CTA : ÉPURÉ ET PUISSANT */}
      <section className="py-24 md:py-32 bg-white border-t border-white/5">
        <FadeInSection className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-12 leading-tight text-[#4F5B93]">
            Collaborons sur votre <br className="hidden md:block"/> prochain chapitre.
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] group text-[#4F5B93]">
            Initialiser le contact
            <div className="w-10 h-10 rounded-full border border-[#4F5B93] flex items-center justify-center group-hover:bg-[#81B4C9] group-hover:border-[#81B4C9] transition-all duration-500">
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </FadeInSection>
      </section>

      <Footer />
    </main>
  );
}