// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Used for canonical URLs and share previews.
  site: 'https://karunagaran.com',
  vite: { plugins: [tailwindcss()] },
});
