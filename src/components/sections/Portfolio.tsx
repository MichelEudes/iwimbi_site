"use client";

import React from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { id: 1, title: "EcoBank Connect", cat: "Fintech", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800", size: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "AgriSmart Data", cat: "IA & Data", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800", size: "md:col-span-1 md:row-span-1" },
  { id: 3, title: "Sahel Health", cat: "E-Santé", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800", size: "md:col-span-1 md:row-span-1" },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="w-full py-20 md:py-32 bg-surface-dark/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-brand-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-4">Portfolio</h2>
            <h3 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tighter leading-none">Impact Digital.</h3>
          </div>
          <button className="group flex items-center gap-3 font-bold text-xs tracking-widest uppercase">
            Tous les projets <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          {PROJECTS.map((p) => (
            <div key={p.id} className={cn(
              "relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group shadow-2xl shadow-black/5",
              "col-span-1 row-span-1", // Mobile: 1x1
              p.size // Desktop: Bento
            )}>
              <img src={p.img} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 md:p-12 flex flex-col justify-end">
                <span className="text-brand-accent text-[10px] font-bold tracking-widest uppercase mb-2">{p.cat}</span>
                <h4 className="text-2xl md:text-4xl font-bold text-white mb-4">{p.title}</h4>
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}