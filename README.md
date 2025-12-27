# 🇬🇧 ProfessorAI - Your Smart Virtual Classroom

Welcome! This is a magical web application that uses Artificial Intelligence (Google Gemini) to create complete educational courses tailored to you.

You tell it what you want to learn (e.g., "Gardening", "Python", or "Japanese Cooking"), choose your level and available time, and the AI instantly creates a syllabus, detailed lessons, and even quizzes.

---

## 🚀 Key Features

* **On-Demand Courses:** Generates the course you want in seconds.
* **Adaptive:** Adjusts to whether you are a beginner or an expert.
* **Modern Tech:** Built with React, Vite, and Google AI.
* **Fully Local:** Runs securely in your browser.

---

## 🛠️ Prerequisites

Before you start, you need two things installed or ready on your computer:

1.  **Node.js**: The engine that runs the application.
    * Download and install it from the [official website](https://nodejs.org/) (LTS version recommended).
2.  **Google Gemini API Key**: The "key" to use the AI.
    * You can get one for free at [Google AI Studio](https://aistudio.google.com/).

---

## 📦 Step 1: Installation

If you already have the project folder on your computer:

1.  Open that folder with **Visual Studio Code**.
2.  Open a **New Terminal** (menu Terminal > New Terminal).
3.  Type the following command and press `Enter` to download the necessary "parts" (this might take a moment):

```npm install```

⚙️ Step 2: Configuration (Important!)

The application needs your secret Google key to work. For security, this key is not included; you must add your own.

Look for the file named .env.example in the file list.

Make a copy of that file and rename it to just .env (delete the ".example" part).

Open your new .env file, and you will see something like this:

Fragmento de código

VITE_API_KEY=put_your_api_key_here

Delete put_your_api_key_here and paste your real Google key (the one starting with AIzaSy...).

Save the file (Ctrl + S).

Security Note: The .env file is secret. Thanks to the .gitignore file, this file will never be uploaded to the Internet if you share the project. Your key is safe on your computer.

▶️ Step 3: Start the App!

Once installed and configured, it's time to use it.

In the terminal, type:

```npm run dev```

You will see a web address appear (usually http://localhost:5173 or http://localhost:3000).

Ctrl + Click on that link (or open it in your Chrome browser).

Done! Fill out the form and enjoy learning. 🧠✨

## 🌟 Acknowledgments

This project was inspired by the work and content shared by **Miguel Baena**. Thanks for the inspiration!

---

*Project created for educational purposes and powered by Google Gemini.*


==========================================================================================================


# 🎓 ProfesorIA - Tu Aula Virtual Inteligente

¡Bienvenido! Esta es una aplicación web mágica que utiliza Inteligencia Artificial (Google Gemini) para crear cursos educativos completos a tu medida.

Tú le dices qué quieres aprender (por ejemplo: "Jardinería", "Python" o "Cocina japonesa"), eliges tu nivel y el tiempo que tienes, y la IA te crea al instante un temario, lecciones detalladas e incluso exámenes tipo test.

---

## 🚀 Características Principales

* **Cursos a la carta:** Genera el curso que quieras en segundos.
* **Adaptable:** Se ajusta a si eres principiante o experto.
* **Tecnología Moderna:** Hecho con React, Vite y la IA de Google.
* **Totalmente Local:** Funciona en tu navegador de forma segura.

---

## 🛠️ Requisitos Previos

Antes de empezar, necesitas tener dos cosas instaladas o listas en tu ordenador:

1.  **Node.js**: Es el motor que hace funcionar la aplicación.
    * Descárgalo e instálalo desde su [web oficial](https://nodejs.org/) (se recomienda la versión "LTS").
2.  **API Key de Google Gemini**: Es la "llave" para usar la IA.
    * Puedes conseguir una gratis en [Google AI Studio](https://aistudio.google.com/).

---

## 📦 Paso 1: Instalación

Si ya tienes la carpeta del proyecto en tu ordenador:

1.  Abre esa carpeta con **Visual Studio Code**.
2.  Abre una **Nueva Terminal** (menú Terminal > New Terminal).
3.  Escribe el siguiente comando y pulsa `Enter` para descargar las "piezas" necesarias (esto puede tardar un poco):


```npm install```


⚙️ Paso 2: Configuración (¡Importante!)
La aplicación necesita tu clave secreta de Google para funcionar. Por seguridad, esta clave no viene incluida, tienes que poner la tuya.

Busca en la lista de archivos uno llamado .env.example.

Haz una copia de ese archivo y cámbiale el nombre para que se llame solo .env (borra el ".example").

Abre tu nuevo archivo .env y verás algo parecido a esto:

Fragmento de código

VITE_API_KEY=pon_aqui_tu_clave_api

Borra donde pone pon_aqui_tu_clave_api y pega ahí tu clave real de Google (la que empieza por AIzaSy...).

Guarda el archivo (Ctrl + S).


▶️ Paso 3: ¡Arrancar la aplicación!

Una vez instalado y configurado, es hora de usarla.

En la terminal, escribe:

```npm run dev```

Verás que aparece una dirección web (normalmente http://localhost:5173 o http://localhost:3000).

Haz Ctrl + Clic en ese enlace (o ábrelo en tu navegador Chrome).

¡Listo! Rellena el formulario y disfruta aprendiendo. 🧠✨

## 🌟 Agradecimientos

Este proyecto nace de la inspiración y el contenido divulgado por **Miguel Baena**. ¡Gracias por compartir el conocimiento!

---

*Proyecto creado con fines educativos y potenciado por Google Gemini.*