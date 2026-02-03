import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BudgetsHttpService, CreateBudgetDto, BudgetApiError } from '../../services/budgets-http.service';
import { BudgetStateService } from '../../services/budget-state';

@Component({
  selector: 'app-budget-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="budget-create">
      <h1>Nuevo presupuesto</h1>

      <p *ngIf="error()" class="budget-create__error">
        {{ error() }}
      </p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
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
          {{ saving() ? 'Creando...' : 'Crear presupuesto' }}
        </button>
      </form>
    </section>
  `,
})
export class BudgetCreate {
  private fb = inject(FormBuilder);
  private budgetsHttp = inject(BudgetsHttpService);
  private budgetState = inject(BudgetStateService);
  private router = inject(Router);

  saving = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    titulo: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
    descripcion: [''],
    fecha: ['', Validators.required],
    clienteId: [1, [Validators.required, Validators.min(1)]],
  });

  onSubmit() {
    if (this.form.invalid) return;

    const body: CreateBudgetDto = this.form.value as CreateBudgetDto;
    this.saving.set(true);
    this.error.set(null);

    this.budgetsHttp
      .createBudget(body)
      .pipe(take(1))
      .subscribe({
        next: (created) => {
          this.budgetState.add(created);
          this.saving.set(false);
          this.router.navigate(['/presupuestos', created.id]);
        },
        error: (err: BudgetApiError) => {
          this.saving.set(false);

          if (err.type === 'validation') {
            this.error.set('Error de validación en los datos del presupuesto');
          } else if (err.type === 'network') {
            this.error.set('Problema de conexión, inténtalo de nuevo');
          } else if (err.type === 'server') {
            this.error.set('Error interno del servidor al crear el presupuesto');
          } else {
            this.error.set('Error inesperado al crear el presupuesto');
          }
        },
      });
  }
}
