
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { BarChart3, Users, Zap, FileText, Shield, Palette } from 'lucide-react';

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
      <section className="bg-gradient-to-b from-muted/50 to-background py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Dashboard Inteligente para <span className="text-primary">Agências de Marketing</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Centralize o gerenciamento de campanhas, análise de performance e relacionamento com clientes 
            em uma plataforma completa e intuitiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user && (
              <>
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Começar Grátis
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Ver Demonstração
                </Button>
              </>
            )}
            {user && (
              <Link to={user.role === 'admin' ? '/agency-dashboard' : '/client-dashboard'}>
                <Button size="lg">
                  Acessar Meu Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Dashboard de Performance",
                description: "KPIs em tempo real, gráficos interativos e insights automáticos para otimizar suas campanhas.",
                icon: BarChart3
              },
              {
                title: "Gestão de Clientes",
                description: "Centralize informações, histórico e comunicação com todos os seus clientes em um só lugar.",
                icon: Users
              },
              {
                title: "Automações Inteligentes",
                description: "Configure alertas, relatórios automáticos e ações baseadas em performance das campanhas.",
                icon: Zap
              },
              {
                title: "Relatórios Personalizados",
                description: "Crie relatórios com a identidade da sua agência e envie automaticamente para clientes.",
                icon: FileText
              },
              {
                title: "White Label Completo",
                description: "Personalize cores, logo e domínio para uma experiência totalmente branded.",
                icon: Palette
              },
              {
                title: "Segurança Enterprise",
                description: "Proteção de dados, controle de acesso e backup automático para total tranquilidade.",
                icon: Shield
              }
            ].map((feature, index) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow group">
                <div className="bg-primary/10 p-3 rounded-md w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
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
          <h2 className="text-3xl font-bold mb-4">Pronto para turbinar sua agência?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Comece hoje mesmo a usar o NOG Performance Dashboard e transforme 
            a gestão da sua agência de marketing digital.
          </p>
          {!user && (
            <Link to="/login">
              <Button size="lg" variant="secondary">
                Criar Conta Grátis
              </Button>
            </Link>
          )}
          {user && (
            <Link to={user.role === 'admin' ? '/agency-dashboard' : '/client-dashboard'}>
              <Button size="lg" variant="secondary">
                Acessar Dashboard
              </Button>
            </Link>
          )}
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
