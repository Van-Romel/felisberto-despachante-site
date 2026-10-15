import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LinksService } from '../services/links.service';

export interface ParceiroItem {
  id: string;
  nome: string;
  categoria: string;
  cidade: string;
  destaque: boolean;
  endereco: string;
  mapsUrl: string;
  descricao: string;
  beneficios: string[];
  icone: string;
}

@Component({
  selector: 'app-parceiros',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './parceiros.component.html',
  styleUrls: ['./parceiros.component.scss']
})
export class ParceirosComponent {
  oesteVistoriaMaps = 'https://maps.app.goo.gl/qZMDx2KS4B5U3e5E6';

  parceiros: ParceiroItem[] = [
    {
      id: 'oeste-vistoria',
      nome: 'Oeste Vistorias Automotivas',
      categoria: 'ECV • Vistoria Credenciada Detran-BA',
      cidade: 'Barreiras / BA',
      destaque: true,
      endereco: 'Rua Sergipe, 97 — Morada Nobre (ao lado dos Bombeiros), Barreiras - BA',
      mapsUrl: 'https://maps.app.goo.gl/qZMDx2KS4B5U3e5E6',
      descricao: 'Empresa Credenciada de Vistoria oficial pelo Detran-BA. Laudos de transferência, 2ª via de CRV/DUT e cautelar integrados diretamente ao Felisberto Despachante.',
      beneficios: [
        'Laudo oficial aceito na hora no Detran-BA',
        'Protocolamento no mesmo dia com o Felisberto',
        'Fácil acesso ao lado do Corpo de Bombeiros'
      ],
      icone: '🔍'
    },
    {
      id: 'concessionarias-lojas',
      nome: 'Concessionárias & Revendedoras',
      categoria: 'Venda de Novos e Seminovos',
      cidade: 'Barreiras & LEM',
      destaque: false,
      endereco: 'Atendimento corporativo em toda a região oeste da Bahia',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA',
      descricao: 'Emplacamento Mercosul e transferência de estoques com faturamento direto e prazos especiais para lojistas.',
      beneficios: [
        'Emissão ágil de ATPV-e e documentos em lote',
        'Retirada e entrega de processos na loja'
      ],
      icone: '🚗'
    },
    {
      id: 'frotistas-agro',
      nome: 'Empresas do Agro & Transportadoras',
      categoria: 'Frotas Corporativas & Agronegócio',
      cidade: 'LEM & Barreiras',
      destaque: false,
      endereco: 'Polo Agroindustrial de Luís Eduardo Magalhães e Barreiras',
      mapsUrl: 'https://maps.app.goo.gl/ohhGB2GUCxMAGtXX7',
      descricao: 'Gestão documental de frotas pesadas, carretas, bitrens e maquinário agrícola sem burocracia.',
      beneficios: [
        'Renovação de licenciamento em bloco sem filas',
        'Relatórios consolidados de taxas e tributos'
      ],
      icone: '🚛'
    },
    {
      id: 'autoescolas-cfc',
      nome: 'Autoescolas & CFCs',
      categoria: 'Habilitação & Condutores',
      cidade: 'Barreiras & LEM',
      destaque: false,
      endereco: 'Centros conveniados da região oeste',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA',
      descricao: 'Suporte em procedimentos de CNH, certidões e regularizações de veículos para instrutores e alunos.',
      beneficios: [
        'Acompanhamento ágil de processos e emissões',
        'Orientação técnica em pendências e recursos'
      ],
      icone: '🪪'
    }
  ];

  constructor(public linksService: LinksService) {}

  openMaps(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  falarSobreParceria(parceiroNome: string): void {
    const msg = `Olá! Vim pela página de Parceiros do site do Felisberto Despachante e gostaria de informações sobre o atendimento integrado com: *${parceiroNome}*.`;
    this.linksService.openWhatsApp('geral', msg);
  }

  sejaParceiro(): void {
    const msg = 'Olá! Gostaria de conversar sobre como cadastrar minha empresa como conveniada/parceira do Felisberto Despachante.';
    this.linksService.openWhatsApp('geral', msg);
  }
}
