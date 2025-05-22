
// Simple i18n implementation that can be expanded later
// This provides the foundation for multi-language support

import { createContext, useContext } from 'react';

// Available languages 
export const AVAILABLE_LANGUAGES = {
  'pt-BR': 'Português (Brasil)',
  'en-US': 'English (US)',
  'es': 'Español'
};

export type LanguageCode = keyof typeof AVAILABLE_LANGUAGES;

// Translation dictionaries
type TranslationDictionary = Record<string, string>;

const translations: Record<LanguageCode, TranslationDictionary> = {
  'pt-BR': {
    // Dashboard
    'dashboard': 'Painel',
    'overview': 'Visão Geral',
    'campaigns': 'Campanhas',
    'clients': 'Clientes',
    'observations': 'Observações',
    'automations': 'Automações',
    'reports': 'Relatórios',
    'settings': 'Configurações',
    'schedule': 'Agenda',
    
    // Common actions
    'save': 'Salvar',
    'cancel': 'Cancelar',
    'edit': 'Editar',
    'delete': 'Excluir',
    'create': 'Criar',
    'update': 'Atualizar',
    'view': 'Visualizar',
    'search': 'Buscar',
    'filter': 'Filtrar',
    'export': 'Exportar',
    'send': 'Enviar',
    'download': 'Baixar',
    
    // KPIs
    'leads': 'Leads',
    'cost': 'Custo',
    'cpl': 'CPL',
    'revenue': 'Receita',
    'roi': 'ROI',
    
    // Status
    'active': 'Ativo',
    'paused': 'Pausado',
    'completed': 'Finalizado',
    'pending': 'Pendente',
    
    // User types
    'admin': 'Administrador',
    'manager': 'Gestor',
    'analyst': 'Analista',
    'client': 'Cliente',
    'agency': 'Agência',
    
    // Settings
    'general': 'Geral',
    'branding': 'Personalização',
    'integrations': 'Integrações',
    'user_permissions': 'Permissões de usuário',
  },
  'en-US': {
    // Just add basic translations for demonstration
    'dashboard': 'Dashboard',
    'overview': 'Overview',
    'campaigns': 'Campaigns',
    'clients': 'Clients',
    // More translations would be added here
  },
  'es': {
    // Just add basic translations for demonstration
    'dashboard': 'Panel',
    'overview': 'Visión General',
    'campaigns': 'Campañas',
    'clients': 'Clientes',
    // More translations would be added here
  }
};

// Context for language settings
export interface I18nContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType>({
  language: 'pt-BR',
  setLanguage: () => {},
  t: (key) => key,
});

export const useI18n = () => useContext(I18nContext);

// Translation function
export const translate = (key: string, language: LanguageCode): string => {
  const dictionary = translations[language];
  return dictionary?.[key] || key; // Fallback to key if translation not found
};
