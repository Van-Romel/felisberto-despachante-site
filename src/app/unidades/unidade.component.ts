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
      descricao: 'Referência em assessoria veicular em Barreiras desde 2007. Estrutura completa para resolver transferências, emplacamentos e débitos no DETRAN com agilidade e total segurança jurídica.',
      especialidades: [
        'Transferência de veículos leves e pesados',
        'Primeiro emplacamento Mercosul',
        '2ª via de CRV / ATPV-e e intenção de venda',
        'Parcelamento facilitado de IPVA e multas',
        'Cadastro ANTT, vistorias e certidões'
      ],
      outraUnidadeId: 'lem',
      outraUnidadeNome: 'Luís Eduardo Magalhães (LEM)'
    },
    lem: {
      id: 'lem',
      nomeCidade: 'Luís Eduardo Magalhães (LEM) / BA',
      subtitulo: 'Atendimento Ágil para Frotas, Agro e Condutores',
      endereco: 'Rua José Cardoso de Lima, nº 5441',
      bairroCidade: 'Luís Eduardo Magalhães - BA',
      referencia: 'Atendimento presencial e suporte ágil no centro da cidade',
      mapsUrl: 'https://maps.app.goo.gl/ohhGB2GUCxMAGtXX7',
      whatsapp: '(77) 99800-9877',
      whatsappRaw: '5577998009877',
      horario: 'Segunda a Sexta: 08:00 às 18:00',
      descricao: 'Atendimento rápido e eficiente para o polo do agronegócio, frotistas e motoristas particulares de LEM. Regularize seu veículo sem filas e sem burocracia.',
      especialidades: [
        'Atendimento a frotas e produtores rurais',
        'Emplacamento e transferência de utilitários e caminhões',
        'Emissão imediata de CRLV-e digital',
        'Parcelamento de débitos e tributos estaduais',
        'Inscrição e renovação ANTT (RNTRC)'
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
