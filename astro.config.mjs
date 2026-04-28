import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import keystatic from '@keystatic/astro';
import tailwindVite from '@tailwindcss/vite';

import icon from 'astro-icon';

export default defineConfig({
  output: 'static',
  adapter: netlify(),
  integrations: [react(), keystatic(), icon()],
  vite: {
    plugins: [tailwindVite()],
  }
});