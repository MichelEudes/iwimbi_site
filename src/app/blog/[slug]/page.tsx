"use client";

import React, { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

// 🚨 IMPORTS SANITY
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

interface BlogPost {
  slug: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  content: any;
  imageUrl: string;
}

// 🚨 COMPOSANT REVEAL ULTRA PREMIUM
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
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let hiddenClasses = "opacity-0 translate-y-10 scale-[0.98]";
  if (direction === "left") hiddenClasses = "opacity-0 -translate-x-10";
  if (direction === "right") hiddenClasses = "opacity-0 translate-x-10";

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

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [mounted, setMounted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          "slug": slug.current,
          category,
          date,
          readTime,
          title,
          excerpt,
          content,
          "imageUrl": mainImage.asset->url
        }`;
        const data = await client.fetch(query, { slug });
        setPost(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur de récupération", error);
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  useEffect(() => {
    setMounted(true);
    const updateScroll = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  if (!isLoading && !post) return notFound();

  return (
    <main className="w-full bg-white selection:bg-[#4F5B93] selection:text-white pt-[80px] md:pt-[120px] overflow-x-hidden relative">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.03; }
          50% { transform: scale(1.1); opacity: 0.08; }
        }
        .anim-breathe { animation: breathe 10s ease-in-out infinite; }
      `}} />

      <Header />

      {/* Barre de lecture */}
      <div className="fixed top-0 left-0 w-full h-1 z-[110] pointer-events-none bg-gray-100/30">
        <div 
          className="h-full bg-gradient-to-r from-[#4F5B93] to-[#81B4C9] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#81B4C9]/15 to-transparent rounded-full blur-[100px] anim-breathe pointer-events-none z-0"></div>

      <article className="pt-8 pb-20 md:pt-16 px-5 sm:px-8 md:px-12 min-h-screen relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Retour */}
          <div className={cn(
            "opacity-0 -translate-x-4 transition-all duration-700 mb-8 md:mb-12", 
            mounted && "opacity-100 translate-x-0"
          )}>
            <Link href="/blog" className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#4F5B93] transition-colors">
              <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" /> 
              Retour
            </Link>
          </div>

          {isLoading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-4 w-24 bg-gray-100 rounded-full"></div>
              <div className="h-10 w-full bg-gray-100 rounded-xl"></div>
              <div className="aspect-video w-full bg-gray-50 rounded-2xl"></div>
            </div>
          ) : (
            <>
              <header className="mb-10 md:mb-16">
                <div className={cn(
                  "flex flex-wrap items-center gap-3 md:gap-4 mb-6 opacity-0 translate-y-4 transition-all duration-1000 delay-100", 
                  mounted && "opacity-100 translate-y-0"
                )}>
                  <span className="px-2.5 py-0.5 bg-gray-50 text-[#4F5B93] text-[8px] md:text-[9px] font-bold uppercase tracking-widest rounded-full border border-gray-100">
                    {post?.category || 'Tech'}
                  </span>
                  <div className="flex items-center gap-3 text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#81B4C9]" /> {post?.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#81B4C9]" /> {post?.readTime || '5 min'}</span>
                  </div>
                </div>

                <h1 className={cn(
                  "text-3xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-[#4F5B93] leading-[1.15] md:leading-[1.1] mb-8 opacity-0 translate-y-6 transition-all duration-1000 delay-300",
                  mounted && "opacity-100 translate-y-0"
                )}>
                  {post?.title}
                </h1>
                
                {post?.imageUrl && (
                  <div className={cn(
                    "w-full aspect-[16/10] md:aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden mb-10 shadow-xl border border-gray-100 opacity-0 translate-y-8 transition-all duration-1000 delay-500 group",
                    mounted && "opacity-100 translate-y-0"
                  )}>
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2.5s] ease-out" 
                    />
                  </div>
                )}
                
                {post?.excerpt && (
                  <p className={cn(
                    "text-lg md:text-2xl text-gray-500 font-light leading-relaxed italic border-l-2 border-[#81B4C9] pl-5 md:pl-8 opacity-0 translate-y-4 transition-all duration-1000 delay-700",
                    mounted && "opacity-100 translate-y-0"
                  )}>
                    {post.excerpt}
                  </p>
                )}
              </header>

              <div className={cn(
                "prose prose-sm md:prose-lg prose-blue max-w-none text-gray-600 font-light leading-relaxed mb-20 opacity-0 transition-all duration-1000 delay-[900ms]", 
                mounted && "opacity-100"
              )}>
                {post?.content && <PortableText value={post.content} />}
              </div>

              {/* 🚨 FOOTER : ÉCRITURE COMPLÈTE FORCÉE SUR MOBILE */}
              <Reveal direction="up" className="mt-16">
                <footer className="pt-8 border-t border-gray-100 flex flex-row justify-between items-center gap-2">
                  
                  {/* Bloc Auteur */}
                  <div className="flex items-center gap-2.5 md:gap-4 min-w-0">
                    <div className="w-9 h-9 md:w-12 md:h-12 shrink-0 rounded-full bg-gradient-to-br from-[#4F5B93] to-[#81B4C9] flex items-center justify-center text-white text-[9px] md:text-[11px] font-bold shadow-lg shadow-[#4F5B93]/20">
                      IG
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] md:text-sm font-bold text-[#4F5B93] truncate leading-tight">Rédaction Iwimbi</p>
                      <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest mt-0.5 truncate">Studio Stratégique</p>
                    </div>
                  </div>
                  
                  {/* Bouton Partager - Texte complet optimisé */}
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Lien copié !");
                    }}
                    className="group flex items-center gap-1.5 px-2.5 py-2 md:px-4 md:py-2.5 rounded-full bg-gray-50 border border-gray-100 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] text-gray-400 hover:text-[#4F5B93] hover:bg-white transition-all shrink-0 whitespace-nowrap"
                  >
                    <Share2 size={12} className="group-hover:scale-110 transition-transform md:w-[14px] md:h-[14px]" /> 
                    <span>Copier le lien</span>
                  </button>

                </footer>
              </Reveal>
            </>
          )}

        </div>
      </article>

      <Footer />
    </main>
  );
}