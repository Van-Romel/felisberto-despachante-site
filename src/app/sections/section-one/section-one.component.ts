import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LinksService, UnidadeDespachante } from '../../services/links.service';

@Component({
  selector: 'app-section-one',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './section-one.component.html',
  styleUrls: ['./section-one.component.scss']
})
export class SectionOneComponent {
  constructor(public linksService: LinksService) {}

  openWhatsapp(unidade: UnidadeDespachante = 'geral'): void {
    this.linksService.openWhatsApp(unidade, 'Olá! Vim pelo site do Felisberto Despachante e preciso de atendimento para o meu veículo.');
  }

  scrollToLicenciamento(): void {
    const el = document.getElementById('licenciamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
