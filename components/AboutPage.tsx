import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { About } from './About';
import { Reveal } from './Reveal';
import { Breadcrumbs } from './Breadcrumbs';
import '../index.css';
import { Section } from '../types';
import { BadgeCheck, Camera, MapPin, ShieldCheck, Mountain, Ruler, Building2, Clapperboard, Factory, Landmark, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const goToHomeSection = (section: Section) => {
    window.location.href = `/#${section}`;
  };

  useEffect(() => {
    const title = 'À propos - Télépilote drone à Angoulême | Eagle Production';
    const desc =
      "Découvrez Eagle Production, télépilote drone certifié DGAC à Angoulême (Charente): vidéo aérienne 4K, photo drone, photogrammétrie, inspection technique et suivi de chantier BTP en Nouvelle-Aquitaine.";
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
    setMeta('property', 'og:url', 'https://www.eagle-prod.com/a-propos');
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
    canonical.setAttribute('href', 'https://www.eagle-prod.com/a-propos');
  }, []);

  const aboutPageLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'À propos',
    url: 'https://www.eagle-prod.com/a-propos',
    inLanguage: 'fr-FR',
    description:
      "Eagle Production est un studio drone basé à Angoulême (Charente). Télépilote certifié DGAC: vidéo aérienne 4K, photo drone, inspection technique, photogrammétrie et suivi de chantier BTP.",
    about: {
      '@type': 'Organization',
      name: 'Eagle Production',
      url: 'https://www.eagle-prod.com'
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'Eagle Production',
      url: 'https://www.eagle-prod.com',
      description:
        "Télépilote drone certifié DGAC à Angoulême: prises de vue aériennes 4K, photo drone, suivi de chantier, inspection technique et photogrammétrie.",
      areaServed: ['Angoulême', 'Charente', 'Nouvelle-Aquitaine'],
      knowsAbout: [
        'drone Angoulême',
        'photo drone',
        'vidéo aérienne 4K',
        'suivi de chantier BTP',
        'inspection technique',
        'photogrammétrie'
      ]
    }
  };

  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.eagle-prod.com/' },
      { '@type': 'ListItem', position: 2, name: 'À propos', item: 'https://www.eagle-prod.com/a-propos' }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans">
      <Navbar activeSection={null} scrollToSection={goToHomeSection} />
      <main className="pt-20">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }} />

        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 pt-8 pb-8 relative z-10">
            <Breadcrumbs 
              items={[{ label: 'À propos' }]} 
              className="mb-6"
            />
            <Reveal>
              <div className="flex items-center gap-3 text-accent mb-4">
                <BadgeCheck size={18} />
                <span className="tracking-[0.25em] text-xs font-bold uppercase">À propos</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                Télépilote drone certifié à Angoulême
                <br />
                <span className="text-accent">qualité cinéma, précision terrain</span>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-3xl text-lg text-textSecondary leading-relaxed">
                Eagle Production accompagne les professionnels et particuliers avec des prestations drone et audiovisuel sur-mesure:
                <span className="text-white"> vidéo aérienne 4K</span>, <span className="text-white">photo drone</span>,
                <span className="text-white"> inspection technique</span>, <span className="text-white"> photogrammétrie</span> et <span className="text-white">suivi de chantier BTP</span>.
                Basés à <span className="text-white">Angoulême</span>, nous intervenons en <span className="text-white">Charente</span> et en <span className="text-white">Nouvelle-Aquitaine</span>.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="text-[11px] uppercase tracking-widest bg-accent/20 border border-accent/30 text-accent px-3 py-1.5 rounded-full">
                  Certifié DGAC
                </span>
                <span className="text-[11px] uppercase tracking-widest bg-white/10 border border-white/15 text-white px-3 py-1.5 rounded-full">
                  Assurance RC Pro
                </span>
                <span className="text-[11px] uppercase tracking-widest bg-white/10 border border-white/15 text-white px-3 py-1.5 rounded-full">
                  Autorisations gérées
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        <About />

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-accent">
                <Camera size={18} />
                <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Drone & audiovisuel</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 leading-tight">
                Une approche terrain, pensée pour la lisibilité et la décision
              </h2>
              <p className="text-textSecondary text-base md:text-lg leading-relaxed">
                Sur un projet drone, la valeur ne vient pas uniquement de l’image: elle vient de la <span className="text-white">lecture</span> du site,
                du <span className="text-white">cadrage</span> des objectifs, et de la capacité à livrer des contenus utiles.
                Nous travaillons avec des repères précis, des angles constants et une organisation claire des médias (dates, zones, livrables).
              </p>
              <p className="text-textSecondary text-base md:text-lg leading-relaxed">
                Les prestations sont adaptées aux contraintes: zones urbaines, météo, accessibilité, sécurité des équipes, et timing chantier.
                Chaque mission vise un rendu propre, cohérent avec votre communication, et exploitable pour vos réunions, vos rapports ou votre marketing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Clapperboard size={18} className="text-accent" />, title: 'Vidéo aérienne 4K', text: 'Plans cinématiques, storytelling, formats réseaux et site web.' },
                { icon: <Building2 size={18} className="text-accent" />, title: 'Suivi de chantier BTP', text: 'Comparatifs, orthophotos, rapports et repères temporels.' },
                { icon: <ShieldCheck size={18} className="text-accent" />, title: 'Inspection technique', text: 'Toitures, façades, ouvrages, zones difficiles d’accès.' },
                { icon: <Ruler size={18} className="text-accent" />, title: 'Photogrammétrie', text: 'Orthophotos, relevés visuels, livrables sur étude.' },
                { icon: <Landmark size={18} className="text-accent" />, title: 'Patrimoine & tourisme', text: 'Mise en valeur de sites, monuments, événements locaux.' },
              ].map((card, i) => (
                <div key={i} className="bg-surfaceHighlight/40 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">{card.icon}</div>
                    <h3 className="text-white font-bold">{card.title}</h3>
                  </div>
                  <p className="text-sm text-textSecondary leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 text-accent mb-3">
                  <MapPin size={18} />
                  <span className="tracking-[0.2em] text-[11px] font-bold uppercase">Local SEO</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">Angoulême, Charente, Nouvelle-Aquitaine</h2>
                <p className="text-textSecondary mt-3 leading-relaxed">
                  Nous travaillons régulièrement autour du <span className="text-white">Grand Angoulême</span>.
                  Interventions possibles sur toute la région et au-delà selon le dossier et les autorisations.
                </p>
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: <Factory size={18} className="text-accent" />, title: 'Industrie', text: 'Contrôles visuels, communication, repérages.' },
                    { icon: <Building2 size={18} className="text-accent" />, title: 'BTP', text: 'Suivi d’évolution, coordination, documentation.' },
                    { icon: <Mountain size={18} className="text-accent" />, title: 'Terrains & sites', text: 'Repérages, angles larges et top-down.' },
                    { icon: <Clapperboard size={18} className="text-accent" />, title: 'Événementiel', text: 'Captation aérienne, formats réseaux sociaux.' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-background/40 border border-white/10 rounded-2xl">
                      <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 shrink-0">{s.icon}</div>
                      <div className="min-w-0">
                        <div className="text-white font-bold">{s.title}</div>
                        <div className="text-sm text-textSecondary leading-relaxed">{s.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-8 md:p-10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Besoin d'une mission drone à Angoulême ?</h2>
                <p className="text-white/80 leading-relaxed">
                  Décrivez votre objectif (inspection, chantier, vidéo, photo, photogrammétrie) et recevez une proposition adaptée.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-textPrimary" />
                    <span>Cadrage des besoins</span>
                  </div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-textPrimary" />
                    <span>Étude réglementaire</span>
                  </div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-textPrimary" />
                    <span>Livrables clairs</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/chantier"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/15 transition-colors border border-white/15"
                >
                  Suivi de chantier
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-background px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors border border-accent/40"
                >
                  Contacter
                  <Mail size={18} />
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
