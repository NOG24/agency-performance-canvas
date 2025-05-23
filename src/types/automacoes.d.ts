
export interface Automacao {
  id: string;
  nome: string;
  descricao: string;
  regra: string;
  campanha_id: string;
  tipo_alerta: 'email' | 'notificacao' | 'ambos';
  acao: 'pausar' | 'notificar' | 'ajustar_orcamento';
  ativo: boolean;
  condicao: 'maior_que' | 'menor_que' | 'igual_a';
  valor_condicao: number;
  mensagemPersonalizada?: string;
  criado_em: string;
}

export type StatusExecucao = 'sucesso' | 'falha' | 'pendente' | 'em_andamento';

export interface ExecucaoAutomacao {
  id: string;
  automacao_id: string;
  data_execucao: string;
  status: StatusExecucao;
  detalhes: string;
  responsavel?: string;
}
