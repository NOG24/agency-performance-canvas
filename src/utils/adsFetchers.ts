
// Funções de simulação para obtenção de dados de plataformas de anúncios

interface PlataformaDados {
  plataforma: string;
  leads: number;
  custoTotal: number;
  cpl: string;
  cliques: number;
  impressoes: number;
  ctr: string;
  conversoes: number;
  receita: number;
  campanhasAtivas: number;
  dadosDiarios: DadoDiario[];
}

interface DadoDiario {
  data: Date;
  leads: number;
  custoTotal: number;
  cpl: string;
  ctr: string;
  conversoes: number;
  receita: number;
}

interface DadosConsolidados {
  totalLeads: number;
  totalCusto: number;
  cplMedio: string;
  ctrMedio: string;
  totalConversoes: number;
  totalReceita: number;
  totalCampanhasAtivas: number;
  googleAds: PlataformaDados;
  facebookAds: PlataformaDados;
  tiktokAds: PlataformaDados;
  dadosDiarios: {
    data: Date;
    leads: number;
    custoTotal: number;
    receita: number;
  }[];
  plataformas: PlataformaDados[];
}

/**
 * Simula a obtenção de dados do Google Ads
 * @param periodo Período em dias para obter os dados
 * @returns Dados simulados do Google Ads
 */
export const fetchDadosGoogleAds = (periodo: number): Promise<PlataformaDados> => {
  return new Promise((resolve) => {
    // Simulando tempo de carregamento
    setTimeout(() => {
      const leads = Math.floor(Math.random() * 150) + 80;
      const custoTotal = (Math.random() * 3000) + 1500;
      const cliques = Math.floor(Math.random() * 2000) + 1000;
      const impressoes = cliques * (Math.floor(Math.random() * 10) + 5);
      const ctr = (cliques / impressoes) * 100;
      const cpl = custoTotal / leads;
      const conversoes = Math.floor(leads * 0.2);
      const receita = conversoes * ((Math.random() * 500) + 300);
      
      // Gerar dados diários para o período
      const dadosDiarios = Array.from({ length: periodo }, (_, i) => {
        const data = new Date();
        data.setDate(data.getDate() - (periodo - i - 1));
        
        return {
          data: data,
          leads: Math.floor(Math.random() * 10) + 1,
          custoTotal: (Math.random() * 100) + 50,
          cpl: ((Math.random() * 20) + 10).toFixed(2),
          ctr: ((Math.random() * 5) + 1).toFixed(2),
          conversoes: Math.floor(Math.random() * 3),
          receita: Math.floor((Math.random() * 300) + 100)
        };
      });
      
      resolve({
        plataforma: 'Google Ads',
        leads,
        custoTotal,
        cpl: cpl.toFixed(2),
        cliques,
        impressoes,
        ctr: ctr.toFixed(2),
        conversoes,
        receita,
        campanhasAtivas: Math.floor(Math.random() * 5) + 2,
        dadosDiarios
      });
    }, 800);
  });
};

/**
 * Simula a obtenção de dados do Facebook Ads
 * @param periodo Período em dias para obter os dados
 * @returns Dados simulados do Facebook Ads
 */
export const fetchDadosFacebookAds = (periodo: number): Promise<PlataformaDados> => {
  return new Promise((resolve) => {
    // Simulando tempo de carregamento
    setTimeout(() => {
      const leads = Math.floor(Math.random() * 200) + 120;
      const custoTotal = (Math.random() * 2500) + 1200;
      const cliques = Math.floor(Math.random() * 3000) + 1500;
      const impressoes = cliques * (Math.floor(Math.random() * 8) + 4);
      const ctr = (cliques / impressoes) * 100;
      const cpl = custoTotal / leads;
      const conversoes = Math.floor(leads * 0.15);
      const receita = conversoes * ((Math.random() * 400) + 250);
      
      // Gerar dados diários para o período
      const dadosDiarios = Array.from({ length: periodo }, (_, i) => {
        const data = new Date();
        data.setDate(data.getDate() - (periodo - i - 1));
        
        return {
          data: data,
          leads: Math.floor(Math.random() * 12) + 2,
          custoTotal: (Math.random() * 80) + 40,
          cpl: ((Math.random() * 15) + 8).toFixed(2),
          ctr: ((Math.random() * 6) + 2).toFixed(2),
          conversoes: Math.floor(Math.random() * 4),
          receita: Math.floor((Math.random() * 350) + 150)
        };
      });
      
      resolve({
        plataforma: 'Facebook Ads',
        leads,
        custoTotal,
        cpl: cpl.toFixed(2),
        cliques,
        impressoes,
        ctr: ctr.toFixed(2),
        conversoes,
        receita,
        campanhasAtivas: Math.floor(Math.random() * 4) + 3,
        dadosDiarios
      });
    }, 1000);
  });
};

/**
 * Simula a obtenção de dados do TikTok Ads
 * @param periodo Período em dias para obter os dados
 * @returns Dados simulados do TikTok Ads
 */
export const fetchDadosTikTokAds = (periodo: number): Promise<PlataformaDados> => {
  return new Promise((resolve, reject) => {
    // Simulando tempo de carregamento
    setTimeout(() => {
      // Simular falha ocasional na API (1 em cada 5 vezes)
      if (Math.random() > 0.8) {
        reject(new Error("Erro ao conectar com a API do TikTok Ads"));
        return;
      }
      
      const leads = Math.floor(Math.random() * 100) + 40;
      const custoTotal = (Math.random() * 1800) + 800;
      const cliques = Math.floor(Math.random() * 2500) + 1000;
      const impressoes = cliques * (Math.floor(Math.random() * 12) + 6);
      const ctr = (cliques / impressoes) * 100;
      const cpl = custoTotal / leads;
      const conversoes = Math.floor(leads * 0.1);
      const receita = conversoes * ((Math.random() * 350) + 200);
      
      // Gerar dados diários para o período
      const dadosDiarios = Array.from({ length: periodo }, (_, i) => {
        const data = new Date();
        data.setDate(data.getDate() - (periodo - i - 1));
        
        return {
          data: data,
          leads: Math.floor(Math.random() * 8) + 1,
          custoTotal: (Math.random() * 60) + 30,
          cpl: ((Math.random() * 25) + 12).toFixed(2),
          ctr: ((Math.random() * 4) + 0.5).toFixed(2),
          conversoes: Math.floor(Math.random() * 2),
          receita: Math.floor((Math.random() * 250) + 80)
        };
      });
      
      resolve({
        plataforma: 'TikTok Ads',
        leads,
        custoTotal,
        cpl: cpl.toFixed(2),
        cliques,
        impressoes,
        ctr: ctr.toFixed(2),
        conversoes,
        receita,
        campanhasAtivas: Math.floor(Math.random() * 3) + 1,
        dadosDiarios
      });
    }, 1200);
  });
};

/**
 * Consolida todos os dados de diferentes plataformas
 * @param periodo Período em dias para obter os dados
 * @returns Dados consolidados de todas as plataformas
 */
export const fetchDadosConsolidados = async (periodo: number): Promise<DadosConsolidados> => {
  try {
    const [googleAds, facebookAds, tiktokAds] = await Promise.all([
      fetchDadosGoogleAds(periodo),
      fetchDadosFacebookAds(periodo),
      fetchDadosTikTokAds(periodo).catch(() => ({
        plataforma: 'TikTok Ads',
        leads: 0,
        custoTotal: 0,
        cpl: '0',
        cliques: 0,
        impressoes: 0,
        ctr: '0',
        conversoes: 0,
        receita: 0,
        campanhasAtivas: 0,
        dadosDiarios: []
      }) as PlataformaDados)
    ]);

    // Consolidar dados totais
    const totalLeads = googleAds.leads + facebookAds.leads + tiktokAds.leads;
    const totalCusto = googleAds.custoTotal + facebookAds.custoTotal + tiktokAds.custoTotal;
    const totalConversoes = googleAds.conversoes + facebookAds.conversoes + tiktokAds.conversoes;
    const totalReceita = googleAds.receita + facebookAds.receita + tiktokAds.receita;
    const totalCampanhasAtivas = googleAds.campanhasAtivas + facebookAds.campanhasAtivas + tiktokAds.campanhasAtivas;
    
    // Consolidar CTR médio ponderado pelo número de impressões
    const totalImpressoes = googleAds.impressoes + facebookAds.impressoes + tiktokAds.impressoes;
    const totalCliques = googleAds.cliques + facebookAds.cliques + tiktokAds.cliques;
    const ctrMedio = (totalCliques / totalImpressoes) * 100;

    // Consolidar CPL médio
    const cplMedio = totalCusto / totalLeads;
    
    // Consolidar dados diários
    const dadosDiarios = Array.from({ length: periodo }, (_, i) => {
      const data = new Date();
      data.setDate(data.getDate() - (periodo - i - 1));
      
      const googleDia = googleAds.dadosDiarios[i];
      const facebookDia = facebookAds.dadosDiarios[i];
      const tiktokDia = tiktokAds.dadosDiarios[i] || { leads: 0, custoTotal: 0, receita: 0 };

      return {
        data: data,
        leads: googleDia.leads + facebookDia.leads + tiktokDia.leads,
        custoTotal: googleDia.custoTotal + facebookDia.custoTotal + tiktokDia.custoTotal,
        receita: googleDia.receita + facebookDia.receita + tiktokDia.receita
      };
    });
    
    return {
      totalLeads,
      totalCusto,
      cplMedio: cplMedio.toFixed(2),
      ctrMedio: ctrMedio.toFixed(2),
      totalConversoes,
      totalReceita,
      totalCampanhasAtivas,
      googleAds,
      facebookAds,
      tiktokAds,
      dadosDiarios,
      plataformas: [googleAds, facebookAds, tiktokAds]
    };
  } catch (error) {
    console.error("Erro ao obter dados consolidados:", error);
    throw error;
  }
};
