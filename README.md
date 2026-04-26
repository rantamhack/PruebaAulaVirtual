# Aula Virtual

Aula Virtual es una aplicación web que genera cursos personalizados con ayuda de IA a partir de un objetivo de aprendizaje, el nivel del usuario y el tiempo disponible.

La app crea una estructura formativa clara y usable, con módulos, lecciones, evaluaciones y acceso a recursos externos, dentro de una interfaz tipo aula virtual.

## Qué hace

- Genera un curso personalizado con IA
- Organiza el contenido en módulos y lecciones
- Muestra el curso en un aula virtual funcional
- Guarda progreso local del usuario
- Incluye pantalla de carga durante la generación
- Soporta modo claro y modo oscuro
- Usa la **API key del propio usuario** para conectar con Gemini

## Tecnologías usadas

- React
- TypeScript
- Vite
- Google Gemini API
- CSS personalizado
- Lucide React

## Requisitos

Antes de empezar, necesitas tener instalado:

- [Node.js](https://nodejs.org/) 18 o superior
- npm
- Una API key de Google AI Studio / Gemini

## Instalación

Clona o descarga el proyecto y entra en la carpeta:

```bash
cd aula_virtual
```

Instala las dependencias:

```bash
npm install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

despues abre el navegador en la URL que te indique Vite.

En este proyecto normalmente se ha usado:

http://localhost:3000

## Cómo usar la aplicación:

1. Abre la landing de Aula Virtual
2. Introduce tu API key
3. Escribe qué quieres aprender
4. Indica tu nivel actual
5. Escribe el tiempo disponible
6. Explica tu objetivo
7. Pulsa Generar curso

La app mostrará una pantalla de carga mientras prepara el curso y después abrirá el aula virtual generada.

## API key de Gemini

Esta aplicación no incluye una API key propia.

Cada usuario debe usar la suya.

Puedes conseguir una en Google AI Studio:

- Crear clave en Google AI Studio
- Copiarla
- Pegarla en el campo correspondiente del formulario

### Importante!!!

- No subas tu API key al repositorio
- No la compartas públicamente
- Trátala como un secreto

## Scripts disponibles:

```bash
mpm run dev
```
(Inicia la app en modo desarrollo)

```bash
npm run build
```
(Genera la versión del producto)

```bash
npm run preview
```
(Previsualiza la build de producción en local)

## Estructura básica del proyecto

```text
aula_virtual/
├── components/
│   ├── Classroom.tsx
│   ├── CourseForm.tsx
│   ├── LandingGeneratorCard.tsx
│   ├── LandingPage.tsx
│   ├── LandingThemeToggle.tsx
│   └── ThemeToggle.tsx
├── services/
│   ├── geminiService.ts
│   └── sampleData.ts
├── public/
│   └── assets/
│       └── robot-loading.mp4
├── App.tsx
├── index.tsx
├── types.ts
├── landing.css
├── index.html
├── package.json
└── README.md
```

## **Flujo general de la app**

Landing

El usuario introduce su contexto y solicita la generación del curso.

Pantalla de carga

Se muestra una pantalla intermedia mientras la IA prepara el contenido.

Aula virtual

El curso se presenta con navegación por módulos, lecciones y evaluaciones.

## Persistencia

La app guarda parte del progreso en localStorage, por ejemplo:

- progreso del curso
- respuestas de evaluaciones
- tema claro/oscuro

## Notas importantes

- El curso generado depende de la calidad del prompt y de la respuesta del modelo
- Los recursos audiovisuales pueden llevar a contenido externo
- La app está pensada como generador de una primera estructura formativa útil, no como plataforma cerrada de cursos comerciales

## Problemas habituales

1. La página se ve con colores raros

Si usas extensiones como Dark Reader, pueden alterar el diseño visual de la app.

Solución:

- desactivar Dark Reader para localhost
- o desactivar la extensión mientras pruebas la app

2. La generación falla

Comprueba:

- que la API key sea válida
- que tengas cuota disponible en Gemini
- que no hayas alcanzado límites temporales de uso

3. No arranca el proyecto

Comprueba:

- que has ejecutado npm install
- que usas una versión reciente de Node.js
- que estás dentro de la carpeta correcta del proyecto

## Estado del proyecto

El proyecto está orientado a:

- generar cursos personalizados con IA
- ofrecer una landing clara
- mostrar el contenido dentro de un aula virtual usable
- servir como base sólida para futuras mejoras

## Autoría:

Proyecto desarrollado como aplicación educativa experimental de generación de cursos con IA.