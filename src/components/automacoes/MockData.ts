
import { Automacao, HistoricoExecucao, StatusExecucao } from '@/types/automacoes';

// Dados de automações de exemplo
export const mockAutomacoes: Automacao[] = [
  {
    id: '1',
    nome: 'Alerta de CPL Elevado',
    tipo: 'alerta',
    frequencia: 'diario',
    ultimaExecucao: '2025-04-15T10:30:00',
    proximaExecucao: '2025-04-16T10:30:00',
    destinatarios: ['ana@agencia.com', 'joao@agencia.com'],
    clienteId: 'client1',
    clienteNome: 'E-commerce XYZ',
    campanhasIds: ['camp1', 'camp2'],
    status: 'ativo',
    mensagemPersonalizada: 'Verificamos que o CPL está acima do limite estabelecido. Por favor, revise as configurações da campanha.',
    gatilho: 'cpl_acima',
    valorLimite: 50,
    acao: 'notificar'
  },
  {
    id: '2',
    nome: 'Relatório Semanal de Performance',
    tipo: 'relatorio',
    frequencia: 'semanal',
    ultimaExecucao: '2025-04-10T08:00:00',
    proximaExecucao: '2025-04-17T08:00:00',
    destinatarios: ['cliente@exemplo.com', 'gerente@agencia.com'],
    clienteId: 'client2',
    clienteNome: 'Loja Virtual ABC',
    campanhasIds: ['camp3', 'camp4', 'camp5'],
    status: 'ativo',
    mensagemPersonalizada: 'Segue relatório semanal das campanhas ativas.',
    acao: 'email'
  },
  {
    id: '3',
    nome: 'Pausar Campanhas com CTR Baixo',
    tipo: 'otimizacao',
    frequencia: 'tempo_real',
    ultimaExecucao: '2025-04-14T15:45:00',
    proximaExecucao: '2025-04-14T16:45:00',
    destinatarios: ['equipe@agencia.com'],
    clienteId: 'client1',
    clienteNome: 'E-commerce XYZ',
    campanhasIds: ['camp1', 'camp6'],
    status: 'pausado',
    mensagemPersonalizada: 'Campanhas pausadas automaticamente devido ao baixo CTR.',
    gatilho: 'ctr_abaixo',
    valorLimite: 0.8,
    acao: 'pausar'
  },
  {
    id: '4',
    nome: 'Ajuste Automático de Orçamento',
    tipo: 'otimizacao',
    frequencia: 'semanal',
    ultimaExecucao: '2025-04-12T09:00:00',
    proximaExecucao: '2025-04-19T09:00:00',
    destinatarios: ['gerente@agencia.com'],
    clienteId: 'client3',
    clienteNome: 'Serviços Tech',
    campanhasIds: ['camp7'],
    status: 'ativo',
    mensagemPersonalizada: 'Orçamento ajustado com base na performance da semana anterior.',
    gatilho: 'conversoes_abaixo',
    valorLimite: 10,
    acao: 'ajustar_orcamento'
  }
];

// Dados de histórico de execução de exemplo
export const mockHistorico: HistoricoExecucao[] = [
  {
    id: 'h1',
    automacaoId: '1',
    automacaoNome: 'Alerta de CPL Elevado',
    data: '2025-04-15T10:30:00',
    status: 'sucesso' as StatusExecucao,
    mensagem: 'Alerta enviado com sucesso.',
    detalhes: 'CPL atual: 65, Limite: 50'
  },
  {
    id: 'h2',
    automacaoId: '1',
    automacaoNome: 'Alerta de CPL Elevado',
    data: '2025-04-14T10:30:00',
    status: 'sucesso' as StatusExecucao,
    mensagem: 'Alerta enviado com sucesso.',
    detalhes: 'CPL atual: 58, Limite: 50'
  },
  {
    id: 'h3',
    automacaoId: '2',
    automacaoNome: 'Relatório Semanal de Performance',
    data: '2025-04-10T08:00:00',
    status: 'sucesso' as StatusExecucao,
    mensagem: 'Relatório enviado para todos os destinatários.'
  },
  {
    id: 'h4',
    automacaoId: '3',
    automacaoNome: 'Pausar Campanhas com CTR Baixo',
    data: '2025-04-14T15:45:00',
    status: 'erro' as StatusExecucao,
    mensagem: 'Falha ao pausar campanha camp6.',
    detalhes: 'Erro de permissão: Token expirado'
  },
  {
    id: 'h5',
    automacaoId: '3',
    automacaoNome: 'Pausar Campanhas com CTR Baixo',
    data: '2025-04-13T14:30:00',
    status: 'sucesso' as StatusExecucao,
    mensagem: 'Campanhas pausadas automaticamente.',
    detalhes: 'CTR atual: 0.5%, Limite: 0.8%'
  },
  {
    id: 'h6',
    automacaoId: '4',
    automacaoNome: 'Ajuste Automático de Orçamento',
    data: '2025-04-12T09:00:00',
    status: 'sucesso' as StatusExecucao,
    mensagem: 'Orçamento aumentado em 15%.',
    detalhes: 'Conversões: 8, Limite: 10'
  }
];
