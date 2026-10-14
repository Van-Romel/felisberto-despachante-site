import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-section-three',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-three.component.html',
  styleUrls: ['./section-three.component.scss']
})
export class SectionThreeComponent {
  constructor(public linksService: LinksService) {}

  openWhatsapp(unidade: 'barreiras' | 'lem' = 'barreiras'): void {
    const msg = 'Olá! Gostaria de falar sobre a documentação do meu veículo com o Felisberto Despachante.';
    this.linksService.openWhatsApp(unidade, msg);
  }
}
