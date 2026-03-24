import React, { useState, useEffect, Fragment } from 'react';
import { HardDrive, Film, Clapperboard, Check, Car, Camera, Usb, ArrowRight, Monitor, Palette, Search, Share2, ShieldCheck, X, Timer, CloudSun, Clock, Rocket, LifeBuoy, ChevronDown } from 'lucide-react';
import { Transition } from '@headlessui/react';
import { Reveal } from './Reveal';
import essentielImg from '../media/images_formules/Essentiel.webp';
import altitudeImg from '../media/images_formules/Altitude.webp';
import horizonImg from '../media/images_formules/Horizon.webp';
import identiteVisuelleImg from '../media/images_formules/Identité_visuelle.webp';
import presenceDigitalImg from '../media/images_formules/Présence_digitalv2.webp';
import reseauxSociauxImg from '../media/images_formules/RéseauxSociaux.webp';

export const Services: React.FC = () => {
  const [showExtras, setShowExtras] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  useEffect(() => {
    if (showExtras) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showExtras]);

  const handleServiceSelect = () => {
    window.location.href = '/contact';
  };

  const closeExtras = () => {
    setShowExtras(false);
  };

  const handleSpecificProjectClick = () => {
    closeExtras();
    setTimeout(() => {
      window.location.href = '/contact';
    }, 300); 
  };

  return (
    <div className="bg-background py-32 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Prestations aériennes</span>
            <h2 id="services-title" className="scroll-mt-20 text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-textPrimary to-textPrimary/60 mb-6">
              Nos formules drone
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-xl text-textSecondary max-w-2xl mx-auto font-light leading-relaxed mb-8">
              Des solutions adaptées à chaque besoin. De la prise de vue aérienne 4K pour l'immobilier à l'inspection technique industrielle, en passant par le suivi de chantier BTP et les captations événementielles. Notre expertise couvre tous les secteurs : immobilier, construction, événementiel, patrimoine, et communication d'entreprise.
            </p>
            
            {/* Certification Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium text-sm lg:hover:bg-accent/20 transition-colors cursor-default shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <ShieldCheck size={18} />
              <span>Vols opérés par télépilote certifié (diplômé d'État)</span>
            </div>
          </Reveal>
        </div>
        
        {/* Pricing Cards (Drone & Audiovisuel) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-16">
          {/* Card 1: TOURNAGE */}
          <Reveal delay={100} className="h-full">
            <div 
              onClick={handleServiceSelect}
              className="group h-full relative bg-surfaceHighlight/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 lg:hover:bg-surfaceHighlight/50 transition-all duration-500 lg:hover:-translate-y-2 cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img src={essentielImg} alt="Formule Essentiel - Tournage drone professionnel à Angoulême avec caméra 4K" className="absolute inset-0 w-full h-full object-cover opacity-60" style={{ objectPosition: '50% 35%' }} loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
              </div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-3 rounded-2xl bg-white/5 text-textPrimary">
                  <Camera size={24} />
                </div>
                <h3 className="text-2xl font-bold text-textPrimary">Tournage</h3>
              </div>
              
              <div className="flex items-end border-b border-white/5 pb-4 mb-8 relative z-10">
                <span className="text-4xl font-bold text-textPrimary">160€</span>
                <span className="text-textSecondary ml-2 mb-1">/ heure</span>
              </div>

              <div className="mb-6 relative z-10">
                <p className="text-white font-medium mb-4">Prestation complète incluant :</p>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-[15px] text-white/90 leading-relaxed">
                    <Check size={18} className="text-textPrimary mt-0.5 shrink-0" />
                    <span>Prises de vue aériennes haute résolution (photos & vidéos par drone)</span>
                  </li>
                  <li className="flex gap-3 text-[15px] text-white/90 leading-relaxed">
                    <Check size={18} className="text-textPrimary mt-0.5 shrink-0" />
                    <span>Tournage vidéo complémentaire avec caméra au sol selon les besoins du projet</span>
                  </li>
                  <li className="flex gap-3 text-[15px] text-white/90 leading-relaxed">
                    <Check size={18} className="text-textPrimary mt-0.5 shrink-0" />
                    <span>Gestion intégrale des démarches administratives et autorisations de vol spécifiques</span>
                  </li>
                  <li className="flex gap-3 text-[15px] text-white/90 leading-relaxed">
                    <Check size={18} className="text-textPrimary mt-0.5 shrink-0" />
                    <span>Mise à disposition de matériel professionnel de pointe et couverture par assurance RC Pro</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto space-y-5 relative z-10 pt-6 border-t border-white/5">
                <div className="flex gap-3 items-start p-3 bg-white/5 rounded-xl border border-white/10">
                  <Timer size={20} className="text-textPrimary shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80 leading-relaxed">Toute prestation de tournage est facturée avec un minimum d'engagement d'une heure.</p>
                </div>
                <div className="flex gap-3 items-start p-3 bg-white/5 rounded-xl border border-white/10">
                  <CloudSun size={20} className="text-textPrimary shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80 leading-relaxed">Les vols étant soumis aux conditions météorologiques, la prestation pourra être reportée sans frais supplémentaires en cas de météo défavorable.</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: MONTAGE */}
          <Reveal delay={300} className="h-full">
            <div 
              onClick={handleServiceSelect}
              className="group h-full relative bg-surfaceHighlight border border-accent/30 rounded-3xl p-6 shadow-2xl shadow-accent/5 z-10 transition-all duration-500 lg:hover:border-accent/50 cursor-pointer overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img src={altitudeImg} alt="Formule Altitude - Montage vidéo professionnel et post-production drone" className="absolute inset-0 w-full h-full object-cover opacity-60" style={{ objectPosition: '50% 40%' }} loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
              </div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-3 rounded-2xl bg-white/5 text-textPrimary">
                  <Film size={24} />
                </div>
                <h3 className="text-2xl font-bold text-textPrimary">Montage vidéo</h3>
              </div>
              
              <div className="flex items-end border-b border-white/5 pb-4 mb-8 relative z-10">
                <span className="text-4xl font-bold text-accent">60€</span>
                <span className="text-textSecondary ml-2 mb-1">/ heure</span>
              </div>

              <div className="mb-6 relative z-10">
                <p className="text-white font-medium mb-4">Prestation sur-mesure incluant :</p>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-[15px] text-white/90 leading-relaxed">
                    <Check size={18} className="text-accent mt-0.5 shrink-0" />
                    <span>Montage vidéo clé en main (dérushage, colorimétrie, mixage audio)</span>
                  </li>
                  <li className="flex gap-3 text-[15px] text-white/90 leading-relaxed">
                    <Check size={18} className="text-accent mt-0.5 shrink-0" />
                    <span>Flexibilité totale avec la possibilité de modifier le montage jusqu'à 3 fois</span>
                  </li>
                  <li className="flex gap-3 text-[15px] text-white/90 leading-relaxed">
                    <Check size={18} className="text-accent mt-0.5 shrink-0" />
                    <span>Respect strict de votre cahier des charges (style, format adapté aux réseaux, musique)</span>
                  </li>
                </ul>
              </div>

              <div className="mt-auto space-y-6 relative z-10 pt-6 border-t border-white/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center">
                    <Usb size={24} className="text-accent mb-2" />
                    <span className="text-sm font-medium text-white mb-1">Support physique</span>
                    <span className="text-xs text-white/70">Clé USB : 12€</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center">
                    <Clock size={24} className="text-accent mb-2" />
                    <span className="text-sm font-medium text-white mb-1">Délais moyens</span>
                    <span className="text-xs text-white/70">5 à 10 jours ouvrés</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6 text-center">
            <h4 className="text-white text-xl font-bold mb-2 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M6 3v12"></path><path d="M6 14a4 4 0 1 0 8 0V3"></path><path d="M20 21V7"></path><path d="M20 7a4 4 0 1 0-8 0"></path>
              </svg>
              Suivi de chantier BTP
            </h4>
            <p className="text-textSecondary mb-5">Découvrez la page dédiée: livrables, sécurité, processus, exemples.</p>
            <a
              href="/chantier"
              className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors border border-accent/40"
            >
              En savoir plus
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <h4 className="text-white text-xl font-bold mb-2 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="m3 7 9-4 9 4-9 4-9-4Z"></path><path d="M4 10v6l8 4 8-4v-6"></path><path d="M4 16l8 4 8-4"></path>
              </svg>
              Inspection de bâtiments par drone
            </h4>
            <p className="text-textSecondary mb-5">Toitures, façades, structures: sécurité, lisibilité, rapport illustré.</p>
            <a
              href="/inspection"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/15 transition-colors border border-white/15"
            >
              Découvrir
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
        {/* Extras Modal */}
        <Transition
          show={showExtras}
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 z-[100] bg-background/20 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setShowExtras(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowExtras(false);
              }}
            >
              <X size={32} />
            </button>
            <div 
              className="max-w-4xl w-full max-h-[80vh] bg-surface rounded-2xl overflow-hidden shadow-xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 md:p-6">
                <div className="flex flex-row items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-accent rounded-full"></div>
                    Options
                  </h4>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation();
                      setShowExtras(false);
                    }}
                    className="bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
                  >
                    <X size={14} />
                    Fermer
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-3 bg-background/50 rounded-xl border border-white/5 lg:group-hover:border-accent/30 transition-all group">
                    <div className="p-2.5 bg-white/5 rounded-lg lg:group-hover:bg-accent/20 transition-colors">
                      <Car className="w-5 h-5 text-textSecondary lg:group-hover:text-accent" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-textPrimary">0,50€ <span className="text-[10px] text-textSecondary font-normal">/km</span></span>
                      <span className="text-[10px] text-textSecondary font-medium tracking-wide">Frais kilométriques</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-background/50 rounded-xl border border-white/5 lg:group-hover:border-accent/30 transition-all group">
                    <div className="p-2.5 bg-white/5 rounded-lg lg:group-hover:bg-accent/20 transition-colors">
                      <Usb className="w-5 h-5 text-textSecondary lg:group-hover:text-accent" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-textPrimary">12€ <span className="text-[10px] text-textSecondary font-normal">/clé</span></span>
                      <span className="text-[10px] text-textSecondary font-medium tracking-wide">Support clé USB</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-background/50 rounded-xl border border-white/5 lg:group-hover:border-accent/30 transition-all group">
                    <div className="p-2.5 bg-white/5 rounded-lg lg:group-hover:bg-accent/20 transition-colors">
                      <Film className="w-5 h-5 text-textSecondary lg:group-hover:text-accent" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-textPrimary">5 à 10 <span className="text-[10px] text-textSecondary font-normal">jours</span></span>
                      <span className="text-[10px] text-textSecondary font-medium tracking-wide">Délai moyen de livraison</span>
                    </div>
                  </div>
                  <div 
                    onClick={handleSpecificProjectClick}
                    className="flex items-center justify-between p-3 bg-accent/10 rounded-xl border border-accent/20 lg:hover:bg-accent/20 transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-accent text-sm">Un projet spécifique ?</span>
                      <span className="text-[10px] text-accent/70 font-medium">Demandez un devis sur mesure</span>
                    </div>
                    <div className="bg-accent text-background p-2 rounded-full lg:group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>


        {/* --- EAGLE DIGITAL SECTION --- */}
        <div id="studio" className="border-t border-white/5 pt-20">
          {/* Header */}
          <Reveal>
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-3 block">Communication digital</span>
            <h3 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-textPrimary to-textPrimary/60 leading-tight pb-2">Eagle Digital</h3>
            <p className="text-lg text-textSecondary max-w-2xl mx-auto font-light mt-6">
              Des solutions complètes pour propulser votre activité sur le web.
            </p>
          </div>
          </Reveal>

          {/* Stack des services (Vertical) */}
          <div className="flex flex-col gap-8">
              
              {/* Carte Packs 360 (VIOLET / FUCHSIA) - MOVED TO TOP */}
              <Reveal>
                <div 
                  onClick={handleServiceSelect}
                  className="group relative bg-gradient-to-br from-fuchsia-900/20 to-fuchsia-900/5 backdrop-blur-2xl border border-fuchsia-500/30 rounded-[2rem] overflow-hidden lg:hover:border-fuchsia-400/60 transition-all duration-500 cursor-pointer shadow-[0_0_40px_rgba(217,70,239,0.1)]"
                >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-transparent opacity-50 lg:group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col h-full relative z-10 p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="p-2 sm:p-3 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.3)] shrink-0 w-fit">
                      <Rocket size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl sm:text-2xl font-bold text-white">Les Packs 360° "Clé en main"</h4>
                      <p className="text-fuchsia-200/70 text-sm mt-1">L'arsenal complet pour décoller</p>
                    </div>
                    <span className="self-start sm:self-center shrink-0 text-[11px] uppercase tracking-widest bg-fuchsia-500/30 text-fuchsia-200 px-3 py-1.5 rounded-full font-bold border border-fuchsia-500/50 shadow-[0_0_10px_rgba(217,70,239,0.2)]">Recommandé</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-fuchsia-500/40 hover:bg-white/10 transition-all duration-300">
                      <div className="flex flex-col gap-3 mb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <span className="text-fuchsia-400 font-bold text-base sm:text-[18px] block mb-1">Le Pack "Décollage Immédiat"</span>
                            <span className="text-white/50 text-xs sm:text-[13px] bg-white/5 px-2 py-0.5 rounded inline-block">~35h à 40h de travail dédié</span>
                          </div>
                          <span className="text-white font-bold text-xl sm:text-[22px] shrink-0 whitespace-nowrap">2&nbsp;400€</span>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">
                        <strong className="text-fuchsia-300 font-medium">Inclus :</strong> Pack "Identité Premium" (Logo + Charte) + Création Site Vitrine Express (1 page) avec statistiques, RGPD, 1 e-mail pro + Paramétrage Fiche Google Business + Visios de brief et formation !
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-fuchsia-500/40 hover:bg-white/10 transition-all duration-300">
                      <div className="flex flex-col gap-3 mb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <span className="text-fuchsia-400 font-bold text-base sm:text-[18px] block mb-1">Le Pack "Vitesse de Croisière"</span>
                            <span className="text-white/50 text-xs sm:text-[13px] bg-white/5 px-2 py-0.5 rounded inline-block">~45h à 50h de travail dédié</span>
                          </div>
                          <span className="text-white font-bold text-xl sm:text-[22px] shrink-0 whitespace-nowrap">2&nbsp;350€</span>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">
                        <strong className="text-fuchsia-300 font-medium">Inclus :</strong> Audit Digital 360° initial + Création Site Vitrine Standard (5 pages) + Pack Starter Réseaux Sociaux + 1 mois de Forfait "Esprit Libre" OFFERT.
                      </p>
                    </div>
                  </div>
                </div>
                </div>
              </Reveal>

              {/* SECTION DÉTAILLÉE : ACCORDÉONS */}
              <div className="mt-8">
                <div className="space-y-4">
                  
                  {/* Accordéon 1: Identité Visuelle */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggleSection('identite')}
                      className="w-full flex items-start sm:items-center justify-between p-4 sm:p-5 md:p-6 hover:bg-white/[0.02] transition-colors text-left gap-3"
                    >
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                          <Palette size={24} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg sm:text-xl font-bold text-white truncate">Identité Visuelle & Print</h4>
                          <p className="text-amber-200/50 text-xs sm:text-sm hidden sm:block">Logo, charte graphique, supports de communication</p>
                        </div>
                      </div>
                      <div className={`p-2 rounded-full bg-white/5 text-white/50 transition-transform duration-300 shrink-0 ${expandedSection === 'identite' ? 'rotate-180 bg-amber-500/20 text-amber-400' : ''}`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-500 ease-in-out ${expandedSection === 'identite' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="p-5 md:p-6 pt-0 border-t border-white/5">
                        <div className="flex flex-col lg:flex-row gap-8">
                          <div className="flex-1">
                            <div className="space-y-2 mt-4">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Création de Logo sur-mesure</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">Visio brief, 2-3 pistes, 2 retours, droits inclus</span>
                                </div>
                                <span className="text-amber-400 font-bold text-base sm:text-[16px] shrink-0">800€</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Charte Graphique complète</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">Guide complet de la marque (livret PDF)</span>
                                </div>
                                <span className="text-amber-400 font-bold text-base sm:text-[16px] shrink-0">500€</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Design de supports de communication</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">Cartes de visite, flyers, kakémonos (le support)</span>
                                </div>
                                <span className="text-amber-400 font-bold text-base sm:text-[16px] shrink-0">120€</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <div className="flex-1 min-w-0">
                                  <span className="text-amber-300 font-bold text-sm sm:text-[15px] block">Pack "Identité Premium"</span>
                                  <span className="text-amber-200/60 text-xs sm:text-[13px]">Logo + Charte + Signature mail + Templates RS</span>
                                </div>
                                <span className="text-amber-400 font-bold text-lg sm:text-[18px] shrink-0">1 350€</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Option "Tranquillité Print"</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">Gestion imprimeur, vérification et livraison</span>
                                </div>
                                <span className="text-white/50 font-bold text-xs sm:text-[12px] uppercase shrink-0">Sur devis</span>
                              </div>
                            </div>
                          </div>
                          <div className="lg:w-1/3 rounded-xl overflow-hidden hidden lg:block border border-white/5">
                            <img src={identiteVisuelleImg} alt="Service identité visuelle - Logo et charte graphique pour entreprise" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordéon 2: Création Web */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggleSection('web')}
                      className="w-full flex items-start sm:items-center justify-between p-4 sm:p-5 md:p-6 hover:bg-white/[0.02] transition-colors text-left gap-3"
                    >
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                          <Monitor size={24} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg sm:text-xl font-bold text-white truncate">Création de Sites Web Premium</h4>
                          <p className="text-indigo-200/50 text-xs sm:text-sm hidden sm:block">Sites vitrines, e-commerce, SEO</p>
                        </div>
                      </div>
                      <div className={`p-2 rounded-full bg-white/5 text-white/50 transition-transform duration-300 shrink-0 ${expandedSection === 'web' ? 'rotate-180 bg-indigo-500/20 text-indigo-400' : ''}`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-500 ease-in-out ${expandedSection === 'web' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="p-5 md:p-6 pt-0 border-t border-white/5">
                        <div className="flex flex-col lg:flex-row gap-8">
                          <div className="flex-1">
                            <div className="space-y-2 mt-4">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Vitrine Express (One-Page)</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">1 page fluide, Bandeau Cookies & RGPD, 1 E-mail pro</span>
                                </div>
                                <span className="text-indigo-400 font-bold text-base sm:text-[16px] shrink-0">1 200€</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Vitrine Standard (Multi-pages)</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">Jusqu'à 5 pages, Bandeau Cookies & RGPD, 2 E-mails</span>
                                </div>
                                <span className="text-indigo-400 font-bold text-base sm:text-[16px] shrink-0">Dès 1 900€</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">E-commerce / Sur-mesure</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">Boutique complète, CGV + Paiement, E-mails illimités</span>
                                </div>
                                <span className="text-indigo-400 font-bold text-base sm:text-[16px] shrink-0">Dès 3 500€</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                                <div className="flex-1 min-w-0">
                                  <span className="text-indigo-300 font-medium text-sm sm:text-[15px] block">Option "Zéro Stress Contenu"</span>
                                  <span className="text-indigo-200/60 text-xs sm:text-[13px]">Rédaction optimisée SEO par nos soins</span>
                                </div>
                                <span className="text-indigo-400 font-bold text-base sm:text-[16px] shrink-0">100€<span className="text-xs font-normal text-indigo-300/50">/page</span></span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Hébergement & Nom de domaine</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">Ensuite à prix coûtant (sans frais cachés)</span>
                                </div>
                                <span className="text-white/80 font-bold text-xs sm:text-[12px] uppercase bg-white/10 px-2 py-1 rounded shrink-0">Inclus an 1</span>
                              </div>
                            </div>
                          </div>
                          <div className="lg:w-1/3 rounded-xl overflow-hidden hidden lg:block border border-white/5">
                            <img src={presenceDigitalImg} alt="Service présence digitale - Site web et stratégie digital pour entreprise" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordéon 3: Stratégie & Visibilité */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggleSection('visibilite')}
                      className="w-full flex items-start sm:items-center justify-between p-4 sm:p-5 md:p-6 hover:bg-white/[0.02] transition-colors text-left gap-3"
                    >
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
                          <Share2 size={24} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg sm:text-xl font-bold text-white truncate">Stratégie, Visibilité & E-mailing</h4>
                          <p className="text-teal-200/50 text-xs sm:text-sm hidden sm:block">Audit, Google Business, réseaux sociaux, newsletters</p>
                        </div>
                      </div>
                      <div className={`p-2 rounded-full bg-white/5 text-white/50 transition-transform duration-300 shrink-0 ${expandedSection === 'visibilite' ? 'rotate-180 bg-teal-500/20 text-teal-400' : ''}`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-500 ease-in-out ${expandedSection === 'visibilite' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="p-5 md:p-6 pt-0 border-t border-white/5">
                        <div className="flex flex-col lg:flex-row gap-8">
                          <div className="flex-1">
                            <div className="space-y-2 mt-4">
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Audit Digital 360°</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">Analyse technique, SEO, RS + Plan d'action</span>
                                </div>
                                <span className="text-teal-400 font-bold text-base sm:text-[16px] shrink-0">250€</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Fiche Google Business</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">Création/optimisation SEO local</span>
                                </div>
                                <span className="text-teal-400 font-bold text-base sm:text-[16px] shrink-0">150€</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                                <div className="flex-1 min-w-0">
                                  <span className="text-teal-300 font-medium text-sm sm:text-[15px] block">Pack "Starter Réseaux Sociaux"</span>
                                  <span className="text-teal-200/60 text-xs sm:text-[13px]">Setup, piliers de contenu, templates Canva</span>
                                </div>
                                <span className="text-teal-400 font-bold text-base sm:text-[16px] shrink-0">550€</span>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 p-3 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Pack "Setup E-mailing"</span>
                                  <span className="text-white/40 text-xs sm:text-[13px]">Config technique, import, 1ère newsletter</span>
                                </div>
                                <span className="text-teal-400 font-bold text-base sm:text-[16px] shrink-0">400€</span>
                              </div>
                            </div>
                          </div>
                          <div className="lg:w-1/3 rounded-xl overflow-hidden hidden lg:block border border-white/5">
                            <img src={reseauxSociauxImg} alt="Service réseaux sociaux - Animation et gestion des réseaux sociaux" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordéon 4: Accompagnement, Sérénité & Temps partagé */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggleSection('accompagnement')}
                      className="w-full flex items-start sm:items-center justify-between p-4 sm:p-5 md:p-6 hover:bg-white/[0.02] transition-colors text-left gap-3"
                    >
                      <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                          <LifeBuoy size={24} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg sm:text-xl font-bold text-white truncate">Accompagnement, Sérénité & Temps partagé</h4>
                          <p className="text-rose-200/50 text-xs sm:text-sm hidden sm:block">Maintenance, assistance, banque d'heures, automatisation</p>
                        </div>
                      </div>
                      <div className={`p-2 rounded-full bg-white/5 text-white/50 transition-transform duration-300 shrink-0 ${expandedSection === 'accompagnement' ? 'rotate-180 bg-rose-500/20 text-rose-400' : ''}`}>
                        <ChevronDown size={20} />
                      </div>
                    </button>
                    
                    <div className={`transition-all duration-500 ease-in-out ${expandedSection === 'accompagnement' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="p-5 md:p-6 pt-0 border-t border-white/5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          
                          {/* Maintenance */}
                          <div className="bg-white/[0.02] rounded-xl p-4 sm:p-6 border border-white/10 hover:border-rose-500/30 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                              <ShieldCheck size={64} className="text-rose-400" />
                            </div>
                            <h5 className="font-bold text-rose-400 mb-4 sm:mb-5 text-base sm:text-[18px] flex items-center gap-2 sm:gap-3 relative z-10">
                              <div className="p-2 rounded-lg bg-rose-500/10 shrink-0">
                                <ShieldCheck size={20} className="text-rose-400" />
                              </div>
                              <span className="truncate">La Maintenance & Assistance</span>
                            </h5>
                            
                            <div className="space-y-4 relative z-10">
                              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start pb-4 border-b border-white/5">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[16px] block mb-0.5 sm:mb-1">Forfait "Esprit Libre"</span>
                                  <span className="text-white/50 text-xs sm:text-[13px] leading-relaxed block">Sauvegardes, sécurité, maintien en ligne</span>
                                </div>
                                <span className="text-white font-bold text-base sm:text-[18px] bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.2)] shrink-0 self-start">49€<span className="text-xs sm:text-[12px] text-white/50 font-normal">/mois</span></span>
                              </div>
                              
                              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start pt-1">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[16px] block mb-0.5 sm:mb-1">L'Assistance humaine</span>
                                  <span className="text-white/50 text-xs sm:text-[13px] leading-relaxed block">1h à 1h30/mois pour vos questions ou bugs</span>
                                </div>
                                <span className="text-rose-300 font-bold text-xs sm:text-[12px] uppercase tracking-wider bg-rose-500/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-rose-500/30 shrink-0 self-start">Inclus</span>
                              </div>
                            </div>
                          </div>

                          {/* Banque d'heures */}
                          <div className="bg-white/[0.02] rounded-xl p-4 sm:p-6 border border-white/10 hover:border-rose-500/30 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                              <Timer size={64} className="text-rose-400" />
                            </div>
                            <h5 className="font-bold text-rose-400 mb-4 sm:mb-5 text-base sm:text-[18px] flex items-center gap-2 sm:gap-3 relative z-10">
                              <div className="p-2 rounded-lg bg-rose-500/10 shrink-0">
                                <Timer size={20} className="text-rose-400" />
                              </div>
                              <span className="truncate">La Banque d'Heures</span>
                            </h5>
                            
                            <div className="space-y-4 relative z-10">
                              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start pb-4 border-b border-white/5">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[16px] block mb-0.5">Pack Flexibilité <span className="text-white/40 font-normal text-xs sm:text-[14px] bg-white/5 px-1.5 py-0.5 rounded">(5h)</span></span>
                                  <span className="text-white/50 text-xs sm:text-[13px]">70€/h : montage, web, design...</span>
                                </div>
                                <span className="text-white font-bold text-base sm:text-[18px] bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.2)] shrink-0 self-start">350€<span className="text-xs sm:text-[12px] text-white/50 font-normal">/mois</span></span>
                              </div>
                              
                              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start pb-4 border-b border-white/5">
                                <div className="flex-1 min-w-0">
                                  <span className="text-rose-400 font-bold text-sm sm:text-[16px] block mb-0.5">Pack Intensif <span className="text-rose-400/40 font-normal text-xs sm:text-[14px] bg-rose-500/10 px-1.5 py-0.5 rounded">(10h)</span></span>
                                  <span className="text-white/50 text-xs sm:text-[13px]">59€/h : l'offre la plus rentable</span>
                                </div>
                                <span className="text-rose-400 font-bold text-base sm:text-[18px] bg-rose-500/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-rose-500/20 shadow-[0_4px_10px_rgba(0,0,0,0.2)] shrink-0 self-start">590€<span className="text-xs sm:text-[12px] text-rose-400/50 font-normal">/mois</span></span>
                              </div>
                              
                              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center pt-1 bg-white/5 p-2 sm:p-3 rounded-lg border border-white/5">
                                <div className="flex-1 min-w-0">
                                  <span className="text-white font-medium text-sm sm:text-[15px] block">Option Automatisation "No-Code"</span>
                                </div>
                                <span className="text-white/60 font-bold text-xs uppercase tracking-widest bg-white/10 px-2 py-1 rounded shrink-0 self-start sm:self-center">Sur dmd</span>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Enhanced Service Card Component
const ServiceCard = ({ title, price, desc, subPrice, icon, isFullHeight }: { title: string, price: string, desc: string, subPrice?: string, icon?: React.ReactNode, isFullHeight?: boolean }) => (
  <div 
    onClick={() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }}
    className={`group bg-surfaceHighlight/30 border border-white/5 rounded-xl p-5 transition-all duration-300 cursor-pointer ${isFullHeight ? 'h-full' : ''}`}
  >
     <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
            {icon && <div className="p-2 rounded-lg bg-white/5 lg:group-hover:bg-accent/10 transition-colors">{icon}</div>}
            <h5 className="font-bold text-textPrimary lg:group-hover:text-white transition-colors text-base">{title}</h5>
        </div>
        <div className="text-right">
             <span className="font-bold text-accent">{price}</span>
        </div>
     </div>
     <p className="text-sm text-textSecondary leading-relaxed">{desc}</p>
     {subPrice && <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-accent/80 font-medium tracking-wide">{subPrice}</div>}
  </div>
);
