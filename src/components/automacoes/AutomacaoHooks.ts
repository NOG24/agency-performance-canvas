
import { useState, useEffect } from 'react';
import { Automacao, HistoricoExecucao, TipoGatilho, AcaoAutomacao } from '@/types/automacoes';
import { useToast } from '@/components/ui/use-toast';
import { mockAutomacoes, mockHistorico } from './MockData';

export const useAutomacoes = () => {
  const { toast } = useToast();
  const [automacoes, setAutomacoes] = useState<Automacao[]>([]);
  const [historico, setHistorico] = useState<HistoricoExecucao[]>([]);
  
  // Estado para o formulário de nova automação
  const [formData, setFormData] = useState<{
    nome: string;
    tipo: 'email' | 'dashboard';
    frequencia: 'diaria' | 'semanal' | 'mensal';
    clienteId: string;
    clienteNome: string;
    destinatarios: string[];
    campanhasIds: string[];
    status: 'ativa' | 'pausada';
    mensagemPersonalizada: string;
    gatilho?: TipoGatilho;
    valorLimite?: number;
    acao: AcaoAutomacao;
  }>({
    nome: '',
    tipo: 'email',
    frequencia: 'mensal',
    clienteId: '',
    clienteNome: '',
    destinatarios: [],
    campanhasIds: [],
    status: 'ativa',
    mensagemPersonalizada: '',
    acao: 'email'
  });

  useEffect(() => {
    // Simulando carregamento de dados do backend
    setAutomacoes(mockAutomacoes);
    setHistorico(mockHistorico);
  }, []);

  const handleCreateAutomation = (editingAutomacao: Automacao | null, setShowAddModal: (show: boolean) => void) => {
    if (!editingAutomacao) {
      setFormData({
        nome: '',
        tipo: 'email',
        frequencia: 'mensal',
        clienteId: '',
        clienteNome: '',
        destinatarios: [],
        campanhasIds: [],
        status: 'ativa',
        mensagemPersonalizada: '',
        acao: 'email'
      });
    }
    setShowAddModal(true);
  };
  
  const handleEditAutomation = (automacao: Automacao, setEditingAutomacao: (auto: Automacao) => void, setShowAddModal: (show: boolean) => void) => {
    setEditingAutomacao(automacao);
    setFormData({
      nome: automacao.nome,
      tipo: automacao.tipo || 'email',
      frequencia: automacao.frequencia || 'mensal',
      clienteId: automacao.clienteId || '',
      clienteNome: automacao.clienteNome || '',
      destinatarios: automacao.destinatarios || [],
      campanhasIds: automacao.campanhasIds || [],
      status: automacao.status || 'ativa',
      mensagemPersonalizada: automacao.mensagemPersonalizada || '',
      gatilho: automacao.gatilho,
      valorLimite: automacao.valorLimite,
      acao: automacao.acao
    });
    setShowAddModal(true);
  };
  
  const handleSaveAutomation = (
    editingAutomacao: Automacao | null, 
    setShowAddModal: (show: boolean) => void
  ) => {
    if (!formData.nome || !formData.clienteId || formData.campanhasIds.length === 0) {
      toast({
        title: "Erro ao salvar",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    const newAutomacao: Automacao = {
      id: editingAutomacao ? editingAutomacao.id : `new-${Date.now()}`,
      nome: formData.nome,
      tipo: formData.tipo,
      frequencia: formData.frequencia,
      clienteId: formData.clienteId,
      clienteNome: formData.clienteNome,
      destinatarios: formData.destinatarios,
      campanhasIds: formData.campanhasIds,
      status: formData.status,
      mensagemPersonalizada: formData.mensagemPersonalizada,
      ultimaExecucao: editingAutomacao ? editingAutomacao.ultimaExecucao : null,
      proximaExecucao: new Date(Date.now() + 86400000).toISOString(), // Amanhã
      acao: formData.acao,
      gatilho: formData.gatilho,
      valorLimite: formData.valorLimite
    };
    
    if (editingAutomacao) {
      setAutomacoes(automacoes.map(a => a.id === editingAutomacao.id ? newAutomacao : a));
      toast({
        title: "Automação atualizada",
        description: `A automação "${newAutomacao.nome}" foi atualizada com sucesso.`,
      });
    } else {
      setAutomacoes([...automacoes, newAutomacao]);
      toast({
        title: "Automação criada",
        description: `A automação "${newAutomacao.nome}" foi criada com sucesso.`,
      });
    }
    
    setShowAddModal(false);
  };
  
  const handleToggleAutomation = (id: string, active: boolean) => {
    setAutomacoes(automacoes.map(a => {
      if (a.id === id) {
        return { ...a, status: active ? 'ativa' : 'pausada' };
      }
      return a;
    }));
    
    toast({
      title: active ? "Automação ativada" : "Automação pausada",
      description: `A automação foi ${active ? 'ativada' : 'pausada'} com sucesso.`,
    });
  };

  return {
    automacoes,
    setAutomacoes,
    historico,
    setHistorico,
    formData,
    setFormData,
    handleCreateAutomation,
    handleEditAutomation,
    handleSaveAutomation,
    handleToggleAutomation
  };
};
