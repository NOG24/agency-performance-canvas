
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface Cliente {
  id: string;
  nome: string;
}

interface ModalCampanhaProps {
  isOpen: boolean;
  onClose: () => void;
  campanha: Campanha | null;
  onSalvar: (campanha: Partial<Campanha>) => void;
}

const ModalCampanha: React.FC<ModalCampanhaProps> = ({
  isOpen,
  onClose,
  campanha,
  onSalvar
}) => {
  const [formData, setFormData] = useState<Partial<Campanha>>({
    nome: '',
    canal: 'facebook',
    status: 'ativa',
    leads: 0,
    cpl: 0,
    inicio: new Date().toISOString().split('T')[0],
    orcamento: 0,
    objetivo: '',
    clienteId: '',
    clienteNome: ''
  });

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Carregar clientes (simulado)
  useEffect(() => {
    // Aqui você buscaria do Supabase
    setClientes([
      { id: 'client1', nome: 'Empresa ABC' },
      { id: 'client2', nome: 'Loja XYZ' },
      { id: 'client3', nome: 'Restaurante 123' }
    ]);
  }, []);

  // Preencher form quando tiver uma campanha selecionada
  useEffect(() => {
    if (campanha) {
      setFormData({
        ...campanha,
        inicio: campanha.inicio.split('T')[0],
        fim: campanha.fim ? campanha.fim.split('T')[0] : undefined
      });
    } else {
      // Reset para valores padrão quando for nova campanha
      setFormData({
        nome: '',
        canal: 'facebook',
        status: 'ativa',
        leads: 0,
        cpl: 0,
        inicio: new Date().toISOString().split('T')[0],
        orcamento: 0,
        objetivo: '',
        clienteId: '',
        clienteNome: ''
      });
    }
  }, [campanha]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Se estiver selecionando um cliente, também atualiza o nome do cliente
    if (name === 'clienteId') {
      const clienteSelecionado = clientes.find(c => c.id === value);
      if (clienteSelecionado) {
        setFormData(prev => ({
          ...prev,
          clienteNome: clienteSelecionado.nome
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular processamento
    setTimeout(() => {
      onSalvar({
        ...formData,
        id: campanha?.id || `camp_${Date.now()}`
      });
      setIsLoading(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{campanha ? 'Editar' : 'Nova'} Campanha</DialogTitle>
            <DialogDescription>
              Preencha os dados da campanha. Clique em salvar quando finalizar.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="nome">Nome da Campanha</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="canal">Canal</Label>
                <Select
                  value={formData.canal}
                  onValueChange={(value) => handleSelectChange('canal', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativa">Ativa</SelectItem>
                    <SelectItem value="pausada">Pausada</SelectItem>
                    <SelectItem value="finalizada">Finalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="clienteId">Cliente</Label>
                <Select
                  value={formData.clienteId}
                  onValueChange={(value) => handleSelectChange('clienteId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map(cliente => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="orcamento">Orçamento (R$)</Label>
                <Input
                  id="orcamento"
                  name="orcamento"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.orcamento}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="inicio">Data de Início</Label>
                <Input
                  id="inicio"
                  name="inicio"
                  type="date"
                  value={formData.inicio}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="fim">Data de Término</Label>
                <Input
                  id="fim"
                  name="fim"
                  type="date"
                  value={formData.fim || ''}
                  onChange={handleChange}
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="objetivo">Objetivo da Campanha</Label>
                <Input
                  id="objetivo"
                  name="objetivo"
                  value={formData.objetivo}
                  onChange={handleChange}
                  placeholder="Ex: Captação de leads para produto X"
                />
              </div>
            </div>
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

export default ModalCampanha;
