import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TipoUsuario } from '../../core/models/usuario.model';

@Component({
  selector: 'vd-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  tipo: TipoUsuario = 'ENFERMAGEM';
  estabelecimento = '';
  aceitouLgpd = false;

  erro = signal<string | null>(null);

  tiposDisponiveis: { valor: TipoUsuario; label: string }[] = [
    { valor: 'ENFERMAGEM', label: 'Enfermagem' },
    { valor: 'MEDICO', label: 'Médico(a)' },
    { valor: 'ENGENHARIA_CLINICA', label: 'Engenharia Clínica' },
    { valor: 'TI_HOSPITALAR', label: 'TI Hospitalar' },
    { valor: 'ADMIN', label: 'Administração' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  cadastrar(): void {
    this.erro.set(null);

    if (!this.aceitouLgpd) {
      this.erro.set('É necessário aceitar o termo de conformidade com a LGPD para continuar.');
      return;
    }

    this.auth.cadastrar({
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipo: this.tipo,
      estabelecimento: this.estabelecimento,
      aceitouLgpd: this.aceitouLgpd
    });

    this.router.navigateByUrl('/dashboard');
  }
}
