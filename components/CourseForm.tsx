import React, { useState } from 'react';
import { CourseFormat, CourseLevel, UserPreferences } from '../types';
import {
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  FileText,
  KeyRound,
  Layers3,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  User
} from 'lucide-react';

interface Props {
  onSubmit: (prefs: UserPreferences, apiKey: string) => void;
  onLoadDemo: () => void;
  isLoading: boolean;
}

const formatCards = [
  {
    title: 'Texto + ejercicios',
    desc: 'Explicaciones desarrolladas, estructura clara y comprobación real de comprensión.',
    icon: FileText
  },
  {
    title: 'Vídeo + texto',
    desc: 'Añade recursos externos relevantes cuando realmente aportan valor a la lección.',
    icon: PlayCircle
  },
  {
    title: 'Curso híbrido',
    desc: 'Combina contenido escrito, recursos audiovisuales y práctica aplicada en una sola ruta.',
    icon: Layers3
  }
];

const steps = [
  {
    title: 'Define lo que quieres aprender',
    desc: 'Describe el tema, tu nivel, tu objetivo y el tiempo que realmente tienes.',
    icon: Target
  },
  {
    title: 'La IA estructura una primera ruta',
    desc: 'Genera módulos, lecciones, ejercicios y una progresión razonable para empezar.',
    icon: BrainCircuit
  },
  {
    title: 'Empieza con criterio',
    desc: 'Entras a un aula funcional con contenido útil, recursos externos y seguimiento del progreso.',
    icon: CheckCircle2
  }
];

const benefits = [
  'Proyecto gratuito y sin suscripción',
  'Usa tu propia API key de Google AI Studio',
  'Itinerarios adaptados a nivel, objetivo y tiempo',
  'Aula funcional con módulos, lecciones y tests',
  'Recursos audiovisuales externos cuando aportan valor',
  'Primera propuesta editable, no un curso cerrado'
];

const previewModules = [
  {
    title: 'Módulo 1 · Base conceptual',
    desc: 'Te sitúa en el tema, aclara vocabulario y construye los fundamentos.'
  },
  {
    title: 'Módulo 2 · Aplicación guiada',
    desc: 'Empieza a usar lo aprendido con ejemplos, razonamiento y práctica.'
  },
  {
    title: 'Módulo 3 · Consolidación',
    desc: 'Refuerza los puntos clave con ejercicios, revisión y evaluación final.'
  }
];

const faqs = [
  {
    q: '¿Por qué tengo que usar mi propia API key?',
    a: 'Porque Aula Virtual es un proyecto gratuito. La generación usa IA real y cada solicitud necesita una clave válida del propio usuario.'
  },
  {
    q: '¿La app guarda mi API key?',
    a: 'No debería tratarse como una clave compartida del proyecto. La usas para generar tu curso y el modelo responde con esa credencial.'
  },
  {
    q: '¿Los vídeos están dentro del curso?',
    a: 'No. Cuando se sugieren recursos audiovisuales, se abren como enlaces externos a la fuente original.'
  },
  {
    q: '¿Esto sustituye a una academia o a un profesor?',
    a: 'No. Es una herramienta para organizar una primera ruta de aprendizaje útil y empezar con criterio.'
  }
];

const CourseForm: React.FC<Props> = ({ onSubmit, onLoadDemo, isLoading }) => {
  const [formData, setFormData] = useState<UserPreferences>({
    topic: '',
    level: CourseLevel.BEGINNER,
    profile: '',
    objective: '',
    timeAvailable: '',
    format: CourseFormat.HYBRID
  });

  const [apiKey, setApiKey] = useState('');

  const handleChange = (field: keyof UserPreferences, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, apiKey);
  };

  return (
    <div className="w-full">
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 xl:gap-14 items-start">
          <div className="space-y-8 pt-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-100 dark:bg-electric-900/30 text-electric-700 dark:text-electric-300 text-xs font-bold uppercase tracking-[0.16em] mb-4">
                <Sparkles className="w-4 h-4" />
                Aula Virtual
              </div>

              <h1 className="text-[clamp(2.7rem,6vw,5.4rem)] font-bold tracking-tight text-gray-900 dark:text-white leading-[0.93] max-w-[12ch]">
                Transforma un objetivo de aprendizaje en un itinerario claro para empezar con criterio.
              </h1>

              <p className="mt-5 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                Aula Virtual organiza lo que quieres aprender según tu nivel, tu objetivo, el tiempo que
                tienes y el formato que prefieres. La app usa IA real para proponerte una primera ruta útil,
                editable y enfocada en avanzar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm p-5 shadow-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Define un objetivo</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Pasas de una idea difusa a un camino de aprendizaje ordenado.
                </p>
              </article>

              <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm p-5 shadow-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Recibe una propuesta ajustada</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  La estructura se adapta a nivel, tiempo disponible y formato preferido.
                </p>
              </article>

              <article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm p-5 shadow-sm">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Conecta con conocimiento útil</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  La IA ayuda a priorizar recursos y pasos, no a vender un curso cerrado.
                </p>
              </article>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="px-3 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 font-medium">
                Proyecto gratuito
              </span>
              <span className="px-3 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 font-medium">
                Itinerarios editables
              </span>
              <span className="px-3 py-2 rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 text-gray-700 dark:text-gray-300 font-medium">
                IA real con tu propia API key
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formatCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-5 shadow-sm"
                  >
                    <div className="inline-flex p-2.5 rounded-xl bg-electric-100 dark:bg-electric-900/20 text-electric-600 dark:text-electric-400 mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FORMULARIO */}
          <aside className="rounded-[1.75rem] border border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md shadow-2xl shadow-gray-900/5 dark:shadow-black/30 overflow-hidden lg:sticky lg:top-8">
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-electric-600 dark:text-electric-400 mb-2">
                    Generador de itinerario
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                    Dale contexto real a tu aprendizaje
                  </h2>
                </div>

                <span className="px-3 py-1.5 rounded-full bg-electric-100 dark:bg-electric-900/20 text-electric-700 dark:text-electric-300 text-xs font-bold uppercase tracking-[0.16em] whitespace-nowrap">
                  IA asistida
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-6 md:px-8 py-6 md:py-8 space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-electric-700 dark:text-electric-300">
                  API key
                </label>

                <div className="relative">
                  <KeyRound className="absolute left-3 top-3.5 text-electric-500 w-5 h-5" />
                  <input
                    type="password"
                    required
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Pega tu clave para generar el itinerario"
                    className="w-full pl-10 pr-4 py-3.5 bg-electric-50 dark:bg-electric-900/20 border border-electric-200 dark:border-electric-800 rounded-2xl focus:ring-2 focus:ring-electric-500 focus:border-electric-500 transition-colors dark:text-white"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Usa tu propia API key personal de Google AI Studio. No se comparte ni viene incluida con la app.
                </p>

                <details className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/50 px-4">
                  <summary className="min-h-[46px] flex items-center justify-between cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200">
                    ¿Por qué necesito una API key?
                  </summary>
                  <div className="pb-4 space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <p>Aula Virtual es un proyecto gratuito. No hay cobro ni beneficio por cada uso.</p>
                    <p>La aplicación usa IA real, así que cada solicitud necesita una clave válida del propio usuario.</p>
                    <p>
                      Puedes crear una gratis en{' '}
                      <a
                        href="https://www.aistudio.google.com/api-keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric-600 dark:text-electric-400 underline underline-offset-2"
                      >
                        Google AI Studio
                      </a>.
                    </p>
                  </div>
                </details>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Qué quieres aprender
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3.5 text-electric-500 w-5 h-5" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Automatización con Python, Historia del arte, UX básico..."
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-electric-500 focus:border-electric-500 transition-colors dark:text-white"
                    value={formData.topic}
                    onChange={(e) => handleChange('topic', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Nivel actual
                  </label>
                  <div className="relative">
                    <select
                      className="w-full pl-4 pr-10 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-electric-500 appearance-none dark:text-white"
                      value={formData.level}
                      onChange={(e) => handleChange('level', e.target.value)}
                    >
                      {Object.values(CourseLevel).map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-4 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Formato preferido
                  </label>
                  <div className="relative">
                    <select
                      className="w-full pl-4 pr-10 py-3.5 bg-electric-50 dark:bg-electric-900/20 border border-electric-200 dark:border-electric-800 rounded-2xl focus:ring-2 focus:ring-electric-500 appearance-none dark:text-white font-medium"
                      value={formData.format}
                      onChange={(e) => handleChange('format', e.target.value)}
                    >
                      {Object.values(CourseFormat).map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-4 text-electric-500 w-5 h-5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Tu perfil
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Ej. Estudiante, opositor, profesional, aficionado..."
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-electric-500 dark:text-white"
                      value={formData.profile}
                      onChange={(e) => handleChange('profile', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Tiempo disponible
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Ej. 1 hora al día durante una semana"
                      className="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-electric-500 dark:text-white"
                      value={formData.timeAvailable}
                      onChange={(e) => handleChange('timeAvailable', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Objetivo principal
                </label>
                <div className="relative">
                  <Target className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <textarea
                    rows={4}
                    placeholder="Ej. Quiero entender lo suficiente como para empezar a aplicarlo en un proyecto real"
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-electric-500 dark:text-white resize-y"
                    value={formData.objective}
                    onChange={(e) => handleChange('objective', e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-base md:text-lg text-white shadow-lg shadow-electric-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]
                    ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-400'
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Generando curso...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generar curso con IA</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onLoadDemo}
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-2xl font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  <span>Ver demo</span>
                </button>
              </div>
            </form>
          </aside>
        </div>

        {/* COMO FUNCIONA */}
        <section className="mt-16 md:mt-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-electric-600 dark:text-electric-400 mb-3">
              Cómo funciona
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Una primera ruta seria para empezar sin perderte
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              La idea no es sustituir una academia ni prometer magia. La app organiza una propuesta
              útil para empezar con foco, contexto y una estructura razonable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-6 shadow-sm"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-electric-100 dark:bg-electric-900/20 text-electric-600 dark:text-electric-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="mt-16 md:mt-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-electric-600 dark:text-electric-400 mb-3">
              Beneficios
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Lo que sí hace bien esta app
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-5 shadow-sm flex items-start gap-3"
              >
                <div className="mt-0.5 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EJEMPLO */}
        <section className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 xl:grid-cols-[0.92fr_1.08fr] gap-6 items-start">
            <div className="rounded-[1.75rem] border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-6 md:p-8 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-electric-600 dark:text-electric-400 mb-3">
                Ejemplo de salida
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Una vista previa de cómo se estructura un itinerario
              </h2>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                No genera un simple listado. La idea es producir una secuencia usable de módulos, lecciones,
                recursos y evaluación para que puedas empezar a trabajar de verdad.
              </p>

              <div className="mt-6 space-y-4">
                {previewModules.map((module) => (
                  <div
                    key={module.title}
                    className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 p-4"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{module.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{module.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-electric-50 via-white to-gray-50 dark:from-electric-900/10 dark:via-gray-900 dark:to-gray-950 p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="inline-flex p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-electric-600 dark:text-electric-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-electric-600 dark:text-electric-400">
                    Enfoque
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Honesto, práctico y usable
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-5">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Sin promesas vacías</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    No intenta venderte un producto milagroso. Te da una base de trabajo para empezar mejor.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-5">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Con IA real</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    La calidad depende del modelo y del contexto que le des, por eso importa tanto completar bien el formulario.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-5">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Con recursos externos cuando encajan</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Si una referencia audiovisual aporta valor, la app la sugiere como recurso externo, no como contenido incrustado dudoso.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onLoadDemo}
                className="mt-6 w-full py-3.5 px-5 rounded-2xl font-semibold text-white bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-400 transition-colors shadow-lg shadow-electric-500/25"
              >
                Ver demo funcional
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16 md:mt-20 pb-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-electric-600 dark:text-electric-400 mb-3">
              FAQ
            </p>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Preguntas habituales
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 px-5"
              >
                <summary className="min-h-[60px] flex items-center justify-between cursor-pointer text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                  {item.q}
                </summary>
                <div className="pb-5 text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default CourseForm;