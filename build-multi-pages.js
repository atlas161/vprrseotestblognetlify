import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pages à générer avec métadonnées SEO spécifiques
const pages = [
  {
    name: 'index',
    route: '/',
    title: 'Eagle Production - Prises de vue drone et services audiovisuels',
    description: 'Télépilote certifié DGAC à Angoulême. Prises de vue drone 4K, montage vidéo, inspection technique et services digital pour toute la Charente et Nouvelle-Aquitaine.'
  },
  {
    name: 'chantier',
    route: '/chantier',
    title: 'Suivi de chantier BTP - Drone Eagle Production Angoulême',
    description: 'Suivi de chantier BTP par drone à Angoulême. Photogrammétrie, inspections techniques et documentation 4K pour les professionnels du bâtiment en Charente.'
  },
  {
    name: 'a-propos',
    route: '/a-propos',
    title: 'À propos - Eagle Production Paul BARDIN Télépilote drone Angoulême',
    description: 'Découvrez Eagle Production, entreprise spécialisée dans les prises de vue drone à Angoulême. Paul BARDIN, télépilote certifié DGAC, vous accompagne dans vos projets.'
  },
  {
    name: 'blog',
    route: '/blog',
    title: 'Blog Drone - Actualités et conseils Eagle Production Angoulême',
    description: 'Blog spécialisé drone : techniques, réglementation, études de cas et actualités. Suivez nos aventures de télépilote certifié en Charente et Nouvelle-Aquitaine.'
  },
  {
    name: 'contact',
    route: '/contact',
    title: 'Contactez Eagle Production - Devis drone Angoulême Charente',
    description: 'Contactez Eagle Production pour vos projets drone à Angoulême et en Charente. Télépilote certifié DGAC, devis gratuit pour prises de vue aériennes 4K et inspections.'
  },
  {
    name: 'zone',
    route: '/zone',
    title: 'Zone d\'intervention - Drone Eagle Production Charente Nouvelle-Aquitaine',
    description: 'Zone d\'intervention Eagle Production : Angoulême, Charente, Nouvelle-Aquitaine. Télépilote certifié pour vos projets drone dans toute la région.'
  },
  {
    name: 'inspection',
    route: '/inspection',
    title: 'Inspection bâtiments par drone - Eagle Production Angoulême',
    description: 'Inspection technique de bâtiments par drone à Angoulême. Toitures, façades, structures : diagnostics précis et sécurisés par télépilote certifié DGAC.'
  },
  {
    name: 'faq',
    route: '/faq',
    title: 'FAQ - Questions fréquentes drone Eagle Production Angoulême',
    description: 'Questions fréquentes sur le drone : réglementation, tarifs, techniques, sécurité. Eagle Production répond à toutes vos questions sur les prises de vue aériennes.'
  }
];

// Template HTML optimisé SEO
const htmlTemplate = (page) => `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${page.title}</title>
  <meta name="description" content="${page.description}" />
  <meta name="keywords" content="drone angoulême, prise de vue aérienne, télépilote certifié, vidéo 4K, inspection drone, photogrammétrie, chantier BTP, charente, nouvelle-aquitaine" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://eagle-production.fr${page.route}" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.description}" />
  <meta property="og:image" content="https://eagle-production.fr/Photo_de_paul_bardin.webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://eagle-production.fr${page.route}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="fr_FR" />
  <meta property="og:site_name" content="Eagle Production" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@eagleproduction" />
  <meta name="twitter:url" content="https://eagle-production.fr${page.route}" />
  <meta name="twitter:title" content="${page.title}" />
  <meta name="twitter:description" content="${page.description}" />
  <meta name="twitter:image" content="https://eagle-production.fr/Photo_de_paul_bardin.webp" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/media/favicon/favicon.svg" />
  <link rel="icon" type="image/png" sizes="96x96" href="/media/favicon/favicon-96x96.png" />
  <link rel="apple-touch-icon" href="/media/favicon/apple-touch-icon.png" />
  <link rel="manifest" href="/media/favicon/site.webmanifest" />
  <meta name="theme-color" content="#111111" />
  
  <!-- DNS Prefetch -->
  <link rel="preconnect" href="https://player.vimeo.com" crossorigin>
  <link rel="preconnect" href="https://i.vimeocdn.com" crossorigin>
  <link rel="dns-prefetch" href="https://player.vimeo.com">
  
  <!-- Styles -->
  <link rel="stylesheet" href="/assets/index.css" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/assets/index.js"></script>
</body>
</html>`;

// Créer le dossier dist s'il n'existe pas
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Générer chaque page
pages.forEach(page => {
  const filename = page.name === 'index' ? 'index.html' : `${page.name}.html`;
  const filepath = path.join(distDir, filename);
  
  const htmlContent = htmlTemplate(page);
  fs.writeFileSync(filepath, htmlContent);
  console.log(`✅ Page SEO générée: ${filename}`);
});

console.log(`\n🎉 ${pages.length} pages HTML optimisées SEO générées !`);
console.log('📁 Dossier: dist/');
console.log('🚀 URLs propres pour Google :');

pages.forEach(page => {
  console.log(`   https://eagle-production.fr${page.route}`);
});

console.log('\n⚡ Prêt pour un référencement optimal !');
