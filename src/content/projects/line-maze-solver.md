---
title: "Line‑Maze Solver con Pololu 3pi+"
description: "Robot seguidor de línea que resuelve un laberinto memorizando la ruta, la simplifica y la repite optimizada en una segunda vuelta, con control PID sobre el Pololu 3pi+ 32U4."
tags: ["Robótica móvil", "Control PID", "Line Following", "Algoritmos", "C++", "Arduino", "Pololu 3pi+"]
date: 2024-03-01
featured: false
githubUrl: "https://github.com/DiegoSanMo6011/Line-Maze-Solver"
videoUrl: "https://youtu.be/7IuBa7F5US0"
status: "Proyecto personal completado"
highlights:
  - "Seguimiento de línea estable con control PID"
  - "Registro de giros (I/D/S/U) durante la exploración"
  - "Simplificación de ruta que elimina vueltas en U"
  - "Segunda pasada más corta y rápida"
---

## Contexto
Proyecto personal de robótica móvil desarrollado en **2024** sobre el **Pololu 3pi+ 32U4**, una plataforma compacta programable desde el entorno de Arduino. El reto era doble: por un lado, lograr que el robot **siguiera una línea de forma estable** a buena velocidad; por otro, que fuera capaz de **resolver un laberinto de línea** (un trazado con intersecciones y callejones sin salida) sin conocerlo de antemano y, en una segunda vuelta, recorrerlo por la **ruta óptima** ya sin errores ni desvíos.

## Qué hace / Alcance técnico
- **Plataforma:** Pololu 3pi+ 32U4 con arreglo de sensores de reflectancia integrados y motores con encoders.
- **Control de línea (PID):** lazo cerrado que corrige la posición del robot respecto al centro de la línea. Incluye **calibración inicial de sensores**, cálculo del error a partir de la posición ponderada de la línea y limitación del término integral para evitar oscilaciones.
- **Exploración del laberinto (primera pasada):** el robot avanza siguiendo la línea, **detecta intersecciones** y toma decisiones con una regla consistente (p. ej. mano izquierda). Cada giro se **registra en una secuencia** (izquierda / derecha / recto / vuelta en U).
- **Simplificación de ruta:** al llegar a un callejón sin salida y dar vuelta en U, se aplican reglas que **colapsan los segmentos con U‑turn** en un solo movimiento equivalente, dejando únicamente el camino que realmente lleva a la meta.
- **Ejecución optimizada (segunda pasada):** con la ruta ya depurada en memoria, el robot repite el recorrido **sin exploración**, ejecutando directamente la secuencia de giros a mayor velocidad.

## Mi rol
Proyecto realizado de forma individual, de extremo a extremo:
- Implementación y **ajuste del control PID** para un seguimiento estable a distintas velocidades.
- Lógica de **detección de intersecciones** y fin de laberinto a partir de las lecturas de los sensores.
- Diseño de la **representación de la ruta** y de las reglas de simplificación en memoria del microcontrolador.
- Pruebas y depuración sobre el trazado físico hasta lograr un recorrido optimizado repetible.

## Resultado y estado
El robot **completa el laberinto** en la primera pasada y, tras simplificar la ruta, la **repite de forma más corta y rápida** en la segunda. El proyecto demuestra la integración entre **control en tiempo real** y **optimización algorítmica** dentro de las restricciones de memoria y cómputo de un microcontrolador. Estado: **completado**, con código público y video de demostración.

## Evidencias
<div class="flex flex-wrap gap-3">
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition" href="https://youtu.be/7IuBa7F5US0" target="_blank" rel="noopener noreferrer">Video de demostración</a>
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition" href="https://github.com/DiegoSanMo6011/Line-Maze-Solver" target="_blank" rel="noopener noreferrer">Repositorio en GitHub</a>
</div>

## Aprendizajes clave
- Ajuste de un controlador **PID** robusto en hardware con recursos limitados.
- Representación y **simplificación de rutas** con estructuras ligeras en memoria.
- Detección confiable de **intersecciones** y del fin del laberinto.
