import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DepoimentoItem {
  autor: string;
  local: string;
  texto: string;
  avaliacao: number;
  servico: string;
}

@Component({
  selector: 'app-section-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-four.component.html',
  styleUrls: ['./section-four.component.scss']
})
export class SectionFourComponent {
  googleReviewUrl = 'https://share.google/ndfODTdZOcYiiFGpX';
  instagramUrl = 'https://www.instagram.com/felisberto_despachante/';

  depoimentos: DepoimentoItem[] = [
    {
      autor: 'Lucas M.',
      local: 'Cliente em Barreiras / BA',
      texto: 'Atendimento excelente! Transferência do meu veículo resolvida com muita agilidade e sem nenhuma burocracia.',
      avaliacao: 5,
      servico: 'Transferência de Veículo'
    },
    {
      autor: 'Carla S.',
      local: 'Cliente em Luís Eduardo Magalhães / BA',
      texto: 'Super recomendo o Felisberto Despachante. Resolveram o parcelamento do IPVA e a segunda via do documento muito rápido.',
      avaliacao: 5,
      servico: 'Licenciamento & Débitos'
    },
    {
      autor: 'Marcos A.',
      local: 'Frotista / Região Oeste',
      texto: 'Sempre confio os emplacamentos e processos da frota ao Felisberto. Pontualidade, seriedade e honestidade nas taxas.',
      avaliacao: 5,
      servico: '1º Emplacamento & Frotas'
    }
  ];

  openGoogleReviews(): void {
    window.open(this.googleReviewUrl, '_blank', 'noopener,noreferrer');
  }

  openInstagram(): void {
    window.open(this.instagramUrl, '_blank', 'noopener,noreferrer');
  }
}
