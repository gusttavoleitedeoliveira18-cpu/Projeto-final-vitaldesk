import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { DESTAQUES_MOCK } from '../../../assets/mock/destaques.mock';

@Component({
  selector: 'vd-home',
  standalone: true,
  imports: [RouterLink, CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  destaques = DESTAQUES_MOCK;

  pilares = [
    {
      titulo: 'Painel de Prontidão Operacional',
      texto: 'Visão em tempo real dos alertas ativos, SLAs em contagem regressiva e leitos bloqueados por pendência técnica.'
    },
    {
      titulo: 'Protocolo Rápido de Alerta',
      texto: 'Formulário ágil para a equipe assistencial reportar falhas por setor, leito e categoria de equipamento — com consentimento LGPD.'
    },
    {
      titulo: 'Matriz de Triagem e Resolução',
      texto: 'Fila de atendimento da Engenharia Clínica e TI ordenada automaticamente pelo nível de risco ao paciente.'
    }
  ];
}
