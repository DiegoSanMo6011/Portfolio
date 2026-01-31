---
title: "Line‑Maze Solver en Arduino (Pololu 3pi+)"
description: "Robot seguidor de línea que resuelve laberintos y optimiza el recorrido mediante registro de giros y simplificación de ruta."
tags: ["Arduino", "C++", "Control", "Line Following", "Algoritmos", "Robótica móvil"]
date: 2024-03-01
featured: false
githubUrl: "https://github.com/DiegoSanMo6011/Line-Maze-Solver"
videoUrl: "https://youtu.be/7IuBa7F5US0"
---

## Objetivo
Construir un robot seguidor de línea capaz de **resolver laberintos** y luego ejecutar una ruta **optimizada** en una segunda pasada, reduciendo giros innecesarios.

## Enfoque técnico
- **Plataforma:** Pololu 3pi+ 32U4 con sensores de línea integrados.
- **Control:** seguimiento de línea con control proporcional‑derivativo (y término integral acotado), calibración previa y umbrales para detección de intersecciones.
- **Estrategia de solución:**
  - Primera pasada: exploración y **registro de decisiones** (R/L/S/U).
  - Simplificación del recorrido: reglas de reducción de U‑turns para obtener una ruta más corta.
  - Segunda pasada: ejecución de la ruta simplificada.

## Aporte clave
El valor principal del proyecto está en la **combinación de control en tiempo real** con un algoritmo de **optimización de ruta** ligero y ejecutable en un microcontrolador.

## Resultado
El robot es capaz de completar el laberinto y repetir el trayecto con una secuencia de movimientos optimizada, minimizando tiempos y giros redundantes.
