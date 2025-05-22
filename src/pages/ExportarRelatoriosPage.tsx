
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  FileText, 
  BarChart, 
  Mail, 
  Download,
  Calendar,
  Users,
  CheckCircle,
  PieChart,
  LineChart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FormRelatorioPersonalizado } from '@/components/relatorios/FormRelatorioPersonalizado';
import { ModelosDisponiveis } from '@/components/relatorios/ModelosDisponiveis';
import { HistoricoRelatorios } from '@/components/relatorios/HistoricoRelatorios';
import { EnviarRelatorioDialog } from '@/components/relatorios/EnviarRelatorioDialog';

interface ExportarRelatoriosPageProps {
  userType: 'agency' | 'client';
}

const ExportarRelatoriosPage: React.FC<ExportarRelatoriosPageProps> = ({ userType }) => {
  const { toast } = useToast();
  const [relatorioSelecionado, setRelatorioSelecionado] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleExportarPDF = (tipo: string) => {
    toast({
      title: "Gerando relatório",
      description: "Seu relatório está sendo gerado e será baixado em instantes.",
    });
    
    // Simulamos o download após um pequeno delay
    setTimeout(() => {
      toast({
        title: "Relatório pronto",
        description: "Seu relatório foi gerado com sucesso!",
      });
    }, 2000);
  };

  const handleEnviarEmail = (dados: any) => {
    toast({
      title: "Enviando relatório",
      description: `Enviando relatório para ${dados.destinatarios.length} destinatários.`,
    });
    
    // Simulamos o envio após um pequeno delay
    setTimeout(() => {
      setOpenDialog(false);
      
      toast({
        title: "Relatório enviado",
        description: "O relatório foi enviado com sucesso para os destinatários.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Exporte ou envie relatórios personalizados de desempenho
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => handleExportarPDF('completo')}>
            <FileText className="mr-2 h-4 w-4" /> Exportar Completo
          </Button>
          <Button onClick={() => setOpenDialog(true)}>
            <Mail className="mr-2 h-4 w-4" /> Enviar Relatório
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personalizado" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personalizado" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Relatório Personalizado
          </TabsTrigger>
          <TabsTrigger value="modelos" className="flex items-center">
            <PieChart className="mr-2 h-4 w-4" />
            Modelos
          </TabsTrigger>
          <TabsTrigger value="historico" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personalizado" className="space-y-4">
          <FormRelatorioPersonalizado 
            onExportar={handleExportarPDF} 
            onEnviar={() => setOpenDialog(true)}
            userType={userType}
          />
        </TabsContent>
        
        <TabsContent value="modelos" className="space-y-4">
          <ModelosDisponiveis 
            onSelecionarModelo={(id) => {
              setRelatorioSelecionado(id);
              setOpenDialog(true);
            }}
          />
        </TabsContent>
        
        <TabsContent value="historico" className="space-y-4">
          <HistoricoRelatorios 
            onVisualizar={(id) => handleExportarPDF('historico')} 
            userType={userType}
          />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="mr-2 h-5 w-5" />
            Relatórios Inteligentes
          </CardTitle>
          <CardDescription>
            Nosso sistema adiciona automaticamente insights estratégicos aos seus relatórios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Tendências Automáticas</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Análise automática de tendências positivas e negativas com base nos dados históricos.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Comparativos Inteligentes</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Compare automaticamente o desempenho atual com períodos anteriores.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Recomendações</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Sugestões de melhoria com base nos desvios de performance identificados.
              </p>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Exemplo de Insight Automático</h3>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-emerald-100 text-emerald-800">Positivo</Badge>
                <p>"O CPC reduziu 23% nas últimas 2 semanas, indicando melhoria na relevância dos anúncios."</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-amber-100 text-amber-800">Atenção</Badge>
                <p>"A taxa de conversão caiu 5% em relação ao mês anterior. Recomendamos revisar as landing pages."</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800">Oportunidade</Badge>
                <p>"O canal que mais cresceu foi Instagram (+45%). Considere aumentar o orçamento deste canal."</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <EnviarRelatorioDialog 
        open={openDialog}
        onOpenChange={setOpenDialog}
        onEnviar={handleEnviarEmail}
        relatorioSelecionadoId={relatorioSelecionado}
      />
    </div>
  );
};

export default ExportarRelatoriosPage;
