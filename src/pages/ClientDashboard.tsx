
import React from 'react';
import { Routes, Route } from "react-router-dom";
import DashboardLayout from '@/components/layout/DashboardLayout';
import PainelControle from '@/components/dashboard/PainelControle';
import ConfiguracoesGerais from '@/components/configuracoes/ConfiguracoesGerais';
import TabelaCampanhas from '@/components/campanhas/TabelaCampanhas';
import DetalheCampanha from '@/components/campanhas/DetalheCampanha';

const ClientDashboard: React.FC = () => {
  return (
    <DashboardLayout userType="client" brandName="NOG Performance">
      <Routes>
        <Route index element={<PainelControle userType="client" />} />
        <Route path="campanhas" element={<TabelaCampanhas tipoUsuario="client" />} />
        <Route path="campanhas/:id" element={<DetalheCampanha tipoUsuario="client" />} />
        <Route path="configuracoes" element={<ConfiguracoesGerais tipoUsuario="client" />} />
        <Route path="*" element={<div className="mt-4">Página não encontrada</div>} />
      </Routes>
    </DashboardLayout>
  );
};

export default ClientDashboard;
