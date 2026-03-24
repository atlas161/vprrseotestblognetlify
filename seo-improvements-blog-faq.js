// Améliorations SEO pour Blog & FAQ
// Suggestions d'optimisations techniques

const blogImprovements = {
  // 1. MANQUANT: Pages individuelles HTML statiques pour les articles
  missingStaticPages: {
    issue: "Les articles blog n'ont pas de pages HTML statiques",
    impact: "Indexation plus lente, dépend du JavaScript",
    solution: "Générer des HTML statiques pour chaque article"
  },

  // 2. MANQUANT: Métadonnées enrichies dans les fichiers markdown
  missingEnhancedMetadata: {
    issue: "Frontmatter limité dans les fichiers .md",
    currentFields: ["published", "date", "title", "slug", "category", "tags", "coverImage", "excerpt"],
    suggestedFields: [
      "seoTitle", "seoDescription", "focusKeyword", 
      "featuredImage", "imageAlt", "readingTime",
      "relatedPosts", "internalLinks", "externalLinks"
    ]
  },

  // 3. MANQUANT: Structured Data pour les images
  missingImageSchema: {
    issue: "Pas de schema ImageObject pour les images",
    solution: "Ajouter ImageObject schema dans chaque article"
  },

  // 4. MANQUANT: Données structurées HowTo/FAQ dans articles
  missingHowToSchema: {
    issue: "Articles tutoriels sans schema HowTo",
    solution: "Détecter articles 'comment faire' et ajouter schema HowTo"
  }
};

const faqImprovements = {
  // 1. MANQUANT: Pages individuelles par question
  missingIndividualPages: {
    issue: "Pas de pages HTML statiques pour chaque FAQ",
    impact: "Pertentiel de trafic long-tail non exploité",
    solution: "Générer /faq/{slug} pour chaque question"
  },

  // 2. MANQUANT: Métadonnées par question
  missingQuestionMetadata: {
    issue: "Métadonnées génériques pour toute la page FAQ",
    solution: "Titres/descriptions spécifiques par question"
  },

  // 3. MANQUANT: Schema.org Question/Article enrichi
  missing enrichedSchema: {
    issue: "Schema FAQPage basique",
    solution: "Ajouter Article schema pour chaque question détaillée"
  },

  // 4. MANQUANT: Internal linking optimisé
  missingInternalLinks: {
    issue: "Pas de maillage interne entre FAQ et blog",
    solution: "Lien automatique vers articles de blog pertinents"
  }
};

// Script pour générer les améliorations
const generateBlogSEOImprovements = () => {
  return `
// 1. Pages statiques pour articles
const generateBlogStaticPages = () => {
  const posts = readBlogPosts();
  posts.forEach(post => {
    const html = generateArticleHTML(post);
    fs.writeFileSync(\`dist/blog/\${post.slug}.html\`, html);
  });
};

// 2. Schema ImageObject
const imageSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://www.eagle-prod.com/image.jpg",
  "author": {
    "@type": "Person",
    "name": "Paul BARDIN"
  },
  "caption": "Description de l'image",
  "description": "Description détaillée"
};

// 3. Schema HowTo pour tutoriels
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Comment réaliser un suivi de chantier au drone",
  "image": "https://www.eagle-prod.com/image.jpg",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Préparation du vol",
      "text": "Analyser la zone et définir les points de vol"
    }
  ]
};
`;
};

module.exports = { blogImprovements, faqImprovements, generateBlogSEOImprovements };
