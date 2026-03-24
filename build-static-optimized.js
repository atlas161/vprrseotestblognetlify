import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes à générer en pages HTML statiques
const routes = [
  { path: '/', filename: 'index.html', title: 'EAGLE PRODUCTION | Vidéo, Photo, Digitale | Paul BARDIN votre pilote drone sur Angoulême', description: 'Télépilote professionnel de drone à Angoulême : photos immobilières HDR et vidéos aériennes 4K, de la Cathédrale Saint-Pierre aux Halles centrales. Expert drone certifié DGAC : photogrammétrie et inspections techniques du Plateau (Saint-Ausone, Victor-Hugo) à l\'Hôtel de Ville.' },
  { path: '/chantier', filename: 'chantier.html', title: 'Suivi de chantier BTP | Drone 4K & Photogrammétrie | Eagle Production Angoulême', description: 'Expert en suivi de chantier BTP à Angoulême : orthophotos 4K, comparatifs temporels, photogrammétrie. Télépilote certifié DGAC pour diagnostics et rapports techniques sur toute la Charente.' },
  { path: '/a-propos', filename: 'a-propos.html', title: 'À propos | Paul BARDIN Télépilote Drone Angoulême | Eagle Production', description: 'Paul BARDIN, télépilote de drone professionnel certifié DGAC à Angoulême. Expert en prises de vue aériennes 4K, photogrammétrie et inspections techniques pour professionnels et particuliers.' },
  { path: '/blog', filename: 'blog.html', title: 'Blog Drone | Techniques & Actualités | Eagle Production Angoulême', description: 'Blog expert sur les techniques de drone, photogrammétrie, réglementation DGAC et innovations en prise de vue aérienne. Conseils pratiques pour professionnels du BTP et de l\'immobilier.' },
  { path: '/contact', filename: 'contact.html', title: 'Contact Drone Angoulême | Devis Rapide | Eagle Production Paul BARDIN', description: 'Contactez Paul BARDIN, télépilote drone professionnel à Angoulême. Devis personnalisé pour vidéos aériennes 4K, photos immobilières, inspections techniques et photogrammétrie en Charente.' },
  { path: '/zone', filename: 'zone.html', title: 'Zone d\'intervention | Drone Charente & Nouvelle-Aquitaine | Eagle Production', description: 'Zone d\'intervention complète : Angoulême et toute la Charente (16000), Cognac (16100), Barbezieux (16300), Confolens (16500). Télépilote certifié DGAC pour tous vos projets drone.' },
  { path: '/inspection', filename: 'inspection.html', title: ' Inspection Bâtiment Drone | Toiture & Diagnostic | Eagle Production Angoulême', description: 'Inspection de bâtiments par drone à Angoulême : toitures, façades, diagnostics techniques. Télépilote certifié DGAC pour rapports détaillés 4K et sécurité des interventions en hauteur.' },
  { path: '/faq', filename: 'faq.html', title: 'FAQ Drone Angoulême | Questions/Réponses | Eagle Production Paul BARDIN', description: 'FAQ complète sur les services drone : réglementation DGAC, tarifs, équipements, météo, délais. Réponses de Paul BARDIN, télépilote professionnel certifié à Angoulême.' }
];

// Template HTML optimisé SEO
const createOptimizedHTML = (route) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://www.eagle-prod.com';
  const fullUrl = baseUrl + route.path;
  
  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO PRIMARY TAGS -->
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <meta name="keywords" content="drone Angoulême, vidéo aérienne Charente, pilote drone Angoulême, télépilote Angoulême, photographie drone Angoulême, création site web Angoulême, montage vidéo Angoulême, prestation drone Charente, Eagle Production Angoulême, inspection drone, suivi de chantier, photogrammétrie" />
    <meta name="geo.region" content="FR-16" />
    <meta name="geo.placename" content="Angoulême" />
    <meta name="geo.position" content="45.6484;0.1562" />
    <meta name="ICBM" content="45.6484, 0.1562" />
    <meta name="author" content="Eagle Production" />
    <meta name="robots" content="index, follow" />
    <meta name="city" content="Angoulême" />
    <meta name="country" content="France" />
    <meta name="coverage" content="Charente" />
    <meta name="distribution" content="local" />
    <meta name="revisit-after" content="7 days" />
    <meta name="target" content="all" />
    <meta name="rating" content="general" />
    <meta name="industry" content="Audiovisuel, Immobilier, Construction, Événementiel" />
    <meta name="services" content="Vidéo aérienne, Photo drone, Inspection technique, Photogrammétrie" />
    <meta name="specialization" content="Prise de vue aérienne, Suivi de chantier, Inspection de toiture, Événementiel" />
    <meta name="certification" content="Télépilote certifié DGAC" />
    <meta name="business-type" content="Service aux professionnels et particuliers" />
    <meta name="business-area" content="Centre-ville Angoulême, Zone des Montagnes, Zone des Agriers, Magelis, Espace Carat" />
    <meta name="landmarks" content="Cathédrale Saint-Pierre d'Angoulême, Halles centrales, Hôtel de Ville, CIBDI, Musée de la BD, Espace Franquin" />
    <meta name="districts" content="Centre-ville, Plateau, Victor-Hugo, Saint-Ausone, Ma Campagne, Bel-Air, Grand-Font" />
    <meta name="commercial-zones" content="Galerie du Champ de Mars, Les Halles, Centre Commercial Auchan La Couronne, Parc d'activités Ma Campagne" />
    <meta name="local-infrastructure" content="Gare SNCF Angoulême, Aéroport Angoulême-Cognac, N10, Rocade Est, Rocade Ouest" />

    <link rel="icon" type="image/svg+xml" href="/media/favicon/favicon.svg" />
    <link rel="icon" type="image/png" sizes="96x96" href="/media/favicon/favicon-96x96.png" />
    <link rel="apple-touch-icon" href="/media/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/media/favicon/site.webmanifest" />
    <meta name="theme-color" content="#111111" />

    <!-- OPEN GRAPH / FACEBOOK / LINKEDIN -->
    <meta property="og:type" content="business.business" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="${baseUrl}/Photo_de_paul_bardin.webp" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Paul Bardin - Télépilote professionnel de drone à Angoulême, fondateur d'Eagle Production" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:site_name" content="Eagle Production" />

    <!-- TWITTER -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@eagleproduction" />
    <meta name="twitter:url" content="${fullUrl}" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${baseUrl}/Photo_de_paul_bardin.webp" />
    <meta name="twitter:image:alt" content="Paul Bardin - Télépilote de drone à Angoulême, expert en vidéo aérienne en Charente" />

    <!-- STRUCTURED DATA (JSON-LD) - Généré dynamiquement -->
    <script type="application/ld+json" src="/schema-main.json"></script>
    
    <!-- CANONICAL URL -->
    <link rel="canonical" href="${fullUrl}" />
    
    <!-- HREFLANG FOR INTERNATIONAL -->
    <link rel="alternate" hreflang="fr" href="${fullUrl}" />
    <link rel="alternate" hreflang="en" href="${baseUrl}/en${route.path}" />
    <link rel="alternate" hreflang="x-default" href="${fullUrl}" />
    
    <!-- DNS Prefetch & Preconnect for Performance - Vimeo en priorité -->
    <link rel="preconnect" href="https://player.vimeo.com" crossorigin>
    <link rel="preconnect" href="https://i.vimeocdn.com" crossorigin>
    <link rel="preconnect" href="https://f.vimeocdn.com" crossorigin>
    <link rel="preconnect" href="https://fresnel.vimeocdn.com" crossorigin>
    <link rel="dns-prefetch" href="https://player.vimeo.com">
    <link rel="dns-prefetch" href="https://i.vimeocdn.com">
    <link rel="dns-prefetch" href="https://f.vimeocdn.com">
    <link rel="dns-prefetch" href="https://fresnel.vimeocdn.com">
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Preload Critical Resources -->
    <link rel="preload" href="/media/logo_beige.png" as="image" fetchpriority="high" />
    <link rel="preload" href="/media/aigle_beige.png" as="image" fetchpriority="high" />
    <link rel="preload" href="/index.tsx" as="script" fetchpriority="high" />
    
    <!-- Import Inter font with display swap for faster text rendering -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Main CSS -->
    <link rel="stylesheet" href="/assets/index-ClkLZZTh.css" />
    
    <!-- Critical CSS for animation -->
    <style>
      @keyframes pulse-subtle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }
      .animate-pulse-subtle {
        animation: pulse-subtle 3s ease-in-out infinite;
      }
      
      /* Prevent CLS by reserving space */
      .preloader-placeholder {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Optimize LCP */
      .critical-image {
        aspect-ratio: 16/9;
        background: linear-gradient(135deg, #111111 0%, #1a1a1a 100%);
      }
    </style>
    
</head>
  <body class="bg-background text-textPrimary antialiased selection:bg-accent selection:text-background no-scrollbar">
    <!-- Formulaire caché pour Netlify Forms (détection au build) -->
    <form name="contact" netlify netlify-honeypot="bot-field" hidden>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="text" name="subject" />
      <textarea name="message"></textarea>
    </form>
    
    <div id="root"></div>
  <script type="module" src="/assets/index-DSxZafEP.js"></script>
</body>
</html>`;
};

// Créer le dossier dist s'il n'existe pas
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Générer chaque page optimisée
routes.forEach(route => {
  const filepath = path.join(distDir, route.filename);
  const htmlContent = createOptimizedHTML(route);
  
  fs.writeFileSync(filepath, htmlContent);
  console.log(`✅ Page optimisée générée: ${route.filename}`);
});

console.log(`\n🎉 ${routes.length} pages HTML statiques optimisées SEO générées !`);
console.log('📁 Dossier: dist/');
console.log('🚀 Prêt pour le déploiement avec SEO maximal !');
console.log('⚡ Performance: Preconnect, preload, critical CSS intégrés');
console.log('🎯 SEO: Métadonnées complètes, Open Graph, Schema.org');
