import { NewsArticle } from '@/types/news';
import { dedupeImagesAdvanced } from '@/utils/imageUtils';

const rawMockNewsData: NewsArticle[] = [
  {
    id: '1',
    title: 'Attack on Titan Final Season Receives Critical Acclaim',
    excerpt: 'The long-awaited conclusion to the Attack on Titan anime series has received widespread praise from fans and critics alike, with stunning animation and emotional storytelling.',
    content: 'The final season of Attack on Titan has concluded with what many consider to be one of the most satisfying endings in anime history...',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg',
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg',
      'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
      'https://images.animenewsnetwork.com/thumbnails/max300x600/cms/feature/184/8570.jpg'
    ],
    author: 'Sarah Chen',
    source: 'Anime News Network',
    sourceUrl: 'https://animenewsnetwork.com',
    publishedAt: new Date('2024-01-15'),
    category: 'anime',
    tags: ['attack on titan', 'final season', 'mappa'],
    isHeadline: true
  },
  {
    id: '2',
    title: 'Demon Slayer Movie Breaks Box Office Records in Japan',
    excerpt: 'The latest Demon Slayer film has shattered previous box office records, becoming the highest-grossing anime film of all time in Japan.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
      'https://cdn.myanimelist.net/images/anime/1020/108894.jpg',
      'https://images.animenewsnetwork.com/thumbnails/max300x600/cms/news/159/7531.jpg'
    ],
    author: 'Takeshi Yamamoto',
    source: 'Crunchyroll News',
    publishedAt: new Date('2024-01-14'),
    category: 'anime',
    tags: ['demon slayer', 'box office', 'movie'],
    score: 9.2
  },
  {
    id: '3',
    title: 'One Piece Chapter 1100 Reveals Major Plot Twist',
    excerpt: 'The latest chapter of One Piece has left fans stunned with a revelation that changes everything we thought we knew about the Void Century.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
      'https://cdn.myanimelist.net/images/anime/1244/138851.jpg',
      'https://cdn.myanimelist.net/images/anime/1/67177.jpg'
    ],
    author: 'Maria Rodriguez',
    source: 'Manga Plus',
    publishedAt: new Date('2024-01-13'),
    category: 'manga',
    tags: ['one piece', 'manga', 'void century']
  },
  {
    id: '4',
    title: 'Studio Ghibli Announces New Film Project',
    excerpt: 'The legendary animation studio has announced their next feature film, marking their return to original storytelling after several years.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/4/21289l.jpg',
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/4/21289l.jpg',
      'https://media.kitsu.io/anime/poster_images/12/medium.jpg',
      'https://media.kitsu.io/anime/cover_images/12/original.jpg'
    ],
    author: 'David Kim',
    source: 'Studio Ghibli',
    publishedAt: new Date('2024-01-12'),
    category: 'industry',
    tags: ['studio ghibli', 'new project', 'animation']
  },
  {
    id: '5',
    title: 'Jujutsu Kaisen Season 3 Production Announced',
    excerpt: 'Following the success of the Shibuya Incident arc, MAPPA has officially confirmed production of Jujutsu Kaisen Season 3.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
      'https://cdn.myanimelist.net/images/anime/1722/127394.jpg',
      'https://images.animenewsnetwork.com/thumbnails/max300x600/cms/news/174/9812.jpg'
    ],
    author: 'Elena Volkov',
    source: 'MAPPA Studios',
    publishedAt: new Date('2024-01-11'),
    category: 'anime',
    tags: ['jujutsu kaisen', 'season 3', 'mappa']
  },
  {
    id: '6',
    title: 'Chainsaw Man Part 2 Manga Reaches 1 Million Sales',
    excerpt: 'Tatsuki Fujimoto\'s continuation of the Chainsaw Man story has achieved remarkable commercial success in just its first month of release.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1506/110415l.jpg',
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/1506/110415l.jpg',
      'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
      'https://cdn.myanimelist.net/images/manga/3/275651l.jpg'
    ],
    author: 'James Wilson',
    source: 'Weekly Shonen Jump',
    publishedAt: new Date('2024-01-10'),
    category: 'manga',
    tags: ['chainsaw man', 'part 2', 'sales']
  },
  {
    id: '7',
    title: 'Spy x Family Code: White Movie Review',
    excerpt: 'The first theatrical release of Spy x Family delivers heartwarming family moments with spectacular animation quality that exceeds expectations.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
      'https://cdn.myanimelist.net/images/anime/1630/124786.jpg',
      'https://media.kitsu.io/anime/poster_images/1375/medium.jpg'
    ],
    author: 'Lisa Park',
    source: 'Anime Review Central',
    publishedAt: new Date('2024-01-09'),
    category: 'reviews',
    tags: ['spy x family', 'movie', 'review'],
    score: 8.7
  },
  {
    id: '8',
    title: 'My Hero Academia Final Arc Begins',
    excerpt: 'Kohei Horikoshi has announced that the manga is entering its final story arc, bringing the journey of Deku and Class 1-A to its climactic conclusion.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/10/78745l.jpg',
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/10/78745l.jpg',
      'https://cdn.myanimelist.net/images/anime/1000/110531.jpg',
      'https://cdn.myanimelist.net/images/manga/1/269867.jpg'
    ],
    author: 'Michael Chang',
    source: 'Shonen Jump+',
    publishedAt: new Date('2024-01-08'),
    category: 'manga',
    tags: ['my hero academia', 'final arc', 'deku']
  },
  // Test duplicate images - these should get different images via rotation
  {
    id: '9',
    title: 'Attack on Titan Behind the Scenes Documentary',
    excerpt: 'A new documentary reveals the creative process behind the final season of Attack on Titan.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg', // Duplicate of #1
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg', // Will be used first
      'https://cdn.myanimelist.net/images/anime/1830/119897.jpg', // Alternative
      'https://images.animenewsnetwork.com/thumbnails/max300x600/cms/feature/185/8571.jpg'
    ],
    author: 'John Smith',
    source: 'NHK',
    publishedAt: new Date('2024-01-07'),
    category: 'industry',
    tags: ['attack on titan', 'documentary', 'behind the scenes']
  },
  {
    id: '10',
    title: 'Attack on Titan Merchandise Surge',
    excerpt: 'Following the series finale, Attack on Titan merchandise sales have reached unprecedented levels.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg', // Duplicate of #1
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg', // Will be used second time
      'https://cdn.myanimelist.net/images/anime/1831/119898.jpg', // Alternative
      'https://images.animenewsnetwork.com/thumbnails/max300x600/cms/feature/186/8572.jpg'
    ],
    author: 'Emma Davis',
    source: 'Retail Weekly',
    publishedAt: new Date('2024-01-06'),
    category: 'industry',
    tags: ['attack on titan', 'merchandise', 'sales']
  },
  {
    id: '11',
    title: 'Attack on Titan Fan Art Exhibition',
    excerpt: 'A major fan art exhibition celebrating Attack on Titan opens in Tokyo.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg', // Duplicate of #1 - should get fallback
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg', // Over quota, should use alternative
      'https://cdn.myanimelist.net/images/anime/1832/119899.jpg', // Alternative
      'https://images.animenewsnetwork.com/thumbnails/max300x600/cms/feature/187/8573.jpg'
    ],
    author: 'Yuki Tanaka',
    source: 'Art News Japan',
    publishedAt: new Date('2024-01-05'),
    category: 'other',
    tags: ['attack on titan', 'fan art', 'exhibition']
  },
  {
    id: '12',
    title: 'Generic News Article with Logo',
    excerpt: 'This article intentionally uses a generic logo URL to test the filtering system.',
    imageUrl: 'https://www.animenewsnetwork.com/images/logo.png', // Should be filtered as generic
    imageUrls: [
      'https://www.animenewsnetwork.com/images/logo.png', // Generic logo
      'https://myanimelist.net/img/common/logo.png', // Another generic logo
      'https://example.com/site-logo.png' // Generic logo
    ],
    author: 'Test Author',
    source: 'Test Source',
    publishedAt: new Date('2024-01-04'),
    category: 'other',
    tags: ['test', 'generic']
  },
  {
    id: '13',
    title: 'Article with Missing Image',
    excerpt: 'This article has no image URL to test the fallback system.',
    // No imageUrl - should get fallback
    imageUrls: [], // Empty array to test fallback
    author: 'No Image Author', 
    source: 'Image Test',
    publishedAt: new Date('2024-01-03'),
    category: 'other',
    tags: ['test', 'fallback']
  },
  // Additional articles with review content and avatars
  {
    id: '14',
    title: 'Review: Frieren - Journey Beyond the Hero\'s Tale',
    excerpt: 'An emotional masterpiece that redefines what it means to be an adventure anime.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
      'https://cdn.myanimelist.net/images/anime/1642/138065.jpg',
      'https://cdn.myanimelist.net/images/userimages/8753617.jpg' // Reviewer avatar
    ],
    author: 'Alex Rivera',
    source: 'Jikan Reviews',
    publishedAt: new Date('2024-01-02'),
    category: 'reviews',
    tags: ['frieren', 'review', 'adventure'],
    score: 9.6
  },
  {
    id: '15',
    title: 'Bleach: Thousand Year Blood War Final Cour Announced',
    excerpt: 'The epic conclusion to Ichigo\'s journey gets a release date.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1908/135431l.jpg',
    imageUrls: [
      'https://cdn.myanimelist.net/images/anime/1908/135431l.jpg',
      'https://cdn.myanimelist.net/images/anime/1765/135372.jpg',
      'https://kitsu-production-media.s3.amazonaws.com/anime/poster_images/13699/large.jpg'
    ],
    author: 'Studio Pierrot',
    source: 'Bleach Official',
    publishedAt: new Date('2024-01-01'),
    category: 'anime',
    tags: ['bleach', 'final cour', 'announcement'],
    isHeadline: true
  }
];

// Apply advanced deduplication with strict quota (max 2 uses per image)
export const mockNewsData: NewsArticle[] = dedupeImagesAdvanced(rawMockNewsData, 2);

// Export as default for compatibility
export default mockNewsData;