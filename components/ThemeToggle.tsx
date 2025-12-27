import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 1. Detección inicial: LocalStorage o Preferencia del Sistema
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      // Cambiar a Light
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      // Cambiar a Dark
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 
                 text-gray-500 dark:text-electric-400 
                 hover:bg-gray-200 dark:hover:bg-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                 transition-all duration-300 ease-in-out shadow-sm"
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo Claro" : "Modo Oscuro"}
    >
      <div className="relative w-6 h-6">
        {/* Icono Sol (Visible en Light) */}
        <Sun 
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform 
            ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100 text-amber-500'}`} 
        />
        
        {/* Icono Luna (Visible en Dark) */}
        <Moon 
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform 
            ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} 
        />
      </div>
    </button>
  );
};

export default ThemeToggle;