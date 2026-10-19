import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UnidadeConfig {
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
  fotoFachada?: string;
  fotoRecepcao?: string;
}

export interface AvisoFeriado {
  id: string;
  unidadeId: 'todas' | 'barreiras' | 'lem';
  titulo: string;
  dataInicioRecesso: string; // YYYY-MM-DD
  dataFimRecesso: string;    // YYYY-MM-DD
  mensagem: string;
  diasAntecedenciaAviso: number; // Padrão: 10 dias
  ativo: boolean;
}

export type TipoTema = 'padrao' | 'natal' | 'ano_novo';

export interface TemaSazonalConfig {
  tema: TipoTema;
  forcarAtivo: boolean;
  dataInicio: string; // YYYY-MM-DD
  dataFim: string;    // YYYY-MM-DD
  mensagemBanner?: string;
}

export interface SiteConfig {
  unidades: Record<string, UnidadeConfig>;
  feriados: AvisoFeriado[];
  temaSazonal: TemaSazonalConfig;
}

const STORAGE_KEY = 'felisberto_site_config_v1';

const DEFAULT_CONFIG: SiteConfig = {
  unidades: {
    barreiras: {
      id: 'barreiras',
      nomeCidade: 'Barreiras / BA',
      subtitulo: 'Matriz • Atendimento Presencial e Digital',
      endereco: 'Rua Hermenegildo Fé',
      bairroCidade: 'Centro — Barreiras - BA, CEP: 47800-058',
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
      outraUnidadeNome: 'Luís Eduardo Magalhães (LEM)',
      fotoFachada: 'assets/img/unidades/barreiras-fachada.jpg',
      fotoRecepcao: 'assets/img/unidades/barreiras-recepcao.jpg'
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
      outraUnidadeNome: 'Barreiras',
      fotoFachada: 'assets/img/unidades/lem-fachada.jpg',
      fotoRecepcao: 'assets/img/unidades/lem-recepcao.jpg'
    }
  },
  feriados: [
    {
      id: 'exemplo_natal_fim_ano',
      unidadeId: 'todas',
      titulo: 'Recesso de Fim de Ano',
      dataInicioRecesso: '2026-12-24',
      dataFimRecesso: '2027-01-02',
      mensagem: 'Informamos que entraremos em recesso de fim de ano. Nosso atendimento pelo WhatsApp permanecerá disponível para orientações e agendamentos.',
      diasAntecedenciaAviso: 10,
      ativo: true
    }
  ],
  temaSazonal: {
    tema: 'padrao',
    forcarAtivo: false,
    dataInicio: '2026-12-15',
    dataFim: '2026-12-26',
    mensagemBanner: 'Boas Festas! A equipe Felisberto Despachante deseja um Feliz Natal e Próspero Ano Novo.'
  }
};

@Injectable({
  providedIn: 'root'
})
export class SiteConfigService {
  private configSubject = new BehaviorSubject<SiteConfig>(this.loadConfig());
  public config$: Observable<SiteConfig> = this.configSubject.asObservable();

  constructor() {}

  public get config(): SiteConfig {
    return this.configSubject.value;
  }

  private loadConfig(): SiteConfig {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            unidades: { ...DEFAULT_CONFIG.unidades, ...(parsed.unidades || {}) },
            feriados: Array.isArray(parsed.feriados) ? parsed.feriados : DEFAULT_CONFIG.feriados,
            temaSazonal: { ...DEFAULT_CONFIG.temaSazonal, ...(parsed.temaSazonal || {}) }
          };
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar configurações do site:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }

  public saveConfig(newConfig: SiteConfig): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      }
      this.configSubject.next(newConfig);
    } catch (e) {
      console.error('Erro ao salvar configuração:', e);
    }
  }

  public updateUnidade(id: 'barreiras' | 'lem', dados: Partial<UnidadeConfig>): void {
    const current = this.config;
    if (current.unidades[id]) {
      current.unidades[id] = { ...current.unidades[id], ...dados };
      this.saveConfig({ ...current });
    }
  }

  public addOrUpdateFeriado(feriado: AvisoFeriado): void {
    const current = this.config;
    const index = current.feriados.findIndex(f => f.id === feriado.id);
    if (index >= 0) {
      current.feriados[index] = feriado;
    } else {
      current.feriados.push(feriado);
    }
    this.saveConfig({ ...current });
  }

  public deleteFeriado(id: string): void {
    const current = this.config;
    current.feriados = current.feriados.filter(f => f.id !== id);
    this.saveConfig({ ...current });
  }

  public updateTemaSazonal(temaConfig: Partial<TemaSazonalConfig>): void {
    const current = this.config;
    current.temaSazonal = { ...current.temaSazonal, ...temaConfig };
    this.saveConfig({ ...current });
  }

  public resetToDefaults(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.configSubject.next(JSON.parse(JSON.stringify(DEFAULT_CONFIG)));
  }

  public exportConfigJson(): string {
    return JSON.stringify(this.config, null, 2);
  }

  public importConfigJson(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.unidades && Array.isArray(parsed.feriados)) {
        this.saveConfig(parsed);
        return true;
      }
    } catch (e) {
      console.error('JSON inválido na importação:', e);
    }
    return false;
  }


  /**
   * Retorna os avisos de feriado/recesso que estão ativos para hoje
   * (se hoje estiver dentro do período de recesso ou nos N dias de antecedência configurados)
   */
  public getAvisosAtivos(unidadeId?: 'barreiras' | 'lem'): AvisoFeriado[] {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return this.config.feriados.filter(f => {
      if (!f.ativo) return false;
      if (unidadeId && f.unidadeId !== 'todas' && f.unidadeId !== unidadeId) return false;

      const inicioRecesso = new Date(f.dataInicioRecesso + 'T00:00:00');
      const fimRecesso = new Date(f.dataFimRecesso + 'T23:59:59');

      // Data de disparo do aviso antecipado (10 dias antes)
      const diasAntecedencia = f.diasAntecedenciaAviso || 10;
      const dataInicioAviso = new Date(inicioRecesso);
      dataInicioAviso.setDate(dataInicioAviso.getDate() - diasAntecedencia);

      return hoje >= dataInicioAviso && hoje <= fimRecesso;
    });
  }

  /**
   * Retorna o tema sazonal ativo com base na data de hoje ou override forçado
   */
  public getTemaAtivo(): TipoTema {
    const { tema, forcarAtivo, dataInicio, dataFim } = this.config.temaSazonal;
    if (forcarAtivo && tema !== 'padrao') return tema;

    if (tema === 'padrao') return 'padrao';

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const inicio = new Date(dataInicio + 'T00:00:00');
    const fim = new Date(dataFim + 'T23:59:59');

    if (hoje >= inicio && hoje <= fim) {
      return tema;
    }

    return 'padrao';
  }
}
