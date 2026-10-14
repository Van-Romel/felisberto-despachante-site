import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService } from '../../services/links.service';

export interface ServicoItem {
  id: string;
  category: 'veiculos' | 'licenciamento' | 'regularizacao';
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-section-servicos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-servicos.component.html',
  styleUrls: ['./section-servicos.component.scss']
})
export class SectionServicosComponent {
  activeCategory: 'all' | 'veiculos' | 'licenciamento' | 'regularizacao' = 'all';

  servicos: ServicoItem[] = [
    {
      id: 'transf',
      category: 'veiculos',
      title: 'Transferência de Propriedade',
      description: 'Processo completo com vistoria, certidões e emissão ágil no DETRAN.',
      icon: '🚗',
      highlight: true
    },
    {
      id: 'emplacamento',
      category: 'veiculos',
      title: 'Primeiro Emplacamento',
      description: 'Emplacamento Mercosul para veículos zero km com rapidez e comodidade.',
      icon: '✨',
      highlight: true
    },
    {
      id: 'crlv',
      category: 'licenciamento',
      title: 'Emissão de CRLV-e (Licenciamento Anual)',
      description: 'Documento anual digital atualizado e liberado para circulação imediata.',
      icon: '📄'
    },
    {
      id: 'crv',
      category: 'veiculos',
      title: '2ª Via de CRV / ATPV-e',
      description: 'Recuperação rápida do documento de compra e venda (antigo DUT) rasurado ou perdido.',
      icon: '📑'
    },
    {
      id: 'ipva-vistoria',
      category: 'licenciamento',
      title: 'Parcelamento de Débitos & IPVA',
      description: 'Consulta de multas, IPVA e taxas com parcelamento facilitado no cartão.',
      icon: '💳',
      highlight: true
    },
    {
      id: 'comunicado',
      category: 'veiculos',
      title: 'Comunicado de Venda',
      description: 'Proteção jurídica contra multas e pontuação após vender seu veículo.',
      icon: '🛡️'
    },
    {
      id: 'placa',
      category: 'veiculos',
      title: '2ª Via & Autorização de Placa Mercosul',
      description: 'Substituição de placa danificada, extraviada ou troca para o padrão Mercosul.',
      icon: '🚙'
    },
    {
      id: 'antt',
      category: 'regularizacao',
      title: 'Cadastro e Renovação ANTT (RNTRC)',
      description: 'Emissão e renovação de registro para caminhoneiros, transportadores e frotas.',
      icon: '🚛'
    },
    {
      id: 'baixa',
      category: 'regularizacao',
      title: 'Baixa de Veículo & Sinistro',
      description: 'Baixa definitiva no DETRAN por perda total, sinistro ou desmanche legal.',
      icon: '🔧'
    },
    {
      id: 'consultas',
      category: 'licenciamento',
      title: 'Consultas de Débitos & Restrições',
      description: 'Levantamento completo de multas, débitos pendentes e restrições financeiras.',
      icon: '🔍'
    }
  ];

  constructor(public linksService: LinksService) {}

  get filteredServicos(): ServicoItem[] {
    if (this.activeCategory === 'all') {
      return this.servicos;
    }
    return this.servicos.filter(s => s.category === this.activeCategory);
  }

  setCategory(cat: 'all' | 'veiculos' | 'licenciamento' | 'regularizacao'): void {
    this.activeCategory = cat;
  }

  solicitarServico(servico: ServicoItem): void {
    this.linksService.openWhatsApp('geral', undefined, servico.title);
  }
}
