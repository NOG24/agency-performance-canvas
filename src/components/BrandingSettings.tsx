
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BrandingSettingsProps {
  onSave?: (data: any) => void;
}

const BrandingSettings: React.FC<BrandingSettingsProps> = ({ onSave }) => {
  const { toast } = useToast();
  
  // State for form values
  const [logoUrl, setLogoUrl] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#1e40af');
  const [secondaryColor, setSecondaryColor] = useState('#3b82f6');
  const [theme, setTheme] = useState('blue');
  const [customDomain, setCustomDomain] = useState('');
  
  // For logo file upload
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      
      // Generate preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleThemeChange = (value: string) => {
    setTheme(value);
    
    // Set colors based on theme
    switch (value) {
      case 'blue':
        setPrimaryColor('#1e40af');
        setSecondaryColor('#3b82f6');
        break;
      case 'green':
        setPrimaryColor('#15803d');
        setSecondaryColor('#22c55e');
        break;
      case 'purple':
        setPrimaryColor('#7e22ce');
        setSecondaryColor('#a855f7');
        break;
      case 'orange':
        setPrimaryColor('#c2410c');
        setSecondaryColor('#f97316');
        break;
    }
  };
  
  const handleBrandingSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!agencyName) {
      toast({
        title: "Agency name required",
        description: "Please enter your agency name",
        variant: "destructive",
      });
      return;
    }
    
    // Prepare data
    const brandingData = {
      agencyName,
      logoUrl: previewUrl || logoUrl, // Use preview if available, otherwise use URL
      primaryColor,
      secondaryColor,
      theme,
      customDomain
    };
    
    // Call parent save handler if provided
    if (onSave) {
      onSave(brandingData);
    }
    
    toast({
      title: "Branding updated",
      description: "Your brand settings have been saved successfully",
    });
  };
  
  const handleDomainSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate domain
    if (!customDomain || !customDomain.includes('.')) {
      toast({
        title: "Invalid domain",
        description: "Please enter a valid domain name",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Domain settings saved",
      description: `Your custom domain ${customDomain} has been saved`,
    });
  };
  
  // Function to show color preview
  const ColorPreview = ({ color }: { color: string }) => (
    <div 
      className="w-6 h-6 rounded-full border border-gray-300 mr-2"
      style={{ backgroundColor: color }}
    />
  );
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="branding">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="domain">Custom Domain</TabsTrigger>
        </TabsList>
        
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Brand Settings</CardTitle>
              <CardDescription>
                Customize how your agency brand appears to clients
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleBrandingSave}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="agencyName">Agency Name</Label>
                  <Input
                    id="agencyName"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="Your Agency Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Agency Logo</Label>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Logo Preview"
                          className="w-16 h-16 object-contain border rounded-md mr-4"
                        />
                      )}
                      <Input
                        id="logoFile"
                        type="file"
                        onChange={handleLogoChange}
                        accept="image/*"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-muted-foreground mr-2">Or enter logo URL:</span>
                      <Input
                        id="logoUrl"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="https://youragency.com/logo.png"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Color Theme</Label>
                  <RadioGroup value={theme} onValueChange={handleThemeChange} className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="blue" id="blue" />
                      <div className="flex items-center">
                        <ColorPreview color="#1e40af" />
                        <Label htmlFor="blue">Blue</Label>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="green" id="green" />
                      <div className="flex items-center">
                        <ColorPreview color="#15803d" />
                        <Label htmlFor="green">Green</Label>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="purple" id="purple" />
                      <div className="flex items-center">
                        <ColorPreview color="#7e22ce" />
                        <Label htmlFor="purple">Purple</Label>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="orange" id="orange" />
                      <div className="flex items-center">
                        <ColorPreview color="#c2410c" />
                        <Label htmlFor="orange">Orange</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 border rounded mr-2"
                        id="primaryColor"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-10 h-10 border rounded mr-2"
                        id="secondaryColor"
                      />
                      <Input
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="font-mono"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Save Brand Settings</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="domain">
          <Card>
            <CardHeader>
              <CardTitle>Custom Domain</CardTitle>
              <CardDescription>
                Set up your own domain for client dashboards
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleDomainSave}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customDomain">Custom Domain</Label>
                  <Input
                    id="customDomain"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="dashboard.youragency.com"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter the domain where you want to host your client dashboards
                  </p>
                </div>
                
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="text-sm text-blue-700">
                    <h4 className="font-medium">Domain Setup Instructions:</h4>
                    <ol className="list-decimal pl-5 space-y-1 mt-2">
                      <li>Add a CNAME record in your domain's DNS settings</li>
                      <li>Point it to: <code className="bg-blue-100 px-1 rounded">dashboards-agencyapp.example.com</code></li>
                      <li>Save your DNS changes and allow up to 48 hours for propagation</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Save Domain Settings</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrandingSettings;
