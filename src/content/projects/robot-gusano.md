---
title: "Driver neumático biestable para robótica suave"
description: "Infraestructura de control (electrónica, firmware y software) para presión/vacío en actuadores neumáticos, habilitando investigación de locomoción en robots suaves." 
tags: ["Soft Robotics", "Control", "ROS 2", "ESP32", "micro-ROS", "Python", "Neumática", "Embedded Systems"]
date: 2024-08-01
featured: true
githubUrl: "https://github.com/DiegoSanMo6011/softbot_pneumatic_driver"
videoUrl: "https://www.youtube.com/watch?v=Nmk_etXFZ6o"
---

## Una plataforma real para investigar locomoción
Este proyecto nació en **agosto de 2024** como parte de mi servicio becario en el **Hybrid Soft Robotics Lab (Tecnológico de Monterrey, Campus Querétaro)**. En el laboratorio había robots suaves prometedores, pero **no existía una infraestructura de control estable** para experimentar locomoción de forma repetible. Mi meta fue clara: **construir el “sistema nervioso”** que permitiera probar, iterar y avanzar investigación real.

Hoy, el sistema sigue activo y está en preparación para la **competencia RoboSoft 2026**, con nuevos algoritmos de locomoción en desarrollo.

## Lo que construí (y por qué importa)
Mi aporte fue **de principio a fin en control y software**. La manufactura física del robot y la neumática base fueron desarrolladas en el laboratorio, pero **la capa que permite investigar** es mía: desde el circuito y firmware hasta el SDK en Python.

- **Electrónica y firmware (ESP32 + micro-ROS):** control PI dual (presión y vacío), telemetría y seguridad activa con E‑STOP.
- **Sistema electroneumático biestable:** conmutación rápida inflado/succión y distribución por cámaras para locomoción.
- **API de alto nivel (ROS 2 + Python):** comandos de alto nivel, scripts para locomoción peristáltica, identificación de sistemas y tuning dinámico.

En otras palabras: **antes no había forma confiable de experimentar**, ahora existe una plataforma que **reduce tiempos de prueba y eleva la calidad del dato**.

## Impacto real
- **Habilitó investigación en locomoción**: se pasó de “probar a mano” a un entorno controlable y reproducible.
- **Aceleró iteraciones**: nuevas pruebas en minutos, no en horas.
- **Base para futuras generaciones**: la arquitectura quedó lista para que otros desarrollen control avanzado y locomoción compleja.

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
