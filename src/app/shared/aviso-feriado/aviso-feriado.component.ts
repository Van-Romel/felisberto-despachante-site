import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SiteConfigService, AvisoFeriado } from '../../services/site-config.service';

@Component({
  selector: 'app-aviso-feriado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aviso-feriado.component.html',
  styleUrls: ['./aviso-feriado.component.scss']
})
export class AvisoFeriadoComponent implements OnInit, OnDestroy {
  avisosAtivos: AvisoFeriado[] = [];
  dismissedIds = new Set<string>();
  private sub?: Subscription;

  constructor(public configService: SiteConfigService) {}

  ngOnInit(): void {
    // Carrega avisos já dispensados nesta sessão
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        const dismissed = sessionStorage.getItem('felisberto_dismissed_avisos');
        if (dismissed) {
          const list: string[] = JSON.parse(dismissed);
          list.forEach(id => this.dismissedIds.add(id));
        }
      } catch (e) {
        console.warn('Erro ao carregar avisos dispensados:', e);
      }
    }

    this.atualizarAvisos();
    this.sub = this.configService.config$.subscribe(() => {
      this.atualizarAvisos();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  atualizarAvisos(): void {
    const todosAtivos = this.configService.getAvisosAtivos();
    this.avisosAtivos = todosAtivos.filter(a => !this.dismissedIds.has(a.id));
  }

  fecharAviso(id: string): void {
    this.dismissedIds.add(id);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.setItem('felisberto_dismissed_avisos', JSON.stringify(Array.from(this.dismissedIds)));
      } catch (e) {
        console.warn('Erro ao salvar aviso dispensado:', e);
      }
    }
    this.atualizarAvisos();
  }

  formatarData(dataStr: string): string {
    if (!dataStr) return '';
    const partes = dataStr.split('-');
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataStr;
  }

  abrirWhatsAppPlantao(): void {
    const msg = 'Olá! Vi o comunicado de recesso no site e gostaria de orientação com o atendimento de plantão.';
    window.open(`https://wa.me/5577999378918?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  }
}
