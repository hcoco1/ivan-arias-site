import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** All published posts, newest first. Drafts show in dev only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** "Apr 2026" */
export const shortDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** "6 April 2026" */
export const longDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Markdown body with HTML comments removed (stub posts only contain a TODO comment). */
export const bodyText = (post: Post) => (post.body ?? '').replace(/<!--[\s\S]*?-->/g, '').trim();

/** "N min read": words ÷ 220, rounded, min 1. */
export const readingTime = (post: Post) => {
  const words = bodyText(post).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
};
