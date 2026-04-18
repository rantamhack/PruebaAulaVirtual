# ProfesorIA - Aula Virtual Inteligente

Aplicación web que genera minicursos personalizados con Google Gemini a partir de la información que introduce el usuario.

El usuario indica qué quiere aprender, su nivel, su objetivo y el tiempo disponible, y la app genera una estructura de curso con módulos, lecciones y evaluación.

---

## Estado actual del proyecto

Esta aplicación funciona en modo cliente-side y **no incluye ninguna API key por defecto**.

Cada usuario debe introducir su **propia Gemini API Key** para usar la generación con IA.

---

## Características principales

- Generación de minicursos personalizados
- Ajuste por nivel y tiempo disponible
- Interfaz web sencilla con React + Vite
- Uso de Google Gemini con la API key proporcionada por el usuario
- Demo local rápida para prototipado y pruebas

---

## Requisitos previos

Necesitas:

1. **Node.js**
2. Una **Gemini API Key personal**, que puedes obtener en:

```text
https://www.aistudio.google.com/api-keys