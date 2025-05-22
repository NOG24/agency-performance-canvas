
import React, { useState, useEffect } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import ConfiguracaoWhiteLabel from './ConfiguracaoWhiteLabel';
import ConfiguracaoIntegracoes from './ConfiguracaoIntegracoes';

interface ConfiguracoesGeraisProps {
  tipoUsuario: 'agency' | 'client';
}

const ConfiguracoesGerais: React.FC<ConfiguracoesGeraisProps> = ({ tipoUsuario }) => {
  const [formDados, setFormDados] = useState({
    nomeAgencia: 'NOG Performance',
    email: 'contato@nogperformance.com.br',
    whatsapp: '(11) 99999-9999',
    cnpj: '12.345.678/0001-90',
    notificacoesEmail: true,
    temaEscuro: false,
    idioma: 'pt-BR'
  });
  
  const [salvando, setSalvando] = useState(false);
  const { toast } = useToast();

  // Simulação de carregamento de dados da API
  useEffect(() => {
    // Aqui seria uma chamada ao Supabase
    console.log('Carregando configurações do usuário');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDados(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormDados(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormDados(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSalvar = () => {
    setSalvando(true);
    
    // Simulação de envio para API
    setTimeout(() => {
      // Aqui seria uma chamada ao Supabase
      console.log('Dados salvos:', formDados);
      
      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram atualizadas com sucesso."
      });
      
      setSalvando(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas preferências e configurações da plataforma
        </p>
      </div>
      
      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          {tipoUsuario === 'agency' && (
            <TabsTrigger value="whitelabel">White Label</TabsTrigger>
          )}
          <TabsTrigger value="integracoes">Integrações</TabsTrigger>
          <TabsTrigger value="conta">Conta</TabsTrigger>
        </TabsList>
        
        <TabsContent value="geral">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as informações básicas da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeAgencia">Nome da Agência/Empresa</Label>
                  <Input
                    id="nomeAgencia"
                    name="nomeAgencia"
                    value={formDados.nomeAgencia}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email de Contato</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formDados.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={formDados.whatsapp}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    name="cnpj"
                    value={formDados.cnpj}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notificacoesEmail">Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Receba atualizações sobre campanhas e relatórios
                    </p>
                  </div>
                  <Switch
                    id="notificacoesEmail"
                    checked={formDados.notificacoesEmail}
                    onCheckedChange={(checked) => handleSwitchChange('notificacoesEmail', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="temaEscuro">Tema Escuro</Label>
                    <p className="text-sm text-muted-foreground">
                      Ativar modo escuro na interface
                    </p>
                  </div>
                  <Switch
                    id="temaEscuro"
                    checked={formDados.temaEscuro}
                    onCheckedChange={(checked) => handleSwitchChange('temaEscuro', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="idioma">Idioma</Label>
                  <select
                    id="idioma"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formDados.idioma}
                    onChange={(e) => handleSelectChange('idioma', e.target.value)}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (United States)</option>
                    <option value="es">Español</option>
                  </select>
                  <p className="text-sm text-muted-foreground">
                    O idioma selecionado será usado em toda a plataforma
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSalvar} disabled={salvando}>
                {salvando ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {tipoUsuario === 'agency' && (
          <TabsContent value="whitelabel">
            <ConfiguracaoWhiteLabel />
          </TabsContent>
        )}
        
        <TabsContent value="integracoes">
          <ConfiguracaoIntegracoes />
        </TabsContent>
        
        <TabsContent value="conta">
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Conta</CardTitle>
              <CardDescription>
                Gerencie suas informações de login e segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="senhaAtual">Senha Atual</Label>
                <Input id="senhaAtual" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="novaSenha">Nova Senha</Label>
                <Input id="novaSenha" type="password" />
                <p className="text-sm text-muted-foreground">
                  A senha deve ter pelo menos 8 caracteres e incluir letras e números
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                <Input id="confirmarSenha" type="password" />
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Alterar Senha
                </Button>
              </div>
              
              <div className="border-t pt-4 mt-6">
                <h3 className="text-lg font-medium mb-2">Zona de Perigo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Estas ações não podem ser desfeitas. Tenha certeza antes de prosseguir.
                </p>
                
                <div className="space-y-2">
                  <Button variant="destructive" className="w-full">
                    Excluir Conta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracoesGerais;
