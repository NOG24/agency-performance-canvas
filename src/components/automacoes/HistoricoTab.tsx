
import React, { useState } from 'react';
import { useHistoricoExecucoes } from './AutomacaoHooks';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const HistoricoTab: React.FC = () => {
  const { historico, carregando, filtrarPorAutomacao } = useHistoricoExecucoes();
  const [filtroAutomacao, setFiltroAutomacao] = useState<string | null>(null);
  
  const historicoFiltrado = filtrarPorAutomacao(filtroAutomacao);
  
  // Obter lista única de automações para o filtro
  const automacoes = [...new Set(historico.map(h => h.automacaoId))].map(id => {
    const item = historico.find(h => h.automacaoId === id);
    return { id, nome: item?.automacaoNome || 'Desconhecida' };
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sucesso':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'erro':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pendente':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sucesso':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {getStatusIcon(status)} Sucesso
          </Badge>
        );
      case 'erro':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {getStatusIcon(status)} Erro
          </Badge>
        );
      case 'pendente':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            {getStatusIcon(status)} Pendente
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">Desconhecido</Badge>
        );
    }
  };

  if (carregando) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full max-w-xs" />
        {[1, 2, 3].map(i => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Histórico de Execução</h3>
          <p className="text-sm text-muted-foreground">
            Veja o resultado das automações executadas
          </p>
        </div>
        
        <div className="w-64">
          <Select
            value={filtroAutomacao || ''}
            onValueChange={(value) => setFiltroAutomacao(value || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por automação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas automações</SelectItem>
              {automacoes.map((auto) => (
                <SelectItem key={auto.id} value={auto.id}>{auto.nome}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {historicoFiltrado.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Nenhum histórico de execução encontrado.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {historicoFiltrado.map((registro) => (
            <Card key={registro.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-lg">{registro.automacaoNome}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(registro.data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                    </div>
                    {getStatusBadge(registro.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm">{registro.mensagem}</p>
                {registro.detalhes && (
                  <div className="mt-2 text-sm bg-muted p-2 rounded-md">
                    <p className="font-mono">{registro.detalhes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricoTab;
