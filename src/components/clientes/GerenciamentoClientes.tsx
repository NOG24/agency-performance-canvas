
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  MoreVertical, 
  Users, 
  Mail,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ModalCliente from './ModalCliente';
import { useNavigate } from 'react-router-dom';

interface Cliente {
  id: string;
  nome: string;
  email: string;
  status: 'ativo' | 'inativo' | 'pendente';
  campanhasAtivas: number;
  plano: 'starter' | 'pro' | 'enterprise';
  dataCriacao: string;
  ultimoAcesso?: string;
  logo?: string;
  observacoes?: string;
  permissoes: string[];
}

const GerenciamentoClientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [filtro, setFiltro] = useState('');
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Carregar clientes (simulado)
  useEffect(() => {
    const carregarClientes = async () => {
      setCarregando(true);
      
      // Simular atraso da API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dados simulados
      const clientesMock: Cliente[] = [
        {
          id: 'client1',
          nome: 'Empresa ABC Ltda',
          email: 'contato@empresaabc.com.br',
          status: 'ativo',
          campanhasAtivas: 4,
          plano: 'pro',
          dataCriacao: '2024-11-10T14:30:00',
          ultimoAcesso: '2025-05-20T09:15:00',
          logo: 'https://via.placeholder.com/150',
          observacoes: 'Cliente desde 2024, foco em campanhas de performance para e-commerce',
          permissoes: ['visualizar', 'exportar']
        },
        {
          id: 'client2',
          nome: 'Restaurante XYZ',
          email: 'marketing@restaurantexyz.com.br',
          status: 'ativo',
          campanhasAtivas: 2,
          plano: 'starter',
          dataCriacao: '2025-01-05T10:00:00',
          ultimoAcesso: '2025-05-18T16:40:00',
          observacoes: 'Foco em campanhas locais e promoções de delivery',
          permissoes: ['visualizar']
        },
        {
          id: 'client3',
          nome: 'Clínica Saúde Total',
          email: 'atendimento@clinicasaude.com.br',
          status: 'inativo',
          campanhasAtivas: 0,
          plano: 'pro',
          dataCriacao: '2024-08-15T11:20:00',
          ultimoAcesso: '2025-03-10T13:25:00',
          observacoes: 'Contrato pausado temporariamente a pedido do cliente',
          permissoes: ['visualizar', 'exportar']
        },
        {
          id: 'client4',
          nome: 'Escola de Idiomas Global',
          email: 'contato@idiomasglobal.com.br',
          status: 'pendente',
          campanhasAtivas: 1,
          plano: 'enterprise',
          dataCriacao: '2025-05-01T09:00:00',
          permissoes: ['visualizar', 'exportar', 'personalizar']
        },
        {
          id: 'client5',
          nome: 'Construtora Horizonte',
          email: 'marketing@horizonteconstrutora.com.br',
          status: 'ativo',
          campanhasAtivas: 3,
          plano: 'enterprise',
          dataCriacao: '2024-10-20T15:45:00',
          ultimoAcesso: '2025-05-19T11:10:00',
          logo: 'https://via.placeholder.com/150',
          observacoes: 'Cliente premium, prioridade no atendimento',
          permissoes: ['visualizar', 'exportar', 'personalizar']
        }
      ];
      
      setClientes(clientesMock);
      setCarregando(false);
    };
    
    carregarClientes();
  }, []);

  const handleNovoCliente = () => {
    setClienteSelecionado(null);
    setIsModalOpen(true);
  };

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
    setClienteSelecionado(null);
  };

  const handleSalvarCliente = (cliente: Partial<Cliente>) => {
    // Simular salvamento com Supabase
    if (clienteSelecionado) {
      // Atualizar cliente existente
      setClientes(prev => 
        prev.map(c => 
          c.id === clienteSelecionado.id 
            ? { ...c, ...cliente } 
            : c
        )
      );
      
      toast({
        title: "Cliente atualizado",
        description: `${cliente.nome} foi atualizado com sucesso.`
      });
    } else {
      // Criar novo cliente
      const novoCliente: Cliente = {
        id: `client_${Date.now()}`,
        nome: cliente.nome || 'Novo Cliente',
        email: cliente.email || 'email@cliente.com',
        status: cliente.status || 'pendente',
        campanhasAtivas: 0,
        plano: cliente.plano || 'starter',
        dataCriacao: new Date().toISOString(),
        observacoes: cliente.observacoes,
        permissoes: cliente.permissoes || ['visualizar']
      };
      
      setClientes(prev => [...prev, novoCliente]);
      
      toast({
        title: "Cliente adicionado",
        description: `${novoCliente.nome} foi adicionado com sucesso.`
      });
    }
    
    setIsModalOpen(false);
    setClienteSelecionado(null);
  };

  const handleStatus = (id: string, novoStatus: 'ativo' | 'inativo' | 'pendente') => {
    setClientes(prev => 
      prev.map(cliente => 
        cliente.id === id 
          ? { ...cliente, status: novoStatus } 
          : cliente
      )
    );
    
    const cliente = clientes.find(c => c.id === id);
    
    toast({
      title: `Status atualizado`,
      description: `${cliente?.nome} agora está ${novoStatus}.`
    });
  };

  const handleVerDetalhes = (id: string) => {
    navigate(`/agency-dashboard/clients/${id}`);
  };

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    cliente.email.toLowerCase().includes(filtro.toLowerCase())
  );

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

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Clientes</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todos os clientes da agência em um só lugar
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              className="pl-8"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
          
          <Button onClick={handleNovoCliente}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Clientes</CardTitle>
            <CardDescription>
              {clientesFiltrados.length} {clientesFiltrados.length === 1 ? 'cliente encontrado' : 'clientes encontrados'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {carregando ? (
              <div className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  <Button
                    variant={filtro === '' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFiltro('')}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={filtro === 'ativo' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFiltro('ativo')}
                  >
                    Ativos
                  </Button>
                  <Button
                    variant={filtro === 'pendente' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFiltro('pendente')}
                  >
                    Pendentes
                  </Button>
                  <Button
                    variant={filtro === 'inativo' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFiltro('inativo')}
                  >
                    Inativos
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead className="hidden md:table-cell">Campanhas</TableHead>
                        <TableHead className="hidden lg:table-cell">Criado em</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientesFiltrados.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6">
                            <div className="flex flex-col items-center justify-center">
                              <AlertTriangle className="h-8 w-8 text-yellow-500 mb-2" />
                              <p className="text-muted-foreground">Nenhum cliente encontrado</p>
                              <Button 
                                variant="outline" 
                                className="mt-2"
                                onClick={handleNovoCliente}
                              >
                                Adicionar Cliente
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        clientesFiltrados.map((cliente) => (
                          <TableRow key={cliente.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage src={cliente.logo} alt={cliente.nome} />
                                  <AvatarFallback>
                                    {cliente.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <div className="font-medium">{cliente.nome}</div>
                                  <div className="text-sm text-muted-foreground">{cliente.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(cliente.status)}</TableCell>
                            <TableCell>{getPlanoBadge(cliente.plano)}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {cliente.campanhasAtivas}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {new Date(cliente.dataCriacao).toLocaleDateString('pt-BR')}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleVerDetalhes(cliente.id)}
                                  title="Ver detalhes"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditarCliente(cliente)}
                                  title="Editar cliente"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleVerDetalhes(cliente.id)}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      Ver detalhes
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleEditarCliente(cliente)}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Editar
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Users className="mr-2 h-4 w-4" />
                                      Gerenciar usuários
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Mail className="mr-2 h-4 w-4" />
                                      Enviar e-mail
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {cliente.status !== 'ativo' && (
                                      <DropdownMenuItem onClick={() => handleStatus(cliente.id, 'ativo')}>
                                        Ativar cliente
                                      </DropdownMenuItem>
                                    )}
                                    {cliente.status !== 'inativo' && (
                                      <DropdownMenuItem onClick={() => handleStatus(cliente.id, 'inativo')}>
                                        Desativar cliente
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Resumo de Clientes</CardTitle>
            <CardDescription>Visão geral de todos os clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted p-4 rounded-md">
                <div className="text-sm font-medium text-muted-foreground mb-1">Total de Clientes</div>
                <div className="text-2xl font-bold">{clientes.length}</div>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="text-sm font-medium text-muted-foreground mb-1">Clientes Ativos</div>
                <div className="text-2xl font-bold">{clientes.filter(c => c.status === 'ativo').length}</div>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="text-sm font-medium text-muted-foreground mb-1">Campanhas Ativas</div>
                <div className="text-2xl font-bold">
                  {clientes.reduce((total, cliente) => total + cliente.campanhasAtivas, 0)}
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <div className="text-sm font-medium text-muted-foreground mb-1">Clientes Enterprise</div>
                <div className="text-2xl font-bold">
                  {clientes.filter(c => c.plano === 'enterprise').length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ModalCliente
        isOpen={isModalOpen}
        onClose={handleFecharModal}
        cliente={clienteSelecionado}
        onSalvar={handleSalvarCliente}
      />
    </>
  );
};

export default GerenciamentoClientes;
