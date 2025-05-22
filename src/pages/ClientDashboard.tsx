
import React from 'react';
import { Routes, Route } from "react-router-dom";
import DashboardLayout from '@/components/DashboardLayout';
import Dashboard from '@/components/dashboard/Dashboard';

const ClientDashboard: React.FC = () => {
  return (
    <DashboardLayout userType="client" brandName="NOG Performance">
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="campanhas" element={<div className="mt-4">Página de Campanhas em Construção</div>} />
        <Route path="*" element={<div className="mt-4">Página não encontrada</div>} />
      </Routes>
    </DashboardLayout>
  );
};

export default ClientDashboard;
