---
title: "Driver neumático biestable para robótica suave"
description: "Infraestructura integral para locomoción en robots suaves: neumática biestable presión/vacío, control PI en lazo cerrado, firmware con micro-ROS, SDK en Python, GUI y experimentos reproducibles con ROS 2."
tags: ["Soft Robotics", "Control", "ROS 2", "ESP32", "micro-ROS", "Python", "Neumática", "Embedded Systems", "GUI", "MATLAB"]
date: 2024-08-01
featured: true
priority: 1
githubUrl: "https://github.com/DiegoSanMo6011/softbot_pneumatic_driver"
videoUrl: "https://www.youtube.com/watch?v=Nmk_etXFZ6o"
videoUrl2: "https://youtu.be/rIL5Ci7ShaE"
status: "Proyecto de investigación · Hybrid Soft Robotics Lab (Tec de Monterrey)"
highlights:
  - "Control PI dual con seguridad (E‑STOP y límites dinámicos)"
  - "micro‑ROS en ESP32 con telemetría en tiempo real"
  - "SDK Python + GUI para experimentación reproducible"
  - "Análisis y gráficas de control con MATLAB"
  - "Plataforma de locomoción para investigación en robótica suave"
---

## Contexto
Este trabajo comenzó en **agosto de 2024** dentro del **Hybrid Soft Robotics Lab (Tecnológico de Monterrey, Campus Querétaro)** y avanzó de forma decisiva durante mi **estancia de investigación**. El objetivo era claro: convertir un robot suave prometedor en **una plataforma real de experimentación**, con control repetible y datos confiables.

El sistema se desarrolló con miras al reto **RoboSoft 2026 – inPipe Locomotion**, integrando neumática, electrónica, firmware y software de alto nivel para ejecutar locomoción con seguridad, precisión y rapidez de iteración. El resultado consolidó tanto el enfoque de control como la infraestructura completa que hoy sirve de base para la investigación del laboratorio.

## Qué hace · Alcance integral del sistema
El proyecto cubre **todo el sistema de locomoción** a nivel de investigación.

**Neumática y arquitectura de potencia** (en conjunto con el laboratorio):
- Topología **biestable** con presión y vacío, bombas en paralelo y conmutación rápida.
- Manifold, derivaciones y esquema con **tanque BOOST** para impulsos de salto.
- Válvulas direccionales y lógica de distribución por cámaras (A/B).

**Electrónica y firmware:**
- ESP32 con **micro‑ROS** y comunicación **UART** hacia el agente.
- Sensor de presión vía **I2C** (ADS1115, 16‑bit) para lectura en kPa.
- Control PI dual (inflado / succión) y modos de operación extendidos.
- Seguridad activa: límites dinámicos, **E‑STOP**, venteo y reset de integradores.
- Telemetría en tiempo real para análisis y ajuste.

**Software de alto nivel y experimentación:**
- **SDK en Python (ROS 2)** para teleoperación y control de alto nivel.
- Scripts de locomoción (salto sincronizado, caminata alternada, giros y desatasque).
- **GUI de escritorio** para telemetría, depuración y registro.
- Conjunto de datos y registros experimentales para análisis científico.
- Procesamiento y visualización de resultados de control en **MATLAB**.

## Diferenciadores técnicos
El enfoque fue **hacer ciencia e ingeniería con repetibilidad**:
- De pruebas manuales aisladas a **experimentos controlados** y datos confiables.
- De control rígido a **ajuste dinámico en tiempo real**.
- De prototipos frágiles a un sistema **seguro y escalable** para investigación.

## Mi rol en el proyecto
Mi responsabilidad principal fue la capa de **electrónica–firmware–software**, es decir, todo lo que conecta el hardware neumático con la experimentación:
- Firmware en **ESP32 con micro‑ROS**: control PI dual de presión/vacío, sensado con **ADS1115 (I2C)** y comunicación **UART** hacia el agente ROS 2.
- Sistema de **seguridad funcional**: E‑STOP, límites dinámicos, venteo y reset de integradores.
- **SDK en Python (ROS 2)** y **GUI de escritorio** para teleoperación, telemetría y registro reproducible de experimentos.
- **Análisis de datos y gráficas de control en MATLAB** para validar el desempeño del lazo cerrado.
- Integración final del sistema completo hardware–firmware–software.

## Primera iteración (bases del proyecto)
La etapa inicial se desarrolló como parte de mi **servicio becario** en el laboratorio. Ahí me enfoqué en **sentar las bases** para experimentar con algoritmos de locomoción peristáltica en actuadores suaves tipo crawling, construyendo un entorno de pruebas estable para investigación.

El robot de esa fase utilizó un sistema electroneumático controlado por **Arduino Uno**, sensores de presión, electroválvulas y una bomba de aire, con comunicación hacia un servidor **MQTT**. Esta primera versión fue presentada en **"Exploring Soft Robotics: Student Research Forum"**, destacando su potencial en el campo de la robótica deformable en México.

## Reconocimientos y evidencias (con comprobantes)
- **Best Poster Award** – "Bidirectional Pressure–Vacuum Switching Control for Soft Pneumatic Actuators" (Exploring Soft Robotics, 3 dic 2025) — /assets/docs/best-poster-award-2025.pdf
- **Ponencia** – "Locomoción de un robot deformable tipo crawling" (Student Research Forum, 4 dic 2024) — /assets/docs/ponencia-locomocion-crawling-2024.pdf
- **Seminario** – Participación y presentación del proyecto "Locomotion for soft crawling robots" (Soft Robotics Seminar, feb–jun 2025) — /assets/docs/soft-robotics-seminar-2025.pdf
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
- Análisis de datos y visualización de resultados en MATLAB

## Resultado y estado
- Plataforma de experimentación **consolidada**: neumática biestable, firmware con micro‑ROS, SDK en Python y GUI, con control PI en lazo cerrado y seguridad activa.
- Sistema desarrollado con miras al reto **RoboSoft 2026 – inPipe Locomotion**, con tanque BOOST integrado para impulsos de salto.
- Infraestructura que quedó como **base de investigación** para nuevos algoritmos de locomoción dentro del Hybrid Soft Robotics Lab.
