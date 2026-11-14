import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();
const KEY = "aa-theme";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

const initialTheme = () => {
  try {
    const stored = localStorage.getItem(KEY) ?? localStorage.getItem("domstack-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch { /* storage unavailable */ }
  return "dark"; // dark-first
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("light", theme === "light"); // old components still read .light
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#F3F5FA" : "#070A12");
    try {
      localStorage.setItem(KEY, theme);
      localStorage.removeItem("domstack-theme");
    } catch { /* ignore */ }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
