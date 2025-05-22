
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useObservacoes } from '@/hooks/useObservacoes';

interface ObservacoesProps {
  campanhaId?: string;
  nomeCampanha?: string;
  userType: 'agency' | 'client';
}

const Observacoes: React.FC<ObservacoesProps> = ({
  campanhaId = 'camp_1',
  nomeCampanha = 'Campanha Principal',
  userType
}) => {
  const { observacoes, carregando, adicionarObservacao } = useObservacoes(campanhaId);
  const [novaObservacao, setNovaObservacao] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleSalvar = async () => {
    if (!novaObservacao.trim()) return;
    
    setSalvando(true);
    const sucesso = await adicionarObservacao(campanhaId, nomeCampanha, novaObservacao);
    if (sucesso) {
      setNovaObservacao('');
    }
    setSalvando(false);
  };

  // Clientes não podem adicionar observações, apenas visualizá-las
  const podeAdicionarObservacao = userType === 'agency';

  if (carregando) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <Skeleton className="h-5 w-40 mb-1" />
          <Skeleton className="h-4 w-60" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Observações</CardTitle>
        <CardDescription>
          {podeAdicionarObservacao 
            ? 'Adicione observações e insights sobre a campanha'
            : 'Observações da agência sobre a campanha'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {podeAdicionarObservacao && (
          <div className="space-y-4">
            <Textarea
              placeholder="Adicione uma nova observação sobre a campanha..."
              value={novaObservacao}
              onChange={(e) => setNovaObservacao(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <Button 
              onClick={handleSalvar}
              disabled={!novaObservacao.trim() || salvando}
              className="w-full sm:w-auto"
            >
              {salvando ? 'Salvando...' : 'Salvar Observação'}
            </Button>
          </div>
        )}

        <div className="space-y-4 pt-4">
          {observacoes.length > 0 ? (
            observacoes.map((obs) => (
              <div key={obs.id} className="border-l-2 border-primary pl-4 py-2">
                <div className="text-sm text-muted-foreground">
                  {format(new Date(obs.data_criacao), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}
                </div>
                <div className="mt-1">{obs.texto}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma observação registrada para esta campanha.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Observacoes;
