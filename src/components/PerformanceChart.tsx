
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
  name: string;
  investment: number;
  leads: number;
  sales?: number;
  roi?: number;
}

interface PerformanceChartProps {
  title: string;
  description?: string;
  data: ChartData[];
  showMetrics?: string[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  title, 
  description, 
  data, 
  showMetrics = ['investment', 'leads', 'sales', 'roi'] 
}) => {
  const colors = {
    investment: "#4338ca",
    leads: "#22c55e",
    sales: "#f59e0b",
    roi: "#ef4444"
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                  border: '1px solid #e2e8f0' 
                }} 
              />
              <Legend verticalAlign="top" height={36} />
              
              {showMetrics.includes('investment') && (
                <Line
                  type="monotone"
                  dataKey="investment"
                  stroke={colors.investment}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              
              {showMetrics.includes('leads') && (
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke={colors.leads}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              
              {showMetrics.includes('sales') && (
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke={colors.sales}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              
              {showMetrics.includes('roi') && (
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke={colors.roi}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
