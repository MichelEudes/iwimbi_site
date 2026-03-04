import React from "react";
import { Header } from "@/components/layout/Header";
import { HeroPremium } from "@/components/sections/HeroPremium";
import { PartnersLogos } from "@/components/sections/PartnersLogos";
import { StatsSection } from "@/components/sections/Stats";
import { ServicesSection } from "@/components/sections/Services";
import { PortfolioSection } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";


export default function Home() {
  return (
    // J'ai retiré "flex flex-col items-center" qui peut parfois forcer des marges indésirables
    // On garde uniquement w-full, overflow-x-hidden et bg-white
    <main className="w-full overflow-x-hidden relative bg-white">
      <Header />
      <HeroPremium />
      <PartnersLogos />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
}