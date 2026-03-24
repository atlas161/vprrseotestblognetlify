import React, { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CookieBanner } from './CookieBanner';
import { ConstructionTracking } from './ConstructionTracking';
import '../index.css';
import { Section } from '../types';

export const ConstructionTrackingPage: React.FC = () => {
  const goToHomeSection = (section: Section) => {
    window.location.href = `/#${section}`;
  };
  useEffect(() => {
    const title = 'Suivi de chantier par drone | Eagle Production Angoulême';
    const desc = "Suivi de chantier BTP par drone: orthophotos, vues comparatives, rapports PDF et conformité DGAC. Intervention en Charente et Nouvelle-Aquitaine.";
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
    setMeta('property', 'og:url', 'https://www.eagle-prod.com/chantier');
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
    canonical.setAttribute('href', 'https://www.eagle-prod.com/chantier');
  }, []);
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Suivi de chantier par drone',
    serviceType: 'Suivi de chantier BTP',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Eagle Production',
      url: 'https://www.eagle-prod.com'
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Charente (16), Nouvelle-Aquitaine'
    },
    description:
      "Suivi de chantier par drone avec orthophotos, vues comparatives et rapports illustrés. Télépilote certifié, conformité DGAC, interventions planifiées.",
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Fréquences',
      itemListElement: [
        { '@type': 'Offer', name: 'Visite ponctuelle' },
        { '@type': 'Offer', name: 'Mensuel' },
        { '@type': 'Offer', name: 'Hebdomadaire' }
      ]
    }
  };
  const breadcrumbsLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.eagle-prod.com/' },
      { '@type': 'ListItem', position: 2, name: 'Suivi de chantier BTP', item: 'https://www.eagle-prod.com/chantier' }
    ]
  };
  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans">
      <Navbar activeSection={null} scrollToSection={goToHomeSection} />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }} />
        <ConstructionTracking />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
};
