import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { 
  PlayCircle, CheckCircle, Circle, Menu, X, ChevronRight, ChevronDown, 
  FileDown, Clock, GraduationCap, ClipboardList, BookOpen 
} from 'lucide-react';

interface Props {
  course: Course;
}

// Discriminatd Union for strict view state management
type ViewState = 
  | { type: 'lesson'; moduleIdx: number; lessonIdx: number }
  | { type: 'module-exam'; moduleIdx: number }
  | { type: 'final-exam' };

const Classroom: React.FC<Props> = ({ course }) => {
  // DEBUG: Verificamos qué llega realmente al componente
  useEffect(() => {
    console.log("🏫 Classroom montado. Curso recibido:", course.title);
  }, [course]);

  const [viewState, setViewState] = useState<ViewState>({ type: 'lesson', moduleIdx: 0, lessonIdx: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // ACORDEÓN: Estado para controlar qué módulos están expandidos
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));

  // PERSISTENCIA: Estado para ítems completados
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. CARGAR PROGRESO
  useEffect(() => {
    const savedProgress = localStorage.getItem(`profesoria_progress_${course.id}`);
    const savedAnswers = localStorage.getItem(`profesoria_answers_${course.id}`);

    if (savedProgress) setCompletedItems(new Set(JSON.parse(savedProgress)));
    if (savedAnswers) setQuizAnswers(JSON.parse(savedAnswers));
    setIsLoaded(true);
  }, [course.id]);

  // 2. GUARDAR PROGRESO
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(`profesoria_progress_${course.id}`, JSON.stringify(Array.from(completedItems)));
  }, [completedItems, course.id, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(`profesoria_answers_${course.id}`, JSON.stringify(quizAnswers));
  }, [quizAnswers, course.id, isLoaded]);


  // --- LOGICA DE NAVEGACIÓN Y UTILIDADES ---

  const getQuizKey = (context: string, qIdx: number) => `${context}-q${qIdx}`;

  const markComplete = (id: string) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const toggleModule = (idx: number) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) newSet.delete(idx);
      else newSet.add(idx);
      return newSet;
    });
  };

  const navigateTo = (newState: ViewState) => {
    setViewState(newState);
    setSidebarOpen(false); 
    if (newState.type !== 'final-exam') {
        setExpandedModules(prev => new Set(prev).add(newState.moduleIdx));
    }
    document.getElementById('classroom-main')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateProgress = () => {
    let totalItems = 1; // Final exam
    course.modules.forEach(m => {
        totalItems += m.lessons.length + 1; // Lessons + Module Exam
    });
    const completedCount = completedItems.size;
    return Math.min(100, Math.round((completedCount / totalItems) * 100));
  };

  // --- RENDERERS ---

  const renderSidebar = () => (
    <aside className={`
      fixed inset-y-0 left-0 z-50 md:z-auto w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 pt-20 md:pt-0
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-[200px]">Temario</h2>
        </div>
        <button type="button" onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-gray-500">
          <X size={20} />
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100%-80px)] p-4 space-y-4">
        {course.modules.map((module, mIdx) => {
           const isExpanded = expandedModules.has(mIdx);
           const moduleTotalItems = module.lessons.length + 1;
           const moduleCompletedCount = module.lessons.filter((_, lIdx) => completedItems.has(`${mIdx}-${lIdx}`)).length + (completedItems.has(`${mIdx}-exam`) ? 1 : 0);
           const isModuleFullyComplete = moduleCompletedCount === moduleTotalItems;

           return (
            <div key={mIdx} className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden bg-gray-50/50 dark:bg-gray-800/30">
                <button 
                  onClick={() => toggleModule(mIdx)}
                  className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Módulo {mIdx + 1}</span>
                        <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-1">{module.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {isModuleFullyComplete && <CheckCircle size={16} className="text-green-500" />}
                        {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                    </div>
                </button>

                {isExpanded && (
                    <div className="p-2 space-y-1 border-t border-gray-100 dark:border-gray-800 animate-fade-in">
                        {module.lessons.map((lesson, lIdx) => {
                            const isActive = viewState.type === 'lesson' && viewState.moduleIdx === mIdx && viewState.lessonIdx === lIdx;
                            const isCompleted = completedItems.has(`${mIdx}-${lIdx}`);
                            return (
                                <button
                                    key={lIdx}
                                    onClick={() => navigateTo({ type: 'lesson', moduleIdx: mIdx, lessonIdx: lIdx })}
                                    className={`w-full flex items-center p-2.5 rounded-lg text-sm font-medium transition-all pl-4 border-l-2
                                        ${isActive 
                                            ? 'bg-electric-50 dark:bg-electric-900/20 text-electric-700 dark:text-electric-300 border-electric-500' 
                                            : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                        }
                                    `}
                                >
                                    <span className="mr-3 flex-shrink-0">
                                        {isCompleted ? <CheckCircle size={16} className="text-green-500" /> : isActive ? <PlayCircle size={16} className="text-electric-500" /> : <Circle size={16} className="text-gray-300" />}
                                    </span>
                                    <span className="text-left line-clamp-1">{lesson.title}</span>
                                </button>
                            );
                        })}

                        <button
                            onClick={() => navigateTo({ type: 'module-exam', moduleIdx: mIdx })}
                            className={`w-full flex items-center p-2.5 mt-2 rounded-lg text-sm font-bold pl-4 border-l-2 border-transparent transition-all
                                ${viewState.type === 'module-exam' && viewState.moduleIdx === mIdx 
                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-500' 
                                    : 'text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                }
                            `}
                        >
                             <ClipboardList size={16} className="mr-3 flex-shrink-0" />
                             <span>Test del Módulo {mIdx + 1}</span>
                             {completedItems.has(`${mIdx}-exam`) && <CheckCircle size={16} className="text-green-500 ml-auto" />}
                        </button>
                    </div>
                )}
            </div>
          );
        })}

        <div className="pt-4">
            <button
                onClick={() => navigateTo({ type: 'final-exam' })}
                className={`w-full flex items-center p-4 rounded-xl text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]
                   ${viewState.type === 'final-exam' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 ring-2 ring-purple-300' : 'bg-gradient-to-r from-gray-800 to-gray-700'}
                `}
            >
                <GraduationCap size={20} className="mr-3" />
                EXAMEN FINAL
                {completedItems.has(`final-exam`) && <CheckCircle size={18} className="text-white ml-auto" />}
            </button>
        </div>
      </div>
    </aside>
  );

  const renderLesson = (mIdx: number, lIdx: number) => {
    const module = course.modules[mIdx];
    // Tipado flexible para permitir videoUrl o video_url
    const lesson = module.lessons[lIdx] as any; 
    const lessonKey = `${mIdx}-${lIdx}`;
    
    // Obtenemos el HTML de forma segura
    const safeContentHtml = lesson.content_html || lesson.contentHtml || "<p>Contenido no disponible.</p>";

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 pb-32 animate-fade-in">
            {/* Header Lección */}
            <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-electric-100 dark:bg-electric-900/30 text-electric-700 dark:text-electric-300">
                        Módulo {mIdx + 1}
                    </span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        Lección {lIdx + 1}
                    </span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">{lesson.title}</h1>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"><Clock size={14}/> {lesson.duration}</span>
                </div>
            </div>

            {/* Video Placeholder - BÚSQUEDA ACTUALIZADA */}
            <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg relative group">
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="text-center p-6">
                         <div className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-sm mb-6 transition-transform group-hover:scale-110">
                            <PlayCircle size={48} className="text-white" />
                         </div>
                         
                        {/* BOTÓN CORREGIDO: AÑADE EL TÍTULO DEL CURSO A LA BÚSQUEDA */}
                         <a 
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(course.title + " " + lesson.title + " tutorial español " + new Date().getFullYear())}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm font-bold transition-colors shadow-xl mx-auto w-fit"
                         >
                            <PlayCircle size={18} />
                            Buscar video actual ({new Date().getFullYear()})
                         </a>
                    </div>
                </div>
            </div>

            {/* HTML Content */}
            <div className="prose dark:prose-invert max-w-none 
                            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                            prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-li:text-gray-600 dark:prose-li:text-gray-300
                            prose-a:text-electric-600 dark:prose-a:text-electric-400 prose-strong:text-electric-700 dark:prose-strong:text-electric-300
                            bg-white dark:bg-gray-900/50 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800/50 shadow-sm"
                 dangerouslySetInnerHTML={{ __html: safeContentHtml }}
            />

            {/* Downloads */}
            {lesson.downloads && lesson.downloads.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-800/30">
                    <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <FileDown size={18} /> Material Descargable
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {lesson.downloads.map((dl: any, i: number) => (
                            <a key={i} href={dl.url} target="_blank" rel="noreferrer" className="flex items-center p-3 bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-800/50 rounded-lg hover:border-blue-400 dark:hover:border-blue-400 transition-colors group shadow-sm">
                                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md text-blue-600 dark:text-blue-400 mr-3">
                                    <FileDown size={20} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">{dl.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Navigation Footer */}
            <div className="flex justify-end pt-8 border-t border-gray-100 dark:border-gray-800">
                <button
                    onClick={() => {
                        markComplete(lessonKey);
                        if (lIdx < module.lessons.length - 1) {
                            navigateTo({ type: 'lesson', moduleIdx: mIdx, lessonIdx: lIdx + 1 });
                        } else {
                            navigateTo({ type: 'module-exam', moduleIdx: mIdx });
                        }
                    }}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1
                        ${completedItems.has(lessonKey) 
                           ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-500/30' 
                           : 'bg-electric-600 text-white hover:bg-electric-700 shadow-electric-500/30'
                        }
                    `}
                >
                    {completedItems.has(lessonKey) ? (
                        <><span>Lección Completada</span> <CheckCircle size={20} /></>
                    ) : (
                        <><span>Completar y Siguiente</span> <ChevronRight size={20} /></>
                    )}
                </button>
            </div>
        </div>
    );
  };

  const renderQuiz = (questions: any[], contextKey: string, title: string, subTitle: string, onFinish?: () => void) => {
    return (
        <div className="max-w-3xl mx-auto p-6 md:p-10 pb-32 animate-fade-in">
             <div className="text-center mb-10">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
                    {subTitle}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Selecciona la respuesta correcta para avanzar.</p>
            </div>

            <div className="space-y-6">
                {questions.map((q, qIdx) => {
                    const qKey = getQuizKey(contextKey, qIdx);
                    const userAnswer = quizAnswers[qKey];
                    const isAnswered = userAnswer !== undefined && userAnswer !== null;
                    const isCorrect = isAnswered && userAnswer === q.correctIndex;

                    return (
                        <div key={qIdx} className={`rounded-2xl p-6 border transition-all duration-300
                            ${isAnswered 
                                ? (isCorrect 
                                    ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
                                    : 'bg-red-50/50 dark:bg-red-900/10 border-red-200 dark:border-red-800')
                                : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm'
                            }
                        `}>
                             <p className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-4 flex gap-3">
                                <span className="text-gray-400 font-bold">{qIdx + 1}.</span> 
                                {q.question}
                             </p>
                             <div className="space-y-2 pl-8">
                                {q.options.map((opt: string, oIdx: number) => {
                                    let btnClass = "w-full text-left p-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-between ";
                                    
                                    if (isAnswered) {
                                        if (oIdx === q.correctIndex) {
                                            btnClass += "bg-green-100 border-green-500 text-green-800 dark:bg-green-900/40 dark:border-green-500 dark:text-green-300 ring-1 ring-green-500";
                                        } else if (oIdx === userAnswer) {
                                            btnClass += "bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:border-red-500 dark:text-red-300";
                                        } else {
                                            btnClass += "bg-white/50 dark:bg-gray-800/50 border-transparent text-gray-400 dark:text-gray-600 opacity-50 cursor-not-allowed";
                                        }
                                    } else {
                                        btnClass += "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md";
                                    }

                                    return (
                                        <button
                                            key={oIdx}
                                            disabled={isAnswered}
                                            onClick={() => {
                                                setQuizAnswers(prev => ({...prev, [qKey]: oIdx}));
                                            }}
                                            className={btnClass}
                                        >
                                            <span>{opt}</span>
                                            {isAnswered && oIdx === q.correctIndex && <CheckCircle size={20} className="text-green-600 dark:text-green-400" />}
                                            {isAnswered && oIdx === userAnswer && oIdx !== q.correctIndex && <X size={20} className="text-red-500" />}
                                        </button>
                                    );
                                })}
                             </div>
                             {isAnswered && (
                                <div className={`mt-4 text-sm font-bold flex items-center gap-2 animate-fade-in
                                    ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}
                                `}>
                                    {isCorrect ? '¡Correcto!' : 'Respuesta incorrecta'}
                                </div>
                             )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 flex justify-center">
                 <button
                    onClick={() => {
                        markComplete(contextKey); 
                        if (onFinish) onFinish();
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-indigo-500/30 transition-transform transform hover:-translate-y-1 flex items-center gap-2"
                 >
                    <CheckCircle /> Finalizar Evaluación
                 </button>
            </div>
        </div>
    );
  };

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Mobile Toggle */}
      <button onClick={() => setSidebarOpen(true)} className="md:hidden fixed bottom-6 right-6 z-40 p-4 bg-electric-600 text-white rounded-full shadow-lg">
        <Menu />
      </button>

      {renderSidebar()}

      <main id="classroom-main" className="flex-1 h-full overflow-y-auto relative scroll-smooth flex flex-col">
        {/* Internal Progress Header */}
        <div className="bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 px-6 py-2 flex items-center justify-between sticky top-0 z-30 shadow-sm backdrop-blur-md">
            <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
               <BookOpen size={14}/> 
               {viewState.type === 'lesson' ? 'Aprendiendo' : viewState.type === 'module-exam' ? 'Evaluando Módulo' : 'Examen Final'}
            </span>
            <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-electric-600 dark:text-electric-400">{calculateProgress()}% Progreso</span>
                <div className="h-1.5 w-24 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-electric-600 transition-all duration-500 ease-out" style={{ width: `${calculateProgress()}%` }}></div>
                </div>
            </div>
        </div>

        {/* Content Switcher */}
        {viewState.type === 'lesson' && renderLesson(viewState.moduleIdx, viewState.lessonIdx)}
        
        {viewState.type === 'module-exam' && (() => {
            const mIdx = viewState.moduleIdx;
            const module = course.modules[mIdx];
            return renderQuiz(
                module.evaluation.questions, 
                `${mIdx}-exam`, 
                `Evaluación: ${module.title}`, 
                "Test de Módulo",
                () => {
                    if (mIdx < course.modules.length - 1) {
                        setExpandedModules(prev => new Set(prev).add(mIdx + 1));
                        navigateTo({ type: 'lesson', moduleIdx: mIdx + 1, lessonIdx: 0 });
                    } else {
                        navigateTo({ type: 'final-exam' });
                    }
                }
            );
        })()}

        {viewState.type === 'final-exam' && renderQuiz(
            course.final_exam.questions, 
            'final-exam', 
            "Examen Final del Curso", 
            "Certificación",
            () => alert("¡Felicidades! Has completado todo el curso. Tu progreso se ha guardado.")
        )}

      </main>
    </div>
  );
};

export default Classroom;