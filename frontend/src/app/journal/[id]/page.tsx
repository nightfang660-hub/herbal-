import { notFound } from 'next/navigation';
import { getJournalPostById } from '../data';
import JournalPostView from './JournalPostView';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getJournalPostById(id);
  
  if (!post) {
    return {
      title: 'Post Not Found | Herbal Tea'
    };
  }

  return {
    title: `${post.title} | Journal`,
    description: post.excerpt
  };
}

export default async function JournalPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getJournalPostById(id);

  if (!post) {
    notFound();
  }

  return <JournalPostView post={post} />;
}
