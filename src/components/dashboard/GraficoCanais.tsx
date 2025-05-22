
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

interface PlataformaDados {
  plataforma: string;
  leads: number;
  custoTotal: number;
  cpl: string;
  cliques: number;
  impressoes: number;
  ctr: string;
  conversoes: number;
  receita: number;
  campanhasAtivas: number;
}

interface GraficoCanaisProps {
  titulo: string;
  descricao?: string;
  dados: PlataformaDados[];
  metrica?: 'leads' | 'custoTotal' | 'ctr' | 'receita';
  carregando?: boolean;
}

const GraficoCanais: React.FC<GraficoCanaisProps> = ({
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
  const dadosFormatados = dados.map(item => {
    const valor = metrica === 'ctr' ? parseFloat(item[metrica]) : item[metrica];
    return {
      plataforma: item.plataforma,
      [metrica]: valor
    };
  });

  // Configurar cores e formatação com base na métrica
  const configs = {
    leads: {
      cor: '#3b82f6',
      nome: 'Leads',
      formatoValor: (valor: number) => `${Math.round(valor)}`
    },
    custoTotal: {
      cor: '#ef4444',
      nome: 'Custo Total',
      formatoValor: (valor: number) => `R$ ${valor.toFixed(2)}`
    },
    ctr: {
      cor: '#f59e0b',
      nome: 'CTR (%)',
      formatoValor: (valor: number) => `${valor.toFixed(2)}%`
    },
    receita: {
      cor: '#10b981',
      nome: 'Receita',
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
          <ChartContainer 
            config={{
              [metrica]: {
                label: config.nome,
                color: config.cor,
                theme: {
                  light: config.cor,
                  dark: config.cor,
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dadosFormatados}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="plataforma"
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
                    metrica === 'ctr' 
                      ? (value) => `${value}%`
                      : metrica !== 'leads' 
                        ? (value) => `R$ ${value}`
                        : undefined
                  }
                />
                <Tooltip
                  formatter={(value) => {
                    return [config.formatoValor(value as number), config.nome];
                  }}
                />
                <Bar 
                  dataKey={metrica} 
                  name={config.nome} 
                  fill={config.cor} 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraficoCanais;
