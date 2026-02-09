/**
 * Componente de cabecera con menú móvil responsive.
 * Usa @ViewChild y @HostListener para detectar clics fuera del menú.
 */
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

import { ThemeService } from '../../../services/theme.service';
import { ModalService } from '../../../services/modal.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {

  isDark = false;
  isMobileMenuOpen = false;

  // Necesitamos el #mobileMenu en el HTML para detectar clics fuera
  @ViewChild('mobileMenu') mobileMenu?: ElementRef<HTMLElement>;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    public modalService: ModalService,
    public authService: AuthService
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
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  onLogin() {
    this.closeMobileMenu();
    this.modalService.open('login-modal');
  }

  onLogout() {
    this.closeMobileMenu();
    this.authService.logout();
    this.router.navigate(['/']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Si el menú está cerrado, no hacemos nada
    if (!this.isMobileMenuOpen) return;

    // Si clicamos FUERA del menú móvil, lo cerramos
    if (this.mobileMenu && !this.mobileMenu.nativeElement.contains(event.target as Node)) {
      this.closeMobileMenu();
    }
  }
}
