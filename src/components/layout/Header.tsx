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
      {/* 1. LA PILULE FLOTTANTE - Hauteur fixe pour rester fine */}
      <header className="fixed top-4 left-4 right-4 md:top-6 z-[90] max-w-5xl mx-auto">
        <nav className="flex items-center justify-between bg-white/85 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-4 py-2 md:px-8 md:py-2">
          
          {/* LOGO IWIMBI : TAILLE XXL SANS POUSSER LES MURS */}
          <div className="flex items-center h-10 md:h-12 relative"> 
            <Link 
              href="/" 
              // Augmentation de la hauteur à h-24 pour laisser le logo respirer
              // Le -ml-4 permet de bien caler le logo au début de l'arrondi
              className="relative flex items-center h-16 w-48 md:h-24 md:w-64 -ml-4 transition-transform active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              <Image 
                src="/logo3_sf.png" 
                alt="Iwimbi Group Logo"
                fill
                // objectPosition: left est crucial pour ne pas avoir de vide à gauche
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                className="brightness-105 contrast-115" 
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
                className="text-[11px] font-bold text-gray-800 hover:text-[#4F5B93] transition-colors tracking-[0.2em] uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            <Link href="/contact">
              <button className="bg-[#4F5B93] text-white px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#3D4775] transition-all shadow-md shadow-[#4F5B93]/10">
                Contact
              </button>
            </Link>
          </div>

          {/* BOUTON MENU MOBILE */}
          <button 
            className="lg:hidden p-2 text-[#4F5B93] hover:bg-gray-50 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
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
        <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 p-2 bg-gray-50 rounded-full">
          <X className="w-8 h-8 text-[#4F5B93]" />
        </button>

        <nav className="flex flex-col items-center gap-10">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-4xl font-black text-[#4F5B93] tracking-tighter transition-all duration-500",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}