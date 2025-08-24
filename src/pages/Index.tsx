import { NewsHeader } from '@/components/news/NewsHeader';
import { NewsFeed } from '@/components/news/NewsFeed';
import { mockNewsData } from '@/data/mockNews';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NewsHeader />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <NewsFeed articles={mockNewsData} />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">© 2024 Anime Vision Boost. All rights reserved.</p>
            <p className="text-sm">
              Built with 💜 for the anime community | 
              <span className="ml-1 text-anime-yellow">Stay otaku, stay updated!</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
