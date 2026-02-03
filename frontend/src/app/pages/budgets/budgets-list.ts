import { Component, signal, inject } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { BudgetsHttpService, Budget } from '../../services/budgets-http.service';
import { BudgetStateService } from '../../services/budget-state';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CurrencyPipe],
  template: `
    <section class="budgets">
      <h1>Presupuestos</h1>

      <a routerLink="/presupuestos/nuevo" class="budgets__new-button">
        Nuevo presupuesto
      </a>

      <p *ngIf="fromHome()">Has llegado desde la página principal.</p>

      <p *ngIf="info()" class="budgets__info">
        {{ info() }}
      </p>

      <p *ngIf="error()" class="budgets__error">
        {{ error() }}
      </p>

      <ul class="budgets__list">
        <li *ngFor="let budget of budgets()">
          <a [routerLink]="['/presupuestos', budget.id]">
            {{ budget.titulo }} –
            {{ budget.precio | currency:'EUR' }}
          </a>
          <button type="button" (click)="goToDetail(budget)">
            Ver detalle (código)
          </button>
        </li>
      </ul>

      <p
        *ngIf="!error() && budgets().length === 0"
        class="budgets__empty"
      >
        No hay presupuestos todavía. Puedes crear el primero desde el botón «Nuevo presupuesto».
      </p>

      <section class="budgets__pagination">
        <button
          type="button"
          (click)="prevPage()"
          [disabled]="page() === 0 || loading()"
        >
          Página anterior
        </button>

        <span>Página {{ page() + 1 }}</span>

        <button
          type="button"
          (click)="nextPage()"
          [disabled]="loading()"
        >
          Siguiente página
        </button>
      </section>
    </section>
  `,
})
export class BudgetsList {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private budgetsHttp = inject(BudgetsHttpService);
  private budgetState = inject(BudgetStateService);

  budgets = signal<Budget[]>([]);
  fromHome = signal(false);
  error = signal<string | null>(null);
  info = signal<string | null>(null);

  page = signal(0);
  limit = signal(10);
  loading = signal(false);

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      this.fromHome.set(params.get('from') === 'home');

      const err = params.get('error');
      if (err === 'not-found' || err === 'server-error') {
        const message = 'Ha ocurrido un error al cargar el presupuesto.';
        this.error.set(message);
        this.budgetState.setError(message);
      } else {
        this.error.set(null);
        this.budgetState.setError(null);
      }

      const deletedId = params.get('deleted');
      if (deletedId) {
        this.info.set(`Presupuesto ${deletedId} eliminado correctamente.`);
      } else {
        this.info.set(null);
      }
    });

    this.loadBudgets();
  }

  private loadBudgets() {
    this.loading.set(true);
    this.budgetState.setLoading(true);

    this.budgetsHttp.getBudgets({
      page: this.page(),
      limit: this.limit(),
    }).subscribe({
      next: budgets => {
        this.budgets.set(budgets);
        this.budgetState.setBudgets(budgets);
        this.error.set(null);
        this.budgetState.setError(null);
        this.loading.set(false);
        this.budgetState.setLoading(false);
      },
      error: () => {
        const message = 'No se han podido cargar los presupuestos.';
        this.error.set(message);
        this.budgetState.setError(message);
        this.loading.set(false);
        this.budgetState.setLoading(false);
      },
    });
  }

  prevPage() {
    if (this.page() > 1 && !this.loading()) {
      this.page.update(p => p - 1);
      this.loadBudgets();
    }
  }

  nextPage() {
    if (!this.loading()) {
      this.page.update(p => p + 1);
      this.loadBudgets();
    }
  }

  goToDetail(budget: Budget) {
    this.router.navigate(['/presupuestos', budget.id], {
      state: { budget },
    });
  }
}
