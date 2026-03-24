import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import '../index.css';
import { Section } from '../types';
import { findPostBySlug, getReadingTimeMinutes } from './BlogData';
import { Clock, Tag } from 'lucide-react';

export const BlogArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? findPostBySlug(slug) : undefined;
  const goToHomeSection = (section: Section) => (window.location.href = `/#${section}`);
  const readingTime = post ? getReadingTimeMinutes(post.body) : 0;

  const { htmlWithAnchors, toc } = React.useMemo(() => {
    if (!post) return { htmlWithAnchors: '', toc: [] as { id: string; text: string; level: number }[] };
    if (typeof document === 'undefined') return { htmlWithAnchors: post.body, toc: [] as { id: string; text: string; level: number }[] };
    const container = document.createElement('div');
    container.innerHTML = post.body;
    const headings = Array.from(container.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const tocItems: { id: string; text: string; level: number }[] = [];
    headings.forEach((h, idx) => {
      const text = h.textContent || `section-${idx}`;
      const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      h.setAttribute('id', id);
      tocItems.push({ id, text, level: h.tagName === 'H2' ? 2 : 3 });
    });
    return { htmlWithAnchors: container.innerHTML, toc: tocItems };
  }, [post]);

  useEffect(() => {
    if (!post) return;
    const title = post.seoTitle || `${post.title} | Blog`;
    const desc = post.seoDescription || post.excerpt || `Article: ${post.title}`;
    const url = `https://www.eagle-prod.com/blog/${post.slug}`;
    document.title = title;
    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:url', url);
    if (post.coverImage) setMeta('property', 'og:image', `https://www.eagle-prod.com${post.coverImage}`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [post]);

  // Schema Article pour le SEO
  const articleSchema = React.useMemo(() => {
    if (!post) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.seoDescription || post.excerpt,
      image: post.coverImage ? `https://www.eagle-prod.com${post.coverImage}` : 'https://www.eagle-prod.com/Photo_de_paul_bardin.webp',
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: 'Eagle Production',
        url: 'https://www.eagle-prod.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Eagle Production',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.eagle-prod.com/media/logo_beige.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.eagle-prod.com/blog/${post.slug}`
      },
      articleSection: post.category,
      keywords: post.tags?.join(', ') || '',
      wordCount: post.body.split(' ').length,
      timeRequired: `PT${readingTime}M`
    };
  }, [post, readingTime]);

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans">
      <Navbar activeSection={null} scrollToSection={goToHomeSection} />
      <main className="pt-20">
        {!post ? (
          <div className="max-w-4xl mx-auto px-6 py-24 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Article introuvable</h1>
            <p className="text-textSecondary mb-6">Le lien est peut-être incorrect ou l’article a été déplacé.</p>
            <a href="/blog" className="inline-block bg-accent text-background px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors">
              Voir le blog
            </a>
          </div>
        ) : (
          <>
            {articleSchema && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
              />
            )}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Article',
                  headline: post.title,
                  datePublished: post.date,
                  dateModified: post.date,
                  image: post.coverImage ? [`https://www.eagle-prod.com${post.coverImage}`] : undefined,
                  keywords: post.tags?.join(', '),
                  mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `https://www.eagle-prod.com/blog/${post.slug}`,
                  },
                  author: { '@type': 'Organization', name: 'Eagle Production' },
                  publisher: { '@type': 'Organization', name: 'Eagle Production' },
                  articleSection: post.category,
                  description: post.excerpt || '',
                  wordCount: post.body ? post.body.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(Boolean).length : undefined,
                  timeRequired: `PT${readingTime}M`,
                }),
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.eagle-prod.com/' },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.eagle-prod.com/blog' },
                    { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.eagle-prod.com/blog/${post.slug}` },
                  ],
                }),
              }}
            />
            <section className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-accent/5 blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-white/5 blur-[120px]" />
              </div>
              <div className="max-w-5xl mx-auto px-6 pt-10 pb-6 relative z-10">
                <div className="text-[11px] uppercase tracking-widest text-accent mb-2">{post.category}</div>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                  {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-textSecondary">
                  <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} className="text-accent" />
                    {readingTime} min
                  </span>
                </div>
              </div>
            </section>

            {post.coverImage && (
              <div className="max-w-5xl mx-auto px-6">
                <div className="rounded-3xl overflow-hidden border border-white/10">
                  <img src={post.coverImage} alt={`Article: ${post.title} - Eagle Production drone Angoulême`} className="w-full h-72 md:h-96 object-cover" loading="lazy" />
                </div>
              </div>
            )}

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-6 py-12">
              <article className="lg:col-span-3">
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: htmlWithAnchors || post.body }} />
                {post.tags?.length ? (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1 rounded-full text-white/75 inline-flex items-center gap-1">
                        <Tag size={12} className="text-accent" />
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="mt-10 rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-6 md:p-8 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-accent mb-2">Contact</div>
                      <div className="text-xl md:text-2xl font-extrabold text-white">Besoin d’un devis ou d’un conseil ?</div>
                      <div className="text-white/80 mt-1">Expliquez votre besoin, on vous répond rapidement.</div>
                    </div>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center bg-accent text-background font-bold px-6 py-3 rounded-full hover:bg-white transition-colors border border-accent/40"
                    >
                      Demander un devis
                    </a>
                  </div>
                </div>
              </article>
              <aside className="hidden lg:block lg:col-span-1">
                <div className="sticky top-28 space-y-4">
                  {toc.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="text-[11px] uppercase tracking-widest text-accent mb-2">Plan</div>
                      <ul className="space-y-2">
                        {toc.map((item) => (
                          <li key={item.id} className={`${item.level === 3 ? 'pl-3' : ''}`}>
                            <a href={`#${item.id}`} className="text-sm text-white/80 hover:text-accent transition-colors">{item.text}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <a
                    href="/contact"
                    className="block text-center bg-accent text-background px-4 py-3 rounded-xl font-semibold hover:bg-white transition-colors border border-accent/40"
                  >
                    Demander un devis
                  </a>
                </div>
              </aside>
            </div>

            <div className="max-w-3xl mx-auto px-6 pb-16">
              <a href="/blog" className="inline-block bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/15 transition-colors border border-white/15">
                Retour au blog
              </a>
            </div>
          </>
        )}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};
