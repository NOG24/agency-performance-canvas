
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Automacao, TipoAutomacao, FrequenciaAutomacao, AcaoAutomacao, TipoGatilho } from '@/types/automacoes';

interface AutomacaoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (automacao: Automacao) => void;
  automacao: Partial<Automacao> | null;
}

const AutomacaoFormModal: React.FC<AutomacaoFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  automacao
}) => {
  const [formData, setFormData] = useState<Partial<Automacao>>({
    nome: '',
    tipo: 'alerta',
    frequencia: 'diario',
    clienteId: '',
    clienteNome: '',
    destinatarios: [],
    campanhasIds: [],
    status: 'ativo',
    mensagemPersonalizada: '',
    acao: 'notificar'
  });
  
  const [destinatarios, setDestinatarios] = useState('');
  const [campanhas, setCampanhas] = useState('');
  const [clienteOptions] = useState([
    { id: 'client1', nome: 'E-commerce XYZ' },
    { id: 'client2', nome: 'Loja Virtual ABC' },
    { id: 'client3', nome: 'Serviços Tech' },
    { id: 'client4', nome: 'Academia Fitness Pro' }
  ]);
  
  // Inicializar o formulário quando tiver uma automação para editar
  useEffect(() => {
    if (automacao) {
      setFormData({
        ...automacao
      });
      
      if (automacao.destinatarios) {
        setDestinatarios(automacao.destinatarios.join(', '));
      }
      
      if (automacao.campanhasIds) {
        setCampanhas(automacao.campanhasIds.join(', '));
      }
    } else {
      resetForm();
    }
  }, [automacao]);
  
  const resetForm = () => {
    setFormData({
      nome: '',
      tipo: 'alerta',
      frequencia: 'diario',
      clienteId: '',
      clienteNome: '',
      destinatarios: [],
      campanhasIds: [],
      status: 'ativo',
      mensagemPersonalizada: '',
      acao: 'notificar'
    });
    setDestinatarios('');
    setCampanhas('');
  };
  
  const handleChange = (field: keyof Automacao, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleClienteChange = (clienteId: string) => {
    const cliente = clienteOptions.find(c => c.id === clienteId);
    setFormData(prev => ({
      ...prev,
      clienteId,
      clienteNome: cliente?.nome || ''
    }));
  };
  
  const handleSave = () => {
    const destinatariosArray = destinatarios
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);
      
    const campanhasArray = campanhas
      .split(',')
      .map(id => id.trim())
      .filter(id => id.length > 0);
    
    const automacaoCompleta = {
      ...formData,
      id: formData.id || `auto_${Date.now()}`,
      destinatarios: destinatariosArray,
      campanhasIds: campanhasArray
    } as Automacao;
    
    onSave(automacaoCompleta);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{automacao ? 'Editar Automação' : 'Nova Automação'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da automação</Label>
              <Input
                id="nome"
                placeholder="Nome da automação"
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) => handleChange('tipo', value as TipoAutomacao)}
              >
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alerta">Alerta</SelectItem>
                  <SelectItem value="relatorio">Relatório</SelectItem>
                  <SelectItem value="otimizacao">Otimização</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cliente">Cliente</Label>
              <Select
                value={formData.clienteId}
                onValueChange={handleClienteChange}
              >
                <SelectTrigger id="cliente">
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clienteOptions.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="frequencia">Frequência</Label>
              <Select
                value={formData.frequencia}
                onValueChange={(value) => handleChange('frequencia', value as FrequenciaAutomacao)}
              >
                <SelectTrigger id="frequencia">
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tempo_real">Tempo real</SelectItem>
                  <SelectItem value="diario">Diário</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {formData.tipo === 'alerta' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gatilho">Gatilho</Label>
                <Select
                  value={formData.gatilho || ''}
                  onValueChange={(value) => handleChange('gatilho', value as TipoGatilho)}
                >
                  <SelectTrigger id="gatilho">
                    <SelectValue placeholder="Selecione o gatilho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cpl_acima">CPL acima do limite</SelectItem>
                    <SelectItem value="cpl_abaixo">CPL abaixo do limite</SelectItem>
                    <SelectItem value="ctr_abaixo">CTR abaixo do limite</SelectItem>
                    <SelectItem value="conversoes_abaixo">Conversões abaixo do limite</SelectItem>
                    <SelectItem value="orcamento_consumido">Orçamento consumido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="valorLimite">Valor limite</Label>
                <Input
                  id="valorLimite"
                  type="number"
                  placeholder="Valor limite"
                  value={formData.valorLimite || ''}
                  onChange={(e) => handleChange('valorLimite', parseFloat(e.target.value))}
                />
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destinatarios">Destinatários (separados por vírgula)</Label>
              <Input
                id="destinatarios"
                placeholder="email1@exemplo.com, email2@exemplo.com"
                value={destinatarios}
                onChange={(e) => setDestinatarios(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="acao">Ação</Label>
              <Select
                value={formData.acao}
                onValueChange={(value) => handleChange('acao', value as AcaoAutomacao)}
              >
                <SelectTrigger id="acao">
                  <SelectValue placeholder="Selecione a ação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notificar">Notificar</SelectItem>
                  <SelectItem value="email">Enviar email</SelectItem>
                  <SelectItem value="pausar">Pausar campanha</SelectItem>
                  <SelectItem value="ajustar_orcamento">Ajustar orçamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="campanhas">IDs das Campanhas (separados por vírgula)</Label>
            <Input
              id="campanhas"
              placeholder="camp1, camp2, camp3"
              value={campanhas}
              onChange={(e) => setCampanhas(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mensagem">Mensagem personalizada</Label>
            <Textarea
              id="mensagem"
              placeholder="Mensagem que será enviada junto com a notificação"
              rows={3}
              value={formData.mensagemPersonalizada}
              onChange={(e) => handleChange('mensagemPersonalizada', e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AutomacaoFormModal;
