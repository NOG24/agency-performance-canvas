
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image, RefreshCw } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ConfiguracaoWhiteLabel = () => {
  const [formDados, setFormDados] = useState({
    logoUrl: '/placeholder.svg',
    corPrimaria: '#3b82f6',
    corSecundaria: '#10b981',
    tituloPersonalizado: 'NOG Performance - Dashboard',
    rodapePersonalizado: '© 2025 NOG Performance. Todos os direitos reservados.'
  });
  
  const [preview, setPreview] = useState({
    logo: formDados.logoUrl,
    corPrimaria: formDados.corPrimaria,
    corSecundaria: formDados.corSecundaria
  });
  
  const [salvando, setSalvando] = useState(false);
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDados(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simular upload - em produção, usaria Supabase Storage
      const previewUrl = URL.createObjectURL(file);
      setPreview(prev => ({
        ...prev,
        logo: previewUrl
      }));
      
      // Atualizar formDados com URL simulada
      // Na realidade, aqui você faria upload e usaria a URL retornada
      setFormDados(prev => ({
        ...prev,
        logoUrl: previewUrl
      }));
    }
  };
  
  const atualizarPreview = () => {
    setPreview({
      logo: formDados.logoUrl,
      corPrimaria: formDados.corPrimaria,
      corSecundaria: formDados.corSecundaria
    });
  };
  
  const handleSalvar = () => {
    setSalvando(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      // Aqui seria uma chamada ao Supabase
      console.log('Dados de white label salvos:', formDados);
      
      toast({
        title: "Personalização salva",
        description: "Suas configurações de White Label foram atualizadas com sucesso."
      });
      
      setSalvando(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Personalização White Label</CardTitle>
            <CardDescription>
              Configure as cores, logotipo e aparência do dashboard para seus clientes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logoUpload">Logotipo</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 border rounded-md flex items-center justify-center overflow-hidden bg-white">
                  <img 
                    src={formDados.logoUrl} 
                    alt="Logo" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <Label 
                    htmlFor="logoUpload" 
                    className="cursor-pointer flex items-center justify-center h-10 px-4 py-2 rounded-md bg-muted text-sm font-medium"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Carregar Logotipo
                  </Label>
                  <Input 
                    id="logoUpload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleLogoChange}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Recomendamos imagens em formato SVG ou PNG com fundo transparente
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="corPrimaria">Cor Primária</Label>
                <div className="flex gap-2">
                  <Input
                    id="corPrimaria"
                    name="corPrimaria"
                    type="color"
                    value={formDados.corPrimaria}
                    onChange={handleInputChange}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={formDados.corPrimaria}
                    name="corPrimaria"
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Usada em botões, links e elementos de destaque
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="corSecundaria">Cor Secundária</Label>
                <div className="flex gap-2">
                  <Input
                    id="corSecundaria"
                    name="corSecundaria"
                    type="color"
                    value={formDados.corSecundaria}
                    onChange={handleInputChange}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={formDados.corSecundaria}
                    name="corSecundaria"
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Usada em gráficos, ícones e elementos secundários
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tituloPersonalizado">Título Personalizado</Label>
              <Input
                id="tituloPersonalizado"
                name="tituloPersonalizado"
                value={formDados.tituloPersonalizado}
                onChange={handleInputChange}
              />
              <p className="text-xs text-muted-foreground">
                Aparecerá no topo do dashboard e no título da página
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rodapePersonalizado">Rodapé Personalizado</Label>
              <Input
                id="rodapePersonalizado"
                name="rodapePersonalizado"
                value={formDados.rodapePersonalizado}
                onChange={handleInputChange}
              />
              <p className="text-xs text-muted-foreground">
                Texto que aparecerá no rodapé do dashboard
              </p>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                onClick={atualizarPreview} 
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Atualizar Visualização
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSalvar} disabled={salvando}>
              {salvando ? 'Salvando...' : 'Salvar Personalização'}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Visualização</CardTitle>
            <CardDescription>
              Prévia da personalização do dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <div 
                className="h-12 flex items-center px-4 border-b"
                style={{ backgroundColor: preview.corPrimaria }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-md h-6 w-6 flex items-center justify-center overflow-hidden p-0.5">
                    <img 
                      src={preview.logo} 
                      alt="Logo" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <span className="text-white font-medium text-sm truncate max-w-[150px]">
                    {formDados.tituloPersonalizado}
                  </span>
                </div>
              </div>
              
              <div className="flex h-[300px]">
                <div className="w-16 border-r bg-muted p-2 flex flex-col items-center gap-4">
                  <div className="h-6 w-6 rounded-md"
                    style={{ backgroundColor: preview.corSecundaria }}
                  ></div>
                  <div className="h-6 w-6 rounded-md bg-gray-300"></div>
                  <div className="h-6 w-6 rounded-md bg-gray-300"></div>
                </div>
                
                <div className="flex-1 p-4 space-y-4">
                  <div className="h-8 bg-gray-100 rounded-md w-2/3"></div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-16 bg-gray-100 rounded-md"></div>
                    <div className="h-16 bg-gray-100 rounded-md"></div>
                  </div>
                  
                  <div className="h-[120px] bg-gray-100 rounded-md relative overflow-hidden">
                    <div 
                      className="absolute bottom-0 left-0 w-1/4 h-[60%] rounded-tl-md"
                      style={{ backgroundColor: preview.corPrimaria }}
                    ></div>
                    <div 
                      className="absolute bottom-0 left-1/4 w-1/4 h-[40%] rounded-tl-md"
                      style={{ backgroundColor: preview.corSecundaria }}
                    ></div>
                    <div 
                      className="absolute bottom-0 left-2/4 w-1/4 h-[70%] rounded-tl-md"
                      style={{ backgroundColor: preview.corPrimaria }}
                    ></div>
                    <div 
                      className="absolute bottom-0 left-3/4 w-1/4 h-[50%] rounded-tl-md"
                      style={{ backgroundColor: preview.corSecundaria }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="h-8 border-t flex items-center justify-center">
                <span className="text-xs text-gray-500 truncate max-w-[90%]">
                  {formDados.rodapePersonalizado}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2 justify-center mt-4">
              <div 
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: preview.corPrimaria }}
              ></div>
              <div 
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: preview.corSecundaria }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfiguracaoWhiteLabel;
