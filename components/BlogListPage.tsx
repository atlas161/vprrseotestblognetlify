import React, { Fragment, useMemo, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import '../index.css';
import { Section } from '../types';
import { getReadingTimeMinutes, loadAllPosts } from './BlogData';
import { ArrowRight, Tag, Filter, ChevronDown, Check } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';

export const BlogListPage: React.FC = () => {
  const posts = loadAllPosts();
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [posts]);
  const [category, setCategory] = useState<string>('Tous');
  const [tag, setTag] = useState<string>('Tous');
  const [sort, setSort] = useState<'recent' | 'ancien' | 'titre'>('recent');
  const categories = ['Tous', 'Drone', 'Montage vidéo', 'Digital'];
  const tagOptions = useMemo(() => ['Tous', ...allTags], [allTags]);
  const sortOptions = [
    { id: 'recent' as const, label: 'Plus récents' },
    { id: 'ancien' as const, label: 'Plus anciens' },
    { id: 'titre' as const, label: 'Titre A–Z' },
  ];
  const filtered = useMemo(() => {
    let list = posts.slice();
    if (category !== 'Tous') list = list.filter((p) => p.category === category);
    if (tag !== 'Tous') list = list.filter((p) => p.tags?.includes(tag));
    if (sort === 'recent') list.sort((a, b) => (a.date < b.date ? 1 : -1));
    if (sort === 'ancien') list.sort((a, b) => (a.date > b.date ? 1 : -1));
    if (sort === 'titre') list.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
    return list;
  }, [posts, category, tag, sort]);
  const goToHomeSection = (section: Section) => (window.location.href = `/#${section}`);

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans">
      <Navbar activeSection={null} scrollToSection={goToHomeSection} />
      <main className="pt-20">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-accent/5 blur-[120px]" />
            <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-white/5 blur-[120px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-10 pb-8 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Blog
              <br />
              <span className="text-accent">drone, montage vidéo, digital</span>
            </h1>
            <p className="mt-4 max-w-2xl text-textSecondary">
              Articles sur la captation drone, le montage, et la présence digitale.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex items-center gap-2 text-accent">
                <Filter size={16} />
                <span className="text-[11px] uppercase tracking-widest">Filtrer</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      category === c ? 'bg-accent text-background border-accent' : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex-1" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
                <span className="text-xs text-textSecondary">Tag</span>
                <div className="relative z-20 w-full sm:min-w-[180px]">
                  <Listbox value={tag} onChange={setTag}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer bg-surface border border-white/10 rounded-xl py-2 pl-3 pr-10 text-left text-white/90 focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-white/75 sm:text-sm transition-colors">
                        <span className="block truncate">{tag}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDown className="h-5 w-5 text-textSecondary" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-surfaceHighlight border border-white/10 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm backdrop-blur-xl">
                          {tagOptions.map((t) => (
                            <Listbox.Option
                              key={t}
                              value={t}
                              className={({ active }) =>
                                clsx(
                                  'relative cursor-pointer select-none py-2.5 pl-10 pr-4',
                                  active ? 'bg-white/10 text-accent' : 'text-white'
                                )
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className={clsx('block truncate', selected ? 'font-semibold' : 'font-normal')}>{t}</span>
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
                <span className="sm:ml-3 text-xs text-textSecondary">Tri</span>
                <div className="relative z-20 w-full sm:min-w-[160px]">
                  <Listbox value={sort} onChange={setSort}>
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer bg-surface border border-white/10 rounded-xl py-2 pl-3 pr-10 text-left text-white/90 focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-white/75 sm:text-sm transition-colors">
                        <span className="block truncate">{sortOptions.find((s) => s.id === sort)?.label}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronDown className="h-5 w-5 text-textSecondary" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-surfaceHighlight border border-white/10 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm backdrop-blur-xl">
                          {sortOptions.map((s) => (
                            <Listbox.Option
                              key={s.id}
                              value={s.id}
                              className={({ active }) =>
                                clsx(
                                  'relative cursor-pointer select-none py-2.5 pl-10 pr-4',
                                  active ? 'bg-white/10 text-accent' : 'text-white'
                                )
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className={clsx('block truncate', selected ? 'font-semibold' : 'font-normal')}>{s.label}</span>
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
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <a
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-3xl overflow-hidden bg-surfaceHighlight/40 border border-white/10 hover:border-accent/30 transition-all duration-300"
              >
                <div className="relative h-48 bg-black">
                  {p.coverImage && (
                    <img src={p.coverImage} alt={`Article blog: ${p.title} - Eagle Production drone Angoulême`} className="w-full h-full object-cover opacity-80" loading="lazy" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="text-[11px] uppercase tracking-widest text-accent">{p.category}</div>
                    <div className="text-[11px] uppercase tracking-widest text-white/50">{getReadingTimeMinutes(p.body)} min</div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{p.title}</h3>
                  <p className="text-sm text-textSecondary mt-2 line-clamp-3">{p.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags?.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-1 rounded-full text-white/70">
                        <Tag size={10} className="inline mr-1" />
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-accent text-sm">
                    Lire l’article <ArrowRight size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12">
            <div className="rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-8 md:p-10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">Un projet drone, vidéo ou digital ?</h2>
                  <p className="text-white/80 mt-1">Parlons objectifs, contraintes terrain, et livrables.</p>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-accent text-background font-bold px-6 py-3 rounded-full hover:bg-white transition-colors border border-accent/40"
                >
                  Devis gratuit
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};
