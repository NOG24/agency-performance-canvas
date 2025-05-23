
import React from 'react';
import Login from '../components/Login';
import { Card, CardContent } from '@/components/ui/card';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                NOG Performance
              </h1>
              <p className="text-xl text-muted-foreground">
                Painel de gerenciamento de campanhas e resultados para agências de marketing digital e seus clientes.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Resultados em tempo real</h3>
                  <p className="text-sm text-muted-foreground">
                    Métricas de campanhas atualizadas constantemente
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Observações e insights</h3>
                  <p className="text-sm text-muted-foreground">
                    Comunicação transparente entre agência e cliente
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Personalização completa</h3>
                  <p className="text-sm text-muted-foreground">
                    Adapte a interface com suas cores e marca
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-md">
            <Card className="border-neutral-200 shadow-lg transition-shadow hover:shadow-xl">
              <CardContent className="p-0">
                <Login />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© 2025 NOG Performance. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
