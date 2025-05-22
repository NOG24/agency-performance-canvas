
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  PieChart, 
  Calendar, 
  BarChart,
  Download,
  Copy,
  Eye
} from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ModelosDisponiveisProps {
  onSelecionarModelo: (id: string) => void;
}

// Dados mockados
const modelos = [
  {
    id: 'm1',
    nome: 'Relatório Executivo',
    descricao: 'Visão resumida para diretoria com KPIs e gráficos principais',
    imagem: '/placeholder.svg',
    popular: true,
  },
  {
    id: 'm2',
    nome: 'Relatório Detalhado',
    descricao: 'Análise completa com métricas detalhadas por campanha',
    imagem: '/placeholder.svg',
    popular: false,
  },
  {
    id: 'm3',
    nome: 'Resumo Semanal',
    descricao: 'Visão compacta dos resultados da semana',
    imagem: '/placeholder.svg',
    popular: false,
  },
  {
    id: 'm4',
    nome: 'Performance por Canal',
    descricao: 'Foco na comparação entre canais (Facebook, Google, etc)',
    imagem: '/placeholder.svg',
    popular: true,
  },
  {
    id: 'm5',
    nome: 'ROI e Conversões',
    descricao: 'Foco em métricas de conversão e retorno sobre investimento',
    imagem: '/placeholder.svg',
    popular: false,
  },
  {
    id: 'm6',
    nome: 'Visão por Público',
    descricao: 'Análise detalhada por segmentação de público',
    imagem: '/placeholder.svg',
    popular: false,
  },
];

export const ModelosDisponiveis: React.FC<ModelosDisponiveisProps> = ({ onSelecionarModelo }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modelos.map(modelo => (
        <Card key={modelo.id} className="overflow-hidden">
          <AspectRatio ratio={16/9}>
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <PieChart className="h-12 w-12 text-muted-foreground opacity-80" />
            </div>
          </AspectRatio>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{modelo.nome}</CardTitle>
              {modelo.popular && (
                <Badge variant="secondary">Popular</Badge>
              )}
            </div>
            <CardDescription>
              {modelo.descricao}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between p-4 pt-0">
            <Button 
              variant="outline" 
              size="sm"
              className="w-full mr-2"
              onClick={() => onSelecionarModelo(modelo.id)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Selecionar
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
