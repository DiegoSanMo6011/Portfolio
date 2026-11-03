---
title: "SEVAD · Evaluación anónima del servicio por QR"
description: "Encuesta anónima por QR y panel con el que un colegio mide cómo atiende a las familias en sus ventanillas. De cero a producción en 6 días; después, ingeniería de rendimiento que bajó el panel de 28.9 s a 23 ms."
tags: ["Next.js", "React 19", "TypeScript", "Supabase", "PostgreSQL", "RLS", "d3", "Accesibilidad"]
date: 2026-06-18
featured: true
priority: 2
status: "En producción"
highlights:
  - "Llevé el sistema de cero a producción con despliegue automático en 6 días."
  - "Optimicé el panel de 28.9 s a 23 ms en laboratorio de carga, diagnosticando con EXPLAIN un N+1 y el costo de las políticas de seguridad; se mantiene en 23 ms con 233,000 respuestas de prueba."
  - "Detecté y corregí una exposición de funciones administrativas causada por los privilegios por omisión de PostgreSQL."
  - "Encuesta 100% anónima por diseño: no pide datos personales ni guarda la IP."
  - "Autor único: producto, UX, base de datos, seguridad, pruebas, capacidad y manuales."
---

## Contexto

La dirección de un colegio privado en Querétaro quería saber cómo se atiende a las familias en sus ventanillas administrativas **para mejorar el servicio, no para evaluar a personas una por una**. Fue mi primer sistema en el Instituto: del primer commit a producción, con despliegue automático, en **6 días**. Está **en producción** (acceso interno) y operando con datos reales.

## Lo que construí

- **Encuesta pública por QR**: quien termina un trámite escanea el código del área y responde en menos de un minuto. Es **100% anónima**, sin datos personales ni IP.
- **Panel de dirección** con autenticación: satisfacción top-2-box, mapa de calor área × dimensión, barras divergentes, tendencia, insatisfacción por hora y día, comentarios y exportación.
- **Catálogo editable sin tocar código**: banco de preguntas, dimensiones y áreas, con revisión de redacción.
- **Evolución posterior**: rol de organizador de eventos con QR por evento, alta de usuarios por invitación y vista "Ver como" para revisar permisos.

## Ingeniería destacada

- **Seguridad**: el público solo puede insertar respuestas por un RPC atómico y leer el catálogo, nunca leer respuestas; unas 26 políticas de seguridad a nivel de fila; roles que **fallan cerrado** mediante triggers; y el hallazgo corregido de que PostgreSQL concede `EXECUTE` a `PUBLIC` por omisión.
- **Rendimiento medido, no supuesto**: funciones de seguridad evaluadas una sola vez por consulta (InitPlan), índices en las llaves foráneas que faltaban y una auditoría de capacidad en laboratorio con k6, EXPLAIN y la Ley de Utilización. El panel pasó de **28.9 s a 23 ms**.
- **Rigor estadístico y visual**: metodología CSAT documentada, periodos en semanas y una **paleta validada por script** contra daltonismo y contraste.
- **Accesibilidad**: las caritas son un `radiogroup`, con `aria-live`, foco visible y respeto a `prefers-reduced-motion`.
- **Pruebas sobre el código que se despliega**: un extractor saca las funciones del TypeScript real y las compila con el del proyecto; 112 casos en verde.

## Subproducto

Del panel extraje un **mini-framework de tableros** en React y TypeScript: un contrato que separa datos y presentación, gráficas reutilizables y una paleta accesible.

## Métricas de desarrollo

274 commits; ~8,500 líneas de TypeScript y un esquema con 16 migraciones numeradas; 134 pruebas en verde (al 3-nov-2026).

## Qué demuestra

Velocidad sin sacrificar calidad, seguridad de bases de datos a nivel experto, e ingeniería de rendimiento con método cuantitativo: medir, explicar y corregir.
