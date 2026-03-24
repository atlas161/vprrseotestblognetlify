import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lire les articles de blog
const readBlogPosts = () => {
  const postsDir = path.join(__dirname, 'content', 'posts');
  const posts = [];
  
  if (!fs.existsSync(postsDir)) return posts;
  
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const frontMatter = content.match(/^---\n([\s\S]*?)\n---/);
    const bodyContent = content.replace(/^---\n[\s\S]*?\n---/, '');
    
    if (frontMatter) {
      const metadata = {};
      frontMatter[1].split('\n').forEach(line => {
        const [key, ...value] = line.split(':');
        if (key && value) {
          const cleanValue = value.join(':').trim().replace(/["']/g, '');
          if (key.includes('tags')) {
            // Gérer les tags en format array ou string
            let tagsValue = cleanValue;
            if (tagsValue.includes('[')) {
              try {
                metadata[key.trim()] = JSON.parse(tagsValue);
              } catch (e) {
                // Fallback: nettoyer et splitter
                tagsValue = tagsValue.replace(/[\[\]]/g, '').trim();
                metadata[key.trim()] = tagsValue.split(',').map(t => t.trim()).filter(t => t);
              }
            } else {
              metadata[key.trim()] = tagsValue.split(',').map(t => t.trim()).filter(t => t);
            }
          } else {
            metadata[key.trim()] = cleanValue;
          }
        }
      });
      
      if (metadata.published !== 'false') {
        posts.push({
          ...metadata,
          slug: metadata.slug || file.replace('.md', ''),
          body: bodyContent,
          readingTime: Math.ceil(bodyContent.split(' ').length / 200) // ~200 mots/min
        });
      }
    }
  }
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Lire les FAQs
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
          ...content,
          slug: content.slug || file.replace('.json', '')
        });
      }
    } catch (error) {
      console.warn(`Erreur lecture FAQ ${file}:`, error.message);
    }
  }
  
  return faqs;
};

// Générer le HTML pour un article de blog optimisé SEO
const generateBlogArticleHTML = (post) => {
  const baseUrl = 'https://www.eagle-prod.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Schema.org complet pour l'article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || `Article: ${post.title}`,
    "image": post.coverImage ? `${baseUrl}${post.coverImage}` : `${baseUrl}/Photo_de_paul_bardin.webp`,
    "datePublished": post.date,
    "dateModified": currentDate,
    "author": {
      "@type": "Person",
      "name": "Paul BARDIN",
      "jobTitle": "Télépilote de drone professionnel",
      "url": baseUrl
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
    "articleSection": post.category,
    "keywords": Array.isArray(post.tags) ? post.tags.join(', ') : '',
    "wordCount": post.body.split(' ').length,
    "timeRequired": `PT${post.readingTime}M`,
    "about": post.tags?.map(tag => ({
      "@type": "Thing",
      "name": tag
    }))
  };

  // Schema HowTo si c'est un tutoriel
  const isHowTo = post.title.toLowerCase().includes('comment') || 
                 post.title.toLowerCase().includes('guide') ||
                 post.tags?.some(tag => tag.toLowerCase().includes('tutoriel'));

  const howToSchema = isHowTo ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": post.title,
    "description": post.excerpt,
    "image": post.coverImage ? `${baseUrl}${post.coverImage}` : `${baseUrl}/Photo_de_paul_bardin.webp`,
    "totalTime": `PT${post.readingTime}M`,
    "supply": [],
    "tool": ["Drone 4K", "Télépilote certifié"],
    "step": []
  } : null;

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${baseUrl}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `${baseUrl}/blog/${post.slug}` }
    ]
  };

  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO PRIMARY TAGS -->
    <title>${post.title} | Blog Drone Angoulême | EAGLE PRODUCTION</title>
    <meta name="description" content="${post.excerpt || `Article drone: ${post.title} par Paul BARDIN, télépilote professionnel à Angoulême.`}" />
    <meta name="keywords" content="${Array.isArray(post.tags) ? post.tags.join(', ') : ''}, drone Angoulême, ${post.category.toLowerCase()}, blog drone, Paul BARDIN" />
    <meta name="author" content="Paul BARDIN" />
    <meta name="robots" content="index, follow" />
    <meta name="date" content="${post.date}" />
    <meta name="article:tag" content="${Array.isArray(post.tags) ? post.tags.join(', ') : ''}" />
    <meta name="article:section" content="${post.category}" />
    <meta name="article:published_time" content="${post.date}" />
    <meta name="article:modified_time" content="${currentDate}" />
    <meta name="og:site_name" content="EAGLE PRODUCTION" />
    <meta name="twitter:site" content="@eagleproduction" />

    <!-- OPEN GRAPH -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${baseUrl}/blog/${post.slug}" />
    <meta property="og:title" content="${post.title} | Blog Drone Angoulême" />
    <meta property="og:description" content="${post.excerpt || `Article drone: ${post.title}`}" />
    <meta property="og:image" content="${post.coverImage ? `${baseUrl}${post.coverImage}` : `${baseUrl}/Photo_de_paul_bardin.webp`}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${post.title} - Article blog Eagle Production drone Angoulême" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="article:author" content="Paul BARDIN" />
    <meta property="article:section" content="${post.category}" />
    ${Array.isArray(post.tags) ? post.tags.map(tag => `<meta property="article:tag" content="${tag}" />`).join('\n    ') : ''}

    <!-- TWITTER -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${baseUrl}/blog/${post.slug}" />
    <meta name="twitter:title" content="${post.title}" />
    <meta name="twitter:description" content="${post.excerpt || `Article drone: ${post.title}`}" />
    <meta name="twitter:image" content="${post.coverImage ? `${baseUrl}${post.coverImage}` : `${baseUrl}/Photo_de_paul_bardin.webp`}" />
    <meta name="twitter:image:alt" content="${post.title} - Eagle Production" />
    <meta name="twitter:label1" content="Temps de lecture" />
    <meta name="twitter:data1" content="${post.readingTime} min" />
    <meta name="twitter:label2" content="Catégorie" />
    <meta name="twitter:data2" content="${post.category}" />

    <!-- CANONICAL URL -->
    <link rel="canonical" href="${baseUrl}/blog/${post.slug}" />
    
    <!-- PREV/NEXT pour pagination SEO -->
    <link rel="prev" href="${baseUrl}/blog" />
    
    <!-- DNS PREFETCH & PRECONNECT -->
    <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    
    <!-- Import Inter font with display swap for faster text rendering -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Main CSS -->
    <link rel="stylesheet" href="/assets/index-ClkLZZTh.css" />
    
    <!-- STRUCTURED DATA -->
    <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
    ${howToSchema ? `<script type="application/ld+json">${JSON.stringify(howToSchema)}</script>` : ''}
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    
    <!-- STYLES -->
    <link rel="stylesheet" href="/assets/index-ClkLZZTh.css">
    <style>
      body { font-family: 'Inter', sans-serif; }
      .blog-content { line-height: 1.7; }
      .blog-content h2 { margin-top: 2em; margin-bottom: 1em; }
      .blog-content h3 { margin-top: 1.5em; margin-bottom: 0.8em; }
      .blog-content ul, .blog-content ol { margin: 1em 0; padding-left: 2em; }
      .blog-content li { margin: 0.5em 0; }
      .blog-content p { margin: 1em 0; }
      .blog-content strong { color: #d4af37; }
      .blog-content em { font-style: italic; }
    </style>
  </head>
  <body class="bg-background text-textPrimary">
    <div id="root">
      <!-- Header would go here -->
      <main class="pt-20">
        <article class="max-w-4xl mx-auto px-6 py-12">
          <header class="mb-8">
            <div class="text-[11px] uppercase tracking-widest text-accent mb-2">${post.category}</div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">${post.title}</h1>
            <div class="flex items-center gap-4 text-sm text-textSecondary">
              <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('fr-FR')}</time>
              <span>•</span>
              <span>${post.readingTime} min de lecture</span>
              <span>•</span>
              <span>Par Paul BARDIN</span>
            </div>
            ${Array.isArray(post.tags) && post.tags.length > 0 ? `
            <div class="mt-4 flex flex-wrap gap-2">
              ${post.tags.map(tag => `<span class="text-xs bg-white/10 px-2 py-1 rounded-full">${tag}</span>`).join('')}
            </div>
            ` : ''}
          </header>
          
          ${post.coverImage ? `
          <div class="mb-8">
            <img src="${post.coverImage}" alt="${post.title}" class="w-full rounded-lg" loading="lazy" />
          </div>
          ` : ''}
          
          <div class="blog-content prose prose-invert max-w-none">
            ${marked(post.body)}
          </div>
          
          <footer class="mt-12 pt-8 border-t border-white/10">
            <div class="bg-accent/10 rounded-lg p-6">
              <h3 class="text-xl font-bold mb-2">Besoin d'un devis drone ?</h3>
              <p class="mb-4">Contactez Paul BARDIN pour discuter de votre projet.</p>
              <a href="/contact" class="inline-block bg-accent text-background px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors">
                Demander un devis
              </a>
            </div>
            <div class="mt-6">
              <a href="/blog" class="text-accent hover:underline">← Retour au blog</a>
            </div>
          </footer>
        </article>
      </main>
    </div>
    <script type="module" src="/assets/index-DSxZafEP.js"></script>
  </body>
</html>`;
};

// Générer le HTML pour une page FAQ individuelle
const generateFAQPageHTML = (faq) => {
  const baseUrl = 'https://www.eagle-prod.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>/g, '')
      }
    }],
    "about": {
      "@type": "Thing",
      "name": faq.category
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "FAQ", "item": `${baseUrl}/faq` },
      { "@type": "ListItem", "position": 3, "name": faq.question.substring(0, 50) + '...', "item": `${baseUrl}/faq/${faq.slug}` }
    ]
  };

  return `<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO PRIMARY TAGS -->
    <title>${faq.question} | FAQ Drone Angoulême | EAGLE PRODUCTION</title>
    <meta name="description" content="${faq.answer.replace(/<[^>]*>/g, '').substring(0, 160)}..." />
    <meta name="keywords" content="FAQ, drone Angoulême, ${faq.category.toLowerCase()}, ${faq.question.toLowerCase().split(' ').slice(0, 5).join(', ')}" />
    <meta name="robots" content="index, follow" />
    
    <!-- OPEN GRAPH -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${baseUrl}/faq/${faq.slug}" />
    <meta property="og:title" content="${faq.question}" />
    <meta property="og:description" content="${faq.answer.replace(/<[^>]*>/g, '').substring(0, 160)}..." />
    <meta property="og:image" content="${baseUrl}/Photo_de_paul_bardin.webp" />
    <meta property="og:locale" content="fr_FR" />
    
    <!-- TWITTER -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:url" content="${baseUrl}/faq/${faq.slug}" />
    <meta name="twitter:title" content="${faq.question}" />
    <meta name="twitter:description" content="${faq.answer.replace(/<[^>]*>/g, '').substring(0, 160)}..." />
    
    <!-- CANONICAL URL -->
    <link rel="canonical" href="${baseUrl}/faq/${faq.slug}" />
    
    <!-- STRUCTURED DATA -->
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
    
    <!-- STYLES -->
    <link rel="stylesheet" href="/assets/index-ClkLZZTh.css">
  </head>
  <body class="bg-background text-textPrimary">
    <div id="root">
      <main class="pt-20">
        <article class="max-w-4xl mx-auto px-6 py-12">
          <header class="mb-8">
            <div class="text-[11px] uppercase tracking-widest text-accent mb-2">${faq.category}</div>
            <h1 class="text-3xl md:text-4xl font-bold mb-4">${faq.question}</h1>
            <a href="/faq" class="text-accent hover:underline">← Retour à la FAQ</a>
          </header>
          
          <div class="prose prose-invert max-w-none">
            <div class="bg-white/5 rounded-lg p-6">
              ${faq.answer}
            </div>
          </div>
          
          <footer class="mt-12 pt-8 border-t border-white/10">
            <div class="bg-accent/10 rounded-lg p-6">
              <h3 class="text-xl font-bold mb-2">Autres questions ?</h3>
              <p class="mb-4">Consultez notre FAQ complète ou contactez-nous directement.</p>
              <div class="flex gap-4">
                <a href="/faq" class="inline-block bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors">
                  Voir la FAQ
                </a>
                <a href="/contact" class="inline-block bg-accent text-background px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors">
                  Contacter
                </a>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
    <script type="module" src="/assets/index-DSxZafEP.js"></script>
  </body>
</html>`;
};

// Fonction principale de génération
const generateBlogFAQPages = () => {
  console.log('🚀 Génération pages Blog & FAQ SEO...');
  
  // Créer les dossiers nécessaires
  const distDir = path.join(__dirname, 'dist');
  const blogDir = path.join(distDir, 'blog');
  const faqDir = path.join(distDir, 'faq');
  
  [blogDir, faqDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Générer les pages d'articles de blog
  const posts = readBlogPosts();
  posts.forEach(post => {
    const html = generateBlogArticleHTML(post);
    fs.writeFileSync(path.join(blogDir, `${post.slug}.html`), html);
    console.log(`✅ Article blog: ${post.slug}.html`);
  });
  
  // Générer les pages FAQ individuelles
  const faqs = readFAQs();
  faqs.forEach(faq => {
    const html = generateFAQPageHTML(faq);
    fs.writeFileSync(path.join(faqDir, `${faq.slug}.html`), html);
    console.log(`✅ FAQ: ${faq.slug}.html`);
  });
  
  console.log(`🎉 ${posts.length} articles blog + ${faqs.length} pages FAQ générés !`);
  console.log('📁 Dossiers: dist/blog/ et dist/faq/');
  console.log('🎯 SEO: Métadonnées riches, Schema.org, URLs canoniques');
};

// Export pour utilisation
export { generateBlogFAQPages };

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBlogFAQPages();
}
