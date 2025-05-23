
import { useState } from 'react';
import { mockAutomacoes, mockHistorico } from './MockData';
import { Automacao, HistoricoExecucao } from '@/types/automacoes';

export const useAutomacoes = () => {
  const [automacoes, setAutomacoes] = useState<Automacao[]>(mockAutomacoes);
  const [carregando, setCarregando] = useState(false);

  const adicionarAutomacao = (novaAutomacao: Automacao) => {
    setAutomacoes(prev => [{ ...novaAutomacao, id: `auto_${Date.now()}` }, ...prev]);
    return true;
  };

  const atualizarAutomacao = (automacao: Automacao) => {
    setAutomacoes(prev => 
      prev.map(item => item.id === automacao.id ? automacao : item)
    );
    return true;
  };

  const alterarStatusAutomacao = (id: string, novoStatus: 'ativo' | 'pausado') => {
    setAutomacoes(prev => 
      prev.map(item => item.id === id ? { ...item, status: novoStatus } : item)
    );
    return true;
  };

  const excluirAutomacao = (id: string) => {
    setAutomacoes(prev => prev.filter(item => item.id !== id));
    return true;
  };

  return {
    automacoes,
    carregando,
    adicionarAutomacao,
    atualizarAutomacao,
    alterarStatusAutomacao,
    excluirAutomacao
  };
};

export const useHistoricoExecucoes = () => {
  const [historico, setHistorico] = useState<HistoricoExecucao[]>(mockHistorico);
  const [carregando, setCarregando] = useState(false);

  const filtrarPorAutomacao = (automacaoId: string | null) => {
    if (!automacaoId) return historico;
    return historico.filter(item => item.automacaoId === automacaoId);
  };

  return {
    historico,
    carregando,
    filtrarPorAutomacao
  };
};
