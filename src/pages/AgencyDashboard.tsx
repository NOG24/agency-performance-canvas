
import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import LayoutPainelControle from '@/components/dashboard/LayoutPainelControle';
import PainelControle from '@/components/dashboard/PainelControle';
import { inicializarTema } from '@/utils/themeUtils';

const AgencyDashboard: React.FC = () => {
  useEffect(() => {
    inicializarTema();
  }, []);

  return (
    <LayoutPainelControle userType="agency" brandName="NOG Performance - Agência">
      <Routes>
        <Route index element={<PainelControle userType="agency" />} />
        <Route path="campanhas" element={<div className="mt-4">Gerenciamento de Campanhas em Construção</div>} />
        <Route path="observacoes" element={<div className="mt-4">Página de Observações em Construção</div>} />
        <Route path="configuracoes" element={<div className="mt-4">Página de Configurações em Construção</div>} />
        <Route path="clients" element={<div className="mt-4">Página de Clientes em Construção</div>} />
        <Route path="branding" element={<div className="mt-4">Página de Personalização em Construção</div>} />
        <Route path="*" element={<div className="mt-4">Página não encontrada</div>} />
      </Routes>
    </LayoutPainelControle>
  );
};

export default AgencyDashboard;
