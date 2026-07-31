---
title: "Portafolio profesional (Astro + Tailwind)"
description: "Este mismo sitio: portafolio en Astro 5 + Tailwind con islas React, una sección dedicada a Autónoma con 5 casos de estudio y demos interactivos, animaciones de scroll y SEO."
tags: ["Astro", "Tailwind", "React", "Content Collections", "SSG", "SEO", "Frontend"]
date: 2024-12-01
featured: false
status: "Activo"
highlights:
  - "Astro 5 (SSG) + Tailwind con islas React (client:visible)"
  - "Sección de Autónoma con 5 casos de estudio y demos interactivos"
  - "Content Collections tipadas para proyectos y certificados"
  - "SEO: sitemap dinámico y Open Graph; credenciales verificables"
---

## Contexto
Portafolio personal de Diego Sánchez (dominio **diegogerardo.com**) para comunicar su trabajo en robótica y software con narrativa técnica, jerarquía visual y evidencia. Además de los proyectos individuales, el sitio incluye una **sección dedicada a Autónoma** —la empresa que Diego cofundó— donde los casos de estudio y las demos pueden explorarse sin salir del portafolio.

## Qué hace / Alcance técnico
- **Astro 5 en modo estático (SSG):** las páginas se generan en build para carga rápida y buen posicionamiento; la interactividad se aísla en **islas React** que solo hidratan cuando entran en viewport (`client:visible`), evitando enviar JS innecesario.
- **Content Collections tipadas:** los proyectos (Markdown) y los certificados (JSON) se validan con un esquema Zod en `src/content/config.ts`, lo que da consistencia a las tarjetas y evita errores de frontmatter.
- **Tailwind CSS:** sistema de estilos consistente y componentes reutilizables para escalar con nuevos casos sin rehacer diseño.
- **Sección de Autónoma con 5 casos de estudio** y **demos interactivos** embebidos:
  - Simulador de **POS** (flujo de captura y cobro).
  - **Sincronización offline** (cola local y reconciliación).
  - **Dashboard de analítica con asistente de IA**.
  - **Generador de códigos de barras Code128**.
  - **Motor PERT / ruta crítica** para planeación de proyectos.
- **Animaciones de scroll** para guiar la lectura y dar impacto visual sin sacrificar rendimiento.
- **SEO:** sitemap dinámico, metadatos **Open Graph** para previsualizaciones al compartir, y sección de **credenciales verificables** (certificados con enlace de validación).

## Rol de Diego
Diseño y desarrollo completos del sitio: arquitectura de contenido con Content Collections, integración de las islas React para las demos, sistema visual en Tailwind, animaciones y configuración de SEO. También la redacción y curaduría de cada caso de estudio.

## Resultado / Estado
- **Activo** y en línea en **diegogerardo.com**.
- Portafolio que funciona a la vez como escaparate personal y como vitrina técnica de Autónoma, con demos que cualquier visitante puede probar directamente.
- Estructura pensada para crecer: agregar un proyecto o certificado es cuestión de sumar un archivo de contenido tipado, sin tocar la capa de presentación.
