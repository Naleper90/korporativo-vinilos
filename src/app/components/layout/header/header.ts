import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  isDark = false;
  isMobileMenuOpen = false;

  @ViewChild('mobileMenu') mobileMenu?: ElementRef<HTMLElement>;

  constructor(private themeService: ThemeService) {
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
