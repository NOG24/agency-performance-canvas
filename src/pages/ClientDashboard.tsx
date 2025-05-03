
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import MetricsCard from '@/components/MetricsCard';
import PerformanceChart from '@/components/PerformanceChart';
import CampaignTable from '@/components/CampaignTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClientDashboard = () => {
  // Mock client data
  const clientInfo = {
    name: "TechStart Inc.",
    logo: "/placeholder.svg",
    industry: "SaaS",
    since: "March 2025"
  };
  
  // Mock campaign data
  const campaigns = [
    {
      id: "1",
      name: "Product Launch",
      platform: "Facebook",
      status: "active" as const,
      investment: 5000,
      leads: 85,
      sales: 15000,
      roi: 3,
      startDate: "2025-03-15",
    },
    {
      id: "2",
      name: "Retargeting Campaign",
      platform: "Google Ads",
      status: "active" as const,
      investment: 3500,
      leads: 62,
      sales: 11000,
      roi: 3.1,
      startDate: "2025-04-01",
    },
    {
      id: "3",
      name: "Awareness Campaign",
      platform: "LinkedIn",
      status: "paused" as const,
      investment: 4500,
      leads: 48,
      sales: 7000,
      roi: 1.6,
      startDate: "2025-02-20",
      endDate: "2025-04-20"
    },
  ];
  
  // Performance data
  const performanceData = [
    { name: "Week 1", investment: 2800, leads: 38, sales: 6500, roi: 2.3 },
    { name: "Week 2", investment: 3200, leads: 52, sales: 8200, roi: 2.6 },
    { name: "Week 3", investment: 3500, leads: 57, sales: 9000, roi: 2.6 },
    { name: "Week 4", investment: 3000, leads: 48, sales: 9300, roi: 3.1 },
  ];
  
  // Calculate totals
  const totalInvestment = campaigns.reduce((sum, campaign) => sum + campaign.investment, 0);
  const totalLeads = campaigns.reduce((sum, campaign) => sum + campaign.leads, 0);
  const totalSales = campaigns.reduce((sum, campaign) => sum + campaign.sales, 0);
  const averageROI = campaigns.reduce((sum, campaign) => sum + campaign.roi, 0) / campaigns.length;
  
  return (
    <DashboardLayout 
      userType="client"
      brandName="Your Marketing Partner"
      brandLogo="/placeholder.svg"
    >
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{clientInfo.name}</h1>
            <p className="text-muted-foreground">
              Campaign performance dashboard | Updated May 2, 2025
            </p>
          </div>
          <Card className="w-full sm:w-auto bg-primary/5">
            <CardContent className="p-4">
              <div className="text-sm font-medium">Current Period: April 2025</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricsCard 
            title="Total Investment" 
            value={`$${totalInvestment.toLocaleString()}`}
            prefix="$"
            trend={{ value: 8.5, isUpward: true }}
          />
          <MetricsCard 
            title="Leads Generated" 
            value={totalLeads}
            trend={{ value: 12.3, isUpward: true }}
          />
          <MetricsCard 
            title="Total Sales" 
            value={`$${totalSales.toLocaleString()}`}
            prefix="$"
            trend={{ value: 15.7, isUpward: true }}
          />
          <MetricsCard 
            title="ROI" 
            value={`${averageROI.toFixed(1)}x`}
            trend={{ value: 5.2, isUpward: true }}
          />
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <PerformanceChart
              title="Marketing Performance"
              description="Weekly performance metrics for all campaigns"
              data={performanceData}
            />
            
            <CampaignTable campaigns={campaigns} />
          </TabsContent>
          
          <TabsContent value="campaigns" className="space-y-6">
            <CampaignTable campaigns={campaigns} />
            
            <div className="grid gap-6 md:grid-cols-2">
              {campaigns.map(campaign => (
                <Card key={campaign.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <CardTitle>{campaign.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Platform:</span>
                        <span className="font-medium">{campaign.platform}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium capitalize">{campaign.status}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Investment:</span>
                        <span className="font-medium">${campaign.investment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Leads:</span>
                        <span className="font-medium">{campaign.leads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sales:</span>
                        <span className="font-medium">${campaign.sales.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">ROI:</span>
                        <span className="font-medium">{campaign.roi.toFixed(1)}x</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <PerformanceChart
                title="Investment vs. Leads"
                data={performanceData}
                showMetrics={['investment', 'leads']}
              />
              <PerformanceChart
                title="Investment vs. Sales"
                data={performanceData}
                showMetrics={['investment', 'sales']}
              />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>ROI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceChart
                  title=""
                  data={performanceData}
                  showMetrics={['roi']}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
