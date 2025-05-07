
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock login function - would connect to auth service in production
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock login logic - in real app this would validate with backend
      if (email.includes('agency')) {
        navigate('/agency-dashboard');
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel de controle da agência!",
        });
      } else {
        navigate('/client-dashboard');
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao seu painel de performance!",
        });
      }
    } catch (error) {
      toast({
        title: "Falha no login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-6">
      <div className="w-full">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="request">Solicitar Acesso</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="border-neutral-200 shadow-md transition-all hover:shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center font-montserrat animate-fade-in">
                  Entrar no Painel de Resultados
                </CardTitle>
                <CardDescription className="text-center animate-fade-in">
                  Acesse seu painel de performance em marketing
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      E-mail
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all focus:border-[#04B45F] focus:ring-[#04B45F]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Senha
                      </label>
                      <a
                        href="#"
                        className="text-sm text-[#04B45F] hover:text-[#038f4c] transition-colors"
                      >
                        Esqueceu a senha?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="transition-all focus:border-[#04B45F] focus:ring-[#04B45F]"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2.5">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#04B45F] hover:bg-[#038f4c] text-white font-semibold transition-all transform hover:scale-[1.02]" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    Acesso exclusivo para clientes e parceiros
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="request">
            <Card className="border-neutral-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold font-montserrat">Solicitar Acesso</CardTitle>
                <CardDescription>
                  Não tem uma conta? Solicite acesso à sua agência.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="request-email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Seu E-mail
                  </label>
                  <Input
                    id="request-email"
                    type="email"
                    placeholder="seu@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="agency" className="text-sm font-medium">
                    Nome da Agência
                  </label>
                  <Input
                    id="agency"
                    type="text"
                    placeholder="Nome da agência"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2.5">
                <Button className="w-full bg-[#04B45F] hover:bg-[#038f4c] text-white font-semibold">
                  Enviar Solicitação
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Retornaremos em até 24 horas úteis
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <p className="text-center text-sm text-gray-500">
        Para demonstração: use "agency@example.com" para acesso de agência ou "client@example.com" para acesso de cliente
      </p>
    </div>
  );
};

export default Login;
