import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'vd-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = signal<string | null>(null);

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  entrar(): void {
    this.erro.set(null);
    const sucesso = this.auth.login(this.email, this.senha);

    if (!sucesso) {
      this.erro.set('E-mail ou senha inválidos.');
      return;
    }

    const destinoPadrao = this.auth.ehAdmin() ? '/admin' : '/dashboard';
    const destino = this.route.snapshot.queryParamMap.get('redirectTo') ?? destinoPadrao;
    this.router.navigateByUrl(destino);
  }
}
