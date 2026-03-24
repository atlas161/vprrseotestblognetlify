import React, { useEffect, useState } from 'react';

const GTM_ID = 'GTM-P6ZWJ8RQ';

const injectGtm = () => {
  if ((window as any).google_tag_manager && (window as any).google_tag_manager[GTM_ID]) {
    return; // GTM already initialized
  }

  (function(w: any, d: any, s: string, l: string, i: string) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', GTM_ID);
};

export const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ga_consent');
    // Afficher la bannière seulement si aucun choix n'a été fait
    setVisible(consent === null);
    
    // Si déjà accepté, on injecte GTM
    if (consent === 'true') {
      injectGtm();
    }
  }, []);

  const handleClose = (accepted: boolean) => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem('ga_consent', accepted ? 'true' : 'false');
      setVisible(false);
      if (accepted) {
        injectGtm();
      }
    }, 300);
  };

  if (!visible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 max-w-[340px] bg-black/60 text-white border border-white/10 backdrop-blur-xl rounded-xl shadow-lg transition-all duration-300 ${isClosing ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
      <div className="px-4 py-3 flex flex-col gap-3">
        <div className="text-[12px] leading-snug text-white/80">
          Nous utilisons des cookies et Google Tag Manager pour mesurer l’audience et améliorer votre expérience.
          En cliquant « Accepter », vous consentez à leur utilisation.
          <a href="/mentions-legales.html#confidentialite" className="text-accent font-semibold ml-1 hover:underline">En savoir plus</a>
        </div>
        <div className="flex-shrink-0 flex flex-col gap-2">
          <button
            onClick={() => handleClose(true)}
            className="bg-accent text-background text-[12px] font-bold px-3 py-2 rounded-full hover:bg-white transition-colors w-full"
            aria-label="Accepter les cookies"
          >
            Accepter
          </button>
          <button
            onClick={() => handleClose(false)}
            className="text-white/70 hover:text-white text-[12px] font-medium px-2 py-1 w-full"
            aria-label="Refuser les cookies"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
};
