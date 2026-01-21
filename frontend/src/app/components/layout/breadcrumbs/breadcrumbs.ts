import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

type Crumb = { label: string; url: string };

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  template: `
    <nav class="breadcrumbs" *ngIf="crumbs().length">
      <a routerLink="/">Inicio</a>
      <span> / </span>

      <ng-container *ngFor="let crumb of crumbs(); let last = last">
        <ng-container *ngIf="!last">
          <a [routerLink]="crumb.url">{{ crumb.label }}</a>
          <span> / </span>
        </ng-container>
        <ng-container *ngIf="last">
          <span>{{ crumb.label }}</span>
        </ng-container>
      </ng-container>
    </nav>
  `,
})
export class Breadcrumbs {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  crumbs = signal<Crumb[]>([]);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const crumbs = this.buildCrumbs(this.route.root);
        this.crumbs.set(crumbs);
      });
  }

  private buildCrumbs(route: ActivatedRoute, url = '', crumbs: Crumb[] = []): Crumb[] {
    const routeConfig = route.routeConfig;

    let label = routeConfig?.data?.['breadcrumb'] ?? '';
    let path = routeConfig?.path ?? '';

    if (path) {
      const nextUrl = `${url}/${path}`.replace(/\/+/g, '/');
      if (label) {
        crumbs.push({ label, url: nextUrl });
      }
      url = nextUrl;
    }

    if (route.firstChild) {
      return this.buildCrumbs(route.firstChild, url, crumbs);
    }

    return crumbs;
  }
}
