---
title: "Driver neumático biestable para robótica suave"
description: "Infraestructura integral para locomoción en robots suaves: neumática biestable, control en lazo cerrado, firmware, SDK en Python, GUI y experimentos reproducibles con ROS 2." 
tags: ["Soft Robotics", "Control", "ROS 2", "ESP32", "micro-ROS", "Python", "Neumática", "Embedded Systems", "GUI"]
date: 2024-08-01
featured: true
githubUrl: "https://github.com/DiegoSanMo6011/softbot_pneumatic_driver"
videoUrl: "https://www.youtube.com/watch?v=Nmk_etXFZ6o"
videoUrl2: "https://youtu.be/rIL5Ci7ShaE"
status: "En desarrollo activo · RoboSoft 2026"
highlights:
  - "Control PI dual con seguridad (E‑STOP y límites dinámicos)"
  - "micro‑ROS en ESP32 con telemetría en tiempo real"
  - "SDK Python + GUI para experimentación reproducible"
  - "Sistema base para locomoción competitiva y de investigación"
---

## Un proyecto vivo, orientado a investigación y competencia
Este trabajo comenzó en **agosto de 2024** dentro del **Hybrid Soft Robotics Lab (Tecnológico de Monterrey, Campus Querétaro)** y avanzó de forma decisiva durante mi **estancia de investigación**. El objetivo inicial era claro: convertir un robot suave prometedor en **una plataforma real de experimentación**, con control repetible y datos confiables.

El producto de esa estancia es, hoy, **la base del sistema actual**. Con ese trabajo obtuvimos el **Best Poster Award**, al presentar la investigación que consolidó el enfoque de control y la infraestructura completa.

Actualmente el proyecto sigue activo y está orientado a la **competencia RoboSoft 2026 – inPipe Locomotion**, con un sistema que combina neumática, electrónica, firmware y software de alto nivel para ejecutar locomoción con seguridad, precisión y rapidez de iteración.
El proceso de desarrollo fortaleció mis capacidades de ingeniería al llevarlo de una primera iteración funcional hasta una plataforma de investigación competitiva.

## Alcance integral del sistema
Este proyecto cubre **todo el sistema de locomoción** a un nivel de investigación y competencia.

**Neumática y arquitectura de potencia** (en conjunto con el laboratorio):
- Topología **biestable** con presión y vacío, bombas en paralelo y conmutación rápida.
- Manifold, derivaciones y esquema con **tanque BOOST** para impulsos de salto.
- Válvulas direccionales y lógica de distribución por cámaras (A/B).

**Electrónica y firmware (mi responsabilidad principal):**
- ESP32 con **micro‑ROS** y comunicación **UART** hacia el agente.
- Sensor de presión vía **I2C** (ADS1115, 16‑bit) para lectura en kPa.
- Control PI dual (inflado / succión) y modos de operación extendidos.
- Seguridad activa: límites dinámicos, **E‑STOP**, venteo y reset de integradores.
- Telemetría en tiempo real para análisis y ajuste.

**Software de alto nivel y experimentación (mi responsabilidad principal):**
- **SDK en Python (ROS 2)** para teleoperación y control de alto nivel.
- Scripts de locomoción (salto sincronizado, caminata alternada, giros y desatasque).
- **GUI de escritorio** para telemetría, depuración y registro.
- Conjunto de datos y registros experimentales para análisis científico.

## Diferenciadores técnicos
El enfoque fue **hacer ciencia e ingeniería con repetibilidad**:
- De pruebas manuales aisladas a **experimentos controlados** y datos confiables.
- De control rígido a **ajuste dinámico en tiempo real**.
- De prototipos frágiles a un sistema **seguro y escalable** para investigación.

## Competencias demostradas
- Integración **hardware–firmware–software** en un sistema real de robótica.
- Comunicación embebida **UART** y sensado **I2C** con adquisición precisa.
- Control en lazo cerrado y **ajuste dinámico** en tiempo real.
- Diseño de herramientas para experimentación reproducible y registro.
- Enfoque de seguridad funcional (E‑STOP, límites, venteo).

## Primera iteración (bases del proyecto)
La etapa inicial del proyecto se desarrolló como parte de mi **servicio becario** en el laboratorio. En ese momento me enfoqué en **sentar las bases** para experimentar con algoritmos de locomoción peristáltica en actuadores suaves tipo crawling, construyendo un entorno de pruebas estable para investigación.

El robot de esa fase utilizó un sistema electroneumático controlado por **Arduino Uno**, sensores de presión, electroválvulas y una bomba de aire, con comunicación hacia un servidor **MQTT**. Esta primera versión fue presentada en **“Exploring Soft Robotics: Student Research Forum”**, destacando su potencial en el campo de la robótica deformable en México.

## Diplomas, constancias y reconocimientos (con comprobantes)
- **Best Poster Award** – “Bidirectional Pressure–Vacuum Switching Control for Soft Pneumatic Actuators” (Exploring Soft Robotics, 3 dic 2025) — /assets/docs/best-poster-award-2025.pdf
- **Ponencia** – “Locomoción de un robot deformable tipo crawling” (Student Research Forum, 4 dic 2024) — /assets/docs/ponencia-locomocion-crawling-2024.pdf
- **Seminario** – Participación y presentación del proyecto “Locomotion for soft crawling robots” (Soft Robotics Seminar, feb–jun 2025) — /assets/docs/soft-robotics-seminar-2025.pdf
- **Expositor** – Feria de Ciencias, Querétaro 2025 (11–15 nov 2025) — /assets/docs/feria-ciencias-queretaro-2025.pdf
- **Congreso** – Participación en Congreso Internacional SmarTec Digital Manufacturing (23–24 oct 2025) — /assets/docs/smartec-digital-manufacturing-2025.pdf

**Ver comprobantes:**  
[Best Poster Award](/assets/docs/best-poster-award-2025.pdf) · [Ponencia](/assets/docs/ponencia-locomocion-crawling-2024.pdf) · [Seminario](/assets/docs/soft-robotics-seminar-2025.pdf) · [Feria de Ciencias](/assets/docs/feria-ciencias-queretaro-2025.pdf) · [SmarTec](/assets/docs/smartec-digital-manufacturing-2025.pdf)

## Aprendizajes clave
- Control de presión/vacío en sistemas neumáticos no lineales
- Arquitecturas seguras con **E‑STOP** y límites dinámicos
- Abstracción de hardware con APIs de alto nivel para investigación
- Integración de micro‑ROS con ROS 2 para telemetría y control distribuido
- Diseño de locomoción por fases con tolerancias, tiempos mínimos y estabilidad

## Estado actual
- Preparación de **nuevos algoritmos de locomoción**
- Integración de tanque BOOST para saltos en competencia
- Postulación en curso a la **competencia RoboSoft 2026**
