---
title: "SATAG · Plataforma de acceso vehicular escolar"
description: "Plataforma web que cubre el ciclo completo del acceso vehicular de un colegio: solicitud con firma electrónica, caja, inventario, integración con el control de plumas y analítica del estacionamiento. En producción con personal y familias reales."
tags: ["Next.js", "React 19", "TypeScript", "Supabase", "PostgreSQL", "RLS", "Seguridad", "Analítica"]
date: 2026-07-07
featured: true
priority: 1
status: "En producción"
highlights:
  - "Reemplacé un proceso de papel y hoja de cálculo por una plataforma de punta a punta: solicitud, firma, cobro, corte de caja, inventario y bajas."
  - "Integré un sistema de control de acceso de terceros sin API: importo y concilio su bitácora y su padrón, y la plataforma guía los cambios por lotes y verifica que queden hechos."
  - "Bajé la carga del tablero de estacionamiento de 41 s a unos 6 s y el cambio de pestaña de 14 s a 0.2 s, midiendo en producción en cada paso."
  - "Disciplina de migraciones de producción: 105 bloques SQL numerados con guardia, cambio, verificación de solo lectura y rollback, ensayados en local antes de aplicar."
  - "Autor único: producto, base de datos, seguridad, despliegue, documentación legal y operación diaria."
---

## Contexto

El acceso vehicular de un colegio privado en Querétaro se controlaba con etiquetas de radiofrecuencia y un sistema de plumas de terceros, pero todo el ciclo administrativo vivía en papel y en una hoja de cálculo: la solicitud, la aceptación del reglamento, el cobro, la instalación y las bajas. No había forma confiable de saber quién tenía acceso, si lo usaba o si había pagado.

**SATAG** es la plataforma web que construí para cubrir ese ciclo completo y que se volvió el centro de administración del estacionamiento. Está **en producción** con personal y familias reales (acceso interno).

## Lo que construí

- **Formulario público de solicitud** con validación por tipo de usuario y placas, **firma manuscrita en pantalla** y aceptación de reglamento y aviso de privacidad versionados. Al firmar se arma un paquete probatorio con huella SHA-256, sello de tiempo y la versión exacta aceptada.
- **Panel interno por roles** (caja, TI, contabilidad, consulta) con **MFA obligatorio**; los permisos se aplican en la base de datos, no solo en la interfaz.
- **Caja y finanzas**: cobro con recibo, corte sellado, conciliación y devoluciones atadas al recibo, con protección contra pantallas desactualizadas en dos sesiones a la vez.
- **Puente con un sistema de control de acceso de terceros sin API**: genera la plantilla de importación con las reglas reales del importador, ingiere su bitácora y su padrón, da de alta automáticamente a quien usa una pluma sin expediente y frena cargas que dejarían fuera a buena parte del padrón sin confirmación.
- **Tablero de estacionamiento**: ocupación por lote, entradas y salidas, estancias incompletas y días atípicos excluidos de la curva.
- **Depuración de datos por persona**: conciliación de cuatro fuentes contradictorias con reglas explícitas de cuál manda, incluido un **algoritmo propio de comparación de nombres en español** (clave fonética, distancia de edición, abreviaturas y partículas), cubierto por más de 30 pruebas con datos reales.

## Ingeniería destacada

- **Migraciones con disciplina de producción**: cada bloque SQL lleva guardia, cambio, verificación de solo lectura y rollback comentado, y se ensaya en local antes de entregarse.
- **Reglas nacidas de incidentes reales** y escritas como norma, como el orden correcto entre un cambio en la base y el despliegue del cliente.
- **Guardián de antipatrones en CI** que falla el build si reaparece un error ya resuelto, y **verificación posterior al despliegue** contra el sitio real.
- **Seguridad de datos**: RLS por rol y por nivel de autenticación, funciones con verificación de rol, minimización impuesta en la base y respaldos sin acceso para el rol anónimo.
- **Dimensión legal**: aviso de privacidad versionado (LFPDPPP), análisis del valor probatorio de la firma electrónica, NOM-151 y procedimiento ARCO.

## Métricas de desarrollo

406 commits y 105 bloques SQL numerados aplicados en orden a producción; ~35,000 líneas de TypeScript y más de 450 pruebas unitarias en verde (al 3-nov-2026).

## Qué demuestra

Producto completo de punta a punta, de la necesidad a la operación diaria, hecho por una sola persona: ingeniería de datos real contra un sistema cerrado, seguridad y privacidad desde el diseño, y madurez operativa con migraciones reversibles y postmortems convertidos en reglas.
