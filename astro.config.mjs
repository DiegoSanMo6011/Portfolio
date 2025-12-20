import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    tailwind({
      // Esto asegura que Tailwind aplique los estilos base
      applyBaseStyles: true,
    })
  ],
});