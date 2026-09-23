import { Alerta } from '../../app/core/models/alerta.model';

const agora = Date.now();
const minutosAtras = (min: number) => new Date(agora - min * 60_000).toISOString();

export const ALERTAS_MOCK: Alerta[] = [
  {
    id: 'a1',
    setor: 'UTI Adulto',
    leito: 'Leito 04',
    categoriaEquipamento: 'Respirador',
    descricao: 'Respirador com alarme de baixa pressão intermitente.',
    nivelRisco: 'VITAL',
    status: 'ABERTO',
    slaMinutos: 30,
    criadoEm: minutosAtras(12),
    responsavel: null,
    historico: [{ data: minutosAtras(12), autor: 'Ana Souza', acao: 'Alerta aberto' }]
  },
  {
    id: 'a2',
    setor: 'Pronto-Socorro',
    leito: null,
    categoriaEquipamento: 'Prontuário Eletrônico',
    descricao: 'Sistema de prontuário eletrônico fora do ar em 3 terminais.',
    nivelRisco: 'PARALISACAO',
    status: 'EM_ATENDIMENTO',
    slaMinutos: 120,
    criadoEm: minutosAtras(45),
    responsavel: 'Carlos Lima',
    historico: [
      { data: minutosAtras(45), autor: 'Ana Souza', acao: 'Alerta aberto' },
      { data: minutosAtras(30), autor: 'Carlos Lima', acao: 'Status alterado para EM_ATENDIMENTO' }
    ]
  },
  {
    id: 'a3',
    setor: 'Centro Cirúrgico',
    leito: 'Sala 02',
    categoriaEquipamento: 'Monitor Multiparamétrico',
    descricao: 'Monitor não exibe saturação de oxigênio corretamente.',
    nivelRisco: 'VITAL',
    status: 'ABERTO',
    slaMinutos: 30,
    criadoEm: minutosAtras(3),
    responsavel: null,
    historico: [{ data: minutosAtras(3), autor: 'Ana Souza', acao: 'Alerta aberto' }]
  },
  {
    id: 'a4',
    setor: 'Recepção Principal',
    leito: null,
    categoriaEquipamento: 'Ar-condicionado',
    descricao: 'Ar-condicionado da recepção sem climatizar.',
    nivelRisco: 'SUPORTE',
    status: 'ABERTO',
    slaMinutos: 1440,
    criadoEm: minutosAtras(200),
    responsavel: null,
    historico: [{ data: minutosAtras(200), autor: 'Carlos Lima', acao: 'Alerta aberto' }]
  },
  {
    id: 'a5',
    setor: 'Radiologia',
    leito: null,
    categoriaEquipamento: 'Tomógrafo',
    descricao: 'Tomógrafo apresentando erro de calibração.',
    nivelRisco: 'PARALISACAO',
    status: 'RESOLVIDO',
    slaMinutos: 120,
    criadoEm: minutosAtras(600),
    responsavel: 'Carlos Lima',
    historico: [
      { data: minutosAtras(600), autor: 'Ana Souza', acao: 'Alerta aberto' },
      { data: minutosAtras(480), autor: 'Carlos Lima', acao: 'Status alterado para EM_ATENDIMENTO' },
      { data: minutosAtras(420), autor: 'Carlos Lima', acao: 'Status alterado para RESOLVIDO' }
    ]
  }
];
