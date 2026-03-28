import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';
import tailwindVite from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  adapter: netlify(),
  integrations: [
    react(),
    keystatic()
  ],
  vite: {
    plugins: [tailwindVite()],
  }
});
