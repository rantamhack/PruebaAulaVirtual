const form = document.querySelector("#learning-form");
const previewTitle = document.querySelector(".preview-top h3");
const previewDuration = document.querySelector(".preview-top span");
const previewIntro = document.querySelector(".preview-intro");
const previewFoot = document.querySelector(".preview-foot");
const timelineItems = document.querySelectorAll(".timeline article");
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

const examples = {
  "text-quiz": [
    ["Paso 1 · Lectura esencial", "Una explicación breve con conceptos base y ejemplos aplicados al objetivo."],
    ["Paso 2 · Cuestionario de comprensión", "Preguntas cortas para detectar lagunas antes de avanzar."],
    ["Paso 3 · Síntesis práctica", "Un pequeño ejercicio escrito para convertir la teoría en una primera aplicación útil."]
  ],
  video: [
    ["Paso 1 · Vídeo introductorio", "Una pieza breve para construir contexto sin saturar de información."],
    ["Paso 2 · Demostración guiada", "Un recurso visual centrado en el caso de uso que quieres resolver."],
    ["Paso 3 · Pausa de aplicación", "Una tarea concreta para comprobar que puedes replicar lo aprendido con cierta autonomía."]
  ],
  hybrid: [
    ["Paso 1 · Base conceptual", "Texto claro para fijar ideas y preparar el terreno antes de practicar."],
    ["Paso 2 · Recursos combinados", "Vídeo, lectura y preguntas para abordar el tema desde más de un ángulo."],
    ["Paso 3 · Proyecto integrador", "Una actividad final para conectar el conocimiento con una necesidad real de forma progresiva."]
  ]
};

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";

  themeToggle?.setAttribute("aria-pressed", String(isDark));
  if (themeLabel) {
    themeLabel.textContent = isDark ? "Oscuro" : "Claro";
  }
}

function getStoredTheme() {
  return localStorage.getItem("aula-theme");
}

applyTheme(getStoredTheme() || (systemTheme.matches ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("aula-theme", nextTheme);
  applyTheme(nextTheme);
});

systemTheme.addEventListener("change", (event) => {
  if (!getStoredTheme()) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

function summarizeTopic(topic) {
  const cleanTopic = topic.trim().replace(/\s+/g, " ");

  if (!cleanTopic) {
    return "Itinerario personalizado";
  }

  return cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1, 58);
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const topic = data.get("topic")?.toString() ?? "";
  const format = data.get("format")?.toString() ?? "text-quiz";
  const availability = data.get("availability")?.toString() ?? "4 horas por semana";
  const level = data.get("level")?.toString() ?? "Estoy empezando";
  const modules = examples[format] ?? examples["text-quiz"];

  previewTitle.textContent = summarizeTopic(topic);
  previewDuration.textContent = availability;
  if (previewIntro) {
    previewIntro.textContent = `Ejemplo orientativo de una primera propuesta para alguien que ${level.toLowerCase()} y quiere avanzar con un formato ${format === "video" ? "visual" : format === "hybrid" ? "mixto" : "centrado en texto y comprobación"}.`;
  }
  if (previewFoot) {
    const badges = previewFoot.querySelectorAll("span");
    if (badges[0]) {
      badges[0].textContent = "Propuesta inicial editable";
    }
    if (badges[1]) {
      badges[1].textContent = format === "hybrid"
        ? "Combina explicación, recursos y práctica"
        : format === "video"
          ? "Pensado para aprender con demostraciones"
          : "Pensado para ordenar ideas y comprobar comprensión";
    }
  }

  timelineItems.forEach((item, index) => {
    const heading = item.querySelector("h4");
    const text = item.querySelector("p");

    if (heading && text && modules[index]) {
      heading.textContent = modules[index][0];
      text.textContent = modules[index][1];
    }
  });

  document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
