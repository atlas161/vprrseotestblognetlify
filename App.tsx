import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './index.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { TechSpecs } from './components/TechSpecs';
import { Footer } from './components/Footer';
import { Section } from './types';
import { Preloader } from './components/Preloader';
import { Coverage } from './components/Coverage';
import { Gallery } from './components/Gallery';
import { CookieBanner } from './components/CookieBanner';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { SEOSchema } from './components/SEOSchema';
import { BlogPreview } from './components/BlogPreview';

function App() {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Gestion du chargement initial (Preloader)
  useEffect(() => {
    const handleLoad = () => {
      // Petit délai artificiel minimum de 1.5s pour que l'utilisateur voit le logo
      // et pour assurer une transition fluide
      setTimeout(() => {
        setIsLoading(false);
        
        // Gérer le hash dans l'URL après le chargement
        const hash = window.location.hash.replace('#', '') as Section;
        if (hash && Object.values(Section).includes(hash)) {
          // Petit délai pour laisser le DOM se stabiliser
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              const SCROLL_OFFSET = 72;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - SCROLL_OFFSET;
              window.scrollTo({ top: Math.max(offsetPosition, 0), behavior: 'smooth' });
              setActiveSection(hash);
            }
          }, 100);
        }
      }, 1500);
    };

    // Si le document est déjà chargé (cas du refresh rapide)
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Sinon on attend que tout (images, scripts) soit chargé
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Hauteur fixe de la navbar
  const NAVBAR_HEIGHT = 72;
  const SCROLL_OFFSET = NAVBAR_HEIGHT; // juste la navbar, pas d'espace supplémentaire

  // Fonction de scroll manuel avec calcul de l'offset pour la navbar fixe
  const scrollToSection = (sectionId: Section) => {
    // On cible directement la section, pas le titre
    const sectionElement = document.getElementById(sectionId);
    
    if (sectionElement) {
      setIsNavigating(true);
      setActiveSection(sectionId);
      
      // Calcul précis de la position
      const elementPosition = sectionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - SCROLL_OFFSET;
      
      window.scrollTo({
        top: Math.max(offsetPosition, 0),
        behavior: 'smooth'
      });
      
      // Mettre à jour l'URL sans recharger (pour le partage de liens)
      window.history.pushState(null, '', `#${sectionId}`);
      
      window.setTimeout(() => setIsNavigating(false), 800);
    }
  };

  const scrollToNextSection = () => {
    const current = document.getElementById(Section.HERO);
    const next = current?.nextElementSibling as HTMLElement | null;
    if (next) {
      setIsNavigating(true);
      
      const elementPosition = next.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(offsetPosition, 0), behavior: 'smooth' });
      
      const nextId = next.id as Section;
      if (nextId) setActiveSection(nextId);
      window.setTimeout(() => setIsNavigating(false), 800);
    }
  };

  // Système de "Scroll Spy" pour mettre à jour le menu quand on défile manuellement
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      
      // Ne pas mettre à jour pendant une navigation programmée
      if (isNavigating) return;
      
      // Ordre exact des sections dans le DOM (très important pour la détection inverse)
      const ORDERED_SECTIONS = [
        Section.HERO,
        Section.GALLERY,
        Section.SERVICES,
        Section.BLOG,
        Section.TECH,
        Section.ZONE,
        Section.REVIEWS
      ];

      // Point de déclenchement : 1/3 de la hauteur de la fenêtre ou barre de nav
      const scrollPosition = window.scrollY + (window.innerHeight * 0.3);

      // Trouver la section visible (de bas en haut pour prioriser celle en cours)
      for (let i = ORDERED_SECTIONS.length - 1; i >= 0; i--) {
        const section = ORDERED_SECTIONS[i];
        const element = document.getElementById(section);
        if (element) {
          // Utiliser getBoundingClientRect pour une position absolue fiable par rapport au viewport
          // puis ajouter scrollY pour avoir la position absolue dans le document
          const rect = element.getBoundingClientRect();
          const elementTopAbsolute = rect.top + window.scrollY;
          
          if (scrollPosition >= elementTopAbsolute) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Déclenchement initial pour mettre à jour l'état au chargement
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNavigating]);

  return (
    <>
      <SEOSchema />
      <Preloader isLoading={isLoading} />
      
      <div className={`min-h-screen bg-background text-textPrimary font-sans selection:bg-accent selection:text-white transition-opacity duration-700 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
        
        <main>
          {isNavigating && (
            <div className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-[60]" />
          )}
          <section id={Section.HERO}>
            <Hero onScrollDown={scrollToNextSection} />
          </section>

          <section id={Section.GALLERY} className="min-h-screen">
            <Gallery />
          </section>

          <section id={Section.SERVICES} className="relative z-10 bg-background min-h-screen border-b border-white/5">
            <Services />
          </section>

          <section id={Section.BLOG}>
            <BlogPreview />
          </section>

          <section id={Section.TECH} className="min-h-screen">
            <TechSpecs />
          </section>

          <section id={Section.ZONE} className="min-h-screen">
            <Coverage />
          </section>

          <section id={Section.REVIEWS} className="min-h-screen bg-background border-t border-white/5">
            <ReviewsAndFaq />
          </section>

          <section className="bg-gradient-to-b from-background to-surfaceHighlight">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-8 md:p-10 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white">Un projet en tête ?</h3>
                    <p className="text-white/80 mt-1">Drone, montage, digital: recevez une proposition claire et rapide.</p>
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

        {showBackToTop && (
          <button
            onClick={() => {
              setIsNavigating(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.setTimeout(() => setIsNavigating(false), 800);
            }}
            className="fixed bottom-6 right-6 z-50 bg-black/60 text-white border border-white/10 backdrop-blur-md p-3 rounded-full hover:bg-black/80 transition-colors shadow-lg"
            aria-label="Retour en haut"
          >
            <ChevronUp size={18} />
          </button>
        )}
        <CookieBanner />
        <div>
            <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
