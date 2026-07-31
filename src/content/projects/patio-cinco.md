---
title: "Patio Cinco — Plataforma operativa para autolavado"
description: "Plataforma web en producción para un autolavado en Querétaro: gestión de clientes, vehículos, membresías, facturación y datos fiscales. Construida sobre Wix + Velo con backend relacional."
tags: ["Product Engineering", "Web Platform", "Wix + Velo", "Backend", "Billing", "Operations"]
date: 2026-01-01
featured: true
priority: 2
siteUrl: "https://www.patiocinco.com/"
status: "En producción"
highlights:
  - "En producción, en uso diario con clientes reales"
  - "Migración de hojas de cálculo a un backend relacional"
  - "Membresías, vehículos y datos fiscales persistentes"
  - "Implementado sobre Wix + Velo con flujos a la medida"
---

## Contexto
**Patio Cinco** es un autolavado establecido en Querétaro. El dueño nos contactó para profesionalizar una operación que ya funcionaba, pero que se apoyaba en herramientas básicas: un sitio Wix sencillo y el control de clientes concentrado en una sola hoja de cálculo de Google Sheets. Junto con **Arturo López García** entramos como equipo externo para proponer, diseñar, desarrollar e implementar una plataforma operativa real, sin frenar el negocio en marcha.

## Qué resuelve
La operación dependía de procesos manuales y datos dispersos, con poca trazabilidad. La plataforma centraliza la gestión del negocio y elimina la dependencia de hojas de cálculo:

- **Registro y gestión de clientes** con flujos simples y controlados.
- **Relación cliente–vehículo–membresía** con estados claros y persistentes.
- **Facturación** con datos fiscales (RFC, razón social, uso de CFDI) almacenados y reutilizables, sin recaptura manual en cada transacción.
- **Zona de cliente** para consultar su información, sus vehículos y su membresía.

## Alcance técnico
- Implementación sobre **Wix + Velo** por requerimiento del cliente, adaptando la plataforma a flujos para los que no está pensada de origen. La restricción exigió soluciones a la medida sin comprometer la operación.
- **Backend relacional y autenticado** que modela clientes, vehículos, membresías y datos fiscales como entidades conectadas y consistentes.
- Flujo de facturación **end‑to‑end**, sin pasos manuales del staff para reutilizar los datos fiscales del cliente.
- Manejo de errores y logging operativo pensados para **producción**.

## Mi rol y aporte
- Diseño del sistema completo junto a Arturo López García.
- Implementación del backend, los modelos de datos y los flujos operativos.
- Desarrollo de los módulos críticos de **membresías** y **facturación**.
- Iteración continua con el cliente: revisiones, ajustes y validación con usuarios reales.

## Resultado y estado
- Plataforma terminada y **en producción** en [patiocinco.com](https://www.patiocinco.com/), en uso diario con clientes reales.
- El negocio pasó de un control básico en hojas de cálculo a una operación con **trazabilidad y control fiscal**.
- La arquitectura relacional deja una base lista para nuevas integraciones y automatización sin rehacer el sistema.

**Sitio público:** disponible en el botón superior del proyecto.
