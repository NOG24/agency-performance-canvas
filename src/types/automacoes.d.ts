
export interface Automacao {
  id: string;
  nome: string;
  tipo: TipoAutomacao;
  frequencia: FrequenciaAutomacao;
  ultimaExecucao?: string;
  proximaExecucao?: string;
  destinatarios: string[];
  clienteId: string;
  clienteNome: string;
  campanhasIds: string[];
  status: StatusAutomacao;
  mensagemPersonalizada: string;
  gatilho?: TipoGatilho;
  valorLimite?: number;
  acao: AcaoAutomacao;
}

export type TipoAutomacao = 'relatorio' | 'alerta' | 'otimizacao';
export type FrequenciaAutomacao = 'diario' | 'semanal' | 'mensal' | 'tempo_real' | 'manual';
export type StatusAutomacao = 'ativo' | 'pausado' | 'finalizado' | 'aguardando';
export type TipoGatilho = 'cpl_acima' | 'cpl_abaixo' | 'ctr_abaixo' | 'conversoes_abaixo' | 'orcamento_consumido';
export type AcaoAutomacao = 'pausar' | 'notificar' | 'ajustar_orcamento' | 'email' | 'notificacao' | 'alerta';

export interface HistoricoExecucao {
  id: string;
  automacaoId: string;
  automacaoNome: string;
  data: string;
  status: StatusExecucao;
  mensagem: string;
  detalhes?: string;
}

export type StatusExecucao = 'sucesso' | 'erro' | 'pendente';
