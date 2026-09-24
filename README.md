# VitalDesk — scaffold Angular (TCC Front-End)

Base funcional em Angular standalone (v17) com os 3 pilares do projeto,
autenticação mockada com `CanActivate`, carrossel interativo, banner LGPD
e dados 100% locais (sem API externa).

## Como usar

**Opção recomendada** — gera um projeto Angular oficial e recebe estes arquivos por cima:

```bash
npm install -g @angular/cli
ng new vitaldesk --standalone --style=scss --routing=false --skip-tests
cd vitaldesk
# apague o conteúdo padrão de src/app e src/styles.scss
# copie o conteúdo desta pasta (src/, angular.json, package.json) por cima
npm install
ng serve
```

**Opção direta** — usar este scaffold como projeto raiz:

```bash
cd vitaldesk-tcc
npm install
npm start
```

Login de demonstração (funcionário): `ana.enfermagem@vitaldesk.com` / senha `123456`.
Login de demonstração (administrador): `admin@vitaldesk.com` / senha `admin123`.

## O que já está pronto

- `core/guards/auth.guard.ts` — `CanActivateFn` protegendo `/dashboard`, `/matriz` e `/alertas/novo`.
- `core/services/auth.service.ts` — login, cadastro e sessão (mock, via `sessionStorage`).
- `core/services/alerta.service.ts` — CRUD de alertas em memória, com `signal`/`computed` para o dashboard e a matriz reagirem automaticamente.
- `core/models/alerta.model.ts` — regras de negócio da triagem por risco (`REGRAS_RISCO`, o diferencial do projeto).
- `shared/carousel` — carrossel interativo com autoplay pausável, usado na Home.
- `shared/lgpd-banner` — banner de consentimento de cookies/privacidade.
- `features/home` — landing com carrossel e explicação dos 3 pilares.
- `features/login` e `features/cadastro` — telas de autenticação, cadastro com checkbox de consentimento LGPD obrigatório.
- `features/dashboard` — Pilar 1 (painel de prontidão).
- `features/alerta-form` — Pilar 2 (formulário rápido de alerta).
- `features/matriz-triagem` — Pilar 3 (fila ordenada por risco, com ações de avançar status).
- `assets/mock/*.ts` — usuários, alertas e destaques do carrossel, todos mockados.

## Próximos passos sugeridos

1. Trocar os dados mockados de `assets/mock` por conteúdo real do seu hospital fictício/estudo de caso.
2. Adicionar validação de formulário mais robusta com `ReactiveFormsModule` se o professor exigir.
3. Publicar no Vercel: `vercel --prod` na raiz do projeto (Vercel detecta Angular automaticamente pelo `angular.json`).
4. Se quiser persistência entre sessões (não exigida pelo TCC), trocar `sessionStorage`/memória por `localStorage`.
