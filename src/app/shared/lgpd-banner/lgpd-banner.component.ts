import { Component, signal } from '@angular/core';

const CHAVE_CONSENTIMENTO = 'vitaldesk_lgpd_consentimento';

/**
 * Banner de consentimento de cookies / privacidade, exigido pelo
 * requisito de conformidade LGPD do projeto. Guarda a escolha do
 * usuário em localStorage para não reaparecer a cada navegação.
 */
@Component({
  selector: 'vd-lgpd-banner',
  standalone: true,
  templateUrl: './lgpd-banner.component.html',
  styleUrl: './lgpd-banner.component.scss'
})
export class LgpdBannerComponent {
  visivel = signal(this.deveExibir());

  aceitar(): void {
    localStorage.setItem(CHAVE_CONSENTIMENTO, 'aceito');
    this.visivel.set(false);
  }

  recusarOpcionais(): void {
    localStorage.setItem(CHAVE_CONSENTIMENTO, 'apenas-essenciais');
    this.visivel.set(false);
  }

  private deveExibir(): boolean {
    return localStorage.getItem(CHAVE_CONSENTIMENTO) === null;
  }
}
