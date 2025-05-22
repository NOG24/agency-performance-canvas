
import React from 'react';
import { SidebarProvider, Sidebar, SidebarRail, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import SidebarPainelControle from './SidebarPainelControle';

interface LayoutPainelControleProps {
  children: React.ReactNode;
  userType: 'agency' | 'client';
  brandName?: string;
  brandLogo?: string;
}

const LayoutPainelControle: React.FC<LayoutPainelControleProps> = ({
  children,
  userType,
  brandName = userType === 'agency' ? 'NOG Performance - Agência' : 'NOG Performance',
  brandLogo = '/placeholder.svg'
}) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col w-full">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="flex h-14 items-center border-b px-4">
              <div className="flex items-center gap-2 font-semibold">
                {brandLogo && (
                  <img 
                    src={brandLogo} 
                    alt={brandName} 
                    className="h-6 w-6"
                  />
                )}
                <span className="text-lg font-semibold">{brandName}</span>
              </div>
            </SidebarHeader>
            
            <SidebarPainelControle userType={userType} />

            <SidebarFooter className="border-t p-4">
              <div className="grid gap-1">
                <p className="text-xs text-muted-foreground text-center">
                  © 2025 NOG Performance
                </p>
              </div>
            </SidebarFooter>
            
            <SidebarRail />
          </Sidebar>
          
          <main className="flex-1 overflow-auto">
            <div className="container py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LayoutPainelControle;
