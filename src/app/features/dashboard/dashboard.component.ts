import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertaService } from '../../core/services/alerta.service';
import { REGRAS_RISCO } from '../../core/models/alerta.model';

@Component({
  selector: 'vd-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  regras = REGRAS_RISCO;

  constructor(public alertaService: AlertaService) {}

  minutosRestantes(id: string): number {
    const alerta = this.alertaService.alertas().find((a) => a.id === id);
    return alerta ? this.alertaService.minutosRestantes(alerta) : 0;
  }
}
