---
title: "Line‑Maze Solver en Arduino (Pololu 3pi+)"
description: "Robot seguidor de línea que resuelve laberintos y optimiza el recorrido mediante registro de giros y simplificación de ruta."
tags: ["Arduino", "C++", "Control", "Line Following", "Algoritmos", "Robótica móvil"]
date: 2024-03-01
featured: false
githubUrl: "https://github.com/DiegoSanMo6011/Line-Maze-Solver"
videoUrl: "https://youtu.be/7IuBa7F5US0"
status: "Completado"
highlights:
  - "PID ligero para seguimiento estable de línea"
  - "Registro de giros y simplificación de ruta"
  - "Optimización en microcontrolador (Arduino)"
  - "Segunda pasada más rápida y eficiente"
---

## Objetivo
Construir un robot seguidor de línea capaz de **resolver laberintos** y ejecutar una segunda vuelta **optimizada**, reduciendo giros innecesarios y tiempo total.

## Enfoque técnico
- **Plataforma:** Pololu 3pi+ 32U4 con sensores de línea integrados.
- **Control de línea:** PID ligero con calibración de sensores, umbrales de intersección y limitación de integral para estabilidad.
- **Estrategia de solución:**
  - **Primera pasada:** exploración del laberinto y registro de decisiones (R/L/S/U).
  - **Simplificación:** reglas para eliminar U‑turns y condensar la ruta.
  - **Segunda pasada:** ejecución de la ruta simplificada con mayor velocidad.

## Resultado
El robot completa el laberinto y repite el recorrido con una secuencia **más corta y eficiente**, demostrando integración entre control en tiempo real y optimización algorítmica en un microcontrolador.

## Aprendizajes clave
- Diseño de control robusto en hardware limitado.
- Representación y simplificación de rutas con estructuras ligeras.
- Detección confiable de intersecciones y fin de laberinto.
