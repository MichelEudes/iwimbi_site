"use client";

import React, { useEffect, useState } from "react";
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
    <main className="w-full bg-white selection:bg-[#4F5B93] selection:text-white pt-[104px] md:pt-[120px]">
      <Header />

      <section className="pt-16 pb-24 md:pt-24 md:pb-32 px-6 lg:px-12 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* EN-TÊTE ANIMÉ */}
          <div className={cn("opacity-0 translate-y-4 transition-all duration-1000", mounted && "opacity-100 translate-y-0")}>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4F5B93]">Journal</span>
              <div className="h-px w-8 bg-gray-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Insights</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] mb-20 text-[#4F5B93] max-w-4xl">
              Explorations <br />
              <span className="text-gray-400 font-light italic">technologiques.</span>
            </h1>
          </div>

          {/* GRILLE D'ARTICLES CONNECTÉE AU CMS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            
            {posts.map((post, index) => (
              <article key={post.slug} className={cn(
                "group opacity-0 translate-y-8 transition-all duration-1000",
                mounted && "opacity-100 translate-y-0"
              )} style={{ transitionDelay: `${index * 150}ms` }}>
                
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="aspect-[16/10] bg-gray-50 rounded-2xl mb-8 overflow-hidden relative border border-gray-100 group-hover:border-[#81B4C9]/30 transition-all duration-500">
                    <div className="absolute inset-0 bg-[#4F5B93]/5 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    
                    {/* Vraie image depuis Sanity */}
                    {post.imageUrl && (
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}

                    <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-[#4F5B93] z-20">
                      {post.category || 'Tech'}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime || '3 min'}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#4F5B93] mb-4 group-hover:text-[#81B4C9] transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-6 max-w-md line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#4F5B93]">
                    Consulter l'article <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </Link>
              </article>
            ))}

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}