
import React from 'react';
import { useAutomacoes } from './AutomacaoHooks';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertCircle, BarChart3, CheckCircle, Clock, Copy, Edit, MoreHorizontal, PowerOff, Repeat, Trash2, User, Zap } from 'lucide-react';
import { Automacao } from '@/types/automacoes';
import TriggerRuleCard from './TriggerRuleCard';
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';
import AlertNotificationModal from './AlertNotificationModal';

interface ListaAutomacoesProps {
  onEdit: (automacao: Automacao) => void;
}

const ListaAutomacoes: React.FC<ListaAutomacoesProps> = ({ onEdit }) => {
  const { automacoes, carregando, alterarStatusAutomacao, excluirAutomacao } = useAutomacoes();
  const [filtroTipo, setFiltroTipo] = React.useState<string | null>(null);
  const [alertModalData, setAlertModalData] = React.useState<{
    show: boolean;
    automacaoId: string;
    title: string;
    message: string;
    action: () => void;
  }>({
    show: false,
    automacaoId: '',
    title: '',
    message: '',
    action: () => {}
  });
  const { toast } = useToast();

  const automacoesFiltered = filtroTipo
    ? automacoes.filter(auto => auto.tipo === filtroTipo)
    : automacoes;

  const handleStatusChange = (id: string, novoStatus: 'ativo' | 'pausado') => {
    alterarStatusAutomacao(id, novoStatus);
    toast({
      title: novoStatus === 'ativo' ? 'Automação ativada' : 'Automação pausada',
      description: `A automação foi ${novoStatus === 'ativo' ? 'ativada' : 'pausada'} com sucesso.`,
      variant: "default",
    });
  };

  const handleDelete = (id: string, nome: string) => {
    setAlertModalData({
      show: true,
      automacaoId: id,
      title: "Excluir automação",
      message: `Tem certeza que deseja excluir a automação "${nome}"? Esta ação não pode ser desfeita.`,
      action: () => {
        excluirAutomacao(id);
        toast({
          title: "Automação excluída",
          description: "A automação foi excluída permanentemente.",
          variant: "default",
        });
        setAlertModalData(prev => ({ ...prev, show: false }));
      }
    });
  };

  const handleDuplicate = (automacao: Automacao) => {
    // Em uma implementação real, isso chamaria a função para duplicar
    toast({
      title: "Função simulada",
      description: "A duplicação de automações será implementada em breve.",
      variant: "default",
    });
  };

  const handleAlertModalClose = () => {
    setAlertModalData(prev => ({ ...prev, show: false }));
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'relatorio':
        return <BarChart3 className="h-4 w-4" />;
      case 'alerta':
        return <AlertCircle className="h-4 w-4" />;
      case 'otimizacao':
        return <Zap className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'relatorio':
        return 'Relatório';
      case 'alerta':
        return 'Alerta';
      case 'otimizacao':
        return 'Otimização';
      default:
        return 'Desconhecido';
    }
  };

  const getFrequenciaLabel = (frequencia: string) => {
    switch (frequencia) {
      case 'diario':
        return 'Diário';
      case 'semanal':
        return 'Semanal';
      case 'mensal':
        return 'Mensal';
      case 'tempo_real':
        return 'Tempo real';
      case 'manual':
        return 'Manual';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pausado':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'finalizado':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'aguardando':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (carregando) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-32" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filtroTipo === null ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroTipo(null)}
        >
          Todas
        </Button>
        <Button
          variant={filtroTipo === 'alerta' ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroTipo('alerta')}
          className="flex items-center gap-1"
        >
          <AlertCircle className="h-4 w-4" /> Alertas
        </Button>
        <Button
          variant={filtroTipo === 'relatorio' ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroTipo('relatorio')}
          className="flex items-center gap-1"
        >
          <BarChart3 className="h-4 w-4" /> Relatórios
        </Button>
        <Button
          variant={filtroTipo === 'otimizacao' ? "default" : "outline"}
          size="sm"
          onClick={() => setFiltroTipo('otimizacao')}
          className="flex items-center gap-1"
        >
          <Zap className="h-4 w-4" /> Otimizações
        </Button>
      </div>

      {automacoesFiltered.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-2">
            {filtroTipo ? `Nenhuma automação do tipo "${getTipoLabel(filtroTipo)}" encontrada.` : 'Nenhuma automação encontrada.'}
          </p>
          <p className="text-sm text-muted-foreground">
            Clique no botão "Nova Automação" para criar uma.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {automacoesFiltered.map((automacao) => (
            <Card key={automacao.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className={cn("px-2 py-0.5", getStatusColor(automacao.status))}>
                    {automacao.status === 'ativo' ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <Clock className="h-3 w-3 mr-1" />
                    )}
                    {automacao.status === 'ativo' ? 'Ativo' : 'Pausado'}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Opções</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(automacao)}>
                        <Edit className="h-4 w-4 mr-2" /> Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(automacao)}>
                        <Copy className="h-4 w-4 mr-2" /> Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(automacao.id, automacao.status === 'ativo' ? 'pausado' : 'ativo')}>
                        <PowerOff className="h-4 w-4 mr-2" />
                        {automacao.status === 'ativo' ? 'Pausar' : 'Ativar'}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(automacao.id, automacao.nome)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-lg">{automacao.nome}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getTipoIcon(automacao.tipo)}
                    {getTipoLabel(automacao.tipo)}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Repeat className="h-3 w-3" />
                    {getFrequenciaLabel(automacao.frequencia)}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {automacao.clienteNome}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {automacao.tipo === 'alerta' && automacao.gatilho && (
                  <TriggerRuleCard automacao={automacao} />
                )}
                
                {automacao.tipo === 'relatorio' && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">Envio de relatório</div>
                      <div className="text-sm text-muted-foreground">
                        {automacao.destinatarios.length} destinatários
                      </div>
                    </div>
                    {automacao.proximaExecucao && (
                      <div className="text-sm mt-2 flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        Próximo envio: {format(new Date(automacao.proximaExecucao), "dd/MM, HH:mm", { locale: ptBR })}
                      </div>
                    )}
                  </div>
                )}
                
                {automacao.tipo === 'otimizacao' && automacao.gatilho && (
                  <TriggerRuleCard automacao={automacao} />
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <div className="text-xs text-muted-foreground">
                  {automacao.ultimaExecucao && (
                    <span>Última execução: {format(new Date(automacao.ultimaExecucao), "dd/MM/yyyy", { locale: ptBR })}</span>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => onEdit(automacao)}>
                  <Edit className="h-3.5 w-3.5 mr-1" /> Editar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertNotificationModal
        show={alertModalData.show}
        title={alertModalData.title}
        message={alertModalData.message}
        onConfirm={alertModalData.action}
        onCancel={handleAlertModalClose}
      />
    </div>
  );
};

export default ListaAutomacoes;
