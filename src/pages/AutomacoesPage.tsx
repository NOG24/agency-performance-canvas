
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import ListaAutomacoes from "@/components/automacoes/ListaAutomacoes";
import AutomacaoFormModal from "@/components/automacoes/AutomacaoFormModal";
import HistoricoTab from "@/components/automacoes/HistoricoTab";
import { useToast } from "@/components/ui/use-toast";
import { Automacao } from '@/types/automacoes';

const AutomacoesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('automacoes');
  const [automacaoEditando, setAutomacaoEditando] = useState<Partial<Automacao> | null>(null);
  const { toast } = useToast();

  const handleAddClick = () => {
    setAutomacaoEditando(null);
    setIsModalOpen(true);
  };

  const handleEditAutomacao = (automacao: Automacao) => {
    setAutomacaoEditando(automacao);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAutomacaoEditando(null);
  };

  const handleSaveAutomacao = () => {
    toast({
      title: automacaoEditando ? "Automação atualizada" : "Automação criada",
      description: automacaoEditando
        ? "A automação foi atualizada com sucesso."
        : "A nova automação foi criada com sucesso.",
    });
    setIsModalOpen(false);
    setAutomacaoEditando(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Automações"
        description="Configure regras automatizadas para otimização de campanhas"
      >
        <Button onClick={handleAddClick}>
          <Plus className="mr-2 h-4 w-4" /> Nova Automação
        </Button>
      </PageHeader>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <span className="font-medium">Importante:</span> As automações funcionam com base nas regras configuradas. 
              Verifique sempre as condições antes de ativar uma automação.
            </p>
          </div>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="automacoes">Automações Ativas</TabsTrigger>
          <TabsTrigger value="historico">Histórico de Execução</TabsTrigger>
        </TabsList>

        <TabsContent value="automacoes" className="space-y-6 mt-6">
          <ListaAutomacoes onEdit={handleEditAutomacao} />
        </TabsContent>

        <TabsContent value="historico" className="space-y-6 mt-6">
          <HistoricoTab />
        </TabsContent>
      </Tabs>

      <AutomacaoFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAutomacao}
        automacao={automacaoEditando}
      />
    </div>
  );
};

export default AutomacoesPage;
