
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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

interface ModalClienteProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente | null;
  onSalvar: (cliente: Partial<Cliente>) => void;
}

const ModalCliente: React.FC<ModalClienteProps> = ({
  isOpen,
  onClose,
  cliente,
  onSalvar
}) => {
  const [formData, setFormData] = useState<Partial<Cliente>>({
    nome: '',
    email: '',
    status: 'pendente',
    plano: 'starter',
    observacoes: '',
    permissoes: ['visualizar']
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Preencher form quando tiver um cliente selecionado
  useEffect(() => {
    if (cliente) {
      setFormData({
        nome: cliente.nome,
        email: cliente.email,
        status: cliente.status,
        plano: cliente.plano,
        observacoes: cliente.observacoes || '',
        permissoes: cliente.permissoes
      });
    } else {
      // Reset para valores padrão quando for novo cliente
      setFormData({
        nome: '',
        email: '',
        status: 'pendente',
        plano: 'starter',
        observacoes: '',
        permissoes: ['visualizar']
      });
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissaoChange = (permissao: string, checked: boolean) => {
    setFormData(prev => {
      const permissoes = prev.permissoes || [];
      
      if (checked) {
        return { ...prev, permissoes: [...permissoes, permissao] };
      } else {
        return { ...prev, permissoes: permissoes.filter(p => p !== permissao) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular processamento
    setTimeout(() => {
      onSalvar(formData);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{cliente ? 'Editar' : 'Novo'} Cliente</DialogTitle>
            <DialogDescription>
              {cliente 
                ? 'Edite as informações do cliente existente.' 
                : 'Preencha os dados para adicionar um novo cliente.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="nome">Nome da Empresa</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="email">Email de Contato</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
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
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="plano">Plano</Label>
                <Select
                  value={formData.plano}
                  onValueChange={(value) => handleSelectChange('plano', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="observacoes">Observações Internas</Label>
                <Textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Adicione observações internas sobre este cliente (visíveis apenas para a agência)"
                />
              </div>
              
              <div className="col-span-2">
                <Label className="mb-2 block">Permissões</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="permissao-visualizar" 
                      checked={formData.permissoes?.includes('visualizar')}
                      onCheckedChange={(checked) => 
                        handlePermissaoChange('visualizar', checked as boolean)
                      }
                    />
                    <Label htmlFor="permissao-visualizar" className="font-normal">
                      Visualizar Dashboard
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="permissao-exportar" 
                      checked={formData.permissoes?.includes('exportar')}
                      onCheckedChange={(checked) => 
                        handlePermissaoChange('exportar', checked as boolean)
                      }
                    />
                    <Label htmlFor="permissao-exportar" className="font-normal">
                      Exportar Relatórios
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="permissao-personalizar" 
                      checked={formData.permissoes?.includes('personalizar')}
                      onCheckedChange={(checked) => 
                        handlePermissaoChange('personalizar', checked as boolean)
                      }
                    />
                    <Label htmlFor="permissao-personalizar" className="font-normal">
                      Personalizar Visualizações
                    </Label>
                  </div>
                </div>
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

export default ModalCliente;
