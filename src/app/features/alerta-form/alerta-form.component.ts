import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertaService } from '../../core/services/alerta.service';
import { AuthService } from '../../core/services/auth.service';
import { NivelRisco, REGRAS_RISCO } from '../../core/models/alerta.model';

@Component({
  selector: 'vd-alerta-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alerta-form.component.html',
  styleUrl: './alerta-form.component.scss'
})
export class AlertaFormComponent {
  regras = REGRAS_RISCO;
  niveis: NivelRisco[] = ['VITAL', 'PARALISACAO', 'SUPORTE'];

  setor = '';
  leito = '';
  categoriaEquipamento = '';
  descricao = '';
  nivelRisco: NivelRisco = 'VITAL';
  confirmaLgpd = false;

  enviado = signal(false);
  erro = signal<string | null>(null);

  constructor(
    private alertaService: AlertaService,
    private auth: AuthService,
    private router: Router
  ) {}

  enviar(): void {
    this.erro.set(null);

    if (!this.confirmaLgpd) {
      this.erro.set('Confirme que os dados de leito/paciente foram informados em conformidade com a LGPD.');
      return;
    }

    const autor = this.auth.usuarioAtual()?.nome ?? 'Usuário';

    this.alertaService.criarAlerta({
      setor: this.setor,
      leito: this.leito.trim() ? this.leito : null,
      categoriaEquipamento: this.categoriaEquipamento,
      descricao: this.descricao,
      nivelRisco: this.nivelRisco,
      autor
    });

    this.enviado.set(true);
    setTimeout(() => this.router.navigateByUrl('/matriz'), 1200);
  }
}
