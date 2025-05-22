
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, AlertTriangle, TrendingUp } from "lucide-react";

interface InsightItem {
  texto: string;
  tipo: 'positivo' | 'negativo' | 'neutro';
}

interface InsightsProps {
  dados: any;
  carregando?: boolean;
}

const Insights: React.FC<InsightsProps> = ({ dados, carregando = false }) => {
  if (carregando) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <Skeleton className="h-5 w-40 mb-1" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-14 w-full mb-3" />
          <Skeleton className="h-14 w-full mb-3" />
          <Skeleton className="h-14 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Função para gerar insights automáticos com base nos dados
  const gerarInsights = (): InsightItem[] => {
    if (!dados) return [];
    
    const insights: InsightItem[] = [];
    
    // Analisando custo por lead entre plataformas
    const googleCpl = parseFloat(dados.googleAds.cpl);
    const facebookCpl = parseFloat(dados.facebookAds.cpl);
    const tiktokCpl = parseFloat(dados.tiktokAds.cpl);
    
    const cplMedio = (googleCpl + facebookCpl + tiktokCpl) / 
      (dados.tiktokAds.leads > 0 ? 3 : 2);
    
    // Verificar se o CPL do Facebook está abaixo da média
    if (facebookCpl < cplMedio * 0.8) {
      const percentual = Math.round((1 - facebookCpl / cplMedio) * 100);
      insights.push({
        texto: `O CPL do Facebook está ${percentual}% abaixo da média — potencial para escalar orçamento.`,
        tipo: 'positivo'
      });
    }
    
    // Verificar se o CTR do TikTok está baixo
    if (parseFloat(dados.tiktokAds.ctr) < 1.0 && dados.tiktokAds.leads > 0) {
      insights.push({
        texto: `TikTok com baixo CTR nos últimos dias. Verifique os criativos e segmentação.`,
        tipo: 'negativo'
      });
    }
    
    // Verificar tendência de leads
    const dadosDiarios = dados.dadosDiarios;
    if (dadosDiarios.length >= 7) {
      const ultimosSeteDias = dadosDiarios.slice(-7);
      const primeirosQuatroDias = ultimosSeteDias.slice(0, 4);
      const ultimosTresDias = ultimosSeteDias.slice(-3);
      
      const mediaInicial = primeirosQuatroDias.reduce((acc: number, dia: any) => acc + dia.leads, 0) / 4;
      const mediaFinal = ultimosTresDias.reduce((acc: number, dia: any) => acc + dia.leads, 0) / 3;
      
      const variacao = ((mediaFinal - mediaInicial) / mediaInicial) * 100;
      
      if (variacao > 20) {
        insights.push({
          texto: `Crescimento de ${Math.round(variacao)}% no volume de leads nos últimos dias. Continue com a estratégia atual.`,
          tipo: 'positivo'
        });
      } else if (variacao < -15) {
        insights.push({
          texto: `Redução de ${Math.abs(Math.round(variacao))}% no volume de leads recentemente. Verifique alterações nas campanhas.`,
          tipo: 'negativo'
        });
      }
    }
    
    // Verificar performance de conversão do Google Ads
    if (dados.googleAds.conversoes > 0) {
      const taxaConversao = (dados.googleAds.conversoes / dados.googleAds.leads) * 100;
      if (taxaConversao > 25) {
        insights.push({
          texto: `Taxa de conversão do Google Ads está em ${taxaConversao.toFixed(1)}%, muito acima da média do mercado.`,
          tipo: 'positivo'
        });
      }
    }
    
    // Se não há dados suficientes, adicionar insight genérico
    if (insights.length === 0) {
      insights.push({
        texto: `As campanhas estão gerando dados consistentes. Continue monitorando para identificar oportunidades.`,
        tipo: 'neutro'
      });
    }
    
    return insights;
  };

  const insights = gerarInsights();

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Insights Estratégicos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.length > 0 ? (
          <ul className="space-y-3">
            {insights.map((insight, index) => (
              <li 
                key={index} 
                className={`
                  flex gap-2 rounded-lg border p-3
                  ${insight.tipo === 'positivo' ? 'border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-900' : ''}
                  ${insight.tipo === 'negativo' ? 'border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-900' : ''}
                  ${insight.tipo === 'neutro' ? 'border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-900' : ''}
                `}
              >
                {insight.tipo === 'positivo' && (
                  <TrendingUp className="h-5 w-5 mt-0.5 shrink-0 text-green-600 dark:text-green-500" />
                )}
                {insight.tipo === 'negativo' && (
                  <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0 text-red-600 dark:text-red-500" />
                )}
                {insight.tipo === 'neutro' && (
                  <AlertCircle className="h-5 w-5 mt-0.5 shrink-0 text-blue-600 dark:text-blue-500" />
                )}
                <span>{insight.texto}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            Não há insights disponíveis para o período selecionado.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Insights;
