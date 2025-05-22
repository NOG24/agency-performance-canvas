
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Eye, 
  Edit, 
  Plus, 
  Search, 
  ArrowUpDown, 
  Calendar, 
  DollarSign 
} from 'lucide-react';
import ModalCampanha from './ModalCampanha';
import { useToast } from "@/components/ui/use-toast";

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

interface TabelaCampanhasProps {
  campanhas?: Campanha[];
  tipoUsuario: 'agency' | 'client';
  clienteId?: string;
  carregando?: boolean;
}

const TabelaCampanhas: React.FC<TabelaCampanhasProps> = ({
  campanhas = [],
  tipoUsuario,
  clienteId,
  carregando = false
}) => {
  const [campanhasFiltradas, setCampanhasFiltradas] = useState<Campanha[]>(campanhas);
  const [filtroCanal, setFiltroCanal] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [termoBusca, setTermoBusca] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [campanhaSelecionada, setCampanhaSelecionada] = useState<Campanha | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Atualizar campanhas filtradas quando mudar os filtros
  React.useEffect(() => {
    let resultado = [...campanhas];
    
    // Filtrar por canal
    if (filtroCanal !== 'todos') {
      resultado = resultado.filter(campanha => campanha.canal === filtroCanal);
    }
    
    // Filtrar por status
    if (filtroStatus !== 'todos') {
      resultado = resultado.filter(campanha => campanha.status === filtroStatus);
    }
    
    // Filtrar por termo de busca
    if (termoBusca) {
      const termoLowerCase = termoBusca.toLowerCase();
      resultado = resultado.filter(campanha => 
        campanha.nome.toLowerCase().includes(termoLowerCase) ||
        campanha.clienteNome.toLowerCase().includes(termoLowerCase)
      );
    }
    
    // Filtrar por cliente específico (se for fornecido)
    if (clienteId) {
      resultado = resultado.filter(campanha => campanha.clienteId === clienteId);
    }
    
    setCampanhasFiltradas(resultado);
  }, [campanhas, filtroCanal, filtroStatus, termoBusca, clienteId]);

  const handleVerDetalhes = (campanha: Campanha) => {
    // Navegar para página de detalhes da campanha
    const basePath = tipoUsuario === 'agency' ? '/agency-dashboard' : '/client-dashboard';
    navigate(`${basePath}/campanhas/${campanha.id}`);
  };

  const handleEditar = (campanha: Campanha) => {
    setCampanhaSelecionada(campanha);
    setIsModalOpen(true);
  };

  const handleNovaCampanha = () => {
    setCampanhaSelecionada(null);
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
    setCampanhaSelecionada(null);
  };

  const handleSalvarCampanha = (campanha: Partial<Campanha>) => {
    // Aqui você conectaria com o Supabase para salvar
    toast({
      title: campanhaSelecionada ? "Campanha atualizada" : "Campanha criada",
      description: `${campanha.nome} foi ${campanhaSelecionada ? 'atualizada' : 'criada'} com sucesso.`,
    });
    
    setIsModalOpen(false);
    setCampanhaSelecionada(null);
  };

  const getCanalBadgeColor = (canal: string) => {
    switch (canal) {
      case 'facebook': return "bg-blue-100 text-blue-800";
      case 'google': return "bg-red-100 text-red-800";
      case 'tiktok': return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'ativa': return "bg-green-100 text-green-800";
      case 'pausada': return "bg-yellow-100 text-yellow-800";
      case 'finalizada': return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  if (carregando) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-2">
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle>Campanhas</CardTitle>
              <CardDescription>
                {campanhasFiltradas.length} {campanhasFiltradas.length === 1 ? 'campanha encontrada' : 'campanhas encontradas'}
              </CardDescription>
            </div>
            {tipoUsuario === 'agency' && (
              <Button onClick={handleNovaCampanha} className="mt-2 sm:mt-0">
                <Plus className="mr-2 h-4 w-4" /> Nova Campanha
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar campanhas..."
                className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
              />
            </div>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filtroCanal}
              onChange={(e) => setFiltroCanal(e.target.value)}
            >
              <option value="todos">Todos os canais</option>
              <option value="facebook">Facebook</option>
              <option value="google">Google</option>
              <option value="tiktok">TikTok</option>
              <option value="outros">Outros</option>
            </select>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="todos">Todos os status</option>
              <option value="ativa">Ativa</option>
              <option value="pausada">Pausada</option>
              <option value="finalizada">Finalizada</option>
            </select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    <div className="flex items-center">
                      Leads <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <div className="flex items-center">
                      CPL <ArrowUpDown className="ml-1 h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" /> Período
                    </div>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4" /> Orçamento
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campanhasFiltradas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      Nenhuma campanha encontrada. {tipoUsuario === 'agency' && 'Clique em "Nova Campanha" para adicionar.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  campanhasFiltradas.map((campanha) => (
                    <TableRow key={campanha.id}>
                      <TableCell className="font-medium">
                        {campanha.nome}
                        {!clienteId && (
                          <div className="text-xs text-muted-foreground">
                            {campanha.clienteNome}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getCanalBadgeColor(campanha.canal)}>
                          {campanha.canal.charAt(0).toUpperCase() + campanha.canal.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeColor(campanha.status)}>
                          {campanha.status.charAt(0).toUpperCase() + campanha.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {campanha.leads}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatarValor(campanha.cpl)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {formatarData(campanha.inicio)} {campanha.fim ? `- ${formatarData(campanha.fim)}` : ''}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {formatarValor(campanha.orcamento)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleVerDetalhes(campanha)}
                            title="Ver detalhes"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {tipoUsuario === 'agency' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditar(campanha)}
                              title="Editar campanha"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ModalCampanha
        isOpen={isModalOpen}
        onClose={handleFecharModal}
        campanha={campanhaSelecionada}
        onSalvar={handleSalvarCampanha}
      />
    </>
  );
};

export default TabelaCampanhas;
