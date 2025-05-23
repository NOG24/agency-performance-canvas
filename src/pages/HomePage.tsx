
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <img 
              src="/placeholder.svg" 
              alt="NOG Performance" 
              className="h-8 w-8"
            />
            <span className="font-semibold text-lg">NOG Performance</span>
          </div>
          
          <div className="flex items-center gap-2">
            {user ? (
              <Link to={user.role === 'admin' ? '/agency-dashboard' : '/client-dashboard'}>
                <Button variant="default">
                  Acessar Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="default">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-muted py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Plataforma de Gestão de Performance Digital
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Uma solução completa para agências de marketing e profissionais autônomos 
            gerenciarem campanhas, analisarem resultados e otimizarem o desempenho digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg">
                Começar Agora
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Conheça os Recursos
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Principais Funcionalidades</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Dashboard de Resultados",
                description: "Visualize todos os KPIs importantes das suas campanhas em um único lugar."
              },
              {
                title: "Gestão de Campanhas",
                description: "Acompanhe o desempenho de todas as suas campanhas de marketing digital."
              },
              {
                title: "Relatórios Automáticos",
                description: "Crie e envie relatórios personalizados para seus clientes automaticamente."
              },
              {
                title: "Observações Inteligentes",
                description: "Registre e compartilhe insights sobre as campanhas com sua equipe e clientes."
              },
              {
                title: "White Label",
                description: "Personalize a plataforma com a identidade visual da sua agência."
              },
              {
                title: "Automações",
                description: "Configure alertas e ações automáticas com base em gatilhos personalizados."
              }
            ].map((feature, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para melhorar seus resultados?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Comece agora mesmo a utilizar o NOG Dashboard e leve sua 
            gestão de marketing digital para o próximo nível.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary">
              Criar Conta Grátis
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background py-12 px-4 border-t mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img 
                src="/placeholder.svg" 
                alt="NOG Performance" 
                className="h-8 w-8"
              />
              <span className="font-semibold">NOG Performance</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground text-center md:text-right">
                © {new Date().getFullYear()} NOG Performance. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
