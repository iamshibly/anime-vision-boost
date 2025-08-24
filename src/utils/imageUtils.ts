import fallbackImage from '@/assets/anime-news-fallback.jpg';

export const getValidImageUrl = (url?: string): string => {
  if (!url) return fallbackImage;
  
  // Check if URL is valid HTTPS
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'https:') {
      return url;
    }
  } catch {
    // Invalid URL
  }
  
  return fallbackImage;
};

export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  const img = event.target as HTMLImageElement;
  if (img.src !== fallbackImage) {
    img.src = fallbackImage;
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