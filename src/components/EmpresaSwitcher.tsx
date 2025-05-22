
import * as React from "react";
import { Check, ChevronsUpDown, Building, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

interface Empresa {
  id: string;
  nome: string;
  logo?: string;
}

interface EmpresaSwitcherProps {
  empresas: Empresa[];
  selectedEmpresa?: Empresa;
  onEmpresaChange: (empresa: Empresa) => void;
  onAddEmpresa?: () => void;
  className?: string;
}

export function EmpresaSwitcher({
  empresas,
  selectedEmpresa,
  onEmpresaChange,
  onAddEmpresa,
  className,
}: EmpresaSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  if (!empresas?.length) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecione uma empresa"
          className={cn("w-full justify-between", className)}
        >
          <div className="flex items-center gap-2 truncate">
            {selectedEmpresa?.logo ? (
              <img
                src={selectedEmpresa.logo}
                alt={selectedEmpresa.nome}
                className="h-5 w-5 rounded-full"
              />
            ) : (
              <Building className="h-5 w-5 shrink-0" />
            )}
            <span className="truncate">{selectedEmpresa?.nome}</span>
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar empresa..." />
          <CommandList>
            <CommandEmpty>Nenhuma empresa encontrada.</CommandEmpty>
            <CommandGroup heading="Empresas">
              {empresas.map((empresa) => (
                <CommandItem
                  key={empresa.id}
                  onSelect={() => {
                    onEmpresaChange(empresa);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  {empresa.logo ? (
                    <img
                      src={empresa.logo}
                      alt={empresa.nome}
                      className="mr-2 h-5 w-5 rounded-full"
                    />
                  ) : (
                    <Building className="mr-2 h-5 w-5" />
                  )}
                  <span>{empresa.nome}</span>
                  {selectedEmpresa?.id === empresa.id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            {onAddEmpresa && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      onAddEmpresa();
                    }}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Nova Empresa
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
