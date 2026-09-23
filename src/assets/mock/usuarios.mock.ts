import { Usuario } from '../../app/core/models/usuario.model';

// Usuário de demonstração para a apresentação do TCC:
// login: ana.enfermagem@vitaldesk.com | senha: 123456
export const USUARIOS_MOCK: Usuario[] = [
  {
    id: 'u1',
    nome: 'Ana Souza',
    email: 'ana.enfermagem@vitaldesk.com',
    senha: '123456',
    tipo: 'ENFERMAGEM',
    estabelecimento: 'Hospital Santa Vida — Salvador/BA',
    aceitouLgpd: true
  },
  {
    id: 'u2',
    nome: 'Carlos Lima',
    email: 'carlos.ti@vitaldesk.com',
    senha: '123456',
    tipo: 'TI_HOSPITALAR',
    estabelecimento: 'Hospital Santa Vida — Salvador/BA',
    aceitouLgpd: true
  },
  {
    // Login do dono/administrador da plataforma VitalDesk.
    // login: dono@vitaldesk.com | senha: admin123
    id: 'u3',
    nome: 'Gustavo (Administrador)',
    email: 'dono@vitaldesk.com',
    senha: 'admin123',
    tipo: 'ADMIN',
    estabelecimento: 'VitalDesk — Plataforma',
    aceitouLgpd: true
  }
];
