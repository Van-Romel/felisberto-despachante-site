import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FloatingWhatsappComponent } from './shared/floating-whatsapp/floating-whatsapp.component';
import { AvisoFeriadoComponent } from './shared/aviso-feriado/aviso-feriado.component';
import { SiteConfigService, TipoTema } from './services/site-config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FloatingWhatsappComponent,
    AvisoFeriadoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'felisberto-despachante';
  temaAtivo: TipoTema = 'padrao';

  constructor(public configService: SiteConfigService) {}

  ngOnInit(): void {
    this.atualizarTema();
    this.configService.config$.subscribe(() => {
      this.atualizarTema();
    });
  }

  private atualizarTema(): void {
    this.temaAtivo = this.configService.getTemaAtivo();
  }
}

