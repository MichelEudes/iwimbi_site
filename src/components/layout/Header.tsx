"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
      {/* 1. LA PILULE FLOTTANTE - Hauteur strictement contrôlée */}
      <header className="fixed top-4 left-4 right-4 md:top-6 z-[90] max-w-5xl mx-auto">
        <nav className="flex items-center justify-between bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgb(0,0,0,0.08)] rounded-full px-4 py-1.5 md:px-8 md:py-2">
          
          {/* LOGO IWIMBI : IMPACT MAXIMUM */}
          <div className="flex items-center relative h-10 md:h-12"> 
            <Link 
              href="/" 
              // h-20 sur mobile / h-28 sur desktop pour un logo XXL qui respire
              // On utilise -ml-6 pour coller le logo au bord gauche de l'arrondi
              className="relative flex items-center h-20 w-48 md:h-28 md:w-72 -ml-6 transition-transform hover:scale-105 active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              <Image 
                src="/logo3_sf.png" 
                alt="Iwimbi Group Logo"
                fill
                // 'objectPosition: left' élimine tout espace vide à gauche du texte
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                className="brightness-110 contrast-125 saturate-110" 
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
                className="text-[11px] font-extrabold text-[#4F5B93] hover:opacity-70 transition-all tracking-[0.25em] uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            <Link href="/contact">
              <button className="bg-[#4F5B93] text-white px-7 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#3D4775] transition-all shadow-md">
                Contact
              </button>
            </Link>
          </div>

          {/* BOUTON MENU MOBILE */}
          <button 
            className="lg:hidden p-2 text-[#4F5B93]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </nav>
      </header>

      {/* 2. LE MENU MOBILE */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex flex-col items-center pt-32 transition-all duration-500 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 p-3">
          <X className="w-9 h-9 text-[#4F5B93]" />
        </button>

        <nav className="flex flex-col items-center gap-12">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-5xl font-black text-[#4F5B93] tracking-tighter transition-all duration-500",
                isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95"
              )}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}