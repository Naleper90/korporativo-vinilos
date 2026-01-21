import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Servicios
import { ThemeService } from './services/theme.service';
import { NotificationService } from './services/notification';

// Componentes Layout
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { Breadcrumbs } from './components/layout/breadcrumbs/breadcrumbs';

// Componentes Shared
import { ModalComponent } from './modal/modal';
import { AuthContainerComponent } from './components/shared/auth-container/auth-container';
import { SpinnerComponent } from './components/shared/spinner/spinner';
import { ToastComponent } from './components/shared/toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer,
    Breadcrumbs,
    ModalComponent,
    AuthContainerComponent,
    SpinnerComponent,
    ToastComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  notifications: any[] = [];

  constructor(
    private themeService: ThemeService,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.notificationService.notifications$.subscribe(notif => {
      this.notifications.push(notif);
      setTimeout(() => this.removeNotification(notif), 5000);
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') || 'system';
      this.themeService.setTheme(savedTheme as 'light' | 'dark' | 'system');

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (savedTheme === 'system') {
          this.themeService.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  removeNotification(notif: any) {
    this.notifications = this.notifications.filter(n => n !== notif);
  }
}
