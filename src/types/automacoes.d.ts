
export type TipoAutomacao = 'email' | 'dashboard';
export type FrequenciaAutomacao = 'diaria' | 'semanal' | 'mensal';
export type StatusAutomacao = 'ativa' | 'pausada';
export type StatusExecucao = 'sucesso' | 'falha';
export type TipoGatilho = 'gasto_excessivo' | 'cpl_alto' | 'ctr_baixo' | 'roas_baixo';
export type AcaoAutomacao = 'alerta' | 'email' | 'notificacao';

export interface Automacao {
  id: string;
  nome: string;
  tipo: TipoAutomacao;
  frequencia: FrequenciaAutomacao;
  ultimaExecucao: string | null;
  proximaExecucao: string;
  destinatarios: string[];
  clienteId: string;
  clienteNome: string;
  campanhasIds: string[];
  status: StatusAutomacao;
  mensagemPersonalizada?: string;
  
  // Extended properties for automation triggers
  gatilho?: TipoGatilho;
  valorLimite?: number;
  acao?: AcaoAutomacao;
}

export interface HistoricoExecucao {
  id: string;
  automacaoId: string;
  automacaoNome: string;
  dataExecucao: string;
  status: StatusExecucao;
  destinatarios: string[];
  mensagem: string;
}
