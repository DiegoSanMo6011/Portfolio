---
title: "POS para restaurante (Barbacoa)"
description: "Sistema de punto de venta en Raspberry Pi con operación offline, sincronización y reportes para operación real en restaurante."
tags: ["Product Engineering", "POS", "Python", "Raspberry Pi", "Offline", "Supabase"]
date: 2026-01-20
featured: true
githubUrl: "https://github.com/DiegoSanMo6011/Barbacoa"
---

## Contexto
Desarrollo de un **punto de venta (POS)** para operación real en restaurante, con foco en velocidad de captura, confiabilidad **offline** y administración centralizada. El despliegue está en fase final de instalación.

## Alcance técnico
- **Frontend local:** Python + Tkinter/CustomTkinter, interfaz full‑screen optimizada para caja.
- **Backend:** Supabase (PostgreSQL + API REST).
- **Modo offline:** cola local en SQLite y reintentos automáticos de sincronización.
- **Backups diarios:** exportación de datos locales en JSON.

## Funcionalidades clave
- Captura rápida de comandas con edición inline.
- Gestión de gastos, propinas, cortes y reportes.
- Catálogo editable de productos y personal.
- Sincronización continua cuando se restablece la conexión.

## Mi aporte
Diseño y desarrollo del sistema completo con énfasis en **operación real** y robustez: interfaz rápida, consistencia de datos, flujo offline‑online y reportes operativos.

## Estado actual
- En instalación y pruebas finales con operación real.
- Preparado para despliegue continuo en Raspberry Pi.
