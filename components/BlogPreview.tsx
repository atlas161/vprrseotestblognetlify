import React from 'react';
import { getReadingTimeMinutes, loadAllPosts } from './BlogData';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

export const BlogPreview: React.FC = () => {
  const posts = loadAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-background py-20 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <Reveal>
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Derniers articles</span>
            <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-textPrimary to-textPrimary/60 pb-2">
              Blog
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p) => (
            <a
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-3xl overflow-hidden bg-surfaceHighlight/30 border border-white/10 hover:border-accent/30 transition-all duration-300"
            >
              <div className="relative h-40 bg-black">
                {p.coverImage && <img src={p.coverImage} alt={`Article blog: ${p.title} - Eagle Production drone Angoulême`} className="w-full h-full object-cover opacity-80" loading="lazy" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <div className="text-[11px] uppercase tracking-widest text-accent">{p.category}</div>
                  <div className="text-[11px] uppercase tracking-widest text-white/50">{getReadingTimeMinutes(p.body)} min</div>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors line-clamp-2">{p.title}</h3>
                <p className="text-xs text-textSecondary mt-2 line-clamp-3">{p.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-accent text-sm">
                  Lire <ArrowRight size={16} />
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="/blog"
            className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors border border-accent/40"
          >
            Voir le blog
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};
