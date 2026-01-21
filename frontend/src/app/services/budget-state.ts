import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BudgetStateService {
  private budgetSubject = new BehaviorSubject<number>(0);
  budget$ = this.budgetSubject.asObservable();

  setBudget(value: number) {
    this.budgetSubject.next(value);
  }
}
