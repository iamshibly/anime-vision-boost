import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, Rss, Sparkles } from 'lucide-react';

export const NewsHeader = () => {
  return (
    <header className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-white py-16 px-4">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-anime-pulse" />
          <div className="absolute top-12 left-16 w-1 h-1 bg-white rounded-full" />
          <div className="absolute top-8 right-8 w-3 h-3 bg-white rounded-full opacity-50 animate-anime-float" />
          <div className="absolute bottom-12 left-8 w-2 h-2 bg-white rounded-full opacity-75" />
          <div className="absolute bottom-4 right-12 w-4 h-4 bg-white rounded-full opacity-25 animate-anime-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-anime-float">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-anime-yellow animate-anime-pulse" />
              <span className="text-sm font-medium">Anime Vision Boost</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Latest Anime &
            <br />
            <span className="bg-gradient-to-r from-anime-yellow to-anime-orange bg-clip-text text-transparent">
              Manga News
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Stay updated with the hottest anime releases, manga chapters, industry news, and reviews. 
            Your ultimate source for everything otaku.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search anime, manga, or news..."
                className="pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:shadow-glow transition-all duration-300 font-semibold px-8"
            >
              <Rss className="mr-2 h-5 w-5" />
              Subscribe to Updates
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 px-8"
            >
              <Bell className="mr-2 h-5 w-5" />
              Enable Notifications
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-anime-yellow/20 rounded-full blur-xl animate-anime-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-anime-orange/20 rounded-full blur-2xl animate-anime-float" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-anime-red/20 rounded-full blur-lg animate-anime-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Stats Bar */}
      <div className="bg-card border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">1,200+</div>
              <div className="text-sm text-muted-foreground">Articles</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-anime-orange">500+</div>
              <div className="text-sm text-muted-foreground">Anime Covered</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-anime-green">250+</div>
              <div className="text-sm text-muted-foreground">Manga Reviews</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-anime-red">Daily</div>
              <div className="text-sm text-muted-foreground">Updates</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};