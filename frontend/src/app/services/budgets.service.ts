import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type Budget = { id: number; title: string; total: number };

@Injectable({ providedIn: 'root' })
export class BudgetsService {
  private budgets: Budget[] = [
    { id: 1, title: 'Presupuesto web básica', total: 1200 },
    { id: 2, title: 'Presupuesto e-commerce', total: 3500 },
    // añade aquí los que uses en la lista
  ];

  getBudgets(): Observable<Budget[]> {
    return of(this.budgets);
  }

  getBudgetById(id: number): Observable<Budget | null> {
    const budget = this.budgets.find(b => b.id === id) ?? null;
    return of(budget);
  }
}
