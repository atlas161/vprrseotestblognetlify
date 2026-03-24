/**
 * Composant SEO Schema - Génère les données structurées JSON-LD
 * depuis le fichier de configuration siteConfig.ts
 * 
 * Les schémas sont automatiquement mis à jour quand tu modifies :
 * - FAQ_ITEMS → Schema FAQPage
 * - PRICING → Schema Offers
 * - SERVICES_COMPLEMENTAIRES → Schema Offers
 */

import React from 'react';
import { FAQ_ITEMS, PRICING, SERVICES_COMPLEMENTAIRES, CONTACT } from '../config/siteConfig';

export const SEOSchema: React.FC = () => {
  // Génération du schéma complet
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ─────────────────────────────────────────────────────────────────────
      // ORGANIZATION
      // ─────────────────────────────────────────────────────────────────────
      {
        "@type": "Organization",
        "@id": "https://www.eagle-prod.com/#organization",
        "name": "Eagle Production",
        "url": "https://www.eagle-prod.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.eagle-prod.com/media/logo_beige.png",
          "width": 512,
          "height": 512
        },
        "image": "https://www.eagle-prod.com/Photo_de_paul_bardin.webp",
        "description": "Eagle Production est votre expert drone à Angoulême, spécialisé dans la création de contenus vidéo et photo par drone en Charente. Nous réalisons des vidéos professionnelles et des prises de vue aériennes sur mesure dans toute la Nouvelle-Aquitaine.",
        "founder": {
          "@type": "Person",
          "name": "Paul Bardin",
          "jobTitle": "Télépilote de drone certifié et fondateur"
        },
        "foundingDate": "2024",
        "areaServed": [
          {
            "@type": "City",
            "name": "Angoulême",
            "containsPlace": [
              {
                "@type": "Place",
                "name": "Centre-ville Angoulême",
                "containsPlace": [
                  { "@type": "Place", "name": "Place Victor-Hugo" },
                  { "@type": "Place", "name": "Cathédrale Angoulême" },
                  { "@type": "Place", "name": "Halles Angoulême" },
                  { "@type": "Place", "name": "Champ-de-Mars" }
                ]
              },
              { "@type": "Place", "name": "Victor-Hugo" },
              { "@type": "Place", "name": "Saint-Cybard" },
              { "@type": "Place", "name": "L'Houmeau" },
              { "@type": "Place", "name": "Bussatte" },
              { "@type": "Place", "name": "Saint-Roch" },
              { "@type": "Place", "name": "Ma Campagne" },
              { "@type": "Place", "name": "Basseau" },
              { "@type": "Place", "name": "Grand-Font" },
              { "@type": "Place", "name": "Sillac" },
              { "@type": "Place", "name": "Bel-Air" },
              { "@type": "Place", "name": "Obézine" },
              { "@type": "Place", "name": "Saint-Martin" },
              { "@type": "Place", "name": "Saint-Ausone" },
              { "@type": "Place", "name": "Petite Garenne" },
              { "@type": "Place", "name": "Plateau Nord" },
              { "@type": "Place", "name": "Plateau Sud" },
              { "@type": "Place", "name": "Montausier" },
              { "@type": "Place", "name": "Saint-Martial" },
              { "@type": "Place", "name": "Île Marquet" },
              { "@type": "Place", "name": "Bourgines" },
              { "@type": "Place", "name": "Anguienne" },
              { "@type": "Place", "name": "Cité BD" },
              { "@type": "Place", "name": "Magelis" },
              { "@type": "Place", "name": "Zone des Montagnes" },
              { "@type": "Place", "name": "Zone des Agriers" },
              { "@type": "Place", "name": "Espace Carat" }
            ]
          },
          { "@type": "City", "name": "Ruelle-sur-Touvre" },
          { "@type": "City", "name": "Soyaux" },
          { "@type": "City", "name": "Gond-Pontouvre" },
          { "@type": "City", "name": "L'Isle-d'Espagnac" },
          { "@type": "City", "name": "Saint-Yrieix-sur-Charente" },
          { "@type": "City", "name": "La Couronne" },
          { "@type": "City", "name": "Fléac" },
          { "@type": "City", "name": "Champniers" },
          { "@type": "City", "name": "Puymoyen" },
          { "@type": "City", "name": "Dirac" },
          { "@type": "City", "name": "Magnac-sur-Touvre" },
          { "@type": "City", "name": "Touvre" },
          { "@type": "City", "name": "Balzac" },
          { "@type": "City", "name": "Vindelle" },
          { "@type": "City", "name": "Saint-Michel" },
          { "@type": "City", "name": "Trois-Palis" },
          { "@type": "City", "name": "Nersac" },
          { "@type": "City", "name": "Saint-Saturnin" },
          { "@type": "City", "name": "Mornac" },
          { "@type": "City", "name": "Sers" },
          { "@type": "City", "name": "Bouëx" },
          { "@type": "City", "name": "Vouzan" },
          { "@type": "City", "name": "Garat" }
        ],
        "sameAs": Object.values(CONTACT.socialLinks)
      },

      // ─────────────────────────────────────────────────────────────────────
      // LOCAL BUSINESS avec OFFRES DYNAMIQUES
      // ─────────────────────────────────────────────────────────────────────
      {
        "@type": "LocalBusiness",
        "@id": "https://www.eagle-prod.com/#localbusiness",
        "name": "Eagle Production",
        "image": "https://www.eagle-prod.com/Photo_de_paul_bardin.webp",
        "description": "Eagle Production, expert drone certifié DGAC à Angoulême, spécialisé dans les prises de vue aériennes 4K, photogrammétrie, inspections techniques et suivis de chantier. Télépilote professionnel intervenant dans toute la Charente pour vos besoins en immobilier, événementiel, industrie et patrimoine.",
        "makesOffer": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Inspection technique par drone",
              "description": "Inspection de toitures, bâtiments et infrastructures à Angoulême et en Charente"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Photographie immobilière par drone",
              "description": "Photos et vidéos aériennes pour l'immobilier dans le Grand Angoulême"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Suivi de chantier par drone",
              "description": "Suivi d'évolution et mesures photogrammétriques sur Angoulême et sa région"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Vidéo événementielle par drone",
              "description": "Captation aérienne d'événements à Angoulême : festivals, mariages, sports"
            }
          }
        ],
        "priceRange": "€€",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Angoulême",
          "addressRegion": "Nouvelle-Aquitaine",
          "addressCountry": "FR",
          "streetAddress": "Centre-ville d'Angoulême"
        },
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "45.6484",
            "longitude": "0.1562"
          },
          "geoRadius": "50000"
        },
        "knowsLanguage": ["fr"],
        "slogan": "Expert drone à Angoulême, au service de votre vision",
        "keywords": "drone Angoulême, vidéo aérienne Charente, pilote drone Angoulême",
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "45.6484",
          "longitude": "0.1562"
        },
        "telephone": CONTACT.phone,
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "12:00"
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services de Drone et Production",
          "itemListElement": [
            // Formule Essentiel
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Formule ${PRICING.essentiel.name}`,
                "description": PRICING.essentiel.description
              },
              "price": PRICING.essentiel.prices[0].price.toString(),
              "priceCurrency": "EUR",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": PRICING.essentiel.prices[0].price.toString(),
                "priceCurrency": "EUR",
                "unitText": "heure"
              }
            },
            // Formule Altitude
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Formule ${PRICING.altitude.name}`,
                "description": PRICING.altitude.description
              },
              "price": PRICING.altitude.prices[0].price.toString(),
              "priceCurrency": "EUR"
            },
            // Formule Horizon
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Formule ${PRICING.horizon.name}`,
                "description": PRICING.horizon.description
              },
              "price": PRICING.horizon.prices[0].price.toString(),
              "priceCurrency": "EUR"
            },
            // Montage vidéo
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": SERVICES_COMPLEMENTAIRES.montageVideo.name,
                "description": SERVICES_COMPLEMENTAIRES.montageVideo.description
              },
              "price": SERVICES_COMPLEMENTAIRES.montageVideo.pricePerHour.toString(),
              "priceCurrency": "EUR",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": SERVICES_COMPLEMENTAIRES.montageVideo.pricePerHour.toString(),
                "priceCurrency": "EUR",
                "unitText": "heure"
              }
            },
            // Création de logo
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Création de logo",
                "description": "Logo sur-mesure pour votre identité visuelle"
              },
              "price": SERVICES_COMPLEMENTAIRES.identiteVisuelle.items[0].price.toString(),
              "priceCurrency": "EUR"
            },
            // Site internet
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Site internet vitrine",
                "description": "Création de site web professionnel clé en main"
              },
              "price": SERVICES_COMPLEMENTAIRES.presenceDigital.items[0].price.toString(),
              "priceCurrency": "EUR"
            }
          ]
        }
      },

      // ─────────────────────────────────────────────────────────────────────
      // WEBSITE
      // ─────────────────────────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": "https://www.eagle-prod.com/#website",
        "url": "https://www.eagle-prod.com",
        "name": "Eagle Production",
        "description": "Création de contenus vidéo et photo sur mesure par drone",
        "publisher": {
          "@id": "https://www.eagle-prod.com/#organization"
        },
        "inLanguage": "fr-FR"
      },

      // ─────────────────────────────────────────────────────────────────────
      // WEBPAGE
      // ─────────────────────────────────────────────────────────────────────
      {
        "@type": "WebPage",
        "@id": "https://www.eagle-prod.com/#webpage",
        "url": "https://www.eagle-prod.com",
        "name": "Eagle Production Angoulême | Vidéo Drone & Photo Aérienne en Charente",
        "isPartOf": {
          "@id": "https://www.eagle-prod.com/#website"
        },
        "about": {
          "@id": "https://www.eagle-prod.com/#organization"
        },
        "description": "Eagle Production est votre expert drone à Angoulême, spécialisé dans la création de contenus vidéo et photo par drone en Charente. Vidéos professionnelles et prises de vue aériennes sur mesure dans toute la Nouvelle-Aquitaine.",
        "inLanguage": "fr-FR"
      },

      // ─────────────────────────────────────────────────────────────────────
      // FAQ PAGE - DYNAMIQUE depuis siteConfig
      // ─────────────────────────────────────────────────────────────────────
      {
        "@type": "FAQPage",
        "@id": "https://www.eagle-prod.com/#faq",
        "mainEntity": FAQ_ITEMS.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer.replace(/\n/g, ' ') // Nettoie les sauts de ligne pour le schema
          }
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
