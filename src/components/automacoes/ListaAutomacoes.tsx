
import React from 'react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PauseCircle,
  PlayCircle,
  Edit,
  Trash,
  Clock,
  Mail,
  AlertTriangle,
  BarChart,
  Zap
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Automacao {
  id: string;
  nome: string;
  tipo: 'email' | 'dashboard';
  frequencia: 'diaria' | 'semanal' | 'mensal';
  ultimaExecucao: string | null;
  proximaExecucao: string;
  destinatarios: string[];
  clienteId: string;
  clienteNome: string;
  campanhasIds: string[];
  status: 'ativa' | 'pausada';
  mensagemPersonalizada?: string;
}

interface ListaAutomacoesProps {
  automacoes: Automacao[];
  onEditar: (automacao: Automacao) => void;
  onExcluir: (id: string) => void;
  onAlternarStatus: (id: string) => void;
  onExecutarAgora: (id: string) => void;
}

const ListaAutomacoes: React.FC<ListaAutomacoesProps> = ({
  automacoes,
  onEditar,
  onExcluir,
  onAlternarStatus,
  onExecutarAgora
}) => {
  // Formata data para exibição
  const formatarData = (dataStr: string | null) => {
    if (!dataStr) return "Nunca executada";
    
    const data = new Date(dataStr);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Formata frequência para exibição
  const formatarFrequencia = (freq: string) => {
    switch (freq) {
      case 'diaria': return 'Diária';
      case 'semanal': return 'Semanal';
      case 'mensal': return 'Mensal';
      default: return freq;
    }
  };
  
  // Verifica se a próxima execução está atrasada
  const isAtrasada = (data: string) => {
    const agora = new Date();
    const proxima = new Date(data);
    return proxima < agora;
  };
  
  // Retorna a classe CSS para o status
  const getStatusClass = (status: string) => {
    return status === 'ativa' 
      ? 'bg-emerald-100 text-emerald-800' 
      : 'bg-amber-100 text-amber-800';
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Automação</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Próxima execução</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automacoes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Zap className="h-8 w-8 mb-2" />
                      <p>Nenhuma automação configurada.</p>
                      <p className="text-sm">Crie uma automação para começar a enviar relatórios automaticamente.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                automacoes.map((automacao) => (
                  <TableRow key={automacao.id}>
                    <TableCell>
                      <div className="flex items-center">
                        {automacao.tipo === 'email' ? (
                          <Mail className="h-4 w-4 mr-2 text-blue-600" />
                        ) : (
                          <BarChart className="h-4 w-4 mr-2 text-purple-600" />
                        )}
                        <div>
                          <div className="font-medium">{automacao.nome}</div>
                          <div className="text-xs text-muted-foreground">
                            {automacao.destinatarios.length === 1 
                              ? automacao.destinatarios[0]
                              : `${automacao.destinatarios.length} destinatários`}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{automacao.clienteNome}</TableCell>
                    <TableCell>
                      {formatarFrequencia(automacao.frequencia)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {isAtrasada(automacao.proximaExecucao) && automacao.status === 'ativa' && (
                          <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                        )}
                        <div>
                          {formatarData(automacao.proximaExecucao)}
                          {automacao.ultimaExecucao && (
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Última: {formatarData(automacao.ultimaExecucao)}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusClass(automacao.status)}
                      >
                        {automacao.status === 'ativa' ? 'Ativa' : 'Pausada'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onExecutarAgora(automacao.id)}
                          title="Executar agora"
                          disabled={automacao.status !== 'ativa'}
                        >
                          <Zap className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onAlternarStatus(automacao.id)}
                          title={automacao.status === 'ativa' ? 'Pausar' : 'Ativar'}
                        >
                          {automacao.status === 'ativa' ? (
                            <PauseCircle className="h-4 w-4" />
                          ) : (
                            <PlayCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditar(automacao)}
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Excluir"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir automação</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir a automação "{automacao.nome}"? 
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onExcluir(automacao.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListaAutomacoes;
