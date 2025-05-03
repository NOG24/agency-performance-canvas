
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  prefix?: string;
  suffix?: string;
  color?: string;
  icon?: React.ReactNode;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  trend,
  prefix = "",
  suffix = "",
  color = "text-primary",
  icon
}) => {
  return (
    <Card className="dashboard-card overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {prefix}{value}{suffix}
        </div>
        {trend && (
          <div className="flex items-center pt-2">
            <span className={`text-xs font-medium flex items-center ${trend.isUpward ? 'metrics-trend-up' : 'metrics-trend-down'}`}>
              {trend.isUpward ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(trend.value).toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1.5">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
