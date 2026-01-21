import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetsHttpService, CreateBudgetDto, BudgetApiError } from '../../services/budgets-http.service';

@Component({
  selector: 'app-budget-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="budget-create">
      <h1>Nuevo presupuesto</h1>

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

        <button type="submit" [disabled]="form.invalid">Crear</button>
      </form>
    </section>
  `,
})
export class BudgetCreate {
  private fb = inject(FormBuilder);
  private budgetsHttp = inject(BudgetsHttpService);
  private router = inject(Router);

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

    this.budgetsHttp.createBudget(body).subscribe({
      next: (created) => {
        this.router.navigate(['/presupuestos', created.id]);
      },
      error: (err: BudgetApiError) => {
        if (err.type === 'validation') {
          alert('Error de validación en los datos del presupuesto');
        } else if (err.type === 'network') {
          alert('Problema de conexión, inténtalo de nuevo');
        } else if (err.type === 'server') {
          alert('Error interno del servidor al crear el presupuesto');
        } else {
          alert('Error inesperado al crear el presupuesto');
        }
      },
    });
  }
}
