
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Users, DollarSign, BarChart, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPIProps {
  title: string;
  value: string;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  icon?: React.ReactNode;
  loading?: boolean;
}

export const KPI: React.FC<KPIProps> = ({ 
  title, 
  value, 
  description, 
  trend, 
  icon, 
  loading = false 
}) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2 w-full">
              <div className="h-4 bg-muted rounded w-1/3 animate-pulse"></div>
              <div className="h-7 bg-muted rounded w-2/3 animate-pulse"></div>
              <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="w-10 h-10 bg-muted rounded animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {trend && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  "text-xs flex items-center",
                  trend.positive ? "text-emerald-600" : "text-rose-600"
                )}>
                  {trend.positive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-2">vs. período anterior</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="bg-primary/10 p-2 rounded-md">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface DashboardKPIsProps {
  loading?: boolean;
  userType?: 'agency' | 'client';
}

const DashboardKPIs: React.FC<DashboardKPIsProps> = ({ loading = false, userType = 'agency' }) => {
  // Mock data - to be replaced with actual data from API
  const kpiData = {
    totalLeads: '1,256',
    cpl: 'R$ 28,75',
    ctr: '4.32%',
    revenue: 'R$ 86.420,00'
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <KPI
        title="Total de Leads"
        value={kpiData.totalLeads}
        description="Últimos 30 dias"
        trend={{ value: 12.3, positive: true }}
        icon={<Users className="w-5 h-5 text-primary" />}
        loading={loading}
      />
      <KPI
        title="CPL Médio"
        value={kpiData.cpl}
        description="Custo por lead"
        trend={{ value: 8.1, positive: true }}
        icon={<DollarSign className="w-5 h-5 text-primary" />}
        loading={loading}
      />
      <KPI
        title="CTR Médio"
        value={kpiData.ctr}
        description="Taxa de cliques"
        trend={{ value: 2.5, positive: false }}
        icon={<BarChart className="w-5 h-5 text-primary" />}
        loading={loading}
      />
      <KPI
        title="Receita Gerada"
        value={kpiData.revenue}
        description="ROI estimado"
        trend={{ value: 18.7, positive: true }}
        icon={<TrendingUp className="w-5 h-5 text-primary" />}
        loading={loading}
      />
    </div>
  );
};

export default DashboardKPIs;
