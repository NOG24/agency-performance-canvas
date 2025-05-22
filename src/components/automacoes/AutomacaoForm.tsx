
import React, { useState, useEffect } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  Mail, 
  Users, 
  BarChart, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Mock data
const clientes = [
  { value: '123', label: 'Cliente ABC' },
  { value: '456', label: 'Cliente XYZ' },
  { value: '789', label: 'Cliente DEF' },
];

const campanhas = [
  { value: 'camp1', label: 'Campanha Google Ads - Conversões', clienteId: '123' },
  { value: 'camp2', label: 'Campanha Facebook - Reconhecimento', clienteId: '123' },
  { value: 'camp3', label: 'Campanha Instagram - Engajamento', clienteId: '456' },
  { value: 'camp4', label: 'Campanha LinkedIn - B2B', clienteId: '789' },
  { value: 'camp5', label: 'Campanha Google Ads - Remarketing', clienteId: '789' },
  { value: 'camp6', label: 'Campanha TikTok - Brand Awareness', clienteId: '789' },
];

// Esquema de validação
const automacaoSchema = z.object({
  nome: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres' }),
  tipo: z.enum(['email', 'dashboard']),
  frequencia: z.enum(['diaria', 'semanal', 'mensal']),
  clienteId: z.string().min(1, { message: 'Selecione um cliente' }),
  campanhasIds: z.array(z.string()).min(1, { message: 'Selecione pelo menos uma campanha' }),
  destinatarios: z.string().min(5, { message: 'Adicione pelo menos um destinatário válido' }),
  incluirAnexos: z.boolean().optional(),
  incluirGraficos: z.boolean().optional(),
  incluirComparativo: z.boolean().optional(),
  incluirObservacoes: z.boolean().optional(),
  mensagemPersonalizada: z.string().optional(),
  status: z.enum(['ativa', 'pausada']).default('ativa'),
});

type AutomacaoFormValues = z.infer<typeof automacaoSchema>;

interface AutomacaoFormProps {
  automacaoInicial?: any | null;
  onSalvar: (dados: any) => void;
  onCancelar: () => void;
}

const AutomacaoForm: React.FC<AutomacaoFormProps> = ({ 
  automacaoInicial, 
  onSalvar, 
  onCancelar 
}) => {
  const [campanhasFiltradas, setCampanhasFiltradas] = useState<typeof campanhas>([]);
  
  const form = useForm<AutomacaoFormValues>({
    resolver: zodResolver(automacaoSchema),
    defaultValues: automacaoInicial ? {
      ...automacaoInicial,
      destinatarios: automacaoInicial.destinatarios.join(', '),
      incluirAnexos: automacaoInicial.incluirAnexos || false,
      incluirGraficos: automacaoInicial.incluirGraficos || true,
      incluirComparativo: automacaoInicial.incluirComparativo || false,
      incluirObservacoes: automacaoInicial.incluirObservacoes || true,
    } : {
      nome: '',
      tipo: 'email',
      frequencia: 'mensal',
      clienteId: '',
      campanhasIds: [],
      destinatarios: '',
      incluirAnexos: false,
      incluirGraficos: true,
      incluirComparativo: false,
      incluirObservacoes: true,
      mensagemPersonalizada: '',
      status: 'ativa',
    }
  });
  
  // Filtra campanhas quando o cliente é selecionado
  useEffect(() => {
    const clienteId = form.watch('clienteId');
    if (clienteId) {
      const filtradas = campanhas.filter(camp => camp.clienteId === clienteId);
      setCampanhasFiltradas(filtradas);
      
      // Reset selected campaigns if they don't belong to this client
      const campanhasIds = form.watch('campanhasIds');
      if (campanhasIds && campanhasIds.length > 0) {
        const validCampanhasIds = campanhasIds.filter(
          id => filtradas.some(camp => camp.value === id)
        );
        form.setValue('campanhasIds', validCampanhasIds);
      }
    } else {
      setCampanhasFiltradas([]);
    }
  }, [form.watch('clienteId')]);
  
  // Preparar dados e enviar ao componente pai
  const onSubmit = (data: AutomacaoFormValues) => {
    // Transforma a string de destinatários em um array
    const destinatarios = data.destinatarios
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);
    
    // Adiciona o ID se estivermos editando
    const dadosFinais = {
      ...data,
      destinatarios,
      id: automacaoInicial?.id
    };
    
    onSalvar(dadosFinais);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da automação</FormLabel>
                <FormControl>
                  <Input placeholder="Relatório mensal de desempenho" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de automação</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="email" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>E-mail</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dashboard" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4" />
                        <span>Dashboard</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="frequencia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequência</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frequência" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="diaria" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Diária</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="semanal" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Semanal</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="mensal" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Mensal</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Define a frequência de envio dos relatórios
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="clienteId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clientes.map((cliente) => (
                      <SelectItem 
                        key={cliente.value} 
                        value={cliente.value}
                      >
                        {cliente.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="campanhasIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campanhas</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3">
                {campanhasFiltradas.length === 0 ? (
                  <div className="col-span-2 flex items-center justify-center p-4 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {form.watch('clienteId') 
                      ? "Sem campanhas disponíveis para este cliente." 
                      : "Selecione um cliente para ver suas campanhas."}
                  </div>
                ) : (
                  campanhasFiltradas.map((campanha) => (
                    <div key={campanha.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={campanha.value} 
                        checked={field.value?.includes(campanha.value)}
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          if (checked) {
                            field.onChange([...currentValue, campanha.value]);
                          } else {
                            field.onChange(
                              currentValue.filter((value) => value !== campanha.value)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={campanha.value}>{campanha.label}</Label>
                    </div>
                  ))
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="destinatarios"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destinatários</FormLabel>
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                <Users className="h-4 w-4 text-muted-foreground ml-3" />
                <FormControl>
                  <Input 
                    placeholder="email1@exemplo.com, email2@exemplo.com" 
                    {...field}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
              </div>
              <FormDescription>
                Separe múltiplos e-mails por vírgula
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <Label>Opções do relatório</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border rounded-md p-3">
            <FormField
              control={form.control}
              name="incluirAnexos"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label htmlFor="incluirAnexos">Incluir anexos (CSV, Excel)</Label>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="incluirGraficos"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label htmlFor="incluirGraficos">Incluir gráficos</Label>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="incluirComparativo"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label htmlFor="incluirComparativo">Incluir comparativo com período anterior</Label>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="incluirObservacoes"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label htmlFor="incluirObservacoes">Incluir observações da equipe</Label>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="mensagemPersonalizada"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem personalizada (opcional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Escreva uma mensagem personalizada para acompanhar o relatório..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Esta mensagem será incluída no corpo do e-mail junto com o relatório.
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Status da automação" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="pausada">Pausada</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancelar}>
            Cancelar
          </Button>
          <Button type="submit">
            {automacaoInicial ? 'Salvar alterações' : 'Criar automação'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AutomacaoForm;
