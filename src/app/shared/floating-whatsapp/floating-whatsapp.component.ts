import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="floating-whatsapp-container">
      <div class="whatsapp-bubble" [class.show]="isBubbleOpen">
        <div class="bubble-header">
          <strong>Felisberto Despachante</strong>
          <button (click)="closeBubble($event)" aria-label="Fechar mensagem">&times;</button>
        </div>
        <p>Olá! Precisa regularizar seu veículo ou tirar dúvidas sobre taxas? Fale conosco agora!</p>
        <span class="online-indicator">🟢 Atendimento Online</span>
      </div>

      <button class="whatsapp-button" (click)="handleClick()" aria-label="Falar no WhatsApp">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-2.029-.475-1.624-.675-2.67-2.327-2.75-2.435-.081-.107-.655-.873-.655-1.664 0-.791.413-1.18.561-1.341.147-.161.32-.201.427-.201.107 0 .213.002.306.007.098.006.23-.037.36.275.133.32.454 1.108.494 1.189.04.081.067.176.013.283-.053.107-.08.174-.16.267-.08.093-.169.208-.242.279-.081.08-.166.167-.071.33.095.163.42 1.002 1.258 1.488.423.246.778.322.94.39.162.067.257.058.354-.053.097-.11.417-.487.528-.654.111-.167.222-.139.375-.083.153.056.97.458 1.137.541.167.083.278.125.319.194.041.07.041.403-.103.808z"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .floating-whatsapp-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .whatsapp-bubble {
      background: #ffffff;
      color: #0f172a;
      border-radius: 14px;
      padding: 14px 16px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      width: 260px;
      margin-bottom: 12px;
      border: 1px solid #e2e8f0;
      animation: fadeIn 0.3s ease;
      font-size: 0.88rem;

      .bubble-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
        font-size: 0.92rem;
        color: #0f172a;

        button {
          font-size: 1.2rem;
          color: #94a3b8;
          line-height: 1;
          &:hover { color: #0f172a; }
        }
      }

      p {
        margin: 0 0 8px 0;
        color: #475569;
        line-height: 1.4;
      }

      .online-indicator {
        font-size: 0.75rem;
        color: #16a34a;
        font-weight: 600;
      }
    }

    .whatsapp-button {
      background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 18px rgba(37, 211, 102, 0.45);
      transition: all 0.25s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 24px rgba(37, 211, 102, 0.6);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class FloatingWhatsappComponent {
  isBubbleOpen = true;

  constructor(private linksService: LinksService) {}

  handleClick(): void {
    this.linksService.openWhatsApp();
  }

  closeBubble(event: Event): void {
    event.stopPropagation();
    this.isBubbleOpen = false;
  }
}
