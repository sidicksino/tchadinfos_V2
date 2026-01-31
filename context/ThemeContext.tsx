import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { THEMES } from "../constants/colors";

// Define the shape of the theme colors
type ThemeColors = typeof THEMES.ocean.light;

interface ThemeContextType {
  isDarkMode: boolean;
  COLORS: ThemeColors;
  toggleTheme: () => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  COLORS: THEMES.ocean.light,
  toggleTheme: async () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Defaulting to ocean theme as per original code
  const [COLORS, setCOLORS] = useState<ThemeColors>(THEMES.ocean.light);

  // Charger le mode depuis AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const stored = await AsyncStorage.getItem("isDarkMode");
        const dark = stored === "true";
        setIsDarkMode(dark);
        setCOLORS(dark ? THEMES.ocean.dark : THEMES.ocean.light);
      } catch (error) {
        console.error("Failed to load theme", error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      setCOLORS(newMode ? THEMES.ocean.dark : THEMES.ocean.light);
      await AsyncStorage.setItem("isDarkMode", newMode.toString());
    } catch (error) {
       console.error("Failed to save theme", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, COLORS, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
