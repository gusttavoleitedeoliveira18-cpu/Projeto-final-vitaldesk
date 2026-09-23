export type TipoUsuario = 'ENFERMAGEM' | 'MEDICO' | 'ENGENHARIA_CLINICA' | 'TI_HOSPITALAR' | 'ADMIN';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha: string; // apenas para simulação local (mock) — nunca fazer isso em produção
  tipo: TipoUsuario;
  estabelecimento: string;
  aceitouLgpd: boolean;
}
