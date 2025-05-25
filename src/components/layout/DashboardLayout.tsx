
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarRail } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/hooks/useAuth';
import SidebarNavigation from '@/components/ui/sidebar-navigation';
import { Bell, Menu, LogOut, User, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'agency' | 'client';
  brandName?: string;
  brandLogo?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userType,
  brandName = userType === 'agency' ? 'NOG Performance - Agência' : 'NOG Performance',
  brandLogo = '/placeholder.svg'
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout bem-sucedido",
        description: "Você saiu da sua conta com sucesso.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Erro ao sair",
        description: "Houve um problema ao fazer logout. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col w-full">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
              
              <div className="flex items-center gap-2">
                <img 
                  src={brandLogo} 
                  alt={brandName} 
                  className="h-8 w-8"
                />
                <span className="font-semibold text-lg hidden md:inline-block">
                  {brandName}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {user?.name?.substring(0, 2) || (userType === 'agency' ? 'AG' : 'CL')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main sidebar */}
          <Sidebar variant="sidebar" collapsible="icon">
            <SidebarNavigation userType={userType} />
            <SidebarRail />
          </Sidebar>
          
          {/* Mobile sidebar sheet */}
          {showMobileMenu && (
            <div className="fixed inset-0 z-50 bg-black/80 md:hidden" onClick={() => setShowMobileMenu(false)}>
              <div className="fixed left-0 top-0 z-50 h-full w-3/4 max-w-xs bg-background p-0" onClick={e => e.stopPropagation()}>
                <SidebarNavigation userType={userType} />
              </div>
            </div>
          )}
          
          {/* Main content area */}
          <main className="flex-1 overflow-y-auto">
            {userType === 'agency' && (
              <div className="border-b bg-muted/40">
                <div className="container py-2 px-4">
                  <ClientSelector />
                </div>
              </div>
            )}
            <div className="container py-6 px-4">
              {children}
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t py-4 bg-background">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} {brandName}</p>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
};

// Simple ClientSelector component - will be expanded later
const ClientSelector = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Cliente Atual:</span>
      <select className="text-sm bg-background border rounded px-2 py-1">
        <option>Todos os clientes</option>
        <option>Cliente A</option>
        <option>Cliente B</option>
        <option>Cliente C</option>
      </select>
    </div>
  );
};

export default DashboardLayout;
