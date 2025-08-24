import { NewsArticle } from '@/types/news';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getValidImageUrl, handleImageError, excerpt } from '@/utils/imageUtils';
import { Calendar, User, ExternalLink, Star } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export const NewsCard = ({ article, variant = 'default', className = '' }: NewsCardProps) => {
  const imageUrl = getValidImageUrl(article.imageUrl, article.id);
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  const categoryColors = {
    anime: 'bg-primary text-primary-foreground',
    manga: 'bg-anime-orange text-white',
    industry: 'bg-anime-green text-white', 
    reviews: 'bg-anime-yellow text-black',
    gaming: 'bg-anime-red text-white',
    other: 'bg-muted text-muted-foreground'
  };

  return (
    <Card className={`group overflow-hidden hover:shadow-anime transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0 ${className}`}>
      <div className={`relative ${isFeatured ? 'h-64' : isCompact ? 'h-32' : 'h-48'} overflow-hidden`}>
        <img
          src={imageUrl}
          alt={article.title}
          onError={(e) => handleImageError(e, article.id)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${categoryColors[article.category]} shadow-md`}>
            {article.category.toUpperCase()}
          </Badge>
        </div>

        {/* Score Badge */}
        {article.score && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
              <Star className="w-3 h-3 mr-1 fill-anime-yellow text-anime-yellow" />
              {article.score}
            </Badge>
          </div>
        )}

        {/* Headline indicator */}
        {article.isHeadline && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-gradient-accent text-white animate-anime-pulse">
              BREAKING
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className={`font-bold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors
          ${isFeatured ? 'text-xl' : isCompact ? 'text-sm' : 'text-lg'}`}>
          {article.title}
        </h3>

        {!isCompact && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
            {excerpt(article.excerpt, isFeatured ? 200 : 120)}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              <span className="truncate max-w-20">{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{article.publishedAt.toLocaleDateString()}</span>
            </div>
          </div>
          
          {article.sourceUrl && (
            <div className="flex items-center text-primary hover:text-primary-glow transition-colors">
              <ExternalLink className="w-3 h-3 mr-1" />
              <span className="truncate max-w-24">{article.source}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {!isCompact && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs bg-muted/50 hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};