"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Facebook, Twitter, Instagram } from "lucide-react";

// COMPOSANT SVG SUR-MESURE POUR TIKTOK
const Tiktok = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-3v5.5a4 4 0 0 1-4 4Z" />
  </svg>
);

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative w-full bg-[#0B1221] text-white overflow-hidden pt-12 pb-6 border-t border-white/5">
      {/* 🌌 EFFET DE FOND : Réduit pour ne pas déborder */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-1/4 w-[300px] h-[300px] bg-brand-primary/10 blur-[100px] rounded-full animate-[pulse_8s_infinite] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
          
          {/* COLONNE MARQUE - Espacements réduits */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            
            {/* 🚨 LOGO CORRIGÉ : Tailles valides et espacement harmonisé */}
            <Link href="/" className="transition-transform hover:scale-105 duration-300 block -mt-4 mb-2 md:-mt-6 md:mb-4">
              <Image 
                src="/logo3_sf.png"
                alt="Iwimbi Group Logo"
                width={250} 
                height={80} 
                // w-40 = bonne taille mobile | md:w-52 = grande taille PC
                className="w-40 md:w-52 h-auto object-contain drop-shadow-xl" 
                priority
              />
            </Link>

            <p className="text-gray-400 text-[13px] leading-relaxed max-w-sm font-light mt-0 relative z-10">
              Architectes du futur numérique en Afrique. Nous fusionnons l'IA et le Design pour propulser votre croissance.
            </p>
            
            <div className="flex gap-4 mt-6">
              {[Facebook, Twitter, Instagram, Tiktok].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-primary hover:bg-brand-primary/10 transition-all duration-500">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* COLONNE LIENS */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left pt-2 md:pt-4">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-4 md:mb-6">Navigation</h4>
            <nav className="flex flex-col gap-2.5">
              
              <Link href="/services" className="group flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium">
                <span className="hidden md:block w-0 group-hover:w-3 h-[1px] bg-brand-primary transition-all duration-300" />
                Services
              </Link>
              
              <Link href="/#portfolio" className="group flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium">
                <span className="hidden md:block w-0 group-hover:w-3 h-[1px] bg-brand-primary transition-all duration-300" />
                Réalisations
              </Link>
              
              <Link href="/#temoignages" className="group flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium">
                <span className="hidden md:block w-0 group-hover:w-3 h-[1px] bg-brand-primary transition-all duration-300" />
                Témoignages
              </Link>
              
              <Link href="/contact" className="group flex items-center justify-center md:justify-start gap-2 text-gray-400 hover:text-white transition-all duration-300 text-sm font-medium">
                <span className="hidden md:block w-0 group-hover:w-3 h-[1px] bg-brand-primary transition-all duration-300" />
                Contact
              </Link>

            </nav>
          </div>

          {/* COLONNE BUREAU */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left pt-2 md:pt-4">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-primary mb-4 md:mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              
              <a href="mailto:contact@iwimbigroup.com" className="group flex flex-col items-center md:items-start">
                <p className="text-[10px] text-gray-500 uppercase mb-0.5 tracking-wider">Email</p>
                <span className="relative inline-block text-sm font-bold group-hover:text-brand-primary transition-colors">
                  contact@iwimbigroup.com
                  <ArrowUpRight 
                    size={14} 
                    className="absolute top-1/2 -translate-y-1/2 -right-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-primary" 
                  />
                </span>
              </a>

              <div className="group flex flex-col items-center md:items-start">
                <p className="text-[10px] text-gray-500 uppercase mb-0.5 tracking-wider">Localisation</p>
                <p className="text-sm font-bold">Cotonou, Bénin</p>
              </div>
            </div>
          </div>
        </div>

        {/* LIGNE FINALE */}
        <div className="relative pt-6 mt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-16 h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent animate-[shimmer_4s_infinite]" />

          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.15em] order-2 md:order-1">
            © {new Date().getFullYear()} Iwimbi Group
          </p>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-all order-1 md:order-2"
          >
            Haut de page
            <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary/20 transition-all">
              <ArrowUpRight size={12} className="-rotate-45" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}