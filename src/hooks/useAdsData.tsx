
import { useState, useEffect } from 'react';
import { fetchDadosConsolidados } from '@/utils/adsFetchers';
import { toast } from '@/hooks/use-toast';

interface AdsDataProps {
  periodo: number;
}

export function useAdsData({ periodo = 30 }: AdsDataProps) {
  const [dados, setDados] = useState<any>(null);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        const dadosConsolidados = await fetchDadosConsolidados(periodo);
        setDados(dadosConsolidados);
      } catch (error) {
        console.error("Erro ao obter dados:", error);
        setErro("Ocorreu um erro ao carregar os dados. Tente novamente mais tarde.");
        toast({
          title: "Erro ao carregar dados",
          description: "Ocorreu um problema na obtenção dos dados das plataformas.",
          variant: "destructive",
        });
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, [periodo]);

  // Função para atualizar os dados manualmente
  const atualizarDados = async () => {
    try {
      setCarregando(true);
      toast({
        title: "Atualizando dados",
        description: "Buscando dados mais recentes das plataformas...",
      });
      
      const dadosConsolidados = await fetchDadosConsolidados(periodo);
      setDados(dadosConsolidados);
      
      toast({
        title: "Dados atualizados",
        description: "Os dados foram atualizados com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      setErro("Ocorreu um erro ao atualizar os dados. Tente novamente mais tarde.");
      toast({
        title: "Erro na atualização",
        description: "Não foi possível atualizar os dados neste momento.",
        variant: "destructive",
      });
    } finally {
      setCarregando(false);
    }
  };

  return {
    dados,
    carregando,
    erro,
    atualizarDados
  };
}
