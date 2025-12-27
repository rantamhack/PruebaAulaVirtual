import React, { useState } from 'react';
import { Course, UserPreferences } from './types';
import { generateCourse } from './services/geminiService';
import { aiStudioCourse } from './services/sampleData';
import CourseForm from './components/CourseForm';
import Classroom from './components/Classroom';
import ThemeToggle from './components/ThemeToggle';
import { LogOut } from 'lucide-react';

const App: React.FC = () => {
  // Estado explícito para la vista
  const [view, setView] = useState<'home' | 'classroom'>('home');
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCourse = async (prefs: UserPreferences) => {
    setLoading(true);
    setError(null);
    console.log("🚀 Iniciando generación de curso...", prefs);

    try {
      // 1. Llamada al servicio (el cerebro nuevo que creamos)
      const generatedCourse = await generateCourse(prefs);

      // 2. Verificación de seguridad
      if (!generatedCourse) {
        throw new Error("La IA no devolvió ningún contenido. Intenta con otro tema.");
      }

      console.log("✅ Curso generado con éxito:", generatedCourse.title);
      console.log("🔑 Propiedades detectadas:", Object.keys(generatedCourse));
      console.log("📦 Contenido de modules:", generatedCourse.modules);

      // 3. Actualizamos estado
      setCourse(generatedCourse);
      setView('classroom');

    } catch (err) {
      console.error("❌ Error en App.tsx:", err);
      // Mostramos un mensaje amigable al usuario
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado al conectar con la IA.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadDemo = () => {
    setLoading(true);
    setError(null);
    // Simular pequeño delay para UX
    setTimeout(() => {
        setCourse(aiStudioCourse);
        setView('classroom');
        setLoading(false);
    }, 800);
  };


  return (
    <div className="min-h-screen relative text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      
      {view === 'classroom' && course ? (
        <>
          {/* HEADER MODERNO (Glassmorphism)
          */}
          <header className="fixed top-0 left-0 w-full z-50 h-16 px-4 md:px-6 flex items-center justify-between
                             bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800
                             transition-all duration-300 shadow-sm">
            
            {/* ZONA IZQUIERDA: Botón Salir */}
            <button
              type="button"
              onClick={() => { setCourse(null); setView('home'); }}
              className="group flex items-center gap-2 px-3 py-2 rounded-lg 
                         text-gray-600 dark:text-gray-400 font-medium
                         hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 
                         transition-all duration-200"
              aria-label="Salir del curso"
            >
              <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Salir</span>
            </button>

            {/* ZONA CENTRAL: Título del Curso */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[40%] sm:max-w-[50%] pointer-events-none">
              <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate text-center leading-tight">
                {course.title || "Curso Generado"}
              </h1>
            </div>

            {/* ZONA DERECHA: Toggle Tema */}
            <div className="flex items-center justify-end">
              <ThemeToggle />
            </div>
          </header>

          {/* CONTENEDOR PRINCIPAL
          */}
          <div className="pt-16 h-screen box-border overflow-hidden bg-gray-50 dark:bg-gray-950"> 
             <Classroom course={course} />
          </div>
        </>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black relative overflow-hidden">
          
          {/* Theme Toggle flotante en Home */}
          <div className="absolute top-6 right-6 z-50">
            <ThemeToggle />
          </div>

          {/* Background decoration */}
          <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#3b82f6 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
          </div>

          <div className="z-10 w-full max-w-4xl px-4 flex flex-col items-center">
            
            <CourseForm onSubmit={handleGenerateCourse} onLoadDemo={handleLoadDemo} isLoading={loading} />
            
            {error && (
              <div className="mt-6 p-4 w-full max-w-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-center animate-bounce-in shadow-lg">
                <p className="font-bold flex items-center justify-center gap-2">
                  ⚠️ ¡Ups! Algo salió mal
                </p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}
          </div>

           <footer className="absolute bottom-4 text-center text-xs text-gray-400 dark:text-gray-600 z-10 w-full">
             ProfesorIA v2.0 • Powered by Google Gemini 3.0
           </footer>
        </div>
      )}
    </div>
  );
};

export default App;