
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

type ThemeType = 'light' | 'dark' | 'system';
type ColorScheme = 'default' | 'blue' | 'green' | 'purple' | 'orange';

interface ThemeContextType {
  theme: ThemeType;
  colorScheme: ColorScheme;
  setTheme: (theme: ThemeType) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  primaryColor: string;
  secondaryColor: string;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  colorScheme: 'default',
  setTheme: () => {},
  setColorScheme: () => {},
  primaryColor: 'hsl(221.2 83.2% 53.3%)', // Default blue
  secondaryColor: 'hsl(210 40% 96.1%)'
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
  defaultColorScheme?: ColorScheme;
}

const colorSchemes = {
  default: {
    primary: 'hsl(221.2 83.2% 53.3%)',
    secondary: 'hsl(210 40% 96.1%)'
  },
  blue: {
    primary: 'hsl(221.2 83.2% 53.3%)',
    secondary: 'hsl(210 40% 96.1%)'
  },
  green: {
    primary: 'hsl(142.1 76.2% 36.3%)',
    secondary: 'hsl(138 76.5% 96.7%)'
  },
  purple: {
    primary: 'hsl(262.1 83.3% 57.8%)',
    secondary: 'hsl(260 60% 98%)'
  },
  orange: {
    primary: 'hsl(24.6 95% 53.1%)',
    secondary: 'hsl(20 96.2% 98.6%)'
  }
};

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  defaultColorScheme = 'default'
}) => {
  const [theme, setThemeState] = useState<ThemeType>(defaultTheme);
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(defaultColorScheme);
  
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('nog_theme', newTheme);
  };

  const setColorScheme = (newScheme: ColorScheme) => {
    setColorSchemeState(newScheme);
    localStorage.setItem('nog_colorScheme', newScheme);
    
    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary', colorSchemes[newScheme].primary);
    root.style.setProperty('--secondary', colorSchemes[newScheme].secondary);
  };
  
  // Initialize from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('nog_theme') as ThemeType | null;
    const savedColorScheme = localStorage.getItem('nog_colorScheme') as ColorScheme | null;
    
    if (savedTheme) setThemeState(savedTheme);
    if (savedColorScheme) setColorSchemeState(savedColorScheme);
  }, []);
  
  // Apply color scheme when it changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', colorSchemes[colorScheme].primary);
    root.style.setProperty('--secondary', colorSchemes[colorScheme].secondary);
  }, [colorScheme]);
  
  return (
    <ThemeContext.Provider value={{
      theme,
      colorScheme,
      setTheme,
      setColorScheme,
      primaryColor: colorSchemes[colorScheme].primary,
      secondaryColor: colorSchemes[colorScheme].secondary
    }}>
      <NextThemeProvider
        attribute="class"
        defaultTheme={theme}
        enableSystem
      >
        {children}
      </NextThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AppThemeProvider;
