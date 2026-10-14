import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DepoimentoItem {
  autor: string;
  local: string;
  texto: string;
  avaliacao: number;
  servico: string;
  mapsUrl: string;
}

@Component({
  selector: 'app-section-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-four.component.html',
  styleUrls: ['./section-four.component.scss']
})
export class SectionFourComponent {
  googleBarreirasUrl = 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA';
  googleLEMUrl = 'https://maps.app.goo.gl/ohhGB2GUCxMAGtXX7';
  instagramUrl = 'https://www.instagram.com/felisberto_despachante/';

  depoimentos: DepoimentoItem[] = [
    {
      autor: 'Lucas M.',
      local: 'Barreiras / BA',
      texto: 'Atendimento impecável! Transferência do veículo concluída com rapidez e sem complicação.',
      avaliacao: 5,
      servico: 'Transferência de Veículo',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA'
    },
    {
      autor: 'Carla S.',
      local: 'Luís Eduardo Magalhães / BA',
      texto: 'Resolveram o parcelamento do IPVA e o documento digital no mesmo dia. Muito prático!',
      avaliacao: 5,
      servico: 'Licenciamento & Débitos',
      mapsUrl: 'https://maps.app.goo.gl/ohhGB2GUCxMAGtXX7'
    },
    {
      autor: 'Marcos A.',
      local: 'Frotista / Região Oeste',
      texto: 'Cuidam dos emplacamentos da nossa frota com total pontualidade e transparência.',
      avaliacao: 5,
      servico: '1º Emplacamento & Frotas',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA'
    }
  ];

  openGoogleBarreiras(): void {
    window.open(this.googleBarreirasUrl, '_blank', 'noopener,noreferrer');
  }

  openGoogleLEM(): void {
    window.open(this.googleLEMUrl, '_blank', 'noopener,noreferrer');
  }

  openInstagram(): void {
    window.open(this.instagramUrl, '_blank', 'noopener,noreferrer');
  }
}
