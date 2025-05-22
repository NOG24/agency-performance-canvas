
import React from 'react';
import { Button } from "@/components/ui/button";

interface FiltroPeriodoProps {
  periodoAtual: number;
  onPeriodoChange: (periodo: number) => void;
}

const FiltroPeriodo: React.FC<FiltroPeriodoProps> = ({ 
  periodoAtual, 
  onPeriodoChange 
}) => {
  const periodos = [
    { valor: 7, rotulo: '7 dias' },
    { valor: 14, rotulo: '14 dias' },
    { valor: 30, rotulo: '30 dias' }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      <span className="text-sm font-medium text-muted-foreground">Período:</span>
      <div className="flex gap-1">
        {periodos.map((periodo) => (
          <Button
            key={periodo.valor}
            variant={periodoAtual === periodo.valor ? "default" : "outline"}
            className="text-xs px-3 py-1 h-8"
            onClick={() => onPeriodoChange(periodo.valor)}
          >
            {periodo.rotulo}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FiltroPeriodo;
