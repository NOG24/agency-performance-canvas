
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Report {
  id: string;
  clienteNome: string;
  periodo: {
    inicio: string;
    fim: string;
  };
  dataEnvio: string;
  status: 'enviado' | 'agendado' | 'erro';
  destinatarios: string[];
  arquivoUrl?: string;
}

interface ReportHistoryTableProps {
  reports: Report[];
  isLoading?: boolean;
  onViewReport: (reportId: string) => void;
  onDownloadReport: (reportId: string) => void;
  onResendReport: (reportId: string) => void;
}

const ReportHistoryTable: React.FC<ReportHistoryTableProps> = ({
  reports,
  isLoading = false,
  onViewReport,
  onDownloadReport,
  onResendReport
}) => {
  // Helper to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Helper to format period
  const formatPeriod = (inicio: string, fim: string) => {
    const startDate = new Date(inicio);
    const endDate = new Date(fim);
    
    const formatOptions = { day: '2-digit', month: '2-digit', year: '2-digit' } as const;
    
    return `${new Intl.DateTimeFormat('pt-BR', formatOptions).format(startDate)} - ${new Intl.DateTimeFormat('pt-BR', formatOptions).format(endDate)}`;
  };

  // Helper to get status badge
  const getStatusBadge = (status: Report['status']) => {
    switch(status) {
      case 'enviado':
        return <Badge variant="default" className="bg-green-600">Enviado</Badge>;
      case 'agendado':
        return <Badge variant="secondary">Agendado</Badge>;
      case 'erro':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Mail className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          Nenhum relatório foi enviado ou agendado ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Período</TableHead>
            <TableHead>Data de Envio</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Destinatários</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.clienteNome}</TableCell>
              <TableCell>{formatPeriod(report.periodo.inicio, report.periodo.fim)}</TableCell>
              <TableCell>{formatDate(report.dataEnvio)}</TableCell>
              <TableCell>{getStatusBadge(report.status)}</TableCell>
              <TableCell>{report.destinatarios.length}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => onViewReport(report.id)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver</span>
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => onDownloadReport(report.id)}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => onResendReport(report.id)}
                  >
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Reenviar</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportHistoryTable;
