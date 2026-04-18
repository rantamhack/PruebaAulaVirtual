import React, { useState } from 'react';
import { CourseFormat, CourseLevel, UserPreferences } from '../types';
import { BrainCircuit, Clock, Target, User, BookOpen, ChevronDown, Sparkles, KeyRound } from 'lucide-react';

interface Props {
  onSubmit: (prefs: UserPreferences, apiKey: string) => void;
  onLoadDemo: () => void;
  isLoading: boolean;
}

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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, apiKey);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-electric-100 dark:bg-electric-900/30 rounded-full mb-4">
          <BrainCircuit className="w-10 h-10 text-electric-600 dark:text-electric-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          Profesor<span className="text-electric-600">IA</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Tu Aula Virtual Inteligente. Diseña tu aprendizaje a medida.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 space-y-6 relative overflow-hidden backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-electric-500/5 rounded-bl-full pointer-events-none"></div>

        {/* API Key del usuario */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-electric-600 dark:text-electric-400">
            Tu Gemini API Key
          </label>

          <div className="relative">
            <KeyRound className="absolute left-3 top-3 text-electric-500 w-5 h-5" />
            <input
              type="password"
              required
              autoComplete="off"
              spellCheck={false}
              placeholder="Pega aquí tu Gemini API Key"
              className="w-full pl-10 pr-4 py-3 bg-electric-50 dark:bg-electric-900/20 border border-electric-200 dark:border-electric-800 rounded-xl focus:ring-2 focus:ring-electric-500 focus:border-electric-500 transition-colors dark:text-white"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Esta app usa la API Key que tú proporciones. No incluyas una clave ajena.
            Puedes obtener una gratis en{" "}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Topic */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              ¿Qué quieres aprender hoy?
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 text-electric-500 w-5 h-5" />
              <input
                type="text"
                required
                placeholder="Ej. Historia del Arte, Python Avanzado, Jardinería..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-electric-500 focus:border-electric-500 transition-colors dark:text-white"
                value={formData.topic}
                onChange={(e) => handleChange('topic', e.target.value)}
              />
            </div>
          </div>

          {/* Level */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nivel Actual
            </label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-electric-500 appearance-none dark:text-white"
                value={formData.level}
                onChange={(e) => handleChange('level', e.target.value)}
              >
                {Object.values(CourseLevel).map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Format */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-electric-600 dark:text-electric-400">
              Formato Preferido
            </label>
            <div className="relative">
              <select
                className="w-full pl-4 pr-10 py-3 bg-electric-50 dark:bg-electric-900/20 border border-electric-200 dark:border-electric-800 rounded-xl focus:ring-2 focus:ring-electric-500 appearance-none dark:text-white font-medium"
                value={formData.format}
                onChange={(e) => handleChange('format', e.target.value)}
              >
                {Object.values(CourseFormat).map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 text-electric-500 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Profile */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tu Perfil
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Ej. Estudiante de medicina, Jubilado..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-electric-500 dark:text-white"
                value={formData.profile}
                onChange={(e) => handleChange('profile', e.target.value)}
              />
            </div>
          </div>

          {/* Objective */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Objetivo Principal
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Ej. Aprobar un examen, Hobby..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-electric-500 dark:text-white"
                value={formData.objective}
                onChange={(e) => handleChange('objective', e.target.value)}
              />
            </div>
          </div>

          {/* Time */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tiempo Disponible
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Ej. 1 hora al día durante una semana"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-electric-500 dark:text-white"
                value={formData.timeAvailable}
                onChange={(e) => handleChange('timeAvailable', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white shadow-lg shadow-electric-500/30 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-95
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-electric-600 to-electric-500 hover:from-electric-500 hover:to-electric-400'}
            `}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                <span>Diseñando tu Curso...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generar curso con IA</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;