import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService, UnidadeDespachante } from '../../services/links.service';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Overlay de fundo suave ao abrir qualquer modal flutuante -->
    <div
      *ngIf="isOpen || isPromoOpen"
      class="floating-whatsapp-overlay"
      (click)="closeAll()"
      aria-hidden="true"
    ></div>

    <div class="floating-dock-container">
      <!-- Modal de Chamada Promocional -->
      <div
        *ngIf="isPromoOpen"
        class="floating-modal promo-modal"
        role="dialog"
        aria-labelledby="modal-promo-title"
        aria-modal="true"
      >
        <div class="modal-header promo-header">
          <div class="modal-header-brand">
            <span class="modal-badge promo-badge">🎁 SORTEIO & PARCERIA OESTE VISTORIAS</span>
            <h3 id="modal-promo-title">Concorra a uma Moto Elétrica!</h3>
            <p>Parceria Felisberto Despachante & Oeste Vistorias em Barreiras:</p>
          </div>
          <button class="btn-close-modal" (click)="closePromoModal()" aria-label="Fechar promoção">
            ✕
          </button>
        </div>

        <div class="promo-modal-body">
          <div class="promo-highlight-card">
            <div class="promo-tag-pill">SORTEIO DE FIM DE ANO 🏍️</div>
            <h4>Vistoria Premiada Oeste Vistorias</h4>
            <p class="promo-lorem">
              Ao realizar a vistoria veicular para transferência, regularização ou laudo prévio na Oeste Vistorias, você ganha um cupom oficial para concorrer ao sorteio de uma <strong>Moto Elétrica</strong> novinha no final do ano!
            </p>
          </div>

          <div class="promo-perks">
            <div class="perk-item">
              <span class="perk-check">✓</span>
              <span>Laudo credenciado oficial aceito no DETRAN-BA</span>
            </div>
            <div class="perk-item">
              <span class="perk-check">✓</span>
              <span>Cupom automático ao realizar sua vistoria</span>
            </div>
            <div class="perk-item">
              <span class="perk-check">✓</span>
              <span>Processo direto com o Felisberto Despachante</span>
            </div>
          </div>

          <button class="btn-promo-claim" (click)="claimPromo()">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-2.029-.475-1.624-.675-2.67-2.327-2.75-2.435-.081-.107-.655-.873-.655-1.664 0-.791.413-1.18.561-1.341.147-.161.32-.201.427-.201.107 0 .213.002.306.007.098.006.23-.037.36.275.133.32.454 1.108.494 1.189.04.081.067.176.013.283-.053.107-.08.174-.16.267-.08.093-.169.208-.242.279-.081.08-.166.167-.071.33.095.163.42 1.002 1.258 1.488.423.246.778.322.94.39.162.067.257.058.354-.053.097-.11.417-.487.528-.654.111-.167.222-.139.375-.083.153.056.97.458 1.137.541.167.083.278.125.319.194.041.07.041.403-.103.808z"/>
            </svg>
            Quero Fazer Minha Vistoria e Concorrer
          </button>

          <button class="btn-promo-insta" (click)="openPromoInstagram()">
            📷 Ver Post da Promoção no Instagram ↗
          </button>
        </div>

        <div class="modal-footer">
          <span>* Sorteio realizado pela Oeste Vistorias. Válido até o fim do ano.</span>
        </div>
      </div>

      <!-- Modal / Popover de Escolha de Unidade WhatsApp -->
      <div
        *ngIf="isOpen"
        class="floating-modal whatsapp-modal"
        role="dialog"
        aria-labelledby="modal-whatsapp-title"
        aria-modal="true"
      >
        <div class="modal-header">
          <div class="modal-header-brand">
            <span class="modal-badge">ATENDIMENTO DIRETO</span>
            <h3 id="modal-whatsapp-title">Felisberto Despachante</h3>
            <p>Selecione a cidade desejada para iniciar sua conversa no WhatsApp:</p>
          </div>
          <button class="btn-close-modal" (click)="closeModal()" aria-label="Fechar seletor">
            ✕
          </button>
        </div>

        <div class="modal-units-list">
          <!-- Opção Barreiras -->
          <button
            type="button"
            class="unit-select-btn"
            (click)="selectCity('barreiras')"
          >
            <div class="unit-icon-wrap">📍</div>
            <div class="unit-text">
              <div class="unit-name-row">
                <strong>Barreiras / BA</strong>
                <span class="unit-tag">Matriz</span>
              </div>
              <span class="unit-phone">(77) 99996-5588</span>
              <span class="unit-desc">Rua Barão de Cotegipe, 472 • Centro</span>
            </div>
            <div class="unit-arrow">→</div>
          </button>

          <!-- Opção LEM -->
          <button
            type="button"
            class="unit-select-btn"
            (click)="selectCity('lem')"
          >
            <div class="unit-icon-wrap">📍</div>
            <div class="unit-text">
              <div class="unit-name-row">
                <strong>Luís Eduardo Magalhães</strong>
                <span class="unit-tag">Filial</span>
              </div>
              <span class="unit-phone">(77) 99800-9877</span>
              <span class="unit-desc">Rua José Cardoso de Lima, 5441</span>
            </div>
            <div class="unit-arrow">→</div>
          </button>
        </div>

        <div class="modal-footer">
          <span>🛡️ Credenciado CRDD-BA • Desde 2007</span>
        </div>
      </div>

      <!-- Botões Flutuantes Empilhados -->
      <div class="floating-buttons-stack">
        <!-- Botão 1: Chamada Promocional (Fica em Cima) -->
        <button
          class="floating-btn promo-btn"
          [class.active]="isPromoOpen"
          (click)="togglePromoModal()"
          aria-label="Ver ofertas e promoções"
          [attr.aria-expanded]="isPromoOpen"
        >
          <span class="promo-badge-pulse" *ngIf="!isPromoOpen"></span>
          <span class="promo-icon" *ngIf="!isPromoOpen">🏷️</span>
          <span class="close-icon" *ngIf="isPromoOpen">✕</span>
          <span class="tooltip-label" *ngIf="!isPromoOpen">Promoções Ativas</span>
        </button>

        <!-- Botão 2: Atendimento WhatsApp (Fica em Baixo) -->
        <button
          class="floating-btn whatsapp-btn"
          [class.active]="isOpen"
          (click)="toggleModal()"
          aria-label="Atendimento no WhatsApp"
          [attr.aria-expanded]="isOpen"
        >
          <svg *ngIf="!isOpen" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-2.029-.475-1.624-.675-2.67-2.327-2.75-2.435-.081-.107-.655-.873-.655-1.664 0-.791.413-1.18.561-1.341.147-.161.32-.201.427-.201.107 0 .213.002.306.007.098.006.23-.037.36.275.133.32.454 1.108.494 1.189.04.081.067.176.013.283-.053.107-.08.174-.16.267-.08.093-.169.208-.242.279-.081.08-.166.167-.071.33.095.163.42 1.002 1.258 1.488.423.246.778.322.94.39.162.067.257.058.354-.053.097-.11.417-.487.528-.654.111-.167.222-.139.375-.083.153.056.97.458 1.137.541.167.083.278.125.319.194.041.07.041.403-.103.808z"/>
          </svg>
          <svg *ngIf="isOpen" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span class="tooltip-label" *ngIf="!isOpen">Fale no WhatsApp</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .floating-whatsapp-overlay {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      z-index: 998;
      animation: fadeIn 0.2s ease;
    }

    .floating-dock-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .floating-buttons-stack {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    /* Botão Promocional Flutuante */
    .promo-btn {
      background: linear-gradient(135deg, #c51e26 0%, #881016 100%);
      color: #ffffff;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(197, 30, 38, 0.5);
      transition: all 0.25s ease;
      cursor: pointer;
      position: relative;

      .promo-icon {
        font-size: 1.35rem;
      }

      .close-icon {
        font-size: 1.2rem;
        font-weight: bold;
      }

      &.active {
        background: #1e293b;
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
      }

      &:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 20px rgba(197, 30, 38, 0.65);

        &.active {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
        }

        .tooltip-label {
          opacity: 1;
          visibility: visible;
          transform: translateX(-8px);
        }
      }

      .promo-badge-pulse {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 12px;
        height: 12px;
        background: #f59e0b;
        border: 2px solid #070b14;
        border-radius: 50%;
        animation: pulseBadge 1.8s infinite;
      }
    }

    /* Botão WhatsApp */
    .whatsapp-btn {
      background: #25d366;
      color: white;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(37, 211, 102, 0.45);
      transition: all 0.25s ease;
      cursor: pointer;
      position: relative;

      &.active {
        background: #1e293b;
        color: #ffffff;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
      }

      &:hover {
        transform: scale(1.06);
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);

        &.active {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
        }

        .tooltip-label {
          opacity: 1;
          visibility: visible;
          transform: translateX(-8px);
        }
      }
    }

    .tooltip-label {
      position: absolute;
      right: 66px;
      background: #0f172a;
      color: #ffffff;
      font-size: 0.8rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 6px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -4px;
        transform: translateY(-50%);
        border-width: 4px 0 4px 4px;
        border-style: solid;
        border-color: transparent transparent transparent #0f172a;
      }
    }

    /* Modais Flutuantes Base */
    .floating-modal {
      position: absolute;
      right: 0;
      width: 330px;
      max-width: calc(100vw - 48px);
      background: #0a0f1d;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
      overflow: hidden;
      animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 1000;
    }

    .whatsapp-modal {
      bottom: 74px;
    }

    .promo-modal {
      bottom: 136px;
    }

    .modal-header {
      padding: 16px 18px 12px;
      background: linear-gradient(180deg, rgba(197, 30, 38, 0.2) 0%, rgba(10, 15, 29, 0) 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .modal-badge {
        display: inline-block;
        font-size: 0.65rem;
        font-weight: 800;
        color: #f87171;
        letter-spacing: 0.08em;
        margin-bottom: 4px;
      }

      h3 {
        font-size: 1.05rem;
        font-weight: 700;
        color: #ffffff;
        margin: 0 0 4px;
      }

      p {
        font-size: 0.8rem;
        color: #94a3b8;
        margin: 0;
        line-height: 1.35;
      }

      .btn-close-modal {
        background: rgba(255, 255, 255, 0.08);
        border: none;
        color: #94a3b8;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
        margin-left: 8px;

        &:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #ffffff;
        }
      }
    }

    /* Promo modal corpo */
    .promo-modal-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .promo-highlight-card {
      background: #111827;
      border: 1px solid rgba(197, 30, 38, 0.35);
      border-radius: 12px;
      padding: 14px;

      .promo-tag-pill {
        display: inline-block;
        font-size: 0.65rem;
        font-weight: 800;
        background: #fee2e2;
        color: #b91c1c;
        padding: 2px 8px;
        border-radius: 4px;
        letter-spacing: 0.05em;
        margin-bottom: 8px;
      }

      h4 {
        font-size: 0.95rem;
        color: #ffffff;
        margin: 0 0 6px 0;
        font-weight: 700;
      }

      .promo-lorem {
        font-size: 0.78rem;
        color: #94a3b8;
        line-height: 1.45;
        margin: 0;
      }
    }

    .promo-perks {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .perk-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.78rem;
        color: #cbd5e1;

        .perk-check {
          color: #22c55e;
          font-weight: 800;
        }
      }
    }

    .btn-promo-claim {
      background: linear-gradient(135deg, #c51e26 0%, #a8161d 100%);
      color: #ffffff;
      padding: 11px 16px;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      border: none;
      box-shadow: 0 4px 14px rgba(197, 30, 38, 0.4);
      transition: all 0.2s ease;

      &:hover {
        background: #b91c1c;
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(197, 30, 38, 0.55);
      }
    }

    .btn-promo-insta {
      background: transparent;
      color: #cbd5e1;
      padding: 9px 14px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 600;
      border: 1px solid rgba(255, 255, 255, 0.14);
      cursor: pointer;
      text-align: center;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
    }

    /* WhatsApp lista de unidades */
    .modal-units-list {
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .unit-select-btn {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 12px;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #1a2234;
        border-color: rgba(197, 30, 38, 0.4);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);

        .unit-arrow {
          transform: translateX(3px);
          color: #ff9900;
        }
      }

      .unit-icon-wrap {
        font-size: 1.4rem;
        background: rgba(255, 255, 255, 0.04);
        width: 38px;
        height: 38px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .unit-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .unit-name-row {
        display: flex;
        align-items: center;
        gap: 6px;

        strong {
          color: #ffffff;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .unit-tag {
          font-size: 0.65rem;
          font-weight: 700;
          color: #f87171;
          background: rgba(197, 30, 38, 0.15);
          padding: 1px 6px;
          border-radius: 4px;
        }
      }

      .unit-phone {
        font-size: 0.82rem;
        font-weight: 600;
        color: #ff9900;
      }

      .unit-desc {
        font-size: 0.72rem;
        color: #64748b;
      }

      .unit-arrow {
        color: #94a3b8;
        font-size: 1.1rem;
        font-weight: 700;
        transition: transform 0.2s ease;
      }
    }

    .modal-footer {
      padding: 10px 14px;
      background: #080c16;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      text-align: center;

      span {
        font-size: 0.72rem;
        color: #64748b;
        font-weight: 500;
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(12px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes pulseBadge {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.35);
        opacity: 0.8;
      }
    }
  `]
})
export class FloatingWhatsappComponent {
  isOpen = false;
  isPromoOpen = false;

  constructor(private linksService: LinksService) {}

  toggleModal(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.isPromoOpen = false;
    }
  }

  closeModal(): void {
    this.isOpen = false;
  }

  togglePromoModal(): void {
    this.isPromoOpen = !this.isPromoOpen;
    if (this.isPromoOpen) {
      this.isOpen = false;
    }
  }

  closePromoModal(): void {
    this.isPromoOpen = false;
  }

  closeAll(): void {
    this.isOpen = false;
    this.isPromoOpen = false;
  }

  selectCity(unidade: UnidadeDespachante): void {
    this.linksService.openWhatsApp(unidade);
    this.closeAll();
  }

  promoInstagramUrl = 'https://www.instagram.com/p/DeH0J9pgwBc/?hl=en';

  claimPromo(): void {
    const promoMsg = 'Olá! Vim pela promoção no site do Felisberto Despachante e gostaria de fazer a vistoria na Oeste Vistorias para participar do sorteio da Moto Elétrica!';
    this.linksService.openWhatsApp('barreiras', promoMsg);
    this.closeAll();
  }

  openPromoInstagram(): void {
    window.open(this.promoInstagramUrl, '_blank', 'noopener,noreferrer');
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen || this.isPromoOpen) {
      this.closeAll();
    }
  }
}
