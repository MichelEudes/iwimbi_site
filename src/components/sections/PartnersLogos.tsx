"use client";

import React from "react";

// Liste factice (À remplacer plus tard par vos vrais SVG)
const PARTNERS = [
  { id: 1, name: "Tech Hub Africa" },
  { id: 2, name: "FindMyGym" },
  { id: 3, name: "Ore Fab" },
  { id: 4, name: "Actu Net" },

];

export function PartnersLogos() {
  return (
    <section className="w-full py-16 md:py-24 bg-white overflow-hidden relative">
      
      <div className="max-w-[1440px] mx-auto">
        {/* Titre Editorial : Minuscule, très espacé, d'une grande finesse */}
        <div className="mb-12 md:mb-16 text-center px-4">
          <h2 className="text-[9px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
            Ils nous font confiance pour leur transformation
          </h2>
        </div>

        {/* Conteneur principal du carrousel */}
        <div className="relative w-full flex overflow-hidden group">
          
          {/* Masques de fondu Extra-Larges pour une disparition en douceur */}
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-56 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-56 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

          {/* La piste d'animation : 
            L'animation se met en pause si l'utilisateur pose sa souris dessus pour lire un nom.
          */}
          <div className="flex w-max animate-marquee items-center flex-nowrap group-hover:[animation-play-state:paused] will-change-transform">
            
            {/* Première série */}
            <div className="flex w-max items-center gap-16 md:gap-32 px-8 md:px-16 flex-nowrap">
              {PARTNERS.map((partner) => (
                <div 
                  key={`first-${partner.id}`} 
                  className="flex items-center justify-center whitespace-nowrap cursor-pointer transition-all duration-700 ease-out"
                >
                  {/* Effet "Silver" au repos, "Brand Color" au survol */}
                  <span className="text-xl md:text-3xl font-black text-gray-300 hover:text-[#4F5B93] hover:scale-105 tracking-tighter transition-all duration-500">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Deuxième série (Clone exact pour le défilement infini) */}
            {/* aria-hidden="true" empêche les lecteurs d'écran de lire la liste deux fois */}
            <div aria-hidden="true" className="flex w-max items-center gap-16 md:gap-32 px-8 md:px-16 flex-nowrap">
              {PARTNERS.map((partner) => (
                <div 
                  key={`second-${partner.id}`} 
                  className="flex items-center justify-center whitespace-nowrap cursor-pointer transition-all duration-700 ease-out"
                >
                  <span className="text-xl md:text-3xl font-black text-gray-300 hover:text-[#4F5B93] hover:scale-105 tracking-tighter transition-all duration-500">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}