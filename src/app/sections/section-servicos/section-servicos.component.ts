import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService } from '../../services/links.service';

export interface ServicoItem {
  id: string;
  category: 'veiculos' | 'licenciamento' | 'cnh';
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
  activeCategory: 'all' | 'veiculos' | 'licenciamento' | 'cnh' = 'all';

  servicos: ServicoItem[] = [
    {
      id: 'transf',
      category: 'veiculos',
      title: 'Transferência de Propriedade',
      description: 'Transferência completa de veículo entre proprietários com vistoria, certidões e emissão rápida do CRLV-e.',
      icon: '🚗',
      highlight: true
    },
    {
      id: 'emplacamento',
      category: 'veiculos',
      title: 'Primeiro Emplacamento',
      description: 'Regularização e emplacamento Mercosul de veículos zero km com agilidade direto para você ou concessionária.',
      icon: '✨',
      highlight: true
    },
    {
      id: 'crlv',
      category: 'licenciamento',
      title: 'Emissão e 2ª Via de CRLV-e',
      description: 'Atualização e emissão do documento digital de circulação veicular homologado no DETRAN-BA.',
      icon: '📄'
    },
    {
      id: 'crv',
      category: 'veiculos',
      title: '2ª Via de DUT / ATPV-e',
      description: 'Recuperação do documento de compra e venda em caso de perda, rasura ou extravio.',
      icon: '📑'
    },
    {
      id: 'ipva-vistoria',
      category: 'licenciamento',
      title: 'Parcelamento de Débitos & IPVA',
      description: 'Levantamento de multas, débitos pendentes, taxa de licenciamento e facilidade de parcelamento.',
      icon: '💳',
      highlight: true
    },
    {
      id: 'comunicado',
      category: 'veiculos',
      title: 'Comunicado de Venda',
      description: 'Proteção jurídica para o vendedor, garantindo que infrações futuras não sejam vinculadas ao seu nome.',
      icon: '🛡️'
    },
    {
      id: 'placa',
      category: 'veiculos',
      title: '2ª Via de Placa Mercosul',
      description: 'Substituição de placas danificadas, furtadas ou atualização para o padrão Mercosul.',
      icon: '🚙'
    },
    {
      id: 'cnh',
      category: 'cnh',
      title: 'CNH & Regularização',
      description: 'Renovação de habilitação, mudança de categoria, recursos e certidões do condutor.',
      icon: '🪪'
    },
    {
      id: 'procuracao',
      category: 'cnh',
      title: 'Procurações Oficiais (PF e PJ)',
      description: 'Elaboração e conferência de procurações no padrão exigido pelo CRDD-BA e DETRAN.',
      icon: '✍️'
    },
    {
      id: 'antt',
      category: 'veiculos',
      title: 'Cadastro e Renovação ANTT',
      description: 'Inscrição no Registro Nacional de Transportadores Rodoviários de Cargas (RNTRC).',
      icon: '🚛'
    },
    {
      id: 'licencas',
      category: 'licenciamento',
      title: 'Licenças Estaduais',
      description: 'Autorizações especiais de trânsito e licenças junto aos órgãos estaduais competentes.',
      icon: '⚖️'
    },
    {
      id: 'baixa',
      category: 'veiculos',
      title: 'Baixa de Veículo & Desmanche',
      description: 'Procedimento legal de baixa definitiva de veículo por sinistro ou perda total.',
      icon: '🔧'
    }
  ];

  constructor(public linksService: LinksService) {}

  get filteredServicos(): ServicoItem[] {
    if (this.activeCategory === 'all') {
      return this.servicos;
    }
    return this.servicos.filter(s => s.category === this.activeCategory);
  }

  setCategory(cat: 'all' | 'veiculos' | 'licenciamento' | 'cnh'): void {
    this.activeCategory = cat;
  }

  solicitarServico(servico: ServicoItem): void {
    this.linksService.openWhatsApp('geral', undefined, servico.title);
  }
}
