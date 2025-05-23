
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowDownCircle, ArrowUpCircle, Check, Clock, DollarSign, Percent, X } from "lucide-react";
import { cn } from '@/lib/utils';
import { Automacao, TipoGatilho } from '@/types/automacoes';

interface TriggerRuleCardProps {
  automacao: Automacao;
  className?: string;
  onToggleStatus?: (id: string, novoStatus: 'ativo' | 'pausado') => void;
}

const TriggerRuleCard: React.FC<TriggerRuleCardProps> = ({
  automacao,
  className,
  onToggleStatus
}) => {
  const { gatilho, valorLimite, status, clienteNome } = automacao;
  
  const getGatilhoInfo = () => {
    switch (gatilho) {
      case 'cpl_acima':
        return {
          nome: 'CPL acima do limite',
          icone: <ArrowUpCircle className="h-5 w-5 text-amber-500" />,
          valor: `> R$ ${valorLimite?.toFixed(2)}`,
          classe: 'bg-amber-50 border-amber-200'
        };
      case 'cpl_abaixo':
        return {
          nome: 'CPL abaixo do limite',
          icone: <ArrowDownCircle className="h-5 w-5 text-green-500" />,
          valor: `< R$ ${valorLimite?.toFixed(2)}`,
          classe: 'bg-green-50 border-green-200'
        };
      case 'ctr_abaixo':
        return {
          nome: 'CTR abaixo do limite',
          icone: <Percent className="h-5 w-5 text-red-500" />,
          valor: `< ${valorLimite?.toFixed(2)}%`,
          classe: 'bg-red-50 border-red-200'
        };
      case 'conversoes_abaixo':
        return {
          nome: 'Conversões abaixo do limite',
          icone: <ArrowDownCircle className="h-5 w-5 text-red-500" />,
          valor: `< ${valorLimite}`,
          classe: 'bg-red-50 border-red-200'
        };
      case 'orcamento_consumido':
        return {
          nome: 'Orçamento consumido',
          icone: <DollarSign className="h-5 w-5 text-blue-500" />,
          valor: `${valorLimite}%`,
          classe: 'bg-blue-50 border-blue-200'
        };
      default:
        return {
          nome: 'Regra não definida',
          icone: <AlertTriangle className="h-5 w-5 text-gray-500" />,
          valor: '-',
          classe: 'bg-gray-50 border-gray-200'
        };
    }
  };
  
  const getAcaoIcon = () => {
    switch (automacao.acao) {
      case 'notificar':
      case 'email':
      case 'notificacao':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'pausar':
        return <Clock className="h-5 w-5 text-red-500" />;
      case 'ajustar_orcamento':
        return <DollarSign className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getAcaoLabel = () => {
    switch (automacao.acao) {
      case 'notificar':
        return 'Notificar equipe';
      case 'email':
        return 'Enviar email';
      case 'notificacao':
        return 'Enviar notificação';
      case 'pausar':
        return 'Pausar campanha';
      case 'ajustar_orcamento':
        return 'Ajustar orçamento';
      default:
        return 'Ação desconhecida';
    }
  };
  
  const gatilhoInfo = getGatilhoInfo();

  return (
    <Card className={cn("border-2 overflow-hidden h-full", className)}>
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-2">
            <div className="font-medium text-sm text-gray-500">Cliente</div>
            {onToggleStatus && (
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-7 px-2",
                  status === 'ativo' ? "text-green-600" : "text-gray-400"
                )}
                onClick={() => onToggleStatus(automacao.id, status === 'ativo' ? 'pausado' : 'ativo')}
              >
                {status === 'ativo' ? (
                  <>
                    <Check className="h-4 w-4 mr-1" /> Ativo
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 mr-1" /> Pausado
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="text-lg font-semibold mb-4 line-clamp-1">{clienteNome}</div>
          
          <div className={cn("rounded-md p-3 mb-4", gatilhoInfo.classe)}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {gatilhoInfo.icone}
                <div className="font-medium">{gatilhoInfo.nome}</div>
              </div>
              <div className="font-bold">{gatilhoInfo.valor}</div>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="text-sm font-medium mb-1 text-gray-500">
              Ação
            </div>
            <div className="flex items-center gap-2">
              {getAcaoIcon()}
              <span>{getAcaoLabel()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TriggerRuleCard;
