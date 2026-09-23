import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { USUARIOS_MOCK } from '../../../assets/mock/usuarios.mock';

const CHAVE_SESSAO = 'vitaldesk_sessao';

/**
 * Serviço de autenticação 100% local (mock), sem API externa.
 * A "sessão" fica guardada em memória (signal) e replicada no sessionStorage
 * apenas para sobreviver a um F5 durante a apresentação do TCC.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarios: Usuario[] = [...USUARIOS_MOCK];

  private usuarioAtualSignal = signal<Usuario | null>(this.recuperarSessao());

  readonly usuarioAtual = computed(() => this.usuarioAtualSignal());
  readonly estaAutenticado = computed(() => this.usuarioAtualSignal() !== null);
  readonly ehAdmin = computed(() => this.usuarioAtualSignal()?.tipo === 'ADMIN');

  constructor(private router: Router) {}

  /** Usado apenas pelo painel administrativo (dono da plataforma). */
  listarUsuarios(): Usuario[] {
    return [...this.usuarios];
  }

  listarEstabelecimentos(): string[] {
    return [...new Set(this.usuarios.map((u) => u.estabelecimento))];
  }

  login(email: string, senha: string): boolean {
    const usuario = this.usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    );
    if (!usuario) {
      return false;
    }
    this.usuarioAtualSignal.set(usuario);
    sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
    return true;
  }

  cadastrar(novoUsuario: Omit<Usuario, 'id'>): Usuario {
    const usuario: Usuario = { ...novoUsuario, id: crypto.randomUUID() };
    this.usuarios.push(usuario);
    this.usuarioAtualSignal.set(usuario);
    sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
    return usuario;
  }

  logout(): void {
    this.usuarioAtualSignal.set(null);
    sessionStorage.removeItem(CHAVE_SESSAO);
    this.router.navigate(['/login']);
  }

  private recuperarSessao(): Usuario | null {
    const bruto = sessionStorage.getItem(CHAVE_SESSAO);
    return bruto ? (JSON.parse(bruto) as Usuario) : null;
  }
}
