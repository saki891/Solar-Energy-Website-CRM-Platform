import React, { createContext, useContext, useState } from 'react';

export const themes = {
  light: {
    bg: '#FBFAF6',
    bgAlt: '#EFF3EC',
    card: '#FFFFFF',
    border: '#D8DED9',
    text: '#16231C',
    textMuted: '#4B584F',
    textFaint: '#6B7A70',
    green: '#1F5C3E',
    greenHover: '#184A32',
    greenSoft: '#EFF3EC',
  },
  dark: {
    bg: '#0E1712',
    bgAlt: '#152019',
    card: '#17221B',
    border: '#293227',
    text: '#F3F6F1',
    textMuted: '#B9C4BB',
    textFaint: '#8A968C',
    green: '#3FA46A',
    greenHover: '#4CBE7C',
    greenSoft: '#1C2A21',
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
