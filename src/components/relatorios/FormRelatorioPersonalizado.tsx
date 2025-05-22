
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Download, 
  Mail, 
  BarChart,
  CheckCheck,
  PieChart,
  FileText,
  Sparkles
} from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DateRangePicker } from '../ui/date-range-picker';

// Dados mockados
const clientes = [
  { id: '1', nome: 'Cliente ABC' },
  { id: '2', nome: 'Cliente XYZ' },
  { id: '3', nome: 'Cliente DEF' },
];

const campanhas = [
  { id: 'c1', nome: 'Google Ads - Conversões', clienteId: '1', plataforma: 'Google Ads' },
  { id: 'c2', nome: 'Facebook - Reconhecimento', clienteId: '1', plataforma: 'Facebook' },
  { id: 'c3', nome: 'Instagram - Tráfego', clienteId: '2', plataforma: 'Instagram' },
  { id: 'c4', nome: 'Google Ads - Remarketing', clienteId: '3', plataforma: 'Google Ads' },
  { id: 'c5', nome: 'LinkedIn - Geração de Leads', clienteId: '3', plataforma: 'LinkedIn' },
];

interface FormRelatorioPersonalizadoProps {
  onExportar: (tipo: string) => void;
  onEnviar: () => void;
  userType: 'agency' | 'client';
}

export const FormRelatorioPersonalizado: React.FC<FormRelatorioPersonalizadoProps> = ({ 
  onExportar, 
  onEnviar,
  userType
}) => {
  const [clienteSelecionado, setClienteSelecionado] = useState<string | null>(null);
  const [campanhasFiltradas, setCampanhasFiltradas] = useState<typeof campanhas>([]);
  const [campanhasSelecionadas, setCampanhasSelecionadas] = useState<string[]>([]);
  const [periodo, setPeriodo] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  
  const { register, handleSubmit, watch } = useForm();
  const secoesSelecionadas = watch('secoes', {
    kpis: true,
    graficos: true,
    campanhas: true,
    insights: true,
    observacoes: false,
    comparativos: true,
  });
  
  // Ao selecionar um cliente, filtra as campanhas disponíveis
  const handleClienteChange = (id: string) => {
    setClienteSelecionado(id);
    const filtradas = campanhas.filter(c => c.clienteId === id);
    setCampanhasFiltradas(filtradas);
    setCampanhasSelecionadas([]);
  };
  
  // Toggle para selecionar/deselecionar campanhas
  const handleCampanhaToggle = (id: string) => {
    if (campanhasSelecionadas.includes(id)) {
      setCampanhasSelecionadas(campanhasSelecionadas.filter(c => c !== id));
    } else {
      setCampanhasSelecionadas([...campanhasSelecionadas, id]);
    }
  };
  
  // Seleciona todas as campanhas
  const handleSelecionarTodas = () => {
    const todasIds = campanhasFiltradas.map(c => c.id);
    setCampanhasSelecionadas(todasIds);
  };
  
  // Limpa seleção de campanhas
  const handleLimparSelecao = () => {
    setCampanhasSelecionadas([]);
  };
  
  // Formata a data para exibição
  const formatarPeriodo = (range?: DateRange) => {
    if (!range?.from) return '';
    if (!range.to) {
      return `A partir de ${format(range.from, 'dd/MM/yyyy')}`;
    }
    return `${format(range.from, 'dd/MM/yyyy')} até ${format(range.to, 'dd/MM/yyyy')}`;
  };
  
  const onSubmit = (data: any) => {
    // Combinamos os dados do formulário com os outros estados
    const dadosRelatorio = {
      ...data,
      clienteId: clienteSelecionado,
      campanhasIds: campanhasSelecionadas,
      periodo: periodo,
    };
    
    console.log('Dados do relatório:', dadosRelatorio);
    onExportar('personalizado');
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Configurar Relatório Personalizado
          </CardTitle>
          <CardDescription>
            Selecione os dados e formato do seu relatório
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Seleção de cliente - apenas para agência */}
          {userType === 'agency' && (
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
          )}
          
          {/* Seleção de período */}
          <div className="grid gap-2">
            <Label>Período do relatório</Label>
            <DateRangePicker
              value={periodo}
              onChange={setPeriodo}
              locale={ptBR}
            />
          </div>
          
          {/* Seleção de campanhas */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label>Campanhas</Label>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSelecionarTodas}
                  disabled={!clienteSelecionado || campanhasFiltradas.length === 0}
                >
                  <CheckCheck className="mr-1 h-3.5 w-3.5" />
                  Todas
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLimparSelecao}
                  disabled={campanhasSelecionadas.length === 0}
                >
                  Limpar
                </Button>
              </div>
            </div>
            
            {!clienteSelecionado && (
              <div className="border rounded-lg p-4 text-center text-muted-foreground">
                {userType === 'agency' 
                  ? "Selecione um cliente para ver as campanhas disponíveis" 
                  : "Nenhuma campanha encontrada"}
              </div>
            )}
            
            {clienteSelecionado && campanhasFiltradas.length === 0 && (
              <div className="border rounded-lg p-4 text-center text-muted-foreground">
                Nenhuma campanha encontrada para este cliente
              </div>
            )}
            
            {clienteSelecionado && campanhasFiltradas.length > 0 && (
              <div className="border rounded-lg p-2 grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                {campanhasFiltradas.map(campanha => (
                  <div 
                    key={campanha.id} 
                    className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md"
                  >
                    <Checkbox 
                      id={`campanha-${campanha.id}`}
                      checked={campanhasSelecionadas.includes(campanha.id)}
                      onCheckedChange={() => handleCampanhaToggle(campanha.id)}
                    />
                    <Label 
                      htmlFor={`campanha-${campanha.id}`}
                      className="flex flex-col cursor-pointer flex-1"
                    >
                      <span>{campanha.nome}</span>
                      <span className="text-xs text-muted-foreground">{campanha.plataforma}</span>
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Separator />
          
          {/* Seções do relatório */}
          <div className="grid gap-2">
            <Label>Seções do relatório</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="secoes.kpis" 
                  defaultChecked 
                  {...register('secoes.kpis')}
                />
                <div>
                  <Label 
                    htmlFor="secoes.kpis"
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <BarChart className="h-4 w-4" />
                    KPIs Principais
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Métricas essenciais como CPL, leads, impressões, CTR
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="secoes.graficos" 
                  defaultChecked
                  {...register('secoes.graficos')}
                />
                <div>
                  <Label 
                    htmlFor="secoes.graficos"
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <PieChart className="h-4 w-4" />
                    Gráficos de Performance
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Visualizações gráficas da evolução de resultados
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="secoes.campanhas" 
                  defaultChecked
                  {...register('secoes.campanhas')}
                />
                <div>
                  <Label 
                    htmlFor="secoes.campanhas"
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" />
                    Desempenho por Campanha
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Análise detalhada de cada campanha selecionada
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="secoes.insights" 
                  defaultChecked
                  {...register('secoes.insights')}
                />
                <div>
                  <Label 
                    htmlFor="secoes.insights"
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" />
                    Insights Automáticos
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Análises e recomendações automáticas baseadas nos dados
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="secoes.observacoes" 
                  defaultChecked={false}
                  {...register('secoes.observacoes')}
                />
                <div>
                  <Label 
                    htmlFor="secoes.observacoes"
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <Mail className="h-4 w-4" />
                    Observações da Equipe
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Comentários e observações adicionados manualmente
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="secoes.comparativos" 
                  defaultChecked
                  {...register('secoes.comparativos')}
                />
                <div>
                  <Label 
                    htmlFor="secoes.comparativos"
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <BarChart className="h-4 w-4" />
                    Comparativo com Períodos Anteriores
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Compara resultados com períodos equivalentes anteriores
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Resumo e botões de ação */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium mb-2">Resumo do relatório</h3>
            <ul className="space-y-1 text-sm">
              {clienteSelecionado && (
                <li>
                  <strong>Cliente:</strong> {clientes.find(c => c.id === clienteSelecionado)?.nome}
                </li>
              )}
              <li>
                <strong>Período:</strong> {formatarPeriodo(periodo)}
              </li>
              <li>
                <strong>Campanhas:</strong> {campanhasSelecionadas.length} selecionadas
              </li>
              <li>
                <strong>Seções:</strong> {Object.entries(secoesSelecionadas)
                  .filter(([_, value]) => value)
                  .map(([key]) => key)
                  .join(', ')}
              </li>
            </ul>
            
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onEnviar()}
              >
                <Mail className="mr-2 h-4 w-4" />
                Enviar por Email
              </Button>
              <Button 
                type="submit"
                disabled={!clienteSelecionado || campanhasSelecionadas.length === 0}
              >
                <Download className="mr-2 h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
