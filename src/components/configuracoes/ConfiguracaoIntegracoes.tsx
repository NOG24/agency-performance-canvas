
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
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Plus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Integracao {
  id: string;
  nome: string;
  descricao: string;
  status: 'conectada' | 'pendente' | 'erro';
  logoUrl: string;
  dataConexao?: string;
  mensagemErro?: string;
}

const ConfiguracaoIntegracoes = () => {
  const [integracoes, setIntegracoes] = useState<Integracao[]>([
    {
      id: 'facebook',
      nome: 'Facebook Ads',
      descricao: 'Conecte-se à API do Facebook Ads para importar métricas de campanhas',
      status: 'pendente',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png'
    },
    {
      id: 'google',
      nome: 'Google Ads',
      descricao: 'Importe dados de campanhas do Google Ads automaticamente',
      status: 'pendente',
      logoUrl: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK'
    },
    {
      id: 'tiktok',
      nome: 'TikTok Ads',
      descricao: 'Conecte-se à TikTok Ads para campanhas da plataforma',
      status: 'pendente',
      logoUrl: 'https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png'
    }
  ]);
  
  const [conectando, setConectando] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConectar = (id: string) => {
    setConectando(id);
    
    // Simulação de conexão com a API
    setTimeout(() => {
      // Atualizar o status da integração
      setIntegracoes(prev => 
        prev.map(integracao => 
          integracao.id === id 
            ? { 
                ...integracao, 
                status: 'conectada',
                dataConexao: new Date().toISOString()
              } 
            : integracao
        )
      );
      
      setConectando(null);
      
      toast({
        title: "Integração realizada",
        description: `Conexão com ${id.charAt(0).toUpperCase() + id.slice(1)} Ads estabelecida com sucesso.`,
      });
    }, 2000);
  };

  const handleDesconectar = (id: string) => {
    // Atualizar o status da integração
    setIntegracoes(prev => 
      prev.map(integracao => 
        integracao.id === id 
          ? { 
              ...integracao, 
              status: 'pendente',
              dataConexao: undefined,
              mensagemErro: undefined
            } 
          : integracao
      )
    );
    
    toast({
      title: "Integração desconectada",
      description: `Conexão com ${id.charAt(0).toUpperCase() + id.slice(1)} Ads removida.`,
    });
  };

  const simularErro = (id: string) => {
    setConectando(id);
    
    // Simulação de erro na conexão
    setTimeout(() => {
      // Atualizar o status da integração
      setIntegracoes(prev => 
        prev.map(integracao => 
          integracao.id === id 
            ? { 
                ...integracao, 
                status: 'erro',
                mensagemErro: 'Falha na autenticação. Verifique as credenciais e tente novamente.'
              } 
            : integracao
        )
      );
      
      setConectando(null);
      
      toast({
        title: "Erro na integração",
        description: `Falha ao conectar com ${id.charAt(0).toUpperCase() + id.slice(1)} Ads.`,
        variant: "destructive"
      });
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'conectada':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Conectada</Badge>;
      case 'pendente':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'erro':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Erro</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'conectada':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pendente':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'erro':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrações de Plataformas</CardTitle>
          <CardDescription>
            Conecte suas contas de plataformas de anúncios para importar dados automaticamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integracoes.map((integracao) => (
              <div 
                key={integracao.id} 
                className="border rounded-lg p-4 flex flex-col md:flex-row gap-4"
              >
                <div className="h-12 w-12 bg-white rounded-md p-1 flex items-center justify-center">
                  <img 
                    src={integracao.logoUrl} 
                    alt={integracao.nome} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{integracao.nome}</h3>
                    {getStatusBadge(integracao.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {integracao.descricao}
                  </p>
                  {integracao.dataConexao && (
                    <p className="text-xs text-muted-foreground">
                      Conectado em: {new Date(integracao.dataConexao).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                  {integracao.mensagemErro && (
                    <p className="text-xs text-red-500">
                      {integracao.mensagemErro}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0">
                    {getStatusIcon(integracao.status)}
                  </div>
                  
                  <div className="flex-shrink-0">
                    {integracao.status === 'pendente' || integracao.status === 'erro' ? (
                      <Button 
                        onClick={() => handleConectar(integracao.id)}
                        disabled={conectando === integracao.id}
                        className="whitespace-nowrap"
                      >
                        {conectando === integracao.id ? 'Conectando...' : 'Conectar'}
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        onClick={() => handleDesconectar(integracao.id)}
                        className="whitespace-nowrap"
                      >
                        Desconectar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="border rounded-lg border-dashed p-4 flex items-center justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Outra Integração
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API Personalizada</CardTitle>
          <CardDescription>
            Configure integrações com suas próprias APIs ou serviços externos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiUrl">URL da API</Label>
              <Input 
                id="apiUrl" 
                placeholder="https://api.example.com/v1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">Chave da API</Label>
              <Input 
                id="apiKey" 
                type="password" 
                placeholder="Insira sua chave de API"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiEndpoint">Endpoint</Label>
              <Input 
                id="apiEndpoint" 
                placeholder="/metrics"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Método</Label>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="methodGet" 
                    name="method" 
                    value="GET" 
                    className="mr-2"
                    defaultChecked
                  />
                  <Label htmlFor="methodGet" className="text-sm">GET</Label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id="methodPost" 
                    name="method" 
                    value="POST" 
                    className="mr-2"
                  />
                  <Label htmlFor="methodPost" className="text-sm">POST</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Testar Conexão</Button>
          <Button>Salvar Configuração</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConfiguracaoIntegracoes;
