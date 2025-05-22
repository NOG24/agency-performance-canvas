
import React, { useState, useEffect } from 'react';
import { I18nContext, LanguageCode, translate } from '@/utils/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  defaultLanguage?: LanguageCode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children,
  defaultLanguage = 'pt-BR'
}) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Check for saved language preference in localStorage
    const savedLang = localStorage.getItem('nog_language');
    return (savedLang as LanguageCode) || defaultLanguage;
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('nog_language', lang);
    document.documentElement.lang = lang;
  };

  // Translation function
  const t = (key: string): string => {
    return translate(key, language);
  };

  // Set document language on first render
  useEffect(() => {
    document.documentElement.lang = language;
  }, []);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export default I18nProvider;
