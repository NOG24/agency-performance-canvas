
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DadoDiario {
  data: Date;
  leads: number;
  custoTotal: number;
  receita: number;
}

interface GraficoEvolucaoProps {
  titulo: string;
  descricao?: string;
  dados: DadoDiario[];
  metrica?: 'leads' | 'custoTotal' | 'receita';
  carregando?: boolean;
}

const GraficoEvolucao: React.FC<GraficoEvolucaoProps> = ({
  titulo,
  descricao,
  dados,
  metrica = 'leads',
  carregando = false
}) => {
  if (carregando) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <Skeleton className="h-5 w-40 mb-1" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="p-6">
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  // Formatar dados para o gráfico
  const dadosFormatados = dados.map(item => ({
    ...item,
    data: format(new Date(item.data), 'dd/MM'),
    valor: item[metrica],
  }));

  // Configurar cores com base na métrica
  const configs = {
    leads: {
      corLinha: '#3b82f6',
      nomeLegenda: 'Total de Leads',
      formatoValor: (valor: number) => `${valor}`
    },
    custoTotal: {
      corLinha: '#ef4444',
      nomeLegenda: 'Custo Total',
      formatoValor: (valor: number) => `R$ ${valor.toFixed(2)}`
    },
    receita: {
      corLinha: '#10b981',
      nomeLegenda: 'Receita',
      formatoValor: (valor: number) => `R$ ${valor.toFixed(2)}`
    }
  };

  const config = configs[metrica];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        {descricao && <CardDescription>{descricao}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <div className="h-[350px] w-full">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dadosFormatados}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="data"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={
                    metrica === 'leads' 
                      ? (value) => `${value}`
                      : (value) => `R$ ${value}`
                  }
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Data
                              </span>
                              <span className="font-bold text-sm">
                                {payload[0].payload.data}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {config.nomeLegenda}
                              </span>
                              <span className="font-bold text-sm">
                                {config.formatoValor(payload[0].value as number)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="valor"
                  stroke={config.corLinha}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraficoEvolucao;
