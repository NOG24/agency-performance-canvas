
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCcw, ArrowUp, ArrowDown, Zap } from "lucide-react";

interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'positive' | 'negative' | 'suggestion';
  kpi?: {
    name: string;
    value: number;
    trend: number;
  };
  createdAt: string;
}

interface InsightBoxProps {
  insights: Insight[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
}

const InsightBox: React.FC<InsightBoxProps> = ({ 
  insights, 
  isLoading = false,
  onRefresh,
  onExport
}) => {
  // Helper to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Helper to get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'positive':
        return <ArrowUp className="h-5 w-5 text-green-500" />;
      case 'negative':
        return <ArrowDown className="h-5 w-5 text-red-500" />;
      case 'suggestion':
        return <Zap className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  // Helper to get category text color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'suggestion':
        return 'text-amber-600';
      default:
        return '';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Insights</CardTitle>
        <div className="flex gap-2">
          {onRefresh && (
            <Button 
              variant="ghost" 
              size="icon"
              disabled={isLoading}
              onClick={onRefresh}
              className="h-8 w-8"
            >
              <RefreshCcw className="h-4 w-4" />
              <span className="sr-only">Atualizar</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : insights.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Zap className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              Ainda não há insights disponíveis. Eles serão gerados à medida que obtemos mais dados sobre suas campanhas.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div 
                key={insight.id} 
                className="p-3 border rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getCategoryIcon(insight.category)}
                  </div>
                  <div className="flex-grow">
                    <h3 className={`font-medium text-sm ${getCategoryColor(insight.category)}`}>
                      {insight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {insight.description}
                    </p>
                    
                    {insight.kpi && (
                      <div className="flex items-center gap-3 mt-3 bg-muted/50 p-2 rounded">
                        <div>
                          <p className="text-xs text-muted-foreground">{insight.kpi.name}</p>
                          <p className="font-medium">{insight.kpi.value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
                        </div>
                        <div className={`flex items-center ${insight.kpi.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {insight.kpi.trend > 0 ? (
                            <ArrowUp className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-1" />
                          )}
                          <span className="text-xs">{Math.abs(insight.kpi.trend)}%</span>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDate(insight.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {onExport && (
        <CardFooter className="pt-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={onExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar Insights
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default InsightBox;
