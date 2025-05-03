
import React from 'react';
import { Link } from 'react-router-dom';
import Login from "@/components/Login";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <header className="w-full p-4 bg-white dark:bg-gray-950 shadow-sm">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-center">NOG Performance Dashboard</h1>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-10">
        <div className="w-full max-w-4xl space-y-10">
          {/* Hero Section */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              🚀 Painel de Performance NOG — Visão Geral
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto">
              Bem-vindo ao seu <span className="font-semibold">painel white-label de performance em marketing</span>,
              desenvolvido pela NOG. Acompanhe <span className="font-semibold">em tempo real</span> os principais 
              indicadores das campanhas e ações digitais.
            </p>
          </div>
          
          <Separator />
          
          {/* Purpose Section */}
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              🎯 Propósito
            </h3>
            <p className="text-muted-foreground">
              Este dashboard foi desenvolvido para <span className="font-semibold">agências de performance que desejam entregar mais valor, 
              confiança e controle para seus clientes</span>, sem depender de planilhas ou relatórios manuais.
            </p>
            <p className="font-medium text-lg">Com a NOG, o cliente vê e sente o resultado.</p>
          </div>
          
          {/* Features Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              📊 Funcionalidades
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p><span className="font-semibold">Acesso segmentado:</span> visão separada para agência e cliente.</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p><span className="font-semibold">Gráficos de performance</span> com atualizações em tempo real.</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p><span className="font-semibold">Filtros inteligentes</span> por campanha, período e canal.</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p><span className="font-semibold">Integração com fontes externas</span> (Ex: Supabase, APIs de Ads e Analytics).</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p><span className="font-semibold">Área personalizável</span> para colocar observações da equipe, insights e próximos passos.</p>
              </div>
            </div>
          </div>
          
          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              🛠️ Tecnologias utilizadas
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p className="font-medium">React + Tailwind</p>
                <p className="text-sm text-muted-foreground">Design responsivo e moderno</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p className="font-medium">ShadCN UI</p>
                <p className="text-sm text-muted-foreground">Componentes profissionais</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p className="font-medium">Framer Motion</p>
                <p className="text-sm text-muted-foreground">Animações suaves</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p className="font-medium">Supabase</p>
                <p className="text-sm text-muted-foreground">Banco de dados e autenticação</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p className="font-medium">Lucide Icons</p>
                <p className="text-sm text-muted-foreground">Interface intuitiva</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <p className="font-medium">Recharts</p>
                <p className="text-sm text-muted-foreground">Visualizações de dados</p>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              🧪 Próximos passos
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium">1</div>
                <p><span className="font-semibold">Conectar Supabase</span> para salvar dados e permitir logins</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium">2</div>
                <p><span className="font-semibold">Customizar identidade visual</span> com a cara da NOG</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium">3</div>
                <p><span className="font-semibold">Integrar dados reais</span> de campanhas</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center font-medium">4</div>
                <p><span className="font-semibold">Criar dashboards personalizados</span> para cada cliente</p>
              </div>
            </div>
          </div>
          
          {/* Strategic Tip */}
          <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
            <h4 className="font-semibold text-xl mb-2">🧠 Dica estratégica da NOG:</h4>
            <blockquote className="pl-4 border-l-4 border-primary">
              <p className="italic">
                Utilize este painel como <span className="font-semibold">diferencial competitivo</span> na hora de fechar novos contratos.
                Mostre ao lead que ele terá acesso a dados claros, confiáveis e organizados – algo que poucos concorrentes entregam.
              </p>
            </blockquote>
          </div>
          
          {/* Login Section */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-6 text-center">Acesse o Dashboard</h3>
            <Login />
          </div>
        </div>
      </main>
      
      <footer className="w-full p-4 border-t text-center text-sm text-muted-foreground bg-white dark:bg-gray-950">
        <p>📌 Copyright © 2025 — <span className="font-medium">Powered by NOG | Fluxo de Vendas e Performance Estratégica</span></p>
      </footer>
    </div>
  );
};

export default Index;
