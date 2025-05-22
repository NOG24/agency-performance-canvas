
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bell, Edit, ToggleLeft, ToggleRight } from "lucide-react";
import { Automacao, TipoGatilho } from "@/types/automacoes";

interface TriggerRuleCardProps {
  automacao: Automacao;
  onEdit: (id: string) => void;
  onToggle: (id: string, active: boolean) => void;
}

const gatilhoLabels: Record<TipoGatilho, string> = {
  'gasto_excessivo': 'Gasto Excessivo',
  'cpl_alto': 'CPL Alto',
  'ctr_baixo': 'CTR Baixo',
  'roas_baixo': 'ROAS Baixo'
};

const TriggerRuleCard: React.FC<TriggerRuleCardProps> = ({ 
  automacao, 
  onEdit, 
  onToggle 
}) => {
  const { id, nome, gatilho, valorLimite, status, clienteNome, acao } = automacao;
  const isActive = status === 'ativa';

  const getGatilhoIcon = () => {
    switch(gatilho) {
      case 'gasto_excessivo':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'cpl_alto':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'ctr_baixo':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'roas_baixo':
        return <AlertTriangle className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getBadgeColor = () => {
    switch(gatilho) {
      case 'gasto_excessivo': return 'bg-red-100 text-red-800';
      case 'cpl_alto': return 'bg-amber-100 text-amber-800';
      case 'ctr_baixo': return 'bg-blue-100 text-blue-800';
      case 'roas_baixo': return 'bg-purple-100 text-purple-800';
      default: return '';
    }
  };

  return (
    <Card className={`${!isActive ? 'opacity-70' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            {getGatilhoIcon()}
            {nome}
          </CardTitle>
          <Badge variant={isActive ? "default" : "outline"}>
            {isActive ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Cliente: {clienteNome}</p>
        </div>
        
        <div className="flex gap-2">
          {gatilho && (
            <span className={`text-xs px-2 py-1 rounded-full ${getBadgeColor()}`}>
              {gatilhoLabels[gatilho]} {valorLimite && `> ${valorLimite}`}
            </span>
          )}
          
          {acao && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
              {acao === 'email' ? 'Email' : acao === 'notificacao' ? 'Notificação' : 'Alerta'}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onEdit(id)}>
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onToggle(id, !isActive)}
          className="text-muted-foreground"
        >
          {isActive ? (
            <ToggleRight className="h-5 w-5 mr-1" />
          ) : (
            <ToggleLeft className="h-5 w-5 mr-1" />
          )}
          {isActive ? "Desativar" : "Ativar"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TriggerRuleCard;
