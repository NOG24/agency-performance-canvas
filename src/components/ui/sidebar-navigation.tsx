
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
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
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard,
  BarChart3, 
  LineChart, 
  Settings, 
  Users, 
  MessageSquare, 
  FileText, 
  Calendar,
  Zap,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/utils/permissionsSystem';

interface SidebarNavigationProps {
  userType: 'agency' | 'client';
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ userType }) => {
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;
  const basePath = userType === 'agency' ? '/agency-dashboard' : '/client-dashboard';

  // Define menu items with appropriate access control
  const menuItems = [
    {
      title: "Dashboard",
      path: basePath,
      icon: LayoutDashboard,
      roles: ['admin', 'manager', 'analyst', 'client']
    },
    {
      title: "Campanhas",
      path: `${basePath}/campanhas`,
      icon: LineChart,
      roles: ['admin', 'manager', 'analyst', 'client']
    },
    {
      title: "Observações",
      path: `${basePath}/observacoes`,
      icon: MessageSquare,
      roles: ['admin', 'manager', 'analyst']
    },
    {
      title: "Clientes",
      path: `${basePath}/clients`,
      icon: Users,
      roles: ['admin', 'manager']
    },
    {
      title: "Relatórios",
      path: `${basePath}/relatorios`,
      icon: FileText,
      roles: ['admin', 'manager', 'analyst', 'client'],
      subItems: [
        { title: "Exportar", path: `${basePath}/relatorios/exportar` },
        { title: "Enviados", path: `${basePath}/relatorios/enviados` }
      ]
    },
    {
      title: "Automações",
      path: `${basePath}/automacoes`,
      icon: Zap,
      roles: ['admin', 'manager']
    },
    {
      title: "Agenda",
      path: `${basePath}/agenda`,
      icon: Calendar,
      roles: ['admin', 'manager', 'analyst', 'client']
    },
    {
      title: "Configurações",
      path: `${basePath}/configuracoes`,
      icon: Settings,
      roles: ['admin', 'manager', 'client']
    }
  ];

  // Filter menu items based on user role
  const userRole = user?.role || (userType === 'agency' ? 'admin' : 'client') as UserRole;
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole) && 
    // Hide certain items from clients
    (userType === 'agency' || !['Observações', 'Clientes'].includes(item.title))
  );

  return (
    <>
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-lg">{userType === 'agency' ? 'Painel de Controle' : 'Meu Dashboard'}</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <CollapsibleMenuItem 
                      item={item} 
                      currentPath={currentPath}
                      basePath={basePath}
                    />
                  ) : (
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
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="grid gap-1">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} NOG Performance
          </p>
        </div>
      </SidebarFooter>
    </>
  );
};

// Helper component for collapsible menu items with subitems
const CollapsibleMenuItem = ({ 
  item, 
  currentPath,
  basePath 
}: { 
  item: any, 
  currentPath: string,
  basePath: string
}) => {
  const isActive = currentPath.startsWith(item.path);
  const [isOpen, setIsOpen] = React.useState(isActive);

  return (
    <div className="w-full">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "flex w-full justify-between items-center py-2",
          isActive && "bg-muted"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </div>
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform", 
            isOpen && "transform rotate-180"
          )} 
        />
      </Button>
      
      {isOpen && item.subItems && (
        <div className="pl-6 mt-1">
          {item.subItems.map((subItem: any, index: number) => (
            <SidebarMenuButton 
              key={index}
              asChild
              isActive={currentPath === subItem.path}
            >
              <Link 
                to={subItem.path}
                className="py-1.5 flex w-full text-sm"
              >
                {subItem.title}
              </Link>
            </SidebarMenuButton>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarNavigation;
