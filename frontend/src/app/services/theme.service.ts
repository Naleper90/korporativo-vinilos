/**
 * Servicio para gestionar el tema de la aplicación (light/dark/system).
 * Usa BehaviorSubject para notificar cambios y localStorage para persistencia.
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // Manejamos tres estados: claro, oscuro o automático (sistema)
  private themeSubject = new BehaviorSubject<'light' | 'dark' | 'system'>('system');
  theme$ = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }
  }

  private initTheme(): void {
    // Recuperamos preferencia guardada o usamos 'system' por defecto
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    const theme = saved || 'system';
    this.setTheme(theme);
  }

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    // 1. Guardar persistencia
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }

    // 2. Notificar a los suscriptores
    this.themeSubject.next(theme);

    // 3. Aplicar clases al HTML
    if (isPlatformBrowser(this.platformId)) {
      let effectiveTheme = theme;

      // Si es 'system', preguntamos al navegador
      if (theme === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        effectiveTheme = systemDark ? 'dark' : 'light';
      }

      // Aplicamos o quitamos la clase 'dark-theme'
      document.documentElement.classList.toggle('dark-theme', effectiveTheme === 'dark');
    }
  }

  toggleTheme(): void {
    const current = this.themeSubject.value;
    // Si estamos en system o light, pasamos a dark. Si estamos en dark, pasamos a light.
    // (Simplificación para un botón toggle simple)
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }
}
