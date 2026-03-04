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
      {/* 1. LA PILULE FLOTTANTE - Retour à la finesse d'origine */}
      <header className="fixed top-4 left-4 right-4 md:top-6 z-[90] max-w-5xl mx-auto">
        <nav className="flex items-center justify-between bg-white/85 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-4 py-2 md:px-8 md:py-2.5">
          
          {/* LOGO IWIMBI : Grand mais n'agrandit pas la barre */}
          <div className="flex items-center h-10 md:h-12"> 
            <Link 
              href="/" 
              className="relative flex items-center h-14 w-40 md:h-20 md:w-56 -ml-2 transition-transform active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              <Image 
                src="/logo3_sf.png" 
                alt="Iwimbi Group Logo"
                fill
                style={{ objectFit: 'contain', objectPosition: 'left' }}
                className="brightness-105 contrast-110" 
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
                className="text-[12px] font-bold text-gray-800 hover:text-[#4F5B93] transition-colors tracking-widest uppercase"
              >
                {link.name}
              </Link>
            ))}
            
            <Link href="/contact">
              <button className="bg-[#4F5B93] text-white px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#3D4775] transition-all">
                Contact
              </button>
            </Link>
          </div>

          {/* BOUTON MENU MOBILE */}
          <button 
            className="lg:hidden p-2 text-[#4F5B93]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* 2. LE MENU MOBILE */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl flex flex-col items-center pt-32 transition-all duration-500 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8">
          <X className="w-8 h-8 text-[#4F5B93]" />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-4xl font-black text-[#4F5B93] tracking-tighter"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}