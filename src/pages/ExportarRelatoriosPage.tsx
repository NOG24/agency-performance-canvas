
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckIcon, Download, FileText, Clock, ChevronRight } from "lucide-react";
import { DateRange } from "react-day-picker";
import ReportPDFView from '@/components/relatorios/ReportPDFView';
import ReportHistoryTable from '@/components/relatorios/ReportHistoryTable';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

interface Cliente {
  id: string;
  nome: string;
  email: string;
}

interface Campanha {
  id: string;
  nome: string;
  clienteId: string;
}

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

const ExportarRelatoriosPage: React.FC = () => {
  const { toast } = useToast();
  
  // Estados do componente
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedView, setSelectedView] = useState<string>('templates');
  const [showReportPreview, setShowReportPreview] = useState(false);
  
  // Mock data
  const clientes: Cliente[] = [
    { id: '1', nome: 'Empresa ABC', email: 'contato@abc.com' },
    { id: '2', nome: 'XYZ Ltda', email: 'contato@xyz.com' },
    { id: '3', nome: 'Consultoria 123', email: 'contato@123consultoria.com' },
  ];
  
  const campanhas: Campanha[] = [
    { id: '1', nome: 'Facebook Leads', clienteId: '1' },
    { id: '2', nome: 'Google Search', clienteId: '1' },
    { id: '3', nome: 'Instagram Stories', clienteId: '2' },
    { id: '4', nome: 'LinkedIn Ads', clienteId: '2' },
    { id: '5', nome: 'YouTube Campaign', clienteId: '3' },
  ];
  
  const relatoriosEnviados: Report[] = [
    {
      id: '1',
      clienteNome: 'Empresa ABC',
      periodo: {
        inicio: '2025-01-01',
        fim: '2025-01-31'
      },
      dataEnvio: '2025-02-01T10:30:00',
      status: 'enviado',
      destinatarios: ['contato@abc.com', 'gerente@abc.com']
    },
    {
      id: '2',
      clienteNome: 'XYZ Ltda',
      periodo: {
        inicio: '2025-01-01',
        fim: '2025-01-31'
      },
      dataEnvio: '2025-02-02T11:15:00',
      status: 'enviado',
      destinatarios: ['contato@xyz.com']
    },
    {
      id: '3',
      clienteNome: 'Consultoria 123',
      periodo: {
        inicio: '2025-01-15',
        fim: '2025-02-14'
      },
      dataEnvio: '2025-02-15T09:00:00',
      status: 'erro',
      destinatarios: ['contato@123consultoria.com']
    }
  ];
  
  // Templates de relatórios
  const reportTemplates = [
    {
      id: 'basic',
      name: 'Relatório Básico',
      description: 'Relatório simples com KPIs principais e gráficos de evolução.',
      icon: <FileText className="h-10 w-10 text-blue-500" />,
    },
    {
      id: 'complete',
      name: 'Relatório Completo',
      description: 'Relatório detalhado com todos os dados de performance, análise de campanha e recomendações.',
      icon: <FileText className="h-10 w-10 text-green-500" />,
      recommended: true,
    },
    {
      id: 'executive',
      name: 'Relatório Executivo',
      description: 'Resumo executivo focado em resultados de negócio e ROI.',
      icon: <FileText className="h-10 w-10 text-purple-500" />,
    }
  ];
  
  // Handlers
  const handleGenerateReport = () => {
    toast({
      title: "Relatório gerado com sucesso",
      description: "O relatório foi gerado e está pronto para download.",
    });
    setShowReportPreview(true);
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Download iniciado",
      description: "O download do relatório foi iniciado.",
    });
  };
  
  const handleShareReport = () => {
    toast({
      title: "Link compartilhável",
      description: "Um link para o relatório foi copiado para a área de transferência.",
    });
  };
  
  const handleViewReport = (reportId: string) => {
    setShowReportPreview(true);
  };
  
  const handleDownloadHistoryReport = (reportId: string) => {
    toast({
      title: "Download iniciado",
      description: "O download do relatório foi iniciado.",
    });
  };
  
  const handleResendReport = (reportId: string) => {
    toast({
      title: "Relatório reenviado",
      description: "O relatório foi reenviado para os destinatários.",
    });
  };

  return (
    <div className="container mx-auto p-6">
      {showReportPreview ? (
        <ReportPDFView
          clientName={clientes.find(c => c.id === selectedClient)?.nome || "Cliente"}
          agencyName="NOG Performance"
          period={{
            start: dateRange?.from || new Date(),
            end: dateRange?.to || new Date()
          }}
          onDownload={handleDownloadReport}
          onShare={handleShareReport}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Relatórios</h1>
            <Button onClick={() => setShowReportPreview(true)}>Visualizar Exemplo</Button>
          </div>
          
          <Tabs value={selectedView} onValueChange={setSelectedView}>
            <TabsList className="mb-4">
              <TabsTrigger value="templates">Gerar Relatório</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <h2 className="text-lg font-medium mb-4">Configurar Relatório</h2>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Cliente</label>
                        <Select value={selectedClient} onValueChange={setSelectedClient}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o cliente" />
                          </SelectTrigger>
                          <SelectContent>
                            {clientes.map(cliente => (
                              <SelectItem key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Período</label>
                        <DateRangePicker value={dateRange} onChange={setDateRange} />
                      </div>
                      
                      <Button 
                        className="w-full mt-4" 
                        onClick={handleGenerateReport}
                        disabled={!selectedClient || !dateRange?.from || !dateRange?.to}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Gerar Relatório
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    <h2 className="text-lg font-medium">Escolha o Modelo de Relatório</h2>
                    
                    {reportTemplates.map((template) => (
                      <div 
                        key={template.id}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary cursor-pointer transition-all"
                        onClick={() => {}}
                      >
                        <div className="shrink-0">{template.icon}</div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{template.name}</h3>
                            {template.recommended && (
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                                Recomendado
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-6">
                <h2 className="text-lg font-medium">Histórico de Relatórios</h2>
                
                <ReportHistoryTable
                  reports={relatoriosEnviados}
                  onViewReport={handleViewReport}
                  onDownloadReport={handleDownloadHistoryReport}
                  onResendReport={handleResendReport}
                />
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ExportarRelatoriosPage;
