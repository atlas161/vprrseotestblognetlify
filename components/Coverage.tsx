import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal';
import { Navigation, Globe, MapPin, Target, Scan, Wifi, ArrowRight } from 'lucide-react';
import L from 'leaflet';

interface Department {
  code: string;
  name: string;
}

interface City {
  name: string;
  lat: number;
  lng: number;
  isHQ?: boolean;
}

const DEPARTMENTS: Department[] = [
  { code: '16', name: 'Charente (QG)' },
  { code: '17', name: 'Charente-Maritime' },
  { code: '79', name: 'Deux-Sèvres' },
  { code: '86', name: 'Vienne' },
  { code: '87', name: 'Haute-Vienne' },
  { code: '24', name: 'Dordogne' },
  { code: '33', name: 'Gironde' },
];

const CITIES: City[] = [
  { name: 'Angoulême', lat: 45.6484, lng: 0.1562, isHQ: true },
  { name: 'La Rochelle', lat: 46.1603, lng: -1.1511 },
  { name: 'Bordeaux', lat: 44.8378, lng: -0.5792 },
  { name: 'Périgueux', lat: 45.1839, lng: 0.7217 },
  { name: 'Niort', lat: 46.3237, lng: -0.4649 },
  { name: 'Poitiers', lat: 46.5802, lng: 0.3404 },
  { name: 'Limoges', lat: 45.8336, lng: 1.2611 },
];

export const Coverage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mobileMapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const geoJsonLayerRef = useRef<any>(null);
  const [activeDep, setActiveDep] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialisation de la carte
  useEffect(() => {
    const targetMapElement = window.innerWidth >= 1024 ? mapRef.current : mobileMapRef.current;
    
    if (!targetMapElement || mapInstance.current) return;

    const controller = new AbortController();
    let cancelled = false;

    try {
        const map = L.map(targetMapElement, {
          center: [45.8, 0.5], // Centre approximatif zone
          zoom: 7,
          zoomControl: false,
          scrollWheelZoom: false,
          attributionControl: false,
          dragging: false, 
          doubleClickZoom: false,
          touchZoom: false, 
          boxZoom: false, 
          keyboard: false, 
        });

        mapInstance.current = map;

        // Fond de carte Dark Matter (très sombre pour contraste HUD)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
          subdomains: 'abcd',
          maxZoom: 19,
          opacity: 1
        }).addTo(map);

        // --- MARQUEUR SONAR (QG) ---
        // On utilise un Custom Icon pour faire l'effet d'onde CSS
        // Correction de l'ancrage pour être parfaitement centré sur Angoulême
        const sonarIcon = L.divIcon({
            className: 'sonar-icon-wrapper', // Wrapper sans taille définie pour éviter les décalages
            html: `
              <div class="sonar-container">
                <div class="sonar-wave"></div>
                <div class="sonar-wave delay-1"></div>
                <div class="sonar-center"></div>
              </div>
            `,
            iconSize: [0, 0], // L'icône elle-même n'a pas de taille, le contenu est centré via CSS absolute
            iconAnchor: [0, 0] // Ancrage au centre exact
        });

        const hqCity = CITIES.find(c => c.isHQ);
        if (hqCity) {
            L.marker([hqCity.lat, hqCity.lng], { icon: sonarIcon, zIndexOffset: 1000 }).addTo(map);
        }

        // --- VILLES ET LABELS ---
        CITIES.forEach(city => {
          // 1. Le point physique (Petit dot)
          if (!city.isHQ) {
            L.circleMarker([city.lat, city.lng], {
              radius: 2,
              fillColor: '#FFFFFF',
              color: '#000',
              weight: 0,
              fillOpacity: 0.8,
            }).addTo(map);
          }

          // 2. Le label texte (Style tactique)
          const labelHtml = city.isHQ 
            ? `<div class="city-label hq">${city.name.toUpperCase()}</div>`
            : `<div class="city-label">${city.name.toUpperCase()}</div>`;

          const labelIcon = L.divIcon({
            className: 'city-label-container',
            html: labelHtml,
            iconSize: [100, 20],
            iconAnchor: [50, 25] // Centré horizontalement (50), label au-dessus du point
          });

          L.marker([city.lat, city.lng], { icon: labelIcon, zIndexOffset: 900 }).addTo(map);
        });

        fetch('/departements-version-simplifiee.geojson', { signal: controller.signal })
          .then(async response => {
            if (!response.ok) {
               throw new Error(`Erreur chargement GeoJSON local: ${response.status}`);
            }
            const text = await response.text();
            return JSON.parse(text);
          })
           .then(data => {
            if (cancelled || !mapInstance.current) return;
            const currentMap = mapInstance.current;
            const targetCodes = DEPARTMENTS.map(d => d.code);
            const targetFeatures = data.features.filter((f: any) => targetCodes.includes(f.properties.code));
            
            // Création de la couche GeoJSON
            const geoJsonLayer = L.geoJSON(data, {
              style: (feature: any) => getFeatureStyle(feature, null),
              onEachFeature: (feature: any, layer: any) => {
                const code = feature.properties.code;
                const isInZone = targetCodes.includes(code);

                if (isInZone) {
                    layer.on({
                      mouseover: () => {
                          setActiveDep(code);
                          layer.bringToFront();
                      },
                      mouseout: () => setActiveDep(null)
                    });
                }
              }
            }).addTo(currentMap);
            
            geoJsonLayerRef.current = geoJsonLayer;
            geoJsonLayer.bringToBack();

            // --- CADRAGE INSTANTANÉ ---
            const targetLayer = L.geoJSON({ type: "FeatureCollection", features: targetFeatures } as any);
            if (targetFeatures.length > 0) {
               // On zoome immédiatement et très fort sur la zone
               currentMap.fitBounds(targetLayer.getBounds(), {
                 padding: [-60, -60], // Zoom maximal
                 animate: false
               });
               setMapReady(true);
            }
          })
           .catch(err => {
            if (cancelled) return;
            console.error("Erreur chargement GeoJSON", err);
            setError("Signal GPS perdu.");
           });

    } catch (error) {
        console.error("Map initialization error:", error);
    }

    return () => {
        cancelled = true;
        controller.abort();
        if (mapInstance.current) {
            mapInstance.current.remove();
            mapInstance.current = null;
        }
    };
  }, []);

  // Gestion des styles dynamiques
  useEffect(() => {
    if (!geoJsonLayerRef.current) return;

    geoJsonLayerRef.current.eachLayer((layer: any) => {
      const featureCode = layer.feature.properties.code;
      const style = getFeatureStyle(layer.feature, activeDep);
      layer.setStyle(style);

      if (activeDep === featureCode || featureCode === '16') {
         if (layer.bringToFront) layer.bringToFront();
      }
    });
  }, [activeDep]);

  const getFeatureStyle = (feature: any, currentActive: string | null) => {
    const code = feature.properties.code;
    const targetCodes = DEPARTMENTS.map(d => d.code);
    const isInZone = targetCodes.includes(code);
    const isHQ = code === '16';
    const isActive = currentActive === code;

    if (!isInZone) {
        return {
            fillColor: '#000000',
            weight: 0,
            opacity: 0,
            fillOpacity: 0.8 // Cache le reste de la France
        };
    }

    let style = {
      fillColor: '#1A1A1A',
      weight: 1.5,
      opacity: 1,
      color: '#D4AF37', // Bordure or par défaut pour "périmètre de vol"
      dashArray: '5, 10', // Effet pointillés technique
      fillOpacity: 0.2
    };

    if (isHQ) {
      style.fillColor = '#D4AF37';
      style.color = '#D4AF37';
      style.weight = 2;
      style.fillOpacity = 0.15;
      style.dashArray = ''; // Bordure pleine pour le QG
    }

    if (isActive) {
      style.fillColor = '#D4AF37';
      style.fillOpacity = 0.3;
      style.weight = 3;
      style.color = '#FFF';
      style.dashArray = '';
    }

    return style;
  };

  return (
    <div className="bg-background py-24 relative border-t border-white/5 overflow-hidden">
      {/* CSS CUSTOM POUR EFFETS DRONE/SONAR */}
      <style>{`
        /* Scanner Animation */
        @keyframes scanMove {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        /* Sonar Pulse Animation */
        @keyframes sonarRipple {
          0% { width: 0px; height: 0px; opacity: 0.8; border-width: 2px; }
          100% { width: 80px; height: 80px; opacity: 0; border-width: 0px; }
        }

        /* Leaflet Overrides */
        .leaflet-container { background: #050505 !important; }
        
        /* Sonar Styles Corrected */
        .sonar-container {
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%); /* CRITIQUE POUR LE CENTRAGE */
            width: 0;
            height: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .sonar-center {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #D4AF37;
            border-radius: 50%;
            box-shadow: 0 0 10px #D4AF37;
            z-index: 20;
        }

        .sonar-wave {
            position: absolute;
            border: 1px solid #D4AF37;
            border-radius: 50%;
            animation: sonarRipple 2s infinite ease-out;
            pointer-events: none;
            box-sizing: border-box;
            /* Centre l'animation */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .delay-1 {
            animation-delay: 0.6s;
        }

        /* City Labels Style */
        .city-label-container {
            background: transparent !important;
            border: none !important;
        }
        .city-label {
            font-family: 'SF Mono', 'Roboto Mono', monospace;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.6);
            letter-spacing: 0.05em;
            text-shadow: 0px 0px 2px black;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            text-align: center;
            gap: 4px;
        }
        .city-label.hq {
            color: #D4AF37;
            font-weight: bold;
            font-size: 11px;
            text-shadow: 0px 0px 4px rgba(212, 175, 55, 0.5);
        }
      `}</style>

      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start relative z-10">
        
        {/* --- COLONNE GAUCHE : Carte mise en avant (Hidden on mobile) --- */}
        <div className="hidden lg:block h-[500px] w-full relative group order-1 self-end">
            
            {/* Conteneur principal avec bordure style écran de contrôle */}
            <div className="w-full h-full relative border border-white/20 bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                
                <div ref={mapRef} className="w-full h-full z-0 outline-none" style={{ background: '#080808' }} />

                {/* --- OVERLAY HUD / DRONE SCANNER --- */}
                <div className="absolute inset-0 pointer-events-none z-[400]">
                    
                    {/* 1. La barre de scan (Laser vert/or) */}
                    <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_15px_#D4AF37] animate-[scanMove_4s_linear_infinite]"></div>
                    <div className="absolute left-0 right-0 h-[50px] bg-gradient-to-b from-accent/10 to-transparent animate-[scanMove_4s_linear_infinite] transform -translate-y-full"></div>

                    {/* 2. Grille tactique */}
                    <div className="absolute inset-0 opacity-10" 
                        style={{ backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
                    </div>

                    {/* 3. Vignetage sombre (effet écran) */}
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,1)]"></div>
                    
                    {/* 4. Éléments UI du HUD */}
                    {/* Coins */}
                    <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-accent/60"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-accent/60"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-accent/60"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-accent/60"></div>
                    
                    {/* Top Info */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-8">
                        <div className="bg-black/80 px-2 py-1 border border-accent/30 text-[10px] font-mono text-accent">
                            REC ● 00:04:23
                        </div>
                        <div className="bg-black/80 px-2 py-1 border border-white/20 text-[10px] font-mono text-white/70">
                            GPS: 45.6484° N
                        </div>
                    </div>

                    {/* Status Alert */}
                    {!mapReady && !error && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50">
                          <div className="text-accent text-lg font-mono tracking-widest animate-pulse flex flex-col items-center">
                              <Scan size={32} className="mb-2" />
                              SYSTEM BOOT...
                          </div>
                       </div>
                    )}
                </div>
            </div>
        </div>

        {/* --- COLONNE DROITE (Info) --- */}
        <div className="space-y-10 order-2">
          <Reveal>
            <div className="flex items-center gap-3 text-accent mb-4">
              <Navigation size={20} />
              <span className="tracking-[0.2em] text-xs font-bold">Zone d'opération</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 leading-tight">
              Rayonnement <br/>
              <span className="text-accent">Grand Ouest</span>
            </h2>
          </Reveal>

          {/* Description concise */}
          <Reveal delay={100}>
            <div className="rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent p-6 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                Une couverture optimale de la région Nouvelle-Aquitaine.
                <br />
                Basés en <strong className="text-white">Charente</strong>, nous garantissons réactivité et proximité.
              </p>
              <a
                href="/zone"
                className="inline-flex items-center justify-center gap-2 bg-accent text-background px-5 py-2.5 rounded-full font-semibold hover:bg-white transition-colors border border-accent/40 w-full sm:w-auto"
              >
                Voir la page
                <ArrowRight size={16} className="shrink-0" />
              </a>
            </div>
          </Reveal>

          {/* Secteurs prioritaires - version simplifiée */}
          <Reveal delay={200}>
             <div className="bg-surfaceHighlight/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
                {/* Tech corners decoration */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent"></div>

                <div className="text-xs text-textSecondary uppercase tracking-wider mb-4 font-mono flex items-center gap-2">
                  <Target size={14} className="text-accent" />
                  Secteurs couverts
                </div>
                
                {/* Grille compacte des départements */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {DEPARTMENTS.slice(0, 6).map((dep) => {
                        const isActive = activeDep === dep.code;
                        return (
                            <button
                                key={dep.code}
                                onMouseEnter={() => setActiveDep(dep.code)}
                                onMouseLeave={() => setActiveDep(null)}
                                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 border rounded-xl transition-all duration-200 ${
                                    isActive 
                                    ? 'bg-accent/10 border-accent text-white' 
                                    : dep.code === '16'
                                        ? 'bg-white/5 border-accent/50 text-accent'
                                        : 'bg-transparent border-white/10 text-textSecondary hover:bg-white/5 hover:border-white/30'
                                }`}
                            >
                                <span className="font-mono text-[10px] opacity-70">{dep.code}</span>
                                <span className="text-xs font-medium text-center leading-tight">
                                    {dep.name.replace(' (QG)', '').replace('-', ' ')}
                                </span>
                                {dep.code === '16' && <Wifi size={10} className={`animate-pulse ${isActive ? 'text-white' : 'text-accent'}`} />}
                            </button>
                        );
                    })}
                </div>
                
                {/* Note sur autres zones */}
                <div className="text-center pt-2 border-t border-white/5">
                    <p className="text-xs text-textSecondary">
                        <span className="text-accent">{DEPARTMENTS.length}</span> départements en Nouvelle-Aquitaine
                    </p>
                    <p className="text-xs text-textSecondary/70 mt-1">
                        Intervention possible sur toute la France
                    </p>
                </div>
             </div>
          </Reveal>
        </div>

        {/* --- CARTE MOBILE (visible uniquement sur mobile) --- */}
        <div className="lg:hidden h-[400px] w-full relative order-1 mb-8">
            <div className="w-full h-full relative border border-white/20 bg-black rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <div ref={mobileMapRef} className="w-full h-full z-0 outline-none" style={{ background: '#080808' }} />
                
                {/* Overlay simplifié pour mobile */}
                <div className="absolute inset-0 pointer-events-none z-[400]">
                    <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,1)]"></div>
                    
                    {/* Coins simplifiés */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-l border-t border-accent/60"></div>
                    <div className="absolute top-2 right-2 w-6 h-6 border-r border-t border-accent/60"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-l border-b border-accent/60"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-r border-b border-accent/60"></div>
                    
                    {!mapReady && !error && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50">
                          <div className="text-accent text-sm font-mono tracking-widest animate-pulse flex flex-col items-center">
                              <Scan size={24} className="mb-1" />
                              CHARGEMENT...
                          </div>
                       </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
