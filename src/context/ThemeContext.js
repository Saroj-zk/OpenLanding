import * as React from 'react';

/**
 * The site has one palette, defined on :root in globals.css.
 *
 * This stays as a context because a lot of components still ask it which theme
 * they are in. It always answers the same way now, so those branches settle on
 * their light values and there is no switch, no stored preference, and nothing
 * that can repaint after the first frame.
 */
const VALUE = { isDark: false };

export const ThemeContext = React.createContext(VALUE);

export function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={VALUE}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  return React.useContext(ThemeContext);
}
