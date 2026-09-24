import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Protege a área do administrador da plataforma.
 * Exige login E que o usuário seja do tipo ADMIN — um funcionário
 * comum autenticado ainda assim é redirecionado para o dashboard normal.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.estaAutenticado()) {
    return router.createUrlTree(['/login'], { queryParams: { redirectTo: state.url } });
  }

  if (!authService.ehAdmin()) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
