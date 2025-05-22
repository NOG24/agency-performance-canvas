
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

// Tipos de dados
export interface KpiData {
  totalLeads: number;
  cpl: number;
  campanhasAtivas: number;
  receitaGerada: number;
  evolucaoSemanal: {
    semana: string;
    leads: number;
  }[];
}

// Dados fictícios para simulação
const dadosFicticios: Record<number, KpiData> = {
  7: {
    totalLeads: 145,
    cpl: 32.5,
    campanhasAtivas: 5,
    receitaGerada: 28750,
    evolucaoSemanal: [
      { semana: 'Seg', leads: 18 },
      { semana: 'Ter', leads: 22 },
      { semana: 'Qua', leads: 30 },
      { semana: 'Qui', leads: 25 },
      { semana: 'Sex', leads: 28 },
      { semana: 'Sáb', leads: 15 },
      { semana: 'Dom', leads: 7 },
    ]
  },
  14: {
    totalLeads: 312,
    cpl: 29.8,
    campanhasAtivas: 6,
    receitaGerada: 62400,
    evolucaoSemanal: [
      { semana: 'Semana 1', leads: 145 },
      { semana: 'Semana 2', leads: 167 },
    ]
  },
  30: {
    totalLeads: 680,
    cpl: 27.2,
    campanhasAtivas: 8,
    receitaGerada: 136000,
    evolucaoSemanal: [
      { semana: 'Semana 1', leads: 145 },
      { semana: 'Semana 2', leads: 167 },
      { semana: 'Semana 3', leads: 188 },
      { semana: 'Semana 4', leads: 180 },
    ]
  }
};

export const useKpiData = (periodo: number = 7) => {
  const [dados, setDados] = useState<KpiData | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      setCarregando(true);
      setErro(null);
      
      try {
        // Simulação de chamada à API do Supabase
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Em um cenário real, faríamos uma chamada como:
        // const { data, error } = await supabase
        //   .from('metricas')
        //   .select('*')
        //   .eq('periodo', periodo);
        
        // if (error) throw new Error(error.message);
        
        // Usando dados fictícios para demonstração
        const dadosDoPeriodo = dadosFicticios[periodo];
        setDados(dadosDoPeriodo);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setErro('Não foi possível carregar os dados. Tente novamente mais tarde.');
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, [periodo]);

  return {
    dados,
    carregando,
    erro
  };
};
