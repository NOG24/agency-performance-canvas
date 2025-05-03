
import React from 'react';
import Navbar from './Navbar';

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
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar 
        userType={userType}
        brandName={brandName}
        brandLogo={brandLogo}
      />
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        {children}
      </main>
      <footer className="border-t py-4 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 {brandName} | Powered by NOG Performance</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
