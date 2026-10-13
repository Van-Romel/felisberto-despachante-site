import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService } from '../../services/links.service';

export interface LicenciamentoItem {
  final: string;
  cotas: string[];
  cotaUnica20: string;
  cotaUnica10: string;
  cotaUnicaSemDesconto: string;
}

@Component({
  selector: 'app-section-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-two.component.html',
  styleUrls: ['./section-two.component.scss']
})
export class SectionTwoComponent {
  selectedFinal = '1';
  showFullTable = false;
  activeTableTab: 'parcelamento' | 'cota-unica' = 'parcelamento';

  calendario: LicenciamentoItem[] = [
    { final: '1', cotas: ['27/03', '29/04', '28/05', '27/06', '30/07'], cotaUnica20: '07/02', cotaUnica10: '27/03', cotaUnicaSemDesconto: '30/07' },
    { final: '2', cotas: ['28/03', '30/04', '29/05', '28/06', '31/07'], cotaUnica20: '07/02', cotaUnica10: '28/03', cotaUnicaSemDesconto: '31/07' },
    { final: '3', cotas: ['29/04', '28/05', '27/06', '30/07', '29/08'], cotaUnica20: '07/02', cotaUnica10: '29/04', cotaUnicaSemDesconto: '29/08' },
    { final: '4', cotas: ['30/04', '29/05', '28/06', '31/07', '30/08'], cotaUnica20: '07/02', cotaUnica10: '30/04', cotaUnicaSemDesconto: '30/08' },
    { final: '5', cotas: ['28/05', '27/06', '30/07', '29/08', '27/09'], cotaUnica20: '07/02', cotaUnica10: '28/05', cotaUnicaSemDesconto: '27/09' },
    { final: '6', cotas: ['29/05', '28/06', '31/07', '30/08', '30/09'], cotaUnica20: '07/02', cotaUnica10: '29/05', cotaUnicaSemDesconto: '30/09' },
    { final: '7', cotas: ['27/06', '30/07', '29/08', '27/09', '30/10'], cotaUnica20: '07/02', cotaUnica10: '27/06', cotaUnicaSemDesconto: '30/10' },
    { final: '8', cotas: ['28/06', '31/07', '30/08', '30/09', '31/10'], cotaUnica20: '07/02', cotaUnica10: '28/06', cotaUnicaSemDesconto: '31/10' },
    { final: '9', cotas: ['30/07', '29/08', '27/09', '30/10', '28/11'], cotaUnica20: '07/02', cotaUnica10: '30/07', cotaUnicaSemDesconto: '28/11' },
    { final: '0', cotas: ['31/07', '30/08', '30/09', '31/10', '29/11'], cotaUnica20: '07/02', cotaUnica10: '31/07', cotaUnicaSemDesconto: '29/11' }
  ];

  constructor(private linksService: LinksService) {}

  get currentItem(): LicenciamentoItem {
    return this.calendario.find(i => i.final === this.selectedFinal) || this.calendario[0];
  }

  selectFinal(digit: string): void {
    this.selectedFinal = digit;
  }

  toggleFullTable(): void {
    this.showFullTable = !this.showFullTable;
  }

  setTableTab(tab: 'parcelamento' | 'cota-unica'): void {
    this.activeTableTab = tab;
  }

  consultarNoWhatsapp(): void {
    this.linksService.openWhatsAppWithPlate(this.selectedFinal);
  }
}
