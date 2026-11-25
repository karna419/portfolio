// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Change this once your domain is live — it's used for canonical URLs and share previews.
  site: 'https://karunagaran.dev',
  vite: { plugins: [tailwindcss()] },
});
