import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Pages à générer
const pages = [
  { name: 'index', route: '/' },
  { name: 'chantier', route: '/chantier' },
  { name: 'a-propos', route: '/a-propos' },
  { name: 'blog', route: '/blog' },
  { name: 'contact', route: '/contact' },
  { name: 'zone', route: '/zone' },
  { name: 'inspection', route: '/inspection' },
  { name: 'faq', route: '/faq' }
];

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'multi-pages',
      generateBundle(options, bundle) {
        // Générer les pages HTML statiques
        pages.forEach(page => {
          const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Eagle Production - ${page.name === 'index' ? 'Accueil' : page.name.charAt(0).toUpperCase() + page.name.slice(1)}</title>
  <meta name="description" content="Télépilote certifié DGAC à Angoulême. Prises de vue drone 4K, montage vidéo, inspection technique et services digital." />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://eagle-production.fr${page.route}" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Eagle Production - ${page.name === 'index' ? 'Accueil' : page.name.charAt(0).toUpperCase() + page.name.slice(1)}" />
  <meta property="og:description" content="Prises de vue drone professionnelles et accompagnement créatif complet" />
  <meta property="og:url" content="https://eagle-production.fr${page.route}" />
  <meta property="og:type" content="website" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <!-- Styles -->
  <link rel="stylesheet" href="/assets/index.css" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/assets/index.js"></script>
  <script>
    // Définir la route actuelle
    window.__PAGE_ROUTE__ = "${page.route}";
  </script>
</body>
</html>`;
          
          this.emitFile({
            type: 'asset',
            fileName: `${page.name}.html`,
            source: htmlContent
          });
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: './index.tsx'
      }
    }
  }
});
