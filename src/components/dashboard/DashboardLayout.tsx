
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
import { useAuth } from '@/providers/AuthProvider';
import { cn } from '@/lib/utils';

// Import Lucide icons
import { 
  Menu, 
  Settings, 
  LogOut, 
  User,
  Bell
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'agency' | 'client';
  brandName?: string;
  brandLogo?: string;
  isPresentation?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userType,
  brandName = userType === 'agency' ? 'NOG Performance' : 'NOG Performance Dashboard',
  brandLogo = '/placeholder.svg',
  isPresentation = false
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout successful",
        description: "You've been logged out successfully.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was a problem logging out. Please try again.",
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
              {!isPresentation && (
                <>
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
                            {user?.name?.substring(0, 2) || 'NG'}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main sidebar */}
          <Sidebar variant="sidebar" collapsible="icon">
            {/* Sidebar content will be imported from SidebarContent component */}
            <div className="flex flex-col h-full">
              {/* This will be filled by the DashboardSidebar component */}
            </div>
            <SidebarRail />
          </Sidebar>
          
          {/* Main content area */}
          <main className={cn(
            "flex-1 overflow-y-auto px-4 py-6", 
            isPresentation && "bg-gray-50"
          )}>
            <div className="container mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
