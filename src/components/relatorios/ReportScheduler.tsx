
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock } from "lucide-react";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";

interface Campanha {
  id: string;
  nome: string;
}

interface Cliente {
  id: string;
  nome: string;
  email: string;
}

interface ReportSchedulerProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (data: ReportScheduleData) => Promise<void>;
  clientes: Cliente[];
  campanhas: Campanha[];
}

export interface ReportScheduleData {
  clienteId: string;
  frequencia: 'diaria' | 'semanal' | 'mensal';
  campanhasIds: string[];
  destinatarios: string[];
  assunto: string;
  mensagemPersonalizada?: string;
  dataInicio?: Date;
  dataFim?: Date;
}

const ReportScheduler: React.FC<ReportSchedulerProps> = ({
  open,
  onClose,
  onSchedule,
  clientes,
  campanhas
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ReportScheduleData>({
    clienteId: '',
    frequencia: 'mensal',
    campanhasIds: [],
    destinatarios: [],
    assunto: 'Relatório de Performance',
  });
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [clienteEmail, setClienteEmail] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  const handleClienteChange = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    setFormData(prev => ({
      ...prev,
      clienteId,
      destinatarios: cliente ? [cliente.email] : []
    }));
    setClienteEmail(cliente?.email || '');
  };

  const handleFrequenciaChange = (frequencia: 'diaria' | 'semanal' | 'mensal') => {
    setFormData(prev => ({ ...prev, frequencia }));
  };

  const handleCampanhaToggle = (campanhaId: string) => {
    setFormData(prev => {
      if (prev.campanhasIds.includes(campanhaId)) {
        return {
          ...prev,
          campanhasIds: prev.campanhasIds.filter(id => id !== campanhaId)
        };
      } else {
        return {
          ...prev,
          campanhasIds: [...prev.campanhasIds, campanhaId]
        };
      }
    });
  };

  const handleToggleAllCampanhas = () => {
    if (formData.campanhasIds.length === campanhas.length) {
      setFormData(prev => ({
        ...prev,
        campanhasIds: []
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        campanhasIds: campanhas.map(c => c.id)
      }));
    }
  };

  const handleEmailToggle = (checked: boolean) => {
    if (checked && clienteEmail && !formData.destinatarios.includes(clienteEmail)) {
      setFormData(prev => ({
        ...prev,
        destinatarios: [...prev.destinatarios, clienteEmail]
      }));
    } else if (!checked && clienteEmail) {
      setFormData(prev => ({
        ...prev,
        destinatarios: prev.destinatarios.filter(email => email !== clienteEmail)
      }));
    }
  };

  const handleAddCustomEmail = () => {
    if (customEmail && !formData.destinatarios.includes(customEmail)) {
      setFormData(prev => ({
        ...prev,
        destinatarios: [...prev.destinatarios, customEmail]
      }));
      setCustomEmail('');
    }
  };

  const handleRemoveEmail = (email: string) => {
    setFormData(prev => ({
      ...prev,
      destinatarios: prev.destinatarios.filter(e => e !== email)
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSchedule({
        ...formData,
        dataInicio: dateRange?.from,
        dataFim: dateRange?.to
      });
      onClose();
    } catch (error) {
      console.error('Error scheduling report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Agendar Relatório</DialogTitle>
          <DialogDescription>
            Configure o agendamento de relatórios automáticos para seus clientes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Select value={formData.clienteId} onValueChange={handleClienteChange}>
                <SelectTrigger id="cliente">
                  <SelectValue placeholder="Selecione um cliente" />
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
            
            <div>
              <Label htmlFor="frequencia">Frequência de Envio</Label>
              <Select value={formData.frequencia} onValueChange={handleFrequenciaChange}>
                <SelectTrigger id="frequencia">
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diaria">Diária</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensal">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Período de Dados</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 gap-1 text-xs"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Últimos 30 dias
                </Button>
              </div>
              <DateRangePicker 
                value={dateRange}
                onChange={setDateRange}
                locale={ptBR}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="campanhas">Campanhas</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs"
                  onClick={handleToggleAllCampanhas}
                >
                  {formData.campanhasIds.length === campanhas.length ? 'Desmarcar Todas' : 'Selecionar Todas'}
                </Button>
              </div>
              <ScrollArea className="h-[180px] border rounded-md">
                <div className="p-4 space-y-2">
                  {campanhas.length === 0 ? (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      Nenhuma campanha disponível para este cliente
                    </div>
                  ) : (
                    campanhas.map((campanha) => (
                      <div key={campanha.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`campanha-${campanha.id}`}
                          checked={formData.campanhasIds.includes(campanha.id)}
                          onCheckedChange={() => handleCampanhaToggle(campanha.id)}
                        />
                        <Label 
                          htmlFor={`campanha-${campanha.id}`}
                          className="flex-grow text-sm cursor-pointer"
                        >
                          {campanha.nome}
                        </Label>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
            
            <div>
              <Label htmlFor="destinatarios">Destinatários</Label>
              <div className="mt-2 space-y-3">
                {clienteEmail && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cliente-email"
                      checked={formData.destinatarios.includes(clienteEmail)}
                      onCheckedChange={handleEmailToggle}
                    />
                    <Label
                      htmlFor="cliente-email"
                      className="text-sm cursor-pointer"
                    >
                      {clienteEmail} (Cliente)
                    </Label>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="Adicionar outro email..." 
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="flex-grow"
                  />
                  <Button 
                    onClick={handleAddCustomEmail}
                    type="button"
                    disabled={!customEmail.includes('@')}
                  >
                    Adicionar
                  </Button>
                </div>
                
                {formData.destinatarios.length > 0 && (
                  <div className="mt-2">
                    <Label className="text-sm text-muted-foreground mb-2 block">
                      Emails selecionados:
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.destinatarios.map((email) => (
                        <div 
                          key={email}
                          className="bg-muted px-2 py-1 rounded-md text-sm flex items-center gap-2"
                        >
                          <span>{email}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveEmail(email)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="assunto">Assunto do Email</Label>
              <Input 
                id="assunto"
                value={formData.assunto}
                onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                placeholder="Relatório Mensal de Performance - [Nome da Agência]"
              />
            </div>
            
            <div>
              <Label htmlFor="mensagem">Mensagem Personalizada</Label>
              <Textarea
                id="mensagem"
                value={formData.mensagemPersonalizada || ''}
                onChange={(e) => setFormData({ ...formData, mensagemPersonalizada: e.target.value })}
                placeholder="Adicione uma mensagem personalizada para o cliente..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !formData.clienteId || formData.campanhasIds.length === 0 || formData.destinatarios.length === 0}
          >
            {isSubmitting ? 'Agendando...' : 'Agendar Relatório'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportScheduler;
