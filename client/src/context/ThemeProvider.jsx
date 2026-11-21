import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext } from './ThemeContext.js';

function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }

  return 'light';
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'light' ? '#ffffff' : '#15141a',
    );
    try {
      window.localStorage.setItem('portfolio-theme', theme);
    } catch {
      // The theme still applies for this session when storage is unavailable.
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark');
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
