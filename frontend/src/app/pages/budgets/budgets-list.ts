import { Component, signal, inject, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { take, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { BudgetsHttpService, Budget } from '../../services/budgets-http.service';
import { BudgetStateService } from '../../services/budget-state';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CurrencyPipe, DecimalPipe, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="budgets">
      <h1>Presupuestos</h1>

      <div class="budgets__stats" *ngIf="store.totalCount() > 0">
        <p>Total presupuestos: <strong>{{ store.totalCount() }}</strong></p>
        <p>Valor total: <strong>{{ store.totalAmount() | currency:'EUR' }}</strong></p>
        <p>Precio promedio: <strong>{{ store.averagePrice() | currency:'EUR' }}</strong></p>
      </div>

      <div class="budgets__search">
        <input
          type="search"
          [formControl]="searchControl"
          placeholder="Buscar presupuestos por título..."
          class="budgets__search-input"
        />
        <p *ngIf="searching()" class="budgets__searching">Buscando...</p>
      </div>

      <a routerLink="/presupuestos/nuevo" class="budgets__new-button">
        Nuevo presupuesto
      </a>

      <p *ngIf="fromHome()">Has llegado desde la página principal.</p>

      <p *ngIf="info()" class="budgets__info">
        {{ info() }}
      </p>

      <p *ngIf="store.error()" class="budgets__error">
        {{ store.error() }}
      </p>

      <ul class="budgets__list">
        <li *ngFor="let budget of store.budgets(); trackBy: trackById">
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
        *ngIf="!store.error() && store.budgets().length === 0 && !store.loading()"
        class="budgets__empty"
      >
        No hay presupuestos todavía. Puedes crear el primero desde el botón «Nuevo presupuesto».
      </p>

      <p *ngIf="store.loading()" class="budgets__loading">
        Cargando presupuestos...
      </p>

      <section class="budgets__pagination">
        <button
          type="button"
          (click)="prevPage()"
          [disabled]="page() === 0 || store.loading()"
        >
          Página anterior
        </button>

        <span>Página {{ page() + 1 }}</span>

        <button
          type="button"
          (click)="nextPage()"
          [disabled]="!hasMore() || store.loading()"
        >
          Siguiente página
        </button>
      </section>

      <p *ngIf="!hasMore() && !store.loading() && store.budgets().length > 0" class="budgets__end-message">
        No hay más presupuestos para mostrar.
      </p>
    </section>
  `,
})
export class BudgetsList implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private budgetsHttp = inject(BudgetsHttpService);
  private destroy$ = new Subject<void>();

  protected store = inject(BudgetStateService);

  fromHome = signal(false);
  info = signal<string | null>(null);
  page = signal(0);
  limit = signal(10);
  searching = signal(false);
  hasMore = signal(true);

  searchControl = new FormControl('');

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      this.fromHome.set(params.get('from') === 'home');

      const err = params.get('error');
      if (err === 'not-found' || err === 'server-error') {
        this.store.setError('Ha ocurrido un error al cargar el presupuesto.');
      } else {
        this.store.setError(null);
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

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        this.onSearch(searchTerm || '');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onSearch(term: string) {
    this.searching.set(true);
    this.store.setLoading(true);
    this.page.set(0); // Reset a primera página al buscar

    this.budgetsHttp
      .getBudgets({
        page: 0,
        limit: this.limit(),
        search: term,
      })
      .pipe(take(1))
      .subscribe({
        next: budgets => {
          this.store.setBudgets(budgets);
          this.store.setLoading(false);
          this.searching.set(false);
          this.hasMore.set(budgets.length >= this.limit());
        },
        error: () => {
          this.store.setError('Error al buscar presupuestos.');
          this.store.setLoading(false);
          this.searching.set(false);
          this.hasMore.set(false);
        },
      });
  }

  private loadBudgets() {
    this.store.setLoading(true);
    this.store.setError(null);

    this.budgetsHttp
      .getBudgets({
        page: this.page(),
        limit: this.limit(),
      })
      .pipe(take(1))
      .subscribe({
        next: budgets => {
          this.store.setBudgets(budgets);
          this.store.setLoading(false);
          this.hasMore.set(budgets.length >= this.limit());
        },
        error: () => {
          this.store.setError('No se han podido cargar los presupuestos.');
          this.store.setLoading(false);
          this.hasMore.set(false);
        },
      });
  }

  trackById(index: number, budget: Budget): number {
    return budget.id;
  }

  prevPage() {
    if (this.page() > 0 && !this.store.loading()) {
      this.page.update(p => p - 1);
      this.loadBudgets();
    }
  }

  nextPage() {
    if (!this.store.loading()) {
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
