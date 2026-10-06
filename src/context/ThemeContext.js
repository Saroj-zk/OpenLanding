import * as React from 'react';

export const ThemeContext = React.createContext({
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    /* The bootstrap script in _document has already put the saved preference on
       <html>, so the paint is correct before React runs. Only catch state up to
       it; writing the attribute again here is what produced the visible swap. */
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
      localStorage.setItem('ol-theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return React.useContext(ThemeContext);
}
