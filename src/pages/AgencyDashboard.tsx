
import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import LayoutPainelControle from '@/components/dashboard/LayoutPainelControle';
import PainelControle from '@/components/dashboard/PainelControle';
import ConfiguracoesGerais from '@/components/configuracoes/ConfiguracoesGerais';
import GerenciamentoClientes from '@/components/clientes/GerenciamentoClientes';
import DetalhesCliente from '@/components/clientes/DetalhesCliente';
import ConfiguracaoWhiteLabel from '@/components/configuracoes/ConfiguracaoWhiteLabel';
import TabelaCampanhas from '@/components/campanhas/TabelaCampanhas';
import DetalheCampanha from '@/components/campanhas/DetalheCampanha';
import Observacoes from '@/components/observacoes/Observacoes';
import { inicializarTema } from '@/utils/themeUtils';

const AgencyDashboard: React.FC = () => {
  useEffect(() => {
    inicializarTema();
  }, []);

  return (
    <LayoutPainelControle userType="agency" brandName="NOG Performance - Agência">
      <Routes>
        <Route index element={<PainelControle userType="agency" />} />
        <Route path="campanhas" element={<TabelaCampanhas tipoUsuario="agency" />} />
        <Route path="campanhas/:id" element={<DetalheCampanha tipoUsuario="agency" />} />
        <Route path="observacoes" element={<Observacoes tipoUsuario="agency" />} />
        <Route path="configuracoes" element={<ConfiguracoesGerais tipoUsuario="agency" />} />
        <Route path="clients" element={<GerenciamentoClientes />} />
        <Route path="clients/:id" element={<DetalhesCliente />} />
        <Route path="branding" element={<ConfiguracaoWhiteLabel />} />
        <Route path="*" element={<div className="mt-4">Página não encontrada</div>} />
      </Routes>
    </LayoutPainelControle>
  );
};

export default AgencyDashboard;
