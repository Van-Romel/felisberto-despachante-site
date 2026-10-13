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
  constructor(private linksService: LinksService) {}

  openWhatsapp(): void {
    this.linksService.openWhatsApp('geral', 'Olá! Gostaria de conhecer melhor os serviços do Felisberto Despachante. Felisberto Resolve!');
  }
}
