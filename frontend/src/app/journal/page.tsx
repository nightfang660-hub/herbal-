import JournalView from './JournalView';
import { getJournalPosts } from './data';

export const metadata = {
  title: 'Journal | Herbal Tea',
  description: 'Thoughts, reflections, and insights on living a balanced life.',
};

export default async function JournalPage() {
  const posts = await getJournalPosts();
  
  return <JournalView posts={posts} />;
}
