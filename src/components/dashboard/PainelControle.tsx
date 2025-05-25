
import React from 'react';
import DashboardKPIs from './DashboardKPIs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, MessageSquare, Settings, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PainelControleProps {
  userType: 'agency' | 'client';
}

const PainelControle: React.FC<PainelControleProps> = ({ userType }) => {
  const basePath = userType === 'agency' ? '/agency-dashboard' : '/client-dashboard';

  const quickActions = userType === 'agency' ? [
    { title: 'Gerenciar Campanhas', description: 'Visualizar e otimizar campanhas', icon: BarChart3, path: `${basePath}/campanhas` },
    { title: 'Clientes', description: 'Gerenciar clientes da agência', icon: Users, path: `${basePath}/clients` },
    { title: 'Observações', description: 'Anotações e insights', icon: MessageSquare, path: `${basePath}/observacoes` },
    { title: 'Configurações', description: 'Personalizar agência', icon: Settings, path: `${basePath}/configuracoes` }
  ] : [
    { title: 'Minhas Campanhas', description: 'Acompanhar performance', icon: BarChart3, path: `${basePath}/campanhas` },
    { title: 'Relatórios', description: 'Visualizar resultados', icon: TrendingUp, path: `${basePath}/relatorios` },
    { title: 'Agenda', description: 'Próximos compromissos', icon: Calendar, path: `${basePath}/agenda` },
    { title: 'Configurações', description: 'Preferências da conta', icon: Settings, path: `${basePath}/configuracoes` }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {userType === 'agency' ? 'Painel da Agência' : 'Meu Dashboard'}
        </h1>
        <p className="text-muted-foreground">
          {userType === 'agency' 
            ? 'Gerencie campanhas, clientes e monitore a performance geral da agência'
            : 'Acompanhe o desempenho das suas campanhas de marketing digital'
          }
        </p>
      </div>

      {/* KPIs */}
      <DashboardKPIs userType={userType} />

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <action.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-sm">{action.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs">
                    {action.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity or Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: 'Nova campanha criada', time: '2 horas atrás', type: 'success' },
                { action: 'Meta de CPL atingida', time: '5 horas atrás', type: 'success' },
                { action: 'Orçamento ajustado', time: '1 dia atrás', type: 'info' },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Próximos Passos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userType === 'agency' ? [
                'Revisar campanhas com baixo CTR',
                'Agendar reunião com Cliente A',
                'Atualizar relatório mensal',
                'Configurar nova automação'
              ] : [
                'Revisar performance da campanha principal',
                'Agendar reunião de resultados',
                'Aprovar novo material criativo',
                'Definir metas para próximo mês'
              ].map((task, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                    ✓
                  </Button>
                  <span className="text-sm">{task}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PainelControle;
