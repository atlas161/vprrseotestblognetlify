import React, { useEffect } from 'react';
import { Reveal } from './Reveal';
import { Instagram } from 'lucide-react';

export const Gallery: React.FC = () => {
  useEffect(() => {
    // Charger le script Elfsight
    const script = document.createElement('script');
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Observer pour injecter data-lenis-prevent sur les popups Elfsight qui s'ouvrent dans le body
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node instanceof HTMLElement) {
                    // Vérifier si c'est une popup Elfsight (souvent préfixée par eapps- ou elfsight-)
                    if (node.className && typeof node.className === 'string' && (node.className.includes('eapps-') || node.className.includes('elfsight-'))) {
                        node.setAttribute('data-lenis-prevent', 'true');
                    }
                    // Recherche aussi en profondeur si le nœud ajouté contient la popup
                    const popups = node.querySelectorAll('[class*="eapps-"], [class*="elfsight-"]');
                    popups.forEach(popup => popup.setAttribute('data-lenis-prevent', 'true'));
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      // document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* En-tête de section */}
      <div className="text-center mb-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-accent border border-accent/20 bg-accent/5 px-4 py-2 rounded-full mb-4 hover:bg-accent/10 transition-colors cursor-pointer" onClick={() => window.open('https://instagram.com/eagleproduction.video', '_blank')}>
            <Instagram size={18} />
            <span className="text-sm font-semibold tracking-wide">@eagleproduction.video</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-4">Le feed</h2>
          <p className="text-textSecondary text-xl max-w-2xl mx-auto">
            Nos dernières réalisations et coulisses de tournage en temps réel.
          </p>
        </Reveal>
      </div>

      {/* Widget Elfsight */}
      <Reveal>
        <div 
            className="elfsight-app-272cf2dc-4aec-40b8-b83e-7e0b2389f8b7 overscroll-contain" 
            data-elfsight-app-lazy 
            data-lenis-prevent
        ></div>
      </Reveal>
    </div>
  );
};
