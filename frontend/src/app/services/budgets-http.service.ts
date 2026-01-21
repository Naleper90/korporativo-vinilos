import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface Budget {
  id: number;
  titulo: string;
  precio: number;
  descripcion: string | null;
  fecha: string;
  clienteId: number;
}

export interface CreateBudgetDto {
  titulo: string;
  precio: number;
  descripcion?: string | null;
  fecha: string;
  clienteId: number;
}

export interface BudgetApiError {
  status: number;
  message: string;
  type: 'network' | 'server' | 'validation' | 'unknown';
}

export interface BudgetQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class BudgetsHttpService extends ApiService {

  private mapBudget(b: Budget): Budget {
    return {
      ...b,
    };
  }

  private handleError(error: any): Observable<never> {
    const status = error?.status ?? 0;

    let mapped: BudgetApiError = {
      status,
      message: 'Error inesperado al comunicarse con la API de presupuestos',
      type: 'unknown',
    };

    if (status === 0) {
      mapped = {
        status,
        message: 'Error de red: no se pudo contactar con el servidor',
        type: 'network',
      };
    } else if (status === 400) {
      mapped = {
        status,
        message: 'Error de validación en los datos del presupuesto',
        type: 'validation',
      };
    } else if (status >= 500) {
      mapped = {
        status,
        message: 'Error interno del servidor al procesar el presupuesto',
        type: 'server',
      };
    }

    return throwError(() => mapped);
  }

  getBudgets(params?: BudgetQueryParams): Observable<Budget[]> {
    return this.get<Budget[]>('/presupuestos', { params }).pipe(
      retry(2),
      map(budgets => budgets.map(b => this.mapBudget(b))),
      catchError(error => this.handleError(error)),
    );
  }

  getBudgetById(id: number): Observable<Budget> {
    return this.get<Budget>(`/presupuestos/${id}`).pipe(
      retry(1),
      map(b => this.mapBudget(b)),
      catchError(error => this.handleError(error)),
    );
  }

  createBudget(body: CreateBudgetDto): Observable<Budget> {
    return this.post<Budget>('/presupuestos', body).pipe(
      map(b => this.mapBudget(b)),
      catchError(error => this.handleError(error)),
    );
  }

  updateBudget(id: number, body: CreateBudgetDto): Observable<Budget> {
    return this.put<Budget>(`/presupuestos/${id}`, body).pipe(
      map(b => this.mapBudget(b)),
      catchError(error => this.handleError(error)),
    );
  }

  deleteBudget(id: number): Observable<void> {
    return this.delete<void>(`/presupuestos/${id}`).pipe(
      catchError(error => this.handleError(error)),
    );
  }
}
