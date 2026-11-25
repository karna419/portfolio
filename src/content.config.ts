import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    appStore: z.string().url().optional(),
    playStore: z.string().url().optional(),
    // Square app icon, e.g. '/work/my-app-icon.png'.
    icon: z.string().optional(),
    // Drafts show up while you run `npm run dev`, never on the live site.
    draft: z.boolean().default(false),
  }),
});

export const collections = { work };
