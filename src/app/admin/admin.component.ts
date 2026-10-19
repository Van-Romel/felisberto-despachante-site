import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  SiteConfigService,
  SiteConfig,
  UnidadeConfig,
  AvisoFeriado,
  TipoTema,
  TemaSazonalConfig
} from '../services/site-config.service';

type AdminTab = 'unidades' | 'feriados' | 'temas' | 'backup';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  // Autenticação simples
  isAuthenticated = false;
  pinInput = '';
  pinError = false;
  private readonly DEFAULT_PIN = '1234';

  // Navegação por tabs
  activeTab: AdminTab = 'unidades';

  // Configuração ativa
  config!: SiteConfig;

  // Edição de Unidades
  selectedUnidadeId: 'barreiras' | 'lem' = 'barreiras';
  unidadeEdit!: UnidadeConfig;

  // Edição de Feriados
  editandoFeriadoId: string | null = null;
  novoFeriado: AvisoFeriado = this.getEmptyFeriado();

  // Edição de Temas
  temaEdit!: TemaSazonalConfig;

  // Backup / Importação
  jsonExportText = '';
  jsonImportInput = '';
  toastMensagem: string | null = null;
  private toastTimeout: any;

  constructor(public configService: SiteConfigService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      if (sessionStorage.getItem('felisberto_admin_auth') === 'true') {
        this.isAuthenticated = true;
      }
    }

    this.carregarDados();
  }

  carregarDados(): void {
    this.config = JSON.parse(JSON.stringify(this.configService.config));
    this.carregarUnidade();
    this.temaEdit = { ...this.config.temaSazonal };
    this.jsonExportText = this.configService.exportConfigJson();
  }

  fazerLogin(): void {
    if (this.pinInput.trim() === this.DEFAULT_PIN) {
      this.isAuthenticated = true;
      this.pinError = false;
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem('felisberto_admin_auth', 'true');
      }
    } else {
      this.pinError = true;
    }
  }

  fazerLogout(): void {
    this.isAuthenticated = false;
    this.pinInput = '';
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('felisberto_admin_auth');
    }
  }

  selecionarTab(tab: AdminTab): void {
    this.activeTab = tab;
    if (tab === 'backup') {
      this.jsonExportText = this.configService.exportConfigJson();
    }
  }

  // --- UNIDADES ---
  carregarUnidade(): void {
    if (this.config && this.config.unidades[this.selectedUnidadeId]) {
      this.unidadeEdit = JSON.parse(JSON.stringify(this.config.unidades[this.selectedUnidadeId]));
    }
  }

  trocarUnidade(id: 'barreiras' | 'lem'): void {
    this.selectedUnidadeId = id;
    this.carregarUnidade();
  }

  salvarUnidade(): void {
    this.configService.updateUnidade(this.selectedUnidadeId, this.unidadeEdit);
    this.mostrarToast(`✅ Dados da Unidade ${this.unidadeEdit.nomeCidade} atualizados com sucesso!`);
    this.carregarDados();
  }

  // --- FERIADOS / RECESSOS ---
  getEmptyFeriado(): AvisoFeriado {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    return {
      id: 'feriado_' + Date.now(),
      unidadeId: 'todas',
      titulo: '',
      dataInicioRecesso: `${ano}-12-24`,
      dataFimRecesso: `${ano + 1}-01-02`,
      mensagem: '',
      diasAntecedenciaAviso: 10,
      ativo: true
    };
  }

  iniciarNovoFeriado(): void {
    this.editandoFeriadoId = null;
    this.novoFeriado = this.getEmptyFeriado();
  }

  editarFeriado(feriado: AvisoFeriado): void {
    this.editandoFeriadoId = feriado.id;
    this.novoFeriado = JSON.parse(JSON.stringify(feriado));
  }

  cancelarEdicaoFeriado(): void {
    this.editandoFeriadoId = null;
    this.novoFeriado = this.getEmptyFeriado();
  }

  salvarFeriado(): void {
    if (!this.novoFeriado.titulo.trim() || !this.novoFeriado.mensagem.trim()) {
      alert('Por favor, preencha o título e a mensagem do comunicado.');
      return;
    }

    this.configService.addOrUpdateFeriado(this.novoFeriado);
    this.mostrarToast('✅ Comunicado de recesso salvo com sucesso!');
    this.iniciarNovoFeriado();
    this.carregarDados();
  }

  toggleAtivoFeriado(feriado: AvisoFeriado): void {
    feriado.ativo = !feriado.ativo;
    this.configService.addOrUpdateFeriado(feriado);
    this.mostrarToast(`Status do aviso "${feriado.titulo}" alterado.`);
    this.carregarDados();
  }

  excluirFeriado(id: string): void {
    if (confirm('Tem certeza que deseja excluir este comunicado de feriado?')) {
      this.configService.deleteFeriado(id);
      this.mostrarToast('🗑️ Comunicado removido.');
      this.carregarDados();
    }
  }

  isAvisoAtivoHoje(feriado: AvisoFeriado): boolean {
    if (!feriado.ativo) return false;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const inicioRecesso = new Date(feriado.dataInicioRecesso + 'T00:00:00');
    const fimRecesso = new Date(feriado.dataFimRecesso + 'T23:59:59');

    const dias = feriado.diasAntecedenciaAviso || 10;
    const dataInicioAviso = new Date(inicioRecesso);
    dataInicioAviso.setDate(dataInicioAviso.getDate() - dias);

    return hoje >= dataInicioAviso && hoje <= fimRecesso;
  }

  // --- TEMAS SAZONAIS ---
  salvarTema(): void {
    this.configService.updateTemaSazonal(this.temaEdit);
    this.mostrarToast('🎨 Configuração de tema sazonal salva!');
    this.carregarDados();
  }

  // --- BACKUP & JSON ---
  copiarJson(): void {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(this.jsonExportText).then(() => {
        this.mostrarToast('📋 Configuração JSON copiada para a área de transferência!');
      });
    } else {
      this.mostrarToast('Selecione o texto e copie manualmente.');
    }
  }

  importarJson(): void {
    if (!this.jsonImportInput.trim()) {
      alert('Cole o conteúdo JSON antes de importar.');
      return;
    }

    const sucesso = this.configService.importConfigJson(this.jsonImportInput);
    if (sucesso) {
      this.mostrarToast('✅ Configurações importadas e aplicadas com sucesso!');
      this.jsonImportInput = '';
      this.carregarDados();
    } else {
      alert('Erro: O texto colado não é um formato de configuração JSON válido.');
    }
  }

  restaurarPadroes(): void {
    if (confirm('Atenção: Isso irá restaurar todos os dados para os padrões originais de fábrica do site. Deseja continuar?')) {
      this.configService.resetToDefaults();
      this.mostrarToast('🔄 Configurações restauradas para o padrão!');
      this.carregarDados();
    }
  }

  mostrarToast(msg: string): void {
    this.toastMensagem = msg;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMensagem = null;
    }, 3500);
  }
}
