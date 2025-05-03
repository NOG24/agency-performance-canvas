
import React from 'react';
import Login from "@/components/Login";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 bg-white shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-center">Agency Performance Dashboard</h1>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome to Your Marketing Performance Dashboard
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Access real-time metrics and performance data for your marketing campaigns
            </p>
          </div>
          
          <Login />
        </div>
      </main>
      
      <footer className="w-full p-4 border-t text-center text-sm text-muted-foreground">
        <p>© 2025 Agency Performance Dashboard | A white-label solution for marketing agencies</p>
      </footer>
    </div>
  );
};

export default Index;
