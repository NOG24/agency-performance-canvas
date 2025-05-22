
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { 
  BarChart, 
  MessageSquare, 
  Settings, 
  LineChart
} from 'lucide-react';

interface SidebarPainelControleProps {
  userType: 'agency' | 'client';
}

const SidebarPainelControle: React.FC<SidebarPainelControleProps> = ({ userType }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const basePath = userType === 'agency' ? '/agency-dashboard' : '/client-dashboard';

  // Define itens do menu com base no tipo de usuário
  const menuItems = [
    {
      title: 'Dashboard',
      path: basePath,
      icon: BarChart
    },
    {
      title: userType === 'agency' ? 'Gerenciar Campanhas' : 'Campanhas',
      path: `${basePath}/${userType === 'agency' ? 'campanhas' : 'campanhas'}`,
      icon: LineChart
    }
  ];

  // Adiciona itens específicos para agência
  if (userType === 'agency') {
    menuItems.push(
      {
        title: 'Observações',
        path: `${basePath}/observacoes`,
        icon: MessageSquare
      },
      {
        title: 'Configurações',
        path: `${basePath}/configuracoes`,
        icon: Settings
      }
    );
  } else {
    // Itens para cliente
    menuItems.push(
      {
        title: 'Configurações',
        path: `${basePath}/configuracoes`,
        icon: Settings
      }
    );
  }

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Painel de Controle</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild
                  isActive={
                    item.path === basePath 
                      ? currentPath === basePath || currentPath === `${basePath}/` 
                      : currentPath.startsWith(item.path)
                  }
                  tooltip={item.title}
                >
                  <Link to={item.path}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {userType === 'agency' && (
        <SidebarGroup>
          <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={currentPath.startsWith(`${basePath}/clientes`)}
                  tooltip="Clientes"
                >
                  <Link to={`${basePath}/clients`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Clientes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  isActive={currentPath.startsWith(`${basePath}/branding`)}
                  tooltip="Personalização"
                >
                  <Link to={`${basePath}/branding`}>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <span>Personalização</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </SidebarContent>
  );
};

export default SidebarPainelControle;
