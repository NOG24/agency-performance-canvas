
// Função para verificar preferência do usuário por tema escuro
export const prefereDarkMode = (): boolean => {
  // Verifica se há preferência salva no localStorage
  const temaArmazenado = localStorage.getItem('tema');
  if (temaArmazenado) {
    return temaArmazenado === 'escuro';
  }
  
  // Caso contrário, verifica a preferência do sistema
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Função para alternar o tema
export const alternarTema = (): 'claro' | 'escuro' => {
  const html = document.documentElement;
  const temaAtual = html.classList.contains('dark') ? 'escuro' : 'claro';
  const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';
  
  if (novoTema === 'escuro') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  
  localStorage.setItem('tema', novoTema);
  return novoTema;
};

// Função para inicializar o tema
export const inicializarTema = (): void => {
  const html = document.documentElement;
  
  if (prefereDarkMode()) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};
