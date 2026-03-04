"use client";

import React, { useEffect, useState, use } from "react"; // 🚨 Ajout de 'use'
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Clock, Calendar, Share2, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { postsData } from "@/data/posts"; 

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // 🚨 CORRECTIF : On "déballe" la promesse params avec React.use()
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [mounted, setMounted] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Recherche de l'article avec le slug déballé
  const post = postsData.find((p) => p.slug === slug);

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

  if (!post) {
    return notFound();
  }

  return (
    <main className="w-full bg-white selection:bg-[#4F5B93] selection:text-white">
      <Header />

      <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
        <div 
          className="h-full bg-[#81B4C9] transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className="pt-32 pb-24 md:pt-48 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          
          <div className={cn("opacity-0 -translate-x-4 transition-all duration-700", mounted && "opacity-100 translate-x-0")}>
            <Link href="/blog" className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#4F5B93] mb-12 transition-colors">
              <ArrowLeft size={14} /> Retour au journal
            </Link>
          </div>

          <header className={cn("mb-16 opacity-0 translate-y-4 transition-all duration-1000", mounted && "opacity-100 translate-y-0")}>
            <div className="flex items-center gap-4 mb-8">
              <span className="px-3 py-1 bg-gray-50 text-[#4F5B93] text-[9px] font-bold uppercase tracking-widest rounded-full border border-gray-100">
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-[#4F5B93] leading-[1.1] mb-8">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-500 font-light leading-relaxed italic border-l-2 border-[#81B4C9] pl-6 py-1">
              {post.excerpt}
            </p>
          </header>

          <div className={cn("prose prose-lg max-w-none text-gray-600 font-light leading-relaxed space-y-8 opacity-0 transition-all duration-1000 delay-300", mounted && "opacity-100")}>
            <div className="whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          <footer className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
             <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#4F5B93] flex items-center justify-center text-white text-[10px] font-bold">IG</div>
              <p className="text-sm font-medium">Rédaction Iwimbi</p>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#4F5B93] transition-colors"
            >
              <Share2 size={14} className="inline mr-2" /> Copier le lien
            </button>
          </footer>
        </div>
      </article>

      <Footer />
    </main>
  );
}