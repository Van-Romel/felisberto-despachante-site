import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService } from '../../services/links.service';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="floating-whatsapp-container">
      <button class="whatsapp-button" (click)="handleClick()" aria-label="Atendimento no WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-2.029-.475-1.624-.675-2.67-2.327-2.75-2.435-.081-.107-.655-.873-.655-1.664 0-.791.413-1.18.561-1.341.147-.161.32-.201.427-.201.107 0 .213.002.306.007.098.006.23-.037.36.275.133.32.454 1.108.494 1.189.04.081.067.176.013.283-.053.107-.08.174-.16.267-.08.093-.169.208-.242.279-.081.08-.166.167-.071.33.095.163.42 1.002 1.258 1.488.423.246.778.322.94.39.162.067.257.058.354-.053.097-.11.417-.487.528-.654.111-.167.222-.139.375-.083.153.056.97.458 1.137.541.167.083.278.125.319.194.041.07.041.403-.103.808z"/>
        </svg>
        <span class="tooltip-label">Fale no WhatsApp</span>
      </button>
    </div>
  `,
  styles: [`
    .floating-whatsapp-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
    }

    .whatsapp-button {
      background: #25d366;
      color: white;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);
      transition: all 0.25s ease;
      cursor: pointer;
      position: relative;

      &:hover {
        transform: scale(1.08);
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.55);

        .tooltip-label {
          opacity: 1;
          visibility: visible;
          transform: translateX(-8px);
        }
      }

      .tooltip-label {
        position: absolute;
        right: 64px;
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
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

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
  `]
})
export class FloatingWhatsappComponent {
  constructor(private linksService: LinksService) {}

  handleClick(): void {
    this.linksService.openWhatsApp('geral');
  }
}
