import { useState, useMemo } from 'react';
import { NewsCard } from './NewsCard';
import { NewsFilters } from './NewsFilters';
import { Button } from '@/components/ui/button';
import { NewsArticle } from '@/types/news';
import { ChevronDown, Zap, TrendingUp } from 'lucide-react';

interface NewsFeedProps {
  articles: NewsArticle[];
  initialLoadCount?: number;
  loadMoreCount?: number;
}

export const NewsFeed = ({ 
  articles, 
  initialLoadCount = 24, 
  loadMoreCount = 12 
}: NewsFeedProps) => {
  const [displayCount, setDisplayCount] = useState(initialLoadCount);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? articles 
      : articles.filter(article => article.category === selectedCategory);

    return filtered.sort((a, b) => {
      if (sortBy === 'score') {
        const scoreA = a.score || 0;
        const scoreB = b.score || 0;
        return scoreB - scoreA;
      }
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    });
  }, [articles, selectedCategory, sortBy]);

  const displayedArticles = filteredAndSortedArticles.slice(0, displayCount);
  const hasMore = displayCount < filteredAndSortedArticles.length;
  const headlines = articles.filter(article => article.isHeadline);

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + loadMoreCount, filteredAndSortedArticles.length));
  };

  return (
    <div className="space-y-8">
      {/* Breaking News Section */}
      {headlines.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-anime-yellow animate-anime-pulse" />
            <h2 className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Breaking News
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {headlines.slice(0, 3).map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="featured"
                className="animate-anime-float"
              />
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <NewsFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={filteredAndSortedArticles.length}
      />

      {/* Main Feed */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">
            Latest News
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({filteredAndSortedArticles.length} articles)
            </span>
          </h2>
        </div>

        {displayedArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4 text-muted-foreground">📰</div>
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or check back later for new content.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedArticles.map((article, index) => (
                <div 
                  key={article.id}
                  className="animate-in fade-in-50 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <NewsCard
                    article={article}
                    variant={index < 2 ? 'featured' : 'default'}
                  />
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center pt-8">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  size="lg"
                  className="group hover:bg-primary hover:text-primary-foreground hover:shadow-glow transition-all duration-300"
                >
                  <ChevronDown className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Load More Articles ({filteredAndSortedArticles.length - displayCount} remaining)
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};