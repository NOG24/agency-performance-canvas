import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { Automacao, HistoricoExecucao, TipoAutomacao, FrequenciaAutomacao, StatusAutomacao, TipoGatilho, AcaoAutomacao, StatusExecucao } from '@/types/automacoes';
import AutomationBoard from '@/components/automacoes/AutomationBoard';
import TriggerRuleCard from '@/components/automacoes/TriggerRuleCard';
import AlertNotificationModal from '@/components/automacoes/AlertNotificationModal';

// This is a mock component that would be replaced with actual API calls
const AutomacoesPage: React.FC = () => {
  const { toast } = useToast();
  
  // Estado para os modais
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAutomacao, setEditingAutomacao] = useState<Automacao | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  
  // Estados para as automações e histórico
  const [automacoes, setAutomacoes] = useState<Automacao[]>([]);
  const [historico, setHistorico] = useState<HistoricoExecucao[]>([]);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    message: '',
    type: 'cpl_alto' as TipoGatilho | 'success',
    campaignName: '',
    metric: '',
    value: 0,
    threshold: 0
  });
  
  // Estado para o formulário de nova automação
  const [formData, setFormData] = useState<{
    nome: string;
    tipo: TipoAutomacao;
    frequencia: FrequenciaAutomacao;
    clienteId: string;
    clienteNome: string;
    destinatarios: string[];
    campanhasIds: string[];
    status: StatusAutomacao;
    mensagemPersonalizada: string;
    gatilho?: TipoGatilho;
    valorLimite?: number;
    acao: AcaoAutomacao;
  }>({
    nome: '',
    tipo: 'email',
    frequencia: 'mensal',
    clienteId: '',
    clienteNome: '',
    destinatarios: [],
    campanhasIds: [],
    status: 'ativa',
    mensagemPersonalizada: '',
    acao: 'email'
  });
  
  // Mock data para clientes e campanhas
  const clientes = [
    { id: '1', nome: 'Empresa ABC', email: 'contato@abc.com' },
    { id: '2', nome: 'XYZ Ltda', email: 'contato@xyz.com' },
    { id: '3', nome: 'Consultoria 123', email: 'contato@123consultoria.com' },
  ];
  
  const campanhas = [
    { id: '1', nome: 'Facebook Leads', clienteId: '1' },
    { id: '2', nome: 'Google Search', clienteId: '1' },
    { id: '3', nome: 'Instagram Stories', clienteId: '2' },
    { id: '4', nome: 'LinkedIn Ads', clienteId: '2' },
    { id: '5', nome: 'YouTube Campaign', clienteId: '3' },
  ];
  
  // Efeito para carregar dados fictícios na inicialização
  useEffect(() => {
    // Simulando carregamento de dados do backend
    const mockAutomacoes: Automacao[] = [
      {
        id: '1',
        nome: 'Relatório Mensal ABC',
        tipo: 'email',
        frequencia: 'mensal',
        ultimaExecucao: '2025-01-15T10:00:00',
        proximaExecucao: '2025-02-15T10:00:00',
        destinatarios: ['contato@abc.com'],
        clienteId: '1',
        clienteNome: 'Empresa ABC',
        campanhasIds: ['1', '2'],
        status: 'ativa',
        mensagemPersonalizada: 'Aqui está o relatório mensal de performance da sua empresa.',
        acao: 'email'
      },
      {
        id: '2',
        nome: 'Alerta de CPL Alto',
        tipo: 'dashboard',
        frequencia: 'diaria',
        ultimaExecucao: '2025-01-20T08:30:00',
        proximaExecucao: '2025-01-21T08:30:00',
        destinatarios: ['analista@nog.com'],
        clienteId: '2',
        clienteNome: 'XYZ Ltda',
        campanhasIds: ['3', '4'],
        status: 'ativa',
        gatilho: 'cpl_alto',
        valorLimite: 50,
        acao: 'alerta'
      },
      {
        id: '3',
        nome: 'Alerta de Gasto Excessivo',
        tipo: 'dashboard',
        frequencia: 'diaria',
        ultimaExecucao: '2025-01-19T09:00:00',
        proximaExecucao: '2025-01-20T09:00:00',
        destinatarios: ['gestao@nog.com'],
        clienteId: '3',
        clienteNome: 'Consultoria 123',
        campanhasIds: ['5'],
        status: 'ativa',
        gatilho: 'gasto_excessivo',
        valorLimite: 1000,
        acao: 'email'
      }
    ];
    
    const mockHistorico: HistoricoExecucao[] = [
      {
        id: '1',
        automacaoId: '1',
        automacaoNome: 'Relatório Mensal ABC',
        dataExecucao: '2025-01-15T10:00:00',
        status: 'sucesso',
        destinatarios: ['contato@abc.com'],
        mensagem: 'Relatório enviado com sucesso.'
      },
      {
        id: '2',
        automacaoId: '2',
        automacaoNome: 'Alerta de CPL Alto',
        dataExecucao: '2025-01-20T08:30:00',
        status: 'sucesso',
        destinatarios: ['analista@nog.com'],
        mensagem: 'O CPL da campanha Instagram Stories está em R$ 65,30, acima do limite de R$ 50,00.'
      },
      {
        id: '3',
        automacaoId: '3',
        automacaoNome: 'Alerta de Gasto Excessivo',
        dataExecucao: '2025-01-19T09:00:00',
        status: 'falha',
        destinatarios: ['gestao@nog.com'],
        mensagem: 'Falha ao enviar o alerta por email. Tente novamente mais tarde.'
      }
    ];
    
    setAutomacoes(mockAutomacoes);
    setHistorico(mockHistorico);
  }, []);
  
  // Funções para manipulação de automações
  const handleCreateAutomation = () => {
    setEditingAutomacao(null);
    setFormData({
      nome: '',
      tipo: 'email',
      frequencia: 'mensal',
      clienteId: '',
      clienteNome: '',
      destinatarios: [],
      campanhasIds: [],
      status: 'ativa',
      mensagemPersonalizada: '',
      acao: 'email'
    });
    setShowAddModal(true);
  };
  
  const handleEditAutomation = (automacao: Automacao) => {
    setEditingAutomacao(automacao);
    setFormData({
      ...automacao,
      mensagemPersonalizada: automacao.mensagemPersonalizada || '',
      tipo: automacao.tipo || 'email',
      frequencia: automacao.frequencia || 'mensal',
      clienteId: automacao.clienteId || '',
      clienteNome: automacao.clienteNome || '',
      destinatarios: automacao.destinatarios || [],
      campanhasIds: automacao.campanhasIds || [],
      status: automacao.status || 'ativa',
      acao: automacao.acao
    });
    setShowAddModal(true);
  };
  
  const handleSaveAutomation = () => {
    if (!formData.nome || !formData.clienteId || formData.campanhasIds.length === 0) {
      toast({
        title: "Erro ao salvar",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    const newAutomacao: Automacao = {
      ...formData,
      id: editingAutomacao ? editingAutomacao.id : `new-${Date.now()}`,
      ultimaExecucao: editingAutomacao ? editingAutomacao.ultimaExecucao : null,
      proximaExecucao: new Date(Date.now() + 86400000).toISOString(), // Amanhã
      acao: formData.acao
    };
    
    if (editingAutomacao) {
      setAutomacoes(automacoes.map(a => a.id === editingAutomacao.id ? newAutomacao : a));
      toast({
        title: "Automação atualizada",
        description: `A automação "${newAutomacao.nome}" foi atualizada com sucesso.`,
      });
    } else {
      setAutomacoes([...automacoes, newAutomacao]);
      toast({
        title: "Automação criada",
        description: `A automação "${newAutomacao.nome}" foi criada com sucesso.`,
      });
    }
    
    setShowAddModal(false);
  };
  
  const handleToggleAutomation = (id: string, active: boolean) => {
    setAutomacoes(automacoes.map(a => {
      if (a.id === id) {
        return { ...a, status: active ? 'ativa' : 'pausada' };
      }
      return a;
    }));
    
    toast({
      title: active ? "Automação ativada" : "Automação pausada",
      description: `A automação foi ${active ? 'ativada' : 'pausada'} com sucesso.`,
    });
  };
  
  const handleShowAlert = () => {
    setAlertInfo({
      title: 'CPL Alto Detectado',
      message: 'O CPL da campanha está significativamente acima do limite estabelecido.',
      type: 'cpl_alto',
      campaignName: 'Instagram Stories',
      metric: 'CPL',
      value: 65.30,
      threshold: 50
    });
    setShowAlertModal(true);
  };
  
  const getCampanhasPorCliente = (clienteId: string) => {
    return campanhas.filter(c => c.clienteId === clienteId);
  };
  
  const handleClienteChange = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    setFormData({
      ...formData,
      clienteId,
      clienteNome: cliente ? cliente.nome : '',
      campanhasIds: []
    });
  };
  
  const handleTipoChange = (tipo: TipoAutomacao) => {
    const newForm = { ...formData, tipo };
    
    if (tipo === 'dashboard' && !newForm.gatilho) {
      newForm.gatilho = 'cpl_alto';
      newForm.acao = 'alerta';
    } else if (tipo === 'email') {
      delete newForm.gatilho;
      delete newForm.valorLimite;
      newForm.acao = 'email';
    }
    
    setFormData(newForm);
  };
  
  const emailAutomacoes = automacoes.filter(a => a.tipo === 'email');
  const gatilhoAutomacoes = automacoes.filter(a => a.tipo === 'dashboard');

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Automações</h1>
        <Button onClick={handleCreateAutomation}>Nova Automação</Button>
      </div>
      
      <Tabs defaultValue="automacoes">
        <TabsList className="mb-4">
          <TabsTrigger value="automacoes">Automações Ativas</TabsTrigger>
          <TabsTrigger value="historico">Histórico de Execuções</TabsTrigger>
        </TabsList>
        
        <TabsContent value="automacoes">
          <AutomationBoard 
            automacoes={automacoes}
            onCreateAutomation={handleCreateAutomation}
            onEditAutomation={handleEditAutomation}
          />
        </TabsContent>
        
        <TabsContent value="historico">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Histórico de Execuções</h2>
              <Button variant="outline" onClick={handleShowAlert}>Testar Alerta</Button>
            </div>
            
            {historico.length === 0 ? (
              <div className="text-center py-8 border rounded-lg">
                <p className="text-muted-foreground">Nenhum histórico de execução encontrado.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {historico.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-4 border rounded-lg ${item.status === 'sucesso' ? 'border-green-200' : 'border-red-200'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.automacaoNome}</h3>
                        <p className="text-sm text-muted-foreground">
                          Executado em: {new Date(item.dataExecucao).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === 'sucesso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status === 'sucesso' ? 'Sucesso' : 'Falha'}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">{item.mensagem}</p>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Enviado para: {item.destinatarios.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Modal de adicionar/editar automação */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingAutomacao ? 'Editar Automação' : 'Nova Automação'}</DialogTitle>
            <DialogDescription>
              {editingAutomacao 
                ? 'Atualize os detalhes da sua automação abaixo.'
                : 'Configure uma nova automação para envio de relatórios ou alertas de performance.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="tipo">Tipo de Automação</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) => handleTipoChange(value as TipoAutomacao)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Relatório Automático</SelectItem>
                  <SelectItem value="dashboard">Gatilho de Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome da Automação</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: Relatório Mensal de Performance"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Select 
                value={formData.clienteId}
                onValueChange={handleClienteChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {formData.clienteId && (
              <div className="grid gap-2">
                <Label>Campanhas</Label>
                <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
                  {getCampanhasPorCliente(formData.clienteId).length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nenhuma campanha disponível para este cliente.</p>
                  ) : (
                    getCampanhasPorCliente(formData.clienteId).map((campanha) => (
                      <div key={campanha.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`campanha-${campanha.id}`}
                          checked={formData.campanhasIds.includes(campanha.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                campanhasIds: [...formData.campanhasIds, campanha.id]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                campanhasIds: formData.campanhasIds.filter(id => id !== campanha.id)
                              });
                            }
                          }}
                        />
                        <Label
                          htmlFor={`campanha-${campanha.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {campanha.nome}
                        </Label>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            
            {formData.tipo === 'email' ? (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="frequencia">Frequência</Label>
                  <Select
                    value={formData.frequencia}
                    onValueChange={(value) => setFormData({ ...formData, frequencia: value as FrequenciaAutomacao })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diaria">Diária</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensal">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="mensagemPersonalizada">Mensagem Personalizada</Label>
                  <Textarea
                    id="mensagemPersonalizada"
                    value={formData.mensagemPersonalizada}
                    onChange={(e) => setFormData({ ...formData, mensagemPersonalizada: e.target.value })}
                    placeholder="Mensagem que será incluída no email com o relatório"
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="gatilho">Gatilho</Label>
                  <Select
                    value={formData.gatilho}
                    onValueChange={(value) => setFormData({ ...formData, gatilho: value as TipoGatilho })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gatilho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cpl_alto">CPL Alto</SelectItem>
                      <SelectItem value="gasto_excessivo">Gasto Excessivo</SelectItem>
                      <SelectItem value="ctr_baixo">CTR Baixo</SelectItem>
                      <SelectItem value="roas_baixo">ROAS Baixo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="valorLimite">Valor Limite</Label>
                  <Input
                    id="valorLimite"
                    type="number"
                    value={formData.valorLimite || ''}
                    onChange={(e) => setFormData({ ...formData, valorLimite: Number(e.target.value) })}
                    placeholder="Ex: 50 para CPL alto de R$ 50"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="acao">Ação</Label>
                  <Select
                    value={formData.acao}
                    onValueChange={(value) => setFormData({ ...formData, acao: value as AcaoAutomacao })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a ação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alerta">Apenas Alerta Visual</SelectItem>
                      <SelectItem value="notificacao">Notificação no Painel</SelectItem>
                      <SelectItem value="email">Enviar Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status === 'ativa'}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'ativa' : 'pausada' })}
              />
              <Label htmlFor="status">Automação ativa</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancelar</Button>
            <Button onClick={handleSaveAutomation}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modal de alerta */}
      <AlertNotificationModal
        open={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title={alertInfo.title}
        message={alertInfo.message}
        type={alertInfo.type as any}
        campaignName={alertInfo.campaignName}
        metric={alertInfo.metric}
        value={alertInfo.value}
        threshold={alertInfo.threshold}
      />
    </div>
  );
};

export default AutomacoesPage;
