---
title: "Robot Peristáltico de Inspección"
description: "Diseño y control de un robot de robótica suave inspirado en lombrices para inspección de tuberías de diámetro variable."
tags: ["Soft Robotics", "Python", "Control Neumático", "Arduino"]
date: 2024-01-15
featured: true
githubUrl: "https://github.com/DiegoSanMo6011"
pdfUrl: "/assets/docs/reporte-gusano.pdf"
---

## 1. El Problema
Las tuberías industriales de diámetro variable presentan un reto para los robots de inspección tradicionales (ruedas u orugas), ya que pierden tracción o se atascan en codos estrechos. La inspección manual es costosa y peligrosa.

## 2. La Solución Propuesta
Desarrollé un **robot de locomoción peristáltica** (basado en ondas de compresión/expansión, como una lombriz). El sistema utiliza actuadores neumáticos blandos fabricados en silicona Ecoflex 00-30, permitiendo que el robot se "deforme" para adaptarse a diámetros de entre 10cm y 15cm.

## 3. El Desafío Técnico (El "Coco")
El mayor reto fue el **control de la secuencia neumática en lazo abierto**.
Los actuadores blandos tienen un comportamiento no lineal. Para solucionarlo:
1. Diseñé un sistema de válvulas solenoides controladas por un **Arduino Mega**.
2. Implementé una máquina de estados finitos para coordinar los tiempos de inflado (T_inflate) y desinflado (T_exhaust).
3. Realicé pruebas de fatiga para determinar la presión óptima (15 PSI) sin romper la silicona.

## 4. Arquitectura del Sistema
* **Cerebro:** Arduino Mega 2560
* **Actuadores:** Músculos neumáticos de Mckibben caseros.
* **Sensores:** IMU MPU6050 para detectar la orientación en la tubería.

> **Nota:** Este proyecto fue presentado en el congreso de mecatrónica del 2024.