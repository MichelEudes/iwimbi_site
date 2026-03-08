"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// 🚨 IMPORT DU CLIENT SANITY (Ajuste le chemin vers "src/sanity/..." si ton dossier sanity est dans src)
import { client } from "@/sanity/lib/client"; 

interface BlogPost {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

// 🚨 COMPOSANT REVEAL ULTRA PREMIUM (Pour les grands éléments comme le titre)
const Reveal = ({ 
  children, 
  direction = "up", 
  delay = 0,
  className
}: { 
  children: React.ReactNode, 
  direction?: "up" | "left" | "right",
  delay?: number,
  className?: string
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let hiddenClasses = "opacity-0 translate-y-16 scale-[0.95]";
  if (direction === "left") hiddenClasses = "opacity-0 -translate-x-16 scale-[0.98]";
  if (direction === "right") hiddenClasses = "opacity-0 translate-x-16 scale-[0.98]";

  return (
    <div 
      ref={ref}
      className={cn(
        "transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1)",
        isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hiddenClasses,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setMounted(true);

    const fetchArticles = async () => {
      try {
        // 🔄 REQUÊTE VERS TON CMS SANITY
        const query = `*[_type == "post"] | order(_createdAt desc) {
          "slug": slug.current,
          category,
          date,
          readTime,
          title,
          excerpt,
          "imageUrl": mainImage.asset->url
        }`;
        
        const data = await client.fetch(query);
        setPosts(data);
      } catch (error) {
        console.error("Erreur de chargement des articles depuis Sanity", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="w-full bg-white selection:bg-[#4F5B93] selection:text-white pt-[104px] md:pt-[120px] overflow-hidden">
      
      {/* 🚨 INJECTION CSS : Pour les animations continues fluides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.05); opacity: 0.15; }
        }
        .anim-breathe { animation: breathe 8s ease-in-out infinite; }
      `}} />

      <Header />

      {/* Cercles décoratifs qui respirent en arrière-plan */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#81B4C9] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 anim-breathe pointer-events-none z-0"></div>

      <section className="pt-16 pb-24 md:pt-24 md:pb-32 px-6 lg:px-12 min-h-screen relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* EN-TÊTE ANIMÉ EN CASCADE */}
          <div className="flex flex-col mb-20">
            <div className={cn(
              "flex items-center gap-4 mb-12 transition-all duration-1000 delay-100 cubic-bezier(0.16, 1, 0.3, 1)",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4F5B93]">Journal</span>
              <div className="h-px w-8 bg-gray-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Insights</span>
            </div>

            <h1 className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] text-[#4F5B93] max-w-4xl transition-all duration-[1.5s] delay-300 cubic-bezier(0.16, 1, 0.3, 1)",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}>
              Explorations <br />
              <span className="text-gray-400 font-light italic">technologiques.</span>
            </h1>
          </div>

          {/* GRILLE D'ARTICLES CONNECTÉE AU CMS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            
            {posts.map((post, index) => {
              // Calcul du délai pour créer un effet de cascade parfait sur la grille
              const delay = 400 + (index * 150); 
              
              return (
                <article 
                  key={post.slug} 
                  className={cn(
                    "group opacity-0 translate-y-16 scale-[0.98] transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1)",
                    mounted && "opacity-100 translate-y-0 scale-100"
                  )} 
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Conteneur Image avec animation au survol */}
                    <div className="aspect-[16/10] bg-gray-50 rounded-2xl mb-8 overflow-hidden relative border border-gray-100 group-hover:border-[#81B4C9]/30 transition-all duration-700 hover:shadow-2xl hover:shadow-[#4F5B93]/5">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4F5B93]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                      
                      {/* Image depuis Sanity avec Scale très fluide */}
                      {post.imageUrl && (
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                        />
                      )}

                      <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-[#4F5B93] z-20 shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                        {post.category || 'Tech'}
                      </div>
                    </div>
                    
                    {/* Meta Infos */}
                    <div className="flex items-center gap-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4 transition-transform duration-500 group-hover:translate-x-2">
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#81B4C9]" /> {post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#81B4C9]" /> {post.readTime || '3 min'}</span>
                    </div>

                    {/* Titre et Extrait */}
                    <h2 className="text-2xl font-bold text-[#4F5B93] mb-4 group-hover:text-[#81B4C9] transition-colors duration-500 leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed mb-8 max-w-md line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* CTA "Lire la suite" stylisé */}
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#4F5B93] group-hover:text-[#81B4C9] transition-colors duration-500">
                      Consulter l'article 
                      <div className="w-8 h-8 rounded-full border border-[#4F5B93]/20 flex items-center justify-center group-hover:bg-[#81B4C9] group-hover:border-[#81B4C9] group-hover:text-white transition-all duration-500">
                        <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-500" />
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}