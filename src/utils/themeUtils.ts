
import { useThemeContext } from '@/providers/ThemeProvider';

// Função para inicializar o tema com base nas configurações salvas
export const inicializarTema = () => {
  const savedTheme = localStorage.getItem('nog_theme');
  const savedColorScheme = localStorage.getItem('nog_colorScheme');
  
  if (savedTheme) {
    document.documentElement.classList.remove('light', 'dark');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } else {
    // Verificar preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }
  
  if (savedColorScheme) {
    const colorSchemes = {
      default: { primary: 'hsl(221.2 83.2% 53.3%)', secondary: 'hsl(210 40% 96.1%)' },
      blue: { primary: 'hsl(221.2 83.2% 53.3%)', secondary: 'hsl(210 40% 96.1%)' },
      green: { primary: 'hsl(142.1 76.2% 36.3%)', secondary: 'hsl(138 76.5% 96.7%)' },
      purple: { primary: 'hsl(262.1 83.3% 57.8%)', secondary: 'hsl(260 60% 98%)' },
      orange: { primary: 'hsl(24.6 95% 53.1%)', secondary: 'hsl(20 96.2% 98.6%)' }
    };
    
    const scheme = savedColorScheme as keyof typeof colorSchemes;
    if (colorSchemes[scheme]) {
      document.documentElement.style.setProperty('--primary', colorSchemes[scheme].primary);
      document.documentElement.style.setProperty('--secondary', colorSchemes[scheme].secondary);
    }
  }
};

// Hook para utilizar o tema em componentes
export const useTheme = () => {
  return useThemeContext();
};

export default {
  inicializarTema,
  useTheme
};
