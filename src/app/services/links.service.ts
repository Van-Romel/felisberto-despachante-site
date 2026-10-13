import { Injectable } from '@angular/core';

export type UnidadeDespachante = 'barreiras' | 'lem' | 'geral';

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  public readonly numeroBarreiras = '5577999965588';
  public readonly numeroLEM = '5577998009877';
  public readonly numeroGeral = '5577999378918';

  public readonly instagramUrl = 'https://www.instagram.com/felisberto_despachante/';

  public openWhatsApp(unidade: UnidadeDespachante = 'geral', customMessage?: string, serviceName?: string): void {
    let number = this.numeroGeral;
    let localTexto = '';

    if (unidade === 'barreiras') {
      number = this.numeroBarreiras;
      localTexto = ' de Barreiras';
    } else if (unidade === 'lem') {
      number = this.numeroLEM;
      localTexto = ' de Luís Eduardo Magalhães';
    }

    let text = customMessage || `Olá! Vim pelo site do Felisberto Despachante${localTexto} e gostaria de regularizar meu veículo. Felisberto Resolve!`;

    if (serviceName) {
      text = `Olá! Vim pelo site do Felisberto Despachante${localTexto} e gostaria de informações e orçamento sobre: *${serviceName}*.`;
    }

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${number}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  }

  public openWhatsAppWithPlate(plateFinal: string, unidade: UnidadeDespachante = 'geral'): void {
    let number = this.numeroGeral;
    if (unidade === 'barreiras') number = this.numeroBarreiras;
    if (unidade === 'lem') number = this.numeroLEM;

    const text = `Olá! Vim pelo site do Felisberto Despachante e gostaria de consultar/parcelar o licenciamento do meu veículo (Placa Final *${plateFinal}*).`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }

  public openInstagram(): void {
    window.open(this.instagramUrl, '_blank', 'noopener,noreferrer');
  }
}
