---
title: "POS para Barbacoa de Miranda"
description: "Sistema de punto de venta en Raspberry Pi con operación offline, sincronización y reportes para un restaurante familiar reconocido en Querétaro."
tags: ["Product Engineering", "POS", "Python", "Raspberry Pi", "Offline", "Supabase"]
date: 2026-01-20
featured: true
priority: 3
githubUrl: "https://github.com/DiegoSanMo6011/Barbacoa"
status: "Instalación final"
highlights:
  - "POS offline con cola local y sincronización automática"
  - "UI full‑screen para operación rápida en caja"
  - "Backups diarios y consistencia de datos"
  - "Diseñado para Raspberry Pi en operación real"
---

## Contexto
**Barbacoa de Miranda** es una empresa familiar reconocida en Querétaro. El proyecto consiste en un **POS operativo** diseñado para velocidad de captura, confiabilidad **offline** y administración centralizada. El sistema está en fase final de instalación y pruebas con operación real.

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
- Instalación y pruebas finales en sitio.
- Preparado para despliegue continuo en Raspberry Pi.
