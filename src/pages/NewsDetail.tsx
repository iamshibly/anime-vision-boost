import { useParams, Link } from 'react-router-dom';
import { mockNewsData } from '@/data/mockNews';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, ExternalLink, Star, Share2 } from 'lucide-react';
import { getValidImageUrl, handleImageError } from '@/utils/imageUtils';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = mockNewsData.find(article => article.id === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-muted-foreground mb-4">404</h1>
          <p className="text-muted-foreground mb-6">Article not found</p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = getValidImageUrl(article.imageUrl, article.id, article.imageUrls);
  
  const categoryColors = {
    anime: 'bg-primary text-primary-foreground',
    manga: 'bg-anime-orange text-white',
    industry: 'bg-anime-green text-white', 
    reviews: 'bg-anime-yellow text-black',
    gaming: 'bg-anime-red text-white',
    other: 'bg-muted text-muted-foreground'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="space-y-6">
          {/* Hero Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img
              src={imageUrl}
              alt={article.title}
              onError={(e) => handleImageError(e, article.id)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <Badge className={`${categoryColors[article.category]} shadow-md text-lg px-4 py-2`}>
                {article.category.toUpperCase()}
              </Badge>
            </div>

            {/* Score Badge */}
            {article.score && (
              <div className="absolute top-6 right-6">
                <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm text-lg px-4 py-2">
                  <Star className="w-4 h-4 mr-2 fill-anime-yellow text-anime-yellow" />
                  {article.score}
                </Badge>
              </div>
            )}

            {/* Headline indicator */}
            {article.isHeadline && (
              <div className="absolute bottom-6 left-6">
                <Badge className="bg-gradient-accent text-white animate-anime-pulse text-lg px-4 py-2">
                  BREAKING NEWS
                </Badge>
              </div>
            )}
          </div>

          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{article.publishedAt.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              {article.sourceUrl && (
                <a 
                  href={article.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-primary hover:text-primary-glow transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  <span>Read Original Article</span>
                </a>
              )}
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline" 
                  className="bg-muted/50 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Article Content */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl leading-relaxed text-muted-foreground mb-6">
                  {article.excerpt}
                </p>
                
                {article.content ? (
                  <div className="space-y-4 text-foreground leading-relaxed">
                    {article.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-base">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4 text-foreground leading-relaxed">
                    <p>
                      This is where the full article content would be displayed. In a real application, 
                      this would contain the complete news article with all the details, analysis, and 
                      reporting related to this anime/manga news story.
                    </p>
                    <p>
                      The content would typically include background information, quotes from relevant 
                      sources, additional context, and any related updates or developments in the story.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Images Gallery */}
          {article.imageUrls && article.imageUrls.length > 1 && (
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Related Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {article.imageUrls.slice(1, 7).map((imgUrl, index) => (
                    <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                      <img
                        src={imgUrl}
                        alt={`${article.title} ${index + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </article>

        {/* Back to News Button */}
        <div className="flex justify-center pt-8">
          <Link to="/">
            <Button size="lg" className="shadow-anime">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All News
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NewsDetail;