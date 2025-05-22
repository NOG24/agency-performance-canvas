
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
  CheckCircle,
  XCircle,
  Clock,
  File,
  Users,
  Search,
  Calendar
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HistoricoExecucao {
  id: string;
  automacaoId: string;
  automacaoNome: string;
  dataExecucao: string;
  status: 'sucesso' | 'falha';
  destinatarios: string[];
  mensagem: string;
}

interface HistoricoExecucoesProps {
  historico: HistoricoExecucao[];
}

const HistoricoExecucoes: React.FC<HistoricoExecucoesProps> = ({ historico }) => {
  // Formata data para exibição
  const formatarData = (dataStr: string) => {
    const data = new Date(dataStr);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Retorna a classe CSS para o status
  const getStatusClass = (status: string) => {
    return status === 'sucesso' 
      ? 'bg-emerald-100 text-emerald-800' 
      : 'bg-red-100 text-red-800';
  };
  
  // Filtra histórico recente (últimos 30 dias)
  const historicoRecente = historico.sort((a, b) => 
    new Date(b.dataExecucao).getTime() - new Date(a.dataExecucao).getTime()
  );
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data de execução</TableHead>
                <TableHead>Automação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destinatários</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historicoRecente.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Calendar className="h-8 w-8 mb-2" />
                      <p>Nenhum histórico de execução disponível.</p>
                      <p className="text-sm">O histórico de execuções aparecerá aqui quando as automações forem executadas.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                historicoRecente.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        {formatarData(item.dataExecucao)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.automacaoNome}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusClass(item.status)}
                      >
                        <div className="flex items-center">
                          {item.status === 'sucesso' ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {item.status === 'sucesso' ? 'Sucesso' : 'Falha'}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        {item.destinatarios.length === 1 
                          ? item.destinatarios[0]
                          : `${item.destinatarios.length} destinatários`}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Ver detalhes"
                            >
                              <Search className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Detalhes da execução</DialogTitle>
                              <DialogDescription>
                                Informações detalhadas sobre a execução da automação.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Automação</h4>
                                <p className="text-sm">{item.automacaoNome}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Data e hora</h4>
                                <p className="text-sm">{formatarData(item.dataExecucao)}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Status</h4>
                                <Badge 
                                  variant="outline" 
                                  className={getStatusClass(item.status)}
                                >
                                  {item.status === 'sucesso' ? 'Sucesso' : 'Falha'}
                                </Badge>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Destinatários</h4>
                                <ul className="text-sm space-y-1">
                                  {item.destinatarios.map((email, index) => (
                                    <li key={index}>{email}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Mensagem</h4>
                                <p className="text-sm">{item.mensagem}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {item.status === 'sucesso' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Baixar relatório"
                          >
                            <File className="h-4 w-4" />
                          </Button>
                        )}
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

export default HistoricoExecucoes;
