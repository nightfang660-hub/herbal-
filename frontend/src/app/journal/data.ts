import { JournalPost } from './types';

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: "1",
    slug: "science-hibiscus-tea",
    title: "What Science Says About Hibiscus Tea",
    excerpt: "Studies suggest hibiscus may support healthy blood pressure and heart wellness.",
    content: "Hibiscus tea is more than just a delicious tart beverage...",
    image: "/blog/blog1.png",
    author: "Ananya Sharma",
    publishedDate: "2025-05-18",
    category: "Research",
    readTime: "6 min read"
  },
  {
    id: "2",
    slug: "antioxidants-everyday-wellness",
    title: "Antioxidants In Everyday Wellness",
    excerpt: "Understanding antioxidants and how they protect your cells naturally.",
    content: "Antioxidants are crucial for defending your cells...",
    image: "/blog/blog2.png",
    author: "Kavya Menon",
    publishedDate: "2025-05-14",
    category: "Nutrition",
    readTime: "5 min read"
  },
  {
    id: "3",
    slug: "tea-ritual-better-sleep",
    title: "Creating A Tea Ritual For Better Sleep",
    excerpt: "Simple bedtime tea rituals to calm your mind and improve sleep quality.",
    content: "Quality sleep is the foundation of good health...",
    image: "/blog/blog_3.png",
    author: "Ananya Sharma",
    publishedDate: "2025-05-12",
    category: "Lifestyle",
    readTime: "6 min read"
  },
  {
    id: "4",
    slug: "moringa-benefits-explained",
    title: "Moringa Benefits Explained",
    excerpt: "The supergreen with incredible nutritional and healing properties.",
    content: "Moringa is a superfood that has been used for centuries...",
    image: "/blog/blog_4.png",
    author: "Kavya Menon",
    publishedDate: "2025-05-10",
    category: "Ingredients",
    readTime: "6 min read"
  },
  {
    id: "5",
    slug: "stress-relief-herbal-blends",
    title: "Stress Relief Through Herbal Blends",
    excerpt: "Herbal ingredients that help your body relax and manage daily stress.",
    content: "Adaptogens and calming herbs can dramatically reduce stress...",
    image: "/blog/blog_5.png",
    author: "Ananya Sharma",
    publishedDate: "2025-05-08",
    category: "Wellness",
    readTime: "6 min read"
  },
  {
    id: "6",
    slug: "golden-herbal-latte-recipe",
    title: "Golden Herbal Latte Recipe",
    excerpt: "A soothing turmeric latte recipe to nourish your body and mind.",
    content: "Turmeric is well known for its anti-inflammatory properties...",
    image: "/blog/blog_6.png",
    author: "Kavya Menon",
    publishedDate: "2025-05-06",
    category: "Recipes",
    readTime: "4 min read"
  }
];

// Mock API functions to simulate fetching data
export async function getJournalPosts(): Promise<JournalPost[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return JOURNAL_POSTS;
}

export async function getJournalPostById(id: string): Promise<JournalPost | undefined> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return JOURNAL_POSTS.find(post => post.id === id);
}
