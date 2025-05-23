
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PainelControle from '@/components/dashboard/PainelControle';
import ConfiguracoesGerais from '@/components/configuracoes/ConfiguracoesGerais';
import GerenciamentoClientes from '@/components/clientes/GerenciamentoClientes';
import DetalhesCliente from '@/components/clientes/DetalhesCliente';
import ConfiguracaoWhiteLabel from '@/components/configuracoes/ConfiguracaoWhiteLabel';
import TabelaCampanhas from '@/components/campanhas/TabelaCampanhas';
import DetalheCampanha from '@/components/campanhas/DetalheCampanha';
import Observacoes from '@/components/observacoes/Observacoes';
import AutomacoesPage from '@/pages/AutomacoesPage';
import ExportarRelatoriosPage from '@/pages/ExportarRelatoriosPage';

const AgencyDashboard: React.FC = () => {
  return (
    <DashboardLayout userType="agency" brandName="NOG Performance - Agência">
      <Routes>
        <Route index element={<PainelControle userType="agency" />} />
        <Route path="campanhas" element={<TabelaCampanhas tipoUsuario="agency" />} />
        <Route path="campanhas/:id" element={<DetalheCampanha tipoUsuario="agency" />} />
        <Route path="observacoes" element={<Observacoes tipoUsuario="agency" />} />
        <Route path="automacoes" element={<AutomacoesPage />} />
        <Route path="relatorios" element={<ExportarRelatoriosPage />} />
        <Route path="relatorios/exportar" element={<ExportarRelatoriosPage />} />
        <Route path="configuracoes" element={<ConfiguracoesGerais tipoUsuario="agency" />} />
        <Route path="clients" element={<GerenciamentoClientes />} />
        <Route path="clients/:id" element={<DetalhesCliente />} />
        <Route path="branding" element={<ConfiguracaoWhiteLabel />} />
        <Route path="*" element={<div className="mt-4">Página não encontrada</div>} />
      </Routes>
    </DashboardLayout>
  );
};

export default AgencyDashboard;
