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

// Check if URL is a generic logo or repeated placeholder (enhanced detection)
const isGenericImage = (url: string): boolean => {
  const genericPatterns = [
    /logo\./i,
    /placeholder/i,
    /default/i,
    /avatar/i,
    /profile/i,
    /no-image/i,
    /noimage/i,
    /sprite/i,
    /icon/i,
    /animenewsnetwork\.com\/(images|img)\//i, // ANN logos
    /myanimelist\.net\/.*logo/i, // MAL logos
    /kitsu\.io\/.*logo/i, // Kitsu logos
    /_[0-9]{2,3}x[0-9]{2,3}\.(jpg|png|gif)$/i // Very small images (likely logos)
  ];
  
  // Check URL structure patterns
  const hasGenericPattern = genericPatterns.some(pattern => pattern.test(url));
  
  // Check for extremely small dimensions in URL (common for logos)
  const dimensionMatch = url.match(/[_-](\d+)x(\d+)/i);
  if (dimensionMatch) {
    const width = parseInt(dimensionMatch[1]);
    const height = parseInt(dimensionMatch[2]);
    if (width < 200 || height < 200) return true;
  }
  
  return hasGenericPattern;
};

export const getValidImageUrl = (url?: string, id?: string, candidateUrls?: string[]): string => {
  // Try candidates first if provided
  if (candidateUrls?.length) {
    for (const candidate of candidateUrls) {
      if (candidate && !isGenericImage(candidate)) {
        try {
          const parsed = new URL(candidate);
          if (parsed.protocol === 'https:') {
            return candidate;
          }
        } catch {
          // Continue to next candidate
        }
      }
    }
  }

  // Fallback to single URL logic
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

// Enhanced deduplication helper for news articles with multiple image candidates
export interface NewsArticleForDedup {
  id: string;
  imageUrl?: string;
  imageUrls?: string[];
  [key: string]: any;
}

// Global quota tracking to prevent any URL from being used more than maxUses times
export const dedupeImagesAdvanced = <T extends NewsArticleForDedup>(
  articles: T[], 
  maxUses: number = 3
): T[] => {
  const imageQuota = new Map<string, number>();
  
  // First pass: count all image usage across articles
  articles.forEach(article => {
    const candidates = article.imageUrls || [article.imageUrl].filter(Boolean);
    candidates.forEach(url => {
      if (url && !isGenericImage(url)) {
        const currentCount = imageQuota.get(url) || 0;
        imageQuota.set(url, currentCount + 1);
      }
    });
  });

  // Second pass: assign optimal images with rotation
  return articles.map(article => {
    const candidates = article.imageUrls || [article.imageUrl].filter(Boolean);
    
    if (!candidates.length) {
      return {
        ...article,
        imageUrl: getFallbackImage(article.id),
        imageUrls: [getFallbackImage(article.id)]
      };
    }

    // Find first candidate that's under quota
    let chosenImage = null;
    for (const url of candidates) {
      if (!url || isGenericImage(url)) continue;
      
      const currentUses = imageQuota.get(url) || 0;
      if (currentUses <= maxUses) {
        chosenImage = url;
        // Decrement available uses for this URL
        imageQuota.set(url, currentUses + 1);
        break;
      }
    }

    // If no candidate is available, use fallback based on post ID
    if (!chosenImage) {
      chosenImage = getFallbackImage(article.id);
    }

    return {
      ...article,
      imageUrl: chosenImage,
      imageUrls: candidates.length > 0 ? candidates : [chosenImage],
      imageHash: hashCode(chosenImage).toString()
    };
  });
};

// Enhanced deduplication (legacy support)
export const dedupeImages = <T extends NewsArticleForDedup>(articles: T[]): T[] => {
  return dedupeImagesAdvanced(articles, 2);
};