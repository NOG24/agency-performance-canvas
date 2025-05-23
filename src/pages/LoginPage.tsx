
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { UserRole } from '@/utils/permissionsSystem';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('client');
  
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo ao NOG Dashboard."
      });
      
      // Redirect based on role from the auth provider
      navigate(userRole === 'admin' ? '/agency-dashboard' : '/client-dashboard');
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(email, password, name, userRole);
      toast({
        title: "Cadastro realizado!",
        description: "Sua conta foi criada com sucesso."
      });
      
      // Redirect based on role
      navigate(userRole === 'admin' ? '/agency-dashboard' : '/client-dashboard');
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível completar o cadastro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 px-4">
      <div className="w-full max-w-md space-y-6 py-12">
        <div className="text-center mb-8">
          <img 
            src="/placeholder.svg"
            alt="NOG Dashboard" 
            className="mx-auto h-12 w-auto" 
          />
          <h2 className="mt-6 text-3xl font-bold tracking-tight">NOG Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Plataforma para gestão de performance digital
          </p>
        </div>
        
        <Card>
          <Tabs defaultValue="login" onValueChange={(value) => setIsRegister(value === 'register')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Acesse sua conta</CardTitle>
                  <CardDescription>
                    Entre com seu e-mail e senha para acessar o dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Senha</Label>
                      <Link to="/esqueci-senha" className="text-sm text-primary hover:underline">
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Acesso</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        type="button" 
                        variant={userRole === 'admin' ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setUserRole('admin')}
                      >
                        Agência
                      </Button>
                      <Button 
                        type="button" 
                        variant={userRole === 'client' ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setUserRole('client')}
                      >
                        Cliente
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Crie sua conta</CardTitle>
                  <CardDescription>
                    Preencha os dados abaixo para se cadastrar.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nome Completo</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Seu Nome"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Conta</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        type="button" 
                        variant={userRole === 'admin' ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setUserRole('admin')}
                      >
                        Agência
                      </Button>
                      <Button 
                        type="button" 
                        variant={userRole === 'client' ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setUserRole('client')}
                      >
                        Cliente
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registrando..." : "Registrar"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
