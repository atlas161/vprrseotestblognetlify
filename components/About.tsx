import React from 'react';
import { Reveal } from './Reveal';
import { Quote, Award, MapPin } from 'lucide-react';
import { ABOUT } from '../config/siteConfig';

/**
 * Convertit les balises <strong> et <br/> en éléments React
 */
const renderParagraph = (text: string, index: number) => {
  // Remplace <strong>...</strong> par des spans blancs et <br/> par des sauts de ligne
  const parts = text.split(/(<strong>.*?<\/strong>|<br\s*\/?>)/g);
  
  return (
    <p key={index} className="text-textSecondary text-base md:text-lg leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith('<strong>')) {
          const content = part.replace(/<\/?strong>/g, '');
          return <strong key={i} className="text-white">{content}</strong>;
        }
        if (part.match(/<br\s*\/?>/)) {
          return <br key={i} />;
        }
        return part;
      })}
    </p>
  );
};

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end">
        
        {/* Colonne gauche : Titre + Image */}
        <div className="space-y-6 md:space-y-8 flex flex-col">
            <Reveal delay={200}>
                <div className="flex items-center gap-3 mb-3 md:mb-4 justify-center lg:justify-start">
                    <span className="h-px w-8 md:w-12 bg-accent"></span>
                    <span className="text-accent font-bold uppercase tracking-widest text-[10px] md:text-xs">{ABOUT.sectionLabel}</span>
                </div>
                <h2 id="about-title" className="scroll-mt-16 text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 leading-tight text-center lg:text-left">
                    {ABOUT.title} <br/>
                    <span>{ABOUT.subtitle}</span>
                </h2>
            </Reveal>

            <div className="relative group w-full lg:max-w-none">
                {/* Cadre décoratif */}
                <Reveal>
                    <div className="absolute inset-0 border-2 border-accent/20 translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 rounded-2xl transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"></div>
                </Reveal>
                
                {/* Image Container - Visible immédiatement */}
                <div className="relative rounded-2xl overflow-hidden h-[420px] md:h-[540px] bg-surfaceHighlight shadow-2xl">
                    <img 
                        src={ABOUT.photo.src}
                        alt={ABOUT.photo.alt}
                        loading="eager"
                        decoding="sync"
                        fetchPriority="high"
                        className="w-full h-full object-cover object-[center_60%] transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Badge Overlay */}
                    <Reveal>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-3 md:p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-3 md:gap-4">
                            <div className="bg-accent/20 p-2 rounded-lg text-accent">
                                <MapPin size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-xs md:text-sm">{ABOUT.badge.title}</div>
                                <div className="text-textSecondary text-[10px] md:text-xs">{ABOUT.badge.subtitle}</div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>

        {/* Colonne droite : Texte */}
        <div className="space-y-6 md:space-y-8">
            <Reveal delay={300}>
                <div className="text-left space-y-4">
                    {ABOUT.paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
                </div>
            </Reveal>

            <Reveal delay={400}>
                <div className="relative mt-8 md:mt-10 p-6 md:p-8 bg-surfaceHighlight/30 border-l-4 border-accent rounded-r-2xl">
                    <Quote className="absolute top-4 left-4 text-accent/20 w-6 h-6 md:w-8 md:h-8 transform -scale-x-100" />
                    <p className="text-lg md:text-xl text-white font-light italic relative z-10 pl-2 md:pl-4 animate-pulse-subtle">
                        "{ABOUT.quote.text}"
                    </p>
                    <div className="flex items-center gap-3 mt-4 md:mt-6 pl-2 md:pl-4">
                        <Award size={16} className="text-accent md:w-[18px] md:h-[18px]" />
                        <span className="text-xs md:text-sm text-accent font-mono tracking-widest">{ABOUT.quote.author} // {ABOUT.quote.role}</span>
                    </div>
                </div>
            </Reveal>

        </div>
      </div>
    </div>
  );
};
