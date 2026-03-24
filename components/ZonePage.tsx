import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { Coverage } from './Coverage';
import '../index.css';
import { Section } from '../types';
import { Reveal } from './Reveal';
import { MapPin, Navigation, Building2, ArrowRight, BadgeCheck } from 'lucide-react';

export const ZonePage: React.FC = () => {
  const goToHomeSection = (section: Section) => {
    window.location.href = `/#${section}`;
  };

  useEffect(() => {
    const title = 'Zone d’intervention | Eagle Production';
    const desc =
      "Zone d’intervention drone: Angoulême, Charente (16) et Nouvelle-Aquitaine. Prestations à Cognac, Jarnac, La Rochelle, Bordeaux, Périgueux, Poitiers, Niort, Limoges et alentours.";
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
    setMeta('property', 'og:url', 'https://www.eagle-prod.com/zone');
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
    canonical.setAttribute('href', 'https://www.eagle-prod.com/zone');
  }, []);

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans">
      <Navbar activeSection={null} scrollToSection={goToHomeSection} />
      <main className="pt-20">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full bg-accent/5 blur-[120px]" />
            <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full bg-white/5 blur-[120px]" />
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-10 pb-10 relative z-10">
            <Reveal>
              <div className="flex items-center gap-3 text-accent mb-4">
                <Navigation size={18} />
                <span className="tracking-[0.25em] text-xs font-bold uppercase">Zone d’intervention</span>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                Drone à Angoulême
                <br />
                <span className="text-accent">Charente & Nouvelle-Aquitaine</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-3xl text-lg text-textSecondary leading-relaxed">
                Basés à <span className="text-white">Angoulême (16)</span>, nous intervenons rapidement en Charente et sur toute la Nouvelle-Aquitaine.
                Pour vos besoins <span className="text-white">drone</span> (vidéo aérienne 4K, photo, inspection, suivi de chantier), nous privilégions une
                organisation simple: périmètre, autorisations si nécessaire, créneau météo, livrables clairs.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 lg:col-span-2">
              <div className="flex items-center gap-3 text-accent mb-3">
                <MapPin size={18} />
                <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Villes desservies</span>
              </div>
              <p className="text-textSecondary leading-relaxed">
                Interventions fréquentes autour de: <span className="text-white">Angoulême</span>, <span className="text-white">Cognac</span>,
                <span className="text-white"> Jarnac</span>, <span className="text-white">La Couronne</span>, <span className="text-white">Soyaux</span>,
                <span className="text-white"> Ruelle-sur-Touvre</span>, <span className="text-white">Gond-Pontouvre</span>, <span className="text-white">Barbezieux-Saint-Hilaire</span>,
                <span className="text-white"> Ruffec</span>, <span className="text-white">Confolens</span>, <span className="text-white">La Rochefoucauld</span>.
              </p>
              <p className="text-textSecondary leading-relaxed mt-3">
                Selon le projet: <span className="text-white">La Rochelle</span>, <span className="text-white">Rochefort</span>, <span className="text-white">Saintes</span>, <span className="text-white">Royan</span>,
                <span className="text-white"> Bordeaux</span>, <span className="text-white">Libourne</span>, <span className="text-white">Arcachon</span>, <span className="text-white">Périgueux</span>, <span className="text-white">Bergerac</span>,
                <span className="text-white"> Poitiers</span>, <span className="text-white">Niort</span>, <span className="text-white">Limoges</span>.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-3 text-accent mb-3">
                <Building2 size={18} />
                <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Cas fréquents</span>
              </div>
              <ul className="space-y-2 text-sm text-white/85">
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="text-accent mt-0.5 shrink-0" />
                  <span>Suivi de chantier et comparatifs mensuels</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="text-accent mt-0.5 shrink-0" />
                  <span>Inspection de toitures et façades</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="text-accent mt-0.5 shrink-0" />
                  <span>Captation vidéo & communication</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-6">
          <div className="rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-8 md:p-10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Vous êtes dans le 16 ou alentours ?</h2>
                <p className="text-white/80 mt-1">Dites-nous la ville et l’objectif, on revient vers vous avec une proposition.</p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-accent text-background font-bold px-6 py-3 rounded-full hover:bg-white transition-colors border border-accent/40"
              >
                Demander un devis
                <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </div>
        </section>

        <section className="pt-10">
          <Coverage />
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};
