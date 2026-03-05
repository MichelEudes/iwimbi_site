"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { id: 1, title: "Bank Connect", cat: "Fintech", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800", size: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "AgriSmart Data", cat: "IA & Data", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800", size: "md:col-span-1 md:row-span-1" },
  { id: 3, title: "Scan Health", cat: "E-Santé", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800", size: "md:col-span-1 md:row-span-1" },
];

const ProjectCard = ({ p, index }: { p: any; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      // 🚨 MODIFICATION : Hauteur fixe plus petite sur mobile (380px) pour ne pas envahir l'écran
      className={cn(
        "sticky md:relative w-full h-[380px] md:h-auto",
        p.size
      )}
      style={{
        // Décalage vertical pour l'effet d'empilement (uniquement visible sur mobile grâce au sticky)
        top: `calc(15vh + ${index * 15}px)`,
      }}
    >
      <div
        ref={cardRef}
        className={cn(
          "relative w-full h-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group border border-white/10 md:border-none",
          "shadow-[0_-10px_40px_rgba(0,0,0,0.15)] md:shadow-2xl md:shadow-black/5",
          "transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1)",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
        )}
      >
        <img 
          src={p.img} 
          alt={p.title} 
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out",
            isVisible ? "scale-100" : "scale-125",
            "md:group-hover:scale-105"
          )} 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent p-6 md:p-12 flex flex-col justify-end">
          
          <div className={cn(
            "transition-all duration-[1.5s] delay-300 flex flex-col md:flex-row md:items-end justify-between gap-4",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            
            {/* TEXTE DU PROJET */}
            <div>
              <span className="text-brand-accent text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-3 block">
                {p.cat}
              </span>
              <h4 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">{p.title}</h4>
            </div>
            
            {/* 🚨 MODIFICATION : Bouton mobile supprimé. L'icône ronde n'apparaît plus qu'au survol sur PC */}
            <div className="hidden md:flex w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:scale-110 transition-all duration-500">
              <ArrowUpRight size={24} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export function PortfolioSection() {
  return (
    <section id="portfolio" className="w-full py-20 md:py-32 bg-surface-dark/30 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-brand-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter leading-none">Impact Digital.</h3>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-6 lg:gap-8 md:auto-rows-[350px]">
          {PROJECTS.map((p, index) => (
            <ProjectCard key={p.id} p={p} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}