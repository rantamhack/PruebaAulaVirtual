import { Course, UserPreferences } from "../types";

// --- 1. VALIDACIÓN DE LA CLAVE (PROPORCIONADA POR EL USUARIO) ---
const getApiKey = (rawKey: string): string => {
  const key = rawKey.trim();

  if (!key) {
    throw new Error("No se ha proporcionado una API Key de Gemini.");
  }

  return key;
};

// --- 2. EL ESQUEMA DEL CURSO (En formato JSON estándar) ---
const courseSchema = {
  type: "OBJECT",
  properties: {
    id: { type: "STRING" },
    title: { type: "STRING" },
    description: { type: "STRING" },
    modules: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          description: { type: "STRING" },
          lessons: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                video_url: { type: "STRING" },
                duration: { type: "STRING" },
                content_html: { type: "STRING" },
                downloads: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      name: { type: "STRING" },
                      url: { type: "STRING" }
                    },
                    required: ["name", "url"]
                  }
                }
              },
              required: ["title", "duration", "content_html", "downloads"]
            }
          },
          evaluation: {
            type: "OBJECT",
            properties: {
              questions: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    question: { type: "STRING" },
                    options: { type: "ARRAY", items: { type: "STRING" } },
                    correctIndex: { type: "INTEGER" }
                  },
                  required: ["question", "options", "correctIndex"]
                }
              }
            },
            required: ["questions"]
          }
        },
        required: ["title", "description", "lessons", "evaluation"]
      }
    },
    final_exam: {
      type: "OBJECT",
      properties: {
        questions: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              question: { type: "STRING" },
              options: { type: "ARRAY", items: { type: "STRING" } },
              correctIndex: { type: "INTEGER" }
            },
            required: ["question", "options", "correctIndex"]
          }
        }
      },
      required: ["questions"]
    }
  },
  required: ["id", "title", "description", "modules", "final_exam"]
};

// --- 3. PROMPT ---
export function generarPromptCurso(tema: string, nivel: string, tiempo: string): string {
  return `
  Actúa como un profesor experto nativo en ESPAÑOL. Genera un curso JSON sobre: "${tema}".
  Nivel: ${nivel}. Tiempo: ${tiempo}.
  
  REGLAS:
  1. TODO en ESPAÑOL.
  2. 'video_url' vacío ("").
  3. 'content_html' con contenido educativo rico en HTML.
  `;
}

// --- 4. FUNCIÓN PRINCIPAL (USA LA KEY DEL USUARIO) ---
export async function generateCourse(
  prefs: UserPreferences,
  userApiKey: string
): Promise<Course | null> {
  const apiKey = getApiKey(userApiKey);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

  const prompt = generarPromptCurso(prefs.topic, prefs.level, prefs.timeAvailable);

  console.log("📡 Conectando directamente a Gemini Flash Latest con la API Key proporcionada por el usuario...");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json",
          response_schema: courseSchema
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Error de Google:", errorData);
      throw new Error(`Error ${response.status}: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!jsonText) {
      throw new Error("JSON vacío");
    }

    return JSON.parse(jsonText) as Course;
  } catch (error) {
    console.error("❌ Fallo crítico:", error);
    throw error;
  }
}