---
title: "Driver neumático biestable para robótica suave"
description: "Infraestructura de control (electrónica, firmware y software) para presión/vacío en actuadores neumáticos, habilitando investigación de locomoción en robots suaves." 
tags: ["Soft Robotics", "Control", "ROS 2", "ESP32", "micro-ROS", "Python", "Neumática", "Embedded Systems"]
date: 2024-08-01
featured: true
githubUrl: "https://github.com/DiegoSanMo6011/softbot_pneumatic_driver"
---

## Visión general
Este proyecto es la base de infraestructura para investigación en locomoción de robots suaves en el **Hybrid Soft Robotics Lab (Tecnológico de Monterrey, Campus Querétaro)**. Inició en **agosto de 2024** como parte de mi servicio becario y hoy continúa activo, con preparación para postulación a la **competencia RoboSoft 2026**.

El foco no fue la manufactura del robot, sino **hacer viable y repetible la experimentación**: diseñé un **driver neumático biestable** con control de presión/vacío, telemetría y una API de alto nivel en Python/ROS 2 para ejecutar experimentos de locomoción de forma segura y rápida.

## Mi rol
**Responsable de software y control**, con apoyo de Arturo López García en neumática y diseño físico.

- Electrónica: diseño del sistema de control y potencia
- Firmware embebido (ESP32) y seguridad
- Control de presión/vacío (PI discreto)
- Telemetría y registro de datos
- SDK en Python (ROS 2) para experimentación de alto nivel
- Pruebas y validación del sistema

## Arquitectura técnica
**Objetivo:** convertir el hardware neumático en una plataforma estable para investigación y pruebas de locomoción.

### 1) Firmware embebido (ESP32 + micro-ROS)
- **Control PI dual** (presión positiva y vacío)
- **Seguridad activa** con umbrales dinámicos y paro de emergencia (E‑STOP)
- **Telemetría** en tiempo real para identificación de sistemas
- Arquitectura **maestro/esclavo** con micro‑ROS y DDS sobre UART

### 2) Sistema electroneumático biestable
- Conmutación rápida entre inflado y succión
- Enrutamiento por cámaras (A/B/Dual)
- Diseño enfocado a repetibilidad experimental

### 3) Capa de alto nivel (ROS 2 + Python)
- SDK en Python (rclpy) para **control por comandos**
- Scripts de experimentación:
  - locomoción peristáltica (FSM)
  - identificación de sistemas (step response)
  - configuración dinámica de seguridad

## Impacto / resultado
No existía una infraestructura replicable para experimentar locomoción en robots suaves dentro del laboratorio. Este proyecto **creó el entorno completo de control** para ejecutar pruebas en minutos, iterar controladores y generar datos de forma consistente. Hoy es la base para futuras líneas de investigación y proyectos más avanzados en locomoción.

## Evidencias
- **Repositorio (todo el sistema):** https://github.com/DiegoSanMo6011/softbot_pneumatic_driver
- **Video del robot en movimiento:** https://www.youtube.com/watch?v=Nmk_etXFZ6o

## Difusión y reconocimientos
- **Best Poster Award** – “Bidirectional Pressure–Vacuum Switching Control for Soft Pneumatic Actuators” (Exploring Soft Robotics, 3 dic 2025)
- **Ponencia** – “Locomoción de un robot deformable tipo crawling” (Student Research Forum, 4 dic 2024)
- **Seminario** – Soft Robotics Seminar (feb–jun 2025)
- **Expositor** – Feria de Ciencias, Querétaro 2025 (11–15 nov 2025)
- **Congreso** – SmarTec Digital Manufacturing (23–24 oct 2025)

## Aprendizajes clave
- Control de presión/vacío en sistemas neumáticos no lineales
- Arquitecturas seguras con **E‑STOP** y límites dinámicos
- Abstracción de hardware con APIs de alto nivel para investigación
- Integración de micro‑ROS con ROS 2 para telemetría y control distribuido

## Estado actual
- Preparación de **nuevos algoritmos de locomoción** y experimentación avanzada
- Postulación en curso a la **competencia RoboSoft 2026**

> Nota: La manufactura del robot y su neumática física fueron desarrolladas en el laboratorio; mi aporte principal fue el control, la electrónica y la infraestructura software/firmware.
