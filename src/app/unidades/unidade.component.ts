import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { LinksService } from '../services/links.service';
import { SiteConfigService, UnidadeConfig } from '../services/site-config.service';

@Component({
  selector: 'app-unidade',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss']
})
export class UnidadeComponent implements OnInit, OnDestroy {
  unidade!: UnidadeConfig;
  private currentCidade = 'barreiras';
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    public linksService: LinksService,
    public configService: SiteConfigService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentCidade = (params.get('cidade') || 'barreiras').toLowerCase();
      this.carregarUnidade();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    this.sub = this.configService.config$.subscribe(() => {
      this.carregarUnidade();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private carregarUnidade(): void {
    const unidades = this.configService.config.unidades;
    if (this.currentCidade.includes('lem') || this.currentCidade.includes('luis') || this.currentCidade.includes('eduardo')) {
      this.unidade = unidades['lem'];
    } else {
      this.unidade = unidades['barreiras'];
    }
  }

  openMaps(): void {
    window.open(this.unidade.mapsUrl, '_blank', 'noopener,noreferrer');
  }

  openWhatsApp(): void {
    const text = `Olá! Gostaria de falar com o escritório de *${this.unidade.nomeCidade}* do Felisberto Despachante.`;
    window.open(`https://wa.me/${this.unidade.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  onImgError(event: Event): void {
    const target = event.target as HTMLElement;
    if (target && target.parentElement) {
      target.parentElement.style.display = 'none';
    }
  }
}

