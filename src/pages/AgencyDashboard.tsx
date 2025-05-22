
import React from 'react';
import { Routes, Route } from "react-router-dom";
import DashboardLayout from '@/components/DashboardLayout';
import Dashboard from '@/components/dashboard/Dashboard';

const AgencyDashboard: React.FC = () => {
  return (
    <DashboardLayout userType="agency" brandName="NOG Performance - Agência">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<div className="mt-4">Página de Clientes em Construção</div>} />
        <Route path="branding" element={<div className="mt-4">Página de Personalização em Construção</div>} />
        <Route path="*" element={<div className="mt-4">Página não encontrada</div>} />
      </Routes>
    </DashboardLayout>
  );
};

export default AgencyDashboard;
