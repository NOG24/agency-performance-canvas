
export type TipoAutomacao = 'email' | 'dashboard';
export type FrequenciaAutomacao = 'diaria' | 'semanal' | 'mensal';
export type StatusAutomacao = 'ativa' | 'pausada';
export type StatusExecucao = 'sucesso' | 'falha' | 'pendente' | 'em_andamento';
export type TipoGatilho = 'gasto_excessivo' | 'cpl_alto' | 'ctr_baixo' | 'roas_baixo';
export type AcaoAutomacao = 'alerta' | 'email' | 'notificacao';

export interface Automacao {
  id: string;
  nome: string;
  descricao?: string;
  regra?: string;
  campanha_id?: string;
  tipo_alerta?: 'email' | 'notificacao' | 'ambos';
  acao: 'pausar' | 'notificar' | 'ajustar_orcamento' | 'email' | 'notificacao' | 'alerta';
  ativo?: boolean;
  condicao?: 'maior_que' | 'menor_que' | 'igual_a';
  valor_condicao?: number;
  mensagemPersonalizada?: string;
  criado_em?: string;
  
  // Additional properties needed by components
  tipo?: TipoAutomacao;
  frequencia?: FrequenciaAutomacao;
  ultimaExecucao?: string | null;
  proximaExecucao?: string;
  destinatarios?: string[];
  clienteId?: string;
  clienteNome?: string;
  campanhasIds?: string[];
  status?: StatusAutomacao;
  gatilho?: TipoGatilho;
  valorLimite?: number;
}

export interface ExecucaoAutomacao {
  id: string;
  automacao_id: string;
  data_execucao: string;
  status: StatusExecucao;
  detalhes: string;
  responsavel?: string;
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
