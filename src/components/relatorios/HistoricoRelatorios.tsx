
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
  FileText, 
  Download, 
  Eye, 
  Mail,
  Calendar
} from 'lucide-react';

interface HistoricoRelatorio {
  id: string;
  nome: string;
  tipo: string;
  dataCriacao: string;
  tamanho: string;
  clienteNome?: string;
  criadoPor: string;
}

interface HistoricoRelatoriosProps {
  onVisualizar: (id: string) => void;
  userType: 'agency' | 'client';
}

// Dados mockados
const relatorios: HistoricoRelatorio[] = [
  {
    id: 'r1',
    nome: 'Relatório Mensal - Cliente ABC',
    tipo: 'PDF',
    dataCriacao: '2023-05-15T10:30:00Z',
    tamanho: '2.4 MB',
    clienteNome: 'Cliente ABC',
    criadoPor: 'João Silva'
  },
  {
    id: 'r2',
    nome: 'Performance Semanal - Cliente XYZ',
    tipo: 'PDF',
    dataCriacao: '2023-05-10T14:00:00Z',
    tamanho: '1.8 MB',
    clienteNome: 'Cliente XYZ',
    criadoPor: 'Ana Souza'
  },
  {
    id: 'r3',
    nome: 'Análise de Campanha Facebook',
    tipo: 'PDF',
    dataCriacao: '2023-05-05T08:45:00Z',
    tamanho: '3.2 MB',
    clienteNome: 'Cliente DEF',
    criadoPor: 'Carlos Mendes'
  },
  {
    id: 'r4',
    nome: 'Relatório Trimestral Q1',
    tipo: 'PDF',
    dataCriacao: '2023-04-01T11:15:00Z',
    tamanho: '5.7 MB',
    clienteNome: 'Cliente ABC',
    criadoPor: 'João Silva'
  },
  {
    id: 'r5',
    nome: 'Dashboard Instagram Ads',
    tipo: 'PDF',
    dataCriacao: '2023-03-22T09:30:00Z',
    tamanho: '2.1 MB',
    clienteNome: 'Cliente XYZ',
    criadoPor: 'Ana Souza'
  }
];

export const HistoricoRelatorios: React.FC<HistoricoRelatoriosProps> = ({ 
  onVisualizar,
  userType
}) => {
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
  
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Relatório</TableHead>
                {userType === 'agency' && <TableHead>Cliente</TableHead>}
                <TableHead>Data</TableHead>
                <TableHead>Criado por</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relatorios.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={userType === 'agency' ? 6 : 5} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <Calendar className="h-8 w-8 mb-2" />
                      <p>Nenhum relatório encontrado no histórico.</p>
                      <p className="text-sm">Os relatórios gerados aparecerão aqui.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                relatorios.map((relatorio) => (
                  <TableRow key={relatorio.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium">{relatorio.nome}</span>
                      </div>
                    </TableCell>
                    {userType === 'agency' && (
                      <TableCell>{relatorio.clienteNome}</TableCell>
                    )}
                    <TableCell>{formatarData(relatorio.dataCriacao)}</TableCell>
                    <TableCell>{relatorio.criadoPor}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{relatorio.tamanho}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onVisualizar(relatorio.id)}
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Baixar"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Enviar por e-mail"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
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
