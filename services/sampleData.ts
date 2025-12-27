import { Course } from "../types";

export const aiStudioCourse: Course = {
  id: "google-ai-studio-practical-v1",
  title: "Curso Práctico de Google AI Studio",
  description: "Domina la herramienta esencial para desarrolladores de IA: desde la gestión de API Keys hasta la ingeniería de prompts avanzada y multimodalidad con Gemini.",
  modules: [
    {
      title: "Introducción y Entorno",
      description: "Entiende qué es AI Studio, configura tu entorno y obtén tus credenciales de acceso.",
      lessons: [
        {
          title: "¿Qué es Google AI Studio?",
          duration: "10 min",
          video_url: "https://www.youtube.com/watch?v=QA_rw1r9qKk",
          content_html: `
            <h3>Una herramienta de prototipado rápido</h3>
            <p><strong>Google AI Studio</strong> es un entorno basado en web diseñado para que los desarrolladores prototipen rápidamente con los modelos de la familia Gemini. A diferencia de la interfaz de chat de Gemini (anteriormente Bard), que está pensada para el consumidor final, AI Studio ofrece control total sobre la configuración del modelo.</p>
            
            <h3>Diferencias Clave con Gemini Chat</h3>
            <ul>
                <li><strong>Control de Parámetros:</strong> Puedes ajustar la <em>temperatura</em>, <em>top-k</em> y otros parámetros de inferencia.</li>
                <li><strong>System Instructions:</strong> Permite definir instrucciones del sistema persistentes para guiar el comportamiento del modelo.</li>
                <li><strong>Exportación de Código:</strong> Convierte tus prompts probados directamente a código Python, JavaScript o cURL.</li>
            </ul>
          `,
          downloads: [
            { name: "Resumen_Intro_AI_Studio.pdf", url: "#" }
          ]
        },
        {
          title: "Tu Primer Proyecto y API Key",
          duration: "15 min",
          video_url: "https://www.youtube.com/watch?v=wXF_I_eF0p8",
          content_html: `
            <h3>Obteniendo acceso a la API</h3>
            <p>Para usar los modelos de Gemini fuera de la web, necesitas una API Key. Sigue estos pasos en AI Studio:</p>
            <ol>
                <li>Haz clic en el botón azul <strong>"Get API key"</strong> en la esquina superior izquierda.</li>
                <li>Selecciona <em>"Create API key in new project"</em> si es tu primera vez.</li>
                <li>Copia la clave generada (empieza por <code>AIza...</code>).</li>
            </ol>
            <p class="bg-yellow-50 p-4 border-l-4 border-yellow-500 text-yellow-700">
                <strong>Advertencia de Seguridad:</strong> Nunca compartas tu API Key en repositorios públicos de GitHub ni en el frontend de aplicaciones web. Úsala siempre desde un entorno seguro (backend) o variables de entorno.
            </p>
          `,
          downloads: []
        }
      ],
      evaluation: {
        questions: [
          {
            question: "¿Cuál es la principal diferencia entre AI Studio y Gemini Chat?",
            options: ["AI Studio es de pago", "AI Studio permite ajustar parámetros y exportar código", "Gemini Chat es más rápido", "No hay diferencia"],
            correctIndex: 1
          },
          {
            question: "¿Qué prefijo suelen tener las API Keys de Google GenAI?",
            options: ["sk-...", "ghp_...", "AIza...", "gcp-..."],
            correctIndex: 2
          },
          {
            question: "¿Dónde es seguro almacenar tu API Key?",
            options: ["En el código HTML", "En un repositorio público", "En variables de entorno (.env)", "En un post-it"],
            correctIndex: 2
          },
          {
            question: "¿Qué botón se usa para generar credenciales?",
            options: ["Create New Chat", "Get API key", "Settings", "Export"],
            correctIndex: 1
          },
          {
            question: "AI Studio está diseñado principalmente para...",
            options: ["Usuarios finales", "Desarrolladores y prototipado", "Diseñadores gráficos", "Administradores de sistemas"],
            correctIndex: 1
          }
        ]
      }
    },
    {
      title: "Ingeniería de Prompts Básica",
      description: "Aprende a comunicarte efectivamente con el modelo y ajustar su comportamiento.",
      lessons: [
        {
          title: "Estructura de un Prompt Efectivo",
          duration: "20 min",
          video_url: "https://www.youtube.com/watch?v=jC4v5AS4RIM",
          content_html: `
            <h3>Los 4 Pilares del Prompting</h3>
            <p>Un prompt bien estructurado en AI Studio suele contener:</p>
            <ul>
                <li><strong>Persona/Rol:</strong> ¿Quién es la IA? (Ej: "Eres un experto en SQL").</li>
                <li><strong>Contexto/Tarea:</strong> ¿Qué debe hacer? (Ej: "Explica este error...").</li>
                <li><strong>Restricciones:</strong> ¿Qué NO debe hacer? (Ej: "No uses jerga técnica").</li>
                <li><strong>Formato de Salida:</strong> ¿Cómo quieres la respuesta? (Ej: "En formato JSON").</li>
            </ul>
            <h3>Ejemplo en AI Studio</h3>
            <pre class="bg-gray-800 text-gray-100 p-4 rounded">
System Instruction: Actúa como un nutricionista deportivo.
User: Crea un plan de comidas de 2500 kcal.
Model: [Genera el plan siguiendo la instrucción]</pre>
          `,
          downloads: [
            { name: "Plantilla_Prompts.md", url: "#" }
          ]
        },
        {
          title: "Parámetros del Modelo: Temperatura y Top-K",
          duration: "12 min",
          video_url: "https://www.youtube.com/watch?v=5sfY6fPZjNw",
          content_html: `
            <h3>Temperatura (Temperature)</h3>
            <p>Controla la "aleatoriedad" de la respuesta. Rango: 0.0 a 1.0 (o 2.0).</p>
            <ul>
                <li><strong>Baja (0.0 - 0.3):</strong> Respuestas deterministas, lógicas y precisas. Ideal para código o matemáticas.</li>
                <li><strong>Alta (0.7 - 1.0):</strong> Respuestas creativas y variadas. Ideal para lluvia de ideas o poesía.</li>
            </ul>
            <h3>Top-K y Top-P</h3>
            <p>Estos parámetros filtran el conjunto de tokens candidatos que el modelo considera para la siguiente palabra, equilibrando la coherencia con la creatividad.</p>
          `,
          downloads: []
        },
        {
          title: "Estrategias: Zero-shot vs Few-shot",
          duration: "18 min",
          video_url: "https://www.youtube.com/watch?v=dOxURo9bb8Q",
          content_html: `
            <h3>Zero-shot (Sin ejemplos)</h3>
            <p>Le pides al modelo que realice una tarea sin darle ejemplos previos. Depende puramente de su entrenamiento base.</p>
            
            <h3>Few-shot (Con ejemplos)</h3>
            <p>En AI Studio, puedes usar el modo <strong>"Structured Prompt"</strong> o simplemente añadir ejemplos en el chat para guiar al modelo. Esto mejora drásticamente la precisión.</p>
            <p><strong>Ejemplo Few-shot para análisis de sentimiento:</strong></p>
            <ul>
                <li>Entrada: "Me encanta este producto" -> Salida: Positivo</li>
                <li>Entrada: "Llegó roto" -> Salida: Negativo</li>
                <li>Entrada: "Es normal" -> Salida: [El modelo completará "Neutro"]</li>
            </ul>
          `,
          downloads: []
        }
      ],
      evaluation: {
        questions: [
          {
            question: "¿Qué parámetro aumentarías para obtener respuestas más creativas?",
            options: ["Top-K a 0", "Temperatura", "Stop Sequence", "Max Tokens"],
            correctIndex: 1
          },
          {
            question: "¿Qué es 'Few-shot prompting'?",
            options: ["Disparar pocas veces", "Darle al modelo ejemplos de entrada/salida", "Usar prompts cortos", "No usar prompts"],
            correctIndex: 1
          },
          {
            question: "Si quiero que el modelo genere código SQL fiable, ¿qué temperatura uso?",
            options: ["1.0 (Alta)", "0.9", "0.1 (Baja)", "Aleatoria"],
            correctIndex: 2
          },
          {
            question: "¿Cuál NO es un pilar de un prompt efectivo?",
            options: ["Persona", "Contexto", "Insultos", "Formato de Salida"],
            correctIndex: 2
          },
          {
            question: "¿Qué hace la 'System Instruction'?",
            options: ["Apaga el sistema", "Define el comportamiento general y rol del modelo", "Borra la memoria", "Aumenta la velocidad"],
            correctIndex: 1
          }
        ]
      }
    },
    {
      title: "Funcionalidades Avanzadas",
      description: "Lleva tus prototipos al siguiente nivel con multimodalidad y exportación de código.",
      lessons: [
        {
          title: "Multimodalidad: Texto e Imágenes",
          duration: "15 min",
          video_url: "https://www.youtube.com/watch?v=bNk_WbV7e7g",
          content_html: `
            <h3>Gemini es Multimodal Nativo</h3>
            <p>A diferencia de modelos anteriores que 'pegaban' componentes visuales, Gemini fue entrenado con imágenes y texto simultáneamente.</p>
            <h3>Cómo usarlo en AI Studio</h3>
            <p>Simplemente arrastra una imagen al cuadro de prompt o haz clic en el icono <strong>"+"</strong>. Puedes preguntar cosas como:</p>
            <ul>
                <li>"¿Qué ingredientes ves en esta foto de comida?"</li>
                <li>"Transcribe el texto manuscrito de esta imagen."</li>
                <li>"Genera código HTML para replicar el diseño de esta captura de web."</li>
            </ul>
          `,
          downloads: [
            { name: "Imagenes_Prueba.zip", url: "#" }
          ]
        },
        {
          title: "Exportación a Código (Python/JS)",
          duration: "10 min",
          video_url: "https://www.youtube.com/watch?v=2tXq-e5VbQI",
          content_html: `
            <h3>De Prototipo a Producción</h3>
            <p>Una vez que tu prompt funciona perfectamente en AI Studio, no necesitas reescribirlo.</p>
            <ol>
                <li>Haz clic en el botón <strong>"<> Get Code"</strong> en la parte superior derecha.</li>
                <li>Selecciona tu lenguaje: <strong>Python</strong>, <strong>JavaScript</strong>, <strong>cURL</strong> o <strong>Swift</strong>.</li>
                <li>El código generado incluye la configuración del modelo, los parámetros de seguridad y tu prompt/historial completo.</li>
            </ol>
            <p><em>Tip: Recuerda configurar tu API Key como variable de entorno en tu proyecto real.</em></p>
          `,
          downloads: []
        }
      ],
      evaluation: {
        questions: [
          {
            question: "¿Qué significa que Gemini sea 'multimodal nativo'?",
            options: ["Que habla muchos idiomas", "Que fue entrenado con texto, imágenes y video desde el inicio", "Que tiene muchos modos de color", "Que usa múltiples servidores"],
            correctIndex: 1
          },
          {
            question: "¿Qué botón usas para llevar tu prompt a tu aplicación?",
            options: ["Save", "Get Code", "Share", "Run"],
            correctIndex: 1
          },
          {
            question: "¿Qué lenguajes de programación soporta la exportación directa?",
            options: ["Solo Python", "Solo Java", "Python, JavaScript, cURL, Swift, etc.", "Cobol"],
            correctIndex: 2
          },
          {
            question: "¿Puedes analizar video en AI Studio?",
            options: ["No, nunca", "Sí, con modelos Gemini 1.5 Pro/Flash", "Solo audio", "Solo texto"],
            correctIndex: 1
          },
          {
            question: "El código exportado incluye...",
            options: ["Tu API Key hardcodeada (mala práctica)", "La lógica para llamar a la API con tu configuración", "Un servidor completo", "Una base de datos"],
            correctIndex: 1
          }
        ]
      }
    }
  ],
  final_exam: {
    questions: [
      {
        question: "¿Cuál es el propósito principal de Google AI Studio?",
        options: ["Chatear con amigos", "Prototipar y experimentar con modelos Gemini para desarrollo", "Editar video profesional", "Crear hojas de cálculo"],
        correctIndex: 1
      },
      {
        question: "Para tareas que requieren alta precisión lógica (matemáticas), la temperatura debe ser...",
        options: ["Alta (cercana a 1)", "Baja (cercana a 0)", "Media (0.5)", "Es irrelevante"],
        correctIndex: 1
      },
      {
        question: "¿Qué técnica mejora la calidad de respuesta proporcionando ejemplos previos?",
        options: ["Zero-shot", "Few-shot prompting", "Temperature tuning", "Top-K filtering"],
        correctIndex: 1
      },
      {
        question: "¿Es seguro compartir tu API Key en el frontend de una web pública?",
        options: ["Sí, no pasa nada", "Sí, si es https", "No, cualquiera podría robarla y usar tu cuota", "Solo si es de Google"],
        correctIndex: 2
      },
      {
        question: "¿Qué modelo de Gemini es más adecuado para analizar imágenes complejas?",
        options: ["Gemini Nano", "Gemini Pro Vision / 1.5 Pro", "Gemini Ultra Text Only", "Gemma"],
        correctIndex: 1
      },
      {
        question: "¿Dónde se definen las instrucciones generales de comportamiento del modelo?",
        options: ["En el User Prompt", "En System Instructions", "En la configuración de seguridad", "En el nombre del proyecto"],
        correctIndex: 1
      },
      {
        question: "La opción 'Get Code' permite...",
        options: ["Descargar el modelo a tu PC", "Obtener un snippet de código listo para usar en tu app", "Comprar el código fuente de Google", "Hackear el sistema"],
        correctIndex: 1
      },
      {
        question: "¿Qué es un token?",
        options: ["Una moneda física", "La unidad básica de texto (parte de palabra) que procesa el modelo", "Un archivo de imagen", "Una clave de acceso"],
        correctIndex: 1
      },
      {
        question: "Si el modelo alucina (inventa datos), ¿qué puedes intentar?",
        options: ["Subir la temperatura", "Bajar la temperatura y usar few-shot prompting", "Gritarle al monitor", "Usar un modelo más antiguo"],
        correctIndex: 1
      },
      {
        question: "¿AI Studio permite guardar tus prompts?",
        options: ["No, se borran al cerrar", "Sí, se pueden guardar como proyectos", "Solo si pagas", "Sí, pero solo en local"],
        correctIndex: 1
      }
    ]
  }
};