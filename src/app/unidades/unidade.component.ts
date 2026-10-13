import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LinksService } from '../services/links.service';

export interface UnidadeInfo {
  id: 'barreiras' | 'lem';
  nomeCidade: string;
  subtitulo: string;
  endereco: string;
  bairroCidade: string;
  referencia: string;
  mapsUrl: string;
  whatsapp: string;
  whatsappRaw: string;
  telefoneFixo?: string;
  horario: string;
  descricao: string;
  especialidades: string[];
  outraUnidadeId: string;
  outraUnidadeNome: string;
}

@Component({
  selector: 'app-unidade',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss']
})
export class UnidadeComponent implements OnInit {
  unidade!: UnidadeInfo;

  unidadesData: Record<string, UnidadeInfo> = {
    barreiras: {
      id: 'barreiras',
      nomeCidade: 'Barreiras / BA',
      subtitulo: 'Escritório Tradicional e Atendimento Regional',
      endereco: 'Rua Barão de Cotegipe, nº 472',
      bairroCidade: 'Centro — Barreiras - BA, CEP: 47800-067',
      referencia: 'Localização central privilegiada, com fácil acesso para condutores e empresas',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA',
      whatsapp: '(77) 99996-5588',
      whatsappRaw: '5577999965588',
      telefoneFixo: '(77) 3612-5916',
      horario: 'Segunda a Sexta: 08:00 às 18:00',
      descricao: 'O escritório de Barreiras é referência histórica em assessoria veicular no oeste baiano desde 2007. Estrutura completa para protocolar transferências, primeiro emplacamento, vistorias e resolver qualquer pendência documental junto ao DETRAN-BA com rapidez e segurança jurídica.',
      especialidades: [
        'Transferência rápida de propriedade de veículos leves e pesados',
        'Primeiro emplacamento Mercosul de veículos novos',
        '2ª via de CRV / CRLV-e e intenção de venda (ATPV-e)',
        'Parcelamento de débitos, multas e IPVA atrasado',
        'Renovação de CNH e certidões negativas de trânsito'
      ],
      outraUnidadeId: 'lem',
      outraUnidadeNome: 'Luís Eduardo Magalhães (LEM)'
    },
    lem: {
      id: 'lem',
      nomeCidade: 'Luís Eduardo Magalhães (LEM) / BA',
      subtitulo: 'Atendimento Especializado para o Polo do Agro, Frotas e Famílias',
      endereco: 'Rua José Cardoso de Lima, nº 5441',
      bairroCidade: 'Luís Eduardo Magalhães - BA',
      referencia: 'Atendimento presencial e suporte ágil para condutores e frotistas da região oeste',
      mapsUrl: 'https://maps.app.goo.gl/ohhGB2GUCxMAGtXX7',
      whatsapp: '(77) 99800-9877',
      whatsappRaw: '5577998009877',
      horario: 'Segunda a Sexta: 08:00 às 18:00',
      descricao: 'Nossa unidade em Luís Eduardo Magalhães foi estruturada para atender com máxima eficiência o ritmo do oeste baiano. Atendemos proprietários de utilitários, caminhonetes, maquinários, frotas corporativas do agronegócio e condutores particulares que precisam de agilidade e zero complicação burocrática.',
      especialidades: [
        'Atendimento prioritário a frotas, produtores rurais e empresas',
        'Emplacamento e transferência de utilitários e caminhões',
        'Emissão ágil de CRLV-e digital para circulação imediata',
        'Regularização e parcelamento de tributos estaduais',
        'Elaboração de Procurações Oficiais PJ e PF'
      ],
      outraUnidadeId: 'barreiras',
      outraUnidadeNome: 'Barreiras'
    }
  };

  constructor(
    private route: ActivatedRoute,
    public linksService: LinksService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const cidade = (params.get('cidade') || 'barreiras').toLowerCase();
      if (cidade.includes('lem') || cidade.includes('luis') || cidade.includes('eduardo')) {
        this.unidade = this.unidadesData['lem'];
      } else {
        this.unidade = this.unidadesData['barreiras'];
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  openMaps(): void {
    window.open(this.unidade.mapsUrl, '_blank', 'noopener,noreferrer');
  }

  openWhatsApp(): void {
    const text = `Olá! Gostaria de falar com o escritório de *${this.unidade.nomeCidade}* do Felisberto Despachante.`;
    window.open(`https://wa.me/${this.unidade.whatsappRaw}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }
}
