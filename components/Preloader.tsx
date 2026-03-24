import React, { useEffect, useState } from 'react';
import eagleBeige from '../media/aigle_beige.png';

interface PreloaderProps {
  isLoading: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // On attend la fin de l'animation CSS (1000ms) avant de retirer l'élément du DOM
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 1000); // Doit correspondre à la durée duration-1000
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative w-32 h-32 md:w-48 md:h-48">
        <img src={eagleBeige} alt="Eagle Production - Logo entreprise drone Angoulême" className="w-full h-full object-contain" loading="lazy" />
      </div>
      
      {/* Progress Bar */}
      <div className="mt-8 w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-accent animate-[loading_2s_ease-in-out_infinite]" style={{ width: '50%' }}></div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};