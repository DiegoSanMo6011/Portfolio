/** @type {import('tailwindcss').Config} */
// Paleta remapeada al sistema del rediseño: slate = neutros oscuros (claro→oscuro),
// cyan/blue = acento ámbar. Así todas las clases existentes caen en el sistema nuevo.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f2f0ea', 100: '#ecebe7', 200: '#d7d8d4', 300: '#bcbec1',
          400: '#9a9ca0', 500: '#808387', 600: '#6c6f74', 700: '#2f3237',
          800: '#1c1e22', 900: '#16171a', 950: '#121216',
        },
        cyan: {
          100: '#f3e7c8', 200: '#ecd39a', 300: '#e4c47e', 400: '#d8a657',
          500: '#cc9a43', 600: '#b7862f', 700: '#9a6f22', 800: '#6f4f18', 900: '#4a3a18',
        },
        blue: {
          400: '#d8a657', 500: '#c6922f', 600: '#b7862f', 700: '#9a6f22',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace'],
        display: ['Newsreader', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
