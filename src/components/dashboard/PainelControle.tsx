
import React, { useState } from 'react';
import { useAdsData } from '@/hooks/useAdsData';
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { RefreshCw } from 'lucide-react';
import FiltroPeriodo from './FiltroPeriodo';
import GraficoEvolucao from './GraficoEvolucao';
import GraficoCanais from './GraficoCanais';
import Observacoes from './Observacoes';
import Insights from './Insights';
import DashboardKPIs from './DashboardKPIs';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PainelControleProps {
  userType: 'agency' | 'client';
}

const PainelControle: React.FC<PainelControleProps> = ({ userType }) => {
  const [periodo, setPeriodo] = useState<number>(30);
  const { dados, carregando, erro, atualizarDados } = useAdsData({ periodo });
  const [atualizando, setAtualizando] = useState<boolean>(false);
  
  const handlePeriodoChange = (novoPeriodo: number) => {
    setPeriodo(novoPeriodo);
  };
  
  const handleAtualizar = async () => {
    setAtualizando(true);
    await atualizarDados();
    setAtualizando(false);
  };

  if (erro) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Ops, algo deu errado</h3>
          <p className="text-gray-600">{erro}</p>
          <Button 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel de Resultados</h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe os dados das campanhas em tempo real
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <FiltroPeriodo periodoAtual={periodo} onPeriodoChange={handlePeriodoChange} />
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleAtualizar}
            disabled={atualizando}
            className="h-8 w-8"
            title="Atualizar dados"
          >
            <RefreshCw className={`h-4 w-4 ${atualizando ? 'animate-spin' : ''}`} />
            <span className="sr-only">Atualizar dados</span>
          </Button>
        </div>
      </div>

      <DashboardKPIs loading={carregando} userType={userType} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraficoEvolucao 
          titulo="Evolução de Leads"
          descricao="Acompanhe o desempenho de captação de leads ao longo do período"
          dados={dados?.dadosDiarios || []}
          metrica="leads"
          carregando={carregando}
        />
        
        <GraficoCanais 
          titulo="Comparação entre Canais"
          descricao="Análise comparativa do desempenho por canal de marketing"
          dados={dados?.plataformas || []}
          metrica="leads"
          carregando={carregando}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Tabs defaultValue="leads">
          <TabsContent value="leads" className="mt-0">
            <GraficoCanais 
              titulo="Leads por Canal"
              descricao="Volume de leads gerados em cada plataforma"
              dados={dados?.plataformas || []}
              metrica="leads" 
              carregando={carregando}
            />
          </TabsContent>
          <TabsContent value="custoTotal" className="mt-0">
            <GraficoCanais 
              titulo="Custo por Canal"
              descricao="Total investido em cada plataforma"
              dados={dados?.plataformas || []}
              metrica="custoTotal"
              carregando={carregando}
            />
          </TabsContent>
          <TabsContent value="ctr" className="mt-0">
            <GraficoCanais 
              titulo="CTR por Canal"
              descricao="Taxa de cliques por impressão em cada plataforma"
              dados={dados?.plataformas || []}
              metrica="ctr"
              carregando={carregando}
            />
          </TabsContent>
          <TabsContent value="receita" className="mt-0">
            <GraficoCanais 
              titulo="Receita por Canal"
              descricao="Receita gerada por cada plataforma"
              dados={dados?.plataformas || []}
              metrica="receita"
              carregando={carregando}
            />
          </TabsContent>
          <TabsList className="mt-2">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="custoTotal">Custo</TabsTrigger>
            <TabsTrigger value="ctr">CTR</TabsTrigger>
            <TabsTrigger value="receita">Receita</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Insights e Recomendações</CardTitle>
          </CardHeader>
          <CardContent>
            <Insights dados={dados} carregando={carregando} />
          </CardContent>
        </Card>
      </div>

      {userType === 'agency' && (
        <Observacoes userType={userType} />
      )}
    </div>
  );
};

export default PainelControle;
