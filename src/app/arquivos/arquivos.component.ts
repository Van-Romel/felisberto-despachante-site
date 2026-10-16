import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LinksService } from '../services/links.service';

export interface DocumentoDownload {
  titulo: string;
  descricao: string;
  pdfUrl?: string;
  docxUrl?: string;
  tag: string;
}

export interface LinkUtil {
  nome: string;
  orgao: string;
  url: string;
  descricao: string;
  icon: string;
}

@Component({
  selector: 'app-arquivos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.scss']
})
export class ArquivosComponent {
  selectedDoc: DocumentoDownload | null = null;
  safePdfUrl: SafeResourceUrl | null = null;
  isPreviewOpen = false;
  documentos: DocumentoDownload[] = [
    {
      titulo: 'Procuração Pessoa Física (PF)',
      descricao: 'Modelo padrão oficial homologado pelo CRDD-BA para representação legal de condutores e proprietários.',
      pdfUrl: 'documentos/Procuracao_CRDDBA_PF.pdf',
      docxUrl: 'documentos/Procuracao_CRDDBA_PF.docx',
      tag: 'Pessoa Física'
    },
    {
      titulo: 'Procuração Pessoa Jurídica (PJ)',
      descricao: 'Instrumento de representação para empresas, frotas corporativas e concessionárias junto ao DETRAN-BA.',
      pdfUrl: 'documentos/Procuracao_CRDDBA_PJ.pdf',
      docxUrl: 'documentos/Procuracao_CRDDBA_PJ.docx',
      tag: 'Pessoa Jurídica'
    },
    {
      titulo: 'Declaração de Residência / Domicílio',
      descricao: 'Formulário oficial para comprovação de endereço residencial em processos veiculares.',
      pdfUrl: 'documentos/DECLARACAO DE DOMICILIO.pdf',
      docxUrl: 'documentos/DECLARACAO DE DOMICILIO.docx',
      tag: 'Comprovação'
    },
    {
      titulo: 'Requerimento Único DETRAN',
      descricao: 'Requerimento padronizado para abertura e movimentação de processos documentais.',
      pdfUrl: 'documentos/REQUERIMENTO UNICO.pdf',
      docxUrl: 'documentos/REQUERIMENTO UNICO.docx',
      tag: 'Oficial'
    }
  ];

  linksUteis: LinkUtil[] = [
    {
      nome: 'DETRAN Bahia',
      orgao: 'Governo do Estado da Bahia',
      url: 'https://www.detran.ba.gov.br/',
      descricao: 'Consultas de habilitação, veículos, infrações e agendamentos no estado.',
      icon: '🚗'
    },
    {
      nome: 'SEFAZ BA',
      orgao: 'Secretaria da Fazenda da Bahia',
      url: 'https://www.sefaz.ba.gov.br/',
      descricao: 'Emissão de DAE para IPVA, certidões negativas de débitos estaduais e tributos.',
      icon: '🏛️'
    },
    {
      nome: 'Receita Federal',
      orgao: 'Ministério da Fazenda',
      url: 'https://www.gov.br/receitafederal/pt-br/servicos',
      descricao: 'Portal unificado de serviços e certidões da Receita Federal.',
      icon: '📋'
    },
    {
      nome: 'Consulta Situação CPF',
      orgao: 'Receita Federal',
      url: 'https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp',
      descricao: 'Verificação rápida de regularidade cadastral do CPF.',
      icon: '🪪'
    },
    {
      nome: 'Central SOL',
      orgao: 'Serviço de Operações e Licenciamento',
      url: 'https://centralsol.com.br/Ssdr/',
      descricao: 'Acesso rápido para despachantes e sistemas veiculares homologados.',
      icon: '⚡'
    },
    {
      nome: 'Neoenergia COELBA',
      orgao: 'Concessionária de Energia',
      url: 'https://servicos.neoenergiacoelba.com.br/Pages/todos-os-servicos.aspx',
      descricao: 'Emissão de comprovantes e segunda via de contas de energia para endereço.',
      icon: '💡'
    },
    {
      nome: 'EMBASA',
      orgao: 'Empresa Baiana de Águas e Saneamento',
      url: 'https://www.embasa.ba.gov.br/centralservicos/',
      descricao: 'Emissão de 2ª via e certidões para validação de residência na Bahia.',
      icon: '💧'
    }
  ];

  constructor(
    public linksService: LinksService,
    private sanitizer: DomSanitizer
  ) {}

  abrirPreview(doc: DocumentoDownload, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.selectedDoc = doc;
    if (doc.pdfUrl) {
      this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(doc.pdfUrl);
    } else {
      this.safePdfUrl = null;
    }
    this.isPreviewOpen = true;
    document.body.style.overflow = 'hidden';
  }

  fecharPreview(): void {
    this.isPreviewOpen = false;
    this.selectedDoc = null;
    this.safePdfUrl = null;
    document.body.style.overflow = '';
  }

  imprimirDocumento(): void {
    if (!this.selectedDoc?.pdfUrl) return;
    const printWin = window.open(this.selectedDoc.pdfUrl, '_blank');
    if (printWin) {
      printWin.focus();
    }
  }

  async compartilharDocumento(doc?: DocumentoDownload | null): Promise<void> {
    const targetDoc = doc || this.selectedDoc;
    if (!targetDoc) return;

    const fullUrl = `https://www.felisbertodespachante.com.br/${targetDoc.pdfUrl || ''}`;
    const shareText = `Olá! Segue o modelo oficial de *${targetDoc.titulo}* do Felisberto Despachante:\n📄 Acesse o documento aqui: ${fullUrl}`;

    if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: targetDoc.titulo,
          text: shareText,
          url: fullUrl
        });
        return;
      } catch (_) {
        // Usuário cancelou ou navegador não completou o share nativo
      }
    }

    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  baixarArquivo(url?: string, event?: Event): void {
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop() || 'documento';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  openWhatsappAjuda(): void {
    this.linksService.openWhatsApp('geral', 'Olá! Preciso de ajuda para preencher um documento veicular.');
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isPreviewOpen) {
      this.fecharPreview();
    }
  }
}
