
import React from 'react';
import { Button } from '@/components/ui/button';
import { HistoricoExecucao, StatusExecucao } from '@/types/automacoes';

interface HistoricoTabProps {
  historico: HistoricoExecucao[];
  onShowAlert: () => void;
}

const HistoricoTab: React.FC<HistoricoTabProps> = ({ historico, onShowAlert }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Histórico de Execuções</h2>
        <Button variant="outline" onClick={onShowAlert}>Testar Alerta</Button>
      </div>
      
      {historico.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">Nenhum histórico de execução encontrado.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {historico.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 border rounded-lg ${item.status === 'sucesso' ? 'border-green-200' : 'border-red-200'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.automacaoNome}</h3>
                  <p className="text-sm text-muted-foreground">
                    Executado em: {new Date(item.dataExecucao).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  item.status === 'sucesso' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.status === 'sucesso' ? 'Sucesso' : 'Falha'}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm">{item.mensagem}</p>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Enviado para: {item.destinatarios.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoricoTab;
