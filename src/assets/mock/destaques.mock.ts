export interface Destaque {
  id: string;
  titulo: string;
  subtitulo: string;
  categoria: 'INDICADOR' | 'AVISO' | 'CONQUISTA';
}

// Conteúdo do carrossel interativo da Home
export const DESTAQUES_MOCK: Destaque[] = [
  {
    id: 'd1',
    titulo: 'Tempo médio de resposta em risco vital: 11 minutos',
    subtitulo: 'Abaixo do SLA de 30 minutos nas últimas 4 semanas.',
    categoria: 'INDICADOR'
  },
  {
    id: 'd2',
    titulo: 'Novo protocolo LGPD entra em vigor',
    subtitulo: 'Todos os alertas com identificação de leito exigem consentimento explícito.',
    categoria: 'AVISO'
  },
  {
    id: 'd3',
    titulo: '3 hospitais parceiros integrados este mês',
    subtitulo: 'Rede VitalDesk cresce em Salvador e Região Metropolitana.',
    categoria: 'CONQUISTA'
  },
  {
    id: 'd4',
    titulo: 'Zero falhas críticas não atendidas em setembro',
    subtitulo: 'Engenharia Clínica manteve 100% de cobertura de risco vital.',
    categoria: 'CONQUISTA'
  }
];
