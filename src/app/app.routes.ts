import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./features/cadastro/cadastro.component').then((m) => m.CadastroComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent)
  },
  {
    path: 'alertas/novo',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/alerta-form/alerta-form.component').then((m) => m.AlertaFormComponent)
  },
  {
    path: 'matriz',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/matriz-triagem/matriz-triagem.component').then(
        (m) => m.MatrizTriagemComponent
      )
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin.component').then((m) => m.AdminComponent)
  },
  { path: '**', redirectTo: 'home' }
];
