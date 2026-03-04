"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // 🚨 Importé pour le vrai logo
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      {/* 1. LA PILULE FLOTTANTE */}
      <header className="fixed top-4 left-4 right-4 md:top-6 z-[90] max-w-5xl mx-auto">
        <nav className="flex items-center justify-between bg-white/85 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-[2rem] px-5 py-3 md:px-8 md:py-3.5">
          
          {/* LOGO IWIMBI : TAILLE ET POSITION AJUSTÉES */}
          <div className="flex items-center">
            <Link 
              href="/" 
              // J'ai augmenté la largeur (w-36 -> w-40, w-48) et ajouté -mt-1 pour l'alignement vertical
              className="relative flex items-center h-10 w-36 md:h-12 md:w-48 -mt-1 transition-transform active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              <Image 
                src="/logo3_sf.png" // Assure-toi que le fichier est dans /public
                alt="Iwimbi Group Logo"
                fill
                // 'objectPosition: left' force le logo à coller le bord gauche de son cadre
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                className="priority"
                priority
              />
            </Link>
          </div>

          {/* NAVIGATION DESKTOP */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[13px] font-bold text-gray-800 hover:text-[#4F5B93] transition-colors tracking-widest uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            <Link href="/contact">
              <button className="bg-[#4F5B93] text-white px-7 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:shadow-lg hover:shadow-[#4F5B93]/20 hover:bg-[#3D4775] transition-all duration-300">
                Nous contacter
              </button>
            </Link>
          </div>

          {/* BOUTON MENU MOBILE */}
          <button 
            className="lg:hidden p-1 text-[#4F5B93] transition-transform active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </nav>
      </header>

      {/* 2. LE MENU MOBILE LUMINEUX */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-white/70 backdrop-blur-3xl flex flex-col items-center pt-32 sm:pt-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Halos de lumière */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#81B4C9]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#4F5B93]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Bouton Fermer */}
        <button 
          onClick={() => setIsOpen(false)}
          className={cn(
            "absolute top-6 right-8 w-12 h-12 bg-white/60 border border-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-[#4F5B93] shadow-sm active:scale-95 transition-all duration-500",
            isOpen ? "scale-100 rotate-0" : "scale-50 rotate-90"
          )}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Liens de navigation mobile */}
        <nav className="flex flex-col items-center gap-6 relative z-10 w-full px-8">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className="group relative"
            >
              <div 
                className={cn(
                  "text-4xl sm:text-5xl font-black text-[#4F5B93] tracking-tighter transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
                )}
                style={{ transitionDelay: `${index * 75 + 100}ms` }}
              >
                {link.name}
                <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4F5B93] to-[#81B4C9] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full" />
              </div>
            </Link>
          ))}
        </nav>

        {/* Bouton d'action mobile */}
        <div 
          className={cn(
            "absolute bottom-12 left-6 right-6 flex flex-col items-center gap-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isOpen ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          )}
          style={{ transitionDelay: `${navLinks.length * 75 + 150}ms` }}
        >
          <Link href="/contact" className="w-full max-w-xs" onClick={() => setIsOpen(false)}>
            <button className="w-full bg-[#4F5B93] text-white py-4 rounded-2xl font-bold text-lg uppercase tracking-widest shadow-xl shadow-[#4F5B93]/20 active:scale-95 transition-all">
              Démarrer un projet
            </button>
          </Link>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            contact@iwimbigroup.com
          </span>
        </div>
      </div>
    </>
  );
}