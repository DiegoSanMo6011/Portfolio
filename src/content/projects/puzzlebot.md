---
title: "PuzzleBot autónomo con ROS 2"
description: "Robot diferencial autónomo con ROS 2: seguimiento de línea, detección de señales con YOLOv8 y odometría para conducción autónoma sobre pista."
tags: ["ROS 2", "micro-ROS", "Robótica móvil", "Percepción", "Control", "Telemetría", "YOLOv8", "Jetson Nano"]
date: 2025-06-01
featured: true
priority: 4
githubUrl: "https://github.com/Ric4rd1/PuzzleBot"
videoUrl: "https://www.youtube.com/watch?v=sOlqaHjRg6w"
status: "Proyecto académico completado"
highlights:
  - "Seguimiento de línea y navegación autónoma sobre pista"
  - "YOLOv8 para señales y semáforos en tiempo real"
  - "micro‑ROS + encoders para odometría y telemetría"
  - "ROS 2 Humble en Jetson Nano; ESP32 para control de motores"
---

## Contexto
Proyecto académico desarrollado en la materia **Implementación de Robótica Inteligente (Gpo 502)** durante el semestre **enero–junio 2025 (6º semestre)** de la carrera de Ingeniería en Robótica y Sistemas Digitales en el Tecnológico de Monterrey. El equipo se llamó **Malvados y Asociados** y el trabajo se realizó en colaboración con **Manchester Robotics**, sobre su plataforma **PuzzleBot**.

El reto planteado fue lograr **conducción autónoma** de un robot diferencial: mantener el seguimiento de una línea/pista, navegar de forma autónoma y **detectar señales de tránsito y semáforos** para reaccionar en consecuencia (frenar, avanzar o modificar la trayectoria), integrando percepción, control y telemetría en un solo sistema.

## Qué hace / Alcance técnico
El robot recorre una pista de forma autónoma combinando **visión por computadora** para el seguimiento de línea y la detección de señales, con **control de motores** y **odometría** basada en encoders para estimar el desplazamiento.

**Arquitectura:**
- **Robot diferencial** con navegación basada en **cámara + encoders**.
- **Jetson Nano 2GB** para ROS 2 y la carga de visión por computadora.
- **Hackerboard (ESP32)** para control de motores y lectura de sensores.
- **ROS 2 Humble** sobre **Ubuntu 22.04** como middleware de integración.
- **micro‑ROS** para la comunicación entre el firmware embebido y los nodos de ROS 2.

**Pipeline de conducción:**
- **Seguimiento de línea** para mantener la trayectoria sobre la pista.
- **Percepción con YOLOv8** para reconocer señales y semáforos en tiempo real y disparar la conducta correspondiente.
- **Odometría con encoders** para telemetría de distancia recorrida y estimación de giros, cerrando el lazo de control.

## Mi rol en el proyecto
- Integración y comprensión de **micro‑ROS** para la comunicación embebida con los nodos de ROS 2.
- Lectura de **encoders** y telemetría de distancia recorrida (cm).
- Pruebas de giro y estimación de rotaciones para calibrar la odometría.
- **Curación y etiquetado del dataset** utilizado para entrenar el modelo de detección con YOLOv8.
- Pruebas finales, validación y depuración del sistema integrado.

## Resultado
Se logró la **conducción autónoma** del robot combinando percepción visual (seguimiento de línea y detección de señales con YOLOv8) con control cerrado apoyado en la odometría. El sistema se comportó de forma estable durante las pruebas integradas y la validación final de la materia.

El proyecto se completó dentro del semestre enero–junio 2025 y su desarrollo fue reconocido en una [publicación de Manchester Robotics](https://www.linkedin.com/posts/manchester-robotics_manchesterrobotics-puzzlebot-autonomousdriving-ugcPost-7344312943968223232-lLYz).

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
