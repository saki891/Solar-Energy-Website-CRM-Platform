import React, { createContext, useContext, useState, useEffect } from "react";

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
    input: '#FFFFFF',
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
    input: '#101911',
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("solara-theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("solara-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";
  const themeObj = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, themeObj, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
