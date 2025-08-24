import { NewsArticle } from '@/types/news';

export const mockNewsData: NewsArticle[] = [
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
  }
];