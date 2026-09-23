import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { AlertaService } from '../../core/services/alerta.service';
import { REGRAS_RISCO } from '../../core/models/alerta.model';

/**
 * Painel do dono/administrador da plataforma VitalDesk.
 * Visão consolidada de todos os estabelecimentos, usuários e alertas
 * cadastrados — diferente do dashboard operacional de cada hospital.
 */
@Component({
  selector: 'vd-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  regras = REGRAS_RISCO;

  constructor(public auth: AuthService, public alertaService: AlertaService) {}

  get usuarios() {
    return this.auth.listarUsuarios();
  }

  get estabelecimentos() {
    return this.auth.listarEstabelecimentos();
  }

  usuariosPorEstabelecimento(estabelecimento: string) {
    return this.usuarios.filter((u) => u.estabelecimento === estabelecimento);
  }
}
