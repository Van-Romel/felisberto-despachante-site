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
      categoria: 'ECV • Vistoria Veicular Credenciada DETRAN-BA',
      cidade: 'Barreiras / BA',
      destaque: true,
      endereco: 'Rua Sergipe, nº 97 — Morada Nobre (ao lado do Corpo de Bombeiros), Barreiras - BA, CEP: 47810-053',
      mapsUrl: 'https://maps.app.goo.gl/qZMDx2KS4B5U3e5E6',
      descricao: 'Empresa Credenciada de Vistoria (ECV) oficial junto ao DETRAN-BA. Parceira estratégica do Felisberto Despachante na emissão rápida de laudos para transferência de veículos, vistorias prévias e laudos cautelares, garantindo segurança na compra e venda.',
      beneficios: [
        'Emissão de laudo oficial rápido e integrado ao sistema do DETRAN-BA',
        'Conferência rigorosa de numeração de motor, chassi e itens de segurança',
        'Comunicação direta com o Felisberto Despachante para protocolar seu processo no mesmo dia',
        'Localização de fácil acesso em Barreiras (ao lado dos Bombeiros)'
      ],
      icone: '🔍'
    },
    {
      id: 'concessionarias-lojas',
      nome: 'Lojas de Veículos & Concessionárias Conveniadas',
      categoria: 'Venda de Novos e Seminovos',
      cidade: 'Barreiras & Luís Eduardo Magalhães',
      destaque: false,
      endereco: 'Atendimento corporativo in loco em toda a região oeste da Bahia',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA',
      descricao: 'Parcerias com revendedoras e concessionárias para realização de 1º emplacamento Mercosul, transferências de propriedade em lote e regularização de estoques com faturamento direto e prazos diferenciados.',
      beneficios: [
        'Atendimento PJ dedicado com emissão ágil de DUT / ATPV-e',
        'Coleta e entrega de documentos diretamente na concessionária',
        'Condições especiais para lojistas parceiros'
      ],
      icone: '🚗'
    },
    {
      id: 'frotistas-agro',
      nome: 'Empresas do Agro & Transportadoras',
      categoria: 'Frotas Corporativas & Agronegócio',
      cidade: 'Luís Eduardo Magalhães & Região Oeste',
      destaque: false,
      endereco: 'Polo Agroindustrial de Luís Eduardo Magalhães e Barreiras',
      mapsUrl: 'https://maps.app.goo.gl/ohhGB2GUCxMAGtXX7',
      descricao: 'Gestão documental especializada para produtores rurais, frotas pesadas, carretas, bitrens e maquinários agrícolas. Renovação de licenciamentos em bloco e desembaraço de débitos estaduais.',
      beneficios: [
        'Calendário preventivo de renovação de frotas sem risco de apreensão',
        'Atendimento prioritário em LEM para o polo do agronegócio',
        'Relatórios de débitos e taxas consolidadas para o financeiro da empresa'
      ],
      icone: '🚛'
    },
    {
      id: 'autoescolas-cfc',
      nome: 'Autoescolas & Centros de Formação de Condutores (CFC)',
      categoria: 'Habilitação & Formação de Condutores',
      cidade: 'Barreiras & LEM',
      destaque: false,
      endereco: 'Centros conveniados em Barreiras e Luís Eduardo Magalhães',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA',
      descricao: 'Integração em procedimentos de CNH, suporte a alunos para certidões e regularizações veiculares, e orientação para liberação de prontuários e adição de categoria.',
      beneficios: [
        'Agilidade no acompanhamento de emissão de CNH definitiva',
        'Orientação técnica sobre pontuação e recursos no DETRAN-BA'
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
