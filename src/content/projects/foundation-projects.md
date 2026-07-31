---
title: "Fundamentos multidisciplinares (control, FPGA, IoT, robótica y simulación)"
description: "Colección de proyectos formativos que consolidaron mis bases en control, sistemas embebidos, FPGA, IoT, robótica móvil y simulación durante la carrera."
tags: ["Control", "FPGA", "IoT", "C++", "VHDL", "MATLAB", "Robótica móvil", "Game Dev"]
date: 2024-02-01
featured: false
videoUrl: "https://youtu.be/_me0wyXkbpM"
videoUrl2: "https://youtu.be/-cuLjeoMJlw"
status: "Proyectos académicos formativos"
highlights:
  - "Control clásico: modelado en MATLAB y sintonía PID"
  - "Sistemas embebidos con ESP32, Arduino y Raspberry Pi"
  - "Diseño digital en FPGA con VHDL (cifrado AES)"
  - "Amplitud: robótica móvil, IoT y simulación/modding"
---

## Contexto
Antes de Autónoma y de los proyectos de robótica avanzada, esta colección reúne los trabajos formativos que construyeron mis bases técnicas durante la carrera de **Ingeniería en Robótica y Sistemas Digitales** (Tec de Monterrey). Cada uno abordó un dominio distinto —control, hardware digital, IoT, robótica móvil y simulación— y en conjunto formaron el criterio con el que hoy diseño sistemas más complejos. Son los fundamentos que construyeron la base.

## Qué hace / Alcance técnico
Proyectos agrupados por área para mostrar la amplitud del recorrido:

**Robótica y sistemas embebidos**
- **CareBot** — Robot seguidor de línea que dispensa medicamentos en un hospital simulado (materia *Diseño de Sistemas Embebidos Avanzados*). Ruta óptima con Uniform Cost Search, percepción con OpenCV y comunicación distribuida MQTT (Raspberry Pi) + serial (Arduino Uno). [Ver demo](https://youtu.be/_me0wyXkbpM)

**Control y automatización**
- **Deshidratador con control PID** — Regulación térmica de 50 °C a 70 °C para deshidratar jitomate (materia *Control y Automatización*). Modelado de la función de transferencia en MATLAB y sintonía por Ziegler‑Nichols para un controlador PI en lazo cerrado.

**Hardware digital / FPGA**
- **Cifrado AES en FPGA (DE10‑Lite)** — Integración del componente de cifrado y diseño de la máquina de estados en VHDL, con verificación por etapas hasta obtener un módulo funcional integrado al sistema global. [Ver repositorio](https://github.com/TE2003B-601-AES)

**IoT**
- **Gnoberto** — Monitoreo ambiental de plantas con ESP32: sensado de temperatura y humedad en tiempo real, panel web y alertas visuales, con un enfoque educativo y lúdico. [Ver repositorio](https://github.com/DiegoSanMo6011/Gnoberto-Project)

**Simulación y modding**
- **BudgetManipulator (Cities: Skylines)** — Servicio becario con el equipo de *City Skylines Modding* del Tec. Mods educativos en C# para urbanismo y sostenibilidad, con control en tiempo real de parámetros económicos y un mapa con simulación de Querétaro. [Ver demo](https://youtu.be/-cuLjeoMJlw) · [Historic Buildings Mod](https://github.com/DiegoSanMo6011/Historic-Buildings)

## Rol de Diego
Participé en cada proyecto según el reto planteado: desarrollo de firmware, algoritmos de ruta y concurrencia en CareBot; modelado y sintonía del controlador en el deshidratador; integración del componente de cifrado y revisión técnica con el equipo en el AES sobre FPGA; y desarrollo de extremo a extremo de la solución IoT y de los mods de simulación. En los trabajos en equipo asumí la coordinación de integración y las pruebas de validación.

## Resultado / Estado
Todos son proyectos académicos **completados** durante los primeros años de la carrera. Más que entregables finales, representan los fundamentos multidisciplinares —control, hardware, software y sistemas embebidos— sobre los que después desarrollé proyectos como el PuzzleBot, el robot gusano y, finalmente, Autónoma.

## Evidencias
<div class="flex flex-wrap gap-3">
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition" href="https://youtu.be/_me0wyXkbpM" target="_blank" rel="noopener noreferrer">Demo CareBot</a>
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition" href="https://youtu.be/-cuLjeoMJlw" target="_blank" rel="noopener noreferrer">Demo Cities: Skylines</a>
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition" href="https://github.com/TE2003B-601-AES" target="_blank" rel="noopener noreferrer">Repositorio AES en FPGA</a>
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition" href="https://github.com/DiegoSanMo6011/Gnoberto-Project" target="_blank" rel="noopener noreferrer">Repositorio Gnoberto</a>
  <a class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:border-cyan-400 transition" href="https://github.com/DiegoSanMo6011/Historic-Buildings" target="_blank" rel="noopener noreferrer">Historic Buildings Mod</a>
</div>
