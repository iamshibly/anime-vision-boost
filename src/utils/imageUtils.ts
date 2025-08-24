import fallbackImage1 from '@/assets/anime-news-fallback-1.jpg';
import fallbackImage2 from '@/assets/anime-news-fallback-2.jpg';
import fallbackImage3 from '@/assets/anime-news-fallback-3.jpg';
import fallbackImage4 from '@/assets/anime-news-fallback-4.jpg';
import fallbackImage5 from '@/assets/anime-news-fallback-5.jpg';
import defaultFallback from '@/assets/anime-news-fallback.jpg';

const fallbackImages = [
  fallbackImage1,
  fallbackImage2,
  fallbackImage3,
  fallbackImage4,
  fallbackImage5
];

// Hash function for consistent fallback selection
export const hashCode = (str: string): number => {
  return str.split('').reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
};

// Get fallback image based on ID to ensure consistency
export const getFallbackImage = (id: string): string => {
  const index = Math.abs(hashCode(id)) % fallbackImages.length;
  return fallbackImages[index] || defaultFallback;
};

// Check if URL is a generic logo or repeated placeholder
const isGenericImage = (url: string): boolean => {
  const genericPatterns = [
    /logo\./i,
    /placeholder/i,
    /default/i,
    /avatar/i,
    /profile/i,
    /no-image/i,
    /noimage/i
  ];
  return genericPatterns.some(pattern => pattern.test(url));
};

export const getValidImageUrl = (url?: string, id?: string): string => {
  if (!url) return id ? getFallbackImage(id) : defaultFallback;
  
  // Check if URL is generic/placeholder
  if (isGenericImage(url)) {
    return id ? getFallbackImage(id) : defaultFallback;
  }
  
  // Check if URL is valid HTTPS
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:') {
      return url;
    }
  } catch {
    // Invalid URL
  }
  
  return id ? getFallbackImage(id) : defaultFallback;
};

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, id?: string) => {
  const img = event.target as HTMLImageElement;
  const fallback = id ? getFallbackImage(id) : defaultFallback;
  if (img.src !== fallback && !fallbackImages.includes(img.src)) {
    img.src = fallback;
  }
};

export const excerpt = (text: string, maxLength: number = 160): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.slice(0, lastSpace) + '...'
    : truncated + '...';
};

// Deduplication helper for news articles
export interface NewsArticleForDedup {
  id: string;
  imageUrl?: string;
  [key: string]: any;
}

export const dedupeImages = <T extends NewsArticleForDedup>(articles: T[]): T[] => {
  const imageUsageCount = new Map<string, number>();
  
  // First pass: count image usage
  articles.forEach(article => {
    if (article.imageUrl && !isGenericImage(article.imageUrl)) {
      const currentCount = imageUsageCount.get(article.imageUrl) || 0;
      imageUsageCount.set(article.imageUrl, currentCount + 1);
    }
  });
  
  // Second pass: replace overused images
  const processedImages = new Set<string>();
  
  return articles.map(article => {
    if (!article.imageUrl) {
      return {
        ...article,
        imageUrl: getFallbackImage(article.id)
      };
    }
    
    const usageCount = imageUsageCount.get(article.imageUrl) || 0;
    
    // If image is used more than 2 times and we've already processed it twice
    if (usageCount > 2) {
      const processedCount = Array.from(processedImages).filter(img => img === article.imageUrl).length;
      if (processedCount >= 2) {
        return {
          ...article,
          imageUrl: getFallbackImage(article.id)
        };
      }
    }
    
    processedImages.add(article.imageUrl);
    return article;
  });
};