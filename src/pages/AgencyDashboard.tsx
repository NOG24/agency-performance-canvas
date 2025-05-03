
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import MetricsCard from '@/components/MetricsCard';
import PerformanceChart from '@/components/PerformanceChart';
import ClientsList from '@/components/ClientsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import DataInputForm from '@/components/DataInputForm';
import { useToast } from "@/components/ui/use-toast";

const AgencyDashboard = () => {
  const { toast } = useToast();
  const [showAddData, setShowAddData] = useState(false);
  
  // Mock data for clients
  const clients = [
    {
      id: '1',
      name: 'Acme Corporation',
      industry: 'E-commerce',
      campaigns: 5,
      investment: 25000,
      leads: 520,
      roi: 3.2,
      lastUpdated: '2025-04-28',
    },
    {
      id: '2',
      name: 'TechStart Inc',
      industry: 'SaaS',
      campaigns: 3,
      investment: 15000,
      leads: 210,
      roi: 2.8,
      lastUpdated: '2025-05-01',
    },
    {
      id: '3',
      name: 'Green Wellness',
      industry: 'Health',
      campaigns: 4,
      investment: 12000,
      leads: 180,
      roi: 1.5,
      lastUpdated: '2025-04-25',
    },
    {
      id: '4',
      name: 'Urban Eats',
      industry: 'Food & Beverage',
      campaigns: 2,
      investment: 8000,
      leads: 320,
      roi: 0.9,
      lastUpdated: '2025-04-30',
    },
  ];
  
  // Mock performance data
  const performanceData = [
    { name: 'Jan', investment: 25000, leads: 480, sales: 55000 },
    { name: 'Feb', investment: 28000, leads: 520, sales: 62000 },
    { name: 'Mar', investment: 32000, leads: 610, sales: 78000 },
    { name: 'Apr', investment: 38000, leads: 720, sales: 95000 },
    { name: 'May', investment: 35000, leads: 680, sales: 88000 },
  ];
  
  const handleDataSubmit = (data: any) => {
    console.log('New data submitted:', data);
    toast({
      title: "Campaign data saved",
      description: "The campaign data has been added successfully",
    });
    setShowAddData(false);
  };
  
  // Calculate total metrics
  const totalInvestment = clients.reduce((sum, client) => sum + client.investment, 0);
  const totalLeads = clients.reduce((sum, client) => sum + client.leads, 0);
  const averageROI = clients.reduce((sum, client) => sum + client.roi, 0) / clients.length;

  return (
    <DashboardLayout userType="agency">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Agency Dashboard</h1>
          <div className="mt-4 sm:mt-0 flex gap-4">
            <Button onClick={() => setShowAddData(!showAddData)}>
              {showAddData ? 'Cancel' : 'Add Campaign Data'}
            </Button>
          </div>
        </div>
        
        {showAddData ? (
          <div className="my-6">
            <DataInputForm 
              onSubmit={handleDataSubmit}
              onCancel={() => setShowAddData(false)}
            />
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MetricsCard 
                title="Total Investment" 
                value={`$${totalInvestment.toLocaleString()}`}
                trend={{ value: 12.5, isUpward: true }}
              />
              <MetricsCard 
                title="Total Leads" 
                value={totalLeads.toLocaleString()}
                trend={{ value: 8.2, isUpward: true }}
              />
              <MetricsCard 
                title="Average ROI" 
                value={`${averageROI.toFixed(1)}x`}
                trend={{ value: 3.1, isUpward: true }}
              />
            </div>
            
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
                <TabsTrigger value="trends">Performance Trends</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <PerformanceChart
                  title="Agency Performance Overview"
                  description="Monthly investment, leads, and sales across all clients"
                  data={performanceData}
                />
                
                <ClientsList clients={clients} />
              </TabsContent>
              
              <TabsContent value="clients">
                <ClientsList clients={clients} />
              </TabsContent>
              
              <TabsContent value="trends" className="space-y-6">
                <PerformanceChart
                  title="Investment vs. Results"
                  description="Monthly investment compared to leads generated and sales"
                  data={performanceData}
                />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <PerformanceChart
                    title="Lead Generation Trend"
                    description="Monthly lead generation performance"
                    data={performanceData}
                    showMetrics={['leads']}
                  />
                  <PerformanceChart
                    title="Sales Performance"
                    description="Monthly sales performance"
                    data={performanceData}
                    showMetrics={['sales']}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AgencyDashboard;
