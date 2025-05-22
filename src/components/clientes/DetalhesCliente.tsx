
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, Building, Phone, Edit, Trash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import TabelaCampanhas from '../campanhas/TabelaCampanhas';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: 'ativo' | 'inativo' | 'pendente';
  campanhasAtivas: number;
  plano: 'starter' | 'pro' | 'enterprise';
  dataCriacao: string;
  ultimoAcesso?: string;
  logo?: string;
  observacoes?: string;
  segmento: string;
  endereco: string;
  site: string;
  contatoPrincipal: string;
  dataRenovacao: string;
}

interface Campanha {
  id: string;
  nome: string;
  canal: 'facebook' | 'google' | 'tiktok' | 'outros';
  status: 'ativa' | 'pausada' | 'finalizada';
  leads: number;
  cpl: number;
  inicio: string;
  fim?: string;
  orcamento: number;
  objetivo: string;
  clienteId: string;
  clienteNome: string;
}

const DetalhesCliente: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      
      // Simular atraso da API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dados simulados do cliente
      const clienteMock: Cliente = {
        id: id || 'client1',
        nome: 'Empresa ABC Ltda',
        email: 'contato@empresaabc.com.br',
        telefone: '(11) 3456-7890',
        status: 'ativo',
        campanhasAtivas: 4,
        plano: 'pro',
        dataCriacao: '2024-11-10T14:30:00',
        ultimoAcesso: '2025-05-20T09:15:00',
        logo: 'https://via.placeholder.com/150',
        observacoes: 'Cliente desde 2024, foco em campanhas de performance para e-commerce.\n\nObjetivos principais:\n- Aumentar conversões no site\n- Reduzir CPL\n- Expandir alcance em novas regiões',
        segmento: 'E-commerce',
        endereco: 'Av. Paulista, 1000 - São Paulo/SP',
        site: 'www.empresaabc.com.br',
        contatoPrincipal: 'João Silva (Diretor de Marketing)',
        dataRenovacao: '2025-11-10T00:00:00'
      };
      
      // Dados simulados de campanhas
      const campanhasMock: Campanha[] = [
        {
          id: 'camp_1',
          nome: 'Campanha Verão 2025',
          canal: 'facebook',
          status: 'ativa',
          leads: 145,
          cpl: 28.50,
          inicio: '2025-01-01',
          fim: '2025-03-31',
          orcamento: 5000,
          objetivo: 'Captação de leads para produtos de verão',
          clienteId: id || 'client1',
          clienteNome: 'Empresa ABC Ltda'
        },
        {
          id: 'camp_2',
          nome: 'Google Ads - Produto XYZ',
          canal: 'google',
          status: 'ativa',
          leads: 78,
          cpl: 32.10,
          inicio: '2025-02-15',
          orcamento: 3000,
          objetivo: 'Vendas do produto XYZ',
          clienteId: id || 'client1',
          clienteNome: 'Empresa ABC Ltda'
        },
        {
          id: 'camp_3',
          nome: 'Remarketing - Carrinho Abandonado',
          canal: 'facebook',
          status: 'ativa',
          leads: 92,
          cpl: 18.75,
          inicio: '2025-01-20',
          orcamento: 1500,
          objetivo: 'Recuperação de carrinhos abandonados',
          clienteId: id || 'client1',
          clienteNome: 'Empresa ABC Ltda'
        },
        {
          id: 'camp_4',
          nome: 'TikTok - Lançamento Coleção Nova',
          canal: 'tiktok',
          status: 'ativa',
          leads: 56,
          cpl: 35.20,
          inicio: '2025-03-01',
          fim: '2025-04-30',
          orcamento: 2500,
          objetivo: 'Divulgação da nova coleção',
          clienteId: id || 'client1',
          clienteNome: 'Empresa ABC Ltda'
        }
      ];
      
      setCliente(clienteMock);
      setCampanhas(campanhasMock);
      setCarregando(false);
    };
    
    carregarDados();
  }, [id]);

  const handleVoltar = () => {
    navigate('/agency-dashboard/clients');
  };

  const handleEditar = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A edição de clientes pela página de detalhes será implementada em breve.",
    });
  };

  const handleExcluir = () => {
    toast({
      title: "Cliente excluído",
      description: `${cliente?.nome} foi excluído com sucesso.`,
    });
    navigate('/agency-dashboard/clients');
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'inativo':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Inativo</Badge>;
      case 'pendente':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      default:
        return null;
    }
  };

  const getPlanoBadge = (plano: string) => {
    switch (plano) {
      case 'starter':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Starter</Badge>;
      case 'pro':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800">Pro</Badge>;
      case 'enterprise':
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-800">Enterprise</Badge>;
      default:
        return null;
    }
  };

  const formatarObservacoes = (texto?: string) => {
    if (!texto) return '';
    return texto.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
  };

  if (carregando) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="icon" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="space-y-4 flex-1">
                <Skeleton className="h-5 w-full max-w-md" />
                <Skeleton className="h-5 w-full max-w-sm" />
                <Skeleton className="h-5 w-full max-w-xs" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-2">Cliente não encontrado</h2>
        <p className="text-muted-foreground mb-4">O cliente solicitado não existe ou foi removido.</p>
        <Button onClick={handleVoltar}>Voltar para Lista de Clientes</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleVoltar}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{cliente.nome}</h1>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEditar}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente o cliente {cliente.nome} e todos os seus dados.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleExcluir} className="bg-destructive text-destructive-foreground">
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informações do Cliente</CardTitle>
          <CardDescription>
            Cliente desde {formatarData(cliente.dataCriacao)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-32 w-32">
                <AvatarImage src={cliente.logo} alt={cliente.nome} />
                <AvatarFallback className="text-2xl">
                  {cliente.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center gap-1">
                {getStatusBadge(cliente.status)}
                {getPlanoBadge(cliente.plano)}
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div>{cliente.email}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Telefone</div>
                    <div>{cliente.telefone}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Segmento</div>
                    <div>{cliente.segmento}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Contato Principal</div>
                    <div>{cliente.contatoPrincipal}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 md:col-span-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Contrato</div>
                    <div>Renovação em {formatarData(cliente.dataRenovacao)}</div>
                  </div>
                </div>
              </div>
              
              {cliente.observacoes && (
                <div className="bg-muted p-4 rounded-md mt-4">
                  <h3 className="font-medium mb-2">Observações Internas</h3>
                  <div 
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: formatarObservacoes(cliente.observacoes) }}
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="campanhas" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="campanhas">Campanhas</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campanhas">
          <TabelaCampanhas 
            campanhas={campanhas}
            tipoUsuario="agency"
            clienteId={cliente.id}
          />
        </TabsContent>
        
        <TabsContent value="financeiro">
          <Card>
            <CardHeader>
              <CardTitle>Informações Financeiras</CardTitle>
              <CardDescription>Dados financeiros e faturamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Valor Mensal</div>
                  <div className="text-2xl font-bold">R$ 2.500,00</div>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Próximo Faturamento</div>
                  <div className="text-2xl font-bold">10/06/2025</div>
                </div>
                
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Status de Pagamento</div>
                  <div className="text-2xl font-bold">Em dia</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Histórico de Faturamento</h3>
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted">
                        <th className="py-3 px-4 text-left">Data</th>
                        <th className="py-3 px-4 text-left">Descrição</th>
                        <th className="py-3 px-4 text-right">Valor</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">10/05/2025</td>
                        <td className="py-3 px-4">Mensalidade Maio/2025</td>
                        <td className="py-3 px-4 text-right">R$ 2.500,00</td>
                        <td className="py-3 px-4 text-right">
                          <Badge variant="outline" className="bg-green-100 text-green-800">Pago</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">10/04/2025</td>
                        <td className="py-3 px-4">Mensalidade Abril/2025</td>
                        <td className="py-3 px-4 text-right">R$ 2.500,00</td>
                        <td className="py-3 px-4 text-right">
                          <Badge variant="outline" className="bg-green-100 text-green-800">Pago</Badge>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">10/03/2025</td>
                        <td className="py-3 px-4">Mensalidade Março/2025</td>
                        <td className="py-3 px-4 text-right">R$ 2.500,00</td>
                        <td className="py-3 px-4 text-right">
                          <Badge variant="outline" className="bg-green-100 text-green-800">Pago</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documentos">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>Contratos e documentos importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Contrato de Prestação de Serviços</div>
                    <div className="text-sm text-muted-foreground">Adicionado em 10/11/2024</div>
                  </div>
                  <Button variant="outline">Baixar</Button>
                </div>
                
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Termo de Uso de Imagem</div>
                    <div className="text-sm text-muted-foreground">Adicionado em 15/11/2024</div>
                  </div>
                  <Button variant="outline">Baixar</Button>
                </div>
                
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <div className="font-medium">Relatório Trimestral Q1 2025</div>
                    <div className="text-sm text-muted-foreground">Adicionado em 05/04/2025</div>
                  </div>
                  <Button variant="outline">Baixar</Button>
                </div>
              </div>
              
              <div className="mt-6">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Documento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Atividades</CardTitle>
              <CardDescription>Registro de interações e mudanças</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative pl-6 pb-6 border-l border-muted">
                  <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="space-y-1">
                    <div className="font-medium">Nova campanha adicionada</div>
                    <div className="text-sm">Campanha "TikTok - Lançamento Coleção Nova" foi criada</div>
                    <div className="text-xs text-muted-foreground">01/03/2025 às 14:35 - Por Maria Santos</div>
                  </div>
                </div>
                
                <div className="relative pl-6 pb-6 border-l border-muted">
                  <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="space-y-1">
                    <div className="font-medium">Reunião mensal realizada</div>
                    <div className="text-sm">Apresentação de resultados e definição de estratégias</div>
                    <div className="text-xs text-muted-foreground">15/02/2025 às 10:00 - Por Carlos Oliveira</div>
                  </div>
                </div>
                
                <div className="relative pl-6 pb-6 border-l border-muted">
                  <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="space-y-1">
                    <div className="font-medium">Orçamento ajustado</div>
                    <div className="text-sm">Aumento de 15% no orçamento mensal</div>
                    <div className="text-xs text-muted-foreground">05/02/2025 às 16:20 - Por Ana Silva</div>
                  </div>
                </div>
                
                <div className="relative pl-6">
                  <div className="absolute top-0 left-0 -translate-x-1/2 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="space-y-1">
                    <div className="font-medium">Cliente cadastrado</div>
                    <div className="text-sm">Início da parceria</div>
                    <div className="text-xs text-muted-foreground">10/11/2024 às 14:30 - Por João Santos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DetalhesCliente;
