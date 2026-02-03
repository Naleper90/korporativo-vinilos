import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { BudgetsHttpService, Budget, CreateBudgetDto } from '../../services/budgets-http.service';
import { BudgetStateService } from '../../services/budget-state';

@Component({
  selector: 'app-budget-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, CurrencyPipe, DatePipe, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="budget-detail">
      <h1>Detalle presupuesto #{{ id() }}</h1>

      <p *ngIf="loading()">Cargando presupuesto...</p>

      <p *ngIf="!loading() && error()">{{ error() }}</p>

      <ng-container *ngIf="!loading() && !error()">
        <form [formGroup]="form" (ngSubmit)="onSave()">

          <label>
            Título
            <input type="text" formControlName="titulo">
          </label>

          <label>
            Precio
            <input type="number" formControlName="precio">
          </label>

          <label>
            Descripción
            <textarea formControlName="descripcion"></textarea>
          </label>

          <label>
            Fecha
            <input type="date" formControlName="fecha">
          </label>

          <label>
            Cliente ID
            <input type="number" formControlName="clienteId">
          </label>

          <button type="submit" [disabled]="form.invalid || saving()">
            Guardar cambios
          </button>

          <button
            type="button"
            (click)="onDelete()"
            [disabled]="saving()">
            Eliminar presupuesto
          </button>
        </form>
      </ng-container>

      <a routerLink="/presupuestos">Volver al listado</a>
    </section>
  `,
})
export class BudgetDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private budgetsHttp = inject(BudgetsHttpService);
  private fb = inject(FormBuilder);
  private budgetState = inject(BudgetStateService);

  id = signal<number | null>(null);
  budget = signal<Budget | null>(null);
  loading = signal(true);
  saving = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    titulo: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
    descripcion: [''],
    fecha: ['', Validators.required],
    clienteId: [1, [Validators.required, Validators.min(1)]],
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const numericId = idParam ? Number(idParam) : NaN;
    this.id.set(Number.isNaN(numericId) ? null : numericId);

    if (!numericId || Number.isNaN(numericId)) {
      this.error.set('Identificador de presupuesto no válido.');
      this.loading.set(false);
      return;
    }

    this.budgetsHttp
      .getBudgetById(numericId)
      .pipe(take(1))
      .subscribe({
        next: budget => {
          this.budget.set(budget);
          this.budgetState.setSelectedBudget(budget);

          this.form.patchValue({
            titulo: budget.titulo,
            precio: budget.precio,
            descripcion: budget.descripcion,
            fecha: budget.fecha,
            clienteId: budget.clienteId,
          });
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se ha encontrado o no se ha podido cargar el presupuesto.');
          this.loading.set(false);
        },
      });
  }

  onSave() {
    if (this.form.invalid || this.id() == null) return;

    const body: CreateBudgetDto = this.form.value as CreateBudgetDto;
    this.saving.set(true);

    this.budgetsHttp
      .updateBudget(this.id()!, body)
      .pipe(take(1))
      .subscribe({
        next: updated => {
          this.budget.set(updated);
          this.budgetState.update(updated);
          this.saving.set(false);
        },
        error: () => {
          this.error.set('Error al guardar los cambios del presupuesto.');
          this.saving.set(false);
        },
      });
  }

  onDelete() {
    const id = this.id();
    if (id == null) return;

    const confirmed = confirm('¿Seguro que quieres eliminar este presupuesto?');
    if (!confirmed) return;

    this.saving.set(true);

    this.budgetsHttp
      .deleteBudget(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.budgetState.remove(id);
          this.saving.set(false);
          this.router.navigate(['/presupuestos'], {
            queryParams: { deleted: id },
          });
        },
        error: () => {
          this.error.set('No se ha podido eliminar el presupuesto.');
          this.saving.set(false);
        },
      });
  }
}
