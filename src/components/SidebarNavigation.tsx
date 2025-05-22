
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, 
  LineChart, 
  Settings, 
  Users, 
  MessageSquare, 
  FileText, 
  Clock,
  ChevronDown,
  Calendar,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/utils/permissionsSystem';

interface SidebarNavigationProps {
  userType: 'agency' | 'client';
}

interface NavMenuItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  subItems?: Array<{ to: string, label: string }>;
  onlyVisibleTo?: UserRole[];
  userType: 'agency' | 'client';
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive, 
  subItems,
  onlyVisibleTo,
  userType
}) => {
  const [isOpen, setIsOpen] = useState(isActive);

  // Verify if this menu item should be visible to this user type
  // Convert string to UserRole for type safety
  const userRoleType = (userType === 'agency' ? 'admin' : 'client') as UserRole;
  
  if (onlyVisibleTo && !onlyVisibleTo.includes(userRoleType)) {
    return null;
  }

  const handleToggle = () => {
    if (subItems && subItems.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <SidebarMenuItem>
      {subItems && subItems.length > 0 ? (
        <div className="w-full">
          <Button
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "flex w-full justify-between items-center py-2",
              isActive && "bg-muted"
            )}
            onClick={handleToggle}
          >
            <div className="flex items-center">
              <Icon className="mr-2 h-4 w-4" />
              <span>{label}</span>
            </div>
            <ChevronDown 
              className={cn(
                "h-4 w-4 transition-transform", 
                isOpen && "transform rotate-180"
              )} 
            />
          </Button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pl-6 mt-1"
              >
                {subItems.map((subItem, index) => (
                  <SidebarMenuButton 
                    key={index}
                    asChild
                    isActive={isActive && window.location.pathname.includes(subItem.to)}
                  >
                    <Link 
                      to={subItem.to}
                      className="py-1.5 flex w-full text-sm"
                    >
                      {subItem.label}
                    </Link>
                  </SidebarMenuButton>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <SidebarMenuButton 
          asChild
          isActive={isActive}
          tooltip={label}
        >
          <Link to={to}>
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  );
};

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ userType }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const basePath = userType === 'agency' ? '/agency-dashboard' : '/client-dashboard';

  const menuItems = [
    {
      to: basePath,
      icon: BarChart,
      label: "Dashboard",
      subItems: []
    },
    {
      to: `${basePath}/campanhas`,
      icon: LineChart,
      label: "Campanhas",
      subItems: [
        { to: `${basePath}/campanhas`, label: "Todas as campanhas" },
        { to: `${basePath}/campanhas/analytics`, label: "Analytics" },
      ]
    },
    {
      to: `${basePath}/clients`,
      icon: Users,
      label: "Clientes",
      onlyVisibleTo: ['admin', 'manager'] as UserRole[],
      subItems: []
    },
    {
      to: `${basePath}/observacoes`,
      icon: MessageSquare,
      label: "Observações",
      subItems: []
    },
    {
      to: `${basePath}/automacoes`,
      icon: Zap,
      label: "Automações",
      onlyVisibleTo: ['admin', 'manager'] as UserRole[],
      subItems: []
    },
    {
      to: `${basePath}/relatorios`,
      icon: FileText,
      label: "Relatórios",
      subItems: [
        { to: `${basePath}/relatorios/exportar`, label: "Exportar" },
        { to: `${basePath}/relatorios/enviados`, label: "Enviados" },
        { to: `${basePath}/relatorios/modelos`, label: "Modelos" },
      ]
    },
    {
      to: `${basePath}/agenda`,
      icon: Calendar,
      label: "Agenda",
      subItems: []
    },
    {
      to: `${basePath}/configuracoes`,
      icon: Settings,
      label: "Configurações",
      subItems: [
        { to: `${basePath}/configuracoes`, label: "Geral" },
        { to: `${basePath}/branding`, label: "Personalização" },
        { to: `${basePath}/integracoes`, label: "Integrações" },
      ]
    }
  ];

  return (
    <>
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-lg">{userType === 'agency' ? 'Painel de Controle' : 'Meu Painel'}</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <NavMenuItem
                  key={index}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isActive={
                    item.to === basePath
                      ? currentPath === basePath || currentPath === `${basePath}/`
                      : currentPath.startsWith(item.to)
                  }
                  subItems={item.subItems}
                  onlyVisibleTo={item.onlyVisibleTo}
                  userType={userType}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="grid gap-1">
          <p className="text-xs text-muted-foreground text-center">
            © 2025 NOG Performance
          </p>
        </div>
      </SidebarFooter>
    </>
  );
};

export default SidebarNavigation;
