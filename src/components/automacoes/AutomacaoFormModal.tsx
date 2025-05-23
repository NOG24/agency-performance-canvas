
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  Automacao, 
  TipoAutomacao, 
  FrequenciaAutomacao, 
  StatusAutomacao, 
  TipoGatilho,
  AcaoAutomacao 
} from '@/types/automacoes';

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

interface AutomacaoFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
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
  };
  setFormData: React.Dispatch<React.SetStateAction<{
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
  }>>;
  onSave: () => void;
  editingAutomacao: Automacao | null;
  clientes: Cliente[];
  campanhas: Campanha[];
}

export const AutomacaoFormModal: React.FC<AutomacaoFormModalProps> = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSave,
  editingAutomacao,
  clientes,
  campanhas
}) => {
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
  
  const handleClienteChange = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    setFormData({
      ...formData,
      clienteId,
      clienteNome: cliente ? cliente.nome : '',
      campanhasIds: []
    });
  };
  
  const getCampanhasPorCliente = (clienteId: string) => {
    return campanhas.filter(c => c.clienteId === clienteId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={onSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AutomacaoFormModal;
