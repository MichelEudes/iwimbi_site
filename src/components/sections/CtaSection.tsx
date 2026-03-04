import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="w-full py-24 relative overflow-hidden bg-brand-secondary text-white">
      {/* Effet d'arrière-plan */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-brand-primary rounded-full blur-[128px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-brand-accent rounded-full blur-[128px] opacity-20 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-balance">
          Prêt à accélérer votre transformation digitale ?
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-10 text-balance max-w-2xl mx-auto">
          Discutons de vos objectifs. Nos experts analysent votre besoin et vous proposent une architecture sur-mesure sous 48h.
        </p>
        <Button variant="primary" size="lg" className="bg-white text-brand-secondary hover:bg-white/90 shadow-xl" asChild>
          <Link href="/contact">
            Planifier un appel gratuit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}