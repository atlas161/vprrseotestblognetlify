export interface BlogPost {
  published: boolean;
  date: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  coverImage?: string;
  excerpt?: string;
  body: string; // HTML from rich-text or markdown
  seoTitle?: string;
  seoDescription?: string;
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export const getReadingTimeMinutes = (content: string) => {
  // Remove HTML tags if present
  const plainText = stripHtml(content);
  const words = plainText.split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

// Parse frontmatter from markdown
const parseFrontMatter = (content: string) => {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    // Fallback for JSON files
    try {
      const parsed = JSON.parse(content);
      return { ...parsed, body: parsed.body || '' };
    } catch {
      return null;
    }
  }
  
  try {
    // Parse YAML frontmatter manually
    const frontMatterText = match[1];
    const frontMatter: any = {};
    
    // Simple YAML parser for our specific format
    const lines = frontMatterText.split('\n');
    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        
        // Handle arrays
        if (value.startsWith('[') && value.endsWith(']')) {
          frontMatter[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
        }
        // Handle booleans
        else if (value === 'true' || value === 'false') {
          frontMatter[key] = value === 'true';
        }
        // Handle strings with quotes
        else if (value.startsWith('"') && value.endsWith('"')) {
          frontMatter[key] = value.slice(1, -1);
        }
        // Handle plain strings
        else {
          frontMatter[key] = value;
        }
      }
    }
    
    return { ...frontMatter, body: match[2] };
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    return null;
  }
};

export const loadAllPosts = (): BlogPost[] => {
  try {
    console.log('Loading posts...');
    
    // Load markdown files
    const mdModules = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
    
    const posts: BlogPost[] = Object.values(mdModules)
      .map((raw) => {
        try {
          const parsed = parseFrontMatter(raw);
          if (parsed && parsed.slug) {
            return parsed as BlogPost;
          }
          return null;
        } catch (error) {
          console.error('Error parsing markdown file:', error);
          return null;
        }
      })
      .filter((p): p is BlogPost => !!p && !!p.slug);

    console.log('Posts loaded:', posts.length);
    return posts
      .filter((p) => p.published !== false)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};

export const findPostBySlug = (slug: string): BlogPost | undefined => {
  return loadAllPosts().find((p) => p.slug === slug);
};
