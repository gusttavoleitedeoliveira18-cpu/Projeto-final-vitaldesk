import { Injectable, signal, computed } from '@angular/core';
import { Alerta, NivelRisco, REGRAS_RISCO, StatusAlerta } from '../models/alerta.model';
import { ALERTAS_MOCK } from '../../../assets/mock/alertas.mock';

/**
 * Fonte única de verdade dos alertas em memória, simulando um backend.
 * Alimenta o Dashboard (Pilar 1), o Formulário (Pilar 2) e a Matriz (Pilar 3).
 */
@Injectable({ providedIn: 'root' })
export class AlertaService {
  private alertasSignal = signal<Alerta[]>(this.carregarMock());

  readonly alertas = computed(() => this.alertasSignal());

  readonly alertasOrdenadosPorRisco = computed(() =>
    [...this.alertasSignal()].sort((a, b) => {
      const ordemA = REGRAS_RISCO[a.nivelRisco].ordem;
      const ordemB = REGRAS_RISCO[b.nivelRisco].ordem;
      if (ordemA !== ordemB) return ordemA - ordemB;
      return new Date(a.criadoEm).getTime() - new Date(b.criadoEm).getTime();
    })
  );

  readonly totalAtivos = computed(
    () => this.alertasSignal().filter((a) => a.status !== 'RESOLVIDO').length
  );

  readonly totalPorRisco = computed(() => {
    const ativos = this.alertasSignal().filter((a) => a.status !== 'RESOLVIDO');
    return {
      VITAL: ativos.filter((a) => a.nivelRisco === 'VITAL').length,
      PARALISACAO: ativos.filter((a) => a.nivelRisco === 'PARALISACAO').length,
      SUPORTE: ativos.filter((a) => a.nivelRisco === 'SUPORTE').length
    };
  });

  criarAlerta(dados: {
    setor: string;
    leito: string | null;
    categoriaEquipamento: string;
    descricao: string;
    nivelRisco: NivelRisco;
    autor: string;
  }): Alerta {
    const novo: Alerta = {
      id: crypto.randomUUID(),
      setor: dados.setor,
      leito: dados.leito,
      categoriaEquipamento: dados.categoriaEquipamento,
      descricao: dados.descricao,
      nivelRisco: dados.nivelRisco,
      status: 'ABERTO',
      slaMinutos: REGRAS_RISCO[dados.nivelRisco].slaMinutos,
      criadoEm: new Date().toISOString(),
      responsavel: null,
      historico: [{ data: new Date().toISOString(), autor: dados.autor, acao: 'Alerta aberto' }]
    };
    this.alertasSignal.update((lista) => [novo, ...lista]);
    return novo;
  }

  atualizarStatus(id: string, status: StatusAlerta, autor: string, responsavel?: string): void {
    this.alertasSignal.update((lista) =>
      lista.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              responsavel: responsavel ?? a.responsavel,
              historico: [
                ...a.historico,
                { data: new Date().toISOString(), autor, acao: `Status alterado para ${status}` }
              ]
            }
          : a
      )
    );
  }

  minutosRestantes(alerta: Alerta): number {
    const criadoEm = new Date(alerta.criadoEm).getTime();
    const prazoFinal = criadoEm + alerta.slaMinutos * 60_000;
    return Math.round((prazoFinal - Date.now()) / 60_000);
  }

  private carregarMock(): Alerta[] {
    return ALERTAS_MOCK as Alerta[];
  }
}
