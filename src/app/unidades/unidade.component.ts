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
      subtitulo: 'Matriz • Atendimento Presencial e Digital',
      endereco: 'Rua Barão de Cotegipe, nº 472',
      bairroCidade: 'Centro — Barreiras - BA',
      referencia: 'Região central com fácil acesso e estacionamento próximo',
      mapsUrl: 'https://maps.app.goo.gl/PBFUH54SkaZUMf7bA',
      whatsapp: '(77) 99996-5588',
      whatsappRaw: '5577999965588',
      telefoneFixo: '(77) 3612-5916',
      horario: 'Segunda a Sexta: 08:00 às 18:00',
      descricao: 'Assessoria veicular completa em Barreiras desde 2007. Transferências, emplacamentos e débitos do Detran resolvidos sem filas.',
      especialidades: [
        'Transferência de veículos e 2ª via de CRV/DUT',
        'Primeiro emplacamento Mercosul',
        'Parcelamento de IPVA, multas e licenciamento',
        'Cadastro ANTT, vistorias e certidões'
      ],
      outraUnidadeId: 'lem',
      outraUnidadeNome: 'Luís Eduardo Magalhães (LEM)'
    },
    lem: {
      id: 'lem',
      nomeCidade: 'Luís Eduardo Magalhães / BA',
      subtitulo: 'Filial LEM • Condutores, Frotas e Agro',
      endereco: 'Rua José Cardoso de Lima, nº 5441',
      bairroCidade: 'Centro — Luís Eduardo Magalhães - BA',
      referencia: 'Próximo aos principais serviços do centro de LEM',
      mapsUrl: 'https://maps.app.goo.gl/ohhGB2GUCxMAGtXX7',
      whatsapp: '(77) 99800-9877',
      whatsappRaw: '5577998009877',
      horario: 'Segunda a Sexta: 08:00 às 18:00',
      descricao: 'Atendimento ágil para motoristas, produtores rurais e empresas de transporte de LEM e região.',
      especialidades: [
        'Transferência de utilitários, pesados e passeio',
        'Emissão rápida de CRLV-e digital',
        'Parcelamento de débitos estaduais em até 12x',
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
