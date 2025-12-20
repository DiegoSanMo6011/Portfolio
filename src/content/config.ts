// src/content/config.ts
import { defineCollection, z } from 'astro:content';

// 1. Colección de Proyectos
const projectsCollection = defineCollection({
  type: 'content', // Usaremos Markdown para el contenido largo
  schema: z.object({
    title: z.string(),
    description: z.string(), // Resumen corto para la tarjeta
    tags: z.array(z.string()),
    heroImage: z.string().optional(), // Foto principal
    videoUrl: z.string().optional(), // Para el GIF/Video en el futuro
    githubUrl: z.string().optional(),
    pdfUrl: z.string().optional(), // Link al reporte técnico o paper
    date: z.date(), // Para ordenar cronológicamente
    featured: z.boolean().default(false), // Para decidir si sale en la Home
  }),
});

// 2. Colección de Certificados (Tipo 'data', no 'content')
const certificatesCollection = defineCollection({
  type: 'data', // Usaremos JSON para datos estructurados
  schema: z.array(
    z.object({
      title: z.string(),
      issuer: z.string(),
      date: z.string(),
      url: z.string().optional(),
      badgeText: z.string().optional(),
      
    })
  ),
});

export const collections = {
  projects: projectsCollection,
  certificates: certificatesCollection,
};