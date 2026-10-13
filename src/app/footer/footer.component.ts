import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LinksService } from '../services/links.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  constructor(
    private router: Router,
    public linksService: LinksService
  ) {}

  openWhatsApp(): void {
    this.linksService.openWhatsApp();
  }

  openInstagram(): void {
    this.linksService.openInstagram();
  }

  scrollTo(id: string): void {
    const url = this.router.url;
    const isHome = url === '/' || url === '/home' || url.startsWith('/home#') || url.startsWith('/#');
    if (!isHome) {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 250);
      });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
