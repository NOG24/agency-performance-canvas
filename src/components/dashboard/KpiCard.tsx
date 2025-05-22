
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface KpiCardProps {
  titulo: string;
  valor: string;
  descricao?: string;
  tendencia?: {
    valor: number;
    positiva: boolean;
  };
  icone?: React.ReactNode;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  titulo,
  valor,
  descricao,
  tendencia,
  icone,
  className
}) => {
  return (
    <Card className={`dashboard-card ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{titulo}</CardTitle>
        {icone && <div className="h-4 w-4 text-muted-foreground">{icone}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{valor}</div>
        {descricao && (
          <p className="text-xs text-muted-foreground mt-1">{descricao}</p>
        )}
        {tendencia && (
          <div className="flex items-center pt-2">
            <span className={`text-xs font-medium flex items-center ${tendencia.positiva ? 'text-emerald-600' : 'text-rose-600'}`}>
              {tendencia.positiva ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(tendencia.valor).toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1.5">vs período anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KpiCard;
