import React, { useState } from 'react';
import { CourseFormat, CourseLevel, UserPreferences } from '../types';
import {
  BookOpen,
  ChevronDown,
  Clock,
  Eye,
  KeyRound,
  Sparkles,
  Target,
  User
} from 'lucide-react';

interface Props {
  onSubmit: (prefs: UserPreferences, apiKey: string) => void;
  onLoadDemo: () => void;
  isLoading: boolean;
}

const LandingGeneratorCard: React.FC<Props> = ({ onSubmit, onLoadDemo, isLoading }) => {
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

  const fieldClass =
    'w-full h-12 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 px-4 text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-electric-500 transition-colors';

  return (
    <aside className="rounded-[2rem] border border-gray-200 dark:border-gray-800 bg-white/88 dark:bg-gray-900/84 backdrop-blur-md shadow-2xl shadow-gray-900/5 dark:shadow-black/30 overflow-hidden">
      <div className="px-6 md:px-8 py-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-electric-600 dark:text-electric-400 mb-2">
              Generador de itinerario
            </p>
            <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-[760] tracking-[-0.03em] text-gray-900 dark:text-white leading-[1.02]">
              Dale contexto real a tu aprendizaje
            </h2>
          </div>

          <span className="shrink-0 px-3 py-1.5 rounded-full bg-electric-100 dark:bg-electric-900/20 text-electric-700 dark:text-electric-300 text-[11px] font-bold uppercase tracking-[0.16em]">
            IA asistida
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-6 md:px-8 py-6 space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">API key</label>

          <div className="relative">
            <KeyRound className="absolute left-3 top-3.5 w-5 h-5 text-electric-500" />
            <input
              type="password"
              required
              autoComplete="off"
              spellCheck={false}
              placeholder="Pega tu clave para generar el itinerario"
              className={`${fieldClass} pl-10`}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Usa tu propia API key personal de Google AI Studio. No se comparte ni viene incluida con la app.
          </p>

          <details className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/40 px-4">
            <summary className="min-h-[48px] flex items-center justify-between cursor-pointer text-sm font-semibold text-gray-800 dark:text-gray-200">
              ¿Por qué necesito una API key?
            </summary>
            <div className="pb-4 space-y-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>Aula Virtual es un proyecto gratuito y sin suscripción.</p>
              <p>La app usa IA real, así que cada solicitud necesita una clave válida del propio usuario.</p>
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
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            Qué quieres aprender
          </label>

          <div className="relative">
            <BookOpen className="absolute left-3 top-3.5 w-5 h-5 text-electric-500" />
            <input
              type="text"
              required
              placeholder="Ej. Automatización con Python, Historia del arte, UX básico..."
              className={`${fieldClass} pl-10`}
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Nivel actual
            </label>

            <div className="relative">
              <select
                className={`${fieldClass} appearance-none pr-10`}
                value={formData.level}
                onChange={(e) => handleChange('level', e.target.value)}
              >
                {Object.values(CourseLevel).map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Formato preferido
            </label>

            <div className="relative">
              <select
                className={`${fieldClass} appearance-none pr-10 bg-electric-50 dark:bg-electric-900/20 border-electric-200 dark:border-electric-800`}
                value={formData.format}
                onChange={(e) => handleChange('format', e.target.value)}
              >
                {Object.values(CourseFormat).map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-electric-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Tu perfil
            </label>

            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ej. Estudiante, opositor, profesional..."
                className={`${fieldClass} pl-10`}
                value={formData.profile}
                onChange={(e) => handleChange('profile', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Tiempo disponible
            </label>

            <div className="relative">
              <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ej. 1 hora al día durante una semana"
                className={`${fieldClass} pl-10`}
                value={formData.timeAvailable}
                onChange={(e) => handleChange('timeAvailable', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            Objetivo principal
          </label>

          <div className="relative">
            <Target className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <textarea
              rows={4}
              placeholder="Ej. Quiero entender lo suficiente como para empezar a aplicarlo en un proyecto real"
              className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 pl-10 pr-4 py-3.5 text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:border-electric-500 transition-colors resize-y"
              value={formData.objective}
              onChange={(e) => handleChange('objective', e.target.value)}
            />
          </div>
        </div>

        <div className="pt-1 space-y-3">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-14 rounded-2xl font-bold text-white shadow-lg shadow-electric-500/20 flex items-center justify-center gap-2 transition-all
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
            className="w-full h-12 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Ver demo
          </button>
        </div>
      </form>
    </aside>
  );
};

export default LandingGeneratorCard;