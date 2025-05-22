
/**
 * Formata um valor numérico como moeda em Real brasileiro
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Formata um número com separadores de milhar
 */
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

/**
 * Formata uma data para o padrão brasileiro
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

/**
 * Obtém uma string representando o período baseado em dias
 */
export const getPeriodLabel = (days: number): string => {
  const hoje = new Date();
  const inicio = new Date();
  inicio.setDate(hoje.getDate() - days);
  
  return `${formatDate(inicio)} - ${formatDate(hoje)}`;
};
