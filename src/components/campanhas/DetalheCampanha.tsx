
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import GraficoEvolucao from '@/components/dashboard/GraficoEvolucao';
import GraficoCanais from '@/components/dashboard/GraficoCanais';
import Observacoes from '@/components/observacoes/Observacoes';
import { Skeleton } from '@/components/ui/skeleton';

interface Campanha {
  id: string;
  nome: string;
  canal: 'facebook' | 'google' | 'tiktok' | 'outros';
  status: 'ativa' | 'pausada' | 'finalizada';
  leads: number;
  cpl: number;
  inicio: string;
  fim?: string;
  orcamento: number;
  objetivo: string;
  clienteId: string;
  clienteNome: string;
  // Dados de performance
  leadsHistorico: { data: string; valor: number }[];
  cliquesHistorico: { data: string; valor: number }[];
  impressoesHistorico: { data: string; valor: number }[];
  custoHistorico: { data: string; valor: number }[];
  // Outros dados estatísticos
  ctr: number;
  conversao: number;
  custoTotal: number;
}

interface DetalheCampanhaProps {
  tipoUsuario: 'agency' | 'client';
}

const DetalheCampanha: React.FC<DetalheCampanhaProps> = ({ tipoUsuario }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campanha, setCampanha] = React.useState<Campanha | null>(null);
  const [carregando, setCarregando] = React.useState<boolean>(true);
  const [metricaAtual, setMetricaAtual] = React.useState<string>('leads');

  // Dados simulados de canais
  const dadosCanais = [
    {
      plataforma: 'Facebook',
      leads: 120,
      custoTotal: 3500,
      cpl: "29.17",
      cliques: 8500,
      impressoes: 120000,
      ctr: "7.08",
      conversoes: 110,
      receita: 15000,
      campanhasAtivas: 3
    },
    {
      plataforma: 'Google',
      leads: 85,
      custoTotal: 2200,
      cpl: "25.88",
      cliques: 5200,
      impressoes: 95000,
      ctr: "5.47",
      conversoes: 78,
      receita: 11200,
      campanhasAtivas: 2
    },
    {
      plataforma: 'TikTok',
      leads: 65,
      custoTotal: 1800,
      cpl: "27.69",
      cliques: 7800,
      impressoes: 180000,
      ctr: "4.33",
      conversoes: 42,
      receita: 6800,
      campanhasAtivas: 1
    }
  ];

  React.useEffect(() => {
    const fetchCampanha = async () => {
      setCarregando(true);
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados
      const campanhaMock: Campanha = {
        id: id || 'camp_1',
        nome: 'Campanha Verão 2025 - Produto XYZ',
        canal: 'facebook',
        status: 'ativa',
        leads: 245,
        cpl: 28.50,
        inicio: '2025-01-01',
        fim: '2025-03-31',
        orcamento: 8000,
        objetivo: 'Captação de leads para lançamento do produto XYZ',
        clienteId: 'client1',
        clienteNome: 'Empresa ABC',
        // Dados de performance
        leadsHistorico: Array(30).fill(0).map((_, i) => ({
          data: new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          valor: Math.floor(Math.random() * 20) + 5
        })),
        cliquesHistorico: Array(30).fill(0).map((_, i) => ({
          data: new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          valor: Math.floor(Math.random() * 500) + 200
        })),
        impressoesHistorico: Array(30).fill(0).map((_, i) => ({
          data: new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          valor: Math.floor(Math.random() * 5000) + 3000
        })),
        custoHistorico: Array(30).fill(0).map((_, i) => ({
          data: new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          valor: Math.floor(Math.random() * 300) + 100
        })),
        // Estatísticas
        ctr: 5.8,
        conversao: 3.2,
        custoTotal: 6985.45
      };
      
      setCampanha(campanhaMock);
      setCarregando(false);
    };
    
    fetchCampanha();
  }, [id]);

  const voltar = () => {
    const basePath = tipoUsuario === 'agency' ? '/agency-dashboard' : '/client-dashboard';
    navigate(`${basePath}/campanhas`);
  };

  const getCanalBadgeColor = (canal: string) => {
    switch (canal) {
      case 'facebook': return "bg-blue-100 text-blue-800";
      case 'google': return "bg-red-100 text-red-800";
      case 'tiktok': return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'ativa': return "bg-green-100 text-green-800";
      case 'pausada': return "bg-yellow-100 text-yellow-800";
      case 'finalizada': return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  // Função para converter dados simples para o formato esperado pelo GráficoEvolução
  const converterParaDadoDiario = (dados: { data: string; valor: number }[], tipo: string) => {
    return dados.map(item => ({
      data: item.data,
      leads: tipo === 'leads' ? item.valor : 0,
      custoTotal: tipo === 'custo' ? item.valor : 0,
      receita: tipo === 'receita' ? item.valor : 0
    }));
  };

  if (carregando) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="icon" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-[120px] w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!campanha) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-2">Campanha não encontrada</h2>
        <p className="text-muted-foreground mb-4">A campanha solicitada não existe ou foi removida.</p>
        <Button onClick={voltar}>Voltar para Lista de Campanhas</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={voltar}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{campanha.nome}</h1>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={getCanalBadgeColor(campanha.canal)}>
            {campanha.canal.charAt(0).toUpperCase() + campanha.canal.slice(1)}
          </Badge>
          <Badge variant="outline" className={getStatusBadgeColor(campanha.status)}>
            {campanha.status.charAt(0).toUpperCase() + campanha.status.slice(1)}
          </Badge>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Resumo da Campanha</CardTitle>
          <CardDescription>
            {campanha.objetivo || 'Período: '}
            {formatarData(campanha.inicio)} até {campanha.fim ? formatarData(campanha.fim) : 'em andamento'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm font-medium text-muted-foreground mb-1">Total de Leads</div>
              <div className="text-2xl font-bold">{campanha.leads}</div>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm font-medium text-muted-foreground mb-1">CPL Médio</div>
              <div className="text-2xl font-bold">{formatarValor(campanha.cpl)}</div>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm font-medium text-muted-foreground mb-1">Orçamento</div>
              <div className="text-2xl font-bold">{formatarValor(campanha.orcamento)}</div>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <div className="text-sm font-medium text-muted-foreground mb-1">CTR Médio</div>
              <div className="text-2xl font-bold">{campanha.ctr.toFixed(2)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="desempenho" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
          <TabsTrigger value="canais">Canais</TabsTrigger>
          {tipoUsuario === 'agency' && (
            <TabsTrigger value="observacoes">Observações</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="desempenho">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Evolução no Período</CardTitle>
                  <select 
                    className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
                    value={metricaAtual}
                    onChange={(e) => setMetricaAtual(e.target.value)}
                  >
                    <option value="leads">Leads</option>
                    <option value="cliques">Cliques</option>
                    <option value="impressoes">Impressões</option>
                    <option value="custo">Custo</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                {metricaAtual === 'leads' && (
                  <GraficoEvolucao 
                    dados={converterParaDadoDiario(campanha.leadsHistorico, 'leads')}
                    titulo="Evolução de Leads"
                    metrica="leads"
                  />
                )}
                {metricaAtual === 'cliques' && (
                  <GraficoEvolucao 
                    dados={converterParaDadoDiario(campanha.cliquesHistorico, 'leads')}
                    titulo="Evolução de Cliques"
                    metrica="leads"
                  />
                )}
                {metricaAtual === 'impressoes' && (
                  <GraficoEvolucao 
                    dados={converterParaDadoDiario(campanha.impressoesHistorico, 'leads')}
                    titulo="Evolução de Impressões"
                    metrica="leads"
                  />
                )}
                {metricaAtual === 'custo' && (
                  <GraficoEvolucao 
                    dados={converterParaDadoDiario(campanha.custoHistorico, 'custo')}
                    titulo="Evolução de Custo"
                    metrica="custoTotal"
                  />
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Progresso de Orçamento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span>Gasto atual: {formatarValor(campanha.custoTotal)}</span>
                    <span>Orçamento: {formatarValor(campanha.orcamento)}</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${Math.min(100, (campanha.custoTotal / campanha.orcamento) * 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground text-right">
                    {Math.round((campanha.custoTotal / campanha.orcamento) * 100)}% utilizado
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Taxa de conversão</div>
                    <div className="text-2xl font-bold">{campanha.conversao.toFixed(2)}%</div>
                    <div className="text-sm text-muted-foreground">
                      {campanha.leads} leads de {Math.round(campanha.leads / (campanha.conversao / 100))} visitantes
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">CTR médio</div>
                    <div className="text-2xl font-bold">{campanha.ctr.toFixed(2)}%</div>
                    <div className="text-sm text-muted-foreground">
                      Acima da média do setor (4.2%)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="canais">
          <div className="space-y-4">
            <GraficoCanais 
              titulo="Desempenho por Canal"
              descricao="Comparativo de performance entre diferentes canais"
              dados={dadosCanais}
              metrica="leads"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Leads por Canal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dadosCanais.map((canal) => (
                      <div key={canal.plataforma} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${canal.plataforma.toLowerCase() === 'facebook' ? 'blue' : canal.plataforma.toLowerCase() === 'google' ? 'red' : 'purple'}-500`}></div>
                          <span>{canal.plataforma}</span>
                        </div>
                        <span className="font-semibold">{canal.leads}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>CPL por Canal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dadosCanais.map((canal) => (
                      <div key={canal.plataforma} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${canal.plataforma.toLowerCase() === 'facebook' ? 'blue' : canal.plataforma.toLowerCase() === 'google' ? 'red' : 'purple'}-500`}></div>
                          <span>{canal.plataforma}</span>
                        </div>
                        <span className="font-semibold">R$ {canal.cpl}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>CTR por Canal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dadosCanais.map((canal) => (
                      <div key={canal.plataforma} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${canal.plataforma.toLowerCase() === 'facebook' ? 'blue' : canal.plataforma.toLowerCase() === 'google' ? 'red' : 'purple'}-500`}></div>
                          <span>{canal.plataforma}</span>
                        </div>
                        <span className="font-semibold">{canal.ctr}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {tipoUsuario === 'agency' && (
          <TabsContent value="observacoes">
            <Observacoes 
              tipoUsuario={tipoUsuario} 
              campanhaId={campanha.id} 
              clienteId={campanha.clienteId}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default DetalheCampanha;
