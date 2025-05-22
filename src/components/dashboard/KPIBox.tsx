
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown, ArrowUp } from "lucide-react";

interface KPIBoxProps {
  titulo: string;
  valor: string | number;
  descricao?: string;
  tendencia?: {
    valor: number;
    positiva: boolean;
  };
  icone?: React.ReactNode;
  corIcone?: string;
  carregando?: boolean;
}

const KPIBox: React.FC<KPIBoxProps> = ({
  titulo,
  valor,
  descricao,
  tendencia,
  icone,
  corIcone = "text-primary",
  carregando = false
}) => {
  if (carregando) {
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <Skeleton className="h-4 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-28 mb-2" />
          <Skeleton className="h-3 w-36" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{titulo}</CardTitle>
        {icone && <div className={`h-4 w-4 ${corIcone}`}>{icone}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{valor}</div>
        {descricao && (
          <p className="text-xs text-muted-foreground mt-1">{descricao}</p>
        )}
        {tendencia && (
          <div className="flex items-center mt-2">
            <span 
              className={`text-xs font-medium flex items-center ${
                tendencia.positiva 
                  ? 'text-green-500 dark:text-green-400' 
                  : 'text-red-500 dark:text-red-400'
              }`}
            >
              {tendencia.positiva ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(tendencia.valor).toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1.5">
              vs. período anterior
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPIBox;
