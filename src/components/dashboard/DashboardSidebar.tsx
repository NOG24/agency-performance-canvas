
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

// Import Lucide icons
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  FileText,
  Zap,
  Users,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ExternalLink
} from "lucide-react";

interface SidebarNavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  requiredRole?: string[];
  isPresentation?: boolean;
}

interface DashboardSidebarProps {
  userType: 'agency' | 'client';
  isPresentation?: boolean;
}

const navItems: SidebarNavItemProps[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    to: "/dashboard",
    requiredRole: ["admin", "manager", "analyst", "client"]
  },
  {
    icon: BarChart3,
    label: "Performance",
    to: "/performance",
    requiredRole: ["admin", "manager", "analyst", "client"]
  },
  {
    icon: Calendar,
    label: "Campaigns",
    to: "/campaigns",
    requiredRole: ["admin", "manager", "analyst", "client"]
  },
  {
    icon: FileText,
    label: "Reports",
    to: "/reports",
    requiredRole: ["admin", "manager", "analyst"]
  },
  {
    icon: Zap,
    label: "Automations",
    to: "/automations",
    requiredRole: ["admin", "manager"]
  },
  {
    icon: Users,
    label: "Clients",
    to: "/clients",
    requiredRole: ["admin", "manager"],
    isPresentation: false
  },
  {
    icon: CreditCard,
    label: "Billing",
    to: "/billing",
    requiredRole: ["admin"],
    isPresentation: false
  },
  {
    icon: Settings,
    label: "Settings",
    to: "/settings",
    requiredRole: ["admin", "manager"],
    isPresentation: false
  },
  {
    icon: HelpCircle,
    label: "Support",
    to: "/support",
    requiredRole: ["admin", "manager", "analyst", "client"]
  }
];

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ userType, isPresentation = false }) => {
  const { user, logout } = useAuth();
  
  // Filter navigation items based on user role and presentation mode
  const filteredNavItems = navItems.filter(item => {
    // If in presentation mode, hide items marked for non-presentation
    if (isPresentation && item.isPresentation === false) return false;
    
    // Check role-based permissions
    if (!item.requiredRole) return true;
    if (item.requiredRole.includes(user?.role || '')) return true;
    
    return false;
  });

  return (
    <>
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2 font-semibold">
          <img src="/placeholder.svg" alt="NOG" className="h-6 w-6" />
          <span className="text-lg">NOG Performance</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn("flex items-center gap-2", isActive && "font-medium")
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        {!isPresentation && (
          <>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Button>
            <div className="mt-2 text-xs text-muted-foreground">
              <p className="text-center">NOG Dashboard v1.0</p>
            </div>
          </>
        )}
        {isPresentation && (
          <div className="flex flex-col gap-2 items-center">
            <Button variant="outline" size="sm" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              <span>Exit Presentation</span>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </>
  );
};

export default DashboardSidebar;
