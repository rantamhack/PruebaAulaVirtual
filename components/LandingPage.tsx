import React, { useEffect, useMemo, useState } from 'react';
import { CourseFormat, CourseLevel, UserPreferences } from '../types';
import '../landing.css';

interface Props {
  onSubmit: (prefs: UserPreferences, apiKey: string) => void;
  onLoadDemo: () => void;
  isLoading: boolean;
  error?: string | null;
}

type ThemeMode = 'light' | 'dark';
type FormatMode = 'text-quiz' | 'video' | 'hybrid';

const examples: Record<FormatMode, [string, string][]> = {
  'text-quiz': [
    ['Paso 1 · Lectura esencial', 'Una explicación breve con conceptos base y ejemplos aplicados al objetivo.'],
    ['Paso 2 · Cuestionario de comprensión', 'Preguntas cortas para detectar lagunas antes de avanzar.'],
    ['Paso 3 · Síntesis práctica', 'Un pequeño ejercicio escrito para convertir la teoría en una primera aplicación útil.']
  ],
  video: [
    ['Paso 1 · Vídeo introductorio', 'Una pieza breve para construir contexto sin saturar de información.'],
    ['Paso 2 · Demostración guiada', 'Un recurso visual centrado en el caso de uso que quieres resolver.'],
    ['Paso 3 · Pausa de aplicación', 'Una tarea concreta para comprobar que puedes replicar lo aprendido con cierta autonomía.']
  ],
  hybrid: [
    ['Paso 1 · Base conceptual', 'Texto claro para fijar ideas y preparar el terreno antes de practicar.'],
    ['Paso 2 · Recursos combinados', 'Vídeo, lectura y preguntas para abordar el tema desde más de un ángulo.'],
    ['Paso 3 · Proyecto integrador', 'Una actividad final para conectar el conocimiento con una necesidad real de forma progresiva.']
  ]
};

function summarizeTopic(topic: string) {
  const cleanTopic = topic.trim().replace(/\s+/g, ' ');
  if (!cleanTopic) return 'Automatización con Python';
  return cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1, 58);
}

function mapLevel(level: string): CourseLevel {
  if (level === 'Tengo bases') return CourseLevel.INTERMEDIATE;
  if (level === 'Ya tengo experiencia') return CourseLevel.ADVANCED;
  return CourseLevel.BEGINNER;
}


const themeTokens: Record<ThemeMode, Record<string, string>> = {
  light: {
    '--bg': '#f7f4ee',
    '--surface': '#fffdf8',
    '--surface-rgb': '255, 253, 248',
    '--surface-soft': '#edf5ef',
    '--field': '#ffffff',
    '--ink': '#17211d',
    '--muted': '#5d6d66',
    '--line': '#dce4dd',
    '--primary': '#2d6a73',
    '--primary-dark': '#214f56',
    '--primary-contrast': '#ffffff',
    '--sage': '#8ead9a',
    '--sand': '#e8d7bd',
    '--blue-soft': '#dcecf2',
    '--header-bg': 'rgba(247, 244, 238, 0.78)',
    '--subtle-line': 'rgba(220, 228, 221, 0.72)',
    '--grid-line': 'rgba(23, 33, 29, 0.035)',
    '--focus': 'rgba(45, 106, 115, 0.28)',
    '--shadow': '0 24px 70px rgba(36, 56, 49, 0.12)',
    '--hero-blue': 'rgba(220, 236, 242, 0.8)',
    '--hero-sand': 'rgba(232, 215, 189, 0.55)',
    '--radius': '8px'
  },
  dark: {
    '--bg': '#13201d',
    '--surface': '#1c2926',
    '--surface-rgb': '28, 41, 38',
    '--surface-soft': '#223330',
    '--field': '#162320',
    '--ink': '#edf4ef',
    '--muted': '#becbc4',
    '--line': '#3c4f48',
    '--primary': '#8fc8c0',
    '--primary-dark': '#b9ddd7',
    '--primary-contrast': '#14211f',
    '--sage': '#9ab8a7',
    '--sand': '#cbb895',
    '--blue-soft': '#23353b',
    '--header-bg': 'rgba(19, 32, 29, 0.76)',
    '--subtle-line': 'rgba(101, 123, 113, 0.34)',
    '--grid-line': 'rgba(237, 244, 239, 0.035)',
    '--focus': 'rgba(143, 200, 192, 0.34)',
    '--shadow': '0 18px 48px rgba(5, 11, 10, 0.2)',
    '--hero-blue': 'rgba(62, 97, 104, 0.28)',
    '--hero-sand': 'rgba(128, 110, 79, 0.16)',
    '--radius': '8px'
  }
};

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('aula-theme', theme);
  localStorage.setItem('theme', theme);

  const tokens = themeTokens[theme];
  Object.entries(tokens).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

const readTheme = (): ThemeMode =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

const LandingPage: React.FC<Props> = ({ onSubmit, onLoadDemo, isLoading, error }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  const [apiKey, setApiKey] = useState('');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Estoy empezando');
  const [availability, setAvailability] = useState('4 horas por semana');
  const [objective, setObjective] = useState('');
  const format: FormatMode = 'hybrid';

  useEffect(() => {
    const storedTheme = localStorage.getItem('aula-theme') as ThemeMode | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme: ThemeMode = storedTheme || (systemPrefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);
    setTheme(readTheme());

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemTheme = (event: MediaQueryListEvent) => {
      const stored = localStorage.getItem('aula-theme');
      if (!stored) {
        const nextTheme: ThemeMode = event.matches ? 'dark' : 'light';
        applyTheme(nextTheme);
        setTheme(readTheme());
      }
    };

  media.addEventListener('change', handleSystemTheme);

  return () => {
    media.removeEventListener('change', handleSystemTheme);
  };
}, []);

  const toggleTheme = () => {
    const current = readTheme();
    const nextTheme: ThemeMode = current === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    setTheme(readTheme());
  };  

  const previewTitle = useMemo(() => summarizeTopic(topic), [topic]);
  const previewDuration = availability;
  const modules = examples[format];

  const previewIntro = useMemo(() => {
    return `Ejemplo orientativo de una primera propuesta para alguien que ${level.toLowerCase()} y quiere avanzar con un formato ${
      format === 'video'
        ? 'visual'
        : format === 'hybrid'
          ? 'mixto'
          : 'centrado en texto y comprobación'
    }.`;
  }, [level, format]);


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const prefs: UserPreferences = {
      topic: topic.trim(),
      level: mapLevel(level),
      profile: '',
      objective: objective.trim(),
      timeAvailable: availability,
      format: CourseFormat.HYBRID
    };

    onSubmit(prefs, apiKey);
  };

  return (
    <div className="landing-page-root">
      <header className="site-header">
        <nav className="nav" aria-label="Navegación principal">
          <a className="brand" href="#inicio" aria-label="Aula Virtual inicio">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img">
                <path d="M5.5 5.25h13a1.75 1.75 0 0 1 1.75 1.75v8.5a1.75 1.75 0 0 1-1.75 1.75h-13A1.75 1.75 0 0 1 3.75 15.5V7A1.75 1.75 0 0 1 5.5 5.25Zm1.25 3v6h10.5v-6H6.75Zm2.25 9h6l.55 1.5h-7.1L9 17.25Z" />
              </svg>
            </span>
            Aula Virtual
          </a>

          <div className="nav-links">
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#beneficios">Beneficios</a>
            <a href="#demo">Ejemplo</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              type="button"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              aria-pressed={theme === 'dark'}
              onClick={toggleTheme}
            >
              <svg className="theme-icon sun-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5.75A6.25 6.25 0 1 0 12 18.25 6.25 6.25 0 0 0 12 5.75Zm0 1.5a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5ZM11.25 2.5h1.5v2h-1.5v-2Zm0 17h1.5v2h-1.5v-2ZM19.5 11.25h2v1.5h-2v-1.5Zm-17 0h2v1.5h-2v-1.5Zm15.05-7.11 1.06 1.06-1.42 1.42-1.06-1.06 1.42-1.42ZM5.39 17.38l1.06 1.06-1.42 1.42-1.06-1.06 1.42-1.42Zm13.22 1.42-1.06 1.06-1.42-1.42 1.06-1.06 1.42 1.42ZM6.45 5.56 5.39 6.62 3.97 5.2l1.06-1.06 1.42 1.42Z" />
              </svg>
              <svg className="theme-icon moon-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.05 14.16A7.48 7.48 0 0 1 9.84 3.95 8.25 8.25 0 1 0 20.05 14.16Zm-2.52 2.36A6.75 6.75 0 1 1 7.48 6.47a8.98 8.98 0 0 0 10.05 10.05Z" />
              </svg>
              <span className="theme-label">{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
            </button>

            <a className="nav-cta" href="#crear-itinerario">
              Crear curso
            </a>
          </div>
        </nav>
      </header>

      <main id="inicio">
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow">Orientación de aprendizaje con IA</p>
            <h1>Transforma un objetivo de aprendizaje en un curso claro para empezar con criterio.</h1>
            <p className="hero-lead">
              Aula Virtual organiza lo que quieres aprender según tu nivel, tu objetivo y el tiempo que tienes. La app usa IA real para proponerte un curso claro, editable y enfocado en avanzar.
            </p>

            <div className="hero-points" aria-label="Resumen del producto">
              <article>
                <strong>Define un objetivo</strong>
                <p>Pasas de una idea difusa a un camino de aprendizaje ordenado.</p>
              </article>
              <article>
                <strong>Recibe una propuesta ajustada</strong>
                <p>La estructura se adapta a nivel, tiempo disponible y al objetivo que quieres alcanzar.</p>
              </article>
              <article>
                <strong>Conecta con conocimiento útil</strong>
                <p>La IA te ayuda a obtener un curso útil desde el principio, no a venderte una promesa vacía.</p>
              </article>
            </div>

            <div className="hero-actions" aria-label="Acciones principales">
              <a className="button button-primary" href="#crear-itinerario">
                Crear curso
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.5 5.25 20.25 12l-6.75 6.75-1.06-1.06 4.94-4.94H3.75v-1.5h13.63l-4.94-4.94 1.06-1.06Z" />
                </svg>
              </a>
              <a className="button button-secondary" href="#demo">
                Ver ejemplo
              </a>
            </div>

            <div className="trust-row" aria-label="Puntos de confianza">
              <span>Proyecto gratuito</span>
              <span>Cursos editables</span>
              <span>IA real con tu propia API key</span>
            </div>
          </div>

          <aside className="planner-card" id="crear-itinerario" aria-labelledby="planner-title">
            <div className="card-header">
              <div>
                <p className="small-label">Generador de curso</p>
                <h2 id="planner-title">Dale contexto real a tu aprendizaje</h2>
              </div>
              <span className="soft-badge">IA asistida</span>
            </div>

            <form className="learning-form" id="learning-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="api-key">API key</label>
                <input
                  id="api-key"
                  name="api-key"
                  type="password"
                  autoComplete="off"
                  placeholder="Pega tu clave para generar el curso"
                  required
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="field-note">
                  Usa tu propia API key personal de Google AI Studio. No se comparte ni viene incluida con la app.
                </p>

                <details className="inline-help">
                  <summary>¿Por qué necesito una API key?</summary>
                  <div className="inline-help-body">
                    <p>Aula Virtual es un proyecto gratuito. No hay cobro ni beneficio para el creador por cada uso.</p>
                    <p>La aplicación usa IA real, así que cada solicitud necesita una clave válida del propio usuario.</p>
                    <p>La key es personal. El creador no puede proporcionar una para todo el mundo, por eso cada persona debe usar la suya.</p>
                    <p>
                      Puedes crear una gratis en{' '}
                      <a href="https://aistudio.google.com/api-keys" target="_blank" rel="noreferrer">
                        Google AI Studio
                      </a>
                      . Trátala como un secreto y no la compartas.
                    </p>
                  </div>
                </details>
              </div>

              <div className="field">
                <label htmlFor="topic">Qué quieres aprender</label>
                <input
                  id="topic"
                  name="topic"
                  type="text"
                  placeholder="Ej. Automatización con Python"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="field-grid">
                <div className="field">
                  <label htmlFor="level">Nivel actual</label>
                  <select id="level" name="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                    <option>Estoy empezando</option>
                    <option>Tengo bases</option>
                    <option>Ya tengo experiencia</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="availability">Tiempo disponible</label>
                  <input
                    id="availability"
                    name="availability"
                    type="text"
                    placeholder="Ej. 4 horas por semana"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="objective">Objetivo</label>
                <textarea
                  id="objective"
                  name="objective"
                  rows={4}
                  placeholder="Ej. Quiero crear pequeños scripts para ahorrar tiempo en tareas repetitivas"
                  required
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                />
              </div>



              <button className="button button-primary form-submit" type="submit" disabled={isLoading}>
                {isLoading ? 'Generando curso...' : 'Generar curso'}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3.75a8.25 8.25 0 1 0 8.25 8.25h-1.5A6.75 6.75 0 1 1 12 5.25v-1.5Zm4.28 1.72 1.06 1.06-5.63 5.63-2.55-2.55L8.1 10.67l3.61 3.61 6.69-6.69-2.12-2.12Z" />
                </svg>
              </button>

              <button className="button button-secondary form-submit" type="button" onClick={onLoadDemo} disabled={isLoading}>
                Ver demo
              </button>

              {error && (
                <div className="form-error-banner">
                  {error}
                </div>
              )}

            </form>
          </aside>
        </section>

        <section className="how section-shell" id="como-funciona">
          <div className="section-heading">
            <p className="eyebrow">Cómo funciona</p>
            <h2>Ordena el camino antes de acumular recursos sin criterio.</h2>
          </div>

          <div className="steps">
            <article>
              <span className="step-number">01</span>
              <h3>Define el contexto</h3>
              <p>Indica qué quieres aprender, tu punto de partida, tu objetivo y el tiempo que puedes dedicar.</p>
            </article>

            <article>
              <span className="step-number">02</span>
              <h3>Recibe una primera propuesta</h3>
              <p>La IA organiza un curso inicial con temas, recursos y comprobaciones para empezar con más claridad.</p>
            </article>

            <article>
              <span className="step-number">03</span>
              <h3>Ajusta la forma de aprender</h3>
              <p>El curso se adapta a tu objetivo y después puedes editarlo según te convenga.</p>
            </article>
          </div>
        </section>

        <section className="benefits section-shell" id="beneficios">
          <div className="section-heading compact">
            <p className="eyebrow">Beneficios</p>
            <h2>Una brújula para aprender mejor, no otra plataforma que te encierra.</h2>
          </div>
          <div className="benefit-grid">
            <article className="benefit-card">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.5 5.25h15v1.5h-15v-1.5Zm0 4.5h10.25v1.5H4.5v-1.5Zm0 4.5h15v1.5h-15v-1.5Zm0 4.5h7.25v1.5H4.5v-1.5Z" />
              </svg>
              <h3>Menos dispersión</h3>
              <p>Convierte una búsqueda amplia en una secuencia más clara de temas, prioridades y formatos útiles.</p>
            </article>
            <article className="benefit-card">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3.75a8.25 8.25 0 1 0 8.25 8.25h-1.5a6.75 6.75 0 1 1-1.98-4.77l-4.77 4.77 1.06 1.06 5.83-5.83A8.22 8.22 0 0 0 12 3.75Z" />
              </svg>
              <h3>Personalización realista</h3>
              <p>El curso se ajusta a tu nivel, objetivo y disponibilidad, sin prometer atajos ni resultados mágicos.</p>
            </article>
            <article className="benefit-card">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.75 4.5h10.5A2.25 2.25 0 0 1 19.5 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V6.75A2.25 2.25 0 0 1 6.75 4.5Zm0 1.5a.75.75 0 0 0-.75.75v10.5c0 .41.34.75.75.75h10.5c.41 0 .75-.34.75-.75V6.75a.75.75 0 0 0-.75-.75H6.75Zm2.1 6.18 1.06-1.06 1.6 1.6 3.58-3.57 1.06 1.06-4.64 4.63-2.66-2.66Z" />
              </svg>
              <h3>Comprobación de avance</h3>
              <p>Incluye pequeñas preguntas, hitos o entregables para revisar si el aprendizaje realmente está avanzando.</p>
            </article>
          </div>
        </section>

        <section className="demo section-shell" id="demo">
          <div className="demo-copy">
            <p className="eyebrow">Ejemplo de curso inicial</p>
            <h2>Lo que ves aquí es un punto de partida editable, no un curso perfecto ya cerrado.</h2>
            <p>
              La demo muestra el tipo de estructura que Aula Virtual puede generar al principio. Sirve para orientar, priorizar y empezar mejor. Después puedes cambiar pasos, sustituir recursos y ajustar el ritmo según tu caso.
            </p>
            <p className="demo-note">
              El curso exacto depende del objetivo, nivel, tiempo disponible y formato elegido.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a className="text-link" href="#crear-itinerario">Generar mi curso</a>
              <button className="button button-secondary" type="button" onClick={onLoadDemo}>
                Ver demo funcional
              </button>
            </div>
          </div>

          <div className="course-preview" aria-label="Vista previa de un itinerario generado">
            <div className="preview-top">
              <div>
                <p className="small-label">Curso inicial sugerido</p>
                <h3>{previewTitle}</h3>
              </div>
              <span>{previewDuration}</span>
            </div>

            <p className="preview-intro">{previewIntro}</p>

            <div className="timeline">
              {modules.map((item) => (
                <article key={item[0]}>
                  <span></span>
                  <div>
                    <h4>{item[0]}</h4>
                    <p>{item[1]}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="preview-foot">
              <span>Curso inicial editable</span>
              <span>Combina explicación, recursos y práctica</span>
            </div>
          </div>
        </section>

        <section className="faq section-shell" id="faq">
          <div className="section-heading compact">
            <p className="eyebrow">Confianza</p>
            <h2>Preguntas útiles antes de generar un itinerario.</h2>
          </div>

          <div className="faq-list">
            <details>
              <summary>¿Qué hace realmente Aula Virtual?</summary>
              <p>
                Aula Virtual no es una academia ni una plataforma de cursos cerrada.
                Su función es ayudarte a transformar un objetivo de aprendizaje en un curso más claro,
                con estructura, formato y puntos de comprobación para avanzar con criterio.
              </p>
            </details>

            <details>
              <summary>¿Cómo consigo la API key y por qué tengo que usar la mía?</summary>
              <p>
                Puedes crear una gratis en Google AI Studio.
                Aula Virtual es un proyecto gratuito, no cobra por usarlo y no incluye una clave común del autor.
                Como la app usa IA real, cada persona necesita su propia key personal para generar propuestas.
                Debes tratarla como un secreto y no compartirla ni guardarla en código.
              </p>
            </details>

            <details>
              <summary>¿Aula Virtual crea cursos propios?</summary>
              <p>
                No. Propone una estructura personalizada para orientarte y conectar mejor con conocimiento útil
                en distintos formatos, pero no reemplaza por sí sola el contenido ni la práctica real.
              </p>
            </details>

            <details>
              <summary>¿Puedo cambiar la propuesta que genera?</summary>
              <p>
                Sí. El itinerario es un punto de partida editable, pensado para darte claridad sin quitarte control.
                Puedes ajustar el ritmo, el formato y los recursos según te convenga.
              </p>
            </details>

            <details>
              <summary>¿Qué formato me conviene elegir?</summary>
              <p>
                Texto + cuestionario funciona bien si quieres ordenar ideas y comprobar comprensión.
                Vídeo es útil si prefieres demostraciones visuales.
                El formato híbrido combina ambos para un aprendizaje más completo.
              </p>
            </details>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <p>Aula Virtual</p>
          <span>Orientación personalizada para aprender con más claridad.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;