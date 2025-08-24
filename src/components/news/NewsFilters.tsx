import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, SortAsc, Hash } from 'lucide-react';

interface NewsFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'date' | 'score';
  onSortChange: (sort: 'date' | 'score') => void;
  totalCount: number;
}

const categories = [
  { value: 'all', label: 'All Categories', icon: '📰' },
  { value: 'anime', label: 'Anime', icon: '🎌' },
  { value: 'manga', label: 'Manga', icon: '📚' },
  { value: 'industry', label: 'Industry', icon: '🏢' },
  { value: 'reviews', label: 'Reviews', icon: '⭐' },
  { value: 'gaming', label: 'Gaming', icon: '🎮' },
  { value: 'other', label: 'Other', icon: '📋' }
];

export const NewsFilters = ({
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  totalCount
}: NewsFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-gradient-card rounded-xl border border-border/50 shadow-card">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-primary" />
        <span className="font-medium text-sm">Filters</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category.value)}
              className={`text-xs transition-all duration-200 ${
                selectedCategory === category.value 
                  ? 'bg-primary text-primary-foreground shadow-anime' 
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <SortAsc className="w-4 h-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={(value: 'date' | 'score') => onSortChange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Latest</SelectItem>
              <SelectItem value="score">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Count Display */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Hash className="w-4 h-4" />
          <span>{totalCount} articles</span>
        </div>
      </div>
    </div>
  );
};