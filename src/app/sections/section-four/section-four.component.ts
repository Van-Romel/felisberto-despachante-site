import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DepoimentoItem {
  autor: string;
  local: string;
  texto: string;
  avaliacao: number;
  servico: string;
}

@Component({
  selector: 'app-section-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-four.component.html',
  styleUrls: ['./section-four.component.scss']
})
export class SectionFourComponent {
  depoimentos: DepoimentoItem[] = [
    {
      autor: 'Lucas Medeiros',
      local: 'Salvador / BA',
      texto: 'Fiz a transferência de um carro seminovo com o Igor e foi a melhor experiência que já tive. Em poucos dias o documento digital já estava liberado no aplicativo. Atendimento ágil e atencioso!',
      avaliacao: 5,
      servico: 'Transferência de Propriedade'
    },
    {
      autor: 'Carla Silveira',
      local: 'Vitória da Conquista / BA',
      texto: 'Precisava parcelar o IPVA e resolver um gravame antigo com urgência. O Felisberto Despachante resolveu tudo pelo WhatsApp com total clareza. Recomendo com certeza!',
      avaliacao: 5,
      servico: 'Parcelamento de Débitos & IPVA'
    },
    {
      autor: 'Marcos Almeida',
      local: 'Empresário / Frotista',
      texto: 'Cuidam dos veículos da nossa transportadora há anos. Nunca tivemos uma única dor de cabeça com prazos de renovação ou emplacamentos. Confiança total!',
      avaliacao: 5,
      servico: 'Emplacamento & Licenciamento'
    }
  ];
}
