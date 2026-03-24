import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes à générer en pages HTML statiques
const routes = [
  '/',
  '/chantier',
  '/a-propos', 
  '/blog',
  '/contact',
  '/zone',
  '/inspection',
  '/faq'
];

// Template HTML de base
const htmlTemplate = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Eagle Production - Prises de vue drone et services audiovisuels</title>
  <meta name="description" content="Télépilote certifié DGAC à Angoulême. Prises de vue drone 4K, montage vidéo, inspection technique et services digital pour toute la Charente et Nouvelle-Aquitaine." />
  <meta name="keywords" content="drone angoulême, prise de vue aérienne, télépilote certifié, vidéo 4K, inspection drone, photogrammétrie, chantier BTP" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://eagle-production.fr{{ROUTE}}" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Eagle Production - Services drone et audiovisuels" />
  <meta property="og:description" content="Prises de vue drone professionnelles et accompagnement créatif complet" />
  <meta property="og:image" content="https://eagle-production.fr/og-image.jpg" />
  <meta property="og:url" content="https://eagle-production.fr{{ROUTE}}" />
  <meta property="og:type" content="website" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <!-- Styles -->
  <script type="module" src="/index.tsx"></script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
</body>
</html>`;

// Créer le dossier dist s'il n'existe pas
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Générer chaque page
routes.forEach(route => {
  const filename = route === '/' ? 'index.html' : `${route.replace('/', '')}.html`;
  const filepath = path.join(distDir, filename);
  
  const htmlContent = htmlTemplate.replace(/{{ROUTE}}/g, route);
  
  fs.writeFileSync(filepath, htmlContent);
  console.log(`✅ Page générée: ${filename}`);
});

console.log(`\n🎉 ${routes.length} pages HTML statiques générées avec succès !`);
console.log('📁 Dossier: dist/');
console.log('🚀 Prêt pour le déploiement SEO optimal !');
