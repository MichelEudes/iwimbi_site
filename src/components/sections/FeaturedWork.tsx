import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Refonte e-commerce B2B",
    category: "Développement Web",
    // Remplacez par les vraies images exportées de Figma dans le dossier public/
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=800&auto=format&fit=crop", 
    href: "/realisations/ecommerce-b2b",
  },
  {
    id: 2,
    title: "Application IA de gestion",
    category: "Intelligence Artificielle & Mobile",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    href: "/realisations/app-ia",
  },
];

export function FeaturedWorkSection() {
  return (
    <section className="w-full py-20 md:py-32 bg-surface-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-main mb-4">
              Nos Réalisations
            </h2>
            <p className="text-lg text-text-muted text-balance">
              Découvrez comment nous avons transformé les défis de nos clients en solutions technologiques performantes.
            </p>
          </div>
          <Link 
            href="/realisations" 
            className="inline-flex items-center font-medium text-brand-primary hover:text-brand-accent transition-colors"
          >
            Voir tous nos projets
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project) => (
            <Link href={project.href} key={project.id} className="group flex flex-col cursor-pointer">
              {/* Conteneur de l'image avec overflow hidden pour l'effet de zoom */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-surface-dark shadow-card">
                <Image
                  src={project.image}
                  alt={`Aperçu du projet ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay subtil au survol */}
                <div className="absolute inset-0 bg-brand-secondary/0 group-hover:bg-brand-secondary/10 transition-colors duration-500" />
              </div>
              
              <div className="flex items-center text-sm font-medium text-brand-primary mb-2">
                {project.category}
              </div>
              <h3 className="text-2xl font-bold text-text-main group-hover:text-brand-primary transition-colors duration-300">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}