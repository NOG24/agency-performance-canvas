
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Observacao {
  id: string;
  texto: string;
  data: string;
  responsavel: string;
  campanhaId?: string;
  clienteId?: string;
}

interface ModalObservacaoProps {
  isOpen: boolean;
  onClose: () => void;
  observacao: Observacao | null;
  onSalvar: (observacao: Partial<Observacao>) => void;
}

const ModalObservacao: React.FC<ModalObservacaoProps> = ({
  isOpen,
  onClose,
  observacao,
  onSalvar
}) => {
  const [texto, setTexto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (observacao) {
      setTexto(observacao.texto);
    } else {
      setTexto('');
    }
  }, [observacao]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular atraso na API
    setTimeout(() => {
      onSalvar({
        texto,
        data: new Date().toISOString(),
        responsavel: 'Usuário Atual',
        campanhaId: observacao?.campanhaId,
        clienteId: observacao?.clienteId
      });
      setIsLoading(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{observacao ? 'Editar' : 'Nova'} Observação</DialogTitle>
            <DialogDescription>
              {observacao ? 'Atualize a observação estratégica.' : 'Adicione uma nova observação estratégica para a campanha.'}
              <div className="mt-1 text-xs">
                <strong>Dica:</strong> Você pode usar <strong>**negrito**</strong> e criar listas com <strong>- item</strong> no início da linha.
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="min-h-[200px]"
              placeholder="Digite aqui sua observação estratégica, insights ou recomendações..."
              required
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalObservacao;
