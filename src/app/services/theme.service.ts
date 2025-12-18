import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<'light' | 'dark' | 'system'>('system');
  theme$ = this.themeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }
  }

  private initTheme(): void {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    const theme = saved || 'system';
    this.setTheme(theme);
  }

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
    this.themeSubject.next(theme);
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }

  toggleTheme(): void {
    const current = this.themeSubject.value;
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }
}
