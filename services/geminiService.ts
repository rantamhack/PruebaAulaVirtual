import { Course, UserPreferences } from "../types";

// --- 1. VALIDACIÓN DE LA CLAVE (PROPORCIONADA POR EL USUARIO) ---
const getApiKey = (rawKey: string): string => {
  const key = rawKey.trim();

  if (!key) {
    throw new Error("No se ha proporcionado una API Key de Gemini.");
  }

  return key;
};

// --- 2. ESQUEMA DE REFERENCIA DE VÍDEO SEGURA ---
const videoReferenceSchema = {
  type: "OBJECT",
  properties: {
    platform: { type: "STRING" },
    search_query: { type: "STRING" },
    rationale: { type: "STRING" },
    relevance_score: { type: "INTEGER" },
    confidence_score: { type: "INTEGER" }
  },
  required: ["platform", "search_query", "rationale", "relevance_score", "confidence_score"]
};

// --- 3. ESQUEMA DEL CURSO ---
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
                duration: { type: "STRING" },
                video_url: { type: "STRING" },
                video_reference: videoReferenceSchema,
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
              required: ["title", "duration", "video_url", "content_html", "downloads"]
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

// --- 4. PROMPT MEJORADO ---
export function generarPromptCurso(prefs: UserPreferences): string {
  const { topic, level, profile, objective, timeAvailable, format } = prefs;

  return `
Eres un diseñador instruccional y profesor experto nativo en ESPAÑOL.

Tu tarea es generar un curso COMPLETO, útil y bien estructurado en JSON válido sobre este tema:

TEMA: ${topic}
NIVEL DEL USUARIO: ${level}
PERFIL DEL USUARIO: ${profile || "No especificado"}
OBJETIVO PRINCIPAL: ${objective || "No especificado"}
TIEMPO DISPONIBLE: ${timeAvailable}
FORMATO PREFERIDO: ${format}

REGLAS GENERALES:
1. Devuelve SOLO JSON válido.
2. No incluyas markdown, comentarios, texto explicativo ni bloques de código.
3. TODO debe estar en ESPAÑOL.
4. El curso debe ser concreto, accionable y claramente adaptado al nivel, perfil y objetivo del usuario.
5. Evita contenido superficial, genérico o de relleno.
6. Es preferible generar menos lecciones pero mejores, más útiles y más consistentes.
7. El curso debe parecer una propuesta seria y utilizable por una persona real.

ESTRUCTURA DEL CURSO:
1. Genera 3 módulos por defecto.
2. Solo genera 4 módulos si el tema es amplio y el tiempo disponible lo justifica claramente.
3. Cada módulo debe tener entre 2 y 3 lessons.
4. Cada módulo debe incluir una descripción clara de su propósito y relación con el objetivo del usuario.
5. Cada evaluación de módulo debe tener EXACTAMENTE 5 preguntas.
6. El examen final debe tener EXACTAMENTE 10 preguntas.

REGLAS DE CALIDAD PARA LAS LECCIONES:
1. Cada lesson debe aportar valor real.
2. Cada lesson.content_html debe ser HTML válido, no markdown.
3. Cada lesson.content_html debe incluir como mínimo:
   - 1 subtítulo HTML (<h4>)
   - entre 5 y 7 párrafos <p> bien desarrollados
   - al menos 1 lista <ul> o <ol>
   - al menos 1 ejemplo práctico o caso aplicado
   - al menos 1 mini ejercicio o recomendación final
4. El contenido no debe quedarse en 6 o 7 líneas.
5. Cada lesson debe intentar situarse normalmente entre 400 y 700 palabras.
6. En lecciones clave o temas complejos, puede llegar a 700-1000 palabras si realmente está justificado.
7. No escribas mucho por escribir: más importante que la cantidad es que el contenido sea claro, útil y bien explicado.
8. El contenido debe enseñar de verdad el tema, no solo describirlo superficialmente.
9. Ajusta el tono, dificultad y ejemplos al nivel del usuario.
10. Conecta cada lesson con el objetivo principal del usuario cuando sea posible.
11. Evita grandes muros de texto: usa subtítulos, párrafos razonables y listas para mejorar legibilidad.

REGLAS PARA LOS TÍTULOS Y DESCRIPCIONES:
1. El título del curso debe ser específico, profesional y útil.
2. La descripción del curso debe explicar qué aprenderá el usuario y para qué le servirá.
3. Los títulos de módulos y lessons deben ser concretos, no vagos ni repetitivos.
4. Evita títulos genéricos como "Introducción", "Tema general", "Conceptos básicos" si puedes hacerlos más precisos.

REGLAS SOBRE EL FORMATO PREFERIDO:
1. Si el formato preferido es "${format}", adapta la propuesta a ese formato.
2. Si el formato es de texto, prioriza claridad escrita, ejercicios y comprobación.
3. Si el formato es vídeo + texto, incluye referencias audiovisuales útiles cuando tenga sentido.
4. Si el formato es híbrido, combina explicación escrita sólida con referencias audiovisuales relevantes.
5. Aunque haya componente audiovisual, SIEMPRE debe haber content_html valioso y suficiente.

REGLAS SOBRE REFERENCIAS DE VÍDEO:
1. NO inventes enlaces directos a vídeos concretos.
2. NO inventes IDs de YouTube ni URLs específicas de vídeos.
3. Si una lesson se beneficia de una referencia audiovisual, genera video_reference con:
   - platform
   - search_query
   - rationale
   - relevance_score
   - confidence_score
4. La search_query debe ser muy específica, estar en español y centrada en la lesson.
5. Evita búsquedas ambiguas o que puedan desviar a temas incorrectos.
6. Si el tema es histórico, científico o técnico, evita mezclar resultados irrelevantes de música, entretenimiento o cultura pop salvo que el objetivo lo requiera.
7. Si no puedes proponer una referencia razonablemente buena, deja video_url como "" y omite video_reference.
8. video_url debe devolverse SIEMPRE como cadena vacía "". La aplicación generará después un enlace externo de búsqueda seguro a partir de video_reference.search_query.
9. relevance_score y confidence_score deben ser enteros entre 0 y 10.
10. Es preferible no sugerir vídeo antes que sugerir uno dudoso o poco relacionado.

REGLAS SOBRE DOWNLOADS:
1. Si no aplica, usa [].
2. No inventes URLs falsas.
3. Solo incluye recursos descargables si tienen sentido claro en la lesson.

REGLAS SOBRE EVALUACIÓN:
1. Las preguntas deben comprobar comprensión real.
2. Cada pregunta debe tener exactamente 4 opciones.
3. Solo una opción correcta.
4. correctIndex debe ser coherente.
5. Evita preguntas triviales, absurdas o ambiguas.

CRITERIOS FINALES:
1. El curso debe avanzar de lo básico a lo aplicado.
2. Debe estar alineado con el objetivo principal del usuario.
3. Debe evitar repeticiones y relleno.
4. Debe ser suficientemente bueno como para que un usuario quiera seguir usando la app.

Genera ahora el JSON completo.
`;
}

// --- 5. CONSTRUCCIÓN SEGURA DE ENLACES EXTERNOS DE VÍDEO ---
function buildExternalVideoSearchUrl(searchQuery: string, platform: string = "YouTube"): string {
  const cleanQuery = searchQuery.trim();
  if (!cleanQuery) return "";

  const encoded = encodeURIComponent(cleanQuery);
  const normalizedPlatform = platform.toLowerCase();

  if (normalizedPlatform.includes("youtube")) {
    return `https://www.youtube.com/results?search_query=${encoded}`;
  }

  if (normalizedPlatform.includes("vimeo")) {
    return `https://vimeo.com/search?q=${encoded}`;
  }

  return `https://www.youtube.com/results?search_query=${encoded}`;
}

// --- 6. POSTPROCESADO DEL CURSO PARA GENERAR ENLACES EXTERNOS SEGUROS ---
function enrichCourseWithSafeVideoLinks(course: Course): Course {
  return {
    ...course,
    modules: course.modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => {
        const searchQuery = lesson.video_reference?.search_query?.trim() ?? "";
        const platform = lesson.video_reference?.platform ?? "YouTube";

        return {
          ...lesson,
          video_url: searchQuery ? buildExternalVideoSearchUrl(searchQuery, platform) : ""
        };
      })
    }))
  };
}

// --- 7. FUNCIÓN PRINCIPAL (USA LA KEY DEL USUARIO) ---
export async function generateCourse(
  prefs: UserPreferences,
  userApiKey: string
): Promise<Course | null> {
  const apiKey = getApiKey(userApiKey);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

  const prompt = generarPromptCurso(prefs);

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

    const parsedCourse = JSON.parse(jsonText) as Course;
    return enrichCourseWithSafeVideoLinks(parsedCourse);
  } catch (error) {
    console.error("❌ Fallo crítico:", error);
    throw error;
  }
}