export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl?: string;
  author: string;
  source: string;
  sourceUrl?: string;
  publishedAt: Date;
  category: 'anime' | 'manga' | 'industry' | 'reviews' | 'gaming' | 'other';
  tags: string[];
  score?: number;
  isHeadline?: boolean;
}

export interface NewsSource {
  id: string;
  name: string;
  baseUrl: string;
  category: string;
  isActive: boolean;
}