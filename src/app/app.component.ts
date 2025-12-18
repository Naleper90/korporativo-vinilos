import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <main class="layout">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
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
