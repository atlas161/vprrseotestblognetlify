export interface CmsFaqItem {
  published: boolean;
  category: string;
  question: string;
  slug: string;
  answer: string; // HTML from rich-text
}

export interface CmsReviewItem {
  published: boolean;
  name: string;
  slug: string;
  project: string;
  rating: number;
  content: string;
}

const safeParse = <T,>(raw: string): T | null => {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const loadAllFaqItems = (): CmsFaqItem[] => {
  const modules = import.meta.glob('/content/faqs/*.json', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
  return Object.values(modules)
    .map((raw) => safeParse<CmsFaqItem>(raw))
    .filter((v): v is CmsFaqItem => !!v && !!v.slug && v.published !== false)
    .sort((a, b) => a.category.localeCompare(b.category, 'fr') || a.question.localeCompare(b.question, 'fr'));
};

export const loadAllReviews = (): CmsReviewItem[] => {
  const modules = import.meta.glob('/content/reviews/*.json', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
  return Object.values(modules)
    .map((raw) => safeParse<CmsReviewItem>(raw))
    .filter((v): v is CmsReviewItem => !!v && !!v.slug && v.published !== false)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.name.localeCompare(b.name, 'fr'));
};

