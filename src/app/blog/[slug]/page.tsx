"use client";

import React, { useEffect, useState, use } from "react";
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
  content: any; // Format spécifique à Sanity
  imageUrl: string;
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [mounted, setMounted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. 🔄 RÉCUPÉRATION DE L'ARTICLE DEPUIS SANITY
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
        
        // On envoie le slug à Sanity pour qu'il trouve le bon article
        const data = await client.fetch(query, { slug });
        setPost(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article", error);
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // 2. LOGIQUE UI : Scroll progress & Montage
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

  if (!isLoading && !post) {
    return notFound();
  }

  return (
    <main className="w-full bg-white selection:bg-[#4F5B93] selection:text-white pt-[104px] md:pt-[120px]">
      <Header />

      <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
        <div 
          className="h-full bg-[#81B4C9] transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="pt-16 pb-24 md:pt-24 px-6 lg:px-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
          
          <div className={cn("opacity-0 -translate-x-4 transition-all duration-700", mounted && "opacity-100 translate-x-0")}>
            <Link href="/blog" className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#4F5B93] mb-12 transition-colors">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Retour au journal
            </Link>
          </div>

          {isLoading ? (
            <div className="animate-pulse space-y-8">
              <div className="h-6 w-32 bg-gray-100 rounded-full"></div>
              <div className="h-16 w-3/4 bg-gray-100 rounded-2xl"></div>
              <div className="h-24 w-full bg-gray-50 rounded-xl border-l-2 border-gray-200"></div>
            </div>
          ) : (
            <>
              <header className={cn("mb-16 opacity-0 translate-y-4 transition-all duration-1000", mounted && "opacity-100 translate-y-0")}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-3 py-1 bg-gray-50 text-[#4F5B93] text-[9px] font-bold uppercase tracking-widest rounded-full border border-gray-100">
                    {post?.category || 'Tech'}
                  </span>
                  <div className="flex items-center gap-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {post?.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {post?.readTime || '5 min'}</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-[#4F5B93] leading-[1.1] mb-8">
                  {post?.title}
                </h1>
                
                {/* Vraie image de couverture depuis Sanity */}
                {post?.imageUrl && (
                  <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden mb-12 bg-gray-100 shadow-sm border border-gray-100">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                )}
                
                {post?.excerpt && (
                  <p className="text-xl text-gray-500 font-light leading-relaxed italic border-l-2 border-[#81B4C9] pl-6 py-1">
                    {post.excerpt}
                  </p>
                )}
              </header>

              {/* 🚨 MAGIE : Le composant PortableText décode les données de Sanity pour les afficher avec style */}
              <div className={cn("prose prose-lg prose-blue max-w-none text-gray-600 font-light leading-relaxed space-y-8 opacity-0 transition-all duration-1000 delay-300", mounted && "opacity-100")}>
                {post?.content && <PortableText value={post.content} />}
              </div>

              <footer className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#4F5B93] flex items-center justify-center text-white text-[10px] font-bold shadow-md shadow-[#4F5B93]/20">IG</div>
                  <p className="text-sm font-medium text-gray-900">Rédaction Iwimbi</p>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Lien copié dans le presse-papier !");
                  }}
                  className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#4F5B93] transition-colors"
                >
                  <Share2 size={14} className="group-hover:scale-110 transition-transform" /> Copier le lien
                </button>
              </footer>
            </>
          )}

        </div>
      </article>

      <Footer />
    </main>
  );
}