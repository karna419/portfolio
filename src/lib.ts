import { getCollection } from 'astro:content';

/** Published projects, newest first. Drafts are included only in `npm run dev`. */
export async function getWork() {
  const all = await getCollection('work', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title));
}
