
import { Automacao, HistoricoExecucao } from '@/types/automacoes';

// Mock data para clientes e campanhas
export const clientes = [
  { id: '1', nome: 'Empresa ABC', email: 'contato@abc.com' },
  { id: '2', nome: 'XYZ Ltda', email: 'contato@xyz.com' },
  { id: '3', nome: 'Consultoria 123', email: 'contato@123consultoria.com' },
];

export const campanhas = [
  { id: '1', nome: 'Facebook Leads', clienteId: '1' },
  { id: '2', nome: 'Google Search', clienteId: '1' },
  { id: '3', nome: 'Instagram Stories', clienteId: '2' },
  { id: '4', nome: 'LinkedIn Ads', clienteId: '2' },
  { id: '5', nome: 'YouTube Campaign', clienteId: '3' },
];

// Mock data para automações
export const mockAutomacoes: Automacao[] = [
  {
    id: '1',
    nome: 'Relatório Mensal ABC',
    tipo: 'email',
    frequencia: 'mensal',
    ultimaExecucao: '2025-01-15T10:00:00',
    proximaExecucao: '2025-02-15T10:00:00',
    destinatarios: ['contato@abc.com'],
    clienteId: '1',
    clienteNome: 'Empresa ABC',
    campanhasIds: ['1', '2'],
    status: 'ativa',
    mensagemPersonalizada: 'Aqui está o relatório mensal de performance da sua empresa.',
    acao: 'email'
  },
  {
    id: '2',
    nome: 'Alerta de CPL Alto',
    tipo: 'dashboard',
    frequencia: 'diaria',
    ultimaExecucao: '2025-01-20T08:30:00',
    proximaExecucao: '2025-01-21T08:30:00',
    destinatarios: ['analista@nog.com'],
    clienteId: '2',
    clienteNome: 'XYZ Ltda',
    campanhasIds: ['3', '4'],
    status: 'ativa',
    gatilho: 'cpl_alto',
    valorLimite: 50,
    acao: 'alerta'
  },
  {
    id: '3',
    nome: 'Alerta de Gasto Excessivo',
    tipo: 'dashboard',
    frequencia: 'diaria',
    ultimaExecucao: '2025-01-19T09:00:00',
    proximaExecucao: '2025-01-20T09:00:00',
    destinatarios: ['gestao@nog.com'],
    clienteId: '3',
    clienteNome: 'Consultoria 123',
    campanhasIds: ['5'],
    status: 'ativa',
    gatilho: 'gasto_excessivo',
    valorLimite: 1000,
    acao: 'email'
  }
];

// Mock data para histórico
export const mockHistorico: HistoricoExecucao[] = [
  {
    id: '1',
    automacaoId: '1',
    automacaoNome: 'Relatório Mensal ABC',
    dataExecucao: '2025-01-15T10:00:00',
    status: 'sucesso',
    destinatarios: ['contato@abc.com'],
    mensagem: 'Relatório enviado com sucesso.'
  },
  {
    id: '2',
    automacaoId: '2',
    automacaoNome: 'Alerta de CPL Alto',
    dataExecucao: '2025-01-20T08:30:00',
    status: 'sucesso',
    destinatarios: ['analista@nog.com'],
    mensagem: 'O CPL da campanha Instagram Stories está em R$ 65,30, acima do limite de R$ 50,00.'
  },
  {
    id: '3',
    automacaoId: '3',
    automacaoNome: 'Alerta de Gasto Excessivo',
    dataExecucao: '2025-01-19T09:00:00',
    status: 'falha',
    destinatarios: ['gestao@nog.com'],
    mensagem: 'Falha ao enviar o alerta por email. Tente novamente mais tarde.'
  }
];
