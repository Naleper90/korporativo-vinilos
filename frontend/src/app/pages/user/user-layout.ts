import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Main } from '../../components/layout/main/main';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Main],
  template: `
    <app-main>
      <div class="dashboard layout__container">

        <!-- SIDEBAR DE NAVEGACIÓN -->
        <aside class="dashboard__sidebar">
          <nav class="dashboard-nav">
            <span class="dashboard-nav__label">Menú Usuario</span>

            <a routerLink="perfil"
               routerLinkActive="dashboard-nav__link--active"
               class="dashboard-nav__link">
               👤 Mi Perfil
            </a>

            <a routerLink="pedidos"
               routerLinkActive="dashboard-nav__link--active"
               class="dashboard-nav__link">
               📦 Mis Pedidos
            </a>

            <a routerLink="/" class="dashboard-nav__link dashboard-nav__link--exit">
               🚪 Salir
            </a>
          </nav>
        </aside>

        <!-- CONTENIDO DINÁMICO (Perfil, Pedidos...) -->
        <section class="dashboard__content">
          <router-outlet></router-outlet>
        </section>

      </div>
    </app-main>
  `,
  styles: [`
    /* ESTILOS DEL DASHBOARD GRID */
    .dashboard {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: var(--spacing-8);
      align-items: start;
    }

    /* SIDEBAR */
    .dashboard__sidebar {
      background-color: var(--color-white);
      border: 1px solid var(--color-neutral-300);
      border-radius: var(--radius-md);
      padding: var(--spacing-4);
      margin-top: 0;
      position: sticky;
      top: 2rem;
    }

    .dashboard__content {
      margin-top: 0;
    }

    /* NAVEGACIÓN DEL DASHBOARD */
    .dashboard-nav {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }

    .dashboard-nav__label {
      font-size: var(--font-size-xs);
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-3);
      padding-left: var(--spacing-3);
    }

    .dashboard-nav__link {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-3);
      border-radius: var(--radius-sm);
      color: var(--color-text-primary);
      text-decoration: none;
      font-weight: var(--font-weight-medium);
      transition: all 0.2s ease;

      &:hover {
        background-color: var(--color-neutral-100);
      }
    }

    .dashboard-nav__link--active {
      background-color: var(--color-accent-500);
      color: var(--color-primary-900);
      font-weight: var(--font-weight-bold);
    }

    .dashboard-nav__link--exit {
      margin-top: var(--spacing-4);
      border-top: 1px solid var(--color-neutral-300);
      color: var(--color-error-500);

      &:hover {
        background-color: var(--color-error-300);
      }
    }

    /* RESPONSIVE MÓVIL (Sidebar pasa a ser menú superior) */
    @media (max-width: 768px) {
      .dashboard {
        grid-template-columns: 1fr;
        gap: var(--spacing-6);
      }

      .dashboard__sidebar {
        position: static;
      }

      .dashboard-nav {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: var(--spacing-2);
      }

      .dashboard-nav__label { display: none; }

      .dashboard-nav__link {
        white-space: nowrap;
        border: 1px solid var(--color-neutral-300);
      }

      .dashboard-nav__link--exit {
        margin-top: 0;
        border-top: 1px solid var(--color-neutral-300);
      }
    }
  `]
})
export class UserLayout {}
