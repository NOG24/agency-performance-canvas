
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { toast } from '@/hooks/use-toast';

interface Observacao {
  id: string;
  campanha_id: string;
  nome_campanha: string;
  texto: string;
  data_criacao: string;
  usuario_id: string;
}

export function useObservacoes(campanhaId: string | null = null) {
  const [observacoes, setObservacoes] = useState<Observacao[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  // Simula a busca de observações (em um caso real, isto viria do Supabase)
  const observacoesSimuladas: Observacao[] = [
    {
      id: '1',
      campanha_id: 'camp_1',
      nome_campanha: 'Campanha Promocional de Verão',
      texto: 'Observamos um aumento de 32% na taxa de conversão após ajustes nos títulos dos anúncios. Manter esta estratégia para os próximos 15 dias.',
      data_criacao: '2023-06-10T14:32:00',
      usuario_id: 'usr_123'
    },
    {
      id: '2',
      campanha_id: 'camp_2',
      nome_campanha: 'Lançamento Produto X',
      texto: 'Campanha está com CTR baixo (1.2%). Recomendamos revisão urgente dos criativos e possível ajuste no target.',
      data_criacao: '2023-06-15T09:45:00',
      usuario_id: 'usr_123'
    },
    {
      id: '3',
      campanha_id: 'camp_3',
      nome_campanha: 'Remarketing Geral',
      texto: 'Excelente ROAS nas últimas 2 semanas. Sugerimos aumentar orçamento em 20% para escalar resultados.',
      data_criacao: '2023-06-18T16:22:00',
      usuario_id: 'usr_123'
    },
    {
      id: '4',
      campanha_id: 'camp_1',
      nome_campanha: 'Campanha Promocional de Verão',
      texto: 'Segmentação para público jovem (18-25) está performando 47% melhor que as demais faixas. Redirecionamos budget.',
      data_criacao: '2023-06-20T11:05:00',
      usuario_id: 'usr_456'
    },
  ];

  useEffect(() => {
    const buscarObservacoes = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        // Simulação de uma chamada ao Supabase
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Filtrar observações se um ID de campanha for fornecido
        const resultados = campanhaId 
          ? observacoesSimuladas.filter(obs => obs.campanha_id === campanhaId)
          : observacoesSimuladas;
        
        setObservacoes(resultados);
      } catch (error) {
        console.error("Erro ao buscar observações:", error);
        setErro("Não foi possível carregar as observações. Tente novamente mais tarde.");
      } finally {
        setCarregando(false);
      }
    };

    buscarObservacoes();
  }, [campanhaId]);

  // Função para adicionar uma nova observação
  const adicionarObservacao = async (
    campanhaId: string, 
    nomeCampanha: string, 
    texto: string
  ): Promise<boolean> => {
    try {
      if (!texto.trim()) {
        toast({
          title: "Erro ao salvar",
          description: "O texto da observação não pode estar vazio.",
          variant: "destructive",
        });
        return false;
      }
      
      // Simulamos a adição ao Supabase
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Em um cenário real, seria um await supabase.from('observacoes').insert(...)
      const novaObservacao: Observacao = {
        id: `${Date.now()}`,
        campanha_id: campanhaId,
        nome_campanha: nomeCampanha,
        texto: texto,
        data_criacao: new Date().toISOString(),
        usuario_id: 'usr_123' // Simulando um ID de usuário
      };
      
      // Atualizar o estado local
      setObservacoes(prev => [novaObservacao, ...prev]);
      
      toast({
        title: "Observação salva",
        description: "Sua observação foi registrada com sucesso!",
      });
      
      return true;
    } catch (error) {
      console.error("Erro ao adicionar observação:", error);
      toast({
        title: "Erro ao salvar observação",
        description: "Ocorreu um problema ao salvar sua observação.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    observacoes,
    carregando,
    erro,
    adicionarObservacao
  };
}
