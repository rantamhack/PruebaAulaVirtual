import React, { useEffect, useState } from 'react';
import { Course, UserPreferences } from './types';
import { generateCourse } from './services/geminiService';
import { aiStudioCourse } from './services/sampleData';
import CourseForm from './components/CourseForm';
import Classroom from './components/Classroom';
import ThemeToggle from './components/ThemeToggle';
import { LogOut, Clock3, Sparkles, CheckCircle2 } from 'lucide-react';

const loadingSteps = [
  "Analizando tu objetivo",
  "Organizando módulos",
  "Preparando explicaciones",
  "Ajustando ejercicios",
  "Buscando recursos útiles",
  "Montando el aula"
];

const formatElapsed = (elapsedMs: number): string => {
  const totalCentiseconds = Math.floor(elapsedMs / 10);
  const minutes = Math.floor(totalCentiseconds / 6000);
  const seconds = Math.floor((totalCentiseconds % 6000) / 100);
  const centiseconds = totalCentiseconds % 100;

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'classroom'>('home');
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [loadingElapsedMs, setLoadingElapsedMs] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      setLoadingStepIndex(0);
      setLoadingElapsedMs(0);
      return;
    }

    const stepInterval = window.setInterval(() => {
      setLoadingStepIndex((prev) => {
        if (prev >= loadingSteps.length - 1) return prev;
        return prev + 1;
      });
    }, 2400);

    const timerInterval = window.setInterval(() => {
      setLoadingElapsedMs((prev) => prev + 100);
    }, 100);

    return () => {
      window.clearInterval(stepInterval);
      window.clearInterval(timerInterval);
    };
  }, [loading]);

  const handleGenerateCourse = async (prefs: UserPreferences, apiKey: string) => {
    setLoading(true);
    setError(null);
    console.log("🚀 Iniciando generación de curso...", prefs);

    try {
      const generatedCourse = await generateCourse(prefs, apiKey);

      if (!generatedCourse) {
        throw new Error("La IA no devolvió ningún contenido. Intenta con otro tema.");
      }

      console.log("✅ Curso generado con éxito:", generatedCourse.title);
      console.log("🔑 Propiedades detectadas:", Object.keys(generatedCourse));
      console.log("📦 Contenido de modules:", generatedCourse.modules);

      setCourse(generatedCourse);
      setView('classroom');
    } catch (err) {
      console.error("❌ Error en App.tsx:", err);
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado al conectar con la IA.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadDemo = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setCourse(aiStudioCourse);
      setView('classroom');
      setLoading(false);
    }, 800);
  };

  const renderLoadingScreen = () => (
    <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="absolute top-4 md:top-6 right-4 md:right-6 z-20">
        <ThemeToggle />
      </div>

      <div
        className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_30%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.08),_transparent_35%)]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-4 md:py-6">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-4 md:mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-100 dark:bg-electric-900/30 text-electric-700 dark:text-electric-300 text-[11px] md:text-xs font-bold uppercase tracking-[0.16em] mb-3">
              <Sparkles className="w-4 h-4" />
              Aula Virtual
            </div>

            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Generando tu curso personalizado
            </h1>

            <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
              La generación del curso puede tardar un par de minutos mientras organizamos el contenido,
              estructuramos las lecciones y preparamos el aula.
            </p>

            <div className="mt-4 inline-flex items-center gap-3 px-4 md:px-5 py-2.5 rounded-full bg-white/85 dark:bg-gray-900/85 border border-gray-200 dark:border-gray-800 shadow-sm">
              <Clock3 className="w-4 h-4 md:w-5 md:h-5 text-electric-600 dark:text-electric-400" />
              <span className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-200">
                Tiempo transcurrido
              </span>
              <span className="text-sm md:text-lg font-bold text-electric-600 dark:text-electric-400 tabular-nums tracking-wide">
                {formatElapsed(loadingElapsedMs)}
              </span>
            </div>
          </div>

          <div className="relative rounded-[1.75rem] border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-2xl shadow-gray-900/10 dark:shadow-black/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-50/60 via-transparent to-electric-100/30 dark:from-electric-900/10 dark:via-transparent dark:to-electric-900/5 pointer-events-none" />

            <div className="relative px-4 md:px-8 pt-5 md:pt-7 pb-5 md:pb-6">
              <div className="max-w-2xl mx-auto text-center mb-4 md:mb-5">
                <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.16em] text-electric-600 dark:text-electric-400 mb-2">
                  Estado actual
                </p>
                <p className="text-base md:text-xl font-semibold text-gray-900 dark:text-white min-h-[2.25rem] md:min-h-[2.75rem] flex items-center justify-center px-2">
                  {loadingSteps[loadingStepIndex]}
                </p>
              </div>

              <div className="mx-auto w-full max-w-2xl">
                <div className="relative aspect-video rounded-[1.5rem] overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-950 shadow-xl shadow-black/20">
                  <video
                    src="/assets/robot-loading.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

                  {/* Overlay para tapar visualmente la marca de agua */}
                  <div className="absolute bottom-0 right-0 w-28 h-12 md:w-36 md:h-14 bg-gradient-to-l from-gray-950 via-gray-950/95 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 px-2.5 py-1 rounded-full bg-gray-900/85 border border-gray-700/70 text-[10px] md:text-[11px] font-semibold text-gray-300 backdrop-blur-sm pointer-events-none">
                    Aula Virtual
                  </div>
                </div>
              </div>

              <div className="mt-5 md:mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5 md:gap-3">
                  {loadingSteps.map((step, idx) => {
                    const isActive = idx === loadingStepIndex;
                    const isDone = idx < loadingStepIndex;

                    return (
                      <div
                        key={step}
                        className={`rounded-2xl border px-3 py-3 md:px-4 md:py-3.5 transition-all duration-300 min-h-[82px] md:min-h-[88px] flex flex-col justify-between
                          ${
                            isActive
                              ? 'border-electric-400 bg-white dark:bg-gray-900 shadow-md'
                              : isDone
                                ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10'
                                : 'border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/40'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full flex-shrink-0
                              ${
                                isActive
                                  ? 'bg-electric-500 animate-pulse'
                                  : isDone
                                    ? 'bg-green-500'
                                    : 'bg-gray-300 dark:bg-gray-700'
                              }
                            `}
                          />
                          {isDone && <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />}
                        </div>

                        <p
                          className={`text-xs md:text-sm leading-snug
                            ${
                              isActive
                                ? 'text-gray-900 dark:text-white font-semibold'
                                : isDone
                                  ? 'text-green-800 dark:text-green-200 font-medium'
                                  : 'text-gray-600 dark:text-gray-400'
                            }
                          `}
                        >
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] md:text-xs text-gray-500 dark:text-gray-500 mt-4">
            No cierres esta ventana mientras se genera el curso.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      {loading ? (
        renderLoadingScreen()
      ) : view === 'classroom' && course ? (
        <>
          <header
            className="fixed top-0 left-0 w-full z-50 h-16 px-4 md:px-6 flex items-center justify-between
                       bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800
                       transition-all duration-300 shadow-sm"
          >
            <button
              type="button"
              onClick={() => {
                setCourse(null);
                setView('home');
              }}
              className="group flex items-center gap-2 px-3 py-2 rounded-lg 
                         text-gray-600 dark:text-gray-400 font-medium
                         hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 
                         transition-all duration-200"
              aria-label="Salir del curso"
            >
              <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Salir</span>
            </button>

            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[40%] sm:max-w-[50%] pointer-events-none">
              <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate text-center leading-tight">
                {course.title || "Curso generado"}
              </h1>
            </div>

            <div className="flex items-center justify-end">
              <ThemeToggle />
            </div>
          </header>

          <div className="pt-16 h-screen box-border overflow-hidden bg-gray-50 dark:bg-gray-950">
            <Classroom course={course} />
          </div>
        </>
      ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black relative overflow-x-hidden">
          <div className="absolute top-6 right-6 z-50">
            <ThemeToggle />
          </div>

          <div
            className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
          ></div>

          <div className="relative z-10 pt-20 md:pt-24 pb-12">
            <CourseForm onSubmit={handleGenerateCourse} onLoadDemo={handleLoadDemo} isLoading={loading} />

            {error && (
              <div className="mt-6 px-4">
                <div className="mx-auto w-full max-w-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-center shadow-lg p-4">
                  <p className="font-bold flex items-center justify-center gap-2">
                    ⚠️ ¡Ups! Algo salió mal
                  </p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            )}
          </div>

          <footer className="relative z-10 text-center text-xs text-gray-400 dark:text-gray-600 w-full pb-6">
            ProfesorIA v2.0 • Powered by Google Gemini
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;