import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { Breadcrumbs } from './Breadcrumbs';
import '../index.css';
import { Section } from '../types';
import { loadAllFaqItems } from './CmsContent';
import { ChevronDown, HelpCircle, Check } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';

export const FaqPage: React.FC = () => {
  const goToHomeSection = (section: Section) => {
    window.location.href = `/#${section}`;
  };

  const items = loadAllFaqItems();
  const categories = useMemo(() => ['Toutes', ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [category, setCategory] = useState<string>('Toutes');
  const [expandAll, setExpandAll] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    return category === 'Toutes' ? items : items.filter((i) => i.category === category);
  }, [items, category]);

  useEffect(() => {
    const title = 'FAQ | Eagle Production';
    const desc = "FAQ Eagle Production: drone, montage vidéo, digital, sécurité et démarches. Réponses claires et pratiques.";
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
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', 'https://www.eagle-prod.com/faq');
    setMeta('property', 'og:image', 'https://www.eagle-prod.com/Photo_de_paul_bardin.webp');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', desc);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.eagle-prod.com/faq');
  }, []);

  const faqLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: filtered.slice(0, 50).map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    };
  }, [filtered]);

  const toggleOne = (slug: string) => {
    setOpen((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  useEffect(() => {
    if (!expandAll) return;
    const next: Record<string, boolean> = {};
    filtered.forEach((f) => {
      next[f.slug] = true;
    });
    setOpen(next);
  }, [expandAll, filtered]);

  useEffect(() => {
    if (expandAll) return;
    setOpen({});
  }, [expandAll, category]);

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans">
      <Navbar activeSection={null} scrollToSection={goToHomeSection} />
      <main className="pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-accent/5 blur-[120px]" />
            <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-white/5 blur-[120px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-8 pb-8 relative z-10">
            <Breadcrumbs 
              items={[{ label: 'FAQ' }]} 
              className="mb-6"
            />
            <div className="flex items-center gap-3 text-accent mb-4">
              <HelpCircle size={18} />
              <span className="tracking-[0.25em] text-xs font-bold uppercase">FAQ</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Questions fréquentes
              <br />
              <span className="text-accent">drone, montage, digital</span>
            </h1>
            <p className="mt-4 max-w-2xl text-textSecondary">
              Réponses claires, classées par catégorie. Tout est modifiable depuis Pages CMS.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="text-[11px] uppercase tracking-widest text-accent">Filtres</div>
              <div className="relative z-20 w-full md:min-w-[260px] md:max-w-[320px]">
                <Listbox value={category} onChange={setCategory}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-pointer bg-surface border border-white/10 rounded-xl py-2 pl-3 pr-10 text-left text-white/90 focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-white/75 sm:text-sm transition-colors">
                      <span className="block truncate">{category}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDown className="h-5 w-5 text-textSecondary" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-surfaceHighlight border border-white/10 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm backdrop-blur-xl">
                        {categories.map((c) => (
                          <Listbox.Option
                            key={c}
                            value={c}
                            className={({ active }) =>
                              clsx('relative cursor-pointer select-none py-2.5 pl-10 pr-4', active ? 'bg-white/10 text-accent' : 'text-white')
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span className={clsx('block truncate', selected ? 'font-semibold' : 'font-normal')}>{c}</span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                                    <Check className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div className="flex-1" />
              <button
                onClick={() => setExpandAll((v) => !v)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  expandAll ? 'bg-accent text-background border-accent' : 'bg-white/5 text-white/85 border-white/10 hover:bg-white/10'
                }`}
              >
                {expandAll ? 'Mode normal' : 'Tout déplier'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((f, idx) => {
              const isOpen = expandAll || !!open[f.slug];
              return (
                <div
                  key={f.slug}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'bg-surfaceHighlight border-accent/30 shadow-lg shadow-black/20' : 'bg-surfaceHighlight/20 border-white/5 hover:bg-surfaceHighlight/40'
                  }`}
                >
                  <button onClick={() => toggleOne(f.slug)} className="w-full flex items-center justify-between p-5 text-left focus:outline-none">
                    <div className="pr-4">
                      <div className="text-[10px] uppercase tracking-widest text-white/50 mb-1">{f.category}</div>
                      <div className={`font-semibold transition-colors [text-wrap:balance] ${isOpen ? 'text-accent' : 'text-white'}`}>{f.question}</div>
                    </div>
                    <div className={`p-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${isOpen ? 'bg-accent text-background rotate-180' : 'bg-white/5 text-textSecondary'}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5 pt-0 text-textSecondary text-sm leading-relaxed border-t border-white/5 mt-2">
                      <div className="blog-content" dangerouslySetInnerHTML={{ __html: f.answer }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-8 md:p-10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Vous ne trouvez pas la réponse ?</h2>
                <p className="text-white/80 mt-1">Écrivez-nous et on vous guide rapidement.</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-accent text-background font-bold px-6 py-3 rounded-full hover:bg-white transition-colors border border-accent/40"
              >
                Contacter
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};
