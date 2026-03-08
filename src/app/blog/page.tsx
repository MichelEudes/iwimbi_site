"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

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
    }, { threshold: 0.1 }); // Réduit pour mobile

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // On évite les translates horizontaux sur mobile pour prévenir le débordement
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  let hiddenClasses = "opacity-0 translate-y-10 scale-[0.98]";
  if (!isMobile) {
    if (direction === "left") hiddenClasses = "opacity-0 -translate-x-10 scale-[0.98]";
    if (direction === "right") hiddenClasses = "opacity-0 translate-x-10 scale-[0.98]";
  }

  return (
    <div 
      ref={ref}
      className={cn(
        "transition-all duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1)",
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
        console.error("Erreur Sanity:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="w-full bg-white selection:bg-[#4F5B93] selection:text-white pt-[80px] md:pt-[120px] overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.05); opacity: 0.15; }
        }
        .anim-breathe { animation: breathe 8s ease-in-out infinite; }
      `}} />

      <Header />

      {/* Cercles de fond : masqués ou réduits sur mobile pour éviter les bugs de calcul de largeur */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#81B4C9] rounded-full blur-[80px] md:blur-[150px] -translate-y-1/2 translate-x-1/4 anim-breathe pointer-events-none z-0"></div>

      <section className="relative pt-8 md:pt-24 pb-20 px-4 sm:px-6 lg:px-12 min-h-screen z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col mb-12 md:mb-20">
            <div className={cn(
              "flex items-center gap-3 mb-8 transition-all duration-1000 delay-100",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[#4F5B93]">Journal</span>
              <div className="h-px w-6 md:w-8 bg-gray-200" />
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Insights</span>
            </div>

            <h1 className={cn(
              "text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.2] md:leading-[1.1] text-[#4F5B93] max-w-4xl transition-all duration-[1.2s] delay-300",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              Explorations <br />
              <span className="text-gray-400 font-light italic">technologiques.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-16 md:gap-y-24">
            {posts.map((post, index) => {
              // Stagger seulement sur Desktop, plus simple sur mobile
              const delay = typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 400 + (index * 100); 
              
              return (
                <article key={post.slug} className="w-full">
                  <Reveal delay={delay} className="group">
                    <Link href={`/blog/${post.slug}`} className="block w-full">
                      
                      <div className="aspect-[16/10] w-full bg-gray-50 rounded-xl md:rounded-2xl mb-6 overflow-hidden relative border border-gray-100 transition-all duration-500 hover:shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4F5B93]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                        
                        {post.imageUrl && (
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                          />
                        )}

                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-[#4F5B93] z-20 shadow-sm">
                          {post.category || 'Tech'}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#81B4C9]" /> {post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#81B4C9]" /> {post.readTime}</span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold text-[#4F5B93] mb-3 group-hover:text-[#81B4C9] transition-colors leading-snug">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-500 font-light text-sm leading-relaxed mb-6 line-clamp-2 md:line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#4F5B93] group-hover:text-[#81B4C9] transition-all">
                        Lire l'article 
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-[#4F5B93]/20 flex items-center justify-center group-hover:bg-[#81B4C9] group-hover:border-[#81B4C9] group-hover:text-white transition-all">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
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