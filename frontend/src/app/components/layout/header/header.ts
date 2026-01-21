import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- IMPORTANTE AÑADIRLO
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { ModalService } from '../../../services/modal.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // <--- AÑADIDO AQUÍ
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  isDark = false;
  isMobileMenuOpen = false;

  @ViewChild('mobileMenu') mobileMenu?: ElementRef<HTMLElement>;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    public modalService: ModalService, // He puesto public por si acaso lo usas en HTML
    public authService: AuthService    // <--- PUBLIC E INYECTADO
  ) {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark' | 'system') => {
      this.isDark = theme === 'dark';
    });
  }

  onToggleTheme() {
    this.themeService.toggleTheme();
  }

  onToggleMobileMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateMobileMenuDOM();
  }

  /**
   * Maneja el click en "Entrar"
   */
  onLogin() {
    this.isMobileMenuOpen = false;
    this.updateMobileMenuDOM();
    console.log('Abriendo modal login-modal...');
    this.modalService.open('login-modal');
  }

  /**
   * 👇 NUEVO: Maneja el Logout
   */
  onLogout() {
    this.isMobileMenuOpen = false;
    this.updateMobileMenuDOM();
    this.authService.logout();
  }

  private updateMobileMenuDOM() {
    const el = this.mobileMenu?.nativeElement;
    if (!el) return;

    if (this.isMobileMenuOpen) {
      el.classList.add('layout-header__nav-mobile--open');
    } else {
      el.classList.remove('layout-header__nav-mobile--open');
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    if (!this.isMobileMenuOpen) return;
    this.isMobileMenuOpen = false;
    this.updateMobileMenuDOM();
  }
}
