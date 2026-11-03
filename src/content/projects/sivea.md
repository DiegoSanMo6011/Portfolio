---
title: "SIVEA · Entrega segura de alumnos (prototipo)"
description: "Prototipo de entrega de alumnos con una credencial rotativa firmada con Ed25519 en el teléfono del adulto autorizado, validada en la reja, con app móvil y modelo de amenazas. Diseñado para un dominio sensible: menores."
tags: ["Ed25519", "Criptografía", "React Native", "Expo", "Next.js", "TypeScript", "PostgreSQL", "Pruebas de propiedades"]
date: 2026-09-29
featured: true
priority: 3
status: "Prototipo"
highlights:
  - "Diseñé una credencial rotativa con Ed25519 cuya llave secreta nunca sale del teléfono."
  - "Probé la lógica de la credencial con pruebas de propiedades y el flujo de la reja con escenarios en español que sirven de prueba y de guion."
  - "Documenté 13 decisiones de arquitectura y un modelo de amenazas."
  - "Privacidad de menores como requisito desde el primer commit: solo datos sintéticos en código, pruebas y capturas."
  - "Autor único: protocolo, app móvil, servidor, pruebas y documentación."
---

## Contexto

A la salida de clases, el personal tiene que saber quién viene por quién y entregar al niño **solo a un adulto autorizado**, hoy a ojo y de memoria. **SIVEA** es el prototipo que diseñé para resolverlo con criptografía aplicada, en un dominio donde la privacidad no es negociable: datos de menores. Es un **prototipo funcional**; no está en producción.

## El diseño

1. El adulto autorizado lleva en su teléfono una app con un **QR rotativo firmado criptográficamente**.
2. En la reja se escanea; el servidor lo verifica y vocea los apellidos de la familia.
3. En la puerta, la maestra vuelve a escanear, ve la foto del adulto y registra la entrega.
4. Control escolar aprueba a los adultos autorizados.

## Ingeniería destacada

- **Protocolo de credencial con Ed25519**: el teléfono genera su par de llaves y la secreta **nunca sale del dispositivo**. Cada ventana de 60 s firma tipo, credencial y ventana en un QR compacto, con verificación estricta, rechazo de llaves de orden pequeño, separación de dominio y prueba de posesión al vincular. **Un modo sin conexión nunca autoriza una entrega.**
- **Reglas de negocio como restricciones de base**: un solo uso por etapa y día, una credencial nunca se reasigna y un solo teléfono activo por adulto, probado en un laboratorio SQL dentro de transacciones que se revierten.
- **Privacidad de menores**: solo datos sintéticos, la voz se genera localmente para no mandar nombres a servicios externos y las vistas de la reja no exponen identificadores internos.
- **Pruebas**: de propiedades (fast-check) sobre firma, caducidad y alteraciones, y escenarios en español (Gherkin) que son prueba automática y guion de prueba humana a la vez.
- **Desarrollo asistido por IA con barreras**: un hook impide cerrar un turno con tipos o pruebas en rojo, y hay subagentes dedicados a QA y a revisión de seguridad y privacidad.

## Qué demuestra

Criptografía aplicada con criterio (un protocolo propio sobre primitivas probadas, con modelo de amenazas explícito), diseño para un dominio sensible con privacidad desde el inicio, e ingeniería full-stack que incluye una app móvil nativa.
