import { Component, Input, signal, computed, OnDestroy, OnInit } from '@angular/core';
import { Destaque } from '../../../assets/mock/destaques.mock';

/**
 * Carrossel interativo genérico (usado na Home para exibir os
 * destaques/indicadores). Autoplay pausável e navegação manual —
 * cumpre o requisito de "Interatividade UI" do TCC.
 */
@Component({
  selector: 'vd-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input({ required: true }) itens: Destaque[] = [];
  @Input() autoplayMs = 6000;

  indiceAtual = signal(0);
  pausado = signal(false);
  private timer?: ReturnType<typeof setInterval>;

  itemAtual = computed(() => this.itens[this.indiceAtual()]);

  ngOnInit(): void {
    this.iniciarAutoplay();
  }

  ngOnDestroy(): void {
    this.pararAutoplay();
  }

  irPara(indice: number): void {
    this.indiceAtual.set(indice);
  }

  anterior(): void {
    const total = this.itens.length;
    this.indiceAtual.update((i) => (i - 1 + total) % total);
  }

  proximo(): void {
    const total = this.itens.length;
    this.indiceAtual.update((i) => (i + 1) % total);
  }

  alternarPausa(): void {
    this.pausado.update((v) => !v);
    this.pausado() ? this.pararAutoplay() : this.iniciarAutoplay();
  }

  private iniciarAutoplay(): void {
    this.pararAutoplay();
    this.timer = setInterval(() => {
      if (!this.pausado()) this.proximo();
    }, this.autoplayMs);
  }

  private pararAutoplay(): void {
    if (this.timer) clearInterval(this.timer);
  }
}
