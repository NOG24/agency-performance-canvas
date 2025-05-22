
import React, { useState } from 'react';
import { useKpiData } from '@/hooks/useKpiData';
import KpiCard from './KpiCard';
import LeadsChart from './LeadsChart';
import PeriodFilter from './PeriodFilter';
import { formatCurrency, formatNumber, getPeriodLabel } from '@/utils/formatters';
import { Users, DollarSign, Megaphone, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [periodo, setPeriodo] = useState<number>(7);
  const { dados, carregando, erro } = useKpiData(periodo);

  const handlePeriodChange = (novoPeriodo: number) => {
    setPeriodo(novoPeriodo);
  };

  if (erro) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Ops, algo deu errado</h3>
          <p className="text-gray-600">{erro}</p>
          <button 
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bem-vindo ao seu Dashboard de Performance</h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe seus principais indicadores de marketing digital
          </p>
        </div>
        <PeriodFilter periodoAtual={periodo} onPeriodoChange={handlePeriodChange} />
      </div>

      {carregando ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-[150px] rounded-lg bg-muted"></div>
          ))}
          <div className="h-[350px] col-span-full rounded-lg bg-muted"></div>
        </div>
      ) : dados ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              titulo="Total de Leads"
              valor={formatNumber(dados.totalLeads)}
              descricao={`Período: ${getPeriodLabel(periodo)}`}
              tendencia={{ valor: 12.5, positiva: true }}
              icone={<Users />}
            />
            <KpiCard
              titulo="Custo por Lead (CPL)"
              valor={formatCurrency(dados.cpl)}
              descricao="Média do período atual"
              tendencia={{ valor: 5.2, positiva: true }}
              icone={<DollarSign />}
            />
            <KpiCard
              titulo="Campanhas Ativas"
              valor={dados.campanhasAtivas.toString()}
              descricao="Campanhas em execução"
              tendencia={{ valor: 0, positiva: true }}
              icone={<Megaphone />}
            />
            <KpiCard
              titulo="Receita Gerada"
              valor={formatCurrency(dados.receitaGerada)}
              descricao="Valor atribuído à conversão"
              tendencia={{ valor: 8.7, positiva: true }}
              icone={<TrendingUp />}
            />
          </div>

          <LeadsChart 
            dados={dados.evolucaoSemanal} 
            titulo="Evolução de Leads"
            descricao="Acompanhe o desempenho de captação de leads ao longo do período"
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <p>Nenhum dado disponível para o período selecionado.</p>
        </div>
      )}

      <div className="bg-muted p-4 rounded-lg mt-8">
        <h3 className="text-lg font-semibold mb-2">Dicas para melhorar seus resultados</h3>
        <ul className="space-y-1 list-disc list-inside text-muted-foreground">
          <li>Otimize seus anúncios para aumentar a taxa de conversão</li>
          <li>Verifique o desempenho das páginas de destino</li>
          <li>Analise as fontes de tráfego mais eficientes</li>
          <li>Considere ajustar o orçamento para as campanhas de melhor desempenho</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
