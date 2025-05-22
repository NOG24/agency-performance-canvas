
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, User, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import ModalObservacao from './ModalObservacao';

interface Observacao {
  id: string;
  texto: string;
  data: string;
  responsavel: string;
  campanhaId?: string;
  clienteId?: string;
  expandida?: boolean;
}

interface ObservacoesProps {
  tipoUsuario: 'agency' | 'client';
  campanhaId?: string;
  clienteId?: string;
}

const Observacoes: React.FC<ObservacoesProps> = ({
  tipoUsuario,
  campanhaId,
  clienteId
}) => {
  const [observacoes, setObservacoes] = useState<Observacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [observacaoSelecionada, setObservacaoSelecionada] = useState<Observacao | null>(null);
  
  const { toast } = useToast();

  // Carregar observações (simulado)
  useEffect(() => {
    const carregarObservacoes = async () => {
      setCarregando(true);
      
      // Simular atraso da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados simulados
      const observacoesMock: Observacao[] = [
        {
          id: 'obs_1',
          texto: 'A campanha está performando bem no Facebook, mas percebemos que o CTR está abaixo da média no Google. Sugerimos revisar os criativos e segmentações para melhorar o desempenho.\n\n**Ações recomendadas:**\n- Atualizar imagens dos anúncios\n- Revisar textos das campanhas\n- Ajustar segmentação de interesses',
          data: '2025-02-15T14:30:00',
          responsavel: 'Ana Silva',
          campanhaId: 'camp_1',
          clienteId: 'client1',
          expandida: true
        },
        {
          id: 'obs_2',
          texto: 'Aumentamos o orçamento da campanha em 15% conforme solicitado. Vamos monitorar o CPL nos próximos dias para garantir que se mantenha dentro da meta estabelecida.',
          data: '2025-02-10T10:15:00',
          responsavel: 'Carlos Oliveira',
          campanhaId: 'camp_1',
          clienteId: 'client1',
          expandida: false
        },
        {
          id: 'obs_3',
          texto: 'Análise mensal realizada. O desempenho geral está 22% acima da meta. O Facebook continua sendo o canal com melhor ROI, seguido pelo Google. Recomendamos manter a estratégia atual com pequenos ajustes nos criativos do TikTok para melhorar o engajamento.',
          data: '2025-02-01T16:45:00',
          responsavel: 'Mariana Costa',
          campanhaId: 'camp_1',
          clienteId: 'client1',
          expandida: false
        }
      ];
      
      // Filtrar observações com base nos parâmetros
      let observacoesFiltradas = [...observacoesMock];
      
      if (campanhaId) {
        observacoesFiltradas = observacoesFiltradas.filter(obs => obs.campanhaId === campanhaId);
      }
      
      if (clienteId) {
        observacoesFiltradas = observacoesFiltradas.filter(obs => obs.clienteId === clienteId);
      }
      
      setObservacoes(observacoesFiltradas);
      setCarregando(false);
    };
    
    carregarObservacoes();
  }, [campanhaId, clienteId]);

  const handleNovaObservacao = () => {
    setObservacaoSelecionada(null);
    setIsModalOpen(true);
  };

  const handleEditarObservacao = (observacao: Observacao) => {
    if (tipoUsuario === 'agency') {
      setObservacaoSelecionada(observacao);
      setIsModalOpen(true);
    }
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
    setObservacaoSelecionada(null);
  };

  const handleSalvarObservacao = (observacao: Partial<Observacao>) => {
    // Simular salvamento com Supabase
    if (observacaoSelecionada) {
      // Atualizar observação existente
      setObservacoes(prev => 
        prev.map(obs => 
          obs.id === observacaoSelecionada.id 
            ? { ...obs, texto: observacao.texto || '' } 
            : obs
        )
      );
      
      toast({
        title: "Observação atualizada",
        description: "A observação foi atualizada com sucesso."
      });
    } else {
      // Criar nova observação
      const novaObservacao: Observacao = {
        id: `obs_${Date.now()}`,
        texto: observacao.texto || '',
        data: new Date().toISOString(),
        responsavel: 'Usuário Atual',
        campanhaId,
        clienteId,
        expandida: true
      };
      
      setObservacoes(prev => [novaObservacao, ...prev]);
      
      toast({
        title: "Observação adicionada",
        description: "A observação foi adicionada com sucesso."
      });
    }
    
    setIsModalOpen(false);
    setObservacaoSelecionada(null);
  };

  const toggleExpandirObservacao = (id: string) => {
    setObservacoes(prev => 
      prev.map(obs => 
        obs.id === id 
          ? { ...obs, expandida: !obs.expandida } 
          : obs
      )
    );
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para converter texto com marcação markdown simples para HTML
  const formatarTexto = (texto: string) => {
    // Negrito
    let formatado = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Listas
    formatado = formatado.replace(/^- (.*?)$/gm, '<li>$1</li>');
    formatado = formatado.replace(/<li>.*?<\/li>/gs, match => `<ul>${match}</ul>`);
    
    // Quebras de linha
    formatado = formatado.replace(/\n\n/g, '<br><br>');
    
    return formatado;
  };

  if (carregando) {
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-32 w-full" />
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle>Observações Estratégicas</CardTitle>
            {tipoUsuario === 'agency' && (
              <Button onClick={handleNovaObservacao}>
                <Plus className="mr-2 h-4 w-4" /> Nova Observação
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {observacoes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Nenhuma observação encontrada.
                {tipoUsuario === 'agency' && ' Adicione a primeira observação para esta campanha.'}
              </p>
              {tipoUsuario === 'agency' && (
                <Button onClick={handleNovaObservacao}>
                  <Plus className="mr-2 h-4 w-4" /> Nova Observação
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {observacoes.map(observacao => (
                <div 
                  key={observacao.id} 
                  className="border rounded-lg p-4 transition-all duration-200"
                  onClick={() => tipoUsuario === 'agency' && handleEditarObservacao(observacao)}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 text-primary p-1 rounded-full">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{observacao.responsavel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{formatarData(observacao.data)}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-2 h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpandirObservacao(observacao.id);
                        }}
                      >
                        {observacao.expandida ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${observacao.expandida ? 'max-h-[1000px]' : 'max-h-16'}`}>
                    <div 
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: formatarTexto(observacao.texto) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <ModalObservacao
        isOpen={isModalOpen}
        onClose={handleFecharModal}
        observacao={observacaoSelecionada}
        onSalvar={handleSalvarObservacao}
      />
    </>
  );
};

export default Observacoes;
