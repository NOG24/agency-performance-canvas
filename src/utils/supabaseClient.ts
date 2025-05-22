
import { createClient } from '@supabase/supabase-js';

// Simulação de credenciais para testes (não são válidas)
// Em produção, estas credenciais devem estar em variáveis de ambiente
const supabaseUrl = 'https://sua-url-do-projeto.supabase.co';
const supabaseKey = 'sua-chave-publica-anon-do-supabase';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Log para depuração (não deve aparecer em produção)
console.log('Cliente Supabase inicializado para simulação');

/**
 * Funções para simular operações com Supabase
 * Estas funções são apenas para demonstração e simulação
 * Em produção, deve-se usar as funções reais do Supabase
 */

// Simula a autenticação
export const autenticar = async (email: string, senha: string) => {
  // Simula uma chamada ao Supabase
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Usuários simulados para teste
  const usuariosSimulados = [
    { id: 'usr_123', email: 'agencia@exemplo.com', tipo: 'agency' },
    { id: 'usr_456', email: 'cliente@exemplo.com', tipo: 'client' }
  ];
  
  const usuario = usuariosSimulados.find(u => u.email === email);
  
  if (usuario && senha === 'senha123') {
    return { 
      data: { user: usuario }, 
      error: null 
    };
  }
  
  return { 
    data: null, 
    error: { message: 'Credenciais inválidas' } 
  };
};

// Simula busca de dados no banco
export const buscarDados = async (tabela: string, filtros?: Record<string, any>) => {
  // Simula uma chamada ao Supabase
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Retorna dados simulados com base na tabela solicitada
  return {
    data: [],
    error: null
  };
};
