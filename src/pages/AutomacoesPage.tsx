
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AutomationBoard from '@/components/automacoes/AutomationBoard';
import HistoricoTab from '@/components/automacoes/HistoricoTab';
import AlertNotificationModal from '@/components/automacoes/AlertNotificationModal';
import AutomacaoFormModal from '@/components/automacoes/AutomacaoFormModal';
import { useAutomacoes } from '@/components/automacoes/AutomacaoHooks';
import { Automacao, TipoGatilho } from '@/types/automacoes';
import { clientes, campanhas } from '@/components/automacoes/MockData';

// This is a refactored component that has been split into smaller parts
const AutomacoesPage: React.FC = () => {
  // Estado para os modais
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAutomacao, setEditingAutomacao] = useState<Automacao | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  
  // Estado para informações de alerta
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    message: '',
    type: 'cpl_alto' as TipoGatilho | 'success',
    campaignName: '',
    metric: '',
    value: 0,
    threshold: 0
  });
  
  // Usar o hook de automações
  const { 
    automacoes, 
    historico, 
    formData, 
    setFormData,
    handleCreateAutomation,
    handleEditAutomation,
    handleSaveAutomation
  } = useAutomacoes();
  
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
  
  const onCreateAutomation = () => {
    setEditingAutomacao(null);
    handleCreateAutomation(null, setShowAddModal);
  };
  
  const onEditAutomation = (automacao: Automacao) => {
    handleEditAutomation(automacao, setEditingAutomacao, setShowAddModal);
  };
  
  const onSaveAutomation = () => {
    handleSaveAutomation(editingAutomacao, setShowAddModal);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Automações</h1>
        <Button onClick={onCreateAutomation}>Nova Automação</Button>
      </div>
      
      <Tabs defaultValue="automacoes">
        <TabsList className="mb-4">
          <TabsTrigger value="automacoes">Automações Ativas</TabsTrigger>
          <TabsTrigger value="historico">Histórico de Execuções</TabsTrigger>
        </TabsList>
        
        <TabsContent value="automacoes">
          <AutomationBoard 
            automacoes={automacoes}
            onCreateAutomation={onCreateAutomation}
            onEditAutomation={onEditAutomation}
          />
        </TabsContent>
        
        <TabsContent value="historico">
          <HistoricoTab 
            historico={historico}
            onShowAlert={handleShowAlert}
          />
        </TabsContent>
      </Tabs>
      
      {/* Modal de adicionar/editar automação */}
      <AutomacaoFormModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        formData={formData}
        setFormData={setFormData}
        onSave={onSaveAutomation}
        editingAutomacao={editingAutomacao}
        clientes={clientes}
        campanhas={campanhas}
      />
      
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
