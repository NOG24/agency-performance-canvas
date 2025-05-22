
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatNumber } from '@/utils/formatters';

interface DadoSemana {
  semana: string;
  leads: number;
}

interface LeadsChartProps {
  dados: DadoSemana[];
  titulo: string;
  descricao?: string;
}

const customTooltip = (props: any) => {
  const { active, payload } = props;
  
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg border rounded-md">
        <p className="text-sm font-medium">{payload[0].payload.semana}</p>
        <p className="text-sm text-emerald-600 font-bold">
          {formatNumber(payload[0].value)} leads
        </p>
      </div>
    );
  }

  return null;
};

const LeadsChart: React.FC<LeadsChartProps> = ({ dados, titulo, descricao }) => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        {descricao && <CardDescription>{descricao}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dados}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="semana" 
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                tickFormatter={(value) => formatNumber(value)}
              />
              <Tooltip content={customTooltip} />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#04B45F"
                strokeWidth={2}
                dot={{ r: 4, stroke: "#04B45F", strokeWidth: 2, fill: "white" }}
                activeDot={{ r: 6, stroke: "#04B45F", strokeWidth: 2, fill: "#04B45F" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsChart;
