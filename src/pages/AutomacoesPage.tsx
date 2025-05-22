
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Zap, 
  Mail, 
  Calendar, 
  Plus, 
  Trash, 
  Edit, 
  UserCheck, 
  MailCheck,
  ClipboardList
} from 'lucide-react';
import AutomacaoForm from '@/components/automacoes/AutomacaoForm';
import ListaAutomacoes from '@/components/automacoes/ListaAutomacoes';
import HistoricoExecucoes from '@/components/automacoes/HistoricoExecucoes';

interface AutomacoesPageProps {
  userType: 'agency' | 'client';
}

// Mock data
const mockAutomacoes = [
  {
    id: '1',
    nome: 'Relatório Mensal - Cliente ABC',
    tipo: 'email',
    frequencia: 'mensal',
    ultimaExecucao: '2023-05-15T10:30:00Z',
    proximaExecucao: '2023-06-15T10:30:00Z',
    destinatarios: ['cliente@empresa.com', 'gerente@empresa.com'],
    clienteId: '123',
    clienteNome: 'Cliente ABC',
    campanhasIds: ['camp1', 'camp2'],
    status: 'ativa',
    mensagemPersonalizada: 'Segue o relatório mensal de desempenho das campanhas.',
  },
  {
    id: '2',
    nome: 'Resumo Semanal - Cliente XYZ',
    tipo: 'email',
    frequencia: 'semanal',
    ultimaExecucao: '2023-05-20T14:00:00Z',
    proximaExecucao: '2023-05-27T14:00:00Z',
    destinatarios: ['diretor@xyz.com'],
    clienteId: '456',
    clienteNome: 'Cliente XYZ',
    campanhasIds: ['camp3'],
    status: 'ativa',
    mensagemPersonalizada: 'Confira os resultados semanais das suas campanhas.',
  },
  {
    id: '3',
    nome: 'Alerta de Desempenho - Cliente DEF',
    tipo: 'email',
    frequencia: 'diaria',
    ultimaExecucao: '2023-05-22T08:00:00Z',
    proximaExecucao: '2023-05-23T08:00:00Z',
    destinatarios: ['marketing@def.com'],
    clienteId: '789',
    clienteNome: 'Cliente DEF',
    campanhasIds: ['camp4', 'camp5', 'camp6'],
    status: 'pausada',
    mensagemPersonalizada: 'Este é um relatório automático de desempenho das suas campanhas ativas.',
  },
];

const mockHistorico = [
  {
    id: '1',
    automacaoId: '1',
    automacaoNome: 'Relatório Mensal - Cliente ABC',
    dataExecucao: '2023-05-15T10:30:00Z',
    status: 'sucesso',
    destinatarios: ['cliente@empresa.com', 'gerente@empresa.com'],
    mensagem: 'Relatório enviado com sucesso.',
  },
  {
    id: '2',
    automacaoId: '1',
    automacaoNome: 'Relatório Mensal - Cliente ABC',
    dataExecucao: '2023-04-15T10:30:00Z',
    status: 'sucesso',
    destinatarios: ['cliente@empresa.com', 'gerente@empresa.com'],
    mensagem: 'Relatório enviado com sucesso.',
  },
  {
    id: '3',
    automacaoId: '2',
    automacaoNome: 'Resumo Semanal - Cliente XYZ',
    dataExecucao: '2023-05-20T14:00:00Z',
    status: 'sucesso',
    destinatarios: ['diretor@xyz.com'],
    mensagem: 'Relatório enviado com sucesso.',
  },
  {
    id: '4',
    automacaoId: '2',
    automacaoNome: 'Resumo Semanal - Cliente XYZ',
    dataExecucao: '2023-05-13T14:00:00Z',
    status: 'falha',
    destinatarios: ['diretor@xyz.com'],
    mensagem: 'Falha ao gerar o relatório: dados inconsistentes para a campanha camp3.',
  },
];

const AutomacoesPage: React.FC<AutomacoesPageProps> = ({ userType }) => {
  const { toast } = useToast();
  const [automacoes, setAutomacoes] = useState(mockAutomacoes);
  const [historico, setHistorico] = useState(mockHistorico);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [automacaoEmEdicao, setAutomacaoEmEdicao] = useState<any | null>(null);

  // Cria uma nova automação
  const handleNovaAutomacao = (dados: any) => {
    const novaAutomacao = {
      ...dados,
      id: `auto_${Math.random().toString(36).substr(2, 9)}`,
      ultimaExecucao: null,
      proximaExecucao: calcularProximaExecucao(dados.frequencia)
    };
    
    setAutomacoes([...automacoes, novaAutomacao]);
    setIsDialogOpen(false);
    
    toast({
      title: "Automação criada",
      description: `A automação "${dados.nome}" foi criada com sucesso.`,
    });
  };

  // Edita uma automação existente
  const handleEditarAutomacao = (dados: any) => {
    const novasAutomacoes = automacoes.map(auto => 
      auto.id === dados.id ? { ...auto, ...dados } : auto
    );
    
    setAutomacoes(novasAutomacoes);
    setAutomacaoEmEdicao(null);
    setIsDialogOpen(false);
    
    toast({
      title: "Automação atualizada",
      description: `A automação "${dados.nome}" foi atualizada com sucesso.`,
    });
  };

  // Exclui uma automação
  const handleExcluirAutomacao = (id: string) => {
    setAutomacoes(automacoes.filter(auto => auto.id !== id));
    
    toast({
      title: "Automação excluída",
      description: "A automação foi excluída com sucesso.",
    });
  };

  // Alterna o status da automação (ativa/pausada)
  const handleAlternarStatus = (id: string) => {
    const novasAutomacoes = automacoes.map(auto => 
      auto.id === id ? {
        ...auto,
        status: auto.status === 'ativa' ? 'pausada' : 'ativa'
      } : auto
    );
    
    setAutomacoes(novasAutomacoes);
    
    const automacao = automacoes.find(auto => auto.id === id);
    const novoStatus = automacao?.status === 'ativa' ? 'pausada' : 'ativa';
    
    toast({
      title: `Automação ${novoStatus}`,
      description: `A automação "${automacao?.nome}" foi ${novoStatus}.`,
    });
  };

  // Calcula a próxima execução com base na frequência
  const calcularProximaExecucao = (frequencia: string): string => {
    const agora = new Date();
    let proxima = new Date();
    
    switch (frequencia) {
      case 'diaria':
        proxima.setDate(agora.getDate() + 1);
        proxima.setHours(8, 0, 0, 0); // 8:00 AM
        break;
      case 'semanal':
        proxima.setDate(agora.getDate() + 7);
        proxima.setHours(14, 0, 0, 0); // 2:00 PM
        break;
      case 'mensal':
        proxima.setMonth(agora.getMonth() + 1);
        proxima.setDate(1);
        proxima.setHours(10, 0, 0, 0); // 10:00 AM
        break;
      default:
        proxima.setDate(agora.getDate() + 1);
    }
    
    return proxima.toISOString();
  };

  const handleExecutarAgora = (id: string) => {
    const automacao = automacoes.find(auto => auto.id === id);
    if (!automacao) return;
    
    // Simula a execução da automação
    const dataExecucao = new Date().toISOString();
    
    // Adiciona ao histórico
    const novoRegistro = {
      id: `hist_${Math.random().toString(36).substr(2, 9)}`,
      automacaoId: automacao.id,
      automacaoNome: automacao.nome,
      dataExecucao,
      status: 'sucesso',
      destinatarios: automacao.destinatarios,
      mensagem: 'Relatório enviado com sucesso via execução manual.',
    };
    
    setHistorico([novoRegistro, ...historico]);
    
    // Atualiza a última execução da automação
    const novasAutomacoes = automacoes.map(auto => 
      auto.id === id ? {
        ...auto,
        ultimaExecucao: dataExecucao
      } : auto
    );
    
    setAutomacoes(novasAutomacoes);
    
    toast({
      title: "Automação executada",
      description: `A automação "${automacao.nome}" foi executada manualmente com sucesso.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automações</h1>
          <p className="text-muted-foreground">
            Configure o envio automático de relatórios e alertas para seus clientes
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setAutomacaoEmEdicao(null)}>
              <Plus className="mr-2 h-4 w-4" /> Nova Automação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {automacaoEmEdicao ? 'Editar Automação' : 'Nova Automação'}
              </DialogTitle>
              <DialogDescription>
                Configure os detalhes da automação para gerar e enviar relatórios automaticamente.
              </DialogDescription>
            </DialogHeader>
            <AutomacaoForm 
              automacaoInicial={automacaoEmEdicao}
              onSalvar={automacaoEmEdicao ? handleEditarAutomacao : handleNovaAutomacao}
              onCancelar={() => {
                setAutomacaoEmEdicao(null);
                setIsDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="ativas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ativas" className="flex items-center">
            <Zap className="mr-2 h-4 w-4" />
            Automações Ativas
          </TabsTrigger>
          <TabsTrigger value="historico" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Histórico de Execuções
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ativas" className="space-y-4">
          <ListaAutomacoes 
            automacoes={automacoes}
            onEditar={(automacao) => {
              setAutomacaoEmEdicao(automacao);
              setIsDialogOpen(true);
            }}
            onExcluir={handleExcluirAutomacao}
            onAlternarStatus={handleAlternarStatus}
            onExecutarAgora={handleExecutarAgora}
          />
        </TabsContent>
        
        <TabsContent value="historico" className="space-y-4">
          <HistoricoExecucoes historico={historico} />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Informações sobre Automações
          </CardTitle>
          <CardDescription>
            Entenda como funcionam as automações e como configurá-las
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-2">Frequência de Envio</h3>
              <p className="text-sm text-muted-foreground">
                Configure automações para envios diários, semanais ou mensais conforme a necessidade do cliente.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <UserCheck className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-2">Destinatários Personalizados</h3>
              <p className="text-sm text-muted-foreground">
                Defina múltiplos destinatários para cada automação, incluindo diferentes stakeholders do cliente.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 border rounded-lg">
              <MailCheck className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold mb-2">Relatórios Personalizados</h3>
              <p className="text-sm text-muted-foreground">
                Escolha quais campanhas incluir em cada relatório automatizado para personalizar a experiência.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomacoesPage;
