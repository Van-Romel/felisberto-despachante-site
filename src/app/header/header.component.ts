import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { LinksService, UnidadeDespachante } from '../services/links.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isScrolled = false;
  currentUrl = '/home';
  selectedUnidade: UnidadeDespachante = 'geral';

  constructor(
    private router: Router,
    public linksService: LinksService
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        this.isMobileMenuOpen = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  goToSection(sectionId: string): void {
    this.closeMobileMenu();
    const url = this.router.url;
    const isHome = url === '/' || url === '/home' || url.startsWith('/home#') || url.startsWith('/#');
    if (!isHome) {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          this.scrollToElement(sectionId);
        }, 250);
      });
    } else {
      this.scrollToElement(sectionId);
    }
  }

  private scrollToElement(elementId: string): void {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  openWhatsApp(unidade: UnidadeDespachante = 'geral'): void {
    this.linksService.openWhatsApp(unidade);
  }
}
