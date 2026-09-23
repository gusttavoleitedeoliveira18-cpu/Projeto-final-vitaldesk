import { Component } from '@angular/core';
import { AlertaService } from '../../core/services/alerta.service';
import { AuthService } from '../../core/services/auth.service';
import { REGRAS_RISCO, StatusAlerta } from '../../core/models/alerta.model';

@Component({
  selector: 'vd-matriz-triagem',
  standalone: true,
  templateUrl: './matriz-triagem.component.html',
  styleUrl: './matriz-triagem.component.scss'
})
export class MatrizTriagemComponent {
  regras = REGRAS_RISCO;

  constructor(public alertaService: AlertaService, private auth: AuthService) {}

  minutosRestantes(id: string): number {
    const alerta = this.alertaService.alertas().find((a) => a.id === id);
    return alerta ? this.alertaService.minutosRestantes(alerta) : 0;
  }

  avancarStatus(id: string, atual: StatusAlerta): void {
    const autor = this.auth.usuarioAtual()?.nome ?? 'Usuário';
    const proximo: StatusAlerta = atual === 'ABERTO' ? 'EM_ATENDIMENTO' : 'RESOLVIDO';
    this.alertaService.atualizarStatus(id, proximo, autor, autor);
  }
}
