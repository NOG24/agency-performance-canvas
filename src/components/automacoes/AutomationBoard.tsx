
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, AlertTriangle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Automacao, TipoGatilho } from '@/types/automacoes';

interface AutomationBoardProps {
  automacoes: Automacao[];
  onCreateAutomation: () => void;
  onEditAutomation: (automacao: Automacao) => void;
}

const gatilhoLabels: Record<TipoGatilho, string> = {
  'cpl_acima': 'CPL Alto',
  'cpl_abaixo': 'CPL Baixo',
  'ctr_abaixo': 'CTR Baixo',
  'conversoes_abaixo': 'Conversões Baixas',
  'orcamento_consumido': 'Orçamento Consumido'
};

const gatilhoCores: Record<TipoGatilho, string> = {
  'cpl_acima': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'cpl_abaixo': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  'ctr_abaixo': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'conversoes_abaixo': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'orcamento_consumido': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
};

export const AutomationBoard: React.FC<AutomationBoardProps> = ({
  automacoes,
  onCreateAutomation,
  onEditAutomation
}) => {
  const emailAutomacoes = automacoes.filter(auto => auto.tipo === 'relatorio');
  const gatilhoAutomacoes = automacoes.filter(auto => auto.gatilho);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Automações</h2>
        <Button onClick={onCreateAutomation}>
          <Plus className="mr-2 h-4 w-4" /> Nova Automação
        </Button>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="email">Relatórios Automáticos</TabsTrigger>
          <TabsTrigger value="gatilhos">Gatilhos de Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="space-y-4">
          {emailAutomacoes.length === 0 ? (
            <Card className="border-dashed border-2 bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">
                  Você ainda não criou automações de envio de relatórios.
                </p>
                <Button onClick={onCreateAutomation}>
                  <Plus className="mr-2 h-4 w-4" /> Criar Automação de Relatório
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {emailAutomacoes.map((automacao) => (
                <Card 
                  key={automacao.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onEditAutomation(automacao)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base font-medium">{automacao.nome}</CardTitle>
                      <Badge variant={automacao.status === 'ativo' ? 'default' : 'outline'}>
                        {automacao.status === 'ativo' ? 'Ativa' : 'Pausada'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">Cliente: {automacao.clienteNome}</p>
                    <p className="text-sm text-muted-foreground">
                      Frequência: {automacao.frequencia === 'diario' ? 'Diária' : 
                        automacao.frequencia === 'semanal' ? 'Semanal' : 'Mensal'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Próxima execução: {new Date(automacao.proximaExecucao).toLocaleDateString('pt-BR')}
                    </p>
                    <div className="flex justify-end pt-2">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="gatilhos" className="space-y-4">
          {gatilhoAutomacoes.length === 0 ? (
            <Card className="border-dashed border-2 bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">
                  Você ainda não criou gatilhos de performance.
                </p>
                <Button onClick={onCreateAutomation}>
                  <Plus className="mr-2 h-4 w-4" /> Criar Gatilho de Performance
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {gatilhoAutomacoes.map((automacao) => (
                <Card 
                  key={automacao.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onEditAutomation(automacao)}
                >
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <CardTitle className="text-base font-medium flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                      {automacao.nome}
                    </CardTitle>
                    <Badge variant={automacao.status === 'ativo' ? 'default' : 'outline'}>
                      {automacao.status === 'ativo' ? 'Ativo' : 'Pausado'}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">Cliente: {automacao.clienteNome}</p>
                    
                    {automacao.gatilho && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${gatilhoCores[automacao.gatilho]}`}>
                          {gatilhoLabels[automacao.gatilho]}
                          {automacao.valorLimite && ` > ${automacao.valorLimite}`}
                        </span>
                      </div>
                    )}
                    
                    <p className="text-sm text-muted-foreground mt-2">
                      Ação: {automacao.acao === 'email' ? 'Enviar e-mail' : 
                             automacao.acao === 'notificacao' ? 'Notificação' : 'Apenas alertar'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutomationBoard;
