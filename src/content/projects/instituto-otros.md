---
title: "Más ingeniería en el Instituto: auditoría, QA, legal y estrategia"
description: "Además de los tres sistemas propios, estos meses incluyeron una auditoría y pruebas de aceptación a un proveedor externo, un diseño jurídico-técnico de firma electrónica, la propuesta de política de IA del colegio, respuesta a un incidente de seguridad y la puesta en marcha de una CNC."
tags: ["Playwright", "QA", "Seguridad", "Legal-Tech", "Estrategia de IA", "CNC"]
date: 2026-08-01
featured: false
priority: 8
status: "Ingeniería, calidad, legal y estrategia"
highlights:
  - "Auditoría de caja negra y pruebas de aceptación a un portal de un proveedor externo: 48 hallazgos consolidados en 8 causas raíz, con un arnés que inyecta fallos de red."
  - "Diseño jurídico-técnico de firma electrónica a distancia del reglamento escolar, con 56 citas legales cotejadas una por una."
  - "Propuesta de política de IA del colegio tras el Laboratorio de Google for Education, con Gems y capacitación al personal."
  - "Respuesta documentada a un incidente de seguridad web, con bitácora, revisión de integridad y un curso interno."
---

## Por qué está aquí

El puesto empezó con una lista de encargos sin prioridad ni fechas; yo definí el orden, el alcance y el método. Además de SATAG, SEVAD y SIVEA, estos son los trabajos de ingeniería, calidad, legal y estrategia de los mismos meses. Varios no son sistemas propios, así que aquí se describen sin nombrar a terceros ni publicar sus datos.

## Auditoría y pruebas de aceptación de un portal externo

Revisión de **caja negra** no intrusiva más análisis de dependencias del portal que un proveedor construyó para el colegio. Consolidé unas 60 observaciones en **48 hallazgos agrupados en 8 causas raíz**, con reporte ejecutivo y de detalle. Para las pruebas de aceptación armé un **arnés de Playwright** (unos 30 scripts) que intercepta la red para inyectar fallos, con un perímetro ético explícito: solo datos inventados y aviso previo al proveedor. También analicé una caída en su salida a producción con un monitor por minuto. La receta de capacidad y carga que salió de ahí la reutilicé después en mis propios sistemas.

## FIRMAS · diseño jurídico-técnico de firma electrónica

Diseño de un sistema de **firma electrónica a distancia** del reglamento escolar: firma de ambos tutores, 12 elementos de evidencia por firmante, conservación conforme a la NOM-151 y el trazo de la firma tratado como dato biométrico. Fundamentado en el Código Civil local, el Código de Comercio, la LFPDPPP y jurisprudencia de la Suprema Corte, con **56 citas cotejadas una por una** contra las fuentes oficiales.

## NUBE · política de IA del colegio

Propuesta de **política de IA y ruta de implementación** para la dirección: diagnóstico con la rúbrica de Google, ruta por etapas, semáforo de uso para alumnos y el texto de la política. Diseñé Gems de Gemini con instrucciones y pruebas, y di una capacitación al personal administrativo. Participé en el Laboratorio de Políticas de IA de Google for Education.

## SIRVE · aviso de resultados por correo (demo)

Asistente de cuatro pasos que convierte la hoja de un entrenador en correos personalizados para las familias, con **tres proveedores de envío intercambiables** detrás de un mismo contrato y salvaguardas: correo de prueba antes de enviar y modo demo por omisión que no envía nada. Demo hecha en un día.

## Seguridad y hardware

Respondí a un **incidente de seguridad web** desde el departamento de sistemas, con bitácora con fecha y hora, reporte técnico, una revisión de integridad que no halló indicios de compromiso y un **curso interno de seis lecciones** sobre cómo viaja una petición y dónde se defiende. Y puse en marcha una **CNC** guardada por años: plan por fases, respaldo de la configuración, 11 "trampas" documentadas, G-code escrito a mano y reglas de seguridad para el láser.

## Credenciales recientes

Google AI for K12 Educators (21-oct-2026) y Google AI for Higher Education (3-nov-2026).
