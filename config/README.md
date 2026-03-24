# 🦅 Configuration Eagle Production

Ce dossier contient le fichier de configuration centralisé du site.

## ✨ Mise à jour automatique du SEO

Quand tu modifies `siteConfig.ts`, le **schéma JSON-LD** (données structurées Google) est **automatiquement mis à jour** grâce au composant `SEOSchema.tsx`. Plus besoin de toucher à `index.html` !

## 📁 Fichier principal

### `siteConfig.ts`

Ce fichier permet de modifier rapidement **sans toucher au code** :

| Section                   |                   Description                            |
|---------------------------|----------------------------------------------------------|
| `HERO_VIDEO`              | Vidéo d'accueil (ID Vimeo, délai auto-ouverture)         |
| `REVIEWS`                 | Avis clients affichés sur le site                        |
| `GOOGLE_REVIEW_LINK`      | Lien pour laisser un avis Google                         |
| `FAQ_ITEMS`               | Questions fréquentes                                     |
| `PRICING`                 | Tarifs des formules drone (Essentiel, Altitude, Horizon) |
| `OPTIONS`                 | Options et suppléments (déplacement, photo, USB)         |
| `SERVICES_COMPLEMENTAIRES`| Tarifs des services complémentaires                      |
| `CONTACT`                 | Informations de contact                                  |
| `ABOUT`                   | Section À propos (photo, textes, citation)               |

---

## 🎬 Changer la vidéo d'accueil

```typescript
export const HERO_VIDEO = {
  vimeoId: "1142391820",  // ← Remplace par le nouvel ID Vimeo
  autoOpenDelay: 60000,   // ← Délai en ms (60000 = 1 minute)
};
```

**Comment trouver l'ID Vimeo ?**
- URL de ta vidéo : `https://vimeo.com/1142391820`
- L'ID est le numéro à la fin : `1142391820`

---

## ⭐ Ajouter/Modifier un avis client

```typescript
export const REVIEWS = [
  {
    id: 1,                           // ID unique
    name: "Nom du client",           // Nom affiché
    role: "Type de projet",          // Ex: "Mariage & Événement"
    content: "Texte de l'avis...",   // Le témoignage
    stars: 5                         // Nombre d'étoiles (1-5)
  },
  // Ajoute d'autres avis ici...
];
```

---

## ❓ Ajouter/Modifier une question FAQ

```typescript
export const FAQ_ITEMS = [
  {
    question: "La question ?",
    answer: "La réponse...\nUtilise \\n pour un saut de ligne."
  },
  // Ajoute d'autres questions ici...
];
```

---

## 💰 Modifier les tarifs

### Formules Drone

```typescript
export const PRICING = {
  essentiel: {
    prices: [
      { label: "1h de prise de vue", price: 50 },  // ← Modifie le prix ici
      { label: "2h de prise de vue", price: 100 },
    ],
  },
  altitude: {
    prices: [
      { label: "Classique", sublabel: "0 à 3 minutes", price: 150 },
      { label: "Altitude +", sublabel: "3 à 5 minutes", price: 250 },
    ],
  },
  // etc.
};
```

### Options

```typescript
export const OPTIONS = {
  deplacement: { price: 0.50, unit: "/km", label: "Déplacement" },
  photoDrone: { price: 2, unit: "/unité", label: "Photo drone" },
  supportUsb: { price: 12, unit: "/clé", label: "Support USB" },
};
```

---

## 👤 Modifier la section À propos

```typescript
export const ABOUT = {
  sectionLabel: "À Propos",
  title: "Paul Bardin :",
  subtitle: "La vidéo vue d'en haut.",
  
  photo: {
    src: "/Photo_de_paul_bardin.webp",  // ← Chemin de l'image (dans public/)
    alt: "Paul Bardin Pilote Drone",
  },
  
  badge: {
    title: "Basé à Angoulême",           // ← Texte du badge sur la photo
    subtitle: "Intervention Nouvelle-Aquitaine",
  },
  
  // Chaque élément = un paragraphe
  // Utilise <strong>texte</strong> pour mettre en gras (blanc)
  // Utilise <br/> pour un saut de ligne
  paragraphs: [
    "Premier paragraphe avec <strong>texte en gras</strong>...",
    "Deuxième paragraphe...",
  ],
  
  quote: {
    text: "Ta citation ici...",
    author: "PAUL BARDIN",
    role: "FONDATEUR",
  },
};
```

---

## 🚀 Déployer les modifications

1. Modifie `siteConfig.ts`
2. Sauvegarde le fichier
3. Commit & Push :
   ```bash
   git add .
   git commit -m "Mise à jour config"
   git push
   ```
4. Le site est automatiquement mis à jour ! ✅

---

## ⚠️ Important

- Ne supprime pas les virgules entre les éléments
- Garde les guillemets autour des textes
- Pour les prix, utilise des nombres sans le symbole € (ex: `150` pas `"150€"`)
- Les sauts de ligne dans les textes s'écrivent `\n`
