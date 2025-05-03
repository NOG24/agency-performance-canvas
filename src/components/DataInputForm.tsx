
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataInputFormProps {
  clientId?: string;
  campaignId?: string;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

const DataInputForm: React.FC<DataInputFormProps> = ({ 
  clientId, 
  campaignId, 
  onSubmit, 
  onCancel 
}) => {
  const { toast } = useToast();
  const [tab, setTab] = useState('manual');
  
  // Form states
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('');
  const [status, setStatus] = useState('');
  const [investment, setInvestment] = useState('');
  const [leads, setLeads] = useState('');
  const [sales, setSales] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !platform || !status || !investment || !leads || !sales || !startDate) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Calculate ROI
    const investmentVal = parseFloat(investment);
    const salesVal = parseFloat(sales);
    const roi = salesVal > 0 ? salesVal / investmentVal : 0;
    
    const campaignData = {
      name,
      platform,
      status,
      investment: investmentVal,
      leads: parseInt(leads),
      sales: salesVal,
      roi,
      startDate,
      endDate: endDate || undefined,
    };
    
    if (onSubmit) {
      onSubmit(campaignData);
    }
    
    toast({
      title: "Data saved",
      description: "Campaign data has been successfully saved",
    });
    
    // Reset form
    resetForm();
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would process the file
    // For demo purposes, we'll just show a success message
    toast({
      title: "File uploaded",
      description: `Successfully uploaded ${file.name}`,
    });
    
    setFile(null);
  };

  const resetForm = () => {
    setName('');
    setPlatform('');
    setStatus('');
    setInvestment('');
    setLeads('');
    setSales('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Campaign Data Input</CardTitle>
        <CardDescription>
          Add new campaign data manually or upload a spreadsheet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="upload">File Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <form onSubmit={handleManualSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Summer Promotion"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="google">Google Ads</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="investment">Investment ($)</Label>
                  <Input 
                    id="investment" 
                    type="number"
                    value={investment} 
                    onChange={(e) => setInvestment(e.target.value)}
                    placeholder="1000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leads">Leads Generated</Label>
                  <Input 
                    id="leads" 
                    type="number"
                    value={leads} 
                    onChange={(e) => setLeads(e.target.value)}
                    placeholder="100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sales">Sales Value ($)</Label>
                  <Input 
                    id="sales" 
                    type="number"
                    value={sales} 
                    onChange={(e) => setSales(e.target.value)}
                    placeholder="3000"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="date"
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input 
                    id="endDate" 
                    type="date"
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                )}
                <Button type="submit">Save Campaign Data</Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="upload">
            <form onSubmit={handleFileUpload} className="space-y-4 pt-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="file">Upload CSV or Excel file</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                />
              </div>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Download our <a href="#" className="text-blue-600 underline">template spreadsheet</a> for proper formatting
                </p>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                {onCancel && (
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                )}
                <Button type="submit" disabled={!file}>Upload Data</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataInputForm;
