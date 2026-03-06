"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { 
    id: 1, 
    title: "Bank Connect", 
    cat: "Fintech", 
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200", 
    size: "md:col-span-12 lg:col-span-8 lg:row-span-2" 
  },
  { 
    id: 2, 
    title: "AgriSmart Data", 
    cat: "IA & Data", 
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800", 
    size: "md:col-span-6 lg:col-span-4 lg:row-span-1" 
  },
  { 
    id: 3, 
    title: "Scan Health", 
    cat: "E-Santé", 
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800", 
    size: "md:col-span-6 lg:col-span-4 lg:row-span-1" 
  },
];

const ProjectCard = ({ p, index }: { p: any; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative w-full rounded-[2rem] overflow-hidden flex",
        "min-h-[400px] lg:min-h-0",
        p.size,
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* IMAGE AVEC ZOOM CINÉMATIQUE */}
      <img 
        src={p.img} 
        alt={p.title} 
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)]",
          "scale-100 group-hover:scale-105"
        )} 
      />
      
      {/* DÉGRADÉ D'ASSOMBRISSEMENT LISSE */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221]/95 via-[#0B1221]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-1000 ease-out" />
      
      {/* CONTENU TEXTUEL FIXE */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end pointer-events-none">
        <div>
          {/* Pilule Catégorie (Ultra Fine) */}
          <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/90 text-[9px] font-medium tracking-[0.3em] uppercase w-max mb-5 shadow-2xl">
            {p.cat}
          </div>
          
          <h4 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {p.title}
          </h4>
        </div>
      </div>
    </div>
  );
};

export function PortfolioSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="portfolio" className="w-full py-24 md:py-32 bg-white relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* EN-TÊTE HARMONISÉ */}
        <div className={cn(
          "flex flex-col mb-10 md:mb-16 opacity-0 translate-y-4 transition-all duration-1000",
          mounted && "opacity-100 translate-y-0"
        )}>
          <h2 className="text-brand-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-4">Portfolio</h2>
          {/* 🚨 Correction ici pour correspondre aux autres titres */}
          <h3 className="text-3xl md:text-6xl font-heading font-extrabold tracking-tighter leading-tight max-w-3xl">
            Impact <span className="text-brand-primary">Digital.</span>
          </h3>
        </div>

        {/* GRILLE BENTO BOX */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 lg:auto-rows-[340px]">
          {PROJECTS.map((p, index) => (
            <ProjectCard key={p.id} p={p} index={index} />
          ))}
        </div>
        
      </div>
    </section>
  );
}