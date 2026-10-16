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
      autor: 'Reginaldo Moreira',
      local: 'Barreiras / BA',
      texto: 'O atendimento foi maravilhoso muito bom',
      avaliacao: 5,
      servico: 'Avaliação no Google Maps',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA'
    },
    {
      autor: 'Kauérique Torres',
      local: 'Barreiras / BA',
      texto: 'Atendimento excelente, melhor de barreiras',
      avaliacao: 5,
      servico: 'Avaliação no Google Maps',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA'
    },
    {
      autor: 'Custa Todinho',
      local: 'Barreiras / BA',
      texto: 'Gostei muito, trabalho impecável, rápido e eficiente. Atendimento excelente...super indico, sempre.',
      avaliacao: 5,
      servico: 'Local Guide no Google',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA'
    },
    {
      autor: 'Raiane Souza',
      local: 'Barreiras / BA',
      texto: 'Amei o atendimento e super recomendo maravilhoso todos os funcionários só agradecer super rápido no atendimento 100% excelente ...',
      avaliacao: 5,
      servico: 'Avaliação no Google Maps',
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
