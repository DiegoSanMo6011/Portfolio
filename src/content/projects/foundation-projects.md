---
title: "Fundamentos multidisciplinares (control, FPGA, IoT, videojuegos)"
description: "Selección de proyectos formativos que consolidaron mis bases en control, sistemas embebidos, FPGA, IoT y desarrollo de software." 
tags: ["Control", "FPGA", "IoT", "C++", "VHDL", "MATLAB", "Robótica móvil", "Game Dev"]
date: 2024-02-01
featured: false
status: "Proyectos académicos (primeros semestres)"
highlights:
  - "Control clásico aplicado con MATLAB y modelado de sistemas"
  - "Integración embebida con ESP32, Arduino y Raspberry Pi"
  - "Diseño digital en FPGA con VHDL"
  - "Desarrollo de software para simulación y aprendizaje"
---

## CareBot — robot dispensador de medicamentos con navegación óptima
Proyecto de la materia **Diseño de Sistemas Embebidos Avanzados**. Robot seguidor de línea para dispensar medicamentos en un entorno hospitalario simulado.

- **Algoritmo de ruta óptima:** Uniform Cost Search sobre grafo de habitaciones.
- **Traducción a instrucciones:** Left / Right / Straight / U‑turn en cada intersección.
- **Comunicación distribuida:** Raspberry Pi (MQTT) + Arduino Uno (serial).
- **Percepción:** OpenCV para procesamiento de cámara y flags de trayectoria.
- **Concurrencia:** hilos para servidor, cliente y control del robot.

**Video:** [Ver demo](https://youtu.be/_me0wyXkbpM)
**Stack:** MQTT, Arduino Uno, Raspberry Pi, OpenCV, Python, C++

## BudgetManipulator MOD — Cities: Skylines
Proyecto de servicio becario con el equipo de **City Skylines Modding** (Tec de Monterrey). Desarrollo de MODs educativos para urbanismo y sostenibilidad.

- **BudgetManipulator:** control en tiempo real de parámetros económicos y temporales.
- **Objetivo educativo:** experimentación y aprendizaje de gestión presupuestaria urbana.
- **Contribución adicional:** mapa con simulación de Querétaro.

**Video:** [Ver demo](https://youtu.be/-cuLjeoMJlw)
**Repositorio adicional:** [Historic Buildings Mod](https://github.com/DiegoSanMo6011/Historic-Buildings)
**Stack:** C#, Game Modding, Unity/Cities: Skylines, Game Design, UX

## Control PID de temperatura para deshidratador
Proyecto de la materia **Control y Automatización**. Regulación térmica entre 50°C y 70°C para deshidratación de jitomates.

- **Modelado:** función de transferencia con apoyo de **MATLAB** y análisis térmico.
- **Sintonía:** reglas de Ziegler‑Nichols para controlador PI.
- **Implementación:** estabilidad térmica en lazo cerrado.

**Stack:** MATLAB, Control Systems, Sensórica, Modelado
## Administrador del componente AES en FPGA (DE10‑Lite)
Proyecto de cifrado **AES** en FPGA. Coordinación de integración de módulos y diseño de la máquina de estados.

- **Rol:** integración del componente de cifrado y revisión técnica con el equipo.
- **Tecnología:** VHDL, diseño digital y verificación por etapas.
- **Resultado:** módulo de cifrado funcional integrado al sistema global.

**Repositorio:** [Ver repositorio AES](https://github.com/TE2003B-601-AES)
**Stack:** VHDL, FPGA, Digital Design, FSM
## Gnoberto — monitoreo IoT de plantas
Sistema IoT con **ESP32** para monitoreo ambiental con interfaz web y alertas.

- **Sensado:** temperatura y humedad en tiempo real.
- **Interfaz:** panel web con estado y alertas visuales.
- **Enfoque:** IoT educativo con diseño lúdico.

**Repositorio:** [Ver repositorio Gnoberto](https://github.com/DiegoSanMo6011/Gnoberto-Project)
**Stack:** ESP32, IoT, Web, Sensores
