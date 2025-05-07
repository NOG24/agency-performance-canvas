
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
          <h1 className="text-2xl font-bold text-center font-montserrat">NOG Performance Dashboard</h1>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-10">
        <div className="w-full max-w-4xl space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-bebas animate-fade-in">
              🚀 Painel de Performance NOG — Visão Geral
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-3xl mx-auto font-poppins animate-fade-in" style={{animationDelay: "0.1s"}}>
              Bem-vindo ao seu <span className="font-semibold">painel white-label de performance em marketing</span>,
              desenvolvido pela NOG. Acompanhe <span className="font-semibold">em tempo real</span> os principais 
              indicadores das campanhas e ações digitais.
            </p>
          </div>
          
          <Separator />
          
          {/* Purpose Section */}
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2 font-montserrat animate-slide-in-right">
              🎯 Propósito
            </h3>
            <p className="text-muted-foreground font-poppins animate-fade-in" style={{animationDelay: "0.2s"}}>
              Este dashboard foi desenvolvido para <span className="font-semibold">agências de performance que desejam entregar mais valor, 
              confiança e controle para seus clientes</span>, sem depender de planilhas ou relatórios manuais.
            </p>
            <p className="font-medium text-lg font-roboto-condensed animate-fade-in" style={{animationDelay: "0.3s"}}>
              Com a NOG, o cliente vê e sente o resultado.
            </p>
          </div>
          
          {/* Features Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2 font-montserrat animate-slide-in-right">
              📊 Funcionalidades
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-2 animate-scale-in" style={{animationDelay: "0.1s"}}>
                <Check className="h-5 w-5 text-[#04B45F] mt-0.5 flex-shrink-0" />
                <p className="font-poppins"><span className="font-semibold">Acesso segmentado:</span> visão separada para agência e cliente.</p>
              </div>
              <div className="flex items-start gap-2 animate-scale-in" style={{animationDelay: "0.2s"}}>
                <Check className="h-5 w-5 text-[#04B45F] mt-0.5 flex-shrink-0" />
                <p className="font-poppins"><span className="font-semibold">Gráficos de performance</span> com atualizações em tempo real.</p>
              </div>
              <div className="flex items-start gap-2 animate-scale-in" style={{animationDelay: "0.3s"}}>
                <Check className="h-5 w-5 text-[#04B45F] mt-0.5 flex-shrink-0" />
                <p className="font-poppins"><span className="font-semibold">Filtros inteligentes</span> por campanha, período e canal.</p>
              </div>
              <div className="flex items-start gap-2 animate-scale-in" style={{animationDelay: "0.4s"}}>
                <Check className="h-5 w-5 text-[#04B45F] mt-0.5 flex-shrink-0" />
                <p className="font-poppins"><span className="font-semibold">Integração com fontes externas</span> (Ex: Supabase, APIs de Ads e Analytics).</p>
              </div>
              <div className="flex items-start gap-2 animate-scale-in" style={{animationDelay: "0.5s"}}>
                <Check className="h-5 w-5 text-[#04B45F] mt-0.5 flex-shrink-0" />
                <p className="font-poppins"><span className="font-semibold">Área personalizável</span> para colocar observações da equipe, insights e próximos passos.</p>
              </div>
            </div>
          </div>
          
          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2 font-montserrat animate-slide-in-right">
              🛠️ Tecnologias utilizadas
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all animate-scale-in" style={{animationDelay: "0.1s"}}>
                <p className="font-medium font-montserrat">React + Tailwind</p>
                <p className="text-sm text-muted-foreground font-poppins">Design responsivo e moderno</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all animate-scale-in" style={{animationDelay: "0.2s"}}>
                <p className="font-medium font-montserrat">ShadCN UI</p>
                <p className="text-sm text-muted-foreground font-poppins">Componentes profissionais</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all animate-scale-in" style={{animationDelay: "0.3s"}}>
                <p className="font-medium font-montserrat">Framer Motion</p>
                <p className="text-sm text-muted-foreground font-poppins">Animações suaves</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all animate-scale-in" style={{animationDelay: "0.4s"}}>
                <p className="font-medium font-montserrat">Supabase</p>
                <p className="text-sm text-muted-foreground font-poppins">Banco de dados e autenticação</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all animate-scale-in" style={{animationDelay: "0.5s"}}>
                <p className="font-medium font-montserrat">Lucide Icons</p>
                <p className="text-sm text-muted-foreground font-poppins">Interface intuitiva</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-all animate-scale-in" style={{animationDelay: "0.6s"}}>
                <p className="font-medium font-montserrat">Recharts</p>
                <p className="text-sm text-muted-foreground font-poppins">Visualizações de dados</p>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight flex items-center gap-2 font-montserrat animate-slide-in-right">
              🧪 Próximos passos
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 animate-fade-in" style={{animationDelay: "0.1s"}}>
                <div className="bg-[#04B45F]/20 text-[#04B45F] rounded-full w-6 h-6 flex items-center justify-center font-medium">1</div>
                <p className="font-poppins"><span className="font-semibold">Conectar Supabase</span> para salvar dados e permitir logins</p>
              </div>
              <div className="flex items-center gap-2 animate-fade-in" style={{animationDelay: "0.2s"}}>
                <div className="bg-[#04B45F]/20 text-[#04B45F] rounded-full w-6 h-6 flex items-center justify-center font-medium">2</div>
                <p className="font-poppins"><span className="font-semibold">Customizar identidade visual</span> com a cara da NOG</p>
              </div>
              <div className="flex items-center gap-2 animate-fade-in" style={{animationDelay: "0.3s"}}>
                <div className="bg-[#04B45F]/20 text-[#04B45F] rounded-full w-6 h-6 flex items-center justify-center font-medium">3</div>
                <p className="font-poppins"><span className="font-semibold">Integrar dados reais</span> de campanhas</p>
              </div>
              <div className="flex items-center gap-2 animate-fade-in" style={{animationDelay: "0.4s"}}>
                <div className="bg-[#04B45F]/20 text-[#04B45F] rounded-full w-6 h-6 flex items-center justify-center font-medium">4</div>
                <p className="font-poppins"><span className="font-semibold">Criar dashboards personalizados</span> para cada cliente</p>
              </div>
            </div>
          </div>
          
          {/* Strategic Tip */}
          <div className="bg-[#04B45F]/10 border border-[#04B45F]/20 p-6 rounded-lg animate-scale-in">
            <h4 className="font-semibold text-xl mb-2 font-montserrat">🧠 Dica estratégica da NOG:</h4>
            <blockquote className="pl-4 border-l-4 border-[#04B45F]">
              <p className="italic font-poppins">
                Utilize este painel como <span className="font-semibold">diferencial competitivo</span> na hora de fechar novos contratos.
                Mostre ao lead que ele terá acesso a dados claros, confiáveis e organizados – algo que poucos concorrentes entregam.
              </p>
            </blockquote>
          </div>
          
          {/* Final call to action */}
          <div className="text-center space-y-4 py-4 animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold font-bebas">
              Transforme dados em decisões. Vendas em resultado real.
            </h3>
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 px-5 py-2 rounded-lg shadow-md inline-block">
                <p className="font-montserrat font-semibold text-lg">NOG</p>
              </div>
            </div>
            <p className="font-montserrat text-[#04B45F] font-semibold">
              Comente "PAINEL" para receber acesso antecipado gratuito
            </p>
          </div>
          
          {/* Login Section */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-6 text-center font-montserrat animate-fade-in">
              Acesse o Dashboard
            </h3>
            <Login />
          </div>
        </div>
      </main>
      
      <footer className="w-full p-4 border-t text-center text-sm text-muted-foreground bg-white dark:bg-gray-950">
        <p className="font-poppins">📌 Copyright © 2025 — <span className="font-medium">Powered by NOG | Fluxo de Vendas e Performance Estratégica</span></p>
      </footer>
    </div>
  );
};

export default Index;
