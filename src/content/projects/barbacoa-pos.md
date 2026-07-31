---
title: "POS para Barbacoa de Miranda"
description: "Sistema de punto de venta en Raspberry Pi con operación offline, sincronización y reportes para un restaurante familiar reconocido en Querétaro. En producción desde febrero de 2026."
tags: ["Autónoma", "POS", "Python", "Raspberry Pi", "Offline", "Supabase"]
date: 2026-01-20
featured: true
priority: 3
githubUrl: "https://github.com/DiegoSanMo6011/Barbacoa"
siteUrl: "/autonoma/barbacoa"
status: "En producción"
highlights:
  - "POS offline con cola local y sincronización automática"
  - "UI full‑screen para operación rápida en caja"
  - "Backups diarios y consistencia de datos"
  - "Diseñado para Raspberry Pi en operación real"
---

> Este proyecto es parte de **Autónoma**. [Ver el caso completo con la historia de 5 meses de operación real →](/autonoma/barbacoa)

## Contexto
**Barbacoa de Miranda** es una empresa familiar reconocida en Querétaro. El proyecto consiste en un **POS operativo** diseñado para velocidad de captura, confiabilidad **offline** y administración centralizada. **En producción desde febrero de 2026**, con ~5 meses de datos transaccionales reales auditados y conexión en tiempo real (dual-write) a la plataforma de analítica de Autónoma desde junio de 2026.

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
- **En producción** — operación diaria real desde febrero de 2026.
- ~5 meses de cortes de caja auditados (auditoría forense con corrección de 2 bugs de fórmula).
- Dual-write hacia la plataforma de analítica de Autónoma para dashboards en tiempo real.
