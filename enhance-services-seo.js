import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Définition des services avec Schema.org spécifique
const servicesData = {
  chantier: {
    title: "Suivi de chantier BTP | Drone 4K & Photogrammétrie | Eagle Production Angoulême",
    description: "Expert en suivi de chantier BTP à Angoulême : orthophotos 4K, comparatifs temporels, photogrammétrie. Télépilote certifié DGAC pour diagnostics et rapports techniques sur toute la Charente.",
    serviceType: "Service",
    category: "Construction Engineering",
    keywords: "suivi chantier, drone BTP, photogrammétrie, orthophoto, comparatifs temporels, diagnostic chantier, drone construction Angoulême",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Suivi de chantier BTP par drone",
      "description": "Suivi de chantier professionnel avec drone 4K, photogrammétrie et orthophotos",
      "provider": {
        "@type": "Organization",
        "name": "EAGLE PRODUCTION",
        "url": "https://www.eagle-prod.com"
      },
      "serviceType": "Construction Monitoring",
      "areaServed": {
        "@type": "Place",
        "name": "Charente, Nouvelle-Aquitaine"
      },
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "EUR"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services de suivi de chantier",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Orthophotographie 4K",
              "description": "Orthophotos haute définition pour suivi de chantier"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Comparatifs temporels",
              "description": "Images avant/après pour suivi d'avancement"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Rapports techniques",
              "description": "Rapports détaillés avec annotations et mesures"
            }
          }
        ]
      }
    }
  },
  inspection: {
    title: " Inspection Bâtiment Drone | Toiture & Diagnostic | Eagle Production Angoulême",
    description: "Inspection de bâtiments par drone à Angoulême : toitures, façades, diagnostics techniques. Télépilote certifié DGAC pour rapports détaillés 4K et sécurité des interventions en hauteur.",
    serviceType: "Service",
    category: "Building Inspection",
    keywords: "inspection bâtiment, drone toiture, diagnostic façade, inspection technique, drone sécurité, rapport inspection Angoulême",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Inspection de bâtiments par drone",
      "description": "Inspections techniques sécurisées de toitures, façades et structures",
      "provider": {
        "@type": "Organization",
        "name": "EAGLE PRODUCTION"
      },
      "serviceType": "Building Inspection Service",
      "areaServed": {
        "@type": "Place",
        "name": "Angoulême, Charente"
      },
      "offers": {
        "@type": "Offer",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "EUR"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services d'inspection",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Inspection toiture",
              "description": "Inspection complète des toitures sans échafaudage"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Diagnostic façade",
              "description": "Analyse détaillée des façades et murs périphériques"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Rapport d'inspection 4K",
              "description": "Rapport technique avec photos HD et annotations"
            }
          }
        ]
      }
    }
  },
  zone: {
    title: "Zone d'intervention | Drone Charente & Nouvelle-Aquitaine | Eagle Production",
    description: "Zone d'intervention complète : Angoulême et toute la Charente (16000), Cognac (16100), Barbezieux (16300), Confolens (16500). Télépilote certifié DGAC pour tous vos projets drone.",
    serviceType: "Service",
    category: "Aerial Photography",
    keywords: "zone intervention drone, Charente, Nouvelle-Aquitaine, Angoulême, Cognac, Barbezieux, Confolens, télépilote drone région",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Services drone Charente & Nouvelle-Aquitaine",
      "description": "Intervention sur toute la Charente et Nouvelle-Aquitaine avec drone professionnel",
      "provider": {
        "@type": "Organization",
        "name": "EAGLE PRODUCTION"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Angoulême",
          "address": {
            "@type": "PostalAddress",
            "postalCode": "16000",
            "addressCountry": "FR"
          }
        },
        {
          "@type": "City",
          "name": "Cognac",
          "address": {
            "@type": "PostalAddress",
            "postalCode": "16100",
            "addressCountry": "FR"
          }
        },
        {
          "@type": "City",
          "name": "Barbezieux",
          "address": {
            "@type": "PostalAddress",
            "postalCode": "16300",
            "addressCountry": "FR"
          }
        },
        {
          "@type": "City",
          "name": "Confolens",
          "address": {
            "@type": "PostalAddress",
            "postalCode": "16500",
            "addressCountry": "FR"
          }
        }
      ],
      "serviceType": "Aerial Photography Service"
    }
  },
  contact: {
    title: "Contact Drone Angoulême | Devis Rapide | Eagle Production Paul BARDIN",
    description: "Contactez Paul BARDIN, télépilote drone professionnel à Angoulême. Devis personnalisé pour vidéos aériennes 4K, photos immobilières, inspections techniques et photogrammétrie en Charente.",
    serviceType: "ContactPage",
    category: "Professional Service",
    keywords: "contact drone Angoulême, devis drone, Paul BARDIN télépilote, renseignement drone, Charente drone professionnel",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Eagle Production",
      "description": "Page de contact pour devis et renseignements drone",
      "url": "https://www.eagle-prod.com/contact",
      "mainEntity": {
        "@type": "Organization",
        "name": "EAGLE PRODUCTION",
        "url": "https://www.eagle-prod.com",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": ["French"],
          "areaServed": {
            "@type": "Country",
            "name": "France"
          }
        }
      }
    }
  }
};

// Améliorer les pages services avec Schema.org spécifique
const enhanceServicesSEO = () => {
  console.log('🚀 Amélioration SEO pages services...');
  
  const distDir = path.join(__dirname, 'dist');
  
  Object.entries(servicesData).forEach(([serviceKey, serviceData]) => {
    const filePath = path.join(distDir, `${serviceKey}.html`);
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Remplacer les mots-clés génériques par des mots-clés spécifiques
      content = content.replace(
        /<meta name="keywords" content="[^"]*" \/>/,
        `<meta name="keywords" content="${serviceData.keywords}" />`
      );
      
      // Ajouter le schema spécifique au service
      const schemaScript = `<script type="application/ld+json">${JSON.stringify(serviceData.schema, null, 2)}</script>`;
      
      // Insérer le schema après le schema principal
      content = content.replace(
        '<script type="application/ld+json" src="/schema-main.json"></script>',
        `<script type="application/ld+json" src="/schema-main.json"></script>\n    <!-- Schema spécifique au service -->\n    ${schemaScript}`
      );
      
      // Ajouter des métadonnées spécifiques au service
      const serviceMeta = `
    <meta name="service-type" content="${serviceData.serviceType}" />
    <meta name="service-category" content="${serviceData.category}" />
    <meta name="service-area" content="Charente, Nouvelle-Aquitaine" />
    <meta name="provider" content="EAGLE PRODUCTION" />
    <meta name="certification" content="Télépilote certifié DGAC" />`;
      
      content = content.replace(
        '<meta name="certification" content="Télépilote certifié DGAC" />',
        `<meta name="certification" content="Télépilote certifié DGAC" />${serviceMeta}`
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Page service améliorée: ${serviceKey}.html`);
    }
  });
  
  console.log('🎉 Pages services optimisées avec Schema.org spécifique !');
  console.log('📊 Ajout: Service schema, mots-clés ciblés, métadonnées enrichies');
};

// Créer un fichier de schema consolidé pour les services
const generateServicesSchema = () => {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Services Eagle Production",
    "description": "Liste complète des services drone proposés par Eagle Production à Angoulême",
    "itemListElement": Object.entries(servicesData).map(([key, service], index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.schema.name,
        "description": service.schema.description,
        "url": `https://www.eagle-prod.com/${key}`,
        "provider": {
          "@type": "Organization",
          "name": "EAGLE PRODUCTION",
          "url": "https://www.eagle-prod.com"
        }
      }
    }))
  };
  
  const distDir = path.join(__dirname, 'dist');
  fs.writeFileSync(
    path.join(distDir, 'schema-services.json'),
    JSON.stringify(servicesSchema, null, 2)
  );
  
  console.log('✅ Schema services consolidé généré: schema-services.json');
};

// Export des fonctions
export { enhanceServicesSEO, generateServicesSchema };

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  enhanceServicesSEO();
  generateServicesSchema();
}
