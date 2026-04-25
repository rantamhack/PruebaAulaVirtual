import React, { useEffect, useState } from 'react';
import { Moon, SunMedium } from 'lucide-react';

const LandingThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
      root.classList.remove('dark');
      setIsDark(false);
    } else if (savedTheme === 'dark') {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      const hasDark = root.classList.contains('dark');
      setIsDark(hasDark);
    }

    setIsReady(true);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !isDark;

    if (nextDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setIsDark(nextDark);
  };

  if (!isReady) return null;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="inline-flex items-center gap-2 h-11 px-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/85 dark:bg-gray-900/75 backdrop-blur-sm text-gray-800 dark:text-gray-100 shadow-sm hover:bg-white dark:hover:bg-gray-900 transition-all"
    >
      {isDark ? <Moon className="w-4 h-4" /> : <SunMedium className="w-4 h-4" />}
      <span className="text-sm font-semibold">{isDark ? 'Oscuro' : 'Claro'}</span>
    </button>
  );
};

export default LandingThemeToggle;