export type NivelRisco = 'VITAL' | 'PARALISACAO' | 'SUPORTE';
export type StatusAlerta = 'ABERTO' | 'EM_ATENDIMENTO' | 'RESOLVIDO';

export interface Alerta {
  id: string;
  setor: string;
  leito: string | null;
  categoriaEquipamento: string;
  descricao: string;
  nivelRisco: NivelRisco;
  status: StatusAlerta;
  slaMinutos: number;
  criadoEm: string; // ISO date
  responsavel: string | null;
  historico: HistoricoAlerta[];
}

export interface HistoricoAlerta {
  data: string;
  autor: string;
  acao: string;
}

// Regras de negócio da triagem por risco — o diferencial do VitalDesk
export const REGRAS_RISCO: Record<NivelRisco, { label: string; slaMinutos: number; descricao: string; ordem: number }> = {
  VITAL: {
    label: 'Risco Vital',
    slaMinutos: 30,
    ordem: 1,
    descricao: 'Falha em equipamentos de suporte à vida (respiradores, monitores de UTI, rede de oxigênio).'
  },
  PARALISACAO: {
    label: 'Risco de Paralisação',
    slaMinutos: 120,
    ordem: 2,
    descricao: 'Sistemas e equipamentos essenciais travados (prontuário eletrônico, Raio-X, Tomógrafo).'
  },
  SUPORTE: {
    label: 'Risco Suporte',
    slaMinutos: 1440,
    ordem: 3,
    descricao: 'Infraestrutura geral sem impacto direto e imediato à saúde.'
  }
};
