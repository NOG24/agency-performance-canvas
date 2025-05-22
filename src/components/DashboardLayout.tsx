
import React, { useState } from 'react';
import Navbar from './Navbar';
import { SidebarProvider, Sidebar, SidebarRail } from "@/components/ui/sidebar";
import SidebarNavigation from './SidebarNavigation';
import { CompanySelector } from './CompanySelector';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'agency' | 'client';
  brandName?: string;
  brandLogo?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userType,
  brandName = userType === 'agency' ? 'NOG Dashboard' : 'NOG Performance Dashboard',
  brandLogo = '/placeholder.svg'
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen flex-col w-full">
        <Navbar 
          userType={userType}
          brandName={brandName}
          brandLogo={brandLogo}
          showMobileMenu={showMobileMenu}
          onToggleMobileMenu={toggleMobileMenu}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar variant="sidebar" collapsible="icon">
              <SidebarNavigation userType={userType} />
              <SidebarRail />
            </Sidebar>
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div 
                className="fixed inset-0 z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-black/50"
                  onClick={() => setShowMobileMenu(false)}
                />
                <motion.div
                  className="absolute left-0 top-16 bottom-0 w-64 bg-background"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <SidebarNavigation userType={userType} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="flex-1 overflow-auto">
            {userType === 'agency' && (
              <div className="border-b bg-muted/40">
                <div className="container py-2 px-4 md:px-6">
                  <CompanySelector />
                </div>
              </div>
            )}
            <div className="container py-6 px-4 md:px-6">
              {children}
            </div>
          </main>
        </div>
        
        <footer className="border-t py-4 bg-background">
          <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
            <p>© 2025 {brandName} | Powered by NOG Performance</p>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
