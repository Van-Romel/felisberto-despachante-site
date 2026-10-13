import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService, UnidadeDespachante } from '../../services/links.service';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Overlay de fundo suave ao abrir -->
    <div
      *ngIf="isOpen"
      class="floating-whatsapp-overlay"
      (click)="closeModal()"
      aria-hidden="true"
    ></div>

    <div class="floating-whatsapp-container">
      <!-- Modal / Popover de Escolha de Unidade -->
      <div
        *ngIf="isOpen"
        class="whatsapp-modal"
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
              <span class="unit-desc">Av. Aylon Macedo • Atendimento Geral</span>
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
              <span class="unit-desc">Atendimento presencial & frotas</span>
            </div>
            <div class="unit-arrow">→</div>
          </button>
        </div>

        <div class="modal-footer">
          <span>🛡️ Credenciado CRDD-BA • Desde 2007</span>
        </div>
      </div>

      <!-- Botão Flutuante Principal -->
      <button
        class="whatsapp-button"
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
  `,
  styles: [`
    .floating-whatsapp-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      z-index: 998;
      animation: fadeIn 0.2s ease;
    }

    .floating-whatsapp-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
    }

    .whatsapp-button {
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
    }

    /* Modal / Popover */
    .whatsapp-modal {
      position: absolute;
      bottom: 70px;
      right: 0;
      width: 330px;
      max-width: calc(100vw - 36px);
      background: #0a0f1d;
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 16px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
      overflow: hidden;
      animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 1000;
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
  `]
})
export class FloatingWhatsappComponent {
  isOpen = false;

  constructor(private linksService: LinksService) {}

  toggleModal(): void {
    this.isOpen = !this.isOpen;
  }

  closeModal(): void {
    this.isOpen = false;
  }

  selectCity(unidade: UnidadeDespachante): void {
    this.linksService.openWhatsApp(unidade);
    this.closeModal();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) {
      this.closeModal();
    }
  }
}
