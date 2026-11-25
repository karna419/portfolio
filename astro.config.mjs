// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Used for canonical URLs and share previews.
  site: 'https://karunagaran.com',
  // three.js (the background) is one ~135 KB gzipped chunk, loaded after the page.
  vite: { plugins: [tailwindcss()], build: { chunkSizeWarningLimit: 600 } },
});
