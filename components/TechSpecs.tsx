import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Reveal } from './Reveal';
import djiLogo from '../media/logo_DJI/DJI_Innovations_logo.svg.svg';
import droneImg from '../media/Photo_DJI/drone_mavic_4.webp';
import { Camera, Scan, Radio, ScanEye } from 'lucide-react';

type FeatureType = 'camera' | 'cinema' | 'security' | 'range' | null;

// Couleur Or/Accent
const ACCENT_COLOR = '#D4AF37';

// ========== CONFIGURATION LIDAR - MODIFIE ICI ==========
// Point A = origine (position de la caméra)
// Point B = coin haut du champ de vision
// Point C = coin bas du champ de vision
const LIDAR_TRIANGLE = {
  A: { x: 31, y: 50},  // Caméra (point de départ)
  B: { x: -150, y: 51 },   // Coin haut-gauche
  C: { x: -100, y: 150 },   // Coin bas-gauche
};
// ========================================================

// Points cibles sur le drone (en % de l'image du drone)
// Basé sur l'image: la nacelle caméra est à gauche, avec 3 objectifs empilés verticalement
const DRONE_TARGETS: Record<string, { x: number; y: number }[]> = {
  camera: [
    { x: 33, y: 50 },  // Objectif du haut (petit rond)
    { x: 31, y: 60 },  // Objectif principal au milieu (gros objectif)
    { x: 35, y: 59 },  // Objectif du bas (petit rond)
  ],
  cinema: [
    { x: 45, y: 35 },
    { x: 46, y: 32 },
    { x: 35, y: 35 },
  ],
  security: [],  // Pas de ligne - on utilise l'effet de vitesse à la place
  // Range n'a pas de ligne - on utilise un effet sonar à la place
};

export const TechSpecs: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureType>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const featureRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [lines, setLines] = useState<{ startX: number; startY: number; endX: number; endY: number }[]>([]);

  const handleMouseEnter = (feature: FeatureType) => setActiveFeature(feature);
  const handleMouseLeave = () => setActiveFeature(null);
  const isActive = (f: FeatureType) => activeFeature === f;

  // Calcul des lignes de connexion
  const calculateLines = useCallback(() => {
    if (!containerRef.current || !droneRef.current || !activeFeature) {
      setLines([]);
      return;
    }

    const featureEl = featureRefs.current[activeFeature];
    if (!featureEl) {
      setLines([]);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const droneRect = droneRef.current.getBoundingClientRect();
    const featureRect = featureEl.getBoundingClientRect();

    // Point de départ : bord gauche du texte (milieu vertical)
    const startX = featureRect.left - containerRect.left;
    const startY = featureRect.top - containerRect.top + featureRect.height / 2;

    // Points d'arrivée sur le drone
    const targets = DRONE_TARGETS[activeFeature] || [];
    const newLines = targets.map((target) => ({
      startX,
      startY,
      endX: droneRect.left - containerRect.left + (target.x / 100) * droneRect.width,
      endY: droneRect.top - containerRect.top + (target.y / 100) * droneRect.height,
    }));

    setLines(newLines);
  }, [activeFeature]);

  useEffect(() => {
    calculateLines();
    window.addEventListener('resize', calculateLines);
    window.addEventListener('scroll', calculateLines);
    return () => {
      window.removeEventListener('resize', calculateLines);
      window.removeEventListener('scroll', calculateLines);
    };
  }, [calculateLines]);

  return (
    <div className="bg-surface py-32 border-t border-white/5 overflow-hidden">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative"
      >
        
        {/* SVG GLOBAL - Par dessus tout pour les lignes de connexion */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
          style={{ zIndex: 50, overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="lineGradientGold" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={ACCENT_COLOR} stopOpacity="0.1" />
              <stop offset="50%" stopColor={ACCENT_COLOR} stopOpacity="0.5" />
              <stop offset="100%" stopColor={ACCENT_COLOR} stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {lines.map((line, i) => {
            const pathLength = Math.sqrt(
              Math.pow(line.endX - line.startX, 2) + Math.pow(line.endY - line.startY, 2)
            );

            return (
              <g key={`${activeFeature}-${i}`}>
                {/* Ligne droite */}
                <line
                  x1={line.startX}
                  y1={line.startY}
                  x2={line.endX}
                  y2={line.endY}
                  stroke={ACCENT_COLOR}
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  strokeDasharray={pathLength}
                  strokeDashoffset="0"
                  style={{
                    animation: 'drawLine 0.5s ease-out forwards',
                  }}
                />
                
                {/* Point de départ */}
                <circle
                  cx={line.startX}
                  cy={line.startY}
                  r="3"
                  fill={ACCENT_COLOR}
                  fillOpacity="0.8"
                />
                
                {/* Point d'arrivée avec pulse */}
                <circle
                  cx={line.endX}
                  cy={line.endY}
                  r="4"
                  fill="none"
                  stroke={ACCENT_COLOR}
                  strokeWidth="1"
                  strokeOpacity="0.6"
                >
                  <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle
                  cx={line.endX}
                  cy={line.endY}
                  r="2"
                  fill={ACCENT_COLOR}
                  fillOpacity="0.9"
                />
              </g>
            );
          })}
        </svg>

        {/* CSS pour l'animation */}
        <style>{`
          @keyframes drawLine {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
          }
        `}</style>

        {/* DRONE IMAGE - LEFT */}
        <div className="hidden md:flex flex-1 w-full justify-center order-1 md:order-1">
          <Reveal delay={300} className="relative w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-gradient-to-br from-zinc-900 via-neutral-900 to-stone-950">
            
            {/* Background Texture & Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.03)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(100,100,100,0.08)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02)_0%,transparent_50%,rgba(0,0,0,0.3)_100%)]"></div>
            {/* Logo DJI en fond */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
              <img src={djiLogo} alt="Logo DJI - Leader mondial des drones professionnels" className="w-[80%] h-auto" loading="lazy" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}></div>
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]"></div>

            {/* Image Container */}
            <div className="absolute inset-0 flex items-center justify-center p-12 transition-transform duration-700">
               {/* Ombre du drone */}
               <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[60%] h-[8%] bg-black/30 rounded-[50%] blur-xl"></div>
               <img 
                   ref={droneRef}
                   src={droneImg} 
                   alt="DJI Mavic 4 Pro" 
                   className="w-full h-full object-contain relative z-10 transition-transform duration-700 drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
               />
            </div>

            {/* LiDAR Field of View - Maintenant avec effet 3 points */}
            <svg 
              className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${isActive('cinema') ? 'opacity-100' : 'opacity-0'}`}
              style={{ zIndex: 15 }}
              viewBox="0 0 100 100" 
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Les points statiques ont été retirés pour ne laisser que les lignes connectées */}

              {/* FLUX D'AIR DE PREMIER PLAN (Sur le fuselage) */}
              {/* S'affiche uniquement si Vitesse Max est actif */}
              <g className={`transition-opacity duration-500 ${isActive('security') ? 'opacity-100' : 'opacity-0'}`}>
                  <defs>
                    <linearGradient id="fuselageStreamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={ACCENT_COLOR} stopOpacity="0" />
                        <stop offset="30%" stopColor={ACCENT_COLOR} stopOpacity="0.8" />
                        <stop offset="70%" stopColor={ACCENT_COLOR} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={ACCENT_COLOR} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Ligne qui passe SUR le nez et le corps */}
                  {/* Coordonnées approximatives: Nez ~38,55 -> Corps ~55,50 */}
                  <path d="M 35 55 Q 45 52 60 48" stroke="url(#fuselageStreamGradient)" strokeWidth="1.2" fill="none" strokeDasharray="60,120" strokeLinecap="round">
                      <animate attributeName="stroke-dashoffset" from="180" to="-60" dur="0.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" />
                  </path>
                  
                  <path d="M 38 58 Q 48 55 65 50" stroke="url(#fuselageStreamGradient)" strokeWidth="0.8" fill="none" strokeDasharray="40,100" strokeLinecap="round">
                      <animate attributeName="stroke-dashoffset" from="140" to="-40" dur="0.6s" begin="0.2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;0.8;0" dur="0.6s" begin="0.2s" repeatCount="indefinite" />
                  </path>
              </g>
            </svg>

            {/* Effet de vitesse - Vortex et Traînées (Arrière-plan) */}
            <svg 
              className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${isActive('security') ? 'opacity-100' : 'opacity-0'}`}
              style={{ zIndex: 5 }}
              viewBox="0 0 100 100" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="vortexGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={ACCENT_COLOR} stopOpacity="0.1" />
                  <stop offset="40%" stopColor={ACCENT_COLOR} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={ACCENT_COLOR} stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* --- GROUPE VORTEX MOTEURS --- */}
              {/* Basé sur l'image: Drone orienté vers la gauche, vue de 3/4 face */}
              {/* Nez ~35,55 | Moteur AG ~12,48 | Moteur AD ~75,30 | Moteur AR-G ~38,70 (caché) | Moteur AR-D ~85,40 */}
              
              <g>
                {/* 1. MOTEUR AVANT-GAUCHE (Celui tout à gauche) ~12,48 */}
                {/* Le flux part du moteur et file vers l'arrière (droite) */}
                <path d="M 12 48 C 20 48 30 50 60 55" stroke="url(#vortexGradient)" strokeWidth="1.5" fill="none" opacity="0.6" strokeDasharray="5,3">
                   <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.3s" repeatCount="indefinite" />
                   <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1s" repeatCount="indefinite" />
                </path>
                {/* Spirale turbulente */}
                <path d="M 12 48 l 5 2 l 5 -2 l 5 2 l 5 -2" stroke={ACCENT_COLOR} strokeWidth="0.8" fill="none" opacity="0">
                    <animate attributeName="d" values="M 12 48 l 5 2 l 5 -2 l 5 2; M 12 48 l 10 4 l 10 -4 l 10 4" dur="0.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0" dur="0.4s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" from="0 0" to="30 10" dur="0.4s" repeatCount="indefinite" />
                </path>

                {/* 2. MOTEUR AVANT-DROIT (Haut Droite, le plus haut) ~75,30 */}
                <path d="M 75 30 L 105 25" stroke="url(#vortexGradient)" strokeWidth="1" fill="none" strokeDasharray="10,5">
                    <animate attributeName="stroke-dashoffset" from="50" to="0" dur="0.2s" repeatCount="indefinite" />
                </path>

                {/* 3. MOTEUR ARRIÈRE-DROIT (Haut, très à droite) ~85,40 */}
                <path d="M 85 40 L 110 38" stroke="url(#vortexGradient)" strokeWidth="1" fill="none" strokeDasharray="10,5">
                    <animate attributeName="stroke-dashoffset" from="50" to="0" dur="0.2s" repeatCount="indefinite" />
                </path>
                
                 {/* 4. MOTEUR ARRIÈRE-GAUCHE (Bas, sous le corps) ~38,65 */}
                <path d="M 38 65 C 50 65 70 68 90 70" stroke="url(#vortexGradient)" strokeWidth="1.2" fill="none" strokeDasharray="5,3">
                    <animate attributeName="stroke-dashoffset" from="50" to="0" dur="0.25s" repeatCount="indefinite" />
                </path>
              </g>

              {/* --- GROUPE FLUX D'AIR AMBIANT (Speed Lines) --- */}
              <g opacity="0.4">
                 {[...Array(8)].map((_, i) => (
                    <line key={i} x1="-10" y1={10 + i * 12} x2="110" y2={10 + i * 12 + 5} stroke={ACCENT_COLOR} strokeWidth={0.5} strokeDasharray="20,150" strokeDashoffset="0">
                        <animate attributeName="stroke-dashoffset" from="170" to="0" dur={`${0.5 + i * 0.1}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;1;0" dur={`${0.5 + i * 0.1}s`} repeatCount="indefinite" />
                    </line>
                 ))}
              </g>
              
              {/* --- PARTICULES DE POUSSIÈRE RAPIDES --- */}
              <g>
                 {[...Array(6)].map((_, i) => (
                    <circle key={i} cx="0" cy={Math.random() * 100} r={0.5 + Math.random()} fill="white" opacity="0">
                        <animate attributeName="cx" values="0;120" dur="0.4s" begin={`${Math.random()}s`} repeatCount="indefinite" />
                        <animate attributeName="cy" from={`${Math.random() * 100}`} to={`${Math.random() * 100 + 10}`} dur="0.4s" begin={`${Math.random()}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;0.8;0" dur="0.4s" begin={`${Math.random()}s`} repeatCount="indefinite" />
                    </circle>
                 ))}
              </g>

            </svg>
            
            {/* SONAR Effect pour Range - SOUS le drone (z-index 5, avant l'image) */}
            <svg 
              className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ${isActive('range') ? 'opacity-100' : 'opacity-0'}`}
              style={{ zIndex: 5 }}
              viewBox="0 0 100 100" 
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Ondes sonar qui émanent du dessous du drone - position plus basse */}
              <g>
                {/* Onde 1 */}
                <ellipse cx="40" cy="62" rx="3" ry="1" fill="none" stroke={ACCENT_COLOR} strokeWidth="0.4" opacity="0">
                  <animate attributeName="rx" values="3;45" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="1;25" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="62;75" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="2.5s" repeatCount="indefinite" />
                </ellipse>
                {/* Onde 2 - décalée */}
                <ellipse cx="40" cy="62" rx="3" ry="1" fill="none" stroke={ACCENT_COLOR} strokeWidth="0.4" opacity="0">
                  <animate attributeName="rx" values="3;45" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="1;25" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="62;75" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
                </ellipse>
                {/* Onde 3 - décalée */}
                <ellipse cx="40" cy="62" rx="3" ry="1" fill="none" stroke={ACCENT_COLOR} strokeWidth="0.4" opacity="0">
                  <animate attributeName="rx" values="3;45" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="1;25" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="62;75" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                </ellipse>
                {/* Onde 4 - décalée */}
                <ellipse cx="40" cy="62" rx="3" ry="1" fill="none" stroke={ACCENT_COLOR} strokeWidth="0.4" opacity="0">
                  <animate attributeName="rx" values="3;45" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
                  <animate attributeName="ry" values="1;25" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="62;75" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
                </ellipse>
              </g>
            </svg>

            {/* Interactive Hotspots */}
            <div className="absolute inset-0 z-30 grid grid-cols-3 grid-rows-3">
                <div className="col-start-2 row-start-1 row-span-2 cursor-pointer" onMouseEnter={() => handleMouseEnter('camera')} onMouseLeave={handleMouseLeave} />
                <div className="col-start-1 row-start-1 cursor-pointer" onMouseEnter={() => handleMouseEnter('security')} onMouseLeave={handleMouseLeave} />
                <div className="col-start-3 row-start-1 cursor-pointer" onMouseEnter={() => handleMouseEnter('security')} onMouseLeave={handleMouseLeave} />
                <div className="col-start-1 row-start-3 cursor-pointer" onMouseEnter={() => handleMouseEnter('security')} onMouseLeave={handleMouseLeave} />
                <div className="col-start-3 row-start-3 cursor-pointer" onMouseEnter={() => handleMouseEnter('security')} onMouseLeave={handleMouseLeave} />
                <div className="col-start-2 row-start-3 cursor-pointer" onMouseEnter={() => handleMouseEnter('range')} onMouseLeave={handleMouseLeave} />
            </div>

            {/* Indicateur technique discret */}
            <div className={`absolute bottom-5 right-5 z-40 transition-all duration-300 ${activeFeature ? 'opacity-100' : 'opacity-50'}`}>
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-white/70">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full transition-colors duration-200 ${activeFeature ? 'bg-accent' : 'bg-white/40'}`}></span>
                    <span className="transition-all duration-200">
                        {isActive('camera') ? 'CAMERA' : 
                         isActive('cinema') ? 'LIDAR' :
                         isActive('security') ? 'SPEED' :
                         isActive('range') ? 'RANGE' : 'READY'}
                    </span>
                </div>
            </div>

          </Reveal>
        </div>

        {/* TEXT COLUMN - RIGHT avec grille 2x2 */}
        <div className="flex-1 space-y-10 relative z-10 order-2 md:order-2">
          <Reveal>
            <div className="flex items-center gap-5 mb-6 opacity-90">
              <img src={djiLogo} alt="DJI - Leader mondial des drones civils et professionnels" className="h-5 w-auto" loading="lazy" style={{ filter: 'brightness(0) saturate(100%) invert(73%) sepia(67%) saturate(398%) hue-rotate(6deg) brightness(92%) contrast(88%)' }} />
              <div className="h-4 w-[1px] bg-accent/50"></div>
              <span className="text-sm font-bold tracking-[0.3em] text-accent uppercase">Flagship Series</span>
            </div>

            <h2 id="tech-title" className="scroll-mt-20 text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 leading-tight">
              DJI Mavic 4 Pro
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl text-textSecondary leading-relaxed font-light">
              L'excellence réinventée. Équipé d'une <strong className="text-white">caméra de qualité cinéma</strong> et de 3 objectifs, il capture des images époustouflantes avec une stabilité parfaite, même à grande distance.
            </p>
          </Reveal>
          
          <Reveal delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6 pt-6 items-end">
              
              {/* Feature 1 - Triple caméra */}
              <div 
                ref={(el) => { featureRefs.current['camera'] = el; }}
                className={`relative border-l pl-6 group transition-all duration-300 cursor-default ${isActive('camera') ? 'border-accent' : 'border-white/20 hover:border-accent'}`}
                onMouseEnter={() => handleMouseEnter('camera')}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`text-3xl font-semibold transition-colors ${isActive('camera') ? 'text-accent' : 'text-textPrimary group-hover:text-accent'}`}>Triple caméra</div>
                <div className="text-textSecondary text-[11px] uppercase tracking-wider mt-2 flex items-center gap-2 font-medium">
                    <Camera size={14} /> Plans larges et zooms
                </div>
              </div>

              {/* Feature 2 - LiDAR 3D */}
              <div 
                ref={(el) => { featureRefs.current['cinema'] = el; }}
                className={`relative border-l pl-6 group transition-all duration-300 cursor-default ${isActive('cinema') ? 'border-accent' : 'border-white/20 hover:border-accent'}`}
                onMouseEnter={() => handleMouseEnter('cinema')}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`text-3xl font-semibold transition-colors ${isActive('cinema') ? 'text-accent' : 'text-textPrimary group-hover:text-accent'}`}>LiDAR 3D</div>
                <div className="text-textSecondary text-[11px] uppercase tracking-wider mt-2 flex items-center gap-2 font-medium">
                    <Scan size={14} /> Cartographie laser
                </div>
              </div>

              {/* Feature 3 - Vitesse max */}
              <div 
                ref={(el) => { featureRefs.current['security'] = el; }}
                className={`relative border-l pl-6 group transition-all duration-300 cursor-default ${isActive('security') ? 'border-accent' : 'border-white/20 hover:border-accent'}`}
                onMouseEnter={() => handleMouseEnter('security')}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`text-3xl font-semibold transition-colors ${isActive('security') ? 'text-accent' : 'text-textPrimary group-hover:text-accent'}`}>Vitesse max</div>
                <div className="text-textSecondary text-[11px] uppercase tracking-wider mt-2 flex items-center gap-2 font-medium">
                    <ScanEye size={14} /> 90 km/h
                </div>
              </div>

              {/* Feature 4 - Portée 40km */}
              <div 
                ref={(el) => { featureRefs.current['range'] = el; }}
                className={`relative border-l pl-6 group transition-all duration-300 cursor-default ${isActive('range') ? 'border-accent' : 'border-white/20 hover:border-accent'}`}
                onMouseEnter={() => handleMouseEnter('range')}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`text-3xl font-semibold transition-colors ${isActive('range') ? 'text-accent' : 'text-textPrimary group-hover:text-accent'}`}>Portée 40km</div>
                <div className="text-textSecondary text-[11px] uppercase tracking-wider mt-2 flex items-center gap-2 font-medium">
                    <Radio size={14} /> Signal vidéo stable
                </div>
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
