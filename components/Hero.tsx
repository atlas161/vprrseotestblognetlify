import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Play, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Player from '@vimeo/player';
import { HERO_VIDEO } from '../config/siteConfig';

interface HeroProps {
  onScrollDown: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollDown }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const vimeoPlayerRef = useRef<Player | null>(null);
  const userInteractedRef = useRef(false);

  // Initialisation du Player Vimeo
  useEffect(() => {
      // On attend un court instant que le DOM soit bien monté
      const initPlayer = setTimeout(() => {
        if (videoContainerRef.current && !vimeoPlayerRef.current) {
            const iframe = videoContainerRef.current.querySelector('iframe');
            if (iframe) {
                const player = new Player(iframe);
                vimeoPlayerRef.current = player;

                player.ready().then(() => {
                    player.on('timeupdate', (data) => {
                        setProgress((data.seconds / data.duration) * 100);
                    });

                    player.on('play', () => setIsPlaying(true));
                    player.on('pause', () => setIsPlaying(false));
                    
                    // Configuration initiale
                    player.setVolume(0);
                    player.setLoop(true);
                });
            }
        }
      }, 100);

      return () => clearTimeout(initPlayer);
  }, []);

  // Gestion de l'arrêt automatique au scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isVideoOpen && window.scrollY > 50) {
        handleCloseVideo();
      }
    };
    if (isVideoOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVideoOpen]);

  // Timer d'immersion automatique
  useEffect(() => {
    const timer = setTimeout(() => {
        if (!userInteractedRef.current && !isVideoOpen && window.scrollY < 20) {
            handleOpenVideo();
        }
    }, HERO_VIDEO.autoOpenDelay); 
    return () => clearTimeout(timer);
  }, [isVideoOpen]);

  const handleOpenVideo = () => {
    userInteractedRef.current = true;
    setIsVideoOpen(true);
    setIsMuted(false); 
    setIsPlaying(true);
    
    if (vimeoPlayerRef.current) {
        vimeoPlayerRef.current.setVolume(1);
        vimeoPlayerRef.current.play();
    }
  };

  const handleCloseVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsVideoOpen(false);
    setIsMuted(true); 
    
    if (vimeoPlayerRef.current) {
        vimeoPlayerRef.current.setVolume(0);
        vimeoPlayerRef.current.play(); // Continuer à jouer en fond
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (vimeoPlayerRef.current) {
        if (isPlaying) {
            vimeoPlayerRef.current.pause();
        } else {
            vimeoPlayerRef.current.play();
        }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (vimeoPlayerRef.current) {
        const newMutedState = !isMuted;
        vimeoPlayerRef.current.setVolume(newMutedState ? 0 : 1);
        setIsMuted(newMutedState);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (vimeoPlayerRef.current) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = x / width;
        
        vimeoPlayerRef.current.getDuration().then((duration) => {
            vimeoPlayerRef.current?.setCurrentTime(percentage * duration);
        });
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      
      {/* Video Container with Shared Layout Transition */}
      <motion.div
        layout
        layoutId="video-container"
        className={`absolute inset-0 z-0 overflow-hidden ${
            isVideoOpen ? 'fixed z-[100] bg-black' : 'absolute z-0 cursor-pointer group'
        }`}
        onClick={!isVideoOpen ? handleOpenVideo : undefined}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
         {/* Vimeo Iframe Wrapper with Force Cover CSS */}
         <style dangerouslySetInnerHTML={{__html: `
            .vimeo-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
            }
            .vimeo-wrapper iframe {
                width: 100vw;
                height: 56.25vw; /* Given a 16:9 aspect ratio, 9/16*100 = 56.25 */
                min-height: 100vh;
                min-width: 177.77vh; /* Given a 16:9 aspect ratio, 16/9*100 = 177.77 */
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
         `}} />
         
         <div ref={videoContainerRef} className={`vimeo-wrapper transition-all duration-700 ${
                isVideoOpen ? 'scale-100' : 'scale-105 group-hover:scale-100'
            }`}>
            {/* @ts-ignore */}
            <iframe 
                src={HERO_VIDEO.embedUrl} 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" 
                allowFullScreen
                title="video_présentation_eagle_prod"
                loading="eager"
                fetchPriority="high"
            ></iframe>
         </div>

        {/* Custom Controls Overlay (Only in Fullscreen) */}
        <AnimatePresence>
            {isVideoOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-end pb-12 px-8 md:px-24 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                >
                    {/* Progress Bar */}
                    <div 
                        className="w-full h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer group/progress relative"
                        onClick={handleSeek}
                    >
                        <div 
                            className="absolute top-0 left-0 h-full bg-accent rounded-full transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                        <div 
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity"
                            style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
                        />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-6">
                            <button onClick={togglePlay} className="hover:text-accent transition-colors">
                                {isPlaying ? <div className="w-4 h-4 border-l-2 border-r-2 border-current" /> : <Play size={24} fill="currentColor" />}
                            </button>
                            <button onClick={toggleMute} className="hover:text-accent transition-colors">
                                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                            </button>
                        </div>
                        <button onClick={handleCloseVideo} className="text-sm font-medium hover:text-accent transition-colors uppercase tracking-widest">
                            Fermer
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Overlay Gradient - Hidden in Fullscreen */}
        {!isVideoOpen && (
             <motion.div 
                initial={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"
             />
        )}

        {/* Close Button (Fullscreen only) */}
        <AnimatePresence>
            {isVideoOpen && (
                <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.5 }}
                    onClick={handleCloseVideo}
                    className="absolute top-6 right-6 z-[110] bg-black/50 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-black transition-all"
                >
                    <X size={24} />
                </motion.button>
            )}
        </AnimatePresence>
      </motion.div>

      {/* Content - Masqué quand la vidéo est en plein écran */}
      <motion.div 
        className="relative z-10 text-left px-0 max-w-none"
        animate={{ opacity: isVideoOpen ? 0 : 1, y: isVideoOpen ? 50 : 0, pointerEvents: isVideoOpen ? 'none' : 'auto' }}
        transition={{ duration: 0.5 }}
      >
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z"/>
              </svg>
              <span className="text-xs text-white/90 tracking-wide">5/5</span>
              <span className="text-xs text-white/85">Avis Google</span>
              <span className="text-xs text-white/60">•</span>
              <span className="text-xs text-white/75">37+</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-textPrimary to-textPrimary/70 mb-6 drop-shadow-2xl px-4">
            Votre projet mérite<br />une prise de vue au drone
            </h1>
            <p className="text-lg md:text-xl text-textSecondary font-light max-w-2xl mb-10 drop-shadow-md px-4">
            Prises de vue drone précises et accompagnement créatif pour sublimer vos projets. Télépilote certifié DGAC à Angoulême, intervention en Charente et Nouvelle-Aquitaine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start px-4">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    const el = document.getElementById('services-title');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                }}
                className="bg-accent text-background px-8 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:bg-white hover:text-background transition-all active:scale-95"
            >
                Voir nos formules
            </button>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpenVideo();
                }}
                className="px-8 py-3 rounded-full font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-2 backdrop-blur-md"
            >
                <Play size={18} className="text-accent" /> Voir le showreel
            </button>
            </div>

            <div className="mt-4 px-4">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    const el = document.getElementById('studio');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-accent hover:text-accent/80 font-medium px-4 py-2 transition-colors drop-shadow-md"
            >
                Services complémentaires
            </button>
            </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ opacity: isVideoOpen ? 0 : 1 }}
        onClick={(e) => {
            e.stopPropagation();
            onScrollDown();
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-textSecondary/50 cursor-pointer hover:text-textPrimary transition-colors z-10"
      >
        <ChevronDown size={32} />
      </motion.div>
    </div>
  );
};
