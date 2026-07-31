import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    return new Response('Site URL is not configured.', { status: 500 });
  }

  const projects = await getCollection('projects');
  const staticPages = [
    '/',
    '/about',
    '/certificates',
    '/cv',
    '/autonoma',
    '/autonoma/optinoma',
    '/autonoma/pos-lite',
    '/autonoma/barbacoa',
    '/autonoma/analitica',
    '/autonoma/pmo',
  ];

  const urls = [
    ...staticPages.map((path) => ({ loc: new URL(path, site).href })),
    ...projects.map((project) => ({
      loc: new URL(`/projects/${project.slug}`, site).href,
      lastmod: project.data.date.toISOString().split('T')[0],
    })),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => {
      if (url.lastmod) {
        return `  <url><loc>${url.loc}</loc><lastmod>${url.lastmod}</lastmod></url>`;
      }
      return `  <url><loc>${url.loc}</loc></url>`;
    }),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
