---
title: "PuzzleBot autónomo con ROS 2"
description: "Robótica móvil con ROS 2: percepción, control y telemetría para conducción autónoma en un robot diferencial."
tags: ["ROS 2", "micro-ROS", "Robótica móvil", "Percepción", "Control", "Telemetría", "YOLOv8", "Jetson Nano"]
date: 2025-06-01
featured: true
githubUrl: "https://github.com/Ric4rd1/PuzzleBot"
videoUrl: "https://www.youtube.com/watch?v=sOlqaHjRg6w"
---

## Contexto académico y colaboración
Proyecto desarrollado en la materia **Implementación de Robótica Inteligente (Gpo 502)** durante el semestre **enero–junio 2025 (6º semestre)**. El equipo se llamó **Malvados y Asociados** y el trabajo se realizó en colaboración con **Manchester Robotics**.

## Arquitectura técnica
- **Robot diferencial** con navegación basada en **cámara + encoders**.
- **Jetson Nano 2GB** para ROS 2 y visión por computadora.
- **Hackerboard (ESP32)** para control de motores y sensores.
- **ROS 2 Humble** sobre **Ubuntu 22.04**.

## Mi aporte técnico
- Integración y comprensión de **micro‑ROS** para comunicación embebida.
- Lectura de **encoders** y telemetría de distancia recorrida (cm).
- Pruebas de giro y estimación de rotaciones.
- Curación de dataset y etiquetado para **YOLOv8**.
- Pruebas finales, validación y depuración del sistema.

## Retos y soluciones
- **Odometría confiable:** calibración con encoders para mejorar el control en trayectoria.
- **Percepción en tiempo real:** pipeline de visión para señales/semáforos con YOLOv8.
- **Integración completa:** unión de control, percepción y telemetría en ROS 2 sin perder estabilidad.

## Impacto
- Se logró conducción autónoma con percepción visual y control cerrado.
- El sistema mostró robustez en pruebas integradas y validación final.

## Evidencias
<div class="flex flex-wrap gap-3">
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition" href="https://www.youtube.com/watch?v=sOlqaHjRg6w" target="_blank" rel="noopener noreferrer">Video principal</a>
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition" href="https://www.linkedin.com/posts/manchester-robotics_manchesterrobotics-puzzlebot-autonomousdriving-ugcPost-7344312943968223232-lLYz" target="_blank" rel="noopener noreferrer">Publicación Manchester Robotics</a>
</div>

## Certificaciones relacionadas
<div class="flex flex-wrap gap-3">
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 transition" href="https://learn.nvidia.com/certificates?id=Kjqnc8LGRQurIFC_6dsp7g" target="_blank" rel="noopener noreferrer">NVIDIA Fundamentals of Deep Learning (9 junio 2025)</a>
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 transition" href="/assets/docs/opencv-bootcamp.pdf" target="_blank" rel="noopener noreferrer">OpenCV Bootcamp (abril 2025)</a>
</div>
