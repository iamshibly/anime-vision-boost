import { NewsArticle } from '@/types/news';
import { dedupeImages } from '@/utils/imageUtils';

const rawMockNewsData: NewsArticle[] = [
  {
    id: '1',
    title: 'Attack on Titan Final Season Receives Critical Acclaim',
    excerpt: 'The long-awaited conclusion to the Attack on Titan anime series has received widespread praise from fans and critics alike, with stunning animation and emotional storytelling.',
    content: 'The final season of Attack on Titan has concluded with what many consider to be one of the most satisfying endings in anime history...',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg',
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
    author: 'Michael Chang',
    source: 'Shonen Jump+',
    publishedAt: new Date('2024-01-08'),
    category: 'manga',
    tags: ['my hero academia', 'final arc', 'deku']
  },
  // Add duplicate image entries to test deduplication
  {
    id: '9',
    title: 'Attack on Titan Behind the Scenes Documentary',
    excerpt: 'A new documentary reveals the creative process behind the final season of Attack on Titan.',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg', // Duplicate of #1
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
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1885/119899l.jpg', // Duplicate of #1 - this should get fallback
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
    imageUrl: 'https://example.com/site-logo.png', // Should be filtered as generic
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
    author: 'No Image Author',
    source: 'Image Test',
    publishedAt: new Date('2024-01-03'),
    category: 'other',
    tags: ['test', 'fallback']
  }
];

// Apply deduplication before exporting
export const mockNewsData: NewsArticle[] = dedupeImages(rawMockNewsData);