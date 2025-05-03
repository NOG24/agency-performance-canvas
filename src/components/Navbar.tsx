
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface NavbarProps {
  userType: 'agency' | 'client';
  brandLogo?: string;
  brandName?: string;
  primaryColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  userType, 
  brandLogo = '/placeholder.svg', 
  brandName = 'NOG Dashboard',
  primaryColor = 'var(--primary)'
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // In a real app, this would clear auth tokens
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  return (
    <header className="border-b bg-white dark:bg-gray-950">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to={userType === 'agency' ? '/agency-dashboard' : '/client-dashboard'} className="flex items-center gap-2">
            <img 
              src={brandLogo} 
              alt="NOG Logo" 
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <span className="font-semibold text-lg md:text-xl">{brandName}</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {userType === 'agency' && (
            <>
              <Link 
                to="/agency-dashboard" 
                className="text-sm font-medium hover:underline"
              >
                Dashboard
              </Link>
              <Link 
                to="/agency-dashboard/clients" 
                className="text-sm font-medium hover:underline"
              >
                Clientes
              </Link>
              <Link 
                to="/agency-dashboard/branding" 
                className="text-sm font-medium hover:underline"
              >
                Personalização
              </Link>
            </>
          )}
          {userType === 'client' && (
            <>
              <Link 
                to="/client-dashboard" 
                className="text-sm font-medium hover:underline"
              >
                Visão Geral
              </Link>
              <Link 
                to="/client-dashboard/campaigns" 
                className="text-sm font-medium hover:underline"
              >
                Campanhas
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userType === 'agency' ? 'NG' : 'CL'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
