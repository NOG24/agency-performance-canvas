
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Calendar, ArrowDown, ArrowUp, ChevronRight } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

interface ClienteDashboardViewProps {
  clientName: string;
  agencyLogo?: string;
  agencyName: string;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onExportPDF: () => void;
  onScheduleCall: () => void;
  children: React.ReactNode;
}

const ClienteDashboardView: React.FC<ClienteDashboardViewProps> = ({
  clientName,
  agencyLogo,
  agencyName,
  dateRange,
  onDateRangeChange,
  onExportPDF,
  onScheduleCall,
  children
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            {agencyLogo ? (
              <img 
                src={agencyLogo} 
                alt={agencyName} 
                className="h-8" 
              />
            ) : (
              <span className="text-xl font-semibold">{agencyName}</span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={onScheduleCall} 
              className="gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Agendar Call</span>
            </Button>
            <Button 
              variant="default" 
              onClick={onExportPDF} 
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Exportar PDF</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container py-6 px-4 md:px-6 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">{clientName}</h1>
            <p className="text-muted-foreground">Dashboard de Performance</p>
          </div>
          
          <div className="w-full md:w-auto">
            <DateRangePicker 
              value={dateRange}
              onChange={onDateRangeChange}
            />
          </div>
        </div>
        
        <Tabs defaultValue="visao-geral">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="campanhas">Campanhas</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="visao-geral" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard 
                  title="Investimento Total"
                  value="R$ 12.450,00"
                  change={7.2}
                  isPositive={false}
                />
                <MetricCard 
                  title="Leads Gerados"
                  value="326"
                  change={12.5}
                  isPositive={true}
                />
                <MetricCard 
                  title="Custo por Lead"
                  value="R$ 38,19"
                  change={4.8}
                  isPositive={true}
                />
              </div>
              
              {children}
            </TabsContent>
            
            <TabsContent value="campanhas">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Resultados por Campanha</h3>
                  
                  <div className="space-y-4">
                    {['Facebook Leads', 'Google Search', 'Instagram Stories'].map((name, i) => (
                      <div key={i} className="border rounded-lg p-4 hover:border-primary cursor-pointer transition-colors">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{name}</h4>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="grid grid-cols-3 mt-3 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Gasto</p>
                            <p className="font-medium">R$ {(Math.random() * 5000).toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Leads</p>
                            <p className="font-medium">{Math.floor(Math.random() * 150)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">CPL</p>
                            <p className="font-medium">R$ {(Math.random() * 50).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="relatorios">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Relatórios Mensais</h3>
                  
                  <div className="space-y-4">
                    {['Janeiro 2025', 'Dezembro 2024', 'Novembro 2024'].map((month, i) => (
                      <div key={i} className="flex items-center justify-between border rounded-lg p-4">
                        <div>
                          <h4 className="font-medium">{month}</h4>
                          <p className="text-sm text-muted-foreground">Disponível desde {i === 0 ? '01/01/2025' : i === 1 ? '03/12/2024' : '02/11/2024'}</p>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

// Local component for metrics cards
const MetricCard = ({ 
  title, 
  value, 
  change, 
  isPositive 
}: { 
  title: string, 
  value: string, 
  change: number, 
  isPositive: boolean 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <div className="flex items-center mt-2">
          <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            <span className="text-sm font-medium">{change}%</span>
          </div>
          <span className="text-xs text-muted-foreground ml-2">vs período anterior</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClienteDashboardView;
