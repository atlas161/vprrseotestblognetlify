import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtenir la date actuelle au format YYYY-MM-DD
const getCurrentDate = () => {
  const now = new Date();
  // Forcer la date actuelle correcte
  return now.toISOString().split('T')[0];
};

// Lire les fichiers de contenu dynamique
const readBlogPosts = () => {
  const postsDir = path.join(__dirname, 'content', 'posts');
  const posts = [];
  
  if (!fs.existsSync(postsDir)) return posts;
  
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const frontMatter = content.match(/^---\n([\s\S]*?)\n---/);
    
    if (frontMatter) {
      const metadata = {};
      frontMatter[1].split('\n').forEach(line => {
        const [key, ...value] = line.split(':');
        if (key && value) {
          metadata[key.trim()] = value.join(':').trim().replace(/"/g, '');
        }
      });
      
      if (metadata.published !== 'false') {
        posts.push({
          slug: metadata.slug || file.replace('.md', ''),
          title: metadata.title || '',
          date: metadata.date || getCurrentDate(),
          category: metadata.category || 'Blog',
          tags: metadata.tags ? (Array.isArray(metadata.tags) ? metadata.tags : metadata.tags.split(',').map(t => t.trim())) : []
        });
      }
    }
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const readFAQs = () => {
  const faqsDir = path.join(__dirname, 'content', 'faqs');
  const faqs = [];
  
  if (!fs.existsSync(faqsDir)) return faqs;
  
  const files = fs.readdirSync(faqsDir).filter(file => file.endsWith('.json'));
  
  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(faqsDir, file), 'utf-8'));
      
      if (content.published !== false) {
        faqs.push({
          slug: content.slug || file.replace('.json', ''),
          question: content.question || '',
          answer: content.answer || '',
          category: content.category || 'FAQ'
        });
      }
    } catch (error) {
      console.warn(`Erreur lecture FAQ ${file}:`, error.message);
    }
  }
  
  return faqs;
};

// Générer le sitemap dynamique
const generateSitemap = () => {
  const currentDate = getCurrentDate();
  console.log(`📅 Date utilisée: ${currentDate}`);
  const blogPosts = readBlogPosts();
  const faqs = readFAQs();
  
  console.log(`📝 Articles de blog trouvés: ${blogPosts.length}`);
  console.log(`❓ FAQ trouvées: ${faqs.length}`);
  
  const baseUrl = 'https://www.eagle-prod.com';
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
  <!-- Page d'accueil - Priorité maximale -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${baseUrl}/Photo_de_paul_bardin.webp</image:loc>
      <image:title>Paul Bardin - Fondateur Eagle Production</image:title>
      <image:caption>Télépilote de drone professionnel certifié basé à Angoulême</image:caption>
    </image:image>
    <image:image>
      <image:loc>${baseUrl}/media/logo_beige.png</image:loc>
      <image:title>Logo Eagle Production</image:title>
    </image:image>
  </url>

  <!-- Section Portfolio/Galerie -->
  <url>
    <loc>${baseUrl}/#gallery</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Section Services/Formules Drone -->
  <url>
    <loc>${baseUrl}/#services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Section Suivi de chantier BTP -->
  <url>
    <loc>${baseUrl}/chantier</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Page À Propos -->
  <url>
    <loc>${baseUrl}/a-propos</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Section Technologies -->
  <url>
    <loc>${baseUrl}/#tech</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Section Zone d'intervention -->
  <url>
    <loc>${baseUrl}/#zone</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Page Zone d'intervention -->
  <url>
    <loc>${baseUrl}/zone</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Page Inspection de bâtiments par drone -->
  <url>
    <loc>${baseUrl}/inspection</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Page Blog -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Ajouter les articles de blog dynamiquement
  blogPosts.forEach(post => {
    sitemap += `
  <!-- Article de blog: ${post.title} -->
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Page FAQ
  sitemap += `
  <!-- Page FAQ -->
  <url>
    <loc>${baseUrl}/faq</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;

  // Ajouter les pages FAQ individuelles dynamiquement
  faqs.forEach(faq => {
    sitemap += `
  <!-- FAQ: ${faq.question.substring(0, 50)}... -->
  <url>
    <loc>${baseUrl}/faq/${faq.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  sitemap += `
  <!-- Section Avis & FAQ -->
  <url>
    <loc>${baseUrl}/#reviews</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Section Contact -->
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Mentions légales -->
  <url>
    <loc>${baseUrl}/mentions-legales.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

</urlset>`;

  return sitemap;
};

// Générer le Schema.org dynamique
const generateSchema = () => {
  const currentDate = getCurrentDate();
  const blogPosts = readBlogPosts();
  const faqs = readFAQs();
  
  const baseUrl = 'https://www.eagle-prod.com';
  
  // Schema principal de l'entreprise
  const mainSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}#business`,
    "name": "EAGLE PRODUCTION",
    "description": "Télépilote professionnel de drone à Angoulême : photos immobilières HDR et vidéos aériennes 4K. Expert drone certifié DGAC : photogrammétrie et inspections techniques.",
    "url": baseUrl,
    "telephone": "+33-6-XX-XX-XX-XX",
    "email": "contact@eagle-prod.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Angoulême",
      "addressRegion": "Charente",
      "addressCountry": "FR",
      "postalCode": "16000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.6484,
      "longitude": 0.1562
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "image": `${baseUrl}/Photo_de_paul_bardin.webp`,
    "logo": `${baseUrl}/media/logo_beige.png`,
    "founder": {
      "@type": "Person",
      "name": "Paul BARDIN",
      "jobTitle": "Télépilote de drone professionnel",
      "description": "Télépilote certifié DGAC spécialisé en prises de vue aériennes et inspections techniques"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Eagle Production",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Vidéo aérienne 4K/HDR",
            "description": "Prises de vue aériennes professionnelles en 4K et HDR"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Photographie drone",
            "description": "Photos immobilières HDR et prises de vue aériennes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Inspection technique",
            "description": "Inspections de toitures, bâtiments et diagnostics techniques"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Photogrammétrie",
            "description": "Modélisation 3D et orthophotos de chantiers"
          }
        }
      ]
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 45.6484,
        "longitude": 0.1562
      },
      "geoRadius": "50000"
    },
    "sameAs": [
      "https://www.linkedin.com/company/eagle-production",
      "https://twitter.com/eagleproduction"
    ]
  };

  // Schema pour les articles de blog
  const blogSchemas = blogPosts.map(post => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "dateModified": currentDate,
    "author": {
      "@type": "Person",
      "name": "Paul BARDIN"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EAGLE PRODUCTION",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/media/logo_beige.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    },
    "image": `${baseUrl}/Photo_de_paul_bardin.webp`,
    "keywords": post.tags.join(', '),
    "articleSection": post.category
  }));

  // Schema pour les FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>/g, '') // Strip HTML
      }
    }))
  };

  return {
    mainSchema,
    blogSchemas,
    faqSchema
  };
};

// Fonction principale de génération
const generateDynamicSEO = () => {
  console.log('🚀 Génération SEO dynamique...');
  
  // Créer le dossier dist s'il n'existe pas
  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  // Générer le sitemap
  const sitemap = generateSitemap();
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap.xml généré avec dates automatiques');
  
  // Générer les schemas
  const schemas = generateSchema();
  
  // Schema principal
  fs.writeFileSync(
    path.join(distDir, 'schema-main.json'), 
    JSON.stringify(schemas.mainSchema, null, 2)
  );
  
  // Schemas des articles de blog
  fs.writeFileSync(
    path.join(distDir, 'schema-blog.json'),
    JSON.stringify(schemas.blogSchemas, null, 2)
  );
  
  // Schema FAQ
  fs.writeFileSync(
    path.join(distDir, 'schema-faq.json'),
    JSON.stringify(schemas.faqSchema, null, 2)
  );
  
  console.log(`✅ Schema.org généré:`);
  console.log(`   - Schema principal: ${schemas.blogSchemas.length + 1} entités`);
  console.log(`   - Articles de blog: ${schemas.blogSchemas.length} posts`);
  console.log(`   - FAQ: ${schemas.faqSchema.mainEntity.length} questions`);
  
  // Copier vers public pour le développement
  const publicDir = path.join(__dirname, 'public');
  if (fs.existsSync(publicDir)) {
    fs.copyFileSync(path.join(distDir, 'sitemap.xml'), path.join(publicDir, 'sitemap.xml'));
    fs.copyFileSync(path.join(distDir, 'schema-main.json'), path.join(publicDir, 'schema-main.json'));
    fs.copyFileSync(path.join(distDir, 'schema-blog.json'), path.join(publicDir, 'schema-blog.json'));
    fs.copyFileSync(path.join(distDir, 'schema-faq.json'), path.join(publicDir, 'schema-faq.json'));
    console.log('✅ Fichiers copiés vers /public');
  }
  
  console.log(`🎉 SEO dynamique terminé (${getCurrentDate()})`);
};

// Export pour utilisation dans d'autres scripts
export { generateDynamicSEO, generateSitemap, generateSchema };

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  generateDynamicSEO();
}
