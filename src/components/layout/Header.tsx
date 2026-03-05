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
      {/* 1. LA PILULE FLOTTANTE */}
      <header className="fixed top-4 left-4 right-4 md:top-6 z-[90] max-w-5xl mx-auto">
        <nav className="flex items-center justify-between bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgb(0,0,0,0.08)] rounded-full px-5 py-2 md:px-8 md:py-2">
          
          {/* LOGO IWIMBI : AJUSTÉ POUR MOBILE (Moins collé) */}
          <div className="flex items-center relative h-10 md:h-12"> 
            <Link 
              href="/" 
              // Sur mobile : ml-0 pour laisser l'espace du padding 'px-5' de la nav
              // Sur desktop : -ml-2 pour un alignement optique parfait
              className="relative flex items-center h-16 w-40 md:h-24 md:w-64 md:-ml-2 transition-transform hover:scale-105 active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              <Image 
                src="/logo3_sf.png" 
                alt="Iwimbi Group Logo"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                className="brightness-110 contrast-110" 
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
              <button className="bg-[#4F5B93] text-white px-7 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#3D4775] transition-all">
                Contact
              </button>
            </Link>
          </div>

          {/* BOUTON MENU MOBILE (Burger) */}
          <button 
            className="lg:hidden p-2 text-[#4F5B93] active:scale-90 transition-transform"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </nav>
      </header>

      {/* 2. LE MENU MOBILE (Burgur Full Screen) */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex flex-col items-center pt-32 transition-all duration-500 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"
        )}
      >
        {/* Halos de lumière décoratifs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#81B4C9]/15 rounded-full blur-[100px] pointer-events-none" />

        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-8 right-8 p-3 bg-gray-50 rounded-full text-[#4F5B93]"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Liens de navigation */}
        <nav className="flex flex-col items-center gap-10 mb-16 relative z-10">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-4xl font-black text-[#4F5B93] tracking-tighter transition-all duration-500",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 🚨 RÉTABLISSEMENT DU BOUTON ET DU MAIL (Version mobile) */}
        <div 
          className={cn(
            "w-full px-10 flex flex-col items-center gap-8 transition-all duration-700 mt-auto pb-16",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          {/* BOUTON PREMIUM AVEC LIEN VERS LA PAGE D'ACCUEIL */}
          <Link href="/#contact" className="w-full max-w-xs relative group" onClick={() => setIsOpen(false)}>
            {/* Effet de halo (Glow) autour du bouton */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4F5B93] to-[#81B4C9] rounded-full blur opacity-40 group-active:opacity-80 transition duration-300"></div>
            {/* Le bouton en lui-même */}
            <button className="relative w-full bg-[#4F5B93] text-white py-4 rounded-full font-bold text-[13px] uppercase tracking-[0.25em] border border-white/20 active:scale-95 transition-all duration-300 shadow-xl">
              Démarrer un projet
            </button>
          </Link>
          
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
              Contactez-nous
            </span>
            <a 
              href="mailto:contact@iwimbigroup.com" 
              className="text-sm font-bold text-[#4F5B93] border-b border-[#4F5B93]/20 pb-1"
            >
              contact@iwimbigroup.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}