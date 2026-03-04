"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const posts = [
  {
    title: "L'impact de l'IA générative sur les entreprises africaines",
    excerpt: "Comment l'automatisation intelligente redéfinit l'efficacité opérationnelle à Cotonou.",
    date: "04 Mars 2026",
    readTime: "5 min",
    category: "IA Strategy",
    slug: "impact-ia-afrique"
  },
  {
    title: "Design System : L'actif invisible des marques premium",
    excerpt: "Pourquoi la cohérence visuelle est le socle de la confiance numérique.",
    date: "28 Fév 2026",
    readTime: "4 min",
    category: "Design",
    slug: "design-system-premium"
  }
];

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="w-full bg-white selection:bg-[#4F5B93] selection:text-white">
      <Header />

      <section className="pt-32 pb-24 md:pt-44 md:pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* HEADER BLOG */}
          <div className={cn("opacity-0 translate-y-4 transition-all duration-1000", mounted && "opacity-100 translate-y-0")}>
            <div className="flex items-center gap-4 mb-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4F5B93]">Insights</span>
              <div className="h-px w-8 bg-gray-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Journal</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] mb-20 text-[#4F5B93] max-w-4xl">
              Partage de perspectives <br />
              <span className="text-gray-400 font-light italic">technologiques.</span>
            </h1>
          </div>

          {/* GRILLE D'ARTICLES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {posts.map((post, index) => (
              <article key={post.slug} className={cn(
                "group opacity-0 translate-y-8 transition-all duration-1000",
                mounted && "opacity-100 translate-y-0"
              )} style={{ transitionDelay: `${index * 200}ms` }}>
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="aspect-[16/10] bg-gray-50 rounded-2xl mb-8 overflow-hidden relative border border-gray-100 group-hover:border-[#81B4C9]/30 transition-colors">
                    <div className="absolute inset-0 bg-[#4F5B93]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-6 left-6 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-[#4F5B93]">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-[#4F5B93] mb-4 group-hover:text-gray-500 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-6 max-w-md">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#4F5B93]">
                    Lire la suite <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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