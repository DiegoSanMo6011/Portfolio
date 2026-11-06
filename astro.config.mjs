import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  
  site: 'https://diegogerardo.com',

  integrations: [
    react(),
    sitemap(),
    tailwind({
      // Esto asegura que Tailwind aplique los estilos base
      applyBaseStyles: true,
    })
  ],
});