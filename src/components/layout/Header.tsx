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
      {/* 1. LA PILULE FLOTTANTE - Légèrement plus haute pour accueillir un gros logo */}
      <header className="fixed top-4 left-4 right-4 md:top-6 z-[90] max-w-6xl mx-auto">
        <nav className="flex items-center justify-between bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_12px_40px_rgb(0,0,0,0.08)] rounded-[2.5rem] px-6 py-4 md:px-10 md:py-5">
          
          {/* LOGO IWIMBI : TAILLE XL ET VISIBILITÉ MAXIMALE */}
          <div className="flex items-center">
            <Link 
              href="/" 
              // Dimensions augmentées : h-12/w-44 sur mobile, h-16/w-64 sur desktop
              className="relative flex items-center h-12 w-44 md:h-16 md:w-64 transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              <Image 
                src="/logo3_sf.png" 
                alt="Iwimbi Group Logo"
                fill
                // 'objectPosition: left' pour coller au bord, contrast pour la lisibilité
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                className="brightness-110 contrast-125" 
                priority
              />
            </Link>
          </div>

          {/* NAVIGATION DESKTOP */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-[14px] font-bold text-gray-900 hover:text-[#4F5B93] transition-colors tracking-[0.2em] uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            <Link href="/contact">
              <button className="bg-[#4F5B93] text-white px-8 py-3.5 rounded-full font-extrabold text-[12px] uppercase tracking-widest shadow-xl shadow-[#4F5B93]/10 hover:shadow-[#4F5B93]/30 hover:bg-[#3D4775] transition-all duration-500">
                Lancer un projet
              </button>
            </Link>
          </div>

          {/* BOUTON MENU MOBILE */}
          <button 
            className="lg:hidden p-2 text-[#4F5B93] bg-gray-50 rounded-full transition-transform active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <Menu className="w-8 h-8" />
          </button>
        </nav>
      </header>

      {/* 2. LE MENU MOBILE */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-white/80 backdrop-blur-3xl flex flex-col items-center pt-32 sm:pt-40 transition-all duration-500 ease-in-out lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 w-14 h-14 bg-white shadow-lg rounded-full flex items-center justify-center text-[#4F5B93]"
        >
          <X className="w-7 h-7" />
        </button>

        <nav className="flex flex-col items-center gap-8 px-8">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className={cn(
                "text-5xl font-black text-[#4F5B93] tracking-tighter transition-all duration-700 delay-75",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}