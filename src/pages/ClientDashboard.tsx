
import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import LayoutPainelControle from '@/components/dashboard/LayoutPainelControle';
import PainelControle from '@/components/dashboard/PainelControle';
import { inicializarTema } from '@/utils/themeUtils';

const ClientDashboard: React.FC = () => {
  useEffect(() => {
    inicializarTema();
  }, []);

  return (
    <LayoutPainelControle userType="client" brandName="NOG Performance">
      <Routes>
        <Route index element={<PainelControle userType="client" />} />
        <Route path="campanhas" element={<div className="mt-4">Página de Campanhas em Construção</div>} />
        <Route path="configuracoes" element={<div className="mt-4">Página de Configurações em Construção</div>} />
        <Route path="*" element={<div className="mt-4">Página não encontrada</div>} />
      </Routes>
    </LayoutPainelControle>
  );
};

export default ClientDashboard;
