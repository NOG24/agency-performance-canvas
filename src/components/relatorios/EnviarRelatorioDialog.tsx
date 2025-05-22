
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Mail, 
  Users, 
  Calendar, 
  FileText, 
  Check 
} from 'lucide-react';

interface EnviarRelatorioDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnviar: (dados: any) => void;
  relatorioSelecionadoId?: string | null;
}

// Modelos mockados
const modelosEmails = [
  { id: 'e1', nome: 'Padrão - Relatório Mensal' },
  { id: 'e2', nome: 'Relatório Executivo' },
  { id: 'e3', nome: 'Notificação de Performance' },
];

// Clientes mockados
const clientes = [
  { 
    id: '1', 
    nome: 'Cliente ABC', 
    contatos: [
      { email: 'diretor@clienteabc.com', nome: 'Diretor ABC' },
      { email: 'marketing@clienteabc.com', nome: 'Marketing ABC' },
    ] 
  },
  { 
    id: '2', 
    nome: 'Cliente XYZ', 
    contatos: [
      { email: 'gerente@clientexyz.com', nome: 'Gerente XYZ' },
    ] 
  },
];

export const EnviarRelatorioDialog: React.FC<EnviarRelatorioDialogProps> = ({
  open,
  onOpenChange,
  onEnviar,
  relatorioSelecionadoId
}) => {
  const [clienteSelecionado, setClienteSelecionado] = useState<string>('');
  const [contatos, setContatos] = useState<Array<{email: string, nome: string}>>([]);
  const [contatosSelecionados, setContatosSelecionados] = useState<string[]>([]);
  const [modeloSelecionado, setModeloSelecionado] = useState<string>('e1');
  const [emailAdicional, setEmailAdicional] = useState<string>('');
  
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      assunto: 'Relatório de Performance - NOG Performance',
      mensagem: 'Olá,\n\nSegue em anexo o relatório de performance das suas campanhas.\n\nQualquer dúvida estamos à disposição.\n\nAtenciosamente,\nEquipe NOG Performance',
      incluirAnexoPdf: true,
      incluirLinkDashboard: true,
    }
  });
  
  // Reset form quando o diálogo é aberto
  useEffect(() => {
    if (open) {
      reset({
        assunto: 'Relatório de Performance - NOG Performance',
        mensagem: 'Olá,\n\nSegue em anexo o relatório de performance das suas campanhas.\n\nQualquer dúvida estamos à disposição.\n\nAtenciosamente,\nEquipe NOG Performance',
        incluirAnexoPdf: true,
        incluirLinkDashboard: true,
      });
      setContatosSelecionados([]);
      setEmailAdicional('');
    }
  }, [open, reset]);
  
  // Atualiza os contatos disponíveis quando um cliente é selecionado
  const handleClienteChange = (id: string) => {
    setClienteSelecionado(id);
    const cliente = clientes.find(c => c.id === id);
    setContatos(cliente?.contatos || []);
    setContatosSelecionados([]);
  };
  
  // Toggle de seleção de contatos
  const handleContatoToggle = (email: string) => {
    if (contatosSelecionados.includes(email)) {
      setContatosSelecionados(contatosSelecionados.filter(e => e !== email));
    } else {
      setContatosSelecionados([...contatosSelecionados, email]);
    }
  };
  
  // Aplica modelo de e-mail
  const handleModeloChange = (id: string) => {
    setModeloSelecionado(id);
    // Aqui você pode carregar um modelo pré-definido de assunto e mensagem
    if (id === 'e1') {
      setValue('assunto', 'Relatório de Performance - NOG Performance');
      setValue('mensagem', 'Olá,\n\nSegue em anexo o relatório de performance das suas campanhas.\n\nQualquer dúvida estamos à disposição.\n\nAtenciosamente,\nEquipe NOG Performance');
    } else if (id === 'e2') {
      setValue('assunto', 'Relatório Executivo de Campanhas - NOG Performance');
      setValue('mensagem', 'Prezado cliente,\n\nEncaminhamos o relatório executivo com os principais indicadores de desempenho das suas campanhas de marketing digital.\n\nFique à vontade para agendar uma call para discutirmos os resultados.\n\nAtenciosamente,\nTime de Performance - NOG');
    } else if (id === 'e3') {
      setValue('assunto', 'Alerta de Performance - NOG Performance');
      setValue('mensagem', 'Olá,\n\nIdentificamos mudanças significativas na performance das suas campanhas. Segue relatório completo em anexo.\n\nRecomendamos agendar uma reunião para discutirmos estratégias de otimização.\n\nAtenciosamente,\nTime de Performance - NOG');
    }
  };
  
  // Adiciona e-mail digitado manualmente à lista
  const handleAdicionarEmail = () => {
    if (emailAdicional && emailAdicional.includes('@')) {
      setContatosSelecionados([...contatosSelecionados, emailAdicional]);
      setEmailAdicional('');
    }
  };
  
  // Prepara e envia os dados do formulário
  const onSubmit = (data: any) => {
    if (contatosSelecionados.length === 0) {
      // Mostraria um erro, mas para simplicidade vamos apenas retornar
      return;
    }
    
    // Combinamos os dados do formulário com os destinatários selecionados
    const dadosEnvio = {
      ...data,
      destinatarios: contatosSelecionados,
      clienteId: clienteSelecionado,
      modeloId: modeloSelecionado,
      relatorioId: relatorioSelecionadoId
    };
    
    onEnviar(dadosEnvio);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Enviar Relatório por E-mail
          </DialogTitle>
          <DialogDescription>
            Configure os destinatários e a mensagem para enviar o relatório.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Seleção de cliente */}
          <div className="grid gap-2">
            <Label htmlFor="cliente">Cliente</Label>
            <Select onValueChange={handleClienteChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente" />
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
          
          {/* Seleção de contatos */}
          <div className="grid gap-2">
            <Label>Destinatários</Label>
            
            {!clienteSelecionado && (
              <div className="border rounded-lg p-4 text-center text-muted-foreground">
                Selecione um cliente para ver os contatos disponíveis
              </div>
            )}
            
            {clienteSelecionado && contatos.length === 0 && (
              <div className="border rounded-lg p-4 text-center text-muted-foreground">
                Nenhum contato cadastrado para este cliente
              </div>
            )}
            
            {clienteSelecionado && contatos.length > 0 && (
              <div className="border rounded-lg p-2 space-y-2 max-h-32 overflow-y-auto">
                {contatos.map(contato => (
                  <div 
                    key={contato.email} 
                    className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md"
                  >
                    <Checkbox 
                      id={`contato-${contato.email}`}
                      checked={contatosSelecionados.includes(contato.email)}
                      onCheckedChange={() => handleContatoToggle(contato.email)}
                    />
                    <Label 
                      htmlFor={`contato-${contato.email}`}
                      className="flex flex-col cursor-pointer flex-1"
                    >
                      <span>{contato.nome}</span>
                      <span className="text-xs text-muted-foreground">{contato.email}</span>
                    </Label>
                  </div>
                ))}
              </div>
            )}
            
            {/* Adicionar e-mail manualmente */}
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Adicionar outro e-mail manualmente..."
                value={emailAdicional}
                onChange={(e) => setEmailAdicional(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleAdicionarEmail}
                disabled={!emailAdicional.includes('@')}
              >
                Adicionar
              </Button>
            </div>
            
            {/* Lista de e-mails selecionados */}
            {contatosSelecionados.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {contatosSelecionados.map(email => (
                  <Badge 
                    key={email}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Users className="h-3 w-3" />
                    {email}
                    <button 
                      type="button"
                      onClick={() => setContatosSelecionados(
                        contatosSelecionados.filter(e => e !== email)
                      )}
                      className="ml-1 hover:bg-accent rounded-full"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Modelo de e-mail */}
          <div className="grid gap-2">
            <Label htmlFor="modelo">Modelo de e-mail</Label>
            <Select 
              value={modeloSelecionado} 
              onValueChange={handleModeloChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um modelo" />
              </SelectTrigger>
              <SelectContent>
                {modelosEmails.map(modelo => (
                  <SelectItem key={modelo.id} value={modelo.id}>
                    {modelo.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Assunto e mensagem */}
          <div className="grid gap-2">
            <Label htmlFor="assunto">Assunto do e-mail</Label>
            <Input 
              id="assunto"
              placeholder="Digite o assunto do e-mail"
              {...register('assunto')}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea 
              id="mensagem"
              placeholder="Digite a mensagem do e-mail"
              className="min-h-[120px]"
              {...register('mensagem')}
            />
          </div>
          
          {/* Opções adicionais */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="incluirAnexoPdf"
                defaultChecked
                {...register('incluirAnexoPdf')}
              />
              <Label 
                htmlFor="incluirAnexoPdf"
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                Incluir relatório em PDF como anexo
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="incluirLinkDashboard"
                defaultChecked
                {...register('incluirLinkDashboard')}
              />
              <Label 
                htmlFor="incluirLinkDashboard"
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                Incluir link para dashboard online
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={contatosSelecionados.length === 0}
            >
              <Mail className="mr-2 h-4 w-4" />
              Enviar Relatório
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
