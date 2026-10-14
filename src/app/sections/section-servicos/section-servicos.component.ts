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
      description: 'Transferência completa de veículo entre proprietários com vistoria, certidões e emissão rápida no DETRAN-BA.',
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
      title: 'Emissão de CRLV-e (Licenciamento Anual)',
      description: 'Emissão e impressão oficial do documento de circulação veicular anual regularizado no DETRAN-BA.',
      icon: '📄'
    },
    {
      id: 'crv',
      category: 'veiculos',
      title: '2ª Via de CRV / ATPV-e',
      description: 'Emissão e recuperação do documento de compra e venda (antigo DUT) em caso de perda, rasura ou extravio.',
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
      description: 'Registro oficial de venda no DETRAN, garantindo proteção jurídica contra multas e pontuação futuras.',
      icon: '🛡️'
    },
    {
      id: 'placa',
      category: 'veiculos',
      title: '2ª Via & Autorização de Placa Mercosul',
      description: 'Autorização de estampagem e substituição de placas danificadas, furto ou conversão ao padrão Mercosul.',
      icon: '🚙'
    },
    {
      id: 'antt',
      category: 'regularizacao',
      title: 'Cadastro e Renovação ANTT (RNTRC)',
      description: 'Inscrição e renovação no Registro Nacional de Transportadores Rodoviários de Cargas para transportadores e frotas.',
      icon: '🚛'
    },
    {
      id: 'baixa',
      category: 'regularizacao',
      title: 'Baixa de Veículo & Sinistro',
      description: 'Procedimento legal de baixa definitiva de veículo junto ao DETRAN por perda total, sinistro ou desmanche.',
      icon: '🔧'
    },
    {
      id: 'consultas',
      category: 'licenciamento',
      title: 'Consultas de Débitos & Restrições',
      description: 'Levantamento minucioso da situação do veículo: multas estaduais/federais, restrições financeiras e gravame.',
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
